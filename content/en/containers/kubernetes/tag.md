---
title: Kubernetes Tag Extraction
description: Configure automatic tag extraction from Kubernetes pod labels and annotations for enhanced monitoring
aliases:
- /agent/autodiscovery/tag/
- /agent/kubernetes/tag
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

The Datadog Agent can automatically assign tags to metrics, traces, and logs emitted by a pod (or an individual container within a pod) based on labels or annotations.

## Out-of-the-box tags

The list of automatically-assigned tags depends on the Agent's [cardinality configuration][1]. [Tag Cardinality][4] is added before ingestion and can impact billing, as different cardinality settings impact the number of emitted metrics.

<div style="overflow-x: auto;">

  | Tag                           | Cardinality  | Source                                                                                                                        | Requirement                                         |
  |-------------------------------|--------------|-------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
  | `container_id`                | High         | Pod status                                                                                                                    | N/A                                                 |
  | `display_container_name`      | High         | Pod status                                                                                                                    | N/A                                                 |
  | `pod_name`                    | Orchestrator | Pod metadata                                                                                                                  | N/A                                                 |
  | `oshift_deployment`           | Orchestrator | Pod annotation `openshift.io/deployment.name`                                                                                 | OpenShift environment and pod annotation must exist |
  | `kube_ownerref_name`          | Orchestrator | Pod ownerref                                                                                                                  | Pod must have an owner                              |
  | `kube_job`                    | Orchestrator | Pod ownerref                                                                                                                  | Pod must be attached to a cronjob                   |
  | `kube_job`                    | Low          | Pod ownerref                                                                                                                  | Pod must be attached to a job                       |
  | `kube_replica_set`            | Low          | Pod ownerref                                                                                                                  | Pod must be attached to a replica set               |
  | `kube_service`                | Low          | Kubernetes service discovery                                                                                                  | Pod is behind a Kubernetes service                  |
  | `kube_daemon_set`             | Low          | Pod ownerref                                                                                                                  | Pod must be attached to a DaemonSet                 |
  | `kube_container_name`         | Low          | Pod status                                                                                                                    | N/A                                                 |
  | `kube_namespace`              | Low          | Pod metadata                                                                                                                  | N/A                                                 |
  | `kube_app_name`               | Low          | Pod label `app.kubernetes.io/name`                                                                                            | Pod label must exist                                |
  | `kube_app_instance`           | Low          | Pod label `app.kubernetes.io/instance`                                                                                        | Pod label must exist                                |
  | `kube_app_version`            | Low          | Pod label `app.kubernetes.io/version`                                                                                         | Pod label must exist                                |
  | `kube_app_component`          | Low          | Pod label `app.kubernetes.io/component`                                                                                       | Pod label must exist                                |
  | `kube_app_part_of`            | Low          | Pod label `app.kubernetes.io/part-of`                                                                                         | Pod label must exist                                |
  | `kube_app_managed_by`         | Low          | Pod label `app.kubernetes.io/managed-by`                                                                                      | Pod label must exist                                |
  | `env`                         | Low          | Pod label `tags.datadoghq.com/env` or container envvar (`DD_ENV` or `OTEL_RESOURCE_ATTRIBUTES`)                               | [Unified service tagging][2] enabled                |
  | `version`                     | Low          | Pod label `tags.datadoghq.com/version` or container envvar (`DD_VERSION` or `OTEL_RESOURCE_ATTRIBUTES`)                       | [Unified service tagging][2] enabled                |
  | `service`                     | Low          | Pod label `tags.datadoghq.com/service` or container envvar (`DD_SERVICE`, `OTEL_RESOURCE_ATTRIBUTES`, or `OTEL_SERVICE_NAME`) | [Unified service tagging][2] enabled                |
  | `pod_phase`                   | Low          | Pod status                                                                                                                    | N/A                                                 |
  | `oshift_deployment_config`    | Low          | Pod annotation `openshift.io/deployment-config.name`                                                                          | OpenShift environment and pod annotation must exist |
  | `kube_ownerref_kind`          | Low          | Pod ownerref                                                                                                                  | Pod must have an owner                              |
  | `kube_deployment`             | Low          | Pod ownerref                                                                                                                  | Pod must be attached to a deployment                |
  | `kube_argo_rollout`           | Low          | Pod ownerref                                                                                                                  | Pod must be attached to an argo rollout             |
  | `kube_replication_controller` | Low          | Pod ownerref                                                                                                                  | Pod must be attached to a replication controller    |
  | `kube_stateful_set`           | Low          | Pod ownerref                                                                                                                  | Pod must be attached to a statefulset               |
  | `persistentvolumeclaim`       | Low          | Pod spec                                                                                                                      | A PVC must be attached to the pod                   |
  | `kube_cronjob`                | Low          | Pod ownerref                                                                                                                  | Pod must be attached to a cronjob                   |
  | `image_name`                  | Low          | Pod spec                                                                                                                      | N/A                                                 |
  | `short_image`                 | Low          | Pod spec                                                                                                                      | N/A                                                 |
  | `image_tag`                   | Low          | Pod spec                                                                                                                      | N/A                                                 |
  | `eks_fargate_node`            | Low          | Pod spec                                                                                                                      | EKS Fargate environment                             |
  | `kube_runtime_class`          | Low          | Pod spec                                                                                                                      | Pod must be attached to a runtime class             |
  | `gpu_vendor`                  | Low          | Pod spec                                                                                                                      | Container must be attached to a GPU resource        |
  | `image_id`                    | Low          | Container image ID                                                                                                            | N/A                                                 |
  | `kube_autoscaler_kind`        | Low          | Kubernetes autoscaler type                                                                                                    | Kubernetes autoscaler must be used                  |
  | `kube_priority_class`         | Low          | Pod priority class                                                                                                            | Pod must have priority class set                    |
  | `kube_qos`                    | Low          | Pod Quality of Service class                                                                                                  | N/A                                                 |

