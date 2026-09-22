---
aliases:
- /ja/llm_observability/experiments/setup/
description: Agent Observability Experiments のセットアップ方法と、実験の実行を開始する方法について説明します。
further_reading:
- link: https://www.datadoghq.com/blog/debug-and-evaluate-your-ai-app-from-your-coding-agent/
  tag: ブログ
  text: Datadog Agent Observability を使用してコーディングエージェントから AI アプリをデバッグおよび評価する
title: セットアップと使用
---
このページでは、Python SDK を使用して Agent Observability Experiments をセットアップし、使用する方法について説明します。

## Agent Observability のセットアップ{#set-up-agent-observability}

Agent Observability をまだセットアップしていない場合は、次のようにします。

1. Agent Observability Python SDK をインストールします。

   ```shell
   pip install ddtrace>=4.3.0
   ```

2. Agent Observability を有効にします。

   ```python
   from ddtrace.llmobs import LLMObs

   LLMObs.enable(
       api_key="<YOUR_API_KEY>",  # defaults to DD_API_KEY environment variable
       app_key="<YOUR_APP_KEY>",  # defaults to DD_APP_KEY environment variable
       site="datadoghq.com",      # defaults to DD_SITE environment variable
       project_name="<YOUR_PROJECT>"  # defaults to DD_LLMOBS_PROJECT_NAME environment variable, or "default-project" if the environment variable is not set
   )
   ```

   <div class="alert alert-warning"> <code>api_key</code> および <code>app_key</code>の両方を指定する必要があります。</div>

### APM トレース相関 {#apm-trace-correlation}

実験スパンを [APM トレース][5] と相関付けるには、Datadog Agent を介して Agent Observability を実行し、`agentless_enabled` を `False` (デフォルト) に設定したままにします。Agent はトレースデータを APM に転送します。これにより、実験と APM トレースの相関付けが可能になります。

   ```python
   LLMObs.enable(
       api_key="<YOUR_API_KEY>",
       app_key="<YOUR_APP_KEY>",
       site="datadoghq.com",
       agentless_enabled=False,  # default — required for APM Trace correlation
       project_name="<YOUR_PROJECT>",
   )
   ```

Agent なしで実行している場合 (ノートブックや CI 環境など)、`agentless_enabled=True` を設定できますが、エージェントレス実行では実験スパンに対して対応する APM スパンは生成されません。

## プロジェクトの作成{#create-a-project}
_プロジェクト_は、LLM 実験の主要な構成レイヤーです。すべてのデータセットと実験はプロジェクト内に存在しています。
Datadog コンソール、API、または SDK でプロジェクトを手動で作成できます。このためには、`LLMObs.enable` にまだ存在しないプロジェクト名を指定します。

```python
LLMObs.enable(
    ...
    project_name="<YOUR_PROJECT>"  # defaults to DD_LLMOBS_PROJECT_NAME environment variable, or "default-project" if the environment variable is not set
)
```

## データセットの作成{#create-a-dataset}

_データセット_とは、Agent のテストを行うシナリオを表す_入力_、_期待される出力_、および_メタデータ_の集合です。各データセットは_プロジェクト_に関連付けられています。 

- **入力** (必須): エージェントがタスク内でアクセスできるすべての情報を表します。
- **期待される出力** (オプション): _グラウンドトゥルース_とも呼ばれ、エージェントが出力すべき理想的な回答を表します。_期待される出力_を使用して、アプリの実際の出力や評価する中間結果を保存できます。
- **メタデータ** (オプション): レコードを分類し、その後の分析に使用するための有用な情報が含まれます。たとえばトピック、タグ、説明、メモなどです。

CSV ファイルからデータセットを作成するには、`LLMObs.create_dataset_from_csv()`を使用します。

```python
# Create dataset from CSV
dataset = LLMObs.create_dataset_from_csv(
    csv_path="questions.csv",
    dataset_name="capitals-of-the-world",
    project_name="capitals-project",              # Optional: defaults to the project name from LLMObs.enable
    description="Geography quiz dataset",         # Optional: Dataset description
    input_data_columns=["question", "category"],  # Columns to use as input
    expected_output_columns=["answer"],           # Optional: Columns to use as expected output
    metadata_columns=["difficulty"],              # Optional: Additional columns as metadata
    csv_delimiter=","                             # Optional: Defaults to comma
)

# Example "questions.csv":
# question,category,answer,difficulty
# What is the capital of Japan?,geography,Tokyo,medium
# What is the capital of Brazil?,geography,Brasília,medium

```

