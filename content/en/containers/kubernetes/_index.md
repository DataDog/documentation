---
title: Kubernetes
description: Install and configure the Datadog Agent on Kubernetes 
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
    - link: "https://learn.datadoghq.com/courses/getting-started-k8s"
      tag: "Learning Center"
      text: "Getting Started with Kubernetes Observability"
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
    - link: 'https://www.datadoghq.com/blog/watermark-pod-autoscaler/'
      tag: 'Blog'
      text: 'A guide on scaling out your Kubernetes pods with the Watermark Pod Autoscaler'
---


{{< learning-center-callout header="Join an enablement webinar session" hide_image="true" btn_title="Sign Up" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Kubernetes">}}
  This foundation enablement session will focus on how Datadog can monitor Kubernetes. Learn how to configure Datadog for Kubernetes and how to get started. Explore the various views and tools Datadog offers to visualize and analyze your cluster and application metrics, traces, and logs.
{{< /learning-center-callout >}}

## Agent installation

You can install the Agent using either the [Datadog Operator][4] or Helm chart by following the [in-app installation guide in Fleet Automation][5]. This guided interface allows you to:
- Select your Kubernetes distribution (for example EKS, AKS, or GKE)
- Generate helm and kubectl commands with your API key prefilled
- Enable features such as APM, Log Management, tagging and other telemetry through UI-based configuration


{{< img src="agent/basic_agent_usage/agent_install_k8.png" alt="In-app installation steps for the Datadog Agent on Kubernetes." style="width:90%;">}}


The Datadog Operator flow installs the Datadog Operator and uses Custom Resources to configure your observability coverage.

The Helm Chart flow installs the Datadog components more directly and offers similar toggles for observability features.

Both options allow you to manage a configuration: the Datadog Operator or Helm chart creates the Datadog Agent DaemonSet, Cluster Agent Deployment, and all their dependencies for your Kubernetes-based monitoring.

See [Supported Versions][6] for the full list of Kubernetes versions supported by the Datadog Agent.


### Manual installation

The [in-app installation tool in Fleet Automation][5] provides a guided way to build your configurations. You can also see the [Kubernetes installation docs][7] for steps on how to deploy and configure the Datadog Operator or Datadog Helm chart manually in your enviornment.

Datadog recommends that you use the Datadog Operator or the Datadog Helm Chart to deploy all the Kubernetes resources for you. If you need to deploy the all the manifests directly consult the full [Kubernetes manual installation documentation][8].

For Agent commands, see the [Agent Commands guides][9]. For information on the Datadog Cluster Agent and its role, see [Cluster Agent for Kubernetes][3].

{{< whatsnext desc="This section includes the following topics:">}}
  {{< nextlink href="/agent/kubernetes/installation">}}<u>Installation</u>: Install the Datadog Agent in a Kubernetes environment.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/configuration">}}<u>Further Configuration</u>: Collect events, override proxy settings, send custom metrics with DogStatsD, configure container allowlists and blocklists, and reference the full list of available environment variables.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/distributions">}}<u>Distributions</u>: Review base configurations for major Kubernetes distributions, including AWS Elastic Kubernetes Service (EKS), Azure Kubernetes Service (AKS), Google Kubernetes Engine (GKE), Red Hat OpenShift, Rancher, and Oracle Container Engine for Kubernetes (OKE).{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/apm">}}<u>APM</u>: Set up trace collection: configure the Agent to accept traces, configure your Pods to communicate with the Agent, and configure your application tracers to emit traces.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/appsec">}}<u>App & API Protection</u>: Configure your ingress controller to analyze and protect your cluster API endpoints and applications.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/csi">}}<u>CSI Driver</u>: Install and set up Datadog CSI driver, and mount DogStatsD and Trace Agent UDS socket using Datadog CSI volumes.{{< /nextlink >}}
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
[4]: https://docs.datadoghq.com/containers/datadog_operator/
[5]: https://app.datadoghq.com/fleet/install-agent/latest?platform=kubernetes
[6]: /containers/kubernetes/installation?tab=datadogoperator#minimum-kubernetes-and-datadog-agent-versions
[7]: /containers/kubernetes/installation
[8]: https://docs.datadoghq.com/containers/guide/kubernetes_daemonset/
[9]: /agent/configuration/agent-commands/