</div>


### Host tag

The Agent can attach Kubernetes environment information as "host tags".

<div style="overflow-x: auto;">

  | Tag                 | Cardinality | Source                                                 | Requirement                                                    |
  |---------------------|-------------|--------------------------------------------------------|----------------------------------------------------------------|
  | `kube_cluster_name` | Low         | `DD_CLUSTER_NAME` envvar or cloud provider integration | `DD_CLUSTER_NAME` envvar or cloud provider integration enabled |
  | `kube_node_role`    | Low         | Node label `node-role.kubernetes.io/<role>`            | Node label must exist                                          |
  | `kube_node`         | Low         | `NodeName` field in a pod's specifications               |                                                                |
  | `orch_cluster_id`         | Low         | Orchestrator cluster metadata               |  Orchestrator environment                            |                                                              |

</div>

## Tag Autodiscovery

Starting with Agent v6.10+, the Agent can autodiscover tags from Pod annotations. It allows the Agent to associate tags to all data emitted by the entire pods or an individual container within this pod.

As a best practice in containerized environments, Datadog recommends using unified service tagging to help unify tags. Unified service tagging ties Datadog telemetry together through the use of three standard tags: `env`, `service`, and `version`. To learn how to configure your environment with unified tagging, refer to the dedicated [unified service tagging][2] documentation.

To apply a `<TAG_KEY>:<TAG_VALUE>` tag to all data emitted by a given pod and collected by the Agent use the following annotation on your pod:

```yaml
annotations:
  ad.datadoghq.com/tags: '{"<TAG_KEY>": "<TAG_VALUE>","<TAG_KEY_1>": "<TAG_VALUE_1>"}'
```

If you want to apply a `<TAG_KEY>:<TAG_VALUE>` tag to an individual container `<CONTAINER_NAME>` within a pod, use the following annotation on your pod:

```yaml
annotations:
  ad.datadoghq.com/<CONTAINER_NAME>.tags: '{"<TAG_KEY>": "<TAG_VALUE>","<TAG_KEY_1>": "<TAG_VALUE_1>"}'
```

Starting with Agent v7.17+, the Agent can Autodiscover tags from Docker labels. This process allows the Agent to associate custom tags to all data emitted by a container, without modifying the Agent configuration.

```yaml
com.datadoghq.ad.tags: '["<TAG_KEY>:TAG_VALUE", "<TAG_KEY_1>:<TAG_VALUE_1>"]'
```

## Tag extraction

### Kubernetes resources labels as tags

Starting with Agent v7.58+, the Agent can be configured to collect labels for Kubernetes resources and use them as tags.

**Note:** Tags do not cascade between parent and child resources. For example, labels on a Deployment are not automatically applied to logs from its child Pods. To tag Pod logs, configure labels directly on the Pods.

This configuration option is more generic and should be preferred over the following options:
- podLabelsAsTags
- nodeLabelsAsTags
- namespaceLabelsAsTags

{{< tabs >}}

