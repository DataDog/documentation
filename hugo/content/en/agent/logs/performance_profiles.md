---
title: Logs Agent Performance Profiles
description: Apply a preset group of Logs Agent performance settings to tune log collection for high volume, slow intake responses, or low delivery latency.
further_reading:
- link: "/agent/logs/log_transport/"
  tag: "Documentation"
  text: "Agent transport for logs"
- link: "/agent/logs/advanced_log_collection/"
  tag: "Documentation"
  text: "Advanced log collection configurations"
- link: "/agent/configuration/agent-configuration-files/"
  tag: "Documentation"
  text: "Agent configuration files"
---

## Overview

Logs Agent performance profiles are preset groups of `logs_config` settings that tune how the Datadog Agent processes and sends logs. Instead of adjusting individual settings, you select the profile that matches your workload, such as high log volume or slow responses from the Datadog intake.

Profiles can help the Agent keep up when logs are generated faster than they are sent. Each profile trades additional resource usage, such as memory, network traffic, or HTTP requests, for better throughput or lower latency. Results depend on your log volume, available CPU, and network conditions.

Profiles are off by default. When no profile is set, the Agent uses its standard default settings.

## Choose a profile

| Profile | Use when | Tradeoffs |
|---------|----------|-----------|
| `high-concurrency` | Log volume is high and responses from the intake are slow, for example when sending through a proxy or across regions. | Higher memory usage and more HTTP requests. Little or no benefit when intake responses are already fast. |
| `high-throughput` | You need more log processing capacity on hosts with many CPU cores. | Higher memory usage. Benefit varies with host size and workload. |
| `max-throughput` | CPU is the bottleneck at high log volume, and higher network usage is acceptable. | Disables compression, which significantly increases network traffic. Also increases memory usage. |
| `low-latency` | Log volume is low and you want logs to reach Datadog sooner. | More HTTP requests and network traffic. Less benefit at higher log volumes, where batches fill before the wait time expires. |

Test a profile in a non-production environment and monitor the Agent's resource usage before rolling it out broadly.

## Profile settings

Each profile sets the following `logs_config` options. The throughput profiles build on each other: `high-throughput` includes the `high-concurrency` settings, and `max-throughput` includes the `high-throughput` settings.

| Profile | Settings applied |
|---------|------------------|
| `high-concurrency` | `batch_max_concurrent_send: 20`<br>`payload_channel_size: 40` |
| `high-throughput` | The `high-concurrency` settings, plus:<br>`pipelines`: one per CPU core, up to 16<br>`message_channel_size: 200` |
| `max-throughput` | The `high-throughput` settings, plus:<br>`use_compression: false` |
| `low-latency` | `batch_wait: 1` |

### `high-concurrency`

Increases the number of log batches the Agent sends at the same time, and enlarges the buffer in front of the sender. Each send waits for a response from the intake. When responses are slow, sending more batches in parallel helps the Agent keep up with incoming logs.

### `high-throughput`

Adds more processing pipelines and a larger message buffer to the `high-concurrency` settings. This lets the Agent process more logs in parallel on hosts with many CPU cores.

### `max-throughput`

Disables compression on top of the `high-throughput` settings. At high log volume, compression can use CPU that the Agent could otherwise spend reading and sending logs. Use this profile only when log capacity matters more than network bandwidth.

**Note**: `max-throughput` also disables compression for HTTP [additional endpoints][1].

### `low-latency`

Reduces the maximum time the Agent waits before sending a batch from the default of 5 seconds to 1 second. At low log volume, batches fill slowly, so logs wait for this timer before they are sent. A shorter wait delivers those logs to Datadog sooner.

## Apply a profile

Set `logs_config.profile` to one of `high-concurrency`, `high-throughput`, `max-throughput`, or `low-latency`. Profile names are lowercase.

{{< tabs >}}
{{% tab "Configuration file" %}}

Add the profile to the Agent's [main configuration file][1] (`datadog.yaml`):

```yaml
logs_enabled: true
logs_config:
  profile: high-concurrency
```

[1]: /agent/configuration/agent-configuration-files/
{{% /tab %}}
{{% tab "Environment variable" %}}

Set the `DD_LOGS_CONFIG_PROFILE` environment variable:

```shell
DD_LOGS_CONFIG_PROFILE=high-concurrency
```

{{% /tab %}}
{{% tab "Datadog Operator" %}}

Use the `spec.override.nodeAgent.env` parameter in your `DatadogAgent` manifest to set the `DD_LOGS_CONFIG_PROFILE` environment variable:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      env:
        - name: DD_LOGS_CONFIG_PROFILE
          value: high-concurrency
```

{{% /tab %}}
{{% tab "Helm" %}}

Use the `datadog.env` parameter in your Helm chart values to set the `DD_LOGS_CONFIG_PROFILE` environment variable:

```yaml
datadog:
  env:
    - name: DD_LOGS_CONFIG_PROFILE
      value: high-concurrency
```

{{% /tab %}}
{{< /tabs >}}

After you set the profile, [restart the Agent][2].

### Override individual settings

Settings you configure explicitly take precedence over the profile. This includes values set in `datadog.yaml`, through environment variables, or with Fleet Automation. You can use a profile as a starting point and override specific settings.

For example, the following configuration applies `high-throughput` but limits the Agent to four pipelines:

```yaml
logs_config:
  profile: high-throughput
  pipelines: 4
```

## Verify the profile

After the Agent restarts, check the [Agent logs][3] for a message that confirms the profile was applied:

```text
Applied logs performance profile "high-concurrency": ...
```

If you override any profile settings, the Agent also logs which explicitly configured settings it kept.

If the profile name is not recognized, the Agent logs a warning that lists the available profiles. It then ignores the value and uses its default logs settings.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/configuration/dual-shipping/#logs
[2]: /agent/configuration/agent-commands/#restart-the-agent
[3]: /agent/configuration/agent-log-files/
