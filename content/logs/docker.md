---
title: Docker log collection
kind: Documentation
further_reading:
- link: "/logs/explore"
  tag: "Documentation"
  text: Learn how to explore your logs
- link: "/logs/processing"
  tag: "Documentation"
  text: Learn how to process your logs
- link: "/logs/parsing"
  tag: "Documentation"
  text: Learn more about parsing
---

<div class="alert alert-info">
Datadog's Logs is currently available via public beta. You can apply for inclusion in the beta via <a href="https://www.datadoghq.com/log-management/">this form</a>.
</div>

## Overview

Datadog Agent version 6 and greater can collect logs from containers.  
Two installations are possible:
 
- on the host where the agent is external to the Docker environment
- or by deploying its containerized version in the Docker environment

## Setup
### Option 1: Host installation

Install the [latest version of the agent 6](/logs/#getting-started-with-the-agent) on your host.

The agent can both collect logs from [files on the host](/logs/#custom-log-collection) or from [container stdout/stderr](/logs/docker/#configuration-file-example). For this you need to update or create a new .yaml configuration file in the agent’s `/conf.d` directory as explained in the provided links.

### Option 2: Container installation

As explained above, the agent also has a [containerized](https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent) installation.

First let’s create two directories on the host that we will later mount on the containerized agent:

- `/opt/datadog-agent/run`: to make sure we do not lose any logs from containers during restarts or network issues we store on the host the last line that was collected for each container in this directory

- ` /opt/datadog-agent/conf.d`: this is where you will provide your integration instructions. Any configuration file added there will automatically be picked up by the containerized agent when restarted.  
For more information about this check [here](https://github.com/DataDog/docker-dd-agent#enabling-integrations)

To run a Docker container which embeds the Datadog Agent to monitor your host use the following command:

```
docker run -d --name dd-agent -h `hostname` -e DD_API_KEY=<YOUR_API_KEY>  -e DD_LOGS_ENABLED=true -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -v /otp/datadog-agent/conf.d:/conf.d:ro datadog/agent:latest
```

Important notes: 

- The Docker integration is enabled by default, as well as [autodiscovery](/agent/kubernetes/autodiscovery/) in auto configuration mode (remove the listeners: -docker section in `datadog.yaml` to disable it).

- We recommend to always pick the latest version of Datadog Agent 6. [Consult the full list of available images for Agent 6](https://hub.docker.com/r/datadog/agent/tags/).

The command related to log collection are the following:

* `-e DD_LOGS_ENABLED=true`: this parameter enables the log collection when set to true. The agent now looks for log instructions in configuration files.
* `-v /opt/datadog-agent/run:/opt/datadog-agent/run:rw`: mount the directory we created to store pointer on each container logs to make sure we do not lose any.
* `-v /opt/datadog-agent/conf.d:/conf.d:ro`: mount the configuration directory we previously created to the container



### Configuration file example

Now that the agent is ready to collect logs, you need to define which containers you want to follow.
To start collecting logs for a given container filtered by image or label, you need to update the log section in an integration or custom .yaml file. 
Add a new yaml file in the `conf.d` directory (should be `/opt/datadog-agent/conf.d` on the host if you followed above instruction) with the following parameters:

```yaml
init_config:
instances:

##Log section

logs:    
   - type: docker
     image: my_image_name    #or label: mylabel
     service: my_application_name
     source: java #tells Datadog what integration it is
     sourcecategory: sourcecode
```

For more examples of configuration files or agent capabilities (such as filtering, redacting, multiline, …) read [the advanced log collection functions](/logs/#filter-logs).

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
