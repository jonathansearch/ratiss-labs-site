<section class="sec-t wx">
  <div class="doc-g">
    <div></div>
    <div>
      <p class="bc"><a href="#/">Accueil</a> <span>·</span> Navier-Stokes</p>
      <h1 class="big rv">Fluides turbulents<em>chercher l'explosion, et trouver autre chose.</em></h1>
      <p class="lede rv">
        Les équations de Navier-Stokes décrivent l'eau, l'air, les flammes et le sang.
        Personne n'a jamais prouvé qu'elles ne peuvent pas exploser : qu'une vitesse ne
        devienne pas infinie en un temps fini. C'est l'un des sept problèmes du millénaire,
        et la réponse reste ouverte. RATISS Labs a écrit un solveur de fluides de zéro
        pour aller chercher cette explosion par le calcul.
      </p>
    </div>
  </div>
</section>

<section class="sec wx" style="padding-top:20px">
  <div class="doc-g">
    <nav class="toc" data-toc>
      <h4>Sur cette page</h4>
      <a href="#x1">Le problème, sans équations</a>
      <a href="#x2">La méthode</a>
      <a href="#x3">Les résultats</a>
      <a href="#x4">L'ablation R8</a>
      <a href="#x5">Le verdict</a>
      <a href="#x6">Ce que ça ne prouve pas</a>
      <a href="#x7">Étiquettes et rejeu</a>
    </nav>

    <div class="prose">
      <h2 id="x1" class="anchor rv">Le problème, sans équations</h2>
      <p class="rv">
        Imagine un verre d'eau qu'on remue. L'eau tourbillonne, se casse en mille
        tourbillons plus petits, puis en mille autres encore. Dans les équations de
        Navier-Stokes — celles que tout le monde utilise pour calculer un écoulement —
        rien n'interdit à cette cascade de s'emballer jusqu'à l'infini en un temps fini.
        On appelle ça une <strong>explosion</strong>, ou blow-up. Si elle existait, la
        vitesse deviendrait infinie en un point précis, et les équations cesseraient
        d'avoir un sens.
      </p>
      <p class="rv">
        Le problème du millénaire ne demande pas de la trouver par simulation : il
        demande une preuve. Soit une preuve que l'explosion est impossible, soit un
        exemple explicite où elle arrive. Une simulation ne peut fournir ni l'une ni
        l'autre — au mieux elle suggère une piste. Mais elle peut tester une affirmation
        précise, et c'est ce que ce chantier a fait.
      </p>
      <p class="rv">
        Le point de départ est un papier publié par OpenAI sur Navier-Stokes. La question
        posée ici tient en une phrase : est-ce que je reproduis, avec mon propre code, ce
        que ce papier annonce ?
      </p>
      <div class="note rv">
        <p>
          <strong>Le piège, avant même de commencer.</strong> Un solveur qui fabrique son
          propre signal n'a rien à dire sur le fluide. Il faut donc savoir, à la fin, si
          la divergence observée vient des équations ou de l'outil qu'on a branché dessus.
        </p>
      </div>

      <h2 id="x2" class="anchor rv">La méthode</h2>
      <h3 class="rv">Un solveur écrit de zéro</h3>
      <p class="rv">
        Le solveur est un SPH 3D — <em>smoothed particle hydrodynamics</em> — écrit
        intégralement en Python, sans bibliothèque de dynamique des fluides. Le principe :
        le fluide n'est pas découpé en une grille de cases, il est porté par des
        particules qui se déplacent. Chaque particule sent ses voisines dans un rayon
        donné, et les échanges de masse, de quantité de mouvement et d'énergie se
        calculent par sommes pondérées.
      </p>
      <p class="rv">
        Le choix du sans-grille est délibéré. Une grille impose une direction à la
        solution : les tourbillons s'alignent sur ses axes. Avec des particules libres,
        aucune direction n'est privilégiée, et une éventuelle concentration locale peut
        se former où elle veut.
      </p>
      <h3 class="rv">Comment on cherche une explosion</h3>
      <p class="rv">
        On ne cherche pas au hasard. On balaye systématiquement les paramètres — nombre de
        particules, forçage, viscosité — et on surveille une quantité précise,
        <code>Om_max</code>, qui mesure l'intensité de la déformation locale du fluide.
        Si la solution reste régulière, cette quantité reste bornée. Si elle explose,
        <code>Om_max</code> croît sans limite quand on resserre le pas de temps.
      </p>
      <h3 class="rv">La règle R5 appliquée</h3>
      <p class="rv">
        Le critère de verdict est figé et publié <strong>avant</strong> le premier run,
        avec son empreinte. Concrètement : quel niveau de <code>Om_max</code> compte comme
        une divergence, et surtout quelle tolérance on s'autorise entre deux résolutions.
        Sans ce scellement, on peut toujours regarder les chiffres puis choisir un seuil
        qui les arrange.
      </p>
      <h3 class="rv">Les campagnes</h3>
      <p class="rv">
        Le chantier est découpé en quatre campagnes publiées dans le dossier
        <code>campagnes/</code>, chacune avec son manifeste, ses paramètres et ses
        sorties brutes :
      </p>
      <ul class="rv">
        <li><strong>commissaire-1</strong> — première mise en évidence du comportement divergent.</li>
        <li><strong>etreintes-v2</strong> — resserrement du pas de temps et des tolérances.</li>
        <li><strong>commissaire-3d</strong> — passage au volume, conditions aux limites repensées.</li>
        <li><strong>dipoles-v3</strong> — configuration en dipôles, la plus agressive du lot.</li>
      </ul>

      <h2 id="x3" class="anchor rv">Les résultats</h2>
      <p class="rv">
        Ce qui est effectivement mesuré, sans embellissement :
      </p>
      <table class="rv">
        <thead><tr><th>Grandeur mesurée</th><th>Valeur</th><th>Lecture</th></tr></thead>
        <tbody>
          <tr><td>Divergence reproduite</td><td>bit à bit</td><td>deux exécutions donnent exactement les mêmes octets</td></tr>
          <tr><td><code>Om_max</code></td><td>5654,1668</td><td>maximum atteint dans la campagne la plus agressive</td></tr>
          <tr><td>Écart point par point</td><td>0,0000</td><td>sur 11 points de contrôle</td></tr>
          <tr><td>Campagnes publiées</td><td>4</td><td>commissaire-1, etreintes-v2, commissaire-3d, dipoles-v3</td></tr>
          <tr><td>Tests verts</td><td>4</td><td>conservation, pas de temps, bords, rejeu</td></tr>
        </tbody>
      </table>
      <h3 class="rv">Ce que « bit à bit » veut dire</h3>
      <p class="rv">
        Deux exécutions du même script, sur la même machine, produisent des résultats
        identiques au bit près. C'est la règle R4 : pas de « environ », pas de capture
        d'écran. Un écart de <strong>0,0000</strong> sur 11 points signifie que la
        trajectoire numérique est stable et reproductible — ce qui est une condition
        nécessaire pour qu'un résultat veuille dire quelque chose.
      </p>
      <pre class="rv"><code><span class="c"># rejouer le chantier tel quel</span>
