---
title: Kubernetes Explorer
description: Using Datadog's Kubernetes Explorer page to monitor your Kubernetes resources, such as pods and deployments.
aliases:
  - /infrastructure/containers/orchestrator_explorer
further_reading:
- link: https://www.datadoghq.com/blog/kubernetes-operator-performance
  tag: Blog
  text: Monitor your Kubernetes operators to keep applications running smoothly
- link: "https://learn.datadoghq.com/courses/getting-started-k8s"
  tag: "Learning Center"
  text: "Getting Started with Kubernetes Observability"
---

{{< img src="infrastructure/livecontainers/orch_ex.png" alt="Kubernetes Explorer, showing Kubernetes Pods." style="width:80%;">}}

Datadog's [Kubernetes Explorer][1] allows you to monitor the state of pods, deployments, and other Kubernetes resources. You can also view resource specifications for failed pods within a deployment, correlate node activity with related logs, track resource utilization, automatically scale workloads, and remediate errors.

<div class="alert alert-info">When using the Datadog Agent, Kubernetes Explorer requires Agent 7.27.0+ and Cluster Agent 1.11.0+. If you are using Kubernetes 1.25+, then Cluster Agent 7.40.0+ is required. For OpenTelemetry-based setup, see the <strong>OpenTelemetry</strong> tab below.</div>


## Configuration

### Enable Kubernetes Explorer

Kubernetes Explorer is **enabled by default** for most Datadog Agent installations.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

When you install the Datadog Agent by using the Datadog Operator, Kubernetes Explorer is enabled by default.

To verify that Kubernetes Explorer is enabled, ensure that the `features.orchestratorExplorer.enabled` parameter is set to `true` in your `datadog-agent.yaml`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
  features:
    orchestratorExplorer:
      enabled: true
```

{{% /tab %}}
{{% tab "Helm" %}}

When you install the Datadog Agent by using the [official Helm chart][1], Kubernetes Explorer is enabled by default.

To verify that Kubernetes Explorer is enabled, ensure that the `orchestratorExplorer.enabled` parameter is set to `true` in your `datadog-values.yaml` file:

```yaml
datadog:
  clusterName: <CLUSTER_NAME>
  # (...)
  processAgent:
    enabled: true
  orchestratorExplorer:
    enabled: true
```

Then, upgrade your Helm chart.

[1]: https://github.com/DataDog/helm-charts

{{% /tab %}}
{{% tab "Manual" %}}
For manual setup, see [Set up Kubernetes Explorer with a DaemonSet][5].

[5]: /infrastructure/faq/set-up-orchestrator-explorer-daemonset
{{% /tab %}}
{{% tab "OpenTelemetry" %}}

<div class="alert alert-info">Native OpenTelemetry support for the Kubernetes Explorer is in Preview. Contact your account representative to request access.</div>

You can populate the Kubernetes Explorer using a native OpenTelemetry pipeline instead of the Datadog Agent. This setup uses the [`k8sobjects`][100] receiver to collect Kubernetes resource data and forwards it through the [Datadog Exporter's][101] orchestrator explorer functionality.

#### Prerequisites

- OpenTelemetry Collector Contrib [v0.152.0][102] or later.
- Access enabled on your Datadog instance. Contact your account representative to verify activation.

#### Limitations

The open source `k8sobjects` receiver can place significant load on a cluster's Kubernetes API server. Modify the time interval in [Resource collection](#resource-collection) if you experience issues.

Recommendations:
1. Use Kubernetes 1.33 or later, which includes [streaming list improvements][106] that reduce API server impact.
2. Start with smaller clusters. Limit the number of objects per resource type to fewer than 5,000 as a starting point, and scale up gradually while monitoring cluster health.

#### 1. Create a Datadog API key secret

Create a Kubernetes secret to store your Datadog API key:

```sh
export DD_API_KEY="<YOUR_DATADOG_API_KEY>"
kubectl create secret generic datadog-secret --from-literal api-key=$DD_API_KEY
```

#### 2. Configure the cluster collector

This setup deploys the OTel Collector as a Kubernetes Deployment. Create a `deployment-collector.yaml` file and add each of the following configuration sections.

##### Collector image and mode

Set the Collector to run as a single-replica Deployment using the Contrib distribution:

```yaml
mode: deployment
replicaCount: 1

