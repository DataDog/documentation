### Other

`DD_AAS_DOTNET_EXTENSION_VERSION`
: **Type**: `string`<br>
**Default**: `unknown`<br>
Holds the running version of the Azure App Services Site Extension. This env var is set in the applicationHost.xdt file.

`DD_AAS_ENABLE_CUSTOM_METRICS`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Used in Azure App Services to force the loader to start dogstatsd (in case automatic instrumentation is disabled)

`DD_AAS_ENABLE_CUSTOM_TRACING`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Used in Azure App Services to force the loader to start the trace agent (in case automatic instrumentation is disabled)

`DD_ACTION_EXECUTION_ID`
: **Type**: `string`<br>
**Default**: N/A<br>
Sets the action execution ID reported as CI metadata for AWS CodePipeline builds. This value is used as the CI job identifier when running a CodeBuild job initiated by CodePipeline.

`DD_AGENT_FEATURE_POLLING_ENABLED`
: **Type**: `boolean`<br>
**Default**: `true`<br>
Enables polling the /info endpoint in the trace agent for feature discovery.

`DD_AGENT_HOST`
: **Aliases**: `DD_TRACE_AGENT_HOSTNAME`, `DATADOG_TRACE_AGENT_HOSTNAME`<br>
**Type**: `string`<br>
**Default**: `localhost`<br>
The host name to use to connect the Datadog agent for traces. The host name can be IPv4, IPv6, or a domain name. If DD_TRACE_AGENT_URL is specified, the value of DD_AGENT_HOST is ignored.

`DD_API_KEY`
: **Aliases**: `DATADOG_API_KEY`<br>
**Type**: `string`<br>
**Default**: N/A<br>
To use the Datadog CLI in Azure Cloud Shell, open a cloud shell, set your API key and site in the `DD_API_KEY` and `DD_SITE` environment variables, and use `npx` to run the CLI directly:

`DD_APM_ENABLE_RARE_SAMPLER`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Enables rare trace sampling in the Datadog Agent. When enabled, the Agent can keep a small number of "rare" traces (up to 5 traces per second per Agent) that were not kept by head-based sampling.

`DD_APM_RECEIVER_PORT`
: **Type**: `int`<br>
**Default**: `8126`<br>
Used to force a specific port binding for the Trace Agent. Default value is 8126.

`DD_APM_RECEIVER_SOCKET`
: **Type**: `string`<br>
**Default**: N/A<br>
Unix domain socket where the Tracer can send traces. Default value is null.

`DD_APM_TRACING_ENABLED`
: **Type**: `boolean`<br>
**Default**: `true`<br>
Enables or disables sending APM trace data. When disabled, tracing still runs to support other products, but only periodic heartbeat traces and manually kept traces are sent.

`DD_APPLICATION_MONITORING_CONFIG_FILE_ENABLED`
: **Type**: `boolean`<br>
**Default**: `true`<br>
Controls whether reading the application monitoring config file through libdatadog (hands off config) is enabled. True by default

`DD_AZURE_APP_SERVICES`
: **Type**: `string`<br>
**Default**: N/A<br>
Configuration key which is used as a flag to tell us whether we are instrumenting an Azure App Service using the AAS Site Extension.

`DD_CODE_ORIGIN_FOR_SPANS_ENABLED`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Enables Code Origin for spans (Dynamic Instrumentation): starts the code-origin recorder and enables instrumentations that capture code origin at span entry (via `DebuggerContext.captureCodeOrigin`), producing code-origin snapshots/tags for spans. Default: false.

`DD_CODE_ORIGIN_FOR_SPANS_MAX_USER_FRAMES`
: **Type**: `int`<br>
**Default**: `8`<br>
Maximum number of frames to tag in exit span code origin. Default value is 8.

`DD_CUSTOM_TRACE_ID`
: **Type**: `string`<br>
**Default**: N/A<br>
Custom variable set by the Jenkins Datadog Plugin for trace IDs.

`DD_DBM_PROPAGATION_MODE`
: **Type**: `string`<br>
**Default**: `disabled`<br>
Enables linking between data sent from APM and the Database Monitoring product when set to `service` or `full`. The `service` option enables the connection between DBM and APM services. The `full` option enables connection between database spans with database query events. Available for Postgres and MySQL.

`DD_DIAGNOSTIC_SOURCE_ENABLED`
: **Type**: `boolean`<br>
**Default**: `true`<br>
Enables the use of System.Diagnostics.DiagnosticSource, making it possible to receive spans from libraries that self-instrument with the legacy System.Diagnostics.DiagnosticSource sub-system. Default value is true (enabled).

