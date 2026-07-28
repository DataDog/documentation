---
aliases:
- /es/tracing/trace_collection/trace_context_propagation/cpp
- /es/tracing/trace_collection/trace_context_propagation/dotnet
- /es/tracing/trace_collection/trace_context_propagation/go
- /es/tracing/trace_collection/trace_context_propagation/java
- /es/tracing/trace_collection/trace_context_propagation/nodejs
- /es/tracing/trace_collection/trace_context_propagation/php
- /es/tracing/trace_collection/trace_context_propagation/python
- /es/tracing/trace_collection/trace_context_propagation/ruby
description: Extraer e inyectar los encabezados de contexto de traza de Datadog, B3
  y W3C para propagar el contexto de una traza distribuida.
further_reading:
- link: tracing/glossary/
  tag: Documentación
  text: Entender la terminología de APM
- link: https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/
  tag: Blog
  text: Monitorear aplicaciones instrumentadas con OpenTelemetry con soporte para
    el contexto de traza de W3C
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: Documentación
  text: Interoperabilidad de la API de OpenTelemetry y las trazas instrumentadas de
    Datadog
title: Propagación del contexto de trazas
type: multi-code-lang
---
La propagación del contexto de trazas es el mecanismo para pasar información de trazado como ID de traza, ID de tramo y decisiones de muestreo de una parte de una aplicación distribuida a otra. Esto permite correlacionar todas las trazas (y telemetría adicional) en una solicitud. Cuando la instrumentación automática está habilitada, la propagación del contexto de trazas se maneja automáticamente por el SDK de Datadog.

Por defecto, el SDK de Datadog extrae e inyecta encabezados de trazado distribuido utilizando los siguientes formatos:

- [Datadog][1] (tiene mayor precedencia al extraer encabezados)
- [W3C Trace Context][2]
- [Baggage][10]

Esta configuración predeterminada maximiza la compatibilidad con versiones anteriores del SDK de Datadog y productos, mientras permite la interoperabilidad con otros sistemas de trazado distribuido como OpenTelemetry.

## Personalizar la propagación del contexto de trazas {#customize-trace-context-propagation}

Es posible que necesite personalizar la configuración de propagación del contexto de trazas si sus aplicaciones:

- Comunican información de trazado distribuido en un formato soportado diferente
- Necesitan evitar extraer o inyectar encabezados de trazado distribuido

Utilice las siguientes variables de entorno para configurar los formatos para leer y escribir encabezados de trazado distribuido. Consulte la sección [Soporte de idiomas][6] para los valores de configuración específicos de cada idioma.

