---
title: Datadog CSI Driver
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

## Installation and Activation

<div class="alert alert-info">
<strong>Notes</strong>:
<ul>
<li/>Requires <a href="https://helm.sh">Helm</a>.
<li/>The Datadog CSI Driver needs to run with privileged security context. This is required for the Datadog CSI Driver to mount volumes from the host file system to the user pods.
</ul>
</div>

Datadog CSI Driver has its own helm chart that may or may not be required to install manually depending on the Datadog Agent mode used.

{{< tabs >}}

{{% tab "Helm" %}}

If Datadog Agent is deployed using Helm, the CSI driver is installed automatically if Datadog CSI is enabled in Datadog Agent. 

CSI can be enabled during installation by setting `datadog.csi.enabled` to `true` in the Datadog Agent chart.

   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm repo update

   helm install datadog-agent datadog/datadog --set datadog.csi.enabled=true
   ```

{{% /tab %}}

{{% tab "Datadog Operator" %}}

To use Datadog CSI Driver with an operator-based installation of Datadog Agent, Datadog CSI Driver has to be installed manually before activating it in the agent.

1. **Add the Datadog CSI Helm repository.**

   Run:
   ```shell
   helm repo add datadog-csi-driver https://helm.datadoghq.com
   helm repo update

   ```

2. **Install Datadog CSI Driver**

   Run:

   ```shell
   helm install datadog-csi-driver datadog/datadog-csi-driver
   ```

3. **Activate CSI in Datadog Agent**

  ```
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

{{% /tab %}}

{{% tab "Daemonset" %}}

If the Datadog Agent is installed manually as Daemonset, Datadog CSI Driver has to be installed manually before activating it in the agent.

CSI driver can be activated in the Datadog Agent by setting the following environment variable in the Datadog Cluster Agent container.

```
DD_CSI_DRIVER_ENABLED=true
```
{{% /tab %}}

{{< /tabs >}}


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
        volumeAttributes:
          type: DSDSocket
    - name: dd-csi-volume-apm-dir
      csi:
        driver: k8s.csi.datadoghq.com
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
    readOnly: false
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
    readOnly: false
    volumeAttributes:
        type: DSDSocketDirectory
name: datadog
```

<div class="alert alert-info">
With Datadog Agent v7.67+, the Admission Controller can automatically mount Datadog UDS sockets to mutated pods by setting the injection config mode to <code>csi</code>. For more information, see <a href="/containers/cluster_agent/admission_controller#configure-apm-and-dogstatsd-communication-mode">Admission Controller: Configure APM and DogStatsD Communication Mode</a>.

<strong>Note:</strong>With the default configuration of the Datadog Agent, the Admission Controller injects `APMSocketDirectory` or `DSDSocketDirectory`. If the Trace Agent and DogStatsD sockets are both in the same directory on the host, only one volume will be injected because this will subsequently provide access to both sockets as they share the same directory on the host.
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