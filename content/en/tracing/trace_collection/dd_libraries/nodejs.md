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
    - /tracing/setup_overview/setup/nodejs
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
## Compatibility requirements

The latest Node.js Tracer supports versions `>=14`. For a full list of Datadog’s Node.js version and framework support (including legacy and maintenance versions), see the [Compatibility Requirements][1] page.

## Installation and getting started

### Follow the in-app documentation (recommended)

Follow the [Quickstart instructions][3] within the Datadog app for the best experience, including:

- Step-by-step instructions scoped to your deployment configuration (hosts, Docker, Kubernetes, or Amazon ECS).
- Dynamically set `service`, `env`, and `version` tags.
- Enable the Continuous Profiler, ingesting 100% of traces, and Trace ID injection into logs during setup.

### Configure the Datadog Agent for APM

Install and configure the Datadog Agent to receive traces from your instrumented application. By default the Datadog Agent is enabled in your `datadog.yaml` file under `apm_config` with `enabled: true` and listens for trace traffic at `localhost:8126`. For containerized environments, follow the links below to enable trace collection within the Datadog Agent.

{{< tabs >}}
{{% tab "Containers" %}}

1. Set `apm_non_local_traffic: true` in the `apm_config` section of your main [`datadog.yaml` configuration file][1].

2. See the specific setup instructions to ensure that the Agent is configured to receive traces in a containerized environment:

{{< partial name="apm/apm-containers.html" >}}
</br>

3. The tracing client sends traces to `localhost:8126` by default. If this is not the correct host and port for your Agent, set the `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT` environment variables by running:

    ```sh
    DD_AGENT_HOST=<HOSTNAME> DD_TRACE_AGENT_PORT=<PORT> node server
    ```

   To use Unix domain sockets, specify the entire URL as a single environment variable, `DD_TRACE_AGENT_URL`.

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

Tracing is available for other environments, including [Heroku][1], [Cloud Foundry][2], [AWS Elastic Beanstalk][3], and [Azure App Service][4].

For other environments, see the [Integrations][5] documentation for that environment and [contact support][6] if you encounter setup issues.

[1]: /agent/basic_agent_usage/heroku/#installation
[2]: /integrations/cloud_foundry/#trace-collection
[3]: /integrations/amazon_elasticbeanstalk/
[4]: /infrastructure/serverless/azure_app_services/#overview
[5]: /integrations/
[6]: /help/
{{% /tab %}}
{{< /tabs >}}


Read [tracer settings][3] for a list of initialization options.

### Instrument your application

After the Agent is installed, follow these steps to add the Datadog tracing library to your Node.js applications:

1. Install the Datadog Tracing library using npm for Node.js 14+:

    ```sh
    npm install dd-trace --save
    ```
    If you need to trace end-of-life Node.js version 12, install version 2.x of `dd-trace` by running:
    ```
    npm install dd-trace@latest-node12
    ```
    For more information on our distribution tags and Node.js runtime version support, see the [Compatibility Requirements][1] page.

2. Import and initialize the tracer either in code or via command line arguments. The Node.js tracing library needs to be imported and initialized **before** any other module.

   Once you have completed setup, if you are not receiving complete traces, including missing URL routes for web requests, or disconnected or missing spans, **confirm step 2 has been correctly done**.  The tracing library being initialized first is necessary for the tracer to properly patch all of the required libraries for automatic instrumentation.

   When using a transpiler such as TypeScript, Webpack, Babel, or others, import and initialize the tracer library in an external file and then import that file as a whole when building your application.

### Adding the tracer in code

#### JavaScript

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

## Configuration

If needed, configure the tracing library to send application performance telemetry data as you require, including setting up Unified Service Tagging. Read [Library Configuration][4] for details.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/compatibility_requirements/nodejs
[2]: /getting_started/tagging/unified_service_tagging/
[3]: https://datadog.github.io/dd-trace-js/#tracer-settings
[4]: /tracing/trace_collection/library_config/nodejs/
[5]: https://app.datadoghq.com/apm/docs
