---
title: Dedupe events
---
Deduplicates events to reduce data volume by eliminating copies of data.

# Configuration
<table><thead><tr><td>Param</td><td>Description</td></tr></thead><tbody><tr><td>cache</td><td>Caching configuration for deduplication.</td></tr><tr><td>cache.num_events</td><td>Number of events to cache and use for comparing incoming events to previously seen events.</td></tr><tr><td>inputs</td><td>A list of upstream [source][sources] or [transform][transforms] IDs.

Wildcards (`*`) are supported.

See [configuration][configuration] for more info.

[sources]: https://vector.dev/docs/reference/configuration/sources/
[transforms]: https://vector.dev/docs/reference/configuration/transforms/
[configuration]: https://vector.dev/docs/reference/configuration/</td></tr><tr><td>fields</td><td>Options to control what fields to match against.

When no field matching configuration is specified, events are matched using the `timestamp`,
`host`, and `message` fields from an event. The specific field names used will be those set in
the global [`log schema`][global_log_schema] configuration.

[global_log_schema]: https://vector.dev/docs/reference/configuration/global-options/#log_schema</td></tr><tr><td>fields.ignore</td><td>Matches events using all fields except for the ignored ones.</td></tr><tr><td>fields.match</td><td>Matches events using only the specified fields.</td></tr><tr><td>type</td><td>The component type. This is a required field for all components and tells Vector which component to use.</td></tr></tbody></table>

# Output Data

# Telemetry
<table></tbody><tr><td>events_discarded_total</td><td>The total number of events discarded by this component.</td></tr><tr><td>events_in_total</td><td>The number of events accepted by this component either from tagged
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
## Cache Behavior
This transform is backed by an LRU cache of size `cache.num_events`.
That means that this transform will cache information in memory for
the last `cache.num_events` Events that it has processed. Entries
will be removed from the cache in the order they were inserted. If
an Event is received that is considered a duplicate of an Event
already in the cache that will put that event back to the head of
the cache and reset its place in line, making it once again last
entry in line to be evicted.

## Memory Usage Details
Each entry in the cache corresponds to an incoming Event and
contains a copy of the 'value' data for all fields in the Event
being considered for matching. When using `fields.match` this will
be the list of fields specified in that configuration option. When
using `fields.ignore` that will include all fields present in the
incoming event except those specified in `fields.ignore`. Each entry
also uses a single byte per field to store the type information of
that field. When using `fields.ignore` each cache entry additionally
stores a copy of each field name being considered for matching. When
using `fields.match` storing the field names is not necessary.

## Memory Utilization Estimation
If you want to estimate the memory requirements of this transform
for your dataset, you can do so with these formulas:

When using `fields.match`:

```text
Sum(the average size of the *data* (but not including the field name) for each field in `fields.match`) * `cache.num_events`
```

When using `fields.ignore`:

```text
(Sum(the average size of each incoming Event) - (the average size of the field name *and* value for each field in `fields.ignore`)) * `cache.num_events`
```

## State
This component is stateful, meaning its behavior changes based on previous inputs (events).
State is not preserved across restarts, therefore state-dependent behavior will reset between
restarts and depend on the inputs (events) received since the most recent restart.

## Missing Fields
Fields with explicit null values will always be considered different
than if that field was omitted entirely. For example, if you run
this transform with `fields.match = ["a"]`, the event "{a: null,
b:5}" will be considered different to the event "{b:5}".


