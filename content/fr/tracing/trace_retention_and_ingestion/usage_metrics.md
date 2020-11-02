---
title: Métriques d'utilisation
kind: documentation
description: Apprenez à surveiller votre utilisation de Tracing without Limits.
---
Si, lorsque vous surveillez votre utilisation de l'APM et de l'indexation, les chiffres ne correspondent pas à vos attentes, ou que vous souhaitez modifier vos taux d'ingestion ou de rétention, consultez la documentation sur les [filtres de rétention][1] ou le [contrôle de l'ingestion][2].

### Dashboard de l'utilisation
{{< img src="tracing/trace_indexing_and_ingestion/AppAnalyticsDashboard.png" style="width:100%;" alt="Dashboard des spans indexées" >}}

Datadog propose un [dashboard d'utilisation][3] par défaut pour vous permettre de surveiller votre utilisation de l'APM, ainsi que vos spans ingérées et indexées.

Pour créer un dashboard ou un monitor personnalisé, les métriques clés à utiliser sont les suivantes :

 - `datadog.estimated_usage.apm.ingested_spans`
 - `datadog.estimated_usage.apm.indexed_spans`

### Spans indexées

{{< img src="tracing/trace_indexing_and_ingestion/RetentionFilters.png" style="width:100%;" alt="Indexation de spans" >}}

Chaque filtre de rétention défini sur vos services, y compris le [filtre de rétention intelligent de Datadog][4] par défaut, mène à une _augmentation_ du nombre de spans indexées pour votre compte Datadog.

Étant donné que les spans indexées peuvent avoir un impact sur votre facture, la colonne « Spans Indexed » apparaît à côté de chaque filtre défini. Celle-ci affiche le nombre de spans indexées en fonction de l'intervalle choisi pour ce filtre.

**Remarque** : lorsqu'il est utilisé seul, le filtre de rétention intelligent de Datadog ne génère pas de frais en dehors des spans indexées incluses avec votre offre APM.

**Remarque** : les droits administrateur sont requis pour créer, modifier ou désactiver des filtres de rétention.


[1]: /fr/tracing/trace_retention_and_ingestion/#retention-filters
[2]: /fr/tracing/trace_retention_and_ingestion/#ingestion-controls
[3]: https://app.datadoghq.com/dash/integration/30337/app-analytics-usage
[4]: /fr/tracing/trace_retention_and_ingestion/#datadog-intelligent-retention-filter