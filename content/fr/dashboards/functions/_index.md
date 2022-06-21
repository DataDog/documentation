---
title: Fonctions
kind: documentation
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
---
## Présentation

Vous pouvez appliquer des fonctions à vos requêtes en cliquant sur l'icône `+` de l'éditeur de graphiques. La plupart des fonctions sont appliquées lors de la dernière étape (après l'[agrégation temporelle][1] et l'[agrégation spatiale][2]).

{{< img src="dashboards/functions/addingfunctions.png" alt="Ajout d'une fonction" style="width:75%;" >}}

Dans l'exemple ci-dessous, une fonction d'exclusion est appliquée afin d'exclure certaines valeurs d'une métrique.

{{< img src="dashboards/functions/exclusion_example.png" alt="Exemple d'exclusion avec une top list" style="width:75%;" >}}

Dans l'exemple ci-dessous, une fonction de décalage temporel est appliquée sur des logs d'erreur, afin de comparer les données actuelles à celles d'il y a une semaine.

{{< img src="dashboards/functions/timeshift_example.png" alt="Exemple de décalage temporel avec des logs" style="width:75%;" >}}


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


[1]: /fr/metrics/#time-aggregation
[2]: /fr/metrics/#space-aggregation