---
algolia:
  tags:
  - scim
  - identity provider
  - IdP
  - Azure AD
  - Entra ID
aliases:
- /ko/account_management/scim/azure/
description: SCIM을 사용하여 Microsoft Entra ID에서 Datadog으로 자동 사용자 프로비저닝을 설정하고 단계별 구성과
  속성 매핑을 수행하세요.
title: Microsoft Entra ID로 SCIM 구성하기
---
<div class="alert alert-info">
SCIM은 인프라 Pro, 인프라 Enterprise 및 Startup 플랜에서 사용할 수 있습니다.
</div>

<div class="alert alert-danger">
  2024년 말 보안 인시던트 이후 Entra의 타사 앱 업데이트에 대한 Microsoft의 동결 조치로 인해 SCIM을 통한 Team 프로비저닝을 사용할 수 없습니다. Datadog에서 Teams를 생성하려면 지원되는 다음 대안 중 하나를 사용하세요. 
  <a href="https://docs.datadoghq.com/account_management/saml/mapping/" target="_blank">SAML 매핑</a>, 
  <a href="https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/team" target="_blank">Terraform</a>, 
  <a href="https://docs.datadoghq.com/api/latest/teams/" target="_blank">공용 API</a> 또는 
  <a href="https://docs.datadoghq.com/api/latest/scim/" target="_blank">SCIM 서버에 대한 직접 호출</a>. SCIM은 여전히 사용자 프로비저닝에 사용할 수 있습니다.
</div>

SCIM을 사용하여 Datadog 사용자를 Microsoft Entra ID와 동기화하려면 다음 지침을 따르세요.

이 기능의 기능과 제한 사항에 대한 자세한 내용은 [SCIM][1]을 참조하세요.

## 전제 조건 {#prerequisites}

Datadog의 SCIM은 인프라 Pro, 인프라 Enterprise 및 Startup 플랜에서 사용할 수 있는 고급 기능입니다.

이 문서에서는 조직이 ID 공급자를 사용하여 사용자 ID를 관리한다고 가정합니다.

Datadog에서는 액세스 중단을 방지하기 위해 SCIM을 구성할 때 서비스 계정 애플리케이션 키를 사용할 것을 강력히 권장합니다. 자세한 내용은 [SCIM과 함께 서비스 계정 사용][2]을 참조하세요.

SAML과 SCIM을 함께 사용할 때 Datadog에서는 액세스 불일치를 방지하기 위해 SAML JIT(Just-In-Time) 프로비저닝을 비활성화할 것을 권장합니다. SCIM을 통해서만 사용자 프로비저닝을 관리하세요.

## Microsoft Entra ID 애플리케이션 갤러리에 Datadog 추가 {#add-datadog-to-the-microsoft-entra-id-application-gallery}

1. [Microsoft Entra 관리 센터][6]에 최소 [클라우드 애플리케이션 관리자][7] 권한으로 로그인합니다.
1. {{< ui >}}Identity{{< /ui >}} -> {{< ui >}}Applications{{< /ui >}} -> {{< ui >}}Enterprise Applications{{< /ui >}}로 이동합니다.
1. {{< ui >}}New Application{{< /ui >}}을 클릭합니다.
1. 검색 상자에 'Datadog'을 입력합니다.
1. 갤러리에서 Datadog 애플리케이션을 선택합니다.
1. 필요시 {{< ui >}}Name{{< /ui >}} 텍스트 상자에 이름을 입력합니다.
1. {{< ui >}}Create{{< /ui >}}를 클릭합니다.

**참고:** Microsoft Entra ID를 사용하여 SSO용 Datadog을 이미 구성한 경우, {{< ui >}}Enterprise Applications{{< /ui >}}로 이동하여 기존 Datadog 애플리케이션을 선택합니다.

## 자동 사용자 프로비저닝 구성{#configure-automatic-user-provisioning}

