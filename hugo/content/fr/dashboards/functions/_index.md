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
description: Appliquez des fonctions mathématiques et statistiques pour modifier les
  résultats des requêtes métriques dans les tableaux de bord et visualisations de
  Datadog.
further_reading:
- link: /metrics/#querying-metrics
  tag: Documentation
  text: Interroger des métriques
title: Fonctions
---
## Aperçu {#overview}

Les fonctions peuvent modifier la manière dont les résultats d'une requête métrique sont retournés pour les visualisations. La plupart des fonctions sont appliquées après que les résultats de la requête métrique ont été retournés, mais les fonctions peuvent également changer les paramètres avant que la requête ne soit effectuée. 

Par exemple, la fonction Rollup change l'agrégation temporelle d'une requête avant que les résultats ne soient retournés. Alternativement, les fonctions arithmétiques appliquent des modifications aux résultats retournés de la requête métrique. Consultez la page [Métriques][3] pour en savoir plus sur les requêtes de métriques. Pour en savoir plus sur les différentes fonctions, consultez les [types de fonctions](#function-types).

## Ajouter une fonction {#add-a-function}

Les fonctions peuvent être appliquées à vos requêtes en cliquant sur l'icône Add Function `Σ` dans l'éditeur de graphiques. La plupart des fonctions sont appliquées après [agrégation temporelle][1] et [agrégation spatiale][2].

{{< img src="dashboards/functions/sigmaaddingfunctions.png" alt="Symbole Sigma majuscule pour Add Function" style="width:100%;" >}}

## Types de fonctions {#function-types}

{{< whatsnext desc="Choisissez un type de fonction :" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}Algorithmique : Implémentez la détection d'anomalies ou de valeurs aberrantes.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}Arithmétique : Effectuez des opérations arithmétiques.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}Compter : Comptez les valeurs différentes de zéro ou non nulles.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}Exclusion : Excluez certaines valeurs de votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}Interpolation : Remplissez ou définissez des valeurs par défaut.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}Classement : Sélectionnez uniquement un sous-ensemble de métriques. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}Taux : Calculez une dérivée personnalisée sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}Régression : Appliquez une fonction d'apprentissage automatique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}Rollup : Contrôlez le nombre de points de données bruts utilisés. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}Lissage : Lissez vos variations de métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/telemetry_source" >}}Source de télémétrie : Choisissez la source de télémétrie de vos données métriques.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}Décalage temporel : Déplacez votre point de données métriques le long de la chronologie. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/beta" >}}Bêta : Calculez la moyenne mobile d'une métrique.{{< /nextlink >}}
{{< /whatsnext >}}

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/metrics/#time-aggregation
[2]: /fr/metrics/#space-aggregation
[3]: /fr/metrics/#anatomy-of-a-metric-query