---
title: Missing Log Bytes Troubleshooting Guide
description: Use the Logs Agent Backpressure section of the Agent status output to find the pipeline stage causing log data loss, and tune logs_config to prevent it.
further_reading:
- link: "/logs/guide/mechanisms-ensure-logs-not-lost/"
  tag: "Guide"
  text: "Mechanisms to Ensure Logs are Not Lost"
- link: "/logs/guide/log-collection-troubleshooting-guide/"
  tag: "Guide"
  text: "Log Collection Troubleshooting Guide"
- link: "/agent/logs/log_transport/"
  tag: "Documentation"
  text: "Agent Transport for Logs"
- link: "/agent/logs/advanced_log_collection/"
  tag: "Documentation"
  text: "Advanced Log Collection"
- link: "/agent/configuration/agent-commands/#agent-status-and-information"
  tag: "Documentation"
  text: "Agent status command"
---

Missing log bytes are bytes that were written to a log file but removed before the Datadog Agent could read them. This happens when a file rotates or is deleted while the Agent is still behind on reading it. Unlike delayed logs, these bytes are unrecoverable.

Missing bytes are a symptom of backpressure in the logs pipeline, not a fault in the tailer. This guide shows you how to read the **Logs Agent Backpressure** section of the Agent status output to find the pipeline stage that is the constraint, and which `logs_config` options to change after you identify it.

## Overview

### How log bytes go missing

The Agent's logs pipeline moves each log through a series of stages:

```text
launcher → tailer → decoder → processor → strategy → sender → worker → destination
```

Each stage hands off to the next over a bounded channel. When a stage cannot drain its input fast enough, the stage before it blocks. That stall moves *backward* one stage at a time until it reaches the tailer, at which point the Agent stops reading the source file.

The Agent does not drop logs when this happens. It applies backpressure and waits. Data is lost only if the file rotates or is deleted before the tailer catches up, taking the unread bytes with it. Because pressure travels backward, the stage responsible for the loss is almost always downstream, at the point where the Agent transmits to Datadog.

After a rotation, the Agent keeps reading the rotated file in parallel with the new one for `logs_config.close_timeout` seconds (default `60`). Bytes still unread when that timer expires are counted as missing. For more detail on the rotation window, see [Mechanisms to Ensure Logs are Not Lost][1].

### Symptoms

Reach for this guide when you see any of the following:

- Gaps in log volume for a `source` or `service`
- Log volume lower than expected for the workload
- Logs arriving late, or high pipeline latency in the Agent status output
- Rotation or missed-bytes warnings in the Agent log
- Rising retries or network errors to the Datadog intake

These symptoms share one cause: a stage cannot keep up, so pressure walks back to the tailer and the Agent stops reading the source.

## Confirming data loss

The Agent writes a warning to its log each time a rotated file is closed with bytes still unread:

```text
WARN | After rotation close timeout (60s), there were 148213 bytes remaining unread for file "/var/log/app/app.log". These unread logs are now lost. Consider increasing DD_LOGS_CONFIG_CLOSE_TIMEOUT
```

Search the Agent log for these warnings and note the affected file paths and timestamps:

```shell
grep "remaining unread" /var/log/datadog/agent.log
```

The Agent also counts lost bytes in the `logs.bytes_missed` internal telemetry metric. See [Agent telemetry collection][2].

{{< note >}}
The Agent reports remaining unread bytes after rotation when tailing files on Linux and macOS.
{{< /note >}}

## Logs Agent Backpressure status

Starting in Agent 7.82.0, `agent status` includes a **Logs Agent Backpressure** section. It reports how hard each stage of the pipeline is working, keeps roughly 10 hours of rolling history, and names the stage that has become the bottleneck.

The section is available in `agent status`, in `status.log` inside a [flare][3], in the JSON status output, and on the HTML status page.

```text
Logs Agent Backpressure
=======================

  Overall state: SATURATED
  Reason: destination_reliable_0 pipeline q0s0 is currently saturated (saturated for 3m20s in the last 30m)

  Component              Instance Current   5m avg/max    30m avg/max    2h max    5h max    10h max    30m saturated    Last saturated
  processor              0        20%       18/26%        15/41%         55%       55%       55%        0s               -
  strategy               0        14%       12/19%        13/22%         22%       22%       22%        0s               -
  worker                 q0s0     46%       43/63%        27/63%         63%       63%       63%        0s               -
  destination_reliable_0 q0s0     93%       82/93%        71/93%         93%       93%       93%        3m20s            12:09:42
```

### Overall state

