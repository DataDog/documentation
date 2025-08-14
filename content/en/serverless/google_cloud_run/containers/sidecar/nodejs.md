---
title: Instrumenting a Node.js Cloud Run Container with Sidecar
code_lang: nodejs
type: multi-code-lang
code_lang_weight: 20
further_reading:
- link: '/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/'
  tag: 'Documentation'
  text: 'Tracing Node.js Applications'
- link: '/tracing/other_telemetry/connect_logs_and_traces/nodejs/'
  tag: 'Documentation'
  text: 'Correlating Node.js Logs and Traces'
---

## Setup

<div class="alert alert-info">A sample application is <a href="https://github.com/DataDog/serverless-gcp-sample-apps/tree/main/cloud-run/in-process/node">available on GitHub</a>.</div>

1. **Install the Datadog Node.js tracer**.

   1. In your main application, add `dd-trace-js`.

      {{< code-block lang="shell" disable_copy="false" >}}
npm install dd-trace --save
{{< /code-block >}}

   2. Add the following to your application code to initialize the tracer:
   {{< code-block lang="javascript" disable_copy="false" >}}
const tracer = require('dd-trace').init({
 logInjection: true,
});
{{< /code-block >}}

   3. Set the following environment variable to specify that the `dd-trace/init` module is required when the Node.js process starts:
   {{< code-block lang="dockerfile" disable_copy="false" >}}
ENV NODE_OPTIONS="--require dd-trace/init"
{{< /code-block >}}

   For more information, see [Tracing Node.js applications][1001].

2. **Install serverless-init as a sidecar**.

   {{< tabs >}}

   {{% tab "Datadog CLI" %}}
   {{% gcr-install-sidecar-datadog-ci %}}
   {{% /tab %}}

   {{% tab "Terraform" %}}
   Terraform
   {{% /tab %}}

   {{% tab "Manual" %}}
   {{% gcr-install-sidecar-manual %}}
   {{% /tab %}}

   {{< /tabs >}}

3. **Set up logs**.

   In the previous step, you created a shared volume. Additionally, you set the `DD_SERVERLESS_LOG_PATH` env var, or it was defaulted to `/shared-volume/logs/app.log`.

   Now, you will need to configure your logging library to write logs to that file. In Node.js, we recommend writing logs in a JSON format. For example, you can use a third-party logging library such as `winston`:
   {{< code-block lang="javascript" disable_copy="false" >}}
const tracer = require('dd-trace').init({
  logInjection: true,
});
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info',
  exitOnError: false,
  format: format.json(),
  transports: [
    new transports.File({ filename: `/shared-volume/logs/app.log` }),
    new transports.Console()
  ],
});

logger.info(`Hello world!`);
{{< /code-block >}}

   Datadog recommends setting the environment variable `DD_SOURCE=nodejs` in your sidecar container to enable advanced Datadog log parsing.

   For more information, see [Correlating Node.js Logs and Traces][1002].

{{% gcr-env-vars language="nodejs" %}}

## Troubleshooting

{{% gcr-troubleshooting %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1001]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/
[1002]: /tracing/other_telemetry/connect_logs_and_traces/nodejs/
