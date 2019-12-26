---
title: Rollup
kind: documentation
---
`.rollup()`

Conseillé pour les utilisateurs experts uniquement. Datadog cumule automatiquement les points de données en fonction du type de métrique au sein de l'application : pour les métriques `gauge`, la moyenne est calculée par défaut, alors que pour les métriques `count` et `rate`, la somme est calculée. Ajoutez cette fonction à la fin d'une requête pour remplacer le comportement par défaut : vous pourrez alors contrôler la méthode de cumul des données ou le nombre de points bruts cumulés en un seul point tracé sur le graphique.

La fonction comprend deux paramètres, method et time : `.rollup(method,time)`. Le paramètre method accepte les valeurs sum/min/max/count/avg, et time est en secondes. Vous pouvez les utiliser individuellement ou ensemble, comme par exemple `.rollup(sum,120)`. Une limite de 350 points par intervalle est appliquée. Par exemple, si vous utilisez `.rollup(20)` pour un intervalle de temps d'un mois, les données sont renvoyées avec un cumul bien supérieur à 20 secondes afin d'éviter de renvoyer un nombre colossal de points.

Notez que les cumuls doivent normalement être évités dans les requêtes du [monitor][1], en raison du risque de décalage entre l'intervalle de cumul et la fenêtre d'évaluation du monitor. Le début et la fin des intervalles de cumul sont alignés sur l'heure UNIX, et non sur le début et la fin des requêtes du monitor : les monitors sont par conséquent susceptibles d'évaluer un intervalle de cumul incomplet contenant uniquement un faible volume de données, et donc de se déclencher par erreur. Pour éviter ce problème, il est nécessaire de retarder l'évaluation du monitor pendant une durée correspondant à l'intervalle de cumul (au minimum).

## .as_count() ou as_rate()

Ces fonctions sont prévues uniquement pour les métriques envoyées comme taux ou counters via StatsD. Ces fonctions n'ont aucun effet sur les autres types de métrique. Pour en savoir plus sur l'utilisation des fonctions  `.as_count()` et `.as_rate()`, consultez [notre article de blog][2].

Remarque : [la seule requête disponible avec `as_count()` est `sum()`][3] (sauf en cas d'utilisation d'un résumé de cumul), qui est la seule fonction mathématique fiable pour ce type de comportement. Pour en savoir plus, consultez la [documentation détaillée relative aux modificateurs intégrées à l'application][4].

## Autres fonctions

{{< whatsnext desc="Consult the other available functions:" >}}
    {{< nextlink href="/graphing/functions/algorithms" >}}Algorithme : mettez en place un système de détection d'anomalies ou de singularités sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/arithmetic" >}}Opérations arithmétiques : effectuez des opérations arithmétiques sur votre métrique.  {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/count" >}}Total : comptez les valeurs différentes de zéro ou différentes de null de votre métrique. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/interpolation" >}}Interpolation : saisissez ou définissez des valeurs par défaut pour votre métrique.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rank" >}}Rang : saisissez ou définissez des valeurs par défaut pour votre métrique. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rate" >}}Taux : calculez une dérivée personnalisée sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/regression" >}}Régression : appliquez une fonction d'apprentissage automatique sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/smoothing" >}}Lissage : lissez les variations de votre métrique.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/timeshift" >}}Décalage temporel : modifiez la période d'un point de données de votre métrique. {{< /nextlink >}}
{{< /whatsnext >}}

[1]: /fr/monitors/monitor_types/metric
[2]: https://www.datadoghq.com/blog/visualize-statsd-metrics-counts-graphing
[3]: /fr/graphing/faq/as_count_validation
[4]: /fr/developers/metrics/type_modifiers