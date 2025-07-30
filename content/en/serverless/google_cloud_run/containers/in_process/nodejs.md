---
title: Instrumenting a Node.js Cloud Run Container In-Process
code_lang: nodejs
type: multi-code-lang
code_lang_weight: 20
further_reading:
- link: '/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/'
  tag: 'Documentation'
  text: 'Tracing Node.js Applications'
---

## 1. Install the Tracer

In your main application, add the `dd-trace-js` library.

```shell
npm install dd-trace --save
```

Then, add this to your application code to initialize the tracer:
```javascript
const tracer = require('dd-trace').init({
 logInjection: true,
});
```

Finally, set the following environment variable to specify that the `dd-trace/init` module is required when the Node.js process starts:
```dockerfile
ENV NODE_OPTIONS="--require dd-trace/init"
```

For more information, see [Tracing Node.js applications][1].

## 2. Install Serverless-Init

{{% gcr-install-serverless-init cmd="\"/nodejs/bin/node\", \"/path/to/your/app.js\"" %}}

## 3. Setup Logs

To enable logging, set the environment variable `DD_LOGS_ENABLED=true`. This allows serverless-init to read logs from stdout and stderr.

If you want multiline logs to be preserved in a single log message, we recommend writing your logs in JSON format. For example, you can use a third-party logging library such as `winston`:
```javascript
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
```

For more information, see [Correlating Node.js Logs and Traces][2].

## 4. Configure your application

{{% gcr-configure-env-vars %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/
[2]: /tracing/other_telemetry/connect_logs_and_traces/nodejs/
