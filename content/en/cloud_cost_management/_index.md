---
title: Cloud Cost Management
aliases:
  - /infrastructure/cloud_cost_management
  - /integrations/cloudability
further_reading:
  - link: "https://www.datadoghq.com/blog/control-your-cloud-spend-with-datadog-cloud-cost-management/"
    tag: "Blog"
    text: "Gain visibility and control of your cloud spend with Datadog Cloud Cost Management"
  - link: "https://www.datadoghq.com/blog/cloud-cost-management-container-support/"
    tag: "Blog"
    text: "Understand your Kubernetes and ECS spend with Datadog Cloud Cost Management"
  - link: "https://www.datadoghq.com/blog/google-cloud-cost-management/"
    tag: "Blog"
    text: "Empower engineers to take ownership of Google Cloud costs with Datadog"
  - link: "/monitors/types/cloud_cost/"
    tag: "Documentation"
    text: "Create a Cloud Cost monitor"
  - link: "/cloud_cost_management/tag_pipelines/"
    tag: "Documentation"
    text: "Learn about Tag Pipelines"
  - link: "/cloud_cost_management/tag_pipelines"
    tag: "Documentation"
    text: "Standardize tags across Cloud Cost Management with Tag Pipelines"
cascade:
    algolia:
      subcategory: 'Cloud Cost Management'
      rank: 70
      tags: ['cloud cost', 'cloud integrations', 'cloud cost management', 'cloud cost aws', 'cloud cost azure', 'cloud cost google cloud', 'cloud cost gcp', 'data collected aws', 'data collected azure', 'data collected google cloud']
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Cloud Cost Management is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Overview

Cloud Cost Management provides insights for engineering and finance teams to understand how infrastructure changes impact costs, allocate spend across your organization, and identify inefficiencies.

{{< img src="cloud_cost/overview.png" alt="Gain insights into your cloud provider's cost and usage on the Cloud Costs Overview page in Datadog" style="width:100%;" >}}

Datadog ingests your cloud cost data and transforms it into metrics you can use in a search query on the [**Analytics** page][1]. If costs rise, you can correlate the increase with usage metrics to determine the root cause.

## Setup

{{< whatsnext desc="To start managing your cloud costs with Cloud Cost Management, see the following documentation.">}}
  {{< nextlink href="/cloud_cost_management/aws">}}<u>AWS</u>: Configure Cloud Cost Management for your AWS bill.{{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/azure">}}<u>Azure</u>: Configure Cloud Cost Management for your Azure bill. {{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/google_cloud">}}<u>Google Cloud</u>: Configure Cloud Cost Management for your Google Cloud bill. {{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/custom">}}<u>Custom Costs</u>: Upload any cost data source to Datadog. {{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/saas_costs">}}<u>SaaS Cost Integrations</u>: Send cost data from a supported SaaS cost provider to Datadog. {{< /nextlink >}}
 {{< /whatsnext >}}

## Data Collected

Cloud Cost Management collects tags for the AWS, Azure, and Google Cloud integrations. This table provides a non-exhaustive list of out-of-the-box tags associated with each integration.

{{< tabs >}}
{{% tab "AWS" %}}

