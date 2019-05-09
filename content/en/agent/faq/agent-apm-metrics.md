---
title: APM metrics send by the Datadog Agent
kind: faq
---

Find below the list of out of the box metrics send by a Datadog Agent when [APM is enabled][1]:

| Metric Name | Type | Description|
| ----- | ----- | ----- |
| `datadog.trace_agent.service_writer.bytes` | Count | |
| `datadog.trace_agent.service_writer.errors` | Count | |
| `datadog.trace_agent.service_writer.payloads` | Count | |
| `datadog.trace_agent.service_writer.retries` | Count| |
| `datadog.trace_agent.service_writer.services` | Count| |
| `datadog.trace_agent.stats_writer.bytes` | Count | |
| `datadog.trace_agent.stats_writer.errors` | Count | |
| `datadog.trace_agent.stats_writer.payloads` | Count | |
| `datadog.trace_agent.stats_writer.retries` | Count |
| `datadog.trace_agent.stats_writer.splits` | Count | |
| `datadog.trace_agent.stats_writer.stats_buckets` | Count | |
| `datadog.trace_agent.trace_writer.bytes` | Count | |
| `datadog.trace_agent.trace_writer.bytes_estimated` | Count | |
| `datadog.trace_agent.trace_writer.bytes_uncompressed` | Count | |
| `datadog.trace_agent.trace_writer.errors` | Count | |
| `datadog.trace_agent.trace_writer.events` | Count | |
| `datadog.trace_agent.trace_writer.payloads` | Count | |
| `datadog.trace_agent.trace_writer.retries` | Count | |
| `datadog.trace_agent.trace_writer.single_max_size` | Count | |
| `datadog.trace_agent.trace_writer.spans` | Count | |
| `datadog.trace_agent.trace_writer.traces` | Count | |
[1]: /tracing/setup
