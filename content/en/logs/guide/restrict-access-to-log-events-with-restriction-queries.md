---
title: Restrict access to log events with restriction queries
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

Logs might contain sensitive information that could either get [scrubbed][1]) or be accessible only to authorized users of your organization.

To limit access of a subset of logs for a given user or group of users, you can define restriction queries in Datadog.

In this guide, assume that there are two teams, **backend** and **frontend**, and each team can only see their own logs that have the `team:frontend` and `team:backend` tags on them.

The following steps are covered for each team:

* [Create the role](#role-creation)
* [Create the restriction query](#create-restriction-queries)
* [Attach the restriction query to the role](#attach-queries-to-the-role)
* [Attach roles to the users](#attach-role-to-the-user)
* [Remove users from the default Datadog roles](#remove-default-roles)

## Prerequisites

Since this guide describes usage of the API, you will need an API key and an application key from an admin user. These are available in your [Datadog account API key page][2].

Throughout this article, you will need to replace all occurrences of `<DATADOG_API_KEY>` and `<DATADOG_APP_KEY>` with your Datadog API key and your Datadog application key, respectively.

This guide also assumes that you have a terminal with `CURL`. 

## Role creation

Roles can be created through Datadog, as shown in [the RBAC documentation][3].

You can also use the API and the following steps to create a role.

### Create a role

Use the [Role creation API][4] to add a `team-frontend` and `team-backend` role:

{{< tabs >}}
{{% tab "Backend" %}}

API call:

```
curl -X POST "https://app.datadoghq.com/api/v2/role" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type": "roles","attributes": {"name": "team-backend"}}}'
```

Response:

```
{"data":{"type":"roles","id":"dcf7c550-99cb-11ea-93e6-376cebac897c","attributes":{"name":"team-backend","created_at":"2020-05-19T12:25:45.284949+00:00","modified_at":"2020-05-19T12:25:45.284949+00:00"},"relationships":{"permissions":{"data":[{"type":"permissions","id":"d90f6830-d3d8-11e9-a77a-b3404e5e9ee2"},{"type":"permissions","id":"4441648c-d8b1-11e9-a77a-1b899a04b304"}]}}}}
```

{{% /tab %}}
{{% tab "Frontend" %}}

API call:

```
curl -X POST "https://app.datadoghq.com/api/v2/role" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type": "roles","attributes": {"name": "team-frontend"}}}'
```

Response:

```
{"data":{"type":"roles","id":"63b970ea-99ca-11ea-93e6-e32eb84de6d6","attributes":{"name":"team-frontend","created_at":"2020-05-19T12:15:12.375425+00:00","modified_at":"2020-05-19T12:15:12.375425+00:00"},"relationships":{"permissions":{"data":[{"type":"permissions","id":"d90f6830-d3d8-11e9-a77a-b3404e5e9ee2"},{"type":"permissions","id":"4441648c-d8b1-11e9-a77a-1b899a04b304"}]}}}}
```

{{% /tab %}}
{{% tab "Generic API" %}}

API call:

```
curl -X POST \
        "https://app.datadoghq.com/api/v2/roles" \
        -H "Content-Type: application/json" \
        -H "DD-API-KEY: <DATADOG_API_KEY>" \
        -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" \
        -d '{
            "data": {
                "type": "roles",
                    "attributes": {
                        "name": <ROLE_NAME>
                    }
            }
        }'
```

{{% /tab %}}
{{< /tabs >}}

By default, the roles are created with read-only permissions. The next step involves adding permissions to these roles.
Keep note of the Role IDs that you got in the reponse, as they are necessary to for when you want to assign permissions to these roles.

### List available permissions

Get the [list of all existing permissions][5]:

```
curl -X GET "https://app.datadoghq.com/api/v2/permissions" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>"
```

The answer is an array of permissions with each item of the array shown below:

```
{
  "data": [
    {
      "attributes": {
        "created": "2019-09-19T10:00:00.000Z",
        "description": "string",
        "display_name": "string",
        "display_type": "string",
        "group_name": "string",
        "name": "string",
        "restricted": false
      },
      "id": "string",
      "type": "string"
    }
  ]
}
```

**Note**: The permission IDs change depending on whether you are using the Datadog US or EU site. Make sure to recover the IDs through the API call in the first section.

There are two types of permissions:

* [General permissions][6] (Admin, Standard, Read-only)
* [Advanced permissions][7]

This guide assumes that the users should not be restricted except for their access to the data, so they will be granted all the permissions—including the admin general permission.

To access logs within Datadog, the following permissions are critical:

* `logs_read_data`: Global switch that gives access to logs data (including Live Tail and rehydrated logs).
* `logs_read_index_data`: Specific permissions for indexed data (available in Log Explorer).
* `logs_live_tail`: Access to the Live Tail feature.

Users must have these three permissions activated to see both ingested and indexed logs. 
Access is then restricted with a restriction query, as shown below.

### Grant permissions to the role

Permissions are added one by one through the [Roles API][8]). 

For each permission ID obtained by listing all available permissions, grant them to each role as shown below:

{{< tabs >}}
{{% tab "Backend" %}}

API call (replace the role ID by yours and fill the permission ID):

```
curl -X POST "https://app.datadoghq.com/api/v2/roles/dcf7c550-99cb-11ea-93e6-376cebac897c/permissions" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type":"type": "permissions","id": <PERMISSION_ID>}}’
```

{{% /tab %}}
{{% tab "Frontend" %}}

API call (replace the role ID by yours and fill the permission ID):

```
curl -X POST "https://app.datadoghq.com/api/v2/roles/63b970ea-99ca-11ea-93e6-e32eb84de6d6/permissions" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type":"type": "permissions","id": <PERMISSION_ID>}}’
```
{{% /tab %}}
{{% tab "Generic API" %}}

API call:

```
curl -X POST "https://app.datadoghq.com/api/v2/roles/<ROLE_ID>/permissions" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type":"type": "permissions","id": <PERMISSION_ID>}}’
```

{{% /tab %}}
{{< /tabs >}}

## Create Restriction Queries

There are many ways to identify which logs correspond to each team. For example, you can use the service value, or add a `team` tag on your data.

This guide assumes that there is a `team` tag associated with the backend and frontend logs.

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

## Attach queries to the role

You have the role ID and query ID from the response of the creation call. Use them when attaching the query to the role.
Note that the IDs are specific to this example; doing this on your account would give different role and query IDs. Check the [permission documentation][10] for more information about restrictions in Datadog.

{{< tabs >}}
{{% tab "Backend" %}}

API call:

```
curl -X POST "https://app.datadoghq.com/api/v2/logs/config/restriction_queries/76b2c0e6-98fa-11ea-93e6-775bd9258d59/roles" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type": "roles","id": "dcf7c550-99cb-11ea-93e6-376cebac897c"}}’
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
curl -X POST "https://app.datadoghq.com/api/v2/logs/config/restriction_queries/b3228a0c-98fa-11ea-93e6-d30e1d2c52ee/roles" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type": "roles","id": "63b970ea-99ca-11ea-93e6-e32eb84de6d6"}}’
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
curl -X POST "https://app.datadoghq.com/api/v2/logs/config/restriction_queries/<RESTRICTION_QUERY_ID>/roles" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type": "roles","id": "<ROLE_ID>"}}’
```

{{% /tab %}}
{{< /tabs >}}

## Attach role to the user

Finally, now that your roles are configured with their permissions and restriction queries, you can give these roles to your users.

### Get the user IDs

The first step is to [get the list of users][11]:

```
curl -X GET "https://api.datadoghq.com/api/v2/users" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>"
```

Focus on the `data` object within the response, and extract the user IDs of the users that should belong to the `Backend` and `Frontend` role.

Also, check if they already have roles and their IDs.

### Attach the role to the user

For each user, [assign the created backend and frontend end role][12]:

```
curl -X POST "https://api.datadoghq.com/api/v2/roles/<ROLE_ID>/users" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type":"users","id":"<USER_ID>"}}'
```

### Remove default roles

Users have a default Datadog role (admin, standard, read only). If this is the first time you are creating custom roles and assigning users to them, users might still have their default Datadog role, which would let them access the data.

When you got the list of users, you also got the list of their roles. For the other roles that your user belongs to, double check if this is a standard role or not:

```
curl -X GET "https://api.datadoghq.com/api/v2/roles/{role_id}" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>"
```

If the name of that role is Datadog Standard Role or Datadog Admin Role, [remove it from that user][13] to make sure they only belong to the newly created role and not the default Datadog ones.

Note that a user can belong to multiple roles.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/logs/advanced_log_collection/?tab=configurationfile#scrub-sensitive-data-from-your-logs
[2]: https://app.datadoghq.com/account/settings#api
[3]: /account_management/rbac/?tab=datadogapplication#create-a-custom-role
[4]: /api/v2/roles/#create-role
[5]: /api/v2/roles/#list-permissions
[6]: /account_management/rbac/permissions?tab=datadogapplication#general-permissions
[7]: /account_management/rbac/permissions?tab=datadogapplication#advanced-permissions
[8]: /api/v2/roles/#grant-permission-to-a-role
[9]: /api/v2/logs-restriction-queries/#grant-role-to-a-restriction-query
[10]: /account_management/rbac/permissions?tab=datadogapplication#log-data-access
[11]: /api/v2/users/#list-all-users
[12]: /api/v2/roles/#add-a-user-to-a-role
[13]: /api/v2/roles/#remove-a-user-from-a-role
