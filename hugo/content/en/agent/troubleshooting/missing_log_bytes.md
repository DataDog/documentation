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

The Datadog Agent continues reading a rotated log file for `logs_config.close_timeout`, which defaults to 60 seconds. If the Agent has not reached the end of the file when this timeout expires, it closes the file and reports the unread portion as missing log bytes.

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

## Give the Agent more time to read rotated files

Increase `logs_config.close_timeout` when the Agent needs more than the default 60 seconds to finish reading a rotated file. This example increases the timeout to 180 seconds:

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

Set the timeout long enough for the Agent to catch up under representative log volume. Longer timeouts keep rotated files open and can increase file descriptor and disk usage.

If the Agent does not tail all matching files, check `logs_config.open_files_limit` instead. For configuration details, see [Increase the Number of Log Files Tailed by the Agent][3].

## Tune the Agent

The examples assume the default logs configuration. Apply the change that matches the saturated component.

### Choose a tuning action

| Component | Interpretation | Start with |
| --- | --- | --- |
| `destination_reliable_N` | The HTTP destination is busy sending or retrying payloads. | [Check log delivery](#check-log-delivery) |
| `worker` | Sender workers are not draining payloads as fast as the batching strategy produces them. | [Check log delivery](#check-log-delivery), then [increase HTTP send concurrency](#increase-http-send-concurrency) if delivery succeeds |
| `strategy` | Encoding, batching, or compression is limiting the pipeline. | [Reduce compression CPU usage](#reduce-compression-cpu-usage) or [add logs pipelines](#add-logs-pipelines) |
| `processor` | Per-message processing is limiting the pipeline. | [Reduce log processing](#reduce-log-processing) or [add logs pipelines](#add-logs-pipelines) |

### Check log delivery

When `destination_reliable_N` is saturated, check the Agent log and the **RetryCount** and **RetryTimeSpent** status values. Resolve authentication, rejection, proxy, DNS, and connection errors before increasing concurrency.

Confirm that the **Logs Agent** status shows HTTPS. `batch_max_concurrent_send` does not apply to TCP. If the Agent uses TCP unexpectedly, check HTTP connectivity and the `force_use_tcp`, `socks5_proxy_address`, and `additional_endpoints` settings.

Verify the [proxy configuration][5], [network access to Datadog endpoints][6], and [Datadog site][4].

### Increase HTTP send concurrency

On Agent 7.82.x, the default `batch_max_concurrent_send: 0` scales from one to 10 concurrent sends per logs pipeline. If `worker` or `destination_reliable_N` remains saturated and deliveries succeed, test a value above 10:

{{< code-block lang="yaml" filename="datadog.yaml" >}}
logs_config:
  batch_max_concurrent_send: 20
{{< /code-block >}}

A positive value sets fixed concurrency for each pipeline. If the Agent runs four pipelines, a value of `20` allows approximately 80 concurrent sends. Reduce the value if proxy limits, destination errors, memory use, or network use increase.

### Reduce compression CPU usage

By default, the Agent compresses logs with zstd at level `1`. Although `compression_level` defaults to `6`, that setting applies only to gzip. Zstd uses `zstd_compression_level`.

If `strategy` is saturated and the Agent's CPU usage is high, test disabling compression:

{{< code-block lang="yaml" filename="datadog.yaml" >}}
logs_config:
  use_compression: false
{{< /code-block >}}

Disabling compression increases network traffic. Re-enable it if bandwidth use, destination utilization, or delivery latency increases.

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

Review overlapping rules and patterns that scan large portions of each message. Automatic multi-line detection is enabled by default. If the `processor` component is saturated and your logs do not require multi-line aggregation, test disabling it:

{{< code-block lang="yaml" filename="datadog.yaml" >}}
logs_config:
  auto_multi_line_detection: false
{{< /code-block >}}

If the source has a known multi-line format, configure a source-specific pattern instead of disabling aggregation. Compare processor utilization and log grouping before and after the change.

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

Test each change under representative log volume:

1. Run the status command:
   {{< code-block lang="shell" >}}sudo datadog-agent status{{< /code-block >}}
2. Confirm that the targeted component spends less time at or above 90% utilization. The overall state remains `WARNING` for up to 30 minutes after saturation clears.
3. Check the Agent log for new rotation warnings:
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