| Tag Name | Tag Description |
|---|---|
| aws_availability_zone | The Availability Zone that hosts the line item. |
| aws_bill_entity | The AWS seller that your account is with. Transactions can either be an AWS Marketplace purchase (`AWS Marketplace`) or a purchase of other AWS services (`AWS`). |
| aws_bill_type | The type of bill that this report covers (such as `Purchase`). |
| aws_cost_type | The type of charge covering the line item (such as `SavingsPlanCoveredUsage`). |
| aws_discount_lease_term | The length of time that a Reserved instance is reserved for. |
| aws_discount_purchase_option | How you chose to pay for a reservation (such as `All Upfront`). |
| aws_ec2_compute_product_family | The type of usage for an EC2 Compute line item (such as `BoxUsage` or `SpotUsage`). |
| aws_instance_family | The family an instance type belongs to (such as `Compute Optimized`). |
| aws_instance_type | The instance type of the line item. |
| aws_management_account_id | The ID of the billing/payer account associated with the line item. |
| aws_management_account_name | The name of the billing/payer account associated with the line item. |
| aws_member_account_id | The ID of the account associated with the line item. |
| aws_member_account_name | The name of the account associated with the line item. |
| aws_operation | The specific operation covered by the line item (such as `RunInstances`). |
| aws_pricing_term | The method of purchase for the line item (such as `Spot`). |
| aws_pricing_usage_unit | The pricing unit that AWS used for calculating the usage cost (such as `Hours`). |
| aws_product | The product name associated with the line item (such as `ec2`). |
| aws_product_family | The type of product associated with the line item (such as `Compute Instance` for EC2). |
| aws_region | The AWS region hosting the resource (such as `us-east-1`). |
| aws_reservation_arn | The ARN of the RI covering the line item. |
| aws_reservation_modification_status | Indicates whether the RI lease was modified or unaltered (such as `Manual`). |
| aws_resource_id | The individual resource ID associated with the line item, like an EC2 instance ID or an S3 bucket. |
| aws_savings_plan_arn | The ARN of the Savings Plan covering the line item. |
| aws_usage_type | The usage details of the line item (such as `USW2-BoxUsage:m2.2xlarge`). |
| bill/billing_entity | The AWS seller that your account is with. Transactions can either be an AWS Marketplace purchase (`AWS Marketplace`) or a purchase of other AWS services (`AWS`). |
| bill/bill_type | The type of bill that this report covers (such as `Purchase`). |
| bill/invoicing_entity | The AWS entity that issues the invoice. |
| bill/payer_account_id | The account ID of the paying account. For an organization in AWS Organizations, this is the account ID of the management account. |
| is_aws_ec2_compute | true for line items that represent EC2 Compute usage. |
| is_aws_ec2_compute_on_demand | true for line items that represent EC2 Compute usage, paid for On-Demand. |
| is_aws_ec2_compute_reservation | true for line items that represent EC2 Compute usage, paid for using a Reservation. |
| is_aws_ec2_compute_savings_plan | true for line items that represent EC2 Compute usage, paid for using a Savings Plan. |
| is_aws_ec2_spot_instance | true for line items that represent EC2 Compute usage, on Spot instances. |
| line_item/availability_zone | The Availability Zone that hosts the line item. |
| line_item/currency_code | The currency that this line item is shown in (USD by default). |
| line_item/legal_entity | The provider of your AWS services. |
| line_item/line_item_type | The type of charge covered by the line item (such as `Credit`). |
| line_item/operation | The specific AWS operation covered by the line item (such as `RunInstances`). |
| line_item/product_code | The code of the product measured (such as `Amazon EC2` for Amazon Elastic Cloud Compute). |
| line_item/resource_id | The individual resource ID associated with the line item (Optional). |
| line_item/tax_type | The type of tax that AWS applied to the line item. |
| line_item/usage_account_id | The ID of the account that used the line item. |
| line_item/usage_type | The usage details of the line item (such as `USW2-BoxUsage:m2.2xlarge`). |
| pricing/lease_contract_length | The length of time that the RI is reserved for. |
| pricing/purchase_option | How you chose to pay for the line item (such as `All Upfront`). |
| pricing/term | Whether your AWS usage is `Reserved` or `On-Demand`. |
| pricing/unit | The pricing unit that AWS used for calculating the usage cost (such as `Hours`). |
| reservation/availability_zone | The Availability Zone of the resource associated with the line item (such as `us-east-1`). |
| reservation/modification_status | Shows whether the RI lease was modified or unaltered (such as `Manual`). |
| reservation/reservation_arn | The ARN of the RI that the line item benefitted from. |
| reservation/subscription_id | The unique ID that maps the line item with the associated offer. |
| savings_plan/instance_type_family | The instance family that is associated with the specified usage (such as `m4`). |
| savings_plan/offering_type | The type of Savings Plan purchased (such as `ComputeSavingsPlans`). |
| savings_plan/payment_option | The payment options available for the Savings Plan (such as `All Upfront`). |
| savings_plan/purchase_term | Describes the duration or term of the Savings Plan (such as `1yr`). |
| savings_plan/region | The AWS Region that hosts the AWS services (such as `US East (N. Virginia)`). |
| savings_plan/savings_plan_arn | The unique Savings Plan identifier. |

