---
aliases:
- /fr/metrics/open_telemetry/otlp_metrics/
description: Interrogez les métriques équivalentes Datadog et OpenTelemetry ensemble
  dans des environnements hybrides en utilisant le mode sémantique.
further_reading:
- link: opentelemetry/
  tag: Documentation
  text: OpenTelemetry
title: Interrogez simultanément les métriques Datadog et OpenTelemetry.
---
De nombreuses organisations utilisent OpenTelemetry (OTel) aux côtés de Datadog, créant des environnements hybrides où certains hôtes émettent des métriques OTel et d'autres émettent des métriques Datadog. Parce que les métriques OTel et Datadog utilisent souvent des conventions de nommage et des définitions sémantiques différentes, créer une vue unifiée de votre infrastructure dans ces environnements peut être difficile.

Datadog vous aide à combler cette lacune en vous permettant de :

- Interrogez les métriques OTel et Datadog ensemble.
- Comprenez les sources de métriques et les correspondances.

## Unifiez les métriques OpenTelemetry et Datadog dans les requêtes {#unify-opentelemetry-and-datadog-metrics-in-queries}

{{< callout url="https://www.datadoghq.com/product-preview/otel-native-instrumentation/" btn_hidden="false" header="Rejoignez l’aperçu !" >}}
Le modificateur de requête de source de télémétrie nécessite l'aperçu de l'instrumentation native OTel. Utilisez ce formulaire pour demander l’accès.
{{< /callout >}}

L'[Éditeur de requêtes de métriques][1] et les widgets de tableau de bord incluent un modificateur de requête de [source de télémétrie][3], vous permettant de contrôler comment Datadog gère les métriques potentiellement équivalentes provenant des sources OTel et Datadog. Sélectionnez **Modifier** puis choisissez **Télémétrie native** ou **Télémétrie combinée** dans la section **Sources de télémétrie**.

{{< img src="dashboards/functions/telemetry_source_combined.png" alt="Modificateur de requête de sources de télémétrie montrant la télémétrie combinée sélectionnée." style="width:100%;" >}}

Choisissez entre deux modes :

### Télémétrie native (par défaut) {#native-telemetry-default}

- Ce mode interroge uniquement le nom de métrique spécifique que vous entrez (qu'il s'agisse d'une métrique Datadog ou OTel).
- Il n'inclut pas de données provenant de métriques équivalentes.

### Télémétrie combinée {#combined-telemetry}

- Ce mode combine automatiquement les données des métriques équivalentes Datadog et OTel en une seule requête, même si vous n'entrez qu'un seul des noms de métriques.
- Il gère la correspondance entre les métriques équivalentes (y compris les métriques complexes) et agrège toutes les séries temporelles associées en une seule métrique.
- Cela fonctionne que vous commenciez avec une métrique Datadog ou une métrique OTel.

### Exemple {#example}

Imaginez que vous surveillez la charge du système en utilisant deux métriques différentes :

- **OTel natif** : `system.cpu.load_average.15m`
- **Agent Datadog** : `system.load.15`

Si vous interrogez `system.cpu.load_average.15m`, appliquez une agrégation maximale et définissez la source de télémétrie sur **Télémétrie combinée**, Datadog effectue automatiquement :

1. Identifie la métrique Datadog équivalente : `system.load.15`.
2. Combine les séries temporelles de `system.cpu.load_average.15m` et `system.load.15`.
3. Applique l'agrégation maximale à tous les points de données des deux sources.

## Comprenez les sources de métriques et les correspondances {#understand-metric-sources-and-mappings}

Pour fournir de la clarté lors de l'interrogation, la source de métrique et les métriques équivalentes sont affichées :

- **Pastille source** : Dans l'éditeur de requêtes, une pastille **Datadog** ou **OTel** apparaît à côté du nom de la métrique, indiquant son origine.

- **Liste des métriques équivalentes** : L'éditeur montre également une liste de métriques considérées comme équivalentes à celle que vous avez interrogée. Cela inclut des correspondances complexes de un à plusieurs. Par exemple, `system.cpu.utilization` correspond à plusieurs métriques d'état CPU Datadog (`system.cpu.idle`, `system.cpu.iowait`, etc.).

{{< img src="/metrics/otel/source.png" alt="Pastille source et liste des métriques équivalentes" style="width:75%;" >}}

## Consultez les correspondances détaillées {#view-detailed-mappings}

Pour une vue d'ensemble de la façon dont des métriques OTel et Datadog spécifiques sont liées, consultez la page Résumé des métriques :

1. Naviguez vers [**Métriques > Résumé**][2].
2. Recherchez une métrique Datadog ou OTel connue.
3. Ouvrez le panneau latéral **Détails de la métrique**.

Alternativement, cliquez sur **Modifier dans le résumé des métriques** lors de la saisie d'une métrique dans l'éditeur de requêtes.

Ce panneau affiche les mappages de métriques, y compris des relations complexes. Par exemple, il montre comment `system.cpu.utilization` se mappe à plusieurs métriques Datadog comme `system.cpu.idle`, `system.cpu.user`, et d'autres.

{{< img src="/metrics/otel/mappings.png" alt="Panneau Détails du résumé des métriques montrant les mappages OTel et Datadog." style="width:100%;" >}}

Vous pouvez également voir la logique basée sur les tags utilisée pour ces mappages. Survolez une métrique équivalente pour voir les conditions spécifiques. Par exemple, survoler `system.cpu.idle` montre qu'elle se mappe à `system.cpu.utilization` lorsque `state=idle`, et la valeur est multipliée par 100.

{{< img src="/metrics/otel/tooltip.png" alt="Infobulle de survol montrant la logique de mappage basée sur les tags." style="width:100%;" >}}

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/explorer
[2]: https://app.datadoghq.com/metric/summary
[3]: /fr/dashboards/functions/telemetry_source/