---
aliases:
- /ko/service_management/events/correlation/triage_and_notify/
further_reading:
- link: events/correlation/
  tag: 문서
  text: 이벤트 상관관계
title: 분류 및 알림
---
{{< img src="events/correlation/triage/triage.png" alt="이벤트 사이드 패널이 표시된 케이스 상세 페이지 케이스에서 서로 연관된 이벤트를 조사하고 관련 메트릭 분석" style="width:100%;" >}}

Event Management는 관련 이벤트를 연결하고 하나의 작업 항목으로 자동 통합합니다. 관련 로그와 메트릭, 경보를 발생시킨 모니터의 모든 컨텍스트를 활용하여 한곳에서 이슈를 분류하고 문제를 해결합니다.

[Correlation][1] 페이지에서 분석하려는 패턴을 찾고 해당 행 끝의 {{< ui >}}Triage Work Items{{< /ui >}}를 클릭합니다. 페이지 상단에서 {{< ui >}}Work Management{{< /ui >}}를 클릭하여 [Work Management][2]에서 연관된 이벤트가 포함된 모든 작업 항목을 확인할 수도 있습니다. Datadog은 관련 메트릭과 로그를 가져오므로 모든 관련 데이터를 한곳에서 확인하며 문제를 해결할 수 있습니다.

## Event Management 작업 항목 {#event-management-work-item}

| 기능 | 설명 | 
| ------  | ----------- | 
| 우선순위 | 연관된 경보 중 가장 높은 우선순위 |
| 속성 | 연관된 이벤트의 태그 사용자가 변경한 내용은 엔진에 의해 덮어써지지 않습니다. |
| 상태 | 시스템에서 자동으로 관리하며 사용자가 변경한 내용은 시스템에 의해 덮어써집니다. 모든 기반 경보가 정상 상태로 복구되면 작업 항목이 자동으로 해결되며 최대 활성 시간 범위 내에 경보가 다시 발생하면 자동으로 다시 열립니다. |
| 삭제 | 관련 없는 경보를 삭제하려면 해당 경보의 확인란을 선택합니다. 삭제된 경보는 다시 연결되지 않습니다. |
| 보강된 경보 | 일부 작업 항목에는 Datadog이 인프라 정보를 바탕으로 관련성이 있다고 판단한 지능형 경보가 자동으로 추가됩니다. 보강된 경보는 작업 항목의 속성, 우선순위 및 상태에 영향을 미치지 않습니다. |


Work Management 작업에 대한 자세한 내용은 [Work Management 설명서][5]를 참조하세요.

### 조사 {#investigation}
1. 작업 항목의 Overview에서 {{< ui >}}Investigation{{< /ui >}}을 클릭합니다.
1. {{< ui >}}Correlations{{< /ui >}} 섹션에서 경보와 이벤트 목록을 확인할 수 있습니다.
1. 경보나 이벤트를 클릭하면 해당 경보의 컨텍스트에서 모든 관련 메트릭과 로그를 확인할 수 있습니다.
1. (선택 사항) 작업 항목과 관련이 없는 경보나 이벤트를 선택하여 제거합니다.
1. {{< ui >}}Related Metrics{{< /ui >}} 섹션에서 모든 관련 메트릭을 비교하거나 태그를 기준으로 그룹화합니다.


## 알림 또는 티켓 생성 {#create-a-notification-or-ticket}

연관된 이벤트를 그룹화하면 그룹당 하나의 알림을 설정할 수 있습니다. 따라서 20개의 알림과 조사해야 할 잠재적 이슈 20개를 각각 처리하는 대신 하나의 작업 항목과 알림 하나로 관리할 수 있습니다. Work Management Projects 페이지에서 모든 경보를 통합합니다. Work Management에서 알림을 그룹화하는 방법은 다음과 같습니다.

### 티켓팅 {#ticketing}

{{< ui >}}Project Settings{{< /ui >}} 페이지에서 프로젝트의 알림을 전송할 통합을 설정합니다. Datadog은 수동 및 자동 티켓 생성과 양방향 동기화 기능을 제공하는 다음 통합을 지원합니다.
- ServiceNow
- Jira

설정 방법은 [Work Management 설정][3] 설명서를 참조하세요.

## 알림 {#notifications}

Work Management의 _보기_에서는 설정된 쿼리를 기준으로 작업 항목을 그룹화합니다. 이 쿼리와 일치하는 작업 항목이 생성되면 알림을 받도록 설정할 수 있습니다. Datadog은 {{< ui >}}Pagerduty{{< /ui >}}, {{< ui >}}Email{{< /ui >}}, {{< ui >}}Webhook{{< /ui >}}, {{< ui >}}Microsoft Teams{{< /ui >}} 및 {{< ui >}}Slack{{< /ui >}}을 지원합니다. 보기 생성 방법은 [Work Management 보기][4] 설명서를 참조하세요.

**참고**: 중복 알림을 없애려면 해당 모니터의 설정을 변경해야 합니다. 모니터 이벤트를 그룹화해도 개별 알림은 음소거되지 않습니다.


[1]: https://app.datadoghq.com/event/correlation
[2]: https://app.datadoghq.com/work?query=status%3AOPEN%20creation_source%3AEVENT_MANAGEMENT&page=1&page-size=25&sort=created_at
[3]: /ko/incident_response/work_management/settings#set-up-integrations
[4]: /ko/incident_response/work_management/view_and_manage#create-a-view
[5]: /ko/incident_response/work_management/view_and_manage