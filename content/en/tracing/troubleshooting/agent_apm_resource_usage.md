---
title: APM Agent Resource Usage
kind: Documentation
aliases:
  - /tracing/troubleshooting/agent_apm_resource_usage
---

## How the APM Agent works

The APM Agent is CPU-bound and its CPU usage is correlated with the number of spans received per second.

The APM Agent is designed to buffer unprocessed payloads in memory to avoid data loss. Consequently, throttling the Agent process because of an insufficient CPU limit can lead to out of memory.

## Detect out-of-CPU

The following metrics emitted by APM Agent can help detect out-of-CPU:
- `datadog.trace_agent.cpu_percent`: CPU usage (in decicores), for example, 50 (half a core), 200 (two cores). It can be compared to the [maximum CPU percentage][1] configured for the APM Agent.
- `datadog.trace_agent.ratelimit`: If lower than 1, it means payloads are being refused due to high resource usage (cpu or memory).

See the full list of [APM Agent metrics][2].

**Note:** If you disabled the [maximum CPU percentage for APM][1] in containerized environments, you can use the following metrics: `container.cpu.usage`, `container.cpu.limit` and `container.cpu.throttled`.


[1]: /tracing/troubleshooting/agent_rate_limits/#maximum-cpu-percentage
[2]: /tracing/send_traces/agent-apm-metrics/

## Resource requirements

The number of spans received per second is a good indicator to figure out adequate resource limits for the APM Agent.
The APM Agent emits this metric `datadog.trace_agent.receiver.spans_received`.
Based on its value, you can follow the table below to choose adequate CPU and Memory limits

| Spans/s  | CPU (core)   | Memory (MB)  |
|----------|--------------|--------------|
| 2k       | 0.05         | 35           |
| 11k      | 0.2          | 40           |
| 32k      | 0.6          | 60           |
| 58k      | 1            | 70           |
| 130k     | 2            | 130          |

**Notes:**
- The values are based on Agent `7.39.0` benchmarks.
- The benchmarks were performed on an AWS `c5.2xlarge` instance (8 VCPU/ 16GiB RAM)