{{% tab "Datadog Operator" %}}

Each resource type should be specified in the format `resourceType.apiGroup`, where `resourceType` is the plural name of the resource.

If a specific resource is in the empty API group (for example, `pods` and `nodes`), it can be specified using `resourceType`.


To extract a given node label `<NODE_LABEL>`  and transform them as tag keys `<NODE_TAG_KEY>` within Datadog, add the following configuration to your Operator's `DatadogAgent` configuration in `datadog-agent.yaml`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    kubernetesResourcesLabelsAsTags:
      nodes:
        <NODE_LABEL>: <NODE_TAG_KEY>
```

For example:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    kubernetesResourcesLabelsAsTags:
      nodes:
       kubernetes.io/arch: arch
      pods:
        baz: qux
```

For Agent v7.24.0+, use the following environment variable configuration to add all resource labels as tags to your metrics, except those from KSM (`kubernetes_state.*`). In this example, pod tag names are prefixed with `<PREFIX>_`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    kubernetesResourcesLabelsAsTags:
      pods:
        "*": <PREFIX>_%%label%%
```

{{% /tab %}}

{{% tab "Helm" %}}

Each resource type should be specified in the format `resourceType.apiGroup`, where `resourceType` is the plural name of the resource.

If a specific resource is in the empty API group (for example, `pods` and `nodes`), it can be specified using `resourceType`.

To extract a given node label `<NODE_LABEL>` and transform them as tag keys `<NODE_TAG_KEY>` within Datadog, add the following configuration to your Helm `datadog-values.yaml` file:


```yaml
datadog:
  kubernetesResourcesLabelsAsTags:
    nodes:
      <NODE_LABEL>: <NODE_TAG_KEY>
```

For example, you could set up:

```yaml
datadog:
  kubernetesResourcesLabelsAsTags:
    nodes:
      kubernetes.io/arch: arch
    pods:
      baz: qux
```

For Agent v7.24.0+, use the following environment variable configuration to add all resource labels as tags to your metrics, except those from KSM (`kubernetes_state.*`). In this example, pod tag names are prefixed with `<PREFIX>_`:

```yaml
datadog:
  kubernetesResourcesLabelsAsTags:
    pods:
      "*": <PREFIX>_%%label%%
```

{{% /tab %}}

{{% tab "Manual (DaemonSet)" %}}

Each resource type should be specified in the format `resourceType.apiGroup`, where `resourceType` is the plural name of the resource.

If a specific resource is in the empty API group (for example `pods` and `nodes`), it can be specified using `resourceType`.

To extract a given node label `<NODE_LABEL>` and transform them as tag keys `<NODE_TAG_KEY>` within Datadog, add the following environment variable to the Datadog Agent:

```bash
 DD_KUBERNETES_RESOURCES_LABELS_AS_TAGS='{"nodes":{"<NODE_LABEL>": "<NODE_TAG_KEY>"}}'
```

For example, you could set up:

```bash
DD_KUBERNETES_RESOURCES_LABELS_AS_TAGS='{"nodes":{"kubernetes.io/arch": "arch"},"pods":{"baz":"qux"}}'
```

For Agent v7.24.0+, use the following environment variable configuration to add all resource labels as tags to your metrics, except those from KSM (`kubernetes_state.*`). In this example, pod tag names are prefixed with `<PREFIX>_`:

```bash
DD_KUBERNETES_RESOURCES_LABELS_AS_TAGS='{"pods":{"*": "<PREFIX>_%%label%%"}}'
```

{{% /tab %}}
{{< /tabs >}}

**Notes**: Custom metrics may impact billing. See the [custom metrics billing page][3] for more information.

<div class="alert alert-info">

This configuration option is merged with other configurations set in <a href="/containers/kubernetes/tag/#pod-labels-as-tags">podLabelsAsTags</a>, <a href="/containers/kubernetes/tag/#namespace-labels-as-tags">namespaceLabelsAsTags</a> and <a href="/containers/kubernetes/tag/#node-labels-as-tags">nodeLabelsAsTags</a>. In case of conflict, <a href="/containers/kubernetes/tag/#kubernetes-resources-labels-as-tags">`kubernetesResourcesLabelsAsTags`</a> take precedence while merging the configurations.

For example, if you have the following configurations:

```yaml
datadog:
  kubernetesResourcesLabelsAsTags:
    pods:
      foo: bar
      baz: qux

  podLabelsAsTags:
    foo: quux
    bar: quuz
