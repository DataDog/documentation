---
title: Configure Containers View
aliases:
  - /infrastructure/livecontainers/configuration
further_reading:
- link: "/infrastructure/hostmap/"
  tag: "Documentation"
  text: "See all of your hosts/containers with the Infrastructure Map"
- link: "/infrastructure/process/"
  tag: "Documentation"
  text: "Understand what is going on at any level of your system"
---

This page lists configuration options for the [Containers][1] page in Datadog. To learn more about the Containers page and its capabilities, see [Containers View][2] documentation.

## Configuration options

### Include or exclude containers

Include and exclude containers from real-time collection:

- Exclude containers either by passing the environment variable `DD_CONTAINER_EXCLUDE` or by adding `container_exclude:` in your `datadog.yaml` main configuration file.
- Include containers either by passing the environment variable `DD_CONTAINER_INCLUDE` or by adding `container_include:` in your `datadog.yaml` main configuration file.

Both arguments take an **image name** as value. Regular expressions are also supported.

For example, to exclude all Debian images except containers with a name starting with *frontend*, add these two configuration lines in your `datadog.yaml` file:

```yaml
container_exclude: ["image:debian"]
container_include: ["name:frontend.*"]
```

**Note**: For Agent 5, instead of including the above in the `datadog.conf` main configuration file, explicitly add a `datadog.yaml` file to `/etc/datadog-agent/`, as the Process Agent requires all configuration options here. This configuration only excludes containers from real-time collection, **not** from Autodiscovery.

### Scrubbing sensitive information

To prevent the leaking of sensitive data, you can scrub sensitive words in container YAML files. Container scrubbing is enabled by default for Helm charts, and some default sensitive words are provided:

- `password`
- `passwd`
- `mysql_pwd`
- `access_token`
- `auth_token`
- `api_key`
- `apikey`
- `pwd`
- `secret`
- `credentials`
- `stripetoken`

You can set additional sensitive words by providing a list of words to the environment variable `DD_ORCHESTRATOR_EXPLORER_CUSTOM_SENSITIVE_WORDS`. This adds to, and does not overwrite, the default words.

**Note**: The additional sensitive words must be in lowercase, as the Agent compares the text with the pattern in lowercase. This means `password` scrubs `MY_PASSWORD` to `MY_*******`, while `PASSWORD` does not.

You need to setup this environment variable for the following agents:

- process-agent
- cluster-agent

```yaml
env:
    - name: DD_ORCHESTRATOR_EXPLORER_CUSTOM_SENSITIVE_WORDS
      value: "customword1 customword2 customword3"
```

For example, because `password` is a sensitive word, the scrubber changes `<MY_PASSWORD>` in any of the following to a string of asterisks, `***********`:

```text
password <MY_PASSWORD>
password=<MY_PASSWORD>
password: <MY_PASSWORD>
password::::== <MY_PASSWORD>
```

However, the scrubber does not scrub paths that contain sensitive words. For example, it does not overwrite `/etc/vaultd/secret/haproxy-crt.pem` with `/etc/vaultd/******/haproxy-crt.pem` even though `secret` is a sensitive word.

## Configure Orchestrator Explorer

### Resource collection compatibility matrix

The following table presents the list of collected resources and the minimal Agent, Cluster Agent, and Helm chart versions for each.

