---
title: Enabling the Datadog Native Profiler for Linux
kind: Documentation
code_lang: native
type: multi-code-lang
code_lang_weight: 40
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

## Requirements

The Datadog Profiler requires Linux kernel v4.17+. It is currently not supported on macOS or Windows. `/proc/sys/kernel/perf_event_open` must be set to *at most* 2 or `CAP_SYS_ADMIN` must be granted to the profiling process or service container.

## Installation

To begin profiling applications:

1. Ensure you are running the Datadog agent version [7.20.2][1]+ or [6.20.2][2]+.

2. Download the appropriate [ddprof binary][3] for your Linux distribution.

3. Modify your service invocation to include the profiler. Your usual command is expected as the last arguments to the `ddprof` executable.
   {{< tabs >}}
{{% tab "Environment variables" %}}

```shell
export DD_SERVICE="<SERVICE_NAME>"
export DD_VERSION="<APPLICATION_VERSION>"
export DD_ENV="<APPLICATION_ENVIRONMENT>"
ddprof myapp --arg1 --arg2
```

The following settings help you identify the source of your profiles:
- `DD_ENV` to the given environment
- `DD_VERSION` to a meaningful application-level version string
- `DD_SERVICE` to the service name

**Note**: if you usually launch your application using shell builtins, for example:

```shell
exec myapp --arg1 --arg2
```

then you must invoke `ddprof` with those builtins instead:

```shell
export DD_SERVICE="<SERVICE_NAME>"
export DD_VERSION="<APPLICATION_VERSION>"
export DD_ENV="<APPLICATION_ENVIRONMENT>"
exec ddprof myapp --arg1 --arg2
```

{{% /tab %}}
{{% tab "In code" %}}

```shell
ddprof --service "<SERVICE_NAME>" --vername "<APPLICATION_VERSION"> myapp --arg1 --arg2
```

The following settings help you identify the source of your profiles:
- `--environment` to the given environment
- `--service` to the service name
- `--vername` to a meaningful application-level version string

**Note**: if you usually launch your application using shell builtins, for example:

```shell
exec myapp --arg1
```

then you must invoke `ddprof` with those builtins instead:

```shell
exec ddprof --service "<SERVICE_NAME>" --vername "<APPLICATION_VERSION"> myapp --arg1
```

{{% /tab %}}
{{< /tabs >}}


4. A minute or two after starting your application, your profiles will show up on the [Datadog APM > Profiler page][3].

## Not sure what to do next?

The [Getting Started with Profiler][4] guide takes a sample service with a performance problem and shows you how to use Continuous Profiler to understand and fix the problem.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: https://app.datadoghq.com/account/settings?agent_version=6#agent
[3]: https://app.datadoghq.com/profiling
[4]: /getting_started/profiler/
