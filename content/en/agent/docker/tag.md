---
title: Docker Tag Extraction
kind: documentation
further_reading:
- link: "/getting_started/tagging/"
  tag: "Documentation"
  text: "Getting started with tags"
- link: "/getting_started/tagging/using_tags/"
  tag: "Documentation"
  text: "Using tags with Datadog"
- link: "/agent/guide/autodiscovery-management/"
  tag: "Documentation"
  text: "Limit data collection to a subset of containers only"
---

## Overview

The Datadog Agent can create and assign tags to all metrics, traces, and logs emitted by a container based on its labels or environment variables.

If you are running the Agent as a binary on a host, configure your tag extractions with the [Agent](?tab=agent) tab instructions. If you are running the Agent as a container, configure your tag extraction with the [Containerized Agent](?tab=containerizedagent) tab instructions.

### Unified service tagging

As a best practice in containerized environments, Datadog recommends using unified service tagging when assigning tags. Unified service tagging ties Datadog telemetry together through the use of three standard tags: `env`, `service`, and `version`. To learn how to configure your environment with unified tagging, refer to the dedicated [unified service tagging][1] documentation.

## Extract labels as tags

Starting with Agent v6.0+, the Agent can collect labels for a given container and use them as tags to attach to all data emitted by this container.

{{< tabs >}}
{{% tab "Containerized Agent" %}}

To extract a given Docker label `<LABEL_NAME>` and transform it as a tag key `<TAG_KEY>` within Datadog, add the following environment variable to the Datadog Agent:

```shell
DD_DOCKER_LABELS_AS_TAGS='{"<LABEL_NAME>": "<TAG_KEY>"}'
```

For example, you could set up:

```shell
DD_DOCKER_LABELS_AS_TAGS='{"com.docker.compose.service":"service_name"}'
```

**Note**: `<LABEL_NAME>` is not case-sensitive. For example, if you have labels named `foo` and `FOO`, and you set `DD_DOCKER_LABELS_AS_TAGS='{"foo": "bar"}'`, both `foo` and `FOO` are mapped to `bar`.

{{% /tab %}}
{{% tab "Agent" %}}

To extract a given Docker label `<LABEL_NAME>` and transform it as a tag key `<TAG_KEY>` within Datadog, add the following configuration block in the [Agent `datadog.yaml` configuration file][1]:

```yaml
docker_labels_as_tags:
  <LABEL_NAME>: <TAG_KEY>
```

For example, you could set up:

```yaml
docker_labels_as_tags:
  com.docker.compose.service: service_name
```


[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

## Extract environment variables as tags

Datadog automatically collects common tags from [Docker, Kubernetes, ECS, Swarm, Mesos, Nomad, and Rancher][2]. To extract even more tags, use the following options:

| Environment Variable               | Description                                    |
|------------------------------------|------------------------------------------------|
| `DD_DOCKER_LABELS_AS_TAGS`         | Extract docker container labels                |
| `DD_DOCKER_ENV_AS_TAGS`            | Extract docker container environment variables |
| `DD_KUBERNETES_POD_LABELS_AS_TAGS` | Extract pod labels                             |
| `DD_CHECKS_TAG_CARDINALITY`        | Add tags to check metrics                      |
| `DD_DOGSTATSD_TAG_CARDINALITY`     | Add tags to custom metrics                     |

Starting with Agent v7.20+, a containerized Agent can Autodiscover tags from Docker labels. This process allows the Agent to associate custom tags to all data emitted by a container without modifying the Agent `datadog.yaml` file.

Tags should be added using the following format:

```yaml
com.datadoghq.ad.tags: '["<TAG_KEY_1>:<TAG_VALUE_1>", "<TAG_KEY_2>:<TAG_VALUE_2>"]'
```

With Agent v6.0+, the Agent can collect environment variables for a given container and use them as tags to attach to all data emitted by this container.

{{< tabs >}}
{{% tab "Containerized Agent" %}}

To extract a given Docker environment variable `<ENVVAR_NAME>` and transform it as a tag key `<TAG_KEY>` within Datadog, add the following environment variable to the Datadog Agent:

```shell
DD_DOCKER_ENV_AS_TAGS='{"<ENVVAR_NAME>": "<TAG_KEY>"}'
```

For example, you could set up:

```shell
DD_DOCKER_ENV_AS_TAGS='{"ENVIRONMENT":"env"}'
```

{{% /tab %}}
{{% tab "Agent" %}}

To extract a given Docker environment variable `<ENVVAR_NAME>` and transform it as a tag key `<TAG_KEY>` within Datadog, add the following configuration block in the [Agent `datadog.yaml` configuration file][1]:

```yaml
docker_env_as_tags:
  <ENVVAR_NAME>: <TAG_KEY>
```

For example, you could set up:

```yaml
docker_env_as_tags:
  ENVIRONMENT: env
```

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/unified_service_tagging
[2]: /agent/docker/?tab=standard#tagging
