---
title: Profile visualizations
kind: documentation
aliases:
    - /tracing/profiling/search_profiles/
    - /tracing/profiler/search_profiles/
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

{{< img src="profiler/search_profiles.mp4" alt="Search profiles by tags" video=true >}}

Select a service to view its profiles. Select a profile type to view different resources (CPU, Memory, Exception, I/O, ...).

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

For each runtime, there is also a broader set of metrics available, which you can see [listed by timeseries][4].

## Flame Graph

Continuous Profiler default visualization is the flame graph.

{{< img src="profiler/profiling_viz-flamegraph.png" alt="A flame graph" >}}

It shows are how much CPU each method used (since this is a CPU profile) and how each method was called.

For example, starting from the first row, `Thread.run()` called `ThreadPoolExecutor$Worker.run()` which called `ThreadPoolExecutor.runWorker(ThreadPoolExecutor$Worker)` and so on.

The width of a frame represents how much of the total CPU it consumed. On the right, you can see a "CPU time by Method" top list that only accounts for self time, which is the time a method spent on CPU without calling another method.

## Single Profile

By default, profiles are uploaded once a minute. Depending on the language, these processes are profiled between 15s and 60s.

To view a specific profile, select `Visualize as Profile list` and click on a line to view a specific profile:

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

## Timeline view

The timeline view is the equivalent of the flame graph over time.

{{< img src="profiler/profiling_viz-timeline.png" alt="A timeline" >}}

It shows time-based patterns and work distribution over the period of a single profile.

Select a line, then drag and drop to see detailed breakdowns

Depending on the runtime and language, the timeline lines vary:

{{< programming-lang-wrapper langs="java,python,go,ruby,dotnet,php" >}}
{{< programming-lang lang="java" >}}
Each line is a thread. Threads from a common pool are grouped together. You can expand the pool to see each thread details.

Lines are top are runtime activities. They may affect your code performance.
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}
Each line is a goroutine. Goroutines from a common pool are grouped together. You can expand the pool to see each goroutine details.

TODO For each goroutine, you see the goroutine state (waiting, scheduled, running, ...) as well as the stack traces
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}
Each line is a thread. Threads from a common pool are grouped together. You can expand the pool to see each thread details.

Lines are top are runtime activities. They may affect your code performance.
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Profile types

In the **Profiles** tab, you can see all profile types available for a given language. Depending on the language, the information collected about your profile differs. See [Profile types][3] for a list of profile types available for each language.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /tracing/send_traces/#configure-your-environment
[2]: /tracing/glossary/#services
[3]: /profiler/profile_types/
[4]: https://app.datadoghq.com/profiling/search?viz=timeseries
