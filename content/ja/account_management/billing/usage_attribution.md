---
title: 使用属性
kind: ドキュメント
aliases:
  - /ja/account_management/billing/advanced_usage_reporting/
  - /ja/account_management/billing/custom_usage_reporitng/
---
## 概要

<div class="alert alert-warning">
Usage Attribution は、Enterprise プランに含まれる高度な機能です。他のプランをご利用中で、この機能をご希望の場合は、アカウント担当者または <a href="mailto:success@datadoghq.com">success@datadoghq.com</a> までお問い合わせください。
</div>

管理者は Datadog の Plan & Usage セクションから Usage Attribution タブにアクセスできます。Usage Attribution ページでは、以下の情報と機能が確認できます。

- 使用方法が分類されている既存のタグキーを一覧表示し、新しいタグキー（最大 3 つ）を変更および追加する機能を提供します。
- ほとんどの使用タイプの日次 `.tsv` ファイル（タブ区切り値）を生成します。
- 毎月月末に使用方法を要約します。
- UI および `.tsv` ダウンロードとしてデータを表示します。

**注**: 以下の使用タイプはこのツールではサポートされません。

- インデックス化されたログイベント
- 収集されたログ
- インデックス化されたスパン

**注: Analyzed Span は、2020 年 10 月 20 日の Tracing Without Limits のローンチに伴い、Indexed Span と改名しました。**

### はじめに

日次データを受け取るには、管理者がユーザーインターフェイスで新しいレポートを作成する必要があります。

{{< img src="account_management/billing/advanced-usage-reporting-01.png" alt="はじめに" >}}

**Applied Tags** セクションでは、

- ドロップダウンから最大 3 つのタグキーを入力できます。ドロップダウンには、ルートアカウントとアカウントの子オーガニゼーションの両方の既存のタグが事前に入力されています。
- 既存のタグの削除と編集ができます。

{{< img src="account_management/billing/advanced-usage-reporting-02.png" alt="Applied Tags" >}}

- タグを構成してから最初のレポートが生成されるまでに 24 時間かかります。
- レポートは継続的に生成されます。
- タグを変更すると、新しいレポートには新しいタグが反映されますが、以前のレポートはそのまま古いタグを維持します。
- 月次レポートは、最新のタグセットが反映されます。月の途中でタグを変えた場合、使用率が一致しない場合があります。

### 月次使用属性

レポートの生成が始まると、レポートは日々更新され、この表で毎月集計されます。

{{< img src="account_management/billing/advanced-usage-reporting-03.png" alt="使用の要約表" >}}

- 特定のタグキーをクリックすると、それに応じた表が表示されます。
- マルチオーガニゼーションを有効にすると、使用方法は親アカウントの全 Datadog オーガニゼーションが要約されます。
- 前の月のレポートには、タイムセレクターからアクセスできます。
- 月次レポートはその月が終わるまで生成されません。月次レポートは、翌月の 2 日には閲覧できます。
- レポートは 'Export Current View' オプションでダウンロードできます。この `.tsv` レポートには、使用数と使用率の両方が含まれるため、割り当てとチャージバックを簡単に行うことができます。

月次データはツールのパブリック API を使いプルすることもできます ([API エンドポイントドキュメント][1]を参照してください。)

### 日次使用属性

このセクションでは、日次レポートを時間の粒度で表示し時間枠を丁寧に調べます。また指定した月のすべてのレポートを連結することもできます。

- 特定の期間をクリックすると、右側でビューが展開され、そこから `.tsv` 形式のレポートをダウンロードできます。
- データは毎日または月末にダウンロードできます。

{{< img src="account_management/billing/advanced-usage-reporting-04.png" alt="データをダウンロード" >}}

月次データはツールのパブリック API を使いプルすることもできます（[API エンドポイントドキュメント][2]を参照してください。)

### データの解釈

次の表は、`team` タグと `service` タグのカスタムメトリクス使用状況の日次レポート例です。

| public_id | 時間                | チーム          | サービス                  | num_custom_timeseries |
| --------- | ------------------- | ------------- | ------------------------ | --------------------- |
| publicid1 | 2020-02-01 00:00:00 | &lt;empty&gt; | service1 &#124; service2 | 50                    |
| publicid1 | 2020-02-01 09:00:00 | team1         |                          | 28                    |
| publicid1 | 2020-02-01 18:00:00 | team2         | service3                 | 1023                  |

- 値が`<empty>` というのは、リソースがそれぞれのタグでタグ付けされたものの、そこに値が無いことを意味します。
- 値が無いというのは、リソースがその特定のタグにタグ付けされていないという意味です。
- パイプ (|) 区切り値 (例、`service1 | service2`) は、特定のタグがリソースに複数回適用されたことを意味します。
- 有効なタグの値 ([タグの定義に関するドキュメント]を参照[3]) は、それぞれのタグの実際の値を意味します。

#### 詳細なデータ分析

複数のタグを使用する場合、日次および月次使用属性レポートにはタグの全通りの組み合わデータが含まれるため、詳細なデータ分析タスクのベースデータセットとして使用することができます。たとえば、グループ化やピボットでタグのサブセットに注目したビューを表示したり、任意の日付範囲の中で集計を行うことができます。

[1]: https://docs.datadoghq.com/ja/api/v1/usage-metering/#get-the-list-of-available-monthly-custom-reports
[2]: https://docs.datadoghq.com/ja/api/v1/usage-metering/#get-the-list-of-available-daily-custom-reports
[3]: https://docs.datadoghq.com/ja/getting_started/tagging/#defining-tags