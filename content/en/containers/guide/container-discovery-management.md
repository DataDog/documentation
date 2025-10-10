---
title: Container Discovery Management
description: Control which containers the Datadog Agent monitors by configuring discovery rules and inclusion/exclusion patterns
aliases:
 - /agent/autodiscovery/management
 - /agent/kubernetes/management
 - /agent/guide/autodiscovery-management
 - /containers/guide/autodiscovery-management
further_reading:
- link: "/containers/kubernetes/integrations/"
  tag: "Documentation"
  text: "Configure integrations with Autodiscovery on Kubernetes"
- link: "/containers/docker/integrations/"
  tag: "Documentation"
  text: "Configure integrations with Autodiscovery on Docker"
---

By default, the Datadog Agent automatically discovers all containers available. This document describes how to restrict the Datadog Agent's discovery perimeter and limit data collection to a subset of containers.

## Container discovery patterns

In a containerized environment, you should deploy the Datadog Agent once per host. Each Datadog Agent deployed automatically discovers and monitors all containers on its respective host.

You can adjust the discovery rules for the Agent to restrict metric and log collection. Any containers restricted from metric collection are also restricted for any [Autodiscovery][2]-based Agent integrations. 

When the logs [`containerCollectAll` option][1] is enabled, the Agent collects logs from all discovered containers. These filtering options do not affect log collection if `containerCollectAll` is not enabled.

You can set exceptions in two ways:

- Provide environment variables to the Datadog Agent container as an allowlist/blocklist of containers. Recommended if you have a list of container names, images, or namespaces to exclude for the entire cluster.
- Add annotations to your Kubernetes pods to block individual pods or containers. Recommended if you need fine-tuned exclusions.

**Note**: The `kubernetes.containers.running`, `kubernetes.pods.running`, `docker.containers.running`, `.stopped`, `.running.total`, and `.stopped.total` metrics are not affected by these settings and always count all containers.

## Agent configuration

Use the environment variables in the table below to configure container filtering. Each inclusion or exclusion is defined as a list of space-separated regex strings. You can include or exclude containers based on their:
- container name (`name`)
- container image name (`image`)
- Kubernetes namespace (`kube_namespace`)

<div class="alert alert-danger">

The `name` parameter only applies to container names, not pod names, even if the container runs in a Kubernetes pod.

</div>

### Environment variables
In **Agent v7.20+**, use the following environment variables to exclude containers by image name, container name, or Kubernetes namespace. Logs and metrics are not collected from excluded containers.

| Environment variable           | Description                                         |
| ------------------------------ | --------------------------------------------------- |
| `DD_CONTAINER_EXCLUDE`         | Blocklist of containers to exclude.                 |
| `DD_CONTAINER_EXCLUDE_METRICS` | Blocklist of containers whose metrics are excluded. |
| `DD_CONTAINER_EXCLUDE_LOGS`    | Blocklist of containers whose logs are excluded.    |
| `DD_CONTAINER_INCLUDE`         | Allowlist of containers to include.                 |
| `DD_CONTAINER_INCLUDE_METRICS` | Allowlist of containers whose metrics are included. |
| `DD_CONTAINER_INCLUDE_LOGS`    | Allowlist of containers whose logs are included.    |

In **Agent <=v7.19**, use the environment variables `DD_AC_INCLUDE` and `DD_AC_EXCLUDE` to include or exclude a container by image or name. These environment variables are deprecated in later Agent versions.

<div class="alert alert-info">

Image name filters (`image`) are matched across full image name, including the registry and the image tag or digest (for example, `dockerhub.io/nginx:1.13.1`).

</div>

#### Examples
To exclude the container with the name `dd-agent`:

```
DD_CONTAINER_EXCLUDE = "name:^dd-agent$"
```

To exclude containers using the `dockercloud/network-daemon` image, including all tags and digests:

```
DD_CONTAINER_EXCLUDE = "image:^dockercloud/network-daemon(@sha256)?:.*
```

To exclude containers using the image `dockercloud/network-daemon:1.13.0`:

```
DD_CONTAINER_EXCLUDE = "image:^dockercloud/network-daemon:1.13.0$"
```

To exclude any container whose image contains the word `agent`:

```
DD_CONTAINER_EXCLUDE = "image:agent"
```

To exclude any container using the image `foo` regardless of the registry:

```
DD_CONTAINER_EXCLUDE = "image:^.*/foo(@sha256)?:.*"
```

To exclude every container:

```
DD_CONTAINER_EXCLUDE = "name:.*"
```

Alternatively, you can also use `image:.*` or `kube_namespace:.*`. Configuring `.*` without a `name:`, `image:`, or `kube_namespace:` prefix does not work.

### Inclusion and exclusion behavior

Generally, inclusion takes precedence over exclusion. For example, to only monitor `ubuntu` or `debian` images, first exclude all other images and then specify which images to include:

```
DD_CONTAINER_EXCLUDE = "image:.*"
DD_CONTAINER_INCLUDE = "image:^docker.io/library/ubuntu(@sha256)?:.* image:^docker.io/library/debian(@sha256)?:.*"
```

