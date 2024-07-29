---
code_lang: dotnet
code_lang_weight: 80
further_reading:
- link: https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/
  tag: Blog
  text: Monitorizar aplicaciones instrumentadas con OpenTelemetry compatibles con
    el contexto de rastreo de W3C
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: Documentación
  text: Interoperabilidad de la API de OpenTelemetry e instrumentación de trazas de
    Datadog
title: Propagación del contexto de rastreo de .NET
type: multi-code-lang
---


El rastreador de Datadog APM admite la extracción e inyección de encabezados [B3][5] y [contexto de rastreo W3C][6] para el rastreo distribuido.

Puedes configurar estilos de inyección y extracción para encabezados distribuidos.

El rastreador de .NET admite los siguientes estilos:

- Contexto de rastreo W3C: `tracecontext` (el alias`W3C` está obsoleto)
- Datadog: `datadog`
- Encabezado múltiple B3: `b3multi` (el alias `B3` está obsoleto)
- Encabezado único B3: `B3 single header` (el alias `B3SingleHeader` está obsoleto)

Puedes utilizar las siguientes variables de entorno para configurar estilos de inyección y extracción:

- `DD_TRACE_PROPAGATION_STYLE_INJECT=tracecontext, datadog, b3multi`
- `DD_TRACE_PROPAGATION_STYLE_EXTRACT=tracecontext, datadog, b3multi`

Los valores de la variable de entorno son listas separadas por comas de estilos de encabezado habilitados para la inyección o extracción. Si se habilitan varios estilos de extracción, el intento de extracción se completa en el orden de los estilos configurados y utiliza el primer valor extraído con éxito.

**Notas**:

- A partir de la versión [2.48.0](https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.48.0), el estilo de propagación por defecto es `datadog, tracecontext`, por lo que se utilizan los encabezados de Datadog, seguidos del contexto de rastreo W3C. Antes de la versión 2.48.0, el orden era `tracecontext, Datadog` tanto para la propagación por extracción como por inyección.  Antes de la versión [2.22.0](https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.22.0), sólo estaba habilitado el estilo de inyección `Datadog`.
- A partir de la versión [2.42.0](https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.42.0), cuando se especifican múltiples extractores, la configuración `DD_TRACE_PROPAGATION_EXTRACT_FIRST=true` especifica si la extracción de contexto debe salir inmediatamente al detectar el primer `tracecontext` válido. El valor por defecto es `false`.

En la mayoría de los casos, la extracción y la inyección de encabezados son transparentes. Existen algunos casos conocidos en los que tu traza distribuida puede desconectarse. Por ejemplo, al leer mensajes de una cola distribuida, algunas bibliotecas pueden perder el contexto de tramo (span). También ocurre si estableces `DD_TRACE_KAFKA_CREATE_CONSUMER_SCOPE_ENABLED` en `false` al consumir mensajes de Kafka. En ese caso, puedes añadir una traza personalizada utilizando el siguiente código:

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

## Leer más

{{< partial name="whats-next/whats-next.html" >}}


[5]: https://github.com/openzipkin/b3-propagation
[6]: https://github.com/w3c/trace-context