---
title: Trace Context Propagation
kind: documentation
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

## Configuration

If you need to customize the trace context propagation configuration, there are several environment variables you can use to configure the formats that are used for reading and writing distributed tracing headers. To enable a specific propagator, make sure to use the corresponding configuration value for the tracing library, as outlined in the **Language support** section.

<div class="alert alert-info">
If multiple propagators are enabled, the extraction attempt is done in the specified order, and the first valid trace context is used to continue the distributed trace. If additional valid trace contexts are found, the tracing information will be recorded as individual span links.</div>

### Recommended Datadog configuration

`DD_TRACE_PROPAGATION_STYLE`
: Specifies propagators (in a comma-separated list) to be used for trace context propagation. This may be overridden by the extract-specific or inject-specific configurations. <br>
**Default:** `datadog,tracecontext`

### Recommended OpenTelemetry configuration

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

### Supported propagators
The Datadog Java SDK maintains several propagators for passing trace context information in different formats:

| Propagator             | Configuration Value |
|------------------------|---------------------|
| Datadog                | `datadog`           |
| [W3C Trace Context][2] | `tracecontext`      |
| [B3 Single][3]         | `b3 single header`  |
|                        | `b3single`          |
| [B3 Multi][4]          | `b3multi`           |
|                        | `b3` (deprecated)   |
| None                   | `none`              |

### Additional configuration
In addition to the environment variable configuration, you can also update the propagators using System Property configuration:
- `-Ddd.trace.propagation.style=datadog,b3multi`
- `-Dotel.propagators=datadog,b3multi`
- `-Ddd.trace.propagation.style.inject=datadog,b3multi`
- `-Ddd.trace.propagation.style.extract=datadog,b3multi`

[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html#xray-concepts-tracingheader

{{% /tab %}}

{{% tab "Python" %}}

### Supported propagators
The Datadog Python SDK maintains several propagators for passing trace context information in different formats:

| Propagator             | Configuration Value |
|------------------------|---------------------|
| Datadog                | `datadog`           |
| [W3C Trace Context][2] | `tracecontext`      |
| [B3 Single][3]         | `b3`                |
| [B3 Multi][4]          | `b3multi`           |
| None                   | `none`              |

[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html#xray-concepts-tracingheader

{{% /tab %}}

{{% tab "Ruby" %}}

### Supported propagators
The Datadog Ruby SDK maintains several propagators for passing trace context information in different formats:

| Propagator             | Configuration Value |
|------------------------|---------------------|
| Datadog                | `datadog`           |
| [W3C Trace Context][2] | `tracecontext`      |
| [B3 Single][3]         | `b3`                |
| [B3 Multi][4]          | `b3multi`           |
| None                   | `none`              |

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

[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html#xray-concepts-tracingheader

{{% /tab %}}

{{% tab "Go" %}}

### Supported propagators
The Datadog Go SDK maintains several propagators for passing trace context information in different formats:

| Propagator             | Configuration Value |
|------------------------|---------------------|
| Datadog                | `datadog`           |
| [W3C Trace Context][2] | `tracecontext`      |
| [B3 Single][3]         | `B3 single header`  |
| [B3 Multi][4]          | `b3`           |
| None                   | `none`              |

[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html#xray-concepts-tracingheader

{{% /tab %}}

{{% tab "NodeJS" %}}

### Supported propagators
The Datadog NodeJS SDK maintains several propagators for passing trace context information in different formats:

| Propagator             | Configuration Value |
|------------------------|---------------------|
| Datadog                | `datadog`           |
| [W3C Trace Context][2] | `tracecontext`      |
| [B3 Single][3]         | `B3 single header`  |
| [B3 Multi][4]          | `b3multi`           |
|                        | `B3` (deprecated)   |
| None                   | `none`              |

[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html#xray-concepts-tracingheader

{{% /tab %}}

{{% tab "PHP" %}}

### Supported propagators
The Datadog PHP SDK maintains several propagators for passing trace context information in different formats:

| Propagator             | Configuration Value |
|------------------------|---------------------|
| Datadog                | `datadog`           |
| [W3C Trace Context][2] | `tracecontext`      |
| [B3 Single][3]         | `B3 single header`  |
| [B3 Multi][4]          | `b3multi`           |
|                        | `B3` (deprecated)   |
| None                   | `none`              |

### Additional use cases
For use cases specific to the Datadog PHP SDK, see the [PHP Trace Context Propagation][5] page.

[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: /tracing/trace_collection/trace_context_propagation/php

{{% /tab %}}

{{% tab "C++" %}}

### Supported propagators
The Datadog C++ SDK maintains several propagators for passing trace context information in different formats:

| Propagator             | Configuration Value |
|------------------------|---------------------|
| Datadog                | `datadog`           |
| [W3C Trace Context][2] | `tracecontext`      |
| [B3 Multi][4]          | `b3`                |
|                        | `b3multi`           |
| None                   | `none`              |

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
For use cases specific to the Datadog C++ SDK, see the [C++ Trace Context Propagation][5] page.

[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: /tracing/trace_collection/trace_context_propagation/cpp

{{% /tab %}}

{{% tab ".NET" %}}

### Supported propagators
The Datadog .NET SDK maintains several propagators for passing trace context information in different formats:

| Propagator             | Configuration Value           |
|------------------------|-------------------------------|
| Datadog                | `datadog`                     |
| [W3C Trace Context][2] | `tracecontext`                |
|                        | `W3C` (deprecated)            |
| [B3 Single][3]         | `B3 single header`            |
|                        | `B3SingleHeader` (deprecated) |
| [B3 Multi][4]          | `b3multi`                     |
|                        | `B3` (deprecated)             |
| None                   | `none`                        |

### Additional use cases
For use cases specific to the Datadog .NET SDK, see the [.NET Trace Context Propagation][5] page.

[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: /tracing/trace_collection/trace_context_propagation/dotnet

{{% /tab %}}

{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/otel_tracing/
[2]: https://www.w3.org/TR/trace-context/