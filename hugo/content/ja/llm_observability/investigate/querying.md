---
aliases:
- /ja/llm_observability/monitoring/querying/
description: Trace Explorer で Agent Observability のスパンとトレースをクエリする方法と、属性、タグ、トレースレベルのプロパティで検索する方法について説明します。
further_reading:
- link: tracing/trace_explorer/query_syntax/
  tag: ドキュメント
  text: Trace Explorer のクエリ構文
- link: https://learn.datadoghq.com/courses/llm-obs-investigations
  tag: ラーニングセンター
  text: Agent Observability で調査する
title: スパンとトレースのクエリ
---
## 概要 {#overview}
このページでは、Datadog の [Agent Observability Trace Explorer][1] を使用して、LLM アプリケーションのスパンとトレースをクエリする方法について説明します。

#### スパンとトレースにまたがるクエリ{#querying-across-spans-versus-traces}
Agent Observability において、_スパン_は、LLM アプリケーション内の単一の操作を表す作業単位です。_トレース_は、LLM アプリケーションでのリクエスト処理に関与するエンドツーエンドの操作を表し、多くの場合、1 つ以上のネストされたスパンで構成されます。この用語の詳細については、[Agent Observability の用語と概念][2]を参照してください。

[Agent Observability Trace Explorer][1] で、トレースとスパンのどちらを検索するかを選択します。
- {{< ui >}}Traces{{< /ui >}} を選択すると、ルートスパンがクエリと一致するトレースを検索できます。
- {{< ui >}}Spans{{< /ui >}} を選択すると、ネストされた子スパンを含むすべてのスパンを検索できます。

