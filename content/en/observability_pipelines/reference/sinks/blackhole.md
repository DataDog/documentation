---
title: Blackhole
---
undefined

# Configuration
<table><thead><tr><td>Param</td><td>Description</td></tr></thead><tbody><tr><td>acknowledgements</td><td>Controls how acknowledgements are handled for this sink.

See [End-to-end Acknowledgements][e2e_acks] for more information on how event acknowledgement is handled.

[e2e_acks]: https://vector.dev/docs/about/under-the-hood/architecture/end-to-end-acknowledgements/</td></tr><tr><td>acknowledgements.enabled</td><td>Whether or not end-to-end acknowledgements are enabled.

When enabled for a sink, any source connected to that sink, where the source supports
end-to-end acknowledgements as well, will wait for events to be acknowledged by the sink
before acknowledging them at the source.

Enabling or disabling acknowledgements at the sink level takes precedence over any global
[`acknowledgements`][global_acks] configuration.

[global_acks]: https://vector.dev/docs/reference/configuration/global-options/#acknowledgements</td></tr><tr><td>print_interval_secs</td><td>The interval between reporting a summary of activity.

Set to `0` to disable reporting.</td></tr><tr><td>inputs</td><td>A list of upstream [source][sources] or [transform][transforms] IDs.

Wildcards (`*`) are supported.

See [configuration][configuration] for more info.

[sources]: https://vector.dev/docs/reference/configuration/sources/
[transforms]: https://vector.dev/docs/reference/configuration/transforms/
[configuration]: https://vector.dev/docs/reference/configuration/</td></tr><tr><td>buffer</td><td>Configures the buffering behavior for this sink.

More information about the individual buffer types, and buffer behavior, can be found in the
[Buffering Model][buffering_model] section.

[buffering_model]: /docs/about/under-the-hood/architecture/buffering-model/</td></tr><tr><td>buffer.max_events</td><td>The maximum number of events allowed in the buffer.</td></tr><tr><td>buffer.max_size</td><td>The maximum size of the buffer on disk.

Must be at least ~256 megabytes (268435488 bytes).</td></tr><tr><td>buffer.type</td><td>The type of buffer to use.</td></tr><tr><td>buffer.when_full</td><td>Event handling behavior when a buffer is full.</td></tr><tr><td>rate</td><td>The number of events, per second, that the sink is allowed to consume.

By default, there is no limit.</td></tr><tr><td>healthcheck</td><td>Healthcheck configuration.</td></tr><tr><td>healthcheck.enabled</td><td>Whether or not to check the health of the sink when Vector starts up.</td></tr><tr><td>type</td><td>The component type. This is a required field for all components and tells Vector which component to use.</td></tr></tbody></table>

# Output Data

# Telemetry
<table></tbody><tr><td>processed_bytes_total</td><td>The number of bytes processed by the component.</td></tr><tr><td>component_received_events_count</td><td>A histogram of the number of events passed in each internal batch in Vector's internal topology.

Note that this is separate than sink-level batching. It is mostly useful for low level debugging
performance issues in Vector due to small internal batches.</td></tr><tr><td>component_received_events_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>component_received_event_bytes_total</td><td>The number of event bytes accepted by this component either from
tagged origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>events_in_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.
This metric is deprecated and will be removed in a future version.
Use [`component_received_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_received_events_total) instead.</td></tr><tr><td>utilization</td><td>A ratio from 0 to 1 of the load on a component. A value of 0 would indicate a completely idle component that is simply waiting for input. A value of 1 would indicate a that is never idle. This value is updated every 5 seconds.</td></tr><tr><td>buffer_byte_size</td><td>The number of bytes current in the buffer.</td></tr><tr><td>buffer_events</td><td>The number of events currently in the buffer.</td></tr><tr><td>buffer_received_events_total</td><td>The number of events received by this buffer.</td></tr><tr><td>buffer_received_event_bytes_total</td><td>The number of bytes received by this buffer.</td></tr><tr><td>buffer_sent_events_total</td><td>The number of events sent by this buffer.</td></tr><tr><td>buffer_sent_event_bytes_total</td><td>The number of bytes sent by this buffer.</td></tr><tr><td>processed_events_total</td><td>The total number of events processed by this component.
This metric is deprecated in place of using
[`component_received_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_received_events_total) and
[`component_sent_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_sent_events_total) metrics.</td></tr><tr><td>buffer_discarded_events_total</td><td>The number of events dropped by this non-blocking buffer.</td></tr></tbody></table>

# How It Works
## State
This component is stateless, meaning its behavior is consistent across each input.