The only exception to this rule is pod exclusion annotations like `ad.datadoghq.com/exclude`. When an application has an exclusion annotation set to `true`, this takes precedence, and the container is excluded from being autodiscovered for monitoring. For example, having a condition that includes every container like `DD_CONTAINER_INCLUDE = "image:.*"` does not guarantee a container is included if it has an exclusion annotation set on it. See [Container Discovery Management - Pod exclude configuration](#pod-exclude-configuration) for more information.

You cannot mix cross-category inclusion/exclusion rules. For instance, if you want to include a container with the image name `foo` and exclude only metrics from a container with the image name `bar`, the following is **not sufficient**:

```
DD_CONTAINER_EXCLUDE_METRICS = "image:^docker.io/library/bar(@sha256)?:.*"
DD_CONTAINER_INCLUDE = "image:^docker.io/library/foo(@sha256)?:.*"
```

Instead, use:

```
DD_CONTAINER_EXCLUDE_METRICS = "image:^docker.io/library/bar(@sha256)?:.*"
DD_CONTAINER_INCLUDE_METRICS = "image:^docker.io/library/foo(@sha256)?:.*"
DD_CONTAINER_INCLUDE_LOGS = "image:^docker.io/library/foo(@sha256)?:.*"
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

| Annotation                                          | Description                                                                      |
| --------------------------------------------------- | -------------------------------------------------------------------------------- |
| `ad.datadoghq.com/exclude`                          | Excludes the entire pod                                                          |
| `ad.datadoghq.com/logs_exclude`                     | Excludes log collection from the entire pod                                      |
| `ad.datadoghq.com/metrics_exclude`                  | Excludes metric collection from the entire pod                                   |
| `ad.datadoghq.com/<CONTAINER_NAME>.exclude`         | Excludes the container with `<CONTAINER_NAME>` in the pod                        |
| `ad.datadoghq.com/<CONTAINER_NAME>.logs_exclude`    | Excludes log collection from the container with `<CONTAINER_NAME>` in the pod    |
| `ad.datadoghq.com/<CONTAINER_NAME>.metrics_exclude` | Excludes metric collection from the container with `<CONTAINER_NAME>` in the pod |

The `ad.datadoghq.com/exclude` annotation set on the application pod takes the highest priority. This means that even if a container matches inclusion through `DD_CONTAINER_INCLUDE`, the Agent still ignores monitoring for that container. The same applies for the respective filtering configurations specific for metrics and logs.

When applying annotation-based exclusions, the Agent checks for all relevant exclusion annotations on the container. For example, when configuring logs for an NGINX container, the Agent will look for `ad.datadoghq.com/exclude`, `ad.datadoghq.com/logs_exclude`, `ad.datadoghq.com/nginx.exclude`, or `ad.datadoghq.com/nginx.logs_exclude` annotations to be `true` on the pod. The same applies for metrics.

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

### Tolerate unready pods

By default, `unready` pods are ignored when the Datadog Agent schedules checks. Therefore, metrics, service checks, and logs are not collected from these pods. To override this behavior, set the annotation `ad.datadoghq.com/tolerate-unready` to `"true"`. For example:

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/tolerate-unready: "true"
  ...
```

## Security configuration

In **Agent v7.70+**, you can restrict security monitoring for specific containers, so you only get billed for the containers you want to have monitored. This functionality is not supported for the Datadog Operator.

{{< tabs >}}
{{% tab "Helm" %}}
| Feature                               | Include container                                   | Exclude container                                   |
|---------------------------------------|-----------------------------------------------------|-----------------------------------------------------|
| [Cloud Security Misconfigurations][1] | `datadog.securityAgent.compliance.containerInclude` | `datadog.securityAgent.compliance.containerExclude` |
| [Cloud Security Vulnerabilities][2]   | `datadog.sbom.containerImage.containerInclude`      | `datadog.sbom.containerImage.containerExclude`      |
| [Workload Protection][3]              | `datadog.securityAgent.runtime.containerInclude`    | `datadog.securityAgent.runtime.containerExclude`    |

[1]: /security/cloud_security_management/misconfigurations/
[2]: /security/cloud_security_management/vulnerabilities
[3]: /security/workload_protection/
{{% /tab %}}
{{% tab "Config file" %}}
For [Cloud Security Vulnerabilities][1], you can use the following format in your config file to include or exclude containers:
```
---
sbom:
  container_image:
    container_include: ...
    container_exclude: ...
```
[1]: /security/cloud_security_management/vulnerabilities
{{% /tab %}}
{{% tab "Containerized Agent" %}}
In environments where you are not using Helm or the Operator, the following environment variables can be passed to the Agent container at startup.

| Feature                               | Include container                              | Exclude container                              |
|---------------------------------------|------------------------------------------------|------------------------------------------------|
| [Cloud Security Misconfigurations][1] | `DD_COMPLIANCE_CONFIG_CONTAINER_INCLUDE`       | `DD_COMPLIANCE_CONFIG_CONTAINER_EXCLUDE`       |
| [Cloud Security Vulnerabilities][2]   | `DD_SBOM_CONTAINER_IMAGE_CONTAINER_INCLUDE`    | `DD_SBOM_CONTAINER_IMAGE_CONTAINER_EXCLUDE`    |
| [Workload Protection][3]              | `DD_RUNTIME_SECURITY_CONFIG_CONTAINER_INCLUDE` | `DD_RUNTIME_SECURITY_CONFIG_CONTAINER_EXCLUDE` |

[1]: /security/cloud_security_management/misconfigurations/
[2]: /security/cloud_security_management/vulnerabilities
[3]: /security/workload_protection/
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /containers/kubernetes/log/?tab=helm#log-collection
[2]: /getting_started/containers/autodiscovery