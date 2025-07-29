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

{{% collapse-content title="Explanation" level="h4" %}}

1. Install `serverless-init`, and stay on the latest major version with the `:1` tag. Alternatively, you can pin to a specific version tag or use `:latest`.

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

{{% /collapse-content %}}

{{% collapse-content title="Alternative configuration" level="h4" id="alt-node" %}}

If you already have an entrypoint defined inside your Dockerfile, you can instead modify the CMD argument.

```dockerfile
CMD ["/app/datadog-init", "/nodejs/bin/node", "/path/to/your/app.js"]
```

If you require your entrypoint to be instrumented as well, you can swap your entrypoint and CMD arguments instead.

```dockerfile
ENTRYPOINT ["/app/datadog-init"]
CMD ["/your_entrypoint.sh", "/nodejs/bin/node", "/path/to/your/app.js"]
```

As long as your command to run is passed as an argument to datadog-init, you will receive full instrumentation.

{{% /collapse-content %}}

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
[2]: tracing/other_telemetry/connect_logs_and_traces/nodejs/
