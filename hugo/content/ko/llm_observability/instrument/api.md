---
aliases:
- /ko/tracing/llm_observability/api
- /ko/llm_observability/api
- /ko/llm_observability/setup/api
- /ko/llm_observability/instrumentation/api/
description: 어떤 언어로 작성된 애플리케이션에서든 Datadog으로 LLM 트레이스 및 스팬을 전송하는 데 사용되는 Agent Observability
  HTTP API에 대한 참조 문서입니다.
further_reading:
- link: https://www.datadoghq.com/blog/llm-otel-semantic-convention
  tag: 블로그
  text: Datadog LLM Observability는 OpenTelemetry GenAI 시맨틱 규칙을 기본적으로 지원합니다.
- link: https://www.datadoghq.com/blog/llm-prompt-tracking
  tag: 블로그
  text: Datadog LLM Observability를 통해 LLM 프롬프트를 추적, 비교 및 최적화하세요.
title: HTTP API 레퍼런스
---
## 개요 {#overview}

Agent Observability HTTP API는 개발자가 LLM 관련 트레이스 및 스팬을 Datadog으로 전송하는 인터페이스를 제공합니다. 애플리케이션이 Python, Node.js 또는 Java로 작성된 경우 [Agent Observability SDK][1]를 사용할 수 있습니다.

API는 24시간 이내의 타임스탬프가 포함된 스팬을 허용하므로 지연된 데이터를 제한적으로 백필할 수 있습니다.

## 스팬 API {#spans-api}

이 엔드포인트를 사용하여 Datadog으로 스팬을 전송합니다. 사용 가능한 스팬 종류에 대한 자세한 내용은 [스팬 종류][2]를 참조하세요.

엔드포인트
: `https://api.{{< region-param key="dd_site" code="true" >}}/api/intake/llm-obs/v1/trace/spans`

메서드
: `POST`

### 요청 {#request}

#### 헤더(필수) {#headers-required}
- `DD-API-KEY=<YOUR_DATADOG_API_KEY>`
- `Content-Type="application/json"`

#### 본문 데이터(필수) {#body-data-required}

