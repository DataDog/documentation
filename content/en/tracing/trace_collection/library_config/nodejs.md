---
title: Configuring the Node.js Tracing Library
kind: documentation
code_lang: nodejs
type: multi-code-lang
code_lang_weight: 30
further_reading:
    - link: 'https://github.com/DataDog/dd-trace-js'
      tag: "Source Code"
      text: 'Source code'
    - link: 'https://datadog.github.io/dd-trace-js'
      tag: 'Documentation'
      text: 'API documentation'
    - link: "/tracing/trace_collection/trace_context_propagation/nodejs/"
      tag: "Documentation"
      text: "Propagating trace context"
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Explore your services, resources and traces'
    - link: 'tracing/'
      tag: 'Documentation'
      text: 'Advanced Usage'
---

After you set up the tracing library with your code and configure the Agent to collect APM data, optionally configure the tracing library as desired, including setting up [Unified Service Tagging][1].

Tracer settings can be configured with the following environment variables:

### Tagging

`DD_ENV`
: **Configuration**: `env`<br>
**Default**: The environment configured in the Datadog Agent<br>
Set an application's environment (for example, `prod`, `pre-prod`, and `stage`).

`DD_SERVICE`
: **Configuration**: `service`<br>
**Default**: The `name` field in `package.json`<br>
The service name used for this application.

`DD_VERSION`
: **Configuration**: `version`<br>
**Default**: The `version` field in `package.json`<br>
The version number of the application.

`DD_TAGS`
: **Configuration**: `tags`<br>
**Default**: `{}`<br>
Set global tags that are applied to all spans and runtime metrics. When passed as an environment variable, the format is `key:value,key:value`. When setting this programmatically, the format is `tracer.init({ tags: { foo: 'bar' } })`.

`DD_TRACE_HEADER_TAGS`
: **Configuration**: `headerTags` <br>
**Default**: N/A <br>
Accepts a comma-delimited list of case-insensitive HTTP headers optionally mapped to tag names. Automatically applies matching header values as tags on traces. When a tag name is not specified, it defaults to tags of the form `http.request.headers.<header-name>` for requests and `http.response.headers.<header-name>` for responses. **Note**: This option is only supported for HTTP/1.<br><br>
**Example**: `User-ID:userId,Request-ID`<br>
  - If the **Request/Response** has a header `User-ID`, its value is applied as tag `userId` to the spans produced by the service.<br>
  - If the **Request/Response** has a header `Request-ID`, its value is applied as tag `http.request.headers.Request-ID` for requests and `http.response.headers.Request-ID` for responses.

It is recommended that you use `DD_ENV`, `DD_SERVICE`, and `DD_VERSION` to set `env`, `service`, and `version` for your services. Review the [Unified Service Tagging][1] documentation for recommendations on configuring these environment variables.

### Agent

`DD_TRACE_AGENT_URL`
: **Configuration**: `url`<br>
**Default**: `http://localhost:8126`<br>
The URL of the Trace Agent that the tracer submits to. Takes priority over hostname and port, if set. If the [Agent configuration][13] sets `receiver_port` or `DD_APM_RECEIVER_PORT` to something other than the default `8126`, then `DD_TRACE_AGENT_PORT` or `DD_TRACE_AGENT_URL` must match it. Supports Unix Domain Sockets in combination with the `apm_config.receiver_socket` in your `datadog.yaml` file, or the `DD_APM_RECEIVER_SOCKET` environment variable.

`DD_TRACE_AGENT_HOSTNAME`
: **Configuration**: `hostname`<br>
**Default**: `localhost`<br>
The address of the Agent that the tracer submits to.

`DD_TRACE_AGENT_PORT`
: **Configuration**: `port`<br>
**Default**: `8126`<br>
The port of the Trace Agent that the tracer submits to. If the [Agent configuration][13] sets `receiver_port` or `DD_APM_RECEIVER_PORT` to something other than the default `8126`, then `DD_TRACE_AGENT_PORT` or `DD_TRACE_AGENT_URL` must match it.

`DD_DOGSTATSD_PORT`
: **Configuration**: `dogstatsd.port`<br>
**Default**: `8125`<br>
The port of the DogStatsD Agent that metrics are submitted to. If the [Agent configuration][13] sets `dogstatsd_port` or `DD_DOGSTATSD_PORT` to something other than the default `8125`, then this tracing library `DD_DOGSTATSD_PORT` must match it.

`DD_RUNTIME_METRICS_ENABLED`
: **Configuration**: `runtimeMetrics`<br>
**Default**: `false`<br>
Whether to enable capturing runtime metrics. Port `8125` (or configured with `DD_DOGSTATSD_PORT`) must be opened on the Agent for UDP.

