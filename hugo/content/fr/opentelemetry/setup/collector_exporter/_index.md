---
description: Envoyez des données OpenTelemetry au collecteur OpenTelemetry et à l'exportateur
  Datadog.
further_reading:
- link: /opentelemetry/setup/ddot_collector/install/
  tag: Documentation
  text: Installez le collecteur DDOT (recommandé)
- link: /opentelemetry/compatibility/
  tag: Documentation
  text: Compatibilité des fonctionnalités
- link: https://www.datadoghq.com/architecture/opentelemetry-collector-in-kubernetes/
  tag: Architecture Center
  text: Collecteur OpenTelemetry dans Kubernetes
title: Installez et configurez le collecteur OpenTelemetry
---
## Présentation {#overview}

Cette page fournit des guides pour installer et configurer un collecteur OpenTelemetry autonome afin d'envoyer des données de télémétrie à Datadog.

Cette méthode est idéale pour les utilisateurs qui préfèrent utiliser les distributions du collecteur OTel de la communauté open source OpenTelemetry ou qui ont besoin de capacités de traitement avancées non disponibles dans d'autres configurations. Pour la plupart des cas d'utilisation, la [distribution Datadog du collecteur OTel (DDOT)][1] est l'approche recommandée.

## Configuration {#setup}

Pour commencer, installez le collecteur OpenTelemetry et configurez-le avec l'exportateur Datadog. Ce guide vous accompagne dans la configuration initiale requise avant de passer à des sujets de configuration plus spécifiques.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/collector_exporter/install" >}}
    <h3>Install and Configure the Collector</h3>
    Follow the initial setup steps to get a Collector running with the Datadog Exporter.
    {{< /nextlink >}}
{{< /whatsnext >}}

## Configuration {#configuration}

Une fois votre collecteur en cours d'exécution, utilisez ces guides pour configurer des récepteurs et des processeurs spécifiques afin de collecter et d'enrichir vos données de télémétrie.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/collector_exporter/deploy" >}}
    <h3>Deploy the Collector</h3>
    Learn how to run the Collector in various environments, including on a host, in Docker, or as a DaemonSet or Gateway in Kubernetes.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/config/hostname_tagging" >}}
    <h3>Configure Hostname and Tagging</h3>
    Use resource detection and Kubernetes attributes processors to ensure proper hostname resolution and apply critical tags for correlating telemetry in Datadog.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/config/log_collection" >}}
    <h3>Set up Log Collection</h3>
    Configure the filelog receiver to collect logs from files and forward them to Datadog, enabling unified logs, metrics, and traces.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/config/otlp_receiver" >}}
    <h3>Enable the OTLP Receiver</h3>
    Configure the OTLP receiver to accept traces, metrics, and logs from your OpenTelemetry-instrumented applications over gRPC or HTTP.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/config/collector_batch_memory" >}}
    <h3>Tune Batch and Memory Settings</h3>
    Optimize your Collector's performance and resource consumption by configuring the batch processor and memory limiter.
    {{< /nextlink >}}
{{< /whatsnext >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/opentelemetry/setup/ddot_collector/install/