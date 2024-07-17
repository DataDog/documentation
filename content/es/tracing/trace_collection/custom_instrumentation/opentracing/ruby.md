---
aliases:
- /es/tracing/setup_overview/open_standards/ruby
- /es/tracing/trace_collection/open_standards/ruby
- /es/tracing/trace_collection/opentracing/ruby
code_lang: ruby
code_lang_weight: 20
description: ' Instrumentación de OpenTracing para Ruby'
kind: documentación
title: Instrumentación de Ruby OpenTracing
type: multi-code-lang
---

<div class="alert alert-info">OpenTracing se basa en una especificación obsoleta. Si deseas instrumentar tu código con una especificación abierta, utiliza OpenTelemetry en su lugar. Prueba el soporte de fase beta para <a href="/tracing/trace_collection/otel_instrumentation/ruby/">procesar datos de la instrumentación de OpenTelemetry en bibliotecas de rastreo de Datadog</a>.</div>

Para configurar Datadog con OpenTracing, consulta Ruby [Quickstart for OpenTracing][1] para más detalles.

## Configuración del rastreador de Datadog

El rastreador subyacente de Datadog puede configurarse pasando opciones (que coinciden con `Datadog::Tracer`) al configurar el rastreador global:

```ruby
# `options` es un hash de opciones que se manda a Datadog::Tracer
OpenTracing.global_tracer = Datadog::OpenTracer::Tracer.new(options)
```

También puede configurarse con `Datadog.configure` como se describe en la sección [configuración del rastreador de Ruby][2].

## Activación y configuración de integraciones

Por defecto, la configuración de OpenTracing con Datadog no activa automáticamente ninguna instrumentación adicional proporcionada por Datadog. Solo recibirá [tramos][3] y [trazas][4] de la instrumentación de OpenTracing que tengas en tu aplicación.

Sin embargo, la instrumentación adicional proporcionada por Datadog se puede activar junto con OpenTracing mediante `Datadog.configure`. Esta opción se puede utilizar para mejorar aún más tu rastreo. Para activarla, consulta [Instrumentación de la integración de Ruby][5] para más detalles.

## Formatos de serialización admitidos

| Tipo                           | ¿Es compatible? | Información adicional                                                                                                                                                                                                                                                                                        |
| ------------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OpenTracing::FORMAT_TEXT_MAP` | Sí        |                                                                                                                                                                                                                                                                                                               |
| `OpenTracing::FORMAT_RACK`     | Sí        | Debido a la pérdida de resolución en el formato Rack, ten en cuenta que los elementos de información contextual con nombres que contienen caracteres en mayúsculas o `-` are be converted to lower case and `_` en un recorrido completo, respectivamente. Datadog recomienda evitar estos caracteres o modificarlos en consecuencia en el extremo receptor. |
| `OpenTracing::FORMAT_BINARY`   | No         |                                                                                                                                                                                                                                                                                                               |


[1]: /es/tracing/setup/ruby/#quickstart-for-opentracing
[2]: /es/tracing/setup/ruby/#tracer-settings
[3]: /es/tracing/glossary/#spans
[4]: /es/tracing/glossary/#trace
[5]: /es/tracing/setup/ruby/#integration-instrumentation