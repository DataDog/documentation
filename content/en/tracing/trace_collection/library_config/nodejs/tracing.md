### Tracing

`DD_TRACE_128_BIT_TRACEID_GENERATION_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Controls whether new traces use 128-bit W3C trace IDs (32-character hexadecimal strings) or 64-bit Datadog trace IDs (16-character hexadecimal strings). The default is true to support W3C trace context propagation.

`DD_TRACE_128_BIT_TRACEID_LOGGING_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Controls whether 128-bit trace IDs are logged in their full 32-character format or truncated to 16 characters. Set to false for compatibility with systems that expect the shorter format.

`DD_TRACE_<INTEGRATION_NAME>_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables/disables instrumentations. When disabled, no span operations are not created for the specific instrumentation.
  
  Integrations:
  
  - AI
  - AMQP10
  - AMQPLIB
  - ANTHROPIC
  - APOLLO
  - APOLLO_GATEWAY
  - APOLLO_SERVER_CORE
  - APOLLO_SERVER
  - APOLLO_SERVER_EXPRESS
  - APOLLO_SERVER_FASTIFY
  - APOLLO_SUBGRAPH
  - AVSC
  - AWS_SDK_AWS_BATCH_PROPAGATION
  - AWS_SDK_AWS
  - AWS_SDK_BATCH_PROPAGATION
  - AWS_SDK_BEDROCKRUNTIME_BATCH_PROPAGATION
  - AWS_SDK_BEDROCKRUNTIME
  - AWS_SDK_CLOUDWATCHLOGS_BATCH_PROPAGATION
  - AWS_SDK_CLOUDWATCHLOGS
  - AWS_SDK_DYNAMODB_BATCH_PROPAGATION
  - AWS_SDK_DYNAMODB
  - AWS_SDK_EVENTBRIDGE_BATCH_PROPAGATION
  - AWS_SDK_EVENTBRIDGE
  - AWS_SDK_KINESIS_BATCH_PROPAGATION
  - AWS_SDK_KINESIS
  - AWS_SDK_LAMBDA_BATCH_PROPAGATION
  - AWS_SDK_LAMBDA
  - AWS_SDK_NODE_HTTP_HANDLER
  - AWS_SDK_REDSHIFT_BATCH_PROPAGATION
  - AWS_SDK_REDSHIFT
  - AWS_SDK_S3_BATCH_PROPAGATION
  - AWS_SDK_S3
  - AWS_SDK_SFN_BATCH_PROPAGATION
  - AWS_SDK_SFN_CLIENT
  - AWS_SDK_SFN
  - AWS_SDK_SMITHY_CLIENT
  - AWS_SDK_SNS_BATCH_PROPAGATION
  - AWS_SDK_SNS
  - AWS_SDK_SQS_BATCH_PROPAGATION
  - AWS_SDK_SQS
  - AWS_SDK_STATES_BATCH_PROPAGATION
  - AWS_SDK_STATES
  - AWS_SDK_STEPFUNCTIONS_BATCH_PROPAGATION
  - AWS_SDK_STEPFUNCTIONS
  - AXIOS
  - AZURE_EVENT_HUBS
  - AZURE_SERVICE_BUS
  - BLUEBIRD
  - BODY_PARSER
  - BSON
  - BULLMQ
  - BUNYAN
  - CASSANDRA_DRIVER
  - CHILD_PROCESS
  - COLLECTIONS
  - COMMONPLUGIN
  - CONFLUENTINC_KAFKA_JAVASCRIPT
  - CONNECT
  - COOKIE
  - COOKIE_PARSER
  - CRYPTO
  - CUCUMBER_CUCUMBER
  - CYPRESS
  - DNS
  - ELASTIC_ELASTICSEARCH
  - ELASTIC_TRANSPORT
  - EXPRESS
  - EXPRESS_MONGO_SANITIZE
  - EXPRESS_SESSION
  - FASTIFY
  - FETCH
  - FIND_MY_WAY
  - FS
  - GCP_PUBSUB_PUSH
  - GENERIC_POOL
  - GOOGLE_CLOUD_PUBSUB
  - GOOGLE_CLOUD_VERTEXAI
  - GOOGLE_GAX
  - GOOGLE_GENAI
  - GRAPHQL_TAG
  - GRAPHQL_TOOLS
  - GRAPHQL_TOOLS_EXECUTOR
  - GRAPHQL_YOGA
  - GRPC_GRPC_JS
  - GRPC_PROTO_LOADER
  - HANDLEBARS
  - HAPI_BOOM
  - HAPI
  - HAPI_HAPI
  - HONO
  - HTTP2
  - HTTPS
  - IOREDIS
  - IOVALKEY
  - JEST_CIRCUS
  - JEST_CONFIG
  - JEST_CORE
  - JEST
  - JEST_ENVIRONMENT_JSDOM
  - JEST_ENVIRONMENT_NODE
  - JEST_GLOBALS
  - JEST_REPORTERS
  - JEST_RUNTIME
  - JEST_TEST_SEQUENCER
  - JEST_TRANSFORM
  - JEST_WORKER
  - KAFKAJS
  - KNEX
  - KOA
  - KOA_ROUTER
  - KOA_ROUTE
  - KOA_WEBSOCKET
  - LANGCHAIN_ANTHROPIC
  - LANGCHAIN_COHERE
  - LANGCHAIN_CORE
  - LANGCHAIN
  - LANGCHAIN_GOOGLE_GENAI
  - LANGCHAIN_OPENAI
  - LDAPJS
  - LDAPJS_PROMISE
  - LEGACY_BAGGAGE
  - LIMITD_CLIENT
  - LODASH
  - LOOPBACK
  - MARIADB
  - MEMCACHED
  - MICROGATEWAY_CORE
  - MIDDIE
  - MIDDLEWARE_TRACING
  - MOCHA_EACH
  - MOCHA
  - MOLECULER
  - MONGODB_CORE
  - MONGODB
  - MONGODB_HEARTBEAT
  - MONGOOSE
  - MQUERY
  - MULTER
  - MYSQL
  - NET
  - NEXT
  - NODE_CHILD_PROCESS
  - NODE_REDIS_CLIENT
  - NODE_SERIALIZE
  - NYC
  - OPENAI
  - OPENSEARCH_PROJECT_OPENSEARCH
  - OPENTELEMETRY_SDK_TRACE_NODE
  - ORACLEDB
  - PASSPORT
  - PASSPORT_HTTP
  - PASSPORT_LOCAL
  - PG_CURSOR
  - PG_NATIVE
  - PG_QUERY_STREAM
  - PINO
  - PINO_PRETTY
  - PLAYWRIGHT_CORE
  - PLAYWRIGHT
  - PLAYWRIGHT_TEST
  - PRISMA
  - PROCESS
  - PROMISE
  - PROMISE_JS
  - PROTOBUFJS
  - PUG
  - Q
  - REACT_DOM
  - REACT
  - REDIS_CLIENT
  - REQUEST
  - RESTIFY
  - RHEA
  - ROUTER
  - SELENIUM_WEBDRIVER
  - SEQUELIZE
  - SHAREDB
  - SMITHY_SMITHY_CLIENT
  - SQLITE3
  - SUFFIXPLUGIN
  - TEDIOUS
  - UNDICI
  - URL
  - VITEST
  - VITEST_RUNNER
  - VM
  - WHEN
  - WINSTON
  - WORKERPOOL
  - WS

`DD_TRACE_AEROSPIKE_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: N/A<br>
**Default**: N/A<br>
Enables instrumentation for aerospike. When disabled, spans for aerospike operations are not created.

