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
[관리자][1]는 왼쪽 탐색 메뉴 하단의 계정 메뉴에서 **조직 설정**를 클릭하거나, 개인 설정 페이지 상단의 헤더 드롭다운에서 **조직 설정**를 선택하여 조직 설정 섹션을 이용할 수 있습니다.

{{< img src="account_management/org_settings/nav.png" alt="Datadog에서 조직 설정으로 이동" style="width:80%;" >}}

조직 설정으로 사용자, 그룹, RBAC, 키, 토큰을 관리할 수 있습니다. 본 페이지에서는 모든 섹션에 대한 개요를 제공하고 **조직 설정**의 특정 작업에 대해 알아볼 수 있는 문서의 위치를 설명합니다.

## 신원 및 계정

### 사용자

사용자를 추가, 수정 및 비활성화하려면 [사용자 관리][2] 문서를 확인합니다.

### Teams

Datadog에서 에셋을 조직하기 위한 팀을 관리하려면 [Teams][3] 문서를 확인합니다.

### 서비스 계정


[서비스 계정][4]은 팀 간에 공유되는 애플리케이션 키 및 기타 리소스를 소유하는 데 사용할 수 있는 비대화형 계정입니다. 서비스 계정 애플리케이션 키는 키를 만든 개인이 한 번만 볼 수 있습니다. 서비스 계정을 사용하면 특정 사용자와 애플리케이션 또는 스크립트를 연결하지 않고도 Datadog API에 액세스할 수 있습니다.

## 인증

### 로그인 방법


**로그인 방법** 탭에는 비밀번호, Google, SAML 인증 설정이 표시됩니다. **기본으로 활성화된** 드롭다운을 사용하여 각각을 토글할 수 있습니다. 'SAML 전용'을 설정하거나 다른 유형의 로그인에 대해 엄격한 설정을 하려면 다른 로그인 방법 유형을 비활성화합니다. 사용자 관리 탭에서 사용자별 재정의를 허용하면 필요한 경우 사용자가 다른 로그인 방법으로 로그인할 수 있습니다.

[로그인 방법 설정하기][5] 문서를 참조하여 Datadog 조직에 로그인하는 사용자를 인증합니다.

#### SAML 설정

SAML 설정 방법을 알아보려면 [SAML을 사용한 싱글 사인 온 문서][6]를 참조하세요.

### SAML 그룹 매핑

본 기능을 활성화하면 Datadog 계정에 SAML로 로그인하는 사용자의 현재 역할이 영구적으로 삭제되며 새 역할이 다시 할당됩니다. 신원 공급자가 전달한 SAML 어설션과 고객님이 생성한 매핑에 따라 각 사용자의 새 역할이 결정됩니다.

SAML을 통해 로그인한 사용자가 Datadog 역할에 매핑되는 값이 없는 경우, 모든 역할이 영구적으로 삭제됩니다. 해당 사용자는 더 이상 로그인할 수 없습니다.
매핑 생성 및 설정 방법을 알아보려면 [SAML 속성 매핑 설명서][7]를 참조하세요.

## 액세스

### API 키

본 섹션에서는 목록에서 API 키를 확인, 복사, 취소할 수 있습니다. API 키는 조직의 고유한 값입니다. Datadog 에이전트가 메트릭 및 이벤트를 Datadog에 제출하려면 API 키가 필요합니다. 키 생성, 편집 및 취소에 대한 자세한 내용은 [API 키 문서][8]를 참조하세요.

### 애플리케이션 키

애플리케이션 키를 이름, ID 또는 소유자별로 필터링하거나 **내 키만** 토글을 클릭하여 고객님이 소유한 애플리케이션 키만 확인할 수 있습니다. 키 추가 및 삭제에 대한 자세한 내용은 [애플리케이션 키 문서][8]를 참조하세요.

### 역할

Datadog의 기본 및 커스텀 역할에 대해 알아보려면 [역할 기반 액세스 제어 문서][9]를 참조하세요.

### 원격 설정

작업 원격 설정 방법 또는 인프라스트럭처에 배포된 Datadog 컴포넌트에 대해 알아보려면, [원격 설정 작동 방식][10]을 참조하세요.

### 클라이언트 토큰