```

The following mapping is used to extract tags from pod labels:

```yaml
foo: bar
baz: qux
bar: quuz
```

</div>



### Kubernetes resources annotations as tags

Starting with Agent v7.58+, the Agent can be configured to collect annotations for Kubernetes resources and use them as tags.

**Note:** Tags do not cascade between parent and child resources. For example, annotations on a Deployment are not automatically applied to logs from its child Pods. To tag Pod logs, configure annotations directly on the Pods.

This configuration option is more generic and should be preferred over the following options:
- podAnnotationsAsTags
- nodeAnnotationsAsTags
- namespaceAnnotationsAsTags

{{< tabs >}}

{{% tab "Datadog Operator" %}}

Each resource type should be specified in the format `resourceType.apiGroup`, where `resourceType` is the plural name of the resource.

If a specific resource is in the empty API group (for example, `pods` and `nodes`), it can be specified using `resourceType`.


To extract a given node annotation `<NODE_ANNOTATION>` and transform them as tag keys `<NODE_TAG_KEY>` within Datadog, add the following configuration to your Operator's `DatadogAgent` configuration in `datadog-agent.yaml`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    kubernetesResourcesAnnotationsAsTags:
      nodes:
        <NODE_ANNOTATION>: <NODE_TAG_KEY>
```

For example:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    kubernetesResourcesAnnotationsAsTags:
      nodes:
       kubernetes.io/arch: arch
      pods:
        baz: qux
```

For Agent v7.24.0+, use the following environment variable configuration to add all resource annotations as tags to your metrics, except those from KSM (`kubernetes_state.*`). In this example, pod tag names are prefixed with `<PREFIX>_`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    kubernetesResourcesAnnotationsAsTags:
      pods:
        "*": <PREFIX>_%%annotation%%
```

{{% /tab %}}

{{% tab "Helm" %}}

Each resource type should be specified in the format `resourceType.apiGroup`, where `resourceType` is the plural name of the resource.

If a specific resource is in the empty API group (for example `pods` and `nodes`), it can be specified using `resourceType`.

To extract a given node annotation `<NODE_ANNOTATION>` and transform them as tag keys `<NODE_TAG_KEY>` within Datadog, add the following configuration to your Helm datadog-values.yaml file:


```yaml
datadog:
  kubernetesResourcesAnnotationsAsTags:
    nodes:
      <NODE_ANNOTATION>: <NODE_TAG_KEY>
```

For example:

```yaml
datadog:
  kubernetesResourcesAnnotationsAsTags:
    nodes:
      kubernetes.io/arch: arch
    pods:
      baz: qux
```

For Agent v7.24.0+, use the following environment variable configuration to add all resource annotations as tags to your metrics, except those from KSM (`kubernetes_state.*`). In this example, pod tag names are prefixed with `<PREFIX>_`:

```yaml
datadog:
  kubernetesResourcesAnnotationsAsTags:
    pods:
      "*": <PREFIX>_%%annotation%%
```

{{% /tab %}}

{{% tab "Manual (DaemonSet)" %}}

Each resource type should be specified in the format `resourceType.apiGroup`, where `resourceType` is the plural name of the resource.

If a specific resource is in the empty api group (for example, `pods` and `nodes`), it can be specified using `resourceType`.

To extract a given node annotation `<NODE_ANNOTATION>` and transform them as tag keys `<NODE_TAG_KEY>` within Datadog, add the following environment variable to the Datadog Agent:

```bash
 DD_KUBERNETES_RESOURCES_ANNOTATIONS_AS_TAGS='{"nodes":{"<NODE_ANNOTATION>": "<NODE_TAG_KEY>"}}'
```

For example, you could set up:

```bash
DD_KUBERNETES_RESOURCES_ANNOTATIONS_AS_TAGS='{"nodes":{"kubernetes.io/arch": "arch"},"pods":{"baz":"qux"}}'
```

For Agent v7.24.0+, use the following environment variable configuration to add all resource annotations as tags to your metrics, except those from KSM (`kubernetes_state.*`). In this example, pod tag names are prefixed with `<PREFIX>_`:

```bash
DD_KUBERNETES_RESOURCES_ANNOTATIONS_AS_TAGS='{"pods":{"*": "<PREFIX>_%%annotation%%"}}'
```

{{% /tab %}}
{{< /tabs >}}

**Notes**: Custom metrics may impact billing. See the [custom metrics billing page][3] for more information.

<div class="alert alert-info">

