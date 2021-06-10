---
title: Continuous Profiler
kind: Documentation
aliases:
    - /tracing/profiling
further_reading:
    - link: '/tracing/profiler/enabling'
      tag: 'Documentation'
      text: 'Enable continuous profiler for your application.'
    - link: 'getting_started/profiler'
      tag: 'Documentation'
      text: 'Getting Started with Continuous Profiler'
    - link: 'tracing/profiler/search_profiles'
      tag: 'Documentation'
      text: 'Learn more about available profile types.'
    - link: 'https://www.datadoghq.com/blog/introducing-datadog-profiling/'
      tags: 'Blog'
      text: 'Introducing always-on production profiling in Datadog.'
    - link: 'https://www.datadoghq.com/blog/datadog-github-action-vulnerability-analysis/'
      tags: 'Blog'
      text: 'Datadog GitHub Action for continuous vulnerability analysis.'

---

{{< vimeo 441865141 >}}

</br>

Find CPU, memory, and IO bottlenecks, broken down by method name, class name, and line number, to significantly reduce end-user latency and infrastructure costs.

### Low impact in production

Continuous profiler is designed to run in production across all services by leveraging technologies such as JDK Flight Recorder to have minimal impact on your host's CPU and memory usage.

## Getting started

Profiling your service to visualize all your stack traces in one place takes just minutes.

### Instrument your application

{{< partial name="profiling/profiling-languages.html" >}}

To get notified when a private beta is available for the **Node**, **PHP**, or **.NET** Profiler, [sign up here][1].

## Guide to using the profiler

The [Getting Started with Profiler][2] guide takes a sample service with a performance problem and shows you how to use Continuous Profiler to understand and fix the problem.

## Explore Datadog profiler

After you've configured your application to send profiles to Datadog, start getting insights into your code performance:

### Search profiles by tags

[Use tags to search profiles][3] across any dimension—whether it’s a specific host, service, version, or any combination.

{{< img src="tracing/profiling/search_profiles.gif" alt="Search profiles by tags">}}

### Track function performance over deployments

Obtain key profiling metrics from services such as top CPU usage by method, top memory allocations by thread, and CPU usage by version to visualize in your dashboards.

{{< img src="tracing/profiling/profiling-metric-dashboard.gif" alt="Add profiling metrics to your dashboards.">}}

### Connect traces to profiling data

Application processes that have both [APM distributed tracing][4] and continuous profiler enabled are automatically linked, so you can move directly from span information to profiling data on the [Code Hotspots tab][5] to find specific lines of code related to performance issues.

{{< img src="tracing/profiling/code_hotspots_tab.gif" alt="Code Hotspots tab shows profiling information for a APM trace span">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.google.com/forms/d/e/1FAIpQLScb9GKmKfSoY6YNV2Wa5P8IzUn02tA7afCahk7S0XHfakjYQw/viewform
[2]: /getting_started/profiler/
[3]: /tracing/profiling/search_profiles
[4]: /tracing/
[5]: /tracing/profiler/connect_traces_and_profiles/
