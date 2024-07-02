---
further_reading:
- link: https://www.datadoghq.com/blog/opentelemetry-instrumentation/
  tag: GitHub
  text: Partenariat de Datadog avec OpenTelemetry
- link: https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter/
  tag: GitHub
  text: Envoyer des métriques et des traces depuis le Collector OpenTelemetry vers
    Datadog via l'exportateur Datadog
- link: https://www.datadoghq.com/blog/opentelemetry-logs-datadog-exporter/
  tag: GitHub
  text: Transmettre des logs depuis le Collector OpenTelemetry avec l'exportateur
    Datadog
- link: https://www.datadoghq.com/about/latest-news/press-releases/datadog-announces-opentelemetry-protocol-support/
  tag: GitHub
  text: Ingestion OTLP dans l'Agent
- link: https://www.datadoghq.com/blog/aws-opentelemetry-lambda-layer-datadog/
  tag: GitHub
  text: En savoir plus sur la couche Lambda gérée AWS pour OpenTelemetry
- link: https://www.datadoghq.com/blog/correlate-traces-datadog-rum-otel/
  tag: Blog
  text: Mettre en corrélation les événements RUM Datadog avec les traces de vos applications
    instrumentées via OTel
title: OpenTelemetry dans Datadog
---

## Présentation

[OpenTelemetry][1] (OTel) est un framework d'observabilité open source qui offre aux équipes informatiques des protocoles et des outils normalisés pour recueillir et acheminer des données de télémétrie. Créé en tant que projet incubateur par la [Cloud Native Computing Foundation][2] (CNCF), OTel propose un format standard pour instrumenter, générer et recueillir des données de télémétrie à partir de vos applications (notamment des métriques, des logs et des traces), qui sont ensuite transmises aux plateformes de surveillance en vue de leur analyse.

Si vos applications et services sont instrumentés avec des bibliothèques OpenTelemetry, vous pouvez opter pour l'une des deux approches suivantes pour transmettre les traces, métriques et logs au backend Datadog :

1. [Envoyer les données au Collector OpenTelemetry, puis utiliser l'exportateur Datadog pour les transmettre à Datadog][3], ou

2. [Ingérer les données avec l'Agent Datadog, qui les recueille pour Datadog][4] (métriques et traces uniquement)

{{< img src="tracing/setup/open_standards/otel-flow.png" alt="Représentation des différentes approches permettant de générer des données de télémétrie et de les envoyer aux solutions d'observabilité">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[2]: https://www.cncf.io/
[3]: /fr/opentelemetry/otel_collector_datadog_exporter/
[4]: /fr/opentelemetry/otlp_ingest_in_the_agent/