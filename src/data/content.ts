export type Claim = {
  text: string;
  proofUrl: string;
};

export const hero = {
  title: "RATISS Labs — l'audit scientifique exécutable.",
  subtitle: "Nous auditons les artefacts publics de la recherche : chaque affirmation, chaque hash, chaque identifiant, chaque courbe. Testés par commande, publiés avec leur annexe de reproduction.",
  links: [
    { label: "Rapport d'audit public (2026-09-12)", url: "https://github.com/jonathansearch/ratiss-audit-public" },
    { label: "Registre ORCID", url: "https://orcid.org/0009-0000-4092-5313" },
    { label: "GitHub", url: "https://github.com/jonathansearch" },
  ],
};

export const claims: Claim[] = [
  { text: "Nous prenons vos dépôts, préprints et jeux de données publics, et nous testons chaque preuve : validité des hashes, format des identifiants, plausibilité physique, corrélations impossibles. Rapport publié, annexe de reproduction incluse.", proofUrl: "https://github.com/jonathansearch/ratiss-audit-public" },
  { text: "Tests, graines, manifests figés : nous vérifions que votre code refait ce que votre article annonce, et nous publions ce qui casse.", proofUrl: "https://github.com/jonathansearch/ratiss-audit-public/blob/main/PUBLIC-AUDIT-REPORT-EN.md" },
  { text: "Métriques scellées avant l'audit, verdict après. Un résultat négatif se publie comme un résultat positif.", proofUrl: "https://github.com/jonathansearch/ratiss-audit-public/blob/main/JOURNAL-DEVIATIONS.md" },
];

export const protocol: Claim[] = [
  { text: "R4 : Raisonnement conceptuel toujours autorisé ; chiffre publié seulement s'il a été calculé, avec paramètres et hash.", proofUrl: "https://github.com/jonathansearch/ratiss-audit-public/blob/main/PUBLIC-AUDIT-REPORT-EN.md" },
  { text: "R5 : Prompts et paramètres scellés, hashés dans chaque run ; modification après mesure = journal des déviations.", proofUrl: "https://github.com/jonathansearch/ratiss-audit-public/blob/main/JOURNAL-DEVIATIONS.md" },
  { text: "R6 : Bras expérimentaux séparés du chemin critique ; verdict par ablation avec/sans, jamais par intuition.", proofUrl: "https://github.com/jonathansearch/ratiss-audit-public/blob/main/PUBLIC-AUDIT-REPORT-EN.md" },
  { text: "R7 : Aucune affirmation publique sans qu'un étranger puisse la reproduire en une commande.", proofUrl: "https://github.com/jonathansearch/ratiss-audit-public" },
  { text: "Une simulation n'est pas une exécution matérielle.", proofUrl: "https://github.com/jonathansearch/ratiss-audit-public/blob/main/PUBLIC-AUDIT-REPORT-EN.md" },
  { text: "Un identifiant enregistré n'est pas une revalidation en temps réel.", proofUrl: "https://github.com/jonathansearch/ratiss-audit-public/blob/main/JOURNAL-DEVIATIONS.md" },
];

export const registry = [
  { title: "Rapport d'audit public, 2026-09-12", status: "rapport public", url: "https://github.com/jonathansearch/ratiss-audit-public" },
  { title: "Notices de correction OSF, 2026-09-12", status: "corrigé le 2026-09-12", url: "https://osf.io/4867h" },
  { title: "Préprint — LCT", status: "préprint ; corrections publiques du 2026-09-12 liées", url: "https://osf.io/wf7qm" },
  { title: "Préprint — audit de complexité", status: "préprint ; corrections publiques du 2026-09-12 liées", url: "https://osf.io/6jzmb" },
  { title: "Préprint — Panthéon 20x", status: "préprint ; corrections publiques du 2026-09-12 liées", url: "https://osf.io/4867h" },
  { title: "Préprint — Tryperposition", status: "préprint ; corrections publiques du 2026-09-12 liées", url: "https://osf.io/u4aek" },
  { title: "Bot de prévision Metaculus AIB", status: "dry-run ; publication soumise au backtest", url: "https://github.com/jonathansearch/metac-bot-template" },
];

export const roadmap = [
  "M1–M2 : consolidation de 42 dépôts en un framework audité unique.",
  "M2–M4 : campagne de reproduction sur matériel quantique réel (plan ouvert IBM), job IDs et hashes publiés.",
  "M4–M8 : benchmark de prévision Metaculus ; couplage RATISS × LeWM.",
  "M8–M12 : cohorte ouverte à Yaoundé : former des jeunes sans diplôme à vérifier, pas seulement à chercher.",
];
