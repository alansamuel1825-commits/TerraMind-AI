
export interface ExecutiveScore {
  id: string;
  label: string;
  score: number;
  trend: 'up' | 'down' | 'neutral';
  change: number;
  isSimulated: boolean;
  color: string;
}

export interface ScenarioData {
  id: string;
  name: string;
  carbon: number;
  energy: number;
  water: number;
  sustainability: number;
}

export const EXECUTIVE_SCORES: ExecutiveScore[] = [
  { id: 'total', label: 'Overall Sustainability', score: 84.2, trend: 'up', change: 2.1, isSimulated: true, color: 'text-primary' },
  { id: 'agri', label: 'Agriculture Health', score: 91.5, trend: 'up', change: 1.4, isSimulated: true, color: 'text-green-500' },
  { id: 'circular', label: 'Circular Economy', score: 76.8, trend: 'up', change: 3.2, isSimulated: true, color: 'text-blue-500' },
  { id: 'energy', label: 'Renewable Energy', score: 88.4, trend: 'down', change: -0.5, isSimulated: true, color: 'text-amber-500' },
  { id: 'climate', label: 'Climate Resilience', score: 82.0, trend: 'neutral', change: 0, isSimulated: true, color: 'text-indigo-500' },
  { id: 'health', label: 'Public Health', score: 89.1, trend: 'up', change: 0.8, isSimulated: true, color: 'text-red-500' },
  { id: 'water', label: 'Water Sustainability', score: 79.4, trend: 'up', change: 1.1, isSimulated: true, color: 'text-cyan-500' },
  { id: 'air', label: 'Air Quality', score: 94.0, trend: 'up', change: 4.5, isSimulated: true, color: 'text-emerald-500' },
  { id: 'carbon', label: 'Carbon Reduction', score: 68.2, trend: 'up', change: 5.4, isSimulated: true, color: 'text-slate-500' },
];

export const SCENARIOS: ScenarioData[] = [
  { id: 'current', name: 'Current State', carbon: 12.4, energy: 450, water: 2.8, sustainability: 74 },
  { id: 'improved', name: 'Improved Strategy', carbon: 8.1, energy: 380, water: 2.1, sustainability: 84 },
  { id: 'target', name: 'Future (Net Zero)', carbon: 1.2, energy: 310, water: 1.4, sustainability: 98 },
];

export const SYSTEM_ALERTS = [
  { id: 1, type: 'success', title: 'Solar Grid Stabilized', message: 'Battery clusters in Sector 4 reaching 98% efficiency.', time: '12m ago' },
  { id: 2, type: 'warning', title: 'Water Pressure Drop', message: 'Localized pressure decrease in Industrial Zone B.', time: '45m ago' },
  { id: 3, type: 'info', title: 'Agri-AI Update', message: 'V3.4-AGRI model successfully deployed to North Farm.', time: '2h ago' },
];
