---
further_reading:
- link: /account_management/api-app-keys/
  tag: 설명서
  text: API 및 애플리케이션 키
- link: /account_management/users/
  tag: 설명서
  text: 사용자 관리
title: 조직 설정
---
## 개요
조직 설정 섹션은 왼쪽 하단 탐색창에 있는 계정 메뉴의  [Administrators][1]에서 **Organization Settings**를 클릭하거나 Personal Settings 페이지 상단 헤더 드롭다운에서 **Organization Settings** 선택해 이용할 수 있습니다.

Organization Settings에서 사용자, 그룹, BRAC, 키, 토큰을 관리할 수 있습니다. 이 페이지에서는 **Organization Settings**의 각 섹션에 대한 전반적인 설명과 설명서 특정 작업에 대해 배울 수 위치를 안내합니다.

## ID & 계정

### 사용자

사용자를 추가, 편집, 비활성화하려면 [사용자 관리][2] 설명서를 참고하세요.

### Teams

Datatdog 내 자산을 정리해 팀을 관리하는 방법을 알아보려면 [Teams][3] 설명서를 참고하세요.

### 서비스 계정


[서비스 계정][4]은 팀과 공유한 애플리케이션 키와 다른 리소스를 소유하기 위해 사용하는 비대화형 계정입니다. 서비스 계정 애플리케이션 키는 키를 생성한 사람이 한 번만 볼 수 있습니다. 서비스 계정을 사용하면 내 애플리케이션이나 스크립트를 다른 사람과 연결하지 않고도 Datadog API에 접근할 수 있습니다.

## 인증

### 로그인 방법


**Login Methods** 탭에서는 암호, Google, SAML 인증 설정을 볼 수 있습니다. **Enabled by Default** 드롭다운을 사용해 각 항목을 토글할 수 있습니다. "SAML을 제한"하거나 다른 로그인 유형을 제한하고 싶을 경우 다른 로그인 방법 유형을 비활성화하세요. User Management 탭에서 사용자별로 재정의해 다른 로그인 방법을 사용하도록 허용할 수 있습니다.

사용자가 Datadog 조직에 로그인할 수 있도록 인증하려면 [로그인 방법 설정][5] 설명서를 참고하세요.

#### SAML 설정

SAML을 구성하는 방법을 알아보려면 [SAML 설명서로 Single Sign On 사용][6]을 참고하세요.

### SAML 그룹 매핑

이를 활성화하면 Datadog 계정에 SAML로 로그인하는 사용자는 기존 역할이 제거되고 새로운 역할을 배정받게 됩니다. ID 공급자와 생성한 매핑에서 전송된 SAML 어설션에 따라 각 사용자의 새 역할이 정해집니다.

SAML로 로그인하면서 Datadog 역할로 매핑하는 값이 없는 사용자는 영구적으로 역할이 없는 상태가 됩니다. 해당 사용자는 이제 로그인할 수 없습니다.
매핑을 생성하고 설정하는 방법을 알아보려면 [SAML 속성 매핑 설명서][7]를 참고하세요.

## 액세스

### API 키

이 섹션에서는 목록에 있는 API 키를 보고, 복제하고, 취소할 수 있습니다. 조직에 있는 API 키는 고유한 값입니다. Datadog로 메트릭과 이벤트를 전송하려면 API 키가 반드시 있어야 합니다. 키를 생성하고, 편집하고, 취소하는 방법과 관련한 자세한 내용은 [API 키 설명서][8]를 참고하세요.

### 애플리케이션 키

이름, ID, 소유자별로 애플리케이션 키를 필터링하거나 **Only My Keys** 토글을 클릭해 내가 소유한 애플리케이션 키만 볼 수 있습니다. 키 추가 및 제거와 관련한 자세한 내용은 [애플리케이션 키 설명서][8]를 참고하세요.

### 역할

Datadog의 기본 역할 및 커스텀 역할에 대해 알아보려면 [역할 기반 액세스 제어 설명서][9]를 참고하세요.

### 원격 구성

동작이나 인프라스트럭처에 배포되는 Datadog 구성 요소를 원격으로 구성하는 방법을 알아보려면 [작업을 원격으로 구성하는 방법][10]을 참고하세요.

### 클라이언트 토큰

