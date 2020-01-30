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
- link: "/infrastructure/process"
  tag: "Documentation"
  text: Collect your Docker processes
- link: "agent/docker/apm"
  tag: "Documentation"
  text: Collect your Docker traces
---

## Overview

The Datadog Docker Agent is the containerized version of the host [Agent][1]. The official [Docker image][2] is available on Docker Hub.

Images are available for 64-bit x86 and Arm v8 architectures.

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
              -e DD_API_KEY=<DATADOG_API_KEY> \
              datadog/agent:latest
```

{{% /tab %}}
{{% tab "Amazon Linux version <2" %}}

```shell
DOCKER_CONTENT_TRUST=1 \
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro \
                              -v /proc/:/host/proc/:ro \
                              -v /cgroup/:/host/sys/fs/cgroup:ro \
                              -e DD_API_KEY=<DATADOG_API_KEY> \
                              datadog/agent:latest
```

{{% /tab %}}
{{< /tabs >}}

**Note**: For Docker Compose, see [Compose and the Datadog Agent][6].

### Configuration

The Agent's [main configuration file][7] is `datadog.yaml`. For the Docker Agent, `datadog.yaml` configuration options are passed in with environment variables.

#### Environment variables

##### Global options

| Env Variable       | Description                                                                                                                                                                                                                                                                                                                                      |
|--------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_API_KEY`       | Your Datadog API key (**required**)                                                                                                                                                                                                                                                                                                              |
| `DD_HOSTNAME`      | Hostname to use for metrics (if autodetection fails)                                                                                                                                                                                                                                                                                             |
| `DD_TAGS`          | Host tags separated by spaces. For example: `simple-tag-0 tag-key-1:tag-value-1`                                                                                                                                                                                                                                                                 |
| `DD_SITE`          | Destination site for your metrics, traces, and logs. Valid options are `datadoghq.com` for the Datadog US site, and `datadoghq.eu` for the Datadog EU site.                                                                                                                                                                                      |
| `DD_DD_URL`        | Optional setting to override the URL for metric submission.                                                                                                                                                                                                                                                                                      |
| `DD_CHECK_RUNNERS` | The Agent runs all checks concurrently by default (default value = `4` runners). To run the checks sequentially, set the value to `1`. If you need to run a high number of checks (or slow checks) the `collector-queue` component might fall behind and fail the healthcheck. You can increase the number of runners to run checks in parallel. |

##### Proxy Settings

Starting with Agent v6.4.0 (and v6.5.0 for the Trace Agent), you can override the Agent proxy settings with the following environment variables:

| Env Variable        | Description                                                       |
|---------------------|-------------------------------------------------------------------|
| `DD_PROXY_HTTP`     | An HTTP URL to use as a proxy for `http` requests.                |
| `DD_PROXY_HTTPS`    | An HTTPS URL to use as a proxy for `https` requests.              |
| `DD_PROXY_NO_PROXY` | A space-separated list of URLs for which no proxy should be used. |

For more information about proxy settings, see the [Agent v6 Proxy documentation][8].

##### Optional collection Agents

Optional collection Agents are disabled by default for security or performance reasons. Use these environment variables to enable them:

| Env Variable               | Description                                                                                                                                                                                                                                                      |
|----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_APM_ENABLED`           | Enable [trace collection][9] with the Trace Agent.                                                                                                                                                                                                               |
| `DD_LOGS_ENABLED`          | Enable [log collection][10] with the Logs Agent.                                                                                                                                                                                                                 |
| `DD_PROCESS_AGENT_ENABLED` | Enable [live process collection][11] with the Process Agent. The [live container view][12] is already enabled by default if the Docker socket is available. If set to `false`, the [live process collection][11] and the [live container view][12] are disabled. |

##### DogStatsD (custom metrics)

Send custom metrics with [the StatsD protocol][13]:

| Env Variable                     | Description                                                                                                                                                |
|----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` | Listen to DogStatsD packets from other containers (required to send custom metrics).                                                                       |
| `DD_HISTOGRAM_PERCENTILES`       | The histogram percentiles to compute (separated by spaces). The default is "0.95".                                                                         |
| `DD_HISTOGRAM_AGGREGATES`        | The histogram aggregates to compute (separated by spaces). The default is "max median avg count".                                                          |
| `DD_DOGSTATSD_SOCKET`            | Path to the unix socket to listen to. Must be in a `rw` mounted volume.                                                                                    |
| `DD_DOGSTATSD_ORIGIN_DETECTION`  | Enable container detection and tagging for unix socket metrics.                                                                                            |
| `DD_DOGSTATSD_TAGS`              | Additional tags to append to all metrics, events, and service checks received by this DogStatsD server, for example: `["env:golden", "group:retrievers"]`. |

