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

Autodiscovery lets you define configuration templates for Agent checks and specify which containers each checks should apply to. 

**For example**, imagine that you have deployed a simple guestbook application on Docker. It stores each guestbook entry in a Redis database. You are using a container orchestrator for scheduling, so you do not know the host IP address or port number to use for the Datadog Agent to connect to the Redis service. You enable Autodiscovery, and you create a configuration template for Redis that uses `%%host%%` and `%%port%%` variables. The Datadog Agent retrieves the actual host IP and port number from the Docker API and begins to gather Redis metrics for your application.

The Agent then watches for events like container creation, destruction, starts, and stops. The Agent then enables, disables, and regenerates static check configurations on such events. As the Agent inspects each running container, it checks if the container matches any of the [Autodiscovery container identifiers][1] from any loaded templates. For each match, the Agent generates a static check configuration by substituting the [Template Variables][2] with the matching container's specific values. Then it enables the check using the static configuration.

## Setup

Setting up Autodiscovery for your infrastructure requires the following two steps:

1. [Enable Autodiscovery](#enable-autodiscovery) for your Datadog Agent.
2. Create [integration-specific configuration templates](#integration-templates) for each service you wish to monitor. Note that Datadog provides auto-configuration templates for [some common containerized services][3], including Apache and Redis.

### Enable Autodiscovery 

#### With the Agent on a host

{{< tabs >}}
{{% tab "Docker" %}}

Add the following configuration block in the `datadog.yaml` [configuration file][1]. 

```
listeners:
  - name: docker
config_providers:
  - name: docker
    polling: true
```


[1]: /agent/guide/agent-configuration-files/?tab=agentv6#agent-main-configuration-file
{{% /tab %}}
{{% tab "Kubernetes" %}}

Add the following configuration block in the `datadog.yaml` [configuration file][1]. 

```
listeners:
  - name: kubelet
config_providers:
  - name: kubelet
    polling: true
  # needed to support legacy docker label config templates
  - name: docker
    polling: true
```


[1]: /agent/guide/agent-configuration-files/?tab=agentv6#agent-main-configuration-file
{{% /tab %}}
{{% tab "ECS Fargate" %}}

ECS Fargate cannot be monitored with the Datadog Agent running as a binary on a host. 

{{% /tab %}}
{{< /tabs >}}

#### With the Agent as a container

{{< tabs >}}
{{% tab "Docker" %}}

To automatically enable Autodiscovery over Docker containers, mount `/var/run/docker.sock` into the Containerized Agent.

{{% /tab %}}
{{% tab "Kubernetes" %}}

To enable Autodiscovery over containers within Kubernetes, add the following environment variable when starting the containerized Agent:

```
KUBERNETES=true
```

{{% /tab %}}
{{% tab "ECS Fargate" %}}

To enable Autodiscovery over containers within Kubernetes, add the following environment variable when starting the containerized Agent:

```
ECS_FARGATE=true
```

{{% /tab %}}
{{< /tabs >}}

### Integration Templates

Once Autodiscovery is enabled, the Datadog Agent automatically attempts Autodiscovery [for a number of services][3], including Apache and Redis, based on default Autodiscovery configuration files.

To use Autodiscovery with other services, define templates for the services you wish to monitor. See the [Autodiscovery Integration Templates][4] documentation for further details.



## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /agent/autodiscovery/ad_identifiers
[2]: /agent/autodiscovery/template_variables
[3]: /agent/autodiscovery/auto_conf
[4]: /agent/autodiscovery/integrations/?tab=kubernetes
