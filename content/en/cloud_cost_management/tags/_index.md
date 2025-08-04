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

Tags help you organize, filter, and allocate your cloud costs effectively. Cloud Cost Management automatically enriches your cost data with tags from multiple sources, so you can focus on using tags to drive insights rather than managing the technical details. Using tags, you can allocate shared costs fairly, create accurate reports, and track costs by team, service, or environment.

## Getting started

Get started with tags in three steps:

1. **See what you have** - Use [Tag Explorer][5] to discover which tags are already available in your cost data.
2. **Identify gaps** - Look for missing tags that would help you track costs by team, project, or environment.
3. **Add missing tags** - Use [Tag Pipelines][4] to automatically add tags based on your business logic.

{{< img src="cloud_cost/tag_explorer/aws_1.png" alt="Tag Explorer interface showing available AWS tags and their usage" style="width:80%;" >}}

## Where your tags come from

Datadog applies tags to cost data using the following sources:

- **[Out-of-the-box tags][1]** - Standardized tags that Datadog automatically generates from some billing data columns (like `aws_product` and `aws_region`) in your cost and usage report
- **[Container allocation tags][2]** - Tags from your container workloads
- **[Resource and account tags][3]** - Tags you've applied to your cloud resources
- **[Tag pipelines][4]** - Custom rules you create to add missing tags

## How tags are attached to cost data

Datadog automatically associates tags with your cost data through a multi-step process as new cost data is ingested. Your cost analysis always reflects the most current tag information.

1. **Data ingestion** - When cost data arrives from your cloud provider (through billing reports, APIs, and so on), Datadog identifies the specific resources and services being billed.
2. **Tag lookup** - For each cost datapoint, Datadog looks up available tags from all configured sources (billing data, resource tags, container metadata, and so on).
3. **Tag application** - Tags are attached to the cost data based on a precedence order:
   - Tag Pipelines (highest priority)
   - Container tags
   - Resource/account tags
   - Out-of-the-box tags
   - Billing data (lowest priority)

4. **Data storage** - The enriched cost data with all associated tags is stored and made available for analysis.

## Essential tags and examples

In addition to out-of-the-box tags, you can add these key tags to get the most value from your cost data:

### Team and ownership tags
- `team` - Which team owns the resource
- `owner` - Individual responsible for the resource
- `project` - Project or initiative the resource supports

**Example: Track costs by team**
Tag your resources with `team:engineering` or `team:marketing`, then:
- Create dashboards showing spend by team
- Set up alerts for unusual team spending
- Generate monthly cost reports per team

### Environment and lifecycle tags
- `env` - Environment (prod, staging, dev)
- `service` - Application or service name
- `version` - Application version or release

**Example: Identify unused resources**
Use tags like `env:dev` and `purpose:testing` to:
- Find development resources that can be stopped
- Track costs for temporary projects
- Clean up abandoned test environments

### Business context tags
- `cost-center` - Budget or cost center
- `business-unit` - Business unit or department
- `purpose` - What the resource is used for

**Example: Optimize container costs**
With container cost allocation, you can:
- See costs broken down by pod, namespace, or deployment
- Identify which applications are most expensive
- Optimize resource requests and limits

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /cloud_cost_management/multisource_querying/#out-of-the-box-tags
[2]: /cloud_cost_management/container_cost_allocation
[3]: /cloud_cost_management/setup/aws/#aws-resource-tags
[4]: /cloud_cost_management/tags/tag_pipelines
[5]: /cloud_cost_management/tags/tag_explorer