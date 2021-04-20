---
title: Container Discovery Management
kind: guide
aliases:
 - /agent/autodiscovery/management
 - /agent/kubernetes/management
further_reading:
- link: "/agent/kubernetes/integrations/"
  tag: "Documentation"
  text: "Create and load an Autodiscovery Integration Template"
---

Datadog Agent auto-discovers all containers available by default. To restrict its discovery perimeter and limit data collection to a subset of containers only, include or exclude them through a dedicated configuration.

**Note**: The `kubernetes.containers.running`, `kubernetes.pods.running`, `docker.containers.running`, `.stopped`, `.running.total`, and `.stopped.total` metrics are not affected by these settings and always count all containers.

If running the Agent as a binary on a host, configure your Autodiscovery perimeter with the [Agent](?tab=agent) tab instructions. If running the Agent as a container, configure your Autodiscovery perimeter with the [Containerized Agent](?tab=containerizedagent) tab instructions.

## Exclude containers

Exclude containers from the Agent Autodiscovery perimeter with an exclude rule based on their `name`, `image`, or `kube_namespace` to collect **NO DATA** from these containers. If a container matches an exclude rule, it won't be included unless it first matches an include rule.

**Note**: Exclude rules support regexes, which are defined as a list of comma-separated strings.

**Note**: To exclude every container, you can use `name:.*`, `image:.*`, or `kube_namespace:.*`. Note that configuring `.*` without a `name:`, `image:`, or `kube_namespace:` prefix will not work.

{{< tabs >}}
{{% tab "Containerized Agent" %}}

In **Agent v7.20+**, to remove a given Docker container with the **image** `<IMAGE_NAME>` from Autodiscovery, and thus exclude the **logs and metrics**, add the following environment variable to the Datadog Agent:

```shell
DD_CONTAINER_EXCLUDE = "image:<IMAGE_NAME>"
```

As an example, the following configuration instructs the Agent to ignore some containers from Docker Cloud:

```shell
DD_CONTAINER_EXCLUDE = "image:dockercloud/network-daemon image:dockercloud/cleanup image:dockercloud/logrotate image:dockercloud/events image:dockercloud/ntpd"
```

You can use a regex to ignore them all: `DD_CONTAINER_EXCLUDE = "image:dockercloud/.*"`

In **Agent <= v7.19+**, to remove a given Docker container with the **image** `<IMAGE_NAME>` from Autodiscovery, add the following environment variable to the Datadog Agent:

```shell
DD_AC_EXCLUDE = "image:<IMAGE_NAME>"
```

As before, the following configuration instructs the Agent to ignore some containers from Docker Cloud:

```shell
DD_AC_EXCLUDE = "image:dockercloud/network-daemon image:dockercloud/cleanup image:dockercloud/logrotate image:dockercloud/events image:dockercloud/ntpd"
```

Note that `DD_AC_EXCLUDE` is **deprecated for Agent >= v7.20+**. 

In **Agent v7.20+**, to remove a given Docker container with the **name** `<NAME>` from Autodiscovery, and thus exclude the **logs and metrics**, add the following environment variable to the Datadog Agent:

```shell
DD_CONTAINER_EXCLUDE = "name:<NAME>"
```

For instance, use this excluding rule to exclude the Agent container itself:

```shell
DD_CONTAINER_EXCLUDE = "name:dd-agent"
```

In **Agent <= v7.19+**, to remove a given Docker container with the **name** `<IMAGE_NAME>` from Autodiscovery, add the following environment variable to the Datadog Agent:

```shell
DD_AC_EXCLUDE = "name:<NAME>"
```

For instance, use this excluding rule to exclude the Agent container itself:

```shell
DD_AC_EXCLUDE = "name:dd-agent"
```

In **Agent v7.20+**, you can also use exclusion rules to exclude **only logs or only metrics**. For instance, to exclude logs from a container with the image `<IMAGE_NAME>`, add the following environment variable to the Datadog Agent:

```shell
DD_CONTAINER_EXCLUDE_LOGS = "image:<IMAGE_NAME>"
```

Similarly, to exclude metrics:

```shell
DD_CONTAINER_EXCLUDE_METRICS = "image:<IMAGE_NAME>"
```

On Kubernetes, to remove all containers of pods inside namespace `<NAMESPACE>` from Autodiscovery, add the following environment variable to the Datadog Agent:

```shell
DD_CONTAINER_EXCLUDE = "kube_namespace:<NAMESPACE>"
```

{{% /tab %}}
{{% tab "Agent" %}}

To remove a given Docker container with the image `<IMAGE_NAME>` from Autodiscovery, add the following configuration block in the [Agent `datadog.yaml` configuration file][1]:

```yaml
container_exclude: [image:<IMAGE_NAME>]
```

To remove a given Docker container with the name `<NAME>` from Autodiscovery, add the following configuration block in the [Agent `datadog.yaml` configuration file][1]:

```yaml
container_exclude: [name:<NAME>]
```

In **Agent v7.20+**, you can also use exclusion rules to exclude only logs or only metrics. For instance, to exclude logs from a container with the image `<IMAGE_NAME>`, add the following environment variable to the Datadog Agent:

```shell
container_exclude_logs: [image:<IMAGE_NAME>]
```

Similarly, to exclude metrics with **Agent v7.20+**:

```shell
container_exclude_metrics: [image:<IMAGE_NAME>]
```

On Kubernetes, to remove all containers of pods inside namespace `<NAMESPACE>` from Autodiscovery, add the following configuration block in the [Agent `datadog.yaml` configuration file][1]:

```yaml
container_exclude: [kube_namespace:<NAMESPACE>]
```

