---
aliases:
- /es/opentelemetry/otel_terms/
further_reading:
- link: https://opentelemetry.io/docs/concepts/
  tag: Sitio externo
  text: Conceptos de OpenTelemetry
- link: https://opentelemetry.io/docs/concepts/glossary/
  tag: Sitio externo
  text: Glosario de OpenTelemetry
- link: https://docs.datadoghq.com/glossary/
  tag: Documentación
  text: Glosario de Datadog
title: Términos y conceptos de OpenTelemetry
---

Esta página describe términos y conceptos esenciales de OpenTelemetry y Datadog. Para ver definiciones y descripciones adicionales, consulta el [glosario de OpenTelemetry][6].

| Concepto                      | Descripción                                                                                                                                                                                                                                                      |
|------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Telemetría                    | Recopilación de métricas, logs, trazas (traces) y perfiles que proporcionan observaciones sobre los comportamientos y el rendimiento de las aplicaciones y la infraestructura.                                                                                                                    |
| [OpenTelemetry Collector][1] | Implementación independiente del proveedor para recopilar y exportar datos de telemetría emitidos por varios procesos. Puede configurarse para recibir, procesar y exportar telemetría a uno o varios destinos, incluidos los backends de almacenamiento y las herramientas de análisis.            |
| [Datadog Exporter][2]        | Componente OTel Collector que te permite reenviar datos de trazas, métricas y logs desde los SDK de OpenTelemetry a Datadog.                                                                                                                                                               |
| [OTLP Receiver][3]           | Componente dentro de OpenTelemetry Collector responsable de aceptar datos de telemetría en el formato OpenTelemetry Protocol (OTLP). OTLP es el protocolo nativo de OpenTelemetry, diseñado para transferir datos de telemetría entre los SDK y el Collector. |
| [Propagación del contexto][4]     | Mecanismo utilizado en el rastreo distribuido para conservar el contexto de rastreo en diferentes servicios.                                                                                                                                                                   |
| [Convenciones semánticas][5]    | Patrones de nomenclatura y definiciones de atributos normalizados que establecen una terminología coherente para los datos de telemetría en diferentes sistemas e implementaciones. Estas convenciones garantizan que los datos recopilados de diversas fuentes puedan procesarse y analizarse de manera uniforme.                                                                                                                                                      |

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/opentelemetry/collector_exporter/
[2]: /es/opentelemetry/collector_exporter/otel_collector_datadog_exporter/
[3]: /es/opentelemetry/collector_exporter/otlp_receiver/
[4]: /es/opentelemetry/reference/trace_context_propagation/
[5]: /es/opentelemetry/schema_semantics/semantic_mapping/
[6]: https://opentelemetry.io/docs/concepts/glossary/