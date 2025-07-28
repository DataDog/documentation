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

For more information, see [Tracing Node.js applications][1].

## 2. Install Serverless-Init

Add the following instructions and arguments to your Dockerfile.

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV NODE_OPTIONS="--require dd-trace/init"
ENTRYPOINT ["/app/datadog-init"]
CMD ["/nodejs/bin/node", "/path/to/your/app.js"]
```

#### Explanation

1. Copy the Datadog `serverless-init` into your Docker image.

   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Specify that the `dd-trace/init` module is required when the Node.js process starts.

   ```dockerfile
   ENV NODE_OPTIONS="--require dd-trace/init"
   ```

3. Change the entrypoint to wrap your application in the Datadog `serverless-init` process.
   **Note**: If you already have an entrypoint defined inside your Dockerfile, see the [alternative configuration](#alt-node).

   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

4. Execute your binary application wrapped in the entrypoint. Adapt this line to your needs.
   ```dockerfile
   CMD ["node", "/path/to/your/app.js"]
   ```

#### Alternative configuration {#alt-node}
If you already have an entrypoint defined inside your Dockerfile, you can instead modify the CMD argument.

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
RUN npm install --prefix /dd_tracer/node dd-trace  --save
ENV DD_SERVICE=datadog-demo-run-nodejs
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
CMD ["/app/datadog-init", "/nodejs/bin/node", "/path/to/your/app.js"]
```

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
    new transports.Console()
  ],
});

logger.info(`Hello world!`);
```

## 4. Configure your application

{{% gcr-configure-env-vars %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/
