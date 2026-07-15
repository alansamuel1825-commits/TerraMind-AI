
"use client";

import { useState, useRef, useEffect } from "react";
import { useFirestore, useUser, useDoc } from "@/firebase";
import { 
  Message, 
  ChatThread, 
  SUGGESTED_QUESTIONS 
} from "@/lib/ai-assistant-types";
import { 
  createChatThread, 
  updateChatThread 
} from "@/firebase/firestore/ai-service";
import ChatMessage from "./chat-message";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Send, 
  Mic, 
  MicOff,
  Image as ImageIcon, 
  X, 
  Loader2, 
  Sparkles, 
  Globe,
  Volume2,
  VolumeX
} from "lucide-react";
import { terraMindChat } from "@/ai/flows/assistant-flow";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

interface ChatInterfaceProps {
  activeThreadId: string | null;
  setActiveThreadId: (id: string | null) => void;
}

export default function ChatInterface({ activeThreadId, setActiveThreadId }: ChatInterfaceProps) {
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const firestore = useFirestore();
  const { user } = useUser();
  const { data: activeThread } = useDoc<ChatThread>(
    activeThreadId ? `chat_threads/${activeThreadId}` : null
  );

  const messages = activeThread?.messages || [];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isSending]);

  const handleSendMessage = async (content: string, image?: string) => {
    if (!content.trim() && !image) return;
    if (!firestore || !user) return;

    const userMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      role: 'user',
      content,
      timestamp: Date.now(),
      imageUrl: image || undefined
    };

    const newMessages = [...messages, userMessage];
    setIsSending(true);
    setInput("");
    setSelectedImage(null);

    try {
      // Call Real Gemini Flow
      const result = await terraMindChat({
        message: content,
        voiceOutput: isVoiceEnabled,
      });

      const assistantMessage: Message = {
        id: Math.random().toString(36).substr(2, 9),
        role: 'assistant',
        content: result.text,
        timestamp: Date.now(),
        sections: result.sections,
        isSimulated: false,
      };

      // Play audio if available
      if (result.audio) {
        const audio = new Audio(result.audio);
        audio.play();
      }

      if (!activeThreadId) {
        const newId = await createChatThread(firestore, user.uid, userMessage);
        if (newId) {
          setActiveThreadId(newId);
          updateChatThread(firestore, newId, [userMessage, assistantMessage]);
        }
      } else {
        updateChatThread(firestore, activeThreadId, [...newMessages, assistantMessage]);
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Assistant Error",
        description: "Failed to connect to Neural Intelligence Layer.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  const toggleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast({
        title: "Voice Not Supported",
        description: "Your browser does not support Neural Speech Recognition.",
        variant: "destructive",
      });
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    // @ts-ignore
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setSelectedImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50/50 dark:bg-slate-950/50 relative">
      {/* Chat Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 space-y-6 scroll-smooth"
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center max-w-2xl mx-auto text-center space-y-8 animate-in fade-in zoom-in-95 duration-700">
            <div className="p-6 bg-primary/10 rounded-[2.5rem] ring-1 ring-primary/20">
              <Globe className="h-16 w-16 text-primary animate-pulse" />
            </div>
            <div className="space-y-2">
              <h2 className="text-4xl font-bold tracking-tight">TerraMind Intelligence Layer</h2>
              <p className="text-muted-foreground text-lg">
                Ask about energy trends, soil genome sequencing, or circular economy pathways.
              </p>
            </div>
            
            <div className="grid gap-3 w-full">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Neural Suggestions</p>
              <div className="flex flex-wrap justify-center gap-2">
                {SUGGESTED_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(q)}
                    className="px-6 py-3 rounded-full bg-white dark:bg-slate-900 border text-xs font-semibold hover:border-primary hover:text-primary transition-all shadow-sm active:scale-95"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-8 pb-10">
            {messages.map((m) => (
              <ChatMessage key={m.id} message={m} />
            ))}
            {isSending && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground animate-pulse pl-4">
                <Loader2 className="h-3 w-3 animate-spin" />
                Gemini is processing...
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-8 bg-gradient-to-t from-background via-background to-transparent pt-20 border-t relative">
        <div className="max-w-4xl mx-auto space-y-4">
          {selectedImage && (
            <div className="relative inline-block animate-in slide-in-from-bottom-4">
              <div className="relative h-20 w-20 rounded-2xl overflow-hidden border-2 border-primary shadow-xl">
                <Image src={selectedImage} alt="Selected" fill className="object-cover" />
              </div>
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-2 -right-2 p-1 bg-destructive text-white rounded-full shadow-lg"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}

          <div className="relative group">
            <Textarea
              placeholder={isListening ? "Listening for command..." : "Ask your Intelligence Assistant..."}
              className="w-full min-h-[60px] max-h-[200px] pr-32 pl-14 py-6 rounded-[2rem] border-none bg-white dark:bg-slate-900 shadow-2xl ring-1 ring-border/50 focus-visible:ring-primary/50 text-sm resize-none scroll-smooth"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(input, selectedImage || undefined);
                }
              }}
            />
            
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="p-3 text-muted-foreground hover:text-primary transition-colors rounded-full hover:bg-primary/10"
              >
                <ImageIcon className="h-5 w-5" />
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageChange} 
                className="hidden" 
                accept="image/*" 
              />
            </div>

            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <button 
                onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                className={cn(
                  "p-3 rounded-full transition-all",
                  isVoiceEnabled ? "text-primary bg-primary/10" : "text-muted-foreground"
                )}
                title={isVoiceEnabled ? "Voice response enabled" : "Voice response disabled"}
              >
                {isVoiceEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
              </button>
              <button 
                onClick={toggleVoiceInput}
                className={cn(
                  "p-3 rounded-full animate-in transition-all",
                  isListening ? "bg-red-500 text-white animate-pulse" : "text-muted-foreground hover:text-primary"
                )}
              >
                {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </button>
              <Button 
                onClick={() => handleSendMessage(input, selectedImage || undefined)}
                disabled={(!input.trim() && !selectedImage) || isSending}
                className="h-10 w-10 rounded-full bg-primary text-white shadow-lg shadow-primary/20 p-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <p className="text-[10px] text-center text-muted-foreground font-medium uppercase tracking-widest">
            Powered by Gemini 2.5 Flash • Neural Voice Active • Multi-modal Intelligence
          </p>
        </div>
      </div>
    </div>
  );
}
