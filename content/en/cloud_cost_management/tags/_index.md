---
title: Tags
description: Learn how tags are sourced, enriched, and managed in Cloud Cost Management.
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Learn about Cloud Cost Management"
- link: "/cloud_cost_management/tags/tag_pipelines"
  tag: "Documentation"
  text: "Tag Pipelines"
- link: "/cloud_cost_management/tags/tag_explorer"
  tag: "Documentation"
  text: "Tag Explorer"
- link: "/getting_started/tagging/"
  tag: "Documentation"
  text: "Getting Started with Tags"
---

## Overview

Tags help you investigate and understand your cloud and SaaS costs across any dimensions. 

Cloud Cost Management automatically enriches your cost data with tags from multiple sources, to help you achieve higher cost allocation and get deeper insight into who owns infrastructure costs in your ever changing cloud environments. Using tags, you can allocate shared costs fairly, create accurate reports, and track costs by team, service, or environment. 

## Where tags come form

Datadog applies tags to cost data using the following sources:

- **[Out-of-the-box tags][1]** - Standardized tags that Datadog automatically generates from some billing data columns (like `aws_product` and `aws_region`) in your cost and usage report
- **[Container allocation tags][2]** - Tags from your container workloads
- **[Resource and account tags][3]** - Tags you've applied to your cloud resources
- **[Tag pipelines][4]** - Custom rules you create to add missing tags

## How tags are normalized

## Improving tagging

1. **Understand what tags exist** - Use [Tag Explorer][5] to discover which tags are already available in your cost data.
2. **Identify gaps in cost allocation** - In Explorer, group by any tag to see how many dollars are allocated to that tag, or are unallocated (which show up as `N/A`). Make sure to have "Container Allocated" enabled so that you are looking at cost allocation including tags on pods.
3. **Split up shared costs** - Use [Custom Allocation Rules][6] to split and assign shared costs back to teams, services, or more. You can use observability data to split costs accurately based on infrastructure usage.
4. **Address missing or incorrect tags** - Use [Tag Pipelines][4] to alias tags, or create a new tag, for incorrect tagging. For example, if your organization wants to use the standard `application` tag key, but teams use variations (like app, webapp, or apps), you can clean up those tags to become `application` for more accurate cost reporting.
5. **Add new tags** - Use [Tag Pipelines][4] to automatically create new inferred tags that align with specific business logic, such as a `business-unit` tag based on team structure.

{{< img src="cloud_cost/tag_explorer/aws_1.png" alt="Tag Explorer interface showing available AWS tags and their usage" style="width:80%;" >}}
## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /cloud_cost_management/multisource_querying/#out-of-the-box-tags
[2]: /cloud_cost_management/container_cost_allocation
[3]: /cloud_cost_management/setup/aws/#aws-resource-tags
[4]: /cloud_cost_management/tags/tag_pipelines
[5]: /cloud_cost_management/tags/tag_explorer
[6]: /cloud_cost_management/custom_allocation_rules
