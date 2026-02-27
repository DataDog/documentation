### OpenTelemetry

`DD_METRICS_OTEL_ENABLED`
: **Since**: 1.56.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables OpenTelemetry metrics export. Metrics are disabled by default and are only enabled when this is set to a truthy value.

`DD_METRICS_OTEL_INTERVAL`
: **Since**: 1.56.0 <br>
**Type**: `int`<br>
**Default**: `10000`<br>
Internal equivalent of OTEL_METRIC_EXPORT_INTERVAL

`DD_METRICS_OTEL_TIMEOUT`
: **Since**: 1.56.0 <br>
**Type**: `int`<br>
**Default**: `7500`<br>
Internal equivalent of OTEL_METRIC_EXPORT_TIMEOUT

`OTEL_EXPORTER_OTLP_ENDPOINT`
: **Since**: 1.56.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Specifies the base URL for sending OTLP data for all signals unless overridden. **Default (gRPC)**: `http://localhost:4317`. **Default (HTTP)**: `http://localhost:4318`.

`OTEL_EXPORTER_OTLP_HEADERS`
: **Since**: 1.56.0 <br>
**Type**: `map`<br>
**Default**: N/A<br>
**Description**: Specifies a comma-separated list of key-value pairs to be used as headers on all outgoing OTLP requests (for example, `api-key=key,other-config=value`).

`OTEL_EXPORTER_OTLP_METRICS_ENDPOINT`
: **Since**: 1.56.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
If non-empty, used as the OTLP metrics endpoint. Otherwise falls back to `OTEL_EXPORTER_OTLP_ENDPOINT`, then to `http://<DD_TRACE_AGENT_URL host>:4317/4318` based on protocol. For `http/protobuf`, `/v1/metrics` is appended if missing.

`OTEL_EXPORTER_OTLP_METRICS_HEADERS`
: **Since**: 1.56.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Sets additional headers to include in OTLP exporter requests for metrics. When set, it takes precedence over OTEL_EXPORTER_OTLP_HEADERS for metrics export.

`OTEL_EXPORTER_OTLP_METRICS_PROTOCOL`
: **Since**: 1.56.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Specifies the OTLP transport protocol to use for metrics data. Takes precedence over the general `OTEL_EXPORTER_OTLP_PROTOCOL`. **Accepted values**: `grpc`, `http/protobuf`, `http/json`.

`OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE`
: **Since**: 1.56.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
**Description**: Specifies the aggregation `temporality` to use for each instrument kind. **Notes**: This default value `delta` is Datadog's recommended configuration and differs from the OpenTelemetry specification's default.

`OTEL_EXPORTER_OTLP_METRICS_TIMEOUT`
: **Since**: 1.56.0 <br>
**Type**: `int`<br>
**Default**: `10000`<br>
**Description**: Specifies the timeout (in milliseconds) for a single outgoing OTLP metrics request. Takes precedence over the general OTEL_EXPORTER_OTLP_TIMEOUT. **Default**: 10000 (10s).

`OTEL_EXPORTER_OTLP_PROTOCOL`
: **Since**: 1.56.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
**Description**: Specifies the transport protocol to use for all signals unless overridden.

`OTEL_EXPORTER_OTLP_TIMEOUT`
: **Since**: 1.56.0 <br>
**Type**: `int`<br>
**Default**: `10000`<br>
Configuration key to set the request timeout for OTLP export (fallback for metrics-specific timeout). Used when the metrics-specific OTLP timeout is not set. Default value is 10000ms.

`OTEL_INSTRUMENTATION_HTTP_CLIENT_CAPTURE_REQUEST_HEADERS`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
A comma-separated list of HTTP header names. HTTP client instrumentations capture HTTP request header values for all configured header names **Notes**: Header tagging configured using OTel environment variables follows the OTel tag name convention of `http.request.header.<header-name>` rather than the Datadog convention of `http.request.headers.<header-name>`

`OTEL_INSTRUMENTATION_HTTP_CLIENT_CAPTURE_RESPONSE_HEADERS`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
A comma-separated list of HTTP header names. HTTP client instrumentations capture HTTP response header values for all configured header names **Notes**: Header tagging configured using OTel environment variables follows the OTel tag name convention of `http.response.header.<header-name>` rather than the Datadog convention of `http.response.headers.<header-name>`

`OTEL_INSTRUMENTATION_HTTP_SERVER_CAPTURE_REQUEST_HEADERS`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
A comma-separated list of HTTP header names. HTTP server instrumentations capture HTTP request header values for all configured header names **Notes**: Header tagging configured using OTel environment variables follows the OTel tag name convention of `http.request.header.<header-name>` rather than the Datadog convention of `http.request.headers.<header-name>`

