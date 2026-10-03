<section class="sec-t wx">
  <div class="doc-g">
    <div></div>
    <div>
      <p class="bc"><a href="#/">Accueil</a> <span>·</span> Quantique</p>
      <h1 class="big rv">Mesurer sur du vrai matériel<em>et accepter ce que les machines répondent.</em></h1>
      <p class="lede rv">
        Ici, rien n'est simulé quand un processeur quantique réel peut être interrogé. Le
        laboratoire envoie des circuits sur des ions piégés, des supraconducteurs et des
        atomes neutres, paie en crédits, attend dans les files, et publie les taux
        d'erreur tels qu'ils sortent. La leçon principale de ce chantier est née d'un
        échec.
      </p>
    </div>
  </div>
</section>

<section class="sec wx" style="padding-top:20px">
  <div class="doc-g">
    <nav class="toc" data-toc>
      <h4>Sur cette page</h4>
      <a href="#x1">Dater une tâche depuis son identifiant</a>
      <a href="#x2">RATISS-PLANCK : la journée du 29/09</a>
      <a href="#x3">Les résultats, machine par machine</a>
      <a href="#x4">Trois pentes, trois architectures</a>
      <a href="#x5">La loi RATISS du shot épisodique</a>
      <a href="#x6">Le QVM et le Mur de Planck</a>
      <a href="#x7">Ce que ça ne prouve pas</a>
      <a href="#x8">Étiquettes et rejeu</a>
    </nav>

    <div class="prose">
      <h2 id="x1" class="anchor rv">Dater une tâche depuis son identifiant</h2>
      <p class="rv">
        Un identifiant de tâche IBM Quantum ressemble à une chaîne arbitraire. Il n'en est
        pas une : il contient la date et l'heure de création de la tâche, en clair, sous
        forme encodée.
      </p>
      <pre class="rv"><code><span class="c"># secondes depuis le 1ᵉʳ janvier 1970, UTC</span>
