---
title: Basic Agent Usage for CoreOS and Docker
kind: documentation
platform: CoreOS
aliases:
    - /guides/basic_agent_usage/docker/
---

If you haven't installed the Agent yet, instructions can be found [in the Datadog agent integration page](https://app.datadoghq.com/account/settings#agent/docker). You can also consult our [Official Docker agent 6 image](https://hub.docker.com/r/datadog/agent/).

## Run the Docker agent

Head over to [datadoghq.com](https://app.datadoghq.com/account/settings#agent/docker) to get the official installation guide.

For a simple docker run, get started with:

```
docker run -d -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -e DD_API_KEY=<YOUR_API_KEY> \
              datadog/agent:latest
```

- [Find here the list of available images for Agent 6](https://hub.docker.com/r/datadog/agent/tags/), Datadog encourages you to always pick the latest version.

The following environment variables are supported:

| Variable | Description |
|:-----|:-----|
| `DD_API_KEY`| your API key (**required**) |
| `DD_HOSTNAME` | hostname to use for metrics |
| `DD_TAGS`| host tags, separated by spaces. For example: `simple-tag-0 tag-key-1:tag-value-1`|
| `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` | listen to dogstatsd packets from other containers, required to send custom metrics. Send custom metrics via [the statsd protocol](https://docs.datadoghq.com/developers/dogstatsd/) |
| `DD_APM_ENABLED`| run the trace-agent along with the infrastructure agent, allowing the container to accept traces on 8126/tcp|
| `DD_PROCESS_AGENT_ENABLED`| enable live process collection in the [process-agent](https://docs.datadoghq.com/graphing/infrastructure/process/). The Live Container View is already enabled by default if the Docker socket is available|
|`DD_DOCKER_LABELS_AS_TAGS`| extract docker container labels|
|`DD_DOCKER_ENV_AS_TAGS` | extract docker container environment variables|
|`DD_KUBERNETES_POD_LABELS_AS_TAGS` | extract pod labels|
|`DD_LOGS_ENABLED`| run the [log-agent](https://docs.datadoghq.com/logs/) along with the infrastructure agent. See below for details|
|`DD_JMX_CUSTOM_JARS`| space-separated list of custom jars to load in jmxfetch (only for the `-jmx` variants)|
|`DD_KUBERNETES_COLLECT_SERVICE_TAGS`| Configures the agent to collect Kubernetes service names as tags.|
| `DD_KUBERNETES_SERVICE_TAG_UPDATE_FREQ`| Set the collection frequency in seconds for the Kubernetes service names.|
|`DD_COLLECT_KUBERNETES_EVENTS`| Configures the agent to collect Kubernetes events. See [Event collection](#event-collection) for more details.|
|`DD_LEADER_ELECTION`| Activates the [leader election](#leader-election). Will be activated if the `DD_COLLECT_KUBERNETES_EVENTS` is set to true. The expected value is a bool: true/false.|
|`DD_LEADER_LEASE_DURATION`| Only used if the leader election is activated. See the details [here](#leader-election-lease). The expected value is a number of seconds.|

For more information about the container's lifecycle, see [our SUPERVISION documentation ](https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/agent/SUPERVISION.md).

## Tagging

Datadog Docker agent collects automatically common tags from [Docker](https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/docker_extract.go), [Kubernetes](https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/kubelet_extract.go), [ECS](https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/ecs_extract.go), [Swarm, Mesos, Nomad and Rancher](https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/docker_extract.go), and allows you to extract even more tags with the following options:

- `DD_DOCKER_LABELS_AS_TAGS` : extract docker container labels
- `DD_DOCKER_ENV_AS_TAGS` : extract docker container environment variables
- `DD_KUBERNETES_POD_LABELS_AS_TAGS` : extract pod labels

Define them in your custom `datadog.yaml`, or set them as JSON maps in these envvars. The map key is the source (label/envvar) name, and the map value the datadog tag name.

```
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"app":"kube_app","release":"helm_release"}'
DD_DOCKER_LABELS_AS_TAGS='{"com.docker.compose.service":"service_name","com.docker.compose.project":"project_name"}'
```

## Log collection

The Datadog Agent can collect logs from containers starting at the version 6. Two installations are possible:

- on the host: where the agent is external to the Docker environment
- or by deploying its containerized version in the Docker environment

### Setup

Create two directories on your host that will later be mounted on the containerized agent:

- `/opt/datadog-agent/run`: to make sure to not lose any logs from containers during restarts or network issues. The last line that was collected for each container in this directory is stored on the host.
- `/opt/datadog-agent/conf.d`: to provide your integration instructions. Any configuration file added there is automatically picked up by the containerized agent when restarted. For more information about this check [here](https://github.com/DataDog/docker-dd-agent#enabling-integrations).

To run a Docker container which embeds the Datadog Agent to monitor your host use the following command:

```
docker run -d --name dd-agent -h `hostname` -e DD_API_KEY=<YOUR_API_KEY> -e DD_LOGS_ENABLED=true -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -v /opt/datadog-agent/conf.d:/conf.d:ro datadog/agent:latest
```

**Note**:

- The Docker integration is enabled by default, as well as [autodiscovery](/agent/kubernetes/autodiscovery) in auto config mode (remove the `listeners: -docker` section in `datadog.yaml` to disable it).

The parameters specific to log collection are the following:

- `-e DD_LOGS_ENABLED=true`: enables the log collection when set to true. The agent now looks for log instructions in configuration files.
- `-v /opt/datadog-agent/run:/opt/datadog-agent/run:rw` : mount the directory to store pointer on each container logs to make sure the Agent do not lose any.
- `-v /opt/datadog-agent/conf.d:/conf.d:ro` : mount the configuration directory to the container

### Configuration file example

Now that the agent is ready to collect logs, define which containers you want to follow.
To start collecting logs for a given container filtered by image or label, update the log section in an integration or custom .yaml file.
Add a new yaml file in the conf.d directory with the following parameters:

```
init_config:

instances:
    [{}]

#Log section

logs:
   - type: docker
     image: my_image_name    #or label: mylabel
     service: my_application_name
     source: java #tells Datadog what integration it is
     sourcecategory: sourcecode
```
For more examples of configuration files or agent capabilities (such as filtering, redacting, multiline, …) read [the dedicated log documentation](https://docs.datadoghq.com/logs/#filter-logs).

