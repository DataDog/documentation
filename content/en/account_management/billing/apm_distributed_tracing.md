---
title: APM Billing
kind: documentation
aliases:
- /account_management/billing/profiler/
---

[APM & Continuous Profiler][1] powers you to find service bottlenecks, analyze distributed traces and code performance across your microservices architecture.

There are two options available for pricing, depending on whether APM and Profiling are bundled. Additionally, using the [Tracing Without Limits][2] feature with APM allows you to slice and dice your application data with spans indexed by [tagged-based custom retention filters][3].

| Billing Parameter  | Price                                      | Indexed Spans                                                                 | Billing                                                                                                                                                                                                                                                                                                                          |
|--------------------|--------------------------------------------|-------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [APM Host][4]      | $31 per underlying [APM host][4] per month | 1 million Indexed Spans and 150 GB of Ingested Spans included per month with every APM host.   | Datadog records the number of [APM hosts][5] you are concurrently monitoring in the Datadog APM service once an hour. On a high watermark plan (HWMP), these hourly measurements are ordered from highest to lowest at the end of the month, and Datadog charges based on the eighth highest measurement. [More information.][5] |
| [APM & Continuous Profiler][4] | $40 per underlying [APM host][4], includes the [Continuous Profiler][6] with 4 profiled containers per month. | Same as APM Host | Same as APM Host |
| [Fargate][4]       | $2 per concurrent task per month           | 65,000 Indexed Spans and 10 GB of Ingested Spans included in pricing.                                        | Datadog records the number of task instances you are monitoring in the Datadog APM service at five-minute intervals. Datadog aggregates the interval-based measurements at the end of the month and charges you based on the total number of hours your applications were run and monitored. [More information.][4]              |
| [Indexed span][5] | $1.70 per million Indexed Spans per month | Billed when usage is in excess of Indexed Spans included with every APM host | An Indexed span is an individual request against an individual service in your stack. Datadog charges based on the total number of spans indexed via retention filters or legacy Analyzed Spans to the Datadog APM service at the end of the month. [More information.][5]                                                                                          |
| [Ingested span][5] | $.10 per GB Ingested Spans per month | Billed when usage is in excess of Ingested Spans included with every APM host | An Ingested span is an individual request against an individual service in your stack. Datadog charges based on the total number of gigabytes of spans ingested to Datadog at the end of the month. [More information.][5]                                                                                          |

**Note**: If you're using a container based environment, you get billed for the underlying host deploying the Datadog Agent.

**Note**: One profiled container is a container that is running the Continuous Profiler service. This does not include containers that are not being profiled. For instance, a DNS service container that is NOT profiled, running concurrently with your application container that IS profiled, will not be counted towards the four profiler containers allotment.

For more information, see the [Pricing page][7].

## Deployment scenarios

**Sample cases illustrate annual billing rates with default 15 days Indexed Span retention. Contact [Sales][7] or your [Customer Success][8] Manager to discuss volume discounts for your account.**

### Hosts, indexed spans, and extra ingested Spans

Using 5 hosts and sending 30 million Indexed Spans, with 900 GB of total Ingested Spans without Profiler.

| Billable Unit  | Quantity   | Price                                                                                           | Formula       | Subtotal              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------|-----------------------|
| APM Hosts      | 5          | $31 per host                                                                                    | 5 * $31       | $155                  |
| Indexed Spans | 30 million | 5 million included with 5 APM hosts. $1.70 per million for additional 25 million Indexed Spans | 25 * $1.70    | $42.50                |
| Ingested Spans | 900 GB          | 750 GB included with 5 APM hosts. $.10 per GB for additional 150 GB of Ingested Spans.                                                                                 | 150 * $.10      | $15                  |
| Total          |            |                                                                                                 | $155 + $42.50 + $15 | **$212.50 per month** |

### Hosts with six profiled containers

APM & Continuous Profiler for five hosts with six apps running in separate containers per each host.

