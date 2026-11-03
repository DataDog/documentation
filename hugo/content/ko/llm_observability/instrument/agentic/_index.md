---
aliases:
- /ko/llm_observability/instrumentation/agentic/
title: 에이전틱 계측
---
## 가이드라인 {#guidelines}

**중요**: 다른 단계로 연결되는 하이퍼링크를 따라갈 때는 여기에 나열된 **모든** 가이드라인을 따르세요.

1. Datadog Agent Observability 및 Datadog 트레이서 관련 코드만 추가하세요. 수동 계측 목적이 아닌 경우, 관련 없는 코드는 수정하지 마세요.
2. 모노레포나 여러 서비스 또는 계측 대상이 있는 프로젝트에서 실행되는 경우, 어떤 서비스나 하위 프로젝트를 Agent Observability로 계측해야 하는지 사용자에게 확인하세요.
3. 설치된 Datadog SDK가 애플리케이션에 필요한 계측을 지원하는지 확인합니다. 지원한다면 해당 버전을 사용합니다. 계측에 SDK 업데이트가 필요한 경우 그 이유를 설명하고 종속성을 업데이트하기 전에 사용자에게 승인을 요청합니다. 선택 사항인 Prompt Management 기능에만 필요한 업데이트는 사용자가 해당 통합을 선택할 때까지 보류합니다.
4. 애플리케이션의 기존 공급자, 모델, 프롬프트 콘텐츠, 동작, 패키지 관리자 및 시크릿 관리 워크플로우를 유지합니다.

먼저 Prompt Tracking을 포함한 계측과 요청된 모든 컨텍스트 공유 작업을 완료합니다. 그런 다음 선택 사항인 호스팅형 Prompt Management를 제안합니다. 계측, 컨텍스트 공유 또는 검사 권장 사항을 제공하는 데 Prompt Management가 필수는 아닙니다.

## 전제 조건 {#pre-requisites}

1. Agent Observability 데이터를 Datadog으로 전송하려면 Datadog API 키가 필요합니다. API 키가 없으면 사용자는 Agent Observability 데이터를 수신할 수 없으므로, 이는 **필수 요구 사항**입니다. 사용자가 아직 API 키를 제공하지 않았고 제공하기를 원하지 않는 경우, 애플리케이션 계측을 계속 진행하되 마지막에 반드시 설정해야 한다는 점을 명시적으로 안내하고 설정할 수 있는 위치를 알려주세요.
2. 계측할 애플리케이션에서 사용 중인 프로그래밍 언어와 프레임워크를 확인하세요. 이렇게 해야 애플리케이션을 올바로 계측할 수 있습니다.

## 환경 변수 {#environment-variables}

모든 환경 변수는 메인 애플리케이션 프로세스가 시작되기 전 _또는_ 애플리케이션 진입점의 첫 번째 줄에 설정되어야 합니다.

이러한 환경 변수는 인라인으로 작성해서는 안 됩니다. 대신 프로세스에서 직접 읽어와야 합니다.

- 로컬 개발의 경우, 애플리케이션 및 해당 언어에 적합한 `.env` 파일 또는 이와 유사한 파일에 설정하고, Agent Observability SDK가 시작될 때 해당 변수 값이 자동으로 입력되도록 하세요(각 언어별 가이드라인 참조).
- 로컬 개발 환경이 아닌 경우, 사용자에게 설정해야 할 환경 변수를 알려주세요.

### API 키 {#api-key}

**필수**입니다. 다음 환경 변수로 API 키를 설정하세요.

```bash
DD_API_KEY=<provided-dd-api-key>
```

### Agent Observability 활성화 {#enable-agent-observability}

**필수**입니다. Agent Observability를 적절하게 활성화하려면 다음 환경 변수를 설정하세요.

```bash
DD_LLMOBS_ENABLED=true
DD_LLMOBS_AGENTLESS_ENABLED=true
```

### Agent Observability 애플리케이션 이름 {#agent-observability-application-name}

이는 **강력히 권장**됩니다. 사용자가 초기 프롬프트의 일부로 애플리케이션 이름(또는 `DD_LLMOBS_ML_APP`)을 제공한 경우 해당 값을 사용하세요. 아니면 폴더, 리포지토리 또는 프로젝트 이름을 기반으로 논리적 이름을 사용하세요.

```bash
DD_LLMOBS_ML_APP=<provided-or-inferred-application-name>
```

### Datadog 사이트 {#datadog-site}

이는 **선택 사항**입니다. 사용자의 API 키와 연결된 데이터센터에 해당하는 Datadog 사이트를 설정하세요. 제공되지 않은 경우(아마 `DD_SITE`를 통해), `datadoghq.com` 사이트가 사용된다고 사용자에게 알리세요. 값이 _제공되는_ 경우, 그 값을 환경 변수로 설정하세요.

```bash
DD_SITE=<provided-dd-site>
```

## 애플리케이션 계측 {#instrument-the-application}

감지된 언어의 지침을 따르세요.

