---
description: Datadog의 도구 및 통합을 사용하여 운영 작업을 자동화하는 사용자 지정 AI 에이전트를 구축하고 배포합니다.
further_reading:
- link: /actions/actions_catalog/
  tag: 설명서
  text: Action Catalog
- link: /actions/workflows/
  tag: 설명서
  text: Workflow Automation
- link: /account_management/billing/ai_credits/
  tag: 설명서
  text: AI 크레딧
- link: /incident_response/case_management/ai/custom_agents/
  tag: 설명서
  text: Work Management를 Bits Agent Builder와 통합
- link: https://www.datadoghq.com/knowledge-center/aiops/ai-agents/
  tag: 지식 센터
  text: AI 에이전트란 무엇이며 어떻게 작동하나요?
- link: https://www.datadoghq.com/blog/bits-agent-builder/
  tag: 블로그
  text: 'Bits Agent Builder 소개: 경보 대응 및 해결을 위한 에이전틱 워크플로 구축'
title: Bits Agent Builder
---
## 개요 {#overview}

Bits Agent Builder를 사용하면 사용자 지정 AI 에이전트를 만들어 Datadog 도구와 통합을 사용해 운영 작업을 자동화할 수 있습니다. 에이전트는 로그 검색, 메트릭 쿼리, 작업 항목 생성, 메시지 전송 등 [Action Catalog][7]의 모든 작업을 수행할 수 있습니다.

정적 자동화로 처리하기는 너무 복잡하지만, 사람이 직접 하기에는 너무 반복적인 작업을 처리하는 데 에이전트를 사용하세요. 오류 분류, 인시던트에 대응, 추세 분석 및 문제 에스컬레이션 등이 대표적인 예입니다.

<div class="alert alert-info">Bits Agent Builder는 <a href="/account_management/billing/ai_credits/">AI 크레딧</a>을 사용합니다.</div>

{{< img src="/actions/agents/agent-builder-interface.png" alt="Bits Agent Builder 편집기. 지침, 모델, 도구 및 자동화 구성을 표시함" style="width:100%;" >}}

## 에이전트 만들기 {#create-an-agent}

[Bits Agent Builder 페이지][1]에서 **New Agent**를 클릭합니다. 여기에서 세 가지 방법으로 에이전트를 만들 수 있습니다.

- **AI로 빌드**: 에이전트가 무슨 일을 하기를 원하는지 자연어로 설명하세요. Bits Agent Builder가 지침을 생성하고, 관련 도구를 선택하며 에이전트를 구성해 줍니다.
- **Blueprint에서 시작**: 오류 분류, 인시던트 대응, 보안 분석 또는 DevOps 지원과 같은 일반적인 사용 사례에 적합한 사전 빌드된 템플릿을 선택하세요. Blueprints는 지침, 도구 및 자동화가 미리 구성되어 제공되며 사용자 지정이 가능합니다.
- **처음부터 시작**: 에이전트를 수동으로 구성하세요. 지침 쓰기, 모델 선택, 도구 추가를 모두 수동으로 진행합니다.

{{< img src="/actions/agents/empty-state.png" alt="Bits Agent Builder의 새 에이전트 인터페이스, 텍스트 필드 및 Blueprint 옵션을 표시함" style="width:100%;" >}}

## 에이전트 구성 {#configure-your-agent}

### 지침 {#instructions}

지침은 에이전트가 실행될 때 할 일을 알려줍니다. 지침은 자연어로 작성하세요. 목표, 프로세스, 제한 사항(있는 경우)을 설명합니다. 지침은 직접 편집해도 되고, 채팅 인터페이스를 통해 조정해도 됩니다.

지침은 구체적이고 결과 지향적으로 작성하세요. 예를 들면 다음과 같습니다.

```
You are an Incident Responder AI assistant specialized in managing
and coordinating incident response activities.

Your role involves:
- Guiding incident response procedures and best practices
- Helping assess incident severity and impact
- Coordinating communication between teams and stakeholders
- Managing incident lifecycle from detection to resolution
- Facilitating post-incident reviews and improvements

During incident response:
1. Use search_datadog_logs to pull recent error logs for the affected service
2. Help classify incident severity (P0/P1/P2/etc.)
3. Guide through incident response runbooks and procedures
4. Assist with stakeholder communication and updates
5. Track action items and follow-up tasks
6. Support post-mortem analysis and lessons learned

Focus on clear communication, structured processes, and continuous
improvement of incident response capabilities.
```

### 모델 {#model}

에이전트의 추론 기반이 될 LLM을 선택합니다. 모델마다 기능, 속도 및 비용이 다릅니다. 에이전트의 워크로드에 따라 선택하세요. [OpenAI의 비교 도구][6] 및 [Anthropic의 모델 비교][5]를 사용하여 모델을 비교할 수 있습니다.

### 도구 {#tools}

도구는 에이전트가 수행할 수 있는 작업을 정의합니다. [Action Catalog][7]에서 도구를 추가하세요. 에이전트는 해당 에이전트의 구성에 추가된 도구만 사용할 수 있습니다.

추가된 도구를 클릭하면 해당 도구의 파라미터를 하드코딩할 수 있습니다. 예를 들어, Slack 도구를 특정 채널에 고정하거나 로그 쿼리를 특정 서비스에 고정할 수 있습니다.

