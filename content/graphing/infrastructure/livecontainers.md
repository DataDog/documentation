---
title: Live Containers
kind: documentation
autotocdepth: 3
aliases:
  - /guides/livecontainers
customnav: infrastructurenav
---

## Introduction

[Datadog Live Containers](https://app.datadoghq.com/containers) enable real-time visibility into all containers across your environment.

Taking inspiration from bedrock tools like htop and ctop, Live Containers give you complete coverage of your container infrastructure, in a continuously updated table with resource metrics at two-second resolution and faceted search. Coupled with Datadog’s integrations with Docker, Kubernetes, ECS, and other container technologies, plus our built-in tagging of dynamic components, this new Live Container view provides a detailed overview of your containers’ health, resource consumption, and deployment in real time.

{{< img src="graphing/infrastructure/livecontainers/LiveContainersWithSummaries.png" alt="Live containers with summaries" responsive="true" >}} 

## Installation

[Live Containers](https://app.datadoghq.com/containers) has been introduced in Datadog Agent version 5.17.2.  After updating to this version of the Agent or later, no other configuration is necessary.

Note that for collecting Container information in the standard install rather than with the [docker-dd-agent][1], the dd-agent user will need to have permissions to access docker.sock.

## Searching, Filtering, and Pivoting

### String Search

Containers are by their nature extremely high cardinality objects.  Our flexible string search will match substrings in the container name, ID, or image fields.

### Tagging

Containers are tagged with all existing host-level tags.  We also tag with metadata associated with individual containers. 

All containers are tagged by `container_image`, and additionally, we include integrations with popular orchestrators, such as ECS and Kubernetes, which provide further container-level tags.  We also decorate each container with Docker, ECS, or Kubernetes icons so you can tell which are being orchestrated at a glance.

ECS Containers are tagged by `ecs_task_name`, `ecs_task_version`, and `ecs_cluster`

Kubernetes Containers are tagged by `kube_pod`, `kube_pod_ip`, `kube_service`, `kube_namespace`, `kube_replica_set`, `kube_daemon_set`, `kube_job`, `kube_deployment`, and `kube_cluster`.

### Filtering and Pivoting

Making sense of thousands or tens of thousands of containers can seem overwhelming!  Using tagging, described in the previous section, makes navigation easy.

In the below, we have filtered down to a Kubernetes cluster of 9 nodes.  RSS and CPU utilization on containers is reported compared to the provisioned limits on the containers, when they exist.  Here, we see that the containers in this cluster are way overprovisioned, and that we could use tighter limits and bin packing to achieve better utilization of resources.

{{< img src="graphing/infrastructure/livecontainers/overprovisioned.png" alt="Over Provisioned" responsive="true" >}}

Container environments are dynamic and can be hard to follow.  Here, we pivot by `kube_service` and `host`, and to reduce system noise, filter to `kube_namespace:default`, and we can see what services are running where, and how saturated key metrics are.  

{{< img src="graphing/infrastructure/livecontainers/hostxservice.png" alt="Host x services" responsive="true" >}}

It would be easy to pivot by ECS `ecs_task_name` and `ecs_task_version` and understand changes to resource utilization between updates.

{{< img src="graphing/infrastructure/livecontainers/tasksxversion.png" alt="Tasks x version" responsive="true" >}}


## Real-time monitoring

While actively working with the Containers page, metrics are collected at 2s resolution.  This is very important for highly volatile metrics such as CPU.  In the background, for historical context, metrics are collected at 10s resolution.

## Notes/known issues

- This feature does not support Windows containers at this time.

- Real-time (2s) data collection will be turned off after 30 minutes. To resume real-time collection, refresh the page.

- Live Containers is available for the default Debian docker-dd-agent image only.  It is not included in the Alpine image.

- RBAC settings can restrict Kubernetes metadata collection.  Please refer to the [RBAC entites for the Datadog Agent][2].

[1]: https://github.com/DataDog/docker-dd-agent
[2]: https://gist.github.com/hkaj/404385619e5908f16ea3134218648237