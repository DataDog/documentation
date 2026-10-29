---
description: Agent Observability Insights는 기존 트레이스에서 반복되는 비용 및 신뢰성 문제를 식별하고 수정 사항을
  제안합니다.
further_reading:
- link: /llm_observability/investigate/cost/
  tag: 문서
  text: LLM 비용 모니터링하기
- link: /llm_observability/investigate/evaluations/
  tag: 문서
  text: LLM 애플리케이션 평가하기
- link: /llm_observability/build_with_ai/mcp_server/
  tag: 문서
  text: AI 에이전트를 Agent Observability에 연결하기
title: 인사이트
---
## 개요 {#overview}

Agent Observability Insights는 Agent Observability가 애플리케이션으로부터 수신한 트레이스를 자동으로 분석하여 반복되는 비용 및 신뢰성 문제를 찾습니다. 인사이트를 사용하여 트레이스를 하나씩 검토하지 않고도 수정할 항목의 우선순위를 지정하세요.

각 인사이트에는 다음이 포함됩니다.

- 반복되는 동작을 설명하는 근본 원인
- 영향을 받는 호출 또는 세션을 기반으로 한 영향 평가
- 발견 사항을 뒷받침하는 트레이스 및 스팬 증거
- 권장 수정 사항 및 이를 검증하는 방법

<div class="alert alert-info">인사이트는 추가 구성이 필요하지 않습니다. Datadog은 애플리케이션이 이미 Agent Observability로 전송한 트레이스를 분석합니다.</div>

## 인사이트 작동 방식 {#how-insights-works}

Datadog은 여러 호출이나 세션에 걸친 최근 트레이스를 분석하여 반복되는 비용 및 신뢰성 문제를 식별합니다. 성공적인 재시도나 태스크에 필요한 긴 응답과 같은 예상 동작을 확인합니다.

Datadog은 동일한 근본 원인을 가진 발견 사항을 하나의 인사이트로 그룹화합니다. 이후 분석을 통해 인사이트가 업데이트되며, 문제가 더 이상 나타나지 않으면 자동으로 해결됩니다. 문제가 다시 발생하면 Datadog이 이를 다시 표시합니다.

### 인사이트 유형 {#insight-types}

| 범주 | 인사이트 유형 | 식별 내용 |
|---|---|---|
| 비용 | 비효율적인 프롬프트 캐싱 | 공급자 캐시에 적중하지 않아 입력 토큰 비용을 증가시키는 재사용 가능한 프롬프트 콘텐츠입니다. |
| 비용 | 대규모 도구 결과 | 이후 모델 요청에 불필요한 콘텐츠를 추가하고 토큰 사용량이나 컨텍스트 부담을 증가시키는 도구 결과입니다. |
| 비용 | 장황한 모델 출력 | 태스크에 필요한 것보다 더 많은 출력 토큰을 사용하는 모델 응답 또는 추론입니다. |
| 신뢰성 | 도구 호출 재시도 루프 | 거의 동일한 인수를 사용하고 진전이 없는 동일한 도구에 대한 반복적인 호출입니다. |
| 신뢰성 | 프롬프트 규칙 위반 | 프롬프트, 스킬 또는 도구 설명의 명시적 규칙을 위반하는 Agent 동작입니다. |

## 영향 및 증거 이해 {#understand-impact-and-evidence}

유형에 따라 비용 인사이트는 절감 가능한 예상 비용 또는 사용 가능한 결과를 생성하지 못한 모델 작업의 정확한 비용을 보여줍니다. 신뢰성 인사이트는 문제의 영향을 받은 것으로 확인된 호출 또는 세션을 보여줍니다.

연결된 트레이스 및 스팬을 열어 증거와 명시된 근본 원인을 비교하세요. 조사 추적은 발견 사항이 도출된 단계와 뒷받침하는 증거를 보여줍니다.

## 인사이트 검토 및 조치 {#review-and-act-on-insights}

1. Datadog에서 [**AI Observability > Agent Observability > Insights**][1]로 이동합니다.
2. 개요 및 필터를 사용하여 애플리케이션, 유형, 중증도, 상태 또는 영향별로 인사이트의 우선순위를 지정합니다.
3. 인사이트를 열어 발견 사항을 검토합니다.
4. 권장 수정 사항을 적용하고 검증합니다. **Fix with Bits** 또는 MCP 호환 코딩 에이전트를 사용할 수 있습니다. Work Management 읽기 및 쓰기 권한이 있으면 Jira 티켓이나 Linear 이슈를 생성하거나 연결할 수도 있습니다.
5. 결정을 기록하려면 상태를 **For Review**, **In Progress**, **Completed** 또는 **Ignored**로 설정합니다. Datadog은 이후 분석에서 문제가 더 이상 발견되지 않으면 상태를 **Automatically Resolved**로 설정합니다.

인사이트는 애플리케이션의 개요 페이지에 표시됩니다. 비용 인사이트는 관련 지출 옆의 **Cost** 페이지에도 표시됩니다.

## 코딩 에이전트와 함께 인사이트 사용 {#use-insights-with-a-coding-agent}

[Datadog MCP Server][2]를 MCP 호환 코딩 에이전트에 연결하세요. 에이전트는 변경 사항을 구현하고 테스트하기 위해 인사이트의 근본 원인, 증거, 권장 수정 사항 및 검증 지침을 가져올 수 있습니다.

### 인사이트 검토 및 수정 자동화 {#automate-insight-reviews-and-fixes}

코딩 에이전트에서 반복 워크플로를 설정하여 인사이트를 검토하고 수정하세요. 예:

```text
Use Datadog MCP to list Agent Observability insights with status `for_review` for `<ML_APP>`. Prioritize the returned Insights by severity. For each Insight, review the evidence, implement and validate the recommended fix, and update the insight status based on the result.
```

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/insights
[2]: /ko/llm_observability/build_with_ai/mcp_server/