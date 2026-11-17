---
aliases:
- /ko/bits_ai/managing_incidents/
- /ko/bits_ai/bits_ai_sre/coordinate_incidents
- /ko/service_management/incident_management/incident_ai/
- /ko/incident_response/incident_management/incident_ai
description: Incident AI를 사용하여 활성 인시던트를 조사하고, 선제적 요약을 받고, 관련 문제를 탐지하고, AI 기반 근본 원인
  분석을 트리거하는 방법을 알아보세요.
further_reading:
- link: /bits_ai/bits_investigation/
  tag: 문서
  text: Bits Investigation이란
- link: /incident_response/incident_management/post_incident/postmortems
  tag: 문서
  text: AI 지원 사후 분석 생성
- link: /incident_response/incident_management/setup_and_configuration/templates
  tag: 문서
  text: 알림 및 사후 분석 템플릿에서 AI 변수 구성
- link: https://www.datadoghq.com/blog/datadog-incident-response-ai-features/
  tag: 블로그
  text: Datadog Incident Response의 AI로 조사 가속화하기
title: Incident AI
---
## 개요 {#overview}

Incident AI는 정보 수집을 자동화하고 관련 컨텍스트를 제공하여 대응 담당자가 진행 중인 인시던트를 더 빠르게 조사할 수 있도록 지원합니다. Incident AI는 Slack과 Datadog 플랫폼에서 선제적 요약을 제공하고, 관련 인시던트를 탐지하며, 인시던트 기록에 대한 대화형 질의를 지원하여 팀이 문제 해결에 집중할 수 있도록 돕습니다.

Incident AI를 활성화하려면 Datadog을 Slack에 연결하고 인시던트 Slack 채널에서 Bits AI를 활성화하세요. 설정 방법은 [Incident Management를 위한 Slack 통합][1]을 참조하세요.

조사 단계 외에도 사용할 수 있는 AI 기능은 다음 항목을 참조하세요.
- [템플릿][2]: 알림 및 사후 분석 템플릿에 AI 변수 추가
- [사후 분석][3]: AI 지원 사후 분석 초안 생성

## 선제적 인시던트 요약 {#proactive-incident-summaries}

Slack에서 Datadog Incident Management와 연결된 인시던트 채널에 참여하면 Incident AI가 원인에 기여한 요인, 영향, 문제 및 수정 조치 등 인시던트의 주요 정보를 요약하여 자동으로 게시합니다. `/dd incident summary`를 사용해 필요할 때마다 이 요약을 요청할 수도 있습니다. 이 요약은 본인에게만 표시됩니다.

인시던트가 해결됨 상태로 변경되면 Incident AI가 최종 요약을 게시합니다. 이 최종 요약은 채널의 모든 사용자에게 표시됩니다.

{{< img src="incident_response/incident_management/investigate/incident_ai/incident_summary.png" alt="Slack의 인시던트 요약 예시" style="width:100%;" >}}

## 회의 요약 {#meeting-summaries}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">선택한 Datadog 사이트에서는 회의 요약을 사용할 수 없습니다({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Incident AI는 Zoom, Google Meet 및 Microsoft Teams에서 인시던트 회의를 자동으로 요약할 수 있습니다. 회의 중 Incident AI는 인시던트 타임라인과 인시던트 채팅 채널에 실시간 요약을 주기적으로 게시합니다. 회의가 끝나면 Incident AI는 회의 종료 후 최종 요약을 게시합니다.

<div class="alert alert-info">회의 요약이 활성화되면 Datadog <a href="https://www.datadoghq.com/legal/subprocessors/">하위 프로세서</a>가 회의 오디오를 녹음하고 전사합니다. 7일의 보존 기간이 지나면 하위 프로세서가 모든 데이터를 자동으로 삭제합니다.</div>

Datadog Transcriber가 회의에 참여하려면 조직에서 AI 기능을 활성화해야 합니다. 회의 요약을 켜려면 회의 플랫폼의 통합 설정에서 **Generate AI meeting summaries**를 활성화하세요.

- [Zoom][4]
- [Google Meet][5]
- [Microsoft Teams][6]

기본적으로 Incident AI는 비공개 인시던트에 대한 회의는 요약하지 않습니다. 통합 설정에 조건을 추가하여 다른 인시던트에 대한 요약도 방지할 수 있습니다.

### 회의 요약 작동 방식 {#how-meeting-summaries-work}

인시던트에 연결된 회의가 시작되면 Datadog Transcriber가 회의 참여를 시도합니다. 이 작업은 10~30초 정도 걸릴 수 있습니다. 회의에 로비나 대기실이 있는 경우 전사가 시작되려면 참가자가 Datadog Transcriber의 입장을 허용해야 합니다. Datadog Transcriber가 참여하면 회의 중 다음 위치에 실시간 요약을 주기적으로 게시합니다.

