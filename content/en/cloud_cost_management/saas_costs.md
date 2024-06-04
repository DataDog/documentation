---
title: SaaS Cost Integrations
kind: documentation
is_beta: true
private: true
disable_toc: false
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Cloud Cost Management"
- link: "/cloud_cost_management/aws"
  tag: "Documentation"
  text: "Gain insights into your AWS bill"
- link: "/cloud_cost_management/azure"
  tag: "Documentation"
  text: "Gain insights into your Azure bill"
- link: "/cloud_cost_management/google_cloud"
  tag: "Documentation"
  text: "Gain insights into your Google Cloud bill"
- link: "/cloud_cost_management/custom"
  tag: "Documentation"
  text: "Gain insights into your custom costs"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Cloud Cost Management is not supported for this site.</div>
{{< /site-region >}}

{{< beta-callout url="#" btn_hidden="true" >}}
SaaS Cost Integrations are in public beta.
{{< /beta-callout >}}

## Overview

SaaS Cost Integrations allow you to send cost data **directly from your providers** by configuring the accounts associated with your cloud cost data in Datadog. 

If your provider is not supported, use [Custom Costs][1] to upload any cost data source to Datadog and understand the total cost of your services.

## Setup

To use SaaS Cost Integrations, you must configure [Cloud Cost Management][2] for AWS, Azure, or Google Cloud. 

See the respective documentation for your cloud provider:

{{< partial name="cloud_cost/getting-started.html" >}}

</br>

Navigate to [**Infrastructure > Cloud Costs > Settings > Accounts**][8] and click **Configure** on a provider to collect cost data. 

{{< img src="cloud_cost/saas_costs/all_accounts.png" alt="Add your accounts with AWS, Azure, Google Cloud to collect cost data. You can also add your accounts for Fastly, Snowflake, Confluent Cloud, MongoDB, Databricks, OpenAI, and Twilio" style="width:100%" >}}

{{< tabs >}}
{{% tab "Databricks" %}}

<div class="alert alert-warning">The Databricks SaaS Cost integration is in private beta.</div>

1. Navigate to the [Databricks integration tile][101] in Datadog and click **Add Account**.
2. Enter a `System Tables SQL Warehouse ID` corresponding to your Databricks instance's warehouse to query for system table billing data.
3. Under the **Resources** section, click the toggle for each account to enable `Databricks Cost Data Collection`.
4. Click **Save**.

{{< img src="cloud_cost/saas_costs/databricks_setup.png" alt="Integrate with Databricks to collect cost data." style="width:100%" >}}

Your Databricks cost data for the past 15 months can be accessed in Cloud Cost Management after 24 hours.

[101]: https://app.datadoghq.com/integrations/databricks

{{% /tab %}}
{{% tab "Confluent Cloud" %}}

<div class="alert alert-warning">The Confluent Cloud SaaS Cost integration is in public beta.</div>

1. Create or acquire an API key with the organizational admin role in Confluent Cloud.
2. Navigate to the [Confluent Cloud integration tile][101] in Datadog and click **Add Account**.
3. Enter your Confluent Cloud account name, API key, API secret, and optionally, specify tags.
4. Under the **Additional Options** section, click the toggle for `Collecting Billing Data`.
5. Click **Save**.

{{< img src="cloud_cost/saas_costs/confluent_setup.png" alt="Integrate with Confluent to collect cost data." style="width:100%" >}}

Your Confluent Cloud cost data for the past 15 months can be accessed in Cloud Cost Management after 24 hours.

[101]: https://app.datadoghq.com/integrations/confluent-cloud

{{% /tab %}}
{{% tab "MongoDB" %}}

<div class="alert alert-warning">The MongoDB SaaS Cost integration is in private beta.</div>

1. [Create an API token][101] in MongoDB with `Organization Member` permissions, and add `Organization Read Only` permissions for cluster resource tags.
2. Navigate to the [MongoDB Cost Management integration tile][102] in Datadog and click **Add New**.
3. Enter your MongoDB account name, public key, private key, organizational ID, and optionally, specify tags.
4. Click **Save**.

{{< img src="cloud_cost/saas_costs/mongodb_setup.png" alt="Integrate with MongoDB to collect cost data." style="width:100%" >}}

Your MongoDB cost data for the past 15 months can be accessed in Cloud Cost Management after 24 hours.

[101]: https://www.mongodb.com/docs/cloud-manager/reference/user-roles/#organization-roles
[102]: https://app.datadoghq.com/integrations/mongodb-cost-management

{{% /tab %}}
{{% tab "Snowflake" %}}

<div class="alert alert-warning">The Snowflake SaaS Cost integration is in public beta.</div>

