---
aliases:
- /es/tracing/trace_collection/otel_instrumentation/ruby/
- /es/tracing/trace_collection/custom_instrumentation/otel_instrumentation/ruby
code_lang: otel
code_lang_weight: 2
description: Instrumenta tu aplicación Ruby con la API de OpenTelemetry, para enviar
  trazas (traces) a Datadog.
further_reading:
- link: tracing/glossary/
  tag: Documentación
  text: Explora tus servicios, recursos y trazas
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: Documentación
  text: Interoperabilidad de la API de OpenTelemetry e instrumentación de trazas de
    Datadog
title: Instrumentación personalizada de Ruby con la API de OpenTelemetry
type: multi-code-lang
---

{{% otel-custom-instrumentation %}}


## Requisitos y limitaciones

- Biblioteca de rastreo de Datadog Ruby `dd-trace-rb` versión 1.9.0 o posterior.
- Compatibilidad con la versión del gem 1.1.0 o posterior.

Las siguientes funciones de OpenTelemetry implementadas en la biblioteca de Datadog como se indica:

| Función                               | Notas de compatibilidad                       |
|---------------------------------------|--------------------------------------|
| [Propagación del contexto de OpenTelemetry][1]         | Los [formatos de encabezado de Datadog y W3C Trace Context][9] están activados por defecto. | 
| [Procesadores de tramo][2]                  | No compatible                                          | 
| [Exportadores de tramo][3]                   | No compatible                                            |
| `OpenTelemetry.logger`                | `OpenTelemetry.logger` se establece en el mismo objeto que `Datadog.logger`. Configura a través del [registro personalizado][10]. |
| [Generadores de ID][4] de traza/tramo         | La generación de ID se realiza mediante la biblioteca de rastreo, con soporte para [IDs de traza de 128-bit][12].     |


## Configuración de OpenTelemetry para utilizar la biblioteca de rastreo de Datadog

1. Añade la instrumentación manual de OpenTelemetry deseada a tu código Ruby siguiendo la [documentación de la Instrumentación manual de OpenTelemetry Ruby][5]. **Importante**: Cuando esas instrucciones indiquen que tu código debe llamar al SDK de OpenTelemetry, llama a la biblioteca de rastreo de Datadog en su lugar.

1. Añade el gem `datadog` a tu Gemfile:

    ```ruby
    source 'https://rubygems.org'
    gem 'datadog' # For dd-trace-rb v1.x, use the `ddtrace` gem.
    ```

1. Instala el gem ejecutando `bundle install`.
1. Añade las siguientes líneas a tu archivo de configuración de OpenTelemetry:

    ```ruby
    require 'opentelemetry/sdk'
    require 'datadog/opentelemetry'
    ```

1. Añade un bloque de configuración a tu aplicación donde puedas activar integraciones y cambiar la configuración del rastreador. Sin configuración adicional aquí, solo el código que has instrumentado con OpenTelemetry es rastreado:

    ```ruby
    Datadog.configure do |c|
      ...
    end
    ```

   Con este bloque puedes:

    - [Añadir ajustes adicionales a la configuración de Datadog][6]
    - [Activar o reconfigurar la instrumentación de Datadog][7]

Datadog combina estos tramos de OpenTelemetry con otros tramos de Datadog APM en una traza única de tu aplicación. También es compatible con [la instrumentación de la integración][7] y [la instrumentación automática de OpenTelemetry][8].

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/instrumentation/ruby/manual/#context-propagation
[2]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-processor
[3]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-exporter
[4]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#id-generators
[5]: https://opentelemetry.io/docs/instrumentation/ruby/manual/
[6]: /es/tracing/trace_collection/dd_libraries/ruby/#additional-configuration
[7]: /es/tracing/trace_collection/dd_libraries/ruby#integration-instrumentation
[8]: https://opentelemetry.io/docs/instrumentation/ruby/automatic/
[9]: /es/tracing/trace_collection/trace_context_propagation/ruby/
[10]: /es/tracing/trace_collection/dd_libraries/ruby/#custom-logging
[12]: /es/opentelemetry/guide/otel_api_tracing_interoperability/