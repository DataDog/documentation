---
title: Docker Agent
kind: documentation
aliases:
  - /guides/basic_agent_usage/docker/
  - /agent/docker
  - /agent/basic_agent_usage/docker/
  - /integrations/docker_daemon/
further_reading:
- link: "/agent/docker/log/"
  tag: "Documentation"
  text: "Collect your application logs"
- link: "/agent/docker/apm/"
  tag: "Documentation"
  text: "Collect your application traces"
- link: "/agent/docker/prometheus/"
  tag: "Documentation"
  text: "Collect your Prometheus metrics"
- link: "/agent/docker/integrations/"
  tag: "Documentation"
  text: "Collect automatically your applications metrics and logs"
- link: "/agent/guide/autodiscovery-management/"
  tag: "Documentation"
  text: "Limit data collection to a subset of containers only"
- link: "/agent/docker/tag/"
  tag: "Documentation"
  text: "Assign tags to all data emitted by a container"
---

## Overview

The Datadog Docker Agent is the containerized version of the host [Agent][1]. The official [Docker image][2] is available on Docker Hub.

Images are available for 64-bit x86 and Arm v8 architectures.

## Setup

If you haven’t installed the Docker Agent, follow the [in-app installation instructions][3] or see below. For [supported versions][4], see the Agent documentation. Use the one-step install command. Replace `<YOUR_DATADOG_API_KEY>` with your [Datadog API key][5].

{{< tabs >}}
{{% tab "Standard" %}}

```shell
DOCKER_CONTENT_TRUST=1 \
docker run -d -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -e DD_API_KEY="<DATADOG_API_KEY>" \
              datadog/agent:latest
```

{{% /tab %}}
{{% tab "Amazon Linux version <2" %}}

```shell
DOCKER_CONTENT_TRUST=1 \
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro \
                              -v /proc/:/host/proc/:ro \
                              -v /cgroup/:/host/sys/fs/cgroup:ro \
                              -e DD_API_KEY="<DATADOG_API_KEY>" \
                              datadog/agent:latest
```

{{% /tab %}}
{{% tab "Windows" %}}

The Datadog Agent is supported in Windows Server 2019 (LTSC) and version 1909 (SAC).

```shell
docker run -d --name dd-agent -e DD_API_KEY=<API_KEY> -v \\.\pipe\docker_engine:\\.\pipe\docker_engine datadog/agent:latest
```

{{% /tab %}}
{{< /tabs >}}

**Note**: For Docker Compose, see [Compose and the Datadog Agent][6].

## Integrations

