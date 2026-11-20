---
aliases:
- /fr/graphing/functions/rollup/
description: Contrôlez l'agrégation temporelle et les intervalles des points de données
  à l'aide de fonctions de rollup personnalisées et de rollups mobiles pour les métriques.
further_reading:
- link: /dashboards/guide/rollup-cardinality-visualizations
  tag: Documentation
  text: Comprendre la fonction de rollup et la cardinalité dans les visualisations
title: Cumul
---
Chaque requête de métrique est intrinsèquement agrégée. Cependant, l'ajout de la fonction `.rollup()` à la fin d'une requête vous permet d'effectuer une [agrégation temporelle][1] personnalisée qui remplace les valeurs par défaut. Cette fonction vous permet de définir :

* Le rollup `<interval>` : l'intervalle de temps sur lequel vos données sont agrégées ([ s'il est supérieur à l'intervalle de rollup imposé par la requête](#rollup-interval-enforced-vs-custom)).
* Le rollup `<aggregator>` : la manière dont vos points de données sont agrégés au sein d'un intervalle de temps donné.

Pour appliquer un cumul, accédez au bouton {{< ui >}}Add function{{< /ui >}} (Σ) de l'éditeur de graphiques : 

{{< img src="dashboards/functions/rollup/rollup_option_1.mp4" alt="Sélectionnez l'option Rollup average à partir du bouton Add function" video=true >}}

**Remarque** : Le type de métrique Distribution ne possède pas de paramètre de rollup `aggregator`. Ce type de métrique est agrégé à la fois dans le temps et dans l'espace. Consultez la documentation sur le [rollup pour les distributions avec centiles][2] pour en savoir plus.

La fonction prend deux paramètres, `<AGGREGATOR>` et éventuellement `<INTERVAL>` : `.rollup(<AGGREGATOR>,<INTERVAL>)` ou `.rollup(<AGGREGATOR>)`.

| Paramètre  | Description                                                                                                     |
|------------|-----------------------------------------------------------------------------------------------------------------|
| `<AGGREGATOR>` | Peut être `avg`, `sum`, `min`, `max` ou `count`, et définit la manière dont les points de données sont agrégés au sein d'un intervalle de temps donné. [Valeur par défaut imposée](#rollup-interval-enforced-vs-custom) : `avg`. |
| `<INTERVAL>`   | Temps (en secondes) de l'intervalle entre deux points de données affichés. Optionnel.                                            |

Vous pouvez les utiliser individuellement ou ensemble, par exemple `.rollup(sum,120)`. Le graphique à barres suivant affiche une semaine d'utilisation du processeur pour un host **sans** utiliser la fonction `.rollup()` :

{{< img src="dashboards/functions/rollup/smooth_1.png" alt="smooth_1" style="width:60%;" >}}

Le graphique à barres suivant affiche la même métrique, représentée à l'aide d'un rollup d'une journée avec `.rollup(avg,86400)` :

{{< img src="dashboards/functions/rollup/smooth_2.png" alt="smooth_2" style="width:60%;" >}}

## Rollup mobile {#moving-rollup}


| Fonction        | Description                                    | Exemple |
|------------------|------------------------------------------------|------------------|
| `moving_rollup` | Rollup pour combiner les points des X dernières secondes. | `moving_rollup(<METRIC_NAME>, <INTERVAL> , <AGGREGATOR>)` |


L'application de la fonction `moving_rollup()` à une requête vous permet de combiner des points de données de la plage temporelle spécifiée la plus récente, c'est-à-dire les X dernières secondes. Comme pour `.rollup()`, `<AGGREGATOR>` peut être `sum`/`min`/`max`/`count`/`avg` et définit la manière dont les points de données sont agrégés au sein de l'intervalle de temps donné.

## Intervalle de rollup : imposé ou personnalisé {#rollup-interval-enforced-vs-custom}

Lors de la création de graphiques, Datadog définit une limite sur le nombre de points par série temporelle. Pour conserver une clarté visuelle, une série peut comporter jusqu'à 1 500 points. Pour respecter cette limite, Datadog effectue automatiquement un rollup des points de données, en utilisant par défaut la méthode `avg`, ce qui affiche effectivement la moyenne de tous les points de données au sein d'un intervalle de temps pour une métrique donnée. L'intervalle de temps de rollup par défaut varie en fonction de la manière dont les données sont visualisées. Consultez le graphique suivant pour vous référer à ces intervalles de temps par défaut :

| Période temporelle          | Intervalle de rollup, graphique linéaire | Intervalle de rollup, graphique à barres | Intervalle de rollup, API |
|---------------------|-----------------------------|----------------------------|----------------------|
| La minute passée     | 1 s                          | 1 s                         | 1 s                   |
| Les 5 dernières minutes | 2 s | 5 s | 2 s |
| Les 15 dernières minutes | 5 s | 10 s | 5 s |
| Les 30 dernières minutes | 10 s | 30 s | 10 s |
| La dernière heure | 20 s | 1 min | 20 s |
| Les quatre dernières heures | 1 min | 2 min | 1 min |
| Le dernier jour | 5 min | 20 min | 5 min |
| Les deux derniers jours | 10 min | 30 min | 10 min |
| La semaine passée | 1 h | 2 h | 1 h |
| Le mois passé | 4 h | 12 h | 4 h |
| Les 3 derniers mois | 12 h | 1 j | 12 h |
| Les 6 derniers mois | 1 j | 1 j | 1 j |
| La dernière année | 1 j | 1 sem | 1 j |

