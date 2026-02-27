### Tracing

`DD_TRACE_128_BIT_TRACEID_GENERATION_ENABLED`
: **Since**: 2.3.0 <br>
**Default**: `true`<br>
Controls whether new traces use 128-bit W3C trace IDs (32-character hexadecimal strings) or 64-bit Datadog trace IDs (16-character hexadecimal strings). The default is true to support W3C trace context propagation.

`DD_TRACE_128_BIT_TRACEID_LOGGING_ENABLED`
: **Since**: 2.3.0 <br>
**Default**: `true`<br>
Controls whether 128-bit trace IDs are logged in their full 32-character format or truncated to 16 characters. Set to false for compatibility with systems that expect the shorter format.

`DD_TRACE_ABANDONED_SPAN_TIMEOUT`
: **Since**: 2.3.0 <br>
**Default**: `10m`<br>
Sets the duration after which an unfinished span is considered abandoned for debugging. Defaults to 10m.

`DD_TRACE_AGENT_PORT`
: **Since**: 2.3.0 <br>
**Default**: `8126`<br>
The port of the Trace Agent that the tracer submits to. If the Agent configuration sets receiver_port or DD_APM_RECEIVER_PORT to something other than the default 8126, then DD_TRACE_AGENT_PORT or DD_TRACE_AGENT_URL must match it.

`DD_TRACE_AGENT_URL`
: **Since**: 2.3.0, 2.6.0 <br>
**Default**: `http://localhost:8126`<br>
The URL for connecting the tracer to the Datadog agent. Valid URL schemas include http:// and unix:// (UNIX Domain Sockets). This value takes precedence over DD_AGENT_HOST and DD_TRACE_AGENT_PORT if set.

`DD_TRACE_ANALYTICS_ENABLED`
: **Since**: 2.3.0, 2.6.0 <br>
**Default**: `false`<br>
Enables Trace Analytics by default. When enabled for an integration, instrumentations set the `analytics.sample_rate` metric on spans (using the configured per-integration sample rate). Default: false.

`DD_TRACE_AWS_ANALYTICS_ENABLED`
: **Since**: 2.3.0 <br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the AWS SDK integration by setting the analytics sample rate to 1.0.

`DD_TRACE_BUNTDB_ANALYTICS_ENABLED`
: **Since**: 2.3.0 <br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the BuntDB integration by setting the analytics sample rate to 1.0.

`DD_TRACE_CHI_ANALYTICS_ENABLED`
: **Since**: 2.3.0 <br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the chi integration by setting the analytics sample rate to 1.0.

`DD_TRACE_CLIENT_HOSTNAME_COMPAT`
: **Since**: 2.3.0 <br>
**Default**: N/A<br>
Internal compatibility toggle for legacy client-hostname behavior. This setting is currently not used and has no effect.

`DD_TRACE_CLIENT_IP_ENABLED`
: **Since**: 2.3.0 <br>
**Default**: `false`<br>
Enables or disables the automatic collection of client IP addresses from HTTP request headers. When enabled, the IP address is stored in the http.client_ip span tag.

`DD_TRACE_CLIENT_IP_HEADER`
: **Since**: 2.3.0 <br>
**Default**: ``<br>
Configures a custom header name from which to source the http.client_ip tag value. If this variable is set, all other IP-related headers are ignored (for example, setting DD_TRACE_CLIENT_IP_HEADER=custom-ip-header and including the header custom-ip-header: 5.6.7.9 in a request results in a span tagged with "http.client_ip": "5.6.7.9"). If an empty string or null value is passed, IP headers are queried in this order: - x-forwarded-for - x-real-ip - true-client-ip - x-client-ip - x-forwarded - forwarded-for - x-cluster-client-ip - fastly-client-ip - cf-connecting-ip - cf-connecting-ipv6

`DD_TRACE_CONSUL_ANALYTICS_ENABLED`
: **Since**: 2.3.0 <br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the Consul integration by setting the analytics sample rate to 1.0.

