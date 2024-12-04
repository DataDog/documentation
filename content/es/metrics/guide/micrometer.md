---
further_reading:
- link: https://docs.micrometer.io/micrometer/reference/implementations/otlp.html
  tag: Sitio externo
  text: Micrometer OTLP
- link: https://docs.micrometer.io/micrometer/reference/implementations/prometheus.html
  tag: Sitio externo
  text: Micrometer Prometheus
title: Envío de métricas con Micrometer
---

## Información general

[Micrometer][1] es una interfaz independiente del proveedor que permite acceder a métricas con la capacidad de analizarlas en todas sus dimensiones. A menudo se utiliza con una aplicación Java Spring Boot como capa de abstracción para la presentación de métricas.

Micrometer ofrece varias formas de integración con Datadog. Esta guía describe las opciones de uso del Agent recomendadas para enviar métricas a Datadog.

## OpenTelemetry

El consumo del OpenTelemetry Protocol (OTLP) por parte del Datadog Agent permite aprovechar la función de observabilidad del Datadog Agent.

{{< whatsnext desc="See the configuration outlined in the following documentation:" >}}
    {{< nextlink href="/opentelemetry/otlp_ingest_in_the_agent/" >}}Consumo del OTLP por parte del Datadog Agent{{< /nextlink >}}
{{< /whatsnext >}}

## Prometheus y OpenMetrics

Utiliza integraciones OpenMetrics o Prometheus para enviar tus métricas de aplicaciones a Datadog. 

{{< whatsnext desc="Consulta la configuración presentada en la siguiente documentación:" >}}
    {{< nextlink href="/integrations/guide/prometheus-host-collection/#overview" >}}Recopilación de métricas de Prometheus y OpenMetrics a partir de un host{{< /nextlink >}}
    {{< nextlink href="/containers/kubernetes/prometheus/?tab=kubernetesadv2" >}}Recopilación de métricas de Kubernetes Prometheus y OpenMetrics{{< /nextlink >}}
    {{< nextlink href="/containers/docker/prometheus/?tab=standard" >}}Recopilación de métricas de Docker Prometheus y OpenMetrics{{< /nextlink >}}
{{< /whatsnext >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://micrometer.io/