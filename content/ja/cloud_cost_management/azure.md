---
further_reading:
- link: /cloud_cost_management/
  tag: Documentation
  text: Cloud Cost Management
- link: /cloud_cost_management/aws
  tag: Documentation
  text: Gain insights into your AWS bill
- link: /cloud_cost_management/google_cloud
  tag: Documentation
  text: Gain insights into your Google Cloud bill
title: Azure
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Cloud Cost Management is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
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

{{< img src="cloud_cost/exports_scope.png" alt="Azure ポータルで、ナビゲーションのエクスポートオプションとエクスポートスコープをハイライト表示" >}}

4. 次のエクスポートの詳細を選択します。
    - Metric: **Actual Cost (usage and purchases)** THEN **Amortized Cost (usage and purchases)**
    - Export type: **Daily export of month-to-date costs**
    - File Partitioning: `On`

{{< img src="cloud_cost/new_export.png" alt="Metric: Actual、Export type: Daily、File Partitioning: On のエクスポートの詳細" >}}

At this time, there is no support for creating cost exports using the [improved exports experience][8].
To disable it, open the Cost Management labs [preview features][9], click on "Go to preview portal" and deselect the "Exports (preview)" option. Then proceed to create the two exports within the Preview Portal.

5. Choose a storage account, container, and directory for the exports.
    - **Note:** Do not use special characters like `.` in these fields.
    - **Note:** Billing exports can be stored in any subscription. If you are creating exports for multiple subscriptions, Datadog recommends storing them in the same storage account. Export names must be unique.
7. **Create** を選択します。

For faster processing, generate the first exports manually by clicking **Run Now**.
{{< img src="cloud_cost/run_now.png" alt="Click Run Now button in export side panel to generate exports" >}}

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

### Cost and observability correlation
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
[9]: https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/enable-preview-features-cost-management-labs#explore-preview-features