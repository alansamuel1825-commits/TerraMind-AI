
export interface SystemMetric {
  id: string;
  label: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  unit?: string;
  history: { value: number }[];
}

export const dashboardKPIs: SystemMetric[] = [
  { id: 'crop', label: 'Crop Health', value: 92, change: 2.4, trend: 'up', unit: '%', history: [{value: 80}, {value: 85}, {value: 82}, {value: 90}, {value: 92}] },
  { id: 'energy', label: 'Energy Consumption', value: 450, change: -12, trend: 'down', unit: 'MWh', history: [{value: 520}, {value: 500}, {value: 480}, {value: 460}, {value: 450}] },
  { id: 'carbon', label: 'Carbon Emissions', value: 12.4, change: -5.1, trend: 'down', unit: 't', history: [{value: 15}, {value: 14.5}, {value: 13.8}, {value: 13}, {value: 12.4}] },
  { id: 'water', label: 'Water Usage', value: 2.8, change: 0.8, trend: 'up', unit: 'ML', history: [{value: 2.5}, {value: 2.6}, {value: 2.7}, {value: 2.75}, {value: 2.8}] },
  { id: 'waste', label: 'Waste Generated', value: 840, change: -8.4, trend: 'down', unit: 'kg', history: [{value: 1100}, {value: 1000}, {value: 950}, {value: 900}, {value: 840}] },
  { id: 'air', label: 'Air Quality Index', value: 34, change: -15, trend: 'down', unit: 'AQI', history: [{value: 50}, {value: 45}, {value: 40}, {value: 38}, {value: 34}] },
  { id: 'climate', label: 'Climate Risk', value: 'Low', change: 0, trend: 'neutral', history: [{value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}] },
  { id: 'health', label: 'Public Health Index', value: 88, change: 1.2, trend: 'up', unit: '', history: [{value: 85}, {value: 86}, {value: 87}, {value: 87.5}, {value: 88}] },
];

export const energyTrendData = [
  { time: 'Mon', usage: 45, solar: 20 },
  { time: 'Tue', usage: 52, solar: 25 },
  { time: 'Wed', usage: 48, solar: 30 },
  { time: 'Thu', usage: 61, solar: 35 },
  { time: 'Fri', usage: 55, solar: 28 },
  { time: 'Sat', usage: 40, solar: 15 },
  { time: 'Sun', usage: 38, solar: 10 },
];

export const wasteDistributionData = [
  { name: 'Organic', value: 400 },
  { name: 'Plastic', value: 300 },
  { name: 'Paper', value: 300 },
  { name: 'Metal', value: 200 },
];

export const aiInsights = [
  { id: 1, type: 'success', title: 'Crop Health Improving', description: 'NDVI index in Northern Sector increased by 12% following optimized irrigation.', time: '2h ago' },
  { id: 2, type: 'warning', title: 'Energy Demand Spike', description: 'Predicted peak load at 14:00 exceeds current renewable capacity by 15%.', time: '1h ago' },
  { id: 3, type: 'info', title: 'Waste Optimization', description: 'New circular flow identified between Sector 4 and Industrial Zone B.', time: '30m ago' },
];

export const recentActivity = [
  { id: 1, action: 'Report Generated', target: 'Monthly Sustainability Audit', time: '10m ago' },
  { id: 2, action: 'Sensor Calibration', target: 'Water Quality - Plot B', time: '45m ago' },
  { id: 3, action: 'Data Upload', target: 'Satellite Imagery Batch #42', time: '2h ago' },
];
export const agriMetrics: SystemMetric[] = [
  {
    id: "soil",
    label: "Soil Health",
    value: 91,
    change: 3.2,
    trend: "up",
    unit: "%",
    history: [
      { value: 82 },
      { value: 84 },
      { value: 87 },
      { value: 89 },
      { value: 91 },
    ],
  },
  {
    id: "water",
    label: "Water Efficiency",
    value: 88,
    change: 1.5,
    trend: "up",
    unit: "%",
    history: [
      { value: 80 },
      { value: 82 },
      { value: 84 },
      { value: 86 },
      { value: 88 },
    ],
  },
  {
    id: "yield",
    label: "Yield Prediction",
    value: 95,
    change: 2.8,
    trend: "up",
    unit: "%",
    history: [
      { value: 86 },
      { value: 88 },
      { value: 90 },
      { value: 93 },
      { value: 95 },
    ],
  },
];
