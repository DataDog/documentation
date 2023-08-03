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

The latest Node.js Tracer supports versions `>=14`. For a full list of Datadog's Node.js version and framework support (including legacy and maintenance versions), see the [Compatibility Requirements][1] page.

## Installation and getting started

### Configure the Datadog Agent for APM

Install and configure the Datadog Agent to receive traces from your instrumented application. By default the Datadog Agent is enabled in your `datadog.yaml` file under `apm_config` with `enabled: true` and listens for trace data at `http://localhost:8126`. For containerized environments, follow the links below to enable trace collection within the Datadog Agent.

{{< tabs >}}
{{% tab "Containers" %}}

1. Set `apm_non_local_traffic: true` in the `apm_config` section of your main [`datadog.yaml` configuration file][1].

2. See the specific setup instructions to ensure that the Agent is configured to receive traces in a containerized environment:

{{< partial name="apm/apm-containers.html" >}}
</br>

3. The tracing client sends traces to `localhost:8126` by default. If this is not the correct host and port for your Agent, set the `DD_TRACE_AGENT_HOSTNAME` and `DD_TRACE_AGENT_PORT` environment variables by running:

    ```sh
    DD_TRACE_AGENT_HOSTNAME=<HOSTNAME> DD_TRACE_AGENT_PORT=<PORT> node server
    ```

   To use Unix domain sockets, specify the entire URL as a single environment variable, `DD_TRACE_AGENT_URL`.

   If you require a different socket, host, or port, use the `DD_TRACE_AGENT_URL` environment variable or the `DD_TRACE_AGENT_HOST` and `DD_TRACE_AGENT_PORT` environment variables. Some examples:

   ```sh
   DD_AGENT_HOST=<HOSTNAME> DD_TRACE_AGENT_PORT=<PORT> node server
   DD_TRACE_AGENT_URL=http://<HOSTNAME>:<PORT> node server
   DD_TRACE_AGENT_URL=unix:<SOCKET_PATH> node server
   ```

{{< site-region region="us3,us5,eu,gov,ap1" >}}

4. Set `DD_SITE` in the Datadog Agent to {{< region-param key="dd_site" code="true" >}} to ensure the Agent sends data to the right Datadog location.

{{< /site-region >}}

[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "AWS Lambda" %}}

To set up Datadog APM in AWS Lambda, see the [Tracing Serverless Functions][1] documentation.


[1]: /tracing/serverless_functions/
{{% /tab %}}
{{% tab "Other Environments" %}}

Tracing is available for other environments, including [Heroku][1], [Cloud Foundry][2], and [AWS Elastic Beanstalk][3].

For other environments, see the [Integrations][5] documentation for that environment and [contact support][6] if you encounter setup issues.

[1]: /agent/basic_agent_usage/heroku/#installation
[2]: /integrations/cloud_foundry/#trace-collection
[3]: /integrations/amazon_elasticbeanstalk/
[5]: /integrations/
[6]: /help/
{{% /tab %}}
{{< /tabs >}}


Read [tracer settings][3] for a list of initialization options.

### Choose your instrumentation method

After you deploy or install and configure your Datadog Agent, the next step is to instrument your application. You can do this in the following ways, depending on the infrastructure your app runs on, the language it's written in, and the level of configuration you require.

See the following pages for supported deployment scenarios and languages:

- [Inject the instrumentation library locally][11] (at the Agent);
- [Inject the instrumentation library from the Datadog UI][12] (beta); or
- Add the tracing library directly in the application, as described in the [Install the tracer](#install-the-tracer) section. Read more about [compatibility information][1].


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
    If you are upgrading from a previous major version of the library (0.x, 1.x, or 2.x) to another major version (2.x or 3.x), read the [Migration Guide][5] to assess any breaking changes.

2. Import and initialize the tracer either in code or via command line arguments. The Node.js tracing library needs to be imported and initialized **before** any other module.

   Once you have completed setup, if you are not receiving complete traces, including missing URL routes for web requests, or disconnected or missing spans, **confirm step 2 has been correctly done**. The tracing library being initialized first is necessary for the tracer to properly patch all of the required libraries for automatic instrumentation.

   When using a transpiler such as TypeScript, Webpack, Babel, or others, import and initialize the tracer library in an external file and then import that file as a whole when building your application.

### Adding the tracer in code

#### JavaScript

```javascript
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

### Bundling

`dd-trace` works by intercepting `require()` calls that a Node.js application makes when loading modules. This includes modules that are built-in to Node.js, like the `fs` module for accessing the filesystem, as well as modules installed from the NPM registry, like the `pg` database module.

Bundlers crawl all of the `require()` calls that an application makes to files on disk. It replaces the `require()` calls with custom code and combines all of the resulting JavaScript into one "bundled" file. When a built-in module is loaded, such as `require('fs')`, that call can then remain the same in the resulting bundle.

APM tools like `dd-trace` stop working at this point. They can continue to intercept the calls for built-in modules but don't intercept calls to third party libraries. This means that when you bundle a `dd-trace` app with a bundler it is likely to capture information about disk access (through `fs`) and outbound HTTP requests (through `http`), but omit calls to third party libraries. For example:
- Extracting incoming request route information for the `express` framework. 
- Showing which query is run for the `mysql` database client.

A common workaround is to treat all third party modules that the APM needs to instrument as being "external" to the bundler. With this setting the instrumented modules remain on disk and continue to be loaded with `require()` while the non-instrumented modules are bundled. However, this results in a build with many extraneous files and starts to defeat the purpose of bundling.

Datadog recommends you have custom-built bundler plugins. These plugins are able to instruct the bundler on how to behave, inject intermediary code and intercept the "translated" `require()` calls. As a result, more packages are included in the bundled JavaScript file. 

**Note**: Some applications can have 100% of modules bundled, however native modules still need to remain external to the bundle.

#### Esbuild support

This library provides experimental esbuild support in the form of an esbuild plugin, and requires at least Node.js v16.17 or v18.7. To use the plugin, make sure you have `dd-trace@3+` installed, and then require the `dd-trace/esbuild` module when building your bundle.

Here's an example of how one might use `dd-trace` with esbuild:

```javascript
const ddPlugin = require('dd-trace/esbuild')
const esbuild = require('esbuild')

esbuild.build({
  entryPoints: ['app.js'],
  bundle: true,
  outfile: 'out.js',
  plugins: [ddPlugin],
  platform: 'node', // allows built-in modules to be required
  target: ['node16']
}).catch((err) => {
  console.error(err)
  process.exit(1)
})
```

## Configuration

If needed, configure the tracing library to send application performance telemetry data as you require, including setting up Unified Service Tagging. Read [Library Configuration][4] for details.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/compatibility_requirements/nodejs
[2]: https://app.datadoghq.com/apm/service-setup
[3]: https://datadog.github.io/dd-trace-js/#tracer-settings
[4]: /tracing/trace_collection/library_config/nodejs/
[5]: https://github.com/DataDog/dd-trace-js/blob/master/MIGRATING.md
[11]: /tracing/_trace_collection/library_injection_local/
[12]: /tracing/_trace_collection/library_injection_remote/