`DD_TRACE_DEBUG`
: **Since**: 2.3.0, 2.6.0 <br>
**Default**: `false`<br>
Enable debug logging in the tracer. Use OTEL_LOG_LEVEL as an alias

`DD_TRACE_DEBUG_ABANDONED_SPANS`
: **Since**: 2.3.0 <br>
**Default**: `false`<br>
The Datadog Go Tracer also supports logging for potentially abandoned spans. To enable this debug mode in Go, set the environment variable DD_TRACE_DEBUG_ABANDONED_SPANS=true. To change the duration after which spans are considered abandoned (default=10m), set the environment variable DD_TRACE_ABANDONED_SPAN_TIMEOUT to the desired time duration. Abandoned span logs appear at the Info level.

`DD_TRACE_DEBUG_SEELOG_WORKAROUND`
: **Since**: N/A <br>
**Default**: `true`<br>
Controls whether a workaround for seelog-related goroutine leaks is applied. Set to false to disable the workaround.

`DD_TRACE_DEBUG_STACK`
: **Since**: 2.6.0 <br>
**Default**: `true`<br>
Controls whether stack traces are captured for spans that finish with an error. Defaults to true.

`DD_TRACE_ELASTIC_ANALYTICS_ENABLED`
: **Since**: 2.3.0 <br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the Elasticsearch integration by setting the analytics sample rate to 1.0.

`DD_TRACE_ENABLED`
: **Since**: 2.3.0 <br>
**Default**: `true`<br>
**Default**: true Enable web framework and library instrumentation. When false, the application code doesn't generate any traces. See also DD_APM_TRACING_ENABLED.

`DD_TRACE_FEATURES`
: **Since**: 2.3.0 <br>
**Default**: ``<br>
Comma- or space-separated list of tracer feature flags. Use this to enable optional or experimental behavior such as "discovery".

`DD_TRACE_FIBER_ANALYTICS_ENABLED`
: **Since**: 2.3.0 <br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the Fiber integration by setting the analytics sample rate to 1.0.

`DD_TRACE_GIN_ANALYTICS_ENABLED`
: **Since**: 2.3.0 <br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the Gin integration by setting the analytics sample rate to 1.0.

`DD_TRACE_GIT_METADATA_ENABLED`
: **Since**: 2.3.0 <br>
**Default**: `true`<br>
Git metadata: when enabled, adds git repository URL and commit SHA tags to the root span (used for linking traces to source code). Default: true.

`DD_TRACE_GOCQL_ANALYTICS_ENABLED`
: **Since**: 2.3.0 <br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the gocql integration by setting the analytics sample rate to 1.0.

`DD_TRACE_GOCQL_COMPAT`
: **Since**: 2.3.0 <br>
**Default**: N/A<br>
Sets a compatibility version for the gocql integration. When set to a valid semver value (for example, v1.65.0), it adjusts how certain cluster tags are reported for older versions.

`DD_TRACE_GOOGLE_API_ANALYTICS_ENABLED`
: **Since**: 2.3.0 <br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the Google API integration by setting the analytics sample rate to 1.0.

`DD_TRACE_GOPG_ANALYTICS_ENABLED`
: **Since**: 2.3.0 <br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the go-pg integration by setting the analytics sample rate to 1.0.

`DD_TRACE_GQLGEN_ANALYTICS_ENABLED`
: **Since**: 2.3.0 <br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the gqlgen integration by setting the analytics sample rate to 1.0.

`DD_TRACE_GRAPHQL_ANALYTICS_ENABLED`
: **Since**: 2.3.0, 2.6.0 <br>
**Default**: `false`<br>
Enables trace analytics for spans produced by GraphQL integrations by setting the analytics sample rate to 1.0.

`DD_TRACE_GRAPHQL_ERROR_EXTENSIONS`
: **Since**: 2.3.0 <br>
**Default**: ``<br>
Specifies which GraphQL error extensions to capture. A comma-separated list of extension keys to capture. Empty or not present means no extensions are captured.

