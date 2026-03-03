### Other

`DD_AAS_DOTNET_EXTENSION_VERSION`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: `unknown`<br>
Holds the running version of the Azure App Services Site Extension. This env var is set in the applicationHost.xdt file.

`DD_ACTION_EXECUTION_ID`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Sets the action execution ID reported as CI metadata for AWS CodePipeline builds. This value is used as the CI job identifier when running a CodeBuild job initiated by CodePipeline.

`DD_AGENTLESS_LOG_SUBMISSION_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables direct log submission to Datadog without routing logs through the Datadog Agent.

`DD_AGENTLESS_LOG_SUBMISSION_URL`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Overrides the intake URL used when agentless log submission is enabled.

`DD_AGENT_HOST`
: **Since**: 5.83.0 <br>
**Aliases**: `DD_TRACE_AGENT_HOSTNAME`<br>
**Type**: `string`<br>
**Default**: `localhost`<br>
The host name to use to connect the Datadog agent for traces. The host name can be IPv4, IPv6, or a domain name. If DD_TRACE_AGENT_URL is specified, the value of DD_AGENT_HOST is ignored.

`DD_API_KEY`
: **Since**: 5.83.0 <br>
**Aliases**: `DATADOG_API_KEY`<br>
**Type**: `string`<br>
**Default**: N/A<br>
To use the Datadog CLI in Azure Cloud Shell, open a cloud shell, set your API key and site in the `DD_API_KEY` and `DD_SITE` environment variables, and use `npx` to run the CLI directly:

`DD_APM_FLUSH_DEADLINE_MILLISECONDS`
: **Since**: 5.83.0 <br>
**Type**: `int`<br>
**Default**: `100`<br>
Doesn't crash when spans are finished early and reached impending timeout

`DD_APM_TRACING_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables or disables sending APM trace data. When disabled, tracing still runs to support other products, but only periodic heartbeat traces and manually kept traces are sent.

`DD_APP_KEY`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Sets the application key used to authenticate LLM Observability dataset and experiment requests in agentless mode. If agentless mode is enabled and this is not set, dataset/experiment operations that require an application key will fail.

`DD_AZURE_APP_SERVICES`
: **Type**: N/A<br>
**Default**: `undefined`<br>
Configuration key which is used as a flag to tell us whether we are instrumenting an Azure App Service using the AAS Site Extension.

`DD_AZURE_RESOURCE_GROUP`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Azure Resource Group name reported as cloud metadata for CI Visibility and telemetry correlation.

`DD_CODE_ORIGIN_FOR_SPANS_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables code origin for spans behavior in the tracer. When disabled, related data collection and processing are skipped.

`DD_CODE_ORIGIN_FOR_SPANS_EXPERIMENTAL_EXIT_SPANS_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables code origin for spans experimental exit spans behavior in the tracer. When disabled, related data collection and processing are skipped.

`DD_CRASHTRACKING_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables Crash Tracking. When enabled, the tracer initializes crash tracking and configures JVM crash/OOM hooks (for example, `-XX:OnError` and `-XX:OnOutOfMemoryError`) to run Datadog-provided scripts that upload `hs_err_pid*.log` crash logs and OOME notifications. Default: true.

`DD_CUSTOM_TRACE_ID`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Custom variable set by the Jenkins Datadog Plugin for trace IDs.

`DD_DBM_PROPAGATION_MODE`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: `disabled`<br>
Enables linking between data sent from APM and the Database Monitoring product when set to `service` or `full`. The `service` option enables the connection between DBM and APM services. The `full` option enables connection between database spans with database query events. Available for Postgres and MySQL.

`DD_DOGSTATSD_HOST`
: **Since**: 5.83.0 <br>
**Aliases**: `DD_DOGSTATSD_HOSTNAME`<br>
**Type**: `string`<br>
**Default**: `localhost`<br>
Override the address of the trace Agent host that the default tracer attempts to submit DogStatsD metrics to. Use `DD_AGENT_HOST` to override `DD_DOGSTATSD_HOST`.

`DD_DOGSTATSD_PORT`
: **Since**: 5.83.0 <br>
**Type**: `int`<br>
**Default**: `8125`<br>
The port of the DogStatsD Agent that metrics are submitted to. If the Agent configuration sets `dogstatsd_port` or `DD_DOGSTATSD_PORT` to something other than the default `8125`, then this tracing library `DD_DOGSTATSD_PORT` must match it.

`DD_ENABLE_NX_SERVICE_NAME`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Give DD_SERVICE precedence over NX_TASK_TARGET_PROJECT

`DD_ENV`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: `""`<br>
Sets the global `env` for all data emitted by the Agent. If `env` is not present in your trace data, this variable is used.

`DD_EXPERIMENTAL_APPSEC_STANDALONE_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Disable apm tracing with legacy DD_EXPERIMENTAL_APPSEC_STANDALONE_ENABLED

`DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables the experimental feature-flag provider that evaluates flags from remote configuration. If not enabled, the provider is a no-op and returns default values.

`DD_EXPERIMENTAL_FLAGGING_PROVIDER_INITIALIZATION_TIMEOUT_MS`
: **Since**: 5.84.0 <br>
**Type**: `int`<br>
**Default**: `30000`<br>
Timeout in milliseconds for OpenFeature provider initialization. If configuration is not received within this time, initialization fails. Can be configured via DD_EXPERIMENTAL_FLAGGING_PROVIDER_INITIALIZATION_TIMEOUT_MS environment variable.

`DD_EXPERIMENTAL_PROPAGATE_PROCESS_TAGS_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables experimental propagation of process tags in payloads such as spans and telemetry.

`DD_EXPERIMENTAL_TEST_OPT_GIT_CACHE_DIR`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: `${os.tmpdir()}/dd-trace-git-cache`<br>
Directory path used to persist the Test Optimization Git cache between runs.

`DD_EXPERIMENTAL_TEST_OPT_GIT_CACHE_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables experimental test opt git cache behavior in the tracer. When disabled, related data collection and processing are skipped.

`DD_EXPERIMENTAL_TEST_OPT_SETTINGS_CACHE`
: **Since**: 5.85.0 <br>
**Type**: `string`<br>
**Default**: `""`<br>
Enables caching of Test Optimization settings to reduce repeated remote-configuration lookups between runs.

`DD_EXTERNAL_ENV`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Sets an external environment identifier attached to emitted telemetry for origin and environment attribution.

`DD_FLAGGING_PROVIDER_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: N/A<br>
**Default**: `false`<br>
To enable feature flagging capabilities in SDKs [PREVIEW]

`DD_GIT_BRANCH`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Overrides the Git branch value used by CI Visibility for repository and commit correlation.

`DD_GIT_FOLDER_PATH`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Disables telemetry if inside a jest worker

`DD_GIT_PROPERTIES_FILE`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Disables telemetry if inside a jest worker

`DD_GIT_PULL_REQUEST_BASE_BRANCH`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
CI Visibility: sets the pull request base/target branch name, used to populate pull request info and CI git tags (for example, `git.pull_request.base_branch`) when user-supplied git metadata is needed.

`DD_GIT_PULL_REQUEST_BASE_BRANCH_SHA`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Overrides the pull request base commit SHA reported as git metadata for CI features. Use this to set the base commit when it cannot be detected automatically.

`DD_GIT_REPOSITORY_URL`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Overrides the git repository URL reported as CI metadata and used for git metadata tagging when enabled. Any embedded credentials in the URL are stripped before use.

`DD_GIT_TAG`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Overrides the Git tag used by CI Visibility for repository and release correlation.

`DD_GRPC_CLIENT_ERROR_STATUSES`
: **Since**: 5.83.0 <br>
**Type**: `array`<br>
**Default**: `1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16`<br>
A range of errors can be accepted. By default, gRPC status codes 1 to 16 are reported as errors for gRPC clients. This configuration overrides that. Ex. `dd.grpc.client.error.statuses=1-4,7-10`

