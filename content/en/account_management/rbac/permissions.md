---
title: Datadog Role permissions
kind: documentation
aliases:
  - /account_management/faq/managing-global-role-permissions
further_reading:
    - link: '/account_management/rbac/'
      tag: 'Documentation'
      text: 'Learn how to create, update and delete a Role'
    - link: '/api/#get-permissions'
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
| logs_read_index_data         | Read a subset of all log indexes           | true     |
| logs_modify_indexes          | Update the definition of log indexes       | false    |
| logs_live_tail               | Access the live tail feature               | false    |
| logs_write_exclusion_filters | Update a subset of the exclusion filters   | true     |
| logs_write_pipelines         | Update a subset of the log pipelines       | true     |
| logs_write_processors        | Update the log processors in an index      | true     |
| logs_write_archives          | Update the external archives configuration | false    |
| logs_public_config_api       | Access the Logs Public Config API (r/w)    | false    |
| logs_generate_metrics        | Access the Generate Metrics feature        | false    |

More details about these permissions below.

### Log Configuration Access

#### logs_live_tail

Grants a role the ability to use the live tail feature.

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


[1]: /api/#roles
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


[1]: /api/#roles
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


[1]: /api/#roles
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
        https://app.datadoghq.com/api/v1/roles/<ROLE_UUID>/permissions/<PERMISSION_UUID> \
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


[1]: /api/#roles
[2]: /api/#get-permissions
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


[1]: /api/#roles
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


[1]: /api/#roles
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


[1]: /api/#roles
{{% /tab %}}
{{< /tabs >}}

### Log Data Access

The following permissions can be granted to manage read access on subsets of log data:

#### logs_read_index_data

Grants a role read access on some number of log indexes. Can be set either globally or limited to a subset of log indexes.

{{< tabs >}}
{{% tab "Datadog application" %}}

**Global access**:

Go to your [Datadog Roles page][1] and select the checkbox `read` as below for the wanted role:

{{< img src="account_management/rbac/logs_read_index_data_access.png" alt="Create a custom Role"  style="width:90%;">}}

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
        https://app.datadoghq.com/api/v2/roles/<ROLE_UUID>/permissions/<PERMISSION_UUID> \
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


[1]: /api/#roles
[2]: /api/#get-permissions
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/users/#edit-a-user-s-roles
[2]: /api/#get-permissions
