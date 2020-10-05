---
title: How to set up Logs RBAC 
aliases:
  - /logs/guide/restrict-access-to-log-events-with-restriction-queries
kind: guide
further_reading:
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Learn more about Log Explorer"
- link: "/logs/explorer/patterns/"
  tag: "Documentation"
  text: "Get familiar with the Logs pattern view"
- link: "/logs/live_tail/"
  tag: "Documentation"
  text: "Explore Live Tail"
- link: "/logs/logs_to_metrics/"
  tag: "Documentation"
  text: "Learn how to generate metrics from ingested logs"
---

## Overview


Logs might contain **sensitive information** that could either get [scrubbed][1] or be accessible only to authorized users of your organization. Besides, you probably want to segment your users so that they **don't interfere one with another** as far as configuration and budget control is concerned. 

This guides aims at sharing good practices on how to setup permissions in such context. 


### The "ACME" Team

Let's assume that your organisation consists of multiple teams, one of which being the **ACME** (Applicative Component Making Errors) team whose members have to deal with ACME Logs for troubleshooting and auditing purpose. 


As this is a pretty common practice among our customers, this guide also assumes that you have 2 categories of users in the ACME Team:

* **ACME Admins**: the users in charge of ACME log collection, in charge of pipelines and exclusion filters.
* **ACME Users** : the users to access ACME logs and create Monitor or Dashboards out of these logs.

*Note : You can adapt this guide for one single Sandbox Role (concentrating permissions from both ACME Admins and ACME Users) for the sake of simplicity, or more roles for the sake of more granular permissions.*

Although this guide focuses on the ACME Team, whatever you setup for the ACME team is replicable to every other team you have in your organisation. Members of the ACME team **can** also be members of other teams across your organisation: as permissions are additive in Datadog, such multi-team users will benefit from permissions inherited from every single team they belong to.


### The role of Datadog Admin

Eventually, the purpose of that guide is to explain how you, as a Datadog Admin, set up a safe playground for ACME Team Members to safely interact with their logs (whithout interfering with other team logs) whilst also restricting access to these logs only to ACME users.

*Note: You can adapt this guide to consider that ACME admins are also Datadog Admins, which is a common practice for smaller organisations.*

More concretely, we'll explore in this guide how, as a Datadog Admin, you can approach how to: 

* **Set up Roles** for the Sandbox team and **assign members**,
* Configure permissions on **Log Assets** (namely Pipelines, Indexes and Archives),
* **Limit access to logs** all across Datadog Application with Restriction Queries


## Prerequisites

{{< tabs >}}
{{% tab "UI" %}}

{{% /tab %}}
{{% tab "API" %}}

{{% /tab %}}
{{< /tabs >}}

### Tags on incoming logs

As this will be useful to triage your logs as they flow throughout Datadog, make sure to tag ACME incoming logs with a `team:acme` tag. 

{{< img src="logs/guide/rbac/team_tag.png" alt="Apply a team tag to your logs"  style="width:60%;">}}

As a matter of example in the context of Docker Log Collection, attach the `team:acme` tag to logs flowing from that container with [docker labels as tags][85].  Refer to our [Tagging Section][84] for a more general overview.


### Log in as a Datadog Admin

The actions you have to perform in that guide require you belong to a Datadog Admin Role. More specifically, you neeed:

* permissions to create roles and assign users to role (actual Priviledged Access).
* permissions to create [Log Pipelines][90], [Log Indexes][91] and [Log Archives][92]
* permissions to interact through the [Log Configuration API][93] in case you perform those operations through API rather than UI.

Check by yourself in the [Datadog App][86] that you do have all these permissions. If you happen to miss one of these permissions, ask an Admin user to set it for yourself.

{{< img src="logs/guide/rbac/admin_permissions.png" alt="Check your permissions as an admin"  style="width:60%;">}}


{{< tabs >}}
{{% tab "UI" %}}

You're all set!

{{% /tab %}}
{{% tab "API" %}}

**Application and API Keys**

