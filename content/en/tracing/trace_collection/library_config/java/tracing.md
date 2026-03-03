### Tracing

`DD_TRACE_128_BIT_TRACEID_GENERATION_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Controls whether new traces use 128-bit W3C trace IDs (32-character hexadecimal strings) or 64-bit Datadog trace IDs (16-character hexadecimal strings). The default is true to support W3C trace context propagation.

`DD_TRACE_128_BIT_TRACEID_LOGGING_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Controls whether 128-bit trace IDs are logged in their full 32-character format or truncated to 16 characters. Set to false for compatibility with systems that expect the shorter format.

`DD_TRACE_<INTEGRATION_NAME>_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables/disables instrumentations. When disabled, no span operations are not created for the specific instrumentation.
  
  Integrations:
  
  - AKKA_ACTOR
  - AKKA_ACTOR_MAILBOX
  - AKKA_ACTOR_RECEIVE
  - AKKA_ACTOR_SEND
  - AKKA_CONCURRENT
  - AKKA_HTTP2
  - AKKA_HTTP_CLIENT
  - AKKA_HTTP
  - AKKA_HTTP_SERVER
  - ALLOCATEDIRECT
  - AMQP
  - ANNOTATIONS_LEGACY_TRACING
  - APACHE_HTTPASYNCCLIENT5
  - APACHE_HTTPASYNCCLIENT
  - APACHE_HTTPCLIENT5
  - APACHE_HTTPCLIENT
  - APACHE_HTTPCORE_5
  - APACHE_HTTPCORE
  - APACHE_HTTP_CLIENT5
  - APACHE_HTTP_CLIENT
  - APACHE_HTTP_CORE_5
  - APACHE_HTTP_CORE
  - ARMERIA
  - ARMERIA_GRPC_CLIENT
  - ARMERIA_GRPC
  - ARMERIA_GRPC_SERVER
  - ARMERIA_JETTY
  - AUTH0_JWT
  - AVRO
  - AWS_DYNAMODB
  - AWS_PROPAGATION
  - AWS_S3
  - AWS_SDK_PROPAGATION
  - AXIS2
  - AXIS2_TRANSPORT
  - AXWAY_API
  - CAFFEINE
  - CASSANDRA
  - CI_VISIBILITY
  - CLASSLOADING
  - CLIENT_IP_RESOLVER
  - COMMONS_FILEUPLOAD
  - COMMONS_HTTP_CLIENT
  - CONFLUENT_SCHEMA_REGISTRY
  - CONSUMER_TASK
  - COUCHBASE_3
  - CUCUMBER_5
  - CXF
  - CXF_INVOKER
  - DATANUCLEUS
  - DB2
  - DBM
  - DBSTATEMENTRULE
  - DEFINECLASS
  - DIRECTALLOCATION
  - DO_NOT_TRACE_ANNOTATION
  - DROPWIZARD
  - DROPWIZARD_VIEW
  - DYNAMODB
  - ELASTICSEARCH_PARAMS
  - ELASTICSEARCH_REST_5
  - ELASTICSEARCH_REST_6
  - ELASTICSEARCH_REST_7
  - ELASTICSEARCH_REST
  - ELASTICSEARCH_TRANSPORT_2
  - ELASTICSEARCH_TRANSPORT_5
  - ELASTICSEARCH_TRANSPORT_6
  - ELASTICSEARCH_TRANSPORT_7
  - ELASTICSEARCH_TRANSPORT
  - EMR_AWS_SDK
  - EVENTBRIDGE
  - EVENTBRIDGE_INJECT_DATADOG_ATTRIBUTE
  - FILEITEMITERATOR
  - FILEITEMSTREAM
  - FILEITEM
  - FINATRA
  - FJP
  - FJP_WORKQUEUE
  - FORCEMANUALDROPTAGINTERCEPTOR
  - FORCEMANUALKEEPTAGINTERCEPTOR
  - FORCESAMPLINGPRIORITYTAGINTERCEPTOR
  - FREEMARKER
  - GLASSFISH
  - GOOGLE_HTTP_CLIENT
  - GOOGLE_PUBSUB
  - GOOGLE_PUBSUB_LEGACY_TRACING
  - GOOGLE_PUBSUB_PUBLISHER
  - GOOGLE_PUBSUB_RECEIVER
  - GRADLE_BUILD_LISTENER
  - GRADLE_BUILD_SCOPE_SERVICES
  - GRADLE_DAEMON_JVM_OPTIONS
  - GRADLE_DAEMON_LOGGING
  - GRADLE
  - GRADLE_PLUGIN_INJECTOR
  - GRAPHQL_JAVA
  - GRPC_CLIENT
  - GRPC_MESSAGE
  - GRPC_NETTY
  - GRPC_SERVER_CODE_ORIGIN
  - GRPC_SERVER
  - GSON
  - GUAVA
  - HEALTH_METRICS
  - HIBERNATE_CORE
  - HIBERNATE
  - HTTPASYNCCLIENT5
  - HTTPASYNCCLIENT
  - HTTPCLIENT5
  - HTTPCLIENT_REDIRECT
  - HTTPCORE_5
  - HTTPCORE
  - HTTPURLCONNECTION
  - HYSTRIX
  - IASTINSTRUMENTATION
  - IAST_RESULTSET
  - INPUTSTREAM
  - INTEGRATION_DROPWIZARD_MATCHING_SHORTCUT
  - INTEGRATION_GRPC_MATCHING_SHORTCUT
  - INTEGRATION_HIBERNATE_MATCHING_SHORTCUT
  - JACKSON_1
  - JACKSON_2_12
  - JACKSON_2_16
  - JACKSON_2_6
  - JACKSON_2_8
  - JACKSON_2
  - JACKSON_CORE
  - JACKSON
  - JACOCO
  - JAKARTARS
  - JAKARTA_JMS
  - JAKARTA_MAIL_BODY
  - JAKARTA_MAIL
  - JAKARTA_MAIL_TRANSPORT
  - JAKARTA_RS_ANNOTATIONS
  - JAKARTA_RS
  - JAKARTA_RS_FILTER
  - JAKARTA_WS
  - JAVAX_MAIL_BODY
  - JAVAX_MAIL
  - JAVAX_MAIL_TRANSPORT
  - JAVA_COMPLETABLEFUTURE
  - JAVA_CONCURRENT
  - JAVA_CONCURRENT_OTHER
  - JAVA_HTTP_CLIENT
  - JAVA_LANG_APPSEC
  - JAVA_LANG_MANAGEMENT
  - JAVA_TIMER
  - JAXRS
  - JAX_RS_ANNOTATIONS
  - JAX_RS_CLIENT
  - JAX_RS
  - JAX_RS_EXCEPTION_AS_ERROR
  - JAX_RS_FILTER
  - JAX_WS
  - JBOSS_LOGMANAGER
  - JBOSS_MODULES
  - JDBC
  - JDBC_RESULTSET
  - JEDIS
  - JEE_ENV_ENTRY
  - JERSEY
  - JETTY_CLIENT
  - JETTY_CONCURRENT
  - JETTY
  - JMS_1
  - JMS_2
  - JMS
  - JMS_LEGACY_TRACING
  - JMS_PROPAGATION
  - JMS_TIME_IN_QUEUE
  - JNI
  - JOSE_JWT
  - JSP_COMPILE
  - JSP
  - JSP_RENDER
  - JUNIT4
  - JUNIT_38
  - JUNIT_4_CUCUMBER
  - JUNIT_4
  - JUNIT_4_MUNIT
  - JUNIT_5_CUCUMBER
  - JUNIT_5
  - JUNIT_5_SPOCK
  - JWT
  - KAFKA_0_11
  - KAFKA_3_8
  - KAFKA_CLIENT_PROPAGATION
  - KAFKA_CONNECT
  - KAFKA_LEGACY_TRACING
  - KAFKA_PROPAGATION
  - KAFKA_STREAMS
  - KAFKA_TIME_IN_QUEUE
  - KARATE
  - KOTLIN_COROUTINE
  - LETTUCE_4_ASYNC
  - LETTUCE_4
  - LETTUCE_5_ASYNC
  - LETTUCE_5
  - LETTUCE_5_RX
  - LETTUCE
  - LIBERTY_CLASSLOADING
  - LIBERTY
  - LOG4J_1
  - LOG4J_2
  - LOG4J
  - LOGBACK
  - LOGS_INTAKE
  - LOGS_INTAKE_LOG4J_2
  - MAVEN
  - MICRONAUT
  - MICRONAUT_HTTP_SERVER_NETTY_2
  - MICRONAUT_HTTP_SERVER_NETTY_3
  - MICRONAUT_HTTP_SERVER_NETTY_4
  - MICRONAUT_HTTP_SERVER_NETTY
  - MICRONAUT_SPAN_ORIGIN
  - MMAP
  - MONGO_3_1
  - MONGO_3_4
  - MONGO_REACTIVESTREAMS
  - MULE_JPMS
  - MULTIPART
  - NATIVE_IMAGE
  - NETTY_3_8
  - NETTY_4_0
  - NETTY_4_1
  - NETTY_4_1_HTTP2
  - NETTY_CONCURRENT
  - NETTY
  - NETTY_EVENT_EXECUTOR
  - NEW_TASK_FOR
  - NOT_NOT_TRACE
  - OGNL
  - OKHTTP_2
  - OKHTTP_3
  - OKHTTP
  - OPENSEARCH_REST
  - OPENSEARCH_TRANSPORT
  - OPENTRACING
  - OPENTRACING_GLOBALTRACER
  - ORG_JSON
  - OSGI
  - PEER_HOSTNAME
  - PEKKO_ACTOR
  - PEKKO_ACTOR_MAILBOX
  - PEKKO_ACTOR_RECEIVE
  - PEKKO_ACTOR_SEND
  - PEKKO_CONCURRENT
  - PEKKO_HTTP2
  - PEKKO_HTTP_CLIENT
  - PEKKO_HTTP
  - PEKKO_HTTP_SERVER
  - PLAY_ACTION
  - PLAY
  - PLAY_WS
  - POWERMOCK
  - PROPAGATION_STYLE_B3_PADDING
  - PROTOBUF
  - QUARTZ
  - RABBITMQ
  - RABBITMQ_LEGACY_TRACING
  - RABBITMQ_PROPAGATION
  - RABBITMQ_TIME_IN_QUEUE
  - RABBIT_LEGACY_TRACING
  - RABBIT_PROPAGATION
  - RABBIT_TIME_IN_QUEUE
  - RATPACK
  - RATPACK_REQUEST_BODY
  - REACTIVE_STREAMS_1
  - REACTIVE_STREAMS
  - REACTOR_CORE
  - REACTOR_NETTY_1
  - REACTOR_NETTY
  - REDISCALA_CONNECTION
  - REDISCALA
  - REDISSON
  - REJECTED_EXECUTION_HANDLER
  - RESILIENCE4J
  - RESILIENCE4J_REACTOR
  - RESOLVER
  - RESOURCENAMERULE
  - RESPONSE
  - RESTEASY
  - RESTLET_HTTP
  - RESTLET_HTTP_SERVER
  - RMI_CLIENT_CONTEXT_PROPAGATOR
  - RMI_CLIENT
  - RMI_CONTEXT_PROPAGATOR
  - RMI
  - RMI_SERVER_CONTEXT_PROPAGATOR
  - RMI_SERVER
  - RUNNABLE
  - RUNNABLE_FUTURE
  - RXJAVA
  - S3
  - SCALATEST
  - SCALA_CONCURRENT
  - SCALA_FUTURE_OBJECT
  - SCALA_PROMISE_COMPLETE
  - SCALA_PROMISE_RESOLVE
  - SERVELET_RESPONSE
  - SERVICENAMETAGINTERCEPTOR
  - SERVICETALK_CONCURRENT
  - SERVICETALK
  - SERVICE_DISCOVERY
  - SERVLETCONTEXTTAGINTERCEPTOR
  - SERVLET_2
  - SERVLET_3_ASYNC_CONTEXT
  - SERVLET_3
  - SERVLET_5_ASYNC_CONTEXT
  - SERVLET_5
  - SERVLET_COOKIE
  - SERVLET_DISPATCHER
  - SERVLET
  - SERVLET_REQUEST_BODY
  - SERVLET_REQUEST
  - SERVLET_RESPONSE
  - SERVLET_SESSION
  - SETUP_TEARDOWN
  - SFN
  - SFN_INJECT_DATADOG_ATTRIBUTE
  - SHUTDOWN
  - SLICK
  - SNAKEYAML
  - SNS
  - SNS_INJECT_DATADOG_ATTRIBUTE
  - SOCKET
  - SPRAY_HTTP
  - SPRAY_HTTP_SERVER
  - SPRING_ASYNC
  - SPRING_BEANS
  - SPRING_BOOT
  - SPRING_BOOT_SPAN_ORIGIN
  - SPRING_CLOUD_ZUUL
  - SPRING_CORE
  - SPRING_DATA
  - SPRING_JMS
  - SPRING_MESSAGING_4
  - SPRING_MESSAGING
  - SPRING_PATH_FILTER
  - SPRING_RABBIT
  - SPRING_SCHEDULING
  - SPRING_SECURITY
  - SPRING_WEBFLUX_CLIENT
  - SPRING_WEBFLUX
  - SPRING_WEBFLUX_FUNCTIONAL
  - SPRING_WEB_CODE_ORIGIN
  - SPRING_WEB
  - SPRING_WS_2
  - SPRING_WS
  - SPYMEMCACHED
  - SQS
  - SQS_INJECT_DATADOG_ATTRIBUTE
  - SQS_LEGACY_TRACING
  - SQS_PROPAGATION
  - SQS_TIME_IN_QUEUE
  - SSLSOCKET
  - STATUS404DECORATOR
  - STATUS404RULE
  - STRUCTURED_TASK_SCOPE_21
  - STRUCTURED_TASK_SCOPE_25
  - STRUCTURED_TASK_SCOPE
  - SUREFIRE
  - SYNAPSE3_CLIENT
  - SYNAPSE3
  - SYNAPSE3_SERVER
  - TASK_RUNNER
  - TASK_UNWRAPPING
  - TESTNG_6
  - TESTNG_7
  - TESTNG
  - TESTNG_ITR
  - TEST_ORDER
  - TEST_RETRY
  - THROWABLES
  - THYMELEAF
  - TIBCO_BW
  - TIBCO
  - TINYLOG
  - TOMCAT_CLASSLOADING
  - TOMCAT
  - TOMCAT_WEBSOCKET
  - TRACER_METRICS
  - TRACE_ANNOTATION
  - TRACE_CONFIG
  - TRACE
  - TWILIO_SDK
  - UNDERTOW_2_0
  - UNDERTOW_2_2
  - UNDERTOW
  - UNDERTOW_LEGACY_TRACING
  - UNDERTOW_REQUEST_PARSE
  - URLASRESOURCENAMERULE
  - VALKEY
  - VELOCITY
  - VERTX_3_4
  - VERTX_3_5
  - VERTX_3_9
  - VERTX_4_0
  - VERTX_5_0
  - VERTX
  - VERTX_REDIS_CLIENT
  - VERTX_SQL_CLIENT
  - WALLCLOCK
  - WEAVER
  - WEBSPHERE_JMX
  - WILDFLY

`DD_TRACE_AEROSPIKE_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_AEROSPIKE_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the Aerospike integration

