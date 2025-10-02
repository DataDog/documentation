---
title: Trace Context Propagation
description: >-
  Extract and inject Datadog, B3, and W3C Trace Context headers to propagate the
  context of a distributed trace.
breadcrumbs: Docs > OpenTelemetry in Datadog > Reference > Trace Context Propagation
sourceUrl: >-
  https://docs.datadoghq.com/opentelemetry/reference/trace_context_propagation/index.html
---

# Trace Context Propagation

Trace Context propagation is the mechanism of passing tracing information like Trace ID, Span ID, and sampling decisions from one part of a distributed application to another. This enables all traces (and additional telemetry) in a request to be correlated. When automatic instrumentation is enabled, trace context propagation is handled automatically by the APM SDK.

By default, the Datadog SDK extracts and injects distributed tracing headers using the following formats:

- Datadog (takes higher precedence when extracting headers)
- [W3C Trace Context](https://www.w3.org/TR/trace-context/)
- [Baggage](https://www.w3.org/TR/baggage/)

This default configuration maximizes compatibility with older Datadog SDK versions and products while allowing interoperability with other distributed tracing systems like OpenTelemetry.

## Customize trace context propagation{% #customize-trace-context-propagation %}

You may need to customize the trace context propagation configuration if your applications:

- Communicate distributed tracing information in a different supported format
- Need to prevent extracting or injecting distributed tracing headers

Use the following environment variables to configure formats for reading and writing distributed tracing headers. Refer to the Language support section for language-specific configuration values.

{% dl %}

{% dt %}
`DD_TRACE_PROPAGATION_STYLE`
{% /dt %}

{% dd %}
Specifies trace context propagation formats for extraction and injection in a comma-separated list. May be overridden by extract-specific or inject-specific configurations.**Default**: `datadog,tracecontext,baggage`**Note**: With multiple trace context formats, extraction follows the specified order (for example, `datadog,tracecontext` checks Datadog headers first). The first valid context continues the trace; additional valid contexts become span links. When `baggage` is included, it is added as baggage to the existing context.
{% /dd %}

{% dt %}
`OTEL_PROPAGATORS`
{% /dt %}

{% dd %}
Specifies trace context propagation formats for both extraction and injection (comma-separated list). Lowest precedence; ignored if any other Datadog trace context propagation environment variable is set.**Note**: Only use this configuration when migrating an application from the OpenTelemetry SDK to the Datadog SDK. For more information on this configuration and other OpenTelemetry environment variables, see [Using OpenTelemetry Environment Variables with Datadog SDKs](https://docs.datadoghq.com/opentelemetry/interoperability/environment_variable_support).
{% /dd %}

{% dt %}
`DD_TRACE_PROPAGATION_BEHAVIOR_EXTRACT`
{% /dt %}

{% dd %}
Specifies how incoming distributed tracing headers should be handled at a service level. Accepted values are:`continue`: The SDK will continue the distributed trace if the incoming distributed tracing headers represent a valid trace context.`restart`: The SDK will always start a new trace. If the incoming distributed tracing headers represent a valid trace context, that trace context will be represented as a span link on service entry spans (as opposed to the parent span in the `continue` configuration).`ignore`: The SDK will always start a new trace and all incoming distributed tracing headers are ignored.**Default**: `continue`**Note**: This is only implemented in the .NET, Node.js, Python, and Java libraries.
{% /dd %}

{% /dl %}

### Advanced configuration{% #advanced-configuration %}

Most services send and receive trace context headers using the same format. However, if your service needs to accept trace context headers in one format and send them in another, use these configurations:

{% dl %}

{% dt %}
`DD_TRACE_PROPAGATION_STYLE_EXTRACT`
{% /dt %}

{% dd %}
Specifies trace context propagation formats for extraction only in a comma-separated list. Highest precedence for configuring extraction propagators.
{% /dd %}

{% dt %}
`DD_TRACE_PROPAGATION_STYLE_INJECT`
{% /dt %}

{% dd %}
Specifies trace context propagation formats for injection only in comma-separated list. Highest precedence for configuring injection propagators.
{% /dd %}

{% /dl %}

## Supported formats{% #supported-formats %}

The Datadog SDK supports the following trace context formats:

| Format                                                                    | Configuration Value        |
| ------------------------------------------------------------------------- | -------------------------- |
| Datadog                                                                   | `datadog`                  |
| [W3C Trace Context](https://www.w3.org/TR/trace-context/)                 | `tracecontext`             |
| [B3 Single](https://github.com/openzipkin/b3-propagation#single-header)   | *Language Dependent Value* |
| [B3 Multi](https://github.com/openzipkin/b3-propagation#multiple-headers) | `b3multi`                  |
| [Baggage](https://www.w3.org/TR/baggage/)                                 | `baggage`                  |
| None                                                                      | `none`                     |

## Language support{% #language-support %}

{% tab title="Java" %}
### Supported formats{% #supported-formats %}

The Datadog Java SDK supports the following trace context formats, including deprecated configuration values:

| Format                                                                                                       | Configuration Value |
| ------------------------------------------------------------------------------------------------------------ | ------------------- |
| Datadog                                                                                                      | `datadog`           |
| [W3C Trace Context](https://www.w3.org/TR/trace-context/)                                                    | `tracecontext`      |
| [B3 Single](https://github.com/openzipkin/b3-propagation#single-header)                                      | `b3 single header`  |
| `b3single`                                                                                                   |
| [B3 Multi](https://github.com/openzipkin/b3-propagation#multiple-headers)                                    | `b3multi`           |
| `b3` (deprecated)                                                                                            |
| [Baggage](https://www.w3.org/TR/baggage/)                                                                    | `baggage`           |
| [AWS X-Ray](https://docs.aws.amazon.com/xray/latest/devguide/xray-concepts.html#xray-concepts-tracingheader) | `xray`              |
| None                                                                                                         | `none`              |

### Additional configuration{% #additional-configuration %}

In addition to the environment variable configuration, you can also update the propagators using System Property configuration:

- `-Ddd.trace.propagation.style=datadog,b3multi`
- `-Dotel.propagators=datadog,b3multi`
- `-Ddd.trace.propagation.style.inject=datadog,b3multi`
- `-Ddd.trace.propagation.style.extract=datadog,b3multi`

{% /tab %}

{% tab title="Python" %}
### Supported formats{% #supported-formats %}

The Datadog Python SDK supports the following trace context formats, including deprecated configuration values:

| Format                                                                    | Configuration Value |
| ------------------------------------------------------------------------- | ------------------- |
| Datadog                                                                   | `datadog`           |
| [W3C Trace Context](https://www.w3.org/TR/trace-context/)                 | `tracecontext`      |
| [Baggage](https://www.w3.org/TR/baggage/)                                 | `baggage`           |
| [B3 Single](https://github.com/openzipkin/b3-propagation#single-header)   | `b3`                |
| `b3 single header` (deprecated)                                           |
| [B3 Multi](https://github.com/openzipkin/b3-propagation#multiple-headers) | `b3multi`           |
| None                                                                      | `none`              |

{% /tab %}

{% tab title="Ruby" %}
### Supported formats{% #supported-formats %}

The Datadog Ruby SDK supports the following trace context formats, including deprecated configuration values:

| Format                                                                    | Configuration Value |
| ------------------------------------------------------------------------- | ------------------- |
| Datadog                                                                   | `datadog`           |
| [W3C Trace Context](https://www.w3.org/TR/trace-context/)                 | `tracecontext`      |
| [Baggage](https://www.w3.org/TR/baggage/)                                 | `baggage`           |
| [B3 Single](https://github.com/openzipkin/b3-propagation#single-header)   | `b3`                |
| [B3 Multi](https://github.com/openzipkin/b3-propagation#multiple-headers) | `b3multi`           |
| None                                                                      | `none`              |

### Additional configuration{% #additional-configuration %}

In addition to the environment variable configuration, you can also update the propagators in code by using `Datadog.configure`:

```ruby
Datadog.configure do |c|
  # List of header formats that should be extracted
  c.tracing.propagation_extract_style = [ 'tracecontext', 'datadog', 'b3' ]

  # List of header formats that should be injected
  c.tracing.propagation_inject_style = [ 'tracecontext', 'datadog' ]
end
```

{% /tab %}

{% tab title="Go" %}
### Supported formats{% #supported-formats %}

The Datadog Go SDK supports the following trace context formats, including deprecated configuration values:

| Format                                                                    | Configuration Value |
| ------------------------------------------------------------------------- | ------------------- |
| Datadog                                                                   | `datadog`           |
| [W3C Trace Context](https://www.w3.org/TR/trace-context/)                 | `tracecontext`      |
| [Baggage](https://www.w3.org/TR/baggage/)                                 | `baggage`           |
| [B3 Single](https://github.com/openzipkin/b3-propagation#single-header)   | `B3 single header`  |
| [B3 Multi](https://github.com/openzipkin/b3-propagation#multiple-headers) | `b3multi`           |
| `b3` (deprecated)                                                         |
| None                                                                      | `none`              |

{% /tab %}

{% tab title="Node.js" %}
### Supported formats{% #supported-formats %}

The Datadog Node.js SDK supports the following trace context formats, including deprecated configuration values:

| Format                                                                    | Configuration Value |
| ------------------------------------------------------------------------- | ------------------- |
| Datadog                                                                   | `datadog`           |
| [W3C Trace Context](https://www.w3.org/TR/trace-context/)                 | `tracecontext`      |
| [Baggage](https://www.w3.org/TR/baggage/)                                 | `baggage`           |
| [B3 Single](https://github.com/openzipkin/b3-propagation#single-header)   | `B3 single header`  |
| [B3 Multi](https://github.com/openzipkin/b3-propagation#multiple-headers) | `b3multi`           |
| `B3` (deprecated)                                                         |
| None                                                                      | `none`              |

{% /tab %}

{% tab title="PHP" %}
### Supported formats{% #supported-formats %}

The Datadog PHP SDK supports the following trace context formats, including deprecated configuration values:

| Format                                                                    | Configuration Value |
| ------------------------------------------------------------------------- | ------------------- |
| Datadog                                                                   | `datadog`           |
| [W3C Trace Context](https://www.w3.org/TR/trace-context/)                 | `tracecontext`      |
| [Baggage](https://www.w3.org/TR/baggage/)                                 | `baggage`           |
| [B3 Single](https://github.com/openzipkin/b3-propagation#single-header)   | `B3 single header`  |
| [B3 Multi](https://github.com/openzipkin/b3-propagation#multiple-headers) | `b3multi`           |
| `B3` (deprecated)                                                         |
| None                                                                      | `none`              |

### Additional use cases{% #additional-use-cases %}

The following use cases are specific to the Datadog PHP SDK:

{% collapsible-section %}
#### Distributed tracing on PHP script launch

When a new PHP script is launched, the Datadog SDK automatically checks for the presence of Datadog headers for distributed tracing:

- `x-datadog-trace-id` (environment variable: `HTTP_X_DATADOG_TRACE_ID`)
- `x-datadog-parent-id` (environment variable: `HTTP_X_DATADOG_PARENT_ID`)
- `x-datadog-origin` (environment variable: `HTTP_X_DATADOG_ORIGIN`)
- `x-datadog-tags` (environment variable: `HTTP_X_DATADOG_TAGS`)

{% /collapsible-section %}

{% collapsible-section %}
#### Manually setting the distributed tracing context

To manually set tracing information in a CLI script for new or existing traces, use the `DDTrace\set_distributed_tracing_context(string $trace_id, string $parent_id, ?string $origin = null, ?array $tags = null)` function.

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

For version **0.87.0** and later, if the raw headers are available, use the `DDTrace\consume_distributed_tracing_headers(array|callable $headersOrCallback)` function. **Note**: The header names must be in lowercase.

```php
$headers = [
	"x-datadog-trace-id" => "1234567890",
	"x-datadog-parent-id" => "987654321",
];

\DDTrace\consume_distributed_tracing_headers($headers);
```

To extract the trace context directly as headers, use the `DDTrace\generate_distributed_tracing_headers(?array $inject = null): array` function.

```php
$headers = DDTrace\generate_distributed_tracing_headers();
// Store headers somewhere, inject them in an outbound request, ...
// These $headers can also be read back by \DDTrace\consume_distributed_tracing_headers from another process.
```

This function's optional argument accepts an array of injection style names. It defaults to the configured injection style.
{% /collapsible-section %}

{% collapsible-section %}
#### RabbitMQ

The PHP APM SDK supports automatic tracing of the `php-amqplib/php-amqplib` library (version 0.87.0+). However, in some cases, your distributed trace may be disconnected. For example, when reading messages from a distributed queue using the `basic_get` method outside an existing trace, you need to add a custom trace around the `basic_get` call and corresponding message processing:

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

Creating this surrounding trace to your consuming-processing logic ensures observability of your distributed queue.
{% /collapsible-section %}

{% /tab %}

{% tab title="C++" %}
### Supported formats{% #supported-formats %}

The Datadog C++ SDK supports the following trace context formats, including deprecated configuration values:

| Format                                                                    | Configuration Value |
| ------------------------------------------------------------------------- | ------------------- |
| Datadog                                                                   | `datadog`           |
| [W3C Trace Context](https://www.w3.org/TR/trace-context/)                 | `tracecontext`      |
| [Baggage](https://www.w3.org/TR/baggage/)                                 | `baggage`           |
| [B3 Multi](https://github.com/openzipkin/b3-propagation#multiple-headers) | `b3`                |
| `b3multi`                                                                 |
| None                                                                      | `none`              |

### Additional configuration{% #additional-configuration %}

In addition to the environment variable configuration, you can also update the propagators in code:

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

### Additional use cases{% #additional-use-cases %}

{% collapsible-section %}
#### Manually extract propagated context

To extract propagation context, implement a custom `DictReader` interface and call `Tracer::extract_span` or `Tracer::extract_or_create_span`.

Here is an example of extracting propagation context from HTTP Headers:

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

{% /collapsible-section %}

{% collapsible-section %}
#### Manually inject context for distributed tracing

To inject propagation context, implement the `DictWriter` interface and call `Span::inject` on a span instance:

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

{% /collapsible-section %}

{% /tab %}

{% tab title=".NET" %}
### Supported formats{% #supported-formats %}

The Datadog .NET SDK supports the following trace context formats, including deprecated configuration values:

| Format                                                                    | Configuration Value |
| ------------------------------------------------------------------------- | ------------------- |
| Datadog                                                                   | `datadog`           |
| [W3C Trace Context](https://www.w3.org/TR/trace-context/)                 | `tracecontext`      |
| [Baggage](https://www.w3.org/TR/baggage/)                                 | `baggage`           |
| `W3C` (deprecated)                                                        |
| [B3 Single](https://github.com/openzipkin/b3-propagation#single-header)   | `B3 single header`  |
| `B3SingleHeader` (deprecated)                                             |
| [B3 Multi](https://github.com/openzipkin/b3-propagation#multiple-headers) | `b3multi`           |
| `B3` (deprecated)                                                         |
| None                                                                      | `none`              |

### Additional use cases{% #additional-use-cases %}

{% collapsible-section %}
#### Prior configuration defaults

- As of version [2.48.0][6], the default propagation style is `datadog, tracecontext`. This means Datadog headers are used first, followed by W3C Trace Context.
- Prior to version 2.48.0, the order was `tracecontext, Datadog` for both extraction and injection propagation.
- Prior to version [2.22.0][7], only the `Datadog` injection style was enabled.
- As of version [2.42.0][8], when multiple extractors are specified, the `DD_TRACE_PROPAGATION_EXTRACT_FIRST=true` configuration specifies whether context extraction should exit immediately upon detecting the first valid `tracecontext`. The default value is `false`.

{% /collapsible-section %}

{% collapsible-section %}
#### Distributed tracing with message queues

In most cases, header extraction and injection are automatic. However, there are some known cases where your distributed trace can be disconnected. For instance, when reading messages from a distributed queue, some libraries may lose the span context. It also happens if you set `DD_TRACE_KAFKA_CREATE_CONSUMER_SCOPE_ENABLED` to `false` when consuming Kafka messages. In these cases, you can add a custom trace using the following code:

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

{% /collapsible-section %}

{% /tab %}

## Custom header formats{% #custom-header-formats %}

### Datadog format{% #datadog-format %}

When the Datadog SDK is configured with the Datadog format for extraction or injection (possibly both), the Datadog SDK interacts with the following request headers:

{% dl %}

{% dt %}
`x-datadog-trace-id`
{% /dt %}

{% dd %}
Specifies the lower 64-bits of the 128-bit trace-id, in decimal format.
{% /dd %}

{% dt %}
`x-datadog-parent-id`
{% /dt %}

{% dd %}
Specifies the 64-bits span-id of the current span, in decimal format.
{% /dd %}

{% dt %}
`x-datadog-origin`
{% /dt %}

{% dd %}
Specifies the Datadog product that initiated the trace, such as [Real User Monitoring](https://docs.datadoghq.com/real_user_monitoring/correlate_with_other_telemetry/apm) or [Synthetic Monitoring](https://docs.datadoghq.com/synthetics/platform/apm). If this header is present, the value is expected to be one of: `rum`, `synthetics`, `synthetics-browser`.
{% /dd %}

{% dt %}
`x-datadog-sampling-priority`
{% /dt %}

{% dd %}
Specifies the sampling decision made for the represented span as an integer, in decimal format.
{% /dd %}

{% dt %}
`x-datadog-tags`
{% /dt %}

{% dd %}
Specifies supplemental Datadog trace state information, including but not limited to the higher 64-bits of the 128-bit trace-id (in hexadecimal format).
{% /dd %}

{% /dl %}

### None format{% #none-format %}

When the Datadog SDK is configured with the None format for extraction or injection (possibly both), the Datadog SDK does *not* interact with request headers, meaning that the corresponding context propagation operation does nothing.

### Baggage{% #baggage %}

By default, Baggage is automatically propagated through a distributed request using OpenTelemetry's [W3C-compatible headers](https://www.w3.org/TR/baggage/). To disable baggage, set DD_TRACE_PROPAGATION_STYLE to `datadog,tracecontext`.

#### Adding baggage as span tags{% #adding-baggage-as-span-tags %}

By default, `user.id,session.id,account.id` baggage keys are added as span tags. To customize this configuration, see [Context Propagation Configuration](https://docs.datadoghq.com/tracing/trace_collection/library_config#context-propagation). Specified baggage keys are automatically added as span tags `baggage.<key>` (for example, `baggage.user.id`).

Support for baggage as span tags was introduced in the following releases:

| Language  | Minimum SDK version |
| --------- | ------------------- |
| Java      | 1.52.0              |
| Python    | 3.7.0               |
| Ruby      | 2.20.0              |
| Go        | 2.2.2               |
| .NET      | 3.23.0              |
| Node      | 5.54.0              |
| PHP       | 1.10.0              |
| C++/Proxy | Not yet supported   |

## Further reading{% #further-reading %}

- [Understand APM terminology](https://docs.datadoghq.com/tracing/glossary/)
- [Monitor OpenTelemetry-instrumented apps with support for W3C Trace Context](https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/)
- [Interoperability of OpenTelemetry API and Datadog instrumented traces](https://docs.datadoghq.com/opentelemetry/guide/otel_api_tracing_interoperability)
