---
code_lang: python
code_lang_weight: 10
further_reading:
- link: https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/
  tag: Blog
  text: Monitorizar aplicaciones instrumentadas con OpenTelemetry compatibles con
    el contexto de rastreo de W3C
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: Documentación
  text: Interoperabilidad de la API de OpenTelemetry e instrumentación de trazas de
    Datadog
kind: documentación
title: Propagación del contexto de rastreo de Python
type: multi-code-lang
---

El rastreador de Datadog APM admite la extracción e inyección de encabezados [B3][2] y [contexto de rastreo W3C][3] para el rastreo distribuido.

La inyección y extracción de encabezados distribuidos se controla mediante
la configuración de los estilos de inyección y extracción. Los estilos admitidos son:
`tracecontext`, `datadog`, `b3multi` y `b3 single header`.

- Configura estilos de inyección con la variable de entorno `DD_TRACE_PROPAGATION_STYLE_INJECT=tracecontext,b3multi`.
- Configura estilos de extracción con la variable de entorno `DD_TRACE_PROPAGATION_STYLE_EXTRACT=tracecontext,b3multi`.
- Configura tanto estilos de inyección como de extracción con la variable de entorno `DD_TRACE_PROPAGATION_STYLE=tracecontext,b3multi`.

Los valores de estas variables de entorno son listas separadas por comas de
estilos de encabezados habilitados para la inyección o extracción. Por defecto,
los estilos `datadog,tracecontext` están habilitados.

Para desactivar la propagación del contexto de rastreo, establece el valor de las variables de entorno en `none`.
- Desactiva los estilos de inyección con la variable de entorno `DD_TRACE_PROPAGATION_STYLE_INJECT=none`.
- Desactiva los estilos de extracción mediante la variable de entorno `DD_TRACE_PROPAGATION_STYLE_EXTRACT=none`.
- Desactiva toda propagación de contexto de rastreo (tanto inyección como extracción) con la variable de entorno `DD_TRACE_PROPAGATION_STYLE=none`.

Si se establecen varias variables de entorno, `DD_TRACE_PROPAGATION_STYLE_INJECT` y `DD_TRACE_PROPAGATION_STYLE_EXTRACT`
anulan cualquier valor proporcionado en `DD_TRACE_PROPAGATION_STYLE`.

Cuando están habilitados varios estilos de extracción, el intento de extracción se realiza en el orden en que están configurados dichos estilos,
utilizando el primer valor extraído con éxito. Si se encuentran contextos de rastreo válidos posteriores, se terminan y se anexan
como enlaces del tramo. Además, si el estilo `tracecontext` está habilitado, el estado de traza W3C se propaga si la traza principal W3C coincide con el contexto extraído.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://github.com/openzipkin/b3-propagation
[3]: https://github.com/w3c/trace-context