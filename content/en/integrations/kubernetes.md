---
integration_title: Kubernetes
name: kubernetes
kind: integration
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
short_description: 'Capture Pod scheduling events, track the status of your Kublets, and more'
dependencies:
    ['https://github.com/DataDog/documentation/blob/master/content/en/integrations/kubernetes.md']
categories:
    - cloud
    - configuration & deployment
    - containers
    - orchestration
    - log collection
doc_link: /integrations/kubernetes/
ddtype: check
integration_id: "kubernetes"
---

{{< img src="integrations/kubernetes/k8sdashboard.png" alt="Kubernetes Dashboard"  >}}

## Overview

Get metrics and logs from kubernetes service in real time to:

- Visualize and monitor kubernetes states
- Be notified about kubernetes failovers and events.

## Setup

For Kubernetes, it's recommended to run the Agent as a container in your cluster.

**[Refer to the dedicated Kubernetes documentation to deploy the Agent in your Kubernetes cluster][1]**

**Note**: You can also [run the Datadog Agent on your host][2] and configure it to gather your Kubernetes metrics.

## Further Reading

To get a better idea of how (or why) to integrate your Kubernetes service, check out Datadog's [series of blog posts][3] about it.

[1]: /agent/kubernetes/
[2]: /integrations/faq/kubernetes-host-installation/
[3]: https://www.datadoghq.com/blog/monitoring-kubernetes-era
