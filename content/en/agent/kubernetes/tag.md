---
title: Kubernetes Tag Extraction
kind: documentation
aliases:
- /agent/autodiscovery/tag/
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

The Agent can create and assign tags to all metrics, traces, and logs emitted by a Pod, based on its labels or annotations.

If you are running the Agent as a binary on a host, configure your tag extractions with the [Agent](?tab=agent) tab instructions. If you are running the Agent as a container in your Kubernetes cluster, configure your tag extraction with the [Containerized Agent](?tab=containerizedagent) tab instructions.

## Out of the box tags

The Agent can autodiscover and attach tags to all data emitted by the entire pods or an individual container within this pod. The list of tags attached automatically depends on the agent [cardinality configuration][1].

<div style="overflow-x: auto;">

  | Tag                           | Cardinality  | Source                                                                  | Requirement                                         |
  |-------------------------------|--------------|-------------------------------------------------------------------------|-----------------------------------------------------|
  | `container_id`                | High         | Pod status                                                              | N/A                                                 |
  | `display_container_name`      | High         | Pod status                                                              | N/A                                                 |
  | `pod_name`                    | Orchestrator | Pod metadata                                                            | N/A                                                 |
  | `oshift_deployment`           | Orchestrator | Pod annotation `openshift.io/deployment.name`                           | OpenShift environment and pod annotation must exist |
  | `kube_ownerref_name`          | Orchestrator | Pod ownerref                                                            | Pod must have an owner                              |
  | `kube_job`                    | Orchestrator | Pod ownerref                                                            | Pod must be attached to a job                       |
  | `kube_replica_set`            | Orchestrator | Pod ownerref                                                            | Pod must be attached to a replica set               |
  | `kube_service`                | Orchestrator | Kubernetes service discovery                                            | Pod is behind a Kubernetes service                  |
  | `kube_daemon_set`             | Low          | Pod ownerref                                                            | Pod must be attached to a DaemonSet                 |
  | `kube_container_name`         | Low          | Pod status                                                              | N/A                                                 |
  | `kube_namespace`              | Low          | Pod metadata                                                            | N/A                                                 |
  | `kube_app_name`               | Low          | Pod label `app.kubernetes.io/name`                                      | Pod label must exist                                |
  | `kube_app_instance`           | Low          | Pod label `app.kubernetes.io/instance`                                  | Pod label must exist                                |
  | `kube_app_version`            | Low          | Pod label `app.kubernetes.io/version`                                   | Pod label must exist                                |
  | `kube_app_component`          | Low          | Pod label `app.kubernetes.io/component`                                 | Pod label must exist                                |
  | `kube_app_part_of`            | Low          | Pod label `app.kubernetes.io/part-of`                                   | Pod label must exist                                |
  | `kube_app_managed_by`         | Low          | Pod label `app.kubernetes.io/managed-by`                                | Pod label must exist                                |
  | `env`                         | Low          | Pod label `tags.datadoghq.com/env` or container envvar `DD_ENV`         | [Unified service tagging][2] enabled                |
  | `version`                     | Low          | Pod label `tags.datadoghq.com/version` or container envvar `DD_VERSION` | [Unified service tagging][2] enabled                |
  | `service`                     | Low          | Pod label `tags.datadoghq.com/service` or container envvar `DD_SERVICE` | [Unified service tagging][2] enabled                |
  | `pod_phase`                   | Low          | Pod status                                                              | N/A                                                 |
  | `oshift_deployment_config`    | Low          | Pod annotation `openshift.io/deployment-config.name`                    | OpenShift environment and pod annotation must exist |
  | `kube_ownerref_kind`          | Low          | Pod ownerref                                                            | Pod must have an owner                              |
  | `kube_deployment`             | Low          | Pod ownerref                                                            | Pod must be attached to a deployment                |
  | `kube_replication_controller` | Low          | Pod ownerref                                                            | Pod must be attached to a replication controller    |
  | `kube_stateful_set`           | Low          | Pod ownerref                                                            | Pod must be attached to a statefulset               |
  | `persistentvolumeclaim`       | Low          | Pod spec                                                                | A PVC must be attached to the pod                   |
  | `kube_cronjob`                | Low          | Pod ownerref                                                            | Pod must be attached to a cronjob                   |
  | `image_name`                  | Low          | Pod spec                                                                | N/A                                                 |
  | `short_image`                 | Low          | Pod spec                                                                | N/A                                                 |
  | `image_tag`                   | Low          | Pod spec                                                                | N/A                                                 |

