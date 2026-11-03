---
aliases:
- /fr/experiments/cuped
- /fr/experiments/cuped/
description: Découvrez comment CUPED utilise les données pré-expérimentales pour réduire
  la variance des métriques et tirer des conclusions plus rapidement.
further_reading:
- link: /experiments/statistics/analysis_methods
  tag: Documentation
  text: Méthodes d'analyse
- link: /experiments/reading_results
  tag: Documentation
  text: Lecture des résultats d'expérience
- link: /experiments/plan_and_launch_experiments
  tag: Documentation
  text: Planifier et lancer des expériences
- link: https://www.datadoghq.com/blog/cuped-adjustments-visualization/
  tag: Blog
  text: Visualisez comment CUPED ajuste les résultats d'expérience avec Datadog
- link: https://www.datadoghq.com/blog/how-we-built-datadog-experiments/
  tag: Blog
  text: Comment nous avons conçu Datadog Experiments
title: 'CUPED : technique de réduction de la variance'
---
## Présentation {#overview}

La précision des résultats d'expérience, y compris la largeur de l'intervalle de confiance, dépend de la variance des métriques. Un moyen d'améliorer la précision consiste à collecter davantage de données, mais cela augmente le temps nécessaire pour prendre une décision.

La méthode Controlled-experiment Using Pre-Experiment Data (CUPED), présentée à l'origine dans l'article de Deng et al. intitulé [Improving the Sensitivity of Online Controlled Experiments by Utilizing Pre-Experiment Data][1], réduit directement la variance des métriques en utilisant des données capturées avant l'exposition à l'expérience.

L'analyse d'expérience standard compare les données de métriques provenant de sujets exposés à un traitement avec les données de métriques provenant de sujets dans un groupe témoin. Toutes les données utilisées dans cette comparaison sont collectées pendant l'expérience. Les équipes disposent souvent d'informations sur les sujets avant le début de l'expérience, en particulier des données historiques sur les métriques. CUPED utilise ces données pré-expérimentales pour contrôler une partie de la variance des métriques qui provient de l'assignation aléatoire des variantes aux sujets. Par exemple, une variante peut avoir plus de sujets actifs qu'une autre par pur hasard. CUPED réduit l'effet de cette variation aléatoire en contrôlant les différents niveaux d'activité entre les variantes.

