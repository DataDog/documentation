---
title: Usage Metering
type: apicontent
order: 18
---

### Usage Metering

This API is currently in private beta. Python and Ruby clients are not yet supported.

The usage metering end-point allows you to:

Get Hourly Usage For Hosts and Containers
Get Hourly Usage For Custom Metrics
Get Top Custom Metrics By Hourly Average

Usage data is delayed by up to 72 hours from when it was incurred. It is retained for the past 15 months.


#### Get Hourly Usage For Hosts and Containers

Get Hourly Usage For Hosts and Containers.

##### Arguments

##### Response

container_count
shows the total number of containers reporting via the Docker integration during the hour.

host_count
contains the total number of billable infrastructure hosts reporting during a given hour.
This is the sum of <span class="s">agent_host_count</span>, <span class="s">aws_host_count</span>, and <span class="s">gcp_host_count</span>.

hour
the hour for the usage.</div>

apm_host_count:
shows the total number of hosts using APM during the hour. For Pro plans, these will be counted as billable (except during trial periods). For Enterprise plans, APM hosts are included in the price of infrastructure hosts (see <span class="s">host_count</span>) and not billed separately.

agent_host_count
contains the total number of infrastructure hosts reporting during a given hour that were running the Datadog Agent.

gcp_host_count
contains the total number of hosts that reported via the Google Cloud integration (and were NOT running the Datadog Agent).

aws_host_count
contains the total number of hosts that reported via the AWS integration (and were NOT running the Datadog Agent).
When AWS or GCP hosts are also running the Datadog Agent, they will be counted as Agent hosts, NOT as AWS or GCP.


#### Get Hourly Usage For Custom Metrics.

Get Hourly Usage For Custom Metrics.

##### Arguments

#### Get Top 500 Custom Metrics By Hourly Average

Get Top Custom Metrics By Hourly Average.

##### Arguments