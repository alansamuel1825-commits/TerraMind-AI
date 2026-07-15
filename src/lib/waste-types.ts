export interface WasteAnalysis {
  id: string;
  userId?: string;
  timestamp: number;
  imageUrl: string;
  category: 'Plastic' | 'Paper' | 'Glass' | 'Metal' | 'Organic' | 'Electronic Waste' | 'Textiles' | 'Mixed Waste' | 'Construction Waste';
  confidence: number;
  isRecyclable: boolean;
  disposalMethod: string;
  recyclingMethod: string;
  reuseIdeas: string[];
  upcyclingIdeas: string[];
  environmentalBenefit: string;
  educationalInfo: string;
  materialInfo: {
    typicalUses: string[];
    decompositionTime: string;
    recyclingFacts: string[];
    environmentalConsiderations: string;
  };
  explanation: {
    observations: string[];
    reasoning: string;
    limitations: string;
  };
}

export const MOCK_WASTE_ANALYSES: Partial<WasteAnalysis>[] = [
  {
    category: "Plastic",
    confidence: 0.92,
    isRecyclable: true,
    disposalMethod: "Blue Bin (Recycling)",
    recyclingMethod: "Mechanical recycling after sorting by polymer type (PET/HDPE).",
    reuseIdeas: ["Multi-use storage container", "Plant pot starter"],
    upcyclingIdeas: ["DIY self-watering planter", "Plastic bottle vertical garden"],
    environmentalBenefit: "Reduces landfill volume and conserves petroleum resources used in virgin plastic production.",
    educationalInfo: "PET (Polyethylene terephthalate) is one of the most commonly recycled plastics globally.",
    materialInfo: {
      typicalUses: ["Beverage bottles", "Food packaging", "Synthetic fibers"],
      decompositionTime: "450 - 1,000 years",
      recyclingFacts: ["Only 9% of all plastic ever made has been recycled.", "Recycling plastic uses 88% less energy than making it from raw materials."],
      environmentalConsiderations: "Microplastic degradation poses significant risks to marine ecosystems and human food chains."
    },
    explanation: {
      observations: ["Transparent polymer structure", "Specific 'PET' chasing arrows symbol detected", "Smooth surface texture"],
      reasoning: "Spectral signature and shape geometry match beverage container datasets with high accuracy.",
      limitations: "Contamination levels (e.g., food residue) may affect actual recyclability at local facilities."
    }
  }
];