`DD_REMOTE_CONFIG_POLL_INTERVAL_SECONDS`
: **Configuration**: `remoteConfig.pollInterval`<br>
**Default**: 5<br>
Remote configuration polling interval in seconds.

### Traces

`DD_TRACE_ENABLED`
: **Configuration**: N/A<br>
**Default**: `true`<br>
Whether to enable dd-trace. Setting this to `false` disables all features of the library.

`DD_TRACING_ENABLED`
: **Configuration**: N/A<br>
**Default**: `true`<br>
Whether to enable tracing.

`DD_TRACE_DEBUG`
: **Configuration**: N/A<br>
**Default**: `false`<br>
Enable debug logging in the tracer.

`DD_TRACE_RATE_LIMIT`
: **Configuration**: `rateLimit`<br>
**Default**: `100` when `DD_TRACE_SAMPLE_RATE` is set. Otherwise, delegates rate limiting to the Datadog Agent.
The maximum number of traces per second per service instance.<br>


`DD_TRACE_SAMPLE_RATE`
: **Configuration**: `sampleRate`<br>
**Default**: Defers the decision to the Agent.<br>
Controls the ingestion sample rate (between 0.0 and 1.0) between the Agent and the backend.

`DD_TRACE_SAMPLING_RULES`
: **Configuration**: `samplingRules`<br>
**Default**: `[]`<br>
Sampling rules to apply to priority sampling. A JSON array of objects. Each object must have a `sample_rate` value between 0.0 and 1.0 (inclusive). Each rule has optional `name` and `service` fields, which are regex strings to match against a trace's `service` and `name`. Rules are applied in configured order to determine the trace's sample rate. If omitted, the tracer defers to the Agent to dynamically adjust sample rate across all traces.

`DD_SERVICE_MAPPING`
: **Configuration**: `serviceMapping`<br>
**Default**: N/A<br>
**Example**: `mysql:my-mysql-service-name-db,pg:my-pg-service-name-db`<br>
Provide service names for each plugin. Accepts comma separated `plugin:service-name` pairs, with or without spaces.

Flush Interval
: **Configuration**: `flushInterval`<br>
**Default**: `2000`<br>
Interval in milliseconds at which the tracer submits traces to the Agent.

`DD_TRACE_PARTIAL_FLUSH_MIN_SPANS`
: **Configuration**: `flushMinSpans`<br>
**Default**: `1000`<br>
Number of spans before partially exporting a trace. This prevents keeping all the spans in memory for very large traces.

`DD_TRACE_OBFUSCATION_QUERY_STRING_REGEXP`
: **Configuration**: N/A<br>
**Default**: N/A<br>
A regex to redact sensitive data from incoming requests' query string reported in the `http.url` tag (matches are replaced with `<redacted>`). Can be an empty string to disable redaction or `.*` to redact all query string. **WARNING: This regex executes for every incoming request on an unsafe input (url) so make sure you use a safe regex.**

`DD_TRACE_CLIENT_IP_HEADER`
: **Configuration**: N/A<br>
**Default**: N/A<br>
Custom header name to source the `http.client_ip` tag from.

DNS Lookup Function
: **Configuration**: `lookup`<br>
**Default**: `require('dns').lookup`<br>
Custom function for DNS lookups when sending requests to the Agent. Some setups have hundreds of services running, each doing DNS lookups on every flush interval, causing scaling issues. Override this to provide your own caching or resolving mechanism.

`DD_TRACE_AGENT_PROTOCOL_VERSION`
: **Configuration**: `protocolVersion`<br>
**Default**: `0.4`<br>
Protocol version to use for requests to the Agent. The version configured must be supported by the Agent version installed or all traces are dropped.

`DD_TRACE_REPORT_HOSTNAME`
: **Configuration**: `reportHostname`<br>
**Default**: `false`<br>
Whether to report the system's hostname for each trace. When disabled, the hostname of the Agent is used instead.

`DD_TRACE_STARTUP_LOGS`
: **Configuration**: `startupLogs`<br>
**Default**: `false`<br>
Enable tracer startup configuration and diagnostic log.

Experimental Features
: **Configuration**: `experimental`<br>
**Default**: `{}`<br>
Experimental features can be enabled by adding predefined keys with a value of `true`. [Contact Support][4] to learn more about the available experimental features.

Automatically Instrument External Libraries
: **Configuration**: `plugins`<br>
**Default**: `true`<br>
Whether to enable automatic instrumentation of external libraries using the built-in plugins.

### ASM

`DD_APPSEC_ENABLED`
: **Configuration**: `appsec.enabled`<br>
**Default**: `false`<br>
Enable Application Security Management features.

