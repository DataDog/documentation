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
| dashboards_read         | Ability to view dashboards              | false    |
| dashboards_write        | Ability to create and change dashboards | false    |
| dashboards_public_share | Ability to share dashboards externally  | false    |

## Monitors

Find below the list of permissions for the monitor assets:

| Name              | Description                                  | Scopable |
| ----------------- | -------------------------------------------- | -------- |
| monitors_read     | Ability to view monitors                     | false    |
| monitors_write    | Ability to change, mute, and delete monitors | false    |
| monitors_downtime | Ability to set downtimes for your monitors   | false    |

## Log Management

Find below the list of permissions for the log configuration assets and log data:

| Name                         | Description                                | Scopable |
| ---------------------------- | ------------------------------------------ | -------- |
| logs_read_data               | Read access to log data. If granted, other restrictions then apply (like `logs_read_index_data` or with restriction queries).       | true     |
| logs_read_index_data         | Read a subset log data (index based)       | true     |
| logs_modify_indexes          | Update the definition of log indexes       | false    |
| logs_live_tail               | Access the live tail feature               | false    |
| logs_write_exclusion_filters | Update a subset of the exclusion filters   | true     |
| logs_write_pipelines         | Update a subset of the log pipelines       | true     |
| logs_write_processors        | Update the log processors in an index      | true     |
| logs_write_archives          | Update the external archives configuration | false    |
| logs_read_archives          | Rehydrate logs from that archive; see archive configuration details | true    |
| logs_public_config_api       | Access the Logs Public Config API (r/w)    | false    |
| logs_generate_metrics        | Access the Generate Metrics feature        | false    |

More details about these permissions below.

### Log Configuration Access

#### logs_generate_metrics

Grants a role the ability to use the Generate Metrics feature. This permission is global and applies to the configuration of all the metrics generated from logs.

{{< tabs >}}
{{% tab "Datadog application" %}}

Go to your [Datadog Roles page][1] and select the checkbox `other` as below for the wanted role:
{{< img src="account_management/rbac/logs_generate_metrics_access.png" alt="Create a custom Role"  style="width:90%;">}}


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

This permission can be granted or revoked from a role via [the Roles API][1].


[1]: /api/v2/roles/
{{% /tab %}}
{{< /tabs >}}

#### logs_modify_indexes

Grants a role the ability to create and modify log indexes. This includes:

- Setting inclusion queries for which logs should be routed into an index.
- Setting log retention for an index.
- Limiting which roles have read access on an index (`logs_read_index_data`).
- Which roles can modify exclusion filters for an index (`logs_write_exclusion_filters`).

**Note**: This permission also grants read access on all log indexes and write permissions on all index exclusion filters.

{{< tabs >}}
{{% tab "Datadog application" %}}

Go to your [Datadog Roles page][1] and select the checkbox `other` as below for the wanted role:
{{< img src="account_management/rbac/logs_modify_indexes_access.png" alt="Create a custom Role"  style="width:90%;">}}


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

This permission can be granted or revoked from a role via [the Roles API][1].


[1]: /api/v2/roles/
{{% /tab %}}
{{< /tabs >}}

#### logs_write_exclusion_filters

Grants a role the ability to create or modify exclusion filters within an index. This can be assigned either globally or restricted to a subset of indexes.

{{< tabs >}}
{{% tab "Datadog application" %}}

**Global access**:

Go to your [Datadog Roles Page][1] and select the checkbox `write` as below for the wanted role:

{{< img src="account_management/rbac/logs_write_exclusion_filters_access.png" alt="Create a custom Role"  style="width:90%;">}}

**Subset of indexes**:

1. Remove the global permission on the role.
2. Grant this permission to the role in [the Processing Pipelines page of the Datadog app][2] by editing an index and adding a role to the "Grant editing Exclusion Filters of this index to" field (screenshot below).

{{< img src="account_management/rbac/logs_write_exclusion_filters.png" alt="Grant write access on index exclusion filters to specific roles"  style="width:75%;" >}}


[1]: https://app.datadoghq.com/access/roles
[2]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

This permission can be granted or revoked from a role via [the Roles API][1].


[1]: /api/v2/roles/
{{% /tab %}}
{{< /tabs >}}

#### logs_write_pipelines

Grants a role the ability to create and modify log processing pipelines. This includes setting matching filters for what logs should enter the processing pipeline, setting the name of the pipeline, and limiting which roles have write access on the processors within that pipeline (`logs_write_processors`).

{{< tabs >}}
{{% tab "Datadog application" %}}

