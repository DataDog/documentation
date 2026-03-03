### Other

`DD_AAS_JAVA_EXTENSION_VERSION`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Azure App Services: sets the Datadog Java site extension version string used for the `aas.environment.extension_version` tag. If not set, the tracer reports `unknown`.

`DD_ACTION_EXECUTION_ID`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Sets the action execution ID reported as CI metadata for AWS CodePipeline builds. This value is used as the CI job identifier when running a CodeBuild job initiated by CodePipeline.

`DD_AGENTLESS_LOG_SUBMISSION_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables direct log submission to Datadog without routing logs through the Datadog Agent.

`DD_AGENTLESS_LOG_SUBMISSION_LEVEL`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `INFO`<br>
Sets log level for Agentless submission

`DD_AGENTLESS_LOG_SUBMISSION_QUEUE_SIZE`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `1024`<br>
Sets the maximum size of pending logs queue

`DD_AGENTLESS_LOG_SUBMISSION_URL`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Overrides the intake URL used when agentless log submission is enabled.

`DD_AGENT_HOST`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Override the default trace Agent host address for trace submission. Ignored if `DD_TRACE_AGENT_URL` is set.

`DD_AGENT_PORT`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `0`<br>
Overrides the port that the default tracer submit traces to. If the Agent configuration sets `receiver_port` or `DD_APM_RECEIVER_PORT` to something other than the default `8126`, then `DD_AGENT_PORT` or `DD_TRACE_AGENT_URL` must match it.

`DD_API_KEY`
: **Since**: 1.54.0 <br>
**Aliases**: `DATADOG_API_KEY`<br>
**Type**: `string`<br>
**Default**: N/A<br>
To use the Datadog CLI in Azure Cloud Shell, open a cloud shell, set your API key and site in the `DD_API_KEY` and `DD_SITE` environment variables, and use `npx` to run the CLI directly:

`DD_API_KEY_FILE`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Path to a file containing the Datadog API key. When set, the tracer reads the API key from this file (UTF-8, trimmed) instead of relying on `DD_API_KEY` alone; read errors are logged and the key is skipped.

`DD_APM_TRACING_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables or disables sending APM trace data. When disabled, tracing still runs to support other products, but only periodic heartbeat traces and manually kept traces are sent.

`DD_APPLICATION_KEY`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_APP_KEY`<br>
**Type**: `string`<br>
**Default**: N/A<br>
Your Datadog application key. This key, created by your Datadog organization, should include the `code_analysis_read` scope and be stored as a secret.

`DD_APPLICATION_KEY_FILE`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Path to a file containing the Datadog application key. When set, the tracer reads the application key from this file (UTF-8, trimmed) instead of relying on `DD_APP_KEY` / `DD_APPLICATION_KEY` alone; read errors are logged and the key is skipped.

`DD_APP_CUSTOMJMXBUILDER`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Indicates the application uses a custom JMX `MBeanServerBuilder` (`javax.management.builder.initial`). When set to `true`, the tracer delays starting JMXFetch (and other JMX-dependent startup work) until the custom builder is initialized, to avoid interfering with application JMX initialization. Setting it to `false` disables this automatic delay/detection.

`DD_APP_CUSTOMLOGMANAGER`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Indicates the application uses a custom Java Util Logging (JUL) `LogManager` (`java.util.logging.manager`). When set to `true`, the tracer delays JMXFetch and tracer/profiling initialization until JUL is initialized, to avoid preventing the application from installing its custom log manager. Setting it to `false` disables this automatic delay/detection.

`DD_APP_LOGS_COLLECTION_ENABLED`
: **Since**: 1.58.0 <br>
**Type**: `boolean`<br>
**Default**: `False`<br>
Enables the collection of application logs

`DD_AWS_PROPAGATION_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: N/A<br>
**Default**: N/A<br>
No description available.

`DD_AWS_SDK_PROPAGATION_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: N/A<br>
**Default**: N/A<br>
No description available.

`DD_AZURE_APP_SERVICES`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables Azure App Services mode. When enabled, the tracer adds Azure App Services environment tags (`aas.*`) to the local root span and profiling tags (derived from Azure environment variables such as `WEBSITE_*` and `DD_AAS_JAVA_EXTENSION_VERSION`).

`DD_CODE_ORIGIN_FOR_SPANS_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables Code Origin for spans (Dynamic Instrumentation): starts the code-origin recorder and enables instrumentations that capture code origin at span entry (via `DebuggerContext.captureCodeOrigin`), producing code-origin snapshots/tags for spans. Default: false.

`DD_CODE_ORIGIN_MAX_USER_FRAMES`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `8`<br>
Code Origin for spans (Dynamic Instrumentation): sets the maximum number of user stack frames to capture/consider when recording code origin (default: 8). Note: the current code-origin recorder reads this value but does not use it, so it may have no effect in this version.

`DD_CRASHTRACKING_AGENTLESS`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Crash Tracking (not intended for production use): when enabled, the tracer uploads crash telemetry and error-tracking payloads directly to Datadog intake (based on `DD_SITE`) instead of proxying through the local Datadog Agent. Default: false.

`DD_CRASHTRACKING_DEBUG_AUTOCONFIG_ENABLE`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Crash Tracking (debug): enables crash tracking auto-configuration (JVM hooks). When enabled, crash tracking attempts to auto-configure `-XX:OnError` / `-XX:OnOutOfMemoryError` via the native JVM-access library; when disabled, crash tracking may defer initialization and rely on user-provided JVM flags. If unset, this defaults to whether profiling is enabled.

`DD_CRASHTRACKING_DEBUG_START_FORCE_FIRST`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Crash Tracking (debug): forces crash tracking initialization to run immediately at startup instead of being deferred to a background task / after JMX. This can add startup overhead (native library init can take 100ms+). Default: false.

`DD_CRASHTRACKING_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables Crash Tracking. When enabled, the tracer initializes crash tracking and configures JVM crash/OOM hooks (for example, `-XX:OnError` and `-XX:OnOutOfMemoryError`) to run Datadog-provided scripts that upload `hs_err_pid*.log` crash logs and OOME notifications. Default: true.

`DD_CRASHTRACKING_ERRORS_INTAKE_ENABLED`
: **Since**: 1.57.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enable sending the crash to the error tracking intake

`DD_CRASHTRACKING_PROXY_HOST`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Crash Tracking: proxy host for the crash uploader HTTP client (used to send crash telemetry and error-tracking payloads).

`DD_CRASHTRACKING_PROXY_PASSWORD`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Crash Tracking: proxy password for the crash uploader HTTP client (used with `DD_CRASHTRACKING_PROXY_USERNAME`).

`DD_CRASHTRACKING_PROXY_PORT`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Crash Tracking: proxy port for the crash uploader HTTP client.

`DD_CRASHTRACKING_PROXY_USERNAME`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Crash Tracking: proxy username for the crash uploader HTTP client (used with `DD_CRASHTRACKING_PROXY_PASSWORD`).

`DD_CRASHTRACKING_TAGS`
: **Since**: 1.54.0 <br>
**Type**: `map`<br>
**Default**: N/A<br>
Crash Tracking: additional tags to attach to crash reports (merged with global/JMX/runtime tags, and includes service/env/version/language/host).

`DD_CRASHTRACKING_UPLOAD_TIMEOUT`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `2`<br>
Crash Tracking: upload timeout in seconds for crash uploader HTTP requests. Default: 2 seconds.

`DD_CUSTOM_TRACE_ID`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Custom variable set by the Jenkins Datadog Plugin for trace IDs.

`DD_CWS_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables Cloud Workload Security (CWS). When enabled, the tracer registers a scope listener that writes the active trace/span IDs into thread-local storage for the CWS eBPF side to read. Default: false.