`DD_TRACE_AEROSPIKE_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_AEROSPIKE_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the Aerospike integration

`DD_TRACE_AEROSPIKE_ENABLED`
: **Since**: 1.55.0 <br>
**Aliases**: `DD_INTEGRATION_AEROSPIKE_ENABLED`, `DD_TRACE_INTEGRATION_AEROSPIKE_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `true`<br>
No description available.

`DD_TRACE_AGENT_ARGS`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Azure App Services: extra command-line arguments for launching the external `trace-agent` process (whitespace/comma-separated). If unset, no extra args are passed.

`DD_TRACE_AGENT_PATH`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Azure App Services: path to the external `trace-agent` executable to launch. If unset, the tracer will not start the external trace-agent process.

`DD_TRACE_AGENT_PORT`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_AGENT_PORT`<br>
**Type**: `int`<br>
**Default**: `-1`<br>
Sets the port where profiles are sent (the port where the Agent is listening for connections). Ignored if `DD_TRACE_AGENT_URL` is set. Defaults to`8126`.

`DD_TRACE_AGENT_TIMEOUT`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `10`<br>
Timeout in seconds for network interactions with the Datadog Agent.

`DD_TRACE_AGENT_UNIX_DOMAIN_SOCKET`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
This can be used to direct trace traffic to a proxy, to later be sent to a remote Datadog Agent.

`DD_TRACE_AGENT_URL`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_TRACE_URL`<br>
**Type**: `string`<br>
**Default**: `""`<br>
Sets the URL endpoint where profiles are sent. Overrides `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT` if set. Defaults to `http://<DD_AGENT_HOST>:<DD_TRACE_AGENT_PORT>`.

`DD_TRACE_AGENT_V0_5_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Datadog Agent communication: when enabled, allows using and probing the Datadog Agent trace intake `v0.5/traces` endpoint (preferred over v0.4/v0.3 when available). Default: false.

`DD_TRACE_AKKA_FORK_JOIN_EXECUTOR_TASK_NAME`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `""`<br>
Akka concurrency instrumentation: fully qualified class name of a custom/shaded `AkkaForkJoinTask` wrapper to instrument for context propagation (used as a configured matching type). Default: empty (use built-in Akka class).

`DD_TRACE_AKKA_FORK_JOIN_POOL_NAME`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `""`<br>
Akka concurrency instrumentation: fully qualified class name of a custom/shaded Akka ForkJoinPool to instrument for context propagation (used as a configured matching type). Default: empty (use built-in Akka class).

`DD_TRACE_AKKA_FORK_JOIN_TASK_NAME`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `""`<br>
Akka concurrency instrumentation: fully qualified class name of a custom/shaded `ForkJoinTask` subclass to instrument for context propagation. When set, the instrumentation also matches the configured class in addition to the default Akka `ForkJoinTask`. Default: empty (use built-in Akka class).

`DD_TRACE_AKKA_HTTP_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_AKKA_HTTP_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by Akka HTTP tracing

`DD_TRACE_AKKA_HTTP_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_AKKA_HTTP_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by Akka HTTP spans

`DD_TRACE_AKKA_HTTP_CLIENT_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_AKKA_HTTP_CLIENT_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by Akka HTTP client request tracing

`DD_TRACE_AKKA_HTTP_CLIENT_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_AKKA_HTTP_CLIENT_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by Akka HTTP client request spans

`DD_TRACE_AKKA_HTTP_SERVER_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_AKKA_HTTP_SERVER_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by Akka HTTP server request tracing

`DD_TRACE_AKKA_HTTP_SERVER_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_AKKA_HTTP_SERVER_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by Akka HTTP server request spans

`DD_TRACE_AMQP_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_AMQP_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by RabbitMQ AMQP instrumentation (publish/consume and Channel command spans)

`DD_TRACE_AMQP_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_AMQP_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by RabbitMQ AMQP spans

`DD_TRACE_AMQP_E2E_DURATION_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_AMQP_E2E_DURATION_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
AMQP/RabbitMQ instrumentation: when enabled, records end-to-end duration for messaging spans (sets `record.e2e_duration_ms` when the end-to-end start time is available). Default: false.

`DD_TRACE_ANALYTICS_ENABLED`
: **Since**: 1.55.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables Trace Analytics by default. When enabled for an integration, instrumentations set the `analytics.sample_rate` metric on spans (using the configured per-integration sample rate). Default: false.

`DD_TRACE_ANNOTATIONS`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
A list of method annotations to treat as `@Trace`.

`DD_TRACE_ANNOTATION_ASYNC`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
`@Trace` / trace-annotations instrumentation: when enabled, adds async support by finishing spans when async return values complete (instead of finishing immediately on method return). Default: false.

`DD_TRACE_APACHE_HTTPASYNCCLIENT_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_APACHE_HTTPASYNCCLIENT_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the ApacheHttpAsyncClient integration

`DD_TRACE_APACHE_HTTPASYNCCLIENT_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_APACHE_HTTPASYNCCLIENT_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the ApacheHttpAsyncClient integration

`DD_TRACE_APACHE_HTTPCLIENT5_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_APACHE_HTTPCLIENT5_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the ApacheHttpClient integration

`DD_TRACE_APACHE_HTTPCLIENT5_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_APACHE_HTTPCLIENT5_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the ApacheHttpClient integration

`DD_TRACE_APACHE_HTTPCLIENT_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_APACHE_HTTPCLIENT_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by Apache HttpClient request tracing

`DD_TRACE_APACHE_HTTPCLIENT_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_APACHE_HTTPCLIENT_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by Apache HttpClient request spans

`DD_TRACE_APACHE_HTTP_CLIENT5_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_APACHE_HTTP_CLIENT5_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the ApacheHttpClient integration

`DD_TRACE_APACHE_HTTP_CLIENT5_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_APACHE_HTTP_CLIENT5_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the ApacheHttpClient integration

`DD_TRACE_APACHE_HTTP_CLIENT_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_APACHE_HTTP_CLIENT_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the ApacheHttpClient integration

`DD_TRACE_APACHE_HTTP_CLIENT_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_APACHE_HTTP_CLIENT_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the ApacheHttpClient integration

`DD_TRACE_APACHE_SPARK_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_TRACE_INTEGRATION_APACHE_SPARK_ENABLED`, `DD_INTEGRATION_APACHE_SPARK_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables Apache Spark instrumentation (injects Datadog listeners to trace Spark application/job execution and capture Spark SQL plan metadata; can also integrate with OpenLineage when enabled)

`DD_TRACE_ARMERIA_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_ARMERIA_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by Armeria tracing (gRPC client/server calls)

`DD_TRACE_ARMERIA_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_ARMERIA_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by Armeria spans

`DD_TRACE_ARMERIA_GRPC_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_ARMERIA_GRPC_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by Armeria gRPC tracing

`DD_TRACE_ARMERIA_GRPC_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_ARMERIA_GRPC_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by Armeria gRPC spans

`DD_TRACE_ARMERIA_GRPC_CLIENT_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_ARMERIA_GRPC_CLIENT_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the ArmeriaGrpcClient integration

`DD_TRACE_ARMERIA_GRPC_CLIENT_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_ARMERIA_GRPC_CLIENT_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the ArmeriaGrpcClient integration

`DD_TRACE_ARMERIA_GRPC_MESSAGE_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_INTEGRATION_ARMERIA_GRPC_MESSAGE_ENABLED`, `DD_TRACE_INTEGRATION_ARMERIA_GRPC_MESSAGE_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Armeria gRPC instrumentation: enables message-level spans. When enabled, creates a `grpc.message` span for each received message (e.g., streaming responses) on the client side. Default: false.

`DD_TRACE_ARMERIA_GRPC_SERVER_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_ARMERIA_GRPC_SERVER_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the HandlerRegistryBuilder integration

`DD_TRACE_ARMERIA_GRPC_SERVER_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_ARMERIA_GRPC_SERVER_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the HandlerRegistryBuilder integration

`DD_TRACE_AWSADD_SPAN_POINTERS`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_AWSADD_SPAN_POINTERS`<br>
**Type**: `boolean`<br>
**Default**: `true`<br>
AWS: when enabled, adds span pointers (span links) to spans for supported AWS operations (e.g., S3 object and DynamoDB item) so the touched resource can be uniquely identified. Default: true.

`DD_TRACE_AWS_LAMBDA_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_TRACE_INTEGRATION_AWS_LAMBDA_ENABLED`, `DD_INTEGRATION_AWS_LAMBDA_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables AWS Lambda (LambdaHandler) instrumentation

`DD_TRACE_AWS_SDK_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_AWS_SDK_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by AWS SDK request tracing

`DD_TRACE_AWS_SDK_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_AWS_SDK_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by AWS SDK request spans

`DD_TRACE_AWS_SDK_E2E_DURATION_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_AWS_SDK_E2E_DURATION_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
AWS SDK (SQS) messaging: when enabled, records end-to-end duration on SQS message consumer spans (sets `record.e2e_duration_ms`). Default: false.

`DD_TRACE_AWS_SDK_ENABLED`
: **Since**: 1.55.0 <br>
**Aliases**: `DD_TRACE_INTEGRATION_AWS_SDK_ENABLED`, `DD_INTEGRATION_AWS_SDK_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `true`<br>
No description available.

`DD_TRACE_AWS_SDK_LEGACY_TRACING_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_AWS_SDK_LEGACY_TRACING_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
AWS SDK instrumentation: enables legacy tracing behavior (affects service naming and span structure). When disabled, the tracer avoids creating extra underlying Netty HTTP client spans for AWS SDK calls. Default: false.

`DD_TRACE_AXIS2_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_AXIS2_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the Axis2 integration

`DD_TRACE_AXIS2_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_AXIS2_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the Axis2 integration

`DD_TRACE_AXIS_PROMOTE_RESOURCE_NAME`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Axis2: when enabled, promotes the SOAP action (or destination address) extracted from Axis2 messages to the local root span resource name for server-side traces. Default: false.

`DD_TRACE_AXIS_TRANSPORT_CLASS_NAME`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `""`<br>
Axis2: fully qualified class name of a custom transport sender to instrument. When set, the tracer instruments that transport sender (in addition to known defaults) to create `axis2.transport` spans and inject propagation headers. Default: empty.

`DD_TRACE_AXWAY_HTTP_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_AXWAY_HTTP_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the AxwayHTTPPlugin integration

`DD_TRACE_AXWAY_HTTP_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_AXWAY_HTTP_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the AxwayHTTPPlugin integration

`DD_TRACE_AZURE_FUNCTIONS_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_AZURE_FUNCTIONS_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the AzureFunctions integration

`DD_TRACE_AZURE_FUNCTIONS_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_AZURE_FUNCTIONS_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the AzureFunctions integration

`DD_TRACE_AZURE_FUNCTIONS_ENABLED`
: **Since**: 1.55.0 <br>
**Aliases**: `DD_INTEGRATION_AZURE_FUNCTIONS_ENABLED`, `DD_TRACE_INTEGRATION_AZURE_FUNCTIONS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `true`<br>
No description available.

`DD_TRACE_BAGGAGE_MAX_BYTES`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `8192`<br>
Configuration key to set the maximum number of bytes that can be injected into the baggage header when propagating to a downstream service. Default value is 8192 bytes.

`DD_TRACE_BAGGAGE_MAX_ITEMS`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `64`<br>
Configuration key to set the maximum number of items that can be injected into the baggage header when propagating to a downstream service. Default value is 64 items.

`DD_TRACE_BAGGAGE_TAG_KEYS`
: **Since**: 1.54.0 <br>
**Type**: `array`<br>
**Default**: `["user.id", "session.id", "account.id"]`<br>
**Supported Input**: A comma-separated string representing a list of case-sensitive baggage keys **Caveats**: Not supported in C++ **Description**: A comma-separated list of baggage keys that are automatically applied as span tags to the local root span. For example, a baggage key `user.id` is tagged as `baggage.user.id` This feature only applies to baggage extracted from incoming HTTP headers. Baggage set with the baggage API is not included. - To tag all baggage items, set the value to `*`. Use this with caution to avoid exposing sensitive data in tags. - To disable this feature, set the value to an empty string.

