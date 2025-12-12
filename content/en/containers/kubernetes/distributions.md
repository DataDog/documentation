---
title: Kubernetes distributions
description: Platform-specific installation and configuration instructions for Datadog Agent on various Kubernetes distributions
aliases:
- /agent/kubernetes/distributions
further_reading:
    - link: 'agent/kubernetes/log'
      tag: 'Documentation'
      text: 'Collect your application logs'
    - link: '/agent/kubernetes/apm'
      tag: 'Documentation'
      text: 'Collect your application traces'
    - link: '/agent/kubernetes/prometheus'
      tag: 'Documentation'
      text: 'Collect your Prometheus metrics'
    - link: '/agent/kubernetes/integrations'
      tag: 'Documentation'
      text: 'Collect automatically your applications metrics and logs'
    - link: '/agent/guide/autodiscovery-management'
      tag: 'Documentation'
      text: 'Limit data collection to a subset of containers only'
    - link: '/agent/kubernetes/tag'
      tag: 'Documentation'
      text: 'Assign tags to all data emitted by a container'
    - link: 'https://www.datadoghq.com/blog/monitor-vsphere-tanzu-kubernetes-grid-with-datadog/'
      tag: 'Blog'
      text: 'Monitor Tanzu Kubernetes Grid on vSphere'
---

## Overview

This section aims to document specifics and to provide good base configuration for all major Kubernetes distributions.
These configurations can then be customized to add any Datadog feature.

