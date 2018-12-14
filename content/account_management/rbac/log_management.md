---
title: Role Based Access Control
kind: documentation
aliases:
  - /guides/rbac
further_reading:
- link: "account_management/rbac/role_api"
  tag: "Documentation"
  text: "Manage Roles and Permissions with the Role API"
---

<div class="alert alert-warning">
This feature is currently in Private Beta. Ask your Sales representative or Customer Success Manager to have it enabled.
</div>

## Roles

Roles categorize users and define what account permissions those users have, such as what data they can read or what account assets they can modify. By default, Datadog offers three roles, and you can create custom roles so you can define a better mapping between your users and their permissions.

For example, within Log Management you can specify which users can read which log data, and which users can manage log-related account assets, like pipelines, indexes, archives, etc.

By granting permissions to roles, any user who is associated with that role receives that permission. When users are associated with multiple roles, they receive all the permissions granted to each of their roles. The more roles a user is associated with, the more access they will have within a Datadog account.

## Out of the Box Roles

The following roles are available out of the box. By default, users will be associated with one of these three roles:

* **Datadog Admin Role**: Has read and write permissions on all data and assets in a Datadog account.

* **Datadog Standard Role**: Has read permissions on all data and write permissions on most assets in a Datadog account.

* **Datadog Read Only Role**: Has read permissions on all data and write permissions on no assets in a Datadog account.

Users who are associated with any of these roles will, by default, be able to query on all log data in a Datadog account. Users who are associated with the Datadog Admin or Standard Roles will, by default, be able to create or modify all log-related account assets. But the Datadog Standard and Read Only Roles can be modified to limit their permissions.

## Custom Roles

Today, custom roles are imported via SAML integrations from Identity Providers: Datadog can receive the user groups from your IdP and automatically generate roles to match those user groups. In this case, users who sign in via the IdP will automatically be associated with those roles and will have the permissions that are granted to those roles. 

Alternatively, you can also use our "Role" API to create roles, and associate users with those roles.

For existing roles, you can grant/revoke permissions to/from via the "Role" API in order to manage the access of the users associated with those roles.

## Log Management Permissions

The following permissions can be granted to manage read access on subsets of log data:

* **logs_read_index_data**: Grants a role read access on some number of log indexes. This permission can be granted to a role in [the Processing Pipelines page of the Datadog app][1] by editing an index and adding a role to the "Grant access of this index's content to" field (screenshot below).

{{< img src="account_management/rbac/logs_read_index_data.png" alt="Grant read access for indexes to specific roles" responsive="true" style="width:75%;" >}}

* **logs_live_tail**: Grants a role the ability to use the live tail feature. This permission can be granted or revoked from a role via [the Role API][2].

The following permissions can be granted to manage write access on various log-related account assets:

* **logs_modify_indexes**: Grants a role the ability to modify log indexes. This includes setting inclusion filters for which logs should be routed into an index, limiting which roles have read access on that index (logs_read_index_data), and which roles can modify exclusion filters for that index (logs_write_exclusion_filters). This permission can be granted or revoked from a role via [the Role API][2].

* **logs_write_exclusion_filters**: Grants a role the ability to create or modify exclusion filters within an index. This permission can be granted to a role in [the Processing Pipelines page of the Datadog app][1] by editing an index and adding a role to the "Grant editing Exclusion Filters of this index to" field (screenshot below).

{{< img src="account_management/rbac/logs_write_exclusion_filters.png" alt="Grant write access on index exclusion filters to specific roles" responsive="true" style="width:75%;" >}}

* **logs_write_pipelines**: Grants a role the ability to create and modify log processing pipelines. This includes setting matching filters for what logs should enter the processing pipeline, setting the name of the pipeline, and limiting which roles have write access on the processors within that pipeline (logs_write_processors). This permission can be granted or revoked from a role via [the Role API][2].

* **logs_write_processors**: Grants a role the ability to create or modify the processors within a processing pipeline. This permission can be granted to a role in [the Processing Pipelines page of the Datadog app][1] by editing a processing pipeline and adding a role to the "Grant editing Processors of this index to" field (screenshot below).

{{< img src="account_management/rbac/logs_write_processors.png" alt="Grant write access for processors to specific roles" responsive="true" style="width:75%;" >}}

* **logs_write_archives**: Grants the ability to create or modify log archives. This permission can be granted or revoked from a role via [the Role API][2].

## Getting Started with RBAC

By default, existing users will already be associated with one of the three out-of-the-box Datadog Admin, Standard, or Read Only Roles, so all users will already have permissions to read on all logs, and Admin or Standard users will already have write permissions on log-related account assets.

In order to start limiting these permissions for existing users, you should create custom roles and assign existing users to those roles. Then you can take any of the following actions to limit their permissions to those of the custom roles:

* Remove users from the Datadog Standard or Read Only Roles via [the Role API][2].

* Remove permissions from the Datadog Standard or Read Only Roles via [the Role API][2].

* Delete the Datadog Standard or Read Only Roles via [the Role API][2].

[1]: https://app.datadoghq.com/logs/pipelines
[2]: /account_management/rbac/role_api

