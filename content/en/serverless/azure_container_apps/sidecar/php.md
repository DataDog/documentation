---
title: Instrumenting a PHP Container App with Sidecar
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

2. **Install serverless-init as a sidecar**.

   {{% serverless-init-install mode="sidecar" %}}

   {{< tabs >}}

   {{% tab "Datadog CLI" %}}
   {{% aca-install-sidecar-datadog-ci %}}
   {{% /tab %}}

   {{% tab "Terraform" %}}
   {{% aca-install-sidecar-terraform %}}
   {{% /tab %}}

   {{% tab "Bicep" %}}
   {{% aca-install-sidecar-bicep %}}
   {{% /tab %}}

   {{% tab "ARM Template" %}}
   {{% aca-install-sidecar-arm-template %}}
   {{% /tab %}}

   {{% tab "Manual" %}}
   {{% aca-install-sidecar-manual %}}
   {{% /tab %}}

   {{< /tabs >}}

3. **Set up logs**.

   In the previous step, you created a shared volume. In this step, configure your logging library to write logs to the file set in `DD_SERVERLESS_LOG_PATH`. For example:

   {{< code-block lang="php" disable_copy="false" >}}
const LOG_FILE = "/LogFiles/app.log";

function logInfo($message) {
    Log::build([
        'driver' => 'single',
        'path' => LOG_FILE,
    ])->info($message);
}

logInfo('Hello World!');
{{< /code-block >}}

   Datadog recommends setting the environment variable `DD_LOGS_INJECTION=true` (in your main container) and `DD_SOURCE=php` (in your sidecar container) to enable advanced Datadog log parsing.

   For more information, see [Correlating PHP Logs and Traces][2].

4. **Send custom metrics**.

   To send custom metrics, [install the DogStatsD client][3] and [view code examples][4]. In serverless, only the *distribution* metric type is supported.

{{% serverless-init-env-vars-sidecar language="php" defaultSource="containerapp" %}}

## Troubleshooting

{{% serverless-init-troubleshooting productNames="Azure Container Apps" %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/php/
[2]: /tracing/other_telemetry/connect_logs_and_traces/php/
[3]: /developers/dogstatsd/?tab=php#install-the-dogstatsd-client
[4]: /metrics/custom_metrics/dogstatsd_metrics_submission/?tab=php#code-examples-5