* [AWS Elastic Kubernetes Service (EKS)](#EKS)
* [Azure Kubernetes Service (AKS)](#AKS)
* [Google Kubernetes Engine (GKE)](#GKE)
* [Red Hat OpenShift](#Openshift)
* [Rancher](#Rancher)
* [Oracle Container Engine for Kubernetes (OKE)](#OKE)
* [vSphere Tanzu Kubernetes Grid (TKG)](#TKG)

## AWS Elastic Kubernetes Service (EKS) {#EKS}

No specific configuration is required.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

In an EKS cluster, you can install the Operator using [Helm][1] or as an [EKS add-on][2].

The configuration below is meant to work with either setup (Helm or EKS add-on) when the Agent is installed in the same namespace as the Datadog Operator.

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
```

[1]:/containers/kubernetes/installation/?tab=datadogoperator
[2]: /agent/guide/operator-eks-addon

{{% /tab %}}

{{< /tabs >}}

## Azure Kubernetes Service (AKS) {#AKS}

### Admission Controller
The optional [Admission Controller][1] feature requires a specific configuration to prevent an error when reconciling the webhook.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

DatadogAgent Kubernetes Resource:

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    site: <DATADOG_SITE>
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
  override:
    clusterAgent:
      containers:
        cluster-agent:
          env:
            - name: DD_ADMISSION_CONTROLLER_ADD_AKS_SELECTORS
              value: "true"
    nodeAgent:
      containers:
        agent:
          env:
            - name: DD_CLOUD_PROVIDER_METADATA
              value: "azure"
```

Replace `<DATADOG_SITE>` with your [Datadog site][1]. Your site is {{< region-param key="dd_site" code="true" >}}. (Ensure that the correct SITE for your account is selected on the right of this page).

[1]: /getting_started/site
{{% /tab %}}
{{% tab "Helm" %}}

Custom `datadog-values.yaml`:

```yaml
datadog:
  clusterName: <CLUSTER_NAME>
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>

providers:
  aks:
    enabled: true
```

The `providers.aks.enabled` option sets the necessary environment variable `DD_ADMISSION_CONTROLLER_ADD_AKS_SELECTORS="true"` for you.

{{% /tab %}}
{{< /tabs >}}

### Kubelet serving certificate rotation
If your cluster, **does not** have [Kubelet serving certificate rotation][13] enabled, you must provide additional configuration to enable the Datadog Agent to connect to the Kubelet. Kubelet serving certificate rotation is enabled in Kubernetes clusters 1.27 and above on node pools updated after July 2025.

Your nodes have this feature enabled if they have the label `kubernetes.azure.com/kubelet-serving-ca=cluster`. Verify if all of your nodes have this label by running:

```shell
kubectl get nodes -L kubernetes.azure.com/kubelet-serving-ca
```

Ensure that all your nodes show `cluster`.

#### Without Kubelet serving certificate rotation

If Kubelet serving certificate rotation is not enabled, provide the following additional Kubelet configuration:

{{< tabs >}}
{{% tab "Datadog Operator" %}}

DatadogAgent Kubernetes Resource:

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    site: <DATADOG_SITE>
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    kubelet:
      host:
        fieldRef:
          fieldPath: spec.nodeName
      hostCAPath: /etc/kubernetes/certs/kubeletserver.crt
  override:
    clusterAgent:
      containers:
        cluster-agent:
          env:
            - name: DD_ADMISSION_CONTROLLER_ADD_AKS_SELECTORS
              value: "true"
```
{{% /tab %}}
{{% tab "Helm" %}}

Custom `datadog-values.yaml`:

```yaml
datadog:
  clusterName: <CLUSTER_NAME>
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  kubelet:
    host:
      valueFrom:
        fieldRef:
          fieldPath: spec.nodeName
    hostCAPath: /etc/kubernetes/certs/kubeletserver.crt

providers:
  aks:
    enabled: true
```
{{% /tab %}}
{{< /tabs >}}

In these AKS node versions, the AKS Kubelet certificate requires changing the Kubelet host to the `spec.nodeName` and the `hostCAPath` location of the certificate, as seen in the previous snippets. This enables TLS verification. Without these changes, the Agent cannot connect to the Kubelet.

<div class="alert alert-info">After Kubelet serving certificate rotation is enabled in your cluster, remove this configuration.</div>

When you upgrade your AKS cluster, you may see the Kubelet serving certificate rotation feature enabled for you automatically, which can negatively impact your Datadog Agent if you are using the above special configuration to reference the certificate `/etc/kubernetes/certs/kubeletserver.crt`. When Kubelet serving certificate rotation is enabled, this certificate is removed, causing:

- In Datadog Operator: The Agent container shuts down in `Error`, as it cannot connect to the Kubelet, and it logs `Error while getting hostname, exiting: unable to reliably determine the host name`
- In Helm: The Agent pod fails to start with the warning event `MountVolume.SetUp failed for volume "kubelet-ca" : hostPath type check failed: /etc/kubernetes/certs/kubeletserver.crt is not a file`

In these cases, remove the additional Kubelet configurations. 

As an alternative, you can also [connect to the Kubelet without TLS verification](#without-tls-verification).

### Without TLS verification

In some clusters, DNS resolution for `spec.nodeName` inside Pods does not work in AKS. This affects:
 - Windows nodes
 - Linux nodes, when the cluster is set up in a virtual network using custom DNS

In this case, use the AKS configuration provided below to set `tlsVerify: false` and remove any settings for the Kubelet host path (which defaults to `status.hostIP`). **Do not set the Kubelet host path and `tlsVerify: false` in the same configuration**.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

DatadogAgent Kubernetes Resource:

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    kubelet:
      tlsVerify: false
  override:
    clusterAgent:
      containers:
        cluster-agent:
          env:
            - name: DD_ADMISSION_CONTROLLER_ADD_AKS_SELECTORS
              value: "true"
```

{{% /tab %}}
{{% tab "Helm" %}}

Custom `datadog-values.yaml`:

```yaml
datadog:
  clusterName: <CLUSTER_NAME>
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  kubelet:
    tlsVerify: false

providers:
  aks:
    enabled: true
```

{{% /tab %}}
{{< /tabs >}}

## Google Kubernetes Engine (GKE) {#GKE}

GKE can be configured in two different mode of operation:

- **Standard**: You manage the cluster's underlying infrastructure, giving you node configuration flexibility.
- **Autopilot**: GKE provisions and manages the cluster's underlying infrastructure, including nodes and node pools, giving you an optimized cluster with a hands-off experience.

Depending on the operation mode of your cluster, the Datadog Agent needs to be configured differently.

### Standard

Since Agent 7.26, no specific configuration is required for GKE (whether you run `Docker` or `containerd`).

**Note**: When using COS (Container Optimized OS), the eBPF-based `OOM Kill` and `TCP Queue Length` checks are supported starting from the version 3.0.1 of the Helm chart. To enable these checks, configure the following setting:
- `datadog.systemProbe.enableDefaultKernelHeadersPaths` to `false`.

### Autopilot

GKE Autopilot requires some configuration, shown below.

Datadog recommends that you specify resource limits for the Agent container. Autopilot sets a relatively low default limit (50m CPU, 100Mi memory) that may lead the Agent container to quickly OOMKill depending on your environment. If applicable, also specify resource limits for the Trace Agent, Process Agent and System-Probe containers. Additionally, you may wish to create a priority class for the Agent to ensure it is scheduled.

Starting with Agent `7.65.0+` and version `3.113.0+` of the Helm chart, Datadog recommends using `datadog.kubelet.useApiServer` for the Agent to query the pod list from the API server. Avoid using the [deprecated read-only kubelet port][12].


{{< tabs >}}
{{% tab "Helm" %}}

Custom `datadog-values.yaml`:

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>

  # The site of the Datadog intake to send Agent data to (example: `us3.datadoghq.com`)
  # Default value is `datadoghq.com' (the US1 site)
  # Documentation: https://docs.datadoghq.com/getting_started/site/
  site: <DATADOG_SITE>

  # This option uses the API server to retrieve the node-level pod list from the API server.
  # This setting is necessary to migrate away from the deprecated read-only kubelet port.
  # Requires Agent 7.65.0+ and Datadog Helm chart version 3.113.0+.
  kubelet:
    useApiServer: true

agents:
  containers:
    agent:
      # resources for the Agent container
      resources:
        requests:
          cpu: 200m
          memory: 256Mi

    traceAgent:
      # resources for the Trace Agent container
      resources:
        requests:
          cpu: 100m
          memory: 200Mi

    processAgent:
      # resources for the Process Agent container
      resources:
        requests:
          cpu: 100m
          memory: 200Mi

    systemProbe:
      # resources for the System Probe container
      resources:
        requests:
          cpu: 100m
          memory: 400Mi

  priorityClassCreate: true

providers:
  gke:
    autopilot: true
```

{{% /tab %}}
{{< /tabs >}}

### Spot pods and compute classes

Using [Spot Pods][10] in GKE Autopilot clusters introduces [taints][9] to the corresponding Spot GKE nodes. When using Spot Pods, additional configuration is required to provide the Agent DaemonSet with a matching toleration.

{{< tabs >}}
{{% tab "Helm" %}}
```yaml
agents:
  #(...)
  # agents.tolerations -- Allow the DaemonSet to schedule on tainted nodes (requires Kubernetes >= 1.6)
  tolerations:
  - effect: NoSchedule
    key: cloud.google.com/gke-spot
    operator: Equal
    value: "true"
```
{{% /tab %}}
{{< /tabs >}}

Similarly when using [GKE Autopilot Compute classes][11] to run workloads that have specific hardware requirements, take note of the [taints][9] that GKE Autopilot is applying to these specific nodes and add matching tolerations to the Agent DaemonSet. You can match the tolerations on your corresponding pods. For example for the `Scale-Out` compute class use a toleration like:

{{< tabs >}}
{{% tab "Helm" %}}
```yaml
agents:
  #(...)
  # agents.tolerations -- Allow the DaemonSet to schedule on tainted nodes (requires Kubernetes >= 1.6)
  tolerations:
  - effect: NoSchedule
    key: cloud.google.com/compute-class
    operator: Equal
    value: Scale-Out
```
{{% /tab %}}
{{< /tabs >}}


## Red Hat OpenShift {#Openshift}

OpenShift comes with hardened security by default with SELinux and SecurityContextConstraints (SCC). As a result, it requires some specific configurations:
- Elevated SCC access for the Node Agent and Cluster Agent
- Kubelet API certificates may not always be signed by cluster CA
- Tolerations are required to schedule the Node Agent on `master` and `infra` nodes
- Cluster name should be set as it cannot be retrieved automatically from cloud provider
- *(Optional)* Set `hostNetwork: true` in the Node Agent to allow the Agent to make requests to cloud provider metadata services (IMDS)

This core configuration supports OpenShift 3.11 and OpenShift 4, but it works best with OpenShift 4.

Additionally log collection and APM have slightly different requirements as well.

The use of Unix Domain Socket (UDS) for APM and DogStatsD can work in OpenShift. However, Datadog does not recommend this, as it requires additional privileged permissions and SCC access to **both** your Datadog Agent pod and your application pod. Without these, your application pod can fail to deploy. Datadog recommends disabling the UDS option to avoid this, allowing the Admission Controller to inject the appropriate [TCP/IP setting][7] or [Service setting][8] for APM connectivity.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

When using the Datadog Operator in OpenShift, Datadog recommends that you use the Operator Lifecycle Manager to deploy the Datadog Operator from OperatorHub in your OpenShift Cluster web console. Refer to the [Operator install steps][1]. The configuration below works with that setup, which creates the [ClusterRole and ClusterRoleBinding based access to the SCC][2] for the specified ServiceAccount `datadog-agent-scc`. This `DatadogAgent` configuration should be deployed in the same namespace as the Datadog Operator.

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
  namespace: openshift-operators # set as the same namespace where the Datadog Operator was deployed
spec:
  features:
    logCollection:
      enabled: true
      containerCollectAll: true
    apm:
      enabled: true
      hostPortConfig:
        enabled: true
      unixDomainSocketConfig:
        enabled: false
    dogstatsd:
      unixDomainSocketConfig:
        enabled: false
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    clusterName: <CLUSTER_NAME>
    kubelet:
      tlsVerify: false
  override:
    clusterAgent:
      serviceAccountName: datadog-agent-scc
    nodeAgent:
      serviceAccountName: datadog-agent-scc
      hostNetwork: true
      securityContext:
        runAsUser: 0
        seLinuxOptions:
          level: s0
          role: system_r
          type: spc_t
          user: system_u
      tolerations:
        - key: node-role.kubernetes.io/master
          operator: Exists
          effect: NoSchedule
        - key: node-role.kubernetes.io/infra
          operator: Exists
          effect: NoSchedule
```

**Note**: The `nodeAgent.securityContext.seLinuxOptions` override is necessary for log collection when deploying with the Operator. If log collection is not enabled, you can omit this override.

[1]: https://github.com/DataDog/datadog-operator/blob/main/docs/install-openshift.md
[2]: https://docs.openshift.com/container-platform/4.10/authentication/managing-security-context-constraints.html#role-based-access-to-ssc_configuring-internal-oauth
{{% /tab %}}
{{% tab "Helm" %}}

The configuration below creates custom SCCs for the Agent and Cluster Agent Service Accounts.

Custom `datadog-values.yaml`:

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
  kubelet:
    tlsVerify: false
  apm:
    portEnabled: true
    socketEnabled: false
agents:
  podSecurity:
    securityContextConstraints:
      create: true
  useHostNetwork: true
  tolerations:
    - effect: NoSchedule
      key: node-role.kubernetes.io/master
      operator: Exists
    - effect: NoSchedule
      key: node-role.kubernetes.io/infra
      operator: Exists
clusterAgent:
  podSecurity:
    securityContextConstraints:
      create: true
```

{{% /tab %}}

{{< /tabs >}}

## Rancher {#Rancher}

Rancher installations are similar to vanilla Kubernetes installations, requiring only some minor configuration:
- Tolerations are required to schedule the Node Agent on `controlplane` and `etcd` nodes.
- The cluster name should be set as it cannot be retrieved automatically from the cloud provider.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

DatadogAgent Kubernetes Resource:

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  features:
    logCollection:
      enabled: false
    liveProcessCollection:
      enabled: false
    liveContainerCollection:
      enabled: true
    apm:
      enabled: false
    cspm:
      enabled: false
    cws:
      enabled: false
    npm:
      enabled: false
    admissionController:
      enabled: false
    externalMetricsServer:
      enabled: false
      useDatadogMetrics: false
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    clusterName: <CLUSTER_NAME>
    kubelet:
      tlsVerify: false
  override:
    clusterAgent:
      image:
        name: gcr.io/datadoghq/cluster-agent:latest
    nodeAgent:
      image:
        name: gcr.io/datadoghq/agent:latest
      tolerations:
        - key: node-role.kubernetes.io/controlplane
          operator: Exists
          effect: NoSchedule
        - key: node-role.kubernetes.io/etcd
          operator: Exists
          effect: NoExecute
```

{{% /tab %}}
{{% tab "Helm" %}}

Custom `datadog-values.yaml`:

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
  kubelet:
    tlsVerify: false
agents:
  tolerations:
    - effect: NoSchedule
      key: node-role.kubernetes.io/controlplane
      operator: Exists
    - effect: NoExecute
      key: node-role.kubernetes.io/etcd
      operator: Exists
```

{{% /tab %}}

{{< /tabs >}}

## Oracle Container Engine for Kubernetes (OKE) {#OKE}

No specific configuration is required.

## vSphere Tanzu Kubernetes Grid (TKG) {#TKG}

TKG requires some small configuration changes, shown below. For example, setting a toleration is required for the controller to schedule the Node Agent on the `master` nodes.


{{< tabs >}}
{{% tab "Datadog Operator" %}}

DatadogAgent Kubernetes Resource:

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  features:
    eventCollection:
      collectKubernetesEvents: true
    kubeStateMetricsCore:
      enabled: true
  global:
    clusterName: <CLUSTER_NAME>
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
      appSecret:
        secretName: datadog-secret
        keyName: app-key
    kubelet:
      tlsVerify: false
  override:
    nodeAgent:
      tolerations:
        - key: node-role.kubernetes.io/master
          effect: NoSchedule
```

{{% /tab %}}
{{% tab "Helm" %}}

Custom `datadog-values.yaml`:

```yaml
datadog:
  clusterName: <CLUSTER_NAME>
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  kubelet:
    # Set tlsVerify to false since the Kubelet certificates are self-signed
    tlsVerify: false
  # Disable the `kube-state-metrics` dependency chart installation.
  kubeStateMetricsEnabled: false
  # Enable the new `kubernetes_state_core` check.
  kubeStateMetricsCore:
    enabled: true
# Add a toleration so that the agent can be scheduled on the control plane nodes.
agents:
  tolerations:
    - key: node-role.kubernetes.io/master
      effect: NoSchedule
```

{{% /tab %}}

{{< /tabs >}}


{{< partial name="whats-next/whats-next.html" >}}

[1]: /containers/cluster_agent/admission_controller
[2]: https://github.com/Azure/AKS/releases/tag/2022-10-30
[3]: https://github.com/DataDog/helm-charts/tree/main/examples/datadog
[4]: https://github.com/DataDog/datadog-operator/tree/main/examples/datadogagent/v2alpha1
[5]: /getting_started/containers/datadog_operator
[6]: /agent/guide/operator-eks-addon
[7]: /containers/kubernetes/apm/?tab=tcp
[8]: /tracing/guide/setting_up_apm_with_kubernetes_service
[9]: https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/
[10]: https://cloud.google.com/kubernetes-engine/docs/how-to/autopilot-spot-pods
[11]: https://cloud.google.com/kubernetes-engine/docs/concepts/autopilot-compute-classes
[12]: https://cloud.google.com/kubernetes-engine/docs/how-to/disable-kubelet-readonly-port
[13]: https://learn.microsoft.com/en-us/azure/aks/certificate-rotation#kubelet-serving-certificate-rotation
