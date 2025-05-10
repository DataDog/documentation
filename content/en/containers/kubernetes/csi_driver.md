---
title: Install the Datadog CSI driver on kubernetes
aliases:
    - /agent/kubernetes/csi_driver
---

## Overview

This page provides an overview of the Datadog CSI driver and installation instructions on a kubernetes cluster.

More information about Kubernetes Container Storage Interface (CSI) can be found [here](https://kubernetes-csi.github.io/docs/introduction.html).

<div class="alert alert-info">
   CSI Driver is not supported on windows.
</div>

### Introduction

Datadog CSI driver is a daemonset that runs a GRPC server implementing the CSI specfications on each node of your kubernetes cluster.

Installing Datadog CSI driver on a kubernetes cluster allows users to leverage CSI volumes by specifying the datadog's driver name.

The Datadog CSI node server will be responsible for managing Datadog CSI's volume lifecycle.

### How It Works

Datadog CSI driver allows the agent to share the trace agent and dogstatsd Unix Domain Sockets with user pods regardless of the pods' namespace [pod security standards](https://kubernetes.io/docs/concepts/security/pod-security-standards/).

If CSI volumes are not used, the UDS sockets need to be shared with the user pod via hostpath volumes. If the user pod is running in a namespace having a non-privileged pod security standard, the pod will fail to start because hostpath volumes are not permitted in such contexts.

Datadog CSI driver shifts the hostpath volume from the user application to the CSI node server; the CSI daemonset runs in a separate privileged namespace and allows injecting UDS sockets into user pods with a Datadog CSI volume, allowing user pods to run in namespaces with `baselinne` or `restricted` pod security standards.

### Installation

Datadog CSI driver can be installed using the public helm chart.

{{< tabs >}}

{{% tab "Helm" %}}
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

{{% /tab %}}
{{< /tabs >}}


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

- Replace `<USER_ID>` with the UID to run the Datadog Agent. Datadog recommends [setting this value to 100 since Datadog Agent v7.48+][1].
- Replace `<GROUP_ID>` with the group ID that owns the Docker or containerd socket.

[1]: /data_security/kubernetes/#running-container-as-root-user

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
