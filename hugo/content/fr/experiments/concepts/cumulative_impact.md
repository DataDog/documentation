---
aliases:
- /fr/product_analytics/experimentation/cumulative_impact/
- /fr/experiments/cumulative_impact
- /fr/experiments/cumulative_impact/
description: Agrégez l'effet ajusté au bruit de chaque expérience qu'une équipe a
  menée sur une métrique pour estimer le mouvement total au fil du temps.
further_reading:
- link: /experiments/reading_results
  tag: Documentation
  text: Lecture des résultats d'expérience
- link: /experiments/statistics/minimum_detectable_effect
  tag: Documentation
  text: Effets minimaux détectables
- link: /experiments/statistics/analysis_methods
  tag: Documentation
  text: Méthodes d'analyse
- link: https://www.datadoghq.com/blog/two-ways-to-measure-cumulative-impact/
  tag: Blog
  text: Deux façons de mesurer l'impact cumulé des expériences
title: Impact cumulé
---
## Présentation {#overview}

Les équipes qui mènent des expériences doivent comprendre à quel point elles ont fait bouger une métrique de manière cumulative au fil du temps. Additionner les hausses observées lors d'expériences réussies peut sembler être la manière naturelle de procéder, mais cela surestime systématiquement l'impact réel. Les estimations gonflées érodent la confiance dans l'expérimentation et rendent plus difficile l'évaluation honnête des progrès.

L'impact cumulé est une vue au niveau de la métrique qui agrège l'effet de chaque expérience qu'une équipe a menée sur une seule métrique et produit une estimation ajustée au bruit du mouvement total. Il est disponible sur la page de présentation de la métrique aux côtés de la tendance de la métrique existante, et il comprend deux nouveaux composants : un graphique d'impact cumulé et une distribution des effets.

## Utilisation de l'impact cumulé {#using-cumulative-impact}

### Pourquoi l'agrégation naïve surestime l'impact {#why-naive-aggregation-overstates-impact}

Le défi de l'agrégation des résultats d'expériences est connu sous le nom de *biais du gagnant* : la tendance systématique des résultats statistiquement significatifs à surestimer l'effet réel. Comme les expériences présentant des hausses mesurées importantes sont plus susceptibles d'atteindre la significativité et d'être déployées, une liste d'expériences « gagnantes » est biaisée en faveur de mesures qui se sont révélées supérieures à la réalité. Additionner ces mesures aggrave le biais.

Historiquement, la correction du biais du gagnant exigeait que les équipes de données construisent des modèles statistiques personnalisés ou s'appuient sur des règles empiriques. Datadog Experiments effectue cette correction automatiquement en ajustant un modèle statistique sur toutes les expériences de votre équipe concernant une métrique et en produisant une estimation corrigée de l'impact cumulé.

### Lecture du graphique d'impact cumulé {#reading-the-cumulative-impact-chart}

Le graphique d'impact cumulé montre comment la métrique a évolué sur la période sélectionnée. Réglez le sélecteur **Période** sur la fenêtre que vous souhaitez évaluer, par exemple le trimestre écoulé, et le graphique se remplit avec les expériences qui se sont terminées au cours de cette fenêtre.

Le graphique affiche deux chiffres en évidence :

1. Le nombre d'expériences menées au cours de la fenêtre, et combien d'entre elles ont déployé une variante de traitement.
2. L'impact cumulé sur la métrique, exprimé sous forme d'amélioration relative ou absolue.

{{< img src="/product_analytics/experiment/cumulative_impact/cumulative_impact_overview.png" alt="La page de présentation de la métrique affichant la section Impact cumulé avec un sélecteur de période réglé sur les 6 derniers mois, une valeur d'impact cumulé de +5,58 % étiquetée avec le nombre d'expériences gagnantes, et le graphique d'impact cumulé tracé au fil du temps." style="width:90%;" >}}

Cliquez sur **Inclure X expériences gagnantes** pour voir les expériences utilisées dans le calcul de l'impact cumulé. La sélection d'une expérience dans la liste ouvre sa page de résultats, où vous pouvez voir la hausse mesurée originale, la décision de déploiement et l'estimation corrigée utilisée dans le calcul cumulé. Cela permet de retracer toute contribution individuelle jusqu'à sa source, ce qui est utile pour communiquer l'impact à la direction ou pour auditer les déclarations au niveau du programme.

