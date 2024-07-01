---
integration_title: Kubernetes
name: kubernetes
custom_kind: integration
git_integration_title: kubernetes
newhlevel: true
updated_for_agent: 6.0
description: 'Monitor the health of your Kubernetes cluster and the applications running on it. Capture Pod scheduling events, track the status of your Kubelets, and more.'
is_public: true
aliases:
  - /integrations/kubernetes_state
  - /integrations/kube_proxy
  - /integrations/Kubernetes
public_title: Datadog-Kubernetes Integration
short_description: 'Capture Pod scheduling events, track the status of your Kubelets, and more'
dependencies:
  ['https://github.com/DataDog/documentation/blob/master/content/en/integrations/kubernetes.md']
categories:
  - cloud
  - configuration & deployment
  - containers
  - orchestration
  - log collection
doc_link: /integrations/kubernetes/
integration_id: "kubernetes"
further_reading:
  - link: "https://www.datadoghq.com/blog/debug-kubernetes-pending-pods/"
    tag: "Blog"
    text: "How to debug Kubernetes Pending pods and scheduling failures"
  - link: "https://www.datadoghq.com/blog/monitoring-kubernetes-era"
    tag: "Blog"
    text: "Monitoring in the Kubernetes era"
  - link: "https://www.datadoghq.com/blog/monitor-kubernetes-events/"
    tag: "Blog"
    text: "Troubleshoot with Kubernetes events"
---

{{< img src="integrations/kubernetes/k8sdashboard.png" alt="Kubernetes Dashboard" >}}

## Overview

Get metrics and logs from Kubernetes in real time to:

- Visualize and monitor Kubernetes states.
- Be notified about Kubernetes failovers and events.

## Setup

For Kubernetes, Datadog recommends that you run the Agent as a container in your cluster.

**[See the dedicated Kubernetes documentation to deploy the Agent in your Kubernetes cluster][1]**.

**Note**: You can also [run the Datadog Agent on your host][2] and configure it to gather your Kubernetes metrics.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/kubernetes/
[2]: /integrations/faq/kubernetes-host-installation/
