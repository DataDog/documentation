---
title: Kubernetes distributions
kind: documentation
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
{{< tab "Helm" >}}
{{< /tab >}}
{{< tab "Operator" >}}
{{< /tab >}}
{{< /tabs >}}

## Azure Kubernetes Service (AKS) {#AKS}

AKS requires specific configuration for the `Kubelet` integration due to AKS certificates setup.

{{< tabs >}}
{{< tab "Helm" >}}
{{< /tab >}}
{{< tab "Operator" >}}
{{< /tab >}}
{{< /tabs >}}

**Notes**:

- As of Agent 7.35, `tlsVerify: false` is required because Kubelet certificates in AKS do not have a Subject Alternative Name (SAN) set.

- In some setups, DNS resolution for `spec.nodeName` inside Pods may not work in AKS. This has been reported on all AKS Windows nodes and when cluster is setup in a Virtual Network using custom DNS on Linux nodes. In this case, removing the `agent.config.kubelet.host` field (defaults to `status.hostIP`) and using `tlsVerify: false` is **required**. Using the `DD_KUBELET_TLS_VERIFY=false` environment variable also resolves this issue. Both of these options deactivate verification of the server certificate.

  ```yaml
  env:
    - name: DD_KUBELET_TLS_VERIFY
      value: "false"
  ```

## Google Kubernetes Engine (GKE) {#GKE}

GKE can be configured in two different mode of operation:

- **Standard**: You manage the cluster's underlying infrastructure, giving you node configuration flexibility.
- **Autopilot**: GKE provisions and manages the cluster's underlying infrastructure, including nodes and node pools, giving you an optimized cluster with a hands-off experience.

Depending on the operation mode of your cluster, the Datadog Agent needs to be configured differently.

### Standard

Since Agent 7.26, no specific configuration is required for GKE (whether you run `Docker` or `containerd`).

**Note**: When using COS (Container Optimized OS), the eBPF-based `OOM Kill` and `TCP Queue Length` checks are supported starting from the version 3.0.1 of the Helm chart. To enable these checks, configure the following settings:
- `datadog.systemProbe.enableDefaultKernelHeadersPaths` to `false`.
- `datadog.systemProbe.enableKernelHeaderDownload` to `true`.

### Autopilot

GKE Autopilot requires some configuration, shown below.

Datadog recommends that you specify resource limits for the Agent container. Autopilot sets a relatively low default limit (50m CPU, 100Mi memory) that may quickly lead the Agent container to OOMKill depending on your environment. If applicable, also specify resource limits for the Trace Agent and Process Agent containers.

{{< tabs >}}
{{< tab "Helm" >}}
{{< /tab >}}
{{< /tabs >}}


## Red Hat OpenShift {#Openshift}

OpenShift comes with hardened security by default (SELinux, SecurityContextConstraints), thus requiring some specific configuration:
- Create SCC for Node Agent and Cluster Agent
- Specific CRI socket path as OpenShift uses CRI-O container runtime
- Kubelet API certificates may not always be signed by cluster CA
- Tolerations are required to schedule the Node Agent on `master` and `infra` nodes
- Cluster name should be set as it cannot be retrieved automatically from cloud provider

This configuration supports OpenShift 3.11 and OpenShift 4, but works best with OpenShift 4.

{{< tabs >}}
{{< tab "Helm" >}}
{{< /tab >}}
{{< tab "Operator" >}}
{{< /tab >}}
{{< /tabs >}}

## Rancher {#Rancher}

Rancher installations are close to vanilla Kubernetes, requiring only some minor configuration:
- Tolerations are required to schedule the Node Agent on `controlplane` and `etcd` nodes
- Cluster name should be set as it cannot be retrieved automatically from cloud provider

{{< tabs >}}
{{< tab "Helm" >}}
{{< /tab >}}
{{< tab "Operator" >}}
{{< /tab >}}
{{< /tabs >}}

## Oracle Container Engine for Kubernetes (OKE) {#OKE}

No specific configuration is required.

To enable container monitoring, add the following (`containerd` check):

{{< tabs >}}
{{< tab "Helm" >}}
{{< /tab >}}
{{< tab "Operator" >}}
{{< /tab >}}
{{< /tabs >}}

More `values.yaml` examples can be found in the [Helm chart repository][1]
More `DatadogAgent` examples can be found in the [Datadog Operator repository][2]

## vSphere Tanzu Kubernetes Grid (TKG) {#TKG}

TKG requires some small configuration changes, shown below. For example, setting a toleration is required for the controller to schedule the Node Agent on the `master` nodes.


{{< tabs >}}
{{< tab "Helm" >}}
{{< /tab >}}
{{< tab "Operator" >}}
{{< /tab >}}
{{< /tabs >}}


{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/helm-charts/tree/master/examples/datadog
[2]: https://github.com/DataDog/datadog-operator/tree/master/examples/datadogagent
