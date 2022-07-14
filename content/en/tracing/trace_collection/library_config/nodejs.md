---
title: Configuring the NodeJS Tracing Library
kind: documentation
code_lang: nodejs
type: multi-code-lang
code_lang_weight: 30
further_reading:
    - link: 'https://github.com/DataDog/dd-trace-js'
      tag: 'GitHub'
      text: 'Source code'
    - link: 'https://datadog.github.io/dd-trace-js'
      tag: 'Documentation'
      text: 'API documentation'
    - link: 'tracing/glossary/'
      tag: 'Use the APM UI'
      text: 'Explore your services, resources and traces'
    - link: 'tracing/'
      tag: 'Advanced Usage'
      text: 'Advanced Usage'
---

After you set up the tracing library with your code and configure the Agent to collect APM data, optionally configure the tracing library as desired, including setting up [Unified Service Tagging][1].

Tracer settings can be configured with the following environment variables:

### Tagging

`DD_ENV`
: Set an application's environment (for example, `prod`, `pre-prod`, and `stage`). Defaults to the environment configured in the Datadog Agent.

`DD_SERVICE`
: The service name used for this program. Defaults to the name field value in `package.json`.

`DD_VERSION`
: The version number of the application. Defaults to the version field value in `package.json`.

`DD_TAGS`
: Set global tags that are applied to all spans and runtime metrics. When passed as an environment variable, the format is `key:value,key:value`. When setting this programmatically, the format is `tracer.init({ tags: { foo: 'bar' } })`.

It is recommended that you use `DD_ENV`, `DD_SERVICE`, and `DD_VERSION` to set `env`, `service`, and `version` for your services. Review the [Unified Service Tagging][1] documentation for recommendations on configuring these environment variables.

### Instrumentation

`DD_TRACE_ENABLED`
: **Default**: `true`<br>
Whether to enable the tracer.

`DD_TRACE_DEBUG`
: **Default**: `false`<br>
Enable debug logging in the tracer.

`DD_TRACE_AGENT_URL`
: **Default**: `http://localhost:8126`<br>
The URL of the Trace Agent that the tracer submits to. Takes priority over hostname and port, if set. Supports Unix Domain Sockets in combination with the `apm_config.receiver_socket` in your `datadog.yaml` file, or the `DD_APM_RECEIVER_SOCKET` environment variable.

`DD_TRACE_AGENT_HOSTNAME`
: **Default**: `localhost`<br>
The address of the Agent that the tracer submits to.

`DD_TRACE_AGENT_PORT`
: **Default**: `8126`<br>
The port of the Trace Agent that the tracer submits to.

`DD_DOGSTATSD_PORT`
: **Default**: `8125`<br>
The port of the DogStatsD Agent that metrics are submitted to.

`DD_LOGS_INJECTION`
: **Default**: `false`<br>
Enable automatic injection of trace IDs in logs for supported logging libraries.

`DD_TRACE_SAMPLE_RATE`
: Percentage of spans to sample as a float between `0` and `1`. Defaults to the rates returned by the Datadog Agent.

`DD_TRACE_RATE_LIMIT`
: Percentage of spans to sample as a float between `0` and `1`. Defaults to `100` when `DD_TRACE_SAMPLE_RATE` is set. Otherwise, delegates rate limiting to the Datadog Agent.

`DD_RUNTIME_METRICS_ENABLED`
: **Default**:  `false`<br>
Whether to enable capturing runtime metrics. Port `8125` (or configured with `DD_DOGSTATSD_PORT`) must be opened on the Agent for UDP.

`DD_SERVICE_MAPPING`
: **Example**: `mysql:my-mysql-service-name-db,pg:my-pg-service-name-db`<br>
Provide service names for each plugin. Accepts comma separated `plugin:service-name` pairs, with or without spaces.

`DD_TRACE_DISABLED_PLUGINS`
: A comma-separated string of integration names automatically disabled when the tracer is initialized. Environment variable only, for example, `DD_TRACE_DISABLED_PLUGINS=express,dns`.

`DD_TRACE_LOG_LEVEL`
: **Default**: `debug`<br>
A string for the minimum log level for the tracer to use when debug logging is enabled, for example, `error`, `debug`.


For more options including the programmatic configuration API, see the [API documentation][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/unified_service_tagging/
[2]: https://datadog.github.io/dd-trace-js/#tracer-settings
