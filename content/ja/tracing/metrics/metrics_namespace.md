---
aliases:
- /ja/tracing/getting_further/metrics_namespace
- /ja/tracing/guide/metrics_namespace
further_reading:
- link: tracing/trace_collection/
  tag: ドキュメント
  text: アプリケーションで APM トレースをセットアップする方法
- link: tracing/services/services_list/
  tag: ドキュメント
  text: Datadog に報告するサービスの一覧
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
- `trace.<スパン名>.<メトリクスサフィックス>.<第 2 プライマリタグ>_service`

次の定義と組み合わせます。

`<SPAN_NAME>`
: 操作の名前または `span.name`（例: `redis.command`、`pylons.request`、`rails.request`、`mysql.query`）。

`<METRIC_SUFFIX>`
: メトリクスの名前（例: `duration`、`hits`、`span_count`）。以下のセクションを参照してください。

`<2ND_PRIM_TAG>`
: メトリクス名が [第 2 プライマリタグ][4]を考慮する場合、このタグはメトリクス名の一部です。

`<TAGS>`
: トレースメトリクスタグ、可能なタグは、`env`、`service`、`version`、`resource`、`sublayer_type`、`sublayer_service`、`http.status_code`、`http.status_class`、Datadog Agent タグ（ホストと第 2 プライマリタグを含む）です。**注:** スパンに設定されたタグは数に含められず、トレースメトリクスのタグとして利用できません。

## メトリクスサフィックス

### Hits

`trace.<SPAN_NAME>.hits`
: **前提条件:** このメトリクスは、すべての APM サービスに存在します。
<br>
**説明:** 特定のスパンのヒット数を表します。<br>
**メトリクスタイプ:** [COUNT][5]。<br>
**タグ:** `env`、`service`、`version`、`resource`、`resource_name`、`http.status_code`、Datadog Host Agent からのすべてのホストタグ、[第 2 プライマリタグ][4]。

`trace.<SPAN_NAME>.hits.by_http_status`
: **前提条件:** このメトリクスは、http メタデータが存在する場合 HTTP/WEB APM サービスに存在します。
<br>
**説明:** 特定のスパンのブレイクダウンの HTTP ステータスコード別ヒット数を表します。<br>
**メトリクスタイプ:** [COUNT][5]。<br>
**タグ:** `env`、`service`、`version`、`resource`、`resource_name`、`http.status_class`、`http.status_code`、Datadog Host Agent からのすべてのホストタグ、[第 2 プライマリタグ][4]。

### レイテンシー分布

`trace.<SPAN_NAME>`
: **前提条件:** このメトリクスは、どの APM サービスにも存在します。<br>
**説明:** 異なる環境と第 2 プライマリタグにまたがるすべてのサービス、リソース、およびバージョンのレインテンシー分布を表現します。<br>
**メトリクスタイプ:** [DISTRIBUTION][6]。<br>
**タグ:** `env`、`service`、`resource`、`resource_name`、`version`、`synthetics`、[第 2 プライマリタグ][4]。


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


### スパン数

**注**: これは非推奨のネームスペースです。

`trace.<SPAN_NAME>.span_count`
: **前提条件:** このメトリクスは、すべての APM サービスに存在します。
<br>
**説明:** 特定のインターバルで収集されたスパンの量を表します。<br>
**メトリクスタイプ:** [COUNT][5]。<br>
**タグ:** `env`、`service`、`resource`、Datadog Host Agent からのすべてのホストタグ、[第 2 プライマリタグ][4]。

`trace.<SPAN_NAME>.span_count.by_http_status`
: **前提条件:** このメトリクスは、http メタデータが存在する場合 HTTP/WEB APM サービスに存在します。
<br>
**説明:** 特定のインターバルブレイクダウンで収集されたスパンの量を HTTP ステータスコード別に表します。<br>
**メトリクスタイプ:** [COUNT][5]。<br>
**タグ:** `env`、`service`、`resource`、`http.status_class`、`http.status_code`、Datadog Host Agent からのすべてのホストタグ、[第 2 プライマリタグ][4]。


### Duration

<div class="alert alert-warning">Datadogでは、代わりに <a href="/tracing/guide/ddsketch_trace_metrics/">DDSketch を使用して分散メトリクスをトレース</a>することを推奨しています。</div>