Learn more about [DogStatsD over Unix Domain Sockets][14].

##### Tagging

Datadog automatically collects common tags from [Docker][15], [Kubernetes][16], [ECS][17], [Swarm, Mesos, Nomad, and Rancher][15]. To extract even more tags, use the following options:

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

Additional examples are available on the [Tag Assignment and Extraction][18] page.

##### Using secret files

Integration credentials can be stored in Docker or Kubernetes secrets and used in Autodiscovery templates. For more information, see the [Secrets Management documentation][19].

##### Ignore containers

Exclude containers from logs collection, metrics collection, and Autodiscovery. Datadog excludes Kubernetes and OpenShift `pause` containers by default.

| Env Variable    | Description                                                                                                                                                                                                        |
|-----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_AC_INCLUDE` | Whitelist of containers to include (separated by spaces). Use `.*` to include all. For example: `"image:image_name_1 image:image_name_2"`, `image:.*`                                                              |
| `DD_AC_EXCLUDE` | Blacklist of containers to exclude (separated by spaces). Use `.*` to exclude all. For example: `"image:image_name_3 image:image_name_4"` (**Note**: This variable is only honored for Autodiscovery.), `image:.*` |

Additional examples are available on the [Container Discover Management][20] page.

**Note**: The `docker.containers.running`, `.stopped`, `.running.total` and `.stopped.total` metrics are not affected by these settings. All containers are counted. This does not affect your per-container billing.

##### Misc

| Env Variable                        | Description                                                                                                      |
|-------------------------------------|------------------------------------------------------------------------------------------------------------------|
| `DD_PROCESS_AGENT_CONTAINER_SOURCE` | Overrides container source auto-detection to force a single source. e.g `"docker"`, `"ecs_fargate"`, `"kubelet"` |
| `DD_HEALTH_PORT`                    | Set this to `5555` to expose the Agent health check at port `5555`.                                              |

**Note**: If you are using the containerd runtime, set `DD_PROCESS_AGENT_CONTAINER_SOURCE="kubelet"` in order to see your containers on the containers page.

You can add extra listeners and config providers using the `DD_EXTRA_LISTENERS` and `DD_EXTRA_CONFIG_PROVIDERS` environment variables. They are added in addition to the variables defined in the `listeners` and `config_providers` section of the `datadog.yaml` configuration file.

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
| CPU         | [System][21]  |
| Disk        | [Disk][22]    |
| Docker      | [Docker][23]  |
| File Handle | [System][21]  |
| IO          | [System][21]  |
| Load        | [System][21]  |
| Memory      | [System][21]  |
| Network     | [Network][24] |
| NTP         | [NTP][25]     |
| Uptime      | [System][21]  |

### Events

The Docker Agent sends events to Datadog when an Agent is started or restarted.

### Service checks

**datadog.agent.up**: <br>
Returns `CRITICAL` if the Agent is unable to connect to Datadog, otherwise returns `OK`.

**datadog.agent.check_status**: <br>
Returns `CRITICAL` if an Agent check is unable to send metrics to Datadog, otherwise returns `OK`.

## Integrations

The Docker integration sends metrics automatically with the Docker Agent. To configure other integrations, use Autodiscovery or mounting.

### Autodiscovery

Autodiscovery is enabled for the Docker Agent when using the one-step install by mounting `/var/run/docker.sock`.

To add integrations using Autodiscovery, see the [Autodiscovery Integration Templates][26] page.

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
[4]: /agent/basic_agent_usage/#supported-os-versions
[5]: https://app.datadoghq.com/account/settings#api
[6]: /integrations/faq/compose-and-the-datadog-agent
[7]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[8]: /agent/proxy/#agent-v6
[9]: /tracing
[10]: /logs
[11]: /infrastructure/process
[12]: /infrastructure/livecontainers
[13]: https://docs.datadoghq.com/developers/dogstatsd
[14]: /developers/dogstatsd/unix_socket
[15]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/docker_extract.go
[16]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/kubelet_extract.go
[17]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/ecs_extract.go
[18]: /agent/autodiscovery/tag/?tab=containerizedagent
[19]: /agent/guide/secrets-management/?tab=linux
[20]: /agent/autodiscovery/management/?tab=containerizedagent
[21]: /integrations/system/#metrics
[22]: /integrations/disk/#metrics
[23]: /integrations/docker_daemon/#metrics
[24]: /integrations/network/#metrics
[25]: /integrations/ntp/#metrics
[26]: /agent/autodiscovery/integrations