Since this guide describes usage of the API, you will need an API key and an application key from an admin user. These are available in your [Datadog account API key page][1]. More details available in the [API and APP Keys][2] section of our documentation.

{{< img src="logs/guide/rbac/app-api_keys.png" alt="Delete invite on the grid view"  style="width:60%;">}}

Throughout this article, you will need to replace all occurrences of `<DATADOG_API_KEY>` and `<DATADOG_APP_KEY>` with your Datadog API key and your Datadog application key, respectively. This guide also assumes that you have a terminal with `CURL`. 

**Permission IDs**

Use the [Permissions API][3] to get the list of all existing permissions, which will be further required to assign the permissions to roles.

```
curl -X GET "https://app.datadoghq.com/api/v2/permissions" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>"
```

For such calls, the answer is an array of permissions such as the one below (the `logs_read_data` permission has the id `1af86ce4-7823-11ea-93dc-d7cad1b1c6cb` which is all you need to know about that permission).

```
{
    "type": "permissions",
    "id": "1af86ce4-7823-11ea-93dc-d7cad1b1c6cb",
    "attributes": {
        "name": "logs_read_data",
        "display_name": "Logs Read Data",
        "description": "The ability to read log data. Can be restricted with restriction queries.",
        "created": "2020-04-06T16:24:35.989108+00:00",
        "group_name": "Logs",
        "display_type": "read",
        "restricted": false
    }
}
```

**Note**: The permission IDs change depending on the Datadog site (Datadog US, Datadog EU...) you are using.


[1]: https://app.datadoghq.com/account/settings#api
[2]: /account_management/api-app-keys/
[3]: /api/v2/roles/#list-permissions

{{% /tab %}}
{{< /tabs >}}


## Set up Roles

Roles can be created through Datadog, as shown in [the RBAC documentation][3].

The purpose of that series of step is:

* To create the two Roles: `Sandbox Admin` and `Sandbox Users`,
* To assign users to either Role,



### Create a role

{{< tabs >}}
{{% tab "UI" %}}

https://docs.datadoghq.com/account_management/users/
https://app.datadoghq.com/access/roles

{{< img src="logs/guide/rbac/add_role.png" alt="Delete invite on the grid view"  style="width:60%;">}}

{{% /tab %}}
{{% tab "API" %}}

Use the [Role creation API][4] to add a `team-frontend` and `team-backend` role:

API call:

```
curl -X POST "https://app.datadoghq.com/api/v2/roles" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type": "roles","attributes": {"name": "team-sandbox"}}}'
```

Response:

```
{"data":{"type":"roles","id":"dcf7c550-99cb-11ea-93e6-376cebac897c","attributes":{"name":"team-sandbox","created_at":"2020-05-19T12:25:45.284949+00:00","modified_at":"2020-05-19T12:25:45.284949+00:00"},"relationships":{"permissions":{"data":[{"type":"permissions","id":"d90f6830-d3d8-11e9-a77a-b3404e5e9ee2"},{"type":"permissions","id":"4441648c-d8b1-11e9-a77a-1b899a04b304"}]}}}}
```

Keep track of that Role ID (`dcf7c550-99cb-11ea-93e6-376cebac897c` in the example) for later, as they are necessary to for when you want to assign permissions to these roles.


{{% /tab %}}
{{< /tabs >}}


### Attach user to a role

Finally, now that your roles are configured with their permissions and restriction queries, you can give these roles to your users.

{{< tabs >}}
{{% tab "UI" %}}

{{% /tab %}}
{{% tab "API" %}}

**Get User ID**

The first step is to [get the list of users][11]:

```
curl -X GET "https://api.datadoghq.com/api/v2/users" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>"
```

Focus on the `data` object within the response, and extract the user IDs of the users that should belong to the `Backend` and `Frontend` role.

Also, check if they already have roles and their IDs.

**Attach User to Role **

For each user, [assign the created backend and frontend end role][12]:

```
curl -X POST "https://api.datadoghq.com/api/v2/roles/<ROLE_ID>/users" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type":"users","id":"<USER_ID>"}}'
```

