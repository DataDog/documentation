### OpenTelemetry

`DD_METRICS_OTEL_ENABLED`
: **Since**: 2.5.0 <br>
**Default**: `false`<br>
Enables OpenTelemetry metrics export. Metrics are disabled by default and are only enabled when this is set to a truthy value.

`OTEL_EXPORTER_OTLP_ENDPOINT`
: **Since**: 2.5.0, 2.6.0 <br>
**Default**: `http://localhost:4318`<br>
Sets the OTLP exporter endpoint used by OpenTelemetry metrics export. When set, it overrides the default endpoint derived from agent configuration.

`OTEL_EXPORTER_OTLP_HEADERS`
: **Since**: 2.6.0 <br>
**Default**: ``<br>
Configuration key to set custom headers for OTLP export (fallback for metrics-specific headers). Used when metrics-specific OTLP headers are not set. Format: api-key=key,other=value.

`OTEL_EXPORTER_OTLP_METRICS_ENDPOINT`
: **Since**: 2.5.0, 2.6.0 <br>
**Default**: `http://localhost:4318`<br>
**Description**: Specifies the URL for sending OTLP metrics data. Takes precedence over the general OTEL_EXPORTER_OTLP_ENDPOINT. **Default (gRPC)**: http://localhost:4317. **Default (HTTP)**: http://localhost:4318/v1/metrics. **Notes**: For HTTP protocols, the SDK will automatically append /v1/metrics if the general OTEL_EXPORTER_OTLP_ENDPOINT is used as a fallback.

`OTEL_EXPORTER_OTLP_METRICS_HEADERS`
: **Since**: 2.5.0, 2.6.0 <br>
**Default**: N/A<br>
Sets additional headers to include in OTLP exporter requests for metrics. When set, it takes precedence over OTEL_EXPORTER_OTLP_HEADERS for metrics export.

`OTEL_EXPORTER_OTLP_METRICS_PROTOCOL`
: **Since**: 2.5.0, 2.6.0 <br>
**Default**: `http/protobuf`<br>
Selects the protocol used for OpenTelemetry OTLP metrics export. Only http/protobuf is supported.

`OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE`
: **Since**: 2.5.0 <br>
**Default**: `delta`<br>
Controls metrics aggregation temporality. Accepted values: `delta` or `cumulative` (case-insensitive); empty/invalid values are treated as `delta`.

`OTEL_EXPORTER_OTLP_METRICS_TIMEOUT`
: **Since**: 2.5.0, 2.6.0 <br>
**Default**: `10000`<br>
**Description**: Specifies the timeout (in milliseconds) for a single outgoing OTLP metrics request. Takes precedence over the general OTEL_EXPORTER_OTLP_TIMEOUT. **Default**: 10000 (10s).

`OTEL_EXPORTER_OTLP_PROTOCOL`
: **Since**: 2.5.0 <br>
**Default**: `http/protobuf`<br>
Specifies the transport protocol to use for all signals unless overridden. **Accepted values**: `grpc`, `http/protobuf`, `http/json`.

`OTEL_EXPORTER_OTLP_TIMEOUT`
: **Since**: 2.6.0 <br>
**Default**: `10000`<br>
Configuration key to set the request timeout for OTLP export (fallback for metrics-specific timeout). Used when the metrics-specific OTLP timeout is not set. Default value is 10000ms.
