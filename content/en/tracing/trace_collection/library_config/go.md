---
title: Configuring the Go Tracing Library
code_lang: go
type: multi-code-lang
code_lang_weight: 20
further_reading:
- link: "https://github.com/DataDog/dd-trace-go/tree/v1"
  tag: "Source Code"
  text: "Source code"
- link: "https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace"
  tag: "External Site"
  text: "Package page"
- link: "https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace"
  tag: "External Site"
  text: "v2 Package page"
- link: "/tracing/glossary/"
  tag: "Documentation"
  text: "Explore your services, resources and traces"
- link: "/tracing/trace_collection/trace_context_propagation/"
  tag: "Documentation"
  text: "Propagating trace context"
- link: "/opentelemetry/interoperability/environment_variable_support"
  tag: "Documentation"
  text: "OpenTelemetry Environment Variable Configurations"
---

After you [set up the tracing library with your code, configure the Agent to collect APM data, and activate the Go integration][1], start the tracer and configure the library as desired. {{% tracing-go-v2 %}}

Datadog recommends using `DD_ENV`, `DD_SERVICE`, and `DD_VERSION` to set `env`, `service`, and `version` for your services.

Read the [Unified Service Tagging][2] documentation for recommendations on how to configure these environment variables. These variables are available for versions 1.24.0+ of the Go tracer.

You may also elect to provide `env`, `service`, and `version` through the tracer's API:

```go
package main

import (
    "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
)

func main() {
    tracer.Start(
        tracer.WithEnv("prod"),
        tracer.WithService("test-go"),
        tracer.WithServiceVersion("abc123"),
    )

    // When the tracer is stopped, it will flush everything it has to the Datadog Agent before quitting.
    // Make sure this line stays in your main function.
    defer tracer.Stop()

    // If you expect your application to be shut down by SIGTERM (for example, a container in Kubernetes),
    // you might want to listen for that signal and explicitly stop the tracer to ensure no data is lost
    sigChan := make(chan os.Signal, 1)
    signal.Notify(sigChan, syscall.SIGTERM)
    go func() {
        <-sigChan
        tracer.Stop()
    }()
}
```

The Go tracer supports additional environment variables and functions for configuration.
See all available options in the [configuration documentation][20] (or [configuration documentation v1][3]).

### Unified service tagging

`DD_VERSION`
: Set the application's version, for example: `1.2.3`, `6c44da20`, `2020.02.13`

`DD_SERVICE`
: The service name to be used for this application.

`DD_ENV`
: Set the application's environment, for example: prod, pre-prod, staging.

### Traces

`DD_TRACE_ENABLED`
: **Default**: `true` <br>
Enable web framework and library instrumentation. When false, the application code doesn't generate any traces.<br/>
See also [DD_APM_TRACING_ENABLED][21].

`DD_TRACE_AGENT_PORT`
: **Default**: `8126` <br>
Overrides the default trace Agent port for Datadog trace submission. Ignored if `DD_TRACE_AGENT_URL` is set. If the [Agent configuration][13] sets `receiver_port` or `DD_APM_RECEIVER_PORT` to something other than the default `8126`, then the library configuration `DD_DOGSTATSD_PORT` must match it.

`DD_TRACE_AGENT_URL`
: **Default**: `null` <br>
Override the Agent URL used for trace submission. Supports `http://`, `https://`, and `unix://` protocols. Takes precedence over `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT` if set.

`DD_TRACE_RATE_LIMIT`
: Maximum number of spans to sample per-second, per-Go process. Defaults to 100 when DD_TRACE_SAMPLE_RATE is set. Otherwise, delegates rate limiting to the Datadog Agent.

`DD_TRACE_STARTUP_LOGS`
: **Default**: `true` <br>
Enable startup configuration and the diagnostic log.

`DD_TRACE_DEBUG`
: **Default**: `false` <br>
Enable debug logging in the tracer.

`DD_SERVICE_MAPPING`
: **Default**: `null` <br>
Dynamically rename services through configuration. Services can be separated by commas or spaces, for example: `mysql:mysql-service-name,postgres:postgres-service-name`, `mysql:mysql-service-name postgres:postgres-service-name`.

