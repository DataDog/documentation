---
aliases:
- /fr/tracing/ingestion/
- /fr/tracing/trace_ingestion/
- /fr/tracing/trace_retention_and_ingestion/
description: Découvrir comment contrôler l'ingestion des spans
further_reading:
- link: https://learn.datadoghq.com/courses/apm-rate-limit-retention
  tag: Centre d'apprentissage
  text: 'Limitation du débit et rétention APM :'
- link: https://www.datadoghq.com/architecture/mastering-distributed-tracing-data-volume-challenges-and-datadogs-approach-to-efficient-sampling/
  tag: Architecture Center
  text: 'Maîtriser le traçage distribué : défis liés au volume de données et approche
    de Datadog pour un échantillonnage efficace'
- link: https://www.datadoghq.com/architecture/optimizing-distributed-tracing-best-practices-for-remaining-within-budget-and-capturing-critical-traces/
  tag: Architecture Center
  text: 'Optimiser le traçage distribué : bonnes pratiques pour respecter le budget
    et capturer les traces critiques'
title: Pipeline de traces
---
{{< img src="tracing/apm_lifecycle/trace_pipeline.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Pipeline de traces" >}}

Collectez les traces de vos applications instrumentées pour obtenir une visibilité de bout en bout sur vos applications. Interrogez et visualisez les traces distribuées depuis le [Trace Explorer][1], comprenez comment les requêtes circulent à travers vos microservices et enquêtez facilement sur les erreurs et les problèmes de performance.

Avec l'APM, l'**ingestion** et la **rétention** des traces sont entièrement personnalisables.

## Mécanismes d'ingestion : {#ingestion-mechanisms}

Configurez le traçage pour obtenir une visibilité de bout en bout sur vos applications grâce à une [configuration d'ingestion][2] précise. Assurez-vous de capturer des traces complètes, y compris toutes les traces d'erreur et de latence élevée, pour ne jamais manquer de problèmes de performance tels qu'une panne d'application ou un service qui ne répond pas.

{{< img src="tracing/trace_indexing_and_ingestion/service_setup.png" style="width:80%;" alt="Configuration du service" >}}


## Contrôles d'ingestion : {#ingestion-controls}

La [page Ingestion Control][3] présente des volumes d'ingestion et des paramètres de configuration pour vos différents services.

{{< img src="tracing/trace_indexing_and_ingestion/ingestion_controls_page.png" style="width:100%;" alt="Vue d'ensemble de la page Ingestion Control" >}}

## Pipelines de traitement : {#processing-pipelines}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-warning">Les pipelines de traitement ne sont pas pris en charge dans {{< region-param key="dd_site_name" >}}.</div>
{{< /site-region >}}

Transformez, normalisez et enrichissez les attributs de span après l'ingestion avec les [Pipelines de traitement][7]. Standardisez la dénomination des attributs entre les services, consolidez les clés incohérentes et extrayez des données structurées à partir des valeurs de span, sans modifier le code de l'application.

{{< img src="tracing/processing_pipelines/manage_pipelines.png" style="width:100%;" alt="Pipelines de traitement" >}}

## Génération de métriques à partir de spans : {#generating-metrics-from-spans}

Vous pouvez générer des métriques à partir de spans ingérés et utiliser ces métriques personnalisées pour des requêtes et des comparaisons. En savoir plus dans [Generating Metrics from Spans][4].

{{< img src="tracing/span_to_metrics/metrics_from_spans_1.png" style="width:100%;" alt="Graphique d'une métrique basée sur les spans" >}}

## Rétention des traces : {#trace-retention}

Une fois les spans ingérés, les [Retention Filters][5] déterminent quels spans individuels sont indexés et stockés pendant 15 jours. Le filtre de rétention intelligent Datadog indexe automatiquement une sélection représentative de spans pour vous aider à surveiller la santé de vos applications. Vous pouvez également définir des Filtres de rétention personnalisés pour indexer des spans supplémentaires qui sont importants pour les objectifs de votre organisation.

{{< img src="tracing/trace_indexing_and_ingestion/retention_filters/retention_filters.png" style="width:100%;" alt="Page Filtres de rétention" >}}

## Métriques d'utilisation des traces : {#trace-usage-metrics}

Consultez la section [Métriques d'utilisation][6] pour découvrir comment suivre et surveiller votre volume de données ingérées et indexées et apprendre à utiliser les dashboards APM Estimated Usage et Ingestion Reasons.

{{< img src="tracing/trace_indexing_and_ingestion/usage_metrics/dashboard_apm_usage.png" style="width:100%;" alt="APM Estimated Usage Dashboard" >}}


## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/trace_explorer
[2]: /fr/tracing/trace_pipeline/ingestion_mechanisms/
[3]: /fr/tracing/trace_pipeline/ingestion_controls
[4]: /fr/tracing/trace_pipeline/generate_metrics
[5]: /fr/tracing/trace_pipeline/trace_retention
[6]: /fr/tracing/trace_pipeline/metrics
[7]: /fr/tracing/trace_pipeline/processing_pipelines