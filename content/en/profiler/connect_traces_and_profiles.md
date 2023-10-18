---
title: Investigate Slow Traces or Endpoints
kind: Documentation
further_reading:
    - link: 'tracing'
      tag: 'Documentation'
      text: 'APM Distributed Tracing'
    - link: '/profiler/enabling'
      tag: 'Documentation'
      text: 'Enable Continuous Profiler for Your Application'
    - link: 'getting_started/profiler'
      tag: 'Documentation'
      text: 'Getting Started with Profiler'
aliases:
  - /tracing/profiler/connect_traces_and_profiles/
---

If your application is showing performance problems in production, integrating distributed tracing with code stack trace benchmarks from profiling is a powerful way to identify the performance bottlenecks. Application processes that have both APM distributed tracing and continuous profiler enabled are automatically linked.

You can move directly from span information to profiling data on the Code Hotspots tab, and find specific lines of code related to performance issues. Similarly, you can also debug slow and resource consuming endpoints directly in the Profiling UI.

## Identify code hotspots in slow traces

{{< img src="profiler/code_hotspots_tab-2.mp4" alt="Code Hotspots tab shows profiling information for a APM trace span" video=true >}}

### Prerequisites

{{< programming-lang-wrapper langs="java,python,go,ruby,nodejs,dotnet,php" >}}
{{< programming-lang lang="java" >}}
Code Hotspots identification is enabled by default when you [turn on profiling for your Java service][1]. For manually instrumented code, continuous profiler requires scope activation of spans:

```java
final Span span = tracer.buildSpan("ServicehandlerSpan").start();
try (final Scope scope = tracer.activateSpan(span)) { // mandatory for Datadog continuous profiler to link with span
    // worker thread impl
  } finally {
    // Step 3: Finish Span when work is complete
    span.finish();
  }

```

<div class="alert alert-warning">
It's highly recommended to <a href="/profiler/enabling/java/?tab=datadog#requirements">use the Datadog profiler</a> instead of Java Flight Recorder (JFR).
</div>

[1]: /profiler/enabling/java
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Code Hotspots identification is enabled by default when you [turn on profiling for your Python service][1].

Requires `dd-trace-py` version 0.44.0+.

[1]: /profiler/enabling/python
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

Code Hotspots identification is enabled by default when you [turn on profiling for your Ruby service][1].

