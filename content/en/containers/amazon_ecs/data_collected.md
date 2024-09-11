---
title: Amazon ECS Data Collection
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

Amazon ECS on EC2 is a container management service for Docker containers running on EC2 instances. Metrics collected by the Agent for Amazon ECS:

{{< get-metrics-from-git "amazon_ecs" >}}

Metrics collected by the Agent when deployed in a Docker container also include the same metrics collected by the Docker integration. See the [Docker integration metrics][1] for a complete list of metrics.

Metrics prefixed with `ecs.containerinsights.*` can be collected by enabling **collect custom metrics** under the Metric Collection tab of the AWS Integration.

**Note**: Docker metrics are tagged accordingly with the following tags: `container_name`, `task_arn`, `task_family`, `task_name`, `task_version`. No further configuration is required.

### Events

To reduce noise, the Amazon ECS integration is automatically set up to include only events that contain the following words: `drain`, `error`, `fail`, `insufficient memory`, `pending`, `reboot`, `terminate`. See example events below:

{{< img src="integrations/amazon_ecs/aws_ecs_events.png" alt="Amazon ECS Events" >}}

To remove this include list and receive all events from your Datadog Amazon ECS integration, reach out to [Datadog support][2].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/agent/docker/data_collected/#metrics
[2]: https://docs.datadoghq.com/help/