This configuration option is merged with other configurations set in <a href="/containers/kubernetes/tag/#pod-annotations-as-tags">podAnnotationsAsTags</a>, <a href="/containers/kubernetes/tag/#namespace-annotations-as-tags">namespaceAnnotationsAsTags</a> and <a href="/containers/kubernetes/tag/#node-annotations-as-tags">nodeAnnotationsAsTags</a>. In case of conflict, <a href="/containers/kubernetes/tag/#kubernetes-resources-annotations-as-tags">`kubernetesResourcesAnnotationsAsTags`</a> take precedence while merging the configurations.

For example, if you have the following configurations:

```yaml
datadog:
  kubernetesResourcesAnnotationsAsTags:
    pods:
      foo: bar
      baz: qux

  podAnnotationsAsTags:
    foo: quux
    bar: quuz
```

The following mapping is used to extract tags from pod annotations:

```yaml
foo: bar
baz: qux
bar: quuz
```

</div>


{{% collapse-content title="Legacy Configuration" level="h4" expanded=false id="legacy-configuration" %}}
### Node labels as tags

<div class="alert alert-info">

If you are on agent version 7.58.0+, you are advised to use <a href="/containers/kubernetes/tag/#kubernetes-resources-labels-as-tags">Kubernetes resources labels as tags</a> to node configure labels as tags.

</div>

Starting with Agent v6.0+, the Agent can collect labels for a given node and use them as tags to attach to all metrics, traces, and logs emitted associated with this `host` in Datadog:

{{< tabs >}}
{{% tab "Datadog Operator" %}}
To extract a given node label `<NODE_LABEL>` and transform it as a tag key `<TAG_KEY>` within Datadog, add the following configuration to your Operator's `DatadogAgent` configuration in `datadog-agent.yaml`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    nodeLabelsAsTags:
      <NODE_LABEL>: <TAG_KEY>
```

For example, you could set up:
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    nodeLabelsAsTags:
      kubernetes.io/arch: arch
```

For Agent v7.24.0+, use the following environment variable configuration to add all node labels as tags to your metrics, except those from KSM (`kubernetes_state.*`). In this example, the tag' names are prefixed with `<PREFIX>_`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    nodeLabelsAsTags:
      "*": <PREFIX>_%%label%% # Note: wildcards do not work for KSM metrics
```
{{% /tab %}}

{{% tab "Helm" %}}
To extract a given node label `<NODE_LABEL>` and transform it as a tag key `<TAG_KEY>` within Datadog, add the following configuration to your Helm `datadog-values.yaml` file:

```yaml
datadog:
  nodeLabelsAsTags:
    <NODE_LABEL>: <TAG_KEY>
```

For example, you could set up:
```yaml
datadog:
  nodeLabelsAsTags:
    kubernetes.io/arch: arch
```

For Agent v7.24.0+, use the following environment variable configuration to add all node labels as tags to your metrics, except those from KSM (`kubernetes_state.*`). In this example, the tags' names are prefixed with `<PREFIX>_`:


```yaml
datadog:
  nodeLabelsAsTags:
    "*": <PREFIX>_%%label%% # Note: wildcards do not work for KSM metrics
```
{{% /tab %}}

{{% tab "Manual (DaemonSet)" %}}
To extract a given node label `<NODE_LABEL>` and transform it as a tag key `<TAG_KEY>` within Datadog, add the following environment variable to the Datadog Agent:

```bash
DD_KUBERNETES_NODE_LABELS_AS_TAGS='{"<NODE_LABEL>": "<TAG_KEY>"}'
```

For example, you could set up:

```bash
DD_KUBERNETES_NODE_LABELS_AS_TAGS='{"kubernetes.io/arch":"arch"}'
```

For Agent v7.24.0+, use the following environment variable configuration to add all node labels as tags to your metrics, except those from KSM (`kubernetes_state.*`). In this example, the tags' tag names are prefixed with `<PREFIX>_`:

```bash
DD_KUBERNETES_NODE_LABELS_AS_TAGS='{"*":"<PREFIX>_%%label%%"}'
```
{{% /tab %}}
{{< /tabs >}}

**Note**: Custom metrics may impact billing. See the [custom metrics billing page][3] for more information.

### Pod labels as tags

<div class="alert alert-info">

If you are on agent version 7.58.0+, you are advised to use <a href="/containers/kubernetes/tag/#kubernetes-resources-labels-as-tags">Kubernetes resources labels as tags</a> to configure pod labels as tags.

</div>

Starting with Agent v6.0+, the Agent can collect labels for a given pod and use them as tags to attach to all metrics, traces, and logs emitted by this pod:

{{< tabs >}}
{{% tab "Datadog Operator" %}}
To extract a given pod label `<POD_LABEL>` and transform it as a tag key `<TAG_KEY>` within Datadog, add the following configuration to your Operator's `DatadogAgent` configuration in `datadog-agent.yaml`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    podLabelsAsTags:
      <POD_LABEL>: <TAG_KEY>
```