| Billable Unit  | Quantity   | Price                                                                                           | Formula       | Subtotal              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------|-----------------------|
| APM & Continuous Profiler       | 5          | $40 per host                                                                                    | 5 * $40       | $200                  |
| Profiled containers  | 6 per host | $2 per additional container per host. In this case there are 6 - 4 = 2 additional containers for each host        | 2  * $2 * 5 hosts         | $20                   |
| Total          |            |                                                                                                 | $60 + $20      | **$220 per month**    |

### Hosts, Fargate, and indexed spans

Using 5 hosts, sending 20 million Indexed Spans, and have deployed APM on average 20 Fargate Tasks over the month.

| Billable Unit  | Quantity   | Price                                                                                           | Formula             | Subtotal              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------------|-----------------------|
| APM Hosts      | 5          | $31 per host                                                                                    | 5 * $31             | $155                  |
| Fargate Tasks  | 20         | $2 per task                                                                                     | 20 * $2             | $40                   |
| Indexed Spans | 20 million | 5 million included with 5 APM hosts. 1.3 million included with 20 Fargate tasks. $1.70 per million for additional 13.7 million Indexed Spans | 13.7 * $1.70          | $23.29                |
| Total          |            |                                                                                                 | $155 + $40 + $23.29 | **$218.29 per month** |

### APM & Continuous Profiler, services, containers, and indexed spans

APM & Continuous Profiler for service 1 running on container 1, service 2 running on container 2. Both Containers are running on 1 host and are sending 20 million Indexed Spans on App Analytics.

| Billable Unit  | Quantity   | Price                                                                                          | Formula      | Subtotal             |
|----------------|------------|------------------------------------------------------------------------------------------------|--------------|----------------------|
| APM & Continuous Profiler      | 1          | $40 per host                                                                                   | 1 * $40      | $40                  |
| Profiled containers  | 2 | $0 as profiled containers are within the 4 per APM Host allotment.
| Indexed Spans | 20 million | 1 million included with 1 APM host. $1.70 per million for additional 19 million Indexed Spans | 19 * $1.70   | $32.30               |
| Total          |            |                                                                                                | $40 + $32.30 | **$72.30 per month** |

### Dynamic scaling hosts, containers, Fargate, and no indexed spans

App 1 running on 20-40 containers which are deployed on 4-8 host instances, app 2 running on 10-30 Fargate tasks and you're not using App Analytics. Assuming, the 99th percentile usage of EC2 instances is 7, and average of Fargate Tasks over the month is 28.

| Billable Unit | Quantity | Price        | Formula    | Subtotal           |
|---------------|----------|--------------|------------|--------------------|
| APM Hosts     | 7        | $31 per host | 7 * $31    | $217               |
| Fargate Tasks | 28       | $2 per task  | 28 * $2    | $56                |
| Total         |          |              | $217 + $56 | **$273 per month** |

Note that the container count will not matter if the deployed agent is on the EC2 instances.

### Kubernetes nodes and indexed spans

APM & Continuous Profiler for apps with a Datadog Agent running on 20 worker nodes in Kubernetes sending 20 million Indexed Spans. 10 of these worker nodes have 8 pods each with 1 container per pod, the other 10 have 2 pods each with 1 container per pod.

| Billable Unit     | Quantity   | Price                                                                       | Formula   | Subtotal           |
|-------------------|------------|-----------------------------------------------------------------------------|-----------|--------------------|
| APM & Continuous Profiler (Nodes) | 20         | $40 per host                                                                | 20 * $340 | $800               |
| Profiled containers  | 100 in aggregate | $2 per additional container. In this case 20 hosts would allow up to 80 containers but we have 20 containers summed across two hosts: 100-80 = 20 additional containers        | $2 * 20 hosts        | $40                    |
| Indexed Spans    | 20 million | 20 million included with 20 APM hosts (nodes). No additional Indexed Spans | 0 * $1.70 | 0                  |
| Total             |            |                                                                             | $800 + $40 | **$840 per month** |

For Kubernetes, APM & Continuous Profiler are priced by nodes not by pods.

### Lambda functions and indexed spans

An AWS-Lambda based serverless application being invoked 10 million times in a month while sending 10 million Indexed Spans.

