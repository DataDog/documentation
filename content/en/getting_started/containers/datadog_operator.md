---
title: Getting Started with the Datadog Operator
kind: documentation
further_reading:
- link: "/agent/kubernetes/integrations/"
  tag: "Documentation"
  text: "Create and load an Autodiscovery Integration Template"
- link: "/agent/guide/ad_identifiers/"
  tag: "Documentation"
  text: "Match a container with the corresponding Integration Template"
- link: "/agent/guide/autodiscovery-management/"
  tag: "Documentation"
  text: "Manage which Container to include in the Agent Autodiscovery"
- link: "/agent/kubernetes/tag/"
  tag: "Documentation"
  text: "Dynamically assign and collect tags from your application"
- link: "/integrations/faq/integration-setup-ecs-fargate/?tab=rediswebui"
  tag: "faq"
  text: "Integration Setup for ECS Fargate"
- link: "/agent/guide/secrets-management/"
  tag: "Documentation"
  text: "Secrets Management"
---

This guide describes the Datadog Operator, how to install it, and how to use it to install the Datadog Agent on Kubernetes.

## What is the Datadog Operator? 

The Datadog Operator is an open source [Kubernetes Operator][4] that enables you to deploy and configure the Datadog Agent in a Kubernetes environment. By using the Operator, you can use a single Custom Resource Definition (CRD) to deploy the node-based Agent, Cluster Agent, and Cluster Checks Runners. The Operator reports deployment status, health, and errors in the Operator's CRD status. Because the Operator uses higher-level configuration options, it limits the risk of misconfiguration.

Once you have deployed the Agent, the Datadog Operator provides:

- Validation for your Agent configurations
- Keeping all Agents up to date with your configuration
- Orchestration for creating and updating Agent resources
- Reporting of Agent configuration status in the Operator's CRD status
- Optionally, use of an advanced DaemonSet deployment by using Datadog's [ExtendedDaemonSet][5].

<div class="alert alert-warning">The Datadog Operator is in beta.</div>

## Why use the Datadog Operator instead of a Helm chart or DaemonSet?

You can also use a Helm chart or a DaemonSet to install the Datadog Agent on Kubernetes. However, using the Datadog Operator offers the following advantages:

- The Operator has built-in defaults based on Datadog best practices.
- Operator configuration is more flexible for future enhancements.
- As a [Kubernetes Operator][4], the Datadog Operator is treated as a first-class resource by the Kubernetes API.
- Unlike the Helm chart, the Operator is included in the Kubernetes reconciliation loop.

Datadog fully supports using a DaemonSet to deploy the Agent, but manual DaemonSet configuration leaves significant room for error. Therefore, using a DaemonSet is not highly recommended.

## Prerequisites

- Kubernetes Cluster v1.14.X+
- [Helm][1] for deploying the Datadog Operator
- The Kubernetes command-line tool, [kubectl][2], for installing the Datadog Agent

## Deployment

1. Install the Datadog Operator with Helm:
  ```bash
  helm repo add datadog https://helm.datadoghq.com
  helm install my-datadog-operator datadog/datadog-operator
  ```
2. Create a Kubernetes secret with your API and app keys:
  ```bash
  kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY> --from-literal app-key=<DATADOG_APP_KEY>
  ```
  Replace `<DATADOG_API_KEY>` and `<DATADOG_APP_KEY>` with your [Datadog API and application keys][3].

3. Create a `datadog-agent.yaml` file with the spec of your `DatadogAgent` deployment configuration. The following sample configuration enables metrics, logs, and APM:
  ```yaml
  apiVersion: datadoghq.com/v1alpha1
  kind: DatadogAgent
  metadata:
    name: datadog
  spec:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
      appSecret:
        secretName: datadog-secret
        keyName: app-key
    agent:
      apm:
        enabled: true
      log:
        enabled: true
  ```

4. Deploy the Datadog Agent:
  ```bash
  kubectl apply -f agent_spec=/path/to/your/datadog-agent.yaml
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

[1]: https://helm.sh/
[2]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[3]: https://app.datadoghq.com/account/settings#api
[4]: https://kubernetes.io/docs/concepts/extend-kubernetes/operator/
[5]: https://github.com/DataDog/extendeddaemonset