`trace.<SPAN_NAME>.duration`
: **前提条件:** このメトリクスは、すべての APM サービスに存在します。<br>
**説明:**  収集サービスで見られる子スパンを含む、時間間隔内のスパンのコレクションの合計時間を測定します。Datadog では、ほぼすべてのユースケースにおいて、平均レイテンシーまたはパーセンタイルの計算に[レイテンシー分布](#latency-distribution)を使用することが推奨されています。ホストタグフィルターを使用して平均レイテンシーを計算するには、このメトリクスを次の式で使用することができます。 <br>
`sum:trace.<SPAN_NAME>.duration{<FILTER>}.rollup(sum).fill(zero) / sum:trace.<SPAN_NAME>.hits{<FILTER>}` <br>
このメトリクスは、パーセンタイル集計をサポートしていません。詳細については、[レイテンシー分布](#latency-distribution)セクションをご覧ください。
**メトリクスタイプ:** [GAUGE][7].<br>
**タグ:** `env`、`service`、`resource`、`http.status_code`、Datadog Host Agent からのすべてのホストタグ、[第 2 プライマリタグ][4]。

### 継続時間

<div class="alert alert-warning">このトレースメトリクスの使用方法は時代遅れです。代わりに、<a href="/tracing/guide/ddsketch_trace_metrics/">DDSketch を使用してディストリビューションメトリクスをトレースする</a>ことが推奨されます。</div>

`trace.<SPAN_NAME>.duration.by_http_status`
: **前提条件:** このメトリクスは、http メタデータが存在する場合 HTTP/WEB APM サービスに存在します。
<br>
**説明:** 各 HTTP ステータスのスパンの収集にかかる合計時間を計測します。具体的には、1 回のインターバルおよび特定の HTTP ステータスで、すべてのスパンにかかった相対時間（子処理を待機していた時間を含む）です。<br>
**メトリクスタイプ:** [GAUGE][7]。<br>
**タグ:** `env`、`service`、`resource`、`http.status_class`、`http.status_code`、Datadog Host Agent からのすべてのホストタグ、[第 2 プライマリタグ][4]。

`trace.<SPAN_NAME>.duration.by_service`
: **前提条件:** このメトリクスは、すべての APM サービスに存在します。
<br>
**説明:** 各サービスで実際にかかった総処理時間を計測します（子処理を待機していた時間は除外されます）。<br>
**メトリクスタイプ:** [GAUGE][7]。<br>
**タグ:** `env`、`service`、`resource`、`sublayer_service`、`http.status_code`、Datadog Host Agent からのすべてのホストタグ、[第 2 プライマリタグ][4]。

`trace.<SPAN_NAME>.duration.by_type`
: **前提条件:** このメトリクスは、すべての APM サービスに存在します。
<br>
**説明:** 各[サービスタイプ][8]で実際にかかる処理の合計時間を計測します。<br>
**メトリクスタイプ:** [GAUGE][7]。<br>
**タグ:** `env`、`service`、`resource`、`sublayer_type`、`http.status_code`、Datadog Host Agent からのすべてのホストタグ、[第 2 プライマリタグ][4]。

`trace.<SPAN_NAME>.duration.by_type.by_http_status`
: **前提条件:** このメトリクスは、http メタデータが存在する場合 HTTP/WEB APM サービスに存在します。
<br>
**説明:** 各[サービスタイプ][8]および HTTP ステータスコードで実際にかかった処理の合計時間を計測します。<br>
**メトリクスタイプ:** [GAUGE][7]。<br>
**タグ:** `env`、`service`、`resource`、`sublayer_type`、`http.status_class`、`http.status_code`、Datadog Host Agent からのすべてのホストタグ、[第 2 プライマリタグ][4]。

`trace.<SPAN_NAME>.duration.by_service.by_http_status`
: **前提条件:** このメトリクスは、http メタデータが存在する場合 HTTP/WEB APM サービスに存在します。
<br>
**説明:** 各[サービス][9]および HTTP ステータスコードで実際にかかった処理の合計時間を計測します。<br>
**メトリクスタイプ:** [GAUGE][7]。<br>
**タグ:** `env`、`service`、`resource`、`sublayer_service`、`http.status_class`、`http.status_code`、Datadog Host Agent からのすべてのホストタグ、[第 2 プライマリタグ][4]。

### Apdex

`trace.<SPAN_NAME>.apdex`
: **前提条件:** このメトリクスは、すべての HTTP/WEB APM サービスに存在します。
<br>
**説明:** 各ウェブサービスの [Apdex][10] スコアを計測します。<br>
**メトリクスタイプ:** [GAUGE][7]。<br>
**タグ:** `env`、`service`、`resource` / `resource_name`、`version`、`synthetics`、[第 2 プライマリタグ][4]。

**次のレガシー apdex メトリクスは非推奨になりました。**

`trace.<SPAN_NAME>.apdex.by.resource_<2ND_PRIM_TAG>_service`
: **前提条件:** このメトリクスは、すべての HTTP/WEB APM サービスに存在します。
<br>
**説明:** リソース、[第 2 プライマリタグ][4]、サービスのすべての組み合わせの [Apdex][10] スコアを表します。<br>
**メトリクスタイプ:** [GAUGE][7]。<br>
**タグ:** `env`、`service`、`resource` / `resource_name`、[第 2 プライマリタグ][4]。

`trace.<SPAN_NAME>.apdex.by.resource_service`
: **前提条件:** このメトリクスは、すべての HTTP/WEB APM サービスに存在します。
<br>
**説明:** リソースとウェブサービスの各組み合わせの [Apdex][10] スコアを計測します。<br>
**メトリクスタイプ:** [GAUGE][7]。<br>
**タグ:** `env`、`service`、`resource` / `resource_name`。

`trace.<SPAN_NAME>.apdex.by.<2ND_PRIM_TAG>_service`
: **前提条件:** このメトリクスは、すべての HTTP/WEB APM サービスに存在します。
<br>
**説明:** [第 2 プライマリタグ][4]とウェブサービスの各組み合わせの [Apdex][10] スコアを計測します。<br>
**メトリクスタイプ:** [GAUGE][7]。<br>
**タグ:** `env`、`service`、[第 2 プライマリタグ][4]。

`trace.<SPAN_NAME>.apdex.by.service`
: **前提条件:** このメトリクスは、すべての HTTP/WEB APM サービスに存在します。
<br>
**説明:** 各ウェブサービスの [Apdex][10] スコアを計測します。<br>
**メトリクスタイプ:** [GAUGE][7]。<br>
**タグ:** `env`、`service`。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_collection/
[2]: /ja/tracing/trace_pipeline/ingestion_mechanisms
[3]: /ja/tracing/glossary/#trace-metrics
[4]: /ja/tracing/guide/setting_primary_tags_to_scope/#add-a-second-primary-tag-in-datadog
[5]: /ja/metrics/types/?tab=count#metric-types
[6]: /ja/metrics/types/?tab=distribution#metric-types
[7]: /ja/metrics/types/?tab=gauge#metric-types
[8]: /ja/tracing/services/services_list/#services-types
[9]: /ja/tracing/glossary/#services
[10]: /ja/tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm/