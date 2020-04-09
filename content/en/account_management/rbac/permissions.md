---
title: Datadog Role permissions
kind: documentation
further_reading:
- link: "account_management/rbac/log_management/"
  tag: "Documentation"
  text: "RBAC for Log Management"
- link: "/api/#roles"
  tag: "Documentation"
  text: "Manage Roles and Permissions with the Roles API"
---

General permissions provide the base level of access for your role. [Advanced Permissions](#advanced-permissions) are explicitly defined permissions that augment the base permissions.

## General Permissions

| Permission Name    | Description                                                                                                                                                                                                                                                                                           |
|--------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Priviledged Access | This permission gives to the role the ability to view and edit everything in your Datadog organization that does not have an explicitly defined permission. This includes billing and usage, user, key, and organization management. This permission is inclusive of all Standard Access permissions. |
| Standard Access    | This permission gives to the role the ability to view and edit components in your Datadog organization that do not have explicitly defined permissions. This includes APM, Events, and other non-Account Management functionality.                                                                    |
| Read-Only Access   | This permission gives to the role read access to parts of the application not explicitly defined with permissions or restricted through the combination of the user's roles and the permissions granted them.                                                                                         |

## Advanced Permissions

All permissions have up to three options that can be selected: Read, Write, and Other. Note that not all options are available every time for a given permission. Find below the detailed of those options and the impact of each available permission.

### Logs

| Permission Name        | Read                                | Write                                      | Other                                   |
|------------------------|-------------------------------------|--------------------------------------------|-----------------------------------------|
| Log Indexes            | Read a subset of all log indexes    | Update the definition of log indexes       | *undefined*                             |
| Live Tail              | Access the live tail feature        | *undefined*                                | *undefined*                             |
| Exclusion Filters      | *undefined*                         | Update a subset of the exclusion filters   | *undefined*                             |
| Log Pipelines          | *undefined*                         | Update a subset of the log pipelines       | *undefined*                             |
| Log Processors         | *undefined*                         | Update the log processors in an index      | *undefined*                             |
| Log External Archives  | *undefined*                         | Update the external archives configuration | *undefined*                             |
| Logs Public Config API | *undefined*                         | *undefined*                                | Access the Logs Public Config API (r/w) |
| Log Generate Metrics   | Access the Generate Metrics feature | *undefined*                                | *undefined*                             |


### Dashboards

| Permission Name  | Read                         | Write             | Other                     |
|------------------|------------------------------|-------------------|---------------------------|
| Dashboards       | Access dashboards (required) | Update dashboards | *undefined*               |
| Dashboards Share | *undefined*                  | *undefined*       | Share dashboards publicly |

### Monitors

| Permission Name   | Read                       | Write                   | Other       |
|-------------------|----------------------------|-------------------------|-------------|
| Monitors          | Access monitors (required) | Update monitor          | *undefined* |
| Monitors Downtime | *undefined*                | Manage monitor downtime | *undefined* |


\/ TO CHANGE \/

## Log Management Permissions

The following permissions can be granted to manage read access on subsets of log data:

* **logs_read_index_data**: Grants a role read access on some number of log indexes. This permission can be granted to a role in [the Processing Pipelines page of the Datadog app][1] by editing an index and adding a role to the "Grant access of this index's content to" field (screenshot below).

{{< img src="account_management/rbac/logs_read_index_data.png" alt="Grant read access for indexes to specific roles"  style="width:75%;" >}}

* **logs_live_tail**: Grants a role the ability to use the live tail feature. This permission can be granted or revoked from a role via [the Roles API][2].

* **logs_generate_metrics**: Grants a role the ability to use the Generate Metrics feature. This permission can be granted or revoked from a role via [the Roles API][2].

The following permissions can be granted to manage write access on various log-related account assets:

* **logs_modify_indexes**: Grants a role the ability to create and modify log indexes. This includes:

  - Setting inclusion queries for which logs should be routed into an index.
  - Setting log retention for an index.
  - Limiting which roles have read access on an index (`logs_read_index_data`).
  - Which roles can modify exclusion filters for an index (`logs_write_exclusion_filters`).

  This permission can be granted or revoked from a role via [the Roles API][2]. **Note:** This permission also grants read access on all log indexes and write permissions on all index exclusion filters, since any role that can modify indexes also can grant itself these additional permissions.

* **logs_write_exclusion_filters**: Grants a role the ability to create or modify exclusion filters within an index. This permission can be granted to a role in [the Processing Pipelines page of the Datadog app][1] by editing an index and adding a role to the "Grant editing Exclusion Filters of this index to" field (screenshot below).

{{< img src="account_management/rbac/logs_write_exclusion_filters.png" alt="Grant write access on index exclusion filters to specific roles"  style="width:75%;" >}}

* **logs_write_pipelines**: Grants a role the ability to create and modify log processing pipelines. This includes setting matching filters for what logs should enter the processing pipeline, setting the name of the pipeline, and limiting which roles have write access on the processors within that pipeline (`logs_write_processors`). This permission can be granted or revoked from a role via [the Roles API][3].

* **logs_write_processors**: Grants a role the ability to create or modify the processors within a processing pipeline. This permission can be granted to a role in [the Processing Pipelines page of the Datadog app][1] by editing a processing pipeline and adding a role to the "Grant editing Processors of this index to" field (screenshot below).

{{< img src="account_management/rbac/logs_write_processors.png" alt="Grant write access for processors to specific roles"  style="width:75%;" >}}

* **logs_write_archives**: Grants the ability to create or modify log archives. This permission can be granted or revoked from a role via [the Roles API][3].

## Getting Started with RBAC

By default, existing users are already associated with one of the three out-of-the-box Datadog Admin, Standard, or Read-Only Roles, so all users already have permissions to read all logs, and Admin or Standard users already have write permissions on log-related account assets.

To start limiting these permissions for existing users, create custom roles and assign existing users to those roles. Then you can take any of the following actions to limit their permissions to those of the custom roles:

* Remove users from the Datadog Standard or Read-Only Roles via [the Roles API][2].

* Remove permissions from the Datadog Standard or Read-Only Roles via [the Roles API][2].

* Delete the Datadog Standard or Read-Only Roles via [the Roles API][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/pipelines
[2]: /api/#roles
[3]: /events
