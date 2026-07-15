export interface EnvironmentalReport {
  id: string;
  userId?: string;
  timestamp: number;
  title: string;
  airQuality: {
    aqi: number;
    pm25: number;
    pm10: number;
    co2: number;
    temp: number;
    humidity: number;
  };
  waterQuality: {
    ph: number;
    turbidity: number;
    dissolvedOxygen: number;
    temp: number;
    score: number;
  };
  ecosystem: {
    forestCover: number;
    treeDensity: number;
    coralHealth: number;
    bleachingRisk: 'Low' | 'Moderate' | 'High' | 'Severe';
    speciesRichness: number;
    habitatQuality: number;
  };
  risks: {
    respiratory: 'Low' | 'Moderate' | 'High';
    heatStress: 'Low' | 'Moderate' | 'High';
    vectorBorne: 'Low' | 'Moderate' | 'High';
  };
}

export const MOCK_HEALTH_DATA: EnvironmentalReport = {
  id: 'current-status',
  timestamp: Date.now(),
  title: "Seasonal Environmental Audit",
  airQuality: {
    aqi: 42,
    pm25: 12.5,
    pm10: 24.0,
    co2: 415,
    temp: 22,
    humidity: 55,
  },
  waterQuality: {
    ph: 7.2,
    turbidity: 1.5,
    dissolvedOxygen: 8.4,
    temp: 18,
    score: 88,
  },
  ecosystem: {
    forestCover: 34,
    treeDensity: 450,
    coralHealth: 72,
    bleachingRisk: 'Moderate',
    speciesRichness: 850,
    habitatQuality: 78,
  },
  risks: {
    respiratory: 'Low',
    heatStress: 'Moderate',
    vectorBorne: 'Low',
  }
};
