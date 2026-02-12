---
title: Investigate Slow Traces or Endpoints
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

You can move directly from span information to profiling data on the **Profiles** tab, and find specific lines of code related to performance issues. Similarly, you can also debug slow and resource consuming endpoints directly in the Profiling UI.

## Identify code performance issues in slow traces

### Prerequisites

{{< programming-lang-wrapper langs="java,python,go,ruby,nodejs,dotnet,php" >}}
{{< programming-lang lang="java" >}}
The Trace to Profiling integration is enabled by default when you [turn on profiling for your Java service][1] on Linux and macOS.
The feature is not available on Windows.

For manually instrumented code, continuous profiler requires scope activation of spans:

```java
final Span span = tracer.buildSpan("ServicehandlerSpan").start();
try (final Scope scope = tracer.activateSpan(span)) { // mandatory for Datadog continuous profiler to link with span
    // worker thread impl
  } finally {
    // Step 3: Finish Span when work is complete
    span.finish();
  }

```

<div class="alert alert-danger">
It's highly recommended to <a href="/profiler/enabling/java/?tab=datadog#requirements">use the Datadog profiler</a> instead of Java Flight Recorder (JFR).
</div>

[1]: /profiler/enabling/java
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

The Trace to Profiling integration is enabled when you:
- Upgrade `dd-trace-py` to version 2.12.0+, 2.11.4+, or 2.10.7+.
- Set environment variable `DD_PROFILING_TIMELINE_ENABLED` to `true`

[1]: /profiler/enabling/python
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

The Trace to Profiling integration is enabled by default when you [turn on profiling for your Ruby service][1] and update `dd-trace-rb` to 1.22.0+.

