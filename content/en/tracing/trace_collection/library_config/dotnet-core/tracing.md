### Tracing

`DD_TRACE_128_BIT_TRACEID_GENERATION_ENABLED`
: **Type**: `boolean`<br>
**Default**: `true`<br>
Controls whether new traces use 128-bit W3C trace IDs (32-character hexadecimal strings) or 64-bit Datadog trace IDs (16-character hexadecimal strings). The default is true to support W3C trace context propagation.

`DD_TRACE_128_BIT_TRACEID_LOGGING_ENABLED`
: **Type**: `boolean`<br>
**Default**: `true`<br>
Controls whether 128-bit trace IDs are logged in their full 32-character format or truncated to 16 characters. Set to false for compatibility with systems that expect the shorter format.

`DD_TRACE_<INTEGRATION_NAME>_ENABLED`
: **Type**: `boolean`<br>
**Default**: `true`<br>
Enables/disables instrumentations. When disabled, no span operations are not created for the specific instrumentation.
  
  Integrations:
  
  - DELAY_WCF_INSTRUMENTATION
  - HEADER_TAG_NORMALIZATION_FIX
  - KAFKA_CREATE_CONSUMER_SCOPE
  - ROUTE_TEMPLATE_RESOURCE_NAMES
  - WCF_RESOURCE_OBFUSCATION
  - WCF_WEB_HTTP_RESOURCE_NAMES

`DD_TRACE_ACTIVITY_LISTENER_ENABLED`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Configures OTel Traces APIs by enabling the activity listener.

`DD_TRACE_AGENT_ARGS`
: **Type**: `string`<br>
**Default**: N/A<br>
Azure App Services: extra command-line arguments for launching the external `trace-agent` process (whitespace/comma-separated). If unset, no extra args are passed.

`DD_TRACE_AGENT_PATH`
: **Type**: `string`<br>
**Default**: N/A<br>
Azure App Services: path to the external `trace-agent` executable to launch. If unset, the tracer will not start the external trace-agent process.

`DD_TRACE_AGENT_PORT`
: **Aliases**: `DATADOG_TRACE_AGENT_PORT`<br>
**Type**: `int`<br>
**Default**: `8126`<br>
The port of the Trace Agent that the tracer submits to. If the Agent configuration sets receiver_port or DD_APM_RECEIVER_PORT to something other than the default 8126, then DD_TRACE_AGENT_PORT or DD_TRACE_AGENT_URL must match it.

`DD_TRACE_AGENT_URL`
: **Type**: `string`<br>
**Default**: `http://localhost:8126`<br>
The URL for connecting the tracer to the Datadog agent. Valid URL schemas include http:// and unix:// (UNIX Domain Sockets). This value takes precedence over DD_AGENT_HOST and DD_TRACE_AGENT_PORT if set.

`DD_TRACE_ANALYTICS_ENABLED`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Enables Trace Analytics by default. When enabled for an integration, instrumentations set the `analytics.sample_rate` metric on spans (using the configured per-integration sample rate). Default: false.

`DD_TRACE_AWS_ADD_SPAN_POINTERS`
: **Type**: `boolean`<br>
**Default**: `true`<br>
Enables or disables span pointers on AWS requests. Default value is true

`DD_TRACE_AZURE_EVENTHUBS_BATCH_LINKS_ENABLED`
: **Type**: `boolean`<br>
**Default**: `true`<br>
Enables instrumentation for azure eventhubs batch links. When disabled, spans for azure eventhubs batch links operations are not created.

`DD_TRACE_AZURE_SERVICEBUS_BATCH_LINKS_ENABLED`
: **Type**: `boolean`<br>
**Default**: `true`<br>
Enables instrumentation for azure servicebus batch links. When disabled, spans for azure servicebus batch links operations are not created.

`DD_TRACE_BAGGAGE_MAX_BYTES`
: **Type**: `int`<br>
**Default**: `8192`<br>
Configuration key to set the maximum number of bytes that can be injected into the baggage header when propagating to a downstream service. Default value is 8192 bytes.

