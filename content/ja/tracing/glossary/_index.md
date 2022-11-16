---
aliases:
- /ja/tracing/terminology/
- /ja/tracing/faq/what-is-the-difference-between-type-service-resource-and-name
- /ja/tracing/visualization/
further_reading:
- link: /tracing/trace_collection/
  tag: ドキュメント
  text: アプリケーションで APM トレースをセットアップする方法
- link: /tracing/services/services_list/
  tag: ドキュメント
  text: Datadog に報告するサービスの一覧
- link: /tracing/services/service_page/
  tag: ドキュメント
  text: Datadog のサービスについて
- link: /tracing/services/resource_page/
  tag: ドキュメント
  text: リソースのパフォーマンスとトレースの詳細
- link: /tracing/trace_explorer/trace_view/
  tag: ドキュメント
  text: Datadog トレースの読み方を理解する
kind: documentation
title: APM の用語と概念
---

{{< jqmath-vanilla >}}

APM UI には、アプリケーションのパフォーマンスをトラブルシューティングし、これを製品全体で関連付けるための多くのツールが用意されています。これは、分散されたシステムの問題を見つけて解決するのに役立ちます。

| コンセプト                         | 説明                                                                                                                                                                                                          |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [サービス](#services)            | サービスは、最新のマイクロサービスアーキテクチャの構成要素です。サービスは、アプリケーションを構築する目的で、エンドポイント、クエリ、またはジョブを広くグループ化します。                                  |
| [リソース](#resources)          | リソースは、顧客アプリケーションの特定のドメインを表します。通常、これはインスツルメントされたウェブエンドポイント、データベースクエリ、またはバックグラウンドジョブです。                                                              |
| [モニター][1]                   | APM メトリクスモニターは、通常のメトリクスモニターと同様に機能しますが、APM 専用に調整されたコントロールを備えています。このモニターを使用して、ヒット、エラー、さまざまなレイテンシー測定に関するサービスレベルでアラートを受信します。 |
| [トレース](#trace)                 | トレースは、アプリケーションがリクエストを処理するのにかかった時間とこのリクエストのステータスを追跡するために使用されます。各トレースは、1 つ以上のスパンで構成されます。                                                             |
| [スパン](#spans)                  | スパンは、特定の期間における分散システムの論理的な作業単位を表します。複数のスパンでトレースが構成されます。                                                                                          |
| [サービスエントリスパン](#service-entry-span) | スパンとは、サービスへのリクエストに対するエントリーポイントメソッドとなるサービスエントリスパンを指します。フレームグラフ上の直属の親のカラーが異なる場合、この値を Datadog APM 内で可視化することができます。                                                                                            |
| [トレースルートスパン](#trace-root-span) | スパンがトレースのエントリポイントになる場合、ルートスパンとなります。そのスタートは、トレースの開始を示します |
| [トレースメトリクス](#trace-metrics) | トレースメトリクスは自動的に収集され、他の [Datadog メトリクス][2]と同様の 15 か月の保持ポリシーで保持されます。これを使用して、ヒット、エラー、またはレイテンシーを特定し、アラートを発信することができます。統計およびメトリクスは、常に_すべての_トレースに基づき算出されるため、Ingestion controls による影響を受けません。                       |
| [Indexed Span](#indexed-span) | Indexed Span は、Retention Filter またはレガシー版の App Analytics で分析されたスパンによりインデックスされたすべてのスパンを表し、*Analytics* での検索、クエリ、監視に使用することができます。                                                                                                |
| [スパンタグ](#span-tags)         | *Trace View* でリクエストを関連付けたり、*Analytics* でフィルターしたりするためのキーと値のペアの形式のタグスパン。                                                                                                    |
| [Retention Filters](#retention-filters) | Retention Filter は Datadog UI 内に設定されたタグベースのコントロールで、15 日間にわたって Datadog でインデックスするスパンの種類を決定します。                                                                                              |
| [Ingestion Controls](#ingestion-controls) | Ingestion controls は Datadog に最大 100% のトレースを送信し、 15 分間の Live Search および分析を行う際に使用されます。
| [サブレイヤーメトリクス](#sublayer-metric) | サブレイヤーメトリクスはトレース内における任意のタイプ / サービスの実行時間を指します。
| [実行時間](#execution-time) | スパンが 'active' と判断される合計時間 (子スパンの完了まで待機しません) 。

## サービス

[アプリケーションのインスツルメンテーション][3]の後、[サービス一覧画面][4]が APM データのメインランディングページになります。

{{< img src="tracing/visualization/service_list.png" alt="サービス一覧画面" >}}

サービスは、最新のマイクロサービスアーキテクチャの構成要素です。サービスは、インスタンスをスケーリングする目的で、エンドポイント、クエリ、またはジョブを広くグループ化します。以下はその例です。

* URL エンドポイントのグループは、API サービスの下でグループ化できます。
* 1 つのデータベースサービス内でグループ化された DB クエリのグループ。
* crond サービスで構成された定期的なジョブのグループ。

以下のスクリーンショットは、e コマースサイトビルダー向けのマイクロサービス分散システムです。`web-store`、`ad-server`、`payment-db`、`auth-service` はすべて、APM のサービスとして表されます。

{{< img src="tracing/visualization/service_map.png" alt="サービスマップ" >}}

すべてのサービスは[サービス一覧画面][4]にあり、[サービスマップ][5]に視覚的に表示されます。各サービスには独自の[サービス詳細画面][6]があり、スループット、レイテンシー、エラー率などの[トレースメトリクス](#trace-metrics)を表示および検査できます。これらのメトリクスを使用して、ダッシュボードウィジェットの作成、モニターの作成、およびサービスに属するウェブエンドポイントやデータベースクエリなどのすべてのリソースのパフォーマンスの確認を行います。

{{< img src="tracing/visualization/service_page.mp4" video="true" alt="サービス詳細画面" >}}

<div class="alert alert-info">
サービス詳細画面に期待していた HTTP エンドポイントが表示されませんか？APM では、エンドポイントはサービス名以上でサービスに接続されます。また、トレースのエントリポイントスパンの `span.name` を使用して行われます。たとえば、上記のウェブストアサービスでは、`web.request` がエントリポイントスパンです。詳細については<a href="/tracing/faq/resource-trace-doesn-t-show-up-under-correct-service/">こちら</a>をご覧ください。
</div>

## リソース

リソースは、顧客アプリケーションの特定のドメインを表します。通常は、インスツルメントされたウェブエンドポイント、データベースクエリ、またはバックグラウンドジョブです。ウェブサービスの場合、これらのリソースは、静的なスパン名 `web.request` でグループ化された動的なウェブエンドポイントの場合があります。データベースサービスでは、スパン名が `db.query` のデータベースクエリになります。たとえば、`web-store` サービスには、チェックアウト、updateing_carts、add_item などを処理するリソース（ウェブエンドポイント）が自動的にインスツルメントされています。各リソースには、特定のエンドポイントにスコープされた[トレースメトリクス](#trace-metrics)を持つ独自の[リソースステータス画面][7]があります。トレースメトリクスは、他の Datadog メトリクスと同様に使用できます。ダッシュボードにエクスポートしたり、モニター作成に使用したりできます。リソースステータス画面には、すべての[トレース](#trace)の[スパン](#spans)の集約ビュー、リクエストのレイテンシー分布、およびこのエンドポイントに対して行われたリクエストを示すトレースを含むスパンサマリーウィジェットも表示されます。

{{< img src="tracing/visualization/resource_page.mp4" video="true" alt="リソースステータス画面" >}}

## トレース

トレースは、アプリケーションがリクエストを処理するのにかかった時間とこのリクエストのステータスを追跡するために使用されます。各トレースは、1 つ以上のスパンで構成されます。リクエストの存続期間中、サービス全体の分散呼び出し（[HTTP ヘッダーを介して trace-id が挿入/抽出される][8]ため）、[自動的にインスツルメントされたライブラリ][3]、[OpenTracing][10] などのオープンソースツールを使用した[手動インスツルメンテーション][9]をフレームグラフビューで見ることができます。トレースビューページで、各トレースは、[ログをトレースに接続する][11]、[タグをスパンに追加する][12]、[ランタイムメトリクスを収集する][13]など、プラットフォームの他の部分に接続する情報を収集します。

{{< img src="tracing/visualization/trace_view.png" alt="トレースビュー" >}}

## スパン

スパンは、特定の期間におけるシステム内の論理的な作業単位を表します。各スパンは、`span.name`、開始時間、期間、および[スパンタグ](#span-tags)で構成されます。たとえば、スパンは、別のマシンでの分散呼び出しに費やされた時間、または大きなリクエスト内の小さなコンポーネントに費やされた時間を表すことができます。スパンは相互にネストでき、これによりスパン間に親子関係が作られます。

以下の例では、スパン `rack.request` はトレースのエントリーポイントスパンです。これは、ウェブストアのサービス詳細画面が `rack.request` という名前のエントリーポイントスパンを持つトレースで構成されるリソースを表示していることを意味します。この例では、アプリケーション側に追加されたタグ（`merchant.store_name` や `merchant.tier` など）も示されています。これらのユーザー定義のタグは、[Analytics][14] で APM データを検索、分析するために使用できます。

{{< img src="tracing/visualization/span_with_metadata.png" alt="スパン" >}}

### サービスエントリスパン

スパンとは、サービスへのリクエストに対するエントリーポイントメソッドとなるサービスエントリスパンを指します。フレームグラフ上の直属の親のカラーが異なる場合、この値を Datadog APM 内で可視化することができます。フレームグラフ画面の右側にはサービスの一覧も表示されます。

### トレースルートスパン

スパンがトレースの最初のスパンになる場合、トレースルートスパンとなります。ルートスパンは、トレースされたリクエストのエントリポイントメソッドです。そのスタートは、トレースの開始を示します。

以下の例における**サービスエントリスパン**は次の通りです。
- `rack.request` (_ルートスパン_でもある)
- `aspnet_coremvc.request`
- 以下で最上位にある緑色のスパン `aspnet_coremvc.request`
- オレンジ色の各 `mongodb` スパン

{{< img src="tracing/visualization/toplevelspans.png" alt="スパン" >}}

## スパンサマリー

スパンサマリーテーブルには、すべてのトレースでスパンが表示される頻度、トレースの何パーセントにスパンが含まれるか、スパンの平均期間、リクエストの合計実行時間の一般的な割合など、すべてのトレースで集計されたスパンのメトリクスが表示されます。これにより、コード内の N+1 問題を検出し、アプリケーションのパフォーマンスを向上させることができます。


スパンサマリーテーブルは、サービスエントリースパンを含むリソースにのみ利用可能です。


スパンサマリーテーブルには、以下の列が含まれます。

Average spans per trace
: スパンが少なくとも 1 回存在する、現在のリソースを含むトレースのスパンの平均発生回数。

Percentage of traces
: スパンが少なくとも 1 回存在する現在のリソースを含むトレースの割合。

Average duration
: スパンが少なくとも 1 回存在する、現在のリソースを含むトレースのスパンの平均期間。

Average percentage of execution time
: スパンが少なくとも 1 回存在する、現在のリソースを含むトレースについて、スパンがアクティブだった実行時間の平均比率。

{{< img src="tracing/visualization/span-summary.png" alt="スパンサマリーテーブル" >}}

## トレースメトリクス

[トレースメトリクス][15]は自動的に収集され、他の [Datadog メトリクス][2]と同様の 15 か月の保持ポリシーで保持されます。これを使用して、ヒット、エラー、またはレイテンシーを特定し、アラートを発信することができます。トレースメトリクスは、サービスまたはリソースとともにトレースを受信するホストによってタグ付けされます。たとえば、ウェブサービスをインスツルメントした後、[Metric Summary][16] のエントリポイントスパン `web.request` のトレースメトリクスが収集されます。

{{< img src="tracing/visualization/trace_metrics.mp4" video="true" alt="トレースメトリクス" >}}

### ダッシュボード  

トレースメトリクスは、*Service* または *Resource* ページからダッシュボードにエクスポートできます。さらに、既存のダッシュボードからトレースメトリクスを照会できます。

{{< img src="tracing/visualization/trace_metric_dashboard.mp4" video="true" alt="トレースメトリクスダッシュボード" >}}

### モニタリング

トレースメトリクスは、監視に役立ちます。APM モニターは、[New Monitors][17]、[Service][6]、または [Resource][7] ページで設定できます。推奨されるモニターのセットは、[Service][6] または [Resource][7] ページで利用できます。

{{< img src="tracing/visualization/trace_metric_monitor.mp4" video="true" alt="トレースメトリクスモニター" >}}

## トレースエクスプローラー

15 分間で収集されたトレースの 100% および 15 日間におけるすべての [Indexed Span](#indexed-span) の[探索および分析を実行][14]します。

## Indexed Span

Indexed Span は、Datadog に 15 日間保管された [Retention Filter](#Retention Filters) でインデックスされたスパンを表し、スパンに含まれる[タグ](#スパンタグ)による[トレース検索および Analytics][14] での検索、クエリ、監視に使用することができます。

<div class="alert alert-info">
取り込み後に<a href="https://app.datadoghq.com/apm/traces/retention-filters">タグベースの Retention Filter</a> を作成して、サービスごとにインデックス化されたスパンの正確な数を制御および可視化することができます。
</div>

## スパンタグ

*Trace View* でリクエストを関連付けたり、*Analytics* でフィルターしたりするためのキーと値のペアの形式のタグスパン。タグは、単一のスパンに追加することも、すべてのスパンにグローバルに追加することもできます。以下の例では、リクエスト（`merchant.store_name` や `merchant.tier` など）がタグとしてスパンに追加されています。

{{< img src="tracing/visualization/span_tag.png" alt="スパンタグ" >}}

アプリケーションのスパンをタグ付けするには、この[チュートリアル][12]をご覧ください。

タグがスパンに追加されたら、タグをクリックして[ファセット][18]として追加し、Analytics でタグを検索およびクエリします。これが完了すると、このタグの値はすべての新しいトレースに保存され、検索バー、ファセットパネル、トレースグラフクエリで使用できます。

{{< img src="tracing/app_analytics/search/create_facet.png" style="width:50%;" alt="ファセットの作成"  style="width:50%;">}}

## Retention Filters

Datadog UI で[タグベースのフィルター][19]を設定して 15 日間のスパンをインデックスし、[トレース検索と Analytics](#trace-search-and-analytics) で使用できるようにします。

## Ingestion controls

サービスから Datadog に[トレースの 100% を送信][20]し、[タグベースの Retention Filter](#Retention Filters) と結合させて 15 日間で最もビジネス的に重要なトレースを維持します。

## サブレイヤーメトリクス

[トレーシングアプリケーションメトリクス][15]を `sublayer_service` と `sublayer_type` でタグ付けし、トレース内のサービスの実行時間を個別に確認することもできます。

サブレイヤーメトリクスは、サービスが下流に依存する場合にのみ利用可能です。

## 実行時間

実行時間は、あるスパンがアクティブである時間、つまり子スパンを持たない時間を合計して計算されます。非同期の作業では、これは簡単です。下図では、スパン 1 の実行時間は $\D1 + \D2 + \D3$ となります。スパン 2 とスパン 3 の実行時間は、それぞれの幅になります。

{{< img src="tracing/visualization/execution-time1.png" style="width:50%;" alt="実行時間" >}}

子スパンが同時進行する場合、実行時間は重複する時間を同時進行するスパンの数で割って計算されます。下図の場合、スパン 2 とスパン 3 は同時進行で (どちらもスパン 1 の子スパン)、スパン 3 の時間だけ重なっているため、スパン 2 の実行時間は $\D2 ÷ 2 + \D3$、スパン 3 の実行時間は $\D2 ÷ 2$ となります。

{{< img src="tracing/visualization/execution-time2.png" style="width:50%;" alt="同時進行作業の実行時間" >}}

## {{< partial name="whats-next/whats-next.html" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/monitors/create/types/apm/
[2]: /ja/developers/guide/data-collection-resolution-retention/
[3]: /ja/tracing/setup/
[4]: /ja/tracing/services/services_list/
[5]: /ja/tracing/services/services_map/
[6]: /ja/tracing/services/service_page/
[7]: /ja/tracing/services/resource_page/
[8]: /ja/tracing/opentracing/java/#create-a-distributed-trace-using-manual-instrumentation-with-opentracing
[9]: /ja/tracing/manual_instrumentation/
[10]: /ja/tracing/opentracing/
[11]: /ja/tracing/other_telemetry/connect_logs_and_traces/
[12]: /ja/tracing/guide/add_span_md_and_graph_it/
[13]: /ja/tracing/metrics/runtime_metrics/
[14]: /ja/tracing/trace_explorer/
[15]: /ja/tracing/metrics/metrics_namespace/
[16]: https://app.datadoghq.com/metric/summary
[17]: https://app.datadoghq.com/monitors#/create
[18]: /ja/tracing/trace_explorer/query_syntax/#facets
[19]: /ja/tracing/trace_pipeline/trace_retention/#retention-filters
[20]: /ja/tracing/trace_pipeline/ingestion_controls/