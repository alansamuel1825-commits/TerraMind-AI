export interface CityMetrics {
  population: number;
  rainfall: number;
  temperature: number;
  electricityDemand: number;
  renewablePercent: number;
  treeCoverage: number;
  wasteGeneration: number;
  recyclingRate: number;
  trafficDensity: number;
  waterAvailability: number;
  publicTransport: number;
  greenRoofAdoption: number;
}

export interface SimulationResults {
  energyDemand: number;
  carbonEmissions: number;
  cropProductivity: number;
  airQualityIndex: number;
  waterStress: number;
  urbanHeatScore: number;
  wasteManagement: number;
  sustainabilityScore: number;
}

export interface CitySimulation {
  id: string;
  userId?: string;
  name: string;
  timestamp: number;
  inputs: CityMetrics;
  results: SimulationResults;
}

export type ClimateEvent = 'Heatwave' | 'Flood' | 'Drought' | 'Wildfire' | 'Heavy Rain' | 'Pollution';

export const INITIAL_CITY_METRICS: CityMetrics = {
  population: 50000,
  rainfall: 1200,
  temperature: 22,
  electricityDemand: 500,
  renewablePercent: 35,
  treeCoverage: 25,
  wasteGeneration: 80,
  recyclingRate: 40,
  trafficDensity: 60,
  waterAvailability: 90,
  publicTransport: 30,
  greenRoofAdoption: 10,
};

export const CITY_OBJECTS = [
  { id: 'home', label: 'Residential', icon: 'Home', description: 'Smart-metered housing clusters.' },
  { id: 'school', label: 'Education', icon: 'BookOpen', description: 'Net-zero learning facility.' },
  { id: 'hospital', label: 'Healthcare', icon: 'HeartPulse', description: 'Critical infrastructure with backup microgrid.' },
  { id: 'solar', label: 'Solar Farm', icon: 'Zap', description: 'Photovoltaic energy generation.' },
  { id: 'wind', label: 'Wind Turbine', icon: 'Wind', description: 'High-altitude wind energy extraction.' },
  { id: 'factory', label: 'Industrial', icon: 'Factory', description: 'Circular manufacturing node.' },
  { id: 'farm', label: 'Urban Farm', icon: 'Sprout', description: 'Vertical and hydroponic food production.' },
  { id: 'ev', label: 'EV Station', icon: 'BatteryCharging', description: 'Ultra-fast electric vehicle charging.' },
  { id: 'water', label: 'Reservoir', icon: 'Droplets', description: 'Potable water storage and filtration.' },
  { id: 'recycling', label: 'Circular Hub', icon: 'Recycle', description: 'Material recovery and upcycling facility.' },
  { id: 'park', label: 'Green Space', icon: 'Leaf', description: 'Urban carbon sink and heat mitigator.' },
  { id: 'transit', label: 'Public Transit', icon: 'Bus', description: 'Zero-emission rapid transport network.' },
];