手動でのデータセットの作成方法、データセットの取得と管理の方法、Datadog によるデータセットバージョンの保持方法など、データセットの詳細については、[データセット][1] を参照してください。

## 実験の作成 {#create-an-experiment}
_実験_を使用すると、データセットの一連のシナリオで Agent を実行し、評価器を使用して期待される出力に対するパフォーマンスを測定することで、LLM アプリケーションを体系的にテストできます。その後、異なるアプリ構成のパフォーマンスを並べて比較できます。

- **タスク**: 評価するコアワークフローを定義します。1 回の LLM 呼び出しから、複数回の LLM 呼び出しや RAG ステップを含むより複雑なフローまで、幅広く対応可能です。タスクは、データセット内のすべてのレコードに対して順に実行されます。
- **評価器**: 各レコードに対して実行され、モデルやエージェントのパフォーマンスを測定する関数です。評価器を使用すると、期待される出力や元の入力と出力を比較できます。 

- **サマリー評価器**: 実験のすべてのデータ (入力、出力、期待される内容、評価器の結果) に対して実行されるオプションの関数です。サマリー評価器を使用すると、データセット全体にわたって適合率、再現率、正解率などのより高度なメトリクスを計算できます。


実験を作成するには、次のようにします。


### 1. データセットを読み込む {#1-load-a-dataset}
   ```python
   from ddtrace.llmobs import LLMObs
   from typing import Dict, Any, Optional, List

   dataset = LLMObs.pull_dataset("capitals-of-the-world")
   ```

### 2. 1 つのデータセットレコードを処理するタスク関数を定義する {#2-define-a-task-function-that-processes-a-single-dataset-record}

   ```python
   def task(input_data: Dict[str, Any], config: Optional[Dict[str, Any]] = None) -> str:
       question = input_data["question"]
       # Your LLM or processing logic here
       return "Beijing" if "China" in question else "Unknown"
   ```
   タスクは、`input_data` として任意の非 null の型 (文字列、数値、ブール値、オブジェクト、配列) を取ることができます。評価器で使用される出力は、任意の型にすることができます。
   この例では文字列が生成されますが、中間情報を保存して評価器で比較するために、出力として dict を生成できます。

   オプションとして、タスク関数では、データセットレコードのメタデータを受け取るために 3 番目の `metadata` パラメーターを受け入れることができます。
   ```python
   def task(input_data: Dict[str, Any], config: Optional[Dict[str, Any]] = None, metadata: Optional[Dict[str, Any]] = None) -> str:
       difficulty = metadata.get("difficulty", "unknown") if metadata else "unknown"
       question = input_data["question"]
       return "Beijing" if "China" in question else "Unknown"
   ```

   本番環境で使用しているものと [同じトレーシングデコレータ][2] を使用して、実験タスクのさまざまな部分 (ワークフロー、ツール呼び出しなど) をトレースできます。
   [サポートされているフレームワーク][3] (OpenAI、Amazon Bedrock など) を使用している場合、Agent Observability は LLM フレームワークやライブラリの呼び出しを自動的にトレースして注釈を付けます。これにより、LLM アプリケーションが行う呼び出しに対する監視可能性がすぐに利用可能になります。

