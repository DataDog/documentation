---
further_reading:
- link: /cloud_cost_management/
  tag: ドキュメント
  text: Cloud Cost Management
- link: /cloud_cost_management/aws
  tag: ドキュメント
  text: AWS の請求に関する洞察を得る
- link: /cloud_cost_management/google_cloud
  tag: ドキュメント
  text: Google Cloud の請求に関する洞察を得る
title: Azure
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では Cloud Cost Management はサポートされていません。</div>
{{< /site-region >}}

## 概要

To use Azure Cloud Cost Management in Datadog, you must set up the Datadog Azure integration and set up **amortized** and **actual** exports in Azure. Additionally, Datadog must have permissions to read the exports from the container.

Datadog provides cost visibility on a Subscription, Resource Group, and Billing Account Level. Microsoft Customer Agreements (MCA) can only set up at the Subscription level. Pay as you go (PAYG) and CSP accounts are not supported.

## セットアップ


{{% site-region region="us3" %}}
**注**:
- If you are using Datadog's **US3** site, you may have set up the Datadog Azure Native integration using the recommended [Datadog Resource method][1] through the Azure Portal. To support Cloud Cost Management, you need to [create an App Registration][2].
- Microsoft Customer Agreement のエクスポートは、サブスクリプションレベルで構成する必要があります。Enterprise プランの場合は、すべてのサブスクリプションにオンボードするように請求アカウントを構成できます。
- 従量課金制のアカウントには対応していません。

[1]: https://www.datadoghq.com/blog/azure-datadog-partnership/
[2]: /ja/integrations/azure/?tab=azurecliv20#setup
{{% /site-region %}}

### Configure the Azure integration
Navigate to [Setup & Configuration][3] and select an Azure account from the menu to pull costs from. If you do not see your Azure account in the list, view your [Azure integration][4] to add your account.

### コストエクスポートの生成

You need to generate exports for two data types: **actual** and **amortized**. Datadog recommends using the same storage container for both exports.

1. Azure ポータルの *Cost Management + Billing* の下にある [Exports][5] に移動します。
2. エクスポートのスコープを選択します。**注:** スコープは *billing account*、*subscription* または *resource group* でなければなりません。
3. スコープを選択したら、**Add** をクリックします。

   {{< img src="cloud_cost/exports_scope.png" alt="In Azure portal highlighting Exports option in navigation and the export scope" style="width:100%" >}}

   The [improved exports experience][8] is in Preview and may not be available for all customers.

   {{< tabs >}}
   {{% tab "Regular exports" %}}

4. 次のエクスポートの詳細を選択します。
    - Metric: **Actual Cost (usage and purchases)** THEN **Amortized Cost (usage and purchases)**
    - Export type: **Daily export of month-to-date costs**
    - File Partitioning: `On`

   {{< img src="cloud_cost/new_export.png" alt="Export details with Metric: Actual, Export type: Daily, and File Partitioning: On" style="width:100%" >}}

5. Choose a storage account, container, and directory for the exports.
    - **Note:** Do not use special characters like `.` in these fields.
    - **Note:** Billing exports can be stored in any subscription. If you are creating exports for multiple subscriptions, Datadog recommends storing them in the same storage account. Export names must be unique.
6. **Create** を選択します。

   {{% /tab %}}

   {{% tab "Improved exports (Preview)" %}}

4. 次のエクスポートの詳細を選択します。
    - Metric: **Actual Cost (usage and purchases)** THEN **Amortized Cost (usage and purchases)**
    - Frequency: **Daily export of month-to-date costs**
    - Dataset version:
      - Supported versions: `2021-10-01`, `2021-01-01`, `2020-01-01`
      - Unsupported versions: `2019-10-01`

   {{< img src="cloud_cost/improved_export.png" alt="Export details with Metric: Actual, Export type: Daily, and Dataset Version" style="width:100%" >}}

5. In the destination tab, select the following details:
    - Choose a storage account, container, and directory for the exports.
        - **Note:** Do not use special characters like `.` in these fields.
        - **Note:** Billing exports can be stored in any subscription. If you are creating exports for multiple subscriptions, Datadog recommends storing them in the same storage account. Export names must be unique.
    - File partitioning: `Checked`
    - Overwrite Data: `Unchecked`

   {{< img src="cloud_cost/export_destination.png" alt="Export Destination with File partitioning and Overwrite data settings" >}}

6. Click **Next** and **Review + Create**.

   {{% /tab %}}
   {{< /tabs >}}

For faster processing, generate the first exports manually by clicking **Run Now**.