- **인시던트 타임라인**의 **Meeting Summary** 항목 아래에 게시됩니다.
- **인시던트 채팅 채널**의 회의 카드 스레드 및 채널 메시지 모두에 게시됩니다.

회의가 끝나면 Datadog Transcriber는 동일한 위치에 회의 종료 후 최종 요약을 게시합니다.

### 요약 검토 {#reviewing-a-summary}

요약이 게시된 후 요약을 승인하거나 요약의 텍스트를 편집하거나 거부할 수 있습니다. Datadog의 인시던트 타임라인에서 이러한 작업을 수행할 수 있습니다. 요약이 인시던트 채팅 채널에도 브로드캐스트되었다면 해당 채널에서도 수행할 수 있습니다.

인시던트 타임라인에서 요약을 검토하려면 다음 단계를 따르세요.

1. Datadog에서 인시던트를 열고 타임라인에서 **Meeting Summary** 항목을 찾습니다.
2. 요약을 승인하려면 체크 표시 아이콘을, 텍스트를 편집하려면 연필 아이콘을, 타임라인에서 제거하려면 거부 아이콘을 클릭합니다.

사용자가 요약을 승인하거나 편집하면 Datadog은 해당 작업을 수행한 사용자를 기록합니다. 요약이 편집되면 승인할 수 없으며 편집된 버전이 우선합니다. 요약을 거부하면 모든 사용자의 인시던트 타임라인에서 해당 요약이 제거되고 연결된 채팅 채널에서 내용이 숨겨집니다. 거부 작업은 되돌릴 수 없으므로 Datadog은 거부하기 전에 확인을 요청합니다.

요약이 인시던트 채팅 채널에 브로드캐스트되었다면 메시지의 **Approve**, **Edit**, **Reject summary** 버튼을 사용하세요.

### Transcriber 다시 초대 {#re-inviting-the-transcriber}

Datadog Transcriber가 회의에서 나갔다면 요약을 재개할 수 있도록 해당 인시던트에 연결된 동일한 회의에 다시 초대하세요.

1. Datadog에서 인시던트를 엽니다.
2. 인시던트 헤더에서 연결된 회의의 메뉴를 엽니다.
3. 회의 옆에 있는 **Add Transcriber**(로봇 아이콘)를 클릭합니다.
4. 필요한 경우 전사가 시작될 수 있도록 회의 로비나 대기실에서 Datadog Transcriber의 입장을 허용합니다.

로봇 아이콘은 Datadog Transcriber가 회의에 참여하는 중인지, 이미 참여했는지를 보여줍니다. Datadog Transcriber를 추가할 수 없다면 아이콘 위에 마우스를 올려 이유를 확인하세요.

Datadog Transcriber가 나간 후 인시던트의 Slack 또는 Microsoft Teams 회의 카드 스레드에도 다시 초대 프롬프트가 나타날 수 있습니다. 입장 허가나 참가자를 기다리다 시간이 초과되거나, 모두가 회의에서 나가거나, 누군가 Datadog Transcriber를 제거하면 이 프롬프트가 나타날 수 있습니다. **Yes**를 선택하여 기록자를 다시 초대하거나 **No**를 선택하여 메시지를 닫으세요.

다시 초대하려면 인시던트 편집 권한이 필요합니다. 좌석 기반 요금제가 적용되는 조직에서는 [Incident Management 또는 Incident Response 좌석][7]도 필요합니다. 다시 초대는 비공개 인시던트에 대한 기본 제외를 포함하여 요약을 방해하는 조건을 무시하지 않습니다.

## 관련 인시던트 탐지 {#related-incident-detection}

Incident AI는 서로 20분 이내에 선언된 관련 인시던트에 자동으로 플래그를 지정하여 더 광범위한 시스템 문제를 식별할 수 있도록 돕습니다.

## Incident AI와 채팅 {#chat-with-incident-ai}

자연어 프롬프트를 사용하여 Slack에서 정보를 요청하거나 작업을 수행할 수 있습니다.

