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

{{< callout url="http://docs.datadoghq.com/help/">}}
  Estimated Cost Summary と Cost Chargebacks はベータ版です。アクセスをリクエストし、お客様の組織がサポートされていることを確認するには、アカウント担当者またはサポートにお問い合わせください。
{{< /callout >}} 

## 概要

Estimated Cost Summary と Cost Chargebacks は、Datadog の月間および過去の推定コストを把握するのに役立ちます。

下部組織や製品ごとにコストを細分化することで、
- ソースに応じてコストを割り当てることができます
- コストの追跡状況を把握できます

### 権限

Estimated Cost Summary および Cost Chargebacks データを表示するには、Datadog Admin ユーザーである必要があります。

あるいは、Billing Read (`billing_read`) および Usage Read (`usage_read`) [権限][1]を持つロールは、Estimated Cost Summary および Cost Chargebacks データを見ることができます。

## コストサマリー

コストサマリーを使用して
- 月間の推定コストを表示します
- 月内のコスト動向を表示します
- 製品または下部組織ごとにフィルターをかけてコストをグループ化します
- 累積前日比コストを表示します

### Estimated Cost Summary (親組織)

Datadog を単一組織として使用するか、複数組織として使用するかによって、コストサマリー機能が変わります。複数組織では、親組織と各下部組織の推定コストを表示できます。

{{< img src="account_management/plan_and_usage/multi-org-estimated-cost-summary.png" alt="親組織の Estimated Cost Summary のスクリーンショット。月間の全体コスト、累積コスト内訳のグラフ、サマリー表が表示されています。" >}}

1. 親組織にログインした状態で、[Plan & Usage][2] に移動します。
1. **Usage** タブをクリックします。
1. 複数組織の場合は、**Overall** タブが選択されていることを確認します。

#### 表示とフィルター

左側の検索ファセットを使用して、** Products** または **Sub-Orgs** でコストをフィルターします。**Over Time** タブを使用して、累積前日比コストがどのように変化したかを確認できます。

#### ダウンロード

カンマ区切りの値ファイルとしてデータをダウンロードするには、**Download as CSV** をクリックします。

API を使用して推定コストデータを照会するには、[アカウント全体で見積コストを取得する][3]を参照してください。

### Estimated Cost Summary (下部組織)

下部組織は、自分の組織のコストのみを表示することができます。この制限により、所有権が分散され、親組織に広範な管理者権限を付与する必要がなくなります。

{{< img src="account_management/plan_and_usage/sub-org-estimated-cost-summary.png" alt="下部組織の Estimated Cost Summary のスクリーンショット。月間の全体コスト、累積コスト内訳のグラフ、サマリー表が表示されています。" >}}

1. サブ組織にログインした状態で、[Plan & Usage][2] に移動します。
1. **Usage** タブをクリックします。
1. **Overall** タブが選択されていることを確認します。

#### 表示とフィルター

左側の検索ファセットを使用して、** Products** でコストをフィルターします。**Over Time** タブを使用して、累積前日比コストがどのように変化したかを確認できます。

#### ダウンロード

カンマ区切りの値ファイルとしてデータをダウンロードするには、**Download as CSV** をクリックします。

API を使用して見積コストデータを照会するには、[アカウント全体で見積コストを取得する][3]を参照してください。

## コストチャージバック

コストチャージバックを使用して
- 複数組織の月間推定コストと過去のコストを表示します
- 各下部組織にコストを属性化します

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

月間使用量の下位 99 パーセントの最大カウント (ハイウォーターマーク) で請求される製品には、インフラストラクチャーホストおよび APM ホストが含まれます。月間平均で請求される製品には、カスタムメトリクスと Fargate タスクが含まれます。これら 2 つのタイプの製品については、コストは月を通して比較的安定していると予想されます。ただし、使用量が大幅に急増した場合は、コストは変動する可能性があります。

### 使用量請求の合計

月間使用量の合計で請求される製品には、インデックス化ログと取り込みログが含まれます。これらのタイプの製品については、使用量の変化に応じてコストが増減することが予想されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/rbac/
[2]: https://app.datadoghq.com/billing/usage
[3]: /ja/api/latest/usage-metering/#get-estimated-cost-across-your-account
[4]: /ja/api/latest/usage-metering/#get-historical-cost-across-your-account
[5]: /ja/account_management/plan_and_usage/cost_details/#cost-summary