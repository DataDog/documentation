---
title: Nebius Cloud
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Cloud Cost Management"
- link: "/cloud_cost_management/setup/aws"
  tag: "Documentation"
  text: "Gain insights into your AWS bill"
- link: "/cloud_cost_management/setup/azure"
  tag: "Documentation"
  text: "Gain insights into your Azure bill"
- link: "/cloud_cost_management/setup/google_cloud"
  tag: "Documentation"
  text: "Gain insights into your Google Cloud bill"
- link: "/cloud_cost_management/setup/oracle"
  tag: "Documentation"
  text: "Gain insights into your Oracle bill"
---


## Prerequisites

Before you set up Cloud Cost Management for Nebius Cloud, make sure you have:

- A Nebius Cloud account

## Setup

### Configure the Nebius Cloud integration
Navigate to [Provider Settings on the cloud cost page][1], add a Nebius Cloud account, and follow the steps to configure the Nebius Cloud integration.

### Configure a cost export
In the Nebius console, navigate to **Billing > Export > Periodic Export** and create an export in FinOps Open Cost and Usage Specification (FOCUS) format to a Nebius Object Storage bucket. Datadog reads the exported cost reports directly from this bucket.

### Enable Cloud Cost Management
In the Nebius Cloud integration tile, enable the toggle for Cloud Cost Management and provide:
- The Object Storage bucket name, region, and prefix path where the cost reports are exported
- The access key pair for a service account with read access to the bucket

### Historical data

Datadog automatically ingests up to 12 months of available historical cost data from your Nebius cost export.

## Cost types
You can visualize your ingested data using the following cost types:

| Cost type                                       | Description |
|-------------------------------------------------| ----------------------------------|
| `nebius.cost.amortized`                            | Total cost of resources allocated at the time of usage over an interval. Costs include all applicable discounts. |
| `nebius.cost.ondemand`                             | Total public, on-demand cost of resources over an interval, before public and private discounts are applied. |
| `nebius.usage`                                    | Usage quantity of resources over an interval. |

### Out-of-the-box tags
Datadog adds out-of-the-box tags to ingested cost data to help you further break down and allocate your costs. These tags are derived from your FOCUS cost export and help you discover and understand cost data.

The following out-of-the-box tags are available for filtering and grouping data:

| Tag name                         | Tag description       |
| ---------------------------- | ----------------- |
| `billingaccountid`           | The identifier assigned to a billing account by the provider.|
| `billingaccountname`          | The display name assigned to a billing account.|
| `billingcurrency`            | An identifier representing the currency that a charge for resources or services was billed in.|
| `chargecategory`              | The top-level type of charge in a billing row.|
| `chargedescription`                | A self-contained summary that explains the purpose and price of a charge.|
| `chargefrequency`  | An indication of how often a charge occurs, helping to identify if it's recurring, and to forecast future charges.|
| `chargesubcategory`| Represents the sub-level classification of a charge based on the nature of how it is billed.|
| `commitmentdiscountcategory`| Indicates whether the commitment discount is based on usage quantity or on cost (spend).|
| `commitmentdiscountid`| The identifier assigned to a commitment discount by the provider.|
| `commitmentdiscountname`| The display name assigned to a commitment discount.|
| `commitmentdiscounttype`| A provider-assigned name to identify the type of commitment discount applied.|
| `invoiceissuer` | The entity responsible for invoicing for the resources or services consumed.|
| `pricingcategory` | Describes the pricing model used for a charge at the time of use or purchase.|
| `pricingunit` | Provider-specified measurement unit for determining unit prices, indicating how the provider rates measured usage and purchase quantities after applying pricing rules such as block pricing.|
| `providername` | The name of the entity that made the resources or services available for purchase.|
| `publishername` | The name of the entity that produces the resources or services that were purchased.|
| `region` | A provider-assigned display name for an isolated geographic area where a resource is provisioned or a service is provided.|
| `resourceid` | An identifier assigned to a resource by the provider.|
| `resourcename` | A display name assigned to a resource.|
| `resourcetype` | Describes the kind of resource the charge applies to.|
| `servicecategory` | The highest-level classification of a service based on the core function of the service.|
| `servicename` | An offering that can be purchased from a provider (for example, cloud virtual machine, SaaS database, or professional services from a systems integrator).|
| `skuid` | A provider-specified unique identifier that represents a specific SKU.|
| `subaccountid` | An ID assigned to a grouping of resources or services, often used to manage access, cost, or both.|
| `subaccountname` | A name assigned to a grouping of resources or services to manage access, cost, or both.|
| `usageunit` | A provider-specified measurement unit, indicating how the provider rates measured usage and purchase quantities.|

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/setup
