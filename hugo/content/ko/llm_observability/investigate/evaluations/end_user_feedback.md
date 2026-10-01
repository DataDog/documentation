---
aliases:
- /ko/llm_observability/evaluations/end_user_feedback/
- /ko/llm_observability/configure/evaluations/end_user_feedback/
description: 최종 사용자 피드백을 Agent Observability에 제출하고 이를 스팬, 트레이스, 세션 또는 외부 엔터티에 연결합니다.
further_reading:
- link: /llm_observability/instrument/api/#evaluations-api
  tag: 설명서
  text: 평가 API에 대해 알아보기
- link: /llm_observability/investigate/evaluations/external_evaluations
  tag: 설명서
  text: 외부 평가 제출에 대해 알아보기
- link: /llm_observability/investigate/annotation_queues
  tag: 설명서
  text: 주석 대기열에 대해 알아보기
- link: https://www.datadoghq.com/blog/debug-and-evaluate-your-ai-app-from-your-coding-agent/
  tag: 블로그
  text: Datadog Agent Observability를 사용하여 코딩 에이전트에서 AI 앱을 디버깅하고 평가하기
title: 최종 사용자 피드백
---
## 개요 {#overview}

최종 사용자 피드백은 Agent Observability에서 LLM 애플리케이션 사용자의 입력을 캡처합니다. 예시로는 '좋아요' 또는 '싫어요' 평가, 사용자가 에이전트의 변경 사항을 수락했는지 여부, 응답에 대한 자유 텍스트 코멘트 등이 있습니다.

피드백은 평가와 다릅니다. 최종 사용자가 제출한 신호에는 피드백을 사용하세요. 평가 제출자가 누구인지가 중요하지 않은 자체 평가자 로직에서 생성된 결과에는 [외부 평가][1]를 사용하세요. 팀에서 실행하는 구조화된 검토 워크플로에는 [주석 대기열][2]을 사용하세요.

제출된 피드백은 Agent Observability 세션, 트레이스 또는 스팬을 볼 때 나타납니다.

## 피드백 제출 {#submit-feedback}

`event_kind`를 `feedback`으로 설정하여 [평가 API][3]로 피드백을 제출하세요.

피드백 이벤트에는 다음이 필요합니다.

- `event_kind: "feedback"`
피드백을 제출한 사용자 또는 에이전트를 식별하는 - `submitter.id`
- 정확히 하나의 대상 필드: `span_id`, `trace_id`, `session_id` 또는 `feedback_join_key`
- `metric_type`과 일치하는 값 필드

피드백 이벤트에는 `join_on`이 포함되어서는 안 됩니다. `eval_scope`이 생략되면 Datadog은 대상 필드에서 이를 추론합니다. `eval_scope`가 제공되는 경우 선택한 대상과 일치해야 합니다.

### 대상 피드백 {#target-feedback}

| 대상 | 필드 | 사용 시기 |
|--------|-------|----------|
| 스팬 | `span_id` | 피드백이 하나의 스팬에 적용됩니다. |
| 트레이스 | `trace_id` | 피드백이 전체 트레이스에 적용됩니다. |
| 세션 | `session_id` | 피드백이 전체 세션에 적용됩니다. |
| 외부 엔터티 | `feedback_join_key` | 피드백이 인시던트 ID, 보고서 ID, 작업 ID 또는 릴리스 검사 ID와 같이 고객이 정의한 엔터티에 적용됩니다. |

### 피드백 조인 키 사용 {#use-a-feedback-join-key}

피드백이 단일 스팬, 트레이스 또는 세션에 연결되지 않은 경우 `feedback_join_key`를 사용하세요. 먼저 SDK의 [스팬 보강][4] 워크플로 또는 [스팬 API][5]를 사용하여 외부 엔터티와 관련된 `feedback_join_key` 태그로 스팬을 보강합니다. 그런 다음 동일한 `feedback_join_key`를 사용하여 피드백을 제출합니다.

## 예시 {#examples}

### 스팬에 대한 '싫어요' 피드백 제출 {#submit-thumbs-down-feedback-for-a-span}

{{< code-block lang="json" >}}
{
  "data": {
    "type": "evaluation_metric",
    "attributes": {
      "metrics": [
        {
          "event_kind": "feedback",
          "span_id": "20245611112024561111",
          "ml_app": "weather-bot",
          "timestamp_ms": 1765990800016,
          "metric_type": "categorical",
          "label": "thumbs",
          "categorical_value": "down",
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

### 피드백 조인 키를 사용하여 자유 텍스트 피드백 제출 {#submit-free-text-feedback-with-a-feedback-join-key}

{{< code-block lang="json" >}}
{
  "data": {
    "type": "evaluation_metric",
    "attributes": {
      "metrics": [
        {
          "event_kind": "feedback",
          "feedback_join_key": "incident-123",
          "ml_app": "incident-agent",
          "timestamp_ms": 1765990800016,
          "metric_type": "text",
          "label": "user_comment",
          "text_value": "The investigation missed the customer impact.",
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

## 피드백 분석 {#analyze-feedback}

피드백을 위한 대시보드 위젯을 만들려면 평가를 위한 위젯을 만드는 것과 동일한 방식으로 위젯을 만들고 전용 **피드백** 데이터 소스를 선택하세요. Trace Explorer에서 피드백별로 스팬 및 트레이스를 검색하고 필터링하려면 [피드백 쿼리][6]를 참조하세요.

{{< img src="llm_observability/evaluations/feedback_widget_query.png" alt="피드백 데이터 소스가 선택된 Datadog 위젯 편집기로, 모든 피드백의 수를 보여줍니다." style="width:100%;" >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/llm_observability/investigate/evaluations/external_evaluations
[2]: /ko/llm_observability/investigate/annotation_queues
[3]: /ko/llm_observability/instrument/api/#evaluations-api
[4]: /ko/llm_observability/instrument/sdk/?tab=python#enriching-spans
[5]: /ko/llm_observability/instrument/api/?tab=model#spans-api
[6]: /ko/llm_observability/investigate/querying/#feedback-queries