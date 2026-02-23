---
algolia:
  tags:
  - トレースメトリクス
aliases:
- /ja/tracing/getting_further/metrics_namespace
- /ja/tracing/guide/metrics_namespace
further_reading:
- link: tracing/trace_collection/
  tag: ドキュメント
  text: アプリケーションで APM トレースをセットアップする方法
- link: tracing/service_catalog/
  tag: ドキュメント
  text: Datadog に報告するサービスの発見とカタログ化
- link: tracing/services/service_page
  tag: ドキュメント
  text: Datadog のサービスについて
- link: tracing/services/resource_page
  tag: ドキュメント
  text: リソースのパフォーマンスとトレースの詳細
- link: tracing/trace_explorer/trace_view/
  tag: ドキュメント
  text: Datadog トレースの読み方を理解する
title: トレースメトリクス
---

## 概要

[トレース収集の有効化とアプリケーションのインスツルメント][1]を行うと、トレースアプリケーションメトリクスが収集されます。

{{< img src="tracing/apm_lifecycle/trace_metrics.png" style="width:70%; background:none; border:none; box-shadow:none;" alt="トレースメトリクス" >}}

これらのメトリクスは、リクエスト回数、エラー回数、およびレイテンシーの測定値をキャプチャします。これらは、[トレース取り込みサンプリング][2]の構成に関係なく、アプリケーションの 100% のトラフィックに基づいて計算されます。これらのメトリクスを使用して、サービスやリソースの潜在的なエラーを発見し、ダッシュボード、モニター、SLO を作成することで、アプリケーションのトラフィックを完全に可視化することができます。

**注**: アプリケーションやサービスが OpenTelemetry ライブラリでインスツルメンテーションされ、SDK レベルやコレクターレベルでサンプリングを設定した場合、APM メトリクスはサンプリングされたデータセットに基づいて計算されます。

トレースメトリクスは、インテグレーション言語によって、サービスエントリースパンや特定のオペレーションに対して生成されます。例えば、Django インテグレーションでは、様々な操作を表すスパン (Django リクエスト用のルートスパン 1 つ、各ミドルウェア用のスパン 1 つ、ビュー用のスパン 1 つ) からトレースメトリクスを生成しています。

[トレースメトリクス][3]のネームスペースは、次のようなフォーマットになっています。

- `trace.<スパン名>.<メトリクスサフィックス>`

次の定義と組み合わせます。

`<SPAN_NAME>`
: 操作の名前または `span.name`（例: `redis.command`、`pylons.request`、`rails.request`、`mysql.query`）。

`<METRIC_SUFFIX>`
: The name of the metric (examples: `hits`, `errors`, `apdex`, `duration`). See the section below.

`<TAGS>`
: Trace metrics tags, possible tags are: `env`, `service`, `version`, `resource`, `http.status_code`, `http.status_class`, and Datadog Agent tags (including the host and second primary tag). 
**Note:** Other tags set on spans are not available as tags on traces metrics.

## メトリクスサフィックス

### Hits

`trace.<SPAN_NAME>.hits`
: **Prerequisite:** This metric exists for any APM service.<br>
**Description:** Represent the count of spans created with a specific name (for example, `redis.command`, `pylons.request`, `rails.request`, or `mysql.query`).<br>
**Metric type:** [COUNT][5].<br>
**Tags:** `env`, `service`, `version`, `resource`, `resource_name`, `http.status_code`, all host tags from the Datadog Host Agent, and [the second primary tag][4].

`trace.<SPAN_NAME>.hits.by_http_status`
: **前提条件:** このメトリクスは、http メタデータが存在する場合 HTTP/WEB APM サービスに存在します。
<br>
**説明:** 特定のスパンのブレイクダウンの HTTP ステータスコード別ヒット数を表します。<br>
**メトリクスタイプ:** [COUNT][5]。<br>
**タグ:** `env`、`service`、`version`、`resource`、`resource_name`、`http.status_class`、`http.status_code`、Datadog Host Agent からのすべてのホストタグ、[第 2 プライマリタグ][4]。

### レイテンシー分布

`trace.<SPAN_NAME>`
: **Prerequisite:** This metric exists for any APM service.<br>
**Description:** Represent the latency distribution for all services, resources, and versions across different environments and second primary tags.<br>
**Metric type:** [DISTRIBUTION][6].<br>
**Tags:** `env`, `service`,`version`, `resource`, `resource_name`, `http.status_code`, `synthetics`, and [the second primary tag][4].

### エラー

`trace.<SPAN_NAME>.errors`
: **前提条件:** このメトリクスは、すべての APM サービスに存在します。
<br>
**説明:** 特定のスパンのエラー数を表します。<br>
**メトリクスタイプ:** [COUNT][5]。<br>
**タグ:** `env`、`service`、`version`、`resource`、`resource_name`、`http.status_code`、Datadog Host Agent からのすべてのホストタグ、[第 2 プライマリタグ][4]。

