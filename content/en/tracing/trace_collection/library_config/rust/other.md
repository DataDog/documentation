### Other

`DD_AGENT_HOST`
: **Aliases**: `DD_TRACE_AGENT_HOSTNAME`<br>
**Type**: `string`<br>
**Default**: `localhost`<br>
The host name to use to connect the Datadog agent for traces. The host name can be IPv4, IPv6, or a domain name. If DD_TRACE_AGENT_URL is specified, the value of DD_AGENT_HOST is ignored.

`DD_DOGSTATSD_HOST`
: **Aliases**: `DD_DOGSTATSD_HOSTNAME`<br>
**Type**: `string`<br>
**Default**: `localhost`<br>
Override the address of the trace Agent host that the default tracer attempts to submit DogStatsD metrics to. Use `DD_AGENT_HOST` to override `DD_DOGSTATSD_HOST`.

`DD_DOGSTATSD_PORT`
: **Type**: `int`<br>
**Default**: `8125`<br>
The port of the DogStatsD Agent that metrics are submitted to. If the Agent configuration sets `dogstatsd_port` or `DD_DOGSTATSD_PORT` to something other than the default `8125`, then this tracing library `DD_DOGSTATSD_PORT` must match it.

`DD_DOGSTATSD_URL`
: **Type**: `string`<br>
**Default**: `http://localhost:8125`<br>
The URL to use to connect the Datadog agent for Dogstatsd metrics.

`DD_ENV`
: **Type**: `string`<br>
**Default**: `""`<br>
Sets the global `env` for all data emitted by the Agent. If `env` is not present in your trace data, this variable is used.

`DD_INSTRUMENTATION_TELEMETRY_ENABLED`
: **Type**: `boolean`<br>
**Default**: `true`<br>
Datadog may collect environmental and diagnostic information about your system to improve the product. When false, this telemetry data will not be collected. **Default**: true

`DD_LOGS_OTEL_ENABLED`
: **Since**: 0.3.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables support for exporting logs via OTLP.

`DD_LOG_LEVEL`
: **Type**: `string`<br>
**Default**: `ERROR`<br>
Sets the internal log level for the tracer.

`DD_SERVICE`
: **Type**: `string`<br>
**Default**: `unnamed-rust-service`<br>
Sets the service name for your application.

`DD_TAGS`
: **Type**: `map`<br>
**Default**: `""`<br>
Custom tags applied to traces profiles and metrics, provided as comma-separated key:value pairs (e.g. `layer:api,team:intake`).

`DD_TELEMETRY_HEARTBEAT_INTERVAL`
: **Type**: `decimal`<br>
**Default**: `60.0`<br>
Sets the interval for the telemetry status heartbeat (in seconds)

`DD_TELEMETRY_LOG_COLLECTION_ENABLED`
: **Type**: `boolean`<br>
**Default**: `true`<br>
**Default**: true : Enable or disable log collection for telemetry.

`DD_VERSION`
: **Type**: `string`<br>
**Default**: `""`<br>
Set the application's version, for example: `1.2.3` or `6c44da20`.
