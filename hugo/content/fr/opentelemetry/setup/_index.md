---
further_reading:
- link: /opentelemetry/instrument/
  tag: Documentation
  text: Instrumenter vos applications
- link: https://www.datadoghq.com/blog/otel-deployments/
  tag: Blog
  text: Comment choisir votre déploiement OpenTelemetry
- link: https://learn.datadoghq.com/courses/otel-with-datadog
  tag: Centre d'apprentissage
  text: Introduction à OpenTelemetry avec Datadog
- link: https://learn.datadoghq.com/courses/using-ddot
  tag: Centre d'apprentissage
  text: Distribution Datadog du collecteur OpenTelemetry
title: Envoyer des données OpenTelemetry à Datadog
---
Cette page décrit toutes les manières dont vous pouvez envoyer des données OpenTelemetry (OTel) à Datadog.

## Collecteur DDOT (Recommandé) {#ddot-collector-recommended}

La distribution Datadog du collecteur OpenTelemetry (DDOT) est une solution open source qui combine la flexibilité d'OpenTelemetry avec les capacités d'observabilité complètes de Datadog.

Cette approche vous donne un contrôle total sur les pipelines OpenTelemetry tout en offrant un accès à des fonctionnalités puissantes basées sur le Datadog Agent, notamment :

- Fleet Automation
- Container Monitoring en direct
- Kubernetes Explorer
- Live Processes
- Cloud Network Monitoring
- Universal Service Monitoring
- {{< translate key="integration_count" >}}+ Intégrations Datadog

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/ddot_collector/install/" >}}
    <h3>Install the DDOT Collector</h3>
    Follow our guided setup to install the Collector and start sending your OpenTelemetry data to Datadog.
    {{< /nextlink >}}
{{< /whatsnext >}}

## Autres options de configuration {#other-setup-options}

Des méthodes alternatives sont disponibles pour des cas d'utilisation spécifiques, comme l'exécution de votre propre distribution du collecteur OpenTelemetry ou le fonctionnement dans des environnements non-Kubernetes.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/collector_exporter/" >}}
    <h3>Upstream OpenTelemetry Collector</h3>
    Best for: Users who manage their own OpenTelemetry Collector or require advanced processing capabilities like tail-based sampling.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/setup/otlp_ingest_in_the_agent" >}}
    <h3>OTLP Ingest in the Agent</h3>
    Best for: Users on platforms other than Kubernetes Linux, or those who prefer a minimal configuration without managing Collector pipelines.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/setup/agentless" >}}
    <h3>Direct OTLP Ingest</h3>
    Best for: Situations requiring direct data transmission to Datadog's intake endpoint without any intermediary components.
    {{< /nextlink >}}
{{< /whatsnext >}}

<div class="alert alert-info"><strong>Vous n'êtes toujours pas certain de la configuration qui vous convient ?</strong><br> Consultez le tableau <a href="/opentelemetry/compatibility/">Compatibilité des fonctionnalités</a> pour comprendre quelles fonctionnalités Datadog sont prises en charge.</div>

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/opentelemetry/setup/agent
[2]: /fr/opentelemetry/setup/collector_exporter/
[3]: /fr/opentelemetry/setup/agentless
[4]: /fr/opentelemetry/ingestion_sampling#tail-based-sampling
[5]: /fr/opentelemetry/agent
[6]: /fr/opentelemetry/setup/otlp_ingest_in_the_agent