{{% /tab %}}
{{% tab "Azure" %}}

| Tag Name | Tag Description |
|---|---|
| accountname | The name of the account associated with the line item. |
| accountownerid | The ID of the owner associated with the line item. |
| billingaccountid | The ID of the billing account associated with the line item. |
| billingaccountname | The name of the billing account associated with the line item. |
| billingcurrency | The currency associated with the billing account. |
| billingperiod | The billing period of the charge. |
| billingperiodenddate | The end date of the billing period. |
| billingperiodstartdate | The start date of the billing period. |
| billingprofileid | The unique identifier of the Enterprise Agreement enrollment. |
| billingprofilename | The name of the Enterprise Agreement enrollment. |
| chargetype | The type of charge covering the line item: `Usage`, `Purchase`, or `Refund`. |
| consumedservice | The name of the service the line item is associated with. |
| costcenter | The cost center defined for the subscription for tracking costs. |
| costinbillingcurrency | The cost in the billing currency before credits or taxes. |
| costinpricingcurrency | The cost in the pricing currency before credits or taxes. |
| currency | The currency associated with the billing account. |
| date | The usage or purchase date of the charge. |
| effectiveprice | The blended unit price for the period. Blended prices average out any fluctuations in the unit price, like graduated tiering, which lowers the price as quantity increases. |
| exchangeratedate | The date the exchange rate was established. |
| exchangeratepricingtobilling | The exchange rate used to convert the cost in the pricing currency to the billing currency. |
| frequency | Indicates whether a charge is expected to repeat. Charges can either happen once (`OneTime`), repeat on a monthly or yearly basis (`Recurring`), or be based on usage (`Usage`) |
| InvoiceId | The unique document ID listed on the invoice PDF. |
| invoicesectionid | The ID of the MCA invoice section. |
| invoicesectionname | The name of the EA department. |
| isazurecrediteligible | true if the charge is eligible to be paid for using Azure credits. |
| location | The data center location where the resource is running. |
| metercategory | The top level service that this usage belongs to (such as `Networking`). |
| meterid | The unique ID for the meter. |
| metername | The usage details of the line item (such as `L8s v2` or `General Purpose Data Stored`). |
| meterregion | The data center location for the services priced based on location (such as `West US 2`). Use `resourcelocation` to see location data without N/A. |
| metersubcategory | The name of the meter subclassification category (such as `General Purpose - Storage`). Use `metername` or `metercategory` to see top-level classification without N/A. |
| offerid | The name of the offer purchased. |
| partnumber | The ID used to get specific meter pricing. |
| planname | The marketplace plan name if purchased through marketplace. |
| PreviousInvoiceId | Reference to an original invoice if this line item is a refund. |
| PricingCurrency | The currency used when rating based on negotiated prices. |
| pricingmodel | The type of usage (such as `Reservation`). |
| ProductId |  |
| productname | The name of the Azure product at a granular level, such as VM or disk type and region. |
| productorderid | The ID for the product order. Use `productname` to see top level product information without N/A. |
| productordername | The name of the product order. Use `productname` to see top level product information without N/A. |
| publishername | The publisher for marketplace services. |
| publishertype | The type of publisher: `Microsoft` for Microsoft Customer Agreement accounts and `Azure` for Enterprise Agreement accounts. |
| reservationid | The ID for the purchased reservation instance. If you see N/A values, these are `OnDemand` resources, which can be checked using the pricingmodel tag. |
| reservationname | The name of the purchased reservation instance. If you see N/A values, these are `OnDemand` resources, which can be checked using the pricingmodel tag. |
| resourcegroup | The name of the resource group the resource is in. Not all charges come from resources deployed to resource groups. |
| resourceid | The ID of the Azure resource. |
| resourcelocation | The data center location where the resource is running (such as `westus2`). |
| resourcename | The name of the resource. Not all charges come from deployed resources. |
| ResourceType |  |
| servicefamily | The service family that the service belongs to (such as `Compute`). Tag `consumedservice` has deeper insights on infrastructure types. |
| ServicePeriodEndDate |  |
| ServicePeriodStartDate |  |
| subscriptionid | The ID for the Azure subscription. |
| subscriptionname | The name for the Azure subscription. |
| term | Describes the duration or term of the Savings Plan in months (such as `12`). |
| unitofmeasure | The unit of measure for billing for the service. For example, compute services are billed per hour. |

