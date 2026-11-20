---
aliases:
- /ko/llm_observability/instrumentation/
- /ko/llm_observability/instrument/agentic/
- /ko/llm_observability/instrumentation/agentic/
description: Datadog SDK, OpenTelemetry 또는 HTTP API를 사용하여 LLM 애플리케이션을 계측하고 Agent Observability에서
  프롬프트와 트레이스를 추적하세요.
further_reading:
- link: /llm_observability/instrument/auto_instrumentation/
  tag: 설명서
  text: Agent Observability를 위한 자동 계측
- link: https://www.datadoghq.com/blog/llm-otel-semantic-convention
  tag: 블로그
  text: OpenTelemetry GenAI 시맨틱 규칙을 기본적으로 지원하는 Datadog LLM Observability
- link: https://learn.datadoghq.com/courses/llm-obs-getting-started
  tag: 학습 센터
  text: Agent Observability 시작하기
title: Agent Observability 계측
---
## 개요 {#overview}

LLM 애플리케이션이나 에이전트를 계측하여 Agent Observability에서 트레이스, 프롬프트, 토큰 사용량, 지연 시간 및 오류를 수집하세요. 지원되는 공급자 및 프레임워크에는 자동 계측을 사용하고, 다른 작업에는 사용자 지정 스팬을 추가하세요. 이 단계를 직접 수행하거나 이 페이지를 코딩 에이전트에게 제공할 수 있습니다.

{{< skill-callout
    title="코딩 에이전트를 사용하여 Agent Observability 설정"
    text="Copy this prompt into your AI coding agent to use the `dd-orchestrator` skill for guided setup of Python and Node.js applications."
    action_name="copy_dd_orchestrator_agent_observability_setup_prompt"
    lang="text" >}}
https://github.com/datadog-labs/agent-skills/blob/main/dd-orchestrator/SKILL.md 스킬을 사용하여 내 프로젝트에 Datadog Agent Observability를 계측하세요.
{{< /skill-callout >}}

{{< agent-only >}}
이 페이지와 연결된 설정 가이드 전반에서 다음 지침을 따르세요.

1. Agent Observability 및 Datadog 트레이서 관련 코드만 추가하세요. 수동 계측이 필요한 경우를 제외하고는 관련 없는 애플리케이션 코드를 수정하지 마세요.
2. 모노레포나 여러 서비스가 있는 프로젝트의 경우, 편집하기 전에 계측할 서비스나 하위 프로젝트를 확인하세요.
3. 설치된 Datadog SDK를 확인하세요. 필요한 계측을 지원하는 경우 이를 재사용하세요. 업데이트가 필요한 경우 그 이유를 설명하고 종속성을 변경하기 전에 사용자에게 승인을 요청하세요. 선택 사항인 Prompt Management 기능에만 필요한 업데이트는 사용자가 해당 통합을 선택할 때까지 보류합니다.
4. 애플리케이션의 공급자, 모델, 프롬프트 콘텐츠, 동작, 패키지 관리자 및 시크릿 관리 워크플로를 유지하세요.
5. 선택 사항인 호스팅형 Prompt Management를 제안하기 전에 Prompt Tracking 및 요청된 컨텍스트 공유를 포함한 계측을 완료하세요. 계측, 컨텍스트 공유 또는 검사 권장 사항을 제공하는 데 Prompt Management가 필수는 아닙니다.
{{< /agent-only >}}

## 전제 조건 {#prerequisites}

- 데이터를 Datadog으로 직접 전송하기 위한 [Datadog API key][8]를 확보하세요.
- 계정과 연결된 [Datadog 사이트][9]를 선택하세요.

{{< agent-only >}}
설정 가이드를 선택하기 전에 애플리케이션을 검사하여 언어, 프레임워크, LLM 공급자 및 시작 명령을 확인하세요. Datadog Agent 없이 설정하는 경우 기존 시크릿 관리 워크플로를 통해 사용자가 제공한 API 키를 사용하세요. 사용자가 키를 제공하지 않았고 제공하기를 원하지 않는 경우, 코드 변경을 계속 진행하세요. 최종 응답에서 데이터 전송에 키가 필요하다고 설명하고 키를 설정할 위치를 안내하세요. 해당 키가 없는 경우 데이터 전송에 성공했다고 단정하지 마세요.
{{< /agent-only >}}

## 환경 변수 구성 {#configure-environment-variables}

애플리케이션이 시작되기 전에 환경 변수를 설정하거나 SDK가 초기화되기 전에 로드하세요.

{{< agent-only >}}
애플리케이션의 기존 구성 또는 시크릿 관리 워크플로를 사용하세요. 로컬 개발의 경우 기존 `.env` 파일일 수 있습니다. 소스 코드에 자격 증명을 포함하지 마세요.
{{< /agent-only >}}