To enable the new [timeline feature](#span-execution-timeline-view) (beta):
- upgrade to `dd-trace-rb` 1.15+
- set `DD_PROFILING_EXPERIMENTAL_TIMELINE_ENABLED=true`

[1]: /profiler/enabling/ruby
{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

Code Hotspots (beta) identification is NOT enabled by default when you [turn on profiling for your Node.js service][1]. Enable it by setting this additional environment variable:

```shell
export DD_PROFILING_CODEHOTSPOTS_ENABLED=true
```

Requires `dd-trace-js` version 4.17.0+ or 3.38.0+.

[1]: /profiler/enabling/nodejs
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

Code Hotspots identification is enabled by default when you [turn on profiling for your Go service][1].

To enable the new [timeline feature](#span-execution-timeline-view) (beta), set the environment variables below:

```go
os.Setenv("DD_PROFILING_EXECUTION_TRACE_ENABLED", "true")
os.Setenv("DD_PROFILING_EXECUTION_TRACE_PERIOD", "15m")
```

Setting these variables will record up to 1 minute (or 5 MiB) of execution tracing data [every 15 minutes][2].

You can find this data:

- In the [Profile List][3] by adding `go_execution_traced:yes` to your search query. Click on a profile to view the [Profile Timeline][4]. To go even deeper, download the profile and use `go tool trace` or [gotraceui][5] to view the contained `go.trace` files.
- In the [Trace Explorer][6] by adding `@go_execution_traced:yes` (note the `@`) to your search query. Click on a span and then select the `Code Hotspots` tab to view the [Span Timeline](#span-execution-timeline-view).

While recording execution traces, your application may observe an increase in CPU usage similar to a garbage collection. Although this should not have a significant impact for most applications, Go 1.21 includes [patches][7] to eliminate this overhead.

This capability requires `dd-trace-go` version 1.37.0+ (1.52.0+ for timeline beta) and works best with Go version 1.18 or later (1.21 or later for timeline beta).

[1]: /profiler/enabling/go
[2]: https://github.com/DataDog/dd-trace-go/issues/2099
[3]: /profiler/profile_visualizations/#single-profile
[4]: /profiler/profile_visualizations/#timeline-view
[5]: https://github.com/dominikh/gotraceui
[6]: /tracing/trace_explorer/
[7]: https://blog.felixge.de/waiting-for-go1-21-execution-tracing-with-less-than-one-percent-overhead/
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

Code Hotspots identification is enabled by default when you [turn on profiling for your .NET service][1].

This capability requires `dd-trace-dotnet` version 2.30.0+.

[1]: /profiler/enabling/dotnet
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

Code Hotspots identification is enabled by default when you [turn on profiling for your PHP service][1].

Requires `dd-trace-php` version 0.71+.

[1]: /profiler/enabling/php
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Span execution breakdown

From the view of each trace, the Code Hotspots tab highlights profiling data scoped on the selected spans.

The values on the left side represent the time spent in that method call during the selected span. Depending on the runtime and language, the categories vary:
{{< programming-lang-wrapper langs="java,python,go,ruby,dotnet,php" >}}
{{< programming-lang lang="java" >}}
- **CPU** shows the time taken executing CPU tasks.
- **Synchronization** shows the time spent waiting on monitors, the time a thread is sleeping and the time it is parked.
- **VM operations** shows the time taken waiting for VM operations (for example, garbage collections, compilation, safepoints, and heap dumps).
- **File I/O** shows the time taken waiting for a disk read/write operation to execute.
- **Socket I/O** shows the time taken waiting for a network read/write operation to execute.
- **Monitor enter** shows the time a thread is blocked on a lock.
- **Uncategorized** shows the time taken to execute the span that cannot be placed into one of the previous categories.
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}
- **CPU** shows the time taken executing CPU tasks.
- **Lock Wait** shows the time a thread is blocked on a lock.
- **Uncategorized** shows the time taken to execute the span that cannot be placed into one of the previous categories.
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}
- **CPU** shows the time taken executing CPU tasks.
- **Uncategorized** shows the time taken to execute the span that is not CPU execution.
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}
- **CPU** shows the time taken executing CPU tasks.
- **Off-CPU** shows the time taken to execute the span that is not CPU execution.
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}
- **CPU** shows the time taken executing CPU tasks.
- **Lock Wait** shows the time a thread is blocked on a lock.
- **Uncategorized** shows the time taken to execute the span that cannot be placed into one of the previous categories.
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}
- **CPU** shows the time taken executing CPU tasks.
- **Uncategorized** shows the time taken to execute the span that is not CPU execution.
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

Click the plus icon `+` to expand the stack trace to that method **in reverse order**. Hover over the value to see the percentage of time explained by category.

### Span execution timeline view

{{< img src="profiler/code_hotspots_tab-timeline.mp4" alt="Code Hotspots tab has a timeline view that breakdown execution over time and threads" video=true >}}

The **Timeline** view surfaces time-based patterns and work distribution over the period of the span.

With the span **Timeline** view, you can:

- Isolate time-consuming methods.
- Sort out complex interactions between threads.
- Surface runtime activity that impacted the request.

Depending on the runtime and language, the lanes vary:

{{< programming-lang-wrapper langs="java,go,ruby,dotnet" >}}
{{< programming-lang lang="java" >}}
Each lane represents a **thread**. Threads from a common pool are grouped together. You can expand the pool to view details for each thread.

Lanes on top are runtime activities that may add extra latency. They can be unrelated to the request itself.

For additional information about debugging slow p95 requests or timeouts using the timeline, see the blog post [Understanding Request Latency with Profiling][1].

[1]: https://richardstartin.github.io/posts/wallclock-profiler
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}
Each lane represents a **goroutine**. This includes the goroutine that started the selected span, as well as any goroutines it created and their descendants. Goroutines created by the same `go` statement are grouped together. You can expand the group to view details for each goroutine.

Lanes on top are runtime activities that may add extra latency. They can be unrelated to the request itself.

For additional information about debugging slow p95 requests or timeouts using the timeline, see the blog post [Debug Go Request Latency with Datadog's Profiling Timeline][1].

[1]: https://blog.felixge.de/debug-go-request-latency-with-datadogs-profiling-timeline/
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}
See [prerequisites](#prerequisites) to learn how to enable this feature for Ruby.

Each lane represents a **thread**. Threads from a common pool are grouped together. You can expand the pool to view details for each thread.
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}
Each lane represents a **thread**. Threads from a common pool are grouped together. You can expand the pool to view details for each thread.

