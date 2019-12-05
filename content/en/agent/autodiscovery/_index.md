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

## QuickStart

This page covers Autodiscovery with Agent 6 only, [refer to the dedicated documentation to setup Autodiscovery with Agent 5][1]

Here's a 5-minute video for a bird's eye view of Datadog Agent v6 Autodiscovery functionality.

{{< wistia mlxx0j6txw >}}

## How it Works

In a traditional non-container environment, the Datadog Agent configuration is&mdash;like the environment in which it runs&mdash;static. The Agent reads check configurations from disk when it starts, and as long as it's running, it continuously runs every configured check.
The configuration files are static, and any network-related options configured within them serve to identify specific instances of a monitored service (e.g. a Redis instance at 10.0.0.61:6379).When an Agent Check cannot connect to such a service, metrics are missing until you troubleshoot the issue. The Agent check retries its failed connection attempts until an administrator revives the monitored service or fixes the check's configuration.

**With Autodiscovery enabled, the Agent runs checks differently.**

The overall process of Datadog Agent Autodiscovery is:

1. **Create and Load Integration template**: When the Agent starts with Autodiscovery enabled, it loads integration templates from all [available template sources][2]; along with the [Autodiscovery container identifiers][3]. Static configuration files aren't suitable for checks that collect data from ever-changing network endpoints like host or ports, so Autodiscovery uses [**Template Variables**][4] for integration template configuration. Those integration template configurations can be loaded into the Agent in 5 main ways:

  * [Using auto-configuration file shipped with the Agent][5]
  * [Using a configuration file mounted within the Agent][6]
  * [Using Key-Value Store][7]
  * [Using Kubernetes Annotations][8]
  * [Using Docker Labels][9]

2. **Apply an integration template to a specific container**: Unlike in a traditional Agent setup, the Agent doesn't run all checks all the time; it decides which checks to enable by inspecting all containers running on the same host as the Agent and the corresponding loaded integration templates. The Agent then watches for Kubernetes/Docker events&mdash;container creation, destruction, starts, and stops&mdash;and enables, disables, and regenerates static check configurations on such events. As the Agent inspects each running container, it checks if the container matches any of the [Autodiscovery container identifiers][3] from any loaded integration templates. For each match, the Agent generates a static check configuration by substituting the [Template Variables][10] with the matching container's specific values. Then it enables the check using the static configuration.

## How to set it up

If running the Agent as a binary on a host, enable Autodiscovery with the [Agent](?tab=agent) tab instructions. If running the Agent as a container, enable Autodiscovery with the [Containerized Agent](?tab=containerizedagent) tab instructions.

### Docker Autodiscovery

{{< tabs >}}
{{% tab "Agent" %}}

To enable Autodiscovery over Docker containers, add the following configuration block in the [Agent `datadog.yaml` configuration file][1]:

```yaml
listeners:
  - name: docker
config_providers:
  - name: docker
    polling: true
```

[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "Containerized Agent" %}}

To automatically enable Autodiscovery over Docker containers, mount `/var/run/docker.sock` into the Containerized Agent.

{{% /tab %}}
{{< /tabs >}}

### Kubernetes Autodiscovery

{{< tabs >}}
{{% tab "Agent" %}}

To enable Autodiscovery over containers within Kubernetes, add the following configuration block in the [Agent `datadog.yaml` configuration file][1]:

```yaml
listeners:
  - name: kubelet
config_providers:
  - name: kubelet
    polling: true
  # needed to support legacy docker label config templates
  - name: docker
    polling: true
```

[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "Containerized Agent" %}}

To enable Autodiscovery over containers within Kubernetes, add the following environment variable when starting the containerized Agent:

```
KUBERNETES=true
```

{{% /tab %}}
{{< /tabs >}}

**Note**: For Kubernetes users, both a [CRI integration][11] and a [CRI-O integration][12] are available.

### ECS Fargate Autodiscovery

{{< tabs >}}
{{% tab "Agent" %}}

ECS Fargate can't be monitored with the Datadog Agent running as a binary on a host, see the [Containerized Agent](?tab=containerizedagent#ecs-fargate-autodiscovery) tab instructions.

{{% /tab %}}
{{% tab "Containerized Agent" %}}

To enable Autodiscovery over containers within ECS Fargate, add the following environment variable when starting the containerized Agent:

```
ECS_FARGATE=true
```

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/faq/agent-5-autodiscovery
[2]: /agent/autodiscovery/integrations
[3]: /agent/autodiscovery/ad_identifiers
[4]: /agent/autodiscovery/template_variables
[5]: /agent/autodiscovery/auto_conf
[6]: /agent/autodiscovery/integrations/?tab=file#configuration
[7]: /agent/autodiscovery/integrations/?tab=keyvaluestore#configuration
[8]: /agent/autodiscovery/integrations/?tab=kubernetespodannotations#configuration
[9]: /agent/autodiscovery/integrations/?tab=dockerlabel#configuration
[10]: /agent/autodiscovery/template_variables
[11]: /integrations/cri
[12]: /integrations/crio
