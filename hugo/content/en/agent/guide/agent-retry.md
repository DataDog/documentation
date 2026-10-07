---
title: Agent Retry and Buffering Logic
description: Learn about the Datadog Agent's retry strategies and backoff behavior, buffering mechanisms and limits, and data drop conditions and loss scenarios.
further_reading:
- link: "agent/remote_config/?tab=configurationyamlfile"
  tag: "Documentation"
  text: "Remote Configuration"
- link: "/getting_started/site/"
  tag: "Documentation"
  text: "Getting Started with Datadog Sites"
- link: "https://www.datadoghq.com/blog/ddr-mitigates-cloud-provider-outages/"
  tag: "Blog"
  text: "Datadog Disaster Recovery mitigates cloud provider outages"
---
## Overview

This guide describes the Datadog Agent's behavior when it fails to send HTTP requests to the Metrics, Logs, APM, and Processes intake endpoints. All retry strategies use exponential backoff with randomized jitter. See the [backoff source code][1] for implementation details.

<div class="alert alert-info"> A failed HTTP request in this guide refers to any request that does not result in a <code>2xx</code> HTTP response. </div>


{{< tabs >}}
{{% tab "Metrics" %}}

### Metrics retry strategy

The Agent retries failed HTTP requests using an exponential backoff strategy. The Agent uses the following default retry configurations for the metrics intake:
- Base backoff time: 2 seconds
- Maximum backoff time: [64 seconds][101]
- Maximum backoff time is reached after 6 retries

The Agent retries failed requests for the following scenarios:
- Network timeouts
- HTTP `4xx` responses (see note for exceptions)
- HTTP `5xx` responses

<div class="alert alert-info"> For <code>4xx</code> responses, the Agent does not retry requests with status codes <code>400</code>, <code>403</code>, or <code>413</code>.
<br>
Requests that return a <code>404</code> response are retried because they often indicate a configuration or availability issue that could be resolved.
</div>

### Metrics buffering mechanisms and limits

