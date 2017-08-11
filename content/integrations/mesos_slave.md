---
title: Datadog-Mesos & DC/OS Slave Integration
integration_title: Mesos & DC/OS Agent
kind: integration
doclevel: basic
git_integration_title: mesos_slave
---

## Overview

This Agent check collects metrics from Mesos slaves for:

* System load
* Number of tasks failed, finished, staged, running, etc
* Number of executors running, terminated, etc

This check also creates a service check for every executor task.

Refer to [the Mesos Master integration](/integrations/mesos_master) for information about setting up the master nodes.


## Installation

### DC/OS

1. In the DC/OS web UI, click on the **Universe** tab. Find the **datadog** package and click the Install button.
1. Click the **Advanced Installation** button.
1. Enter your Datadog API Key in the first field.
1. In the Instances field, enter the number of slave nodes in your cluster (You can determine the number of nodes in your cluster by clicking the Nodes tab on the left side of the DC/OS web ui).
1. Click **Review and Install** then **Install**

### Marathon

If you are not using DC/OS, then use either the Marathon web UI or post to the API URL the following JSON to define the Datadog Agent application. You will need to change the DATADOGAPIKEY with your API Key and the number of instances with the number of slave nodes on your cluster. You may also need to update the docker image used to more recent tag. You can find the latest [on Docker Hub](https://hub.docker.com/r/datadog/docker-dd-agent/tags/)

{{<highlight json>}}

{
  "id": "/datadog-agent",
  "cmd": null,
  "cpus": 0.05,
  "mem": 256,
  "disk": 0,
  "instances": 1,
  "constraints": [["hostname","UNIQUE"],["hostname","GROUP_BY"]],
  "acceptedResourceRoles": ["slave_public","*"],
  "container": {
    "type": "DOCKER",
    "volumes": [
      {"containerPath": "/var/run/docker.sock","hostPath": "/var/run/docker.sock","mode": "RO"},
      {"containerPath": "/host/proc","hostPath": "/proc","mode": "RO"},
      {"containerPath": "/host/sys/fs/cgroup","hostPath": "/sys/fs/cgroup","mode": "RO"}
    ],
    "docker": {
      "image": "datadog/docker-dd-agent:11.0.5160",
      "network": "BRIDGE",
      "portMappings": [
        {"containerPort": 8125,"hostPort": 8125,"servicePort": 10000,"protocol": "udp","labels": {}},
        {"containerPort": 9001,"hostPort": 9001,"servicePort": 10001,"protocol": "tcp","labels": {}}
      ],
      "privileged": false,
      "parameters": [
        {"key": "name","value": "dd-agent"},
        {"key": "env","value": "API_KEY=DATADOGAPIKEY"},
        {"key": "env","value": "MESOS_SLAVE=true"},
        {"key": "env","value": "SD_BACKEND=docker"}
      ],
      "forcePullImage": false
    }
  },
  "healthChecks": [
    {
      "gracePeriodSeconds": 300,
      "intervalSeconds": 60,
      "timeoutSeconds": 20,
      "maxConsecutiveFailures": 3,
      "portIndex": 1,
      "path": "/",
      "protocol": "HTTP",
      "ignoreHttp1xx": false
    }
  ],
  "portDefinitions": [
    {"port": 10000,"protocol": "tcp","name": "default","labels": {}},
    {"port": 10001,"protocol": "tcp","labels": {}}
  ]
}
{{</highlight>}}

Unless you want to configure a custom mesos_slave.yaml—perhaps you need to set disable_ssl_validation: true—you don't need to do anything after installing the Agent.

{{< insert-example-links integration="Mesos Slave" include_intro="false" >}}

## Validation

### DC/OS
Under the Services tab in the DC/OS web UI you should see the Datadog Agent shown. In the Datadog app, search for mesos.slave in the Metrics Explorer.

### Marathon
If you are not using DC/OS, then datadog-agent will be in the list of running applications with a healthy status. In the Datadog app, search for mesos.slave in the Metrics Explorer.

## Metrics

{{< get-metrics-from-git >}}
