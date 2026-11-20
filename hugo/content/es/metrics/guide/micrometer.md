---
description: Envíe métricas de aplicación desde Micrometer a Datadog usando OpenTelemetry,
  Prometheus o OpenMetrics.
further_reading:
- link: https://docs.micrometer.io/micrometer/reference/implementations/otlp.html
  tag: Sitio externo
  text: Micrometer OTLP
- link: https://docs.micrometer.io/micrometer/reference/implementations/prometheus.html
  tag: Sitio externo
  text: Micrometer Prometheus
title: Envíe métricas con Micrometer
---
## Descripción general {#overview}

[Micrometer][1] es una interfaz neutral respecto al proveedor que permite el acceso a métricas con la capacidad de analizarlas a través de sus dimensiones. A menudo se usa con una aplicación Java Spring Boot como una capa de abstracción para enviar métricas.

Micrometer ofrece múltiples formas de integrarse con Datadog. Esta guía describe las opciones recomendadas por Datadog para usar con el Agent para enviar métricas a Datadog.

## OpenTelemetry {#opentelemetry}

La ingesta del protocolo OpenTelemetry (OTLP) por parte del Datadog Agent le permite aprovechar la función de observabilidad del Datadog Agent.

{{< whatsnext desc="Consulte la configuración descrita en la siguiente documentación:" >}}
    {{< nextlink href="/opentelemetry/otlp_ingest_in_the_agent/" >}}Configure el punto de conexión OTLP del Agent{{< /nextlink >}}
{{< /whatsnext >}}

## Prometheus y OpenMetrics {#prometheus-and-openmetrics}

Use las Integrations de Prometheus u OpenMetrics para enviar las métricas de su aplicación a Datadog. 

{{< whatsnext desc="Consulte la configuración descrita en la siguiente documentación:" >}}
    {{< nextlink href="/integrations/guide/prometheus-host-collection/#overview" >}}Recopilación de métricas de Prometheus y OpenMetrics desde un servidor{{< /nextlink >}}
    {{< nextlink href="/containers/kubernetes/prometheus/?tab=kubernetesadv2" >}}Recopilación de métricas de Prometheus y OpenMetrics en Kubernetes{{< /nextlink >}}
    {{< nextlink href="/containers/docker/prometheus/?tab=standard" >}}Recopilación de métricas de Prometheus y OpenMetrics en Docker{{< /nextlink >}}
{{< /whatsnext >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://micrometer.io/