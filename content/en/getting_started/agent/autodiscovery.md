---
title: Basic Agent Autodiscovery
kind: documentation
aliases:
 - /agent/autodiscovery/basic_autodiscovery
further_reading:
- link: "/agent/kubernetes/integrations/"
  tag: "Documentation"
  text: "Create and load an Autodiscovery Integration Template"
- link: "/agent/guide/ad_identifiers/"
  tag: "Documentation"
  text: "Match a container with the corresponding Integration Template"
- link: "/agent/guide/autodiscovery-management/"
  tag: "Documentation"
  text: "Manage which Container to include in the Agent Autodiscovery"
- link: "/agent/kubernetes/tag/"
  tag: "Documentation"
  text: "Dynamically assign and collect tags from your application"
- link: "/integrations/faq/integration-setup-ecs-fargate/?tab=rediswebui"
  tag: "faq"
  text: "Integration Setup for ECS Fargate"
- link: "/agent/guide/secrets-management/"
  tag: "Documentation"
  text: "Secrets Management"
---

## Overview

When you are monitoring a containerized infrastructure, one challenge that arises is that containers can shift from host to host. The dynamic nature of containerized systems makes them difficult to manually monitor.

To solve this issue, you can use Datadog’s Autodiscovery feature to automatically identify the services running on a specific container and gather data from those services. Whenever a container starts, the Datadog Agent identifies which services are running on this new container, looks for the corresponding monitoring configuration, and starts to collect metrics.

Autodiscovery lets you define configuration templates for Agent checks and specify which containers each checks should apply to.

The Agent watches for events like container creation, destruction, starts, and stops. The Agent then enables, disables, and regenerates static check configurations on such events. As the Agent inspects each running container, it checks if the container matches any of the [Autodiscovery container identifiers][1] from any loaded templates. For each match, the Agent generates a static check configuration by substituting the [Template Variables][2] with the matching container's specific values. Then it enables the check using the static configuration.

## How it works

{{< img src="agent/autodiscovery/ad_1.png" alt="Autodiscovery Overview"  style="width:80%;">}}

In the figure above, there is a host node with three pods, including a Redis pod and an Agent pod. The Kubelet, which schedules containers, runs as a binary on this node, and exposes the endpoints `/metrics` and `/pods`. Every 10 seconds, the Agent queries `/pods` and finds the Redis spec. It can also see information about the Redis pod itself.

The Redis spec in this example includes the following annotations:

```yaml
labels:
  tags.datadoghq.com/redis.env: "prod"
  tags.datadoghq.com/redis.service: "my-redis"
  tags.datadoghq.com/redis.version: "6.0.3"
annotations:
  ad.datadoghq.com/redis.check_names: '["redisdb"]'
  ad.datadoghq.com/redis.init_configs: '[{}]'
  ad.datadoghq.com/redis.instances: |
    [
      {
        "host": "%%host%%",
        "port":"6379",
        "password":"%%env_REDIS_PASSWORD%%"
      }
    ]
  ad.datadoghq.com/redis.logs: '[{"source":"redis"}]'
```

In the example above, the `tags.datadoghq.com` labels set the `env`, `service`, and even `version` as tags for all logs and metrics emitted for the Redis pod. These standard labels are part of [Unified Service Tagging][3]. As a best practice, Datadog recommends using unified service tagging when configuring tags and environment variables.

`check_names` includes the names of the check to run, and `init_configs` contains some configuration parameters, such as minimum collection interval. Each item in `instances` represents the configuration to run for one instance of a check. Note that in this example, `%%host%%` is a template variable that is dynamically populated with your container's IP.

From this, the Agent generates a static check configuration.

## Setup

Setting up Autodiscovery for your infrastructure requires the following two steps:

1. [Enable Autodiscovery](#enable-autodiscovery) for your Datadog Agent.
2. Create [integration-specific configuration templates](#integration-templates) for each service you wish to monitor. Note that Datadog provides auto-configuration templates for [some common containerized services][4], including Apache and Redis.

### Enable Autodiscovery

#### With the Agent on a host

{{< tabs >}}
{{% tab "Docker" %}}

Add the following configuration block in the `datadog.yaml` [configuration file][1].

```yaml
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

[1]: /agent/guide/agent-configuration-files/?tab=agentv6#agent-main-configuration-file
{{% /tab %}}
{{% tab "ECS Fargate" %}}

ECS Fargate cannot be monitored with the Datadog Agent running as a binary on a host.

{{% /tab %}}
{{< /tabs >}}

#### With the Agent as a container

{{< tabs >}}
{{% tab "Docker" %}}

To automatically enable Autodiscovery over Docker containers, mount `/var/run/docker.sock` into the Containerized Agent. On Windows, mount `\\.\pipe\docker_engine`.

{{% /tab %}}
{{% tab "Kubernetes" %}}

Autodiscovery is enabled by default on Kubernetes.

To verify this, ensure the following environment variable is set:

```shell
KUBERNETES=yes
```

{{% /tab %}}
{{% tab "ECS Fargate" %}}

To enable Autodiscovery over containers within Kubernetes, add the following environment variable when starting the containerized Agent:

```shell
ECS_FARGATE=true
```

{{% /tab %}}
{{< /tabs >}}

### Integration templates

Once Autodiscovery is enabled, the Datadog Agent automatically attempts Autodiscovery [for a number of services][4], including Apache and Redis, based on default Autodiscovery configuration files.

You can define an integration template in multiple forms: as Kubernetes pod annotations, Docker labels, a configuration file mounted within the Agent, a ConfigMap, and key-value stores.

In the following example, the `tags.datadoghq.com` Kubernetes labels are used to tag pod's data with `env`, `service`, and `version`.

The Redis integration template is defined through Kubernetes pod annotations. It contains a custom `password` parameter and tags all its logs with the correct `source`.

```yaml
apiVersion: v1
kind: Pod
metadata:
  ## name of your Pod
  name: my-redis
  labels:
    ## set standard labels for unified service tagging
    tags.datadoghq.com/redis.env: prod
    tags.datadoghq.com/redis.service: my-redis
    tags.datadoghq.com/redis.version: "6.0.3"
  annotations:
    ## names of check; matches name in integrations_core repo
    ad.datadoghq.com/redis.check_names: '["redisdb"]'
    ## some configs, like minimum collection interval
    ad.datadoghq.com/redis.init_configs: '[{}]'
    ad.datadoghq.com/redis.instances: |
      [
        ## config to run for one instance of check
        {
          "host": "%%host%%",
          "port":"6379",
          "password":"%%env_REDIS_PASSWORD%%"
        }
      ]
    ## setup for logs collection
    ad.datadoghq.com/redis.logs: '[{"source":"redis"}]'
spec:
  containers:
    - name: redis
      image: httpd
      ports:
        - containerPort: 80
```

To use Autodiscovery with other services, define templates for the services you wish to monitor. See the [Autodiscovery Integration Templates][5] documentation for further details.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/guide/ad_identifiers/
[2]: /agent/faq/template_variables/
[3]: /getting_started/tagging/unified_service_tagging
[4]: /agent/faq/auto_conf/
[5]: /agent/kubernetes/integrations/
