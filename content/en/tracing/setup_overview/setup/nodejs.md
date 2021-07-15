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
    - /tracing/setup_overview/nodejs
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
## Compatibility requirements

The latest version of the NodeJS Tracer officially supports versions `>=12`. Versions `8` and `10` are supported in maintenance mode on the `0.x` release line. For more information about our Node version support and the supported versions, see the [Compatibility Requirements][1] page.

## Installation and getting started

To add the Datadog tracing library to your Node.js applications, follow these steps:

1. Install the Datadog Tracing library using npm for Node.js 12+:

    ```sh
    npm install dd-trace --save
    ```
    If you need to trace end-of-life Node.js versions 10 or 8, install version 0.x of `dd-trace` by running:
    ```
    npm install dd-trace@latest-node10
    ```
    or
    ```
    npm install dd-trace@latest-node8
    ```
    For more information on our distribution tags and Node.js runtime version support, see the [Compatibility Requirements][1] page.

2. Import and initialize the tracer either in code or via command line arguments. The Node.js tracing library needs to be imported and initialized **before** any other module.

   Once you have completed setup, if you are not receiving complete traces, including missing URL routes for web requests, or disconnected or missing spans, **confirm step 2 has been correctly done**.  The tracing library being initialized first is necessary for the tracer to properly patch all of the required libraries for automatic instrumentation.

   When using a transpiler such as TypeScript, Webpack, Babel, or others, import and initialize the tracer library in an external file and then import that file as a whole when building your application.