`DD_GRPC_SERVER_ERROR_STATUSES`
: **Since**: 5.83.0 <br>
**Type**: `array`<br>
**Default**: `2,3,4,5,6,7,8,9,10,11,12,13,14,15,16`<br>
A range of errors can be accepted. By default, gRPC status codes 2 to 16 are reported as errors for gRPC servers. This configuration overrides that. Ex. `dd.grpc.server.error.statuses=2-4,7-10`

`DD_HEAP_SNAPSHOT_COUNT`
: **Since**: 5.83.0 <br>
**Type**: `int`<br>
**Default**: `0`<br>
Number of heap snapshots to write. Set to 0 to disable.

`DD_HEAP_SNAPSHOT_DESTINATION`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: `""`<br>
Directory path where heap snapshots are written.

`DD_HEAP_SNAPSHOT_INTERVAL`
: **Since**: 5.83.0 <br>
**Type**: `int`<br>
**Default**: `3600`<br>
Sets the delay between heap snapshots, affecting snapshot frequency and memory-profiling overhead.

`DD_IAST_DB_ROWS_TO_TAINT`
: **Since**: 5.83.0 <br>
**Type**: `int`<br>
**Default**: `1`<br>
IAST: maximum number of JDBC `ResultSet` rows to treat as taint sources (SQL table data) for a given `ResultSet`. Rows beyond this limit are not tainted. Default: 1.

`DD_IAST_DEDUPLICATION_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables or disables vulnerability deduplication detection. When enabled, a vulnerability is only reported once in the lifetime of an app, instead of on every occurrence. Default value is true (enabled).

`DD_IAST_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: `false`<br>
IAST: controls IAST product activation. `true`/`1` fully enables IAST; `inactive` applies instrumentation but keeps logic inactive so it can be toggled via remote config; any other value fully disables IAST. Default: false.

`DD_IAST_MAX_CONCURRENT_REQUESTS`
: **Since**: 5.83.0 <br>
**Type**: `int`<br>
**Default**: `2`<br>
Maximum number of requests to be analyzed by IAST concurrently. Default value is 2.

`DD_IAST_MAX_CONTEXT_OPERATIONS`
: **Since**: 5.83.0 <br>
**Type**: `int`<br>
**Default**: `2`<br>
Controls how many code vulnerabilities can be detected in the same request

`DD_IAST_REQUEST_SAMPLING`
: **Since**: 5.83.0 <br>
**Type**: `int`<br>
**Default**: `30`<br>
Percentage of requests to be analyzed by IAST, between 1 and 100. Default value is 30.

`DD_IAST_SECURITY_CONTROLS_CONFIGURATION`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
The Security Controls definition must be placed in the configuration variable `DD_IAST_SECURITY_CONTROLS_CONFIGURATION`.

`DD_IAST_STACK_TRACE_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: N/A<br>
**Default**: `true`<br>
Enables iast stack trace behavior in the tracer. When disabled, related data collection and processing are skipped.

`DD_IAST_TELEMETRY_VERBOSITY`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: `information`<br>
Specifies the verbosity of the sent telemetry. Default 'INFORMATION'

`DD_INJECTION_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `array`<br>
**Default**: `""`<br>
Enables injection behavior in the tracer. When disabled, related data collection and processing are skipped.

`DD_INJECT_FORCE`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Single Step Instrumentation (SSI): forces the tracer javaagent to load even when multiple JVM agents are detected. This bypasses SSI guardrails that would otherwise abort startup to avoid running multiple agents. Can be set via `DD_INJECT_FORCE` or system property `dd.inject.force`. Default: false.

`DD_INSTRUMENTATION_CONFIG_ID`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Internal instrumentation configuration identifier attached to telemetry for remote-configuration correlation.

