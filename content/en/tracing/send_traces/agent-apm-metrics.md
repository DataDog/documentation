---
title: APM metrics sent by the Datadog Agent
kind: Documentation
aliases:
  - /agent/faq/agent-apm-metrics/
---

Find below the list of out-of-the-box metrics sent by the Datadog Agent when [APM is enabled][1]:

| Metric Name                                           | Type  | Description                                                                                                                     |
| ----------------------------------------------------- | ----- | -----                                                                                                                           |
| `datadog.trace_agent.started`                         | Count | Increment by one every time the Agent starts.                                                                                   |
| `datadog.trace_agent.panic`                           | Gauge | Increment by one on every code panic.                                                                                           |
| `datadog.trace_agent.heartbeat`                       | Gauge | Increment by one every 10 seconds.                                                                                              |
| `datadog.trace_agent.heap_alloc`                      | Gauge | Heap allocations as reported by the Go runtime.                                                                                 |
| `datadog.trace_agent.cpu_percent`                     | Gauge | CPU usage (in cores), e.g. 50 (half a core), 200 (two cores), 250 (2.5 cores)                                                   |
| `datadog.trace_agent.presampler_rate`                 | Gauge | If lower than 1, it means payloads are being refused due to high resource usage (cpu or memory).                                |
| `datadog.trace_agent.receiver.traces_received`        | Count | Number of traces received and accepted.                                                                                         |
| `datadog.trace_agent.receiver.traces_dropped`         | Count | Traces dropped due to normalization errors.                                                                                     |
| `datadog.trace_agent.receiver.traces_filtered`        | Count | Traces filtered by ignored resources (as defined in `datadog.yaml` file).                                                       |
| `datadog.trace_agent.receiver.traces_priority`        | Count | Traces processed by priority sampler that have the `priority` tag.                                                              |
| `datadog.trace_agent.receiver.traces_bytes`           | Count | Total bytes of payloads accepted by the Agent.                                                                                  |
| `datadog.trace_agent.receiver.spans_received`         | Count | Total bytes of payloads received by the Agent.                                                                                  |
| `datadog.trace_agent.receiver.spans_dropped`          | Count | Total bytes of payloads dropped by the Agent.                                                                                   |
| `datadog.trace_agent.receiver.spans_filtered`         | Count | Total bytes of payloads filtered by the Agent                                                                                   |
| `datadog.trace_agent.receiver.services_received`      | Count | Services received in `/v0.x/` services endpoints.                                                                               |
| `datadog.trace_agent.receiver.services_bytes`         | Count | Bytes accepted in `/v0.x/` services endpoints.                                                                                  |
| `datadog.trace_agent.receiver.events_extracted`       | Count | Total Analyzed Spans sampled.                                                                                                       |
| `datadog.trace_agent.receiver.events_sampled`         | Count | Total Analyzed Spans sampled by the `max_events_per_second` parameter sampler.                                                      |
| `datadog.trace_agent.receiver.payload_accepted`       | Count | Number of payloads accepted by the Agent.                                                                                       |
| `datadog.trace_agent.receiver.payload_refused`        | Count | Number of payloads rejected by the receiver because of the sampling.                                                            |
| `datadog.trace_agent.receiver.suicide`                | Count | Number of times the Agent killed itself due to excessive memory use (150% of max_memory).                                       |
| `datadog.trace_agent.trace_writer.flush_duration`     | Gauge | Time it took to flush a payload to the Datadog API.                                                                             |
| `datadog.trace_agent.trace_writer.payloads`           | Count | Number of payloads sent.                                                                                                        |
| `datadog.trace_agent.trace_writer.traces`             | Count | Number of traces processed.                                                                                                     |
| `datadog.trace_agent.trace_writer.events`             | Count | Number of events processed.                                                                                                     |
| `datadog.trace_agent.trace_writer.spans`              | Count | Number of spans processed.                                                                                                      |
| `datadog.trace_agent.trace_writer.bytes`              | Count | Number of bytes sent (calculated after Gzip).                                                                                   |
| `datadog.trace_agent.trace_writer.bytes_uncompressed` | Count | Number of bytes sent (calculated before Gzip).                                                                                  |
| `datadog.trace_agent.trace_writer.bytes_estimated`    | Count | Number of bytes estimated by Agent internal algorithm.                                                                          |
| `datadog.trace_agent.trace_writer.retries`            | Count | Number of retries on failures to the Datadog API.                                                                               |
| `datadog.trace_agent.trace_writer.errors`             | Count | Errors that could not be retried.                                                                                               |
| `datadog.trace_agent.trace_writer.single_max_size`    | Count | Increment by one when a single trace was flushed because it was bigger than the maximum allowed size by the Datadog API (3.2M). |
| `datadog.trace_agent.stats_writer.flush_duration`     | Gauge | Time it took to flush a payload to the Datadog API.                                                                             |
| `datadog.trace_agent.stats_writer.payloads`           | Count | Number of payloads sent.                                                                                                        |
| `datadog.trace_agent.stats_writer.stats_buckets`      | Count | Number of stats buckets flushed.                                                                                                |
| `datadog.trace_agent.stats_writer.bytes`              | Count | Number of bytes sent (calculated after Gzip).                                                                                   |
| `datadog.trace_agent.stats_writer.retries`            | Count | Number of retries on failures to the Datadog API                                                                                |
| `datadog.trace_agent.stats_writer.splits`             | Count | Number of times a payload was split into multiple ones.                                                                         |
| `datadog.trace_agent.stats_writer.errors`             | Count | Errors that could not be retried.                                                                                               |
| `datadog.trace_agent.service_writer.services`         | Count | Number of services flushed.                                                                                                      |
| `datadog.trace_agent.events.max_eps.max_rate`         | Gauge | Same as the Agent config's `max_events_per_second` parameter.                                                                   |
| `datadog.trace_agent.events.max_eps.reached_max`      | Gauge | Is set to `1` every time `max_events_per_second` is reached, otherwise it's `0`.                                                |
| `datadog.trace_agent.events.max_eps.current_rate`     | Gauge | Count of Analyzed Spans per second received by the Agent                                                                            |
| `datadog.trace_agent.events.max_eps.sample_rate`      | Gauge | Sample rate applied by the Agent to Events it received                                                                          |

[1]: /tracing/setup
