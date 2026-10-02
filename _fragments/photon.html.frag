<section class="sec-t wx">
  <div class="doc-g">
    <div></div>
    <div>
      <p class="bc"><a href="#/">Accueil</a> <span>·</span> Photonique</p>
      <h1 class="big rv">Reproduire sans plagier<em>et publier ce qui ne marche pas.</em></h1>
      <p class="lede rv">
        Une équipe a publié qu'un photon peut emprunter des millions de chemins
        simultanément et reconstruire une image à partir de ce fait. Le laboratoire refait
        l'expérience — non pas dans un laboratoire d'optique, mais dans un monde simulé,
        avec sa propre équation. Ce n'est pas une compétition : eux mesurent le réel, nous
        simulons.
      </p>
    </div>
  </div>
</section>

<section class="sec wx" style="padding-top:20px">
  <div class="doc-g">
    <nav class="toc" data-toc>
      <h4>Sur cette page</h4>
      <a href="#x1">Le problème et l'équation</a>
      <a href="#x2">La méthode</a>
      <a href="#x3">Les résultats de reproduction</a>
      <a href="#x4">Le hasard émerge du bain thermique</a>
      <a href="#x5">Le contre-flux fantôme</a>
      <a href="#x6">Aucune redistribution : H4 à moitié falsifiée</a>
      <a href="#x7">Six bugs publiés et l'étalon</a>
      <a href="#x8">Ce que ça ne prouve pas</a>
      <a href="#x9">Étiquettes et rejeu</a>
    </nav>

    <div class="prose">
      <h2 id="x1" class="anchor rv">Le problème et l'équation</h2>
      <p class="rv">
        L'expérience de référence est celle de Wen et al., publiée dans <em>Science
        Advances</em> 12, eaeh1011 (2026). Le principe : au lieu de choisir un chemin, on
        laisse la lumière emprunter <strong>tous</strong> les chemins possibles en même
        temps, et on mesure ce qui arrive. La question posée par le laboratoire n'est pas
        « est-ce vrai ? » — l'équipe de Wen a mesuré le réel, elle. La question est :
        est-ce que je retrouve les mêmes chiffres en partant de l'équation et de rien
        d'autre ?
      </p>
      <p class="rv">
        L'équation en question est l'<strong>équation paraxiale</strong>. Elle décrit la
        propagation d'un faisceau lumineux dont les rayons restent proches de l'axe.
        Version courte : tant que la lumière ne s'écarte pas trop, on peut calculer son
        évolution avec une équation bien plus simple que les équations complètes de
        Maxwell.
      </p>
      <div class="note rv">
        <p>
          <strong>Le piège du mot « reproduction ».</strong> Refaire un calcul en
          laboratoire simulé ne remplace pas une mesure. Ce chantier ne dit pas « Wen et
          al. ont raison » : il dit « l'équation paraxiale, poussée jusqu'au bout, produit
          des chiffres compatibles avec ce qu'ils annoncent ». Ce sont deux affirmations
          distinctes.
        </p>
      </div>

      <h2 id="x2" class="anchor rv">La méthode</h2>
      <h3 class="rv">8 396 800 chemins, tous de même module</h3>
      <p class="rv">
        Le cœur du calcul est une somme sur les chemins. Chaque chemin reçoit une
        contribution, et le résultat final est la somme de toutes ces contributions. Ici,
        <strong>8 396 800 chemins</strong> sont reconstruits depuis l'équation paraxiale,
        tous avec le <strong>même module</strong> — c'est-à-dire la même amplitude. Ce qui
        les distingue, c'est uniquement leur phase, donc la façon dont ils s'additionnent
        ou s'annulent.
      </p>
      <p class="rv">
        Ce point est important, parce que c'est exactement la situation où les effets
        quantiques se manifestent : quand toutes les contributions ont la même taille, ce
        sont les interférences qui décident du résultat, pas les amplitudes.
      </p>
      <h3 class="rv">Trois variantes testées</h3>
      <p class="rv">
        Le laboratoire ne teste pas une seule recette. Trois reconstructions sont
        comparées : deux plans, trois plans, et une action dite « naïve » — une
        reconstruction plus directe, sans découpage en plans.
      </p>
      <h3 class="rv">La fenêtre annoncée</h3>
      <p class="rv">
        Les auteurs annoncent une fidélité comprise entre <strong>95 % et 98,5 %</strong>.
        C'est la fenêtre de Canton. Elle est fixée avant de comparer, ce qui évite de
        choisir la plage après avoir vu le résultat.
      </p>

      <h2 id="x3" class="anchor rv">Les résultats de reproduction</h2>
      <table class="rv">
        <thead><tr><th>Variante</th><th>Fidélité</th><th>Fenêtre annoncée</th></tr></thead>
        <tbody>
          <tr><td>2 plans</td><td>95,92 %</td><td>95 – 98,5 %</td></tr>
          <tr><td>3 plans</td><td>95,96 %</td><td>95 – 98,5 %</td></tr>
          <tr><td>Action naïve</td><td>96,77 %</td><td>95 – 98,5 %</td></tr>
        </tbody>
      </table>
      <p class="rv">
        Les trois variantes tombent dans la fenêtre, sans réglage fin. La corrélation
        d'intensité, qui mesure si les zones claires et sombres se retrouvent au bon
        endroit, se situe entre <strong>97,08 % et 97,10 %</strong>.
      </p>
      <table class="rv">
        <thead><tr><th>Grandeur</th><th>Valeur</th></tr></thead>
        <tbody>
          <tr><td>Chemins reconstruits</td><td>8 396 800</td></tr>
          <tr><td>Module des chemins</td><td>tous égaux</td></tr>
          <tr><td>Fidélité — 2 plans</td><td>95,92 %</td></tr>
          <tr><td>Fidélité — 3 plans</td><td>95,96 %</td></tr>
          <tr><td>Fidélité — action naïve</td><td>96,77 %</td></tr>
          <tr><td>Corrélation d'intensité</td><td>97,08 – 97,10 %</td></tr>
        </tbody>
      </table>
      <p class="rv">
        Une curiosité : la variante « naïve » obtient la meilleure fidélité des trois. Le
        laboratoire ne cache pas ce détail et ne le présente pas comme une supériorité
        méthodologique. Un écart de moins d'un point sur une reconstruction ne justifie pas
        de conclure qu'une méthode vaut mieux que l'autre.
      </p>

      <h2 id="x4" class="anchor rv">Le hasard émerge du bain thermique</h2>
      <p class="rv">
        C'est le résultat le plus intéressant du chantier, et il n'était pas prévu.
      </p>
      <p class="rv">
        En mécanique quantique, on décrit souvent le résultat d'une mesure comme un tirage
        au sort : le système « choisit » une position selon une probabilité, la règle de
        Born. C'est un postulat. Dans ce modèle-ci, <strong>aucun tirage de Born n'est
        câblé</strong> : il n'y a nulle part dans le code une instruction qui tire un
        nombre au hasard pour décider où le photon arrive.
      </p>
      <h3 class="rv">Ce qui se passe à température nulle</h3>
      <p class="rv">
        À <code>T = 0 K</code>, le système frappe <strong>une seule position sur 400</strong>.
        Toujours la même. Entièrement déterministe. Si tu relances le calcul, tu retrouves
        exactement le même point d'impact.
      </p>
      <h3 class="rv">Ce qui se passe quand on chauffe</h3>
      <p class="rv">
        On ajoute un bain thermique — c'est-à-dire qu'on laisse l'environnement agiter le
        système de façon imprévisible. À <code>300 K</code>, la corrélation de Pearson
        atteint un maximum de <strong>0,73</strong> : la distribution d'impact se met à
        ressembler à la distribution quantique attendue. Le hasard est apparu, sans avoir
        été mis dans le code.
      </p>
      <table class="rv">
        <thead><tr><th>Température</th><th>Comportement observé</th></tr></thead>
        <tbody>
          <tr><td>0 K</td><td>1 seule position d'impact sur 400 — déterminisme total</td></tr>
          <tr><td>300 K</td><td>Pearson max 0,73 — la distribution quantique apparaît</td></tr>
          <tr><td>4T</td><td>noyé — l'effet disparaît sous le bruit thermique</td></tr>
        </tbody>
      </table>
      <p class="rv">
        Le troisième point est la contrepartie honnête du résultat : chauffer trop fort ne
        renforce pas l'effet, il le noie. À <code>4T</code>, la correspondance retombe à
        <strong>0,24</strong>. Il existe donc une fenêtre de température où le hasard
        ressemble au hasard quantique — ni trop froide (déterminisme), ni trop chaude
        (bruit pur).
      </p>
      <div class="note warn rv">
        <p>
          <strong>Ce que ça ne dit pas.</strong> Ce résultat ne dérive pas la règle de Born
          depuis la physique classique. Il montre que, dans ce modèle précis, un hasard
          statistiquement compatible avec la distribution quantique apparaît spontanément
          quand on branche un bain thermique. C'est une observation sur un modèle, pas une
          théorie de la mesure.
        </p>
      </div>

      <h2 id="x5" class="anchor rv">Le contre-flux fantôme</h2>
      <p class="rv">
        En regardant les flux dans la simulation, on trouve quelque chose qui ne devrait
        pas être là : une petite quantité de flux qui circule à contresens.
      </p>
      <table class="rv">
        <thead><tr><th>Grandeur</th><th>Valeur</th></tr></thead>
        <tbody>
          <tr><td>Contre-flux mesuré</td><td>−7,1 × 10⁻⁴</td></tr>
          <tr><td>Flux net</td><td>−3,4 × 10⁻⁸</td></tr>
        </tbody>
      </table>
      <p class="rv">
        Deux lectures, et il faut les deux. Le contre-flux vaut environ sept dix-millièmes :
        minuscule, mais détectable dans le calcul. Le flux net, lui, vaut
        <strong>−3,4 × 10⁻⁸</strong> : quatre ordres de grandeur plus petit. Autrement dit,
        ce qui circule à contresens est presque exactement compensé. Le bilan global est
        quasi nul.
      </p>
      <p class="rv">
        C'est cohérent avec ce qu'on attend d'un système linéaire, où rien ne se crée ni ne
        disparaît. Mais le fait que le contre-flux ne soit pas exactement nul est une
        observation à part entière, et le laboratoire la publie comme telle plutôt que de
        la traiter comme du bruit numérique sans importance.
      </p>

      <h2 id="x6" class="anchor rv">Aucune redistribution : H4 à moitié falsifiée</h2>
      <p class="rv">
        L'hypothèse H4 affirmait qu'en bloquant une branche du dispositif, l'intensité se
        redistribuerait sur les autres branches. C'est une intuition physique assez
        répandue : bouche un passage, le flux trouvera un autre chemin.
      </p>
      <p class="rv">
        Mesure directe : <strong>1,00 / 0,98 / 0,96</strong>. Aucune redistribution. Les
        rapports restent à leur valeur initiale, à quelques pour cent près.
      </p>
      <table class="rv">
        <thead><tr><th>Condition</th><th>Rapport mesuré</th><th>Redistribution</th></tr></thead>
        <tbody>
          <tr><td>Branche bloquée — cas 1</td><td>1,00</td><td>aucune</td></tr>
          <tr><td>Branche bloquée — cas 2</td><td>0,98</td><td>aucune</td></tr>
          <tr><td>Branche bloquée — cas 3</td><td>0,96</td><td>aucune</td></tr>
        </tbody>
      </table>
      <p class="rv">
        La raison est mathématique et sans appel : <strong>la linéarité l'interdit</strong>.
        Dans un système linéaire, supprimer une contribution ne renvoie pas cette
        contribution ailleurs — elle disparaît, simplement. Attendre une redistribution
        revient à attendre d'un système linéaire qu'il se comporte comme un système
        non-linéaire.
      </p>
      <div class="note warn rv">
        <p>
          <strong>H4 est à moitié falsifiée, et publiée telle quelle.</strong> L'hypothèse
          est fausse sur la redistribution. Elle n'est pas entièrement vide : le cadrage
          du problème qu'elle imposait a servi à concevoir la mesure. Un laboratoire qui ne
          publierait que ses hypothèses confirmées n'aurait aucune hypothèse à publier.
        </p>
      </div>

      <h2 id="x7" class="anchor rv">Six bugs publiés et l'étalon</h2>
      <h3 class="rv">Six bugs, documentés et livrés avec le code</h3>
      <p class="rv">
        Six erreurs ont été trouvées dans le code pendant ce chantier. Chacune est
        documentée et publiée avec la correction, dans le même dépôt que le code. Le motif
        est celui de la règle R6 : un bug corrigé en silence laisse croire que le code
        était juste du premier coup, et prive les autres du seul enseignement vraiment
        transférable — comment l'erreur est apparue.
      </p>
      <h3 class="rv">L'étalon à une fente</h3>
      <p class="rv">
        Avant de tester le dispositif complexe, le laboratoire vérifie la brique la plus
        simple : une seule fente. Le résultat tombe à <strong>2,9 % de la théorie</strong>.
        C'est le contrôle de base : si l'étalon ne tient pas, rien de ce qui suit n'a de
        valeur.
      </p>
      <h3 class="rv">L'étiquette E-F1 reste non tranchée</h3>
      <p class="rv">
        Un point précis reste ouvert : la <strong>plaque π/2 sub-pixel</strong>. Le
        déphasage attendu est d'un quart de période, mais à l'échelle d'un pixel, il tombe
        sous la résolution de la reconstruction. Le laboratoire ne tranche pas, et le
        signale par une étiquette dédiée plutôt que de forcer une conclusion.
      </p>
      <h3 class="rv">La nuance honnête sur l'action</h3>
      <div class="note rv">
        <p>
          <strong>L'action d'un monde paraxial est quadratique.</strong> C'est une
          propriété du cadre, pas un choix du laboratoire. Conséquence directe : le postulat
          se lit avec l'action du monde, et il n'est pas résoluble à
          <strong>≤ 12°</strong> — au-delà de cet angle, l'approximation paraxiale ne tient
          plus. Toute conclusion de ce chantier vit à l'intérieur de cette limite, et le
          laboratoire préfère l'écrire que la laisser découvrir.
        </p>
      </div>

      <h2 id="x8" class="anchor rv">Ce que ça ne prouve pas</h2>
      <ul class="rv">
        <li>
          <strong>Une reproduction simulée n'est pas une mesure.</strong> Wen et al. ont
          mesuré des photons réels. Ici, une équation a été résolue sur une machine. Les
          chiffres sont compatibles, ce qui ne valide ni l'expérience d'origine ni la
          nôtre.
        </li>
        <li>
          <strong>Le hasard émergent n'est pas une dérivation de la règle de Born.</strong>
          Il montre qu'un bain thermique, dans ce modèle, produit une statistique
          compatible. La correspondance plafonne à 0,73 à 300 K, et disparaît à 4T.
        </li>
        <li>
          <strong>Le contre-flux est une observation, pas un effet nouveau.</strong> À
          −7,1 × 10⁻⁴ avec un flux net de −3,4 × 10⁻⁸, il reste dans le régime où le bilan
          global est nul. Y voir une découverte serait une erreur d'interprétation.
        </li>
        <li>
          <strong>H4 falsifiée ne veut pas dire que tout le cadre est faux.</strong> Cela
          veut dire qu'une hypothèse précise, écrite avant la mesure, ne survit pas à la
          mesure. C'est le fonctionnement normal de la méthode.
        </li>
        <li>
          <strong>La fenêtre 95 – 98,5 % n'est pas un certificat.</strong> Elle est
          annoncée par les auteurs, et les trois variantes y tombent. Rester dans une
          fenêtre n'est pas la même chose que reproduire exactement.
        </li>
        <li>
          <strong>Aucune validation par les pairs.</strong> Le code, les six bugs, les
          résultats bruts et la vue 3D sont publiés. La relecture externe n'a pas eu lieu.
        </li>
      </ul>

      <h2 id="x9" class="anchor rv">Étiquettes et rejeu</h2>
      <p class="rv">
        Règle R7, et ici la séparation est maximale : ce chantier est
        <strong>calcul pur, zéro QPU</strong>. Aucun processeur quantique n'a été
        interrogé, aucun crédit dépensé. Les 8 396 800 chemins sont une somme calculée, pas
        une mesure.
      </p>
      <div class="tags rv">
        <span class="tag c">🧮 calcul pur — zéro QPU</span>
        <span class="tag f">H4 à moitié falsifiée — publiée</span>
        <span class="tag f">E-F1 non tranché — plaque π/2 sub-pixel</span>
      </div>
      <p class="rv">
        Tout est rejouable : les scripts, les paramètres, les six bugs documentés et la vue
        3D Plotly embarquée. Le dépôt est également publié sur GitHub Pages, ce qui permet
        de manipuler la reconstruction directement dans un navigateur, sans rien installer.
      </p>
      <div class="note rv">
        <p>
          <strong>À retenir de ce chantier.</strong> Une reproduction qui tombe dans la
          fenêtre annoncée, un hasard qui apparaît sans avoir été écrit, une hypothèse
          falsifiée, six bugs publiés, et une limite — l'angle de 12° — qui borne tout ce
          qui précède. C'est l'ensemble qui a de la valeur, pas seulement la fidélité.
        </p>
      </div>

      <div class="pager rv">
        <a href="#/chantier-quantique"><span>Précédent</span><b>← Quantique</b></a>
        <a href="#/recherche" style="text-align:right"><span>Retour</span><b>Les quatre chantiers →</b></a>
      </div>
    </div>
  </div>
</section>
