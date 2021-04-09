---
title: Containers billing
kind: documentation
---

## Overview

Containers are supported in Pro and Enterprise plans. Depending on your plan, you can monitor 10 or 20 containers free for each host license. The container count is averaged across your entire infrastructure.

Additional containers are billed at an [additional cost][1] per container per hour. In addition, you can purchase prepaid containers. Contact [Sales][2] or your [Customer Success][3] Manager to discuss containers for your account.

### Kubernetes

Kubernetes creates pause containers (requires Agent v5.8+) to acquire the respective pod’s IP address and set up the network namespace for all other containers that join that pod. Datadog excludes all pause containers from your quota and does not charge for them (requires Agent v7.20+ for AWS EKS pause container exclusion). 

### Fargate

Fargate is charged based on the concurrent number of tasks. For pricing, see the [Infrastructure][4] section on the pricing page.

## Troubleshooting

For technical questions, contact [Datadog support][5].

For billing questions, contact your [Customer Success][3] Manager.

[1]: https://www.datadoghq.com/pricing/#tab-faq-infrastructure
[2]: mailto:sales@datadoghq.com
[3]: mailto:success@datadoghq.com
[4]: https://www.datadoghq.com/pricing/#section-infra
[5]: /help/
