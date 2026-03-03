### OpenTelemetry

`DD_METRICS_OTEL_ENABLED`
: **Since**: 2.23.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables OpenTelemetry metrics export. Metrics are disabled by default and are only enabled when this is set to a truthy value.

`OTEL_EXPORTER_OTLP_ENDPOINT`
: **Since**: 2.23.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Specifies the base URL for sending OTLP data for all signals unless overridden. **Default (gRPC)**: `http://localhost:4317`. **Default (HTTP)**: `http://localhost:4318`.

`OTEL_EXPORTER_OTLP_HEADERS`
: **Since**: 2.23.0 <br>
**Type**: `map`<br>
**Default**: `""`<br>
Configuration key to set custom headers for OTLP export (fallback for metrics-specific headers). Used when metrics-specific OTLP headers are not set. Format: api-key=key,other=value.

`OTEL_EXPORTER_OTLP_METRICS_ENDPOINT`
: **Since**: 2.23.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
If non-empty, used as the OTLP metrics endpoint. Otherwise falls back to `OTEL_EXPORTER_OTLP_ENDPOINT`, then to `http://<DD_TRACE_AGENT_URL host>:4317/4318` based on protocol. For `http/protobuf`, `/v1/metrics` is appended if missing.

`OTEL_EXPORTER_OTLP_METRICS_HEADERS`
: **Since**: 2.23.0 <br>
**Type**: `map`<br>
**Default**: N/A<br>
Specifies a comma-separated list of key-value pairs to be used as headers on outgoing OTLP metrics requests (for example, `api-key=key,other-config=value`). Takes precedence over the general `OTEL_EXPORTER_OTLP_HEADERS`.

`OTEL_EXPORTER_OTLP_METRICS_PROTOCOL`
: **Since**: 2.23.0 <br>
**Type**: `string`<br>
**Default**: `http/protobuf`<br>
Selects the protocol used for OpenTelemetry OTLP metrics export. Only http/protobuf is supported.

`OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE`
: **Since**: 2.23.0 <br>
**Type**: `string`<br>
**Default**: `delta`<br>
Controls metrics aggregation temporality. Accepted values: `delta` or `cumulative` (case-insensitive); empty/invalid values are treated as `delta`.

`OTEL_EXPORTER_OTLP_METRICS_TIMEOUT`
: **Since**: 2.23.0 <br>
**Type**: `int`<br>
**Default**: `10000`<br>
**Description**: Specifies the timeout (in milliseconds) for a single outgoing OTLP metrics request. Takes precedence over the general OTEL_EXPORTER_OTLP_TIMEOUT. **Default**: 10000 (10s).

`OTEL_EXPORTER_OTLP_PROTOCOL`
: **Since**: 2.23.0 <br>
**Type**: `string`<br>
**Default**: `http/protobuf`<br>
Specifies the transport protocol to use for all signals unless overridden. **Accepted values**: `grpc`, `http/protobuf`, `http/json`.

`OTEL_EXPORTER_OTLP_TIMEOUT`
: **Since**: 2.23.0 <br>
**Type**: `int`<br>
**Default**: `10000`<br>
Configuration key to set the request timeout for OTLP export (fallback for metrics-specific timeout). Used when the metrics-specific OTLP timeout is not set. Default value is 10000ms.

`OTEL_LOG_LEVEL`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Enables debug mode, producing verbose tracer logs (not recommended for production or sensitive environments) when set to debug. Alias for DD_TRACE_DEBUG.

`OTEL_METRICS_EXPORTER`
: **Since**: 2.23.0 <br>
**Type**: `string`<br>
**Default**: `otlp`<br>
Specifies the metrics exporter to be used. **Notes**: The only accepted values are `otlp` and `none`. A value of `none` disables the emission of OTel metrics, as well as APM runtime metrics (equivalent to `DD_RUNTIME_METRICS_ENABLED=false`)

`OTEL_METRIC_EXPORT_INTERVAL`
: **Since**: 2.23.0 <br>
**Type**: `int`<br>
**Default**: `10000`<br>
**Description**: Specifies the time interval (in milliseconds) between metric export attempts. **Default**: 10000 (10s) **Notes**: This default value is Datadog's recommended configuration and differs from the OpenTelemetry specification's default of 60000ms.

`OTEL_METRIC_EXPORT_TIMEOUT`
: **Since**: 2.23.0 <br>
**Type**: `int`<br>
**Default**: `7500`<br>
**Description**: Specifies the maximum allowed time (in milliseconds) to collect and export metrics. **Default**: 7500 (7.5s) **Notes**: This default value is Datadog's recommended configuration and differs from the OpenTelemetry specification's default of 30000ms.

`OTEL_PROPAGATORS`
: **Type**: `array`<br>
**Default**: `""`<br>
Configures which propagators are used for extracting and injecting trace context.

`OTEL_RESOURCE_ATTRIBUTES`
: **Type**: `map`<br>
**Default**: `""`<br>
Set OpenTelemetry resource attributes as a list of `(key, value)` pairs.

`OTEL_SERVICE_NAME`
: **Type**: `string`<br>
**Default**: `ruby`<br>
Your application's default service name, set as the service tag on traces. Alias for DD_SERVICE.

`OTEL_TRACES_EXPORTER`
: **Type**: `boolean`<br>
**Default**: `true`<br>
Enables or disables tracing. When disabled, instrumentation still runs but no trace data is sent. Alias for DD_TRACE_ENABLED.

`OTEL_TRACES_SAMPLER`
: **Type**: `decimal`<br>
**Default**: N/A<br>
Sets the trace sampling rate, controlling the fraction of traces kept. Alias for DD_TRACE_SAMPLE_RATE.

`OTEL_TRACES_SAMPLER_ARG`
: **Type**: `decimal`<br>
**Default**: `1.0`<br>
Sets the argument for OTEL_TRACES_SAMPLER when using the traceidratio sampler (for example, OTEL_TRACES_SAMPLER_ARG=0.25). This is used to derive the tracer sample rate when mapping OpenTelemetry configuration.
