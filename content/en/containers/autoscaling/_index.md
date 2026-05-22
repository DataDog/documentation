---
title: Kubernetes Autoscaling
description: Automatically scale Kubernetes workloads using Datadog metrics and intelligent scaling recommendations
aliases:
- /containers/monitoring/autoscaling
further_reading:
- link: "/infrastructure/containers/kubernetes_resource_utilization"
  tag: "Documentation"
  text: "Kubernetes Resource Utilization"
- link: "/account_management/rbac/permissions"
  tag: "Documentation"
  text: "Datadog Role Permissions"
- link: "/agent/remote_config/"
  tag: "Documentation"
  text: "Remote Configuration"
- link: "https://www.datadoghq.com/blog/autoscaling-custom-metrics"
  tag: "Blog"
  text: "Scaling Kubernetes workloads on custom metrics"
- link: https://www.datadoghq.com/blog/kubernetes-custom-query-autoscaling
  tag: Blog
  text: Optimize Kubernetes workloads with Custom Query Scaling
- link: https://www.datadoghq.com/blog/ddot-gateway
  tag: Blog
  text: Centralize and govern your OpenTelemetry pipeline with the DDOT gateway
- link: "https://www.datadoghq.com/blog/datadog-kubernetes-autoscaling/"
  tag: "Blog"
  text: "Rightsize workloads and reduce costs with Datadog Kubernetes Autoscaling"
---

{{< site-region region="gov,gov2" >}}
<div class="alert alert-info">
  This feature is not available for the Datadog for Government ({{< region-param key="dd_datacenter" >}}) site.
</div>
{{< /site-region >}}

Datadog Kubernetes Autoscaling continuously monitors your Kubernetes resources to provide immediate scaling recommendations and multidimensional autoscaling of your Kubernetes workloads. You can deploy autoscaling through the Datadog web interface, or with a `DatadogPodAutoscaler` custom resource.

## How it works
Datadog uses real-time and historical utilization metrics and event signals from your existing Datadog Agents to make recommendations. You can then examine these recommendations and choose to deploy them.

