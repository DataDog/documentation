---
title: Amazon ECS Data Collection
kind: documentation
further_reading:
- link: "/agent/amazon_ecs/logs/"
  tag: "Documentation"
  text: "Collect your application logs"
- link: "/agent/amazon_ecs/apm/"
  tag: "Documentation"
  text: "Collect your application traces"
- link: "/agent/amazon_ecs/metrics/"
  tag: "Documentation"
  text: "Collect ECS metrics"
---

## Data collected

### Metrics

See [the Amazon ECS integration documentation][1] for a list of metrics provided by this integration.

Each of the metrics retrieved from AWS is assigned the same tags that appear in the AWS console, including but not limited to hostname, security-groups, and more.

**Note**: Metrics prefixed with `ecs.containerinsights.*` come from the [AWS CloudWatch agent][2].

### Events

To reduce noise, the Amazon ECS integration is automatically set up to include only events that contain the following words: `drain`, `error`, `fail`, `insufficient memory`, `pending`, `reboot`, `terminate`. See example events below:

{{< img src="integrations/amazon_ecs/aws_ecs_events.png" alt="AWS ECS Events" >}}

To remove the whitelist and receive all events from your Datadog Amazon ECS integration, reach out to [Datadog support][3].

### Service checks

- **aws.ecs.agent_connected**: Returns `CRITICAL` if the Agent cannot connect, otherwise `OK`.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/amazon_ecs/#data-collected
[2]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/deploy-container-insights-ECS-instancelevel.html
[3]: https://docs.datadoghq.com/help/
