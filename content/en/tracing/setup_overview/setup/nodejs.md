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
import 'dd-trace/init';
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

{{< site-region region="us3,us5,eu,gov" >}}

4. Set `DD_SITE` in the Datadog Agent to {{< region-param key="dd_site" code="true" >}} to ensure the Agent sends data to the right Datadog location.

{{< /site-region >}}

[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "AWS Lambda" %}}

To set up Datadog APM in AWS Lambda, see the [Tracing Serverless Functions][1] documentation.


[1]: /tracing/serverless_functions/
{{% /tab %}}
{{% tab "Other Environments" %}}

Tracing is available for a number of other environments, such as  [Heroku][1], [Cloud Foundry][2], [AWS Elastic Beanstalk][3], and [Azure App Service][4].

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

It is recommended that you use `DD_ENV`, `DD_SERVICE`, and `DD_VERSION` to set `env`, `service`, and `version` for your services. Review the [Unified Service Tagging][2] documentation for recommendations on how to configure these environment variables.

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
: A comma-separated string of integration names automatically disabled when tracer is initialized. Environment variable only, for example, `DD_TRACE_DISABLED_PLUGINS=express,dns`.

`DD_TRACE_LOG_LEVEL`
: **Default**: `debug`<br>
A string for the minimum log level for the tracer to use when debug logging is enabled, for example, `error`, `debug`.


For more options including the programmatic configuration API, see the [API documentation][3].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/compatibility_requirements/nodejs
[2]: /getting_started/tagging/unified_service_tagging/
[3]: https://datadog.github.io/dd-trace-js/#tracer-settings
[4]: /help/
