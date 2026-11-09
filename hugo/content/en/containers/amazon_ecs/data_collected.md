---
title: Amazon ECS Data Collection
description: Reference guide for metrics, logs, and events collected by the Datadog Agent on Amazon ECS
aliases:
  - /agent/amazon_ecs/data_collected
further_reading:
- link: "/agent/amazon_ecs/logs/"
  tag: "Documentation"
  text: "Collect your application logs"
- link: "/agent/amazon_ecs/apm/"
  tag: "Documentation"
  text: "Collect your application traces"
- link: "/agent/amazon_ecs/data_collected/#metrics"
  tag: "Documentation"
  text: "Collect ECS metrics"
---

## Data collected

### Metrics

Amazon ECS on EC2 is a container management service for Docker containers running on EC2 instances.

The following table lists metrics collected by the Agent or API crawler for Amazon ECS:

{{< get-metrics-from-git "amazon-ecs" >}}

Metrics collected by the Agent when deployed in a Docker container also include the same metrics collected by the Docker integration. See the [Docker integration metrics][1] for a complete list of metrics.

Metrics prefixed with `ecs.containerinsights.*` can be collected by enabling **collect custom metrics** under the Metric Collection tab of the AWS Integration.

**Note**: Docker metrics are tagged accordingly with the following tags: `container_name`, `task_arn`, `task_family`, `task_name`, `task_version`. No further configuration is required.

### Events

The Amazon ECS integration collects events emitted by clusters and services, which typically look like the following:

{{< img src="integrations/amazon_ecs/aws_ecs_events.png" alt="Amazon ECS Events" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/agent/docker/data_collected/#metrics
