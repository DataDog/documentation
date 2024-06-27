---
aliases:
- /ja/account_management/billing/usage_details/
title: 使用量の詳細
---

## 概要

管理者は、左下に表示される自分のユーザー名にカーソルを置き、`Plan & Usage`--> `Usage` の順に移動すると[使用量][1]ページにアクセスできます。

Usage ページには、製品カテゴリー別にグループ化された使用量が表示されます。製品タブを開くと、その製品カテゴリーの使用量を表示できます。"All" のタブを開くとすべての製品の使用量が表示されます。各タブには、以下の情報が含まれます。

* 当月内サマリー
* 全体使用量 (最新および履歴)

一部の製品タブには、追加ツールも含まれています。

* Custom Metrics タブ: 上位のカスタムメトリクス
* Log Management タブ: インデックス別ログ使用量

## 当月サマリー

このセクションには、月内の使用量の概要が表示されます。"All" タブでは、インフラストラクチャーホスト、コンテナ、カスタムメトリクス、APM ホスト、ログなど、当月内に使用したプラットフォームの各項目の使用量を表示します。

{{< img src="account_management/billing/usage-details-v2-01.png" alt="使用量サマリー - All タブ" >}}

製品固有のタブでは、その製品カテゴリーの製品の当月内使用量を表示します。

{{< img src="account_management/billing/usage-details-v2-02.png" alt="使用量サマリー - ネットワーク" >}}

上記の月内の使用量は "All" (すべて) の使用量であり、製品の試用などの請求対象外の使用量が含まれます。ほとんどのアカウントは、"Billable" (請求対象) の使用量を表示することができます。これは、最終的な請求に寄与する使用量のみを表示します。"Billable" ビューは、コミットメントと割り当てを超えるオンデマンドの使用量を示します。

{{< img src="account_management/billing/usage-details-v2-07.png" alt="使用量の詳細 - 請求対象" >}}
API ユーザーの場合、エンドポイントを使用して ["All"][2] (すべて) の使用量と ["Billable"][3] (請求対象) の使用量にアクセスできます。

各製品の月内の使用量は、次のように計算されます。

| 製品                   | 説明                                                                                                                |
|--------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| インフラ ホスト             | 当月全時間のすべての個別インフラストラクチャーホストの 99 パーセンタイル値を表示します。                         |
| コンテナ               | 当月全時間のすべての個別コンテナの最高水準値を表示します。                                    |
| APM ホスト                | 当月全時間のすべての個別 APM ホストの 99 パーセンタイル値を表示します。                                    |
| Profiled Hosts           | 当月全時間のすべての個別プロファイル済みホストの 99 パーセンタイル値を表示します。                               |
| Profiled Containers      | 当月全時間のすべての個別プロファイル済みコンテナの平均値を表示します。                                  |
| カスタムメトリクス           | 当月全時間の個別[カスタムメトリクス][4]の平均数を表示します。                               |
| Ingested Custom Metrics  | 当月全時間の個別収集済みカスタムメトリクスの平均数を表示します。                           |
| 収集されたログ            | 当月全時間のすべての収集ログバイト数の合計を表示します。                                                |
| インデックス化されたログ             | 当月全時間のすべてのインデックス化ログイベント数の合計を表示します。                                                |
| スキャンしたログ             | Sensitive Data Scanner によってスキャンされたすべてのログバイトの合計を、当月の全時間にわたって表示します。                       |
| Ingested Span           | 当月全時間のすべての取り込みスパン数の合計を表示します。                                                    |
| Indexed Span            | 当月全時間のインデックス化されたすべての Indexed Spans の合計を表示します。                                             |
| Analyzed Logs (Security) | 当月全時間のすべての分析済みログバイト数の合計を表示します。                                       |
| サーバーレス関数     | 当月各時間に 1 回以上実行された関数の平均数を表示します。              |
| サーバーレス呼び出し   | 当月全時間のすべての呼び出し数の合計を表示します。                                                       |
| Fargate タスク            | 当月全時間のすべての Fargate タスク数の合計を表示します。                                                     |
| Network Hosts            | 当月全時間のすべての個別ネットワークホストの 99 パーセンタイル値を表示します。                                |
| Network Flows            | 当月全時間のインデックス化されたすべてのネットワークフローの合計を表示します。                                             |
| Network Devices          | 当月全時間のすべての個別ネットワークデバイスの 99 パーセンタイル値を表示します。                              |
| Synthetic API テスト      | 当月全時間のすべての Synthetic API テスト数の合計を表示します。                                               |
| Synthetic ブラウザテスト  | 当月全時間のすべての Synthetic ブラウザテスト数の合計を表示します。                                           |
| RUM Sessions             | 当月全時間のすべての個別 RUM セッションの合計を表示します。                                             |
| インシデント管理      | インシデントのライフサイクルとタイムラインを操作した、選択した月のこれまでの一意のアクティブユーザーの数を表示します。     |
| IoT デバイス              | 当月全時間のすべての個別 IoT デバイスの 99 パーセンタイル値を表示します。                                  |


## 使用量の傾向

[Usage Trends][5] セクションには、アカウント内の全組織の使用量の合計を表示する製品使用量グラフが含まれています。使用量レポートは、**Download as CSV** ボタンでダウンロードできます。これらのレポートには、各組織の製品別使用量の 1 時間ごとの内訳が含まれています。

