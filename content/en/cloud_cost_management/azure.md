---
title: Azure
kind: documentation
disable_toc: false
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Cloud Cost Management"
- link: "/cloud_cost_management/aws"
  tag: "Documentation"
  text: "Gain insights in your AWS bill"
---

## Overview

To use Azure Cloud Cost Management in Datadog, you must set up the Datadog Azure integration and set up **amortized** and **actual** exports in Azure. Additionally, Datadog must have permissions to read the exports from the container.

Datadog provides cost visibility on a Subscription, Resource Group, and Billing Account Level. Microsoft Customer Agreements (MCA) can only set up at the Subscription level. Pay as you go accounts are not supported.

## Setup


{{% site-region region="us3" %}}
**Notes**:
- If you are using Datadog's **US3** site, you may have set up the Datadog Azure Native integration using the recommended [Datadog Resource method][1] through the Azure Portal. To support Cloud Cost Management, you need to [create an App Registration][2].
- Microsoft Customer Agreement exports must be configured at the subscription level. If you have an Enterprise plan, you can configure your billing accounts to onboard all subscriptions.
- Pay-as-you-go accounts are not supported.

[1]: https://www.datadoghq.com/blog/azure-datadog-partnership/
[2]: /integrations/azure/?tab=azurecliv20#setup
{{% /site-region %}}

### Configure the Azure integration
Navigate to [Setup & Configuration][3] and select an Azure account from the menu to pull costs from. If you do not see your Azure account in the list, view your [Azure integration][4] to add your account.

### Generate cost exports

You need to generate exports for two data types: **actual** and **amortized**. Datadog recommends using the same storage container for both exports.

1. Navigate to [Exports][5] under Azure portal's *Cost Management + Billing*.
2. Select the export scope. **Note:** The scope must be *billing account*, *subscription*, or *resource group*.
3. After the scope is selected, click **Add**.

{{< img src="cloud_cost/exports_scope.png" alt="In Azure portal highlighting Exports option in navigation and the export scope" >}}

4. Select the following Export details:
    - Metric: **Actual Cost (usage and purchases)** THEN  **Amortized Cost (usage and purchases)**
    - Export type: **Daily export of month-to-date costs**
    - File Partitioning: `On`

{{< img src="cloud_cost/new_export.png" alt="Export details with Metric: Actual, Export type: Daily, and File Partitioning: On" >}}

5. Choose a storage account, container, and directory for the exports.
    - **Note:** Do not use special characters like `.` in these fields.
    - **Note:** Billing exports can be stored in any subscription. If you are creating exports for multiple subscriptions, Datadog recommends storing them in the same storage account. Export names must be unique.
7. Select **Create**.

For faster processing, generate the first exports manually by clicking **Run Now**.
{{< img src="cloud_cost/run_now.png" alt="Click Run Now button in export side panel to generate exports" >}}

### Provide Datadog access to your exports

{{< tabs >}}
{{% tab "Billing Accounts" %}}
**Note**: For Microsoft Customer Agreement, set up at the subscription level.

1. In the Exports tab, click on the export's Storage Account to navigate to it.
2. Click the Containers tab.
3. Choose the storage container your bills are in.
4. Select the Access Control (IAM) tab, and click **Add**.
5. Choose **Add role assignment**.
6. Choose **Storage Blob Data Reader**, then click Next.
7. Assign these permissions to one of the App Registrations you have connected with Datadog.
    - Click **Select members**, pick the name of the App Registration, and click **Select**.
    - Select *review + assign*.

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
    - Select *review + assign*.

If your exports are in different storage containers, repeat steps one to seven for the other storage container.

### Configure Cost Management Reader access
**Note:** You do not need to configure this access if your scope is **Billing Account**.

1. Navigate to your [subscriptions][1] and click your subscription's name.
2. Select the Access Control (IAM) tab.
3. Click **Add**, then **Add role assignment**.
4. Choose **Cost Management Reader**, then click Next.
5. Assign these permissions to the app registration.

This ensures complete cost accuracy by allowing periodic cost calculations against Microsoft Cost Management.

[1]: https://portal.azure.com/#view/Microsoft_Azure_Billing/SubscriptionsBlade

{{% /tab %}}
{{< /tabs >}}

### Configure Cloud Costs in Datadog
Navigate to [Setup & Configuration][3] and follow the steps.

### Cost types

You can visualize your ingested data using the following cost types:

| Cost Type            | Description           |
| -------------------- | --------------------- |
| `azure.cost.amortized` | Cost based on applied discount rates plus the distribution of pre-payments across usage for the discount term (accrual basis).|
| `azure.cost.actual` | Cost shown as the amount charged at the time of usage (cash basis). Actual costs include private discounts as well as discounts from reserved instances and savings plans as separate charge types.|

### Getting historical data

You can create historical data in your storage account using the [Microsoft API][6] or by creating a [support ticket with Microsoft][7] to have them backfill cost data. Cloud Cost Management automatically pulls in up to 15 months of historical data as long as the file structure and partitioning follows the format of scheduled exports.

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/blog/azure-datadog-partnership/
[2]: https://docs.datadoghq.com/integrations/azure/?tab=azurecliv20#setup
[3]: https://app.datadoghq.com/cost/setup?cloud=azure
[4]: https://app.datadoghq.com/integrations/azure
[5]: https://portal.azure.com/#view/Microsoft_Azure_GTM/ModernBillingMenuBlade/~/Exports
[6]: https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-export-acm-data?tabs=azure-cli
[7]: https://support.microsoft.com
