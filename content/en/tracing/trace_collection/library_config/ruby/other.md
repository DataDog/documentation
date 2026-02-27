### Other

`DD_AGENT_HOST`
: **Type**: `string`<br>
**Default**: `127.0.0.1`<br>
Hostname or IP address of the Datadog Agent that this library sends trace data to.

`DD_API_KEY`
: **Aliases**: `DATADOG_API_KEY`<br>
**Type**: `string`<br>
**Default**: N/A<br>
To use the Datadog CLI in Azure Cloud Shell, open a cloud shell, set your API key and site in the `DD_API_KEY` and `DD_SITE` environment variables, and use `npx` to run the CLI directly:

`DD_APM_TRACING_ENABLED`
: **Type**: `boolean`<br>
**Default**: `true`<br>
Enables or disables sending APM trace data. When disabled, tracing still runs to support other products, but only periodic heartbeat traces and manually kept traces are sent.

`DD_APP_KEY`
: **Since**: 2.25.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Sets the application key used to authenticate LLM Observability dataset and experiment requests in agentless mode. If agentless mode is enabled and this is not set, dataset/experiment operations that require an application key will fail.

`DD_CRASHTRACKING_ENABLED`
: **Type**: `boolean`<br>
**Default**: `true`<br>
Enables Crash Tracking. When enabled, the tracer initializes crash tracking and configures JVM crash/OOM hooks (for example, `-XX:OnError` and `-XX:OnOutOfMemoryError`) to run Datadog-provided scripts that upload `hs_err_pid*.log` crash logs and OOME notifications. Default: true.

`DD_DBM_INJECT_SQL_BASEHASH`
: **Since**: 2.29.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables the injection of a "base hash" in SQL queries when DBM propagation is also enabled. This base hash is used to find matching spans, and enrich the queries with related values.

`DD_DBM_PROPAGATION_MODE`
: **Type**: `string`<br>
**Default**: `disabled`<br>
Enables linking between data sent from APM and the Database Monitoring product when set to `service` or `full`. The `service` option enables the connection between DBM and APM services. The `full` option enables connection between database spans with database query events. Available for Postgres and MySQL.

`DD_DISABLE_DATADOG_RAILS`
: **Aliases**: `DISABLE_DATADOG_RAILS`<br>
**Type**: `string`<br>
**Default**: N/A<br>
Disables the Datadog Rails integration auto-instrumentation.

`DD_ENV`
: **Type**: `string`<br>
**Default**: N/A<br>
The application's environment. Sets the "env" tag on every span.

`DD_ERROR_TRACKING_HANDLED_ERRORS`
: **Type**: `string`<br>
**Default**: N/A<br>
Controls whether Error Tracking reports handled errors from user code, third-party gems, or both.

`DD_ERROR_TRACKING_HANDLED_ERRORS_INCLUDE`
: **Type**: `array`<br>
**Default**: `""`<br>
Comma-separated list of paths, file names, or gem names whose handled errors should be reported by Error Tracking.

`DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED`
: **Since**: 2.23.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables the experimental feature-flag provider that evaluates flags from remote configuration. If not enabled, the provider is a no-op and returns default values.

`DD_EXPERIMENTAL_PROPAGATE_PROCESS_TAGS_ENABLED`
: **Since**: 2.23.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables experimental propagation of process tags in payloads such as spans and telemetry.

`DD_EXTERNAL_ENV`
: **Since**: 2.24.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Sets an external environment identifier attached to emitted telemetry for origin and environment attribution.

`DD_GIT_REPOSITORY_URL`
: **Type**: `string`<br>
**Default**: N/A<br>
Overrides the git repository URL reported as CI metadata and used for git metadata tagging when enabled. Any embedded credentials in the URL are stripped before use.

`DD_HEALTH_METRICS_ENABLED`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Enables health metrics collection.

`DD_INJECTION_ENABLED`
: **Type**: `string`<br>
**Default**: `tracer`<br>
Indicates whether the library was loaded via Datadog single-step instrumentation (SSI) injection.

`DD_INJECT_FORCE`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Single Step Instrumentation (SSI): forces the tracer javaagent to load even when multiple JVM agents are detected. This bypasses SSI guardrails that would otherwise abort startup to avoid running multiple agents. Can be set via `DD_INJECT_FORCE` or system property `dd.inject.force`. Default: false.

`DD_INSTRUMENTATION_INSTALL_ID`
: **Type**: `string`<br>
**Default**: N/A<br>
Sets the install ID included in instrumentation telemetry payloads and headers. This can be used to correlate telemetry to a specific installation.