`DD_INSTRUMENTATION_INSTALL_ID`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Sets the install ID included in instrumentation telemetry payloads and headers. This can be used to correlate telemetry to a specific installation.

`DD_INSTRUMENTATION_INSTALL_TIME`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Sets the install time included in instrumentation telemetry payloads and headers.

`DD_INSTRUMENTATION_INSTALL_TYPE`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Sets the install type included in instrumentation telemetry payloads and headers.

`DD_INSTRUMENTATION_TELEMETRY_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Datadog may collect environmental and diagnostic information about your system to improve the product. When false, this telemetry data will not be collected. **Default**: true

`DD_LAMBDA_HANDLER`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
- Set the environment variable `DD_LAMBDA_HANDLER` to your original handler, for example, `myfunc.handler`.

`DD_LANGCHAIN_SPAN_CHAR_LIMIT`
: **Since**: 5.83.0 <br>
**Type**: `int`<br>
**Default**: `128`<br>
Maximum number of characters recorded for langchain span data.

`DD_LANGCHAIN_SPAN_PROMPT_COMPLETION_SAMPLE_RATE`
: **Since**: 5.83.0 <br>
**Type**: `decimal`<br>
**Default**: `1`<br>
Controls the sampling rate for capturing LangChain prompt and completion content on spans.

`DD_LLMOBS_AGENTLESS_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: N/A<br>
Set to `true` to disable sending data that requires a Datadog Agent.

`DD_LLMOBS_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Toggle to enable submitting data to LLM Observability

`DD_LLMOBS_ML_APP`
: **Since**: 5.83.0 <br>
**Type**: N/A<br>
**Default**: `undefined`<br>
Sets the ML application name attached to LLM Observability spans and events.

`DD_LOGS_INJECTION`
: **Since**: 5.83.0 <br>
**Type**: N/A<br>
**Default**: `false`<br>
Enable automatic injection of trace IDs in logs for supported logging libraries.

`DD_LOGS_OTEL_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables support for collecting and exporting logs generated by the the OpenTelemetry Logs API. This feature is available starting with .NET 3.1 when using Microsoft.Extensions.Logging

`DD_LOG_LEVEL`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: `ERROR`<br>
Sets the internal log level for the tracer.

`DD_MINI_AGENT_PATH`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Sets the filesystem path used to reach the mini-agent for tracer communication in constrained environments.

