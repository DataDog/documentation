---
title: Trace Context Propagation
type: multi-code-lang
description: 'Extract and inject Datadog, B3, and W3C Trace Context headers to propagate the context of a distributed trace.'
aliases:
further_reading:
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Understand APM terminology'
    - link: 'https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/'
      tag: 'Blog'
      text: 'Monitor OpenTelemetry-instrumented apps with support for W3C Trace Context'
    - link: '/opentelemetry/guide/otel_api_tracing_interoperability'
      tag: 'Documentation'
      text: 'Interoperability of OpenTelemetry API and Datadog instrumented traces'
---

Trace Context propagation is the mechanism of passing tracing information like Trace ID, Span ID, and sampling decisions from one part of a distributed application to another. This enables all traces (and additional telemetry) in a request to be correlated. When automatic instrumentation is enabled, trace context propagation is handled automatically by the tracing library.

By default, all of the Datadog tracing libraries read and write distributed tracing headers using both the **Datadog** format and the [**W3C Trace Context**][2] formats. When reading incoming headers, the language SDKs will give higher precedence to the Datadog format.

## Customization

If you need to customize the trace context propagation configuration, there are several environment variables you can use to configure the formats that are used for reading and writing distributed tracing headers. To enable a specific propagator, make sure to use the corresponding configuration value for the tracing library, as outlined in the **Language support** section.

<div class="alert alert-info">
If multiple propagators are enabled, the extraction attempt is done in the specified order, and the first valid trace context is used to continue the distributed trace. If additional valid trace contexts are found, the tracing information will be recorded as individual span links.</div>

### Services Instrumented with Datadog SDK

`DD_TRACE_PROPAGATION_STYLE`
: Specifies propagators (in a comma-separated list) to be used for trace context propagation (extraction and injection). This may be overridden by the extract-specific or inject-specific configurations. <br>
**Default:** `datadog,tracecontext`

### Services Instrumented with OpenTelemetry SDK

`OTEL_PROPAGATORS`
: Specifies propagators (in a comma-separated list) to be used for trace context propagation. This configuration takes the lowest precedence and will be ignored if any other Datadog propagation environment variable is set.

### Advanced configuration

In the majority of scenarios, you will want to both send and receive trace context headers using the same format. However, if your service needs to accept trace context headers in one format and send them in another format, you can customize them with the following configurations.

`DD_TRACE_PROPAGATION_STYLE_EXTRACT`
: Specifies propagators (in a comma-separated list) to be used only for trace context extraction. This configuration takes the highest precedence over all other configurations for configuring the extraction propagators.

`DD_TRACE_PROPAGATION_STYLE_INJECT`
: Specifies propagators (in a comma-separated list) to be used only for trace context injection. This configuration takes the highest precedence over all other configurations for configuring the injection propagators.

## Language support

{{< tabs >}}

{{% tab "Java" %}}

### Supported formats
The Datadog Java SDK supports the following trace context formats:

| Format                 | Configuration Value |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [W3C Trace Context][2] | `tracecontext`      |
| [B3 Single][3]         | `b3 single header`  |
|                        | `b3single`          |
| [B3 Multi][4]          | `b3multi`           |
|                        | `b3` (deprecated)   |
| [AWS X-Ray][5]         | `xray`              |
| [None][6]              | `none`              |

### Additional configuration
In addition to the environment variable configuration, you can also update the propagators using System Property configuration:
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

### Supported formats
The Datadog Python SDK supports the following trace context formats:

| Format                 | Configuration Value |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [W3C Trace Context][2] | `tracecontext`      |
| [B3 Single][3]         | `b3`                |
| [B3 Multi][4]          | `b3multi`           |
| [None][5]              | `none`              |

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format

{{% /tab %}}

{{% tab "Ruby" %}}

### Supported formats
The Datadog Ruby SDK supports the following trace context formats:

| Format                 | Configuration Value |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [W3C Trace Context][2] | `tracecontext`      |
| [B3 Single][3]         | `b3`                |
| [B3 Multi][4]          | `b3multi`           |
| [None][5]              | `none`              |

### Additional configuration
In addition to the environment variable configuration, you can also update the propagators in code by using `Datadog.configure`:

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

{{% /tab %}}

{{% tab "Go" %}}

### Supported formats
The Datadog Go SDK supports the following trace context formats:

