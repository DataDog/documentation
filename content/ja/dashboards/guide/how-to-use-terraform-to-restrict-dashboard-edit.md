---
aliases:
- /ja/dashboards/faq/how-to-use-terraform-to-restrict-dashboards
- /ja/dashboards/guide/how-to-use-terraform-to-restrict-dashboards
title: How to use Terraform to restrict the editing of a dashboard
---


## restricted_roles 属性を使用したダッシュボードの制限

`restricted_roles` 属性を使用すると、特定のロールにダッシュボードの編集を制限できます。このフィールドはロールの ID リストを取得し、関連するユーザーに編集権限を付与します。

使用例:

```hcl
resource "datadog_dashboard" "example" {
  title         = "Example dashboard"
  restricted_roles = ["<role_id_1>", "<role_id_2>"]
}
```

**注**: `is_read_only` 属性は非推奨です。ダッシュボードへのアクセスを管理するには、`restricted_roles` 属性または制限ポリシーを使用することをお勧めします。

## 制限ポリシーを使用したダッシュボードの制限

<div class="alert alert-warning">制限ポリシーは非公開ベータ版です。アクセスについては、<a href="/help/">Datadog サポート</a>またはカスタマーサクセスマネージャーにお問い合わせください。</div>

[制限ポリシー][1]を使用すると、ダッシュボードやその他のリソースの編集を、ロール、チーム、ユーザー、サービスアカウントなどの特定のプリンシパルに制限できます。

使用例:

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

ロール ID は [Roles API][2] や [Roles UI][5] から取得するか、[datadog_role][3] リソースの Terraform で定義したロール ID を利用します。

組織 ID は [GET /api/v2/current_user API][4] リクエストから取得できます。`data.relationships.org.data.id` フィールドで見つけてください。




[1]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/restriction_policy
[2]: /ja/api/latest/roles/#list-roles
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/role
[4]: https://app.datadoghq.com/api/v2/current_user
[5]: https://app.datadoghq.com/organization-settings/roles