---
description: 인시던트 해결 후 사후 분석 및 후속 작업 관리하기
further_reading:
- link: /incident_response/incident_management/post_incident/postmortems
  tag: 설명서
  text: 사후 분석 보고서 생성 및 관리
- link: /incident_response/incident_management/setup_and_configuration/templates
  tag: 설명서
  text: 사후 분석 및 메시지 템플릿 구성
- link: /incident_response/incident_management/post_incident/follow-ups
  tag: 설명서
  text: 인시던트 후속 작업 관리
- link: /incident_response/work_management/
  tag: 설명서
  text: Work Management를 통한 후속 작업 추적
title: 인시던트 이후
---
## 개요 {#overview}

인시던트가 해결되거나 안정적인 상태에 도달하면 인시던트 이후 단계가 시작됩니다. 이 중요한 단계는 발생한 사건을 기록하고, 교훈을 정리하고, 향후 유사한 인시던트를 방지하기 위한 후속 조치를 추적하는 데 중점을 둡니다. 인시던트 이후 워크플로는 인시던트 대응 프로세스의 지속적인 개선을 보장하고 조직 지식을 구축하는 데 도움이 됩니다.

인시던트 이후 활동을 통해 다음을 수행합니다.

- 인시던트 세부 정보, 근본 원인, 교훈을 기록하는 사후 분석 보고서를 생성합니다.
- 수정 및 프로세스 개선을 위한 후속 작업을 생성하고 관리합니다.
- 이해관계자에게 인시던트 상태 및 해결에 관한 정보를 전달합니다.
- 인시던트 패턴 및 해결 방법에 관한 지식 베이스를 구축합니다.

## 사후 분석 보고서 {#postmortems}

사후 분석 보고서는 인시던트 대응 프로세스의 지속적인 개선을 위해 필수적입니다. 인시던트를 해결한 후 Datadog Notebook, Confluence 페이지, Google Drive 문서를 사용하여 인시던트 정보가 자동으로 채워지는 사후 분석 보고서를 생성할 수 있습니다.

인시던트 사후 분석 보고서에는 일반적으로 다음 내용이 포함됩니다.

- **인시던트 요약**: 발생한 사건에 대한 개괄적인 설명
- **타임라인**: 인시던트 발생 중 사건들을 시간 순으로 배열
- **근본 원인 분석**: 근본 원인에 대한 상세 조사
- **영향 평가**: 고객 및 서비스 영향 메트릭
- **실행 항목**: 재발 방지를 위한 구체적인 작업
- **교훈**: 조직 차원의 핵심 시사점

사후 분석 보고서 생성 및 템플릿 구성에 대한 자세한 내용은 [Incident Postmortems][2]를 참조하세요.

## 후속 조치 {#follow-ups}

인시던트 조사 중에 팀은 주의가 필요하지만 즉각적인 문제 해결과 직접적인 관련이 없는 문제를 식별할 수 있습니다. 후속 조치를 통해 서비스를 복구하는 긴박한 상황에서 흐름을 놓치지 않고 나중에 처리할 항목을 기록할 수 있습니다.

일반적인 예로는 인프라 개선, 기술 부채, 프로세스 격차, 즉각적인 완화 조치에 비해 더 많은 시간이 필요한 근본 원인 수정 등이 있습니다.

후속 조치는 인시던트 발생 중 또는 이후에 언제든지 인시던트의 **수정** 탭 또는 슬랙에서 생성할 수 있습니다. 해결 후, 후속 조치를 [Jira][3](단방향 동기화) 또는 [Work Management][4](Jira 및 ServiceNow와 양방향 동기화)로 내보내 팀의 기존 워크플로에 통합할 수 있습니다.

후속 조치 생성, 관리, 내보내기에 대한 자세한 내용은 [Incident Follow-ups][5]를 참조하세요.

## 상태 페이지 {#status-pages}

상태 페이지를 통해 이해관계자에게 인시던트 상태 및 해결에 관한 정보를 전달합니다. 인시던트에서 직접 상태 페이지 공지를 생성 및 업데이트하여 고객이나 내부 팀에 서비스 가용성 및 인시던트 세부 정보를 전달할 수 있습니다. 상태 페이지 업데이트를 특정 인시던트 구성 요소에 연결하면 진행 중인 인시던트의 영향을 자동으로 반영할 수 있습니다.

상태 페이지를 인시던트 워크플로에 통합하는 방법에 대한 자세한 내용은 [Status Pages][6]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/incidents/settings
[2]: /ko/incident_response/incident_management/post_incident/postmortems
[3]: /ko/integrations/jira/
[4]: /ko/incident_response/work_management/
[5]: /ko/incident_response/incident_management/post_incident/follow-ups
[6]: /ko/incident_response/status_pages/