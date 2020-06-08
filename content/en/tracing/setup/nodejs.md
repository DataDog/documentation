---
title: Tracing Node.js Applications
kind: documentation
aliases:
    - /tracing/nodejs/
    - /tracing/languages/nodejs/
    - /tracing/languages/javascript/
    - /tracing/setup/javascript/
    - /agent/apm/nodejs/
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

## Installation And Getting Started

If you already have a Datadog account you can find [step-by-step instructions][1] in our in-app guides for either host-based or container-based set ups.

For descriptions of terminology used in APM, take a look at the [official documentation][2].

For details about configuration and using the API, see Datadog's [API documentation][3].

For details about contributing, check out the [development guide][4].

### Quickstart

<div class="alert alert-warning">
This library <strong>MUST</strong> be imported and initialized before any instrumented module. When using a transpiler, you <strong>MUST</strong> import and initialize the tracer library in an external file and then import that file as a whole when building your application. This prevents hoisting and ensures that the tracer library gets imported and initialized before importing any other instrumented module.
</div>

To begin tracing Node.js applications, first [install and configure the Datadog Agent][5], see the additional documentation for [tracing Docker applications][6] or [Kubernetes applications][7].

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

See the [tracer settings][8] for the list of initialization options.

## Configuration

Tracer settings can be configured as a parameter to the `init()` method or as environment variables.

| Config         | Environment Variable         | Default     | Description                                                                                                                                                                                                                                                                |
| -------------- | ---------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| enabled        | `DD_TRACE_ENABLED`           | `true`      | Whether to enable the tracer.                                                                                                                                                                                                                                              |
| debug          | `DD_TRACE_DEBUG`             | `false`     | Enable debug logging in the tracer.                                                                                                                                                                                                                                        |
| service        | `DD_SERVICE`            | `null`      | The service name to be used for this program.                                                                                                                                                                                                                              |
| version        | `DD_VERSION`            | `null`      | The version number of the application. Defaults to value of the version field in package.json.
                                                                               |
| url            | `DD_TRACE_AGENT_URL`         | `null`      | The URL of the Trace Agent that the tracer submits to. Takes priority over hostname and port, if set. Supports Unix Domain Sockets in combination with the `apm_config.receiver_socket` in your `datadog.yaml` file, or the `DD_APM_RECEIVER_SOCKET` environment variable. |
| hostname       | `DD_TRACE_AGENT_HOSTNAME`    | `localhost` | The address of the Agent that the tracer submits to.                                                                                                                                                                                                                       |
| port           | `DD_TRACE_AGENT_PORT`        | `8126`      | The port of the Trace Agent that the tracer submits to.                                                                                                                                                                                                                    |
| dogstatsd.port | `DD_DOGSTATSD_PORT`          | `8125`      | The port of the DogStatsD Agent that metrics are submitted to.                                                                                                                                                                                                             |
| env            | `DD_ENV`                     | `null`      | Set an application's environment e.g. `prod`, `pre-prod`, `stage`, etc.                                                                                                                                                                                                    |
| logInjection   | `DD_LOGS_INJECTION`          | `false`     | Enable automatic injection of trace IDs in logs for supported logging libraries.                                                                                                                                                                                           |
| tags           | `DD_TAGS`                    | `{}`        | Set global tags that should be applied to all spans and metrics. When passed as an environment variable, the format is `key:value, key:value`.                                                                                                                             |
| sampleRate     | -                            | `1`         | Percentage of spans to sample as a float between `0` and `1`.                                                                                                                                                                                                              |
| flushInterval  | -                            | `2000`      | Interval (in milliseconds) at which the tracer submits traces to the Agent.                                                                                                                                                                                                |
| runtimeMetrics | `DD_RUNTIME_METRICS_ENABLED` | `false`     | Whether to enable capturing runtime metrics. Port `8125` (or configured with `dogstatsd.port`) must be opened on the Agent for UDP.                                                                                                                                        |
| reportHostname | `DD_TRACE_REPORT_HOSTNAME`   | `false`     | Whether to report the system's hostname for each trace. When disabled, the hostname of the Agent is used instead.                                                                                                                                                          |
| experimental   | -                            | `{}`        | Experimental features can be enabled all at once using Boolean true or individually using key/value pairs. [Contact support][9] to learn more about the available experimental features.                                                                                   |
| plugins        | -                            | `true`      | Whether or not to enable automatic instrumentation of external libraries using the built-in plugins.                                                                                                                                                                       |
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

[1]: https://app.datadoghq.com/apm/install
[2]: /tracing/visualization/
[3]: https://datadog.github.io/dd-trace-js
[4]: https://github.com/DataDog/dd-trace-js/blob/master/README.md#development
[5]: /tracing/send_traces/
[6]: /tracing/setup/docker/
[7]: /agent/kubernetes/apm/
[8]: https://datadog.github.io/dd-trace-js/#tracer-settings