Une fonction `.rollup()` personnalisée peut être utilisée pour spécifier le type d'agrégation temporelle appliqué (`avg`, `min`, `max`, `count` ou `sum`) et éventuellement l'intervalle de temps pour le rollup. En utilisant cette fonction, vous pouvez définir l'intervalle de temps de cumul sur une valeur différente de celle par défaut, jusqu'à une limite de 1 500 points. Cela prend en charge jusqu'à un point par minute sur une journée.

**Note** :
- Le widget [Query Value][8] cible 150 points au lieu des 1 500 points utilisés par les widgets Line Graph et Bar Graph. Pour la même fenêtre temporelle, cela entraîne un intervalle de cumul effectif plus large pour les widgets Query Value.
- Les requêtes pour les métriques de type `COUNT` et `RATE` ont le modificateur `.as_count()` ajouté automatiquement dans l'interface utilisateur, ce qui définit la méthode de cumul utilisée sur `sum` et désactive l'interpolation. Ce `.as_count()` est explicitement visible à la fin de la requête :

  {{< img src="dashboards/functions/rollup/as_count_dropdown.png" alt="as_count" style="width:100%;">}}

Pour plus de détails sur l'utilisation de `.as_count()` et `.as_rate()`, consultez l'article de blog [Visualize StatsD metrics][3], ou apprenez-en davantage sur les effets de ces fonctions grâce à la documentation sur les [modificateurs dans l'application][4].

## Rollup avec requêtes alignées sur le calendrier {#rollup-with-calendar-aligned-queries}

{{< img src="dashboards/functions/rollup/calendar_aligned_queries.png" alt="calendar_aligned_queries" style="width:100%;" >}}

Vous pouvez personnaliser la manière dont vos données de métriques sont regroupées dans le temps lors de l'utilisation de la fonction `.rollup()` avec des requêtes alignées sur le calendrier. Cette fonctionnalité vous offre la flexibilité de définir :

* Requêtes mensuelles alignées sur le calendrier avec date de début et fuseaux horaires réglables. Par exemple, vous pouvez comparer les erreurs client mensuelles de février et décembre de l'année dernière.
* Rollups hebdomadaires avec date de début et fuseaux horaires réglables. Par exemple, voyez combien de transactions hebdomadaires sont ouvertes (si votre semaine commence le lundi).
* Rollups quotidiens avec heure de début et fuseaux horaires réglables. Par exemple, voyez combien d'événements d'intérêt se sont produits le jour actuel (si votre journée commence à minuit, heure du Pacifique).

La syntaxe de rollup aligné sur le calendrier étend `.rollup()` avec une unité de calendrier et, en option, un jour d'alignement et un fuseau horaire :

`.rollup(<AGGREGATOR>, <CALENDAR_UNIT>, <ALIGNMENT>, '<TIMEZONE>')`

| Paramètre        | Description                                                                                                          |
|------------------|----------------------------------------------------------------------------------------------------------------------|
| `<AGGREGATOR>`   | Peut être `avg`, `sum`, `min`, `max` ou `count`.                                                                       |
| `<CALENDAR_UNIT>`| `daily`, `weekly` ou `monthly`.                                                                                     |
| `<ALIGNMENT>`    | Pour `weekly` : le jour de début sous forme de nom de jour en minuscules (`monday`, `tuesday`, ..., `sunday`). Par défaut `sunday` si omis. Pour `daily` : une heure de début telle que `12am`. Pour `monthly` : une date de début. |
| `<TIMEZONE>`     | Optionnel. Une chaîne [fuseau horaire IANA][7] telle que `America/New_York` ou `Europe/Paris`. Par défaut, UTC est utilisé si ce paramètre est omis.    |

**Exemples** :

Rollup hebdomadaire commençant le lundi (UTC) :

```
sum:requests.count{*}.as_count().rollup(sum, weekly, monday)
```

Rollup hebdomadaire commençant le lundi à l'heure de l'Est :

```
sum:requests.count{*}.as_count().rollup(sum, weekly, monday, 'America/New_York')
```

Rollup quotidien commençant à minuit, heure du Pacifique :

```
sum:requests.count{*}.as_count().rollup(sum, daily, 12am, 'America/Los_Angeles')
```

## Rollups dans les monitors {#rollups-in-monitors}

Les rollups doivent généralement être évités dans les requêtes de monitor, en raison de la possibilité de désalignement entre l'intervalle de rollup et la fenêtre d'évaluation du monitor. Le début et la fin des intervalles de rollup sont alignés sur l'heure UNIX, et non sur le début et la fin des requêtes de monitor. Par conséquent, un monitor peut évaluer (et déclencher) un intervalle de rollup incomplet ne contenant qu'un petit échantillon de données. Pour éviter ce problème, retardez l'évaluation de votre monitor d'au moins la durée de l'intervalle de rollup configuré.

Si vos requêtes de monitor affichent de manière inattendue {{< ui >}}No Data{{< /ui >}}, envisagez de revoir vos paramètres de rollups et de fenêtres d'évaluation. Pour plus d'informations, consultez [Dépannage de l'absence de données dans les monitors][6].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/functions/#add-a-function
[2]: /fr/metrics/faq/rollup-for-distributions-with-percentiles/
[3]: https://www.datadoghq.com/blog/visualize-statsd-metrics-counts-graphing
[4]: /fr/metrics/custom_metrics/type_modifiers/
[5]: /fr/monitors/types/metric/
[6]: /fr/monitors/guide/troubleshooting-no-data/
[7]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
[8]: /fr/dashboards/widgets/query_value/