<span class="k">t</span> = base32(id[:9]) / <span class="s">8192</span></code></pre>
      <p class="rv">
        Les neuf premiers caractères, lus en base 32, divisés par 8192, donnent le nombre
        de secondes écoulées depuis le 1ᵉʳ janvier 1970. Étalonné sur <strong>64
        tâches</strong> réelles, l'écart médian avec l'horodatage officiel est de
        <strong>269 millisecondes</strong>.
      </p>
      <table class="rv">
        <thead><tr><th>Élément</th><th>Valeur</th></tr></thead>
        <tbody>
          <tr><td>Identifiants archivés</td><td>86</td></tr>
          <tr><td>Identifiants utilisés pour l'étalonnage</td><td>64</td></tr>
          <tr><td>Écart médian</td><td>269 ms</td></tr>
          <tr><td>Fenêtre couverte</td><td>12/08 → 23/09/2026</td></tr>
          <tr><td>Charges brutes conservées</td><td>66</td></tr>
        </tbody>
      </table>
      <p class="rv">
        Ce que ça change concrètement : n'importe qui peut vérifier qu'un identifiant a
        bien été émis à la date annoncée, <strong>sans compte, sans clé, sans accès à
        l'API</strong>. C'est un outil d'horodatage, pas une prouesse.
      </p>
      <div class="note warn rv">
        <p>
          <strong>La limite, écrite noir sur blanc :</strong> le lien entre un identifiant
          et les comptages publiés ne peut être vérifié que par le propriétaire du compte.
          Le laboratoire peut prouver <em>quand</em> une tâche a été créée. Il ne peut pas
          prouver, à un tiers, <em>quelle tâche</em> a produit quels comptages. Il le dit
          plutôt que de le taire.
        </p>
      </div>

      <h2 id="x2" class="anchor rv">RATISS-PLANCK : la journée du 29/09</h2>
      <p class="rv">
        C'est le nom donné à une campagne d'une journée : <strong>14 tâches</strong>
        envoyées sur <strong>trois machines</strong> via Open Quantum. L'objectif est
        simple à énoncer et difficile à tenir : construire des états intriqués de taille
        croissante, sur des architectures différentes, et comparer ce qui survit.
      </p>
      <h3 class="rv">Le vocabulaire, en trois lignes</h3>
      <ul class="rv">
        <li>
          <strong>Bell</strong> — deux qubits intriqués. L'état le plus simple qui ne peut
          pas s'expliquer par deux pièces indépendantes.
        </li>
        <li>
          <strong>GHZ-n</strong> — n qubits intriqués ensemble, tous ou aucun. Plus n est
          grand, plus l'état est fragile.
        </li>
        <li>
          <strong>Fidélité</strong> — la proportion des tirs où l'état attendu est bien
          retrouvé. 100 % signifie un appareil parfait, qui n'existe pas.
        </li>
      </ul>
      <p class="rv">
        Le taux d'erreur se mesure directement sur les comptages. Pour Bell sur ions :
        1024 tirs donnent 515 fois « 00 », 505 fois « 11 », et <strong>4 fuites</strong> —
        quatre tirs qui tombent en dehors des deux états attendus. Soit
        <strong>99,61 %</strong> de fidélité, pour un coût de <strong>15 crédits</strong>.
      </p>
      <p class="rv">
        Le GHZ-4 sur les mêmes ions donne <strong>97,27 %</strong>, avec 497 + 499 = 996
        tirs sur 1024 dans l'état attendu — et ce résultat a été récolté <strong>après 16
        heures de file d'attente</strong>. La file fait partie du résultat : un chiffre
        obtenu après 16 heures d'attente n'a pas la même valeur opérationnelle qu'un chiffre
        obtenu en trois minutes.
      </p>
      <h3 class="rv">Les calibrations, sur 24 qubits</h3>
      <p class="rv">
        Avant d'envoyer quoi que ce soit, le laboratoire lit les paramètres de calibration
        publiés par les machines. Sur <strong>24 qubits</strong>, la relation
        <code>T2 ≤ 2·T1</code> est respectée <strong>24 fois sur 24</strong>.
      </p>
      <p class="rv">
        <code>T1</code> est le temps de relaxation : combien de temps un qubit excité
        retombe à l'état fondamental. <code>T2</code> est le temps de cohérence : combien
        de temps il garde sa phase. En théorie, <code>T2</code> ne peut pas dépasser le
        double de <code>T1</code> — c'est une borne du modèle standard du qubit. La voir
        respectée 24 fois sur 24 signifie que les machines mesurées se comportent comme
        des qubits ordinaires, sans anomalie de calibration sur cet échantillon.
      </p>

      <h2 id="x3" class="anchor rv">Les résultats, machine par machine</h2>
      <table class="rv">
        <thead>
          <tr><th>Circuit</th><th>Machine</th><th>Fidélité</th><th>Coût</th></tr>
        </thead>
        <tbody>
          <tr><td>Bell</td><td>IBEX — ions piégés</td><td>99,61 %</td><td>15 crédits</td></tr>
          <tr><td>GHZ-4</td><td>IBEX — ions piégés</td><td>97,27 %</td><td>15 crédits</td></tr>
          <tr><td>GHZ-7</td><td>IBEX — ions piégés</td><td>90,04 %</td><td>15 crédits</td></tr>
          <tr><td>GHZ-3</td><td>Garnet — supraconducteur 20 qubits</td><td>94,5 %</td><td>2 crédits</td></tr>
          <tr><td>GHZ-4</td><td>Garnet — supraconducteur 20 qubits</td><td>94,6 %</td><td>2 crédits</td></tr>
          <tr><td>GHZ-5</td><td>Garnet — supraconducteur 20 qubits</td><td>88,5 %</td><td>2 crédits</td></tr>
          <tr><td>GHZ-3</td><td>Cepheus-1-108Q — supraconducteur 108 qubits</td><td>89,7 %</td><td>1 crédit</td></tr>
          <tr><td>GHZ-4</td><td>Cepheus-1-108Q — supraconducteur 108 qubits</td><td>79,3 %</td><td>1 crédit</td></tr>
          <tr><td>GHZ-5</td><td>Cepheus-1-108Q — supraconducteur 108 qubits</td><td>68,7 %</td><td>1 crédit</td></tr>
          <tr><td>chat-12</td><td>Garnet — supraconducteur 20 qubits</td><td>66,0 %</td><td>2 crédits</td></tr>
        </tbody>
      </table>
      <p class="rv">
        Le <strong>chat-12</strong> est l'état le plus ambitieux du lot : douze qubits
        intriqués d'un seul tenant. Sur 1024 tirs, 387 + 289 = 676 tombent dans les états
        attendus, soit <strong>66,0 %</strong>. C'est le plus grand état intriqué produit
        par ce laboratoire — et c'est aussi celui qui montre le plus clairement où se
        trouve la limite.
      </p>
      <h3 class="rv">La tarification inversée</h3>
      <p class="rv">
        Un détail qui mérite d'être noté, parce qu'il est contre-intuitif :
      </p>
      <table class="rv">
        <thead><tr><th>Machine</th><th>Taille</th><th>Coût par tâche</th></tr></thead>
        <tbody>
          <tr><td>Cepheus-1-108Q</td><td>108 qubits supraconducteurs</td><td>1 crédit</td></tr>
          <tr><td>Garnet</td><td>20 qubits supraconducteurs</td><td>2 crédits</td></tr>
          <tr><td>IBEX</td><td>12 qubits à ions piégés</td><td>15 crédits</td></tr>
        </tbody>
      </table>
      <p class="rv">
        La plus grosse machine est la moins chère, la plus petite est la plus chère — et ce
        n'est pas une anomalie de facturation. Une machine à 108 qubits supraconducteurs
        sert beaucoup d'utilisateurs et coûte peu par tâche ; une machine à ions piégés
        offre une qualité de portes très supérieure, donc se paie. Le prix est un
        indicateur de qualité, pas de taille.
      </p>

      <h2 id="x4" class="anchor rv">Trois pentes, trois architectures</h2>
      <p class="rv">
        En portant la fidélité en fonction du nombre de qubits intriqués, chaque
        architecture donne une droite — et la pente de cette droite est sa signature.
      </p>
      <table class="rv">
        <thead><tr><th>Architecture</th><th>Pente</th><th>Lecture</th></tr></thead>
        <tbody>
          <tr><td>Ions piégés (IBEX)</td><td>−1,9 point par qubit</td><td>chaque qubit ajouté coûte peu</td></tr>
          <tr><td>Garnet (supra 20 qubits)</td><td>≈ −5 points par qubit</td><td>coût intermédiaire</td></tr>
          <tr><td>Cepheus-1-108Q (supra 108 qubits)</td><td>≈ −10,5 points par qubit</td><td>chaque qubit ajouté coûte cher</td></tr>
        </tbody>
      </table>
      <p class="rv">
        Ces pentes disent quelque chose de très concret : sur les ions, passer de trois à
        sept qubits coûte environ huit points de fidélité. Sur Cepheus, la même croissance
        en coûterait plus de quarante. Ce n'est pas une question de savoir-faire : c'est
        une question de connectivité, et la section suivante explique pourquoi.
      </p>

      <h2 id="x5" class="anchor rv">La loi RATISS du shot épisodique</h2>
      <p class="rv">
        Cette section décrit une leçon née d'un échec, et c'est ce qui la rend utile.
      </p>
      <h3 class="rv">Le problème de la transpilation</h3>
      <p class="rv">
        Un circuit quantique s'écrit en supposant que n'importe quel qubit peut interagir
        avec n'importe quel autre. Ce n'est vrai d'aucune machine réelle. Sur un
        supraconducteur, les qubits sont posés sur une grille carrée : chacun ne parle
        qu'à ses voisins immédiats. Pour exécuter le circuit, il faut donc
        <strong>transpiler</strong> — déplacer l'information le long de la grille à coups
        de portes SWAP, jusqu'à amener les qubits qui doivent interagir côte à côte.
      </p>
      <p class="rv">
        Chaque SWAP est une opération de plus, et chaque opération de plus ajoute de
        l'erreur. Ce n'est pas un détail d'implémentation : c'est la source d'erreur
        dominante.
      </p>
      <h3 class="rv">Ce qui a été mesuré, puis ce qui a été compris</h3>
      <p class="rv">
        Des compartiments quantiques co-hébergés — plusieurs circuits préparés ensemble sur
        la même machine — ne survivent à la transpilation que sur une architecture
        <em>all-to-all</em>, c'est-à-dire où tout qubit peut parler à tout autre
        directement. Les ions piégés sont dans ce cas. Sur un lattice carré, la
        fidélité s'effondre : <strong>45 % au lieu de 94 %</strong>.
      </p>
      <div class="note warn rv">
        <p>
          <strong>La loi du shot épisodique.</strong> Des compartiments quantiques
          co-hébergés ne survivent à la transpilation que sur une architecture all-to-all.
          Sur un lattice carré, les SWAPs débordent. Ce n'est pas une conjecture : c'est ce
          que le laboratoire a observé en croyant faire autre chose, et c'est l'échec qui a
          produit la règle.
        </p>
      </div>
      <p class="rv">
        L'écart 94 % contre 45 % n'est pas un problème d'échantillon : c'est un facteur
        deux sur la fidélité, causé uniquement par la topologie de la machine. Un circuit
        correct sur le papier peut devenir inutilisable selon l'endroit où on le pose.
      </p>

      <h2 id="x6" class="anchor rv">Le QVM et le Mur de Planck</h2>
      <h3 class="rv">L'ordinateur quantique virtuel</h3>
      <p class="rv">
        Le laboratoire entretient un simulateur, le <strong>QVM</strong>, capable de suivre
        jusqu'à <strong>300 qubits</strong>. Son rôle n'est pas de remplacer les machines
        réelles : c'est de fabriquer des jumeaux numériques et de les valider
        <em>hors échantillon</em> — c'est-à-dire sur des cas qui n'ont pas servi à les
        construire. Un simulateur validé sur ses propres données ne vaut rien.
      </p>
      <h3 class="rv">La courbe de Page</h3>
      <p class="rv">
        La courbe de Page décrit la façon dont l'information se répartit dans un système
        quantique qu'on découpe en deux. Elle monte, atteint un maximum exactement à la
        moitié, puis redescend. La simulation reproduit cette courbe à
        <strong>0,001 bit</strong> de la formule analytique, avec un pic exactement à
        <code>N/2</code>. C'est un test de cohérence du simulateur, pas une découverte.
      </p>
      <h3 class="rv">Le Mur de Planck</h3>
      <p class="rv">
        Le point de départ est une question de dimensionnement : à quelle taille un
        dispositif quantique cesse-t-il d'être décrit par la mécanique quantique seule et
        commence-t-il à subir la gravité ?
      </p>
      <p class="rv">
        En croisant la courbe quantique et la courbe gravitationnelle, le croisement tombe
        à <code>√2 · ℓ_P</code> — soit la longueur de Planck multipliée par racine de deux.
        L'énergie correspondante vaut <code>E = E_P/√2 = 1,38 × 10⁹ J</code>. Pour donner
        un ordre de grandeur : c'est l'énergie d'un éclair.
      </p>
      <p class="rv">
        Pour atteindre cette énergie avec des aimants comparables à ceux du LHC, il
        faudrait un anneau de <strong>516 années-lumière</strong>. Ce n'est pas une
        prévision d'ingénierie, c'est la mesure de l'écart entre l'échelle accessible et
        l'échelle en question.
      </p>
      <table class="rv">
        <thead><tr><th>Élément</th><th>Valeur</th></tr></thead>
        <tbody>
          <tr><td>Croisement quantique / gravitationnel</td><td><code>√2 · ℓ_P</code></td></tr>
          <tr><td>Énergie associée</td><td><code>E_P/√2 = 1,38 × 10⁹ J</code></td></tr>
          <tr><td>Anneau nécessaire avec des aimants type LHC</td><td>516 années-lumière</td></tr>
          <tr><td>Validation sur le vrai LHC</td><td>2 801 m calculés / 2 804 m réels</td></tr>
          <tr><td>Courbe de Page</td><td>0,001 bit de la formule analytique, pic à N/2</td></tr>
        </tbody>
      </table>
      <p class="rv">
        La dernière ligne du tableau est celle qui compte le plus. Le même outil de calcul
        de circonférence, appliqué au véritable LHC, donne <strong>2 801 m</strong> là où
        la machine réelle en mesure <strong>2 804 m</strong>. Trois mètres d'écart sur
        presque trois kilomètres. L'extrapolation à 516 années-lumière reste une
        extrapolation, mais l'outil qui la produit a été vérifié sur un objet qui existe.
      </p>

      <h2 id="x7" class="anchor rv">Ce que ça ne prouve pas</h2>
      <ul class="rv">
        <li>
          <strong>La fidélité n'est pas la vérité quantique.</strong> Un taux de 99,61 %
          sur Bell signifie que les comptages correspondent à l'état attendu. Cela ne
          démontre pas que la machine calcule correctement pour un usage général.
        </li>
        <li>
          <strong>Le décodage d'identifiant ne prouve pas la provenance des comptages.</strong>
          Il prouve une date de création. La correspondance entre une tâche et ses résultats
          publiés reste vérifiable seulement par le propriétaire du compte.
        </li>
        <li>
          <strong>300 qubits simulés ne valent pas 300 qubits réels.</strong> Le QVM est un
          jumeau numérique validé hors échantillon. Il ne reproduit ni le bruit réel, ni
          les corrélations de calibration d'une machine physique.
        </li>
        <li>
          <strong>Le Mur de Planck est un calcul d'échelle.</strong> Le croisement à
          <code>√2 · ℓ_P</code> est un résultat sur les courbes comparées, pas une théorie
          de gravité quantique. Aucune expérience ne peut atteindre ces énergies.
        </li>
        <li>
          <strong>24 qubits testés ne font pas un audit de l'industrie.</strong> La
          relation <code>T2 ≤ 2·T1</code> respectée 24 fois sur 24 porte sur un échantillon
          précis, à une date précise.
        </li>
        <li>
          <strong>Rien de tout cela n'est validé par les pairs.</strong> Les identifiants,
          les charges brutes et les résultats sont archivés. Personne d'autre ne les a
          relus.
        </li>
      </ul>

      <h2 id="x8" class="anchor rv">Étiquettes et rejeu</h2>
      <p class="rv">
        Règle R7 : les origines ne se mélangent jamais. Sur cette page, les fidélités, les
        pentes, les calibrations et le test du LHC sont des
        <strong>mesures sur machine réelle</strong>. Le QVM, la courbe de Page et
        l'extrapolation du Mur de Planck sont du <strong>calcul</strong>. Le décodage
        d'identifiant est vérifiable par quiconque, sans compte : c'est ce qui en fait un
        outil d'horodatage honnête.
      </p>
      <div class="tags rv">
        <span class="tag q">🛰️ mesure QPU — IBEX, Garnet, Cepheus-1-108Q</span>
        <span class="tag c">🧮 calcul — QVM, courbe de Page, Mur de Planck</span>
      </div>
      <p class="rv">
        Les 86 identifiants et les 66 charges brutes sont archivés avec leurs empreintes.
        Tu peux appliquer la formule <code>base32(id[:9]) / 8192</code> à n'importe lequel
        d'entre eux et retomber sur la date annoncée — sans compte, sans clé, sans
        permission.
      </p>

      <div class="pager rv">
        <a href="#/chantier-fusion"><span>Précédent</span><b>← Fusion &amp; gravitation</b></a>
        <a href="#/chantier-photon" style="text-align:right"><span>Suivant</span><b>Photonique →</b></a>
      </div>
    </div>
  </div>
</section>
