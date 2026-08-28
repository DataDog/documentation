---
title: Troubleshoot Missing Log Bytes
description: "Investigate unread log data reported after file rotation and identify backpressure in the Datadog Agent logs pipeline."
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

On Linux and macOS, the Datadog Agent continues reading a rotated log file for `logs_config.close_timeout`, which defaults to 60 seconds. If the Agent has not reached the end of the file when this timeout expires, it closes the file and reports the unread portion as missing log bytes.

Missing log bytes indicate that file rotation outpaced the Agent's reads during the close window. Backpressure in the logs pipeline can slow those reads, but rotation frequency and the volume written to an individual file also affect whether the Agent finishes before the timeout.

If the steps on this page do not resolve the issue, [contact Datadog Support](#contact-datadog-support).

## Possible causes

- The Agent cannot deliver payloads to the Datadog intake because of network, proxy, authentication, or intake errors.
- The time required to send payloads is limiting throughput.
- Encoding, batching, or compression is limiting a logs pipeline.
- Processing rules or multi-line processing are limiting a logs pipeline.
- The affected file rotates before the Agent can read the data written during the rotation interval, even when the downstream pipeline is not saturated.

## Diagnose missing log bytes

1. Search the Agent log for [rotation warnings](#confirm-missing-bytes-from-rotation). Record the affected file paths, timestamps, and number of unread bytes.
2. If you use Agent 7.82.0 or later, run the [status command][1] and inspect [Logs Agent Backpressure](#interpret-logs-agent-backpressure). Compare the retained history with the warning timestamps.
3. If several components are saturated, start with the furthest downstream component. Backpressure propagates toward the file tailer, so an upstream component can appear busy because a downstream component is not accepting data.
4. Apply one relevant change from [Tune the Agent](#tune-the-agent), restart the Agent, and [verify the result](#verify-the-result) under representative log volume.

### Confirm missing bytes from rotation

The Agent writes a warning when the rotation close timeout expires and the rotated file still contains unread data:

```text
WARN | After rotation close timeout (60s), there were 148213 bytes remaining unread for file "/var/log/app/app.log". These unread logs are now lost. Consider increasing DD_LOGS_CONFIG_CLOSE_TIMEOUT
```

Search the Agent log for the warning text:

{{< code-block lang="shell" >}}grep "remaining unread" /var/log/datadog/agent.log{{< /code-block >}}

The warning confirms file-rotation loss. It does not identify which logs pipeline component, if any, caused the Agent to fall behind.

### Interpret Logs Agent Backpressure

Agent versions 7.82.0 and later include a **Logs Agent Backpressure** section in the [status command][1]. The section reports recent utilization for the processor, batching strategy, sender workers, and destinations. It retains peak utilization for approximately 10 hours and detailed saturation duration for 30 minutes.

{{< code-block lang="shell" >}}sudo datadog-agent status{{< /code-block >}}

You can also find the section in `status.log` inside [an Agent flare][2]. The history is stored in memory and resets when the Agent restarts. Take a flare before restarting an Agent that you are diagnosing.

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

In this example, `destination_reliable_0` is saturated. Start by investigating delivery to the intake before changing processor or batching settings.

#### Overall state

| State | Meaning |
| --- | --- |
| `HEALTHY` | No component is saturated and none was saturated in the last 30 minutes. |
| `WARNING` | No component is saturated, but at least one was saturated in the last 30 minutes. Compare `Last saturated` with the missing-bytes warning timestamps. |
| `SATURATED` | At least one component reached the saturation threshold within the current 15-second window. |

Saturation means that a component spent at least 90% of its sampled time working instead of waiting. Saturation alone does not mean that logs were lost. Use the rotation warning as the loss signal and the table to identify a possible constraint.

#### Table columns

| Column | Meaning |
| --- | --- |
| `Component` | The logs pipeline stage. See [Choose a tuning action](#choose-a-tuning-action). |
| `Instance` | The pipeline or destination instance. |
| `Current` | Utilization smoothed over approximately 15 seconds. |
| `5m avg/max` and `30m avg/max` | Average and peak utilization during the stated window. |
| `2h max`, `5h max`, and `10h max` | Peak utilization during the stated window. |
| `30m saturated` | Time spent at or above 90% utilization during the last 30 minutes. |
| `Last saturated` | Time of the latest retained saturation sample. A `-` means that no retained sample is available. |

If one instance is saturated and its peers are not, compare the log sources assigned to that pipeline. A high-volume source remains on one pipeline, so adding pipelines does not divide that source across CPUs. Saturation across several instances can indicate a broader CPU, delivery, or capacity constraint.

## Limit loss during investigation

Increase `close_timeout` to give the Agent more time to drain a rotated file while you investigate the throughput constraint. The following example increases the window from 60 seconds to 180 seconds:

{{< tabs >}}
{{% tab "Configuration file" %}}

{{< code-block lang="yaml" filename="datadog.yaml" >}}
logs_config:
  close_timeout: 180
{{< /code-block >}}

{{% /tab %}}
{{% tab "Environment variable" %}}

```shell
DD_LOGS_CONFIG_CLOSE_TIMEOUT=180
```

{{% /tab %}}
{{< /tabs >}}

Choose a value that gives the Agent enough time to drain the unread bytes under representative volume. Increase the value in measured increments and compare the unread byte count in new warnings after each test. A longer timeout keeps rotated files open longer and can increase file descriptor and disk usage when files rotate frequently.

`close_timeout` does not increase sustained throughput. If the warning continues, reduce the rate at which the application writes to or rotates the affected file, or address the saturated component.

If the Agent does not tail some matching files at all, investigate `logs_config.open_files_limit` separately. The default is `500`, or `200` on macOS. Before increasing it, compare the **CoreAgentProcessOpenFiles** and **OSFileLimit** values in the status output. For configuration details, see [Increase the Number of Log Files Tailed by the Agent][3].

## Tune the Agent

Every configuration change in this section requires an Agent restart. For restart commands, see [Start, stop, and restart the Agent][10]. Change one group of settings at a time so that you can attribute the result. Increasing parallelism or buffers can raise CPU, memory, file descriptor, network bandwidth, and connection usage.

### Choose a tuning action

| Component | Interpretation | Start with |
| --- | --- | --- |
| `destination_reliable_N` | The HTTP destination is busy sending or retrying payloads. | [Check intake delivery](#check-intake-delivery) |
| `worker` | Sender workers are not draining payloads as fast as the batching strategy produces them. | [Check intake delivery](#check-intake-delivery), then [adjust HTTP send concurrency](#adjust-http-send-concurrency) if delivery succeeds without persistent errors |
| `strategy` | Encoding, batching, or compression is limiting the pipeline. | [Reduce compression work](#reduce-compression-work) or [add logs pipelines](#add-logs-pipelines) |
| `processor` | Per-message processing is limiting the pipeline. | [Reduce log processing](#reduce-log-processing) or [add logs pipelines](#add-logs-pipelines) |

### Check intake delivery

Confirm the active transport in the **Logs Agent** section of the status output. HTTPS supports batching, compression, and concurrent sends. TCP does not use these mechanisms.

The Agent can use TCP when an HTTP connectivity check fails or when `force_use_tcp`, `socks5_proxy_address`, or `additional_endpoints` is configured. Resolve HTTP connectivity before setting `force_use_http`; forcing HTTP on a network that does not permit it stops log delivery.

When a destination is saturated, inspect the Agent log and the **RetryCount** and **RetryTimeSpent** status values. Fix authentication errors, rejected payloads, proxy limits, DNS failures, and connection failures before tuning concurrency. More concurrent sends do not correct persistent delivery errors.

- Check whether a [proxy][5] rate-limits, buffers, or limits simultaneous connections.
- Check that your network allows traffic to the [log intake endpoints][6].
- Confirm that the configured [Datadog site][4] is correct.

### Adjust HTTP send concurrency

Use `batch_max_concurrent_send` only for HTTPS delivery. The setting accepts nonnegative integers. A positive value sets fixed send concurrency per logs pipeline, so the approximate total is `logs_config.pipelines × batch_max_concurrent_send`. The default value `0` uses the concurrency behavior provided by the installed Agent version.

On Agent 7.82.x, `0` allows concurrency to scale from one to 10 sends per pipeline based on intake latency. Setting the value to `10` fixes concurrency at that existing upper bound; it does not raise the maximum.

For example, the following configuration tests 20 concurrent sends per pipeline. With four logs pipelines, the Agent can make approximately 80 concurrent sends. The value `20` is an example for a controlled test, not a general target:

{{< code-block lang="yaml" filename="datadog.yaml" >}}
logs_config:
  batch_max_concurrent_send: 20
{{< /code-block >}}

Increase this value only when `worker` or `destination_reliable_N` is saturated, deliveries are succeeding, and the host has network and connection capacity. Monitor proxy connection limits, destination errors, Agent memory, and whether missing-bytes warnings stop. Lower the value if errors or resource usage increase.

### Reduce compression work

The Agent uses zstd compression level `1` by default. If you configured gzip or a higher compression level, first restore the defaults:

{{< code-block lang="yaml" filename="datadog.yaml" >}}
logs_config:
  compression_kind: zstd
  zstd_compression_level: 1
{{< /code-block >}}

If `strategy` remains saturated and the host is CPU-constrained, test disabling compression only when the network and intake path can accept the additional bytes:

{{< code-block lang="yaml" filename="datadog.yaml" >}}
logs_config:
  use_compression: false
{{< /code-block >}}

Disabling compression can move the constraint from CPU to network delivery. Re-enable compression if destination utilization, bandwidth, or delivery latency increases.

### Add logs pipelines

The Agent uses up to four logs pipelines by default, limited by the number of logical CPUs available to the Agent. Additional pipelines can improve parallelism when multiple log sources are distributed across the pipelines and CPU is available.

For example, test eight pipelines on a host with at least eight logical CPUs available to the Agent. The value `8` is an example, not a general target:

{{< code-block lang="yaml" filename="datadog.yaml" >}}
logs_config:
  pipelines: 8
{{< /code-block >}}

Do not set more pipelines than the CPU capacity available to the Agent without workload-specific testing. Additional pipelines increase memory use and can multiply HTTP send concurrency. They do not split one log source across pipelines.

### Reduce log processing

[Processing rules][7] consume work for each matching message. Global rules run against every log collected by the Agent. When a rule applies to one source, move it to that source's integration configuration:

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

Review overlapping rules and patterns that scan large portions of each message. If you do not need [auto multi-line detection][8], disable it:

{{< code-block lang="yaml" filename="datadog.yaml" >}}
logs_config:
  auto_multi_line_detection: false
{{< /code-block >}}

If the source has a known multi-line format, configure a source-specific pattern and compare processor utilization before and after the change.

### Buffer short bursts

The advanced `message_channel_size` and `payload_channel_size` settings control in-memory queues between logs pipeline stages. Larger buffers can absorb short bursts, but they do not increase sustained processing or delivery capacity. They also increase memory use and can delay when backpressure becomes visible.

Adjust these settings only after identifying bursty traffic and confirming that CPU and destination throughput can drain the queued data. For workload-specific values, [contact Datadog Support](#contact-datadog-support).

## Reduce log volume

If the Agent cannot process the required volume within the available host and network capacity, filter logs that you do not need. An `exclude_at_match` processing rule drops matching logs before they leave the host:

{{< code-block lang="yaml" filename="datadog.yaml" >}}
logs_config:
  processing_rules:
    - type: exclude_at_match
      name: exclude_health_checks
      pattern: GET /health
{{< /code-block >}}

Filtering or sampling in the application avoids writing the excluded logs to disk and removes their processing cost from the Agent.

## Verify the result

After restarting the Agent, test during representative log volume:

1. Run the status command:
   {{< code-block lang="shell" >}}sudo datadog-agent status{{< /code-block >}}
2. Confirm that the targeted component spends less time at or above 90% utilization. The overall state remains `WARNING` for up to 30 minutes after saturation clears.
3. Check the Agent log for rotation warnings with timestamps later than the restart:
   {{< code-block lang="shell" >}}grep "remaining unread" /var/log/datadog/agent.log{{< /code-block >}}
4. Compare unread byte counts in new warnings, retry counts, Agent CPU and memory, network bandwidth, and open connections with the baseline you recorded.

If the same component remains saturated and new rotation warnings appear, revert changes that did not help and test the next relevant adjustment. If the furthest downstream saturated component changes, investigate that component before increasing the previous setting again.

## Contact Datadog Support

If the steps on this page do not resolve the issue, [contact Datadog Support][9]. Take [a flare][2] while the pipeline is saturated and before restarting the Agent.

Include the affected file paths, warning timestamps and byte counts, saturated components, Agent version, active logs configuration, and changes already tested.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/configuration/agent-commands/#agent-status-and-information
[2]: /agent/troubleshooting/send_a_flare/
[3]: /logs/guide/increase-number-of-log-files-tailed/
[4]: /getting_started/site/
[5]: /agent/configuration/proxy/
[6]: /agent/configuration/network/
[7]: /agent/logs/advanced_log_collection/
[8]: /agent/logs/auto_multiline_detection/
[9]: /help/
[10]: /agent/configuration/agent-commands/#restart-the-agent
