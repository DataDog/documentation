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
- **Outliers**: 一部のイベント タイプで特定のタグが異常に頻出する (たとえば errors) ことや、連続メトリクスの値を押し上げる (たとえば latency) タグを指します。 Outliers は、アクティブなクエリと時間範囲に一致するデータをもとに動的に算出されます。

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
    - [Synthetic Monitoring & Testing Explorer][15]
    - [エラー追跡の問題サイドパネル][13]

カルーセルを展開すると、概要が表示されます。最も優先度の高いインサイト (`Insight type`、`State`、`Status`、`Start time`、`Anomaly type` に基づく) が左側に表示されます。

{{< img src="watchdog/log_explorer_watchdog_insights.png" alt="Log Explorer の Watchdog Insights カルーセル。 web-store サービスの新規エラー ログ、および product-recommendation サービスで発生した 2 件のエラー ログのスパイクという 3 つの異常を表示している" style="width:100%;">}}

**View all** をクリックするとパネルが展開されます。右側からサイドパネルが開き、Watchdog Insights の垂直リストが表示されます。各エントリには詳細表示があり、サマリーカードより多くの情報が表示されます。

すべての外れ値には、インタラクションが埋め込まれ、トラブルシューティング情報が記載されたサイドパネルが付属しています。各インサイトのインタラクションとサイドパネルは、Watchdog Insights タイプによって異なります。

### Filter on Insight クエリ

現在の表示を Watchdog Insight に合わせて絞り込むには、Insight サマリー カードの右上にカーソルを合わせます。 2 つのアイコンが表示されるので、ツールチップが **Filter on Insight** になっている逆三角形のアイコンをクリックします。ページが更新され、該当する Insight に対応するエントリーの一覧が表示されます。
**Note**: Watchdog Insights でフィルタリングすると、確認対象のスコープが自動的に変わります。その結果、外れ値の Insight を選ぶと、それがベースラインとして扱われるため表示されなくなります。

{{< img src="watchdog/filter_on_insight.png" alt="インサイトコンテキストでのエクスプローラーのフィルター" style="width:70%;">}}

### 外れ値を共有する

特定の外れ値を共有するには、Insight パネルでその外れ値をクリックして詳細のサイド パネルを開きます。続いて、詳細パネル上部の **Copy Link** ボタンをクリックします。

{{< img src="watchdog/share-outlier.png" alt="リンクをコピーする手順を示す Outlier サイド パネル" style="width:80%;">}}

外れ値へのリンクは、元となるデータの保持期間が過ぎると失効します。たとえば、外れ値の算出に使ったログの保持期間が 15 日の場合、その外れ値へのリンクもログと同じく 15 日で失効します。

## Watchdog Explains でグラフの Insight を調べる
{{< img src="dashboards/graph_insights/watchdog_explains/graph_filter_tag.png" alt="問題のタグ (この例では researcher-query) を除外し、元の状態と、問題のタグを除外した場合にグラフがどう見えるかを比較する" style="width:90%;" >}}

Datadog は、メトリクス、トレース、ログなど、アプリケーションパフォーマンスに関するさまざまなデータを収集し、「何が」「どのように」「なぜ」起こっているのかを明らかにします。Watchdog Explains は、レイテンシー、エラー率、リクエスト数の推移などの大まかなトレンドを分析し、重要なシグナルを検出します。これらのグラフでスパイクが確認された際、Watchdog Explains は次のような重要な疑問を迅速に解明する手助けをします。
- このスパイクの原因は？
- この異常は全体に影響しているのか、それとも単独の事象なのか？

詳細は [Watchdog Explains][14] のドキュメントを参照してください。

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

{{< img src="tracing/trace_explorer/watchdog_insights/latency_outliers_s_card.png" alt="レイテンシー外れ値バナーカード" style="width:30%;" >}}

フルサイドパネルでは、タグとベースラインのレイテンシー分布グラフを見ることができます。X 軸には `p50`、`p75`、`p99`、`max` の増分と、フィールドを含む APM イベントのリストが表示されます。

{{< img src="tracing/trace_explorer/watchdog_insights/latency_outlier_side_panel.png" alt="レイテンシー外れ値フルサイドパネルビュー" style="width:100%;" >}}

{{% /tab %}}
{{% tab "プロファイリング" %}}

