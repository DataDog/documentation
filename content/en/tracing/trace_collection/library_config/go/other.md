### Other

`DD_ACTION_EXECUTION_ID`
: **Type**: `string`<br>
**Default**: N/A<br>
Sets the action execution ID reported as CI metadata for AWS CodePipeline builds. This value is used as the CI job identifier when running a CodeBuild job initiated by CodePipeline.

`DD_AGENT_HOST`
: **Aliases**: `DD_TRACE_AGENT_HOSTNAME`<br>
**Type**: `string`<br>
**Default**: `localhost`<br>
The host name to use to connect the Datadog agent for traces. The host name can be IPv4, IPv6, or a domain name. If DD_TRACE_AGENT_URL is specified, the value of DD_AGENT_HOST is ignored.

`DD_API_KEY`
: **Since**: 2.3.0 <br>
**Aliases**: `DATADOG_API_KEY`, `DD-API-KEY`<br>
**Type**: `string`<br>
**Default**: N/A<br>
Sets the API key used to authenticate outbound requests when running in agentless mode (sending data directly instead of via a local agent). This key is required for agentless CI test reporting and LLM Observability agentless mode.

`DD_APM_TRACING_ENABLED`
: **Type**: `boolean`<br>
**Default**: `true`<br>
Enables or disables sending APM trace data. When disabled, tracing still runs to support other products, but only periodic heartbeat traces and manually kept traces are sent.

`DD_CUSTOM_TRACE_ID`
: **Type**: `string`<br>
**Default**: N/A<br>
Custom variable set by the Jenkins Datadog Plugin for trace IDs.

`DD_DBM_PROPAGATION_MODE`
: **Type**: `string`<br>
**Default**: `disabled`<br>
Enables linking between data sent from APM and the Database Monitoring product when set to `service` or `full`. The `service` option enables the connection between DBM and APM services. The `full` option enables connection between database spans with database query events. Available for Postgres and MySQL.

`DD_DOGSTATSD_HOST`
: **Aliases**: `DD_DOGSTATSD_HOSTNAME`<br>
**Type**: `string`<br>
**Default**: `localhost`<br>
Override the address of the trace Agent host that the default tracer attempts to submit DogStatsD metrics to. Use `DD_AGENT_HOST` to override `DD_DOGSTATSD_HOST`.

`DD_DOGSTATSD_PORT`
: **Type**: `int`<br>
**Default**: `8125`<br>
The port of the DogStatsD Agent that metrics are submitted to. If the Agent configuration sets `dogstatsd_port` or `DD_DOGSTATSD_PORT` to something other than the default `8125`, then this tracing library `DD_DOGSTATSD_PORT` must match it.

`DD_ENV`
: **Type**: `string`<br>
**Default**: `""`<br>
Sets the global `env` for all data emitted by the Agent. If `env` is not present in your trace data, this variable is used.

`DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED`
: **Since**: 2.4.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables the experimental feature-flag provider that evaluates flags from remote configuration. If not enabled, the provider is a no-op and returns default values.

`DD_EXPERIMENTAL_PROPAGATE_PROCESS_TAGS_ENABLED`
: **Since**: 2.3.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Controls whether process-level tags (such as entrypoint metadata) are collected and included in tracing metadata. If unset, this is enabled by default.

`DD_EXTERNAL_ENV`
: **Type**: `string`<br>
**Default**: N/A<br>
Sets an external environment identifier attached to emitted telemetry for origin and environment attribution.

`DD_GIT_BRANCH`
: **Type**: `string`<br>
**Default**: N/A<br>
Overrides the Git branch value used by CI Visibility for repository and commit correlation.

`DD_GIT_REPOSITORY_URL`
: **Type**: `string`<br>
**Default**: N/A<br>
Overrides the git repository URL reported as CI metadata and used for git metadata tagging when enabled. Any embedded credentials in the URL are stripped before use.

`DD_GIT_TAG`
: **Type**: `string`<br>
**Default**: N/A<br>
Overrides the Git tag used by CI Visibility for repository and release correlation.

