---
title: Datadog Process and Container Monitoring
kind: documentation
aliases:
  - /guides/process
customnav: infrastructurenav
---

## Introduction

Datadog Process and Container Monitoring allows for real-time visibility of the most granular elements in a deployment.  Taking inspiration from bedrock tools like `htop`, this centralized view, combined with existing tagging capabilities, allows you to understand what is going on at any level of your system and drill all the way down into the most fine details.

{{< img src="infrastructure/process/live_process_preview.png" >}}

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

### Kubernetes Daemonset

In the [dd-agent.yaml](https://app.datadoghq.com/account/settings#agent/kubernetes) manifest used to create the daemonset, add the following environmental variables, volume mount, and volume:

    env:
      - name: DD_PROCESS_AGENT_ENABLED
        value: "true"
    volumeMounts:
      - name: passwd
        mountPath: /etc/passwd
        readOnly: true
    volumes:
      - hostPath:
          path: /etc/passwd
        name: passwd    
    
Refer to the standard [daemonset installation](http://docs.datadoghq.com/integrations/kubernetes/#installation-via-daemonsets-kubernetes-110) and the [docker-dd-agent](https://github.com/DataDog/docker-dd-agent) information pages for further documentation.

## Searching, Filtering, and Pivoting

### String Search

Processes are by their nature extremely high cardinality objects.  Our fuzzy string search gives you a view into exactly what you want.  Below is our Demo environment, filtered with the string `postgres /9.`.  Note that `/9.` has matched in the command path, and that `postgres` matches the command itself.

{{< img src="infrastructure/process/postgres.png" >}}


### Filtering and Pivoting

Making sense of hundreds of thousands or millions of processes and containers can seem overwhelming!  Using tagging makes navigation easy.  In addition to all existing host-level tags, processes are tagged by `#user`. 

In the below, we have filtered down to a Kubernetes cluster of 9 nodes.  RSS and CPU utilization on containers is reported compared to the limits set on the containers, when they exist.  Here, we see that the containers in this cluster are way overprovisioned, and that we could use tighter limits and bin packing to achieve better utilization of resources.

{{< img src="infrastructure/process/overprovisioned.png" >}}

Container environments are dynamic and can be hard to follow.  Here, we pivot by `#service` and `#host`, and to reduce system noise, filter to `#namespace:default`, and we can see what services are running where, and how saturated key metrics are.  

{{< img src="infrastructure/process/hostxservice.png" >}}

It would be easy to pivot by ECS `#task_name` and `#task_version` and understand changes to resource utilization between updates.

{{< img src="infrastructure/process/tasksxversion.png" >}}

Below, we have searched for ssh processes and pivoted by `#user` to understand who is logged into which hosts.

{{< img src="infrastructure/process/sshusers.png" >}}

Ok, so I guess that last one is less exciting after redaction!

## Enriched Live Containers view

Live processes adds extra visibility to your container deployments.  In addition to aggregating on orchestrator metadata, like ECS `task` or Kubernetes `service`

{{< img src="infrastructure/process/containerinspect.png" >}}

## Real-time monitoring

While actively working with the Process and Containers page, metrics are collected at 2s resolution.  This is very important for highly volatile metrics such as CPU.  In the background, for historical context, metrics are collected at 10s resolution.  

## Notes/known issues

- Requires Linux.

- Collection of open files and current working directory is limited based on the level of privilege of the user running dd-process-agent. In the event that dd-process-agent is able to access these fields, they will be collected automatically.

- Real-time (2s) data collection will be turned off after 30 minutes. To resume real-time collection, refresh the page.

- The Process Agent is available for the default Debian docker-dd-agent image only.  It is not included in the Alpine image.
