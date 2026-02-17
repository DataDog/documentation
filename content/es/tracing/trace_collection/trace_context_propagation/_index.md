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
description: Extrae e inyecta cabeceras de contextos de rastreo Datadog, B3, y W3C
  para propagar el contexto de un rastreo distribuido.
further_reading:
- link: tracing/glossary/
  tag: Documentación
  text: Para comprender la terminología de APM
- link: https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/
  tag: Blog
  text: Monitorizar aplicaciones instrumentadas con OpenTelemetry compatibles con
    el contexto de rastreo de W3C
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: Documentación
  text: Interoperabilidad de la API de OpenTelemetry con trazas de Datadog instrumentadas
title: Propagación de contextos de trazas (traces)
type: lenguaje de código múltiple
---

El rastreo de la propagación del contexto es el mecanismo de transmisión de información de rastreo como ID de rastreo, ID de tramo (span) y decisiones de muestreo de una parte de una aplicación distribuida a otra. Esto permite correlacionar todas las trazas (y telemetría adicional) de una solicitud. Cuando la instrumentación automática está habilitada, la propagación del contexto de rastreo es gestionada automáticamente por el SDK APM.

Por defecto, el SDK Datadog extrae e inyecta cabeceras de rastreo distribuido utilizando los siguientes formatos:

- [Datadog][1] (tiene mayor prioridad al extraer las cabeceras)
- [Contexto de rastreo W3C][2]
- [Bagaje][10]

Esta configuración por defecto maximiza la compatibilidad con versiones anteriores de SDK y productos Datadog al tiempo que permite la interoperabilidad con otros sistemas de rastreo distribuido como OpenTelemetry.

## Personalizar la propagación del contexto de rastreo

Es posible que tengas que personalizar la configuración de la propagación del contexto de rastreo si tus aplicaciones:

- Comunican la información de rastreo distribuido en un formato compatible diferente
- Necesitan impedir la extracción o inyección de cabeceras de rastreo distribuido

Utiliza las siguientes variables de entorno para configurar formatos para leer y escribir cabeceras de rastreo distribuido. Para conocer los valores de configuración específicos de cada lenguaje, consulta la sección [Compatibilidad de lenguajes][6].

`DD_TRACE_PROPAGATION_STYLE`
: Especifica los formatos de propagación de contextos de rastreo para la extracción y la inyección en una lista separada por comas. Esto puede ser anulado por configuraciones específicas de extracción o inyección.<br>
**Por defecto**: `datadog,tracecontext` <br>
**Nota**: Con múltiples formatos, la extracción sigue el orden especificado (por ejemplo, `datadog,tracecontext` comprueba cabeceras de Datadog primero). El primer contexto válido continúa el rastreo y los contextos válidos adicionales se convierten en enlaces de tramos.

`OTEL_PROPAGATORS`
: Especifica los formatos de propagación de contextos de rastreo tanto para la extracción como para la inyección (lista separada por comas). Prioridad más baja; se ignora si se define cualquier otra variable de entorno de propagación de contextos de rastreo Datadog.<br>
**Nota**: Utiliza esta configuración únicamente al migrar una aplicación del SDK OpenTelemetry al SDK Datadog. Para obtener más información sobre esta configuración y otras variables de entorno OpenTelemetry, consulta [Uso de variables de entorno OpenTelemetry con SDK Datadog][9].

### Configuración avanzada

La mayoría de los servicios envían y reciben cabeceras de contextos de rastreo utilizando el mismo formato. Sin embargo, si tu servicio necesita aceptar cabeceras de contextos de rastreo en un formato y enviarlas en otro, utiliza estas configuraciones:

`DD_TRACE_PROPAGATION_STYLE_EXTRACT`
: Especifica los formatos de propagación de contextos de rastreo para la extracción sólo en una lista separada por comas. Máxima prioridad para configurar propagadores de extracción.

`DD_TRACE_PROPAGATION_STYLE_INJECT`
: Especifica los formatos de propagación de contextos de rastreo para la inyección sólo en una lista separada por comas. Prioridad más alta para configurar propagadores de inyección.

## Formatos admitidos

El SDK Datadog admite los siguientes formatos de contextos de rastreo:

| Formato                 | Valor de configuración           |
|------------------------|-------------------------------|
| [Datadog][1]           | `datadog`                     |
| [Contexto de rastreo W3C][2] | `tracecontext`                |
| [B3 único][3]         | _Valor dependiente del lenguaje_    |
| [B3 multi][4]          | `b3multi`                     |
| [Bagaje][10]          | `baggage`                     |
| [Ninguno][5]              | `none`                        |