`DD_DISABLED_INTEGRATIONS`
: **Type**: `string`<br>
**Default**: N/A<br>
List of integrations to disable. All other integrations remain enabled. Default is empty (all integrations are enabled). Supports multiple values separated with semi-colons. It's an alternative to having multiple “DD_{INTEGRATION_NAME}_ENABLED=false“

`DD_DOGSTATSD_ARGS`
: **Type**: `string`<br>
**Default**: N/A<br>
Azure App Services: extra command-line arguments appended when the tracer starts an external DogStatsD process (only used when `DD_DOGSTATSD_PATH` is set).

`DD_DOGSTATSD_PATH`
: **Type**: `string`<br>
**Default**: N/A<br>
Azure App Services: path to the DogStatsD executable to run as an external process. When set, the tracer starts and supervises a `dogstatsd` process (passing `DD_DOGSTATSD_ARGS`) and optionally health-checks it using `DD_DOGSTATSD_PIPE_NAME`.

`DD_DOGSTATSD_PIPE_NAME`
: **Type**: `string`<br>
**Default**: N/A<br>
Named pipe that DogStatsD binds to. Default value is null.

`DD_DOGSTATSD_PORT`
: **Type**: `int`<br>
**Default**: `8125`<br>
The port of the DogStatsD Agent that metrics are submitted to. If the Agent configuration sets `dogstatsd_port` or `DD_DOGSTATSD_PORT` to something other than the default `8125`, then this tracing library `DD_DOGSTATSD_PORT` must match it.

`DD_DOGSTATSD_SOCKET`
: **Type**: `string`<br>
**Default**: N/A<br>
Unix domain socket that DogStatsD binds to. Default value is null.

`DD_DOGSTATSD_URL`
: **Type**: `string`<br>
**Default**: `udp://127.0.0.1:8125`<br>
The URL to use to connect the Datadog agent for Dogstatsd metrics.

`DD_DOTNET_TRACER_HOME`
: **Type**: `string`<br>
**Default**: N/A<br>
Points to the home directory of the dotnet Datadog tracer. On Windows, it is often set to the installation path, such as C:\Program Files\Datadog\.NET Tracer. On Linux/Docker, it is typically set to /opt/datadog.

`DD_ENV`
: **Type**: `string`<br>
**Default**: N/A<br>
The application's environment. Sets the "env" tag on every span.

`DD_EXPERIMENTAL_APPSEC_USE_UNSAFE_ENCODER`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Use new unsafe encoder for the waf

`DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Enables the experimental feature-flag provider that evaluates flags from remote configuration. If not enabled, the provider is a no-op and returns default values.

`DD_EXPERIMENTAL_PROPAGATE_PROCESS_TAGS_ENABLED`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Enables experimental propagation of process tags in payloads such as spans and telemetry.

`DD_GIT_BRANCH`
: **Type**: `string`<br>
**Default**: N/A<br>
Overrides the Git branch value used by CI Visibility for repository and commit correlation.

`DD_GIT_PULL_REQUEST_BASE_BRANCH`
: **Type**: `string`<br>
**Default**: N/A<br>
CI Visibility: sets the pull request base/target branch name, used to populate pull request info and CI git tags (for example, `git.pull_request.base_branch`) when user-supplied git metadata is needed.

`DD_GIT_PULL_REQUEST_BASE_BRANCH_SHA`
: **Type**: `string`<br>
**Default**: N/A<br>
Overrides the pull request base commit SHA reported as git metadata for CI features. Use this to set the base commit when it cannot be detected automatically.

`DD_GIT_REPOSITORY_URL`
: **Type**: `string`<br>
**Default**: N/A<br>
Overrides the git repository URL reported as CI metadata and used for git metadata tagging when enabled. Any embedded credentials in the URL are stripped before use.

`DD_GIT_TAG`
: **Type**: `string`<br>
**Default**: N/A<br>
Overrides the Git tag used by CI Visibility for repository and release correlation.

`DD_HTTP_CLIENT_ERROR_STATUSES`
: **Type**: `string`<br>
**Default**: `400-499`<br>
Client HTTP status codes that mark spans as errors.

`DD_HTTP_SERVER_ERROR_STATUSES`
: **Type**: `string`<br>
**Default**: `500-599`<br>
Server HTTP status codes that mark spans as errors.

`DD_HTTP_SERVER_TAG_QUERY_STRING`
: **Type**: `boolean`<br>
**Default**: `true`<br>
Enables or disables reporting the query string on server spans. Default value is true.

`DD_HTTP_SERVER_TAG_QUERY_STRING_SIZE`
: **Type**: `int`<br>
**Default**: `5000`<br>
Maximum size of the query string to report, before obfuscation. Default value is 5000. A value of 0 means no size limit.

`DD_IAST_COOKIE_FILTER_PATTERN`
: **Type**: `string`<br>
**Default**: `.*`<br>
Number of rows to taint on each database query in IAST. Default value is 1.

`DD_IAST_DB_ROWS_TO_TAINT`
: **Type**: `int`<br>
**Default**: `1`<br>
IAST: maximum number of JDBC `ResultSet` rows to treat as taint sources (SQL table data) for a given `ResultSet`. Rows beyond this limit are not tainted. Default: 1.

`DD_IAST_DEDUPLICATION_ENABLED`
: **Type**: `boolean`<br>
**Default**: `true`<br>
Enables or disables vulnerability deduplication detection. When enabled, a vulnerability is only reported once in the lifetime of an app, instead of on every occurrence. Default value is true (enabled).

`DD_IAST_ENABLED`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Enables or disables IAST. Default value is false (disabled).

`DD_IAST_MAX_CONCURRENT_REQUESTS`
: **Type**: `int`<br>
**Default**: `2`<br>
Maximum number of requests to be analyzed by IAST concurrently. Default value is 2.

`DD_IAST_MAX_RANGE_COUNT`
: **Type**: `int`<br>
**Default**: `10`<br>
IAST: maximum number of tainted ranges stored per tainted object/value. If more ranges are produced, they are truncated to this limit. Only used in `DEFAULT` detection mode; in `FULL` detection mode this is unlimited. Default (in `DEFAULT` mode): 10.

`DD_IAST_REGEXP_TIMEOUT`
: **Type**: `decimal`<br>
**Default**: `200.0`<br>
Timeout in milliseconds for regex execution in IAST. Default value is 200ms.

`DD_IAST_REQUEST_SAMPLING`
: **Type**: `int`<br>
**Default**: `30`<br>
Percentage of requests to be analyzed by IAST, between 1 and 100. Default value is 30.

`DD_IAST_TELEMETRY_VERBOSITY`
: **Type**: `string`<br>
**Default**: `information`<br>
Specifies the verbosity of the sent telemetry. Default 'INFORMATION'

`DD_IAST_TRUNCATION_MAX_VALUE_LENGTH`
: **Type**: `int`<br>
**Default**: `250`<br>
Default value is 250

`DD_IAST_VULNERABILITIES_PER_REQUEST`
: **Type**: `int`<br>
**Default**: `2`<br>
IAST: maximum number of vulnerabilities that can be reported per request (quota/overhead control). In `FULL` detection mode this limit is removed; in `DEFAULT` detection mode the default is 2.

`DD_IAST_WEAK_CIPHER_ALGORITHMS`
: **Type**: `string`<br>
**Default**: `DES,TRIPLEDES,RC2`<br>
Controls which weak cipher algorithms are reported.

`DD_IAST_WEAK_HASH_ALGORITHMS`
: **Type**: `string`<br>
**Default**: `HMACMD5,MD5,HMACSHA1,SHA1`<br>
Controls which weak hashing algorithms are reported.

`DD_INJECTION_ENABLED`
: **Type**: `string`<br>
**Default**: N/A<br>
Single Step Instrumentation (SSI): marker/metadata indicating the tracer was injected by SSI (and potentially which components were injected). When present, the bootstrap sets the instrumentation source to `ssi`, and other subsystems may use the value (for example, profiling treats it as injected when it contains `profiler`).

`DD_INJECT_FORCE`
: **Type**: `string`<br>
**Default**: N/A<br>
SSI variable that allows unsupported runtimes to be instrumented. Used for correlation purposes in telemetry.

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

`DD_INSTRUMENTATION_TELEMETRY_AGENTLESS_ENABLED`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Sends telemetry directly to the intake when enabled and an API key is set. If the agent is unavailable, telemetry is sent directly to intake. Enabled by default when an API key is available.

`DD_INSTRUMENTATION_TELEMETRY_AGENT_PROXY_ENABLED`
: **Type**: `boolean`<br>
**Default**: `true`<br>
Sends telemetry via the agent proxy when enabled. Enabled by default. If disabled, or if the agent is unavailable, telemetry is sent to the agentless endpoint based on CI Visibility agentless settings.

`DD_INSTRUMENTATION_TELEMETRY_COMPRESSION_METHOD`
: **Type**: `string`<br>
**Default**: `gzip`<br>
Configuration key to allow telemetry compression.

`DD_INSTRUMENTATION_TELEMETRY_ENABLED`
: **Type**: `boolean`<br>
**Default**: `true`<br>
Datadog may collect environmental and diagnostic information about your system to improve the product. When false, this telemetry data will not be collected. **Default**: true

`DD_INSTRUMENTATION_TELEMETRY_URL`
: **Type**: `string`<br>
**Default**: `https://instrumentation-telemetry-intake.datadoghq.com/`<br>
URL where the tracer sends telemetry. Only applies when agentless telemetry is in use; otherwise telemetry is sent to the agent.

