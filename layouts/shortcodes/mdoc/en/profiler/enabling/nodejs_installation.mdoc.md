<!--
Installation steps for Node.js profiler (steps 2-3 and closing).
Parent page provides shared step 1 (Agent).
-->

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
   If you're already using Datadog APM, you are already calling `init` and don't need to do so again. If you are not, make sure the tracer and the profiler are loaded together:

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
   If you're already using Datadog APM, you are already calling `init` and don't need to do so again. If you are not, make sure the tracer and the profiler are loaded together:

   ```javascript
   const tracer = require('dd-trace/init')
   ```
   {% /alert %}
   {% /tab %}

   {% /tabs %}

4. Optional: Set up [Source Code Integration][1] to connect your profiling data with your Git repositories.

5. After a couple of minutes, your profiles appear on the [Datadog APM > Profiler page][2]. If they do not, refer to the [Troubleshooting][3] guide.

[1]: /integrations/guide/source-code-integration/?tab=nodejs
[2]: https://app.datadoghq.com/profiling
[3]: /profiler/profiler_troubleshooting/nodejs/
