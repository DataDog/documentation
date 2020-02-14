---
title: APM 用語集とチュートリアル
kind: documentation
aliases:
  - /ja/tracing/terminology/
  - /ja/tracing/faq/what-is-the-difference-between-type-service-resource-and-name
further_reading:
  - link: tracing/setup/
    tag: Documentation
    text: アプリケーションで APM トレースをセットアップする方法
  - link: tracing/visualization/services_list/
    tag: Documentation
    text: Datadog に報告するサービスの一覧
  - link: tracing/visualization/service
    tag: Documentation
    text: Datadog のサービスについて
  - link: tracing/visualization/resource
    tag: Documentation
    text: リソースのパフォーマンスとトレースの詳細
  - link: tracing/visualization/trace
    tag: Documentation
    text: Datadog トレースの読み方を理解する
---
APM UI には、アプリケーションのパフォーマンスをトラブルシューティングし、これを製品全体で関連付けるための多くのツールが用意されています。これは、高度に分散されたシステムの問題を見つけて解決するのに役立ちます。

| コンセプト                         | 説明                                                                                                                                                                                                          |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [サービス](#services)            | サービスは、最新のマイクロサービスアーキテクチャの構成要素です。サービスは、インスタンスをスケーリングする目的で、エンドポイント、クエリ、またはジョブを広くグループ化します。                                         |
| [Resource](#resources)          | リソースは、顧客アプリケーションの特定のドメインを表します。通常、これはインスツルメントされたウェブエンドポイント、データベースクエリ、またはバックグラウンドジョブです。                                                              |
| [モニター][1]                   | APM メトリクスモニターは、通常のメトリクスモニターと同様に機能しますが、APM 専用に調整されたコントロールを備えています。このモニターを使用して、ヒット、エラー、さまざまなレイテンシー測定に関するサービスレベルでアラートを受信します。 |
| [トレース](#trace)                 | トレースは、アプリケーションがリクエストを処理するのにかかった時間とこのリクエストのステータスを追跡するために使用されます。各トレースは、1 つ以上のスパンで構成されます。                                                             |
| [スパン](#spans)                  | スパンは、特定の期間における分散システムの論理的な作業単位を表します。複数のスパンでトレースが構成されます。                                                                                          |
| [トレースメトリクス](#trace-metrics) | トレースメトリクスは自動的に収集され、他の [Datadog メトリクス][2]と同様の 15 か月の保持ポリシーで保持されます。これを使用して、ヒット、エラー、またはレイテンシーを特定し、アラートを発信することができます。                       |
| [App Analytics](#app-analytics) | App Analytics は、ユーザー定義のタグ（customer_id、error_type、app_name など）またはインフラストラクチャータグで分析スパンをフィルターするために使用されます。                                                                                |
| [分析スパン](#analyzed-span) | 分析スパンは、リクエストの 100% のスループットを表し、App Analytics での検索、クエリ、監視に使用できます。                                                                                                |
| [スパンタグ](#span-tags)         | *Trace View* でリクエストを関連付けたり、*App Analytics* でフィルターしたりするためのキーと値のペアの形式のタグスパン。                                                                                                    |

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

以下の例では、スパン `rack.request` はトレースのエントリポイントスパンです。これは、ウェブストアサービス詳細画面が、`rack.request` という名前のエントリポイントスパンを持つトレースで構成されるリソースを表示していることを意味します。この例では、アプリケーション側に追加されたタグ（`merchant.name` や `merchant.tier` など）も示されています。これらのユーザー定義のタグは、[App Analytics][14] で APM データを検索、分析するために使用できます。

{{< img src="tracing/visualization/span_with_metadata.png" alt="スパン" >}}

## トレースメトリクス

トレースメトリクスは自動的に収集され、他の [Datadog メトリクス][2]と同様の 15 か月の保持ポリシーで保持されます。これを使用して、ヒット、エラー、またはレイテンシーを特定し、アラートを発信することができます。トレースメトリクスは、サービスまたはリソースとともにトレースを受信するホストによってタグ付けされます。たとえば、ウェブサービスをインスツルメントした後、[Metric Summary][15] のエントリポイントスパン `web.request` のトレースメトリクスが収集されます。

{{< img src="tracing/visualization/trace_metrics.mp4" video="true" alt="トレースメトリクス" >}}

### ダッシュボード  

トレースメトリクスは、*Service* または *Resource* ページからダッシュボードにエクスポートできます。さらに、既存のダッシュボードからトレースメトリクスを照会できます。

{{< img src="tracing/visualization/trace_metric_dashboard.mp4" video="true" alt="トレースメトリクスダッシュボード" >}}

### モニタリング

トレースメトリクスは、監視に役立ちます。APM モニターは、[New Monitors][16]、[Service][6]、または [Resource][7] ページで設定できます。推奨されるモニターのセットは、[Service][6] または [Resource][7] ページで利用できます。

{{< img src="tracing/visualization/trace_metric_monitor.mp4" video="true" alt="トレースメトリクスモニター" >}}

## App Analytics

App Analytics は、ユーザー定義のタグ（customer_id、error_type、app_name など）またはインフラストラクチャータグで[分析スパン](#analyzed-span)をフィルターするために使用されます。これにより、ヒット、エラー、レイテンシーの 100% スループットで検索、グラフ化、監視できるとともに、サービスを流れるウェブリクエストを詳細に調べることができます。この機能は、[自動構成][17]で有効にできます。

{{< wistia vrmqr812sz >}}

## 分析スパン

分析スパンは、リクエストの 100% のスループットを表し、スパンに含まれる[タグ](#span-tags)による App Analytics の検索、クエリ、監視に使用できます。App Analytics を有効にすると、トレースクライアントは、デフォルトでウェブサービスのエントリポイントスパンを分析し、アプリケーションで[追加のサービスを構成][18]できるようになります。たとえば、100 個のリクエストを持つ Java サービスは、`servlet.request` スパンから 100 個の分析スパンを生成します。`DD_TRACE_ANALYTICS_ENABLED=true` を設定すると、`web-store` サービスはすべての `rack.request` スパンを分析し、App Analytics で利用できるようにします。この例では、99 パーセンタイルでレイテンシーが最も高い上位 10 マーチャントをグラフ化できます。`merchant_name` は、アプリケーションのスパンに適用されたユーザー定義のタグです。

<div class="alert alert-info">
<a href="https://app.datadoghq.com/apm/docs/trace-search">Analyzed Span Estimator</a> を使用して、サービスから生成される分析スパンの数を見積もることができます。取り込み後、<a href="https://app.datadoghq.com/apm/settings">APM 設定</a>のサービス別レベルで、分析スパンを 100% からそれより低いパーセンテージまでフィルターできます。これにより、課金対象の分析スパンが減少します。
</div>

## スパンタグ

*Trace View* でリクエストを関連付けたり、*App Analytics* でフィルターしたりするためのキーと値のペアの形式のタグスパン。タグは、単一のスパンに追加することも、すべてのスパンにグローバルに追加することもできます。以下の例では、リクエスト（`merchant.store_name` や `merchant.tier` など）がタグとしてスパンに追加されています。

{{< img src="tracing/visualization/span_tag.png" alt="スパンタグ" >}}

アプリケーションのスパンをタグ付けするには、この[チュートリアル][12]をご覧ください。

タグがスパンに追加されたら、タグをクリックして[ファセット][19]として追加し、App Analytics でタグを検索およびクエリします。これが完了すると、このタグの値はすべての新しいトレースに保存され、検索バー、ファセットパネル、トレースグラフクエリで使用できます。

{{< img src="tracing/app_analytics/search/create_facet.png" style="width:50%;" alt="ファセットの作成"  style="width:50%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/monitors/monitor_types/apm/
[2]: /ja/developers/faq/data-collection-resolution-retention
[3]: /ja/tracing/setup
[4]: /ja/tracing/visualization/services_list
[5]: /ja/tracing/visualization/services_map
[6]: /ja/tracing/visualization/service
[7]: /ja/tracing/visualization/resource
[8]: /ja/tracing/opentracing/?tab=java#create-a-distributed-trace-using-manual-instrumentation-with-opentracing
[9]: /ja/tracing/manual_instrumentation
[10]: /ja/tracing/opentracing
[11]: /ja/tracing/connect_logs_and_traces
[12]: /ja/tracing/guide/adding_metadata_to_spans
[13]: /ja/tracing/runtime_metrics
[14]: /ja/tracing/app_analytics
[15]: https://app.datadoghq.com/metric/summary
[16]: https://app.datadoghq.com/monitors#/create
[17]: /ja/tracing/app_analytics/#automatic-configuration
[18]: /ja/tracing/app_analytics/#configure-additional-services-optional
[19]: /ja/tracing/app_analytics/search/#facets