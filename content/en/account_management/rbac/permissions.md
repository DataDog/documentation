---
title: Datadog Role Permissions
kind: documentation
aliases:
  - /account_management/faq/managing-global-role-permissions
disable_toc: true
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

### General permissions

General permissions provide the base level of access for your role. [Advanced Permissions](#advanced-permissions) are explicitly defined permissions that augment the base permissions.

{{< permissions group="General" >}}

**Note**: There is no `read-only` permission as it is defined by the lack of both the `admin` and `standard` permissions for a role.

### Advanced permissions

By default, existing users are already associated with one of the three out-of-the-box Datadog Admin, Standard, or Read-Only Roles, so all users already have permissions to read all data types, and Admin or Standard users already have write permissions on assets.

**Note**: When adding a new custom role to a user, make sure to remove the out-of-the-box Datadog role associated with that user in order to enforce the new role permissions.

In addition of the general permissions, it is possible to define more granular permissions for specific assets or data types. Permissions can be either global or scoped to a subset of elements. Find below the details of these options and the impact they have on each available permission.

{{% permissions %}}
{{< permissions group="Logs" >}}

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

#### `logs_generate_metrics`

Grants a role the ability to use the [Generate Metrics][3] feature.

This permission is global and enables both the creation of new metrics, and the edition or deletion of existing ones.

#### `logs_write_facets`

Grants a role the ability to use the [Create, Edit, and Delete facets][4].

This permission is global and enables both the creation of new facets, and the edition or deletion of existing ones.

#### `logs_modify_indexes`

Grants a role the ability to create and modify [log indexes][5]. This includes:

- Setting [indexes filters][6] for which logs should be routed into an index.
- Setting [log retention][7] for an index.
- Granting another role the [Logs Read Index Data](#logs-read-index-data) and [Logs Write Exclsion Filters](#logs-write-exclusion-filters) permissions, scoped for a specific index.

This permission is global and enables both the creation of new indexes, and the edition of existing ones.

**Note**: This permission also grants [Logs Read Index Data](#logs-read-index-data) and [Logs Write Exlcusion Filters](#logs-write-exclusion-filters) permissions behind the scenes.


#### `logs_write_exclusion_filters`

Grants a role the ability to create or modify [exclusion filters][8] within an index.

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


#### `logs_write_pipelines`

Grants a role the ability to create and modify [log processing pipelines][9]. This includes:

- Setting the name of the pipeline
- Setting [pipelines filters][10] for what logs should enter the processing pipeline
- Reorder pipelines
- Granting another role the [Logs Write Processors](#logs-write-processors) permission, scoped for that pipeline
- Managing [standard attributes][11] or [aliasing facets][12]

**Note**: This permission also grants [Logs Write Processors](#logs-write-processors) (for all processors on all pipelines) permissions behind the scenes.


#### `logs_write_processors`

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

#### `logs_write_archives`

Grants the ability to create, edit or delete [Log Archives][13]. This includes:

- Setting [archives filters][10] for what logs should be routed to the archive
- Setting the name of the archive
- Reordering archives
- Restricting the [Logs Read Archives](#logs-read-archives) permission to a subset of roles.

This permission is global and enables the creation of new archives, and the edition and deletion of existing ones.

#### `logs_read_archives`

Grants the ability to access the details of the archive configuration. In conjunction with [Logs Write Historical Views](#logs-write-historical-view), this permission also grants the ability to trigger a [Rehydration][14] from Archives.

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

#### `logs_write_historical_views`

Grants the ability to write historical views, meaning to trigger a [Log Rehydration*][14].

This permission is global. It enables users to trigger a rehydration for archives on which they have [Logs Read Archive](#logs_read_archives) permission.

{{< img src="account_management/rbac/logs_hv_roles_combination.png" alt="Write Historical View"  style="width:70%;">}}

In the example above:

* `ADMIN` Role members **can** rehydrate from the `Audit Archive`, as they have the Write Historical View (Rehydrate) permission, as well as the Read Archive permission on that archive.
* `AUDIT` Role members **cannot** rehydrate from the `Audit Archive`, as they do not have the Write Historical View (Rehydrate) permission.
* `PROD` Role members **cannot** rehydrate from the `Audit Archive`, as they do not have the Read Archive permission.


When assigning `team:audit` tags on all logs rehydrated from the `Audit Archive`, make sure that `Audit` role members who are restricted to read `team:audit`logs  can only access rehydrated content. For more details on how to add tags and rehydration, see the [Log Archive Setup section][13].

For `service:ci-cd` logs that are rehydrated from the `Prod Archive`, note the following:

* If you **do not** use the [Log Read Index Data](#logs-read-index-data) legacy permission, these logs are accessible for `CI-CD` role members.
* If you **do** use the [Log Read Index Data](#logs-read-index-data) legacy permission, these logs are not accessible for `CI-CD` role members, as the resulting historical view is restricted to `PROD` and `ADMIN` role members.


#### `logs_public_config_api`

Grants the ability to create or modify log configuration through the Datadog API:

* Configure [Archives][15] through the API
* Configure [Indexes][16] through the API
* Configure [Pipelines][17] through the API
* Configure [Restriction Queries][18] through the API

The Log Public Configuration API permission only grants the permission to operate actions through API. For instance, a user without [Log Write Exclusion Filter Permission](#logs-write-exclusion-filters) cannot update sampling rate through API, even if granted The Log Public Configuration API permission.

### Log data access

Grant the following permissions to manage read access on subsets of log data:

* [Logs Read Data](#logs-read-data) (Recommended) offers finer grained access control by restricting a role's access to logs matching a log restriction queries.
* [Logs Read Index Data](#logs-read-index-data) is the legacy approach to restrict data access to indexed log data on a per-index basis (it is still required to have this permission enabled to access indexed data).

#### `logs_read_data`

Read access to log data. If granted, other restrictions then apply such as `logs_read_index_data` or with [restriction query][18].

Roles are additive: if a user belongs to multiple roles, the data they have access to is the union of all the permissions from each of the roles.

**Example**:

* If a user belongs to a role with log read data and also belongs to a role without log read data, then they have the permission to read data.
* If a user is restricted to `service:sandbox` through one role, and is restricted to `env:prod` through another role, then the user can access all `env:prod` and `service:sandbox` logs.

{{< img src="account_management/rbac/logs_rq_roles_combination.png" alt="Read Data Access"  style="width:70%;">}}


{{< tabs >}}
{{% tab "UI" %}}

To restrict users so they see no more than logs matching a restriction query, use the [Data Access page][1] in the Datadog App to:

1. [Create](#create-a-restriction-query) a restriction query.
2. [Assign](#assign-a-role-to-a-restriction-query) one or multiple roles to that restriction query.
3. [Check](#check-restriction-queries) what roles and users are assigned to which restriction queries.


This view lists:

* **`Restricted Access` section**: all the restriction queries, and what role(s) are attached to them,
* **`Unrestricted Access` section**: all roles that have `log_read_data` permission with no further restrictions,
* **`No Access` section**: all roles that does not have the `log_read_data` permission.


##### Create a restriction query

Create a new restriction query defining its query filter. The new query appears in the list of restrictions with no role attached to it.

{{< img src="account_management/rbac/logs_rq-create.gif" alt="Create a Restriction Query"  style="width:70%;">}}


##### Assign a role to a restriction query

Pick the role wherever it stands, and assign it to the intended restriction query.

*Note*: Keep in mind that a role can be assigned no more than one restriction query. Meaning, when you assign a role to a restriction query, it loses connection to the restriction query it was already attached to.

{{< img src="account_management/rbac/logs_rq-assign_roles.gif" alt="Assign a role to Restriction Query"  style="width:70%;">}}

Likewise, use the same "Move" interaction to grant `Unrestricted Access` to a Role, or conversely to turn it into a `No Access` role.

##### Check restriction queries

This page won't display more than 50 restriction queries at once, and more than 50 roles per section. In case you have hundreds if not thousands of roles and restriction queries, use the filters to scope this view down:

* with the restriction query filter:

{{< img src="account_management/rbac/logs_rq-filter.png" alt="Filter Restriction Queries"  style="width:70%;">}}

* with the role filter:

{{< img src="account_management/rbac/logs_rq-view_as_role.png" alt="View as Roles"  style="width:70%;">}}

* with the user filter, which is a convenient way to see what a specific user belonging to multiple roles actually has access to:

{{< img src="account_management/rbac/logs_rq-view_as_user.png" alt="View as Roles"  style="width:70%;">}}

[1]: https://app.datadoghq.com/logs/pipelines/data-access
{{% /tab %}}
{{% tab "API" %}}

Revoke or grant this permission from a role via [the Roles API][1].
Use [Restriction Queries][2] to scope the permission to a subset of Log Data.

[1]: /api/#roles
[2]: /api/?lang=bash#roles-restriction-queries-for-logs
{{% /tab %}}
{{< /tabs >}}

### Legacy permissions

These permissions are globally enabled by default for all users.

[Logs Read Data](#logs-read-data) permission comes on top of these legacy permissions. For instance, say a user is restricted to the query `service:api`.

* If this user has scoped [Read Index Data](#logs-read-index-data) permission on `audit` and `errors` indexes, this user only sees `service:api` logs within these indexes.
* If this user has [livetail](#logs-livetail) permission, this users sees only sees `service:api` logs in the livetail.


#### `logs_read_index_data`

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

#### `logs_live_tail`

Grants a role the ability to use the [Live Tail][19] feature.

This permission is global, and grants access to the livetail irregardless of [Log Read Index Data](#logs-read-index-data) permission.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

<br>
\*Log Rehydration is a trademark of Datadog, Inc.

[1]: /account_management/users/#edit-a-user-s-roles
[2]: /api/v2/roles/#list-permissions
[3]: /logs/logs_to_metrics/
[4]: /logs/explorer/facets/#overview
[5]: /logs/indexes
[6]: /logs/indexes#indexes-filters
[7]: /logs/indexes#update-log-retention
[8]: /logs/indexes#exclusion-filters
[9]: /logs/processing/pipelines/
[10]: /logs/processing/pipelines/#pipeline-filters
[11]: /logs/processing/attributes_naming_convention/#standard-attributes-in-log-configuration
[12]: /logs/explorer/facets/#alias-facets
[13]: /logs/archives
[14]: /logs/archives/rehydrating
[15]: /api/v2/logs-archives/
[16]: /api/v1/logs-indexes/
[17]: /api/v1/logs-pipelines/
[18]: /api/v2/logs-restriction-queries/
[19]: /logs/explorer/live_tail/
