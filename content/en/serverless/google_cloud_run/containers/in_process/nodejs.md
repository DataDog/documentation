---
title: Instrumenting a Node.js Cloud Run Container In-Process
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

   For more information, see [Tracing Node.js applications][1].

2. **Install serverless-init**.

   {{% gcr-install-serverless-init cmd="\"/nodejs/bin/node\", \"/path/to/your/app.js\"" %}}

3. **Set up logs**.

   To enable logging, set the environment variable `DD_LOGS_ENABLED=true`. This allows `serverless-init` to read logs from stdout and stderr.

   Datadog also recommends setting the environment variable `DD_SOURCE=nodejs` to enable advanced Datadog log parsing.

   If you want multiline logs to be preserved in a single log message, Datadog recommends writing your logs in JSON format. For example, you can use a third-party logging library such as `winston`:
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
    new transports.Console()
  ],
});

logger.info(`Hello world!`);
{{< /code-block >}}

   For more information, see [Correlating Node.js Logs and Traces][2].

4. **Configure your application**.

{{% gcr-configure-env-vars language="nodejs" %}}

## Troubleshooting

{{% gcr-troubleshooting %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/
[2]: /tracing/other_telemetry/connect_logs_and_traces/nodejs/
