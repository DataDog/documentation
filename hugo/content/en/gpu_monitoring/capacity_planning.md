---
title: Plan GPU Capacity with GPU Monitoring
description: Track GPU quota usage across teams and queues, find oversubscribed GPU types, and understand why workloads are pending or evicted.
further_reading:
- link: "/gpu_monitoring/setup"
  tag: "Documentation"
  text: "Set up GPU Monitoring"
- link: "/gpu_monitoring/explorer"
  tag: "Documentation"
  text: "Analyze your GPU fleet with GPU Monitoring Explorer"
- link: "/gpu_monitoring"
  tag: "Documentation"
  text: "Learn more about what GPU Monitoring offers"
---

{{< callout url="https://www.datadoghq.com/product-preview/gpu-monitoring-capacity-planning/" >}}
Capacity Planning in GPU Monitoring is in Early Access Preview. Complete the form to request access.
{{< /callout >}}

## Overview

When many teams share pools of expensive GPUs, it is hard to see which teams are underusing their devices. It is also hard to spot resource contention and to tell why jobs are stuck pending. The Capacity Planning page in GPU Monitoring gives platform teams and workload owners one shared view of GPU provisioning across queues. No manual filtering or querying is required. Use it to run workloads reliably and get more out of your GPU fleet.

With the Capacity Planning page, you can answer questions such as:

- **Which teams or projects are over- or underusing their quota?** Find unused quota and reallocate compute fairly across your organization.
- **Which GPU types are oversubscribed?** Identify where demand exceeds quota so you can add capacity.
- **What is the current state of a workload?** See whether each workload is admitted, pending, or evicted, and how many GPUs it uses.
- **Why is a workload delayed or evicted?** Correlate pending and preempted workloads with quota and contention in their queue.

{{< img src="gpu_monitoring/capacity-planning-page-3.png" alt="Capacity Planning page in GPU Monitoring showing GPU quota, idle allocated GPU, preemption, fleet coverage, and saturation graphs above a list of workloads." style="width:100%;" >}}

## Prerequisites

To use the Capacity Planning page, you must meet the following criteria:
- You have [GPU Monitoring enabled][1].
- You are running Datadog Agent and Cluster Agent version 7.84.1 or later. To upgrade, see [Upgrade the Agent with Fleet Automation][2].
- Your GPU workloads run on Kubernetes and are managed by Kueue.

## Setup

The Capacity Planning page combines two sources of data:

- **Kueue metrics**, such as GPU quota and usage for each ClusterQueue. The Kueue integration collects these metrics.
- **GPU Monitoring metrics tagged with Kueue metadata**, such as the Kueue workload and resource flavor that each GPU is allocated to. The Cluster Agent collects this metadata.

Complete the following steps to collect both.

### Collect Kueue metrics

1. In the Kueue configuration, set `metrics.enableClusterQueueResources: true` and restart the Kueue controller manager. Kueue reports ClusterQueue quota and usage metrics, such as `kueue.cluster_queue.nominal_quota.gpu` and `kueue.cluster_queue.resource_usage.gpu`, only when this setting is enabled. The Capacity Planning graphs require these metrics.
2. Install the [Kueue integration][3] and configure the Kueue check as a cluster check. For instructions, see the [Kueue integration documentation][4].
3. Confirm that the Kueue check runs successfully on its assigned Agent and reports quota and usage metrics before continuing. For steps to check discovery, dispatching, and Agent status, see [Troubleshooting Cluster and Endpoint Checks][7].

### Collect Kueue metadata in the Cluster Agent

The Cluster Agent reads Kueue ClusterQueue, LocalQueue, ResourceFlavor, and Workload resources. It tags GPU metrics with the Kueue workload, queue, and resource flavor that each GPU is allocated to. To collect this metadata, grant the Cluster Agent read access to Kueue resources, then enable Kueue metadata collection.

#### Grant the Cluster Agent access to Kueue resources

1. Find the name of the Cluster Agent service account. The Cluster Agent deployment name ends in `-cluster-agent`:

   ```shell
   kubectl get deployments -n <DATADOG_NAMESPACE> -o custom-columns=NAME:.metadata.name,SERVICE_ACCOUNT:.spec.template.spec.serviceAccountName
   ```

2. Create a file named `datadog-cluster-agent-kueue-rbac.yaml` with the following content. Replace `<CLUSTER_AGENT_SERVICE_ACCOUNT>` with the service account name from the previous step, and `<DATADOG_NAMESPACE>` with the namespace where the Datadog Agent is installed.

   ```yaml
   apiVersion: rbac.authorization.k8s.io/v1
   kind: ClusterRole
   metadata:
     name: datadog-cluster-agent-kueue
   rules:
     - apiGroups:
         - kueue.x-k8s.io
       resources:
         - clusterqueues
         - localqueues
         - resourceflavors
         - workloads
       verbs:
         - list
         - watch
   ---
   apiVersion: rbac.authorization.k8s.io/v1
   kind: ClusterRoleBinding
   metadata:
     name: datadog-cluster-agent-kueue
   roleRef:
     apiGroup: rbac.authorization.k8s.io
     kind: ClusterRole
     name: datadog-cluster-agent-kueue
   subjects:
     - kind: ServiceAccount
       name: <CLUSTER_AGENT_SERVICE_ACCOUNT>
       namespace: <DATADOG_NAMESPACE>
   ```

3. Apply the file:

   ```shell
   kubectl apply -f datadog-cluster-agent-kueue-rbac.yaml
   ```

