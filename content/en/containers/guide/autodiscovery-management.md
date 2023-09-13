---
title: Container Discovery Management
kind: guide
aliases:
 - /agent/autodiscovery/management
 - /agent/kubernetes/management
 - /agent/guide/autodiscovery-management
further_reading:
- link: "/agent/kubernetes/integrations/"
  tag: "Documentation"
  text: "Create and load an Autodiscovery Integration Template"
---

By default, the Datadog Agent automatically discovers all containers available. To restrict its discovery perimeter and limit data collection to a subset of containers only, include or exclude them through a dedicated configuration.

**Note**: The `kubernetes.containers.running`, `kubernetes.pods.running`, `docker.containers.running`, `.stopped`, `.running.total`, and `.stopped.total` metrics are not affected by these settings and always count all containers.

## Environment variables
If you are running the Agent as a container, use the [Containerized Agent](?tab=containerizedagent) tab instructions. If you are running the Agent as a binary on a host, use the [Host Agent](?tab=hostagent) tab instructions. 

{{< tabs >}}
{{% tab "Containerized Agent" %}}

In **Agent v7.20+**, use the following environment variables to exclude containers by image, name, or Kubernetes namespace. Logs and metrics are not collected from excluded containers.

| Env variable | Description |
| ------------ | ----------- |
| `DD_CONTAINER_EXCLUDE` | Blocklist of containers to exclude. |
| `DD_CONTAINER_EXCLUDE_METRICS` | Blocklist of containers whose metrics are excluded. |
| `DD_CONTAINER_EXCLUDE_LOGS` | Blocklist of containers whose logs are excluded. |
| `DD_CONTAINER_INCLUDE` | Allowlist of containers to include. |
| `DD_CONTAINER_INCLUDE_METRICS` | Allowlist of containers whose metrics are included. |
| `DD_CONTAINER_INCLUDE_LOGS` | Allowlist of containers whose logs are included. |

In **Agent <=v7.19**, use the environment variables `DD_AC_INCLUDE` and `DD_AC_EXCLUDE` to include or exclude a container by image or name. These environment variables are deprecated in later Agent versions.

{{% /tab %}}
{{% tab "Host Agent" %}}

| Env variable | Description |
| ------------ | ----------- |
| `container_exclude` | Blocklist of containers to exclude. |
| `container_exclude_metrics` | Blocklist of containers whose metrics are excluded. Supported in Agent v7.20+. |
| `container_exclude_logs` | Blocklist of containers whose logs are excluded. Supported in Agent v7.20+. |
| `container_include` | Blocklist of containers to include. |
| `container_include_metrics` | Blocklist of containers whose metrics are included. Supported in Agent v7.20+. |
| `container_include_logs` | Blocklist of containers whose logs are included. Supported in Agent v7.20+. |

{{% /tab %}}
{{< /tabs >}}

## Usage

### Define values

{{< tabs >}}
{{% tab "Containerized Agent" %}}
Each inclusion or exclusion is defined as a list of space-separated regex strings. You can include or exclude containers based on their name (`name`), image name (`image`), or Kubernetes namespace (`kube_namespace`).

#### Examples
To exclude the container with the name `dd-agent`:

```
DD_CONTAINER_EXCLUDE = "name:^dd-agent$"
```

To exclude two containers with the image names `dockercloud/network-daemon` and `dockercloud/logrotate`:

```
DD_CONTAINER_EXCLUDE = "image:^dockercloud/network-daemon$ image:^dockercloud/logrotate$"
```

To exclude every container:

```
DD_CONTAINER_EXCLUDE = "name:.*"
```

Alternatively, you can also use `image:.*` or `kube_namespace:.*`. Configuring `.*` without a `name:`, `image:`, or `kube_namespace:` prefix does not work.
{{% /tab %}}
{{% tab "Host Agent" %}}
Each inclusion or exclusion is defined as a list of space-separated regex strings. You can include or exclude containers based on their name (`name`), image name (`image`), or Kubernetes namespace (`kube_namespace`).

#### Examples
To exclude the container with the name `dd-agent`:

```
container_exclude: [name:^dd-agent$]
```

To exclude two containers with the image names `dockercloud/network-daemon` and `dockercloud/logrotate`:

```
container_exclude: [image:^dockercloud/network-daemon$ image:^dockercloud/logrotate$]
```