### Lecture de la distribution des effets {#reading-the-effect-distribution}

À droite du graphique de l'impact cumulé se trouve la distribution des effets. Il s'agit d'une visualisation des effets réels de l'équipe sur la métrique. Le centre de la distribution décrit la taille de l'effet que l'équipe produit sur une expérience moyenne, et l'étendue décrit la variabilité de ces effets.

{{< img src="/product_analytics/experiment/cumulative_impact/effect_distribution.png" alt="Le panneau de distribution des effets d'expérience montrant une taille d'effet moyenne de +0,55 % sur 10 expériences terminées, un écart-type de 0,15 % et une courbe en cloche centrée au-dessus de zéro entre -1 % et +1 %." style="width:80%;" >}}

La distribution est ajustée au bruit : les résultats bruités n'élargissent pas la distribution au-delà de ce que les données permettent.

La distribution des effets aide à prendre deux décisions :

- **Où investir.** Une équipe dont la distribution se situe nettement au-dessus de zéro sur une métrique donnée produit des hausses fiables et pourrait vouloir continuer à investir dans ce domaine. Une équipe dont la distribution chevauche zéro pourrait vouloir réorienter ses efforts ailleurs.
- **Comment dimensionner les futures expériences.** Si une équipe dimensionne régulièrement ses expériences pour un [effet minimal détectable][1] de 5 %, mais que la distribution suggère que ses effets réels se situent généralement dans un intervalle de ±3 %, les expériences manquent probablement de puissance statistique. Envisagez d'augmenter la taille des échantillons, d'élargir le ciblage ou de vous concentrer sur des opportunités ayant un impact attendu plus élevé.

### Quelles expériences sont incluses {#which-experiments-are-included}

L'impact cumulé prend en compte chaque expérience dans la période sélectionnée qui cible la métrique et a produit des résultats. Quelques règles déterminent la manière dont chaque expérience contribue :

- **Ajustement du modèle :** chaque expérience dont les diagnostics ne sont pas en échec contribue à l'ajustement du modèle statistique.
- **Agrégation :** seules les expériences ayant déployé une variante autre que le groupe témoin contribuent au total cumulé. Les expériences ayant déployé la variante témoin, ou qui se sont terminées sans décision de déploiement, ne sont pas additionnées.
- **Diagnostics :** les expériences dont les diagnostics échouent sont entièrement exclues de l'ajustement. Les expériences sans diagnostics, ou avec des diagnostics valides ou avec avertissement, sont incluses.

### Vues locales et globales {#local-and-global-views}

Pour certaines métriques, vous pouvez basculer entre une vue *locale* et une vue *globale* de l'impact cumulé.

La vue locale répond à la question « de combien cette métrique a-t-elle évolué pour les utilisateurs exposés à chaque expérience ? » C'est la vue appropriée pour comparer l'ampleur des effets entre les équipes ou les surfaces, car elle n'est pas diluée par la taille de l'exposition.

La vue globale répond à la question « de combien cette métrique a-t-elle évolué sur l'ensemble de la base d'utilisateurs ? » Elle pondère l'estimation corrigée de chaque expérience par la part d'utilisateurs exposés à cette expérience, produisant une estimation au niveau du programme du mouvement total. La vue globale est la bonne pour communiquer l'impact à l'échelle de l'organisation, car une forte progression sur une petite audience est correctement pondérée par rapport à une progression plus faible sur une audience beaucoup plus large.

Les deux vues utilisent les mêmes estimations corrigées et ne diffèrent que par la manière dont ces estimations sont combinées.

### Choisir une période {#choosing-a-time-frame}

Le sélecteur de période contrôle quelles expériences sont incluses. Une fenêtre plus longue inclut davantage d'expériences, ce qui renforce l'ajustement du modèle et produit une distribution des effets plus lisse, mais cela peut aussi mélanger différentes stratégies d'équipe si l'équipe a changé d'orientation.

