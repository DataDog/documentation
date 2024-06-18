---
title: Hostname Detection in Containers
---

Many features in Datadog rely on the Agent to provide an accurate hostname for monitored hosts. While this is straightforward when the Agent runs directly on a host, the hostname resolution process is different when the Agent runs in a containerized environment.

Since version **7.40**, the Agent properly recognizes failed hostname resolution in containerized environments. Without a resolved hostname, the Agent exits with an error shortly after it starts.

When that happens, the following `ERROR` message is printed in the logs:
```
Error while getting hostname, exiting: unable to reliably determine the host name. You can define one in the agent config file or in your hosts file
```

Encountering this error usually means that some part of the Agent configuration is incorrect. Use the following information to resolve various common cases of this misconfiguration.

## Kubernetes hostname errors

On Kubernetes, a hostname error usually means the Agent cannot access at least one of:
* Kubelet API
* Cloud provider metadata endpoint
* Container runtime API

Some Kubernetes distributions require a dedicated configuration, so verify that your setup is aligned with our [recommended Kubernetes setup][1].

### Accessing the Kubelet API 

Make sure the Agent can access the Kubelet API. When it can, the Agent prints this log:
```
Successful configuration found for Kubelet, using URL: ******
```

The Kubernetes RBAC permissions are set automatically by our official [Helm chart][2], the [Datadog Operator][3] and our official [manifests][4]. If you use a different solution to deploy the Agent, make sure the following permissions are present in a `Role` or `ClusterRole` that is bounded to the Agent service account:

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

The most common error that prevents connection to the Kubelet API is the verification of Kubelet TLS certificate. In many Kubernetes distributions the Kubelet certificate is either:
* Not signed by the cluster CA.
* Does not contain a SAN corresponding to the address it's reachable at.

This prevents the Agent from connecting to the Kubelet API through HTTPS, because TLS verification is enabled by default.

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

`DatadogAgent` Kubernetes Resource:

```yaml
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  global:
    kubelet:
      tlsVerify: false
```

{{% /tab %}}
{{% tab "Manifest" %}}

`DaemonSet` manifest:

```yaml
apiVersion: apps/v1
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

### Accessing the cloud provider metadata endpoint

If you run in AWS, Google Cloud, or Azure, the Agent can use a metadata endpoint to retrieve the hostname.

Accessing the cloud provider metadata endpoint allows Datadog to properly match Agent data and cloud integration data in the application.

Encountering this issue usually means that access to the metadata endpoint has been restricted.
For example, on AWS, this could be due to the [hop limit setting][5].

### Accessing the container runtime API

Use this solution only in the unlikely event that you **explicitly** don't want the Agent to connect to Kubelet API, and if you are not running in a supported cloud provider described above.

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

`DatadogAgent` Kubernetes Resource:

```yaml
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
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

## Amazon ECS and Docker VM hostname errors

When the Agent runs in Docker on a cloud provider, a hostname error usually means that the Agent cannot access at least one of:
* Container runtime API
* Cloud provider metadata endpoint

### Accessing the container runtime API

Allow the Agent to connect to the Docker socket:

{{< tabs >}}
{{% tab "Amazon ECS on EC2" %}}

Make sure the Docker socket is mounted in your [task definition][1].


[1]: /resources/json/datadog-agent-ecs.json
{{% /tab %}}
{{% tab "Docker on VM" %}}

Make sure the Docker socket is mounted in your `docker run` command:

```
-v /var/run/docker.sock:/var/run/docker.sock:ro
```

{{% /tab %}}
{{< /tabs >}}

### Accessing the cloud provider metadata endpoint

If you run in AWS, Google Cloud, or Azure, the Agent can use a metadata endpoint to retrieve the hostname.

Accessing the cloud provider metadata endpoint allows Datadog to properly match Agent data and cloud integration data in the application.

Encountering this issue usually means that access to the metadata endpoint has been restricted.
For example, on AWS, this could be due to the [hop limit setting][5].

## Hostname errors in CI environments, sidecar setups, and environments without access to container runtime

When you run the Agent in a **CI environment** (so Agent is ephemeral) or as a sidecar without access to
host information, two options are available:

- Setting `DD_HOSTNAME` (`hostname` in `datadog.yaml`) explicitly to the hostname:

```
-e DD_HOSTNAME=$(hostname)
```

- Setting `DD_HOSTNAME_TRUST_UTS_NAMESPACE` (`hostname_trust_uts_namespace` in `datadog.yaml`):

This option is available starting Datadog Agent **7.42.0**.

```
-e DD_HOSTNAME_TRUST_UTS_NAMESPACE=true
```

When this is set, the Agent will use the in-container hostname (usually the container name or pod name).

**Note**: This does not apply to serverless solutions like Fargate.

If the solutions above did not fix your Agent setup, reach out to the [Datadog support team][6].

[1]: /containers/kubernetes/distributions
[2]: https://github.com/DataDog/helm-charts
[3]: https://github.com/DataDog/datadog-operator
[4]: https://github.com/DataDog/datadog-agent/tree/main/Dockerfiles/manifests
[5]: /containers/troubleshooting/duplicate_hosts
[6]: /help/