다음 예시는 Datadog Agent 없이 Datadog으로 직접 데이터를 보냅니다. 자리 표시자를 바꾸고 이러한 값을 애플리케이션 프로세스에 로드하세요.

```text
DD_API_KEY=<DATADOG_API_KEY>
DD_LLMOBS_ENABLED=true
DD_LLMOBS_AGENTLESS_ENABLED=true
DD_LLMOBS_ML_APP=<APPLICATION_NAME>
DD_SITE=<DATADOG_SITE>
```

애플리케이션이 Datadog Agent를 통해 데이터를 보내는 경우 대신 다음 환경 변수를 사용하세요. Datadog Agent의 URL을 `DD_TRACE_AGENT_URL`에 설정하세요.

```text
DD_TRACE_AGENT_URL=<DATADOG_AGENT_URL>
DD_LLMOBS_ENABLED=true
DD_LLMOBS_AGENTLESS_ENABLED=false
DD_LLMOBS_ML_APP=<APPLICATION_NAME>
```

### Agent Observability 애플리케이션 이름 {#agent-observability-application-name}

`DD_LLMOBS_ML_APP`을 애플리케이션의 트레이스 및 스팬을 그룹화하는 데 사용되는 이름으로 설정하세요. 기존 애플리케이션 이름을 유지하거나 서비스, 리포지토리 또는 프로젝트를 기반으로 이름을 선택하세요. [애플리케이션 이름 지정 가이드라인][10]을 참조하세요.

{{< agent-only >}}
사용자가 애플리케이션 이름 또는 `DD_LLMOBS_ML_APP` 값을 제공한 경우 이를 사용하세요. 그렇지 않으면 기존 이름을 유지하거나 폴더, 리포지토리 또는 프로젝트에서 적절한 이름을 유추하세요. 사용한 이름을 보고하세요.
{{< /agent-only >}}

### Datadog 사이트 {#datadog-site}

`DD_SITE`를 API 키와 연결된 사이트로 설정하세요. 기본값은 `datadoghq.com`입니다. 다른 값은 [Datadog 사이트][9]를 참조하세요.

{{< agent-only >}}
제공된 `DD_SITE` 값을 사용하세요. 값이 제공되거나 설정되지 않은 경우 사용자에게 `datadoghq.com` 값이 사용된다고 알리세요. 로컬 개발 이외의 환경에 배포하는 경우 사용자가 시작 전에 설정해야 하는 환경 변수를 나열하세요.
{{< /agent-only >}}

## 애플리케이션 계측 {#instrument-the-application}

애플리케이션에 맞는 접근 방식을 선택하세요.

| 접근 방식 | 사용 용도 |
|----------|------------|
| [자동 계측][1] | Python, Node.js 및 Java에서 지원되는 LLM 공급자 및 프레임워크. |
| [SDK 계측][2] | 사용자 지정 스팬, 워크플로, 평가 및 세션 추적. Go 지원은 실험적이며 수동 계측만 제공합니다. |
| [OpenTelemetry 계측][4] | 지원되는 OpenTelemetry 스팬을 내보내는 애플리케이션 및 프레임워크. |
| [HTTP API 계측][3] | HTTP를 통해 스팬 및 평가를 직접 제출하는 사용자 지정 통합. |

자동 계측은 입력 프롬프트, 출력 응답, 사용 가능한 경우 토큰 사용량과 비용, 지연 시간, 오류, 모델 파라미터 및 프레임워크 메타데이터를 캡처합니다. 지원되는 LLM 호출은 수동 스팬 생성이 필요하지 않습니다.

사용 중인 언어의 SDK를 설치하고 초기화하려면 [자동 계측 설정][11]을 따르세요. 사용자 지정 작업의 경우 [SDK 참조][2]를 사용하여 스팬을 추가하세요.

HTTP를 통해 직접 전송하려면 [Spans API][12] 및 [Evaluations API][13]를 사용하세요.

