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

{{< programming-lang-wrapper langs="java,python,go,ruby,dotnet,php" >}}
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

Requires:
- OpenJDK 11+ and `dd-trace-java` version 0.65.0+; or
- OpenJDK 8: 8u282+ and `dd-trace-java` version 0.77.0+.

[1]: /profiler/enabling/java
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Code Hotspots identification is enabled by default when you [turn on profiling for your Python service][1].

Requires `dd-trace-py` version 0.44.0+.

[1]: /profiler/enabling/python
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

Code Hotspots identification is enabled by default when you [turn on profiling for your Ruby service][1].

Requires `dd-trace-rb` version 0.49.0+.

[1]: /profiler/enabling/ruby
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

Code Hotspots identification is enabled by default [turn on profiling for your Go service][1].

Require `dd-trace-go` version 1.37.0+.

**Note:** This feature works best with Go version 1.18 or newer. Go 1.17 and below have several bugs (see [GH-35057][2], [GH-48577][3], [CL-369741][4], and [CL-369983][5]) that can reduce the accuracy of this feature, especially when using a lot of CGO.

[1]: /profiler/enabling/go
[2]: https://github.com/golang/go/issues/35057
[3]: https://github.com/golang/go/issues/48577
[4]: https://go-review.googlesource.com/c/go/+/369741/
[5]: https://go-review.googlesource.com/c/go/+/369983/
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

Code Hotspots identification is enabled by default when you [turn on profiling for your .NET service][1].

Requires `dd-trace-dotnet` version 2.7.0+.

[1]: /profiler/enabling/dotnet
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

Code Hotspots identification is enabled by default when you [turn on profiling for your PHP service][1].

Requires `dd-trace-php` version 0.71+.

[1]: /profiler/enabling/php
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Link from a span to profiling data

From the view of each trace, the Code Hotspots tab highlights profiling data scoped on the selected spans.

The values on the left side is the time spent in that method call during the selected span. Depending on the runtime and language, this list of types varies:

- **Method durations** shows the overall time taken by each method from your code.
- **CPU** shows the time taken executing CPU tasks.
- **Synchronization** shows the time spent waiting on monitors, the time a thread is sleeping and the time it is parked.
- **VM operations** (Java only) shows the time taken waiting for VM operations that are not related to garbage collection (for example, heap dumps).
- **File I/O** shows the time taken waiting for a disk read/write operation to execute.
- **Socket I/O** shows the time taken waiting for a network read/write operation to execute.
- **Monitor enter** shows the time a thread is blocked on a lock.
- **Uncategorized** shows the time taken to execute the span that cannot be placed into one of the above categories.

Click the plus icon `+` to expand the stack trace to that method **in reverse order**. Hover over the value to see the percentage of time explained by category.

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

{{< programming-lang-wrapper langs="java,python,go,ruby,dotnet,php" >}}
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

Requires `dd-trace-go` version 1.37.0+.

**Note:** This feature works best with Go version 1.18 or newer. Go 1.17 and below have several bugs (see [GH-35057][2], [GH-48577][3], [CL-369741][4], and [CL-369983][5]) that can reduce the accuracy of this feature, especially when using a lot of CGO.

[1]: /profiler/enabling/go
[2]: https://github.com/golang/go/issues/35057
[3]: https://github.com/golang/go/issues/48577
[4]: https://go-review.googlesource.com/c/go/+/369741/
[5]: https://go-review.googlesource.com/c/go/+/369983/
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

Endpoint profiling is enabled by default when you [turn on profiling for your Ruby service][1].

Requires `dd-trace-rb` version 0.54.0+.

[1]: /profiler/enabling/ruby
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
- Isolate the top endpoints responsible for the consumption of valuable resources such as CPU, memory or exceptions. This is particularly helpful when you are generally trying to optimize your service for performance gains.
- Understand if third-party code or runtime libraries are the reason for your endpoints being slow or resource-consumption heavy.

{{< img src="profiler/endpoint_agg.mp4" alt="Troubleshooting a slow endpoint by using endpoint aggregation" video=true >}}

### Track the endpoints that consume the most resources

It is valuable to track top endpoints that are consuming valuable resources such as CPU and wall time. The list can help you identify if your endpoints have regressed or if you have newly introduced endpoints that are consuming drastically more resources, slowing down your overall service.

Here, you can see that `GET /store_history` is periodically impacting this service by consuming 20% of its CPU:

{{< img src="profiler/endpoint_metric.png" alt="Graphing top endpoints in terms of resource consumption" >}}

### Track average resource consumption per request

Select `Per endpoint call` to see behavior changes even as traffic shifts over time. This is useful for progressive rollout sanity checks or analyzing daily traffic patterns

Here, you can see that CPU per request doubled for `/GET train`:

{{< img src="profiler/endpoint_per_request.mp4" alt="Troubleshooting a endpoint that started using more resource per request" video=true >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /profiler/profiler_troubleshooting#reduce-overhead-from-default-setup
[2]: /tracing/trace_collection/custom_instrumentation/java#manually-creating-a-new-span
