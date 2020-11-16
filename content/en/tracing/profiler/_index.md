---
title: Continuous Profiler
kind: Documentation
aliases:
    - /tracing/profiling
further_reading:
    - link: 'tracing/profiler/getting_started'
      tag: 'Documentation'
      text: 'Enable continuous profiler for your application.'  
    - link: 'tracing/profiler/search_profiles'
      tag: 'Documentation'
      text: 'Learn more about available profile types.'
    - link: 'https://www.datadoghq.com/blog/introducing-datadog-profiling/'
      tags: 'Blog'
      text: 'Introducing always-on production profiling in Datadog.'
---

{{< img src="tracing/profiling/profiling_flamegraph.gif" alt="Exploring profiling flame graph">}}

Find CPU, memory, and IO bottlenecks, broken down by method name, class name, and line number, to significantly reduce end-user latency and infrastructure costs.

### Low impact in production

Continuous profiler is designed to run in production across all services by leveraging technologies such as JDK Flight Recorder to have minimal impact on your host's CPU and memory usage.

## Getting Started

Profiling your service to visualize all your stack traces in one place takes just minutes.

### 1. Instrument Your Application

Add a profiler library to your application to start sending profiles to the Datadog Agent.

To get notified when a private beta is available for the **Node**, **Ruby**, **PHP**, or **.NET** Profiler, [sign up here][1].

{{< partial name="profiling/profiling-languages.html" >}}

## Explore Datadog Profiler

Now that you've configured your application to send profiles to Datadog, start getting insights into your code performance:

### Search profiles by tags

[Use tags to search profiles][2] across any dimension—whether it’s a specific host, service, version, or any combination.

{{< img src="tracing/profiling/search_profiles.gif" alt="Search profiles by tags">}}

### Track function performance over deployments

Obtain key profiling metrics from services such as top CPU usage by method, top memory allocations by thread, and CPU usage by version to visualize in your dashboards.

{{< img src="tracing/profiling/profiling-metric-dashboard.gif" alt="Add profiling metrics to your dashboards.">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.google.com/forms/d/e/1FAIpQLScb9GKmKfSoY6YNV2Wa5P8IzUn02tA7afCahk7S0XHfakjYQw/viewform
[2]: /tracing/profiling/search_profiles
