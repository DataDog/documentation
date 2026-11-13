---
aliases:
- /ko/service_management/events/correlation/maintenance_windows/
further_reading:
- link: events/correlation/
  tag: 설명서
  text: 이벤트 상관관계
title: 유지 관리 기간
---
## 개요 {#overview}
Datadog Event Management는 예약된 시스템 유지 관리 중에 작업 항목 알림을 억제하기 위한 유지 관리 기간을 지원합니다. 유지 관리 조건과 일치하고 유지 관리 기간 내에서 발생하는 작업 항목은 자동으로 보관 처리됩니다.

## 유지 관리 기간 생성 {#create-a-maintenance-window}
<div class="alert alert-danger">Work Management 공유 설정 쓰기(cases_shared_settings_write) 권한이 있어야 합니다. 자세한 내용은 <a href="https://docs.datadoghq.com/account_management/rbac/permissions/#case_management">Datadog 역할 권한</a>을 참조하세요.</div>

[유지 관리 기간][2]을 생성하려면 다음 단계를 따르세요.
1. {{< ui >}}Event Management Settings{{< /ui >}}로 이동합니다.
1. 왼쪽 탐색 모음에서 **Work Item Attributes**(작업 항목 속성) 옆에 있는 {{< ui >}}Maintenance Windows{{< /ui >}}를 선택합니다.
1. 오른쪽 상단에서 {{< ui >}}New Maintenance Window{{< /ui >}}를 클릭합니다.
1. 유지 관리 기간 이름을 입력합니다.
1. 태그나 속성을 사용하여 이 유지 관리 기간의 영향을 받을 작업 항목에 대한 조건을 설정합니다. 기본적으로 Event Management 작업 항목은 상관관계가 있는 경보에서 태그를 상속합니다.
1. 유지 관리 기간의 시작 시간과 종료 시간을 선택합니다.
1. 유지 관리 기간 세부 정보를 검토하고 {{< ui >}}Save{{< /ui >}}를 클릭합니다.

저장하면 유지 관리 기간이 유지 관리 기간 목록에 추가됩니다. 이 목록에서 세부 정보를 검토하거나, 행을 선택하여 업데이트하거나, 행 오른쪽에 있는 휴지통 아이콘을 선택하여 삭제할 수 있습니다.

## ServiceNow 변경 사항과 유지 관리 기간 동기화 {#sync-maintenance-windows-with-servicenow-changes}

ServiceNow 변경 사항과 유지 관리 기간을 동기화하여 ServiceNow 변경 사항이 작업 항목 유지 관리 기간을 생성, 업데이트 또는 삭제하도록 하려면 다음 단계를 따르세요.
1. [Datadog으로 변경 요청 전달][3]을 참조하고 단계에 따라 ServiceNow 변경 사항을 수집합니다.
1. {{< ui >}}Event Management Settings{{< /ui >}}로 이동합니다.
1. 왼쪽 탐색 모음에서 **Work Item Attributes**(작업 항목 속성) 옆에 있는 {{< ui >}}Maintenance Windows{{< /ui >}}를 선택합니다.
1. 오른쪽 상단의 {{< ui >}}Sync from ServiceNow{{< /ui >}}를 클릭합니다.
1. 필요에 따라 유지 관리 기간을 생성, 업데이트 또는 삭제해야 하는 ServiceNow 변경 사항에 대해 필터를 정의합니다.
1. 태그나 속성을 사용하여 이 유지 관리 기간의 영향을 받을 작업 항목에 대한 조건을 설정합니다. 속성 앞에 `$`를 붙여 ServiceNow 변경 사항의 값을 동적 참조할 수 있습니다.
1. 유지 관리 기간의 시작 및 종료 시간에 사용할 ServiceNow 변경 날짜/시간 필드를 설정합니다.


[1]: https://docs.datadoghq.com/ko/account_management/rbac/permissions/#case_management
[2]: https://app.datadoghq.com/event/settings/maintenance-windows
[3]: https://docs.datadoghq.com/ko/integrations/servicenow/?tab=changerequesteventforwarding#forward-change-request-events-to-datadog