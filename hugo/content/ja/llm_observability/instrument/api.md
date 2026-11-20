---
aliases:
- /ja/tracing/llm_observability/api
- /ja/llm_observability/api
- /ja/llm_observability/setup/api
- /ja/llm_observability/instrumentation/api/
description: あらゆる言語のアプリケーションから Datadog に LLM のトレースとスパンを送信するために使用される、Agent Observability
  HTTP API のリファレンスドキュメントです。
further_reading:
- link: https://www.datadoghq.com/blog/llm-otel-semantic-convention
  tag: ブログ
  text: Datadog LLM Observability は、OpenTelemetry GenAI セマンティック規約をネイティブにサポートしています。
- link: https://www.datadoghq.com/blog/llm-prompt-tracking
  tag: ブログ
  text: Datadog LLM Observability による、LLM プロンプトの追跡、比較、最適化
title: HTTP API リファレンス
---
## 概要 {#overview}

Agent Observability HTTP API は、開発者が LLM 関連のトレースおよびスパンを Datadog に送信するためのインターフェースを提供します。Python、Node.js、または Java で記述されているアプリケーションでは、[Agent Observability SDK][1] を使用できます。

この API は、過去 24 時間以内のタイムスタンプを持つスパンを受け入れるため、遅延データの限定的なバックフィルが可能です。

## Spans API {#spans-api}

このエンドポイントを使用して、Datadog にスパンを送信します。利用可能なスパンの種類に関する詳細については、「[スパンの種類][2]」を参照してください。

エンドポイント
: `https://api.{{< region-param key="dd_site" code="true" >}}/api/intake/llm-obs/v1/trace/spans`

メソッド
: `POST`

### リクエスト {#request}

#### ヘッダー (必須) {#headers-required}
- `DD-API-KEY=<YOUR_DATADOG_API_KEY>`
- `Content-Type="application/json"`

#### ボディデータ (必須) {#body-data-required}

