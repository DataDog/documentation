---
description: 프롬프트 추적을 사용하여 프롬프트 템플릿과 버전을 추적하세요.
further_reading:
- link: https://www.datadoghq.com/blog/llm-prompt-tracking
  tag: 블로그
  text: Datadog LLM Observability를 통해 LLM 프롬프트를 추적, 비교 및 최적화하세요.
- link: https://learn.datadoghq.com/courses/llm-obs-investigations
  tag: 학습 센터
  text: LLM Observability로 조사
title: 프롬프트 추적
---
## 개요 {#overview}

프롬프트 추적은 프롬프트 템플릿 및 버전과 LLM 호출을 연결합니다. 프롬프트 추적은 Agent Observability의 트레이스, 스팬, Playground와 함께 작동하며, 프롬프트 생성 및 버전 관리를 위한 중앙 집중식 레지스트리를 제공하는 [Prompt Management][8]와도 함께 작동합니다.

프롬프트 추적을 통해 다음을 수행할 수 있습니다.
- 시간에 따른 호출량 및 지연 시간과 함께 LLM 애플리케이션이나 Agent에서 사용되는 모든 프롬프트를 확인합니다.
- 호출, 지연 시간, 사용된 토큰 및 비용별로 프롬프트 또는 버전을 비교합니다.
- 프롬프트에 대한 자세한 정보를 확인하고, 버전 기록을 검토하고, 텍스트 차이를 확인하며, 특정 버전을 사용하는 트레이스로 이동합니다.
- 프롬프트 이름, ID 또는 버전별로 [Trace Explorer][1]를 필터링하여 영향을 받는 요청을 격리합니다.
- 원하는 스팬의 정확한 템플릿과 변수를 [Agent Observability Playground][2]에 입력하여 실행을 재현합니다.

{{< img src="llm_observability/monitoring/llm-prompt-tracking-hero.png" alt="Agent Observability에 표시된 앱의 프롬프트 화면." style="width:100%;" >}}

## 프롬프트 추적 설정 {#set-up-prompt-tracking}

Agent Observability가 활성화되면 `LLMObs.get_prompt()`를 사용하여 [Prompt Management][8] 레지스트리에서 가져온 프롬프트는 `prompt.format()`에서 반환된 값이 지원되는 자동 계측 LLM 호출에 직접 전달되는 경우 자동으로 추적됩니다. 형식이 지정된 값이 복사되거나 변환되는 경우, Prompt Management 문서에 설명된 대로 `LLMObs.annotation_context()`를 사용하세요. 다음 설정 옵션은 레지스트리 외부에서 정의된 프롬프트에 적용됩니다.

### 구조화된 프롬프트 메타데이터 사용 {#with-structured-prompt-metadata}
프롬프트 추적을 사용하려면 구조화된 프롬프트 메타데이터(ID, 선택적 버전, 템플릿, 변수)를 제출할 수 있습니다.

#### Agent Observability Python SDK {#agent-observability-python-sdk}
Agent Observability Python SDK(`dd-trace` v3.16.0 이상)를 사용하는 경우, `prompt` 인수 또는 헬퍼를 사용하여 LLM 스팬에 프롬프트 메타데이터를 첨부하세요. [Agent Observability Python SDK 문서][3]를 참조하세요.

#### Agent Observability Node.js SDK {#agent-observability-nodejs-sdk}
Agent Observability Node.js SDK(`dd-trace` v5.83.0+)를 사용하는 경우 `prompt` 옵션을 사용하여 LLM 스팬에 프롬프트 메타데이터를 첨부하세요. [Agent Observability Node.js SDK 문서][6]를 참조하세요.

#### Agent Observability API {#agent-observability-api}
Agent Observability API 수집을 사용하는 경우 스팬 API 엔드포인트에 프롬프트 메타데이터를 제출하세요. [Agent Observability HTTP API 참조 문서][4]를 참조하세요.

#### OpenTelemetry 계측 {#opentelemetry-instrumentation}
[OpenTelemetry 계측][7]을 사용하는 경우 프롬프트 정보가 포함된 JSON 문자열로 `_dd.ml_obs.prompt_tracking` 속성을 설정하여 LLM 스팬에 프롬프트 메타데이터를 첨부할 수 있습니다.

모든 LLM 스팬에 속성을 설정하세요.

{{< tabs >}}
{{% tab "Python" %}}

```python
import json

span.set_attribute("_dd.ml_obs.prompt_tracking", json.dumps({
    "name": "greeting-prompt",
    "version": "v1",
    "template": "Hello {{name}}, tell me about {{topic}}",
    "variables": {"name": "Alice", "topic": "weather"}
}))
```
{{% /tab %}}
{{% tab "JavaScript" %}}

```javascript
span.setAttribute("_dd.ml_obs.prompt_tracking", JSON.stringify({
    name: "greeting-prompt",
    version: "v1",
    template: "Hello {{name}}, tell me about {{topic}}",
    variables: { name: "Alice", topic: "weather" }
}));
```
{{% /tab %}}
{{% tab "Go" %}}

