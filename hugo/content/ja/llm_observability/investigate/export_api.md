---
aliases:
- /ja/llm_observability/evaluations/export_api/
description: Agent Observability Export API のリファレンス。外部評価やオフラインストレージ用にスパンデータを検索および取得するためのエンドポイントを提供します。
title: エクスポート API
---
## 概要 {#overview}

Agent Observability Export API は、スパンデータを取得するためのエンドポイントを提供します。これらのエンドポイントを使用すると、Agent Observability データにプログラムでアクセスして、外部評価を実行したり、オフラインストレージ用にスパンをエクスポートしたりできます。

<div class="alert alert-info">デフォルトでは、過去 15 分間のスパンがエクスポートされます。この期間外を検索する必要がある場合は、リクエストで時間範囲を指定します。</div>

## スパンを検索する {#search-spans}

このエンドポイントを使用して、特定の条件に基づいて Agent Observability スパンを検索およびフィルタリングします。

エンドポイント
: `https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/llm-obs/v1/spans/events/search`

メソッド
: `POST`

### リクエスト {#request}

#### ヘッダー (必須) {#headers-required}
- `DD-API-KEY=<YOUR_DATADOG_API_KEY>`
- `DD-APPLICATION-KEY=<YOUR_DATADOG_APPLICATION_KEY>`
- `Content-Type="application/vnd.api+json"`

#### 本文データ (必須){#body-data-required}