| Billable Unit                  | Quantity   | Price                                                                       | Formula   | Subtotal           |
|--------------------------------|------------|-----------------------------------------------------------------------------|-----------|--------------------|
| Lambda Function Invocations    | 10 million | [$5 per month][9]                                                           | 10 * $5  | $50               |
| Indexed Spans                  | 10 million | 150,000 Indexed Spans included with each 1 million Lambda invocations. $1.70 per million additional Indexed Spans | 8.5 * $1.70 | $14.45               |
| Total                          |            |                                                                             | $50 + $14.45 | **$64.45 per month** |

## FAQ

**1. What is classified as an APM host for billing?**

A [host][4] is a physical or virtual operating system instance. Datadog records the number of hosts you are concurrently monitoring in the Datadog Infrastructure service once an hour. For billing APM, number of hosts with [APM installed][10] and sending traces are calculated every hour. At the end of the month, you are billed based on your 99th percentile usage for [APM hosts][5].

**2. How is billing calculated if I deploy one agent per container?**

It is recommended to [setup running][11] one agent per underlying host for container deployment. If you still choose to run one agent per container, then each container is treated as a single host. The price is then (Price Per APM host) * (Number of containers)

**3. What is classified as an APM Fargate task for billing?**

A Fargate task is a collection of containers that are scheduled to run on AWS Fargate as a serverless compute engine. Datadog records the number of tasks you are concurrently monitoring in Datadog at five-minute intervals. For billing APM, Datadog bills based on the average number of Fargate tasks that send traces to Datadog per hour across the month of your account.

**4. What happens to my bill if I have to suddenly scale my environment?**

Your APM bill is calculated using the top 99 percentile of active agents sending traces every hour of each month. At the end of the month, we disregard the top 1% value, giving a shield against being billed for unexpected spikes.

**5. Do I get charged for pause containers in Kubernetes?**

Kubernetes creates pause containers to acquire the respective pod’s IP address and set up the network namespace for all other containers that join that pod. Datadog excludes all pause containers from your quota and does not charge for them (requires Agent 5.8+). For Kubernetes, APM is priced by nodes not by pods.

**6. How is the host billing related to my services?**

APM is billed on the basis of [hosts][4] deployed with agents sending traces and not services. App Analytics is billed on the basis of [Indexed Span][12] count. To estimate how many Indexed Spans each of your service can send, use the [Event Estimator][11].

**7. What happens to my existing App Analytics filters?**

As of October 20, 2020, all existing App Analytics filters are automatically transitioned to Retention Filters. You can continue to let the filters remain unchanged or modify them as needed. Transitioned filters are marked with an *i* representing Legacy App Analytics Filters within the [retention filters][3] page.

**8. How do I estimate my Ingested Span volume?**

Datadog provides the metrics `datadog.estimated_usage.apm.ingested_bytes` and `datadog.estimated_usage.apm.ingested_spans` for monitoring ingested span volume. More information is available in the [Usage Metrics][7] documentation.

**9. Is the Continuous Profiler as a standalone product?**

Yes. Let us know if you are interested in buying the Continuous Profiler without APM. Please reach out to us by contacting [Sales][13] or through your [Customer Success Manager][3].


## Further Reading

{{< whatsnext >}}
    {{< nextlink href="account_management/billing/usage_monitor_apm/" >}}View and Alert on APM Usage{{< /nextlink >}}
    {{< nextlink href="account_management/billing/usage_control_apm/" >}}Estimate and Control APM Usage{{< /nextlink >}}
{{< /whatsnext >}}


[1]: /tracing/
[2]: /tracing/trace_search_and_analytics/
[3]: /tracing/trace_retention_and_ingestion/#retention-filters
[4]: /account_management/billing/pricing/#infrastructure-monitoring
[5]: /account_management/billing/pricing/#apm
[6]: /tracing/profiling/
[7]: https://www.datadoghq.com/pricing/
[8]: mailto:success@datadoghq.com
[9]: https://docs.datadoghq.com/account_management/billing/serverless/#serverless-functions
[10]: /tracing/send_traces/#datadog-agent
[11]: /account_management/billing/
[12]: /tracing/visualization/
[13]: mailto:sales@datadoghq.com
