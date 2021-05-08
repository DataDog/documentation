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

More `values.yaml` examples can be found in our [Helm chart repository][1]
More `DatadogAgent` examples can be found in our [Datadog Operator repository][2]

## AWS Elastic Kubernetes Service (EKS)

No specific configuration is required unless your nodes run Bottlerocket.

With Bottlerocket, specifying the `containerd` socket path is required to run the `containerd` check:

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

Datadog Agent CR:

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

## Azure Kubernetes Service (AKS)

AKS requires specific configuration for the `Kubelet` integration due to AKS certificates setup.

**Note**: In some setups, DNS resolution for `spec.nodeName` inside Pods may not work in AKS. In this case, using `tlsVerify: false` is required.
This has been reported on all AKS Windows nodes and occasionally on some Linux setups (mainly on Kubernetes < 1.18)

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

Datadog Agent CR:

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

## Google Kubernetes Engine (GKE)

Since Agent 7.26, no specific configuration is required for GKE anymore (whether you run `Docker` and/or `containerd`).

**Note**: When using COS (Container Optimized OS), the eBPF-based `OOM Kill` and `TCP Queue Length` checks are not supported due to missing Kernel headers.

## RedHat OpenShift

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

When using the Datadog Operator in OpenShift, we recommend to install it through OperatorHub.
The configuration below is meant to work this this setup (due to SCC/ServiceAccount setup).

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
      admissionController:
        enabled: false
  agent:
    image:
      name: "gcr.io/datadoghq/agent:latest"
    config:
      kubelet:
        tlsVerify: false
      criSocket:
        criSocketPath: /var/run/crio/crio.sock
        useCriSocketVolume: true
    log:
      enabled: false
  clusterAgent:
    image:
      name: "gcr.io/datadoghq/cluster-agent:latest"
    config:
      externalMetrics:
        enabled: false
        port: 8443
```

{{% /tab %}}
{{< /tabs >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/helm-charts/tree/master/examples/datadog
[2]: https://github.com/DataDog/datadog-operator/tree/master/examples/datadogagent