| Resource | Minimal Agent version | Minimal Cluster Agent version* | Minimal Helm chart version | Minimal Kubernetes version |
|---|---|---|---|---|
| ClusterRoleBindings | 7.33.0 | 1.19.0 | 2.30.9 | 1.14.0 |
| ClusterRoles | 7.33.0 | 1.19.0 | 2.30.9 | 1.14.0 |
| Clusters | 7.33.0 | 1.18.0 | 2.10.0 | 1.17.0 |
| CronJobs | 7.33.0 | 7.40.0 | 2.15.5 | 1.16.0 |
| CustomResourceDefinitions | 7.51.0 | 7.51.0 | 3.39.2 | v1.16.0 |
| CustomResources | 7.51.0 | 7.51.0 | 3.39.2 | v1.16.0 |
| DaemonSets | 7.33.0 | 1.18.0 | 2.16.3 | 1.16.0 |
| Deployments | 7.33.0 | 1.18.0 | 2.10.0 | 1.16.0 |
| HorizontalPodAutoscalers | 7.33.0 | 7.51.0 | 2.10.0 | 1.1.1 |
| Ingresses | 7.33.0 | 1.22.0 | 2.30.7 | 1.21.0 |
| Jobs | 7.33.0 | 1.18.0 | 2.15.5 | 1.16.0 |
| Namespaces | 7.33.0 | 7.41.0 | 2.30.9 | 1.17.0 |
| Network Policies | 7.33.0 | 7.56.0 | 3.57.2 | 1.14.0 |
| Nodes | 7.33.0 | 1.18.0 | 2.10.0 | 1.17.0 |
| PersistentVolumeClaims | 7.33.0 | 1.18.0 | 2.30.4 | 1.17.0 |
| PersistentVolumes | 7.33.0 | 1.18.0 | 2.30.4 | 1.17.0 |
| Pods | 7.33.0 | 1.18.0 | 3.9.0 | 1.17.0 |
| ReplicaSets | 7.33.0 | 1.18.0 | 2.10.0 | 1.16.0 |
| RoleBindings | 7.33.0 | 1.19.0 | 2.30.9 | 1.14.0 |
| Roles | 7.33.0 | 1.19.0 | 2.30.9 | 1.14.0 |
| ServiceAccounts | 7.33.0 | 1.19.0 | 2.30.9 | 1.17.0 |
| Services | 7.33.0 | 1.18.0 | 2.10.0 | 1.17.0 |
| Statefulsets | 7.33.0 | 1.15.0 | 2.20.1 | 1.16.0 |
| VerticalPodAutoscalers | 7.33.0 | 7.46.0 | 3.6.8 | 1.16.0 |

**Note**: After version 1.22, Cluster Agent version numbering follows Agent release numbering, starting with version 7.39.0.

### Add custom tags to resources

You can add custom tags to Kubernetes resources to ease filtering inside the Kubernetes resources view.

Additional tags are added through the `DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS` environment variable.

**Note**: These tags only show up in the Kubernetes resources view.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Add the environment variable on both the Process Agent and the Cluster Agent by setting `agents.containers.processAgent.env` and `clusterAgent.env` in `datadog-agent.yaml`.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
  features:
    liveContainerCollection:
      enabled: true
    orchestratorExplorer:
      enabled: true
  override:
    agents:
      containers:
        processAgent:
          env:
            - name: "DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS"
              value: "tag1:value1 tag2:value2"
    clusterAgent:
      env:
        - name: "DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS"
          value: "tag1:value1 tag2:value2"
```

Then, apply the new configuration:

```bash
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}

If you are using the [official Helm chart][1], add the environment variable on both the Process Agent and the Cluster Agent by setting `agents.containers.processAgent.env` and `clusterAgent.env` in [values.yaml][2].

```yaml
agents:
  containers:
    processAgent:
      env:
        - name: "DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS"
          value: "tag1:value1 tag2:value2"
clusterAgent:
  env:
    - name: "DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS"
      value: "tag1:value1 tag2:value2"
```

Then, upgrade your Helm chart.

[1]: https://github.com/DataDog/helm-charts
[2]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml

{{% /tab %}}
{{% tab "DaemonSet" %}}

Set the environment variable on both the Process Agent and Cluster Agent containers:

```yaml
- name: DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS
  value: "tag1:value1 tag2:value2"
```

{{% /tab %}}
{{< /tabs >}}

### Collect custom resources

The [Kubernetes Explorer][3] automatically collects Custom Resource Definitions (CRDs) by default.

#### Automatic custom resource collection compatibility matrix

When the following CRDs are present in your cluster, the Agent automatically collects their Custom Resources (CRs). If a CRD you use is **not** listed here—or your Agent version is older—follow the **manual configuration** steps below.

| CRD group          | CRD kind             | CRD versions | Minimal Agent version |
| ------------------ | -------------------- | ------------ | --------------------- |
| datadoghq.com      | datadogslo           | v1alpha1     | 7.71.0                |
| datadoghq.com      | datadogdashboard     | v1alpha1     | 7.71.0                |
| datadoghq.com      | datadogagentprofile  | v1alpha1     | 7.71.0                |
| datadoghq.com      | datadogmonitor       | v1alpha1     | 7.71.0                |
| datadoghq.com      | datadogmetric        | v1alpha1     | 7.71.0                |
| datadoghq.com      | datadogpodautoscaler | v1alpha2     | 7.71.0                |
| datadoghq.com      | datadogagent         | v2alpha1     | 7.71.0                |
| argoproj.io        | rollout              | v1alpha1     | 7.71.0                |
| karpenter.sh       | *                    | v1           | 7.71.0                |
| karpenter.k8s.aws  | *                    | v1           | 7.71.0                |
| azure.karpenter.sh | *                    | v1beta1      | 7.71.0                |


