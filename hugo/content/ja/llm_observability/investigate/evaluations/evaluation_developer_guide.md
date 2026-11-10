---
aliases:
- /ja/llm_observability/guide/evaluation_developer_guide
- /ja/llm_observability/evaluations/evaluation_developer_guide/
- /ja/llm_observability/configure/evaluations/evaluation_developer_guide/
description: Agent Observability SDK を使用してカスタム評価器を構築する方法を学びます。
further_reading:
- link: /llm_observability/investigate/evaluations/external_evaluations
  tag: ドキュメント
  text: 外部評価の送信方法について学ぶ
- link: /llm_observability/setup/sdk/python
  tag: ドキュメント
  text: Python 用 Agent Observability SDK について学びます。
- link: /llm_observability/instrument/api
  tag: ドキュメント
  text: HTTP API リファレンスについて学びます。
title: 評価開発者ガイド
---
## 概要 {#overview}

このガイドでは、Agent Observability SDK を使用してカスタム評価器を構築し、それらを LLM 実験および本番環境で使用する方法について説明します。

## 主要な概念 {#key-concepts}

**評価**は、精度、トーン、有害性など、LLM アプリケーションの出力における特定の品質を測定します。評価ロジックは **評価器**内に記述します。評価器は LLM インタラクションに関するコンテキストを受け取り、結果を返します。

### 実験で評価器を実行する {#running-evaluators-in-an-experiment}
デプロイ前にデータセットに対して LLM アプリケーションをテストするには、[LLM 実験][4]で評価器を実行します。実験では、評価器が自動的に実行されます。SDK は各個別のレコードに対して評価器を呼び出します。SDK を通じて評価器を使用します。

### 本番環境で評価器を実行する {#running-evaluators-in-production}
ライブ LLM レスポンスの品質を監視するには、本番環境で評価器を実行します。`submit_evaluation()` を使用して手動で、または[カスタム LLM-as-a-judge 評価][5]を使用して自動的に評価器を実行できます。SDK、HTTP API、または Datadog UI を通じて評価器を使用します。

本番環境では、2 つのアプローチがあります。
- **手動評価** (本ガイド): アプリケーションコード内で評価器を実行し、`LLMObs.submit_evaluation()` または HTTP API を使用して結果を送信します。これにより、評価ロジックと実行タイミングを完全に制御できます。
- **カスタム LLM-as-a-judge 評価**: 自然言語プロンプトを使用して Datadog UI で評価を設定します。Datadog は、コードを変更することなく、本番環境のトレースに対してリアルタイムで評価を自動的に実行します。

本ガイドでは、手動評価に焦点を当てています。管理された LLM-as-a-judge 評価については、[カスタム LLM-as-a-Judge 評価][5]を参照してください。

### 評価コンポーネント {#evaluation-components}

評価システムには 4 つの主要なコンポーネントがあります。