image:
  repository: otel/opentelemetry-collector-contrib
  tag: 0.152.0
  pullPolicy: IfNotPresent

extraEnvs:
  - name: DD_API_KEY
    valueFrom:
      secretKeyRef:
        name: datadog-secret
        key: api-key
```

##### RBAC permissions

The `k8sobjects` receiver needs read access to the Kubernetes API. Grant `get`, `list`, and `watch` permissions for each resource type you want to appear in the Explorer:

```yaml
clusterRole:
  create: true
  rules:
    - apiGroups: [""]
      resources:
        - namespaces
        - nodes
        - nodes/spec
        - nodes/stats
        - pods
        - pods/status
        - replicationcontrollers
        - replicationcontrollers/status
        - resourcequotas
        - services
        - persistentvolumes
        - persistentvolumeclaims
        - serviceaccounts
      verbs: ["get", "list", "watch"]
    - apiGroups: ["apps"]
      resources:
        - daemonsets
        - deployments
        - replicasets
        - statefulsets
      verbs: ["get", "list", "watch"]
    - apiGroups: ["extensions"]
      resources:
        - daemonsets
        - deployments
        - replicasets
        - statefulsets
      verbs: ["get", "list", "watch"]
    - apiGroups: ["batch"]
      resources:
        - jobs
        - cronjobs
      verbs: ["get", "list", "watch"]
    - apiGroups: ["autoscaling"]
      resources:
        - horizontalpodautoscalers
      verbs: ["get", "list", "watch"]
    - apiGroups: ["policy"]
      resources:
        - poddisruptionbudgets
      verbs: ["get", "list", "watch"]
    - apiGroups: ["rbac.authorization.k8s.io"]
      resources:
        - roles
        - rolebindings
        - clusterroles
        - clusterrolebindings
      verbs: ["get", "list", "watch"]
    - apiGroups: ["storage.k8s.io"]
      resources:
        - storageclasses
      verbs: ["get", "list", "watch"]
    - apiGroups: ["networking.k8s.io"]
      resources:
        - networkpolicies
        - ingresses
      verbs: ["get", "list", "watch"]
    - apiGroups: ["apiextensions.k8s.io"]
      resources:
        - customresourcedefinitions
      verbs: ["get", "list", "watch"]
```

##### Datadog exporter

Enable the `orchestrator_explorer` option in the Datadog Exporter. This is the setting that sends Kubernetes object data to the Explorer. Replace `<YOUR_DATADOG_SITE>` with your [Datadog site][104]:

```yaml
config:
  exporters:
    datadog:
      api:
        site: <YOUR_DATADOG_SITE>
        key: ${env:DD_API_KEY}
      orchestrator_explorer:
        enabled: true