1. Navigate to the [Snowflake integration tile][101] in Datadog and click **Add Snowflake Account**.
2. Enter your Snowflake account URL, for example: `https://xyz12345.us-east-1.snowflakecomputing.com`.
3. Under the **Connect your Snowflake account** section, click the toggle to enable Snowflake in Cloud Cost Management.
4. Enter your Snowflake user name in the `User Name` field.
5. Create a Datadog-specific role and user to monitor Snowflake. 

   Run the following in Snowflake to create a custom role:

   ```shell
   -- Create a new role intended to monitor Snowflake usage.
   create role DATADOG;

   -- Grant privileges on the SNOWFLAKE database to the new role.
   grant imported privileges on database SNOWFLAKE to role DATADOG;

   -- Grant usage to your default warehouse to the role DATADOG.
   grant usage on warehouse <WAREHOUSE> to role DATADOG;

   -- If you have cost usage collection enabled, ensure that your credentials have permission to view the ORGANIZATION_USAGE schema.
   grant role orgadmin to role DATADOG

   -- Create a user.
   create user DATADOG_USER
   LOGIN_NAME = DATADOG_USER
   password = <PASSWORD>
   default_warehouse = <WAREHOUSE>
   default_role = DATADOG

   -- Grant the monitor role to the user.
   grant role DATADOG to user <USER>
   ```

4. Configure the key-value pair authentication:
   
   - Generate a private key by following the [official Snowflake documentation][102] and upload the private key file by clicking **Upload Key**.
   - Generate a public key by following the [official Snowflake documentation][103].
   - Assign the public key to the user created in Step 5 by following the [official Snowflake documentation][104].

5. Click **Save**.

{{< img src="cloud_cost/saas_costs/snowflake_setup.png" alt="Integrate with Snowflake to collect cost data." style="width:100%" >}}

Your Snowflake cost data for the past 15 months can be accessed in Cloud Cost Management after 24 hours.

[101]: https://app.datadoghq.com/integrations/snowflake-web
[102]: https://docs.snowflake.com/en/user-guide/key-pair-auth#generate-the-private-key
[103]: https://docs.snowflake.com/en/user-guide/key-pair-auth#generate-a-public-key
[104]: https://docs.snowflake.com/en/user-guide/key-pair-auth#assign-the-public-key-to-a-snowflake-user

{{% /tab %}}
{{% tab "OpenAI" %}}

<div class="alert alert-warning">The OpenAI SaaS Cost integration is in public beta.</div>

1. [Create an API key][101] in your account settings in OpenAI.
2. Navigate to the [OpenAI integration tile][102] in Datadog and click **Add Account**.
3. Enter your OpenAI account name, input your API key, and optionally, specify tags.
4. Under the **Resources** section, click the toggle for each account to enable `OpenAI Billing Usage Data Collection`.
5. Click **Save**.

{{< img src="cloud_cost/saas_costs/openai_setup.png" alt="Integrate with OpenAI to collect cost data." style="width:100%" >}}

Your OpenAI cost data for the past 15 months can be accessed in Cloud Cost Management after 24 hours.

[101]: https://platform.openai.com/docs/quickstart/account-setup
[102]: https://app.datadoghq.com/integrations/openai

{{% /tab %}}
{{% tab "Fastly" %}}

<div class="alert alert-warning">The Fastly SaaS Cost integration is in public beta.</div>

1. Create an API token with at least the `"global:read"` scope and `"Billing"` role on the [Personal API tokens][101] page in Fastly.
2. Navigate to the [Fastly integration tile][102] in Datadog and click **Add Account**.
3. Enter your Fastly account name and API token. 
4. Click the checkbox for `Collect Billing Data`.
5. Click **Save**.

{{< img src="cloud_cost/saas_costs/fastly_setup.png" alt="Integrate with Fastly to collect cost data." style="width:100%" >}}

Your Fastly cost data for the past 15 months can be accessed in Cloud Cost Management after 24 hours.

[101]: https://manage.fastly.com/account/personal/tokens
[102]: https://app.datadoghq.com/integrations/fastly

{{% /tab %}}
{{% tab "Twilio" %}}

<div class="alert alert-warning">The Twilio SaaS Cost integration is in private beta.</div>

1. Navigate to the [Twilio integration tile][101] in Datadog and click **Add Account**.
2. Under the **Resources** section, click the toggle for each account to enable `Twilio in Cloud Cost Management`.
3. Enter an `Account SID` for your Twilio account.
4. Click **Save**.

{{< img src="cloud_cost/saas_costs/twilio_setup.png" alt="Integrate with Twilio to collect cost data." style="width:100%" >}}

Your Twilio cost data for the past 15 months can be accessed in Cloud Cost Management after 24 hours.

[101]: https://app.datadoghq.com/integrations/twilio

{{% /tab %}}
{{< /tabs >}}

## Data Collected

See the information for the data collected for the AWS, Azure, and Google Cloud integrations, as well as shared data. The table provides insights into the specific tags associated with each integration.

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

For more information about visualizing your cost data using metrics, see the [Custom Costs documentation][9].

## Use SaaS Cost Integration data

You can view cost data on the [**Cloud Costs Analytics** page][3], the [Cloud Costs Tag Explorer][4], and in [dashboards][5], [notebooks][6], or [monitors][7]. You can also combine these cost metrics with other cloud cost metrics or observability metrics.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /cloud_cost_management/custom
[2]: /cloud_cost_management
[3]: https://app.datadoghq.com/cost/analytics
[4]: https://app.datadoghq.com/cost/tags?cloud=custom
[5]: /dashboards
[6]: /notebooks
[7]: /monitors/types/cloud_cost
[8]: https://app.datadoghq.com/cost/settings/accounts
[9]: /cloud_cost_management/custom/?tab=csv#cost-metric-types
