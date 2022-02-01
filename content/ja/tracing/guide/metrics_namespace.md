---
title: トレースアプリケーションメトリクス
kind: ガイド
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
aliases:
  - /ja/tracing/getting_further/metrics_namespace
---
## 概要

トレースアプリケーションメトリクスは、[トレース収集の有効化][1]および[アプリケーションのインスツルメンテーション][2]の後に収集されます。これらのメトリクスは、ダッシュボードとモニターで使用できます。[トレースメトリクス][3]のネームスペースは以下の形式になります。

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
**タグ:** `env`、`service`、`version`、`resource`、`http.status_code`、Datadog Host Agent からのすべてのホストタグ、[第 2 プライマリタグ][4]。

`trace.<SPAN_NAME>.hits.by_http_status`
: **前提条件:** このメトリクスは、http メタデータが存在する場合 HTTP/WEB APM サービスに存在します。
<br>
**説明:** 特定のスパンのブレイクダウンの HTTP ステータスコード別ヒット数を表します。<br>
**メトリクスタイプ:** [COUNT][5]。<br>
**タグ:** `env`、`service`、`version`、`resource`、`http.status_class`、`http.status_code`、Datadog Host Agent からのすべてのホストタグ、[第 2 プライマリタグ][4]。

### レイテンシ分布

`trace.<SPAN_NAME>`
: **前提条件:** このメトリクスは、すべての APM サービスに存在します。
**説明:** 異なる環境や [the second primary tag][4] にまたがるすべてのサービス、リソース、バージョンのレイテンシ分布を表します。<br>
**メトリクスタイプ:** [DISTRIBUTION][6].<br>
**タグ:** `env`、 `service`、 `resource`、 `resource_name`、 `version`、 `synthetics`、 [the second primary tag][4].

### パーセンタイル集計

`trace.<SPAN_NAME>.duration.by.resource_<2ND_PRIM_TAG>_service.<PERCENTILE_AGGREGATION>`
: **前提条件:** このメトリクスは、すべての APM サービスに存在します。
<br>
**説明:** 処理にかかる合計時間をリソース、サービス、[第 2 プライマリタグ][4]別に測定します。<br>
**メトリクスタイプ:** [GAUGE][6]。<br>
**パーセンタイル集計:** `100p`、`50p`、`75p`、`90p`、`95p`、`99p`<br>
**タグ:** `env`、`service`、`resource`、[第 2 プライマリタグ][4]。

`trace.<SPAN_NAME>.duration.by.resource_service.<PERCENTILE_AGGREGATION>`
: **前提条件:** このメトリクスは、すべての APM サービスに存在します。
<br>
**説明:** リソースとサービスの各組み合せの処理にかかる合計時間を測定します。<br>
**メトリクスタイプ:** [GAUGE][6]。<br>
**パーセンタイル集計:** `100p`、`50p`、`75p`、`90p`、`95p`、`99p`<br>
**タグ:** `env`、`service`、`resource`。

`trace.<SPAN_NAME>.duration.by.<2ND_PRIM_TAG>_service.<PERCENTILE_AGGREGATION>`
: **前提条件:** このメトリクスは、すべての APM サービスに存在します。
<br>
**説明:** [第 2 プライマリタグ][4]とサービスの各組み合わせの処理にかかる合計時間を測定します。<br>
**メトリクスタイプ:** [GAUGE][6]。<br>
**パーセンタイル集計:** `100p`、`50p`、`75p`、`90p`、`95p`、`99p`<br>
**タグ:** `env`、`service`、[第 2 プライマリタグ][4]。

`trace.<SPAN_NAME>.duration.by.service.<PERCENTILE_AGGREGATION>`
: **前提条件:** このメトリクスは、すべての APM サービスに存在します。
<br>
**説明:** 個々のスパンの期間を表します。これは、レイテンシーを追跡し、「ユーザーが経験した待機時間の中央値はどれくらいか？」や「最も遅い 1 %のユーザーはどれくらい待つ必要があるか？」などの質問に答えるために使用されます。<br>
**メトリクスタイプ:** [GAUGE][6]。<br>
**パーセンタイル集計:** `100p`、`50p`、`75p`、`90p`、`95p`、`99p`<br>
**タグ:** `env`、`service`。

### Errors

`trace.<SPAN_NAME>.errors`
: **前提条件:** このメトリクスは、すべての APM サービスに存在します。
<br>
**説明:** 特定のスパンのエラー数を表します。<br>
**メトリクスタイプ:** [COUNT][5]。<br>
**タグ:** `env`、`service`、`version`、`resource`、`http.status_code`、Datadog Host Agent からのすべてのホストタグ、[第 2 プライマリタグ][4]。

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

`trace.<SPAN_NAME>.duration`
: **前提条件:** このメトリクスは、すべての APM サービスに存在します。
<br>
**説明:** スパンの収集にかかる合計時間を計測します。具体的には、1 回のインターバルですべてのスパンにかかった総時間（子処理を待機していた時間を含む）です。<br>
**メトリクスタイプ:** [GAUGE][6]。<br>
**タグ:** `env`、`service`、`resource`、`http.status_code`、Datadog Host Agent からのすべてのホストタグ、[第 2 プライマリタグ][4]。

### 継続時間

