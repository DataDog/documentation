---
title: .NET Runtime Metrics
kind: documentation
description: "Gain additional insights into your .NET application's performance with the runtime metrics associated to your traces."
code_lang: dotnet
type: multi-code-lang
code_lang_weight: 50
aliases:
- /tracing/runtime_metrics/dotnet
further_reading:
    - link: 'tracing/other_telemetry/connect_logs_and_traces'
      tag: 'Documentation'
      text: 'Connect your Logs and Traces together'
    - link: 'tracing/trace_collection/custom_instrumentation'
      tag: 'Documentation'
      text: 'Manually instrument your application to create traces.'
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
    - link: 'https://www.datadoghq.com/blog/dotnet-runtime-metrics/'
      tag: 'Blog'
      text: 'Monitor .NET runtime metrics with Datadog'
---

## Runtime metrics compatibility

- .NET Framework 4.6.1+ 
- .NET Core 3.1
- .NET 5
- .NET 6
- .NET 7
 
## Automatic configuration

Enable runtime metrics collection in the .NET Tracer 1.23.0+ with the `DD_RUNTIME_METRICS_ENABLED=true` environment variable.

View runtime metrics in correlation with your .NET services. See the [Service page][1] in Datadog.

By default, runtime metrics from your application are sent to the Datadog Agent with DogStatsD over port `8125`. Make sure that [DogStatsD is enabled for the Agent][2].

If you are running the Agent as a container, ensure that `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [is set to true][3], and that port `8125` is open on the Agent. Additionally, for:

- **Kubernetes**: You _must_ [bind the DogstatsD port to a host port][4].
- **ECS**: [Set the appropriate flags in your task definition][5].

## Data Collected

The following metrics are collected by default after enabling .NET metrics.

{{< get-metrics-from-git "dotnet" >}}

Along with displaying these metrics in your APM Service Page, Datadog provides a [default .NET Runtime Dashboard][6].

## Additional permissions for IIS

On .NET Framework, metrics are collected using performance counters. Users in non-interactive logon sessions (that includes IIS application pool accounts and some service accounts) must be added to the **Performance Monitoring Users** group to access counter data.

IIS application pools use special accounts that do not appear in the list of users. To add them to the Performance Monitoring Users group, look for `IIS APPPOOL\<name of the pool>`. For instance, the user for the DefaultAppPool would be `IIS APPPOOL\DefaultAppPool`.

This can be done either from the "Computer Management" UI, or from an administrator command prompt:

```
net localgroup "Performance Monitor Users" "IIS APPPOOL\DefaultAppPool" /add
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/services
[2]: /developers/dogstatsd/#setup
[3]: /agent/docker/#dogstatsd-custom-metrics
[4]: /developers/dogstatsd/?tab=kubernetes#agent
[5]: /agent/amazon_ecs/#create-an-ecs-task
[6]: https://app.datadoghq.com/dash/integration/30412/net-runtime-metrics
