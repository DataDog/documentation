---
title: Logs Agent Backpressure
disable_toc: false
description: "Diagnose and resolve logs pipeline backpressure in the Datadog Agent using the status command, and take corrective action to prevent log loss."
further_reading:
- link: "/agent/troubleshooting/agent_check_status/"
  tag: "Documentation"
  text: "Get the Status of an Agent Check"
- link: "/agent/logs/log_transport/"
  tag: "Documentation"
  text: "Agent Log Collection Transport"
- link: "/agent/logs/advanced_log_collection/"
  tag: "Documentation"
  text: "Advanced Log Collection"
- link: "/agent/troubleshooting/send_a_flare/"
  tag: "Documentation"
  text: "Send an Agent Flare"
---

Backpressure occurs when one stage of the Agent's logs pipeline cannot keep up with the volume of logs flowing into it. The slow stage fills its buffers, and components upstream of it slow down or block while they wait. If the pressure reaches the file tailer, the Agent stops reading the source file. When that file rotates or is deleted before the Agent catches up, the unread logs are lost.

The Agent reports per-component utilization in the **Logs Agent Backpressure** section of the `status` command. Use it to confirm whether backpressure is the cause of missing logs, identify which stage is the bottleneck, and take corrective action.

## Symptoms

Backpressure usually surfaces as one of these symptoms before you observe data loss:

- Lower log volume in Datadog than the source produces.
- Missing logs from files that rotate frequently, such as high-throughput application logs.
- Missed-bytes or file-rotation warnings in the Agent logs.
- A rising retry count or dropped logs in the **Logs Agent** status section.

These symptoms are downstream effects. The backpressure diagnostics tell you whether a saturated pipeline component caused them and which stage to fix.

## Overview

The logs pipeline moves each log line through a series of components:

```text
launcher -> tailer -> decoder -> processor -> strategy -> sender -> destination
```

Each component samples how busy it is and reports a *utilization ratio*: the fraction of time the component spends doing work versus sitting idle. The Agent measures this ratio as an exponential moving average over a short (approximately 15-second) window, and also samples mid-operation so that a component blocked inside a single long call still registers as busy. A component whose utilization stays at or near 100% is busy nearly all the time and is a likely bottleneck.

The status output reports current utilization alongside averages and maximums over longer windows so you can distinguish a brief spike from sustained pressure. It also reports how long each component has spent saturated and when it was last saturated, so you can correlate backpressure with the time you observed missing logs.

The diagnostics cover these pipeline components:

| Component | Role |
|-----------|------|
| `processor` | Applies processing rules and prepares each log message. |
| `strategy` | Batches and compresses messages before transmission. |
| `worker` | Manages the queue between processing and transmission. |
| `destination` | Transmits batches to the Datadog logs intake. A reliable destination, such as `destination_reliable_0`, retries failed sends. |

The `sender` aggregates destination capacity and does not report its own utilization, so it does not appear in the table.

## Read the status output

Run the status command and find the **Logs Agent Backpressure** section:

```shell
sudo datadog-agent status
```

On Windows, run the command from an Administrator PowerShell prompt:

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
```

The section reports an overall state, a reason, and a per-component table. The following is representative output:

```text
  Logs Agent Backpressure
  =======================

    Overall state: SATURATED
    Reason: destination_reliable_0 was saturated for 3m20s in the last 30m

    Component               Instance   Current   5m avg/max   30m avg/max   10h max   30m saturated   Last saturated
    processor               0          20%       18/26%       22/41%        55%       0s              -
    strategy                0          14%       12/19%       15/22%        22%       0s              -
    destination_reliable    0          93%       82/93%       71/93%        93%       3m20s           12:09:42
