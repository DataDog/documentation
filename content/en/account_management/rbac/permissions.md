---
title: Datadog Role permissions
kind: documentation
aliases:
  - /account_management/faq/managing-global-role-permissions
further_reading:
    - link: '/account_management/rbac/'
      tag: 'Documentation'
      text: 'Learn how to create, update and delete a Role'
    - link: '/api/v2/roles/#list-permissions'
      tag: 'Documentation'
      text: 'Manage your permissions with the Permission API'
---

Once your roles are created, assign or remove permission to this role directly by [updating the role in the Datadog application][1], or through the [Datadog Permission API][2]. Find below a list of available permissions.

## Overview

### General Permissions

General permissions provide the base level of access for your role. [Advanced Permissions](#advanced-permissions) are explicitly defined permissions that augment the base permissions.

| Permission Name | Description                                                                                                                                                                                                                                                                                           |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| admin           | This permission gives to the role the ability to view and edit everything in your Datadog organization that does not have an explicitly defined permission. This includes billing and usage, user, key, roles, permissions and organization management. This permission is inclusive of all Standard Access permissions. |
| standard        | This permission gives to the role the ability to view and edit components in your Datadog organization that do not have explicitly defined permissions. This includes APM, Events, and other non-Account Management functionality.                                                                    |

**Note**: There is no `read-only` permission as it is defined by the lack of both the `admin` and `standard` permissions for a role.

### Advanced Permissions

By default, existing users are already associated with one of the three out-of-the-box Datadog Admin, Standard, or Read-Only Roles, so all users already have permissions to read all data types, and Admin or Standard users already have write permissions on assets.

**Note**: When adding a new custom role to a user, make sure to remove the out-of-the-box Datadog role associated with that user in order to enforce the new role permissions.

In addition of the general permissions, it is possible to define more granular permissions for specific assets or data types. Permissions can be either global or scoped to a subset of elements. Find below the details of these options and the impact they have on each available permission.

## Dashboards

Find below the list of permissions for the dashboard assets:

| Name                    | Description                             | Scopable |
| ----------------------- | --------------------------------------- | -------- |
| `dashboards_read`         | Ability to view dashboards              | false    |
| `dashboards_write`        | Ability to create and change dashboards | false    |
| `dashboards_public_share` | Ability to share dashboards externally  | false    |

## Monitors

Find below the list of permissions for the monitor assets:

| Name              | Description                                  | Scopable |
| ----------------- | -------------------------------------------- | -------- |
| `monitors_read`     | Ability to view monitors                     | false    |
| `monitors_write`    | Ability to change, mute, and delete monitors | false    |
| `monitors_downtime` | Ability to set downtimes for your monitors   | false    |

## Security Monitoring

Find below the list of permissions for the Security Monitoring assets:

| Name                             | Description                                         | Scopable |
| -------------------------------- | --------------------------------------------------- | -------- |
| `security_monitoring_rules_read`   | Ability to view detection rules                     | false    |
| `security_monitoring_rules_write`  | Ability to create, edit, and delete detection rules | false    |
| `security_monitoring_signals_read` | Ability to view security signals                    | false    |

## Log Management

Find below the list of permissions for the log configuration assets and log data:

| Name                           | Description                                | Scopable |
| ------------------------------ | ------------------------------------------ | -------- |
| `logs_read_data`               | Read access to log data                   | true     |
| `logs_modify_indexes`          | Update the definition of log indexes       | false    |
| `logs_write_exclusion_filters` | Update indexes exclusion filters           | true     |
| `logs_write_pipelines`         | Update log pipelines                       | false    |
| `logs_write_processors`        | Update the log processors in a pipeline    | true     |
| `logs_write_archives`          | Update the external archives configuration | false    |
| `logs_read_archives`           | See archive configuration details, access content from the archive | true     |
| `logs_write_historical_views`  | Rehydrate data from Archives               | false    |
| `logs_public_config_api`       | Access the Logs Public Config API (r/w)    | false    |
| `logs_generate_metrics`        | Access the Generate Metrics feature        | false    |


Log Management RBAC also includes two legacy permissions, superseded by finer-grained and more extensive `logs_read_data` permission:

| Name                           | Description                                | Scopable |
| ------------------------------ | ------------------------------------------ | -------- |
| `logs_live_tail`               | Access the live tail feature               | false    |
| `logs_read_index_data`         | Read a subset log data (index based)       | true     |


{{< tabs >}}
{{% tab "UI" %}}

Once your roles are created, assign or remove permission to this role directly by [updating the role in the Datadog application][1].

{{< img src="account_management/rbac/logs_permissions.png" alt="Logs Permissions"  style="width:75%;" >}}


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

Once your roles are created, assign or remove permission to this role directly through the [Datadog Permission API][1].


[1]: /api/v2/roles/
{{% /tab %}}
{{< /tabs >}}

More details about these permissions below.

### Log configuration access

#### logs_generate_metrics

Grants a role the ability to use the [Generate Metrics][3] feature.

This permission is global and enables both the creation of new metrics, and the edition or deletion of existing ones.

#### logs_modify_indexes

Grants a role the ability to create and modify [log indexes][4]. This includes:

- Setting [indexes filters][5] for which logs should be routed into an index.
- Setting [log retention][6] for an index.
- Granting another role the [Logs Read Index Data](#logs-read-index-data) and [Logs Write Exclsion Filters](#logs-write-exclusion-filters) permissions, scoped for a specific index.

This permission is global and enables both the creation of new indexes, and the edition of existing ones.

**Note**: This permission also grants [Logs Read Index Data](#logs-read-index-data) and [Logs Write Exlcusion Filters](#logs-write-exclusion-filters) permissions behind the scenes.


#### logs_write_exclusion_filters

Grants a role the ability to create or modify [exclusion filters][7] within an index.

This permission can be assigned either globally or restricted to a subset of indexes.

**Subset of indexes**:

{{< tabs >}}
{{% tab "UI" %}}

1. Remove the global permission on the role.
2. Grant this permission to the role in [the Index page of the Datadog app][2] by editing an index and adding a role to the "Grant editing Exclusion Filters of this index to" field (screenshot below).

{{< img src="account_management/rbac/logs_write_exclusion_filters.png" alt="Logs Write Exclusion Filters"  style="width:75%;" >}}

{{% /tab %}}
{{% tab "API" %}}

This configuration is only supported through the UI.

{{% /tab %}}
{{< /tabs >}}

#### logs_write_pipelines

Grants a role the ability to create and modify [log processing pipelines][8]. This includes:

- Setting the name of the pipeline
- Setting [pipelines filters][9] for what logs should enter the processing pipeline
- Reorder pipelines
- Granting another role the [Logs Write Processors](#logs-write-processors) permission, scoped for that pipeline

**Note**: This permission also grants [Logs Write Processors](#logs-write-processors) (for all processors on all pipelines) permissions behind the scenes.

#### logs_write_processors

Grants a role the ability to create, edit or delete processors and nested pipelines[12].

This permission can be assigned either globally or restricted to a subset of pipelines.

{{< tabs >}}
{{% tab "UI" %}}

Assign the role(s) in the modal of a specific pipeline.

{{< img src="account_management/rbac/logs_write_processors.png" alt="Logs Write Processors"  style="width:75%;" >}}

{{% /tab %}}
{{% tab "API" %}}

Preliminary,

* [Get the Roles ID][1] of the role you want to assign to specific pipelines.
* [Get the Permission ID][2] for the `logs_write_processors` permission API for your region.
* [Get the Pipeline ID(s)][3] of the pipeline(s) you want to assign this role on.
* Grant permission to that role with the following call:

```sh
curl -X POST \
        https://app.datadoghq.com/api/v1/role/<ROLE_UUID>/permission/<PERMISSION_UUID> \
        -H "Content-Type: application/json" \
        -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
        -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
        -d '{
                "scope": {
                    "pipelines": [ "<PIPELINE-X_ID>", "<PIPELINE-Y_ID>"]
                }
            }'
```

[1]: /api/v2/roles/#list-roles
[2]: /api/v2/roles/#list-permissions
[3]: /api/v1/logs-pipelines/#get-all-pipelines
{{% /tab %}}
{{< /tabs >}}

#### logs_write_archives

Grants the ability to create, edit or delete [Log Archives][10]. This includes:

- Setting [archives filters][9] for what logs should be routed to the archive
- Setting the name of the archive
- Reordering archives
- Restricting the [Logs Read Archives](#logs-read-archives) permission to a subset of roles.

This permission is global and enables the creation of new archives, and the edition and deletion of existing ones.

#### logs_read_archives

Grants the ability to access the details of the archive configuration. In conjunction with [Logs Write Historical Views](#logs-write-historical-view), this permission also grants the ability to trigger a [Rehydration][11] from Archives.

This permission can be scoped to a subset of archives. An archive with no restrictions is accessible to anyone who belongs to a role with the `logs_read_archives` permission. An archive with restrictions is only accessible to the users who belong to one of the registered roles, provided theses roles have the `logs_read_archives` permission.

In the following example, assuming all roles but `Guest` have the `logs_read_archive` permission:

* Staging is accessible to all users, except users that **only** belong to the `Guest` role.
* Prod is accessible to all users belonging to `Customer Support`.
* Security-Audit is not accessible to users who belong to `Customer Support`, unless they also belong to `Audit & Security`.

{{< img src="account_management/rbac/logs_archives_list.png" alt="Create a custom Role"  style="width:90%;">}}

{{< tabs >}}
{{% tab "UI" %}}

Proceed to archive creation, or update at any moment while editing the archive.

{{< img src="account_management/rbac/logs_archive_restriction.png" alt="Create a custom Role"  style="width:90%;">}}

{{% /tab %}}
{{% tab "API" %}}

Use the Logs Archive API either to [assign][1] or [revoke][2] a role from a given Archive.


[1]: /api/v2/logs-archives/#grant-role-to-an-archive
[2]: /api/v2/logs-archives/#revoke-role-from-an-archive
{{% /tab %}}
{{< /tabs >}}

#### logs_write_historical_view

Grants the ability to write historical views, meaning to trigger a [Log Rehydration*][11].

This permission is global, but only enables to trigger a rehydration for Archives users have [Logs Read Archive](#logs-read-archives) permission.

#### logs_public_config_api

Grants the ability to create or modify log configuration through the Datadog API:

* Configure [Archives][12] through the API
* Configure [Indexes][13] through the API
* Configure [Pipelines][14] through the API
* Configure [Restriction Queries][15] through the API

The Log Public Configuration API permission only grants the permission to operate actions through API. For instance, a user without [Log Write Exclusion Filter Permission](#logs-write-exclusion-filters) cannot update sampling rate through API, even if granted The Log Public Configuration API permission.

### Log Data Access

Grant the following permissions to manage read access on subsets of log data:

* [Logs Read Data](#logs-read-data) (Recommended) offers finer grained access control by restricting a role's access to logs matching a log restriction queries.
* [Logs Read Index Data](#logs-read-index-data) is the legacy approach to restrict data access to indexed log data on a per-index basis (it is still required to have this permission enabled to access indexed data).

#### logs_read_data

Read access to log data. If granted, other restrictions then apply such as `logs_read_index_data` or with [restriction query][15].

Roles are additive: if a user belongs to multiple roles, the data they have access to is the union of all the permissions from each of the roles.

**Example**:

* If a user belongs to a role with log read data and also belongs to a role without log read data, then they have the permission to read data.
* If a user is restricted to `service:sandbox` through one role, and is restricted to `env:prod` through another role, then the user can access all `env:prod` and `service:sandbox` logs.

{{< img src="account_management/rbac/logs_rq_roles_combination.png" alt="Read Data Access"  style="width:70%;">}}

**Restrict read access to a subset of logs**

{{< tabs >}}
{{% tab "UI" %}}

This configuration is only supported through the API.

{{% /tab %}}
{{% tab "API" %}}

Revoke or grant this permission from a role via [the Roles API][1].
Use [Restriction Queries][2] to scope the permission to a subset of Log Data.

[1]: /api/#roles
[2]: /api/?lang=bash#roles-restriction-queries-for-logs
{{% /tab %}}
{{< /tabs >}}

### Legacy Permissions

These permissions are globally enabled by default for all users.

[Logs Read Data](#logs-read-data) permission comes on top of these legacy permissions. For instance, say a user is restricted to the query `service:api`.

* If this user has scoped [Read Index Data](#logs-read-index-data) permission on `audit` and `errors` indexes, this user only sees `service:api` logs within these indexes.
* If this user has [livetail](#logs-livetail) permission, this users sees only sees `service:api` logs in the livetail.


#### logs_read_index_data

Grants a role read access on some number of log indexes. Can be set either globally or limited to a subset of log indexes.

To scope this permission to a subset of indexes, first remove the `logs_read_index_data` and `logs_modify_indexes` permissions on the role. Then

{{< tabs >}}
{{% tab "UI" %}}

Grant this role access to the index in [Configuration page][1].

{{< img src="account_management/rbac/logs_read_index_data.png" alt="Grant read access for indexes to specific roles"  style="width:75%;" >}}


[1]: https://app.datadoghq.com/logs/indexes
{{% /tab %}}
{{% tab "API" %}}

* [Get the Roles ID][1] of the role you want to assign to specific pipelines.
* [Get the Permission ID][2] for the `logs_write_processors` permission API for your region.
* [Get the Index ID(s)][3] of the pipeline(s) you want to assign this role on.
* Grant permission to that role with the following call:

```bash
curl -X POST \
        https://app.datadoghq.com/api/v1/role/<ROLE_UUID>/permission/<PERMISSION_UUID> \
        -H "Content-Type: application/json" \
        -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
        -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
        -d '{
                "scope": {
                    "indexes": ["<INDEX-1_ID>",["<INDEX-2_ID>"]
                }
            }'
```


[1]: /api/v2/roles/#list-roles
[2]: /api/v2/roles/#list-permissions
[3]: /api/v1/logs-indexes/#get-all-indexes
{{% /tab %}}
{{< /tabs >}}

#### logs_live_tail

Grants a role the ability to use the [Live Tail][16] feature.

This permission is global, and grants access to the livetail irregardless of [Log Read Index Data](#logs-read-index-data) permission.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

<br>
\*Log Rehydration is a trademark of Datadog, Inc.

[1]: /account_management/users/#edit-a-user-s-roles
[2]: /api/v2/roles/#list-permissions
[3]: /logs/logs_to_metrics/
[4]: /logs/indexes
[5]: /logs/indexes#indexes-filters
[6]: /logs/indexes#update-log-retention
[7]: /logs/indexes#exclusion-filters
[8]: /logs/processing/pipelines/
[9]: /logs/processing/pipelines/#pipeline-filters
[10]: /logs/archives
[11]: /logs/archives/rehydrating
[12]: /api/v2/logs-archives/
[13]: /api/v1/logs-indexes/
[14]: /api/v1/logs-pipelines/
[15]: /api/v2/logs-restriction-queries/
[16]: /logs/explorer/live_tail/
