---
title: APM の用語と概念
aliases:
  - /tracing/terminology/
  - /tracing/faq/what-is-the-difference-between-type-service-resource-and-name
  - /tracing/visualization/
further_reading:
- link: "/tracing/trace_collection/"
  tag: "ドキュメント"
  text: "アプリケーションで APM トレースを設定する方法を学ぶ"
- link: "/tracing/software_catalog/"
  tag: "ドキュメント"
  text: "Datadog に報告するサービスの発見とカタログ化"
- link: "/tracing/services/service_page/"
  tag: "ドキュメント"
  text: "Datadog のサービスについて詳しく学ぶ"
- link: "/tracing/services/resource_page/"
  tag: "ドキュメント"
  text: "リソースのパフォーマンスとトレースの詳細"
- link: "/tracing/trace_explorer/trace_view/"
  tag: "ドキュメント"
  text: "Datadog でトレースを読み込む方法を学ぶ"
- link: "/monitors/types/apm/"
  tag: "ドキュメント"
  text: "APM モニターについて学ぶ"
---

{{< jqmath-vanilla >}}

## 概要

APM UI には、アプリケーションのパフォーマンスをトラブルシューティングし、これを製品全体で関連付けるための多くのツールが用意されています。これにより、分散されたシステムの問題を見つけて解決することができます。

_スパン_や_インデックス化_などの APM の重要な用語の定義や説明については、[メイン用語集][22]を参照してください。

