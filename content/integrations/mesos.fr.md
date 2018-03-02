



## Overview

This check collects metrics from Mesos masters for:

* Cluster resources
* Slaves registered, active, inactive, connected, disconnected, etc
* Number of tasks failed, finished, staged, running, etc
* Number of frameworks active, inactive, connected, and disconnected

And many more.
## Setup
### Installation
The installation is the same on Mesos with and without DC/OS. 
Run the docker-dd-agent container on each of your Mesos master nodes:

```
docker run -d --name dd-agent \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -e API_KEY=<YOUR_DATADOG_API_KEY> \
  -e MESOS_MASTER=yes \
  -e MARATHON_URL=http://leader.mesos:8080 \
  -e SD_BACKEND=docker \
  datadog/docker-dd-agent:latest
```

Substitute your Datadog API key and Mesos Master's API URL into the command above.

### Configuration

If you passed the correct Master URL when starting docker-dd-agent, the Agent is already using a default `mesos_master.yaml` to collect metrics from your masters; you don't need to configure anything else. See the [sample mesos_master.yaml](https://github.com/DataDog/integrations-core/blob/master/mesos_master/conf.yaml.example) for all available configuration options.

Unless your masters' API uses a self-signed certificate. In that case, set `disable_ssl_validation: true` in `mesos_master.yaml`.

### Validation

In the Datadog app, search for `mesos.cluster` in the Metrics Explorer.

## Compatibility

The mesos_master check is compatible with all major platforms.

## Data Collected
### Metrics
{{< get-metrics-from-git "mesos_master" >}}


### Events
The Mesos-master check does not include any event at this time.

### Service Checks

`mesos_master.can_connect`:

Returns CRITICAL if the Agent cannot connect to the Mesos Master API to collect metrics, otherwise OK.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading

* [Installing Datadog on Mesos with DC/OS](https://www.datadoghq.com/blog/deploy-datadog-dcos/)



## Mesos_slave Integration

## Overview

This Agent check collects metrics from Mesos slaves for:

* System load
* Number of tasks failed, finished, staged, running, etc
* Number of executors running, terminated, etc

And many more.

This check also creates a service check for every executor task.

## Setup
### Installation

Follow the instructions in our [blog post](https://www.datadoghq.com/blog/deploy-datadog-dcos/) to install the Datadog Agent on each Mesos agent node via the DC/OS web UI.

### Configuration
#### DC/OS

1. In the DC/OS web UI, click on the **Universe** tab. Find the **datadog** package and click the Install button.
1. Click the **Advanced Installation** button.
1. Enter your Datadog API Key in the first field.
1. In the Instances field, enter the number of slave nodes in your cluster (You can determine the number of nodes in your cluster by clicking the Nodes tab on the left side of the DC/OS web ui).
1. Click **Review and Install** then **Install**

#### Marathon

If you are not using DC/OS, then use either the Marathon web UI or post to the API URL the following JSON to define the Datadog Agent application. You will need to change the DATADOGAPIKEY with your API Key and the number of instances with the number of slave nodes on your cluster. You may also need to update the docker image used to more recent tag. You can find the latest [on Docker Hub](https://hub.docker.com/r/datadog/docker-dd-agent/tags/)

```json
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
```

Unless you want to configure a custom `mesos_slave.yaml`—perhaps you need to set `disable_ssl_validation: true`—you don't need to do anything after installing the Agent.

### Validation
#### DC/OS
Under the Services tab in the DC/OS web UI you should see the Datadog Agent shown. In the Datadog app, search for `mesos.slave` in the Metrics Explorer.

#### Marathon
If you are not using DC/OS, then datadog-agent will be in the list of running applications with a healthy status. In the Datadog app, search for mesos.slave in the Metrics Explorer.

## Compatibility

The mesos_slave check is compatible with all major platforms.

## Data Collected
### Metrics
{{< get-metrics-from-git "mesos_master" >}}


### Events
The Mesos-slave check does not include any event at this time.

### Service Check

`mesos_slave.can_connect`:

Returns CRITICAL if the Agent cannot connect to the Mesos slave metrics endpoint, otherwise OK.

`<executor_task_name>.ok`:

The mesos_slave check creates a service check for each executor task, giving it one of the following statuses:

|||
|---|---|
|Task status|resultant service check status
|TASK_STARTING|AgentCheck.OK
|TASK_RUNNING|AgentCheck.OK
|TASK_FINISHED|AgentCheck.OK
|TASK_FAILED|AgentCheck.CRITICAL
|TASK_KILLED|AgentCheck.WARNING
|TASK_LOST|AgentCheck.CRITICAL
|TASK_STAGING |AgentCheck.OK
|TASK_ERROR|AgentCheck.CRITICAL

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading

* [Installing Datadog on Mesos with DC/OS](https://www.datadoghq.com/blog/deploy-datadog-dcos/)
