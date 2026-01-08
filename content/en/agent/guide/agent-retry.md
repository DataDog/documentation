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

This guide describes the behavior of the Datadog Agent when it is unable to successfully send an HTTP request to Datadog intake endpoints. It covers retry behavior, buffering mechanisms and limits, and data drop conditions for the **Metrics**, **Logs** and **APM** intakes. 

<div class="alert alert-info">In this guide, a failed HTTP request is defined as any request that does not result in a <code>2xx</code> HTTP response.</div>


## Metrics 
### Metrics retry strategy 
The Agent retries failed metric payloads in the following scenarios:
- Network timeouts
- HTTP `4xx` and `5xx` responses

The Agent **does not retry** requests that return the following status codes: 
- `400`
- `403`
- `413`

Requests that return a `404` response are retried. A `404` response can occur when an endpoint does not exist in a given Datadog region or proxy.

Retries use an [exponential backoff strategy][2] with randomized jitter. These are the default configurations:
- Base backoff time: 2 seconds 
- Maximum backoff time: [64 seconds][3] 
- Maximim backoff reached after 6 retries


### Metrics buffer logic
When a metric fails to send to the Datadog intake, it is compressed and stored in an in-memory retry buffer. The default maximum size is 15MB and is configurable using the`forwarder_retry_queue_payloads_max_size` configuration setting. 

The Agent supports an optional [on-disk retry buffer][4], and when enabled: 
1. The Agent fills the in-memory buffer first.
1. Once the in-memory buffer is full:
    - Older payloads are evicted from memory
    - Evicted payloads are serialized to disk
1. New payloads continue to be accepted.
1. The Agent retries payloads in the following order:
    - In-memory payloads (newest first)
    - On-disk payloads (newest first).

    This prioritization ensures that recent and live metrics are sent before backfilling older data.

#### Default Datadog infrastructure configuration 
The Datadog infrastructure has the following default configurations for metric retry buffering:
- On-disk buffer size: 2 GB
- Maximum disk usage ratio: 0.8
- Maximum in-memory buffer size: 15 MB

#### Planning buffer capacity
To estimate required buffer capacity during an outage, use the metric: `datadog.agent.retry_queue_duration.bytes_per_sec`

This metric  can be used to estimate disk requirements based on expected outage duration and is available by default when on-disk buffering is enabled.

#### Restart and shutdown behavior 
During Agent restart:
- In-memory payloads are lost
- On-disk payloads are preserved and resent
- Payloads are written to disk only after the in-memory buffer is full (some metric loss may still occur)

During Agent shutdown:
- Only in-flight requests are flushed
- Payloads in retry queues are not flushed


#### Dropped metrics  
The Agent reports the number of dropped metric points to the customer’s Datadog organization. (WHICH METRIC CAN THEY USE TO SEE THIS?)


## Logs 
### Logs retry strategy
The Logs Agent retries failed HTTP requests indefinitely using [exponential backoff][2] with randomized jitter. A failed request is defined as:
- Any HTTP response code greater than `400`, excluding codes:
  - `400`
  - `401`
  - `403`
  - `413`

The logs retry default configurations are:
  - Base backoff time: 2 seconds
  - Maximum backoff time: 120 seconds

Retries continue until the intake endpoint becomes available.

### Log consumption
The Logs Agent guarantees log delivery. When a payload fails to send:
- Back pressure is applied
- The Agent stops reading from the log source

When the intake becomes available, the Agent resumes reading from the last known position.

There are some potential data loss scenarios:
  - Kubernetes: log files may rotate before intake recovery
  - Host-based systems: files may be removed by tools such as `logrotate`


### Registry and restart behavior 
The Logs Agent maintains a registry that tracks log sources and current read offsets. 

The registry is flushed to disk every second (this is not configurable) and is reloaded when the Agent restarts.

On restart, the Agent resumes reading from the position recorded in the registry. A small amount of duplicate logs may occur if a payload was sent but the registry had not yet been flushed.

### Log buffering limits 
- HTTP logs:
    - Up to ~20 MB of compressed payloads stored in memory
    - Not configurable

- TCP logs:
    - Buffer limited to 100 log lines
    - Logs are sent line by line
    - TCP is still used by some EU1 charts (SHOULD THIS BE INCLUDED?)


### Monitoring log retries and data loss
The Logs Agent exposes telemetry metrics for monitoring buffer health, performance, and potential data loss.
Telemetry is available:
  - In Agent metrics
  - In the `telemetry.log` file included in an Agent flare

<!-- Buffer Health and Data Loss
  : `logs.bytes_missed`: Bytes lost before consumption
  : `logs.dropped`: Total logs dropped per destination -->

#### Buffer Health and Data Loss
  - `logs.bytes_missed`
  - `logs.dropped`

#### Performance and Latency
  - `logs.sender_latency`
  - `logs.retry_count`
  - `logs.network_errors`

#### Throughput and Volume
  - `logs.decoded`
  - `logs.processed`
  - `logs.sent`
  - `logs.bytes_sent`
  - `logs.encoded_bytes_sent`

#### Connection Health
  - `logs_client_http_destination__idle_ms`
  - `logs_client_http_destination__in_use_ms`

#### HTTP Response Health
  - `logs.destination_http_resp`

#### Buffer Capacity and Utilization
  - `logs_component_utilization__ratio`
  - `logs_component_utilization__items`
  - `logs_component_utilization__bytes`