`DD_TRACE_BAGGAGE_MAX_ITEMS`
: **Type**: `int`<br>
**Default**: `64`<br>
Configuration key to set the maximum number of items that can be injected into the baggage header when propagating to a downstream service. Default value is 64 items.

`DD_TRACE_BAGGAGE_TAG_KEYS`
: **Type**: `array`<br>
**Default**: `user.id, session.id, account.id`<br>
Comma-separated list of baggage keys to copy into span tags. Set to * to tag all baggage items; if unset, a default allowlist is used.

`DD_TRACE_BATCH_INTERVAL`
: **Type**: `int`<br>
**Default**: `100`<br>
Sets the batch interval in milliseconds for the serialization queue. Set to 0 to disable.

`DD_TRACE_BUFFER_SIZE`
: **Type**: `int`<br>
**Default**: `10485760`<br>
Internal dd-trace-dotnet span buffer configuration. Sets the size in bytes of the trace buffer.

`DD_TRACE_BYPASS_HTTP_REQUEST_URL_CACHING_ENABLED`
: **Type**: `boolean`<br>
**Default**: `false`<br>
When enabled, the request URL is built without using the cached HttpRequest.Url value to avoid triggering URL caching behavior. This can prevent issues in environments where caching the URL early can affect application behavior.

`DD_TRACE_CLIENT_IP_ENABLED`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Enables or disables the automatic collection of client IP addresses from HTTP request headers. When enabled, the IP address is stored in the http.client_ip span tag.

`DD_TRACE_CLIENT_IP_HEADER`
: **Aliases**: `DD_APPSEC_IPHEADER`<br>
**Type**: `string`<br>
**Default**: N/A<br>
Configures a custom header name from which to source the http.client_ip tag value. If this variable is set, all other IP-related headers are ignored (for example, setting DD_TRACE_CLIENT_IP_HEADER=custom-ip-header and including the header custom-ip-header: 5.6.7.9 in a request results in a span tagged with "http.client_ip": "5.6.7.9"). If an empty string or null value is passed, IP headers are queried in this order: - x-forwarded-for - x-real-ip - true-client-ip - x-client-ip - x-forwarded - forwarded-for - x-cluster-client-ip - fastly-client-ip - cf-connecting-ip - cf-connecting-ipv6

`DD_TRACE_COMMANDS_COLLECTION_ENABLED`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Controls whether command-line details are collected for process execution instrumentation. When enabled, the executable and arguments may be captured (truncated as needed); when disabled, command-line details are omitted.

`DD_TRACE_CONFIG_FILE`
: **Aliases**: `DD_DOTNET_TRACER_CONFIG_FILE`<br>
**Type**: `string`<br>
**Default**: `datadog.json`<br>
Path to the configuration file. Can only be set with an environment variable or in the app.config/web.config file.

`DD_TRACE_DATA_PIPELINE_ENABLED`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Use libdatadog data pipeline to send traces. Default value is false (disabled).

`DD_TRACE_DEBUG`
: **Aliases**: `OTEL_LOG_LEVEL`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enable debug logging in the tracer. Use OTEL_LOG_LEVEL as an alias

`DD_TRACE_DEBUG_LOOKUP_FALLBACK`
: **Type**: `boolean`<br>
**Default**: N/A<br>
Forces the automatic instrumentation to only use the fallback method lookup mechanism.

`DD_TRACE_DEBUG_LOOKUP_MDTOKEN`
: **Type**: `boolean`<br>
**Default**: N/A<br>
Forces the automatic instrumentation to only use the mdToken method lookup mechanism.

