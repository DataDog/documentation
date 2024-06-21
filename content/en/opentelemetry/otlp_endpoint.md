---
title: Datadog OTLP Trace Intake Endpoint
private: true
further_reading:
  - link: "https://opentelemetry.io/docs/concepts/sdk-configuration/general-sdk-configuration/"
    tag: "External"
    text: "OpenTelemetry | General SDK Configuration"
  - link: "https://opentelemetry.io/docs/reference/specification/sdk-environment-variables/"
    tag: "External"
    text: "OpenTelemetry | Environment Variable Spec"
  - link: "https://opentelemetry.io/docs/reference/specification/protocol/exporter/ "
    tag: "External"
    text: "OpenTelemetry | Protocol Exporter"
---





## Overview

Datadog's trace intake API endpoint allows you to send OpenTelemetry protocol (OTLP) traces directly to Datadog, without running the [Datadog Agent][2] or [OpenTelemetry Collector + Datadog Exporter][1].

You might prefer this direct option if you don't want the overhead of using the Datadog Agent or OpenTelemetry Collector.

## Configuration

To send OTLP data to the Datadog OTLP intake endpoint, you need to use the OTLP HTTP Protobuf exporter.

### Configure the exporter

#### Automatic instrumentation

If you are using [OpenTelemetry automatic instrumentation][3], set the following environment variables:

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="https://trace.agent.datadoghq.com/api/v0.2/traces"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-protocol=otlp,dd-api-key=${DD_API_KEY},dd-otlp-source=${YOUR_ORG}"
```

#### Manual instrumentation

If you are using manual instrumentation with the OpenTelemetry SDK, configure the OTLP HTTP Protobuf exporter programmatically.

{{< tabs >}}
{{% tab "Javascript" %}}

```javascript
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-proto');  // OTLP http/protobuf exporter

const exporter = new OTLPTraceExporter({
  url: 'https://trace.agent.datadoghq.com/api/v0.2/traces',
  headers: {
    'dd-protocol': 'otlp', 
    'dd-api-key': process.env.DD_API_KEY,
    'dd-otel-span-mapping': '{span_name_as_resource_name: false}',
    'dd-otlp-source': '${YOUR_ORG}',
  },
});
```

{{% /tab %}}

{{% tab "Java" %}}

```java
import io.opentelemetry.exporter.otlp.http.trace.OtlpHttpSpanExporter;

OtlpHttpSpanExporter exporter = OtlpHttpSpanExporter.builder()
    .setEndpoint("https://trace.agent.datadoghq.com/api/v0.2/traces")
    .addHeader("dd-protocol", "otlp")
    .addHeader("dd-api-key", System.getenv("DD_API_KEY"))
    .addHeader("dd-otlp-source", "${YOUR_ORG}")
    .build();
```

{{% /tab %}}
{{% tab "Go" %}}

```go
import "go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracehttp"

traceExporter, err := otlptracehttp.New(
	ctx,
	otlptracehttp.WithEndpoint("trace.agent.datadoghq.com"),
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

{{% /tab %}}
{{% tab "Python" %}}

```python
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter

exporter = OTLPSpanExporter(
    endpoint="https://trace.agent.datadoghq.com/api/v0.2/traces",
    headers={
        "dd-protocol": "otlp", 
        "dd-api-key": os.environ.get("DD_API_KEY"),
        "dd-otel-span-mapping": "{span_name_as_resource_name: false}",
        "dd-otlp-source": "${YOUR_ORG}"
    },
)
```

{{% /tab %}}
{{< /tabs >}}

### Map or filter span names

Use the `dd-otel-span-mapping header` to configure span mapping and filtering. The JSON header contains these fields:

- `ignore_resources`: A list of regular expressions to disable traces based on their resource name.
- `span_name_remappings`: A map of Datadog span names to preferred names.
- `span_name_as_resource_name`: Specifies whether to use the OpenTelemetry span's name as the Datadog span's operation name (default: true).

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
### OpenTelemetry Collector

If you are using the OpenTelemetry Collector and don't want to use the Datadog Exporter, you can configure the [otlphttpexporter][4] to export traces to the Datadog endpoint.

For example, configure your `config.yaml` like this:

```yaml
...

exporters:
  otlphttp:
    endpoint: https://trace.agent.datadoghq.com/api/v0.2/traces
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

### Error: 403 Forbidden - API Key or Endpoint Issues

### Warning: "traces export: failed … 202 Accepted" in Go

### Issue: Unexpected Span Operation Names

### Error: 413 Request Entity Too Large

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/collector_exporter/
[2]: /opentelemetry/otlp_ingest_in_the_agent/
[3]: https://opentelemetry.io/docs/specs/otel/glossary/#automatic-instrumentation
[4]: https://github.com/open-telemetry/opentelemetry-collector/tree/main/exporter/otlphttpexporter