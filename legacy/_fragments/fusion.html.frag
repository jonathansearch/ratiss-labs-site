<section class="sec-t wx">
  <div class="doc-g">
    <div></div>
    <div>
      <p class="bc"><a href="#/">Accueil</a> <span>·</span> Fusion &amp; gravitation</p>
      <h1 class="big rv">Trois chantiers,<em>une seule question : d'où vient ce qu'on observe ?</em></h1>
      <p class="lede rv">
        Une cible deutérium-tritium qui implose, une étoile de cent masses solaires qui
        s'effondre, et une loi cosmologique qui apparaît sans avoir été écrite nulle part.
        Ces trois chantiers partagent la même méthode : des équations connues, un critère
        scellé avant le run, et des réfutations publiées quand les chiffres contredisent
        l'intuition.
      </p>
    </div>
  </div>
</section>

<section class="sec wx" style="padding-top:20px">
  <div class="doc-g">
    <nav class="toc" data-toc>
      <h4>Sur cette page</h4>
      <a href="#x1">Pourquoi ces trois chantiers ensemble</a>
      <a href="#x2">Fusion deutérium-tritium</a>
      <a href="#x3">Fusion sans réseaux de neurones</a>
      <a href="#x4">Effondrement gravitationnel</a>
      <a href="#x5">La loi de Hubble qui émerge</a>
      <a href="#x6">Le fantôme topologique</a>
      <a href="#x7">Les trois réfutations publiées</a>
      <a href="#x8">Ce que ça ne prouve pas</a>
      <a href="#x9">Étiquettes et rejeu</a>
    </nav>

    <div class="prose">
      <h2 id="x1" class="anchor rv">Pourquoi ces trois chantiers ensemble</h2>
      <p class="rv">
        Les trois partent d'équations que personne ne conteste : les sections de réaction
        nucléaires mesurées en laboratoire, la relativité générale pour l'effondrement, la
        même relativité pour l'expansion. Aucune n'est une théorie maison. Ce qui est
        testé ici, c'est la chaîne de calcul : est-ce que partir de ces équations et
        pousser le calcul jusqu'au bout redonne ce qu'on observe, ou est-ce que ça produit
        autre chose ?
      </p>
      <p class="rv">
        Ce qui rend ces chantiers intéressants n'est pas qu'ils fonctionnent. C'est que
        deux d'entre eux ont produit des résultats que le laboratoire n'attendait pas, et
        qu'un troisième a réfuté une prédiction que le laboratoire avait lui-même scellée.
      </p>

      <h2 id="x2" class="anchor rv">Fusion deutérium-tritium</h2>
      <p class="rv">
        Le principe de la fusion par confinement inertiel est simple à énoncer : on prend
        une petite bille de combustible, on la comprime très fort et très vite, et au
        centre la température et la densité montent assez pour que les noyaux fusionnent.
        Le laboratoire simule cette implosion, sans matériel, en Python.
      </p>
      <h3 class="rv">Les briques du modèle</h3>
      <ul class="rv">
        <li>
          <strong>L'implosion ICF</strong> — la compression de la cible, sa convergence,
          les conditions atteintes au point chaud.
        </li>
        <li>
          <strong>Les sections de réaction Bosch-Hale</strong> — ce sont les probabilités
          de réaction deutérium-tritium, ajustées sur des mesures de laboratoire. Elles ne
          sont pas inventées : ce sont des fonctions de référence utilisées partout.
        </li>
        <li>
          <strong>Le critère de Lawson</strong> — la condition d'équilibre entre l'énergie
          produite par les réactions et l'énergie perdue. C'est la frontière entre un
          plasma qui s'éteint et un plasma qui s'emballe.
        </li>
      </ul>
      <h3 class="rv">Les chiffres</h3>
      <table class="rv">
        <thead><tr><th>Grandeur</th><th>Valeur</th></tr></thead>
        <tbody>
          <tr><td>Fusions simulées</td><td>428</td></tr>
          <tr><td>Gain Q — valeur pic</td><td>101</td></tr>
          <tr><td>Crashs en cours d'exécution</td><td>0</td></tr>
          <tr><td>Tests verts</td><td>4</td></tr>
        </tbody>
      </table>
      <p class="rv">
        Le <strong>gain Q</strong> est le rapport entre l'énergie libérée par les réactions
        et l'énergie injectée pour comprimer la cible. Q = 1 est le seuil symbolique :
        autant d'énergie produite que dépensée. Le pic de <strong>101</strong> atteint ici
        correspond à la configuration la plus favorable du balayage — pas à une moyenne,
        et pas à un résultat qu'on obtiendrait à coup sûr.
      </p>
      <div class="note rv">
        <p>
          <strong>Q pic n'est pas Q typique.</strong> Un pic à 101 sur 428 fusions dit
          qu'une configuration du balayage atteint 101. La distribution complète est dans
          les résultats bruts, et c'est elle qu'il faut lire si tu veux savoir à quoi
          ressemble le régime ordinaire.
        </p>
      </div>
      <p class="rv">
        Zéro crash sur 428 exécutions n'est pas un détail cosmétique : c'est ce qui permet
        de dire que le balayage est complet. Un balayage qui plante sur un tiers des points
        ne balaye que les deux tiers faciles, et le pic qu'il rapporte est biaisé.
      </p>

      <h2 id="x3" class="anchor rv">Fusion sans réseaux de neurones</h2>
      <p class="rv">
        Le chantier RATISS-NUCLEAIRE reprend la fusion par confinement inertiel et y ajoute
        la fusion stellaire — celle qui fait briller les étoiles. Une contrainte forte a
        été posée au départ : <strong>aucun réseau de neurones</strong> dans la chaîne.
      </p>
      <p class="rv">
        Le raisonnement est le suivant. Un modèle entraîné peut reproduire des chiffres
        sans qu'on sache par quel chemin il y arrive. Pour un chantier dont l'objectif est
        de comprendre ce qui limite la réaction, un modèle dont on ne peut pas lire le
        raisonnement est un handicap, pas une aide. Tout ici est donc explicite : des
        équations, des paramètres, des sorties.
      </p>
      <table class="rv">
        <thead><tr><th>Chantier</th><th>Approche</th><th>Tests verts</th></tr></thead>
        <tbody>
          <tr><td>RATISS-FUSION</td><td>ICF + Bosch-Hale + Lawson</td><td>4</td></tr>
          <tr><td>RATISS-NUCLEAIRE</td><td>ICF + stellaire, sans réseau de neurones</td><td>12</td></tr>
        </tbody>
      </table>

      <h2 id="x4" class="anchor rv">Effondrement gravitationnel</h2>
      <p class="rv">
        SYNCHROTRON-24 prend une étoile de <strong>100 masses solaires</strong> et la laisse
        s'effondrer sous sa propre gravité. C'est un régime extrême : à cette masse, rien
        ne retient l'effondrement, et le calcul doit rester stable jusqu'au bout.
      </p>
      <h3 class="rv">Cinq clés mesurées</h3>
      <p class="rv">
        Cinq quantités sont mesurées, chacune avec un rôle précis. Elles ne sont pas
        décoratives : chacune teste une propriété différente du modèle.
      </p>
      <table class="rv">
        <thead><tr><th>Clé</th><th>Mesure</th><th>Ce qu'elle teste</th></tr></thead>
        <tbody>
          <tr><td>Unité</td><td>1,00 → 0,05 → 0,73</td><td>l'information ne disparaît pas : elle chute puis remonte</td></tr>
          <tr><td>Rebond</td><td><code>H·t = 1,00</code> exact</td><td>pas de singularité nue : le calcul se retourne au lieu de casser</td></tr>
          <tr><td>Λ*</td><td>~ 10⁻³, signe +</td><td>l'échelle propre au modèle, avec son signe</td></tr>
          <tr><td>Fantôme</td><td>9/12 retenues à M = 0</td><td>une empreinte topologique retient la matière sans masse</td></tr>
          <tr><td>Enfermement</td><td>12 contre 2 — facteur ×6</td><td>la géométrie confine, et de combien</td></tr>
        </tbody>
      </table>
      <h3 class="rv">Lire la clé d'unitarité</h3>
      <p class="rv">
        L'unitarité, en physique, c'est la conservation de l'information : rien ne se perd
        vraiment. Ici la mesure part de <strong>1,00</strong> (toute l'information
        présente), chute à <strong>0,05</strong> au cœur de l'effondrement, puis remonte à
        <strong>0,73</strong>. Le chiffre qui compte est le troisième : ce qui semblait
        perdu revient en grande partie. C'est le comportement attendu d'un processus
        réversible, et c'est exactement le débat ouvert par le paradoxe de l'information
        des trous noirs.
      </p>
      <h3 class="rv">Lire la clé de rebond</h3>
      <p class="rv">
        <code>H·t = 1,00</code> exactement. C'est une relation entre le taux d'expansion H
        et l'âge t du système. Elle vaut exactement 1 dans le calcul, pas 1,02 ni 0,98 :
        exactement 1,00. C'est le signe que le modèle se comporte, à ce stade, comme un
        univers en expansion critique.
      </p>

      <h2 id="x5" class="anchor rv">La loi de Hubble qui émerge</h2>
      <p class="rv">
        Voici le résultat le plus déroutant du lot, et il faut être précis sur ce qu'il
        signifie.
      </p>
      <p class="rv">
        En 1929, Hubble observe que les galaxies lointaines s'éloignent d'autant plus vite
        qu'elles sont loin : <code>v = H·d</code>. C'est la loi de Hubble. Dans ce
        chantier, <strong>cette loi n'est écrite nulle part dans le modèle</strong>. Le
        modèle reçoit une étoile, de la gravité, et un cadre de calcul. Rien d'autre.
      </p>
      <p class="rv">
        Et pourtant, en regardant les résultats, le produit <code>H·t</code> — le taux
        d'expansion multiplié par l'âge — converge vers <strong>1,0000016</strong> à six
        décimales. La loi de Hubble sort d'un modèle qui ne la contient pas, et elle sort
        avec une précision que personne n'a paramétrée.
      </p>
      <table class="rv">
        <thead><tr><th>Mesure</th><th>Valeur</th></tr></thead>
        <tbody>
          <tr><td><code>H·t</code> à six décimales</td><td>1,0000016</td></tr>
          <tr><td><code>H·t</code> — clé de rebond</td><td>1,00 exact</td></tr>
          <tr><td>Rayon maximal</td><td><code>r_max</code> suit 75,07 × t</td></tr>
          <tr><td>Forme de l'expansion</td><td>linéaire exacte</td></tr>
        </tbody>
      </table>
      <p class="rv">
        Le second point est aussi important que le premier. <code>r_max</code> — le rayon
        de la région qui s'étend — suit une droite : <code>75,07 × t</code>. Pas une
        courbe, pas une loi de puissance approchée : une droite. L'expansion est linéaire,
        et son coefficient est stable.
      </p>
      <div class="note rv">
        <p>
          <strong>Attention à ne pas surinterpréter.</strong> Que la loi de Hubble émerge
          d'un calcul ne signifie pas que le calcul explique l'univers. Cela signifie que
          la relation <code>H·t = 1</code> n'est pas un ingrédient arbitraire de la
          cosmologie : elle tombe naturellement d'un effondrement décrit par la relativité
          générale. C'est un résultat sur les équations, pas une découverte sur le cosmos.
        </p>
      </div>
      <p class="rv">
        Cette nuance n'est pas de la prudence de façade. La différence entre « mon modèle
        reproduit la loi de Hubble » et « la loi de Hubble est une conséquence nécessaire
        de la relativité générale » est énorme, et seul le second énoncé serait une
        nouveauté. Ce chantier soutient le premier, et suggère le second.
      </p>

      <h2 id="x6" class="anchor rv">Le fantôme topologique</h2>
      <p class="rv">
        Voici le résultat le plus contre-intuitif : une structure géométrique peut retenir
        de la matière alors qu'elle ne porte <strong>aucune masse</strong>.
      </p>
      <p class="rv">
        Dans le modèle, on mesure une empreinte topologique notée <code>H1</code>. Sans
        entrer dans la définition technique : <code>H1</code> compte les « trous » d'une
        structure — les boucles qu'on ne peut pas refermer sans la déchirer. Un anneau a
        <code>H1 = 1</code>. Une sphère pleine a <code>H1 = 0</code>.
      </p>
      <p class="rv">
        On éteint ensuite la masse : <code>M = 0</code>. Aucune particule ne porte de
        masse. Et pourtant :
      </p>
      <table class="rv">
        <thead><tr><th>Configuration</th><th><code>H1</code></th><th>Particules retenues</th></tr></thead>
        <tbody>
          <tr><td>Empreinte topologique, M = 0</td><td>0,677</td><td>9 sur 12</td></tr>
          <tr><td>Vide de référence</td><td>—</td><td>0 sur 12</td></tr>
        </tbody>
      </table>
      <p class="rv">
        Autrement dit : <strong>24 % de la masse retient 75 % des particules</strong>.
        Éteinte la masse, la structure continue de piéger la matière. Ce qu'on appelle ici
        le « fantôme » n'est pas une entité mystérieuse : c'est le nom donné à cet effet —
        une géométrie qui contraint le mouvement sans fournir la source qui devrait le
        contraindre.
      </p>
      <div class="note warn rv">
        <p>
          <strong>Ce que ce résultat n'est pas.</strong> Ce n'est pas une nouvelle
          particule, ni une cinquième force, ni une explication de la matière noire. C'est
          une mesure faite dans un modèle simulé, avec une définition précise de
          <code>H1</code> et un protocole rejouable. Le mot « fantôme » est une étiquette
          de travail, pas une revendication physique.
        </p>
      </div>

      <h2 id="x7" class="anchor rv">Les trois réfutations publiées</h2>
      <p class="rv">
        C'est ici que la règle R6 devient concrète. Trois résultats de ce chantier sont des
        réfutations — dont deux visent des prédictions du laboratoire lui-même.
      </p>
      <h3 class="rv">1. Le crayon Λ* réfuté, d'un facteur 50</h3>
      <p class="rv">
        La valeur <code>Λ* = 0,1125</code> avait été écrite au crayon comme une hypothèse de
        travail. Le calcul a donné autre chose : la mesure est <strong>50 fois</strong>
        plus petite. L'hypothèse est morte, et la feuille où elle était écrite reste dans
        le dépôt. C'est le but : si on effaçait le crayon, personne ne saurait qu'on s'est
        trompé, et la valeur mesurée aurait l'air d'être tombée du ciel.
      </p>
      <h3 class="rv">2. « Ouvert = 0/12 » réfuté — mesuré 8 à 9 sur 12</h3>
      <p class="rv">
        La prédiction était nette : dans une configuration ouverte, aucune particule ne
        devrait être retenue. Zéro sur douze. Le calcul en a retenu <strong>8 à 9 sur
        12</strong>. La prédiction est réfutée, et c'est la mesure qui reste. Une
        prédiction fausse publiée avec sa correction vaut mieux qu'une prédiction juste
        publiée sans son historique.
      </p>
      <h3 class="rv">3. Le critère E_proxy cassé, puis corrigé</h3>
      <p class="rv">
        Le critère <code>E_proxy</code> servait à décider si un résultat était retenu. Il
        s'est révélé <strong>cassé</strong> : il validait des cas qu'il aurait dû rejeter.
        Il a été corrigé, et la correction est documentée avec l'ancien comportement — pas
        remplacée en silence.
      </p>
      <table class="rv">
        <thead><tr><th>Réfutation</th><th>Ce qui était annoncé</th><th>Ce qui a été mesuré</th></tr></thead>
        <tbody>
          <tr><td>Crayon Λ*</td><td>0,1125</td><td>≈ 50 fois plus petit</td></tr>
          <tr><td>« ouvert = 0/12 »</td><td>0 sur 12</td><td>8 à 9 sur 12</td></tr>
          <tr><td>Critère E_proxy</td><td>critère valide</td><td>cassé, puis corrigé et documenté</td></tr>
        </tbody>
      </table>
      <p class="rv">
        Le motif est toujours le même : une hypothèse écrite, un calcul qui la contredit,
        et la contradiction publiée avec le reste. Un laboratoire qui ne publie que ses
        confirmations ne publie pas de la science, il publie une brochure.
      </p>

      <h2 id="x8" class="anchor rv">Ce que ça ne prouve pas</h2>
      <ul class="rv">
        <li>
          <strong>Le gain Q = 101 n'annonce aucune faisabilité énergétique.</strong> C'est
          un résultat de simulation sur une cible idéalisée, sans les instabilités
          hydrodynamiques réelles, sans les défauts de la cible, sans la consommation
          totale d'une installation.
        </li>
        <li>
          <strong>428 fusions ne font pas une campagne expérimentale.</strong> Aucun
          neutron n'a été produit ici. Tout est calcul.
        </li>
        <li>
          <strong>L'effondrement est un calcul classique.</strong> Il ne remplace pas une
          théorie quantique de la gravité, et il ne prétend pas résoudre le paradoxe de
          l'information des trous noirs. La clé d'unitarité mesure un comportement du
          modèle, pas celui d'un trou noir réel.
        </li>
        <li>
          <strong>La loi de Hubble qui émerge ne réécrit pas la cosmologie.</strong> Elle
          montre que la relation <code>H·t = 1</code> découle naturellement du cadre. Elle
          ne mesure ni la constante de Hubble réelle, ni l'énergie noire.
        </li>
        <li>
          <strong>Le fantôme n'est pas une découverte de physique.</strong> C'est un effet
          mesuré dans un modèle, avec une définition explicite de la structure
          topologique utilisée. Une autre définition donnerait un autre chiffre.
        </li>
        <li>
          <strong>Rien de tout cela n'est validé par les pairs.</strong> Les scripts, les
          manifestes et le journal des déviations sont publiés. La relecture reste à
          faire, et le laboratoire ne prétend pas qu'elle a eu lieu.
        </li>
      </ul>

      <h2 id="x9" class="anchor rv">Étiquettes et rejeu</h2>
      <p class="rv">
        Règle R7 : chaque chiffre porte son origine, et les origines ne sont jamais
        mélangées. Sur ces trois chantiers, tout est <strong>calcul</strong>. Aucune ligne
        ne vient d'une mesure sur machine quantique, aucune ne vient d'une simple lecture
        de papier.
      </p>
      <div class="tags rv">
        <span class="tag c">🧮 calcul — fusion, nucléaire, cosmologie</span>
        <span class="tag f">hypothèses réfutées et publiées</span>
      </div>
      <p class="rv">
        La reproductibilité se teste comme ailleurs : une commande, un clone neuf, les
        mêmes chiffres. Si <code>H·t</code> ne ressort pas à 1,0000016 chez toi, il y a
        quelque chose à comprendre — et le laboratoire préfère le savoir.
      </p>

      <div class="pager rv">
        <a href="#/chantier-navier"><span>Précédent</span><b>← Navier-Stokes</b></a>
        <a href="#/chantier-quantique" style="text-align:right"><span>Suivant</span><b>Quantique →</b></a>
      </div>
    </div>
  </div>
</section>