| Format                 | Configuration Value |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [W3C Trace Context][2] | `tracecontext`      |
| [B3 Single][3]         | `B3 single header`  |
| [B3 Multi][4]          | `b3`                |
| [None][5]              | `none`              |

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format

{{% /tab %}}

{{% tab "NodeJS" %}}

### Supported formats
The Datadog NodeJS SDK supports the following trace context formats:

| Format                 | Configuration Value |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [W3C Trace Context][2] | `tracecontext`      |
| [B3 Single][3]         | `B3 single header`  |
| [B3 Multi][4]          | `b3multi`           |
|                        | `B3` (deprecated)   |
| [None][5]              | `none`              |

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format

{{% /tab %}}

{{% tab "PHP" %}}

### Supported formats
The Datadog PHP SDK supports the following trace context formats:

| Format                 | Configuration Value |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [W3C Trace Context][2] | `tracecontext`      |
| [B3 Single][3]         | `B3 single header`  |
| [B3 Multi][4]          | `b3multi`           |
|                        | `B3` (deprecated)   |
| [None][5]              | `none`              |

### Additional use cases
For use cases specific to the Datadog PHP SDK, see the [PHP Trace Context Propagation][6] page.

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format
[6]: /tracing/trace_collection/trace_context_propagation/php

{{% /tab %}}

{{% tab "C++" %}}

### Supported formats
The Datadog C++ SDK supports the following trace context formats:

| Format                 | Configuration Value |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [W3C Trace Context][2] | `tracecontext`      |
| [B3 Multi][4]          | `b3`                |
|                        | `b3multi`           |
| [None][5]              | `none`              |

### Additional configuration
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

### Additional use cases
{{% collapse-content title="Manually extract propagated context" level="h4" %}}

Propagation context extraction can be accomplished by implementing a custom `DictReader` interface and calling `Tracer::extract_span` or `Tracer::extract_or_create_span`.

Here is an implementation to extract propagation context from HTTP Headers:

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

{{% collapse-content title="Manually inject context for distributed tracing" level="h4" %}}

Propagation context injection can be accomplished by implementing the `DictWriter` interface and calling `Span::inject` on a span instance.

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

{{% /tab %}}

{{% tab ".NET" %}}

### Supported formats
The Datadog .NET SDK supports the following trace context formats:

| Format                 | Configuration Value           |
|------------------------|-------------------------------|
| [Datadog][1]           | `datadog`           |
| [W3C Trace Context][2] | `tracecontext`                |
|                        | `W3C` (deprecated)            |
| [B3 Single][3]         | `B3 single header`            |
|                        | `B3SingleHeader` (deprecated) |
| [B3 Multi][4]          | `b3multi`                     |
|                        | `B3` (deprecated)             |
| [None][5]              | `none`                        |

### Additional use cases
For use cases specific to the Datadog .NET SDK, see the [.NET Trace Context Propagation][6] page.

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format
[6]: /tracing/trace_collection/trace_context_propagation/dotnet

{{% /tab %}}

{{< /tabs >}}

## Custom header formats

### Datadog format

When the Datadog SDK is configured with the Datadog format for extraction or injection (possibly both), the Datadog SDK will interact with the following request headers:

`x-datadog-trace-id`
: Specifies the lower 64-bits of the 128-bit trace-id, in decimal format.

`x-datadog-parent-id`
: Specifies the 64-bits span-id of the current span, in decimal format.

`x-datadog-origin`
: Specifies the Datadog product that initiated the trace, such as [Real User Monitoring][3] or [Synthetics][4]. If this headers is present, the value is expected to be one of: `rum`, `synthetics`, `synthetics-browser`.

`x-datadog-sampling-priority`
: Specifies the sampling decision made for the represented span as an integer, in decimal format.

`x-datadog-tags`
: Specifies supplemental Datadog trace state information, including but not limited to the higher 64-bits of the 128-bit trace-id (in hexadecimal format).

### None format

When the Datadog SDK is configured with the None format for extraction or injection (possibly both), the Datadog SDK will _not_ interact with request headers, meaning that the corresponding context propagation operation will do nothing.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/otel_tracing/
[2]: https://www.w3.org/TR/trace-context/
[3]: /real_user_monitoring/platform/connect_rum_and_traces
[4]: /synthetics/platform/apm