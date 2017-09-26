---
title: Datadog Process and Container Monitoring
kind: guide
listorder: 16
beta: false
---

## Introduction

Datadog Live Containers allows for real-time visibility of all of the containers across your environment.  Taking inspiration from bedrock tools like `htop` and `ctop`, this centralized view, combined with existing tagging capabilities, allows you to understand what is going on at any level of your system and drill all the way down into the most fine details.

{{< img src="process/live_process_preview.png" >}} //TODO CHANGE ME

## Searching, Filtering, and Pivoting

### String Search

Containers are by their nature extremely high cardinality objects.  Our fuzzy string search gives you a view into exactly what you want.  Below is our Demo environment, filtered with the string //TODO ADD HERE

{{< img src="process/postgres.png" >}} //TODO CHANGE ME

### Tagging

Containers are tagged with all existing host-level tags.  Additionally, we tag with metadata associated with individual containers. 

All containers are tagged by `#container_image`, and additionally, we include integrations with popular orchestrators, such as ECS and Kubernetes, which provide further container-level tags.  We also decorate each container with Docker, ECS, or Kubernetes icons so you can tell which are being orchestrated at a glance.

ECS Containers are tagged by `#task_name`, `#task_version`, and `#ecs_cluster`

Kubernetes Containers are tagged by `#pod`, `#pod_ip`, `#service`, `#namespace`, `#cluster-name`, `#replica_set`, `#daemon_set`, `#job`, and `#deployment`.

### Filtering and Pivoting

Making sense of thousands or tens of thousands of containers can seem overwhelming!  Using tagging, described in the previous section, makes navigation easy.

In the below, we have filtered down to a Kubernetes cluster of 9 nodes.  RSS and CPU utilization on containers is reported compared to the limits set on the containers, when they exist.  Here, we see that the containers in this cluster are way overprovisioned, and that we could use tighter limits and bin packing to acheive better utilization of resources.

{{< img src="process/overprovisioned.png" >}}

Container environments are dynamic and can be hard to follow.  Here, we pivot by `#service` and `#host`, and to reduce system noise, filter to `#namespace:default`, and we can see what services are running where, and how saturated key metrics are.  

{{< img src="process/hostxservice.png" >}}

It would be easy to pivot by ECS `#task_name` and `#task_version` and understand changes to resource utilization between updates.

{{< img src="process/tasksxversion.png" >}}


## Real-time monitoring

While actively working with the Containers page, metrics are collected at 2s resolution.  This is very important for highly volatile metrics such as CPU.  In the background, for historical context, metrics are collected at 10s resolution.  

## Installation

Live Containers has been introduced in Datadog Agent version 5.17.2.  Besides updating to a recent version of the Agent, no other configuration is necessary.

### Proxy Configuration

Live Processes supports a web proxy as [configured on the Agent](https://github.com/DataDog/dd-agent/wiki/Proxy-Configuration).  For configuring a web proxy in a container, refer to the [docker-dd-agent](https://github.com/DataDog/docker-dd-agent) documentation.

## Notes/known issues

- This feature does not support Windows containers at this time.

- Real-time (2s) data collection will be turned off after 30 minutes. To resume real-time collection, refresh the page.

- The Process Agent is available for the default Debian docker-dd-agent image only.  It is not included in the Alpine image.

- RBAC settings can restrict Kubernetes metadata collection.  Please refer to the [RBAC entites for the Datadog Agent]( https://gist.github.com/hkaj/404385619e5908f16ea3134218648237).
