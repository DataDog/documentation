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

After detecting rotation, the Datadog Agent continues reading the rotated log file for `logs_config.close_timeout`, which defaults to 60 seconds. If the Agent has not reached the end of the file when this timeout expires, it closes the file and reports the unread portion as missing log bytes.

Missing log bytes indicate that file rotation outpaced the Agent's reads during the close window. Backpressure in the logs pipeline can slow those reads, but rotation frequency and the volume written to an individual file also affect whether the Agent finishes before the timeout.

## Possible causes

- The Agent cannot deliver payloads to the Datadog intake because of network, proxy, authentication, or intake errors.
- Network or intake latency slows successful log submissions.
- Encoding, batching, or compression is limiting a logs pipeline.
- Processing rules or multi-line processing are limiting a logs pipeline.
- The affected file rotates before the Agent can read the data written during the rotation interval, even when the downstream pipeline is not saturated.

## Diagnose missing log bytes

1. Search the Agent log for [rotation warnings](#confirm-missing-bytes-from-rotation). Record the affected file paths, timestamps, and number of unread bytes.
2. If you use Agent 7.82.0 or later, run the [status command][1] and inspect [Logs Agent Backpressure](#interpret-logs-agent-backpressure). Compare the retained history with the warning timestamps.
3. If several rows in the **Logs Agent Backpressure** table are saturated, investigate them in this order: `destination_reliable_N`, `worker`, `strategy`, and `processor`. Use [Choose a tuning action](#choose-a-tuning-action) to select the next step for the first saturated component in that list.
4. Apply one relevant change, then [verify the result](#verify-the-result) under representative log volume before addressing another component.
5. If the Agent remains unable to process the required volume, [reduce log volume](#reduce-log-volume).

### Confirm missing bytes from rotation

The Agent writes a warning when the rotation close timeout expires and the rotated file still contains unread data:

```text
WARN | After rotation close timeout (60s), there were 148213 bytes remaining unread for file "/var/log/app/app.log". These unread logs are now lost. Consider increasing DD_LOGS_CONFIG_CLOSE_TIMEOUT
```

The warning confirms file-rotation loss. To investigate the cause, compare its timestamp with the **Logs Agent Backpressure** history.

### Interpret Logs Agent Backpressure

Agent versions 7.82.0 and later include a **Logs Agent Backpressure** section in the [status command][1]. The section reports recent utilization for the processor, batching strategy, sender workers, and destinations. It retains peak utilization for approximately 10 hours and detailed saturation duration for 30 minutes.

{{< code-block lang="shell" >}}sudo datadog-agent status{{< /code-block >}}

You can also find the section in `status.log` inside [an Agent flare][2]. Because the history resets when the Agent restarts, take a flare before restarting.

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

Because `destination_reliable_0` is saturated, follow [Resolve delivery errors](#resolve-delivery-errors) before changing processor or batching settings.

#### Overall state

| State | Meaning |
| --- | --- |
| `HEALTHY` | No component is saturated and none was saturated in the last 30 minutes. |
| `WARNING` | No component is saturated, but at least one was saturated in the last 30 minutes. Compare `Last saturated` with the missing-bytes warning timestamps. |
| `SATURATED` | At least one component reached the saturation threshold within the current 15-second window. |

Saturation means that a component spent at least 90% of its sampled time working instead of waiting. Use the rotation warning to confirm loss and the table to identify a possible constraint.

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

## Give the Agent more time to read rotated files

Increase `logs_config.close_timeout` when the Agent needs more than the default 60 seconds to finish reading a rotated file. To use a 180-second timeout:

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

After changing the timeout, [search for new rotation warnings](#confirm-missing-bytes-from-rotation) during representative log volume. If warnings continue, increase the timeout again or [select an action for the saturated component](#choose-a-tuning-action). Longer timeouts keep rotated files open and can increase file descriptor and disk usage.

If the Agent does not tail all matching files, check `logs_config.open_files_limit` instead. For configuration details, see [Increase the Number of Log Files Tailed by the Agent][3].

## Tune the Agent

### Choose a tuning action

| Component | Interpretation | Start with |
| --- | --- | --- |
| `destination_reliable_N` | Log submissions are delayed or retried. | [Resolve delivery errors](#resolve-delivery-errors) |
| `worker` | Payloads are waiting to be sent. | [Resolve delivery errors](#resolve-delivery-errors), then [increase HTTP send concurrency](#increase-http-send-concurrency) if delivery succeeds |
| `strategy` | Encoding, batching, or compression work is at capacity. | [Disable compression](#disable-compression) or [increase pipeline parallelism](#increase-pipeline-parallelism) |
| `processor` | Log processing is at capacity. | [Reduce log processing](#reduce-log-processing) or [increase pipeline parallelism](#increase-pipeline-parallelism) |

### Resolve delivery errors

If `destination_reliable_N` is saturated, open the [Agent log file][10] and inspect entries near the missing-byte warning timestamp for failed or retried submissions. Resolve authentication, rejection, proxy, DNS, and connection errors. Verify the [proxy configuration][5], [network access to Datadog endpoints][6], and [Datadog site][4].

Increase `batch_max_concurrent_send` only when submissions succeed and the **Logs Agent** status shows HTTPS.

### Increase HTTP send concurrency

On Agent 7.82.x, the default `batch_max_concurrent_send: 0` scales from one to 10 sends per logs pipeline based on intake latency. If `worker` or `destination_reliable_N` remains saturated while deliveries succeed, consider setting a fixed value such as `16`:

{{< code-block lang="yaml" filename="datadog.yaml" >}}
logs_config:
  batch_max_concurrent_send: 16
{{< /code-block >}}

A fixed value applies to each pipeline and uses more Agent CPU, memory, network bandwidth, and outbound connections.

### Disable compression

For HTTPS delivery, compression is enabled by default. If `strategy` is saturated and the Agent's CPU usage is high, consider disabling compression. This reduces compression work, but increases payload size and the number of bytes sent to the logs intake:

{{< code-block lang="yaml" filename="datadog.yaml" >}}
logs_config:
  use_compression: false
{{< /code-block >}}

After the change, run the [status command][1] and confirm that `strategy` spends less time saturated. Re-enable compression if network use reaches capacity or the [Agent log file][10] shows new delivery errors.

### Increase pipeline parallelism

By default, the Agent runs one logs pipeline per available logical CPU, up to four pipelines.

If `processor` or `strategy` is saturated and the host CPU is below capacity, increase `logs_config.pipelines`. For example, on a host with eight logical CPUs available to the Agent:

{{< code-block lang="yaml" filename="datadog.yaml" >}}
logs_config:
  pipelines: 8
{{< /code-block >}}

Additional pipelines help when the Agent collects from multiple log sources. A single source remains on one pipeline. More pipelines can increase Agent CPU, memory, and total HTTP send concurrency. After the change, run the [status command][1] and confirm that the targeted component spends less time saturated.

### Reduce log processing

If `processor` is saturated, review the configured [processing rules][7]. Global rules run against every log collected by the Agent. When a rule applies to one source, move it to that source's integration configuration:

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

Remove duplicate rules from global `logs_config.processing_rules` and source-level `log_processing_rules`. Starting with Agent 7.82.0, [automatic multi-line detection][8] is enabled by default. If the `processor` component is saturated and your logs do not require multi-line aggregation, consider disabling it:

{{< code-block lang="yaml" filename="datadog.yaml" >}}
logs_config:
  auto_multi_line_detection: false
{{< /code-block >}}

If a source has a known multi-line format, [configure a source-level `multi_line` processing rule][12] instead of using automatic detection. After the change, run the [status command][1] to compare processor saturation and verify in [Log Explorer][11] that related lines remain grouped correctly.

## Reduce log volume

If the Agent cannot process the required volume within the available host and network capacity, filter logs that you do not need. An `exclude_at_match` processing rule drops matching logs before they leave the host:

{{< code-block lang="yaml" filename="datadog.yaml" >}}
logs_config:
  processing_rules:
    - type: exclude_at_match
      name: exclude_health_checks
      pattern: GET /health
{{< /code-block >}}

Use a source-level `log_processing_rules` entry instead when the filter applies to only one log source.

## Verify the result

Test each change under representative log volume:

1. Run the status command:
   {{< code-block lang="shell" >}}sudo datadog-agent status{{< /code-block >}}
2. Confirm that the targeted component spends less time at or above 90% utilization. The overall state remains `WARNING` for up to 30 minutes after saturation clears.
3. Search the [Agent log file][10] for new `remaining unread` warnings.

If a change does not reduce saturation or the frequency of new rotation warnings, revert it and select the next action from [Choose a tuning action](#choose-a-tuning-action). If saturation moves to a different component, use the action listed for that component.

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
[10]: /agent/configuration/agent-log-files/
[11]: /logs/explorer/
[12]: /agent/logs/advanced_log_collection/#manually-aggregate-multi-line-logs
