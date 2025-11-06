---
title: Azure
aliases:
- /cloud_cost_management/azure/
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Cloud Cost Management"
- link: "/cloud_cost_management/setup/aws"
  tag: "Documentation"
  text: "Gain insights into your AWS bill"
- link: "/cloud_cost_management/setup/google_cloud"
  tag: "Documentation"
  text: "Gain insights into your Google Cloud bill"
- link: "/cloud_cost_management/oracle"
  tag: "Documentation"
  text: "Gain insights into your Oracle bill"
---


## Overview

To use Azure Cloud Cost Management in Datadog, you must configure the Datadog Azure integration and create **amortized** and **actual** exports in Azure. Additionally, Datadog must have permissions to read the exports from the container.

Datadog provides cost visibility on a Subscription, Resource Group, and Billing Account Level. Microsoft Customer Agreements (MCA) can be set up at all three scopes. Pay as you go (PAYG) accounts are in Preview. Contact [Datadog support][11] if you encounter any issues with setup. 

To determine your account type, see the [Azure documentation][10]. **Note:** If your account type is listed as "Microsoft Online Services Program", then your account is PAYG.

## Setup


{{% site-region region="us3" %}}
**Note**: If you are using Datadog's **US3** site, you may have set up the Datadog Azure Native integration using the [Datadog Resource method][1] through the Azure Portal. To support Cloud Cost Management, you need to [create an app registration][2].


[1]: https://www.datadoghq.com/blog/azure-datadog-partnership/
[2]: /integrations/azure/?tab=azurecliv20#setup
{{% /site-region %}}

### Configure the Azure integration
Navigate to [Setup & Configuration][3] and select an Azure account from the menu to pull costs from. If you do not see your Azure account in the list, view your [Azure integration][4] to add your account.

### Generate cost exports

You need to generate exports for two data types: **actual** and **amortized**. Datadog recommends using the same storage container for both exports.

1. Navigate to [Cost Management | Configuration][5] under Azure portal's **Tools** > **Cost Management** > **Settings** > **Configuration** and click **Exports**.
  {{< img src="cloud_cost/azure_export_path.png" alt="In Azure portal highlighting Exports option in navigation" style="width:100%" >}}
2. Select the export scope located next to the search filter.

   **Note:** The scope must be **billing account**, **subscription**, or **resource group**.
3. After the scope is selected, click **Schedule export**.

   {{< img src="cloud_cost/azure_exports_page.png" alt="In Azure portal highlighting the export scope and schedule button" style="width:100%" >}}

4. Select the **Cost and usage (actual + amortized)** template
    {{< img src="cloud_cost/azure_new_export.png" alt="New export page with template and manual options highlighted" style="width:100%" >}}

5. Click **Edit** on each export and confirm the following details:
    - Frequency: **Daily export of month-to-date costs**
    - Dataset version:
      - Supported versions: `2021-10-01`, `2021-01-01`, `2020-01-01`
      - Unsupported versions: `2019-10-01`
    {{< img src="cloud_cost/improved_export.png" alt="Export details with Metric: Actual, Export type: Daily, and Dataset Version" style="width:100%" >}}

6. Enter an "Export prefix" for the new exports. For example, enter `datadog` to avoid conflicts with existing exports.

7. In the **Destination** tab, select the following details:
    - Choose **Azure blob storage** as the storage type.
    - Choose a storage account, container, and directory for the exports.
        - **Note:** Do not use special characters like `.` in these fields.
        - **Note:** Billing exports can be stored in any subscription. If you are creating exports for multiple subscriptions, Datadog recommends storing them in the same storage account. Export names must be unique.
    - Choose **CSV** or **Parquet** as the format.
    - Choose the compression type. For **CSV**: **Gzip** and **None** are supported. For **Parquet**: **Snappy** and **None** are supported.
    - Ensure that **File partitioning** is checked.
    - Ensure that **Overwrite data** is not checked.
        - **Note:** Datadog does not support the Overwrite Data setting. If the setting was previously checked, make sure to clean the files in the directory or move them to another one.

   {{< img src="cloud_cost/improved_export_destination_2.png" alt="Export Destination with File partitioning and Overwrite data settings" >}}

