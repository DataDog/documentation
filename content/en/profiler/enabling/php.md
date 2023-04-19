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
    - link: 'profiler/search_profiles'
      tag: 'Documentation'
      text: 'Learn more about available profile types'
    - link: 'profiler/profiler_troubleshooting/php'
      tag: 'Documentation'
      text: 'Fix problems you encounter while using the profiler'
aliases:
  - /tracing/profiler/enabling/php/
---

## Requirements

The Datadog Profiler requires at least PHP 7.1, on 64-bit Linux.

The following are **not** supported:
- PHP ZTS builds
- PHP debug builds
- Fibers (PHP 8.1+)

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

{{% /tab %}}
{{< /tabs >}}

The following profiling features are available in the following minimum versions of the `dd-trace-php` library:

|      Feature         | Required `dd-trace-php` version          |
|----------------------|-----------------------------------------|
| [Code Hotspots][12]        | 0.71+                       |
| [Endpoint Profiling][13]            | 0.79.0+                       |

Continuous Profiler is not supported on serverless platforms, such as AWS Lambda.

## Installation

To begin profiling applications:

1. If you are already using Datadog, upgrade your Agent to version [7.20.2][1]+ or [6.20.2][2]+.

2. Download the `datadog-setup.php` script from the [GitHub release page][3]. Version 0.69.0 is the first tracer release to include this installer.

3. Run the installer to install both the tracer and profiler, for example `php datadog-setup.php --enable-profiling`. This script is interactive and asks which of the detected PHP locations it should install to. At the end of the script, it outputs the non-interactive version of the command arguments for future use.

   {{< tabs >}}
{{% tab "CLI" %}}

Set the environment variables before calling PHP, for example:

```
# DD_PROFILING_ENABLED is not required for v0.82.0+.
export DD_PROFILING_ENABLED=true

export DD_SERVICE=app-name
export DD_ENV=prod
export DD_VERSION=1.3.2

php hello.php
```

{{% /tab %}}
{{% tab "PHP-FPM" %}}

Use the `env` directive in the php-fpm's `www.conf` file, for example:

```
; DD_PROFILING_ENABLED is not required for v0.82.0+
env[DD_PROFILING_ENABLED] = true

env[DD_SERVICE] = app-name
env[DD_ENV] = prod
env[DD_VERSION] = 1.3.2
```

{{% /tab %}}
{{% tab "Apache" %}}

Use `SetEnv` from the server config, virtual host, directory, or `.htaccess` file:

```
# DD_PROFILING_ENABLED is not required for v0.82.0+.
SetEnv DD_PROFILING_ENABLED true

SetEnv DD_SERVICE app-name
SetEnv DD_ENV prod
SetEnv DD_VERSION 1.3.2
```

{{% /tab %}}
{{< /tabs >}}

   See the [configuration docs][4] for more environment variables.

4. A minute or two after receiving a request, profiles appear on the [APM > Profiler page][5].

## Not sure what to do next?

The [Getting Started with Profiler][6] guide takes a sample service with a performance problem and shows you how to use Continuous Profiler to understand and fix the problem.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: https://app.datadoghq.com/account/settings?agent_version=6#agent
[3]: https://github.com/DataDog/dd-trace-php/releases
[4]: /tracing/trace_collection/library_config/php/#environment-variable-configuration
[5]: https://app.datadoghq.com/profiling
[6]: /getting_started/profiler/
[12]: /profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces
[13]: /profiler/connect_traces_and_profiles/#break-down-code-performance-by-api-endpoints