Un point de départ raisonnable est la période sur laquelle la stratégie d'expérimentation de votre équipe a été globalement cohérente, souvent un trimestre ou un semestre. Comparer les fenêtres peut également être instructif : une équipe dont la distribution des effets s'est déplacée vers le haut au fil du temps produit de plus grands effets réels, et pas seulement davantage de décisions de déploiement.

## Détails statistiques {#statistical-details}

Cette section décrit le modèle qui produit les estimations corrigées et la distribution des effets. Elle est destinée aux data scientists et aux statisticiens qui souhaitent comprendre, auditer ou reproduire les résultats.

### Le modèle hiérarchique {#the-hierarchical-model}

Datadog utilise un modèle normal-normal hiérarchique, une formulation standard pour la méta-analyse bayésienne empirique. Soit θ_i l'effet réel latent de l'expérience i sur la métrique cible, et soit y_i le lift estimé à partir de cette expérience, avec une erreur type connue σ_i. Le modèle est :

```
y_i | θ_i  ~ Normal(θ_i, σ_i²)     (sampling distribution)
θ_i        ~ Normal(μ, τ²)         (population distribution of true effects)
```

La première ligne indique que chaque expérience fournit une mesure bruitée de son propre effet réel, avec un niveau de bruit déterminé par l'erreur type de l'expérience. La deuxième ligne indique que les effets réels de l'équipe sont eux-mêmes tirés d'une distribution partagée avec une moyenne μ et une variance τ². Cette distribution partagée est ce que l'interface utilisateur affiche comme la *distribution des effets*.

En marginalisant sur le θ_i latent, la vraisemblance marginale pour les augmentations observées est :

```
y_i ~ Normal(μ, τ² + σ_i²)
```

C'est ce que l'optimiseur ajuste.

### A priori {#priors}

Datadog utilise des priors faiblement informatifs sur les paramètres de population. Sur les données remises à l'échelle (voir ci-dessous), les valeurs par défaut sont :

```
μ ~ Normal(0, 1)
τ ~ HalfCauchy(0, 0.25)
```

Le prior normal sur μ est suffisamment large pour ne pas être informatif sur la plupart des échelles de métriques après remise à l'échelle. Le prior demi-Cauchy sur τ est un choix courant pour les paramètres d'échelle hiérarchiques. Il possède un support sur les réels non négatifs et concentre la masse près de zéro, ce qui signifie que le modèle favorise l'homogénéité lorsque les données sont ambiguës. Sa queue lourde permet une grande hétérogénéité lorsque les données le justifient.

### Remise à l'échelle pour la stabilité numérique {#rescaling-for-numerical-stability}

Avant l'ajustement, les lifts observés et les erreurs types sont remis à l'échelle pour avoir une moyenne nulle et une variance unitaire. Soit ȳ la moyenne des lifts et s_y leur écart-type. L'optimiseur travaille sur les quantités remises à l'échelle :

```
ỹ_i = (y_i − ȳ) / s_y
σ̃_i = σ_i      / s_y
```

Cela signifie qu'un seul ensemble d'hyperparamètres a priori fonctionne pour des métriques dont les échelles naturelles diffèrent de plusieurs ordres de grandeur. Après l'ajustement, les estimations de μ et τ sont transformées pour revenir à l'échelle d'origine :

```
μ̂ = μ̃ · s_y + ȳ
τ̂ = τ̃ · s_y
```

### Ajustement du modèle {#fitting-the-model}

Les paramètres du modèle (μ, τ) sont estimés par estimation du maximum a posteriori (MAP). Pour maintenir τ positif pendant l'optimisation, le modèle est reparamétré sous la forme τ = exp(η) et l'optimiseur effectue une recherche sur (μ, η).

L'objectif est le négatif du log-postérieur de (μ, η) compte tenu des lifts observés :

```
−log p(μ, η | data) = −[Σ_i log Normal(y_i | μ, τ² + σ_i²)]
                     − log Normal(μ | μ_prior_mean, μ_prior_sd²)
                     − log HalfCauchy(τ | τ_prior_scale)
                     − η                          (Jacobian of τ = exp(η))
```

L'optimisation utilise Nelder-Mead, une méthode de simplexe sans gradient. Il s'agit d'un choix robuste pour un problème bidimensionnel qui évite les problèmes liés aux gradients par différences finies près de τ = 0.