`DD_INSTRUMENTATION_INSTALL_TIME`
: **Type**: `string`<br>
**Default**: N/A<br>
Sets the install time included in instrumentation telemetry payloads and headers.

`DD_INSTRUMENTATION_INSTALL_TYPE`
: **Type**: `string`<br>
**Default**: N/A<br>
Sets the install type included in instrumentation telemetry payloads and headers.

`DD_INSTRUMENTATION_TELEMETRY_ENABLED`
: **Type**: `boolean`<br>
**Default**: `true`<br>
Datadog may collect environmental and diagnostic information about your system to improve the product. When false, this telemetry data will not be collected. **Default**: true

`DD_LOGS_INJECTION`
: **Type**: `boolean`<br>
**Default**: `true`<br>
**Supported Input**: Boolean (`true`/`false`) **Caveats**: Not supported in C++ or Go. **Description**: Enables or disables the automatic injection of trace context (trace ID, span ID) into JSON/structured application logs. This allows for correlation between traces and logs.

`DD_METRIC_AGENT_PORT`
: **Type**: `int`<br>
**Default**: `8125`<br>
Port of the Datadog Agent StatsD endpoint that this library sends metrics to.

`DD_REDIS_COMMAND_ARGS`
: **Type**: `boolean`<br>
**Default**: `false`<br>
When enabled, includes Redis command arguments in span resource names and tags; otherwise only the command name is shown.

`DD_RODA_ANALYTICS_ENABLED`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Enables analytics for the Roda integration.

`DD_RODA_ANALYTICS_SAMPLE_RATE`
: **Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the Roda integration.

`DD_SERVICE`
: **Aliases**: `OTEL_SERVICE_NAME`<br>
**Type**: `string`<br>
**Default**: `ruby`<br>
Your application's default service name, set as the service tag on traces.

`DD_SITE`
: **Type**: `string`<br>
**Default**: N/A<br>
Datadog site used to select the Datadog intake domain for agentless requests, such as telemetry and AI Guard API calls.

`DD_SPAN_SAMPLING_RULES`
: **Type**: `string`<br>
**Default**: N/A<br>
Span sampling: JSON rules used to decide per-span sampling priority (single-span sampling). If both `DD_SPAN_SAMPLING_RULES` and `DD_SPAN_SAMPLING_RULES_FILE` are set, the file setting is ignored. Rules can match spans by service/name and apply a sample rate and optional max-per-second limit.

`DD_SPAN_SAMPLING_RULES_FILE`
: **Type**: `string`<br>
**Default**: N/A<br>
Points to a JSON file that contains the span sampling rules. DD_SPAN_SAMPLING_RULES takes precedence over this variable. See DD_SPAN_SAMPLING_RULES for the rule format.

`DD_TAGS`
: **Aliases**: `OTEL_RESOURCE_ATTRIBUTES`<br>
**Type**: `map`<br>
**Default**: `""`<br>
Custom tags applied to traces, provided as comma-separated key:value pairs (e.g. `layer:api,team:intake`).

`DD_TELEMETRY_AGENTLESS_URL`
: **Type**: `string`<br>
**Default**: N/A<br>
Overrides the agentless telemetry intake URL.

`DD_TELEMETRY_DEPENDENCY_COLLECTION_ENABLED`
: **Type**: `boolean`<br>
**Default**: `true`<br>
Telemetry: enables the dependency collection service that detects application dependencies via classloading and reports them. Default: true.

`DD_TELEMETRY_HEARTBEAT_INTERVAL`
: **Type**: `decimal`<br>
**Default**: `60.0`<br>
Sets the interval for the telemetry status heartbeat (in seconds)

`DD_TELEMETRY_LOG_COLLECTION_ENABLED`
: **Type**: `boolean`<br>
**Default**: `true`<br>
**Default**: true : Enable or disable log collection for telemetry.

`DD_TELEMETRY_METRICS_AGGREGATION_INTERVAL`
: **Type**: `decimal`<br>
**Default**: `10.0`<br>
Interval at which instrumentation telemetry metrics are aggregated before being sent.

`DD_TELEMETRY_METRICS_ENABLED`
: **Type**: `boolean`<br>
**Default**: `true`<br>
Controls whether instrumentation telemetry sends internal metrics. Defaults to true.

`DD_VERSION`
: **Type**: `string`<br>
**Default**: N/A<br>
Your application version, set as the version tag on traces.
