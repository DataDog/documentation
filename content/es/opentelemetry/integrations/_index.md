---
further_reading:
- link: /opentelemetry/schema_semantics/metrics_mapping/
  tag: Documentación
  text: Asignación de métricas de OpenTelemetry
title: Integraciones
---

Esta página cubre integraciones OpenTelemetry (OTel) compatibles con Datadog. Estas integraciones le permiten recopilar y monitorizar tus datos de observabilidad utilizando OpenTelemetry en Datadog.

## Información general

Las integraciones OpenTelemetry (OTel) son componentes que permiten la recopilación de datos de observabilidad (métricas, trazas (traces) y logs) de diversas fuentes utilizando el estándar OpenTelemetry. Estas integraciones están diseñadas para funcionar con OpenTelemetry Collector, que recibe, procesa y exporta datos de telemetría a backends de observabilidad como Datadog.

Para obtener una lista completa de todas las integraciones OpenTelemetry, consulta el [registro de OpenTelemetry][1]. Este registro proporciona información sobre receptores, exportadores y otros componentes del ecosistema OpenTelemetry.

## Integraciones OpenTelemetry (OTel) compatibles con Datadog

Datadog admite las siguientes integraciones OpenTelemetry:

### APM (Application Performance Monitoring)

Monitoriza y optimiza el rendimiento de tu aplicación:

- [Métricas de rastreo][2]
- [Métricas de tiempo de ejecución][3]

### Collector

Monitoriza el estado y el rendimiento de tu OpenTelemetry Collector:

- [Métricas del estado del Collector][8]

### Contenedores y hosts

Obtén información sobre tus sistemas de entornos y hosts en contenedores:

- [Métricas de Docker][4]
- [Métricas de hosts][5]

### Tecnologías de proveedores

Amplía tu capacidad de observación a tecnologías de proveedores populares:

- [Métricas de Kafka][6]

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://opentelemetry.io/ecosystem/registry/
[2]: /es/opentelemetry/integrations/trace_metrics
[3]: /es/opentelemetry/integrations/runtime_metrics/
[4]: /es/opentelemetry/integrations/docker_metrics/
[5]: /es/opentelemetry/integrations/host_metrics/
[6]: /es/opentelemetry/integrations/kafka_metrics/
[8]: /es/opentelemetry/integrations/collector_health_metrics/