---
algolia:
  tags:
  - usage attribution
  - cost attribution
aliases:
- /ja/account_management/billing/advanced_usage_reporting/
- /ja/account_management/billing/custom_usage_reporting/
further_reading:
- link: /account_management/plan_and_usage/
  tag: ドキュメント
  text: 計画と使用設定
- link: https://www.datadoghq.com/blog/zendesk-cost-optimization/#identifying-areas-for-cost-optimization
  tag: ブログ
  text: 'Datadog の大規模な最適化: Zendesk におけるコスト効率の良い監視可能性'
title: 使用属性
---
## 概要 {#overview}

管理者または Usage Read 権限を持つユーザーは、Datadog の [Plan & Usage] (計画と使用) セクションから [Usage Attribution] (使用属性) タブにアクセスできます。[Usage Attribution] ページでは、以下の情報と機能が提供されます。

- 使用方法の分類に使用されている既存のタグキーを一覧表示し、タグキーの変更および追加 (最大 3 つ) の機能を提供します。
- 各月末に使用量を要約し、タグ別の使用量の推移を可視化します。
- 月初から現在の日付までのデータと時間ごとのデータを含む CSV ファイルを生成します。

この機能は、インスツルメンテーション中にタグ付けできない製品の使用量には対応していません。たとえば、Incident Management ユーザー、並列テストスロット、Audit Trail などです。

**注**: CI Pipeline および Test Optimization の請求をチームやその他の組織タグ別に分類するには、CI Visibility の請求に関するドキュメントの[請求エンリッチメント][5]を参照してください。

## はじめに {#getting-started}

日次データの受信を開始するには、管理者はレポートのタグを選択する必要があります。

{{< img src="account_management/billing/usage_attribution/advanced-usage-reporting.png" alt="Datadog での使用属性の開始方法" style="width:100%;" >}}

[{{< ui >}}Edit Tags{{< /ui >}}] (タグの編集) ポップオーバーでは、次の操作が可能です。

- ドロップダウンから最大 3 つのタグキーを入力できます。ドロップダウンには、ルートアカウントとそのアカウントの子オーガニゼーションの両方の既存のタグが事前に入力されています。
- 既存のタグの削除と編集ができます。

{{< img src="account_management/billing/usage_attribution/Edit-Tags-Popover.png" alt="[Usage Attribution] の [Edit Tags]" style="width:80%;" >}}

- タグが構成された後、最初のレポートが生成されるまでに 24 時間かかります。
- レポートは継続的に生成されます。
- タグを変更すると、新しいレポートには新しいタグが反映されますが、以前のレポートはそのまま古いタグを維持します。
- 月次レポートには、最新のタグセットが反映されます。月の途中でタグが変更された場合、各レポート期間に対して部分月レポートが作成されます。

## 合計使用量 {#total-usage}

### 月次使用属性 {#monthly-usage-attribution}

月次レポートは毎日更新され、月初から現在の日付までの使用量データを集計します。

{{< img src="account_management/billing/usage_attribution/Usage-Attribution-Monthly-Facets.png" alt="Datadog で適用されたタグ" style="width:100%;" >}}

- ファセットセレクタを使用して、特定の製品、タグ、組織のデータを選択できます。
- 選択したタグキーでデータをグループ化したり、グループ化解除したりすることができます。
- テーブルの表示には、[Value] (値) と [Percentage] (パーセンテージ) のオプションが用意されています。
- テーブルのデータは、一部の製品を含むように編集することができます。
- マルチオーガニゼーションが有効な場合、使用量は親アカウント配下のすべての Datadog 組織を横断して集計されます。
- 過去のレポートには、タイムセレクターからアクセスできます。
- レポートは CSV 形式でダウンロードできます。これらの CSV レポートには、使用量の値とパーセンテージの両方が含まれており、割り当てやチャージバックを簡素化できます。パーセンテージは組織ごとに計算されます。

月次データは API を使用して取得することもできます。詳細については、[API エンドポイントのドキュメント][1]を参照してください。

### 時間単位の使用属性 {#hourly-usage-attribution}

時間単位のデータは API を使用して取得できます。詳細については、[API エンドポイントのドキュメント][2]を参照してください。

### データの解釈 {#interpreting-the-data}

次のテーブルは、`app` と `service` という 2 つのタグ別のインフラ使用量の日次レポート例です。

| public_id | hour                | app          | service                  | total_usage |
| --------- | ------------------- | ------------- | ------------------------| --------------------- |
| publicid1 | 2022-03-31 00:00:00 | &lt;empty&gt; | service1 &#124; service2  | 50                  |
| publicid1 | 2022-03-31 09:00:00 | app1         |                          | 28                    |
| publicid1 | 2022-03-31 18:00:00 | app2         | service3                 | 1023                  |

- 値が `<empty>` の場合は、リソースが該当するタグでタグ付けされているが、値が設定されていないことを意味します。
- 値が無い場合は、リソースがその特定のタグでタグ付けされていないことを意味します。
- `|`パイプ (|) 区切り値 (例: `service1 | service2`) は、特定のタグがリソースに複数回適用されたことを意味します。
- 有効なタグの値 ([タグの定義に関するドキュメント]を参照[3]) は、それぞれのタグの実際の値を意味します。

#### 詳細なデータ分析 {#further-data-analysis}

複数のタグを使用する場合、時間単位および月次の使用属性レポートには、それらのタグのすべての可能な組み合わせのデータが含まれるため、詳細なデータ分析タスクのベースデータセットとして使用するのに適しています。たとえば、グループ化やピボットを使用して、タグのサブセットに焦点を当てたビューを作成したり、カスタム日付範囲で集計を実行したりできます。

## 使用量の追跡 {#tracking-usage}

使用属性データの時系列は、[Track Usage] (使用量を追跡) をクリックすることで確認できます。
- ファセットセレクタを使用して、特定の製品、組織、タグキーのデータを選択できます。
- グラフの上にある時間セレクタを使用することで、1 日、1 週間、1 か月のデータをグラフ化することができます。

{{< img src="account_management/billing/usage_attribution/Usage-Attribution-Hourly-Facets.png" alt="タグ別に分離されたインフラホストのグラフ" style="width:100%;" >}}


## コスト属性 {#cost-attribution}

直接請求のお客様の場合、毎月のチャージバックとコスト割り当て処理を可能にするために、請求サイクルの終わりに月末コスト属性レポートが作成されます。
- 前月のコストデータは、当月の 19 日までに入手できます。
- GovCloud のお客様は、機能を有効にする前に免責事項に同意する必要があります。
- 月次 Cost Attribution データは [API で利用可能][4]です。

{{< img src="account_management/billing/usage_attribution/Cost-Attribution-Monthly.png" alt="Cost Attribution レポート" style="width:100%;" >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/api/v1/usage-metering/#get-monthly-usage-attribution
[2]: https://docs.datadoghq.com/ja/api/v1/usage-metering/#get-hourly-usage-attribution
[3]: https://docs.datadoghq.com/ja/getting_started/tagging/#define-tags
[4]: https://docs.datadoghq.com/ja/api/latest/usage-metering/#get-monthly-cost-attribution
[5]: /ja/account_management/billing/ci_visibility/#billing-enrichment