| 언어 | 지침 |
|----------|-------------|
| Python | [Python 애플리케이션 에이전트 계측][1] |
| Node.js | [Node.js 애플리케이션 에이전트 계측][2] |
| Java | [Java 애플리케이션 에이전트 계측][3] |
| OpenTelemetry | [OpenTelemetry 계측][4] |

## 프롬프트 계측 {#instrument-prompts}

Prompt Tracking은 기본 Agent Observability 계측에 포함됩니다. 선택한 각 LLM 호출에 대해 애플리케이션이 프롬프트를 구성하는 위치를 식별합니다. 프롬프트 템플릿과 템플릿에 값을 채우는 데 사용하는 변수 값을 분리하여 유지합니다.

로컬 프롬프트의 경우 [Prompt Tracking 지침][5]에 따라 프롬프트 템플릿과 변수 값을 LLM 스팬과 함께 기록합니다. 프롬프트를 구성하는 기존 코드를 유지합니다. 이를 Datadog Prompt Management에서 프롬프트를 검색하는 코드로 대체하지 않습니다.

애플리케이션이 이미 Datadog Prompt Management에서 프롬프트를 검색하는 경우 해당 통합을 유지합니다. 자동 추적은 서식이 지정된 프롬프트를 자동 계측이 지원되는 공급자에게 변경 없이 전달할 때 적용됩니다. 애플리케이션이 서식이 지정된 프롬프트를 공급자에게 전달하기 전에 복사하거나 수정하는 경우, [프롬프트 사용량 추적][6]에 설명된 대로 명시적 주석을 추가합니다. 자동 추적에서 이미 프롬프트 메타데이터를 수집하는 경우 수동 주석을 추가하지 마세요.

{{< agent-only >}}
## 검사 추천을 위한 에이전트 컨텍스트 공유 {#share-agent-context-for-check-recommendations}

초기 Datadog 온보딩 프롬프트에 에이전트 컨텍스트 업로드 URL, 업로드 토큰 및 스키마 버전이 포함된 경우에만 이 단계를 완료하세요.

계측 후:

1. 에이전트의 목적, 도구, 명시적 행동 규칙 및 핸드오프 조건을 이해하는 데 필요한 리포지토리 파일만 검사합니다.
2. 인용된 프롬프트, 지침, 정책 또는 테스트에 의해 직접 지원되는 기대치만 포함합니다. 기대치당 하나의 원자적 행동을 기록하고, 에이전트 입력 또는 출력, 트레이스 컨텍스트, 도구 호출, 도구 결과 또는 해당 순서에서 관찰 가능한 측면으로 표현하며, 모호하거나 상충되는 규칙은 추측하기보다는 생략하세요.
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

   인코딩된 `context` 객체를 64 KiB 이하로 유지하고 다음 수집 제한 사항을 적용합니다.

   - 최대 20개의 기능 및 30개의 도구.
   - 1~30개의 행동 기대치.
   - 최대 20개의 핸드오프 조건.
   - 1~60개의 소스 참조.

   각 기능, 도구, 행동 기대치 및 핸드오프 조건에 대해 1~10개의 고유한 소스 참조 ID를 사용하세요. 각 행동 기대치와 핸드오프 조건은 최소 하나의 `prompt`, `instruction`, `policy` 또는 `test` 소스를 인용해야 하며 1~6개의 고유한 관찰 가능한 신호를 포함해야 합니다.

   `agent_summary`를 1~1,000자 사이로 유지합니다. 이름과 핸드오프 대상을 1~120자 사이로 유지합니다. 설명, 목적, 행동, 적용 가능성 진술, 실패, 핸드오프 조건 및 소스 경로를 1~500자 사이로 유지합니다. 소스 참조 설명을 1~300자 사이로 유지합니다.

   모든 소스 참조, 행동 기대치 및 핸드오프 조건에 문자, 숫자, 하이픈 또는 밑줄만 포함하여 1~64자 사이의 ID를 부여합니다. 소스 참조 ID는 `source_references` 내에서 고유해야 합니다. 행동 기대치 및 핸드오프 조건 ID는 두 컬렉션 모두에서 고유해야 합니다. ID는 이 업로드 내에서 로컬로 적용되며 각 권장 검사가 증거를 인용할 수 있도록 합니다.

   `source_kind`는 `prompt`, `instruction`, `policy`, `test`, `tool_definition` 또는 `implementation`에서만 사용합니다. `observable_signals`는 `agent_input`, `agent_output`, `trace_context`, `tool_call`, `tool_result` 또는 `tool_order`에서만 사용합니다. `line_end`를 포함하는 경우 긍정적인 `line_start`도 포함하고 `line_end`를 `line_start`보다 크거나 같게 만드세요.

4. 온보딩 프롬프트의 업로드 URL로 JSON을 한 번 보냅니다. `POST`를 사용하고 `Content-Type: application/json`을 설정하며 업로드 토큰은 `Authorization: Bearer <upload-token>` 헤더로만 전달합니다.