### Estimations corrigées (moyennes a posteriori) {#corrected-estimates-posterior-means}

Une fois (μ̂, τ̂) ajustés, chaque expérience reçoit une estimation corrigée égale à la moyenne a posteriori de son effet réel selon la loi a priori ajustée. La mise à jour conjuguée normale-normale est une moyenne pondérée par la précision de l'augmentation observée et de la moyenne de la population :

```
θ̂_i = (y_i / σ_i² + μ̂ / τ̂²) / (1 / σ_i² + 1 / τ̂²)
```

De manière équivalente, θ̂_i = (1 − w_i) · μ̂ + w_i · y_i où w_i = τ̂² / (τ̂² + σ_i²) est le poids accordé à l'augmentation observée. Les expériences avec des intervalles étroits (σ_i faible) conservent la majeure partie de leur augmentation observée ; les expériences avec des intervalles larges sont ramenées vers la moyenne de la population μ̂. Il s'agit de l'étape de réduction qui corrige le biais du gagnant.

### Agrégation vers l'impact cumulé {#aggregating-to-cumulative-impact}

Les estimations rétrécies sont combinées selon que la métrique est naturellement additive ou multiplicative.

Pour les métriques d'augmentation relative, l'impact cumulé est calculé de manière multiplicative :

```
Cumulative relative impact = ∏ (1 + θ̂_i) − 1
```

Pour les métriques de différence absolue, l'impact cumulé est la somme des estimations rétrécies :

```
Cumulative absolute impact = Σ θ̂_i
```

Seules les expériences ayant déployé une variante autre que le témoin sont incluses dans la somme ou le produit. Le graphique dans l'interface utilisateur trace une version courante de cette somme ou de ce produit, classée par date de fin d'expérience, afin que vous puissiez voir comment l'impact s'est accumulé au fil du temps.

### Pondération par la couverture (vue globale) {#coverage-weighting-global-view}

La vue globale utilise les mêmes estimations réduites mais pondère chacune par la *couverture* de l'expérience, la part de la base d'utilisateurs éligibles qui y a été exposée. Soit c_i la couverture de l'expérience i :

```
Global relative impact = ∏ (1 + c_i · θ̂_i) − 1
Global absolute impact = Σ c_i · θ̂_i
```

La pondération par la couverture est ce qui transforme une estimation par utilisateur exposé en une estimation au niveau du programme. Les expériences sans valeur de couverture enregistrée sont omises de la vue globale mais contribuent toujours à la vue locale et à l'ajustement du modèle.

### Éligibilité au diagnostic {#diagnostic-eligibility}

Avant que le modèle ne soit ajusté, chaque expérience est vérifiée par rapport à ses diagnostics. Les diagnostics signalent des problèmes de qualité de l'expérience, tels qu'un déséquilibre important dans l'assignation, des assignations mixtes entre les variantes ou des données de métriques manquantes. Une expérience est *éligible* si son statut de diagnostic consolidé est autre que FAIL. Les expériences sans aucune ligne de diagnostic sont traitées comme éligibles.

Les expériences en échec sont entièrement exclues de l'ajustement du modèle et de l'agrégation cumulative. Elles ne sont pas ramenées vers la moyenne de la population puis additionnées ; elles sont supprimées. Cela empêche les mesures non fiables de contaminer le total cumulé ou la distribution des effets.

### Taille d'échantillon minimale {#minimum-sample-size}

Le modèle nécessite au moins cinq expériences éligibles. Avec moins d'expériences, l'estimation MAP de τ est instable et le rétrécissement qui en résulte n'est pas fiable. Lorsque ce seuil n'est pas atteint, aucune valeur d'impact cumulé ni aucune distribution d'effet n'est affichée.

## Dépannage {#troubleshooting}

### Graphiques non affichés {#charts-not-showing}

L'impact cumulé nécessite au moins cinq expériences avec des diagnostics non défaillants pour ajuster le modèle. Si moins de cinq expériences éligibles sont disponibles, Datadog n'affiche pas de valeur d'impact cumulé. Prolongez la plage temporelle ou effectuez davantage d'expériences sur la métrique pour résoudre ce problème.

## Pour aller plus loin {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/experiments/statistics/minimum_detectable_effect/