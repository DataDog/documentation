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
description: Extraiga e inyecte encabezados de Datadog, B3 y W3C Trace Context para
  propagar el contexto de una traza distribuida.
further_reading:
- link: tracing/glossary/
  tag: Documentación
  text: Comprenda la terminología de APM
- link: https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/
  tag: Blog
  text: Monitoree aplicaciones instrumentadas con OpenTelemetry con soporte para W3C
    Trace Context
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: Documentación
  text: Interoperabilidad de la API de OpenTelemetry y trazas instrumentadas de Datadog
title: Propagación del contexto de trazas
type: multi-code-lang
---
La propagación del contexto de trazas es el mecanismo para transmitir información de trazas como el ID de traza, el ID de tramo y las decisiones de muestreo de una parte de una aplicación distribuida a otra. Esto permite correlacionar todas las trazas (y la telemetría adicional) en una solicitud. Cuando la instrumentación automática está habilitada, el SDK de Datadog maneja automáticamente la propagación del contexto de trazas.

De forma predeterminada, el SDK de Datadog extrae e inyecta encabezados de traza distribuida utilizando los siguientes formatos:

- [Datadog][1] (tiene mayor prioridad al extraer encabezados)
- [W3C Trace Context][2]
- [Baggage][10]

Esta configuración predeterminada maximiza la compatibilidad con versiones y productos anteriores del SDK de Datadog, al tiempo que permite la interoperabilidad con otros sistemas de traza distribuida como OpenTelemetry.

## Personalice la propagación del contexto de trazas {#customize-trace-context-propagation}

Es posible que necesite personalizar la configuración de propagación del contexto de trazas si sus aplicaciones:

- Comunican información de traza distribuida en un formato compatible diferente
- Necesitan evitar la extracción o inyección de encabezados de traza distribuida

Utilice las siguientes variables de entorno para configurar los formatos de lectura y escritura de encabezados de traza distribuida. Consulte la sección [Language support][6] para obtener valores de configuración específicos del idioma.

