---
aliases:
- /ja/account_management/billing/usage_details/
description: Datadog の全製品にわたる利用状況を、月間累計サマリー、利用傾向、上位のカスタムメトリクス、インデックス別のログ利用量で監視できます。
title: 使用量の詳細
---
{{< callout url="" btn_hidden="true" header="新機能: Bill Overview" respect-site-support="false" >}}
新しい Bill Overview のエクスペリエンスが Limited Availability で提供されており、2026 年 3 月よりすべての組織に自動的な順次展開が開始されます。[詳細はこちら](/account_management/plan_and_usage/bill_overview/)。
{{< /callout >}}

## 概要 {#overview}

管理者は、左下のユーザー名にカーソルを合わせて [Usage][1] ページにアクセスし、以下に移動します。
`Plan & Usage`--> `Usage`.

Usage ページには、製品カテゴリー別にグループ化された利用状況が表示されます。製品タブに移動してその製品カテゴリーに特化した利用状況を表示するか、[All] タブに移動して全製品の利用状況を表示します。各タブには、以下の情報が表示されます。

* 月間累計サマリー
* 全体の利用状況 (現在および過去)

一部の製品タブには、追加のツールも含まれています。

* Custom Metrics タブ: 上位の Custom Metrics
* Log Management タブ: インデックス別のログ利用量

## 月間累計サマリー {#month-to-date-summary}

このセクションでは、月間累計の利用状況をまとめます。[All] タブでは、インフラストラクチャーホスト、コンテナ、カスタムメトリクス、APM ホスト、ログなど、その月に利用したプラットフォームの各機能の月間累計利用状況を確認します。

{{< img src="account_management/billing/usage-details-v2-01.png" alt="利用状況サマリー - All タブ" >}}

製品別のタブでは、その製品カテゴリーに含まれる製品の月間累計利用状況を確認します。

{{< img src="account_management/billing/usage-details-v2-02.png" alt="利用状況サマリー - ネットワーク" >}}

上記の月間累計利用状況は「All」の利用状況であり、製品トライアルなどの請求対象外の利用状況が含まれます。ほとんどのアカウントでは、最終的な請求額に算入される利用状況のみを示す「Billable」の利用状況を確認できます。「Billable」ビューでは、利用状況がコミットメント、割当量、オンデマンド利用分に分類されます。

{{< img src="account_management/billing/UsageTilesWithAllPills.png" alt="利用状況サマリー - Billable" >}}
API ユーザーは、エンドポイントを使用して [All][2] の利用状況と [Billable][3] の利用状況にアクセスします。

各製品の月間累計利用状況は、次のように計算します。

| 製品                   | 説明                                                                                                                |
|--------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| インフラストラクチャーホスト             | 当月の全時間にわたる、すべての個別のインフラストラクチャーホストの 99 パーセンタイルを表示します。                        |
| コンテナ               | 当月の全時間にわたる、すべての個別のコンテナの最大値を表示します。                                   |
| APM ホスト                | 当月の全時間にわたる、すべての個別の APM ホストの 99 パーセンタイルを表示します。                                   |
| プロファイル済みホスト           | 当月の全時間にわたる、すべての個別のプロファイル済みホストの 99 パーセンタイルを表示します。                              |
| プロファイル済みコンテナ      | 当月の全時間にわたる、すべての個別のプロファイル済みコンテナの平均を表示します。                                 |
| Custom Metrics           | 当月の全時間にわたる、個別の[カスタムメトリクス][4]の平均数を表示します。                              |
| 取り込まれた Custom Metrics  | 当月の全時間にわたる、個別の取り込まれたカスタムメトリクスの平均数を表示します。                          |
| 取り込まれたログ            | 当月の全時間にわたる、取り込まれたすべてのログバイトの合計を表示します。                                               |
| インデックスされたログ             | 当月の全時間にわたる、インデックスされたすべてのログイベントの合計を表示します。                                               |
| スキャンされたログ             | 当月の全時間にわたる、Sensitive Data Scanner によってスキャンされたすべてのログバイトの合計を表示します。                      |
| 取り込まれたスパン           | 当月の全時間にわたる、取り込まれたすべてのスパンの合計を表示します。                                                   |
| インデックスされたスパン            | 当月の全時間にわたる、インデックスされたすべてのインデックス済みスパンの合計を表示します。                                            |
| 分析済みログ (セキュリティ) | 当月の全時間にわたる、取り込まれたすべての分析済みログバイトの合計を表示します。                                      |
| Serverless 関数     | 当月の全時間にわたる、1 時間あたり 1 回以上実行された関数の数の平均を表示します。             |
| Serverless 呼び出し   | 当月の全時間にわたる、すべての呼び出しの合計を表示します。                                                      |
| Fargate タスク            | 当月の全時間にわたる、すべての Fargate タスクの合計を表示します。                                                    |
| ネットワークホスト            | 当月の全時間にわたる、すべての個別のネットワークホストの 99 パーセンタイルを表示します。                               |
| ネットワークフロー            | 当月の全時間にわたる、インデックスされたすべてのネットワークフローの合計を表示します。                                            |
| ネットワークデバイス          | 当月の全時間にわたる、すべての個別のネットワークデバイスの 99 パーセンタイルを表示します。                             |
| Synthetic API テスト      | 当月の全時間にわたる、すべての Synthetic API テストの合計を表示します。                                              |
| Synthetic ブラウザテスト  | 当月の全時間にわたる、すべての Synthetic ブラウザテストの合計を表示します。                                          |
| RUM セッション             | 当月の全時間にわたる、すべての個別の RUM セッションの合計を表示します。                                            |
| Incident Management      | 選択した月の現時点までに、インシデントのライフサイクルやタイムラインを操作した個別の有効ユーザー数を表示します。    |
| IoT デバイス              | 当月の全時間にわたる、すべての個別の IoT デバイスの 99 パーセンタイルを表示します。                                 |


