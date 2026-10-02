<section class="sec-t wx">
  <div class="doc-g">
    <div></div>
    <div>
      <p class="bc"><a href="#/">Accueil</a> <span>·</span> Journal</p>
      <h1 class="big rv">Notes de terrain<em>dans l'ordre où c'est arrivé.</em></h1>
      <p class="lede rv">
        Le journal de bord du laboratoire : les runs, les dépôts, les échecs et ce
        qu'ils ont appris. Pas un récit reconstruit après coup — la chronologie réelle,
        y compris là où elle est bizarre.
      </p>
    </div>
  </div>
</section>

<section class="sec wx" style="padding-top:20px">
  <div class="doc-g">
  <nav class="toc" data-toc>
    <h4>Sur cette page</h4>
    <a href="#b1">Août 2026</a>
    <a href="#b2">Septembre 2026</a>
    <a href="#b3">La semaine d'audit</a>
    <a href="#b4">Octobre 2026</a>
    <a href="#b5">Ce qui vient ensuite</a>
  </nav>

  <div class="prose">
    <p class="rv">
      Ces notes ne sont pas un récit reconstruit après coup. Elles suivent la
      chronologie réelle des dépôts et des campagnes, y compris là où la chronologie
      est bizarre — il y a des dates qui se chevauchent, et c'est ainsi que ça s'est
      passé, pas autrement. Le journal est append-only : ce qui est écrit ici reste
      ici, même quand la suite le contredit.
    </p>

    <h2 id="b1" class="anchor rv">Août 2026 — premiers runs</h2>

    <h3 class="rv">12 août 2026 — premiers runs sur IBM Quantum</h3>
    <p class="rv">
      Sept tâches soumises sur du matériel IBM réel, sous l'identifiant
      <code>scientist-research</code>, dans le cadre d'ODV-AEON. C'est la première
      fois que le laboratoire fait tourner quelque chose sur une machine quantique
      plutôt que sur un simulateur — et donc la première fois que la distinction des
      étiquettes 🧮 / 🛰️ cesse d'être théorique.
    </p>

    <h3 class="rv">23 août 2026 — decoherence-engine</h3>
    <p class="rv">
      Deux tâches consacrées à la décohérence. Peu de volume, mais c'est le moment où
      la question se pose concrètement : qu'est-ce qui, dans ce qu'on mesure, vient de
      la physique et qu'est-ce qui vient de l'appareil ? Cette question deviendra la
      règle R8, un mois plus tard.
    </p>

    <h3 class="rv">26 août 2026 — la grande session</h3>
    <p class="rv">
      Quarante-trois tâches soumises en <strong>une seule journée</strong> sur
      ratiss-focal. Les identifiants sont espacés de 9 à 10 secondes, ce qui
      constitue la signature d'une soumission par lots : ce n'est pas un usage
      interactif, c'est un script qui a tourné et qui a enchaîné.
    </p>
    <div class="tags rv">
      <span class="tag q">🛰️ 43 tâches · une journée</span>
      <span class="tag c">🧮 espacement 9–10 s</span>
    </div>
    <p class="rv">
      Cette signature est ce qui rend l'archive vérifiable. L'espacement régulier des
      identifiants est une empreinte : elle dit quelque chose sur la façon dont les
      tâches ont été produites, sans qu'on ait besoin de faire confiance à un récit.
    </p>

    <h2 id="b2" class="anchor rv">Septembre 2026 — le laboratoire se structure</h2>

    <h3 class="rv">10–12 septembre 2026 — premiers dépôts publics</h3>
    <p class="rv">
      Les premiers dépôts deviennent publics, avec les premiers identifiants IBM
      archivés. À partir de là, ce que le laboratoire affirme est clonable. Les dates
      semblent précéder la session du 26 août, et c'est le cas : l'archive a été
      constituée après coup, en remontant les identifiants déjà émis.
    </p>

    <h3 class="rv">15 septembre 2026 — RATISS-Framework publié</h3>
    <p class="rv">
      Le protocole d'audit cesse d'être une discipline personnelle et devient du
      <strong>code</strong>. Scellement par hash, journal de déviations, bornes de
      plausibilité, rapports. C'est le basculement décisif : une règle qu'on applique
      soi-même est une intention ; une règle exécutable est vérifiable par n'importe
      qui.
    </p>

    <h3 class="rv">21 septembre 2026 — ratiss-focal</h3>
    <p class="rv">
      Focalisation informationnelle : tester si la cohérence émerge de l'information
      plutôt que d'être posée au départ. C'est le chantier qui donnera plus tard la
      notation P_sig, où l'on mesure la géométrie de l'état plutôt que l'état lui-même.
    </p>

    <h3 class="rv">23 septembre 2026 — synchrotron-24</h3>
    <p class="rv">
      Effondrement gravitationnel et cosmologie mesurée, accompagnés de neuf tâches
      sur QPU. Le modèle ne contient pas la loi de Hubble ; il en sort malgré tout
      H·t = 1,0000016. Une loi qui émerge d'un modèle qui ne la contient pas est un
      résultat d'un autre genre qu'une loi vérifiée : elle dit quelque chose sur le
      modèle, pas sur l'univers.
    </p>
    <div class="tags rv">
      <span class="tag c">🧮 H·t = 1,0000016</span>
      <span class="tag q">🛰️ 9 tâches QPU</span>
    </div>

    <h3 class="rv">24 septembre 2026 — RATISS-NAVIER</h3>
    <p class="rv">
      Ouverture de la chasse au blow-up : chercher une explosion en temps fini dans un
      solveur de Navier-Stokes sans grille, en SPH. C'est un objectif ambitieux — le
      problème de l'existence et de la régularité des solutions 3D est l'un des sept
      problèmes du millénaire. Ce chantier aboutira, mais pas du tout comme prévu.
    </p>

    <h2 id="b3" class="anchor rv">La semaine d'audit</h2>

    <h3 class="rv">25 septembre 2026 — audit externe</h3>
    <p class="rv">
      Onze dépôts clonés à froid, sur une machine neuve, et
      <strong>51/51 tests passent</strong>. La reproductibilité est confirmée
      bit à bit. C'est la mise à l'épreuve de R4 : le clone neuf, la commande, les
      mêmes chiffres.
    </p>
    <p class="rv">
      Le même jour, NAVIER rend son verdict sur le blow-up : Om_max = 5654.1668, avec
      un écart de <strong>0.0000</strong>. L'explosion se reproduit donc exactement —
      ce qui ne dit pas encore si elle est physique.
    </p>
    <div class="tags rv">
      <span class="tag c">🧮 51/51 tests · écart 0.0000</span>
    </div>

    <h3 class="rv">26 septembre 2026 — RATISS-ARCHIVES et le hub</h3>
    <p class="rv">
      Création de la mémoire scellée : <strong>86 identifiants IBM archivés</strong>,
      avec leurs empreintes. C'est aussi le jour où le décodage d'identifiant est
      découvert — la structure interne des identifiants se lit, et elle confirme ce
      que l'espacement des soumissions laissait deviner.
    </p>
    <p class="rv">
      Ouverture du hub Discord dans la foulée. Précision utile : ce hub est de la
      tuyauterie de notification. Il ne contient pas de science, et il n'est pas une
      source de résultats.
    </p>

    <h3 class="rv">27 septembre 2026 — RATISS-PHOTON et RATISS-ETALONS</h3>
    <p class="rv">
      Deux dépôts le même jour, sur deux sujets sans rapport.
      <strong>RATISS-PHOTON</strong> reconstruit un photon multi-chemins à
      <strong>8,4 millions de trajectoires</strong>, et montre que le hasard
      <em>émerge</em> du bain thermique : à T = 0 le dispositif est déterministe, il
      n'y a pas de générateur aléatoire câblé dans le code.
    </p>
    <p class="rv">
      <strong>RATISS-ETALONS</strong> livre les quatre systèmes de référence : 14/16
      après corrections déclarées, avec deux rouges assumés. Les détails sont sur la
      page <a href="#/etalons">étalons</a>, mais l'essentiel est là : les échecs sont
      publiés au même endroit que les réussites.
    </p>
    <div class="tags rv">
      <span class="tag c">🧮 8,4 M chemins</span>
      <span class="tag c">🧮 14/16 · 2 rouges</span>
    </div>

    <h3 class="rv">28 septembre 2026 — RATISS-DEEPDIVE</h3>
    <p class="rv">
      Quatorze dossiers de lecture, <strong>75 pages</strong> au total, un par
      chantier, écrits depuis les sources primaires. C'est le versant 📚 du
      laboratoire : avant de calculer quelque chose, on lit ce qui a déjà été établi —
      et on le cite comme tel, sans le confondre avec une mesure.
    </p>

    <h3 class="rv">29 septembre 2026 — RATISS-PLANCK</h3>
    <p class="rv">
      Quatorze tâches réparties sur <strong>trois machines quantiques</strong> en une
      seule journée. Les résultats marquants : un état de Bell à
      <strong>99,61 %</strong> sur ions piégés, et un état de chat à 12 qubits,
      <strong>chat-12</strong>, à <strong>66,0 %</strong> de fidélité — le plus grand
      état intriqué produit par le laboratoire.
    </p>
    <p class="rv">
      C'est aussi le jour où la <strong>loi RATISS du shot épisodique</strong> est
      découverte <em>par un échec</em>. Des compartiments quantiques co-hébergés ne
      survivent à la transpilation que sur une architecture all-to-all : sur lattice
      carré, les SWAPs insérés pour router les qubits font tomber la survie à
      <strong>45 %</strong>, contre <strong>94 %</strong> sur ions.
    </p>
    <div class="tags rv">
      <span class="tag q">🛰️ Bell 99,61 % · chat-12 66,0 %</span>
      <span class="tag q">🛰️ 45 % lattice vs 94 % all-to-all</span>
    </div>
    <p class="rv">
      Le protocole prévoyait de mesurer sur supraconducteur. Ça n'a pas tenu. L'écart
      entre les deux architectures est devenu le résultat — ce qui est exactement ce
      que R6 prescrit de faire d'un échec.
    </p>

    <h3 class="rv">30 septembre 2026 — récolte GHZ-4</h3>
    <p class="rv">
      Récupération d'un état GHZ à quatre qubits sur ions piégés après
      <strong>16 heures de file d'attente</strong>. Fidélité mesurée :
      <strong>97,27 %</strong>.
    </p>
    <p class="rv">
      Seize heures pour une mesure dit quelque chose d'important sur le travail sur
      QPU réel : les machines sont partagées, la file ne se négocie pas, et un run se
      prépare comme une expédition. C'est aussi pourquoi l'espacement des identifiants
      du 26 août est une information : il raconte la même contrainte.
    </p>
    <div class="tags rv"><span class="tag q">🛰️ GHZ-4 — 97,27 %</span></div>

    <h2 id="b4" class="anchor rv">Octobre 2026 — le verdict NAVIER</h2>

    <h3 class="rv">1–2 octobre 2026 — Commissaire NAVIER</h3>
    <p class="rv">
      Quatre campagnes publiées, et un verdict tenu : la divergence observée dans le
      solveur de fluides est <strong>une pompe plus un compteur</strong>. Autrement
      dit, elle vient du forçage appliqué au système et de la manière dont la grandeur
      est mesurée — pas de la physique de Navier-Stokes.
    </p>
    <p class="rv">
      La chasse au blow-up n'a donc pas trouvé ce qu'elle cherchait. Elle a trouvé
      pourquoi elle croyait l'avoir trouvé. La méthode qui a permis de trancher est
      l'<strong>ablation avec et sans</strong> : on retire le terme suspect, on
      regarde ce qui change. Le verdict ne vient pas d'une intuition sur ce qui
      « devrait » se passer, il vient de la comparaison de deux séries de runs.
    </p>
    <div class="note rv">
      <p>
        <strong>C'est ici que naît R8.</strong> Un instrument fabrique toujours une
        part de son propre signal. Si cette part n'est pas mesurée, on finit par
        publier l'instrument en croyant publier la nature. Un meuble qui fabrique son
        propre signal n'a rien à dire sur la ville.
      </p>
    </div>
    <p class="rv">
      La règle est numérotée après coup, mais elle existait déjà dans les faits : le
      témoin sans perturbation, le plancher qui doit être quasi nul, la méfiance
      systématique envers un chiffre spectaculaire. R8 ne fait que l'écrire.
    </p>

    <h2 id="b5" class="anchor rv">Ce qui vient ensuite</h2>
    <p class="rv">
      La prochaine étape n'est pas une nouvelle campagne, c'est une
      <strong>consolidation</strong>. Les dépôts existent, les mesures sont archivées,
      les rouges sont publiés ; ce qui manque encore, c'est le passage au crible
      systématique : reprendre chaque résultat publié et vérifier qu'il satisfait
      réellement aux cinq règles, pas seulement à celles qu'on avait en tête le jour
      où on l'a produit.
    </p>
    <p class="rv">
      Concrètement, cela veut dire chercher activement les endroits où R7 a été
      appliquée trop vite — un chiffre classique présenté à côté d'un chiffre de QPU
      sans étiquette claire — et les endroits où R8 n'a pas été appliquée du tout,
      c'est-à-dire les résultats pour lesquels aucun témoin sans perturbation n'a été
      enregistré.
    </p>
    <p class="rv">
      Le laboratoire est mono-auteur, sans affiliation, sans financement, et travaille
      depuis Yaoundé sur des machines modestes. Cette contrainte n'est pas un argument
      et ne sera jamais présenté comme tel : elle explique seulement pourquoi le
      rythme dépend de la file d'attente des machines partagées, et pourquoi certains
      runs attendent des heures.
    </p>
    <div class="note rv">
      <p>
        Ce qui est publié ici est rejouable et contestable, pas certifié. Si tu trouves
        une erreur, la signaler publiquement est la réponse attendue — et utile. Elle
        ira au journal des déviations, à côté du reste.
      </p>
    </div>

    <div class="pager rv">
      <a href="#/etalons"><span>Voir aussi</span><b>← Les étalons</b></a>
      <a href="#/depots" style="text-align:right"><span>Continuer</span><b>Les dépôts →</b></a>
    </div>
  </div>
  </div>
</section>
