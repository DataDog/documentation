---
description: 적절한 권한, 시간 기반 쿼리 및 규정 준수를 위한 Audit Trail 로깅을 사용하여 Datadog에서 로그 데이터를 삭제하세요.
further_reading:
- link: /account_management/rbac/
  tag: 설명서
  text: 역할 및 권한에 대해 알아보기
- link: /account_management/audit_trail/
  tag: 설명서
  text: Audit Trail로 사용자 활동 모니터링하기
title: 데이터 삭제하기
---
이 페이지에서는 Datadog으로 수집되지 말았어야 할 민감한 데이터를 삭제하는 방법을 설명합니다.

## 로그가 아닌 데이터 삭제{#delete-non-logs-data}

로그 이외의 제품에서 데이터를 삭제하려면 [지원팀][1]에 요청하세요.

## 로그 데이터 삭제{#delete-logs-data}

UI를 사용하여 로그 제품에서 데이터를 삭제할 수 있습니다.

### 삭제 기능 활성화{#enable-deletion-feature}

로그 데이터 삭제는 조직 관리자만 활성화할 수 있습니다. 로그 데이터 삭제를 활성화하려면 다음 단계를 따르세요.
1. Organization Settings에서 Preferences로 이동합니다.
2. {{< ui >}}Logs Data Deletion{{< /ui >}}을 활성화하고 저장합니다.

사용자에게 로그 삭제 권한을 부여하려면 다음 단계를 따르세요.
1. Organizational Settings에서 [Roles][3]로 이동합니다.
2. {{< ui >}}Logs Delete Data{{< /ui >}} 권한이 있는 역할을 생성합니다.

### 삭제 시작 {#start-deletions}

<div class="alert alert-info">삭제 요청은 제출 후 최대 10일까지 취소할 수 있습니다.</div>

<div class="alert alert-danger"><strong>로그의 경우</strong>: 데이터 삭제는 10일 후 영구적으로 완료됩니다. 삭제 요청을 신중하게 검토하세요.</div>

데이터를 삭제하려면 다음 단계를 따르세요.

1. Organization Settings에서 [Data Deletion][4]으로 이동합니다.
2. 삭제할 제품을 선택합니다. 
3. 검색할 기간을 선택합니다.
4. 삭제할 기간의 이벤트를 쿼리합니다.
5. 검색 결과에 삭제하려는 항목이 표시되면 오른쪽 하단의 {{< ui >}}Delete{{< /ui >}} 버튼을 클릭합니다.
6. 확인란을 선택하고 요청된 확인 텍스트를 입력하여 삭제를 확인합니다. 
7. {{< ui >}}Confirm{{< /ui >}}을 클릭합니다.

요청을 확인하면 즉시 삭제가 시작되며 대상 데이터에는 액세스할 수 없습니다.

[Deletion History][5] 탭에서 삭제 상태를 확인할 수 있습니다. 검색 문자열 `@asset.name:"Data Deletion"`을 사용하여 [Audit Trail][6]에서 삭제 항목을 검색할 수도 있습니다.

**참고**:
- 확인 후 즉시 삭제가 시작됩니다. 경우에 따라 작업이 시작된 후 도착한 레코드는 해당 레코드가 발생한 시간 범위의 삭제 처리가 이미 완료되어 삭제되지 않을 수 있습니다.
- 레코드를 삭제할 때 해당 레코드에서 파생된 데이터는 삭제되지 않습니다(예: 로그에서 생성된 메트릭).
- 동시에 최대 5개의 삭제를 실행할 수 있습니다.

### 삭제 취소 {#cancel-deletions}

**참고**: 삭제 요청이 생성되면 10일 동안 복구 가능한 상태로 유지됩니다. 이 기간 동안 삭제된 데이터는 Datadog에서 액세스할 수 없지만 삭제 요청을 취소하면 복구됩니다.

삭제를 취소하려면 {{< ui >}}Upcoming{{< /ui >}} 또는 {{< ui >}}Done (Recoverable){{< /ui >}} 작업에서 {{< ui >}}Cancel{{< /ui >}}을 클릭하세요.

### 삭제 감사 {#audit-deletions}

삭제 항목은 [Deletion History][5]에 90일 동안 기록됩니다. 또한 요청한 사용자의 세부 정보와 함께 [Audit Trail][6]에도 기록됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/support/
[2]: /ko/account_management/rbac/permissions/
[3]: https://app.datadoghq.com/organization-settings/roles
[4]: https://app.datadoghq.com/organization-settings/data-deletion
[5]: https://app.datadoghq.com/organization-settings/data-deletion?data-deletion-tab=deletion-history
[6]: https://app.datadoghq.com/audit-trail?query=@asset.name:"Data%20Deletion"