[Datadog MCP Server][8]은 기본적으로 활성화되어 있습니다. [사용자 지정 HTTP 작업][12]을 사용하여 모든 API에 연결할 수 있습니다.

### 자동화 {#automations}

[일정][13]을 사용하여 에이전트가 자동으로 실행되도록 설정하거나 Datadog [모니터][14], [인시던트][15] 또는 [보안 신호][16]에서 에이전트가 트리거되도록 설정하세요. 이러한 자동화에는 [Workflow Automation][9]을 사용합니다.

## 에이전트 테스트 {#test-your-agent}

내장된 채팅 인터페이스를 사용하여 에이전트를 테스트하세요. 메시지를 보내고, 에이전트의 추론을 검토하며, 올바른 작업을 수행하는지 확인하세요. 채팅 기록은 세션이 전환되어도 보존됩니다.

## 에이전트 오케스트레이션 {#agent-orchestration}

**Run Agent** 작업을 통해 [Workflow Automation][9] 및 [App Builder][10]에서 에이전트를 사용하세요. 이렇게 하면 모든 워크플로에 AI 추론을 포함할 수 있습니다.

{{< img src="/actions/agents/run-agent-step.png" alt="워크플로의 Run Agent 단계 구성, 에이전트 선택, 실행 지침, 대화 ID 및 출력 스키마 필드를 표시함" style="width:100%;" >}}

1. [Workflow Automation][9]에서 워크플로를 열거나 생성하거나, [App Builder][10]에서 앱을 열거나 생성합니다.
1. Action Catalog에서 **Run Agent** 단계를 추가합니다.
1. 실행할 에이전트를 선택합니다.
1. **Run Instructions**를 작성합니다. 이것은 에이전트가 실행될 때마다 받는 프롬프트입니다. `{{Source.form}}`과 같은 변수를 사용해 트리거 데이터를 전달합니다.

**Run Agent** 단계는 다음과 같은 옵션 필드도 지원합니다.

- **Output Schema**: 에이전트 응답에 대한 JSON 스키마를 정의합니다. 설정하면 에이전트가 다운스트림 단계에서 사용할 수 있도록 스키마에 맞춰 출력을 구조화합니다.. 예를 들어 `requestType` 필드가 포함된 스키마를 정의한 다음, If 조건 단계에서 `Run Agent.finalResponse.requestType`을 기준으로 분기할 수 있습니다.

  {{< img src="/actions/agents/output-schema-example.png" alt="에이전트 응답 필드를 기준으로 분기하도록 출력 스키마를 사용하는 워크플로" style="width:100%;" >}}

- **Conversation ID**: 기본적으로 각 Run Agent 호출은 독립적인 단일 턴 실행으로 이루어집니다. Conversation ID를 전달하면 에이전트가 여러 워크플로 실행에 걸쳐 컨텍스트를 유지할 수 있습니다. 다중 턴 세션에는 채팅 UI와 동일한 컨텍스트 창 한도가 적용됩니다.

에이전트는 구성된 도구와 지침을 사용하여 실행된 후 출력을 워크플로에 반환합니다. 규칙 기반 자동화와 AI 추론을 하나의 워크플로로 결합할 수 있습니다.

### 에이전트를 작업 항목에 자동 할당 {#automatically-assign-agents-to-work-items}

[Work Management][17]는 사람과 에이전트가 수행하는 작업을 추적하기 위한 Datadog의 내장 티케팅 도구입니다. 사용자 지정 에이전트를 만들어 작업 분류 및 해결을 돕고, 그러한 에이전트를 자동으로 작업 항목에 할당할 수 있습니다.

## 문제 해결 {#troubleshooting}

**에이전트가 도구를 사용하지 않음**: 해당 도구가 에이전트의 구성에 추가되었는지 확인하세요. 에이전트는 명시적으로 추가된 도구만 사용할 수 있습니다.

**자동화가 실행되지 않음**: 자동화가 게시되었고 Run Agent 단계가 완전히 구성되었는지 확인하세요.

**대화 길이 한도**: 대화 길이가 길면 컨텍스트 길이 한도에 도달할 수 있습니다. 이런 상황이 발생하면 새 대화를 시작하세요. 

**예기치 않은 구성 변경 사항**: 에이전트의 ID로 필터링된 [Audit Trail][11]을 사용해 변경 사항 기록을 검토합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/actions/agents
[5]: https://platform.claude.com/docs/en/about-claude/models/overview#latest-models-comparison
[6]: https://developers.openai.com/api/docs/models
[7]: /ko/actions/actions_catalog/
[8]: /ko/mcp_server
[9]: https://app.datadoghq.com/workflow
[10]: https://app.datadoghq.com/app-builder/apps/list
[11]: /ko/account_management/audit_trail/
[12]: /ko/actions/actions_catalog/http-action/
[13]: /ko/actions/workflows/trigger/#scheduled-triggers
[14]: /ko/actions/workflows/trigger/#monitor-triggers
[15]: /ko/actions/workflows/trigger/#incident-triggers
[16]: /ko/actions/workflows/trigger/#security-triggers
[17]: /ko/incident_response/work_management/ai/custom_agents/