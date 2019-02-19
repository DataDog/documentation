---
title: Containers billing
kind: faq
---

## Overview

Containers are supported in Pro and Enterprise plans. Pro subscriptions include 10 containers for each paid host. Enterprise subscriptions include 20 for each paid host. This container count is averaged across your entire infrastructure.

Additional containers are billed at $0.002 per container per hour. In addition, you can purchase prepaid containers at $1 per container per month. Contact [Sales][1] or your [Customer Success][2] Manager to discuss containers for your account.

### Kubernetes

Kubernetes creates pause containers to acquire the respective pod’s IP address and set up the network namespace for all other containers that join that pod. Datadog excludes all pause containers from your quota and does not charge for them (requires Agent 5.8+).

## Troubleshooting
For technical questions, contact [Datadog support][3].

For billing questions, contact your [Customer Success][2] Manager.

[1]: mailto:sales@datadoghq.com
[2]: mailto:success@datadoghq.com
[3]: /help