</div>

### Host tag

The Agent can attach Kubernetes environment information as "host tags".

<div style="overflow-x: auto;">

  | Tag                 | Cardinality | Source                                                 | Requirement                                                    |
  |---------------------|-------------|--------------------------------------------------------|----------------------------------------------------------------|
  | `kube_cluster_name` | Low         | `DD_CLUSTER_NAME` envvar or cloud provider integration | `DD_CLUSTER_NAME` envvar or cloud provider integration enabled |
  | `kube_node_role`    | Low         | Node label `node-role.kubernetes.io/<role>`            | Node label must exist                                          |

</div>

## Tag Autodiscovery

Starting with Agent v6.10+, the Agent can autodiscover tags from Pod annotations. It allows the Agent to associate tags to all data emitted by the entire pods or an individual container within this pod.

As a best practice in containerized environments, Datadog recommends using unified service tagging to help unify tags. Unified service tagging ties Datadog telemetry together through the use of three standard tags: `env`, `service`, and `version`. To learn how to configure your environment with unified tagging, refer to the dedicated [unified service tagging][2] documentation.

To apply a `<TAG_KEY>:<TAG_VALUE>` tag to all data emitted by a given pod and collected by the Agent use the following annotation on your pod:

```yaml
annotations:
  ad.datadoghq.com/tags: '{"<TAG_KEY>": "<TAG_VALUE>","<TAG_KEY_1>": "<TAG_VALUE_1>"}'
```

If you want to apply a `<TAG_KEY>:<TAG_VALUE>` tag to an individual container `<CONTAINER_IDENTIFIER>` within a pod, use the following annotation on your pod:

```yaml
annotations:
  ad.datadoghq.com/<CONTAINER_IDENTIFIER>.tags: '{"<TAG_KEY>": "<TAG_VALUE>","<TAG_KEY_1>": "<TAG_VALUE_1>"}'
```

Starting with Agent v7.17+, the Agent can Autodiscover tags from Docker labels. This process allows the Agent to associate custom tags to all data emitted by a container, without [modifying the Agent `datadog.yaml` file][3].

```yaml
com.datadoghq.ad.tags: '["<TAG_KEY>:TAG_VALUE", "<TAG_KEY_1>:<TAG_VALUE_1>"]'
```

## Node labels as tags

Starting with Agent v6.0+, the Agent can collect labels for a given node and use them as tags to attach to all metrics emitted by all pods on this node:

{{< tabs >}}
{{% tab "Containerized Agent" %}}

To extract a given node label `<NODE_LABEL>` and transform it as a tag key `<TAG_KEY>` within Datadog, add the following environment variable to the Datadog Agent:

```shell
DD_KUBERNETES_NODE_LABELS_AS_TAGS='{"<NODE_LABEL>": "<TAG_KEY>"}'
```

For example, you could set up:

```shell
DD_KUBERNETES_NODE_LABELS_AS_TAGS='{"app":"kube_app"}'
```

For Agent v7.24.0+, use the following environment variable configuration to add all node labels as tags to your metrics. In this example, the tags names are prefixed by `<PREFIX>_`:

```shell
DD_KUBERNETES_NODE_LABELS_AS_TAGS='{"*":"<PREFIX>_%%label%%"}'
```

**Note**: Custom metrics may impact billing. See the [custom metrics billing page][1] for more information.

[1]: /account_management/billing/custom_metrics
{{% /tab %}}
{{% tab "Agent" %}}

To extract a given node label `<NODE_LABEL>` and transform it as a tag key `<TAG_KEY>` within Datadog, add the following configuration block in the [Agent `datadog.yaml` configuration file][1]:

```yaml
kubernetes_node_labels_as_tags:
  <NODE_LABEL>: <TAG_KEY>
```

For example, you could set up:

```yaml
kubernetes_node_labels_as_tags:
  app: kube_app
```