| State | Meaning |
| --- | --- |
| `HEALTHY` | Every component is below threshold, and none were saturated in the last 30 minutes. |
| `WARNING` | Nothing is saturated at read time, but at least one component was within the last 30 minutes. Compare `Last saturated` against your loss window. |
| `SATURATED` | At least one component is at or above threshold. There is an active bottleneck. |

### Table columns

| Column | Meaning |
| --- | --- |
| `Component` | The pipeline stage. `destination_reliable_N` is the reliable destination for endpoint `N`. |
| `Instance` | Which parallel instance. An integer for `processor` and `strategy` (the pipeline index); `qXsY` for `worker` and `destination` (the queue and sender index). |
| `Current` | Utilization over roughly the last 15 seconds. |
| `5m avg/max` | Average and maximum utilization over the last 5 minutes. |
| `30m avg/max` | Average and maximum utilization over the last 30 minutes. |
| `2h / 5h / 10h max` | Maximum utilization over the last 2, 5, and 10 hours. |
| `30m saturated` | Total time spent at or above threshold in the last 30 minutes. |
| `Last saturated` | Timestamp of the most recent saturation episode. A `-` means the component has never saturated. |

### Finding the bottleneck

Apply these three rules to the table:

1. **The most downstream saturated component is the bottleneck.** An upstream stage reading low next to a pinned downstream stage is not healthy — it is blocked. Tuning it has no effect.
2. **When `Current` is clean, the history columns are your evidence.** Pressure often clears before anyone runs `agent status`. `30m saturated` and `Last saturated` are frequently the only record left of the episode that caused the loss.
3. **Compare one instance against the rest.** A single saturated instance usually points to one hot source. Every instance saturated points to a global throughput ceiling.

In the example above, `destination_reliable_0` is the most downstream saturated component, so the Agent cannot push to the intake fast enough. The `processor`, `strategy`, and `worker` rows are low because they are waiting on it.

### What the utilization numbers mean

- **The percentages are a time ratio, not CPU usage.** They report the fraction of wall-clock time a component spends working rather than blocked. A destination waiting on the network reads near 100% while using almost no CPU. This reading is expected, and it identifies the destination as the bottleneck.
- **`Current` is smoothed** over roughly a 15-second window, so a short spike that has already passed is under-reported.
- **A component is saturated at 90% utilization or above**, with a 10-second recovery debounce so the state does not flap at the edge.
- **History is in memory only** and resets when the Agent restarts. Collect a flare before restarting an Agent you are troubleshooting.
- **The `sender` stage never appears in the table.** It is a capacity-only aggregation point with no utilization monitor.

### Saturation warnings in the Agent log

The Agent also logs saturation transitions. These persist after the status history has aged out, which makes them the better source when you are working from an older flare:

```text
WARN | Logs Agent pipeline component saturated component=destination instance=q0s0 utilization=93%
WARN | Logs Agent pipeline component saturated component=destination instance=q0s0 utilization=98% duration=10m0s max_utilization=100% max_items=2048 max_bytes=8388608
INFO | Logs Agent pipeline component recovered component=destination instance=q0s0 saturated_duration=12m30s max_utilization=100% max_items=2048 max_bytes=8388608
```

Search for them with:

```shell
grep -E "component (saturated|recovered)" /var/log/datadog/agent.log
```

The first line fires once when sustained saturation begins. The second repeats at most every 10 minutes while saturation continues. The third fires on recovery. The Agent logs these on state transitions only, not on momentary spikes.

## Tuning the saturated component

Work the most downstream saturated component first. Every option below is an existing `logs_config` setting; the status section tells you which one to reach for.

| Component | What saturation means |
| --- | --- |
| `destination_reliable_N` | The Agent cannot push to the intake fast enough. Start here — this is where backpressure usually originates. |
| `strategy` | Batching and compression cannot keep up. |
| `worker` | Concurrent senders are pinned dispatching batches. |
| `processor` | Per-message processing is CPU-bound on the host. |

{{< note >}}
The default values listed below can change between Agent releases. Confirm them against your deployed Agent version.
{{< /note >}}

### destination_reliable_N

Check the following, in order:

- **Round-trip time to the intake.** Geographic distance drives round-trip latency, which caps how fast payloads are acknowledged. The Agent scales send concurrency automatically to compensate, up to an internal ceiling. `logs_config.batch_max_concurrent_send` defaults to `0`, which enables that auto-scaling; a non-zero value pins concurrency to a fixed multiple of the pipeline count. Raising it has little downside and is worth trying.
- **Intermittent connectivity** rather than a hard outage. Look for latency spikes, timeouts, and retry bursts that line up with the saturation window. Verify your [network endpoints][4] and check whether a [proxy][5] is rate-limiting or buffering.
- **Unintended TCP fallback**, caused by `logs_config.force_use_tcp`, `logs_config.socks5_proxy_address`, or `logs_config.additional_endpoints`. TCP has no batching and no compression, so it caps throughput without an explicit error. Confirm the active transport in the Agent status output. See [Agent Transport for Logs][6].
- **Intake errors.** Sustained 4xx or 5xx responses. The Agent retries indefinitely with exponential backoff capped at 120 seconds, so a persistent error appears as sustained saturation rather than immediate loss. Fix the underlying error instead of tuning around it.

### strategy

Compression is the most CPU-intensive part of a typical deployment and can saturate a full core at high enough volume.

- **Compression settings.** The default is zstd at level `1` (`logs_config.zstd_compression_level`), which is already the cheapest option, so there is nothing to reclaim at defaults. A raised level, or `logs_config.compression_kind: gzip` with a high `logs_config.compression_level` (gzip defaults to `6`), trades CPU for bandwidth.
- **Batch shape.** `logs_config.batch_wait` (default `5` seconds), `logs_config.batch_max_content_size` (default 5 MB, measured before compression), and `logs_config.batch_max_size` (default `1000` events).
- **Pipeline count.** The Agent schedules sources round-robin across pipelines, up to four by default, one per CPU. A single hot source is pinned to one pipeline and can only ever use one CPU for compression. Raising `logs_config.pipelines` helps only when load is spread across many sources and you are not network-bound.

### worker

Worker saturation is usually a symptom of the destination behind it. Confirm the `destination_reliable_N` row first and address that instead.

If every destination row is clean, check send parallelism (`logs_config.batch_max_concurrent_send`) and whether the host has CPU headroom.

### processor

- **Processing rules.** The number of `log_processing_rules` and the complexity of their regular expressions drive the cost.
- **Global versus per-source rules.** Global processing rules run against every source, so their cost is multiplicative. Move them to individual sources wherever possible. See [Global processing rules][7].
- **Multi-line configuration**, especially [auto multi-line detection][8] on high-volume, noisy sources.
- **Host CPU headroom.** The Agent is sometimes starved by other workloads on the host.

## Preventing loss while you tune

Tuning takes time to take effect, and rotation loss continues in the meantime. Apply these in parallel with the fix above:

- **Raise `logs_config.close_timeout`** (default `60` seconds, environment variable `DD_LOGS_CONFIG_CLOSE_TIMEOUT`). This widens the window in which the Agent keeps reading a rotated file, giving a lagging tailer more time to finish.
- **Increase source-side retention or rotation size** so rotated files stay on disk long enough for the tailer to catch up.
- **Check `logs_config.open_files_limit`** (default `500`, or `200` on macOS) is high enough that active tailers are not dropped. See [Increase the Number of Log Files Tailed by the Agent][9].

{{< code-block lang="yaml" filename="datadog.yaml" >}}
logs_config:
  close_timeout: 180
  open_files_limit: 500
{{< /code-block >}}

## Reducing log volume

If no single stage can be tuned enough to keep up, reduce the volume reaching the Agent:

- Add `exclude_at_match` [processing rules][10] to drop logs you do not need.
- Filter or sample noisy sources at the application or collection layer, before they reach the Agent.

## Verifying the fix

After applying a change, [restart the Agent][11] and confirm the following:

1. `Current` and `30m saturated` drop for the component you tuned.
2. `Overall state` returns to `HEALTHY`.
3. No new `remaining unread` warnings appear in the Agent log.

Because the backpressure history resets on restart, allow at least 30 minutes of runtime before treating the history columns as evidence that the problem is resolved.

If saturation persists after tuning, [contact Datadog support][12] with a flare taken while the pipeline is saturated.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/guide/mechanisms-ensure-logs-not-lost/
[2]: /data_security/agent/#telemetry-collection
[3]: /agent/troubleshooting/send_a_flare/
[4]: /agent/configuration/network/
[5]: /agent/configuration/proxy/
[6]: /agent/logs/log_transport/
[7]: /agent/logs/advanced_log_collection/#global-processing-rules
[8]: /agent/logs/auto_multiline_detection/
[9]: /logs/guide/increase-number-of-log-files-tailed/
[10]: /agent/logs/advanced_log_collection/#filter-logs
[11]: /agent/configuration/agent-commands/#restart-the-agent
[12]: /help/
