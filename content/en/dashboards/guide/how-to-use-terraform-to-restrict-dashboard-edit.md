---
title: How to use Terraform to restrict the editing of a dashboard
kind: guide
aliases:
  - /dashboards/faq/how-to-use-terraform-to-restrict-dashboards
  - /dashboards/guide/how-to-use-terraform-to-restrict-dashboards
---


## Introduction

Previously when you wanted to restrict editing of dashboards created and managed by [Terraform][1], you would use the `is_read_only` attribute to define that editing the dashboard is restricted to the creator or users with the Access Management (`user_access_manage`) permission in your organization. With the introduction of `restricted_roles`, you can list specific roles that can edit this dashboard within your organization.

## Restricting a dashboard

If you're already using `is_read_only` in your definition, this continues to work while your organizational users see and use the role list. To properly synchronize your Terraform definitions and the experience the Datadog application, complete the following steps:

1. Update your Datadog Terraform provider to version 3.1.0 or above.

2. Find the UUID of the roles that you want to restrict by either retrieving the UUID from the [Roles APIs][2] or Roles UI, or referring to role ID as defined in Terraform for [Terraform managed Roles][3].

3. Where you're using `is_read_only` in Dashboard definitions, replace them with `restricted_roles`:

{{< img src="dashboards/guide/terraform_is_read_only_definition.png" alt="Read-only dashboards" style="width:80%;">}}

{{< img src="dashboards/guide/terraform_restricted_role_definition.png" alt="Dashboards restricted by roles" style="width:80%;">}}

## Common issues

### `is_read_only` is still enabled for my dashboard

This configuration still works. Every Terraform run detects any changes to roles or read only and notify you if `is_read_only` is being changed.

### Terraform is warning that `is_read_only` has been removed

This is because your browser converts the old permission flag to the newer and more advanced permissions scheme. If you update terraform to 3.1.0 or above, the new restricted roles fields is available.

This change is an aesthetic change only, and doesn’t change any functionality or security settings of the dashboard. When you re-apply your Terraform configuration, it replaces the change with the original `is_read_only` attribute.

[1]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/dashboard
[2]: /api/latest/roles/#list-roles
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/role