`DD_TRACE_AGENT_PORT`
: **Since**: 5.83.0 <br>
**Type**: `int`<br>
**Default**: `8126`<br>
The port of the Trace Agent that the tracer submits to. If the Agent configuration sets receiver_port or DD_APM_RECEIVER_PORT to something other than the default 8126, then DD_TRACE_AGENT_PORT or DD_TRACE_AGENT_URL must match it.

`DD_TRACE_AGENT_PROTOCOL_VERSION`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: `0.4`<br>
Protocol version to use for requests to the agent. The version configured must be supported by the agent version installed or all traces will be dropped.

`DD_TRACE_AGENT_URL`
: **Since**: 5.83.0 <br>
**Aliases**: `DD_TRACE_URL`<br>
**Type**: `string`<br>
**Default**: `""`<br>
Sets the URL endpoint where profiles are sent. Overrides `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT` if set. Defaults to `http://<DD_AGENT_HOST>:<DD_TRACE_AGENT_PORT>`.

`DD_TRACE_AWS_ADD_SPAN_POINTERS`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables or disables span pointers on AWS requests. Default value is true

`DD_TRACE_AWS_SDK_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: N/A<br>
**Default**: N/A<br>
Enables instrumentation for aws sdk. When disabled, spans for aws sdk operations are not created.

`DD_TRACE_AZURE_EVENTHUBS_BATCH_LINKS_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables instrumentation for azure eventhubs batch links. When disabled, spans for azure eventhubs batch links operations are not created.

