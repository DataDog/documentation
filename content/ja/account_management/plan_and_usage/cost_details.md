---
title: Cost Details
further_reading:
- link: "https://docs.datadoghq.com/account_management/billing/"
  tag: Documentation
  text: Billing
- link: "https://docs.datadoghq.com/account_management/billing/usage_details/"
  tag: Documentation
  text: Usage details
- link: "https://docs.datadoghq.com/account_management/multi_organization/"
  tag: Documentation
  text: Managing multiple-organization accounts
---

## 概要

Cost Summary and Cost Chargebacks help you understand your estimated month-to-date, projected end-of-month, and historical Datadog costs.

下部組織や製品ごとにコストを細分化することで、
- ソースに応じてコストを割り当てることができます
- コストの追跡状況を把握できます

### 権限

To view the Cost Summary and Cost Chargebacks data, you must be a Datadog Admin user.

Alternately, roles with Billing Read (`billing_read`) and Usage Read (`usage_read`) [permissions][1] can view the Cost Summary and Cost Chargebacks data.

## コストサマリー

コストサマリーを使用して
- View estimated month-to-date and projected end-of-month costs
- View historical costs
- 製品または下部組織ごとにフィルターをかけてコストをグループ化します
- View month-over-month % and $ cost changes
- 月内のコスト動向を表示します
- 累積前日比コストを表示します

### Projected Costs (parent organization)

Projected end-of-month costs are calculated by applying the current month's projected usage data against your contracted rates. Projections are available around the 12th of the month and are updated daily. Projected end-of-month costs may change over time, depending on your usage throughout the month. Because the costs are a prediction, the amount may differ from your finalized monthly cost. 

### Cost Summary (parent organization)

The cost summary functionality changes according to your Datadog usage as a single organization or a multi-organization. As a multi-organization, you can view estimated, projected, and historical costs for the parent organization and each sub-organization. 

{{< img src="account_management/plan_and_usage/multiorg-current-month-historical-costs.png" alt="Screenshot of the current month's Cost Summary for a parent organization, showing the overall month-to-date cost, projected cost, a graph with cumulative cost breakdowns, and a summary table including month-over-month cost changes." >}}

View historical costs by toggling to previous months.

{{< img src="account_management/plan_and_usage/multiorg-prior-month-historical-costs.png" alt="Screenshot of a previous month's Cost Summary for a parent organization, showing the overall cost for the month, a graph with cumulative cost breakdowns, and a summary table including month-over-month cost changes." >}}

1. 親組織にログインした状態で、[Plan & Usage][2] に移動します。
1. **Usage** タブをクリックします。
1. 複数組織の場合は、**Overall** タブが選択されていることを確認します。

#### 表示とフィルター

Use the search facets at the left to filter the cost by **Products** or by **Sub-Orgs**. Use the **Daily Cost** tab to see how the cumulative day-over-day costs have changed within the current month.

#### ダウンロード

To download the data as a comma separated value file, click **Download as CSV**. Data is available for the current month and pre-defined prior months. Use the `Cost Type` field to distinguish between the records:
- **Projected**: Data is available for the current month.
- **Estimated MTD**: Data is available from the first of the month to the current date. If historical cost data is not yet available for the prior month, estimated cost data also displays for the prior month.
- **Historical**: Data is available after month close, which is approximately 16 days after the end of the month.

To query estimated cost data through the API, see [Get estimated cost across your account][3]. To query projected cost data through the API, see [Get projected cost across your account][6].

### Cost Summary (sub-organization)

<div class="alert alert-warning">この機能はベータ版です。アクセスをリクエストし、お客様の組織がこの機能の基準を満たしていることを確認するには、アカウント担当者または<a href="https://docs.datadoghq.com/help/">カスタマーサポート</a>にお問い合わせください。</div>

下部組織は、自分の組織のコストのみを表示することができます。この制限により、所有権が分散され、親組織に広範な管理者権限を付与する必要がなくなります。

{{< img src="account_management/plan_and_usage/suborg-cost-trends.png" alt="Screenshot of the current month's Cost Summary for a sub-organization, showing the overall month-to-date cost, projected cost, a graph with cumulative cost breakdowns, and a summary table including month-over-month cost changes.">}}

