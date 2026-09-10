import { CommercialOffer, ExpertiseItem, RepositoryAuditItem, ProtocolStep, CalibrationData } from '../types';

export const CALIBRATION_POINTS: CalibrationData[] = [
  { niveau: 0.00, p_sig: 2.35, theorique: 2.35 },
  { niveau: 0.25, p_sig: 0.82, theorique: 0.82 },
  { niveau: 0.50, p_sig: 0.38, theorique: 0.38 },
  { niveau: 0.75, p_sig: 0.31, theorique: 0.31 },
  { niveau: 1.00, p_sig: 0.29, theorique: 0.29 },
];

export const EXPERTISE_ITEMS: ExpertiseItem[] = [
  {
    id: 'audit-quantique',
    number: '01',
    title: 'Audit quantique & topologique',
    subtitle: 'Validation cross-IBM, provenance de jobs, comptes, shots et signature Psig.',
    description: 'Analyse méthodique des circuits et de la décohérence. Vérification systématique de l’intégrité des exécutions physiques, traçabilité des job IDs IBM et isolation stricte entre simulations Aer et calcul QPU physique.',
    points: [
      'Contrôle formel des backends IBM (Marrakesh, Fez, Kingston)',
      'Mesure de cohérence et invariance de signatures topologiques (Psig)',
      'Délimitation analytique des comptes et séparation densité/graphe',
      'Extraction et archivage d’artefacts JSON certifiés'
    ],
    proofRef: 'RATISS-ODV-AEON · Job d9u47t0u5hac73agnhj0'
  },
  {
    id: 'agents-souverains',
    number: '02',
    title: 'Agents IA souverains',
    subtitle: 'Architecture local-first, mémoire contrôlée, orchestrations scientifiques et preuves ZK.',
    description: 'Conception d’agents d’ingénierie et de recherche fonctionnant en environnement déconnecté ou hautement régulé. Zéro fuite de données vers des tiers, journalisation immuable et conteneurisation déterministe.',
    points: [
      'Exécution local-first sans dépendance API non auditée',
      'Traçabilité cryptographique par reçus ZK et hashes SHA-256',
      'Mémoire cognitive persistante et graphe relationnel de preuves',
      'Orchestration multi-modèles (local LLM + pipelines symboliques)'
    ],
    proofRef: 'RATISS-ODV-AEON · Docker Run du 10 août 2026'
  },
  {
    id: 'reproductibilite',
    number: '03',
    title: 'Reproductibilité scientifique',
    subtitle: 'Code déterministe, artefacts versionnés, tests, benchmarks et contrats de provenance.',
    description: 'Parce qu’une affirmation sans protocole n’a aucune valeur en physique. Nous construisons des harnais de tests rigoureux, avec graines déterministes, logs d’exécution immuables et audits de complexité.',
    points: [
      'Suites de tests automatisés (123 tests validés en audit CTO)',
      'Contrats de provenance et manifestes de dépendances figés',
      'Isolation des seeds aléatoires et détection des biais numériques',
      'Transparence absolue sur les hypothèses et échecs de réplication'
    ],
    proofRef: 'ratiss-grid (19/19) · ratiss-hpc (15/15) · ratiss-qpu-ambient (43/43)'
  },
  {
    id: 'systemes-critiques',
    number: '04',
    title: 'Architecture de systèmes critiques',
    subtitle: 'Low-power, offline-first, résilience extrême et trajectoires de validation.',
    description: 'Optimisation matérielle et logicielle pour systèmes embarqués, instrumentation de pointe et déploiements en milieux contraints où la latence et la tolérance aux pannes sont impératives.',
    points: [
      'Conception offline-first pour infrastructures souveraines',
      'Gestion thermodynamique et optimisation de charge thermique / CPU',
      'Firmware analytique et bancs de simulation matériel-en-boucle',
      'Architecture résiliente face aux perturbations électromagnétiques'
    ],
    proofRef: 'ratiss-biolab · tests firmware et thermique passés'
  }
];

