---
title: Agent Retry and Buffering Logic
private: true
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

<div class="alert alert-info">In this guide, a failed HTTP request is defined as any request that does not result in a <code>2xx</code> HTTP response.</div>

{{< tabs >}}
{{% tab "Metrics" %}}

### Metrics retry strategy
The Agent retries failed metric payloads in the following scenarios:
- Network timeouts
- HTTP `4xx` responses (_see note for exceptions_)
- HTTP `5xx` responses

<div class="alert alert-info"> For <code>4xx</code> responses, the Agent does not retry requests with status codes <code>400</code>, <code>403</code>, <code>413</code>.</div>

Requests that return a `404` response are retried because they often indicate a configuration or availability issue that could be resolved. For example, a `404` response can occur when an endpoint does not exist in a given Datadog region or proxy.

Retries use an [exponential backoff strategy][2] with randomized jitter and using these default configurations:
- Base backoff time: 2 seconds
- Maximum backoff time: [64 seconds][3]
- Maximum backoff reached after 6 retries

### Metrics buffering mechanisms and limits
When the Agent fails to send a metric to the Datadog intake, it compresses and stores this metric in an in-memory retry buffer. The default maximum size for this retry payload is 15MB, but you can configure this using the `forwarder_retry_queue_payloads_max_size` setting.

The Agent also supports an optional [on-disk retry buffer][4]. If you enable this setting: 
1. First, the Agent fills the in-memory buffer until it is full
1. Then, the Agent evicts older payloads from memory and serializes them to disk
1. Finally, the Agent retries payloads in the following order:
    - In-memory payloads (newest first)
    - On-disk payloads (newest first)

    This prioritization helps ensure that the Agent sends recent and live metrics before it backfills older data.

#### Buffer configurations
The Datadog infrastructure has the following default configurations for metric retry buffering:
- On-disk buffer size: 2 GB
- Maximum disk usage ratio: 0.8
- Maximum in-memory buffer size: 15 MB

#### Restart and shutdown behavior
During restart, the Agent:
- Drops in-memory payloads
- Preserves and resends on-disk payloads

During shutdown, the Agent:
- Flushes in-flight requests
- Does not flush payloads in retry queues (both in-memory and on-disk)

[2]: https://github.com/DataDog/datadog-agent/blob/main/pkg/util/backoff/backoff.go
[3]: https://github.com/DataDog/datadog-agent/blob/main/pkg/util/backoff/backoff.go#L47
[4]: https://docs.datadoghq.com/agent/configuration/network/#data-buffering

{{% /tab %}}

{{% tab "Logs" %}}
### Logs retry strategy
The Logs Agent retries failed HTTP requests indefinitely using [exponential backoff][2] with randomized jitter for `4xx` responses.

<div class="alert alert-info"> The Logs Agent <strong>does not retry</strong> requests with status codes <code>400</code>, <code>401</code>, <code>403</code>, <code>413</code>.</div>

The Logs Agent has the following default retry configurations:
  - Base backoff time: 2 seconds
  - Maximum backoff time: 120 seconds

Retries continue until the logs intake endpoint becomes available.

### Log buffering mechanism and limits
#### Back pressure and consumption
The Logs Agent is designed to guarantee log delivery during transmission. When a payload fails to send, the Agent applies back pressure and stops reading from the log source.

When the intake becomes available, the Agent resumes reading from the last known position.

There are some potential data loss scenarios:
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
The Logs Agent maintains a registry that tracks log sources and current read offsets. 

The Agent flushes the registry to disk every second (this is not configurable) and reloads when the Agent restarts.

On restart, the Agent resumes reading from the position recorded in the registry. A small number of duplicate logs may occur if the Agent sends a payload before flushing the registry.

### Advanced shipping configuration <!--(STILL THINKING OF A BETTER NAME FOR THIS SECTION?) -->

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

[1]: https://github.com/DataDog/datadog-agent/blob/d2b37a761068c211a2494c728bc70e726eadc1b8/pkg/forwarder/transaction/transaction.go#L346-L366
[2]: https://github.com/DataDog/datadog-agent/blob/main/pkg/util/backoff/backoff.go
[3]: https://github.com/DataDog/datadog-agent/blob/main/pkg/util/backoff/backoff.go#L47
[4]: https://docs.datadoghq.com/agent/configuration/network/#data-buffering

{{% /tab %}}

{{% tab "APM" %}}

### APM retry strategy
The Agent retries failed APM payloads using [exponential backoff][2].

A failed APM request includes the following:
  - Network connectivity errors
  - HTTP `408` responses
  - HTTP `5xx` responses

The APM intake has the following default configurations:
  - Base backoff time: 2 seconds
  - Maximum backoff time: 10 seconds

Retry behavior and retriable status codes are not configurable.

### APM buffering mechanism and limits

#### In-memory queues
The Agent compresses and stores failed APM payloads in memory. The Agent then drops these failed payloads when queues are full.

#### Traces
  - Configurable using `apm_config.trace_writer.queue_size`
  - Default calculation:
     - `max(1, max_memory / max_payload_size)`
     - Typically defaults to **163 payloads**

#### Stats
  - Configurable using `apm_config.stats_writer.queue_size`
  - Default calculation:
     - `max(1, max_memory / payload_size)`
     - Typically defaults to **174 payloads**

### Advanced shipping configuration
#### Dual shipping
When you enable dual shipping for the APM intake, each endpoint has an independent sender and queue.

[2]: https://github.com/DataDog/datadog-agent/blob/main/pkg/util/backoff/backoff.go
[3]: https://github.com/DataDog/datadog-agent/blob/main/pkg/util/backoff/backoff.go#L47
[4]: https://docs.datadoghq.com/agent/configuration/network/#data-buffering
{{% /tab %}}

{{% tab "Processes" %}}

### Processes retry strategy 
Downstream delivery for Processes uses the **metrics forwarder**. The retry behavior is consistent with metrics, except that on-disk buffering is not supported. See the [Metrics retry strategy](#metrics-retry-strategy) for more information.


### Processes buffering mechanisms and limits
Before forwarding check results, the Process Agent uses a queue to store these results. The Process payload buffers approximately 30 minutes of data by default, based on:
  - `DefaultProcessQueueSize` = 256
  - `DefaultProcessQueueBytes` = 60 MB

```sh
// Assuming we generate ~8 checks/minute (for process/network),
// this should allow buffering of ~30 minutes of data assuming 
// it fits within the queue bytes memory budget
DefaultProcessQueueSize = 256

// DefaultProcessQueueBytes is the default amount of process-agent
// check data (in bytes) that can be buffered in memory
// Allow buffering up to 60 megabytes of payload data in total
DefaultProcessQueueBytes = 60 * 1000 * 1000
```

With Agent versions 7.39 or earlier:
- The above default limits apply to a combination of Process and Connections (CNM) payloads
- The Process and Connections (CNM) payloads use a single queue

Starting with Agent version 7.39:
  - The Process and Connections (CNM) payloads use separate queues
  - The Agent can buffer approximately 40 minutes of process data with default settings



[2]: https://github.com/DataDog/datadog-agent/blob/main/pkg/util/backoff/backoff.go
[3]: https://github.com/DataDog/datadog-agent/blob/main/pkg/util/backoff/backoff.go#L47
[4]: https://docs.datadoghq.com/agent/configuration/network/#data-buffering
{{% /tab %}}
{{< /tabs >}}