`trace.<SPAN_NAME>.errors.by_http_status`
: **前提条件:** このメトリクスは、すべての APM サービスに存在します。
<br>
**説明:** 特定のスパンのエラー数を表します。<br>
**メトリクスタイプ:** [COUNT][5]。<br>
**タグ:** `env`、`service`、`version`、`resource`、`http.status_class`、`http.status_code`、Datadog Host Agent からのすべてのホストタグ、[第 2 プライマリタグ][4]。

### Apdex

`trace.<SPAN_NAME>.apdex`
: **Prerequisite:** This metric exists for any HTTP or web-based APM service.<br>
**Description:** Measures the [Apdex][10] score for each web service.<br>
**Metric type:** [GAUGE][7].<br>
**Tags:** `env`, `service`, `version`, `resource` / `resource_name`, `synthetics`, and [the second primary tag][4].

### Duration

<div class="alert alert-danger">Datadog recommends <a href="/tracing/guide/ddsketch_trace_metrics/">tracing distribution metrics using DDSketch</a>.</div>

`trace.<SPAN_NAME>.duration`
: **前提条件:** このメトリクスは、すべての APM サービスに存在します。<br>
**説明:**  収集サービスで見られる子スパンを含む、時間間隔内のスパンのコレクションの合計時間を測定します。Datadog では、ほぼすべてのユースケースにおいて、平均レイテンシーまたはパーセンタイルの計算に[レイテンシー分布](#latency-distribution)を使用することが推奨されています。ホストタグフィルターを使用して平均レイテンシーを計算するには、このメトリクスを次の式で使用することができます。 <br>
`sum:trace.<SPAN_NAME>.duration{<FILTER>}.rollup(sum).fill(zero) / sum:trace.<SPAN_NAME>.hits{<FILTER>}` <br>
このメトリクスは、パーセンタイル集計をサポートしていません。詳細については、[レイテンシー分布](#latency-distribution)セクションをご覧ください。
**メトリクスタイプ:** [GAUGE][7].<br>
**タグ:** `env`、`service`、`resource`、`http.status_code`、Datadog Host Agent からのすべてのホストタグ、[第 2 プライマリタグ][4]。

### 継続時間

<div class="alert alert-danger">Datadog recommends <a href="/tracing/guide/ddsketch_trace_metrics/">tracing distribution metrics using DDSketch</a>.</div>

`trace.<SPAN_NAME>.duration.by_http_status`
: **前提条件:** このメトリクスは、http メタデータが存在する場合 HTTP/WEB APM サービスに存在します。
<br>
**説明:** 各 HTTP ステータスのスパンの収集にかかる合計時間を計測します。具体的には、1 回のインターバルおよび特定の HTTP ステータスで、すべてのスパンにかかった相対時間（子処理を待機していた時間を含む）です。<br>
**メトリクスタイプ:** [GAUGE][7]。<br>
**タグ:** `env`、`service`、`resource`、`http.status_class`、`http.status_code`、Datadog Host Agent からのすべてのホストタグ、[第 2 プライマリタグ][4]。

## Sampling impact on trace metrics

In most cases, trace metrics are calculated based on all application traffic. However, with certain trace ingestion sampling configurations, the metrics represent only a subset of all requests.

### Application-side sampling 

Some tracing libraries support application-side sampling, which reduces the number of spans before they are sent to the Datadog Agent. For example, the Ruby tracing library offers application-side sampling to lower performance overhead. However, this can affect trace metrics, as the Datadog Agent needs all spans to calculate accurate metrics. 

Very few tracing libraries support this setting, and using it is generally not recommended.

### OpenTelemetry sampling

The OpenTelemetry SDK's native sampling mechanisms lower the number of spans sent to the Datadog collector, resulting in sampled and potentially inaccurate trace metrics.

### XRay sampling

XRay spans are sampled before they are sent to Datadog, which means trace metrics might not reflect all traffic.


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_collection/
[2]: /ja/tracing/trace_pipeline/ingestion_mechanisms
[3]: /ja/tracing/glossary/#trace-metrics
[4]: /ja/tracing/guide/setting_primary_tags_to_scope/#add-a-second-primary-tag-in-datadog
[5]: /ja/metrics/types/?tab=count#metric-types
[6]: /ja/metrics/types/?tab=distribution#metric-types
[7]: /ja/metrics/types/?tab=gauge#metric-types
[8]: /ja/tracing/service_catalog/#services-types
[9]: /ja/tracing/glossary/#services
[10]: /ja/tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm/