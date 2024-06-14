---
title: Tag Explorer
kind: documentation
description: Search and manage all cost-related tags, including those from your bills, with insights into their sources.
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Learn about Cloud Cost Management"
- link: "/cloud_cost_management/custom"
  tag: "Documentation"
  text: "Learn about Custom Costs"
- link: "/cloud_cost_management/tag_pipelines"
  tag: "Documentation"
  text: "Learn about Tag Pipelines"
---

## Overview

[Cloud Cost Management][1] detects the sources for all of your cost-related tags, allowing you to search and manage tags for breaking down costs, including custom costs. 

{{< img src="cloud_cost/tag_explorer/dropdown.png" alt="Search through the list of Azure cost-related tags in the Tag Explorer and understand where the costs are coming from" style="width:100%;" >}}

Use the [Tag Explorer][2] to understand the sources and view descriptions for each tag, in addition to those managed through [Tag Pipelines][3]. [Tag Pipelines][3] allow you to create and manage tag rules that fix missing or incorrect tags on your cloud bill, or create inferred tags according to your business logic. 

## Setup

To use Custom Costs in Datadog, you must configure [Cloud Cost Management][1] for AWS, Azure, or Google Cloud.

See the respective documentation for your cloud provider:

{{< partial name="cloud_cost/getting-started.html" >}}

</br>

## Search and manage tags

You can search for tags related to your cloud provider bills, custom cost data sources, and tag pipelines in the [Tag Explorer][2] to gain insights into the total costs of your services.

{{< tabs >}}
{{% tab "AWS" %}}

For AWS tags, select **AWS** from the dropdown menu on the top right corner.

{{< img src="cloud_cost/tag_explorer/aws.png" alt="Search through the list of AWS cost-related tags in the Tag Explorer and understand where the costs are coming from" style="width:100%;" >}}

{{% /tab %}}
{{% tab "Azure" %}}

For Azure tags, select **Azure** from the dropdown menu on the top right corner.

{{< img src="cloud_cost/tag_explorer/azure.png" alt="Search through the list of Azure cost-related tags in the Tag Explorer and understand where the costs are coming from" style="width:100%;" >}}

{{% /tab %}}
{{% tab "Google" %}}

For Google Cloud tags, select **Google** from the dropdown menu on the top right corner.

{{< img src="cloud_cost/tag_explorer/google.png" alt="Search through the list of Azure cost-related tags in the Tag Explorer and understand where the costs are coming from" style="width:100%;" >}}

{{% /tab %}}
{{% tab "Custom" %}}

<div class="alert alert-warning">Custom Cost is in public beta.</div>

For custom tags, select **Custom** from the dropdown menu on the top right corner.

{{< img src="cloud_cost/tag_explorer/custom.png" alt="Search through the list of your custom cost tags in the Tag Explorer and understand where the costs are coming from" style="width:100%;" >}}

{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /cloud_cost_management/
[2]: https://app.datadoghq.com/cost/tags
[3]: /cloud_cost_management/tag_pipelines