Lanes on top are runtime activities that may add extra latency. They can be unrelated to the request itself.
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Viewing a profile from a trace

{{< img src="profiler/flamegraph_view-1.mp4" alt="Opening a view of the profile in a flame graph" video=true >}}

For each type from the breakdown, click **View In Full Page** to see the same data opened up in a in a new page . From there you can change visualization to the flame graph.
Click the **Focus On** selector to define the scope of the data:

- **Span & Children** scopes the profiling data to the selected span and all descendant spans in the same service.
- **Span only** scopes the profiling data to the previously selected span.
- **Span time period** scopes the profiling data to all threads during the time period the span was active.
- **Full profile** scopes the data to 60 seconds of the whole service process that executed the previously selected span.

## Break down code performance by API endpoints

### Prerequisites

{{< programming-lang-wrapper langs="java,python,go,ruby,nodejs,dotnet,php" >}}
{{< programming-lang lang="java" >}}
Endpoint profiling is enabled by default when you [turn on profiling for your Java service][1].

Requires [using the Datadog profiler][2]. JFR is not supported.

[1]: /profiler/enabling/java
[2]: /profiler/enabling/java/?tab=datadog#requirements
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Endpoint profiling is enabled by default when you [turn on profiling for your Python service][1].

Requires `dd-trace-py` version 0.54.0+.

[1]: /profiler/enabling/python
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}
Endpoint profiling is enabled by default when you [turn on profiling for your Go service][1].

Requires `dd-trace-go` version 1.37.0+ and works best with Go version 1.18 or newer.

[1]: /profiler/enabling/go
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

Endpoint profiling is enabled by default when you [turn on profiling for your Ruby service][1].

Requires `dd-trace-rb` version 0.54.0+.

[1]: /profiler/enabling/ruby
{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

Endpoint profiling (beta) is NOT enabled by default when you [turn on profiling for your Node.js service][1]. Enable it by setting this additional environment variables:

```shell
export DD_PROFILING_ENDPOINT_COLLECTION_ENABLED=true
```

Setting this environment variable also turns on [Code Hotspots (beta)][2] which is needed for endpoint profiling.

Requires `dd-trace-js` version 4.17.0+ or 3.38.0+.

[1]: /profiler/enabling/nodejs
[2]: /profiler/connect_traces_and_profiles/?code-lang=nodejs#identify-code-hotspots-in-slow-traces
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

Endpoint profiling is enabled by default when you [turn on profiling for your .NET service][1].

Requires `dd-trace-dotnet` version 2.15.0+.

[1]: /profiler/enabling/dotnet
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

Endpoint profiling is enabled by default when you [turn on profiling for your PHP service][1].

Requires `dd-trace-php` version 0.79.0+.

[1]: /profiler/enabling/php
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Endpoint profiling

Endpoint profiling allows you to scope your flame graphs by any endpoint of your web service to find endpoints that are slow, latency-heavy, and causing poor end-user experience. These endpoints can be tricky to debug and understand why they are slow. The slowness could be caused by an unintended large amount of resource consumption such as the endpoint consuming lots of CPU cycles.

With endpoint profiling you can:

- Identify the bottleneck methods that are slowing down your endpoint's overall response time.
- Isolate the top endpoints responsible for the consumption of valuable resources such as CPU, memory, or exceptions. This is particularly helpful when you are generally trying to optimize your service for performance gains.
- Understand if third-party code or runtime libraries are the reason for your endpoints being slow or resource-consumption heavy.

{{< img src="profiler/endpoint_agg.mp4" alt="Troubleshooting a slow endpoint by using endpoint aggregation" video=true >}}

### Track the endpoints that consume the most resources

It is valuable to track top endpoints that are consuming valuable resources such as CPU and wall time. The list can help you identify if your endpoints have regressed or if you have newly introduced endpoints that are consuming drastically more resources, slowing down your overall service.

The following image shows that `GET /store_history` is periodically impacting this service by consuming 20% of its CPU:

{{< img src="profiler/endpoint_metric.png" alt="Graphing top endpoints in terms of resource consumption" >}}

### Track average resource consumption per request

Select `Per endpoint call` to see behavior changes even as traffic shifts over time. This is useful for progressive rollout sanity checks or analyzing daily traffic patterns.

The following video shows that CPU per request doubled for `/GET train`:

{{< img src="profiler/endpoint_per_request.mp4" alt="Troubleshooting a endpoint that started using more resource per request" video=true >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

