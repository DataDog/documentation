---
title: Agentic Instrumentation
---
## 가이드라인 {#guidelines}

**중요**: 다른 단계로 연결되는 하이퍼링크를 따라갈 때는 여기에 나열된 **모든** 가이드라인을 따르세요.

1. Datadog Agent Observability 및 Datadog 트레이서 관련 코드만 추가하세요. 수동 계측 목적이 아닌 경우, 관련 없는 코드는 수정하지 마세요.
2. 모노레포나 여러 서비스 또는 계측 대상이 있는 프로젝트에서 실행되는 경우, 어떤 서비스나 하위 프로젝트를 Agent Observability로 계측해야 하는지 사용자에게 확인하세요.
3. 최신 Datadog SDK를 설치하세요. 이미 설치되어 있는 경우, 종속성을 업데이트해도 괜찮은지 사용자에게 확인하세요.

## 사전 요구 사항 {#pre-requisites}

1. Agent Observability 데이터를 Datadog으로 전송하려면 Datadog API key가 필요합니다. API 키가 없으면 사용자는 Agent Observability 데이터를 수신할 수 없으므로, 이는 **필수 요구 사항**입니다. 사용자가 아직 API 키를 제공하지 않았고 제공하기를 원하지 않는 경우, 애플리케이션 계측을 계속 진행하되 마지막에 반드시 설정해야 한다는 점을 명시적으로 안내하고 설정할 수 있는 위치를 알려주세요.
2. 계측할 애플리케이션에서 사용 중인 프로그래밍 언어와 프레임워크를 확인하세요. 이는 애플리케이션을 올바르게 계측하는 데 중요합니다.

## 환경 변수 {#environment-variables}

모든 환경 변수는 메인 애플리케이션 프로세스가 시작되기 전 _또는_ 애플리케이션 진입점의 첫 번째 줄에 설정되어야 합니다.

이러한 환경 변수는 인라인으로 작성해서는 안 됩니다. 대신 프로세스에서 직접 읽어와야 합니다.

- 로컬 개발의 경우, 애플리케이션 및 해당 언어에 적합한 `.env` 파일 또는 이와 유사한 파일에 설정하고, Agent Observability SDK가 시작될 때 해당 변수 값이 자동으로 입력되도록 하세요(각 언어별 가이드라인 참조).
- 로컬 개발 환경이 아닌 경우, 사용자에게 설정해야 할 환경 변수를 알려주세요.

### API 키 {#api-key}

이는 **필수**입니다. 다음 환경 변수로 API 키를 설정하세요.

```bash
DD_API_KEY=<provided-dd-api-key>
```

### Agent Observability 활성화 {#enable-agent-observability}

이는 **필수**입니다. Agent Observability를 올바르게 활성화하려면 다음 환경 변수를 설정하세요.

```bash
DD_LLMOBS_ENABLED=true
DD_LLMOBS_AGENTLESS_ENABLED=true
```

### Agent Observability 애플리케이션 이름 {#agent-observability-application-name}

이는 **강력히 권장**됩니다. 사용자가 초기 프롬프트의 일부로 애플리케이션 이름(또는 `DD_LLMOBS_ML_APP`)을 제공한 경우 해당 값을 사용하세요. 그렇지 않으면 폴더, 리포지토리 또는 프로젝트 이름을 기반으로 논리적 이름을 사용하세요.

```bash
DD_LLMOBS_ML_APP=<provided-or-inferred-application-name>
```

### Datadog 사이트 {#datadog-site}

이는 **선택 사항**입니다. 사용자의 API 키와 연결된 데이터센터에 해당하는 Datadog 사이트를 설정하세요. 제공되지 않은 경우(`DD_SITE`를 통해 가능), `datadoghq.com` 사이트가 사용됨을 사용자에게 알리세요. _만약_ 값이 제공되면 그 값을 환경 변수로 설정하세요.

```bash
DD_SITE=<provided-dd-site>
```

## 애플리케이션 계측 {#instrument-the-application}

감지된 언어의 지침을 따르세요.

| 언어 | 지침 |
|----------|-------------|
| Python | [Python 애플리케이션 Agentic Instrumentation](/llm_observability/instrumentation/agentic/python.md) |
| Node.js | [Node.js 애플리케이션 Agentic Instrumentation](/llm_observability/instrumentation/agentic/nodejs.md) |
| Java | [Java 애플리케이션 Agentic Instrumentation](/llm_observability/instrumentation/agentic/java.md) |
| OpenTelemetry | [OpenTelemetry 계측](/llm_observability/instrumentation/otel_instrumentation.md) |

## 프롬프트 계측 및 Prompt Management 제공 {#instrument-prompts-and-offer-prompt-management}

프롬프트 추적은 기본 Agent Observability 계측의 일부입니다. 선택한 각 LLM 호출에 대한 프롬프트 구성 경계를 식별하고 프롬프트 템플릿을 동적 변수와 별도로 보존하세요.

1. 사용자의 요청에 이미 Datadog 관리형 프롬프트 ID가 지정되어 있는 경우, [Prompt Management Agentic Integration 가이드](/llm_observability/instrumentation/agentic/prompt_management.md)를 따르세요. Prompt Management 사용 여부를 다시 묻지 마세요.
2. 그렇지 않으면 애플리케이션의 프롬프트와 이를 형식화하는 데 사용되는 동적 변수를 식별하세요. 기존 공급자, 모델, 프롬프트 콘텐츠 및 애플리케이션 동작을 보존하세요.
3. 지원되는 Python 애플리케이션의 경우, 식별한 프롬프트를 사용자에게 알리고 Datadog으로 해당 프롬프트를 관리할지 물어보세요. 사용자가 동의하면 [Prompt Management Agentic Integration 가이드](/llm_observability/instrumentation/agentic/prompt_management.md)를 따라 선택한 로컬 프롬프트를 승격하고 로컬 구성을 관리형 프롬프트 검색으로 대체하세요.
4. 사용자가 Prompt Management를 거부하거나 애플리케이션 언어가 지원되지 않는 경우, [프롬프트 추적 지침](/llm_observability/monitoring/prompt_tracking)에 따라 선택한 프롬프트를 구조화된 프롬프트 메타데이터로 계측하세요. 런타임 프롬프트 검색을 추가하지 마세요.

Prompt Management가 로컬 프롬프트를 대체할 때, 중복된 구조화된 프롬프트 메타데이터를 첨부하는 대신 관리형 프롬프트의 자동 추적 기능을 사용하세요.

## 트레이스 보기 {#viewing-traces}

사용자에게 애플리케이션을 실행하고 Datadog에서 데이터를 확인할 수 있음을 알리세요.

**필수**: 사용자가 이 애플리케이션과 관련된 데이터를 볼 수 있는 퍼머링크를 제공하세요. 이는 다음 형식으로 제공됩니다.

```
https://app.{dd_site}/llm/applications?query=@ml_app:{application_name}
```

제공된 값을 입력하세요.
1. `dd_site` - [Datadog 사이트](#datadog-site)에 대한 값이 제공된 경우 해당 값을 사용하세요. 그렇지 않으면 `datadoghq.com`을 사용하세요.
2. `application_name` - [Agent Observability 애플리케이션 이름](#llm-observability-application-name) 섹션에서 제공되거나 추론된 값을 사용하세요.