`DD_LOGS_DIRECT_SUBMISSION_AZURE_FUNCTIONS_HOST_ENABLED`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Enables direct log submission to the Datadog backend for Azure Functions hosts

`DD_LOGS_DIRECT_SUBMISSION_BATCH_PERIOD_SECONDS`
: **Type**: `int`<br>
**Default**: `2`<br>
Time to wait between checking for log batches. Default value is 2s.

`DD_LOGS_DIRECT_SUBMISSION_HOST`
: **Type**: `string`<br>
**Default**: N/A<br>
Set the name of the originating host for direct logs submission. Required for direct logs submission (default is machine name).

`DD_LOGS_DIRECT_SUBMISSION_INTEGRATIONS`
: **Type**: `string`<br>
**Default**: N/A<br>
List of direct log submission integrations to enable. Only selected integrations are enabled for direct log submission. Default is empty (direct log submission disabled). Supports multiple values separated with semi-colons.

`DD_LOGS_DIRECT_SUBMISSION_MAX_BATCH_SIZE`
: **Type**: `int`<br>
**Default**: `1000`<br>
Maximum number of logs to send at one time. Default value is 1,000, the maximum accepted by the Datadog log API.

`DD_LOGS_DIRECT_SUBMISSION_MAX_QUEUE_SIZE`
: **Type**: `int`<br>
**Default**: `100000`<br>
Maximum number of logs to hold in the internal queue at any one time. Default value is 100,000.

`DD_LOGS_DIRECT_SUBMISSION_MINIMUM_LEVEL`
: **Type**: `string`<br>
**Default**: `Information`<br>
Minimum level logs should have to be sent to the intake. Default value is Information. Should be one of Verbose,Debug,Information,Warning,Error,Fatal.

`DD_LOGS_DIRECT_SUBMISSION_SOURCE`
: **Type**: `string`<br>
**Default**: `csharp`<br>
Set the originating source for direct logs submission. Default is 'csharp'

`DD_LOGS_DIRECT_SUBMISSION_TAGS`
: **Type**: `string`<br>
**Default**: N/A<br>
List of tags applied globally to all directly submitted logs. Supports multiple key-value pairs separated by commas, with keys and values separated by colons (for example `Key1:Value1,Key2:Value2`). If not provided, global tags are used instead.

`DD_LOGS_DIRECT_SUBMISSION_URL`
: **Type**: `string`<br>
**Default**: `https://http-intake.logs.datadoghq.com:443`<br>
URL to send logs to. Default value uses the domain set in ConfigurationKeys.Site, so defaults to https://http-intake.logs.datadoghq.com:443.

`DD_LOGS_INJECTION`
: **Type**: `boolean`<br>
**Default**: `true`<br>
**Supported Input**: Boolean (`true`/`false`) **Caveats**: Not supported in C++ or Go. **Description**: Enables or disables the automatic injection of trace context (trace ID, span ID) into JSON/structured application logs. This allows for correlation between traces and logs.

`DD_LOGS_OTEL_ENABLED`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Enables support for collecting and exporting logs generated by the the OpenTelemetry Logs API. This feature is available starting with .NET 3.1 when using Microsoft.Extensions.Logging

`DD_LOG_LEVEL`
: **Type**: `string`<br>
**Default**: N/A<br>
Sets the Datadog Agent logging level. Valid values are trace, debug, info, warn, error, critical, or off.

`DD_MAX_LOGFILE_SIZE`
: **Type**: `int`<br>
**Default**: `10485760`<br>
Approximate maximum size, in bytes, for Tracer log files. Default value is 10 MB.

`DD_MAX_TRACES_PER_SECOND`
: **Type**: `int`<br>
**Default**: `100`<br>
Maximum number of traces allowed to be submitted per second.

