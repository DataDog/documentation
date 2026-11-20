---
description: 보안 액세스 제어를 통해 팀 간에 자동화된 스크립트 및 공유 애플리케이션 키를 위한 비대화형 서비스 계정을 생성하고 관리할
  수 있습니다.
further_reading:
- link: /account_management/service-access-tokens/
  tag: 문서
  text: 서비스 액세스 토큰
- link: https://docs.datadoghq.com/api/latest/service-accounts/
  tag: 문서
  text: 서비스 계정 API 참조
title: 서비스 계정
---
## 개요 {#overview}

서비스 계정은 팀 간에 공유되는 애플리케이션 키 및 기타 리소스를 소유하는 데 사용할 수 있는 비대화형 계정입니다. 서비스 계정 애플리케이션 키는 키를 생성한 개인이 한 번만 볼 수 있습니다.

회사 직원이 개인 애플리케이션 키를 사용하여 Datadog API에 요청을 보내는 자동화된 스크립트를 설정한다고 가정해 보겠습니다. 해당 직원이 퇴사하면 해당 직원의 Datadog 계정을 비활성화하고 그러면 해당 직원의 애플리케이션 키가 작동을 멈춥니다. 자동화된 스크립트 또한 누군가가 유효한 애플리케이션 키로 업데이트할 때까지 작동이 중지됩니다. Datadog API에 대한 자동화된 요청에 개인 애플리케이션 키 대신 서비스 계정 애플리케이션 키를 사용하면 이 문제를 방지할 수 있습니다.

## Navigation {#navigation}

서비스 계정은 [Organization Settings][1]에 있습니다. 

UI에서 서비스 계정에 액세스하려면 다음과 같이 하세요.

1. 계정 메뉴에서 {{< ui >}}Organization Settings{{< /ui >}}로 이동합니다.
2.  {{< ui >}}Accounts{{< /ui >}}에서 {{< ui >}}Service Accounts{{< /ui >}}를 선택합니다.

[Service Accounts 페이지][2]에는 조직의 모든 서비스 계정 목록이 포함되어 있습니다. Datadog Admin 역할이 지정된 사용자를 포함하여 Service Account Write 권한이 있는 사용자는 서비스 계정을 생성할 수 있습니다. Service Account Write 권한이 없는 사용자에게는 읽기 전용 화면이 표시됩니다.

### 서비스 계정 조회 {#view-service-accounts}

기본적으로 Service Accounts 페이지에는 활성 서비스 계정만 표시됩니다. 아래 목록에 비활성 서비스 계정을 포함하려면 {{< ui >}}Disabled{{< /ui >}}를 선택합니다.

페이지 상단의 검색 상자를 사용하여 서비스 계정을 필터링합니다. 필터는 이름, 이메일 및 역할 필드를 검색합니다.

계정을 클릭하면 다음 정보가 포함된 자세한 사이드 패널 보기에 액세스할 수 있습니다. 

- 상태(활성 또는 비활성)
- 생성 및 최종 수정 날짜
- 역할
- 애플리케이션 키
- 권한

### 서비스 계정 생성 {#create-service-account}

서비스 계정을 생성하려면 다음 단계를 수행하세요.

1. {{< ui >}}New Service Account{{< /ui >}}를 클릭합니다. 대화 상자가 나타납니다.
2. 서비스 계정의 이름과 이메일 주소를 입력합니다.
3. {{< ui >}}Assign Roles{{< /ui >}} 드롭다운 메뉴를 사용하여 서비스 계정에 할당할 역할을 하나 이상 선택합니다.
4. 저장하려면 {{< ui >}}Create Service Account{{< /ui >}}를 클릭합니다.

Datadog 사용자의 이메일 주소와 달리 서비스 계정 이메일 주소는 조직 전체에서 독점적일 필요가 없습니다.

### 서비스 계정 편집 {#edit-service-account}

서비스 계정을 수정하려면 서비스 계정 목록에서 하나를 클릭합니다. 

1. 측면 패널에서 서비스 계정 이름 옆의 {{< ui >}}Edit{{< /ui >}}를 클릭합니다. 대화 상자가 나타납니다.
2. 변경하려는 필드를 업데이트합니다. 이름, 이메일 주소, 상태 및 역할을 편집할 수 있습니다.
3. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

서비스 계정을 비활성화하려면 사용자에게 Service Account Write 권한 외에도 User Manage Access 권한이 있어야 합니다.

서비스 계정을 비활성화하려면 앞의 절차에 따라 서비스 계정을 편집하고 상태를 {{< ui >}}Disabled{{< /ui >}}로 설정합니다.

### 서비스 액세스 토큰 {#service-access-tokens}

[SAT(서비스 액세스 토큰)][4]는 서비스 계정에서 Datadog API 호출을 인증할 때 권장되는
방법입니다. SAT는 범위가 지정되고 필요시 수명이 길며 독립형입니다. 즉, API 키가 필요하지 않습니다.

서비스 계정에 대한 SAT를 생성하려면 다음 단계를 따르세요.

1. [**Organization Settings** > **Service Accounts**][2]로 이동하여 서비스 계정을 클릭합니다. 세부 정보 패널이 나타납니다.
2. **Access Tokens** 아래에서 {{< ui >}}\+ New Token{{< /ui >}}을 클릭합니다.
3. [Create a Service Access Token][5]의 단계를 따르세요.

**참고:** 각 서비스 계정은 SAT를 최대 500개까지 가질 수 있습니다.

### 애플리케이션 키 생성 또는 취소 {#create-or-revoke-application-keys}

서비스 계정 애플리케이션 키를 생성하거나 취소하려면 서비스 계정 목록에서 계정을 선택하세요. 서비스 계정의 측면 패널이 나타납니다.

새 애플리케이션 키를 생성하려면 다음 단계를 따르세요.

- {{< ui >}}New Key{{< /ui >}}를 클릭합니다. 대화 상자가 나타납니다.
- 키를 설명하는 이름을 지정합니다.
- {{< ui >}}Create Key{{< /ui >}}를 클릭합니다. 

대화 상자가 새로 고침되면서 키가 표시됩니다. 키를 복사하여 원하는 위치에 붙여넣습니다. 대화 상자를 닫으면 키 값을 다시 조회할 수 없습니다.

{{< site-region region="ap2,gov,gov2" >}}
<div class="alert alert-danger">서비스 계정 애플리케이션 키는 한 번만 조회할 수 있습니다. 생성 직후 애플리케이션 키를 안전하게 저장해야 합니다. 키 시크릿을 나중에 검색할 수 없기 때문입니다.</div>
{{< /site-region >}}

애플리케이션 키를 취소하려면 서비스 계정 상세 보기의 측면 패널에서 해당 키를 찾아 위에 마우스를 가져갑니다. 오른쪽에 연필 및 휴지통 아이콘이 나타납니다. 키를 취소하려면 휴지통 아이콘을 클릭하세요. 키를 취소한 후 {{< ui >}}Confirm{{< /ui >}}을 클릭합니다.

### API {#api}

Datadog API를 통해 서비스 계정을 사용하려면 [서비스 계정 API 참조][3]를 참조하세요.

## 서비스 계정 애플리케이션 키 {#service-account-application-keys}

서비스 계정 애플리케이션 키는 생성 직후 딱 한 번만 조회할 수 있습니다. 애플리케이션 키에 대한 액세스를 제한하면 다른 사용자가 키에 액세스할 때 발생할 수 있는 문제를 방지할 수 있습니다. 서비스 계정 키를 분실하거나 잊어버린 경우 해당 키를 취소하고 새 키를 생성하세요.

## 권한 {#permissions}

서비스 계정을 생성하면 사용자를 대신하여 Datadog과 상호 작용하는 주체가 생성됩니다. Service Accounts 페이지에서 사용할 수 있는 기능은 Datadog 역할 및 권한에 따라 다릅니다.

서비스 계정을 생성하려면 Service Account Write 권한이 필요합니다. Datadog Admin 역할에는 Service Account Write 권한이 포함되어 있으므로, Datadog Admin 역할이 지정된 사람은 누구나 서비스 계정을 생성할 수 있습니다.

서비스 계정을 생성할 때 본인이 가진 역할 및 권한의 하위 집합을 부여할 수 있습니다. User Access Manage 권한이 있는 경우는 예외입니다. 이 권한이 있으면 Datadog에서 모든 작업을 수행할 수 있는 관리자 액세스 권한이 사실상 부여됩니다. User Access Manage 권한이 있는 Datadog 계정은 서비스 계정에 할당할 수 있는 역할 및 권한에 제한이 없습니다.


## 알림 {#notifications}

Datadog은 다음 작업이 발생할 때 서비스 계정과 연결된 이메일 주소로 알림을 보냅니다.
- 애플리케이션 키 생성
- 애플리케이션 키 취소
- 서비스 계정 비활성화


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/org_settings/
[2]: https://app.datadoghq.com/organization-settings/service-accounts
[3]: /ko/api/latest/service-accounts/
[4]: /ko/account_management/service-access-tokens/
[5]: /ko/account_management/service-access-tokens/#create-a-service-access-token