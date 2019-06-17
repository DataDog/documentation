---
title: Trace Sampling and Storage
kind: documentation
aliases:
    - /tracing/faq/traces-sampling-and-storage/
    - /tracing/faq/how-long-is-tracing-data-stored/
    - /tracing/getting_further/trace_sampling_and_storage
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

Trace Sampling is applicable for high-volume web-scale applications, where a sampled proportion of traces is kept in Datadog based on the following rules.

Note that Statistics (requests, errors, latency, etc.), on the other hand, are calculated based on the full volume of traces at the Agent level, and are therefore always accurate.


### Statistics (Requests, Errors, Latencies etc.)

Datadog APM computes following aggregate statistics over all the traces instrumented, regardless of sampling:

* Total requests and requests per second
* Total errors and errors per second
* Latency
* Breakdown of time spent by service/type
* [Apdex score][1] (web services only)

{{< img src="tracing/product_specs/trace_sampling_storage/sampling_stats.png" alt="Aggregate statistics are generated on un-sampled data." responsive="true" style="width:90%;">}}

### Goal of Sampling

The goal of sampling is to keep traces that matter the most. That is -
* Keep distributed traces
* Keep Low QPS Services
* Keep representative variety set of traces


{{< img src="tracing/product_specs/trace_sampling_storage/sampling_trace.png" alt="Individual traces are sampled at the Agent, server, and client level." responsive="true" style="width:90%;">}}

### Sampling Rules

For the lifecycle of a trace, decisions are made at Tracing Client, Agent, and Backend level in the following order.

1. Tracing Client - The tracing client adds a context attribute `sampling.priority` to traces, allowing a single trace to be propagated in a distributed architecture across language agnostic request headers. `Sampling-priority` attribute is a hint to the agent to do its best to prioritize the trace or drop unimportant ones. 

| Value                  | Type                        | Action                                                                                               |
| :--------------------- | :----------------           | :----------                                                                                          |
| **MANUAL_DROP**                 | User input                  | The Agent drops the trace.                                                                           |
| **AUTO_DROP**                  | Automatic sampling decision | The Agent drops the trace.                                                                           |
| **AUTO_KEEP**                  | Automatic sampling decision | The Agent keeps the trace.                                                                           |
| **MANUAL_KEEP**                  | User input                  | The Agent keeps the trace, and the backend will only apply sampling if above maximum volume allowed. |

Traces are automatically assigned a priority of AUTO_DROP or AUTO_KEEP, with a proportion ensuring that the Agent won’t have to sample more than it is allowed. Users can [manually adjust](link_to_manual_section) this attribute to give priority to specific types of traces, or entirely drop uninteresting ones.

2. Trace Agent (Host or Container Level)- The agent receives traces from various tracing clients and filters requests based on two rules -
* Ensure traces are kept across variety of traces. (across services, resources, HTTP status codes, errors)
* Ensure traces are kept for low volume resources (web endpoints, DB queries).

The agent computes a `signature` for every trace reported, based on its services, resources, errors, etc.. Traces of the same signature are considered similar. For example, a signature could be:

* `env=prod`, `my_web_service`, `is_error=true`, `resource=/login`
* `env=staging`, `my_database_service`, `is_error=false`, `query=SELECT...`

A proportion of traces with each signature is then kept, so you get full visibility into all the different kinds of traces happening in your system. This method ensures traces for resources with low volumes are still kept.

Moreover, the agent provides a service based rate to the prioritized traces from tracing client to ensure traces from low QPS services are prioritized to be kept.

Users can manually drop entire uninteresting resource endpoints at agent level by using [resource filtering](https://docs.datadoghq.com/security/tracing/#resource-filtering).


3. DD Backend/Server - The server receives traces from various agents running on hosts and applies sampling to ensure representation from every reporting agent. It does so by keeping traces on the basis of the signature marked by agent.

## Manually Control Trace Priority

You can manually control `sampling priority` attribute tag to manually keep a trace (critical transaction, debug mode, etc.) or drop a trace (health checks, static assets, etc).


Note that trace priority should be manually controlled only before any context propagation. If this happens after the propagation of a context, the system can’t ensure that the entire trace is kept across services. Manually controlled trace priority is set at tracing client location, the trace can still be dropped by agent or server location based on the [sampling rules](link_to_sampling_rules).

## Trace Storage

Individual traces are stored for up to 6 months. To determine how long a particular trace will be stored, the Agent makes a sampling decision early in the trace's lifetime. In Datadog backend, sampled traces are retained according to time buckets:

| Retention bucket       |  % of stream kept |
| :--------------------- | :---------------- |
| 6 hours                |              100% |
| Current day (UTC time) |               25% |
| 6 days                 |               10% |
| 6 months               |                1% |

That is to say, on a given day you would see in the UI:

* **100%** of sampled traces from the last six hours
* **25%** of those from the previous hours of the current calendar day (starting at `00:00 UTC`)
* **10%** from the previous six calendar days
* **1%** of those from the previous six months (starting from the first day of the month six months ago)
* **0%** of traces older than six months

For example, at `9:00am UTC Wed, 12/20` you would see:

* **100%** of traces sampled on `Wed 12/20 03:00 - 09:00`
* **25%** of traces sampled on `Wed 12/20 00:00` - `Wed 12/20 02:59`
* **10%** of traces sampled on `Thurs 12/14 00:00` - `Tue 12/19 23:59`
* **1%** of traces sampled on `7/1 00:00` - `12/13 23:59`
* **0%** of traces before `7/1 00:00`

Once a trace has been viewed by opening a full page, it continues to be available by using its trace ID in the URL: `https://app.datadoghq.com/apm/trace/<TRACE_ID>`. This is true even if it "expires" from the UI. This behavior is independent of the UI retention time buckets.

{{< img src="tracing/guide/trace_sampling_and_storage/trace_id.png" alt="Trace ID" responsive="true" >}}



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
