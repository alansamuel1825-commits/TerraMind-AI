export interface EnergySimulation {
  id: string;
  userId?: string;
  timestamp: number;
  inputs: {
    buildingType: string;
    peopleCount: number;
    dailyUsage: number; // kWh
    solarCapacity: number; // kW
    batteryStorage: number; // kWh
    weatherCondition: 'Sunny' | 'Cloudy' | 'Rainy' | 'Variable';
  };
  results: {
    expectedDemand: number;
    estimatedSolarGen: number;
    carbonReduction: number;
    costSavings: number;
    efficiencyRating: number;
    gridDependency: number;
    batteryLevel: number;
    peakHours: string;
  };
  recommendations: {
    title: string;
    description: string;
    benefit: string;
    icon: string;
  }[];
  charts: {
    consumptionTrend: { time: string; value: number }[];
    renewableMix: { name: string; value: number }[];
  };
}

export const BUILDING_TYPES = [
  "Residential (Single Family)",
  "Residential (Multi-Family)",
  "Commercial (Office)",
  "Commercial (Retail)",
  "Industrial (Warehouse)",
  "Education (School/Uni)",
  "Healthcare (Clinic/Hospital)"
];

export const MOCK_ENERGY_SIMULATION: Partial<EnergySimulation> = {
  inputs: {
    buildingType: "Commercial (Office)",
    peopleCount: 45,
    dailyUsage: 120,
    solarCapacity: 25,
    batteryStorage: 40,
    weatherCondition: 'Sunny'
  },
  results: {
    expectedDemand: 110,
    estimatedSolarGen: 85,
    carbonReduction: 12.4,
    costSavings: 450,
    efficiencyRating: 92,
    gridDependency: 15,
    batteryLevel: 88,
    peakHours: "11:00 AM - 3:00 PM"
  },
  recommendations: [
    {
      title: "Peak Load Shifting",
      description: "Shift non-essential cooling cycles to peak solar production hours.",
      benefit: "Reduces grid dependency by 8%",
      icon: "Zap"
    },
    {
      title: "HVAC Optimization",
      description: "Install smart thermostats to optimize climate control based on occupancy.",
      benefit: "Saves ~150kWh monthly",
      icon: "Thermometer"
    },
    {
      title: "Battery Expansion",
      description: "Adding 10kWh of storage would allow for 100% overnight self-sufficiency.",
      benefit: "Achieves Net-Zero daily",
      icon: "Battery"
    }
  ],
  charts: {
    consumptionTrend: [
      { time: '00:00', value: 20 },
      { time: '04:00', value: 15 },
      { time: '08:00', value: 45 },
      { time: '12:00', value: 95 },
      { time: '16:00', value: 80 },
      { time: '20:00', value: 40 },
      { time: '23:59', value: 25 },
    ],
    renewableMix: [
      { name: 'Solar', value: 65 },
      { name: 'Grid (Fossil)', value: 15 },
      { name: 'Grid (Wind)', value: 10 },
      { name: 'Battery', value: 10 },
    ]
  }
};