## Compatibilidad de lenguajes

{{< tabs >}}

{{% tab "Java" %}}

### Formatos admitidos

El SDK Java Datadog admite los siguientes formatos de contextos de rastreo, incluidos los valores de configuración obsoletos:

| Formato                 | Valor de configuración |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [Contexto de rastreo W3C][2] | `tracecontext`      |
| [B3 único][3]         | `b3 single header`  |
|                        | `b3single`          |
| [B3 multi][4]          | `b3multi`           |
|                        | `b3` (obsoleto)   |
| [AWS X-Ray][5]         | `xray`              |
| [Ninguno][6]              | `none`              |

### Configuración adicional

Además de configurar la variable de entorno, también puedes actualizar los propagadores mediante la configuración de la propiedad del sistema:
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

{{% /tab %}}

{{% tab "Python" %}}

### Formatos admitidos

El SDK Python Datadog admite los siguientes formatos de contextos de rastreo, incluidos los valores de configuración obsoletos:

| Formato                 | Valor de configuración             |
|------------------------|---------------------------------|
| [Datadog][1]           | `datadog`                       |
| [Contexto de rastreo W3C][2] | `tracecontext`                  |
| [B3 único][3]         | `b3`                            |
|                        | `b3 single header` (obsoleto) |
| [B3 multi][4]          | `b3multi`                       |
| [Ninguno][5]              | `none`                          |

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format

{{% /tab %}}

{{% tab "Ruby" %}}

### Formatos admitidos

El SDK Ruby Datadog admite los siguientes formatos de contextos de rastreo, incluidos los valores de configuración obsoletos:

| Formato                 | Valor de configuración |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [Contexto de rastreo W3C][2] | `tracecontext`      |
| [B3 único][3]         | `b3`                |
| [B3 multi][4]          | `b3multi`           |
| [Ninguno][5]              | `none`              |

### Configuración adicional

Además de configurar la variable de entorno, también puedes actualizar los propagadores en código utilizando `Datadog.configure`:

```ruby
Datadog.configure do |c|
  # Lista de los formatos de cabeceras que se deben extraer
  c.tracing.propagation_extract_style = [ 'tracecontext', 'datadog', 'b3' ]

  # Lista de los formatos de cabeceras que se deben inyectar
  c.tracing.propagation_inject_style = [ 'tracecontext', 'datadog' ]
end
```

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format

{{% /tab %}}

{{% tab "Go" %}}

### Formatos admitidos

El SDK Go Datadog admite los siguientes formatos de contextos de rastreo, incluidos los valores de configuración obsoletos:

| Formato                 | Valor de configuración |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [Contexto de rastreo W3C][2] | `tracecontext`      |
| [B3 único][3]         | `B3 single header`  |
| [B3 multi][4]          | `b3multi`           |
|                        | `b3` (obsoleto)   |
| [Ninguno][5]              | `none`              |

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format

{{% /tab %}}

{{% tab "Node.js" %}}

### Formatos admitidos

El SDK Node.js Datadog admite los siguientes formatos de contextos de rastreo, incluidos los valores de configuración obsoletos:

| Formato                 | Valor de configuración |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [Contexto de rastreo W3C][2] | `tracecontext`      |
| [B3 único][3]         | `B3 single header`  |
| [B3 multi][4]          | `b3multi`           |
|                        | `B3` (obsoleto)   |
| [Ninguno][5]              | `none`              |

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format

{{% /tab %}}

{{% tab "PHP" %}}

### Formatos admitidos

El SDK PHP Datadog admite los siguientes formatos de contextos de rastreo, incluidos los valores de configuración obsoletos:

| Formato                 | Valor de configuración |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [Contexto de rastreo W3C][2] | `tracecontext`      |
| [B3 único][3]         | `B3 single header`  |
| [B3 multi][4]          | `b3multi`           |
|                        | `B3` (obsoleto)   |
| [Ninguno][5]              | `none`              |

### Casos de uso adicionales

Los siguientes casos de uso son específicos del SDK PHP Datadog:

{{% collapse-content title="Rastreo distribuido en el inicio de un script PHP" level="h4" %}}

