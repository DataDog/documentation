---
further_reading:
- link: service_management/events/correlation/
  tag: 설명서
  text: 이벤트 상관관계
title: 분류 및 알림
---

{{< img src="service_management/event/correlation/triage/triage.png" alt="사이드 패널이 있는 사례 상세 페이지입니다. 사례에서 상호 연관된 이벤트를 조사하고 관련 메트릭을 분석하세요." <txprotected>style="width:100%;" >}}

이벤트 관리팀은 관련 이벤트를 상호 연관시켜 자동으로 하나의 케이스로 통합합니다. 관련 로그, 관련 메트릭, 관련 경고 모니터의 모든 컨텍스트를 가져와 한 곳에서 문제를 분류하고 문제를 해결합니다.

[상관관계][1] 페이지에서 분석하려는 패턴을 찾아 같은 행 끝에 있는 **사례 분류**를 클릭합니다. 또한 페이지 상단의 **사례 관리**를 클릭하면 [사례 관리][2]에서 이벤트 연관된 모든 사례를 볼 수 있습니다. Datadog 관련 메트릭 및 로그를 가져와서 한 곳에서 모든 관련 데이터로 문제를 해결할 수 있습니다.

## 이벤트 관리 사례

{{< img src="service_management/events/correlation/triage/event_management_case_detail.png" alt="사례 상세 정보 페이지 - 개요" style="width:100%;" >}}


| 기능 | 설명 | 
| ------  | ----------- | 
| 우선순위 | 연계된 알림의 가장 높은 우선순위 |
| 속성 | 연계된 이벤트의 태그. 사용자 업데이트는 엔진으로 재정의되지 않음 |
| 상태 | 시스템에서 자동으로 관리되는 경우 사용자 업데이트가 시스템에 의해 재정의됩니다. 밑줄이 그어진 모든 알림이 복구되면 사례가 자동으로 해결되고 최대 존속 시간 동안 알림이 다시 트리거되면 자동으로 다시 열립니다. |
| 삭제 | 관련 없는 알림을 삭제하려면 알림의 확인란을 선택하면 삭제된 알림은 다시 연계되지 않습니다. |
| 강화된 알림 | 일부 사례는 인프라스트럭처를 기반으로 Datadog와 관련성이 있다고 생각하는 지능형 알림으로 자동으로 보강됩니다. 강화된 알림은 사례 속성, 우선 순위 및 상태에 영향을 미치지 않습니다. |


사례 관리 운영에 대한 자세한 내용은 [사례 관리 문서][5]를 참조하세요.

### 조사
1. 사례 개요에서 **조사**를 클릭합니다.
1. **상관관계** 섹션에서 알림의 목록 및 이벤트를 확인할 수 있습니다.
1. 알림을 클릭하거나 이벤트를 클릭하면 해당 알림과 관련된 모든 관련 메트릭 및 로그를 볼 수 있습니다.
1. (선택적) 케이스와 관련이 없는 알림을 선택하거나 삭제하려는 알림(이벤트)을 선택합니다.
1. *관련 메트릭* 섹션에서 태그별로 모든 관련 메트릭 또는 그룹을 비교합니다.


## 알림 또는 티켓 생성하기

연계된 이벤트를 사용하면 그룹에 대해 단일 알림을 설정할 수 있습니다. 따라서 조사할 20개의 잠재적 문제와 20개 알림 대신, 단일 사례 및 단일 알림이 존재합니다. 사례 관리 프로젝트 페이지에서 모든 알림을 결합하세요. 사례 관리에서 알림을 그룹화하는 몇 가지 방법이 있습니다.

### 티켓팅

프로젝트 설정 페이지에서 알림을 전송할 프로젝트를 원하는 통합을 설정합니다. Datadog는 수동 및 자동 티켓 생성 및 양방향 동기화를 통해 다음 통합을 지원합니다.
- ServiceNow
- Jira

설정 방법은 [사례 관리 설정][3] 설명서를 참조하세요.

## 알림

사례 관리에서는 구성된 쿼리를 기준으로 사례를 _보기_합니다. 쿼리와 일치하는 사례가 생성되면 알림을 설정할 수 있습니다. Datadog에서는 **Pagerduty**, **Email**, **Webhook**, **Microsoft Teams** 및 **Slack**을 지원합니다. 보기를 생성하는 방법을 알아보려면 [사례 관리 보기][4] 설명서를 참조하세요.

**참고**: 여러 개의 알림을 제거하려면 기본 모니터를 재구성해야 합니다. 모니터 이벤트를 그룹화해도 개별 알림 은 음소거되지 않습니다.


[1]: https://app.datadoghq.com/event/correlation
[2]: https://app.datadoghq.com/cases?query=status%3AOPEN%20creation_source%3AEVENT_MANAGEMENT&page=1&page-size=25&sort=created_at
[3]: /ko/service_management/case_management/settings#set-up-integrations
[4]: /ko/service_management/case_management/view_and_manage#create-a-view
[5]: /ko/service_management/case_management/view_and_manage