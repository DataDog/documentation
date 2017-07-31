---
title: Datadog-Mesos Integration
integration_title: Mesos
kind: integration
doclevel: basic
git_integration_title: mesos_master
---


## Overview

Connects Mesos to Datadog in order to:

* Visualize your Mesos cluster performance
* Correlate the performance of Mesos with the rest of your applications

### Mesos master

This Agent check collects metrics from Mesos masters for:

* Cluster resources
* Slaves registered, active, inactive, connected, disconnected, etc
* Number of tasks failed, finished, staged, running, etc
* Number of frameworks active, inactive, connected, and disconnected

### Mesos slave

This Agent check collects metrics from Mesos slaves for:

* System load
* Number of tasks failed, finished, staged, running, etc
* Number of executors running, terminated, etc

This check also creates a service check for every executor task.

## Installation
### Mesos master
Run the docker-dd-agent container on each of your Mesos master nodes:
{{< highlight shell >}}
docker run -d --name dd-agent \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -e API_KEY=<YOUR_DATADOG_API_KEY> \
  -e MESOS_MASTER=yes \
  -e MARATHON_URL=http://leader.mesos:8080 \
  -e SD_BACKEND=docker \
  datadog/docker-dd-agent:latest
Substitute your Datadog API key and Mesos Master's API URL into the command above.
{{< /highlight >}}

If you passed the correct Master URL when starting docker-dd-agent, the Agent is already using a default mesos_master.yaml to collect metrics from your masters; you don't need to configure anything else.

Unless your masters' API uses a self-signed certificate. In that case, set disable_ssl_validation: true in mesos_master.yaml.

{{< insert-example-links integration="Mesos Master" include_intro="false" >}}

### Mesos slave
Follow the instructions in our [blog post](https://www.datadoghq.com/blog/deploy-datadog-dcos/) to install the Datadog Agent on each Mesos agent node via the DC/OS web UI.

Unless you want to configure a custom mesos_slave.yaml—perhaps you need to set disable_ssl_validation: true—you don't need to do anything after installing the Agent.

{{< insert-example-links integration="Mesos Slave" include_intro="false" >}}

## Validation
### Mesos master

In the Datadog app, search for mesos.cluster in the Metrics Explorer.

### Mesos slave

In the Datadog app, search for mesos.slave in the Metrics Explorer.

## Metrics

{{< get-metrics-from-git >}}
