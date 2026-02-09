---
title: Kubernetes Autoscaling
description: Automatically scale Kubernetes workloads using Datadog metrics and intelligent scaling recommendations
aliases:
- /containers/monitoring/autoscaling
further_reading:
- link: https://www.datadoghq.com/blog/kubernetes-custom-query-autoscaling
  tag: Blog
  text: Optimize Kubernetes workloads with Custom Query Scaling
- link: https://www.datadoghq.com/blog/ddot-gateway
  tag: Blog
  text: Centralize and govern your OpenTelemetry pipeline with the DDOT gateway
- link: "https://www.datadoghq.com/blog/datadog-kubernetes-autoscaling/"
  tag: "Blog"
  text: "Rightsize workloads and reduce costs with Datadog Kubernetes Autoscaling"
- link: "/infrastructure/containers/kubernetes_resource_utilization"
  tag: "Documentation"
  text: "Kubernetes Resource Utilization"
- link: "/account_management/rbac/permissions"
  tag: "Documentation"
  text: "Datadog Role Permissions"
- link: "/agent/remote_config/"
  tag: "Documentation"
  text: "Remote Configuration"
---

{{< site-region region="gov" >}}
<div class="alert alert-info">
  This feature is not available for the Datadog for Government (US1-FED) site.
</div>
{{< /site-region >}}

Datadog Kubernetes Autoscaling continuously monitors your Kubernetes resources to provide immediate scaling recommendations and multidimensional autoscaling of your Kubernetes workloads. You can deploy autoscaling through the Datadog web interface, or with a `DatadogPodAutoscaler` custom resource.

## How it works
Datadog uses real-time and historical utilization metrics and event signals from your existing Datadog Agents to make recommendations. You can then examine these recommendations and choose to deploy them.