By default, the roles are created with read-only permissions. The next step involves adding permissions to these roles.

{{% /tab %}}
{{< /tabs >}}



### Grant permissions to the role

Permissions are added one by one through the [Roles API][8]). 

For each permission ID obtained by listing all available permissions, grant them to each role as shown below:

{{< tabs >}}
{{% tab "Backend" %}}

API call (replace the role ID by yours and fill the permission ID):

```
curl -X POST "https://app.datadoghq.com/api/v2/roles/dcf7c550-99cb-11ea-93e6-376cebac897c/permissions" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type":"permissions","id": <PERMISSION_ID>}}'
```

{{% /tab %}}
{{% tab "Frontend" %}}

API call (replace the role ID by yours and fill the permission ID):

```
curl -X POST "https://app.datadoghq.com/api/v2/roles/63b970ea-99ca-11ea-93e6-e32eb84de6d6/permissions" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type":"permissions","id": <PERMISSION_ID>}}'
```
{{% /tab %}}
{{% tab "Generic API" %}}

API call:

```
curl -X POST "https://app.datadoghq.com/api/v2/roles/<ROLE_ID>/permissions" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type":"permissions","id": <PERMISSION_ID>}}'
```

{{% /tab %}}
{{< /tabs >}}

## Set up Log Assets


### Log Pipelines


{{< tabs >}}
{{% tab "UI" %}}

{{% /tab %}}
{{% tab "API" %}}

{{% /tab %}}
{{< /tabs >}}

### Log Indexes


{{< tabs >}}
{{% tab "UI" %}}

{{% /tab %}}
{{% tab "API" %}}

{{% /tab %}}
{{< /tabs >}}

### Log Archives


{{< tabs >}}
{{% tab "UI" %}}

{{% /tab %}}
{{% tab "API" %}}

{{% /tab %}}
{{< /tabs >}}


## Set up Log Access

### Restriction Queries

There are many ways to identify which logs correspond to each team. For example, you can use the service value, or add a `team` tag on your data.

This guide assumes that there is a `team` tag associated with the backend and frontend logs.



{{< tabs >}}
{{% tab "UI" %}}

{{% /tab %}}
{{% tab "API" %}}

{{% /tab %}}
{{< /tabs >}}



{{< tabs >}}
{{% tab "Backend" %}}

API call:
```
curl -X POST "https://app.datadoghq.com/api/v2/logs/config/restriction_queries" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type": "logs_restriction_queries","attributes": {"restriction_query": "team:backend"}}}'
```

Response:

```
{
	"data": {
		"type": "logs_restriction_queries",
		"id": "76b2c0e6-98fa-11ea-93e6-775bd9258d59",
		"attributes": {
			"restriction_query": "team:backend",
			"created_at": "2020-05-18T11:26:48.887750+00:00",
			"modified_at": "2020-05-18T11:26:48.887750+00:00"
		}
	}
}
```

{{% /tab %}}
{{% tab "Frontend" %}}

API call:

```
curl -X POST "https://app.datadoghq.com/api/v2/logs/config/restriction_queries" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type": "logs_restriction_queries","attributes": {"restriction_query": "team:frontend"}}}'
```

Response: 

```
{
	"data": {
		"type": "logs_restriction_queries",
		"id": "b3228a0c-98fa-11ea-93e6-d30e1d2c52ee",
		"attributes": {
			"restriction_query": "team:frontend",
			"created_at": "2020-05-18T11:28:30.284202+00:00",
			"modified_at": "2020-05-18T11:28:30.284202+00:00"
		}
	}
}
```

{{% /tab %}}
{{% tab "Generic API" %}}

```
curl -X POST "https://app.datadoghq.com/api/v2/logs/config/restriction_queries" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type": "logs_restriction_queries","attributes": {"restriction_query": "<QUERY>"}}}'
```

{{% /tab %}}
{{< /tabs >}}

You have now created both the role and the query for the frontend and the backend team. 

