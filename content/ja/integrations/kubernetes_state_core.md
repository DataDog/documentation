---
app_id: kubernetes-state-core
app_uuid: 6fbcfd6b-369d-4e69-8974-87b3fb5d4715
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: kubernetes_state.container.running
      metadata_path: metadata.csv
      prefix: kubernetes_state.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Kubernetes State Core
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- containers
- orchestration
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/kubernetes_state_core/README.md
display_on_public_website: true
draft: false
git_integration_title: kubernetes_state_core
integration_id: kubernetes-state-core
integration_title: Kubernetes State Core
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: kubernetes_state_core
public_title: Kubernetes State Core
short_description: Capture Pod scheduling events, track the status of your Kubelets,
  and more.
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Orchestration
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  configuration: README.md#Setup
  description: Capture Pod scheduling events, track the status of your Kubelets, and
    more.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Kubernetes State Core
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

Get metrics from Kubernetes service in real-time to:

- Visualize and monitor Kubernetes states.
- Be notified about Kubernetes failovers and events.

The Kubernetes State Metrics Core check leverages [kube-state-metrics version 2+][1] and includes major performance and tagging improvements compared to the legacy `kubernetes_state` check.

As opposed to the legacy check, with the Kubernetes State Metrics Core check, you no longer need to deploy `kube-state-metrics` in your cluster.

