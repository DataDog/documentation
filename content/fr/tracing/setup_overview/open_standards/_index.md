---
aliases: null
description: Utiliser des standards ouverts pour générer les traces de vos applications
further_reading:
- link: https://opentelemetry.io/docs/collector/
  tag: OpenTelemetry
  text: Documentation Collector
- link: https://www.datadoghq.com/blog/opentelemetry-instrumentation/
  tag: Blog
  text: Partenariat de Datadog avec OpenTelemetry
- link: /tracing/connect_logs_and_traces/opentelemetry
  tag: Documentation
  text: Associer vos traces OpenTelemetry à vos logs
- link: https://www.datadoghq.com/blog/aws-opentelemetry-lambda-layer-datadog/
  tag: Blog
  text: En savoir plus sur la couche Lambda gérée AWS pour OpenTelemetry
kind: documentation
title: OpenTelemetry et OpenTracing
---
Datadog prend en charge un large éventail de standards ouverts, notamment [OpenTelemetry][1] et [OpenTracing][2].

## Approches à suivre pour utiliser OpenTelemetry avec des composants Datadog

Si vos applications et services sont instrumentées avec des bibliothèques OpenTelemetry, vous pouvez opter pour l'une des deux approches suivantes pour obtenir les données de tracing depuis le backend Datadog :

1. [Envoyer des traces au Collector OpenTelemetry, puis utiliser l'exportateur Datadog pour les transmettre à Datadog][3], ou

2. [Ingérer les traces avec l'Agent Datadog, qui les recueille pour Datadog][4]

{{< img src="tracing/setup/open_standards/otel-flow.png" alt="Représentation des différentes approches permettant de générer des données de tracing et de les envoyer aux solutions d'observabilité">}}

## Associer vos traces OpenTelemetry à vos logs

Pour associer vos traces OpenTelemetry à vos logs et ainsi profiter des données de contexte offertes par les traces OpenTelemetry lorsque vous surveillez et analysez vos logs d'application, consultez la section [Associer vos traces OpenTelemetry à vos logs][5] pour obtenir des instructions et des exemples de code pour votre langage.

## Solutions alternatives

Datadog vous conseille d'utiliser l'exportateur Datadog pour le Collector OpenTelemetry ou l'ingestion OTLP dans l'Agent Datadog avec les clients de tracing OpenTelemetry. Toutefois, si cette méthode ne fonctionne pas pour vous, sachez que chaque langage compatible prend également en charge l'[envoi de données OpenTracing à Datadog][6].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/
[2]: https://opentracing.io/docs/
[3]: /fr/tracing/setup_overview/open_standards/otel_collector_datadog_exporter/
[4]: /fr/tracing/setup_overview/open_standards/otlp_ingest_in_the_agent/
[5]: /fr/tracing/connect_logs_and_traces/opentelemetry
[6]: /fr/tracing/setup_overview/open_standards/java