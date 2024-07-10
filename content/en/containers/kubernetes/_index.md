---
title: Kubernetes
aliases:
    - /guides/basic_agent_usage/kubernetes
    - /agent/basic_agent_usage/kubernetes
    - /tracing/kubernetes/
    - /tracing/setup/kubernetes
    - /integrations/faq/using-rbac-permission-with-your-kubernetes-integration
    - /integrations/faq/can-i-install-the-agent-on-my-kubernetes-master-node-s
    - /integrations/faq/docker-ecs-kubernetes-events/
    - /integrations/faq/container-integration-event/
    - /integrations/faq/why-is-the-kubernetes-check-failing-with-a-connecttimeout-error-to-port-10250/
    - /agent/kubernetes/
further_reading:
    - link: "https://app.datadoghq.com/release-notes?category=Container%20Monitoring"
      tag: "Release Notes"
      text: "Check out the latest Datadog Containers releases (App login required)."
    - link: '/agent/guide/autodiscovery-management'
      tag: 'Documentation'
      text: 'Limit data collection to a subset of containers only'
    - link: '/agent/guide/docker-deprecation'
      tag: 'Documentation'
      text: 'Docker runtime deprecation in Kubernetes'
    - link: 'https://dtdg.co/fe'
      tag: 'Foundation Enablement'
      text: 'Join an interactive session for insights on Kubernetes monitoring'
---

## Overview

Run the Datadog Agent in your Kubernetes cluster to start collecting your cluster and applications metrics, traces, and logs.

**Note**: Agent v6.0+ only supports Kubernetes v1.7.6+. For prior versions of Kubernetes, see [Legacy Kubernetes versions][1].

For Agent commands, see the [Agent Commands guides][2].

For information pertaining to the Datadog Cluster Agent, which provides a streamlined approach to collecting cluster level monitoring data, see [Cluster Agent for Kubernetes][3].

{{< whatsnext desc="This section includes the following topics:">}}
  {{< nextlink href="/agent/kubernetes/installation">}}<u>Installation</u>: Install the Datadog Agent in a Kubernetes environment.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/configuration">}}<u>Further Configuration</u>: Collect events, override proxy settings, send custom metrics with DogStatsD, configure container allowlists and blocklists, and reference the full list of available environment variables.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/distributions">}}<u>Distributions</u>: Review base configurations for major Kubernetes distributions, including AWS Elastic Kubernetes Service (EKS), Azure Kubernetes Service (AKS), Google Kubernetes Engine (GKE), Red Hat OpenShift, Rancher, and Oracle Container Engine for Kubernetes (OKE).{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/apm">}}<u>APM</u>: Set up trace collection: configure the Agent to accept traces, configure your Pods to communicate with the Agent, and configure your application tracers to emit traces.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/log">}}<u>Log collection</u>: Set up log collection in a Kubernetes environment.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/tag">}}<u>Tag extraction</u>: Configure the Agent to create and assign tags to all metrics, traces, and logs emitted by a container, Pod, or Node, based on Kubernetes labels or annotations.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/integrations">}}<u>Integrations & Autodiscovery</u>: To configure integrations in a Kubernetes environment, use Datadog's Autodiscovery feature.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/prometheus">}}<u>Prometheus & OpenMetrics</u>: Collect your exposed Prometheus and OpenMetrics metrics from your application running inside Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/control_plane">}}<u>Control plane monitoring</u>: Monitor the Kubernetes API server, controller manager, scheduler, and etcd.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/data_collected">}}<u>Data Collected</u>: See the list of metrics collected by the Agent when deployed on your Kubernetes cluster.{{< /nextlink >}}
{{< /whatsnext >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/faq/kubernetes-legacy/
[2]: /agent/configuration/agent-commands/
[3]: /containers/cluster_agent/
