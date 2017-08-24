---
title: Datadog Process and Container Monitoring
kind: guide
listorder: 16
beta: true
---

As this feature is in private beta, please do not discuss in public forums.  For details, email <process-support@datadoghq.com> 

## Introduction

Datadog Process and Container Monitoring allows for real-time visibility of the most granular elements in a deployment.  Taking inspiration from bedrock tools like `htop`, this centralized view, combined with existing tagging capabilities, allows you to understand what is going on at any level of your system and drill all the way down into the most fine details.

{{< img src="process/live_process_preview.png" >}}

## Searching, Filtering, and Pivoting

### String Search

Processes and containers are by their nature extremely high cardinality objects.  Our fuzzy string search gives you a view into exactly what you want.  Below is our Demo environment, filtered with the string `postgres /9.`.  Note that `/9.` has matched in the command path, and that `postgres` matches the command itself.

{{< img src="process/postgres.png" >}}

### Tagging

Processes and containers are tagged with all existing host-level tags.  Additionally, we tag with metadata associated with individual processes and containers. 

*Processes* are tagged by `#user`

*Containers* are tagged by `#container_image`

Additionally, we include integrations with popular orchestrators, such as ECS and Kubernetes, which provide further container-level tags.  We also decorate each container with Docker, ECS, or Kubernetes icons so you can tell which are being orchestrated at a glance.

ECS Containers are tagged by `#task_name`, `#task_version`, and `#ecs_cluster`

Kubernetes Containers are tagged by `#pod`, `#pod_ip`, `#service`, `#namespace`, `#cluster-name`, `#replica_set`, `#daemon_set`, `#job`, and `#deployment`.

### Filtering and Pivoting

Making sense of hundreds of thousands or millions of processes and containers can seem overwhelming!  Using tagging, described in the previous section, makes navigation easy.

In the below, we have filtered down to a Kubernetes cluster of 9 nodes.  RSS and CPU utilization on containers is reported compared to the limits set on the containers, when they exist.  Here, we see that the containers in this cluster are way overprovisioned, and that we could use tighter limits and bin packing to acheive better utilization of resources.

{{< img src="process/overprovisioned.png" >}}

Container environments are dynamic and can be hard to follow.  Here, we pivot by `#service` and `#host`, and to reduce system noise, filter to `#namespace:default`, and we can see what services are running where, and how saturated key metrics are.  

{{< img src="process/hostxservice.png" >}}

It would be easy to pivot by ECS `#task_name` and `#task_version` and understand changes to resource utilization between updates.

{{< img src="process/tasksxversion.png" >}}

Below, we have searched for ssh processes and pivoted by `#user` to understand who is logged into which hosts.

{{< img src="process/sshusers.png" >}}

Ok, so I guess that last one is less exciting after redaction!

## Broad Inspection, Deep Inspection

Everyone's workflow differs.  Initially the table is displayed at the finest grain, but with the group-by field, you should start your investigation where it's appropriate for you: Grouping by Availability Zone, Host, Cluster, Pod, or wherever.

From there, you can dig down into finer grains, or inspect each group to see individual processes or containers.  In the below screenshot, you can see an investigation that started by indexing by pod and service, dug into one pod to see the containers, and then expanded a container to see the process tree inside.  In the container inspect tray, we also have some recent context for these metrics.

{{< img src="process/containerinspect.png" >}}

## Real-time monitoring

While actively working with the Process and Containers page, metrics are collected at 2s resolution.  This is very important for highly volatile metrics such as CPU.  In the background, for historical context, metrics are collected at 10s resolution.  

## Installation

### Standard Agent Configuration

Live Processes has been introduced in Datadog Agent version 5.16.0.  Please refer to the instructions for standard [Agent installation](https://app.datadoghq.com/account/settings#agent) for platform-specific details.

Once the Datadog Agent is installed, enable Live Processes collection by editing the config file at 

    /etc/dd-agent/datadog.conf
    
and adding the following line to the `[Main]` section

    process_agent_enabled: true
    
After configuration is complete, restart the Agent.

### Docker container

Update to the Datadog Agent image version 5.16.0 or above:

    $ docker pull datadog/docker-dd-agent

Follow the instructions for [docker-dd-agent](https://github.com/DataDog/docker-dd-agent), passing in the following attributes, in additon to any other custom settings as appropriate:

    -v /etc/passwd:/etc/passwd:ro
    -e DD_PROCESS_AGENT_ENABLED=true
    -e HOST_PROC=/host/proc
    -e HOST_SYS=/host/sys

### Kubernetes Daemonset

In the [dd-agent.yaml](https://app.datadoghq.com/account/settings#agent/kubernetes) manifest used to create the daemonset, add the following environmental variables, volume mount, and volume:

    env:
      - name: DD_PROCESS_AGENT_ENABLED
        value: "true"
      - name: HOST_PROC
        value: /host/proc
      - name: HOST_SYS
        value: /host/sys
    volumeMount:
      - name: passwd
        mountPath: /etc/passwd
        readOnly: true
    volume:
      - hostPath:
          path: /etc/passwd
        name: passwd    
    
Refer to the standard [daemonset installation](http://docs.datadoghq.com/integrations/kubernetes/#installation-via-daemonsets-kubernetes-110) and the [docker-dd-agent](https://github.com/DataDog/docker-dd-agent) information pages for further documentation.


### Proxy Configuration

Live Processes supports a web proxy as [configured on the Agent](https://github.com/DataDog/dd-agent/wiki/Proxy-Configuration).  For configuring a web proxy in a container, refer to the [docker-dd-agent](https://github.com/DataDog/docker-dd-agent) documentation.

## Notes/known issues

- Requires Linux.

- Collection of open files and current working directory is limited based on the level of privilege of the user running dd-process-agent. In the event that dd-process-agent is able to access these fields, they will be collected automatically.

- Real-time (2s) data collection will be turned off after 30 minutes. To resume real-time collection, refresh the page.