For example, you could set up:
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    podLabelsAsTags:
      app: kube_app
```

For Agent v7.24.0+, use the following environment variable configuration to add all pod labels as tags to your metrics, except those from KSM (`kubernetes_state.*`). In this example, the tags' names are prefixed with `<PREFIX>_`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    podLabelsAsTags:
      "*": <PREFIX>_%%label%% # Note: wildcards do not work for KSM metrics
```
{{% /tab %}}

{{% tab "Helm" %}}
To extract a given pod label `<POD_LABEL>` and transform it as a tag key `<TAG_KEY>` within Datadog, add the following configuration to your Helm `datadog-values.yaml` file:

```yaml
datadog:
  podLabelsAsTags:
    <POD_LABEL>: <TAG_KEY>
```

For example, you could set up:
```yaml
datadog:
  podLabelsAsTags:
    app: kube_app
```

For Agent v7.24.0+, use the following environment variable configuration to add all pod labels as tags to your metrics, except those from KSM (`kubernetes_state.*`). In this example, the tags' names are prefixed with `<PREFIX>_`:

```yaml
datadog:
  podLabelsAsTags:
    "*": <PREFIX>_%%label%% # Note: wildcards do not work for KSM metrics
```
{{% /tab %}}

{{% tab "Manual (DaemonSet)" %}}
To extract a given pod label `<POD_LABEL>` and transform it as a tag key `<TAG_KEY>` within Datadog, add the following environment variable to the Datadog Agent:

```bash
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"<POD_LABEL>": "<TAG_KEY>"}'
```

For example, you could set up:

```bash
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"app":"kube_app"}'
```

For Agent v7.24.0+, use the following environment variable configuration to add all pod labels as tags to your metrics, except those from KSM (`kubernetes_state.*`). In this example, the tags' names are prefixed with `<PREFIX>_`:

```bash
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"*":"<PREFIX>_%%label%%"}'
```
{{% /tab %}}
{{< /tabs >}}

**Note**: Custom metrics may impact billing. See the [custom metrics billing page][3] for more information.

### Pod annotations as tags

<div class="alert alert-info">

If you are on agent version 7.58.0+, you are advised to use <a href="/containers/kubernetes/tag/#kubernetes-resources-labels-as-tags">Kubernetes resources labels as tags</a> to configure pod annotations as tags.

</div>

Starting with Agent v6.0+, the Agent can collect annotations for a given pod and use them as tags to attach to all metrics, traces, and logs emitted by this pod:

{{< tabs >}}
{{% tab "Datadog Operator" %}}
To extract a given pod annotation `<POD_ANNOTATION>` and transform it as a tag key `<TAG_KEY>` within Datadog, add the following configuration to your Operator's `DatadogAgent` configuration in `datadog-agent.yaml`

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    podAnnotationsAsTags:
      <POD_ANNOTATION>: <TAG_KEY>
```

For example, you could set up:
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    podAnnotationsAsTags:
      app: kube_app
```

For Agent v7.24.0+, use the following environment variable configuration to add all pod annotations as tags to your metrics, except those from KSM (`kubernetes_state.*`). In this example, the tags' names are prefixed with `<PREFIX>_`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    podAnnotationsAsTags:
      "*": <PREFIX>_%%annotation%% # Note: wildcards do not work for KSM metrics
```
{{% /tab %}}

{{% tab "Helm" %}}
To extract a given pod annotation `<POD_ANNOTATION>` and transform it as a tag key `<TAG_KEY>` within Datadog, add the following configuration to your Helm `datadog-values.yaml` file:

```yaml
datadog:
  podAnnotationsAsTags:
    <POD_ANNOTATION>: <TAG_KEY>
```

For example, you could set up:
```yaml
datadog:
  podAnnotationsAsTags:
    app: kube_app
