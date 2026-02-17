---
title: Docker Agent for Docker, containerd, and Podman
description: Install and configure the Datadog Agent for Docker containers and container runtimes
aliases:
  - /guides/basic_agent_usage/docker/
  - /agent/docker
  - /agent/basic_agent_usage/docker/
  - /integrations/docker_daemon/
  - /docker/
further_reading:
  - link: "https://app.datadoghq.com/release-notes?category=Container%20Monitoring"
    tag: "Release Notes"
    text: "Check out the latest Datadog Containers releases! (App login required)."
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
    text: "Automatically collect your application's metrics and logs"
  - link: "/agent/guide/autodiscovery-management/"
    tag: "Documentation"
    text: "Limit data collection to a subset of containers only"
  - link: "/agent/docker/tag/"
    tag: "Documentation"
    text: "Assign tags to all data emitted by a container"
---

## Overview

The Datadog Docker Agent is a version of the [Datadog Agent][1] that supports Docker, containerd, and Podman runtimes. For supported Docker versions, see [Supported Platforms][2].

## Install the Datadog Docker Agent
Follow the [in-app installation flow in Datadog][3]. This is the recommended flow, which helps you create your `docker run` command with your API key, the required minimum configurations, and toggles for various Datadog features.

{{< img src="/agent/basic_agent_usage/agent_install_docker.png" alt="In-app installation steps for the Datadog Agent on Docker." style="width:90%;">}}

## Manually run the Datadog Docker Agent

The Fleet Automation flow helps configure your Datadog Agent container with Datadog's recommended instructions. To configure this manually, see the examples below.

Use the following command to run the Agent as a Docker container once on each host you want to monitor. Replace `<DATADOG_API_KEY>` with your Datadog API key and `<DATADOG_SITE>` with your {{< region-param key=dd_site code="true" >}}.

{{< tabs >}}
{{% tab "Linux" %}}
```shell
docker run -d --cgroupns host --pid host --name dd-agent \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -e DD_SITE=<DATADOG_SITE> \
  -e DD_API_KEY=<DATADOG_API_KEY> \
  gcr.io/datadoghq/agent:7
```
{{% /tab %}}
{{% tab "Windows" %}}
The Datadog Agent is supported on Windows Server 2019 (LTSC) and Windows Server 2022 (LTSC). The following PowerShell command runs the Datadog Agent container:

```powershell
docker run -d --name dd-agent `
  -v \\.\pipe\docker_engine:\\.\pipe\docker_engine `
  -e DD_SITE=<DATADOG_SITE> `
  -e DD_API_KEY=<DATADOG_API_KEY> `
  gcr.io/datadoghq/agent:7
```
{{% /tab %}}
{{< /tabs >}}

**Note**: For Docker Compose, see [Compose and the Datadog Agent][4]. For deploying the Agent in Podman, see the instructions in [Using the Docker integration with Podman container runtime][5].

## Integrations

After the Datadog Docker Agent is up and running, you can [configure Datadog integrations][6] to collect metrics and logs automatically from your application containers. Datadog's [Container Autodiscovery][7] enables you to define monitoring configuration for dynamic resources in containerized systems.

## Configuration options for the Datadog Docker Agent

### Container registries

Images are available for 64-bit x86 and Arm v8 architectures. Datadog publishes container images to Google Artifact Registry, Amazon ECR, Azure ACR, and Docker Hub:

| Google Artifact Registry | Amazon ECR             | Azure ACR            | Docker Hub        |
| ------------------------ | ---------------------- | -------------------- | ----------------- |
| gcr.io/datadoghq         | public.ecr.aws/datadog | datadoghq.azurecr.io | docker.io/datadog |

By default, the above instructions pull the image from Google Artifact Registry (`gcr.io/datadoghq`). If Google Artifact Registry is not accessible in your deployment region, use another registry.

If you are deploying the Agent in an AWS environment, Datadog recommend that you use Amazon ECR.

<div class="alert alert-danger">Docker Hub is subject to image pull rate limits. If you are not a Docker Hub customer, Datadog recommends that you update your Datadog Agent and Cluster Agent configuration to pull from Google Artifact Registry or Amazon ECR. For instructions, see <a href="/agent/guide/changing_container_registry">Changing your container registry</a>.</div>

### Environment variables

In a non-containerized environment, configuration options for the Datadog Agent are set in [`datadog.yaml`][8]. For the Datadog Docker Agent, you can set `datadog.yaml` configuration options through environment variables.

#### Global options

`DD_API_KEY`
: Your Datadog API key (**required**).

`DD_ENV`
: Sets the global `env` tag for all data emitted.

`DD_HOSTNAME`
: Hostname to use for metrics (if autodetection fails).

`DD_HOSTNAME_FILE`
: In some environments, auto-detection of the hostname is not adequate, and you cannot set the value with environment variables. In these cases, you can use a file on the host to provide an appropriate value. If `DD_HOSTNAME` is set to a non-empty value, this option is ignored.

`DD_TAGS`
: Host tags separated by spaces. For example: `key1:value1 key2:value2`.