`DD_TRACE_DISABLED_ACTIVITY_SOURCES`
: **Type**: `string`<br>
**Default**: N/A<br>
Specifies a list of ActivitySource names (supports globbing) that will be disabled. Default is empty (all ActivitySources will be subscribed to by default). Disabling ActivitySources may break distributed tracing if those Activities are used to propagate trace context. Supports multiple values separated with commas. For example: "SomeGlob.*.PatternSource,Some.Specific.Source" When the tracer doesn't subscribe to an ActivitySource, we will NOT propagate the trace context from those Activities (we don't see them anymore). This means that distributed tracing flows that rely on these Activities for context propagation will break and cause disconnected traces. Potential impact on distributed tracing: Service A -> Ignored Activity -> Service B Creates a single trace with Service A as root and Service B as child Service A -> Disabled Activity -> Service B Creates TWO separate traces with Service A and Service B each as root spans

`DD_TRACE_DISABLED_ADONET_COMMAND_TYPES`
: **Type**: `string`<br>
**Default**: `InterceptableDbCommand,ProfiledDbCommand`<br>
Comma-separated list of ADO.NET CommandType names that should not have spans created for them. "InterceptableDbCommand" and "ProfiledDbCommand" are always disabled by default.

`DD_TRACE_ENABLED`
: **Type**: `boolean`<br>
**Default**: `true`<br>
**Default**: true Enable web framework and library instrumentation. When false, the application code doesn't generate any traces. See also DD_APM_TRACING_ENABLED.

`DD_TRACE_EXPAND_ROUTE_TEMPLATES_ENABLED`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Controls whether route parameters in ASP.NET and ASP.NET Core resource names should be expanded with their values. Only applies when route-template resource names are enabled.

`DD_TRACE_EXPERIMENTAL_FEATURES_ENABLED`
: **Type**: `string`<br>
**Default**: N/A<br>
Configuration key to enable experimental features.

`DD_TRACE_GIT_METADATA_ENABLED`
: **Type**: `boolean`<br>
**Default**: `true`<br>
Git metadata: when enabled, adds git repository URL and commit SHA tags to the root span (used for linking traces to source code). Default: true.

`DD_TRACE_GRAPHQL_ERROR_EXTENSIONS`
: **Type**: `array`<br>
**Default**: `""`<br>
Specifies which GraphQL error extensions to capture. A comma-separated list of extension keys to capture. Empty or not present means no extensions are captured.

`DD_TRACE_GRPC_TAGS`
: **Type**: `string`<br>
**Default**: N/A<br>
Maps GRPC metadata keys to tag names. Automatically applies GRPC metadata values as tags on traces.

`DD_TRACE_HEADER_TAGS`
: **Type**: `array`<br>
**Default**: `""`<br>
Automatically apply specified HTTP headers as span tags. If a custom tag name is not specified, the tag key defaults to http.request.headers. for request headers and http.response.headers. for response headers.

`DD_TRACE_HTTP_CLIENT_ERROR_STATUSES`
: **Aliases**: `DD_HTTP_CLIENT_ERROR_STATUSES`<br>
**Type**: `string`<br>
**Default**: `400-499`<br>
Comma-separated list of HTTP status codes and ranges to treat as errors for HTTP client spans (for example, 400-499,500). When set, matching responses mark the span as an error.

`DD_TRACE_HTTP_CLIENT_EXCLUDED_URL_SUBSTRINGS`
: **Type**: `string`<br>
**Default**: N/A<br>
Specifies which URLs are skipped by the tracer.

`DD_TRACE_HTTP_SERVER_ERROR_STATUSES`
: **Aliases**: `DD_HTTP_SERVER_ERROR_STATUSES`<br>
**Type**: `string`<br>
**Default**: `500-599`<br>
A range of errors can be accepted. By default 5xx status codes are reported as errors for http servers. This configuration overrides that. Ex. `dd.trace.http.server.error.statuses=500,502-599`

`DD_TRACE_INFERRED_PROXY_SERVICES_ENABLED`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Inferred proxy services: when enabled, registers the inferred-proxy propagator to extract `x-dd-proxy*` headers and start an inferred proxy span (currently supports `x-dd-proxy=aws-apigateway`) as a parent of the server span, using header values for service/resource/tags. Default: false.

`DD_TRACE_INJECT_CONTEXT_INTO_STORED_PROCEDURES_ENABLED`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Enables the injection of the Datadog trace context into stored procedures. Default value is false (disabled). When enabled, Datadog trace context will be injected into individual stored procedure calls when the following requirements are met: - The database is Microsoft SQL Server and TracerSettings.DbmPropagationMode is set to service or full. - The stored procedure call does not have Output, InputOutput, or Return ADO.NET command parameters.

`DD_TRACE_LOGFILE_RETENTION_DAYS`
: **Type**: `int`<br>
**Default**: `32`<br>
Sets the number of days after which log files are deleted based on their last write-time date.

`DD_TRACE_LOGGING_RATE`
: **Type**: `int`<br>
**Default**: `0`<br>
Sets the number of seconds between identical log messages for Tracer log files. Default value is 0 and setting to 0 disables rate limiting.

`DD_TRACE_LOG_DIRECTORY`
: **Type**: `string`<br>
**Default**: `/var/log/datadog/dotnet`<br>
Sets the directory for .NET Tracer logs. Overrides the value in Datadog.Trace.Configuration.ConfigurationKeys.TraceLogPath if present. Default value is "%ProgramData%"\Datadog .NET Tracer\logs\" on Windows or "/var/log/datadog/dotnet/" on Linux.

`DD_TRACE_LOG_PATH (Deprecated)`
: **Type**: `string`<br>
**Default**: N/A<br>
Deprecated, use DD_TRACE_LOG_DIRECTORY instead, and make sure it is a directory and not a file path

`DD_TRACE_LOG_SINKS`
: **Type**: `string`<br>
**Default**: `file`<br>
Specifies locations to write internal diagnostic logs. Currently only file is supported. Defaults to file.

`DD_TRACE_METHODS`
: **Type**: `string`<br>
**Default**: `""`<br>
Enables automatic instrumentation on specified methods. Default value is "" (disabled).

`DD_TRACE_METRICS_ENABLED`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Enables or disables internal metrics sent to DogStatsD. Default value is false (disabled).

`DD_TRACE_OBFUSCATION_QUERY_STRING_REGEXP`
: **Type**: `string`<br>
**Default**: `(?:(?:\"|%22)?)(?:(?:old[-_]?|new[-_]?)?p(?:ass)?w(?:or)?d(?:1|2)?|pass(?:[-_]?phrase)?|secret|(?:api[-_]?|private[-_]?|public[-_]?|access[-_]?|secret[-_]?|app(?:lication)?[-_]?)key(?:[-_]?id)?|token|consumer[-_]?(?:id|key|secret)|sign(?:ed|ature)?|auth(?:entication|orization)?)(?:(?:\\s|%20)*(?:=|%3D)[^&]+|(?:\"|%22)(?:\\s|%20)*(?::|%3A)(?:\\s|%20)*(?:\"|%22)(?:%2[^2]|%[^2]|[^\"%])+(?:\"|%22))|(?:bearer(?:\\s|%20)+[a-z0-9._\\-]+|token(?::|%3A)[a-z0-9]{13}|gh[opsu]_[0-9a-zA-Z]{36}|ey[I-L](?:[\\w=-]|%3D)+\\.ey[I-L](?:[\\w=-]|%3D)+(?:\\.(?:[\\w.+/=-]|%3D|%2F|%2B)+)?|-{5}BEGIN(?:[a-z\\s]|%20)+PRIVATE(?:\\s|%20)KEY-{5}[^\\-]+-{5}END(?:[a-z\\s]|%20)+PRIVATE(?:\\s|%20)KEY(?:-{5})?(?:\\n|%0A)?|(?:ssh-(?:rsa|dss)|ecdsa-[a-z0-9]+-[a-z0-9]+)(?:\\s|%20|%09)+(?:[a-z0-9/.+]|%2F|%5C|%2B){100,}(?:=|%3D)*(?:(?:\\s|%20|%09)+[a-z0-9._-]+)?)`<br>
Applies a regex to redact sensitive data from query strings on incoming HTTP requests. The default regex matches various sensitive data patterns, including passwords, tokens, API keys, private keys, and authorization terms. Matches are replaced with <redacted>. If an empty string is passed, no obfuscation occurs. The resulting value is reported in the http.url tag.