[1]: /profiler/enabling/ruby
{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

The Trace to Profiling integration is enabled by default when you [turn on profiling for your Node.js service][1] on Linux and macOS. The feature is not available on Windows.

Requires `dd-trace-js` 5.11.0+, 4.35.0+, and 3.56.0+.

[1]: /profiler/enabling/nodejs
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

The Trace to Profiling integration is enabled when you [turn on profiling for your Go service][1] and set the environment variables below:

```go
os.Setenv("DD_PROFILING_EXECUTION_TRACE_ENABLED", "true")
os.Setenv("DD_PROFILING_EXECUTION_TRACE_PERIOD", "15m")
```

Setting these variables will record up to 1 minute (or 5 MiB) of execution tracing data [every 15 minutes][2].

You can find this data:

- In the [Profile List][3] by adding `go_execution_traced:yes` to your search query. Click on a profile to view the [Profile Timeline][4]. To go even deeper, download the profile and use `go tool trace` or [gotraceui][5] to view the contained `go.trace` files.
- In the [Trace Explorer][6] by adding `@go_execution_traced:yes` (note the `@`) to your search query. Click on a span and then select the **Profiles** tab to view the [Span Timeline](#span-execution-timeline-view).

While recording execution traces, your application may observe an increase in CPU usage similar to a garbage collection. Although this should not have a significant impact for most applications, Go 1.21 includes [patches][7] to eliminate this overhead.

This capability requires `dd-trace-go` version 1.37.0+ (1.52.0+ for timeline view) and works best with Go version 1.18 or later (1.21 or later for timeline view).

[1]: /profiler/enabling/go
[2]: https://github.com/DataDog/dd-trace-go/issues/2099
[3]: /profiler/profile_visualizations/#single-profile
[4]: /profiler/profile_visualizations/#timeline-view
[5]: https://github.com/dominikh/gotraceui
[6]: /tracing/trace_explorer/
[7]: https://blog.felixge.de/waiting-for-go1-21-execution-tracing-with-less-than-one-percent-overhead/
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

The Trace to Profiling integration is enabled by default when you [turn on profiling for your .NET service][1].

This capability requires `dd-trace-dotnet` version 2.30.0+.

[1]: /profiler/enabling/dotnet
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

The Trace to Profiling integration is enabled when you [turn on profiling for your PHP service][1] and meet the following criteria:
- You are on `dd-trace-php` version 0.98+
- You set the environment variable `DD_PROFILING_TIMELINE_ENABLED=1` or INI setting `datadog.profiling.timeline_enabled=1`

[1]: /profiler/enabling/php
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Span execution timeline view

{{< img src="profiler/profiling_automated_analysis_individual.png" alt="Profiles tab has a timeline view that breaks down threads and execution over time" >}}

The timeline view surfaces time-based patterns and work distribution over the period of the span. It provides a visual breakdown of how threads contributed to the request over time.

With the span timeline view, you can:

- Isolate time-consuming methods
- Sort out complex interactions between threads
- Surface runtime activity that impacted the request
- Leverage [Automated Analysis][1] to highlight performance issues directly in the view, such as oversized thread pools or GC contention

[1]: /profiler/automated_analysis/

Depending on the runtime and language, the lanes vary:

{{< programming-lang-wrapper langs="java,python,go,ruby,nodejs,dotnet,php" >}}
{{< programming-lang lang="java" >}}
Each lane represents a **thread**. Threads from a common pool are grouped together. You can expand the pool to view details for each thread.

Lanes on top are runtime activities that may add extra latency. They can be unrelated to the request itself.

For additional information about debugging slow p95 requests or timeouts using the timeline, see the blog post [Understanding Request Latency with Profiling][1].

[1]: https://www.datadoghq.com/blog/request-latency-profiling/
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}
See [prerequisites](#prerequisites) to learn how to enable this feature for Python.

Each lane represents a **thread**. Threads from a common pool are grouped together. You can expand the pool to view details for each thread.
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
Each lane represents a **thread**. Threads with the same name are grouped together. You can expand a group to view details for each thread. Note that threads that are explicitly created by code are grouped under _Managed Threads_.

Lanes on top are runtime activities that may add extra latency. They can be unrelated to the request itself.
{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}
See [prerequisites](#prerequisites) to learn how to enable this feature for Node.js.

There is one lane for the JavaScript **thread**.

Lanes on the top are garbage collector **runtime activities** that may add extra latency to your request.
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}
See [prerequisites](#prerequisites) to learn how to enable this feature for PHP.

There is one lane for each PHP **thread** (in PHP NTS, this is only one lane). Fibers that run in this **thread** are represented in the same lane.

Lanes on the top are runtime activities that may add extra latency to your request, due to file compilation and garbage collection.
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Viewing a profile from a trace

{{< img src="profiler/view_profile_from_trace-2.png" alt="Opening a view of the profile in a flame graph" >}}

From the timeline, click **Open in Profiling** to see the same data on a new page. From there, you can change the visualization to a flame graph.
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

[1]: /profiler/enabling/ruby
{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

Endpoint profiling is enabled by default when you [turn on profiling for your Node.js service][1] on Linux and macOS. The feature is not available on Windows.

Requires `dd-trace-js` version 5.0.0+, 4.24.0+ or 3.45.0+.

[1]: /profiler/enabling/nodejs
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

{{< img src="profiler/endpoint_agg.png" alt="Troubleshooting a slow endpoint by using endpoint aggregation" >}}

### Surface code that impacted your production latency

In the APM Service page, use the information in the **Profiling** tab to correlate a latency or throughput change to a code performance change.

In this example, you can see how latency is linked to a lock contention increase on `/GET train` that is caused by the following line of code:

```java
Thread.sleep(DELAY_BY.minus(elapsed).toMillis());
```

{{< img src="profiler/apm_service_page_pivot_to_contention_comparison.mp4" alt="Pivoting from APM service page to Profiling comparison page to find the line of code causing latency" video=true >}}

### Track endpoints that consume the most resources

It is valuable to track top endpoints that are consuming valuable resources such as CPU and wall time. The list can help you identify if your endpoints have regressed or if you have newly introduced endpoints that are consuming drastically more resources, slowing down your overall service.

The following image shows that `GET /store_history` is periodically impacting this service by consuming 20% of its CPU and 50% of its allocated memory:

{{< img src="profiler/apm_endpoint_metric.png" alt="Graphing top endpoints in terms of resource consumption" >}}

### Track average resource consumption per request

Select `Per endpoint call` to see behavior changes even as traffic shifts over time. This is useful for progressive rollout sanity checks or analyzing daily traffic patterns.

The following example shows that CPU per request increased for `/GET train`:

{{< img src="profiler/endpoint_per_request2.mp4" alt="Troubleshooting a endpoint that started using more resource per request" video="true" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

