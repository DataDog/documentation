---
title: Enabling the PHP Profiler
kind: Documentation
code_lang: php
type: multi-code-lang
code_lang_weight: 50
further_reading:
    - link: 'getting_started/profiler'
      tag: 'Documentation'
      text: 'Getting Started with Profiler'
    - link: 'tracing/profiler/search_profiles'
      tag: 'Documentation'
      text: 'Learn more about available profile types'
    - link: 'tracing/profiler/profiler_troubleshooting'
      tag: 'Documentation'
      text: 'Fix problems you encounter while using the profiler'
---

{{< site-region region="us5" >}}
<div class="alert alert-warning">
  The Continuous Profiler is not available for the Datadog {{< region-param key="dd_site_name" >}} site.
</div>
{{< /site-region >}}

<div class="alert alert-warning">
The Datadog PHP Profiler is currently in public beta. Datadog recommends evaluating the profiler in a non-sensitive environment before deploying in production.
</div>

Starting in tracer version 0.69.0, both the tracer and profiler can be installed simultaneously using the script `datadog-setup.php`.

## Requirements

The Datadog Profiler requires at least PHP 7.1. PHP 8.1 is not yet supported. ZTS builds of PHP are not supported, nor are debug builds.

A 64-bit, Linux Operating System (OS) is required.

{{< tabs >}}
{{% tab "GNU C Linux" %}}

An Operating System with glibc 2.17 or newer is needed. The following OS versions or newer meet this requirement:
  - CentOS 7.
  - Debian 8, which has reached End Of Life (EOL).
  - Ubuntu 14.04, which is EOL.

Datadog recommends running an OS version which is not EOL.

{{% /tab %}}
{{% tab "Alpine Linux" %}}

Version 3.13 of Alpine Linux or newer is required as the profiler is built against musl v1.2.

{{% /tab %}}
{{< /tabs >}}

## Installation

To begin profiling applications:

 1. If you are already using Datadog, upgrade your Agent to version [7.20.2][2]+ or [6.20.2][3]+.

 2. Download the `datadog-setup.php` script from the [GitHub release page](https://github.com/DataDog/dd-trace-php/releases). Version 0.69.0 was the first release to include this installer.

 3. Run the installer to install both the tracer and profiler, for example `php datadog-setup.php --enable-profiling`. This script is interactive and asks which of the detected PHP locations it should install to. At the end of the script, it outputs the non-interactive version of the command arguments for future use.

 4. Configure the profiler with environment variables. The tracer supports using INI values, but the profiler does not support INI settings yet.

| Environment Variable | Acceptable Values       | Comment |
|----------------------|-------------------------|---------|
| `DD_PROFILING_ENABLED` | Boolean values\*          | Defaults to `false`. |
| `DD_PROFILING_LOG_LEVEL` | `off`, `error`, `warn`, `info`, `debug` | Defaults to `off`. |
| `DD_PROFILING_EXPERIMENTAL_CPU_TIME_ENABLED` | Boolean values\* | Defaults to `false`. |

\* Acceptable truthy boolean values are `1`, `on`, `yes`, and `true`. Acceptable falsey boolean values are `0`, `no`, `off`, and `false`.

The profiler supports these environment variables which are documented on the [setup page for PHP][4]:
  - `DD_SERVICE`. It is strongly recommended to set this variable.
  - `DD_ENV`
  - `DD_VERSION`
  - `DD_AGENT_HOST`
  - `DD_TRACE_AGENT_PORT`
  - `DD_TRACE_AGENT_URL`

 5. A minute or two after receiving a request, profiles will show up on the [APM > Profiler page][5].

## Not sure what to do next?

The [Getting Started with Profiler][6] guide takes a sample service with a performance problem and shows you how to use Continuous Profiler to understand and fix the problem.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup_overview/
[2]: https://app.datadoghq.com/account/settings#agent/overview
[3]: https://app.datadoghq.com/account/settings?agent_version=6#agent
[4]: /tracing/setup_overview/setup/php/#environment-variable-configuration
[5]: https://app.datadoghq.com/profiling
[6]: /getting_started/profiler/