`DD_CWS_TLS_REFRESH`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `5000`<br>
CWS TLS: refresh interval in milliseconds for re-registering the thread-local storage pointer with the CWS eRPC layer (background thread periodically calls `registerTls()` and sleeps `refresh`). Default: 5000ms.

`DD_DATA_JOBS_COMMAND_PATTERN`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Data Jobs Monitoring: regex pattern matched against the current JVM command line. When Data Jobs Monitoring is enabled and the command does not match this pattern, the tracer aborts installation; invalid regex values are ignored with a warning.

`DD_DATA_JOBS_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables Data Jobs Monitoring. When enabled, the tracer auto-enables Spark/Spark-executor integrations, long-running traces, and enables Data Streams Monitoring by default; it also validates the JVM command against `DD_DATA_JOBS_COMMAND_PATTERN` and can abort tracer installation if incompatible.

`DD_DATA_JOBS_EXPERIMENTAL_FEATURES_ENABLED`
: **Since**: 1.55.0 <br>
**Type**: `boolean`<br>
**Default**: `False`<br>
Data Jobs Monitoring: enables experimental Spark instrumentation features. When enabled, Spark instrumentation may extract and attach additional Spark plan metadata (for example, when `SparkPlanInfo` metadata is empty). Default: false.

`DD_DATA_JOBS_OPENLINEAGE_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Data Jobs Monitoring: enables OpenLineage support for Spark by injecting the `io.openlineage.spark.agent.OpenLineageSparkListener` into `spark.extraListeners` (when the OpenLineage Spark agent is present). Default: false.

`DD_DATA_JOBS_OPENLINEAGE_TIMEOUT_ENABLED`
: **Since**: 1.55.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Data Jobs Monitoring (OpenLineage): when enabled (default), configures a timeout circuit breaker in Spark OpenLineage settings (`spark.openlineage.circuitBreaker.type=timeout`) if supported and not already configured, to avoid OpenLineage operations hanging.

`DD_DATA_JOBS_PARSE_SPARK_PLAN_ENABLED`
: **Since**: 1.55.0 <br>
**Type**: `boolean`<br>
**Default**: `False`<br>
Enables parsing of the Spark Plan for additional metadata details

`DD_DBM_ALWAYS_APPEND_SQL_COMMENT`
: **Since**: 1.55.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
When the `DD_DBM_PROPAGATION_MODE` is set, a comment is injected in SQL queries. Most of the time it is prepended. This config forces the comment to be appended at all times.

`DD_DBM_INJECT_SQL_BASEHASH`
: **Since**: 1.55.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables the injection of a "base hash" in SQL queries when DBM propagation is also enabled. This base hash is used to find matching spans, and enrich the queries with related values.

`DD_DBM_PROPAGATION_MODE`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `disabled`<br>
Enables linking between data sent from APM and the Database Monitoring product when set to `service` or `full`. The `service` option enables the connection between DBM and APM services. The `full` option enables connection between database spans with database query events. Available for Postgres and MySQL.

`DD_DBM_TRACE_PREPARED_STATEMENTS`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Database Monitoring (DBM): when enabled, Postgres prepared statements propagate trace context by setting `application_name` (via `Connection#setClientInfo`) because comments cannot be used, at the cost of an extra round trip. Default: false.

`DD_DETECT_AOT_TRAINING_MODE`
: **Since**: 1.57.0 <br>
**Type**: `boolean`<br>
**Default**: N/A<br>
Temporary internal flag in case we need to roll-back detection of the JVM's AOT training mode

`DD_DISTRIBUTED_DEBUGGER_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables Distributed Debugger. When disabled (default), "trigger" probes are not installed by the dynamic instrumentation transformer.

`DD_DOGSTATSD_ARGS`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Azure App Services: extra command-line arguments appended when the tracer starts an external DogStatsD process (only used when `DD_DOGSTATSD_PATH` is set).

`DD_DOGSTATSD_HOST`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Override the address of the trace Agent host that the default tracer attempts to submit DogStatsD metrics to. Use `DD_AGENT_HOST` to override `DD_DOGSTATSD_HOST`.

`DD_DOGSTATSD_PATH`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Azure App Services: path to the DogStatsD executable to run as an external process. When set, the tracer starts and supervises a `dogstatsd` process (passing `DD_DOGSTATSD_ARGS`) and optionally health-checks it using `DD_DOGSTATSD_PIPE_NAME`.

`DD_DOGSTATSD_PIPE_NAME`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Named pipe that DogStatsD binds to. Default value is null.

`DD_DOGSTATSD_PORT`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `8125`<br>
The port of the DogStatsD Agent that metrics are submitted to. If the Agent configuration sets `dogstatsd_port` or `DD_DOGSTATSD_PORT` to something other than the default `8125`, then this tracing library `DD_DOGSTATSD_PORT` must match it.

`DD_DOGSTATSD_START_DELAY`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_JMXFETCH_START_DELAY`<br>
**Type**: `int`<br>
**Default**: `15`<br>
DogStatsD client start delay (seconds). Delays establishing the DogStatsD/StatsD connection until this many seconds after tracer start time (default: 15).

`DD_ENV`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `""`<br>
Sets the global `env` for all data emitted by the Agent. If `env` is not present in your trace data, this variable is used.

`DD_EXCEPTION_DEBUGGING_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_EXCEPTION_REPLAY_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Exception Replay (Live Debugging): enables exception debugging at startup. When enabled, the tracer starts the Exception Replay subsystem which installs exception probes and captures snapshots for handled exceptions. Default: false. Note: `DD_EXCEPTION_REPLAY_ENABLED` is also accepted as a backward-compatible alias.

`DD_EXPERIMENTAL_API_SECURITY_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
API Security (experimental): enables API Security (deprecated experimental key; alias for `api-security.enabled`). When enabled and AppSec is active, the tracer initializes the API Security sampler and span post-processing needed for API Security features.

`DD_EXPERIMENTAL_DEFER_INTEGRATIONS_UNTIL`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Instrumentation (experimental): defers integration matching/activation until a configured delay (parsed as a simple duration). When the delay is recognized and 5 seconds, deferred matching is resumed later via a scheduled task.

`DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED`
: **Since**: 1.56.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables the experimental feature-flag provider that evaluates flags from remote configuration. If not enabled, the provider is a no-op and returns default values.

