---
title: Containers Billing
---

## Overview

Containers are supported in Pro and Enterprise plans. Depending on your plan, you can monitor 5 or 10 containers free for each host license. The container count is averaged across your entire infrastructure.

Additional containers are billed at an [additional cost][1] per container per hour. In addition, you can purchase prepaid containers. Contact [Sales][2] or your [Customer Success][3] Manager to discuss containers for your account.

### Kubernetes

Kubernetes creates pause containers (requires Agent v5.8+) to acquire the respective pod's IP address and set up the network namespace for all other containers that join that pod. Datadog excludes all pause containers from your quota and does not charge for them (requires Agent v7.20+ for AWS EKS pause container exclusion). 

### Fargate

Fargate is charged based on the concurrent number of tasks. For pricing, see the [Infrastructure][4] section on the pricing page.

### GKE Autopilot

Billing of [GKE Autopilot][5] environments is the same as that of [GKE Standard][6].

## Frequently asked questions

**How does Datadog measure hourly on-demand usage?**

Containers are metered in five minute increments. The difference is calculated between the number of containers observed and the allotment for the account. The allotment for the account is the total of the included containers (5/host for Pro and 10/host for Enterprise by default) and any contracted container commitment. The number of containers exceeding the allotment is averaged out over the hour to calculate the hourly on-demand usage. The average is determined by summing each five minute increment over each hour and dividing by twelve. This method normalizes the on-demand usage for short term spikes and variations between hosts.

**What if a user runs a particularly high number of containers for a short period of time?**

Using the hourly on-demand usage calculation above, if there are 1200 on-demand containers during a single five-minute interval (1/12 of an hour), these containers are metered as 100 container hours (1200/12).

**What if containers are unevenly distributed across hosts?**

As long as the number of total running containers does not exceed the total allotment for the account, these are included in the account's infrastructure plan.

**When using autoscaling groups, there are have peak and off-peak hours. How does this affect the on-demand container usage?**

The on-demand calculations are performed using the allotment that is based on the number of infrastructure hosts. Since the autoscaling groups increase the number of hosts during peak hours, the total container allotment also increases during those periods.

**Are Datadog Agent containers counted against the allocation?**

No, the Datadog Agent containers are not counted against your 5 (Pro tier) or 10 (Enterprise tier) allocation.

**Are containers belonging to pods in constant `CrashLoopBackoff` counted?**

If a container in the pod is running for over ten seconds, it is counted against the allotment during the metering interval. Since the pod is unhealthy, the data collected in these situations is valuable for troubleshooting. Also, the data is tagged by the pod name, so as underlying containers attempt to re-run (each time as a new `container_id`) all of the context (such as relevant events and log entries) is kept together in the pod view.


## Troubleshooting

For technical questions, contact [Datadog support][7].

For billing questions, contact your [Customer Success][3] Manager.

[1]: https://www.datadoghq.com/pricing/#tab-faq-infrastructure
[2]: mailto:sales@datadoghq.com
[3]: mailto:success@datadoghq.com
[4]: https://www.datadoghq.com/pricing/#section-infra
[5]: /agent/kubernetes/distributions/?tab=helm#autopilot
[6]: /integrations/google_kubernetes_engine/
[7]: /help/
