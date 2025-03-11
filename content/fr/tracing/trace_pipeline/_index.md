---
aliases:
- /fr/tracing/ingestion/
- /fr/tracing/trace_ingestion/
- /fr/tracing/trace_retention_and_ingestion/
description: Découvrir comment contrôler l'ingestion des spans
title: Pipeline de traces
---

{{< img src="tracing/apm_lifecycle/trace_pipeline.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Pipeline de traces" >}}

Recueillez des traces à partir de vos applications instrumentées pour bénéficier d'une visibilité de bout en bout sur vos applications. Interrogez et visualisez des traces distribuées à partir du [Trace Explorer][1], analysez comment les requêtes transitent par vos microservices et enquêtez sur les erreurs et les problèmes de performance.

Avec APM, l'**ingestion** et la **rétention** des traces sont totalement personnalisables.

## Mécanismes d'ingestion

Configurez le tracing pour profiter d'une visibilité de bout en bout sur vos applications avec une [configuration sur mesure de l'ingestion][2]. Assurez-vous de capturer les traces complètes, y compris l'ensemble des traces d'erreur ou de haute latence, afin de ne jamais passer à côté d'un problème de performance tel qu'une panne de l'application ou un service qui ne répond plus.

{{< img src="tracing/trace_indexing_and_ingestion/service_setup.png" style="width:80%;" alt="Configuration des services" >}}


## Contrôles d'ingestion

La [page Ingestion Control][3] présente des volumes d'ingestion et des paramètres de configuration pour vos différents services.

{{< img src="tracing/trace_indexing_and_ingestion/ingestion_control_page.png" style="width:100%;" alt="Aperçu de la page Ingestion Control" >}}

## Générer des métriques à partir de spans

Vous pouvez générer des métriques à partir de spans ingérées et utilisez ces métriques custom dans vos requêtes et comparaisons. Pour en savoir plus, consultez la section [Générer des métriques à partir de spans][4].

{{< img src="tracing/span_to_metrics/metrics_from_spans_1.png" style="width:100%;" alt="Graphique d'une métrique basée sur des spans" >}}

## Rétention des traces

Une fois les spans ingérées par Datadog, certaines d'entre elles sont conservées pendant 15 jours en fonction des [filtres de rétention][5] qui ont été définis sur votre compte. Le filtre de rétention intelligent Datadog indexe une proportion de vos traces pour vous aider à surveiller l'intégrité de vos applications. Vous pouvez également définir vos propres filtres de rétention personnalisés afin d'indexer les données des traces que vous voulez conserver, de façon à atteindre plus facilement les objectifs de votre organisation.

{{< img src="tracing/trace_indexing_and_ingestion/retention_filters/retention_filter_page.png" style="width:100%;" alt="Page Retention Filters" >}}

## Métriques d'utilisation des traces

Consultez la section [Métriques d'utilisation][6] pour découvrir comment suivre et surveiller votre volume de données ingérées et indexées et apprendre à utiliser les dashboards APM Estimated Usage et Ingestion Reasons.

{{< img src="tracing/trace_indexing_and_ingestion/usage_metrics/dashboard_apm_usage.png" style="width:100%;" alt="Dashboard APM Estimated Usage" >}}



[1]: /fr/tracing/trace_explorer
[2]: /fr/tracing/trace_ingestion/mechanisms
[3]: /fr/tracing/trace_ingestion/ingestion_controls
[4]: /fr/tracing/trace_pipeline/generate_metrics
[5]: /fr/tracing/trace_retention
[6]: /fr/tracing/trace_retention/usage_metrics