### Dual Shipping
When dual shipping is enabled:
  - The Agent sends logs to the first available endpoint
  - If one endpoint fails, payloads to that endpoint are dropped
  - Log consumption continues as long as at least one endpoint succeeds

#### Reliable Mode
When `is_reliable` is enabled for an endpoint:
  - All reliable endpoints are treated with equal priority
  - If all reliable endpoints are unavailable, the Agent stops sending logs
  - Unreliable endpoints:
      - Receive data only when at least one reliable endpoint is available
      - Have lower priority than reliable endpoints


## APM and traces 

### APM Retry Behavior
The Agent retries failed APM payloads using [exponential backoff][2].

A failed request is defined as:
  - Network connectivity errors
  - HTTP `408` responses
  - HTTP `5xx` responses

The APM intake has the following default configurations:
  - Base backoff time: 2 seconds
  - Maximum backoff time: 10 seconds

Retry behavior and retriable status codes are not configurable.

### In-Memory queues

Failed APM payloads are:
  - Compressed
  - Stored in memory
  - Older payloads are dropped when queues are full

#### Traces
  - Configurable via `apm_config.trace_writer.queue_size`
  - Default calculation:
     - `max(1, max_memory / max_payload_size)`
     - Typically defaults to **163 payloads**

#### Stats
  - Configurable via apm_config.stats_writer.queue_size
  - Default calculation:
      - `max(1, max_memory / payload_size)`
      - Typically defaults to **174 payloads**

### Dual shipping
When dual shipping is enabled for the APM intake, each endpoint has an independent sender and queue.

### Additional payload types
#### Processes

The Process Agent buffers check results before forwarding them via the metrics forwarder.

The processes payload has the following default buffering behavior:
  - Approximately 30 minutes of process data buffered
  - Buffering based on:
    - `DefaultProcessQueueSize` = 256
    - `DefaultProcessQueueBytes` = 60 MB
    
Starting with Agent version 7.39:
  - Process and Network (NPM) payloads use separate queues
  - Agent allows buffering of approximately 40 minutes of process data with default settings

These settings are rarely overridden.`(IS THIS A "SHOULD BE RARELOY OVERRIDEN? WHAT AR WE TRYING TO CONVEY TO THE USER HERE?")`

Downstream delivery for Processes uses the **metrics forwarder**, and retry behavior is consistent with [metrics](#metrics-retry-strategy), except that on-disk buffering is not supported.






<!-- ```sh 
// Buffer Health & Data Loss
logs.bytes_missed - Bytes lost before consumption (log rotation, etc.)
logs.dropped - Total logs dropped per destination

// Performance & Latency
logs.sender_latency - HTTP sender latency histogram (ms)
logs.retry_count - Total retried payloads
logs.network_errors - Total network errors

// Throughput & Volume
logs.decoded - Total decoded logs
logs.processed - Total processed logs
logs.sent - Total sent logs
logs.bytes_sent - Bytes sent before encoding 
logs.encoded_bytes_sent - Bytes sent after encoding

// Connection Health
logs_client_http_destination__idle_ms - Time spent idle (ms) by sender
logs_client_http_destination__in_use_ms - Time spent sending (ms) by sender

// Data Loss & Errors
logs_client_http_destination__payloads_dropped - Payloads dropped due to unrecoverable errors
logs_client_http_destination__send - Send attempts by endpoint_host and error type

// HTTP Response Health
logs.destination_http_resp - HTTP responses by status_code and url

// Buffer Capacity & Health (processor, sender, strategy)
logs_component_utilization__ratio - Utilization ratio (0-1) by component name and instance
logs_component_utilization__items - Items in buffer/queue by component name and instance
logs_component_utilization__bytes - Bytes in buffer/queue by component name and instance

```
-->

<!--  
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
-->

These settings are rarely overridden by customers.

Downstream, the Metrics forwarder is used (see above section), and the behavior is therefore similar (with the exception that on-disk buffering is not enabled).


<!-- DIAGRAM


[ Agent collects metrics ]
            |
            v
[ Send HTTP request to Datadog ]
            |
            v
     Was it successful?
        /          \
      YES          NO
       |            |
       v            v
 [ Done ]    Is status 400/403/413?
                  /        \
                YES        NO
                 |          |
                 v          v
         [ Drop data ]   [ Retry request ]
                               |
                               v
               [ Exponential backoff + jitter ]
                               |
                               v
                 Is Datadog endpoint still down?
                               |
                               v
                    [ Store payload in memory ]
                               |
                               v
                    Is memory buffer full (15MB)?
                        /                 \
                      NO                   YES
                       |                    |
                       v                    v
            [ Keep retrying from memory ]  [ Move oldest payloads to disk ]
                                                |
                                                v
                                   [ Store payloads on disk (if enabled) ]
                                                |
                                                v
                             [ Retry newest data first, then older data ]
 -->



[1]: https://github.com/DataDog/datadog-agent/blob/d2b37a761068c211a2494c728bc70e726eadc1b8/pkg/forwarder/transaction/transaction.go#L346-L366
[2]: https://github.com/DataDog/datadog-agent/blob/main/pkg/util/backoff/backoff.go
[3]: https://github.com/DataDog/datadog-agent/blob/main/pkg/util/backoff/backoff.go#L47
[4]: https://docs.datadoghq.com/agent/configuration/network/#data-buffering