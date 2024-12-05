---
aliases:
- /tracing/setup_overview/open_standards/otel_collector_datadog_exporter/
- /tracing/trace_collection/open_standards/otel_collector_datadog_exporter/
- /opentelemetry/otel_collector_datadog_exporter/
description: Envío de datos de OpenTelemetry al OpenTelemetry Collector y el explorador
  de Datadog
further_reading:
- link: https://opentelemetry.io/docs/collector/
  tag: Sitio externo
  text: Documentación de Collector
- link: https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter/
  tag: Blog
  text: Envío de métricas, trazas y logs desde OpenTelemetry Collector a Datadog con
    el exportador de Datadog
- link: https://www.datadoghq.com/blog/hivemq-opentelemetry-monitor-iot-applications/
  tag: Blog
  text: Uso de HiveMQ y OpenTelemetry para monitorizar aplicaciones IoT en Datadog
- link: /metrics/open_telemetry/otlp_metric_types
  tag: Documentación
  text: Tipo de métricas OTLP
title: OpenTelemetry Collector y el exportador de Datadog
---

## Información general

El OpenTelemetry Collector es un proceso del Agent de proveedor agnóstico para recopilar y exportar datos de telemetría emitidos por muchos procesos. El [Exportador de Datadog][1] para OpenTelemetry Collector te permite reenviar trazas (traces), métricas y datos de logs de SDKs de OpenTelemetry a Datadog (sin el Datadog Agent). Funciona con todos los lenguajes compatibles y puedes [conectar los datos de traza de OpenTelemetry con logs de aplicación][2].

{{< img src="metrics/otel/datadog_exporter.png" alt="Biblioteca instrumentada de aplicaciones, integraciones en la nube y otras soluciones de monitorización (por ejemplo, Prometheus) -> Exportador de Datadog dentro de OpenTelemetry Collector -> Datadog" style="width:100%;">}}

## Utilización de Collector

La siguiente documentación describe cómo desplegar y configurar el Collector:

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/collector_exporter/deployment/" >}}Despliegue{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/collector_exporter/configuration/" >}}Configuración{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/integrations/" >}}Integraciones{{< /nextlink >}}
{{< /whatsnext >}}

## Dashboards predefinidos

Datadog proporciona dashboards 'predefinidos' que puedes copiar y personalizar. Para utilizar dashboards de OpenTelemetry predefinidos de Datadog:

1. Instala la [integración de OpenTelemetry][9].
2. Ve a **Dashboards** > **Dashboards list** (Dashboards > Lista de dashboards) y busca `opentelemetry`:

   {{< img src="metrics/otel/dashboard.png" alt="La Lista de dashboards, que muestra dos dashboards predefinidos de OpenTelemetry: métricas de host y métricas de Collector." style="width:80%;">}}

El dashboard **Métricas de host** es para los datos recopilados del [receptor de métricas de host][7]. El dashboard **Métricas de Collector** es para cualquier otro tipo de métricas recopiladas, dependiendo de qué [receptor de métricas][8] elijas habilitar.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[2]: /es/tracing/other_telemetry/connect_logs_and_traces/opentelemetry
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/hostmetricsreceiver
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver
[9]: https://app.datadoghq.com/integrations/otel