`DD_EXPERIMENTAL_PROPAGATE_PROCESS_TAGS_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Controls whether process-level tags (such as entrypoint metadata) are collected and included in tracing metadata. If unset, this is enabled by default.

`DD_FORCE_CLEAR_TEXT_HTTP_FOR_INTAKE_CLIENT`
: **Since**: 1.55.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Forces the intake HTTP client to use cleartext (no TLS) connection specs. Intended for environments/JVMs without TLS support when communicating with intake over HTTP. Default: false.

`DD_GIT_BRANCH`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Overrides the Git branch value used by CI Visibility for repository and commit correlation.

`DD_GIT_PULL_REQUEST_BASE_BRANCH`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
CI Visibility: sets the pull request base/target branch name, used to populate pull request info and CI git tags (for example, `git.pull_request.base_branch`) when user-supplied git metadata is needed.

`DD_GIT_PULL_REQUEST_BASE_BRANCH_SHA`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Overrides the pull request base commit SHA reported as git metadata for CI features. Use this to set the base commit when it cannot be detected automatically.

`DD_GIT_REPOSITORY_URL`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Overrides the git repository URL reported as CI metadata and used for git metadata tagging when enabled. Any embedded credentials in the URL are stripped before use.

`DD_GIT_TAG`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Overrides the Git tag used by CI Visibility for repository and release correlation.

`DD_GRPC_CLIENT_ERROR_STATUSES`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16}`<br>
A range of errors can be accepted. By default, gRPC status codes 1 to 16 are reported as errors for gRPC clients. This configuration overrides that. Ex. `dd.grpc.client.error.statuses=1-4,7-10`

`DD_GRPC_SERVER_ERROR_STATUSES`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `{2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16}`<br>
A range of errors can be accepted. By default, gRPC status codes 2 to 16 are reported as errors for gRPC servers. This configuration overrides that. Ex. `dd.grpc.server.error.statuses=2-4,7-10`

`DD_HTTP_CLIENT_ERROR_STATUSES`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `400-499`<br>
Client HTTP status codes that mark spans as errors.