export const COMMERCIAL_OFFERS: CommercialOffer[] = [
  {
    id: 'audit-qpu',
    title: 'Audit quantique',
    tagline: 'Certification de circuits, comptes de shots et provenance QPU',
    baseProofs: 'RATISS-ODV-AEON, Travaux, ratiss-qpu-ambient, engine de post-traitement',
    currentLevel: 'Hardware IBM documenté + simulation + tests locaux',
    recommendedFormulation: 'Audit de circuits, provenance des jobs, comptes, shots, bruit et reproductibilité ; accès hardware via fournisseurs/partenaires selon mandat.',
    deliverables: [
      'Rapport d’audit des circuits et job IDs audités',
      'Vérification de corrélation (Spearman / Pearson)',
      'Analyse comparative Simulateur Aer vs QPU réel',
      'Fichiers d’artefacts JSON structurés et vérifiés'
    ],
    audience: 'Laboratoires de physique, équipes R&D quantique, fonds de capital-risque deep-tech'
  },
  {
    id: 'agents-ia',
    title: 'Agents IA souverains',
    tagline: 'Systèmes autonomes locaux et instrumentation scientifique',
    baseProofs: 'RATISS-ODV-AEON, ratiss-scientist-agent, ratiss-aeon-agent, robot-Ratiss-',
    currentLevel: 'Architecture conteneurisée + run agentique documenté avec ZK-receipt',
    recommendedFormulation: 'Architecture, sécurisation et instrumentation d’agents scientifiques souverains ; chaque run est livré avec artefacts et limites explicites.',
    deliverables: [
      'Stack conteneurisée Docker local-first complète',
      'Contrats de journalisation cryptographique',
      'Protocole d’orchestration et garde-fous déterministes',
      'Documentation de déploiement offline'
    ],
    audience: 'Industries de défense, santé, banques, centres de calcul souverains'
  },
  {
    id: 'reproductibilite-sc',
    title: 'Reproductibilité scientifique',
    tagline: 'Audit de code, tests rigoureux et certification d’artefacts',
    baseProofs: 'ratiss-grid, ratiss-hpc, ratiss-biolab, suites de tests CTO validées',
    currentLevel: 'Suites de tests unitaires et d’intégration réussies',
    recommendedFormulation: 'Audit de code, tests, artefacts, provenance et protocole de reproduction.',
    deliverables: [
      'Harnais de test automatisé et matrice de couverture',
      'Audit de déterminisme numérique et graines',
      'Rapport d’incohérences et plan de remédiation',
      'Certification de reproductibilité logicielle'
    ],
    audience: 'Équipes de recherche académique, comités éditoriaux, agences de financement'
  },
  {
    id: 'audit-topologique',
    title: 'Audit topologique',
    tagline: 'Extraction et validation de persistance (Psig, LCT)',
    baseProofs: 'LCT, engine, RATISS-ODV-AEON, résultats 4MZI / 3KMD',
    currentLevel: 'Analytique + simulation + QPU documenté',
    recommendedFormulation: 'Audit de métriques topologiques et de la séparation entre graphe, densité, sidecar et hardware.',
    deliverables: [
      'Calcul de persistance topologique et seuils d’inflexion',
      'Matrice de sensibilité face au bruit injecté',
      'Visualisation des diagrammes de persistance 2D/3D',
      'Validation de monotonicité LCT sur données réelles'
    ],
    audience: 'Mathématiciens appliqués, roboticiens, chercheurs en vision physique'
  },
  {
    id: 'training-ia-qpu',
    title: 'Training quantique & IA',
    tagline: 'Transfert de compétences pour ingénieurs et chercheurs',
    baseProofs: 'Corpus de scripts, notebooks, connecteurs, simulations et tests',
    currentLevel: 'Compétence logicielle et méthodologique démontrée',
    recommendedFormulation: 'Formation appliquée sur circuits, mesures, provenance, agents et reproductibilité ; cadrage précis sans promesse non vérifiable.',
    deliverables: [
      'Ateliers pratiques avec bancs de simulation et IBM Qiskit',
      'Notebooks interactifs reproductibles fournis',
      'Formation aux protocoles d’audit et de détection d’artefacts',
      'Support technique post-formation'
    ],
    audience: 'Écoles d’ingénieurs, doctorants, équipes de transformation R&D'
  },
  {
    id: 'cto-fractionnaire',
    title: 'CTO fractionnaire & Advisory',
    tagline: 'Gouvernance technologique et réduction du risque d’exécution',
    baseProofs: 'Architecture multi-dépôts (43 dépôts audités), CI/tests, cartographie hardware/logiciel',
    currentLevel: 'Forte preuve d’architecture documentaire et d’audit global',
    recommendedFormulation: 'Gouvernance technique, choix de stack, plans de validation et réduction du risque d’exécution.',
    deliverables: [
      'Audit d’architecture complet et cartographie des risques',
      'Sélection et benchmark des stacks logicielles et matérielles',
      'Structuration des équipes et revues de code critiques',
      'Accompagnement stratégique devant comités d’investisseurs'
    ],
    audience: 'Fondateurs de startups deep-tech, investisseurs pré-seed/seed, directeurs R&D'
  },
  {
    id: 'saas-api',
    title: 'SaaS / API Deep-Tech',
    tagline: 'Prototypage d’interfaces d’audit et de dashboards scientifiques',
    baseProofs: 'Dashboards, quantum-circuit-studio, atlas, replays et connecteurs',
    currentLevel: 'Prototypes logiciels fonctionnels et démonstrateurs',
    recommendedFormulation: 'Prototypage d’API et d’outils de suivi de preuves ; SLA, hébergement et intégrations à définir par projet.',
    deliverables: [
      'Démonstrateurs interactifs sur mesure',
      'API REST / GraphQL pour extraction de métriques de persistance',
      'Visualiseurs de décohérence et atlas de données',
      'Intégration dans vos portails d’entreprise'
    ],
    audience: 'Entreprises souhaitant outiller leurs chercheurs et auditeurs'
  }
];

