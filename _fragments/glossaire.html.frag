<section class="sec-t wx">
  <div class="doc-g">
    <div></div>
    <div>
      <p class="bc"><a href="#/">Accueil</a> <span>·</span> Glossaire</p>
      <h1 class="big rv">Tous les mots<em>une seule fois, définis pour de bon.</em></h1>
      <p class="lede rv">
        Le vocabulaire du laboratoire, du qubit à la percolation, en passant par les
        termes que RATISS Labs a inventés. Tu n'as besoin d'aucun préalable pour lire
        cette page ; si tu en as un, tu y trouveras les formules et les ordres de
        grandeur.
      </p>
    </div>
  </div>
</section>

<section class="sec wx" style="padding-top:20px">
  <div class="doc-g">
  <nav class="toc" data-toc>
    <h4>Sur cette page</h4>
    <a href="#g1">Les règles du labo</a>
    <a href="#g2">Les termes du labo</a>
    <a href="#g3">Fluides</a>
    <a href="#g4">Quantique</a>
    <a href="#g5">Topologie</a>
    <a href="#g6">Cosmologie</a>
    <a href="#g7">Percolation &amp; Ising</a>
    <a href="#g8">Photonique</a>
    <a href="#g9">Méthode &amp; outillage</a>
    <a href="#g10">Index alphabétique</a>
  </nav>

  <div class="prose">
    <p class="rv">
      Deux avertissements avant de commencer. Premièrement, certains mots de ce
      glossaire sont <strong>inventés par le laboratoire</strong> et n'ont pas cours
      ailleurs : ils sont signalés comme tels, et surtout ils ne recouvrent pas le sens
      du terme physique qui leur ressemble. Deuxièmement, un chiffre n'apparaît ici que
      s'il a été calculé ou mesuré, avec son étiquette 🧮 🛰️ 📚 quand elle s'applique.
      Aucun ordre de grandeur n'est donné « de mémoire ».
    </p>

    <h2 id="g1" class="anchor rv">A · Les règles du labo</h2>
    <p class="rv">
      Cinq règles, numérotées R4 à R8. Elles ne décrivent pas la physique : elles
      décrivent <em>comment on travaille</em>. Elles sont écrites en code dans le
      dépôt RATISS-Framework, ce qui veut dire qu'elles sont exécutables et pas
      seulement affichées.
    </p>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">R4 — Rejouable en une commande</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Un chiffre n'est publié que s'il a été calculé, avec ses paramètres et son
        hash, et qu'il se reproduit en <strong>une seule commande</strong> depuis un
        clone neuf du dépôt. Pas de capture d'écran, pas de « fais-moi confiance ».
        Le raisonnement conceptuel reste libre ; c'est le chiffre qui est contraint.
      </p>
    </div>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">R5 — Scellé avant</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Les critères de verdict sont figés et hashés <strong>avant</strong> le premier
        run. Le verdict tombe des chiffres, jamais de l'envie qu'on a du résultat.
        Si tu changes un critère après avoir vu les mesures, tu dois produire un
        nouveau sceau — et l'ancien reste inscrit au journal des déviations.
      </p>
    </div>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">R6 — Échecs publiés</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Un résultat négatif est publié avec la même visibilité qu'un succès. Le
        verdict ne repose pas sur une intuition mais sur une méthode précise :
        <strong>l'ablation avec et sans</strong> (voir plus bas). Un verdict qui ne
        tient pas reste en ligne, annoté, plutôt que d'être retiré discrètement.
      </p>
    </div>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">R7 — Étiquettes jamais mélangées</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Chaque artefact porte sa provenance, et trois provenances différentes ne se
        confondent jamais : une preuve calculée, une mesure sur machine réelle, une
        lecture de papier. Concrètement, un chiffre sorti d'un solveur local n'est
        jamais présenté comme un résultat obtenu sur un processeur quantique.
      </p>
    </div>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">R8 — Mesurer ce qui déborde du script</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Un instrument fabrique toujours une part de son propre signal. Cette part doit
        être <strong>mesurée</strong>, pas supposée nulle. La validation se fait par un
        témoin sans perturbation, dont le plancher doit être quasi nul. Cette règle est
        née d'une campagne de fluides : la divergence observée venait du forçage, pas
        de la physique. Un meuble qui fabrique son propre signal n'a rien à dire sur
        la ville.
      </p>
    </div>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">Étiquette de terrain</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Le marqueur de provenance exigé par R7. Trois étiquettes, jamais mélangées :
      </p>
      <div class="tags rv">
        <span class="tag c">🧮 calcul</span>
        <span class="tag q">🛰️ QPU</span>
        <span class="tag">📚 lecture</span>
      </div>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        🧮 désigne un résultat produit par du code, exact ou numérique, sur une
        machine classique. 🛰️ désigne une mesure effectuée sur un processeur
        quantique réel, donc soumise au bruit et à la file d'attente. 📚 désigne une
        information issue d'une publication, citée comme telle — utile, mais ce n'est
        pas une mesure du laboratoire.
      </p>
    </div>

    <h2 id="g2" class="anchor rv">B · Les termes inventés par le labo</h2>
    <div class="note warn rv">
      <p>
        Ces quatre termes appartiennent au vocabulaire propre de RATISS Labs. Ils ne
        proviennent d'aucune littérature et ne doivent pas être confondus avec les
        notions physiques qui leur ressemblent. Si tu les croises ailleurs, ce n'est
        pas la même chose.
      </p>
    </div>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">P_sig</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Notation personnelle du laboratoire : la <strong>persistance topologique
        utilisée comme observable physique</strong>. On ne mesure pas directement
        l'état quantique ; on mesure la géométrie de l'état — combien de trous il
        contient, et combien de temps ces trous survivent quand on fait varier
        l'échelle d'observation. Une perte de cohérence se traduit par un
        effondrement de cette signature, donc par une chute de P_sig. C'est un
        détecteur indirect : il ne dit pas <em>pourquoi</em> la cohérence est partie,
        il dit qu'elle est partie.
      </p>
    </div>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">Tryperposition</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Terme <strong>inventé par le laboratoire</strong>. À ne pas confondre avec la
        superposition quantique standard, qui est un énoncé précis et vérifié
        expérimentalement depuis un siècle. La tryperposition désigne un régime
        d'organisation propre aux objets du laboratoire, et non une superposition
        d'états au sens de la mécanique quantique. Le mot est conservé parce qu'il
        nomme quelque chose qui n'avait pas de nom ; il n'est pas une revendication
        de nouveauté physique.
      </p>
    </div>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">GCR — Grand Collisionneur de Ratiss</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Un univers virtuel de collisions, entièrement simulé, où l'on fait entrer en
        collision des états pour observer ce qui en sort en termes de topologie. Rien
        n'est physique là-dedans : c'est un banc d'essai. Son résultat central est
        l'<strong>étincelle topologique</strong>, un pic bref de structure
        topologique au moment de la collision.
      </p>
      <div class="tags rv"><span class="tag c">🧮 b1_max = 2 pour A = 10, γ = 0,05</span></div>
    </div>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">RATISS-Omni</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Un <strong>bus mémoire partagé</strong> doublé d'un contrôle en boucle fermée
        entre les moteurs de simulation du laboratoire. Au lieu que chaque moteur
        tourne isolé dans son coin, Omni leur donne un état commun et leur permet
        d'agir sur le run des autres en fonction de ce qu'ils produisent. C'est de
        l'outillage : ça ne produit pas de résultat scientifique en soi, ça permet aux
        moteurs de se parler.
      </p>
    </div>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">La loi RATISS du shot épisodique</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Énoncé : des compartiments quantiques co-hébergés ne survivent à la
        transpilation <strong>que sur une architecture all-to-all</strong>. Sur une
        topologie en lattice carré, les portes SWAP insérées pour router les qubits
        débordent et détruisent l'état. L'écart mesuré est net : la survie tombe à
        <strong>45 %</strong> sur lattice, contre <strong>94 %</strong> sur ions.
        Cette loi a été découverte <em>par un échec</em> : le protocole prévoyait une
        mesure sur supraconducteur, elle n'a pas tenu, et l'écart entre les deux
        architectures est devenu le résultat.
      </p>
      <div class="tags rv">
        <span class="tag q">🛰️ 45 % lattice carré</span>
        <span class="tag q">🛰️ 94 % all-to-all</span>
      </div>
    </div>

    <h2 id="g3" class="anchor rv">C · Physique des fluides</h2>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">Navier-Stokes</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Le système d'équations qui décrit l'écoulement d'un fluide : comment sa
        vitesse et sa pression évoluent en chaque point sous l'effet de l'inertie, de
        la viscosité et des forces extérieures. On sait très bien les résoudre
        numériquement ; on ne sait pas démontrer que les solutions en 3D restent
        toujours lisses. C'est précisément l'objet de l'un des sept problèmes du
        millénaire, <strong>existence et régularité</strong>, qui n'est pas résolu.
      </p>
    </div>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">Blow-up (explosion)</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Divergence d'une grandeur physique en un temps fini : la vitesse ou le
        gradient de vitesse part à l'infini, et le calcul ne peut plus continuer.
        C'est le phénomène que le laboratoire a <strong>cherché</strong> dans son
        solveur, et qu'il y a <strong>trouvé</strong> — pour découvrir, après
        ablation, qu'il était causé par le terme de forçage et non par la physique du
        fluide. Un blow-up provoqué par l'instrument ne dit rien sur Navier-Stokes.
      </p>
    </div>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">SPH — Smoothed Particle Hydrodynamics</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Méthode <strong>sans grille</strong> : le fluide n'est pas découpé en cases,
        il est porté par un ensemble de particules qui se déplacent. Chaque grandeur
        locale est obtenue en lissant les contributions des particules voisines,
        pondérées par une fonction de noyau. L'avantage est de suivre naturellement
        les frontières libres et les grandes déformations, là où une grille fixe
        devient difficile à tenir. C'est le moteur utilisé par RATISS-NAVIER.
      </p>
    </div>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">Ablation avec / sans</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        La méthode de verdict imposée par R6. On identifie un terme suspect, on lance
        une série <strong>avec</strong> ce terme, une série <strong>sans</strong>, et
        on regarde ce qui change réellement. Si le phénomène survit à l'ablation du
        terme, ce n'est pas lui qui le cause. Si le phénomène disparaît, la cause est
        établie. Jamais d'intuition : le verdict vient de la comparaison des deux
        séries, pas de l'impression que laisse le premier run.
      </p>
    </div>

    <h2 id="g4" class="anchor rv">D · Quantique</h2>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">Qubit</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Un système quantique à deux niveaux, et l'unité d'information quantique. Là
        où un bit classique vaut 0 ou 1, un qubit peut se trouver dans une
        combinaison des deux, et deux qubits peuvent être intriqués — c'est-à-dire
        corrélés d'une façon qu'aucune description classique locale ne reproduit.
        C'est cette propriété qui rend le calcul quantique intéressant, et aussi
        fragile.
      </p>
    </div>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">Transmon</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Un type de qubit <strong>supraconducteur</strong>, utilisé notamment par IBM et
        Google. Pour que la supraconductivité tienne et que le bruit thermique ne
        détruise pas l'état, il doit fonctionner à très basse température, de l'ordre
        de <strong>~15 mK</strong> — soit quelques millièmes de kelvin au-dessus du
        zéro absolu. C'est la raison d'être des réfrigérateurs à dilution.
      </p>
    </div>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">Centre NV (azote-lacune)</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Un défaut dans le diamant : un atome d'azote prenant la place d'un carbone,
        juste à côté d'une lacune, c'est-à-dire d'un site vide. Ce défaut porte un
        spin <strong>S = 1</strong> qu'on peut manipuler et lire optiquement. Son
        intérêt majeur : il fonctionne à <strong>température ambiante</strong>, sans
        cryogénie, avec un temps de cohérence T2 de l'ordre de la
        <strong>milliseconde</strong>. C'est la piste du dépôt RATISS-QPU-AMBIENT.
      </p>
    </div>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">GHZ (Greenberger-Horne-Zeilinger)</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Un état intriqué à N qubits : une superposition de « tous à 0 » et « tous à
        1 », sans aucun terme intermédiaire. Sa particularité est d'être un
        intriquement <em>global</em> : mesurer un seul qubit projette tous les autres.
        On s'en sert comme <strong>test de fidélité</strong>, parce qu'il est
        extrêmement sensible à la moindre erreur. Le laboratoire en a récolté un à
        quatre qubits sur ions piégés, après une longue attente en file.
      </p>
      <div class="tags rv"><span class="tag q">🛰️ GHZ-4 ions — 97,27 %</span></div>
    </div>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">État de Bell</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Un état intriqué à deux qubits, le plus simple qui existe. Il sert de test
        d'intrication minimal : si tu ne tiens pas un état de Bell, tu ne tiens rien.
        C'est aussi la brique de base des protocoles de téléportation et de
        distribution de clés. Le laboratoire a obtenu
        <strong>99,61 %</strong> sur ions piégés.
      </p>
      <div class="tags rv"><span class="tag q">🛰️ 99,61 % — ions piégés</span></div>
    </div>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">chat-12</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Un état de chat de Schrödinger à <strong>12 qubits</strong> : la superposition
        macroscopique de deux états très éloignés l'un de l'autre dans l'espace des
        phases. C'est le plus grand état intriqué produit par le laboratoire, avec
        <strong>66,0 %</strong> de fidélité. La fidélité baisse quand la taille
        augmente : c'est attendu, et c'est justement ce que la mesure quantifie.
      </p>
      <div class="tags rv"><span class="tag q">🛰️ chat-12 — 66,0 %</span></div>
    </div>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">Fidélité</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        À quel point l'état réellement obtenu ressemble à l'état voulu. Elle
        s'exprime en pourcentage : 100 % signifierait un état parfait. Sur un
        processeur réel, la fidélité ne monte jamais à 100 %, parce que chaque porte
        ajoute une petite erreur et que l'environnement dégrade l'état en permanence.
      </p>
    </div>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">Décohérence</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        La perte de l'information quantique par interaction avec l'environnement. Un
        qubit n'est jamais parfaitement isolé : les vibrations, les champs
        parasites, les impuretés du matériau interagissent avec lui et effacent
        progressivement sa phase. C'est le principal obstacle pratique au calcul
        quantique, et la raison pour laquelle un qubit a une durée de vie limitée.
      </p>
    </div>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">T1 / T2 / T2*</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Trois temps caractéristiques qui décrivent la fragilité d'un qubit.
        <strong>T1</strong> est le temps de relaxation : au bout de T1, l'état excité
        est retombé vers l'état fondamental, l'énergie est partie.
        <strong>T2</strong> est le temps de cohérence : au bout de T2, la relation de
        phase entre les composantes de la superposition est perdue.
        <strong>T2*</strong> est la même grandeur mais mesurée avec un déphasage
        inhomogène, c'est-à-dire en incluant les variations lentes d'un qubit à
        l'autre ; il est donc plus court que T2. La contrainte fondamentale qui lie
        les deux premiers est :
      </p>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        <strong>T2 ≤ 2·T1</strong>
      </p>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Autrement dit, la cohérence ne peut pas survivre plus de deux fois la
        relaxation. Un T2 mesuré supérieur à 2·T1 signale une erreur de mesure, pas
        un bon qubit.
      </p>
    </div>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">All-to-all vs lattice</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Deux topologies de connexion entre qubits. En <strong>all-to-all</strong>,
        chaque qubit peut interagir directement avec tous les autres : c'est le cas
        des ions piégés, où l'on couple n'importe quelle paire. En
        <strong>lattice</strong>, les qubits sont disposés en grille et ne parlent
        qu'à leurs voisins immédiats : c'est le cas des supraconducteurs. Cette
        différence matérielle a des conséquences directes sur ce qu'on peut exécuter
        sans le déformer.
      </p>
    </div>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">Transpilation</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        L'étape qui adapte un circuit logique à la topologie réelle d'une machine.
        Ton algorithme suppose peut-être une porte entre les qubits 1 et 7 ; si la
        machine ne les connecte pas, il faut déplacer l'information jusqu'à ce qu'ils
        se rencontrent. Le transpileur insère donc des portes SWAP, en nombre
        d'autant plus grand que la connectivité est faible. C'est un traducteur
        honnête : il fait ce qu'il peut avec le matériel qu'on lui donne.
      </p>
    </div>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">SWAP (porte)</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Une porte qui échange l'état de deux qubits. Elle est <strong>coûteuse</strong> :
        sur la plupart des matériels, un SWAP se décompose en trois portes CNOT, et
        chacune de ces portes ajoute son lot d'erreurs. Sur une machine dont la
        connectivité est faible, le routage peut insérer tellement de SWAP que le
        circuit devient majoritairement constitué de trafic plutôt que de calcul.
        C'est exactement le mécanisme décrit par la loi RATISS du shot épisodique.
      </p>
    </div>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">Borne de Tsirelson</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        La limite supérieure des corrélations prédites par la mécanique quantique,
        dans le cadre des tests de Bell. Elle s'écrit :
      </p>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        <strong>|S| ≤ 2√2 ≈ 2,828</strong>
      </p>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Toute théorie à variables cachées locales plafonne à 2. Une valeur mesurée
        entre 2 et 2,828 est le signe d'une intrication réelle ; au-delà de 2,828, il
        y a une erreur quelque part, dans l'expérience ou dans le comptage.
      </p>
    </div>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">GUP — principe d'incertitude généralisé</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Une variante du principe d'incertitude de Heisenberg dans laquelle on ajoute
        un <strong>terme gravitationnel</strong> : l'idée est qu'à l'échelle de
        Planck, sonder une très petite distance demande une énergie telle que l'on
        crée un trou noir, ce qui interdit de descendre plus bas. La conséquence
        attendue est l'existence d'une longueur minimale, que le laboratoire trouve
        égale à :
      </p>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        <strong>Δx_min = √2·ℓ_P</strong>
      </p>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Soit une longueur minimale de l'ordre de la longueur de Planck, et non zéro.
        L'espace ne serait donc pas continu à cette échelle.
      </p>
      <div class="tags rv"><span class="tag c">🧮 Δx_min = √2·ℓ_P</span></div>
    </div>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">Ions piégés / atomes neutres / supraconducteurs</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Les trois grandes technologies de qubits physiques, et les trois que le
        laboratoire a testées. Les <strong>ions piégés</strong> utilisent des atomes
        chargés maintenus par des champs électromagnétiques : connectivité
        all-to-all, excellente fidélité, mais des opérations plus lentes. Les
        <strong>atomes neutres</strong> sont manipulés par des pinces optiques :
        beaucoup de qubits, reconfiguration dynamique. Les
        <strong>supraconducteurs</strong> sont des circuits lithographiés : les plus
        rapides et les plus faciles à industrialiser, mais avec une connectivité
        limitée aux voisins. Le choix de la technologie change ce que le circuit
        devient après transpilation.
      </p>
    </div>

    <h2 id="g5" class="anchor rv">E · Topologie</h2>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">Homologie persistante</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Une méthode qui compte les trous d'un nuage de points <strong>à toutes les
        échelles simultanément</strong>. On fait grossir progressivement un rayon
        autour de chaque point ; des connexions apparaissent, des boucles se
        forment, puis se rebouchent. En suivant l'apparition et la disparition de
        chaque trou, on obtient une description de la forme globale des données qui
        ne dépend pas du choix d'une échelle unique. C'est l'outil derrière la
        notation P_sig.
      </p>
    </div>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">H1 (ou b1)</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Le premier groupe d'homologie, ou premier nombre de Betti. Il compte les
        <strong>trous et les boucles</strong> d'un objet. La valeur H1 = 0 signifie
        qu'il n'y a pas de structure circulaire : l'objet est simplement connexe, on
        peut le déformer en un point sans le déchirer. C'est le nombre qui apparaît
        dans le résultat du GCR, où l'étincelle topologique correspond à b1_max = 2.
      </p>
      <div class="tags rv"><span class="tag c">🧮 GCR — b1_max = 2</span></div>
    </div>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">Nombre de Betti</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Un invariant topologique : un nombre qui ne change pas quand on déforme
        l'objet sans le couper ni le recoller. Les deux premiers suffisent dans
        presque tous les cas pratiques : <strong>b0</strong> compte les composantes
        connexes, c'est-à-dire le nombre de morceaux séparés ;
        <strong>b1</strong> compte les boucles. Deux objets qui ont les mêmes
        nombres de Betti se ressemblent du point de vue de la topologie, même s'ils
        n'ont pas la même forme.
      </p>
    </div>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">Persistance</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        La durée de vie d'un trou à travers les échelles d'observation. Un trou qui
        apparaît à une échelle et disparaît aussitôt est probablement un artefact du
        bruit. Un trou qui survit sur une large plage d'échelles correspond à une
        <strong>structure réelle</strong> dans les données. C'est ce critère — la
        longueur du barreau, pas seulement sa présence — qui distingue un vrai motif
        d'une fluctuation.
      </p>
    </div>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">Dimension fractale</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Une dimension qui n'est pas un nombre entier, attribuée aux objets
        auto-similaires — ceux qui répètent leur structure à toute échelle. Elle
        quantifie à quel point l'objet remplit l'espace : entre une ligne (dimension
        1) et une surface pleine (dimension 2). Pour l'amas de percolation à
        p_c, la valeur exacte est :
      </p>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        <strong>d_f = 91/48 ≈ 1,8958</strong>
      </p>
      <div class="tags rv"><span class="tag c">🧮 91/48 ≈ 1,8958</span></div>
    </div>

    <h2 id="g6" class="anchor rv">F · Cosmologie et gravitation</h2>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">Longueur de Planck (ℓ_P)</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        L'échelle de longueur construite à partir des trois constantes
        fondamentales, ħ, G et c :
      </p>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        <strong>ℓ_P = √(ħG/c³) = 1,616 255 × 10⁻³⁵ m</strong>
      </p>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        C'est la distance en dessous de laquelle la description classique de l'espace
        cesse d'être valide, parce que les effets quantiques et gravitationnels
        deviennent du même ordre. Aucun instrument actuel n'approche cette échelle,
        d'un facteur inimaginable.
      </p>
    </div>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">Énergie de Planck (E_P)</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        L'énergie associée à l'échelle de Planck. Dans le modèle du laboratoire, le
        croisement pertinent se produit à :
      </p>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        <strong>E_P/√2 = 1,38 × 10⁹ J</strong>
      </p>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Cette valeur vaut environ 1,4 gigajoule, soit l'ordre de grandeur de
        l'énergie d'un <strong>éclair</strong>. Le rapprochement n'est pas une
        métaphore physique : c'est une coïncidence numérique de l'échelle, signalée
        comme telle.
      </p>
    </div>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">Loi de Hubble</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        La relation qui lie la vitesse d'éloignement d'une galaxie à sa distance :
      </p>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        <strong>v = H·r</strong>
      </p>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Le résultat notable du laboratoire n'est pas de la vérifier, mais de la voir
        <strong>émerger</strong> : dans le modèle synchrotron-24, qui ne contient pas
        la loi de Hubble, on mesure H·t = <strong>1,0000016</strong>. La relation
        sort donc du modèle au lieu d'y être entrée.
      </p>
      <div class="tags rv"><span class="tag c">🧮 H·t = 1,0000016</span></div>
    </div>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">Courbe de Page</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        L'évolution de l'information contenue dans un trou noir qui s'évapore. Elle
        <strong>monte</strong> pendant la première moitié de la vie du trou noir,
        puis <strong>redescend</strong> jusqu'à zéro, ce qui est nécessaire si
        l'information doit ressortir et que la mécanique quantique ne peut pas
        l'effacer. Le laboratoire obtient un pic exactement à la moitié de la durée,
        <strong>N/2</strong>, avec un accord de <strong>0,001 bit</strong> avec la
        formule analytique.
      </p>
      <div class="tags rv"><span class="tag c">🧮 pic à N/2 · accord 0,001 bit</span></div>
    </div>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">Rayon de Schwarzschild</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Le rayon de l'horizon d'un trou noir de masse M :
      </p>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        <strong>r_s = 2GM/c²</strong>
      </p>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        En dessous de ce rayon, rien ne peut ressortir, pas même la lumière.
        Remarquablement, il croît linéairement avec la masse : doubler la masse
        double le rayon de l'horizon.
      </p>
    </div>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">Effet Unruh</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Un observateur accéléré ne voit pas le vide comme vide : il le voit comme un
        bain thermique chaud, dont la température croît avec l'accélération. Le même
        vide est donc froid pour un observateur inertiel et chaud pour un observateur
        accéléré. L'effet est réel mais minuscule : les accélérateurs terrestres
        restent à environ <strong>31 ordres de grandeur</strong> en dessous de ce
        qu'il faudrait pour le rendre détectable.
      </p>
    </div>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">Entropie de Bekenstein</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        L'entropie d'un trou noir, c'est-à-dire la quantité d'information qu'il peut
        contenir, proportionnelle non pas à son volume mais à la <strong>surface de
        son horizon</strong>. C'est l'origine de l'idée holographique. Le laboratoire
        mesure <strong>4,53 bits par cellule de Planck</strong> d'aire.
      </p>
      <div class="tags rv"><span class="tag c">🧮 4,53 bits / cellule de Planck</span></div>
    </div>

    <h2 id="g7" class="anchor rv">G · Percolation et Ising</h2>
    <p class="rv">
      Ces deux modèles servent d'<a href="#/etalons">étalons</a> : leurs réponses sont
      connues publiquement et avec une grande précision, ce qui permet de mesurer
      l'écart d'un moteur par rapport à la vérité.
    </p>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">Percolation</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Le problème suivant : on occupe aléatoirement une fraction p des sites d'un
        réseau, et on demande à partir de quelle densité apparaît un amas qui traverse
        tout le réseau de part en part. En dessous du seuil, il n'y a que des îlots
        finis ; au-dessus, un amas infini se forme. Pour le réseau carré, le seuil
        vaut :
      </p>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        <strong>p_c = 0,592746</strong>
      </p>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Cette transition est un archétype : elle décrit aussi bien la propagation
        d'un feu de forêt que la conduction dans un matériau composite.
      </p>
      <div class="tags rv"><span class="tag c">🧮 p_c = 0,592746</span></div>
    </div>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">Ising 2D</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Un modèle de spins disposés sur une grille, chacun ne pouvant pointer que vers
        le haut ou vers le bas, et qui préfèrent s'aligner avec leurs voisins. À basse
        température, tout s'aligne : c'est le ferromagnétisme. À haute température,
        l'agitation thermique détruit l'ordre. La température critique sépare les deux
        régimes :
      </p>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        <strong>T_c = 2/ln(1+√2) ≈ 2,2692</strong>
      </p>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Au voisinage de T_c, les grandeurs physiques suivent des lois de puissance
        gouvernées par des exposants critiques, dont les deux principaux :
      </p>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        <strong>β = 1/8</strong> (aimantation spontanée) · <strong>γ = 7/4</strong>
        (susceptibilité)
      </p>
      <div class="tags rv"><span class="tag c">🧮 T_c ≈ 2,2692 · β = 1/8 · γ = 7/4</span></div>
    </div>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">Classe d'universalité</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Le fait que des systèmes physiquement très différents — un aimant, un fluide
        au point critique, un mélange binaire — partagent <strong>exactement les mêmes
        exposants critiques</strong> au voisinage de leur transition. Ce qui compte
        n'est pas le détail microscopique mais la dimension de l'espace et la symétrie
        du paramètre d'ordre. C'est ce qui autorise à étalonner un moteur sur un
        modèle jouet : si les exposants sortent justes sur Ising, la mécanique est
        probablement juste ailleurs.
      </p>
    </div>

    <h2 id="g8" class="anchor rv">H · Photonique</h2>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">Photon multi-chemins</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Une expérience où un photon n'emprunte pas <em>un</em> chemin mais
        <strong>simultanément des millions de trajectoires</strong>, dont les
        contributions interfèrent. L'expérience de RATISS-PHOTON en a reconstruit
        8,4 millions. Le résultat n'est pas seulement que ça fonctionne : c'est que le
        comportement observé reproduit celui du dispositif réel, ce qui valide le
        modèle de propagation.
      </p>
      <div class="tags rv"><span class="tag c">🧮 8,4 M chemins</span></div>
    </div>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">Équation paraxiale</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Une approximation de l'équation de propagation d'un faisceau lumineux. On
        suppose que le faisceau reste proche de son axe et se propage
        préférentiellement dans une direction : on peut alors négliger les variations
        de l'enveloppe le long de l'axe devant celles dans le plan transverse.
        L'équation devient bien plus simple à résoudre, et reste excellente dans le
        régime où l'approximation est valide.
      </p>
    </div>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">Fenêtre de Canton</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        La fenêtre de fidélité annoncée par Wen et al. : <strong>95–98,5 %</strong>.
        C'est la fourchette dans laquelle doit se situer une reproduction pour être
        considérée comme conforme au résultat publié. Le laboratoire s'en sert comme
        critère chiffré, pas comme référence d'autorité : l'étiquette 📚 rappelle que
        cette fenêtre vient d'une publication, pas d'une mesure du laboratoire.
      </p>
      <div class="tags rv">
        <span class="tag">📚 Wen et al. — 95–98,5 %</span>
      </div>
    </div>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">Hasard thermique</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Dans RATISS-PHOTON, le hasard n'est <strong>pas câblé</strong> dans le code :
        il <strong>émerge</strong> du bain thermique. À T = 0, le dispositif est
        parfaitement déterministe ; en montant la température, la dispersion
        statistique apparaît d'elle-même, sans être injectée par un générateur
        aléatoire. C'est un résultat de méthode : il suggère qu'un aléa observé peut
        parfois s'expliquer entièrement par l'agitation thermique de l'appareil, ce
        qui renvoie directement à R8.
      </p>
    </div>

    <h2 id="g9" class="anchor rv">I · Méthode et outillage</h2>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">Manifeste scellé</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Un fichier JSON de paramètres, <strong>figé et hashé avant le run</strong>.
        Il contient tout ce qui détermine l'expérience : les constantes, les tailles,
        les tolérances, les critères de verdict. Le hash est publié. Conséquence
        pratique : si quelqu'un — y compris l'auteur — modifie une valeur après avoir
        vu les résultats, le hash ne correspondra plus, et la modification sera
        visible. C'est le mécanisme qui rend R5 vérifiable au lieu d'être une
        promesse.
      </p>
    </div>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">Journal des déviations</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Une <strong>chaîne vérifiable</strong> de toutes les modifications survenues
        après une mesure. Chaque événement s'inscrit dans la continuité du précédent,
        si bien qu'insérer ou supprimer une entrée au milieu casse la chaîne et se
        voit immédiatement. Le journal est <strong>append-only</strong>. C'est le
        pendant de R6 : les échecs publiés ne servent à rien s'ils peuvent être
        effacés plus tard.
      </p>
    </div>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">SHA-256</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Une fonction de hachage cryptographique : elle transforme un fichier de
        n'importe quelle taille en une empreinte de 256 bits, toujours de la même
        longueur. Deux propriétés utiles ici. D'abord, <strong>la moindre
        modification change tout</strong> : si un seul octet du fichier diffère,
        l'empreinte n'a plus aucun rapport avec la précédente. Ensuite, on ne peut pas
        fabriquer un fichier qui produise une empreinte donnée. C'est ce qui rend un
        sceau vérifiable par n'importe qui, sans faire confiance à personne.
      </p>
    </div>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">Append-only</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Un registre où l'on <strong>ajoute</strong> et où l'on
        <strong>n'efface jamais</strong>. Une correction n'est pas une réécriture :
        c'est une nouvelle entrée qui dit ce qui était faux et pourquoi. Un résultat
        erroné reste donc lisible, à côté de sa correction. L'histoire du laboratoire
        se corrige, elle ne se réécrit pas.
      </p>
    </div>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">Régression</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Le cas où une modification casse quelque chose qui fonctionnait auparavant.
        C'est particulièrement vicieux en calcul scientifique, parce que le programme
        peut continuer à tourner et produire des nombres parfaitement plausibles,
        juste faux. D'où l'intérêt de la suite de tests de RATISS-Framework : elle
        rejoue les résultats connus et détecte la casse avant qu'elle ne se diffuse.
      </p>
    </div>

    <div class="rv" style="padding:18px 0;border-top:1px solid var(--line)">
      <h3 style="margin-bottom:8px">Témoin (blanc)</h3>
      <p style="font-size:14.5px;line-height:1.75;color:#a8cbc6">
        Un contrôle conduit <strong>sans la perturbation étudiée</strong>, dont on
        exige que le plancher de réponse soit quasi nul. Si le témoin s'agite alors
        qu'on ne lui a rien fait, c'est l'instrument qui fabrique du signal, et tout
        ce qui a été mesuré avec lui devient suspect. C'est l'outil d'application de
        R8 : il transforme « l'instrument est peut-être bruyant » en une mesure.
      </p>
    </div>

    <h2 id="g10" class="anchor rv">Index alphabétique</h2>
    <p class="rv">
      Pour retrouver un terme sans parcourir les sections : chaque entrée renvoie au
      titre qui la définit.
    </p>
    <table class="rv">
      <thead><tr><th>Terme</th><th>Section</th></tr></thead>
      <tbody>
        <tr><td>Ablation avec / sans</td><td><a href="#g3">Fluides</a></td></tr>
        <tr><td>All-to-all vs lattice</td><td><a href="#g4">Quantique</a></td></tr>
        <tr><td>Append-only</td><td><a href="#g9">Méthode</a></td></tr>
        <tr><td>Atomes neutres</td><td><a href="#g4">Quantique</a></td></tr>
        <tr><td>Blow-up (explosion)</td><td><a href="#g3">Fluides</a></td></tr>
        <tr><td>Borne de Tsirelson</td><td><a href="#g4">Quantique</a></td></tr>
        <tr><td>Centre NV (azote-lacune)</td><td><a href="#g4">Quantique</a></td></tr>
        <tr><td>chat-12</td><td><a href="#g4">Quantique</a></td></tr>
        <tr><td>Classe d'universalité</td><td><a href="#g7">Percolation &amp; Ising</a></td></tr>
        <tr><td>Courbe de Page</td><td><a href="#g6">Cosmologie</a></td></tr>
        <tr><td>Décohérence</td><td><a href="#g4">Quantique</a></td></tr>
        <tr><td>Dimension fractale</td><td><a href="#g5">Topologie</a></td></tr>
        <tr><td>Effet Unruh</td><td><a href="#g6">Cosmologie</a></td></tr>
        <tr><td>Énergie de Planck (E_P)</td><td><a href="#g6">Cosmologie</a></td></tr>
        <tr><td>Entropie de Bekenstein</td><td><a href="#g6">Cosmologie</a></td></tr>
        <tr><td>Équation paraxiale</td><td><a href="#g8">Photonique</a></td></tr>
        <tr><td>État de Bell</td><td><a href="#g4">Quantique</a></td></tr>
        <tr><td>Étiquette de terrain</td><td><a href="#g1">Règles</a></td></tr>
        <tr><td>Fenêtre de Canton</td><td><a href="#g8">Photonique</a></td></tr>
        <tr><td>Fidélité</td><td><a href="#g4">Quantique</a></td></tr>
        <tr><td>GCR — Grand Collisionneur de Ratiss</td><td><a href="#g2">Termes du labo</a></td></tr>
        <tr><td>GHZ</td><td><a href="#g4">Quantique</a></td></tr>
        <tr><td>GUP</td><td><a href="#g4">Quantique</a></td></tr>
        <tr><td>H1 (ou b1)</td><td><a href="#g5">Topologie</a></td></tr>
        <tr><td>Hasard thermique</td><td><a href="#g8">Photonique</a></td></tr>
        <tr><td>Homologie persistante</td><td><a href="#g5">Topologie</a></td></tr>
        <tr><td>Ions piégés</td><td><a href="#g4">Quantique</a></td></tr>
        <tr><td>Ising 2D</td><td><a href="#g7">Percolation &amp; Ising</a></td></tr>
        <tr><td>Journal des déviations</td><td><a href="#g9">Méthode</a></td></tr>
        <tr><td>Loi de Hubble</td><td><a href="#g6">Cosmologie</a></td></tr>
        <tr><td>Loi RATISS du shot épisodique</td><td><a href="#g2">Termes du labo</a></td></tr>
        <tr><td>Longueur de Planck (ℓ_P)</td><td><a href="#g6">Cosmologie</a></td></tr>
        <tr><td>Manifeste scellé</td><td><a href="#g9">Méthode</a></td></tr>
        <tr><td>Navier-Stokes</td><td><a href="#g3">Fluides</a></td></tr>
        <tr><td>Nombre de Betti</td><td><a href="#g5">Topologie</a></td></tr>
        <tr><td>P_sig</td><td><a href="#g2">Termes du labo</a></td></tr>
        <tr><td>Percolation</td><td><a href="#g7">Percolation &amp; Ising</a></td></tr>
        <tr><td>Persistance</td><td><a href="#g5">Topologie</a></td></tr>
        <tr><td>Photon multi-chemins</td><td><a href="#g8">Photonique</a></td></tr>
        <tr><td>Qubit</td><td><a href="#g4">Quantique</a></td></tr>
        <tr><td>R4 — Rejouable en une commande</td><td><a href="#g1">Règles</a></td></tr>
        <tr><td>R5 — Scellé avant</td><td><a href="#g1">Règles</a></td></tr>
        <tr><td>R6 — Échecs publiés</td><td><a href="#g1">Règles</a></td></tr>
        <tr><td>R7 — Étiquettes jamais mélangées</td><td><a href="#g1">Règles</a></td></tr>
        <tr><td>R8 — Mesurer ce qui déborde du script</td><td><a href="#g1">Règles</a></td></tr>
        <tr><td>RATISS-Omni</td><td><a href="#g2">Termes du labo</a></td></tr>
        <tr><td>Rayon de Schwarzschild</td><td><a href="#g6">Cosmologie</a></td></tr>
        <tr><td>Régression</td><td><a href="#g9">Méthode</a></td></tr>
        <tr><td>SHA-256</td><td><a href="#g9">Méthode</a></td></tr>
        <tr><td>SPH</td><td><a href="#g3">Fluides</a></td></tr>
        <tr><td>Supraconducteurs</td><td><a href="#g4">Quantique</a></td></tr>
        <tr><td>SWAP (porte)</td><td><a href="#g4">Quantique</a></td></tr>
        <tr><td>T1 / T2 / T2*</td><td><a href="#g4">Quantique</a></td></tr>
        <tr><td>Témoin (blanc)</td><td><a href="#g9">Méthode</a></td></tr>
        <tr><td>Transmon</td><td><a href="#g4">Quantique</a></td></tr>
        <tr><td>Transpilation</td><td><a href="#g4">Quantique</a></td></tr>
        <tr><td>Tryperposition</td><td><a href="#g2">Termes du labo</a></td></tr>
      </tbody>
    </table>

    <div class="note rv">
      <p>
        Aucune définition de cette page ne remplace une source primaire. Les valeurs
        marquées 📚 viennent de publications et sont citées comme telles ; celles
        marquées 🧮 ou 🛰️ viennent des dépôts du laboratoire, où tu peux les rejouer.
      </p>
    </div>

    <div class="pager rv">
      <a href="#/methode"><span>Voir aussi</span><b>← La méthode R4–R8</b></a>
      <a href="#/etalons" style="text-align:right"><span>Appliquer</span><b>Les étalons →</b></a>
    </div>
  </div>
  </div>
</section>
