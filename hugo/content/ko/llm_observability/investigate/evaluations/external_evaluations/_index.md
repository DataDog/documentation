---
aliases:
- /ko/tracing/llm_observability/submit_evaluations
- /ko/llm_observability/submit_evaluations
- /ko/llm_observability/evaluations/submit_evaluations
- /ko/llm_observability/configure/evaluations/submit_evaluations
- /ko/llm_observability/evaluations/external_evaluations/
- /ko/llm_observability/configure/evaluations/external_evaluations/
description: Python SDK 또는 Agent Observability API를 사용하여 Agent Observability에 사용자
  지정 평가를 제출하고 응답 품질을 추적하세요.
further_reading:
- link: /llm_observability/investigate/evaluations/evaluation_developer_guide
  tag: 문서
  text: 사용자 지정 평가자 구축하기
- link: /llm_observability/setup/sdk
  tag: 문서
  text: Python용 Agent Observability SDK 소개
- link: /llm_observability/setup/api
  tag: 문서
  text: 평가 API에 대해 알아보기
- link: /llm_observability/investigate/evaluations/external_evaluations/nemo
  tag: 문서
  text: NVIDIA NeMo에서 평가 제출하기
- link: /llm_observability/investigate/evaluations/end_user_feedback
  tag: 문서
  text: 최종 사용자 피드백 제출하기
title: 외부 평가
---
## 개요 {#overview}

평가는 LLM 애플리케이션 응답의 품질을 측정합니다.
Agent Observability는 트레이스에 대한 몇 가지 기본 제공 평가를 제공하며, Datadog의 [SDK](#submitting-evaluations-with-the-sdk) 또는 [Agent Observability API](#submitting-evaluations-with-the-api)를 사용하여 자체 평가를 Agent Observability에 제출할 수 있습니다. 평가 레이블에 다음 명명 규칙을 사용하세요.

* 평가 레이블은 문자로 시작해야 합니다.
* 평가 레이블에는 ASCII 영숫자 또는 밑줄만 포함되어야 합니다.
  * 공백을 포함한 기타 문자는 밑줄(_)로 변환됩니다.
  * 유니코드는 지원되지 않습니다.
* 평가 레이블은 200자를 초과할 수 없습니다. UI 관점에서는 100자 미만을 권장합니다.

<div class="alert alert-info">

평가 레이블은 특정 LLM 애플리케이션(<code>ml_app</code>) 및 조직 내에서 고유해야 합니다.

</div>

<div class="alert alert-info">사용자가 제출한 좋아요 또는 싫어요 평가, 수락된 변경 사항, 자유 텍스트 의견 및 기타 신호와 같은 피드백에 대해서는 <a href="/llm_observability/investigate/evaluations/end_user_feedback/">최종 사용자 피드백</a>을 참조하세요.</div>

## SDK를 사용한 외부 평가 제출 {#submitting-external-evaluations-with-the-sdk}

Agent Observability SDK는 트레이싱된 LLM 애플리케이션이 Agent Observability에 외부 평가를 제출할 수 있도록 돕는 `LLMObs.submit_evaluation()` 및 `LLMObs.export_span()` 메서드를 제공합니다. 자세한 내용은 [Python][3] 또는 [Node.js][4] SDK 문서를 참조하세요.

<div class="alert alert-info">풍부한 결과 메타데이터를 포함하는 재사용 가능한 클래스 기반 평가자를 구축하려면 <a href="/llm_observability/investigate/evaluations/evaluation_developer_guide/">평가 개발자 가이드</a>를 참조하세요.</div>

### 예시 {#example}

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


## API를 사용한 외부 평가 제출 {#submitting-external-evaluations-with-the-api}

Agent Observability에서 제공하는 평가 API를 사용하여 스팬, 트레이스 또는 세션과 관련된 평가를 Datadog으로 전송할 수 있습니다. API 사양에 대한 자세한 내용은 [Evaluations API][2]를 참조하세요. 재사용 가능한 평가자를 구축하려면 [Evaluation Developer Guide][5]를 참조하세요.

<a href="/llm_observability/instrument/otel_instrumentation">OpenTelemetry 스팬</a>에 대한 평가를 Evaluations API로 직접 제출하려면 평가에 <code>source:otel</code> 태그를 포함해야 합니다. 또한, <code>span_id</code> 및 <code>trace_id</code> 값은 **10진수** 문자열로 제공되어야 합니다. OpenTelemetry 계측에서 16진수 ID를 생성하는 경우, 제출하기 전에 10진수로 변환하세요. 예를 들어, Python에서는 다음과 같습니다. <code>str(int(hex_span_id, 16))</code>.

### 예시 {#example-1}

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

## 지원되는 평가 프레임워크 {#supported-evaluation-frameworks}

{{< whatsnext desc="다음 도구에서 평가를 제출하세요." >}}
    {{< nextlink href="/llm_observability/investigate/evaluations/external_evaluations/deepeval" >}}DeepEval 평가{{< /nextlink >}}
    {{< nextlink href="/llm_observability/investigate/evaluations/external_evaluations/pydantic" >}}Pydantic 평가{{< /nextlink >}}
    {{< nextlink href="/llm_observability/investigate/evaluations/external_evaluations/nemo" >}}NeMo 평가{{< /nextlink >}}
{{< /whatsnext >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/metrics/custom_metrics/#naming-custom-metrics
[2]: /ko/llm_observability/setup/api/?tab=model#evaluations-api
[3]: /ko/llm_observability/setup/sdk/python/#evaluations
[4]: /ko/llm_observability/setup/sdk/nodejs/#evaluations
[5]: /ko/llm_observability/investigate/evaluations/evaluation_developer_guide