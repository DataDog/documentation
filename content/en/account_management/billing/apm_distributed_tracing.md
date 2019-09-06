---
title: APM Billing
kind: faq
---



[APM & Distributed Tracing][1] powers you to find service bottlenecks and analyze distributed traces for your microservices architecture. Additionally, using the [Trace Search and Analytics][2] feature with APM allows you to slice and dice your application data with APM events using completely customizable tags.

## Understanding Your Bill

| Deployment environment | Billable Unit | APM Events for Trace Search and Analytics |
| -----------------------|---------------|-------------------------------------------|
| Host  | $36 per host | No. of hosts * 1 million APM events included for free. Additional APM events charged per million per month.|
| Containers | $36 per underlying host | |
| Fargate | Per concurrent task | No free APM events included. APM events charged per million per month. |

* Pricing is calculated on the basis of 99th percentile of usage at the end of month

Using a combination of deployment? Check out the pricing for sample scenarios.


## Sample Deployment Scenarios

### Sample 1

5 hosts, 20 Fargate Tasks, 30 million APM events.
Deployment: One agent per host. One agent per application container.


| Product | Quantity | Price |
| --------|-----------|------|
| APM Hosts | 5 | 5 * $36 = |
| Fargate Tasks | 20 | 20 * $2 = |
| APM events | 30 million | (30 million - 5 * 1 million) * $1.7 =  |
| Total |     |   |

### Sample 1

Application 1 -> container 1. Application 2 -> container 2. Both Containers -> 1 host
Sending 20 million APM events on Trace Search and Analytics.
Deployment: One agent per host

| Product | Quantity | Price |
| --------|-----------|------|
| APM Hosts | 1 | 1 * $36 = |
| APM events | 20 million | (20 million - 5 * 1 million) * $1.7 =  |
| Total |     |   |

### Sample 3

Application 1 -> 20-40 containers -> 4-8 EC2 instances. Application 2 ->  10-30 Fargate hosted containers. Not using Trace Search and Analytics.
Deployment: One Agent per EC2 instance. One Agent per Application Fargate Container.

| Product | Quantity | Price |
| --------|-----------|------|
| APM Hosts | 7 (p99 of usage) | 7 * $36 = |
| Fargate Tasks | 28 (p99 of usage) | 28 * $2 = |
| Total |     |   |

### Sample 4

Application 1 -> 20 worker nodes in Kubernetes -> average 30 pods. 20 million APM events
Deployment: One Agent per Node.

| Product | Quantity | Price |
| --------|-----------|------|
| APM Hosts (Nodes) | 20 | 20 * $36 = |
| APM events | 20 million | (20 million - 20 * 1 million) * $1.7 =  0 |
| Total |     |   |



## Monitor Usage

If you are an admin of your account, you can monitor your account usage using the [Usage Page][8]. This page gets updated every 72 hours.

{{< img src="tracing/faq/usage_page.png" alt="APM Event Filtering" responsive="true" style="width:100%;">}}

| Metric | Description |
| ------- | -------- |
| APM Hosts | Shows the 99th percentile of all distinct APM hosts over all hours in the current month. |
| Containers | Shows the average of all distinct containers over all hours in the current month. |
| APM Events | Shows the sum of all APM events indexed over all hours in the current month. |
| Fargate Tasks | Shows the average of all Fargate tasks over all hours in the current month. |


## Estimate and Control Usage

### Event Estimator

{{< img src="tracing/faq/event_estimator.png" alt="APM Event Filtering" responsive="true" style="width:100%;">}}

To estimate the number of events a service is sending per day or per month, use the [Event Estimator page][9]. This is designed to help you decide which services to configure with Trace Search and Analytics while keeping usage and cost in your control.

### Trace Analytics Monitors on volume

To get alerts in case a code deployment causes a spike in APM events generated, set up [trace analytics monitors][10] on APM events. Get notified at any moment if the APM event volumes in any scope (`service`, `availability-zone`, etc…) of your infrastructure is growing unexpectedly:

1. Go to [Trace Analytics view][11] in APM
2. Select the `env` (you can select `*`)
3. Select `count` (you can select `*`)
4. Select the time period you want to roll it up for.
5. Select Export -> Export to Monitor
6. Define the rate you would like to set as a warning or error.
7. Define an explicit notification: The volume on this service just got too high. Define an additional exclusion filter or increase the filtering rate to put it back under control


### Handling Sudden Host Upscale

Your APM bill is calculated using the top 99 percentile of active Agents sending traces every month. This ensures even if you decide to scale your environment to handle for a sudden spike in traffic around certain hours, for instance on Black Friday, you will not be charged additional for that.

You can choose to configure trace search and analytics per service or per integration your application instruments. This allows you to manually control the number of APM events generated. Note that this, however, limits Trace Search and Analytics functionality on those services and integrations.

### Event Filtering

{{< img src="tracing/faq/event_filtering.mp4" alt="Analytics View" video="true" responsive="true" style="width:90%;">}}

Enable [Event Filtering][12] to send APM events at 100% throughput by default. For example, a Java service with 100 requests generates 100 APM events from its `servlet.request` spans, as each `servlet.request` span generates an APM event. [Filtering APM events][13] has the benefit of reducing the number of billable APM events and has no effect on trace sampling. Once a service has been filtered lower than 100%, APM event analytics are upscaled to display an estimate by default, and you have the option to display the filtered value

### FAQ
1. What is classified as a host for billing?
Any machine running its own OS - physical machine, virtual machine or cloud instance (virtual machine on a cloud) is considered a host. For billing APM, number of hosts sending traces are calculated every hour. At the end of the month, you are billed based on your 99th percentile usage. 

2. What happens to my bill if I have to suddenly scale my environment?
Your APM bill is calculated using the top 99 percentile of active agents sending APM events every month. This ensures that even if you need to scale your environment to handle a sudden spike in traffic, for instance on Black Friday, you will not be charged additional for that.

3. Do I get charged for pause containers in Kubernetes?
Kubernetes creates pause containers to acquire the respective pod’s IP address and set up the network namespace for all other containers that join that pod. Datadog excludes all pause containers from your quota and does not charge for them (requires Agent 5.8+). For Kubernetes, APM is priced by node not by pods. 

4. How is billing calculated if I deploy one agent per container?
If the agent runs on each container, then each container is treated as a single host. The price is then (Price Per APM host) * (No. of containers)

5. How is billing calculated if I deploy agent as a proxy for cluster of containers?
The default deployment setup for APM is to install an agent on every host. In case you do not have access to your host to deploy the agent, you can bundle your agents and divert all traffic to Datadog via a centralized set of container cluster, you can configure using these setup instructions. Pricing will be calculated for the host you configure to send traces via the cluster of agents.




[1]: /tracing
[2]: /tracing/trace_search_and_analytics
[3]: /tracing/visualization/#apm-event
[4]: https://www.datadoghq.com/pricing
[5]: /tracing/visualization/#trace
[6]: /tracing/visualization/#apm-event
[7]: /tracing/trace_search_and_analytics/?tab=java#configure-additional-services-optional
[8]: https://app.datadoghq.com/account/usage
[9]: https://app.datadoghq.com/apm/docs/trace-search?env=datadoghq.com
[10]: /monitors/monitor_types/trace_analytics
[11]: https://app.datadoghq.com/apm/search/analytics
[12]: https://app.datadoghq.com/apm/docs/trace-search?env=datadoghq.com
[13]: https://app.datadoghq.com/apm/settings?env=datadoghq.com&activeTab=0
