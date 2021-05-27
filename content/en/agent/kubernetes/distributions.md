---
title: Kubernetes distributions
kind: documentation
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
---

## Overview

This section aims to document specificites and to provide good base configuration for all major Kubernetes distributions.
These configuration can then be customized to add any Datadog feature.

* [AWS Elastic Kubernetes Service (EKS)](#EKS)
* [Azure Kubernetes Service (AKS)](#AKS)
* [Google Kubernetes Engine (GKE)](#GKE)
* [Red Hat OpenShift](#Openshift)
* [Rancher](#Rancher)

## AWS Elastic Kubernetes Service (EKS) {#EKS}

No specific configuration is required.

If you are using AWS Bottlerocket OS on your nodes, add the following to enable container monitoring (`containerd` check):

{{< tabs >}}
{{% tab "Helm" %}}

Custom `values.yaml`:

```
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  criSocketPath: /run/dockershim.sock
```

{{% /tab %}}
{{% tab "Operator" %}}

DatadogAgent Kubernetes Resource:

```
apiVersion: datadoghq.com/v1alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  credentials:
    apiKey: <DATADOG_API_KEY>
    appKey: <DATADOG_APP_KEY>
  agent:
    config:
      criSocket:
        criSocketPath: /run/dockershim.sock
  agent:
    image:
      name: "gcr.io/datadoghq/agent:latest"
    apm:
      enabled: false
    process:
      enabled: true
      processCollection: false
    log:
      enabled: false
    systemProbe:
      enabled: false
    security:
      compliance:
        enabled: false
      runtime:
        enabled: false
  clusterAgent:
    image:
      name: "gcr.io/datadoghq/cluster-agent:latest"
    config:
      externalMetrics:
        enabled: false
      admissionController:
        enabled: false
```

{{% /tab %}}
{{< /tabs >}}

## Azure Kubernetes Service (AKS) {#AKS}

AKS requires specific configuration for the `Kubelet` integration due to AKS certificates setup.

{{< tabs >}}
{{% tab "Helm" %}}

Custom `values.yaml`:

```
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  kubelet:
    host:
      valueFrom:
        fieldRef:
          fieldPath: spec.nodeName
    hostCAPath: /etc/kubernetes/certs/kubeletserver.crt
    # tlsVerify: false # If Kubelet integration fails with provided configuration
```

{{% /tab %}}
{{% tab "Operator" %}}

DatadogAgent Kubernetes Resource:

```
apiVersion: datadoghq.com/v1alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  credentials:
    apiKey: <DATADOG_API_KEY>
    appKey: <DATADOG_APP_KEY>
  agent:
    config:
      kubelet:
        host:
          valueFrom:
            fieldRef:
              fieldPath: spec.nodeName
        hostCAPath: /etc/kubernetes/certs/kubeletserver.crt
        # tlsVerify: false # If Kubelet integration fails with provided configuration
  agent:
    image:
      name: "gcr.io/datadoghq/agent:latest"
    apm:
      enabled: false
    process:
      enabled: true
      processCollection: false
    log:
      enabled: false
    systemProbe:
      enabled: false
    security:
      compliance:
        enabled: false
      runtime:
        enabled: false
  clusterAgent:
    image:
      name: "gcr.io/datadoghq/cluster-agent:latest"
    config:
      externalMetrics:
        enabled: false
      admissionController:
        enabled: false
```

{{% /tab %}}
{{< /tabs >}}

**Note**: In some setups, DNS resolution for `spec.nodeName` inside Pods may not work in AKS.
This has been reported on all AKS Windows nodes and when cluster is setup in a Virtual Network using custom DNS on Linux nodes.
In this case, using `tlsVerify: false` is required.

## Google Kubernetes Engine (GKE) {#GKE}

GKE can be configured in two different mode of operation:

- **Standard**: You manage the cluster's underlying infrastructure, giving you node configuration flexibility.
- **Autopilot**: GKE provisions and manages the cluster's underlying infrastructure, including nodes and node pools, giving you an optimized cluster with a hands-off experience.

Depending of your cluster the operation mode, the Datadog agent needs to be configured differently.

### Standard

Since Agent 7.26, no specific configuration is required for GKE anymore (whether you run `Docker` and/or `containerd`).

**Note**: When using COS (Container Optimized OS), the eBPF-based `OOM Kill` and `TCP Queue Length` checks are not supported due to missing Kernel headers.

### Autopilot

GKE Autopilot comes with hardened security and limited Nodes access. Thus requiring some specific configuration.

{{< tabs >}}
{{% tab "Helm" %}}

Custom `values.yaml`:

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>

  # Enable the new `kubernetes_state_core` check.
  kubeStateMetricsCore:
    enabled: true
  # Avoid deploying kube-state-metrics chart.
  # The new `kubernetes_state_core` doesn't require to deploy the kube-state-metrics anymore.
  kubeStateMetricsEnabled: false

providers:
  gke:
    autopilot: true
```

{{% /tab %}}
{{% tab "Operator" %}}

Not supported yet. Will be available with the Datadog Operator v0.7.0.

{{% /tab %}}
{{< /tabs >}}


## Red Hat OpenShift {#Openshift}

OpenShift comes with hardened security by default (SELinux, SecurityContextConstraints), thus requiring some specific configuration:
- Create SCC for Node Agent and Cluster Agent
- Specific CRI socket path as OpenShift uses CRI-O container runtime
- Kubelet API certificates may not be signed by cluster CA
- Tolerations are required to schedule the Node Agent on `master` and `infra` nodes
- Cluster name should be set as it cannot be retrieved automatically from cloud provider

This configuration supports OpenShift 3.11 and OpenShift 4, but works best with OpenShift 4.

{{< tabs >}}
{{% tab "Helm" %}}

Custom `values.yaml`:

```
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
{{% tab "Operator" %}}

When using the Datadog Operator in OpenShift, it is recommended that you install it through OperatorHub or RedHat Marketplace.
The configuration below is meant to work with this setup (due to SCC/ServiceAccount setup), when the
Agent is installed in the same namespace as the Datadog Operator.

```
apiVersion: datadoghq.com/v1alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  credentials:
    apiKey: <DATADOG_API_KEY>
    appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
  agent:
    image:
      name: "gcr.io/datadoghq/agent:latest"
    apm:
      enabled: false
    process:
      enabled: true
      processCollection: false
    log:
      enabled: false
    systemProbe:
      enabled: false
    security:
      compliance:
        enabled: false
      runtime:
        enabled: false
    rbac:
      serviceAccountName: datadog-agent-scc
    config:
      kubelet:
        tlsVerify: false
      criSocket:
        criSocketPath: /var/run/crio/crio.sock
        useCriSocketVolume: true
      tolerations:
      - effect: NoSchedule
        key: node-role.kubernetes.io/master
        operator: Exists
      - effect: NoSchedule
        key: node-role.kubernetes.io/infra
        operator: Exists
  clusterAgent:
    image:
      name: "gcr.io/datadoghq/cluster-agent:latest"
    config:
      externalMetrics:
        enabled: false
        port: 8443
      admissionController:
        enabled: false
```

{{% /tab %}}
{{< /tabs >}}

## Rancher {#Rancher}

Rancher installations are close to vanilla Kubernetes, requiring only some minor configuration:
- Tolerations are required to schedule the Node Agent on `controlplane` and `etcd` nodes
- Cluster name should be set as it cannot be retrieved automatically from cloud provider

{{< tabs >}}
{{% tab "Helm" %}}

Custom `values.yaml`:

```
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
{{% tab "Operator" %}}

DatadogAgent Kubernetes Resource:

```
apiVersion: datadoghq.com/v1alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  credentials:
    apiKey: <DATADOG_API_KEY>
    appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
  agent:
    image:
      name: "gcr.io/datadoghq/agent:latest"
    apm:
      enabled: false
    process:
      enabled: true
      processCollection: false
    log:
      enabled: false
    systemProbe:
      enabled: false
    security:
      compliance:
        enabled: false
      runtime:
        enabled: false
    config:
      kubelet:
        tlsVerify: false
      tolerations:
      - effect: NoSchedule
        key: node-role.kubernetes.io/controlplane
        operator: Exists
      - effect: NoExecute
        key: node-role.kubernetes.io/etcd
        operator: Exists
  clusterAgent:
    image:
      name: "gcr.io/datadoghq/cluster-agent:latest"
    config:
      externalMetrics:
        enabled: false
      admissionController:
        enabled: false
```

{{% /tab %}}
{{< /tabs >}}

More `values.yaml` examples can be found in the [Helm chart repository][1]
More `DatadogAgent` examples can be found in the [Datadog Operator repository][2]

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/helm-charts/tree/master/examples/datadog
[2]: https://github.com/DataDog/datadog-operator/tree/master/examples/datadogagent
