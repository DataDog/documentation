---
title: Docker Agent
kind: documentation
aliases:
  - /guides/basic_agent_usage/docker/
  - /agent/docker
  - /agent/basic_agent_usage/docker/
further_reading:
- link: "/integrations/java/?tab=docker#configuration"
  tag: "Documentation"
  text: "Docker JMX"
- link: "agent/docker/log"
  tag: "Documentation"
  text: Collect your Docker logs
- link: "graphing/infrastructure/process"
  tag: "Documentation"
  text: Collect your Docker processes
- link: "agent/docker/apm"
  tag: "Documentation"
  text: Collect your Docker traces
---

## Overview
The Datadog Docker Agent is the containerized version of the host [Agent][1]. The official [Docker image][2] is available on Docker Hub.

## Setup
If you haven’t installed the Docker Agent, see below or the [in-app installation instructions][3]. See the Agent documentation for [supported versions][4].

### Installation

Use the one-step install command. Replace `<YOUR_DATADOG_API_KEY>` with your [Datadog API key][5].

{{< tabs >}}
{{% tab "Standard" %}}

```shell
DOCKER_CONTENT_TRUST=1 \
docker run -d -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -e DD_API_KEY=<YOUR_DATADOG_API_KEY> \
              datadog/agent:latest
```

{{% /tab %}}
{{% tab "Amazon Linux version <2" %}}

```shell
DOCKER_CONTENT_TRUST=1 \
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro \
                              -v /proc/:/host/proc/:ro \
                              -v /cgroup/:/host/sys/fs/cgroup:ro \
                              -e DD_API_KEY=<YOUR_DATADOG_API_KEY> \
                              datadog/agent:latest
```

{{% /tab %}}
{{< /tabs >}}

### Configuration
The Agent's [main configuration file][6] is `datadog.yaml`. For the Docker Agent, `datadog.yaml` configuration options are passed in with environment variables.

#### Environment variables

##### Global options

| Env Variable  | Description                                                                                                                                                 |
|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_API_KEY`  | Your Datadog API key (**required**)                                                                                                                         |
| `DD_HOSTNAME` | Hostname to use for metrics (if autodetection fails)                                                                                                        |
| `DD_TAGS`     | Host tags separated by spaces. For example: `simple-tag-0 tag-key-1:tag-value-1`                                                                            |
| `DD_SITE`     | Destination site for your metrics, traces, and logs. Valid options are `datadoghq.com` for the Datadog US site, and `datadoghq.eu` for the Datadog EU site. |

##### Optional collection Agents

Optional collection Agents are disabled by default for security or performance reasons. Use these environment variables to enable them:

| Env Variable               | Description                                                                                                                                                |
|----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_APM_ENABLED`           | Enable [trace collection][7] with the trace Agent.                                                                                                        |
| `DD_LOGS_ENABLED`          | Enable [log collection][8] with the logs Agent.                                                                                                            |
| `DD_PROCESS_AGENT_ENABLED` | Enable [live process collection][9] with the process Agent. The [live container view][10] is already enabled by default if the Docker socket is available. |

##### DogStatsD (custom metrics)

Send custom metrics with [the StatsD protocol][11]:

| Env Variable                     | Description                                                                                       |
|----------------------------------|---------------------------------------------------------------------------------------------------|
| `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` | Listen to DogStatsD packets from other containers (required to send custom metrics).              |
| `DD_HISTOGRAM_PERCENTILES`       | The histogram percentiles to compute (separated by spaces). The default is "0.95".                |
| `DD_HISTOGRAM_AGGREGATES`        | The histogram aggregates to compute (separated by spaces). The default is "max median avg count". |
| `DD_DOGSTATSD_SOCKET`            | Path to the unix socket to listen to. Must be in a `rw` mounted volume.                           |
| `DD_DOGSTATSD_ORIGIN_DETECTION`  | Enable container detection and tagging for unix socket metrics.                                   |

Learn more about [DogStatsD over Unix Domain Sockets][12].

##### Tagging

Datadog automatically collects common tags from [Docker][13], [Kubernetes][14], [ECS][15], [Swarm, Mesos, Nomad, and Rancher][13]. To extract even more tags, use the following options:

| Env Variable                            | Description                                               |
|-----------------------------------------|-----------------------------------------------------------|
| `DD_DOCKER_LABELS_AS_TAGS`              | Extract Docker container labels                           |
| `DD_DOCKER_ENV_AS_TAGS`                 | Extract Docker container environment variables            |
| `DD_KUBERNETES_POD_LABELS_AS_TAGS`      | Extract pod labels                                        |
| `DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS` | Extract pod annotations                                   |
| `DD_COLLECT_EC2_TAGS`                   | Extract custom EC2 tags without using the AWS integration |

The map key is the source (`label/envvar`) name, and the map value is the Datadog tag name, for example:
```shell
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"app":"kube_app","release":"helm_release"}'
DD_DOCKER_LABELS_AS_TAGS='{"com.docker.compose.service":"service_name"}'
```

Additional examples are available on the [Tag Assignment and Extraction][16] page.

##### Ignore containers

Exclude containers from logs collection, metrics collection, and Autodiscovery. Datadog excludes Kubernetes and OpenShift `pause` containers by default.

