---
description: Envoyez des métriques d'application de Micrometer vers Datadog en utilisant
  OpenTelemetry, Prometheus ou OpenMetrics.
further_reading:
- link: https://docs.micrometer.io/micrometer/reference/implementations/otlp.html
  tag: Site externe
  text: Micrometer OTLP
- link: https://docs.micrometer.io/micrometer/reference/implementations/prometheus.html
  tag: Site externe
  text: Micrometer Prometheus
title: Envoyez des métriques avec Micrometer
---
## Présentation {#overview}

[Micrometer][1] est une interface neutre vis-à-vis des fournisseurs qui permet d'accéder aux métriques avec la possibilité de les analyser à travers leurs dimensions. Souvent utilisée avec une application Java Spring Boot comme couche d'abstraction pour soumettre des métriques.

Micrometer offre plusieurs façons de s'intégrer à Datadog. Ce guide présente les options recommandées par Datadog à utiliser avec l'Agent pour envoyer des métriques à Datadog.

## OpenTelemetry {#opentelemetry}

L'ingestion du protocole OpenTelemetry (OTLP) par le Datadog Agent vous permet de tirer parti des fonctionnalités d'observabilité du Datadog Agent.

{{< whatsnext desc="Consultez la configuration décrite dans la documentation suivante :" >}}
    {{< nextlink href="/opentelemetry/otlp_ingest_in_the_agent/" >}}Configurez l'endpoint OTLP de l'Agent{{< /nextlink >}}
{{< /whatsnext >}}

## Prometheus et OpenMetrics {#prometheus-and-openmetrics}

Utilisez les Integrations Prometheus ou OpenMetrics pour envoyer vos métriques d'application à Datadog. 

{{< whatsnext desc="Consultez la configuration décrite dans la documentation suivante :" >}}
    {{< nextlink href="/integrations/guide/prometheus-host-collection/#overview" >}}Collecte de métriques Prometheus et OpenMetrics à partir d'un host{{< /nextlink >}}
    {{< nextlink href="/containers/kubernetes/prometheus/?tab=kubernetesadv2" >}}Collecte de métriques Prometheus et OpenMetrics pour Kubernetes{{< /nextlink >}}
    {{< nextlink href="/containers/docker/prometheus/?tab=standard" >}}Collecte de métriques Prometheus et OpenMetrics pour Docker{{< /nextlink >}}
{{< /whatsnext >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://micrometer.io/