[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

## Pod labels as tags

Starting with Agent v6.0+, the Agent can collect labels for a given pod and use them as tags to attach to all metrics emitted by this pod:

{{< tabs >}}
{{% tab "Containerized Agent" %}}

To extract a given pod label `<POD_LABEL>` and transform it as a tag key `<TAG_KEY>` within Datadog, add the following environment variable to the Datadog Agent:

```shell
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"<POD_LABEL>": "<TAG_KEY>"}'
```

For example, you could set up:

```shell
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"app":"kube_app"}'
```

For Agent v6.8.0+, use the following environment variable configuration to add all pod labels as tags to your metrics. In this example, the tags names are prefixed by `<PREFIX>_`:

```shell
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"*":"<PREFIX>_%%label%%"}'
```

**Note**: Custom metrics may impact billing. See the [custom metrics billing page][1] for more information.

[1]: /account_management/billing/custom_metrics
{{% /tab %}}
{{% tab "Agent" %}}

To extract a given pod label `<POD_LABEL>` and transform it as a Tag Key `<TAG_KEY>` within Datadog, add the following configuration block in the [Agent `datadog.yaml` configuration file][1]:

```yaml
kubernetes_pod_labels_as_tags:
  <POD_LABEL>: <TAG_KEY>
```

For example, you could set up:

```yaml
kubernetes_pod_labels_as_tags:
  app: kube_app
```

For Agent v6.8.0+, use the following environment variable configuration to add all pod labels as tags to your metrics. In this example, the tag names are prefixed by `<PREFIX>_`:

```yaml
kubernetes_pod_labels_as_tags:
  *: <PREFIX>_%%label%%
```

**Note**: Custom metrics may impact billing. See the [custom metrics billing page][3] for more information.

[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

## Pod annotations as tags

Starting with Agent v6.0+, the Agent can collect annotations for a given pod and use them as tags to attach to all metrics emitted by this pod:

{{< tabs >}}
{{% tab "Containerized Agent" %}}

To extract a given pod label `<POD_ANNOTATION>` and transform it as a tag key `<TAG_KEY>` within Datadog, add the following environment variable to the Datadog Agent:

```shell
DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS='{"<POD_ANNOTATION>": "<TAG_KEY>"}'
```

For example, you could set up:

```shell
DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS='{"app":"kube_app"}'
```

For Agent v7.24.0+, use the following environment variable configuration to add all pod annotations as tags to your metrics. In this example, the tags names are prefixed by `<PREFIX>_`:

```shell
DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS='{"*":"<PREFIX>_%%annotation%%"}'
```

**Note**: Custom metrics may impact billing. See the [custom metrics billing page][1] for more information.

[1]: /account_management/billing/custom_metrics
{{% /tab %}}
{{% tab "Agent" %}}

To extract a given pod annotation `<POD_ANNOTATION>` and transform it as a tag key `<TAG_KEY>` within Datadog, add the following configuration block in the [Agent `datadog.yaml` configuration file][1]:

```yaml
kubernetes_pod_annotations_as_tags:
  <POD_ANNOTATION>: <TAG_KEY>
```

For example, you could set up:

```yaml
kubernetes_pod_annotations_as_tags:
  app: kube_app
```

[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

## Namespace labels as tags

Starting with Agent v7.27+, the Agent can collect labels for a given namespace and use them as tags to attach to all metrics emitted by all pods in this namespace:

{{< tabs >}}
{{% tab "Containerized Agent" %}}

To extract a given namespace label `<NAMESPACE_LABEL>` and transform it as a tag key `<TAG_KEY>` within Datadog, add the following environment variable to the Datadog Agent:

```shell
DD_KUBERNETES_NAMESPACE_LABELS_AS_TAGS='{"<NAMESPACE_LABEL>": "<TAG_KEY>"}'
```

For example, you could set up:

```shell
DD_KUBERNETES_NAMESPACE_LABELS_AS_TAGS='{"app":"kube_app"}'
```

Use the following environment variable configuration to add all namespace labels as tags to your metrics. In this example, the tag names are prefixed by `<PREFIX>_`:

```shell
DD_KUBERNETES_NAMESPACE_LABELS_AS_TAGS='{"*":"<PREFIX>_%%label%%"}'
```

**Note**: Custom metrics may impact billing. See the [custom metrics billing page][1] for more information.

[1]: /account_management/billing/custom_metrics
{{% /tab %}}
{{% tab "Agent" %}}

To extract a given namespace label `<NAMESPACE_LABEL>` and transform it as a tag key `<TAG_KEY>` within Datadog, add the following configuration block in the [Agent `datadog.yaml` configuration file][1]:

```yaml
kubernetes_namespace_labels_as_tags:
  <NAMESPACE_LABEL>: <TAG_KEY>
```

For example, you could set up:

```yaml
kubernetes_namespace_labels_as_tags:
  app: kube_app
```

[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/docker/tag/#extract-environment-variables-as-tags
[2]: /getting_started/tagging/unified_service_tagging
[3]: /agent/kubernetes/tag/?tab=agent#extract-labels-as-tags
