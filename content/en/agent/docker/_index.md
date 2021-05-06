---
title: Docker Agent
kind: documentation
aliases:
  - /guides/basic_agent_usage/docker/
  - /agent/docker
  - /agent/basic_agent_usage/docker/
  - /integrations/docker_daemon/
  - /docker/
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

The Datadog Docker Agent is the containerized version of the host [Agent][1]. The official [Docker image][2] is available on Docker Hub, GCR and ECR-Public.

Images are available for 64-bit x86 and Arm v8 architectures.

| Docker Hub                                             | GCR                                                             |ECR-Public                                                            |
|--------------------------------------------------------|-----------------------------------------------------------------|----------------------------------------------------------------------|
| [Agent v6+][2]<br>`docker pull datadog/agent`          | [Agent v6+][3]<br>`docker pull gcr.io/datadoghq/agent`          |[Agent v6+][4]<br>`docker pull public.ecr.aws/datadog/agent`          |
| [Agent v5][5]<br>`docker pull datadog/docker-dd-agent` | [Agent v5][6]<br>`docker pull gcr.io/datadoghq/docker-dd-agent` |[Agent v5][7]<br>`docker pull public.ecr.aws/datadog/docker-dd-agent` |

## Setup

If you haven’t installed the Docker Agent, follow the [in-app installation instructions][6] or see below. For [supported versions][7], see the Agent documentation. Use the one-step install command. Replace `<YOUR_DATADOG_API_KEY>` with your [Datadog API key][8].

{{< tabs >}}
{{% tab "Standard" %}}

```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e DD_API_KEY=<DATADOG_API_KEY> gcr.io/datadoghq/agent:7
```

for ECR-public

```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e DD_API_KEY=<DATADOG_API_KEY> public.ecr.aws/datadog/agent:7
```

**Note**: If you're using a different registry besides GCR or ECR-public, make sure to update the image.

{{% /tab %}}
{{% tab "Amazon Linux" %}}

For Amazon Linux < v2:

```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /cgroup/:/host/sys/fs/cgroup:ro -e DD_API_KEY=<DATADOG_API_KEY> gcr.io/datadoghq/agent:7
```
For ECR-public

```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /cgroup/:/host/sys/fs/cgroup:ro -e DD_API_KEY=<DATADOG_API_KEY> public.ecr.aws/datadog/agent:7
```

For Amazon Linux v2:

```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e DD_API_KEY=<DATADOG_API_KEY> gcr.io/datadoghq/agent:7
```
For ECR-public

```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e DD_API_KEY=<DATADOG_API_KEY> public.ecr.aws/datadog/agent:7
```

{{% /tab %}}
{{% tab "Windows" %}}

The Datadog Agent is supported in Windows Server 2019 (LTSC) and version 1909 (SAC).

```shell
docker run -d --name dd-agent -e DD_API_KEY=<API_KEY> -v \\.\pipe\docker_engine:\\.\pipe\docker_engine gcr.io/datadoghq/agent
```

for ECR-Public
```shell
docker run -d --name dd-agent -e DD_API_KEY=<API_KEY> -v \\.\pipe\docker_engine:\\.\pipe\docker_engine public.ecr.aws/datadog/agent
```

{{% /tab %}}
{{% tab "Unprivileged" %}}

(Optional) To run an unprivileged installation, add `--group-add=<DOCKER_GROUP_ID>` to the install command, for example:

```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e DD_API_KEY=<DATADOG_API_KEY> gcr.io/datadoghq/agent:7 --group-add=<DOCKER_GROUP_ID>
```
for ECR-Public

```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e DD_API_KEY=<DATADOG_API_KEY> public.ecr.aws/datadog/agent:7 --group-add=<DOCKER_GROUP_ID>
```

{{% /tab %}}
{{< /tabs >}}

**Note**: For Docker Compose, see [Compose and the Datadog Agent][9].

## Integrations

