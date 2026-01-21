---
title: Profile Visualizations
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
      tag: 'Blog'
      text: 'Introducing always-on production profiling in Datadog'
    - link: 'https://www.datadoghq.com/blog/continuous-profiler-timeline-view/'
      tag: 'Blog'
      text: "Diagnose runtime and code inefficiencies using Continuous Profiler's timeline view"
    - link: 'https://www.datadoghq.com/blog/profiling-visualizations/'
      tag: 'Blog'
      text: 'Accessible profiling visualizations'
---

## Search profiles

{{< img src="profiler/search_profiles3.mp4" alt="Search profiles by tags" video=true >}}

Go to **APM > Profiles** and select a service to view its profiles.

You can filter according to infrastructure tags or application tags set up from your [environment tracing configuration][1]. By default the following facets are available:

| Facet   | Definition                                                                |
| ------- | ------------------------------------------------------------------------- |
| Env     | The environment your application is running on (`production`, `staging`). |
| Service | The name of the [service][2] your code is running.                        |
| Version | The version of your code.                                                 |
| Host    | The hostname your profiled process is running on.                         |
| Runtime | The type of runtime the profiled process is running (`JVM`, `CPython`).   |

## Visualizations

### Flame graph

The flame graph is the default visualization for Continuous Profiler. The one below shows how much CPU each method used and how each method was called. Other [Profile types][4] are available depending on the language.

{{< img src="profiler/profiling_viz-flamegraph2.png" alt="A flame graph" >}}

For example, starting from the first row in the previous image, `Thread.run()` called `Thread.runWith(Object, Runnable)`, which called `ThreadPoolExecutor$Worker.run()`, and so on.

The width of a frame represents how much of the total CPU it consumed. On the right, you can see a **CPU time by Method** top list that only accounts for self time, which is the time a method spent on CPU without calling another method.

By default, darker frames indicate higher CPU usage, while lighter frames signify lower usage; the most resource-intensive methods are grouped on the leftmost side of the flame graph.

Flame graphs can be included in Dashboards and Notebooks with the [Profiling Flame Graph Widget][5].

### Timeline view

The timeline view is equivalent to the flame graph, with time-based patterns and work distribution over [the period of a single profile](#single-profile), a single process in [profiling explorer][7] and [a trace][6].

Compared to the flame graph, the timeline view can help you:

- Isolate spiky methods
- Sort out complex interactions between threads
- Surface runtime activity that impacted the process

{{< img src="profiler/profiling_viz-timeline3.png" alt="A timeline" >}}

To access the timeline view:

1. Go to [**APM** > **Profiles** > **Explorer**][7].
2. Set the **Visualize as** option to **Thread Timeline**.

Depending on the runtime and language, the timeline lanes vary:

{{< programming-lang-wrapper langs="java,python,go,ruby,nodejs,dotnet,php,full_host" >}}
{{< programming-lang lang="java" >}}
Each lane represents a **thread**. Threads from a common pool are grouped together. You can expand the pool to view details for each thread.

Lanes on top are runtime activities that may impact performance.

For additional information about debugging slow p95 requests or timeouts using the timeline, see the blog post [Understanding Request Latency with Profiling][1].

[1]: https://www.datadoghq.com/blog/request-latency-profiling/
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}
See [prerequisites][1] to learn how to enable this feature for Python.

Each lane represents a **thread**. Threads from a common pool are grouped together. You can expand the pool to view details for each thread.

[1]: /profiler/connect_traces_and_profiles/#prerequisites
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

The thread ID is shown as `native-thread-id (ruby-object-id)` where the native thread ID is `Thread#native_thread_id` (when available) and the Ruby object ID is `Thread#object_id`.

**Note**: The Ruby VM or your operating system might reuse native thread IDs.

[1]: /profiler/connect_traces_and_profiles/#prerequisites
{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}
See [prerequisites][1] to learn how to enable this feature for Node.js.

There is one lane for the JavaScript **thread**.

There can also be lanes visualizing various kinds of **asynchronous activity** consisting of DNS requests and TCP connect operations. The number of lanes matches
the maximum concurrency of these activities so they can be visualized without overlaps.

Lanes on the top are garbage collector **runtime activities** that may add extra latency to your request.

[1]: /profiler/connect_traces_and_profiles/#prerequisites
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}
Each lane represents a **thread**. Threads with the same name are grouped together. You can expand a group to view details for each thread. Note that threads that are explicitely created by code are grouped under _Managed Threads_.

Lanes on top are runtime activities that may impact performance such as GC activity.

The thread ID is shown as `<unique-id> [#OS-thread-id]`.

**Note**: Your operating system might reuse thread IDs.

{{< /programming-lang >}}
{{< programming-lang lang="php" >}}
See [prerequisites][1] to learn how to enable this feature for PHP.

There is one lane for each PHP **thread** (in PHP NTS, this is only one lane as there is only one thread per process).
Fibers that run in this **thread** are represented in the same lane.

Lanes on the top are runtime activities that may add extra latency to your request, due to file compilation and garbage collection.

[1]: /profiler/connect_traces_and_profiles/#prerequisites
{{< /programming-lang >}}

{{< programming-lang lang="full_host" >}}
Timeline view is currently not supported for Full Host profiling
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Timeseries and Table

For each runtime, there is a broad set of metrics available, which you can see [listed by timeseries][3].

### Call graph

The call graph takes the same profiling data used in flame graphs, but displays each method just once, as a single node, with edges used to convey which methods have called each other.

Edge thickness is used to show time spent calling other methods, while color and size indicate self time.

{{< img src="profiler/profiling_viz-callgraph.png" alt="A call graph" >}}

### Single profile

By default, profiles are uploaded once a minute. Depending on the language, these processes are profiled between 15 and 60 seconds.

To view a specific profile, set the **Visualize as** option to **Profile List** and click an item in the list:

{{< img src="profiler/profiling_single-profile2.png" alt="Select a single profile" >}}

The header contains information associated with your profile, like the service that generated it, or the environment and code version associated with it.

Four tabs are below the profile header:

| Tab                    | Definition                                                                                                                                         |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Profiles               | A flame graph and summary table of the profile you are looking at. You can switch between profile types (for example, `CPU`, `Memory allocation`). |
| Insights               | A set of heuristics that suggest potential issues or areas of improvement in your code.                                                            |
| Metrics                | Profiler metrics coming from all profiles of the same service.                                                                                     |
| Runtime&nbsp;Info      | Runtime properties in supported languages, and profile tags.                                                                                       |
| Related&nbsp;Processes | Processes related to the profile.                                                                                                                  |

**Note**: In the upper right corner of each profile, there are options to:

- Compare this profile with others
- View repository commit
- View traces for the same process and time frame
- Download the profile
- Open the profile in full page

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/send_traces/#configure-your-environment
[2]: /tracing/glossary/#services
[3]: https://app.datadoghq.com/profiling/explorer?viz=timeseries
[4]: /profiler/profile_types/
[5]: /dashboards/widgets/profiling_flame_graph
[6]: /profiler/connect_traces_and_profiles/#span-execution-timeline-view
[7]: https://app.datadoghq.com/profiling/explorer?viz=thread_timeline