{{< agent-only >}}
Python, Node.js 또는 Java의 경우 [자동 계측 가이드](/llm_observability/instrument/auto_instrumentation.md#set-up-automatic-instrumentation)의 언어별 설정을 따르세요. Next.js 애플리케이션의 경우 일반적인 Node.js 설정 대신 [Next.js 가이드](/llm_observability/guide/nextjs_guide.md)를 따르세요. OpenTelemetry 애플리케이션의 경우 [OpenTelemetry 가이드](/llm_observability/instrument/otel_instrumentation.md)를 따르세요. 설정 후 여기로 돌아와 프롬프트를 계측하고 나머지 단계를 완료하세요.
{{< /agent-only >}}

## 프롬프트 계측 {#instrument-prompts}

프롬프트 계측 지침은 [Configure Prompt Management][7]를 참조하세요. 기존 관리형 프롬프트를 사용하거나 로컬 프롬프트를 승격할 수 있습니다. 로컬 프롬프트를 대체용으로 유지하세요.

[프롬프트 사용량 추적][6]에 따라 자동 추적과 명시적 주석 중 하나를 선택하세요.

{{< agent-only >}}
계측 결과를 보고한 후 다음 단계를 따르세요.

- 사용자가 Datadog 관리형 프롬프트 ID를 제공한 경우, [Prompt Management 가이드](/llm_observability/configure/prompt_management.md)를 따릅니다. 다시 활성화할지 질문하지 마세요.
- 그렇지 않은 경우, Python 또는 Node.js 애플리케이션의 로컬 프롬프트를 식별하고 사용자에게 Datadog에서 해당 프롬프트를 관리할지 질문합니다. 사용자가 동의하면 가이드에 따라 선택한 프롬프트를 승격하고 런타임 검색을 통합합니다.
- 사용자가 거절하거나 응답하지 않으면 계측된 로컬 프롬프트를 그대로 유지하세요.
- Prompt Management에 SDK 업데이트가 필요한 경우, 그 이유를 설명하고 종속성을 변경하기 전에 사용자에게 승인을 요청하세요. 이 선택적 업데이트로 핵심 계측이나 컨텍스트 공유가 지연되어서는 안 됩니다.
{{< /agent-only >}}

{{< agent-only >}}
## 검사 권장 사항을 위한 에이전트 컨텍스트 공유 {#share-agent-context-for-check-recommendations}

초기 Datadog 온보딩 프롬프트에 에이전트 컨텍스트 업로드 URL, 업로드 토큰 및 스키마 버전이 포함된 경우에만 이 단계를 완료하세요.

계측 후 다음 단계를 따르세요.

1. 에이전트의 목적, 도구, 명시적 행동 규칙 및 핸드오프 조건을 이해하는 데 필요한 리포지토리 파일만 검사합니다.
2. 인용된 프롬프트, 지침, 정책 또는 테스트에 의해 직접 지원되는 기대치만 포함합니다. 기대치당 하나의 원자적 행동을 기록하고, 에이전트 입력 또는 출력, 트레이스 컨텍스트, 도구 호출, 도구 결과 또는 해당 순서에서 관찰 가능한 측면으로 표현하며, 모호하거나 상충되는 규칙은 추측하기보다는 생략합니다.
3. 온보딩 프롬프트의 스키마 버전과 이 정확한 형태를 사용하여 제한된 JSON 요약을 작성합니다.

   ```json
   {
     "schema_version": "<schema-version-from-the-onboarding-prompt>",
     "context": {
       "agent_summary": "A short description of the agent",
       "capabilities": [
         {
           "name": "...",
           "description": "...",
           "source_reference_ids": ["source-1"]
         }
       ],
       "tools": [
         {
           "name": "...",
           "purpose": "...",
           "source_reference_ids": ["source-1"]
         }
       ],
       "behavioral_expectations": [
         {
           "id": "expectation-1",
           "behavior": "...",
           "applicability": "...",
           "failure": "...",
           "observable_signals": ["agent_input", "agent_output"],
           "source_reference_ids": ["source-1"]
         }
       ],
       "handoff_conditions": [
         {
           "id": "handoff-1",
           "condition": "...",
           "destination": "...",
           "observable_signals": ["agent_input", "agent_output"],
           "source_reference_ids": ["source-1"]
         }
       ],
       "source_references": [
         {
           "id": "source-1",
           "source_kind": "prompt",
           "path": "relative/path",
           "line_start": 1,
           "line_end": 10,
           "description": "Why this source supports the summary"
         }
       ]
     }
   }
   ```

   인코딩된 `context` 객체를 64KiB 이하로 유지하고 다음 수집 제한 사항을 적용합니다.

   - 최대 20개의 기능 및 30개의 도구.
   - 1~30개의 행동 기대치.
   - 최대 20개의 핸드오프 조건.
   - 1~60개의 소스 참조.

   각 기능, 도구, 행동 기대치 및 핸드오프 조건에 대해 1~10개의 고유한 소스 참조 ID를 사용합니다. 각 행동 기대치와 핸드오프 조건은 최소 하나의 `prompt`, `instruction`, `policy` 또는 `test` 소스를 인용해야 하며 1~6개의 고유한 관찰 가능한 신호를 포함해야 합니다.

   `agent_summary`를 1~1,000자 사이로 유지합니다. 이름과 핸드오프 대상을 1~120자 사이로 유지합니다. 설명, 목적, 행동, 적용 가능성 진술, 실패, 핸드오프 조건 및 소스 경로를 1~500자 사이로 유지합니다. 소스 참조 설명을 1~300자 사이로 유지합니다.

   모든 소스 참조, 행동 기대치 및 핸드오프 조건에 문자, 숫자, 하이픈 또는 밑줄만 포함하여 1~64자 사이의 ID를 부여합니다. 소스 참조 ID는 `source_references` 내에서 고유해야 합니다. 행동 기대치 및 핸드오프 조건 ID는 두 컬렉션 모두에서 고유해야 합니다. ID는 이 업로드에서만 유효하며 각 권장 검사가 증거를 인용할 수 있도록 합니다.

   `source_kind`는 `prompt`, `instruction`, `policy`, `test`, `tool_definition` 또는 `implementation`에서만 사용합니다. `observable_signals`는 `agent_input`, `agent_output`, `trace_context`, `tool_call`, `tool_result` 또는 `tool_order`에서만 사용합니다. `line_end`를 포함하는 경우 긍정적인 `line_start`도 포함하고 `line_end`를 `line_start`보다 크거나 같게 만듭니다.

4. 온보딩 프롬프트의 업로드 URL로 JSON을 한 번 보냅니다. `POST`를 사용하고 `Content-Type: application/json`을 설정하며 업로드 토큰은 `Authorization: Bearer <upload-token>` 헤더로만 전달합니다.

다음 보안 요구 사항을 따르세요.

- 업로드 토큰을 일회성 시크릿으로 취급합니다. 소스 파일, 구성, 셸 기록, 출력 또는 로그에 기록하지 않습니다.
- 구조화된 요약만 업로드합니다. 원시 소스 코드, 전체 프롬프트, 시크릿, 자격 증명, 환경 변수, 고객 데이터, 트레이스 콘텐츠 또는 임의의 메타데이터를 업로드하지 않습니다.
- 정규화된 리포지토리 상대 POSIX 소스 경로와 가장 작은 유용한 줄 범위를 사용합니다. 절대 경로, 백슬래시, 콜론, 정규화되지 않은 구분 기호, `.` 또는 `..` 경로 세그먼트를 사용하지 않습니다. 소스 참조는 증거를 식별하며, 그 내용을 복사해서는 안 됩니다.
- 업로드에 실패하면 계측을 계속하고 Datadog이 선택적 컨텍스트를 수신하지 못했음을 사용자에게 알립니다. 더 광범위한 데이터로 재시도하지 마세요.

{{< /agent-only >}}

## 트레이스 조회 {#view-traces}

애플리케이션을 실행하고 계측된 LLM 호출을 수행하세요. [Agent Observability][14]를 열고 애플리케이션을 선택하여 트레이스를 검사하세요.

애플리케이션 데이터에 직접 연결하려면 선택한 [Datadog 사이트][9]의 URL을 사용하고 애플리케이션 이름으로 필터링하세요.

```text
https://{{< region-param key="dd_full_site" >}}/llm/applications?query=@ml_app:<APPLICATION_NAME>
```

{{< agent-only >}}
계측 변경 사항, 남은 설정 요구 사항 및 애플리케이션 실행 방법을 보고하세요. 컨텍스트 공유가 요청된 경우, 업로드 성공 여부를 보고하세요. 검증하지 않은 상태에서 트레이스나 권장 사항을 사용할 수 있다고 주장하지 마세요.

제공되거나 유추한 애플리케이션 이름을 사용하여 애플리케이션으로 바로 연결되는 링크를 제공하세요. `DD_SITE`에서 애플리케이션 호스트를 확인하세요. `datadoghq.com`에는 `app.datadoghq.com`을, `datadoghq.eu`에는 `app.datadoghq.eu`를, `ddog-gov.com`에는 `app.ddog-gov.com`을 사용하고, 기타 지원되는 사이트에는 `DD_SITE` 값 자체를 사용하세요. 쿼리 값을 URL 인코딩하세요.
{{< /agent-only >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/llm_observability/instrument/auto_instrumentation/
[2]: /ko/llm_observability/instrument/sdk/
[3]: /ko/llm_observability/instrument/api/
[4]: /ko/llm_observability/instrument/otel_instrumentation/
[6]: /ko/llm_observability/configure/prompt_management/#track-prompt-usage
[7]: /ko/llm_observability/configure/prompt_management/
[8]: /ko/account_management/api-app-keys/#add-an-api-key-or-client-token
[9]: /ko/getting_started/site/
[10]: /ko/llm_observability/instrument/sdk/#application-naming-guidelines
[11]: /ko/llm_observability/instrument/auto_instrumentation/#set-up-automatic-instrumentation
[12]: /ko/llm_observability/instrument/api/?tab=model#spans-api
[13]: /ko/llm_observability/instrument/api/?tab=model#evaluations-api
[14]: https://app.datadoghq.com/llm/applications