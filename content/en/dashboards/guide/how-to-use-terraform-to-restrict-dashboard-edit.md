---
title: How to use Terraform to restrict the editing of a dashboard
aliases:
  - /dashboards/faq/how-to-use-terraform-to-restrict-dashboards
  - /dashboards/guide/how-to-use-terraform-to-restrict-dashboards
---


## Restricting a dashboard using the restricted_roles attribute

The `restricted_roles` attribute can be used to restrict editing of the dashboard to specific roles. The field takes a list of IDs of roles, and authorizes any associated users.

Example usage:

```hcl
resource "datadog_dashboard" "example" {
  title         = "Example dashboard"
  restricted_roles = ["<role_id_1>", "<role_id_2>"]
}
```

**Note**: The `is_read_only` attribute is deprecated. It is recommended to use the `restricted_roles` attribute or restriction policies to manage access to your dashboards.

## Restricting a dashboard using a restriction policy

<div class="alert alert-warning">Restriction policies are in private beta. Contact <a href="/help/">Datadog Support</a> or your Customer Success Manager for access.</div>

[Restriction Policies][1] allow you to restrict the editing of dashboards and other resources to specific principals, including roles, teams, users, and service accounts.

Example usage:

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

Role IDs can be retrieved from the [Roles API][2], [Roles UI][5], or by using the role ID defined in Terraform for [datadog_role][3] resources.

Org ID can be obtained from the [GET /api/v2/current_user API][4] request. Find it in the `data.relationships.org.data.id` field. 




[1]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/restriction_policy
[2]: /api/latest/roles/#list-roles
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/role
[4]: https://app.datadoghq.com/api/v2/current_user
[5]: https://app.datadoghq.com/organization-settings/roles
