---
title: Internal Metrics
---
Exposes Vector's own internal metrics, allowing you to collect, process,
and route Vector's internal metrics just like other metrics.

# Configuration
<table><thead><tr><td>Param</td><td>Description</td></tr></thead><tbody><tr><td>namespace</td><td>Overrides the default namespace for the metrics emitted by the source.</td></tr><tr><td>scrape_interval_secs</td><td>The interval between metric gathering, in seconds.</td></tr><tr><td>tags</td><td>Tag configuration for the `internal_metrics` source.</td></tr><tr><td>tags.host_key</td><td>Overrides the name of the tag used to add the peer host to each metric.

The value will be the peer host's address, including the port i.e. `1.2.3.4:9000`.

By default, the [global `log_schema.host_key` option][global_host_key] is used.

Set to `""` to suppress this key.

[global_host_key]: https://vector.dev/docs/reference/configuration/global-options/#log_schema.host_key</td></tr><tr><td>tags.pid_key</td><td>Sets the name of the tag to use to add the current process ID to each metric.

By default, this is not set and the tag will not be automatically added.</td></tr><tr><td>type</td><td>The component type. This is a required field for all components and tells Vector which component to use.</td></tr></tbody></table>

# Output Data

# Telemetry
<table></tbody><tr><td>component_discarded_events_total</td><td>The number of events dropped by this component.</td></tr><tr><td>component_errors_total</td><td>The total number of errors encountered by this component.</td></tr><tr><td>component_received_events_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>events_out_total</td><td>The total number of events emitted by this component.
This metric is deprecated and will be removed in a future version.
Use [`component_sent_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_sent_events_total) instead.</td></tr><tr><td>component_sent_events_total</td><td>The total number of events emitted by this component.</td></tr><tr><td>component_sent_event_bytes_total</td><td>The total number of event bytes emitted by this component.</td></tr><tr><td>component_received_event_bytes_total</td><td>The number of event bytes accepted by this component either from
tagged origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>source_lag_time_seconds</td><td>The difference between the timestamp recorded in each event and the time when it was ingested, expressed as fractional seconds.</td></tr></tbody></table>

# How It Works
## Sending metrics from multiple Vector instances
When sending `internal_metrics` from multiple Vector instances
to the same destination, you will typically want to tag the
metrics with a tag that is unique to the Vector instance sending
the metrics to avoid the metric series conflicting. The
`tags.host_key` option can be used for this, but you can also
use a subsequent `remap` transform to add a different unique
tag from the environment.

## State
This component is stateless, meaning its behavior is consistent across each input.

## Context
By default, the `internal_metrics` source augments events with helpful
context keys.


