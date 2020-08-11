---
title: 使用量の詳細
kind: documentation
---
## 概要

管理者は、左下に表示される自分のユーザー名にカーソルを置き、`Plan & Usage`--> `Usage` の順に移動すると[使用量][1]ページにアクセスできます。

使用量ページでは、次の情報を確認できます。

* 当月内サマリー
* 全体使用量 (最新および履歴)
* カスタムメトリクス上位 500

## 当月内サマリー

このセクションには、過去 1 か月間に使用したホスト、コンテナ、カスタムメトリクス、APM ホスト、Analyzed Span、ログ、Synthetic テストなど、当月内に使用したプラットフォームの各項目について概要が表示されます。

{{< img src="account_management/billing/usage-details-01.png" alt="使用量サマリー" >}}

## 全体使用量

このセクションでは、時、日、月、年ごとの使用状況が次の 2 つのタブに表示されます。

* Host, Containers and Custom Metrics
* Infrastructure Host Types

### Host, Containers and Custom Metrics

このタブでは、時、日、月、年ごとの以下の使用状況が表示されます。

| 列                   | 説明                                                                                         |
|--------------------------|-----------------------------------------------------------------------------------------------------|
| APM ホスト                | 当月全時間のすべての個別 APM ホストの 99 パーセンタイル値を表示します。            |
| インフラ ホスト             | 当月全時間のすべての個別インフラストラクチャーホストの 99 パーセンタイル値を表示します。 |
| コンテナ               | 当月全時間のすべての個別コンテナの最高水準値を表示します。            |
| カスタムメトリクス           | 当月全時間の個別[カスタムメトリクス][2]の平均数を表示します。       |
| 収集されたログ            | 当月全時間のすべての収集ログバイト数の合計を表示します。                        |
| インデックス化されたログ             | 当月全時間のすべてのインデックス化ログイベント数の合計を表示します。                        |
| Analyzed Span           | 当月全時間のインデックス化されたすべての Analyzed Span の合計を表示します。                    |
| Synthetic API テスト     | 当月全時間のすべての Synthetic API テスト数の合計を表示します。                        |
| Synthetic ブラウザテスト | 当月全時間のすべての Synthetic ブラウザテスト数の合計を表示します。                    |
| Fargate タスク            | 当月全時間のすべての Fargate タスク数の合計を表示します。                            |


{{< img src="account_management/billing/usage-details-02.png" alt="1 時間あたりの使用量" >}}

### Infrastructure Host Types

このテーブルには、上の**インフラホスト**グラフの内訳がホストタイプ別に表示されます。

* Agent ホスト
* AWS ホスト
* Azure ホスト
* GCP ホスト

{{< img src="account_management/billing/usage-details-03.png" alt="インフラホストタイプ" >}}

## カスタムメトリクス上位 500

このテーブルには、カスタムメトリクス上位 500 の当月内使用状況について、次の情報がリストされます。

* メトリクス名
* 1 時間ごと平均カスタムメトリクス数
* 1 時間ごと最大カスタムメトリクス数
* カスタムメトリクスの使用数全体に対する各メトリクスの貢献率

このデータは CSV ファイルとしてダウンロードできます。

{{< img src="account_management/billing/usage-details-04.png" alt="カスタムメトリクス" >}}

## トラブルシューティング

技術的な質問については、[Datadog のサポートチーム][3]にお問い合わせください。

課金に関するご質問は、[カスタマーサクセス][4]マネージャーにお問い合わせください。

[1]: https://app.datadoghq.com/account/usage/hourly
[2]: /ja/developers/metrics/custom_metrics/
[3]: /ja/help/
[4]: mailto:success@datadoghq.com