#### Manual Configuration

For the other CRDs, follow these steps to collect the custom resources that these CRDs define:

1. In Datadog, open [Kubernetes Explorer][3]. On the left panel, under **Select Resources**, select [**Kubernetes > Custom Resources > Resource Definitions**][4].

1. Locate the CRD that defines the custom resource you want to visualize in the explorer. Under the **Versions** column, click the `version` tag you want to configure indexing for.

   {{< img src="infrastructure/containers_view/CRD_indexing_access_1.mp4" alt="A video of Kubernetes Explorer with the Custom Resources dropdown expanded and Resource Definitions selected. The cursor moves down to one of the rows of the table and, under the 'Versions' column, clicks on one of the versions. The cursor selects 'v1alpha1'. A modal appears." video="true">}}

   A modal appears:
   {{< img src="infrastructure/containers_view/indexing_modal_1.png" alt="The Collecting and Indexing modal. Contains two sections: Set up Datadog Agent, with copyable snippets for updating an Agent configuration, and Select indexed fields for filtering/sorting, with checkboxes for fields to index and a preview.">}}

1. Follow the instructions in the modal's **Set up Datadog Agent** section to update the Agent configuration for clusters that are not collecting custom resources. The modal lists all such clusters, either because the Agent is not configured to collect custom resources, or because none are available in that cluster. If the Agent is configured and no custom resources exist, no action is required.

   {{< tabs >}}
   {{% tab "Helm Chart" %}}

   1. Add the following configuration to `datadog-values.yaml`:

      ```yaml
      datadog:
        #(...)
        orchestratorExplorer:
          customResources:
            - <CUSTOM_RESOURCE_NAME>
      ```

   1. Upgrade your Helm chart:

      ```
      helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
      ```

   {{% /tab %}}
   {{% tab "Datadog Operator" %}}

   1. Install the Datadog Operator with an option that grants the Datadog Agent permission to collect custom resources:

      ```
      helm install datadog-operator datadog/datadog-operator --set clusterRole.allowReadAllResources=true
      ```

   1. Add the following configuration to your `DatadogAgent` manifest, `datadog-agent.yaml`:

      ```yaml
      apiVersion: datadoghq.com/v2alpha1
      kind: DatadogAgent
      metadata:
        name: datadog
      spec:
        #(...)
        features:
          orchestratorExplorer:
            customResources:
              - <CUSTOM_RESOURCE_NAME>
      ```

   1. Apply your new configuration:

      ```
      kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
      ```

   {{% /tab %}}
   {{< /tabs >}}

   Each `<CUSTOM_RESOURCE_NAME>` must use the format `group/version/kind`.

