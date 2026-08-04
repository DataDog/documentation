---
title: Containers
description: Install & configure the Agent to collect data on containerized infrastructures
further_reading:
    - link: "https://www.datadoghq.com/container-report/"
      tag: "Datadog Research"
      text: "Datadog's Annual State of Containers Report"
algolia:
  tags: ['containers']
cascade:
    algolia:
        rank: 70
---

To maintain the health, performance, and security of your containerized environments, you can install the Datadog Agent and use [Datadog Container Monitoring][1].

## Get started

Log into Datadog and use the [Install Agents][2] page to install the Datadog Agent on your selected platform.

## Datadog Container Monitoring

{{< whatsnext desc="These pages discuss using Datadog's UI to monitor containers and clusters, track resource utilization, autoscale workloads, and remediate issues:">}}
  {{< nextlink href="/containers/monitoring/containers_explorer">}}<u>Containers Explorer</u>: Use and configure Containers Explorer for real-time visibility into your containers. {{< /nextlink >}}
  {{< nextlink href="/containers/monitoring/container_images">}}<u>Container Images Explorer</u>: Use and configure Containers Images Explorer to monitor the container {{< /nextlink >}}
  {{< nextlink href="/containers/monitoring/kubernetes_explorer">}}<u>Kubernetes Explorer</u>: Use the Kubernetes Explorer page to monitor your Kubernetes resources. {{< /nextlink >}}
  {{< nextlink href="/containers/monitoring/kubernetes_explorer_configuration">}}<u>Configure Kubernetes Explorer</u>: Configure the Kubernetes Explorer page. {{< /nextlink >}}
  {{< nextlink href="/containers/monitoring/kubernetes_resource_utilization">}}<u>Kubernetes Resource Utilization</u>: Using and configuring the Kubernetes Resource Utilization page {{< /nextlink >}}
  {{< nextlink href="/containers/autoscaling">}}<u>Kubernetes Autoscaling</u>: Using and configuring Kubernetes Autoscaling {{< /nextlink >}}
  {{< nextlink href="/containers/bits_ai_kubernetes_remediation">}}<u>Kubernetes Remediation</u>: Using and configuring the Kubernetes Remediation page {{< /nextlink >}}
  {{< nextlink href="/containers/monitoring/amazon_elastic_container_explorer">}}<u>Amazon ECS Explorer</u>: Using and configuring the ECS Explorer page {{< /nextlink >}}
{{< /whatsnext >}}

## Docker-based environments

{{< whatsnext desc="These pages discuss installing and configuring the Datadog Agent in a Docker-based environment (Docker, containerd, and Podman):">}}
  {{< nextlink href="/containers/docker">}}<u>Datadog Docker Agent</u>: Install and configure the Datadog Docker Agent for Docker, containerd, and Podman runtimes {{< /nextlink >}}
  {{< nextlink href="/containers/docker/apm">}}<u>APM</u>: Configure APM trace collection for applications running in Docker containers using the Datadog Agent {{< /nextlink >}}
  {{< nextlink href="/containers/docker/log">}}<u>Log collection</u>: Configure log collection for applications running in Docker containers using the Datadog Agent {{< /nextlink >}}
  {{< nextlink href="/containers/docker/tag">}}<u>Tag extraction</u>: Configure automatic tag extraction from Docker container labels and environment variables {{< /nextlink >}}
  {{< nextlink href="/containers/docker/integrations">}}<u>Integrations</u>: Configure monitoring integrations for applications running in Docker containers using Autodiscovery {{< /nextlink >}}
  {{< nextlink href="/containers/docker/prometheus">}}<u>Prometheus</u>: Collect Prometheus and OpenMetrics metrics from containerized Docker applications using the Datadog Agent {{< /nextlink >}}
  {{< nextlink href="/containers/docker/data_collected">}}<u>Data Collected</u>: Reference guide for metrics and events collected by the Datadog Agent from Docker containers {{< /nextlink >}}
{{< /whatsnext >}}

## Kubernetes environments