`DD_OPENAI_LOGS_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enable collection of prompts and completions as logs. You can adjust the rate of prompts and completions collected using the sample rate configuration described below.

`DD_OPENAI_SPAN_CHAR_LIMIT`
: **Since**: 5.83.0 <br>
**Type**: `int`<br>
**Default**: `128`<br>
Configure the maximum number of characters for the following data within span tags:

`DD_PIPELINE_EXECUTION_ID`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Sets the pipeline execution ID reported as CI metadata for AWS CodePipeline builds. This value is used as the CI pipeline identifier when running a CodeBuild job initiated by CodePipeline.

`DD_PLAYWRIGHT_WORKER`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Internal marker (set to `1`) used to detect Playwright worker processes for CI Visibility IPC payload routing.

`DD_SERVERLESS_PUBSUB_ENABLED`
: **Since**: N/A <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables new GCP PubSub Push subscription plugin for Node.js Distributed Tracing. 

`DD_SERVICE`
: **Since**: 5.83.0 <br>
**Aliases**: `DD_SERVICE_NAME`<br>
**Type**: N/A<br>
**Default**: `service`<br>
Sets the default service name used for most spans. SDKs may set a different service name for inferred services. Integration spans may use their own default names, which can differ from the value specified in DD_SERVICE

`DD_SERVICE_MAPPING`
: **Since**: 5.83.0 <br>
**Type**: N/A<br>
**Default**: `{}`<br>
**Example**: `mysql:my-mysql-service-name-db,pg:my-pg-service-name-db` Provide service names for each plugin. Accepts comma separated `plugin:service-name` pairs, with or without spaces.

`DD_SITE`
: **Since**: 5.83.0 <br>
**Type**: N/A<br>
**Default**: `'datadoghq.com'`<br>
If you're not using the Datadog US1 site, set your Datadog site with a `DD_SITE` environment variable under the configuration tab of your function app, or copy the site parameter into the function code on line 21.

`DD_SPAN_SAMPLING_RULES`
: **Since**: 5.83.0 <br>
**Type**: `array`<br>
**Default**: `[]`<br>
Span sampling rules to keep individual spans when the rest of the trace would otherwise be dropped. A JSON array of objects. Rules are applied in configured order to determine the span's sample rate. The sample_rate value must be between 0.0 and 1.0 (inclusive). For more information, see Ingestion Mechanisms. Example: - Set the span sample rate to 50% for the service my-service and operation name http.request, up to 50 traces per second: '[{"service": "my-service", "name": "http.request", "sample_rate":0.5, "max_per_second": 50}]'

`DD_SPAN_SAMPLING_RULES_FILE`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Points to a JSON file that contains the span sampling rules. DD_SPAN_SAMPLING_RULES takes precedence over this variable. See DD_SPAN_SAMPLING_RULES for the rule format.

`DD_TAGS`
: **Since**: 5.83.0 <br>
**Type**: `map`<br>
**Default**: `""`<br>
Custom tags applied to traces profiles and metrics, provided as comma-separated key:value pairs (e.g. `layer:api,team:intake`).

`DD_TELEMETRY_DEBUG`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables debug mode for instrumentation telemetry. When set, it forces telemetry debug mode on regardless of other configuration.

`DD_TELEMETRY_DEPENDENCY_COLLECTION_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Telemetry: enables the dependency collection service that detects application dependencies via classloading and reports them. Default: true.

`DD_TELEMETRY_FORWARDER_PATH`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Bootstrap initialization telemetry: path to an executable used to forward tracer activation telemetry as JSON. If unset, bootstrap initialization telemetry is disabled (no forwarding).

`DD_TELEMETRY_HEARTBEAT_INTERVAL`
: **Since**: 5.83.0 <br>
**Type**: N/A<br>
**Default**: `60000`<br>
: Interval in seconds for sending telemetry heartbeat messages.

`DD_TELEMETRY_LOG_COLLECTION_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
**Default**: true : Enable or disable log collection for telemetry.

`DD_TELEMETRY_METRICS_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Controls whether instrumentation telemetry sends internal metrics. Defaults to true.

`DD_TEST_FAILED_TEST_REPLAY_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
CI Visibility: enables the Failed Test Replay feature (kill-switch). When enabled in execution settings, the tracer enables exception replay debugging during test execution to capture data for failed-test replay. Default: true (still requires backend/remote settings to enable).

`DD_TEST_FLEET_CONFIG_PATH`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Disable stats if config property is used

`DD_TEST_LOCAL_CONFIG_PATH`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Disable stats if config property is used

`DD_TEST_SESSION_NAME`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
If `DD_TEST_SESSION_NAME` is not specified, the default value used is a combination of the:

`DD_TRACING_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables tracing behavior in the tracer. When disabled, related data collection and processing are skipped.

`DD_VERSION`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: `""`<br>
Set the application's version, for example: `1.2.3` or `6c44da20`.

`DD_VERTEXAI_SPAN_CHAR_LIMIT`
: **Since**: 5.83.0 <br>
**Type**: `int`<br>
**Default**: `128`<br>
Maximum number of characters recorded for vertexai span data.

`DD_VERTEXAI_SPAN_PROMPT_COMPLETION_SAMPLE_RATE`
: **Since**: 5.83.0 <br>
**Type**: `decimal`<br>
**Default**: `1`<br>
Controls the sampling rate for capturing Vertex AI prompt and completion content on spans.

`DD_VITEST_WORKER`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Internal marker (set to `1`) used to detect Vitest worker processes for CI Visibility IPC payload routing.
