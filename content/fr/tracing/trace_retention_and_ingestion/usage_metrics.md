---
title: Métriques d'utilisation
kind: documentation
description: Apprenez à surveiller votre utilisation de Tracing without Limits.
---
Si, lorsque vous surveillez votre utilisation de l'APM et de vos spans indexées, les chiffres ne correspondent pas à vos attentes, ou que vous souhaitez modifier vos taux d'ingestion ou de rétention, consultez la documentation sur les [filtres de rétention][1] ou les [contrôles de l'ingestion][2].

Cette page détaille les métriques disponibles et le dashboard par défaut pour la surveillance de la consommation des spans ingérées et indexées. L'APM Datadog est fournie avec un certain volume de spans ingérées et indexées. Pour en savoir plus, consultez la [documentation sur les tarifs][3], ou découvrez le [tarif de plusieurs scénarios][4].

### Dashboard de l'utilisation de l'analyse de traces

{{< img src="tracing/trace_indexing_and_ingestion/usage_metrics/AnalyticsDashboardOverview.png" style="width:100%;" alt="Dashboard d'utilisation Tracing Without Limits" >}}

Datadog propose un [dashboard d'utilisation][5] par défaut vous permettant de surveiller votre utilisation de l'APM, ainsi que vos volumes de spans ingérées et indexées.

Chaque métrique de ce dashboard correspond à l'une des trois métriques Datadog standard ci-dessous, disponibles sur votre compte.

 - `datadog.estimated_usage.apm.ingested_bytes`
 - `datadog.estimated_usage.apm.ingested_spans`
 - `datadog.estimated_usage.apm.indexed_spans`

Ces métriques possèdent les tags `env` ou `service` pour vous aider à déterminer si vous devez ajuster les contrôles d'ingestion ou d'indexation pour des environnements et des services spécifiques. Vous pouvez utiliser ces métriques dans votre dashboard par défaut, ou créer vos propres dashboards et monitors afin de détecter les filtres de rétention mal configurés ou de définir des seuils pour les monitors.

Le [dashboard d'analyse de traces][5] comprend plusieurs groupes de widgets. Il vous permet d'identifier rapidement l'origine de la majorité de vos spans ingérées et indexées. Ce dashboard comprend des Top Lists pour les tags `env` et `service` ainsi que pour des combinaisons uniques des tags `env` et `service`, comme indiqué précédemment.

 **Remarque :** bien que la facturation soit basée sur le volume en octets, le dashboard inclut une répartition du volume et du nombre de spans.

### Indexed Spans

{{< img src="tracing/trace_indexing_and_ingestion/RetentionFilters.png" style="width:100%;" alt="Indexation de spans" >}}

Chaque filtre de rétention défini sur vos services, y compris le [filtre de rétention intelligent de Datadog][6] par défaut, entraîne une _augmentation_ du nombre de spans indexées pour votre compte Datadog.

Étant donné que les spans indexées peuvent avoir un impact sur votre facture, la colonne « Spans Indexed » apparaît à côté de chaque filtre défini. Celle-ci affiche le nombre de spans indexées en fonction de l'intervalle choisi pour ce filtre.

**Remarque** : lorsqu'il est utilisé seul, le filtre de rétention intelligent de Datadog ne génère pas de frais en dehors des spans indexées incluses avec votre offre APM.

**Remarque** : les droits administrateur sont requis pour créer, modifier ou désactiver des filtres de rétention.


[1]: /fr/tracing/trace_retention_and_ingestion/#retention-filters
[2]: /fr/tracing/trace_retention_and_ingestion/#ingestion-controls
[3]: https://www.datadoghq.com/pricing/?product=apm#apm
[4]: /fr/account_management/billing/apm_distributed_tracing/
[5]: https://app.datadoghq.com/dash/integration/30337/app-analytics-usage
[6]: /fr/tracing/trace_retention_and_ingestion/#datadog-intelligent-retention-filter