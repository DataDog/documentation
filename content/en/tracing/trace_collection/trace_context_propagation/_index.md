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

By default, the Datadog tracing libraries read and write distributed tracing headers using both the **Datadog** format and the [**W3C Trace Context**][2] formats. When reading incoming headers, the language SDK's will giver higher precedence to the Datadog format, whereas Envoy and NGINX proxies will give higher precedence to the W3C Trace Context format.

## Configuration

If you need to customize the trace context propagation configuration, there are several environment variables you can use to configure the formats that are used for reading and writing distributed tracing headers. To enable a specific propagator, make sure to use the corresponding configuration value for the tracing library, as outlined in the **Supported Propagators** section.

<div class="alert alert-info">
If multiple propagators are enabled, the extraction attempt is done in the specified order, and the first valid trace context is used to continue the distributed trace. If additional valid trace contexts are found, the tracing information will be recorded as individual span links.</div>

### Recommended configuration

`OTEL_PROPAGATORS`
: Specifies propagators (in a comma-separated list) to be used for trace context propagation. This configuration takes the lowest precedence and will be ignored if any other Datadog propagation environment variable is set.

`DD_TRACE_PROPAGATION_STYLE`
: Specifies propagators (in a comma-separated list) to be used for trace context propagation. This may be overridden by the extract-specific or inject-specific configurations. <br>
**Default:** `datadog,tracecontext`

### Advanced configuration

In the majority of scenarios, you will want to both send and receive trace context headers using the same format. However, if your service needs to accept trace context headers in one format and send them in another format, you can customize them with the following configurations.

`DD_TRACE_PROPAGATION_STYLE_EXTRACT`
: Specifies propagators (in a comma-separated list) to be used only for trace context extraction. This configuration takes the highest precedence over all other configurations for configuring the extraction propagators.

`DD_TRACE_PROPAGATION_STYLE_INJECT`
: Specifies propagators (in a comma-separated list) to be used only for trace context injection. This configuration takes the highest precedence over all other configurations for configuring the injection propagators.

## Supported Propagators
Datadog maintains several propagators for passing trace context information in different formats:

{{< tabs >}}

{{% tab "Java" %}}

| Propagator             | Configuration Value |
|------------------------|---------------------|
| Datadog                | `datadog`           |
| [W3C Trace Context][2] | `tracecontext`      |
| [B3 Single][3]         | `b3 single header`  |
|                        | `b3single`          |
| [B3 Multi][4]          | `b3multi`           |
|                        | `b3` (deprecated)   |
| None                   | `none`              |

[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html#xray-concepts-tracingheader

{{% /tab %}}

{{% tab "Python" %}}

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

{{% tab "Go" %}}

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

{{% tab "C++" %}}

| Propagator             | Configuration Value |
|------------------------|---------------------|
| Datadog                | `datadog`           |
| [W3C Trace Context][2] | `tracecontext`      |
| [B3 Multi][4]          | `b3`                |
|                        | `b3multi`           |
| None                   | `none`              |

[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html#xray-concepts-tracingheader

{{% /tab %}}

{{% tab ".NET" %}}

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

[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html#xray-concepts-tracingheader

{{% /tab %}}

{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/otel_tracing/
[2]: https://www.w3.org/TR/trace-context/