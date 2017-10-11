---
title: Usage Metering
type: apicontent
order: 18.1
---

#### Get Hourly Usage For Hosts and Containers

Get Hourly Usage For Hosts and Containers.

##### Arguments

##### Response

container_count
shows the total number of containers reporting via the Docker integration during the hour.

host_count
contains the total number of billable infrastructure hosts reporting during a given hour.
This is the sum of agent_host_count, aws_host_count, and gcp_host_count.

hour
the hour for the usage.

apm_host_count:
shows the total number of hosts using APM during the hour. For Pro plans, these will be counted as billable (except during trial periods). For Enterprise plans, APM hosts are included in the price of infrastructure hosts (see host_count) and not billed separately.

agent_host_count
contains the total number of infrastructure hosts reporting during a given hour that were running the Datadog Agent.

gcp_host_count
contains the total number of hosts that reported via the Google Cloud integration (and were NOT running the Datadog Agent).

aws_host_count
contains the total number of hosts that reported via the AWS integration (and were NOT running the Datadog Agent).
When AWS or GCP hosts are also running the Datadog Agent, they will be counted as Agent hosts, NOT as AWS or GCP.
