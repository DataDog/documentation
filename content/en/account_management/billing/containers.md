---
title: Containers Billing
kind: documentation
---

## Overview

Containers are supported in Pro and Enterprise plans. Depending on your plan, you can monitor 10 or 20 containers free for each host license. The container count is averaged across your entire infrastructure.

Additional containers are billed at an [additional cost][1] per container per hour. In addition, you can purchase prepaid containers. Contact [Sales][2] or your [Customer Success][3] Manager to discuss containers for your account.

**Note**: The Agent is monitored by default.

### Kubernetes

Kubernetes creates pause containers (requires Agent v5.8+) to acquire the respective pod’s IP address and set up the network namespace for all other containers that join that pod. Datadog excludes all pause containers from your quota and does not charge for them (requires Agent v7.20+ for AWS EKS pause container exclusion). 

### Fargate

Fargate is charged based on the concurrent number of tasks. For pricing, see the [Infrastructure][4] section on the pricing page.

### GKE Autopilot

Billing of [GKE Autopilot][5] environments is the same as that of [GKE Standard][6].

## Frequently asked questions

**How does Datadog measure on-demand usage?**

Containers are metered in five minute increments. The difference is calculated between the number of containers observed and the allotment for the account. The allotment for the account is the total of the included containers (10/host for Pro and 20/host for Enterprise) and any container commitment. The containers exceeding the allotment are averaged out over the hour to calculate the hourly on-demand usage. This method normalizes the on-demand usage for short term spikes and variations between hosts.

**What if I run many containers for a short period of time?**

As stated above, on-demand container usage is calculated in five minute intervals, and the usage is measured by the fractional hours of monitored containers. If you have 1200 on-demand containers during a single five-minute interval (1/12 of an hour), these containers are metered as 100 container-hours (1200/12).

**What if some of my hosts run very few containers and other hosts run many?**

As long as the number of total running containers does not exceed the total allotment for the account, these are included in your infrastructure plan.

**I am using autoscaling groups, and I have peak and off-peak hours. How does this affect my on-demand container usage?**

The on-demand calculations are performed using the allotment that is based on the number of infrastructure hosts. Since the autoscaling groups increase the number of hosts during peak hours, the total container allotment also increases during those periods.

**Are Datadog Agent containers counted against my allocation?**

Yes.

**I have a pod in CrashLoopBackoff. Are those containers counted?**

If a container in the pod is running for over ten seconds, it is be counted against the allotment during the metering interval. Since the pod is unhealthy, the data collected in these situations is valuable for troubleshooting. Also, the data is tagged by the pod name, so as underlying containers attempt to re-run (each time as a new `container_id`) all of the context (such as relevant events and log entries) is kept together in the pod view.


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
