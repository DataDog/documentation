---
title: Datadog-Mesos & DC/OS Master Integration
integration_title: Mesos & DC/OS Master
kind: integration
doclevel: basic
git_integration_title: mesos_master
---

## Overview

This Agent check collects metrics from Mesos masters with and without DC/OS for:

* Cluster resources
* Slaves registered, active, inactive, connected, disconnected, etc
* Number of tasks failed, finished, staged, running, etc
* Number of frameworks active, inactive, connected, and disconnected

Refer to [the Mesos Slave integration](/integrations/mesos_slave) for information about setting up the slave nodes.

## Installation

The installation is the same on Mesos with and without DC/OS. 

Run the docker-dd-agent container on each of your Mesos master nodes:

{{<highlight shell>}}
docker run -d --name dd-agent \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -e API_KEY=<YOUR_DATADOG_API_KEY> \
  -e MESOS_MASTER=yes \
  -e MARATHON_URL=http://leader.mesos:8080 \
  -e SD_BACKEND=docker \
  datadog/docker-dd-agent:latest
{{</highlight>}}
Substitute your Datadog API key and Marathon URL into the command above. If you are not using Marathon (or not using DC/OS), you won't need the MARATHON_URL.

If you passed the correct Master URL when starting docker-dd-agent, the Agent is already using a default mesos_master.yaml to collect metrics from your masters; you don't need to configure anything else.

Unless your masters' API uses a self-signed certificate. In that case, set disable_ssl_validation: true in mesos_master.yaml.

{{< insert-example-links integration="Mesos Master" include_intro="true" >}}


## Validation

In the Datadog app, search for mesos.cluster in the Metrics Explorer.

## Metrics

{{< get-metrics-from-git >}}
