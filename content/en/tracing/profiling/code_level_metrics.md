---
title: Code Level Metrics
kind: Documentation
further_reading:
    - link: 'tracing/profiling/trace_profile'
      tag: 'Documentation'
      text: 'Connect traces and profiles.'
    - link: 'tracing/profiling/search_profiles'
      tag: 'Documentation'
      text: 'Learn more about available profile types.'  
    - link: 'tracing/profiling/getting_started'
      tag: 'Documentation'
      text: 'Enable continuous profiling for your application.'
    - link: 'https://www.datadoghq.com/blog/introducing-datadog-profiling/'
      tags: 'Blog'
      text: 'Introducing always-on production profiling in Datadog.'
---

{{< img src="tracing/profiling/profiling-metric-dashboard.gif" alt="Add profiling metrics to your dashboards.">}}

When you click the metrics tab while viewing a profile, you will get graphs we have generated to help you track key profiling metrics. These metrics can be useful when you want to detect anomalies at a glance or quickly determine where you can optimize your code. You can also use metrics such as top CPU usage by method, top memory allocations by thread, and CPU usage by version to visualize in your dashboards and alert with monitors. This helps you track and get alerts when your code changes lead to performance regressions.

## Code Level Metrics on Service Pages

{{< img src="tracing/profiling/service-page-metrics.png" alt="Automatically access profiling metrics on your service pages.">}}

Alongside latency, error rates, and request metrics, you will also have code level metrics automatically added to your service pages. These metrics will allow you to correlate latency or error spikes with functions directly involved in those slow or faulty requests.  

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
