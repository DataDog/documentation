---
title: APM metrics sent by the Datadog Agent
aliases:
    - /agent/faq/agent-apm-metrics/
    - /tracing/send_traces/agent-apm-metrics/
---

Find below the list of out-of-the-box tracing metrics sent by the Datadog Agent when [APM is enabled][1]. Import the [APM monitoring dashboard][2] in your Datadog account in order to get an out-of-the-box dashboard exploiting most of those metrics.



`datadog.trace_agent.cpu_percent`
: **Type**: Gauge<br>
CPU usage in terms of percentage of a core. For example, a value of `50` is half a core, or `200` is two cores.

`datadog.trace_agent.events.max_eps.current_rate`
: **Type**: Gauge<br>
Count of APM Events per second received by the Agent

`datadog.trace_agent.events.max_eps.max_rate`
: **Type**: Gauge<br>
Same as the Agent config's max_events_per_second parameter.

`datadog.trace_agent.events.max_eps.reached_max`
: **Type**: Gauge<br>
Is set to `1` every time max_events_per_second is reached, otherwise it's `0`.

`datadog.trace_agent.events.max_eps.sample_rate`
: **Type**: Gauge<br>
Sample rate applied by the Agent to Events it received

`datadog.trace_agent.heap_alloc`
: **Type**: Gauge<br>
Heap allocations as reported by the Go runtime.

`datadog.trace_agent.heartbeat`
: **Type**: Gauge<br>
Increment by one every 10 seconds.

`datadog.trace_agent.normalizer.spans_malformed`
: **Type**: Count<br>
Number of spans having malformed fields that had to be altered in order for the system to accept them

`datadog.trace_agent.obfuscation.sql_cache.hits`
: **Type**: Count<br>
Number of GET calls where a value was found for the corresponding key.

`datadog.trace_agent.obfuscation.sql_cache.misses`
: **Type**: Count<br>
Number of GET calls where a value was not found for the corresponding key.

`datadog.trace_agent.panic`
: **Type**: Gauge<br>
Increment by one on every code panic.

`datadog.trace_agent.profile`
: **Type**: Count<br>
Increment by one every time a reverse proxy of profile endpoints is created.

`datadog.trace_agent.receiver.error`
: **Type**: Count<br>
Number of times that the API rejected a payload due to an error in either decoding, formatting or other.

`datadog.trace_agent.receiver.events_extracted`
: **Type**: Count<br>
Total APM events sampled.

`datadog.trace_agent.receiver.events_sampled`
: **Type**: Count<br>
Total APM events sampled by the `max_events_per_second` parameter sampler.

`datadog.trace_agent.receiver.oom_kill`
: **Type**: Count<br>
Number of times the Agent killed itself due to excessive memory use (150% of max_memory).

`datadog.trace_agent.receiver.out_chan_fill`
: **Type**: Gauge<br>
Internal metric. Percentage of fill on the receiver's output channel.

`datadog.trace_agent.receiver.payload_accepted`
: **Type**: Count<br>
Number of payloads accepted by the Agent.

`datadog.trace_agent.receiver.payload_refused`
: **Type**: Count<br>
Number of payloads rejected by the receiver because of the sampling.

`datadog.trace_agent.receiver.spans_dropped`
: **Type**: Count<br>
Number of spans dropped by the Agent.

`datadog.trace_agent.receiver.spans_filtered`
: **Type**: Count<br>
Number of spans filtered by the Agent.

`datadog.trace_agent.receiver.spans_received`
: **Type**: Count<br>
Total number of spans received by the Agent.

`datadog.trace_agent.receiver.tcp_connections`
: **Type**: Count<br>
Number of TCP connections coming in to the agent.

`datadog.trace_agent.receiver.trace`
: **Type**: Count<br>
Number of traces received and accepted.

`datadog.trace_agent.receiver.traces_bytes`
: **Type**: Count<br>
Total bytes of payloads accepted by the Agent.

