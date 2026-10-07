<!--
Node.js profiler setup — self-contained.
No Configuration section: all configuration is shown inline in Installation.
-->

The profiler is shipped within Datadog SDKs. If you are already using [APM to collect traces][1] for your application, you can skip installing the library and go directly to enabling the profiler.

## Requirements

For a summary of the minimum and recommended runtime and tracer versions across all languages, read [Supported Language and Tracer Versions][2].

The Datadog Profiler requires at least Node.js 18.

Continuous Profiler support is in Preview for some serverless platforms, such as [AWS Lambda][4].

Continuous Profiler support is in Preview for Google Cloud Run.

## Installation

To begin profiling applications:

1. Make sure Datadog Agent v6+ is installed and running. Datadog recommends using [Datadog Agent v7+][3].

2. Install `dd-trace`:

   ```shell
   npm install --save dd-trace@latest
   ```

3. Enable the profiler:

   {% tabs %}

   {% tab label="Environment variables" %}
   ```shell
   export DD_PROFILING_ENABLED=true
   export DD_ENV=prod
   export DD_SERVICE=my-web-app
   export DD_VERSION=1.0.3
   ```

   {% alert %}
   If you're already using Datadog APM, you are already calling `init` and don't need to do so again. If you are not, make sure the SDK and the profiler are loaded together:

   ```javascript
   node -r dd-trace/init app.js
   ```
   {% /alert %}
   {% /tab %}

   {% tab label="In code" %}
   ```js
   const tracer = require('dd-trace').init({
     profiling: true,
     env: 'prod',
     service: 'my-web-app',
     version: '1.0.3'
   })
   ```

   {% alert %}
   If you're already using Datadog APM, you are already calling `init` and don't need to do so again. If you are not, make sure the SDK and the profiler are loaded together:

   ```javascript
   const tracer = require('dd-trace/init')
   ```
   {% /alert %}
   {% /tab %}

   {% /tabs %}

4. After a couple of minutes, your profiles appear on the [Datadog APM > Profiler page][6]. If they do not, see the [Troubleshooting][7] guide.

5. Optional: Set up [Source Code Integration][5] to connect your profiling data with your Git repositories.

6. Optional: [Upload Source Maps][8] (Preview).

   {% callout url="" btn_hidden=true header="Join the Preview!" %}
   Profiler support for uploaded source maps is in Preview.
   {% /callout %}

   If you deploy source maps with your application, the profiler reads them and produces mapped locations in profiles. Source maps in `.map` files and inline source maps are both supported. To reduce deployment sizes (for example, in serverless environments), you can choose not to deploy source maps and instead upload them to Datadog.

   {% alert %}
   Uploaded source maps require dd-trace version 5.93.0 or newer. Your deployed source files must also contain the `@sourceMappingURL` annotation so the profiler knows to use the uploaded maps.
   {% /alert %}

[1]: /tracing/trace_collection/
[2]: /profiler/enabling/supported_versions/
[3]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[4]: /serverless/aws_lambda/profiling/
[5]: /integrations/guide/source-code-integration/?tab=nodejs
[6]: https://app.datadoghq.com/profiling
[7]: /profiler/profiler_troubleshooting/nodejs/
[8]: /real_user_monitoring/guide/upload-javascript-source-maps/