8. On the **Review + create** tab, select **Create**.
9. For faster processing, generate the first exports manually by clicking **Run Now**.

{{< img src="cloud_cost/run_now.png" alt="Click Run Now button in export side panel to generate exports" style="width:50%" >}}

### Provide Datadog access to your exports

{{< tabs >}}
{{% tab "Billing Accounts" %}}

1. In the Exports tab, click on the export's Storage Account to navigate to it.
2. Click the Containers tab.
3. Choose the storage container your bills are in.
4. Select the Access Control (IAM) tab, and click **Add**.
5. Choose **Add role assignment**.
6. Choose **Storage Blob Data Reader**, then click Next.
7. Assign these permissions to one of the App Registrations you have connected with Datadog.
    - Click **Select members**, pick the name of the App Registration, and click **Select**. **Note**: If you do not see your App Registration listed, start typing the name for the UI to update and show it, if it is available.
    - Select **Review + assign**.

If your exports are in different storage containers, repeat steps one to seven for the other storage container.
{{% /tab %}}

{{% tab "Subscriptions & Resource Groups" %}}

1. In the Exports tab, click on the export's Storage Account to navigate to it.
2. Click the Containers tab.
3. Choose the storage container your bills are in.
4. Select the Access Control (IAM) tab, and click **Add**.
5. Choose **Add role assignment**.
6. Choose **Storage Blob Data Reader**, then click Next.
7. Assign these permissions to one of the App Registrations you have connected with Datadog.
    - Click **Select members**, pick the name of the App Registration, and click **Select**.
    - Select **Review + assign**.

If your exports are in different storage containers, repeat steps one to seven for the other storage container.

### Configure Cost Management Reader access
**Note:** You do not need to configure this access if your scope is **Billing Account**.

1. Navigate to your [subscriptions][1] and click your subscription's name.
2. Select the Access Control (IAM) tab.
3. Click **Add**, then **Add role assignment**.
4. Choose **Cost Management Reader**, then click Next.
5. Assign these permissions to the app registration.

This ensures complete cost accuracy by allowing periodic cost calculations against Microsoft Cost Management.

**Note**: Data can take up to 48 to 72 hours after setup to stabilize in Datadog.

[1]: https://portal.azure.com/#view/Microsoft_Azure_Billing/SubscriptionsBlade

{{% /tab %}}
{{< /tabs >}}

**Note**: If you have the proper permissions on the app registration but your network is blocking Datadog's webhook IPs, you may encounter errors that appear to be permission-related.

To resolve this, add Datadog's webhook IPs to your network allowlist by visiting the `Webhooks` section at `https://ip-ranges.`{{< region-param key="dd_site" code="true" >}}.

### Configure Cloud Cost in Datadog
Navigate to [Setup & Configuration][3] and follow the steps.

### Getting historical data

Azure exports cost data starting from the month you created the export. Datadog automatically ingests up to 15 months of available historical cost data from these exports. You can manually backfill up to 12 months of Azure cost data using the Azure Cost Exports UI.

1. Complete the instructions in the **Setup** and **Configure Cloud Cost in Datadog** sections above.
1. Wait up to 24 hours for cost data to appear in Datadog to ensure the integration is working end-to-end before beginning the backfill process. **Note:** If you have already completed setup, and cost data is appearing in Datadog, you can proceed directly to the backfill steps below.
1. Manually export an **actual** and **amortized** report for each calendar month. For example, for June 2025:
    1. Edit the Export
    2. Change Export Type to "One-time export"
    3. Set From to 06-01-2025 **Note:** This must be the first day of the month.
    4. Set End to 06-30-2025 **Note:** This must be the last day of the month.
    5. Save the export **Note:** This automatically runs the export
    6. Wait for the export to finish running