Cuando se inicia un nuevo script PHP, el SDK Datadog comprueba automáticamente la presencia de cabeceras Datadog para el rastreo distribuido:
- `x-datadog-trace-id` (variable de entorno: `HTTP_X_DATADOG_TRACE_ID`)
- `x-datadog-parent-id` (variable de entorno: `HTTP_X_DATADOG_PARENT_ID`)
- `x-datadog-origin` (variable de entorno: `HTTP_X_DATADOG_ORIGIN`)
- `x-datadog-tags` (variable de entorno: `HTTP_X_DATADOG_TAGS`)

{{% /collapse-content %}}

{{% collapse-content title="Configuración manual del contexto de rastreo distribuido" level="h4" %}}

Para configurar manualmente la información de rastreo en un script de CLI de trazas nuevas o existentes, utiliza la función `DDTrace\set_distributed_tracing_context(string $trace_id, string $parent_id, ?string $origin = null, ?array $tags = null)`.

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

Para la versión **0.87.0** y posteriores, si las cabeceras sin procesar están disponibles, utiliza la función `DDTrace\consume_distributed_tracing_headers(array|callable $headersOrCallback)`. **Nota**: Los nombres de las cabeceras deben estar en minúsculas.

```php
$headers = [
    "x-datadog-trace-id" => "1234567890",
    "x-datadog-parent-id" => "987654321",
];

\DDTrace\consume_distributed_tracing_headers($headers);
```

Para extraer el contexto de rastreo directamente como cabeceras, utiliza la función `DDTrace\generate_distributed_tracing_headers(?array $inject = null): array`.

```php
$headers = DDTrace\generate_distributed_tracing_headers();
// Almacena los encabezados en algún lugar, inyéctalos en una solicitud saliente...
// Estos $headers también pueden ser leídos por \DDTrace\consume_distributed_tracing_headers desde otro proceso.
```

El argumento opcional de la función acepta una matriz de nombres de estilos de inyección. Por defecto, es el estilo de inyección configurado.

{{% /collapse-content %}}

{{% collapse-content title="RabbitMQ" level="h4" %}}

El SDK PHP APM admite el rastreo automático de la librería (versión 0.87.0 o posterior) `php-amqplib/php-amqplib`. Sin embargo, es posible que en algunos casos tu rastreo distribuido esté desconectado. Por ejemplo, cuando se leen mensajes de una cola distribuida utilizando el método `basic_get` fuera de una traza existente, es necesario añadir un rastreo personalizado alrededor del procesamiento de la llamada `basic_get` y del mensaje correspondiente:

```php
// Crear una traza alrededor
$newTrace = \DDTrace\start_trace_span();
$newTrace->name = 'basic_get.process';
$newTrace->service = 'amqp';


// llamadas a basic_get + procesamiento de mensajes
$msg = $channel->basic_get($queue);
if ($msg) {
   $messageProcessing($msg);
}


// Una vez hecho, cierra el tramo
\DDTrace\close_span();
```

La creación de esta traza que rodea tu lógica de procesamiento y consumo asegura la observabilidad de tu cola distribuida.

{{% /collapse-content %}}

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format

{{% /tab %}}

{{% tab "C++" %}}

### Formatos admitidos

El SDK C++ Datadog admite los siguientes formatos de contextos de rastreo, incluidos los valores de configuración obsoletos:

| Formato                 | Valor de configuración |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [Contexto de rastreo W3C][2] | `tracecontext`      |
| [B3 multi][4]          | `b3`                |
|                        | `b3multi`           |
| [Ninguno][5]              | `none`              |

### Configuración adicional

Además de configurar la variable de entorno, también puedes actualizar los propagadores en el código:

```cpp
#incluye <datadog/tracer_config.h>
#incluye <datadog/propagation_style.h>

namespace dd = datadog::tracing;
int main() {
  dd::TracerConfig config;
  config.service = "my-service";

  // `injection_styles` indica con qué sistemas de rastreo se rastrea la propagación
  // será compatible con la inyección (envío) de contextos de rastreo.
  // Todos los estilos indicados por `injection_styles` se utilizan para la inyección.
  // `injection_styles` es anulado por las variables de entorno `DD_TRACE_PROPAGATION_STYLE_INJECT`
  // y `DD_TRACE_PROPAGATION_STYLE`.
  config.injection_styles = {dd::PropagationStyle::DATADOG, dd::PropagationStyle::B3};

  // `extraction_styles` indica con qué sistemas de rastreo se rastrea la propagación
  // será compatible con la extracción (recepción) de contextos de rastreo.
  // Los estilos de extracción se aplican en el orden en que aparecen en
  // `extraction_styles`. El primer estilo que produce contextos de rastreo o
  // un error determina el resultado de la extracción.
  // `extraction_styles` es anulado por las variables de entorno
  // `DD_TRACE_PROPAGATION_STYLE_EXTRACT` y `DD_TRACE_PROPAGATION_STYLE`.
  config.extraction_styles = {dd::PropagationStyle::W3C};

  ...
}
```

