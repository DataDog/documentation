---
title: Disable the Datadog Admission Controller with the Cluster Agent
description: Safely disable and remove the Datadog Admission Controller from your Kubernetes cluster using the Cluster Agent
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-cluster-agent/"
  tag: "Blog"
  text: "Introducing the Datadog Cluster Agent"
- link: "/containers/cluster_agent/admission_controller/"
  tag: "Documentation"
  text: "Datadog Admission Controller"
- link: "/agent/cluster_agent/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshooting the Datadog Cluster Agent"
---

## Overview

The Datadog Cluster Agent manages the Datadog Admission Controller by creating, updating, and deleting Admission Controllers as needed.
To disable the Admission Controller or remove the Cluster Agent, you must first disable the Admission Controller features in the Cluster Agent configuration and redeploy the Cluster Agent.
Once the Admission Controllers are removed, the Cluster Agent can be safely removed if necessary.

## Prerequisites

Datadog Cluster Agent v7.63+

## Steps

{{< tabs >}}
{{% tab "Datadog Operator" %}}
To disable the Admission Controllers with your Cluster Agent managed by the Datadog Operator:
1. Set `features.admissionController.enabled` to `false` in your `DatadogAgent` configuration.
2. Set `features.admissionController.validation.enabled` to `false` in your `DatadogAgent` configuration.
3. Set `features.admissionController.mutation.enabled` to `false` in your `DatadogAgent` configuration.

```yaml
  apiVersion: datadoghq.com/v2alpha1
  kind: DatadogAgent
  metadata:
    name: datadog
  spec:
    features:
      admissionController:
        enabled: false
        validation:
          enabled: false
        mutation:
          enabled: false
```


After redeploying the Cluster Agent with the updated configuration, the Admission Controllers are removed.
{{% /tab %}}
{{% tab "Helm" %}}
To disable the Admission Controllers with your Cluster Agent managed by the Datadog Helm Chart:
1. Set `clusterAgent.admissionController.enabled` to `false`.
2. Set `clusterAgent.admissionController.validation.enabled` to `false`.
3. Set `clusterAgent.admissionController.mutation.enabled` to `false`.

```yaml
clusterAgent:
  enabled: true
  admissionController:
    enabled: false
    validation:
      enabled: false
    mutation:
      enabled: false
```
{{% /tab %}}
{{% /tabs %}}

You can confirm the Admission Controllers are removed by checking `ValidatingWebhookConfiguration` and `MutatingWebhookConfiguration` resources in your cluster.

```shell
kubectl get validatingwebhookconfigurations.admissionregistration.k8s.io
```

```shell
kubectl get mutatingwebhookconfigurations.admissionregistration.k8s.io
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
