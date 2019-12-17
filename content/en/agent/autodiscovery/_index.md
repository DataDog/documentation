---
title: Using Autodiscovery with Kubernetes and Docker
kind: documentation
aliases:
  - /guides/servicediscovery/
  - /guides/autodiscovery/
further_reading:
- link: "/agent/autodiscovery/integrations"
  tag: "Documentation"
  text: "Create and load an Autodiscovery Integration Template"
- link: "/agent/autodiscovery/ad_identifiers"
  tag: "Documentation"
  text: "Match a container with the corresponding Integration Template"
- link: "/agent/autodiscovery/management"
  tag: "Documentation"
  text: "Manage which Container to include in the Agent Autodiscovery"
- link: "/agent/autodiscovery/tag"
  tag: "Documentation"
  text: "Dynamically assign and collect tags from your application"
- link: "/integrations/faq/integration-setup-ecs-fargate/?tab=rediswebui"
  tag: "faq"
  text: "Integration Setup for ECS Fargate"
---


When you are monitoring a containerized infrastructure, one challenge that arises is that containers can shift from host to host. The dynamic nature of containerized systems makes them difficult to manually monitor.

To solve this issue, you can use Datadog’s Autodiscovery feature to automatically identify the services running on a specific container and gather data from those services. Whenever a container starts, the Datadog Agent identifies which services are running on this new container, looks for the corresponding monitoring configuration, and starts to collect metrics.

## Overview

{{< whatsnext desc="This section includes the following topics:" >}}
    {{< nextlink href="/agent/autodiscovery/basic_autodiscovery" >}}<u>Basic Autodiscovery</u>: Start here to understand how Autodiscovery works, and how to use it.{{< /nextlink >}}
    {{< nextlink href="/agent/autodiscovery/auto_conf" >}}<u>Auto-Configuration</u>: When the Agent runs as a container, it tries by default to Autodiscover other containers around it based on default Autodiscovery configuration files. A number of default configuration files are available.{{< /nextlink >}}
    {{< nextlink href="/agent/autodiscovery/integrations" >}}<u>Integrations Templates</u>: The goal of Autodiscovery is to apply a Datadog integration configuration when running an Agent check against a given container.{{< /nextlink >}}
    {{< nextlink href="/agent/autodiscovery/ad_identifiers" >}}<u>Container Identifier</u>: Autodiscovery container identifiers allow you to apply an Autodiscovery configuration file template to a given container, either by using the container short image or with a custom Autodiscovery container identifier.{{< /nextlink >}}
    {{< nextlink href="/agent/autodiscovery/template_variables" >}}<u>Template Variables</u>: Template variables enable you to dynamically assign your container's values.{{< /nextlink >}}
    {{< nextlink href="/agent/autodiscovery/tag" >}}<u>Tag Extraction</u>: Datadog can create and assign tags to all metrics, traces, and logs emitted by a Pod, based on its labels or annotations.{{< /nextlink >}}
    {{< nextlink href="/agent/autodiscovery/management" >}}<u>Discovery Management</u>: Datadog Autodiscovers all containers available by default. To restrict its discovery perimeter and limit data collection to a subset of containers only, include or exclude them through a dedicated configuration.{{< /nextlink >}}
    {{< nextlink href="/agent/autodiscovery/clusterchecks" >}}<u>Cluster Checks</u>: The Cluster Check feature provides the ability to Autodiscover and perform checks on load-balanced cluster services like Kubernetes.{{< /nextlink >}}
    {{< nextlink href="/agent/autodiscovery/endpointschecks" >}}<u>Endpoints Checks</u>: Endpoints Checks extend Cluster Checks to monitor any endpoint behind cluster services.{{< /nextlink >}}
    {{< nextlink href="/agent/autodiscovery/troubleshooting" >}}<u>Troubleshooting</u>: Solve common Autodiscovery issues.{{< /nextlink >}}
{{< /whatsnext >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


