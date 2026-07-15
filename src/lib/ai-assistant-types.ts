export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  imageUrl?: string;
  sections?: {
    summary?: string;
    reasoning?: string;
    recommendations?: string[];
    educationalNotes?: string;
    confidence?: number;
    assumptions?: string[];
    limitations?: string;
  };
  isSimulated?: boolean;
}

export interface ChatThread {
  id: string;
  userId: string;
  title: string;
  lastMessageAt: number;
  messages: Message[];
  createdAt: number;
}

export const SUGGESTED_QUESTIONS = [
  "How can our school reduce plastic waste?",
  "What happens if rainfall decreases in the smart city?",
  "How does solar energy reduce carbon emissions?",
  "How can farmers save water using AI?",
  "Why is biodiversity important for urban health?",
  "Explain my recent energy simulation results."
];
