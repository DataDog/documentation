---
aliases:
- /ja/agent/autodiscovery/basic_autodiscovery
- /ja/getting_started/agent/autodiscovery
- /ja/agent/autodiscovery
further_reading:
- link: /agent/kubernetes/integrations/
  tag: Documentation
  text: Create and load an Autodiscovery Integration Template
- link: /agent/guide/ad_identifiers/
  tag: Documentation
  text: Match a container with the corresponding Integration Template
- link: /agent/guide/autodiscovery-management/
  tag: Documentation
  text: Manage which Container to include in the Agent Autodiscovery
- link: /agent/kubernetes/tag/
  tag: Documentation
  text: Dynamically assign and collect tags from your application
- link: /integrations/faq/integration-setup-ecs-fargate/?tab=rediswebui
  tag: faq
  text: Integration Setup for ECS Fargate
- link: /agent/configuration/secrets-management/
  tag: Documentation
  text: Secrets Management
kind: documentation
title: Basic Agent Autodiscovery
---

## Overview

When you are monitoring a containerized infrastructure, one challenge that arises is that containers can shift from host to host. The dynamic nature of containerized systems makes them difficult to manually monitor.

To solve this issue, you can use Datadog's Autodiscovery feature to automatically identify the services running on a specific container and gather data from those services. Whenever a container starts, the Datadog Agent identifies which services are running on this new container, looks for the corresponding monitoring configuration, and starts to collect metrics.

Autodiscovery lets you define configuration templates for Agent checks and specify which containers each checks should apply to.

The Agent watches for events like container creation, destruction, starts, and stops. The Agent then enables, disables, and regenerates static check configurations on such events. As the Agent inspects each running container, it checks if the container matches any of the [Autodiscovery container identifiers][1] from any loaded templates. For each match, the Agent generates a static check configuration by substituting the [Template Variables][2] with the matching container's specific values. Then it enables the check using the static configuration.

## How it works

{{< img src="agent/autodiscovery/ad_1.png" alt="Autodiscovery Overview" style="width:80%;">}}

In the figure above, there is a host node with three pods, including a Redis pod and an Agent pod. The Kubelet, which schedules containers, runs as a binary on this node, and exposes the endpoints `/metrics` and `/pods`. Every 10 seconds, the Agent queries `/pods` and finds the Redis spec. It can also see information about the Redis pod itself.

The Redis spec in this example includes the following annotations:

{{< tabs >}}

{{% tab "AD Annotations v2 (Agent 7.36+)" %}}
```yaml
labels:
  tags.datadoghq.com/redis.env: "prod"
  tags.datadoghq.com/redis.service: "my-redis"
  tags.datadoghq.com/redis.version: "6.0.3"
annotations:
  ad.datadoghq.com/redis.checks: |
    {
      "redisdb": {
        "init_config": {},
        "instances": [
          {
            "host": "%%host%%",
            "port":"6379",
            "password":"%%env_REDIS_PASSWORD%%"
          }
        ]
      }
    }
  ad.datadoghq.com/redis.logs: '[{"source":"redis"}]'
```

In the example above, the `tags.datadoghq.com` labels set the `env`, `service`, and even `version` as tags for all logs and metrics emitted for the Redis pod. These standard labels are part of [Unified Service Tagging][1]. As a best practice, Datadog recommends using unified service tagging when configuring tags and environment variables.

`redisdb` is the name of the check to run. `init_config` contains some configuration parameters, such as minimum collection interval, and is optional. Each item in `instances` represents the configuration to run for one instance of a check. **Note**: In this example, `%%host%%` is a template variable that is dynamically populated with your container's IP.

[1]: /ja/getting_started/tagging/unified_service_tagging
{{% /tab %}}

{{% tab "AD Annotations v1" %}}
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

In the example above, the `tags.datadoghq.com` labels set the `env`, `service`, and even `version` as tags for all logs and metrics emitted for the Redis pod. These standard labels are part of [Unified Service Tagging][1]. As a best practice, Datadog recommends using unified service tagging when configuring tags and environment variables.

`check_names` includes the names of the check to run, and `init_configs` contains some configuration parameters, such as minimum collection interval. Each item in `instances` represents the configuration to run for one instance of a check. **Note**: In this example, `%%host%%` is a template variable that is dynamically populated with your container's IP.

[1]: /ja/getting_started/tagging/unified_service_tagging
{{% /tab %}}

{{< /tabs >}}

From this, the Agent generates a static check configuration.

## Setup

Setting up Autodiscovery for your infrastructure requires the following two steps:

1. [Enable Autodiscovery](#enable-autodiscovery) for your Datadog Agent.
2. Create [integration-specific configuration templates](#integration-templates) for each service you wish to monitor. **Note**: Datadog provides auto-configuration templates for [some common containerized services][3], including Apache and Redis.

### Enable Autodiscovery

The Agent not only automatically detects reachable sockets and API endpoints (such as Docker, containerd, and Kubernetes API), but also activates Autodiscovery for you.

If Autodiscovery is not working, verify the detected features by running `agent status`.

In case the automatic detection failed or you want to deactivate automatically detected features, use these configuration parameters in `datadog.yaml` to include/exclude features:
```yaml
autoconfig_exclude_features:
- docker
autoconfig_include_features:
- containerd
```

The complete list of automatically detected features is available in the `datadog.yaml` template.

### Integration templates

Once Autodiscovery is enabled, the Datadog Agent automatically attempts Autodiscovery for several [services][3], including Apache and Redis, based on default Autodiscovery configuration files.

You can define an integration template in multiple forms: as Kubernetes pod annotations, Docker labels, a configuration file mounted within the Agent, a ConfigMap, and key-value stores. See the [Autodiscovery Integration Templates][4] documentation for further details.

### Notes

If you are using Autodiscovery and an application is deployed on a new node, you may experience some delay in seeing metrics appear in Datadog. When you switch to a new node, it takes time for the Datadog Agent to collect metadata from your application.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/guide/ad_identifiers/
[2]: /ja/agent/faq/template_variables/
[3]: /ja/agent/faq/auto_conf/
[4]: /ja/agent/kubernetes/integrations/