```

##### Resource collection

The [`k8sobjects`][100] receiver collects Kubernetes resource data using two modes for each resource type:
- **`pull`**: Periodically fetches a full snapshot of the resource (every 3 minutes).
- **`watch`**: Streams real-time updates as changes occur.

```yaml
  receivers:
    k8sobjects:
      auth_type: serviceAccount
      objects:
        - name: namespaces
          mode: pull
          interval: 3m
        - name: namespaces
          mode: watch
        - name: pods
          mode: pull
          interval: 3m
        - name: pods
          mode: watch
        - name: nodes
          mode: pull
          interval: 3m
        - name: nodes
          mode: watch
        - name: replicasets
          mode: pull
          interval: 3m
        - name: replicasets
          mode: watch
        - name: daemonsets
          mode: pull
          interval: 3m
        - name: daemonsets
          mode: watch
        - name: statefulsets
          mode: pull
          interval: 3m
          group: apps
        - name: statefulsets
          mode: watch
          group: apps
        - name: cronjobs
          mode: pull
          interval: 3m
        - name: cronjobs
          mode: watch
        - name: jobs
          mode: pull
          interval: 3m
        - name: jobs
          mode: watch
        - name: services
          mode: pull
          interval: 3m
        - name: services
          mode: watch
        - name: deployments
          mode: pull
          interval: 3m
          group: apps
        - name: deployments
          mode: watch
          group: apps
        - name: horizontalpodautoscalers
          mode: pull
          interval: 3m
          group: autoscaling
        - name: horizontalpodautoscalers
          mode: watch
          group: autoscaling
        - name: roles
          mode: pull
          interval: 3m
          group: rbac.authorization.k8s.io
        - name: roles
          mode: watch
          group: rbac.authorization.k8s.io
        - name: rolebindings
          mode: pull
          interval: 3m
          group: rbac.authorization.k8s.io
        - name: rolebindings
          mode: watch
          group: rbac.authorization.k8s.io
        - name: clusterroles
          mode: pull
          interval: 3m
          group: rbac.authorization.k8s.io
        - name: clusterroles
          mode: watch
          group: rbac.authorization.k8s.io
        - name: clusterrolebindings
          mode: pull
          interval: 3m
          group: rbac.authorization.k8s.io
        - name: clusterrolebindings
          mode: watch
          group: rbac.authorization.k8s.io
        - name: storageclasses
          mode: pull
          interval: 3m
          group: storage.k8s.io
        - name: storageclasses
          mode: watch
          group: storage.k8s.io
        - name: networkpolicies
          mode: pull
          interval: 3m
          group: networking.k8s.io
        - name: networkpolicies
          mode: watch
          group: networking.k8s.io
        - name: ingresses
          mode: pull
          interval: 3m
          group: networking.k8s.io
        - name: ingresses
          mode: watch
          group: networking.k8s.io
        - name: persistentvolumes
          mode: pull
          interval: 3m
        - name: persistentvolumes
          mode: watch
        - name: persistentvolumeclaims
          mode: pull
          interval: 3m
        - name: persistentvolumeclaims
          mode: watch
        - name: poddisruptionbudgets
          mode: pull
          interval: 3m
          group: policy
        - name: poddisruptionbudgets
          mode: watch
          group: policy
        - name: serviceaccounts
          mode: pull
          interval: 3m
        - name: serviceaccounts
          mode: watch
        - name: customresourcedefinitions
          mode: pull
          interval: 3m
          group: apiextensions.k8s.io
        - name: customresourcedefinitions
          mode: watch
          group: apiextensions.k8s.io
```

##### Processors and pipeline

Add a [`resourcedetection`][105] processor to detect the cluster UID and name.

- The `kubeadm` detector is required to detect the cluster UID (`k8s.cluster.uid`).
- Cluster name detection depends on your cloud provider. Check the [`resourcedetection` processor documentation][105] for supported providers (EKS, AKS, GCP) and required permissions.
- If your provider is not supported, use a `resource/add-cluster-name` processor to set the cluster name manually. Replace `<YOUR_CLUSTER_NAME>` with your cluster name.

Then wire the components together in a `logs/orchestrator` pipeline.

The following examples show two approaches. Use the cloud provider example if you run on EKS, AKS, or GCP. Use the manual fallback if your provider is not supported.

**Cloud provider detection (EKS example):**

```yaml
  processors:
    resourcedetection:
      detectors: [kubeadm, eks]
      override: false
      kubeadm:
        resource_attributes:
          k8s.cluster.name:
            enabled: false
      eks:
        resource_attributes:
          k8s.cluster.name:
            enabled: true

  service:
    pipelines:
      logs/orchestrator:
        receivers: [k8sobjects]
        processors: [resourcedetection]
        exporters: [datadog]
```

Replace `eks` with your provider's detector (`aks`, `gcp`). See the [`resourcedetection` processor documentation][105] for provider-specific configuration.

**Manual fallback:**

If the `resourcedetection` processor does not support your cloud provider, set the cluster name manually. Replace `<YOUR_CLUSTER_NAME>` with your cluster name:

```yaml
  processors:
    resourcedetection:
      detectors: [kubeadm]
      override: false
    resource/add-cluster-name:
      attributes:
        - key: k8s.cluster.name
          value: <YOUR_CLUSTER_NAME>
          action: upsert

  service:
    pipelines:
      logs/orchestrator:
        receivers: [k8sobjects]
        processors: [resourcedetection, resource/add-cluster-name]
        exporters: [datadog]
```

#### 3. Deploy with Helm

Install the OpenTelemetry Collector using your configuration file:

```sh
helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
helm repo update