| Env Variable    | Description                                                                                                                                                                                                        |
|-----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_AC_INCLUDE` | Whitelist of containers to include (separated by spaces). Use `.*` to include all. For example: `"image:image_name_1 image:image_name_2"`, `image:.*`                                                              |
| `DD_AC_EXCLUDE` | Blacklist of containers to exclude (separated by spaces). Use `.*` to exclude all. For example: `"image:image_name_3 image:image_name_4"` (**Note**: This variable is only honored for Autodiscovery.), `image:.*` |

Additional examples are available on the [Container Discover Management][17] page.

**Note**: The `docker.containers.running`, `.stopped`, `.running.total` and `.stopped.total` metrics are not affected by these settings. All containers are counted. This does not affect your per-container billing.

##### Misc

| Env Variable                        | Description                                                                                                      |
|-------------------------------------|------------------------------------------------------------------------------------------------------------------|
| `DD_PROCESS_AGENT_CONTAINER_SOURCE` | Overrides container source auto-detection to force a single source. e.g `"docker"`, `"ecs_fargate"`, `"kubelet"` |
| `DD_HEALTH_PORT`                    | Set this to `5555` to expose the Agent health check at port `5555`.                                              |

### Validation
Run the Docker Agent’s [status command](#commands) to verify installation.

### Commands
These commands are run on the host.

| Type    | Command                                         |
|---------|-------------------------------------------------|
| Start   | Use the [installation command](#installation).  |
| Stop    | `docker exec -it <CONTAINER_NAME> agent stop`   |
| Restart | Use the [installation command](#installation).  |
| Status  | `docker exec -it <CONTAINER_NAME> agent status` |

## Data collected

### Metrics
By default, the Docker Agent collects metrics with the following core checks. To collect metrics from other technologies, see the [Integrations](#integrations) section.

| Check       | Metrics       |
|-------------|---------------|
| CPU         | [System][18]  |
| Disk        | [Disk][19]    |
| Docker      | [Docker][20]  |
| File Handle | [System][18]  |
| IO          | [System][18]  |
| Load        | [System][18]  |
| Memory      | [System][18]  |
| Network     | [Network][21] |
| NTP         | [NTP][22]     |
| Uptime      | [System][18]  |

### Events
The Docker Agent sends events to Datadog when an Agent is started or restarted.

### Service checks
**datadog.agent.up**:
Returns `CRITICAL` if the Agent is unable to connect to Datadog, otherwise returns `OK`.

**datadog.agent.check_status**:
Returns `CRITICAL` if an Agent check is unable to send metrics to Datadog, otherwise returns `OK`.

## Integrations
The Docker integration sends metrics automatically with the Docker Agent. To configure other integrations, use Autodiscovery or mounting.

### Autodiscovery
Autodiscovery is enabled for the Docker Agent when using the one-step install by mounting `/var/run/docker.sock`.

To add integrations using Autodiscovery, see the [Autodiscovery Integration Templates][23] page.

### Mounting conf.d

Your integration configuration files can be copied to `/etc/datadog-agent/conf.d/` when starting the Docker Agent by mounting a `/conf.d` folder.

1. Create a configuration folder on the host with your YAML files:
    ```shell
    mkdir /opt/datadog-agent-conf.d
    touch /opt/datadog-agent-conf.d/http_check.yaml
    ```

2. When installing the Docker Agent, add `-v /opt/datadog-agent-conf.d:/conf.d:ro`, for example:
    ```shell
    DOCKER_CONTENT_TRUST=1 \
    docker run -d -v /var/run/docker.sock:/var/run/docker.sock:ro \
                  -v /proc/:/host/proc/:ro \
                  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
                  -v /opt/datadog-agent-conf.d:/conf.d:ro \
                  -e DD_API_KEY=<YOUR_DATADOG_API_KEY> \
                  datadog/agent:latest
    ```

When the container starts, all files on the host in `/opt/datadog-agent-conf.d` with a `.yaml` extension are copied to `/etc/datadog-agent/conf.d/`. **Note**: If you add new YAML files to `/opt/datadog-agent-conf.d`, restart the Docker Agent.

The same can be done for the `/checks.d` folder. Any Python files in the `/checks.d` folder are automatically copied to `/etc/datadog-agent/checks.d/` when starting the Docker Agent.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent
[2]: https://hub.docker.com/r/datadog/agent
[3]: https://app.datadoghq.com/account/settings#agent/docker
[4]: /agent/#supported-os-versions
[5]: https://app.datadoghq.com/account/settings#api
[6]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[7]: /tracing
[8]: /logs
[9]: /graphing/infrastructure/process
[10]: /graphing/infrastructure/livecontainers
[11]: https://docs.datadoghq.com/developers/dogstatsd
[12]: /developers/metrics/unix_socket
[13]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/docker_extract.go
[14]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/kubelet_extract.go
[15]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/ecs_extract.go
[16]: /agent/autodiscovery/tag/?tab=containerizedagent
[17]: /agent/autodiscovery/management/?tab=containerizedagent
[18]: /integrations/system/#metrics
[19]: /integrations/disk/#metrics
[20]: /integrations/docker_daemon/#metrics
[21]: /integrations/network/#metrics
[22]: /integrations/ntp/#metrics
[23]: /agent/autodiscovery/integrations
