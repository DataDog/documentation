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

## Autodiscovery patterns

The Datadog Agent should be deployed once per host within containerized environments. This is typically done with a DaemonSet in Kubernetes (managed by Helm or Operator) or by ECS Daemon Services. Each Datadog Agent deployed automatically discovers and monitors all containers on its respective host.

You can adjust the discovery rules for the Agent to restrict metric and log collection. Any containers restricted from metric collection are also restricted for any Autodiscovery based Agent Integrations. When the [log "Container Collect All" feature][1] is enabled, all discovered containers have their logs collected, unless otherwise blocked by the rules described below.

These restrictions can be set by either:
- Providing environment variables to the Datadog Agent container as an allowlist/blocklist of containers.
- Adding annotations to your Kubernetes pods to allow/block individual containers.

The first option works well as a list of container names, images, or Kubernetes namespaces to exclude for the entire cluster. The second option works well for more fine tuned exclusions in Kubernetes.

**Note**: The `kubernetes.containers.running`, `kubernetes.pods.running`, `docker.containers.running`, `.stopped`, `.running.total`, and `.stopped.total` metrics are not affected by these settings and always count all containers.

## Agent configuration

### Environment variables
In **Agent v7.20+**, use the following environment variables to exclude containers by image name, container name, or Kubernetes namespace. Logs and metrics are not collected from excluded containers.

| Environment variable | Description |
| ------------ | ----------- |
| `DD_CONTAINER_EXCLUDE` | Blocklist of containers to exclude. |
| `DD_CONTAINER_EXCLUDE_METRICS` | Blocklist of containers whose metrics are excluded. |
| `DD_CONTAINER_EXCLUDE_LOGS` | Blocklist of containers whose logs are excluded. |
| `DD_CONTAINER_INCLUDE` | Allowlist of containers to include. |
| `DD_CONTAINER_INCLUDE_METRICS` | Allowlist of containers whose metrics are included. |
| `DD_CONTAINER_INCLUDE_LOGS` | Allowlist of containers whose logs are included. |

In **Agent <=v7.19**, use the environment variables `DD_AC_INCLUDE` and `DD_AC_EXCLUDE` to include or exclude a container by image or name. These environment variables are deprecated in later Agent versions.

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

### Inclusion and exclusion behavior

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

In your Helm chart, supply a space-separated string to `datadog.containerExclude`, `datadog.containerInclude`, `datadog.containerExcludeLogs`, `datadog.containerIncludeLogs`, `datadog.containerExcludeMetrics`, or `datadog.containerIncludeMetrics`.

##### Example

```yaml
datadog:
  containerExclude: "image:<IMAGE_NAME_1> image:<IMAGE_NAME_2>"
  containerInclude: "image:<IMAGE_NAME_3> image:<IMAGE_NAME_4>"
```

{{% /tab %}}
{{% tab "Containerized Agent" %}}

In environments where you are not using Helm or the Operator, the following environment variables can be passed to the Agent container at startup.

##### Example Docker
```shell
docker run -e DD_CONTAINER_EXCLUDE=image:<IMAGE_NAME> ...
```

##### Example ECS
```json
"environment": [
  {
    "name": "DD_CONTAINER_EXCLUDE",
    "value": "image:<IMAGE_NAME>"
  },
  ...
]
```

{{% /tab %}}
{{< /tabs >}}

#### Pause containers

The Datadog Agent excludes Kubernetes and OpenShift pause containers by default. This prevents their metric collection and counting as billable containers. They are still counted in the container count metrics such as `kubernetes.containers.running` and `docker.containers.running`.

To disable this behavior and include monitoring the pause containers:

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
      - name: DD_EXCLUDE_PAUSE_CONTAINER
        value: "false"
```
{{% /tab %}}
{{% tab "Helm" %}}

In your Helm chart, set `datadog.excludePauseContainer` to `true` or `false`.

##### Example

```yaml
datadog:
  containerExclude: "image:<IMAGE_NAME_1> image:<IMAGE_NAME_2>"
  containerInclude: "image:<IMAGE_NAME_3> image:<IMAGE_NAME_4>"
  excludePauseContainer: false
```

{{% /tab %}}
{{% tab "Containerized Agent" %}}

In environments where you are not using Helm or the Operator, the following environment variables can be passed to the Agent container at startup.

Set `DD_EXCLUDE_PAUSE_CONTAINER` to `false`.
{{% /tab %}}
{{< /tabs >}}

## Pod exclude configuration

In **Agent v7.45+** you can set annotations on your Kubernetes pods to control Autodiscovery. Set the following annotations with the value `"true"` to add exclusion rules.

| Annotation | Description |
| ------------ | ----------- |
| `ad.datadoghq.com/exclude` | Excludes the entire pod |
| `ad.datadoghq.com/logs_exclude` | Excludes log collection from the entire pod |
| `ad.datadoghq.com/metrics_exclude` | Excludes metric collection from the entire pod |
| `ad.datadoghq.com/<CONTAINER_NAME>.exclude` | Excludes the container with `<CONTAINER_NAME>` in the pod |
| `ad.datadoghq.com/<CONTAINER_NAME>.logs_exclude` | Excludes log collection from the container with `<CONTAINER_NAME>` in the pod |
| `ad.datadoghq.com/<CONTAINER_NAME>.metrics_exclude` | Excludes metric collection from the container with `<CONTAINER_NAME>` in the pod |

#### Exclude the entire pod:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: example
spec:
  template:
    metadata:
      annotations:
        ad.datadoghq.com/exclude: "true"
    spec:
      containers:
        #(...)
```

#### Exclude log collection from a container:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: example
spec:
  template:
    metadata:
      annotations:
        ad.datadoghq.com/helper.logs_exclude: "true"
    spec:
      containers:
        - name: app
          #(...)
        - name: helper
          #(...)
```


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /containers/kubernetes/log/?tab=helm#log-collection