`DD_TRACE_AZURE_FUNCTIONS_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: N/A<br>
**Default**: N/A<br>
Enables instrumentation for azure functions. When disabled, spans for azure functions operations are not created.

`DD_TRACE_AZURE_SERVICEBUS_BATCH_LINKS_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables instrumentation for azure servicebus batch links. When disabled, spans for azure servicebus batch links operations are not created.

`DD_TRACE_BAGGAGE_MAX_BYTES`
: **Since**: 5.83.0 <br>
**Type**: `int`<br>
**Default**: `8192`<br>
Configuration key to set the maximum number of bytes that can be injected into the baggage header when propagating to a downstream service. Default value is 8192 bytes.

`DD_TRACE_BAGGAGE_MAX_ITEMS`
: **Since**: 5.83.0 <br>
**Type**: `int`<br>
**Default**: `64`<br>
Configuration key to set the maximum number of items that can be injected into the baggage header when propagating to a downstream service. Default value is 64 items.

`DD_TRACE_BAGGAGE_TAG_KEYS`
: **Since**: 5.83.0 <br>
**Type**: `array`<br>
**Default**: `user.id, session.id, account.id`<br>
Comma-separated list of baggage keys to copy into span tags. Set to * to tag all baggage items; if unset, a default allowlist is used.

`DD_TRACE_BEAUTIFUL_LOGS`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Pretty-print JSON payloads in tracer debug logs (adds indentation).

`DD_TRACE_CLIENT_IP_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables or disables the automatic collection of client IP addresses from HTTP request headers. When enabled, the IP address is stored in the http.client_ip span tag.

`DD_TRACE_CLIENT_IP_HEADER`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: `""`<br>
Configures a custom header name from which to source the http.client_ip tag value. If this variable is set, all other IP-related headers are ignored (for example, setting DD_TRACE_CLIENT_IP_HEADER=custom-ip-header and including the header custom-ip-header: 5.6.7.9 in a request results in a span tagged with "http.client_ip": "5.6.7.9"). If an empty string or null value is passed, IP headers are queried in this order: - x-forwarded-for - x-real-ip - true-client-ip - x-client-ip - x-forwarded - forwarded-for - x-cluster-client-ip - fastly-client-ip - cf-connecting-ip - cf-connecting-ipv6

`DD_TRACE_CLOUD_PAYLOAD_TAGGING_MAX_DEPTH`
: **Since**: 5.83.0 <br>
**Type**: `int`<br>
**Default**: `10`<br>
An integer representing the maximum depth of an AWS SDK request/reponse payload to use for AWS payload tagging.

`DD_TRACE_CLOUD_REQUEST_PAYLOAD_TAGGING`
: **Since**: 5.83.0 <br>
**Type**: `array`<br>
**Default**: N/A<br>
A comma-separated string of JSONPath entries to redact from AWS SDK requests. Setting this enables AWS payload tagging for requests.

`DD_TRACE_CLOUD_RESPONSE_PAYLOAD_TAGGING`
: **Since**: 5.83.0 <br>
**Type**: `array`<br>
**Default**: N/A<br>
A comma-separated string of JSONPath entries to redact from AWS SDK responses. Setting this enables AWS payload tagging for responses.

`DD_TRACE_COUCHBASE_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: N/A<br>
**Default**: N/A<br>
Enables instrumentation for couchbase. When disabled, spans for couchbase operations are not created.

