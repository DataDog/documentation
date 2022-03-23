---
title: Investigate Slow Traces or Endpoints
kind: Documentation
further_reading:
    - link: 'tracing'
      tag: 'Documentation'
      text: 'APM Distributed Tracing'
    - link: '/tracing/profiler/enabling'
      tag: 'Documentation'
      text: 'Enable Continuous Profiler for Your Application.'
    - link: 'getting_started/profiler'
      tag: 'Documentation'
      text: 'Getting Started with Profiler'
---

If your application is showing performance problems in production, integrating distributed tracing with code stack trace benchmarks from profiling is a powerful way to identify the performance bottlenecks. Application processes that have both APM distributed tracing and continuous profiler enabled are automatically linked. 

You can move directly from span information to profiling data on the Code Hotspots tab, and find specific lines of code related to performance issues. Similarly, you can also debug slow and resource consuming endpoints directly in the Profiling UI.

## Identify code hotspots in slow traces

{{< img src="tracing/profiling/code_hotspots_tab.mp4" alt="Code Hotspots tab shows profiling information for a APM trace span" video=true >}}

### Prerequisites

{{< programming-lang-wrapper langs="java,python,go,ruby" >}}
{{< programming-lang lang="java" >}}
Code Hotspots identification is enabled by default when you [turn on profiling for your service][1]. For manually instrumented code, continuous profiler requires scope activation of spans:

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
- OpenJDK 11 or greater and tracing library version 0.65.0 or greater; or
- If on OpenJDK 8: 8u282 or greater and tracing library version 0.77.0 or greater.


[1]: /tracing/profiler/enabling/java
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Code Hotspots identification is enabled by default when you [turn on profiling for your service][1].

Requires tracing library version 0.44.0 or greater.


[1]: /tracing/profiler/enabling/python
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

Code Hotspots identification is enabled by default when you [turn on profiling for your service][1].

Requires tracing library version 0.49.0 or greater.


[1]: /tracing/profiler/enabling/ruby
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

Code Hotspots identification for Go is disabled by default. To enable it, [turn on profiling for your service][1] and ensure that:

- You are using [dd-trace-go][2] version 1.35.0 or later.
- [`DD_PROFILING_CODE_HOTSPOTS_COLLECTION_ENABLED=true`][3] is set in your environment, or the [`tracer.WithProfilerCodeHotspots(true)`][3] option is passed to [`tracer.Start()`][4]. This option is enabled by default in [dd-trace-go][2] versions 1.37.0+.
- [`profiler.CPUDuration(60*time.Second)`][5] and [`profiler.WithPeriod(60*time.Second)`][6] are passed to [`profiler.Start()`][7] to capture hotspot information for 100% of all spans. These values are set by default in [dd-trace-go][2] versions 1.37.0+.


**Warning:** Go 1.17 and below has several bugs (see [GH-35057][8], [GH-48577][9], [CL-369741][10], [CL-369983][11]) that can reduce the accuracy of this feature, especially when using a lot of CGO. They are scheduled to be fixed in the 1.18 release.

[1]: /tracing/profiler/enabling/go
[2]: https://github.com/DataDog/dd-trace-go/releases
[3]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#WithProfilerCodeHotspots
[4]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#Start
[5]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/profiler#CPUDuration
[6]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/profiler#WithPeriod
[7]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/profiler#Start
[8]: https://github.com/golang/go/issues/35057
[9]: https://github.com/golang/go/issues/48577
[10]: https://go-review.googlesource.com/c/go/+/369741/
[11]: https://go-review.googlesource.com/c/go/+/369983/
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Link from a span to profiling data

From the view of each trace, the Code Hotspots tab highlights profiling data scoped on the selected span.

The breakdown view on the left side is a list of types of time spent executing that span. Depending on the runtime and language, this list of types varies:

- **Method durations** shows the overall time taken by each method from your code.
- **CPU** shows the time taken executing CPU tasks.
- **Synchronization** shows the time taken waiting for a lock of a synchronized object.
- **Garbage collection** shows the time taken waiting for the garbage collector to execute.
- **VM operations** (Java only) shows the time taken waiting for VM operations that are not related to garbage collection (for example, heap dumps).
- **File I/O** shows the time taken waiting for a disk read/write operation to execute.
- **Socket I/O** shows the time taken waiting for a network read/write operation to execute.
- **Object wait** shows the time waiting for a notify call on an object.
- **Other** shows the time taken to execute the span that cannot be explained by profiling data.

Click on one of these types to see a corresponding list, ordered by time, of the methods that are taking time. Clicking on the plus `+` will expand the stack trace to that method **in reverse order**.

#### What does time spent in the 'Other' category mean?

