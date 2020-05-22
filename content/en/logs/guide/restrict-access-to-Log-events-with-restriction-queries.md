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

Logs might contain sensitive information that could either get [scrubbed][1] or be accessible only to authorized users of your organisation.
Restriction queries can be defined in Datadog to limit access of a subset of logs for a given user or group of users.

In this guide we assume that there are 2 teams, **backend** and **frontend**, and each team can only see their own logs that have the `team:frontend` and `team:backend` tags on them.

We will cover the following steps for each team:

* [Create the role](#role-creation)
* [Create the restriction query](#create-restriction-queries)
* [Attach the restriction query to the role](#attach-queries-to-the-role)
* [Attach roles to the users](#attach-role-to-the-user)

## Getting ready with the API

This guide shows how to use the API to perform such action, therefore an API key and an app-key from an admin user must be used.
Those are available in your [Datadog account api key page][2].

In the rest of this article, you will need to replace all occurrences of `<DATADOG_API_KEY>` and `<DATADOG_APP_KEY>` by their value.
This guide also assumes that you have a terminal with `CURL`. 

## Role creation

Roles might be created through the UI as shown in [this documentation][3].
But let’s go through the steps to create those through the API.

### 1. Create a role

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

By default the roles are created with read-only permissions. So let’s add some permissions to those roles.
For this, keep note of the Role IDs that you got in the reponse as it will be necessary to assign permissions to them.

### List available permissions

Get the [list of all existing permission][5]:

```
curl -X GET "https://app.datadoghq.com/api/v2/permissions" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>"
```

The answer should be an array of permissions with each item of this array as below:

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

**Note** that the permission IDs change if you are using the Datadog US or EU region so make sure to recover the IDs through this API call.

There are two types of permissions:

* [General permissions][6] (Admin, Standard, Read-only)
* [Advanced permissions][7]

In this guide we assume that the users should not be restricted except for their access to the data so we will grant them all the permissions including the admin general permission.
But to access Logs within Datadog, there are a couple of those permissions that are critical:

* `logs_read_data`: Global switch that gives access to logs data (including livetail and rehydrated logs)
* `logs_read_index_data`: Specific permission for indexed data (the one available in the log explorer)
* `logs_live_tail`: Access to the livetail feature

Users must have those 3 permissions activated to see both ingested and indexed logs. 
Access would then be restricted with a restriction query as will see below.

### 3. Grant permissions to the role

Permissions are added one by one through the [Roles API][8]. 
For each permission ID that we obtained by listing all available permissions, let's grant them as show below to each of our role:

{{< tabs >}}
{{% tab "Backend" %}}

API call (replace the role ID by yours and fill the permission id):

```
curl -X POST "https://app.datadoghq.com/api/v2/roles/dcf7c550-99cb-11ea-93e6-376cebac897c/permissions" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type":"type": "permissions","id": <PERMISSION_ID>}}’
```

{{% /tab %}}
{{% tab "Frontend" %}}

API call (replace the role ID by yours and fill the permission id):

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

There are many ways to identify which logs correspond to each team. For example, by using the service value or by adding a `team` tag on your data.
In this guide we  assume that there is a `team` tag associated with the Backend and Frontend logs.
Query for the backend team

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

We now have created both the role and the query for the frontend and the backend team. 
Let’s now restrict the access to the backend and frontend by [attaching the restriction query to the created role][9] thanks to the role IDs and Query IDs.

## Attach queries to the role

We have the role ID and query ID from the response of the creation call and use them when attaching the query to the role.
Note that the IDs are specific to this example, doing this on your account would give different role and query IDs.

{{< tabs >}}
{{% tab "Backend" %}}

API call:

```
curl -X POST "https://app.datadoghq.com/api/v2/logs/config/restriction_queries/76b2c0e6-98fa-11ea-93e6-775bd9258d59/roles" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type": "roles","id": "dcf7c550-99cb-11ea-93e6-376cebac897c"}}’
```

Confirm that it is attached by [getting the list of roles attached to the query](https://docs.datadoghq.com/api/v2/logs-restriction-queries/#list-roles-for-a-restriction-query): 

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

{{% /tab %}}
{{% tab "Frontend" %}}

API call:

```
curl -X POST "https://app.datadoghq.com/api/v2/logs/config/restriction_queries/b3228a0c-98fa-11ea-93e6-d30e1d2c52ee/roles" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type": "roles","id": "63b970ea-99ca-11ea-93e6-e32eb84de6d6"}}’
```

Confirm that it is attached by [getting the list of roles attached to the query](https://docs.datadoghq.com/api/v2/logs-restriction-queries/#list-roles-for-a-restriction-query): 

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

{{% /tab %}}
{{% tab "Generic API" %}}

API call:

```
curl -X POST "https://app.datadoghq.com/api/v2/logs/config/restriction_queries/<RESTRICTION_QUERY_ID>/roles" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type": "roles","id": "<ROLE_ID>"}}’
```

{{% /tab %}}
{{< /tabs >}}

## Attach role to the user

The only missing piece is to now give those roles to the users.

### Get the user IDs

The first step is to [get the list of users][10]:

```
curl -X GET "https://api.datadoghq.com/api/v2/users" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>"
```

Focus on the `data` object within the response and extra the user IDs of the users that should belong to the `Backend` and `Frontend` role.
Also check if they already have roles and their IDs.

### Attach the role to the user

For each user, [assign the created backend and frontend end role][11]:

```
curl -X POST "https://api.datadoghq.com/api/v2/roles/<ROLE_ID>/users" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type":"users","id":"<USER_ID>"}}'
```

### Remove default roles

Users have a default Datadog role (admin, standard, read only). If this is the first time you are creating custom roles and assigning users to it, users might still have their default Datadog role which would let them access the data.
Otherwise feel free to ignore this part.

When we got the list of users, we also got the list of their roles. For the other roles that your user belongs to, double check if this is a standard role or not:

```
curl -X GET "https://api.datadoghq.com/api/v2/roles/{role_id}" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>"
```

If the name of that role is Datadog Standard Role, or Datadog Admin Role, [remove it from that user][12] to make sure they only belong to the newly created role and not the default Datadog ones.

Note that a user can be long to multiple roles.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/logs/advanced_log_collection/?tab=configurationfile#scrub-sensitive-data-from-your-logs)
[2]: /account/settings#api
[3]: /account_management/rbac/?tab=datadogapplication#create-a-custom-role
[4]: /api/v2/roles/#create-role
[5]: /api/v2/roles/#list-permissions
[6]: /account_management/rbac/permissions?tab=datadogapplication#general-permissions
[7]: /account_management/rbac/permissions?tab=datadogapplication#advanced-permissions
[8]: /api/v2/roles/#grant-permission-to-a-role)
[9]: /api/v2/logs-restriction-queries/#grant-role-to-a-restriction-query
[10]: /api/v2/users/#list-all-users
[11]: /api/v2/roles/#add-a-user-to-a-role
[12]: /api/v2/roles/#remove-a-user-from-a-role
