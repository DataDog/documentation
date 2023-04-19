---
title: Getting Started with the Datadog Operator
kind: documentation
further_reading:
  - link: '/containers/datadog_operator'
    tag: 'documentation'
    text: 'Datadog Operator'
  - link: 'https://github.com/DataDog/datadog-operator/blob/main/docs/installation.md'
    tag: 'GitHub'
    text: 'Datadog Operator: Advanced Installation'
  - link: 'https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md'
    tag: 'GitHub'
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
2. Create a Kubernetes secret with your API and application keys:
  ```bash
  kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY> --from-literal app-key=<DATADOG_APP_KEY>
  ```
  Replace `<DATADOG_API_KEY>` and `<DATADOG_APP_KEY>` with your [Datadog API and application keys][5].

3. Create a `datadog-agent.yaml` file with the spec of your `DatadogAgent` deployment configuration. The following sample configuration enables metrics, logs, and APM:
  ```yaml
  apiVersion: datadoghq.com/v2alpha1
  kind: DatadogAgent
  metadata:
    name: datadog
  spec:
    features:
      apm:
        enabled: true
      logCollection:
        enabled: true
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
      appSecret:
        secretName: datadog-secret
        keyName: app-key
  ```

4. Deploy the Datadog Agent:
  ```bash
  kubectl apply -f /path/to/your/datadog-agent.yaml
  ```

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
[5]: https://app.datadoghq.com/account/settings#api