1. In the modal, under **Select indexed fields for filtering/sorting**, select the fields you want to index from the custom resource for filtering and sorting. For some CRDs, Datadog provides a default configuration. You can select additional fields if needed.

    <div class="alert alert-info">After the Datadog Agent is set up, it collects available custom resources automatically. Indexing fields is optional.</div>


    {{< img src="infrastructure/containers_view/CRD_indexing_modal_1.mp4" alt="A video of the Collecting and Indexing modal. The cursor selects three fields and clicks Update Fields. A success message displays." video="true">}}

    For arrays of objects, see the [Indexing complex types](#indexing-complex-types) section.

1.  Select **Update Fields** to save.

After the fields are indexed, you can add them as columns in the explorer and sort them, or include them in Saved Views. You can also filter on indexed fields using the prefix `field#`.

### Indexing complex types

{{< img src="containers/explorer/crd_groupby_1.png" alt="Indexing Configuration: A targets object[] array, with 'Group by' drop down options: no field, containerResource.container, containerResource.name, containerResource.value.type, etc." style="width:100%;" >}}

For arrays of objects, two group-by strategies are available:

-   `No field`: Object's nested fields are indexed solely on nested field name.
-   **Field** (for example: `type`, `status`, etc.): Object's nested fields are indexed based on each unique field value.

##### Example: Filtering on DatadogPodAutoscaler custom resources

Consider these two custom resources:

**Custom Resource 1 (CR1)**:

```yaml
status:
    conditions:
        - type: HorizontalAbleToScale
          status: 'True'
        - type: VerticalAbleToApply
          status: 'False'
```

**Custom Resource 2 (CR2)**:

```yaml
status:
    conditions:
        - type: VerticalAbleToApply
          status: 'True'
        - type: HorizontalAbleToScale
          status: 'False'
```

You have the filtering possibilities on `status.conditions` based on the two indexing strategies:

{{< tabs >}}
{{% tab "Grouping by no field" %}}

**Indexed fields for CR1:**

```yaml
status:
    conditions:
        type: [HorizontalAbleToScale, VerticalAbleToApply]
        status: ['True', 'False']
```

**Indexed fields for CR2:**

```yaml
status:
    conditions:
        type: [VerticalAbleToApply, HorizontalAbleToScale]
        status: ['True', 'False']
```

**Example queries:**

**Query 1:**

```text
field#status.conditions.status:"False"
```

**Result:** Returns CR1 and CR2. Both CRs have at least one object with `status:"False"`

**Query 2:**

```text
field#status.conditions.status:"False" AND field#status.conditions.type:VerticalAbleToApply
```

**Result:** Returns CR1 and CR2. At least one `status.condition` object in each custom resource matches one of the filters—even if it's not the same object that matches both filters.

{{% /tab %}}
{{% tab "Grouping by type" %}}

**Indexed fields for CR1:**

```yaml
status:
    conditions:
        - HorizontalAbleToScale:
              status: 'True'
        - VerticalAbleToApply:
              status: 'False'
```

**Indexed fields for CR2:**

```yaml
status:
    conditions:
        - VerticalAbleToApply:
              status: 'True'
        - HorizontalAbleToScale:
              status: 'False'
```

**Example query:**

```text
field#status.conditions.HorizontalAbleToScale.status:"False"
```

**Result:** Returns CR2. Only a `status.condition` object whose `type:"HorizontalAbleToScale"` and `status:"False"` is returned.

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">You can select up to 50 fields per resource. You can use the preview to validate your indexing choices.</div>

### Collect custom resource metrics using Kubernetes State Core check

**Note**: This functionality requires Cluster Agent 7.63.0+

It is possible to use the kubernetes_state_core check to collect custom resource metrics when running Cluster Agent.

   {{< tabs >}}
   {{% tab "Helm Chart" %}}

   1. Add the following configuration to `datadog-values.yaml`:

      ```yaml
      datadog:
        #(...)
        kubeStateMetricsCore:
          collectCrMetrics:
            - <CUSTOM_RESOURCE_METRIC>
      ```

   1. Upgrade your Helm chart:

      ```
      helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
      ```

   {{% /tab %}}
   {{% tab "Datadog Operator" %}}

   1. Install the Datadog Operator with an option that grants the Datadog Agent permission to collect custom resources:

      ```
      helm install datadog-operator datadog/datadog-operator --set clusterRole.allowReadAllResources=true
      ```

   1. Add the following configuration to your `DatadogAgent` manifest, `datadog-agent.yaml`:

      ```yaml
      apiVersion: datadoghq.com/v2alpha1
      kind: DatadogAgent
      metadata:
        name: datadog
      spec:
        #(...)
        features:
          kubeStateMetricsCore:
            collectCrMetrics:
              - <CUSTOM_RESOURCE_METRIC>
      ```

   1. Apply your new configuration:

      ```
      kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
      ```

   {{% /tab %}}
   {{< /tabs >}}

For full description of <CUSTOM_RESOURCE_METRIC> item see: https://github.com/kubernetes/kube-state-metrics/blob/main/docs/metrics/extend/customresourcestate-metrics.md.

Example:

``yaml
  #=(...)
  collectCrMetrics:
    - groupVersionKind:
        group: "crd.k8s.amazonaws.com"
        kind: "ENIConfig"
        version: "v1alpha1"
      commonLabels:
        crd_type: "eniconfig"
      labelsFromPath:
        crd_name: [metadata, name]
      metrics:
        - name: "eniconfig"
          help: "ENI Config"
          each:
            type: gauge
            gauge:
              path: [metadata, generation]
    - groupVersionKind:
        group: "vpcresources.k8s.aws"
        kind: "CNINode"
        version: "v1alpha1"
        resource: "cninode-pluralized"
      commonLabels:
        crd_type: "cninode"
      labelsFromPath:
        crd_name: [metadata, name]
      metrics:
        - name: "cninode"
          help: "CNI Node"
          each:
            type: gauge
            gauge:
              path: [metadata, generation]
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/containers
[2]: /infrastructure/containers
[3]: https://app.datadoghq.com/orchestration/explorer/pod
[4]: https://app.datadoghq.com/orchestration/explorer/crd
