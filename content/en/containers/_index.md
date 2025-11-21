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
  {{< nextlink href="/containers/monitoring/explorer">}}<u>Containers Explorer</u>: Use and configure Containers Explorer for real-time visibility into your containers. {{< /nextlink >}}
  {{< nextlink href="/containers/monitoring/container_images">}}<u>Container Images Explorer</u>: Use and configure Containers Images Explorer to monitor the container {{< /nextlink >}}
  {{< nextlink href="/containers/monitoring/kubernetes_explorer">}}<u>Kubernetes Explorer</u>: Using and configuring the Kubernetes Explorer page {{< /nextlink >}}
  {{< nextlink href="/containers/monitoring/kubernetes_resource_utilization">}}<u>Kubernetes Resource Utilization</u>: Using and configuring the Kubernetes Resource Utilization page {{< /nextlink >}}
  {{< nextlink href="/containers/autoscaling">}}<u>Kubernetes Autoscaling</u>: Using and configuring the Kubernetes Autoscaling page {{< /nextlink >}}
  {{< nextlink href="/containers/bits_ai_kubernetes_remediation">}}<u>Kubernetes Remediation</u>: Using and configuring the Kubernetes Remediation page {{< /nextlink >}}
  {{< nextlink href="/containers/monitoring/amazon_elastic_container_explorer">}}<u>ECS Explorer</u>: Using and configuring the ECS Explorer page {{< /nextlink >}}
{{< /whatsnext >}}

## Docker-based environments

{{< whatsnext desc="These pages discuss installing and configuring the Datadog Agent in a Docker-based environment (Docker, containerd, Podman):">}}
  {{< nextlink href="/containers/docker">}}<u>Datadog Docker Agent</u>: Install and configure the Datadog Docker Agent for Docker, containerd, and Podman runtimes {{< /nextlink >}}
{{< /whatsnext >}}

## Kubernetes environments

{{< whatsnext desc="These pages discuss installing and configuring the Datadog Agent in a Kubernetes environment:">}}
  {{< nextlink href="/infrastructure/containers/explorer">}}<u>Containers Explorer</u>: Use and configure Containers Explorer for real-time visibility into your containers. {{< /nextlink >}}
{{< /whatsnext >}}

## Amazon ECS

{{< whatsnext desc="These pages discuss installing and configuring the Datadog Agent on Amazon ECS:">}}
  {{< nextlink href="/infrastructure/containers/explorer">}}<u>Containers Explorer</u>: Use and configure Containers Explorer for real-time visibility into your containers. {{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/containers
[2]: https://app.datadoghq.com/fleet/install-agent/latest?platform=overview

