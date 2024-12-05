---
further_reading:
- link: /account_management/org_settings/
  tag: 설명서
  text: 조직 설정 자세히 알아보기
title: OAuth 앱
---
## 개요

[조직 설정][1]의 **OAuth Apps** 관리 페이지를 사용해 조직의 OAuth 애플리케이션을 관리하고 현황을 파악해보세요. 앱의 작동 범위, 애플리케이션에 허용된 권한과 액세스 승인을 받은 사용자 등을 관리할 수 있습니다.

{{< img src="account_management/oauth_apps/org-management-page.png" alt="Datadog의 OAuth Apps 관리 페이지" style="width:100%;">}}

## 구성
### 권한 허용

기본적으로 [Datadog Standard 및 Datadog Admin 역할][2]이 지정된 사용자는 OAuth 앱 관리 페이지에 접근할 수 있습니다. 소속 조직에 [커스텀 역할][3]이 정의된 경우, 사용자에게 `org_authorized_apps_read` 및 `org_authorized_apps_write` 권한 허용을 이용하여 커스텀 역할에 추가하세요.

Datadog Admin role 또는 `org_authorized_apps_write` 권한이 허용된 사용자만이 이 페이지에서 OAuth 애플리케이션을 관리할 수 있습니다. 관리 범위에는 애플리케이션 비활성화 또는 사용자의 OAuth 액세스 권한 취소 등이 포함됩니다.

### 활성화

활성화된 OAuth 애플리케이션은 필요한 권한을 가진 사용자가 대신 액세스를 승인하도록 해줍니다. Datadog 모바일 앱 및 [OAuth API 액세스][5]를 보유한 커스텀 [Datadog 앱][4] 등이 OAuth 애플리케이션에 포함됩니다.

### 비활성화

애플리케이션의 OAuth 액세스를 비활성화하면 애플리케이션이 소속 조직의 모든 사용자에게 접근할 권한을 취소하게 됩니다. 애플리케이션 설치 상태는 유지되나, 사용자가 더 이상 애플리케이션을 사용할 수 없습니다. 사용자가 앱 권한을 승인하고자 시도하는 경우에는 오류가 표시됩니다.

OAuth 앱 관리 페이지에서 애플리케이션을 비활성화하는 방법은 두 가지입니다.
1. 앱이 표시된 표에서 애플리케이션 위에 커서를 올리면 열 오른쪽에 **Disable** 버튼이 표시됩니다.
{{< img src="account_management/oauth_apps/disable-app-table.png" alt="앱 표의 비활성화 버튼" style="width:100%;">}}

2. 애플리케이션을 클릭하면 애플리케이션 상세 정보 화면이 열립니다. **Disable Application** 버튼을 클릭하세요.
{{< img src="account_management/oauth_apps/disable-app-detailed.png" alt="앱 상세 정보 화면의 비활성화 버튼" style="width:100%;">}}

**참조**: 앱을 다시 활성화하는 경우 이전에 애플리케이션 권한을 승인한 사용자도 한 번 더 앱을 승인해야 앱에 액세스 권한이 다시 부여됩니다.

### 액세스 권한 취소

사용자의 애플리케이션 OAuth 액세스 권한을 취소하면 애플리케이션에 대한 모든 접근 권한이 삭제됩니다. 사용자가 애플리케이션 승인에 필요한 권한을 보유한 경우, 앱을 재승인하면 다시 액세스가 가능해집니다.
{{< img src="account_management/oauth_apps/revoke-user.png" alt="앱 상세 정보 화면이 비활성화 버튼" style="width:100%;">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/
[2]: /ko/account_management/rbac/permissions/#general-permissions
[3]: /ko/account_management/rbac/?tab=datadogapplication#custom-role
[4]: /ko/developers/datadog_apps/
[5]: /ko/developers/datadog_apps/#oauth-api-access