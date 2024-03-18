---
title: How to use Terraform to restrict the editing of a dashboard
kind: guide
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

<div class="alert alert-warning">
The `is_read_only` attribute is deprecated. It is recommended to use the `restricted_roles` attribute or Restriction Policies to manage access to your dashboards.
</div>

## Restricting a dashboard using a restriction policy

{{< callout url="https://www.datadoghq.com/support/" >}}
Restriction policies are in beta. Reach out to Datadog support to enable the feature.
{{< /callout >}} 

[Restriction Policies][1] allow restricting resources to various principals including Roles, Teams, Users, and Service Accounts.

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

Org ID can be obtained from the [Get user details API][4].


[1]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/restriction_policy
[2]: /api/latest/roles/#list-roles
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/role
[4]: https://docs.datadoghq.com/api/latest/users/#get-user-details
[5]: https://app.datadoghq.com/organization-settings/roles
