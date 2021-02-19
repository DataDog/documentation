---
title: Cumul
kind: documentation
aliases:
  - /fr/graphing/functions/rollup/
---
`.rollup()`

*Conseillé pour les utilisateurs experts uniquement.*

Ajoutez la fonction `.rollup()` à la fin d'une requête pour effectuer une [agrégation temporelle][1] personnalisée. Cette fonction vous permet ainsi de définir :

* L'intervalle de temps pour un graphique donné ([si cet intervalle est plus étendu que l'intervalle de cumul imposé par la requête](#intervalle-de-cumul-impose-ou-personnalise)).
* La façon dont les points de données sont agrégés dans un intervalle de temps donné.

La fonction accepte deux paramètres, `<MÉTHODE>` et `<INTERVALLE>` (facultatif) : `.rollup(<MÉTHODE>,<INTERVALLE>)` ou `.rollup(<MÉTHODE>)`.

| Paramètre  | Description                                                                                                     |
|------------|-----------------------------------------------------------------------------------------------------------------|
| `<MÉTHODE>` | Ce paramètre détermine la façon dont les points de données sont agrégés dans un intervalle de temps donné. Il peut être défini sur `sum`/`min`/`max`/`count`/`avg`. |
| `<INTERVALLE>`   | Intervalle (en secondes) entre deux points de données affichés. Paramètre facultatif.                                            |

Ces paramètres peuvent être utilisés séparément ou ensemble, par exemple `.rollup(sum,120)`. Le graphique à barres suivant affiche l'évolution de la charge CPU sur une semaine pour un host **sans** utiliser la fonction `.rollup()` :

{{< img src="dashboards/functions/rollup/smooth_1.png" alt="smooth_1"  style="width:60%;" >}}

Le graphique à barres suivant affiche la même métrique, mais un cumul d'une journée est cette fois-ci appliqué avec `.rollup(avg,86400)` :

{{< img src="dashboards/functions/rollup/smooth_2.png" alt="smooth_2"  style="width:60%;" >}}

## Cumul mobile


| Fonction        | Description                                    | Exemple |
|------------------|------------------------------------------------|------------------|
| `moving_rollup` | Effectuer un cumul pour combiner les points recueillis sur les X dernières secondes. | `moving_rollup(<NOM_MÉTRIQUE>, <INTERVALLE> , <MÉTHODE>)` |


Lorsque vous appliquez la fonction `moving_rollup()` à une requête, vous pouvez combiner plusieurs points provenant de l'intervalle spécifié le plus récent, c'est-à-dire les X dernières secondes. Comme avec `.rollup()`, la valeur de `<MÉTHODE>` peut être `sum`/`min`/`max`/`count`/`avg` et définit la façon dont les points de données sont agrégés dans un intervalle de temps donné.

## Intervalle de cumul : imposé ou personnalisé

Datadog impose une limite de 350 points de données par graphique créé. Afin de respecter cette limite, Datadog effectue automatiquement un cumul des points de données via la méthode `avg` de façon à afficher la moyenne de l'ensemble des points de données dans un intervalle de temps pour une métrique donnée.

Une fonction `.rollup()` personnalisée peut être utilisée pour obliger Datadog à appliquer un autre type d'agrégation temporelle (`avg`, `min`, `max`, `count` ou `sum`) et un autre intervalle de temps entre deux points de données. Toutefois, si la fonction `.rollup()` appliquée utilise un intervalle de temps inférieur à la limite de Datadog, la limite de Datadog est utilisée (la méthode de cumul spécifiée est toutefois appliquée). Par exemple, si vous demandez un intervalle de `.rollup(20)` pour un mois entier, les données sont renvoyées avec un cumul supérieur à 20 secondes pour éviter que le nombre de points de données soit supérieur à 350.

**Remarque** : lorsqu'une requête concerne des métriques de type `COUNT` ou `RATE`, le modificateur `.as_count()` est automatiquement ajouté à l'interface. La méthode de cumul est alors définie sur `sum` et l'interpolation est désactivée. Le modificateur `.as_count()` est affiché explicitement à la fin de la requête :

  {{< img src="dashboards/functions/rollup/as_count.png" alt="as_count"  style="width:50%;">}}

Pour en savoir plus sur l'utilisation des modificateurs `.as_count()` et `.as_rate()`, consultez cet [article de blog][2] (en anglais) ou lisez la [documentation sur les modificateurs intégrés à l'application][3] pour mieux comprendre les effets de ces fonctions.

## Cumuls dans les monitors

L'utilisation d'un cumul dans une requête de [monitor][4] est généralement à éviter en raison du risque de décalage entre l'intervalle de cumul et la fenêtre d'évaluation du monitor. Le début et la fin des intervalles de cumul sont alignés sur l'heure UNIX, et non sur le début et la fin des requêtes du monitor : les monitors sont par conséquent susceptibles d'évaluer un intervalle de cumul incomplet contenant uniquement un faible volume de données, et donc de se déclencher par erreur. Pour éviter ce problème, il est nécessaire de retarder l'évaluation du monitor pendant une durée correspondant à l'intervalle de cumul (au minimum).

## Autres fonctions

{{< whatsnext desc="Consultez les autres fonctions disponibles :" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}Algorithme : mettez en place un système de détection d'anomalies ou de singularités.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}Opérations arithmétiques : effectuez des opérations arithmétiques sur votre métrique.  {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}Total : comptez les valeurs différentes de zéro  ou différentes de null de votre métrique. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}Exclusion : excluez certaines valeurs de votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}Interpolation : saisissez ou définissez des valeurs par défaut pour votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}Rang : sélectionnez seulement un sous-ensemble de métriques. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}Taux : calculez une dérivée personnalisée sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}Régression : appliquez une fonction d'apprentissage automatique sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}Lissage : lissez les variations de votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}Décalage temporel : modifiez la période d'un point de données de votre métrique. {{< /nextlink >}}
{{< /whatsnext >}}

[1]: /fr/dashboards/functions/#proceed-to-time-aggregation
[2]: https://www.datadoghq.com/blog/visualize-statsd-metrics-counts-graphing
[3]: /fr/developers/metrics/type_modifiers/
[4]: /fr/monitors/monitor_types/metric/