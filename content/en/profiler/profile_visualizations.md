---
title: Profile Visualizations
kind: documentation
aliases:
    - /tracing/profiling/search_profiles/
    - /tracing/profiler/search_profiles/
    - /profiler/search_profiles/
further_reading:
    - link: 'profiler/enabling'
      tag: 'Documentation'
      text: 'Enable continuous profiler for your application'
    - link: 'getting_started/profiler'
      tag: 'Documentation'
      text: 'Getting Started with Profiler'
    - link: 'https://www.datadoghq.com/blog/introducing-datadog-profiling/'
      tags: 'Blog'
      text: 'Introducing always-on production profiling in Datadog'
---

## Search profiles

{{< img src="profiler/search_profiles2.mp4" alt="Search profiles by tags" video=true >}}

Go to **APM -> Profiles** and select a service to view its profiles. Select a profile type to view different resources (for example, CPU, Memory, Exception, and I/O).

You can filter according to infrastructure tags or application tags set up from your [environment tracing configuration][1]. By default the following facets are available:

| Facet   | Definition                                                                |
| ------- | ------------------------------------------------------------------------- |
| Env     | The environment your application is running on (`production`, `staging`). |
| Service | The name of the [service][2] your code is running.                        |
| Version | The version of your code.                                                 |
| Host    | The hostname your profiled process is running on.                         |
| Runtime | The type of runtime the profiled process is running (`JVM`, `CPython`).   |

The following measures are available:

| Measure                | Definition                                                                                                                                                                               |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CPU                    | CPU usage, measured in cores.                                                                                                                                                            |
| Memory&nbsp;Allocation | Memory allocation rate over the course of the profile. This value can be above the amount of memory on your system because allocated memory can be garbage collected during the profile. |
| Wall time              | The elapsed time used by the code. Elapsed time includes time when code is running on CPU, waiting for I/O, and anything else that happens while it is running.  |

For each runtime, there is also a broader set of metrics available, which you can see [listed by timeseries][3].

## Profile types

In the **Profiles** tab, you can see all profile types available for a given language. Depending on the language, the information collected about your profile differs. See [Profile types][4] for a list of profile types available for each language.

## Visualizations

### Flame graph

The flame graph is the default visualization for Continuous Profiler. It shows how much CPU each method used (since this is a CPU profile) and how each method was called.

{{< img src="profiler/profiling_viz-flamegraph.png" alt="A flame graph" >}}

For example, starting from the first row in the previous image, `Thread.run()` called `ThreadPoolExecutor$Worker.run()`, which called `ThreadPoolExecutor.runWorker(ThreadPoolExecutor$Worker)`, and so on.

The width of a frame represents how much of the total CPU it consumed. On the right, you can see a **CPU time by Method** top list that only accounts for self time, which is the time a method spent on CPU without calling another method.

Flame graphs can be be included in Dashboards and Notebooks with the [Profiling Flame Graph Widget][5].

### Single profile

By default, profiles are uploaded once a minute. Depending on the language, these processes are profiled between 15s and 60s.

To view a specific profile, set the **Visualize as** option to **Profile List** and click an item in the list:

{{< img src="profiler/profiling_single-profile.mp4" alt="Select a single profile" video=true >}}

The header contains information associated with your profile, like the service that generated it, or the environment and code version associated to it.

Four tabs are below the profile header:

| Tab               | Definition                                                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Profiles          | A flame graph and summary table of the profile you are looking at. You can switch between profile types (for example, `CPU`, `Memory allocation`). |
| Analysis          | A set of heuristics that suggest potential issues or areas of improvement in your code. Only available for Java.            |
| Metrics           | Profiler metrics coming from all profiles of the same service.                                                                        |
| Runtime&nbsp;Info | Runtime properties in supported languages, and profile tags.                                                                          |

**Note**: In the upper right corner of each profile, there are options to:

- Compare this profile with others
- View repository commit
- View traces for the same process and timeframe
- Download the profile
- Open the profile in full page

### Timeline view

The timeline view is the equivalent of the flame graph, with a distribution over time.

{{< img src="profiler/profiling_viz-timeline.png" alt="A timeline" >}}

It shows time-based patterns and work distribution over:
- [The period of a single profile](#single-profile)
- [A trace][6]

Compared to the flame graph, the timeline view can help you:

- Isolate spiky methods
- Sort out complex interactions between threads
- Surface runtime activity that impacted the process

Depending on the runtime and language, the timeline lanes vary:

{{< programming-lang-wrapper langs="java,go,ruby,dotnet" >}}
{{< programming-lang lang="java" >}}
Each lane represents a **thread**. Threads from a common pool are grouped together. You can expand the pool to view details for each thread.

Lanes on top are runtime activities that may impact performance.

For additional information about debugging slow p95 requests or timeouts using the timeline, see the blog post [Understanding Request Latency with Profiling][1].

[1]: https://richardstartin.github.io/posts/wallclock-profiler
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}
See [prerequisites][1] to learn how to enable this feature for Go.

Each lane represents a **goroutine**. Goroutines created by the same `go` statement are grouped together. You can expand the group to view details for each goroutine.

Lanes on top are runtime activities that may impact performance.

For additional information about debugging slow p95 requests or timeouts using the timeline, see the blog post [Debug Go Request Latency with Datadog's Profiling Timeline][2].

[1]: /profiler/connect_traces_and_profiles/#prerequisites
[2]: https://blog.felixge.de/debug-go-request-latency-with-datadogs-profiling-timeline/
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}
See [prerequisites][1] to learn how to enable this feature for Ruby.

Each lane represents a **thread**. Threads from a common pool are grouped together. You can expand the pool to view details for each thread.

[1]: /profiler/connect_traces_and_profiles/#prerequisites
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}
Each lane represents a **thread**. Threads from a common pool are grouped together. You can expand the pool to view details for each thread.

Lanes on top are runtime activities that may impact performance.
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/send_traces/#configure-your-environment
[2]: /tracing/glossary/#services
[3]: https://app.datadoghq.com/profiling/search?viz=timeseries
[4]: /profiler/profile_types/
[5]: /dashboards/widgets/profiling_flame_graph
[6]: /profiler/connect_traces_and_profiles/#span-execution-timeline-view