`DD_HTTP_CLIENT_TAG_HEADERS`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
HTTP client: when enabled (default), tags HTTP client spans with configured request/response header values (from the tracer's header-to-tag mapping, e.g. `DD_TRACE_HEADER_TAGS`). When disabled, HTTP header tagging is skipped.

`DD_HTTP_CLIENT_TAG_QUERY_STRING`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
By default, query string parameters and fragments are added to the `http.url` tag on web client spans. Set to `false` to prevent the collection of this data.

`DD_HTTP_SERVER_DECODED_RESOURCE_PRESERVE_SPACES`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
HTTP server: controls whether spaces are preserved when normalizing decoded URL paths into resource names. When enabled (default), whitespace characters are kept; when disabled, whitespace is removed during normalization.

`DD_HTTP_SERVER_ERROR_STATUSES`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `500-599`<br>
Server HTTP status codes that mark spans as errors.

`DD_HTTP_SERVER_RAW_QUERY_STRING`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
HTTP server: when query-string tagging is enabled and raw URL components are available, uses the raw (percent-encoded) query string (`rawQuery`) instead of the decoded query string. Default: true.

`DD_HTTP_SERVER_RAW_RESOURCE`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
HTTP server: when enabled and raw URL components are available, uses the raw path (`rawPath`) when tagging `http.url` and building the server resource name, preserving percent-encoding. Default: false.

`DD_HTTP_SERVER_ROUTE_BASED_NAMING`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
When set to `false` http framework routes are not used for resource names. _This can change resource names and derived metrics if changed._

`DD_HTTP_SERVER_TAG_QUERY_STRING`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables or disables reporting the query string on server spans. Default value is true.

`DD_HYSTRIX_MEASURED_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Hystrix: when enabled, marks Hystrix spans as measured (`span.setMeasured(true)`), so they contribute to trace metrics. Default: false.

`DD_HYSTRIX_TAGS_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
By default the Hystrix group, command, and circuit state tags are not enabled. This property enables them.

`DD_IAST_ANONYMOUS_CLASSES_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
IAST: controls whether IAST call site instrumentation applies to anonymous classes (following the Java `$<digits>` naming convention). When disabled, anonymous classes are excluded from the IAST matcher. Default: true.

`DD_IAST_CONTEXT_MODE`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `REQUEST`<br>
IAST: selects how IAST context is scoped: `REQUEST` (default) stores context on the active request span; `GLOBAL` uses a single global context instance. This also affects how IAST overhead controls are applied.

`DD_IAST_DB_ROWS_TO_TAINT`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `1`<br>
IAST: maximum number of JDBC `ResultSet` rows to treat as taint sources (SQL table data) for a given `ResultSet`. Rows beyond this limit are not tainted. Default: 1.

`DD_IAST_DEBUG_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
IAST: enables debug mode (extra debug logging/telemetry and a debug overhead-controller adapter). Default: false.

`DD_IAST_DEDUPLICATION_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables or disables vulnerability deduplication detection. When enabled, a vulnerability is only reported once in the lifetime of an app, instead of on every occurrence. Default value is true (enabled).

`DD_IAST_DETECTION_MODE`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `DEFAULT`<br>
IAST: sets detection mode. `DEFAULT` applies overhead controls (sampling, concurrency limits, deduplication, range limits). `FULL` removes these limits (100% sampling, unlimited concurrency/ranges) and enables additional full-detection call sites. Default: `DEFAULT`.

`DD_IAST_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `false`<br>
IAST: controls IAST product activation. `true`/`1` fully enables IAST; `inactive` applies instrumentation but keeps logic inactive so it can be toggled via remote config; any other value fully disables IAST. Default: false.

`DD_IAST_EXPERIMENTAL_PROPAGATION_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
IAST: enables experimental taint-propagation call sites for additional `String` operations (for example, `String.replace*`). Default: false.

`DD_IAST_HARDCODED_SECRET_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
IAST: enables hardcoded secret detection instrumentation (registers hardcoded-secret listener/call sites). Default: true.

`DD_IAST_MAX_CONCURRENT_REQUESTS`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `4`<br>
IAST: maximum number of concurrent requests that can be analyzed (overhead control). Only used in `DEFAULT` detection mode; in `FULL` detection mode this is unlimited. Default (in `DEFAULT` mode): 4.

`DD_IAST_MAX_RANGE_COUNT`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `10`<br>
IAST: maximum number of tainted ranges stored per tainted object/value. If more ranges are produced, they are truncated to this limit. Only used in `DEFAULT` detection mode; in `FULL` detection mode this is unlimited. Default (in `DEFAULT` mode): 10.

`DD_IAST_REQUEST_SAMPLING`
: **Since**: 1.54.0 <br>
**Type**: `decimal`<br>
**Default**: `33.0`<br>
IAST: request sampling percentage for analysis (overhead control). Used by the IAST overhead controller to decide which requests are analyzed. Values <= 0 are treated as 100% (it does not disable IAST). In `FULL` detection mode the sampling is forced to 100%. Default (in `DEFAULT` mode): 33%.

`DD_IAST_SECURITY_CONTROLS_CONFIGURATION`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
IAST: configures custom security controls (sanitizers / input validators) via a semicolon-separated configuration string. When set, the tracer installs a transformer that instruments the specified classes/methods so IAST can mark data as validated/sanitized for specific vulnerability types.

`DD_IAST_SOURCE_MAPPING_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
IAST: enables source mapping via SMAP/stratum information so IAST can map bytecode locations (class + line) back to original source file and line (for example for JSP-generated classes). When disabled, the source mapper is not available.

`DD_IAST_SOURCE_MAPPING_MAX_SIZE`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `1000`<br>
IAST: maximum number of classes for which SMAP/stratum source mappings are stored. Once this limit is reached, the tracer stops analyzing additional classes for source mapping to cap memory usage. Default: 1000.

`DD_IAST_STACKTRACE_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
IAST (deprecated): alias for `DD_IAST_STACK_TRACE_ENABLED`. When enabled, the tracer captures a user-code stack trace and attaches it to IAST vulnerability reports (via a stack id).

`DD_IAST_STACKTRACE_LEAK_SUPPRESS`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
IAST (deprecated): alias for `DD_IAST_STACK_TRACE_LEAK_SUPPRESS`. When enabled and IAST is fully enabled, suppresses stack trace leaks in Tomcat error pages by replacing the error report with a safe template instead of rendering the original stack trace. Default: false.

`DD_IAST_STACK_TRACE_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_IAST_STACKTRACE_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `true`<br>
IAST: when enabled (default), captures a user-code stack trace and attaches it to IAST vulnerability reports (via a stack id). Useful for locating where vulnerable code executed. This also accepts the deprecated alias `DD_IAST_STACKTRACE_ENABLED`.

`DD_IAST_STACK_TRACE_LEAK_SUPPRESS`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_IAST_STACKTRACE_LEAK_SUPPRESS`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
IAST: when enabled and IAST is fully enabled, suppresses stack trace leaks in Tomcat error pages by replacing the error report with a safe template instead of rendering the original stack trace. This also accepts the deprecated alias `DD_IAST_STACKTRACE_LEAK_SUPPRESS`. Default: false.

`DD_IAST_TELEMETRY_VERBOSITY`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `INFORMATION`<br>
IAST: controls IAST telemetry verbosity (`OFF`, `MANDATORY`, `INFORMATION`, `DEBUG`). When tracer telemetry is disabled, this is forced to `OFF`. Default: `INFORMATION`.

`DD_IAST_TRUNCATION_MAX_VALUE_LENGTH`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `250`<br>
Default value is 250

`DD_IAST_VULNERABILITIES_PER_REQUEST`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `2`<br>
IAST: maximum number of vulnerabilities that can be reported per request (quota/overhead control). In `FULL` detection mode this limit is removed; in `DEFAULT` detection mode the default is 2.

`DD_IAST_WEAK_CIPHER_ALGORITHMS`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
IAST: regular expression (matched against the uppercased cipher algorithm id) that defines which cipher algorithms are considered weak. When a used cipher algorithm matches this pattern, IAST reports a `WEAK_CIPHER` vulnerability.

`DD_IAST_WEAK_HASH_ALGORITHMS`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `["SHA1", "SHA-1", "MD2", "RIPEMD128", "MD4", "MD5"]`<br>
IAST: comma-separated set of hash algorithm ids considered weak (compared against the uppercased algorithm id). When a used hashing algorithm is in this set, IAST reports a `WEAK_HASH` vulnerability (for example for `MD5` or `SHA1`).

`DD_ID_GENERATION_STRATEGY`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Tracer: selects the trace/span id generation strategy (for example `RANDOM`, `SECURE_RANDOM`, `SEQUENTIAL`). Unknown values fall back to `RANDOM`, and non-random strategies emit a warning because they can impact trace correctness. Default: `RANDOM`.

`DD_IGNITE_CACHE_INCLUDE_KEYS`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Ignite: when enabled, includes the cache key as a span tag (`ignite.cache.key`) on Ignite cache spans. Default: false.

`DD_INJECTION_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Single Step Instrumentation (SSI): marker/metadata indicating the tracer was injected by SSI (and potentially which components were injected). When present, the bootstrap sets the instrumentation source to `ssi`, and other subsystems may use the value (for example, profiling treats it as injected when it contains `profiler`).

`DD_INJECT_FORCE`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Single Step Instrumentation (SSI): forces the tracer javaagent to load even when multiple JVM agents are detected. This bypasses SSI guardrails that would otherwise abort startup to avoid running multiple agents. Can be set via `DD_INJECT_FORCE` or system property `dd.inject.force`. Default: false.

`DD_INSTRUMENTATION_CONFIG_ID`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `""`<br>
Telemetry metadata: instrumentation configuration id. When set, it is propagated in the tracer telemetry as a configuration entry named `instrumentation_config_id`, allowing correlation to the configuration/injection that produced this tracer setup. Default: empty string.

`DD_INSTRUMENTATION_INSTALL_ID`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Sets the install ID included in instrumentation telemetry payloads and headers. This can be used to correlate telemetry to a specific installation.

`DD_INSTRUMENTATION_INSTALL_TIME`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Sets the install time included in instrumentation telemetry payloads and headers.

`DD_INSTRUMENTATION_INSTALL_TYPE`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Sets the install type included in instrumentation telemetry payloads and headers.

`DD_INSTRUMENTATION_SOURCE`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `manual`<br>
Telemetry/metadata: indicates how the tracer was installed (for example `manual`, `ssi`, `cmd_line`). The bootstrap may set this automatically for injected installs. Default: `manual`.

`DD_INSTRUMENTATION_TELEMETRY_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Datadog may collect environmental and diagnostic information about your system to improve the product. When false, this telemetry data will not be collected. **Default**: true

`DD_INTEGRATIONS_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Tracer: global toggle for automatic instrumentation integrations. When disabled, integrations are not enabled by default (effectively disabling auto-instrumentation unless explicitly enabled). Default: true.

`DD_INTEGRATION_JUNIT_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
CI Visibility (legacy): backward-compatible toggle that enables CI Visibility when set to `true` (legacy `dd.integration.junit.enabled` / `DD_INTEGRATION_JUNIT_ENABLED`). Prefer using `DD_CIVISIBILITY_ENABLED` instead.

`DD_INTEGRATION_SYNAPSE_LEGACY_OPERATION_NAME`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Synapse integration: when enabled, uses the legacy server span operation name `http.request` instead of the newer Synapse-specific operation name. Default: false.

`DD_INTEGRATION_TESTNG_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
CI Visibility (legacy): backward-compatible toggle that enables CI Visibility when set to `true` (legacy `dd.integration.testng.enabled` / `DD_INTEGRATION_TESTNG_ENABLED`). Prefer using `DD_CIVISIBILITY_ENABLED` instead.

`DD_JDK_SOCKET_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enable native JDK support for Unix Domain Sockets.

`DD_JMS_PROPAGATION_DISABLED_QUEUES`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
JMS: comma-separated list of queue names for which trace-context propagation is disabled (no header injection/extraction). Useful for mixed environments or when propagation should be avoided for specific destinations.

`DD_JMS_PROPAGATION_DISABLED_TOPICS`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
JMS: comma-separated list of topic names for which trace-context propagation is disabled (no header injection/extraction). Useful for mixed environments or when propagation should be avoided for specific destinations.

`DD_JMS_PROPAGATION_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: N/A<br>
**Default**: N/A<br>
No description available.

`DD_JMS_UNACKNOWLEDGED_MAX_AGE`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `3600`<br>
JMS: maximum age (in seconds) of the oldest unacknowledged message span in client-acknowledge sessions before the tracer implicitly finishes the captured spans, preventing unbounded accumulation. Default: 3600.

`DD_JMXFETCH_CHECK_PERIOD`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: N/A<br>
How often to send JMX metrics (in ms).

`DD_JMXFETCH_CONFIG`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Additional metrics configuration file for JMX metrics collection. The Java Agent looks for `jvm_direct:true` in the `instance` section in the `yaml` file to change configuration.

`DD_JMXFETCH_CONFIG_DIR`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Additional configuration directory for JMX metrics collection. The Java Agent looks for `jvm_direct:true` in the `instance` section in the `yaml` file to change configuration.

`DD_JMXFETCH_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enable collection of JMX metrics by Java Tracing Agent.

`DD_JMXFETCH_INITIAL_REFRESH_BEANS_PERIOD`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: N/A<br>
JMXFetch: sets the initial beans refresh period passed to JMXFetch (controls how often it refreshes the list of MBeans during the initial phase). If unset, JMXFetch uses its default behavior.

`DD_JMXFETCH_METRICS_CONFIGS`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
JMXFetch (deprecated): comma-separated list of additional metric config YAML files to load (passed to JMXFetch as metric config files).

`DD_JMXFETCH_MULTIPLE_RUNTIME_SERVICES_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
JMXFetch/runtime metrics: when enabled, collects service names from entry traces and supplies them to JMXFetch so runtime metrics can be reported for multiple services (up to the configured limit). Default: false.

`DD_JMXFETCH_MULTIPLE_RUNTIME_SERVICES_LIMIT`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `10`<br>
JMXFetch/runtime metrics: maximum number of distinct service names to track/report when multiple-runtime-services is enabled. Default: 10.

`DD_JMXFETCH_REFRESH_BEANS_PERIOD`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: N/A<br>
How often to refresh list of available JMX beans (in seconds).

`DD_JMXFETCH_START_DELAY`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
JMXFetch/JMX initialization: delay (in seconds) before starting the JMX subsystem (used by JMXFetch and other features that require JMX). Default: 15.

`DD_JMXFETCH_STATSD_HOST`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_DOGSTATSD_HOST`<br>
**Type**: `string`<br>
**Default**: N/A<br>
Override the address of the trace Agent host that the default tracer attempts to submit DogStatsD metrics to. Use `DD_AGENT_HOST` to override `DD_DOGSTATSD_HOST`.

`DD_JMXFETCH_STATSD_PORT`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_DOGSTATSD_PORT`<br>
**Type**: `int`<br>
**Default**: N/A<br>
Overrides the default trace Agent port for DogStatsD metric submission. If the Agent configuration sets `dogstatsd_port` or `DD_DOGSTATSD_PORT` to something other than the default `8125`, then the library configuration `DD_DOGSTATSD_PORT` must match it.

`DD_KAFKA_CLIENT_BASE64_DECODING_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Kafka client propagation: when enabled, base64-decodes Kafka header values before extracting trace context (helps when header values are base64-mangled). Default: false.

`DD_KAFKA_CLIENT_PROPAGATION_DISABLED_TOPICS`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Kafka client propagation: comma-separated list of topic names for which trace-context propagation is disabled (no header injection/extraction). Useful for mixed client environments or to avoid propagation for specific topics.

`DD_KAFKA_CLIENT_PROPAGATION_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: N/A<br>
**Default**: N/A<br>
No description available.

`DD_KAFKA_PROPAGATION_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: N/A<br>
**Default**: N/A<br>
No description available.

`DD_LLMOBS_AGENTLESS_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Optional - _integer or string_ - **default**: `false` Only required if you are not using the Datadog Agent, in which case this should be set to `1` or `true`.

`DD_LLMOBS_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Toggle to enable submitting data to LLM Observability

`DD_LLMOBS_ML_APP`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Sets the default ML app name used for LLM Observability data. This value is required when LLM Observability is enabled.

`DD_LOGS_INJECTION`
: **Since**: 1.54 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
**Supported Input**: Boolean (`true`/`false`) **Caveats**: Not supported in C++ or Go. **Description**: Enables or disables the automatic injection of trace context (trace ID, span ID) into JSON/structured application logs. This allows for correlation between traces and logs.

`DD_LOGS_INJECTION_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_LOGS_INJECTION`<br>
**Type**: `boolean`<br>
**Default**: `true`<br>
**Supported Input**: Boolean (`true`/`false`) **Caveats**: Not supported in C++ or Go. **Description**: Enables or disables the automatic injection of trace context (trace ID, span ID) into JSON/structured application logs. This allows for correlation between traces and logs.

`DD_LOG_FORMAT_JSON`
: **Since**: 1.58.0 <br>
**Type**: `boolean`<br>
**Default**: N/A<br>
Set to 'true' to output logs in JSON format

`DD_LOG_LEVEL`
: **Type**: `string`<br>
**Default**: N/A<br>
Sets the Datadog Agent logging level. Valid values are trace, debug, info, warn, error, critical, or off.

`DD_MEASURE_METHODS`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `""`<br>
Tracing: list of method patterns to mark spans as `measured`. Spans created from matching methods will have `measured=true` which affects how they are included in tracer metrics/stats. Format is the same as `DD_TRACE_METHODS`. Default: empty.

`DD_MESSAGE_BROKER_SPLIT_BY_DESTINATION`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Messaging: when enabled, uses the destination (topic/queue) as the service name for message broker spans (for example time-in-queue spans), effectively splitting services by destination. Default: false.

`DD_OBFUSCATION_QUERY_STRING_REGEXP`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
HTTP query string obfuscation (legacy alias for `DD_TRACE_OBFUSCATION_QUERY_STRING_REGEXP`): regular expression used to redact sensitive values in the `http.query` tag (and the query portion of `http.url`). `null` uses a built-in default pattern; an empty string disables query obfuscation. Matches are replaced with `<redacted>`.

`DD_OPTIMIZED_MAP_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables the optimized `TagMap` implementation used for storing span tags. When disabled, the tracer uses the legacy tag-map implementation. Default: true.

`DD_OTLP_METRICS_ENDPOINT`
: **Since**: 1.56.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Internal equivalent of OTEL_EXPORTER_OTLP_METRICS_ENDPOINT

`DD_OTLP_METRICS_HEADERS`
: **Since**: 1.56.0 <br>
**Type**: `map`<br>
**Default**: N/A<br>
OTLP metrics export: additional headers to send with OTLP metrics requests, encoded as comma-separated `key=value` pairs (for example `api-key=...`). Parsed into a map and combined with `OTEL_EXPORTER_OTLP_METRICS_HEADERS` when OpenTelemetry metrics is enabled. Default: empty.

`DD_OTLP_METRICS_PROTOCOL`
: **Since**: 1.56.0 <br>
**Type**: `string`<br>
**Default**: `HTTP_PROTOBUF`<br>
Internal equivalent of OTEL_EXPORTER_OTLP_METRICS_PROTOCOL

`DD_OTLP_METRICS_TEMPORALITY_PREFERENCE`
: **Since**: 1.56.0 <br>
**Type**: `string`<br>
**Default**: `DELTA`<br>
Internal equivalent of OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE

`DD_OTLP_METRICS_TIMEOUT`
: **Since**: 1.56.0 <br>
**Type**: `int`<br>
**Default**: `7500`<br>
Internal equivalent of OTEL_EXPORTER_OTLP_METRICS_TIMEOUT

`DD_PIPELINE_EXECUTION_ID`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Sets the pipeline execution ID reported as CI metadata for AWS CodePipeline builds. This value is used as the CI pipeline identifier when running a CodeBuild job initiated by CodePipeline.

`DD_PRIMARY_TAG`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Primary tag value used in base-hash calculation and included in Data Streams Monitoring payloads (field `PrimaryTag`). Changing it affects the computed base hash and DSM aggregation. Often used as an extra global dimension (for example, a region).

`DD_PRIORITIZATION_TYPE`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `FAST_LANE`<br>
Trace writer prioritization strategy (`FastLane` / `EnsureTrace`). `FastLane` (default) drops traces under backpressure; `EnsureTrace` blocks to ensure "kept" traces are enqueued (not recommended for production).

`DD_PRIORITY_SAMPLING`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
**INI**: `datadog.priority_sampling` Whether to enable priority sampling.

`DD_PRIORITY_SAMPLING_FORCE`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Trace sampling: forces the priority sampling decision when priority sampling is enabled. Set to `KEEP` to force `SAMPLER_KEEP`, or `DROP` to force `SAMPLER_DROP`; otherwise the tracer uses normal rate-by-service sampling. Default: unset.

`DD_PROPAGATION_EXTRACT_LOG_HEADER_NAMES_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Tracing propagation: when enabled, logs (debug level) the names of incoming HTTP headers as they are processed by propagation extractors (useful for troubleshooting header-based context propagation). Default: false.

`DD_PROPAGATION_STYLE_EXTRACT`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `""`<br>
A comma-separated list of header formats from which to attempt to extract distributed tracing propagation data. The first format found with complete and valid headers is used to define the trace to continue. Deprecated since version 1.9.0

`DD_PROPAGATION_STYLE_INJECT`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `""`<br>
A comma-separated list of header formats to include to propagate distributed traces between services. Deprecated since version 1.9.0

`DD_PROXY_NO_PROXY`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Configuration key to set a list of hosts that should bypass the proxy. The list is space-separated.

`DD_RABBITMQ_PROPAGATION_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: N/A<br>
**Default**: N/A<br>
No description available.

`DD_RABBIT_INCLUDE_ROUTINGKEY_IN_RESOURCE`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
RabbitMQ AMQP instrumentation: when enabled, includes the routing key in the span resource name for `basic.publish` (formats as `basic.publish <exchange> -> <routingKey>`). Default: true.

`DD_RABBIT_PROPAGATION_DISABLED_EXCHANGES`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
RabbitMQ AMQP instrumentation: list of exchange names for which trace context propagation should be disabled (no header injection/extraction).

`DD_RABBIT_PROPAGATION_DISABLED_QUEUES`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
RabbitMQ AMQP instrumentation: list of queue names for which trace context propagation should be disabled (no header injection/extraction).

`DD_RABBIT_PROPAGATION_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: N/A<br>
**Default**: N/A<br>
No description available.

`DD_RC_TARGETS_KEY`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `e3f1f98c9da02a93bb547f448b472d727e14b22455235796fe49863856252508`<br>
Remote Config: public key (hex-encoded Ed25519) used to verify signatures of Remote Config TUF targets metadata (`targets.json`). Default is the Datadog-provided key.

`DD_RC_TARGETS_KEY_ID`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `5c4ece41241a1bb513f6e3e5df74ab7d5183dfffbd71bfd43127920d880569fd`<br>
Remote Config: key id (hex string) corresponding to `DD_RC_TARGETS_KEY` (used to select/identify the key when verifying Remote Config targets metadata). Default is the Datadog-provided key id.

`DD_RESILIENCE4J_MEASURED_ENABLED`
: **Since**: 1.55.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Resilience4j instrumentation: when enabled, marks Resilience4j spans as `measured` to ensure they contribute to stats/metrics. Default: false.

`DD_RESILIENCE4J_TAG_METRICS_ENABLED`
: **Since**: 1.55.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Resilience4j instrumentation: when enabled, adds Resilience4j metrics as span tags (for example retry/circuit-breaker metrics). Default: false.

`DD_RESOLVER_CACHE_CONFIG`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `MEMOS`<br>
Type resolver: named preset controlling internal resolver cache sizes/policies (for example `MEMOS`, `LARGE`, `SMALL`, `LEGACY`). Default: `MEMOS`.

`DD_RESOLVER_CACHE_DIR`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Type resolver: directory path used for resolver cache storage (when applicable). Default: unset.

`DD_RESOLVER_NAMES_ARE_UNIQUE`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Type resolver: hints that class/resource names are unique in the classpath; enables resolver optimizations relying on uniqueness. Default: false.

`DD_RESOLVER_RESET_INTERVAL`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `300`<br>
Type resolver: interval in seconds between resolver cache resets/cleanup. Default: 300s. (Disabled in native-image builder mode.)

`DD_RESOLVER_SIMPLE_METHOD_GRAPH`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Type resolver: uses a simpler method graph for resolution/matching. Default: true except in native-image builder mode (where it defaults to false due to reachability analysis impact).

`DD_RESOLVER_USE_LOADCLASS`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Type resolver: enables fallback to using `ClassLoader.loadClass(...)` during type resolution when a class file cannot be located via resource lookup. Default: true.

`DD_RESOLVER_USE_URL_CACHES`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: N/A<br>
Type resolver: when set, forces `URLConnection#setUseCaches(...)` to the provided boolean while reading class files via `ClassLoader.getResource(...)`. If unset, leaves the JVM default URL caching behavior unchanged.

`DD_RUM_APPLICATION_ID`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
RUM injection: Datadog RUM application id used in the injected browser SDK snippet. Must be non-empty when RUM injection is enabled.

`DD_RUM_CLIENT_TOKEN`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
RUM injection: Datadog RUM client token used in the injected browser SDK snippet. Must be non-empty when RUM injection is enabled.

`DD_RUM_DEFAULT_PRIVACY_LEVEL`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
RUM injection: default privacy level for browser data collection (values: `allow`, `mask`, `mask-user-input`), passed to the injected browser SDK init config.

`DD_RUM_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables RUM browser SDK injection into HTML responses (injects the Datadog RUM snippet before `</head>` when using supported servlet instrumentations). Note: injection only happens if the RUM config is valid (application id + client token, and either remote configuration id or both session sample rates). Default: false.

`DD_RUM_ENVIRONMENT`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
RUM injection: optional environment (e.g. `prod`, `staging`) included in the injected browser SDK init config.

`DD_RUM_MAJOR_VERSION`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `6`<br>
RUM injection: major version of the Datadog browser RUM SDK to load (supported: 5 or 6). Default: 6.

`DD_RUM_REMOTE_CONFIGURATION_ID`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
RUM injection: remote configuration identifier included in the injected browser SDK init config. If not set, both `DD_RUM_SESSION_SAMPLE_RATE` and `DD_RUM_SESSION_REPLAY_SAMPLE_RATE` must be provided.

`DD_RUM_SERVICE`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
RUM injection: optional service name included in the injected browser SDK init config.

`DD_RUM_SESSION_REPLAY_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Type**: `decimal`<br>
**Default**: `0.0`<br>
RUM injection: percentage of tracked sessions that include Session Replay data (0.0-100.0) in the injected browser SDK init config. Must be set together with `DD_RUM_SESSION_SAMPLE_RATE` if `DD_RUM_REMOTE_CONFIGURATION_ID` is not set.

`DD_RUM_SESSION_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Type**: `decimal`<br>
**Default**: `0.0`<br>
RUM injection: percentage of user sessions to track (0.0-100.0) in the injected browser SDK init config. Must be set together with `DD_RUM_SESSION_REPLAY_SAMPLE_RATE` if `DD_RUM_REMOTE_CONFIGURATION_ID` is not set.

`DD_RUM_SITE`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
RUM injection: Datadog site (e.g. `datadoghq.com`, `datadoghq.eu`) used to choose where the injected browser SDK sends data / which CDN URL to load. Defaults to `datadoghq.com` and is validated against an allowlist.

`DD_RUM_TRACK_LONG_TASKS`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
RUM injection: when set, enables/disables collection of long task events in the injected browser SDK init config.

`DD_RUM_TRACK_RESOURCES`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
RUM injection: when set, enables/disables collection of resource events (for example loading images/scripts) in the injected browser SDK init config.

`DD_RUM_TRACK_USER_INTERACTION`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
RUM injection: when set, enables/disables automatic collection of user interaction events (for example clicks) in the injected browser SDK init config.

`DD_RUM_VERSION`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
RUM injection: optional service version included in the injected browser SDK init config.

`DD_RUNTIME_ID_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_RUNTIME_METRICS_RUNTIME_ID_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `true`<br>
**Description**: Enables enhanced runtime metrics, providing a `runtime_id` tag along with every metric. The `runtime_id` represents the application's process identifier and allows you to directly correlate runtime metrics with individual running applications.

`DD_SERVICE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_SERVICE_NAME`<br>
**Type**: `string`<br>
**Default**: N/A<br>
Default service name for the application. Used as the service name for top-level spans, and used to determine the service name of some child spans.

`DD_SERVICE_MAPPING`
: **Since**: 1.54.0 <br>
**Type**: `map`<br>
**Default**: N/A<br>
Define service name mappings to allow renaming services in traces, for example: `postgres:postgresql,defaultdb:postgresql`. Available in version 0.47+.

`DD_SERVICE_NAME`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Sets the tracer service name (`service.name`) used as the default service for traces/spans. Default: `unnamed-java-app`.

`DD_SERVICE_NAME_SET_BY_USER`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Controls whether the configured service name should be treated as user-provided. When true, the tracer prioritizes `DD_SERVICE`/`DD_SERVICE_NAME` over `DD_TAGS` (it removes the `service` tag from tags config to avoid overriding the service name). Default: true.

`DD_SITE`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `datadoghq.com`<br>
Sets the site domain used to build agentless intake URLs. If unset, a default site is used.

`DD_SPAN_BUILDER_REUSE_ENABLED`
: **Since**: 1.55.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables SpanBuilder reuse to reduce memory allocation

`DD_SPAN_SAMPLING_RULES`
: **Since**: 1.54 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Span sampling: JSON rules used to decide per-span sampling priority (single-span sampling). If both `DD_SPAN_SAMPLING_RULES` and `DD_SPAN_SAMPLING_RULES_FILE` are set, the file setting is ignored. Rules can match spans by service/name and apply a sample rate and optional max-per-second limit.

`DD_SPAN_SAMPLING_RULES_FILE`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Points to a JSON file that contains the span sampling rules. DD_SPAN_SAMPLING_RULES takes precedence over this variable. See DD_SPAN_SAMPLING_RULES for the rule format.

`DD_SPARK_APP_NAME_AS_SERVICE`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Spark instrumentation: when enabled, uses the Spark application name (`spark.app.name`) as the Datadog service name for Spark spans (unless running on Databricks or a user-defined service name is set). Default: false.

`DD_SPARK_TASK_HISTOGRAM_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Spark instrumentation: when enabled, computes and reports histogram-based task metrics (p50/max skew, and distributions for task runtime / bytes read/written / shuffle / spilled bytes) on Spark stage spans. Default: true.

`DD_SPRING_DATA_REPOSITORY_INTERFACE_RESOURCE_NAME`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Spring Data instrumentation: when enabled, uses the repository interface + method for span resource names (more specific naming). When disabled, uses only the method name. Default: true.

`DD_SQS_PROPAGATION_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: N/A<br>
**Default**: N/A<br>
No description available.

`DD_STACK_TRACE_LENGTH_LIMIT`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `2147483647`<br>
Maximum size (in characters) of error stack traces stored on spans (the `error.stack` tag). When exceeded, the tracer abbreviates/truncates the stack trace to fit. Default: unlimited (except in CI Visibility where it defaults to 5000).

`DD_STATSD_CLIENT_QUEUE_SIZE`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: N/A<br>
DogStatsD client (metrics to the Datadog Agent): override the internal StatsD client's queue size (number of buffered metrics). If unset, uses the client's default.

`DD_STATSD_CLIENT_SOCKET_BUFFER`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: N/A<br>
DogStatsD client (metrics to the Datadog Agent): socket buffer size for the internal StatsD client (used when sending via Unix Domain Socket). If unset, uses the client's default.

`DD_STATSD_CLIENT_SOCKET_TIMEOUT`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: N/A<br>
DogStatsD client (metrics to the Datadog Agent): socket timeout for the internal StatsD client (used when sending via Unix Domain Socket). If unset, uses the client's default.

`DD_SYMBOL_DATABASE_COMPRESSED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Symbol Database (SymDB): when enabled, compresses symbol payloads with gzip before uploading. Default: true.

`DD_SYMBOL_DATABASE_FLUSH_THRESHOLD`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `100`<br>
Symbol Database (SymDB): flush threshold (number of classes) used by the symbol aggregator before uploading a batch. Default: 100.

`DD_SYMBOL_DATABASE_UPLOAD_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Symbol Database (SymDB): enables uploading symbol information (for Live Debugging / Dynamic Instrumentation). Default: true.

`DD_TAGS`
: **Since**: 1.54.0 <br>
**Type**: `map`<br>
**Default**: `""`<br>
Custom tags applied to traces profiles and metrics, provided as comma-separated key:value pairs (e.g. `layer:api,team:intake`).

`DD_TAG_NAME_UTF8_CACHE_SIZE`
: **Since**: 1.55.0 <br>
**Type**: `int`<br>
**Default**: `128`<br>
Trace serialization: size of the UTF-8 encoding cache for tag names (0 disables the cache). Default: 128.

`DD_TAG_VALUE_UTF8_CACHE_SIZE`
: **Since**: 1.55.0 <br>
**Type**: `int`<br>
**Default**: `384`<br>
Trace serialization: size of the UTF-8 encoding cache for tag values (0 disables the cache). Default: 384.

`DD_TELEMETRY_DEBUG_REQUESTS_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Telemetry: when enabled, telemetry requests run in debug mode (adds extra logging / debugging for telemetry traffic). Default: false.

`DD_TELEMETRY_DEPENDENCY_COLLECTION_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Telemetry: enables the dependency collection service that detects application dependencies via classloading and reports them. Default: true.

`DD_TELEMETRY_DEPENDENCY_RESOLUTION_PERIOD_MILLIS`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `1000`<br>
Telemetry dependency collection: how often (in milliseconds) the dependency resolver runs to resolve one queued dependency location. Default: 1000ms.

`DD_TELEMETRY_DEPENDENCY_RESOLUTION_QUEUE_SIZE`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `100000`<br>
Telemetry dependency collection: maximum number of unique dependency locations to queue for resolution. When the limit is reached, dependency resolution is disabled and additional dependencies are dropped. Default: 100000.

`DD_TELEMETRY_EXTENDED_HEARTBEAT_INTERVAL`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `86400`<br>
Telemetry: extended heartbeat interval in seconds (used as an additional, longer reporting cadence alongside the regular heartbeat). Default: 86400s (24h).

`DD_TELEMETRY_FORWARDER_MAX_TAGS`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `0`<br>
Bootstrap initialization telemetry: maximum number of tags forwarded for error causes when sending activation telemetry through the forwarder. Default: 5.

`DD_TELEMETRY_FORWARDER_PATH`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Bootstrap initialization telemetry: path to an executable used to forward tracer activation telemetry as JSON. If unset, bootstrap initialization telemetry is disabled (no forwarding).

`DD_TELEMETRY_HEARTBEAT_INTERVAL`
: **Since**: 1.54 <br>
**Type**: `decimal`<br>
**Default**: `60.0`<br>
Sets the interval for the telemetry status heartbeat (in seconds)

`DD_TELEMETRY_LOG_COLLECTION_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
**Default**: true : Enable or disable log collection for telemetry.

`DD_TELEMETRY_METRICS_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Controls whether instrumentation telemetry sends internal metrics. Defaults to true.

`DD_TELEMETRY_METRICS_INTERVAL`
: **Since**: 1.54.0 <br>
**Type**: `decimal`<br>
**Default**: `10.0`<br>
Telemetry: interval (in seconds) at which telemetry metrics are collected/sent. Must be in range 0.1-3600. Default: 10s.

`DD_TEST_FAILED_TEST_REPLAY_ENABLED`
: **Since**: 1.55.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
CI Visibility: enables the Failed Test Replay feature (kill-switch). When enabled in execution settings, the tracer enables exception replay debugging during test execution to capture data for failed-test replay. Default: true (still requires backend/remote settings to enable).

`DD_TEST_SESSION_NAME`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
If `DD_TEST_SESSION_NAME` is not specified, the default value used is a combination of the:

`DD_THIRD_PARTY_DETECTION_EXCLUDES`
: **Since**: 1.56.0 <br>
**Type**: `array`<br>
**Default**: `[]`<br>
Alias of `DD_THIRD_PARTY_EXCLUDES`. Live Debugging / Exception Replay: package prefixes to treat as first-party (exclude from the third-party library filter). This allowlist overrides the default third-party library list.

`DD_THIRD_PARTY_DETECTION_INCLUDES`
: **Since**: 1.56.0 <br>
**Type**: `array`<br>
**Default**: `[]`<br>
Comma-separated list of libraries to include in third-party detection. Default value is empty.

`DD_THIRD_PARTY_EXCLUDES`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_THIRD_PARTY_DETECTION_EXCLUDES`<br>
**Type**: `array`<br>
**Default**: `[]`<br>
Live Debugging / Exception Replay: package prefixes to treat as first-party (exclude from the third-party library filter). This allowlist overrides the default third-party library list used for class filtering.

`DD_THIRD_PARTY_INCLUDES`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_THIRD_PARTY_DETECTION_INCLUDES`<br>
**Type**: `array`<br>
**Default**: `[]`<br>
Live Debugging / Exception Replay: additional package prefixes to treat as third-party libraries (added to the default list from `third_party_libraries.json`).

`DD_THIRD_PARTY_SHADING_IDENTIFIERS`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Live Debugging / Exception Replay: additional package segments that indicate shaded/relocated dependencies (e.g., `shaded`, `shadow`). Used to detect and skip shaded prefixes when applying third-party include/exclude rules.

`DD_TRIAGE_REPORT_DIR`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `getProp("java.io.tmpdir")`<br>
Triage report directory: directory where the scheduled triage report (a tracer flare zip) is written when `DD_TRIAGE_REPORT_TRIGGER` is set. Default: `java.io.tmpdir`.

`DD_TRIAGE_REPORT_TRIGGER`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Triage report trigger: when set to a delay (parsed by `TimeUtils.parseSimpleDelay`, for example `3600s`), schedules generation of a triage report (tracer flare zip) after that delay. Setting this trigger also enables triage mode by default.

`DD_UNSAFE_CLASS_INJECTION`
: **Since**: 1.56.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Temporary internal flag in case we need to roll-back a new Java class-injection feature

`DD_USM_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Universal Service Monitoring (USM): when enabled, activates USM as a target system so USM-specific instrumentations/features can be installed by the Java tracer agent. Default: false.

`DD_VERSION`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `""`<br>
Set the application's version, for example: `1.2.3` or `6c44da20`.

`DD_VISITOR_CLASS_PARSING`
: **Since**: 1.56.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Temporary internal flag in case we need to roll-back a new Java class-parsing feature

`DD_WRITER_BAGGAGE_INJECT`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Baggage injection into outgoing span metadata: when enabled, includes baggage items as tags/metadata when serializing spans (combined with propagation tags); when disabled, only propagation tags are included. Default: true.

`DD_WRITER_TYPE`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `DDAgentWriter`<br>
Default value sends traces to the Agent. Configuring with `LoggingWriter` instead writes traces out to the console.
