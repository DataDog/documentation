---
aliases:
- /ja/tracing/visualization/resource/
further_reading:
- link: https://www.datadoghq.com/blog/dependency-map-navigator/
  tag: ブログ
  text: Dependency Map Navigator でダウンストリームサービスのパフォーマンス問題を特定する
- link: /tracing/trace_collection/
  tag: ドキュメント
  text: アプリケーションで APM トレースをセットアップする方法
- link: /tracing/service_catalog/
  tag: ドキュメント
  text: Datadog に報告するサービスの発見とカタログ化
- link: /tracing/services/service_page/
  tag: ドキュメント
  text: Datadog のサービスについて
- link: /tracing/trace_explorer/trace_view/
  tag: ドキュメント
  text: Datadog トレースの読み方を理解する
title: リソースステータス画面
---

{{< img src="tracing/visualization/resource/resource-page-cropped.png" alt="The APM resource page, showing monitor status and trends for key metrics" >}}

リソースは、特定の[サービス][1]（通常は個々のエンドポイントまたはクエリ）に対する特定のアクションです。リソースの詳細については、[APM を開始する][2]をご覧ください。リソースごとに、APM は以下をカバーするダッシュボードページを自動的に生成します。

* 主要なヘルスメトリクス
* このサービスに関連付けられているすべてのモニターのモニターステータス
* このサービスに関連付けられているすべてのリソースのメトリクスのリスト

## すぐに使えるグラフ

Datadog provides out-of-the-box graphs for any given resource. Use the dropdown above each graph to change the displayed information.

{{< img src="tracing/visualization/resource/resource_otb_graphs.png" alt="Out-of-the-box resource graphs showing requests per second, latency, total errors, and percent time spent per service" style="width:90%;">}}

{{% apm-ootb-graphs %}}

### ダッシュボードへのエクスポート

グラフを既存の[ダッシュボード][4]にエクスポートするには、各グラフの右上隅にある上向き矢印をクリックします。

### レイテンシー分布

リソースステータス画面にも、リソースレイテンシー分布グラフが表示されます。

{{< img src="tracing/visualization/resource/resource_latency_distribution.png" alt="A latency distribution graph showing a distribution of the time taken per resource request" style="width:100%;">}}

右上のセレクターを使用して特定のパーセンタイルを拡大するか、サイドバーにカーソルを合わせてパーセンタイルマーカーを表示します。

{{< img src="tracing/visualization/service/latency_distribution_sidebar.png" alt="A close-up of the latency distribution graph sidebar which allows filtering on percentiles" style="width:50%;">}}

## ナビゲーター付き依存関係マップ

You can also view a map of all of a resource's upstream and downstream service dependencies. With the Dependency Map Navigator, you can see the flow of services, with spans that go through a specific resource (endpoint, database query, etc.) end-to-end, along with their request counts.

This map is based on a sample of ingested spans; the sample is drawn by a fixed sampling algorithm that considers the structure of traces. The sampling algorithm is not configurable and is not impacted by ingestion control.

依存関係マップは、サービスエントリースパンを含むリソースにのみ利用可能です。

{{< img src="tracing/visualization/resource/dependency-map-navigator-cropped.png" alt="A dependency map for a resource, with a list of service dependencies and flow diagram of requests from service to service" style="width:100%;" >}}

ノードにカーソルを合わせると、リクエスト/秒、エラー率、平均レイテンシーなど、各サービスのメトリクスを表示します。ノードをクリックすると、コンテキストメニューが表示され、サービスページや関連するトレースなどを表示することができます。

ノードのハイライト色は、そのサービスの[モニターステータス][5]を示しています。サービスに複数のモニターが構成されている場合、最も厳しいモニターのステータスが表示されます。

{{< img src="tracing/visualization/resource/dependency-navigator-cropped.mp4" video="true" alt="A video that shows selecting a service in the dependency map list to view the flow of requests into and out of that service" style="width:100%;" >}}

### 負荷増幅

選択したリソースのアップストリームで受信したリクエストの 100% 以上を受信している場合、サービスには負荷増幅があります。コールパスがオレンジ色でハイライトされているサービスには負荷増幅があり、増幅倍率はパネル上のリストに表示されます。増幅は、リソースが受信したリクエスト (下のイメージで地図上にハイライト表示) と、ダウンストリームサービスが受信したリクエスト (地図上のダウンストリームサービスノード内に表示) に基づいて計算されます。リスト内のサービスをクリックすると、増幅に寄与しているスパンを確認することができます。

{{< img src="tracing/visualization/resource/dependency-map-requests-cropped.png" alt="A dependency map that shows the flow of requests into and out of a particular resource and highlights the request count of that resource" style="width:100%;" >}}


## スパンサマリー

特定のリソースについて、Datadog は一致するすべてのトレースの[スパン][6]分析内訳を提供します。

{{< img src="tracing/visualization/resource/span_stats.png" alt="A table showing several key metrics for a list of the spans associated with a particular resource" style="width:80%;">}}

表示されるメトリクスは、スパンごとに次を表します。

`Avg Spans/trace`
: スパンが少なくとも 1 回存在する、現在のリソースを含むトレースのスパンの平均発生回数。

`% of Traces`
: スパンが少なくとも 1 回存在する現在のリソースを含むトレースの割合。

`Avg Duration`
: スパンが少なくとも 1 回存在する、現在のリソースを含むトレースのスパンの平均期間。

`Avg % Exec Time`
: スパンが少なくとも 1 回存在する、現在のリソースを含むトレースについて、スパンがアクティブだった実行時間の平均比率。

**注**: スパンは、子スパンの完了を待機していないときにアクティブと見なされます。特定のトレースの特定の時間にアクティブなスパンは、すべてリーフスパン（つまり、子のないスパン）です。

スパンサマリーテーブルは、サービスエントリースパンを含むリソースにのみ利用可能です。

## トレース

環境、サービス、オペレーション、およびリソース名で既にフィルタリングされている[トレース検索][8]モーダルで、このリソースに関連付けられている[トレース][7]のリストを参照してください。

{{< img src="tracing/visualization/resource/traces_list.png" alt="A list of traces associated with a particular resource that shows the timestamp, duration, status, and latency breakdown of each trace" style="width:90%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/glossary/#services
[2]: /ja/tracing/glossary/
[3]: /ja/tracing/glossary/#trace
[4]: /ja/dashboards/
[5]: /ja/monitors/manage/status/
[6]: /ja/tracing/glossary/#spans
[7]: /ja/tracing/trace_explorer/trace_view/
[8]: /ja/tracing/search/