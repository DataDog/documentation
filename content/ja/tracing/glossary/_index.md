---
title: APM Terms and Concepts
aliases:
  - /tracing/terminology/
  - /tracing/faq/what-is-the-difference-between-type-service-resource-and-name
  - /tracing/visualization/
further_reading:
- link: /tracing/trace_collection/
  tag: Documentation
  text: Learn how to set up APM tracing with your application
- link: /tracing/service_catalog/
  tag: Documentation
  text: Discover and catalog the services reporting to Datadog
- link: /tracing/services/service_page/
  tag: Documentation
  text: Learn more about services in Datadog
- link: /tracing/services/resource_page/
  tag: Documentation
  text: Dive into your resource performance and traces
- link: /tracing/trace_explorer/trace_view/
  tag: Documentation
  text: Learn how to read a trace in Datadog
- link: /monitors/types/apm/
  tag: Documentation
  text: Learn about APM monitors
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
| [Instrumentation](#instrumentation) | Instrumentation is the process of adding code to your application to capture and report observability data. |

## サービス

After [instrumenting your application][3], the [Service Catalog][4] is your main landing page for APM data.

{{< img src="tracing/visualization/service_catalog.png" alt="Service Catalog" >}}

サービスは、最新のマイクロサービスアーキテクチャの構成要素です。サービスは、インスタンスをスケーリングする目的で、エンドポイント、クエリ、またはジョブを広くグループ化します。以下はその例です。

* URL エンドポイントのグループは、API サービスの下でグループ化できます。
* 1 つのデータベースサービス内でグループ化された DB クエリのグループ。
* crond サービスで構成された定期的なジョブのグループ。

以下のスクリーンショットは、e コマースサイトビルダー向けのマイクロサービス分散システムです。`web-store`、`ad-server`、`payment-db`、`auth-service` はすべて、APM のサービスとして表されます。

{{< img src="tracing/visualization/service_map.png" alt="サービスマップ" >}}

All services can be found in the [Service Catalog][4] and visually represented on the [Service Map][5]. Each service has its own [Service page][6] where [trace metrics](#trace-metrics) like throughput, latency, and error rates can be viewed and inspected. Use these metrics to create dashboard widgets, create monitors, and see the performance of every resource such as a web endpoint or database query belonging to the service.

{{< img src="tracing/visualization/service_page.mp4" video="true" alt="サービス詳細画面" >}}

<div class="alert alert-info">
サービス詳細画面に期待していた HTTP エンドポイントが表示されませんか？APM では、エンドポイントはサービス名以上でサービスに接続されます。また、トレースのエントリポイントスパンの `span.name` を使用して行われます。たとえば、上記のウェブストアサービスでは、`web.request` がエントリポイントスパンです。詳細については<a href="/tracing/faq/resource-trace-doesn-t-show-up-under-correct-service/">こちら</a>をご覧ください。
</div>

## リソース

リソースは、顧客アプリケーションの特定のドメインを表します。通常は、インスツルメントされたウェブエンドポイント、データベースクエリ、またはバックグラウンドジョブです。ウェブサービスの場合、これらのリソースは、静的なスパン名 `web.request` でグループ化された動的なウェブエンドポイントの場合があります。データベースサービスでは、スパン名が `db.query` のデータベースクエリになります。例えば `web-store` サービスは、チェックアウト、カートの更新、アイテムの追加などを処理する Web エンドポイントというインスツルメンテーションを自動的に行うリソースを持ちます。リソース名には HTTP メソッドと HTTP ルートを指定することができます。

各リソースには、特定のエンドポイントにスコープされた[トレースメトリクス][15]を持つ独自の[リソースページ][7]があります。トレースメトリクスは、他の Datadog メトリクスと同様に、ダッシュボードにエクスポートしたり、モニターを作成するために使用することができます。リソースページには、すべての[トレース](#trace)の[スパン][21]、リクエストの分散型トレーシング、およびこのエンドポイントへのリクエストを示すトレースの集計を表示するスパン要約ウィジェットもあります。

{{< img src="tracing/visualization/resource_page.mp4" video="true" alt="リソースステータス画面" >}}

## Trace

トレースは、アプリケーションがリクエストを処理するのにかかった時間とこのリクエストのステータスを追跡するために使用されます。各トレースは、1 つ以上のスパンで構成されます。リクエストの存続期間中、サービス全体の分散呼び出し（[HTTP ヘッダーを介して trace-id が挿入/抽出される][8]ため）、[自動的にインスツルメントされたライブラリ][3]、[OpenTracing][10] などのオープンソースツールを使用した[手動インスツルメンテーション][9]をフレームグラフビューで見ることができます。トレースビューページで、各トレースは、[ログをトレースに接続する][11]、[タグをスパンに追加する][12]、[ランタイムメトリクスを収集する][13]など、プラットフォームの他の部分に接続する情報を収集します。

{{< img src="tracing/visualization/trace_view.png" alt="トレースビュー" >}}

## Retention Filters

UI で[タグベースのフィルター][19]を設定して 15 日間のスパンをインデックスし、[トレース検索と分析][14]で使用できるようにします。

## Ingestion controls

サービスから Datadog に[トレースの 100% を送信][20]し、[タグベースの Retention Filter](#Retention Filters) と結合させて 15 日間で最もビジネス的に重要なトレースを維持します。

## インスツルメンテーション

Instrumentation is the process of adding code to your application to capture and report observability data to Datadog, such as traces, metrics, and logs. Datadog provides instrumentation libraries for various programming languages and frameworks.

You can automatically instrument your application when you install the Datadog Agent with [Single Step Instrumentation][24] or when you [manually add Datadog tracing libraries][25] to your code.

You can use custom instrumentation by embedding tracing code directly into your application code. This allows you to programmatically create, modify, or delete traces to send to Datadog.

To learn more, read [Application Instrumentation][26].

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[2]: /developers/guide/data-collection-resolution-retention/
[3]: /tracing/setup/
[4]: /tracing/service_catalog/
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
[17]: https://app.datadoghq.com/monitors#/create
[18]: /tracing/trace_explorer/query_syntax/#facets
[19]: /tracing/trace_pipeline/trace_retention/#retention-filters
[20]: /tracing/trace_pipeline/ingestion_controls/
[21]: /glossary/#span
[22]: /glossary/
[23]: /monitors/types/apm/
[24]: /tracing/trace_collection/automatic_instrumentation/single-step-apm
[25]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/
[26]: /tracing/trace_collection/