#### Enable Kueue metadata collection

Choose the tab that matches how you manage the Cluster Agent. Merge the example into your existing configuration, preserving its other settings.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

1. In your `DatadogAgent` resource, set the `DD_CLUSTER_AGENT_KUEUE_ENABLED` environment variable on the Cluster Agent:

   ```yaml
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
   spec:
     override:
       clusterAgent:
         env:
           - name: DD_CLUSTER_AGENT_KUEUE_ENABLED
             value: "true"
   ```

2. Apply your changes. The Datadog Operator redeploys the Cluster Agent with the new configuration.

   ```shell
   kubectl apply -n <DATADOG_NAMESPACE> -f datadog-agent.yaml
   ```

{{% /tab %}}
{{% tab "Helm" %}}

1. In your `datadog-values.yaml` file, set the `DD_CLUSTER_AGENT_KUEUE_ENABLED` environment variable on the Cluster Agent:

   ```yaml
   clusterAgent:
     env:
       - name: DD_CLUSTER_AGENT_KUEUE_ENABLED
         value: "true"
   ```

2. Upgrade your Helm release. Helm redeploys the Cluster Agent with the new configuration.

   ```shell
   helm upgrade -n <DATADOG_NAMESPACE> -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
   ```

{{% /tab %}}
{{% tab "Kubernetes manifests" %}}

1. In your existing Cluster Agent Deployment manifest, add the following entry to the Cluster Agent container's `env` list under `spec.template.spec.containers`:

   ```yaml
   - name: DD_CLUSTER_AGENT_KUEUE_ENABLED
     value: "true"
   ```

2. Apply the updated manifest. Replace `cluster-agent-deployment.yaml` with your manifest's filename. Kubernetes rolls out the updated Cluster Agent pods.

   ```shell
   kubectl apply -n <DATADOG_NAMESPACE> -f cluster-agent-deployment.yaml
   ```

{{% /tab %}}
{{< /tabs >}}

### Verify the setup

After Kueue-managed workloads start running on GPUs:

1. In the [Metrics Explorer][6], filter by `kube_cluster_name` and `kueue_cluster_queue` for the cluster and ClusterQueue you configured. Query `kueue.cluster_queue.nominal_quota.gpu` and `kueue.cluster_queue.resource_usage.gpu`. If either metric has no data, check the Kueue check configuration and the `metrics.enableClusterQueueResources` setting.
2. Using the same filters, query `gpu.gr_engine_active` grouped by `kueue_workload` and `kueue_resource_flavor`. Confirm that your running workload and its resource flavor appear. If either is missing, check that Kueue metadata collection is enabled. Also inspect the Cluster Agent logs for permission errors on `kueue.x-k8s.io` resources.
3. Open the [Capacity Planning page][5] and filter to the same cluster and ClusterQueue. Confirm that the queue and running workload appear.

## Explore the Capacity Planning page

To get started, navigate to the [Capacity Planning page][5] in GPU Monitoring.

### Filter by team and queue

Use the filters at the top of the page to scope the view. You can filter by {{< ui >}}Team{{< /ui >}}, {{< ui >}}Cluster Name{{< /ui >}}, {{< ui >}}Cluster Queue{{< /ui >}}, {{< ui >}}Resource Flavor{{< /ui >}}, {{< ui >}}Provider{{< /ui >}}, {{< ui >}}Datacenter{{< /ui >}}, and {{< ui >}}Environment{{< /ui >}}. Save a filtered view to return to it later.

### Quota and utilization

The graphs at the top of the page show how GPU quota is used across your fleet:

| Graph | Description |
|-------|-------------|
| GPU Quota Unallocated - Count | Number of GPUs in quota that are not in use, grouped by ClusterQueue. |
| GPU Quota Unallocated - Percent | Percentage of GPU quota that is not in use, grouped by ClusterQueue. |
| Idle Allocated GPUs | Number of allocated GPUs that are not doing engine work, grouped by ClusterQueue. |
| Preemption Rate | Workloads evicted by preemption per admitted workload, grouped by ClusterQueue. |
| Fleet GPU Coverage | Allocated GPU quota split into active, idle, and unattributed devices across the fleet. |
| Saturation - GPUs Over Quota | ClusterQueue and ResourceFlavor pairs ranked by the number of GPUs used beyond their nominal quota. |

Queues with high unallocated quota or many idle allocated GPUs are candidates for reallocation. Queues that consistently run over quota, or have a high preemption rate, may need more capacity.

### Queues and workloads

The table at the bottom of the page has two tabs:

- {{< ui >}}Queues{{< /ui >}}: Lists each queue with its quota and usage.
- {{< ui >}}Workloads{{< /ui >}}: Lists each workload with its team, cluster, ClusterQueue, GPU usage by resource flavor, and latest status, such as {{< ui >}}Admitted{{< /ui >}}.

Use the {{< ui >}}Workloads{{< /ui >}} tab to check the current state of a workload and to investigate workloads that are pending or were evicted.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /gpu_monitoring/setup
[2]: /agent/guide/upgrade_agent_fleet_automation/
[3]: https://app.datadoghq.com/integrations?search=kueue
[4]: /integrations/kueue/
[5]: https://app.datadoghq.com/gpu-monitoring?mConfigure=false&mPage=capacity-planning
[6]: /metrics/explorer/
[7]: /containers/troubleshooting/cluster-and-endpoint-checks/