#### 実験内での OpenTelemetry スパンの使用

   アプリケーションで [OpenTelemetry インスツルメンテーション][6] を使用している場合は、実験タスク内で OTel スパンを作成できます。`DD_TRACE_OTEL_ENABLED=1` を使用すると、ddtrace が OpenTelemetry TracerProvider として機能するため、OTel スパンは自動的に実験スパンの子として表示されます。

   ```python
   import json
   from opentelemetry import trace

   tracer = trace.get_tracer(__name__)

   def task(input_data: Dict[str, Any], config: Optional[Dict[str, Any]] = None) -> str:
       question = input_data["question"]

       # OTel gen_ai span — automatically becomes a child of the experiment span
       with tracer.start_as_current_span("my-llm-call") as span:
           span.set_attribute("gen_ai.operation.name", "chat")
           span.set_attribute("gen_ai.system", "openai")
           span.set_attribute("gen_ai.request.model", "gpt-4o")
           span.set_attribute("gen_ai.usage.input_tokens", 25)
           span.set_attribute("gen_ai.usage.output_tokens", 8)
           span.set_attribute(
               "gen_ai.input.messages",
               json.dumps([{"role": "user", "parts": [{"type": "text", "content": question}]}]),
           )

           result = call_my_llm(question)

           span.set_attribute(
               "gen_ai.output.messages",
               json.dumps([{"role": "assistant", "parts": [{"type": "text", "content": result}]}]),
           )

       return result
   ```

   これを有効にするには、`DD_TRACE_OTEL_ENABLED` 環境変数を設定します。

   ```shell
   DD_TRACE_OTEL_ENABLED=1 python my_experiment.py
   ```


### 3. 評価器を定義する {#3-define-evaluators}

   評価器は、モデルやエージェントが各レコードに対してどの程度適切に機能しているかを測定します。評価器は以下の 2 つの方法で定義できます。

   - **関数ベース**: `input_data`、`output_data`、`expected_output` を個別の引数として受け取る関数を定義します。単純なロジックを持つ 1 回限りの評価器に適しています。
   - **クラスベース**: カスタム構成が設定された再利用可能な評価器を作成するために、`BaseEvaluator` をサブクラス化します。クラスベースの評価器は、完全なスパンコンテキストを持つ `EvaluatorContext` オブジェクトを受け取ります。

   評価器の作成に関する詳細情報 (完全なデータモデルリファレンスやベストプラクティスなど) については、[評価開発者ガイド][4] を参照してください。

   Datadog は、評価器の以下の戻り値型をサポートしています。
   - **Boolean**: true または false を返します。
   - **score**: 数値 (浮動小数点数) を返します
   - **categorical**: ラベル付けされたカテゴリ (文字列) を返します。
   - **json**: 構造化データ (dict) を返します

   以下を返すこともできます。
   - `EvaluatorResult`: `reasoning`、`assessment` (`"pass"` または `"fail"`)、`metadata`、`tags` など、より詳細な評価データを取得します。
   - `MultiEvaluatorResult`: 1 つの評価器呼び出しから複数の名前付きメトリクスを出力します。詳細および例については、[評価開発者ガイド][4] を参照してください。

#### 関数ベースの評価器

   ```python
   def exact_match(input_data: Dict[str, Any], output_data: str, expected_output: str) -> bool:
       return output_data == expected_output

   def overlap(input_data: Dict[str, Any], output_data: str, expected_output: str) -> float:
       expected_output_set = set(expected_output)
       output_set = set(output_data)

       intersection = len(output_set.intersection(expected_output_set))
       union = len(output_set.union(expected_output_set))

       return intersection / union

   def fake_llm_as_a_judge(input_data: Dict[str, Any], output_data: str, expected_output: str) -> EvaluatorResult:
       fake_llm_call = "excellent"
       return EvaluatorResult(
           value=fake_llm_call,
           reasoning="the model explains itself",
           assessment="pass", # or fail
           tags={"task": "judge_llm_call"},
       )

   # Return multiple metrics from one evaluator call
   from ddtrace.llmobs import MultiEvaluatorResult

   def multi_metric_evaluator(input_data, output_data, expected_output):
       correct = output_data == expected_output
       return MultiEvaluatorResult(
           {
               "correct": EvaluatorResult(value=correct, assessment="pass" if correct else "fail"),
               "length": len(str(output_data)),
           }
       )
       # Emitted as: multi_metric_evaluator-correct, multi_metric_evaluator-length
   ```

#### クラスベースの評価器

   ```python
   from ddtrace.llmobs import BaseEvaluator, EvaluatorContext, EvaluatorResult

   class SemanticSimilarityEvaluator(BaseEvaluator):
       def __init__(self, threshold: float = 0.8):
           super().__init__(name="semantic_similarity")
           self.threshold = threshold

       def evaluate(self, context: EvaluatorContext) -> EvaluatorResult:
           score = compute_similarity(context.output_data, context.expected_output)
           return EvaluatorResult(
               value=score,
               reasoning=f"Similarity score: {score:.2f}",
               assessment="pass" if score >= self.threshold else "fail",
           )
   ```

