---
title: Using Datadog SDKs with OpenTelemetry
description: Export telemetry in OTLP format from Datadog SDKs, or use the OpenTelemetry API with Datadog SDKs to keep vendor-neutral instrumentation.
aliases:
  - /opentelemetry/instrument/dd_sdks/otlp_trace_export/
further_reading:
    - link: '/opentelemetry/setup/ddot_collector/'
      text: 'Datadog Distribution of the OpenTelemetry Collector (DDOT)'
      tag: 'Documentation'
    - link: 'tracing/guide/instrument_custom_method'
      text: 'Instrument a custom method to get deep visibility into your business logic'
      tag: 'Documentation'
    - link: 'tracing/connect_logs_and_traces'
      text: 'Connect your Logs and Traces together'
      tag: 'Documentation'
    - link: 'tracing/visualization/'
      text: 'Explore your services, resources, and traces'
      tag: 'Documentation'
    - link: 'https://www.datadoghq.com/blog/opentelemetry-instrumentation/'
      text: 'Learn More about Datadog and the OpenTelemetry initiative'
      tag: 'Blog'
algolia:
  tags: ['otel custom instrumentation']
---

Datadog SDKs work with OpenTelemetry in two ways:

- They can export telemetry in [OpenTelemetry Protocol (OTLP)][8] format to any OTLP-compatible receiver or backend.
- They provide an implementation of the [OpenTelemetry API][1], so you can instrument your services with vendor-neutral APIs while still taking advantage of Datadog's native implementation, features, and products.

## Export data in OTLP format

{{< callout url="#" btn_hidden="true" header="Preview">}}
OTLP export from Datadog SDKs is in Preview. To provide feedback or request support, contact your Datadog account team.
{{< /callout >}}

Datadog SDKs can export telemetry in [OTLP][8] format to any OTLP-compatible receiver or backend, including [DDOT][9] or any OpenTelemetry Collector. During Preview, OTLP export supports traces only.

### Prerequisites

OTLP export sends data to a receiver rather than directly to Datadog. Before you enable it, you need an OTLP-compatible receiver that is configured to forward data to Datadog, such as the [DDOT Collector][9] or an [OpenTelemetry Collector][7].

For production workloads, Datadog recommends DDOT for batching, performance, and processing benefits. You aren't required to use DDOT, but the receiver must be reachable from your instrumented service.

### Language support

Select your language to see the minimum SDK version and supported OTLP protocols.

{{< programming-lang-wrapper langs="java,python,nodejs,go,.net" >}}

{{< programming-lang lang="java" >}}
- **Minimum version**: v1.62.0
- **Supported protocols**: `http/protobuf` (default), `grpc`
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}
- **Minimum version**: v4.8.0
- **Supported protocols**: `http/json`
{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}
- **Minimum version**: v5.98.0
- **Supported protocols**: `http/json`
{{< /programming-lang >}}

{{< programming-lang lang="go" >}}
- **Minimum version**: v2.8.0
- **Supported protocols**: `http/protobuf`
{{< /programming-lang >}}

{{< programming-lang lang=".net" >}}
- **Minimum version**: v3.41.0
- **Supported protocols**: `http/json` (default), `http/protobuf` (v3.45.0+)
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

### Enable OTLP trace export

To export traces in OTLP format, set the following environment variables on the instrumented service:

```shell
OTEL_TRACES_EXPORTER=otlp
DD_TRACE_OTEL_ENABLED=true
```

By default, traces are sent to `http://localhost:4318/v1/traces`.

To send traces to a different endpoint, set `OTEL_EXPORTER_OTLP_ENDPOINT` or the trace-specific `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT`. See the [OTLP Exporter Configuration][12] documentation for details.

### Verify

After you enable OTLP export and your service receives traffic, confirm that traces appear in the [Trace Explorer][10]. If traces don't arrive, verify that your [receiver][11] is running, reachable at the configured endpoint, and forwarding data to Datadog.

### Current limitations

- OTLP trace export is in Preview and supports core APM functionality for automatic and manually created traces. Other Datadog features and capabilities may not be supported, or may require the Datadog Agent even if traces are not sent through it.
- Traces are exported with Datadog semantics. For example, an HTTP status code is represented as `http.status_code` in Datadog semantics and `http.response.status_code` in OTel semantics.

For details on which Datadog features each setup supports, see the [feature compatibility table][13].

## OpenTelemetry API support

Datadog SDKs provide an implementation of the [OpenTelemetry API][1] for traces, metrics, and logs. You can maintain vendor-neutral instrumentation of your services while still taking advantage of Datadog's native platform and products like [Continuous Profiler][3], [Data Streams Monitoring][4], [App and API Protection][5], and [Live Processes][6].

By [instrumenting your code with OpenTelemetry APIs][2], your code:

- Remains free of vendor-specific API calls.
- Does not depend on Datadog SDKs at compile time (only runtime).

To learn more, follow the link for your language:

{{< card-grid card_width="170px">}}
  {{< image-card href="/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=java" src="integrations_logos/java.png" alt="Java" >}}
  {{< image-card href="/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=python" src="integrations_logos/python.png" alt="Python" >}}
  {{< image-card href="/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=ruby" src="integrations_logos/ruby.png" alt="Ruby" >}}
  {{< image-card href="/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=go" src="integrations_logos/go-metro.png" alt="go" >}}
  {{< image-card href="/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=node_js" src="integrations_logos/nodejs.png" alt="Node.js" >}}
  {{< image-card href="/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=php" src="integrations_logos/php.png" alt="PHP" >}}
  {{< image-card href="/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=dot_net" src="integrations_logos/dotnet_text.png" alt=".Net" >}}
  {{< image-card href="/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=rust" src="integrations_logos/rust.png" alt="Rust" >}}
{{< /card-grid >}}

<br>

<div class="alert alert-info">To see which Datadog features are supported with this setup, see the <a href="/opentelemetry/compatibility/#feature-compatibility">feature compatibility table.</a></div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/specs/otel/trace/api/
[2]: /tracing/trace_collection/otel_instrumentation/
[3]: /profiler/
[4]: /data_streams/
[5]: /security/application_security/
[6]: /infrastructure/process
[7]: /opentelemetry/setup/collector_exporter/
[8]: https://opentelemetry.io/docs/specs/otlp/
[9]: /opentelemetry/setup/ddot_collector/
[10]: /tracing/trace_explorer/
[11]: /opentelemetry/setup/
[12]: https://opentelemetry.io/docs/specs/otel/protocol/exporter/
[13]: /opentelemetry/compatibility/#feature-compatibility
