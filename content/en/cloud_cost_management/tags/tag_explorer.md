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
  text: "Learn about SaaS Cost Integrations"
- link: "/cloud_cost_management/tags/tag_pipelines"
  tag: "Documentation"
  text: "Learn about Tag Pipelines"
---

## Overview

[Cloud Cost Management][1] detects the sources for all of your cost-related tags. You can search and manage tags for breaking down costs, including [Custom Costs][4], [Datadog costs][5], and [SaaS cost integrations][6].

Use the [Tag Explorer][2] to understand the sources and view descriptions for each tag. This includes tags managed through [Tag Pipelines][3]. Tag Pipelines allow you to create and manage tag rules that fix missing or incorrect tags on your cloud bill, or create inferred tags according to your business logic.

{{< img src="cloud_cost/tag_explorer/dropdown_1.png" alt="Search through the list of Azure cost-related tags in the Tag Explorer and understand where the costs are coming from" style="width:100%;" >}}

## Setup

To use the Tag Explorer, you must configure [Cloud Cost Management][1] for AWS, Azure, Google Cloud, or Oracle Cloud.

See the respective documentation for your cloud provider:

{{< partial name="cloud_cost/getting-started.html" >}}

<br>

## Search and manage tags

Navigate to [**Cloud Cost** > **Settings** > **Tag Explorer**][2] to search for tags related to your cloud provider bills, custom costs, Datadog costs, SaaS cost integrations, and tag pipelines.

{{< tabs >}}
{{% tab "AWS" %}}

For AWS tags, select **AWS** from the dropdown menu on the top right corner.

{{< img src="cloud_cost/tag_explorer/aws_1.png" alt="Search through the list of AWS cost-related tags in the Tag Explorer and understand where the costs are coming from" style="width:100%;" >}}

{{% /tab %}}
{{% tab "Azure" %}}

For Azure tags, select **Azure** from the dropdown menu on the top right corner.

{{< img src="cloud_cost/tag_explorer/azure_1.png" alt="Search through the list of Azure cost-related tags in the Tag Explorer and understand where the costs are coming from" style="width:100%;" >}}

{{% /tab %}}
{{% tab "Google" %}}

For Google Cloud tags, select **Google** from the dropdown menu on the top right corner.

{{< img src="cloud_cost/tag_explorer/google_1.png" alt="Search through the list of Google Cloud cost-related tags in the Tag Explorer and understand where the costs are coming from" style="width:100%;" >}}

{{% /tab %}}
{{% tab "Datadog" %}}

<div class="alert alert-danger">Daily Datadog costs are in Preview.</div>

For Datadog tags, select **Datadog** from the dropdown menu on the top right corner.

{{< img src="cloud_cost/tag_explorer/datadog_1.png" alt="Search through the list of your Datadog cost tags in the Tag Explorer and understand where the costs are coming from" style="width:100%;" >}}

{{% /tab %}}
{{% tab "Confluent Cloud" %}}

<div class="alert alert-danger">Confluent Cloud costs are in Preview.</div>

For Confluent Cloud tags, select **Confluent Cloud** from the dropdown menu on the top right corner.

{{< img src="cloud_cost/tag_explorer/confluent_cloud_1.png" alt="Search through the list of your Confluent Cloud cost tags in the Tag Explorer and understand where the costs are coming from" style="width:100%;" >}}

{{% /tab %}}
{{% tab "Databricks" %}}

<div class="alert alert-danger">Databricks costs are in Preview.</div>

For Databricks tags, select **Databricks** from the dropdown menu on the top right corner.

{{< img src="cloud_cost/tag_explorer/databricks_1.png" alt="Search through the list of your Databricks cost tags in the Tag Explorer and understand where the costs are coming from" style="width:100%;" >}}

{{% /tab %}}
{{% tab "Fastly" %}}

<div class="alert alert-danger">Fastly costs are in Preview.</div>

For Fastly tags, select **Fastly** from the dropdown menu on the top right corner.

{{< img src="cloud_cost/tag_explorer/fastly_1.png" alt="Search through the list of your Fastly cost tags in the Tag Explorer and understand where the costs are coming from" style="width:100%;" >}}

{{% /tab %}}
{{% tab "Elastic Cloud" %}}

<div class="alert alert-danger">Elastic Cloud costs are in Preview.</div>

For Elastic Cloud tags, select **Elastic Cloud** from the dropdown menu on the top right corner.

{{< img src="cloud_cost/tag_explorer/elastic_cloud.png" alt="Search through the list of your Elastic Cloud cost tags in the Tag Explorer and understand where the costs are coming from" style="width:100%;" >}}

{{% /tab %}}
{{% tab "MongoDB" %}}

<div class="alert alert-danger">MongoDB costs are in Preview.</div>

For MongoDB tags, select **MongoDB** from the dropdown menu on the top right corner.

{{< img src="cloud_cost/tag_explorer/mongodb_1.png" alt="Search through the list of your MongoDB cost tags in the Tag Explorer and understand where the costs are coming from" style="width:100%;" >}}

{{% /tab %}}
{{% tab "OpenAI" %}}

<div class="alert alert-danger">OpenAI costs are in Preview.</div>

For OpenAI tags, select **OpenAI** from the dropdown menu on the top right corner.

{{< img src="cloud_cost/tag_explorer/openai_1.png" alt="Search through the list of your OpenAI cost tags in the Tag Explorer and understand where the costs are coming from" style="width:100%;" >}}

{{% /tab %}}
{{% tab "Snowflake" %}}

<div class="alert alert-danger">Snowflake costs are in Preview.</div>

For Snowflake tags, select **Snowflake** from the dropdown menu on the top right corner.

{{< img src="cloud_cost/tag_explorer/snowflake_1.png" alt="Search through the list of your Snowflake cost tags in the Tag Explorer and understand where the costs are coming from" style="width:100%;" >}}

{{% /tab %}}
{{% tab "Twilio" %}}

<div class="alert alert-danger">Twilio costs are in Preview.</div>

For Twilio tags, select **Twilio** from the dropdown menu on the top right corner.

{{< img src="cloud_cost/tag_explorer/twilio_1.png" alt="Search through the list of your Twilio cost tags in the Tag Explorer and understand where the costs are coming from" style="width:100%;" >}}

{{% /tab %}}
{{< /tabs >}}

## Set preferred tags
You can set up to five preferred tags to highlight your organization's most important tags throughout Cloud Cost Management. These tags appear first when selecting tags in the [Explorer page][7], [CCM Reports][8], and [Custom Allocation Rules][9], among other areas.

{{< img src="cloud_cost/tag_explorer/preferred_tags_1.png" alt="Preferred tags are shown throughout CCM" style="width:100%;" >}}

You can choose preferred tags from any of your existing cost data tags, including [Tag Pipelines][3]. These settings apply to your entire organization.

{{< img src="cloud_cost/tag_explorer/preferred_tags_2.png" alt="Select your preferred tags in Tag Explorer" style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /cloud_cost_management/
[2]: https://app.datadoghq.com/cost/tags
[3]: /cloud_cost_management/tags/tag_pipelines
[4]: /cloud_cost_management/setup/custom
[5]: /cloud_cost_management/datadog_costs
[6]: /cloud_cost_management/setup/saas_costs
[7]: https://app.datadoghq.com/cost/explorer
[8]: /cloud_cost_management/reports
[9]: /cloud_cost_management/custom_allocation_rules
