---
title: Propagating Python Trace Context
code_lang: python
type: multi-code-lang
code_lang_weight: 10
further_reading:
    - link: 'https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/'
      tag: 'Blog'
      text: 'Monitor OpenTelemetry-instrumented apps with support for W3C Trace Context'
    - link: '/opentelemetry/guide/otel_api_tracing_interoperability'
      tag: 'Documentation'
      text: 'Interoperability of OpenTelemetry API and Datadog instrumented traces'
---

For a high-level overview of trace context propagation, see [Trace Context Propagation][1].

By default, the Python tracing library reads and writes distributed tracing headers using both the **Datadog** format and the **W3C Trace Context** formats. If an incoming request has valid Datadog headers, then the trace context from those headers will take precedence and be used to continue the distributed trace.

## Supported propagators

| Propagator        | Configuration Value |
|-------------------|---------------------|
| Datadog           | `datadog`           |
| W3C Trace Context | `tracecontext`      |
| B3 Single         | `b3`                |
| B3 Multi          | `b3multi`           |
| None              | `none`              |

## Configuration

If you need to customize the trace context propagation configuration, there are several environment variables you can use to configure the formats that are used for reading and writing distributed tracing headers. To disable trace context propagation, set the configuration to `none`.

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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/trace_context_propagation