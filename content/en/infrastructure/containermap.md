---
title: Container Map
kind: documentation
aliases:
  - /graphing/infrastructure/containermap/
  - /guides/hostmap
further_reading:
- link: "/infrastructure/livecontainers/"
  tag: "Documentation"
  text: "Get real-time visibility of all of the containers across your environment"
- link: "/infrastructure/process/"
  tag: "Documentation"
  text: "Understand what is going on at any level of your system"
---

## Overview

Like [Host Maps][1], [Containers Maps][2] give you a big picture of the health of your containers. Datadog integrates with ECS, Docker, Kubernetes, and more. You can see all of your containers together on one screen with customized groupings and filters, as well as metrics made instantly comprehensible through color and shape.

In one place, you can detect outliers, identify usage patterns, avoid resource problems, and make decisions about how to best manage your containers. It doesn't matter if you have 10, 100, or 10,000 containers. [Autodiscovery][3] automatically detects new containers and accounts for them.

{{< img src="infrastructure/containermap/containermap.png" alt="Container map part 1" style="width:80%;">}}

## Installation

After deploying the [Agent][4], no other configuration is necessary. For collecting Docker container information in the standard install rather than with the [Docker Agent][5], the `dd-agent` user needs to have permissions to access `docker.sock`. Permission can be given by adding `dd-agent` to the `docker` group.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /infrastructure/hostmap/
[2]: https://app.datadoghq.com/infrastructure/map?node_type=container
[3]: /agent/kubernetes/integrations/
[4]: /agent/
[5]: /agent/docker/