It is not uncommon to have a small amount of **Other** unexplained time (less than 10%). Potential reasons for Other time include:

  - The span you selected isn't directly mapped to any execution. Profiling data is associated uniquely to spans when they are executing on a specific thread. For example, some spans are created and used uniquely as virtual containers of a series of related processing steps and never directly associated with any thread execution.
  - Your application process cannot access CPU resources to execute and is paused. There is no way for the profiler to know about competing resources from other processes or containers.
  - The application is locked in synchronization or in I/O events that are individually lower than 10ms: the Java profiler receives data for paused thread events (locks, I/O, parks) that are larger than 10ms. If you want to reduce that threshold, see [the documentation for changing setup defaults][1].
  - The span you selected is short. Profiling is a sampling mechanism that regularly looks at how your code behaves. There might not be enough representative data for spans shorter than 50ms
  - Missing instrumentation: Profiling breakdown requires that spans are associated with executing threads by activating these spans in the ScopeManager. Some custom instrumentations don't activate these spans properly, so you can't map them to executing threads. If this span comes from a custom integration, see the [Custom Instrumentation docs][2] for information on how to improve this.

### Viewing a profile from a trace

{{< img src="tracing/profiling/flamegraph_view.mp4" alt="Opening a view of the profile in a flame graph" video=true >}}

For each type from the breakdown, click **View profile** to view the same data as what is shown in the flame graph.
Click the **Span/Trace/Full profile** selector to define the scope of the data:

- **Span** scopes the profiling data to the previously selected span.
- **Trace** scopes the profiling data to all spans of the same service process of the previously selected span.
- **Full profile** scopes the data to 60 seconds of the whole service process that executed the previously selected span.

## Break down code performance by API endpoints

### Prerequisites

{{< programming-lang-wrapper langs="python,go,ruby" >}}
{{< programming-lang lang="python" >}}

Endpoint profiling is enabled by default when you turn on profiling for your [Python][1] service. It requires `dd-trace-py` version 0.54.0 or greater.
<p></p>

[1]: /tracing/profiler/enabling/python
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}
Endpoint profiling is disabled by default when you turn on profiling for your [Go][1] service. To enable it, you need to ensure that:

- You are using [dd-trace-go][2] version 1.35.0 or later.
- [`DD_PROFILING_ENDPOINT_COLLECTION_ENABLED=true`][3] is set in your environment, or the [`tracer.WithProfilerEndpoints(true)`][3] option is passed to [`tracer.Start()`][4]. This option is enabled by default in [dd-trace-go][2] versions 1.37.0+.

**Warning:** Go 1.17 and below has several bugs (see [GH-35057][5], [GH-48577][6], [CL-369741][7], [CL-369983][8]) that can reduce the accuracy of this feature, especially when using a lot of CGO. They are scheduled to be fixed in the 1.18 release.

[1]: /tracing/profiler/enabling/go
[2]: https://github.com/DataDog/dd-trace-go/releases
[3]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#WithProfilerEndpoints
[4]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#Start
[5]: https://github.com/golang/go/issues/35057
[6]: https://github.com/golang/go/issues/48577
[7]: https://go-review.googlesource.com/c/go/+/369741/
[8]: https://go-review.googlesource.com/c/go/+/369983/
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

Endpoint profiling is enabled by default when you turn on profiling for your [Ruby][1] service. It requires `dd-trace-rb` version 0.54.0 or greater.
<p></p>

[1]: /tracing/profiler/enabling/ruby
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Scope flame graphs by endpoints

Endpoint profiling allows you to scope your flame graphs by any endpoint of your web service to find endpoints that are slow, latency-heavy, and causing poor end-user experience. These endpoints can be tricky to debug and understand why they are slow. The slowness could be caused by an unintended large amount of resource consumption such as the endpoint consuming lots of CPU cycles. 

With endpoint profiling you can:

- Identify the bottleneck methods that are slowing down your endpoint’s overall response time.
- Isolate the top endpoints responsible for the consumption of valuable resources such as CPU and wall time. This is particularly helpful when you are generally trying to optimize your service for performance gains.
- Understand if third party code or runtime libraries are the reason for your endpoints being slow or resource-consumption heavy.

{{< img src="tracing/profiling/endpoint_agg_gif.mp4" alt="Troubleshooting a slow endpoint by using endpoint aggregation" video=true >}}


### Track the endpoints that consume the most resources

It is valuable to track top endpoints that are consuming valuable resources such as CPU and wall time. The list can help you identify if your endpoints have regressed or if you have newly introduced endpoints that are consuming drastically more resources, slowing down your overall service. 

{{< img src="tracing/profiling/endpoint_metric.mp4" alt="Graphing top endpoints in terms of resource consumption" video=true >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/profiler/profiler_troubleshooting#reduce-overhead-from-default-setup
[2]: /tracing/setup_overview/custom_instrumentation/java#manually-creating-a-new-span
