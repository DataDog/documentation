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

| パラメーター               | 説明                                                                                                                                                                                                        |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `<スパン名>`                | 操作の名前または `span.name`（例: `redis.command`、`pylons.request`、`rails.request`、`mysql.query`）。                                                                                            |
| `<メトリクスサフィックス>`       | メトリクスの名前（例: `duration`、`hits`、`span_count`）。以下のセクションを参照してください。                                                                                                                                               |
| `<第_2_プライマリタグ>` | メトリクス名が [第 2 プライマリタグ][4]を考慮する場合、このタグはメトリクス名の一部です。                                                                                                                       |
| `<タグ>`                | トレースメトリクスタグ、可能なタグは、`env`、`service`、`version`、`resource`、`http.status_code`、`http.status_class`、Datadog Agent タグ（ホストと第 2 プライマリタグを含む）です。**注:** スパンに設定されたタグは数に含められず、トレースメトリクスのタグとして利用できません。T |

## メトリクスサフィックス

### Hits

- `trace.<スパン名>.hits`:
  - *前提条件:* このメトリクスは、すべての APM サービスに存在します。
  - *説明:* 特定のスパンのヒット数を表します。
  - *メトリクスタイプ:* [COUNT][5]
  - *タグ:* `env`、`service`、`version`、`resource`、`http.status_code`、Datadog Host Agent からのすべてのホストタグ、[第 2 プライマリタグ][4]

- `trace.<スパン名>.hits.by_http_status`
  - *前提条件:* このメトリクスは、HTTP メタデータが存在する場合、HTTP/WEB APM サービスに存在します。
  - *説明:* 特定のスパンのヒット数を HTTP ステータスコード別に表します。
  - *メトリクスタイプ:* [COUNT][5]
  - *タグ:* `env`、`service`、`version`、`resource`、`http.status_class`、`http.status_code`、Datadog Host Agent からのすべてのホストタグ、[第 2 プライマリタグ][4]

### パーセンタイル集計

- `trace.<スパン名>.duration.by.resource_<第_2_プライマリタグ>_service.<パーセンタイル集計>`:
  - *前提条件:* このメトリクスは、すべての APM サービスに存在します。
  - *説明:* リソース、サービス、[第 2 プライマリタグ][4]による処理に費やされた合計時間を測定します。
  - *メトリクスタイプ:* [GAUGE][6]
  - *パーセンタイル集計:* `100p`、`50p`、`75p`、`90p`、`95p`、`99p`
  - *タグ:* `env`、`service`、`resource`、[第 2 プライマリタグ][4]

- `trace.<スパン名>.duration.by.resource_service.<パーセンタイル集計>`:
  - *前提条件:* このメトリクスは、すべての APM サービスに存在します。
  - *説明:* 各リソースとサービスの組み合わせの処理に費やされた合計時間を測定します。
  - *メトリクスタイプ:* [GAUGE][6]
  - *パーセンタイル集計:* `100p`、`50p`、`75p`、`90p`、`95p`、`99p`
  - *タグ:* `env`、`service`、`resource`

- `trace.<スパン名>.duration.by.<第_2_プライマリタグ>_service.<パーセンタイル集計>`
  - *前提条件:* このメトリクスは、すべての APM サービスに存在します。
  - *説明:* 各[第 2 プライマリタグ][4]とサービスの組み合わせの処理に費やされた合計時間を測定します。
  - *メトリクスタイプ:* [GAUGE][6]
  - *パーセンタイル集計:* `100p`、`50p`、`75p`、`90p`、`95p`、`99p`
  - *タグ:* `env`、`service`、[第 2 プライマリタグ][4]

- `trace.<スパン名>.duration.by.service.<パーセンタイル集計>`
  - *前提条件:* このメトリクスは、すべての APM サービスに存在します。
  - *説明:* 個々のスパンの期間を表します。これは、レイテンシーを追跡し、「ユーザーが経験した待機時間の中央値はどれくらいか？」や「最も遅い 1 %のユーザーはどれくらい待つ必要があるか？」などの質問に答えるために使用されます。
  - *メトリクスタイプ:* [GAUGE][6]
  - *パーセンタイル集計:* `100p`、`50p`、`75p`、`90p`、`95p`、`99p`
  - *タグ:* `env`、`service`

### Errors

- `trace.<スパン名>.errors`:
  - *前提条件:* このメトリクスは、すべての APM サービスに存在します。
  - *説明:* 特定のスパンのエラー数を表します。
  - *メトリクスタイプ:* [COUNT][5]
  - *タグ:* `env`、`service`、`version`、`resource`、`http.status_code`、Datadog Host Agent からのすべてのホストタグ、[第 2 プライマリタグ][4]

