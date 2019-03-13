---
title: Trace Sampling and Storage
kind: documentation
aliases:
    - /tracing/faq/traces-sampling-and-storage/
    - /tracing/faq/how-long-is-tracing-data-stored/
further_reading:
- link: "tracing/setup/"
  tag: "Documentation"
  text: "Learn how to setup APM tracing with your application"
- link: "tracing/visualization/services_list/"
  tag: "Documentation"
  text: "Discover the list of services reporting to Datadog"
- link: "tracing/visualization/service"
  tag: "Documentation"
  text: "Learn more about services in Datadog"
- link: "tracing/visualization/resource"
  tag: "Documentation"
  text: "Dive into your resource performance and traces"
- link: "tracing/visualization/trace"
  tag: "Documentation"
  text: "Understand how to read a Datadog Trace"
---

## Trace sampling

Due to the extremely high volume of traces in a web-scale application, sampling is applied to traces in Datadog.
**Statistics (requests, errors, latency, etc.) are calculated based on the full volume of traces at the Agent level, and are therefore always accurate**.

### Statistics (Requests, Errors, Latencies etc.)

Datadog APM computes aggregate statistics over all the traces instrumented, regardless of sampling:

* Total requests and requests per second
* Total errors and errors per second
* Latency
* Breakdown of time spent by service/type
* [Apdex score][1] (web services only)

{{< img src="tracing/product_specs/trace_sampling_storage/sampling_stats.png" alt="Aggregate statistics are generated on un-sampled data." responsive="true" style="width:90%;">}}

### Traces

To ensure keeping a representative sample set of traces, Datadog combines multiple sampling techniques, at various locations:

* **Agent sampling**: Reduces the resources and network used by the Agent for sending traces to the backend. Configurable, default to a maximum of 10 traces per second.

* **Server sampling**: Looks at all reporting Agents, keeping samples representative of the overall infrastructure. Allows a volume up to 60 traces per minute per host.

* **Client sampling**: Allows reduction of instrumentation overhead by only instrumenting a configurable percentage of the transactions. By default, it is disabled.

{{< img src="tracing/product_specs/trace_sampling_storage/sampling_trace.png" alt="Individual traces are sampled at the Agent, server, and client level." responsive="true" style="width:90%;">}}

### Signature Sampling

Signature Sampling ensures a sampling of a variety of [traces][2] (errors, successes) for each [resource][3] (endpoint, database query).

Datadog computes a *signature* for every trace reported, based on its services, resources, errors, etc.. Traces of the same signature are considered similar. For example, a signature could be:

* `env=prod`, `my_web_service`, `is_error=true`, `resource=/login`
* `env=staging`, `my_database_service`, `is_error=false`, `query=SELECT...`

A proportion of traces with each signature is then kept, so you get full visibility into all the different kinds of transactions happening in your system. This method ensures traces for resources with low volumes are still kept.

Both the [Datadog Agent][4] and backend apply Signature Sampling to limit network consumption and the total volume of stored traces while still making a representative set of traces available to you.


### Client rate sampling

It is possible to disable the instrumentation for a percentage of transactions. Datadog Tracers are performant and can run with a minimal cost with thousands of requests per second, however client rate sampling can be used to further reduce the instrumentation footprint. In this case, no trace will be generated at all, and Datadog estimates aggregate statistics (requests per second, error rate, etc.). An example of this in Python can be found here: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#client-sampling.

## Trace storage

Individual traces are stored for up to 6 months. To determine how long a particular trace will be stored, the Agent makes a sampling decision early in the trace's lifetime. In Datadog backend, sampled traces are retained according to time buckets:

| Retention bucket       |  % of stream kept |
| :--------------------- | :---------------- |
| 6 hours                |              100% |
| Current day (UTC time) |               25% |
| 6 days                 |               10% |
| 6 months               |                1% |

That is to say, on a given day you would see in the UI:

* **100%** of sampled traces from the last 6 hours
* **25%** of those from the previous hours of the current calendar day (starting at `00:00 UTC`)
* **10%** from the previous six calendar days
* **1%** of those from the previous six months (starting from the first day of the month six months ago)
* **0%** of traces older than 6 months

For example, at `9:00am UTC Wed, 12/20` you would see:

* **100%** of traces sampled on `Wed 12/20 03:00 - 09:00`
* **25%** of traces sampled on `Wed 12/20 00:00` - `Wed 12/20 02:59`
* **10%** of traces sampled on `Thurs 12/14 00:00` - `Tue 12/19 23:59`
* **1%** of traces sampled on `7/1 00:00` - `12/13 23:59`
* **0%** of traces before `7/1 00:00`

Once a trace has been viewed, it continues to be available by using its trace ID in the URL: `https://app.datadoghq.com/apm/trace/<trace_id>` This is true even if it "expires" from the UI. This behavior is independent of the UI retention time buckets.

{{< img src="tracing/trace_id.png" alt="Trace ID" responsive="true" >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/faq/how-to-configure-an-apdex-for-your-traces-with-datadog-apm
[2]: /tracing/visualization/trace
[3]: /tracing/visualization/resource
[4]: /agent
[5]: http://www.rubydoc.info/gems/ddtrace/#Priority_sampling
[6]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#priority-sampling
[7]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer/#Span.SetSamplingPriority
[8]: /tracing/languages/java/#sampling-distributed-tracing
