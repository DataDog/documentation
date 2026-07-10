---
aliases:
- /es/opentelemetry/setup/intake_endpoint/
- /es/opentelemetry/setup/agentless/
further_reading:
- link: /opentelemetry/setup
  tag: Documentación
  text: Envía datos a Datadog
title: Endpoint de ingreso del OTLP de Datadog
---

## Información general

El endpoint de la API de ingreso del protocolo OpenTelemetry (OTLP) de Datadog te permite enviar datos de observabilidad directamente a Datadog. Con esta función, no necesitas ejecutar el [Agent][1] u [OpenTelemetry Collector + Datadog Exporter][2].

{{< img src="/opentelemetry/setup/direct-ingest.png" alt="Diagrama: El SDK de OpenTelemetry envía datos directamente a Datadog a través del endpoint de ingreso." style="width:100%;" >}}

Es posible que prefieras esta opción si buscas una configuración sencilla y quieres enviar telemetría directamente a Datadog sin utilizar el Datadog Agent u OpenTelemetry Collector.

- [Endpoint de ingreso de logs del OTLP][3]
- [Endpoint de ingreso de métricas del OTLP][4]

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/opentelemetry/otlp_ingest_in_the_agent/
[2]: /es/opentelemetry/setup/collector_exporter/
[3]: /es/opentelemetry/setup/intake_endpoint/otlp_logs
[4]: /es/opentelemetry/setup/intake_endpoint/otlp_metrics