`DD_TRACE_PARTIAL_FLUSH_ENABLED`
: **Default**: `false` <br>
Enables incrementally flushing large traces to the Datadog Agent, reducing the chance of rejection by the Agent. Use only when you have long-lived traces or traces with many spans. Valid values are `true` or `false`.
Added in version 1.54.0. Only compatible with the Datadog Agent 7.26.0+.

`DD_TRACE_PARTIAL_FLUSH_MIN_SPANS`
: **Default**: `1000`<br>
Number of spans within a trace that can be partially flushed to the Datadog Agent. `DD_TRACE_PARTIAL_FLUSH_ENABLED` must be `true` for partial flushing to occur.
Added in version 1.54.0. Only compatible with the Datadog Agent 7.26.0+.

`DD_TRACE_CLIENT_IP_ENABLED`
: **Default**: `false` <br>
Enable client IP collection from relevant IP headers in HTTP request spans.
Added in version 1.47.0

`DD_TRACE_HEADER_TAGS`
: **Default**: `null` <br>
List of comma-separated HTTP headers to be used as span tags. Optionally specify a "mapped" field to rename the request header as a tag. Configuration can be set globally with this environment variable, or at the integration level using the options specified in the [Go documentation][15]. This feature is compatible with [HTTP1][16] headers.<br>
**Examples:**<br>
  - Capture request header `my-header`: `"DD_TRACE_HEADER_TAGS=my-header"`
  - Capture request headers `my-header-1` and `my-header-2`: `"DD_TRACE_HEADER_TAGS=my-header1,my-header-2"`
  - Capture request header `my-header` and rename it to `my-tag`: `"DD_TRACE_HEADER_TAGS=my-header:my-tag"`

`DD_TAGS`
: **Default**: none <br>
A list of default tags to be added to every span, metric, and profile. Tags can be separated by commas or spaces, for example: `layer:api,team:intake,key:value` or `layer:api team:intake key:value`. Key-value pairs must be of string-convertible types.

### Agent  

`DD_AGENT_HOST`
: **Default**: `localhost` <br>
Override the default trace Agent host address for trace submission. Ignored if `DD_TRACE_AGENT_URL` is set.

`DD_DOGSTATSD_PORT`
: **Default**: `8125` <br>
Overrides the default trace Agent port for DogStatsD metric submission. If the [Agent configuration][13] sets `dogstatsd_port` or `DD_DOGSTATSD_PORT` to something other than the default `8125`, then the library configuration `DD_DOGSTATSD_PORT` must match it.

`DD_INSTRUMENTATION_TELEMETRY_ENABLED`
: **Default**: `true` <br>
Datadog may collect [environmental and diagnostic information about your system][6] to improve the product. When false, this telemetry data will not be collected.

### Runtime metrics

`DD_RUNTIME_METRICS_ENABLED`
: **Default**: `false` <br>
Enable [runtime metric][17] collection.
Added in version 1.26.0.

### Trace context propagation

`DD_TRACE_PROPAGATION_STYLE`
: **Default**: `datadog,tracecontext,baggage` <br>
Configures trace header injection and extraction style. See [Propagating Go Trace Context][18] for more information.

## Configure APM environment name

The [APM environment name][7] may be configured [in the Agent][8] or using the [WithEnv][20] start option of the tracer.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/dd_libraries/go
[2]: /getting_started/tagging/unified_service_tagging
[3]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#StartOption
[4]: /tracing/trace_pipeline/ingestion_mechanisms/
[5]: /tracing/trace_pipeline/ingestion_mechanisms/?tab=go#pagetitle
[6]: /tracing/configure_data_security#telemetry-collection
[7]: /tracing/advanced/setting_primary_tags_to_scope/#environment
[8]: /getting_started/tracing/#environment-name
[9]: https://github.com/openzipkin/b3-propagation
[13]: /agent/configuration/network/#configure-ports
[14]: https://github.com/w3c/trace-context
[15]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib
[16]: https://www.rfc-editor.org/rfc/rfc7230#section-3.2
[17]: /tracing/metrics/runtime_metrics/?tab=go
[18]: /tracing/trace_collection/trace_context_propagation/
[19]: /opentelemetry/interoperability/environment_variable_support
[20]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace/tracer#StartOption
[21]: /tracing/trace_collection/library_config/#traces
[22]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/contrib
