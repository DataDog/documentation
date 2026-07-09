---
algolia:
  tags:
  - trace metrics
aliases:
- /ja/tracing/getting_further/metrics_namespace
- /ja/tracing/guide/metrics_namespace
description: 'APM トレースメトリクスの包括的ガイド: ネームスペース、タイプ (ヒット、エラー、レイテンシー、Apdex)、およびアプリケーショントラフィックからの計算方法。'
further_reading:
- link: tracing/trace_pipeline/generate_metrics/
  tag: よくあるご質問
  text: 取り込んだスパンからカスタムメトリクスを作成する
- link: tracing/trace_collection/
  tag: よくあるご質問
  text: アプリケーションで APM トレーシングをセットアップする方法
- link: tracing/software_catalog/
  tag: よくあるご質問
  text: Datadog に報告するサービスの発見とカタログ化
- link: tracing/services/service_page
  tag: よくあるご質問
  text: Datadog のサービスについて
- link: tracing/services/resource_page
  tag: よくあるご質問
  text: リソースのパフォーマンスとトレースの詳細
- link: tracing/trace_explorer/trace_view/
  tag: よくあるご質問
  text: Datadog トレースの読み取り方を理解する
title: トレースメトリクス
---
## 概要 {#overview}

[トレース収集の有効化とアプリケーションのインスツルメント][1] を行うと、トレースアプリケーションメトリクスが収集されます。

{{< img src="tracing/apm_lifecycle/trace_metrics.png" style="width:70%; background:none; border:none; box-shadow:none;" alt="トレースメトリクス" >}}

これらのメトリクスは、リクエスト数、エラー数、およびレイテンシーの測定値を取得します。これらは、[トレース取り込みサンプリング][2] の設定に関係なく、アプリケーションのトラフィックの 100% に基づいて計算されます。これらのメトリクスを使用してサービスやリソースの潜在的なエラーを特定し、ダッシュボード、モニター、および SLO を作成することで、アプリケーションのトラフィックの完全な可視性を確保します。

**注**: アプリケーションが OpenTelemetry ライブラリで計測され、SDK レベルでサンプリングが設定されている場合、APM メトリクスはサンプリングされたデータセットに基づいて計算されます。ただし、OpenTelemetry Collector レベルでサンプリングが設定され、サンプラープロセッサーが Datadog コネクタの上流にある場合、APM メトリクスはアプリケーショントラフィックの 100% に基づいて計算されます。

トレースメトリクスは、インテグレーション言語によって、サービスエントリスパンや特定のオペレーションに対して生成されます。たとえば、Django インテグレーションでは、さまざまな操作を表すスパン (Django リクエスト用のルートスパン 1 つ、各ミドルウェア用のスパン 1 つ、ビュー用のスパン 1 つ) からトレースメトリクスを生成しています。

[トレースメトリクス][3] のネームスペースは、次のようなフォーマットになっています。

- `trace.<SPAN_NAME>.<METRIC_SUFFIX>`

次の定義と組み合わせます。

`<SPAN_NAME>`
: オペレーションの名前または `span.name` (例: `redis.command`、`pylons.request`、`rails.request`、`mysql.query`)。

`<METRIC_SUFFIX>`
: メトリクスの名前 (例: `hits`、`errors`、`apdex`、`duration`)。以下のセクションを参照してください。

`<TAGS>`
: トレースメトリクスタグ、可能なタグは: `env`、`service`、`version`、`resource`、`http.status_code`、`http.status_class`、`rpc.grpc.status_code` (Datadog Agent v7.65.0+ が必要)、および Datadog Agent タグ (ホストおよび [追加のプライマリタグ][4] を含む)。
: **注:** スパンに設定された他のタグは、トレースメトリクスのタグとしては利用できません。

## メトリクスサフィックス {#metric-suffix}

### ヒット {#hits}

