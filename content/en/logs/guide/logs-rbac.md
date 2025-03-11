---
title: How to Set Up RBAC for Logs
aliases:
  - /logs/guide/restrict-access-to-log-events-with-restriction-queries
further_reading:
- link: "/logs/guide/logs-rbac-permissions/"
  tag: "Documentation"
  text: "Learn more about RBAC permissions for Logs"
- link: "/api/latest/logs-restriction-queries/"
  tag: "API"
  text: "Logs Restriction Queries"
- link: "/account_management/rbac/permissions/#log-management"
  tag: "Documentation"
  text: "Datadog Role Permissions"

---

## Overview

In many organizations, logs may contain sensitive information that requires [scrubbing][1] or restricted access to ensure compliance and privacy. Role-Based Access Control (RBAC) enables you to manage user access permissions efficiently, allowing only authorized personnel access to specific logs and features. This guide details how to set up RBAC for logs in Datadog, focusing on creating custom roles and assigning appropriate permissions.

This guide covers the following topics:

1. [**Prerequisites for Admins**](#prerequisites): Details the necessary prerequisites.
2. [**Setting Up Roles for the ACME Team**](#setting-up-roles): Instructions on creating roles and assigning team members.
3. [**Limiting Access to Logs**](#restrict-access-to-logs): How to employ restriction queries to control log access.
4. [**Configuring Permissions on Log Assets**](#restrict-access-to-log-assets): Guidelines for setting permissions on pipelines, indexes, and archives.


## Managing multiple teams

Consider an organization with multiple teams, such as the ACME team, which handles ACME logs for troubleshooting and auditing. Within the ACME team, there are two primary user categories:

- **ACME Admin:** These users manage ACME log collection, pipelines, and exclusion filters.
- **ACME User:** These users access ACME logs and create monitors or dashboards based on these logs.

You can customize this setup to fit your organizational needs, either by consolidating permissions into a single role or creating multiple roles for more detailed access control. The principles outlined here can be adapted to other teams within your organization. 

In Datadog, permissions are additive; users belonging to multiple teams benefit from combined permissions across all assigned roles.

## The role of Datadog Admin

As a Datadog Admin, you can configure a secure environment for ACME team members to manage their logs without affecting logs from other teams. This guide explains the steps for setting up roles and permissions to restrict log access to ACME Users specifically. You can also adapt the setup to make ACME Admins serve as Datadog Admins if needed.

## Prerequisites

### Tagging incoming logs

First, tag incoming ACME logs with a `team:acme` tag, which helps in categorizing logs as they pass through Datadog. For instance, when collecting Docker logs, apply the `team:acme` tag using [Docker labels as tags][2]. 

For a comprehensive overview of tagging, see [Getting Started with Tags][3].

{{< img src="logs/guide/rbac/team_tag.png" alt="Apply a team tag to your logs" style="width:80%;">}}

### Logging in as a Datadog Admin

To perform the actions in this guide, you must have Datadog Admin permissions. Ensure your user account can create roles, assign users, and manage Log Pipelines, Log Indexes, and Log Archives. For more information on permissions, see [Datadog Role Permissions][4]

Navigate to the [Users list][8] to verify that you have all these permissions. If these permissions are missing, request them from a current Datadog Admin. 

### Get an API key and an app key

If you plan to use the Datadog API, you need an API key and an app key from an Admin user. API keys and app keys can be generated in your [organization settings][9]. Ensure the app key is associated with a user who has the necessary permissions. For more information, see [API and app keys][10].

In this guide, replace `<DATADOG_API_KEY>` and `<DATADOG_APP_KEY>` with your Datadog API key and application key, respectively. A terminal with `CURL` is also required.

### Obtaining permission IDs

**Note**: This section is only required if you intend on using the Datadog API to set up RBAC.

If you plan to use the Datadog API, use the [Permissions API][11] to get all existing permissions. You need the permission ID for actions such as granting roles specific permissions. **Note**: The permission IDs change depending on your selected Datadog site ({{< region-param key="dd_site_name" >}}).

```bash
curl -X GET "https://app.datadoghq.com/api/v2/permissions" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>"
```

## Setting up roles

This section guides you through creating two roles, `ACME Admin` and `ACME User`, granting them basic log permissions, and assigning users to these roles.


### Creating a role

{{< tabs >}}
{{% tab "UI" %}}

1. Navigate to the [Roles section][1] in the Datadog Organization Settings.
1. Click **New Role** to create `ACME Admin` and `ACME User`roles.
1. Assign Standard Access and basic permissions, such as Logs Read Index Data and Logs Live Tail.

{{< img src="logs/guide/rbac/add_role.png" alt="Add a new role" style="width:90%;">}}

For more information on creating roles, see [Access Control][3].


[1]: https://app.datadoghq.com/access/roles
[2]: /account_management/rbac/permissions?tab=ui#legacy-permissions
[3]: /account_management/rbac/?tab=datadogapplication#create-a-custom-role
{{% /tab %}}
{{% tab "API" %}}

1. Create `ACME Admin` and `ACME User` roles using the [Role Creation API][1]. In the following example, `dcf7c550-99cb-11ea-93e6-376cebac897c` is the role ID.
    ```bash
    curl -X POST "https://app.datadoghq.com/api/v2/roles" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type": "roles","attributes": {"name": "ACME Admin"}}}'
    ```
    ``` json
    [...]
    "type": "roles",
    "id": "dcf7c550-99cb-11ea-93e6-376cebac897c",
    "attributes": { "name": "ACME Admin", [...] }
    [...]
    ```
1. Assign the necessary permissions using the [Grant Permissions API][3]. 


[1]: /api/v2/roles/#create-role
[2]: /api/v2/roles/#list-roles
[3]: /api/v2/roles/#grant-permission-to-a-role
[4]: /api/v2/roles/#revoke-permission
{{% /tab %}}
{{< /tabs >}}

### Assigning users to roles

{{< tabs >}}
{{% tab "UI" %}}

1. In the [Users Section][1] of Datadog, select a user and assign them either the `ACME Admin` or `ACME User` role.

{{< img src="logs/guide/rbac/assign_user2.png" alt="Assigning roles to a user in the edit user screen" style="width:90%;">}}

[1]: https://app.datadoghq.com/access/users
{{% /tab %}}
{{% tab "API" %}}

1. Retrieve user IDs using the [List Users API][1].
1. Assign users to roles with the [Assign Role API][2]. 

[1]: /api/v2/users/#list-all-users
[2]: /api/v2/roles/#add-a-user-to-a-role
{{% /tab %}}
{{< /tabs >}}

## Restrict access to logs

Grant ACME Team members access to `team:acme` logs exclusively by using the [`logs_read_data`][12] permission with Restriction Queries.

For best practices, avoid extending ACME Users' permissions to access additional logs. Also, avoid applying the same `team:acme` restriction query to other roles. Instead, assign users to multiple roles based on their individual access needs.

This section details how to:

1. Create a `team:acme` restriction query.
2. Attach that restriction query to ACME roles.

**Note**: Each role can have only one restriction query attached. Attaching a new restriction query to a role replaces any existing query for that role.

### Defining a restriction query

{{< tabs >}}
{{% tab "UI" %}}

1. Navigate to the [Data Access page][1].
1. Create a `team:acme` restriction query and apply it to the ACME roles.

{{< img src="logs/guide/rbac/restriction_queries.png" alt="Restrict access to logs" style="width:90%;">}}

[1]: https://app.datadoghq.com/logs/pipelines/data-access
{{% /tab %}}
{{% tab "API" %}}

1. Create a restriction query using the [Create Restriction Query API][1].
1. Keep track of the restriction Query ID.
1. Attach the restriction query to ACME roles with the [Restriction Query API][2].
1. Enable the `logs_read_data` permissions on the role using the [Grant Permissions API][3]. See the [obtaining Permission IDs](#obtaining-permission-ids) section to get the corresponding ID for this permission.
1. (Optional) Validate the setup:
    * Get the list of roles attached to the query with the [Get Roles API][4]. You should see only `ACME Admin` and `ACME User` in the results.
    * Conversely, getting the restriction query attached to either role with the [Get Restriction Query API][5]. You should see the `team:acme` restriction query.

[1]: /api/v2/logs-restriction-queries/#create-a-restriction-query
[2]: /api/v2/logs-restriction-queries/#grant-role-to-a-restriction-query
[3]: /api/v2/roles/#grant-permission-to-a-role
[4]: /api/v2/logs-restriction-queries/#list-roles-for-a-restriction-query
[5]: /api/v2/logs-restriction-queries/#get-restriction-query-for-a-given-role
{{% /tab %}}
{{< /tabs >}}

## Restrict access to log assets

Grant the `ACME Admin` role permissions to manage Log Pipelines, Log Indexes, and Log Archives without impacting other teams.

This ensures that:
* `ACME Admin` members (and only `ACME Admin` members) can interact with ACME Log Assets.
* Neither `ACME Admin` nor `ACME User` members can interfere with assets from other teams.
* Neither `ACME Admin` nor `ACME User` members can interfere with higher level "Admin" configurations, such as which logs flow into their assets, budget limitations, or [Log Access Restriction rules](#restrict-access-to-logs).

### Log pipelines

Create a [pipeline][13] for `team:acme` logs. Grant the [`logs_write_processors`][14] permission to the `ACME Admin` role.

### Log indexes

Create [indexes][15] for `team:acme` logs for detailed budget control. Grant the [`logs_write_exclusion_filters`][16] permission to the `ACME Admin` role. 

### Log archives

Create one or multiple [archives][17] for `team:acme` logs. Assign the [`logs_read_archives`][18] permission to `ACME Admin` members. For rehydration, assign the [`logs_write_historical_view`][19] permission to `ACME Admin`.

Create one or multiple [archives][17] for `team:acme` logs. Assign the [Read Archives][18] permission to members of `ACME Admin`.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/logs/advanced_log_collection/?tab=configurationfile#scrub-sensitive-data-from-your-logs
[2]: /agent/docker/tag/?tab=containerizedagent#extract-labels-as-tags
[3]: /getting_started/tagging/
[4]: /account_management/rbac/permissions/#log-management
[8]: https://app.datadoghq.com/organization-settings/users
[9]: https://app.datadoghq.com/organization-settings/api-keys
[10]: /account_management/api-app-keys/
[11]: /api/v2/roles/#list-permissions
[12]: /account_management/rbac/permissions?tab=ui#logs_read_data
[13]: /logs/log_configuration/pipelines
[14]: /account_management/rbac/permissions?tab=ui#logs_write_processors
[15]: /logs/indexes/
[16]: /account_management/rbac/permissions?tab=ui#logs_write_exclusion_filters
[17]: /logs/archives/
[18]: /account_management/rbac/permissions?tab=ui#logs_read_archives
[19]: /account_management/rbac/permissions?tab=ui#logs_write_historical_view
[20]: /logs/archives#datadog-permissions
[21]: /account_management/rbac/permissions?tab=ui#logs_read_index_data
