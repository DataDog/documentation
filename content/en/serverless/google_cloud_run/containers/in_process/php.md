---
title: Instrumenting a PHP Cloud Run Container In-Process
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

## 1. Install the Tracer

Install the tracer in your Dockerfile:

```Dockerfile
RUN curl -LO https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php
RUN php datadog-setup.php --php-bin=all
```

When running the `datadog-setup.php` script, you can also enable appsec and profiling via the `--enable-appsec` and `--enable-profiling` flags.

If you are using Alpine Linux, you need to install `libgcc_s` prior to running the installer:

```shell
apk add libgcc
```

For more information, see [Tracing PHP applications][1].

## 2. Install Serverless-Init

{{% gcr-install-serverless-init cmd="\"apache2-foreground\"" %}}

## 3. Setup Logs

To enable logging, set the environment variable `DD_LOGS_ENABLED=true`. This allows serverless-init to read logs from stdout and stderr.

We also recommend setting the environment variable `DD_SOURCE=php` to enable advanced Datadog log parsing.

For more information, see [Correlating PHP Logs and Traces][2].

## 4. Configure your application

{{% gcr-configure-env-vars %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/php/
[2]: /tracing/other_telemetry/connect_logs_and_traces/php/

