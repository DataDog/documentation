---
aliases:
- /fr/graphing/functions/telemetry_source/
description: Contrôlez si une requête de métrique utilise uniquement la métrique interrogée
  ou combine des métriques équivalentes de Datadog et d'OpenTelemetry.
further_reading:
- link: /metrics/open_telemetry/query_metrics
  tag: Documentation
  text: Interroger les métriques Datadog et OpenTelemetry
title: Source de télémétrie
---
Le modificateur de requête de source de télémétrie contrôle si une requête de métrique utilise uniquement la métrique interrogée ou combine des métriques équivalentes de Datadog et d'OpenTelemetry. Pour plus d'informations sur l'interrogation des métriques provenant des deux sources, consultez [Query Across Datadog and OpenTelemetry Metrics][1].

Dans l'éditeur de requêtes, sélectionnez **Modifier** puis choisissez une option dans la section **Sources de télémétrie**.

{{< img src="dashboards/functions/telemetry_source_combined.png" alt="Modificateur de requête de sources de télémétrie montrant la télémétrie combinée sélectionnée." style="width:75%;" >}}

| Option UI | Valeur JSON | Comportement |
|---|---|---|
| **Télémétrie native** (par défaut) | `"semantic_mode": "native"` | Retourne uniquement la métrique interrogée. N'inclut pas les métriques équivalentes d'une autre source de télémétrie. |
| **Télémétrie combinée** | `"semantic_mode": "combined"` | Combine des métriques équivalentes de Datadog et d'OpenTelemetry en un seul résultat de requête. |

Pour définir la source de télémétrie dans l'éditeur JSON, ajoutez la clé `semantic_mode` à votre objet de requête :

{{< highlight json "hl_lines=6" >}}
"queries": [
    {
        "name": "query1",
        "data_source": "metrics",
        "query": "sum:go.goroutine.count{*}",
        "semantic_mode": "combined"
    }
]
{{< /highlight >}}

## Autres fonctions {#other-functions}

{{< whatsnext desc="Consultez les autres fonctions disponibles :" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}Algorithmique : Implémentez la détection d'anomalies ou de valeurs aberrantes.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}Arithmétique : Effectuez des opérations arithmétiques.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}Compter : Comptez les valeurs non nulles ou différentes de zéro.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}Exclusion : Excluez certaines valeurs de votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}Interpolation : Remplissez ou définissez des valeurs par défaut.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}Rang : Sélectionnez uniquement un sous-ensemble de métriques. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}Taux : Calculez une dérivée personnalisée sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}Régression : Appliquez une fonction d'apprentissage automatique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}Rollup : Contrôlez le nombre de points de données bruts utilisés. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}Lissage : Lissez vos variations de métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}Décalage temporel : Déplacez votre point de données de métrique le long de la chronologie. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/beta" >}}Bêta : Calculez la moyenne mobile d'une métrique.{{< /nextlink >}}
{{< /whatsnext >}}

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/metrics/open_telemetry/query_metrics