`DD_TRACE_CASSANDRA_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_CASSANDRA_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by Datastax Cassandra driver tracing

`DD_TRACE_CASSANDRA_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_CASSANDRA_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by Cassandra driver spans

`DD_TRACE_CASSANDRA_KEYSPACE_STATEMENT_EXTRACTION_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
By default, the keyspace is extracted only if it is configured during session creation. When set to `true`, the keyspace can also be extracted by examining the metadata in the query results.

`DD_TRACE_CLASSES_EXCLUDE`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
A list of fully qualified classes (that may end with a wildcard to denote a prefix) which will be ignored (not modified) by the tracer. Must use the jvm internal representation for names (eg package.ClassName$Nested and not package.ClassName.Nested)

`DD_TRACE_CLASSES_EXCLUDE_FILE`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Instrumentation: path to a file containing additional class/package excludes. Classes matching entries from this file are globally ignored (not instrumented).

`DD_TRACE_CLASSLOADERS_DEFER`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Instrumentation deferral: list of classloader class names for which integration matching should be deferred until a later retransformation (when integration deferral is enabled). Default: empty.

`DD_TRACE_CLASSLOADERS_EXCLUDE`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Instrumentation: list of classloader class names to skip entirely (no matching/instrumentation), to avoid instrumenting code loaded by specific classloaders. Default: empty.

`DD_TRACE_CLIENT_IP_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables or disables the automatic collection of client IP addresses from HTTP request headers. When enabled, the IP address is stored in the http.client_ip span tag.

`DD_TRACE_CLIENT_IP_HEADER`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `""`<br>
Configures a custom header name from which to source the http.client_ip tag value. If this variable is set, all other IP-related headers are ignored (for example, setting DD_TRACE_CLIENT_IP_HEADER=custom-ip-header and including the header custom-ip-header: 5.6.7.9 in a request results in a span tagged with "http.client_ip": "5.6.7.9"). If an empty string or null value is passed, IP headers are queried in this order: - x-forwarded-for - x-real-ip - true-client-ip - x-client-ip - x-forwarded - forwarded-for - x-cluster-client-ip - fastly-client-ip - cf-connecting-ip - cf-connecting-ipv6

`DD_TRACE_CLOCK_SYNC_PERIOD`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `30`<br>
Tracer clock: period (in seconds) between re-synchronizing the wall-clock time reference used when converting monotonic nano ticks into timestamps, to limit drift. Default: 30s.

`DD_TRACE_CLOUD_PAYLOAD_TAGGING_MAX_DEPTH`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `10`<br>
An integer representing the maximum depth of an AWS SDK request/reponse payload to use for AWS payload tagging.

`DD_TRACE_CLOUD_PAYLOAD_TAGGING_MAX_TAGS`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `758`<br>
An integer representing the maximum number of tags to extract per a span to be used for AWS payload tagging.

`DD_TRACE_CLOUD_PAYLOAD_TAGGING_SERVICES`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `["S3", "Sqs", "Kinesis", "Sns", "DynamoDB", "ApiGatewayV2", "EventBridge", "ApiGateway"]`<br>
To enable AWS payload tagging for additional services, use this setting.

`DD_TRACE_CLOUD_REQUEST_PAYLOAD_TAGGING`
: **Since**: 1.54.0 <br>
**Type**: `array`<br>
**Default**: N/A<br>
A comma-separated string of JSONPath entries to redact from AWS SDK requests. Setting this enables AWS payload tagging for requests.

`DD_TRACE_CLOUD_RESPONSE_PAYLOAD_TAGGING`
: **Since**: 1.54.0 <br>
**Type**: `array`<br>
**Default**: N/A<br>
A comma-separated string of JSONPath entries to redact from AWS SDK responses. Setting this enables AWS payload tagging for responses.

`DD_TRACE_CODESOURCES_EXCLUDE`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Instrumentation: excludes classes from instrumentation based on their code source location. If the class's code source path contains any configured substring, it is ignored (not instrumented). Default: empty.

`DD_TRACE_COMMONS_HTTP_CLIENT_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_COMMONS_HTTP_CLIENT_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by Apache Commons HttpClient request tracing

`DD_TRACE_COMMONS_HTTP_CLIENT_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_COMMONS_HTTP_CLIENT_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by Apache Commons HttpClient request spans

`DD_TRACE_CONFIG`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Path to valid Java properties file which contains the agent configuration **Notes**: When OTEL_JAVAAGENT_CONFIGURATION_FILE and DD_TRACE_CONFIG are both set we apply the configuration from both files. This is an exception to the usual rule where the Datadog setting overrides the OTel one

`DD_TRACE_COUCHBASE_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_COUCHBASE_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by Couchbase Java SDK tracing

`DD_TRACE_COUCHBASE_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_COUCHBASE_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by Couchbase Java SDK spans

`DD_TRACE_COUCHBASE_ENABLED`
: **Since**: 1.55.0 <br>
**Aliases**: `DD_INTEGRATION_COUCHBASE_ENABLED`, `DD_TRACE_INTEGRATION_COUCHBASE_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `true`<br>
No description available.

`DD_TRACE_CUCUMBER_5_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_CUCUMBER_5_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the Cucumber integration

`DD_TRACE_CUCUMBER_5_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_CUCUMBER_5_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the Cucumber integration

`DD_TRACE_CUCUMBER_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_CUCUMBER_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the Cucumber integration

`DD_TRACE_CUCUMBER_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_CUCUMBER_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the Cucumber integration

`DD_TRACE_CUCUMBER_ENABLED`
: **Since**: 1.55.0 <br>
**Aliases**: `DD_INTEGRATION_CUCUMBER_ENABLED`, `DD_TRACE_INTEGRATION_CUCUMBER_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `true`<br>
No description available.

`DD_TRACE_DATANUCLEUS_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_DATANUCLEUS_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the Datanucleus integration

`DD_TRACE_DATANUCLEUS_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_DATANUCLEUS_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the Datanucleus integration

`DD_TRACE_DBCP2_ENABLED`
: **Since**: 1.56.0 <br>
**Aliases**: `DD_INTEGRATION_DBCP2_ENABLED`, `DD_TRACE_INTEGRATION_DBCP2_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables Apache Commons DBCP2 JDBC pool waiting instrumentation (emits `pool.waiting` spans when the pool blocks while borrowing a connection)

`DD_TRACE_DB_CLIENT_SPLIT_BY_HOST`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
When set to `true` db spans get assigned the remote database hostname as the service name

`DD_TRACE_DB_CLIENT_SPLIT_BY_INSTANCE`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Set the service name of HTTP requests to `pdo- `. For example, a `PDO->query()` call to a database host `datadoghq.com` has the service name `pdo-datadoghq.com` instead of the default service name of `pdo`.

`DD_TRACE_DB_CLIENT_SPLIT_BY_INSTANCE_TYPE_SUFFIX`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Database client service naming: when `DD_TRACE_DB_CLIENT_SPLIT_BY_INSTANCE` is enabled, appends the database type suffix to the instance service name (uses `<instance>-<dbType>` instead of `<instance>`). Default: false.

`DD_TRACE_DB_METADATA_FETCHING_ON_CONNECT`
: **Since**: 1.57.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Whether to fetch database metadata on connect

`DD_TRACE_DB_METADATA_FETCHING_ON_QUERY`
: **Since**: 1.57.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Whether to fetch database metadata on query

`DD_TRACE_DEBUG`
: **Since**: 1.54 <br>
**Aliases**: `OTEL_LOG_LEVEL`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enable debug logging in the tracer. Use OTEL_LOG_LEVEL as an alias

`DD_TRACE_ELASTICSEARCH_ANALYTICS_ENABLED`
: **Since**: 1.55.0 <br>
**Aliases**: `DD_ELASTICSEARCH_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
No description available.

`DD_TRACE_ELASTICSEARCH_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.55.0 <br>
**Aliases**: `DD_ELASTICSEARCH_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the Elasticsearch integration.

`DD_TRACE_ELASTICSEARCH_BODY_AND_PARAMS_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Elasticsearch/OpenSearch REST client instrumentation: when enabled, captures both request body and query parameters as span tags (e.g., `elasticsearch.body` + `elasticsearch.params`). Default: false.

`DD_TRACE_ELASTICSEARCH_BODY_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
When set to `true`, the body is added to Elasticsearch and OpenSearch spans.

`DD_TRACE_ELASTICSEARCH_ENABLED`
: **Since**: 1.55.0 <br>
**Aliases**: `DD_TRACE_INTEGRATION_ELASTICSEARCH_ENABLED`, `DD_INTEGRATION_ELASTICSEARCH_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `true`<br>
No description available.

`DD_TRACE_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
**Default**: true Enable web framework and library instrumentation. When false, the application code doesn't generate any traces. See also DD_APM_TRACING_ENABLED.

`DD_TRACE_EXECUTORS`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Java concurrent instrumentation: list of additional executor class names to instrument for async context propagation. Default: empty.

`DD_TRACE_EXECUTORS_ALL`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Java concurrent instrumentation: when enabled, instruments all `java.util.concurrent.Executor` implementations for async context propagation (instead of only known types + those in `DD_TRACE_EXECUTORS`). Default: false.

`DD_TRACE_EXPERIMENTAL_FEATURES_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `""`<br>
**Supported Input**: A comma-separated list of configuration options that support experimental features. **Supported Values**: `all`, `DD_TAGS` (Java, .NET) **Caveats**: Only supported in Java and .NET **Description**: Enables experimental features for specific configuration options. When enabled, these features may provide additional functionality but are not yet considered stable and may change or be removed in future releases. You can enable all experimental features using the keyword `all`, or list individual features explicitly.

`DD_TRACE_EXPERIMENTAL_JDBC_POOL_WAITING_ENABLED`
: **Since**: 1.55.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
JDBC connection pool instrumentation: when enabled, creates `pool.waiting` spans to measure time spent blocked waiting for a connection from the pool (e.g., HikariCP/DBCP2). Spans are only created when blocking is detected. Default: false.

`DD_TRACE_EXPERIMENTAL_JEE_SPLIT_BY_DEPLOYMENT`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
JEE split-by-deployment: when enabled (and the service name is not explicitly set), allows overriding span service names using per-classloader contextual service name, so different deployments (webapps) can be reported as separate services. Default: false.

`DD_TRACE_EXPERIMENTAL_KEEP_LATENCY_THRESHOLD_MS`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `0`<br>
Trace latency keep rule: when set to a positive value (milliseconds) and partial flush is disabled, forces traces whose local root span duration exceeds the threshold to be kept (sets `manual.keep=true`). Default: 0 (disabled).

`DD_TRACE_EXPERIMENTAL_LONG_RUNNING_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Long-running traces: when enabled, tracks in-progress traces and periodically flushes running spans to the Datadog Agent (requires agent support for long-running traces). Default: false.

`DD_TRACE_EXPERIMENTAL_LONG_RUNNING_FLUSH_INTERVAL`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `120`<br>
Long-running traces: periodic flush interval (seconds) between running-span flushes after the first flush. Valid range: 20-450 seconds; default: 120.

`DD_TRACE_EXPERIMENTAL_LONG_RUNNING_INITIAL_FLUSH_INTERVAL`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `20`<br>
Long-running traces: initial flush interval (seconds) before the first running-span flush is written for a long-running trace. Valid range: 10-450 seconds; default: 20.

`DD_TRACE_EXTENSIONS_PATH`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
A comma-separated list of paths to extension jar files, or folders containing jar files. If pointing to a folder, every jar file in that folder is treated as a separate, independent extension.

`DD_TRACE_FINATRA_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_FINATRA_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the Finatra integration

`DD_TRACE_FINATRA_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_FINATRA_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the Finatra integration

`DD_TRACE_FLUSH_INTERVAL`
: **Since**: 1.54.0 <br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Trace writer flush interval (seconds): controls how often the tracer flushes/sends traces. Default: 1.0s.

`DD_TRACE_GIT_METADATA_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Git metadata: when enabled, adds git repository URL and commit SHA tags to the root span (used for linking traces to source code). Default: true.

`DD_TRACE_GLOBAL_TAGS`
: **Since**: 1.54.0 <br>
**Type**: `map`<br>
**Default**: N/A<br>
Global tags: key/value tags applied everywhere (on all spans and runtime metrics). Merged from `dd.trace.global.tags` (legacy) and `dd.tags`/`dd.trace.tags` (and adjusted by `DD_ENV`/`DD_VERSION`). Default: empty.

`DD_TRACE_GOOGLE_HTTP_CLIENT_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_GOOGLE_HTTP_CLIENT_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the GoogleHttpClient integration

`DD_TRACE_GOOGLE_HTTP_CLIENT_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_GOOGLE_HTTP_CLIENT_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the GoogleHttpClient integration

`DD_TRACE_GOOGLE_PUBSUB_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_GOOGLE_PUBSUB_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the GooglePubSub integration

`DD_TRACE_GOOGLE_PUBSUB_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_GOOGLE_PUBSUB_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the GooglePubSub integration

`DD_TRACE_GOOGLE_PUBSUB_E2E_DURATION_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_GOOGLE_PUBSUB_E2E_DURATION_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Google Pub/Sub messaging spans: when enabled, begins end-to-end duration tracking on Pub/Sub producer/consumer spans (calls `beginEndToEnd()`), allowing `record.e2e_duration_ms` to be recorded when spans are finished with end-to-end semantics. Default: false.