```

For Agent v7.24.0+, use the following environment variable configuration to add all pod annotation as tags to your metrics, except those from KSM (`kubernetes_state.*`). In this example, the tags' names are prefixed with `<PREFIX>_`:

```yaml
datadog:
  podAnnotationsAsTags:
    "*": <PREFIX>_%%annotation%% # Note: wildcards do not work for KSM metrics
```
{{% /tab %}}

{{% tab "Manual (DaemonSet)" %}}
To extract a given pod annotation `<POD_ANNOTATION>` and transform it as a tag key `<TAG_KEY>` within Datadog, add the following environment variable to the Datadog Agent:

```bash
DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS='{"<POD_ANNOTATION>": "<TAG_KEY>"}'
```

For example, you could set up:

```bash
DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS='{"app":"kube_app"}'
```

For Agent v7.24.0+, use the following environment variable configuration to add all pod annotations as tags to your metrics, except those from KSM (`kubernetes_state.*`). In this example, the tags' names are prefixed with `<PREFIX>_`:

```bash
DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS='{"*":"<PREFIX>_%%annotation%%"}'
```
{{% /tab %}}
{{< /tabs >}}

**Note**: Custom metrics may impact billing. See the [custom metrics billing page][3] for more information.

### Namespace labels as tags

<div class="alert alert-info">

If you are on agent version 7.58.0+, you are advised to use <a href="/containers/kubernetes/tag/#kubernetes-resources-labels-as-tags">Kubernetes resources labels as tags</a> to configure namespace labels as tags.

</div>

Starting with Agent 7.55.0+, the Agent can collect labels for a given namespace and use them as tags to attach to all metrics, traces, and logs emitted by all pods in this namespace:

{{< tabs >}}
{{% tab "Datadog Operator" %}}
To extract a given namespace label `<NAMESPACE_LABEL>` and transform it as a tag key `<TAG_KEY>` within Datadog, add the following configuration to your Operator's `DatadogAgent` configuration in `datadog-agent.yaml`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    namespaceLabelsAsTags:
      <NAMESPACE_LABEL>: <TAG_KEY>
```

For example, you could set up:
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    namespaceLabelsAsTags:
      app: kube_app
```

For Agent v7.24.0+, use the following environment variable configuration to add all namespace labels as tags to your metrics, except those from KSM (`kubernetes_state.*`). In this example, the tags' names are prefixed with `<PREFIX>_`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    namespaceLabelsAsTags:
      "*": <PREFIX>_%%label%% # Note: wildcards do not work for KSM metrics
```
{{% /tab %}}

{{% tab "Helm" %}}
To extract a given namespace label `<NAMESPACE_LABEL>` and transform it as a tag key `<TAG_KEY>` within Datadog, add the following configuration to your Helm `datadog-values.yaml` file:

```yaml
datadog:
  namespaceLabelsAsTags:
    <NAMESPACE_LABEL>: <TAG_KEY>
```

For example, you could set up:
```yaml
datadog:
  namespaceLabelsAsTags:
    app: kube_app
```

For Agent v7.24.0+, use the following environment variable configuration to add all namespace labels as tags to your metrics, except those from KSM (`kubernetes_state.*`). In this example, the tags' names are prefixed with `<PREFIX>_`:

```yaml
datadog:
  namespaceLabelsAsTags:
    "*": <PREFIX>_%%label%% # Note: wildcards do not work for KSM metrics
```
{{% /tab %}}

{{% tab "Manual (DaemonSet)" %}}
To extract a given namespace label `<NAMESPACE_LABEL>` and transform it as a tag key `<TAG_KEY>` within Datadog, add the following environment variable to the Datadog Agent:

```bash
DD_KUBERNETES_NAMESPACE_LABELS_AS_TAGS='{"<NAMESPACE_LABEL>": "<TAG_KEY>"}'
```

For example, you could set up:

```bash
DD_KUBERNETES_NAMESPACE_LABELS_AS_TAGS='{"app":"kube_app"}'
```

For Agent v7.24.0+, use the following environment variable configuration to add all namespace labels as tags to your metrics, except those from KSM (`kubernetes_state.*`). In this example, the tags' names are prefixed with `<PREFIX>_`:

```bash
DD_KUBERNETES_NAMESPACE_LABELS_AS_TAGS='{"*":"<PREFIX>_%%label%%"}'
```
{{% /tab %}}
{{< /tabs >}}

**Note**: Custom metrics may impact billing. See the [custom metrics billing page][3] for more information.
{{% /collapse-content %}}

### Container environment variables as tags

