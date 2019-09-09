---
title: APM Billing
kind: faq
---

[APM & Distributed Tracing][1] powers you to find service bottlenecks and analyze distributed traces for your microservices architecture. Additionally, using the [Trace Search and Analytics][2] feature with APM allows you to slice and dice your application data with APM events using completely customizable tags.

| Billable Unit | Pricing | Features Offered |
| -----------------------|---------------|-------------------------------------------|
| Host/Containers  | $31 per underlying host per month | APM and Distributed Tracing on purchased hosts. 1 million APM events included per month per host for using Trace Search and Analytics |
| Fargate | $2 per concurrent task per month | APM and Distributed Tracing on purchased tasks. No APM events included in pricing. |
| APM Events | $1.70 per million APM events per month | Additional APM Events with 15 days retention for using Trace Search and Analytics|

*Pricing is calculated by counting of hosts (fargate tasks) every hour (every 5 minutes) and then calculating its 99th percentile. That is, the top 1% of usage hours, in case you have a spike in scale, is not considered for billing.* 

Datadog has many pricing plans to fit your needs. For more information, see the [Pricing page][4].


## Sample Deployment Scenarios

### Case 1: Hosts and APM Events

Using 5 hosts and sending 30 million APM events with 15 days retention.

| Billable Unit | Quantity | Price | Subtotal |
| --------|-----------|------|----------|
| APM Hosts | 5 | $31 per host | 5 * $31 = $155 |
| APM events | 30 million | 5 million included. $1.70 per million for additional 25 million Events | 25 * $1.7 = $42.50
| Total |  |  |  $155 + $42.50 = **$197.50 per month** |


### Case 2: Hosts, Fargate, and APM Events

Using 5 hosts, sending 30 million APM events with 15 days retention, and have deployed APM on 20 Fargate Tasks.

| Billable Unit | Quantity | Price |
| --------|-----------|------|
| APM Hosts | 5 | 5 * $31 = $180 |
| Fargate Tasks | 20 | 20 * $2 = $40 |
| APM events | 30 million | (30 million - 5 * 1 million) * $1.70 =  $42.50 |
| Total |   |    $180 + $40 + $42.50 = $262.50 per month |

### Case 3: Containers and APM Events

*App 1* running on *container 1*, *app 2* running on *container 2*. Both Containers are running on 1 host
and are sending 20 million APM events on Trace Search and Analytics.

| Billable Unit | Quantity | Price |
| --------|-----------|------|
| APM Hosts | 1 | 1 * $31 = $31 |
| APM events | 20 million | (20 million - 5 * 1 million) * $1.70 = $25.50 |
| Total |    |  $31 + $25.50 = $61.50 per month |

### Case 4: Dynamic Scaling Hosts, Containers, Fargate and no APM events

App 1 running on 20-40 containers which are deployed on 4-8 EC2 instances, app 2 running on 10-30 Fargate hosted containers and you're not using Trace Search and Analytics. Note that the container count will not matter if the deployed agent is on the EC2 instances. Assuming, the p99 usage of EC2 instances is 7, and p99 usage of Fargate Tasks is 28. 

| Billable Unit | Quantity | Price |
| --------|-----------|------|
| APM Hosts | 7  | 7 * $31 = $252 |
| Fargate Tasks | 28 | 28 * $2 = $56|
| Total |  |   $252 + $56 = $308 per month  |

### Case 5: Kubernetes Nodes and APM Events

Agent running on 20 worker nodes in Kubernetes deployed on an average of 30 pods sending 20 million APM events.

| Billable Unit | Quantity | Price |
| --------|-----------|------|
| APM Hosts (Nodes) | 20 | 20 * $31 = $720 |
| APM events | 20 million | (20 million - 20 * 1 million) * $1.70 =  0 |
| Total |   |   $720 + $0 = $720 per month |

**Note: Sample cases illustrate annual billing rates. Contact [Sales][5] or your [Customer Success][6] Manager to discuss volume discounts for your account.**


### FAQs
**1. What is classified as a host for billing?**

Any machine running its own OS - physical machine, virtual machine or cloud instance (virtual machine on a cloud) is considered a host. For billing APM, number of hosts sending traces are calculated every hour. At the end of the month, you are billed based on your 99th percentile usage. 

**2. What happens to my bill if I have to suddenly scale my environment?**

Your APM bill is calculated using the top 99 percentile of active agents sending APM events every month. This ensures that even if you need to scale your environment to handle a sudden spike in traffic, for instance on Black Friday, you will not be charged additional for that.

**3. Do I get charged for pause containers in Kubernetes?**

Kubernetes creates pause containers to acquire the respective pod’s IP address and set up the network namespace for all other containers that join that pod. Datadog excludes all pause containers from your quota and does not charge for them (requires Agent 5.8+). For Kubernetes, APM is priced by node not by pods. See sample here[link].

**4. How is billing calculated if I deploy one agent per container?**

It is recommended to run one agent per underlying host for containers. If the agent runs on each container, then each container is treated as a single host. The price is then (Price Per APM host) * (No. of containers)

**5. How is billing calculated if I deploy agent as a proxy for cluster of containers?**

The default deployment setup for APM is to install an agent on every host. In case you do not have access to your host to deploy the agent, you can bundle your agents and divert all traffic to Datadog via a centralized set of container cluster, you can configure using these [setup instructions][7]. Pricing will be calculated for the host you configure to send traces via the cluster of agents.

## Further Reading
  
{{< whatsnext>}}
    {{< nextlink href="account_management/billing/usage_monitor_apm/" >}}View and Alert on APM Usagee{{< /nextlink >}}
    {{< nextlink href="account_management/billing/usage_control_apm/" >}}Estimate and Control APM Usage{{< /nextlink >}}
{{< /whatsnext >}}


[1]: /tracing
[2]: /tracing/trace_search_and_analytics
[3]: /tracing/visualization/#apm-event
[4]: https://www.datadoghq.com/pricing
[5]: mailto:sales@datadoghq.com
[6]: mailto:success@datadoghq.com
[7]: /tracing/send_traces/#containers



