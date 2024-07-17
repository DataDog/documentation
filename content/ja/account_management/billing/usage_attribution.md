---
algolia:
  tags:
  - 使用属性
  - コスト属性
aliases:
- /ja/account_management/billing/advanced_usage_reporting/
- /ja/account_management/billing/custom_usage_reporitng/
further_reading:
- link: /account_management/plan_and_usage/
  tag: ドキュメント
  text: 計画と使用設定
title: 使用属性
---

## Overview

<div class="alert alert-warning">
Usage Attribution is an advanced feature included in the Enterprise plan. For all other plans, contact your account representative or <a href="mailto:success@datadoghq.com">success@datadoghq.com</a> to request this feature.
</div>

管理者または Usage Read 権限を持つユーザーは、Datadog の Plan &amp; Usage セクションから Usage Attribution タブにアクセスできます。 Usage Attribution ページでは、以下の情報と機能を提供します。

- Lists the existing tag keys that usage is being broken down by and provides the ability to change and add new ones (up to three tag keys).
- 各月末の使用量を要約し、タグ別に時間経過とともに使用量を視覚化します。
- 月次および時間ごとの CSV ファイルを生成します。

この機能は、インスツルメンテーション中にタグ付けできない製品の使用量には対応していません。 例えば、Incident Management ユーザー、CI Pipeline and Test ユーザー、並列テストスロット、監査証跡などです。

## Getting started

日次データの受信を開始するには、管理者はレポートのタグを選択する必要があります。

{{< img src="account_management/billing/usage_attribution/advanced-usage-reporting.png" alt="Getting Started with Usage Attribution in Datadog" style="width:100%;" >}}

**Edit Tags** ポップオーバーでは、以下のことが可能です。

- Entering up to three tag keys from a dropdown. The dropdown is pre-populated with existing tags on both the root account and any child organizations under the account.
- Deleting and editing existing tags.

{{< img src="account_management/billing/usage_attribution/Edit-Tags-Popover.png" alt="使用量属性のタグを編集する" style="width:80%;" >}}

- タグが構成されると、最初のレポートが生成されるまで 24 時間かかります。
- The reports are generated on an ongoing basis.
- If tags are changed, the new report reflects the new tags. However, the previous reports keep the old tags.
- 月次レポートには、最新のタグのセットが反映されます。 月の途中でタグが変更された場合、各レポート期間に対して部分月レポートが作成されます。

## Total usage

### Monthly usage attribution

月次レポートは毎日更新され、月初から現在の日付までの使用量データを集計します。

{{< img src="account_management/billing/usage_attribution/Usage-Attribution-Monthly-Facets.png" alt="Datadog で適用されたタグ" style="width:100%;" >}}

- ファセットセレクタを使用して、特定の製品、タグ、組織のデータを選択できます。
- 選択したタグキーでデータをグループ化したり、グループ化解除したりすることができます。
- Value and Percentage options are available for table display. 
- Data shown on the table can be edited to include select products. 
- If multi-org is enabled, usage is summarized across all Datadog organizations at the parent account.
- Previous months' reports are accessible through the time selector.
- レポートは CSV 形式でダウンロードできます。 これらの CSV レポートには、使用数とパーセンテージの両方が含まれており、割り当てやチャージバックの簡素化が可能です。 パーセンテージは組織ごとに計算されます。

API を使用して月次データを取得することもできます。 詳細については、[API エンドポイントのドキュメント][1]を参照してください。

### Hourly usage attribution

時間単位のデータは API を使用して引き出すことができます。 詳細については、[API エンドポイントのドキュメント][2]を参照してください。

### Interpreting the data

The table below shows a sample daily report for Infra usage by two tags: `app` and `service`.

| public_id | hour                | app          | service                  | total_usage |
| --------- | ------------------- | ------------- | ------------------------| --------------------- |
| publicid1 | 2022-03-31 00:00:00 | &lt;empty&gt; | service1 &#124; service2  | 50                  |
| publicid1 | 2022-03-31 09:00:00 | app1         |                          | 28                    |
| publicid1 | 2022-03-31 18:00:00 | app2         | service3                 | 1023                  |

- An `<empty>` value means the resource was tagged with the respective tag but did not have a value.
- No value means the resource was not tagged with that particular tag.
- `|` (pipe) separated values (for example, `service1 | service2`) mean that a particular tag was applied multiple times on the resource.
- A valid tag value (see the [Defining Tags documentation][3]) refers to the actual value of the respective tag.

#### Further data analysis

When using multiple tags, both the Hourly and Monthly Usage Attribution reports contain data for all possible combinations of those tags, and are suitable to use as base datasets for further data analysis tasks. For instance, you can use grouping or pivoting to produce views focused on a subset of the tags, or to perform aggregations across custom date ranges.

## Tracking usage

使用量属性データの時系列は、"Track Usage" をクリックすることで確認できます。
- ファセットセレクタを使用して、特定の製品、組織、タグキーのデータを選択できます。
- グラフの上にある時間セレクタを使用することで、1 日、1 週間、1 か月のデータをグラフ化することができます。

{{< img src="account_management/billing/usage_attribution/Usage-Attribution-Hourly-Facets.png" alt="タグで区切られたインフラホストグラフ" style="width:100%;" >}}


## コスト属性

直接請求のお客様の場合、毎月のチャージバックとコスト割り当て処理を可能にするために、請求サイクルの終わりに月末コスト属性レポートが作成されます。
- 前月のコストデータは、当月の 19 日までに入手できます。
- コスト属性データは現在、GovCloud データセンターでは利用できません。
- 月次コスト属性データは [API で利用可能][4]です。

{{< img src="account_management/billing/usage_attribution/Cost-Attribution-Monthly.png" alt="コスト属性レポート" style="width:100%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/api/v1/usage-metering/#get-monthly-usage-attribution
[2]: https://docs.datadoghq.com/ja/api/v1/usage-metering/#get-hourly-usage-attribution
[3]: https://docs.datadoghq.com/ja/getting_started/tagging/#define-tags
[4]: https://docs.datadoghq.com/ja/api/latest/usage-metering/#get-monthly-cost-attribution