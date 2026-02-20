---
title: Agent Retry and Buffering Logic
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

This guide describes the Datadog Agent's behavior when it fails to send HTTP requests to the **Metrics**, **Logs**, **APM**, and **Processes** intake endpoints.

Follow this guide to learn how the Agent addresses:
- Retry strategies and backoff behavior
- Buffering mechanisms and limits
- Data drop conditions and loss scenarios

All retry strategies use exponential backoff with randomized jitter. See the <a href="https://github.com/DataDog/datadog-agent/blob/main/pkg/util/backoff/backoff.go">backoff implementation</a> for details.

<div class="alert alert-info"> A failed HTTP request in this guide refers to any request that does not result in a <code>2xx</code> HTTP response. </div>


## Metrics
{{% collapse-content title="Metrics retry strategy" level="h4" expanded=false %}}

The Agent retries failed HTTP requests using an [exponential backoff strategy][2]. The Agent uses the following default retry configurations for the metrics intake:
- Base backoff time: 2 seconds
- Maximum backoff time: [64 seconds][3]
- Maximum backoff time is reached after 6 retries

The Agent retries failed requests for the following scenarios:
- Network timeouts
- HTTP `4xx` responses (_see note for exceptions_)
- HTTP `5xx` responses

<div class="alert alert-info"> For <code>4xx</code> responses, the Agent does not retry requests with status codes <code>400</code>, <code>403</code>, or <code>413</code>.
<br>
Requests that return a <code>404</code> response are retried because they often indicate a configuration or availability issue that could be resolved.
</div>
{{% /collapse-content %}}

{{% collapse-content title="Metrics buffering mechanisms and limits" level="h4" expanded=false %}}