```go
span.SetAttributes(attribute.String("_dd.ml_obs.prompt_tracking",
    `{"name":"greeting-prompt","version":"v1","template":"Hello {{name}}, tell me about {{topic}}","variables":{"name":"Alice","topic":"weather"}}`,
))
```
{{% /tab %}}
{{< /tabs >}}

프롬프트 추적 JSON에서 지원되는 필드는 다음과 같습니다.

| 필드 | 유형 | 필수 | 설명 |
|-------|------|----------|-------------|
| `template` | 문자열 | 예(또는 `chat_template`) | 단일 메시지 프롬프트용 템플릿 문자열 |
| `chat_template` | 배열 | 예(또는 `template`) | `{"role": "...", "content": "..."}` 메시지 템플릿 목록 |
| `id` | 문자열 | 아니요 | 프롬프트의 고유 식별자입니다. 생략 시 `{ml_app}_unnamed-prompt`로 기본 설정됩니다 |
| `name` | 문자열 | 아니요 | 프롬프트 이름입니다. `id`의 폴백으로, `id`가 생략된 경우 사용됩니다 |
| `version` | 문자열 | 아니요 | 사용자가 제공한 버전 태그 |
| `variables` | 객체 | 아니요 | 템플릿 변수 대체 |
| `rag_context_variables` | 문자열 배열 | 아니요 | RAG 컨텍스트(근거)를 포함하는 `variables` 내 변수 이름입니다. RAG 평가자가 사용합니다. |
| `rag_query_variables` | 문자열 배열 | 아니요 | 사용자 쿼리가 포함된 `variables`의 변수 이름입니다. RAG 평가자가 사용합니다. |

<div class="alert alert-info">프롬프트 템플릿을 사용하는 경우, Agent Observability는 프롬프트 콘텐츠를 기반으로 버전 정보를 자동으로 첨부할 수 있습니다.</div>

### LangChain 템플릿 사용 {#with-langchain-templates}
LangChain 프롬프트 템플릿을 사용하는 경우, Datadog은 코드 변경 없이 프롬프트 메타데이터를 자동으로 캡처합니다. ID는 모듈 또는 템플릿 이름에서 파생됩니다. 이러한 ID를 재정의하려면 [Agent Observability 자동 계측: LangChain][5]을 참조하세요.

## Agent Observability에서 프롬프트 추적 사용 {#use-prompt-tracking-in-agent-observability}

Agent Observability에서 앱을 확인한 후, 왼쪽에서 {{< ui >}}Prompts{{< /ui >}}를 선택하세요. _프롬프트 보기_는 다음 정보를 제공합니다.

- {{< ui >}}Prompt Call Count{{< /ui >}}: 시간 경과에 따른 프롬프트(또는 버전)별 호출을 표시하는 시계열 차트
- {{< ui >}}Recent Prompt Updates{{< /ui >}}: 마지막 업데이트 시간, 호출 횟수, 평균 지연 시간, 호출당 평균 토큰 수를 포함한 최근 프롬프트 업데이트 정보
- {{< ui >}}Most Tokens Used{{< /ui >}}: 총(입력 또는 출력) 토큰 수 기준 프롬프트 순위
- {{< ui >}}Highest Latency Prompts{{< /ui >}}: 평균 지속 시간 기준 프롬프트 순위

{{< img src="llm_observability/monitoring/prompt_details.png" alt="단일 프롬프트에 대한 상세 보기입니다." style="width:100%;" >}}

프롬프트를 클릭하면 버전 활동 및 다양한 메트릭에 대한 정보가 포함된 상세 측면 패널 보기가 열립니다. 두 버전의 차이를 비교하거나, 선택한 버전을 사용하는 스팬으로 사전 필터링된 Trace Explorer를 열거나, 선택한 버전의 템플릿과 변수가 미리 입력된 Playground 세션을 시작할 수도 있습니다.

{{< img src="llm_observability/monitoring/prompt_tracking_trace_explorer3.png" alt="Agent Observability에 표시된 앱의 프롬프트 화면." style="width:100%;" >}}

Agent Observability Trace Explorer를 사용하여 프롬프트 사용량별로 요청을 찾을 수 있습니다. 프롬프트의 이름, ID, 버전을 트레이스 수준 및 스팬 수준 검색을 위한 패싯으로 사용할 수 있습니다. LLM 스팬을 클릭하면 해당 스팬을 생성한 프롬프트를 볼 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/traces
[2]: https://app.datadoghq.com/llm/playground
[3]: /ko/llm_observability/instrumentation/sdk/?tab=python#prompt-tracking
[4]: /ko/llm_observability/instrumentation/api/?tab=model#prompt
[5]: /ko/llm_observability/instrumentation/auto_instrumentation?tab=python#langchain
[6]: /ko/llm_observability/instrumentation/sdk/?tab=nodejs#prompt-tracking
[7]: /ko/llm_observability/instrumentation/otel_instrumentation
[8]: /ko/llm_observability/monitoring/prompt_management