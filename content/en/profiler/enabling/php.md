---
title: Enabling the PHP Profiler
kind: Documentation
code_lang: php
type: multi-code-lang
code_lang_weight: 70
further_reading:
    - link: 'getting_started/profiler'
      tag: 'Documentation'
      text: 'Getting Started with Profiler'
    - link: 'profiler/profile_visualizations'
      tag: 'Documentation'
      text: 'Learn more about available profile visualizations'
    - link: 'profiler/profiler_troubleshooting/php'
      tag: 'Documentation'
      text: 'Fix problems you encounter while using the profiler'
aliases:
  - /tracing/profiler/enabling/php/
---

## Requirements

For a summary of the minimum and recommended runtime and tracer versions across all languages, read [Supported Language and Tracer Versions][14].

The Datadog Profiler requires at least PHP 7.1, on 64-bit Linux.

PHP ZTS builds are supported since `dd-trace-php` version 0.99+, while PHP debug builds are **not** supported.

{{< tabs >}}
{{% tab "GNU C Linux" %}}

An operating system with glibc 2.17 or newer is required. The following versions or newer meet this requirement:
  - CentOS 7.
  - Debian 8, which has reached end of life (EOL).
  - Ubuntu 14.04, which is EOL.

Datadog recommends running an OS version that is not EOL.

{{% /tab %}}
{{% tab "Alpine Linux" %}}

Version 3.13 or newer of Alpine Linux is required because the profiler is built against musl v1.2.

Additionally you need to install `libgcc_s` with:

```shell
apk add libgcc
```

{{% /tab %}}
{{< /tabs >}}

The following profiling features are available in the following minimum versions of the `dd-trace-php` library:

|      Feature              | Required `dd-trace-php` version          |
|---------------------------|------------------------------------------|
| [Code Hotspots][12]       | 0.71+                                    |
| [Endpoint Profiling][13]  | 0.79.0+                                  |
| [Timeline][15]            | 0.98.0+ (beta since 0.89.0+)             |

Continuous Profiler is not supported on serverless platforms, such as AWS Lambda.

## Installation

To begin profiling applications:

1. Ensure Datadog Agent v6+ is installed and running. Datadog recommends using [Datadog Agent v7+][2].

2. Download the `datadog-setup.php` script from the [GitHub release page][3]. Version 0.69.0 is the first tracer release to include this installer.

3. Run the installer to install both the tracer and profiler, for example `php datadog-setup.php --enable-profiling`. This script is interactive and asks which of the detected PHP locations it should install to. At the end of the script, it outputs the non-interactive version of the command arguments for future use.

4. Configure the profiler using config mode through the `datadog-setup.php`:

    ```
    # `datadog.profiling.enabled` is not required for v0.82.0+.
    php datadog-setup.php config set -d datadog.profiling.enabled=1

    php datadog-setup.php config set \
      -d datadog.service=app-name \
      -d datadog.env=prod \
      -d datadog.version=1.3.2

    php hello.php
    ```

    Apache, PHP-FPM and other servers require a restart after changing the INI
settings.

    See the [configuration docs][4] for more INI settings.

5. A minute or two after receiving a request, profiles appear on the [APM > Profiler page][5].

## Not sure what to do next?

The [Getting Started with Profiler][6] guide takes a sample service with a performance problem and shows you how to use Continuous Profiler to understand and fix the problem.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: https://app.datadoghq.com/account/settings/agent/6?platform=overview
[3]: https://github.com/DataDog/dd-trace-php/releases
[4]: /tracing/trace_collection/library_config/php/#environment-variable-configuration
[5]: https://app.datadoghq.com/profiling
[6]: /getting_started/profiler/
[12]: /profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces
[13]: /profiler/connect_traces_and_profiles/#break-down-code-performance-by-api-endpoints
[14]: /profiler/enabling/supported_versions/
[15]: /profiler/profile_visualizations/#timeline-view
