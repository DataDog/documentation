---
title: APM Billing
kind: faq
---

[APM & Distributed Tracing][1] powers you to find service bottlenecks and analyze distributed traces for your microservices architecture. Additionally, using the [Trace Search and Analytics][2] feature with APM allows you to slice and dice your application data with APM events using completely customizable tags.

## Understanding Your Bill

| Deployment environment | Billable Unit | [APM Events][3] for Trace Search and Analytics |
| -----------------------|---------------|-------------------------------------------|
| Host/Containers  | $36 per underlying host | No. of hosts * 1 million APM events included. Additional APM events charged per million per month.|
| Fargate | $2 per concurrent task | No APM events included in pricing. APM events charged per million per month. |

*Pricing is calculated on the basis of 99th percentile of usage at the end of month*. More details on pricing also available on [pricing page][4].

**Read more about how to [monitor][5] and [control][6] your APM usage.**

## Sample Deployment Scenarios

### Sample 1

If you're using 5 hosts, and sending 30 million APM events.

| Product | Quantity | Price |
| --------|-----------|------|
| APM Hosts | 5 | 5 * $36 = $180 |
| APM events | 30 million | (30 million - 5 * 1 million) * $1.7 per million =  $42.5 |
| Total |  |    $180 + $42.5 = $222.5 pm with 15 days APM event retention |


### Sample 2

If you're using 5 hosts, and sending 30 million APM events and deployed 20 Fargate Tasks.

| Product | Quantity | Price |
| --------|-----------|------|
| APM Hosts | 5 | 5 * $36 = $180 |
| Fargate Tasks | 20 | 20 * $2 = $40 |
| APM events | 30 million | (30 million - 5 * 1 million) * $1.7 =  $42.5 |
| Total |   |    $180 + $40 + $42.5 = $262.5 pm with 15 days APM event retention  |

### Sample 3

If you have app 1 running on container 1. App 2 running on container 2. Both Containers running on 1 host
Sending 20 million APM events on Trace Search and Analytics.

| Product | Quantity | Price |
| --------|-----------|------|
| APM Hosts | 1 | 1 * $36 = $36 |
| APM events | 20 million | (20 million - 5 * 1 million) * $1.7 = $25.5 |
| Total |    |  $36 + $25.5 = $61.5 pm with 15 days APM event retention |

### Sample 4

If you have app 1 running on 20-40 containers which are deployed on 4-8 EC2 instances. App 2 running on  10-30 Fargate hosted containers. Not using Trace Search and Analytics.

| Product | Quantity | Price |
| --------|-----------|------|
| APM Hosts (EC2 instances) | 7 (p99 of usage) | 7 * $36 = $252 |
| Fargate Tasks | 28 (p99 of usage) | 28 * $2 = $56|
| Total |  |   $252 + $56 = $308 pm  |

### Sample 5

If you have an agent running on 20 worker nodes in Kubernetes deployed on an average of 30 pods sending 20 million APM events.

| Product | Quantity | Price |
| --------|-----------|------|
| APM Hosts (Nodes) | 20 | 20 * $36 = $720 |
| APM events | 20 million | (20 million - 20 * 1 million) * $1.7 =  0 |
| Total |   |   $720 + $0 = $720 pm |


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
  
{{< whatsnext desc="APM Billing topics">}}
    {{< nextlink href="account_management/billing/usage_monitor_apm/" >}}Monitor APM Usage{{< /nextlink >}}
    {{< nextlink href="account_management/billing/usage_control_apm/" >}}Control APM Usage{{< /nextlink >}}
{{< /whatsnext >}}


[1]: /tracing
[2]: /tracing/trace_search_and_analytics
[3]: /tracing/visualization/#apm-event
[4]: https://www.datadoghq.com/pricing
[5]: /account_management/billing/usage_monitor_apm
[6]: /account_management/billing/usage_control_apm
[7]: /tracing/send_traces/#containers



