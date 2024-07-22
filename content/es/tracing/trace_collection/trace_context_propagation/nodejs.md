---
code_lang: nodejs
code_lang_weight: 40
further_reading:
- link: https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/
  tag: Blog
  text: Monitorizar aplicaciones instrumentadas con OpenTelemetry compatibles con
    el contexto de rastreo de W3C
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: Documentación
  text: Interoperabilidad de la API de OpenTelemetry e instrumentación de trazas de
    Datadog
title: Propagación del contexto de rastreo de Node.js
type: multi-code-lang
---

El rastreador de Datadog APM admite la extracción e inyección de encabezados [B3][5] y [contexto de rastreo W3C][6] para el rastreo distribuido.

Puedes configurar estilos de inyección y extracción para encabezados distribuidos.

El rastreador de Node.js admite los siguientes estilos:

- Datadog: `datadog`
- Encabezado múltiple B3: `b3multi` (el alias `B3` está obsoleto)
- Contexto de rastreo W3C: `tracecontext`
- Encabezado único B3: `B3 single header`

El ajuste por defecto tanto para el estilo de inyección como para el de extracción es `datadog,tracecontext`.

Para más información sobre la configuración de propagación de contexto, lee [Configuración de biblioteca de rastreo de Node.js][1].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_collection/library_config/nodejs/#headers-extraction-and-injection
[5]: https://github.com/openzipkin/b3-propagation
[6]: https://www.w3.org/TR/trace-context/#trace-context-http-headers-format
