---
aliases:
- /ja/tracing/llm_observability/submit_evaluations
- /ja/llm_observability/submit_evaluations
- /ja/llm_observability/evaluations/submit_evaluations
- /ja/llm_observability/configure/evaluations/submit_evaluations
- /ja/llm_observability/evaluations/external_evaluations/
- /ja/llm_observability/configure/evaluations/external_evaluations/
description: Python SDK または Agent Observability API を使用してカスタム評価を Agent Observability
  に送信し、応答品質を追跡します。
further_reading:
- link: /llm_observability/investigate/evaluations/evaluation_developer_guide
  tag: ドキュメント
  text: カスタム評価器の構築について学びます。
- link: /llm_observability/setup/sdk
  tag: ドキュメント
  text: Python 用 Agent Observability SDK について学びます。
- link: /llm_observability/setup/api
  tag: ドキュメント
  text: Evaluations API について学ぶ
- link: /llm_observability/investigate/evaluations/external_evaluations/nemo
  tag: ドキュメント
  text: NVIDIA NeMo から評価を送信する方法を学びます。
- link: /llm_observability/investigate/evaluations/end_user_feedback
  tag: ドキュメント
  text: エンドユーザーからのフィードバックの送信について学びます。
title: 外部評価
---
## 概要 {#overview}

評価は、LLM アプリケーションの応答品質を測定します。
Agent Observability にはトレース用の評価機能がいくつか組み込まれていますが、Datadog の [SDK](#submitting-evaluations-with-the-sdk) または [Agent Observability API](#submitting-evaluations-with-the-api) を使用して、独自の評価を Agent Observability に送信することもできます。評価ラベルには、次の命名規則を使用してください。

* 評価ラベルは文字で始める必要があります。
* 評価ラベルには、ASCII 英数字またはアンダースコアのみを使用してください。
  * スペースなどの他の文字はアンダースコアに変換されます。
  * Unicode はサポートされていません。
* 評価ラベルは 200 文字以内で指定してください。ユーザーインターフェイスの観点からは、100 文字未満をお勧めします。

<div class="alert alert-info">

評価ラベルは、特定の LLM アプリケーション (<code>ml_app</code>) および組織内で一意である必要があります。

</div>

<div class="alert alert-info">ユーザーによる高評価や低評価、承認された変更、自由記述のコメント、その他のシグナルなどのフィードバックの送信については、<a href="/llm_observability/investigate/evaluations/end_user_feedback/">エンドユーザーフィードバック</a>を参照してください。</div>

## SDK を使用した外部評価の送信 {#submitting-external-evaluations-with-the-sdk}

Agent Observability SDK には、トレースされた LLM アプリケーションが Agent Observability に外部評価を送信するためのメソッド `LLMObs.submit_evaluation()` および `LLMObs.export_span()` が用意されています。詳細については、[Python][3] または [Node.js][4] SDK のドキュメントを参照してください。

<div class="alert alert-info">豊富な結果メタデータを持つ再利用可能なクラスベースの評価器を構築する方法については、<a href="/llm_observability/investigate/evaluations/evaluation_developer_guide/">評価開発者ガイド</a>を参照してください。</div>

### 例 {#example}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import llm

def my_harmfulness_eval(input: Any) -> float:
  score = ... # custom harmfulness evaluation logic

  return score

@llm(model_name="claude", name="invoke_llm", model_provider="anthropic")
def llm_call():
    completion = ... # user application logic to invoke LLM

    # joining an evaluation to a span via span ID and trace ID
    span_context = LLMObs.export_span(span=None)
    LLMObs.submit_evaluation(
        span = span_context,
        ml_app = "chatbot",
        label="harmfulness",
        metric_type="score", # can be score or categorical
        value=my_harmfulness_eval(completion),
        tags={"type": "custom"},
        timestamp_ms=1765990800016, # optional, unix timestamp in milliseconds
        assessment="pass", # optional, "pass" or "fail"
        reasoning="it makes sense", # optional, judge llm reasoning
    )
{{< /code-block >}}


## API を使用した外部評価の送信 {#submitting-external-evaluations-with-the-api}

Agent Observability が提供する評価 API を使用して、スパン、トレース、またはセッションに関連付けられた評価を Datadog に送信できます。API 仕様の詳細については、[Evaluations API][2] を参照してください。再利用可能な評価器の構築については、[評価開発者ガイド][5]を参照してください。

<a href="/llm_observability/instrument/otel_instrumentation">OpenTelemetry スパン</a>の評価を Evaluations API に直接送信するには、 <code>source:otel</code> 評価にタグを含める必要があります。さらに、<code>span_id</code> と <code>trace_id</code> の値は、**10 進数**の文字列として指定する必要があります。OpenTelemetry インスツルメンテーションが 16 進数の ID を生成する場合は、送信前に 10 進数に変換してください。たとえば、Python の場合は以下のようになります。<code>str(int(hex_span_id, 16))</code>。

### 例 {#example-1}

{{< code-block lang="json" >}}
{
  "data": {
    "type": "evaluation_metric",
    "id": "456f4567-e89b-12d3-a456-426655440000",
    "attributes": {
      "metrics": [
        {
          "id": "cdfc4fc7-e2f6-4149-9c35-edc4bbf7b525",
          "join_on": {
            "tag": {
              "key": "msg_id",
              "value": "1123132"
            }
          },
          "ml_app": "weather-bot",
          "timestamp_ms": 1765990800016,
          "metric_type": "score",
          "label": "Accuracy",
          "score_value": 3,
          "tags": ["source:otel"],
          "assessment": "pass",
          "reasoning": "it makes sense"
        }
      ]
    }
  }
}
{{< /code-block >}}

## サポートされている評価フレームワーク {#supported-evaluation-frameworks}

{{< whatsnext desc="これらのツールから評価を送信します。" >}}
    {{< nextlink href="/llm_observability/investigate/evaluations/external_evaluations/deepeval" >}}DeepEval 評価{{< /nextlink >}}
    {{< nextlink href="/llm_observability/investigate/evaluations/external_evaluations/pydantic" >}}Pydantic 評価{{< /nextlink >}}
    {{< nextlink href="/llm_observability/investigate/evaluations/external_evaluations/nemo" >}}NeMo 評価{{< /nextlink >}}
{{< /whatsnext >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/metrics/custom_metrics/#naming-custom-metrics
[2]: /ja/llm_observability/setup/api/?tab=model#evaluations-api
[3]: /ja/llm_observability/setup/sdk/python/#evaluations
[4]: /ja/llm_observability/setup/sdk/nodejs/#evaluations
[5]: /ja/llm_observability/investigate/evaluations/evaluation_developer_guide