---
title: Kubernetes distributions
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
These configuration can then be customized to add any Datadog feature.

* [AWS Elastic Kubernetes Service (EKS)](#EKS)
* [Azure Kubernetes Service (AKS)](#AKS)
* [Google Kubernetes Engine (GKE)](#GKE)
* [Red Hat OpenShift](#Openshift)
* [Rancher](#Rancher)
* [Oracle Container Engine for Kubernetes (OKE)](#OKE)
* [vSphere Tanzu Kubernetes Grid (TKG)](#TKG)

## AWS Elastic Kubernetes Service (EKS) {#EKS}

No specific configuration is required.

If you are using AWS Bottlerocket OS on your nodes, add the following to enable container monitoring (`containerd` check):

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
  features:
    admissionController:
      enabled: false
    externalMetricsServer:
      enabled: false
      useDatadogMetrics: false
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    criSocketPath: /run/dockershim.sock
  override:
    clusterAgent:
      image:
        name: gcr.io/datadoghq/cluster-agent:latest
```

[1]:/containers/kubernetes/installation/?tab=datadogoperator
[2]: /agent/guide/operator-eks-addon

{{% /tab %}}
{{% tab "Helm" %}}

Custom `datadog-values.yaml`:

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  criSocketPath: /run/dockershim.sock
  env:
    - name: DD_AUTOCONFIG_INCLUDE_FEATURES
      value: "containerd"
```

{{% /tab %}}

{{< /tabs >}}

## Azure Kubernetes Service (AKS) {#AKS}

AKS requires a specific configuration for the `Kubelet` integration due to how AKS has setup the SSL Certificates. Additionally, the optional [Admission Controller][1] feature requires a specific configuration to prevent an error when reconciling the webhook.

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
    admissionController:
      enabled: true
  global:
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
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  # Required as of Agent 7.35. See Kubelet Certificate note below.
  kubelet:
    tlsVerify: false

providers:
  aks:
    enabled: true
```

The `providers.aks.enabled` option sets the necessary environment variable `DD_ADMISSION_CONTROLLER_ADD_AKS_SELECTORS="true"` for you.

{{% /tab %}}

{{< /tabs >}}

The `kubelet.tlsVerify=false` sets the environment variable `DD_KUBELET_TLS_VERIFY=false` for you to deactivate verification of the server certificate.

### AKS Kubelet certificate

There is a known issue with the format of the AKS Kubelet certificate in older node image versions. As of Agent 7.35, it is required to use `tlsVerify: false` as the certificates did not contain a valid Subject Alternative Name (SAN).

If all the nodes within your AKS cluster are using a supported node image version, you can use Kubelet TLS Verification. Your version must be at or above the [versions listed here for the 2022-10-30 release][2]. You must also update your Kubelet configuration to use the node name for the address and map in the custom certificate path.

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
    admissionController:
      enabled: true
  global:
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
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  # Requires supported node image version
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

Using `spec.nodeName` keeps TLS verification. In some setups, DNS resolution for `spec.nodeName` inside Pods may not work in AKS. This has been reported on all AKS Windows nodes and when the cluster is setup in a Virtual Network using custom DNS on Linux nodes. In this case use the first AKS configuration provided: remove any settings for the Kubelet host path (defaults to `status.hostIP`) and use `tlsVerify: false`. This setting is **required**. Do NOT set the Kubelet host path and `tlsVerify: false` together.

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

Datadog recommends that you specify resource limits for the Agent container. Autopilot sets a relatively low default limit (50m CPU, 100Mi memory) that may lead the Agent container to quickly OOMKill depending on your environment. If applicable, also specify resource limits for the Trace Agent and Process Agent containers. Additionally, you may wish to create a priority class for the Agent to ensure it is scheduled.

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

  priorityClassCreate: true

providers:
  gke:
    autopilot: true
```

{{% /tab %}}
{{< /tabs >}}

### Spot pods and instances

Using Spot Pods in GKE Autopilot clusters introduces taints to these GKE nodes. To use Spot Pods, additional configuration is required to provide the Datadog Agent with tolerations.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
  override:
    nodeAgent:
      tolerations:
        - effect: NoSchedule
          key: cloud.google.com/gke-spot
          operator: Equal
          value: "true"
```
{{% /tab %}}
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

**Note**: Network Performance Monitoring is not supported for GKE Autopilot.

## Red Hat OpenShift {#Openshift}

OpenShift comes with hardened security by default (SELinux, SecurityContextConstraints), thus requiring some specific configuration:
- Create SCC for Node Agent and Cluster Agent
- Specific CRI socket path as OpenShift uses CRI-O container runtime
- Kubelet API certificates may not always be signed by cluster CA
- Tolerations are required to schedule the Node Agent on `master` and `infra` nodes
- Cluster name should be set as it cannot be retrieved automatically from cloud provider

This configuration supports OpenShift 3.11 and OpenShift 4, but works best with OpenShift 4.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

When using the Datadog Operator in OpenShift, it is recommended that you install it through OperatorHub or RedHat Marketplace.
The configuration below is meant to work with this setup (due to SCC/ServiceAccount setup), when the
Agent is installed in the same namespace as the Datadog Operator.

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
      port: 8443
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    clusterName: <CLUSTER_NAME>
    kubelet:
      tlsVerify: false
    criSocketPath: /var/run/crio/crio.sock
  override:
    clusterAgent:
      image:
        name: gcr.io/datadoghq/cluster-agent:latest
      containers:
        cluster-agent:
          securityContext:
            readOnlyRootFilesystem: false
    nodeAgent:
      serviceAccountName: datadog-agent-scc
      securityContext:
        runAsUser: 0
        seLinuxOptions:
          level: s0
          role: system_r
          type: spc_t
          user: system_u
      image:
        name: gcr.io/datadoghq/agent:latest
      tolerations:
        - key: node-role.kubernetes.io/master
          operator: Exists
          effect: NoSchedule
        - key: node-role.kubernetes.io/infra
          operator: Exists
          effect: NoSchedule
```

**Note**: The nodeAgent Security Context override is necessary for Log Collection and APM Trace Collection with the `/var/run/datadog/apm/apm.socket` socket. If these features are not enabled, you can omit this override.

{{% /tab %}}
{{% tab "Helm" %}}

Custom `datadog-values.yaml`:

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
  criSocketPath: /var/run/crio/crio.sock
  # Depending on your DNS/SSL setup, it might not be possible to verify the Kubelet cert properly
  # If you have proper CA, you can switch it to true
  kubelet:
    tlsVerify: false
agents:
  podSecurity:
    securityContextConstraints:
      create: true
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
kube-state-metrics:
  securityContext:
    enabled: false
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

To enable container monitoring, add the following (`containerd` check):

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
    admissionController:
      enabled: false
    externalMetricsServer:
      enabled: false
      useDatadogMetrics: false
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    criSocketPath: /run/dockershim.sock
  override:
    clusterAgent:
      image:
        name: gcr.io/datadoghq/cluster-agent:latest
```

{{% /tab %}}
{{% tab "Helm" %}}

Custom `datadog-values.yaml`:

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  criSocketPath: /run/dockershim.sock
  env:
    - name: DD_AUTOCONFIG_INCLUDE_FEATURES
      value: "containerd"
```

{{% /tab %}}

{{< /tabs >}}

More `datadog-values.yaml` examples can be found in the [Helm chart repository][3].
More `datadog-agent.yaml` examples can be found in the [Datadog Operator repository][4].

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