Once the Agent is up and running, use [Datadog's Autodiscovery feature][10] to collect metrics and logs automatically from your application containers.

## Environment variables

The Agent's [main configuration file][11] is `datadog.yaml`. For the Docker Agent, `datadog.yaml` configuration options are passed in with environment variables.

### Global options

| Env Variable       | Description                                                                                                                                                                                                                                                                                                                                      |
|--------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_API_KEY`       | Your Datadog API key (**required**)                                                                                                                                                                                                                                                                                                              |
| `DD_ENV`           | Sets the global `env` tag for all data emitted.                                                                                                                                                                                                                                                                                                  |
| `DD_HOSTNAME`      | Hostname to use for metrics (if autodetection fails)                                                                                                                                                                                                                                                                                             |
| `DD_TAGS`          | Host tags separated by spaces. For example: `simple-tag-0 tag-key-1:tag-value-1`                                                                                                                                                                                                                                                                 |
| `DD_SITE`          | Destination site for your metrics, traces, and logs. Set your Datadog site to: `{{< region-param key="dd_site" >}}`. Defaults to `datadoghq.com`.                                                                                                                                                                                                |
| `DD_DD_URL`        | Optional setting to override the URL for metric submission.                                                                                                                                                                                                                                                                                      |
| `DD_CHECK_RUNNERS` | The Agent runs all checks concurrently by default (default value = `4` runners). To run the checks sequentially, set the value to `1`. If you need to run a high number of checks (or slow checks) the `collector-queue` component might fall behind and fail the healthcheck. You can increase the number of runners to run checks in parallel. |

### Proxy settings

Starting with Agent v6.4.0 (and v6.5.0 for the Trace Agent), you can override the Agent proxy settings with the following environment variables:

| Env Variable        | Description                                                       |
|---------------------|-------------------------------------------------------------------|
| `DD_PROXY_HTTP`     | An HTTP URL to use as a proxy for `http` requests.                |
| `DD_PROXY_HTTPS`    | An HTTPS URL to use as a proxy for `https` requests.              |
| `DD_PROXY_NO_PROXY` | A space-separated list of URLs for which no proxy should be used. |

For more information about proxy settings, see the [Agent v6 Proxy documentation][12].

### Optional collection Agents

Optional collection Agents are disabled by default for security or performance reasons. Use these environment variables to enable them:

| Env Variable               | Description                                                                                                                                                                                                                                                      |
|----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_APM_ENABLED`           | Enable [trace collection][13] with the Trace Agent.                                                                                                                                                                                                              |
| `DD_LOGS_ENABLED`          | Enable [log collection][14] with the Logs Agent.                                                                                                                                                                                                                 |
| `DD_PROCESS_AGENT_ENABLED` | Enable [live process collection][15] with the Process Agent. The [live container view][16] is already enabled by default if the Docker socket is available. If set to `false`, the [live process collection][15] and the [live container view][16] are disabled. |

### DogStatsD (custom metrics)

Send custom metrics with [the StatsD protocol][17]:

| Env Variable                     | Description                                                                                                                                                |
|----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` | Listen to DogStatsD packets from other containers (required to send custom metrics).                                                                       |
| `DD_HISTOGRAM_PERCENTILES`       | The histogram percentiles to compute (separated by spaces). The default is `0.95`.                                                                         |
| `DD_HISTOGRAM_AGGREGATES`        | The histogram aggregates to compute (separated by spaces). The default is "max median avg count".                                                          |
| `DD_DOGSTATSD_SOCKET`            | Path to the unix socket to listen to. Must be in a `rw` mounted volume.                                                                                    |
| `DD_DOGSTATSD_ORIGIN_DETECTION`  | Enable container detection and tagging for unix socket metrics.                                                                                            |
| `DD_DOGSTATSD_TAGS`              | Additional tags to append to all metrics, events, and service checks received by this DogStatsD server, for example: `["env:golden", "group:retrievers"]`. |

Learn more about [DogStatsD over Unix Domain Sockets][18].

### Tagging

As a best practice, Datadog recommends using [unified service tagging][19] when assigning tags.

Datadog automatically collects common tags from [Docker][20], [Kubernetes][21], [ECS][22], [Swarm, Mesos, Nomad, and Rancher][20]. To extract even more tags, use the following options:

| Env Variable               | Description                                               |
|----------------------------|-----------------------------------------------------------|
| `DD_DOCKER_LABELS_AS_TAGS` | Extract Docker container labels                           |
| `DD_DOCKER_ENV_AS_TAGS`    | Extract Docker container environment variables            |
| `DD_COLLECT_EC2_TAGS`      | Extract custom EC2 tags without using the AWS integration |

See the [Docker Tag Extraction][23] documentation to learn more.

### Using secret files

Integration credentials can be stored in Docker or Kubernetes secrets and used in Autodiscovery templates. For more information, see the [Secrets Management documentation][24].

### Ignore containers

Exclude containers from logs collection, metrics collection, and Autodiscovery. Datadog excludes Kubernetes and OpenShift `pause` containers by default. These allowlists and blocklists apply to Autodiscovery only; traces and DogStatsD are not affected. The value for these environment variables support regular expressions.

| Env Variable                   | Description                                                                                                                                                                                                                                                                                                               |
|--------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_CONTAINER_INCLUDE`         | Allowlist of containers to include (separated by spaces). Use `.*` to include all. For example: `"image:image_name_1 image:image_name_2"`, `image:.*`  When using ImageStreams inside OpenShift environments, use the container name instead of image. For example:"name:container_name_1 name:container_name_2", name:.* |
| `DD_CONTAINER_EXCLUDE`         | Blocklist of containers to exclude (separated by spaces). Use `.*` to exclude all. For example: `"image:image_name_3 image:image_name_4"` (**Note**: This variable is only honored for Autodiscovery.), `image:.*`                                                                                                        |
| `DD_CONTAINER_INCLUDE_METRICS` | Allowlist of containers whose metrics you wish to include.                                                                                                                                                                                                                                                                |
| `DD_CONTAINER_EXCLUDE_METRICS` | Blocklist of containers whose metrics you wish to exclude.                                                                                                                                                                                                                                                                |
| `DD_CONTAINER_INCLUDE_LOGS`    | Allowlist of containers whose logs you wish to include.                                                                                                                                                                                                                                                                   |
| `DD_CONTAINER_EXCLUDE_LOGS`    | Blocklist of containers whose logs you wish to exclude.                                                                                                                                                                                                                                                                   |
| `DD_AC_INCLUDE`                | **Deprecated**. Allowlist of containers to include (separated by spaces). Use `.*` to include all. For example: `"image:image_name_1 image:image_name_2"`, `image:.*`                                                                                                                                                     |
| `DD_AC_EXCLUDE`                | **Deprecated**. Blocklist of containers to exclude (separated by spaces). Use `.*` to exclude all. For example: `"image:image_name_3 image:image_name_4"` (**Note**: This variable is only honored for Autodiscovery.), `image:.*`                                                                                        |

Additional examples are available on the [Container Discover Management][25] page.

**Note**: The `kubernetes.containers.running`, `kubernetes.pods.running`, `docker.containers.running`, `.stopped`, `.running.total` and `.stopped.total` metrics are not affected by these settings. All containers are counted. This does not affect your per-container billing.

### Misc

| Env Variable                        | Description                                                                                                      |
|-------------------------------------|------------------------------------------------------------------------------------------------------------------|
| `DD_PROCESS_AGENT_CONTAINER_SOURCE` | Overrides container source auto-detection to force a single source. e.g `"docker"`, `"ecs_fargate"`, `"kubelet"` |
| `DD_HEALTH_PORT`                    | Set this to `5555` to expose the Agent health check at port `5555`.                                              |

You can add extra listeners and config providers using the `DD_EXTRA_LISTENERS` and `DD_EXTRA_CONFIG_PROVIDERS` environment variables. They are added in addition to the variables defined in the `listeners` and `config_providers` section of the `datadog.yaml` configuration file.

## Commands

See the [Agent Commands guides][26] to discover all the Docker Agent commands.

## Data collected

### Metrics

By default, the Docker Agent collects metrics with the following core checks. To collect metrics from other technologies, see the [Integrations](#integrations) section.

| Check       | Metrics       |
|-------------|---------------|
| CPU         | [System][27]  |
| Disk        | [Disk][28]    |
| Docker      | [Docker][29]  |
| File Handle | [System][27]  |
| IO          | [System][27]  |
| Load        | [System][27]  |
| Memory      | [System][27]  |
| Network     | [Network][30] |
| NTP         | [NTP][31]     |
| Uptime      | [System][27]  |

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
[3]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/agent
[4]: https://gallery.ecr.aws/datadog/agent
[4]: https://hub.docker.com/r/datadog/docker-dd-agent
[5]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/docker-dd-agent?gcrImageListsize=30
[6]: https://gallery.ecr.aws/datadog/docker-dd-agent
[6]: https://app.datadoghq.com/account/settings#agent/docker
[7]: /agent/basic_agent_usage/#supported-os-versions
[8]: https://app.datadoghq.com/account/settings#api
[9]: /integrations/faq/compose-and-the-datadog-agent/
[10]: /agent/docker/integrations/
[11]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[12]: /agent/proxy/#agent-v6
[13]: /agent/docker/apm/
[14]: /agent/docker/log/
[15]: /infrastructure/process/
[16]: /infrastructure/livecontainers/
[17]: /developers/dogstatsd/
[18]: /developers/dogstatsd/unix_socket/
[19]: /getting_started/tagging/unified_service_tagging/
[20]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/docker_extract.go
[21]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/kubelet_extract.go
[22]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/ecs_extract.go
[23]: /agent/docker/tag/
[24]: /agent/guide/secrets-management/?tab=linux
[25]: /agent/guide/autodiscovery-management/
[26]: /agent/guide/agent-commands/
[27]: /integrations/system/#metrics
[28]: /integrations/disk/#metrics
[29]: /agent/docker/data_collected/#metrics
[30]: /integrations/network/#metrics
[31]: /integrations/ntp/#metrics