[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

**Note**: If you are using Kubernetes, the container `<NAME>` is the one in your manifest `.spec.containers[0].name`.

## Include containers

Include containers from the Agent Autodiscovery perimeter with an include rule based on their `name` or `image` to collect data **ONLY** from those containers. If a container matches an include rule, it's always included in the Autodiscovery perimeter.

**Note**: Include rules support regexes, and are defined as a list of comma-separated strings.

{{< tabs >}}
{{% tab "Containerized Agent" %}}

In **Agent v7.20+**, to include a given Docker container with the **image** `<IMAGE_NAME>` from Autodiscovery, add the following environment variable to the Datadog Agent:

```shell
DD_CONTAINER_INCLUDE = "image:<IMAGE_NAME>"
```

In **Agent <= v7.19+**, to include a given Docker container with the **image** `<IMAGE_NAME>` from Autodiscovery, add the following environment variable to the Datadog Agent:

```shell
DD_AC_INCLUDE = "image:<IMAGE_NAME>"
```

Note that `DD_AC_INCLUDE` is **deprecated for Agent >= v7.20+**.

In **Agent v7.20+**, to include a given Docker container with the **name** `<NAME>` from Autodiscovery, add the following environment variable to the Datadog Agent:

```shell
DD_CONTAINER_INCLUDE = "name:<NAME>"
```

For example, if you only want to monitor `ubuntu` or `debian` images, and exclude the rest, specify:

```shell
DD_CONTAINER_EXCLUDE = "image:.*"
DD_CONTAINER_INCLUDE = "image:ubuntu image:debian"
```

In **Agent <= v7.19+**, to include a given Docker container with the **name** `<IMAGE_NAME>` from Autodiscovery, add the following environment variable to the Datadog Agent:

```shell
DD_AC_INCLUDE = "name:<NAME>"
```

As before, if you only want to monitor `ubuntu` or `debian` images, and exclude the rest, specify:

```shell
DD_AC_EXCLUDE = "image:.*"
DD_AC_INCLUDE = "image:ubuntu image:debian"
```

In **Agent v7.20+**, you can also use inclusion rules to include only logs or only metrics. For instance, to include logs from a container with the image `<IMAGE_NAME>`, add the following environment variable to the Datadog Agent:

```shell
DD_CONTAINER_INCLUDE_LOGS = "image:<IMAGE_NAME>"
```

Similarly, to include metrics:

```shell
DD_CONTAINER_INCLUDE_METRICS = "image:<IMAGE_NAME>"
```

On Kubernetes, to include all containers of pods inside namespace <NAMESPACE> from Autodiscovery, add the following environment variable to the Datadog Agent:

```shell
DD_CONTAINER_INCLUDE = "kube_namespace:<NAMESPACE>"
```

{{% /tab %}}
{{% tab "Agent" %}}

To include a given Docker container with the image `<IMAGE_NAME>` from Autodiscovery, add the following configuration block in the [Agent `datadog.yaml` configuration file][1]:

```yaml
container_include: [image:<IMAGE_NAME>]
```

To include a given Docker container with the name `<NAME>` from Autodiscovery, add the following configuration block in the [Agent `datadog.yaml` configuration file][1]:

```yaml
container_include: [name:<NAME>]
```

In **Agent v7.20+**, you can also use inclusion rules to include only logs or only metrics. For instance, to include logs from a container with the image `<IMAGE_NAME>`, add the following environment variable to the Datadog Agent:

```shell
container_include_logs: [image:<IMAGE_NAME>]
```

Similarly, to include metrics:

```shell
container_include_metrics: [image:<IMAGE_NAME>]
```

On Kubernetes, to include all containers of pods inside namespace <NAMESPACE> from Autodiscovery, add the following configuration block in the [Agent `datadog.yaml` configuration file][1]:

```yaml
container_include: [kube_namespace:<NAMESPACE>]
```

[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

**Note**: If you are using Kubernetes, the container `<NAME>` is the one in your manifest `.spec.containers[0].name`.

## Inclusion and exclusion behavior

Inclusion always takes precedence, whether the rule is global or only applies to metrics or logs.

You cannot mix cross-category include/exclude rules. For instance, if you want to include a container with the image name `<IMAGE_NAME_1>` and exclude only metrics from a container with the image name `<IMAGE_NAME_2>`, use the following:

{{< tabs >}}
{{% tab "Containerized Agent" %}}
```shell
DD_CONTAINER_INCLUDE_METRICS = "image:<IMAGE_NAME_1>"
DD_CONTAINER_INCLUDE_LOGS = "image:<IMAGE_NAME_1>"
DD_CONTAINER_EXCLUDE_METRICS = "image:<IMAGE_NAME_2>"
```

That is, setting `DD_CONTAINER_INCLUDE = "image:<IMAGE_NAME_1>"` is not sufficient.

{{% /tab %}}
{{% tab "Agent" %}}
```yaml
container_include_metrics: [image:<IMAGE_NAME_1>]
container_include_logs: [image:<IMAGE_NAME_1>]
container_exclude_metrics: [image:<IMAGE_NAME_2>]
```

That is, setting `container_include: [image:<IMAGE_NAME_1>]` is not sufficient.
{{% /tab %}}
{{< /tabs >}}

There is no interaction between the global lists and the selective (logs and metrics) lists. In other words, you cannot exclude a container globally and then include it with `container_include_logs` and `container_include_metrics`.

## Pause containers

Datadog Agent excludes Kubernetes and OpenShift pause containers by default. They are still counted in the container count like excluded containers.

To disable this behavior and include pause containers in the Autodiscovery perimeter, set the parameter `exclude_pause_container` to `false` in the [Agent `datadog.yaml` configuration file][1] or through the Agent environment variable `DD_EXCLUDE_PAUSE_CONTAINER="false"`

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
