---
code_lang: java
code_lang_weight: 0
further_reading:
- link: https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/
  tag: Blog
  text: Monitorizar aplicaciones instrumentadas con OpenTelemetry compatibles con
    el contexto de rastreo de W3C
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: Documentación
  text: Interoperabilidad de la API de OpenTelemetry e instrumentación de trazas de
    Datadog
title: Propagación del contexto de rastreo de Java
type: multi-code-lang
---


El rastreador de Datadog APM admite la extracción e inyección de encabezados [B3][13] y [contexto de rastreo W3C][14] para el rastreo distribuido.

Puedes configurar estilos de inyección y extracción para encabezados distribuidos.

El rastreador de Java admite los siguientes estilos:

- Datadog: `datadog`
- Encabezado múltiple B3: `b3multi` (el alias `b3` está obsoleto)
- Contexto de rastreo W3C: `tracecontext` (disponible desde 1.11.0)
- Encabezado único B3: `b3 single header` (`b3single`)

Los estilos de inyección pueden configurarse mediante:

- Propiedad del sistema: `-Ddd.trace.propagation.style.inject=datadog,b3multi`
- Variable de entorno: `DD_TRACE_PROPAGATION_STYLE_INJECT=datadog,b3multi`

El valor de la propiedad o variable de entorno es una lista separada por comas (o espacios) de los estilos de encabezado que están habilitados para la inyección. La configuración predeterminada son los estilos de inyección `datadog,tracecontext`.

Los estilos de extracción pueden configurarse mediante:

- Propiedad del sistema: `-Ddd.trace.propagation.style.extract=datadog,b3multi`
- Variable de entorno: `DD_TRACE_PROPAGATION_STYLE_EXTRACT=datadog,b3multi`

El valor de la propiedad o variable de entorno es una lista separada por comas (o espacios) de los estilos de encabezado que están habilitados para la extracción. Por defecto, los estilos de extracción `datadog` y `tracecontext` se habilitan con el ajuste `datadog,tracecontext`, lo que significa que el estilo `datadog` tiene mayor prioridad que el estilo `tracecontext`.

Cuando están habilitados varios estilos de extracción, el intento de extracción se realiza en el orden en que están configurados dichos estilos, utilizando el primer valor extraído con éxito. Si se encuentran contextos de rastreo válidos posteriores, se terminan y se anexan como enlaces del tramo. Además, si el estilo `tracecontext` está habilitado, el estado de trazo W3C se propaga si el trazo principal W3C coincide con el contexto extraído.

Para detalles de referencia sobre la configuración de propagación de contexto y otra configuración, lee [Configuración de biblioteca de rastreo de Java][1].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_collection/library_config/java/#headers-extraction-and-injection
[13]: https://github.com/openzipkin/b3-propagation
[14]: https://www.w3.org/TR/trace-context/#trace-context-http-headers-format
