---
title: Instrumentation manuelle
kind: documentation
decription: Instrumentez manuellement votre application afin d'envoyer des traces personnalisées à Datadog.
aliases:
  - /fr/tracing/setup/php/manual-installation
  - /fr/agent/apm/php/manual-installation
  - /fr/tracing/guide/distributed_tracing/
  - /fr/tracing/advanced/manual_instrumentation/
further_reading:
  - link: tracing/guide/instrument_custom_method
    text: Instrumenter une méthode personnalisée pour analyser en détail votre logique opérationnelle
  - link: tracing/connect_logs_and_traces
    text: Associer vos logs à vos traces
  - link: tracing/opentracing
    text: Implémenter Opentracing dans vos applications
  - link: tracing/visualization/
    text: 'Explorer vos services, ressources et traces'
---
L'instrumentation manuelle consiste à écrire du code afin de créer des traces à envoyer à Datadog. Cela vous permet d'effectuer un tracing du code interne qui n'est pas pris en compte par l'instrumentation automatique. Avant d'instrumenter votre application, consultez la [terminologie de l'APM][1] de Datadog et passez en revue les concepts de base de l'APM.

Sélectionnez un langage ci-dessous pour découvrir comment instrumenter manuellement votre application :

{{< partial name="apm/apm-manual-instrumentation.html" >}}

[1]: /fr/tracing/visualization/