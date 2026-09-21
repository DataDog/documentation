---
description: Envíe datos de OpenTelemetry al OpenTelemetry Collector y al Datadog
  Exporter
further_reading:
- link: /opentelemetry/setup/ddot_collector/install/
  tag: Documentación
  text: Instale el DDOT Collector (Recomendado)
- link: /opentelemetry/compatibility/
  tag: Documentación
  text: Compatibilidad de funciones
- link: https://www.datadoghq.com/architecture/opentelemetry-collector-in-kubernetes/
  tag: Centro de arquitectura
  text: OpenTelemetry Collector en Kubernetes
title: Instale y configure el OpenTelemetry Collector
---
## Descripción general {#overview}

Esta página proporciona guías para instalar y configurar un OpenTelemetry Collector independiente para enviar datos de telemetría a Datadog.

Este método es ideal para los usuarios que prefieren utilizar distribuciones del OTel Collector de la comunidad de código abierto de OpenTelemetry o que requieren capacidades de procesamiento avanzadas que no están disponibles en otras configuraciones. Para la mayoría de los casos de uso, la [Datadog Distribution of OTel Collector (DDOT)][1] es el enfoque recomendado.

## Configuración {#setup}

Para comenzar, instale el OpenTelemetry Collector y configúrelo con el Datadog Exporter. Esta guía lo orienta a través de la configuración inicial necesaria antes de proceder a temas de configuración más específicos.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/collector_exporter/install" >}}
    <h3>Install and Configure the Collector</h3>
    Follow the initial setup steps to get a Collector running with the Datadog Exporter.
    {{< /nextlink >}}
{{< /whatsnext >}}

## Configuración {#configuration}

Una vez que su Collector esté en ejecución, utilice estas guías para configurar receptores y procesadores específicos para recopilar y enriquecer sus datos de telemetría.

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

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/opentelemetry/setup/ddot_collector/install/