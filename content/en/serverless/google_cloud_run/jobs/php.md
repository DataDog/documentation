---
title: Instrumenting a PHP Cloud Run Job
code_lang: php
type: multi-code-lang
code_lang_weight: 70
further_reading:
  - link: '/tracing/trace_collection/automatic_instrumentation/dd_libraries/php/'
    tag: 'Documentation'
    text: 'Tracing PHP Applications'
  - link: '/tracing/other_telemetry/connect_logs_and_traces/php/'
    tag: 'Documentation'
    text: 'Correlating PHP Logs and Traces'
---

## Setup

<div class="alert alert-info">A sample application is <a href="https://github.com/DataDog/serverless-gcp-sample-apps/tree/main/cloud-run-jobs/php">available on GitHub</a>.</div>
<div class="alert alert-info">
For full visibility and access to all Datadog features in Cloud Run Jobs,
ensure you've <a href="http://localhost:1313/integrations/google_cloud_platform/">installed the Google Cloud integration</a>
and are using <a href="https://hub.docker.com/r/datadog/serverless-init">serverless-init version 1.9.0 or later</a>.
</div>

1. **Install the Datadog PHP tracer** in your Dockerfile.

   {{< code-block lang="dockerfile" filename="Dockerfile" disable_copy="false" collapsible="true" >}}
RUN curl -LO https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php \
  && php datadog-setup.php --php-bin=all
{{< /code-block >}}

   When running the `datadog-setup.php` script, you can also enable Application Security and Profiling by using the `--enable-appsec` and `--enable-profiling` flags, respectively.

   If you are using Alpine Linux, you need to install `libgcc_s` prior to running the installer:

   {{< code-block lang="shell" disable_copy="false" >}}
apk add libgcc
{{< /code-block >}}

   **Note**: Cloud Run Jobs run to completion rather than serving requests, so auto instrumentation won't create a top-level "job" span. For end-to-end visibility, create your own root span. See the [PHP Custom Instrumentation][1] instructions.

   For more information, see [Tracing PHP applications][2].

2. **Install serverless-init**.

   {{% serverless-init-install mode="in-container" cmd="\"php\", \"path/to/your/php/app.php\"" cloudservice="jobs" %}}

3. **Set up logs**.

   To enable logging, set the environment variable `DD_LOGS_ENABLED=true`. This allows `serverless-init` to read logs from stdout and stderr.

   Datadog also recommends setting the environment variable `DD_LOGS_INJECTION=true` and `DD_SOURCE=php` to enable advanced Datadog log parsing.

   For more information, see [Correlating PHP Logs and Traces][3].

4. **Configure your application**.

{{% serverless-init-configure cloudrun_jobs="true" %}}

5. {{% gcr-service-label %}}

6. {{% gcr-jobs-retention-filter %}}

7. **Send custom metrics**.

   To send custom metrics, [install the DogStatsD client][4] and [view code examples][5]. In serverless, only the *distribution* metric type is supported.

{{% serverless-init-env-vars-in-container language="php" defaultSource="cloudrun" %}}

{{% svl-tracing-env %}}

## Troubleshooting

{{% serverless-init-troubleshooting productNames="Cloud Run services" %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/custom_instrumentation/php/dd-api
[2]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/php/
[3]: /tracing/other_telemetry/connect_logs_and_traces/php/
[4]: /extend/dogstatsd/?tab=php#install-the-dogstatsd-client
[5]: /metrics/custom_metrics/dogstatsd_metrics_submission/?tab=php#code-examples-5
