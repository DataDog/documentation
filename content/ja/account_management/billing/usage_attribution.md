---
aliases:
- /ja/account_management/billing/advanced_usage_reporting/
- /ja/account_management/billing/custom_usage_reporitng/
further_reading:
- link: /account_management/plan_and_usage/
  tag: ドキュメント
  text: 計画と使用設定
kind: ドキュメント
title: 使用属性
---

## 概要

<div class="alert alert-warning">
Usage Attribution は、Enterprise プランに含まれる高度な機能です。他のプランをご利用中で、この機能をご希望の場合は、アカウント担当者または <a href="mailto:success@datadoghq.com">success@datadoghq.com</a> までお問い合わせください。
</div>

管理者は Datadog の Plan & Usage セクションから Usage Attribution タブにアクセスできます。Usage Attribution ページでは、以下の情報と機能が確認できます。

- 使用方法が分類されている既存のタグキーを一覧表示し、新しいタグキー（最大 3 つ）を変更および追加する機能を提供します。
- ほとんどの使用量タイプに対応したタブ区切り値 (TSV) ファイルを毎日生成します。
- 毎月月末に使用方法を要約します。
- UI および TSV ダウンロードとしてデータを表示します。

このツールでは、以下のような多くの使用タイプがサポートされていません。

- Analyzed Logs (Security)
- インシデント管理
- Network Flows
- CI Spans

Datadog は、以下の製品の Estimated Usage Attribution 値を提供しています。

- インデックス化されたログイベント
- 収集されたログ
- Indexed Span
- Ingested Span
- リアルユーザーモニタリングの総セッション数

## はじめに

日次データを受け取るには、管理者がユーザーインターフェイスで新しいレポートを作成する必要があります。

{{< img src="account_management/billing/usage_attribution/advanced-usage-reporting.png" alt="Datadog で使用量属性を始める" style="width:100%;" >}}

**Applied Tags** セクションでは、

- ドロップダウンから最大 3 つのタグキーを入力できます。ドロップダウンには、ルートアカウントとアカウントの子オーガニゼーションの両方の既存のタグが事前に入力されています。
- 既存のタグの削除と編集ができます。

{{< img src="account_management/billing/advanced-usage-reporting-02.png" alt="Datadog で適用されたタグ" style="width:80%;" >}}

- タグを構成してから最初のレポートが生成されるまでに 24 時間かかります。
- レポートは継続的に生成されます。
- タグを変更すると、新しいレポートには新しいタグが反映されますが、以前のレポートはそのまま古いタグを維持します。
- 月次レポートは、最新のタグセットが反映されます。月の途中でタグを変えた場合、使用率が一致しない場合があります。

## 合計使用量

### 月次使用属性

レポートの生成が始まると、レポートは日々更新され、この表で毎月集計されます。

{{< img src="account_management/billing/usage_attribution/Usage-Attribution-v2-Total-Usage.png" alt="Datadog で適用されたタグ" style="width:100%;" >}}

- アプリ別、サービス別など、選択したすべてのタグキーでデータを表示します。
- 左側のドロップダウンから、特定の組織やタグのキーでデータを表示することができます。
- テーブルの表示には、Value と Percentage のオプションが用意されています。
- テーブルのデータは、一部の製品を含むように編集することができます。

{{< img src="account_management/billing/usage_attribution/usage-attribution-options.png" alt="使用量属性オプションドロップダウンメニュー" style="width:100%;" >}}

- マルチオーガニゼーションを有効にすると、使用方法は親アカウントの全 Datadog オーガニゼーションが要約されます。
- 前の月のレポートには、タイムセレクターからアクセスできます。
- 月次レポートはその月が終わるまで生成されません。月次レポートは、翌月の 2 日には閲覧できます。
- レポートは TSV フォーマットでダウンロードできます。この TSV レポートには、使用数と使用率の両方が含まれるため、割り当てとチャージバックをシンプルに行うことができます。

月次データはツールのパブリック API を使いプルすることもできます。詳細は、[API エンドポイントドキュメント][1]を参照してください。


{{< site-region region="us,eu" >}}
### 日次使用属性

<div class="alert alert-warning">Datadog は、2023 年 2 月 1 日に日次使用量属性レポートを非推奨とすることを計画しています。代替案として、<a href="/api/latest/usage-metering/#get-hourly-usage-attribution">1 時間ごとの使用量属性 API エンドポイント</a>を使用してください。

このセクションでは、日次レポートを時間の粒度で表示し時間枠を丁寧に調べます。また指定した月のすべてのレポートを連結することもできます。

- 特定の期間をクリックすると、右側でビューが展開され、そこから TSV ファイルのレポートをダウンロードできます。
- データは毎日または月末にダウンロードできます。

{{< img src="account_management/billing/usage_attribution/daily-usage-attribution.png" alt="日次使用量属性データ" style="width:100%;" >}}

日次データはツールのパブリック API を使いプルすることもできます。詳細は、[API エンドポイントドキュメント][2]を参照してください。

[2]: https://docs.datadoghq.com/ja/api/v1/usage-metering/#get-hourly-usage-attribution
{{< /site-region >}}

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

複数のタグを使用する場合、日次および月次使用属性レポートにはタグの全通りの組み合わデータが含まれるため、詳細なデータ分析タスクのベースデータセットとして使用することができます。たとえば、グループ化やピボットでタグのサブセットに注目したビューを表示したり、任意の日付範囲の中で集計を行うことができます。

## 使用量の追跡

- **Usage Attribution Trends** の下の検索クエリを編集することで、特定の製品、組織、タグキーでデータを表示することができます。
- データは日次、週次、月次の各レベルで表示することができます。

{{< img src="account_management/billing/usage_attribution/graph-by-tags.png" alt="タグ別のインフラホストのグラフ" style="width:100%;" >}}

### データの解釈

製品ごとに、タグ別にグラフが表示されます。

{{< img src="account_management/billing/usage_attribution/multiple-graphs-by-tags.png" alt="タグ別のインフラホストグラフとカスタムメトリクスグラフ" style="width:100%;" >}}

各色ブロックは、各タグに固有のタグ値を表します。

{{< img src="account_management/billing/usage_attribution/histogram-graph-tag.png" alt="インフラホストグラフのピラーの内訳" style="width:100%;" >}}

## {{< partial name="whats-next/whats-next.html" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/api/v1/usage-metering/#get-monthly-usage-attribution
[3]: https://docs.datadoghq.com/ja/getting_started/tagging/#defining-tags