`DD_TRACE_PROPAGATION_STYLE`
: Especifica los formatos de propagación del contexto de trazas para la extracción y la inyección en una lista separada por comas. Puede ser anulado por configuraciones específicas de extracción o inyección.<br>
**Predeterminado**: `datadog,tracecontext,baggage` <br>
**Nota**: Con múltiples formatos de contexto de trazas, la extracción sigue el orden especificado (por ejemplo, `datadog,tracecontext` verifica primero los encabezados de Datadog). El primer contexto válido continúa la traza; los contextos válidos adicionales se convierten en enlaces de tramo. Cuando se incluye `baggage`, se agrega como [baggage](#baggage) al contexto existente.

`OTEL_PROPAGATORS`
: Especifica los formatos de propagación del contexto de trazas tanto para la extracción como para la inyección (lista separada por comas). Prioridad más baja; se ignora si se establece cualquier otra variable de entorno de propagación del contexto de trazas de Datadog.<br>
**Nota**: Utilice esta configuración únicamente al migrar una aplicación del SDK de OpenTelemetry al SDK de Datadog. Para obtener más información sobre esta configuración y otras variables de entorno de OpenTelemetry, consulte [Using OpenTelemetry Environment Variables with Datadog SDKs][9].

`DD_TRACE_PROPAGATION_BEHAVIOR_EXTRACT`
: Especifica cómo se deben manejar los encabezados de traza distribuida entrantes a nivel de servicio. Los valores aceptados son:<br>
`continue`: El SDK continuará la traza distribuida si los encabezados de traza distribuida entrantes representan un contexto de traza válido.<br>
`restart`: El SDK siempre iniciará una nueva traza. Si los encabezados de traza distribuida entrantes representan un contexto de traza válido, ese contexto de traza se representará como un enlace de tramo en los tramos de entrada del servicio (a diferencia del tramo principal en la configuración `continue`).<br>
`ignore`: El SDK siempre iniciará una nueva traza y se ignorarán todos los encabezados de traza distribuida entrantes.<br>
**Predeterminado**: `continue` <br>

### Configuración avanzada {#advanced-configuration}

La mayoría de los servicios envían y reciben encabezados de contexto de traza utilizando el mismo formato. Sin embargo, si su servicio necesita aceptar encabezados de contexto de traza en un formato y enviarlos en otro, utilice estas configuraciones:

`DD_TRACE_PROPAGATION_STYLE_EXTRACT`
: Especifica los formatos de propagación del contexto de trazas solo para extracción en una lista separada por comas. Mayor prioridad para configurar los propagadores de extracción.

`DD_TRACE_PROPAGATION_STYLE_INJECT`
: Especifica los formatos de propagación del contexto de trazas solo para inyección en una lista separada por comas. Mayor prioridad para configurar los propagadores de inyección.

## Formatos admitidos {#supported-formats}

El SDK de Datadog admite los siguientes formatos de contexto de traza:

| Formato                 | Valor de configuración        |
|------------------------|----------------------------|
| [Datadog][1]           | `datadog`                  |
| [W3C Trace Context][2] | `tracecontext`             |
| [B3 Single][3]         | _Valor dependiente del lenguaje_ |
| [B3 Multi][4]          | `b3multi`                  |
| [Baggage][10]          | `baggage`<sup>*</sup>       |
| [Ninguno][5]              | `none`                     |

<sup>*</sup> **Nota**: `baggage` no es compatible con Rust.

## Soporte de idioma {#language-support}

{{< tabs >}}

{{% tab "Java" %}}

### Formatos admitidos {#supported-formats-1}

El SDK de Java de Datadog admite los siguientes formatos de contexto de traza, incluidos los valores de configuración obsoletos:

| Formato                 | Valor de configuración |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [W3C Trace Context][2] | `tracecontext`      |
| [B3 Single][3]         | `b3 single header`  |
|                        | `b3single`          |
| [B3 Multi][4]          | `b3multi`           |
|                        | `b3` (obsoleto)   |
| [Baggage][7]          | `baggage`           |
| [AWS X-Ray][5]         | `xray`              |
| [Ninguno][6]              | `none`              |

### Configuración adicional {#additional-configuration}

Además de la configuración de variables de entorno, también puede actualizar los propagadores mediante la configuración de propiedades del sistema:
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

### Formatos admitidos {#supported-formats-2}

El SDK de Python de Datadog admite los siguientes formatos de contexto de traza, incluidos los valores de configuración obsoletos:

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

### Formatos admitidos {#supported-formats-3}

El SDK de Datadog para Ruby admite los siguientes formatos de contexto de traza, incluidos los valores de configuración obsoletos:

| Formato                 | Valor de configuración |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [W3C Trace Context][2] | `tracecontext`      |
| [Baggage][6]          | `baggage`           |
| [B3 Single][3]         | `b3`                |
| [B3 Multi][4]          | `b3multi`           |
| [None][5]              | `none`              |

### Configuración adicional {#additional-configuration-1}

Además de la configuración de variables de entorno, también puede actualizar los propagadores en el código usando `Datadog.configure`:

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

### Formatos admitidos {#supported-formats-4}

El SDK de Datadog para Go admite los siguientes formatos de contexto de traza, incluidos los valores de configuración obsoletos:

| Formato                 | Valor de configuración |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [W3C Trace Context][2] | `tracecontext`      |
| [Baggage][6]          | `baggage`           |
| [B3 Single][3]         | `B3 single header`  |
| [B3 Multi][4]          | `b3multi`           |
|                        | `b3` (obsoleto)   |
| [None][5]              | `none`              |

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format
[6]: https://www.w3.org/TR/baggage/

{{% /tab %}}

{{% tab "Node.js" %}}

### Formatos admitidos {#supported-formats-5}

El SDK de Datadog para Node.js admite los siguientes formatos de contexto de traza, incluidos los valores de configuración obsoletos:

| Formato                 | Valor de configuración |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [W3C Trace Context][2] | `tracecontext`      |
| [Baggage][6]          | `baggage`           |
| [B3 Single][3]         | `B3 single header`  |
| [B3 Multi][4]          | `b3multi`           |
|                        | `B3` (obsoleto)   |
| [None][5]              | `none`              |

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format
[6]: https://www.w3.org/TR/baggage/

{{% /tab %}}

{{% tab "PHP" %}}

### Formatos admitidos {#supported-formats-6}

El SDK de Datadog para PHP admite los siguientes formatos de contexto de traza, incluidos los valores de configuración obsoletos:

| Formato                 | Valor de configuración |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [W3C Trace Context][2] | `tracecontext`      |
| [Baggage][6]          | `baggage`           |
| [B3 Single][3]         | `B3 single header`  |
| [B3 Multi][4]          | `b3multi`           |
|                        | `B3` (obsoleto)   |
| [None][5]              | `none`              |

### Casos de uso adicionales {#additional-use-cases}

Los siguientes casos de uso son específicos del SDK de Datadog para PHP:

{{% collapse-content title="Seguimiento distribuido al iniciar un script de PHP" level="h4" %}}

Cuando se inicia un nuevo script de PHP, el SDK de Datadog verifica automáticamente la presencia de encabezados de Datadog para la traza distribuida:
- `x-datadog-trace-id` (variable de entorno: `HTTP_X_DATADOG_TRACE_ID`)
- `x-datadog-parent-id` (variable de entorno: `HTTP_X_DATADOG_PARENT_ID`)
- `x-datadog-origin` (variable de entorno: `HTTP_X_DATADOG_ORIGIN`)
- `x-datadog-tags` (variable de entorno: `HTTP_X_DATADOG_TAGS`)

{{% /collapse-content %}}

{{% collapse-content title="Configuración manual del contexto de traza distribuida" level="h4" %}}

Para configurar manualmente la información de traza en un script de CLI para trazas nuevas o existentes, utilice la función `DDTrace\set_distributed_tracing_context(string $trace_id, string $parent_id, ?string $origin = null, ?array $tags = null)`.

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

Para la versión **0.87.0** y posteriores, si los encabezados sin procesar están disponibles, utilice la función `DDTrace\consume_distributed_tracing_headers(array|callable $headersOrCallback)`. **Nota**: Los nombres de los encabezados deben estar en minúsculas.

```php
$headers = [
	"x-datadog-trace-id" => "1234567890",
	"x-datadog-parent-id" => "987654321",
];

\DDTrace\consume_distributed_tracing_headers($headers);
```

Para extraer el contexto de traza directamente como encabezados, utilice la función `DDTrace\generate_distributed_tracing_headers(?array $inject = null): array`.

```php
$headers = DDTrace\generate_distributed_tracing_headers();
// Store headers somewhere, inject them in an outbound request, ...
// These $headers can also be read back by \DDTrace\consume_distributed_tracing_headers from another process.
```

El argumento opcional de esta función acepta una matriz de nombres de estilo de inyección. De forma predeterminada, utiliza el estilo de inyección configurado.

{{% /collapse-content %}}

{{% collapse-content title="RabbitMQ" level="h4" %}}

El SDK de PHP admite el seguimiento automático de la biblioteca `php-amqplib/php-amqplib` (versión 0.87.0+). Sin embargo, en algunos casos, su traza distribuida puede desconectarse. Por ejemplo, al leer mensajes de una cola distribuida utilizando el método `basic_get` fuera de una traza existente, debe agregar una traza personalizada alrededor de la llamada `basic_get` y el procesamiento de mensajes correspondiente:

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

Crear esta traza envolvente para su lógica de consumo y procesamiento garantiza la observabilidad de su cola distribuida.

{{% /collapse-content %}}

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format
[6]: https://www.w3.org/TR/baggage/

{{% /tab %}}

{{% tab "C++" %}}

### Formatos admitidos {#supported-formats-7}

El SDK de C++ de Datadog admite los siguientes formatos de contexto de traza, incluidos los valores de configuración obsoletos:

| Formato                 | Valor de configuración |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [W3C Trace Context][2] | `tracecontext`      |
| [Baggage][6]          | `baggage`           |
| [B3 Multi][4]          | `b3`                |
|                        | `b3multi`           |
| [None][5]              | `none`              |

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

{{% collapse-content title="Extraer manualmente el contexto propagado" level="h4" %}}

Para extraer el contexto de propagación, implemente una interfaz `DictReader` personalizada y llame a `Tracer::extract_span` o `Tracer::extract_or_create_span`.

Aquí tiene un ejemplo de cómo extraer el contexto de propagación de los encabezados HTTP:

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

{{% collapse-content title="Inyectar contexto manualmente para la traza distribuida" level="h4" %}}

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

### Formatos admitidos {#supported-formats-8}

El SDK de .NET de Datadog admite los siguientes formatos de contexto de traza, incluidos los valores de configuración obsoletos:

| Formato                 | Valor de configuración           |
|------------------------|-------------------------------|
| [Datadog][1]           | `datadog`                     |
| [W3C Trace Context][2] | `tracecontext`                |
| [Baggage][9]          | `baggage`                     |
|                        | `W3C` (obsoleto)            |
| [B3 Single][3]         | `B3 single header`            |
|                        | `B3SingleHeader` (obsoleto) |
| [B3 Multi][4]          | `b3multi`                     |
|                        | `B3` (obsoleto)             |
| [Ninguno][5]              | `none`                        |

### Casos de uso adicionales {#additional-use-cases-2}

{{% collapse-content title="Valores predeterminados de configuración anteriores" level="h4" %}}

- A partir de la versión [2.48.0][6], el estilo de propagación predeterminado es `datadog, tracecontext`. Esto significa que primero se utilizan los encabezados de Datadog, seguidos por W3C Trace Context.
- Antes de la versión 2.48.0, el orden era `tracecontext, Datadog` tanto para la extracción como para la propagación de inyección.
- Antes de la versión [2.22.0][7], solo estaba habilitado el estilo de inyección `Datadog`.
- A partir de la versión [2.42.0][8], cuando se especifican múltiples extractores, la configuración `DD_TRACE_PROPAGATION_EXTRACT_FIRST=true` especifica si la extracción de contexto debe finalizar inmediatamente al detectar el primer `tracecontext` válido. El valor predeterminado es `false`.

{{% /collapse-content %}}

{{% collapse-content title="Seguimiento distribuido con colas de mensajes" level="h4" %}}

En la mayoría de los casos, la extracción e inyección de encabezados es automática. Sin embargo, existen algunos casos conocidos en los que su traza distribuida puede desconectarse. Por ejemplo, al leer mensajes de una cola distribuida, algunas bibliotecas pueden perder el contexto del tramo. También sucede si configura `DD_TRACE_KAFKA_CREATE_CONSUMER_SCOPE_ENABLED` en `false` al consumir mensajes de Kafka. En estos casos, puede agregar un seguimiento personalizado utilizando el siguiente código:

```csharp
var spanContextExtractor = new SpanContextExtractor();
var parentContext = spanContextExtractor.Extract(headers, (headers, key) => GetHeaderValues(headers, key));
var spanCreationSettings = new SpanCreationSettings() { Parent = parentContext };
using var scope = Tracer.Instance.StartActive("operation", spanCreationSettings);
```

Proporcione el método `GetHeaderValues`. La forma en que se implementa este método depende de la estructura que transporta `SpanContext`.

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

Al utilizar la API `SpanContextExtractor` para realizar el seguimiento de los tramos de consumidor de Kafka, configure `DD_TRACE_KAFKA_CREATE_CONSUMER_SCOPE_ENABLED` en `false`. Esto garantiza que el tramo del consumidor se cierre correctamente inmediatamente después de que el mensaje se consuma del tema, y que los metadatos (como `partition` y `offset`) se registren correctamente. Los tramos creados a partir de mensajes de Kafka usando la API `SpanContextExtractor` son hijos del tramo productor y hermanos del tramo consumidor.

Si necesita propagar el contexto de traza manualmente (para bibliotecas que no están instrumentadas automáticamente, como el cliente WCF), puede usar la API `SpanContextInjection`. Aquí tiene un ejemplo para WCF donde `this` es el cliente WCF:

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

<div class="alert alert-info">El SDK de Datadog para Rust está en versión preliminar.</div>

El SDK de Datadog para Rust está construido sobre el SDK de OTel.

La propagación del contexto de trazas es manejada por el SDK de OTel, el cual está configurado por `datadog-opentelemetry` para admitir tanto `datadog` como `tracecontext` (W3C).

### Formatos admitidos {#supported-formats-9}

| Formato | Valor de configuración |
|---|---|
| [Datadog][1] | `datadog` |
| [W3C Trace Context][2] | `tracecontext` |

### Configuración {#configuration}

Puede controlar qué formatos de propagación se utilizan configurando la variable de entorno `DD_TRACE_PROPAGATION_STYLE`. Puede proporcionar una lista separada por comas.

Por ejemplo:

```bash
# To support both W3C and Datadog
export DD_TRACE_PROPAGATION_STYLE="tracecontext,datadog"
```

### Inyección y extracción manual {#manual-injection-and-extraction}

Debido a que no existe instrumentación automática para Rust, debe propagar manualmente el contexto al realizar o recibir llamadas remotas (como solicitudes HTTP).
- `HeaderExtractor` para **extraer** un contexto padre de los encabezados de solicitud entrantes.
- `HeaderInjector` para **inyectar** el contexto actual en los encabezados de las solicitudes salientes.

Primero, agregue `opentelemetry-http` a su `Cargo.toml`.

```toml
[dependencies]
# Provides HeaderInjector and HeaderExtractor
# Ensure this version matches your other opentelemetry dependencies
opentelemetry-http = "0.31"

# Only required for the Hyper examples below
http-body-util = "0.1"
```

<div class="alert alert-danger">Use la misma versión de crate para <code>opentelemetry-http</code> que el resto de sus dependencias de OpenTelemetry para evitar conflictos de versiones.</div>

### Inyección de contexto (lado del cliente) {#injecting-context-client-side}

Al realizar una solicitud HTTP (por ejemplo, con `hyper` 1.0), inyecte el contexto del tramo actual en los encabezados de la solicitud usando `HeaderInjector`.

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

### Extracción de contexto (lado del servidor) {#extracting-context-server-side}

Al recibir una solicitud HTTP, extraiga el contexto de traza de los encabezados usando `HeaderExtractor`.

Al usar entornos de ejecución asíncronos (como Tokio), debe adjuntar el contexto extraído al futuro para que se propague correctamente a través de la cadena de tareas asíncronas.

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

## Formatos de encabezado personalizados {#custom-header-formats}

### Formato Datadog {#datadog-format}

Cuando el SDK de Datadog se configura con el formato Datadog para la extracción o inyección (posiblemente ambos), el SDK de Datadog interactúa con los siguientes encabezados de solicitud:

`x-datadog-trace-id`
: Especifica los 64 bits inferiores del ID de traza de 128 bits, en formato decimal.

`x-datadog-parent-id`
: Especifica el ID de tramo de 64 bits del tramo actual, en formato decimal.

`x-datadog-origin`
: Especifica el producto de Datadog que inició la traza, como [Real User Monitoring][7] o [Synthetic Monitoring][8]. Si este encabezado está presente, se espera que el valor sea uno de: `rum`, `synthetics`, `synthetics-browser`.

`x-datadog-sampling-priority`
: Especifica la decisión de muestreo tomada para el tramo representado como un número entero, en formato decimal.

`x-datadog-tags`
: Especifica información complementaria del estado de traza de Datadog, incluyendo, entre otros, los 64 bits superiores del ID de traza de 128 bits (en formato hexadecimal).

### Formato None {#none-format}

Cuando el SDK de Datadog se configura con el formato None para la extracción o inyección (posiblemente ambos), el SDK de Datadog _no_ interactúa con los encabezados de solicitud, lo que significa que la operación de propagación de contexto correspondiente no hace nada.

### Baggage {#baggage}

De forma predeterminada, Baggage se propaga automáticamente a través de una solicitud distribuida utilizando los [encabezados compatibles con W3C][10] de OpenTelemetry. Para deshabilitar baggage, establezca [DD_TRACE_PROPAGATION_STYLE][12] en `datadog,tracecontext`.

#### Agregar baggage como etiquetas de tramo {#adding-baggage-as-span-tags}

De forma predeterminada, `user.id,session.id,account.id` las claves de baggage se agregan como etiquetas de tramo. Para personalizar esta configuración, consulte [Configuración de propagación de contexto][13]. Las claves de baggage especificadas se agregan automáticamente como etiquetas de tramo `baggage.<key>` (por ejemplo, `baggage.user.id`).

La compatibilidad con baggage como etiquetas de tramo se introdujo en las siguientes versiones:

| Idioma  | Versión mínima del SDK                         |
|-----------|---------------------------------------------|
| Java      | 1.52.0                                      |
| Python    | 3.7.0                                       |
| Ruby      | 2.20.0                                      |
| Go        | 2.2.2                                       |
| .NET      | 3.23.0                                      |
| Node      | 5.54.0                                      |
| PHP       | 1.10.0                                      |
| C++/Proxy | 1.9.0 (Nginx). Otros proxies no son compatibles. |
| Rust      | No es compatible                               |

## Lecturas adicionales {#further-reading}

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