Go to your [Datadog Roles page][1] and select the checkbox `other` as below for the wanted role:
{{< img src="account_management/rbac/logs_write_pipeline_access.png" alt="Create a custom Role"  style="width:90%;">}}


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

This permission can be granted or revoked from a role via [the Roles API][1].

To grant write access to only two processing pipelines whose IDs are `abcd-1234` and `bcde-2345` respectively:

1. Remove the global `logs_write_pipelines` permission on the role if already assigned.
2. Get the UUID of the role you want to modify.
3. Use the [Get Permission][2] API to find the `logs_write_pipelines` permission UUID for your region.
4. Grant permission to that role with the following call:

```sh
curl -X POST \
        https://app.datadoghq.com/api/v1/role/<ROLE_UUID>/permission/<PERMISSION_UUID> \
        -H "Content-Type: application/json" \
        -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
        -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
        -d '{
                "scope": {
                    "pipelines": [
                        "abcd-1234",
                        "bcde-2345"
                    ]
                }
            }'
```


[1]: /api/v2/roles/
[2]: /api/v2/roles/#list-permissions
{{% /tab %}}
{{< /tabs >}}

#### logs_write_processors

Grants a role the ability to create or modify the processors within a processing pipeline.

{{< tabs >}}
{{% tab "Datadog application" %}}

**Global access**:

Go to your [Datadog Roles page][1] and select the checkbox `write` as below for the wanted role:

{{< img src="account_management/rbac/logs_write_processors_access.png" alt="Create a custom Role"  style="width:90%;">}}

**Subset of Pipelines**:

1. Remove the `logs_write_processors` and `logs_write_pipelines` permissions on the role.
2. This permission can be granted to a role in [the Processing Pipelines page of the Datadog app][2] by editing a processing pipeline and adding a role to the "Grant editing Processors of this index to" field (screenshot below).

{{< img src="account_management/rbac/logs_write_processors.png" alt="Grant write access for processors to specific roles"  style="width:75%;" >}}


[1]: https://app.datadoghq.com/access/roles
[2]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

This permission can be granted or revoked from a role via [the Roles API][1].


[1]: /api/v2/roles/
{{% /tab %}}
{{< /tabs >}}

#### logs_write_archives

Grants the ability to create or modify log archives.

{{< tabs >}}
{{% tab "Datadog application" %}}

Go to your [Datadog Roles page][1] and select the checkbox `other` as below for the wanted role:
{{< img src="account_management/rbac/logs_write_archives_access.png" alt="Create a custom Role"  style="width:90%;">}}


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

This permission can be granted or revoked from a role via [the Roles API][1].


[1]: /api/v2/roles/
{{% /tab %}}
{{< /tabs >}}


#### logs_read_archives

Grants the ability to rehydrate from archives, and access the details of the archive configuration. This permission can be scoped to a subset of archives. 

{{< tabs >}}
{{% tab "Datadog application" %}}

Go to your [Datadog Roles page][1] and select the checkbox `read`, as shown below, for the wanted role:
{{< img src="account_management/rbac/logs_read_archive_access.png" alt="Create a custom Role"  style="width:90%;">}}

Then assign that role to the archive. Proceed to archive creation, or update at any moment while editing the archive. 
{{< img src="account_management/rbac/logs_archive_restriction.png" alt="Create a custom Role"  style="width:90%;">}}

An archive with no restrictions is accessible to anyone who belongs to a role with the `logs_read_archives` permission. An archive with restrictions is only accessible to the users who belong to one of the registered roles, provided theses roles have the `logs_read_archives` permission.

In the following example, assuming all roles but `Guest` have the `logs_read_archive` permission:

* Staging is accessible to all users, except users that **only** belong to the `Guest` role.
* Prod is accessible to all users belonging to `Customer Support`.
* Security-Audit is not accessible to users who belong to `Customer Support`, unless they also belong to `Audit & Security`.

{{< img src="account_management/rbac/logs_archives_list.png" alt="Create a custom Role"  style="width:90%;">}}


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

The `logs_read_archive` permission can be granted or revoked from a role via [the Roles API][1].

An archive can be scoped to a subset of roles using the [Archive API][2].


[1]: /api/v2/roles/
[2]: /api/v2/logs-archives/
{{% /tab %}}
{{< /tabs >}}

#### logs_public_config_api

Grants the ability to create or modify log configuration through the Datadog API.

{{< tabs >}}
{{% tab "Datadog application" %}}

Go to your [Datadog Roles page][1] and select the checkbox `other` as below for the wanted role:
{{< img src="account_management/rbac/logs_public_config_api_access.png" alt="Create a custom Role"  style="width:90%;">}}


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

This permission can be granted or revoked from a role via [the Roles API][1].