{{< tabs >}}
{{% tab "モデル" %}}
| フィールド | 型 | 説明                  |
|-------|------------------------------|------|
| data [*必須*]|  [SpansRequestData](#spansrequestdata) | リクエストボディへのエントリポイント。|
{{% /tab %}}

{{% tab "例" %}}
{{< code-block lang="json" >}}
{
  "data": {
    "type": "span",
    "attributes": {
      "ml_app": "weather-bot",
      "session_id": "1",
      "feedback_join_key": "weather-request-123",
      "tags": [
        "service:weather-bot",
        "env:staging",
        "user_handle:example-user@example.com",
        "user_id:1234"
      ],
      "spans": [
        {
          "parent_id": "undefined",
          "trace_id": "<TEST_TRACE_ID>",
          "span_id": "<AGENT_SPAN_ID>",
          "name": "health_coach_agent",
          "meta": {
            "kind": "agent",
            "input": {
              "value": "What is the weather like today and do i wear a jacket?"
            },
            "output": {
              "value": "It's very hot and sunny, there is no need for a jacket"
            }
          },
          "start_ns": 1713889389104152000,
          "duration": 10000000000
        },
        {
          "parent_id": "<AGENT_SPAN_ID>",
          "trace_id": "<TEST_TRACE_ID>",
          "span_id": "<WORKFLOW_ID>",
          "name": "qa_workflow",
          "meta": {
            "kind": "workflow",
            "input": {
              "value": "What is the weather like today and do i wear a jacket?"
            },
            "output": {
              "value":  "It's very hot and sunny, there is no need for a jacket"
            }
          },
          "start_ns": 1713889389104152000,
          "duration": 5000000000
        },
        {
          "parent_id": "<WORKFLOW_SPAN_ID>",
          "trace_id": "<TEST_TRACE_ID>",
          "span_id": "<LLM_SPAN_ID>",
          "name": "generate_response",
          "meta": {
            "kind": "llm",
            "input": {
              "messages": [
                {
                  "role": "system",
                  "content": "Your role is to ..."
                },
                {
                  "role": "user",
                  "content": "What is the weather like today and do i wear a jacket?"
                }
              ]
            },
            "output": {
              "messages": [
                {
                  "content": "It's very hot and sunny, there is no need for a jacket",
                  "role": "assistant"
                }
              ]
            }
          },
          "start_ns": 1713889389104152000,
          "duration": 2000000000
        }
      ]
    }
  }
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### レスポンス {#response}
リクエストが成功した場合、API は 202 ネットワークコードと空のボディを返します。

### API 標準 {#api-standards}

#### エラー {#error}
| フィールド   | 型   | 説明        |
|---------|--------|--------------------|
| message | 文字列 | エラーメッセージ。|
| stack   | 文字列 | スタックトレース。  |
| type    | 文字列 | エラータイプ。   |

#### IO {#io}
| フィールド   | 型   | 説明  |
|---------|--------|--------------|
| value   | 文字列 | 入力値または出力値。設定されていない場合、この値は messages または documents から推論されます。|
| messages| [[メッセージ](#message)] | メッセージのリスト。LLM スパンにのみ使用します。|
| documents| [[ドキュメント](#document)] | ドキュメントのリスト。retrieval スパンの出力としてのみ使用します。|
| prompt | [プロンプト](#prompt) | LLM 入力に使用されるテンプレートと変数を含む、構造化されたプロンプトメタデータ。これは、LLM スパンの入力 IO にのみ使用する必要があります。|
| embedding | [浮動小数点] | 埋め込み値のリスト。|
| parameters | Dict[キー (文字列), 値] | 入力または出力の追加パラメータ。|


**注**: LLM スパンに対して `input.messages` のみが設定されている場合、Datadog は `input.messages` から `input.value` を推論し、以下の推論ロジックを使用します。

1. `role=user` を含むメッセージが存在する場合、最後のメッセージの内容が `input.value` として使用されます。
1. `user` ロールのメッセージが存在しない場合、`input.value` はロールに関係なくすべてのメッセージの content フィールドを連結することによって推論されます。

#### メッセージ {#message}

| フィールド                | 型   | 説明              |
|----------------------|--------|--------------------------|
| content [*必須*] | 文字列 | メッセージのボディ。|
| role                 | 文字列 | エンティティのロール。 |
| tool_calls | [[ToolCall](#toolcall)] | このメッセージで行われたツール呼び出しのリスト。|
| tool_results | [[ToolResult](#toolresult)] | このメッセージにおけるツール実行結果のリスト。|
| audio_parts | [[AudioPart](#audiopart)] | このメッセージに添付されたオーディオセグメントのリスト。マルチモーダル (音声) LLM スパンに使用します。|
| image_parts | [[ImagePart](#imagepart)] | このメッセージに添付された画像セグメントのリスト。マルチモーダル (ビジョン) LLM スパンに使用します。|

#### ドキュメント {#document}
| フィールド                | 型   | 説明              |
|----------------------|--------|--------------------------|
| text | 文字列 | ドキュメントのテキスト。|
| name    | 文字列 | ドキュメントの名前。 |
| score | 浮動小数点 | このドキュメントに関連付けられているスコア。|
| id    | 文字列 | このドキュメントの ID。 |
| ranking | 整数 | このドキュメントのランキング。|
| metadata | Dict[キー (文字列), 値] | このドキュメントの追加メタデータ。|

#### ToolCall {#toolcall}

| フィールド | 型 | 説明 |
|-------|------|-------------|
| name | 文字列 | 呼び出されるツールの名前。|
| arguments | Dict[キー (文字列), 値] | ツールに渡される引数。|
| tool_id | string | このツール呼び出しの一意の識別子です。|
| type | 文字列 | ツール呼び出しのタイプ。|

#### ToolResult {#toolresult}

| フィールド | 型 | 説明 |
|-------|------|-------------|
| name | 文字列 | 呼び出されたツールの名前。|
| result | 文字列 | ツールによって返された結果。|
| tool_id | 文字列 | 対応するツール呼び出しと一致する一意の識別子。|
| type | 文字列 | ツール結果のタイプ。|

#### AudioPart {#audiopart}

メッセージ上のオーディオセグメントです。`content` または `attachment_key` のいずれかを指定してください。

| フィールド | 型 | 説明 |
|-------|------|-------------|
| mime_type [*必須*] | 文字列 | オーディオのメディアタイプ (`audio/wav` や `audio/pcm` など)。|
| content | 文字列 | メッセージにインラインで含まれる、base64 エンコードのオーディオ。|
| attachment_key | 文字列 | インラインの `content` ではなく、スパンペイロードの外部に保存されたオーディオへの参照。|

#### ImagePart {#imagepart}

メッセージ上の画像。`content` または `attachment_key` のいずれかを指定してください。

| フィールド | 型 | 説明 |
|-------|------|-------------|
| mime_type [*必須*] | 文字列 | 画像のメディアタイプ (`image/png` や `image/jpeg`など)。|
| content | 文字列 | メッセージにインラインで含まれる、base64 エンコードの画像。|
| attachment_key | 文字列 | インラインの `content` ではなく、スパンペイロードの外部に保存された画像への参照。|

#### ToolDefinition {#tooldefinition}

| フィールド | 型 | 説明 |
|-------|------|-------------|
| name | 文字列 | ツールの名前。|
| description | 文字列 | ツールの機能の説明。|
| schema | Dict[キー (文字列), 値] | ツールのパラメータを定義するスキーマ。|

#### SpanField {#spanfield}

| フィールド | 型 | 説明 |
|-------|------|-------------|
| kind | 文字列 | スパンフィールドの種類。|

#### プロンプト {#prompt}

<div class="alert alert-info">Agent Observability は、 <code>template</code> または <code>chat_template</code> の値が更新されたときに、テンプレートの新しいバージョンを登録します。呼び出しごとに入力が変化することが予期される場合は、動的な部分を変数に抽出してください。</div>

{{< tabs >}}
{{% tab "モデル" %}}
| フィールド                | 型   | 説明              |
|----------------------|--------|--------------------------|
| id    | 文字列 | このプロンプトテンプレートの論理識別子。`ml_app` ごとに一意である必要があります。 |
| name | 文字列 | 人間が読解可能なプロンプトの名前。|
| version | 文字列 | プロンプトのバージョンタグ (例:「1.0.0」)。指定されていない場合、Agent Observability はテンプレートコンテンツのハッシュを計算してバージョンを自動的に生成します。|
| template | 文字列 | 単一文字列のテンプレート形式。プレースホルダー構文 (`{{variable_name}}`) to embed variables. This should not be set with `chat_template`. |
| chat_template | [[Message]](#message) | Multi-message template form. Use placeholder syntax (like `{{variable_name}}`) to embed variables in message content. This should not be set with `template`.|
| variables | Dict[キー (文字列), 文字列] | テンプレートのレンダリングに使用される変数。キーはテンプレートのプレースホルダー名に対応します。|
| query_variable_keys | [文字列] | ユーザーのクエリを含む変数キー。ハルシネーションの検出に使用されます。|
| context_variable_keys | [文字列] | グラウンドトゥルースまたはコンテキストコンテンツを含む変数キー。ハルシネーションの検出に使用されます。|
| tags | Dict[キー (文字列), 文字列] | プロンプト実行に付与するタグ。|

{{% /tab %}}
{{% tab "例" %}}
{{< code-block lang="json" >}}
{
  "id": "translation-prompt",
  "chat_template": [
    {
      "role": "system",
      "content": "You are a translation service. You translate to {{language}}."
    }, {
      "role": "user",
      "content": "{{user_input}}"
    }
  ],
  "variables": {
    "language": "french",
    "user_input": "<USER_INPUT_TEXT>"
  }
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

#### メタ{#meta}
| フィールド       | 型              | 説明  |
|-------------|-------------------|--------------|
| kind [*必須*]    | 文字列 | [スパンの種類][2]: `"agent"`、`"workflow"`、`"llm"`、`"tool"`、`"task"`、`"embedding"`、または `"retrieval"`。     |
| error       | [エラー](#error)             | スパンのエラー情報。             |
| input       | [IO](#io)                | スパンの入力情報。              |
| output      | [IO](#io)                | スパンの出力情報。             |
| metadata                 | Dict[キー (文字列), 値] (値は float、bool、または string) | 入力や出力に関連しないスパンに関するデータ。たとえば、LLM スパンの `temperature` や `max_tokens` を渡すことができます。|
| model_name | 文字列 | LLM スパンに使用されるモデルの名前。|
| model_provider | 文字列 | LLM スパンに使用されるモデルのプロバイダー。|
| model_version | 文字列 | LLM スパンに使用されるモデルのバージョン。|
| embedding_for_prompt_idx | 整数 | 埋め込みが計算されたプロンプトのインデックス。|
| span | [SpanField](#spanfield) | スパンフィールド情報。|
| tool_definitions | [[ToolDefinition](#tooldefinition)] | 利用可能なツール定義のリスト。|
| expected_output | [IO](#io) | 必要な出力情報。|
| intent | 文字列 | スパンのインテント。|

#### メトリクス {#metrics}

スパンに対して収集するメトリクスの辞書です。キーはメトリクス名 (文字列) で、値はメトリクス値 (float64 ポインタ) です。一般的なメトリクスには以下のものがあります。
- `input_tokens` - 入力トークン数 (LLM スパン)
- `output_tokens` - 出力トークン数 (LLM スパン)
- `total_tokens` - 合計トークン数 (LLM スパン)
- `non_cached_input_tokens` - キャッシュされていない入力トークン数 (LLM スパン)
- `cache_read_input_tokens` - キャッシュ読み取り入力トークン数 (LLM スパン)
- `cache_write_input_tokens` - キャッシュ書き込み入力トークン数 (LLM スパン)
- `reasoning_output_tokens` - 推論トークン数 (LLM スパン)
- `time_to_first_token` - 最初の出力トークンまでの時間 (秒) (ストリーミング LLM、ルートスパン)
- `time_per_output_token` - 出力トークンあたりの時間 (秒) (ストリーミング LLM、ルートスパン)
- `input_cost` - 入力コスト (ドル) (LLM および埋め込みスパン)
- `output_cost` - 出力コスト (ドル) (LLM スパン)
- `total_cost` - 合計コスト (ドル) (LLM スパン)
- `non_cached_input_cost` - キャッシュされていない入力コスト (ドル) (LLM スパン)
- `cache_read_input_cost` - キャッシュ読み取り入力コスト (ドル) (LLM スパン)
- `cache_write_input_cost` - キャッシュ書き込み入力コスト (ドル) (LLM スパン)
- `reasoning_output_cost` - 推論出力コスト (ドル) (LLM スパン)

型: `Dict[key (string), float64]`

#### スパン {#span}

| フィールド       | 型              | 説明         |
|-------------|-------------------|---------------------|
| name [*必須*]       | 文字列            | スパンの名前。         |
| span_id [*必須*]     | 文字列            | スパンの一意の ID。      |
| trace_id  [*必須*]   | 文字列            | 同じトレース内のすべてのスパンで共有される一意の ID。    |
| parent_id  [*必須*]    | 文字列 | スパンの直接の親の ID。スパンがルートスパンの場合、`parent_id` は `undefined` である必要があります。|
| start_ns [*必須*]     | uint64            | スパンの開始時間 (ナノ秒)。    |
| duration  [*必須*]     | float64           | スパンの持続時間 (ナノ秒)。         |
| meta [*必須*]         | [メタ](#meta)              | スパンに関連するコアコンテンツ。      |
| status      | 文字列            | エラー状態 (`"ok"` または `"error"`)。デフォルトは `"ok"` です。     |
| apm_trace_id | 文字列      | 関連付けられた APM トレースの ID。デフォルトで、`trace_id` フィールドと一致するように設定されます。  |
| metrics     | Dict[キー (文字列), float64]           | 収集する Datadog メトリクス。一般的なメトリクス名については、「[メトリクス](#metrics)」を参照してください。        |
| session_id  | 文字列     | スパンの `session_id`。最上位の `session_id` フィールドを上書きします。   |
| feedback_join_key | 文字列 | フィードバックをこのスパンに関連付けるために使用される、顧客定義のキー。最上位の `feedback_join_key` フィールドを上書きします。詳細については、「[エンドユーザーのフィードバック][4]」を参照してください。|
| tags        | [[タグ](#tag)] | この特定のスパンに適用するタグのリスト。      |
| service | 文字列 | サービス名。|
| ml_app | 文字列 | このスパンの LLM アプリケーション名。最上位の `ml_app` フィールドを上書きします。|

#### SpansRequestData {#spansrequestdata}
| フィールド      | 型                          | 説明                                |
|------------|-------------------------------|--------------------------------------------|
| type [*必須*]        | 文字列                        | リクエストの識別子。`span` に設定します。|
| attributes [*必須*]  | [SpansPayload](#spanspayload) | リクエストのボディ。 |

#### SpansPayload {#spanspayload}
| フィールド    | 型                | 説明  |
|----------|---------------------|--------------|
| ml_app [*必須*] | 文字列              | LLM アプリケーションの名前。「[アプリケーションの命名ガイドライン](#application-naming-guidelines)」を参照してください。    |
| spans [*必須*]  | [[スパン](#span)] | スパンのリスト。          |
| tags                | [[タグ](#tag)]   | 各スパンに適用する最上位タグのリスト。       |
| session_id          | 文字列              | スパンのリストが属するセッション。個別のスパンに対してオーバーライドまたは設定することもできます。|
| feedback_join_key   | 文字列              | フィードバックをペイロード内のスパンに関連付けるために使用される、顧客定義のキー。個別のスパンに対してオーバーライドまたは設定することもできます。詳細については、「[エンドユーザーのフィードバック][4]」を参照してください。|

#### タグ {#tag}

タグは文字列のリストの形式で指定する必要があります (例: `["user_handle:dog@gmail.com", "app_version:1.0.0"]`)。これらは、スパンに関するコンテキスト情報を保存することを目的としています。

タグの詳細については、「[タグの使用を開始する][3]」を参照してください。

#### アプリケーションの命名ガイドライン {#application-naming-guidelines}

アプリケーション名 (`DD_LLMOBS_ML_APP` の値) は、小文字の Unicode 文字列である必要があります。以下に示す文字を含めることができます。

- 英数字
- アンダースコア
- マイナス記号
- コロン
- ピリオド
- スラッシュ

名前は最大 193 文字で、アンダースコアを連続して使用、または末尾に使用することはできません。

## Evaluations API {#evaluations-api}

<div class="alert alert-info">カスタム評価器の構築に関する包括的な例とガイダンスについては、「<a href="/llm_observability/guide/evaluation_developer_guide/">評価の開発者ガイド</a>」を参照してください。</div>

このエンドポイントを使用して、評価とエンドユーザーからのフィードバックを Datadog に送信します。評価は、スパン、トレース、またはセッションに関連付けることができます。エンドユーザーからのフィードバックは、スパン、トレース、セッション、または顧客定義のフィードバック結合キーに関連付けることができます。

エンドポイント
: `https://api.{{< region-param key="dd_site" code="true" >}}/api/intake/llm-obs/v2/eval-metric`

メソッド
: `POST`

`eval_scope` フィールドを使用して、評価の粒度を設定します。

- **`span`** (デフォルト): 評価は特定のスパンに関連付けられます。`join_on` を使用して、タグキーと値のペア、またはスパン ID とトレース ID の組み合わせでターゲットスパンを指定します。
- **`trace`**: 評価はトレース全体に関連付けられます。`join_on` を使用して、トレースのルートスパンを指定します。
- **`session`**: 評価はセッションに関連付けられます。`join_on` の代わりに `session_id` を指定します。

フィードバックを送信するには、`event_kind` を `feedback` に設定します。フィードバックイベントでは `submitter.id` を含め、`join_on` を省略し、`span_id`、`trace_id`、`session_id`、または `feedback_join_key` のうち、いずれか 1 つのターゲットフィールドのみを指定する必要があります。`eval_scope` が省略された場合、Datadog はターゲットフィールドからそれを推測します。

フィードバックが単一のスパン、トレース、またはセッションではなく、インシデント ID、レポート ID、タスク ID、リリースチェック ID などの外部エンティティに関するものである場合は、`feedback_join_key` を使用します。フィードバックを関連するテレメトリと共に表示するには、[Spans API](#spans-api) を使用して関連スパンを送信する際に、それらに同じ `feedback_join_key` を設定するか、または[拡充スパン][5]を使用して `feedback_join_key:incident-1234` タグを追加します。

フィードバックからダッシュボードウィジェットを作成するには、評価の場合と同様にウィジェットを作成し、フィルター `@event_kind:feedback` を追加します。

<div class="alert alert-info">フィードバックによるスパン、トレース、またはセッションのフィルターはサポートされていません。たとえば、フィルターを使って、不満を示すフィードバックがあるトレースのみを表示することはまだできません。代わりに、範囲が <code>@event_kind:feedback</code> に設定されたダッシュボードを使用してください。</div>

### リクエスト {#request-1}

#### ヘッダー (必須) {#headers-required-1}
- `DD-API-KEY=<YOUR_DATADOG_API_KEY>`
- `Content-Type="application/json"`

#### ボディデータ (必須) {#body-data-required-1}

{{< tabs >}}
{{% tab "モデル" %}}
| フィールド | 型 | 説明                  |
|-------|------------------------------|------|
| data [*必須*] | [EvalMetricsRequestData](#evalmetricsrequestdata) | リクエストボディへのエントリポイント。|
{{% /tab %}}

{{% tab "例" %}}
{{< code-block lang="json" >}}
{
  "data": {
    "type": "evaluation_metric",
    "attributes": {
      "metrics": [
        {
          "eval_scope": "span",
          "join_on": {
            "span": {
              "span_id": "20245611112024561111",
              "trace_id": "13932955089405749200"
            }
          },
          "ml_app": "weather-bot",
          "timestamp_ms": 1609459200,
          "metric_type": "categorical",
          "label": "Sentiment",
          "categorical_value": "Positive"
        },
        {
          "eval_scope": "trace",
          "join_on": {
            "span": {
              "span_id": "20245611112024561111",
              "trace_id": "13932955089405749200"
            }
          },
          "ml_app": "weather-bot",
          "timestamp_ms": 1609479200,
          "metric_type": "score",
          "label": "Accuracy",
          "score_value": 3,
          "assessment": "fail",
          "reasoning": "The response provided incorrect information about the weather forecast."
        },
        {
          "eval_scope": "session",
          "session_id": "abc123def456",
          "ml_app": "weather-bot",
          "timestamp_ms": 1609479200,
          "metric_type": "boolean",
          "label": "Topic Relevancy",
          "boolean_value": true
        },
        {
          "eval_scope": "span",
          "join_on": {
            "tag": {
              "key": "msg_id",
              "value": "1123132"
            }
          },
          "ml_app": "weather-bot",
          "timestamp_ms": 1609479200,
          "metric_type": "json",
          "label": "Custom Evaluation",
          "json_value": {
            "verdict": "pass",
            "confidence": 0.95,
            "is_valid": true,
            "metrics": {
              "accuracy": 0.92,
              "precision": 0.88
            },
            "passed_checks": ["coherence", "relevance", "factuality"]
          }
        },
        {
          "event_kind": "feedback",
          "feedback_join_key": "weather-request-123",
          "ml_app": "weather-bot",
          "timestamp_ms": 1765990800016,
          "metric_type": "text",
          "label": "user_comment",
          "text_value": "The response did not answer whether I needed a jacket.",
          "assessment": "fail",
          "submitter": {
            "id": "user-123",
            "type": "user"
          }
        }
      ]
    }
  }
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### レスポンス {#response-1}

{{< tabs >}}
{{% tab "モデル" %}}
| フィールド   | 型                        | 説明                              | 保証 |
|---------|-----------------------------|------------------------------------------|------------|
| ID | 文字列 | 送信時に生成されるレスポンス UUID。| あり        |
| metrics | [[EvalMetric](#evalmetric)] | 評価またはフィードバックイベントのリスト。| あり        |
{{% /tab %}}

{{% tab "例" %}}
{{< code-block lang="json" >}}
{
  "data": {
    "type": "evaluation_metric",
    "id": "456f4567-e89b-12d3-a456-426655440000",
    "attributes": {
      "metrics": [
        {
          "id": "d4f36434-f0cd-47fc-884d-6996cee26da4",
          "eval_scope": "span",
          "join_on": {
            "span": {
              "span_id": "20245611112024561111",
              "trace_id": "13932955089405749200"
            }
          },
          "ml_app": "weather-bot",
          "timestamp_ms": 1609459200,
          "metric_type": "categorical",
          "label": "Sentiment",
          "categorical_value": "Positive"
        },
        {
          "id": "cdfc4fc7-e2f6-4149-9c35-edc4bbf7b525",
          "eval_scope": "trace",
          "join_on": {
            "span": {
              "span_id": "20245611112024561111",
              "trace_id": "13932955089405749200"
            }
          },
          "ml_app": "weather-bot",
          "timestamp_ms": 1609479200,
          "metric_type": "score",
          "label": "Accuracy",
          "score_value": 3,
          "assessment": "fail",
          "reasoning": "The response provided incorrect information about the weather forecast."
        },
        {
          "id": "haz3fc7-g3p2-1s37-8m12-ndk4hbf7a522",
          "eval_scope": "session",
          "session_id": "abc123def456",
          "ml_app": "weather-bot",
          "timestamp_ms": 1609479200,
          "metric_type": "boolean",
          "label": "Topic Relevancy",
          "boolean_value": true
        },
        {
          "id": "abc1234-h4i5-6j78-9k01-lmn2opq3rst4",
          "eval_scope": "span",
          "join_on": {
            "tag": {
              "key": "msg_id",
              "value": "1123132"
            }
          },
          "ml_app": "weather-bot",
          "timestamp_ms": 1609479200,
          "metric_type": "json",
          "label": "Custom Evaluation",
          "json_value": {
            "verdict": "pass",
            "confidence": 0.95,
            "is_valid": true,
            "metrics": {
              "accuracy": 0.92,
              "precision": 0.88
            },
            "passed_checks": ["coherence", "relevance", "factuality"]
          }
        },
        {
          "id": "fedbk34-h4i5-6j78-9k01-lmn2opq3rst4",
          "event_kind": "feedback",
          "eval_scope": "external",
          "feedback_join_key": "weather-request-123",
          "ml_app": "weather-bot",
          "timestamp_ms": 1765990800016,
          "metric_type": "text",
          "label": "user_comment",
          "text_value": "The response did not answer whether I needed a jacket.",
          "assessment": "fail",
          "submitter": {
            "id": "user-123",
            "type": "user"
          }
        }
      ]
    }
  }
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### API 標準 {#api-standards-1}

#### 属性 {#attributes}

| フィールド   | 型         | 説明                                         |
|---------|--------------|-----------------------------------------------------|
| metrics [*必須*] | [[EvalMetric](#evalmetric)] | 評価またはフィードバックイベントのリスト。|
| tags | [[タグ](#tag)] | ペイロード内のすべての評価またはフィードバックイベントに適用されるタグのリスト。|

#### EvalMetric {#evalmetric}

| フィールド                                                              | 型                | 説明                                                                                            |
|--------------------------------------------------------------------|---------------------|--------------------------------------------------------------------------------------------------------|
| ID                                                                 | 文字列              | 評価メトリクスの UUID (送信時に生成されます)。                                                   |
| event_kind | 文字列 | イベントの種類。指定できる値は、`"evaluation"` と `"feedback"` です。省略された場合は、デフォルトで `"evaluation"` に設定されます。|
| eval_scope                                  | 文字列              | イベントの粒度: `"span"` (評価のデフォルト)、`"trace"`、`"session"`、または `"external"` (`feedback_join_key` によってターゲットが指定されたフィードバックの場合)。フィードバックの場合、これは省略可能であり、ターゲットフィールドから推論されます。|
| join_on [*スパンおよびトレーススコープの評価の場合は必須*]          | [[JoinOn](#joinon)] | 評価をスパンまたはトレースに結合する方法。`eval_scope` が `"span"` または `"trace"` である評価では必須です。フィードバックおよびセッション評価では空にする必要があります。|
| span_id                                                            | 文字列              | フィードバックの場合は、フィードバックに関連付けられているスパンの ID。これをフィードバックのターゲットフィールドの 1 つとして使用します。|
| trace_id | 文字列 | フィードバックの場合は、フィードバックに関連付けられているトレースの ID。これをフィードバックのターゲットフィールドの 1 つとして使用します。|
| session_id [*セッションスコープの評価の場合は必須*]              | 文字列              | イベントが関連付けられているセッション ID。`eval_scope` が `"session"` である評価では必須です。フィードバックの場合は、これをフィードバックのターゲットフィールドの 1 つとして使用します。フィードバック以外の `eval_scope` が `"span"` または `"trace"` である場合は、空にする必要があります。|
| feedback_join_key                                                  | 文字列              | フィードバックの場合は、単一のスパン、トレース、またはセッションではなく、外部エンティティに適用されるフィードバックに対して顧客が定義したキーです。評価の場合は空にする必要があります。|
| submitter [*フィードバックの場合は必須 feedback*]                                | [送信者](#submitter) | フィードバックを送信したユーザー、エージェント、またはその他のエンティティ。|
| timestamp_ms [*必須*]                                          | int64               | リクエストが送信された時間を表す、ミリ秒単位の UTC UNIX タイムスタンプ。                      |
| ml_app [*必須*]                                                | 文字列              | LLM アプリケーションの名前。「[アプリケーションの命名ガイドライン](#application-naming-guidelines)」を参照してください。|
| metric_type [*必須*]                                           | 文字列              | 値の型: `"categorical"`、`"score"`、`"boolean"`、`"json"`、または `"text"`。`"text"` 型はフィードバックイベントでのみサポートされています。|
| label [*必須*]                                                 | 文字列              | 提供された評価またはフィードバックの一意の名前またはラベル。                                     |
| categorical_value [*metric_type が「categorical」の場合は必須*] | 文字列              | カテゴリ値を表す文字列。`status` が `"WARN"` または `"ERROR"` の場合は不要です。|
| score_value [*metric_type が「score」の場合は必須*]             | 数値              | スコア値。`status` が `"WARN"` または `"ERROR"` の場合は不要です。|
| boolean_value [*metric_type が「boolean」の場合は必須*]         | ブール             | ブール値。`status` が `"WARN"` または `"ERROR"` の場合は不要です。|
| json_value [*metric_type が「json」の場合は必須*]               | Dict[キー (文字列), 値] | JSON オブジェクト値。`status` が `"WARN"` または `"ERROR"` の場合は不要です。|
| text_value [*metric_type が「text」の場合は必須*]               | 文字列              | テキスト値。これはフィードバックイベントでのみサポートされており、自由記述形式のフィードバックに役立ちます。         |
| status                                                             | 文字列              | 評価器実行の結果。指定できる値は、`"OK"`、`"WARN"`、および `"ERROR"` です。`"WARN"` または `"ERROR"` の場合、評価器はスキップされたか失敗しており、型指定された値フィールド (`categorical_value`、`score_value` など) は不要です。|
| エラー                                                              | [EvalMetricError](#evalmetricerror) | 構造化されたエラーの詳細。`status` が `"WARN"` または `"ERROR"` の場合は必須です。|
| assessment                                                         | 文字列              | この評価の結果。指定できる値は、`pass` と `fail` です。                              |
| reasoning                                                          | 文字列              | 評価結果の説明テキスト。                                                          |
| tags                                                               | [[タグ](#tag)]       | この特定の評価メトリクスに適用されるタグのリスト。                                         |

フィードバックイベントの場合は、`span_id`、`trace_id`、`session_id`、または `feedback_join_key` のいずれか 1 つのみを指定してください。`eval_scope` を指定する場合、これはターゲットフィールドと一致する必要があります。`span_id` は `"span"` に、`trace_id` は `"trace"` に、`session_id` は `"session"` に、`feedback_join_key` は `"external"` にマップされます。

#### 送信者 {#submitter}

| フィールド | 型 | 説明 |
|-------|------|-------------|
| id [*必須*] | 文字列 | フィードバックを送信したユーザー、エージェント、またはその他のエンティティの識別子。|
| type | 文字列 | 送信者のカテゴリ。推奨値は `user` および `agent` です。|

#### JoinOn {#joinon}

| フィールド      | 型            | 説明  |
|------------|-----------------|--------------|
| span | [[SpanContext](#spancontext)] | スパン ID とトレース ID を使用して、この評価に関連付けられたスパンを一意に識別します。|
| tag | [[TagContext](#tagcontext)] | タグのキーと値のペアを使用して、この評価に関連付けられたスパンを一意に識別します。|

#### SpanContext {#spancontext}

| フィールド      | 型            | 説明  |
|------------|-----------------|--------------|
| span_id [*必須*] | 文字列 | この評価に関連付けられているスパンのスパン ID。10 進数の文字列である必要があります (例: `"20245611112024561111"`)。インスツルメンテーションによって 16 進数のスパン ID が生成される場合 (OpenTelemetry など) は、送信前に 10 進数に変換してください。|
| trace_id [*必須*] | 文字列 | この評価に関連付けられているスパンのトレース ID。10 進数の文字列 (例: `"13932955089405749200"`)、または 128 ビットトレース ID の場合は 32 文字の小文字の 16 進数文字列である必要があります。|

#### TagContext {#tagcontext}

| フィールド      | 型            | 説明  |
|------------|-----------------|--------------|
| key [*必須*] | 文字列 | タグキー名。これは、スパンにタグ付けする際に使用したキーと同じである必要があります。 |
| value [*必須*] | 文字列 | タグの値。この値は、指定されたタグキーと値のペアを持つスパン 1 つのみと一致する必要があります。|


#### EvalMetricsRequestData {#evalmetricsrequestdata}

| フィールド      | 型            | 説明  |
|------------|-----------------|--------------|
| type [*必須*]      | 文字列 | リクエストの識別子。`evaluation_metric` に設定します。|
| attributes [*必須*] | [[属性](#attributes)] | リクエストのボディ。|

#### EvalMetricError {#evalmetricerror}

| フィールド   | 型   | 説明                                                |
|---------|--------|------------------------------------------------------------|
| type    | 文字列 | エラーまたは例外のタイプ (例: `"ValueError"`)。|
| message | 文字列 | 人間が判読可能なエラーの説明。                |
| stack   | 文字列 | スタックトレース (利用可能な場合)。                            |

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/llm_observability/setup/sdk/
[2]: /ja/llm_observability/quickstart/terms/
[3]: /ja/getting_started/tagging/
[4]: /ja/llm_observability/configure/evaluations/end_user_feedback
[5]: /ja/llm_observability/instrument/sdk/?tab=python#enriching-spans