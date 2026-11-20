---
description: Organization Settings 섹션에서 Datadog 조직의 사용자, 팀, 인증, API 키, 역할 및 보안 설정을
  관리하세요.
further_reading:
- link: /account_management/api-app-keys/
  tag: 설명서
  text: API와 애플리케이션 키
- link: /account_management/users/
  tag: 설명서
  text: 사용자 관리
title: Organization Settings
---
## 개요 {#overview}
Organization Settings 섹션은 [관리자][1]가 왼쪽 탐색 메뉴 하단의 계정 메뉴에서 {{< ui >}}Organization Settings{{< /ui >}}를 클릭하거나, 개인 설정 페이지 상단의 헤더 드롭다운에서 {{< ui >}}Organization Settings{{< /ui >}}를 선택하여 이용할 수 있습니다.

{{< img src="account_management/org_settings/nav.png" alt="Datadog의 Organization Settings로 이동합니다." style="width:80%;" >}}

Organization Settings를 통해 사용자, 그룹, RBAC, 키 및 토큰을 관리할 수 있습니다. 이 페이지는 모든 섹션과 {{< ui >}}Organization Settings{{< /ui >}}의 특정 작업에 대해 알아볼 수 있는 문서 위치를 설명합니다.

## 신원 및 계정 {#identity-accounts}

### 사용자 {#users}

사용자를 추가, 수정 및 비활성화하려면 [사용자 관리][2] 문서를 확인합니다.

### 팀 {#teams}

Datadog에서 에셋을 조직하기 위한 팀을 관리하려면 [팀][3] 문서를 확인합니다.

### 서비스 계정 {#service-accounts}


[서비스 계정][4]은 팀 간에 공유되는 애플리케이션 키 및 기타 리소스를 소유하는 데 사용할 수 있는 비대화형 계정입니다. 서비스 계정 애플리케이션 키는 키를 생성한 개인이 한 번만 볼 수 있습니다. 서비스 계정을 사용하면 애플리케이션이나 스크립트를 특정 개인과 연결하지 않고도 Datadog API에 액세스할 수 있습니다.

## 인증 {#authentication}

### 로그인 방법 {#login-methods}


{{< ui >}}Login Methods{{< /ui >}} 탭에는 비밀번호, Google 및 SAML 인증 설정이 표시됩니다. {{< ui >}}Enabled by Default{{< /ui >}} 드롭다운을 사용하여 각각을 전환할 수 있습니다. "SAML Strict" 또는 다른 유형의 로그인에 대해 엄격하게 설정하려면 다른 로그인 방법 유형을 비활성화하세요. 사용자 관리 탭에서 사용자별 재정의를 허용하면 필요한 경우 사용자가 다른 로그인 방법으로 로그인하도록 할 수 있습니다.

[로그인 방법 설정하기][5] 문서를 참조하여 Datadog 조직에 로그인하는 사용자를 인증합니다.

#### SAML 설정 {#saml-settings}

SAML 설정 방법을 알아보려면 [SAML을 사용한 싱글 사인온 문서][6]를 참조하세요.

### SAML 그룹 매핑 {#saml-group-mappings}

이 기능을 활성화하면 SAML을 통해 Datadog 계정에 로그인하는 사용자의 현재 역할이 영구적으로 제거되고 새로운 역할이 다시 할당됩니다. Identity Provider로부터 전달된 SAML 어설션과 회원님이 생성한 매핑이 각 사용자의 새로운 역할을 결정합니다.

SAML을 통해 로그인한 사용자가 Datadog 역할에 매핑되는 값이 없는 경우, 모든 역할이 영구적으로 제거됩니다. 해당 사용자는 더 이상 로그인할 수 없습니다.
매핑을 생성하고 설정하는 방법을 알아보려면 [SAML 속성 매핑 문서][7]를 참조하세요.

## 액세스 {#access}

### API 키 {#api-keys}

이 섹션에서는 목록의 모든 API 키를 확인하고, 복사하고, 취소할 수 있습니다. API 키는 조직에 대해 고유합니다. Datadog Agent가 Datadog에 메트릭 및 이벤트를 제출하려면 API 키가 필요합니다. 키 생성, 편집 및 취소에 대한 자세한 내용은 [API 키 문서][8]를 참조하세요.

### 애플리케이션 키 {#application-keys}