{{< img src="cloud_cost/run_now.png" alt="Click Run Now button in export side panel to generate exports" style="width:50%" >}}

### Datadog がエクスポートにアクセスできるようにする

{{< tabs >}}
{{% tab "Billing Accounts" %}}
**Note**: For Microsoft Customer Agreement, set up at the subscription level.

1. Exports タブで、エクスポートの Storage Account をクリックし、移動します。
2. Containers タブをクリックします。
3. 請求書の入っているストレージコンテナを選びます。
4. Access Control (IAM) タブを選択し、**Add** をクリックします。
5. **Add role assignment** を選択します。
6. **Storage Blob Data Reader** を選択し、Next をクリックします。
7. これらの権限を、Datadog と接続した App Registration のいずれかに割り当てます。
    - **Select members** をクリックし、App Registration の名前を選んで、**Select** をクリックします。
    - *review + assign* を選択します。

If your exports are in different storage containers, repeat steps one to seven for the other storage container.
{{% /tab %}}

{{% tab "Subscriptions & Resource Groups" %}}

1. Exports タブで、エクスポートの Storage Account をクリックし、移動します。
2. Containers タブをクリックします。
3. 請求書の入っているストレージコンテナを選びます。
4. Access Control (IAM) タブを選択し、**Add** をクリックします。
5. **Add role assignment** を選択します。
6. **Storage Blob Data Reader** を選択し、Next をクリックします。
7. これらの権限を、Datadog と接続した App Registration のいずれかに割り当てます。
    - **Select members** をクリックし、App Registration の名前を選んで、**Select** をクリックします。
    - *review + assign* を選択します。

エクスポートが別のコンテナに入っている場合は、他のコンテナについて手順 1〜7 を繰り返します。

### コストマネジメントリーダーへのアクセス構成
**注:** スコープが **Billing Account** の場合、このアクセスは構成する必要はありません。

1. Navigate to your [subscriptions][1] and click your subscription's name.
2. Access Control (IAM) タブを選択します。
3. **Add** をクリックし、次に **Add role assignment** をクリックします。
4. **Cost Management Reader** を選択し、Next をクリックします。
5. Assign these permissions to the app registration.

This ensures complete cost accuracy by allowing periodic cost calculations against Microsoft Cost Management.

[1]: https://portal.azure.com/#view/Microsoft_Azure_Billing/SubscriptionsBlade

{{% /tab %}}
{{< /tabs >}}

### Datadog でクラウドコストを構成する
Navigate to [Setup & Configuration][3] and follow the steps.

### コストタイプ

インジェストしたデータは、以下のコストタイプで視覚化することができます。

| コストタイプ            | 説明           |
| -------------------- | --------------------- |
| `azure.cost.amortized` | 適用される割引率に基づくコストと、割引期間中の使用量に応じたプリペイドの配分 (発生主義)。|
| `azure.cost.actual` | コストは、使用時に請求される金額で表示されます (現金主義)。実際のコストには、プライベート割引、リザーブドインスタンスやセービングプランの割引が別の料金タイプとして含まれています。|
| `azure.cost.discounted.ondemand` | Cost based on the list rate provided by Azure, after privately negotiated discounts. To get the true on-demand cost, divide this metric by (1 - <negotiated_discount>). For example if you have a 5% flat rate discount across all Azure products, taking this metric and dividing by .95 (1-.05) provides the true on-demand price.|

### すぐに使えるタグ

Datadog adds out-of-the-box tags to ingested cost data to help you further break down and allocate your costs. These tags are derived from your [usage cost report][9] and make it easier to discover and understand cost data.

| タグ名                         | タグの説明       |
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
| ResourceType |  |
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


### Getting historical data

You can create historical data in your storage account using the [Microsoft API][6] or by creating a [support ticket with Microsoft][7] to have them backfill cost data. Cloud Cost Management automatically pulls in up to 15 months of historical data as long as the file structure and partitioning follows the format of scheduled exports.

## 参考資料
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/blog/azure-datadog-partnership/
[2]: https://docs.datadoghq.com/ja/integrations/azure/?tab=azurecliv20#setup
[3]: https://app.datadoghq.com/cost/setup?cloud=azure
[4]: https://app.datadoghq.com/integrations/azure
[5]: https://portal.azure.com/#view/Microsoft_Azure_GTM/ModernBillingMenuBlade/~/Exports
[6]: https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-export-acm-data?tabs=azure-cli
[7]: https://support.microsoft.com
[8]: https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-improved-exports
[9]: https://learn.microsoft.com/en-us/azure/cost-management-billing/understand/download-azure-daily-usage