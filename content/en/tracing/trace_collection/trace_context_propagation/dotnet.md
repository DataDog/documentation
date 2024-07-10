---
title: Propagating .NET Trace Context
code_lang: dotnet
type: multi-code-lang
code_lang_weight: 80
further_reading:
    - link: 'https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/'
      tag: 'Blog'
      text: 'Monitor OpenTelemetry-instrumented apps with support for W3C Trace Context'
    - link: '/opentelemetry/guide/otel_api_tracing_interoperability'
      tag: 'Documentation'
      text: 'Interoperability of OpenTelemetry API and Datadog instrumented traces'
---


The Datadog APM Tracer supports [B3][5] and [W3C Trace Context][6] headers extraction and injection for distributed tracing.

You can configure injection and extraction styles for distributed headers.

The .NET Tracer supports the following styles:

- W3C Trace Context: `tracecontext` (`W3C` alias is deprecated)
- Datadog: `datadog`
- B3 Multi Header: `b3multi` (`B3` alias is deprecated)
- B3 Single Header: `B3 single header` (`B3SingleHeader` alias is deprecated)

You can use the following environment variables to configure injection and extraction styles:

- `DD_TRACE_PROPAGATION_STYLE_INJECT=tracecontext, datadog, b3multi`
- `DD_TRACE_PROPAGATION_STYLE_EXTRACT=tracecontext, datadog, b3multi`

The environment variable values are comma-separated lists of header styles enabled for injection or extraction. If multiple extraction styles are enabled, the extraction attempt is completed in the order of configured styles, and uses the first successful extracted value.

**Notes**: 

- Starting from version [2.48.0](https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.48.0), the default propagation style is `datadog, tracecontext`, so the Datadog headers are used, followed by the W3C Trace Context. Prior to version 2.48.0, the order was `tracecontext, Datadog` for both extraction and injection propagation.  Prior to version [2.22.0](https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.22.0), only the `Datadog` injection style was enabled.
- Starting from version [2.42.0](https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.42.0), when multiple extractors are specified, the `DD_TRACE_PROPAGATION_EXTRACT_FIRST=true` configuration specifies whether context extraction should exit immediately upon detecting the first valid `tracecontext`. The default value is `false`.

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

If you need to propagate trace context manually (for libraries that are not instrumented automatically, like the WCF client), you can use the `SpanContextInjection` API. Here is an example for WCF where `this` is the WCF client:

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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[5]: https://github.com/openzipkin/b3-propagation
[6]: https://github.com/w3c/trace-context
