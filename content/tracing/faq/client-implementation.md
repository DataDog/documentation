---
title: Client implementation
kind: faq
private: true
---

This page documents how the priority sampling is implemented in the clients directly.

The `sampling_priority` is an attribute of the Context that has to be propagated over the wire next to the `trace_id` and `span_id` attributes. When propagated over HTTP, its header is `x-datadog-sampling-priority`. When creating remote spans from this propagated attribute, **the same sampling priority value has to be used for the remote trace**.

The `sampling_priority` value must be the same across all the pieces of a trace (when spread across hosts or asynchronous tasks). So it should not be modified after any context propagation (remote call, fork, …).

The initial `sampling_priority` value is computed at the root span creation. The initial value can either be **0** or **1**. This initial decision is taken by the client but the Agent provides a "rate" to decide if it should be a **0** or a **1**.
The response of the Agent to any flush is a JSON containing a `rate_by_service` key which contains a mapping of services to a rate (between 0 and 1). This rate decides the probability to assign a priority of **1** to new traces:

```json
{
  "rate_by_service": {
    "webapp": 0.94,
    "workers": 0.11
  }
}
```

With that example, if you create a new trace with a root span of service **webapp**, the Agent should pick between a sampling_priority of 1 (with a 94% chance) or a priority of 0 (with a 6% chance).
This mechanism is meant to ensure that it sampled a good proportion of low QPS services (high QPS services have a lower rate) and that the total resulting volume sampled aligns with the `max_traces_per_second` parameter configured in the Agent.

The client allows to update the sampling priority to **-1** (drop the trace fully) or **2** (force its sampling). This should be done only after any context propagation. If this happen after the propagation of a context, the system can't ensure that the entire trace is sampled properly.

When serialized/flushed to the Agent, the `sampling_priority` is stored in the `_sampling_priority_v1` key of the `metrics` attribute. Example with JSON (similar with msgpack).

```json
[
  [
    {
      "trace_id": 1234,
      "span_id": 5678,
      "parent_id": 0,
      "service": "webapp", 
      "name": "web.request", 
      "resource": "GET /health",
      "type": "web",
      "start": 1525077627,
      "duration": 8976534, 
      "error": 0,
      "meta": {}, 
      "metrics": {
        "_sampling_priority_v1": 1
      }
    }
  ]
]
```