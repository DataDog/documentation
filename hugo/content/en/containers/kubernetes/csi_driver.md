---
title: Datadog CSI Driver
description: High-performance observability for secure Kubernetes environments using the Datadog CSI Driver
aliases:
- /containers/csi_driver
- /agent/kubernetes/csi
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-csi-driver/"
  tag: "Blog"
  text: "Bring high-performance observability to secure Kubernetes environments with Datadog's CSI driver"
---

## Overview

This page provides an overview of the Datadog CSI Driver and installation instructions on a Kubernetes cluster.

For more information about Kubernetes Container Storage Interface (CSI), see the [Kubernetes CSI documentation][4].

The Datadog CSI Driver is [open source][1].

<div class="alert alert-info">
   The Datadog CSI Driver is not supported on Windows.
</div>

## How it works

The Datadog CSI Driver is a DaemonSet that runs a gRPC server implementing the CSI specifications on each node of your Kubernetes cluster.

Installing Datadog CSI driver on a Kubernetes cluster allows you to use CSI volumes by specifying the Datadog CSI driver's name.

The Datadog CSI node server is responsible for managing Datadog CSI's volume lifecycle.

## Why use Datadog CSI Driver?

The Datadog CSI Driver allows the Datadog Agent to share the Trace Agent and DogStatsD Unix Domain Sockets with user pods regardless of the namespace [pod security standards][4].

If CSI volumes are not used, the UDS sockets need to be shared with the user pod through hostpath volumes. If the user pod is running in a namespace that has non-privileged pod security standards, the pod fails to start because hostpath volumes are not permitted in that context.

The Datadog CSI Driver shifts the hostpath volume from the user application to the CSI node server: the CSI DaemonSet runs in a separate privileged namespace and allows injecting UDS sockets into user pods with a Datadog CSI volume, which allows user pods to run in namespaces with `baseline` or `restricted` pod security standards.

## Installation and activation

<div class="alert alert-info">
<strong>Notes</strong>:
<ul>
<li/>Requires <a href="https://helm.sh">Helm</a>.
<li/>The Datadog CSI Driver needs to run with privileged security context. This is required for the Datadog CSI Driver to mount volumes from the host file system to the user pods.
</ul>
</div>

{{< tabs >}}

{{% tab "Helm" %}}

To install and activate the Datadog CSI Driver, set `datadog.csi.enabled` to `true` in the Datadog Agent Helm chart.

   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm repo update

   helm install datadog-agent datadog/datadog --set datadog.csi.enabled=true
   ```

{{% /tab %}}

{{% tab "Datadog Operator" %}}

<div class="alert alert-info">
Operator-managed CSI Driver installation requires Datadog Operator <strong>v1.26.0</strong> or later. If you are using an earlier version, see <a href="#legacy-helm-based-installation">Legacy Helm-based installation</a>.
</div>

Starting with Datadog Operator v1.26.0, the Operator can install and manage the CSI Driver automatically. Set `csi.enabled` to `true` in your `DatadogAgent` resource, and the Operator automatically creates a `DatadogCSIDriver` custom resource to deploy the driver:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
    csi:
      enabled: true
```

By default, `csi.autoManage` is `true`, which means the Operator owns the life cycle of the `DatadogCSIDriver` resource. To customize scheduling, add the following `DatadogAgent` spec:

```yaml
    csi:
      enabled: true
      nodeSelector:
        kubernetes.io/os: linux
      tolerations:
        - key: node-role.kubernetes.io/control-plane
          effect: NoSchedule
```

{{% collapse-content title="Advanced setup with DatadogCSIDriver CR" level="h4" %}}

If you need configuration options not exposed through the `DatadogAgent` spec (for example, custom images, container resource limits, update strategies, or per-container environment variables), you can manage the `DatadogCSIDriver` custom resource directly:

1. **Disable automatic management** by setting `csi.autoManage` to `false` in your `DatadogAgent` resource:

   ```yaml
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
   spec:
     global:
       csi:
         enabled: true
         autoManage: false
   ```

