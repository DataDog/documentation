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
  text: Bits Investigation에 대해 알아보기
- link: /incident_response/incident_management/post_incident/postmortems
  tag: 문서
  text: AI 지원 사후 분석 생성
- link: /incident_response/incident_management/setup_and_configuration/templates
  tag: 문서
  text: 알림 및 사후 분석 템플릿에서 AI 변수 구성
- link: https://www.datadoghq.com/blog/datadog-incident-response-ai-features/
  tag: 블로그
  text: Datadog Incident Response의 AI로 조사 가속화하기
title: 인시던트 AI
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

조사 워크플로에 대한 자세한 단계별 안내는 [Bits Investigation][4]을 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/incident_response/incident_management/setup_and_configuration/integrations/slack
[2]: /ko/incident_response/incident_management/setup_and_configuration/templates
[3]: /ko/incident_response/incident_management/post_incident/postmortems
[4]: /ko/bits_ai/bits_investigation