`DD_TRACE_GRPC_ANALYTICS_ENABLED`
: **Since**: 2.3.0 <br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the gRPC integration by setting the analytics sample rate to 1.0.

`DD_TRACE_HEADER_TAGS`
: **Since**: 2.3.0 <br>
**Default**: ``<br>
Automatically apply specified HTTP headers as span tags. If a custom tag name is not specified, the tag key defaults to http.request.headers. for request headers and http.response.headers. for response headers.

`DD_TRACE_HTTPROUTER_ANALYTICS_ENABLED`
: **Since**: 2.3.0 <br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the httprouter integration by setting the analytics sample rate to 1.0.

`DD_TRACE_HTTP_ANALYTICS_ENABLED`
: **Since**: 2.3.0 <br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the net/http integration by setting the analytics sample rate to 1.0.

`DD_TRACE_HTTP_CLIENT_ERROR_STATUSES`
: **Since**: 2.3.0 <br>
**Default**: `400-499`<br>
Comma-separated list of HTTP status codes and ranges to treat as errors for HTTP client spans (for example, 400-499,500). When set, matching responses mark the span as an error.

`DD_TRACE_HTTP_CLIENT_TAG_QUERY_STRING`
: **Since**: 2.3.0 <br>
**Default**: `true`<br>
By default, query string parameters and fragments are added to the `http.url` tag on web client spans. Set to `false` to prevent the collection of this data.

`DD_TRACE_HTTP_SERVER_ERROR_STATUSES`
: **Since**: 2.3.0, 2.6.0 <br>
**Default**: `500-599`<br>
Comma-separated list of HTTP status codes and ranges to treat as errors for HTTP server spans (for example, 500-599,404). When unset, 5xx responses are treated as errors by default.

`DD_TRACE_HTTP_URL_QUERY_STRING_DISABLED`
: **Since**: 2.3.0 <br>
**Default**: `false`<br>
Disables including URL query strings in the http.url tag for incoming HTTP requests. When disabled, only the path is reported.

`DD_TRACE_INFERRED_PROXY_SERVICES_ENABLED`
: **Since**: 2.3.0 <br>
**Default**: `false`<br>
Inferred proxy services: when enabled, registers the inferred-proxy propagator to extract `x-dd-proxy*` headers and start an inferred proxy span (currently supports `x-dd-proxy=aws-apigateway`) as a parent of the server span, using header values for service/resource/tags. Default: false.

`DD_TRACE_KAFKA_ANALYTICS_ENABLED`
: **Since**: 2.3.0 <br>
**Default**: `false`<br>
Enables trace analytics for spans produced by Kafka integrations by setting the analytics sample rate to 1.0.

`DD_TRACE_LEVELDB_ANALYTICS_ENABLED`
: **Since**: 2.3.0 <br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the LevelDB integration by setting the analytics sample rate to 1.0.

`DD_TRACE_LOG_DIRECTORY`
: **Since**: 2.3.0 <br>
**Default**: N/A<br>
Sets a directory where tracer logs are written. The directory must exist; otherwise logs remain on stderr.

`DD_TRACE_MCP_ANALYTICS_ENABLED`
: **Since**: 2.5.0 <br>
**Default**: `false`<br>
This setting is currently not used by the MCP integration and has no effect.

`DD_TRACE_MEMCACHE_ANALYTICS_ENABLED`
: **Since**: 2.3.0 <br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the Memcache integration by setting the analytics sample rate to 1.0.

`DD_TRACE_MGO_ANALYTICS_ENABLED`
: **Since**: 2.3.0 <br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the mgo integration by setting the analytics sample rate to 1.0.

`DD_TRACE_MONGO_ANALYTICS_ENABLED`
: **Since**: 2.3.0 <br>
**Default**: `false`<br>
Enables trace analytics for spans produced by MongoDB integrations by setting the analytics sample rate to 1.0.