`DD_TRACE_GOOGLE_PUBSUB_IGNORED_GRPC_METHODS`
: **Since**: 1.54.0 <br>
**Type**: `array`<br>
**Default**: `["google.pubsub.v1.Subscriber/ModifyAckDeadline", "google.pubsub.v1.Subscriber/Acknowledge", "google.pubsub.v1.Subscriber/Pull", "google.pubsub.v1.Subscriber/StreamingPull", "google.pubsub.v1.Publisher/Publish"]`<br>
Google Pub/Sub: list of gRPC methods to ignore for outbound gRPC instrumentation, to silence Pub/Sub client gRPC calls (defaults include `Subscriber/*` and `Publisher/Publish`).

`DD_TRACE_GRAPHQL_JAVA_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_GRAPHQL_JAVA_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by graphql-java tracing

`DD_TRACE_GRAPHQL_JAVA_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_GRAPHQL_JAVA_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by graphql-java spans

`DD_TRACE_GRIZZLY_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_GRIZZLY_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by Grizzly HTTP server request tracing

`DD_TRACE_GRIZZLY_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_GRIZZLY_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by Grizzly HTTP server spans

`DD_TRACE_GRIZZLY_CLIENT_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_GRIZZLY_CLIENT_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the GrizzlyClient integration

`DD_TRACE_GRIZZLY_CLIENT_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_GRIZZLY_CLIENT_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the GrizzlyClient integration

`DD_TRACE_GRIZZLY_CLIENT_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_TRACE_INTEGRATION_GRIZZLY_CLIENT_ENABLED`, `DD_INTEGRATION_GRIZZLY_CLIENT_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables Grizzly Client (GrizzlyClient) instrumentation

`DD_TRACE_GRIZZLY_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_TRACE_INTEGRATION_GRIZZLY_ENABLED`, `DD_INTEGRATION_GRIZZLY_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables Grizzly HTTP server instrumentation (creates request spans for Grizzly handlers and, when AppSec is enabled, captures request bodies/parameters for security monitoring and blocking)

`DD_TRACE_GRIZZLY_FILTERCHAIN_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_INTEGRATION_GRIZZLY_FILTERCHAIN_ENABLED`, `DD_TRACE_INTEGRATION_GRIZZLY_FILTERCHAIN_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables Grizzly FilterChain (GrizzlyFilterChain) instrumentation

`DD_TRACE_GRPC_ANALYTICS_ENABLED`
: **Since**: 1.55.0 <br>
**Aliases**: `DD_GRPC_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
No description available.

`DD_TRACE_GRPC_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.55.0 <br>
**Aliases**: `DD_GRPC_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the gRPC integration.

`DD_TRACE_GRPC_CLIENT_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_GRPC_CLIENT_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by gRPC client tracing

`DD_TRACE_GRPC_CLIENT_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_GRPC_CLIENT_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by gRPC client spans

`DD_TRACE_GRPC_ENABLED`
: **Since**: 1.55.0 <br>
**Aliases**: `DD_TRACE_INTEGRATION_GRPC_ENABLED`, `DD_INTEGRATION_GRPC_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `true`<br>
No description available.

`DD_TRACE_GRPC_IGNORED_INBOUND_METHODS`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
GRPC server: list of gRPC full method names (as returned by `ServerCall.getMethodDescriptor().getFullMethodName()`, e.g. `example.Greeter/IgnoreInbound`) to ignore for inbound/server tracing. Matching RPCs are not traced (the interceptor bypasses span creation for those calls).

`DD_TRACE_GRPC_IGNORED_OUTBOUND_METHODS`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
GRPC client: list of gRPC full method names (as returned by `MethodDescriptor.getFullMethodName()`) to ignore for outbound/client tracing. Matching RPCs do not create gRPC client spans; when the `google-pubsub` integration is enabled, Pub/Sub gRPC methods are also added to the ignore set.

`DD_TRACE_GRPC_SERVER_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_GRPC_SERVER_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by gRPC server tracing

`DD_TRACE_GRPC_SERVER_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_GRPC_SERVER_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by gRPC server spans

`DD_TRACE_GRPC_SERVER_TRIM_PACKAGE_RESOURCE`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
GRPC server resource names: when enabled, the tracer strips the Java package prefix from the gRPC service name when setting span resource names (e.g. `example.Greeter/SayHello` -> `Greeter/SayHello`). When disabled (default), uses the full gRPC method name.

`DD_TRACE_HAZELCAST_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_TRACE_INTEGRATION_HAZELCAST_ENABLED`, `DD_INTEGRATION_HAZELCAST_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables Hazelcast instrumentation

`DD_TRACE_HAZELCAST_LEGACY_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_TRACE_INTEGRATION_HAZELCAST_LEGACY_ENABLED`, `DD_INTEGRATION_HAZELCAST_LEGACY_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables Hazelcast Legacy (HazelcastLegacy) instrumentation

`DD_TRACE_HAZELCAST_SDK_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_HAZELCAST_SDK_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by Hazelcast SDK instrumentation (`hazelcast-sdk` component)

`DD_TRACE_HAZELCAST_SDK_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_HAZELCAST_SDK_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by Hazelcast SDK spans

`DD_TRACE_HEADER_BAGGAGE`
: **Since**: 1.54.0 <br>
**Type**: `map`<br>
**Default**: N/A<br>
Accepts a map of case-insensitive header keys to baggage keys and automatically applies matching request header values as baggage on traces. On propagation the reverse mapping is applied: Baggage is mapped to headers. Available since version 1.3.0.

`DD_TRACE_HEADER_TAGS`
: **Since**: 1.57.0 <br>
**Type**: `map`<br>
**Default**: `""`<br>
Automatically apply specified HTTP headers as span tags. If a custom tag name is not specified, the tag key defaults to http.request.headers.<normalized-header-name> for request headers and http.response.headers.<normalized-header-name> for response headers.

`DD_TRACE_HEADER_TAGS_LEGACY_PARSING_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
HTTP header tags: enables legacy `DD_TRACE_HEADER_TAGS` parsing. When true, applies `DD_TRACE_HEADER_TAGS` only to request headers and disables response header tagging; `DD_TRACE_REQUEST_HEADER_TAGS` and `DD_TRACE_RESPONSE_HEADER_TAGS` are ignored (with a warning). Default: false.

`DD_TRACE_HEALTH_METRICS_STATSD_HOST`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Statsd host to send health metrics to

`DD_TRACE_HEALTH_METRICS_STATSD_PORT`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: N/A<br>
Statsd port to send health metrics to

`DD_TRACE_HIBERNATE_CORE_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_HIBERNATE_CORE_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by Hibernate ORM instrumentation

`DD_TRACE_HIBERNATE_CORE_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_HIBERNATE_CORE_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by Hibernate ORM spans

`DD_TRACE_HIKARI_ENABLED`
: **Since**: 1.56.0 <br>
**Aliases**: `DD_INTEGRATION_HIKARI_ENABLED`, `DD_TRACE_INTEGRATION_HIKARI_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables HikariCP JDBC pool waiting instrumentation (emits `pool.waiting` spans when threads block waiting for a connection, tagged with the pool name)

`DD_TRACE_HTTPASYNCCLIENT4_LEGACY_TRACING_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_HTTPASYNCCLIENT4_LEGACY_TRACING_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Apache HttpAsyncClient 4: enables legacy URI handling. When true, builds the request URI by parsing `requestLine.getUri()` directly; when false (default), concatenates `HttpHost.toURI()` with the request line URI.

`DD_TRACE_HTTPASYNCCLIENT_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_HTTPASYNCCLIENT_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the ApacheHttpAsyncClient integration

`DD_TRACE_HTTPASYNCCLIENT_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_HTTPASYNCCLIENT_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the ApacheHttpAsyncClient integration

`DD_TRACE_HTTPCLIENT5_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_HTTPCLIENT5_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by Apache HttpClient 5 request tracing

`DD_TRACE_HTTPCLIENT5_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_HTTPCLIENT5_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by Apache HttpClient 5 request spans

`DD_TRACE_HTTPCLIENT_ANALYTICS_ENABLED`
: **Since**: 1.55.0 <br>
**Aliases**: `DD_HTTPCLIENT_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables analytics for the httpclient integration.

`DD_TRACE_HTTPCLIENT_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.55.0 <br>
**Aliases**: `DD_HTTPCLIENT_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the httpclient integration.

`DD_TRACE_HTTPCLIENT_ENABLED`
: **Since**: 1.55.0 <br>
**Aliases**: `DD_INTEGRATION_HTTPCLIENT_ENABLED`, `DD_TRACE_INTEGRATION_HTTPCLIENT_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables tracing for the httpclient integration.

`DD_TRACE_HTTPURLCONNECTION_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_HTTPURLCONNECTION_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by HttpURLConnection request tracing

`DD_TRACE_HTTPURLCONNECTION_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_HTTPURLCONNECTION_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by HttpURLConnection request spans

`DD_TRACE_HTTP_CLIENT_ERROR_STATUSES`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_HTTP_CLIENT_ERROR_STATUSES`<br>
**Type**: `string`<br>
**Default**: `400-499`<br>
Comma-separated list of HTTP status codes and ranges to treat as errors for HTTP client spans (for example, 400-499,500). When set, matching responses mark the span as an error.

`DD_TRACE_HTTP_CLIENT_PATH_RESOURCE_NAME_MAPPING`
: **Since**: 1.54.0 <br>
**Type**: `map`<br>
**Default**: N/A<br>
Maps HTTP client request paths to custom resource names. Uses the same format as `dd.trace.http.server.path-resource-name-mapping`, but applies to HTTP client spans instead of server spans.

`DD_TRACE_HTTP_CLIENT_SPLIT_BY_DOMAIN`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Set the service name of HTTP requests to `host- `, for example a `curl_exec()` call to `https://datadoghq.com` has the service name `host-datadoghq.com` instead of the default service name of `curl`.

`DD_TRACE_HTTP_CLIENT_TAG_QUERY_STRING`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_HTTP_CLIENT_TAG_QUERY_STRING`<br>
**Type**: `boolean`<br>
**Default**: `true`<br>
By default, query string parameters and fragments are added to the `http.url` tag on web client spans. Set to `false` to prevent the collection of this data.

`DD_TRACE_HTTP_RESOURCE_REMOVE_TRAILING_SLASH`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
HTTP resource names: when enabled, removes a trailing `/` from the path portion of HTTP span resource names (except the root `/`), e.g. `GET /foo/` becomes `GET /foo`. Applies to both client and server resource name normalization. Default: false.

`DD_TRACE_HTTP_SERVER_ERROR_STATUSES`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_HTTP_SERVER_ERROR_STATUSES`<br>
**Type**: `string`<br>
**Default**: `500-599`<br>
A range of errors can be accepted. By default 5xx status codes are reported as errors for http servers. This configuration overrides that. Ex. `dd.trace.http.server.error.statuses=500,502-599`

`DD_TRACE_HTTP_SERVER_PATH_RESOURCE_NAME_MAPPING`
: **Since**: 1.54.0 <br>
**Type**: `map`<br>
**Default**: N/A<br>
Maps HTTP request paths to custom resource names. Provide a comma-separated list of `pattern:resource_name` pairs: &nbsp;&nbsp;&nbsp;&ndash; `pattern`: An Ant-style path pattern that must match the value of the `http.path_group` span tag. &nbsp;&nbsp;&nbsp;&ndash; `resource_name`: The custom resource name to assign if the pattern matches. If `*` is used as the `resource_name` for a matching pattern, the original, unnormalized request path combined with the HTTP method is used as the resource name. For example, given the rule `/test/**:*`, a `GET` request for `/test/some/path` results in the resource name `GET /test/some/path`. Mappings are evaluated in order of priority, and the first matching rule applies. Unmatched request paths use the default normalization behavior. Request path | Resource path ------------ | ------------- `/admin/index.jsp` | `/admin-page` `/admin/user/12345/delete` | `/admin/user` `/user/12345` | `/user/?`

`DD_TRACE_HTTP_URL_CONNECTION_CLASS_NAME`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `""`<br>
HttpURLConnection instrumentation: additional fully-qualified class name to instrument (adds a configured matching type on top of the built-in known `HttpURLConnection` implementations). If unset/empty, only the default known types are matched. Default: empty.

`DD_TRACE_IGNITE_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_IGNITE_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the Ignite integration

`DD_TRACE_IGNITE_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_IGNITE_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the Ignite integration

`DD_TRACE_IGNITE_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_INTEGRATION_IGNITE_ENABLED`, `DD_TRACE_INTEGRATION_IGNITE_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables Ignite instrumentation

`DD_TRACE_INFERRED_PROXY_SERVICES_ENABLED`
: **Since**: 1.55.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Inferred proxy services: when enabled, registers the inferred-proxy propagator to extract `x-dd-proxy*` headers and start an inferred proxy span (currently supports `x-dd-proxy=aws-apigateway`) as a parent of the server span, using header values for service/resource/tags. Default: false.

`DD_TRACE_INTEGRATION_DATANUCLEUS_MATCHING_SHORTCUT_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_INTEGRATION_DATANUCLEUS_MATCHING_SHORTCUT_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Datanucleus integration shortcut matching: when enabled, restricts type matching to a known list of `ExecutionContext` implementations; when disabled (default), uses hierarchy matching to instrument any class implementing `org.datanucleus.ExecutionContext`.