{{< tabs >}}
{{% tab "모델" %}}
| 필드 | 유형 | 설명                  |
|-------|------------------------------|------|
| data [*필수*]|  [SpansRequestData](#spansrequestdata) | 요청 본문의 진입점입니다. |
{{% /tab %}}

{{% tab "예시" %}}
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

### 응답 {#response}
요청이 성공하면 API는 202 네트워크 코드와 빈 본문으로 응답합니다.

### API 표준 {#api-standards}

#### 오류 {#error}
| 필드   | 유형   | 설명        |
|---------|--------|--------------------|
| message | string | 오류 메시지입니다. |
| stack   | string | 스택 트레이스입니다.   |
| type    | string | 오류 유형입니다.    |

#### IO {#io}
| 필드   | 유형   | 설명  |
|---------|--------|--------------|
| value   | string | 입력 또는 출력 값입니다. 설정하지 않으면 이 값은 메시지나 문서에서 추론됩니다. |
| messages| [[Message](#message)] | 메시지 목록입니다. LLM 스팬에만 사용하세요. |
| documents| [[Document](#document)] | 문서 목록입니다. 검색 스팬의 출력으로만 사용하세요. |
| prompt | [Prompt](#prompt) | LLM 입력에 사용된 템플릿 및 변수를 포함하는 구조화된 프롬프트 메타데이터입니다. LLM 스팬의 입력 IO에만 사용해야 합니다. |
| embedding | [float] | 임베딩 값 목록입니다. |
| parameters | Dict[key (string), value] | 입력 또는 출력에 대한 추가 파라미터입니다. |


**참고**: LLM 스팬에 `input.messages`만 설정된 경우, Datadog은 `input.messages`에서 `input.value`를 추론하고 다음 추론 논리를 사용합니다.

1. `role=user`가 포함된 메시지가 있으면 마지막 메시지의 콘텐츠가 `input.value`로 사용됩니다.
1. `user` 역할 메시지가 없으면 모든 메시지의 콘텐츠 필드를 역할에 관계없이 연결하여 `input.value`를 추론합니다.

#### 메시지 {#message}

| 필드                | 유형   | 설명              |
|----------------------|--------|--------------------------|
| content [*필수*] | string | 메시지 본문입니다. |
| role                 | string | 엔터티의 역할입니다.  |
| tool_calls | [[ToolCall](#toolcall)] | 이 메시지에서 수행된 도구 호출 목록입니다. |
| tool_results | [[ToolResult](#toolresult)] | 이 메시지의 도구 실행 결과 목록입니다. |
| audio_parts | [[AudioPart](#audiopart)] | 이 메시지에 첨부된 오디오 세그먼트 목록입니다. 멀티모달(음성) LLM 스팬에 사용합니다. |
| image_parts | [[ImagePart](#imagepart)] | 이 메시지에 첨부된 이미지 세그먼트 목록입니다. 멀티모달(시각) LLM 스팬에 사용합니다. |

#### 문서 {#document}
| 필드                | 유형   | 설명              |
|----------------------|--------|--------------------------|
| text | string | 문서의 텍스트입니다. |
| name    | string | 문서의 이름입니다.  |
| score | float | 이 문서와 관련된 점수입니다. |
| id    | string | 이 문서의 ID입니다.  |
| ranking | integer | 이 문서의 순위입니다. |
| metadata | Dict[key (string), value] | 이 문서에 대한 추가 메타데이터입니다. |

#### ToolCall {#toolcall}

| 필드 | 유형 | 설명 |
|-------|------|-------------|
| name | string | 호출되는 도구의 이름입니다. |
| arguments | Dict[key (string), value] | 도구에 전달된 인수입니다. |
| tool_id | string | 이 도구 호출에 대한 고유 식별자입니다. |
| type | string | 도구 호출 유형입니다. |

#### ToolResult {#toolresult}

| 필드 | 유형 | 설명 |
|-------|------|-------------|
| name | string | 호출된 도구의 이름입니다. |
| result | string | 도구에서 반환된 결과입니다. |
| tool_id | string | 해당 도구 호출과 일치하는 고유 식별자입니다. |
| type | string | 도구 결과의 유형입니다. |

#### AudioPart {#audiopart}

메시지의 오디오 세그먼트입니다. `content` 또는 `attachment_key`를 제공하세요.

| 필드 | 유형 | 설명 |
|-------|------|-------------|
| mime_type [*필수*] | string | `audio/wav` 또는 `audio/pcm`과 같은 오디오 미디어 유형입니다. |
| content | string | 메시지에 인라인으로 포함된 base64 인코딩 오디오입니다. |
| attachment_key | string | 인라인 `content` 대신 스팬 페이로드 외부에 저장된 오디오에 대한 참조입니다. |

#### ImagePart {#imagepart}

메시지의 이미지입니다. `content` 또는 `attachment_key`를 제공하세요.

| 필드 | 유형 | 설명 |
|-------|------|-------------|
| mime_type [*필수*] | string | `image/png` 또는 `image/jpeg`와 같은 이미지 미디어 유형입니다. |
| content | string | 메시지에 인라인으로 포함된 base64 인코딩 이미지입니다. |
| attachment_key | string | 인라인 `content` 대신 스팬 페이로드 외부에 저장된 이미지에 대한 참조입니다. |

#### ToolDefinition {#tooldefinition}

| 필드 | 유형 | 설명 |
|-------|------|-------------|
| name | string | 도구의 이름입니다. |
| description | string | 도구가 수행하는 작업에 대한 설명입니다. |
| schema | Dict[key (string), value] | 도구의 파라미터를 정의하는 스키마입니다. |

#### SpanField {#spanfield}

| 필드 | 유형 | 설명 |
|-------|------|-------------|
| kind | string | 스팬 필드의 종류입니다. |

#### 프롬프트 {#prompt}

<div class="alert alert-info">Agent Observability는 <code>template</code> 또는 <code>chat_template</code> 값이 업데이트될 때 템플릿의 새 버전을 등록합니다. 호출 간에 입력이 변경될 것으로 예상되는 경우, 동적 부분을 변수로 추출하세요.</div>

{{< tabs >}}
{{% tab "모델" %}}
| 필드                | 유형   | 설명              |
|----------------------|--------|--------------------------|
| id    | string | 이 프롬프트 템플릿의 논리적 식별자입니다. `ml_app`마다 고유해야 합니다.  |
| name | string | 프롬프트의 사람이 읽을 수 있는 이름입니다. |
| version | string | 프롬프트의 버전 태그입니다(예: "1.0.0"). 버전이 제공되지 않으면 Agent Observability는 템플릿 콘텐츠의 해시를 계산하여 버전을 자동으로 생성합니다. |
| template | string | 단일 문자열 템플릿 형식입니다. 자리 표시자 구문을 사용하세요(예: `{{variable_name}}`) to embed variables. This should not be set with `chat_template`. |
| chat_template | [[Message]](#message) | Multi-message template form. Use placeholder syntax (like `{{variable_name}}`) to embed variables in message content. This should not be set with `template`). |
| variables | Dict[key (string), string] | 템플릿을 렌더링하는 데 사용되는 변수입니다. 키는 템플릿의 자리 표시자 이름에 해당합니다. |
| query_variable_keys | [string] | 사용자 쿼리를 포함하는 변수 키입니다. 환각 탐지에 사용됩니다. |
| context_variable_keys | [string] | 실제/컨텍스트 콘텐츠를 포함하는 변수 키입니다. 환각 탐지에 사용됩니다. |
| tags | Dict[key (string), string] | 프롬프트 실행에 첨부할 태그입니다. |

{{% /tab %}}
{{% tab "예시" %}}
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

#### Meta {#meta}
| 필드       | 유형              | 설명  |
|-------------|-------------------|--------------|
| kind [*필수*]    | string | [스팬 종류][2]는 `"agent"`, `"workflow"`, `"llm"`, `"tool"`, `"task"`, `"embedding"` 또는 `"retrieval"`입니다.      |
| error       | [Error](#error)             | 스팬에 대한 오류 정보입니다.              |
| input       | [IO](#io)                | 스팬의 입력 정보입니다.               |
| output      | [IO](#io)                | 스팬의 출력 정보입니다.              |
| metadata                 | Dict[key (string), value](값은 float, bool 또는 string) | 입력 또는 출력과 관련 없는 스팬에 대한 데이터입니다. 예를 들어, LLM 스팬에 대해 `temperature` 및 `max_tokens`를 전달할 수 있습니다. |
| model_name | string | LLM 스팬에 사용된 모델의 이름입니다. |
| model_provider | string | LLM 스팬에 사용된 모델의 제공업체입니다. |
| model_version | string | LLM 스팬에 사용된 모델의 버전입니다. |
| embedding_for_prompt_idx | integer | 임베딩이 계산된 프롬프트 인덱스입니다. |
| span | [SpanField](#spanfield) | 스팬 필드 정보입니다. |
| tool_definitions | [[ToolDefinition](#tooldefinition)] | 사용 가능한 도구 정의 목록입니다. |
| expected_output | [IO](#io) | 예상 출력 정보입니다. |
| intent | string | 스팬의 인텐트입니다. |

#### 메트릭 {#metrics}

스팬에 대해 수집할 메트릭의 딕셔너리입니다. 키는 메트릭 이름(문자열)이고 값은 메트릭 값(float64 포인터)입니다. 일반적인 메트릭은 다음과 같습니다.
- `input_tokens` - 입력 토큰 수(LLM 스팬)
- `output_tokens` - 출력 토큰 수(LLM 스팬)
- `total_tokens` - 총 토큰 수(LLM 스팬)
- `non_cached_input_tokens` - 캐시되지 않은 입력 토큰 수(LLM 스팬)
- `cache_read_input_tokens` - 캐시 읽기 입력 토큰 수(LLM 스팬)
- `cache_write_input_tokens` - 캐시 쓰기 입력 토큰 수(LLM 스팬)
- `reasoning_output_tokens` - 추론 토큰 수(LLM 스팬)
- `time_to_first_token` - 첫 번째 출력 토큰까지 소요된 시간(초)(스트리밍 LLM, 루트 스팬)
- `time_per_output_token` - 출력 토큰당 소요된 시간(초)(스트리밍 LLM, 루트 스팬)
- `input_cost` - 입력 비용(달러)(LLM 및 임베딩 스팬)
- `output_cost` - 출력 비용(달러)(LLM 스팬)
- `total_cost` - 총 비용(달러)(LLM 스팬)
- `non_cached_input_cost` - 캐시되지 않은 입력 비용(달러)(LLM 스팬)
- `cache_read_input_cost` - 캐시 읽기 입력 비용(달러)(LLM 스팬)
- `cache_write_input_cost` - 캐시 쓰기 입력 비용(달러)(LLM 스팬)
- `reasoning_output_cost` - 추론 출력 비용(달러)(LLM 스팬)

유형: `Dict[key (string), float64]`

#### 스팬 {#span}

| 필드       | 유형              | 설명         |
|-------------|-------------------|---------------------|
| name [*필수*]       | string            | 스팬의 이름입니다.          |
| span_id [*필수*]     | string            | 스팬에 고유한 ID입니다.       |
| trace_id  [*필수*]   | string            | 동일한 트레이스 내의 모든 스팬이 공유하는 고유 ID입니다.     |
| parent_id  [*필수*]    | string | 스팬의 직접 상위 ID입니다. 스팬이 루트 스팬인 경우 `parent_id`는 `undefined`여야 합니다. |
| start_ns [*필수*]     | uint64            | 나노초 단위의 스팬 시작 시간입니다.     |
| duration  [*필수*]     | float64           | 나노초 단위의 스팬 지속 시간입니다.          |
| meta [*필수*]         | [Meta](#meta)              | 스팬과 관련된 핵심 콘텐츠입니다.       |
| status      | string            | 오류 상태(`"ok"` 또는 `"error"`)입니다. 기본값은 `"ok"`입니다.      |
| apm_trace_id | string      | 연관된 APM 트레이스의 ID입니다. 기본값은 `trace_id` 필드와 일치하도록 설정됩니다.   |
| metrics     | Dict[key (string), float64]           | 수집할 Datadog 메트릭입니다. 공통 메트릭 이름은 [메트릭](#metrics)을 참조하세요.         |
| session_id  | string     | 스팬의 `session_id`입니다. 최상위 수준 `session_id` 필드를 재정의합니다.    |
| feedback_join_key | string | 피드백을 이 스팬에 연결하는 데 사용되는 고객 정의 키입니다. 최상위 수준 `feedback_join_key` 필드를 재정의합니다. 자세한 내용은 [최종 사용자 피드백][4]을 참조하세요. |
| tags        | [[Tag](#tag)] | 이 특정 스팬에 적용할 태그 목록입니다.       |
| service | string | 서비스 이름입니다. |
| ml_app | string | 이 스팬에 대한 LLM 애플리케이션 이름입니다. 최상위 수준 `ml_app` 필드를 재정의합니다. |

#### SpansRequestData {#spansrequestdata}
| 필드      | 유형                          | 설명                                |
|------------|-------------------------------|--------------------------------------------|
| type [*필수*]        | string                        | 요청 식별자입니다. `span`으로 설정합니다. |
| attributes [*필수*]  | [SpansPayload](#spanspayload) | 요청 본문입니다.  |

#### SpansPayload {#spanspayload}
| 필드    | 유형                | 설명  |
|----------|---------------------|--------------|
| ml_app [*필수*] | string              | LLM 애플리케이션의 이름입니다. [애플리케이션 이름 지정 가이드라인](#application-naming-guidelines)을 참조하세요.     |
| spans [*필수*]  | [[Span](#span)] | 스팬 목록입니다.           |
| tags                | [[Tag](#tag)]   | 각 스팬에 적용할 최상위 수준 태그 목록입니다.        |
| session_id          | string              | 스팬 목록이 속한 세션입니다. 개별 스팬에서도 재정의하거나 설정할 수 있습니다. |
| feedback_join_key   | string              | 피드백을 페이로드의 스팬에 연결하는 데 사용되는 고객 정의 키입니다. 개별 스팬에서도 재정의하거나 설정할 수 있습니다. 자세한 내용은 [최종 사용자 피드백][4]을 참조하세요. |

#### 태그 {#tag}

태그는 문자열 목록 형식이어야 합니다(예: `["user_handle:dog@gmail.com", "app_version:1.0.0"]`). 태그는 스팬을 둘러싼 컨텍스트 정보를 저장하기 위한 것입니다.

태그에 대한 자세한 내용은 [태그 시작하기][3]를 참조하세요.

#### 애플리케이션 이름 지정 가이드라인 {#application-naming-guidelines}

애플리케이션 이름(`DD_LLMOBS_ML_APP`의 값)은 소문자 유니코드 문자열이어야 합니다. 다음에 나열된 문자를 포함할 수 있습니다.

- 영숫자
- 밑줄
- 하이픈
- 콜론
- 점
- 슬래시

이름은 최대 193자까지 가능하며 연속된 밑줄이나 끝부분 밑줄을 포함할 수 없습니다.

## 평가 API {#evaluations-api}

<div class="alert alert-info">사용자 지정 평가자 구축에 대한 포괄적인 예시와 지침은 <a href="/llm_observability/guide/evaluation_developer_guide/">평가 개발자 가이드</a>를 참조하세요.</div>

이 엔드포인트를 사용하여 평가 및 최종 사용자 피드백을 Datadog으로 전송하세요. 평가는 스팬, 트레이스 또는 세션과 연결될 수 있습니다. 최종 사용자 피드백은 스팬, 트레이스, 세션 또는 고객이 정의한 피드백 조인 키와 연결될 수 있습니다.

엔드포인트
: `https://api.{{< region-param key="dd_site" code="true" >}}/api/intake/llm-obs/v2/eval-metric`

메서드
: `POST`

`eval_scope` 필드를 사용하여 평가의 세분성을 설정하세요.

- **`span`**(기본값): 평가가 특정 스팬과 연결됩니다. `join_on`을 사용하여 태그 키-값 쌍 또는 스팬 ID와 트레이스 ID 조합으로 대상 스팬을 식별하세요.
- **`trace`**: 평가가 전체 트레이스와 연결됩니다. `join_on`를 사용하여 트레이스의 루트 스팬을 식별하세요.
- **`session`**: 평가가 세션과 연결됩니다. `join_on` 대신 `session_id`를 제공하세요.

피드백을 제출하려면 `event_kind`을 `feedback`으로 설정하세요. 피드백 이벤트에는 `submitter.id`가 포함되어야 하며, `join_on`은 생략하고 `span_id`, `trace_id`, `session_id`, `feedback_join_key` 중 정확히 하나의 대상 필드를 제공해야 합니다. `eval_scope`가 생략되어 있으면 Datadog은 대상 필드에서 이를 추론합니다.

피드백이 단일 스팬, 트레이스 또는 세션이 아닌 인시던트 ID, 보고서 ID, 작업 ID 또는 릴리스 검사 ID와 같은 외부 엔터티에 적용되는 경우 `feedback_join_key`를 사용하세요. 피드백이 관련 텔레메트리와 함께 표시되도록 하려면 [스팬 API](#spans-api)를 사용하여 제출하거나 [스팬 강화하기][5]를 통해 `feedback_join_key:incident-1234` 태그를 추가할 때 관련 스팬에 동일한 `feedback_join_key`를 설정하세요.

피드백으로 대시보드 위젯을 만들려면 평가와 동일한 방식으로 위젯을 만들고 `@event_kind:feedback` 필터를 추가하세요.

<div class="alert alert-info">피드백별로 스팬, 트레이스 또는 세션을 필터링하는 기능은 지원되지 않습니다. 예를 들어, 아직 불만족 피드백이 있는 트레이스만 필터링할 수는 없습니다. 대신 <code>@event_kind:feedback</code> 으로 범위가 지정된 대시보드를 사용하세요.</div>

### 요청 {#request-1}

#### 헤더(필수) {#headers-required-1}
- `DD-API-KEY=<YOUR_DATADOG_API_KEY>`
- `Content-Type="application/json"`

#### 본문 데이터(필수) {#body-data-required-1}

{{< tabs >}}
{{% tab "모델" %}}
| 필드 | 유형 | 설명                  |
|-------|------------------------------|------|
| data [*필수*]  | [EvalMetricsRequestData](#evalmetricsrequestdata) | 요청 본문의 진입점입니다. |
{{% /tab %}}

{{% tab "예시" %}}
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

### 응답 {#response-1}

{{< tabs >}}
{{% tab "모델" %}}
| 필드   | 유형                        | 설명                              | 보장됨 |
|---------|-----------------------------|------------------------------------------|------------|
| ID      | string                      | 제출 시 생성된 응답 UUID입니다. | 예        |
| metrics | [[EvalMetric](#evalmetric)] | 평가 또는 피드백 이벤트 목록입니다. | 예        |
{{% /tab %}}

{{% tab "예시" %}}
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

### API 표준 {#api-standards-1}

#### 속성 {#attributes}

| 필드   | 유형         | 설명                                         |
|---------|--------------|-----------------------------------------------------|
| metrics [*필수*] | [[EvalMetric](#evalmetric)] | 평가 또는 피드백 이벤트 목록입니다. |
| tags        | [[Tag](#tag)] | 페이로드의 모든 평가 또는 피드백 이벤트에 적용할 태그 목록입니다. |

#### EvalMetric {#evalmetric}

| 필드                                                              | 유형                | 설명                                                                                            |
|--------------------------------------------------------------------|---------------------|--------------------------------------------------------------------------------------------------------|
| ID                                                                 | string              | 평가 메트릭 UUID(제출 시 생성됨)입니다.                                                    |
| event_kind                                                         | string              | 이벤트의 종류입니다. 허용되는 값은 `"evaluation"` 및 `"feedback"`입니다. 생략 시 `"evaluation"`으로 기본 설정됩니다. |
| eval_scope                                                         | string              | 이벤트의 세분성: `"span"`(평가의 기본값), `"trace"`, `"session"` 또는 `feedback_join_key`에 의해 타겟팅된 피드백의 경우 `"external"`입니다. 피드백의 경우, 이 항목은 생략할 수 있으며 대상 필드에서 추론됩니다. |
| join_on [*스팬 및 트레이스 범위 평가에 필수*]          | [[JoinOn](#joinon)] | 평가가 스팬 또는 트레이스에 결합되는 방식입니다. `eval_scope`가 `"span"` 또는 `"trace"`인 경우 평가에 필수입니다. 피드백 및 세션 평가에는 없어야 합니다. |
| span_id                                                            | string              | 피드백의 경우, 피드백이 연결된 스팬의 ID입니다. 피드백 대상 필드 중 하나로 사용하세요. |
| trace_id                                                           | string              | 피드백의 경우, 피드백이 연결된 트레이스의 ID입니다. 피드백 대상 필드 중 하나로 사용하세요. |
| session_id [*세션 범위 평가에 필수*]              | string              | 이벤트가 연결된 세션 ID입니다. `eval_scope`가 `"session"`인 경우 평가에 필수입니다. 피드백의 경우, 피드백 대상 필드 중 하나로 사용하세요. 피드백이 아닌 경우, `eval_scope`가 `"span"` 또는 `"trace"`이면 이 필드는 없어야 합니다. |
| feedback_join_key                                                  | string              | 피드백의 경우, 단일 스팬, 트레이스 또는 세션 대신 외부 엔터티에 적용되는 피드백에 대한 고객 정의 키입니다. 평가의 경우 없어야 합니다. |
| submitter [*피드백에 필수*]                                | [Submitter](#submitter) | 피드백을 제출한 사용자, 에이전트 또는 기타 엔터티입니다. |
| timestamp_ms [*필수*]                                          | int64               | 요청이 전송된 시간을 나타내는 밀리초 단위의 UTC UNIX 타임스탬프입니다.                       |
| ml_app [*필수*]                                                | string              | LLM 애플리케이션의 이름입니다. [애플리케이션 이름 지정 가이드라인](#application-naming-guidelines)을 참조하세요. |
| metric_type [*필수*]                                           | string              | 값 유형(`"categorical"`, `"score"`, `"boolean"`, `"json"` 또는 `"text"`)입니다. `"text"` 유형은 피드백 이벤트에 대해서만 지원됩니다. |
| label [*필수*]                                                 | string              | 제공된 평가 또는 피드백에 대한 고유 이름이나 라벨입니다.                                      |
| categorical_value [*metric_type이 "categorical"인 경우 필수*] | string              | 카테고리 값을 나타내는 문자열입니다. `status`가 `"WARN"` 또는 `"ERROR"`인 경우에는 필요하지 않습니다. |
| score_value [*metric_type이 "score"인 경우 필수*]             | number              | 점수 값입니다. `status`가 `"WARN"` 또는 `"ERROR"`인 경우에는 필요하지 않습니다. |
| boolean_value [*metric_type이 "boolean"인 경우 필수*]         | boolean             | 부울 값입니다. `status`가 `"WARN"` 또는 `"ERROR"`인 경우에는 필요하지 않습니다. |
| json_value [*metric_type이 "json"인 경우 필수*]               | Dict[key (string), value] | JSON 객체 값입니다. `status`가 `"WARN"` 또는 `"ERROR"`인 경우에는 필요하지 않습니다. |
| text_value [*metric_type이 "text"인 경우 필수*]               | string              | 텍스트 값입니다. 피드백 이벤트에 대해서만 지원되며, 자유 텍스트 피드백에 유용합니다.          |
| status                                                             | string              | 평가자 실행 결과입니다. 허용되는 값은 `"OK"`, `"WARN"` 및 `"ERROR"`입니다. `"WARN"` 또는 `"ERROR"`인 경우, 평가자가 건너뛰었거나 실패했으며, 유형별 값 필드(`categorical_value`, `score_value` 등)는 필요하지 않습니다. |
| error                                                              | [EvalMetricError](#evalmetricerror) | 구조화된 오류 세부 정보입니다. `status`가 `"WARN"` 또는 `"ERROR"`인 경우 필수입니다. |
| assessment                                                         | string              | 이 평가에 대한 판단입니다. 허용되는 값은 `pass` 및 `fail`입니다.                               |
| reasoning                                                          | string              | 평가 결과에 대한 설명 텍스트입니다.                                                           |
| tags                                                               | [[Tag](#tag)]       | 이 특정 평가 메트릭에 적용할 태그 목록입니다.                                          |

피드백 이벤트의 경우 `span_id`, `trace_id`, `session_id`, `feedback_join_key` 중 정확히 하나를 제공하세요. `eval_scope`를 제공하는 경우 대상 필드와 일치해야 합니다. `span_id`는 `"span"`에 매핑되고, `trace_id`는 `"trace"`에 매핑되며, `session_id`는 `"session"`에 매핑되고, `feedback_join_key`는 `"external"`에 매핑됩니다.

#### 제출자 {#submitter}

| 필드 | 유형 | 설명 |
|-------|------|-------------|
| id [*필수*] | string | 피드백을 제출한 사용자, 에이전트 또는 기타 엔터티에 대한 식별자입니다. |
| type | string | 제출자 범주입니다. 권장 값은 `user` 및 `agent`입니다. |

#### JoinOn {#joinon}

| 필드      | 유형            | 설명  |
|------------|-----------------|--------------|
| span | [[SpanContext](#spancontext)] | 스팬 ID와 트레이스 ID를 사용하여 이 평가와 관련된 스팬을 고유하게 식별합니다. |
| span | [[TagContext](#tagcontext)] | 태그 키-값 쌍을 사용하여 이 평가와 관련된 스팬을 고유하게 식별합니다. |

#### SpanContext {#spancontext}

| 필드      | 유형            | 설명  |
|------------|-----------------|--------------|
| span_id [*필수*] | string | 이 평가와 관련된 스팬의 스팬 ID입니다. 십진수 문자열이어야 합니다(예: `"20245611112024561111"`). 계측에서 16진수 스팬 ID(예: OpenTelemetry)를 생성하는 경우, 제출하기 전에 10진수로 변환하세요. |
| trace_id [*필수*] | string | 이 평가와 연결된 스팬의 트레이스 ID입니다. 10진수 문자열(예: `"13932955089405749200"`)이어야 하며, 128비트 트레이스 ID의 경우 32자 소문자 16진수 문자열도 사용할 수 있습니다. |

#### TagContext {#tagcontext}

| 필드      | 유형            | 설명  |
|------------|-----------------|--------------|
| key [*필수*] | string | 태그 키 이름입니다. 스팬에 태그를 설정할 때 사용한 키와 동일해야 합니다.  |
| value [*필수*] | string | 태그 값입니다. 이 값은 지정된 태그 키/값 쌍이 있는 스팬 하나와 정확히 일치해야 합니다. |


#### EvalMetricsRequestData {#evalmetricsrequestdata}

| 필드      | 유형            | 설명  |
|------------|-----------------|--------------|
| type [*필수*]      | string | 요청 식별자입니다. `evaluation_metric`으로 설정합니다. |
| attributes [*필수*] | [[Attributes](#attributes)] | 요청 본문입니다. |

#### EvalMetricError {#evalmetricerror}

| 필드   | 유형   | 설명                                                |
|---------|--------|------------------------------------------------------------|
| type    | string | 오류 또는 예외 유형입니다(예: `"ValueError"`). |
| message | string | 사람이 읽을 수 있는 오류 설명입니다.                 |
| stack   | string | 사용 가능한 경우 스택 트레이스입니다.                             |

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/llm_observability/setup/sdk/
[2]: /ko/llm_observability/quickstart/terms/
[3]: /ko/getting_started/tagging/
[4]: /ko/llm_observability/configure/evaluations/end_user_feedback
[5]: /ko/llm_observability/instrument/sdk/?tab=python#enriching-spans