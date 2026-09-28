---
aliases:
- /ko/account_management/org_settings/oauth_apps/
description: 권한, 애플리케이션 범위 관리, 사용자 액세스 및 애플리케이션 상태 제어 등, 조직의 OAuth 애플리케이션을 관리하고 모니터링합니다.
further_reading:
- link: /account_management/org_settings/
  tag: 설명서
  text: 조직 설정에 대해 자세히 알아보기
- link: /account_management/rbac/permissions/
  tag: 설명서
  text: Datadog 역할 권한
title: 모바일 및 타사 액세스
---
## 개요 {#overview}

[조직 설정][1]의 {{< ui >}}Mobile and Third-Party Access{{< /ui >}} 페이지를 사용하여 조직의 OAuth 애플리케이션을 관리하고, 애플리케이션에 부여된 범위와 권한, 그리고 액세스를 승인한 사용자 등을 조회할 수 있습니다.

{{< img src="account_management/mobile_third_party_access/org-management-page.png" alt="Datadog의 모바일 및 타사 액세스 관리 페이지" style="width:100%;">}}

## 설정 {#setup}
### 권한 {#permissions}

기본적으로 [Datadog Admin 역할][2]이 있는 사용자는 모바일 및 타사 액세스 페이지에 액세스할 수 있습니다. 조직에 [사용자 지정 역할][3]이 정의되어 있는 경우, `org_authorized_apps_read` 및 `org_authorized_apps_write` 권한이 포함된 사용자 지정 역할에 사용자를 추가합니다.

Datadog Admin 역할 또는 `org_authorized_apps_read` 및 `org_authorized_apps_write` 권한이 허용된 사용자만이 애플리케이션을 비활성화하거나 사용자의 OAuth 액세스를 취소하는 등 이 페이지에서 OAuth 애플리케이션을 관리할 수 있습니다.

### 활성화하기 {#enable}

활성화된 OAuth 애플리케이션은 필요한 권한을 보유한 사용자가 자신을 대신해 애플리케이션이 액세스하도록 승인할 수 있게 합니다. OAuth 애플리케이션에는 Datadog 모바일 앱이 포함됩니다.

### 비활성화하기 {#disable}

애플리케이션에 대한 OAuth 액세스를 비활성화하면 조직의 모든 사용자에 대해 해당 애플리케이션에 대한 액세스 권한이 취소됩니다. 애플리케이션은 설치된 상태로 유지되지만, 사용자는 더 이상 애플리케이션을 사용할 수 없으며 승인을 시도할 경우 오류 메시지가 표시됩니다.

모바일 및 타사 액세스 페이지에서 애플리케이션을 비활성화하려면 다음 단계를 따르세요.
1. 행 오른쪽에 {{< ui >}}Disable{{< /ui >}} 버튼이 표시되도록 앱 표에서 애플리케이션 위로 마우스를 가져갑니다.
{{< img src="account_management/mobile_third_party_access/disable-app-table.png" alt="마우스를 가져갔을 때 비활성화 버튼이 표시되는 앱 표" style="width:100%;">}}

2. 애플리케이션을 클릭해 애플리케이션 상세 조회 화면을 열고, {{< ui >}}Disable Application{{< /ui >}} 버튼을 클릭합니다.
{{< img src="account_management/mobile_third_party_access/app-detail-scopes.png" alt="범위와 Disable Application 버튼이 표시되는 애플리케이션 세부 정보 조회 화면" style="width:100%;">}}

**참조**: 애플리케이션을 다시 활성화하는 경우, 이전에 애플리케이션을 승인한 사용자도 다시 승인하여 액세스 권한을 다시 확보해야 합니다.

### 액세스 권한 취소하기 {#revoke-access}

해당 애플리케이션에 대한 사용자의 OAuth 액세스를 취소하면 해당 애플리케이션에 대한 모든 액세스 권한이 제거됩니다. 애플리케이션 승인 필수 권한을 보유한 사용자는 애플리케이션을 다시 승인하여 액세스 권한을 다시 확보할 수 있습니다.

{{< img src="account_management/mobile_third_party_access/revoke-user.png" alt="Users 탭에서 사용자의 액세스 권한을 취소할 수 있는 옵션이 표시된 애플리케이션 세부 정보 조회 화면" style="width:100%;">}}

### 애플리케이션 범위 관리 {#application-scope-management}

애플리케이션 범위 관리를 활성화하여 애플리케이션에 허용된 범위를 수정하세요.

범위를 추가하거나 제거하면 조직의 모든 사용자에 대한 애플리케이션 액세스에 영향을 줍니다. 범위를 비활성화하면 해당 범위가 포함된 기존 승인이 취소됩니다. 영향을 받는 사용자는 남은 허용 범위로 액세스 권한을 다시 확보하려면 애플리케이션을 다시 승인해야 합니다. 범위를 활성화해도 기존 승인에는 추가되지 않습니다. 사용자는 새로 허용된 범위를 부여하려면 애플리케이션을 다시 승인해야 합니다.

{{< ui >}}Automatically allow new scopes{{< /ui >}}를 사용하여 구성을 저장한 후 애플리케이션이 요청하기 시작하는 범위를 Datadog이 처리하는 방법을 선택하세요.

- 선택하면 Datadog이 새로 요청된 범위를 자동으로 허용합니다. 명시적으로 비활성화한 범위는 계속 차단됩니다.
- 선택을 해제하면 Datadog은 관리자가 허용할 때까지 새로 요청된 범위를 차단합니다.

Datadog 모바일 앱의 경우 필수 범위는 항상 허용되며 비활성화할 수 없습니다.

1. {{< ui >}}Mobile and Third-Party Access{{< /ui >}} 페이지에서 애플리케이션을 클릭하여 세부 정보 조회 화면을 엽니다.

2.  {{< ui >}}Scopes{{< /ui >}} 탭을 선택하고 각 범위에 대한 {{< ui >}}Allowed{{< /ui >}} 확인란을 사용하여 애플리케이션에 해당 범위를 부여할지 여부를 제어합니다.

3. {{< ui >}}Automatically allow new scopes{{< /ui >}}를 선택하거나 선택 해제하여 구성을 저장한 후, 애플리케이션이 요청하는 새 범위를 Datadog이 자동으로 허용할지 여부를 선택합니다.

4. {{< ui >}}Enable{{< /ui >}} 또는 {{< ui >}}Save{{< /ui >}}를 클릭하여 범위 구성을 저장합니다.

{{< img src="account_management/mobile_third_party_access/scope-restrictions-enable-2.png" alt="Automatically allow new scopes 및 허용된 범위 제어 항목이 표시된 애플리케이션 범위 관리 조회 화면" style="width:100%;">}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/
[2]: /ko/account_management/rbac/permissions/#general-permissions
[3]: /ko/account_management/rbac/?tab=datadogapplication#custom-role