'use server';

/**
 * @fileOverview TerraMind AI Assistant Flow.
 * 
 * - Handles conversational AI for sustainability.
 * - Integrates real-time TTS (Text-to-Speech).
 * - Uses Genkit Tools to reference personalized user data.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import wav from 'wav';
import { googleAI } from '@genkit-ai/google-genai';

// Input Schema
const AssistantInputSchema = z.object({
  message: z.string().describe('The user\'s message.'),
  history: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })).optional(),
  voiceOutput: z.boolean().optional().describe('Whether to generate audio output.'),
  userId: z.string().optional().describe('The ID of the user for personal context.'),
});

// Output Schema
const AssistantOutputSchema = z.object({
  text: z.string().describe('The AI response text.'),
  audio: z.string().optional().describe('Base64 encoded WAV audio.'),
  sections: z.object({
    summary: z.string(),
    reasoning: z.string(),
    recommendations: z.array(z.string()),
    confidence: z.number(),
    limitations: z.string().optional(),
  }).optional(),
});

export type AssistantInput = z.infer<typeof AssistantInputSchema>;
export type AssistantOutput = z.infer<typeof AssistantOutputSchema>;

// Define Tools for Personalization
const getSustainabilityContext = ai.defineTool(
  {
    name: 'getSustainabilityContext',
    description: 'Retrieves the latest sustainability data for the user, including energy simulations, crop scans, and waste audits.',
    inputSchema: z.object({
      userId: z.string(),
      module: z.enum(['agri', 'energy', 'waste', 'all']),
    }),
    outputSchema: z.string(),
  },
  async (input) => {
    // In a production app, this would query Firestore.
    // For this demonstration, we return personalized context based on the requested module.
    const contexts = {
      agri: "User's last crop scan was a Tomato plant (Solanum lycopersicum) diagnosed with Late Blight. Confidence: 94%. Yield impact: 20-40%.",
      energy: "User's last energy simulation for a Commercial Office showed 92% efficiency. Solar potential is high (85kWh), but grid dependency remains at 15%.",
      waste: "User's last waste classification identified Plastic (PET) with 92% confidence. It was recyclable and upcycling ideas included a self-watering planter.",
      all: "User has active records in Agriculture (Tomato Late Blight), Energy (Commercial Office 92% efficiency), and Waste (PET Plastic classification)."
    };
    return contexts[input.module] || "No specific data found for this module.";
  }
);

export async function terraMindChat(input: AssistantInput): Promise<AssistantOutput> {
  return chatFlow(input);
}

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: AssistantInputSchema,
    outputSchema: AssistantOutputSchema,
  },
  async (input) => {
    // 1. Generate text response with tool-aware reasoning
    const { output } = await ai.generate({
      system: `You are the TerraMind AI Intelligence Layer, a premium sustainability assistant.
      You provide expert guidance on agriculture, circular economy, energy, and smart cities.
      
      PERSONALIZATION:
      - If the user asks about 'my data', 'my last simulation', or 'what I scanned', use the getSustainabilityContext tool.
      - Always prioritize information retrieved from tools when discussing user-specific history.
      
      TONE:
      - Professional, encouraging, and technical.
      - Distinguish clearly between simulated educational data and verified facts.
      - Use structured sections in your output.`,
      prompt: input.message,
      tools: [getSustainabilityContext],
      output: {
        schema: z.object({
          text: z.string(),
          summary: z.string(),
          reasoning: z.string(),
          recommendations: z.array(z.string()),
          limitations: z.string().optional(),
        })
      }
    });

    const response = output!;
    let audioBase64 = '';

    // 2. Optional Neural TTS generation
    if (input.voiceOutput) {
      try {
        const { media } = await ai.generate({
          model: googleAI.model('gemini-2.5-flash-preview-tts'),
          config: {
            responseModalities: ['AUDIO'],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: 'Algenib' },
              },
            },
          },
          prompt: response.text,
        });

        if (media) {
          const audioBuffer = Buffer.from(
            media.url.substring(media.url.indexOf(',') + 1),
            'base64'
          );
          audioBase64 = 'data:audio/wav;base64,' + (await toWav(audioBuffer));
        }
      } catch (e) {
        console.warn("TTS Generation failed, continuing with text-only.");
      }
    }

    return {
      text: response.text,
      audio: audioBase64,
      sections: {
        summary: response.summary,
        reasoning: response.reasoning,
        recommendations: response.recommendations,
        confidence: 0.98,
        limitations: response.limitations,
      },
    };
  }
);

// PCM to WAV helper
async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs = [] as any[];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}
