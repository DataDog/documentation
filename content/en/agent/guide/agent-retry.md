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

This guide details the behavior of the Agent when it’s unable to successfully post an HTTP request to Datadog’s intake. It explains the retry strategy, buffer nature and sizes, and the drop strategy. 

<div class="alert alert-info">A failed HTTP request, in this guide, is defined as any HTTP request that doesn’t result in a <code>2xx</code> HTTP response.</div>



## Metrics 
### Metrics retry strategy 
Failed HTTP requests are retried on timeouts and 4xx/5xx HTTP response status codes unless the status code is one of 400, 403, 413 (code). When an endpoint is down the Agent will retry again using an exponential backoff strategy with randomized jitter. By default the max backoff time is 64 seconds and will reach this time after 6 attempts (calculated here, using a base back off time of 2).

If the HTTP responses is 404 then the Agent will retry the transaction again (see code here). This means that the Agent will typically retry requests to endpoints that do not exist in a DD region or proxy.


### Metrics Buffer logic
Failed payloads are kept compressed in an in-memory buffer, with a default size of 15MB (code, configurable with forwarder_retry_queue_payloads_max_size). 

An opt-in on-disk buffer can be enabled by customers (public docs, 
Storing Agent Infra Payloads on the Disk
). When this is enabled the Agent will first use the in-memory buffer till it becomes full. Once full it will start removing old payloads (transactions) from the in-memory retry queue and will serialize these to disks and accept the new payloads. Then the Agent will retry those in-memory and once empty it will retry the payloads stored on-disk. It will always try the newest first before removing it on success (rationale: we want to send the live and most recent metrics before backfilling older ones). More details on retry logic can be found here. 

On DD infra on-disk buffering is configured and set to be 2GB and a max disk ratio of 0.8. The max in-memory buffer is also configured to be 15MB.

To calculate the buffer size you can use the metric datadog.agent.retry_queue_duration.bytes_per_sec. This metric is available by default when using on-disk buffering. Using this data you can then calculate how much space you may want to allocate to the Agent in case of an outage.

On a restart of the Agent all metrics in-memory are lost. If the Agent has on-disk buffering enabled then the metrics that are stored on-disk will not be lost (the Agent will resubmit them). However metric payloads are stored on disk only once the in-memory buffer is full, so the metric payloads that were in-memory at the time the Agent restarted are lost.

On shutdown, only in-flight requests are flushed and not those in the retry queue.

The Agent reports the number of points it drops to the customer’s org. More details in 
Number of points dropped by the Agent. 


## Logs 

### Logs retry strategy 
Failed HTTP requests (defined as any code above a 400 and not a 400, 401, 403 or 413 here) will be retried indefinitely (with backoff) until the end point comes back. It uses the same exponential backoff strategy with randomized jitter, except the default max backoff time is 120 seconds, using a base back off time of 2 as well.

Due to the fact the Agent guarantees log delivery, when a payload fails it creates back pressure through the Agent. This means the Agent will stop reading from the source of the log. As long as the log source is still present/available when the intake comes back, then the Agent will carry on reading from where it stopped. In K8s this could mean the file is rotated before the intake is back online, so we’d lose the rest of the logs. On other systems, things like logrotate can remove files being tailed before the Agent is able to read and send the data again.

The Logs Agent keeps track of log sources and current location in the logs source. There is a “registry” that keeps track of this information. This registry is flushed to disk every second (not configurable) and is loaded up by the Agent on restart. So on a restart the Agent will read from the place recorded in the registry. This does mean that there is a small chance of duplicate logs if we had sent one payload and not flushed the registry before restarting. 

So when the intake is down, the Logs Agent will store a maximum of ~20MB of compressed payloads in memory. Currently not configurable.

For TCP we will only buffer 100 log lines as we send them one by one. TCP is still being used in some charts in EU1.


### Monitoring retries in the log agent
We have telemetry for the log agent (eg this config),  our kb here provides more details regarding information on those telemetry. 

These telemetry can also be found in the telemetry.log within a flare

These metric can vary very widely. But for data loss, we have metrics that monitor monitor buffer health, performance, and potential data loss:


```sh
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

### Dual shipping
When dual shipping, the Agent will block on both destinations. The problem with dual shipping is that we will send to the first endpoint. When this happens it will drop all payloads to the failing endpoint and continue to read from the source. This is because logs have been successfully delivered to at least one endpoint.

Dual shipping also has a is_reliable mode option for additional endpoints. In this mode (when set to true) the Agent will send to both endpoints and treat both with the same priority. This means that if all your reliable endpoints are unavailable then the Agent will stop sending data till one reliable endpoint is available. Unreliable endpoints only send data if at least one reliable endpoint is available. They also have lower priority than those marked as reliable. More details can be found here. 


## APM
### APM retry strategy  
Failed HTTP requests are retried with an exponential backoff. A failed HTTP request is defined as any network connectivity problem, status code 408 or 5xx (code here and here). The max backoff time is 10 seconds (we believe this limit was chosen arbitrarily), using a base backoff time of 2. Which status codes are retriable, and the backoff rates are not configurable.

Failed payloads are kept in-memory compressed, we start dropping older payloads if the payloads queue is full.

#### For traces 
The queue size is configurable via apm_config.trace_writer.queue_size and defaults to int(max(1, max memory / max payload size)), in most cases this defaults to int(max(1, (500 * 1024 * 1024) / 3200000)) = 163 payloads (code).

#### For stats
The queue size is configurable via apm_config.stats_writer.queue_size and defaults to int(max(1, max memory / payload size)), in most cases this defaults to int(max(1, (250 * 1024 * 1024) / 1500000)) = 174 payloads (code).

When dual shipping, each target endpoint has its own sender instance and queue.

## Other payload types and products

### Processes 
Process Agent uses the metric payload forwarder. Before check results are sent to the forwarder, a queue is used to store check results.

Note that ~30m of data can be buffered on the Agent for process payloads (check running every 10s) as determined by DefaultProcessQueueSize. This can be lower if the payloads being buffered are hitting the max of 60MB controlled by DefaultProcessQueueBytes. Before Agent 7.39 these limits apply to a combination of process and connections (NPM) payloads since a single queue is used for both, however since Agent 7.39 separate queues are used, which in turn allows for more data to be buffered in flight, for process payloads ~40m of data can be buffered with these default settings.

https://github.com/DataDog/datadog-agent/blob/main/pkg/config/process.go#L22-L33 

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

These settings are rarely overridden by customers.

Downstream, the Metrics forwarder is used (see above section), and the behavior is therefore similar (with the exception that on-disk buffering is not enabled).