export const AUDITED_REPOSITORIES: RepositoryAuditItem[] = [
  {
    name: 'RATISS-ODV-AEON',
    category: 'Quantum Hardware',
    localTests: '98 passés (suite globale en cours)',
    hardwareProof: 'IBM Marrakesh (3 runs, 4096 shots, Spearman +0.7133, Job d9u47t0u5hac73agnhj0)',
    status: 'Hardware documenté',
    branch: 'main',
    keyArtifacts: 'LCT.md, lct_qpu_monotonicity_avg3_results.json, PROOF.md (ZK receipt)',
    url: 'https://github.com/jonathansearch/RATISS-ODV-AEON'
  },
  {
    name: 'ratiss-qpu-ambient',
    category: 'Quantum Hardware',
    localTests: '43 / 43 tests passés',
    hardwareProof: 'IBM Marrakesh (1024 shots, Bell circuit, fidélité classique 0.986)',
    status: 'Hardware documenté',
    branch: 'main',
    keyArtifacts: 'bell_cross_validation.json, ibm_validation.py, simulateur de banc virtuel',
    url: 'https://github.com/jonathansearch/ratiss-qpu-ambient'
  },
  {
    name: 'Travaux',
    category: 'Quantum Hardware',
    localTests: '24 / 24 tests passés',
    hardwareProof: 'IBM Fez (Job da81b5m0ukec7383sf20, Psig 0.16107, contraste 0.26009) & Marrakesh (4096 shots)',
    status: 'Hardware documenté',
    branch: 'main',
    keyArtifacts: 'ktn_phase5_qpu.json, qpu_ibmmarrakesh.json, qpu_psig_ibmmarrakesh.json',
    url: 'https://github.com/jonathansearch/Travaux'
  },
  {
    name: 'ratiss-grid',
    category: 'HPC & Simulation',
    localTests: '19 / 19 tests passés',
    hardwareProof: 'Modélisation analytique déterministe et scénarios ENEO',
    status: 'Tests locaux validés',
    branch: 'main',
    keyArtifacts: 'Calcul CPA/ENEO, bornes physiques, suites pytest conformes',
    url: 'https://github.com/jonathansearch/ratiss-grid'
  },
  {
    name: 'ratiss-hpc',
    category: 'HPC & Simulation',
    localTests: '15 / 15 tests passés',
    hardwareProof: 'Validation physique logicielle sur banc de calcul virtuel',
    status: 'Tests locaux validés',
    branch: 'main',
    keyArtifacts: 'Benchmarks physiques logiciels, modèles d’énergie',
    url: 'https://github.com/jonathansearch/ratiss-hpc'
  },
  {
    name: 'ratiss-atelier',
    category: 'Robotique & Cyber',
    localTests: 'Protocoles d\'usinage & outillage validés',
    hardwareProof: 'Spécifications de fabrication physique mécatronique et outillage d\'assemblage',
    status: 'Hardware documenté',
    branch: 'main',
    keyArtifacts: 'Plans CAO/CAM, spécifications mécatroniques, banc de prototypage',
    url: 'https://github.com/jonathansearch/ratiss-atelier'
  },
  {
    name: 'ratiss-biolab',
    category: 'Bio-physique',
    localTests: '19 / 19 tests passés',
    hardwareProof: 'Simulateur optique, thermique et banc de test firmware',
    status: 'Tests locaux validés',
    branch: 'main',
    keyArtifacts: 'Bancs de tests firmware logiciel, équations thermiques résolues',
    url: 'https://github.com/jonathansearch/ratiss-biolab'
  },
  {
    name: 'ratiss-lewm-integration',
    category: 'Robotique & Cyber',
    localTests: '3 / 3 tests passés',
    hardwareProof: 'Calibration Psig déterministe (graine 42, 96 points, seuil ~0.125)',
    status: 'Tests locaux validés',
    branch: 'main',
    keyArtifacts: 'Rapports de sensibilité A/B, calibration PushT synthétique',
    url: 'https://github.com/jonathansearch/ratiss-lewm-integration'
  },
  {
    name: 'QPU-Ratiss-COSMOS',
    category: 'Quantum Hardware',
    localTests: 'Simulation Aer locale (256 shots, seed 42)',
    hardwareProof: 'Frontière explicite : validated_on_hardware=false',
    status: 'Simulation explicite',
    branch: 'main',
    keyArtifacts: 'Séparation rigoureuse counts / densité / sidecar',
    url: 'https://github.com/jonathansearch/QPU-Ratiss-COSMOS'
  },
  {
    name: 'robot-Ratiss-',
    category: 'Robotique & Cyber',
    localTests: 'Banc de décision validé (3 décisions certifiées)',
    hardwareProof: 'tests/robot_brain_results.json documenté',
    status: 'Prototype documenté',
    branch: 'main',
    keyArtifacts: 'Architecture caméra / capteurs / cerveau décisionnel',
    url: 'https://github.com/jonathansearch/robot-Ratiss-'
  },
  {
    name: 'ratiss-topological-decoherence-engine',
    category: 'Quantum Hardware',
    localTests: 'Contrats logiciels et replay de timelines',
    hardwareProof: 'IBM Marrakesh (Jobs da53s4jotlns739bfgu0 & da58ftmaa69c739kic90)',
    status: 'Simulation explicite',
    branch: 'main',
    keyArtifacts: 'data/qpu_bell_counts.json, data/qpu_5q_timeline.json (frontière préservée)',
    url: 'https://github.com/jonathansearch/ratiss-topological-decoherence-engine'
  }
];

