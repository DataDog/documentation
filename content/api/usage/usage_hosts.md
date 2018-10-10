---
title: Get hourly usage for hosts, containers, and logs
type: apicontent
order: 23.1
external_redirect: /api/#get-hourly-usage-for-hosts-containers-and-logs
---

## Get hourly usage for hosts, containers, and logs

Get Hourly Usage For Hosts, Containers, and Logs.

##### Arguments
* **`start_hr`** [*required*]:  
    datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage beginning at this hour
* **`end_hr`** [*optional*, *default*=**1d+start_hr**]:  
    datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage ending BEFORE this hour

##### Response

* **`container_count`**:  
    Shows the total number of containers reporting via the Docker integration during the hour.
* **`host_count`**:  
    Contains the total number of billable infrastructure hosts reporting during a given hour.
    This is the sum of `agent_host_count`, `aws_host_count`, and `gcp_host_count`.
* **`hour`**:  
    The hour for the usage.
* **`apm_host_count`**:  
    Shows the total number of hosts using APM during the hour, these are counted as billable (except during trial periods).
* **`agent_host_count`**:  
    Contains the total number of infrastructure hosts reporting during a given hour that were running the Datadog Agent.
* **`gcp_host_count`**:  
    Contains the total number of hosts that reported via the Google Cloud integration (and were NOT running the Datadog Agent).
* **`aws_host_count`**:  
    Contains the total number of hosts that reported via the AWS integration (and were NOT running the Datadog Agent).
    When AWS or GCP hosts are also running the Datadog Agent, they are counted as Agent hosts, NOT as AWS or GCP.
* **`indexed_events_count`**:
    Contains the number of log events indexed.
* **`ingested_events_bytes`**:
    Contains the number of log bytes ingested.