When the Agent fails to send a metric to the Datadog intake, it compresses and stores this metric in an in-memory retry buffer. See [Buffer configurations](#buffer-configurations) for the available settings.

The Agent also supports an optional [on-disk retry buffer][4]. If you enable this setting, the Agent: 
1. Fills the in-memory buffer until it is full
1. Evicts older payloads from memory and serializes them to disk
1. Retries payloads in the following order:
    - In-memory payloads (newest first)
    - On-disk payloads (newest first)

This prioritization helps ensure that the Agent sends recent and live metrics before it backfills older data.


#### Buffer configurations
The Datadog Agent has the following default configurations for metric retry buffering:
- On-disk buffer size: 2 GB
- Maximum disk usage ratio: 0.8
- Maximum in-memory buffer size: 15 MB

You can configure the default maximum in-memory buffer size using the `forwarder_retry_queue_payloads_max_size` setting.

#### Restart and shutdown behavior
During restart, the Agent:
- Drops in-memory payloads
- Preserves and resends on-disk payloads

During shutdown, the Agent:
- Flushes in-flight requests
- Does not flush payloads in retry queues (both in-memory and on-disk)

{{% /collapse-content %}}

## Logs 
{{% collapse-content title="Logs retry strategy" level="h4" expanded=false %}}

The Logs Agent retries failed HTTP requests indefinitely using an [exponential backoff strategy][2]. The Agent uses the following default retry configurations for the logs intake:
  - Base backoff time: 2 seconds
  - Maximum backoff time: 120 seconds

The Agent retries failed log payloads until the logs intake endpoint becomes available.

<div class="alert alert-info"> The Logs Agent <strong>does not retry</strong> requests with status codes <code>400</code>, <code>401</code>, <code>403</code>, <code>413</code>.</div>
{{% /collapse-content %}}


{{% collapse-content title="Logs buffering mechanisms and limits" level="h4" expanded=false %}}

#### Backpressure and consumption
The Logs Agent is designed to guarantee log delivery during transmission. When a payload fails to send, the Agent applies backpressure and stops reading from the log source. When the intake becomes available, the Agent resumes reading from the last known position.

#### Data loss scenarios
  - **Kubernetes**: log files may rotate before intake recovery
  - **Host-based systems**: files may be removed by tools such as `logrotate`

#### Log buffer limits
- HTTP logs:
    - The Agent stores up to ~20 MB of compressed payloads in memory
    - Not configurable

- TCP logs:
    - Buffer limit: 100 log lines
    - The Agent sends logs line by line

#### Registry and restart behavior
The Logs Agent maintains a registry that tracks log sources and current read offsets. The Agent flushes the registry to disk every second and reloads it when the Agent restarts. This process is not configurable.

On restart, the Agent resumes reading from the position recorded in the registry. A small number of duplicate logs may occur if the Agent sends a payload before flushing the registry.
{{% /collapse-content %}}

{{% collapse-content title="Advanced shipping configuration" level="h4" expanded=false %}}

#### Dual shipping
When you enable dual shipping:
  - The Agent sends logs to the first available endpoint
  - The Agent drops payloads for any endpoint that fails
  - Log consumption continues as long as at least one endpoint succeeds

#### Reliable mode
When you enable `is_reliable` for an endpoint:
  - The Agent treats all reliable endpoints with equal priority
  - The Agent stops sending logs if all reliable endpoints are unavailable
  - Unreliable endpoints:
      - Receive data only when at least one reliable endpoint is available
      - Have lower priority than reliable endpoints

{{% /collapse-content %}}

## APM
{{% collapse-content title="APM retry strategy" level="h4" expanded=false %}}
The Agent retries failed APM requests using an [exponential backoff strategy][2]. The Agent uses the following default retry configurations for the APM intake:
  - Base backoff time: 2 seconds
  - Maximum backoff time: 10 seconds

The Agent retries failed requests for the following scenarios:
  - Network connectivity errors
  - HTTP `408` responses
  - HTTP `5xx` responses

<div class="alert alert-info"> You <strong>cannot configure</strong> the retry behavior and retriable status codes for APM.</div>
{{% /collapse-content %}}

{{% collapse-content title="APM buffering mechanisms and limits" level="h4" expanded=false %}}

#### In-memory queues
The Agent compresses and stores failed APM payloads in memory. The Agent drops these failed payloads when queues are full.

#### Traces
  - Configurable using `apm_config.trace_writer.queue_size`
  - Default calculation:
     - `int(max(1, max memory / max payload size))`
     - Example: `int(max(1, (500 * 1024 * 1024) / 3200000)) = 163`

#### Stats
  - Configurable using `apm_config.stats_writer.queue_size`
  - Default calculation:
     - `int(max(1, max memory / payload size))`
     - Example: `int(max(1, (250 * 1024 * 1024) / 1500000)) = 174`
{{% /collapse-content %}}

{{% collapse-content title="Advanced shipping configuration" level="h4" expanded=false %}}

#### Dual shipping
When you enable dual shipping for the APM intake, each endpoint has an independent sender and queue.

{{% /collapse-content %}}

## Processes
{{% collapse-content title="Processes retry strategy" level="h4" expanded=false %}}

The Process Agent uses the **metrics forwarder** for downstream delivery. The retry behavior follows the same strategy as the metric intake, using an [exponential backoff strategy][2] with the following default configurations:
- Base backoff time: 2 seconds
- Maximum backoff time: [64 seconds][3]
- Maximum backoff time is reached after 6 retries

**Key difference from Metrics**: On-disk buffering is not supported for Processes.

See the [Metrics retry strategy](#metrics-retry-strategy) for complete details on retry scenarios and exceptions.
{{% /collapse-content %}}

{{% collapse-content title="Processes buffering mechanisms and limits" level="h4" expanded=false %}}

The Process Agent uses the **metrics forwarder** for downstream delivery. Before forwarding check results, the Process Agent stores them in an in-memory queue.

#### Queue mechanism

The in-memory queue buffers data when the intake is unavailable or during transmission delays.

#### Buffer limits
- **Queue size**: 256 payloads (`DefaultProcessQueueSize`)
- **Queue memory**: [60 MB][5] (`DefaultProcessQueueBytes`)

With checks running every 10 seconds, these settings buffer approximately 30 minutes of process data.

#### Version-specific queue behavior

**Agent versions 7.39 or earlier:**
- Process and Connections (NPM) payloads share a single queue
- Buffer limits apply to the combined payloads
- Approximately 30 minutes of combined data can be buffered

**Agent version 7.39 and later:**
- Process and Connections (NPM) payloads use separate queues
- Each payload type has independent buffer limits
- Approximately 40 minutes of process data can be buffered with default settings

{{% /collapse-content %}}

[2]: https://github.com/DataDog/datadog-agent/blob/main/pkg/util/backoff/backoff.go
[3]: https://github.com/DataDog/datadog-agent/blob/main/pkg/util/backoff/backoff.go#L47
[4]: https://docs.datadoghq.com/agent/configuration/network/#data-buffering
[5]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/setup/process.go#L34-L36