export const PROTOCOL_STEPS: ProtocolStep[] = [
  {
    number: '01',
    title: 'Plan',
    description: 'Formulation rigoureuse de l’hypothèse physique, du modèle mathématique et du critère strict de falsifiabilité. Rien n’est initié sans une borne d’échec prédéfinie.',
    outputArtifacts: [
      'Document d’hypothèse formelle',
      'Critère de falsifiabilité chiffré',
      'Spécification des jeux de données et backends requis'
    ],
    falsifiability: 'Le protocole s’annule si la métrique de contrôle dépasse le seuil d’erreur autorisé.'
  },
  {
    number: '02',
    title: 'Execute',
    description: 'Exécution du code, compilation des circuits quantiques, lancement des benchmarks déterministes ou conduite de l’expérience instrumentée.',
    outputArtifacts: [
      'Exécutions horodatées sous graines déterministes',
      'Logs d’exécution bruts et comptes de tirs (shots)',
      'Job IDs de soumission (IBM, HPC, bancs de test)'
    ],
    falsifiability: 'Tout run non reproductible sous graine identique est immédiatement rejeté.'
  },
  {
    number: '03',
    title: 'Certify',
    description: 'Collecte des artefacts, calcul des sommes de contrôle cryptographiques (SHA-256), vérification d’invariance et délimitation explicite des marges d’incertitude.',
    outputArtifacts: [
      'Reçus ZK et empreintes cryptographiques',
      'Calcul des coefficients de corrélation (Spearman, Pearson)',
      'Déclaration formelle des limites de validité (hardware vs simulation)'
    ],
    falsifiability: 'L’absence de réconciliation entre artefacts disqualifie la certification.'
  },
  {
    number: '04',
    title: 'Transfer',
    description: 'Restitution complète sous forme de rapport d’audit auditable, formation des équipes clientes, livraison d’architectures logicielles ou intégration de modules souverains.',
    outputArtifacts: [
      'Rapport technique complet avec jeux de données bruts',
      'Code source audité et conteneurisé',
      'Sessions d’explication et transfert de propriété intellectuelle'
    ],
    falsifiability: 'Le client doit être capable de rejouer l’audit sur ses propres machines.'
  }
];

