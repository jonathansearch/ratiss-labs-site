export type Claim = {
  text: string;
  proofUrl: string;
};

export interface ProtocolRule {
  code: string;
  rule: string;
}

export interface PublicRegistryItem {
  title: string;
  date?: string;
  url: string;
  status: string;
}

export interface PlannedMilestone {
  horizon: string;
  description: string;
  status: 'planifié';
}