- **[EvaluatorContext](#evaluatorcontext)**: 評価器への入力。LLM の入力、出力、期待される出力、およびスパン識別子が含まれます。実験では、SDK が各データセットレコードからこれを自動的に構築します。本番環境では、EvaluatorContext を自身で構築します。
- **[EvaluatorResult](#evaluatorresult)**: 評価器の出力。型付きの値、任意の推論、合格/不合格の評価、メタデータ、およびタグが含まれます。代わりに、単純な値 (`str`、`float`、`int`、`bool`、`dict`) を返すこともできます。
- **[MultiEvaluatorResult](#multievaluatorresult)**: 単一の評価器から複数の名前付きメトリクスを返すためのオプションのコンテナです。各サブ値は、単純な値またはそれ自体の `EvaluatorResult` にすることができます。1 回の評価器の実行で複数の関連メトリクス (例: 適合率、再現率、F1) が生成される場合に便利です。
- **[メトリクスタイプ](#metric-types)**: 評価値の解釈および表示方法を決定します: `categorical` (文字列ラベル)、`score` (数値)、`boolean` (合格/不合格)、または `json` (構造化データ)。
- **[SummaryEvaluatorContext](#summaryevaluatorcontext)** — 実験のみ。すべてのデータセットレコードが評価された後、サマリー評価器は集計された結果を受け取り、平均や合格率などの統計を計算します。

一般的なフロー:

- **実験**: データセットレコード → `EvaluatorContext` → 評価器 → `EvaluatorResult` (または `MultiEvaluatorResult`) → (全レコード終了後) `SummaryEvaluatorContext` → サマリー評価器 → サマリー結果
- **本番環境**: スパンデータ → `EvaluatorContext` (手動で構築) → 評価器 → `EvaluatorResult` → `LLMObs.submit_evaluation()` または HTTP API

## 評価器の構築 {#building-evaluators}

Agent Observability を使用して評価器を定義するには、クラスベースと関数ベースの 2 つの方法があります。これらの評価器に加えて、Agent Observability には [DeepEval][6] や [Pydantic][] などのオープンソース評価フレームワークとの統合があり、これらは Agent Observability Experiments で使用できます。

| | クラスベース | 関数ベース |
|---|---|---|
| **適した用途** | カスタム設定や状態を持つ再利用可能な評価器。| 単純なロジックを持つ 1 回限りの評価器。|
| **受け取るもの** | 完全なスパンコンテキスト (入力、出力、期待される出力、メタデータ、スパン/トレース ID) を持つ `EvaluatorContext` オブジェクト。| `input_data`、`output_data`、および `expected_output` は個別の引数として受け取ります。|
| **要約評価器のサポート** | はい (`BaseSummaryEvaluator`)。| いいえ。 |

迷った場合は、クラスベースの評価器から始めてください。これらは、関数ベースの評価器と同じ機能を提供します。

### クラスベースの評価器 {#class-based-evaluators}

クラスベースの評価器は、カスタム設定を使用して再利用可能な評価ロジックを実装するための構造化された方法を提供します。

#### BaseEvaluator {#baseevaluator}

`BaseEvaluator` をサブクラス化して、単一のスパンまたはデータセットレコードで実行される評価器を作成します。`evaluate` メソッドを実装します。このメソッドは [`EvaluatorContext`](#evaluatorcontext) を受け取り、[`EvaluatorResult`](#evaluatorresult) (または単純な値) を返します。

{{< code-block lang="python" >}}
from ddtrace.llmobs import BaseEvaluator, EvaluatorContext, EvaluatorResult

class SemanticSimilarityEvaluator(BaseEvaluator):
    """Evaluates semantic similarity between output and expected output."""

    def __init__(self, threshold: float = 0.8):
        super().__init__(name="semantic_similarity")
        self.threshold = threshold

    def evaluate(self, context: EvaluatorContext) -> EvaluatorResult:
        score = compute_similarity(context.output_data, context.expected_output)

        return EvaluatorResult(
            value=score,
            reasoning=f"Similarity score: {score:.2f}",
            assessment="pass" if score >= self.threshold else "fail",
            metadata={"threshold": self.threshold},
            tags={"type": "semantic"}
        )
{{< /code-block >}}

- 評価器のラベルを設定するには `super().__init__(name="evaluator_name")` を呼び出します。
- 評価ロジックを使用して `evaluate(context: EvaluatorContext)` を実装します。
- 詳細な結果を返すには `EvaluatorResult` を返し、単純な値 (`str`、`float`、`int`、`bool`、`dict`) を返すこともできます。

#### BaseSummaryEvaluator {#basesummaryevaluator}

<div class="alert alert-info">要約評価器は実験でのみ利用可能です。</div>

`BaseSummaryEvaluator`をサブクラス化して、実験の実行全体の集計結果に対して動作する評価器を作成します。すべての入力、出力、および評価器ごとの結果を含む [`SummaryEvaluatorContext`](#summaryevaluatorcontext) を受け取ります。

{{< code-block lang="python" >}}
from ddtrace.llmobs import BaseSummaryEvaluator, SummaryEvaluatorContext

class AverageScoreEvaluator(BaseSummaryEvaluator):
    """Computes average score across all evaluation results."""

    def __init__(self, target_evaluator: str):
        super().__init__(name="average_score")
        self.target_evaluator = target_evaluator

    def evaluate(self, context: SummaryEvaluatorContext):
        scores = context.evaluation_results.get(self.target_evaluator, [])
        if not scores:
            return None
        return sum(scores) / len(scores)
{{< /code-block >}}

- 評価器のラベルを設定するには `super().__init__(name="evaluator_name")` を呼び出します。
- 評価器名を結果のリストに対応付ける `context.evaluation_results` を使用して、評価器ごとの結果にアクセスします。

### LLMJudge {#llmjudge}

`LLMJudge`クラスを使用すると、別の LLM を判定者として使用して LLM 出力を自動的に評価できます。OpenAI、Azure OpenAI、Anthropic、Amazon Bedrock、および構造化された出力形式に対応したカスタム LLM クライアントをサポートしています。

#### パラメーター {#parameters}

| パラメーター | 型 | 必須 | 説明 |
|-----------|------|----------|-------------|
| `user_prompt` | `str` | はい | プロンプトテンプレート (` 付き){{field.path}}` syntax for span context injection. |
| `system_prompt` | `str` | No | System prompt to set the judge's behavior or persona. |
| `structured_output` | `StructuredOutput` | No | Output format specification. See [structured output types](#structured-output-types). |
| `provider` | `str` | Conditional | LLM provider: `"openai"`, `"azure_openai"`, `"anthropic"`, or `"bedrock"`. Required if `client` is not provided. |
| `model` | `str` | No | Model identifier (for example, `"gpt-4o"`, `"claude-sonnet-4-20250514"`). |
| `model_params` | `dict` | No | Additional parameters passed to the LLM API (for example, `temperature`). |
| `client` | callable | Conditional | Custom LLM client function. Required if `provider` is not provided. |
| `name` | `str` | No | Evaluator name for identification in results. |
| `client_options` | `dict` | いいえ | プロバイダー固有の設定 (API キーなど)。|

#### テンプレート変数 {#template-variables}

`user_prompt`は ` をサポートしています。{{field.path}}` 構文を使用して、評価対象のスパンからコンテキストを挿入します。ネストされたパスもサポートされています。

- `{{input_data}}` — スパンの入力データ。
- `{{output_data}}` — スパンの出力データ。
- `{{expected_output}}` — 比較用の期待される出力 (利用可能な場合)。
- `{{metadata.key}}` — Nested metadata fields (for example, `{{metadata.topic}}`)。

#### 構造化出力タイプ {#structured-output-types}

| 出力タイプ | 説明 |
|-------------|-------------|
| `BooleanStructuredOutput` | `True`/`False` (オプションの合格/不合格評価を含む) を返します。|
| `ScoreStructuredOutput` | 定義された範囲内の数値スコアを、オプションのしきい値とともに返します。|
| `CategoricalStructuredOutput` | 定義済みのカテゴリーセットのいずれかを、オプションの合格値とともに返します。|
| `Dict[str, JSONType]` | 任意の構造化出力のためのカスタム JSON スキーマ。|

すべての構造化出力タイプは、結果に説明を含めるための `reasoning=True` と、推論フィールドの説明をカスタマイズするための `reasoning_description` を受け入れます。

#### 例: ブール値評価 {#example-boolean-evaluation}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMJudge, BooleanStructuredOutput

judge = LLMJudge(
    provider="openai",
    model="gpt-4o",
    user_prompt="Is this response factually accurate? Response: {{output_data}}",
    structured_output=BooleanStructuredOutput(
        description="Whether the response is factually accurate",
        reasoning=True,
        pass_when=True,
    ),
)
{{< /code-block >}}

#### 例: しきい値を使用したスコアベースの評価 {#example-score-based-evaluation-with-thresholds}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMJudge, ScoreStructuredOutput

judge = LLMJudge(
    provider="anthropic",
    model="claude-sonnet-4-20250514",
    user_prompt="Rate the helpfulness of this response (1-10): {{output_data}}",
    structured_output=ScoreStructuredOutput(
        description="Helpfulness score",
        min_score=1,
        max_score=10,
        reasoning=True,
        min_threshold=7,  # Scores >= 7 pass
    ),
)
{{< /code-block >}}

#### 例: カテゴリー評価 {#example-categorical-evaluation}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMJudge, CategoricalStructuredOutput

judge = LLMJudge(
    provider="openai",
    model="gpt-4o",
    user_prompt="Classify the sentiment: {{output_data}}",
    structured_output=CategoricalStructuredOutput(
        categories={
            "positive": "The response has a positive sentiment.",
            "neutral": "The response has a neutral sentiment.",
            "negative": "The response has a negative sentiment.",
        },
        reasoning=True,
        pass_values=["positive", "neutral"],
    ),
)
{{< /code-block >}}

#### 例: Azure OpenAI {#example-azure-openai}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMJudge, BooleanStructuredOutput

judge = LLMJudge(
    provider="azure_openai",
    model="gpt-4o",
    user_prompt="Is this response factually accurate? Response: {{output_data}}",
    structured_output=BooleanStructuredOutput(
        description="Whether the response is factually accurate",
        reasoning=True,
        pass_when=True,
    ),
    client_options={
        "azure_endpoint": "https://your-resource.openai.azure.com",
        "api_version": "2024-10-21",
        "azure_deployment": "gpt-4o",
    },
)
{{< /code-block >}}

`azure_openai` プロバイダーは以下の `client_options` を受け入れます。

| オプション | 環境変数 | 説明 |
|--------|---------------------|-------------|
| `api_key` | `AZURE_OPENAI_API_KEY` | Azure OpenAI API キー。|
| `azure_endpoint` | `AZURE_OPENAI_ENDPOINT` | Azure OpenAI エンドポイント URL。|
| `api_version` | `AZURE_OPENAI_API_VERSION` | API バージョン。デフォルトは `"2024-10-21"` です。|
| `azure_deployment` | `AZURE_OPENAI_DEPLOYMENT` | デプロイ名。`model` パラメーターにフォールバックします。|

#### 例: カスタム LLM クライアント {#example-custom-llm-client}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMJudge, BooleanStructuredOutput

def my_llm_client(provider, messages, json_schema, model, model_params):
    response = call_my_llm(messages, model)
    return response

judge = LLMJudge(
    client=my_llm_client,
    model="my-custom-model",
    user_prompt="Is this response accurate? {{output_data}}",
    structured_output=BooleanStructuredOutput(
        description="Accuracy check",
        reasoning=True,
        pass_when=True,
    ),
)
{{< /code-block >}}

#### 重要なポイント {#key-points}

- `provider` (`"openai"`、`"azure_openai"`、`"anthropic"`、または`"bedrock"`) またはカスタム`client`のいずれかが必要です。
- API キーは、`client_options={"api_key": "..."}` または環境変数 (`OPENAI_API_KEY`、`ANTHROPIC_API_KEY`) を使用して設定します。Azure OpenAI の場合は、`AZURE_OPENAI_API_KEY` と `AZURE_OPENAI_ENDPOINT` を設定します。Bedrock の場合は、環境変数または `client_options` を通じて AWS 認証情報を構成します。
- 結果に説明を含めるには、構造化出力で `reasoning=True` を使用します。
- `pass_when` (ブール値)、`pass_values` (カテゴリー)、または`min_threshold`/`max_threshold` (スコア) を使用して合格/不合格の基準を定義します。

#### Datadog 管理の評価として LLMJudge を公開する{#publishing-an-llmjudge-as-a-datadog-managed-evaluation}

`LLMObs.publish_evaluator()`を使用して、ローカルで定義された`LLMJudge`構成をカスタム LLM-as-a-judge ドラフトとして Datadog にプッシュします。これにより、実験で評価器を定義および検証し、UI で構成を手動で再作成することなく本番環境に昇格させることができます。

| パラメーター | 型 | 必須 | 説明 |
|-----------|------|----------|-------------|
| `evaluator` | `LLMJudge` | はい | 公開する `LLMJudge` インスタンス。|
| `ml_app` | `str` | はい | LLM アプリケーション名。|
| `eval_name` | `str` | いいえ | Datadog で評価器に使用する名前。省略した場合、`LLMJudge` インスタンスに設定された `name` がデフォルトで使用されます。|
| `variable_mapping` | `dict[str, str]` | いいえ | 公開された評価器では、`user_prompt` 内の変数名を Datadog のスパンフィールドパスに再マッピングします。|

{{< code-block lang="python" >}}
from ddtrace.llmobs import BooleanStructuredOutput, LLMJudge, LLMObs

LLMObs.enable(
    ml_app="my-ml-app",
    api_key="<DD_API_KEY>",
    app_key="<DD_APP_KEY>",
)

judge = LLMJudge(
    provider="openai",
    model="gpt-4o",
    system_prompt="You are a helpful evaluator.",
    user_prompt=(
        "Does the output correctly answer the question?\n"
        "Input: {{input_data}}\n"
        "Output: {{output_data}}"
    ),
    structured_output=BooleanStructuredOutput("correctness", pass_when=True),
    name="my-correctness-judge",
)

result = LLMObs.publish_evaluator(
    judge,
    ml_app="my-ml-app",
    variable_mapping={"input_data": "span_input", "output_data": "span_output"},
)
print(result["ui_url"])
{{< /code-block >}}

`LLMObs.publish_evaluator()` は `{"ui_url": "..."}` を返し、Datadog の評価器へのリンクを提供します。

<div class="alert alert-info">各呼び出しで <code>LLMObs.publish_evaluator()</code> 評価器のドラフトが作成または更新されます。Datadog UI から有効化すると、本番環境で実行できます。</div>

### 組み込み評価器 {#built-in-evaluators}

SDK には、一般的な評価パターンに対応した組み込み評価器が用意されています。これらはクラスベースの評価器で、カスタムロジックを記述せずに直接使用できます。

#### StringCheckEvaluator {#stringcheckevaluator}

`output_data` と `expected_output` の間で文字列比較操作を実行します。

| 操作 | 説明 |
|-----------|-------------|
| `eq` | 完全一致 (デフォルト) |
| `ne` | 等しくない |
| `contains` | `output_data` 含む `expected_output` (大文字と小文字を区別) |
| `icontains` | `output_data` 含む `expected_output` (大文字と小文字を区別しない) |

{{< code-block lang="python" >}}
from ddtrace.llmobs.evaluators import StringCheckEvaluator

# Perform an exact match (default)
evaluator = StringCheckEvaluator(operation="eq", case_sensitive=True)

# Check whether output_data contains expected_output (case-insensitive)
evaluator = StringCheckEvaluator(operation="icontains", strip_whitespace=True)

# Extract field from dict output before comparison
evaluator = StringCheckEvaluator(
    operation="eq",
    output_extractor=lambda x: x.get("message", "") if isinstance(x, dict) else str(x),
)
{{< /code-block >}}

#### RegexMatchEvaluator {#regexmatchevaluator}

正規表現パターンに対して出力を検証します。

| 一致モード | 説明 |
|------------|-------------|
| `search` | 文字列内の任意の位置で部分一致 (デフォルト) |
| `match` | 文字列の先頭から一致 |
| `fullmatch` | 文字列全体と一致 |

{{< code-block lang="python" >}}
from ddtrace.llmobs.evaluators import RegexMatchEvaluator
import re

# Validate email format
evaluator = RegexMatchEvaluator(
    pattern=r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",
    match_mode="fullmatch"
)

# Validate output pattern (case-insensitive)
evaluator = RegexMatchEvaluator(
    pattern=r"success|completed",
    flags=re.IGNORECASE
)
{{< /code-block >}}

#### LengthEvaluator {#lengthevaluator}

出力の長さの制約を検証します。

| カウントタイプ | 説明 |
|------------|-------------|
| `characters` | 文字数をカウント (デフォルト) |
| `words` | 単語数をカウント |
| `lines` | 行数をカウント |

{{< code-block lang="python" >}}
from ddtrace.llmobs.evaluators import LengthEvaluator

# Ensure response is 50-200 characters
evaluator = LengthEvaluator(min_length=50, max_length=200, count_type="characters")

# Validate word count
evaluator = LengthEvaluator(min_length=10, max_length=100, count_type="words")
{{< /code-block >}}

#### JSONEvaluator {#jsonevaluator}

出力が有効な JSON であることを検証し、必要に応じて必須キーを確認します。

{{< code-block lang="python" >}}
from ddtrace.llmobs.evaluators import JSONEvaluator

# Validate JSON syntax
evaluator = JSONEvaluator()

# Validate that required keys exist
evaluator = JSONEvaluator(required_keys=["name", "status", "data"])
{{< /code-block >}}

#### SemanticSimilarityEvaluator {#semanticsimilarityevaluator}

埋め込みを使用して `output_data` と `expected_output` の意味的類似性を測定します。0.0 から 1.0 の間の類似度スコアを返します。

{{< code-block lang="python" >}}
from ddtrace.llmobs.evaluators import SemanticSimilarityEvaluator
from openai import OpenAI

client = OpenAI()

def get_embedding(text):
    response = client.embeddings.create(
        input=text,
        model="text-embedding-3-small"
    )
    return response.data[0].embedding

evaluator = SemanticSimilarityEvaluator(
    embedding_fn=get_embedding,
    threshold=0.8  # Minimum similarity score to pass
)
{{< /code-block >}}

### 関数ベースの評価器 {#function-based-evaluators}

単純な評価ロジックの場合は、クラスではなく関数を定義します。関数ベースの評価器は、入力、出力、および期待される出力を引数として直接受け取ります。

{{< code-block lang="python" >}}
from ddtrace.llmobs import EvaluatorResult

def exact_match_evaluator(input_data, output_data, expected_output):
    """Checks if output exactly matches expected output."""
    matches = output_data == expected_output
    return EvaluatorResult(
        value=matches,
        reasoning="Exact match" if matches else "Output differs from expected",
        assessment="pass" if matches else "fail",
    )
{{< /code-block >}}

**関数シグネチャ**:

{{< code-block lang="python" >}}
def evaluator_function(
    input_data: Any,
    output_data: Any,
    expected_output: Any
) -> Union[JSONType, EvaluatorResult, MultiEvaluatorResult]:
    ...
{{< /code-block >}}

以下を返すことができます。
- 単純な値 (`str`、`float`、`int`、`bool`、`dict`)、または
- 推論とメタデータを含む詳細な結果を返すための `EvaluatorResult`、または
- 1 つの評価器呼び出しから複数の名前付きメトリクスを出力するための `MultiEvaluatorResult`

### MultiEvaluatorResult を使用して複数の値を返す {#returning-multiple-values-with-multievaluatorresult}

1 つの評価器が複数の関連するメトリクス (たとえば、1 回の LLM ジャッジ呼び出しから得られる適合率、再現率、混同行列カテゴリーなど) を生成する場合は、単一の値ではなく `MultiEvaluatorResult` を返します。各エントリーは、Datadog で個別のメトリクスとして出力されます。

{{< code-block lang="python" >}}
from ddtrace.llmobs import EvaluatorResult, MultiEvaluatorResult

def confusion_matrix_evaluator(input_data, output_data, expected_output):
    predicted = bool(output_data)
    expected = bool(expected_output)
    correct = predicted == expected

    if predicted and expected:
        category = "true_positive"
    elif predicted and not expected:
        category = "false_positive"
    elif not predicted and expected:
        category = "false_negative"
    else:
        category = "true_negative"

    return MultiEvaluatorResult(
        {
            "correct": EvaluatorResult(
                value=correct,
                assessment="pass" if correct else "fail",
                reasoning=f"predicted={predicted}, expected={expected}",
            ),
            "category": category,
            "false_positive": category == "false_positive",
        }
    )
{{< /code-block >}}

デフォルトでは、サブメトリクスのラベルには評価器の名前 (`confusion_matrix_evaluator-correct`、`confusion_matrix_evaluator-category` など) がプレフィックスとして付加されます。プレフィックスなしで生のキーを出力するには、`prefix=False` を渡します。

{{< code-block lang="python" >}}
return MultiEvaluatorResult({"precision": 0.9, "recall": 0.8}, prefix=False)
{{< /code-block >}}

<div class="alert alert-warning">2 つの評価器が同じデータセットレコードに対して同じメトリクスラベルを出力する場合 (たとえば、両方が同じキーで <code>prefix=False</code> を使用する場合)、2 番目の値が最初の値を上書きし、警告がログに記録されます。</div>

`MultiEvaluatorResult` は、クラスベースの評価器およびサマリー評価器でもサポートされています。

{{< code-block lang="python" >}}
from ddtrace.llmobs import BaseEvaluator, EvaluatorContext, MultiEvaluatorResult

class ConfusionMatrixEvaluator(BaseEvaluator):
    def __init__(self):
        super().__init__(name="confusion_matrix")

    def evaluate(self, context: EvaluatorContext) -> MultiEvaluatorResult:
        predicted = bool(context.output_data)
        expected = bool(context.expected_output)
        correct = predicted == expected
        # Emitted labels: correct, false_positive, false_negative (prefix=False)
        return MultiEvaluatorResult(
            {
                "correct": correct,
                "false_positive": predicted and not expected,
                "false_negative": not predicted and expected,
            },
            prefix=False
        )
{{< /code-block >}}

## 実験での評価器の使用 {#using-evaluators-in-experiments}

評価器を `LLMObs.experiment()` に渡すと、データセット内のすべてのレコードに対して実行されます。SDK は各レコードに対して自動的に `EvaluatorContext` を構築し、評価器を呼び出します。すべてのレコードが処理された後、集計された結果に対してサマリー評価器が実行されます。

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs, Dataset, DatasetRecord

# Create dataset
dataset = Dataset(
    name="qa_dataset",
    records=[
        DatasetRecord(
            input_data={"question": "What is 2+2?"},
            expected_output="4"
        ),
        DatasetRecord(
            input_data={"question": "What is the capital of France?"},
            expected_output="Paris"
        ),
    ]
)

# Define task
def qa_task(input_data, config):
    return generate_answer(input_data["question"])

# Create evaluators
semantic_eval = SemanticSimilarityEvaluator(threshold=0.7)
summary_eval = AverageScoreEvaluator("semantic_similarity")

# Run experiment
experiment = LLMObs.experiment(
    name="qa_experiment",
    task=qa_task,
    dataset=dataset,
    evaluators=[semantic_eval, exact_match_evaluator],
    summary_evaluators=[summary_eval]
)

experiment.run()
{{< /code-block >}}

### マネージド評価器の使用 {#using-managed-evaluators}

`RemoteEvaluator` を使用すると、Datadog UI で構成された[カスタム LLM-as-a-judge 評価][5]を名前で参照し、ローカル実験の一部として実行できます。これにより、Python で評価ロジックを再実装することなく、本番環境の評価器をオフライン実験で再利用できます。

| パラメーター | 型 | 説明 |
|-----------|------|-------------|
| `eval_name` | `str` | Datadog で構成された LLM-as-a-judge 評価器の名前。|
| `transform_fn` | `Optional[Callable]` |  `EvaluatorContext` をテンプレート変数の値の辞書にマッピングする関数。|

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs, RemoteEvaluator

evaluator = RemoteEvaluator(eval_name="quality-assessment")

experiment = LLMObs.experiment(
    name="my-experiment",
    task=my_task,
    dataset=dataset,
    evaluators=[evaluator],
)
experiment.run()
{{< /code-block >}}

#### `transform_fn` を使用してデータセットデータをプロンプト変数にマッピングする {#mapping-dataset-data-to-prompt-variables-with-transform-fn}

Datadog UI で LLM-as-a-judge を構成する際、[プロンプトテンプレートは変数][7] (` など) を使用します。{{span_input}}` and `{{span_output}}`. By default, `RemoteEvaluator` は以下をマッピングします。
- `input_data` → `span_input`
- `output_data` → `span_output`
- `expected_output` → `meta.expected_output`

データセットレコードの構造が異なる場合 (例: `input_data` が複数のキーを持つ辞書である場合)、`transform_fn` を指定して、各テンプレート変数に送信される値を正確に制御します。

{{< code-block lang="python" >}}
from ddtrace.llmobs import RemoteEvaluator, EvaluatorContext

def my_transform(context: EvaluatorContext) -> dict:
    # input_data is a dict: {"user_query": str, "retrieved_docs": list[str]}
    return {
        "span_input": context.input_data.get("user_query"),   # → {{span_input}} in the prompt
        "span_output": context.output_data,                   # → {{span_output}} in the prompt
        "meta": {
            "retrieved_docs": context.input_data.get("retrieved_docs"),  # → {{meta.retrieved_docs}}
        },
    }

evaluator = RemoteEvaluator(
    eval_name="quality-assessment",
    transform_fn=my_transform,
)
{{< /code-block >}}

バックエンドの評価器でエラーが発生した場合、`RemoteEvaluatorError` が発生します。詳細については `backend_error` を確認してください。

{{< code-block lang="python" >}}
from ddtrace.llmobs import RemoteEvaluator, RemoteEvaluatorError, EvaluatorContext

evaluator = RemoteEvaluator(eval_name="quality-assessment")
context = EvaluatorContext(input_data={"query": "What is the capital of France?"}, output_data="Paris")

try:
    result = evaluator.evaluate(context)
except RemoteEvaluatorError as e:
    print(e.backend_error)
    # {"type": "...", "message": "...", "recommended_resolution": "..."}
{{< /code-block >}}

## 本番環境での評価器の使用 {#using-evaluators-in-production}

<div class="alert alert-info">このセクションでは、アプリケーションコードから手動で実行および送信する評価について説明します。Datadog で本番環境のトレースに対して自動的に評価を実行するには、代わりに <a href="/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations">カスタム LLM-as-a-Judge 評価</a> を参照してください。</div>

アプリケーションコードから評価を送信するには、`EvaluatorContext` を自身で構築し、評価器を呼び出し、`LLMObs.submit_evaluation()` を使用して結果を送信します。HTTP API を通じて評価を送信することもできます。

完全な `submit_evaluation()` 引数およびスパン結合オプションについては、[外部評価ドキュメント][1]を参照してください。HTTP API 仕様については、[評価 API リファレンス][2]を参照してください。

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs, EvaluatorContext
from ddtrace.llmobs.decorators import llm

evaluator = SemanticSimilarityEvaluator(threshold=0.8)

@llm(model_name="claude", name="invoke_llm", model_provider="anthropic")
def llm_call(input_text):
    completion = ...  # Your LLM application logic

    # Build the evaluation context from the span data
    context = EvaluatorContext(
        input_data=input_text,
        output_data=completion,
        expected_output=None,
    )

    # Run the evaluator
    result = evaluator.evaluate(context)

    # Submit the result to Datadog
    LLMObs.submit_evaluation(
        span=LLMObs.export_span(),
        ml_app="chatbot",
        label=evaluator.name,
        metric_type="score",
        value=result.value,
        assessment=result.assessment,
        reasoning=result.reasoning,
    )

    return completion
{{< /code-block >}}

## データモデルリファレンス {#data-model-reference}

### EvaluatorContext {#evaluatorcontext}

評価の実行に必要なすべての情報を含む、変更不可のデータクラス。

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `input_data` | `Any` | LLM アプリケーションに提供される入力 (例: プロンプト)。|
| `output_data` | `Any` | LLM アプリケーションからの実際の出力。|
| `expected_output` | `Any` | LLM が生成すべきだった期待される出力または理想的な出力。|
| `metadata` | `Dict[str, Any]` | 追加のメタデータ。|
| `span_id` | `str` | スパンの一意の識別子。|
| `trace_id` | `str` | トレースの一意の識別子。|

Experiments では、SDK が各データセットレコードからこれを自動的に設定します。本番環境では、スパンデータから自身で構築します。

### EvaluatorResult {#evaluatorresult}

追加のコンテキストを含む詳細な評価結果を返すことができます。Experiments と本番環境の両方で使用されます。

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `value` | `Union[str, float, int, bool, dict]` | 評価値。タイプは `metric_type` に依存します。|
| `reasoning` | `Optional[str]` | 評価結果のテキスト説明。|
| `assessment` | `Optional[str]` | この評価に対するアセスメントです。指定可能な値は、`pass` と `fail` です。|
| `metadata` | `Optional[Dict[str, Any]]` | 評価に関する追加のメタデータ。|
| `tags` | `Optional[Dict[str, str]]` | 評価メトリクスに適用するタグ。|

### MultiEvaluatorResult {#multievaluatorresult}

単一の評価器から複数の名前付き評価メトリクスを出力するためのコンテナです。`ddtrace.llmobs`からインポートします。

| パラメーター | 型 | デフォルト | 説明 |
|-----------|------|---------|-------------|
| `values` | `Dict[str, Union[str, float, int, bool, dict, EvaluatorResult]]` | — | サブメトリック名からプレーン値または `EvaluatorResult` へのマッピング。空であってはなりません。キーは評価の[ラベル命名規則](#naming-conventions)に従う必要があります。|
| `prefix` | `bool` | `True` | ラベル生成を制御します。`True` → `"<evaluator_name>-<key>"`.`False` → 生のキー。|

関数ベースの評価器、クラスベースの評価器 (`BaseEvaluator`)、およびサマリー評価器 (`BaseSummaryEvaluator`) でサポートされています。

### SummaryEvaluatorContext {#summaryevaluatorcontext}

実験内のすべてのデータセットレコードにわたる集計された評価結果を提供する、変更不可のデータクラスです。サマリー評価器でのみ使用されます。

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `inputs` | `List[Any]` | 実験からのすべての入力データのリスト。|
| `outputs` | `List[Any]` | 実験からのすべての出力データのリスト。|
| `expected_outputs` | `List[Any]` | 実験からのすべての期待される出力のリスト。|
| `evaluation_results` | `Dict[str, List[Any]]` | 評価器名とその結果をマッピングする辞書。|
| `metadata` | `Dict[str, Any]` | 実験に関連付けられた追加のメタデータ。|

### メトリクスタイプ {#metric-types}

メトリクスのタイプは、評価を送信する際 (`submit_evaluation()` または HTTP API を通じて) に設定され、Datadog で値がどのように検証および表示されるかを決定します。

| メトリクスタイプ | 値のタイプ | ユースケース |
|-------------|------------|----------|
| `categorical` | `str` | 出力をカテゴリーに分類する (例: 「ポジティブ」、「ネガティブ」、「ニュートラル」) |
| `score` | `float` または `int` | 数値スコアや評価 (例: 0.0～1.0、1～10) |
| `boolean` | `bool` | 合格/不合格またははい/いいえの評価 |
| `json` | `dict` | 構造化された評価データ (例: 多次元ルーブリックや詳細な内訳) |

## ベストプラクティス {#best-practices}

### 命名規則 {#naming-conventions}

評価ラベルは、以下の命名規則に従う必要があります。

- 文字で始まる必要があります
- ASCII 英数字、アンダースコア、またはハイフンのみを使用する必要があります
- スペースやその他のサポートされていない文字はアンダースコアに変換されます
- Unicode はサポートされません
- 200 文字を超えてはなりません (100 文字未満を推奨します)
- 特定の LLM アプリケーション (`ml_app`) および組織内で一意である必要があります

### 同時実行 {#concurrent-execution}

`jobs` パラメーターを設定してタスクと評価を複数のスレッドで同時に実行すると、複数のデータセットレコードを処理する際に実験をより早く完了させることができます。

<div class="alert alert-info">非同期評価器は、現時点では同時実行をサポートしていません。同期評価器のみが並列実行のメリットを得られます。</div>

### OpenTelemetry インテグレーション {#opentelemetry-integration}

[OpenTelemetry で計測されたスパン][3]の評価を送信する際は、評価に `source:otel` タグを含めてください。例については、[外部評価のドキュメント][1]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/llm_observability/investigate/evaluations/external_evaluations
[2]: /ja/llm_observability/instrument/api/#evaluations-api
[3]: /ja/llm_observability/instrument/otel_instrumentation
[4]: /ja/llm_observability/improve/experiments
[5]: /ja/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations
[6]: /ja/llm_observability/investigate/evaluations/external_evaluations/deepeval/
[7]: /ja/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations#configure-the-prompt
[8]: /ja/llm_observability/investigate/evaluations/external_evaluations/pydantic