helm install deployment-collector open-telemetry/opentelemetry-collector \
  --values ./deployment-collector.yaml
```

#### 4. Verify the installation

Open the [Kubernetes Explorer][1] and filter by your OpenTelemetry cluster name. All core Kubernetes resource sections should populate, along with **Custom Resources > CRD**. The **Custom Resources > Resources** section is not supported with this setup.

[1]: https://app.datadoghq.com/orchestration/overview
[100]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/k8sobjectsreceiver
[101]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[102]: https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/tag/v0.152.0
[104]: /getting_started/site/
[105]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/resourcedetectionprocessor
[106]: https://kubernetes.io/blog/2025/05/09/kubernetes-v1-33-streaming-list-responses/

{{% /tab %}}
{{< /tabs >}}

### Collect custom resources


### Add custom tags to resources

To ease filtering, you can add custom tags to your Kubernetes resources through the `DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS` environment variable. **These tags only appear in Kubernetes Explorer.**

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Set the `DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS` environment variable **twice** in `datadog-agent.yaml`:
- In `agents.containers.processAgent.env`
- In `clusterAgent.env` 

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

Set the `DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS` environment variable **twice** in `datadog-agent.yaml`:
- In `processAgent.env`
- In `clusterAgent.env` 

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

{{% /tab %}}
{{% tab "DaemonSet" %}}

Set the environment variable on both the Process Agent and Cluster Agent containers:

```yaml
- name: DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS
  value: "tag1:value1 tag2:value2"