`DD_TRACE_CUCUMBER_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: N/A<br>
**Default**: N/A<br>
Enables instrumentation for cucumber. When disabled, spans for cucumber operations are not created.

`DD_TRACE_DD_TRACE_API_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: N/A<br>
**Default**: N/A<br>
Enables instrumentation for dd trace api. When disabled, spans for dd trace api operations are not created.

`DD_TRACE_DEBUG`
: **Since**: 5.83.0 <br>
**Type**: N/A<br>
**Default**: N/A<br>
**Note:** For versions below 2.X, debug mode could be enabled programmatically inside the tracer initialization but this is no longer supported.

`DD_TRACE_DISABLED_INSTRUMENTATIONS`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: `""`<br>
Set the `DD_TRACE_DISABLED_INSTRUMENTATIONS` environment variable to a comma-separated list of integration names to disable.

`DD_TRACE_DISABLED_PLUGINS`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Comma-separated plugin IDs to disable; prevents those integrations from being auto-instrumented.

`DD_TRACE_DYNAMODB_TABLE_PRIMARY_KEYS`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
JSON object mapping DynamoDB table names to primary key field names (1-2) used for span pointers.

`DD_TRACE_ELASTICSEARCH_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables instrumentation for elasticsearch. When disabled, spans for elasticsearch operations are not created.

`DD_TRACE_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
**Default**: true Enable web framework and library instrumentation. When false, the application code doesn't generate any traces. See also DD_APM_TRACING_ENABLED.

`DD_TRACE_ENCODING_DEBUG`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace-encoding debug diagnostics to troubleshoot serialization and payload formatting issues.

`DD_TRACE_EXPERIMENTAL_B3_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables instrumentation for experimental b3. When disabled, spans for experimental b3 operations are not created.

`DD_TRACE_EXPERIMENTAL_EXPORTER`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: `""`<br>
Whether to write traces to log output or agentless, rather than send to an agent

`DD_TRACE_EXPERIMENTAL_GET_RUM_DATA_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables instrumentation for experimental get rum data. When disabled, spans for experimental get rum data operations are not created.

`DD_TRACE_EXPERIMENTAL_RUNTIME_ID_ENABLED`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Enables adding a runtime-id tag to runtime metrics (experimental). Alias for DD_RUNTIME_METRICS_RUNTIME_ID_ENABLED.

`DD_TRACE_EXPERIMENTAL_SPAN_COUNTS`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables experimental span-count tracking so traces include aggregate span count metadata.

`DD_TRACE_EXPERIMENTAL_STATE_TRACKING`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables experimental internal tracer state tracking for diagnostics and troubleshooting.

`DD_TRACE_FLUSH_INTERVAL`
: **Since**: 5.83.0 <br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Trace writer flush interval (seconds): controls how often the tracer flushes/sends traces. Default: 1.0s.

`DD_TRACE_GIT_METADATA_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Git metadata: when enabled, adds git repository URL and commit SHA tags to the root span (used for linking traces to source code). Default: true.

`DD_TRACE_GLOBAL_TAGS`
: **Since**: 5.83.0 <br>
**Type**: `map`<br>
**Default**: N/A<br>
Global tags: key/value tags applied everywhere (on all spans and runtime metrics). Merged from `dd.trace.global.tags` (legacy) and `dd.tags`/`dd.trace.tags` (and adjusted by `DD_ENV`/`DD_VERSION`). Default: empty.

`DD_TRACE_GRAPHQL_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables instrumentation for graphql. When disabled, spans for graphql operations are not created.

`DD_TRACE_GRAPHQL_ERROR_EXTENSIONS`
: **Since**: 5.83.0 <br>
**Type**: `array`<br>
**Default**: `""`<br>
Specifies which GraphQL error extensions to capture. A comma-separated list of extension keys to capture. Empty or not present means no extensions are captured.

`DD_TRACE_GRPC_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables instrumentation for grpc. When disabled, spans for grpc operations are not created.

`DD_TRACE_HEADER_TAGS`
: **Since**: 5.83.0 <br>
**Type**: `array`<br>
**Default**: `""`<br>
Automatically apply specified HTTP headers as span tags. If a custom tag name is not specified, the tag key defaults to http.request.headers. for request headers and http.response.headers. for response headers.

`DD_TRACE_HTTP_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables instrumentation for http. When disabled, spans for http operations are not created.

