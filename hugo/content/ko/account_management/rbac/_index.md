---
algolia:
  tags:
  - rbac
aliases:
- /ko/guides/rbac
- /ko/account_management/rbac/role_api
- /ko/account_management/users/default_roles
- /ko/account_management/users/custom_roles
- /ko/account_management/rbac/log_management
description: 역할 기반 권한, 사용자 지정 역할 및 대시보드, 모니터, 기타 Datadog 리소스에 대한 세분화된 액세스 제어를 사용하여
  사용자 액세스를 관리합니다.
further_reading:
- link: /api/v2/roles/
  tag: 설명서
  text: Roles API로 역할 및 권한 관리
- link: /api/v2/roles/#list-permissions
  tag: 설명서
  text: Permissions API로 권한 관리
- link: /account_management/rbac/permissions
  tag: 설명서
  text: 사용 가능한 권한 목록을 살펴보세요
- link: /account_management/saml/
  tag: 설명서
  text: SAML로 싱글 사인온 활성화
- link: https://www.datadoghq.com/blog/compliance-governance-transparency-with-datadog-audit-trail/
  tag: 블로그
  text: Datadog Audit Trail로 팀 전반에 규정 준수, 거버넌스 및 투명성 구축
title: Access Control
---
## 개요 {#overview}

Datadog은 Datadog 리소스에 대한 액세스 제어 수준을 맞춤 설정할 수 있도록 유연한 액세스 관리 시스템을 제공합니다.

기본 기능만 필요한 사용자는 [권한][1]이 포함된 기본 제공 [역할](#role-based-access-control)을 사용할 수 있습니다. 더 높은 유연성이 필요한 경우, 직접 [사용자 지정 역할](#custom-roles)을 생성하여 여러 권한을 새로운 역할로 조합할 수 있습니다. 사용자 지정 역할에 연결된 권한은 특정 리소스 유형의 모든 리소스에 적용됩니다.

최대한의 유연성이 필요한 조직과 사용자는 [세부적인 액세스 제어][2]를 통해 개별 대시보드, 노트북 및 기타 리소스에 대한 액세스를 제어할 수 있습니다.

## 역할 기반 액세스 제어 {#role-based-access-control}

역할은 사용자를 분류하고 해당 사용자가 보유한 계정 권한을 정의합니다. 예를 들어, 어떤 데이터를 읽을 수 있는지 또는 어떤 계정 자산을 수정할 수 있는지 등을 결정합니다. 기본적으로 Datadog은 세 가지 역할을 제공하며, 사용자의 역할과 권한을 보다 적절하게 매핑할 수 있도록 [사용자 지정 역할](#custom-roles)을 생성할 수 있습니다.

역할에 권한을 부여하면 해당 역할과 연결된 모든 사용자가 그 권한을 부여받습니다. 사용자가 여러 역할에 연결되어 있으면 각 역할에 부여된 모든 권한을 갖게 됩니다. 사용자에게 연결된 역할이 많을수록 Datadog 계정 내에서 더 많은 액세스 권한을 갖게 됩니다.

[하위 조직][3]의 사용자가 `org_management` 권한을 가지고 있더라도, 상위 조직에서 동일한 권한을 가진다는 의미는 아닙니다. 사용자의 역할은 상위 조직과 하위 조직 간에 공유되지 않습니다.

**참고**: SAML ID 공급자를 사용하는 경우 인증을 위해 Datadog과 통합할 수 있으며 ID 속성을 Datadog 기본 및 사용자 지정 역할에 매핑할 수 있습니다. 자세한 내용은 [SAML 그룹 매핑][4]을 참조하세요.

## Datadog 기본 역할 {#datadog-default-roles}

Datadog Admin 역할
: 사용자는 청구 정보에 액세스할 수 있으며 API 키를 취소할 수 있습니다. 또한 사용자를 관리하고 [읽기 전용 대시보드][5]를 구성할 수 있습니다. 표준 사용자를 관리자 권한으로 승격할 수도 있습니다.

Datadog Standard 역할
: 사용자는 Datadog이 제공하는 모든 모니터링 기능(예: [대시보드][5], [모니터][6], [이벤트][7], [노트북][11])을 조회하고 수정할 수 있습니다. Standard 사용자는 조직에 다른 사용자를 초대할 수도 있습니다.

Datadog Read Only 역할
: 사용자는 Datadog 내에서 편집할 수 있는 권한이 없습니다. 이 역할은 고객과 특정 읽기 전용 화면을 공유하거나 한 사업부의 구성원이 부서 외부 사용자와 [대시보드][5]를 공유해야 할 때 유용합니다.

## 사용자 지정 역할 {#custom-roles}

사용자 지정 역할 기능을 사용하면 조직에서 고유한 권한 집합을 가진 새로운 역할을 생성할 수 있습니다. Datadog 사이트, [Datadog Role API][8] 또는 SAML을 통해 사용자 지정 역할을 관리할 수 있습니다. 아래에서 역할 생성, 업데이트 및 삭제 방법을 확인할 수 있습니다. 사용 가능한 권한에 대한 자세한 내용은 [Datadog 역할 권한][1]을 참조하세요. Datadog에서 역할을 생성하거나 편집하려면 User Access Manage 권한이 있어야 합니다.

### 사용자 지정 역할 활성화 {#enable-custom-roles}

1. [Organization Settings][9]로 이동합니다.
2. 페이지 왼쪽에서 {{< ui >}}Roles{{< /ui >}}를 선택합니다.
3. 오른쪽 상단의 톱니바퀴 아이콘을 클릭합니다. Custom Roles 팝업이 표시됩니다.
4. Custom Roles 팝업에서 {{< ui >}}Enable{{< /ui >}}을 클릭합니다.

{{< img src="account_management/rbac/enable_custom_roles.png" alt="Enable 버튼이 표시된 Custom Roles 팝업" style="width:90%;">}}

또는 [역할 API 엔드포인트 생성][10]에 대한 POST 호출을 수행하면 사용자 조직의 사용자 지정 역할이 자동으로 활성화됩니다.

### 사용자 지정 역할 생성 {#create-a-custom-role}

{{< tabs >}}
{{% tab "Datadog 애플리케이션" %}}

사용자 지정 역할을 생성하려면 다음을 수행합니다.

1. [Datadog Roles 페이지][1]로 이동합니다.
2. 페이지 오른쪽 상단에서 {{< ui >}}New Role{{< /ui >}}을 선택합니다.
3. 역할 이름을 입력합니다.
4. 역할에 권한 집합을 할당합니다. 사용 가능한 권한에 대한 자세한 내용은 [Datadog 역할 권한][2]을 참조하세요.

역할이 생성되면 [기존 사용자에게 역할을 추가][3]할 수 있습니다.


[1]: https://app.datadoghq.com/access/roles
[2]: /ko/account_management/rbac/permissions/
[3]: /ko/account_management/users/#edit-a-user-roles
{{% /tab %}}
{{% tab "API" %}}

역할 생성 방법의 예시는 [역할 API 생성 레퍼런스][1]를 참조하세요.


[1]: /ko/api/latest/roles/#create-role
{{% /tab %}}
{{< /tabs >}}

### 역할 업데이트 {#update-a-role}

{{< tabs >}}
{{% tab "Datadog 애플리케이션" %}}

사용자 지정 역할을 편집하려면 다음을 수행합니다.

1. [Datadog Roles 페이지][1]로 이동합니다.
2. 수정하려는 역할의 편집 버튼을 선택합니다.
3. 역할의 권한 집합을 수정합니다. 사용 가능한 권한에 대한 자세한 내용은 [역할 권한][2]을 참조하세요.
4. 변경 사항을 저장합니다.


역할이 수정되면 해당 역할이 있는 모든 사용자의 권한이 업데이트됩니다.


[1]: https://app.datadoghq.com/access/roles
[2]: /ko/account_management/rbac/permissions/
{{% /tab %}}
{{% tab "API" %}}

역할 업데이트 방법의 예시는 [역할 API 업데이트][1]를 참조하세요.


[1]: /ko/api/latest/roles/#update-a-role
{{% /tab %}}
{{< /tabs >}}

### 역할 복제 {#clone-a-role}

{{< tabs >}}
{{% tab "Datadog 애플리케이션" %}}

기존 역할을 복제하려면 다음을 수행합니다.

1. [Datadog Roles 페이지][1]로 이동합니다.
2. 복제하려는 역할 위에 마우스를 올립니다. 오른쪽에 여러 버튼이 표시됩니다.
3. 복제하려는 역할의 복제 버튼을 선택합니다.
4. 필요에 따라 역할 이름 또는 권한을 수정합니다.
5. 하단의 {{< ui >}}Save{{< /ui >}} 버튼을 클릭합니다.

{{< img src="account_management/rbac/clone_role.png" alt="Clone 버튼이 강조 표시된 두 개의 역할 목록" style="width:90%;">}}


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

역할 복제 방법의 예시는 [역할 API 복제 레퍼런스][1]를 참조하세요.

[1]: /ko/api/latest/roles/#create-a-new-role-by-cloning-an-existing-role
{{% /tab %}}
{{< /tabs >}}

### 역할 삭제 {#delete-a-role}

{{< tabs >}}
{{% tab "Datadog 애플리케이션" %}}

사용자 지정 역할을 삭제하려면 다음을 수행합니다.

1. [Datadog Roles 페이지][1]로 이동합니다.
2. 삭제하려는 역할 위에 마우스를 올립니다. 오른쪽에 여러 버튼이 표시됩니다.
3. 삭제하려는 역할의 삭제 버튼을 선택합니다.
4. 삭제 여부를 확인합니다.


역할이 삭제되면 해당 역할을 가진 모든 사용자의 권한이 업데이트됩니다. 역할이 없는 사용자는 Datadog을 효과적으로 사용할 수 없지만, 제한적인 액세스 권한은 계속 유지됩니다.


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

역할 삭제 방법의 예시는 [역할 API 삭제 레퍼런스][1]를 참조하세요.


[1]: /ko/api/latest/roles/#delete-role
{{% /tab %}}
{{< /tabs >}}

### 역할 템플릿 적용 {#apply-a-role-template}

Datadog 사이트에서 역할을 생성하거나 업데이트할 때 Datadog 역할 템플릿을 사용하여 정해진 권한 세트를 해당 역할에 적용할 수 있습니다.

1. New Role 또는 Edit Role 페이지에서 오른쪽에 있는 {{< ui >}}Show Role Templates{{< /ui >}} 버튼을 클릭합니다.
2. 역할 템플릿이 포함된 드롭다운 메뉴가 나타납니다.
3. 메뉴에서 사용자의 역할에 적용할 권한이 있는 역할 템플릿을 선택합니다.
4. {{< ui >}}Apply{{< /ui >}} 버튼을 클릭합니다.
4. 필요에 따라 역할을 추가로 수정합니다.
5. {{< ui >}}Save{{< /ui >}} 버튼을 클릭합니다.

{{< img src="account_management/rbac/role_templates.png" alt="Datadog Billing Admin Role이 선택된 Role Templates 드롭다운 메뉴" style="width:90%;">}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/rbac/permissions/
[2]: /ko/account_management/rbac/granular_access/
[3]: /ko/account_management/multi_organization/
[4]: /ko/account_management/saml/mapping/
[5]: /ko/dashboards/
[6]: /ko/monitors/
[7]: /ko/events/
[8]: /ko/api/v2/roles/
[9]: https://app.datadoghq.com/organization-settings/
[10]: /ko/api/latest/roles/#create-role
[11]: /ko/notebooks