export const INTEGRITY_STATEMENTS = [
  {
    id: '01',
    title: 'Une simulation Aer n’est pas un QPU',
    text: 'Nous ne qualifions jamais un résultat obtenu sur simulateur (état vectoriel ou bruit simulé) de validation matérielle. La frontière est rigoureusement consignée dans chaque fichier JSON.'
  },
  {
    id: '02',
    title: 'Un job ID enregistré n’est pas une revalidation temps réel',
    text: 'Conserver l’identifiant d’une exécution IBM passée constitue un artefact auditable d’exécution, mais n’équivaut pas à une interrogation continue en temps réel des serveurs du fournisseur sans mandat actif.'
  },
  {
    id: '03',
    title: 'Un prototype logiciel n’est pas un hardware disponible',
    text: 'Un banc de simulation ou un firmware testé virtuellement reste une pré-étude. Nous ne prétendons pas livrer un matériel physique sans preuve d’assemblage, de mesure et de métrologie réelle.'
  },
  {
    id: '04',
    title: 'Une projection n’est pas un résultat',
    text: 'Nous excluons toute confusion entre objectifs de recherche, projections chiffrées et faits expérimentaux mesurés. Seul le signal vérifié compte.'
  }
];

export const PHYSICAL_CONSTRUCTION_PARTNERSHIP = {
  title: 'Consortium de Construction Physique & Partenariat Industriel',
  framework: 'Pacte d\'Industrialisation Matérielle Souveraine (Clé 70/30)',
  splitRatio: {
    partnerPercent: 70,
    labPercent: 30,
    partnerRole: 'Partenaire Industriel & Usinage Matériel (70%) : Financement des coûts CAPEX d\'assemblage, usinage physique, approvisionnement silicium/métallurgie, lignes de fabrication en salle blanche, certification industrielle, packaging mécatronique et distribution commerciale mondiale.',
    labRole: 'RATISS Labs & Concepteur Scientifique (30%) : Licence exclusive d\'architecture cognitive et physique, formulations topologiques de persistance (Psig), microcode temps-réel, suites de tests unitaires/intégration, algorithmes de contrôle quantique et certification ZK.'
  },
  pillars: [
    {
      name: 'ratiss-qpu-ambient',
      shortName: 'Ambiant',
      role: 'Instrumentation Quantique à Température Ambiante',
      hardwareFabricationFocus: 'Fabrication de circuits résonateurs RF, contrôle de décohérence sans cryogénie lourde et cartes de mesure Bell pour QPU ambiant.',
      tests: '43 / 43 tests passés · IBM Marrakesh',
      url: 'https://github.com/jonathansearch/ratiss-qpu-ambient',
      color: 'cyan'
    },
    {
      name: 'ratiss-biolab',
      shortName: 'Bio',
      role: 'Bio-Physique & Régulation Thermique Avancée',
      hardwareFabricationFocus: 'Usinage microfluidique, capteurs thermo-optiques haute sensibilité et chambres de régulation mécatronique fine.',
      tests: '19 / 19 tests passés · Bancs thermo-optiques',
      url: 'https://github.com/jonathansearch/ratiss-biolab',
      color: 'emerald'
    },
    {
      name: 'ratiss-atelier',
      shortName: 'Atelier',
      role: 'Atelier de Fabrication & Outillage Mécatronique',
      hardwareFabricationFocus: 'Plans CAO/CAM, usinage physique CNC, bancs de montage automatisés, calibration d\'outillage et intégration physique souveraine.',
      tests: 'Protocoles d\'usinage & outillage validés',
      url: 'https://github.com/jonathansearch/ratiss-atelier',
      color: 'amber'
    },
    {
      name: 'ratiss-hpc',
      shortName: 'HPC',
      role: 'Calcul Haute Performance & Clusters Physiques',
      hardwareFabricationFocus: 'Conception de cartes mères modulaires faible consommation, interconnexions cuivre/optique haut débit et nœuds de calcul physique.',
      tests: '15 / 15 tests passés · Accélération physique',
      url: 'https://github.com/jonathansearch/ratiss-hpc',
      color: 'purple'
    },
    {
      name: 'ratiss-grid',
      shortName: 'Grid',
      role: 'Réseau Énergétique & Tolérance aux Pannes',
      hardwareFabricationFocus: 'Modules d\'alimentation de précision, onduleurs tolérants aux pannes électromagnétiques et gestion résiliente multi-nœuds.',
      tests: '19 / 19 tests passés · Scénarios ENEO',
      url: 'https://github.com/jonathansearch/ratiss-grid',
      color: 'blue'
    }
  ],
  legalTerms: [
    {
      article: 'Article I — Objet du Partenariat',
      content: 'Constitution d\'un consortium dédié à la construction, l\'assemblage et l\'industrialisation des dispositifs physiques issus des 5 piliers de recherche du laboratoire RATISS.'
    },
    {
      article: 'Article II — Clé de Répartition 70/30',
      content: 'Sur l\'ensemble des revenus nets issus de la vente, des licences industrielles et des contrats de maintenance des matériels physiques construits, 70% reviennent de plein droit au Partenaire Industriel (couverture CAPEX/OPEX, fabrication, commercialisation) et 30% à RATISS Labs (concepteur de la PI, algorithmes et protocoles souverains).'
    },
    {
      article: 'Article III — Propriété Intellectuelle & Invariance',
      content: 'RATISS Labs conserve la pleine propriété intellectuelle sur les modèles mathématiques, le microcode source et les invariants topologiques (Psig). Le Partenaire Industriel dispose d\'une licence d\'exploitation exclusive pour la fabrication et la distribution matérielle.'
    },
    {
      article: 'Article IV — Contrôle Qualité & Bancs de Test Hermétiques',
      content: 'Chaque unité matérielle produite doit passer avec succès le banc de test déterministe (ratiss-runner) avant toute mise en service ou livraison finale, assurant zéro régression.'
    }
  ]
};
