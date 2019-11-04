---
title: APM Billing
kind: faq
---

[APM & Distributed Tracing][1] powers you to find service bottlenecks and analyze distributed traces for your microservices architecture. Additionally, using the [Trace Search and Analytics][2] feature with APM allows you to slice and dice your application data with APM events using completely customizable tags.

| Billing Parameter | Price  | Trace Search and Analytics  | Billing |
| -----------------------|---------------|-------------------------------------------|-------------|
|  [APM Host][11]  | $31 per underlying [APM host][11] per month | 1 million additional APM events included per month with every APM host. | Datadog records the number of [APM hosts][12] you are concurrently monitoring in the Datadog APM service once an hour. On a high watermark plan (HWMP), these hourly measurements are ordered from highest to lowest at the end of the month, and Datadog charges based on the eighth highest measurement. [More information.][12] |
| [Fargate][11] | $2 per concurrent task per month | No APM events included in pricing. | Datadog records the number of task instances you are monitoring in the Datadog APM service at five-minute intervals. Datadog aggregates the interval-based measurements at the end of the month and charges you based on the total number of hours your applications were run and monitored. [More information.][11]|
| [APM Event][12] | $1.70 per million APM events per month | Billed when usage is in excess of APM events included with every APM host | An APM event is an individual request against an individual service in your stack. Datadog charges based on the total number of APM events submitted to the Datadog APM service at the end of the month. [More information.][12] | 

Note: If you're using a container based environment, you get billed for underlying host deploying APM agent. 

For more information, see the [Pricing page][4].

## Sample Deployment Scenarios

**Sample cases illustrate annual billing rates with default 15 days APM event retention. Contact [Sales][5] or your [Customer Success][6] Manager to discuss volume discounts for your account.**

### Case 1: Hosts and APM Events

Using 5 hosts and sending 30 million APM events.

| Billable Unit | Quantity | Price | Formula | Subtotal |
| --------|-----------|------|----------| -------------|
| APM Hosts | 5 | $31 per host | 5 * $31 | $155 |
| APM events | 30 million | 5 million included with 5 APM hosts. $1.70 per million for additional 25 million APM Events | 25 * $1.70 |  $42.50 |
| Total |  |  |  $155 + $42.50 | **$197.50 per month** |


### Case 2: Hosts, Fargate, and APM Events

Using 5 hosts, sending 20 million APM events, and have deployed APM on average 20 Fargate Tasks over the month.

| Billable Unit | Quantity | Price | Formula | Subtotal |
| --------|-----------|------|----------| -------------|
| APM Hosts | 5 | $31 per host | 5 * $31 | $155 |
| Fargate Tasks | 20 | $2 per task | 20 * $2 | $40 |
| APM events | 20 million | 5 million included with 5 APM hosts. $1.70 per million for additional 15 million APM Events | 25 * $1.70 | $25.50 |
| Total |  |  |  $155 + $40 + $25.50 | **$220.50 per month** |


### Case 3: Services, Containers and APM Events

Service 1 running on container 1, service 2 running on container 2. Both Containers are running on 1 host and are sending 20 million APM events on Trace Search and Analytics.

| Billable Unit | Quantity | Price | Formula | Subtotal |
| --------|-----------|------|----------| -------------|
| APM Hosts | 1 | $31 per host | 1 * $31 | $31 |
| APM events | 20 million | 1 million included with 1 APM host. $1.70 per million for additional 19 million APM Events | 19 * $1.70 | $32.30 |
| Total |  |  |  $31 + $32.30 | **$63.30 per month** |


### Case 4: Dynamic Scaling Hosts, Containers, Fargate and no APM events

App 1 running on 20-40 containers which are deployed on 4-8 host instances, app 2 running on 10-30 Fargate tasks and you're not using Trace Search and Analytics. Assuming, the 99th percentile usage of EC2 instances is 7, and average of Fargate Tasks over the month is 28. 

| Billable Unit | Quantity | Price | Formula | Subtotal |
| --------|-----------|------|----------| -------------|
| APM Hosts | 7 | $31 per host | 7 * $31 | $252 |
| Fargate Tasks | 28 | $2 per task | 28 * $2 | $256 |
| Total |  |  |  $252 + $56 | **$308 per month** |

Note that the container count will not matter if the deployed agent is on the EC2 instances. 

### Case 5: Kubernetes Nodes and APM Events

Agent running on 20 worker nodes in Kubernetes sending 20 million APM events.

| Billable Unit | Quantity | Price | Formula | Subtotal |
| --------|-----------|------|----------| -------------|
| APM Hosts (Nodes) | 20 | $31 per host | 20 * $31 | $720 |
| APM events | 20 million | 20 million included with 20 APM hosts (nodes). No additional APM Events | 0 * $1.70 | 0  |
| Total |  |  |  $720 + $0 | **$720 per month** |

For Kubernetes, APM is priced by nodes not by pods.

### FAQs
**1. What is classified as an APM host for billing?**

A [host][11] is a physical or virtual operating system instance. Datadog records the number of hosts you are concurrently monitoring in the Datadog Infrastructure service once an hour. For billing APM, number of hosts with [APM installed][7] and sending traces are calculated every hour. At the end of the month, you are billed based on your 99th percentile usage for [APM hosts][12]. 

**2. How is billing calculated if I deploy one agent per container?**

It is recommended to [setup running][8] one agent per underlying host for container deployment. If you still choose to run one agent per container, then each container is treated as a single host. The price is then (Price Per APM host) * (No. of containers)

**3. What happens to my bill if I have to suddenly scale my environment?**

Your APM bill is calculated using the top 99 percentile of active agents sending traces every hour of each month. At the end of the month, we disregard the top 1% value, giving a shield against being billed for unexpected spikes.


**4. Do I get charged for pause containers in Kubernetes?**

Kubernetes creates pause containers to acquire the respective pod’s IP address and set up the network namespace for all other containers that join that pod. Datadog excludes all pause containers from your quota and does not charge for them (requires Agent 5.8+). For Kubernetes, APM is priced by nodes not by pods.


**5. How is the host billing related to my services?**

APM is billed on the basis of [hosts][11] deployed with agents sending traces and not services. Trace Search and Analytics is billed on the basis of [APM event][3] count. To estimate how many APM events each of your service can send, use the [Event Estimator][9].

**6. Can I use Trace Search and Analytics without APM?**

No. Trace Search and Analytics is an additional functionality available along with APM which billed on the basis [APM event volume][10]. 

## Further Reading
  
{{< whatsnext>}}
    {{< nextlink href="account_management/billing/usage_monitor_apm/" >}}View and Alert on APM Usage{{< /nextlink >}}
    {{< nextlink href="account_management/billing/usage_control_apm/" >}}Estimate and Control APM Usage{{< /nextlink >}}
{{< /whatsnext >}}


[1]: /tracing
[2]: /tracing/trace_search_and_analytics
[3]: /tracing/visualization/#apm-event
[4]: https://www.datadoghq.com/pricing
[5]: mailto:sales@datadoghq.com
[6]: mailto:success@datadoghq.com
[7]: /tracing/send_traces/#datadog-agent
[8]: /tracing/send_traces/#containers
[9]: /account_management/billing/
[10]: /account_management/billing/apm_distributed_tracing/#case-1-hosts-and-apm-events
[11]: /account_management/billing/pricing/#infrastructure-monitoring
[12]: /account_management/billing/pricing/#apm