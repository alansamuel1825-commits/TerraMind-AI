
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Clock, Search, Filter, Trash2, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function ReportCenter() {
  const reports = [
    { id: '1', name: 'Annual Bio-Health Audit', date: '2024-03-20', type: 'Health', status: 'Final' },
    { id: '2', name: 'Smart City Load Simulation', date: '2024-03-18', type: 'Energy', status: 'Draft' },
    { id: '3', name: 'Crop Pathogen Log #42', date: '2024-03-15', type: 'Agriculture', status: 'Final' },
    { id: '4', name: 'Circular Economy Monthly', date: '2024-03-10', type: 'Circular', status: 'Final' },
  ];

  return (
    <Card className="border-none shadow-xl ring-1 ring-border/50 rounded-[2.5rem] overflow-hidden h-full">
      <CardHeader className="p-8">
        <div className="flex justify-between items-center mb-4">
          <CardTitle className="text-xl flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Executive Report Hub
          </CardTitle>
          <div className="flex gap-2">
             <Button variant="outline" size="sm" className="rounded-full h-8 text-[10px] uppercase font-bold">
               <Download className="mr-2 h-3.5 w-3.5" /> Export All
             </Button>
          </div>
        </div>
        <div className="flex gap-2">
           <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
              <Input placeholder="Search archives..." className="pl-9 h-9 rounded-full bg-secondary/50 border-none text-xs" />
           </div>
           <Button variant="secondary" size="icon" className="h-9 w-9 rounded-full"><Filter className="h-3.5 w-3.5" /></Button>
        </div>
      </CardHeader>
      <CardContent className="p-8 pt-0">
        <div className="space-y-3">
           {reports.map((report) => (
             <div key={report.id} className="group flex items-center justify-between p-4 rounded-2xl bg-secondary/20 border border-transparent hover:border-primary/50 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                   <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl shadow-sm">
                      <FileText className="h-5 w-5 text-primary" />
                   </div>
                   <div>
                      <h4 className="text-sm font-bold">{report.name}</h4>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase">
                        {report.date} • {report.type}
                      </p>
                   </div>
                </div>
                <div className="flex items-center gap-2">
                   <Badge variant="outline" className="text-[8px] h-4">{report.status}</Badge>
                   <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"><ExternalLink className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-destructive"><Trash2 className="h-4 w-4" /></Button>
                   </div>
                </div>
             </div>
           ))}
        </div>
        <Button variant="ghost" className="w-full mt-6 text-[10px] font-bold uppercase tracking-widest text-primary hover:bg-primary/10">
           Browse Full Archive <Clock className="ml-2 h-3.5 w-3.5" />
        </Button>
      </CardContent>
    </Card>
  );
}
