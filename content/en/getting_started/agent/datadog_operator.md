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

This guide describes how to deploy the Datadog Agent with the Datadog Operator. 

## Why use the Datadog Operator?

TK

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

3. Create a `datadog-agent.yaml` file with the spec of your `DatadogAgent` deployment configuration. The following is the minimum configuration:
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