CUPED est activé par défaut. Lorsque CUPED est activé, les valeurs de lift et de métrique affichées peuvent différer des estimations non ajustées calculées à partir des données brutes. Les données brutes restent inchangées ; CUPED modifie uniquement l'estimateur utilisé pour l'analyse. Cette différence est attendue et constitue le mécanisme qui permet de réduire la variance. Vous pouvez activer ou désactiver CUPED dans le [plan d'analyse statistique][2] de l'expérience.

## Comment fonctionne CUPED {#how-cuped-works}

L'implémentation de Datadog est basée sur l'article original sur CUPED et sur le cadre d'augmentation des métriques décrit dans l'article de Deng et al. intitulé [From Augmentation to Decomposition: A New Look at CUPED in 2023][3].

CUPED prend l'estimation de lift brute (non-CUPED) pour une métrique et *l'augmente* avec une série d'ajustements. Étant donné une estimation de lift absolu brut `Δ` (la différence traitement-contrôle non-CUPED pour la métrique), le lift ajusté par CUPED est:

```
CUPED lift = Δ + adjustment_1 + adjustment_2 + ... + adjustment_n
```

Pour éviter d'introduire un biais, les termes d'ajustement doivent être choisis avec soin. Plus précisément, ils doivent être *d'espérance nulle*. Si l'expérience était menée à de nombreuses reprises, chacune avec un échantillon différent d'utilisateurs dans les variantes témoin et de traitement, la moyenne des ajustements sur ces échantillons serait égale à zéro. Comme les ajustements sont d'espérance nulle, le lift CUPED vise la même cible que le lift non-CUPED. Avec des coefficients choisis avec soin, il y parvient avec une variance d'échantillonnage moindre.

Chaque ajustement a la forme suivante :

```
adjustment_i = -theta_i * (avg. covariate in treatment - avg. covariate in control)
```

Dans cette formule, les moyennes sont les moyennes des covariables observées dans les groupes de traitement et témoin. La valeur `theta_i` est un coefficient abordé dans [Sélection des coefficients](#selecting-the-coefficients). Compte tenu de cette forme, exiger que chaque ajustement soit d'espérance nulle équivaut à exiger que chaque covariable soit égale en espérance entre les groupes témoin et de traitement.

<div class="alert alert-info">
<p><strong>Intuition pour « espérance nulle » :</strong> Une façon de comprendre l'exigence de CUPED est de comparer les ajustements aux gains observés dans des tests A/A répétés.</p>
<p>Dans un test A/A, les utilisateurs sont répartis aléatoirement entre le groupe de traitement et le groupe témoin, mais l'expérience est identique dans les deux groupes. Avec une randomisation appropriée, le gain moyen sur de nombreux tests est nul car les groupes ne sont pas systématiquement différents, mais le gain n'est pas nécessairement nul dans un test A/A individuel en raison du bruit d'échantillonnage. L'hypothèse fondamentale de CUPED est que les ajustements se comportent de la même manière que le lift dans un test A/A. De manière équivalente, les moyennes des covariables par variante se comportent de la même manière que les moyennes des métriques par variante dans un test A/A.</p>
</div>

## Covariables par défaut {#default-covariates}

Par défaut, Datadog Experiments inclut les covariables suivantes :

Agrégations pré-exposition
: Observations par sujet capturées sur une période de 30 jours avant l'exposition à l'expérience.

Valeurs des propriétés du sujet
: Propriétés du sujet basées sur l'enregistrement d'affectation initial.

Sauf en cas de problèmes de qualité des données, les deux catégories de covariables respectent les hypothèses de CUPED. Il n'y a aucune différence systématique dans l'expérience des sujets de traitement et de contrôle avant le moment de l'exposition à l'expérience, donc les agrégations pré-exposition imitent le comportement des observations de métriques dans un test A/A. De même, les valeurs de propriété des sujets capturées au moment de la première exposition ne peuvent pas être influencées par l'exposition au traitement.

Datadog effectue également des contrôles de diagnostic sur une base régulière pour détecter les violations de ces hypothèses, telles qu'un déséquilibre pré-expérience et une inadéquation du ratio d'échantillonnage dimensionnel.

### Gestion des valeurs manquantes {#handling-missing-values}

Les données manquantes sont attendues en pratique : les nouveaux utilisateurs n'ont souvent aucune observation pré-expérience, et certains sujets n'ont aucune valeur enregistrée pour une propriété. CUPED gère les deux cas sans supprimer le sujet, en suivant l'approche de la section 4.2 du [document original CUPED][1].

- **Agrégations pré-exposition manquantes :** Lorsqu'un sujet n'a aucune donnée pré-expérience pour une métrique, la valeur est définie sur zéro. Lorsque les données ne sont que partiellement manquantes, une covariable distincte servant d'*indicateur de données manquantes* est également ajoutée. Cela aide CUPED à contrôler le fait qu'une valeur était manquante plutôt que de laisser le zéro imputé fausser l'ajustement.
- **Valeurs de propriété manquantes :** Une valeur manquante pour une propriété est traitée comme sa propre valeur de catégorie plutôt que d'être supprimée, de sorte que les sujets sans valeur de propriété enregistrée sont tout de même inclus.

### Combien de covariables sont incluses {#how-many-covariates-are-included}

Les covariables sont construites à partir d'agrégations, et une agrégation n'est pas la même chose qu'une métrique. Une métrique de moyenne est une agrégation unique, mais une métrique de ratio se divise en deux agrégations : un numérateur et un dénominateur. Chaque agrégation contribue à une covariable, plus un indicateur de données manquantes lorsque les données sont partiellement manquantes. Chaque propriété de sujet contribue à une covariable par valeur, y compris une valeur pour les données manquantes.

Considérons une expérience avec deux métriques et une propriété :

- **Revenu par utilisateur** (une métrique de moyenne)
- **Taux de clic** (une métrique de ratio, clics divisés par pages vues)
- **Type d'appareil** (une propriété qui est soit `Desktop` soit `Mobile`)

Comme la métrique de ratio se divise en un numérateur et un dénominateur, ces deux métriques produisent trois agrégations pré-exposition. En supposant que chacune comporte des données partiellement manquantes, elles contribuent aux covariables suivantes :

| Source | Covariables |
| --- | --- |
| Revenu par utilisateur (moyenne) | Revenu par utilisateur pré-exposition, plus son indicateur de données manquantes |
| Taux de clic (ratio) | Clics pré-exposition et pages vues pré-exposition, plus un indicateur de données manquantes pour chacun |
| Type d'appareil (propriété) | `Desktop`, `Mobile`, et `Missing` |

Au total, cette expérience inclut 9 covariables : 6 issues des trois agrégations pré-exposition et 3 issues de la propriété de type d'appareil.

Pour maintenir la stabilité de l'ajustement, seules les valeurs les plus courantes d'une propriété sont incluses. Les 10 valeurs les plus courantes dans chaque variante sont combinées en un ensemble partagé unique de covariables qui s'applique à toutes les variantes, et les valeurs plus rares ne sont pas incluses. Une covariable qui ne présente aucune variation, comme un indicateur de données manquantes lorsqu'aucun sujet ne manque de cette valeur, est également exclue.

## Sélection des coefficients {#selecting-the-coefficients}

Une fois les covariables définies, Datadog choisit les coefficients (les valeurs `theta_i`) qui *minimisent approximativement la variance* du lift ajusté par CUPED. Cet ajustement élimine autant de bruit que possible tout en conservant une espérance nulle. Un ensemble unique de coefficients est estimé en regroupant les données de toutes les variantes, de sorte que le même ajustement s'applique à chaque variante et aux segments analysés ultérieurement, qui sont définis par les propriétés des sujets enregistrées lors de l'attribution.

Une faible pénalité L2 maintient la stabilité des coefficients lorsque les covariables sont corrélées entre elles. Cette pénalité n'introduit pas de biais dans l'estimateur d'effet, car CUPED est non biaisé pour tout ensemble fixe de coefficients d'ajustement. Ceci diffère de la régression ridge, qui applique sa pénalité L2 à un coefficient sur l'effet de traitement lui-même et peut donc biaiser l'estimateur.

Bien que les coefficients soient estimés à partir des données de l'expérience en pratique, CUPED les traite comme fixes lors du calcul des résultats. Cela suit l'approche de l'article original de CUPED, et la théorie suggère que la contribution de l'estimation des coefficients à la variance est généralement négligeable aux tailles d'échantillon requises en expérimentation numérique.

CUPED est souvent interprété comme une forme d'ajustement par régression, et les deux sont étroitement liés. Pour une métrique de moyenne, les coefficients minimisant la variance sont exactement ceux obtenus en effectuant une régression de la métrique sur les covariables par la méthode des moindres carrés ordinaires.

Cependant, CUPED est fondamentalement sans modèle. Il repose uniquement sur le fait que les différences pré-expérimentales entre les groupes randomisés sont nulles en espérance, et il ne fait aucune hypothèse sur la forme de la relation entre les covariables et la métrique. Présenter CUPED comme une augmentation plutôt que comme une régression fournit un cadre général qui s'étend naturellement aux types de métriques avancés tels que les métriques de ratio et de centile. Dans tous les cas, la forme générale est la même : commencer par une estimation de lift non-CUPED et ajouter des termes d'ajustement à espérance nulle.

## Réduction de la variance pour tous les types de métriques{#variance-reduction-for-all-metric-types}

CUPED chez Datadog ne se limite pas aux métriques basées sur la moyenne. Le même cadre réduit la variance pour les métriques de moyenne, de ratio et de centile, y compris les métriques qui ciblent la queue d'une distribution, comme le 95e centile du temps de chargement des pages. C'est un avantage par rapport aux implémentations de CUPED basées sur la régression, qui ne s'étendent pas naturellement aux métriques de centile. CUPED peut produire des intervalles plus étroits avec moins d'échantillons, y compris pour les mesures de latence et les Core Web Vitals qui sont naturellement exprimées sous forme de centiles.

## Hypothèses et interprétation {#assumptions-and-interpretation}

### Hypothèses de modélisation {#modeling-assumptions}

CUPED ne suppose pas de relations linéaires, d'homoscédasticité ou l'absence d'interactions. Son hypothèse principale est que les moyennes des covariables entre les variantes sont égales en espérance. Les autres hypothèses sont communes à l'expérimentation numérique en général, telles que l'absence de confusion grâce à une randomisation appropriée, et des échantillons suffisamment grands pour que les estimateurs soient approximativement normaux selon le théorème central limite.

### Pourquoi les estimations de lift CUPED diffèrent des estimations non-CUPED {#why-cuped-lift-estimates-differ-from-non-cuped-estimates}

CUPED ne produit pas les mêmes estimations de lift avec des intervalles de confiance plus étroits. Si les estimations CUPED et non-CUPED étaient toujours identiques, leur variance, et donc leurs intervalles de confiance, seraient également identiques. La différence entre les résultats CUPED et non-CUPED est le mécanisme exact qui entraîne la réduction de la variance de CUPED.

### Choisir entre les résultats CUPED et non-CUPED {#choosing-between-cuped-and-non-cuped-results}

Utilisez les résultats CUPED lorsque les hypothèses de CUPED sont respectées. Ils ont la même espérance que les résultats non-CUPED, mais avec une variance plus faible. De bonnes pratiques de gestion des données réduisent le risque de violation des hypothèses, et des contrôles diagnostiques peuvent détecter un déséquilibre pré-expérimental ainsi qu'une discordance dans le ratio d'échantillonnage dimensionnel.

<div class="alert alert-info">Avant le début de l'expérience, décidez si vous baserez votre décision sur le résultat CUPED ou non-CUPED. Cela évite de sélectionner le résultat qui soutient le mieux un résultat préféré.</div>

### CUPED et expériences mal randomisées {#cuped-and-improperly-randomized-experiments}

CUPED ne corrige pas le biais causé par une randomisation inappropriée. Il suppose que l'expérience est correctement randomisée, il ne peut donc pas récupérer des estimations statistiquement valides à partir d'expériences systématiquement biaisées. Des déséquilibres aléatoires de covariables surviennent toujours dans des expériences correctement randomisées, et CUPED les corrige : les estimations ajustées par CUPED sont *conditionnellement* non biaisées pour un déséquilibre de covariable observé spécifique.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.exp-platform.com/Documents/2013-02-CUPED-ImprovingSensitivityOfControlledExperiments.pdf
[2]: /fr/experiments/plan_and_launch_experiments/#choose-a-statistical-analysis-plan
[3]: https://arxiv.org/abs/2312.02935