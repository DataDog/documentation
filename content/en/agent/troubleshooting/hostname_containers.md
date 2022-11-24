---
title: Hostname detection in containers
kind: documentation
---

Many features in Datadog rely on the Agent to provide an accurate hostname for monitored hosts. While this is simple when the Agent runs directly on a host, the hostname resolution process is different when the Agent runs in a containerized environment.

Since version **7.40**, the Agent properly recognizes failed hostname resolution in containerized environments.
Without a resolved hostname, the Agent will exit with an error shortly after being started.

When it happens, the following `ERROR` message will be printed in the logs:
```
Error while getting hostname, exiting: unable to reliably determine the host name. You can define one in the agent config file or in your hosts file
```

Encoutering this error usually means that some part of the Agent configuration is incorrect.
This page will help you resolve this misconfiguration in different common cases.

## Kubernetes

On Kubernetes, it usually means the Agent cannot access at least one of:
* Cloud provider metadata endpoint
* Kubelet API
* Container runtime API

Some Kubernetes distribution require a dedicated configuration, so the first item to check is to verify that your setup is aligned with our [recommended Kubernetes setup][1].

### Solution 1

Make sure the Agent is able to access the Kubelet API.
When it's the case, the Agent will print this log:
```
Successful configuration found for Kubelet, using URL: ******
```

The Kubernetes RBAC permissions are automatically by our official [Helm chart][2], the [Datadog Operator][3] and our official [manifests][4].
If you're using a different solution to deploy the Agent, make sure these permissions are present in a `Role` or `ClusterRole` bounded to the Agent service account:

```yaml
rules:
  - apiGroups: # Kubelet connectivity
      - ""
    resources:
      - nodes/metrics
      - nodes/spec
      - nodes/proxy
      - nodes/stats
    verbs:
      - get
```

The most common error preventing connection to the Kubelet API is the verification of Kubelet TLS certificate.
In many Kubernetes distribution the Kubelet certificate is either:
* Not signed by the cluster CA.
* Does not container a SAN corresponding to the address it's reachable at.

This prevents the Agent to connect to the Kubelet API through HTTPS, as, by default, TLS verification is enabled.

You can disable TLS verification by using dedicated parameters or by setting the `DD_KUBELET_TLS_VERIFY` variable for **all containers** in the Agent manifest:

{{< tabs >}}
{{% tab "Helm" %}}

Custom `values.yaml`:

```yaml
datadog:
  kubelet:
    tlsVerify: false
```

{{% /tab %}}
{{% tab "Operator" %}}

DatadogAgent Kubernetes Resource:

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  agent:
    config:
      kubelet:
        tlsVerify: false
```

{{% /tab %}}
{{% tab "Manifest" %}}

`DaemonSet` manifest

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: datadog
spec:
  template:
    spec:
      containers:
        - name: agent
          env:
            - name: DD_KUBELET_TLS_VERIFY
              value: "false"
```

{{% /tab %}}
{{< /tabs >}}

### Solution 2

If you're running in AWS, GCP or Azure, the Agent can use metadata endpoint to retrieve the hostname.

Accessing the cloud provider metadata endpoint allows to properly match Agent data and cloud integration data.

Hitting this issue usually means that access to the metadata endpoint has been restricited.
For instance, on AWS, through the [hop limit feature][5].

### Solution 3

This solution should only be necessary if you **explicitly** don't want the Agent to connect to Kubelet API (unlikely) and if you are not running in a supported cloud provider (see Solution 2).

In this case you can use the downward API to set `DD_HOSTNAME`:

{{< tabs >}}
{{% tab "Helm" %}}

Custom `values.yaml`:

```yaml
datadog:
  env:
    - name: DD_HOSTNAME
      valueFrom:
        fieldRef:
          fieldPath: spec.nodeName
```

{{% /tab %}}
{{% tab "Operator" %}}

DatadogAgent Kubernetes Resource:

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  agent:
    env:
      - name: DD_HOSTNAME
        valueFrom:
          fieldRef:
            fieldPath: spec.nodeName
```

{{% /tab %}}
{{% tab "Manifest" %}}

`DaemonSet` manifest

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: datadog
spec:
  template:
    spec:
      containers:
        - name: agent
          env:
            - name: DD_HOSTNAME
              valueFrom:
                fieldRef:
                  fieldPath: spec.nodeName
```

{{% /tab %}}
{{< /tabs >}}

## AWS ECS / Docker VM

When the Agent runs in Docker on a cloud provider, hitting this error usually means that the Agent cannot access at least one of:
* Cloud provider metadata endpoint
* Container runtime API

### Solution 1

Allow the Agent to connect to the Docker socket:

{{< tabs >}}
{{% tab "AWS ECS on EC2" %}}

Make sure the Docker socket is mounted in your [task definition][6].

{{% /tab %}}
{{% tab "Docker on VM" %}}

Make sure the Docker socket is mounted in your `docker run` command:
```
-v /var/run/docker.sock:/var/run/docker.sock:ro
```

{{% /tab %}}
{{< /tabs >}}

### Solution 2

If you're running in AWS, GCP or Azure, the Agent can use metadata endpoint to retrieve the hostname.

Accessing the cloud provider metadata endpoint allows to properly match Agent data and cloud integration data.

Hitting this issue usually means that access to the metadata endpoint has been restricited.
For instance, on AWS, through the [hop limit feature][5].

## CI Environments / sidecar setups

When running in a **CI environment** (e.g. Agent is ephemeral) or as a sidecar without access to
host information, simply set `DD_HOSTNAME` to a value:
```
-e DD_HOSTNAME=$(hostname)
or
-e DD_HOSTNAME=<my_hardcoded_hostname>
```

Finally if this guide did not allow you to fix your Agent setup, reach out to the [Datadog support team][7].

[1]: /containers/kubernetes/distributions
[2]: https://github.com/DataDog/helm-charts
[3]: https://github.com/DataDog/datadog-operator
[4]: https://github.com/DataDog/datadog-agent/tree/main/Dockerfiles/manifests
[5]: /containers/troubleshooting/duplicate_hosts
[6]: /resources/json/datadog-agent-ecs.json
[7]: /help/
