---
title: Propagating .NET Trace Context
kind: documentation
code_lang: dotnet
type: multi-code-lang
code_lang_weight: 80
further_reading:
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
---


The Datadog APM Tracer supports [B3][5] and [W3C (TraceParent)][6] headers extraction and injection for distributed tracing.

You can configure injection and extraction styles for distributed headers.

The .NET Tracer supports the following styles:

- W3C: `tracecontext` (`W3C` is deprecated)
- Datadog: `Datadog`
- B3 Multi Header: `b3multi` (`B3` is deprecated)
- B3 Single Header: `B3 single header` (`B3SingleHeader` is deprecated)

You can use the following environment variables to configure injection and extraction styles:

- `DD_TRACE_PROPAGATION_STYLE_INJECT=tracecontext, Datadog, b3multi`
- `DD_TRACE_PROPAGATION_STYLE_EXTRACT=tracecontext, Datadog, b3multi`

The environment variable values are comma-separated lists of header styles enabled for injection or extraction. If multiple extraction styles are enabled, the extraction attempt is completed in the order of configured styles, and uses the first successful extracted value.

Starting from version 2.22.0, the default injection style is `tracecontext, Datadog`, so the W3C context is used, followed by the Datadog headers. Prior to version 2.22.0, only the `Datadog` injection style is enabled.

In most cases, headers extraction and injection are transparent. There are some known cases where your distributed trace can be disconnected. For instance, when reading messages from a distributed queue, some libraries may lose the span context. It also happens if you set `DD_TRACE_KAFKA_CREATE_CONSUMER_SCOPE_ENABLED` to `false` when consuming Kafka messages. In that case, you can add a custom trace using the following code:

```csharp
var spanContextExtractor = new SpanContextExtractor();
var parentContext = spanContextExtractor.Extract(headers, (headers, key) => GetHeaderValues(headers, key));
var spanCreationSettings = new SpanCreationSettings() { Parent = parentContext };
using var scope = Tracer.Instance.StartActive("operation", spanCreationSettings);
```

Provide the `GetHeaderValues` method. The way this method is implemented depends on the structure that carries `SpanContext`.

Here are some examples:

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

When using the `SpanContextExtractor` API to trace Kafka consumer spans, set `DD_TRACE_KAFKA_CREATE_CONSUMER_SCOPE_ENABLED` to `false`. This ensures the consumer span is correctly closed immediately after the message is consumed from the topic, and the metadata (such as `partition` and `offset`) is recorded correctly. Spans created from Kafka messages using the `SpanContextExtractor` API are children of the producer span, and siblings of the consumer span.



[5]: https://github.com/openzipkin/b3-propagation
[6]: https://github.com/w3c/trace-context
