---
further_reading:
- link: https://docs.datadoghq.com/account_management/billing/
  tag: Documentation
  text: 課金
- link: https://docs.datadoghq.com/account_management/billing/usage_details/
  tag: Documentation
  text: 使用量の詳細
- link: https://docs.datadoghq.com/account_management/multi_organization/
  tag: Documentation
  text: 複数組織アカウントの管理
title: コスト詳細
---

## 概要

Cost Summary と Cost Chargebacks は、当月累計の推定額、月末見込み額、および過去の Datadog コストを把握するのに役立ちます。コスト データは過去 15 か月分が利用可能です。

下部組織や製品ごとにコストを細分化することで、
- ソースに応じてコストを割り当てることができます
- コストの追跡状況を把握できます

Cloud Cost Explorer、ダッシュボード、そして [コスト モニター][7] における日次の Datadog 支出の可視化については、Cloud Cost Management 配下の [Datadog コスト][8] を参照してください。

### 権限

Billing Read (`billing_read`) と Usage Read (`usage_read`) の [権限][1] を持つロールは、Cost Summary と Cost Chargebacks のデータを表示できます。Datadog Admin ロールのユーザーには、既定でこれらの権限があります。


## コストサマリー

コストサマリーを使用して
- 当月累計の推定額および月末見込みコストを表示
- 過去のコストを表示
- 製品または下部組織ごとにフィルターをかけてコストをグループ化します
- 前月比の % および $ のコスト変化を表示
- 月内のコスト動向を表示します
- 累積前日比コストを表示します

### 見込みコスト (親組織)

月末見込みコストは、契約単価に対して前月および当月の見込み使用量データを適用して算出されます。月末見込みコストは日次で更新され、月内の使用状況に応じて変動する場合があります。予測値であるため、最終的な月次コストと差異が生じる可能性があります。

### Cost Summary (親組織)

Cost Summary の機能は、単一組織としての Datadog 利用か複数組織での利用かによって変わります。複数組織の場合、親組織および各サブ組織について、推定・見込み・過去のコストを表示できます。

{{< img src="account_management/plan_and_usage/multiorg-current-month-historical-costs.png" alt="親組織の当月の Cost Summary のスクリーン ショット。月次累計の総コスト、見込みコスト、累積コストのブレーク ダウンを示すグラフ、前月比のコスト変化を含むサマリ テーブルを表示。" >}}

履歴コストは、前の月に切り替えて表示するか、日付のドロップ ダウンを使用して 1、3、6、または 12 か月の期間を選択して表示します。

{{< img src="account_management/plan_and_usage/parent-org-multi-month-cost-changes.png" alt="親組織の 3 か月間にわたる履歴コストのスクリーン ショット。月ごとの総コスト、累積コストのブレーク ダウンを示すグラフ、前月比のコスト変化を含むサマリ テーブルを表示。" >}}

1. 親組織にログインした状態で、[Plan & Usage][2] に移動します。
1. **Usage** タブをクリックします。
1. 複数組織の場合は、**Overall** タブが選択されていることを確認します。

#### 表示とフィルター

左側の検索ファセットを使用して、**Products**、**Sub-Orgs**、または **Cost Breakdown** でコストをフィルタリングします。**Daily Cost** タブを使用すると、当月内で累積の前日比コストがどのように変化したかを確認できます。


#### ダウンロード

データを CSV ファイルとしてダウンロードするには、**Download as CSV** をクリックします。データは当月およびあらかじめ定義された前月分について利用できます。レコードの区別には `Cost Type` フィールドを使用します:
- **Projected**: 当月についてデータが利用できます。
- **Estimated MTD**: データは月初から当日まで利用できます。前月の履歴コスト データがまだ利用できない場合、前月分についても推定コスト データが表示されます。
- **Historical**: 月次締め完了後、すなわち月末から約 16 日後にデータが利用可能になります。

推定コスト データを API 経由でクエリするには、[アカウント 全体の推定コストを取得][3] を参照してください。見込みコスト データを API 経由でクエリするには、[アカウント 全体の見込みコストを取得][6] を参照してください。

### Cost Summary (サブ組織)

<div class="alert alert-danger">この機能は限定的に提供されています。アクセスのリクエストおよび組織が機能の適用基準を満たしていることの確認については、アカウント 担当者または <a href="https://docs.datadoghq.com/help/">カスタマー サポート</a> にお問い合わせください。</div>

下部組織は、自分の組織のコストのみを表示することができます。この制限により、所有権が分散され、親組織に広範な管理者権限を付与する必要がなくなります。

{{< img src="account_management/plan_and_usage/suborg-cost-trends.png" alt="サブ組織の当月の Cost Summary のスクリーン ショット。月次累計の総コスト、見込みコスト、累積コストのブレーク ダウンを示すグラフ、前月比のコスト変化を含むサマリ テーブルを表示。" >}}

履歴コストは、前の月に切り替えて表示するか、日付のドロップ ダウンを使用して 1、3、6、または 12 か月の期間を選択して表示します。

{{< img src="account_management/plan_and_usage/suborg-multi-month-cost-changes.png" alt="サブ組織の 6 か月間にわたる履歴コストのスクリーン ショット。月ごとの総コスト、累積コストのブレーク ダウンを示すグラフ、前月比のコスト変化を含むサマリ テーブルを表示。" >}}

1. サブ組織にログインした状態で、[Plan & Usage][2] に移動します。
1. **Usage** タブをクリックします。
1. **Overall** タブが選択されていることを確認します。

#### 表示とフィルター

左側の検索ファセットを使用して、**Products** または **Cost Breakdown** でコストをフィルタリングします。**Daily Cost** タブを使用すると、当月内で累積の前日比コストがどのように変化したかを確認できます。

#### ダウンロード

カンマ区切りの値ファイルとしてデータをダウンロードするには、**Download as CSV** をクリックします。

## コストチャージバック

コストチャージバックを使用して
- 複数組織の月間推定コストと過去のコストを表示します
- 各下部組織にコストを属性化します

Cost chargebacks は次の手順で導出されます:
- サブ組織の使用率を算出します。これは、サブ組織ごとの使用量を親組織の総使用量で割ることで求めます。
- 親組織のコストに対して、このサブ組織の使用率を適用し、サブ組織ごとの Cost Chargeback を算出します。

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

## 関連情報

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/rbac/
[2]: https://app.datadoghq.com/billing/usage
[3]: /ja/api/latest/usage-metering/#get-estimated-cost-across-your-account
[4]: /ja/api/latest/usage-metering/#get-historical-cost-across-your-account
[5]: /ja/account_management/plan_and_usage/cost_details/#cost-summary
[6]: /ja/api/latest/usage-metering/#get-projected-cost-across-your-account
[7]: /ja/cloud_cost_management/monitors/?tab=costmetricbased
[8]: /ja/cloud_cost_management/datadog_costs/