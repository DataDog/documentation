---
description: Watchdog Insights で検索クエリに一致する異常値や外れ値を表示します。
further_reading:
- link: /logs/explorer/watchdog_insights/
  tag: ドキュメント
  text: ログ用 Watchdog Insights
- link: /real_user_monitoring/explorer/watchdog_insights/
  tag: ドキュメント
  text: RUMのWatchdog Insights
- link: https://www.datadoghq.com/blog/datadog-watchdog-insights-log-management/
  tag: ブログ
  text: Watchdog Insights によるトラブルシューティングの拡張
- link: https://www.datadoghq.com/blog/watchdog-insights-apm/
  tag: ブログ
  text: Watchdog Insights for APM でエラーとレイテンシーのパターンを自動検出する
title: Watchdog Insights
---

## 概要

インシデントの調査には、試行錯誤が必要です。特定の分野に精通したエンジニアは、その経験をもとに、まずどこに潜在的な問題があるのかを知っています。Watchdog Insights を使うことで、経験の浅いエンジニアも含め、すべてのエンジニアが最も重要なデータに注意を払い、インシデント調査を加速させることができます。

Datadog の大半を通して、Watchdog は以下の 2 種類のインサイトを返します。

- **異常**: Watchdog が組織のデータをスキャンして見つけた、アクティブな検索クエリに一致するすべての事前計算された [Watchdog アラート][11]。[Watchdog アラートエクスプローラー][12]で全リストにアクセスできます。
- **Outliers**: Tags that appear too frequently in some event types (for example, errors) or drive some continuous metrics upwards (for example, latency).  Outliers are dynamically calculated on the data matching the active query and the time frame.

{{< img src="logs/explorer/watchdog_insights/insights-for-log-explorer.png" alt="Watchdog Insights のバナーと 5 つのログ異常が表示されたログエクスプローラー" style="width:100%;" >}}

## インサイトの確認

Watchdog Insights のカルーセルは、以下の製品ページの上部付近にあります。

- [ログエクスプローラー][1]
- APM:
    - [トレースエクスプローラー][2]
    - [サービス詳細画面][3]
    - [リソースステータス画面][4]
    - [データベースエクスプローラー][5]
    - [プロファイルエクスプローラー][6]
- インフラストラクチャー:
    - [プロセスエクスプローラー][7]
    - [サーバーレスエクスプローラー][8]
    - [Kubernetes エクスプローラー][9]
- [リアルユーザーモニタリング (RUM) エクスプローラー][10]
- [エラー追跡の問題サイドパネル][13]

カルーセルを展開すると、概要が表示されます。最も優先度の高いインサイト (`Insight type`、`State`、`Status`、`Start time`、`Anomaly type` に基づく) が左側に表示されます。

{{< img src="watchdog/log_explorer_watchdog_insights.png" alt="ログエクスプローラーの Watchdog Insights カルーセルには、Web ストアサービスの新しいエラーログ、商品レコメンドサービスのエラーログの急増、商品レコメンドサービスのエラーログの別の急増の 3 つの異常が表示されています" style="width:100%;">}}

**View all** をクリックするとパネルが展開されます。右側からサイドパネルが開き、Watchdog Insights の垂直リストが表示されます。各エントリには詳細表示があり、サマリーカードより多くの情報が表示されます。

すべての外れ値には、インタラクションが埋め込まれ、トラブルシューティング情報が記載されたサイドパネルが付属しています。各インサイトのインタラクションとサイドパネルは、Watchdog Insights タイプによって異なります。

### Filter on Insight クエリ

To refine your current view to match a Watchdog Insight, hover over the top right corner of an Insight summary card. Two icons appear. Click on the inverted triangle icon with the tooltip **Filter on Insight**. The page refreshes to show a list of entries corresponding to the insight.
**Note**: Filtering on Watchdog Insights automatically changes the scope you're looking at. As a result, if you select an outlier insight, it is no longer visible, as it is treated as the baseline.

{{< img src="watchdog/filter_on_insight.png" alt="インサイトコンテキストでのエクスプローラーのフィルター" style="width:70%;">}}

### Share an outlier

To share a given outlier, click on it in the insight panel to open the details side panel. Click the **Copy Link** button at the top of the details panel:

{{< img src="watchdog/share-outlier.png" alt="Outlier side panel showing how to copy the link" style="width:80%;">}}

The link to the outlier expires with the retention of the underlying data. For instance, if the logs used to build the outlier are retained for 15 days, the link to the outlier expires with the logs after 15 days.

## Explore graph insights with Watchdog explains
{{< img src="dashboards/graph_insights/watchdog_explains/graph_filter_tag.png" alt="Filter out the offending tag, in this case researcher-query, to compare the original against what the graph would look like without the offending tag" style="width:90%;" >}}
Datadog collects various types of data to provide insights into application performance, including metrics, traces, and logs, which tell you what, how, and why something is happening. Watchdog Explains analyzes high-level trends such as latency, error rates, or request count evolution to detect critical signals. Upon observing a spike in these graphs, Watchdog Explains helps you investigate the immediate questions:
- What is the source of the spike?
- Does this anomaly affect everyone or is an isolated incident?

For more information, see the [Watchdog Explains][14] documentation.

## 外れ値タイプ

{{< tabs >}}
{{% tab "ログ管理" %}}

### エラー外れ値

エラー外れ値は、現在のクエリに一致するエラーの特性を含む[ファセットタグまたは属性][1]などのフィールドを表示します。エラー間で統計的に過大評価されている `key:value` ペアは、問題の根本原因へのヒントになります。

典型的なエラー外れ値の例として、`env:staging`、`docker_image:acme:3.1`、`http.useragent_details.browser.family:curl` が挙げられます。

バナーカードビューでは、次のことがわかります。

  * フィールド名
  * フィールドが寄与するエラーと全体的なログの割合

{{< img src="logs/explorer/watchdog_insights/error_outlier_s_card.png" alt="エラー全体の 73.3% を占める赤いバーと、8.31% を占める青いバーを示すエラー外れ値カード" style="width:50%;" >}}

フルサイドパネルビューでは、次のことがわかります。

  * フィールドを含むエラーログの時系列
  * エラーログに関連付けられることが多いタグ
  * [ログパターン][2]の包括的なリスト

{{< img src="logs/explorer/watchdog_insights/error_outlier_side_panel.png" alt="エラー外れ値サイドパネル" style="width:100%;" >}}

[1]: /ja/logs/explorer/facets/
[2]: /ja/logs/explorer/analytics/patterns
{{% /tab %}}
{{% tab "APM" %}}

APM の外れ値は、Watchdog Insights カルーセルが利用可能なすべての APM ページで利用できます。
 - [トレースエクスプローラー](/tracing/trace_explorer/?tab=listview)
 - [サービス詳細画面](/tracing/services/service_page/)
 - [リソースステータス画面](/tracing/services/resource_page/)

### エラー外れ値

エラー外れ値は、現在のクエリに一致するエラーの特性を含むタグなどのフィールドを表示します。エラー間で統計的に過大評価されている `key:value` ペアは、問題の根本原因へのヒントになります。

典型的なエラー外れ値には、`env:staging`、`availability_zone:us-east-1a`、`cluster_name:chinook`、`version:v123456` などがあります。

バナーカードビューでは、次のことがわかります。

  * フィールド名
  * フィールドが寄与するエラーと全体的なトレースの割合

{{< img src="tracing/trace_explorer/watchdog_insights/error_outlier_s_card.png" alt="エラー全体の 24.2% を占める赤いバーと、12.1% を占める青いバーを示すエラー外れ値カード" style="width:30%;" >}}

フルサイドパネルビューでは、次のことがわかります。

  * フィールドを含むエラートレースの時系列
  * エラートレースに関連付けられることが多いタグ
  * 関連するエラー追跡の問題と失敗スパンの包括的なリスト

{{< img src="tracing/trace_explorer/watchdog_insights/error_outlier_side_panel.png" alt="エラー外れ値サイドパネル" style="width:100%;" >}}

### レイテンシー外れ値

レイテンシー外れ値は、現在の検索クエリに一致する、パフォーマンスのボトルネックに関連付けられているタグなどのフィールドを表示します。ベースラインよりもパフォーマンスが悪い `key:value` ペアは、APM スパンのサブセット間のパフォーマンスのボトルネックへのヒントになります。

レイテンシー外れ値は、スパン期間に対して計算されます。

