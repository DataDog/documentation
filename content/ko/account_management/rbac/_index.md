---
aliases:
- /ko/guides/rbac
- /ko/account_management/rbac/role_api
- /ko/account_management/users/default_roles
- /ko/account_management/users/custom_roles
- /ko/account_management/rbac/log_management
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
  text: Datadog Audit Trail로 팀 전반에 컴플라이언스, 거버넌스 및 투명성 구축
title: 액세스 제어
---

## 개요

Datadog은 Datadog 리소스에 대한 액세스 제어 수준을 맞춤 설정할 수 있도록 유연한 액세스 관리 시스템을 제공합니다.

기본 기능을 원하는 사용자는 [권한][1]을 통해 OOTB [역할](#role-based-access-control)에 액세스할 수 있습니다. 유연성을 높이려면 자신만의 [맞춤 역할](#custom-roles)을 만들어 권한을 새 역할에 결합하세요. 커스텀 역할에 연결된 권한은 특정 리소스 유형의 모든 리소스에 적용됩니다.

최대한의 유연성이 필요한 조직과 사용자는 [세부적인 액세스 제어][2]를 통해 개별 대시보드, 노트북 및 기타 리소스에 대한 액세스를 제어할 수 있습니다.

## 역할 기반 액세스 제어

역할은 사용자를 분류하며, 사용자가 읽을 수 있는 데이터나 사용자가 수정할 수 있는 계정 자산 등 사용자가 보유한 계정 권한을 정의합니다. 기본적으로 Datadog는 세 가지 역할을 제공하며 사용자는 [커스텀 역할](#custom-roles)을 생성하여 사용자와 자신의 권한 간에 더 나은 매핑을 정의할 수 있습니다.

역할에 권한을 부여하면 해당 역할과 연결된 모든 사용자는 해당 권한을 받게 됩니다. 여러 역할에 연결된 사용자는 각 역할에 부여된 모든 권한을 받게 됩니다. 사용자는 연결된 역할이 많을수록 Datadog 계정 내에서 더 많은 액세스 권한을 갖게 됩니다.

[하위 조직][3]의 사용자에게 `org_management` 권한이 있다고 해서 상위 조직에서도 동일한 권한이 있다는 의미는 아닙니다. 사용자의 역할은 상위 조직과 하위 조직 간에 공유되지 않습니다.

**참고**: SAML ID 공급자를 사용하는 경우 인증을 위해 Datadog과 통합할 수 있으며 ID 속성을 Datadog 기본 및 사용자 커스텀 역할에 매핑할 수 있습니다. 자세한 내용은 [SAML 그룹 매핑][4]을 참조하세요.

## Datadog 기본 역할

Datadog 관리자 역할
: 사용자는 결제 정보에 액세스하고 API 키를 취소할 수 있습니다. 사용자를 관리하고 [읽기 전용 대시보드][5]를 설정할 수 있습니다. 또한 표준 사용자를 관리자로 승격시킬 수도 있습니다.

Datadog 표준 역할
: 사용자는 [대시보드][5], [모니터][6], [이벤트][7], [노트북][8] 등 Datadog이 제공하는 모든 모니터링 기능을 보고 수정할 수 있습니다. 표준 사용자는 다른 사용자를 조직에 초대할 수도 있습니다.

Datadog 읽기 전용 역할
: 사용자는 Datadog 내에서 편집할 수 있는 권한이 없습니다. 이는 특정 읽기 전용 보기를 클라이언트와 공유하려는 경우 또는 한 사업부의 구성원이 해당 부서 외부의 누군가와 [대시보드][5]를 공유해야 할 때 유용합니다.

## 커스텀 역할

커스텀 역할 기능을 사용하면 조직에서 고유한 권한 집합을 사용하여 새 역할을 생성할 수 있습니다. Datadog 사이트, [Datadog Role API][8] 또는 SAML을 통해 커스텀 역할을 직접 관리하세요. 아래에서 역할을 생성, 업데이트 또는 삭제하는 방법을 알아보세요. 사용 가능한 권한에 대한 자세한 내용은 [Datadog 역할 권한][1]을 참조하시기 바랍니다. 사용자 액세스 관리 권한이 있는 사용자만 Datadog에서 역할을 생성하거나 편집할 수 있습니다.

### 커스텀 역할 활성화

1. [Organization Settings][9]로 이동합니다. 
2. 페이지 왼쪽에서 **Roles**를 선택합니다.
3. 오른쪽 상단 모서리에 있는 톱니바퀴를 클릭합니다. Custom Roles 팝업창이 나타납니다.
4. Custom Roles 팝업창에서 **Enable**을 클릭합니다.

{{< img src="account_management/rbac/enable_custom_roles.png" alt="Custom Roles pop-up with Enable button" style="width:90%;">}}

또는 [Create Role API endpoint][10]에 대한 POST 호출을 수행하면 사용자 조직의 커스텀 역할이 자동으로 활성화됩니다.

### 커스텀 역할 생성

{{< tabs >}}
{{% tab "Datadog application" %}}

커스텀 역할을 생성하는 방법은 다음과 같습니다.

1. [Datadog 역할 페이지][1]로 이동합니다.
2. 페이지 상단 오른쪽 모서리에서 **New Role**을 선택합니다.
3. 해당 역할에 이름을 부여합니다.
4. 해당 역할에 권한 세트를 할당합니다. 사용 가능한 권한에 대한 자세한 내용은 [Datadog 역할 권한][2]을 참조하세요.

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

### 역할 업데이트

{{< tabs >}}
{{% tab "Datadog application" %}}

커스텀 역할을 편집하는 방법은 다음과 같습니다.

1. [Datadog Roles 페이지][1]로 이동합니다.
2. 수정하려는 역할에서 편집 버튼을 선택합니다.
3. 해당 역할의 권한 집합을 수정합니다. 사용 가능한 권한에 대한 자세한 내용은 [역할 권한][2]을 참조하세요.
4. 수정 사항을 저장합니다.


역할이 수정되면 해당 역할이 있는 모든 사용자의 권한이 업데이트됩니다.


[1]: https://app.datadoghq.com/access/roles
[2]: /ko/account_management/rbac/permissions/
{{% /tab %}}
{{% tab "API" %}}

역할 업데이트 방법의 예시는 [역할 API 업데이트][1]를 참조하세요.


[1]: /ko/api/latest/roles/#update-a-role
{{% /tab %}}
{{< /tabs >}}

### 역할 복제

{{< tabs >}}
{{% tab "Datadog application" %}}

기존 역할을 복제하는 방법은 다음과 같습니다.

1. [Datadog Roles 페이지][1]로 이동합니다.
2. 복제하려는 역할 위로 마우스를 가져갑니다. 여러 버튼이 오른쪽에 나타납니다.
3. 복제하려는 역할에서 복제 버튼을 선택합니다.
4. 역할의 이름 또는 권한을 수정할 수 있습니다.
5. 하단의 **Save** 버튼을 클릭합니다.

{{< img src="account_management/rbac/clone_role.png" alt="List of two roles with Clone button highlighted" style="width:90%;">}}


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

역할 복제 방법의 예시는 [역할 API 복제 레퍼런스][1]를 참조하세요.

[1]: /ko/api/latest/roles/#create-a-new-role-by-cloning-an-existing-role
{{% /tab %}}
{{< /tabs >}}

### 역할 삭제

{{< tabs >}}
{{% tab "Datadog application" %}}

커스텀 역할을 삭제하는 방법은 다음과 같습니다.

1. [Datadog Roles 페이지][1]로 이동합니다.
2. 삭제하려는 역할 위로 마우스를 가져갑니다. 여러 버튼이 오른쪽에 나타납니다.
3. 삭제하려는 역할에서 삭제 버튼을 선택합니다.
4. 결정 사항을 확인합니다.


역할이 삭제되면 해당 역할이 있는 모든 사용자의 권한이 업데이트됩니다. 해당 역할이 없는 사용자는 Datadog를 효과적으로 사용할 수 없지만, 제한된 액세스 권한을 계속 유지합니다.


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

역할 삭제 방법의 예시는 [역할 API 삭제 레퍼런스][1]를 참조하세요.


[1]: /ko/api/latest/roles/#delete-role
{{% /tab %}}
{{< /tabs >}}

### 역할 템플릿 적용

Datadog 사이트에서 역할을 생성하거나 업데이트할 때 Datadog 역할 템플릿을 사용하여 정해진 권한 세트를 해당 역할에 적용할 수 있습니다.

1. 새 역할 또는 역할 편집 페이지에서 오른쪽의 **역할 템플릿 표시** 버튼을 클릭합니다.
2. 역할 템플릿으로 채워진 드롭다운 메뉴가 나타납니다.
3. 메뉴에서 사용자의 역할에 적용할 권한이 있는 역할 템플릿을 선택합니다.
4. **적용** 버튼을 클릭합니다.
4. 역할을 추가로 변경할 수 있습니다.
5. **Save** 버튼을 클릭합니다.

{{< img src="account_management/rbac/role_templates.png" alt="Role Templates dropdown menu with Datadog Billing Admin Role selected" style="width:90%;">}}

## 참고 자료

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