| 기능                      | 프롬프트 예시                                                                                                                                  |
|------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| 인시던트 선언                | `@Datadog Declare an incident`                                                                                                                  |
| 심각도 변경                    | `@Datadog Update this incident to SEV-3`                                                                                                        |
| 상태 변경                      | `@Datadog Mark this incident as stable`<br />`@Datadog Resolve this incident`                                                                   |
| 새 요약 요청                | `@Datadog Give me a summary of this incident`<br />`@Datadog Summarize incident-262`<br />**참고**: 비공개 인시던트는 요약되지 않습니다.       |
| 인시던트 기록 검색            | `@Datadog How many incidents are currently ongoing?`<br />`@Datadog Show me all Sev-1 incidents that occurred in the past week.`                |
| 특정 인시던트 심층 분석       | `@Datadog What was the root cause of incident-123?`<br />`@Datadog What remediation actions did the responders take in incident-123?`        |
| 관련 인시던트 찾기             | `@Datadog Are there any related incidents?`<br />`@Datadog Find me incidents related to DDoS attacks from the past month`                       |
| 조기 탐지 관련 질의            | `@Datadog A customer is unable to check out. Is there an incident?`<br />`@Datadog Are there any incidents now impacting the payments service?` |

## Bits Investigation 트리거 {#bits-ai-investigation}

인시던트 대응 워크플로를 벗어나지 않고 Slack 인시던트 채널이나 Datadog Incident Management 웹 UI에서 직접 Bits Investigation을 시작하세요. 이를 통해 진행 중인 인시던트에 대응하면서 컨텍스트 전환을 줄이고 AI 에이전트가 팀과 동일한 공유 컨텍스트를 바탕으로 함께 조사할 수 있습니다.

Bits Investigation을 사용하려면 조직에서 해당 기능을 활성화해야 하며, **올바르게 구성된 Datadog Incident Management Slack 채널**에서만 조사를 트리거할 수 있습니다. 인시던트 조사 흐름은 시스템에서 유효한 인시던트 채널을 탐지한 경우에만 활성화됩니다.

진행 중인 인시던트를 Slack에서 조사하려면 다음 방법 중 하나를 사용하세요.

- 인시던트 작업에서 **Investigate with Bits AI**를 클릭합니다.
- `/dd incident investigate` 슬래시 명령을 실행합니다.
- 인시던트 채널에 `@Datadog investigate`을 입력합니다.

`@Datadog investigate`을 사용할 때 추가 컨텍스트를 인라인으로 포함하면 에이전트가 처음부터 조사 범위를 좁히는 데 도움이 됩니다.

| 프롬프트                      | 동작                                    |
|-----------------------------|---------------------------------------------|
| `@Datadog investigate we're seeing high error rates in the payments service since the deploy at 2pm` | 대응 담당자가 지정한 중점 영역을 바탕으로 조사 트리거 |
| `@Datadog investigate, I think this is related to the redis cache` | 초기 가설을 바탕으로 조사 트리거 |

조사가 트리거되면 에이전트가 인시던트 타임라인, 연결된 텔레메트리 시그널(트레이스, 메트릭 및 로그), 프롬프트에 제공된 컨텍스트를 자동으로 가져옵니다. 그런 다음 에이전트는 스레드 답글로 채널에 진행 상황을 게시하고, 조사가 완료되면 최종 근본 원인 요약과 권장 후속 조치를 채널의 모든 사용자에게 제공합니다.

{{< img src="incident_response/incident_management/investigate/incident_ai/Triggering_investigations_slack.png" alt="근본 원인에 대한 발견 결과와 View Full Investigation 버튼을 포함하여 완료된 Bits Investigation을 보여주는 Datadog 인시던트 Slack 채널" >}}

**웹 UI에서** 인시던트 개요 페이지의 Investigation 섹션에서 직접 조사를 트리거할 수 있습니다.

{{< img src="incident_response/incident_management/investigate/incident_ai/Triggering_investigations_web.png" alt="Investigation 섹션에 완료된 Bits Investigation과 View Investigation 버튼이 표시된 Incident Management 개요 페이지" >}}

조사가 트리거되면 조사 내용이 인시던트 웹 UI에 포함되고 Bits Investigation이 페이지의 Responder Roles 섹션에 대응 담당자로 표시됩니다.

조사 워크플로의 전체 단계별 안내는 [Bits Investigation][8]을 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/incident_response/incident_management/setup_and_configuration/integrations/slack
[2]: /ko/incident_response/incident_management/setup_and_configuration/templates
[3]: /ko/incident_response/incident_management/post_incident/postmortems
[4]: /ko/incident_response/incident_management/setup_and_configuration/integrations/zoom_integration/#meeting-summaries
[5]: /ko/incident_response/incident_management/setup_and_configuration/integrations/google_meet/#meeting-summaries
[6]: /ko/incident_response/incident_management/setup_and_configuration/integrations/microsoft_teams/#meeting-summaries
[7]: /ko/account_management/billing/incident_response/#allocate-seats
[8]: /ko/bits_ai/bits_investigation