バナーカードビューでは、次のことがわかります。

* フィールド名
* タグを含むスパンのレイテンシー分布と残りのデータのベースライン
* 外れ値タグの対象レイテンシー値のパーセンタイルと、残りのデータのベースラインとの差

{{< img src="tracing/trace_explorer/watchdog_insights/latency_outliers_s_card.png" alt="Latency Outlier banner card" style="width:30%;" >}}

フルサイドパネルでは、タグとベースラインのレイテンシー分布グラフを見ることができます。X 軸には `p50`、`p75`、`p99`、`max` の増分と、フィールドを含む APM イベントのリストが表示されます。

{{< img src="tracing/trace_explorer/watchdog_insights/latency_outlier_side_panel.png" alt="レイテンシー外れ値フルサイドパネルビュー" style="width:100%;" >}}

{{% /tab %}}
{{% tab "プロファイリング" %}}

### Lock contention outlier

バナーカードビューでは、次のことがわかります。

  * 影響を受けるサービスの名前
  * 影響を受けるスレッドの数
  * 潜在的な CPU の節約 (および推定コスト節約)

{{< img src="watchdog/small_card_profiling_lock_pressure.png" alt="Profiling insight on Lock Contention" style="width:50%;">}}

In the full side panel, you can see instructions on how to resolve the lock contention:

{{< img src="watchdog/side_panel_profiling_lock_pressure.png" alt="Side panel with all the information on how to address the Lock Contention outlier" style="width:100%;">}}

### ガベージコレクション外れ値

バナーカードビューでは、次のことがわかります。

  * 影響を受けるサービスの名前
  * The amount of CPU time used to perform garbage collection

{{< img src="watchdog/small_card_profiling_garbage_collection.png" alt="ガベージコレクションに関するプロファイリングのインサイト" style="width:30%;">}}

フルサイドパネルでは、ガベージコレクションをより適切に構成して CPU 時間を解放する方法を確認できます。

{{< img src="watchdog/side_panel_profiling_garbage_collection.png" alt="Side panel with all the information on how to address the Garbage Collection outlier" style="width:100%;">}}

### 正規表現コンパイル外れ値

バナーカードビューでは、次のことがわかります。

  * 影響を受けるサービスの名前
  * The amount of CPU time spent on compiling regexes

{{< img src="watchdog/small_card_profiling_regex_compilation.png" alt="正規表現コンパイルに関するプロファイリングのインサイト" style="width:30%;">}}

フルサイドパネルでは、正規表現のコンパイル時間を改善する方法や、コード内で改善できる関数の例を確認できます。

{{< img src="watchdog/side_panel_profiling_regex_compilation.png" alt="Side panel with all the information on how to address the Regex Compilation outlier" style="width:100%;">}}

{{% /tab %}}
{{% tab "データベース" %}}

Database Monitoring では、Watchdog は以下のメトリクスに関するインサイトを表面化します。

- `CPU`
- `Commits `
- `IO`
- `Background`
- `Concurrency`
- `Idle`

インサイトカルーセルを使用して、1 つまたは複数の外れ値の影響を受けたデータベースを発見します。

{{< img src="watchdog/side_panel_dbm_insights.png" alt="インサイトでデータベースをフィルターするカルーセル" style="width:100%;">}}

そして、データベースにオーバーレイが設定され、さまざまなインサイトをハイライトするピンクの錠剤が表示され、何が起こったかを詳細に確認することができます。

{{< img src="watchdog/overlay_database_insight.png" alt="Watchdog インサイトがデータベースにオーバーレイされ、何が起きているのかがハイライトされています" style="width:100%;">}}

{{% /tab %}}
{{% tab "RUM" %}}

### エラー外れ値

エラー外れ値は、現在の検索クエリに一致するエラーの特徴を含む[ファセット化されたタグまたは属性][3]のようなフィールドを表示します。エラーの中で統計的に多く出現する `key:value` のペアは、問題の根本的な原因を探るヒントを与えてくれます。エラーの外れ値の典型的な例としては、`env:staging` や `version:1234`、`browser.name:Chrome` などがあります。

バナーカードビューでは、次のことがわかります。

* フィールド名
* フィールドが寄与する総エラーと全体的な RUM イベントの割合
* 関連タグ

