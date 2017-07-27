---
title: Datadog Process Monitoring
kind: guide
listorder: 16
beta: true
---

### Introduction

The new Datadog Process Monitor allows for real-time process-level visibility.  After configuring the Agent, information from a host’s /proc file system will be streamed into Datadog and presented in a table at [https://app.datadoghq.com/process](https://app.datadoghq.com/process).

The table can be searched and filtered, and processes can be aggregated on tags associated with the hosts that they are running on.

Each row in the table can be expanded for more contextual information about an individual process.

Checking “show summary graphs” at the top of the page will graph metrics for all processes that are shown in the table.

{{< img src="process/live_process_preview.png" >}}

### Configure the Datadog Agent to collect Live Process data

Live Processes has been introduced in Datadog Agent version 5.16.0.

To enable collection, edit the config file at 

    /etc/dd-agent/datadog.conf
    
and append the line

    process_agent_enabled: true

### Docker container

**Update to the Datadog Agent image version 5.16.0 or above**

    $ docker pull datadoghq/dd-process-agent
    
**Installation**

For docker installation, follow the instructions for [docker-dd-agent](https://github.com/DataDog/docker-dd-agent), passing in the following attributes, in additon to any other custom settings as appropriate:

    -v /etc/passwd:/etc/passwd
    -e DD_PROCESS_AGENT_ENABLED=true
    -e HOST_PROC=/host/proc

### Kubernetes Daemonset

In the [dd-agent.yaml](https://app.datadoghq.com/account/settings#agent/kubernetes) manifest used to create the daemonset, add the following environmental variables, volume mount, and volume:

    env:
      - name: DD_PROCESS_AGENT_ENABLED
        value: "true"
      - name: HOST_PROC
        value: /host/proc
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

### Notes/known issues

- Requires Linux.

- Collection of open files and current working directory is limited based on the level of privilege of the user running dd-process-agent. In the event that dd-process-agent is able to access these fields, they will be collected automatically.

- Real-time (2s) data collection will be turned off after 30 minutes. To resume real-time collection, refresh the page.
