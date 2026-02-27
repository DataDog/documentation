### OpenTelemetry

`DD_METRICS_OTEL_ENABLED`
: **Since**: 2.5.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables OpenTelemetry metrics export. Metrics are disabled by default and are only enabled when this is set to a truthy value.

`OTEL_EXPORTER_OTLP_ENDPOINT`
: **Since**: 2.5.0 <br>
**Type**: `string`<br>
**Default**: `http://localhost:4318`<br>
Sets the OTLP exporter endpoint used by OpenTelemetry metrics export. When set, it overrides the default endpoint derived from agent configuration.

`OTEL_EXPORTER_OTLP_HEADERS`
: **Since**: 2.6.0 <br>
**Type**: `map`<br>
**Default**: `""`<br>
Configuration key to set custom headers for OTLP export (fallback for metrics-specific headers). Used when metrics-specific OTLP headers are not set. Format: api-key=key,other=value.

`OTEL_EXPORTER_OTLP_METRICS_ENDPOINT`
: **Since**: 2.5.0 <br>
**Type**: `string`<br>
**Default**: `http://localhost:4318`<br>
**Description**: Specifies the URL for sending OTLP metrics data. Takes precedence over the general OTEL_EXPORTER_OTLP_ENDPOINT. **Default (gRPC)**: http://localhost:4317. **Default (HTTP)**: http://localhost:4318/v1/metrics. **Notes**: For HTTP protocols, the SDK will automatically append /v1/metrics if the general OTEL_EXPORTER_OTLP_ENDPOINT is used as a fallback.

`OTEL_EXPORTER_OTLP_METRICS_HEADERS`
: **Since**: 2.5.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Sets additional headers to include in OTLP exporter requests for metrics. When set, it takes precedence over OTEL_EXPORTER_OTLP_HEADERS for metrics export.

`OTEL_EXPORTER_OTLP_METRICS_PROTOCOL`
: **Since**: 2.5.0 <br>
**Type**: `string`<br>
**Default**: `http/protobuf`<br>
Selects the protocol used for OpenTelemetry OTLP metrics export. Only http/protobuf is supported.

`OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE`
: **Since**: 2.5.0 <br>
**Type**: `string`<br>
**Default**: `delta`<br>
Controls metrics aggregation temporality. Accepted values: `delta` or `cumulative` (case-insensitive); empty/invalid values are treated as `delta`.

`OTEL_EXPORTER_OTLP_METRICS_TIMEOUT`
: **Since**: 2.5.0 <br>
**Type**: `int`<br>
**Default**: `10000`<br>
**Description**: Specifies the timeout (in milliseconds) for a single outgoing OTLP metrics request. Takes precedence over the general OTEL_EXPORTER_OTLP_TIMEOUT. **Default**: 10000 (10s).

`OTEL_EXPORTER_OTLP_PROTOCOL`
: **Since**: 2.5.0 <br>
**Type**: `string`<br>
**Default**: `http/protobuf`<br>
Specifies the transport protocol to use for all signals unless overridden. **Accepted values**: `grpc`, `http/protobuf`, `http/json`.

`OTEL_EXPORTER_OTLP_TIMEOUT`
: **Since**: 2.6.0 <br>
**Type**: `int`<br>
**Default**: `10000`<br>
Configuration key to set the request timeout for OTLP export (fallback for metrics-specific timeout). Used when the metrics-specific OTLP timeout is not set. Default value is 10000ms.

`OTEL_LOGS_EXPORTER`
: **Type**: `string`<br>
**Default**: N/A<br>
Controls the OpenTelemetry logs exporter selection. This setting is not supported and is ignored.

`OTEL_LOG_LEVEL`
: **Since**: 2.3.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
OTEL_LOG_LEVEL maps to DD_TRACE_DEBUG and enables the debug mode of the tracer. It only accepts "debug" as a valid value.

`OTEL_METRICS_EXPORTER`
: **Since**: 2.3.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
OTEL_METRICS_EXPORTER is not used to choose an exporter. It is effectively only honored for none, which forces metrics off. When unset it does not enable metrics on its own it needs DD_METRICS_OTEL_ENABLED set to true to effectively produce metrics

`OTEL_METRIC_EXPORT_INTERVAL`
: **Since**: 2.5.0 <br>
**Type**: `int`<br>
**Default**: `10000`<br>
**Description**: Specifies the time interval (in milliseconds) between metric export attempts. **Default**: 10000 (10s) **Notes**: This default value is Datadog's recommended configuration and differs from the OpenTelemetry specification's default of 60000ms.

`OTEL_METRIC_EXPORT_TIMEOUT`
: **Since**: 2.5.0 <br>
**Type**: `int`<br>
**Default**: `7500`<br>
**Description**: Specifies the maximum allowed time (in milliseconds) to collect and export metrics. **Default**: 7500 (7.5s) **Notes**: This default value is Datadog's recommended configuration and differs from the OpenTelemetry specification's default of 30000ms.

`OTEL_PROPAGATORS`
: **Since**: 2.3.0 <br>
**Type**: `string`<br>
**Default**: `""`<br>
Specifies trace context propagation formats for both extraction and injection (comma-separated list). Lowest precedence; ignored if any other Datadog trace context propagation environment variable is set.

`OTEL_RESOURCE_ATTRIBUTES`
: **Since**: 2.3.0 <br>
**Type**: `string`<br>
**Default**: `""`<br>
Sets OpenTelemetry resource attributes that are mapped to tracer tags when the corresponding tracer tag setting is not set. Reserved attributes for service, environment, and version are mapped to standard tags, and only the first 10 attributes are applied.

`OTEL_SERVICE_NAME`
: **Since**: 2.3.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Configuration key to set the application's default service name.

`OTEL_TRACES_EXPORTER`
: **Since**: 2.3.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
OTEL_TRACES_EXPORTER is not used to select an exporter. It's only recognized for none, which is treated as an instruction to disable tracing (it maps to DD_TRACE_ENABLED=false). Any other value is considered unsupported and effectively ignored. - If DD_TRACE_ENABLED is set, it takes precedence over OTEL_TRACES_EXPORTER. - To enable tracing, ensure DD_TRACE_ENABLED is not set to false and do not set OTEL_TRACES_EXPORTER=none (unset it if present, or explicitly set DD_TRACE_ENABLED=true).

`OTEL_TRACES_SAMPLER`
: **Since**: 2.3.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Sets the trace sampler via OpenTelemetry configuration and maps it to the tracer's sample rate when the corresponding setting is not set. Parent-based samplers are supported; unsupported values are ignored.

`OTEL_TRACES_SAMPLER_ARG`
: **Type**: `decimal`<br>
**Default**: `1.0`<br>
Sets the argument for OTEL_TRACES_SAMPLER when using the traceidratio sampler (for example, OTEL_TRACES_SAMPLER_ARG=0.25). This is used to derive the tracer sample rate when mapping OpenTelemetry configuration.
