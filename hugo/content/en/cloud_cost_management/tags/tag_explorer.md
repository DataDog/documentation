---
title: Tag Explorer
aliases:
  - /cloud_cost_management/tag_explorer
description: Search and manage all cost-related tags, including those from your bills, with insights into their sources.
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Learn about Cloud Cost Management"
- link: "/cloud_cost_management/setup/custom"
  tag: "Documentation"
  text: "Learn about Custom Costs"
- link: "/cloud_cost_management/datadog_costs"
  tag: "Documentation"
  text: "Learn about Datadog Costs"
- link: "/cloud_cost_management/setup/saas_costs"
  tag: "Documentation"
  text: "Learn about SaaS and AI Costs"
- link: "/cloud_cost_management/allocation/tag_pipelines"
  tag: "Documentation"
  text: "Learn about Tag Pipelines"
---

## Overview

[Cloud Cost Management][1] detects the sources for all of your cost-related tags. You can search and manage tags for breaking down costs, including [Custom Costs][4], [Datadog costs][5], and [SaaS cost integrations][6].

Use the [Tag Explorer][2] to understand the sources and view descriptions for each tag. This includes tags managed through [Tag Pipelines][3]. Tag Pipelines allow you to create and manage tag rules that fix missing or incorrect tags on your cloud bill, or create inferred tags according to your business logic.

{{< img src="cloud_cost/tag_explorer/aws_2.png" alt="The Tag Explorer listing AWS cost tags with their sources, descriptions, cost coverage, and distinct values" style="width:100%;" >}}

## Setup

To use the Tag Explorer, you must configure [Cloud Cost Management][1] for AWS, Azure, Google Cloud, or Oracle Cloud.

See the respective documentation for your cloud provider:

{{< card-grid image_width="50" >}}
  {{< image-card href="/cloud_cost_management/setup/aws/" src="integrations_logos/amazon-web-services_avatar.svg" alt="aws" >}}
  {{< image-card href="/cloud_cost_management/setup/azure/" src="integrations_logos/azure_avatar.svg" alt="azure" >}}
  {{< image-card href="/cloud_cost_management/setup/google_cloud/" src="integrations_logos/google-cloud-platform_avatar.svg" alt="google cloud" >}}
{{< /card-grid >}}

## Search and manage tags

Navigate to [{{< ui >}}Cloud Cost{{< /ui >}} > {{< ui >}}Analyze{{< /ui >}} > {{< ui >}}Tags{{< /ui >}}][2] to search tags from your cloud provider bills, [Custom Costs][4], [Datadog costs][5], [SaaS cost integrations][6], and [Tag Pipelines][3].

To see the tags for one provider, select it from the {{< ui >}}Provider{{< /ui >}} dropdown menu in the top left corner. AWS, Azure, Google Cloud, and Oracle Cloud are available, along with each SaaS cost integration you have configured. Use the {{< ui >}}Tag Sources{{< /ui >}} panel to narrow the results further by where each tag originates.

<div class="alert alert-danger">Datadog, Confluent Cloud, Databricks, Elastic Cloud, Fastly, MongoDB, OpenAI, Snowflake, and Twilio costs are in Preview.</div>

## Set preferred tags
You can set up to five preferred tags to highlight your organization's most important tags throughout Cloud Cost Management. These tags appear first when selecting tags in the [Explorer page][7], [CCM Reports][8], and [Custom Allocation Rules][9], among other areas.

{{< img src="cloud_cost/tag_explorer/preferred_tags_1.png" alt="Preferred tags are shown throughout CCM" style="width:100%;" >}}

You can choose preferred tags from any of your existing cost data tags, including [Tag Pipelines][3]. These settings apply to your entire organization.

{{< img src="cloud_cost/tag_explorer/preferred_tags_2.png" alt="Select your preferred tags in Tag Explorer" style="width:100%;" >}}

## Edit tag descriptions

You can add or edit descriptions for any tag in the Tag Explorer to provide context about what a tag represents and how it should be used. Click on a tag's description field to modify it, or use AI to automatically generate a description.

{{< img src="cloud_cost/tag_explorer/edit_tag_description.png" alt="Edit a tag description in the Tag Explorer with the option to generate with AI" style="width:60%;" >}}

Tag descriptions are visible to all members of your organization and appear in the following locations:

- {{< ui >}}Tag Explorer{{< /ui >}}: Descriptions are displayed in the tag table alongside each tag key.
- {{< ui >}}Group-by selectors{{< /ui >}}: When selecting tags to group by across Cloud Cost Management, descriptions appear in the dropdown menu to help users choose the right tag.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /cloud_cost_management/
[2]: https://app.datadoghq.com/cost/tags
[3]: /cloud_cost_management/allocation/tag_pipelines
[4]: /cloud_cost_management/setup/custom
[5]: /cloud_cost_management/datadog_costs
[6]: /cloud_cost_management/setup/saas_costs
[7]: https://app.datadoghq.com/cost/explorer
[8]: /cloud_cost_management/reporting
[9]: /cloud_cost_management/allocation/custom_allocation_rules