애플리케이션 키를 이름, ID 또는 소유자별로 필터링하거나 {{< ui >}}Only My Keys{{< /ui >}} 토글을 클릭하여 본인이 소유한 애플리케이션 키만 볼 수 있습니다. 키 추가 및 제거에 대한 자세한 내용은 [애플리케이션 키 문서][8]를 참조하세요.

### 역할 {#roles}

Datadog의 기본 및 커스텀 역할에 대해 알아보려면 [역할 기반 액세스 제어 문서][9]를 참조하세요.

### Remote Configuration {#remote-configuration}

동작을 원격으로 설정하는 방법이나 인프라스트럭처에 배포된 Datadog 컴포넌트에 대해 알아보려면 [Remote Configuration 작동 방식][10]을 참조하세요.

### 클라이언트 토큰 {#client-tokens}

클라이언트 토큰은 사용자의 웹 및 모바일 애플리케이션에서 이벤트와 로그를 전송하는 데 사용됩니다. 이 토큰은 조직에 대해 고유합니다. RUM 애플리케이션에 연결된 클라이언트 토큰을 삭제하면 RUM 애플리케이션의 보고가 중단됩니다. [클라이언트 토큰 생성 프로세스][11]는 API 및 애플리케이션 키 생성 프로세스와 유사합니다.

### 이벤트 API 이메일 {#events-api-emails}

애플리케이션에 기존 Datadog 통합이 없고 커스텀 Agent 점검을 생성하지 않을 경우에는 이메일로 이벤트를 전송할 수 있습니다. 이벤트 API 이메일 설정 방법을 알아보려면 [이메일을 이용한 이벤트 가이드][12]를 참조하세요.

### Synthetic 테스트 {#synthetic-tests}

[Synthetic Monitoring 설정][13] 액세스 및 제어 방법을 알아봅니다.

### MCP 서버 {#mcp-server}

[Datadog MCP Server][18]를 통해 AI Agent와 도구가 조직의 Datadog 데이터에 액세스하는 방식을 관리하세요.

- MCP 서버 및 해당 도구에 대한 [조직 전체 액세스][19]를 활성화하거나 비활성화하고, 리소스를 생성하거나 수정하는 도구에 대한 쓰기 액세스 권한을 별도로 설정합니다.
- MCP 서버를 사용한 OAuth 인증을 위해 [리디렉션 URL][20]을 구성합니다.

## Security {#security}

### Safety Center {#safety-center}

[**Safety Center**][14] 페이지에는 조직에서 검토해야 하는 보안 알림, 경고 및 권장 사항이 포함됩니다.

### Public sharing {#public-sharing}

{{< ui >}}Public Sharing{{< /ui >}} 탭에는 공유를 위한 조직 전체 설정과 공유된 대시보드 및 그래프 목록이 포함되어 있습니다. 공유 기능을 세부적으로 활성화하고 최대 초대 기간 설정과 같은 추가 보안 옵션을 구성할 수 있습니다.

모든 조직에 공유 설정을 적용하려면 [Datadog 지원팀][16]에 문의하세요.

**참고**: 공유 설정 및 리소스를 보고 관리하려면 OrgAdmin 권한이 필요합니다.

### 모바일 및 타사 액세스 {#mobile-and-third-party-access}

[**모바일 및 타사 액세스**][15] 페이지에서 조직 내 모바일 및 타사 애플리케이션을 확인하고 관리할 수 있습니다.

## 규정 준수 {#compliance}

### Audit trail {#audit-trail}

Organization Settings 페이지의 {{< ui >}}Audit Trail{{< /ui >}} 탭을 클릭하면 Audit Events Explorer가 새 탭으로 열립니다.

### Audit Trail Settings {#audit-trail-settings}

{{< ui >}}Audit Trail Settings{{< /ui >}} 탭에서 감사 추적의 보존 기간을 설정하고 다른 클라우드 스토리지 서비스에 아카이빙을 활성화합니다.

### SMTP 구성 {#smtp-configuration}

[**SMTP 구성**][17] 페이지에서 자체 SMTP 서버를 연결하여 상태 페이지 구독 이메일이 자체 도메인에서 발송되도록 할 수 있습니다.

## 일반 {#general}

### Preferences {#preferences}

#### 조직 이름 {#organization-name}

조직 이름을 변경하려면 {{< ui >}}Organization Settings{{< /ui >}}의 {{< ui >}}Preferences{{< /ui >}} 탭에서 {{< ui >}}Edit{{< /ui >}} 버튼을 클릭하고 새 이름을 입력한 다음 {{< ui >}}Save{{< /ui >}} 버튼을 클릭합니다.