1. 애플리케이션 관리 화면의 왼쪽 패널에서 {{< ui >}}Provisioning{{< /ui >}}을 선택합니다.
2. {{< ui >}}Provisioning Mode{{< /ui >}} 메뉴에서 {{< ui >}}Automatic{{< /ui >}}을 선택합니다.
3. {{< ui >}}Admin Credentials{{< /ui >}}를 엽니다.
4. {{< ui >}}Admin Credentials{{< /ui >}} 섹션을 다음과 같이 작성합니다.
    - {{< ui >}}Tenant URL{{< /ui >}}: `{{< region-param key="dd_api" >}}/api/v2/scim?aadOptscim062020`
        - **Note:** Use the API host for your site, not the app host. For the SCIM endpoints for each site, see the [SCIM API reference][3].
        - **Note:** The `Tenant URL의 `aadOptscim062020` 부분은 Entra ID 전용입니다. 이는 이 [Microsoft Entra 문서][8]에 설명된 대로 Entra가 SCIM 동작을 수정하도록 지시하는 플래그입니다. Entra ID를 사용하지 않는 경우 URL에 이 접미사를 포함해서는 안 됩니다.
    - {{< ui >}}Secret Token{{< /ui >}}: 유효한 Datadog 애플리케이션 키를 사용하세요. [조직 설정 페이지][4]에서 애플리케이션 키를 생성할 수 있습니다. 데이터에 대한 지속적인 액세스를 유지하려면 [서비스 계정][5] 애플리케이션 키를 사용합니다.

{{< img src="/account_management/scim/admin-credentials-entra-flag.png" alt="Azure AD 관리자 자격 증명 구성 화면">}}

5. {{< ui >}}Test Connection{{< /ui >}}을 클릭한 후 자격 증명이 프로비저닝을 활성화하도록 승인되었다는 확인 메시지가 표시될 때까지 기다립니다.
6. {{< ui >}}Save{{< /ui >}}를 클릭합니다. 매핑 섹션이 나타납니다. 매핑을 구성하려면 다음 섹션을 참조하세요.

## 속성 매핑 {#attribute-mapping}

### 사용자 속성 {#user-attributes}

1. {{< ui >}}Mappings{{< /ui >}} 섹션을 확장합니다.
2. {{< ui >}}Provision Azure Active Directory Users{{< /ui >}}를 클릭합니다. Attribute Mapping 페이지가 나타납니다.
3. {{< ui >}}Enabled{{< /ui >}}를 {{< ui >}}Yes{{< /ui >}}로 설정합니다.
4. {{< ui >}}Save{{< /ui >}} 아이콘을 클릭합니다.
5. {{< ui >}}Target Object actions{{< /ui >}}에서 Create, Update 및 Delete 작업이 선택되어 있는지 확인합니다.
6. 속성 매핑 섹션에서 Microsoft Entra ID에서 Datadog으로 동기화되는 사용자 속성을 검토합니다. 다음 매핑을 설정합니다.
| Microsoft Entra ID Attribute     | Datadog Attribute              |
|----------------------------------|--------------------------------|
| `userPrincipalName`              | `userName`                     |
| `Not([IsSoftDeleted])`           | `active`                       |
| `jobTitle`                       | `title`                        |
| `mail`                           | `emails[type eq "work"].value` |
| `displayName`                    | `name.formatted`               |
| `AppRoleAssignmentsComplex([appRoleAssignments])` | `roles`               |

   {{< img src="/account_management/scim/ad-users-2.png" alt="속성 매핑 구성, Azure Active Directory 사용자 프로비저닝">}}

7. 매핑을 설정한 후 {{< ui >}}Save{{< /ui >}}를 클릭합니다.

사용자의 Datadog 역할(기본 제공 또는 사용자 지정)을 프로비저닝하려면 먼저 Microsoft Entra 앱 등록에서 앱 역할을 정의하세요. 프로비저닝하려는 각 Datadog 역할에 대해 하나의 앱 역할을 생성하세요. 관련 사용자 또는 그룹을 해당 앱 역할에 할당하세요. 각 앱 역할의 **Display name**을 Datadog 역할 이름으로, **Value**를 해당 Datadog 역할 UUID로 설정하세요. Datadog 역할 이름이나 SAML 역할 클레임 값을 앱 역할의 **Value**로 사용하지 마세요. [조직 설정][11] 페이지의 역할 URL에서 역할의 UUID를 찾을 수 있습니다. 구성 지침은 [Microsoft의 앱 역할 문서][12]를 참조하세요. 앱 역할을 정의한 후 위와 같이 `roles` 속성을 매핑하세요. Microsoft Entra ID 속성에 `AppRoleAssignmentsComplex([appRoleAssignments])` 식을 사용하세요. 대상 속성 드롭다운에서 `roles`를 사용할 수 없는 경우 **다중 값** 문자열 속성으로 추가하세요. 구성 지침은 [Microsoft의 속성 매핑 문서][10]를 참조하세요.

역할은 [RFC 7643][9]에 정의된 SCIM 다중 값 속성 규칙을 따릅니다. SCIM 요청이 여러 역할을 보내는 경우, Datadog은 조직의 역할과 일치하는 역할만 프로비저닝합니다. 일치하는 항목이 없고 조직에 기본 역할이 있는 경우 사용자는 해당 역할로 폴백됩니다. 조직에 기본 역할이 없는 경우 Datadog은 역할 업데이트를 건너뛰고 사용자의 기존 역할을 유지합니다. 일치하지 않는 역할은 Audit Trail에 기록됩니다. 자세한 내용은 [SCIM][1]을 참조하세요.

### 그룹 속성 {#group-attributes}

그룹 매핑은 지원되지 않습니다.

[1]: /ko/account_management/scim/
[2]: /ko/account_management/scim/#using-a-service-account-with-scim
[3]: /ko/api/latest/scim/
[4]: https://app.datadoghq.com/organization-settings/application-keys
[5]: /ko/account_management/org_settings/service_accounts
[6]: https://entra.microsoft.com/
[7]: https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#cloud-application-administrator
[8]: https://learn.microsoft.com/en-us/entra/identity/app-provisioning/application-provisioning-config-problem-scim-compatibility#flags-to-alter-the-scim-behavior
[9]: https://www.rfc-editor.org/rfc/rfc7643.html#section-4.1.2
[10]: https://learn.microsoft.com/en-us/entra/identity/app-provisioning/customize-application-attributes#provisioning-a-role-to-a-scim-app
[11]: https://app.datadoghq.com/organization-settings/roles
[12]: https://learn.microsoft.com/en-us/entra/identity-platform/howto-add-app-roles-in-apps