<section class="sec-t wx">
  <div class="doc-g">
    <div></div>
    <div>
      <p class="bc"><a href="#/">Accueil</a> <span>·</span> RATISS-ETALONS</p>
      <h1 class="big rv">Quatre problèmes connus<em>pour savoir si le moteur a raison.</em></h1>
      <p class="lede rv">
        On prend quatre problèmes dont la réponse exacte est publiée. On les fait
        tourner sur le moteur. On publie l'écart, y compris quand il est mauvais.
      </p>
    </div>
  </div>
</section>

<section class="sec wx" style="padding-top:20px">
  <div class="doc-g">
  <nav class="toc" data-toc>
    <h4>Sur cette page</h4>
    <a href="#e1">Pourquoi ces quatre-là</a>
    <a href="#e2">Le protocole</a>
    <a href="#e3">Les quatre étalons</a>
    <a href="#e4">Les résultats</a>
    <a href="#e5">Les deux rouges assumés</a>
    <a href="#e6">Ce qu'ils ont appris</a>
    <a href="#e7">Les témoins</a>
    <a href="#e8">Le README</a>
  </nav>

  <div class="prose">
    <p class="rv">
      C'est toute la méthode. Un étalon qui sort faux est plus instructif qu'un étalon
      non testé — parce qu'un moteur qu'on n'a jamais confronté à une réponse connue
      n'est pas validé, il est seulement lancé.
    </p>

    <h2 id="e1" class="anchor rv">Pourquoi ces quatre-là</h2>
    <p class="rv">
      Les quatre étalons ne testent pas la même chose. Chacun attaque une famille de
      mécanismes différente, et si le moteur se trompe, le type d'erreur qu'il produit
      désigne déjà la cause probable.
    </p>
    <table class="rv">
      <thead><tr><th>Étalon</th><th>Ce qu'il teste</th><th>Réponse connue</th></tr></thead>
      <tbody>
        <tr>
          <td><strong>E01</strong> — Percolation</td>
          <td>La topologie : comptage d'amas, de trous, dimension fractale.</td>
          <td>p_c = 0,592746 · d_f = 91/48 ≈ 1,8958</td>
        </tr>
        <tr>
          <td><strong>E02</strong> — Ising 2D</td>
          <td>La thermodynamique, le Monte-Carlo, l'universalité.</td>
          <td>T_c = 2/ln(1+√2) ≈ 2,2692 · β = 1/8 · γ = 7/4</td>
        </tr>
        <tr>
          <td><strong>E03</strong> — Trois corps</td>
          <td>L'intégration, le chaos, l'exposant de Lyapunov.</td>
          <td>Orbite en huit (Chenciner-Montgomery) : T = 6,32591398</td>
        </tr>
        <tr>
          <td><strong>E04</strong> — Empilement</td>
          <td>La géométrie, la densité, la compression.</td>
          <td>π/(2√3) = 0,9069 (2D) · π/(3√2) = 0,74048 (3D)</td>
        </tr>
      </tbody>
    </table>
    <p class="rv">
      Ensemble, ils couvrent quatre gestes distincts : <em>compter des formes</em>
      (E01), <em>faire converger une moyenne statistique</em> (E02), <em>intégrer une
      trajectoire très sensible</em> (E03), et <em>optimiser une géométrie sous
      contrainte</em> (E04). Un moteur qui réussit les quatre n'est pas prouvé
      universel ; un moteur qui en rate un est pris en défaut sur un mécanisme
      précis, nommé, et reproductible.
    </p>

    <h2 id="e2" class="anchor rv">Le protocole — critères figés avant</h2>
    <p class="rv">
      Rien de cette page n'a été décidé après coup. Conformément à R5, les critères de
      verdict ont été écrits, figés et hashés <strong>avant l'exécution</strong>. Le
      verdict tombe des chiffres ; il ne s'ajuste pas à l'envie qu'on a du résultat.
    </p>
    <p class="rv">
      Quatre étalons, chacun découpé en points de contrôle numérotés — seize au total.
      Chaque point reçoit un verdict binaire, et ce verdict suit une règle fixée
      d'avance. Un point qui ne passe pas n'est ni retiré ni reformulé : il devient un
      rouge.
    </p>
    <div class="note rv">
      <p>
        <strong>La règle qui compte.</strong> Un rouge n'est pas un détail qu'on
        repousse à plus tard. Soit il révèle un défaut du moteur — et il faut corriger
        le moteur. Soit il révèle une hypothèse fausse de l'expérimentateur — et c'est
        le protocole qu'il faut corriger, pas la mesure. Dans les deux cas, le rouge
        reste publié.
      </p>
    </div>
    <p class="rv">
      Une correction apportée en cours de route n'efface rien : elle s'inscrit au
      journal des déviations, avec son sceau. C'est ce qui permet de dire « 11/16,
      puis 14/16 après corrections déclarées » sans que la phrase soit une excuse.
    </p>

    <h2 id="e3" class="anchor rv">Les quatre étalons</h2>

    <h3 class="rv">E01 — Percolation</h3>
    <p class="rv">
      On occupe aléatoirement une fraction p des sites d'un réseau carré, et on
      demande à partir de quelle densité un amas traverse tout le réseau. La réponse
      est connue avec une grande précision : p_c = 0,592746. L'étalon teste aussi la
      géométrie de l'amas critique, dont la dimension fractale exacte vaut
      91/48 ≈ 1,8958. C'est le test de topologie : si le moteur ne sait pas compter
      des trous, E01 le montre.
    </p>

    <h3 class="rv">E02 — Ising 2D</h3>
    <p class="rv">
      Un modèle de spins sur une grille, qui s'alignent à basse température et se
      désordonnent à haute température. La température critique vaut
      T_c = 2/ln(1+√2) ≈ 2,2692, et les exposants critiques sont connus exactement :
      β = 1/8 et γ = 7/4. C'est le test de la thermodynamique statistique — un moteur
      peut produire une belle courbe d'aimantation et rater complètement les exposants
      au voisinage de la transition.
    </p>

    <h3 class="rv">E03 — Trois corps</h3>
    <p class="rv">
      Le problème à trois corps est le prototype du système chaotique : deux
      trajectoires partant de conditions initiales presque identiques divergent
      exponentiellement, à un taux donné par l'exposant de Lyapunov. On dispose d'une
      solution exacte et remarquable, l'orbite en huit de Chenciner-Montgomery, de
      période T = 6,32591398 — trois masses qui se poursuivent sur une même courbe en
      forme de 8. C'est le test de l'intégrateur : une méthode trop grossière ne tient
      pas la période, et pire, elle invente du chaos là où il n'y en a pas.
    </p>

    <h3 class="rv">E04 — Empilement</h3>
    <p class="rv">
      Quelle est la densité maximale qu'on peut atteindre en empilant des sphères
      identiques ? En 2D, la réponse exacte est π/(2√3) = 0,9069 ; en 3D, elle vaut
      π/(3√2) = 0,74048. C'est le test de la géométrie sous contrainte : le moteur
      doit trouver tout seul l'arrangement optimal, sans qu'on le lui indique.
    </p>

    <h2 id="e4" class="anchor rv">Les résultats</h2>
    <p class="rv">
      Sur seize points de contrôle, <strong>onze passent</strong> au premier run. Après
      corrections déclarées, <strong>quatorze passent</strong>. Les deux qui restent
      sont des rouges assumés, détaillés plus bas.
    </p>
    <div class="tags rv">
      <span class="tag c">14/16 après corrections déclarées</span>
      <span class="tag f">2 rouges assumés</span>
    </div>

    <p class="rv">
      Ce que le moteur a produit, point par point :
    </p>
    <table class="rv">
      <thead><tr><th>Grandeur mesurée</th><th>Valeur obtenue</th><th>Référence</th></tr></thead>
      <tbody>
        <tr><td>Seuil de percolation p_c (E01)</td><td>à 0,0006</td><td>0,592746</td></tr>
        <tr><td>Dimension fractale d_f (E01)</td><td>1,8934 ± 0,0192</td><td>91/48 ≈ 1,8958</td></tr>
        <tr><td>Température critique T_c (E02)</td><td>2,2613</td><td>≈ 2,2692</td></tr>
        <tr><td>Rapport critique γ/ν (E02)</td><td>1,7540</td><td>γ = 7/4 = 1,75</td></tr>
        <tr><td>Erreur relative d'énergie ΔE/E (E02)</td><td>1,21e−15</td><td>—</td></tr>
        <tr><td>Densité FCC (E04)</td><td>4,44e−16</td><td>—</td></tr>
        <tr><td>Exposant de Lyapunov, Burrau (E03)</td><td>λ = 0,55402, stable à 0,78 %</td><td>—</td></tr>
      </tbody>
    </table>

    <p class="rv">
      Trois de ces lignes méritent qu'on s'y arrête.
    </p>
    <p class="rv">
      <strong>ΔE/E = 1,21e−15 et FCC 4,44e−16</strong> sont des écarts au niveau de la
      précision machine, c'est-à-dire que le calcul est exact à l'arrondi près. Quand
      un résultat tombe à 10⁻¹⁶, ce n'est plus une mesure : c'est une vérification
      algébrique déguisée en simulation.
    </p>
    <p class="rv">
      <strong>p_c à 0,0006</strong> et <strong>d_f à 1,8934 ± 0,0192</strong> ne sont
      pas de cet ordre : la percolation se mesure par échantillonnage statistique, donc
      avec une barre d'erreur. La valeur exacte 1,8958 tombe à l'intérieur de
      l'intervalle — c'est ce qu'on demande, et rien de plus.
    </p>
    <p class="rv">
      <strong>γ/ν = 1,7540 contre 1,75</strong> est le genre d'accord qui vaut d'être
      regardé de près : c'est un exposant critique, obtenu par ajustement au voisinage
      de la transition, et il tombe à 0,2 % de la valeur théorique.
    </p>

    <h3 class="rv">Le cas de l'intégrateur RK4</h3>
    <p class="rv">
      L'étalon E03 a produit un résultat qui n'était pas prévu, et qui est instructive
      justement parce qu'il est absurde. Avec un <strong>RK4 à pas fixe</strong>,
      l'exposant de Lyapunov du système de Burrau ressort à
      <strong>λ = +44 124</strong>. Ce n'est pas un chaos violent : c'est du bruit
      numérique. L'intégrateur, à pas fixe, traverse les encounters rapprochés du
      problème à trois corps en sautant des étapes, et accumule une divergence qui
      n'a rien à voir avec la dynamique réelle.
    </p>
    <div class="note warn rv">
      <p>
        <strong>RK4 à pas fixe : FALSIFIÉ.</strong> Le résultat λ = +44 124 est
        disqualifié comme mesure de chaos. Ce n'est pas le système qui diverge, c'est
        l'intégrateur qui fabrique la divergence. Avec un pas adaptatif, le même
        système donne λ = 0,55402, stable à 0,78 %.
      </p>
    </div>
    <p class="rv">
      C'est exactement le motif de R8 : l'instrument fabriquait son propre signal, et
      ce signal était spectaculaire. Un chiffre plus grand ne veut pas dire un résultat
      meilleur.
    </p>

    <h2 id="e5" class="anchor rv">Les deux rouges assumés</h2>
    <p class="rv">
      Deux points sur seize ne passent pas. Aucun des deux n'est présenté comme un
      succès déguisé, et aucun des deux n'a été retiré du tableau.
    </p>

    <div class="note warn rv">
      <p>
        <strong>E01-P2 — hypothèse invalide.</strong> L'hypothèse testée était
        qu'il existe un <em>pic de densité de trous</em> à p_c : autrement dit, que le
        nombre de trous dans l'amas passe par un maximum au seuil de percolation. La
        mesure dit non. La fonction h(p) est <strong>monotone</strong> : il n'y a pas
        de pic. Ce n'est donc pas le moteur qui a échoué, c'est l'hypothèse qui était
        fausse. Le point reste rouge.
      </p>
    </div>

    <div class="note warn rv">
      <p>
        <strong>E04-P4 — le compresseur 3D sous-estime.</strong> Le compresseur
        atteint une densité de <strong>0,61403</strong> là où l'on attendait
        <strong>0,64 ± 0,020</strong>. L'attendu est hors de portée, et l'écart est
        plus grand que la barre d'erreur. Le diagnostic tient en deux causes :
        la <strong>taille finie</strong> du système, et un état
        <strong>partiellement cristallin</strong> plutôt qu'amorphe — les paramètres
        d'ordre ψ6 mesurent 0,827 et 0,935, ce qui est élevé pour un empilement
        désordonné. Autrement dit : ce ne sont pas des verres, et un empilement
        partiellement ordonné ne peut pas descendre aussi bas qu'un empilement
        vraiment désordonné.
      </p>
    </div>

    <h2 id="e6" class="anchor rv">Ce que les deux rouges ont appris</h2>
    <p class="rv">
      Les deux rouges ne sont pas de la même nature, et c'est précisément ce qui les
      rend utiles ensemble.
    </p>
    <ul class="rv">
      <li>
        <strong>E01-P2 est une erreur d'hypothèse.</strong> Le moteur a fait son
        travail ; c'est l'expérimentateur qui attendait une structure qui n'existe pas.
        Ce type de rouge ne se corrige pas en modifiant du code. Il se corrige en
        réécrivant la question — et en gardant la trace de la question initiale, pour
        que quelqu'un d'autre ne la repose pas.
      </li>
      <li>
        <strong>E04-P4 est une limite de méthode nommée.</strong> Le compresseur
        3D ne descend pas à 0,64 dans ces conditions, et on sait pourquoi : taille
        finie, ordre partiel. Ce n'est pas une erreur de calcul, c'est une frontière.
        Un rouge de ce genre délimite le domaine de validité du moteur, ce qui est une
        information au moins aussi exploitable qu'un point vert.
      </li>
    </ul>
    <p class="rv">
      C'est l'argument de R6 mis à l'épreuve : un tableau à 16/16 n'aurait rien appris
      sur la validité du moteur. Un tableau à 14/16, avec deux rouges dont l'un est un
      défaut d'hypothèse et l'autre une limite de méthode documentée, situe le moteur
      sur une carte. C'est plus utile, et c'est plus honnête.
    </p>

    <h2 id="e7" class="anchor rv">Les témoins</h2>
    <p class="rv">
      Chaque étalon est accompagné d'un <strong>témoin sans perturbation</strong>,
      dont le plancher de réponse doit être quasi nul. Le témoin est la mise en œuvre
      concrète de R8 : il transforme la question « et si c'était l'instrument ? » en
      une mesure chiffrée, au lieu d'une inquiétude de principe.
    </p>
    <p class="rv">
      Les écarts au niveau de la précision machine — ΔE/E = 1,21e−15, densité FCC
      4,44e−16 — jouent ce rôle pour E02 et E04. Un témoin qui ne devrait rien
      produire et qui produit 10⁻¹⁶ confirme que la chaîne numérique n'injecte pas de
      signal parasite à l'échelle où les résultats sont lus.
    </p>
    <p class="rv">
      Le cas de l'intégrateur RK4 montre l'inverse, et c'est le contre-exemple le plus
      net du lot : le même système, mesuré par un instrument mal réglé, produit un
      exposant de chaos entièrement fabriqué. Sans témoin, ce chiffre serait passé pour
      un résultat.
    </p>

    <h2 id="e8" class="anchor rv">Le README</h2>
    <p class="rv">
      Le dépôt RATISS-ETALONS est livré au format du laboratoire, avec bannière vortex,
      figures étiquetées selon R7 et sceau <strong>23/23</strong>. Le format compte :
      un résultat scientifique n'est utilisable que si l'on peut, sans te parler,
      comprendre ce qui a été mesuré, avec quoi, et selon quels critères.
    </p>
    <div class="note rv">
      <p>
        Tu clones, tu lances la commande, tu obtiens les mêmes chiffres. Si tu obtiens
        autre chose, c'est un résultat en soi — et il a sa place dans le journal des
        déviations.
      </p>
    </div>
    <p class="rv">
      Les deux rouges sont dans le tableau final, à leur place, sans note de bas de
      page qui les excuserait. C'est le point de la page.
    </p>

    <div class="pager rv">
      <a href="#/glossaire"><span>Voir aussi</span><b>← Glossaire</b></a>
      <a href="#/blog" style="text-align:right"><span>Suivent</span><b>Les notes de terrain →</b></a>
    </div>
  </div>
  </div>
</section>
