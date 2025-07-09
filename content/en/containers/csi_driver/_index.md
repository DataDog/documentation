---
title: Datadog CSI Driver
---

## Overview

This page provides an overview of the Datadog CSI driver and installation instructions on a kubernetes cluster.

More information about Kubernetes Container Storage Interface (CSI) can be found [here](https://kubernetes-csi.github.io/docs/introduction.html).

Datadog CSI driver is open source; the driver implementation is available [here](https://github.com/DataDog/datadog-csi-driver).

<div class="alert alert-info">
   Datadog CSI Driver is not supported on windows.
</div>

## How It Works

Datadog CSI driver is a DaemonSet that runs a gRPC server implementing the CSI specifications on each node of your Kubernetes cluster.

Installing Datadog CSI driver on a kubernetes cluster allows users to leverage CSI volumes by specifying datadog's CSI driver name.

Datadog CSI node server will be responsible for managing Datadog CSI's volume lifecycle.

## Why use Datadog CSI Driver?

Datadog CSI driver allows the agent to share the trace agent and dogstatsd Unix Domain Sockets with user pods regardless of the namespace [pod security standards](https://kubernetes.io/docs/concepts/security/pod-security-standards/).

If CSI volumes are not used, the UDS sockets need to be shared with the user pod via hostpath volumes. If the user pod is running in a namespace having a non-privileged pod security standard, the pod will fail to start because hostpath volumes are not permitted in such contexts.

Datadog CSI driver shifts the hostpath volume from the user application to the CSI node server; the CSI daemonset runs in a separate privileged namespace and allows injecting UDS sockets into user pods with a Datadog CSI volume, allowing user pods to run in namespaces with `baseline` or `restricted` pod security standards.

## Installation

Datadog CSI driver can be installed using the public helm chart.

<div class="alert alert-info">Requires <a href="https://helm.sh">Helm</a>.</div>

<br />

<div class="alert alert-info">
CSI driver needs to run with privileged security context in order to mount volumes from the host file system to the user pods.
</div>

1. **Add the Datadog CSI Helm repository**

   Run:
   ```shell
   helm repo add datadog-csi-driver https://helm.datadoghq.com
   helm repo update
   ```

2. **Deploy Datadog CSI Driver**

   Run:

   ```shell
   helm install datadog-csi-driver datadog/datadog-csi-driver
   ```

## Datadog CSI Volumes

<div class="alert alert-info">
   Starting from version 7.67, Datadog agent admission controller can automatically mount datadog UDS sockets to mutated pods by setting the injection config mode to `csi` as indicated <a href="/containers/cluster_agent/admission_controller#configure-apm-and-dogstatsd-communication-mode">here</a>.
</div>

CSI volumes processed by Datadog CSI driver must have the following format:

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

Currently, 4 types are supported:
* APMSocket
* APMSocketDirectory
* DSDSocket
* DSDSocketDirectory

### APMSocket

This type is useful for mounting a trace agent UDS socket file.

For example:

```yaml
csi:
    driver: k8s.csi.datadoghq.com
    volumeAttributes:
        type: APMSocket
name: datadog-apm
```

In case the indicated socket doesn't exist, the mount operation will fail, and the pod will be blocked in `ContainerCreating` phase.

### APMSocketDirectory

This mode is useful for mounting the directory containing the apm socket.

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

This type is useful for mounting a dogstatsd UDS socket file.

For example:

```yaml
csi:
    driver: k8s.csi.datadoghq.com
    volumeAttributes:
        type: DSDSocket
name: datadog-dsd
```

In case the indicated socket doesn't exist, the mount operation will fail, and the pod will be blocked in `ContainerCreating` phase.

### DSDSocketDirectory

This mode is useful for mounting the directory containing the dogstatsd socket.

For example:

```yaml
csi:
    driver: k8s.csi.datadoghq.com
    readOnly: false
    volumeAttributes:
        type: DSDSocketDirectory
name: datadog
```

## Security Considerations

The Datadog CSI driver requires elevated privileges and specific host access to function properly.

### Privileged Security Context:
The CSI driver must run as a privileged container to perform mount operations and access the host filesystem.

### Access to /var/lib/kubelet/pods:
The driver needs read-write access to this directory because it is where Kubernetes manages pod volumes. This access is essential for injecting Datadog Unix Domain Sockets into user pods.

### Bidirectional Mount Propagation:
Required to ensure that volume mounts from the CSI node server are visible to both the host and the user pods. Without this, the shared sockets would not propagate correctly into pods.

By isolating the CSI driver in a privileged namespace, Kubernetes clusters can safely share Datadog sockets with user pods running under strict Pod Security Standards like baseline or restricted, while minimizing security risks.

<div class="alert alert-info">
   Limit access to the CSI driver's namespace and configuration to trusted operators, as the driver’s elevated privileges could be exploited if misconfigured.
</div>

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-csi-driver
[2]: https://hub.docker.com/r/datadog/csi-driver