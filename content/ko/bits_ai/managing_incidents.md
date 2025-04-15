---
further_reading:
- link: https://www.datadoghq.com/blog/bits-ai-for-incident-management/
  tag: 블로그
  text: Bits AI를 통해 최신 인시던트에 대한 최신 정보를 받아보세요
- link: bits_ai/
  tag: 설명서
  text: Bits AI 개요
- link: bits_ai/getting_started
  tag: 설명서
  text: 시작하기
- link: bits_ai/query_examples
  tag: 설명서
  text: 자연어 쿼리 예
title: 인시던트 관리
---

## 개요

<div class="alert alert-warning">다음 기능은 <a href="https://www.datadoghq.com/product/incident-management/">Datadog Incident Management</a> 제품에 포함되어 있습니다.</div>

Bits AI는 인시던트 관리 프로세스를 단순화하고, 협업을 개선하며, 인시던트 대응자에게 지원을 제공하여 효율적으로 인시던트를 해결할 수 있도록 돕는 유용한 도구입니다.

## 사전 필수 조건

- Datadog 계정이 Slack에 연결되어 있어야 합니다. `/dd` 연결 명령을 실행하면 이 프로세스가 자동으로 시작되며, 프롬프트에 따라 완료할 수 있습니다.
- **[Incident > Settings > Integrations][3] > Slack**에서 **Push Slack channel messages to the incident timeline** 및 **Activate Bits AI features in incident Slack channels for your organization** 토글을 활성화합니다. 이를 통해 Datadog은 Slack 대화를 사건 타임라인에 수집하여 요약 및 포스트모템을 생성할 수 있습니다. **참고**: Bits AI의 인시던트 관리 기능은 단일 Slack 워크스페이스 내 하나의 Datadog 조직에 대해서만 활성화할 수 있습니다.
- Slack 채널의 인시던트에 대해 Bits AI에 질문하려면 해당 채널에 Bits AI를 초대해야 합니다. `@Datadog` 명령을 실행하고 화면의 지시를 따릅니다.

{{< img src="bits_ai/managing_incidents/bitsai_slack_prerequisites.png" alt="Datadog의 Slack 통합 설정" style="width:90%;">}}

## 인시던트 요약 보기

Slack에서 인시던트 채널에 참여하면 자동으로 인시던트 요약을 받게 됩니다. 채널은  Incident Management에 연결되어 있어야 하며 **메시지가 10개 이상** 있어야 합니다. 사용자에게만 표시되는 요약은 다시 로드할 때, 데스크톱과 모바일 앱 간 또는 세션 간에 유지되지 않습니다.

언제든지 `@Datadog Give me a summary of this incident`에 요청하여 인시던트 채널 내에서 새로운 요약을 요청할 수 있습니다. 인시던트 번호를 참조하여 다른 채널의 요약을 요청할 수도 있습니다. 예: `@Datadog Give me a summary of incident-262`

## 전체 인시던트 기록을 검색하고 질문하세요

Bits AI에 요청하여 원하는 인시던트를 찾을 수 있습니다. 예를 들어 다음과 같습니다.
- `@Datadog How many incidents are currently ongoing?`
- `@Datadog Show me all Sev-1 incidents that occurred in the past week`

그런 다음 추가로 조사하고 해당 인시던트에 대해 `@Datadog What was the root cause of incident-123?` 또는 `@Datadog What remediation actions did the responders take in incident-123?`과 같은 질문을 할 수 있습니다.

Bits AI는 관련 인시던트에 대한 의미 검색도 수행할 수 있습니다. 인시던트에 대응하는 경우 Bits AI에 현재 발생한 인시던트와 유사해 보이는 다른 인시던트를 찾도록 요청할 수 있습니다(`@Datadog Are there any related incidents?`). Bits AI는 지난 2시간 이내에 발생한 인시던트를 찾습니다. Bits AI의 검색 기간을 지정할 수도 있습니다. `@Datadog Find me incidents related to DDOS attacks from the past month`라고 입력하면 Bits AI는 지난 달에 발생했고 여전히 진행 중인 DDOS 인시던트와 해결된 DDOS 인시던트를 모두 반환합니다.

또는 인시던트가 선언되기도 전에 문제가 있다고 의심되는 경우 Bits AI에 `@Datadog A customer is unable to check out. Is there an incident?` 또는 `@Datadog Are there any incidents now impacting the payments service?`과 같은 질문을 할 수 있습니다. 

## 인시던트 관리

Datadog 웹 앱으로 이동하지 않고도 Slack에서 Bits AI에 다음을 요청할 수 있습니다.
- 인시던트 열기: `@Datadog Declare an incident`
- 인시던트 심각도 수준 변경: `@Datadog Update this incident to SEV-3`
- 인시던트 상태 변경: `@Datadog Mark this incident as stable`

## 포스트모템 첫 번째 초안 생성

AI 지원 포스트모템 초안 생성 방법

1. Datadog에서 포스트모템을 생성하려는 인시던트로 이동합니다.
2. 인시던트가 해결되었는지, 타임라인에 메시지가 10개 이상 있는지 확인합니다.
3. **Generate Postmortem** 버튼을 클릭합니다.
4. 기본 제공되는 **General incident with AI content** 템플릿 또는 직접 만든 [커스텀 템플릿]((#customize-postmortem-templates-with-ai-incident-variables)을 선택합니다.
6. 포스트모템이 생성되는 데 최대 1분이 소요됩니다. 이 시간 동안 탭을 닫지 마세요.
7. 생성된 포스트모템을 검토합니다. AI로 생성된 포스트모템은 초안이며 인시던트 대응자의 수정이 필요합니다.

## AI 인시던트 변수로 사용자 맞춤 포스트모템 템플릿을 생성하세요

1. [**Service Mgmt > Incidents > Settings > Postmortems**][1]로 이동합니다.
2. **New Postmortem Template**을 클릭하고 제공된 인시던트 변수를 사용하여 템플릿을 맞춤설정합니다.
   - `ai` 접두사가 붙은 변수는 고정 값 대신 AI 생성 콘텐츠를 생성합니다. 6개의 `ai` 변수는 `{{incident.ai_action_items}}`, `{{incident.ai_customer_impact}}`, `{{incident.ai_key_timeline}}`, `{{incident.ai_lessons_learned}}`, `{{incident.ai_summary}}`, `{{incident.ai_system_overview}}`입니다.
    - 각 변수 앞에 제목을 사용해야 합니다.
3. 포스트모템 생성 중에 템플릿 옵션으로 사용할 수 있도록 템플릿을 저장합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/incidents/settings#Postmortems
[2]: https://app.datadoghq.com/incidents
[3]: https://app.datadoghq.com/incidents/settings#Integrations