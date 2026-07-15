"use client";

import { useState, useRef } from "react";
import { Upload, X, Search, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ImageUploadProps {
  onAnalysisStart: (imageData: string) => void;
  isAnalyzing: boolean;
}

export default function ImageUpload({ onAnalysisStart, isAnalyzing }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
  };

  return (
    <div className="space-y-6">
      {!preview ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={cn(
            "relative group flex flex-col items-center justify-center border-2 border-dashed rounded-3xl p-12 transition-all duration-300",
            dragActive ? "border-primary bg-primary/5 scale-[1.01]" : "border-border bg-slate-50/50 hover:border-primary/50 hover:bg-slate-50"
          )}
        >
          <div className="p-4 bg-white dark:bg-slate-900 rounded-full shadow-lg group-hover:scale-110 transition-transform mb-6">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Drop your crop image here</h3>
          <p className="text-muted-foreground text-center max-w-xs mb-8">
            Upload a clear photo of leaves, fruit, or stems for real-time AI disease detection.
          </p>
          <Button 
            onClick={() => fileInputRef.current?.click()}
            className="rounded-full px-8 bg-primary hover:bg-primary/90"
          >
            Browse Files
          </Button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleChange} 
            className="hidden" 
            accept="image/*" 
          />
        </div>
      ) : (
        <div className="relative rounded-3xl overflow-hidden border bg-card shadow-2xl animate-in zoom-in-95 duration-300">
          <div className="aspect-video relative group">
            <Image 
              src={preview} 
              alt="Preview" 
              fill 
              className={cn("object-cover transition-all duration-500", isAnalyzing && "blur-sm grayscale opacity-50")} 
            />
            {!isAnalyzing && (
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-4 right-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => setPreview(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            
            {isAnalyzing && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-black/10">
                <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                <h4 className="text-xl font-bold text-white drop-shadow-md">AI Processing...</h4>
                <p className="text-white/80 text-sm mt-2">Deep neural network scanning morphological patterns</p>
              </div>
            )}
          </div>

          <div className="p-6 bg-card flex items-center justify-between border-t">
            <div className="flex flex-col">
              <span className="text-sm font-semibold">Image Ready</span>
              <span className="text-xs text-muted-foreground">Detected high-resolution source</span>
            </div>
            <div className="flex gap-3">
              {!isAnalyzing && (
                <>
                  <Button variant="outline" onClick={() => setPreview(null)} className="rounded-full">
                    Remove
                  </Button>
                  <Button onClick={() => onAnalysisStart(preview)} className="rounded-full px-8 bg-primary">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Start Analysis
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