```

{{% /tab %}}
{{< /tabs >}}

## Usage

### Views

Toggle among the {{< ui >}}Pods{{< /ui >}}, {{< ui >}}Clusters{{< /ui >}}, {{< ui >}}Namespaces{{< /ui >}}, and other Kubernetes resources in the {{< ui >}}Select Resources{{< /ui >}} dropdown menu in the top left corner of the page.

Each of these views includes a data table to help you better organize your data by field such as status, name, and Kubernetes labels, and a detailed Cluster Map to give you a bigger picture of your pods and Kubernetes clusters.

**See [Query filter details](#query-filter-details) for more details on how to filter these views.**

{{< img src="infrastructure/livecontainers/orch_ex_replicasets.png" alt="Orchestrator Explorer opened to show Workloads > Replica Sets, in Summary mode" style="width:80%;">}}

#### Group by functionality and facets

Group pods by tags, Kubernetes labels, or Kubernetes annotations to get an aggregated view which allows you to find information quicker. You can perform a group by using the "Group by" bar on the top right of the page or by clicking on a particular tag or label and locating the group by function in the context menu as shown below.

{{< img src="infrastructure/livecontainers/orch_ex_groupby.png" alt="An example of grouping by team" style="width:80%;">}}

You can also use facets on the left hand side of the page to group resources or filter for resources you care most about, such as pods with a CrashLoopBackOff pod status.

{{< img src="infrastructure/livecontainers/crashloopbackoff.mp4" alt="An example of grouping the CrashLoopBackOff pod status" video=true style="width:80%;">}}

### Cluster map

A cluster map gives you a bigger picture of your pods and Kubernetes clusters. You can see all of your resources together on one screen with customized groups and filters, and choose which metrics to fill the color of the nodes.

Examine resources from cluster maps by clicking on any circle or group to populate a detailed panel.

{{< img src="infrastructure/livecontainers/cluster-map.mp4" alt="A cluster map with customized groups and filters" video=true style="width:80%;">}}

### Information panel

Click on any row in the table or on any object in a Cluster Map to view information about a specific resource in a side panel.

{{< img src="infrastructure/livecontainers/orch_ex_panel.png" alt="A view of resources in the side panel, opened to processes." style="width:80%;">}}

The side panel's {{< ui >}}YAML{{< /ui >}} tab shows the full resource definition. Starting in **Agent version 7.44.0**, it also includes seven days of definition history. You can compare what changed over time and across different versions. The time indicated is approximately when the changes were applied to the resource.

To prevent displaying a large number of irrelevant changes, updates affecting only the following fields are ignored:

* metadata.resourceVersion
* metadata.managedFields
* metadata.generation
* metadata.annotations["kubernetes.io/config.seen"]
* status

{{< img src="infrastructure/livecontainers/orch_ex_manifest_history.png" alt="A view of resources in the side panel, showing the yaml history feature" style="width:80%;">}}

The other tabs show more information for troubleshooting the selected resource:

* [**Logs**][9]: View logs from your container or resource. Click on any log to view related logs in the Log Explorer.
* [**APM**][11]: View traces from your container or resource, including the date, service, duration, method, and status code of a trace.
* [**Metrics**][10]: View live metrics for your container or resource. You can view any graph full screen, share a snapshot of it, or export it from this tab.
* {{< ui >}}Processes{{< /ui >}}: View all processes running in the container of this resource.
* {{< ui >}}Network{{< /ui >}}: View a container or resource's network performance, including source, destination, sent and received volume, and throughput fields. Use the {{< ui >}}Destination{{< /ui >}} field to search by tags like `DNS` or `ip_type`, or use the {{< ui >}}Group by{{< /ui >}} filter in this view to group network data by tags, like `pod_name` or `service`.
* [**Events**][12]: View all Kubernetes events for your resource.
* {{< ui >}}Monitors{{< /ui >}}: View monitors tagged, scoped, or grouped for this resource.

For a detailed dashboard of this resource, click the View Dashboard in the top right corner of this panel.

{{< img src="infrastructure/livecontainers/view-pod-dashboard.png" alt="A link to a pod dashboard from Live Containers overview" style="width:80%;">}}

### Resource utilization

_For the Resource Utilization page, see [Resource Utilization][13]_.

Within the Kubernetes Explorer tab, you can explore a selection of resource utilization metrics.

{{< img src="infrastructure/livecontainers/orch_ex_resource_utilization.png" alt="Container Resource Utilization" style="width:80%;">}}

All of these columns support sorting, which helps you to pinpoint individual workloads based on their resource utilization.

{{< img src="infrastructure/livecontainers/orch_ex_resource_utilization_sorted_column.png" alt="Container Resource Utilization Sorted Columns" style="width:50%;">}}

## Query filter details

You can narrow down the displayed resources by supplying a query within the "Filter by" search bar on the top left of the page.

### Syntax

A query filter is composed of terms and operators. Example:

{{< img src="infrastructure/livecontainers/orch_syntax.png" alt="Orchestrator Explorer query filter syntax." style="width:80%;">}}

#### Terms

There are multiple types of terms available:

| Type | Examples |
|---|---|
| **Tags**: Attached to resources by [the agent collecting them][20]. There are also additional tags that Datadog generates for Kubernetes resources. | `datacenter:staging`, `tag#datacenter:staging`<br>_(the `tag#` is optional)_ |
| **Labels**: Extracted from [a resource's metadata][25]. They are typically used to organize your cluster and target specific resources with selectors. | `label#chart_version:2.1.0` |
| **Annotations**: Extracted from [a resource's metadata][26]. They are generally used to support tooling that aid in cluster management. | `annotation#checksum/configmap:a1bc23d4` |
| **Metrics**: Added to workload resources (pods, deployments, etc.). You can find resources based on their utilization. To see what metrics are supported, see [Resource Utilization Filters](#resource-utilization-filters). | `metric#cpu_usage_pct_limits_avg15:>80%` |
| **String matching**: Supported by some specific resource attributes, see below.<br>_Note: string matching does not use the key-value format, and you cannot specify the attribute to match on._ | `"10.132.6.23"` (IP),<br>`"9cb4b43f-8dc1-4a0e"` (UID),<br>`web-api-3` (Name) |
| **Fields**: Extracted from [a resource's metadata][27] or from custom resources' indexed fields. | `field#metadata.creationTimestamp:>=4wk`, `field#metadata.deletionTimestamp:<=1hr`, `field#status.currentReplicas:3`, `field#status.conditions.Active.status:True` |

>  ***Note**: You might find the same key-value pairs as both a tag and label (or annotation) - this is dependent on how your cluster is configured.*

The following resource attributes are supported in arbitrary **String Matching**:
- `metadata.name`
- `metadata.uid`
- IP Addresses found in:
  - Pods
  - Nodes (internal and external)
  - Services (cluster, external, and load balancer IPs)

You do not need to specify a key to search for a resource by name, or IP. Quotes are not required unless your string search includes certain special characters.

#### Comparators

All terms support the `:` equality operator. [Metric value](#resource-utilization-filters) terms support numeric comparisons as well:

- `:>` Greater than (for example, `metric#cpu_usage_avg15:>0.9`)
- `:>=` Greater than or equal
- `:<` Less than
- `:<=` Less than or equal

#### Operators

To combine multiple terms into a complex query, you can use any of the following case sensitive boolean operators:

| Operator | Description | Example |
|---|---|---|
| `AND` | **Intersection**: Both terms are in the selected events (if nothing is added, AND is taken by default) | `a AND b`   |
| `OR` | **Union**: Either term is contained in the selected events                                             | `a OR b`   |
| `NOT` / `-` | **Exclusion**: The following term is NOT in the event (apply to each individual raw text search) | `a AND NOT b` or<br>`a AND -b` |
|  `( )` | **Grouping:** Specify how to group terms logically. | `a AND (b OR c)` or<br>`(a AND b) or c` |

##### `OR` value shorthand

Multiple terms sharing the same key can be combined into a single term if they all use the `OR` operator. For example, this query:

```
app_name:web-server OR app_name:database OR app_name:event-consumer
```

Can be reduced to:

```
app_name:(web-server OR database OR event-consumer)
```

### Wildcards

You can use `*` wildcards as part of a term to filter by partial matches, both for values and keys. Some examples:

- `kube_job:stats-*`: Find all resources with a `kube_deployment` tag value starting with `stats-`.
- `pod_name:*canary`: Find all resources with a `pod_name` value ending in `canary`.
- `label#release:*`: Find all resources with a `release` label, regardless of its value.
- `-label#*.datadoghq.com/*`: Find resources that do not have any Datadog scoped labels.
- `kube_*:*stats*canary`: Find resources that have related resource tags (`kube_*`), with  `stats` in the middle of the value, also ending with `canary`.

### Extracted tags

In addition to the tags you have [configured][20] within your Datadog agent, Datadog injects generated tags based on resource attributes that can help your searching and grouping needs. These tags are added to resources conditionally, when they are relevant.

#### All resources

All resources have the `kube_cluster_name` tag and all namespaced resources have the `kube_namespace` tag added to them.

Additionally, resources contain a `kube_<api_kind>:<metadata.name>` tag. For example, a deployment named `web-server-2` would have the `kube_deployment:web-server-2` tag automatically added to it.

> **Note**: There are some exceptions to this pattern:
>
> - Pods use `pod_name` instead.
> - *VPAs: `verticalpodautoscaler`*.
> - *HPAs: `horizontalpodautoscaler`*.
> - *Persistent Volume Claims: `persistentvolumeclaim`*.

Based on the labels attached to the resource, the following tags will also be extracted:

| Tag | Source Label |
|---|---|
| `kube_app_name` | `app.kubernetes.io/name` |
| `kube_app_instance` | `app.kubernetes.io/instance` |
| `kube_app_version` | `app.kubernetes.io/version` |
| `kube_app_component` | `app.kubernetes.io/component` |
| `kube_app_part_of` | `app.kubernetes.io/part-of` |
| `kube_app_managed_by` | `app.kubernetes.io/managed-by` |
| `env` | `tags.datadoghq.com/env` |
| `version` | `tags.datadoghq.com/version` |
| `service` | `tags.datadoghq.com/service` |

#### Relationships

Related Resources will be tagged with each other. Some examples:

- A pod that is part of the "XYZ" deployment will have a `kube_deployment:xyz` tag.
- An ingress that points at service "A" will have a `kube_service:a` tag.

Resources that are spawned from "parent" resources will have the `kube_ownerref_kind` and `kube_ownerref_name` tags (such as pods and jobs).

> **Tip:** Utilize the filter query autocomplete feature to discover what related resource tags are available. Type `kube_` and see what results are suggested.

#### Pods

Pods are given the following tags:

- `pod_name`
- `pod_phase` (extracted from the manifest)
- `pod_status` (calculated similarly to `kubectl`)

#### Workloads

Workload resources (pods, deployments, stateful sets, etc.) will have the following tags, indicating their support within the Resources Utilization page:

- `resource_utilization` (`supported` or `unsupported`)
- `missing_cpu_requests`
- `missing_cpu_limits`
- `missing_memory_requests`
- `missing_memory_limits`

#### Conditions

Some conditions, for some resources, are extracted as tags. For example, you can find the `kube_condition_available` tag on deployments. The tag format is always `kube_condition_<name>` with a `true` or `false` value.

> **Tip**: Use the autocomplete feature to discover what conditions are available on a given resource type by entering `kube_condition` and reviewing the results.

#### Resource specific tags

Some resources have specific tags that are extracted based on your cluster's environment. The following tags are available in addition to the shared tags above.

| Resource | Extracted Tags |
|---|---|
| **Cluster** | `api_server_version`<br>`kubelet_version` |
| **Custom Resource Definitions** &<br>**Custom Resources** | `kube_crd_kind`<br>`kube_crd_group`<br>`kube_crd_version`<br>`kube_crd_scope`<br>`kube_crd_resource` |
| **Namespace** | `phase` |
| **Node** | `kube_node_unschedulable`<br>`kube_node_kubelet_version`<br>`kube_node_kernel_version`<br>`kube_node_runtime_version`<br>`eks_fargate_node`<br>`node_schedulable`<br>`node_status` |
| **Persistent Volume** | `kube_reclaim_policy`<br>`kube_storage_class_name`<br>`pv_type`<br>`pv_phase` |
| **Persistent Volume Claim** | `pvc_phase`<br>`kube_storage_class_name` |
| **Pod** | `pod_name` (instead of `kube_pod`)<br>`pod_phase` (extracted from the Manifest)<br>`pod_status` (calculated similarly to `kubectl`) |
| **Service** | `kube_service_type`<br>`kube_service_port` |

### Resource Utilization Filters

The following workload resources are enriched with resource utilization metrics:

- Clusters
- Nodes
- Pods

These metrics are calculated at the time of collection, based on the average values over the last 15 minutes. You can filter by metric values like so: `metric#<metric_name><comparator><numeric_value>`.

- `metric_name` is an available metric (see below)
- `comparator` is a supported [comparator](#comparator)
- and `numeric_value` is a floating point value.

For Pods, the following metric names are available:

| CPU | Memory |
|---|---|
| `cpu_limits_avg15` | `mem_limits_avg15` |
| `cpu_requests_avg15` | `mem_requests_avg15` |
| `cpu_usage_avg15` | `mem_usage_avg15` |
| `cpu_usage_pct_limits_avg15` | `mem_usage_pct_limits_avg15` |
| `cpu_usage_pct_requests_avg15` | `mem_usage_pct_requests_avg15` |
| `cpu_waste_avg15` | `mem_waste_avg15` |

In addition, clusters, and nodes have the following metrics available to them:

- `cpu_usage_pct_alloc_avg15`
- `cpu_requests_pct_alloc_avg15`
- `mem_usage_pct_alloc_avg15`
- `mem_requests_pct_alloc_avg15`

#### Metric units

CPU metrics are stored as a number of cores.

Memory metrics are stored as bytes.

Percents (`*_pct_*`) are stored as floats, where `0.0` is 0%, and `1.0` is 100%. The value is the ratio of the two indicated metrics - for example `cpu_usage_pct_limits_avg15` is the value of `usage / limits`. Metric values can be above 100%, such as Percentage CPU Usage of Requests.

## Notes and known issues

* Data is updated automatically in constant intervals.
* In clusters with 1000+ Deployments or ReplicaSets you may notice elevated CPU usage from the Cluster Agent. There is an option to disable container scrubbing in the Helm chart. See [the Helm Chart repo][15] for more details.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/orchestration/overview
[2]: /infrastructure/containers/?tab=datadogoperator#setup
[9]: /logs
[10]: /metrics
[11]: /tracing
[12]: /events
[13]: /infrastructure/containers/kubernetes_resource_utilization
[15]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog
[20]: /getting_started/tagging/assigning_tags/?tab=containerizedenvironments
[25]: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/
[26]: https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/
[27]: https://kubernetes.io/docs/concepts/overview/working-with-objects/field-selectors/