{{< whatsnext desc="These pages discuss installing and configuring the Datadog Agent in a Kubernetes environment:">}}
  {{< nextlink href="/containers/kubernetes">}}<u>Kubernetes</u>: Install and configure the Datadog Agent on Kubernetes  {{< /nextlink >}}
  {{< nextlink href="/containers/kubernetes/installation">}}<u>Installation</u>: Install and configure the Datadog Agent on Kubernetes using the Datadog Operator, Helm, or kubectl {{< /nextlink >}}
  {{< nextlink href="/containers/kubernetes/configuration">}}<u>Further Configuration</u>: Additional configuration options for APM, logs, processes, events, and other capabilities after installing the Datadog Agent {{< /nextlink >}}
  {{< nextlink href="/containers/kubernetes/distributions">}}<u>Distributions</u>: Platform-specific installation and configuration instructions for Datadog Agent on various Kubernetes distributions {{< /nextlink >}}
  {{< nextlink href="/containers/kubernetes/apm">}}<u>APM</u>:  Enable APM trace collection for containerized applications running in Kubernetes environments {{< /nextlink >}}
  {{< nextlink href="/containers/kubernetes/appsec">}}<u>App and API Protection</u>: Automatically enable App and API Protection for your Kubernetes ingress proxies and gateways {{< /nextlink >}}
  {{< nextlink href="/containers/kubernetes/log">}}<u>Log collection</u>: Configure log collection from containerized applications running on Kubernetes using the Datadog Agent {{< /nextlink >}}
  {{< nextlink href="/containers/kubernetes/tag">}}<u>Tag extraction</u>: Configure automatic tag extraction from Kubernetes pod labels and annotations for enhanced monitoring {{< /nextlink >}}
  {{< nextlink href="/containers/kubernetes/integrations">}}<u>Integrations</u>: Configure monitoring integrations for applications running in Kubernetes using Autodiscovery templates {{< /nextlink >}}
  {{< nextlink href="/containers/kubernetes/prometheus">}}<u>Prometheus & OpenMetrics</u>: Collect Prometheus and OpenMetrics from Kubernetes workloads using the Datadog Agent with Autodiscovery {{< /nextlink >}}
  {{< nextlink href="/containers/kubernetes/control_plane">}}<u>Control plane monitoring</u>: Monitor Kubernetes control plane components including API server, etcd, controller manager, and scheduler {{< /nextlink >}}
  {{< nextlink href="/containers/kubernetes/data_collected">}}<u>Data collected</u>: Reference guide for metrics and events collected by the Datadog Agent from Kubernetes clusters {{< /nextlink >}}
  {{< nextlink href="/containers/kubernetes/kubectl_plugin">}}<u>kubectl Plugin</u>: The <code>kubectl</code> plugin for the Datadog Operator, which provides a set of helper utilities that give visibility into certain internal components. {{< /nextlink >}}
  {{< nextlink href="/containers/kubernetes/csi_driver">}}<u>Datadog CSI Driver</u>: Observability for secure Kubernetes environments using the Datadog CSI Driver {{< /nextlink >}}
  {{< nextlink href="/data_security/kubernetes/">}}<u>Data security</u>: Information about the security of Kubernetes data sent to Datadog {{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="These pages discuss the Datadog Cluster Agent and Datadog Operator:">}}
  {{< nextlink href="/containers/cluster_agent">}}<u>Cluster Agent for Kubernetes</u>: Centralized approach to collecting cluster-level monitoring data with the Datadog Cluster Agent {{< /nextlink >}}
  {{< nextlink href="/containers/datadog_operator">}}<u>Datadog Operator</u>: Deploy and manage the Datadog Agent on Kubernetes using the Datadog Operator {{< /nextlink >}}
{{< /whatsnext >}}

## Amazon ECS

{{< whatsnext desc="These pages discuss installing and configuring the Datadog Agent on Amazon ECS:">}}
  {{< nextlink href="/containers/amazon_ecs">}}<u>Amazon ECS</u>: Install and configure the Datadog Agent on Amazon Elastic Container Service {{< /nextlink >}}
  {{< nextlink href="/containers/amazon_ecs/apm">}}<u>Tracing ECS Applications</u>: Configure APM trace collection for containerized applications running on Amazon ECS {{< /nextlink >}}
  {{< nextlink href="/containers/amazon_ecs/logs">}}<u>Log collection</u>: Configure log collection from containerized applications running on Amazon ECS using the Datadog Agent {{< /nextlink >}}
  {{< nextlink href="/containers/amazon_ecs/tags">}}<u>Tag extraction</u>: Configure automatic tag extraction from container labels and environment variables in Amazon ECS {{< /nextlink >}}
  {{< nextlink href="/containers/amazon_ecs/data_collected">}}<u>Data collection</u>: Reference guide for metrics, logs, and events collected by the Datadog Agent on Amazon ECS {{< /nextlink >}}
  {{< nextlink href="/containers/amazon_ecs/managed_instances">}}<u>Managed Instances</u>: Install and configure the Datadog Agent on Amazon ECS Managed Instances {{< /nextlink >}}
  {{< nextlink href="/integrations/ecs_fargate">}}<u>AWS Fargate with ECS</u>: Monitor AWS Fargate for Amazon ECS {{< /nextlink >}}
{{< /whatsnext >}}

## Miscellaneous

{{< whatsnext desc="">}}
  {{< nextlink href="/containers/troubleshooting">}}<u>Container Troubleshooting</u>: Troubleshooting containers-related issues {{< /nextlink >}}
  {{< nextlink href="/containers/guide">}}<u>Container Guides</u>: List of guides for container monitoring setup and configuration {{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/containers
[2]: https://app.datadoghq.com/fleet/install-agent/latest?platform=overview

