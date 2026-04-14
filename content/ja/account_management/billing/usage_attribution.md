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

## 概要

<div class="alert alert-danger">
Usage Attribution は、Enterprise プランに含まれる高度な機能です。他のプランをご利用中で、この機能をご希望の場合は、アカウント担当者または <a href="mailto:success@datadoghq.com">success@datadoghq.com</a> までお問い合わせください。
</div>

管理者または Usage Read 権限を持つユーザーは、Datadog の Plan &amp; Usage セクションから Usage Attribution タブにアクセスできます。 Usage Attribution ページでは、以下の情報と機能を提供します。

- 使用方法が分類されている既存のタグキーを一覧表示し、新しいタグキー（最大 3 つ）を変更および追加する機能を提供します。
- 各月末の使用量を要約し、タグ別に時間経過とともに使用量を視覚化します。
- 月次および時間ごとの CSV ファイルを生成します。

この機能は、インスツルメンテーション中にタグ付けできない製品の使用量には対応していません。 例えば、Incident Management ユーザー、CI Pipeline and Test ユーザー、並列テストスロット、監査証跡などです。

## はじめに

日次データの受信を開始するには、管理者はレポートのタグを選択する必要があります。

{{< img src="account_management/billing/usage_attribution/advanced-usage-reporting.png" alt="Datadog で使用量属性を始める" style="width:100%;" >}}

**Edit Tags** ポップオーバーでは、以下のことが可能です。

- ドロップダウンから最大 3 つのタグキーを入力できます。ドロップダウンには、ルートアカウントとアカウントの子オーガニゼーションの両方の既存のタグが事前に入力されています。
- 既存のタグの削除と編集ができます。

{{< img src="account_management/billing/usage_attribution/Edit-Tags-Popover.png" alt="使用量属性のタグを編集する" style="width:80%;" >}}

- タグが構成されると、最初のレポートが生成されるまで 24 時間かかります。
- レポートは継続的に生成されます。
- タグを変更すると、新しいレポートには新しいタグが反映されますが、以前のレポートはそのまま古いタグを維持します。
- 月次レポートには、最新のタグのセットが反映されます。 月の途中でタグが変更された場合、各レポート期間に対して部分月レポートが作成されます。

## 合計使用量

### 月次使用属性

月次レポートは毎日更新され、月初から現在の日付までの使用量データを集計します。

{{< img src="account_management/billing/usage_attribution/Usage-Attribution-Monthly-Facets.png" alt="Datadog で適用されたタグ" style="width:100%;" >}}

- ファセットセレクタを使用して、特定の製品、タグ、組織のデータを選択できます。
- 選択したタグキーでデータをグループ化したり、グループ化解除したりすることができます。
- Value and Percentage options are available for table display. 
- テーブルのデータは、一部の製品を含むように編集することができます。
- マルチオーガニゼーションを有効にすると、使用方法は親アカウントの全 Datadog オーガニゼーションが要約されます。
- 前の月のレポートには、タイムセレクターからアクセスできます。
- レポートは CSV 形式でダウンロードできます。 これらの CSV レポートには、使用数とパーセンテージの両方が含まれており、割り当てやチャージバックの簡素化が可能です。 パーセンテージは組織ごとに計算されます。

API を使用して月次データを取得することもできます。 詳細については、[API エンドポイントのドキュメント][1]を参照してください。

### 1 時間ごとの使用量属性

時間単位のデータは API を使用して引き出すことができます。 詳細については、[API エンドポイントのドキュメント][2]を参照してください。

### データの解釈

次のテーブルは、`app` タグと `service` タグ別のインフラ使用量の日次レポート例です。

| public_id | 時間                | app          | サービス                  | total_usage |
| --------- | ------------------- | ------------- | ------------------------| --------------------- |
| publicid1 | 2022-03-31 00:00:00 | &lt;empty&gt; | service1 &#124; service2  | 50                  |
| publicid1 | 2022-03-31 09:00:00 | app1         |                          | 28                    |
| publicid1 | 2022-03-31 18:00:00 | app2         | service3                 | 1023                  |

- 値が`<empty>` というのは、リソースがそれぞれのタグでタグ付けされたものの、そこに値が無いことを意味します。
- 値が無いというのは、リソースがその特定のタグにタグ付けされていないという意味です。
- パイプ (|) 区切り値 (例、`service1 | service2`) は、特定のタグがリソースに複数回適用されたことを意味します。
- 有効なタグの値 ([タグの定義に関するドキュメント]を参照[3]) は、それぞれのタグの実際の値を意味します。

#### 詳細なデータ分析

複数のタグを使用する場合、時間単位および月次使用属性レポートにはタグの全通りの組み合わデータが含まれるため、詳細なデータ分析タスクのベースデータセットとして使用することができます。たとえば、グループ化やピボットでタグのサブセットに注目したビューを表示したり、任意の日付範囲の中で集計を行うことができます。

## 使用量の追跡

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

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/api/v1/usage-metering/#get-monthly-usage-attribution
[2]: https://docs.datadoghq.com/ja/api/v1/usage-metering/#get-hourly-usage-attribution
[3]: https://docs.datadoghq.com/ja/getting_started/tagging/#define-tags
[4]: https://docs.datadoghq.com/ja/api/latest/usage-metering/#get-monthly-cost-attribution