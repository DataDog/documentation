---
aliases:
- /fr/graphing/functions/rollup/
description: Contrôler l'agrégation temporelle et les intervalles de points de données
  en utilisant des fonctions de rollup personnalisées et des rollups mobiles pour
  les métriques.
further_reading:
- link: /dashboards/guide/rollup-cardinality-visualizations
  tag: Documentation
  text: Comprendre la fonction de rollup et la cardinalité dans les visualisations
title: Rollup
---

Chaque requête de métrique est intrinsèquement agrégée. Cependant, ajouter la fonction `.rollup()` à la fin d'une requête vous permet d'effectuer une [agrégation temporelle][1] personnalisée qui remplace les valeurs par défaut. Cette fonction vous permet de définir :

* L'`<interval>` de cumul : l'intervalle de temps en fonction duquel vos données sont agrégées ([si cet intervalle est plus étendu que l'intervalle de cumul imposé par la requête](#intervalle-de-cumul-impose-ou-personnalise)).
* L'`<aggregator>` de cumul : la façon dont vos points de données sont agrégés dans un intervalle de cumul donné.

Pour appliquer un rollup, accédez au bouton **Add function** (Σ) de l'éditeur de graphiques :

{{< img src="dashboards/functions/rollup/rollup_option_1.mp4" alt="Sélectionner l'option Rollup average dans le bouton Add function" video=true >}}

**Remarque** : les métriques de type Distribution ne prennent pas en charge le paramètre `agrégateur`. Ce type de métrique est agrégé dans le temps et dans l'espace. Consultez la documentation sur le [cumul pour les distributions avec centiles][2] pour en savoir plus.

La fonction accepte deux paramètres, `<AGGREGATOR>` et éventuellement `<INTERVAL>` : `.rollup(<AGGREGATOR>,<INTERVAL>)` ou `.rollup(<AGGREGATOR>)`.

| Paramètre  | Rôle                                                                                                     |
|------------|-----------------------------------------------------------------------------------------------------------------|
| `<AGGREGATOR>` | Ce paramètre peut être défini sur `avg`, `sum`, `min`, `max` ou `count`. Il détermine la façon dont les points de données sont agrégés au sein d'un intervalle donné. [Valeur par défaut imposée](#intervalle-de-cumul-impose-ou-personnalise) : `avg`. |
| `<INTERVAL>`   | Intervalle (en secondes) entre deux points de données affichés. Paramètre facultatif.                                            |

Ces paramètres peuvent être utilisés séparément ou ensemble, par exemple `.rollup(sum,120)`. Le graphique à barres suivant affiche l'évolution de la charge CPU sur une semaine pour un host **sans** utiliser la fonction `.rollup()` :

{{< img src="dashboards/functions/rollup/smooth_1.png" alt="smooth_1" style="width:60%;" >}}

Le graphique à barres suivant affiche la même métrique, mais un cumul d'une journée est cette fois-ci appliqué avec `.rollup(avg,86400)` :

{{< img src="dashboards/functions/rollup/smooth_2.png" alt="smooth_2" style="width:60%;" >}}

## Cumul mobile


| Fonction        | Rôle                                    | Exemple |
|------------------|------------------------------------------------|------------------|
| `moving_rollup` | Effectuer un cumul pour combiner les points recueillis sur les X dernières secondes. | `moving_rollup(<METRIC_NAME>, <INTERVAL> , <AGGREGATOR>)` |


Lorsque vous appliquez la fonction `moving_rollup()` à une requête, vous pouvez combiner plusieurs points provenant de l'intervalle spécifié le plus récent, c'est-à-dire les X dernières secondes. Comme avec `.rollup()`, la valeur de `<AGGREGATOR>` peut être `sum`/`min`/`max`/`count`/`avg` et définit la façon dont les points de données sont agrégés dans un intervalle de temps donné.

## Intervalle de cumul : imposé ou personnalisé

Lors de la création de graphiques, Datadog définit une limite sur le nombre de points par série temporelle. Pour conserver la clarté visuelle, une série peut avoir jusqu'à 1 500 points. Pour respecter cette limite, Datadog regroupe les points de données automatiquement, en utilisant par défaut la méthode `avg`, affichant efficacement la moyenne de tous les points de données dans un intervalle de temps pour une métrique donnée. L'intervalle de temps de rollup par défaut varie en fonction de la façon dont les données sont visualisées. Consultez le tableau suivant pour référencer ces intervalles de temps par défaut :

| Intervalle de temps           | Intervalle de cumul, graphique linéaire | Intervalle de cumul, graphique à barres | Intervalle de cumul, API |
|---------------------|-----------------------------|----------------------------|----------------------|
| The past hour       | 20 s                         | 1 min                         | 20 s                  |
| The past four hours    | 1 min                          | 2 min                         | 1 min                   |
| The past day        | 5 min                          | 20 min                        | 5 min                   |
| The past two days     | 10 min                         | 30 min                        | 10 min                  |
| The past week       | 1 h                         | 2 h                        | 1 h                  |
| The past month      | 4 h                         | 12 h                       | 4 h                  |

Une fonction `.rollup()` personnalisée peut être utilisée pour imposer le type d'agrégation temporelle appliqué (`avg`, `min`, `max`, `count` ou `sum`) et éventuellement l'intervalle de temps à regrouper. En utilisant cette fonction, vous pouvez définir l'intervalle de temps de rollup sur une valeur différente des valeurs par défaut, jusqu'à une limite de 1 500 points. Cela prend en charge jusqu'à un point par minute sur une journée.

**Remarque** : lorsqu'une requête concerne des métriques de type `COUNT` ou `RATE`, le modificateur `.as_count()` est automatiquement ajouté à l'interface. La méthode de cumul est alors définie sur `sum` et l'interpolation est désactivée. Le modificateur `.as_count()` est affiché explicitement à la fin de la requête :

  {{< img src="dashboards/functions/rollup/calendar_aligned_queries.png" alt="calendar_aligned_queries" style="width:100%;" >}}

Pour en savoir plus sur l'utilisation des modificateurs `.as_count()` et `.as_rate()`, consultez l'article de blog [Visualiser des métriques StatsD][3] (en anglais) ou lisez la documentation sur les [modificateurs intégrés à l'application][4] pour mieux comprendre les effets de ces fonctions.

## Rollup avec des requêtes alignées sur le calendrier

{{< img src="dashboards/functions/rollup/calendar_aligned_queries.png" alt="calendar_aligned_queries" style="width:100%;" >}}

Vous pouvez personnaliser la façon dont vos données de métriques sont regroupées dans le temps lors de l'utilisation de la fonction `.rollup()` avec des requêtes alignées sur le calendrier. Cette fonctionnalité vous offre la flexibilité de définir :

* Requêtes mensuelles alignées sur le calendrier avec date de début et fuseaux horaires ajustables. Par exemple, vous pouvez comparer vos erreurs client mensuelles pour février et décembre de l'année dernière.
* Rollups hebdomadaires avec date de début et fuseaux horaires ajustables. Par exemple, voir combien de transactions hebdomadaires sont ouvertes (si votre semaine commence le lundi).
* Rollups quotidiens avec heure de début et fuseaux horaires ajustables. Par exemple, voir combien d'événements d'intérêt se sont produits le jour actuel (si votre journée commence à minuit, heure du Pacifique).

## Cumuls dans les monitors

L'utilisation d'un cumul dans une requête de [monitor][5] est généralement à éviter en raison du risque de décalage entre l'intervalle de cumul et la fenêtre d'évaluation du monitor. Le début et la fin des intervalles de cumul sont alignés sur l'heure UNIX, et non sur le début et la fin des requêtes du monitor : les monitors sont par conséquent susceptibles d'évaluer un intervalle de cumul incomplet contenant uniquement un faible volume de données, et donc de se déclencher par erreur. Pour éviter ce problème, il est nécessaire de retarder l'évaluation du monitor pendant une durée correspondant à l'intervalle de cumul (au minimum).

Si vos monitors s'évaluent de manière inattendue dans un statut "No Data", envisagez de revoir vos paramètres pour les rollups et les fenêtres d'évaluation. Par exemple, si un monitor a un rollup de 4 minutes et une fenêtre d'évaluation de 20 minutes, il produit un point de données toutes les 4 minutes, conduisant à un maximum de 5 points de données dans la fenêtre. Si l'option "Require Full Window" est activée, l'évaluation peut donner "No Data" car la fenêtre n'est pas entièrement remplie.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/functions/#add-a-function
[2]: /fr/metrics/faq/rollup-for-distributions-with-percentiles/
[3]: https://www.datadoghq.com/blog/visualize-statsd-metrics-counts-graphing
[4]: /fr/metrics/custom_metrics/type_modifiers/
[5]: /fr/monitors/types/metric/