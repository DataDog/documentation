---
title: is_read_only API Attribute Deprecation and Removal
---

## Overview

On November 30, 2024, Datadog will remove support for the `is_read_only` attribute in the Dashboards API's. This is part of our ongoing efforts to enhance our services and streamline our offerings. Datadog is encouraging customers who manage Dashboards with the API directly to transition to `restricted_roles` or Restriction Policies. 

1. `restricted_roles` allow Dashboard owners to assign users with roles with certain permissions.

2. Restriction Policies for Dashboards: While Restriction Policies for Dashboards is in beta, it defines the access control rules for a resource. It maps a set of relations (editor and viewer) to a set of allowed principals (roles, teams, or users). 

## Associated actions

Before November 30, 2024, please migrate off of `is_read_only` to `restricted_roles` or consider participating in the beta for Restriction Policies.

Migrating to `restricted_roles` can be done independently. See API docs [here](https://docs.datadoghq.com/api/latest/dashboards/).

To participate in the beta for Restriction Policies, reach out to Datadog Support or your Customer Success Manager to enable Restriction Policies for Dashboards for your org. If you're managing Dashboards via Terraform: 
1. Ensure that you're using Datadog Terraform Provider v3.27.0 or higher 
2. Remove `is_read_only` and `restricted_role` from your Dashboard Terraform resources. 
3. Create a new [datadog_restriction_policy](https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/restriction_policy) resource, referencing the respective Dashboard id and principals from the recently removed attributes. 
4. Run `terraform apply`

See [this guide](https://docs.datadoghq.com/dashboards/guide/how-to-use-terraform-to-restrict-dashboard-edit/#restricting-a-dashboard-using-a-restriction-policy) for an example of what the Terraform resources look like in the end.

## Timeline

On November 30, 2024, Datadog will: 
1. Stop supporting `is_read_only` in our API. Calls with this property will fail. API responses will no longer return this property.
2. Provide more information regarding the GA of Restriction Policies
