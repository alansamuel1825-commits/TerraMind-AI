
export interface SystemMetric {
  label: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  unit?: string;
}

export const agriMetrics: SystemMetric[] = [
  { label: 'Soil Genome Diversity', value: 88, change: 4.2, trend: 'up', unit: '%' },
  { label: 'Molecular Synthesis Efficiency', value: 'Optimal', change: 0, trend: 'neutral' },
  { label: 'Crop Yield Forecast', value: 1240, change: 12, trend: 'up', unit: 'tons/ha' },
];

export const energyMetrics: SystemMetric[] = [
  { label: 'Microgrid Load Balance', value: 99.8, change: 0.2, trend: 'up', unit: '%' },
  { label: 'Renewable Penetration', value: 72, change: 5.5, trend: 'up', unit: '%' },
  { label: 'Predictive Load Shifting', value: 'Active', change: 0, trend: 'neutral' },
];

export const wasteMetrics: SystemMetric[] = [
  { label: 'Thermodynamic Routing', value: 94, change: 8.1, trend: 'up', unit: '%' },
  { label: 'Circular Material Flow', value: 65, change: 11.2, trend: 'up', unit: '%' },
  { label: 'Pathogen Detection Risk', value: 'Low', change: -15, trend: 'down' },
];

export const healthMetrics: SystemMetric[] = [
  { label: 'Urban Bio-Sensor Telemetry', value: 'Stable', change: 0, trend: 'neutral' },
  { label: 'Pathogen Prediction Index', value: 12, change: -2.4, trend: 'down', unit: 'idx' },
  { label: 'Neural Impact Metrics', value: 0.04, change: 0.01, trend: 'up', unit: 'σ' },
];

export const loadData = [
  { time: '00:00', load: 45, solar: 0, wind: 20 },
  { time: '04:00', load: 38, solar: 0, wind: 25 },
  { time: '08:00', load: 65, solar: 30, wind: 15 },
  { time: '12:00', load: 85, solar: 95, wind: 10 },
  { time: '16:00', load: 78, solar: 60, wind: 20 },
  { time: '20:00', load: 55, solar: 0, wind: 35 },
];
