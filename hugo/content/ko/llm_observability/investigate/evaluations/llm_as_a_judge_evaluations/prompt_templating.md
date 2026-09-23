---
aliases:
- /ko/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/prompt_templating/
- /ko/llm_observability/configure/evaluations/llm_as_a_judge_evaluations/prompt_templating/
description: 사용자 지정 LLM-as-a-judge 평가 프롬프트에 사용되는 템플릿(변수, 배열 연산자, 스팬 및 트레이스 필터, 세션
  경로, 확인 규칙)과 관련된 참고 자료를 살펴보세요.
further_reading:
- link: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations
  tag: 설명서
  text: 사용자 지정 LLM-as-a-Judge 평가
- link: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/session_level_evaluations
  tag: 설명서
  text: 세션 수준 평가
- link: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/trace_level_evaluations
  tag: 설명서
  text: 트레이스 수준 평가
title: 프롬프트 템플릿화
---
사용자 지정 LLM-as-a-judge 프롬프트는 필드 경로를 `{{ ... }}`로 묶어 {{< ui >}}User{{< /ui >}} 메시지에세션, 트레이스, 스팬 데이터를 삽입합니다. 시스템 프롬프트는 LLM 평가자에 대한 정적 지침을 포괄하며 자리 표시자를 해석하지 않습니다. 동일한 구문을 테스트 창과 평가 시점에서 사용합니다. 사용 가능한 경로는 평가 범위(세션, 트레이스, 스팬)에 따라 달라집니다.

## 한눈에 보기 {#at-a-glance}

| 패턴 | 설명 |
|---|---|
| `{{traces}}` | 세션의 모든 트레이스를 JSON으로 표시 |
| `{{traces[0].spans[0].meta.input.value}}` | 첫 번째 트레이스의 첫 번째 스팬 |
| `{{traces[*].spans[*].name}}` | 트레이스와 스팬 전반에 걸쳐 팬아웃 |
| `{{traces[*].spans[meta.span.kind:llm].meta.output.value}}` | 세션 전반에서 속성별로 스팬 필터링 |
| `{{spans}}` | 트레이스의 모든 스팬을 JSON으로 표시(트레이스 범위) |
| `{{spans[0].name}}` | 트레이스에서 스팬 하나 선택(트레이스 범위) |
| `{{spans[name:my-span].meta.input.value}}` | 속성별로 스팬 필터링(트레이스 범위) |
| `{{name}}` | 직접 필드(스팬 범위) |
| `{{meta.input.value}}` | 중첩 필드에 대한 점 표기법(스팬 범위) |
| `{{meta.input.messages[0].content}}` | 배열 인덱스(0부터 시작)(스팬 범위) |
| `{{meta.input.messages[1,3].content}}` | 포함 배열 범위(스팬 범위) |
| `{{meta.input.messages[*].content}}` | 배열 와일드카드(팬아웃)(스팬 범위) |
| `{{meta.input.messages.content}}` | 암시적 팬아웃(`[*]`)와 동일(스팬 범위) |
| `{{span_input}}`, `{{span_output}}` | 스팬 입력 및 출력 필드의 별칭(스팬 범위) |
| `{{*}}` | 전체 페이로드를 JSON으로 표시(세션, 트레이스 또는 스팬 범위) |

자동 완성 드롭다운은 `{{`를 입력하면 열리며 선택한 샘플에서 사용할 수 있는 필드를 나열합니다.

## 세션 범위 구문 {#session-scope-syntax}

