---
title: Getting Started with the Datadog Operator
kind: documentation
further_reading:
  - link: '/containers/datadog_operator'
    tag: 'documentation'
    text: 'Datadog Operator'
  - link: 'https://github.com/DataDog/datadog-operator/blob/main/docs/installation.md'
    tag: "Source Code"
    text: 'Datadog Operator: Advanced Installation'
  - link: 'https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md'
    tag: "Source Code"
    text: 'Datadog Operator: Configuration'
---

The [Datadog Operator][1] is an open source [Kubernetes Operator][2] that enables you to deploy and configure the Datadog Agent in a Kubernetes environment. This guide describes how to use the Operator to deploy the Datadog Agent.

## Prerequisites

- Kubernetes v1.20.X+
- [Helm][3] for deploying the Datadog Operator
- The Kubernetes command-line tool, [kubectl][4], for installing the Datadog Agent

## Installation and deployment

1. Install the Datadog Operator with Helm:
  ```bash
  helm repo add datadog https://helm.datadoghq.com
  helm install my-datadog-operator datadog/datadog-operator
  ```
2. Create a Kubernetes secret with your API key:
  ```bash
  kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY>
  ```
  Replace `<DATADOG_API_KEY>` with your [Datadog API key][5].

  **Note**: add the application key for autoscaling using the external metrics server.

3. Create a `datadog-agent.yaml` file with the spec of your `DatadogAgent` deployment configuration. The following sample configuration enables metrics, logs, and APM:
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
    features:
      apm:
        enabled: true
      logCollection:
        enabled: true
  ```
  For all configuration options, see the [Operator configuration spec][6].

4. Deploy the Datadog Agent:
  ```bash
  kubectl apply -f /path/to/your/datadog-agent.yaml
  ```

### Running Agents in a single container

<div class="alert alert-warning">Available in Operator v1.4.0 or later</div>

By default, the Datadog Operator creates an Agent DaemonSet with pods running multiple Agent containers. Datadog Operator v1.4.0 introduces a configuration which allows users to run Agents in a single container. In order to avoid elevating privileges for all Agents in the single container, this feature is only applicable when `system-probe` or `security-agent` is not required. For more details, see [Running as an unprivileged user][7] on the Agent Data Security page.

To enable this feature add `global.containerStrategy: single` to the `DatadogAgent` manifest:

{{< highlight yaml "hl_lines=7" >}}
  apiVersion: datadoghq.com/v2alpha1
  kind: DatadogAgent
  metadata:
    name: datadog
  spec:
    global:
      containerStrategy: single
      credentials:
        apiSecret:
          secretName: datadog-secret
          keyName: api-key
    features:
      apm:
        enabled: true
      logCollection:
        enabled: true
{{< /highlight >}}
With the above configuration, Agent pods run as single containers with three Agent processes. The default for `global.containerStrategy` is `optimized` and runs each Agent process in a separate container.

**Note**: Running multiple Agent processes in a single container is discouraged in orchestrated environments such as Kubernetes. Pods running multiple processes need their lifecycles to be managed by a process manager, which is not directly controllable by Kubernetes and potentially leads to inconsistencies or conflicts in the container lifecycle management.

## Validation

Use `kubectl get daemonset` and `kubectl get pod -owide` to validate your installation.

In a cluster with two worker Nodes, you should see Agent Pods created on each Node:

```bash
$ kubectl get daemonset
NAME            DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
datadog-agent   2         2         2       2            2           <none>          5m30s

$ kubectl get pod -owide
NAME                                         READY   STATUS    RESTARTS   AGE     IP            NODE
agent-datadog-operator-d897fc9b-7wbsf        1/1     Running   0          1h      10.244.2.11   kind-worker
datadog-agent-k26tp                          1/1     Running   0          5m59s   10.244.2.13   kind-worker
datadog-agent-zcxx7                          1/1     Running   0          5m59s   10.244.1.7    kind-worker2
```

## Cleanup

The following commands delete all Kubernetes resources created in this guide:

```bash
kubectl delete datadogagent datadog
helm delete my-datadog-operator
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /containers/datadog_operator
[2]: https://kubernetes.io/docs/concepts/extend-kubernetes/operator/
[3]: https://helm.sh/
[4]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
[7]: https://docs.datadoghq.com/data_security/agent/#running-as-an-unprivileged-user