`DD_HAPROXY_SPOA_HEALTHCHECK_PORT`
: **Since**: 2.4.0 <br>
**Type**: `int`<br>
**Default**: `3080`<br>
Configure the port used for healthcheck server for the HAProxy SPOA integration

`DD_HAPROXY_SPOA_HOST`
: **Since**: 2.4.0 <br>
**Type**: `string`<br>
**Default**: `0.0.0.0`<br>
Configure the host used for the HAProxy SPOA integration

`DD_HAPROXY_SPOA_PORT`
: **Since**: 2.4.0 <br>
**Type**: `int`<br>
**Default**: `3000`<br>
Configure the port used for the HAProxy SPOA integration

`DD_HOSTNAME`
: **Type**: `string`<br>
**Default**: N/A<br>
Overrides the hostname used for tagging and telemetry when hostname auto-detection is unreliable. The value must be a valid hostname; invalid values are ignored and hostname auto-detection is used instead.

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

`DD_KEY`
: **Type**: `string`<br>
**Default**: N/A<br>
Internal placeholder configuration key used for configuration-source tests and examples. It is not used by the tracer at runtime.

`DD_LLMOBS_AGENTLESS_ENABLED`
: **Since**: 2.6.0 <br>
**Type**: `boolean`<br>
**Default**: `""`<br>
Controls whether LLM Observability sends data directly to the intake (agentless mode) or through an agent/proxy. If unset, the mode is chosen automatically based on agent support; setting it to false requires an agent that supports LLM Observability.

`DD_LLMOBS_ML_APP`
: **Since**: 2.6.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Sets the default ML app name used for LLM Observability data. This value is required when LLM Observability is enabled.

`DD_LOGGING_RATE`
: **Since**: N/A <br>
**Type**: `int`<br>
**Default**: `60`<br>
Sets how often aggregated internal errors are flushed to logs, in seconds. Set to 0 to log errors immediately.

`DD_PIPELINE_EXECUTION_ID`
: **Type**: `string`<br>
**Default**: N/A<br>
Sets the pipeline execution ID reported as CI metadata for AWS CodePipeline builds. This value is used as the CI pipeline identifier when running a CodeBuild job initiated by CodePipeline.

`DD_RC_TUF_ROOT`
: **Type**: `string`<br>
**Default**: N/A<br>
Internal remote-configuration setting for specifying a TUF root metadata value. This setting is currently not used and has no effect.

`DD_REQUEST_MIRROR_HEALTHCHECK_ADDR`
: **Since**: N/A <br>
**Type**: `string`<br>
**Default**: `:8081`<br>
Sets the address (host:port) for the request-mirror health check HTTP server to listen on. Defaults to :8081.

`DD_REQUEST_MIRROR_LISTEN_ADDR`
: **Since**: N/A <br>
**Type**: `string`<br>
**Default**: `:8080`<br>
Sets the address (host:port) for the request-mirror HTTP server to listen on. Defaults to :8080.

`DD_SERVICE`
: **Since**: 2.3.0 <br>
**Aliases**: `DD_SERVICE_NAME`<br>
**Type**: `string`<br>
**Default**: N/A<br>
Sets the service name used for telemetry and generated spans. If unset, the service name defaults to the process name.

`DD_SERVICE_EXTENSION_HEALTHCHECK_PORT`
: **Since**: N/A <br>
**Type**: `int`<br>
**Default**: `80`<br>
Sets the port for the service-extension health check HTTP server to listen on. Defaults to 80.

`DD_SERVICE_EXTENSION_HOST`
: **Since**: N/A <br>
**Type**: `string`<br>
**Default**: `0.0.0.0`<br>
Sets the IP address the service extension servers listen on. Defaults to 0.0.0.0.

`DD_SERVICE_EXTENSION_OBSERVABILITY_MODE`
: **Since**: N/A <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables observability mode for the service extension. When enabled, blocking actions are disabled.

`DD_SERVICE_EXTENSION_PORT`
: **Since**: N/A <br>
**Type**: `int`<br>
**Default**: `443`<br>
Sets the port for the service extension gRPC server to listen on. Defaults to 443.

