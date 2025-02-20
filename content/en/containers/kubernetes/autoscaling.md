---
title: Datadog Kubernetes Autoscaling
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
---

{{< callout url="#" d_toggle="modal" d_target="#signupModal" custom_class="sign-up-trigger" btn_hidden="false" header="Join the Preview!">}}
Datadog Kubernetes Autoscaling is in Preview.
{{< /callout >}}
<!-- TODO: need a signup url -->

Datadog Kubernetes Autoscaling can...
<!-- TODO: tk -->

### Compatibility
Datadog Kubernetes Autoscaling uses a DatadogPodAutoscaler custom resource to define autoscaling behavior for a workload. This feature is an alternative to Horizontal Pod Autoscaler and Vertical Pod Autoscaler. It works alongside cluster autoscaling solutions, such as Karpenter and Cluster Autoscaler.
<!-- TODO: this section could be massaged -->

Datadog Kubernetes Autoscaling is compatible with all of Datadog's [supported Kubernetes distributions][10].

Datadog recommends that you remove
<!-- TODO: remove hpas and vpas from workloads, but choose a cluster that has cluster autoscaling? -->

## Setup

1. **Ensure that [Remote Configuration][1] is enabled** on the [Remote Configuration page][2] in Datadog. If Remote Configuration is not enabled for your organization, see [Enabling Remote Configuration][3].

1. **Update your Datadog Agent**.

   {{< tabs >}}
   {{% tab "Datadog Operator" %}}

   <div class="alert alert-info">Requires <a href="https://helm.sh/">Helm</a> and the <a href="https://kubernetes.io/docs/tasks/tools/install-kubectl/"><code>kubectl</code></a> CLI.</div>

   1. Ensure you are using Datadog Operator v1.8.0+. To upgrade your Datadog Operator:

   ```shell
   helm upgrade datadog-operator datadog/datadog-operator 
   ```

   1. Add the following to your `datadog-agent.yaml` configuration file:

{{< code-block lang="yaml" filename="datadog-agent.yaml" disable_copy="false" collapsible="true" >}}
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
{{< /code-block >}}

   1. [Admission Controller][1] is enabled by default with the Datadog Operator. If you disabled it, add the following highlighted lines to `datadog-agent.yaml`:

   {{< highlight yaml "hl_lines=4-5" >}}
   (...)
   spec:
     features:
       admissionController:
         enabled: true
   (...)
   {{< /highlight >}}

   1. Apply the updated `datadog-agent.yaml` configuration:

   ```shell
   kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
   ```

[1]: /containers/cluster_agent/admission_controller/
   {{% /tab %}}

   {{% tab "Helm" %}}

   <div class="alert alert-info">Requires <a href="https://helm.sh/">Helm</a>.</div>

   1. Add the following to your `datadog-values.yaml` configuration file:

{{< code-block lang="yaml" filename="datadog-values.yaml" disable_copy="false" collapsible="true" >}}
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
{{< /code-block >}}

   1. [Admission Controller][1] is enabled by default in the Datadog Helm chart. If you disabled it, add the following highlighted lines to `datadog-values.yaml`:
   {{< highlight yaml "hl_lines=5-6" >}}
   (...)
   clusterAgent:
     image:
       tag: 7.58.1
     admissionController:
       enabled: true
   (...)
   {{< /highlight >}}

  1. Update your Helm version:

  ```shell
  helm repo update
  ```
  1. Redeploy the Datadog Agent with your updated `datadog-values.yaml`:

  ```shell
  helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
  ```

[1]: /containers/cluster_agent/admission_controller/
   {{% /tab %}}
   {{< /tabs >}}

### Ingest cost data with Cloud Cost Management
Datadog's Kubernetes Autoscaling works with [Cloud Cost Management][4] to (tk). 
<!-- TODO: what does it use the cost data to do -->

<div class="alert alert-info">Kubernetes Autoscaling Preview users are granted limited access to <a href="/cloud_cost_management">Cloud Cost Management</a> during the Preview period. To coordinate this trial access, contact your customer success manager and CC <code>kubernetes-beta@datadoghq.com</code>. <br/><br/>If you are already using Cloud Cost Management, no action is required.</div>
<!-- TODO: having to CC is probably not a great user experience -->

See Cloud Cost setup instructions for [AWS][5], [Azure][6], or [Google Cloud][7].

If you do not enable Cloud Cost Management, all workload recommendations and autoscaling decisions are still valid and functional.

## Usage

### In Datadog
<!-- maybe this should be a list -->

1. In Datadog, navigate to **Containers** > [**Kubernetes Explorer**][8] and select the [**Autoscaling**][9] tab.


1. **Choose a cluster**. Use the [**Cluster Scaling**][9] view to see a list of your clusters,  sortable by total idle CPU or total idle memory. If you [enabled Cloud Cost Management](#ingest-cost-data-with-cloud-cost-management), you can also see cost information and a trailing 30-day cost breakdown.

   {{< img src="containers/autoscaling/explorer_view.png" alt="Your image description" style="width:80%;" >}}

   Datadog recommends selecting a non-production cluster with an existing cluster autoscaling solution.
<!-- todo: why? and is this only during preview? -->

1. Click **Optimize cluster** to open a detailed view of the selected cluster.

   {{< img src="containers/autoscaling/cluster_detail.png" alt="Your image description" style="width:80%;" >}}

1. **Choose a workload**. On your cluster's detailed view, locate the **Workloads** section. Select a workload...
   <!-- todo: -->

   Alternatively, you can use the [**Workload Scaling**][11] view provides a filterable list of all workloads across clusters.

1. Click **Optimize** to open a side panel.

   <!-- todo: sidepnael img -->

   In this side panel, you can see scaling recommendations and inspect the metrics backing the recommendation for each container within the deployment. 

1. Select **Enable Autoscaling** to automatically apply your recommendations.

   Alternatively, if you want to apply your changes with `kubectl patch`, select **Apply** to see a generated `kubectl patch` command.

{{< img src="containers/autoscaling/kubectl_patch.png" alt="Your image description" style="width:80%;" >}}


### Use a Custom Resource

You can also 

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