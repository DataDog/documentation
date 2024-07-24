---
code_lang: go
code_lang_weight: 30
further_reading:
- link: https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/
  tag: Blog
  text: Monitorizar aplicaciones instrumentadas con OpenTelemetry compatibles con
    el contexto de rastreo de W3C
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: Documentación
  text: Interoperabilidad de la API de OpenTelemetry e instrumentación de trazas de
    Datadog
title: Propagación del contexto de rastreo de Go
type: multi-code-lang
---


El rastreador de Datadog APM admite la extracción e inyección de encabezados [B3][8] y [contexto de rastreo W3C][10] para el rastreo distribuido.

La inyección y extracción de encabezados distribuidos se controla mediante
la configuración de estilos de inyección/extracción. Los estilos compatibles son:
`tracecontext`, `datadog`, `B3` y `B3 single header`.

- Configura estilos de inyección con la variable de entorno `DD_TRACE_PROPAGATION_STYLE_INJECT=tracecontext,B3`.
- Configura estilos de extracción con la variable de entorno `DD_TRACE_PROPAGATION_STYLE_EXTRACT=tracecontext,B3`.
- Configura tanto estilos de inyección como de extracción con la variable de entorno `DD_TRACE_PROPAGATION_STYLE=tracecontext,B3`.

Los valores de estas variables de entorno son listas separadas por comas de
estilos de encabezados habilitados para la inyección o extracción. Por defecto,
los estilos `datadog,tracecontext` están habilitados.

Para desactivar la propagación del contexto de rastreo, establece el valor de las variables de entorno en `none`.
- Desactiva los estilos de inyección con la variable de entorno `DD_TRACE_PROPAGATION_STYLE_INJECT=none`.
- Desactiva los estilos de extracción mediante la variable de entorno `DD_TRACE_PROPAGATION_STYLE_EXTRACT=none`.
- Desactiva toda propagación de contexto de rastreo (tanto inyección como extracción) con la variable de entorno `DD_TRACE_PROPAGATION_STYLE=none`.

Si se establecen varias variables de entorno, `DD_TRACE_PROPAGATION_STYLE_INJECT` y `DD_TRACE_PROPAGATION_STYLE_EXTRACT`
anulan cualquier valor proporcionado en `DD_TRACE_PROPAGATION_STYLE`.

Si se activan varios estilos de extracción, los intentos de extracción se realizan
en el orden en que se especifican dichos estilos. Se utiliza el primer valor
extraído con éxito.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}


[8]: https://github.com/openzipkin/b3-propagation
[10]: https://github.com/w3c/trace-context