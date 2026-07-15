export interface AgriAnalysis {
  id: string;
  userId?: string;
  timestamp: number;
  imageUrl: string;
  plantName: string;
  scientificName: string;
  isHealthy: boolean;
  disease?: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high' | 'none';
  causes: string[];
  recommendations: string[];
  organicTreatments: string[];
  preventiveMeasures: string[];
  waterRecommendation: string;
  fertilizerRecommendation: string;
  yieldImpact: string;
  recoveryTimeline: string;
  plantInfo: {
    growingConditions: string;
    climatePreference: string;
    soilPreference: string;
    waterNeeds: string;
  };
  explanation: {
    observations: string[];
    confidenceReasoning: string;
    limitations: string;
  };
}

export const MOCK_ANALYSES: Partial<AgriAnalysis>[] = [
  {
    plantName: "Tomato",
    scientificName: "Solanum lycopersicum",
    isHealthy: false,
    disease: "Late Blight",
    confidence: 0.94,
    severity: 'high',
    causes: ["High humidity", "Poor air circulation", "Infected soil"],
    recommendations: ["Prune affected leaves", "Apply copper-based fungicide", "Improve spacing"],
    organicTreatments: ["Neem oil spray", "Baking soda solution"],
    preventiveMeasures: ["Drip irrigation", "Crop rotation", "Resistant varieties"],
    waterRecommendation: "Reduce frequency, water only at base",
    fertilizerRecommendation: "Low nitrogen, high potassium",
    yieldImpact: "20-40% reduction if untreated",
    recoveryTimeline: "14-21 days",
    plantInfo: {
      growingConditions: "Full sun, well-drained soil",
      climatePreference: "Warm temperate",
      soilPreference: "Loamy, pH 6.0-6.8",
      waterNeeds: "Moderate (1-2 inches per week)"
    },
    explanation: {
      observations: ["Dark water-soaked spots on leaves", "White fungal growth on undersides", "Stem lesions"],
      confidenceReasoning: "Pattern matching corresponds strongly with Phytophthora infestans dataset.",
      limitations: "Visual analysis only; soil testing recommended for definitive confirmation."
    }
  }
];
