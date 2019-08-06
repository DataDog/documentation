---
title: Role Based Access Control for Log Management
kind: documentation
private: true
beta: true
further_reading:
- link: "account_management/rbac/role_api"
  tag: "Documentation"
  text: "Manage Roles and Permissions with the Roles API"
---

<div class="alert alert-warning">
Ask your sales representative or customer success manager to enable this feature.
</div>

## Overview

By default, Datadog offers 3 roles to manage user access: the Datadog Admin, Standard, and Read Only Roles. These roles are intentionally permissive so that your Datadog account can help improve organizational transparency, cooperation, and speed. But log data can sometimes contain sensitive information, and the wrong modification of log pipelines or indexes can have significant impact. For this reason, you can use Role Based Access Control to limit which users can read which log indexes, and which users can manage log-related account assets like pipelines, indexes, archives, etc.


## Roles

A user can only read on a log index or modify a log-related asset if they belong to one or more roles that grant permissions to read on the log index or modify the log-related asset. When a user belongs to more than one role, their permissions are cumulative: they are able to act by any of those roles' permissions. Permissions only grant access, they never reduce access. 

For example, if some of your organization's logs are sensitive, you might grant the default roles read access on only the `main` index, and no write access on any processing pipelines. And then you might create custom roles for each team or business unit that grant them read access to only those indexes that contain the sensitive log events, and that grant each team write access only on those processing pipelines that impact their own logs.


## Permissions

Permissions grant the ability to read data or manage account assets in Datadog. By belonging to roles that have permissions, users are able to read data and configure assets in Datadog.

Some permissions can be granted over a limited scope. If a role grants a permission over a limited scope, then that role only grants to its users that permission within its scope. For example, one organization may grant a widely available role to have read permissions on logs (logs_read_index_data), but only within the scope of the "indexes" called "main" and "http" while reserving more sensitive indexes for less widely available roles. If a permission is granted without any "scope" argument, it is a permission not limited by a scope. So if this logs_read_index_data permission were granted to some role without any scope, users of that role would be granted read access on all log indexes. 

Because permissions are cumulative, if a user belongs to two roles, even if one of those roles grants a permission that is limited by a scope, if the other role grants the same permission without a scope limit, the user is granted that permission without being limited by any scope. 


### Examples

For example, if an organization has 4 roles with the following permissions and scopes:

|  Role  |      Permission      |         Scope          |
|--------|----------------------|------------------------|
| Role 1 | logs_read_index_data | {}                     |
| Role 2 | logs_read_index_data | {"indexes": "main"}    |
| Role 3 | logs_read_index_data | {"indexes": "http"}    |
| Role 4 | logs_read_index_data | {"pipelines": "12345"} |
| Role 5 |                      |                        |

Combinations of these roles would result in the following log read access:

|    Roles     |              State                                                                                                                                  |
|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| 1, any other | Has read access on all log indexes                                                                                                                  | 
| 2, 5         | Has read access only on the "main" index                                                                                                            |
| 2, 3, 5      | Has read access only on the "main" and "http" indexes                                                                                               |
| 4, 5         | Has read access on no log indexes (the "logs_read_index_data" for Role 4 is limited to a pipeline, which means it grants no read access on indexes) |


## Log Management Permissions

### Reading Log Data

The following permissions can be used to grant read access on log data:

* **logs_read_index_data**: Grants read access on all log indexes or, if granted on only a specific `scope` of indexes, grants read access on a specific subset of log indexes. Users whose roles grant this permission without any scope limit are able to query all log indexes in [the Log Explorer][1] and are able to view the results of any dashboard log widget. Users whose roles grant this permission only on a specific `scope` of indexes are only able to query the specified log indexes, and are only able to see the results of dashboard log widgets that query the specified log indexes.  This permission can be granted to a role on any specific index in [the Index Configuration][1] page of the Datadog app by adding the role to the "Grant access of this index's content to" field (screenshot below).  This permission can be granted to a role on some or all indexes via [the Roles API][1]. 

{{< img src="account_management/rbac/logs_read_index_data.png" alt="Grant read access for indexes to specific roles" responsive="true" style="width:75%;" >}}

* **logs_live_tail**: Grants the ability to use the live tail feature. This permission can be granted or revoked from a role via [the Roles API][2]. Without this permission, any live tail view in the Datadog application will be empty. 

* **logs_modify_indexes**: Grants read access on all log indexes, and grants the ability to use the live tail feature. Because this permission also grants the ability to modify what log events go into any index and what roles have read access on any log index (see below), this permission also grants explicit read access on all log indexes. For any role that has this permission, it is as if they also had the "logs_read_index_data" and "logs_live_tail" permissions as well.  This permission is granted via [the Roles API][1]. 

### Managing Account Assets

The following permissions can be used to grant write access on log-related account assets:

