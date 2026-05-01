<!--
PHP profiler setup — self-contained.
PHP installs through a setup script rather than a tracer library, so the library
intro from other language partials is omitted.
No Configuration section: all configuration is shown inline in Installation.
-->

## Requirements

For a summary of the minimum and recommended runtime and tracer versions across all languages, read [Supported Language and Tracer Versions][1].

The Datadog Profiler requires at least PHP 7.1, on 64-bit Linux.

PHP ZTS builds are supported since `dd-trace-php` version 0.99+, while PHP debug builds are **not** supported.

{% tabs %}

{% tab label="GNU C Linux" %}
An operating system with glibc 2.17 or newer is required. The following versions or newer meet this requirement:
  - CentOS 7
  - Debian 8
  - Ubuntu 14.04

{% alert %}
The operating system versions above have all reached end of life (EOL), Datadog recommends running more recent versions.
{% /alert %}
{% /tab %}

{% tab label="Alpine Linux" %}
Version 3.13 or newer of Alpine Linux is required because the profiler is built against musl v1.2.

Additionally you need to install `libgcc_s` with:

```shell
apk add libgcc
```
{% /tab %}

{% /tabs %}

The following profiling features are available in the following minimum versions of the `dd-trace-php` library:

| Feature                              | Required `dd-trace-php` version |
|--------------------------------------|---------------------------------|
| [Trace to Profiling integration][3] | 0.89.0+                           |
| [Endpoint Profiling][4]             | 0.79.0+                         |
| [Timeline][5]                       | 0.98.0+                         |
| [Source Code Integration][6]        | 1.13.0+                         |

Continuous Profiler is not supported on serverless platforms, such as AWS Lambda.

## Installation

To begin profiling applications:

1. Make sure Datadog Agent v6+ is installed and running. Datadog recommends using [Datadog Agent v7+][2].

2. Download and run the `datadog-setup.php` installer:

    ```shell
    curl --proto '=https' --tlsv1.2 -sSfLO \
      https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php
    ```

    ```shell
    php datadog-setup.php --enable-profiling --php-bin=all
    ```

    This script is interactive and asks which of the detected PHP locations it should install to. At the end of the script, it outputs the non-interactive version of the command arguments for future use.

3. Configure the profiler:

    ```shell
    php datadog-setup.php config set \
      -d datadog.service=app-name \
      -d datadog.env=prod \
      -d datadog.version=1.3.2
    ```

    Apache, PHP-FPM, FrankenPHP, and other servers require a restart after changing the INI settings. See the [configuration docs][7] for more INI settings.

4. Validate the profiler extension is loaded by running `php -v` and checking for `datadog-profiling` in the output:

    ```text
    PHP 8.4.13 (cli) (built: Sep  5 2025 11:52:54) (ZTS)
    Copyright (c) The PHP Group
    Zend Engine v4.4.13, Copyright (c) Zend Technologies
        with Zend OPcache v8.4.13, Copyright (c), by Zend Technologies
        with datadog-profiling v1.13.0, Copyright Datadog, by Datadog
    ```

5. Optional: Set up [Source Code Integration][6] to connect your profiling data with your Git repositories.

6. After a couple of minutes, your profiles appear on the [Datadog APM > Profiler page][8]. If they do not, see the [Troubleshooting][9] guide.

[1]: /profiler/enabling/supported_versions/
[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[3]: /profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces
[4]: /profiler/connect_traces_and_profiles/#break-down-code-performance-by-api-endpoints
[5]: /profiler/profile_visualizations/#timeline-view
[6]: /integrations/guide/source-code-integration/?tab=php
[7]: /tracing/trace_collection/library_config/php/#environment-variable-configuration
[8]: https://app.datadoghq.com/profiling
[9]: /profiler/profiler_troubleshooting/php/
