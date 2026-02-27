### OpenTelemetry

`DD_METRICS_OTEL_ENABLED`
: **Since**: 0.3.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enable or disable OpenTelemetry metrics export.

`OTEL_EXPORTER_OTLP_LOGS_ENDPOINT`
: **Since**: 0.3.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Specifies the URL for sending OTLP logs. Takes precedence over `OTEL_EXPORTER_OTLP_ENDPOINT`. : **Default (gRPC)**: `http://localhost:4317` : **Default (HTTP)**: `http://localhost:4318/v1/logs`

`OTEL_EXPORTER_OTLP_LOGS_HEADERS`
: **Since**: 0.3.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Specifies a comma-separated list of key-value pairs to be used as headers on outgoing OTLP logs requests. Takes precedence over the general `OTEL_EXPORTER_OTLP_HEADERS`.

`OTEL_EXPORTER_OTLP_LOGS_PROTOCOL`
: **Since**: 0.3.0 <br>
**Type**: `string`<br>
**Default**: `SDK-dependent, but will typically be either http/protobuf or grpc.`<br>
Specifies the OTLP transport protocol for logs. Takes precedence over `OTEL_EXPORTER_OTLP_PROTOCOL`. : **Accepted values**: `grpc`, `http/protobuf`, `http/json`

`OTEL_EXPORTER_OTLP_LOGS_TIMEOUT`
: **Since**: 0.3.0 <br>
**Type**: `int`<br>
**Default**: `10000`<br>
Specifies the timeout (in milliseconds) for a single outgoing OTLP logs request. Takes precedence over the general `OTEL_EXPORTER_OTLP_TIMEOUT`.

`OTEL_LOGS_EXPORTER`
: **Since**: 0.3.0 <br>
**Type**: `string`<br>
**Default**: `otlp`<br>
Datadog SDKs that support OTLP log export should default to otlp; all others should default to None/null.