`DD_TRACE_INFERRED_PROXY_SERVICES_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Inferred proxy services: when enabled, registers the inferred-proxy propagator to extract `x-dd-proxy*` headers and start an inferred proxy span (currently supports `x-dd-proxy=aws-apigateway`) as a parent of the server span, using header values for service/resource/tags. Default: false.

`DD_TRACE_LOG_LEVEL`
: **Since**: 5.83.0 <br>
**Type**: N/A<br>
**Default**: N/A<br>
Optional - _string_ - **default**: `info` Sets the minimum logging level. Valid options: `trace`, `debug`, `info`, `warn`, `error`, `critical`, and `off`.

`DD_TRACE_MEMCACHED_COMMAND_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enable memcached command tagging if DD_TRACE_MEMCACHED_COMMAND_ENABLED is enabled

`DD_TRACE_MYSQL2_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables instrumentation for mysql2. When disabled, spans for mysql2 operations are not created.

`DD_TRACE_NATIVE_SPAN_EVENTS`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Encode span events in the native `span_events` payload format instead of `meta.events` JSON.

`DD_TRACE_OBFUSCATION_QUERY_STRING_REGEXP`
: **Since**: 5.83.0 <br>
**Type**: N/A<br>
**Default**: `qsRegex`<br>
Applies a regex to redact sensitive data from query strings on incoming HTTP requests. The default regex matches various sensitive data patterns, including passwords, tokens, API keys, private keys, and authorization terms. Matches are replaced with . If an empty string is passed, no obfuscation occurs. The resulting value is reported in the http.url tag.

`DD_TRACE_OPENSEARCH_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables instrumentation for opensearch. When disabled, spans for opensearch operations are not created.

`DD_TRACE_OTEL_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
**Description**: Enables the Datadog SDK's OpenTelemetry interoperability for traces. **Notes**: The default is `true` in the Java SDK.

`DD_TRACE_PARTIAL_FLUSH_MIN_SPANS`
: **Since**: 5.83.0 <br>
**Type**: `int`<br>
**Default**: `300`<br>
Minimum number of spans in a trace before partial flush is triggered.

`DD_TRACE_PEER_SERVICE_DEFAULTS_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Peer service defaults (Naming Schema v0): when enabled, computes default `peer.service` values for eligible spans using the v1 peer-service default algorithm; when disabled (default), Naming Schema v0 does not compute peer.service defaults.

`DD_TRACE_PEER_SERVICE_MAPPING`
: **Since**: 5.83.0 <br>
**Type**: `map`<br>
**Default**: `""`<br>
Maps detected peer service names to normalized values before they are attached to spans.

`DD_TRACE_PG_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables instrumentation for pg. When disabled, spans for pg operations are not created.

`DD_TRACE_PROPAGATION_BEHAVIOR_EXTRACT`
: **Since**: 5.83.0 <br>
**Type**: N/A<br>
**Default**: `'continue'`<br>
**Note**: This is only implemented in the .NET, Node.js, Python, and Java libraries.

`DD_TRACE_PROPAGATION_EXTRACT_FIRST`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
When set to true, stops extracting after the first successful trace context extraction.

`DD_TRACE_PROPAGATION_STYLE`
: **Since**: 5.83.0 <br>
**Type**: `array`<br>
**Default**: `datadog,tracecontext`<br>
A comma-separated list of header formats from which to attempt to inject and extract distributed tracing propagation data. The first format found with complete and valid headers is used to define the trace to continue. The more specific DD_TRACE_PROPAGATION_STYLE_INJECT and DD_TRACE_PROPAGATION_STYLE_EXTRACT configurations take priority when present.

`DD_TRACE_PROPAGATION_STYLE_EXTRACT`
: **Since**: 5.83.0 <br>
**Type**: `array`<br>
**Default**: `""`<br>
A comma-separated list of header formats from which to attempt to extract distributed tracing propagation data. The first format found with complete and valid headers is used to define the trace to continue.

`DD_TRACE_PROPAGATION_STYLE_INJECT`
: **Since**: 5.83.0 <br>
**Type**: `array`<br>
**Default**: `""`<br>
A comma-separated list of header formats to include to propagate distributed traces between services.

`DD_TRACE_RATE_LIMIT`
: **Since**: 5.83.0 <br>
**Type**: `int`<br>
**Default**: `100`<br>
Sets the maximum number of traces to sample per second; applies only when either DD_TRACE_SAMPLING_RULES or DD_TRACE_SAMPLE_RATE is set.

`DD_TRACE_REDIS_ENABLED`
: **Since**: 5.83.0 <br>
**Aliases**: `DD_TRACE_INTEGRATION_REDIS_ENABLED`, `DD_INTEGRATION_REDIS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables instrumentation for redis. When disabled, spans for redis operations are not created.

`DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
When enabled, disables inferred-services/integration service naming by making Naming Schema v0 not allow inferred services (so integrations that rely on inferred services fall back to application service naming)

`DD_TRACE_REPORT_HOSTNAME`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Whether to report the system's hostname for each trace. When disabled, the hostname of the Agent is used instead.

`DD_TRACE_RESOURCE_RENAMING_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Controls whether the http.endpoint tag is computed and added for incoming HTTP requests. This is disabled by default unless application security is enabled at startup, and can be explicitly enabled or disabled with this setting.

`DD_TRACE_SAMPLE_RATE`
: **Since**: 5.83.0 <br>
**Type**: N/A<br>
**Default**: `undefined`<br>
Controls the ingestion sample rate (between 0.0 and 1.0) between the Agent and the backend.

`DD_TRACE_SAMPLING_RULES`
: **Since**: 5.83.0 <br>
**Type**: `array`<br>
**Default**: `""`<br>
Configures custom sampling rules for traces. Rules are evaluated in order, and the first matching rule determines the sampling rate. If no rules match, the default sampling rate is used. For more information about how these configurations affect trace ingestion, see Ingestion Mechanisms.

`DD_TRACE_SCOPE`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Selects the async context propagation implementation used to keep trace context across asynchronous boundaries.

`DD_TRACE_SELENIUM_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: N/A<br>
**Default**: N/A<br>
Enables instrumentation for selenium. When disabled, spans for selenium operations are not created.

`DD_TRACE_SPAN_ATTRIBUTE_SCHEMA`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: `v0'`<br>
Selects the span attribute and naming schema version used by integrations. Supported values are v0 (default) and v1; invalid values fall back to v0.

`DD_TRACE_SPAN_LEAK_DEBUG`
: **Since**: 5.83.0 <br>
**Type**: `int`<br>
**Default**: `0`<br>
0: Disabled, 1: logging, 2: garbage collection + logging

`DD_TRACE_STARTUP_LOGS`
: **Since**: 5.83.0 <br>
**Type**: N/A<br>
**Default**: `false`<br>
Enable startup configuration and diagnostic log.

`DD_TRACE_STATS_COMPUTATION_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace-stats computation in the tracer for stats payload generation and ingestion-side metrics.

`DD_TRACE_TAGS`
: **Since**: 5.83.0 <br>
**Aliases**: `DD_TAGS`<br>
**Type**: `map`<br>
**Default**: N/A<br>
A list of default tags to be added to every span, profile, and JMX metric. If DD_ENV or DD_VERSION is used, it overrides any env or version tag defined in DD_TAGS. Available for versions 0.50.0+.

`DD_TRACE_WEBSOCKET_MESSAGES_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables tracing sent and received websocket messages (text and binary) and connection close events.

`DD_TRACE_WEBSOCKET_MESSAGES_INHERIT_SAMPLING`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
By default, websocket messages preserve the same sampling as the span captured during the handshake. This ensures that, if a handshake span has been sampled, all the messages in its session will also be sampled. To disable that behavior and sample each websocket message independently, set this configuration to `false`.

`DD_TRACE_WEBSOCKET_MESSAGES_SEPARATE_TRACES`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
By default, each received message generates a new trace. The handshake is linked to it as a span link. Setting this parameter to `false` causes all the spans captured during the session to be in the same trace.

`DD_TRACE_X_DATADOG_TAGS_MAX_LENGTH`
: **Since**: 5.83.0 <br>
**Type**: `int`<br>
**Default**: `512`<br>
Maximum length of the `x-datadog-tags` header for trace tag propagation. Set to 0 to disable.
