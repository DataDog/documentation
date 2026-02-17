---
title: "Dashboards API: Migrate from is_read_only"
description: Migrate from deprecated is_read_only attribute to restricted_roles or Restriction Policies for dashboard access control.
further_reading:
- link: "/dashboards/guide/how-to-use-terraform-to-restrict-dashboard-edit/"
  tag: "Guide"
  text: "How to use Terraform to restrict the editing of a dashboard"
- link: "/api/latest/restriction-policies/"
  tag: "API"
  text: Restriction Policies  
---

## Overview

Datadog is removing support for the `is_read_only` attribute in the Dashboards API's. For customers who manage Dashboards with the API directly, Datadog recommends that you transition to [`restricted_roles`](#migrate-to-restricted_roles) or [Restriction Policies](#restriction-policies). 

## Actions to take

Migrate off of `is_read_only` to `restricted_roles` or consider participating in Preview for Restriction Policies.

### Migrate to `restricted_roles`

The `restricted_roles` parameter allows Dashboard owners to assign specific permissions to users with roles.

Migrating to `restricted_roles` can be done independently. For more information, see the [Dashboard API][1] documentation.

### Restriction Policies

Restriction Policies for Dashboards defines the access control rules for a resource. It maps a set of relations (editor and viewer) to a set of allowed principals (roles, teams, or users). 

If you're managing Dashboards through Terraform: 
1. Ensure that you're using Datadog Terraform Provider v3.27.0 or higher.
2. Remove `is_read_only` and `restricted_role` from your Dashboard Terraform resources. 
3. Create a new [datadog_restriction_policy][2] resource, referencing the respective Dashboard id and principals from the recently removed attributes. 
4. Run `terraform apply`.

For an example of a Terraform resources, see the guide on [How to use Terraform to restrict the editing of a dashboard][3].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/latest/dashboards/
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/restriction_policy
[3]: /dashboards/guide/how-to-use-terraform-to-restrict-dashboard-edit/#restricting-a-dashboard-using-a-restriction-policy
