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

## Overview

When you are monitoring a containerized infrastructure, one challenge that arises is that containers can shift from host to host. The dynamic nature of containerized systems makes them difficult to manually monitor.

To solve this issue, you can use Datadog’s Autodiscovery feature to automatically identify the services running on a specific container and gather data from those services. Whenever a container starts, the Datadog Agent identifies which services are running on this new container, looks for the corresponding monitoring configuration, and starts to collect metrics.

## Configuration

### Running the Agent on a host

{{< tabs >}}
{{% tab "Docker" %}}

tk

{{% /tab %}}
{{% tab "Kubernetes" %}}

tk

{{% /tab %}}
{{% tab "ECS Fargate" %}}

tk

{{% /tab %}}
{{< /tabs >}}

### Running the Agent as a container

{{< tabs >}}
{{% tab "Docker" %}}

tk

{{% /tab %}}
{{% tab "Kubernetes" %}}

tk

{{% /tab %}}
{{% tab "ECS Fargate" %}}

tk

{{% /tab %}}
{{< /tabs >}}

## Examples

### Setting up a single check

### Setting up one check with multiple configurations

### Setting up multiple checks

### Using the Cluster Agent

## How it works

In a traditional non-container environment, the Datadog Agent configuration is&mdash;like the environment in which it runs&mdash;static. The Agent reads check configurations from disk when it starts, and as long as it's running, it continuously runs every configured check.
The configuration files are static, and any network-related options configured within them serve to identify specific instances of a monitored service (e.g. a Redis instance at 10.0.0.61:6379).When an Agent Check cannot connect to such a service, metrics are missing until you troubleshoot the issue. The Agent check retries its failed connection attempts until an administrator revives the monitored service or fixes the check's configuration.

**With Autodiscovery enabled, the Agent runs checks differently.**

The overall process of Datadog Agent Autodiscovery is:

1. **Create and Load Integration template**: When the Agent starts with Autodiscovery enabled, it loads integration templates from all [available template sources][1]; along with the [Autodiscovery container identifiers][2]. Static configuration files aren't suitable for checks that collect data from ever-changing network endpoints like host or ports, so Autodiscovery uses [**Template Variables**][3] for integration template configuration. Those integration template configurations can be loaded into the Agent in 5 main ways:

  * [Using auto-configuration file shipped with the Agent][4]
  * [Using a configuration file mounted within the Agent][5]
  * [Using Key-Value Store][6]
  * [Using Kubernetes Annotations][7]
  * [Using Docker Labels][8]

2. **Apply an integration template to a specific container**: Unlike in a traditional Agent setup, the Agent doesn't run all checks all the time; it decides which checks to enable by inspecting all containers running on the same host as the Agent and the corresponding loaded integration templates. The Agent then watches for Kubernetes/Docker events&mdash;container creation, destruction, starts, and stops&mdash;and enables, disables, and regenerates static check configurations on such events. As the Agent inspects each running container, it checks if the container matches any of the [Autodiscovery container identifiers][2] from any loaded integration templates. For each match, the Agent generates a static check configuration by substituting the [Template Variables][9] with the matching container's specific values. Then it enables the check using the static configuration.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/autodiscovery/integrations
[2]: /agent/autodiscovery/ad_identifiers
[3]: /agent/autodiscovery/template_variables
[4]: /agent/autodiscovery/auto_conf
[5]: /agent/autodiscovery/integrations/?tab=file#configuration
[6]: /agent/autodiscovery/integrations/?tab=keyvaluestore#configuration
[7]: /agent/autodiscovery/integrations/?tab=kubernetespodannotations#configuration
[8]: /agent/autodiscovery/integrations/?tab=dockerlabel#configuration
[9]: /agent/autodiscovery/template_variables