Kubernetes State Metrics Core provides a better alternative to the legacy `kubernetes_state` check as it offers more granular metrics and tags. See the [Major Changes](#migration-from-kubernetes_state-to-kubernetes_state_core) and [Data Collected](#data-collected) for more details.

## セットアップ

### インストール

The Kubernetes State Metrics Core check is included in the [Datadog Cluster Agent][2] image, so you don't need to install anything else on your Kubernetes servers.

### Requirements

- Datadog Cluster Agent v1.12+

### 構成

{{< tabs >}}
{{% tab "Helm" %}}

In your Helm `values.yaml`, add the following:

```yaml
datadog:
  # (...)
  kubeStateMetricsCore:
    enabled: true
```

{{% /tab %}}
{{% tab "Operator" %}}

To enable the `kubernetes_state_core` check, the setting `spec.features.kubeStateMetricsCore.enabled` must be set to `true` in the DatadogAgent resource:

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
  features:
    kubeStateMetricsCore:
      enabled: true
```

**Note**: Datadog Operator v0.7.0 or greater is required.

{{% /tab %}}
{{< /tabs >}}

## Migration from kubernetes_state to kubernetes_state_core

### Tags removal

In the original `kubernetes_state` check, several tags have been flagged as deprecated and replaced by new tags. To determine your migration path, check which tags are submitted with your metrics.

In the `kubernetes_state_core` check, only the non-deprecated tags are submitted. Before migrating from `kubernetes_state` to `kubernetes_state_core`, verify that only official tags are used in monitors and dashboards.

Here is the mapping between deprecated tags and the official tags that have replaced them:

| deprecated tag        | official tag                |
|-----------------------|-----------------------------|
| cluster_name          | kube_cluster_name           |
| container             | kube_container_name         |
| cronjob               | kube_cronjob                |
| daemonset             | kube_daemon_set             |
| deployment            | kube_deployment             |
| hpa                   | horizontalpodautoscaler     |
| image                 | image_name                  |
| job                   | kube_job                    |
| job_name              | kube_job                    |
| namespace             | kube_namespace              |
| phase                 | pod_phase                   |
| pod                   | pod_name                    |
| replicaset            | kube_replica_set            |
| replicationcontroller | kube_replication_controller |
| statefulset           | kube_stateful_set           |

### Backward incompatibility changes

The Kubernetes State Metrics Core check is not backward compatible, be sure to read the changes carefully before migrating from the legacy `kubernetes_state` check.

`kubernetes_state.node.by_condition`
: A new metric with node name granularity. The legacy metric `kubernetes_state.nodes.by_condition` is deprecated in favor of this one. **Note:** This metric is backported into the legacy check, where both metrics (it and the legacy metric it replaces) are available.

`kubernetes_state.persistentvolume.by_phase`
: A new metric with persistentvolume name granularity. It replaces `kubernetes_state.persistentvolumes.by_phase`.

`kubernetes_state.pod.status_phase`
: The metric is tagged with pod level tags, like `pod_name`.

`kubernetes_state.node.count`
: The metric is not tagged with `host` anymore. It aggregates the nodes count by `kernel_version` `os_image` `container_runtime_version` `kubelet_version`.

`kubernetes_state.container.waiting` and `kubernetes_state.container.status_report.count.waiting`
: These metrics no longer emit a 0 value if no pods are waiting. They only report non-zero values.

`kube_job`
: In `kubernetes_state`, the `kube_job` tag value is the `CronJob` name if the `Job` had `CronJob` as an owner, otherwise it is the `Job` name. In `kubernetes_state_core`, the `kube_job` tag value is always the `Job` name, and a new `kube_cronjob` tag key is added with the `CronJob` name as the tag value. When migrating to `kubernetes_state_core`, it's recommended to use the new tag or `kube_job:foo*`, where `foo` is the `CronJob` name, for query filters.

`kubernetes_state.job.succeeded`
: In `kubernetes_state`, the `kuberenetes.job.succeeded` was `count` type. In `kubernetes_state_core` it is `gauge` type.

### Node-level tag assignment

Host or node-level tags no longer appear on cluster-centric metrics. Only metrics relative to an actual node in the cluster, like `kubernetes_state.node.by_condition` or `kubernetes_state.container.restarts`, continue to inherit their respective host or node level tags. 

To add tags globally, use the `DD_TAGS` environment variable, or use the respective Helm or Operator configurations. Instance-only level tags can be specified by mounting a custom `kubernetes_state_core.yaml` into the Cluster Agent.

{{< tabs >}}
{{% tab "Helm" %}}
```yaml
datadog:
  kubeStateMetricsCore:
    enabled: true
  tags: 
    - "<TAG_KEY>:<TAG_VALUE>"
```
{{% /tab %}}
{{% tab "Operator" %}}
```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
    tags:
      - "<TAG_KEY>:<TAG_VALUE>"
  features:
    kubeStateMetricsCore:
      enabled: true
```
{{% /tab %}}
{{< /tabs >}}

Metrics like `kubernetes_state.container.memory_limit.total` or `kubernetes_state.node.count` are aggregate counts of groups within a cluster, and host or node-level tags are not added.

### Legacy check

{{< tabs >}}
{{% tab "Helm" %}}

Enabling `kubeStateMetricsCore` in your Helm `values.yaml` configures the Agent to ignore the auto configuration file for legacy `kubernetes_state` check. The goal is to avoid running both checks simultaneously.

If you still want to enable both checks simultaneously for the migration phase, disable the `ignoreLegacyKSMCheck` field in your `values.yaml`.

**Note**: `ignoreLegacyKSMCheck` makes the Agent only ignore the auto configuration for the legacy `kubernetes_state` check. Custom `kubernetes_state` configurations need to be removed manually.

The Kubernetes State Metrics Core check does not require deploying `kube-state-metrics` in your cluster anymore, you can disable deploying `kube-state-metrics` as part of the Datadog Helm Chart. To do this, add the following in your Helm `values.yaml`:

```yaml
datadog:
  # (...)
  kubeStateMetricsEnabled: false
```

{{% /tab %}}
{{< /tabs >}}

**Important Note:** The Kubernetes State Metrics Core check is an alternative to the legacy `kubernetes_state` check. Datadog recommends not enabling both checks simultaneously to guarantee consistent metrics.

## 収集データ

### メトリクス
{{< get-metrics-from-git "kubernetes_state_core" >}}


**Note:** You can configure [Datadog Standard labels][3] on your Kubernetes objects to get the `env` `service` `version` tags.

### イベント

The Kubernetes State Metrics Core check does not include any events.

### Default labels as tags

#### Default recommended Kubernetes and Helm labels 

|  Recommended Label        | Tag                |
|-----------------------|-----------------------------|
| `app.kubernetes.io/name`         | `kube_app_name`           |
| `app.kubernetes.io/instance`          | `kube_app_instance`           |
| `app.kubernetes.io/version`          | `kube_app_version`           |
| `app.kubernetes.io/component`          | `kube_app_component`           |
| `app.kubernetes.io/part-of`          | `kube_app_part_of`           |
| `app.kubernetes.io/managed-by`          | `kube_app_managed_by`           |
| `helm.sh/chart`          | `helm_chart`           |

#### Default recommended Kubernetes node labels

|  Recommended Label        | Tag                |
|-----------------------|-----------------------------|
| `topology.kubernetes.io/region`  | `kube_region`     |
| `topology.kubernetes.io/zone`    | `kube_zone`       |
| `failure-domain.beta.kubernetes.io/region`   | `kube_region`   |
| `failure-domain.beta.kubernetes.io/zone`     | `kube_zone`     |

#### Datadog labels (Unified Service Tagging)

|  Datadog Label        | Tag                |
|-----------------------|-----------------------------|
| `tags.datadoghq.com/env`          | `env`           |
| `tags.datadoghq.com/service`          | `service`           |
| `tags.datadoghq.com/version`          | `version`           |

### Service Checks

`kubernetes_state.cronjob.complete`
: Whether the last job of the cronjob is failed or not. Tags:`kube_cronjob` `kube_namespace` (`env` `service` `version` from standard labels).

`kubernetes_state.cronjob.on_schedule_check`
: Alert if the cronjob's next schedule is in the past. Tags:`kube_cronjob` `kube_namespace` (`env` `service` `version` from standard labels).

`kubernetes_state.job.complete`
: Whether the job is failed or not. Tags:`kube_job` or `kube_cronjob` `kube_namespace` (`env` `service` `version` from standard labels).

`kubernetes_state.node.ready`
: Whether the node is ready. Tags:`node` `condition` `status`.

`kubernetes_state.node.out_of_disk`
: Whether the node is out of disk. Tags:`node` `condition` `status`.

`kubernetes_state.node.disk_pressure`
: Whether the node is under disk pressure. Tags:`node` `condition` `status`.

`kubernetes_state.node.network_unavailable`
: Whether the node network is unavailable. Tags:`node` `condition` `status`.

`kubernetes_state.node.memory_pressure`
: Whether the node network is under memory pressure. Tags:`node` `condition` `status`.

### Validation

[Run the Cluster Agent's `status` subcommand][4] inside your Cluster Agent container and look for `kubernetes_state_core` under the Checks section.

## Troubleshooting

### Timeout errors

By default, the Kubernetes State Metrics Core check waits 10 seconds for a response from the Kubernetes API server. For large clusters, the request may time out, resulting in missing metrics.

You can avoid this by setting the environment variable `DD_KUBERNETES_APISERVER_CLIENT_TIMEOUT` to a higher value than the default 10 seconds.

{{< tabs >}}
{{% tab "Operator" %}}
Update your `datadog-agent.yaml` with the following configuration:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    clusterAgent:
      env:
        - name: DD_KUBERNETES_APISERVER_CLIENT_TIMEOUT
          value: <value_greater_than_10>
```

Then apply the new configuration:

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```
{{% /tab %}}
{{% tab "Helm" %}}
Update your `datadog-values.yaml` with the following configuration:

```yaml
clusterAgent:
  env:
    - name: DD_KUBERNETES_APISERVER_CLIENT_TIMEOUT
      value: <value_greater_than_10>
```

Then upgrade your Helm chart:

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```
{{% /tab %}}
{{< /tabs >}}

Need help? Contact [Datadog support][5].

## Further Reading
- [Our Journey Taking Kubernetes State Metrics to the Next Level][6]


[1]: https://kubernetes.io/blog/2021/04/13/kube-state-metrics-v-2-0/
[2]: /ja/agent/cluster_agent/
[3]: /ja/getting_started/tagging/unified_service_tagging/#configuration
[4]: /ja/agent/guide/agent-commands/#agent-status-and-information
[5]: /ja/help/
[6]: https://www.datadoghq.com/blog/engineering/our-journey-taking-kubernetes-state-metrics-to-the-next-level/