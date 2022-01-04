---
title: Enabling the .NET Profiler
kind: Documentation
code_lang: dotnet
type: multi-code-lang
code_lang_weight: 60
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

The profiler is shipped within Datadog tracing libraries. If you are already using [APM to collect traces][1] for your application, you can skip installing the library and go directly to enabling the profiler.

## Requirements

The Datadog Profiler requires TKTK

## Installation

To begin profiling applications:

1. If you are already using Datadog, upgrade your agent to version [7.20.2][2]+ or [6.20.2][3]+.

2. Install the library by TKTK

3. Enable the profiler:

   {{< tabs >}}
{{% tab "Environment variables" %}}

```shell
export DD_PROFILING_ENABLED=true
export DD_ENV=prod
export DD_SERVICE=my-web-app
export DD_VERSION=1.0.3
```

{{% /tab %}}
{{% tab "In code" %}}

TKTK


{{% /tab %}}
{{< /tabs >}}

4. Anything special about starting the app ... TKTK

5. A minute or two after starting your .NET application, your profiles will show up on the [Datadog APM > Profiler page][4].

## Not sure what to do next?

The [Getting Started with Profiler][5] guide takes a sample service with a performance problem and shows you how to use Continuous Profiler to understand and fix the problem.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup_overview/
[2]: https://app.datadoghq.com/account/settings#agent/overview
[3]: https://app.datadoghq.com/account/settings?agent_version=6#agent
[4]: https://app.datadoghq.com/profiling
[5]: /getting_started/profiler/