- `trace.<スパン名>.errors.by_http_status`:
  - *前提条件:* このメトリクスは、すべての APM サービスに存在します。
  - *説明:* 特定のスパンのエラー数を表します。
  - *メトリクスタイプ:* [COUNT][5]
  - *タグ:* `env`、`service`、`version`、`resource`、`http.status_class`、`http.status_code`、Datadog Host Agent からのすべてのホストタグ、[第 2 プライマリタグ][4]


### スパン数

**注**: これは非推奨のネームスペースです。

- `trace.<スパン名>.span_count`:
  - *前提条件:* このメトリクスは、すべての APM サービスに存在します。
  - *説明:* 特定の間隔で収集されたスパンの量を表します。
  - *メトリクスタイプ:* [COUNT][5]
  - *タグ:* `env`、`service`、`resource`、Datadog Host Agent からのすべてのホストタグ、[第 2 プライマリタグ][4]

- `trace.<スパン名>.span_count.by_http_status`:
  - *前提条件:* このメトリクスは、HTTP メタデータが存在する場合、HTTP/WEB APM サービスに存在します。
  - *説明:* 特定の間隔で収集されたスパンの量を HTTP ステータス別に表します。
  - *メトリクスタイプ:* [COUNT][5]
  - *タグ:* `env`、`service`、`resource`、`http.status_class`、`http.status_code`、Datadog Host Agent からのすべてのホストタグ、[第 2 プライマリタグ][4]


### Duration

- `trace.<スパン名>.duration`:
  - *前提条件:* このメトリクスは、すべての APM サービスに存在します。
  - *説明:* スパンのコレクションの合計時間を測定します。具体的には、ある間隔ですべてのスパンが費やした合計時間で、子プロセスの待機に費やされた時間を含みます。
  - *メトリクスタイプ:* [GAUGE][6]
  - *タグ:* `env`、`service`、`resource`、`http.status_code`、Datadog Host Agent からのすべてのホストタグ、[第 2 プライマリタグ][4]

### 継続時間
- `trace.<スパン名>.duration.by_http_status`:
  - *前提条件:* このメトリクスは、HTTP メタデータが存在する場合、HTTP/WEB APM サービスに存在します。
  - *説明:* 各 HTTP ステータスのスパンのコレクションの合計時間を測定します。具体的には、ある間隔ですべてのスパンが費やした時間と、特定の HTTP ステータスの相対的な割合で、子プロセスの待機に費やされた時間を含みます。
  - *メトリクスタイプ:* [GAUGE][6]
  - *タグ:* `env`、`service`、`resource`、`http.status_class`、`http.status_code`、Datadog Host Agent からのすべてのホストタグ、[第 2 プライマリタグ][4]

### Apdex

- `trace.<スパン名>.apdex.by.resource_<第_2_プライマリタグ>_service`:
  - *前提条件:* このメトリクスは、すべての HTTP/WEB APM サービスに存在します。
  - *説明:* リソース、[第 2 プライマリタグ][4]およびサービスのすべての組み合わせの [Apdex][9] スコアを表します。
  - *メトリクスタイプ:* [GAUGE][6]
  - *タグ:* `env`、`service`、`resource`、[第 2 プライマリタグ][4]

- `trace.<スパン名>.apdex.by.resource_service`:
  - *前提条件:* このメトリクスは、すべての HTTP/WEB APM サービスに存在します。
  - *説明:* リソースとウェブサービスの組み合わせごとに [Apdex][9] スコアを測定します。
  - *メトリクスタイプ:* [GAUGE][6]
  - *タグ:* `env`、`service`、`resource`

- `trace.<スパン名>.apdex.by.<第_2_プライマリタグ>_service`:
  - *前提条件:* このメトリクスは、すべての HTTP/WEB APM サービスに存在します。
  - *説明:* [第 2 プライマリタグ][4]とウェブサービスの組み合わせごとに [Apdex][9] スコアを測定します。
  - *メトリクスタイプ:* [GAUGE][6]
  - *タグ:* `env`、`service`、[第 2 プライマリタグ][4]

- `trace.<スパン名>.apdex.by.service`:
  - *前提条件:* このメトリクスは、すべての HTTP/WEB APM サービスに存在します。
  - *説明:* 各ウェブサービスの [Apdex][9] スコアを測定します。
  - *メトリクスタイプ:* [GAUGE][6]
  - *タグ:* `env`、`service`

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/send_traces/
[2]: /ja/tracing/setup/
[3]: /ja/tracing/visualization/#trace-metrics
[4]: /ja/tracing/guide/setting_primary_tags_to_scope/#add-a-second-primary-tag-in-datadog
[5]: /ja/developers/metrics/types/?tab=count#metric-types
[6]: /ja/developers/metrics/types/?tab=gauge#metric-types
[7]: /ja/tracing/visualization/services_list/#services-types
[8]: /ja/tracing/visualization/#services
[9]: /ja/tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm/
