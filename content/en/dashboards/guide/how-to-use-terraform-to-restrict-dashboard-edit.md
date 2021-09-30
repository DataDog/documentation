---
title: How to use Terraform to restrict edits to your Dashboards?
kind: guide
aliases:
  - /dashboards/faq/how-to-use-terraform-to-restrict-dashboards
  - /dashboards/guide/how-to-use-terraform-to-restrict-dashboards
---


## Introduction

Previously when users wanted to restrict editing of dashboards created and managed by Terraform[1] they would use the `is_read_only` attribute to define that the dashboard is edit restricted to the creator or users in the org with the Privileged Access (Admin) permission. With the introduction of `restricted_roles` users can now list specific roles in their organization that can edit this dashboard.

## What do I do to restrict a dashboard?

If you're already using `is_read_only` in your definition this will continue to work while your users see and use the role list. In order to properly synchronize your Terraform definitions and the experience the Datadog application you should:

1. Update your Datadog Terraform provider to version 3.1.0 or above.

2. Find the UUID of the Roles that you want to restrict by either by getting the UUID from the Roles APIs[2] or Roles UI, or referring to role id as defined in Terraform for Terraform managed Roles[3].

3. Where you're using `is_read_only` in Dashboard definitions, replace them with `restricted_roles`:
{{< img src="dashboards/guide/terraform_is_read_only_definition.png" alt="Read Only Dashboards" style="width:50%;">}}
{{< img src="dashboards/guide/terraform_restricted_role_definition.png" alt="Dashboards restricted by roles" style="width:50%;">}}

## FAQ

### I have is_read_only enabled for my dashboard. Will that still work ?

Absolutely. Every Terraform run will detect any changes to roles or read only and notify you if read_only is being changed.

### I used `is_read_only` in Terraform - and with my permissions I changed something in the Dashboard on the browser, but now Terraform is warning me that `is_read_only` has been removed, what's going on?

This is because your browser converts the old permission flag to the newer and more advanced permissioning scheme. If you update terraform to 3.1.0 or above, you’ll be able to see the new restricted roles fields as well.

This is simply an aesthetic conversion and doesn’t change any functionality or security settings of the dashboard. When you reapply your Terraform configuration it replaces the change with the original `is_read_only` attribute.



[1]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/dashboard
[2]: /api/latest/roles/#list-roles
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/role