[1]: /api/v2/roles/
{{% /tab %}}
{{< /tabs >}}

### Log Data Access

Grant the following permissions to manage read access on subsets of log data:

* `logs_read_data`(Recommended) offers finer grained access control by restricting a role's access to logs matching a log restriction queries. 
* `logs_read_index_data` is the alternative approach to restrict data access to indexed log data on a per-index basis (it is still required to have this permission to access indexed data).

These permissions can also be used together. A role can restrict the user to a subset of indexes and additionally apply a restriction query to limit access within these indexes.

**Example**: User A has access to index `audit` and index `errors` and is restricted to the query `service:api`.
When looking in Log Explorer, this user only sees logs from the `service:api` into the `audit` and `errors` indexes.

In addition, access to the Live Tail can be restricted with the `logs_live_tail` permission regardless of the data access restriction of the user.

#### logs_read_data

Read access to log data. If granted, other restrictions then apply such as `logs_read_index_data` or with [restriction query][3].

"Role combinations are permissive. Is a user belongs to multiple roles, the most permissive role is applied."

**Example**:

* If a user belongs to a role with log read data and also belongs to a role without log read data, then they have the permission to read data.
* If a user is restricted to service:sandbox through one role, and has is restricted to env:staging through another role, then the user can access all env:staging and service:sandbox logs.


{{< tabs >}}
{{% tab "Datadog application" %}}

**Grant global read access to log data**:

Go to your [Datadog Roles page][1] and select the checkbox `read` as below for the wanted role:

{{< img src="account_management/rbac/logs_read_data_access.png" alt="Read Data Access"  style="width:70%;">}}

**Restrict read access to a subset of logs**:

This configuration is only supported through the API.
[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

Revoke or grant this permission from a role via [the Roles API][1]. 
Use [Restriction Queries][2] to scope the permission to a subset of Log Data. 



[1]: /api/#roles
[2]: /api/?lang=bash#roles-restriction-queries-for-logs
{{% /tab %}}
{{< /tabs >}}


#### logs_read_index_data

Grants a role read access on some number of log indexes. Can be set either globally or limited to a subset of log indexes.
When using `logs_read_data` and restriction queries, the `logs_read_index_data` permission **must** be set globally to access indexed logs.

{{< tabs >}}
{{% tab "Datadog application" %}}

**Global access**:

Go to your [Datadog Roles page][1] and select the checkbox `read` as below for the wanted role:

{{< img src="account_management/rbac/logs_read_index_data_access.png" alt="Read Index Data Access"  style="width:90%;">}}

**Subset of Indexes**:

1. Remove the `logs_read_index_data` and `logs_modify_indexes` permissions on the role.
2. This permission can be granted to a role in [the Index Configuration page of the Datadog app][2] by editing an index and adding a role to the "Grant access of this index's content to" field.

{{< img src="account_management/rbac/logs_read_index_data.png" alt="Grant read access for indexes to specific roles"  style="width:75%;" >}}


[1]: https://app.datadoghq.com/access/roles
[2]: https://app.datadoghq.com/logs/pipelines/indexes
{{% /tab %}}
{{% tab "API" %}}

This permission can be granted or revoked from a role via [the Roles API][1].
For example, to grant read access only on two indexes named `main` and `support` to a role, your API call looks like this:

1. Remove the global `logs_read_index_data` permission on the role if already assigned.
2. Get the UUID of the role you want to modify.
3. Use the [Get Permission][2] API to find the `logs_read_index_data` permission UUID for your region.
4. Grant permission to that role with the following call:

```bash
curl -X POST \
        https://app.datadoghq.com/api/v1/role/<ROLE_UUID>/permission/<PERMISSION_UUID> \
        -H "Content-Type: application/json" \
        -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
        -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
        -d '{
                "scope": {
                    "indexes": [
                        "main",
                        "support"
                    ]
                }
            }'
```


[1]: /api/v2/roles/
[2]: /api/v2/roles/#list-permissions
{{% /tab %}}
{{< /tabs >}}


#### logs_live_tail

Grants a role the ability to use the Live Tail feature.

{{< tabs >}}
{{% tab "Datadog application" %}}

Go to your [Datadog Roles page][1] and select the checkbox `read` as below for the wanted role:
{{< img src="account_management/rbac/logs_livetail_access.png" alt="Create a custom Role"  style="width:90%;">}}


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

This permission can be granted or revoked from a role via [the Roles API][1].


[1]: /api/#roles
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/users/#edit-a-user-s-roles
[2]: /api/v2/roles/#list-permissions
[3]: /api/v2/logs-restriction-queries/
