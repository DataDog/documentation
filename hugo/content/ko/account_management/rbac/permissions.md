---
algolia:
  category: Documentation
  rank: 80
  subcategory: Datadog Role Permissions
aliases:
- /ko/account_management/faq/managing-global-role-permissions
description: 관리형 역할, 사용자 지정 역할, 민감한 권한 및 권한 목록을 포함한 Datadog 권한과 관련된 전체 참조 문서입니다.
disable_toc: true
further_reading:
- link: /account_management/rbac/
  tag: 설명서
  text: 역할을 생성, 업데이트 및 삭제하는 방법 알아보기
- link: /api/v2/roles/#list-permissions
  tag: 설명서
  text: Permission API로 권한 관리
title: Datadog 역할 권한
---
## 권한 {#permissions}

권한은 주어진 리소스에 대하여 사용자가 보유한 액세스의 유형을 정의합니다. 일반적으로 권한은 사용자에게 개체를 읽고, 편집하고 삭제할 권리를 부여합니다. 권한(permission)은 세 가지 관리형 역할과 사용자 지정 역할을 비롯한 모든 역할의 액세스 권한을 구성하는 기반이 됩니다.

### 민감한 권한 {#sensitive-permissions}

일부 Datadog 권한은 더욱 특별한 기능에 액세스할 수 있는 기능을 제공합니다. 다음과 같은 내용을 숙지하는 것이 좋습니다.

- 조직 설정을 변경하기 위한 액세스
- 잠재적으로 민감한 데이터를 읽기 위한 액세스
- 특권 작업을 수행하기 위한 액세스

민감한 권한은 역할 및 권한 인터페이스에서 플래그되어 추가적인 자세한 조사가 필요할 수 있다는 사실을 나타냅니다. 역할을 구성하는 관리자가 이러한 권한에 특히 주의를 기울이고, 역할과 사용자에게 이러한 권한 중 어떤 것이 할당되는지 확인하는 것이 좋습니다.

### 미리 보기 모드 권한 {#preview-mode-permissions}

일부 권한은 완전히 적용되기 전에 '미리 보기 모드'로 표시됩니다. 이 기간에는:

- 앱에서 미리 보기 권한에 '미리 보기' 배지가 표시됨
- 미리 보기 기간이 종료될 때까지 액세스를 제한하지 않음
- 미리 보기는 일반적으로 2~4주 지속되고 이후 적용이 시작됨
- 관리자가 이 기간에 역할을 적절하게 구성해야 함

미리 보기 모드를 사용하면 조직의 관리자가 특정 새 권한을 옵트인할 수 있어서, 이전에는 제한이 없었던 리소스에 대한 액세스가 손실되지 않도록 할 수 있습니다. 각 미리 보기 모드 권한에 연결된 릴리스 노트를 보면 해당 권한이 언제 생성되었고, 언제 적용되는지 표시되어 있습니다. 이러한 권한은 미리 보기 중에는 액세스를 제한하지 않지만, Datadog에서는 중단을 방지하기 위해 적용되기 전에 역할 구성을 업데이트하도록 권장합니다.

### 제한된 권한 {#restricted-permissions}

제한된 권한은 Datadog 환경의 핵심 기능을 지원하며, 기본적으로 모든 역할에 자동으로 할당됩니다. 이러한 기본 권한을 제거하면 사용자와 Datadog 간의 상호 작용 방식에 영향을 줄 수 있습니다. 예를 들어, 사용자가 본인 프로필을 조회하거나 편집할 수 없거나, 표준 플랫폼 기능을 이용하지 못할 수 있습니다.

다음 권한은 UI에서 직접 제거할 수 있습니다. [역할 생성][4] 및 [역할 업데이트][5] API 사용 시 해당 권한을 제외하려면 요청 본문에서 `default_permissions_opt_out: true`를 설정합니다.

| 권한 | 식별자 |
|---|---|
| 대시보드 읽기 | `dashboards_read` |
| 모니터 읽기 | `monitors_read` |
| APM 읽기 | `apm_read` |
| 인시던트 읽기 | `incident_read` |
| RUM 앱 읽기 | `rum_apps_read` |
| Notebooks 읽기 | `notebooks_read` |
| SLO 읽기 | `slos_read` |
| CI Visibility 읽기 | `ci_visibility_read` |
| CD Visibility 읽기 | `cd_visibility_read` |
| Vulnerability Management 읽기 | `appsec_vm_read` |

제한된 권한 없이 역할을 생성하는 요청 예시:

```sh
curl -X POST "https://api.datadoghq.com/api/v2/roles" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d '{
  "data": {
    "attributes": {
      "name": "developers",
      "default_permissions_opt_out": true
    },
    "type": "roles"
  }
}'
```

다음 권한은 오랜 기간에 걸쳐 모든 역할에 암묵적으로 할당되어 왔으나, 이전에는 UI 또는 API를 통한 구성이 가능하도록 노출되지 않았습니다. 이제 [최소 액세스 역할(미리 보기)](#minimal-access-roles-preview)를 활성화하여 이러한 권한을 제거할 수 있도록 하고 `default_permissions_opt_out: true`가 설정된 경우 기본적으로 제외할 수 있습니다.

| 권한 | 식별자 |
|---|---|
| 기본 제공 기능 | `built_in_features` |
| 메트릭 읽기 | `metrics_read` |
| 시계열 쿼리 | `timeseries_query` |
| 이벤트 읽기 | `events_read` |
| 호스트 읽기 | `hosts_read` |
| 사용자 본인 프로필 읽기 | `user_self_profile_read` |
| 사용자 본인 프로필 쓰기 | `user_self_profile_write` |
| 정적 분석 설정 읽기 | `static_analysis_settings_read` |
| Application Security Management Vulnerability Management Library 읽기 | `appsec_vm_library_read` |

## 역할 {#roles}

### 관리형 역할 {#managed-roles}

기본적으로 기존 사용자는 다음 세 가지 관리형 역할에 연결됩니다.

- Datadog Admin 역할
- Datadog Standard 역할
- Datadog Read Only 역할

이러한 역할 중 하나가 있는 모든 사용자는 데이터를 읽을 수 있습니다([개별적으로 읽기가 제한된][1] 리소스는 제외). Admin 및 Standard 사용자에게는 애셋에 대한 쓰기 권한이 있습니다. Admin 사용자에게는 사용자 관리, 조직 관리, 청구 및 사용량과 관련한 민감한 자산에 대한 추가적인 읽기 및 쓰기 권한이 있습니다.

관리형 역할은 Datadog이 생성하고 유지 관리합니다. 이러한 역할의 권한은 새 기능이 추가되거나 권한이 변경됨에 따라 Datadog이 자동으로 업데이트할 수 있습니다. 사용자는 관리형 역할을 직접 수정할 수는 없지만, 관리형 역할을 복제하여 특정 권한이 있는 [사용자 지정 역할](#custom-roles)을 생성할 수 있습니다. 필요한 경우, 사용자는 자신의 계정에서 관리형 역할을 삭제할 수 있습니다.

### 사용자 지정 역할 {#custom-roles}

사용자 지정 역할을 만들어 권한을 새 역할에 결합하세요. 사용자 지정 역할을 하용하면 페르소나를 정의하여(예: 청구 관리자) 그 역할에 적절한 권한을 할당할 수 있습니다. 역할을 생성한 다음에는 [Datadog에서 역할을 직접 업데이트][2]하거나 [Datadog Permission API][3]를 통해 이 역할에 권한을 할당하거나 역할에서 권한을 제거하세요. 역할 페이지에서 해당하는 역할을 선택한 다음 {{< ui >}}Add Permission{{< /ui >}}을 눌러 여러 사용자 지정 역할에 권한을 한꺼번에 추가할 수도 있습니다.

관리형 역할과 달리 사용자 지정 역할은 Datadog이 새 제품과 기능을 출시해도 새 권한을 수신하지는 않습니다(단, 자동 업데이트를 수신하기로 구성된 경우는 예외). 자동 업데이트가 꺼져 있는 경우, 고객은 Datadog이 기존 기능을 제한하는 새 권한을 릴리스하는 경우에만 호환성 유지를 위해 새 권한을 수신합니다.

사용자 지정 역할에 대한 자동 업데이트를 구성하는 방법:

1. 조직 설정 페이지로 이동하여 {{< ui >}}Roles{{< /ui >}} 탭을 클릭합니다.
2. 업데이트하고자 하는 역할을 클릭하고 {{< ui >}}Edit Role{{< /ui >}}을 클릭합니다.
3. {{< ui >}}Automatically Receives Permissions{{< /ui >}} 아래의 드롭다운에서 없음, Datadog Read Only 역할, Datadog Standard 역할 또는 Datadog Admin 역할 옵션을 선택합니다.

사용자 지정 역할이 자동 업데이트를 수신하도록 구성된 경우, 사용자 지정 역할은 선택한 역할 템플릿에 새 권한이 릴리스될 때마다 그러한 새 권한을 수신합니다. 이미 릴리스된 권한은 추가되지 않습니다. 이 역할에서 어떤 권한이든 추가 또는 제거할 수 있으며, 계속 자동 업데이트를 수신할 수 있습니다.

**참고**: 사용자에게 새 사용자 지정 역할을 추가할 때는 해당 사용자와 연결된 관리형 Datadog 역할을 제거해야 새 역할 권한만 엄밀하게 적용됩니다.

### 최소 액세스 역할(미리 보기) {#minimal-access-roles-preview}

<div class="alert alert-info">최소 액세스 역할은 미리 보기로 제공되고 있습니다. 액세스 권한을 요청하려면 Datadog 담당자에게 문의하세요.</div>

최소 액세스 역할을 사용하면 조직에서 사용자가 Datadog에서 수행할 수 있는 작업을 보다 세부적으로 제어할 수 있습니다.

기본적으로 모든 역할에는 Datadog 전반의 핵심 기능을 지원하므로 제거할 수 없는 [제한된 권한](#restricted-permissions)의 기본 세트가 포함되어 있습니다. 최소 액세스 역할을 활성화하면 조직 전체의 사용자 지정 역할에서 해당 권한을 제거할 수 있습니다. 최소 액세스 역할만 보유한 사용자는 특정 Datadog 페이지에서 기능 제한이나 예기치 않은 오류가 발생하는 현상을 겪을 수 있습니다.

이 기능을 활성화하면 다음 권한을 제거할 수 있어, 특수 워크플로에 맞게 제한된 역할을 생성할 수 있습니다.

| 권한 | 식별자 |
|---|---|
| 기본 제공 기능 | `built_in_features` |
| 메트릭 읽기 | `metrics_read` |
| 시계열 쿼리 | `timeseries_query` |
| 이벤트 읽기 | `events_read` |
| 호스트 읽기 | `hosts_read` |
| 사용자 본인 프로필 읽기 | `user_self_profile_read` |
| 사용자 본인 프로필 쓰기 | `user_self_profile_write` |
| 정적 분석 설정 읽기 | `static_analysis_settings_read` |
| Application Security Management Vulnerability Management Library 읽기 | `appsec_vm_library_read` |

[Terraform 역할 리소스][6] 또는 직접 API 호출에서 `default_permissions_opt_out`을 사용하는 경우, 최소 액세스 역할을 활성화하기 전에 이 추가 권한을 고려하여 자동화를 업데이트하세요.

## 권한 목록 {#permissions-list}

다음 표에 Datadog에서 사용 가능한 모든 권한의 이름, 설명 및 기본 역할이 목록으로 나열되어 있습니다. 각 자산 유형에는 해당하는 읽기 및 쓰기 권한이 있습니다.

각 관리형 역할은 권한이 더 적은 역할의 모든 권한을 상속합니다. 따라서 Datadog Standard 역할은 표에 기본 역할이 Datadog Read Only로 표시된 모든 권한을 포함합니다. 또한 Datadog Admin 역할은 Datadog Standard 및 Datadog Read Only 역할 양쪽의 권한을 모두 포함합니다.

{{% permissions %}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Log Rehydration은 Datadog, Inc.의 상표입니다.

[1]: /ko/account_management/rbac/granular_access
[2]: /ko/account_management/users/#edit-a-user-s-roles
[3]: /ko/api/latest/roles/#list-permissions
[4]: /ko/api/latest/roles/#create-role
[5]: /ko/api/latest/roles/#update-a-role
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/role