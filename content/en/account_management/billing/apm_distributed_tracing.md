---
title: APM Billing
kind: faq
---



[APM & Distributed Tracing][1] powers you to find service bottlenecks and analyze distributed traces for your microservices architecture. Additionally, using the [Trace Search and Analytics][2] feature with APM allows you to slice and dice your application data with APM events using completely customizable tags.


## Choose your deployment environment:

{{< tabs >}}
{{% tab "Host Based Deployment" %}}

Any machine running its own OS - physical machine, virtual machine or cloud instance (virtual machine on a cloud) is considered a host. For billing APM, number of hosts sending traces are calculated every hour. At the end of the month, you are billed based on your 99th percentile usage. This includes 1 million APM events per host that you can slice and dice using with Trace Search and Analytics.

{{% /tab %}}
{{% tab "Containerized Deployment" %}}

If you’re using container based environment (Kubernetes, Google Cloud Run, Amazon EKS, Docker), APM is still billed on host basis, that is, physical servers and/or virtual machines those containers run on. This includes 1 million APM events per host that you can slice and dice using with Trace Search and Analytics.

### Kubernetes Setup:

Kubernetes creates pause containers to acquire the respective pod’s IP address and set up the network namespace for all other containers that join that pod. Datadog excludes all pause containers from your quota and does not charge for them (requires Agent 5.8+). For Kubernetes, APM is priced by node not by pods. For instance, find a [sample deployment scenario][#sample-3].

### Agent Cluster Setup:

The default deployment setup for APM is to install an Agent on every host. In case you do not have access to your host to deploy the Agent, you can bundle it and divert all traffic to Datadog via a centralized set of container cluster, you can configure them using [these setup instructions][1]. Pricing is then calculated for the host you configure to send traces via the cluster of Agents.

Number of hosts (or Kubernetes nodes) sending traces are calculated every hour.  At the end of the month, you are billed based on your 99th percentile usage.


[1]: /tracing/send_traces/#containers
{{% /tab %}}
{{% tab "Fargate Deployment" %}}

Fargate pricing is based on the concurrent number of tasks. For APM, it is charged at $2/task/month metered in 5 minute buckets. The recommended deployment setup is running the Datadog Agent container [in the same task definition as your application container][1].

For instance, if you are running 3 Fargate tasks, the price for APM is $2 per task * 3 tasks = $6 per month.

*Note that the Fargate task billing does not include free functionality for Trace Search and Analytics.*

Using a combination of deployment environments? Find pricing for [sample deployment scenarios][#sample-1].


[1]: /integrations/ecs_fargate/#trace-collection
{{% /tab %}}
{{< /tabs >}}

## Calculate APM event count and Retention

Trace Search and Analytics is priced on the basis of your APM event [link - definition of APM event] count. You get 1 million APM events per host for free if you’re using host/container based deployment (No APM events included in pricing for Fargate Tasks based pricing). Additional APM events pricing starts at $1.27 per million APM events per month for a retention of 7 days. 

*Note: APM event is not the same as [APM trace][3] in terms of count and retention. Read more about [APM events][4] and how to set the [configuration settings][5].*


## How is the bill generated?

`(Host count) * (APM host pricing) + (Fargate Tasks) * (Fargate Task Pricing) + (APM event count) * (Trace Search and Analytics Pricing) - [The first 1 million traces per host]`

Trace Search and Analytics Pricing depends on the APM event retention policy you choose:

| APM events Retention               | Pricing             |
|-----------------------|-------------------------|
| 15 days (default)               | $1.70 per million APM events per month                                                       |
| 7 days              | $1.27 per million APM events per month   |
| 30 days                 | $2.50 per million APM events per month                                                        |


## Monitor Usage

If you’re an admin of your account, you can monitor your account usage using the [Usage Page][6]. This page gets updated every 72 hours. 

* APM Hosts: Shows the 99th percentile of all distinct APM hosts over all hours in the current month
* Containers: Shows the average of all distinct containers over all hours in the current month
* APM Events: Shows the sum of all APM events indexed over all hours in the current month
* Fargate Tasks: Shows the average of all Fargate tasks over all hours in the current month


## Estimate and Control Usage

### Event Estimator

To estimate the number of events a service is sending per day or per month, use the [Event Estimator page][7]. This is designed to help you decide which services to configure with Trace Search and Analytics while keeping usage and cost in your control.

### Trace Analytics Monitors on volume

To get alerts in case a code deployment causes a spike in APM events generated, set up [trace analytics monitors][8] on APM events. Get notified at any moment if the APM event volumes in any scope (`service`, `availability-zone`, etc…) of your infrastructure is growing unexpectedly:

1. Go to [Trace Analytics view][9] in APM
2. Select the `env` (you can select `*`)
3. Select `count` (you can select `*`)
4. Select the time period you want to roll it up for.
5. Select Export -> Export to Monitor
6. Define the rate you would like to set as a warning or error.
7. Define an explicit notification: The volume on this service just got too high. Define an additional exclusion filter or increase the filtering rate to put it back under control

{{< img src="tracing/trace_search_and_analytics/analytics/trace_analytics_monitors.png" alt="APM Event Filtering" responsive="true" style="width:100%;">}}

### Handling Sudden Host Upscale

Your APM bill is calculated using the top 99 percentile of active Agents sending traces every month. This ensures even if you decide to scale your environment to handle for a sudden spike in traffic around certain hours, for instance on Black Friday, you will not be charged additional for that.
You can choose to configure trace search and analytics per service or per integration your application instruments. This allows you to manually control the number of APM events generated. Note that this, however, limits Trace Search and Analytics functionality on those services and integrations.

### Event Filtering

Enable [Event Filtering][10] to send APM events at 100% throughput by default. For example, a Java service with 100 requests will generate 100 APM events from its `servlet.request` spans, as each `servlet.request` span generates an APM event. [Filtering APM events][11] has the benefit of reducing the number of billable APM events and has no effect on trace sampling. Once a service has been filtered lower than 100%, APM event analytics are upscaled to display an estimate by default, and you have the option to display the filtered value

{{< img src="tracing/trace_search_and_analytics/analytics/apm_event_filtering.png" alt="APM Event Filtering" responsive="true" style="width:100%;">}}

## Sample Deployment Scenarios

### Sample 1

One application running on container 1, another application running on container 2, and both containers are running on a single host. 

*Price:* Decided on the basis of where the Datadog agent is running irrespective of the application count. 
If the agent runs on the host, then the price is (Price Per APM host) * (No. of host = 1). Price includes no. of hosts * 1 million APM events. 
if the agent runs on each container, then each container is treated as a single host. The price is then (Price Per APM host) * (No. of containers = 2). Price includes no. of containers * 1 million APM events.


### Sample 2
AWS environment with one application that scales between 20-40 containers on 4-8 EC2 instances. A different application scales between 10-30 Fargate hosted containers. Both applications have APM installed and running on every container instance. 

*Price:* If you deploy one datadog agent per EC2 instance and run Datadog agent as a sidecar on each Fargate task, 
(Price Per APM host = $31) * (99th percentile of no. of EC2 instances) + (Price per Fargate Task = $2) * (99th percentile of no. of Fargate Tasks). Price includes no. of hosts * 1 million APM events.


### Sample 3
Sample 2: 20 worker nodes in ECS AWS, where each worker node runs on an average 20 pods. Each pod is configured to run an application with Datadog APM enabled.

*Price:* If you deploy one Agent container running per node, price is (Price per APM host) * (No. of Nodes = 20)


[1]: /tracing
[2]: /tracing/trace_search_and_analytics
[3]: /tracing/visualization/#trace
[4]: /tracing/visualization/#apm-event
[5]: /tracing/trace_search_and_analytics/?tab=java#configure-additional-services-optional
[6]: https://app.datadoghq.com/account/usage
[7]: https://app.datadoghq.com/apm/docs/trace-search?env=datadoghq.com
[8]: /monitors/monitor_types/trace_analytics
[9]: https://app.datadoghq.com/apm/search/analytics
[10]: https://app.datadoghq.com/apm/docs/trace-search?env=datadoghq.com
[11]: https://app.datadoghq.com/apm/settings?env=datadoghq.com&activeTab=0
