---
title: Instrumenting a Node.js Cloud Run Container In-Process
further_reading:
- link: '/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/#getting-started'
  tag: 'Documentation'
  text: 'Tracing Node.js Applications'
---

## 1. Install the Tracer

In your main application, add the `dd-trace-js` library.

```shell
$ npm install dd-trace --save
```

Add the following environment variable to your main app: `ENV NODE_OPTIONS=“--require dd-trace/init”`. This specifies that the dd-trace/init module is required when the Node.js process starts.

Finally, add this to your application code to initialize the tracer:
```javascript
const tracer = require('dd-trace').init({
 logInjection: true,
});
```

For more information, see [Tracing Node.js applications](https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/#getting-started).

## 2. Install Serverless-Init

{{% svl-init-nodejs %}}

## 3. Setup Logs

To enable logging, set the environment variable `DD_LOGS_ENABLED=true`. This allows serverless-init to read logs from stdout and stderr.

If you want multiline logs to be preserved in a single log message, we recommend writing your logs in JSON format. For example:
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
    new transports.File({ filename: `/shared-volume/logs/app.log` }),
    new transports.Console()
  ],
});

logger.info(`Hello world!`);
```
