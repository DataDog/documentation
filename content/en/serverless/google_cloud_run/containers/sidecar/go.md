---
title: Instrumenting a Go Cloud Run Container with Sidecar
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

<div class="alert alert-info">A sample application is <a href="https://github.com/DataDog/serverless-gcp-sample-apps/tree/main/cloud-run/sidecar/go">available on GitHub</a>.</div>

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

2. **Install serverless-init as a sidecar**.

   {{% serverless-init-install mode="sidecar" %}}

   {{< tabs >}}

   {{% tab "Datadog CLI" %}}
   {{% gcr-install-sidecar-datadog-ci %}}
   {{% /tab %}}

   {{% tab "Terraform" %}}
   {{% gcr-install-sidecar-terraform %}}
   {{% /tab %}}

   {{% tab "YAML Deploy" %}}
   {{% gcr-install-sidecar-yaml language="go" %}}
   {{% /tab %}}

   {{% tab "Other" %}}
   {{% gcr-install-sidecar-other %}}
   {{% /tab %}}

   {{< /tabs >}}

3. **Set up logs**.

   In the previous step, you created a shared volume. You may have also set the `DD_SERVERLESS_LOG_PATH` environment variable, which defaults to `/shared-volume/logs/app.log`.

   In this step, configure your logging library to write logs to the file set in `DD_SERVERLESS_LOG_PATH`. In Go, we recommend writing logs in a JSON format. For example, you can use a third-party logging library such as `logrus`:
   {{< code-block lang="go" disable_copy="false" >}}
const LOG_FILE = "/shared-volume/logs/app.log"

os.MkdirAll(filepath.Dir(LOG_FILE), 0755)
logFile, err := os.OpenFile(LOG_FILE, os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
defer logFile.Close()

logrus.SetOutput(logFile)
logrus.SetFormatter(&logrus.JSONFormatter{})
logrus.AddHook(&dd_logrus.DDContextLogHook{})

logrus.WithContext(ctx).Info("Hello World!")
{{< /code-block >}}

   Datadog recommends setting the environment variable `DD_SOURCE=go` in your sidecar container to enable advanced Datadog log parsing.

   For more information, see [Correlating Go Logs and Traces][3].

4. {{% gcr-service-label %}}

5. **Send custom metrics**.

   To send custom metrics, [install the DogStatsD client][4] and [view code examples][5]. In serverless, only the *distribution* metric type is supported.

{{% serverless-init-env-vars-sidecar language="go" defaultSource="cloudrun" %}}

## Troubleshooting

{{% serverless-init-troubleshooting productNames="Cloud Run services" %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/go/
[2]: https://github.com/DataDog/dd-trace-go?tab=readme-ov-file#installing
[3]: /tracing/other_telemetry/connect_logs_and_traces/go/
[4]: /developers/dogstatsd/?tab=go#install-the-dogstatsd-client
[5]: /metrics/custom_metrics/dogstatsd_metrics_submission/?tab=go#code-examples-5
