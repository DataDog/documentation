---
aliases:
- /fr/graphing/functions/rollup/
title: Rollup
---

`.rollup()`
La fonction `.rollup()` (cumul) est utilisée pour agréger les données de vos métriques automatiquement dans toutes les requêtes de métriques. Cependant, l'ajout d'une fonction `.rollup()` à la fin d'une requête vous permet d'effectuer une [agrégation temporelle][1] personnalisée qui remplace la valeur par défaut. Cette fonction vous permet de définir les éléments suivants :

* L'`<intervalle>` de cumul : l'intervalle de temps en fonction duquel vos données sont agrégées ([si cet intervalle est plus étendu que l'intervalle de cumul imposé par la requête](#intervalle-de-cumul-impose-ou-personnalise)).
* L'`<agrégateur>` de cumul : la façon dont vos points de données sont agrégés dans un intervalle de cumul donné.

**Remarque** : les métriques de type Distribution ne prennent pas en charge le paramètre `agrégateur`. Ce type de métrique est agrégé dans le temps et dans l'espace. Consultez la documentation sur le [cumul pour les distributions avec centiles][2] pour en savoir plus.

La fonction accepte deux paramètres, `<AGRÉGATEUR>` et éventuellement `<INTERVALLE>` : `.rollup(<AGRÉGATEUR>,<INTERVALLE>)` ou `.rollup(<AGRÉGATEUR>)`.

| Paramètre  | Description                                                                                                     |
|------------|-----------------------------------------------------------------------------------------------------------------|
| `<AGRÉGATEUR>` | Ce paramètre peut être défini sur `avg`, `sum`, `min`, `max` ou `count`. Il détermine la façon dont les points de données sont agrégés au sein d'un intervalle donné. [Valeur par défaut imposée](#intervalle-de-cumul-impose-ou-personnalise) : `avg`. |
| `<INTERVALLE>`   | Intervalle (en secondes) entre deux points de données affichés. Paramètre facultatif.                                            |

Ces paramètres peuvent être utilisés séparément ou ensemble, par exemple `.rollup(sum,120)`. Le graphique à barres suivant affiche l'évolution de la charge CPU sur une semaine pour un host **sans** utiliser la fonction `.rollup()` :

{{< img src="dashboards/functions/rollup/smooth_1.png" alt="smooth_1" style="width:60%;" >}}

Le graphique à barres suivant affiche la même métrique, mais un cumul d'une journée est cette fois-ci appliqué avec `.rollup(avg,86400)` :

{{< img src="dashboards/functions/rollup/smooth_2.png" alt="smooth_2" style="width:60%;" >}}

## Cumul mobile


| Fonction        | Description                                    | Exemple |
|------------------|------------------------------------------------|------------------|
| `moving_rollup` | Effectuer un cumul pour combiner les points recueillis sur les X dernières secondes. | `moving_rollup(<NOM_MÉTRIQUE>, <INTERVALLLE>, <AGRÉGATEUR>)` |


Lorsque vous appliquez la fonction `moving_rollup()` à une requête, vous pouvez combiner plusieurs points provenant de l'intervalle spécifié le plus récent, c'est-à-dire les X dernières secondes. Comme avec `.rollup()`, la valeur de `<AGRÉGATEUR>` peut être `sum`/`min`/`max`/`count`/`avg` et définit la façon dont les points de données sont agrégés dans un intervalle de temps donné.

## Intervalle de cumul : imposé ou personnalisé

Le nombre de points de données pouvant être affichés sur un graphique est limité par Datadog. Afin de respecter cette limite, Datadog effectue automatiquement un cumul des points de données via la méthode `avg` de façon à afficher la moyenne de tous les points de données dans un intervalle de temps pour une métrique donnée. Cet intervalle de temps par défaut varie en fonction de la façon dont les données sont visualisées. Consultez le tableau suivant pour connaître ces intervalles de temps par défaut :

| Intervalle de temps           | Intervalle de cumul, graphique linéaire | Intervalle de cumul, graphique à barres | Intervalle de cumul, API |
|---------------------|-----------------------------|----------------------------|----------------------|
| The past hour       | 20 s                         | 1 min                         | 20 s                  |
| The past four hours    | 1 min                          | 2 min                         | 1 min                   |
| The past day        | 5 min                          | 20 min                        | 5 min                   |
| The past two days     | 10 min                         | 30 min                        | 10 min                  |
| The past week       | 1 h                         | 2 h                        | 1 h                  |
| The past month      | 2 h                         | 12 h                       | 4 h                  |

Une fonction `.rollup()` personnalisée peut être utilisée pour obliger Datadog à appliquer un autre type d'agrégation temporelle (`avg`, `min`, `max`, `count` ou `sum`) et un autre intervalle de temps entre deux points de données. Toutefois, si la fonction `.rollup()` appliquée utilise un intervalle de temps inférieur à la limite de Datadog, la limite de Datadog est utilisée (la méthode de cumul spécifiée est toutefois appliquée). Par exemple, si vous demandez un intervalle de `.rollup(20)` pour un mois entier, les données sont renvoyées avec un cumul supérieur à 20 secondes pour éviter que le nombre de points de données soit supérieur à la limite définie.

**Remarque** : lorsqu'une requête concerne des métriques de type `COUNT` ou `RATE`, le modificateur `.as_count()` est automatiquement ajouté à l'interface. La méthode de cumul est alors définie sur `sum` et l'interpolation est désactivée. Le modificateur `.as_count()` est affiché explicitement à la fin de la requête :

  {{< img src="dashboards/functions/rollup/as_count.png" alt="as_count" style="width:50%;">}}

Pour en savoir plus sur l'utilisation des modificateurs `.as_count()` et `.as_rate()`, consultez l'article de blog [Visualiser des métriques StatsD][3] (en anglais) ou lisez la documentation sur les [modificateurs intégrés à l'application][4] pour mieux comprendre les effets de ces fonctions.

## Cumuls dans les monitors

L'utilisation d'un cumul dans une requête de [monitor][5] est généralement à éviter en raison du risque de décalage entre l'intervalle de cumul et la fenêtre d'évaluation du monitor. Le début et la fin des intervalles de cumul sont alignés sur l'heure UNIX, et non sur le début et la fin des requêtes du monitor : les monitors sont par conséquent susceptibles d'évaluer un intervalle de cumul incomplet contenant uniquement un faible volume de données, et donc de se déclencher par erreur. Pour éviter ce problème, il est nécessaire de retarder l'évaluation du monitor pendant une durée correspondant à l'intervalle de cumul (au minimum).

## Autres fonctions

{{< whatsnext desc="Consultez les autres fonctions disponibles :" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}Algorithme : mettez en place un système de détection d'anomalies ou de singularités.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}Opérations arithmétiques : effectuez des opérations arithmétiques sur votre métrique.  {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}Nombre de valeurs : comptez les valeurs différentes de zéro  ou différentes de null de votre métrique. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}Exclusion : excluez certaines valeurs de votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}Interpolation : saisissez ou définissez des valeurs par défaut pour votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}Rang : sélectionnez seulement un sous-ensemble de métriques. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}Taux : calculez une dérivée personnalisée sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}Régression : appliquez une fonction d'apprentissage automatique sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}Lissage : lissez les variations de votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}Décalage temporel : modifiez la période d'un point de données de votre métrique. {{< /nextlink >}}
{{< /whatsnext >}}

[1]: /fr/dashboards/functions/#proceed-to-time-aggregation
[2]: /fr/metrics/faq/rollup-for-distributions-with-percentiles/
[3]: https://www.datadoghq.com/blog/visualize-statsd-metrics-counts-graphing
[4]: /fr/metrics/custom_metrics/type_modifiers/
[5]: /fr/monitors/create/types/metric/