* **logs_write_exclusion_filters**: Grants the ability to modify exclusion filters on all log indexes or, if granted only on a specific `scope` of indexes, grants the ability to modify exclusion filters on a specific subset of log indexes. Users whose roles grant this permission without any scope limit are able to edit, create, delete, enable, and disable exclusion filters on any index in [the index configuration page][1]. Users whose roles grant this permission only on a specific `scope` of indexes are only able to perform these changes on the specified log indexes.  The actions this permission allows can have important billing implications, since exclusions impact [what log events are charged at full prices][1].  This permission can be granted to a role on any specific index in [the Index Configuration][1] page of the Datadog app by adding the role to the "Grant editing Exclusion Filters of this index to" field (screenshot below).  This permission can be granted to a role on some or all indexes via [the Roles API][1]. 

{{< img src="account_management/rbac/logs_write_exclusion_filters.png" alt="Grant write access on index exclusion filters to specific roles" responsive="true" style="width:75%;" >}}

* **logs_modify_indexes**: Grants a role the ability to modify any log index. Users whose roles grant this permission can modify the inclusion filters for any index, which determine which log events are routed into an index. They can grant read access (logs_read_index_data) for any index to other roles via the [Index Configuration][1] page. And they can determine what roles can modify exclusion filters (logs_write_exclusion_filters) for any index via the [Index Configuration][1] page.  Because this permission also grants the ability to modify what roles can modify exclusion filters on any index, it also explicitly grants the ability to modify exclusion filters on any index. For any role that has this permission, it is as if they also had the "logs_write_exclusion_filters" permission on all indexes as well. This permission also grants read access on logs (see note above).  This permission is granted via [the Roles API][1].

* **logs_write_processors**: Grants the ability to modify processors within all processing pipelines or, if granted only on a specific `scope` of pipelines, grants the ability to modify processors within a specific subset of processing pipelines. Users whose roles grant this permission without any scope limit are able to edit, create, delete, enable, and disable the processors or subpipelines within any processing pipeline. Users whose roles grant this permission only on a specific `scope` of pipelines are only able to perform these changes on the specified processing pipelines. Users whose roles grant this permission but not the "logs_write_pipelines" permission are not able to modify what log events are routed to a processing pipeline.  This permission can be granted to a role on any specific index in the [Pipelines Configuration][1] page of the Datadog application by adding the role to the "Grant editing processors of this pipeline to" field (screenshot below).  This permission can be granted to a role on some or all pipelines via [the Roles API][1].

{{< img src="account_management/rbac/logs_write_processors.png" alt="Grant write access for processors to specific roles" responsive="true" style="width:75%;" >}}

* **logs_write_pipelines**: Grants a role the ability to modify any processing pipeline. Users whose roles grant this permission can modify the inclusion filter for any pipeline, which determines which log events are enriched by a pipeline. They can determine what roles can modify the processors (logs_write_processors) for any pipeline via the [Pipelines Configuration][1] page.  Because this permission grants the ability to determine what roles can modify processors within any pipeline, it also explicitly grants the ability to modify processors and subpipelines within any pipeline. For any role that has this permission, it is as if they also had the "logs_write_processors" permission on all pipelines as well.  This permission is granted via [the Roles API][1].

* **logs_write_archives**: Grants the ability to modify log archives. Users whose roles grant this permission are able to create, edit, or delete log archives. Without this permission, log archive configurations remain read-only. This permission is granted via [the Roles API][1].

* **logs_generate_metrics**: Grants the ability to modify the configurations for how custom metrics are generated from ingested log data. Without this permission, those configurations remain read-only. This permission is granted via [the Roles API][1]. 

* **logs_public_config_api**: Grants the ability to use the [Logs Index][3] and [Logs Pipelines][4] APIs. 


## Default Roles

The three roles that exist by default in Datadog are listed below and have the following Log Management permissions:

| Default Role           | Default Permissions                                                                                                                     |
|------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| Datadog Read Only Role | logs_read_index_data (no scope limit), logs_live_tail                                                                                   |
| Datadog Standard Role  | logs_modify_indexes, logs_live_tail, logs_write_pipelines, logs_generate_metrics                                                        |
| Datadog Admin          | logs_modify_indexes, logs_live_tail, logs_write_pipelines, logs_generate_metrics, logs_write_archives, logs_public_config_api           |


## Getting Started with RBAC

By default, existing users are already associated with one of the three out-of-the-box Datadog Admin, Standard, or Read-Only Roles, so all users already have permissions to read all logs, and Admin or Standard users already have write permissions on log-related account assets.

To start limiting these permissions for existing users, create custom roles and assign existing users to those roles. Then you can take any of the following actions to limit their permissions to those of the custom roles:

* Remove users from the Datadog Standard or Read-Only Roles via [the Roles API][2].

* Remove permissions from the Datadog Standard or Read-Only Roles via [the Roles API][2].

* Delete the Datadog Standard or Read-Only Roles via [the Roles API][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: 
[2]: /account_management/rbac/role_api
[3]: 
[4]: 