一部の検索語句はトレースにのみ適用されます。例については、[トレースレベルのクエリ](#trace-level-queries)を参照してください。

### 属性によるクエリ{#query-by-attribute}
_スパン属性_は、各スパンに直接付加されるキーと値のペアです。属性は、パフォーマンスメトリクス、リソース識別子、パラメーター値など、スパンの実行に関する詳細を取得します。

属性クエリは `@key:value` の形式を取ります。すべての属性キーには `@` が先頭に付加されます。

| クエリ | 一致 |
| ----- | ----- |
| `@duration:>5s` | 完了までに 5 秒以上かかったスパン|

### タグによるクエリ{#query-by-tag}
_スパンタグ_は、スパン、サービス、または環境全体でテレメトリデータをグループ化、セグメント化、および相関付けるために使用されるキーと値のペアです。タグは多くの場合、アプリケーション名、環境、デプロイメントリージョンなどのより広範なコンテキストを示し、効率的な検索と集計を容易にするためにスパンに付加されます。

タグクエリは `key:value` の形式を取ります。属性キーとは対照的に、タグキーの先頭には `@` は付きません。

| クエリ | 一致 |
| ----- | ----- |
| `ml_app:my_llm_app` | アプリケーション名が `my_llm_app` | のスパン

### LLM の入力と出力をクエリ{#query-llm-input-and-output}
フリーテキストクエリを使用して、入力または出力のペアを持つ任意のスパンで、特定のキーワード、フレーズ、または文字列を検索することもできます。フリーテキスト検索を使用するには、クエリを `"` で囲みます。

| クエリ | 一致 |
| ----- | ----- |
| `"what's the weather"` | 入力または出力に文字列 `what's the weather` を含む Agent、ワークフロー、または LLM スパン |

<div class="alert alert-info">フリーテキストクエリは、スパンの入力または出力の最初の 20,500 文字に制限されています。</div>

### 演算子 {#operators}

ブール演算子の `AND` (積集合)、`OR` (和集合)、および `-` (差集合) を使用して、複数の検索語を組み合わせることができます。

| クエリ | 一致 |
| ----- | ----- |
| `@duration:>5s AND -"foo"` | 完了までに 5 秒以上かかり、入力または出力に文字列 `foo` を**含まない**スパン |

### クエリ構文 {#query-syntax}

Agent Observability Trace Explorer は、Datadog の [APM Trace Explorer][6] と同じクエリ構文を使用します。ワイルドカード検索、数値の処理、特殊文字のエスケープなど、クエリ構文の詳細については、[Trace Explorer のクエリ構文][6]を参照してください。

## クエリの例 {#example-queries}

| クエリ | 一致 |
| ----- | ----- |
| `@status:error` | ステータスが `error` | であるスパンまたはトレース
| `@meta.error.type:"Max turns exceeded"` | エラータイプが `Max turns exceeded` | であるスパンまたはトレース
| `@duration:>5s` | 完了までに 5 秒以上かかったスパンまたはトレース |
| `@trace.total_tokens:>=1000` | 合計 1000 トークン以上を消費したトレース |
| `ml_app:my_llm_app` | アプリケーション名が `my_llm_app` | のアプリケーションからのスパンまたはトレース
| `"what's the weather"` | 入力または出力に文字列 `what's the weather` を含む Agent、ワークフロー、または LLM スパン |

### 評価クエリ {#evaluation-queries}

`@evaluation` 属性を使用して、[評価][3]の結果でスパンまたはトレースを検索します。

#### 評価 {#evaluations}
[評価][4]の結果によってスパンを検索できます。たとえば、`user_mood` という名前の評価があり、そのカテゴリ値が `happy`、`sad`、`tired` である場合、次のようなクエリを使用できます: `@evaluation.user_mood.value:happy`。

| クエリ | 一致 |
| ----- | ----- |
| `@evaluation.user_satisfaction.value:>5` | `user_satisfaction` | という評価で 5 より高いスコアを獲得したスパンまたはトレース
| `@evaluation.user_mood.value:happy` | `user_mood` という評価で `happy` と評価されたスパンまたはトレース (カテゴリ値は `happy`、`sad`、`tired` |)

### フィードバッククエリ {#feedback-queries}

`@feedback` 属性を使用して、[エンドユーザーのフィードバック][8]の送信内容に基づいてスパンまたはトレースを検索します。たとえば、ユーザーが `user_satisfaction` というラベルの下で `thumbs_up` または `thumbs_down` というカテゴリ値を使用してフィードバックを送信している場合、次のようなクエリを使用できます: `@feedback.user_satisfaction.value:thumbs_down`。

| クエリ | 一致 |
| ----- | ----- |
| `@feedback.user_satisfaction.value:thumbs_down` | `user_satisfaction` | というフィードバックラベルに対して「低評価 (thumbs down)」を受けたスパンまたはトレース
| `@feedback.user_comment.assessment:fail` | `user_comment` | というフィードバックラベルに対して不合格の評価を受けたスパンまたはトレース
| `@feedback.user_score.value:<2` | `user_score` | というフィードバックラベルのスコアが 2 未満のスパンまたはトレース

### メタデータクエリ {#metadata-queries}

`@meta` 属性を使用して、メタデータ情報によってスパンを検索します。

| クエリ | 一致 |
| ----- | ----- |
| `@meta.span.kind:llm` | スパン `llm`[_スパンの種類_][5]|
| `@meta.model_provider:openai` | モデルプロバイダーが OpenAI であるスパンまたはトレース |
| `@meta.model_name:gpt-4.1` | モデルが GPT-4.1 であるスパンまたはトレース |

#### カスタムメタデータ {#custom-metadata}

インスツルメンテーション中に付加された[カスタムメタデータフィールド][7]によってスパンやトレースをクエリできます。カスタムメタデータフィールドには `@meta.metadata.<key>` からアクセスできます。

| クエリ | 一致 |
| ----- | ----- |
| `@meta.metadata.config.debug_mode:false` | カスタムメタデータフィールド `config.debug_mode` が `false` | に設定されているスパンまたはトレース
| `@meta.metadata.job_id:job_14fb81c3` | カスタムメタデータフィールド `job_id` が `job_14fb81c3` | に設定されているスパンまたはトレース

### トレースレベルのクエリ {#trace-level-queries}

ネストされたスパンの属性に基づいてトレースを検索するには、`@child` 属性を使用します。

| クエリ | 一致 |
| ----- | ----- |
| `@child.@evaluation.hallucination.value:"hallucination found"` | ハルシネーションが発生しているサブスパンを持つトレース |
| `@child.@meta.span.kind:retrieval AND @meta.span.kind:workflow`| 検索スパンを含むワークフロートレース |

推定総コスト、LLM 呼び出し数、ツール数などのトレースレベルの情報にアクセスするには、`@trace` 属性を使用します。

| クエリ | 一致 |
| ----- | ----- |
| `@trace.llm_calls:>3` | LLM 呼び出しが 3 回を超えるトレース |
| `@trace.tool_calls:>=4` | ツール呼び出しが 4 回以上のトレース |
| `@trace.number_of_tools:<5` | 異なるツールを 5 種類未満呼び出すトレース |

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/traces
[2]: /ja/llm_observability/quickstart/terms/
[3]: /ja/llm_observability/investigate/evaluations/
[4]: /ja/llm_observability/investigate/evaluations/external_evaluations
[5]: /ja/llm_observability/quickstart/terms/#span-kinds
[6]: /ja/tracing/trace_explorer/query_syntax/
[7]: /ja/llm_observability/instrument/sdk/#annotating-metadata
[8]: /ja/llm_observability/investigate/evaluations/end_user_feedback