`DD_TRACE_PROPAGATION_STYLE`
: Especifica los formatos de propagación del contexto de trazas para extracción e inyección en una lista separada por comas. Puede ser anulado por configuraciones específicas de extracción o inyección.<br>
**Predeterminado**: `datadog,tracecontext,baggage` <br>
**Nota**: Con múltiples formatos de contexto de trazas, la extracción sigue el orden especificado (por ejemplo, `datadog,tracecontext` verifica primero los encabezados de Datadog). El primer contexto válido continúa la traza; los contextos válidos adicionales se convierten en enlaces de tramo. Cuando se incluye `baggage`, se agrega como [baggage](#baggage) al contexto existente.

`OTEL_PROPAGATORS`
: Especifica los formatos de propagación del contexto de trazas tanto para extracción como para inyección (lista separada por comas). La menor precedencia; se ignora si se establece cualquier otra variable de entorno de propagación del contexto de trazas de Datadog.<br>
**Nota**: Utilice esta configuración solo al migrar una aplicación del SDK de OpenTelemetry al SDK de Datadog. Para más información sobre esta configuración y otras variables de entorno de OpenTelemetry, consulte [Uso de variables de entorno de OpenTelemetry con SDKs de Datadog][9].

`DD_TRACE_PROPAGATION_BEHAVIOR_EXTRACT`
: Especifica cómo deben manejarse, a nivel de servicio, los encabezados de trazado distribuido entrantes. Los valores aceptados son:<br>
`continue`: El SDK continuará la traza distribuida si los encabezados de trazas distribuidas entrantes representan un contexto de traza válido.<br>
`restart`: El SDK siempre comenzará una nueva traza. Si los encabezados de trazas distribuidas entrantes representan un contexto de traza válido, ese contexto de traza se representará como un enlace de tramo en los spans de entrada del servicio (en lugar del span padre en la configuración `continue`).<br>
`ignore`: El SDK siempre comenzará una nueva traza y se ignorarán todos los encabezados de trazas distribuidas entrantes.<br>
**Predeterminado**: `continue` <br>
**Nota**: Esto solo está implementado en las bibliotecas .NET, Node.js, Python y Java.

### Configuración avanzada {#advanced-configuration}

La mayoría de los servicios envían y reciben encabezados de trazado distribuido utilizando el mismo formato. Sin embargo, si su servicio necesita aceptar encabezados de trazado distribuido en un formato y enviarlos en otro, utilice estas configuraciones:

`DD_TRACE_PROPAGATION_STYLE_EXTRACT`
: Especifica los formatos de propagación del contexto de trazas para extracción únicamente en una lista separada por comas. Mayor precedencia para configurar propagadores de extracción.

`DD_TRACE_PROPAGATION_STYLE_INJECT`
: Especifica los formatos de propagación del contexto de trazas para inyección únicamente en una lista separada por comas. Mayor precedencia para configurar propagadores de inyección.

## Formatos soportados {#supported-formats}

El SDK de Datadog soporta los siguientes formatos de contexto de trazas:

| Formato                 | Valor de configuración        |
|------------------------|----------------------------|
| [Datadog][1]           | `datadog`                  |
| [W3C Trace Context][2] | `tracecontext`             |
| [B3 Single][3]         | _Valor dependiente del lenguaje_ |
| [B3 Multi][4]          | `b3multi`                  |
| [Baggage][10]          | `baggage`<sup>*</sup>       |
| [Ninguno][5]              | `none`                     |

<sup>*</sup> **Nota**: `baggage` no es compatible en Rust.

## Soporte de idiomas {#language-support}

{{< tabs >}}

{{% tab "Java" %}}

### Formatos soportados {#supported-formats-1}

El SDK de Datadog para Java soporta los siguientes formatos de contexto de trazas, incluyendo valores de configuración obsoletos:

| Formato                 | Valor de configuración |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [W3C Trace Context][2] | `tracecontext`      |
| [B3 Single][3]         | `b3 single header`  |
|                        | `b3single`          |
| [B3 Múltiple][4]          | `b3multi`           |
|                        | `b3` (obsoleto)   |
| [Baggage][7]          | `baggage`           |
| [AWS X-Ray][5]         | `xray`              |
| [Ninguno][6]              | `none`              |

### Configuración adicional {#additional-configuration}

Además de la configuración de variables de entorno, también puede actualizar los propagadores utilizando la configuración de propiedades del sistema:
- `-Ddd.trace.propagation.style=datadog,b3multi`
- `-Dotel.propagators=datadog,b3multi`
- `-Ddd.trace.propagation.style.inject=datadog,b3multi`
- `-Ddd.trace.propagation.style.extract=datadog,b3multi`

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: https://docs.aws.amazon.com/xray/latest/devguide/xray-concepts.html#xray-concepts-tracingheader
[6]: #none-format
[7]: https://www.w3.org/TR/baggage/

{{% /tab %}}

{{% tab "Python" %}}

### Formatos soportados {#supported-formats-2}

El SDK de Python de Datadog admite los siguientes formatos de contexto de trazas, incluidos los valores de configuración obsoletos:

| Formato                 | Valor de configuración             |
|------------------------|---------------------------------|
| [Datadog][1]           | `datadog`                       |
| [W3C Trace Context][2] | `tracecontext`                  |
| [Baggage][6]           | `baggage`                       |
| [B3 Single][3]         | `b3`                            |
|                        | `b3 single header` (eliminado en v3.0) |
| [B3 Multi][4]          | `b3multi`                       |
| [None][5]              | `none`                          |

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format
[6]: https://www.w3.org/TR/baggage/

{{% /tab %}}

{{% tab "Ruby" %}}

### Formatos soportados {#supported-formats-3}

El SDK de Ruby de Datadog admite los siguientes formatos de contexto de trazas, incluidos los valores de configuración obsoletos:

| Formato                 | Valor de configuración |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [W3C Trace Context][2] | `tracecontext`      |
| [Baggage][6]          | `baggage`           |
| [B3 Single][3]         | `b3`                |
| [B3 Multi][4]          | `b3multi`           |
| [None][5]              | `none`              |

### Configuración adicional {#additional-configuration-1}

Además de la configuración de variables de entorno, también puede actualizar los propagadores en el código utilizando `Datadog.configure`:

```ruby
Datadog.configure do |c|
  # List of header formats that should be extracted
  c.tracing.propagation_extract_style = [ 'tracecontext', 'datadog', 'b3' ]

  # List of header formats that should be injected
  c.tracing.propagation_inject_style = [ 'tracecontext', 'datadog' ]
end
```

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format
[6]: https://www.w3.org/TR/baggage/

{{% /tab %}}

{{% tab "Go" %}}

### Formatos soportados {#supported-formats-4}

El SDK de Go de Datadog admite los siguientes formatos de contexto de trazas, incluidos los valores de configuración obsoletos:

| Formato                 | Valor de configuración |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [Contexto de traza W3C][2] | `tracecontext`      |
| [Equipaje][6]          | `baggage`           |
| [B3 Único][3]         | `B3 single header`  |
| [B3 Múltiple][4]          | `b3multi`           |
|                        | `b3` (obsoleto)   |
| [Ninguno][5]              | `none`              |

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format
[6]: https://www.w3.org/TR/baggage/

{{% /tab %}}

{{% tab "Node.js" %}}

### Formatos soportados {#supported-formats-5}

El SDK de Node.js de Datadog admite los siguientes formatos de contexto de traza, incluidos los valores de configuración obsoletos:

| Formato                 | Valor de configuración |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [W3C Trace Context][2] | `tracecontext`      |
| [Equipaje][6]          | `baggage`           |
| [B3 Único][3]         | `B3 single header`  |
| [B3 Múltiple][4]          | `b3multi`           |
|                        | `B3` (obsoleto)   |
| [Ninguno][5]              | `none`              |

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format
[6]: https://www.w3.org/TR/baggage/

{{% /tab %}}

{{% tab "PHP" %}}

### Formatos soportados {#supported-formats-6}

El SDK de PHP de Datadog admite los siguientes formatos de contexto de traza, incluidos los valores de configuración obsoletos:

| Formato                 | Valor de configuración |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [Contexto de trazas W3C][2] | `tracecontext`      |
| [Equipaje][6]          | `baggage`           |
| [B3 Único][3]         | `B3 single header`  |
| [B3 Múltiple][4]          | `b3multi`           |
|                        | `B3` (obsoleto)   |
| [Ninguno][5]              | `none`              |

### Casos de uso adicionales {#additional-use-cases}

Los siguientes casos de uso son específicos para el SDK de PHP de Datadog:

{{% collapse-content title="Trazado distribuido al iniciar un script PHP" level="h4" %}}

Cuando se lanza un nuevo script PHP, el SDK de Datadog verifica automáticamente la presencia de encabezados de Datadog para el trazado distribuido:
- `x-datadog-trace-id` (variable de entorno: `HTTP_X_DATADOG_TRACE_ID`)
- `x-datadog-parent-id` (variable de entorno: `HTTP_X_DATADOG_PARENT_ID`)
- `x-datadog-origin` (variable de entorno: `HTTP_X_DATADOG_ORIGIN`)
- `x-datadog-tags` (variable de entorno: `HTTP_X_DATADOG_TAGS`)

{{% /collapse-content %}}

{{% collapse-content title="Configurando manualmente el contexto de trazado distribuido" level="h4" %}}

Para establecer manualmente la información de traza en un script CLI para trazas nuevas o existentes, utiliza la función `DDTrace\set_distributed_tracing_context(string $trace_id, string $parent_id, ?string $origin = null, ?array $tags = null)`.

```php
<?php

function processIncomingQueueMessage($message) {
}

\DDTrace\trace_function(
    'processIncomingQueueMessage',
    function(\DDTrace\SpanData $span, $args) {
        $message = $args[0];
        \DDTrace\set_distributed_tracing_context($message->trace_id, $message->parent_id);
    }
);
```

Para la versión **0.87.0** y posteriores, si los encabezados en bruto están disponibles, utiliza la función `DDTrace\consume_distributed_tracing_headers(array|callable $headersOrCallback)`. **Nota**: Los nombres de los encabezados deben estar en minúsculas.

```php
$headers = [
	"x-datadog-trace-id" => "1234567890",
	"x-datadog-parent-id" => "987654321",
];

\DDTrace\consume_distributed_tracing_headers($headers);
```

Para extraer el contexto de traza directamente como encabezados, usa la función `DDTrace\generate_distributed_tracing_headers(?array $inject = null): array`.

```php
$headers = DDTrace\generate_distributed_tracing_headers();
// Store headers somewhere, inject them in an outbound request, ...
// These $headers can also be read back by \DDTrace\consume_distributed_tracing_headers from another process.
```

El argumento opcional de esta función acepta un array de nombres de estilos de inyección. Por defecto, utiliza el estilo de inyección configurado.

{{% /collapse-content %}}

{{% collapse-content title="RabbitMQ" level="h4" %}}

El SDK de PHP soporta el trazado automático de la biblioteca `php-amqplib/php-amqplib` (versión 0.87.0+). Sin embargo, en algunos casos, su traza distribuida puede estar desconectada. Por ejemplo, al leer mensajes de una cola distribuida utilizando el método `basic_get` fuera de una traza existente, necesitas agregar una traza personalizada alrededor de la llamada a `basic_get` y el procesamiento correspondiente de mensajes:

```php
// Create a surrounding trace
$newTrace = \DDTrace\start_trace_span();
$newTrace->name = 'basic_get.process';
$newTrace->service = 'amqp';


// basic_get call(s) + message(s) processing
$msg = $channel->basic_get($queue);
if ($msg) {
   $messageProcessing($msg);
}


// Once done, close the span
\DDTrace\close_span();
```

Crear esta traza circundante para tu lógica de consumo y procesamiento asegura la observabilidad de tu cola distribuida.

{{% /collapse-content %}}

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format
[6]: https://www.w3.org/TR/baggage/

{{% /tab %}}

{{% tab "C++" %}}

### Formatos soportados {#supported-formats-7}

El SDK de Datadog C++ admite los siguientes formatos de contexto de traza, incluidos los valores de configuración obsoletos:

| Formato                 | Valor de configuración |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [W3C Trace Context][2] | `tracecontext`      |
| [Equipaje][6]          | `baggage`           |
| [B3 Múltiple][4]          | `b3`                |
|                        | `b3multi`           |
| [Ninguno][5]              | `none`              |

### Configuración adicional {#additional-configuration-2}

Además de la configuración de variables de entorno, también puede actualizar los propagadores en el código:

```cpp
#include <datadog/tracer_config.h>
#include <datadog/propagation_style.h>

namespace dd = datadog::tracing;
int main() {
  dd::TracerConfig config;
  config.service = "my-service";

  // `injection_styles` indicates with which tracing systems trace propagation
  // will be compatible when injecting (sending) trace context.
  // All styles indicated by `injection_styles` are used for injection.
  // `injection_styles` is overridden by the `DD_TRACE_PROPAGATION_STYLE_INJECT`
  // and `DD_TRACE_PROPAGATION_STYLE` environment variables.
  config.injection_styles = {dd::PropagationStyle::DATADOG, dd::PropagationStyle::B3};

  // `extraction_styles` indicates with which tracing systems trace propagation
  // will be compatible when extracting (receiving) trace context.
  // Extraction styles are applied in the order in which they appear in
  // `extraction_styles`. The first style that produces trace context or
  // produces an error determines the result of extraction.
  // `extraction_styles` is overridden by the
  // `DD_TRACE_PROPAGATION_STYLE_EXTRACT` and `DD_TRACE_PROPAGATION_STYLE`
  // environment variables.
  config.extraction_styles = {dd::PropagationStyle::W3C};

  ...
}
```

### Casos de uso adicionales {#additional-use-cases-1}

{{% collapse-content title="Extraer contexto propagado manualmente" level="h4" %}}

Para extraer el contexto de propagación, implemente una interfaz `DictReader` personalizada y llame a `Tracer::extract_span` o `Tracer::extract_or_create_span`.

Aquí hay un ejemplo de extracción de contexto de propagación de encabezados HTTP:

```cpp
#include <datadog/dict_reader.h>
#include <datadog/optional.h>
#include <datadog/string_view.h>

#include <unordered_map>

namespace dd = datadog::tracing;

class HTTPHeadersReader : public datadog::tracing::DictReader {
  std::unordered_map<dd::StringView, dd::StringView> headers_;

public:
  HTTPHeadersReader(std::unordered_map<dd::StringView, dd::StringView> headers)
    : headers_(std::move(headers)) {}

  ~HTTPHeadersReader() override = default;

  // Return the value at the specified `key`, or return `nullopt` if there
  // is no value at `key`.
  dd::Optional<dd::StringView> lookup(dd::StringView key) const override {
    auto found = headers_.find(key);
    if (found == headers_.cend()) return dd::nullopt;

    return found->second;
  }

  // Invoke the specified `visitor` once for each key/value pair in this object.
  void visit(
      const std::function<void(dd::StringView key, dd::StringView value)>& visitor)
      const override {
      for (const auto& [key, value] : headers_) {
        visitor(key, value);
      }
  };
};

// Usage example:
void handle_http_request(const Request& request, datadog::tracing::Tracer& tracer) {
  HTTPHeadersReader reader{request.headers};
  auto maybe_span = tracer.extract_span(reader);
  ..
}
```
{{% /collapse-content %}}

{{% collapse-content title="Inyectar contexto manualmente para trazas distribuidas" level="h4" %}}

Para inyectar el contexto de propagación, implemente la interfaz `DictWriter` y llame a `Span::inject` en una instancia de tramo:

```cpp
#include <datadog/dict_writer.h>
#include <datadog/string_view.h>

#include <string>
#include <unordered_map>

using namespace dd = datadog::tracing;

class HTTPHeaderWriter : public dd::DictWriter {
  std::unordered_map<std::string, std::string>& headers_;

public:
  explicit HTTPHeaderWriter(std::unordered_map<std::string, std::string>& headers) : headers_(headers) {}

  ~HTTPHeaderWriter() override = default;

  void set(dd::StringView key, dd::StringView value) override {
    headers_.emplace(key, value);
  }
};

// Usage example:
void handle_http_request(const Request& request, dd::Tracer& tracer) {
  auto span = tracer.create_span();

  HTTPHeaderWriter writer(request.headers);
  span.inject(writer);
  // `request.headers` now populated with the headers needed to propagate the span.
  ..
}
```
{{% /collapse-content %}}

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format
[6]: https://www.w3.org/TR/baggage/

{{% /tab %}}

{{% tab ".NET" %}}

### Formatos soportados {#supported-formats-8}

El SDK de Datadog .NET admite los siguientes formatos de contexto de traza, incluidos los valores de configuración obsoletos:

| Formato                 | Valor de configuración           |
|------------------------|-------------------------------|
| [Datadog][1]           | `datadog`                     |
| [W3C Trace Context][2] | `tracecontext`                |
| [Equipaje][9]          | `baggage`                     |
|                        | `W3C` (obsoleto)            |
| [B3 Único][3]         | `B3 single header`            |
|                        | `B3SingleHeader` (obsoleto) |
| [B3 Múltiple][4]          | `b3multi`                     |
|                        | `B3` (obsoleto)             |
| [Ninguno][5]              | `none`                        |

### Casos de uso adicionales {#additional-use-cases-2}

{{% collapse-content title="Valores predeterminados de configuración anteriores" level="h4" %}}

- A partir de la versión [2.48.0][6], el estilo de propagación predeterminado es `datadog, tracecontext`. Esto significa que se utilizan primero los encabezados de Datadog, seguidos por el Contexto de Trazado W3C.
- Antes de la versión 2.48.0, el orden era `tracecontext, Datadog` tanto para la extracción como para la propagación de inyección.
- Antes de la versión [2.22.0][7], solo se habilitó el estilo de inyección `Datadog`.
- A partir de la versión [2.42.0][8], cuando se especifican múltiples extractores, la configuración `DD_TRACE_PROPAGATION_EXTRACT_FIRST=true` especifica si la extracción de contexto debe salir inmediatamente al detectar el primer `tracecontext` válido. El valor predeterminado es `false`.

{{% /collapse-content %}}

{{% collapse-content title="Trazado distribuido con colas de mensajes" level="h4" %}}

En la mayoría de los casos, la extracción e inyección de encabezados son automáticas. Sin embargo, hay algunos casos conocidos donde su traza distribuida puede estar desconectada. Por ejemplo, al leer mensajes de una cola distribuida, algunas bibliotecas pueden perder el contexto del tramo. También sucede si establece `DD_TRACE_KAFKA_CREATE_CONSUMER_SCOPE_ENABLED` en `false` al consumir mensajes de Kafka. En estos casos, puede agregar una traza personalizada utilizando el siguiente código:

```csharp
var spanContextExtractor = new SpanContextExtractor();
var parentContext = spanContextExtractor.Extract(headers, (headers, key) => GetHeaderValues(headers, key));
var spanCreationSettings = new SpanCreationSettings() { Parent = parentContext };
using var scope = Tracer.Instance.StartActive("operation", spanCreationSettings);
```

Proporcione el método `GetHeaderValues`. La forma en que se implementa este método depende de la estructura que lleva `SpanContext`.

Aquí hay algunos ejemplos:

```csharp
// Confluent.Kafka
IEnumerable<string> GetHeaderValues(Headers headers, string name)
{
    if (headers.TryGetLastBytes(name, out var bytes))
    {
        try
        {
            return new[] { Encoding.UTF8.GetString(bytes) };
        }
        catch (Exception)
        {
            // ignored
        }
    }

    return Enumerable.Empty<string>();
}

// RabbitMQ
IEnumerable<string> GetHeaderValues(IDictionary<string, object> headers, string name)
{
    if (headers.TryGetValue(name, out object value) && value is byte[] bytes)
    {
        return new[] { Encoding.UTF8.GetString(bytes) };
    }

    return Enumerable.Empty<string>();
}

// SQS
public static IEnumerable<string> GetHeaderValues(IDictionary<string, MessageAttributeValue> headers, string name)
{
    // For SQS, there are a maximum of 10 message attribute headers,
    // so the Datadog headers are combined into one header with the following properties:
    // - Key: "_datadog"
    // - Value: MessageAttributeValue object
    //   - DataType: "String"
    //   - StringValue: <JSON map with key-value headers>
    if (headers.TryGetValue("_datadog", out var messageAttributeValue)
        && messageAttributeValue.StringValue is string jsonString)
    {
        var datadogDictionary = JsonConvert.DeserializeObject<Dictionary<string, string>>(jsonString);
        if (datadogDictionary.TryGetValue(name, out string value))
        {
            return new[] { value };
        }
    }
    return Enumerable.Empty<string>();
}
```

Al usar la API `SpanContextExtractor` para trazar tramos de consumidores de Kafka, establezca `DD_TRACE_KAFKA_CREATE_CONSUMER_SCOPE_ENABLED` en `false`. Esto asegura que el tramo del consumidor se cierre correctamente inmediatamente después de que se consuma el mensaje del tema, y que los metadatos (como `partition` y `offset`) se registren correctamente. Los tramos creados a partir de mensajes de Kafka utilizando la API `SpanContextExtractor` son hijos del tramo del productor y hermanos del tramo del consumidor.

Si necesitas propagar el contexto de traza manualmente (para bibliotecas que no están instrumentadas automáticamente, como el cliente WCF), puedes usar la API `SpanContextInjection`. Aquí hay un ejemplo para WCF donde `this` es el cliente WCF:

```csharp

using (OperationContextScope ocs = new OperationContextScope(this.InnerChannel))
{
  var spanContextInjector = new SpanContextInjector();
  spanContextInjector.Inject(OperationContext.Current.OutgoingMessageHeaders, SetHeaderValues, Tracer.Instance.ActiveScope?.Span?.Context);
}


void SetHeaderValues(MessageHeaders headers, string name, string value)
{
    MessageHeader header = MessageHeader.CreateHeader(name, "datadog", value);
    headers.Add(header);
}
```

{{% /collapse-content %}}

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format
[6]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.48.0
[7]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.22.0
[8]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.42.0
[9]: https://www.w3.org/TR/baggage/

{{% /tab %}}

{{% tab "Rust" %}}

<div class="alert alert-info">El SDK de Rust de Datadog está en vista previa.</div>

El SDK de Rust de Datadog está construido sobre el SDK de OpenTelemetry (OTel).

La propagación del contexto de traza es manejada por el SDK de OTel, que es configurado por `datadog-opentelemetry` para soportar tanto los formatos `datadog` como `tracecontext` (W3C).

### Formatos soportados {#supported-formats-9}

| Formato | Valor de configuración |
|---|---|
| [Datadog][1] | `datadog` |
| [W3C Trace Context][2] | `tracecontext` |

### Configuración {#configuration}

Puedes controlar qué formatos de propagación se utilizan configurando la variable de entorno `DD_TRACE_PROPAGATION_STYLE`. Puedes proporcionar una lista separada por comas.

Por ejemplo:

```bash
# To support both W3C and Datadog
export DD_TRACE_PROPAGATION_STYLE="tracecontext,datadog"
```

### Inyección y extracción manual {#manual-injection-and-extraction}

Debido a que no hay instrumentación automática para Rust, debes propagar el contexto manualmente al hacer o recibir llamadas remotas (como solicitudes HTTP).
- `HeaderExtractor` **extraer** un contexto padre de los encabezados de solicitud entrantes.
- `HeaderInjector` **inyectar** el contexto actual en los encabezados de solicitud salientes.

Primero, agrega `opentelemetry-http` a tu `Cargo.toml`.

```toml
[dependencies]
# Provides HeaderInjector and HeaderExtractor
# Ensure this version matches your other opentelemetry dependencies
opentelemetry-http = "0.31"

# Only required for the Hyper examples below
http-body-util = "0.1"
```

<div class="alert alert-danger">Usa la misma versión de crate para <code>opentelemetry-http</code> el resto de tus dependencias de OpenTelemetry para evitar conflictos de versiones.</div>

### Inyectando contexto (lado del cliente) {#injecting-context-client-side}

Al hacer una solicitud HTTP (por ejemplo, con `hyper` 1.0), inyecta el contexto del tramo actual en los encabezados de la solicitud usando `HeaderInjector`.

```rust
use opentelemetry::{global, Context};
use opentelemetry_http::HeaderInjector;
use hyper::Request;
use http_body_util::Empty;
use hyper::body::Bytes;

// HYPER example
fn build_outbound_request(url: &str) -> http::Result<Request<Empty<Bytes>>> {
    let cx = Context::current();

    // Build the request and inject headers in-place
    let mut builder = Request::builder().method("GET").uri(url);
    global::get_text_map_propagator(|prop| {
        prop.inject_context(&cx, &mut HeaderInjector(builder.headers_mut().unwrap()))
    });

    builder.body(Empty::<Bytes>::new())
}
```

### Extrayendo contexto (lado del servidor) {#extracting-context-server-side}

Al recibir una solicitud HTTP, extrae el contexto de traza de los encabezados usando `HeaderExtractor`.

Al usar entornos de ejecución asíncronos (como Tokio), debes adjuntar el contexto extraído al futuro para que se propague correctamente a través de la cadena de tareas asíncronas.

```rust
use opentelemetry::{
    global,
    trace::{Span, FutureExt, SpanKind, Tracer},
    Context,
};
use opentelemetry_http::HeaderExtractor;
use hyper::{Request, Response};
use hyper::body::Incoming;
use http_body_util::Full;
use hyper::body::Bytes;

// Utility function to extract context from a hyper request
fn extract_context(req: &Request<Incoming>) -> Context {
    global::get_text_map_propagator(|propagator| {
        propagator.extract(&HeaderExtractor(req.headers()))
    })
}

// A placeholder for your actual request handling logic
async fn your_handler_logic() -> Response<Full<Bytes>> {
    // ... your logic ...
    Response::new(Full::new(Bytes::from("Hello, World!")))
}

// HYPER example
async fn hyper_handler(req: Request<Incoming>) -> Response<Full<Bytes>> {
    // Extract the parent context from the incoming headers
    let parent_cx = extract_context(&req);
    
    let tracer = global::tracer("my-server-component");
    
    // Start the server span as a child of the extracted context
    let server_span = tracer
        .span_builder("http.server.request")
        .with_kind(SpanKind::Server)
        .start_with_context(tracer, &parent_cx);

    // Create a new context with the new server span
    // This is critical for async propagation
    let cx = parent_cx.with_span(server_span);

    // Attach the new context to the future using .with_context(cx)
    // This makes the span active for the duration of the handler
    your_handler_logic().with_context(cx).await
}
```

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/

{{% /tab %}}

{{< /tabs >}}

## Formatos de encabezados personalizados {#custom-header-formats}

### Formato de Datadog {#datadog-format}

Cuando el SDK de Datadog está configurado con el formato de Datadog para extracción o inyección (posiblemente ambos), el SDK de Datadog interactúa con los siguientes encabezados de solicitud:

`x-datadog-trace-id`
: Especifica los 64 bits inferiores del ID de traza de 128 bits, en formato decimal.

`x-datadog-parent-id`
: Especifica los 64 bits del ID de tramo actual, en formato decimal.

`x-datadog-origin`
: Especifica el producto de Datadog que inició la traza, como [Real User Monitoring][7] o [Synthetic Monitoring][8]. Si este encabezado está presente, se espera que el valor sea uno de: `rum`, `synthetics`, `synthetics-browser`.

`x-datadog-sampling-priority`
: Especifica la decisión de muestreo tomada para el tramo representado como un entero, en formato decimal.

`x-datadog-tags`
: Especifica información adicional sobre el estado de la traza de Datadog, incluyendo pero no limitado a los 64 bits superiores del ID de traza de 128 bits (en formato hexadecimal).

### Formato Ninguno {#none-format}

Cuando el SDK de Datadog está configurado con el formato Ninguno para extracción o inyección (posiblemente ambos), el SDK de Datadog _no_ interactúa con los encabezados de la solicitud, lo que significa que la operación de propagación de contexto correspondiente no hace nada.

### Baggage {#baggage}

Por defecto, Baggage se propaga automáticamente a través de una solicitud distribuida utilizando los [encabezados compatibles con W3C][10] de OpenTelemetry. Para deshabilitar Baggage, establezca [DD_TRACE_PROPAGATION_STYLE][12] en `datadog,tracecontext`.

#### Agregando Baggage como etiquetas de tramo {#adding-baggage-as-span-tags}

Por defecto, `user.id,session.id,account.id` las claves de Baggage se agregan como etiquetas de tramo. Para personalizar esta configuración, consulte [Configuración de Propagación de Contexto][13]. Las claves de Baggage especificadas se agregan automáticamente como etiquetas de tramo `baggage.<key>` (por ejemplo, `baggage.user.id`).

El soporte para Baggage como etiquetas de tramo se introdujo en las siguientes versiones:

| Idioma  | Versión mínima del SDK                         |
|-----------|---------------------------------------------|
| Java      | 1.52.0                                      |
| Python    | 3.7.0                                       |
| Ruby      | 2.20.0                                      |
| Go        | 2.2.2                                       |
| .NET      | 3.23.0                                      |
| Node      | 5.54.0                                      |
| PHP       | 1.10.0                                      |
| C++/Proxy | 1.9.0 (Nginx). Otros proxies no soportados. |
| Rust      | No soportado                               |

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format
[6]: #language-support
[7]: /es/real_user_monitoring/correlate_with_other_telemetry/apm
[8]: /es/synthetics/platform/apm
[9]: /es/opentelemetry/interoperability/environment_variable_support
[10]: https://www.w3.org/TR/baggage/
[11]: /es/help
[12]: #customize-trace-context-propagation
[13]: /es/tracing/trace_collection/library_config#context-propagation