Once the Agent is up and running, use [Datadog's Autodiscovery feature][7] to collect metrics and logs automatically from your application containers.

## Environment variables

The Agent's [main configuration file][8] is `datadog.yaml`. For the Docker Agent, `datadog.yaml` configuration options are passed in with environment variables.

### Global options

| Env Variable       | Description                                                                                                                                                                                                                                                                                                                                      |
|--------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_API_KEY`       | Your Datadog API key (**required**)                                                                                                                                                                                                                                                                                                              |
| `DD_ENV`          | Sets the global `env` tag for all data emitted.                                                                                                                                                                                                                                                                 |
| `DD_HOSTNAME`      | Hostname to use for metrics (if autodetection fails)                                                                                                                                                                                                                                                                                             |
| `DD_TAGS`          | Host tags separated by spaces. For example: `simple-tag-0 tag-key-1:tag-value-1`                                                                                                                                                                                                                                                                 |
| `DD_SITE`          | Destination site for your metrics, traces, and logs. Valid options are `datadoghq.com` for the Datadog US site, and `datadoghq.eu` for the Datadog EU site.                                                                                                                                                                                      |
| `DD_DD_URL`        | Optional setting to override the URL for metric submission.                                                                                                                                                                                                                                                                                      |
| `DD_CHECK_RUNNERS` | The Agent runs all checks concurrently by default (default value = `4` runners). To run the checks sequentially, set the value to `1`. If you need to run a high number of checks (or slow checks) the `collector-queue` component might fall behind and fail the healthcheck. You can increase the number of runners to run checks in parallel. |

### Proxy Settings

Starting with Agent v6.4.0 (and v6.5.0 for the Trace Agent), you can override the Agent proxy settings with the following environment variables:

| Env Variable        | Description                                                       |
|---------------------|-------------------------------------------------------------------|
| `DD_PROXY_HTTP`     | An HTTP URL to use as a proxy for `http` requests.                |
| `DD_PROXY_HTTPS`    | An HTTPS URL to use as a proxy for `https` requests.              |
| `DD_PROXY_NO_PROXY` | A space-separated list of URLs for which no proxy should be used. |

For more information about proxy settings, see the [Agent v6 Proxy documentation][9].

### Optional collection Agents

Optional collection Agents are disabled by default for security or performance reasons. Use these environment variables to enable them:

| Env Variable               | Description                                                                                                                                                                                                                                                      |
|----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_APM_ENABLED`           | Enable [trace collection][10] with the Trace Agent.                                                                                                                                                                                                               |
| `DD_LOGS_ENABLED`          | Enable [log collection][11] with the Logs Agent.                                                                                                                                                                                                                 |
| `DD_PROCESS_AGENT_ENABLED` | Enable [live process collection][12] with the Process Agent. The [live container view][13] is already enabled by default if the Docker socket is available. If set to `false`, the [live process collection][12] and the [live container view][13] are disabled. |

### DogStatsD (custom metrics)

Send custom metrics with [the StatsD protocol][14]:

| Env Variable                     | Description                                                                                                                                                |
|----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` | Listen to DogStatsD packets from other containers (required to send custom metrics).                                                                       |
| `DD_HISTOGRAM_PERCENTILES`       | The histogram percentiles to compute (separated by spaces). The default is `0.95`.                                                                         |
| `DD_HISTOGRAM_AGGREGATES`        | The histogram aggregates to compute (separated by spaces). The default is "max median avg count".                                                          |
| `DD_DOGSTATSD_SOCKET`            | Path to the unix socket to listen to. Must be in a `rw` mounted volume.                                                                                    |
| `DD_DOGSTATSD_ORIGIN_DETECTION`  | Enable container detection and tagging for unix socket metrics.                                                                                            |
| `DD_DOGSTATSD_TAGS`              | Additional tags to append to all metrics, events, and service checks received by this DogStatsD server, for example: `["env:golden", "group:retrievers"]`. |

Learn more about [DogStatsD over Unix Domain Sockets][15].

### Tagging

**Note**: As a best practice, Datadog recommends using [unified service tagging](#unified-service-tagging) when assigning tags.

Datadog automatically collects common tags from [Docker][16], [Kubernetes][17], [ECS][18], [Swarm, Mesos, Nomad, and Rancher][16]. To extract even more tags, use the following options:

| Env Variable                            | Description                                               |
|-----------------------------------------|-----------------------------------------------------------|
| `DD_DOCKER_LABELS_AS_TAGS`              | Extract Docker container labels                           |
| `DD_DOCKER_ENV_AS_TAGS`                 | Extract Docker container environment variables            |
| `DD_COLLECT_EC2_TAGS`                   | Extract custom EC2 tags without using the AWS integration |

See the [Docker Tag Extraction][19] documentation to learn more.

### Using secret files

Integration credentials can be stored in Docker or Kubernetes secrets and used in Autodiscovery templates. For more information, see the [Secrets Management documentation][20].

### Ignore containers

Exclude containers from logs collection, metrics collection, and Autodiscovery. Datadog excludes Kubernetes and OpenShift `pause` containers by default.

| Env Variable    | Description                                                                                                                                                                                                        |
|-----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_AC_INCLUDE` | Whitelist of containers to include (separated by spaces). Use `.*` to include all. For example: `"image:image_name_1 image:image_name_2"`, `image:.*`                                                              |
| `DD_AC_EXCLUDE` | Blacklist of containers to exclude (separated by spaces). Use `.*` to exclude all. For example: `"image:image_name_3 image:image_name_4"` (**Note**: This variable is only honored for Autodiscovery.), `image:.*` |

Additional examples are available on the [Container Discover Management][21] page.

**Note**: The `docker.containers.running`, `.stopped`, `.running.total` and `.stopped.total` metrics are not affected by these settings. All containers are counted. This does not affect your per-container billing.

### Misc

| Env Variable                        | Description                                                                                                      |
|-------------------------------------|------------------------------------------------------------------------------------------------------------------|
| `DD_PROCESS_AGENT_CONTAINER_SOURCE` | Overrides container source auto-detection to force a single source. e.g `"docker"`, `"ecs_fargate"`, `"kubelet"` |
| `DD_HEALTH_PORT`                    | Set this to `5555` to expose the Agent health check at port `5555`.                                              |

**Note**: If you are using the containerd runtime, set `DD_PROCESS_AGENT_CONTAINER_SOURCE="kubelet"` in order to see your containers on the containers page.

You can add extra listeners and config providers using the `DD_EXTRA_LISTENERS` and `DD_EXTRA_CONFIG_PROVIDERS` environment variables. They are added in addition to the variables defined in the `listeners` and `config_providers` section of the `datadog.yaml` configuration file.

## Commands

See the [Agent Commands guides][22] to discover all the Docker Agent commands.

## Data collected

### Metrics

By default, the Docker Agent collects metrics with the following core checks. To collect metrics from other technologies, see the [Integrations](#integrations) section.

| Check       | Metrics       |
|-------------|---------------|
| CPU         | [System][23]  |
| Disk        | [Disk][24]    |
| Docker      | [Docker][25]  |
| File Handle | [System][23]  |
| IO          | [System][23]  |
| Load        | [System][23]  |
| Memory      | [System][23]  |
| Network     | [Network][26] |
| NTP         | [NTP][27]     |
| Uptime      | [System][23]  |

### Events

The Docker Agent sends events to Datadog when an Agent is started or restarted.

### Service checks

**datadog.agent.up**: <br>
Returns `CRITICAL` if the Agent is unable to connect to Datadog, otherwise returns `OK`.

**datadog.agent.check_status**: <br>
Returns `CRITICAL` if an Agent check is unable to send metrics to Datadog, otherwise returns `OK`.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/
[2]: https://hub.docker.com/r/datadog/agent
[3]: https://app.datadoghq.com/account/settings#agent/docker
[4]: /agent/basic_agent_usage/#supported-os-versions
[5]: https://app.datadoghq.com/account/settings#api
[6]: /integrations/faq/compose-and-the-datadog-agent/
[7]: /agent/docker/integrations/
[8]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[9]: /agent/proxy/#agent-v6
[10]: /agent/docker/apm/
[11]: /agent/docker/log/
[12]: /infrastructure/process/
[13]: /infrastructure/livecontainers/
[14]: /developers/dogstatsd/
[15]: /developers/dogstatsd/unix_socket/
[16]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/docker_extract.go
[17]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/kubelet_extract.go
[18]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/ecs_extract.go
[19]: /agent/docker/tag/
[20]: /agent/guide/secrets-management/?tab=linux
[21]: /agent/guide/autodiscovery-management/
[22]: /agent/guide/agent-commands/
[23]: /integrations/system/#metrics
[24]: /integrations/disk/#metrics
[25]: /agent/docker/data_collected/#metrics
[26]: /integrations/network/#metrics
[27]: /integrations/ntp/#metrics
