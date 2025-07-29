---
title: Instrumenting a Go Cloud Run Container In-Process
code_lang: go
type: multi-code-lang
code_lang_weight: 30
further_reading:
  - link: '/tracing/trace_collection/automatic_instrumentation/dd_libraries/go/'
    tag: 'Documentation'
    text: 'Tracing Go Applications'
  - link: '/tracing/other_telemetry/connect_logs_and_traces/go/'
    tag: 'Documentation'
    text: 'Correlating Go Logs and Traces'
---

## 1. Install the Tracer

In your main application, add `dd-trace-go`.

```shell
go get github.com/DataDog/dd-trace-go/v2/ddtrace/tracer
```

Then, add this to your application code to initialize the tracer:
```go
tracer.Start()
defer tracer.Stop()
```

Additionally, you can add additional packages:
```shell
# Enable Profiling
go get github.com/DataDog/dd-trace-go/v2/profiler

# Patch /net/http
go get github.com/DataDog/dd-trace-go/contrib/net/http/v2
```

For more information, see [Tracing Go Applications][1] and the [Tracer README][2].

## 2. Install Serverless-Init

Add the following instructions and arguments to your Dockerfile.

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENTRYPOINT ["/app/datadog-init"]
CMD ["./your-binary"]
```

{{% collapse-content title="Explanation" level="h4" %}}

1. Install `serverless-init`, and stay on the latest major version with the `:1` tag. Alternatively, you can pin to a specific version tag or use `:latest`.

   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Change the entrypoint to wrap your application in the Datadog `serverless-init` process.
   **Note**: If you already have an entrypoint defined inside your Dockerfile, see the [alternative configuration](#alt-node).

   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

3. Execute your binary application wrapped in the entrypoint. Adapt this line to your needs.
   ```dockerfile
   CMD ["./your-binary"]
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
CMD ["/your_entrypoint.sh", "./your-binary"]
```

As long as your command to run is passed as an argument to datadog-init, you will receive full instrumentation.

{{% /collapse-content %}}

## 3. Setup Logs

To enable logging, set the environment variable `DD_LOGS_ENABLED=true`. This allows serverless-init to read logs from stdout and stderr.

We also recommend setting the environment variable `DD_SOURCE=go` to enable advanced Datadog log parsing.

If you want multiline logs to be preserved in a single log message, we recommend writing your logs in JSON format. For example, you can use a third-party logging library such as `logrus`:
```go
logrus.SetFormatter(&logrus.JSONFormatter{})
logrus.AddHook(&dd_logrus.DDContextLogHook{})

logrus.WithContext(ctx).Info("Hello World!")
```

For more information, see [Correlating Go Logs and Traces][3].

## 4. Configure your application

{{% gcr-configure-env-vars %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/go/
[2]: https://github.com/DataDog/dd-trace-go?tab=readme-ov-file#installing
[3]: /tracing/other_telemetry/connect_logs_and_traces/go/