### Casos de uso adicionales

{{% collapse-content title="Extraer manualmente el contexto propagado" level="h4" %}}

Para extraer el contexto de propagación, implementa una interfaz personalizada `DictReader` y llama a `Tracer::extract_span` o `Tracer::extract_or_create_span`.

El siguiente es un ejemplo de extracción de contexto de propagación a partir de cabeceras HTTP:

```cpp
#incluye <datadog/dict_reader.h>
#incluye <datadog/optional.h>
#incluye <datadog/string_view.h>

#incluye <unordered_map>

namespace dd = datadog::tracing;

class HTTPHeadersReader : public datadog::tracing::DictReader {
  std::unordered_map<dd::StringView, dd::StringView> headers_;

public:
  HTTPHeadersReader(std::unordered_map<dd::StringView, dd::StringView> headers)
    : headers_(std::move(headers)) {}

  ~HTTPHeadersReader() override = default;

  // Devuelve el valor a la `key`especificada o devuelve`nullopt` si no hay
  // ningún valor en `key`.
  dd::Optional<dd::StringView> lookup(dd::StringView key) const override {
    auto found = headers_.find(key);
    if (found == headers_.cend()) return dd::nullopt;

    return found->second;
  }

  // Invoca el `visitor` especificado una vez por cada par clave-valor en este objeto.
  void visit(
      const std::function<void(dd::StringView key, dd::StringView value)>& visitor)
      const override {
      for (const auto& [key, value] : headers_) {
        visitor(key, value);
      }
  };
};

// Ejemplo de uso:
void handle_http_request(const Request& request, datadog::tracing::Tracer& tracer) {
  HTTPHeadersReader reader{request.headers};
  auto maybe_span = tracer.extract_span(reader);
  ..
}
```
{{% /collapse-content %}}

{{% collapse-content title="Inyectar manualmente el contexto para el rastreo distribuido" level="h4" %}}

Para inyectar el contexto de propagación, implementa la interfaz `DictWriter` y llama a `Span::inject` en una instancia de tramo:

```cpp
#incluye <datadog/dict_writer.h>
#incluye <datadog/string_view.h>

#incluye <string>
#incluye <unordered_map>

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

// Ejemplo de uso:
void handle_http_request(const Request& request, dd::Tracer& tracer) {
  auto span = tracer.create_span();

  HTTPHeaderWriter writer(request.headers);
  span.inject(writer);
  // `request.headers` ahora rellenados con las cabeceras necesarias para propagar el tramo.
  ..
}
```
{{% /collapse-content %}}

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format

{{% /tab %}}

{{% tab ".NET" %}}

### Formatos admitidos

El SDK .NET Datadog admite los siguientes formatos de contextos de rastreo, incluidos los valores de configuración obsoletos:

| Formato                 | Valor de configuración           |
|------------------------|-------------------------------|
| [Datadog][1]           | `datadog`                     |
| [Contexto de rastreo W3C][2] | `tracecontext`                |
|                        | `W3C` (obsoleto)            |
| [B3 único][3]         | `B3 single header`            |
|                        | `B3SingleHeader` (obsoleto) |
| [B3 multi][4]          | `b3multi`                     |
|                        | `B3` (obsoleto)             |
| [Ninguno][5]              | `none`                        |

### Casos de uso adicionales

{{% collapse-content title="Valores previos a la configuración" level="h4" %}}

- A partir de la versión [2.48.0][6], el estilo de propagación por defecto es `datadog, tracecontext`. Esto significa que las cabeceras Datadog se utilizan en primer lugar, seguidas del Contexto de rastreo W3C.
- Antes de la versión 2.48.0, el orden era `tracecontext, Datadog` tanto para la extracción como para la propagación de la inyección.
- Antes de la versión [2.22.0][7], sólo estaba habilitado el estilo de inyección `Datadog`.
- A partir de la versión [2.42.0][8], cuando se especifican múltiples extractores, la configuración `DD_TRACE_PROPAGATION_EXTRACT_FIRST=true` especifica si la extracción de contexto debe salir inmediatamente al detectar el primer `tracecontext` válido. El valor por defecto es `false`.

{{% /collapse-content %}}

{{% collapse-content title="Rastreo distribuido con colas de mensajes" level="h4" %}}

