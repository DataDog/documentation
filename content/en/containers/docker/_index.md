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

The Datadog Docker Agent is a version of the [Datadog Agent][1] that supports Docker, containerd, and Podman runtimes. For supported Docker versions, see [Supported Platforms][35].

## Install the Datadog Docker Agent
Follow the [in-app installation flow in Datadog][34].

{{< img src="/agent/basic_agent_usage/agent_install_docker.png" alt="In-app installation steps for the Datadog Agent on Docker." style="width:90%;">}}

## Integrations

After the Datadog Docker Agent is up and running, you can [configure Datadog integrations][12] to collect metrics and logs automatically from your application containers. Datadog's [Container Autodiscovery][36] enables you to define monitoring configuration for dynamic resources in containerized systems.

## Configuration options for the Datadog Docker Agent

In a non-containerized environment, configuration options for the Datadog Agent are set in [`datadog.yaml`][13]. For the Datadog Docker Agent, you can set `datadog.yaml` configuration options through environment variables.

### Environment variables

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
: Enables trace collection. Defaults to `true`. For more information about additional trace collection environment variables, see [Tracing Docker Applications][14].

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

For more information about proxy settings, see the [Agent v6 Proxy documentation][15].

#### Optional collection Agents

Optional collection Agents are disabled by default for security or performance reasons. Use these environment variables to enable them:

`DD_APM_NON_LOCAL_TRAFFIC`
: Allow non-local traffic when [tracing from other containers][16].

`DD_LOGS_ENABLED`
: Enable [log collection][17] with the Logs Agent.

`DD_PROCESS_CONFIG_PROCESS_COLLECTION_ENABLED`
: Enable [live process collection][18] with the Process Agent. The [live container view][19] is already enabled by default if the Docker socket is available.

#### DogStatsD (custom metrics)

Send custom metrics with [the StatsD protocol][20]:

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
Learn more about [DogStatsD over Unix Domain Sockets][21].

#### Tagging

As a best practice, Datadog recommends using [unified service tagging][22] when assigning tags.

Datadog automatically collects common tags from Docker, Kubernetes, ECS, Swarm, Mesos, Nomad, and Rancher. To extract even more tags, use the following options:

`DD_CONTAINER_LABELS_AS_TAGS`
: Extract container labels. This env is equivalent to `DD_DOCKER_LABELS_AS_TAGS`.

`DD_CONTAINER_ENV_AS_TAGS`
: Extract container environment variables. This env is equivalent to `DD_DOCKER_ENV_AS_TAGS`.

`DD_COLLECT_EC2_TAGS`
: Extract custom EC2 tags without using the AWS integration.

See the [Docker Tag Extraction][23] documentation to learn more.

#### Using secret files

Integration credentials can be stored in Docker or Kubernetes secrets and used in Autodiscovery templates. For more information, see the [Secrets Management documentation][24].

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

Additional examples are available on the [Container Discover Management][25] page.

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

See the [Agent Commands guides][26] to discover all the Docker Agent commands.

## Data collected

### Metrics

By default, the Docker Agent collects metrics with the following core checks. To collect metrics from other technologies, see the [Integrations](#integrations) section.

| Check       | Metrics       |
|-------------|---------------|
| Container   | [Metrics][27]
| CPU         | [System][28]  |
| Disk        | [Disk][29]    |
| Docker      | [Docker][30]  |
| File Handle | [System][28]  |
| IO          | [System][28]  |
| Load        | [System][28]  |
| Memory      | [System][28]  |
| Network     | [Network][31] |
| NTP         | [NTP][32]     |
| Uptime      | [System][28]  |

### Events

The Docker Agent sends events to Datadog when an Agent is started or restarted.

### Service checks

**datadog.agent.up** <br>
Returns `CRITICAL` if the Agent is unable to connect to Datadog, otherwise returns `OK`.

**datadog.agent.check_status** <br>
Returns `CRITICAL` if an Agent check is unable to send metrics to Datadog, otherwise returns `OK`.

## Uninstall Single Step APM Instrumentation

If you installed the Datadog Docker Agent with Single Step APM Instrumentation, and you want to uninstall the Agent, you need to [run additional commands][33] to uninstall APM Instrumentation.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/
[12]: /agent/docker/integrations/
[13]: /agent/configuration/agent-configuration-files/#agent-main-configuration-file
[14]: /agent/docker/apm/
[15]: /agent/configuration/proxy/#agent-v6
[16]: /agent/docker/apm/#tracing-from-other-containers
[17]: /agent/docker/log/
[18]: /infrastructure/process/
[19]: /infrastructure/livecontainers/
[20]: /developers/dogstatsd/
[21]: /developers/dogstatsd/unix_socket/
[22]: /getting_started/tagging/unified_service_tagging/
[23]: /agent/docker/tag/
[24]: /agent/configuration/secrets-management/?tab=linux
[25]: /agent/guide/autodiscovery-management/
[26]: /agent/configuration/agent-commands/
[27]: /integrations/container/
[28]: /integrations/system/#metrics
[29]: /integrations/disk/#metrics
[30]: /agent/docker/data_collected/#metrics
[31]: /integrations/network/#metrics
[32]: /integrations/ntp/#metrics
[33]: /tracing/trace_collection/automatic_instrumentation/single-step-apm/?tab=docker#removing-apm-for-all-services-on-the-infrastructure
[34]: https://app.datadoghq.com/account/settings/agent/latest?platform=docker
[35]: /agent/supported_platforms/?tab=cloudandcontainers
[36]: /getting_started/containers/autodiscovery