3. [Configure the Datadog Agent for APM](#configure-the-datadog-agent-for-apm)

4. Add any desired [configuration](#configuration) to the tracer, such as `service`, `env`, and `version` for [Unified Service Tagging][2].

### Adding the tracer in code

##### JavaScript

```js
// This line must come before importing any instrumented module.
const tracer = require('dd-trace').init();
```

#### TypeScript and bundlers

For TypeScript and bundlers that support EcmaScript Module syntax, initialize the tracer in a separate file in order to maintain correct load
order.

```typescript
// server.ts
import './tracer'; // must come before importing any instrumented module.

// tracer.ts
import tracer from 'dd-trace';
tracer.init(); // initialized in a different file to avoid hoisting.
export default tracer;
```

If the default config is sufficient, or all configuration is done
via environment variables, you can also use `dd-trace/init`, which loads and
initializes in one step.

```typescript
import `dd-trace/init`;
```

### Adding the tracer via command line arguments

Use the `--require` option to Node.js to load and initialize the tracer in one
step.

```sh
node --require dd-trace/init app.js
```

**Note:** This approach requires using environment variables for all
configuration of the tracer.

### Configure the Datadog Agent for APM

Install and configure the Datadog Agent to receive traces from your now instrumented application. By default the Datadog Agent is enabled in your `datadog.yaml` file under `apm_config` with `enabled: true` and listens for trace traffic at `localhost:8126`. For containerized environments, follow the links below to enable trace collection within the Datadog Agent.

{{< tabs >}}
{{% tab "Containers" %}}

1. Set `apm_non_local_traffic: true` in the `apm_config` section of your main [`datadog.yaml` configuration file][1].

2. See the specific setup instructions to ensure that the Agent is configured to receive traces in a containerized environment:

{{< partial name="apm/apm-containers.html" >}}
</br>

3. After having instrumented your application, the tracing client sends traces to `localhost:8126` by default.  If this is not the correct host and port change it by setting the below env variables:

    `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT`.

    ```sh
    DD_AGENT_HOST=<HOSTNAME> DD_TRACE_AGENT_PORT=<PORT> node server
    ```

    To use a different protocol such as UDS, specify the entire URL as a single ENV variable `DD_TRACE_AGENT_URL`.

    ```sh
    DD_TRACE_AGENT_URL=unix:<SOCKET_PATH> node server
    ```

{{< site-region region="us3,eu,gov" >}}

4. Set `DD_SITE` in the Datadog Agent to {{< region-param key="dd_site" code="true" >}} to ensure the Agent sends data to the right Datadog location.

{{< /site-region >}}

[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "AWS Lambda" %}}

To set up Datadog APM in AWS Lambda, see the [Tracing Serverless Functions][1] documentation.


[1]: /tracing/serverless_functions/
{{% /tab %}}
{{% tab "Other Environments" %}}

Tracing is available for a number of other environments, such as  [Heroku][1], [Cloud Foundry][2], [AWS Elastic Beanstalk][3], and [Azure App Services Extension][4].

For other environments, please refer to the [Integrations][5] documentation for that environment and [contact support][6] if you are encountering any setup issues.

[1]: /agent/basic_agent_usage/heroku/#installation
[2]: /integrations/cloud_foundry/#trace-collection
[3]: /integrations/amazon_elasticbeanstalk/
[4]: /infrastructure/serverless/azure_app_services/#overview
[5]: /integrations/
[6]: /help/
{{% /tab %}}
{{< /tabs >}}


See the [tracer settings][3] for the list of initialization options.

## Configuration

Tracer settings can be configured as the following parameters to the `init()` method, or as environment variables.

### Tagging


`env`
: **Environment variable**: `DD_ENV`<br>
**Default**: `null`<br>
Set an application's environment e.g. `prod`, `pre-prod`, `stage`, etc. Available for versions 0.20+

`service`
: **Environment variable**: `DD_SERVICE`<br>
**Default**: `null`<br>
The service name to be used for this program. Available for versions 0.20+

`version`
: **Environment variable**: `DD_VERSION`<br>
**Default**: `null`<br>
The version number of the application. Defaults to value of the version field in package.json. Available for versions 0.20+

`tags`
: **Environment variable**: `DD_TAGS`<br>
**Default**: `{}`<br>
Set global tags that should be applied to all spans and runtime metrics. When passed as an environment variable, the format is `key:value,key:value`. When setting this programmatically: `tracer.init({ tags: { foo: 'bar' } })` Available for versions 0.20+

It is recommended that you use `DD_ENV`, `DD_SERVICE`, and `DD_VERSION` to set `env`, `service`, and `version` for your services. Review the [Unified Service Tagging][2] documentation for recommendations on how to configure these environment variables.

### Instrumentation

`enabled`
: **Environment variable**: `DD_TRACE_ENABLED`<br>
**Default**: `true`<br>
Whether to enable the tracer.

`debug`
: **Environment variable**: `DD_TRACE_DEBUG`<br>
**Default**: `false`<br>
Enable debug logging in the tracer.

`url`
: **Environment variable**: `DD_TRACE_AGENT_URL`<br>
**Default**: `null`<br>
The URL of the Trace Agent that the tracer submits to. Takes priority over hostname and port, if set. Supports Unix Domain Sockets in combination with the `apm_config.receiver_socket` in your `datadog.yaml` file, or the `DD_APM_RECEIVER_SOCKET` environment variable.

`hostname`
: **Environment variable**: `DD_TRACE_AGENT_HOSTNAME`<br>
**Default**: `localhost`<br>
The address of the Agent that the tracer submits to.

`port`
: **Environment variable**: `DD_TRACE_AGENT_PORT`<br>
**Default**: `8126`<br>
The port of the Trace Agent that the tracer submits to.

`dogstatsd.port`
: **Environment variable**: `DD_DOGSTATSD_PORT`<br>
**Default**: `8125`<br>
The port of the DogStatsD Agent that metrics are submitted to.

`logInjection`
: **Environment variable**: `DD_LOGS_INJECTION`<br>
**Default**: `false`<br>
Enable automatic injection of trace IDs in logs for supported logging libraries.

`sampleRate`
: **Default**: `1`<br>
Percentage of spans to sample as a float between `0` and `1`.

`flushInterval`
: **Default**: `2000`<br>
Interval (in milliseconds) at which the tracer submits traces to the Agent.

`runtimeMetrics`
: **Environment variable**: `DD_RUNTIME_METRICS_ENABLED`<br>
**Default**:  `false`<br>
Whether to enable capturing runtime metrics. Port `8125` (or configured with `dogstatsd.port`) must be opened on the Agent for UDP.

: **Environment Variable**: `DD_SERVICE_MAPPING`<br>
**Default**: `null`<br>
**Example**: `mysql:my-mysql-service-name-db,pg:my-pg-service-name-db`<br>
Provide service names for each plugin. Accepts comma separated `plugin:service-name` pairs, with or without spaces.

`experimental`
: **Default**: `{}`<br>
Experimental features can be enabled all at once using Boolean true or individually using key/value pairs. [Contact support][4] to learn more about the available experimental features.

`plugins`
: **Default**: `true`<br>
Whether or not to enable automatic instrumentation of external libraries using the built-in plugins.

`DD_TRACE_DISABLED_PLUGINS`
: A comma-separated string of integration names automatically disabled when tracer is initialized. Environment variable only e.g. `DD_TRACE_DISABLED_PLUGINS=express,dns`.

`logLevel`
: **Environment variable**: `DD_TRACE_LOG_LEVEL`<br>
**Default**: `debug`<br>
A string for the minimum log level for the tracer to use when debug logging is enabled, e.g. `error`, `debug`.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/compatibility_requirements/nodejs
[2]: /getting_started/tagging/unified_service_tagging/
[3]: https://datadog.github.io/dd-trace-js/#tracer-settings
[4]: /help/
