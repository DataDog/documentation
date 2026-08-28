---
title: Missing Log Bytes
description: "Find out why the Datadog Agent is losing log data when files rotate, and adjust your Agent configuration to prevent it."
further_reading:
- link: "/agent/logs/log_transport/"
  tag: "Documentation"
  text: "Agent Transport for Logs"
- link: "/agent/logs/advanced_log_collection/"
  tag: "Documentation"
  text: "Advanced Log Collection"
- link: "/logs/guide/mechanisms-ensure-logs-not-lost/"
  tag: "Guide"
  text: "Mechanisms to Ensure Logs are Not Lost"
- link: "/agent/troubleshooting/send_a_flare/"
  tag: "Documentation"
  text: "Send an Agent Flare"
---

The Datadog Agent tails your log files and sends what it reads to Datadog. When a file is rotated or deleted before the Agent finishes reading it, whatever the Agent had not read yet is gone. The Agent reports this as missing log bytes.

This usually means the Agent cannot send logs as fast as your applications write them. Instead of dropping data, the Agent slows down how fast it reads from your files. If a file rotates before the Agent catches up, the unread portion is deleted with the old file.

**Note**: The Agent reports unread bytes after rotation when tailing files on Linux and macOS.

If you try the steps below and continue to have trouble, [contact Datadog Support](#reach-out-to-datadog-support).

## Common causes of missing log bytes

- The Agent cannot reach the Datadog intake fast enough. High network latency, intermittent connectivity, a proxy that rate-limits or buffers, or repeated errors from the intake all have this effect. This is the most common cause. See [Sending to Datadog](#sending-to-datadog).
- The Agent is sending logs over TCP instead of HTTPS. TCP sends logs without batching or compression, which limits throughput. See [Sending to Datadog](#sending-to-datadog).
- Compression and batching are using more CPU than the host can spare at your log volume. See [Batching and compression](#batching-and-compression).
- Processing rules or multi-line detection are expensive enough to slow the Agent down on every message. See [Log processing](#log-processing).
- Log files rotate faster than the Agent can finish reading them, even when everything else is keeping up. See [Immediate mitigation](#immediate-mitigation).

## Diagnosis

1. Search the Agent log for [rotation warnings](#rotation-warnings) to confirm that bytes are missing, and note which files and times are affected.
2. Run the [status command][1] and read the [Logs Agent Backpressure](#logs-agent-backpressure-status) section to find which part of log collection is falling behind.
3. Fix the lowest saturated component in that table first. The components above it show low numbers because they are waiting on it, so changing their settings has no effect. Apply the matching changes from [Agent configuration](#agent-configuration).

### Rotation warnings

The Agent writes a warning each time it closes a rotated file that still had unread data:

```text
WARN | After rotation close timeout (60s), there were 148213 bytes remaining unread for file "/var/log/app/app.log". These unread logs are now lost. Consider increasing DD_LOGS_CONFIG_CLOSE_TIMEOUT
```

Search your Agent log for these warnings:

{{< code-block lang="shell" >}}grep "remaining unread" /var/log/datadog/agent.log{{< /code-block >}}

### Logs Agent Backpressure status

Starting in Agent 7.82.0, the [status command][1] includes a **Logs Agent Backpressure** section that shows which part of log collection is falling behind. It keeps about 10 hours of history, so you can still identify the cause after the problem has passed.

{{< code-block lang="shell" >}}sudo datadog-agent status{{< /code-block >}}

You can also find this section in `status.log` inside [an Agent flare][2].

On Agent versions earlier than 7.82.0, this section is not available. Upgrade the Agent to identify the responsible component, or start with [Sending to Datadog](#sending-to-datadog), which covers the most common cause.

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

In this example, `destination_reliable_0` is saturated, which means the Agent cannot send to Datadog fast enough. The `processor`, `strategy`, and `worker` rows are low because they are all waiting on it.

#### Overall state

| State | Meaning |
| --- | --- |
| `HEALTHY` | Nothing is falling behind, and nothing has in the last 30 minutes. |
| `WARNING` | Nothing is falling behind, but something was in the last 30 minutes. Compare `Last saturated` against the time your logs went missing. |
| `SATURATED` | Something is falling behind. |

#### Table columns

Each row is one part of log collection. The percentages show how much of its time that component spends working instead of waiting. They are not CPU usage: a component waiting on the network reads close to 100% while using almost no CPU. A component is considered saturated at 90% or above.

| Column | Meaning |
| --- | --- |
| `Component` | The part of log collection this row describes. See the table in [Agent configuration](#agent-configuration). |
| `Instance` | Which copy of that component. The Agent runs several of each in parallel. |
| `Current` | How busy the component has been over roughly the last 15 seconds. |
| `5m`, `30m`, `2h`, `5h`, `10h` | Averages and peaks over longer windows. |
| `30m saturated` | How long the component spent at 90% or above in the last 30 minutes. |
| `Last saturated` | When the component was last at 90% or above. A `-` means it never has been. |

Backpressure often clears before you run the status command, so the history columns are frequently the only evidence left. This history is held in memory and resets when the Agent restarts. Take [a flare][2] before restarting an Agent you are troubleshooting.

If only one instance of a component is saturated, a single high-volume log source is usually responsible. If every instance is saturated, the Agent has reached a limit that affects all of your logs.

## Immediate mitigation

Configuration changes take time to have an effect, and rotation continues in the meantime. Apply the settings in this section alongside the changes in [Agent configuration](#agent-configuration).

Every change on this page requires an Agent restart to take effect. Restarting also clears the backpressure history, so take [a flare][2] before you restart an Agent you are still diagnosing. For restart commands, see [Start, stop, and restart the Agent][3].

Raising `close_timeout` gives the Agent more time to finish reading a file after it rotates. Raising `open_files_limit` helps when the Agent tails more files than it has slots for, which is common with wildcard paths:

{{< tabs >}}
{{% tab "Configuration file" %}}

{{< code-block lang="yaml" filename="datadog.yaml" >}}
logs_config:
  close_timeout: 180
  open_files_limit: 750
{{< /code-block >}}

{{% /tab %}}
{{% tab "Environment variables" %}}

```shell
DD_LOGS_CONFIG_CLOSE_TIMEOUT=180
DD_LOGS_CONFIG_OPEN_FILES_LIMIT=750
```

{{% /tab %}}
{{< /tabs >}}

`close_timeout` defaults to `60` seconds. `open_files_limit` defaults to `500`, or `200` on macOS. For more on file limits, see [Increase the Number of Log Files Tailed by the Agent][4].

Neither setting fixes the underlying throughput problem. They widen the window the Agent has to catch up.

You can also change how your applications rotate logs. Keeping rotated files on disk longer, or rotating at a larger size, gives the Agent more time to catch up.

## Agent configuration

Find the saturated component from the status output, then apply the matching changes.

| Component | What it means | Where to start |
| --- | --- | --- |
| `destination_reliable_N` | The Agent cannot send to Datadog fast enough. | [Sending to Datadog](#sending-to-datadog) |
| `strategy` | Batching and compressing logs is the constraint. | [Batching and compression](#batching-and-compression) |
| `worker` | Sending is backed up. Almost always caused by the destination. | [Sending to Datadog](#sending-to-datadog) |
| `processor` | Processing each log line is the constraint. | [Log processing](#log-processing) |

All of the settings below belong under `logs_config` in your `datadog.yaml` file. Most of them ship with the Agent. For their defaults and environment variables, see the **Log collection Configuration** section of the [example configuration file][5].

**Note**: Some settings on this page are not listed in the example configuration file. They are still valid.

### Sending to Datadog

This is the most common origin of the problem.

First, confirm the Agent is using HTTPS rather than TCP. The **Logs Agent** section of the status output shows the active transport. The Agent tests HTTPS connectivity at startup and falls back to TCP if that test fails. TCP limits throughput because it sends logs without batching or compression. Setting `force_use_http` prevents the fallback:

{{< code-block lang="yaml" filename="datadog.yaml" >}}
logs_config:
  force_use_http: true
{{< /code-block >}}

Also check whether `force_use_tcp`, `socks5_proxy_address`, or `additional_endpoints` are set, since each can put the Agent back on TCP.

Next, look at how many payloads the Agent sends at once. The further your hosts are from your [Datadog site][6], the longer each payload takes to acknowledge. Filling that time requires more concurrency. The Agent scales concurrency automatically up to an internal limit. Raising `batch_max_concurrent_send` sets a fixed level above that limit:

{{< code-block lang="yaml" filename="datadog.yaml" >}}
logs_config:
  batch_max_concurrent_send: 10
{{< /code-block >}}

If saturation continues, the constraint is likely outside the Agent:

- Check whether a [proxy][7] between your hosts and Datadog is rate-limiting or buffering logs.
- Check that your network allows traffic to the [log intake endpoints][8] without added latency.
- Check the Agent log for repeated errors from the intake. The Agent retries failed sends indefinitely, so a persistent error appears as sustained saturation rather than immediate data loss. Fix the error rather than tuning around it.

### Batching and compression

Compression is the most CPU-intensive part of log collection and can use a full core at high volume.

The Agent compresses with zstd at level `1` by default, which is already the cheapest setting. If you have raised the compression level or switched to gzip, lowering it returns CPU to the Agent at the cost of more bandwidth:

{{< code-block lang="yaml" filename="datadog.yaml" >}}
logs_config:
  compression_kind: zstd
  zstd_compression_level: 1
{{< /code-block >}}

The Agent spreads your log sources across four pipelines by default, one per CPU. A single high-volume source stays on one pipeline and can only use one CPU for compression. If your volume is spread across many sources and the destination rows are healthy, adding pipelines gives the Agent more CPUs to work with:

{{< code-block lang="yaml" filename="datadog.yaml" >}}
logs_config:
  pipelines: 8
{{< /code-block >}}

You can also adjust how the Agent groups logs into batches with `batch_wait` (default `5` seconds), `batch_max_content_size` (default 5 MB, measured before compression), and `batch_max_size` (default `1000` logs).

### Log processing

Processing cost comes from the number of [processing rules][9] you have configured and the complexity of their patterns.

Global processing rules run against every log the Agent collects, so their cost multiplies with your total volume. Moving a rule to the specific source it applies to is usually the largest improvement available:

{{< code-block lang="yaml" filename="conf.d/myapp.d/conf.yaml" >}}
logs:
  - type: file
    path: /var/log/app/app.log
    service: myapp
    source: myapp
    log_processing_rules:
      - type: exclude_at_match
        name: exclude_debug
        pattern: \[DEBUG\]
{{< /code-block >}}

[Auto multi-line detection][10] also adds per-message cost. On high-volume sources with unpredictable formats, configuring an explicit multi-line pattern is cheaper than automatic detection.

Also check whether the host has CPU available. Other workloads competing with the Agent produce the same result.

## Log volume reduction

If no single change is enough, send fewer logs. Use an `exclude_at_match` processing rule to drop logs you do not need before they leave the host:

{{< code-block lang="yaml" filename="datadog.yaml" >}}
logs_config:
  processing_rules:
    - type: exclude_at_match
      name: exclude_health_checks
      pattern: GET /health
{{< /code-block >}}

Filtering or sampling at the application level, before logs are written to disk, avoids the cost entirely.

## Verification

After the Agent restarts, confirm that your changes had an effect:

1. Wait through a period of typical log volume, then run the status command again:
   {{< code-block lang="shell" >}}sudo datadog-agent status{{< /code-block >}}
2. Check that the component you changed reports below 90%. **Overall state** reports `WARNING` for 30 minutes after saturation clears, so allow that time to pass before expecting `HEALTHY`.
3. Search the Agent log for new rotation warnings:
   {{< code-block lang="shell" >}}grep "remaining unread" /var/log/datadog/agent.log{{< /code-block >}}

If the same component is still saturated, apply the next change in its section. If a different component has become the lowest saturated one, move to that section.

## Reach out to Datadog Support

If the steps above do not resolve the issue, [contact Datadog Support][11]. Take [a flare][2] while the pipeline is saturated, since the backpressure history resets when the Agent restarts.

Include which component was saturated, the times your logs went missing, and any configuration changes you have already made.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/configuration/agent-commands/#agent-status-and-information
[2]: /agent/troubleshooting/send_a_flare/
[3]: /agent/configuration/agent-commands/#restart-the-agent
[4]: /logs/guide/increase-number-of-log-files-tailed/
[5]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_linux.yaml.example
[6]: /getting_started/site/
[7]: /agent/configuration/proxy/
[8]: /agent/configuration/network/
[9]: /agent/logs/advanced_log_collection/
[10]: /agent/logs/auto_multiline_detection/
[11]: /help/
