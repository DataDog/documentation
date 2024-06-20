---
title: Configuring the Go Tracing Library
code_lang: go
type: multi-code-lang
code_lang_weight: 20
further_reading:
- link: "https://github.com/DataDog/dd-trace-go/tree/v1"
  tag: "Source Code"
  text: "Source code"
- link: "https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace"
  tag: "External Site"
  text: "Package page"
- link: "/tracing/glossary/"
  tag: "Documentation"
  text: "Explore your services, resources and traces"
- link: "/tracing/trace_collection/trace_context_propagation/go/"
  tag: "Documentation"
  text: "Propagating trace context"
- link: "/opentelemetry/interoperability/environment_variable_support"
  tag: "Documentation"
  text: "OTEL Environment Variable Configurations"
---

After you [set up the tracing library with your code, configure the Agent to collect APM data, and activate the Go integration][1], optionally configure the tracing library as desired.

Datadog recommends using `DD_ENV`, `DD_SERVICE`, and `DD_VERSION` to set `env`, `service`, and `version` for your services.

Read the [Unified Service Tagging][2] documentation for recommendations on how to configure these environment variables. These variables are available for versions 1.24.0+ of the Go tracer.

You may also elect to provide `env`, `service`, and `version` through the tracer's API:

```go
package main

import (
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
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
}
```

The Go tracer supports additional environment variables and functions for configuration.
See all available options in the [configuration documentation][3].

`DD_VERSION`
: Set the application's version, for example: `1.2.3`, `6c44da20`, `2020.02.13`

`DD_SERVICE`
: The service name to be used for this application.

`DD_ENV`
: Set the application's environment, for example: prod, pre-prod, staging.

`DD_AGENT_HOST`
: **Default**: `localhost` <br>
Override the default trace Agent host address for trace submission.

`DD_TRACE_AGENT_PORT`
: **Default**: `8126` <br>
Overrides the default trace Agent port for Datadog trace submission. If the [Agent configuration][13] sets `receiver_port` or `DD_APM_RECEIVER_PORT` to something other than the default `8126`, then the library configuration `DD_DOGSTATSD_PORT` must match it.

`DD_DOGSTATSD_PORT`
: **Default**: `8125` <br>
Overrides the default trace Agent port for DogStatsD metric submission. If the [Agent configuration][13] sets `dogstatsd_port` or `DD_DOGSTATSD_PORT` to something other than the default `8125`, then the library configuration `DD_DOGSTATSD_PORT` must match it.

`DD_TRACE_SAMPLING_RULES`
: **Default**: `nil`<br>
A JSON array of objects. Each object must have a `"sample_rate"`. The `"name"`,`"service"`, `"resource"`, and `"tags"` fields are optional. The `"sample_rate"` value must be between `0.0` and `1.0` (inclusive). Rules are applied in configured order to determine the trace's sample rate.

  <div class="alert alert-info">Support for sampling by resource and tags is in beta.</div>

  For more information, see [Ingestion Mechanisms][4].<br>
  **Examples:**<br>
  - Set the sample rate to 20%: `'[{"sample_rate": 0.2}]'`
  - Set the sample rate to 10% for services starting with 'a' and span name 'b' and set the sample rate to 20% for all other services: `'[{"service": "a.*", "name": "b", "sample_rate": 0.1}, {"sample_rate": 0.2}]'`.
  - Set the sample rate to 40% for services that have `HTTP GET` resource name: `'[{"resource": "HTTP GET", "sample_rate": 0.4}]'`.
  - Set the sample rate to 100% for services that have a `tier` tag with the value `premium`: `'[{"tags": {"tier":"premium"}, "sample_rate": 1}]'`.

`DD_TRACE_SAMPLE_RATE`
: **Default**: `nil`<br>
Enable ingestion rate control.

`DD_SPAN_SAMPLING_RULES`
: **Default**: `nil`<br>
A JSON array of objects. Each object must have a `"sample_rate"`. The `"name"`,`"service"`, `"resource"`, and `"tags"` fields are optional. Rules are applied in configured order to determine the span's sample rate. The `sample_rate` value must be between 0.0 and 1.0 (inclusive).

  <div class="alert alert-info">Support for sampling by resource and tags is in beta.</div>

  For more information, see [Ingestion Mechanisms][5].<br>
  **Example:**<br>
  - Set the span sample rate to 50% for the service `my-service` and operation name `http.request`, up to 50 traces per second: `'[{"service": "my-service", "name": "http.request", "sample_rate":0.5, "max_per_second": 50}]'`
  - Set the sample rate to 100% for services that have a `priority` tag with the value `high`: `'[{"tags": {"priority":"high"}, "sample_rate": 1}]'`.

`DD_TRACE_RATE_LIMIT`
: Maximum number of spans to sample per-second, per-Go process. Defaults to 100 when DD_TRACE_SAMPLE_RATE is set. Otherwise, delegates rate limiting to the Datadog Agent.

`DD_TAGS`
: **Default**: [] <br>
A list of default tags to be added to every span and profile. Tags can be separated by commas or spaces, for example: `layer:api,team:intake,key:value` or `layer:api team:intake key:value`.

`DD_TRACE_STARTUP_LOGS`
: **Default**: `true` <br>
Enable startup configuration and the diagnostic log.

`DD_TRACE_DEBUG`
: **Default**: `false` <br>
Enable debug logging in the tracer.

`DD_TRACE_ENABLED`
: **Default**: `true` <br>
Enable web framework and library instrumentation. When false, the application code doesn't generate any traces.

`DD_SERVICE_MAPPING`
: **Default**: `null` <br>
Dynamically rename services through configuration. Services can be separated by commas or spaces, for example: `mysql:mysql-service-name,postgres:postgres-service-name`, `mysql:mysql-service-name postgres:postgres-service-name`.

`DD_INSTRUMENTATION_TELEMETRY_ENABLED`
: **Default**: `true` <br>
Datadog may collect [environmental and diagnostic information about your system][6] to improve the product. When false, this telemetry data will not be collected.

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

`DD_RUNTIME_METRICS_ENABLED`
: **Default**: `false` <br>
Enable [runtime metric][17] collection.
Added in version 1.26.0.

`DD_TRACE_PROPAGATION_STYLE`
: **Default**: `datadog,tracecontext` <br>
Configures trace header injection and extraction style. See [Propagating Go Trace Context][18] for more information.

## Configure APM environment name

The [APM environment name][7] may be configured [in the Agent][8] or using the [WithEnv][3] start option of the tracer.


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
[17]: https://docs.datadoghq.com/tracing/metrics/runtime_metrics/go
[18]: https://docs.datadoghq.com/tracing/trace_collection/trace_context_propagation/go/
[19]: /opentelemetry/interoperability/environment_variable_support