By default, Datadog Kubernetes Autoscaling uses estimated CPU and memory cost values to show savings opportunities and impact estimates. You can also use Kubernetes Autoscaling alongside [Cloud Cost Management](#idle-cost-and-savings-estimates) to get reporting based on your exact instance type costs.

Automated workload scaling is powered by a `DatadogPodAutoscaler` custom resource that defines scaling behavior on a per-workload level. The Datadog Cluster Agent acts as the controller for this custom resource.

**Note:** Each cluster can have a maximum of 1000 workloads optimized with Datadog Kubernetes Autoscaling.

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
   | In-place vertical pod resize (opt-in) | 7.78+ |
   | Cluster profile activation, workload label | 7.78+ |
   | Cluster profile activation, namespace label | 7.79+ |

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

The [Autoscaling Summary page][6] provides a starting point for platform teams to understand the total Kubernetes Resource savings opportunities across an organization, and filter down to key clusters and namespaces.

The [Setup page][11] provides the option to select multiple workloads to scale, and manage your optimization in batches.

The [Cluster Scaling view][7] provides per-cluster information about total idle CPU, total idle memory, and costs.

Click on a cluster for detailed information and a table of the cluster's workloads sorted by estimated savings. If you are an individual application or service owner, you can also filter by your team or service name directly from the [Workload Scaling list view][8].

From any of these views, click {{< ui >}}Optimize{{< /ui >}} on a workload to see its scaling recommendation, then proceed to [Enable Autoscaling for a workload](#enable-autoscaling-for-a-workload).

### Enable Autoscaling for a workload

After you identify a workload to optimize, inspect its {{< ui >}}Scaling Recommendation{{< /ui >}}. Click {{< ui >}}Configure Recommendation{{< /ui >}} to add constraints or adjust target utilization levels before enabling.

There are three ways to enable autoscaling for a workload. Pick the path that matches how you deploy workloads today.

| Path | Best for | Where you start | Ongoing management |
|------|----------|-----------------|--------------------|
| **A. Datadog UI setup wizard** | Get started quickly and iterate on settings with immediate visual feedback, or empower your application teams to make better scaling configuration decisions | [Setup page][11] in the Datadog UI | Edit the workload's `DatadogPodAutoscaler` from the UI or your cluster |
| **B. Author a `DatadogPodAutoscaler` manifest** | Existing workflows for shipping Kubernetes manifests (`kubectl`, Helm, ArgoCD, Terraform, or other GitOps tools) | Hand-written or templated YAML applied through your existing tooling | Edit the manifest and reapply through the same tooling |
| **C. Apply a [cluster profile](#cluster-profiles) label** | Activating autoscaling across many workloads or namespaces with a single shared policy | Label the workload or namespace with `autoscaling.datadoghq.com/profile` | Edit the profile to update every workload it manages, or move workloads between profiles by changing the label |

#### Path A: Datadog UI

The fastest way to get started is the [Setup page][11] in the Datadog UI. The wizard walks you through five steps: select a cluster, verify Agent and permission requirements, choose an install method, pick a scaling template, and deploy. Templates available in the wizard:

- **Optimize cost**: high CPU utilization target, aggressive scale-down, lowest replica floor. Best for stateless, cost-sensitive workloads.
- **Optimize balance**: moderate utilization target, balanced scale-up and scale-down. Best for most stateless workloads.
- **Optimize performance**: conservative utilization target, slow scale-down, higher replica floor. Best for stateful or critical services.
- **Customize**: start from any of the above and tune CPU target, replicas, and stabilization windows yourself.

The Setup wizard is best for trying autoscaling on a single workload, getting hands-on with a recommendation, or onboarding a small set of workloads. (Requires `Workload Scaling Write` and `Autoscaling Manage` permissions.)

#### Path B: GitOps

Define a `DatadogPodAutoscaler` custom resource that targets your workload and apply it through whatever tooling you already use to ship Kubernetes manifests, whether that's `kubectl apply`, Helm, ArgoCD, Terraform, or another GitOps tool. Authoring the manifest is the same regardless of delivery mechanism. See the [example configurations](#example-datadogpodautoscaler-configurations) below for ready-to-edit starting points covering cost optimization, balanced scaling, vertical-only resizing, and custom-query horizontal scaling.

For tool-specific guides, see:

- [Manage DatadogPodAutoscaler with ArgoCD][12]
- [Manage DatadogPodAutoscaler with Terraform][13]

### Example DatadogPodAutoscaler configurations

The following examples demonstrate common `DatadogPodAutoscaler` configurations for different scaling strategies. Use them as starting points and adjust the values to match your workload's requirements. If you would rather pick a template in the UI, follow [Path A](#path-a-datadog-ui-setup-wizard) above.

{{< tabs >}}
{{% tab "Optimize Cost" %}}

Pick this template for a stateless, cost-sensitive workload where the controller should remove capacity rapidly when load drops. The defining setting is the high CPU utilization target (85%), combined with an aggressive scale-down rule and a single-replica minimum.

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
        scaleUp:
            rules:
                - periodSeconds: 120
                  type: Percent
                  value: 50
            stabilizationWindowSeconds: 300
        update:
            strategy: Auto
    constraints:
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
```

{{% /tab %}}
{{% tab "Optimize Balance" %}}

Pick this template when you want savings without trading off availability. It's a sensible default for most stateless workloads. The defining setting is the moderate CPU utilization target (70%) paired with a conservative scale-down (20% every 20 minutes) and a two-replica minimum. The controller adds capacity rapidly but removes it slowly.

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
        scaleUp:
            rules:
                - periodSeconds: 120
                  type: Percent
                  value: 50
            stabilizationWindowSeconds: 600
        update:
            strategy: Auto
    constraints:
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
```

{{% /tab %}}
{{% tab "Vertical CPU and Memory" %}}

Pick this template when a workload can't be scaled horizontally, or when you want pure rightsizing without changing replica counts. Common cases are singleton services, stateful workloads, and leader-elected components. The defining setting is `scaleDown.strategy: Disabled` and `scaleUp.strategy: Disabled`, which leaves only `update.strategy: Auto` to apply CPU and memory recommendations.

By default, the controller applies vertical recommendations by triggering a rollout (evict and recreate pods). Cluster Agent **7.78+** also supports **in-place pod resizing**, which updates a pod's CPU and memory requests and limits without restarting it. In-place resize is opt-in: set `autoscaling.workload.in_place_vertical_scaling.enabled: true` on the Cluster Agent (or set the environment variable `DD_AUTOSCALING_WORKLOAD_IN_PLACE_VERTICAL_SCALING_ENABLED=true`).

Your cluster must also expose the `pods/resize` subresource. This is the default in Kubernetes 1.33+ where the `InPlacePodVerticalScaling` feature gate is beta. On Kubernetes 1.27 to 1.32, the feature gate must be enabled on `kube-apiserver` and every `kubelet`.

When both prerequisites are met:

- **Default**: Workloads with `applyPolicy.update.strategy: Auto` (the default) resize in place.
- **Fallback**: If the kubelet reports a resize as `Infeasible`, the controller falls back to a rollout.
- **Opt-out**: To force a workload to always use rollout-based vertical scaling regardless of the cluster setting, set `applyPolicy.update.strategy: TriggerRollout` on its `DatadogPodAutoscaler`.

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
        maxReplicas: 100
```

{{% /tab %}}
{{% tab "Horizontal Custom Query" %}}

Pick this template when CPU and memory aren't the right scaling signal. Examples include a queue worker that should scale on backlog depth, or an API service that should scale on request latency. The defining setting is the `objectives` block, which references a Datadog metric query and an `AbsoluteValue` target instead of a utilization percentage. Replace the example query with one that matches your workload.

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
        scaleUp:
            rules:
                - periodSeconds: 120
                  type: Percent
                  value: 50
            stabilizationWindowSeconds: 600
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
            # With custom queries, local fallback is not activated by default
            enabled: false
            # Direction can be ScaleUp, ScaleDown or All
            direction: ScaleUp
            # When using custom queries, a CPU or Memory fallback objective is required
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

### Cluster profiles

A `DatadogPodAutoscalerClusterProfile` is a cluster-scoped resource that holds a `DatadogPodAutoscaler` template. The Cluster Agent watches `Deployment` and `StatefulSet` resources (and, on 7.79+, the namespaces that contain them) for the `autoscaling.datadoghq.com/profile` label, and creates a managed `DatadogPodAutoscaler` for every matching workload. One profile applies to many workloads; one workload still maps to one `DatadogPodAutoscaler`.

Cluster profiles and the workload-level label require Datadog Cluster Agent 7.78.0+. Namespace-level activation (labeling a namespace to opt every supported workload inside it into a profile) requires Datadog Cluster Agent 7.79.0+. Older Cluster Agents ignore the profile label.

#### Built-in profiles

The Cluster Agent ships three built-in profiles and recreates them on startup, so you do not commit any CRD YAML to use them. The names are reserved.

| Profile | CPU target | Min replicas | Profile of behavior |
|---|---|---|---|
| `datadog-optimize-cost` | 85% | 1 | Stateless, cost-sensitive workloads. Fast scale-up and scale-down (5-minute stabilization windows, 50% step every 2 minutes). |
| `datadog-optimize-balance` | 70% | 2 | Default for most stateless workloads. Balanced 10-minute stabilization windows, conservative scale-down (20% step every 20 minutes). |
| `datadog-optimize-performance` | 60% | 3 | Stateful or latency-sensitive workloads. Very conservative scale-down (15-minute stabilization windows, 10% step every 30 minutes). |

To activate a profile on a single workload, add the label to the workload's `metadata.labels`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  namespace: production
  labels:
    autoscaling.datadoghq.com/profile: datadog-optimize-balance
spec:
  # ...rest of the Deployment spec
```

To activate a profile on every supported workload in a namespace, label the namespace instead (requires Cluster Agent 7.79.0+):

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: production
  labels:
    autoscaling.datadoghq.com/profile: datadog-optimize-balance
```

#### Custom profiles

Author a `DatadogPodAutoscalerClusterProfile` when no built-in profile matches your scaling policy. Profiles are cluster-scoped, so apply them without a `--namespace` flag (or place them in the cluster-level layer of your config repository).

```yaml
apiVersion: datadoghq.com/v1alpha2
kind: DatadogPodAutoscalerClusterProfile
metadata:
  name: cost-optimized-strict-floor
spec:
  template:
    applyPolicy:
      mode: Apply
      scaleUp:
        stabilizationWindowSeconds: 300
        rules:
          - type: Percent
            value: 50
            periodSeconds: 120
      scaleDown:
        stabilizationWindowSeconds: 300
        rules:
          - type: Percent
            value: 50
            periodSeconds: 120
    constraints:
      minReplicas: 1
    objectives:
      - type: PodResource
        podResource:
          name: cpu
          value:
            type: Utilization
            utilization: 85
```

Reference the custom profile from a workload or namespace using the same label:

```yaml
metadata:
  labels:
    autoscaling.datadoghq.com/profile: cost-optimized-strict-floor
```

The template body accepts the same fields as a `DatadogPodAutoscaler` spec, minus `targetRef` (the Cluster Agent fills that in for each matching workload). See the [example configurations](#example-datadogpodautoscaler-configurations) above for the full range of fields you can put under `spec.template`.

#### Activation precedence

Cluster Agent 7.79.0+ adds namespace-level activation, the `excluded` opt-out, and the precedence rule between them. On Cluster Agent 7.78.0, only the workload-level label is read — the rules below that involve namespaces or the `excluded` value do not apply.

- **Workload labels take precedence over namespace labels.** If a namespace is labeled `autoscaling.datadoghq.com/profile=ns-profile` and a workload inside it is labeled `autoscaling.datadoghq.com/profile=workload-profile`, the workload uses `workload-profile`.
- **Opt out with `excluded`.** Set `autoscaling.datadoghq.com/profile: excluded` on a workload to exempt it when its namespace is labeled. This is useful for stateful or critical workloads in an otherwise opted-in namespace.

  ```yaml
  apiVersion: apps/v1
  kind: StatefulSet
  metadata:
    name: payments-ledger
    namespace: production
    labels:
      autoscaling.datadoghq.com/profile: excluded
  ```

- **Unknown profile names are ignored.** If a workload or namespace references a profile that does not exist, the Cluster Agent does not create a managed `DatadogPodAutoscaler` and does not report an error. Reconciliation picks up the assignment as soon as a profile with that name is created.
- **Reconciliation is automatic.** Adding, changing, or removing the label propagates to a managed `DatadogPodAutoscaler` within seconds.

#### Supported workload kinds

Profile activation supports `Deployment` and `StatefulSet`. For other kinds (for example, Argo `Rollout`), use [Path B: GitOps](#path-b-gitops) to author a `DatadogPodAutoscaler` directly.

### Deploy recommendations manually

If you want Datadog's recommendations without enabling autoscaling, you can apply them manually as a one-off. When you configure resources for your Kubernetes deployments, use the values suggested in the scaling recommendation. You can also click {{< ui >}}Export Recommendation{{< /ui >}} to see a generated `kubectl patch` command. Datadog continues to refresh the recommendation, but the cluster only changes when you reapply.

## Manage workloads at scale

After a workload is autoscaled, day-two operations are managed through a combination of the `DatadogPodAutoscaler` resource and the Datadog UI:

- **Change the scaling template.** Edit the workload's `DatadogPodAutoscaler` spec (CPU target, replica bounds, scale-up and scale-down rules) directly, or pick a different template from the [Workload Scaling list view][8]. Changes take effect on the next reconcile.
- **Pause autoscaling without deleting the resource.** Set `applyPolicy.mode: Preview` to keep recommendations visible in `.status` while preventing the controller from applying them. This is useful when running alongside an HPA or VPA during evaluation.
- **Watch the rollout.** The Workload Scaling list view shows the live status of each workload's recommendation, last applied action, and any reconcile errors.
- **Remove autoscaling cleanly.** Delete the `DatadogPodAutoscaler` resource to stop autoscaling. Existing pod resources remain at their last applied values, and the workload reverts to whatever its parent controller (Deployment, StatefulSet, etc.) specifies on the next rollout.

## Reference

### How vertical recommendations are calculated

Datadog computes vertical scaling recommendations for CPU and memory by analyzing historical container usage data over the last 8 days. The methodology used for each resource depends on whether that resource's request is equal to its limit, mirroring the [Kubernetes Quality of Service (QoS) class][14] concept. CPU and memory are evaluated independently: a workload can use the Burstable methodology for CPU and the Guaranteed methodology for memory, or vice versa.

#### Memory recommendations

**Burstable** (memory request is lower than memory limit):

| | How it's computed |
|---|---|
| **Request recommendation** | Based on the **p95** of memory usage over the last 8 days, with a decaying weight applied to older samples so that recent usage patterns are prioritized. A **10% safety margin** is then added. |
| **Limit recommendation** | Based on the **maximum peak memory usage** observed over the last 8 days. A **5% safety margin** is then added. |

**Guaranteed** (memory request equals memory limit):

| | How it's computed |
|---|---|
| **Request and limit recommendation** | Based on the **maximum peak memory usage** observed over the last 8 days. A **5% safety margin** is added. If an **OOMKill** is detected, an additional **20% bump** is applied to help prevent future out-of-memory events. |

**Note:** Peak memory tracking captures the highest memory usage ever recorded by any container that has existed within the 8-day lookback window. This means that even if a container started before that window, its peak usage (for example, at startup) is still accounted for in the recommendation.

#### CPU recommendations

**Burstable** (CPU request is lower than CPU limit):

| | How it's computed |
|---|---|
| **Request recommendation** | Based on the **p90** of CPU usage relative to the current request over the last 8 days, with a decaying weight applied to older samples so that recent usage patterns are prioritized. A **10% safety margin** is then added. |
| **Limit recommendation** | Based on the **p95** of CPU usage relative to the current request over the last 8 days. A **5% safety margin** is then added. If the resulting request recommendation ever exceeds the limit recommendation, the request value is used for both. |

**Guaranteed** (CPU request equals CPU limit):

| | How it's computed |
|---|---|
| **Request and limit recommendation** | Based on the **p95** of CPU usage relative to the current request over the last 8 days. A **5% safety margin** is then added. |

#### Key design principles

- **8-day lookback window**: All recommendations consider usage data from the past 8 days, providing enough history to capture weekly traffic patterns while remaining responsive to changes.
- **Decaying weights**: For Burstable-class request recommendations (CPU or memory), older samples are weighted less heavily, so the recommendation adapts faster to recent usage shifts.
- **Safety margins**: Every recommendation includes a margin above observed usage (5 to 10%) to provide a buffer against unexpected spikes.
- **OOMKill response**: When memory is Guaranteed-class (request equals limit) and an OOMKill occurs, a 20% bump is applied to reduce the likelihood of repeated out-of-memory failures.
- **Guaranteed-class preservation**: When a resource has request equal to limit, Datadog uses the more conservative (limit-level) computation for both, ensuring recommendations do not introduce a gap between request and limit.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/remote_config
[2]: /agent/remote_config/?tab=configurationyamlfile#enable-remote-configuration
[3]: https://helm.sh/
[4]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[5]: /containers/kubernetes/distributions
[6]: https://app.datadoghq.com/orchestration/scaling/summary
[7]: https://app.datadoghq.com/orchestration/scaling/cluster
[8]: https://app.datadoghq.com/orchestration/scaling/workload
[9]: /integrations/kubernetes_state_core/
[10]: https://www.datadoghq.com/product-preview/kubernetes-cluster-autoscaling/
[11]: https://app.datadoghq.com/orchestration/scaling/setup
[12]: /containers/guide/manage-datadogpodautoscaler-with-argocd/
[13]: /containers/guide/manage-datdadogpodautoscaler-with-terraform/
[14]: https://kubernetes.io/docs/concepts/workloads/pods/pod-qos/
