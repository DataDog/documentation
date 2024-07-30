---
title: Kubernetes Tag Extraction
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

The list of automatically-assigned tags depends on the Agent's [cardinality configuration][1].

<div style="overflow-x: auto;">

  | Tag                           | Cardinality  | Source                                                                  | Requirement                                         |
  |-------------------------------|--------------|-------------------------------------------------------------------------|-----------------------------------------------------|
  | `container_id`                | High         | Pod status                                                              | N/A                                                 |
  | `display_container_name`      | High         | Pod status                                                              | N/A                                                 |
  | `pod_name`                    | Orchestrator | Pod metadata                                                            | N/A                                                 |
  | `oshift_deployment`           | Orchestrator | Pod annotation `openshift.io/deployment.name`                           | OpenShift environment and pod annotation must exist |
  | `kube_ownerref_name`          | Orchestrator | Pod ownerref                                                            | Pod must have an owner                              |
  | `kube_job`                    | Orchestrator | Pod ownerref                                                            | Pod must be attached to a cronjob                   |
  | `kube_job`                    | Low          | Pod ownerref                                                            | Pod must be attached to a job                       |
  | `kube_replica_set`            | Low          | Pod ownerref                                                            | Pod must be attached to a replica set               |
  | `kube_service`                | Low          | Kubernetes service discovery                                            | Pod is behind a Kubernetes service                  |
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
  | `eks_fargate_node`            | Low          | Pod spec                                                                | EKS Fargate environment                                       |

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

Starting with Agent v7.17+, the Agent can Autodiscover tags from Docker labels. This process allows the Agent to associate custom tags to all data emitted by a container, without modifying the Agent configuration.

```yaml
com.datadoghq.ad.tags: '["<TAG_KEY>:TAG_VALUE", "<TAG_KEY_1>:<TAG_VALUE_1>"]'
```

## Tag extraction
### Node labels as tags

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

For Agent v7.24.0+, use the following environment variable configuration to add all node labels as tags to your metrics. In this example, the tags' names are prefixed by `<PREFIX>_`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    nodeLabelsAsTags:
      "*": <PREFIX>_%%label%%
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

For Agent v7.24.0+, use the following environment variable configuration to add all node labels as tags to your metrics. In this example, the tags' names are prefixed by `<PREFIX>_`:

```yaml
datadog:
  nodeLabelsAsTags:
    "*": <PREFIX>_%%label%%
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

For Agent v7.24.0+, use the following environment variable configuration to add all node labels as tags to your metrics. In this example, the tags' names are prefixed by `<PREFIX>_`:

```bash
DD_KUBERNETES_NODE_LABELS_AS_TAGS='{"*":"<PREFIX>_%%label%%"}'
```
{{% /tab %}}
{{< /tabs >}}

**Note**: Custom metrics may impact billing. See the [custom metrics billing page][3] for more information.

### Pod labels as tags

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

For Agent v7.24.0+, use the following environment variable configuration to add all pod labels as tags to your metrics. In this example, the tags' names are prefixed by `<PREFIX>_`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    podLabelsAsTags:
      "*": <PREFIX>_%%label%%
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

For Agent v7.24.0+, use the following environment variable configuration to add all pod labels as tags to your metrics. In this example, the tags' names are prefixed by `<PREFIX>_`:

```yaml
datadog:
  podLabelsAsTags:
    "*": <PREFIX>_%%label%%
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

For Agent v6.8.0+, use the following environment variable configuration to add all pod labels as tags to your metrics. In this example, the tags names are prefixed by `<PREFIX>_`:

```bash
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"*":"<PREFIX>_%%label%%"}'
```
{{% /tab %}}
{{< /tabs >}}

**Note**: Custom metrics may impact billing. See the [custom metrics billing page][3] for more information.

### Pod annotations as tags

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

For Agent v7.24.0+, use the following environment variable configuration to add all pod annotations as tags to your metrics. In this example, the tags' names are prefixed by `<PREFIX>_`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    podAnnotationsAsTags:
      "*": <PREFIX>_%%label%%
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

For Agent v7.24.0+, use the following environment variable configuration to add all pod annotation as tags to your metrics. In this example, the tags' names are prefixed by `<PREFIX>_`:

```yaml
datadog:
  podAnnotationsAsTags:
    "*": <PREFIX>_%%label%%
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

For Agent v7.24.0+, use the following environment variable configuration to add all pod annotations as tags to your metrics. In this example, the tags names are prefixed by `<PREFIX>_`:

```bash
DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS='{"*":"<PREFIX>_%%annotation%%"}'
```
{{% /tab %}}
{{< /tabs >}}

**Note**: Custom metrics may impact billing. See the [custom metrics billing page][3] for more information.

### Namespace labels as tags

Starting with Agent v7.27+, the Agent can collect labels for a given namespace and use them as tags to attach to all metrics, traces, and logs emitted by all pods in this namespace:

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

For Agent v7.24.0+, use the following environment variable configuration to add all namespace labels as tags to your metrics. In this example, the tags' names are prefixed by `<PREFIX>_`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    namespaceLabelsAsTags:
      "*": <PREFIX>_%%label%%
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

For Agent v7.24.0+, use the following environment variable configuration to add all namespace labels as tags to your metrics. In this example, the tags' names are prefixed by `<PREFIX>_`:

```yaml
datadog:
  namespaceLabelsAsTags:
    "*": <PREFIX>_%%label%%
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

Use the following environment variable configuration to add all namespace labels as tags to your metrics. In this example, the tag names are prefixed by `<PREFIX>_`:

```bash
DD_KUBERNETES_NAMESPACE_LABELS_AS_TAGS='{"*":"<PREFIX>_%%label%%"}'
```
{{% /tab %}}
{{< /tabs >}}

**Note**: Custom metrics may impact billing. See the [custom metrics billing page][3] for more information.

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
