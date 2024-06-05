---
title: Install the Datadog Agent on Kubernetes
kind: documentation
aliases:
    - /agent/kubernetes/daemonset_setup
    - /agent/kubernetes/helm
    - /agent/kubernetes/installation
further_reading:
    - link: '/agent/kubernetes/configuration'
      tag: 'Documentation'
      text: 'Further Configure the Datadog Agent on Kubernetes'
    - link: 'https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md#all-configuration-options'
      tag: "Source Code"
      text: 'Datadog Helm chart - All configuration options'
    - link: 'https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md#upgrading'
      tag: "Source Code"
      text: 'Upgrading Datadog Helm'
---

## Overview

This page provides instructions on installing the Datadog Agent in a Kubernetes environment. 

For dedicated documentation and examples for major Kubernetes distributions including AWS Elastic Kubernetes Service (EKS), Azure Kubernetes Service (AKS), Google Kubernetes Engine (GKE), Red Hat OpenShift, Rancher, and Oracle Container Engine for Kubernetes (OKE), see [Kubernetes distributions][1].

For dedicated documentation and examples for monitoring the Kubernetes control plane, see [Kubernetes control plane monitoring][2].

### Minimum Kubernetes and Datadog Agent versions

Some features related to later Kubernetes versions require a minimum Datadog Agent version.

| Kubernetes version | Agent version  | Reason                                |
|--------------------|----------------|---------------------------------------|
| 1.16.0+            | 7.19.0+        | Kubelet metrics deprecation           |
| 1.21.0+            | 7.36.0+        |  Kubernetes resource deprecation       |
| 1.22.0+            | 7.37.0+        |  Support dynamic service account token |

See also: [Minimum Kubernetes and Cluster Agent versions][8].

## Installation

Use the [Installing on Kubernetes][16] page in Datadog to guide you through the installation process.

1. **Select installation method**

   Choose one of the following installation methods:

   - [Datadog Operator][9] (recommended): a Kubernetes [operator][10] that you can use to deploy the Datadog Agent on Kubernetes and OpenShift. It reports deployment status, health, and errors in its Custom Resource status, and it limits the risk of misconfiguration thanks to higher-level configuration options.
   - [Helm][11]
   - Manual installation. See [Manually install and configure the Datadog Agent with a DaemonSet][12]

{{< tabs >}}
{{% tab "Datadog Operator" %}}
<div class="alert alert-info">Requires <a href="https://helm.sh">Helm</a> and the <a href="https://kubernetes.io/docs/tasks/tools/#kubectl">kubectl CLI</a>.</div>

2. **Install the Datadog Operator**

   To install the Datadog Operator in your current namespace, run:
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm install datadog-operator datadog/datadog-operator
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY>
   ```
   - Replace `<DATADOG_API_KEY>` with your [Datadog API key][1].

3. **Configure `datadog-agent.yaml`**

   Create a file, `datadog-agent.yaml`, that contains:
   ```yaml
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
   spec:
     global:
       clusterName: <CLUSTER_NAME>
       site: <DATADOG_SITE>
       credentials:
         apiSecret:
           secretName: datadog-secret
           keyName: api-key
   ```
   - Replace `<CLUSTER_NAME>` with a name for your cluster.
   - Replace `<DATADOG_SITE>` with your [Datadog site][2]. Your site is {{< region-param key="dd_site" code="true" >}}. (Ensure the correct SITE is selected on the right).

4. **Deploy Agent with the above configuration file**

   Run:
   ```shell
   kubectl apply -f datadog-agent.yaml
   ```

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /getting_started/site
{{% /tab %}}
{{% tab "Helm" %}}
<div class="alert alert-info">Requires <a href="https://helm.sh">Helm</a>.</div>

2. **Add the Datadog Helm repository**

   Run:
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm repo update
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY>
   ```

   - Replace `<DATADOG_API_KEY>` with your [Datadog API key][1].

3. **Configure `datadog-values.yaml`**

   Create a file, `datadog-values.yaml`, that contains:
   ```yaml
   datadog:
    apiKeyExistingSecret: datadog-secret
    site: <DATADOG_SITE>
   ```

   - Replace `<DATADOG_SITE>` with your [Datadog site][2]. Your site is {{< region-param key="dd_site" code="true" >}}. (Ensure the correct SITE is selected on the right).

4. **Deploy Agent with the above configuration file**

   Run:

   ```shell
   helm install datadog-agent -f datadog-values.yaml datadog/datadog
   ```

   <div class="alert alert-info">
   For Windows, append <code>--set targetSystem=windows</code> to the <code>helm install</code> command.
   </div>

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /getting_started/site

{{% /tab %}}
{{< /tabs >}}

5. **Confirm Agent installation**

   Verify that Agent pods (tagged with `app.kubernetes.io/component:agent`) appear on the [Containers][13] page in Datadog. Agent pods are detected within a few minutes of deployment.

### Unprivileged installation

{{< tabs >}}
{{% tab "Datadog Operator" %}}
To run an unprivileged installation, add the following to `datadog-agent.yaml`:

{{< highlight yaml "hl_lines=13-18" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    site: <DATADOG_SITE>
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
agent:
  config:
    securityContext:
      runAsUser: <USER_ID>
      supplementalGroups:
        - <GROUP_ID>
{{< /highlight >}}

- Replace `<USER_ID>` with the UID to run the Datadog Agent.
- Replace `<GROUP_ID>` with the group ID that owns the Docker or containerd socket.

Then, deploy the Agent:

```shell
kubectl apply -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}
To run an unprivileged installation, add the following to your `datadog-values.yaml` file:

{{< highlight yaml "hl_lines=4-7" >}}
datadog:
  apiKeyExistingSecret: datadog-secret
  site: <DATADOG_SITE>
  securityContext:
      runAsUser: <USER_ID>
      supplementalGroups:
        - <GROUP_ID>
{{< /highlight >}}

- Replace `<USER_ID>` with the UID to run the Datadog Agent.
- Replace `<GROUP_ID>` with the group ID that owns the Docker or containerd socket.

Then, deploy the Agent:

```shell
helm install datadog-agent -f datadog-values.yaml datadog/datadog
```

{{% /tab %}}
{{< /tabs >}}

### Container registries

Datadog publishes container images to Google Artifact Registry, Amazon ECR, and Docker Hub:

| gcr.io | public.ecr.aws | docker hub |
| ------ | -------------- | ------------ |
| gcr.io/datadoghq | public.ecr.aws/datadog | docker.io/datadog |

By default, the Agent image is pulled from Google Artifact Registry (`gcr.io/datadoghq`). If Artifact Registry is not accessible in your deployment region, use another registry.

If you are deploying the Agent in an AWS environment, Datadog recommend that you use Amazon ECR.

<div class="alert alert-warning">Docker Hub is subject to image pull rate limits. If you are not a Docker Hub customer, Datadog recommends that you update your Datadog Agent and Cluster Agent configuration to pull from Google Artifact Registry or Amazon ECR. For instructions, see <a href="/agent/guide/changing_container_registry">Changing your container registry</a>.</div>

{{< tabs >}}
{{% tab "Datadog Operator" %}}

To use a different container registry, modify `global.registry` in `datadog-agent.yaml`.

For example, to use Amazon ECR:

{{< highlight yaml "hl_lines=8">}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    registry: public.ecr.aws/datadog
    site: <DATADOG_SITE>
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
{{< /highlight >}}

{{% /tab %}}
{{% tab "Helm" %}}

To use a different container registry, modify `registry` in `datadog-values.yaml`.

For example, to use Amazon ECR:

{{< highlight yaml "hl_lines=1">}}
registry: public.ecr.aws/datadog
datadog:
  apiKeyExistingSecret: datadog-secret
  site: <DATADOG_SITE>
{{< /highlight >}}

{{% /tab %}}
{{< /tabs >}}

For more information, see [Changing your container registry][17].

### Uninstall

{{< tabs >}}
{{% tab "Datadog Operator" %}}
```shell
kubectl delete datadogagent datadog
helm delete my-datadog-operator
```

This command deletes all Kubernetes resources created by installing Datadog Operator and deploying the Datadog Agent.
{{% /tab %}}
{{% tab "Helm" %}}
```shell
helm uninstall datadog-agent
```
{{% /tab %}}
{{< /tabs >}}

## Next steps

### Monitor your infrastructure in Datadog
Use the [Containers][13] page for visibility into your container infrastructure, with resource metrics and faceted search. For information on how to use the Containers page, see [Containers View][14].

Use the [Container Images][18] page for insights into every image used in your environment. This page also displays vulnerabilities found in your container images from [Cloud Security Management][19] (CSM). For information on how to use the Container Images page, see the [Containers Images View][20].

The [Kubernetes][21] section features an overview of all your Kubernetes resources. [Orchestrator Explorer][22] allows you to monitor the state of pods, deployments, and other Kubernetes concepts in a specific namespace or availability zone, view resource specifications for failed pods within a deployment, correlate node activity with related logs, and more. The [Resource Utilization][23] page provides insights into how your Kubernetes workloads are using your computing resources across your infrastructure. For information on how to use these pages, see [Orchestrator Explorer][24] and [Kubernetes Resource Utilization][25].

### Enable features

{{< whatsnext >}}
  {{< nextlink href="/containers/kubernetes/apm">}}<u>APM for Kubernetes</u>: Set up and configure trace collection for your Kubernetes application.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/log">}}<u>Log collection in Kubernetes</u>: Set up log collection in a Kubernetes environment.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/prometheus">}}<u>Prometheus & OpenMetrics</u>: Collect your exposed Prometheus and OpenMetrics metrics from your application running inside Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/control_plane">}}<u>Control plane monitoring</u>: Monitor the Kubernetes API server, controller manager, scheduler, and etcd.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/configuration">}}<u>Further Configuration</u>: Collect events, override proxy settings, send custom metrics with DogStatsD, configure container allowlists and blocklists, and reference the full list of available environment variables.{{< /nextlink >}}
{{< /whatsnext >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/kubernetes/distributions
[2]: /agent/kubernetes/control_plane
[3]: /infrastructure/livecontainers/configuration/
[4]: /agent/kubernetes/configuration/
[5]: /agent/kubernetes/integrations/
[6]: /agent/kubernetes/apm/
[7]: /agent/kubernetes/log/
[8]: /containers/cluster_agent/#minimum-agent-and-cluster-agent-versions
[9]: /containers/datadog_operator
[10]: https://kubernetes.io/docs/concepts/extend-kubernetes/operator/
[11]: https://helm.sh
[12]: /containers/guide/kubernetes_daemonset/
[13]: https://app.datadoghq.com/containers
[14]: /infrastructure/containers
[15]: /containers/kubernetes/apm
[16]: https://app.datadoghq.com/account/settings/agent/latest?platform=kubernetes
[17]: /containers/guide/changing_container_registry/
[18]: https://app.datadoghq.com/containers/images
[19]: /security/cloud_security_management
[20]: /infrastructure/containers/container_images
[21]: https://app.datadoghq.com/kubernetes
[22]: https://app.datadoghq.com/orchestration/overview
[23]: https://app.datadoghq.com/orchestration/resource/pod
[24]: /infrastructure/containers/orchestrator_explorer
[25]: /infrastructure/containers/kubernetes_resource_utilization