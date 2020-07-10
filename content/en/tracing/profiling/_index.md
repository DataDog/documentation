---
title: Continuous Profiling
kind: Documentation
further_reading:
    - link: 'tracing/profiling/getting_started'
      tag: 'Documentation'
      text: 'Enable continuous profiling for your application.'
    - link: 'tracing/profiling/trace_profile'
      tag: 'Documentation'
      text: 'Connect traces and profiles.'
    - link: 'tracing/profiling/code_level_metrics'
      tag: 'Documentation'
      text: 'View code level metrics.'  
    - link: 'tracing/profiling/search_profiles'
      tag: 'Documentation'
      text: 'Learn more about available profile types.'
    - link: 'https://www.datadoghq.com/blog/introducing-datadog-profiling/'
      tags: 'Blog'
      text: 'Introducing always-on production profiling in Datadog.'
---

<div class="alert alert-info">
Datadog Profiling is in beta. Reach out to <a href="/help/">Datadog Support</a> if you encounter any issues or have feedback to share.
</div>

{{< img src="tracing/profiling/profiling_flamegraph.gif" alt="Exploring profiling flame graph">}}

Find CPU, memory, and IO bottlenecks, broken down by method name, class name, and line number, to significantly reduce end-user latency and infrastructure costs.

### Low impact in production

Continuous profiling is designed to run in production across all services by leveraging technologies such as [JDK Flight Recorder][1] to have minimal impact on your host's CPU and memory usage.

## Getting Started

Profiling in your service to visualize all your stack traces in one place takes just minutes.

### 1. Instrument Your Application

Add a profiling library to your application to start sending profiles to the Datadog Agent.

{{< partial name="profiling/profiling-languages.html" >}}

## Explore Datadog Profiling

Now that you've configured your application to send profiles to Datadog, start getting insights into your code performance:

### Search profiles by tags

[Use tags to search profiles][2] across any dimension—whether it’s a specific host, service, version, or any combination.

{{< img src="tracing/profiling/search_profiles.gif" alt="Search profiles by tags">}}

### Track function performance over deployments

Obtain key profiling metrics from services such as top CPU usage by method, top memory allocations by thread, and CPU usage by version to visualize in your dashboards.

{{< img src="tracing/profiling/profiling-metric-dashboard.gif" alt="Add profiling metrics to your dashboards.">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.oracle.com/javacomponents/jmc-5-4/jfr-runtime-guide/about.htm#JFRUH170
[2]: /tracing/profiling/search_profiles
