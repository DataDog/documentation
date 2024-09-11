---
aliases:
- /fr/examples/
- /fr/examples/aws-metrics/
- /fr/examples/month_before/
- /fr/examples/graphing-functions/
- /fr/examples/day_before/
- /fr/examples/json-editing/
- /fr/examples/nginx-metrics/
- /fr/examples/dashboards/
- /fr/examples/hour_before/
- /fr/examples/os-metrics/
- /fr/examples/week_before/
- /fr/examples/cassandra-metrics/
- /fr/graphing/miscellaneous/functions
- /fr/graphing/miscellaneous/
- /fr/getting_started/from_the_query_to_the_graph
- /fr/graphing/miscellaneous/from_the_query_to_the_graph
- /fr/graphing/functions/
further_reading:
- link: /metrics/#interroger-des-metriques
  tag: Documentation
  text: Interroger des métriques
title: Fonctions
---

## Présentation

Les fonctions permettent de modifier la présentation des résultats d'une requête de métrique au sein des visualisations. La plupart des fonctions sont appliquées après que les résultats ont été renvoyés. Toutefois, les fonctions peuvent également modifier des paramètres avant l'envoi de la requête.

Par exemple, la fonction de cumul modifie l'agrégation temporelle d'une requête avant la transmission des résultats. Par ailleurs, les fonctions arithmétiques modifient les résultats renvoyés de la requête de métrique. Consultez la page [Métriques][3] pour en savoir plus sur l'interrogation de métriques. Pour vous familiariser davantage avec les différentes fonctions, consultez la rubrique [Types de fonctions](#types-de-fonctions).

## Ajouter une fonction

Vous pouvez cliquer sur l'icône d'ajout de fonction `Σ` dans l'éditeur de graphiques pour appliquer des fonctions à vos métriques. La plupart des fonctions sont appliquées après les agrégations [temporelle][1] et [spatiale][2].

{{< img src="dashboards/functions/sigmaaddingfunctions.png" alt="Symbole Sigma majuscule pour l'ajout de fonction" style="width:100%;" >}}

## Types de fonctions

{{< whatsnext desc="Choisissez un type de fonction :" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}Algorithme : mettez en place un système de détection d'anomalies ou de singularités.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}Opérations arithmétiques : effectuez des opérations arithmétiques.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}Nombre de valeurs : comptez les valeurs différentes de zéro ou de null.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}Exclusion : excluez certaines valeurs de votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}Interpolation : saisissez ou définissez des valeurs par défaut.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}Rang : sélectionnez seulement un sous-ensemble de métriques. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}Taux : calculez une dérivée personnalisée sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}Régression : appliquez une fonction d'apprentissage automatique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}Cumul : contrôlez le nombre de points de données bruts utilisés. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}Lissage : lissez les variations de votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}Décalage temporel : modifiez la période d'un point de données de votre métrique. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/beta" >}}Bêta : calculez la moyenne mobile d'une métrique.{{< /nextlink >}}
{{< /whatsnext >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/metrics/#time-aggregation
[2]: /fr/metrics/#space-aggregation
[3]: /fr/metrics/#anatomy-of-a-metric-query