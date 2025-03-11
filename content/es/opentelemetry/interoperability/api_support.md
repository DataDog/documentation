---
algolia:
  tags:
  - Instrumentación personalizada de otel
further_reading:
- link: tracing/guide/instrument_custom_method
  text: Instrumentar un método personalizado para obtener una visibilidad profunda
    de tu lógica de negocio
- link: tracing/connect_logs_and_traces
  text: Conectar tus logs y trazas
- link: tracing/visualization/
  text: Explora tus servicios, recursos y trazas
- link: https://www.datadoghq.com/blog/opentelemetry-instrumentation/
  text: Más información sobre Datadog y la iniciativa de OpenTelemetry
title: Soporte de la API de OpenTelemetry
---

Las bibliotecas de rastreo de Datadog proporcionan una implementación de la API de OpenTelemetry para instrumentar tu código. Esto significa que puedes mantener una instrumentación de proveedor neutral de todos tus servicios, sin dejar de aprovechar la implementación nativa, las características y los productos de Datadog. Puedes configurarla para generar tramos (spans) y trazas (traces) del estilo de Datadog para que la biblioteca de rastreo de Datadog los procese para tu lenguaje y los envíe a Datadog.

Para más información, sigue el enlace correspondiente a tu lenguaje:

{{< partial name="apm/otel-instrumentation.html" >}}

<br>

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}