フルサイドパネルでは、そのフィールドを含む RUM エラーの総数に関する時系列グラフと、影響度を示す円グラフおよびそのフィールドを含む RUM イベントのリストが表示されます。

{{< img src="real_user_monitoring/explorer/watchdog_insights/error_outlier_side_panel-1.png" alt="エラー外れ値フルサイドパネル" style="width:100%;" >}}

### レイテンシー外れ値

レイテンシー外れ値は、現在の検索クエリに一致する、パフォーマンスのボトルネックに関連付けられている[ファセットタグまたは属性][1]などのフィールドを表示します。ベースラインよりもパフォーマンスが悪い `key:value` ペアは、実際のユーザーのサブセット間のパフォーマンスのボトルネックへのヒントになります。

レイテンシー外れ値は、First Contentful Paint、First Input Delay、Cumulative Layout Shift などの [Core Web Vitals][2]、および [Loading Time][3] に対して計算されます。詳しくは、[ページのパフォーマンスの監視][2]をご覧ください。

バナーカードビューでは、次のことがわかります。

* フィールド名
* フィールドと残りのデータのベースラインを含むパフォーマンスメトリクス値

フルサイドパネルでは、パフォーマンスメトリクスに関する時系列グラフが表示されます。X 軸には `p50`、`p75`、`p99`、`max` の増分と、フィールドを含む RUM イベントのリストが表示されます。

{{< img src="real_user_monitoring/explorer/watchdog_insights/latency_outlier_side_panel-1.png" alt="レイテンシー外れ値フルサイドパネルビュー" style="width:100%;" >}}

[1]: /ja/real_user_monitoring/explorer/search/#facets
[2]: /ja/real_user_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals
[3]: /ja/real_user_monitoring/browser/monitoring_page_performance/#monitoring-single-page-applications-spa
{{% /tab %}}
{{% tab "サーバーレス" %}}

サーバーレスインフラストラクチャーに対して、Watchdog は以下のようなインサイトを提示します。

- `Cold Start Ratio Up/Down`
- `Error Invocation Ratio Up/Down`
- `Memory Usage Up/Down`
- `OOM Ratio Up/Down`
- `Estimated Cost Up/Down`
- `Init Duration Up/Down`
- `Runtime Duration Up/Down`

インサイトカルーセルを使用して、1 つまたは複数の外れ値の影響を受けたサーバーレス関数を発見します。

{{< img src="watchdog/side_panel_serverless_facet_insights.png" alt="インサイトでサーバーレス関数をフィルターするファセット" style="width:30%;">}}

An overlay is then set on the function, with pink pills highlighting the different insights and giving more information about what happened.

{{< img src="watchdog/overlay_serverless_insight.png" alt="Watchdog インサイトが関数にオーバーレイされ、何が起きているのかがハイライトされています" style="width:100%;">}}

[1]: /ja/serverless/guide/serverless_warnings/#errors
{{% /tab %}}
{{% tab "Processes" %}}

For Process Explorer, the Watchdog Insight carousel reflects [all Process anomalies][1] for the current context of the Process Explorer.

[1]: https://app.datadoghq.com/process
{{% /tab %}}
{{% tab "Kubernetes" %}}

Kubernetes エクスプローラーの場合、Watchdog インサイトカルーセルには、Kubernetes エクスプローラーの現在のコンテキストの[すべての Kubernetes の異常][1]が反映されます。

[1]: https://app.datadoghq.com/orchestration/overview/pod
{{% /tab %}}
{{< /tabs >}}


## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs
[2]: https://app.datadoghq.com/apm/traces
[3]: /ja/tracing/services/service_page/
[4]: /ja/tracing/services/resource_page/
[5]: https://app.datadoghq.com/databases/list
[6]: https://app.datadoghq.com/profiling/explorer
[7]: https://app.datadoghq.com/process
[8]: https://app.datadoghq.com/functions
[9]: https://app.datadoghq.com/orchestration/overview/pod
[10]: https://app.datadoghq.com/rum/sessions?query=%40type%3Aview
[11]: /ja/watchdog/#overview
[12]: https://app.datadoghq.com/watchdog
[13]: https://app.datadoghq.com/rum/error-tracking
[14]: /ja/dashboards/graph_insights/watchdog_explains