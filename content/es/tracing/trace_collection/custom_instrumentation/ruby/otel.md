---
aliases:
- /es/tracing/trace_collection/otel_instrumentation/ruby/
- /es/tracing/trace_collection/custom_instrumentation/otel_instrumentation/ruby
code_lang: otel
code_lang_weight: 2
description: Instrumenta tu aplicación de Ruby con la API de OpenTelemetry para enviar
  trazas (traces) a Datadog.
further_reading:
- link: tracing/glossary/
  tag: Documentación
  text: Explora tus servicios, recursos y trazas
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: Documentación
  text: Interoperabilidad de la API de OpenTelemetry e instrumentación de trazas de
    Datadog
title: Ruby Custom Instrumentation mediante la API de OpenTelemetry
type: multi-code-lang
---

{{% otel-custom-instrumentation %}}


## Requisitos y limitaciones

- Biblioteca de rastreo de Datadog Ruby `dd-trace-rb` versión 1.9.0 o posterior.
- Compatibilidad con la versión del gem 1.1.0 o posterior.

Las siguientes funciones de OpenTelemetry implementadas en la librería de Datadog como se indica:

| Función                               | Notas de compatibilidad                       |
|---------------------------------------|--------------------------------------|
| [Propagación del contexto de OpenTelemetry][1]         | Los [formatos de encabezado de Datadog y W3C Trace Context][9] están activados por defecto. |
| [Procesadores de tramo][2]                  | No compatible                                          |
| [Exportadores de tramo][3]                   | No compatible                                            |
| `OpenTelemetry.logger`                | `OpenTelemetry.logger` se establece en el mismo objeto que `Datadog.logger`. Configura a través del [registro personalizado][10]. |
| [Generadores de ID][4] de traza/tramo         | La generación de ID se realiza mediante la librería de rastreo, con soporte para [IDs de traza de 128-bit][12].     |


## Configuración de OpenTelemetry para utilizar la librería de rastreo de Datadog

1. Añade la instrumentación manual de OpenTelemetry deseada a tu código Ruby siguiendo la [documentación de la Instrumentación manual de OpenTelemetry Ruby][5]. **Importante**: Cuando esas instrucciones indiquen que tu código debe llamar al SDK de OpenTelemetry, llama a la librería de rastreo de Datadog en su lugar.

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

   La configuración de OpenTelemetry se puede cambiar por separado, utilizando el [bloque`OpenTelemetry::SDK.configure`][15].

Datadog combina estos tramos de OpenTelemetry con otros tramos de Datadog APM en una traza única de tu aplicación. También es compatible con [la instrumentación de la integración][7] y [la instrumentación automática de OpenTelemetry][8].

## Añadir eventos de tramo

<div class="alert alert-info">Para añadir eventos de tramo se requiere la versión 2.3.0 o posterior del SDK.</div>

Puedes añadir eventos de tramo utilizando la API `add_event`. Este método requiere un parámetro `name` y acepta opcionalmente los parámetros `attributes` y `timestamp`. El método crea un nuevo evento de tramo con las propiedades especificadas y lo asocia al tramo correspondiente.

- **Name** (Nombre) [_obligatorio_]: una cadena que representa el nombre del evento.
- **Attributes** (Atributos) [_opcional_]: cero o más pares clave-valor con las siguientes propiedades:
  - La clave debe ser una cadena no vacía.
  - El valor puede ser:
    - Un tipo primitivo: cadena, booleano o número.
    - Una matriz homogénea de valores de tipo primitivo (por ejemplo, una matriz de cadenas).
  - Las matrices anidadas y las matrices que contienen elementos de distintos tipos de datos no están permitidas.
- **Timestamp** (Marca temporal) [_opcional_]: una marca de tiempo UNIX que representa la hora de aparición del evento. Se espera `seconds(Float)`.

Los siguientes ejemplos muestran diferentes formas de añadir eventos a un tramo:

```ruby
span.add_event('Event With No Attributes')
span.add_event(
  'Event With All Attributes',
  attributes: { 'int_val' => 1, 'string_val' => 'two', 'int_array' => [3, 4], 'string_array' => ['5', '6'], 'bool_array' => [false, true]}
)
```

Lee la especificación de [OpenTelemetry][13] para obtener más información.

### Registro de excepciones

Para registrar excepciones, utiliza la API `record_exception`. Este método requiere un parámetro `exception` y acepta opcionalmente un parámetro UNIX `timestamp`. Crea un nuevo evento de tramo que incluye atributos de excepción estandarizados y lo asocia con el tramo correspondiente.

Los siguientes ejemplos muestran distintas formas de registrar excepciones:

```ruby
span.record_exception(
  StandardError.new('Error Message')
)
span.record_exception(
  StandardError.new('Error Message'),
  attributes: { 'status' => 'failed' }
)
```

Lee la especificación de [OpenTelemetry][14] para obtener más información.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://opentelemetry.io/docs/instrumentation/ruby/manual/#context-propagation
[2]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-processor
[3]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-exporter
[4]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#id-generators
[5]: https://opentelemetry.io/docs/instrumentation/ruby/manual/
[6]: /es/tracing/trace_collection/dd_libraries/ruby/#additional-configuration
[7]: /es/tracing/trace_collection/dd_libraries/ruby#integration-instrumentation
[8]: https://opentelemetry.io/docs/languages/ruby/libraries/
[9]: /es/tracing/trace_collection/trace_context_propagation/
[10]: /es/tracing/trace_collection/dd_libraries/ruby/#custom-logging
[12]: /es/opentelemetry/guide/otel_api_tracing_interoperability/
[13]: https://opentelemetry.io/docs/specs/otel/trace/api/#add-events
[14]: https://opentelemetry.io/docs/specs/otel/trace/api/#record-exception
[15]: https://opentelemetry.io/docs/languages/ruby/getting-started/#instrumentation