To exclude every container:

```
container_exclude: [name:.*]
```

Alternatively, you can also use `image:.*` or `kube_namespace:.*`. Configuring `.*` without a `name:`, `image:`, or `kube_namespace:` prefix does not work.
{{% /tab %}}
{{< /tabs >}}
### Inclusion and exclusion behavior

{{< tabs >}}
{{% tab "Containerized Agent" %}}
Inclusion takes precedence over exclusion. For example, to only monitor `ubuntu` or `debian` images, first exclude all other images and then specify which images to include:

```
DD_CONTAINER_EXCLUDE = "image:.*"
DD_CONTAINER_INCLUDE = "image:ubuntu image:debian"
```

You cannot mix cross-category inclusion/exclusion rules. For instance, if you want to include a container with the image name `foo` and exclude only metrics from a container with the image name `bar`, the following is **not sufficient**:

```
DD_CONTAINER_EXCLUDE_METRICS = "image:^bar$"
DD_CONTAINER_INCLUDE = "image:^foo$"
```

Instead, use:

```
DD_CONTAINER_EXCLUDE_METRICS = "image:^bar$"
DD_CONTAINER_INCLUDE_METRICS = "image:^foo$"
DD_CONTAINER_INCLUDE_LOGS = "image:^foo$"
```

There is no interaction between the global lists and the selective (logs and metrics) lists. In other words, you cannot exclude a container globally (`DD_CONTAINER_EXCLUDE`) and then include it with `DD_CONTAINER_INCLUDE_LOGS` and `DD_CONTAINER_INCLUDE_METRICS`.

{{% /tab %}}
{{% tab "Host Agent" %}}
Inclusion takes precedence over exclusion. For example, to only monitor `ubuntu` or `debian` images, first exclude all other images and then specify which images to include:

```
container_exclude: [image:.*]
container_include: [image:ubuntu image:debian]
```

You cannot mix cross-category inclusion/exclusion rules. For instance, if you want to include a container with the image name `foo` and exclude only metrics from a container with the image name `bar`, the following is **not sufficient**:

```
container_exclude_metrics: [image:^bar$]
container_include: [image:^foo$]
```

Instead, use:

```
container_exclude_metrics: [image:^bar$]
container_include_metrics: [image:^foo$]
container_include_logs: [image:^foo$]
```

There is no interaction between the global lists and the selective (logs and metrics) lists. In other words, you cannot exclude a container globally (`container_exclude`) and then include it with `container_include_logs` and `container_include_metrics`.
{{% /tab %}}
{{< /tabs >}}

### Setting environment variables
{{< tabs >}}
{{% tab "Datadog Operator" %}}

In Datadog Operator, set these environment variables under `spec.override.nodeAgent.env`.

##### Example

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
  override:
    nodeAgent:
    env:
      - name: DD_CONTAINER_EXCLUDE
        value: "image:<IMAGE_NAME>"
```
{{% /tab %}}
{{% tab "Helm" %}}

In your Helm chart, supply a space-separated string to `datadog.containerExclude`, `datadog.containerInclude`, `datadog.containerExcludeLogs`, `datadog.containerIncludeLogs`, `datadog.containerExcludeMetrics`, or `datadog.containerIncludeMetrics`. You can also set `excludePauseContainer` to `true` or `false`.

##### Example

```yaml
datadog:
  containerExclude: "image:<IMAGE_NAME_1> image:<IMAGE_NAME_2>"
  containerInclude: "image:<IMAGE_NAME_3> image:<IMAGE_NAME_4>"
  excludePauseContainer: true
```

{{% /tab %}}
{{% tab "Host Agent" %}}
Set environment variables in the [Agent `datadog.yaml` configuration file][1].

[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

## Pause containers

Datadog Agent excludes Kubernetes and OpenShift pause containers by default. They are still counted in the container count like excluded containers.

To disable this behavior and include pause containers in the Autodiscovery perimeter:

{{< tabs >}}
{{% tab "Containerized Agent" %}}
Set `DD_EXCLUDE_PAUSE_CONTAINER` to `false`.
{{% /tab %}}
{{% tab "Host Agent" %}}
Set `exclude_pause_container` to `false`.
{{% /tab %}}
{{< /tabs >}}
## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
