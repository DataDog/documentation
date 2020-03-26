---
title: Docker Tag Extraction
kind: documentation
further_reading:
- link: "tagging/"
  tag: "Documentation"
  text: "Getting started with tags"
- link: "tagging/using_tags"
  tag: "Documentation"
  text: "Using tags with Datadog"
- link: "/agent/autodiscovery/management"
  tag: "Documentation"
  text: "Manage which Container to include in the Agent Autodiscovery"
---

The Datadog Agent can create and assign tags to all metrics, traces, and logs emitted by a container based on its labels or environment variables.

If running the Agent as a binary on a host, configure your tag extractions with the [Agent](?tab=agent) tab instructions. If running the Agent as a container configure your tag extraction with the  [Containerized Agent](?tab=containerizedagent) tab instructions.

## Extract Labels as Tags

Starting with Agent v6.0+, the Agent can collect labels for a given container and use them as tags to attach to all data emitted by this container.

{{< tabs >}}
{{% tab "Containerized Agent" %}}

To extract a given docker label `<LABEL_NAME>` and transform it as a tag key `<TAG_KEY>` within Datadog, add the following environment variable to the Datadog Agent:

```shell
DD_DOCKER_LABELS_AS_TAGS='{"<LABEL_NAME>": "<TAG_KEY>"}'
```

For example, you could set up:

```shell
DD_DOCKER_LABELS_AS_TAGS='{"com.docker.compose.service":"service_name"}'
```

{{% /tab %}}
{{% tab "Agent" %}}

To extract a given docker label `<LABEL_NAME>` and transform it as a tag key `<TAG_KEY>` within Datadog, add the following configuration block in the [Agent `datadog.yaml` configuration file][1]:

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

## Extract Environment Variables as Tags

Starting with Agent v6.0+, the Agent can collect environment variables for a given container and use them as tags to attach to all data emitted by this container.

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

[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
