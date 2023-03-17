---
title: Reduce
---
Reduces multiple log events into a single log event based on a set of
conditions and merge strategies.

# Configuration
<table><thead><tr><td>Param</td><td>Description</td></tr></thead><tbody><tr><td>ends_when</td><td>A condition used to distinguish the final event of a transaction.

If this condition resolves to `true` for an event, the current transaction is immediately
flushed with this event.</td></tr><tr><td>expire_after_ms</td><td>The maximum period of time to wait after the last event is received, in milliseconds, before
a combined event should be considered complete.</td></tr><tr><td>flush_period_ms</td><td>The interval to check for and flush any expired events, in milliseconds.</td></tr><tr><td>group_by</td><td>An ordered list of fields by which to group events.

Each group with matching values for the specified keys is reduced independently, allowing
you to keep independent event streams separate. When no fields are specified, all events
will be combined in a single group.

For example, if `group_by = ["host", "region"]`, then all incoming events that have the same
host and region will be grouped together before being reduced.</td></tr><tr><td>max_events</td><td>The maximum number of events to group together.</td></tr><tr><td>merge_strategies</td><td>A map of field names to custom merge strategies.

For each field specified, the given strategy will be used for combining events rather than
the default behavior.

The default behavior is as follows:

- The first value of a string field is kept, subsequent values are discarded.
- For timestamp fields the first is kept and a new field `[field-name]_end` is added with
  the last received timestamp value.
- Numeric values are summed.</td></tr><tr><td>merge_strategies.*</td><td>An individual merge strategy.</td></tr><tr><td>inputs</td><td>A list of upstream [source][sources] or [transform][transforms] IDs.

Wildcards (`*`) are supported.

See [configuration][configuration] for more info.

[sources]: https://vector.dev/docs/reference/configuration/sources/
[transforms]: https://vector.dev/docs/reference/configuration/transforms/
[configuration]: https://vector.dev/docs/reference/configuration/</td></tr><tr><td>starts_when</td><td>A condition used to distinguish the first event of a transaction.

If this condition resolves to `true` for an event, the previous transaction is flushed
(without this event) and a new transaction is started.</td></tr><tr><td>type</td><td>The component type. This is a required field for all components and tells Vector which component to use.</td></tr></tbody></table>

# Output Data

# Telemetry
<table></tbody><tr><td>stale_events_flushed_total</td><td>The number of stale events that Vector has flushed.</td></tr><tr><td>events_in_total</td><td>The number of events accepted by this component either from tagged
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
[`component_sent_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_sent_events_total) metrics.</td></tr><tr><td>component_sent_event_bytes_total</td><td>The total number of event bytes emitted by this component.</td></tr><tr><td>processed_bytes_total</td><td>The number of bytes processed by the component.</td></tr></tbody></table>

# How It Works
## State
This component is stateful, meaning its behavior changes based on previous inputs (events).
State is not preserved across restarts, therefore state-dependent behavior will reset between
restarts and depend on the inputs (events) received since the most recent restart.


