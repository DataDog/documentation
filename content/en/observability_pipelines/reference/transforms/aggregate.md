---
title: Aggregate
---
Aggregates multiple metric events into a single metric event based
on a defined interval window. This helps to reduce metric volume at
the cost of granularity.

# Configuration
<table><thead><tr><td>Param</td><td>Description</td></tr></thead><tbody><tr><td>interval_ms</td><td>The interval between flushes, in milliseconds.

Over this period metrics with the same series data (name, namespace, tags, …) will be aggregated.</td></tr><tr><td>inputs</td><td>A list of upstream [source][sources] or [transform][transforms] IDs.

Wildcards (`*`) are supported.

See [configuration][configuration] for more info.

[sources]: https://vector.dev/docs/reference/configuration/sources/
[transforms]: https://vector.dev/docs/reference/configuration/transforms/
[configuration]: https://vector.dev/docs/reference/configuration/</td></tr><tr><td>type</td><td>The component type. This is a required field for all components and tells Vector which component to use.</td></tr></tbody></table>

# Output Data

# Telemetry
<table></tbody><tr><td>aggregate_events_recorded_total</td><td>The number of events recorded by the aggregate transform.</td></tr><tr><td>aggregate_failed_updates</td><td>The number of failed metric updates, `incremental` adds, encountered by the aggregate transform.</td></tr><tr><td>events_in_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.
This metric is deprecated and will be removed in a future version.
Use [`component_received_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_received_events_total) instead.</td></tr><tr><td>events_out_total</td><td>The total number of events emitted by this component.
This metric is deprecated and will be removed in a future version.
Use [`component_sent_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_sent_events_total) instead.</td></tr><tr><td>component_received_events_count</td><td>A histogram of the number of events passed in each internal batch in Vector's internal topology.

Note that this is separate than sink-level batching. It is mostly useful for low level debugging
performance issues in Vector due to small internal batches.</td></tr><tr><td>component_received_events_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>component_received_event_bytes_total</td><td>The number of event bytes accepted by this component either from
tagged origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>utilization</td><td>A ratio from 0 to 1 of the load on a component. A value of 0 would indicate a completely idle component that is simply waiting for input. A value of 1 would indicate a that is never idle. This value is updated every 5 seconds.</td></tr><tr><td>component_sent_events_total</td><td>The total number of events emitted by this component.</td></tr><tr><td>processed_events_total</td><td>The total number of events processed by this component.
This metric is deprecated in place of using
[`component_received_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_received_events_total) and
[`component_sent_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_sent_events_total) metrics.</td></tr><tr><td>aggregate_flushes_total</td><td>The number of flushes done by the aggregate transform.</td></tr><tr><td>component_sent_event_bytes_total</td><td>The total number of event bytes emitted by this component.</td></tr><tr><td>processed_bytes_total</td><td>The number of bytes processed by the component.</td></tr></tbody></table>

# How It Works
## Aggregation Behavior
Metrics are aggregated based on their kind. During an interval, `incremental` metrics
are "added" and newer `absolute` metrics replace older ones in the same series. This results in a reduction
of volume and less granularity, while maintaining numerical correctness. As an example, two
`incremental` `counter` metrics with values 10 and 13 processed by the transform during a period would be
aggregated into a single `incremental` `counter` with a value of 23. Two `absolute` `gauge` metrics with
values 93 and 95 would result in a single `absolute` `gauge` with the value of 95. More complex
types like `distribution`, `histogram`, `set`, and `summary` behave similarly with `incremental`
values being combined in a manner that makes sense based on their type.

## State
This component is stateful, meaning its behavior changes based on previous inputs (events).
State is not preserved across restarts, therefore state-dependent behavior will reset between
restarts and depend on the inputs (events) received since the most recent restart.

## Advantages of Use
The major advantage to aggregation is the reduction of volume. It may reduce costs
directly in situations that charge by metric event volume, or indirectly by requiring less CPU to
process and/or less network bandwidth to transmit and receive. In systems that are constrained by
the processing required to ingest metric events it may help to reduce the processing overhead. This
may apply to transforms and sinks downstream of the aggregate transform as well.