By default, Datadog Kubernetes Autoscaling uses estimated CPU and memory cost values to show savings opportunities and impact estimates. You can also use Kubernetes Autoscaling alongside [Cloud Cost Management](#idle-cost-and-savings-estimates) to get reporting based on your exact instance type costs.

Automated workload scaling is powered by a `DatadogPodAutoscaler` custom resource that defines scaling behavior on a per-workload level. The Datadog Cluster Agent acts as the controller for this custom resource.

Each cluster can have a maximum of 1000 workloads optimized with Datadog Kubernetes Autoscaler.

### Compatibility

- **Distributions**: This feature is compatible with all of Datadog's [supported Kubernetes distributions][5].
- **Workload autoscaling**: This feature is an alternative to Horizontal Pod Autoscaler (HPA) and Vertical Pod Autoscaler (VPA). Datadog recommends that you remove any HPAs or VPAs from a workload when enabling Datadog Kubernetes Autoscaling to optimize it. These workloads are identified in the application on your behalf.
**Note:** You can experiment with Datadog Kubernetes Autoscaling while keeping your HPA and/or VPA by creating a `DatadogPodAutoscaler` with `mode: Preview` in the `applyPolicy` section.

### Requirements

- [Remote Configuration][1] must be enabled both at the organization level and on the Agents in your target cluster. See [Enabling Remote Configuration][2] for setup instructions.
- [Helm][3], for updating your Datadog Agent.
- (For Datadog Operator users) [`kubectl` CLI][4], for updating the Datadog Agent.
- When you are using live autoscaling, Datadog recommends using the latest Datadog Agent version. This helps ensure access to the latest improvements and optimizations. Scaling recommendations require the [Kubernetes State Core][9] integration to be enabled. <br/><br/>

   | Feature | Minimum Agent Version |
   |---------|----------------------|
   | In-app workload scaling recommendations | 7.50+ |
   | Live workload scaling | 7.66.1+ |
   | Argo Rollout recommendations and autoscaling | 7.71+ |
   | Cluster autoscaling ([preview sign-up][10]) | 7.72+ |

- The following user permissions:
   - Org Management (required for Remote Configuration)
   - API Keys Write (required for Remote Configuration)
   - Workload Scaling Write
   - Autoscaling Manage
- (Recommended) Linux kernel v5.19+ and cgroup v2

## Setup

{{< tabs >}}
{{% tab "Datadog Operator" %}}

1. Ensure you are using Datadog Operator v1.16.0+. To upgrade your Datadog Operator:

```shell
helm upgrade datadog-operator datadog/datadog-operator
```

2. Add the following to your `datadog-agent.yaml` configuration file:

```yaml
spec:
  features:
    autoscaling:
      workload:
        enabled: true
    eventCollection:
      unbundleEvents: true
  override:
    clusterAgent:
      env:
        - name: DD_AUTOSCALING_FAILOVER_ENABLED
          value: "true"
    nodeAgent:
      env:
        - name: DD_AUTOSCALING_FAILOVER_ENABLED
          value: "true"
```

3. [Admission Controller][1] is enabled by default with the Datadog Operator. If you disabled it, re-enable it by adding the following highlighted lines to `datadog-agent.yaml`:

{{< highlight yaml "hl_lines=4-5" >}}
...
spec:
  features:
    admissionController:
      enabled: true
...
{{< /highlight >}}

4. Apply the updated `datadog-agent.yaml` configuration:

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

[1]: /containers/cluster_agent/admission_controller/

{{% /tab %}}
{{% tab "Helm" %}}

1. Ensure you are using Agent and Cluster Agent v7.66.1+. Add the following to your `datadog-values.yaml` configuration file:

```yaml
datadog:
  autoscaling:
    workload:
      enabled: true
  kubernetesEvents:
    unbundleEvents: true
```

2. [Admission Controller][1] is enabled by default in the Datadog Helm chart. If you disabled it, re-enable it by adding the following highlighted lines to `datadog-values.yaml`:
{{< highlight yaml "hl_lines=5-6" >}}
...
clusterAgent:
  admissionController:
    enabled: true
...
{{< /highlight >}}

3. Update your Helm version:

```shell
helm repo update
```

4. Redeploy the Datadog Agent with your updated `datadog-values.yaml`:

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```

[1]: /containers/cluster_agent/admission_controller/

{{% /tab %}}
{{< /tabs >}}

### Idle cost and savings estimates

{{< tabs >}}
{{% tab "With Cloud Cost Management" %}}
If [Cloud Cost Management][1] is enabled within an org, Datadog Kubernetes Autoscaling shows idle cost and savings estimates based on your exact bill cost of underlying monitored instances.

See Cloud Cost setup instructions for [AWS][2], [Azure][3], or [Google Cloud][4].

Cloud Cost Management data enhances Kubernetes Autoscaling, but it is not required. All of Datadog's workload recommendations and autoscaling decisions are valid and functional without Cloud Cost Management.

[1]: /cloud_cost_management
[2]: /cloud_cost_management/aws
[3]: /cloud_cost_management/azure
[4]: /cloud_cost_management/google_cloud
{{% /tab %}}

{{% tab "Default" %}}
If Cloud Cost Management is **not** enabled, Datadog Kubernetes Autoscaling shows idle cost and savings estimates using the following formulas and fixed values:

**Cluster idle**:
```
  (cpu_capacity - max(cpu_usage, cpu_requests)) * core_rate_per_hour
+ (mem_capacity - max(mem_usage, mem_requests)) * memory_rate_per_hour
```

**Workload idle**:
```
  (max(cpu_usage, cpu_requests) - cpu_usage) * core_rate_per_hour
+ (max(mem_usage, mem_requests) - mem_usage) * memory_rate_per_hour
```

**Fixed values**:
- core_rate_per_hour = $0.0295 per CPU core hour
- memory rate_per_hour = $0.0053 per memory GB hour


_Fixed cost values are subject to refinement over time._
{{% /tab %}}
{{< /tabs >}}

## Usage

### Identify resources to rightsize

The [Autoscaling Summary page][6] provides a starting point for platform teams to understand the total Kubernetes Resource savings opportunities across an organization, and filter down to key clusters and namespaces. The [Cluster Scaling view][7] provides per-cluster information about total idle CPU, total idle memory, and costs. Click on a cluster for detailed information and a table of the cluster's workloads. If you are an individual application or service owner, you can also filter by your team or service name directly from the [Workload Scaling list view][8].

Click **Optimize** on any workload to see its scaling recommendation.

### Enable Autoscaling for a workload

After you identify a workload to optimize, Datadog recommends inspecting its **Scaling Recommendation**. You can also click **Configure Recommendation** to add constraints or adjust target utilization levels.

When you are ready to proceed with enabling Autoscaling for a workload, you have two options for deployment:

- Click **Enable Autoscaling**. (Requires Workload Scaling Write permission.)

   Datadog automatically installs and configures autoscaling for this workload on your behalf.

- Deploy a `DatadogPodAutoscaler` custom resource.

   Use your existing deploy process to target and configure Autoscaling for your workload. See the [example configurations](#example-datadogpodautoscaler-configurations) below.

### Example DatadogPodAutoscaler configurations

The following examples demonstrate common `DatadogPodAutoscaler` configurations for different scaling strategies. You can use these as starting points and adjust the values to match your workload's requirements.

{{< tabs >}}
{{% tab "Optimize Cost" %}}

The **Optimize Cost** profile uses multidimensional scaling to aggressively reduce resource waste. It sets a high CPU utilization target (85%), allows scaling down to a single replica, and uses aggressive scale-down rules for fast response to reduced load.

```yaml
apiVersion: datadoghq.com/v1alpha2
kind: DatadogPodAutoscaler
metadata:
    name: <WORKLOAD_NAME>
    namespace: <NAMESPACE>
spec:
    targetRef:
        apiVersion: apps/v1
        kind: Deployment
        name: <WORKLOAD_NAME>
    owner: Local
    applyPolicy:
        mode: Apply
        scaleDown:
            rules:
                # Aggressive: allow 50% reduction every 2 minutes
                - periodSeconds: 120
                  type: Percent
                  value: 50
            stabilizationWindowSeconds: 300
            strategy: Max
        scaleUp:
            rules:
                - periodSeconds: 120
                  type: Percent
                  value: 50
            stabilizationWindowSeconds: 300
            strategy: Max
        update:
            strategy: Auto
    constraints:
        containers:
            - enabled: true
              name: '*'
        maxReplicas: 100
        # Allow scaling down to 1 replica for maximum savings
        minReplicas: 1
    objectives:
        # High utilization target to maximize cost efficiency
        - type: PodResource
          podResource:
            name: cpu
            value:
                type: Utilization
                utilization: 85
    fallback:
        horizontal:
            direction: ScaleUp
            enabled: true
            objectives:
                - type: PodResource
                  podResource:
                    name: cpu
                    value:
                        type: Utilization
                        utilization: 85
            triggers:
                staleRecommendationThresholdSeconds: 600
```

{{% /tab %}}
{{% tab "Optimize Balance" %}}

The **Optimize Balance** profile provides a middle ground between cost optimization and stability. It uses a moderate CPU utilization target (70%), maintains at least 2 replicas, and applies conservative scale-down rules to avoid disruptive scaling events.

```yaml
apiVersion: datadoghq.com/v1alpha2
kind: DatadogPodAutoscaler
metadata:
    name: <WORKLOAD_NAME>
    namespace: <NAMESPACE>
spec:
    targetRef:
        apiVersion: apps/v1
        kind: Deployment
        name: <WORKLOAD_NAME>
    owner: Local
    applyPolicy:
        mode: Apply
        scaleDown:
            rules:
                # Conservative: allow only 20% reduction every 20 minutes
                - periodSeconds: 1200
                  type: Percent
                  value: 20
            stabilizationWindowSeconds: 600
            strategy: Max
        scaleUp:
            rules:
                - periodSeconds: 120
                  type: Percent
                  value: 50
            stabilizationWindowSeconds: 600
            strategy: Max
        update:
            strategy: Auto
    constraints:
        containers:
            - enabled: true
              name: '*'
        maxReplicas: 100
        # Maintain at least 2 replicas for availability
        minReplicas: 2
    objectives:
        # Moderate utilization target balances cost and performance
        - type: PodResource
          podResource:
            name: cpu
            value:
                type: Utilization
                utilization: 70
    fallback:
        horizontal:
            direction: ScaleUp
            enabled: true
            objectives:
                - type: PodResource
                  podResource:
                    name: cpu
                    value:
                        type: Utilization
                        utilization: 70
            triggers:
                staleRecommendationThresholdSeconds: 600
```

{{% /tab %}}
{{% tab "Vertical CPU and Memory" %}}

The **Vertical only** profile scales by adjusting CPU and memory requests and limits on existing pods, without changing the replica count. This is useful for workloads that cannot be horizontally scaled, or where you want to rightsize individual pods.

```yaml
apiVersion: datadoghq.com/v1alpha2
kind: DatadogPodAutoscaler
metadata:
    name: <WORKLOAD_NAME>
    namespace: <NAMESPACE>
spec:
    targetRef:
        apiVersion: apps/v1
        kind: Deployment
        name: <WORKLOAD_NAME>
    owner: Local
    applyPolicy:
        mode: Apply
        # Horizontal scaling disabled; only vertical resizing
        scaleDown:
            strategy: Disabled
        scaleUp:
            strategy: Disabled
        update:
            strategy: Auto
    constraints:
        containers:
            - enabled: true
              name: '*'
        maxReplicas: 100
        minReplicas: 2
    # No objectives defined — Datadog recommends CPU and memory
    # values based on observed usage patterns
    fallback:
        horizontal:
            direction: ScaleUp
            # Horizontal fallback disabled for vertical-only scaling
            enabled: false
            objectives:
                - type: PodResource
                  podResource:
                    name: cpu
                    value:
                        type: Utilization
                        utilization: 70
            triggers:
                staleRecommendationThresholdSeconds: 600
```

{{% /tab %}}
{{% tab "Horizontal Custom Query" %}}

The **Horizontal only with Custom Query** profile scales replica count based on a custom Datadog metric query instead of CPU or memory utilization. This is useful for workloads where application-level metrics (such as queue depth, request latency, or throughput) are better indicators of scaling need.

```yaml
apiVersion: datadoghq.com/v1alpha2
kind: DatadogPodAutoscaler
metadata:
    name: <WORKLOAD_NAME>
    namespace: <NAMESPACE>
spec:
    targetRef:
        apiVersion: apps/v1
        kind: Deployment
        name: <WORKLOAD_NAME>
    owner: Local
    applyPolicy:
        mode: Apply
        scaleDown:
            rules:
                - periodSeconds: 1200
                  type: Percent
                  value: 20
            stabilizationWindowSeconds: 600
            strategy: Min
        scaleUp:
            rules:
                - periodSeconds: 120
                  type: Percent
                  value: 50
            stabilizationWindowSeconds: 600
            strategy: Min
        # Vertical updates disabled — horizontal only
        update:
            strategy: Disabled
    constraints:
        maxReplicas: 100
        minReplicas: 2
    objectives:
        - type: CustomQuery
          customQuery:
            # Replace with your own Datadog metric query
            request:
                formula: usage
                queries:
                    - name: usage
                      source: Metrics
                      metrics:
                        query: avg:redis.info.latency_ms{kube_cluster_name:<CLUSTER_NAME>,kube_namespace:<NAMESPACE>,kube_deployment:<WORKLOAD_NAME>}
            value:
                type: AbsoluteValue
                absoluteValue: 500M
            window: 5m0s
    fallback:
        horizontal:
            direction: ScaleUp
            enabled: false
            objectives:
                - type: PodResource
                  podResource:
                    name: cpu
                    value:
                        type: Utilization
                        utilization: 70
            triggers:
                staleRecommendationThresholdSeconds: 600
```

{{% /tab %}}
{{< /tabs >}}

### Deploy recommendations manually

As an alternative to Autoscaling, you can also deploy Datadog's scaling recommendations manually. When you configure resources for your Kubernetes deployments, use the values suggested in the scaling recommendations. You can also click **Export Recommendation** to see a generated `kubectl patch` command.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/remote_config
[2]: /agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[3]: https://helm.sh/
[4]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[5]: /containers/kubernetes/distributions
[6]: https://app.datadoghq.com/orchestration/scaling/summary
[7]: https://app.datadoghq.com/orchestration/scaling/cluster
[8]: https://app.datadoghq.com/orchestration/scaling/workload
[9]: /integrations/kubernetes_state_core/
[10]: https://www.datadoghq.com/product-preview/kubernetes-cluster-autoscaling/
