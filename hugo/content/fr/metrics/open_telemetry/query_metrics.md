---
aliases:
- /fr/metrics/open_telemetry/otlp_metrics/
description: Interrogez simultanément des métriques Datadog et OpenTelemetry équivalentes
  dans des environnements hybrides à l'aide de Semantic Mode.
further_reading:
- link: opentelemetry/
  tag: Documentation
  text: OpenTelemetry
title: Interroger conjointement les métriques Datadog et OpenTelemetry
---
De nombreuses organisations utilisent OpenTelemetry (OTel) parallèlement à Datadog, créant des environnements hybrides où certains hôtes émettent des métriques OTel et d'autres des métriques Datadog. Étant donné que les métriques OTel et Datadog utilisent souvent des conventions de nommage et des définitions sémantiques différentes, créer une vue unifiée de votre infrastructure dans ces environnements peut s'avérer difficile.

Datadog vous aide à combler ce fossé en vous permettant de :

- Interroger simultanément des métriques OTel et Datadog.
- Comprendre les sources et les mappages de métriques.

## Unifier les métriques OpenTelemetry et Datadog dans les requêtes {#unify-opentelemetry-and-datadog-metrics-in-queries}

{{< callout url="https://www.datadoghq.com/product-preview/otel-native-instrumentation/" btn_hidden="false" header="Rejoignez la Preview !" >}}
Le modificateur de requête Telemetry source nécessite la préversion OTel Native Instrumentation. Utilisez ce formulaire pour demander l'accès.
{{< /callout >}}

Le [Metrics Query Editor][1] et les widgets de tableau de bord incluent un modificateur de requête [Telemetry source][3], vous permettant de contrôler la manière dont Datadog gère les métriques potentiellement équivalentes provenant de sources OTel et Datadog. Sélectionnez {{< ui >}}Modify{{< /ui >}} puis choisissez {{< ui >}}Native telemetry{{< /ui >}} ou {{< ui >}}Combined telemetry{{< /ui >}} dans la section {{< ui >}}Telemetry sources{{< /ui >}}.

{{< img src="dashboards/functions/telemetry_source_combined.png" alt="Modificateur de requête Telemetry sources affichant Combined telemetry sélectionné." style="width:100%;" >}}

Choisissez entre deux modes :

### Native telemetry (par défaut) {#native-telemetry-default}

- Ce mode interroge uniquement le nom de métrique spécifique que vous saisissez (qu'il s'agisse d'une métrique Datadog ou OTel).
- Il n'inclut pas les données provenant de métriques équivalentes.

### Combined telemetry {#combined-telemetry}

- Ce mode combine automatiquement les données de métriques Datadog et OTel équivalentes en une seule requête, même si vous ne saisissez qu'un seul des noms de métrique.
- Il gère le mappage entre les métriques équivalentes (y compris les plus complexes) et agrège toutes les séries temporelles associées en une seule métrique.
- Cela fonctionne que vous partiez d'une métrique Datadog ou d'une métrique OTel.

### Exemple {#example}

Imaginez que vous surveillez la charge système à l'aide de deux métriques différentes :

- **OTel native** : `system.cpu.load_average.15m`
- **Datadog Agent** : `system.load.15`

Si vous interrogez `system.cpu.load_average.15m`, appliquez une agrégation spatiale max et définissez la source de télémétrie sur {{< ui >}}Combined telemetry{{< /ui >}}, Datadog effectue automatiquement les opérations suivantes :

1. Identifie la métrique Datadog équivalente : `system.load.15`.
2. Combine les séries temporelles de `system.cpu.load_average.15m` et `system.load.15`.
3. Applique l'agrégation max sur tous les points de données des deux sources.

## Comprendre les sources de métriques et les mappages {#understand-metric-sources-and-mappings}

Pour plus de clarté lors des requêtes, la source de la métrique et les métriques équivalentes sont affichées :

- **Pastille de source** : dans l'éditeur de requête, une pastille {{< ui >}}Datadog{{< /ui >}} ou {{< ui >}}OTel{{< /ui >}} apparaît à côté du nom de la métrique, indiquant son origine.

- **Liste des métriques équivalentes** : l'éditeur affiche également une liste de métriques considérées comme équivalentes à celle que vous avez interrogée. Cela inclut des mappages complexes un-à-plusieurs. Par exemple, `system.cpu.utilization` correspond à plusieurs métriques d'état CPU Datadog (`system.cpu.idle`, `system.cpu.iowait`, etc.).

{{< img src="/metrics/otel/source.png" alt="Pastille de source et liste des métriques équivalentes" style="width:75%;" >}}

## Voir les mappages détaillés {#view-detailed-mappings}

Pour une vue complète de la relation entre des métriques OTel et Datadog spécifiques, consultez la page Metrics Catalog :

1. Accédez au [Metrics Catalog][2].
2. Recherchez une métrique Datadog ou OTel connue.
3. Ouvrez le panneau latéral {{< ui >}}Metric Details{{< /ui >}}.

Vous pouvez également cliquer sur {{< ui >}}Edit in Metrics Catalog{{< /ui >}} lors de la saisie d'une métrique dans l'éditeur de requête.

Ce panneau affiche les mappages de métriques, y compris les relations complexes. Par exemple, il montre comment `system.cpu.utilization` est mappé vers plusieurs métriques Datadog telles que `system.cpu.idle`, `system.cpu.user` et d'autres.

{{< img src="/metrics/otel/mappings.png" alt="Panneau Details du Metrics Catalog affichant les mappages OTel et Datadog" style="width:100%;" >}}

Vous pouvez également voir la logique basée sur les tags utilisée pour ces mappages. Survolez une métrique équivalente pour voir les conditions spécifiques. Par exemple, le survol de `system.cpu.idle` montre que cette métrique correspond à `system.cpu.utilization` lorsque `state=idle` et que la valeur est multipliée par 100.

{{< img src="/metrics/otel/tooltip.png" alt="Info-bulle de survol affichant la logique de mappage basée sur les tags" style="width:100%;" >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/explorer
[2]: https://app.datadoghq.com/metric/catalog
[3]: /fr/dashboards/functions/telemetry_source/