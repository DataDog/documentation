---
title: Tracing Node.js Applications
kind: documentation
aliases:
    - /tracing/nodejs/
    - /tracing/languages/nodejs/
    - /tracing/languages/javascript/
    - /tracing/setup/javascript/
    - /agent/apm/nodejs/
    - /tracing/setup/nodejs
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
    - link: 'tracing/visualization/'
      tag: 'Use the APM UI'
      text: 'Explore your services, resources and traces'
    - link: 'tracing/'
      tag: 'Advanced Usage'
      text: 'Advanced Usage'
---
## Compatibility Requirements

The NodeJS Tracer officially supports versions `>=8`. Only even versions like 8.x and 10.x are officially supported. Odd versions like 9.x and 11.x should work but are not officially supported. For a full list of supported libraries, visit the [Compatibility Requirements][1] page.

## Installation and getting started

### Follow the in-app documentation (Recommended)

Follow the [Quickstart instructions][2] within the Datadog app for the best experience, including:

- Step-by-step instructions scoped to your deployment configuration (hosts, Docker, Kubernetes, or Amazon ECS).
- Dynamically set `service`, `env`, and `version` tags.
- Enable ingesting 100% of traces and Trace ID injection into logs during setup.

For descriptions of terminology used in APM, take a look at the [official documentation][3].

For details about configuration and using the API, see Datadog's [API documentation][4].

For details about contributing, check out the [development guide][5].

### Quickstart

<div class="alert alert-warning">
This library <strong>MUST</strong> be imported and initialized before any instrumented module. When using a transpiler, you <strong>MUST</strong> import and initialize the tracer library in an external file and then import that file as a whole when building your application. This prevents hoisting and ensures that the tracer library gets imported and initialized before importing any other instrumented module.
</div>

To begin tracing Node.js applications, first [install and configure the Datadog Agent][6], see the additional documentation for [tracing Docker applications][7] or [Kubernetes applications][8].

Next, install the Datadog Tracing library using npm:

```sh
npm install --save dd-trace
```

Finally, import and initialize the tracer:

##### JavaScript

```js
// This line must come before importing any instrumented module.
const tracer = require('dd-trace').init();
```

##### TypeScript

```typescript
// server.ts
import './tracer'; // must come before importing any instrumented module.

// tracer.ts
import tracer from 'dd-trace';
tracer.init(); // initialized in a different file to avoid hoisting.
export default tracer;
```

See the [tracer settings][9] for the list of initialization options.

## Configuration

Tracer settings can be configured as a parameter to the `init()` method or as environment variables.

### Tagging

| Config         | Environment Variable         | Default     | Description                                                                                                                                                                                                                                                                |
| -------------- | ---------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| env            | `DD_ENV`                     | `null`      | Set an application's environment e.g. `prod`, `pre-prod`, `stage`, etc. Available for versions 0.20+                                                                                                                                                                                                     |
| service        | `DD_SERVICE`            | `null`      | The service name to be used for this program. Available for versions 0.20+                                                                                                                                                                                                                              |
| version        | `DD_VERSION`            | `null`      | The version number of the application. Defaults to value of the version field in package.json. Available for versions 0.20+
| tags           | `DD_TAGS`                    | `{}`        | Set global tags that should be applied to all spans and metrics. When passed as an environment variable, the format is `key:value,key:value`. When setting this programmatically: `tracer.init({ tags: { foo: 'bar' } })` Available for versions 0.20+                                                                                                                            |

It is recommended that you use `DD_ENV`, `DD_SERVICE`, and `DD_VERSION` to set `env`, `service`, and `version` for your services. Review the [Unified Service Tagging][10] documentation for recommendations on how to configure these environment variables.

### Instrumentation

| Config         | Environment Variable         | Default     | Description                                                                                                                                                                                                                                                                |
| -------------- | ---------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| enabled        | `DD_TRACE_ENABLED`           | `true`      | Whether to enable the tracer.                                                                                                                                                                                                                                              |
| debug          | `DD_TRACE_DEBUG`             | `false`     | Enable debug logging in the tracer.                                                                                                                                                                                                                                        |
| url            | `DD_TRACE_AGENT_URL`         | `null`      | The URL of the Trace Agent that the tracer submits to. Takes priority over hostname and port, if set. Supports Unix Domain Sockets in combination with the `apm_config.receiver_socket` in your `datadog.yaml` file, or the `DD_APM_RECEIVER_SOCKET` environment variable. |
| hostname       | `DD_TRACE_AGENT_HOSTNAME`    | `localhost` | The address of the Agent that the tracer submits to.                                                                                                                                                                                                                       |
| port           | `DD_TRACE_AGENT_PORT`        | `8126`      | The port of the Trace Agent that the tracer submits to.                                                                                                                                                                                                                    |
| dogstatsd.port | `DD_DOGSTATSD_PORT`          | `8125`      | The port of the DogStatsD Agent that metrics are submitted to.                                                                                                                                                                                                             |
| logInjection   | `DD_LOGS_INJECTION`          | `false`     | Enable automatic injection of trace IDs in logs for supported logging libraries.                                                                                                                                                                                           |
| sampleRate     | -                            | `1`         | Percentage of spans to sample as a float between `0` and `1`.                                                                                                                                                                                                              |
| flushInterval  | -                            | `2000`      | Interval (in milliseconds) at which the tracer submits traces to the Agent.                                                                                                                                                                                                |
| runtimeMetrics | `DD_RUNTIME_METRICS_ENABLED` | `false`     | Whether to enable capturing runtime metrics. Port `8125` (or configured with `dogstatsd.port`) must be opened on the Agent for UDP.                                                                                                                                        |
| experimental   | -                            | `{}`        | Experimental features can be enabled all at once using Boolean true or individually using key/value pairs. [Contact support][11] to learn more about the available experimental features.                                                                                   |
| plugins        | -                            | `true`      | Whether or not to enable automatic instrumentation of external libraries using the built-in plugins.                                                                                                                                                                       |
| - | `DD_TRACE_DISABLED_PLUGINS` | - | A comma-separated string of integration names automatically disabled when tracer is initialized. Environment variable only e.g. `DD_TRACE_DISABLED_PLUGINS=express,dns`. |
| clientToken    | `DD_CLIENT_TOKEN`            | `null`      | Client token for browser tracing. Can be generated in Datadog in **Integrations** -> **APIs**.                                                                                                                                                                             |
| logLevel       | `DD_TRACE_LOG_LEVEL`         | `debug`     | A string for the minimum log level for the tracer to use when debug logging is enabled, e.g. `error`, `debug`.                                                                                                                                                             |

## Change Agent Hostname

Configure your application level tracers to submit traces to a custom Agent hostname:

The NodeJS Tracing Module automatically looks for and initializes with the ENV variables `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT`

```sh
DD_AGENT_HOST=<HOSTNAME> DD_TRACE_AGENT_PORT=<PORT> node server
```

To use a different protocol such as UDS, specify the entire URL as a single ENV variable `DD_TRACE_AGENT_URL`.

```sh
DD_TRACE_AGENT_URL=unix:<SOCKET_PATH> node server
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/compatibility_requirements/nodejs
[2]: https://app.datadoghq.com/apm/docs
[3]: /tracing/visualization/
[4]: https://datadog.github.io/dd-trace-js
[5]: https://github.com/DataDog/dd-trace-js/blob/master/README.md#development
[6]: /tracing/send_traces/
[7]: /tracing/setup/docker/
[8]: /agent/kubernetes/apm/
[9]: https://datadog.github.io/dd-trace-js/#tracer-settings
[10]: /getting_started/tagging/unified_service_tagging/
[11]: /help/