2. **Create your own `DatadogCSIDriver` resource** with the desired customizations:

   ```yaml
   apiVersion: datadoghq.com/v1alpha1
   kind: DatadogCSIDriver
   metadata:
     name: datadog-agent
   spec:
     csiDriverImage:
       tag: "1.1.0"
     registrarImage:
       tag: v2.0.0
     apmSocketPath: /var/run/datadog/apm.socket
     dsdSocketPath: /var/run/datadog/dsd.socket
     override:
       labels:
         team: platform
       annotations:
         custom.example.com/env: production
       tolerations:
         - key: node-role.kubernetes.io/control-plane
           effect: NoSchedule
       nodeSelector:
         kubernetes.io/os: linux
       priorityClassName: system-node-critical
       updateStrategy:
         type: RollingUpdate
         rollingUpdate:
           maxUnavailable: "5%"
       containers:
         csi-node-driver:
           env:
             - name: DD_APM_ENABLED
               value: "false"
           resources:
             requests:
               cpu: 100m
               memory: 128Mi
             limits:
               cpu: 200m
               memory: 256Mi
         csi-node-driver-registrar:
           resources:
             requests:
               cpu: 50m
               memory: 64Mi
             limits:
               cpu: 100m
               memory: 128Mi
   ```

   See the full [DatadogCSIDriver CRD reference](https://github.com/DataDog/datadog-operator/blob/main/bundle/manifests/datadoghq.com_datadogcsidrivers.yaml) for all available fields.

{{% /collapse-content %}}

#### Upgrading to Datadog Operator v1.28.0+

<div class="alert alert-warning">
<p>If you previously ran <code>v1.26.0</code> or <code>v1.27.0</code>, upgrading to Datadog Operator <code>v1.28.0</code> or later can leave the built-in Kubernetes <code>CSIDriver</code> object (not the <code>DatadogCSIDriver</code> custom resource) in a state that the Operator cannot reconcile. To resolve this issue, delete the object:</p>
<pre><code>kubectl delete csidriver k8s.csi.datadoghq.com</code></pre>
<p>The Operator recreates it automatically. Already-mounted volumes and running driver pods are unaffected.</p>
</div>

#### Migrating from a Helm-based installation

If you previously installed the CSI Driver with the standalone Helm chart, Datadog recommends migrating to Operator-managed installation. Choose one of the following approaches:

- **Let the Operator manage the CSI Driver**: Uninstall the Helm chart (`helm uninstall datadog-csi-driver`) and keep the default values for `csi.enabled` and `csi.autoManage`. The Operator automatically creates a new `DatadogCSIDriver` resource and deploys the driver.
- **Keep managing the CSI Driver with Helm**: No action is required. The Operator detects the existing `k8s.csi.datadoghq.com` CSIDriver and defers to it, regardless of the `csi.autoManage` value. The Operator does not interfere with your existing Helm-managed driver. To make this intent explicit, set `csi.autoManage: false`.

{{% collapse-content title="Legacy Helm-based installation (Operator < v1.26.0)" level="h4" id="legacy-helm-based-installation" %}}

If the Datadog Agent is deployed using a Datadog Operator version earlier than v1.26.0, you must install the Datadog CSI Driver Helm chart separately before you activate Datadog CSI in the Datadog Agent.

1. **Add the Datadog CSI Helm repository.**

   Run:
   ```shell
   helm repo add datadog-csi-driver https://helm.datadoghq.com
   helm repo update
   ```

2. **Install the Datadog CSI Driver Helm chart.**

   Run:

   ```shell
   helm install datadog-csi-driver datadog/datadog-csi-driver
   ```

3. **Activate Datadog CSI in your `DatadogAgent` resource.**

   ```yaml
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
   spec:
     global:
       credentials:
         apiSecret:
           secretName: datadog-secret
           keyName: api-key
       csi:
         enabled: true
   ```

{{% /collapse-content %}}

{{% /tab %}}

{{% tab "DaemonSet" %}}

If the Datadog Agent is deployed using a DaemonSet, you must install the Datadog CSI Driver Helm chart before you activate the Datadog CSI Driver in the Datadog Agent.

1. **Add the Datadog CSI Driver Helm repository.**

   Run:
   ```shell
   helm repo add datadog-csi-driver https://helm.datadoghq.com
   helm repo update

   ```

2. **Install the Datadog CSI Driver Helm chart.**

   Run:

   ```shell
   helm install datadog-csi-driver datadog/datadog-csi-driver
   ```

3. **Activate Datadog CSI**.

   To activate the Datadog CSI driver, set the following environment variable in the Datadog Cluster Agent container:

   ```
   DD_CSI_DRIVER_ENABLED=true
   ```
{{% /tab %}}

{{< /tabs >}}

### GKE Autopilot support

Starting with Datadog Agent Helm chart version 3.138.0 and Datadog CSI Driver Helm chart version 0.4.2, the Datadog CSI Driver can be installed on Google Kubernetes Engine (GKE) Autopilot clusters.

> **Note:**  
> If CSI driver is not installed using the helm chart, create the following `AllowlistSynchronizer` resource to activate GKE Autopilot support:

```yaml
apiVersion: auto.gke.io/v1
kind: AllowlistSynchronizer
metadata:
  name: datadog-csi-synchronizer
spec:
  allowlistPaths:
    - Datadog/datadog-csi-driver/datadog-datadog-csi-driver-daemonset-exemption-v1.0.1.yaml
```

## Datadog CSI volumes

CSI volumes processed by the Datadog CSI Driver must have the following format:

```yaml
csi:
    driver: k8s.csi.datadoghq.com
    volumeAttributes:
        type: <volume-type>
name: <volume-name>
```

For example:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: pod-name
spec:
  containers:
    - name: ubuntu
      image: ubuntu
      command: ["/bin/bash", "-c", "--"]
      args: ["while true; do sleep 30; echo hello-ubuntu; done;"]
      volumeMounts:
        - mountPath: /var/sockets/apm/
          name: dd-csi-volume-apm-dir
        - mountPath: /var/sockets/dsd/dsd.sock
          name: dd-csi-volume-dsd
  volumes:
    - name: dd-csi-volume-dsd
      csi:
        driver: k8s.csi.datadoghq.com
        readOnly: true
        volumeAttributes:
          type: DSDSocket
    - name: dd-csi-volume-apm-dir
      csi:
        driver: k8s.csi.datadoghq.com
        readOnly: true
        volumeAttributes:
          type: APMSocketDirectory
```

Four types of CSI volume are supported:
* [APMSocket](#apmsocket)
* [APMSocketDirectory](#apmsocketdirectory)
* [DSDSocket](#dsdsocket)
* [DSDSocketDirectory](#dsdsocketdirectory)

### APMSocket

This type is useful for mounting a Trace Agent UDS socket file.

For example:

```yaml
csi:
    driver: k8s.csi.datadoghq.com
    readOnly: true
    volumeAttributes:
        type: APMSocket
name: datadog-apm
```

If the indicated socket doesn't exist, the mount operation fails, and the pod is blocked in the `ContainerCreating` phase.

### APMSocketDirectory

This type is useful for mounting the directory containing the APM socket.

For example:

```yaml
csi:
    driver: k8s.csi.datadoghq.com
    readOnly: true
    volumeAttributes:
        type: APMSocketDirectory
name: datadog
```

### DSDSocket

This type is useful for mounting a DogStatsD UDS socket file.

For example:

```yaml
csi:
    driver: k8s.csi.datadoghq.com
    readOnly: true
    volumeAttributes:
        type: DSDSocket
name: datadog-dsd
```

If the indicated socket doesn't exist, the mount operation fails, and the pod is blocked in the `ContainerCreating` phase.

### DSDSocketDirectory

This type is useful for mounting the directory containing the DogStatsD socket.

For example:

```yaml
csi:
    driver: k8s.csi.datadoghq.com
    readOnly: true
    volumeAttributes:
        type: DSDSocketDirectory
name: datadog
```

<div class="alert alert-info">
With Datadog Agent v7.67+, the Admission Controller can automatically mount Datadog UDS sockets to mutated pods by setting the injection config mode to <code>csi</code>. For more information, see <a href="/containers/cluster_agent/admission_controller#configure-apm-and-dogstatsd-communication-mode">Admission Controller: Configure APM and DogStatsD Communication Mode</a>.

With the default configuration of the Datadog Agent, the Admission Controller injects <code>APMSocketDirectory</code> or <code>DSDSocketDirectory</code>. If the Trace Agent and DogStatsD sockets are both in the same directory on the host, only one volume is injected because this subsequently provides access to both sockets, as they share the same directory on the host.
</div>

## Security considerations

The Datadog CSI Driver requires elevated privileges and specific host access

### Privileged security context
The Datadog CSI Driver must run as a privileged container to perform mount operations and access the host filesystem.

### Access to /var/lib/kubelet/pods
The Datadog CSI Driver needs read-write access to the `/var/lib/kubelet/pods` directory because Kubernetes manages pod volumes using this directory. The Datadog CSI Driver must access `/var/lib/kubelet/pods` to inject Datadog Unix Domain Sockets into user pods.

### Bidirectional mount propagation
Bidirectional mount propagation is required to ensure that volume mounts from the Datadog CSI node server are visible to both the host and the user pods. Without bidirectional mount propagation, the shared sockets cannot propagate correctly into pods.

By isolating the Datadog CSI Driver in a privileged namespace, Kubernetes clusters can safely share Datadog sockets with user pods running under strict Pod Security Standards like baseline or restricted, while minimizing security risks.

<div class="alert alert-info">
   Limit access to the Datadog CSI Driver's namespace and configuration to trusted operators. If the Datadog CSI Driver's elevated privileges are misconfigured, these privileges can be exploited.
</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-csi-driver
[2]: https://hub.docker.com/r/datadog/csi-driver
[3]: https://kubernetes-csi.github.io/docs/introduction.html
[4]: https://kubernetes.io/docs/concepts/security/pod-security-standards/
