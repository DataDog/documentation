---
title: Instrumentation personnalisée
kind: documentation
description: Personnalisez votre instrumentation et votre visibilité dans vos traces Datadog.
aliases:
  - /fr/tracing/setup/php/manual-installation
  - /fr/agent/apm/php/manual-installation
  - /fr/tracing/guide/distributed_tracing/
  - /fr/tracing/advanced/manual_instrumentation/
  - /fr/tracing/advanced/opentracing/
  - /fr/tracing/opentracing/
  - /fr/tracing/manual_instrumentation/
  - /fr/tracing/guide/adding_metadata_to_spans
  - /fr/tracing/advanced/adding_metadata_to_spans/
  - /fr/tracing/custom_instrumentation
  - /fr/tracing/setup_overview/custom_instrumentation/undefined
further_reading:
  - link: tracing/guide/instrument_custom_method
    text: Instrumenter une méthode personnalisée pour analyser en détail votre logique opérationnelle
  - link: tracing/connect_logs_and_traces
    text: Associer vos logs à vos traces
  - link: tracing/opentracing
    text: Implémenter OpenTracing dans vos applications
  - link: tracing/visualization/
    text: 'Explorer vos services, ressources et traces'
  - link: 'https://www.datadoghq.com/blog/opentelemetry-instrumentation/'
    text: En savoir plus sur Datadog et l'initiative OpenTelemetry
---
L'instrumentation personnalisée consiste à écrire du code afin de créer, modifier ou supprimer des traces à envoyer à Datadog. Cela vous permet d'effectuer un tracing du code interne qui n'est pas couvert par l'instrumentation automatique, de supprimer les spans non pertinentes de vos traces, de renforcer votre visibilité et de profiter d'un contexte plus complet dans les spans, notamment via l'ajout de [tags de span][1].

Avant d'instrumenter votre application, étudiez la [terminologie de l'APM][2] Datadog et familiarisez-vous avec les concepts clés de l'APM Datadog.

Si vous utilisez déjà OpenTracing ou OpenTelemetry, consultez [OpenTracing et OpenTelemetry][3].

{{< partial name="apm/apm-manual-instrumentation.html" >}}


<br>

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/tracing/guide/add_span_md_and_graph_it/
[2]: /fr/tracing/visualization
[3]: /fr/tracing/setup_overview/open_standards/