`DD_TRACE_INTEGRATION_HTTPASYNCCLIENT5_MATCHING_SHORTCUT_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_INTEGRATION_HTTPASYNCCLIENT5_MATCHING_SHORTCUT_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Apache HttpAsyncClient 5 integration shortcut matching: when enabled, restricts type matching to known `HttpAsyncClient` implementations; when disabled (default), uses hierarchy matching to consider other implementations.

`DD_TRACE_INTEGRATION_HTTPASYNCCLIENT_MATCHING_SHORTCUT_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_INTEGRATION_HTTPASYNCCLIENT_MATCHING_SHORTCUT_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Apache HttpAsyncClient integration shortcut matching: when enabled, restricts type matching to known `HttpAsyncClient` implementations; when disabled (default), uses hierarchy matching to consider other implementations.

`DD_TRACE_INTEGRATION_HTTPCLIENT5_MATCHING_SHORTCUT_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_INTEGRATION_HTTPCLIENT5_MATCHING_SHORTCUT_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Apache HttpClient 5 integration shortcut matching: when enabled, restricts type matching to known HttpClient implementations; when disabled (default), uses hierarchy matching to consider other implementations.

`DD_TRACE_INTEGRATION_HTTPCLIENT_MATCHING_SHORTCUT_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_INTEGRATION_HTTPCLIENT_MATCHING_SHORTCUT_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Apache HttpClient integration shortcut matching: when enabled, restricts type matching to known HttpClient implementations; when disabled (default), uses hierarchy matching to consider other implementations.

`DD_TRACE_INTEGRATION_JAVA_CONCURRENT_MATCHING_SHORTCUT_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_INTEGRATION_JAVA_CONCURRENT_MATCHING_SHORTCUT_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Java_concurrent integration shortcut matching: when enabled, restricts matching of java concurrent instrumentations to known types (for example known `RejectedExecutionHandler` implementations) instead of scanning all implementations; when disabled (default), uses hierarchy matching for broader coverage.

`DD_TRACE_INTEGRATION_OPENTELEMETRY_EXPERIMENTAL_MATCHING_SHORTCUT_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_INTEGRATION_OPENTELEMETRY_EXPERIMENTAL_MATCHING_SHORTCUT_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
OpenTelemetry experimental integration shortcut matching: when enabled, restricts type matching to known `OpenTelemetry` implementations; when disabled (default), uses hierarchy matching to consider other implementations.

`DD_TRACE_JAKARTA_WEBSOCKET_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_TRACE_INTEGRATION_JAKARTA_WEBSOCKET_ENABLED`, `DD_INTEGRATION_JAKARTA_WEBSOCKET_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables Jakarta WebSocket (JakartaWebsocket) instrumentation

`DD_TRACE_JAKARTA_WS_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_JAKARTA_WS_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the WebService integration

`DD_TRACE_JAKARTA_WS_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_JAKARTA_WS_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the WebService integration

`DD_TRACE_JAVAX_WEBSOCKET_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_INTEGRATION_JAVAX_WEBSOCKET_ENABLED`, `DD_TRACE_INTEGRATION_JAVAX_WEBSOCKET_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Javax WebSocket (JSR 356) integration: enables the `javax-websocket` instrumentation, which traces WebSocket events/messages (creates `websocket.*` spans, such as send/receive/close) when active. Default: false.

`DD_TRACE_JAVA_HTTP_CLIENT_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_JAVA_HTTP_CLIENT_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by Java 11+ `java.net.http.HttpClient` request tracing

`DD_TRACE_JAVA_HTTP_CLIENT_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_JAVA_HTTP_CLIENT_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by Java 11+ `java.net.http.HttpClient` request spans

`DD_TRACE_JAXRS_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_JAXRS_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by JAX-RS instrumentation

`DD_TRACE_JAXRS_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_JAXRS_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by JAX-RS spans

`DD_TRACE_JAX_RS_ADDITIONAL_ANNOTATIONS`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
JAX-RS annotations: additional fully-qualified annotation class names to treat as JAX-RS endpoint annotations for the JAX-RS annotation-based instrumentation (added to the default set like `javax.ws.rs.GET`, `javax.ws.rs.POST`, etc.). Default: empty.

`DD_TRACE_JAX_RS_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_JAX_RS_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by JAX-RS instrumentation

`DD_TRACE_JAX_RS_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_JAX_RS_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by JAX-RS spans

`DD_TRACE_JAX_RS_CLIENT_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_JAX_RS_CLIENT_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by JAX-RS client request tracing

`DD_TRACE_JAX_RS_CLIENT_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_JAX_RS_CLIENT_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by JAX-RS client spans

`DD_TRACE_JAX_WS_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_JAX_WS_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by JAX-WS request tracing

`DD_TRACE_JAX_WS_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_JAX_WS_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by JAX-WS request spans

`DD_TRACE_JDBC_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_JDBC_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by JDBC database query tracing

`DD_TRACE_JDBC_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_JDBC_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by JDBC database query spans

`DD_TRACE_JDBC_CONNECTION_CLASS_NAME`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `""`<br>
JDBC tracing: additional fully-qualified `java.sql.Connection` implementation class name to instrument. When set, the tracer instruments that connection type in addition to the built-in known JDBC connection classes; when empty, only the known types are matched. Default: empty.

`DD_TRACE_JDBC_DATASOURCE_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_JDBC_DATASOURCE_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by JDBC `DataSource#getConnection` tracing

`DD_TRACE_JDBC_DATASOURCE_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_JDBC_DATASOURCE_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by JDBC DataSource connection spans

`DD_TRACE_JDBC_DATASOURCE_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_TRACE_INTEGRATION_JDBC_DATASOURCE_ENABLED`, `DD_INTEGRATION_JDBC_DATASOURCE_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables JDBC `DataSource#getConnection` tracing (creates `database.connection` spans when a parent span exists and tags connections with pool metadata such as the HikariCP pool name)

`DD_TRACE_JDBC_PREPARED_STATEMENT_CLASS_NAME`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `""`<br>
JDBC tracing: additional fully-qualified `PreparedStatement`/`CallableStatement` implementation class name to instrument. When set, the tracer instruments that statement type in addition to the built-in known JDBC statement classes; when empty, only the known types are matched. Default: empty.

`DD_TRACE_JEDIS_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_JEDIS_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the Jedis integration

`DD_TRACE_JEDIS_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_JEDIS_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the Jedis integration

`DD_TRACE_JETTY_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_JETTY_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by Jetty server request tracing

`DD_TRACE_JETTY_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_JETTY_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by Jetty server request spans

`DD_TRACE_JETTY_CLIENT_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_JETTY_CLIENT_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by Jetty HTTP client request tracing

`DD_TRACE_JETTY_CLIENT_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_JETTY_CLIENT_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by Jetty HTTP client request spans

`DD_TRACE_JETTY_WEBSOCKET_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_TRACE_INTEGRATION_JETTY_WEBSOCKET_ENABLED`, `DD_INTEGRATION_JETTY_WEBSOCKET_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables Jetty WebSocket tracing (creates spans around Jetty WebSocket frame handling and tracks sender context for websocket sessions when websocket tracing is enabled)

`DD_TRACE_JMS_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_JMS_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by JMS messaging tracing

`DD_TRACE_JMS_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_JMS_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by JMS spans

`DD_TRACE_JMS_E2E_DURATION_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_JMS_E2E_DURATION_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
JMS end-to-end duration: when enabled, the tracer begins end-to-end duration tracking on JMS messaging spans (calls `beginEndToEnd()`), allowing `record.e2e_duration_ms` to be computed. Default: false.

`DD_TRACE_JMXFETCH_ACTIVEMQ_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_JMXFETCH_ACTIVEMQ_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
JMXFetch ActiveMQ check: when enabled, allows loading/running the built-in JMXFetch metrics config for `activemq` (otherwise it is skipped). Default: false.

`DD_TRACE_JMXFETCH_CASSANDRA_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_JMXFETCH_CASSANDRA_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
JMXFetch CassandraClient check: when enabled, allows loading/running the built-in JMXFetch metrics config for `CassandraClient` (otherwise it is skipped)

`DD_TRACE_JMXFETCH_CONFLUENT_PLATFORM_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_JMXFETCH_CONFLUENT_PLATFORM_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
JMXFetch Confluent Platform check: when enabled, allows loading/running the built-in JMXFetch metrics config for `confluent_platform` (otherwise it is skipped). Default: false.

`DD_TRACE_JMXFETCH_HAZELCAST_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_JMXFETCH_HAZELCAST_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
JMXFetch Hazelcast check: when enabled, allows loading/running the built-in JMXFetch metrics config for `Hazelcast` (otherwise it is skipped)

`DD_TRACE_JMXFETCH_HIVEMQ_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_JMXFETCH_HIVEMQ_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
JMXFetch HiveMQ check: when enabled, allows loading/running the built-in JMXFetch metrics config for `hivemq` (otherwise it is skipped). Default: false.

`DD_TRACE_JMXFETCH_HIVE_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_JMXFETCH_HIVE_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
JMXFetch Hive check: when enabled, allows loading/running the built-in JMXFetch metrics config for `hive` (otherwise it is skipped). Default: false.

`DD_TRACE_JMXFETCH_HUDI_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_JMXFETCH_HUDI_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
JMXFetch Hudi check: when enabled, allows loading/running the built-in JMXFetch metrics config for `hudi` (otherwise it is skipped). Default: false.

`DD_TRACE_JMXFETCH_IGNITE_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_JMXFETCH_IGNITE_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
JMXFetch Ignite check: when enabled, allows loading/running the built-in JMXFetch metrics config for `Ignite` (otherwise it is skipped)

`DD_TRACE_JMXFETCH_JBOSS_WILDFLY_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_JMXFETCH_JBOSS_WILDFLY_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
JMXFetch JBoss/WildFly check: when enabled, allows loading/running the built-in JMXFetch metrics config for `jboss_wildfly` (otherwise it is skipped). Default: false.

`DD_TRACE_JMXFETCH_KAFKA_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_JMXFETCH_KAFKA_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
JMXFetch ConfluentSchemaRegistry check: when enabled, allows loading/running the built-in JMXFetch metrics config for `ConfluentSchemaRegistry` (otherwise it is skipped)

`DD_TRACE_JMXFETCH_KUBE_APISERVER_METRICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_JMXFETCH_KUBE_APISERVER_METRICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
JMXFetch Kubernetes API server metrics check: when enabled, allows loading/running the built-in JMXFetch metrics config for `kube_apiserver_metrics` (otherwise it is skipped). Default: false.

`DD_TRACE_JMXFETCH_PRESTO_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_JMXFETCH_PRESTO_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
JMXFetch Presto check: when enabled, allows loading/running the built-in JMXFetch metrics config for `presto` (otherwise it is skipped). Default: false.

`DD_TRACE_JMXFETCH_SOLR_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_JMXFETCH_SOLR_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
JMXFetch Solr check: when enabled, allows loading/running the built-in JMXFetch metrics config for `solr` (otherwise it is skipped). Default: false.

`DD_TRACE_JMXFETCH_SONARQUBE_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_JMXFETCH_SONARQUBE_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
JMXFetch SonarQube check: when enabled, allows loading/running the built-in JMXFetch metrics config for `sonarqube` (otherwise it is skipped). Default: false.

`DD_TRACE_JMXFETCH_TOMCAT_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_JMXFETCH_TOMCAT_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
JMXFetch CommitAction check: when enabled, allows loading/running the built-in JMXFetch metrics config for `CommitAction` (otherwise it is skipped)

`DD_TRACE_JMXFETCH_WEBLOGIC_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_JMXFETCH_WEBLOGIC_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
JMXFetch WebLogic check: when enabled, allows loading/running the built-in JMXFetch metrics config for `weblogic` (otherwise it is skipped). Default: false.

`DD_TRACE_JMXFETCH_WEBSPHERE_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_JMXFETCH_WEBSPHERE_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
JMXFetch WebSphere check: when enabled, includes the WebSphere JMXFetch config (`jmxfetch-websphere-config.yaml`) when starting JMXFetch. Default: false.

`DD_TRACE_JMXFETCH_{CHECK_NAME}_ENABLED`
: **Since**: 1.57.0 <br>
**Aliases**: `DD_JMXFETCH_{CHECK_NAME}_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
JMXFetch check enablement template: enables/disables a specific JMXFetch integration named `{CHECK_NAME}` by reading `trace.jmxfetch.{check_name}.enabled` (and alias `jmxfetch.{check_name}.enabled`). Used by JMXFetch to decide whether to load internal metric configs by check name. Default: false.

`DD_TRACE_JMX_TAGS`
: **Since**: 1.54.0 <br>
**Type**: `map`<br>
**Default**: N/A<br>
A list of span tags to be added to every jmx metric.

`DD_TRACE_JSP_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_JSP_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by JSP rendering spans

`DD_TRACE_JSP_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_JSP_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by JSP render spans

`DD_TRACE_KAFKA_ANALYTICS_ENABLED`
: **Since**: 1.55.0 <br>
**Aliases**: `DD_KAFKA_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
No description available.

`DD_TRACE_KAFKA_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.55.0 <br>
**Aliases**: `DD_KAFKA_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the Kafka integration.

`DD_TRACE_KAFKA_E2E_DURATION_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_KAFKA_E2E_DURATION_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Kafka end-to-end duration: when enabled, begins end-to-end duration tracking on Kafka messaging spans (calls `beginEndToEnd()`), allowing `record.e2e_duration_ms` to be recorded when spans are finished with end-to-end semantics. Default: false.

`DD_TRACE_KAFKA_ENABLED`
: **Since**: 1.55.0 <br>
**Aliases**: `DD_INTEGRATION_KAFKA_ENABLED`, `DD_TRACE_INTEGRATION_KAFKA_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables tracing for the Kafka integration.

`DD_TRACE_KAFKA_STREAMS_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_KAFKA_STREAMS_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by Kafka Streams tracing