`trace.<SPAN_NAME>.hits`
: **前提条件:** このメトリクスは、すべての APM サービスに存在します。<br>
**説明:** 特定の名前 (例: `redis.command`、`pylons.request`、`rails.request`、または `mysql.query`) で作成されたスパンのカウントを表します。<br>
**メトリクスタイプ:** [COUNT][5]<br>
**タグ:** `env`、`service`、`version`、`resource`、`resource_name`、`http.status_code`、`rpc.grpc.status_code`、Datadog ホストエージェントからのすべてのホストタグ、および [追加のプライマリタグ][4]。

`trace.<SPAN_NAME>.hits.by_http_status`
: **前提条件:** このメトリクスは、HTTP メタデータが存在する場合、HTTP/WEB APM サービスに存在します。<br>
**説明:** 特定のスパンのヒット数を HTTP ステータスコード別に表します。<br>
**メトリクスタイプ:** [COUNT][5]<br>
**タグ:** `env`、`service`、`version`、`resource`、`resource_name`、`http.status_class`、`http.status_code`、Datadog ホストエージェントからのすべてのホストタグ、および [追加のプライマリタグ][4]。

### レイテンシー分布 {#latency-distribution}

`trace.<SPAN_NAME>`
: **前提条件:** このメトリクスは、すべての APM サービスに存在します。<br>
**説明:** さまざまな環境と追加のプライマリタグにわたるすべてのサービス、リソース、バージョンのレイテンシー分布を表します。**すべてのレイテンシー測定のユースケースに推奨されます。**<br>
**メトリクスタイプ:** [DISTRIBUTION][6]<br>
**タグ:** `env`、`service`、`version`、`resource`、`resource_name`、`http.status_code`、`rpc.grpc.status_code`、`synthetics`、および [追加のプライマリタグ][4]。

### エラー {#errors}

`trace.<SPAN_NAME>.errors`
: **前提条件:** このメトリクスは、すべての APM サービスに存在します。<br>
**説明:** 特定のスパンのエラー数を表します。<br>
**メトリクスタイプ:** [COUNT][5]<br>
**タグ:** `env`、`service`、`version`、`resource`、`resource_name`、`http.status_code`、`rpc.grpc.status_code`、Datadog ホストエージェントからのすべてのホストタグ、および [追加のプライマリタグ][4]。

`trace.<SPAN_NAME>.errors.by_http_status`
: **前提条件:** このメトリクスは、すべての APM サービスに存在します。<br>
**説明:** 特定のスパンのエラー数を表します。<br>
**メトリクスタイプ:** [COUNT][5]<br>
**タグ:** `env`、`service`、`version`、`resource`、`http.status_class`、`http.status_code`、Datadog ホストエージェントからのすべてのホストタグ、および [追加のプライマリタグ][4]。

### Apdex {#apdex}

`trace.<SPAN_NAME>.apdex`
: **前提条件:** このメトリクスは、すべての HTTP またはウェブベースの APM サービスに存在します。<br>
**説明:** 各ウェブサービスの [Apdex][10] スコアを測定します。<br>
**メトリクスタイプ:** [GAUGE][7]<br>
**タグ:** `env`、`service`、`version`、`resource` / `resource_name`、`synthetics`、および [追加のプライマリタグ][4]。

## レガシーメトリクス {#legacy-metrics}

