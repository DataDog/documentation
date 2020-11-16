---
title: APM Billing
kind: documentation
---

[APM & Distributed Tracing][1] powers you to find service bottlenecks and analyze distributed traces for your microservices architecture. Additionally, using the [Tracing Without Limits][2] feature with APM allows you to slice and dice your application data with spans indexed by [tagged-based custom retention filters][3].

**Note:** Indexed Spans were formerly known as Analyzed Spans and renamed with the launch of Tracing Without Limits on October 20th, 2020.

| Billing Parameter  | Price                                      | Indexed Spans                                                                 | Billing                                                                                                                                                                                                                                                                                                                          |
|--------------------|--------------------------------------------|-------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [APM Host][4]      | $31 per underlying [APM host][4] per month | 1 million additional Indexed Spans included per month with every APM host.   | Datadog records the number of [APM hosts][5] you are concurrently monitoring in the Datadog APM service once an hour. On a high watermark plan (HWMP), these hourly measurements are ordered from highest to lowest at the end of the month, and Datadog charges based on the eighth highest measurement. [More information.][5] |
| [Fargate][4]       | $2 per concurrent task per month           | No Indexed Spans included in pricing.                                        | Datadog records the number of task instances you are monitoring in the Datadog APM service at five-minute intervals. Datadog aggregates the interval-based measurements at the end of the month and charges you based on the total number of hours your applications were run and monitored. [More information.][4]              |
| [Indexed span][5] | $1.70 per million Indexed Spans per month | Billed when usage is in excess of Indexed Spans included with every APM host | An Indexed span is an individual request against an individual service in your stack. Datadog charges based on the total number of spans indexed via retention filters or legacy Analyzed Spans to the Datadog APM service at the end of the month. [More information.][5]                                                                                          |

Note: If you're using a container based environment, you get billed for underlying host deploying APM agent.

For more information, see the [Pricing page][6].

## Sample Deployment Scenarios

**Sample cases illustrate annual billing rates with default 15 days Indexed Span retention. Contact [Sales][6] or your [Customer Success][7] Manager to discuss volume discounts for your account.**

### Case 1: Hosts and Indexed Spans

Using 5 hosts and sending 30 million Indexed Spans.

| Billable Unit  | Quantity   | Price                                                                                           | Formula       | Subtotal              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------|-----------------------|
| APM Hosts      | 5          | $31 per host                                                                                    | 5 * $31       | $155                  |
| Indexed Spans | 30 million | 5 million included with 5 APM hosts. $1.70 per million for additional 25 million Indexed Spans | 25 * $1.70    | $42.50                |
| Total          |            |                                                                                                 | $155 + $42.50 | **$197.50 per month** |

### Case 2: Hosts, Fargate, and Indexed Spans

Using 5 hosts, sending 20 million Indexed Spans, and have deployed APM on average 20 Fargate Tasks over the month.

| Billable Unit  | Quantity   | Price                                                                                           | Formula             | Subtotal              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------------|-----------------------|
| APM Hosts      | 5          | $31 per host                                                                                    | 5 * $31             | $155                  |
| Fargate Tasks  | 20         | $2 per task                                                                                     | 20 * $2             | $40                   |
| Indexed Spans | 20 million | 5 million included with 5 APM hosts. $1.70 per million for additional 15 million Indexed Spans | 15 * $1.70          | $25.50                |
| Total          |            |                                                                                                 | $155 + $40 + $25.50 | **$220.50 per month** |

### Case 3: Services, Containers and Indexed Spans

Service 1 running on container 1, service 2 running on container 2. Both Containers are running on 1 host and are sending 20 million Indexed Spans on App Analytics.

| Billable Unit  | Quantity   | Price                                                                                          | Formula      | Subtotal             |
|----------------|------------|------------------------------------------------------------------------------------------------|--------------|----------------------|
| APM Hosts      | 1          | $31 per host                                                                                   | 1 * $31      | $31                  |
| Indexed Spans | 20 million | 1 million included with 1 APM host. $1.70 per million for additional 19 million Indexed Spans | 19 * $1.70   | $32.30               |
| Total          |            |                                                                                                | $31 + $32.30 | **$63.30 per month** |

### Case 4: Dynamic Scaling Hosts, Containers, Fargate and no Indexed Spans

