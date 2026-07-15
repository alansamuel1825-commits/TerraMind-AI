"use client";

import { ChatThread } from "@/lib/ai-assistant-types";
import { useFirestore, useUser } from "@/firebase";
import { collection, query, where, orderBy } from "firebase/firestore";
import { useCollection } from "@/firebase";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  MessageSquare, 
  Trash2, 
  Edit2, 
  Search,
  Clock,
  MoreVertical
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { deleteChatThread, renameChatThread } from "@/firebase/firestore/ai-service";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChatSidebarProps {
  activeThreadId: string | null;
  onSelectThread: (id: string | null) => void;
}

export default function ChatSidebar({ activeThreadId, onSelectThread }: ChatSidebarProps) {
  const firestore = useFirestore();
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState("");

  const chatQuery = useMemo(() => {
    if (!firestore || !user) return null;
    return query(
      collection(firestore, "chat_threads"),
      where("userId", "==", user.uid),
      orderBy("lastMessageAt", "desc")
    );
  }, [firestore, user]);

  const { data: threads, loading } = useCollection<ChatThread>(chatQuery);

  const filteredThreads = useMemo(() => {
    if (!threads) return [];
    return threads.filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [threads, searchTerm]);

  return (
    <div className="w-80 border-r bg-card/30 backdrop-blur-xl flex flex-col h-full overflow-hidden">
      <div className="p-6 border-b space-y-4">
        <Button 
          onClick={() => onSelectThread(null)}
          className="w-full rounded-[1.5rem] bg-primary text-white shadow-lg shadow-primary/20 py-6"
        >
          <Plus className="mr-2 h-4 w-4" /> New Conversation
        </Button>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search history..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-10 rounded-xl bg-secondary/50 border-none text-xs"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {loading ? (
          <div className="space-y-4 p-4">
            {[1, 2, 3].map(i => <div key={i} className="h-12 bg-muted/50 animate-pulse rounded-xl" />)}
          </div>
        ) : filteredThreads.length === 0 ? (
          <div className="text-center py-10 opacity-30">
            <Clock className="h-8 w-8 mx-auto mb-2" />
            <p className="text-[10px] font-bold uppercase tracking-widest">No previous chats</p>
          </div>
        ) : (
          filteredThreads.map((thread) => (
            <div
              key={thread.id}
              className={cn(
                "group relative flex items-center gap-3 p-3 rounded-2xl transition-all cursor-pointer border border-transparent",
                activeThreadId === thread.id 
                  ? "bg-primary/10 text-primary border-primary/20 shadow-sm" 
                  : "hover:bg-secondary/50 text-muted-foreground hover:text-foreground"
              )}
              onClick={() => onSelectThread(thread.id)}
            >
              <MessageSquare className="h-4 w-4 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold truncate pr-4">{thread.title}</p>
                <p className="text-[9px] opacity-60 mt-0.5">
                  {new Date(thread.lastMessageAt).toLocaleDateString()}
                </p>
              </div>

              <div className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      <MoreVertical className="h-3.5 w-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => {
                      const newTitle = prompt("Enter new title:", thread.title);
                      if (newTitle) renameChatThread(firestore!, thread.id, newTitle);
                    }}>
                      <Edit2 className="mr-2 h-4 w-4" /> Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-destructive"
                      onClick={() => deleteChatThread(firestore!, thread.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