En la mayoría de los casos, la extracción y la inyección de cabeceras son automáticas. Sin embargo, hay algunos casos conocidos en los que tu rastreo distribuido puede desconectarse. Por ejemplo, al leer mensajes de una cola distribuida, algunas bibliotecas pueden perder el contexto del tramo. Esto también ocurre si defines `DD_TRACE_KAFKA_CREATE_CONSUMER_SCOPE_ENABLED` como `false` al consumir mensajes de Kafka. En estos casos, puedes añadir un rastreo personalizado utilizando el siguiente código:

```csharp
var spanContextExtractor = new SpanContextExtractor();
var parentContext = spanContextExtractor.Extract(headers, (headers, key) => GetHeaderValues(headers, key));
var spanCreationSettings = new SpanCreationSettings() { Parent = parentContext };
using var scope = Tracer.Instance.StartActive("operation", spanCreationSettings);
```

Proporciona el método `GetHeaderValues`. La forma de implementar este método depende de la estructura que lleve `SpanContext`.

Los siguientes son algunos ejemplos:

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
    // Para SQS, hay un máximo de 10 encabezados de atributo de mensaje,
    // por lo que los encabezados de Datadog se combinan en un encabezado con las siguientes propiedades:
    // - Clave: "_datadog"
    // - Valor: MessageAttributeValue object
    //   - Tipo de datos: "String"
    //   - Valor de cadena: <JSON map with key-value headers>
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

Cuando utilizas la API `SpanContextExtractor` para los tramos de consumidor de Kafka, establece `DD_TRACE_KAFKA_CREATE_CONSUMER_SCOPE_ENABLED` en `false`. Esto garantiza que el tramo consumidor se cierre de forma correcta inmediatamente después de que el mensaje se consuma desde el tema, y que los metadatos (como `partition` y `offset`) se registren correctamente. Los tramos creados a partir de mensajes de Kafka utilizando la API `SpanContextExtractor` son secundarios del tramo productor y pares del tramo consumidor.

Si necesitas propagar el contexto de rastreo de forma manual (para bibliotecas que no se instrumentan automáticamente, como el cliente WCF), puedes utilizar la API `SpanContextInjection`. He aquí un ejemplo para WCF donde `this` es el cliente WCF:

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


{{% /tab %}}

{{< /tabs >}}

## Formatos de cabecera personalizados

### Formato Datadog

Cuando el SDK Datadog está configurado con el formato Datadog para la extracción o la inyección (posiblemente ambos), el SDK Datadog interactúa con las siguientes cabeceras de solicitudes:

`x-datadog-trace-id`
: Especifica los 64 bits inferiores del trace-id de 128 bits, en formato decimal.

`x-datadog-parent-id`
: Especifica el span-id de 64 bits del tramo actual, en formato decimal.

`x-datadog-origin`
: Especifica el producto Datadog que inició el rastreo como [Real User Monitoring][7] o [Synthetic Monitoring][8]. Si esta cabecera está presente, se espera que el valor sea uno de los siguientes: `rum`, `synthetics`, `synthetics-browser`.

`x-datadog-sampling-priority`
: Especifica la decisión de muestreo tomada para el tramo representado como un número entero, en formato decimal.

`x-datadog-tags`
: Especifica información complementaria del estado del rastreo de Datadog, incluidos, entre otros, los 64 bits superiores del trace-id de 128 bits (en formato hexadecimal).

### Ningún formato

Cuando el SDK Datadog está configurado con el formato Ninguno para la extracción o la inyección (posiblemente ambos), el SDK Datadog _no_ interactúa con las cabeceras de solicitudes, lo que significa que la operación de propagación de contexto correspondiente no hace nada.

### Bagaje

_Actualmente disponible en Python y Node.js. Para otros lenguajes, ponte en contacto con el [servicio de asistencia][11]_

Por defecto, el Bagaje se propaga automáticamente a través de una solicitud distribuida utilizando las [cabeceras compatibles con W3C][10] de OpenTelemetry. Para desactivar el bagaje, define [DD_TRACE_PROPAGATION_STYLE][12] como `datadog,tracecontext`.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format
[6]: #language-support
[7]: /es/real_user_monitoring/platform/connect_rum_and_traces
[8]: /es/synthetics/platform/apm
[9]: /es/opentelemetry/interoperability/environment_variable_support
[10]: https://www.w3.org/TR/baggage/
[11]: /es/help
[12]: #customize-trace-context-propagation