`DD_TRACE_MUX_ANALYTICS_ENABLED`
: **Since**: 2.3.0 <br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the gorilla/mux integration by setting the analytics sample rate to 1.0.

`DD_TRACE_NEGRONI_ANALYTICS_ENABLED`
: **Since**: 2.3.0 <br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the Negroni integration by setting the analytics sample rate to 1.0.

`DD_TRACE_OBFUSCATION_QUERY_STRING_REGEXP`
: **Since**: 2.3.0, 2.6.0 <br>
**Default**: `(?i)(?:p(?:ass)?w(?:or)?d|pass(?:_?phrase)?|secret|(?:api_?|private_?|public_?|access_?|secret_?)key(?:_?id)?|token|consumer_?(?:id|key|secret)|sign(?:ed|ature)?|auth(?:entication|orization)?)(?:(?:\\s|%20)*(?:=|%3D)[^&]+|(?:\"|%22)(?:\\s|%20)*(?::|%3A)(?:\\s|%20)*(?:\"|%22)(?:%2[^2]|%[^2]|[^\"%])+(?:\"|%22))|bearer(?:\\s|%20)+[a-z0-9\\._\\-]|token(?::|%3A)[a-z0-9]{13}|gh[opsu]_[0-9a-zA-Z]{36}|ey[I-L](?:[\\w=-]|%3D)+\\.ey[I-L](?:[\\w=-]|%3D)+(?:\\.(?:[\\w.+\\/=-]|%3D|%2F|%2B)+)?|[\\-]{5}BEGIN(?:[a-z\\s]|%20)+PRIVATE(?:\\s|%20)KEY[\\-]{5}[^\\-]+[\\-]{5}END(?:[a-z\\s]|%20)+PRIVATE(?:\\s|%20)KEY|ssh-rsa(?:\\s|%20)*(?:[a-z0-9\\/\\.+]|%2F|%5C|%2B){100,}`<br>
Applies a regex to redact sensitive data from query strings on incoming HTTP requests. The default regex matches various sensitive data patterns, including passwords, tokens, API keys, private keys, and authorization terms. Matches are replaced with <redacted>. If an empty string is passed, no obfuscation occurs. The resulting value is reported in the http.url tag.

`DD_TRACE_PARTIAL_FLUSH_ENABLED`
: **Since**: 2.3.0 <br>
**Default**: `false`<br>
Enables incrementally flushing large traces to the Datadog Agent, reducing the chance of rejection by the Agent. Use only when you have long-lived traces or traces with many spans.

`DD_TRACE_PARTIAL_FLUSH_MIN_SPANS`
: **Since**: 2.3.0, 2.6.0 <br>
**Default**: `1000`<br>
Sets the minimum number of finished spans required to trigger a partial flush when partial flushing is enabled. Defaults to 1000; invalid values are ignored.

`DD_TRACE_PEER_SERVICE_DEFAULTS_ENABLED`
: **Since**: 2.3.0 <br>
**Default**: `false`<br>
Peer service defaults (Naming Schema v0): when enabled, computes default `peer.service` values for eligible spans using the v1 peer-service default algorithm; when disabled (default), Naming Schema v0 does not compute peer.service defaults.

`DD_TRACE_PEER_SERVICE_MAPPING`
: **Since**: 2.3.0 <br>
**Default**: ``<br>
Maps detected peer service names to normalized values before they are attached to spans.

`DD_TRACE_PROPAGATION_EXTRACT_FIRST`
: **Since**: 2.3.0 <br>
**Default**: `false`<br>
When set to true, stops extracting after the first successful trace context extraction.

`DD_TRACE_PROPAGATION_STYLE`
: **Since**: 2.3.0, 2.6.0 <br>
**Default**: `datadog,tracecontext,baggage`<br>
A comma-separated list of header formats from which to attempt to inject and extract distributed tracing propagation data. The first format found with complete and valid headers is used to define the trace to continue. The more specific DD_TRACE_PROPAGATION_STYLE_INJECT and DD_TRACE_PROPAGATION_STYLE_EXTRACT configurations take priority when present.

