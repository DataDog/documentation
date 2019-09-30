---
title: Get hourly usage for hosts and containers
type: apicontent
order: 33.1
external_redirect: /api/#get-hourly-usage-for-hosts-and-containers
---

## Get hourly usage for hosts and containers

Get Hourly Usage For Hosts and Containers.

**ARGUMENTS**:

* **`start_hr`** [*required*]:
    Datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage beginning at this hour
* **`end_hr`** [*optional*, *default*=**1d+start_hr**]:
    Datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage ending BEFORE this hour

**RESPONSE**:

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
