---
title: Alibaba Cloud
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

Before you set up Cloud Cost Management for Alibaba Cloud, make sure you have:

- An Alibaba Cloud account on the international site
- The [Alibaba Cloud integration][1] installed in Datadog

## Setup

### Subscribe to FOCUS bills in Alibaba Cloud
Subscribe to cost reports in FinOps Open Cost and Usage Specification (FOCUS) format, delivered to an Object Storage Service (OSS) bucket:

1. Create an OSS bucket to receive the cost reports, or use an existing one.
2. In the **Expenses and Costs** console, go to **Bills > Bill Subscription** and click **Create Bill Subscription**.
3. Select the FOCUS format and all available subscription fields, and select your OSS bucket as the destination.
4. If this is your first OSS subscription, click **Authorize** to grant the service access.

Alibaba Cloud regenerates the current month's cost report daily and finalizes it a few days after the end of the month. Costs are billed in USD on the international site.

### Configure the Alibaba Cloud integration
Navigate to [Provider Settings on the cloud cost page][2], add an Alibaba Cloud account, and follow the steps to configure the Alibaba Cloud integration.

### Enable Cloud Cost Management
In the Alibaba Cloud integration tile, enable the toggle for Cloud Cost Management and provide:
- The OSS bucket name, region, and prefix path where the FOCUS cost reports are delivered
- The AccessKey pair of a Resource Access Management (RAM) user with the `ReadOnlyAccess` policy attached

### Historical data

Datadog automatically ingests up to 12 months of available historical cost data from your subscribed FOCUS bill exports.

## Cost types
You can visualize your ingested data using the following cost types:

| Cost type                                       | Description |
|-------------------------------------------------| ----------------------------------|
| `alibaba_cloud.cost.amortized`                            | Total cost of resources allocated at the time of usage over an interval. Costs include all applicable discounts. |
| `alibaba_cloud.cost.ondemand`                             | Total public, on-demand cost of resources over an interval, before public and private discounts are applied. |
| `alibaba_cloud.usage`                                    | Usage quantity of resources over an interval. |

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
| `x_instanceid` | The instance identifier for the resource associated with the charge.|

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/alibaba_cloud/
[2]: https://app.datadoghq.com/cost/setup