`DD_TRACE_OBFUSCATION_QUERY_STRING_REGEXP_TIMEOUT`
: **Type**: `decimal`<br>
**Default**: `200`<br>
Sets the timeout in milliseconds for the query string obfuscation regex execution. Default value is 200ms.

`DD_TRACE_OTEL_ENABLED`
: **Aliases**: `DD_TRACE_ACTIVITY_LISTENER_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
When true, OpenTelemetry-based tracing for custom instrumentation is enabled.

`DD_TRACE_PARTIAL_FLUSH_ENABLED`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Enables incrementally flushing large traces to the Datadog Agent, reducing the chance of rejection by the Agent. Use only when you have long-lived traces or traces with many spans.

`DD_TRACE_PARTIAL_FLUSH_MIN_SPANS`
: **Type**: `int`<br>
**Default**: `500`<br>
Number of spans before partially exporting a trace. This prevents keeping all the spans in memory for very large traces.

`DD_TRACE_PEER_SERVICE_DEFAULTS_ENABLED`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Peer service defaults (Naming Schema v0): when enabled, computes default `peer.service` values for eligible spans using the v1 peer-service default algorithm; when disabled (default), Naming Schema v0 does not compute peer.service defaults.

`DD_TRACE_PEER_SERVICE_MAPPING`
: **Type**: `map`<br>
**Default**: `""`<br>
Maps detected peer service names to normalized values before they are attached to spans.

`DD_TRACE_PIPE_NAME`
: **Type**: `string`<br>
**Default**: N/A<br>
Datadog Agent named pipe: sets the Windows named pipe name/path used as the HTTP transport to communicate with the Datadog Agent (instead of TCP or a Unix domain socket). When set, the tracer's HTTP client uses a NamedPipe socket factory. Default: unset.

`DD_TRACE_PIPE_TIMEOUT_MS`
: **Type**: `int`<br>
**Default**: `500`<br>
Sets the timeout in milliseconds for named pipes communication. Default value is 0.

`DD_TRACE_PROPAGATION_BEHAVIOR_EXTRACT`
: **Type**: `string`<br>
**Default**: `continue`<br>
Specifies how incoming distributed tracing headers should be handled at a service level. Accepted values are: `continue`: The SDK will continue the distributed trace if the incoming distributed tracing headers represent a valid trace context. `restart`: The SDK will always start a new trace. If the incoming distributed tracing headers represent a valid trace context, that trace context will be represented as a span link on service entry spans (as opposed to the parent span in the `continue` configuration). `ignore`: The SDK will always start a new trace and all incoming distributed tracing headers are ignored.

`DD_TRACE_PROPAGATION_EXTRACT_FIRST`
: **Type**: `boolean`<br>
**Default**: `false`<br>
When set to true, stops extracting after the first successful trace context extraction.

`DD_TRACE_PROPAGATION_STYLE_EXTRACT`
: **Aliases**: `DD_PROPAGATION_STYLE_EXTRACT`, `DD_TRACE_PROPAGATION_STYLE`<br>
**Type**: `array`<br>
**Default**: `datadog,tracecontext,baggage`<br>
A comma-separated list of header formats from which to attempt to extract distributed tracing propagation data. The first format found with complete and valid headers is used to define the trace to continue.

`DD_TRACE_PROPAGATION_STYLE_INJECT`
: **Aliases**: `DD_PROPAGATION_STYLE_INJECT`, `DD_TRACE_PROPAGATION_STYLE`<br>
**Type**: `array`<br>
**Default**: `datadog,tracecontext,baggage`<br>
A comma-separated list of header formats to include to propagate distributed traces between services.

`DD_TRACE_RATE_LIMIT`
: **Aliases**: `DD_MAX_TRACES_PER_SECOND`<br>
**Type**: `int`<br>
**Default**: `100`<br>
Sets the maximum number of traces to sample per second; applies only when either DD_TRACE_SAMPLING_RULES or DD_TRACE_SAMPLE_RATE is set.

`DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED`
: **Type**: `boolean`<br>
**Default**: `false`<br>
When enabled, disables inferred-services/integration service naming by making Naming Schema v0 not allow inferred services (so integrations that rely on inferred services fall back to application service naming)

`DD_TRACE_SAMPLE_RATE`
: **Aliases**: `OTEL_TRACES_SAMPLER`<br>
**Type**: `decimal`<br>
**Default**: N/A<br>
Controls the ingestion sample rate (between 0.0 and 1.0) between the Agent and the backend. Use OTEL_TRACES_SAMPLER as an alias

`DD_TRACE_SAMPLING_RULES`
: **Type**: `string`<br>
**Default**: N/A<br>
Semi-colon separated list of sampling rules. The rule is matched in order of specification. The first match in a list is used. Per entry: The item "sample_rate" is required in decimal format. The item "service" is optional in regular expression format, to match on service name. The item "name" is optional in regular expression format, to match on operation name. To give a rate of 50% to any traces in a service starting with the text "cart": '[{"sample_rate":0.5, "service":"cart.*"}]' To give a rate of 20% to any traces which have an operation name of "http.request": '[{"sample_rate":0.2, "name":"http.request"}]' To give a rate of 100% to any traces within a service named "background" and with an operation name of "sql.query": '[{"sample_rate":1.0, "service":"background", "name":"sql.query"}] To give a rate of 10% to all traces '[{"sample_rate":0.1}]' To configure multiple rules, separate by semi-colon and order from most specific to least specific: '[{"sample_rate":0.5, "service":"cart.*"}, {"sample_rate":0.2, "name":"http.request"}, {"sample_rate":1.0, "service":"background", "name":"sql.query"}, {"sample_rate":0.1}]' If no rules are specified, or none match, default internal sampling logic will be used.

`DD_TRACE_SAMPLING_RULES_FORMAT`
: **Type**: `string`<br>
**Default**: `glob`<br>
Sets the format of custom sampling rules. Valid values are regex or glob. If the value is not recognized, trace sampling rules are disabled.

`DD_TRACE_SERVICE_MAPPING`
: **Type**: `string`<br>
**Default**: N/A<br>
Maps service names to replacement names for renaming.

`DD_TRACE_SINGLE_SPAN_ASPNETCORE_ENABLED`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Dotnet web server instrumentation. Enables generating only a single span in the ASP.NET Core integration, by only creating `aspnet_core.request` spans, without creating handler spans or tracking specific route values. Not compatible with DD_TRACE_ROUTE_TEMPLATE_RESOURCE_NAMES_ENABLED (that value is ignored), but may be used with DD_TRACE_EXPAND_ROUTE_TEMPLATES_ENABLED. Only supported on .NET 6+

`DD_TRACE_SPAN_ATTRIBUTE_SCHEMA`
: **Type**: `string`<br>
**Default**: `v0`<br>
Sets the schema version for service naming and span attributes. Accepted values are: "v1", "v0". Default value is "v0".

`DD_TRACE_STARTUP_LOGS`
: **Type**: `boolean`<br>
**Default**: `true`<br>
Enable startup configuration and diagnostic log.

`DD_TRACE_STATS_COMPUTATION_ENABLED`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace-stats computation in the tracer for stats payload generation and ingestion-side metrics.

`DD_TRACE_X_DATADOG_TAGS_MAX_LENGTH`
: **Type**: `int`<br>
**Default**: `512`<br>
Maximum length of the `x-datadog-tags` header for trace tag propagation. Set to 0 to disable.