## 利用状況の傾向 {#usage-trends}

[Usage Trends][5] セクションには、アカウント内のすべての組織の合計使用量を示す製品使用量グラフが含まれています。使用量レポートは、{{< ui >}}Download as CSV{{< /ui >}} ボタンからダウンロードできます。各組織について、これらのレポートには製品ごとの時間単位の使用量の内訳が含まれています。

{{< img src="account_management/billing/UsageTrendsOverviewAndCSV.png" alt="Datadog アプリケーションの Usage Trends グラフページ。Download as CSV オプションが強調表示されています。" style="width:100%; align:left" >}}

サブタイプを持つ製品については、各カテゴリーがその製品のグラフ上で区別されます。

{{< img src="account_management/billing/UsageGraphsByProductTab.png" alt="インフラストラクチャータブを選択した利用状況サマリー。インフラホスト、Agent ホスト、コンテナなど、インフラストラクチャーの利用状況サブタイプを示す複数のグラフ。" style="width:100%; align:left" >}}

より詳細な製品サブタイプのグラフは、各製品のタブで確認できます。たとえば、ホストタイプ別の内訳は Infrastructure タブで確認できます。

{{< img src="account_management/billing/UsageBreakdownByProductSubtype.png" alt="Infrastructure タブの Usage Trends セクション。Infra Hosts グラフには Agent ホストと AWS ホストが含まれ、Indexed Logs グラフには Daily Indexed Live Logs と Cumulative Indexed Live Logs が含まれます。" style="width:100%; align:left" >}}
 
合計ベースの製品では、時系列での累積使用量を確認できます。

{{< img src="account_management/billing/CumulativeUsageLine.png" alt="Ingested Spans および Indexed Spans のグラフ。それぞれ、各スパンの日次合計と累積合計のデータをプロットします。" style="width:100%; align:left" >}}

時間選択には、使用量グラフを日次、週次、月次、または年次の間隔で表示するオプションが含まれています。

{{< img src="account_management/billing/TimeGranularity.png" alt="使用量グラフの時間間隔" style="width:100%; align:left" >}}

## 課金対象のオンデマンドピルとコミット済みライン {#billable-on-demand-pills-and-committed-lines}

<div class="alert alert-danger">この機能はベータ版です。アクセスをリクエストし、組織が機能の基準を満たしていることを確認するには、アカウント担当者または<a href="https://docs.datadoghq.com/help/">カスタマーサポート</a>にお問い合わせください。</div>

紫色のオンデマンドピルは、課金対象の使用量のうち、オンデマンド使用量である部分をハイライトします。青色の committed および allotted ピルは、コミットメントおよび親製品からの <a href="https://www.datadoghq.com/pricing/allotments/">allotment</a> によってカバーされている使用量の部分をハイライトします。破線の `Committed` ラインは、allotment (Custom Metrics や Containers など) を含まない、製品ごとのコミットメントを示します。

カードに committed および allotted ピルを表示するには、{{< ui >}}See included usage{{< /ui >}} トグルがオンになっていることを確認します。
1. コミット済みおよび割り当て済みの使用量データを表示する合計使用量カードで、目 ({{< ui >}}See included usage{{< /ui >}}) アイコンをクリックします。
1. アイコンが斜線の入った目のアイコンに変わります。カードに committed および allotted ピルが表示されます。