以下のメトリクスは、後方互換性のために維持されています。すべてのレイテンシー測定のユースケースにおいて、Datadog は代わりに [Latency Distribution metrics](#latency-distribution) の使用を強く推奨します。

### 期間 (レガシー) {#duration-legacy}

<div class="alert alert-danger">
<strong>重要:</strong> 期間メトリクスは、後方互換性のためにのみ維持されています。すべてのレイテンシー測定のユースケースにおいて、Datadog は代わりに<a href="#latency-distribution">レイテンシー分布メトリクス</a>の使用を強く推奨します。これにより、パーセンタイル計算と全体的なパフォーマンス分析の精度が向上します。
</div>

`trace.<SPAN_NAME>.duration`
: **前提条件:** このメトリクスは、すべての APM サービスに存在します。<br>
**説明:** 収集サービスで認識された子スパンを含め、時間間隔内のスパンコレクションの合計時間を測定します。ほとんどのユースケースにおいて、Datadog は平均レイテンシーまたはパーセンタイルの計算に [Latency Distribution](#latency-distribution) の使用を推奨します。ホストタグフィルターを使用して平均レイテンシーを計算するには、次の式でこのメトリクスを使用できます: <br>
`sum:trace.<SPAN_NAME>.duration{<FILTER>}.rollup(sum).fill(zero) / sum:trace.<SPAN_NAME>.hits{<FILTER>}.rollup(sum).fill(zero)` <br>
このメトリクスは、パーセンタイル集計をサポートしていません。詳細については、[Latency Distribution](#latency-distribution) セクションを参照してください。<br>
**メトリクスタイプ:** [GAUGE][7]<br>
**タグ:** `env`、`service`、`resource`、`http.status_code`、Datadog ホストエージェントからのすべてのホストタグ、および [追加のプライマリタグ][4]。

### 期間別 (レガシー) {#duration-by-legacy}

<div class="alert alert-danger">
<strong>重要:</strong> 期間メトリクスは、後方互換性のためにのみ維持されています。すべてのレイテンシー測定のユースケースにおいて、Datadog は代わりに<a href="#latency-distribution">レイテンシー分布メトリクス</a>の使用を強く推奨します。これにより、パーセンタイル計算と全体的なパフォーマンス分析の精度が向上します。
</div>

`trace.<SPAN_NAME>.duration.by_http_status`
: **前提条件:** このメトリクスは、HTTP メタデータが存在する場合、HTTP/WEB APM サービスに存在します。<br>
**説明:** 各 HTTP ステータスのスパンのコレクションの合計時間を測定します。具体的には、ある間隔ですべてのスパンが費やした時間と、特定の HTTP ステータスの相対的な割合で、子プロセスの待機に費やされた時間を含みます。<br>
**メトリクスタイプ:** [GAUGE][7]<br>
**タグ:** `env`、`service`、`resource`、`http.status_class`、`http.status_code`、Datadog ホストエージェントからのすべてのホストタグ、および [追加の主要タグ][4]。

## トレースメトリクスに対するサンプリングの影響 {#sampling-impact-on-trace-metrics}

ほとんどの場合、トレースメトリクスはすべてのアプリケーショントラフィックに基づいて計算されます。ただし、特定のトレース取り込みサンプリング構成では、メトリクスはすべてのリクエストのサブセットのみを表します。

### アプリケーション側サンプリング {#application-side-sampling}

一部の SDK はアプリケーション側サンプリングをサポートしており、Datadog Agent に送信される前にスパン数を削減します。たとえば、Ruby SDK はパフォーマンスオーバーヘッドを低減するためのアプリケーション側サンプリングを提供します。ただし、Datadog Agent は正確なメトリクスを計算するためにすべてのスパンを必要とするため、これによりトレースメトリクスに影響する可能性があります。

この設定をサポートする SDK は非常に少なく、一般的には使用は推奨されません。

### OpenTelemetry サンプリング {#opentelemetry-sampling}

OpenTelemetry SDK のネイティブサンプリングメカニズムは、Datadog コレクターに送信されるスパン数を削減し、その結果、サンプリングされた不正確なトレースメトリクスが生成される可能性があります。

### X-Ray サンプリング {#x-ray-sampling}

X-Ray スパンは Datadog に送信される前にサンプリングされるため、トレースメトリクスはすべてのトラフィックを反映しない可能性があります。


##  参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_collection/
[2]: /ja/tracing/trace_pipeline/ingestion_mechanisms
[3]: /ja/tracing/glossary/#trace-metrics
[4]: /ja/tracing/guide/setting_primary_tags_to_scope/#add-additional-primary-tags-in-datadog
[5]: /ja/metrics/types/?tab=count#metric-types
[6]: /ja/metrics/types/?tab=distribution#metric-types
[7]: /ja/metrics/types/?tab=gauge#metric-types
[8]: /ja/tracing/software_catalog/#services-types
[9]: /ja/tracing/glossary/#services
[10]: /ja/tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm/