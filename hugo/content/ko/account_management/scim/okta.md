---
algolia:
  tags:
  - scim
  - identity provider
  - IdP
  - Okta
description: SCIM을 사용하여 Okta에서 Datadog으로 사용자와 팀을 동기화하여 자동화된 사용자 프로비저닝, 팀 관리 및 액세스
  제어를 수행합니다.
further_reading:
- link: /account_management/scim/
  tag: 설명서
  text: SCIM을 이용한 사용자 프로비저닝
- link: account_management/saml/mapping/#map-saml-attributes-to-datadog-roles
  tag: 설명서
  text: 그룹 속성 매핑
title: Okta로 SCIM 구성
---
<div class="alert alert-info">
SCIM은 인프라 Pro, 인프라 Enterprise 및 Startup 플랜에서 사용할 수 있습니다.
</div>

SCIM을 사용하여 Datadog 사용자를 Okta와 동기화하려면 다음 지침을 참조하세요.

이 기능의 기능 및 제한 사항은 [SCIM][1]을 참조하세요.

## 전제 조건 {#prerequisites}

Datadog의 SCIM은 인프라 Pro, 인프라 Enterprise 및 Startup 플랜에서 사용할 수 있는 고급 기능입니다.

이 문서에서는 조직이 ID 공급자를 사용하여 사용자 ID를 관리한다고 가정합니다.

Datadog에서는 액세스 중단을 방지하기 위해 SCIM을 구성할 때 서비스 계정 애플리케이션 키를 사용할 것을 강력히 권장합니다. 자세한 내용은 [SCIM과 함께 서비스 계정 사용][2]을 참조하세요.

SAML과 SCIM을 함께 사용할 때 Datadog에서는 액세스 불일치를 방지하기 위해 SAML JIT(Just-In-Time) 프로비저닝을 비활성화할 것을 권장합니다. SCIM을 통해서만 사용자 프로비저닝을 관리하세요.

## Okta 애플리케이션 갤러리에서 Datadog 애플리케이션을 선택합니다.{#select-the-datadog-application-in-the-okta-application-gallery}

1. Okta 포털에서 {{< ui >}}Applications{{< /ui >}}로 이동합니다
2. {{< ui >}}Browse App Catalog{{< /ui >}}을 클릭합니다
3. 검색 상자에 'Datadog'를 입력합니다
4. Datadog 애플리케이션을 선택합니다
5. {{< ui >}}Add Integration{{< /ui >}}을 클릭합니다

**참고:** 이미 Okta로 Datadog을 구성한 경우 기존 Datadog 애플리케이션을 선택합니다.

## 자동 사용자 프로비저닝 구성{#configure-automatic-user-provisioning}

1. 애플리케이션 관리 화면의 왼쪽 패널에서 {{< ui >}}Provisioning{{< /ui >}}을 선택합니다.
2. {{< ui >}}Configure API integration{{< /ui >}}을 클릭합니다.
3. {{< ui >}}Enable API integration{{< /ui >}}을 선택합니다.
4. {{< ui >}}Credentials{{< /ui >}} 섹션을 다음과 같이 완료합니다.
    - {{< ui >}}Base URL{{< /ui >}}: `https://{{< region-param key="dd_full_site" >}}/api/v2/scim` **참고:** 사이트에 적절한 하위 도메인을 사용하세요. URL을 찾으려면 [Datadog 사이트][3]를 참조하세요.
    - {{< ui >}}API Token{{< /ui >}}: 유효한 Datadog 애플리케이션 키를 사용합니다. [조직 설정 페이지][4]에서 애플리케이션 키를 생성할 수 있습니다. 데이터에 대한 지속적인 액세스를 유지하려면 [서비스 계정][5] 애플리케이션 키를 사용합니다.

{{< img src="/account_management/scim/okta-admin-credentials.png" alt="Okta 관리자 자격 증명 구성 화면">}}

5. {{< ui >}}Test API Credentials{{< /ui >}}을 클릭하고 자격 증명이 확인되었다는 메시지가 나타날 때까지 기다립니다.
6. {{< ui >}}Save{{< /ui >}}를 클릭합니다. 설정 섹션이 나타납니다.
7. {{< ui >}}Provisioning to App{{< /ui >}} 옆의 {{< ui >}}Edit{{< /ui >}}를 선택하여 기능을 활성화합니다.
    - {{< ui >}}Create Users{{< /ui >}}
    - {{< ui >}}Update User Attributes{{< /ui >}}
    - {{< ui >}}Deactivate Users{{< /ui >}}
8. {{< ui >}}Datadog Attribute Mappings{{< /ui >}} 아래에서 이미 사전 구성된 Okta 속성과 Datadog 속성 간의 매핑을 찾습니다. 필요한 경우 다시 매핑할 수 있지만, Okta 값을 동일한 Datadog 값 세트로 매핑합니다.

### Datadog 역할 속성{#map-the-datadog-role-attribute}을 매핑합니다.

SCIM을 통해 사용자의 Datadog 역할(내장 또는 사용자 지정)을 프로비저닝하려면 `roles` 속성에 대한 명시적 매핑을 추가하세요. Okta는 기본적으로 이 속성을 매핑하지 않습니다.

Datadog의 SCIM 역할 지원은 [RFC 7643][8]에 정의된 SCIM 다중 값 속성 규칙을 따르며, 역할 UUID를 `value`로, 역할 이름을 `display`로 사용합니다.

```json
{
  "roles": [
    { "value": "<DATADOG_ROLE_UUID>", "display": "<DATADOG_ROLE_NAME>" }
  ]
}
```

1. {{< ui >}}Directory{{< /ui >}} > {{< ui >}}Profile Editor{{< /ui >}}에서 Datadog SCIM용으로 구성된 애플리케이션의 사용자 프로필을 선택한 다음, {{< ui >}}Add Attribute{{< /ui >}}를 클릭하여 `roles` 속성을 생성합니다.
    - {{< ui >}}Data type{{< /ui >}}: **문자열**
    - {{< ui >}}Display name{{< /ui >}}: **역할**
    - {{< ui >}}Variable name{{< /ui >}}: **역할**
    - {{< ui >}}External name{{< /ui >}}: `roles.^[primary==true].value`
    - {{< ui >}}External namespace{{< /ui >}}: `urn:ietf:params:scim:schemas:core:2.0:User`
    - {{< ui >}}Enum{{< /ui >}}의 경우 {{< ui >}}Define enumerated list of values{{< /ui >}}를 선택하고 Datadog 역할당 하나의 항목을 추가하되, 역할 이름을 표시 이름으로 사용하고 역할 UUID를 값으로 사용합니다. [조직 설정][9] 페이지의 역할 URL에서 역할의 UUID를 찾을 수 있습니다. 동일한 방식으로 사용자 지정 역할을 추가합니다.
2. Datadog 애플리케이션의 {{< ui >}}Provisioning{{< /ui >}} > {{< ui >}}To App{{< /ui >}} 설정에서 Okta `roles` 속성을 Datadog `roles` 속성에 매핑합니다.
3. 앱의 {{< ui >}}Assignments{{< /ui >}} 탭에서 드롭다운을 통해 각 사용자에게 적절한 역할을 할당합니다.

SCIM 요청이 여러 역할을 보내는 경우, Datadog은 조직의 역할과 일치하는 역할만 프로비저닝합니다. 일치하는 역할이 없으면 사용자는 조직 기본 역할(Standard)로 설정되며, 일치하지 않는 역할은 Audit Trail에 로그로 기록됩니다. 자세한 내용은 [SCIM][1]을 참조하세요.

## 자동 팀 프로비저닝 구성 {#configure-automatic-team-provisioning}

[Managed Teams][6]을 사용하면 ID 공급자를 통해 Datadog Teams의 핵심 프로비저닝(이름, 핸들, 멤버십)을 제어할 수 있습니다. 설정 프로세스는 팀이 Datadog에 이미 존재하는지 여부에 따라 다릅니다.

**참고:** 사용자를 팀에 추가하려면 먼저 Datadog에 사용자가 존재해야 합니다. 따라서 SCIM을 통해 Datadog에서 사용자가 생성되도록 Okta의 Datadog 앱에 사용자를 할당해야 합니다. 모든 팀 멤버가 Datadog에서 자동으로 생성되도록 Okta 그룹에 Datadog 애플리케이션을 할당하세요.

### Datadog에서 새 팀 만들기 {#create-a-new-team-in-datadog}

1. Okta의 Datadog 애플리케이션에서 {{< ui >}}Push Groups{{< /ui >}} 탭으로 이동합니다.
{{< img src="/account_management/scim/okta/pushed-groups.png" alt="Okta 푸시된 그룹 구성 인터페이스">}}
1. {{< ui >}}Push Groups{{< /ui >}} 버튼을 클릭합니다. 푸시된 그룹 인터페이스가 열립니다.
1. Datadog으로 푸시할 Okta 그룹을 선택합니다.
1. {{< ui >}}Match result & push action{{< /ui >}} 열에서 {{< ui >}}Create group{{< /ui >}}이 선택되었는지 확인합니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

작업이 성공적으로 완료되었는지 확인하려면 Datadog의 [Teams 목록][7]으로 이동합니다. 구성한 Okta 그룹과 일치하는 Datadog Team을 검색합니다. 팀이 Datadog에 존재하며 외부에서 관리되는지 확인합니다. 팀이 Datadog에 나타나기까지 1~2분 정도 걸릴 수 있습니다.

{{< img src="/account_management/scim/okta/managed-externally.png" alt="외부에서 관리되는 'Identity team'이라는 팀을 보여주는 Datadog 팀 목록입니다.">}}

### 기존 Datadog Team을 Okta 그룹과 동기화{#synchronize-an-existing-datadog-team-with-an-okta-group}

기존 Datadog Team을 Okta 그룹에 매핑할 수 있습니다. Okta 그룹에서 Datadog Team으로 연결을 설정하면 향후 Datadog Team은 Okta에 의해 관리됩니다.

**참고:** 기존 Datadog 팀을 Okta 그룹과 동기화하려면 Okta 그룹 이름에서 파생된 핸들이 기존 Datadog 팀의 핸들과 정확히 일치해야 합니다.

1. Okta의 Datadog 애플리케이션에서 {{< ui >}}Push Groups{{< /ui >}} 탭으로 이동합니다.
1. {{< ui >}}Push Groups{{< /ui >}} 버튼을 클릭합니다. 푸시된 그룹 인터페이스가 열립니다.
1. Datadog Team과 동기화할 Okta 그룹을 선택합니다.
1. {{< ui >}}Match result & push action{{< /ui >}} 열에서 {{< ui >}}Create group{{< /ui >}}이 선택되었는지 확인합니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

**참고:** {{< ui >}}Create group{{< /ui >}}을 선택하면 Okta에 {{< ui >}}No match found{{< /ui >}} 메시지가 표시됩니다. 이 메시지는 무시하고 그룹 생성을 진행하여 동기화를 설정할 수 있습니다.

### Okta 그룹과 Datadog Team 간의 연결 삭제{#delete-the-connection-between-an-okta-group-and-a-datadog-team}

Datadog Team에서 Okta 그룹 연결을 해제하는 방법에는 두 가지가 있으며, Datadog Team 멤버십에 미치는 영향이 다릅니다.

#### Datadog에서 팀 멤버 유지 {#keep-team-members-in-datadog}

이 절차를 통해 Okta 대신 Datadog에서 팀 멤버십을 관리할 수 있습니다. 팀 멤버는 변경되지 않습니다.

1. Okta의 Datadog 애플리케이션에서 {{< ui >}}Push Groups{{< /ui >}} 탭으로 이동합니다.
1. {{< ui >}}Push Groups{{< /ui >}} 버튼을 클릭합니다. 푸시된 그룹 인터페이스가 열립니다.
1. Datadog Team에서 연결을 해제할 Okta 그룹을 선택합니다.
1. {{< ui >}}Match result & push action{{< /ui >}} 열에서 {{< ui >}}Unlink Pushed Group{{< /ui >}}을 선택합니다. 대화 상자가 나타납니다.
1.  {{< ui >}}Leave the group in the target app{{< /ui >}}을 선택합니다.
1.  {{< ui >}}Unlink{{< /ui >}}를 클릭합니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

#### Datadog에서 Team 멤버 제거 {#remove-team-members-from-datadog}

이 절차를 통해 Okta 대신 Datadog에서 팀 멤버십을 관리할 수 있으며, Datadog Team의 팀 멤버들이 팀에서 제거됩니다.

1. Okta의 Datadog 애플리케이션에서 {{< ui >}}Push Groups{{< /ui >}} 탭으로 이동합니다.
1. {{< ui >}}Push Groups{{< /ui >}} 버튼을 클릭합니다. 푸시된 그룹 인터페이스가 열립니다.
1. Datadog Team에서 연결을 해제할 Okta 그룹을 선택합니다.
1. {{< ui >}}Match result & push action{{< /ui >}} 열에서 {{< ui >}}Unlink Pushed Group{{< /ui >}}을 선택합니다. 대화 상자가 나타납니다.
1. {{< ui >}}Delete the group in the target app (recommended){{< /ui >}}을 선택합니다.
1.  {{< ui >}}Unlink{{< /ui >}}를 클릭합니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

**참고:** 옵션 이름과 달리 {{< ui >}}Delete the group in the target app{{< /ui >}}을 선택해도 Datadog의 팀이 삭제되지 _않습니다_. 대신, 팀에서 모든 구성원을 제거하고 Okta의 그룹과 Datadog Team 간의 연결을 제거합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/scim/
[2]: /ko/account_management/scim/#using-a-service-account-with-scim
[3]: /ko/getting_started/site
[4]: https://app.datadoghq.com/organization-settings/application-keys
[5]: /ko/account_management/org_settings/service_accounts
[6]: /ko/account_management/teams/manage/#manage-teams-through-an-identity-provider
[7]: https://app.datadoghq.com/teams
[8]: https://www.rfc-editor.org/rfc/rfc7643.html#section-4.1.2
[9]: https://app.datadoghq.com/organization-settings/roles