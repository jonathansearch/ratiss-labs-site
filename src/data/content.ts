import { Claim, ProtocolRule, PublicRegistryItem, PlannedMilestone } from '../types';

export const HERO_CONTENT = {
  title: 'RATISS Labs — l\'audit scientifique exécutable.',
  subtitle:
    'Nous auditons les artefacts publics de la recherche : chaque affirmation, chaque hash, chaque identifiant, chaque courbe. Testés par commande, publiés avec leur annexe de reproduction.',
  links: [
    {
      label: 'Rapport d\'audit public (2026-09-12)',
      url: 'https://github.com/jonathansearch/ratiss-audit-public',
    },
    {
      label: 'Registre ORCID',
      url: 'https://orcid.org/0009-0000-4092-5313',
    },
    {
      label: 'GitHub',
      url: 'https://github.com/jonathansearch',
    },
  ],
};

export interface ServiceCard {
  id: string;
  title: string;
  claim: Claim;
}

export const SERVICES_CONTENT: ServiceCard[] = [
  {
    id: 'artefacts',
    title: 'Audit d\'artefacts publics',
    claim: {
      text: 'Nous prenons vos dépôts, préprints et jeux de données publics, et nous testons chaque preuve : validité des hashes, format des identifiants, plausibilité physique, corrélations impossibles. Rapport publié, annexe de reproduction incluse.',
      proofUrl: 'https://github.com/jonathansearch/ratiss-audit-public',
    },
  },
  {
    id: 'reproductibilite',
    title: 'Audit de reproductibilité logicielle',
    claim: {
      text: 'Tests, graines, manifests figés : nous vérifions que votre code refait ce que votre article annonce, et nous publions ce qui casse.',
      proofUrl: 'https://github.com/jonathansearch/ratiss-audit-public/blob/main/PUBLIC-AUDIT-REPORT-EN.md',
    },
  },
  {
    id: 'pilotes',
    title: 'Pilotes d\'audit scellés',
    claim: {
      text: 'Métriques scellées avant l\'audit, verdict après. Un résultat négatif se publie comme un résultat positif.',
      proofUrl: 'https://github.com/jonathansearch/ratiss-audit-public/blob/main/JOURNAL-DEVIATIONS.md',
    },
  },
];

export const PROTOCOL_RULES: ProtocolRule[] = [
  {
    code: 'R4',
    rule: 'Raisonnement conceptuel toujours autorisé ; chiffre publié seulement s\'il a été calculé, avec paramètres et hash.',
  },
  {
    code: 'R5',
    rule: 'Prompts et paramètres scellés, hashés dans chaque run ; modification après mesure = journal des déviations.',
  },
  {
    code: 'R6',
    rule: 'Bras expérimentaux séparés du chemin critique ; verdict par ablation avec/sans, jamais par intuition.',
  },
  {
    code: 'R7',
    rule: 'Aucune affirmation publique sans qu\'un étranger puisse la reproduire en une commande.',
  },
  {
    code: 'Hérité 1',
    rule: 'Une simulation n\'est pas une exécution matérielle.',
  },
  {
    code: 'Hérité 2',
    rule: 'Un identifiant enregistré n\'est pas une revalidation en temps réel.',
  },
];

export const PROTOCOL_LINK = {
  label: 'Journal des déviations du labo',
  url: 'https://github.com/jonathansearch/ratiss-audit-public/blob/main/JOURNAL-DEVIATIONS.md',
};

export const REGISTRY_ITEMS: PublicRegistryItem[] = [
  {
    title: 'Rapport d\'audit public, 2026-09-12',
    date: '2026-09-12',
    url: 'https://github.com/jonathansearch/ratiss-audit-public',
    status: 'dépôt ratiss-audit-public',
  },
  {
    title: 'Notices de correction OSF, 2026-09-12 (osf.io/4867h)',
    date: '2026-09-12',
    url: 'https://osf.io/4867h',
    status: 'corrigé le 2026-09-12',
  },
  {
    title: 'Notices de correction OSF, 2026-09-12 (osf.io/wf7qm)',
    date: '2026-09-12',
    url: 'https://osf.io/wf7qm',
    status: 'corrigé le 2026-09-12',
  },
  {
    title: 'Notices de correction OSF, 2026-09-12 (osf.io/u4aek)',
    date: '2026-09-12',
    url: 'https://osf.io/u4aek',
    status: 'corrigé le 2026-09-12',
  },
  {
    title: 'Préprint : osf.io/wf7qm',
    url: 'https://osf.io/wf7qm',
    status: 'préprint ; corrections publiques du 2026-09-12 liées',
  },
  {
    title: 'Préprint : osf.io/6jzmb',
    url: 'https://osf.io/6jzmb',
    status: 'préprint ; corrections publiques du 2026-09-12 liées',
  },
  {
    title: 'Préprint : osf.io/4867h',
    url: 'https://osf.io/4867h',
    status: 'préprint ; corrections publiques du 2026-09-12 liées',
  },
  {
    title: 'Préprint : osf.io/u4aek',
    url: 'https://osf.io/u4aek',
    status: 'préprint ; corrections publiques du 2026-09-12 liées',
  },
  {
    title: 'Bot de prévision Metaculus AIB',
    url: 'https://github.com/jonathansearch/metac-bot-template',
    status: 'dry-run ; publication soumise au backtest',
  },
];

export const PLANNED_MILESTONES: PlannedMilestone[] = [
  {
    horizon: 'M1–M2',
    description: 'consolidation de 42 dépôts en un framework audité unique.',
    status: 'planifié',
  },
  {
    horizon: 'M2–M4',
    description:
      'campagne de reproduction sur matériel quantique réel (plan ouvert IBM), job IDs et hashes publiés.',
    status: 'planifié',
  },
  {
    horizon: 'M4–M8',
    description: 'benchmark de prévision Metaculus ; couplage RATISS × LeWM.',
    status: 'planifié',
  },
  {
    horizon: 'M8–M12',
    description:
      'cohorte ouverte à Yaoundé : former des jeunes sans diplôme à vérifier, pas seulement à chercher.',
    status: 'planifié',
  },
];

export const CONTACT_CONTENT = {
  email: 'jonathan.ratisslabs@zohomail.com',
  text: 'Écrire au labo : par email professionnel direct ou via GitHub (issues et discussions sur ratiss-audit-public). Toute demande d\'audit fait l\'objet d\'une traçabilité rigoureuse.',
  githubUrl: 'https://github.com/jonathansearch/ratiss-audit-public',
};

export const WORK_WITH_LAB_CONTENT = {
  title: 'Travailler avec le labo',
  text: 'Toute mission d\'audit fait l\'objet d\'un mandat public : périmètre déclaré, métriques scellées avant audit, publication intégrale du rapport. Le mandaté ne dispose d\'aucun droit de regard ni de délai de correction avant publication. Les termes types seront publiés avec le premier mandat réel.',
};

