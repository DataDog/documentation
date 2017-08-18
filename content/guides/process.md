---
title: Datadog Process and Container Monitoring
kind: guide
listorder: 16
beta: true
---

## Introduction

Datadog Process and Container Monitoring allows for real-time visibility of the most granular elements in a deployment.  Taking inspiration from bedrock tools like `htop`, this centralized view, combined with existing tagging capabilities, allows you to understand what is going on at any level of your system and drill all the way down into the most fine details.

{{< img src="process/live_process_preview.png" >}}

## Usage

**String Search**

Processes and Containers are by their nature extremely high cardinality objects.  Our fuzzy string search will match any facet of a Process or Container, giving you a view into exactly what you want.  Below is our Demo environment, filtered with the string `postgres /9.`.  Note that `/9.` has matched in the current working directory, and that `postgres` matches the command itself.

-screenshot-

**Tagging**

Processes and Containers are tagged with all existing host-level tags.  Additionally, we tag with metadata associated with individual Processes and Containers. 

*Processes* are tagged by `#user`

*Containers* are tagged with `#container_image`

Additionally, we include integrations with popular orchestrators, such as ECS and Kubernetes, which provide further Container-level tags.

ECS Containers are tagged by `#task_name`, `#task_version`, and `#ecs_cluster`

Kubernetes Containers are tagged by `#pod`, `#pod_ip`, `#service`, `#namespace`, `#cluster-name`, `#replica_set`, `#daemon_set`, and `#deployment`.

**Filtering and Pivoting**


## Deep Inspection

## Real-time monitoring

## Installation

**Standard Agent Configuration**

Live Processes has been introduced in Datadog Agent version 5.16.0.  Please refer to the instructions for standard [Agent installation](https://app.datadoghq.com/account/settings#agent) for platform-specific details.

Once the Datadog Agent is installed, enable Live Processes collection by editing the config file at 

    /etc/dd-agent/datadog.conf
    
and adding the following line to the `[Main]` section

    process_agent_enabled: true
    
After configuration is complete, restart the Agent.

**Docker container**

Update to the Datadog Agent image version 5.16.0 or above:

    $ docker pull datadog/docker-dd-agent

Follow the instructions for [docker-dd-agent](https://github.com/DataDog/docker-dd-agent), passing in the following attributes, in additon to any other custom settings as appropriate:

    -v /etc/passwd:/etc/passwd
    -e DD_PROCESS_AGENT_ENABLED=true
    -e HOST_PROC=/host/proc
    -e HOST_SYS=/host/sys

**Kubernetes Daemonset**

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


**Proxy Configuration**

Live Processes supports a web proxy as [configured on the Agent](https://github.com/DataDog/dd-agent/wiki/Proxy-Configuration).  For configuring a web proxy in a container, refer to the [docker-dd-agent](https://github.com/DataDog/docker-dd-agent) documentation.

## Notes/known issues

- Requires Linux.

- Collection of open files and current working directory is limited based on the level of privilege of the user running dd-process-agent. In the event that dd-process-agent is able to access these fields, they will be collected automatically.

- Real-time (2s) data collection will be turned off after 30 minutes. To resume real-time collection, refresh the page.
