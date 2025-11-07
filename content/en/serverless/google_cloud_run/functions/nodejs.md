---
title: Instrumenting a Node.js Cloud Run Function
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

<div class="alert alert-info">A sample application is <a href="https://github.com/DataDog/serverless-gcp-sample-apps/tree/main/cloud-run-functions/node">available on GitHub</a>.</div>

## Setup

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

   For more information, see [Tracing Node.js applications][1].

2. **Install serverless-init as a sidecar**.

   {{< tabs >}}

   {{% tab "Datadog CLI" %}}
   {{% gcr-install-sidecar-datadog-ci %}}
   {{% /tab %}}

   {{% tab "Terraform" %}}
   {{% gcr-install-sidecar-terraform function="true" %}}
   {{% /tab %}}

   {{% tab "Other" %}}
   {{% gcr-install-sidecar-other function="true" %}}
   {{% /tab %}}

   {{< /tabs >}}

3. **Set up logs**.

   In the previous step, you created a shared volume. You may have also set the `DD_SERVERLESS_LOG_PATH` environment variable, which defaults to `/shared-volume/logs/app.log`.

   In this step, configure your logging library to write logs to the file set in `DD_SERVERLESS_LOG_PATH`. In Node.js, Datadog recommend writing logs in a JSON format. For example, you can use a third-party logging library such as `winston`:
   {{< code-block lang="javascript" disable_copy="false" >}}
const tracer = require('dd-trace').init({
  logInjection: true,
});
const { createLogger, format, transports } = require('winston');

const LOG_FILE = "/shared-volume/logs/app.log"

const logger = createLogger({
  level: 'info',
  exitOnError: false,
  format: format.json(),
  transports: [
    new transports.File({ filename: LOG_FILE }),
    new transports.Console()
  ],
});

logger.info('Hello world!');
{{< /code-block >}}

   Datadog recommends setting the environment variables `DD_LOGS_INJECTION=true` (in your main container) and `DD_SOURCE=nodejs` (in your sidecar container) to enable advanced Datadog log parsing.

   For more information, see [Correlating Node.js Logs and Traces][2].

4. {{% gcr-service-label %}}

5. **Send custom metrics**.

   To send custom metrics, [view code examples][3]. In Serverless Monitoring, only the *distribution* metric type is supported.

{{% serverless-init-env-vars-sidecar language="nodejs" function="true" defaultSource="cloudrun" %}}

## Troubleshooting

{{% serverless-init-troubleshooting productNames="Cloud Run services" %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/
[2]: /tracing/other_telemetry/connect_logs_and_traces/nodejs/
[3]: /metrics/custom_metrics/dogstatsd_metrics_submission/?tab=nodejs#code-examples-5

