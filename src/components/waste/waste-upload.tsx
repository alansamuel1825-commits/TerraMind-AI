"use client";

import { useState, useRef } from "react";
import { Upload, X, Sparkles, Loader2, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface WasteUploadProps {
  onAnalysisStart: (imageData: string) => void;
  isAnalyzing: boolean;
}

export default function WasteUpload({ onAnalysisStart, isAnalyzing }: WasteUploadProps) {
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

  const steps = [
    "Uploading image",
    "Preparing analysis",
    "Running AI vision",
    "Classifying waste",
    "Generating recommendations"
  ];

  return (
    <div className="space-y-6">
      {!preview ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={cn(
            "relative group flex flex-col items-center justify-center border-2 border-dashed rounded-3xl p-12 transition-all duration-300 min-h-[400px]",
            dragActive ? "border-primary bg-primary/5 scale-[1.01]" : "border-border bg-slate-50/50 hover:border-primary/50 hover:bg-slate-50"
          )}
        >
          <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl shadow-lg group-hover:scale-110 transition-transform mb-6 ring-1 ring-border">
            <Upload className="h-10 w-10 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Identify Waste Source</h3>
          <p className="text-muted-foreground text-center max-w-xs mb-8">
            Upload a clear photo of an object to get automated recycling instructions and upcycling ideas.
          </p>
          <div className="flex gap-4">
             <Button 
                onClick={() => fileInputRef.current?.click()}
                className="rounded-full px-8 bg-primary hover:bg-primary/90"
              >
                Browse Files
              </Button>
              <Button variant="outline" className="rounded-full px-6">
                <Camera className="mr-2 h-4 w-4" />
                Camera
              </Button>
          </div>
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
              className={cn("object-cover transition-all duration-500", isAnalyzing && "blur-sm grayscale opacity-30")} 
            />
            {!isAnalyzing && (
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-4 right-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20"
                onClick={() => setPreview(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            
            {isAnalyzing && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-black/40 text-white">
                <Loader2 className="h-12 w-12 text-primary animate-spin mb-6" />
                <div className="space-y-2">
                   <h4 className="text-2xl font-bold">Classifying Material...</h4>
                   <div className="flex flex-col gap-1">
                      {steps.map((step, i) => (
                        <div key={i} className="flex items-center gap-2 opacity-50 animate-pulse" style={{ animationDelay: `${i * 0.5}s` }}>
                           <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                           <span className="text-[10px] font-bold uppercase tracking-widest">{step}</span>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-card flex items-center justify-between border-t">
            <div className="flex flex-col">
              <span className="text-sm font-semibold">Visual Data Captured</span>
              <span className="text-xs text-muted-foreground">Image resolution: High | RGB Profile: Validated</span>
            </div>
            <div className="flex gap-3">
              {!isAnalyzing && (
                <>
                  <Button variant="outline" onClick={() => setPreview(null)} className="rounded-full">
                    Remove
                  </Button>
                  <Button onClick={() => onAnalysisStart(preview)} className="rounded-full px-8 bg-primary">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Analyze Waste
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
