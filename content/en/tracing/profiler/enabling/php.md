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
    - link: 'tracing/profiler/search_profiles'
      tag: 'Documentation'
      text: 'Learn more about available profile types'
    - link: 'tracing/profiler/profiler_troubleshooting'
      tag: 'Documentation'
      text: 'Fix problems you encounter while using the profiler'
---

<div class="alert alert-warning">
The Datadog PHP Profiler is in public beta. Datadog recommends evaluating the profiler in a non-sensitive environment before deploying in production.
</div>

## Requirements

The Datadog Profiler requires at least PHP 7.1, on 64-bit Linux.

The following are **not** supported:
- PHP 8.1
- ZTS builds of PHP
- PHP debug builds

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

Profiling is not supported on serverless platforms.

## Installation

To begin profiling applications:

1. If you are already using Datadog, upgrade your Agent to version [7.20.2][1]+ or [6.20.2][2]+.

2. Download the `datadog-setup.php` script from the [GitHub release page][3]. Version 0.69.0 is the first tracer release to include this installer.

3. Run the installer to install both the tracer and profiler, for example `php datadog-setup.php --enable-profiling`. This script is interactive and asks which of the detected PHP locations it should install to. At the end of the script, it outputs the non-interactive version of the command arguments for future use.

4. Configure the profiler with environment variables. Unlike the tracer the profiler does not support INI settings.

   {{< tabs >}}
{{% tab "CLI" %}}

Set the environment variables before calling PHP, for example:

```
export DD_PROFILING_ENABLED=true
export DD_SERVICE=app-name
export DD_ENV=prod
export DD_VERSION=1.3.2

php hello.php
```

{{% /tab %}}
{{% tab "PHP-FPM" %}}

Use the `env` directive in the php-fpm’s `www.conf` file, for example:

```
env[DD_PROFILING_ENABLED] = true
env[DD_SERVICE] = app-name
env[DD_ENV] = prod
env[DD_VERSION] = 1.3.2
```

{{% /tab %}}
{{% tab "Apache" %}}

Use `SetEnv` from the server config, virtual host, directory, or `.htaccess` file:

```
SetEnv DD_PROFILING_ENABLED true
SetEnv DD_SERVICE app-name
SetEnv DD_ENV prod
SetEnv DD_VERSION 1.3.2
```

{{% /tab %}}
{{< /tabs >}}

   See the [configuration docs][4] for more environment variables.

5. A minute or two after receiving a request, profiles appear on the [APM > Profiler page][5].

## Not sure what to do next?

The [Getting Started with Profiler][6] guide takes a sample service with a performance problem and shows you how to use Continuous Profiler to understand and fix the problem.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: https://app.datadoghq.com/account/settings?agent_version=6#agent
[3]: https://github.com/DataDog/dd-trace-php/releases
[4]: /tracing/setup_overview/setup/php/#environment-variable-configuration
[5]: https://app.datadoghq.com/profiling
[6]: /getting_started/profiler/
