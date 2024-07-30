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
  text: Datadog でトレースを読み込む方法
- link: /monitors/types/apm/
  tag: Documentation
  text: APM モニターについて
title: APM の用語と概念
---

{{< jqmath-vanilla >}}

## 概要

APM UI には、アプリケーションのパフォーマンスをトラブルシューティングし、これを製品全体で関連付けるための多くのツールが用意されています。これにより、分散されたシステムの問題を見つけて解決することができます。

_スパン_ や _インデックス化_ など、APM の重要な用語の定義や説明については、[主な用語集][22]を参照してください。

| コンセプト                         | 説明                                                                                                                                                                                                          |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [サービス](#services)            | サービスは、最新のマイクロサービスアーキテクチャの構成要素です。サービスは、アプリケーションを構築する目的で、エンドポイント、クエリ、またはジョブを広くグループ化します。                                  |
| [リソース](#resources)          | リソースは、顧客アプリケーションの特定のドメインを表します。通常、これはインスツルメントされたウェブエンドポイント、データベースクエリ、またはバックグラウンドジョブです。                                                              |
| [モニター][23]                   | APM メトリクスモニターは、通常のメトリクスモニターと同様に機能しますが、APM 専用に調整されたコントロールを備えています。このモニターを使用して、ヒット、エラー、さまざまなレイテンシー測定に関するサービスレベルでアラートを受信します。 |
| [トレース](#trace)                 | トレースは、アプリケーションがリクエストを処理するのにかかった時間とこのリクエストのステータスを追跡するために使用されます。各トレースは、1 つ以上のスパンで構成されます。                                                             |
| [Retention Filters](#retention-filters) | Retention Filter は Datadog UI 内に設定されたタグベースのコントロールで、15 日間にわたって Datadog でインデックスするスパンの種類を決定します。                                                                                              |
| [Ingestion Controls](#ingestion-controls) | Ingestion controls は Datadog に最大 100% のトレースを送信し、 15 分間の Live Search および分析を行う際に使用されます。

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

リソースは、顧客アプリケーションの特定のドメインを表します。通常は、インスツルメントされたウェブエンドポイント、データベースクエリ、またはバックグラウンドジョブです。ウェブサービスの場合、これらのリソースは、静的なスパン名 `web.request` でグループ化された動的なウェブエンドポイントの場合があります。データベースサービスでは、スパン名が `db.query` のデータベースクエリになります。例えば `web-store` サービスは、チェックアウト、カートの更新、アイテムの追加などを処理する Web エンドポイントというインスツルメンテーションを自動的に行うリソースを持ちます。リソース名には HTTP メソッドと HTTP ルートを指定することができます。

各リソースには、特定のエンドポイントにスコープされた[トレースメトリクス][15]を持つ独自の[リソースページ][7]があります。トレースメトリクスは、他の Datadog メトリクスと同様に、ダッシュボードにエクスポートしたり、モニターを作成するために使用することができます。リソースページには、すべての[トレース](#trace)の[スパン][21]、リクエストの分散型トレーシング、およびこのエンドポイントへのリクエストを示すトレースの集計を表示するスパン要約ウィジェットもあります。

{{< img src="tracing/visualization/resource_page.mp4" video="true" alt="リソースステータス画面" >}}

## トレース

トレースは、アプリケーションがリクエストを処理するのにかかった時間とこのリクエストのステータスを追跡するために使用されます。各トレースは、1 つ以上のスパンで構成されます。リクエストの存続期間中、サービス全体の分散呼び出し（[HTTP ヘッダーを介して trace-id が挿入/抽出される][8]ため）、[自動的にインスツルメントされたライブラリ][3]、[OpenTracing][10] などのオープンソースツールを使用した[手動インスツルメンテーション][9]をフレームグラフビューで見ることができます。トレースビューページで、各トレースは、[ログをトレースに接続する][11]、[タグをスパンに追加する][12]、[ランタイムメトリクスを収集する][13]など、プラットフォームの他の部分に接続する情報を収集します。

{{< img src="tracing/visualization/trace_view.png" alt="トレースビュー" >}}

## Retention Filters

UI で[タグベースのフィルター][19]を設定して 15 日間のスパンをインデックスし、[トレース検索と分析][14]で使用できるようにします。

## Ingestion controls

サービスから Datadog に[トレースの 100% を送信][20]し、[タグベースの Retention Filter](#Retention Filters) と結合させて 15 日間で最もビジネス的に重要なトレースを維持します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

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
[14]: /ja/tracing/guide/add_span_md_and_graph_it/
[15]: /ja/tracing/metrics/metrics_namespace/
[16]: https://app.datadoghq.com/metric/summary
[17]: https://app.datadoghq.com/monitors#/create
[18]: /ja/tracing/trace_explorer/query_syntax/#facets
[19]: /ja/tracing/trace_pipeline/trace_retention/#retention-filters
[20]: /ja/tracing/trace_pipeline/ingestion_controls/
[21]: /ja/glossary/#span
[22]: /ja/glossary/
[23]: /ja/monitors/types/apm/