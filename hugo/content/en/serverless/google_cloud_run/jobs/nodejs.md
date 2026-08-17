---
title: Instrumenting a Node.js Cloud Run Job
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

<div class="alert alert-info">A sample application is <a href="https://github.com/DataDog/serverless-gcp-sample-apps/tree/main/cloud-run-jobs/node">available on GitHub</a>.</div>
<div class="alert alert-info">
For full visibility and access to all Datadog features in Cloud Run Jobs,
ensure you’ve <a href="/integrations/google_cloud_platform/">installed the Google Cloud integration</a>
and are using <a href="https://hub.docker.com/r/datadog/serverless-init">serverless-init version 1.9.0 or later</a>.
</div>

1. **Install the Datadog Node.js SDK**.

   1. In your main application, install the `dd-trace` package.

      {{< code-block lang="shell" disable_copy="false" >}}
npm install dd-trace
{{< /code-block >}}

   2. Initialize the Node.js tracer with the `NODE_OPTIONS` environment variable:
   {{< code-block lang="dockerfile" disable_copy="false" >}}
ENV NODE_OPTIONS="--require dd-trace/init"
{{< /code-block >}}

   **Note**: Cloud Run Jobs run to completion rather than serving requests, so auto instrumentation won't create a top-level "job" span. For end-to-end visibility, create your own root span. See the [Node.js Custom Instrumentation][1] instructions.

   For more information, see [Tracing Node.js applications][2].

2. **Install serverless-init**.

   {{% serverless-init-install mode="in-container" cmd="\"/nodejs/bin/node\", \"/path/to/your/app.js\"" cloudservice="jobs" %}}

3. **Set up logs**.

   To enable logging, set the environment variable `DD_LOGS_ENABLED=true`. This allows `serverless-init` to read logs from stdout and stderr.

   Datadog also recommends setting the environment variable `DD_LOGS_INJECTION=true` and `DD_SOURCE=nodejs` to enable advanced Datadog log parsing.

   If you want multiline logs to be preserved in a single log message, Datadog recommends writing your logs in JSON format. For example, you can use a third-party logging library such as `winston`:
   {{< code-block lang="javascript" disable_copy="false" >}}
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info',
  exitOnError: false,
  format: format.json(),
  transports: [
    new transports.Console()
  ],
});

logger.info('Hello world!');
{{< /code-block >}}

   For more information, see [Correlating Node.js Logs and Traces][3].

4. **Configure your application**.

{{% serverless-init-configure cloudrun_jobs="true" %}}

5. {{% gcr-service-label %}}

6. {{% gcr-jobs-retention-filter %}}

7. **Send custom metrics**.

   To send custom metrics, [view code examples][4]. In serverless, only the *distribution* metric type is supported.

8. **Enable profiling (preview)**.

   To enable the [Continuous Profiler][7], set the environment variable `DD_PROFILING_ENABLED=true`.

   <div class="alert alert-info">Datadog's Continuous Profiler is available in preview for Google Cloud Run Jobs.</div>

{{% serverless-init-env-vars-in-container language="nodejs" defaultSource="cloudrun" %}}

{{% svl-tracing-env %}}

## Troubleshooting

{{% serverless-init-troubleshooting productNames="Cloud Run services" %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/custom_instrumentation/nodejs/dd-api?tab=locally#creating-spans
[2]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/
[3]: /tracing/other_telemetry/connect_logs_and_traces/nodejs/
[4]: /metrics/custom_metrics/dogstatsd_metrics_submission/?tab=nodejs#code-examples-5
[7]: /profiler/