`DD_SITE`
: Destination site for your metrics, traces, and logs. Set your Datadog site to: `{{< region-param key="dd_site" >}}`. Defaults to `datadoghq.com`.

`DD_DD_URL`
: Optional setting to override the URL for metric submission.

`DD_URL` (6.36+/7.36+)
: Alias for `DD_DD_URL`. Ignored if `DD_DD_URL` is already set.

`DD_CHECK_RUNNERS`
: The Agent runs all checks concurrently by default (default value = `4` runners). To run the checks sequentially, set the value to `1`. If you need to run a high number of checks (or slow checks), the `collector-queue` component may fall behind and fail the health check. You can increase the number of runners to run checks in parallel.

`DD_APM_ENABLED`
: Enables trace collection. Defaults to `true`. For more information about additional trace collection environment variables, see [Tracing Docker Applications][9].

`DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION`
: In some environments, the initial logs from hosts might not include the correct tags. If you're missing tags on new hosts in your logs, include this environment variable and set it to `"10m"`.

#### Proxy settings

Starting with Agent v6.4.0 (and v6.5.0 for the Trace Agent), you can override the Agent proxy settings with the following environment variables:

`DD_PROXY_HTTP`
: An HTTP URL to use as a proxy for `http` requests.

`DD_PROXY_HTTPS`
: An HTTPS URL to use as a proxy for `https` requests.

`DD_PROXY_NO_PROXY`
: A space-separated list of URLs for which no proxy should be used.

For more information about proxy settings, see the [Agent v6 Proxy documentation][10].

#### Optional collection Agents

Optional collection Agents are disabled by default for security or performance reasons. Use these environment variables to enable them:

`DD_APM_NON_LOCAL_TRAFFIC`
: Allow non-local traffic when [tracing from other containers][11].

`DD_LOGS_ENABLED`
: Enable [log collection][12] with the Logs Agent.

`DD_PROCESS_CONFIG_PROCESS_COLLECTION_ENABLED`
: Enable [live process collection][13] with the Process Agent. The [live container view][14] is already enabled by default if the Docker socket is available.

#### DogStatsD (custom metrics)

Send custom metrics with [the StatsD protocol][15]:

`DD_DOGSTATSD_NON_LOCAL_TRAFFIC`
: Listen to DogStatsD packets from other containers (required to send custom metrics).

`DD_HISTOGRAM_PERCENTILES`
: The histogram percentiles to compute (separated by spaces). The default is `0.95`.

`DD_HISTOGRAM_AGGREGATES`
: The histogram aggregates to compute (separated by spaces). The default is `"max median avg count"`.

`DD_DOGSTATSD_SOCKET`
: Path to the unix socket to listen to. Must be in a `rw` mounted volume.

`DD_DOGSTATSD_ORIGIN_DETECTION`
: Enable container detection and tagging for UNIX socket metrics.

`DD_DOGSTATSD_TAGS`
: Additional tags to append to all metrics, events, and service checks received by this DogStatsD server. For example: `"env:golden group:retrievers"`.

`DD_USE_DOGSTATSD`
: Enable or disable sending custom metrics from the DogStatsD library.
Learn more about [DogStatsD over Unix Domain Sockets][16].

#### Tagging

As a best practice, Datadog recommends using [unified service tagging][17] when assigning tags.

Datadog automatically collects common tags from Docker, Kubernetes, ECS, Swarm, Mesos, Nomad, and Rancher. To extract even more tags, use the following options:

`DD_CONTAINER_LABELS_AS_TAGS`
: Extract container labels. This env is equivalent to `DD_DOCKER_LABELS_AS_TAGS`.

`DD_CONTAINER_ENV_AS_TAGS`
: Extract container environment variables. This env is equivalent to `DD_DOCKER_ENV_AS_TAGS`.

`DD_COLLECT_EC2_TAGS`
: Extract custom EC2 tags without using the AWS integration.

See the [Docker Tag Extraction][18] documentation to learn more.

#### Using secret files

Integration credentials can be stored in Docker or Kubernetes secrets and used in Autodiscovery templates. For more information, see the [Secrets Management documentation][19].

#### Ignore containers

Exclude containers from logs collection, metrics collection, and Autodiscovery. Datadog excludes Kubernetes and OpenShift `pause` containers by default. These allowlists and blocklists apply to Autodiscovery only; traces and DogStatsD are not affected. The value for these environment variables support regular expressions.

`DD_CONTAINER_INCLUDE`
: Allowlist of containers to include (separated by spaces). Use `.*` to include all. For example: `"image:image_name_1 image:image_name_2"`, `image:.*`  When using ImageStreams inside OpenShift environments, use the container name instead of image. For example: `"name:container_name_1 name:container_name_2"`, `name:.*`

`DD_CONTAINER_EXCLUDE`
: Blocklist of containers to exclude (separated by spaces). Use `.*` to exclude all. For example: `"image:image_name_3 image:image_name_4"`, `image:.*` (**Note**: This variable is only honored for Autodiscovery.)

`DD_CONTAINER_INCLUDE_METRICS`
: Allowlist of containers whose metrics you wish to include.