1. Revert both the **actual** and **amortized** exports to their original state to resume daily exports:
    1. Edit the Export
    2. Change Export Type to "Daily export of month-to-date costs"
    3. Save the export

Datadog automatically discovers and ingests this data, and it should appear in Datadog within 24 hours.

You can also create historical data in your storage account using the [Microsoft API][6] or by creating a [support ticket with Microsoft][7]. Ensure the file structure and partitioning follows the format of scheduled exports.

### Cost types

You can visualize your ingested data using the following cost types:

| Cost Type            | Description           |
| -------------------- | --------------------- |
| `azure.cost.amortized` | Cost based on applied discount rates plus the distribution of pre-payments across usage for the discount term (accrual basis).|
| `azure.cost.actual` | Cost shown as the amount charged at the time of usage (cash basis). Actual costs include private discounts as well as discounts from reserved instances and savings plans as separate charge types.|
| `azure.cost.discounted.ondemand` | Cost based on the list rate provided by Azure, after privately negotiated discounts. To get the true on-demand cost, divide this metric by (1 - <negotiated_discount>). For example if you have a 5% flat rate discount across all Azure products, taking this metric and dividing by .95 (1-.05) provides the true on-demand price.|

### Out-of-the-box tags

Datadog automatically enriches your Azure cost data with tags from multiple sources. For a comprehensive overview of how tags are applied to cost data, see [Tags][12].

The following out-of-the-box tags are derived from your [usage cost report][9] and make it easier to discover and understand cost data:

| Tag Name                         | Tag Description       |
| ---------------------------- | ----------------- |
| `accountname` | The name of the account associated with the line item. |
| `accountownerid` | The ID of the owner associated with the line item. |
| `billingaccountid` | The ID of the billing account associated with the line item. |
| `billingaccountname` | The name of the billing account associated with the line item. |
| `billingcurrency` | The currency associated with the billing account. |
| `billingperiod` | The billing period of the charge. |
| `billingperiodenddate` | The end date of the billing period. |
| `billingperiodstartdate` | The start date of the billing period. |
| `billingprofileid` | The unique identifier of the Enterprise Agreement enrollment. |
| `billingprofilename` | The name of the Enterprise Agreement enrollment. |
| `chargetype` | The type of charge covering the line item: `Usage`, `Purchase`, or `Refund`. |
| `consumedservice` | The name of the service the line item is associated with. |
| `costcenter` | The cost center defined for the subscription for tracking costs. |
| `costinbillingcurrency` | The cost in the billing currency before credits or taxes. |
| `costinpricingcurrency` | The cost in the pricing currency before credits or taxes. |
| `currency` | The currency associated with the billing account. |
| `date` | The usage or purchase date of the charge. |
| `effectiveprice` | The blended unit price for the period. Blended prices average out any fluctuations in the unit price, like graduated tiering, which lowers the price as quantity increases. |
| `exchangeratedate` | The date the exchange rate was established. |
| `exchangeratepricingtobilling` | The exchange rate used to convert the cost in the pricing currency to the billing currency. |
| `frequency` | Indicates whether a charge is expected to repeat. Charges can either happen once (`OneTime`), repeat on a monthly or yearly basis (`Recurring`), or be based on usage (`Usage`) |
| `InvoiceId` | The unique document ID listed on the invoice PDF. |
| `invoicesectionid` | The ID of the MCA invoice section. |
| `invoicesectionname` | The name of the EA department. |
| `isazurecrediteligible` | `true` if the charge is eligible to be paid for using Azure credits. |
| `location` | The data center location where the resource is running. |
| `metercategory` | The top level service that this usage belongs to (such as `Networking`). |
| `meterid` | The unique ID for the meter. |
| `metername` | The usage details of the line item (such as `L8s v2` or `General Purpose Data Stored`). |
| `meterregion` | The data center location for the services priced based on location (such as `West US 2`). Use `resourcelocation` to see location data without `N/A`. |
| `metersubcategory` | The name of the meter subclassification category (such as `General Purpose - Storage`). Use `metername` or `metercategory` to see top-level classification without `N/A`. |
| `offerid` | The name of the offer purchased. |
| `partnumber` | The ID used to get specific meter pricing. |
| `planname` | The marketplace plan name if purchased through marketplace. |
| `PreviousInvoiceId` | Reference to an original invoice if this line item is a refund. |
| `PricingCurrency` | The currency used when rating based on negotiated prices. |
| `pricingmodel` | The type of usage (such as `Reservation`). |
| `ProductId` | The identifier for a specific Azure product. |
| `productname` | The name of the Azure product at a granular level, such as VM or disk type and region. |
| `productorderid` | The ID for the product order. Use `productname` to see top level product information without `N/A`. |
| `productordername` | The name of the product order. Use `productname` to see top level product information without `N/A`. |
| `publishername` | The publisher for marketplace services. |
| `publishertype` | The type of publisher: `Microsoft` for Microsoft Customer Agreement accounts and `Azure` for Enterprise Agreement accounts. |
| `reservationid` | The ID for the purchased reservation instance. If you see `N/A` values, these are `OnDemand` resources, which can be checked using the `pricingmodel` tag. |
| `reservationname` | The name of the purchased reservation instance. If you see `N/A` values, these are `OnDemand` resources, which can be checked using the `pricingmodel` tag. |
| `resourcegroup` | The name of the resource group the resource is in. Not all charges come from resources deployed to resource groups. |
| `resourceid` | The ID of the Azure resource. |
| `resourcelocation` | The data center location where the resource is running (such as `westus2`). |
| `resourcename` | The name of the resource. Not all charges come from deployed resources. |
| `resourcetype` | The type of the Azure resource. |
| `servicefamily` | The service family that the service belongs to (such as `Compute`). The tag `consumedservice` has deeper insights on infrastructure types. |
| `ServicePeriodEndDate` | The termination date of the Azure service period. |
| `ServicePeriodStartDate` | The start date the Azure service period. |
| `subscriptionid` | The ID of the Azure subscription. |
| `subscriptionname` | The name of the Azure subscription. |
| `term` | Describes the duration or term of the Savings Plan in months (such as `12`). |
| `unitofmeasure` | The unit of measure for billing for the service. For example, compute services are billed per hour. |


#### Cost and observability correlation

Viewing costs in context of observability data is important to understand how infrastructure changes impact costs, identify why costs change, and optimize infrastructure for both costs and performance. Datadog adds the `name` tag on cost data for top Azure products to simplify correlating observability and cost metrics.

For example, to view cost and utilization for each Azure VM, you can make a table with `azure.cost.amortized` and `azure.vm.network_in_total` (or any other VM metric) and group by `name`. Or, to see Storage usage and costs side by side, you can filter into `metercategory:Storage` and graph `azure.storage.transactions` and `azure.cost.amortized` grouped by `name`.

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]:  https://www.datadoghq.com/blog/azure-datadog-partnership/
[2]:  https://docs.datadoghq.com/integrations/azure/?tab=azurecliv20#setup
[3]:  https://app.datadoghq.com/cost/setup?cloud=azure
[4]:  https://app.datadoghq.com/integrations/azure
[5]:  https://portal.azure.com/#view/Microsoft_Azure_CostManagement/Menu/~/config
[6]:  https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-export-acm-data?tabs=azure-cli
[7]:  https://support.microsoft.com
[8]:  https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-improved-exports
[9]:  https://learn.microsoft.com/en-us/azure/cost-management-billing/understand/download-azure-daily-usage
[10]: https://docs.azure.cn/en-us/cost-management-billing/manage/resolve-past-due-balance#check-the-type-of-your-account
[11]: /help/
[12]: /cloud_cost_management/tags