{{< img src="account_management/billing/UsageTilesWithPillsUsageTrendsWithCommittedLine.png" alt="トレンドグラフ上の課金対象のオンデマンドピルとコミット済み使用量のライン" style="width:100%; align:left" >}}


## 上位のカスタムメトリクス {#top-custom-metrics}

Custom Metrics タブの Top Custom Metrics テーブルでは、当月集計の使用量と直近の日次使用量 (最終更新日の使用量など) の 2 つのビューを確認できます。

[Top 5000] ビューでは、上位 5000 個の Custom Metrics に関する以下の情報を提供します。
* メトリクス名
* 1 時間あたりの平均 Custom Metrics
* 1 時間あたりの最大 Custom Metrics
* Custom Metrics の総使用量に対する、このメトリクスの寄与率
* 上位 5000 個の Custom Metrics からメトリクスを検索する
* このデータは CSV ファイルとしてダウンロードできます。

[All] ビューでは、すべてのカスタムメトリクスに関する以下の情報を提供します。
* メトリクス名
* 1 時間あたりの平均 Custom Metrics
* 1 時間あたりの最大 Custom Metrics
* すべてのカスタムメトリクスからメトリクスを検索する
* このデータは CSV ファイルとしてダウンロードできます (最大 300,000 個のカスタムメトリクス)。[API エンドポイント][6]を使用して、300,000 個を超えるカスタムメトリクスをダウンロードできます。


メトリクスの詳細を確認するには、対象のメトリクスの行にマウスオーバーし、右側に表示されるメーターアイコンをクリックして [Metrics Catalog][7] に移動します。

{{< img src="account_management/billing/usage-metrics-05.png" alt="Top Custom Metrics テーブルの概要" >}}

## インデックス別のログ使用量 {#logs-usage-by-index}

Log Management タブのこのテーブルでは、インデックス名と保持期間ごとの、時間単位、日単位、月単位、および年単位のインデックス化されたログの使用量が表示されます。また、ライブログと[リハイドレートされたログ][8]の内訳も表示されます。以下の情報を提供します。

* インデックス名
* 保持期間 (日数)
* インデックス化されたログの件数
* 選択した期間におけるインデックス化されたログの総使用量に対する、このインデックスの割合

このデータは CSV ファイルとしてダウンロードできます。

{{< img src="account_management/billing/usage-details-v3-03.png" alt="インデックス別のログ使用量" >}}

## 初回使用量通知 {#first-time-usage-notifications}

<div class="alert alert-danger">この機能はベータ版です。アクセスをリクエストし、組織が機能の基準を満たしていることを確認するには、アカウント担当者または<a href="https://docs.datadoghq.com/help/">カスタマーサポート</a>にお問い合わせください。</div>

初回使用量通知機能は、現在の契約に含まれていない新しい製品で初めて課金対象の使用量が発生した際に、メール通知を送信します。メールは、特定の月内で初めて使用量が発生してから約 48 時間後に送信されます。

この機能を有効にすると、親組織の {{< ui >}}Plan and Usage{{< /ui >}} ページに新しい {{< ui >}}Usage Notifications{{< /ui >}} タブが追加されます。このタブには、本機能の対象となるすべての製品のリストが表示されます。チェックボックスをオフにすると、アカウント内のすべてのユーザーに対して、その製品の通知が停止されます。直近の有効な契約外で初回使用量が検出された場合、チェックが外されている製品については、ユーザーに通知が送信されません。

{{< img src="account_management/plan_and_usage/usage-notifications.png" alt="初回使用量通知ページ (チェック済みおよび未チェックの項目を含む製品リスト)" style="width:100%; align:left" >}}

_Usage Notifications Read_ または _Write_ 権限を持つすべてのユーザーがメールを受信します。ほとんどの組織において、これはすべての管理者を意味します。

Datadog アカウントがマルチ組織である場合、権限を持つ親組織のユーザーは、子組織での使用量に関するメール通知を受信します。これらのメールには、どの子組織でその使用量が発生したか、およびどの製品に対して使用量が発生したかが示されます。この権限を持つ子組織のユーザーは、自身の組織に関するメールのみを受信します。

{{< img src="account_management/plan_and_usage/usage-notifications-email.png" alt="初回使用量通知メール (初回使用量のサンプルの詳細付き)" style="width:100%; align:left" >}}

## トラブルシューティング{#troubleshooting}

技術的な質問については、[Datadog のサポートチーム][9]にお問い合わせください。

請求に関するご質問は、[カスタマーサクセス][10]マネージャーにお問い合わせください。


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
[11]: /ja/account_management/plan_and_usage/bill_overview/