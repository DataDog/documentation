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
---

## QuickStart

This page covers Autodiscovery with Agent 6 only, [refer to the dedicated documentation to setup Autodiscovery with Agent 5][1]

Here's a 5-minute video for a bird's eye view of Datadog Agent v6 Autodiscovery functionality.

{{< wistia mlxx0j6txw >}}

## How it Works

In a traditional non-container environment, the Datadog Agent configuration is&mdash;like the environment in which it runs&mdash;static. The Agent reads check configurations from disk when it starts, and as long as it's running, it continuously runs every configured check.
The configuration files are static, and any network-related options configured within them serve to identify specific instances of a monitored service (e.g. a Redis instance at 10.0.0.61:6379).When an Agent Check cannot connect to such a service, metrics are missing until you troubleshoot the issue. The Agent check retries its failed connection attempts until an administrator revives the monitored service or fixes the check's configuration.

**With Autodiscovery enabled, the Agent runs checks differently.**

The overall process of Datadog Agent Autodiscovery is:

1. **Create and Load Integration template**: When the Agent starts with Autodiscovery enabled, it loads integration templates from all [available template sources][2]; along with the [Autodiscovery container identifiers][3]. Static configuration files aren't suitable for checks that collect data from ever-changing network endpoints like host or ports, so Autodiscovery uses [**Template Variables**][4] for integration template configuration. Those integration template configurations can be loaded into the Agent in 4 main ways:

  * [Using a configuration file mounted within the Agent][5]
  * [Using Key-Value Store][6]
  * [Using Kubernetes Annotations][7]
  * [Using Docker Labels][8]

2. **Apply an integration template to a specific container**: Unlike in a traditional Agent setup, the Agent doesn't run all checks all the time; it decides which checks to enable by inspecting all containers running on the same host as the Agent and the corresponding loaded integration templates. The Agent then watches for Docker events&mdash;container creation, destruction, starts, and stops&mdash;and enables, disables, and regenerates static check configurations on such events. As the Agent inspects each running container, it checks if the container matches any of the [Autodiscovery container identifiers][3] from any loaded integration templates. For each match, the Agent generates a static check configuration by substituting the [Template Variables][9] with the matching container's specific values. Then it enables the check using the static configuration.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/faq/agent-5-autodiscovery
[2]: /agent/autodiscovery/integrations
[3]: /agent/autodiscovery/ad_identifiers
[4]: /agent/autodiscovery/template_variables
[5]: /agent/autodiscovery/integrations/?tab=file#configuration
[6]: /agent/autodiscovery/integrations/?tab=keyvaluestore#configuration
[7]: /agent/autodiscovery/integrations/?tab=kubernetespodannotations#configuration
[8]: /agent/autodiscovery/integrations/?tab=dockerlabel#configuration
[9]: /agent/autodiscovery/template_variables