`DD_APPSEC_RULES`
: **Configuration**: `appsec.rules`<br>
**Default**: N/A<br>
A path to a custom AppSec rules file.

`DD_APPSEC_WAF_TIMEOUT`
: **Configuration**: `appsec.wafTimeout`<br>
**Default**: `5000`<br>
Limits the WAF synchronous execution time (in microseconds).

`DD_APPSEC_OBFUSCATION_PARAMETER_KEY_REGEXP`
: **Configuration**: `appsec.obfuscatorKeyRegex`<br>
**Default**: N/A<br>
A regex string to redact sensitive data by its key in attack reports.

`DD_APPSEC_OBFUSCATION_PARAMETER_VALUE_REGEXP`
: **Configuration**: `appsec.obfuscatorValueRegex`<br>
**Default**: N/A<br>
A regex string to redact sensitive data by its value in attack reports.

### Logs

`DD_LOGS_INJECTION`
: **Configuration**: `logInjection`<br>
**Default**: `false`<br>
Enable automatic injection of trace IDs in logs for supported logging libraries.

`DD_TRACE_LOG_LEVEL`
: **Configuration**: `logLevel`<br>
**Default**: `debug`<br>
A string for the minimum log level for the tracer to use when debug logging is enabled, for example, `error`, `debug`.

### Profiling

`DD_PROFILING_ENABLED`
: **Configuration**: `profiling`<br>
**Default**: `false`<br>
Whether to enable profiling.

### Spans

`DD_SPAN_SAMPLING_RULES`
: **Configuration**: `spanSamplingRules`<br>
**Default**: `[]`<br>
Span sampling rules to keep individual spans when the rest of the trace would otherwise be dropped. A JSON array of objects. Rules are applied in configured order to determine the span's sample rate. The `sample_rate` value must be between 0.0 and 1.0 (inclusive).
For more information, see [Ingestion Mechanisms][3].<br>
**Example:**<br>
  - Set the span sample rate to 50% for the service `my-service` and operation name `http.request`, up to 50 traces per second: `'[{"service": "my-service", "name": "http.request", "sample_rate":0.5, "max_per_second": 50}]'`

`DD_SPAN_SAMPLING_RULES_FILE`
: **Configuration**: N/A<br>
**Default**: N/A<br>
Points to a JSON file that contains the span sampling rules. `DD_SPAN_SAMPLING_RULES` takes precedence over this variable. See `DD_SPAN_SAMPLING_RULES` for the rule format.

`DD_TRACE_DISABLED_PLUGINS`
: **Configuration**: N/A<br>
**Default**: N/A<br>
**Example**: `DD_TRACE_DISABLED_PLUGINS=express,dns`<br>
A comma-separated string of integration names automatically disabled when the tracer is initialized.

### Database monitoring

`DD_DBM_PROPAGATION_MODE`
: **Configuration**: `dbmPropagationMode`<br>
**Default**: `'disabled'`<br>
To enable DBM to APM link using tag injection, can be set to `'service'` or `'full'`. The `'service'` option enables the connection between DBM and APM services. The `'full'` option enables connection between database spans with database query events. Available for Postgres.

### Headers extraction and injection

For information about valid values and using the following configuration options, see [Propagating Node.js Trace Context][5].

`DD_TRACE_PROPAGATION_STYLE_INJECT`
: **Configuration**: `tracePropagationStyle.inject`<br>
**Default**: `Datadog,tracecontext`<br>
A comma-separated list of header formats to include to propagate distributed traces between services.

`DD_TRACE_PROPAGATION_STYLE_EXTRACT`
: **Configuration**: `tracePropagationStyle.extract`<br>
**Default**: `Datadog,tracecontext`<br>
A comma-separated list of header formats from which to attempt to extract distributed tracing propagation data. The first format found with complete and valid headers is used to define the trace to continue.

`DD_TRACE_PROPAGATION_STYLE`
: **Configuration**: `tracePropagationStyle`<br>
**Default**: `Datadog,tracecontext`<br>
A comma-separated list of header formats from which to attempt to inject and extract distributed tracing propagation data. The first format found with complete and valid headers is used to define the trace to continue. The more specific `DD_TRACE_PROPAGATION_STYLE_INJECT` and `DD_TRACE_PROPAGATION_STYLE_EXTRACT` configurations take priority when present.

For more examples of how to work with the library see [API documentation][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/unified_service_tagging/
[2]: https://datadog.github.io/dd-trace-js/
[3]: /tracing/trace_pipeline/ingestion_mechanisms/
[4]: /help/
[5]: /tracing/trace_collection/trace_context_propagation/nodejs
[13]: /agent/configuration/network/#configure-ports