Starting with Agent v7.32+, the Agent can collect container environment variables and use them as tags to attach to all metrics, traces, and logs corresponding to the container. Both `docker` and `containerd` containers are supported:

{{< tabs >}}
{{% tab "Datadog Operator" %}}
To extract a given environment variable `<ENV_VAR>` and transform it as a tag key `<TAG_KEY>` within Datadog, add the following configuration to your Operator's `DatadogAgent` configuration in `datadog-agent.yaml`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  override:
    nodeAgent:
      env:
        - name: DD_CONTAINER_ENV_AS_TAGS
          value: '{"<ENV_VAR>": "<TAG_KEY>"}'
```

For example, you could set up:
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  override:
    nodeAgent:
      env:
        - name: DD_CONTAINER_ENV_AS_TAGS
          value: '{"app":"kube_app"}'
```

{{% /tab %}}

{{% tab "Helm" %}}
To extract a given environment variable `<ENV_VAR>` and transform it as a tag key `<TAG_KEY>` within Datadog, add the following configuration to your Helm `datadog-values.yaml` file:

```yaml
datadog:
  env:
    - name: DD_CONTAINER_ENV_AS_TAGS
      value: '{"<ENV_VAR>": "<TAG_KEY>"}'
```

For example, you could set up:
```yaml
datadog:
  env:
    - name: DD_CONTAINER_ENV_AS_TAGS
      value: '{"app":"kube_app"}'
```
{{% /tab %}}

{{% tab "Manual (DaemonSet)" %}}
To extract a given environment variable `<ENV_VAR>` and transform it as a tag key `<TAG_KEY>` within Datadog, add the following environment variable to the Datadog Agent:

```bash
DD_CONTAINER_ENV_AS_TAGS='{"<ENV_VAR>": "<TAG_KEY>"}'
```

For example:

```bash
DD_CONTAINER_ENV_AS_TAGS='{"app":"kube_app"}'
```

{{% /tab %}}
{{< /tabs >}}

**Note**: Custom metrics may impact billing. See [Custom Metrics Billing][3] for more details.

### Container labels as tags

Starting with Agent v7.33+, the Agent can collect container labels and use them as tags. The agent attaches the tags to all metrics, traces, and logs associated with the container.

The Agent can generate tags from container labels for both `docker` and `containerd` containers. In the case of `containerd`, the minimum supported version is v1.5.6, because previous releases do not propagate labels correctly.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
To extract a given container label `<CONTAINER_LABEL>` and transform it as a tag key `<TAG_KEY>` within Datadog, add the following configuration to your Operator's `DatadogAgent` configuration in `datadog-agent.yaml`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  override:
    nodeAgent:
      env:
        - name: DD_CONTAINER_LABELS_AS_TAGS
          value: '{"<CONTAINER_LABEL>": "<TAG_KEY>"}'
```

For example, you could set up:
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  override:
    nodeAgent:
      env:
        - name: DD_CONTAINER_LABELS_AS_TAGS
          value: '{"app":"kube_app"}'
```

{{% /tab %}}

{{% tab "Helm" %}}
To extract a given container label `<CONTAINER_LABEL>` and transform it as a tag key `<TAG_KEY>` within Datadog, add the following configuration to your Helm `datadog-values.yaml` file:

```yaml
datadog:
  env:
    - name: DD_CONTAINER_LABELS_AS_TAGS
      value: '{"<CONTAINER_LABEL>": "<TAG_KEY>"}'
```

For example, you could set up:
```yaml
datadog:
  env:
    - name: DD_CONTAINER_LABELS_AS_TAGS
      value: '{"app":"kube_app"}'
```
{{% /tab %}}

{{% tab "Manual (DaemonSet)" %}}
To extract a given container label `<CONTAINER_LABEL>` and transform it to a tag key `<TAG_KEY>`, add the following environment variable to the Datadog Agent:

```bash
DD_CONTAINER_LABELS_AS_TAGS='{"<CONTAINER_LABEL>":"<TAG_KEY>"}'
```

For example:

```bash
DD_CONTAINER_LABELS_AS_TAGS='{"app":"kube_app"}'
```
{{% /tab %}}
{{< /tabs >}}

**Note**: Custom metrics may impact billing. See [Custom Metrics Billing][3] for more details.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/assigning_tags/?tab=containerizedenvironments#environment-variables
[2]: /getting_started/tagging/unified_service_tagging
[3]: /account_management/billing/custom_metrics
[4]: /getting_started/tagging/assigning_tags/?tab=containerizedenvironments#tags-cardinality
