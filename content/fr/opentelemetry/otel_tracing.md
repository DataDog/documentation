---
aliases:
- /fr/tracing/setup_overview/open_standards/
- /fr/tracing/trace_collection/open_standards/
description: Utiliser des standards ouverts pour générer les traces de vos applications
further_reading:
- link: tracing/glossary/
  tag: OpenTelemetry
  text: Documentation sur le Collector
- link: /tracing/other_telemetry/connect_logs_and_traces/opentelemetry
  tag: Documentation
  text: Associer vos traces OpenTelemetry à vos logs
kind: documentation
title: Collecte de traces via OpenTelemetry
---

## Présentation

Si vos applications et services sont instrumentées avec des bibliothèques [OpenTelemetry][1], vous pouvez opter pour l'une des deux approches suivantes pour obtenir les données de tracing depuis le backend Datadog :

1. [Envoyer les traces au Collector OpenTelemetry, puis utiliser l'exportateur Datadog pour les transmettre à Datadog][2], ou

2. [Ingérer les traces avec l'Agent Datadog, qui les recueille pour Datadog][3]

Consultez la [documentation OpenTelemetry][4] pour en savoir plus.

## Associer vos traces OpenTelemetry à vos logs

Vous pouvez associer vos traces OpenTelemetry à vos logs afin de profiter des données de contexte offertes par les traces OpenTelemetry lorsque vous surveillez et analysez vos logs d'application, consultez la section [Associer vos traces OpenTelemetry à vos logs][5] pour obtenir des instructions et des exemples de code pour votre langage.

## OpenTracing

Datadog vous conseille d'utiliser l'exportateur Datadog pour le Collector OpenTelemetry ou l'ingestion OTLP dans l'Agent Datadog avec les clients de tracing OpenTelemetry. Toutefois, si cette méthode ne fonctionne pas pour vous, sachez que chaque langage compatible prend également en charge l'envoi de données [OpenTracing][6] à Datadog. Les instructions de configuration d'OpenTracing pour chaque langage pris en charge sont [disponibles ici][7]. 

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/
[2]: /fr/opentelemetry/otel_collector_datadog_exporter/
[3]: /fr/opentelemetry/otlp_ingest_in_the_agent/
[4]: /fr/opentelemetry/
[5]: /fr/tracing/other_telemetry/connect_logs_and_traces/opentelemetry/
[6]: https://opentracing.io/docs/
[7]: /fr/tracing/trace_collection/open_standards/java