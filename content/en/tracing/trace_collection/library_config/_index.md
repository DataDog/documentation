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

`DD_TRACE_SAMPLE_RATE`
: **Default**: `-1`. If unset, the tracer defers to the Datadog Agent to control sample rate. <br>
**Supported Input**: A float between 0.0 and 1.0, inclusive.  <br>
**Caveats**: This variable is deprecated in favor of `DD_TRACE_SAMPLING_RULES`, which provides more flexible and granular sampling control.  <br>
**Description**:  Controls the trace ingestion sample rate between the Datadog Agent and the backend. Must be a float between 0.0 and 1.0, where 1.0 means all traces are sent to the backend and 0.0 means none are sent. This setting applies globally to all traces and does not support per-service or per-operation targeting.

`DD_TRACE_SAMPLING_RULES`
: **Default**: `null`. If unset or no rules match, the tracer defers to the Datadog Agent to dynamically adjust sample rate across traces.  <br>
**Supported Input**: A JSON array of objects. <br>
**Caveats**: Matching by `resource` and `tags` is in Preview.  <br>
**Description**: Enables fine-grained control over trace ingestion, allowing you to target specific services, operations, resources, or tagged traces. Defined by a JSON array of objects, where each object must include a `sample_rate` between 0.0 and 1.0 (inclusive), and can optionally include fields such as `service`, `name`, `resource`, `tags`, and `max_per_second`. Objects are evaluated in the order listed; the first matching object determines the trace's sample rate. For more information, see [Ingestion Mechanisms][4]. <br>
**Examples**: <br>
  - Sample 20% of all traces: <br>

    ```
    [{"sample_rate": 0.2}]
    ```

  - Sample 10% of traces where the service name starts with `a` and the operation name is `b`, and 20% of all others: <br>

    ```
    [{"service": "a.*", "name": "b", "sample_rate": 0.1}, {"sample_rate": 0.2}]
    ```

  - Sample 40% of traces with the resource name `HTTP GET`:

    ```
    [{"resource": "HTTP GET", "sample_rate": 0.4}]
    ```

  - Sample 100% of traces with the tag `tier=premium`:

    ```
    [{"tags": {"tier": "premium"}, "sample_rate": 1}]
    ```

  - Sample up to 50 traces per second at a 50% rate for the service `my-service` and operation name `http.request`:

    ```
    [{"service": "my-service", "name": "http.request", "sample_rate": 0.5, "max_per_second": 50}]
    ```


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
[4]: /tracing/trace_pipeline/ingestion_mechanisms/?tab=net#pagetitle