Next, restrict access to the backend and frontend by [attaching the restriction query to the created role][9] with the role IDs and query IDs.

### Attach queries to the role

You have the role ID and query ID from the response of the creation call. Use them when attaching the query to the role.
Note that the IDs are specific to this example; doing this on your account would give different role and query IDs. Check the [permission documentation][10] for more information about restrictions in Datadog.

{{< tabs >}}
{{% tab "Backend" %}}

API call:

```
curl -X POST "https://app.datadoghq.com/api/v2/logs/config/restriction_queries/76b2c0e6-98fa-11ea-93e6-775bd9258d59/roles" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type": "roles","id": "dcf7c550-99cb-11ea-93e6-376cebac897c"}}'
```

Confirm that it is attached by [getting the list of roles attached to the query][1]: 

```
curl -X GET "https://app.datadoghq.com/api/v2/logs/config/restriction_queries/76b2c0e6-98fa-11ea-93e6-775bd9258d59/roles" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>"
```

Reponse:

```
{
	"data": [{
		"type": "roles",
		"id": "dcf7c550-99cb-11ea-93e6-376cebac897c",
		"attributes": {
			"name": "team-backend"
		}
	}]
}
```

[1]: https://docs.datadoghq.com/api/v2/logs-restriction-queries/#list-roles-for-a-restriction-query
{{% /tab %}}
{{% tab "Frontend" %}}

API call:

```
curl -X POST "https://app.datadoghq.com/api/v2/logs/config/restriction_queries/b3228a0c-98fa-11ea-93e6-d30e1d2c52ee/roles" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type": "roles","id": "63b970ea-99ca-11ea-93e6-e32eb84de6d6"}}'
```

Confirm that it is attached by [getting the list of roles attached to the query][1]: 

```
curl -X GET "https://app.datadoghq.com/api/v2/logs/config/restriction_queries/b3228a0c-98fa-11ea-93e6-d30e1d2c52ee/roles" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>"
```

Reponse:

```
{
	"data": [{
		"type": "roles",
		"id": "63b970ea-99ca-11ea-93e6-e32eb84de6d6",
		"attributes": {
			"name": "team-frontend"
		}
	}]
}
```

[1]: https://docs.datadoghq.com/api/v2/logs-restriction-queries/#list-roles-for-a-restriction-query
{{% /tab %}}
{{% tab "Generic API" %}}

API call:

```
curl -X POST "https://app.datadoghq.com/api/v2/logs/config/restriction_queries/<RESTRICTION_QUERY_ID>/roles" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type": "roles","id": "<ROLE_ID>"}}'
```

{{% /tab %}}
{{< /tabs >}}



## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/logs/advanced_log_collection/?tab=configurationfile#scrub-sensitive-data-from-your-logs

[3]: /account_management/rbac/?tab=datadogapplication#create-a-custom-role
[4]: /api/v2/roles/#create-role

[6]: /account_management/rbac/permissions?tab=datadogapplication#general-permissions
[7]: /account_management/rbac/permissions?tab=datadogapplication#advanced-permissions
[8]: /api/v2/roles/#grant-permission-to-a-role
[9]: /api/v2/logs-restriction-queries/#grant-role-to-a-restriction-query
[10]: /account_management/rbac/permissions?tab=datadogapplication#log-data-access
[11]: /api/v2/users/#list-all-users
[12]: /api/v2/roles/#add-a-user-to-a-role
[13]: /api/v2/roles/#remove-a-user-from-a-role


[84]: /getting_started/tagging/
[85]: /agent/docker/tag/?tab=containerizedagent#extract-labels-as-tags
[86]: https://app.datadoghq.com/access/users



[90]: /account_management/rbac/permissions?tab=ui#logs-write-pipelines
[91]: /account_management/rbac/permissions?tab=ui#logs-modify-indexes
[92]: /account_management/rbac/permissions?tab=ui#logs-write-archives
[93]: /account_management/rbac/permissions?tab=ui#logs-public-config-api