`DD_SERVICE_EXTENSION_TLS`
: **Since**: 2.4.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Controls whether TLS is enabled for the service extension gRPC server. Defaults to true.

`DD_SERVICE_EXTENSION_TLS_CERT_FILE`
: **Since**: 2.4.0 <br>
**Type**: `string`<br>
**Default**: `localhost.crt`<br>
Change the default gRPC TLS layer cert.

`DD_SERVICE_EXTENSION_TLS_KEY_FILE`
: **Since**: 2.4.0 <br>
**Type**: `string`<br>
**Default**: `localhost.key`<br>
Change the default gRPC TLS layer key.

`DD_SERVICE_MAPPING`
: **Since**: 2.3.0 <br>
**Type**: `map`<br>
**Default**: N/A<br>
Define service name mappings to allow renaming services in traces, for example: `postgres:postgresql,defaultdb:postgresql`. Available in version 0.47+.

`DD_SITE`
: **Since**: 2.3.0 <br>
**Type**: `string`<br>
**Default**: `datadoghq.com`<br>
Sets the site domain used to build agentless intake URLs. If unset, a default site is used.

`DD_SPAN_SAMPLING_RULES`
: **Type**: `array`<br>
**Default**: `[]`<br>
Span sampling rules to keep individual spans when the rest of the trace would otherwise be dropped. A JSON array of objects. Rules are applied in configured order to determine the span's sample rate. The sample_rate value must be between 0.0 and 1.0 (inclusive). For more information, see Ingestion Mechanisms. Example: - Set the span sample rate to 50% for the service my-service and operation name http.request, up to 50 traces per second: '[{"service": "my-service", "name": "http.request", "sample_rate":0.5, "max_per_second": 50}]'

`DD_SPAN_SAMPLING_RULES_FILE`
: **Type**: `string`<br>
**Default**: N/A<br>
Points to a JSON file that contains the span sampling rules. DD_SPAN_SAMPLING_RULES takes precedence over this variable. See DD_SPAN_SAMPLING_RULES for the rule format.

`DD_TAGS`
: **Type**: `map`<br>
**Default**: `""`<br>
Custom tags applied to traces profiles and metrics, provided as comma-separated key:value pairs (e.g. `layer:api,team:intake`).

`DD_TELEMETRY_DEBUG`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Enables debug mode for instrumentation telemetry. When set, it forces telemetry debug mode on regardless of other configuration.

`DD_TELEMETRY_DEPENDENCY_COLLECTION_ENABLED`
: **Type**: `boolean`<br>
**Default**: `true`<br>
Telemetry: enables the dependency collection service that detects application dependencies via classloading and reports them. Default: true.

`DD_TELEMETRY_HEARTBEAT_INTERVAL`
: **Since**: 2.3.0 <br>
**Type**: `decimal`<br>
**Default**: `60.0`<br>
Sets the interval for the telemetry status heartbeat (in seconds)

`DD_TELEMETRY_LOG_COLLECTION_ENABLED`
: **Type**: `boolean`<br>
**Default**: `true`<br>
**Default**: true : Enable or disable log collection for telemetry.

`DD_TELEMETRY_METRICS_ENABLED`
: **Type**: `boolean`<br>
**Default**: `true`<br>
Controls whether instrumentation telemetry sends internal metrics. Defaults to true.

`DD_TEST_AGENT_HOST`
: **Type**: `string`<br>
**Default**: N/A<br>
Sets the host used by internal instrumentation validation tests to reach a test agent. This setting is not used for runtime tracing.

`DD_TEST_AGENT_PORT`
: **Type**: `string`<br>
**Default**: N/A<br>
Sets the port used by internal instrumentation validation tests to reach a test agent. This setting is not used for runtime tracing.

`DD_TEST_SESSION_NAME`
: **Type**: `string`<br>
**Default**: N/A<br>
If `DD_TEST_SESSION_NAME` is not specified, the default value used is a combination of the:

`DD_VERSION`
: **Type**: `string`<br>
**Default**: `""`<br>
Set the application's version, for example: `1.2.3` or `6c44da20`.
