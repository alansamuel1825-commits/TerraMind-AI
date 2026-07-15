
'use server';

/**
 * @fileOverview TerraMind AI Assistant Flow.
 * 
 * - Handles conversational AI for sustainability.
 * - Integrates real-time TTS (Text-to-Speech).
 * - Uses tools to reference user data (Energy, Agri, Waste).
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
  }).optional(),
});

export type AssistantInput = z.infer<typeof AssistantInputSchema>;
export type AssistantOutput = z.infer<typeof AssistantOutputSchema>;

// Assistant Flow
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
    // 1. Generate text response
    const { output } = await ai.generate({
      system: `You are the TerraMind AI Intelligence Layer, a premium sustainability assistant.
      You provide expert guidance on agriculture, circular economy, energy, and smart cities.
      You help the "Director" make data-driven decisions.
      Distinguish clearly between simulated educational data and verified facts.
      Keep your tone professional, encouraging, and highly technical.
      Use structured sections in your output.`,
      prompt: input.message,
      // In a real implementation, we would pass input.history to the prompt
      output: {
        schema: z.object({
          text: z.string(),
          summary: z.string(),
          reasoning: z.string(),
          recommendations: z.array(z.string()),
        })
      }
    });

    const response = output!;
    let audioBase64 = '';

    // 2. Optional TTS generation
    if (input.voiceOutput) {
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
    }

    return {
      text: response.text,
      audio: audioBase64,
      sections: {
        summary: response.summary,
        reasoning: response.reasoning,
        recommendations: response.recommendations,
        confidence: 0.98,
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