`DD_TRACE_PROPAGATION_STYLE_EXTRACT`
: **Since**: 2.3.0, 2.6.0 <br>
**Default**: `datadog, tracecontext, baggage`<br>
A comma-separated list of header formats from which to attempt to extract distributed tracing propagation data. The first format found with complete and valid headers is used to define the trace to continue.

`DD_TRACE_PROPAGATION_STYLE_INJECT`
: **Since**: 2.3.0, 2.6.0 <br>
**Default**: `datadog, tracecontext, baggage`<br>
comma-separated list of header formats to include to propagate distributed traces between services.

`DD_TRACE_RATE_LIMIT`
: **Since**: 2.3.0 <br>
**Default**: `100`<br>
Sets the maximum number of traces to sample per second; applies only when either DD_TRACE_SAMPLING_RULES or DD_TRACE_SAMPLE_RATE is set.

`DD_TRACE_REDIGO_ANALYTICS_ENABLED`
: **Since**: 2.3.0 <br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the Redigo integration by setting the analytics sample rate to 1.0.

`DD_TRACE_REDIS_ANALYTICS_ENABLED`
: **Since**: 2.3.0 <br>
**Default**: `false`<br>
Enables trace analytics for spans produced by Redis integrations by setting the analytics sample rate to 1.0.

`DD_TRACE_REDIS_RAW_COMMAND`
: **Since**: 2.3.0 <br>
**Default**: `false`<br>
Controls whether Redis client spans include a tag with the raw command. This can expose sensitive data, so it is disabled by default.

`DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED`
: **Since**: 2.3.0 <br>
**Default**: `false`<br>
When enabled, disables inferred-services/integration service naming by making Naming Schema v0 not allow inferred services (so integrations that rely on inferred services fall back to application service naming)

`DD_TRACE_REPORT_HOSTNAME`
: **Since**: 2.3.0 <br>
**Default**: `false`<br>
Whether to report the system's hostname for each trace. When disabled, the hostname of the Agent is used instead.

`DD_TRACE_RESOURCE_RENAMING_ALWAYS_SIMPLIFIED_ENDPOINT`
: **Since**: 2.4.0 <br>
**Default**: `false`<br>
Always set the http.endpoint tag with the results of the simplification algorithm of Resource Renaming

`DD_TRACE_RESOURCE_RENAMING_ENABLED`
: **Since**: 2.4.0 <br>
**Default**: `false`<br>
Controls whether the http.endpoint tag is computed and added for incoming HTTP requests. This is disabled by default unless application security is enabled at startup, and can be explicitly enabled or disabled with this setting.

`DD_TRACE_RESTFUL_ANALYTICS_ENABLED`
: **Since**: 2.3.0 <br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the go-restful integration by setting the analytics sample rate to 1.0.

`DD_TRACE_RETRY_INTERVAL`
: **Since**: 2.6.0 <br>
**Default**: `1ms`<br>
Sets the interval for retrying submitting payloads to the agent

`DD_TRACE_SAMPLE_RATE`
: **Since**: 2.3.0, 2.6.0 <br>
**Default**: `1`<br>
Controls the ingestion sample rate (between 0.0 and 1.0) between the Agent and the backend.