App 1 running on 20-40 containers which are deployed on 4-8 host instances, app 2 running on 10-30 Fargate tasks and you're not using App Analytics. Assuming, the 99th percentile usage of EC2 instances is 7, and average of Fargate Tasks over the month is 28.

| Billable Unit | Quantity | Price        | Formula    | Subtotal           |
|---------------|----------|--------------|------------|--------------------|
| APM Hosts     | 7        | $31 per host | 7 * $31    | $217               |
| Fargate Tasks | 28       | $2 per task  | 28 * $2    | $56                |
| Total         |          |              | $217 + $56 | **$273 per month** |

Note that the container count will not matter if the deployed agent is on the EC2 instances.

### Case 5: Kubernetes Nodes and Indexed Spans

Agent running on 20 worker nodes in Kubernetes sending 20 million Indexed Spans.

| Billable Unit     | Quantity   | Price                                                                       | Formula   | Subtotal           |
|-------------------|------------|-----------------------------------------------------------------------------|-----------|--------------------|
| APM Hosts (Nodes) | 20         | $31 per host                                                                | 20 * $31  | $620               |
| Indexed Spans    | 20 million | 20 million included with 20 APM hosts (nodes). No additional Indexed Spans | 0 * $1.70 | 0                  |
| Total             |            |                                                                             | $620 + $0 | **$620 per month** |

For Kubernetes, APM is priced by nodes not by pods.

### Case 6: Lambda Functions and Indexed Spans

Continuously invoking a Lambda function every hour for an entire month while sending 20 million Indexed Spans.

| Billable Unit     | Quantity   | Price                                                                       | Formula   | Subtotal           |
|-------------------|------------|-----------------------------------------------------------------------------|-----------|--------------------|
| Lambda Function   | 1          | [$5 per month][8]                                               | 1 * $5  | $5               |
| Indexed Spans    | 20 million | $1.70 per million Indexed Spans | 20 * $1.70 | $34               |
| Total             |            |                                                                             | $5 + $34 | **$39 per month** |


## FAQs

**1. What is classified as an APM host for billing?**

A [host][4] is a physical or virtual operating system instance. Datadog records the number of hosts you are concurrently monitoring in the Datadog Infrastructure service once an hour. For billing APM, number of hosts with [APM installed][9] and sending traces are calculated every hour. At the end of the month, you are billed based on your 99th percentile usage for [APM hosts][5].

**2. How is billing calculated if I deploy one agent per container?**

It is recommended to [setup running][10] one agent per underlying host for container deployment. If you still choose to run one agent per container, then each container is treated as a single host. The price is then (Price Per APM host) * (Number of containers)

**3. What is classified as an APM Fargate task for billing?**

A Fargate task is a collection of containers that are scheduled to run on AWS Fargate as a serverless compute engine. Datadog records the number of tasks you are concurrently monitoring in Datadog at five-minute intervals. For billing APM, Datadog bills based on the average number of Fargate tasks that send traces to Datadog per hour across the month of your account.

**4. What happens to my bill if I have to suddenly scale my environment?**

Your APM bill is calculated using the top 99 percentile of active agents sending traces every hour of each month. At the end of the month, we disregard the top 1% value, giving a shield against being billed for unexpected spikes.

**5. Do I get charged for pause containers in Kubernetes?**

Kubernetes creates pause containers to acquire the respective pod’s IP address and set up the network namespace for all other containers that join that pod. Datadog excludes all pause containers from your quota and does not charge for them (requires Agent 5.8+). For Kubernetes, APM is priced by nodes not by pods.

**6. How is the host billing related to my services?**

APM is billed on the basis of [hosts][4] deployed with agents sending traces and not services. App Analytics is billed on the basis of [Indexed Span][11] count. To estimate how many Indexed Spans each of your service can send, use the [Event Estimator][10].

**7. What happens to my existing App Analytics filters?**

As of October 20, 2020, all existing App Analytics filters are automatically transitioned to Retention Filters. You can continue to let the filters remain unchanged or modify them as needed. Transitioned filters are marked with an *i* representing Legacy App Analytics Filters within the [retention filters][3] page.

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
[6]: https://www.datadoghq.com/pricing/
[7]: mailto:success@datadoghq.com
[8]: https://docs.datadoghq.com/account_management/billing/serverless/#serverless-functions
[9]: /tracing/send_traces/#datadog-agent
[10]: /account_management/billing/
[11]: /tracing/visualization/