### 4. (オプション) サマリー評価器を定義する{#4-optional-define-summary-evaluators}

   サマリー評価器は、すべてのレコードレベルの評価器が終了した後に実行され、集計された結果を受け取り、平均値や合格率などのデータセットレベルの統計を計算します。レコードレベルの評価器と同様に、サマリー評価器も関数またはクラスとして定義できます。

   `BaseSummaryEvaluator` を使用したクラスベースのアプローチについては、[評価開発者ガイド][4] を参照してください。

#### 関数ベースのサマリー評価器

   ```python
    def num_exact_matches(inputs, outputs, expected_outputs, evaluators_results):
        return evaluators_results["exact_match"].count(True)

   ```

   サマリー評価関数は、`inputs`として任意の非 null 型 (文字列、数値、ブール値、オブジェクト、配列) のリストを取ることができます。`outputs` と `expected_outputs` は、任意の型のリストにすることができます。`evaluators_results` は評価器からの結果リストの辞書であり、評価器関数名をキーとしています。たとえば上記のコードスニペットでは、サマリー評価器 `num_exact_matches` が`exact_match` 評価器からの結果 (ブール値のリスト) を使用して、完全一致の数をカウントしています。

#### クラスベースのサマリー評価器

   ```python
   from ddtrace.llmobs import BaseSummaryEvaluator, SummaryEvaluatorContext

   class AverageScoreEvaluator(BaseSummaryEvaluator):
       def __init__(self, target_evaluator: str):
           super().__init__(name="average_score")
           self.target_evaluator = target_evaluator

       def evaluate(self, context: SummaryEvaluatorContext):
           scores = context.evaluation_results.get(self.target_evaluator, [])
           if not scores:
               return None
           return sum(scores) / len(scores)
   ```

   Datadog は、サマリー評価器の以下の戻り値型をサポートしています。
   - **Boolean**: true または false を返します。
   - **score**: 数値 (浮動小数点数) を返します
   - **categorical**: ラベル付けされたカテゴリ (文字列) を返します。
   - **json**: 構造化データ (dict) を返します

### 5. 実験を作成して実行する {#5-create-and-run-the-experiment}
   ```python
   experiment = LLMObs.experiment(
       name="capital-cities-test",
       task=task,
       dataset=dataset,
       evaluators=[exact_match, overlap, fake_llm_as_a_judge],
       summary_evaluators=[num_exact_matches], # optional
       description="Testing capital cities knowledge",
       config={
           "model_name": "gpt-4",
           "version": "1.0"
       },
   )

   # Run the experiment
   results = experiment.run()  # Run on all dataset records

   # Process results
   for result in results.get("rows", []):
       print(f"Record {result['idx']}")
       print(f"Input: {result['input']}")
       print(f"Output: {result['output']}")
       print(f"Score: {result['evaluations']['evaluator']['value']}")
       if result['error']['message']:
           print(f"Error: {result['error']['message']}")
   ```

   実験の実行速度を上げるには、並列処理を有効にできます。
   ```
   results = experiment.run(jobs=4)
   ```

   データのサブセットでパイプラインをテストするには、以下を使用します。
   ```
   results = experiment.run(sample_size=10)
   ```

   エラーが発生した場合に実験の実行を停止するには、以下を使用します。
   ```
   results = experiment.run(raise_errors=True)
   ```

### 6. Datadog で実験結果を確認する {#6-review-your-experiment-results-in-datadog}
   ```
   print(f"View experiment: {experiment.url}")
   ```

注: LLM 実験のトレースは 90 日間保持されます。

[1]: /ja/llm_observability/improve/datasets
[2]: /ja/llm_observability/instrument/custom_instrumentation?tab=decorators#trace-an-llm-application
[3]: /ja/llm_observability/instrument/auto_instrumentation?tab=python
[4]: /ja/llm_observability/investigate/evaluations/evaluation_developer_guide
[5]: /ja/llm_observability/instrument/agent_observability_and_apm/
[6]: /ja/llm_observability/instrument/otel_instrumentation

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}