{{< tabs >}}
{{% tab "モデル" %}}
| フィールド | 型 | 説明                  |
|-------|------------------------------|------|
| data[required] | [SearchSpansRequest](#searchspansrequest) | リクエスト本文へのエントリーポイント。 |
{{% /tab %}}

{{% tab "例" %}}
{{< code-block lang="json" >}}
{
  "data": {
    "type": "spans",
    "attributes": {
      "filter": {
        "from": "2025-10-27T00:00:00Z",
        "to": "2025-10-29T23:59:59Z",
        "trace_id": "123456789",
        "span_kind": "llm",
        "tags": {
          "test-key": "correct-test-value"
        }
      },
      "page": {
        "limit": 2
      },
      "options": {
        "time_offset": 3600
      },
      "sort": "timestamp"
    }
  }
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

#### コード例{#code-example}

{{< tabs >}}
{{% tab "Curl" %}}
{{< code-block lang="bash" >}}
curl -X POST "https://api.datadoghq.com/api/v2/llm-obs/v1/spans/events/search" \
-H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
-H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
-H "Content-Type: application/vnd.api+json" \
-d @- << EOF
{
  "data": {
    "type": "spans",
    "attributes": {
      "filter": {
        "from": "2025-10-27T00:00:00Z",
        "to": "2025-10-29T23:59:59Z",
        "span_id": "14624140233640368324"
      }
    }
  }
}
EOF
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## スパンを一覧表示する {#list-spans}

このエンドポイントを使用して、Agent Observability スパンの一覧を取得します。

エンドポイント
: `https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/llm-obs/v1/spans/events`

メソッド
: `GET`

### リクエスト {#request-1}

#### ヘッダー (必須) {#headers-required-1}
- `DD-API-KEY=<YOUR_DATADOG_API_KEY>`
- `DD-APPLICATION-KEY=<YOUR_DATADOG_APPLICATION_KEY>`

#### クエリパラメーター {#query-parameters}

| パラメーター | 型 | 説明                  |
|-------|------------------------------|------|
| filter[query] | string | 汎用的な EVP クエリ構文を使用してスパンを検索します。クエリフィルターが指定されていない場合は、他のフィルターが優先されます。|
| filter[span_id] | string | スパン ID を指定して特定のスパンを検索します。 |
| filter[trace_id] | string | トレース ID でスパンを検索します。 |
| filter[tag][key] | string | タグキーと値のペアでスパンを検索します。|
| filter[span_kind] | string | スパンの種類: "agent"、"workflow"、"llm"、"tool"、"task"、"embedding"、または "retrieval"。|
| filter[span_name] | string | 指定された名前に基づいてスパンを検索します。|
| filter[ml_app] | string | 特定の ML アプリケーションに対して送信されたスパンを検索します。|
| filter[from] | string | 要求されたスパンの最小タイムスタンプ。ISO8601 形式の日時、日付計算、および通常のタイムスタンプ (ミリ秒) をサポートしています。デフォルトは現在時刻の 15 分前です。|
| filter[to] | string | 要求されたスパンの最大タイムスタンプ。ISO8601 形式の日時、日付計算、および通常のタイムスタンプ (ミリ秒) をサポートしています。デフォルトは現在時刻です。|
| sort | string | ソート順。許可される値: timestamp、-timestamp |
| include_attachments | boolean | 切り捨てられた入力および出力コンテンツを取得するかどうか。デフォルトは True です。|
| page[cursor] | string | 前のクエリで提供されたカーソルを使用して、後続の結果を一覧表示します。|
| page[limit] | integer | レスポンスに含まれるスパンの最大数。デフォルト: 10。設定可能な最大値: 5000。<br>**注:** レスポンスには 50 MB のサイズ制限があります。大きな制限値 (100 以上) を設定すると、レスポンス時間が長くなる可能性があります。スパンに大きな入力や出力が含まれる場合は、より小さい制限値を使用し、`page[cursor]` でページネーションを行ってください。|

#### コード例{#code-example-1}

{{< tabs >}}
{{% tab "Curl" %}}
{{< code-block lang="bash" >}}
curl -G "https://api.datadoghq.com/api/v2/llm-obs/v1/spans/events" \
-H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
-H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
# searches for spans from the past 15 minutes
--data-urlencode "filter[trace_id]=6903738200000000af2d3775dfc70530"
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## レスポンス {#response}

両方のエンドポイントで同じレスポンス形式が使用されます。[結果はページネーションされます](/logs/guide/collect-multiple-logs-with-pagination/)。

{{< tabs >}}
{{% tab "モデル" %}}
| フィールド   | 型                        | 説明                              |
|---------|-----------------------------|------------------------------------------|
| data    | [[SearchedSpanResource](#searchedspanresource)]             | 検索条件に一致するスパンのリスト。|
| meta    | [Meta](#meta)       | レスポンスに関するメタデータ。            |
| links    | [Links](#links)       | リンク属性。            |
{{% /tab %}}

{{% tab "例" %}}
{{< code-block lang="json" >}}
{
  "data": [
    {
      "id": "14624140233640368324",
      "type": "span",
      "attributes": {
        "duration": 83000,
        "evaluation": {
          "failure_to_answer": {
              "eval_metric_type": "categorical",
              "value": "answered",
              "assessment": "pass",
              "status": "OK",
              "metadata": {
                  "_dd": {
                      "evaluation_kind": "failure_to_answer"
                  }
              },
              "llm_output": "answered"
          }
        },
        "input": {
          "value": "hi",
          "messages": [
            {
              "content": "hi",
              "role": "user"
            }
          ]
        },
        "metadata": {
          "test-key": "test-value"
        },
        "metrics": {
          "cache_read_input_tokens": 0,
          "cache_write_input_tokens": 0,
          "estimated_cache_read_input_cost": 0,
          "estimated_cache_write_input_cost": 0,
          "estimated_input_cost": 1500,
          "estimated_non_cached_input_cost": 1500,
          "estimated_output_cost": 6000,
          "estimated_total_cost": 7500,
          "input_tokens": 10,
          "non_cached_input_tokens": 10,
          "output_tokens": 10,
          "total_tokens": 20
        },
        "ml_app": "test-ml-app",
        "model_name": "gpt-4o-mini",
        "model_provider": "openai",
        "name": "llm_call_enriched",
        "output": {
          "value": "hello there",
          "messages": [
            {
              "content": "hello there",
              "role": "assistant"
            }
          ]
        },
        "parent_id": "undefined",
        "span_id": "14624140233640368324",
        "span_kind": "llm",
        "start_ns": 1761833858897,
        "status": "ok",
        "tags": [
          "service:test-service",
          "env:prod",
          "ddtrace.version:3.17",
          "test-key:test-value",
          "error:0",
          "source:llm-observability",
          "source:integration",
          "ml_app:test-ml-app",
          "version:",
          "language:python"
        ],
        "tool_definitions": [
          {
            "name": "test-tool",
            "description": "A test tool",
            "schema": {
              "test-key": "test-value"
            }
          }
        ],
        "trace_id": "6903738200000000af2d3775dfc70530"
      }
    }
  ],
  "meta": {
    "elapsed": 336,
    "request_id": "pddv1ChZucHRwTW96NFNfT3Z4bWFLTFBDWkR3Ii0KHYhY65R_1R21AyDpavSaeO2sul_V6omQLAyWutrzEgx-GnVDrZaMu-lW-Yc",
    "status": "done",
    "page": null
  }
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}


## API の規格{#api-standards}

### SearchSpansRequest {#searchspansrequest}

| フィールド      | 型                          | 説明                                |
|------------|-------------------------------|--------------------------------------------|
| type [*必須*]        | string                        | リクエストの識別子。`spans` に設定します。|
| attributes [*必須*]  | [SearchSpansPayload](#searchspanspayload) | リクエストの本文。 |

### SearchSpansPayload {#searchspanspayload}

| フィールド | 型 | 説明                  |
|-------|------------------------------|------|
| filter | [Filter](#filter) | 検索およびフィルターのクエリ設定。|
| options | [Options](#options) | クエリ中に使用されるグローバルクエリオプション。|
| page | [PageQuery](#pagequery) | スパンを一覧表示するためのページング属性。|
| sort | string | ソート順。許可される値: timestamp、-timestamp |

### フィルタリングする {#filter}

| フィールド | 型 | 説明 |
|-------|------|-------------|
| query | string | 汎用的な EVP クエリ構文を使用してスパンを検索します。クエリフィルターが指定されていない場合は、他のフィルターが優先されます。|
| span_id | string | スパン ID で特定のスパンを検索します。 |
| trace_id | string | トレース ID でスパンを検索します。 |
| tags | Dict[key (string), string] | タグキーと値のペアでスパンを検索します。|
| span_kind | string | スパンの種類: "agent"、"workflow"、"llm"、"tool"、"task"、"embedding"、または "retrieval"。|
| span_name | string | 指定された名前に基づいてスパンを検索します。|
| ml_app | string | 特定の ML アプリケーションの下で送信されたスパンを検索します。|
| from | string | 要求されたスパンの最小タイムスタンプ。ISO8601 形式の日時、日付計算、および通常のタイムスタンプ (ミリ秒) をサポートしています。デフォルトは現在時刻の 15 分前です。|
| to | string | 要求されたスパンの最大タイムスタンプ。ISO8601 形式の日時、日付計算、および通常のタイムスタンプ (ミリ秒) をサポートしています。デフォルトは現在時刻です。|

### オプション {#options}

| フィールド | 型 | 説明 |
|-------|------|-------------|
| time_offset | integer | クエリに適用するタイムオフセット (秒単位)。|
| include_attachments | boolean | 切り捨てられた入力および出力コンテンツを取得するかどうか。デフォルトは True です。|

### PageQuery {#pagequery}

| フィールド | 型 | 説明 |
|-------|------|-------------|
| limit | integer | レスポンスに含まれるスパンの最大数。デフォルト: 10。設定可能な最大値: 5000。<br>**注:** レスポンスには 50 MB のサイズ制限があります。大きな制限値 (100 以上) を設定すると、レスポンス時間が長くなる可能性があります。スパンに大きな入力や出力が含まれる場合は、より小さい制限値を使用し、`cursor` でページネーションを行ってください。|
| cursor | string | 前のクエリで提供されたカーソルを使用して、後続の結果を一覧表示します。|

### SearchedSpanResource {#searchedspanresource}

| フィールド      | 型                          | 説明                                |
|------------|-------------------------------|--------------------------------------------|
| type        | string                        | スパンのタイプ。許可される値: span。デフォルト: span。|
| id       | string                        | スパンの一意の ID。|
| attributes | [SearchedSpan](#searchedspan) | すべてのスパン属性とそれらに関連付けられた値を含むオブジェクト。 |

### SearchedSpan {#searchedspan}

| フィールド      | 型                          | 説明                                |
|------------|-------------------------------|--------------------------------------------|
| span_id        | string                        | スパン固有の ID。|
| trace_id        | string                        | 同じトレース内のすべてのスパンで共有される一意の ID。|
| parent_id        | string                        | スパンの直接の親の ID。|
| tags        | [string]                        | スパンに関連付けられたタグの配列。|
| name        | string                       | スパンの名前。|
| status        | string                       | エラーステータス ("ok" または "error")。|
| start_ns        | integer                       | スパンの開始時間 (ナノ秒単位)。|
| duration        | float                       | スパンの期間 (ナノ秒単位)。|
| ml_app        | string                       | スパンの LLM アプリケーションの名前。|
| metadata        | Dict[key (string), any]                       | 入力や出力に関連しない、スパンに関するデータ。|
| span_kind        | string                       | スパンの種類: "agent"、"workflow"、"llm"、"tool"、"task"、"embedding"、または "retrieval"。|
| model_name        | string                       | リクエストで使用されたモデルの名前。LLM スパンにのみ適用されます。|
| model_provider        | string                       | リクエストで使用されたモデルのプロバイダー。LLM スパンにのみ適用されます。|
| input        | [SearchedIO](#searchedio)                      | スパンの入力情報。|
| output        | [SearchedIO](#searchedio)                       | スパンの出力情報。|
| tool_definitions        | [[ToolDefinition](#tooldefinition)]                       | LLM リクエストで使用可能なツールのリスト。|
| metrics        | Dict[key (string), float]                      | 収集する Datadog メトリクス。|
| evaluation        | Dict[key (string), [SpanEvalMetric](#spanevalmetric)]                      | スパンに関連付けられた評価のマップ。|
| intent        | string                       | MCP ツール呼び出しのインテント。|

### SearchedIO {#searchedio}

| フィールド      | 型                          | 説明                                |
|------------|-------------------------------|--------------------------------------------|
| value        | string                        | 入力または出力の値。|
| messages        | [[Message](#message)]                        | メッセージのリスト。これは LLM スパンにのみ関連します。|

### メッセージ {#message}

| フィールド      | 型                          | 説明                                |
|------------|-------------------------------|--------------------------------------------|
| content        | string                        | メッセージの本文。|
| role        | string                        | エンティティの役割。|
| tool_calls        | [[ToolCall](#toolcall)]                     | このメッセージで行われたツール呼び出しのリスト。|
| tool_results        | [[ToolResults](#toolresult)]                     | このメッセージ内のツール実行結果のリスト。|

### ToolCall {#toolcall}

| フィールド      | 型                          | 説明                                |
|------------|-------------------------------|--------------------------------------------|
| name        | string                        | 呼び出されるツールの名前。|
| arguments        | Dict[key (string), any]                         | ツールに渡される引数。|
| tool_id        | string                        | このツール呼び出しの一意の識別子。|
| type        | string                       | ツール呼び出しのタイプ。|

### ToolResult {#toolresult}

| フィールド      | 型                          | 説明                                |
|------------|-------------------------------|--------------------------------------------|
| name        | string                        | 呼び出されたツールの名前。|
| result        | string                        | ツールによって返された結果。|
| tool_id        | string                        | 対応するツール呼び出しと一致する一意の識別子。|
| type        | string                        | ツール結果のタイプ。|

### ToolDefinition {#tooldefinition}

| フィールド      | 型                          | 説明                                |
|------------|-------------------------------|--------------------------------------------|
| name        | string                        | ツールの名前。|
| description        | string                       | ツールの機能の説明。|
| schema        | Dict[key (string), any]                       | ツールが受け入れる引数に関するデータ。|

### SpanEvalMetric {#spanevalmetric}

| フィールド      | 型                          | 説明                                |
|------------|-------------------------------|--------------------------------------------|
| eval_metric_type        | string                        | 評価メトリクスのタイプ。有効な値は、`categorical`、`score`、`boolean`、および `json` です。 |
| value        | any                       | 評価結果。文字列、浮動小数点数、ブール値、または JSON 値を指定できます。|
| reasoning        | string                       | 評価結果の理由。|
| assessment        | string                       | 評価が合格か不合格か。有効な値は、`pass`および `fail` です。|
| status        | string                       | 評価実行のステータス。有効な値は、`OK`、`WARN`、および `ERROR` です。|
| error        | [EvalMetricError](#evalmetricerror)                       | 評価の実行時に発生したエラーに関する情報 (存在する場合)。|
| tags        | [string]                       | 評価メトリクスに関連付けられたキーと値のペア。|
| action        | string                       | ユーザーが送信した評価の評価結果に応じて実行されたアクション。|
| eval_metric_metadata        | Dict[key (string), any]                        | 評価に関連付けられた任意の JSON データ。|
| llm_output        | string                       | 評価結果を決定するために使用された LLM 呼び出しからの生の出力。|

### EvalMetricError {#evalmetricerror}

| フィールド      | 型                          | 説明                                |
|------------|-------------------------------|--------------------------------------------|
| message        | string                        | エラーの説明。これには、評価がスキップされた理由や、評価の実行中に生成されたエラーメッセージが含まれる場合があります。|
| stack        | string                        | 評価エラーに関連付けられたスタックトレース。|
| type        | string                        | エラーのカテゴリー。評価がスキップまたは失敗した理由を示す固定された理由のいずれか。|
| recommended_resolution        | string                        | エラーを解決するために必要な手順。|

### Meta {#meta}

| フィールド      | 型                          | 説明                                |
|------------|-------------------------------|--------------------------------------------|
| elapsed        | integer                        | 経過時間 (ミリ秒)。|
| page        | [Page](#page)                        | ページング属性。|
| request_id        | string                       | リクエストの識別子。|
| status        | string                       | レスポンスのステータス。許可される値: done、timeout |

### Page {#page}

| フィールド      | 型                          | 説明                                |
|------------|-------------------------------|--------------------------------------------|
| after        | string                        | 次の結果を取得するために使用するカーソル (存在する場合)。次のリクエストを行うには、`page[cursor]` フィールドを追加して同じパラメーターを使用してください。|

### リンク {#links}

| フィールド      | 型                          | 説明                                |
|------------|-------------------------------|--------------------------------------------|
| next        | string                        | 次の結果セットへのリンク。[Pagination][1] を参照してください。 |




[1]: https://jsonapi.org/format/#fetching-pagination