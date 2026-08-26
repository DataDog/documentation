---
further_reading:
- link: https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/
  tag: Blog
  text: Monitorizar aplicaciones instrumentadas con OpenTelemetry compatibles con
    el contexto de rastreo de W3C
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: Documentación
  text: Interoperabilidad de la API de OpenTelemetry e instrumentación de trazas de
    Datadog
title: (Legacy) Propagación del contexto de rastreo de Ruby
---

<div class="alert alert-danger">Esta documentación es para e gem <code>ddtrace</code> v1.x. Si estás utilizando el gem <code>datadog</code> v2.0 o posterior, consulta la documentación más reciente de <a href="/tracing/trace_collection/trace_context_propagation/">Propagación del contexto de rastreo Ruby</a>.</div>

### Extracción e inyección de encabezados

El rastreador de Datadog APM admite la extracción e inyección de encabezados [B3][6] y [contexto de rastreo W3C][7] para el rastreo distribuido.

La inyección y extracción de encabezados distribuidos se controla mediante la configuración de los estilos de inyección y extracción. Se admiten los siguientes estilos:

- Datadog: `datadog`
- Encabezado múltiple B3: `b3multi`
- Encabezado simple B3: `b3`
- Contexto de rastreo W3C: `tracecontext`
- Sin elección: `none`

Los estilos de inyección pueden configurarse mediante:

- Variable de entorno: `DD_TRACE_PROPAGATION_STYLE_INJECT=datadog,b3`

El valor de la variable de entorno es una lista separada por comas de los estilos de encabezado que están habilitados para la inyección. El valor por defecto es `datadog,tracecontext`.

Los estilos de extracción pueden configurarse mediante:

- Variable de entorno: `DD_TRACE_PROPAGATION_STYLE_EXTRACT=datadog,b3`

El valor de la variable de entorno es una lista separada por comas de los estilos de encabezado que están habilitados para la extracción. El valor por defecto es `datadog,tracecontext`.

Si se activan varios estilos de extracción, el intento de extracción se realiza en el orden en que se configuran dichos estilos y se utiliza el primer valor extraído con éxito.

Los estilos de extracción por defecto son, por orden, `datadog`, `b3multi`, `b3` y `tracecontext`.

También puedes activar o desactivar el uso de estos formatos en el código mediante `Datadog.configure`:

```ruby
Datadog.configure do |c|
  # List of header formats that should be extracted
  c.tracing.distributed_tracing.propagation_extract_style = [ 'tracecontext', 'datadog', 'b3' ]

  # List of header formats that should be injected
  c.tracing.distributed_tracing.propagation_inject_style = [ 'tracecontext', 'datadog' ]
end
```

Para más información sobre la configuración de la propagación de contextos de rastreo, lee [la sección Rastreo distribuido][1] en los documentos de configuración de la librería de rastreo de Ruby.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_collection/dd_libraries/ruby/#distributed-tracing
[6]: https://github.com/openzipkin/b3-propagation
[7]: https://www.w3.org/TR/trace-context/#trace-context-http-headers-format