다음 보안 요구 사항을 따르세요.

- 업로드 토큰을 일회성 시크릿으로 취급합니다. 소스 파일, 구성, 셸 기록, 출력 또는 로그에 기록하지 마세요.
- 구조화된 요약만 업로드합니다. 원시 소스 코드, 전체 프롬프트, 시크릿, 자격 증명, 환경 변수, 고객 데이터, 트레이스 콘텐츠 또는 임의의 메타데이터를 업로드하지 마세요.
- 정규화된 리포지토리 상대 POSIX 소스 경로와 가장 작은 유용한 줄 범위를 사용합니다. 절대 경로, 백슬래시, 콜론, 정규화되지 않은 구분 기호, `.` 또는 `..` 경로 세그먼트를 사용하지 마세요. 소스 참조는 증거를 식별하며, 그 내용을 복사해서는 안 됩니다.
- 업로드에 실패하면 계측을 계속하고 Datadog이 선택적 컨텍스트를 수신하지 못했음을 사용자에게 알립니다. 더 광범위한 데이터로 재시도하지 마세요.

{{< /agent-only >}}
## 트레이스 보기 {#viewing-traces}

계측 변경 사항, 남아 있는 설정 요구 사항, 컨텍스트 업로드 단계를 요청한 경우 업로드 성공 여부를 보고합니다. 사용자에게 애플리케이션을 실행하고 Datadog에서 데이터를 확인하는 방법을 안내합니다. 검증하지 않은 상태에서 트레이스나 권장 사항을 사용할 수 있다고 주장하지 마세요.

**필수**: 사용자가 이 애플리케이션과 관련된 데이터를 볼 수 있는 퍼머링크를 제공하세요. 이 링크는 다음과 같은 형태를 취합니다.

```
https://app.{dd_site}/llm/applications?query=@ml_app:{application_name}
```

제공된 값을 입력하세요.
1. `dd_site`: [Datadog 사이트](#datadog-site)의 값이 제공된 경우 해당 값을 사용합니다. 아니면 `datadoghq.com`을 사용하세요.
2. `application_name`: [Agent Observability 애플리케이션 이름](#agent-observability-application-name) 섹션에서 제공된 값이나 추론한 값을 사용합니다.

## 선택적 프롬프트 관리 {#optional-prompt-management}

계측 및 요청된 컨텍스트 공유를 완료한 후 그 결과를 보고합니다. 그런 다음 Python 애플리케이션을 위한 선택 사항인 호스팅형 Prompt Management를 안내합니다.

- 사용자가 이미 Datadog 관리형 프롬프트 ID를 제공한 경우, [Prompt Management 에이전틱 통합 가이드][7]를 따릅니다. Prompt Management 활성화 여부를 다시 묻지 않습니다.
- 그렇지 않은 경우, 애플리케이션의 로컬 프롬프트를 식별하고 사용자가 Datadog에서 이를 관리하기를 원하는지 확인합니다. 사용자가 동의하면 가이드에 따라 선택한 프롬프트의 관리형 버전을 생성하고 해당 버전을 검색하도록 애플리케이션을 업데이트합니다.
- 사용자가 거절하거나 응답하지 않는 경우, 계측된 로컬 프롬프트를 그대로 유지합니다.

가이드의 [프롬프트 사용량 추적 섹션][6]에 따라 자동 추적 또는 명시적 주석이 필요한지 확인합니다. 프롬프트 메타데이터가 중복되지 않도록 합니다.

Prompt Management에 SDK 업데이트가 필요한 경우, 그 이유를 설명하고 종속성을 업데이트하기 전에 사용자에게 승인을 요청합니다. 이 선택적 업데이트로 핵심 계측이나 컨텍스트 공유가 지연되어서는 안 됩니다.

## 언어별 지침 {#language-specific-instructions}

{{< whatsnext desc="코딩 에이전트를 사용해 애플리케이션 계측:" >}}
    {{< nextlink href="/llm_observability/instrument/agentic/python" >}}Python 애플리케이션 에이전틱 계측{{< /nextlink >}}
    {{< nextlink href="/llm_observability/instrument/agentic/nodejs" >}}Node.js 애플리케이션 에이전틱 계측{{< /nextlink >}}
    {{< nextlink href="/llm_observability/instrument/agentic/java" >}}Java 애플리케이션 에이전틱 계측{{< /nextlink >}}
    {{< nextlink href="/llm_observability/instrument/agentic/prompt_management" >}}Prompt Management 에이전틱 통합{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /ko/llm_observability/instrument/agentic/python.md
[2]: /ko/llm_observability/instrument/agentic/nodejs.md
[3]: /ko/llm_observability/instrument/agentic/java.md
[4]: /ko/llm_observability/instrument/otel_instrumentation.md
[5]: /ko/llm_observability/instrument/prompt_tracking.md
[6]: /ko/llm_observability/instrument/agentic/prompt_management.md#track-prompt-usage
[7]: /ko/llm_observability/instrument/agentic/prompt_management.md