{{< img src="account_management/billing/UsageTrendsOverviewAndCSV.png" alt="Datadog アプリケーションの使用量傾向グラフのページで、CSV としてダウンロードするオプションが強調表示された状態" style="width:100%; align:left" >}}

サブタイプのある製品については、各カテゴリーがその製品のグラフ上で区別されます。

{{< img src="account_management/billing/UsageGraphsByProductTab.png" alt="インフラストラクチャータブを選択した使用量サマリーと、インフラストラクチャー使用量のサブタイプ (インフラホスト、Agent ホスト、コンテナなど) の複数のグラフ" style="width:100%; align:left" >}}

より詳細な製品のサブタイプのグラフは、各製品のタブで見ることができます。例えば、Infrastructure タブでは、ホストタイプ別の内訳を見ることができます。

{{< img src="account_management/billing/UsageBreakdownByProductSubtype.png" alt="Agent ホストと AWS ホストを含む Infra Hosts グラフ、Daily Indexed Live Logs と Cumulative Indexed Live Logs を含む Indexed Logs グラフが表示された Infrastructure タブの使用量傾向セクション" style="width:100%; align:left" >}}

和算ベースの製品では、経時的な累積使用量を確認することができます。

{{< img src="account_management/billing/CumulativeUsageLine.png" alt="取り込みスパンとインデックス化スパンについて、それぞれのスパンの日別・累計のデータをプロットしたグラフ" style="width:100%; align:left" >}}

時間選択では、日、週、月、年単位で使用量グラフを表示するオプションがあります。

{{< img src="account_management/billing/TimeGranularity.png" alt="使用量グラフの時間間隔" style="width:100%; align:left" >}}

破線の `Committed` ラインは、製品ごとのコミットメントを示し、許容範囲 (カスタムメトリクスやコンテナなど) を除いたものです。

{{< img src="account_management/billing/CommittedLine.png" alt="APM Hosts のグラフに値 10 で構成されたコミットされた使用量ライン" style="width:100%; align:left" >}}



## 上位カスタムメトリクス

Custom Metrics タブの Top Custom Metrics テーブルには、当月内使用量と最新の日次使用量 (最終更新日の使用量) の 2 つのビューが表示されます。

"Top 5000" ビューには、上位 5000 のカスタムメトリクスに関する次の情報が表示されます。
* メトリクス名
* 1 時間ごと平均カスタムメトリクス数
* 1 時間ごと最大カスタムメトリクス数
* カスタムメトリクスの使用数全体に対する各メトリクスの貢献率
* 上位 5000 のカスタムメトリクス内のメトリクスを検索します
* このデータは CSV ファイルとしてダウンロードできます。

"All" ビューには、すべてのカスタムメトリクスに関する次の情報が表示されます。
* メトリクス名
* 1 時間ごと平均カスタムメトリクス数
* 1 時間ごと最大カスタムメトリクス数
* すべてのカスタムメトリクス内のメトリクスを検索します
* このデータは、最大 300,000 のカスタムメトリクスを CSV ファイルとしてダウンロードできます。[API エンドポイント][6]を使用すれば、300,000 を超えるカスタムメトリクスをダウンロードできます。


メトリクスの詳細については、目的のメトリクスの行にカーソルを合わせ、右側に表示されるメーターアイコンをクリックして、[Metrics Summary][7] に移動します。

{{< img src="account_management/billing/usage-metrics-05.png" alt="上位カスタムメトリクスの概要テーブル" >}}

## インデックス別ログ使用量

Log Management タブにあるこの表には、インデックス名および保持期間別の時、日、月、年ごとのインデックス化済みのログ使用量が表示されます。以下の情報が含まれます。また、ライブログと[リハイドレートされたログ][8]の内訳も示しています。以下の情報が提供されます。

* インデックス名
* 保持期間（日数）
* インデックス化済みログ数
* 選択した期間のインデックス化済みログの全体的な使用量に対する各メトリクスの貢献率

このデータは CSV ファイルとしてダウンロードできます。

{{< img src="account_management/billing/usage-details-v3-03.png" alt="インデックス別ログ使用量" >}}

## トラブルシューティング

技術的な質問については、[Datadog のサポートチーム][9]にお問い合わせください。

課金に関するご質問は、[カスタマーサクセス][10]マネージャーにお問い合わせください。


[1]: https://app.datadoghq.com/account/usage/hourly
[2]: https://docs.datadoghq.com/ja/api/latest/usage-metering/#get-usage-across-your-multi-org-account
[3]: https://docs.datadoghq.com/ja/api/latest/usage-metering/#get-billable-usage-across-your-account
[4]: /ja/metrics/custom_metrics/
[5]: https://app.datadoghq.com/billing/usage
[6]: https://docs.datadoghq.com/ja/api/latest/usage-metering/#get-all-custom-metrics-by-hourly-average
[7]: https://docs.datadoghq.com/ja/metrics/summary/#overview
[8]: https://docs.datadoghq.com/ja/logs/archives/rehydrating/?tab=awss3#overview
[9]: /ja/help/
[10]: mailto:success@datadoghq.com