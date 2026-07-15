"use client";

import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface ConfidenceGaugeProps {
  value: number; // 0 to 1
  label: string;
}

export default function ConfidenceGauge({ value, label }: ConfidenceGaugeProps) {
  const percentage = Math.round(value * 100);
  const data = [
    { value: percentage },
    { value: 100 - percentage },
  ];

  const getColor = (v: number) => {
    if (v > 80) return "#10b981"; // green
    if (v > 50) return "#f59e0b"; // amber
    return "#ef4444"; // red
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-secondary/20 rounded-2xl border border-border/50">
      <div className="relative h-32 w-32">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={55}
              startAngle={180}
              endAngle={0}
              paddingAngle={0}
              dataKey="value"
              stroke="none"
            >
              <Cell fill={getColor(percentage)} />
              <Cell fill="rgba(0,0,0,0.05)" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
          <span className="text-xl font-bold">{percentage}%</span>
          <span className="text-[10px] text-muted-foreground uppercase font-semibold">Confidence</span>
        </div>
      </div>
      <p className="text-xs font-medium text-muted-foreground mt-[-10px]">{label}</p>
    </div>
  );
}