세션 범위 평가는 `traces` 배열 아래 [사용자 세션][1]에 있는 모든 트레이스를 노출합니다. 각 트레이스는 자체 `spans` 배열을 포함하고 있으므로, 하나의 프롬프트에서 트레이스와 스팬 전체를 읽을 수 있습니다. 세션 수준 평가자를 빌드하려면{{traces[...]}}` 경로(및 충첩된 `{{traces[...].spans[...]}}` 경로)를 사용하세요. `{{span_input}}` 및 `{{span_output}}` 별칭은 세션 범위에서 사용할 수 없습니다.

세션 수준 평가를 수행하려면 스팬에 `session_id` 태그를 지정해야 합니다. 애플리케이션을 계측하려면 [사용자 세션 추적][1]을 참조하고 구성, 프롬프트 예시, 세션 범위를 선택하는 시점에 대한 지침은 [세션 수준 평가][2]를 참조하세요.

### 전체 세션 참조 {#reference-the-whole-session}

```
{{traces}}    # JSON of every trace in the session (each trace includes its spans)
{{*}}         # Entire session payload as JSON, including top-level metadata
```

### 인덱스로 트레이스/스팬 선택 {#pick-a-trace-or-span-by-index}

```
{{traces[0].spans[0].meta.input.value}}    # First span of the first trace
{{traces[*].spans[*].name}}                # Newline-joined names of every span in the session
{{traces[1].spans}}                        # JSON of every span in the second trace
```

### 속성별 스팬 필터링 {#filter-spans-by-attribute}

`[field.path:value]`의 `spans`는 `field.path`의 필드가 `value`와 일치하는 스팬만 유지합니다. 하위 경로와 결합하여 세션 전체에서 입력 또는 출력을 추출합니다. 일치하는 항목이 없으면 필터는 빈 문자열로 대체됩니다.

```
{{traces[0].spans[name:my-span].meta.input.value}}
{{traces[*].spans[meta.span.kind:llm].meta.output.value}}
{{traces[*].spans[meta.span.kind:tool].meta.input.parameters}}
```

### 트레이스 전체 팬아웃 {#fan-out-across-traces}

`[*]` `traces` 또는 `spans`를 사용하여 팬아웃합니다. 일치하는 모든 요소의 값은 줄바꿈(`\n`)으로 결합되거나, 확인된 값이 객체인 경우 JSON으로 직렬화됩니다.

```
{{traces[*].spans[meta.span.kind:llm].meta.input.messages[*].content}}
{{traces[*].spans[meta.span.kind:llm].meta.output.messages[*].content}}
```

## 트레이스 범위 구문 {#trace-scope-syntax}

트레이스 범위 평가는 트레이스의 모든 스팬을 `spans` 배열 아래에 노출합니다. 스팬 전반의 데이터를 읽으려면 `{{spans...}}` 경로를 사용합니다. `{{span_input}}` 및 `{{span_output}}` 별칭은 트레이스 범위에서 사용할 수 없습니다. 구성, 예시 프롬프트, 트레이스 범위를 선택해야 하는 경우에 대한 지침은 [트레이스 수준 평가][3]에서 확인하세요.

### 전체 트레이스 참조 {#reference-the-whole-trace}

```
{{spans}}    # JSON of every span in the trace
{{*}}        # Entire trace payload as JSON, including top-level metadata
```

### 인덱스로 스팬 선택 {#pick-a-span-by-index}

```
{{spans[0].meta.input.value}}    # First span
{{spans[*].name}}                # Newline-joined names of every span
```

### 속성별 스팬 필터링 {#filter-spans-by-attribute-1}

`[field.path:value]`는 `field.path`의 필드가 `value`와 일치하는 스팬만 유지합니다. 하위 경로와 결합하여 일치하는 스팬의 입력 또는 출력을 추출합니다. 일치하는 스팬이 없으면 필터는 빈 문자열로 대체됩니다.

```
{{spans[name:my-span].meta.input.value}}
{{spans[meta.span.kind:llm].meta.output.value}}
{{spans[meta.span.kind:tool].meta.input.parameters}}
```

## 스팬 범위 구문 {#span-scope-syntax}

스팬 범위 평가는 평가 1회당 단일 스팬을 노출합니다. 스팬의 JSON 경로를 통해 필드를 참조합니다.

### 기본 별칭{#built-in-aliases}

| 별칭 | 확인 대상 |
|---|---|
| `{{span_input}}` |  LLM 스팬의 경우, `meta.input.messages[*].content`, 그 외에는 `meta.input.value`|
| `{{span_output}}` | LLM 스팬의 경우, `meta.output.messages[*].content`, 그 외에는 `meta.output.value` |

별칭은 평가 중인 스팬의 유형에 맞게 조정되므로, 스팬이 LLM 호출인지 에이전트 단계인지 구분할 필요가 없습니다.

### 직접 필드 경로 {#direct-field-paths}

JSON 경로를 통해 모든 스팬 필드를 참조합니다.

```
{{name}}
{{meta.input.value}}
{{meta.output.value}}
{{metrics.input_tokens}}
```

### 배열 액세스 {#array-access}

대괄호 표기법으로 배열 필드를 인덱싱하거나, 슬라이싱하거나, 팬아웃합니다.

```
{{meta.input.messages[0].content}}     # First message only
{{meta.input.messages[*].content}}     # All messages, joined with newlines
{{meta.input.messages[0,2].content}}   # Inclusive range; out-of-bounds ends are clamped
{{meta.input.messages.content}}        # Implicit fan-out, equivalent to [*]
```

## 해석 규칙 {#resolution-rules}

| 결과 | 동작 |
|---|---|
| 경로 누락 | 빈 문자열로 해석됨 |
| 범위를 벗어난 인덱스 | 빈 문자열로 해석됨 |
| 단일 문자열 | 있는 그대로 삽입됨 |
| 문자열 배열 | 줄바꿈으로 결합됨(`\n`) |
| 객체 또는 비문자열 값 배열 | 압축된 JSON으로 직렬화됨 |
| 혼합 배열(문자열 + 객체) | 압축된 JSON으로 직렬화됨 |
| 단일 빈 배열 | 빈 문자열로 해석됨 |

예를 들어, `meta.input.messages`에 해당하는 스팬이 확인된 경우

```json
[
  { "role": "user", "content": "hello" },
  { "role": "user", "content": "help please" }
]
```

| 템플릿 | 해석된 값 |
|---|---|
| `{{meta.input.messages[0].content}}` | `안녕하세요` |
| `{{meta.input.messages[*].content}}` | `안녕하세요`<br>`도와주세요` |
| `{{meta.input.messages}}` | `[{"role":"user","content":"안녕하세요"},{"role":"user","content":"도와주세요"}]` |

## 팁 {#tips}

- 프롬프트 편집기에 `{{`를 입력하여 자동 완성 드롭다운을 엽니다. 목록은 범위(세션, 트레이스, 스팬)와 선택한 샘플에 맞게 조정됩니다.
- 오른쪽 패널에서 샘플을 선택합니다(세션 범위의 경우 {{< ui >}}Sample Session{{< /ui >}}, 트레이스 범위의 경우 {{< ui >}}Spans in Selected Trace{{< /ui >}}, 스팬 범위의 경우 {{< ui >}}Filtered Spans{{< /ui >}}), 그리고 저장하기 전에 {{< ui >}}Test Evaluation{{< /ui >}}을 클릭하여 각 자리 표시자가 실제 데이터에서 어떻게 해석되는지 미리 확인하세요.
- 샘플의 JSON 보기에서 점 3개 메뉴를 사용하고 {{< ui >}}Add variable to message{{< /ui >}}를 선택한 다음 입력 없이 필드 경로를 프롬프트에 삽입합니다.
- LLM 평가자가 전체 페이로드를 확인하도록 하려면 `{{*}}`를 전달합니다. 어떤 필드가 중요한지 자체적으로 결정하는 자유 형식 프롬프트에 유용합니다.
- 여러 턴에 걸친 컨텍스트가 필요한 세션 평가에서는 `{{traces}}` 또는 특정 대상을 지정하는 `{{traces[...].spans[...]}}` 경로를 사용하고, 단일 트레이스로 충분한 경우에는 `{{spans}}`를 사용합니다. 범위 지침 및 예시 프롬프트는 [세션 수준 평가][2]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/llm_observability/instrument/sdk/#tracking-user-sessions
[2]: /ko/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/session_level_evaluations
[3]: /ko/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/trace_level_evaluations