| コンセプト| 説明|
|----------|----------|
| [サービス](#services)| サービスは、最新のマイクロサービスアーキテクチャの構成要素です。サービスは、アプリケーションを構築する目的で、エンドポイント、クエリ、またはジョブを広くグループ化します。|
| [リソース](#resources)| リソースは、顧客アプリケーションの特定のドメインを表します。通常、これはインスツルメントされたウェブエンドポイント、データベースクエリ、またはバックグラウンドジョブです。|
| [モニター][23]| APM メトリクスモニターは標準的なメトリクスモニターと同様に機能しますが、APM 専用に調整されたコントロールを備えています。これらのモニターを使用して、ヒット、エラー、さまざまなレイテンシー測定に関するアラートをサービスレベルで受け取ります。|
| [トレース](#trace)| トレースは、アプリケーションがリクエストを処理するのにかかった時間とこのリクエストのステータスを追跡するために使用されます。各トレースは1つ以上のスパンで構成されます。|
| [トレースコンテキストの伝搬](#trace-context-propagation)| サービス間でトレース識別子を受け渡す方法です。これにより、Datadogが個々のスパンを完全な分散トレースに統合できるようになります。|
| [リテンションフィルター](#retention-filters)| リテンションフィルターは、Datadog UI 内に設定されたタグベースのコントロールで、15日間にわたってDatadogでインデックス化するスパンを決定します。|
| [インジェスチョンコントロール](#ingestion-controls)| インジェスチョンコントロールは、Datadog に最大 100% のトレースを送信し、15分間のライブ検索および分析を行うために使用されます。
| [インスツルメンテーション](#instrumentation)| インスツルメンテーションとは、可観測性データをキャプチャしてレポートするために、アプリケーションにコードを追加するプロセスです。|
| [Baggage](#baggage)| Baggage とは、トレース、メトリクス、ログの間でキー値ペアとして受け渡されるコンテキスト情報です。|

## サービス

[アプリケーションのインスツルメンテーションを行った後][3]、[ソフトウェアカタログ][4]が APM データのメインランディングページになります。

{{< img src="tracing/visualization/software_catalog.png" alt="ソフトウェアカタログ" >}}

サービスは、最新のマイクロサービスアーキテクチャの構成要素です。サービスは、インスタンスをスケーリングする目的で、エンドポイント、クエリ、またはジョブを広くグループ化します。イベントの例には以下があります。

* URL エンドポイントのグループは、API サービスの下でグループ化できます。
* 1 つのデータベースサービス内でグループ化された DB クエリのグループ。
* crond サービスで構成された定期的なジョブのグループ。

以下のスクリーンショットは、eコマースサイトビルダー向けのマイクロサービス分散システムです。`web-store`、`ad-server`、`payment-db`、`auth-service` はすべて APM のサービスとして表されます。

{{< img src="tracing/visualization/service_map.png" alt="サービスマップ" >}}

すべてのサービスは[ソフトウェアカタログ][4]にあり、[サービスマップ][5]に視覚的に表示されます。各サービスには独自の[サービス詳細画面][6]があり、スループット、レイテンシー、エラー率などの[トレースメトリクス](#trace-metrics)を確認および検査できます。これらのメトリクスを使用して、ダッシュボードウィジェットの作成、モニターの作成、サービスに属する Web エンドポイントやデータベースクエリなどの各リソースのパフォーマンスの確認を行います。

{{< img src="tracing/visualization/service_page.mp4" video="true" alt="サービス詳細画面" >}}

<div class="alert alert-info">
サービス詳細画面に期待していた HTTP エンドポイントが表示されていませんか？APM では、エンドポイントはサービス名だけでなく、他の要素によってもサービスに接続されます。これはまた、トレースのエントリーポイントスパンの `span.name` を使用して行われます。たとえば、上記のウェブストアサービスでは、`web.request` がエントリーポイントのスパンです。詳細については<a href="/tracing/faq/resource-trace-doesn-t-show-up-under-correct-service/">こちら</a>をご覧ください。
</div>

## リソース

リソースは、顧客アプリケーションの特定のドメインを表します。これらは通常、インスツルメントされたウェブエンドポイント、データベースクエリ、またはバックグラウンドジョブです。ウェブサービスの場合、これらのリソースは、静的なスパン名 `web.request` でグループ化された動的なウェブエンドポイントである場合があります。データベースサービスでは、これらはスパン名が `db.query` のデータベースクエリです。たとえば `web-store` サービスには、チェックアウト、カートの更新、商品の追加などを処理するウェブエンドポイントという自動的にインスツルメントされたリソースがあります。リソース名には HTTP メソッドと HTTP ルートを指定できます。たとえば `GET /productpage` や `ShoppingCartController#checkout` です。

各リソースには、特定のエンドポイントにスコープされた[トレースメトリクス][15]を持つ独自の[リソースステータス画面][7]があります。トレースメトリクスは、他の Datadog メトリクスと同様に、ダッシュボードにエクスポートしたり、モニターを作成したりするために使用することができます。リソースステータス画面には、すべての[トレース](#trace)[スパン][21]、リクエストのレイテンシー分布、およびこのエンドポイントへのリクエストを示すトレースの集計ビューを示すスパン要約ウィジェットも表示されます。

{{< img src="tracing/visualization/resource_page.mp4" video="true" alt="リソースステータス画面" >}}

## トレース

トレースは、アプリケーションがリクエストを処理するのにかかった時間とこのリクエストのステータスを追跡するために使用されます。各トレースは1つ以上のスパンで構成されます。リクエストの存続期間中、サービス間の分散呼び出し ([HTTPヘッダーでトレースIDが注入/抽出される][8]ため)、[自動的にインスツルメントされたライブラリ][3]、[OpenTracing][10]などのオープンソースツールを使用した[手動インスツルメンテーション][9]をフレームグラフビューで確認できます。トレースビューページでは、各トレースがプラットフォームの他の部分に接続する情報を収集します。これには、[トレースへのログの接続][11]、[スパンへのタグの追加][12]、[ランタイムメトリクスの収集][13]などが含まれます。

{{< img src="tracing/visualization/trace_view.png" alt="トレースビュー" >}}

## トレースコンテキストの伝搬

トレースコンテキストの伝搬は、分散システム内のサービス間でトレース識別子を受け渡す方法です。これにより、Datadog は異なるサービスからの個々のスパンを1つの分散トレースに統合できます。トレースコンテキストの伝搬は、リクエストがシステムを通過する際に、トレース ID や親スパン ID などの識別子を HTTP ヘッダーに注入することで行われます。その後、ダウンストリームサービスがこれらの識別子を抽出し、トレースを続行します。これにより、Datadog は複数のサービスにわたるリクエストの完全な経路を再構築できます。

詳細については、アプリケーションの言語の[トレースコンテキストの伝搬][27]を参照してください。

## リテンションフィルター

UI で[タグベースのフィルター][19]を設定して 15 日間のスパンをインデックスし、[トレース検索と分析][14]で使用できるようにします。

## インジェスチョンコントロール

サービスから Datadog に[トレースの 100% を送信][20]し、[タグベースのリテンションフィルター](#retention-filters)と組み合わせて、ビジネスにとって重要なトレースを15日間保持します。

## インスツルメンテーション

インスツルメンテーションとは、トレース、メトリクス、ログなどの可観測性データをキャプチャして Datadog にレポートするために、アプリケーションにコードを追加するプロセスです。Datadog は、さまざまなプログラミング言語やフレームワーク向けのインスツルメンテーションライブラリを提供しています。

[シングルステップインスツルメンテーション][24]で Datadog Agent をインストールするとき、またはコードに [Datadog トレーシングライブラリを手動で追加][25]するときに、アプリケーションを自動的にインスツルメンテーションすることができます。

アプリケーションコードに直接トレースコードを埋め込むことで、カスタムインスツルメンテーションを使用できます。これにより、Datadog に送信するトレースをプログラムで作成、変更、または削除できます。

詳しくは、[アプリケーションインスツルメンテーション][26]をお読みください。

## Baggage

Baggage を使用すると、分散システムのサービス境界を越えてキー値ペア (Baggage アイテムとも呼ばれる) を伝搬できます。トレース識別子に焦点を当てたトレースコンテキストとは異なり、Baggage ではトレースと共にビジネスデータやその他のコンテキスト情報を伝送できます。

詳細については、アプリケーションの言語でサポートされている[伝搬形式][28]をご覧ください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[2]: /developers/guide/data-collection-resolution/
[3]: /tracing/setup/
[4]: /tracing/software_catalog/
[5]: /tracing/services/services_map/
[6]: /tracing/services/service_page/
[7]: /tracing/services/resource_page/
[8]: /tracing/opentracing/java/#create-a-distributed-trace-using-manual-instrumentation-with-opentracing
[9]: /tracing/manual_instrumentation/
[10]: /tracing/opentracing/
[11]: /tracing/other_telemetry/connect_logs_and_traces/
[12]: /tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[13]: /tracing/metrics/runtime_metrics/
[14]: /tracing/trace_pipeline/trace_retention/#trace-search-and-analytics-on-indexed-spans
[15]: /tracing/metrics/metrics_namespace/
[16]: https://app.datadoghq.com/metric/summary
[17]: https://app.datadoghq.com/monitors/create
[18]: /tracing/trace_explorer/query_syntax/#facets
[19]: /tracing/trace_pipeline/trace_retention/#retention-filters
[20]: /tracing/trace_pipeline/ingestion_controls/
[21]: /glossary/#span
[22]: /glossary/
[23]: /monitors/types/apm/
[24]: /tracing/trace_collection/automatic_instrumentation/single-step-apm
[25]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/
[26]: /tracing/trace_collection/
[27]: /tracing/trace_collection/trace_context_propagation
[28]: /tracing/trace_collection/trace_context_propagation/#supported-formats
