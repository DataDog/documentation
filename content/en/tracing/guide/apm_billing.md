---
title: APM Billing
kind: documentation
---



[APM & Distributed Tracing](link) powers you to find service bottlenecks and analyze distributed traces for your microservices architecture. Additionally, using [Trace Search and Analytics](link) feature with APM will allow you to slice and dice your application data with APM events using completely customizable tags.


*Choose your deployment environment:*

{{< tabs >}}
{{% tab "Host Based Deployment" %}}


Pricing starts at $31 per host per month (billed annually) or $36 per host per month (billed monthly). This price includes 1 million APM events per host that you can slice and dice using with Trace Search and Analytics. 

Any machine running its own OS - physical machine, virtual machine or cloud instance (virtual machine on a cloud) classifies as a host. Number of hosts sending traces are calculated every hour. At the end of the month, a 99th percentile of this count generates your bill. 


{{% /tab %}}


{{% tab "Containerized Deployment" %}}

Pricing starts at $31 per host per month (billed annually) or $36 per host per month (billed monthly). This price includes 1 million APM events per host that you can slice and dice using with Trace Search and Analytics.

If you’re using container based environment (Kubernetes, Google Cloud Run, Amazon EKS, Docker), APM is still billed on host basis, that is, physical servers and/or virtual machines those containers run on.

### Kubernetes Setup: 
Kubernetes creates pause containers to acquire the respective pod’s IP address and set up the network namespace for all other containers that join that pod. Datadog excludes all pause containers from your quota and does not charge for them (requires Agent 5.8+). For Kubernetes, APM is priced by node not by pods. For instance, find a sample deployment scenario.

### Agent Cluster Setup:
The default deployment setup for APM is to install an agent on every host. In case you do not have access to your host to deploy the agent, you can bundle your agents and divert all traffic to Datadog via a centralized set of container cluster, you can configure using these setup instructions. Pricing will be calculated for the host you configure to send traces via the cluster of agents.

Number of hosts (or Kubernetes nodes) sending traces are calculated every hour. At the end of the month, a 99th percentile of this count generates your bill. 

{{% /tab %}}

{{% tab "Fargate Deployment" %}}
Fargate pricing is based on the concurrent number of tasks. For APM, it is charged at $2/task/month metered in 5 minute buckets. The recommended deployment setup is running the Datadog agent container in the same task definition as your application container. 

For instance, if you’re running 3 Fargate tasks, the price for APM is $2 per task * 3 tasks = $6 per month.

Note that Fargate task billing does not include free functionality for Trace Search and Analytics.

Using a combination of deployment environments? Find pricing for sample deployment scenarios.

{{% /tab %}}


{{% tab "Serverless" %}}


{{% /tab %}}
{{< /tabs >}}

## Calculate APM event count and Retention

Once you have chosen your deployment to understand your agent usage, use this section to understand your bill for Trace Search and Analytics. You get 1 million APM events per host for free if you’re using host/container based deployment (No APM events included in pricing for Fargate Tasks based pricing). Additional APM events pricing starts at $1.27 per million APM events per month for a retention of 7 days. Trace Search and Analytics is priced on the basis of your APM event count. APM event represents the number of requests generated from the services that are Trace Search and Analytics enabled.

Note APM event is not the same as [APM trace](link) in terms of count and retention. Read more about [APM events](link) and how to set the [configuration settings](link).

* How is the bill generated? 

`(Host count) * (APM host pricing = $31) + (Fargate Tasks) * (Fargate Task Pricing = $2) + (APM event count) * (Trace Search and Analytics Pricing) - [The first 1 million traces per host]`

Trace Search and Analytics Pricing depends on the APM event retention policy you choose.

| APM events Retention               | Pricing             |
|-----------------------|-------------------------|
| 15 days (default)               | $1.70 per million APM events per month                                                       |
| 7 days              | $1.27 per million APM events per month   |
| 30 days                 | $2.50 per million APM events per month                                                        |


## Monitor Usage
If you’re an admin of your account, you can monitor your account usage for APM hosts using the [Usage Page](link). This page gets updated every 72 hours. 

* APM hosts - Denotes the number of billable hosts reported every hour.
* Fargate Tasks - 
* APM events -
* Month-to-month summary: Denotes an estimate of billable APM hosts till date in that month.

## Estimate and Control Usage

###Event Estimator
To estimate the number of events a service is sending per day or per month, use the [Event Estimator page](link). This is designed to help you decide which services to configure with Trace Search and Analytics while keeping usage and cost in your control.

### Trace Analytics Monitors on volume
To get alerts in case a code deployment causes a spike in APM events generated, set up trace analytics monitors [link] on APM events. Get notified at any moment if the volumes in any scope (service, availability-zone, etc…) of your infrastructure is growing unexpectedly:
1. Go to [Trace Analytics view](link) in APM
2. Build a search query that represents the volume to monitor.
3. Click on Export to monitor.
4. Define the rate you would like to set as a warning or error.
5. Define an explicit notification: The volume on this service just got too high. Define an additional exclusion filter or increase the filtering rate to put it back under control.
<Image/GIF>

### Handling Sudden Host Upscale 

Your APM bill is calculated using the top 99 percentile of active agents sending traces every month. This ensures even if you decide to scale your environment to handle for a sudden spike in traffic around certain hours, for instance on Black Friday, you will not be charged additional for that.
You can choose to configure trace search and analytics per service or per integration your application instruments. This allows you to manually control the number of APM events generated. Note that this, however, limits Trace Search and Analytics functionality on those services and integrations.

### Event Filtering

An APM event represents the top span for a service, including its metadata. Once enabled, APM events are sent at 100% throughput by default. For example, a Java service with 100 requests will generate 100 APM events from its `servlet.request` spans, as each `servlet.request` span generates an APM event. [Filtering APM events][3] has the benefit of reducing the number of billable APM events and has no effect on trace sampling. Once a service has been filtered lower than 100%, APM event analytics are upscaled to display an estimate by default, and you have the option to display the filtered value.

{{< img src="tracing/trace_search_and_analytics/analytics/apm_event_filtering.png" alt="APM Event Filtering" responsive="true" style="width:100%;">}}


## Sample Deployment Scenarios 

### Sample 1
AWS environment with one application scales between 20-40 containers on 4-8 EC2 instances. A different application scales between 10-30 fargate hosted containers. Both applications have the APM installed and running on every container instance. 

*Price:* If you deploy one datadog agent per EC2 instance and run Datadog agent as a sidecar on each fargate task, 
(Price Per APM host = $31) * (99th percentile of no. of EC2 instances) + (Price per Fargate Task = $2) * (99th percentile of no. of Fargate Tasks)
You get 1 million APM events for free with each EC2 instance.

### Sample 2
20 worker nodes in ECS AWS, where each worker node runs on average 20 pods. Each pod is configured to run an application with Datadog APM enabled.

*Price:* If you deploy one Agent container running per node, price is (Price per APM host) * (No. of Nodes = 20)

### Sample 3 
One application running on container 1, another application running on container 2, and both containers running on single host. 

*Price:* Decided on the basis of where the Datadog agent is running irrespective of the application count. 

If the agent runs on the host, then the price is (Price Per APM host) * (No. of host = 1). Price includes no. of hosts * 1 million APM events. 

Else if, the agent runs on each container, then each container is treated as a single host. Price is (Price Per APM host) * (No. of containers = 2). Price includes no. of containers * 1 million APM events.
