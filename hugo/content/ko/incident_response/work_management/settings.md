---
aliases:
- /ko/service_management/case_management/settings/
- /ko/incident_response/case_management/settings/
further_reading:
- link: /incident_response/work_management/troubleshooting
  tag: 문서
  text: 타사 통합 문제 해결
- link: /incident_response/work_management/customization
  tag: 문서
  text: Work Management 사용자 지정
title: 설정
---
## 개요 {#overview}

프로젝트 설정에서 액세스 제어를 관리하고 자동 상태 전환을 구성하며 Jira 및 ServiceNow와 같은 타사 통합을 설정하는 등의 작업을 수행할 수 있습니다.

## 세분화된 액세스 제어 {#granular-access-control}

기본적으로 프로젝트 및 작업 항목에 대한 액세스는 제한되지 않습니다. [세분화된 액세스 제어][1]를 사용하여 프로젝트 수준에서 사용자, 팀, 역할 또는 전체 조직의 권한을 관리할 수 있습니다. 사용할 수 있는 4가지 권한 세트가 있습니다.
- **관리자**: 사용자가 프로젝트의 작업 항목, 보기, 설정 및 권한을 생성하고 편집할 수 있으며 프로젝트를 삭제할 수 있습니다.
- **기여자**: 사용자가 작업 항목을 생성 및 편집하고 작업 항목에 대해 코멘트를 달 수 있습니다. 기여자는 설정, 권한 또는 프로젝트를 변경할 수 없습니다.
- **열람자**: 사용자가 프로젝트의 모든 작업 항목, 보기 및 설정을 조회하거나 감시할 수 있습니다. 열람자는 작업 항목을 생성, 편집하거나 작업 항목에 코멘트를 달 수 없습니다.
- **액세스 권한 없음**: 사용자가 프로젝트의 작업 항목, 보기 또는 설정을 조회할 수 없습니다.

**참고:** Work Management와 통합되는 다른 Datadog 제품(예: Monitors)은 프로젝트의 액세스 설정과 관계없이 작업 항목을 자동으로 생성할 수 있습니다.

## 상태 전환 {#status-transitions}

노이즈를 줄이려면 프로젝트 설정의 상태 전환 페이지에서 7일, 14일, 30일, 90일 또는 180일 동안 활동이 없으면 작업 항목이 자동으로 닫히도록 구성하세요. 활동 없음은 속성 업데이트나 코멘트 작성과 같이 사람이 시작한 작업이 없는 상태를 정의합니다. Datadog에서는 하루에 한 번 적어도 선택한 기간에 아무런 활동이 없는 작업 항목이 있는지 확인하여 정리합니다.

## 통합 설정 {#set-up-integrations}

Work Management는 다양한 기본 통합 및 타사 통합을 제공하므로 기존 워크플로 및 프로세스에 Datadog 솔루션을 쉽게 통합할 수 있습니다. Jira, ServiceNow 및 Linear 통합을 통해 Datadog의 풀스택 텔레메트리를 사용하여 작업 항목을 처리하는 동시에 해당 타사 시스템에 조사 기록을 유지할 수 있습니다.

### 모니터링 {#monitors}

<div class="alert alert-info">모니터링 핸들 사용 <code>@case-&lt;project_handle&gt;</code> Work Management의 이전 이름인 Case Management를 반영하는 용어</div>

[프로젝트 설정 페이지][2]로 이동하여 **Integrations** > **Datadog Monitors**를 클릭한 다음 토글을 클릭하여 @case-<project_handle>를 가져옵니다.

모니터링에서 프로젝트 핸들을 사용하여 작업 항목을 자동으로 생성할 수 있습니다. 모니터링 메시지 본문에 `@case-<project_handle>`을 포함합니다. Datadog에서는 프로젝트 이름을 기반으로 핸들을 제안하지만 제안을 그대로 수락하거나 원하는 대로 수정할 수 있습니다.

### 타사 통합 {#third-party-integrations}
타사 통합을 구성하려면 [알림 및 티켓 만들기][3]로 이동하세요.

## 사용자 지정 작업 유형 및 속성 {#custom-work-types-and-attributes}

프로젝트에 사용자 지정 작업 유형 및 속성을 추가하여 조직의 요구 사항에 맞게 작업 항목을 조정할 수 있습니다. 자세한 내용은 [Work Management 사용자 지정][4]을 참조하세요.


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/rbac/granular_access
[2]: https://app.datadoghq.com/work/settings
[3]: /ko/incident_response/work_management/notifications_integrations
[4]: /ko/incident_response/work_management/customization