`datadog.trace_agent.receiver.traces_filtered`
: **Type**: Count<br>
Traces filtered by ignored resources (as defined in `datadog.yaml` file).

`datadog.trace_agent.receiver.traces_priority`
: **Type**: Count<br>
Traces processed by priority sampler that have the priority tag.

`datadog.trace_agent.receiver.traces_received`
: **Type**: Count<br>
Number of traces received and accepted.

`datadog.trace_agent.started`
: **Type**: Count<br>
Increment by one every time the Agent starts.

`datadog.trace_agent.stats_writer.bytes`
: **Type**: Count<br>
Number of bytes sent (calculated after Gzip).

`datadog.trace_agent.stats_writer.connection_fill`
: **Type**: Histogram <br>
Percentage of outgoing connections used.

`datadog.trace_agent.stats_writer.dropped`
: **Type**: Count<br>
Number of payloads dropped due to non retriable HTTP errors.

`datadog.trace_agent.stats_writer.dropped_bytes`
: **Type**: Count<br>
Number of bytes dropped due to non retriable HTTP errors.

`datadog.trace_agent.stats_writer.encode_ms`
: **Type**: Histogram <br>
Time it took to encode a stats payload.

`datadog.trace_agent.stats_writer.errors`
: **Type**: Count<br>
Errors that could not be retried.

`datadog.trace_agent.stats_writer.queue_fill`
: **Type**: Histogram <br>
Percentage of queue filled.

`datadog.trace_agent.stats_writer.retries`
: **Type**: Count<br>
Number of retries on failures to the Datadog API

`datadog.trace_agent.stats_writer.splits`
: **Type**: Count<br>
Number of times a payload was split into multiple ones.

`datadog.trace_agent.stats_writer.stats_buckets`
: **Type**: Count<br>
Number of stats buckets flushed.

`datadog.trace_agent.trace_writer.bytes`
: **Type**: Count<br>
Number of bytes sent (calculated after Gzip).

`datadog.trace_agent.trace_writer.bytes_uncompressed `
: **Type**: Count<br>
Number of bytes sent (calculated before Gzip).

`datadog.trace_agent.trace_writer.compress_ms`
: **Type**: Gauge<br>
Number of milliseconds it took to compress an encoded trace payload.

`datadog.trace_agent.trace_writer.connection_fill`
: **Type**: Histogram <br>
Percentage of outgoing connections used by the trace writer.

`datadog.trace_agent.trace_writer.dropped`
: **Type**: Count<br>
Number of dropped payloads due to non retriable HTTP errors.

`datadog.trace_agent.trace_writer.dropped_bytes`
: **Type**: Count<br>
Number of dropped bytes due to non retriable HTTP errors.

`datadog.trace_agent.trace_writer.encode_ms`
: **Type**: Gauge<br>
Number of milliseconds it took to encode a trace payload.

`datadog.trace_agent.trace_writer.errors`
: **Type**: Count<br>
Errors that could not be retried.

`datadog.trace_agent.trace_writer.events`
: **Type**: Count<br>
Number of events processed.

`datadog.trace_agent.trace_writer.flush_duration`
: **Type**: Gauge<br>
Time it took to flush a payload to the Datadog API.

`datadog.trace_agent.trace_writer.payloads`
: **Type**: Count<br>
Number of payloads sent.

`datadog.trace_agent.trace_writer.queue_fill`
: **Type**: Histogram <br>
Percentage of outgoing payload queue fill.

`datadog.trace_agent.trace_writer.retries`
: **Type**: Count<br>
Number of retries on failures to the Datadog API.

`datadog.trace_agent.trace_writer.spans`
: **Type**: Count<br>
Number of spans processed.

`datadog.trace_agent.trace_writer.traces`
: **Type**: Count<br>
Number of traces processed.

[1]: /tracing/setup/
[2]: /resources/json/APM_monitoring_dashboard.json