`trace.<SPAN_NAME>.duration.by_http_status`
: **前提条件:** このメトリクスは、http メタデータが存在する場合 HTTP/WEB APM サービスに存在します。
<br>
**説明:** 各 HTTP ステータスのスパンの収集にかかる合計時間を計測します。具体的には、1 回のインターバルおよび特定の HTTP ステータスで、すべてのスパンにかかった相対時間（子処理を待機していた時間を含む）です。<br>
**メトリクスタイプ:** [GAUGE][6]。<br>
**タグ:** `env`、`service`、`resource`、`http.status_class`、`http.status_code`、Datadog Host Agent からのすべてのホストタグ、[第 2 プライマリタグ][4]。

`trace.<SPAN_NAME>.duration.by_service`
: **前提条件:** このメトリクスは、すべての APM サービスに存在します。
<br>
**説明:** 各サービスで実際にかかった総処理時間を計測します（子処理を待機していた時間は除外されます）。<br>
**メトリクスタイプ:** [GAUGE][6]。<br>
**タグ:** `env`、`service`、`resource`、`sublayer_service`、`http.status_code`、Datadog Host Agent からのすべてのホストタグ、[第 2 プライマリタグ][4]。

`trace.<SPAN_NAME>.duration.by_type`
: **前提条件:** このメトリクスは、すべての APM サービスに存在します。
<br>
**説明:** 各[サービスタイプ][7]で実際にかかる処理の合計時間を計測します。<br>
**メトリクスタイプ:** [GAUGE][6]。<br>
**タグ:** `env`、`service`、`resource`、`sublayer_type`、`http.status_code`、Datadog Host Agent からのすべてのホストタグ、[第 2 プライマリタグ][4]。

`trace.<SPAN_NAME>.duration.by_type.by_http_status`
: **前提条件:** このメトリクスは、http メタデータが存在する場合 HTTP/WEB APM サービスに存在します。
<br>
**説明:** 各[サービスタイプ][7]および HTTP ステータスコードで実際にかかった処理の合計時間を計測します。<br>
**メトリクスタイプ:** [GAUGE][6]。<br>
**タグ:** `env`、`service`、`resource`、`sublayer_type`、`http.status_class`、`http.status_code`、Datadog Host Agent からのすべてのホストタグ、[第 2 プライマリタグ][4]。

`trace.<SPAN_NAME>.duration.by_service.by_http_status`
: **前提条件:** このメトリクスは、http メタデータが存在する場合 HTTP/WEB APM サービスに存在します。
<br>
**説明:** 各[サービス][8]および HTTP ステータスコードで実際にかかった処理の合計時間を計測します。<br>
**メトリクスタイプ:** [GAUGE][6]。<br>
**タグ:** `env`、`service`、`resource`、`sublayer_service`、`http.status_class`、`http.status_code`、Datadog Host Agent からのすべてのホストタグ、[第 2 プライマリタグ][4]。

### Apdex

`trace.<SPAN_NAME>.apdex`
: **前提条件:** このメトリクスは、すべての HTTP/WEB APM サービスに存在します。
<br>
**説明:** 各ウェブサービスの [Apdex][9] スコアを計測します。<br>
**メトリクスタイプ:** [GAUGE][6]。<br>
**タグ:** `env`、`service`、`resource` / `resource_name`、`version`、`synthetics`、[第 2 プライマリタグ][4]。

**次のレガシー apdex メトリクスは非推奨になりました。**

`trace.<SPAN_NAME>.apdex.by.resource_<2ND_PRIM_TAG>_service`
: **前提条件:** このメトリクスは、すべての HTTP/WEB APM サービスに存在します。
<br>
**説明:** リソース、[第 2 プライマリタグ][4]、サービスのすべての組み合わせの [Apdex][9] スコアを表します。<br>
**メトリクスタイプ:** [GAUGE][6]。<br>
**タグ:** `env`、`service`、`resource` / `resource_name`、[第 2 プライマリタグ][4]。

`trace.<SPAN_NAME>.apdex.by.resource_service`
: **前提条件:** このメトリクスは、すべての HTTP/WEB APM サービスに存在します。
<br>
**説明:** リソースとウェブサービスの各組み合わせの [Apdex][9] スコアを計測します。<br>
**メトリクスタイプ:** [GAUGE][6]。<br>
**タグ:** `env`、`service`、`resource` / `resource_name`。

`trace.<SPAN_NAME>.apdex.by.<2ND_PRIM_TAG>_service`
: **前提条件:** このメトリクスは、すべての HTTP/WEB APM サービスに存在します。
<br>
**説明:** [第 2 プライマリタグ][4]とウェブサービスの各組み合わせの [Apdex][9] スコアを計測します。<br>
**メトリクスタイプ:** [GAUGE][6]。<br>
**タグ:** `env`、`service`、[第 2 プライマリタグ][4]。

`trace.<SPAN_NAME>.apdex.by.service`
: **前提条件:** このメトリクスは、すべての HTTP/WEB APM サービスに存在します。
<br>
**説明:** 各ウェブサービスの [Apdex][9] スコアを計測します。<br>
**メトリクスタイプ:** [GAUGE][6]。<br>
**タグ:** `env`、`service`。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/send_traces/
[2]: /ja/tracing/setup/
[3]: /ja/tracing/visualization/#trace-metrics
[4]: /ja/tracing/guide/setting_primary_tags_to_scope/#add-a-second-primary-tag-in-datadog
[5]: /ja/metrics/types/?tab=count#metric-types
[6]: /ja/metrics/types/?tab=gauge#metric-types
[7]: /ja/tracing/visualization/services_list/#services-types
[8]: /ja/tracing/visualization/#services
[9]: /ja/tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm/
