---
title: Logs Pipeline Backpressure
disable_toc: false
further_reading:
- link: "/agent/troubleshooting/agent_check_status/"
  tag: "Documentation"
  text: "Get the Status of an Agent Check"
- link: "/agent/logs/advanced_log_collection/"
  tag: "Documentation"
  text: "Advanced Log Collection"
- link: "/agent/troubleshooting/send_a_flare/"
  tag: "Documentation"
  text: "Send an Agent Flare"
---

Backpressure occurs when one stage of the Agent's logs pipeline cannot keep up with the volume of logs flowing into it. The slow stage fills its buffers, and components upstream of it slow down or block while they wait. The Agent reports per-component utilization in the logs section of the `status` command so you can identify which stage is the bottleneck and take corrective action.

## Overview

The Agent's logs pipeline moves each log line through a series of components, such as a processor and a sender. Each component samples how busy it is and reports a *utilization ratio*: the fraction of time the component spends doing work versus sitting idle. A component whose utilization stays at or near 100% is busy nearly all the time and is a likely bottleneck.

The status output reports utilization with two smoothing windows so you can distinguish a brief spike from sustained pressure:

| Signal | Window | What it tells you |
|--------|--------|-------------------|
| Current utilization | Short (approximately 15-second) exponential moving average | Near-real-time saturation. Use this to find the component under pressure at this moment. |
| Average utilization | Longer (approximately 30-second) exponential moving average | The recent trend. Use this to confirm that pressure is sustained rather than a momentary spike. |

The status also reports how long each component has spent saturated over rolling 1-minute, 5-minute, and 30-minute windows, so you can tell whether backpressure is ongoing or already resolved.

## Read the status output

Run the status command and find the **Logs Agent** section:

```shell
sudo datadog-agent status
```

On Windows, run the command from an Administrator PowerShell prompt:

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
```

Each pipeline component reports a line with its name, instance, current and average utilization, buffered items and bytes, and a backpressure state. The following is representative output:

```text
  Backpressure
  ============
    State: SATURATED

    Component        Instance   Current   Average   Items   Saturated (30m)
    processor        0          12%       9%        3       0s
    sender           0          99%       97%       1024    214s
```

The fields map to the per-component metrics as follows:

| Field | Meaning |
|-------|---------|
| Component | The pipeline stage, such as `processor` or `sender`. The name identifies which stage of the pipeline is reporting. |
| Instance | The instance index for that component when more than one runs in parallel. |
| Current | The short-window utilization ratio. This value drives the component's state. |
| Average | The longer-window utilization ratio, showing the recent trend. |
| Items | The number of items held in the component and its buffers. A growing or consistently high count indicates the component is buffering work it cannot drain. |
| Saturated (30m) | The number of seconds the component has spent saturated within the last 30 minutes. |

### Backpressure states

The status reports an overall state, and each component contributes to it:

| State | Meaning |
|-------|---------|
| OK | Utilization is below the saturation threshold. The pipeline is keeping up. |
| WARNING | The component is not saturated at this moment, but it was saturated at some point within the last 30 minutes. Recent pressure has eased but might recur. |
| SATURATED | The component's current utilization is at or above the saturation threshold. This component is the active bottleneck. |

A `SATURATED` sender combined with a low-utilization processor points to a downstream bottleneck: the processor is idle because the saturated sender is holding it back.

## Take corrective action

First, identify the saturated component from the **Current** column and the state. The component name tells you which stage to investigate.

### Sender saturation

A saturated `sender` means the Agent cannot transmit logs to the Datadog intake fast enough. Common causes and corrective actions:

- Network throughput or connectivity limits between the host and the logs intake. Confirm the host can reach the [Datadog endpoints][1] and check for packet loss or high latency.
- A proxy or load balancer in the path is rate-limiting or buffering traffic. See [Agent Proxy Configuration][2].
- Log volume exceeds what a single connection can drain. Confirm that compression is enabled and review the transport settings in [Agent Log Collection Transport][3].

### Processor saturation

A saturated `processor` means log processing is CPU-bound on the host. Common causes and corrective actions:

- Complex or numerous processing rules. Review the `log_processing_rules` defined in your configuration and remove rules you no longer need.
- High overall log throughput on a host with limited CPU. Check host CPU usage, and see [High CPU or Memory Consumption][4].
- Multiline aggregation overhead. Review your multiline configuration in [Advanced Log Collection][5].

### Reduce log volume

When no single component can be tuned enough to keep up, reduce the volume entering the pipeline:

- Exclude logs you do not need to send with `exclude_at_match` processing rules. See [Advanced Log Collection][5].
- Filter or sample noisy sources at the application or collection level before they reach the Agent.

After making a change, run the status command again and confirm that the **Current** utilization and the **Saturated (30m)** counter for the affected component decrease.

## Monitor backpressure with metrics

The Agent emits the per-component utilization data as metrics so you can build dashboards and monitors that alert before backpressure causes a slowdown. Each metric is tagged with `name` (the component) and `instance`.

| Metric | Description |
|--------|-------------|
| `logs_component_utilization.ratio` | The utilization ratio over the longer (approximately 30-second) moving-average window. Use this for trend dashboards. |
| `logs_component_utilization.ratio_short` | The utilization ratio over the short moving-average window. Use this for near-real-time backpressure detection and alerting. |
| `logs_component_utilization.items` | The number of items held in a component and its buffers. |

**Note**: Create a monitor on `logs_component_utilization.ratio_short` grouped by `name` and `instance` to catch a saturated component before it causes sustained backpressure.

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