### Lock Contention の外れ値

バナーカードビューでは、次のことがわかります。

  * 影響を受けるサービスの名前
  * 影響を受けるスレッドの数
  * 潜在的な CPU の節約 (および推定コスト節約)

{{< img src="watchdog/small_card_profiling_lock_pressure.png" alt="Lock Contention に関する Profiling Insight" style="width:50%;">}}

詳細のサイド パネルでは Lock Contention を解消するための手順を確認できます。

{{< img src="watchdog/side_panel_profiling_lock_pressure.png" alt="Lock Contention の外れ値への対処方法に関する情報がすべて表示されたサイド パネル" style="width:100%;">}}

### ガベージコレクション外れ値

バナーカードビューでは、次のことがわかります。

  * 影響を受けるサービスの名前
  * ガベージ コレクションの実行に使用された CPU 時間

{{< img src="watchdog/small_card_profiling_garbage_collection.png" alt="ガベージコレクションに関するプロファイリングのインサイト" style="width:30%;">}}

フルサイドパネルでは、ガベージコレクションをより適切に構成して CPU 時間を解放する方法を確認できます。

{{< img src="watchdog/side_panel_profiling_garbage_collection.png" alt="Garbage Collection の外れ値への対処方法に関する情報がすべて表示されたサイド パネル" style="width:100%;">}}

### 正規表現コンパイル外れ値

バナーカードビューでは、次のことがわかります。

  * 影響を受けるサービスの名前
  * 正規表現のコンパイルに費やされた CPU 時間

{{< img src="watchdog/small_card_profiling_regex_compilation.png" alt="正規表現コンパイルに関するプロファイリングのインサイト" style="width:30%;">}}

フルサイドパネルでは、正規表現のコンパイル時間を改善する方法や、コード内で改善できる関数の例を確認できます。

{{< img src="watchdog/side_panel_profiling_regex_compilation.png" alt="Regex Compilation の外れ値への対処方法に関する情報がすべて表示されたサイド パネル" style="width:100%;">}}

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

その後、データベース上にオーバーレイが表示され、ピンクのピル型ラベルで各 Insight がハイライトされます。あわせて、何が起きたのかの追加情報も表示されます。

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
[2]: /ja/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals
[3]: /ja/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#monitoring-single-page-applications-spa
{{% /tab %}}
{{% tab "Synthetic Monitoring" %}}

### エラー外れ値

Synthetic Monitoring の Error Outliers は、想定外の挙動やパフォーマンスの逸脱を示します。これらの異常から、あなたの [Synthetic Browser Tests][101] における信頼性の問題を把握できます。 Error Outliers を特定することで、失敗したテスト実行で発生したエラーの原因調査がしやすくなり、デバッグを効率化して Mean Time To Resolution (MTTR) を短縮できます。

失敗したテスト実行を確認すると、失敗したテストに紐づく Error Outliers の数が表示されます。

{{< img src="watchdog/synthetics_watchdog_outlier.png" alt="失敗したブラウザ テストの実行の概要。テスト ステップの詳細と、失敗したテスト ステップの Error Outlier として Watchdog が特定したエラー メッセージが表示されている" style="width:100%;" >}}

Error Outlier のメッセージを確認するには、外れ値をクリックします。続いて、テスト ステップのサイド パネルで **Errors & Warnings** タブをクリックします。

{{< img src="watchdog/outlier_step_error_2.png" alt="Watchdog が失敗したテスト ステップの Error Outlier として特定したエラー メッセージ" style="width:100%;" >}}

[101]: /ja/synthetics/browser_tests

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

その後、関数上にオーバーレイが表示され、ピンクのピル型ラベルで各 Insight がハイライトされます。あわせて、何が起きたのかの追加情報も表示されます。

{{< img src="watchdog/overlay_serverless_insight.png" alt="Watchdog インサイトが関数にオーバーレイされ、何が起きているのかがハイライトされています" style="width:100%;">}}

[1]: /ja/serverless/guide/serverless_warnings/#errors
{{% /tab %}}
{{% tab "Processes" %}}

プロセスエクスプローラーの場合、Watchdog インサイトカルーセルには、プロセスエクスプローラーの現在のコンテキストの[すべてのプロセスの異常][1]が反映されます。

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
[15]: https://app.datadoghq.com/synthetics/explorer