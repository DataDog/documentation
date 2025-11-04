---
title: Instrumenting a Go Container App In-Container
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

## Setup

1. **Install the Datadog Go tracer**.

   1. In your main application, add the tracing library from `dd-trace-go`.

      {{< code-block lang="shell" disable_copy="false" >}}
go get github.com/DataDog/dd-trace-go/v2/ddtrace/tracer
{{< /code-block >}}

   2. Add the following to your application code to initialize the tracer:
      {{< code-block lang="go" disable_copy="false" >}}
tracer.Start()
defer tracer.Stop()
{{< /code-block >}}

   You can also add additional packages:
   {{< code-block lang="shell" disable_copy="false" >}}
# Enable Profiling
go get github.com/DataDog/dd-trace-go/v2/profiler

# Patch /net/http
go get github.com/DataDog/dd-trace-go/contrib/net/http/v2
{{< /code-block >}}

   For more information, see [Tracing Go Applications][1] and the [Tracer README][2].

2. **Install serverless-init**.

   {{% serverless-init-install cmd="./your-binary" %}}

3. **Set up logs**.

   To enable logging, set the environment variable `DD_LOGS_ENABLED=true`. This allows `serverless-init` to read logs from stdout and stderr.

   Datadog also recommends setting the environment variable `DD_SOURCE=go` to enable advanced Datadog log parsing.

   If you want multiline logs to be preserved in a single log message, Datadog recommends writing your logs in JSON format. For example, you can use a third-party logging library such as `logrus`:
   ```go
   logrus.SetFormatter(&logrus.JSONFormatter{})
   logrus.AddHook(&dd_logrus.DDContextLogHook{})

   logrus.WithContext(ctx).Info("Hello World!")
   ```

   For more information, see [Correlating Go Logs and Traces][3].

4. **Configure your application**.

{{% serverless-init-configure %}}

6. **Send custom metrics**.

   To send custom metrics, [install the DogStatsD client][4] and [view code examples][5]. In serverless, only the *distribution* metric type is supported.

{{% serverless-init-env-vars-in-container language="go" defaultSource="containerapp" %}}

## Troubleshooting

{{% serverless-init-troubleshooting productNames="Azure Container Apps" %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/go/
[2]: https://github.com/DataDog/dd-trace-go?tab=readme-ov-file#installing
[3]: /tracing/other_telemetry/connect_logs_and_traces/go/
[4]: /developers/dogstatsd/?tab=go#install-the-dogstatsd-client
[5]: /metrics/custom_metrics/dogstatsd_metrics_submission/?tab=go#code-examples-5