사용자 웹과 모바일 애플리케이션에서 이벤트와 로그를 전송할 때 클라이언트 토큰을 사용합니다. 클라이언트 토큰은 조직의 고유한 값입니다. RUM Application과 연결된 클라이언트 토큰을 삭제하면 RUM Application 보고가 중단됩니다. [클라이언트 토큰 생성 프로세스][11]는 API 및 애플리케이션 키와 비슷합니다.

### 이벤트 API 이메일

애플리케이션에 Datadog 통합이 없고 커스텀 에이전트 점검을 생성하고 싶지 않은 경우 이메일로 이벤트를 보낼 수 있습니다. 이벤트 API 이메일을 설정하는 방법을 알아보려면 [이메일 이벤트 가이드][12]를 참고하세요.

## 제품

### 로그


##### 로그 인덱스 보유 초과 기간

`Org Management` 권한이 있는 사용자는 로그 인덱스를 계약 기간을 초과해 보유할 수 있습니다. 이 기능은 조직별로 활성화됩니다. 즉, 사용자가 이 기능을 상위 조직에서 활성화하면 하위 조직에도 자동으로 활성화됩니다.

{{< img src="account_management/out-of-contract-retention.png" alt="계약 기간을 초과해 보유할 수 있는 로그 인덱스." style="width:70%;" >}}

이를 활성화하면 `Modify Index` 권한이 있는 사용자는 계약 상에 없더라도 3, 7, 15, 30, 45, 60일 보유 기간 중에서 선택할 수 있습니다. 이는 잠재적인 장기 문제를 해결하거나 규정 요건을 준수하기 위해 기존 계약에서 정해진 것보다 더 긴 보유 기간이 필요할 경우에 도움이 됩니다.  

**중요**: 계약 기간을 초과한 보유 기간을 이용하면 온디맨드 요금이 발생합니다. Datadog에서는 계약 기간을 초과한 보유 기간을 자주 사용해야 하는 경우 계정 매니저와 연락해 계약 내용에 포함하도록 하는 것을 권고합니다.

### 모니터링

#### 선호하는 시간대 모니터링


`Org Management` 권한이 있는 사용자는 경고 알림 모니터링 내에서 경고 그래프에 사용되는 시간대를 맞춤화할 수 있습니다.

{{< img src="account_management/monitors-time-zone-preference.png" alt="시간대 선호 모니터링" style="width:70%;" >}}

이는 모니터링 경고 알림 **모두**에 적용되고 조직 전체에 적용되는 설정입니다.

### 신서틱 테스트

[신서틱 모니터링 설정][13]에 액세스하고 통제하는 방법을 알아보세요.

## 보안

### 공용 공유

**Public Sharing** 탭에는 공유 대시보드와 공유 그래프 목록이 있습니다. **Enabled** 토글을 클릭해 공유 설정을 편집할 수도 있습니다.

### OAuth 앱

[**OAuth Apps**][14] 페이지에서는 조직의 OAuth 애플리케이션을 보거나 관리할 수 있습니다.

## 규범 준수

### 감사 내역

Organization Settings 페이지에 있는 **Audit Trail** 탭을 클릭하면 Audit Events Explorer에 새 탭을 열 수 있습니다.

### 감사 내역 설정

**Audit Trail Settings** 탭을 사용해 감사 내역 보유 기간을 설정하고 다른 클라우드 스토리지 서비스를 보관할 수 있습니다.

## 일반

### Preferences

#### 조직 이름

조직 이름을 바꾸려면 **Organization Settings**에서 **Preferences** 탭에 있는 **Edit** 버튼을 클릭하고 새 이름을 입력한 후 **Save** 버튼을 누릅니다.

**참고**: 조직 이름은 32자를 초과할 수 없습니다.

#### Datadog 홈페이지

Dashboard List나 개별 대시보드에 조직 홈페이지를 설정할 수 있습니다.

## 참고 자료

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
[10]: /ko/agent/remote_config/?tab=configurationyamlfile#how-it-works
[11]: /ko/account_management/api-app-keys/#client-tokens
[12]: /ko/service_management/events/guides/email/
[13]: /ko/synthetics/settings/?tab=specifyvalue#overview
[14]: /ko/account_management/org_settings/oauth_apps