---
further_reading:
- link: https://micrometer.io/docs/registry/otlp
  tag: Micrometer
  text: Micrometer OTLP
- link: https://micrometer.io/docs/registry/prometheus
  tag: Micrometer
  text: Micrometer Prometheus
title: Envoyer des métriques avec Micrometer
---

## Présentation

[Micrometer][1] est une interface indépendante de tout fournisseur qui offre un accès à des métriques et permet de les analyser dans leur contexte. Elle est souvent utilisée avec une application Spring Boot Java en tant que couche d'abstraction pour envoyer des métriques.

Micrometer propose plusieurs modes d'intégration avec Datadog. Ce guide décrit les options conseillées par Datadog pour l'utiliser avec l'Agent afin d'envoyer des métriques à Datadog.

## OpenTelemetry

L'ingestion avec le protocole OpenTelemetry (OTLP) par l'Agent Datadog vous permet d'exploiter la fonctionnalité d'observabilité dans l'Agent Datadog.

{{< whatsnext desc="Consultez la configuration détaillée dans la documentation suivante :" >}}
    {{< nextlink href="/opentelemetry/otlp_ingest_in_the_agent/" >}}Ingestion OTLP par l'Agent Datadog{{< /nextlink >}}
{{< /whatsnext >}}

## Prometheus et OpenMetrics

Utilisez les intégrations Prometheus ou OpenMetrics pour envoyer les métriques de votre application à Datadog. 

{{< whatsnext desc="Consultez la configuration détaillée dans la documentation suivante :" >}}
    {{< nextlink href="/integrations/guide/prometheus-host-collection/#presentation" >}}Collecte de métriques Prometheus et OpenMetrics à partir d'un host{{< /nextlink >}}
    {{< nextlink href="/containers/kubernetes/prometheus/?tab=kubernetesadv2" >}}Collecte de métriques Prometheus et OpenMetrics avec Kubernetes{{< /nextlink >}}
    {{< nextlink href="/containers/docker/prometheus/?tab=standard" >}}Collecte de métriques Prometheus et OpenMetrics avec Docker{{< /nextlink >}}
{{< /whatsnext >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://micrometer.io/