<span class="k">cd</span> campagnes/dipoles-v3
bash rejouer.sh
<span class="c"># attendu : Om_max = 5654.1668</span>
<span class="c">#           écart point par point = 0.0000 sur 11 points</span></code></pre>
      <div class="note rv">
        <p>
          <strong>Reproductible ne veut pas dire vrai.</strong> Un résultat qui se répète
          identiquement peut se répéter identiquement faux. La suite de cette page est
          précisément consacrée à cette question.
        </p>
      </div>

      <h2 id="x4" class="anchor rv">L'ablation R8</h2>
      <p class="rv">
        La règle R8 dit : on ne mesure que ce qui <strong>déborde du script</strong>. Un
        instrument fabrique toujours une part de son propre signal, et cette part doit
        être mesurée, pas supposée nulle.
      </p>
      <p class="rv">
        L'ablation consiste à retirer une brique du modèle, une par une, et à regarder si
        le phénomène observé survit. Ici, la brique testée est le <strong>forçage</strong> :
        le terme ajouté aux équations pour injecter de l'énergie en continu et entretenir
        la turbulence. C'est le cœur de l'expérience.
      </p>
      <h3 class="rv">Ce que l'ablation montre</h3>
      <p class="rv">
        Le terme qui diverge est <strong>le forçage</strong>, pas la physique du fluide.
        Autrement dit : ce que <code>Om_max = 5654,1668</code> mesure, c'est l'emballement
        du dispositif qui injecte l'énergie, pas un comportement intrinsèque de
        Navier-Stokes. Le solveur fait exactement ce qu'on lui demande — et ce qu'on lui
        demande contient déjà la réponse.
      </p>
      <table class="rv">
        <thead><tr><th>Élément testé</th><th>Comportement</th><th>Conclusion</th></tr></thead>
        <tbody>
          <tr><td>Physique du fluide</td><td>reste bornée</td><td>aucune explosion propre</td></tr>
          <tr><td>Terme de forçage</td><td>diverge</td><td>l'emballement vient d'ici</td></tr>
        </tbody>
      </table>
      <div class="note warn rv">
        <p>
          <strong>Un instrument qui fabrique son propre signal n'a rien à dire sur le
          phénomène.</strong> C'est cette constatation, faite sur ce chantier précis, qui a
          donné naissance à la règle R8 du laboratoire. La règle est née d'un échec, pas
          d'une intuition.
        </p>
      </div>

      <h2 id="x5" class="anchor rv">Le verdict</h2>
      <p class="rv">
        <strong>NON TRANCHÉ</strong> pour la question physique. Le solveur est rejouable,
        stable et reproductible au bit près ; il ne tranche pas la question de la
        régularité des équations de Navier-Stokes. Ce sont deux affirmations différentes,
        et la première ne soutient pas la seconde.
      </p>
      <table class="rv">
        <thead><tr><th>Question</th><th>Réponse</th></tr></thead>
        <tbody>
          <tr><td>Le solveur est-il rejouable en une commande ?</td><td>oui</td></tr>
          <tr><td>Le résultat est-il stable bit à bit ?</td><td>oui</td></tr>
          <tr><td>La divergence vient-elle du forçage ?</td><td>oui</td></tr>
          <tr><td>Navier-Stokes explose-t-il ?</td><td>non tranché</td></tr>
          <tr><td>Navier-Stokes est-il régulier ?</td><td>non tranché</td></tr>
        </tbody>
      </table>
      <p class="rv">
        Ce verdict n'est pas un demi-échec. Une campagne dont la conclusion honnête est
        « la question reste ouverte, mais voici pourquoi mon instrument ne peut pas y
        répondre » vaut mieux qu'une campagne qui prétend avoir vu quelque chose. Le
        laboratoire publie le second tableau aussi volontiers que le premier.
      </p>

      <h2 id="x6" class="anchor rv">Ce que ça ne prouve pas</h2>
      <ul class="rv">
        <li>
          <strong>Aucune preuve mathématique.</strong> Une simulation n'est pas une
          démonstration. Le problème du millénaire reste entier, et aucune ligne de ce
          chantier ne prétend le contraire.
        </li>
        <li>
          <strong>Aucune conclusion sur la régularité globale.</strong> Que ce solveur-ci,
          sur ces configurations-là, ne produise pas d'explosion propre ne dit rien sur
          l'ensemble des solutions possibles.
        </li>
        <li>
          <strong>La question du forçage est un résultat négatif, pas une découverte.</strong>
          Il documente une erreur d'instrumentation, il ne décrit pas un fluide réel.
        </li>
        <li>
          <strong>Pas de validation par les pairs.</strong> Ce chantier est publié tel
          quel, avec ses scripts, ses manifestes et son journal de déviations. Il n'a été
          relu par personne d'autre que son auteur.
        </li>
        <li>
          <strong>Pas de prétention à la nouveauté.</strong> Le SPH 3D est une méthode
          connue depuis des décennies. Ce qui est propre à ce chantier, c'est le protocole
          qui l'entoure et le verdict qui en sort.
        </li>
      </ul>

      <h2 id="x7" class="anchor rv">Étiquettes et rejeu</h2>
      <p class="rv">
        Conformément à la règle R7, chaque chiffre de cette page porte son origine. Sur ce
        chantier, il n'y a <strong>aucune mesure sur machine quantique</strong> : tout est
        calcul, et rien n'est mélangé avec de la lecture de papier.
      </p>
      <div class="tags rv">
        <span class="tag c">🧮 calcul — solveur SPH 3D, 4 campagnes</span>
        <span class="tag f">non tranché — régularité de Navier-Stokes</span>
      </div>
      <p class="rv">
        Le scepticisme est l'attitude attendue ici. Si tu doutes de <code>Om_max</code>,
        clone le dépôt et relance <code>rejouer.sh</code> : soit tu obtiens 5654,1668,
        soit tu ne l'obtiens pas, et dans le second cas le laboratoire veut le savoir.
        C'est le sens de la règle R4.
      </p>
      <div class="note rv">
        <p>
          <strong>Ce que ce chantier laisse derrière lui.</strong> Un solveur rejouable,
          quatre campagnes documentées, quatre tests verts, et une règle de laboratoire —
          R8 — écrite parce que ce chantier a montré, sur un cas concret, comment un
          instrument se raconte lui-même.
        </p>
      </div>

      <div class="pager rv">
        <a href="#/recherche"><span>Retour</span><b>← Les quatre chantiers</b></a>
        <a href="#/chantier-fusion" style="text-align:right"><span>Suivant</span><b>Fusion &amp; gravitation →</b></a>
      </div>
    </div>
  </div>
</section>
