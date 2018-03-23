---
title: Docker Log collection
kind: documentation
further_reading:
- link: "logs/explore"
  tag: "Documentation"
  text: Learn how to explore your logs
- link: "logs/processing"
  tag: "Documentation"
  text: Learn how to process your logs
- link: "logs/parsing"
  tag: "Documentation"
  text: Learn more about parsing
---

## Overview

Datadog Agent version 6 and greater can collect logs from containers.
Two installations are possible:

- on the host where the agent is external to the Docker environment
- or by deploying its containerized version in the Docker environment

You can then choose to collect all the logs from all your environment container or to filter by container image name or container label to cherry pick what logs should be collected.

## Setup
### Option 1: Host installation

Install the [latest version of the agent 6](/logs/#getting-started-with-the-agent) on your host.

The agent can both collect logs from [files on the host](/logs/#custom-log-collection) or from [container stdout/stderr](#configuration-file-example). For this you need to update or create a new .yaml configuration file in the agent’s `/conf.d` directory as explained in the provided links.

### Option 2: Container installation

As explained above, the agent also has a [containerized](https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent) installation.

First let’s create two directories on the host that we will later mount on the containerized agent:

- `/opt/datadog-agent/run`: to make sure we do not lose any logs from containers during restarts or network issues we store on the host the last line that was collected for each container in this directory

- ` /opt/datadog-agent/conf.d`: this is where you will provide your integration instructions. Any configuration file added there will automatically be picked up by the containerized agent when restarted.
For more information about this check [here](https://github.com/DataDog/docker-dd-agent#enabling-integrations)

To run a Docker container which embeds the Datadog Agent to monitor your host use the following command:

```
docker run -d --name datadog-agent \
           -e DD_API_KEY=<YOUR_API_KEY> \
           -e DD_LOGS_ENABLED=true \
           -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
           -v /var/run/docker.sock:/var/run/docker.sock:ro \
           -v /proc/:/host/proc/:ro \
           -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw \
           -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
           -v /opt/datadog-agent/conf.d:/conf.d:ro \
           datadog/agent:latest
```

Important notes:

- The Docker integration is enabled by default, as well as [autodiscovery](/agent/autodiscovery/) in auto configuration mode (remove the listeners: -docker section in `datadog.yaml` to disable it).

- We recommend to always pick the latest version of Datadog Agent 6. [Consult the full list of available images for Agent 6](https://hub.docker.com/r/datadog/agent/tags/).

The command related to log collection are the following:

* `-e DD_LOGS_ENABLED=true`: this parameter enables the log collection when set to true. The agent now looks for log instructions in configuration files.
* `-e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true`: this parameter add a log configuration that enabled log collection for all containers (see `Option 1` below) 
* `-v /opt/datadog-agent/run:/opt/datadog-agent/run:rw`: mount the directory we created to store pointer on each container logs to make sure we do not lose any.
* `-v /opt/datadog-agent/conf.d:/conf.d:ro`: mount the configuration directory we previously created to the container

### Activate Log Collection

#### Option 1: Collect all container logs without using integrations

Using `-e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true` when running the containerized Datadog Agent collect logs from all your container without filtering by container image or container label.
You can also do it by adding the following at the end of `docker.d/conf.yaml` in your agent's `conf.d` directory:

```yaml
logs:
    - type: docker
      service: docker
```

*Important note*: Integration pipelines and processors will not be installed automatically as the source tag is not set. Use option 2 to automatically have integration pipelines that parse your logs and extract all the relevant information from them.

#### Option 2: Use Integration

Now that the agent is ready to collect logs, you need to define which containers you want to monitor.
To start collecting logs for a given container filtered by container image or container label, you need to update the log section in an integration or custom .yaml file. Autodiscovery is not supported yet for log collection configuration.

When filtering on the container image, both exact container image name or short names are supported.
Suppose you have one container running `library/httpd:latest` and another running `yourusername/httpd:v2`, filtering on `image: httpd` would collects logs from both.

Add a new yaml file in the `conf.d` directory (should be `/opt/datadog-agent/conf.d` on the host if you followed above instructions) with the following parameters:

```yaml
init_config:
instances:

##Log section

logs:
   - type: docker
     image: my_container_image_short_name    #or label: mycontainerlabel
     service: my_application_name
     source: myintegration #tells Datadog what integration it is
```

For more examples of configuration files or agent capabilities (such as filtering, redacting, multiline, …) read [the advanced log collection functions](/logs/#filter-logs).

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