**참고**: 조직 이름은 32자를 초과할 수 없습니다.

#### Datadog 홈페이지 {#datadog-homepage}

조직 홈페이지를 Dashboard List 또는 개별 대시보드로 설정할 수 있습니다.

#### 로그 인덱스의 계약 외 보존 기간 {#out-of-contract-retention-periods-for-log-indexes}

`Org Management` 권한이 있는 사용자는 로그 인덱스에 대한 계약 외 보존 기간 기능을 활성화할 수 있습니다. 이 기능은 조직별로 활성화됩니다. 즉, 사용자가 상위 조직에서 이 기능을 활성화하더라도 모든 하위 조직에 자동으로 활성화되지는 않습니다.

{{< img src="account_management/out-of-contract-retention.png" alt="로그 인덱스의 계약 외 보존 기간 설정이 활성화된 상태로 표시됩니다." style="width:70%;" >}}

이 기능을 활성화하면 `Modify Index` 권한이 있는 사용자는 계약에 포함되어 있지 않더라도 3일, 7일, 15일, 30일, 45일, 60일의 보존 기간 중 원하는 기간을 선택할 수 있습니다. 이는 잠재적인 장기 문제를 해결하거나 고객이 현재 계약에 포함되지 않은 더 긴 보존 기간을 필요로 하는 규정 준수 요구 사항을 충족할 때 유용할 수 있습니다.

**참고**: 계약 외 보존 기간 기능을 사용하면 온디맨드 요금이 발생합니다. 계약 외 보존 기간 기능을 자주 사용하는 경우, Datadog은 고객이 계정 관리자에게 연락하여 이를 계약에 추가할 것을 권장합니다.

#### 최대 세션 지속 시간 구성 {#max-session-duration-configuration}

`Org Management` 권한이 있는 사용자는 조직의 최대 세션 지속 시간을 설정할 수 있습니다. 이 기간은 변경 후 생성되는 모든 새로운 웹 세션에 적용되며, 조직 내 역할과 관계없이 모든 사용자에게 적용됩니다. Datadog 모바일 애플리케이션 세션에는 적용되지 않습니다.

세션 지속 시간은 다음 제한 내에서 구성할 수 있습니다.
- **최소 지속 시간:** 1시간
- **최대 지속 시간:** {{< region-param key=org_management_max_session_duration >}}

{{< img src="account_management/org_settings/max_session_duration.png" alt="최대 세션 지속 시간 설정" style="width:70%;" >}}

#### 유휴 시간 세션 지속 시간 설정 {#idle-time-session-duration-configuration}

`Org Management` 권한이 있는 사용자는 조직의 유휴 시간 세션 시간 초과를 활성화하거나 비활성화할 수 있습니다. 이 기능이 활성화되면 사용자는 30분 동안 활동이 없을 경우 자동으로 로그아웃됩니다. 이 설정은 변경 후 생성되는 모든 새로운 웹 세션에 적용되며, 조직 내 역할과 관계없이 모든 사용자에게 적용됩니다. Datadog 모바일 애플리케이션 세션에는 적용되지 않습니다.

{{< img src="account_management/org_settings/idle_session_timeout.png" alt="유휴 시간 세션 시간 초과 설정" style="width:70%;" >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/users/default_roles/
[2]: /ko/account_management/users/
[3]: /ko/account_management/teams/?s=login%20methods
[4]: /ko/account_management/org_settings/service_accounts
[5]: /ko/account_management/login_methods/
[6]: /ko/account_management/saml/
[7]: /ko/account_management/saml/mapping
[8]: /ko/account_management/api-app-keys/
[9]: /ko/account_management/rbac/
[10]: /ko/remote_configuration#how-it-works
[11]: /ko/account_management/api-app-keys/#client-tokens
[12]: /ko/events/guides/email/
[13]: /ko/synthetics/settings/?tab=specifyvalue#overview
[14]: /ko/account_management/safety_center
[15]: /ko/account_management/org_settings/mobile_third_party_access
[16]: /ko/help/
[17]: /ko/account_management/org_settings/smtp_configuration
[18]: /ko/mcp_server/
[19]: /ko/mcp_server/setup/#required-permissions
[20]: /ko/mcp_server/setup/#adding-oauth-clients