`DD_TRACE_SAMPLING_RULES`
: **Since**: 2.3.0, 2.6.0 <br>
**Default**: ``<br>
JSON array of sampling rules. The rule is matched in order of specification. The first match in a list is used. Per entry: The item "sample_rate" is required in decimal format. The item "service" is optional in regular expression format, to match on service name. The item "name" is optional in regular expression format, to match on operation name. To give a rate of 50% to any traces in a service starting with the text "cart": '[{"sample_rate":0.5, "service":"cart.*"}]' To give a rate of 20% to any traces which have an operation name of "http.request": '[{"sample_rate":0.2, "name":"http.request"}]' To give a rate of 100% to any traces within a service named "background" and with an operation name of "sql.query": '[{"sample_rate":1.0, "service":"background", "name":"sql.query"}] To give a rate of 10% to all traces '[{"sample_rate":0.1}]' To configure multiple rules, separate by semi-colon and order from most specific to least specific: '[{"sample_rate":0.5, "service":"cart.*"}, {"sample_rate":0.2, "name":"http.request"}, {"sample_rate":1.0, "service":"background", "name":"sql.query"}, {"sample_rate":0.1}]' If no rules are specified, or none match, default internal sampling logic will be used.

`DD_TRACE_SAMPLING_RULES_FILE`
: **Since**: 2.3.0 <br>
**Default**: N/A<br>
Path to a file containing a JSON array of trace sampling rules. This is used when DD_TRACE_SAMPLING_RULES is not set.

`DD_TRACE_SARAMA_ANALYTICS_ENABLED`
: **Since**: 2.3.0 <br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the Sarama integration by setting the analytics sample rate to 1.0.

`DD_TRACE_SOURCE_HOSTNAME`
: **Since**: 2.3.0 <br>
**Default**: N/A<br>
Sets the hostname reported with tracing data. When set, hostname reporting is enabled and uses this value instead of auto-detection.

`DD_TRACE_SPAN_ATTRIBUTE_SCHEMA`
: **Since**: 2.3.0, 2.6.0 <br>
**Default**: `v0`<br>
Sets the schema version for service naming and span attributes. Accepted values are: "v1", "v0". Default value is "v0".

`DD_TRACE_SQL_ANALYTICS_ENABLED`
: **Since**: 2.3.0 <br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the database/sql integration by setting the analytics sample rate to 1.0.

`DD_TRACE_SQL_COMMENT_INJECTION_MODE`
: **Since**: 2.3.0 <br>
**Default**: N/A<br>
Controls SQL comment injection used for database monitoring correlation. Supported values are disabled, service, and full.

`DD_TRACE_STARTUP_LOGS`
: **Since**: 2.3.0, 2.6.0 <br>
**Default**: `true`<br>
Enable startup configuration and diagnostic log.

`DD_TRACE_STATS_COMPUTATION_ENABLED`
: **Since**: 2.3.0, 2.6.0 <br>
**Default**: `true`<br>
Controls whether client-side trace statistics computation is enabled. Defaults to true.

`DD_TRACE_TWIRP_ANALYTICS_ENABLED`
: **Since**: 2.3.0 <br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the Twirp integration by setting the analytics sample rate to 1.0.

`DD_TRACE_V1_PAYLOAD_FORMAT_ENABLED`
: **Since**: N/A <br>
**Default**: `false`<br>
When enabled and the agent supports it, sends traces using the v1 payload format. Defaults to false.

`DD_TRACE_VALKEY_ANALYTICS_ENABLED`
: **Since**: 2.6.0 <br>
**Default**: `false`<br>
This setting is currently not used by the valkey-go integration and has no effect.

`DD_TRACE_VALKEY_RAW_COMMAND`
: **Since**: 2.3.0 <br>
**Default**: `false`<br>
Controls whether Valkey client spans include a tag with the raw command. This can expose sensitive data, so it is disabled by default.

`DD_TRACE_VAULT_ANALYTICS_ENABLED`
: **Since**: 2.3.0 <br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the Vault integration by setting the analytics sample rate to 1.0.

`DD_TRACE_X_DATADOG_TAGS_MAX_LENGTH`
: **Since**: 2.3.0 <br>
**Default**: `512`<br>
Maximum length of the `x-datadog-tags` header for trace tag propagation. Set to 0 to disable.

`DD_TRACE__ANALYTICS_ENABLED`
: **Since**: 2.3.0 <br>
**Default**: `false`<br>
Enables trace analytics for integrations that use the default (unprefixed) analytics toggle by setting the analytics sample rate to 1.0.