클라이언트 토큰은 사용자의 웹 및 모바일 애플리케이션에서 이벤트 및 로그를 전송하는 데 사용됩니다. 본 토큰은 조직의 고유한 값입니다. RUM 애플리케이션에 연결된 클라이언트 토큰을 삭제하면 RUM 애플리케이션의 보고가 중단됩니다. [클라이언트 토큰 생성 프로세스][11]는 API 및 애플리케이션 키의 경우와 유사합니다.

### 이벤트 API 이메일

애플리케이션에 기존 Datadog 통합이 없고 커스텀 에이전트 점검을 생성하지 않은 경우에는 이메일로 이벤트를 전송할 수 있습니다. 이벤트 API 이메일을 설정하는 방법을 알아보려면 [이메일을 활용한 이벤트 지침][12]을 참조하세요.

### 신서틱(Synthetic) 테스트

[신서틱(Synthetic) 모니터링 설정][13] 액세스 및 제어 방법을 알아봅니다.

## 보안

### 안전 센터

[**안전 센터**][14] 페이지에는 조직에서 검토해야 하는 보안 알림, 경고 및 권장 사항이 포함됩니다.

### 공개 공유

**공개 공유** 탭에는 공유 대시보드 및 공유 그래프 목록이 포함되어 있습니다. 또한, **활성화**를 토글하여 공유 설정을 편집할 수도 있습니다.

### OAuth 앱

[**OAuth 앱**][15] 페이지에서는 조직의 OAuth 애플리케이션을 확인 또는 관리할 수 있습니다.

## 규정 준수

### 감사 추적

조직 설정 페이지의 **감사 추적** 탭을 클릭하면 감사 이벤트 탐색기에 탭이 새로 열립니다.

### 감사 추적 설정

**감사 추적 설정** 탭에서 감사 추적의 보존 기간을 설정하고 다른 클라우드 스토리지 서비스에 아카이빙을 활성화합니다.

## 일반

### 선호 사항

#### 조직 이름

조직 이름을 변경하려면 **조직 설정**의 **환경설정** 탭에서 **수정** 버튼을 클릭하고 새 이름을 입력한 다음 **저장** 버튼을 클릭합니다.

**참고**: 조직 이름은 32자를 초과할 수 없습니다.

#### Datadog 홈페이지

조직 홈페이지를 대시보드 목록 또는 개인 대시보드로 설정할 수 있습니다.

#### 로그 인덱스의 계약 외 보존 기간

`Org Management` 권한이 있는 사용자는 로그 인덱스에 대해 계약 외 보존 기간 기능을 활성화할 수 있습니다. 해당 기능은 조직별로 활성화됩니다. 즉, 사용자가 상위 조직에서 이 기능을 활성화한다고 해서 모든 하위 조직에서 자동 활성화되지는 않습니다.

{{< img src="account_management/out-of-contract-retention.png" alt="활성화 표시된 로그 인덱스 설정에 대한 계약 외 보존 기간." style="width:70%;" >}}

해당 기능을 활성화하면 `Modify Index` 권한이 있는 사용자는 계약에 해당 항목이 없다 하더라도 3일, 7일, 15일, 30일, 45일, 60일의 보존 기간 중 원하는 기간을 선택할 수 있습니다. 이는 잠재적인 장기 문제를 해결하거나 규정 준수 요건을 충족하기 위해 고객이 현 계약에 포함되지 않은 더 긴 보존 기간이 필요할 때 유용할 수 있습니다.

**참고**: 계약 외 보존 기간 기능을 사용하면 온디맨드 요금이 청구됩니다. 계약 외 보존 기간 기능을 자주 사용한다면 Datadog은 고객께 계정 관리자에게 문의하여 이를 계약에 추가할 것을 권장합니다.

#### 모니터링 시간대 기본 설정

`Org Management` 권한이 있는 사용자는 모니터링 경고 알림에서 알림 그래프 스냅샷에 사용되는 시간대를 커스텀 지정할 수 있습니다.

{{< img src="account_management/monitors-time-zone-preference.png" alt="모니터링 시간대 기본 설정" style="width:70%;" >}}

본 설정은 조직 전체에 적용되므로 **모든** 모니터링 경고 알림에 적용됩니다.

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
[14]: /ko/account_management/safety_center
[15]: /ko/account_management/org_settings/oauth_apps