```

The fields map to the per-component data as follows:

| Field | Meaning |
|-------|---------|
| Component | The pipeline stage reporting the measurement. |
| Instance | The instance index for the component when more than one runs in parallel. |
| Current | The short-window utilization ratio. This value drives the component's state. |
| 5m avg/max | The average and peak utilization over the last 5 minutes. |
| 30m avg/max | The average and peak utilization over the last 30 minutes. Use this to confirm pressure is sustained. |
| 10h max | The peak utilization over the last 10 hours, for spotting recurring pressure. |
| 30m saturated | The total time the component spent saturated within the last 30 minutes. |
| Last saturated | The timestamp of the most recent saturation event. Compare this against the time you observed missing logs. |

### Backpressure states

The status reports an overall state, and each component contributes to it. A component is saturated when its current utilization reaches the saturation threshold of approximately 90%.

| State | Meaning |
|-------|---------|
| HEALTHY | Utilization is below the saturation threshold. The pipeline is keeping up. |
| WARNING | The component is not saturated at this moment, but it was saturated at some point within the last 30 minutes. Recent pressure has eased but might recur. |
| SATURATED | The component's current utilization is at or above the saturation threshold. This component is the active bottleneck. |

A `SATURATED` destination combined with a low-utilization processor points to a downstream bottleneck: the upstream components are idle because the saturated destination is holding them back. Always start your investigation at the most downstream saturated component.

The Agent also emits a log line when a component enters sustained saturation and again when it recovers, so you can find historical evidence even after the status window clears:

```text
WARN | Logs Agent pipeline component saturated component=destination instance=0 utilization=98% duration=2m0s
INFO | Logs Agent pipeline component recovered component=destination instance=0 saturated_duration=7m12s
```

## Take corrective action

Identify the most downstream saturated component from the **Current** column and the overall state. The component name tells you which stage to fix.

### Destination saturation

A saturated `destination` means the Agent cannot transmit logs to the Datadog intake fast enough. Take the following actions:

- Confirm the host can reach the [Datadog endpoints][1] and check for packet loss or high latency on the path.
- If a proxy or load balancer sits in the path, confirm it is not rate-limiting or buffering log traffic. See [Agent Proxy Configuration][2].
- Use the HTTPS transport, which compresses payloads and sustains higher throughput than the legacy TCP transport. Set `logs_config.use_http` to `true`. See [Agent Log Collection Transport][3].
- Increase the number of batches sent in parallel by raising `logs_config.batch_max_concurrent_send`. The default is `0` (unbounded for HTTPS); set a higher explicit value when a single connection cannot drain the volume.

### Strategy saturation

A saturated `strategy` means batching or compression cannot keep up. Take the following actions:

- Lower the compression level to trade bandwidth for CPU. Set `logs_config.compression_level` to a value below the default of `6`.
- Tune batch sizing so the Agent forms fewer, larger batches. Review `logs_config.batch_wait` and `logs_config.batch_max_content_size`. See [Agent Log Collection Transport][3].

### Processor saturation

A saturated `processor` means log processing is CPU-bound on the host. Take the following actions:

- Review the `log_processing_rules` in your configuration and remove rules you no longer need. Complex or numerous rules increase per-message cost.
- Review your multiline aggregation configuration in [Advanced Log Collection][5]. Multiline matching adds processing overhead.
- Check host CPU usage. See [High CPU or Memory Consumption][4].

### Reduce log volume

When no single component can be tuned enough to keep up, reduce the volume entering the pipeline:

- Exclude logs you do not need to send with `exclude_at_match` processing rules. See [Advanced Log Collection][5].
- Filter or sample noisy sources at the application or collection level before they reach the Agent.

After making a change, run the status command again and confirm that the **Current** utilization and the **30m saturated** counter for the affected component decrease.

### Prevent rotation-related log loss

If saturation coincides with log loss from rotating files, also reduce the chance that a file rotates before the Agent finishes reading it:

- Increase source-side retention so rotated files remain on disk longer, giving the Agent time to catch up after a backpressure episode.
- Confirm that the [`open_files_limit`][5] is high enough that the Agent does not stop tailing active files.

## Monitor backpressure with metrics

The Agent emits per-component utilization as metrics so you can build dashboards and monitors that alert before backpressure causes a slowdown. Each metric is tagged with `name` (the component) and `instance`.

| Metric | Description |
|--------|-------------|
| `logs_component_utilization.ratio` | The utilization ratio for a component. Use this for trend dashboards and alerting. |
| `logs_component_utilization.items` | The number of items held in a component and its buffers. A growing value indicates the component is buffering work it cannot drain. |
| `logs_component_utilization.bytes` | The number of bytes held in a component and its buffers. |

**Note**: Create a monitor on `logs_component_utilization.ratio` grouped by `name` and `instance` to catch a saturated component before it causes sustained backpressure. For diagnosing a short, severe spike after the fact, use the **Last saturated** timestamp in the status output rather than the smoothed metric.

If you continue to see sustained saturation after taking corrective action, [send an Agent flare][6] and [contact Datadog Support][7].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/configuration/network/
[2]: /agent/configuration/proxy/
[3]: /agent/logs/log_transport/
[4]: /agent/troubleshooting/high_memory_usage/
[5]: /agent/logs/advanced_log_collection/
[6]: /agent/troubleshooting/send_a_flare/
[7]: /help/