When the Agent fails to send a metric to the Datadog intake, it compresses and stores the metric in an in-memory retry buffer. See [Buffer configurations](#buffer-configurations) for the available settings.

The Agent also supports an optional [on-disk retry buffer][102]. If you enable this setting, the Agent:
1. Fills the in-memory buffer until it is full
1. Evicts older payloads from memory and serializes them to disk
1. Retries payloads in the following order:
    1. In-memory payloads (newest first)
    1. On-disk payloads (newest first)

This prioritization helps ensure that the Agent sends recent and live metrics before it backfills older data.


#### Buffer configurations
The Datadog Agent has the following default configurations for metric retry buffering:
- On-disk buffer size: 2 GB
- Maximum disk usage ratio: 0.8
- Maximum in-memory buffer size: 15 MB

You can configure the default maximum in-memory buffer size using the `forwarder_retry_queue_payloads_max_size` [setting][102].

#### Restart and shutdown behavior
During restart, the Agent:
- Drops in-memory payloads
- Preserves and resends on-disk payloads

During shutdown, the Agent:
- Flushes in-flight requests
- Does not flush payloads in retry queues (both in-memory and on-disk)


[101]: https://github.com/DataDog/datadog-agent/blob/main/pkg/util/backoff/backoff.go#L47
[102]: /agent/configuration/network/#data-buffering
{{% /tab %}}

{{% tab "Logs" %}}
### Logs retry strategy

The Logs Agent retries failed HTTP requests indefinitely using an exponential backoff strategy. The Agent uses the following default retry configurations for the logs intake:
  - Base backoff time: 2 seconds
  - Maximum backoff time: 120 seconds

The Agent retries failed log payloads until the logs intake endpoint becomes available.

<div class="alert alert-info"> The Logs Agent does not retry requests with status codes <code>400</code>, <code>401</code>, <code>403</code>, or <code>413</code>. </div>

### Logs buffering mechanisms and limits

#### Backpressure and consumption
The Logs Agent guarantees log delivery during transmission. When a payload fails to send, the Agent applies backpressure by stopping reading from the log source and resuming from the last known position when the intake becomes available.

#### Data loss scenarios
  - **Kubernetes**: Log files may rotate before intake recovery
  - **Host-based systems**: Files may be removed by tools such as `logrotate`

#### Log buffer limits
- HTTP logs:
    - Not configurable

- TCP logs:
    - Buffer limit: 100 log lines
    - The Agent sends logs line by line

#### Registry and restart behavior
The Logs Agent maintains a registry that tracks log sources and current read offsets. The Agent flushes the registry to disk every second and reloads it when the Agent restarts. You cannot configure this process.

On restart, the Agent resumes reading from the position recorded in the registry.

### Advanced shipping configuration

#### Dual shipping
When you enable [dual shipping][201]:
  - The Agent sends logs to the first available endpoint
  - The Agent drops payloads for any endpoint that fails
  - Log consumption continues as long as at least one endpoint succeeds

For the Agent logic when `is_reliable` is enabled, see [Logs Dual Shipping][202].

[201]: /agent/configuration/dual-shipping/?tab=helm&site=us
[202]: /agent/configuration/dual-shipping/?tab=helm#environment-variable-configuration-6
{{% /tab %}}

{{% tab "APM" %}}
### APM retry strategy
The Agent retries failed APM requests using an exponential backoff strategy. The Agent uses the following default retry configurations for the APM intake:
  - Base backoff time: 2 seconds
  - Maximum backoff time: 10 seconds

The Agent retries failed requests for the following scenarios:
  - Network connectivity errors
  - HTTP `408` responses
  - HTTP `5xx` responses

<div class="alert alert-info"> You cannot configure the retry behavior and retriable status codes for APM. </div>

### APM buffering mechanisms and limits
#### In-memory queues
The Agent compresses and stores failed APM payloads in memory, dropping them when queues are full.

#### Stats
  - Configurable using `apm_config.stats_writer.queue_size`
  - Default calculation:
     - `int(max(1, max memory / payload size))`
     - Example: `int(max(1, (250 * 1024 * 1024) / 1500000)) = 174` [payloads][301]

### Advanced shipping configuration

#### Dual shipping
When you enable [dual shipping][302] for the APM intake, each endpoint has an independent sender and queue.

[301]: https://github.com/DataDog/datadog-agent/blob/7.43.1/pkg/trace/writer/stats.go#L73-L83
[302]: /agent/configuration/dual-shipping/?tab=helm&site=us
{{% /tab %}}

{{% tab "Processes" %}}
### Processes retry strategy

The Agent retries failed Processes requests using an exponential backoff strategy. The Agent uses the same default retry configurations as the metrics intake:
- Base backoff time: 2 seconds
- Maximum backoff time: [64 seconds][401]
- Maximum backoff time is reached after 6 retries

See **Metrics retry strategy** for complete details on retry scenarios and exceptions.

<div class="alert alert-info"> On-disk buffering is not supported for Processes. </div>

### Processes buffering mechanisms and limits

The Process Agent uses the **metrics forwarder** for downstream delivery. Before forwarding check results, the Process Agent stores them in an in-memory queue.

#### Queue mechanism

The in-memory queue buffers data when the intake is unavailable or during transmission delays.

#### Buffer limits
- **Queue size**: 256 payloads (`DefaultProcessQueueSize`)
- **Queue memory**: [60 MB][402] (`DefaultProcessQueueBytes`)

With checks running every 10 seconds, these settings buffer approximately 30 minutes of process data.

#### Version-specific queue behavior

**Agent versions 7.38 and earlier:**
- Process and Connections (NPM) payloads share a single queue
- Buffer limits apply to the combined payloads
- Buffers approximately 30 minutes of combined data

**Agent versions 7.39 and later:**
- Process and Connections (NPM) payloads use separate queues
- Each payload type has independent buffer limits
- Default settings buffer approximately 40 minutes of process data

[401]: https://github.com/DataDog/datadog-agent/blob/main/pkg/util/backoff/backoff.go#L47
[402]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/setup/process.go#L34-L36
{{% /tab %}}
{{< /tabs >}}

[1]: https://github.com/DataDog/datadog-agent/blob/main/pkg/util/backoff/backoff.go

