---
title: Configure the Datadog Tracing Library
type: multi-code-lang
---

This page describes configuration options that behave consistently across all languages. To view these common configuration options, see [Common configuration options](#common-configuration-options).

For configuration options specific to your programming language, choose your language from the options below:

{{< partial name="apm/apm-compatibility.html" >}}

<br>

To instrument an application written in a language that does not yet have official library support, see the list of [community tracing libraries][1].

## Common configuration options
The following configuration options behave consistently across the latest versions of all Datadog SDKs, unless otherwise noted:

### Traces

`DD_TRACE_<INTEGRATION>_ENABLED`
: **Default**: `true` <br>
**Supported Input**: Boolean <br>
**Caveats**: Not supported in Go; [Some Java integrations are disabled by default][2].<br/>
**Description**: Enables or disables instrumentation for the specified `<INTEGRATION>`. The integration name must be in uppercase (for example, `DD_TRACE_KAFKA_ENABLED=true`)

`DD_TRACE_RATE_LIMIT`
: **Default**: `100` <br>
**Supported Input**: A positive integer<br>
**Caveats**: `200` is the default value of `DD_TRACE_RATE_LIMIT` in C++<br>
**Description**: Sets the maximum number of traces to sample per second; applies only when either `DD_TRACE_SAMPLING_RULES` or `DD_TRACE_SAMPLE_RATE` is set.

`DD_TRACE_HEADER_TAGS`
: **Default**: `null` <br>
**Supported Input**: A comma-separated string representing a list of case-insensitive HTTP headers, with an optional mapping to a custom tag name. Example: `User-Agent:my-user-agent,Content-Type`. <br>
**Description**: Automatically apply specified HTTP headers as span tags. If a custom tag name is not specified, the tag key defaults to `http.request.headers.<normalized-header-name>` for request headers and `http.response.headers.<normalized-header-name>` for response headers.

`DD_TRACE_ENABLED`
: **Default**: `true` <br>
**Supported Input**: Boolean <br>
**Description**: Enables or disables sending traces from the application.

`DD_TRACE_OBFUSCATION_QUERY_STRING_REGEXP`
: **Default**: <br>
    ```
    (?i)(?:(?:"|%22)?)(?:(?:old[-_]?|new[-_]?)?p(?:ass)?w(?:or)?d(?:1|2)?|pass(?:[-_]?phrase)?|secret|(?:api[-_]?|private[-_]?|public[-_]?|access[-_]?|secret[-_]?|app(?:lication)?[-_]?)key(?:[-_]?id)?|token|consumer[-_]?(?:id|key|secret)|sign(?:ed|ature)?|auth(?:entication|orization)?)(?:(?:\s|%20)*(?:=|%3D)[^&]+|(?:"|%22)(?:\s|%20)*(?::|%3A)(?:\s|%20)*(?:"|%22)(?:%2[^2]|%[^2]|[^"%])+(?:"|%22))|(?:bearer(?:\s|%20)+[a-z0-9._\-]+|token(?::|%3A)[a-z0-9]{13}|gh[opsu]_[0-9a-zA-Z]{36}|ey[I-L](?:[\w=-]|%3D)+\.ey[I-L](?:[\w=-]|%3D)+(?:\.(?:[\w.+/=-]|%3D|%2F|%2B)+)?|-{5}BEGIN(?:[a-z\s]|%20)+PRIVATE(?:\s|%20)KEY-{5}[^\-]+-{5}END(?:[a-z\s]|%20)+PRIVATE(?:\s|%20)KEY(?:-{5})?(?:\n|%0A)?|(?:ssh-(?:rsa|dss)|ecdsa-[a-z0-9]+-[a-z0-9]+)(?:\s|%20|%09)+(?:[a-z0-9/.+]|%2F|%5C|%2B){100,}(?:=|%3D)*(?:(?:\s|%20|%09)+[a-z0-9._-]+)?)
    ```
: **Supported Input**: A regex string <br>
: **Description**: Applies a regex to redact sensitive data from query strings on incoming HTTP requests. The default regex matches various sensitive data patterns, including passwords, tokens, API keys, private keys, and authorization terms. Matches are replaced with `<redacted>`. If an empty string is passed, no obfuscation occurs. The resulting value is reported in the `http.url` tag.

### Diagnostics

`DD_TRACE_LOG_DIRECTORY`
: **Default**: Varies by SDK, environment, and runtime. Please read more in the specific configuration page above for your chosen language <br>
**Supported Input**: A valid full or relative directory path that exists on the system<br>
**Caveats**: Not supported in Java, Node.js, Ruby, Python<br>
**Description**: Specifies the directory where tracer log files should be routed. If the directory does not exist, the SDK falls back to its default diagnostic logging method.

### Agent

`DD_TRACE_AGENT_URL`
: **Default**: `http://localhost:8126` <br>
**Supported Input**: A string representing an HTTP or UDS url <br>
**Description**: The URL for connecting the tracer to the Datadog agent. Valid URL schemas include `http://` and `unix://` (UNIX Domain Sockets). This value takes precedence over `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT` if set.

### Unified Service Tagging

`DD_VERSION`
: **Default**: `null`<br>
**Supported Input**: A string representing an application version<br>
**Caveats**: Node.js defaults to the version number from package.json<br/>
**Description**: Adds a `version` tag to all spans, except for [Inferred services][3]

`DD_SERVICE`
: **Default**: `null`, the SDK tries to automatically determine a service name<br>
**Supported Input**: A string representing an application service name <br>
**Description**: Sets the default service name used for most spans. SDKs may set a different service name for inferred services. Integration spans may use their own default names, which can differ from the value specified in `DD_SERVICE`

`DD_ENV`
: **Default**: `null` <br>
**Supported Input**: A string representing an application environment name (for example, `prod`, `dev`) <br>
**Description**: Adds an environment tag to all spans generated by the tracer instance.

`DD_TAGS`
: **Default**: `null` <br>
**Supported Input**: A string representing key value pairs that are delimited by a colon and seperate by a comma and/or a space (for example, `<key1>:<value1>, <key2>:<value2>`>) <br>
**Description**: Tags to apply to produced data. Must be a list of `<key>:<value>` separated by commas and/or spaces.

`DD_TRACE_SAMPLING_RULES`
: **Default**: `null` <br>
**Supported Input**: A JSON string representing an array of sampling rules. Each rule must contain a `sample_rate` (float between 0 and 1) and can optionally include a `service` (string) and `name` (string) pattern to match. Example: `[{"sample_rate": 0.1, "service": "my-service", "name": "http.request"}]` <br>
**Description**: Configures custom sampling rules for traces. Rules are evaluated in order, and the first matching rule determines the sampling rate. If no rules match, the default sampling rate is used.

`DD_TRACE_128_BIT_TRACEID_GENERATION_ENABLED`
: **Default**: `true` <br>
**Supported Input**: Boolean (`true`/`false`) <br>
**Description**: Enables or disables the generation of 128-bit trace IDs. When enabled, trace IDs are generated as 32-character hexadecimal strings. When disabled, 64-bit trace IDs are used instead.

`DD_TRACE_128_BIT_TRACEID_LOGGING_ENABLED`
: **Default**: `true` <br>
**Supported Input**: Boolean (`true`/`false`) <br>
**Caveats**: Not supported in C++<br>
**Description**: Controls whether 128-bit trace IDs are logged in their full format. When disabled, only the lower 64 bits are logged.

`DD_TRACE_CLIENT_IP_ENABLED`
: **Default**: `true` <br>
**Supported Input**: Boolean (`true`/`false`) <br>
**Caveats**: Not supported in C++<br>
**Description**: Enables or disables the automatic collection of client IP addresses from HTTP request headers. When enabled, the IP address is stored in the `http.client_ip` span tag.

`DD_RUNTIME_METRICS_ENABLED`
: **Default**: `false` <br>
**Supported Input**: Boolean (`true`/`false`) <br>
**Caveats**: Not supported in C++ and PHP<br>
**Description**: Enables or disables the collection of runtime metrics (such as garbage collection stats, memory usage, and thread counts) for the application.

`DD_LOGS_INJECTION`
: **Default**: `false` <br>
**Supported Input**: Boolean (`true`/`false`) <br>
**Caveats**: Not supported in C++ and Go. The default value in Ruby is `true`<br>
**Description**: Enables or disables the automatic injection of trace context (trace ID, span ID) into application logs. This allows for correlation between traces and logs.

`DD_DOGSTATSD_PORT`
: **Default**: `8125` <br>
**Supported Input**: Integer between 0 and 65535 <br>
**Caveats**: Not supported in C++, Ruby, .NET<br>
**Description**: Specifies the port number for the DogStatsD server to which runtime metrics are sent.

`DD_DOGSTATSD_HOST`
: **Default**: `localhost` <br>
**Supported Input**: String representing a hostname or IP address <br>
**Caveats**: Not supported in C++, Ruby, .NET<br>
**Description**: Specifies the hostname or IP address of the DogStatsD server to which runtime metrics are sent.

`DD_TRACE_EXPERIMENTAL_FEATURES_ENABLED`
: **Default**: `null` <br>
**Supported Input**: A comma-separated list of configuration options that support experimental features (for example, `DD_TAGS,DD_RUNTIME_METRICS_ENABLED`) <br>
**Caveats**: Only supported in Java and .NET <br>
**Description**: Enables experimental features for specific configuration options. When enabled, these features may provide additional functionality but are not yet considered stable and may change or be removed in future releases. Each feature must be explicitly listed to be enabled.

### Integrations

`DD_TRACE_HTTP_CLIENT_ERROR_STATUSES`
: **Default**: `400-499` <br>
**Supported Input**: A comma-separated string of the form `from-to`, where `from` and `to` are integers. Singular values are also accepted (for example, `400-403,405,410-499`). <br>
**Caveats**: Not supported in Node.js<br>
**Description**: Defines the inclusive range of status codes to be considered as errors on automatically collected HTTP client spans. Only the values within the specified range are considered errors.

`DD_TRACE_HTTP_SERVER_ERROR_STATUSES`
: **Default**: `500-599` <br>
**Supported Input**: A comma-separated string of the form `from-to`, where `from` and `to` are integers. Singular values are also accepted (for example, `400-403,405,410-499`). <br>
**Caveats**: Not supported in Node.js<br>
**Description**: Defines the inclusive range of status codes to be considered errors on `http.server` span kinds. Only the values within the specified range are considered errors.

`DD_TRACE_HTTP_CLIENT_TAG_QUERY_STRING`
: **Default**: `true` <br>
**Supported Input**: Boolean <br>
**Caveats**: Not supported in Node.js; Disabled by default in Go<br/>
**Description**: Enables or disables the inclusion of the query string in the `http.url` span tag value for automatically collected HTTP spans.

`DD_TRACE_CLIENT_IP_HEADER`
: **Default**: `null` <br>
**Supported Input**: Any non-empty string <br>
**Description**: Configures a custom header name from which to source the `http.client_ip` tag value. If this variable is set, all other IP-related headers are ignored (for example, setting `DD_TRACE_CLIENT_IP_HEADER=custom-ip-header` and including the header `custom-ip-header: 5.6.7.9` in a request results in a span tagged with `"http.client_ip": "5.6.7.9"`). If an empty string or null value is passed, IP headers are queried in this order:
  - `x-forwarded-for`
  - `x-real-ip`
  - `true-client-ip`
  - `x-client-ip`
  - `x-forwarded`
  - `forwarded-for`
  - `x-cluster-client-ip`
  - `fastly-client-ip`
  - `cf-connecting-ip`
  - `cf-connecting-ipv6`


[1]: /developers/community/libraries/#apm-tracing-client-libraries
[2]: /tracing/trace_collection/compatibility/java/#framework-integrations-disabled-by-default
[3]: /tracing/services/inferred_services/
