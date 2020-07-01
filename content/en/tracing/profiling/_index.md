---
title: Continuous Profiling
kind: Documentation
further_reading:
    - link: 'https://www.datadoghq.com/blog/introducing-datadog-profiling/'
      tags: 'Blog'
      text: 'Introducing always-on production profiling in Datadog.'
---

<div class="alert alert-info">
Datadog Profiling is in beta. Reach out to <a href="/help/">Datadog Support</a> if you encounter any issues or have feedback to share.
</div>

{{< img src="tracing/profiling/profiling_flamegraph.gif" alt="Exploring profiling flame graph">}}

Find CPU, memory, and IO bottlenecks, broken down by method name, class name, and line number, to significantly reduce end-user latency and infrastructure costs.

### Getting Started

Enable Continuous Profiling in your service to visualize all your stack traces in one place and get actionable insights for performance improvements.

{{< partial name="profiling/profiling-languages.html" >}}

### Low impact in production

Continuous profiling is designed to run in production across all services by leveraging technologies such as Java Flight Recorder to have very minimal impact on your application.

### Correlate profiles and traces

Pivot seamlessly between [distributed traces and profiles][1] to find the line of code responsible for a slow request.

{{< img src="tracing/profiling/trace-profile.gif" alt="Connect profiles and traces.">}}

### Search profiles by tags

[Slice and dice your profiles][2] across any dimension—whether it’s a specific host, service, version, or any combination.

{{< img src="tracing/profiling/search_profiles.gif" alt="Search profiles by tags">}}

### Track method performance over deployments

[Obtain key profiling metrics][3] from services such as top CPU usage by method, top memory allocations by thread, and CPU usage by version to visualize in your dashboards and alert with monitors.

{{< img src="tracing/profiling/profiling-metric-dashboard.gif" alt="Add profiling metrics to your dashboards.">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/profiling/trace_profile
[2]: /tracing/profiling/search_profiles
[3]: /tracing/profiling/code_level_metrics