`OTEL_INSTRUMENTATION_HTTP_SERVER_CAPTURE_RESPONSE_HEADERS`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
A comma-separated list of HTTP header names. HTTP server instrumentations capture HTTP response header values for all configured header names **Notes**: Header tagging configured using OTel environment variables follows the OTel tag name convention of `http.response.header.<header-name>` rather than the Datadog convention of `http.response.headers.<header-name>`

`OTEL_JAVAAGENT_CONFIGURATION_FILE`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Path to valid Java properties file which contains the agent configuration **Notes**: When OTEL_JAVAAGENT_CONFIGURATION_FILE and DD_TRACE_CONFIG are both set we apply the configuration from both files. This is an exception to the usual rule where the Datadog setting overrides the OTel one

`OTEL_JAVAAGENT_EXTENSIONS`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
A comma-separated list of paths to extension jar files, or folders containing jar files. If pointing to a folder, every jar file in that folder is treated as a separate, independent extension.

`OTEL_LOGS_EXPORTER`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Controls the OpenTelemetry logs exporter selection. This setting is not supported and is ignored.

`OTEL_LOG_LEVEL`
: **Since**: 1.57.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Configuration key to set the log level.

`OTEL_METRICS_EXPORTER`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
**Description**: Specifies the metrics exporter to be used. **Notes**: The only accepted values are `otlp` and `none`. A value of `none` disables the emission of OTel metrics, as well as APM runtime metrics (equivalent to `DD_RUNTIME_METRICS_ENABLED=false`)

`OTEL_METRIC_EXPORT_INTERVAL`
: **Since**: 1.56.0 <br>
**Type**: `int`<br>
**Default**: `10000`<br>
**Description**: Specifies the time interval (in milliseconds) between metric export attempts. **Default**: 10000 (10s) **Notes**: This default value is Datadog's recommended configuration and differs from the OpenTelemetry specification's default of 60000ms.

`OTEL_METRIC_EXPORT_TIMEOUT`
: **Since**: 1.56.0 <br>
**Type**: `int`<br>
**Default**: `7500`<br>
**Description**: Specifies the maximum allowed time (in milliseconds) to collect and export metrics. **Default**: 7500 (7.5s) **Notes**: This default value is Datadog's recommended configuration and differs from the OpenTelemetry specification's default of 30000ms.

`OTEL_PROPAGATORS`
: **Since**: 1.57.0 <br>
**Type**: `string`<br>
**Default**: `""`<br>
Specifies trace context propagation formats for both extraction and injection (comma-separated list). Lowest precedence; ignored if any other Datadog trace context propagation environment variable is set.

`OTEL_RESOURCE_ATTRIBUTES`
: **Since**: 1.57.0 <br>
**Type**: `string`<br>
**Default**: `""`<br>
Sets OpenTelemetry resource attributes that are mapped to tracer tags when the corresponding tracer tag setting is not set. Reserved attributes for service, environment, and version are mapped to standard tags, and only the first 10 attributes are applied.

`OTEL_SDK_DISABLED`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Disables the Datadog SDK's OpenTelemetry interoperability for all signals. **Notes**: When set to `true`, this effectively sets `DD_TRACE_OTEL_ENABLED=false`, `DD_LOGS_OTEL_ENABLED=false`, and `DD_METRICS_OTEL_ENABLED=false`. **Ruby & Go SDKs**: The OpenTelemetry SDK activates automatically upon import and configuration, so this setting is not applicable.

`OTEL_SERVICE_NAME`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Configuration key to set the application's default service name.

`OTEL_TRACES_EXPORTER`
: **Since**: 1.57.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Configuration key to set the exporter for traces. Only the value `none` is recognized, which is equivalent to setting trace export to disabled.

`OTEL_TRACES_SAMPLER`
: **Since**: 1.57.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Sets the trace sampler via OpenTelemetry configuration and maps it to the tracer's sample rate when the corresponding setting is not set. Parent-based samplers are supported; unsupported values are ignored.

`OTEL_TRACES_SAMPLER_ARG`
: **Since**: 1.57.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
OpenTelemetry traces sampler argument (`otel.traces.sampler.arg` / `OTEL_TRACES_SAMPLER_ARG`): used when `OTEL_TRACES_SAMPLER=parentbased_traceidratio`; the value is treated as the traceidratio sample rate and mapped to Datadog's trace sample rate. Default: unset.