`DD_TRACE_KAFKA_STREAMS_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_KAFKA_STREAMS_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by Kafka Streams spans

`DD_TRACE_KAFKA_STREAMS_E2E_DURATION_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_KAFKA_STREAMS_E2E_DURATION_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Kafka Streams end-to-end duration: when enabled, begins end-to-end duration tracking on Kafka Streams spans (uses instrumentation names `kafka` and `kafka-streams`), allowing `record.e2e_duration_ms` to be recorded when spans are finished with end-to-end semantics. Default: false.

`DD_TRACE_LEGACY_E2E_DURATION_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_LEGACY_E2E_DURATION_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Legacy end-to-end duration mode: when enabled, the tracer uses the `legacy` E2E mechanism that stores the E2E start time in baggage key `t0`; when disabled, uses the span context end-to-end start time. Default: false.

`DD_TRACE_LETTUCE_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_LETTUCE_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by Lettuce (Redis) client tracing

`DD_TRACE_LETTUCE_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_LETTUCE_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by Lettuce (Redis) client spans

`DD_TRACE_LIBERTY_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_LIBERTY_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by Liberty HTTP server tracing

`DD_TRACE_LIBERTY_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_LIBERTY_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by Liberty HTTP server spans

`DD_TRACE_LOG_LEVEL`
: **Since**: 1.59.0 <br>
**Type**: N/A<br>
**Default**: N/A<br>
Optional - _string_ - **default**: `info` Sets the minimum logging level. Valid options: `trace`, `debug`, `info`, `warn`, `error`, `critical`, and `off`.

`DD_TRACE_METHODS`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
List of methods to trace. Accepts a semicolon (`;`) separated list where each entry has the format `Namespace.TypeName[MethodNames]`, where `MethodNames` is either a comma (`,`) separated list of method names or the `*` wildcard. For generic types, replace the angled brackets and the type parameters' names with a backtick (`` ` ``) followed by the number of generic type parameters. For example, `Dictionary<TKey, TValue>` must be written as `` Dictionary`2 ``. For generic methods, you only need to specify the method name. **Note:** The wildcard method support (`[*]`) selects all methods in a type except constructors, property getters and setters, `Equals`, `Finalize`, `GetHashCode`, and `ToString`.

`DD_TRACE_MICRONAUT_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_MICRONAUT_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by Micronaut HTTP server tracing

`DD_TRACE_MICRONAUT_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_MICRONAUT_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by Micronaut HTTP server spans

`DD_TRACE_MONGO_ANALYTICS_ENABLED`
: **Since**: 1.55.0 <br>
**Aliases**: `DD_MONGO_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
No description available.

`DD_TRACE_MONGO_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.55.0 <br>
**Aliases**: `DD_MONGO_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the MongoDB integration.

`DD_TRACE_MONGO_ENABLED`
: **Since**: 1.55.0 <br>
**Aliases**: `DD_INTEGRATION_MONGO_ENABLED`, `DD_TRACE_INTEGRATION_MONGO_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables tracing for the MongoDB integration.

`DD_TRACE_MULE_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_MULE_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by Mule tracing

