---
title: Datadog OTLP Trace Intake Endpoint
private: true
further_reading:
  - link: "https://opentelemetry.io/docs/concepts/sdk-configuration/general-sdk-configuration/"
    tag: "External Site"
    text: "General OpenTelemetry SDK Configuration"
  - link: "https://opentelemetry.io/docs/reference/specification/sdk-environment-variables/"
    tag: "External Site"
    text: "OpenTelemetry Environment Variable Spec"
  - link: "https://opentelemetry.io/docs/reference/specification/protocol/exporter/ "
    tag: "External Site"
    text: "OpenTelemetry Protocol Exporter"
---
{{< site-region region="ap1,gov" >}}
<div class="alert alert-warning">OTLP Trace Intake Endpoint is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Overview

Datadog's OpenTelemetry protocol (OTLP) intake API endpoint allows you to send traces directly to Datadog. With this feature, you don't need to run the [Datadog Agent][2] or [OpenTelemetry Collector + Datadog Exporter][1].

You might prefer this option if you don't want the overhead of using the Datadog Agent or OpenTelemetry Collector.

## Configuration

To export OTLP data to the Datadog OTLP intake endpoint:

1. [Configure the OTLP HTTP Protobuf exporter](#configure-the-exporter).
   - Set the Datadog OTLP intake endpoint.
   - Configure the required HTTP headers.
1. (Optional) [Set the `dd-otel-span-mapping` HTTP header](#optional-map-or-filter-span-names) to map or filter spans.

### Configure the exporter

To send OTLP data to the Datadog OTLP intake endpoint, you need to use the OTLP HTTP Protobuf exporter. The process differs depending on whether you are using automatic or manual instrumentation for OpenTelemetry.

#### Automatic instrumentation

If you are using [OpenTelemetry automatic instrumentation][3], set the following environment variables, replacing `{DD_API_KEY}` with your Datadog API Key and `{YOUR_ORG]` with your organization:

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="{{< region-param key="otlp_trace_endpoint" >}}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-protocol=otlp,dd-api-key=${DD_API_KEY},dd-otlp-source=${YOUR_ORG}"
```

#### Manual instrumentation

If you are using manual instrumentation with OpenTelemetry SDKs, configure the OTLP HTTP Protobuf exporter programmatically.

<div class="alert alert-info">Replace <code>${YOUR_ENDPOINT}</code> with {{< region-param key="otlp_trace_endpoint" code="true" >}}. This is based on your <a href="/getting_started/site/">Datadog site</a>, which is {{< region-param key=dd_datacenter code="true" >}}.</div>

{{< tabs >}}
{{% tab "JavaScript" %}}

The JavaScript exporter is [`exporter-trace-otlp-proto`][100]. To configure the exporter, use the following code snippet:

```javascript
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-proto');  // OTLP http/protobuf exporter

const exporter = new OTLPTraceExporter({
  url: '${YOUR_ENDPOINT}', // Replace this with the correct endpoint
  headers: {
    Cdd-protocol': 'otlp', 
    'dd-api-key': process.env.DD_API_KEY,
    'dd-otel-span-mapping': '{span_name_as_resource_name: false}',
    'dd-otlp-source': '${YOUR_ORG}',
  },
});
```
[100]: https://www.npmjs.com/package/@opentelemetry/exporter-trace-otlp-proto

{{% /tab %}}

{{% tab "Java" %}}

The Java exporter is [`OtlpHttpSpanExporter`][200]. To configure the exporter, use the following code snippet:

```java
import io.opentelemetry.exporter.otlp.http.trace.OtlpHttpSpanExporter;

OtlpHttpSpanExporter exporter = OtlpHttpSpanExporter.builder()
    .setEndpoint("${YOUR_ENDPOINT}") // Replace this with the correct endpoint
    .addHeader("dd-protocol", "otlp")
    .addHeader("dd-api-key", System.getenv("DD_API_KEY"))
    .addHeader("dd-otlp-source", "${YOUR_ORG}")
    .build();
```

[200]: https://javadoc.io/doc/io.opentelemetry/opentelemetry-exporter-otlp-http-trace/

{{% /tab %}}
{{% tab "Go" %}}

The Go exporter is [`otlptracehttp`][300]. To configure the exporter, use the following code snippet:

```go
import "go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracehttp"

traceExporter, err := otlptracehttp.New(
	ctx,
	otlptracehttp.WithEndpoint("${YOUR_ENDPOINT}"), // Replace this with the correct endpoint
	otlptracehttp.WithURLPath("/api/v0.2/traces"),
	otlptracehttp.WithHeaders(
		map[string]string{
			"dd-protocol": "otlp", 
			"dd-api-key": os.Getenv("DD_API_KEY"),
			"dd-otel-span-mapping": "{span_name_as_resource_name: false}",
                  "dd-otlp-source": "${YOUR_ORG}",
		}),
)
```

[300]: http://go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracehttp

{{% /tab %}}
{{% tab "Python" %}}

The Python exporter is [`OTLPSpanExporter`][400]. To configure the exporter, use the following code snippet:

```python
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter

exporter = OTLPSpanExporter(
    endpoint="${YOUR_ENDPOINT}", # Replace this with the correct endpoint
    headers={
        "dd-protocol": "otlp", 
        "dd-api-key": os.environ.get("DD_API_KEY"),
        "dd-otel-span-mapping": "{span_name_as_resource_name: false}",
        "dd-otlp-source": "${YOUR_ORG}"
    },
)
```

[400]: https://pypi.org/project/opentelemetry-exporter-otlp-proto-http/

{{% /tab %}}
{{< /tabs >}}

### (Optional) Map or filter span names

Use the `dd-otel-span-mapping` header to configure span mapping and filtering. The JSON header contains the following fields:

- `ignore_resources`: A list of regular expressions to disable traces based on their resource name.
- `span_name_remappings`: A map of Datadog span names to preferred names.
- `span_name_as_resource_name`: Specifies whether to use the OpenTelemetry span's name as the Datadog span's operation name (default: true). If false, the operation name is derived from a combination of the instrumentation scope name and span kind.

For example:

```json
{
  "span_name_as_resource_name":false,
  "span_name_remappings":{
    "io.opentelemetry.javaagent.spring.client":"spring.client"
  },
  "ignore_resources":[
    "io.opentelemetry.javaagent.spring.internal"
  ]
}
```
## OpenTelemetry Collector

If you are using the OpenTelemetry Collector and don't want to use the Datadog Exporter, you can configure [`otlphttpexporter`][4] to export traces to the Datadog endpoint.

For example, configure your `config.yaml` like this:

```yaml
...

exporters:
  otlphttp:
    endpoint: {{< region-param key="otlp_trace_endpoint" >}}
    headers:
      dd-protocol: "otlp"
      dd-api-key: ${env:DD_API_KEY}
      dd-otel-span-mapping: "{span_name_as_resource_name: false}"
      dd-otlp-source: "${YOUR_ORG}",
...

service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [otlphttp]
```

## Troubleshooting

### Error: 403 Forbidden

If you receive a `403 Forbidden` error when sending traces to the Datadog OTLP intake endpoint, it indicates one of the following issues:

- The API key belongs to an organization that is not allowed to access the Datadog OTLP intake endpoint.  
   **Solution**: Verify that you are using an API key from an organization that is allowed to access the Datadog OTLP intake endpoint.
- The `dd-otlp-source` header is missing or has an incorrect value.  
   **Solution**: Ensure that the `dd-otlp-source` header is set with the proper value for your organization. Your site should be {{< region-param key=dd_site code="true" >}}.
- The endpoint URL is incorrect for your organization.  
   **Solution**: Use the correct endpoint URL for your organization. Your site is {{< region-param key=dd_datacenter code="true" >}}, so you need to use the {{< region-param key="otlp_trace_endpoint" code="true" >}} endpoint.

### Error: 413 Request Entity Too Large

If you receive a `413 Request Entity Too Large` error when sending traces to the Datadog OTLP intake endpoint, it indicates that the payload size sent by the OTLP exporter exceeds the Datadog trace intake endpoint's limit of 3.2MB.

This error usually occurs when the OpenTelemetry SDK batches too much telemetry data in a single request payload.

**Solution**: Reduce the export batch size of the SDK's batch span processor. Here's an example of how to modify the `BatchSpanProcessorBuilder` in the OpenTelemetry Java SDK:

```java
javaCopyBatchSpanProcessor batchSpanProcessor = 
    BatchSpanProcessor
        .builder(exporter)
        .setMaxExportBatchSize(10)  // Default is 512
        .build();
```
Adjust the `setMaxExportBatchSize` value according to your needs. A smaller value results in more frequent exports with smaller payloads, reducing the likelihood of exceeding the 3.2MB limit.

### Warning: "traces export: failed … 202 Accepted" in Go


If you are using the OpenTelemetry Go SDK and see a warning message similar to `traces export: failed … 202 Accepted`, it is due to a known issue in the OpenTelemetry Go OTLP HTTP exporter.

The OpenTelemetry Go OTLP HTTP exporter treats any HTTP status code other than 200 as an error, even if the export succeeds ([Issue 3706][5]). In contrast, other OpenTelemetry SDKs consider any status code in the range [200, 300) as a success. The Datadog OTLP intake endpoint returns a `202 Accepted` status code for successful exports.

The OpenTelemetry community is still discussing whether other `2xx` status codes should be treated as successes ([Issue 3203][6]).

**Solution**: If you are using the Datadog OTLP intake endpoint with the OpenTelemetry Go SDK, you can safely ignore this warning message. Your traces are being successfully exported despite the warning.

### Issue: Unexpected span operation names

When using the Datadog OTLP trace intake endpoint, you may notice that the span operation names are different from those generated when using the Datadog Agent or OpenTelemetry Collector.

The Datadog OTLP trace intake endpoint has the `span_name_as_resource_name` option set to `true` by default. This means that Datadog uses the OpenTelemetry span's name as the operation name. In contrast, the Datadog Agent and OpenTelemetry Collector have this option set to `false` by default.

When `span_name_as_resource_name` is set to `false`, the operation name is derived from a combination of the instrumentation scope name and the span kind. For example, an operation name might appear as `opentelemetry.client`.

**Solution**: If you want to disable the `span_name_as_resource_name` option in the Datadog OTLP intake endpoint to match the behavior of the Datadog Agent or OpenTelemetry Collector, follow these steps:

1. Refer to [Map or filter span names](#map-or-filter-span-names) in this document.
1. Set the `span_name_as_resource_name` option to `false` in the `dd-otel-span-mapping` header.

For example:

```json
jsonCopy{
  "span_name_as_resource_name": false,
  ...
}
```

This ensures that the span operation names are consistent across the Datadog OTLP intake endpoint, Datadog Agent, and OpenTelemetry Collector.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/collector_exporter/
[2]: /opentelemetry/otlp_ingest_in_the_agent/
[3]: https://opentelemetry.io/docs/specs/otel/glossary/#automatic-instrumentation
[4]: https://github.com/open-telemetry/opentelemetry-collector/tree/main/exporter/otlphttpexporter
[5]: https://github.com/open-telemetry/opentelemetry-go/issues/3706
[6]: https://github.com/open-telemetry/opentelemetry-specification/issues/3203