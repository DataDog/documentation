---
title: Amazon ECS Tag Extraction
aliases:
  - /agent/amazon_ecs/tags
further_reading:
- link: "/getting_started/tagging/"
  tag: "Documentation"
  text: "Getting started with tags"
- link: "/getting_started/tagging/using_tags/"
  tag: "Documentation"
  text: "Using tags with Datadog"
- link: "/agent/guide/autodiscovery-management/"
  tag: "Documentation"
  text: "Limit data collection to a subset of containers only"
---

## Overview

The Datadog Agent can create and assign tags to all metrics, traces, and logs emitted by a container based on its labels or environment variables.

## Out-of-the-box tags

The Agent can autodiscover and attach tags to all data emitted by the entire task or an individual container within this task. The list of tags attached automatically depends on the agent [cardinality configuration][1].

<div style="overflow-x: auto;">

  | Tag                           | Cardinality  | Source               |
  |-------------------------------|--------------|----------------------|
  | `container_name`              | High         | Docker               |
  | `container_id`                | High         | Docker               |
  | `docker_image`                | Low          | Docker               |
  | `image_name`                  | Low          | Docker               |
  | `short_image`                 | Low          | Docker               |
  | `image_tag`                   | Low          | Docker               |
  | `ecs_cluster_name`            | Low          | ECS API              |
  | `ecs_container_name`          | Low          | ECS API              |
  | `task_arn`                    | Orchestrator | ECS API              |
  | `task_family`                 | Low          | ECS API              |
  | `task_name`                   | Low          | ECS API              |
  | `task_version`                | Low          | ECS API              |

</div>

## Unified service tagging

As a best practice in containerized environments, Datadog recommends using unified service tagging when assigning tags. Unified service tagging ties Datadog telemetry together through the use of three standard tags: `env`, `service`, and `version`. To learn how to configure your environment with unified tagging, see the [Amazon ECS unified service tagging documentation][2].

## Resource tag collection

If you do not have unified service tagging enabled, complete the following steps to collect ECS resource tags:

1. Verify your [Amazon ECS container instances][3] are associated with an IAM role. This can be done when creating a new cluster with the ECS cluster creation wizard or in the launch configuration used by an autoscaling group.
2. Update the IAM role used by your [Amazon ECS container instances][3] with: `ecs:ListTagsForResource`.
3. Update your [datadog-agent-ecs.json][4] file ([datadog-agent-ecs1.json][5] if you are using an original Amazon Linux AMI) to enable resource tag collection by adding the following environment variable:

    {{< code-block lang="json" >}}
    {
      "name": "DD_ECS_COLLECT_RESOURCE_TAGS_EC2",
      "value": "true"
    }
    {{< /code-block >}}

### Notes

- Ensure the IAM role is associated with your [Amazon ECS container instances][3] and not the task role of the Datadog agent container.
- ECS resource tags can be collected from EC2 instances, but not from AWS Fargate.
- This feature requires Datadog Agent v6.17+ or v7.17+.
- The Agent supports ECS tag collection from the `tasks`, `services`, and `container instances` ECS resources.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/assigning_tags/?tab=containerizedenvironments#environment-variables
[2]: /getting_started/tagging/unified_service_tagging/?tab=ecs#containerized-environment
[3]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_instances.html
[4]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs.json
[5]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs1.json
