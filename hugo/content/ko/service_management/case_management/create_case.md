---
further_reading:
- link: service_management/case_management/view_and_manage
  tag: 설명서
  text: 사례 보기 및 관리
- link: service_management/case_management/customization
  tag: 설명서
  text: Case Customization
title: 케이스 생성
---

## 개요

케이스는 Datadog에서 [수동](#manual-case-creation)이나 [자동으로](#automatic-case-creation) 또는 API를 사용하여 [프로그래밍 방식으로](#api) 생성할 수 있습니다. 케이스에는 표준과 보안의 두 가지 유형이 있습니다. 보안 신호와 Sensitive Data Scanner에서 생성된 케이스는 자동으로 보안 케이스로 지정됩니다. 보안 케이스 유형은 표준 케이스 유형의 모든 기능을 포함하며, 케이스 종료 사유(테스트, 오탐 또는 일회성 예외)를 지정하기 위한 필수 필드가 있습니다.

## 수동 케이스 생성

1. [Case Management Page][1]로 이동합니다.
1. 케이스를 생성할 프로젝트를 선택합니다. **참고**: 케이스는 하나의 프로젝트에만 속할 수 있습니다.
1. **New Case**를 클릭합니다.
1. 케이스의 제목을 입력합니다.
1. [케이스 유형](#case-types)을 선택합니다.
1. 제목을 추가합니다.
1. (옵션) 설명을 추가합니다.
1. **Create Case**를 클릭하여 완료합니다.

다음 제품에서 케이스를 수동으로 생성할 수도 있습니다.

| 제품 | 설명서    |
| ------  | ----------- |
| 모니터링 | - [모니터 상태 페이지][2]에서 옵션으로 모니터 범위를 특정 타임 프레임이나 모니터 그룹으로 제한할 수 있습니다. 그런 다음 **Actions** 드롭다운 메뉴를 클릭하고 **Create a case**를 선택합니다.<br> - Slack에서 모니터 알림의 **Create case**를 클릭합니다. |
| 보안 신호 | Security Signal을 클릭하여 사이드 패널을 엽니다. **Escalate Investigation**을 클릭하고 **Create a case**를 선택합니다. |
| Error Tracking | Error Tracking 이슈를 클릭하여 사이드 패널을 엽니다. 그런 다음 **Actions**를 클릭하고 **Create a case**를 선택합니다. |
| Watchdog | 알림을 클릭하여 사이드 패널을 엽니다. **Actions** 드롭다운 메뉴를 클릭하고 **Create a case**를 선택합니다. |
| Event Management(원시 이벤트) | 이벤트를 클릭하여 사이드 패널을 엽니다. **Actions** 드롭다운 메뉴를 클릭하고 **Create a case**를 선택합니다. |
| Cloud Cost Management | 비용 권장 사항을 클릭하여 사이드 패널을 엽니다. 그런 다음 **Create case**를 클릭합니다. |
| Sensitive Data Scanner | Sensitive Data Scanner 이슈 옆의 **Create case**를 클릭합니다.  |
| Slack  | Slack의 모니터 알림의 **Create Case** 버튼을 클릭합니다.  |

## 자동 케이스 생성

다음 제품을 구성하여 자동으로 케이스를 생성합니다.
| Product | Instructions |
| ------ | ----------- |
| Monitors | [Project Settings 페이지][4]로 이동하여 **Integrations** > **Datadog Monitors**를 클릭하고 토글을 클릭해 @case-<project_handle>을 가져옵니다.<br><br> 모니터를 생성할 때 **Configure notifications and automations** 섹션에 `@case-{project_handle}`을 포함하세요. 모니터가 다른 상태로 전환되면 케이스가 자동으로 생성됩니다. 특정 모니터 전환에 대해서만 케이스를 생성하려면 [조건부 변수][3]를 사용합니다. 예를 들어 모니터가 트리거될 때만 케이스를 생성하려면 `@case` 멘션을 `{{#is_alert}}` 및 `{{/is_alert}}`로 래핑하면 됩니다.<br><br> **Auto-close cases when the monitor group resolves**를 토글하여 수동 정리 작업을 줄입니다.|
| Event Management(상관관계) | Event Management에서 Datadog 및 타사 소스의 이벤트를 집계하도록 구성된 상관관계는 자동으로 케이스를 생성합니다.   |
| Workflow Automation | 1. 새 워크플로나 기존 워크플로의 워크플로 빌더에 단계를 추가하고 "Case Management"를 검색합니다.<br> 2. **Create Case** 작업을 선택합니다.<br> 3. 워크플로가 모니터나 보안 신호 트리거를 기반으로 실행되도록 구성된 경우, 관련 워크플로 트리거를 추가하고 원하는 리소스에 워크플로 핸들을 추가했는지 확인하세요. 자세한 내용은 [워크플로 트리거][6]를 참조하세요.|
| Error Tracking | Error Tracking에서는 이슈에 댓글이 달리거나 담당자에게 할당될 때 자동으로 케이스가 생성됩니다. |

## 케이스 유형

케이스를 생성할 때 케이스 유형을 추가합니다. 수동 생성과 자동 생성 간의 구성 방식 선택 시에 모든 케이스 유형을 사용할 수 있는 것은 아닙니다. 예를 들어 수동으로 케이스를 생성할 때는 `Standard`, `Security` 및 `Change Request`, `Event Management` 유형만 사용할 수 있습니다.

커스텀 케이스 유형을 추가 및 사용 설정하려면 [Case Customization][7]을 참조하세요.

| 케이스 유형       | 설명                                                                 |
|------------------|-----------------------------------------------------------------------------|
| 표준         | 운영 작업, 조사 등을 위한 범용 케이스.     |
| 변경 요청   | 변경 관리 워크플로에서 계획 또는 승인된 변경 사항을 추적하는 데 사용됩니다.   |
| Event Management | Event Management 제품과 통합하여 상호 연관된 이벤트를 관리할 수 있습니다.    |
| Security         | 보안 팀 및 제품에서 조사 또는 경고를 관리하는 데 사용됩니다.     |
| Error Tracking   | Error Tracking 제품에 연결하여 애플리케이션 이슈를 추적하고 해결합니다. |
| 커스텀 유형      | 커스텀 케이스 유형을 추가합니다. 자세한 내용은 [Case Customization][7]을 참조하세요. |

## API

[API 엔드포인트][5]를 통해 케이스를 생성합니다.

**참고**: 해당 엔드포인트에는 `cases_write` 권한 범위가 필요합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cases
[2]: /ko/monitors/status/
[3]: /ko/monitors/notify/variables/?tab=is_alert#conditional-variables
[4]: https://app.datadoghq.com/cases/settings
[5]: /ko/api/latest/case-management/#create-a-case
[6]: /ko/service_management/workflows/trigger/
[7]: /ko/service_management/case_management/customization