---
title: Instrumenting a PHP Cloud Run Container In-Process
code_lang: php
type: multi-code-lang
code_lang_weight: 70
aliases:
  - /serverless/google_cloud_run/containers/in_process/php
further_reading:
  - link: '/tracing/trace_collection/automatic_instrumentation/dd_libraries/php/'
    tag: 'Documentation'
    text: 'Tracing PHP Applications'
  - link: '/tracing/other_telemetry/connect_logs_and_traces/php/'
    tag: 'Documentation'
    text: 'Correlating PHP Logs and Traces'
---

## Setup

<div class="alert alert-info">A sample application is <a href="https://github.com/DataDog/serverless-gcp-sample-apps/tree/main/cloud-run/in-process/php">available on GitHub</a>.</div>

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

   For more information, see [Tracing PHP applications][1].

2. **Install serverless-init**.

   {{% gcr-install-serverless-init cmd="\"apache2-foreground\"" %}}

3. **Set up logs**.

   To enable logging, set the environment variable `DD_LOGS_ENABLED=true`. This allows `serverless-init` to read logs from stdout and stderr.

   Datadog also recommends setting the environment variable `DD_SOURCE=php` to enable advanced Datadog log parsing.

   For more information, see [Correlating PHP Logs and Traces][2].

4. **Configure your application**.

{{% gcr-configure %}}

5. {{% gcr-service-label %}}

6. **Send custom metrics**.

   To send custom metrics, [install the DogStatsD client][3] and [view code examples][4].

{{% gcr-env-vars instrumentationMethod="in-process" language="php" %}}

## Troubleshooting

{{% gcr-troubleshooting %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/php/
[2]: /tracing/other_telemetry/connect_logs_and_traces/php/
[3]: /developers/dogstatsd/?tab=php#install-the-dogstatsd-client
[4]: /metrics/custom_metrics/dogstatsd_metrics_submission/?tab=php#code-examples

