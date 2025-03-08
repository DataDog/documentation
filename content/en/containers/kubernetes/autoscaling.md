---
title: Datadog Kubernetes Autoscaling
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

{{< callout url="http://datadoghq.com/product-preview/kubernetes-autoscaling/" d_toggle="modal" d_target="#signupModal" custom_class="sign-up-trigger" btn_hidden="false" header="Join the Preview!">}}
Datadog Kubernetes Autoscaling is in Preview.
{{< /callout >}}

Datadog Kubernetes Autoscaling automates the scaling of your Kubernetes environments based on utilization metrics. This feature enables you to make changes to your Kubernetes environments from within Datadog.

## How it works
Datadog Kubernetes Autoscaling provides cluster scaling observability and workload scaling recommendations and automation. Datadog uses real-time and historical utilization metrics to make recommendations. With data from [Cloud Cost Management](#ingest-cost-data-with-cloud-cost-management), Datadog can also make recommendations based on costs.

Automated workload scaling is powered by a `DatadogPodAutoscaler` custom resource that defines scaling behavior on a per-workload level. 
<!-- is this also true for autoscaling with the UI? -->

Each cluster can have a maximum of 100 workloads optimized with Datadog Kubernetes Autoscaler.

<div class="alert alert-info">During the Preview period, Preview users are granted access to Cloud Cost Management. For details, see <a href="#ingest-cost-data-with-cloud-cost-management">Ingest cost data with Cloud Cost Management</a></div>

### Compatibility

- **Distributions**: This feature is compatible with all of Datadog's [supported Kubernetes distributions][10].
- **Cluster autoscaling**: This feature works alongside cluster autoscaling solutions, such as Karpenter and Cluster Autoscaler.
- **Workload autoscaling**: This feature is an alternative to Horizontal Pod Autoscaler (HPA) and Vertical Pod Autoscaler (VPA). Datadog recommends that you remove any HPAs or VPAs from a workload before you use Datadog Kubernetes Autoscaling to optimize it.
<!-- TODO: this section could be massaged -->

### Requirements

- [Remote Configuration][1] must be enabled for your organization. See [Enabling Remote Configuration][3].
- [Helm][12], for updating your Datadog Agent
- (For Datadog Operator users) [`kubectl` CLI][13], for updating the Datadog Agent
- The following user permissions:
   - Org Management (`org_management`)
   - API Keys Write (`api_keys_write`)
   - Workload Scaling Write (`orchestration_workload_scaling_write`)

<div class="alert alert-info">During the Preview period, Preview users are granted access at an organization level... </div>
<!-- how are permissions being handled during preview? how do capabilities map onto those user permissions?-->

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

3. [Admission Controller][1] is enabled by default with the Datadog Operator. If you disabled it, add the following highlighted lines to `datadog-agent.yaml`:

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

2. [Admission Controller][1] is enabled by default in the Datadog Helm chart. If you disabled it, add the following highlighted lines to `datadog-values.yaml`:
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
Datadog's Kubernetes Autoscaling can work with [Cloud Cost Management][4] to make workload scaling recommendations based on cost data... 
<!-- TODO: what does it use the cost data to do -->

<div class="alert alert-info">Kubernetes Autoscaling Preview users are granted limited access to <a href="/cloud_cost_management">Cloud Cost Management</a> during the Preview period. To coordinate this trial access, contact your customer success manager and CC <code>kubernetes-beta@datadoghq.com</code>. <br/><br/>If you are already using Cloud Cost Management, no action is required.</div>
<!-- TODO: having to CC is probably not a great user experience -->

See Cloud Cost setup instructions for [AWS][5], [Azure][6], or [Google Cloud][7].

If you do not enable Cloud Cost Management, all workload recommendations and autoscaling decisions are still valid and functional.

## Usage

### Automate Kubernetes scaling in Datadog
<!-- is this the usual flow of logic? hunt for a cluster first, then choose a workload? -->
1. In Datadog, navigate to **Containers** > [**Kubernetes Explorer**][8] and select the [**Autoscaling**][9] tab.

1. **Choose a cluster**. Use the [**Cluster Scaling**][9] view to see a list of your clusters, sortable by total idle CPU or total idle memory. If you [enabled Cloud Cost Management](#ingest-cost-data-with-cloud-cost-management), you can also see cost information and a trailing 30-day cost breakdown.

   {{< img src="containers/autoscaling/explorer_view.png" alt="In Datadog, Infrastructure > Containers > Kubernetes Explorer > Autoscaling > Cluster Scaling. A table of clusters, displaying each cluster's idle CPU, idle memory, and costs. Each cluster has an 'Optimize Cluster' option." style="width:80%;" >}}

   Datadog recommends selecting a non-production cluster with an existing cluster autoscaling solution.
   <!-- todo: why? and is this only during preview? are there general reasons behind cluster selection — e.g. high percentage idle?-->

1. Click **Optimize cluster** to open a detailed view of the selected cluster.

   {{< img src="containers/autoscaling/cluster_detail.png" alt="A detailed cluster view. At the top, widgets displaying cost metrics and scaling events. Below, a table of this cluster's workloads, displaying each deployment's idle CPU, idle memory, and costs. Each workload has an 'Optimize' option." style="width:80%;" >}}

1. **Choose a workload**. On your cluster's detailed view, locate the **Workloads** section. Select a workload...
   <!-- todo: what types of workloads are best suited for autoscaling? -->

   You can also select a workload from the [**Workload Scaling**][11] view, which provides a filterable list of all workloads across all clusters.

1. Click **Optimize** to open a side panel with detailed view of the selected workload.

   {{< img src="containers/autoscaling/workload_sidepanel.png" alt="A side panel is opened over the detailed cluster view. A section titled 'Scaling Recommendation' displays the text 'Set Memory on 2 containers and decrease replicas to 5'." style="width:80%;" >}}
   <!-- todo: will need a screenshot where the Enable Autoscaling button is active (need user with Workload Scaling Write permissions) -->

   In this side panel, you can see a **scaling recommendation** and inspect the metrics backing the recommendation for each container within the deployment. 

1. Select **Enable Autoscaling** to automatically apply your recommendations.

   Alternatively, if you want to apply your changes with `kubectl patch`, select **Apply** to see a generated `kubectl patch` command.

{{< img src="containers/autoscaling/kubectl_patch.png" alt="A modal is opened over the workload side panel. At the top, a copyable text box containing a generated kubectl patch. Below, a manifest diff." style="width:80%;" >}}


### Autoscale a workload with a custom resource

You can also deploy a `DatadogPodAutoscaler` custom resource to enable autoscaling for a workload. This custom resource targets a deployment.

For example:

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogPodAutoscaler
metadata:
  name: <name>
    # usually the same as your deployment object name
spec:
  constraints:
    # Adjust constraints as safeguards
    maxReplicas: 50
    minReplicas: 1 
  
  owner: Local
  policy: All
    # Values: All, None
    #   All - Allows automated recommendations to be applied. Default.
    #   None - Computes recommendations without applying them (dry run).

  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: <your Deployment name>
  targets:
    # Currently, recommendation is to use a single target with CPU Utilization of main container of the POD.
    - type: ContainerResource
      containerResource:
        container: <main-container-name>
        name: cpu
        value:
          type: Utilization
          utilization: 75
```
<!-- some of the above should be edited -->

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/remote_config
[2]: https://app.datadoghq.com/organization-settings/remote-config
[3]: https://docs.datadoghq.com/agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[4]: /cloud_cost_management
[5]: /cloud_cost_management/aws
[6]: /cloud_cost_management/azure
[7]: /cloud_cost_management/google_cloud
[8]: https://app.datadoghq.com/orchestration/explorer/pod
[9]: https://app.datadoghq.com/orchestration/scaling/cluster
[10]: /containers/kubernetes/distributions
[11]: https://app.datadoghq.com/orchestration/scaling/workload
[12]: https://helm.sh/
[13]: https://kubernetes.io/docs/tasks/tools/install-kubectl/