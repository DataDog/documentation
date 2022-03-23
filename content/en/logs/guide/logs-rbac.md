---
title: How to set up RBAC for Logs
aliases:
  - /logs/guide/restrict-access-to-log-events-with-restriction-queries
kind: guide
further_reading:
- link: "/logs/guide/logs-rbac-permissions/"
  tag: "Documentation"
  text: "Learn more about RBAC permissions for Logs"
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Learn more about Log Explorer"
- link: "/logs/explorer/#patterns"
  tag: "Documentation"
  text: "Get familiar with the Logs pattern view"
- link: "/logs/live_tail/"
  tag: "Documentation"
  text: "Explore Live Tail"
---

## Overview

Logs might contain **sensitive information** that could either get [scrubbed][1] or be accessible only to authorized users of your organization. You may also wish to segment your users so that they **don't interfere one with another** as far as configuration and budget control is concerned.

This guide provides a methodology in developing customized Datadog roles that allows users to access logs and log features in a compliant manner.

### Multiple teams

Assume that your organization consists of multiple teams. One of these is the **ACME** (Applicative Component Making Errors) team, whose members deal with ACME Logs for troubleshooting and auditing purposes.

This guide also assumes that you have two categories of users in the ACME Team:

* **`ACME Admin`**: A role for users in charge of ACME log collection, pipelines, and exclusion filters.
* **`ACME User`** : A role for users to access ACME logs, as well as to create monitors or dashboards out of these logs.

**Note**: You can adapt this guide for one single ACME Role (concentrating permissions from both ACME Admins and ACME Users) for the sake of simplicity, or more roles for the sake of more granular permissions.

Although this guide focuses on the ACME Team, your setup is replicable to every other team in your organization. Members of the ACME team **can** also be members of other teams across your organization. Permissions are additive in Datadog, and multi-team users can benefit from the union of permissions inherited from every  team they belong to.

### The role of Datadog admin

This guide explains how you, as a Datadog Admin, can set up a safe playground for ACME team members to interact with their logs (without interfering with other team logs) while also restricting access to these logs only to ACME Users.

**Note**: You can adapt this guide to consider that ACME Admins are also Datadog Admins.

This guide explores the following:

1. [Prerequisites](#prerequisites) for Admins.
2. **Setting up roles** for the ACME team and **assigning members**: [Set up roles](#set-up-roles).
3. **Limiting access to logs** all across a Datadog application with restriction queries: [Restrict access to logs](#restrict-access-to-logs).
4. Configuring permissions on **Log Assets** (namely pipelines, indexes, and archives): [Restrict access to log assets](#restrict-access-to-log-assets).

## Prerequisites

### Tag incoming logs

Tag ACME incoming logs with a `team:acme` tag. This is useful for triaging your logs as they flow through Datadog.

{{< img src="logs/guide/rbac/team_tag.png" alt="Apply a team tag to your logs"  style="width:60%;">}}

For example, in the context of Docker Log Collection, attach the `team:acme` tag to logs flowing from that container with [Docker labels as tags][2]. Refer to the [Tagging Section][3] for a more general overview.

### Log in as a Datadog Admin

To execute the remaining actions in this guide, your user account requires the Datadog Admin role or similar. You need the following permissions:

* Permissions to create roles and assign users to roles.
* Permissions to create [Log Pipelines][4], [Log Indexes][5], and [Log Archives][6].
* If you wish to perform those operations through the API, permissions to interact through the [Log Configuration API][7].

Check in the [Users list][8] that you have all these permissions. If you are missing any, ask a Datadog Admin user to set them for you.

TODO check/remove screenshot
{{< img src="logs/guide/rbac/admin_permissions.png" alt="Check your permissions as an admin"  style="width:60%;">}}

### Get an API key and an app key

**Note**: This section is only required if you intend on using the Datadog API, for which you need an API key and an application key from an Admin user.

API keys and app keys are available in your [Datadog account API key page][9]. More details available in the [API and app keys][10] section of the documentation.

Make sure that the app key you use is attached to your own user, or to a user who has similar permissions.

{{< img src="logs/guide/rbac/app-api_keys.png" alt="Check API and APP Keys"  style="width:60%;">}}

Throughout this guide, you will need to replace all occurrences of `<DATADOG_API_KEY>` and `<DATADOG_APP_KEY>` with your Datadog API key and your Datadog application key, respectively. This guide also assumes that you have a terminal with `CURL`.


### Get permission IDs

**Note**: This section is only required if you intend on using the Datadog API to set up RBAC.

Use the [Permissions API][11] to get the list of all existing permissions. The answer is an array of permissions such as the one below (the `logs_read_data` permission has the `<PERMISSION_ID>` `1af86ce4-7823-11ea-93dc-d7cad1b1c6cb`, which is all you need to know about that permission).

```bash
curl -X GET "https://app.datadoghq.com/api/v2/permissions" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>"
```

```json
[...]
{
    "type": "permissions",
    "id": "1af86ce4-7823-11ea-93dc-d7cad1b1c6cb",
    "attributes": {
        "name": "logs_read_data",
        "display_name": "Logs Read Data",
        [...]
    }
}
[...]
```

**Note**: The permission IDs change depending on the Datadog site (Datadog US, Datadog EU, etc.) you are using.

## Set up roles
This section explains how to create two roles, `ACME Admin` and `ACME User`; how to grant both roles minimal log permissions (extended later on in this guide); and how to assign users either role.

### Create a role

{{< tabs >}}
{{% tab "UI" %}}

In the [Groups Section][1] of Datadog Organization Settings, use the Add Role button within the Role tab to create the new `ACME Admin` and `ACME User`roles.

{{< img src="logs/guide/rbac/add_role.png" alt="Add a new role" style="width:60%;">}}

When creating a new role:

* Create with Standard Access.
* Grant Read Index Data and Live Tail permissions—these are [legacy permissions][2] that you can safely enable.

TODO: Update screenshot to reflect new roles UI.
{{< img src="logs/guide/rbac/minimal_permissions.png" alt="Grant minimal permissions"  style="width:60%;">}}

More information on creating roles is available in the [Account Management][3] section.


[1]: https://app.datadoghq.com/access/roles
[2]: /account_management/rbac/permissions?tab=ui#legacy-permissions
[3]: /account_management/rbac/?tab=datadogapplication#create-a-custom-role
{{% /tab %}}
{{% tab "API" %}}

Repeat the following steps for `ACME Admin` and `ACME User` roles:

1. If the role does not already exist, create the role with [Role Creation API][1]. In the following example, `dcf7c550-99cb-11ea-93e6-376cebac897c` is the role ID.

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

2. **Alternatively**, if the role already exists, use the [Role List API][2] to get its Role ID.

``` bash
curl -X GET "https://app.datadoghq.com/api/v2/roles?page[size]=10&page[number]=0&sort=name&filter=ACME" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>"'
```

``` json
[...]
"type": "roles",
"id": "dcf7c550-99cb-11ea-93e6-376cebac897c",
"attributes": { "name": "ACME Admin", [...] }
[...]
```

3. Check the existing permissions for the role (it should only have Read Monitors and Read Dashboards for newly created roles).

``` bash
curl -X GET "https://app.datadoghq.com/api/v2/roles/<ROLE_ID>/permissions" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>"

```

3. Assign the `standard`, `logs_read_index_data`, and `logs_live_tail` permissions to the role using to the [Grant Permissions API][3]. Refer to the [Get Permission IDs](#get-permission-ids) section to get corresponding IDs.

``` bash
curl -X POST "https://app.datadoghq.com/api/v2/roles/<ROLE_ID>/permissions" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type":"permissions","id": "<PERMISSION_ID>"}}'

```

4. **If needed**, revoke all other log permissions with the [Revoke Permissions API][4].

``` bash
curl -X DELETE "https://app.datadoghq.com/api/v2/roles/<ROLE_ID>/permissions" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type":"permissions","id": "<PERMISSION_ID>"}}'

```

[1]: /api/v2/roles/#create-role
[2]: /api/v2/roles/#list-roles
[3]: /api/v2/roles/#grant-permission-to-a-role
[4]: /api/v2/roles/#revoke-permission
{{% /tab %}}
{{< /tabs >}}

### Attach a user to a role

Now that your roles are configured with their permissions, assign these roles to your users.

{{< tabs >}}
{{% tab "UI" %}}

In the [Team Section][1] of Datadog, go to the User tab. Pick a user and assign them either the `ACME Admin` or `ACME User` role, in addition to any roles they may already be assigned. More details on user management are available in the [Account Management][2] section.

{{< img src="logs/guide/rbac/assign_user.png" alt="Delete invite on the grid view"  style="width:60%;">}}
{{< img src="logs/guide/rbac/assign_user2.png" alt="Delete invite on the grid view"  style="width:60%;">}}

[1]: https://app.datadoghq.com/access/users
[2]: /account_management/users/
{{% /tab %}}
{{% tab "API" %}}

Using the [List Users API][1], get the user ID of the user you want to assign to either the `ACME Admin` or the `ACME User` role. As this API is paginated, you might need to filter results, using—for instance—the last name of the user as a query parameter. In the following example, the user ID is `1581e993-eba0-11e9-a77a-7b9b056a262c`.

``` bash
curl -X GET "https://api.datadoghq.com/api/v2/users?page[size]=10&page[number]=0&sort=name&filter=smith" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>"
```

``` json
[...]
"type": "users",
"id": "1581e993-eba0-11e9-a77a-7b9b056a262c",
"attributes": {
    "name": "John Smith",
    "handle": "john.smith@company.com",
    [...]
},
[...]
```

**Attach users to ACME roles**

For each user, use the [Assign Role API][2] to add this them to this role.

``` bash
curl -X POST "https://api.datadoghq.com/api/v2/roles/<ROLE_ID>/users" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type":"users","id":"<USER_ID>"}}'
```

**Remove users from default roles**

Check if the user already has roles and their IDs. You might want to remove default Datadog roles from these users, as they may grant additional permissions to the user you do not wish to grant.

``` bash
curl -X DELETE "https://api.datadoghq.com/api/v2/roles/<ROLE_ID>/users" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type":"users","id":"<USER_ID>"}}'
```

[1]: /api/v2/users/#list-all-users
[2]: /api/v2/roles/#add-a-user-to-a-role
{{% /tab %}}
{{< /tabs >}}

## Restrict access to logs

This section explains how to grant ACME Team members (both `ACME Admin` and `ACME User` members) access to `team:acme` logs—and only `team:acme` logs. It uses the [Log Read Data][12] permission scoped with Restriction Queries.

As a good practice for maximum granularity and easier maintenance, you should **not** extend the permissions of ACME Users to access more logs. Do not restrict other roles to the same `team:acme` restriction query. Instead, consider assigning users to multiple roles based on what each of them, individually, needs to access.

This section details how to:

1. Create a `team:acme` restriction query.
2. Attach that restriction query to ACME roles.

**Note**: Roles can have **no more than one** restriction query attached. If you attach a restriction query to a role, it removes any restriction queries already attached to this role.

{{< tabs >}}
{{% tab "UI" %}}

Use the [Data Access page][1] in the Datadog App to:

* Create a `team:acme` restriction query.
* Assign `ACME Admin` and `ACME User` roles to that restriction query.

{{< img src="logs/guide/rbac/restriction_queries.png" alt="Restrict access to logs"  style="width:60%;">}}

Refer to the [`logs_read_data` permission section][1] for more information.

[1]: https://app.datadoghq.com/logs/pipelines/data-access
{{% /tab %}}
{{% tab "API" %}}

Use the [Create Restriction Query API][1] to create a new restriction query. Keep track of the restriction Query ID (`76b2c0e6-98fa-11ea-93e6-775bd9258d59` in the following example).

``` bash
curl -X POST "https://app.datadoghq.com/api/v2/logs/config/restriction_queries" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type": "logs_restriction_queries","attributes": {"restriction_query": "team:acme"}}}'
```

``` json
{
	"data": {
		"type": "logs_restriction_queries",
		"id": "76b2c0e6-98fa-11ea-93e6-775bd9258d59",
		"attributes": {
			"restriction_query": "team:acme",
			"created_at": "2020-05-18T11:26:48.887750+00:00",
			"modified_at": "2020-05-18T11:26:48.887750+00:00"
		}
	}
}

```

Next, attach the previous restriction query to ACME roles with the [Restriction Query API][2]. Repeat this operation with `ACME Admin` and `ACME User` role IDs.

``` bash
curl -X POST "https://app.datadoghq.com/api/v2/logs/config/restriction_queries/<RESTRICTION_QUERY_ID>/roles" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type": "roles","id": "<ROLE_ID>"}}'
```

Finally, enable the `logs_read_data` permissions on the role using the [Grant Permissions API][3]. Refer to the [Get Permission IDs](#get-permission-ids) section to get the corresponding ID for this permission.

``` bash
curl -X POST "https://app.datadoghq.com/api/v2/roles/<ROLE_ID>/permissions" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type":"permissions","id": "<PERMISSION_ID>"}}'

```

Optionally, confirm that the set up is properly done:

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

This section details how to grant `ACME Admin` role members the permission to interact with ACME Log Assets (namely Log Pipelines, Log Indexes, and Log Archives).

This ensures that:

* `ACME Admin` members (and only `ACME Admin` members) can interact with ACME Log Assets.
* Neither `ACME Admin` nor `ACME User` members can interfere with assets from other teams.
* Neither `ACME Admin` nor `ACME User` members can interfere with higher level "Admin" configurations, such as which logs flow into their assets, budget limitations, or [Log Access Restriction rules](#restrict-access-to-logs).


As a good practice for maximum granularity and easier maintainability, you should **not** grant other roles the permission to edit the ACME Log Assets. Instead, consider adding (some) users from those other roles to the `ACME Admin` role as well.

### Log pipelines

Create one [pipeline][13] for `team:acme` logs. Assign the [Write Processor][14] permission to members of `ACME Admin`, but **scope** that permission to this ACME "root" pipeline.

{{< img src="logs/guide/rbac/pipelines.png" alt="ACME Pipeline"  style="width:60%;">}}

### Log indexes

Create one or multiple [indexes][15] for `team:acme` logs. Multiple indexes can be valuable if ACME team needs fine-grained budget control (for instance, indexes with different retentions, or indexes with different quotas). Assign the [Write Exclusion Filters][16] permission to members of `ACME Admin`, but **scope** that permission to these ACME Index(es).

{{< img src="logs/guide/rbac/indexes.png" alt="ACME Indexes"  style="width:60%;">}}

### Log archives

#### Read archives

Create one or multiple [archives][17] for `team:acme` logs. Assign the [Read Archives][18] permission to members of `ACME Admin`, but **scoped** to that ACME Archive(s).

{{< img src="logs/guide/rbac/archives.png" alt="ACME Archives"  style="width:60%;">}}

Multiple archives can be useful if you have different lifecycle policies depending on logs (for instance, for production and staging logs). Keep in mind that rehydration is intended to work for only one archive at a time, though you can trigger multiple rehydrations on multiple archives at once.

#### Write historical views

Assign the [Write Historical View][19] permission to members of `ACME Admin`. This permission grants the ability to perform rehydrations.

**Optionally**, set up your Log Archives so that all logs rehydrated from that archive will eventually have the `team:acme` tag, whether or not they had the tag in the archive. [This option][20] enables you to enforce consistency with your existing restriction policies, as well as to safely remove deprecated restrictions that correspond to no more logs flowing in Datadog or indexed in Datadog.

{{< img src="logs/guide/rbac/archives.png" alt="ACME Tags at Rehydration"  style="width:60%;">}}

**Note**: **If** you use the [Legacy Read Index Data Permission][21], add the `ACME User` role to ACME archive(s) alongside the `ACME Admin` role. As `ACME User` role members don't have the permission to perform rehydration, this does not give them sensitive permissions. However, this automatically scopes the Read Index Data permission to the resulting historical view, so that they can access the content.

{{< img src="logs/guide/rbac/rehydration_index.png" alt="Rehydration Index Permission"  style="width:60%;">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/logs/advanced_log_collection/?tab=configurationfile#scrub-sensitive-data-from-your-logs
[2]: /agent/docker/tag/?tab=containerizedagent#extract-labels-as-tags
[3]: /getting_started/tagging/
[4]: /account_management/rbac/permissions?tab=ui#logs_write_pipelines
[5]: /account_management/rbac/permissions?tab=ui#logs_modify_indexes
[6]: /account_management/rbac/permissions?tab=ui#logs_write_archives
[7]: /account_management/rbac/permissions?tab=ui#logs_public_config_api
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
