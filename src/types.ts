export interface CalibrationData {
  niveau: number;
  p_sig: number;
  theorique?: number;
}

export interface ExpertiseItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  points: string[];
  proofRef: string;
}

export interface CommercialOffer {
  id: string;
  title: string;
  tagline: string;
  baseProofs: string;
  currentLevel: string;
  recommendedFormulation: string;
  deliverables: string[];
  audience: string;
}

export interface RepositoryAuditItem {
  name: string;
  category: 'Quantum Hardware' | 'Agentic Systems' | 'HPC & Simulation' | 'Bio-physique' | 'Robotique & Cyber';
  localTests: string;
  hardwareProof: string;
  status: 'Hardware documenté' | 'Tests locaux validés' | 'Simulation explicite' | 'Prototype documenté';
  branch: string;
  keyArtifacts: string;
  url: string;
}

export interface ProtocolStep {
  number: string;
  title: string;
  description: string;
  outputArtifacts: string[];
  falsifiability: string;
}

export interface SimulationParams {
  noiseLevel: number;
  thresholdInflexion: number;
  backend: 'ibm_marrakesh' | 'ibm_fez' | 'aer_simulator' | 'statevector';
  shots: number;
  couplingStrength: number;
  zkVerification: boolean;
}

export interface PhysicalPartnershipPillar {
  name: string;
  shortName: string;
  role: string;
  hardwareFabricationFocus: string;
  tests: string;
  url: string;
  color: string;
}

export interface PhysicalConstructionPartnership {
  title: string;
  splitRatio: {
    partnerPercent: number;
    labPercent: number;
    partnerRole: string;
    labRole: string;
  };
  pillars: PhysicalPartnershipPillar[];
}