`DD_TRACE_MULE_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_MULE_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by Mule spans

`DD_TRACE_MULE_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_INTEGRATION_MULE_ENABLED`, `DD_TRACE_INTEGRATION_MULE_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables Mule 4 tracing (wraps Mule's `EventTracer` to create/propagate spans for event processing and activates the event-context span when executing components/operations)

`DD_TRACE_NETTY_3_9_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_NETTY_3_9_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by Netty 3.8/3.9 HTTP client/server tracing

`DD_TRACE_NETTY_3_9_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_NETTY_3_9_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by Netty 3.8/3.9 spans

`DD_TRACE_NETTY_4_0_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_NETTY_4_0_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by Netty 4.0 HTTP client/server tracing

`DD_TRACE_NETTY_4_0_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_NETTY_4_0_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by Netty 4.0 HTTP client/server spans

`DD_TRACE_NETTY_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_NETTY_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by Netty HTTP client/server tracing

`DD_TRACE_NETTY_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_NETTY_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by Netty HTTP client/server spans

`DD_TRACE_NETTY_PROMISE_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_TRACE_INTEGRATION_NETTY_PROMISE_ENABLED`, `DD_INTEGRATION_NETTY_PROMISE_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables Netty Promise (NettyPromise) instrumentation

`DD_TRACE_NING_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_NING_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the GrizzlyClient integration

`DD_TRACE_NING_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_NING_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the GrizzlyClient integration

`DD_TRACE_NING_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_INTEGRATION_NING_ENABLED`, `DD_TRACE_INTEGRATION_NING_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables Ning (GrizzlyClient) instrumentation

`DD_TRACE_OBFUSCATION_QUERY_STRING_REGEXP`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_OBFUSCATION_QUERY_STRING_REGEXP`<br>
**Type**: `string`<br>
**Default**: N/A<br>
A regex to redact sensitive data from incoming requests' query string reported in the `http.url` tag (matches are replaced with <redacted>).

`DD_TRACE_OKHTTP_2_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_OKHTTP_2_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by OkHttp 2.x client request tracing

`DD_TRACE_OKHTTP_2_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_OKHTTP_2_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by OkHttp 2.x client request spans

`DD_TRACE_OKHTTP_3_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_OKHTTP_3_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by OkHttp 3.x client request tracing

`DD_TRACE_OKHTTP_3_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_OKHTTP_3_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by OkHttp 3.x client request spans

`DD_TRACE_OKHTTP_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_OKHTTP_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by OkHttp client request tracing

`DD_TRACE_OKHTTP_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_OKHTTP_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by OkHttp client request spans

`DD_TRACE_OPENSEARCH_ANALYTICS_ENABLED`
: **Since**: 1.55.0 <br>
**Aliases**: `DD_OPENSEARCH_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables analytics for the OpenSearch integration.

`DD_TRACE_OPENSEARCH_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.55.0 <br>
**Aliases**: `DD_OPENSEARCH_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the OpenSearch integration.

`DD_TRACE_OPENSEARCH_ENABLED`
: **Since**: 1.55.0 <br>
**Aliases**: `DD_TRACE_INTEGRATION_OPENSEARCH_ENABLED`, `DD_INTEGRATION_OPENSEARCH_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `true`<br>
No description available.

`DD_TRACE_OPENTELEMETRY_1_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_TRACE_INTEGRATION_OPENTELEMETRY_1_ENABLED`, `DD_INTEGRATION_OPENTELEMETRY_1_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables OpenTelemetry API 1.x tracing bridge (replaces OpenTelemetry `TracerProvider` and propagators with the Datadog shim so OpenTelemetry spans/contexts are reported via the Datadog tracer)

`DD_TRACE_OPENTELEMETRY_ANNOTATIONS_1_20_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_INTEGRATION_OPENTELEMETRY_ANNOTATIONS_1_20_ENABLED`, `DD_TRACE_INTEGRATION_OPENTELEMETRY_ANNOTATIONS_1_20_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables OpenTelemetry Annotations 1.20 (WithSpanAnnotation) instrumentation

`DD_TRACE_OPENTELEMETRY_ANNOTATIONS_1_26_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_TRACE_INTEGRATION_OPENTELEMETRY_ANNOTATIONS_1_26_ENABLED`, `DD_INTEGRATION_OPENTELEMETRY_ANNOTATIONS_1_26_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables OpenTelemetry Annotations 1.26 (AddingSpanAttributes) instrumentation

`DD_TRACE_OPENTELEMETRY_ANNOTATIONS_1_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_OPENTELEMETRY_ANNOTATIONS_1_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the WithSpanAnnotation integration

`DD_TRACE_OPENTELEMETRY_ANNOTATIONS_1_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_OPENTELEMETRY_ANNOTATIONS_1_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the WithSpanAnnotation integration

`DD_TRACE_OPENTELEMETRY_ANNOTATIONS_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_OPENTELEMETRY_ANNOTATIONS_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by OpenTelemetry annotations tracing

`DD_TRACE_OPENTELEMETRY_ANNOTATIONS_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_OPENTELEMETRY_ANNOTATIONS_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by OpenTelemetry annotations spans

`DD_TRACE_OPENTELEMETRY_ANNOTATIONS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_TRACE_INTEGRATION_OPENTELEMETRY_ANNOTATIONS_ENABLED`, `DD_INTEGRATION_OPENTELEMETRY_ANNOTATIONS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables OpenTelemetry annotations tracing (`@WithSpan`, `@SpanAttribute`, `@AddingSpanAttributes`): creates method spans (including async completion handling) and tags spans with annotated parameters

`DD_TRACE_OPENTELEMETRY_BETA_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_TRACE_INTEGRATION_OPENTELEMETRY_BETA_ENABLED`, `DD_INTEGRATION_OPENTELEMETRY_BETA_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables OpenTelemetry Beta (OpenTelemetry) instrumentation

`DD_TRACE_OPENTELEMETRY_EXPERIMENTAL_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_INTEGRATION_OPENTELEMETRY_EXPERIMENTAL_ENABLED`, `DD_TRACE_INTEGRATION_OPENTELEMETRY_EXPERIMENTAL_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables the experimental OpenTelemetry API bridge (Datadog shim for `OpenTelemetry` tracer provider, context storage/root, and propagators)

`DD_TRACE_OTEL_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
**Description**: Enables the Datadog SDK's OpenTelemetry interoperability for traces. **Notes**: The default is `true` in the Java SDK.

`DD_TRACE_PARTIAL_FLUSH_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables incrementally flushing large traces to the Datadog Agent, reducing the chance of rejection by the Agent. Use only when you have long-lived traces or traces with many spans. Valid values are `true` or `false`. Added in version 1.26.0, only compatible with the Datadog Agent 7.26.0+.

`DD_TRACE_PARTIAL_FLUSH_MIN_SPANS`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `1000`<br>
Sets the minimum number of finished spans required to trigger a partial flush when partial flushing is enabled. Defaults to 1000; invalid values are ignored.

`DD_TRACE_PEERSERVICETAGINTERCEPTOR_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Tag interceptor rule `PeerServiceTagInterceptor`: when enabled, honors the `peer.service` tag by setting the span service name to that value (and records `peer.service.source=peer.service`). Default: false.

`DD_TRACE_PEER_SERVICE_COMPONENT_OVERRIDES`
: **Since**: 1.54.0 <br>
**Type**: `map`<br>
**Default**: N/A<br>
Peer service component overrides: map of span `component` -> `peer.service` value used when computing default peer.service. If an override exists for the span's component, it sets `peer.service` to that value and sets `peer.service.source` to `_component_override`.

`DD_TRACE_PEER_SERVICE_DEFAULTS_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Peer service defaults (Naming Schema v0): when enabled, computes default `peer.service` values for eligible spans using the v1 peer-service default algorithm; when disabled (default), Naming Schema v0 does not compute peer.service defaults.

`DD_TRACE_PEER_SERVICE_MAPPING`
: **Since**: 1.54.0 <br>
**Type**: `map`<br>
**Default**: `""`<br>
Maps detected peer service names to normalized values before they are attached to spans.

`DD_TRACE_PEKKO_HTTP_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_PEKKO_HTTP_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by Pekko HTTP tracing

`DD_TRACE_PEKKO_HTTP_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_PEKKO_HTTP_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by Pekko HTTP spans

`DD_TRACE_PEKKO_HTTP_CLIENT_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_PEKKO_HTTP_CLIENT_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by Pekko HTTP client tracing

`DD_TRACE_PEKKO_HTTP_CLIENT_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_PEKKO_HTTP_CLIENT_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by Pekko HTTP client spans

`DD_TRACE_PEKKO_HTTP_SERVER_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_PEKKO_HTTP_SERVER_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by Pekko HTTP server tracing

`DD_TRACE_PEKKO_HTTP_SERVER_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_PEKKO_HTTP_SERVER_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by Pekko HTTP server spans

`DD_TRACE_PEKKO_SCHEDULER_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables Pekko Scheduler (PekkoScheduler) instrumentation

`DD_TRACE_PERF_METRICS_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Performance metrics: when enabled (and runtime metrics are enabled), turns on tracer performance monitoring (timers/metrics such as trace writing duration). Default: false.

`DD_TRACE_PIPE_NAME`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Datadog Agent named pipe: sets the Windows named pipe name/path used as the HTTP transport to communicate with the Datadog Agent (instead of TCP or a Unix domain socket). When set, the tracer's HTTP client uses a NamedPipe socket factory. Default: unset.

`DD_TRACE_PLAY_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_PLAY_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by Play Framework request tracing

`DD_TRACE_PLAY_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_PLAY_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by Play request spans

`DD_TRACE_PLAY_REPORT_HTTP_STATUS`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Play framework: when enabled, sets the HTTP status code to 500 on Play request spans when an exception is thrown (so error spans still have an HTTP status). Default: false.

`DD_TRACE_PLAY_WS_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_PLAY_WS_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the PlayWSClient integration

`DD_TRACE_PLAY_WS_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_PLAY_WS_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the PlayWSClient integration

`DD_TRACE_POST_PROCESSING_TIMEOUT`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `1000`<br>
Trace post-processing timeout (milliseconds): limits how long the tracer spends running span post-processing on a trace before timing out (checked during `SpanPostProcessor.process(...)`). Default: 1000.

`DD_TRACE_PROPAGATION_BEHAVIOR_EXTRACT`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `continue`<br>
Specifies how incoming distributed tracing headers should be handled at a service level. Accepted values are: `continue`: The SDK will continue the distributed trace if the incoming distributed tracing headers represent a valid trace context. `restart`: The SDK will always start a new trace. If the incoming distributed tracing headers represent a valid trace context, that trace context will be represented as a span link on service entry spans (as opposed to the parent span in the `continue` configuration). `ignore`: The SDK will always start a new trace and all incoming distributed tracing headers are ignored.

`DD_TRACE_PROPAGATION_EXTRACT_FIRST`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
When set to true, stops extracting after the first successful trace context extraction.

`DD_TRACE_PROPAGATION_STYLE`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `""`<br>
Specifies trace context propagation formats for extraction and injection in a comma-separated list. May be overridden by extract-specific or inject-specific configurations.

`DD_TRACE_PROPAGATION_STYLE_EXTRACT`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `""`<br>
A comma-separated list of propagation styles to use for extraction. When set, this overrides `DD_TRACE_PROPAGATION_STYLE` for extraction.

`DD_TRACE_PROPAGATION_STYLE_INJECT`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `""`<br>
**Configuration**: `tracePropagationStyle.inject` A comma-separated list of header formats to include to propagate distributed traces between services.

`DD_TRACE_QUARTZ_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_QUARTZ_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the QuartzScheduling integration

`DD_TRACE_QUARTZ_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_QUARTZ_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the QuartzScheduling integration

`DD_TRACE_RABBITMQ_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_RABBITMQ_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the RabbitMQ integration

`DD_TRACE_RABBITMQ_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_RABBITMQ_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the RabbitMQ integration

`DD_TRACE_RABBITMQ_E2E_DURATION_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_RABBITMQ_E2E_DURATION_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
RabbitMQ/AMQP end-to-end duration: when enabled for the RabbitMQ instrumentation, begins end-to-end duration tracking on RabbitMQ spans (`beginEndToEnd()`), and consumer spans are finished with end-to-end semantics (`finishWithEndToEnd()`), enabling `record.e2e_duration_ms`. Default: false.

`DD_TRACE_RATE_LIMIT`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `100`<br>
Sets the maximum number of traces to sample per second; applies only when either DD_TRACE_SAMPLING_RULES or DD_TRACE_SAMPLE_RATE is set.

`DD_TRACE_RATPACK_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_RATPACK_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the Ratpack integration

`DD_TRACE_RATPACK_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_RATPACK_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the Ratpack integration

`DD_TRACE_REDISCALA_ANALYTICS_ENABLED`
: **Since**: 1.57.0 <br>
**Aliases**: `DD_REDISCALA_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the Rediscala integration

`DD_TRACE_REDISCALA_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.55.0 <br>
**Aliases**: `DD_REDISCALA_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the Rediscala integration

`DD_TRACE_REDISSON_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_REDISSON_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the Redisson integration

`DD_TRACE_REDISSON_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_REDISSON_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the Redisson integration

`DD_TRACE_REDIS_ANALYTICS_ENABLED`
: **Since**: 1.55.0 <br>
**Aliases**: `DD_REDIS_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
No description available.

`DD_TRACE_REDIS_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.55.0 <br>
**Aliases**: `DD_REDIS_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the Redis integration.

`DD_TRACE_REDIS_ENABLED`
: **Since**: 1.55.0 <br>
**Aliases**: `DD_TRACE_INTEGRATION_REDIS_ENABLED`, `DD_INTEGRATION_REDIS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables instrumentation for redis. When disabled, spans for redis operations are not created.

`DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
When enabled, disables inferred-services/integration service naming by making Naming Schema v0 not allow inferred services (so integrations that rely on inferred services fall back to application service naming)

`DD_TRACE_RENAISSANCE_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_INTEGRATION_RENAISSANCE_ENABLED`, `DD_TRACE_INTEGRATION_RENAISSANCE_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables Renaissance instrumentation

`DD_TRACE_REPORT_HOSTNAME`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Whether to report the system's hostname for each trace. When disabled, the hostname of the Agent is used instead.

`DD_TRACE_REQUEST_HEADER_TAGS`
: **Since**: 1.54.0 <br>
**Type**: `map`<br>
**Default**: N/A<br>
Accepts a map of case-insensitive header keys to tag names and automatically applies matching request header values as tags on traces. Also accepts entries without a specified tag name that are automatically mapped to tags of the form `http.request.headers.<header-name>`. Available since version 0.96.0.

`DD_TRACE_REQUEST_HEADER_TAGS_COMMA_ALLOWED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
HTTP request header tags parsing: when enabled (default), allows commas in tagged header values; when disabled, only the first comma-separated value is used when extracting request header tags.

`DD_TRACE_RESPONSE_HEADER_TAGS`
: **Since**: 1.54.0 <br>
**Type**: `map`<br>
**Default**: N/A<br>
Accepts a map of case-insensitive header keys to tag names and automatically applies matching response header values as tags on traces. Also accepts entries without a specified tag name that are automatically mapped to tags of the form `http.response.headers.<header-name>`. Available since version 0.96.0.

`DD_TRACE_RESTLET_HTTP_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_RESTLET_HTTP_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the Restlet HTTP integration

`DD_TRACE_RESTLET_HTTP_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_RESTLET_HTTP_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the Restlet HTTP integration

`DD_TRACE_RESTLET_HTTP_SERVER_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_RESTLET_HTTP_SERVER_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the Restlet integration

`DD_TRACE_RESTLET_HTTP_SERVER_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_RESTLET_HTTP_SERVER_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the Restlet integration

`DD_TRACE_RMI_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_RMI_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the Java RMI integration

`DD_TRACE_RMI_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_RMI_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the Java RMI integration

`DD_TRACE_RMI_CLIENT_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_RMI_CLIENT_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the RmiClient integration

`DD_TRACE_RMI_CLIENT_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_RMI_CLIENT_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the RmiClient integration

`DD_TRACE_RMI_SERVER_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_RMI_SERVER_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the RmiServer integration

`DD_TRACE_RMI_SERVER_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_RMI_SERVER_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the RmiServer integration

`DD_TRACE_RUNTIME_CONTEXT_FIELD_INJECTION`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Runtime context field injection: when enabled, injects context-store fields into instrumented types at runtime (field-backed context storage) instead of relying on external maps. Default: true.

`DD_TRACE_SAMPLE_RATE`
: **Since**: 1.54 <br>
**Aliases**: `OTEL_TRACES_SAMPLER`<br>
**Type**: `decimal`<br>
**Default**: N/A<br>
Controls the ingestion sample rate (between 0.0 and 1.0) between the Agent and the backend. Use OTEL_TRACES_SAMPLER as an alias

`DD_TRACE_SAMPLING_MECHANISM_VALIDATION_DISABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Sampling mechanism validation: when enabled, bypasses validation that would otherwise reject invalid sampling mechanism + sampling priority combinations when setting sampling priority. Default: false.

`DD_TRACE_SAMPLING_OPERATION_RULES`
: **Since**: 1.54.0 <br>
**Type**: `map`<br>
**Default**: N/A<br>
Deprecated trace sampling operation rules: map of operation name -> sampling rate (0.0-1.0) used by the rule-based trace sampler when `DD_TRACE_SAMPLING_RULES` is not set.

`DD_TRACE_SAMPLING_RULES`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `""`<br>
JSON array of sampling rules. The rule is matched in order of specification. The first match in a list is used. Per entry: The item "sample_rate" is required in decimal format. The item "service" is optional in regular expression format, to match on service name. The item "name" is optional in regular expression format, to match on operation name. To give a rate of 50% to any traces in a service starting with the text "cart": '[{"sample_rate":0.5, "service":"cart.*"}]' To give a rate of 20% to any traces which have an operation name of "http.request": '[{"sample_rate":0.2, "name":"http.request"}]' To give a rate of 100% to any traces within a service named "background" and with an operation name of "sql.query": '[{"sample_rate":1.0, "service":"background", "name":"sql.query"}] To give a rate of 10% to all traces '[{"sample_rate":0.1}]' To configure multiple rules, separate by semi-colon and order from most specific to least specific: '[{"sample_rate":0.5, "service":"cart.*"}, {"sample_rate":0.2, "name":"http.request"}, {"sample_rate":1.0, "service":"background", "name":"sql.query"}, {"sample_rate":0.1}]' If no rules are specified, or none match, default internal sampling logic will be used.

`DD_TRACE_SAMPLING_SERVICE_RULES`
: **Since**: 1.54.0 <br>
**Type**: `map`<br>
**Default**: N/A<br>
Deprecated trace sampling service rules: map of service name -> sampling rate (0.0-1.0) used by the rule-based trace sampler when `DD_TRACE_SAMPLING_RULES` is not set.

`DD_TRACE_SCALA_PROMISE_COMPLETION_PRIORITY_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_INTEGRATION_SCALA_PROMISE_COMPLETION_PRIORITY_ENABLED`, `DD_TRACE_INTEGRATION_SCALA_PROMISE_COMPLETION_PRIORITY_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Scala Promise completion priority: when enabled, Scala Promise instrumentation prefers the span associated with the promise completion (stored on the resolved `Try`) when capturing context for promise callbacks/transformations, so callbacks run under the completing span's context. Default: false.

`DD_TRACE_SCOPE_DEPTH_LIMIT`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `100`<br>
Scope depth limit: maximum depth of the tracer's scope stack (nested activations). When the limit is reached, further activations return a NoopScope (no new scope is pushed). Use `0` for unlimited. Default: 100.

`DD_TRACE_SCOPE_ITERATION_KEEP_ALIVE`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `30`<br>
Iteration scope keep-alive (seconds): how long iteration scopes created via `AgentTracer.activateNext(...)` may remain alive before background cleanup marks them overdue and finishes the associated span (with end-to-end semantics). Default: 30 seconds.

`DD_TRACE_SCOPE_STRICT_MODE`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Scope strict mode: when enabled, closing a manual scope out of order throws a RuntimeException (instead of only logging/debugging), helping detect incorrect scope usage. Default: false.

`DD_TRACE_SECURE_RANDOM`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Secure random ID generation: when enabled, forces the tracer to use the `SECURE_RANDOM` ID generation strategy (based on `SecureRandom`) for trace/span IDs. This is also forced on AWS Lambda SnapStart (`AWS_LAMBDA_INITIALIZATION_TYPE=snap-start`). Default: false.

`DD_TRACE_SELENIUM_ENABLED`
: **Since**: 1.55.0 <br>
**Aliases**: `DD_TRACE_INTEGRATION_SELENIUM_ENABLED`, `DD_INTEGRATION_SELENIUM_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `true`<br>
No description available.

`DD_TRACE_SERIALVERSIONUID_FIELD_INJECTION`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
SerialVersionUID field injection: when enabled, if the agent injects field-backed context into a `Serializable` class that does not declare `serialVersionUID`, it injects a computed `serialVersionUID` field to preserve serialization compatibility after instrumentation. Default: true.

`DD_TRACE_SERVLET_2_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_SERVLET_2_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the Servlet 2.x integration

`DD_TRACE_SERVLET_2_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_SERVLET_2_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the Servlet 2.x integration

`DD_TRACE_SERVLET_3_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_SERVLET_3_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the Servlet 3.x integration

`DD_TRACE_SERVLET_3_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_SERVLET_3_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the Servlet 3.x integration

`DD_TRACE_SERVLET_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_SERVLET_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the Servlet integration

`DD_TRACE_SERVLET_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_SERVLET_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the Servlet integration

`DD_TRACE_SERVLET_ASYNC_TIMEOUT_ERROR`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
By default, long running asynchronous requests will be marked as an error, setting this value to false allows to mark all timeouts as successful requests.

`DD_TRACE_SERVLET_DISPATCHER_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_SERVLET_DISPATCHER_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the Servlet dispatcher integration

`DD_TRACE_SERVLET_DISPATCHER_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_SERVLET_DISPATCHER_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the Servlet dispatcher integration

`DD_TRACE_SERVLET_FILTER_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_SERVLET_FILTER_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the Filter integration

`DD_TRACE_SERVLET_FILTER_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_SERVLET_FILTER_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the Filter integration

`DD_TRACE_SERVLET_FILTER_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_TRACE_INTEGRATION_SERVLET_FILTER_ENABLED`, `DD_INTEGRATION_SERVLET_FILTER_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables Servlet Filter (Filter) instrumentation

`DD_TRACE_SERVLET_PRINCIPAL_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
When `true`, user principal is collected. Available for versions 0.61+.

`DD_TRACE_SERVLET_RESPONSE_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_SERVLET_RESPONSE_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the Servlet response integration

`DD_TRACE_SERVLET_RESPONSE_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_SERVLET_RESPONSE_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the Servlet response integration

`DD_TRACE_SERVLET_ROOT_CONTEXT_SERVICE_NAME`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `root-servlet`<br>
Servlet root context service name: when servlet-context based service naming is applied and the servlet context is `/`, this value is used as the service name instead of an empty name. Default: `root-servlet`.

`DD_TRACE_SERVLET_SERVICE_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_SERVLET_SERVICE_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the HttpServlet integration

`DD_TRACE_SERVLET_SERVICE_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_SERVLET_SERVICE_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the HttpServlet integration

`DD_TRACE_SERVLET_SERVICE_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_TRACE_INTEGRATION_SERVLET_SERVICE_ENABLED`, `DD_INTEGRATION_SERVLET_SERVICE_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables Servlet Service (HttpServlet) instrumentation

`DD_TRACE_SPAN_ATTRIBUTE_SCHEMA`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `v0`<br>
Sets the schema version for service naming and span attributes. Accepted values are: "v1", "v0". Default value is "v0".

`DD_TRACE_SPAN_TAGS`
: **Since**: 1.54.0 <br>
**Type**: `map`<br>
**Default**: N/A<br>
A list of default tags to be added to every span.

`DD_TRACE_SPARKJAVA_2_4_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_INTEGRATION_SPARKJAVA_2_4_ENABLED`, `DD_TRACE_INTEGRATION_SPARKJAVA_2_4_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables SparkJava 2.4 (Routes) instrumentation

`DD_TRACE_SPARKJAVA_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_INTEGRATION_SPARKJAVA_ENABLED`, `DD_TRACE_INTEGRATION_SPARKJAVA_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables SparkJava (Routes) instrumentation

`DD_TRACE_SPARK_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_TRACE_INTEGRATION_SPARK_ENABLED`, `DD_INTEGRATION_SPARK_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables Apache Spark tracing for data jobs (injects the Datadog Spark listener into `SparkContext`/`LiveListenerBus`, captures application lifecycle for job execution, and can enrich Spark SQL plans / integrate with OpenLineage when enabled)

`DD_TRACE_SPARK_EXECUTOR_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_SPARK_EXECUTOR_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the SparkExecutor integration

`DD_TRACE_SPARK_EXECUTOR_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_SPARK_EXECUTOR_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the SparkExecutor integration

`DD_TRACE_SPARK_EXECUTOR_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_TRACE_INTEGRATION_SPARK_EXECUTOR_ENABLED`, `DD_INTEGRATION_SPARK_EXECUTOR_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables Spark Executor (SparkExecutor) instrumentation

`DD_TRACE_SPARK_EXIT_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_INTEGRATION_SPARK_EXIT_ENABLED`, `DD_TRACE_INTEGRATION_SPARK_EXIT_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables Spark Exit (SparkExit) instrumentation

`DD_TRACE_SPARK_OPENLINEAGE_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_INTEGRATION_SPARK_OPENLINEAGE_ENABLED`, `DD_TRACE_INTEGRATION_SPARK_OPENLINEAGE_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables Spark OpenLineage (OpenLineage) instrumentation

`DD_TRACE_SPLIT_BY_TAGS`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Used to rename the service name associated with spans to be identified with the corresponding span tag

`DD_TRACE_SPRAY_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_SPRAY_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the SprayHttpServer integration

`DD_TRACE_SPRAY_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_SPRAY_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the SprayHttpServer integration

`DD_TRACE_SPRING_DATA_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_SPRING_DATA_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the SpringRepository integration

`DD_TRACE_SPRING_DATA_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_SPRING_DATA_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the SpringRepository integration

`DD_TRACE_SPRING_MESSAGING_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_SPRING_MESSAGING_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the SpringMessageHandler integration

`DD_TRACE_SPRING_MESSAGING_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_SPRING_MESSAGING_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the SpringMessageHandler integration

`DD_TRACE_SPRING_MESSAGING_E2E_DURATION_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_SPRING_MESSAGING_E2E_DURATION_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Spring Messaging end-to-end duration: when enabled for `spring-messaging`, the messaging decorator calls `span.beginEndToEnd()` at span start, enabling end-to-end duration calculation when spans are finished with end-to-end semantics. Default: false.

`DD_TRACE_SPRING_SCHEDULING_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_SPRING_SCHEDULING_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the SpringScheduling integration

`DD_TRACE_SPRING_SCHEDULING_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_SPRING_SCHEDULING_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the SpringScheduling integration

`DD_TRACE_SPRING_SCHEDULING_LEGACY_TRACING_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_SPRING_SCHEDULING_LEGACY_TRACING_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Spring Scheduling legacy tracing: when enabled, scheduled task spans are started with an implicit parent (linked to the currently active span). When disabled, scheduled task spans are started with an explicit `null` parent (new trace). Default: false.

`DD_TRACE_SPRING_WEBFLUX_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_SPRING_WEBFLUX_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the Spring WebFlux integration

`DD_TRACE_SPRING_WEBFLUX_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_SPRING_WEBFLUX_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the Spring WebFlux integration

`DD_TRACE_SPRING_WEBFLUX_CLIENT_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_SPRING_WEBFLUX_CLIENT_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the WebClientFilter integration

`DD_TRACE_SPRING_WEBFLUX_CLIENT_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_SPRING_WEBFLUX_CLIENT_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the WebClientFilter integration

`DD_TRACE_SPRING_WEB_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_SPRING_WEB_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the Spring Web integration

`DD_TRACE_SPRING_WEB_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_SPRING_WEB_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the Spring Web integration

`DD_TRACE_SPYMEMCACHED_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_SPYMEMCACHED_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the Spymemcached integration

`DD_TRACE_SPYMEMCACHED_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_SPYMEMCACHED_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the Spymemcached integration

`DD_TRACE_SQS_BODY_PROPAGATION_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
SQS body propagation: when enabled, if the `_datadog` SQS message attribute is not present, the tracer attempts to parse the message body as JSON and extract `MessageAttributes._datadog` for context propagation. Default: false.

`DD_TRACE_STARTUP_LOGS`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enable startup configuration and diagnostic log.

`DD_TRACE_STATS_COMPUTATION_ENABLED`
: **Since**: 1.55.0 <br>
**Aliases**: `DD_TRACE_TRACER_METRICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Controls whether client-side trace statistics computation is enabled. Defaults to true.

`DD_TRACE_STRICT_WRITES_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Strict trace writes: when enabled, enforces strict pending-reference accounting when deciding to write a trace (throws if the pending reference count becomes negative, and writes as soon as the reference count reaches zero). Default: false.

`DD_TRACE_SYNAPSE3_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_SYNAPSE3_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the Synapse 3 integration

`DD_TRACE_SYNAPSE3_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_SYNAPSE3_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the Synapse 3 integration

`DD_TRACE_TAGS`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_TAGS`<br>
**Type**: `map`<br>
**Default**: N/A<br>
A list of default tags to be added to every span, profile, and JMX metric. If DD_ENV or DD_VERSION is used, it overrides any env or version tag defined in DD_TAGS. Available for versions 0.50.0+.

`DD_TRACE_THREAD_POOL_EXECUTORS_EXCLUDE`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
ThreadPoolExecutor instrumentation exclude list: list of fully-qualified `ThreadPoolExecutor` implementation class names that should not be instrumented for task context propagation/wrapping. Default: unset.

`DD_TRACE_THREAD_POOL_EXECUTORS_LEGACY_TRACING_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Thread pool executors legacy tracing: when enabled, the thread-pool-executors instrumentation uses wrapping-based propagation for tasks (wrapping `Runnable`s). When disabled (default), it uses field-backed context storage on tasks (and a ThreadLocal between executor hooks) instead of wrapping.

`DD_TRACE_TIBCO_BW_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_TIBCO_BW_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the Tibco BusinessWorks integration

`DD_TRACE_TIBCO_BW_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_TIBCO_BW_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the Tibco BusinessWorks integration

`DD_TRACE_TOMCAT_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_TOMCAT_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the Tomcat integration

`DD_TRACE_TOMCAT_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_TOMCAT_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the Tomcat integration

`DD_TRACE_TRACER_METRICS_BUFFERING_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Tracer metrics buffering: when enabled, tracer metrics payloads are buffered and sent asynchronously when agent request latency is high; when disabled, metrics are sent synchronously (no buffering). Default: false.

`DD_TRACE_TRACER_METRICS_IGNORED_RESOURCES`
: **Since**: 1.54.0 <br>
**Type**: `array`<br>
**Default**: N/A<br>
Tracer metrics ignored resources: list of span resource names for which tracer metrics should not be computed. If a span's resource name matches an ignored entry, the tracer skips metrics publication for that trace (and its children). Default: unset.

`DD_TRACE_TRACER_METRICS_MAX_AGGREGATES`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `2048`<br>
Tracer metrics max aggregates: limits the number of distinct metric aggregates kept by the tracer metrics aggregator (conflation pool/pending map sizing). Default: 2048.

`DD_TRACE_TRACER_METRICS_MAX_PENDING`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `2048`<br>
Tracer metrics max pending: size of the internal pending queue used by the tracer metrics aggregator for incoming metric events; when the queue is full, new metric events may be dropped. Default: 2048.

`DD_TRACE_TRACE_ANNOTATION_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_TRACE_ANNOTATION_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the TraceAnnotations integration

`DD_TRACE_TRACE_ANNOTATION_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_TRACE_ANNOTATION_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the TraceAnnotations integration

`DD_TRACE_TRACE_CONFIG_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_TRACE_CONFIG_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the TraceConfig integration

`DD_TRACE_TRACE_CONFIG_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_TRACE_CONFIG_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the TraceConfig integration

`DD_TRACE_TRIAGE`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Triage mode: when enabled, turns on additional diagnostics/metrics intended for troubleshooting (for example instrumenter matching/transform timing), and causes tracer flares to include thread dumps even when debug logging is not enabled. Note: setting `DD_TRIAGE_REPORT_TRIGGER` implicitly enables triage mode unless overridden.

`DD_TRACE_TWILIO_SDK_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_TWILIO_SDK_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the Twilio SDK integration

`DD_TRACE_TWILIO_SDK_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_TWILIO_SDK_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the Twilio SDK integration

`DD_TRACE_UNDERTOW_HTTP_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_UNDERTOW_HTTP_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the Undertow HTTP integration

`DD_TRACE_UNDERTOW_HTTP_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_UNDERTOW_HTTP_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the Undertow HTTP integration

`DD_TRACE_UNDERTOW_HTTP_SERVER_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_UNDERTOW_HTTP_SERVER_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the Undertow HTTP server integration

`DD_TRACE_UNDERTOW_HTTP_SERVER_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_UNDERTOW_HTTP_SERVER_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the Undertow HTTP server integration

`DD_TRACE_URLCONNECTION_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_URLCONNECTION_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the Url integration

`DD_TRACE_URLCONNECTION_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_URLCONNECTION_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the Url integration

`DD_TRACE_URLCONNECTION_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_TRACE_INTEGRATION_URLCONNECTION_ENABLED`, `DD_INTEGRATION_URLCONNECTION_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables URLConnection (Url) instrumentation

`DD_TRACE_VALKEY_ANALYTICS_ENABLED`
: **Since**: 1.55.0 <br>
**Aliases**: `DD_VALKEY_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
This setting is currently not used by the valkey-go integration and has no effect.

`DD_TRACE_VALKEY_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_VALKEY_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the Valkey integration

`DD_TRACE_VERTX_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_VERTX_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the Vert.x integration

`DD_TRACE_VERTX_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_VERTX_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the Vert.x integration

`DD_TRACE_VERTX_REDIS_CLIENT_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_VERTX_REDIS_CLIENT_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the Vert.x Redis client integration

`DD_TRACE_VERTX_REDIS_CLIENT_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_VERTX_REDIS_CLIENT_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the Vert.x Redis client integration

`DD_TRACE_VERTX_ROUTE_HANDLER_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_VERTX_ROUTE_HANDLER_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the Vert.x route handler integration

`DD_TRACE_VERTX_ROUTE_HANDLER_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_VERTX_ROUTE_HANDLER_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the Vert.x route handler integration

`DD_TRACE_VERTX_SQL_CLIENT_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_VERTX_SQL_CLIENT_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the Vert.x SQL client integration

`DD_TRACE_VERTX_SQL_CLIENT_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_VERTX_SQL_CLIENT_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the Vert.x SQL client integration

`DD_TRACE_WEBSOCKET_ANALYTICS_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_WEBSOCKET_ANALYTICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables trace analytics for spans produced by the WebSocket integration

`DD_TRACE_WEBSOCKET_ANALYTICS_SAMPLE_RATE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_WEBSOCKET_ANALYTICS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `1.0`<br>
Sampling rate for analytics events generated by the WebSocket integration

`DD_TRACE_WEBSOCKET_ENABLED`
: **Since**: 1.55.0 <br>
**Aliases**: `DD_INTEGRATION_WEBSOCKET_ENABLED`, `DD_TRACE_INTEGRATION_WEBSOCKET_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables WebSocket tracing (links WebSocket sessions to the active HTTP handshake span, creates spans for WebSocket frame send/receive and session close events for javax/jakarta WebSocket APIs and Jetty WebSocket, and propagates handshake context through Tomcat WebSocket handshakes/upgrades)

`DD_TRACE_WEBSOCKET_MESSAGES_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables tracing sent and received websocket messages (text and binary) and connection close events.

`DD_TRACE_WEBSOCKET_MESSAGES_INHERIT_SAMPLING`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
By default, websocket messages preserve the same sampling as the span captured during the handshake. This ensures that, if a handshake span has been sampled, all the messages in its session will also be sampled. To disable that behavior and sample each websocket message independently, set this configuration to `false`.

`DD_TRACE_WEBSOCKET_MESSAGES_SEPARATE_TRACES`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
By default, each received message generates a new trace. The handshake is linked to it as a span link. Setting this parameter to `false` causes all the spans captured during the session to be in the same trace.

`DD_TRACE_WEBSOCKET_TAG_SESSION_ID`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
When set to `true`, the websocket spans have the tag `websocket.session.id` containing the session ID when available.

`DD_TRACE_X_DATADOG_TAGS_MAX_LENGTH`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `512`<br>
Maximum length of the `x-datadog-tags` header for trace tag propagation. Set to 0 to disable.

`DD_TRACE_ZIO_EXPERIMENTAL_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_INTEGRATION_ZIO_EXPERIMENTAL_ENABLED`, `DD_TRACE_INTEGRATION_ZIO_EXPERIMENTAL_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables ZIO Experimental (ZioRuntime) instrumentation
