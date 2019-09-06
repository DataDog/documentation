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

## Roles

Within Log Management, you can specify which users can read which pieces of log data, and which users can manage log-related account assets, like pipelines, indexes, archives, etc.

The [out of the box roles][1] affect log management in the following way:

| Role                   | Default Access                                                                                                                          |
|------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| Datadog Admin          | Can query on all log data and create or modify all log-related assets in a Datadog account.                                             |
| Datadog Standard Role  | Can query on all log data and create or modify all log-related assets in a Datadog account. Can be modified to limit their permissions. |
| Datadog Read Only Role | Can query on all log data in a Datadog account.  Can be modified to limit their permissions.                                            |

## Log Management Permissions

The following permissions can be granted to manage read access on subsets of log data:

* **logs_read_index_data**: Grants a role read access on some number of log indexes. This permission can be granted to a role in [the Processing Pipelines page of the Datadog app][2] by editing an index and adding a role to the "Grant access of this index's content to" field (screenshot below).

{{< img src="account_management/rbac/logs_read_index_data.png" alt="Grant read access for indexes to specific roles" responsive="true" style="width:75%;" >}}

* **logs_live_tail**: Grants a role the ability to use the live tail feature. This permission can be granted or revoked from a role via [the Roles API][3].

* **logs_generate_metrics**: Grants a role the ability to use the Generate Metrics feature. This permission can be granted or revoked from a role via [the Roles API][3].

The following permissions can be granted to manage write access on various log-related account assets:

* **logs_modify_indexes**: Grants a role the ability to modify log indexes. This includes setting inclusion filters for which logs should be routed into an index, limiting which roles have read access on that index (logs_read_index_data), and which roles can modify exclusion filters for that index (logs_write_exclusion_filters). This permission can be granted or revoked from a role via [the Roles API][3]. **Note:** This permission also grants read access on all log indexes and write permissions on all index exclusion filters, since any role that can modify indexes also can grant itself these additional permissions. 

* **logs_write_exclusion_filters**: Grants a role the ability to create or modify exclusion filters within an index. This permission can be granted to a role in [the Processing Pipelines page of the Datadog app][2] by editing an index and adding a role to the "Grant editing Exclusion Filters of this index to" field (screenshot below).

{{< img src="account_management/rbac/logs_write_exclusion_filters.png" alt="Grant write access on index exclusion filters to specific roles" responsive="true" style="width:75%;" >}}

* **logs_write_pipelines**: Grants a role the ability to create and modify log processing pipelines. This includes setting matching filters for what logs should enter the processing pipeline, setting the name of the pipeline, and limiting which roles have write access on the processors within that pipeline (`logs_write_processors`). This permission can be granted or revoked from a role via [the Roles API][3].

* **logs_write_processors**: Grants a role the ability to create or modify the processors within a processing pipeline. This permission can be granted to a role in [the Processing Pipelines page of the Datadog app][2] by editing a processing pipeline and adding a role to the "Grant editing Processors of this index to" field (screenshot below).

{{< img src="account_management/rbac/logs_write_processors.png" alt="Grant write access for processors to specific roles" responsive="true" style="width:75%;" >}}

* **logs_write_archives**: Grants the ability to create or modify log archives. This permission can be granted or revoked from a role via [the Roles API][3].

## Getting Started with RBAC

By default, existing users are already associated with one of the three out-of-the-box Datadog Admin, Standard, or Read-Only Roles, so all users already have permissions to read all logs, and Admin or Standard users already have write permissions on log-related account assets.

To start limiting these permissions for existing users, create custom roles and assign existing users to those roles. Then you can take any of the following actions to limit their permissions to those of the custom roles:

* Remove users from the Datadog Standard or Read-Only Roles via [the Roles API][3].

* Remove permissions from the Datadog Standard or Read-Only Roles via [the Roles API][3].

* Delete the Datadog Standard or Read-Only Roles via [the Roles API][3].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /account_management/rbac/#out-of-the-box-roles
[2]: https://app.datadoghq.com/logs/pipelines
[3]: /account_management/rbac/role_api
