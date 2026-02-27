### OpenTelemetry

`DD_METRICS_OTEL_ENABLED`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Enables OpenTelemetry metrics export. Metrics are disabled by default and are only enabled when this is set to a truthy value.

`DD_METRICS_OTEL_METER_NAMES`
: **Type**: `string`<br>
**Default**: N/A<br>
List of meters to add to the metrics exporter for the experimental OpenTelemetry Metrics API support.

`OTEL_EXPORTER_OTLP_ENDPOINT`
: **Type**: `string`<br>
**Default**: `http://localhost:4317/`<br>
Configuration key to set the OTLP endpoint URL (fallback for metrics-specific endpoint). Used when ExporterOtlpMetricsEndpoint is not set. Expects values like `unix:///path/to/socket.sock` for UDS, `\\.\pipename\` for Windows Named Pipes. Default values: gRPC: http://localhost:4317, HTTP: http://localhost:4318

`OTEL_EXPORTER_OTLP_HEADERS`
: **Type**: `map`<br>
**Default**: `""`<br>
Configuration key to set custom headers for OTLP export (fallback for metrics-specific headers). Used when metrics-specific OTLP headers are not set. Format: api-key=key,other=value.

`OTEL_EXPORTER_OTLP_LOGS_ENDPOINT`
: **Type**: `string`<br>
**Default**: `http://localhost:4317/`<br>
Endpoint URL for log data only, with an optionally-specified port number. Typically ends with v1/logs when using OTLP/HTTP.

`OTEL_EXPORTER_OTLP_LOGS_HEADERS`
: **Aliases**: `OTEL_EXPORTER_OTLP_HEADERS`<br>
**Type**: `map`<br>
**Default**: N/A<br>
A map of headers to apply to all outgoing otlp logs.

`OTEL_EXPORTER_OTLP_LOGS_PROTOCOL`
: **Aliases**: `OTEL_EXPORTER_OTLP_PROTOCOL`<br>
**Type**: `string`<br>
**Default**: `grpc`<br>
Specifies the OTLP transport protocol to be used for log data.

`OTEL_EXPORTER_OTLP_LOGS_TIMEOUT`
: **Aliases**: `OTEL_EXPORTER_OTLP_TIMEOUT`<br>
**Type**: `int`<br>
**Default**: `10000`<br>
The timeout value for all outgoing logs in milliseconds.

`OTEL_EXPORTER_OTLP_METRICS_ENDPOINT`
: **Type**: `string`<br>
**Default**: `http://localhost:4317/`<br>
Configuration key to set the OTLP endpoint URL for metrics. Takes precedence over ExporterOtlpEndpoint. This value typically ends with v1/metrics when using OTLP/HTTP. Expects values like `unix:///path/to/socket.sock` for UDS, `\\.\pipename\` for Windows Named Pipes. Default values: gRPC: http://localhost:4317, HTTP: http://localhost:4318/v1/metrics

`OTEL_EXPORTER_OTLP_METRICS_HEADERS`
: **Aliases**: `OTEL_EXPORTER_OTLP_HEADERS`<br>
**Type**: `map`<br>
**Default**: N/A<br>
Configuration key to set custom headers for OTLP metrics export. Takes precedence over general OTLP headers. Format: api-key=key,other=value.

`OTEL_EXPORTER_OTLP_METRICS_PROTOCOL`
: **Aliases**: `OTEL_EXPORTER_OTLP_PROTOCOL`<br>
**Type**: `string`<br>
**Default**: `grpc`<br>
Configuration key to set the OTLP protocol for metrics export. Takes precedence over the general OTLP protocol setting. Valid values: grpc, http/protobuf, http/json. Default: http/protobuf.

`OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE`
: **Type**: `string`<br>
**Default**: `delta`<br>
Controls metrics aggregation temporality. Accepted values: `delta` or `cumulative` (case-insensitive); empty/invalid values are treated as `delta`.

`OTEL_EXPORTER_OTLP_METRICS_TIMEOUT`
: **Aliases**: `OTEL_EXPORTER_OTLP_TIMEOUT`<br>
**Type**: `int`<br>
**Default**: `10000`<br>
Configuration key to set the request timeout for OTLP metrics export in milliseconds. Takes precedence over the general OTLP timeout setting. Default value is 10000ms.

`OTEL_EXPORTER_OTLP_PROTOCOL`
: **Type**: `string`<br>
**Default**: `grpc`<br>
Used as the fallback OTLP protocol for metrics when `OTEL_EXPORTER_OTLP_METRICS_PROTOCOL` is unset. Parsed values: `grpc`, `http/protobuf`, `http/json` (case-insensitive). Note: `http/json` is currently unsupported for metrics and disables metrics export; `grpc`/`http/protobuf` require the corresponding Cargo features (`metrics-grpc`/`metrics-http`).

`OTEL_EXPORTER_OTLP_TIMEOUT`
: **Type**: `int`<br>
**Default**: `10000`<br>
Configuration key to set the request timeout for OTLP export (fallback for metrics-specific timeout). Used when the metrics-specific OTLP timeout is not set. Default value is 10000ms.

`OTEL_LOGS_EXPORTER`
: **Type**: `string`<br>
**Default**: `otlp`<br>
Datadog SDKs that support OTLP log export should default to otlp; all others should default to None/null.

`OTEL_LOG_LEVEL`
: **Type**: `string`<br>
**Default**: N/A<br>
Configuration key to set the log level.

`OTEL_METRICS_EXPORTER`
: **Type**: `string`<br>
**Default**: `otlp`<br>
Specifies the metrics exporter to be used. **Notes**: The only accepted values are `otlp` and `none`. A value of `none` disables the emission of OTel metrics, as well as APM runtime metrics (equivalent to `DD_RUNTIME_METRICS_ENABLED=false`)

`OTEL_METRIC_EXPORT_INTERVAL`
: **Type**: `int`<br>
**Default**: `10000`<br>
**Description**: Specifies the time interval (in milliseconds) between metric export attempts. **Default**: 10000 (10s) **Notes**: This default value is Datadog's recommended configuration and differs from the OpenTelemetry specification's default of 60000ms.

`OTEL_METRIC_EXPORT_TIMEOUT`
: **Type**: `int`<br>
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

`OTEL_SDK_DISABLED`
: **Type**: `boolean`<br>
**Default**: N/A<br>
Disables the OpenTelemetry APIs.

`OTEL_SERVICE_NAME`
: **Type**: `string`<br>
**Default**: N/A<br>
Configuration key to set the application's default service name.

`OTEL_TRACES_EXPORTER`
: **Type**: `string`<br>
**Default**: N/A<br>
Configuration key to set the exporter for traces. Only the value `none` is recognized, which is equivalent to setting trace export to disabled.

`OTEL_TRACES_SAMPLER`
: **Type**: `string`<br>
**Default**: N/A<br>
Sets the trace sampler via OpenTelemetry configuration and maps it to the tracer's sample rate when the corresponding setting is not set. Parent-based samplers are supported; unsupported values are ignored.

`OTEL_TRACES_SAMPLER_ARG`
: **Type**: `decimal`<br>
**Default**: N/A<br>
Configuration key to set an additional argument for the traces sampler. to false.