{{% /tab %}}
{{% tab "Google Cloud" %}}

| Tag Name | Tag Description |
|---|---|
| service_description | The Google Cloud service (such as Compute Engine or BigQuery) |
| project_id | The ID of the Google Cloud project that generated the Cloud Billing data. |
| project_name | The name of the Google Cloud project that generated the Cloud Billing data. |
| cost_type | The type of cost this line item represents: regular, tax, adjustment, or rounding error. |
| sku_description | A description of the resource type used, describing the usage details of the resource. |
| resource_name | A name customers add to resources. This may not be on all resources. |
| global_resource_name | A globally unique resource identifier generated by Google Cloud. |

{{% /tab %}}
{{% tab "Shared" %}}

| Tag Name | Tag Description |
|---|---|
| allocated_resource | The type of resource used by a container workload (such as `cpu` or `mem`). |
| allocated_spend_type | Container costs are split into three spend types: resources used by a workload (`usage`); resources reserved by a workload, but not used (`workload_idle`); and resources that are not reserved or used by any workload (`cluster_idle`). |
| ecs_cluster_name | The name of the ECS cluster hosting a workload. |
| kube_cluster_name | The name of the Kubernetes cluster hosting a workload. |
| orchestrator | The container orchestrator (such as `kubernetes` or `ecs`). |

{{% /tab %}}
{{< /tabs >}}

## Use cloud cost data

Visualize infrastructure spend alongside related utilization metrics to spot potential inefficiencies and savings opportunities.

When creating a dashboard, select **Cloud Cost** as the data source for your search query.

{{< img src="cloud_cost/cloud_cost_data_source.png" alt="Cloud Cost available as a data source in dashboard widget creation" style="width:100%;" >}}

Optionally, you can programmatically export a timeseries graph of your cloud cost data by using the [Metrics API][2].

## Create tag rules

Use [Tag Pipelines][5] to ensure comprehensive cost tracking by standardizing the tags across all cloud resources. This prevents any cost data from being overlooked. 

{{< img src="cloud_cost/tags_addnew.png" alt="Create a tag rule in Tag Pipelines to ensure your cloud resources use standard tags" style="width:60%;" >}}

You can create tag rules to correct missing or incorrect tags and add inferred tags that align with your organization's business logic.

## Create a cost monitor

Proactively manage and optimize your cloud spending by creating a [Cloud Cost Monitor][3]. You can choose **Cost Changes** or **Cost Threshold** to monitor your cloud expenses.

{{< img src="cloud_cost/monitor.png" alt="Create a Cloud Cost monitor that alerts on cost changes" style="width:100%;" >}}

## Allocate costs

Use [Container Cost Allocation metrics][4] to discover costs associated with clusters and workloads across Kubernetes, AWS ECS, Azure, and Google Cloud. Gain visibility into pod-level costs, identify idle resource costs, and analyze costs by resource type.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/analytics
[2]: /api/latest/metrics/#query-timeseries-data-across-multiple-products
[3]: /monitors/types/cloud_cost/
[4]: /cloud_cost_management/container_cost_allocation
[5]: /cloud_cost_management/tag_pipelines