---
title: Kubernetes Autoscaling
further_reading:
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

Datadog Kubernetes Autoscaling continuously monitors your Kubernetes resources to provide immediate scaling recommendations and multidimensional autoscaling of your Kubernetes workloads. You can deploy autoscaling through the Datadog web interface, or with a `DatadogPodAutoscaler` custom resource.

## How it works
Datadog uses real-time and historical utilization metrics and event signals to make recommendations. You can then examine these recommendations and choose to deploy them.

Use Kubernetes Autoscaling alongside [Cloud Cost Management](#ingest-cost-data-with-cloud-cost-management) to get impact estimates based on your underlying instance type costs.

Automated workload scaling is powered by a `DatadogPodAutoscaler` custom resource that defines scaling behavior on a per-workload level. 

Each cluster can have a maximum of 1000 workloads optimized with Datadog Kubernetes Autoscaler.

### Compatibility

- **Distributions**: This feature is compatible with all of Datadog's [supported Kubernetes distributions][9].
- **Workload autoscaling**: This feature is an alternative to Horizontal Pod Autoscaler (HPA) and Vertical Pod Autoscaler (VPA). Datadog recommends that you remove any HPAs or VPAs from a workload before you use Datadog Kubernetes Autoscaling to optimize it.

### Requirements

- [Remote Configuration][1] must be enabled for your organization. See [Enabling Remote Configuration][2].
- [Helm][3], for updating your Datadog Agent
- (For Datadog Operator users) [`kubectl` CLI][4], for updating the Datadog Agent
- The following user permissions:
   - Org Management (required for Remote Configuration)
   - API Keys Write (required for Remote Configuration)
   - Workload Scaling Read
   - Workload Scaling Write
   - Autoscaling Manage

## Setup

{{< tabs >}}
{{% tab "Datadog Operator" %}}

1. Ensure you are using Datadog Operator v1.8.0+. To upgrade your Datadog Operator:

```shell
helm upgrade datadog-operator datadog/datadog-operator 
```

2. Add the following to your `datadog-agent.yaml` configuration file:

```yaml
spec:
  features:
    orchestratorExplorer:
      customResources:
      - datadoghq.com/v1alpha1/datadogpodautoscalers
    autoscaling:
      workload:
        enabled: true
    eventCollection:
      unbundleEvents: true
  override:
    clusterAgent:
      image:
        tag: 7.58.1
    nodeAgent:
      image:
        tag: 7.58.1 # or 7.58.1-jmx
    clusterChecksRunner
      image:
        tag: 7.58.1 # or 7.58.1-jmx
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

1. Add the following to your `datadog-values.yaml` configuration file:

```yaml
datadog:
  orchestratorExplorer:
    customResources:
    - datadoghq.com/v1alpha1/datadogpodautoscalers
  autoscaling:
    workload:
      enabled: true
  kubernetesEvents:
    unbundleEvents: true
clusterAgent:
  image:
    tag: 7.58.1
agents:
  image:
    tag: 7.58.1 # or 7.58.1-jmx
clusterChecksRunner:
  image:
    tag: 7.58.1 # or 7.58.1-jmx
```

2. [Admission Controller][1] is enabled by default in the Datadog Helm chart. If you disabled it, re-enable it by adding the following highlighted lines to `datadog-values.yaml`:
{{< highlight yaml "hl_lines=5-6" >}}
...
clusterAgent:
  image:
    tag: 7.58.1
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

### Ingest cost data with Cloud Cost Management

By default, Datadog Kubernetes Autoscaling shows idle cost and savings estimates using fixed values for CPU and memory costs.

When [Cloud Cost Management][5] is enabled within an org, Datadog Kubernetes Autoscaling shows idle cost and savings estimates based on your exact bill cost of underlying monitored instances.

See Cloud Cost setup instructions for [AWS][6], [Azure][7], or [Google Cloud][8].

Cost data enhances Kubernetes Autoscaling, but it is not required. All of Datadog's workload recommendations and autoscaling decisions are valid and functional without cost data.

## Usage

### Identify resources to scale

Use your [Kubernetes Autoscaling page][10] to better understand the resource efficiency of your Kubernetes deployments. The [Summary view][11] displays information about optimization opportunities and estimated costs across your clusters and workloads. The [Cluster Scaling view][12] provides per-cluster information about total idle CPU, total idle memory, and costs. Click on a cluster for detailed information and a table of the cluster's workloads. You can also use the [Workload Scaling view][13] to see a filterable list of all workloads across all clusters.

Click **Optimize** on any workload to see its scaling recommendation.

### Deploy recommendations with Autoscaling

After you identify a workload to optimize, examine its **Scaling Recommendation**. You can also click **Configure Recommendation** to make changes to the recommendation before you apply it.

You can use Kubernetes Autoscaling to deploy a scaling recommendation in one of two ways:

- Click **Enable Autoscaling**. Datadog automatically applies the scaling recommendation to your workload.
- Deploy a `DatadogPodAutoscaler` custom resource. Click **Export Recommendation** to see values for your CRD.

### Deploy recommendations manually

As an alternative to Autoscaling, you can also deploy Datadog's scaling recommendations manually. When you configure resources for your Kubernetes deployments, use the values suggested in the scaling recommendations. You can also click **Export Recommendation** to see a generated `kubectl patch` command.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/remote_config
[2]: /agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[3]: https://helm.sh/
[4]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[5]: /cloud_cost_management
[6]: /cloud_cost_management/aws
[7]: /cloud_cost_management/azure
[8]: /cloud_cost_management/google_cloud
[9]: /containers/kubernetes/distributions
[10]: https://app.datadoghq.com/orchestration/scaling/
[11]: https://app.datadoghq.com/orchestration/scaling/summary
[12]: https://app.datadoghq.com/orchestration/scaling/cluster
[13]: https://app.datadoghq.com/orchestration/scaling/workload