---
aliases:
- /fr/tracing/trace_retention_and_ingestion/usage_metrics/
- /fr/tracing/trace_retention/usage_metrics/
- /fr/tracing/trace_ingestion/usage_metrics/
description: Apprenez à surveiller votre utilisation dʼAPM.
further_reading:
- link: /tracing/trace_pipeline/ingestion_controls/
  tag: Documentation
  text: Ingestion de traces
- link: /tracing/trace_pipeline/trace_retention/
  tag: Documentation
  text: Rétention des traces
title: Métriques d'utilisation
---

## Présentation

Les pages de configuration dans lʼapp suivantes vous permettent de définir des volumes ingérés et indexés pour APM :
- Utilisez la **[page de contrôle de l'ingestion][1]** pour contrôler le volume des spans ingérées.
- Utilisez la **[page des filtres de rétention][2]** pour contrôler le nombre de spans indexées.

Les deux pages sont alimentées par des **métriques dʼutilisation**.

Les métriques suivantes sont disponibles dans votre compte :

 - `datadog.estimated_usage.apm.ingested_bytes` (dimension facturée)
 - `datadog.estimated_usage.apm.ingested_spans`
 - `datadog.estimated_usage.apm.ingested_traces`
 - `datadog.estimated_usage.apm.indexed_spans` (dimension facturée)


Exploitez ces métriques dans des dashboards et des monitors pour visualiser et contrôler votre utilisation. Deux dashboards prêts à l'emploi sont créés avec ces métriques. Ces dashboards permettent
de surveiller votre utilisation dʼAPM ainsi que le volume de vos spans ingérées et indexées.

Datadog propose des spans indéxées et ingérées pour toutes les offres dʼAPM. Pour en savoir plus, référez-vous à la [page de tarification][3] ou à certains de nos [scénarios d'exemples de tarification][4].

### Volume de spans ingérées

Les métriques suivantes sont associés à l'utilisation des spans ingérées :

 - `datadog.estimated_usage.apm.ingested_bytes`
 - `datadog.estimated_usage.apm.ingested_spans`
 - `datadog.estimated_usage.apm.ingested_traces`

Contrôlez l'utilisation avec `datadog.estimated_usage.apm.ingested_bytes`. L'ingestion est mesurée en volume, et non en nombre de spans ou de traces. Cette métrique possède les tags `env` et `service` afin que vous puissiez repérer les environnements et les services qui contribuent au volume d'ingestion.

Cette métrique possède également le tag `ingestion_reason`, qui indique quels [mécanismes d'ingestion][5] sont responsables de l'envoi de spans à Datadog. Ces mécanismes sont imbriqués dans les bibliothèques de tracing de lʼAgent Datadog. Pour en savoir plus sur cette dimension, référez-vous au [dashboard Ingestion Reasons][6].

La métrique `datadog.estimated_usage.apm.ingested_traces` mesure le nombre de requêtes échantillonnées par seconde, et ne compte que les traces échantillonnées par le mécanisme [d’échantillonnage en amont][7]. Cette métrique possède également les tags `env` et `service` afin que vous puissiez repérer les services qui lancent le plus grand nombre de traces.

### Spans indexées

Utilisez la métrique `datadog.estimated_usage.apm.indexed_spans` pour contrôler le nombre de spans indexées par [les filtres de rétention basés sur les tags][2].

Cette métrique possède les tags `env` et `service`, ce qui vous permet de repérer les environnements et les services qui contribuent à l'utilisation de l'indexation.

## Dashboard pour lʼutilisation estimée des traces APM

Le [dashboard APM Traces Usage][8] contient plusieurs groupes de widgets affichant des indicateurs clés de performance de haut niveau et des informations supplémentaires sur l'utilisation.

{{< img src="tracing/trace_indexing_and_ingestion/usage_metrics/dashboard_apm_usage.png" style="width:100%;" alt="Dashboard APM Estimated Usage" >}}

Dans ce dashboard, vous trouverez des informations sur :

- Lʼutilisation globale des métriques
- Lʼinfrastructure avec APM activé, comprenant les hosts, Fargate et AWS Lambda
- Les volumes d'ingestion séparés par `service`, `env` et `ingestion_reason`
- Les volumes dʼindexation séparés par `service` et `env`

## Dashboard APM Ingestion Reasons

Le [dashboard APM Ingestion Reasons][6] fournit des informations sur chaque source de volume d'ingestion. Chaque utilisation de la métrique d'ingestion est taguée avec une dimension `ingestion_reason`, afin que vous puissiez voir quelles options de configuration (configuration de lʼAgent Datadog ou configuration de la bibliothèque de tracing) et quels produits (tels que RUM ou Synthetic Testing) génèrent le plus de données APM.

{{< img src="tracing/trace_indexing_and_ingestion/usage_metrics/dashboard_ingestion_reasons.png" style="width:100%;" alt="Dashboard APM Ingestion Reasons" >}}

Pour chaque motif d'ingestion, vous pouvez découvrir quels sont les environnements et les services qui contribuent le plus au volume global.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/trace_pipeline/ingestion_controls
[2]: /fr/tracing/trace_pipeline/trace_retention/#retention-filters
[3]: https://www.datadoghq.com/pricing/?product=apm#apm
[4]: /fr/account_management/billing/apm_tracing_profiler/
[5]: /fr/tracing/trace_pipeline/ingestion_mechanisms/
[6]: https://app.datadoghq.com/dash/integration/apm_ingestion_reasons
[7]: /fr/tracing/trace_pipeline/ingestion_mechanisms/#head-based-sampling
[8]: https://app.datadoghq.com/dash/integration/apm_estimated_usage