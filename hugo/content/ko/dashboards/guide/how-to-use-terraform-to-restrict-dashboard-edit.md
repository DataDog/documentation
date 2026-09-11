---
aliases:
- /ko/dashboards/faq/how-to-use-terraform-to-restrict-dashboards
- /ko/dashboards/guide/how-to-use-terraform-to-restrict-dashboards
title: Terraform을 사용하여 대시보드 편집을 제한하는 방법
---


## restricted_roles 속성을 사용하여 대시보드 제한

`restricted_roles` 속성을 사용하여 대시보드 편집을 특정 역할로 제한할 수 있습니다. 이 필드는 역할의 ID 목록을 가져와 연관된 사용자에게 권한을 부여합니다.

사용 예시:

```hcl
resource "datadog_dashboard" "example" {
  title         = "Example dashboard"
  restricted_roles = ["<role_id_1>", "<role_id_2>"]
}
```

*참고**: `is_read_only` 속성은 더 이상 사용되지 않습니다. 대시보드에 대한 액세스를 관리하려면 `restricted_roles` 속성 또는 제한 정책을 사용하는 것이 좋습니다.

## 제한 정책을 사용하여 대시보드 제한

<div class="alert alert-danger">제한 정책은 평가판 버전입니다. 액세스하려면 <a href="/help/">Datadog 지원팀</a> 또는 고객 성공 관리자에게 문의하세요.</div>

[제한 정책][1]을 사용하면 대시보드 및 기타 리소스의 편집을 역할, 팀, 사용자, 서비스 계정을 포함한 특정 주체로 제한할 수 있습니다.

사용 예시:

```hcl
resource "datadog_dashboard" "example" {
  title         = "Example dashboard"
  # Do not use restricted_roles or is_read_only attributes
}

resource "datadog_restriction_policy" "example" {
 resource_id = "dashboard:${datadog_dashboard.example.id}"
  bindings {
     principals = ["org:<org_id>"]
     relation = "viewer"
  }
  bindings {
     principals = ["role:<role_id_1>", "role:<role_id_2>"]
     relation = "editor"
  }
}
```

Role ID는 [Roles API][2], [Roles UI][5]에서 검색하거나 [datadog_role][3] 리소스에 대해 Terraform에 정의된 역할 ID를 사용하여 검색할 수 있습니다.

조직 ID는 [GET /api/v2/current_user API][4] 요청에서 얻을 수 있습니다. `data.relationships.org.data.id` 필드에서 찾아보세요.




[1]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/restriction_policy
[2]: /ko/api/latest/roles/#list-roles
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/role
[4]: https://app.datadoghq.com/api/v2/current_user
[5]: https://app.datadoghq.com/organization-settings/roles