`DD_PIPELINE_EXECUTION_ID`
: **Type**: `string`<br>
**Default**: N/A<br>
Sets the pipeline execution ID reported as CI metadata for AWS CodePipeline builds. This value is used as the CI pipeline identifier when running a CodeBuild job initiated by CodePipeline.

`DD_PROXY_HTTPS`
: **Type**: `string`<br>
**Default**: N/A<br>
Configuration key to set a proxy server for https requests.

`DD_PROXY_NO_PROXY`
: **Type**: `string`<br>
**Default**: N/A<br>
Configuration key to set a list of hosts that should bypass the proxy. The list is space-separated.

`DD_SERVICE`
: **Aliases**: `DD_SERVICE_NAME`<br>
**Type**: `string`<br>
**Default**: N/A<br>
Default service name for the application. Used as the service name for top-level spans, and used to determine the service name of some child spans.

`DD_SITE`
: **Type**: `string`<br>
**Default**: `datadoghq.com`<br>
Sets the site domain used to build agentless intake URLs. If unset, a default site is used.

`DD_SPAN_SAMPLING_RULES`
: **Type**: `string`<br>
**Default**: N/A<br>
Span sampling: JSON rules used to decide per-span sampling priority (single-span sampling). If both `DD_SPAN_SAMPLING_RULES` and `DD_SPAN_SAMPLING_RULES_FILE` are set, the file setting is ignored. Rules can match spans by service/name and apply a sample rate and optional max-per-second limit.

`DD_SYMBOL_DATABASE_BATCH_SIZE_BYTES`
: **Type**: `int`<br>
**Default**: `100000`<br>
Maximum symbol size to upload, in bytes. Default value is 1 MB.

`DD_SYMBOL_DATABASE_COMPRESSION_ENABLED`
: **Type**: `boolean`<br>
**Default**: `true`<br>
Enables or disables compression for the symbols payload. Default value is true (enabled).

`DD_SYMBOL_DATABASE_THIRD_PARTY_DETECTION_EXCLUDES`
: **Type**: `string`<br>
**Default**: N/A<br>
Comma-separated list of libraries to exclude from third-party detection in the symbol database. Default value is empty.

`DD_SYMBOL_DATABASE_THIRD_PARTY_DETECTION_INCLUDES`
: **Type**: `string`<br>
**Default**: N/A<br>
Comma-separated list of libraries to include in third-party detection in the symbol database. Default value is empty.

`DD_SYMBOL_DATABASE_UPLOAD_ENABLED`
: **Type**: `boolean`<br>
**Default**: `true`<br>
Symbol Database (SymDB): enables uploading symbol information (for Live Debugging / Dynamic Instrumentation). Default: true.

`DD_TAGS`
: **Aliases**: `DD_TRACE_GLOBAL_TAGS`<br>
**Type**: `map`<br>
**Default**: N/A<br>
Custom tags applied to traces, provided as comma-separated key:value pairs (e.g. `layer:api,team:intake`).

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

`DD_TELEMETRY_METRICS_ENABLED`
: **Type**: `boolean`<br>
**Default**: `true`<br>
Controls whether instrumentation telemetry sends internal metrics. Defaults to true.

`DD_TESTSESSION_COMMAND`
: **Type**: `string`<br>
**Default**: N/A<br>
Specifies the test session command that was executed. This is used to track the command line that initiated the test session.

`DD_TESTSESSION_WORKINGDIRECTORY`
: **Type**: `string`<br>
**Default**: N/A<br>
Specifies the test session working directory. This is used to track the working directory where the test session was executed.

`DD_TEST_SESSION_NAME`
: **Type**: `string`<br>
**Default**: N/A<br>
If `DD_TEST_SESSION_NAME` is not specified, the default value used is a combination of the:

`DD_THIRD_PARTY_DETECTION_EXCLUDES`
: **Type**: `array`<br>
**Default**: `[]`<br>
Alias of `DD_THIRD_PARTY_EXCLUDES`. Live Debugging / Exception Replay: package prefixes to treat as first-party (exclude from the third-party library filter). This allowlist overrides the default third-party library list.

`DD_THIRD_PARTY_DETECTION_INCLUDES`
: **Type**: `array`<br>
**Default**: `[]`<br>
Comma-separated list of libraries to include in third-party detection. Default value is empty.

`DD_VERSION`
: **Type**: `string`<br>
**Default**: N/A<br>
Your application version, set as the version tag on traces.
