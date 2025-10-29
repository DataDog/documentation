---
title: Multisource Querying
is_beta: true
description: Learn how to use Multisource Querying to query costs across multiple providers in Cloud Cost Management.
further_reading:
- link: "https://www.datadoghq.com/blog/focus-cost-data/"
  tag: "Blog"
  text: "Monitor your multi-cloud costs with Cloud Cost Management and FOCUS"
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Learn about Cloud Cost Management"
- link: "/cloud_cost_management/container_cost_allocation"
  tag: "Documentation"
  text: "Learn about Container Cost Allocation"
---

## Overview

After you start ingesting your [AWS][1], [Azure][2], [Google Cloud][3], [Oracle][15], [SaaS][4], or [Datadog costs][5] in [Cloud Cost Management][6], you can flexibly query costs across providers. Multisource Querying enables you to query costs across multiple providers using consistent and standardized tags instead of building multiple queries for each provider.

Use Multisource Querying to build cost views, understand the total cost of service ownership, and alert on cost changes and trends across the [**Explorer** page][6], [dashboards][7], [notebooks][8], and [cost monitors][9].

## Setup

To use Multisource Querying, ensure you have configured [Cloud Cost Management][10] and are actively ingesting costs in Datadog. Multiple currencies are supported, with your costs automatically being converted to and displayed in USD.

## Query your cost data

You can select multiple providers in the **Provider** field on the [**Explorer** page][6].

{{< img src="cloud_cost/multisource_querying/provider.png" alt="The Provider field below the search query on the Cloud Cost Explorer page" style="width:40%;" >}}

Dropdown filters like **Provider** and **Team** maintain flexibility and streamline the process of creating a search query so you can refine your cost data. To add a filter, click **+ Filter**.

{{< img src="cloud_cost/multisource_querying/filters_2.png" alt="A search query that uses the Team filter and groups reports by service on the Cloud Cost Explorer page" style="width:100%;" >}}

Click **Refine Results** to access the following options and filter your cost data.

Usage Charges Only
: Examine costs impacted by engineering teams, excluding credits, fees, and taxes.

Complete Days Only
: Exclude the past two days of cost data, which are incomplete.

Total Cost
: Filter the data to view costs within a specific cost range.

Dollar Change
: Only display cost changes within a specified dollar change range.

Percent Change
: Only display cost changes within a specified percentage change range.

{{< img src="cloud_cost/multisource_querying/refine_results_1.png" alt="Additional options to refine your cost data on the Cloud Cost Explorer page" style="width:100%;" >}}

## Visualize your cost data

With Multisource Querying, you can create visualizations using cost data across providers in your [dashboards][11].

{{< img src="cloud_cost/multisource_querying/cost_overview.png" alt="A dashboard in Datadog displaying Cloud Cost Management data from multiple providers such as Snowflake, Azure, Google Cloud, AWS, and more" style="width:100%;" >}}

## Data Collected

### Cost metric

Multisource Querying uses the `all.cost` metric, which combines all individual cloud and SaaS cost metrics into a unified view on the **Analytics** page.

**Note:** The `all.cost` metric does not include resource-level tags. To view costs by resource, use the specific cost metrics for each provider (such as `aws.cost.amortized`). When you filter to a specific provider in the search query, Datadog automatically switches to the corresponding provider-specific metric, enabling more granular querying of your cost data.

### Out-of-the-box tags

Cloud Cost Management collects tags for the AWS, Azure, Google Cloud, and Oracle Cloud integrations. This table provides a non-exhaustive list of out-of-the-box tags shared across each integration.

| Tag Name | Tag Description |
|---|---|
| `allocated_resource` | The type of resource used by a container workload (such as `cpu` or `mem`). |
| `allocated_spend_type` | Container costs are split into three spend types: resources used by a workload (`usage`); resources reserved by a workload, but not used (`workload_idle`); and resources that are not reserved or used by any workload (`cluster_idle`). |
| `ecs_cluster_name` | The name of the ECS cluster hosting a workload. |
| `kube_cluster_name` | The name of the Kubernetes cluster hosting a workload. |
| `orchestrator` | The container orchestrator (such as `kubernetes` or `ecs`). |

### Tag enrichment

Cloud Cost Management enriches all provider cost data with tags that adhere to the [FinOps FOCUS specification][12]. FOCUS™ is a technical specification that normalizes cost and usage billing data across cloud vendors.

FOCUS tags allow you to query similar concepts across providers. For example, if you'd like to see cost per account across AWS and Azure, you are not required to create two queries (one for AWS costs grouped by `aws_member_account_name` and one for Azure costs grouped by `subscriptionname`). You can use one search query that filters to AWS and Azure costs grouped by `subaccountname`.

Cloud Cost Management adds lowercase versions of the specification Column IDs to all cost metrics.

The following FOCUS tags are available in Cloud Cost Management:

| Tag Name | Tag Description |
|---|---|
| `providername` | The name of the entity that made the resources or services available for purchase. |
| `servicename` | An offering that can be purchased from a provider (for example, cloud virtual machine, SaaS database, professional services from a systems integrator). |
| `billingaccountid` | The identifier assigned to a billing account by the provider. |
| `billingaccountname` | The display name assigned to a billing account. |
| `billingcurrency` | The currency in which a cloud bill was paid. |
| `subaccountid` | An ID assigned to a grouping of resources or services, often used to manage access or cost. |
| `subaccountname` | A name assigned to a grouping of resources or services, often used to manage access or cost. |
| `regionname` | The name of an isolated geographic area where a resource is provisioned or a service is provided. |
| `availabilityzone` | A provider-assigned identifier for a physically separated and isolated area within a region that provides high availability and fault tolerance. |
| `pricingunit` | Provider-specified measurement unit for determining unit prices, indicating how the provider rates measured usage and purchase quantities after applying pricing rules like block pricing. |

The `all.cost` metric has [Container costs allocated][13] for AWS, Azure, and Google Cloud costs, so you can query by the [relevant container tags][14].

<div class="alert alert-danger">If your organization tags with any of these FOCUS tags, Datadog recommends updating your tag key on the underlying infrastructure so that tag values do not overlap with FOCUS tag values in Cloud Cost Management.</div>

## Currency conversion
Cloud Cost Management retrieves the billing currency from each cloud provider's bill. When processing costs from multiple providers in different currencies, cost charges are converted to USD. This conversion is performed using the average monthly exchange rate, which is updated daily. This ensures that Cloud Cost Management can consistently and accurately represent all cost data, regardless of its original currency. To view your cost in the original billing currency, filter to a single provider.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /cloud_cost_management/setup/aws
[2]: /cloud_cost_management/setup/azure
[3]: /cloud_cost_management/setup/google_cloud
[4]: /cloud_cost_management/setup/saas_costs
[5]: /cloud_cost_management/datadog_costs
[6]: https://app.datadoghq.com/cost/explorer
[7]: /dashboards
[8]: /notebooks
[9]: /cloud_cost_management/monitors
[10]: /cloud_cost_management
[11]: https://app.datadoghq.com/dashboard/lists
[12]: https://focus.finops.org/#obtain
[13]: /cloud_cost_management/container_cost_allocation
[14]: /cloud_cost_management/container_cost_allocation/?tab=aws#applying-tags
[15]: /cloud_cost_management/setup/oracle