1. サブ組織にログインした状態で、[Plan & Usage][2] に移動します。
1. **Usage** タブをクリックします。
1. **Overall** タブが選択されていることを確認します。

#### 表示とフィルター

Use the search facets at the left to filter the cost by **Products**. Use the **Daily Cost** tab to see how the cumulative day-over-day costs have changed within the current month.

#### ダウンロード

カンマ区切りの値ファイルとしてデータをダウンロードするには、**Download as CSV** をクリックします。

## コストチャージバック

コストチャージバックを使用して
- 複数組織の月間推定コストと過去のコストを表示します
- 各下部組織にコストを属性化します

Cost chargebacks are derived by:
- Calculating the sub-organization usage ratio. This is done by dividing usage per sub-organization by the total parent organization usage.
- Applying the sub-organization usage ratio against the parent organization costs, providing the cost chargebacks per sub-organization.

### 過去のコストチャージバック

親組織から、製品別、下部組織別に集計された最終的な過去のコストを表示します。

{{< img src="account_management/plan_and_usage/historical-cost-chargebacks.png" alt="'Usage and Cost Summary' と題された表のスクリーンショット。4 つの下部組織の使用量合計 (ドル) とコスト合計が表示されています。" >}}

1. 親組織にログインした状態で、[Plan & Usage][2] に移動します。
1. **Usage** タブを選択します。
1. **Individual Organizations** をクリックします。
1. **Billable** と **Cost** トグルが選択されていることを確認します。
1. 請求が完了した前月を表示するには、日付セレクタを使用します。

**注**: データは月末締めの約 16 日後に入手可能になります。

### 推定コストチャージバック

親組織から、製品別、下部組織別に集計された推定コストを表示します。

推定コストデータは当月分です。前月の履歴コストデータがまだない場合は、前月の推定コストデータも表示されます。

{{< img src="account_management/plan_and_usage/estimated-cost-chargebacks.png" alt="'Usage and Cost Summary' と題された表のスクリーンショット。4 つの下部組織の使用量合計 (ドル) とコスト合計が表示されています。" >}}

1. 親組織にログインした状態で、[Plan & Usage][2] に移動します。
1. **Usage** タブを選択します。
1. **Individual Organizations** をクリックします。
1. **Billable** と **Cost** トグルが選択されていることを確認します。
1. 日付セレクタに当月または前月が表示されていることを確認します。

### ダウンロード

- 過去または推定のコストチャージバックデータをカンマ区切りの値ファイルとしてダウンロードするには、**Download as CSV** をクリックします。
- API を使用して過去のコストチャージバックデータを照会するには、[アカウント全体で過去のコストを取得する][4]を参照してください。
- API を使用して推定コストチャージバックデータを照会するには、[アカウント全体で見積コストを取得する][3]を参照してください。

## 請求集計がコスト変動に与える影響

Datadog の当月請求予定額は月によって異なります。各製品の請求に使用される集計の種類によって、コストがどのように影響されるかが決まります。最適な視覚化については、[コスト サマリー][5]機能チャートをご覧ください。各 **Products** フィルターには、製品名の横に関連する請求集計方法が含まれています。

### パーセンタイルおよび平均使用量請求

月間使用量の下位 99 パーセントの最大カウント (ハイウォーターマーク) で請求される製品には、インフラストラクチャーホストおよび APM ホストが含まれます。月間平均で請求される製品には、カスタムメトリクスと Fargate タスクが含まれます。これら 2 つのタイプの製品については、コストは月を通して比較的安定していると予想されます。ただし、使用量が大幅に急増または減少した場合は、コストは変動する可能性があります。

### 使用量請求の合計

月間使用量の合計で請求される製品には、インデックス化ログと取り込みログが含まれます。これらのタイプの製品については、使用量の変化に応じてコストが増減することが予想されます。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/
[2]: https://app.datadoghq.com/billing/usage
[3]: /api/latest/usage-metering/#get-estimated-cost-across-your-account
[4]: /api/latest/usage-metering/#get-historical-cost-across-your-account
[5]: /account_management/plan_and_usage/cost_details/#cost-summary
[6]: /api/latest/usage-metering/#get-projected-cost-across-your-account