`DD_CONTAINER_EXCLUDE_METRICS`
: Blocklist of containers whose metrics you wish to exclude.

`DD_CONTAINER_INCLUDE_LOGS`
: Allowlist of containers whose logs you wish to include.

`DD_CONTAINER_EXCLUDE_LOGS`
: Blocklist of containers whose logs you wish to exclude.

`DD_AC_INCLUDE`
: **Deprecated**. Allowlist of containers to include (separated by spaces). Use `.*` to include all. For example: `"image:image_name_1 image:image_name_2"`, `image:.*`

`DD_AC_EXCLUDE`
: **Deprecated**. Blocklist of containers to exclude (separated by spaces). Use `.*` to exclude all. For example: `"image:image_name_3 image:image_name_4"`, `image:.*` (**Note**: This variable is only honored for Autodiscovery.)

Additional examples are available on the [Container Discovery Management][20] page.

**Note**: The `kubernetes.containers.running`, `kubernetes.pods.running`, `docker.containers.running`, `.stopped`, `.running.total` and `.stopped.total` metrics are not affected by these settings. All containers are counted. This does not affect your per-container billing.

**Note**: When using containerd, it's possible to ignore containers by namespace using `DD_CONTAINERD_NAMESPACES` and `DD_CONTAINERD_EXCLUDE_NAMESPACES`. Both are a space-separated list of namespaces. When `DD_CONTAINERD_NAMESPACES` is set, the agent reports data for the containers that belong to a namespace present in the list. When `DD_CONTAINERD_EXCLUDE_NAMESPACES` is set, the agent reports data for all the containers except the ones that belong to a namespace of the list.

#### Autodiscovery

`DD_LISTENERS`
: Autodiscovery listeners to run.

`DD_EXTRA_LISTENERS`
: Additional Autodiscovery listeners to run. They are added in addition to the variables defined in the `listeners` section of the `datadog.yaml` configuration file.

`DD_CONFIG_PROVIDERS`
: The providers the Agent should call to collect checks configurations. The default provider is `docker`. The Docker provider handles templates embedded in container labels.

`DD_EXTRA_CONFIG_PROVIDERS`
: Additional Autodiscovery configuration providers to use. They are added in addition to the variables defined in the `config_providers` section of the `datadog.yaml` configuration file.

#### Miscellaneous

`DD_PROCESS_AGENT_CONTAINER_SOURCE`
: Overrides container source auto-detection to force a single source. e.g `"docker"`, `"ecs_fargate"`, `"kubelet"`. This is no longer needed since Agent v7.35.0.

`DD_HEALTH_PORT`
: Set this to `5555` to expose the Agent health check at port `5555`.

## Commands

See the [Agent Commands guides][21] to discover all the Docker Agent commands.

## Data collected

### Metrics

By default, the Docker Agent collects metrics with the following core checks. To collect metrics from other technologies, see the [Integrations](#integrations) section.

| Check       | Metrics       |
|-------------|---------------|
| Container   | [Metrics][22]
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

**datadog.agent.up** <br>
Returns `CRITICAL` if the Agent is unable to connect to Datadog, otherwise returns `OK`.

**datadog.agent.check_status** <br>
Returns `CRITICAL` if an Agent check is unable to send metrics to Datadog, otherwise returns `OK`.

## Uninstall Single Step APM Instrumentation

If you installed the Datadog Docker Agent with Single Step APM Instrumentation, and you want to uninstall the Agent, you need to [run additional commands][28] to uninstall APM Instrumentation.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/
[2]: /agent/supported_platforms/?tab=cloudandcontainers
[3]: https://app.datadoghq.com/account/settings/agent/latest?platform=docker
[4]: /containers/guide/compose-and-the-datadog-agent/
[5]: /containers/guide/podman-support-with-docker-integration/
[6]: /containers/docker/integrations/
[7]: /getting_started/containers/autodiscovery
[8]: /agent/configuration/agent-configuration-files/#agent-main-configuration-file
[9]: /containers/docker/apm/
[10]: /agent/configuration/proxy/#agent-v6
[11]: /containers/docker/apm/?tab=linux#tracing-from-other-containers
[12]: /containers/docker/log/
[13]: /infrastructure/process/
[14]: /infrastructure/livecontainers/
[15]: /developers/dogstatsd/
[16]: /developers/dogstatsd/unix_socket/
[17]: /getting_started/tagging/unified_service_tagging/?tab=docker
[18]: /containers/docker/tag
[19]: /agent/configuration/secrets-management/?tab=linux
[20]: /containers/guide/container-discovery-management/?tab=containerizedagent
[21]: /agent/configuration/agent-commands/
[22]: /integrations/container/
[23]: /integrations/system/#metrics
[24]: /integrations/disk/#metrics
[25]: /containers/docker/data_collected/#metrics
[26]: /integrations/network/#metrics
[27]: /integrations/ntp/#metrics
[28]: /tracing/trace_collection/automatic_instrumentation/single-step-apm/docker/#remove-single-step-apm-instrumentation-from-your-agent