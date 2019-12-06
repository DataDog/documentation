---
title: Roles API
kind: documentation
beta: true
further_reading:
- link: "account_management/rbac/log_management/"
  tag: "Documentation"
  text: "RBAC for Log Management"
---

<div class="alert alert-warning">
Ask your sales representative or customer success manager to enable this feature.
</div>

The Roles API can be used to create and manage Datadog roles, what global permissions they grant, and which users belong to them.

Permissions related to specific account assets can be granted to roles in the Datadog application without using this API. For example, granting read access on a specific log index to a role can be done in Datadog from [the Pipelines Page][1].

## Requests

All the API endpoints below can have two different host endpoints:

* If you are on the Datadog US site: `https://api.datadoghq.com/api/`
* If you are on the Datadog EU site: `https://api.datadoghq.eu/api/`

### Get all roles


Returns all roles, including their names and UUIDs.

| Method | Endpoint path | Required payload |
|--------|--------------|-------------------|
| `GET`  | `/v2/roles`  | No Payload        |

##### ARGUMENTS

* **`page[size]`** [*optional*, *default*=**0**]:
Page number of roles to return for a given page.
* **`page[count]`** [*optional*, *default*=**10**]:
Number of roles to return for a given page.
* **`sort`** [*optional*, *default*=**name**]:
Sort roles depending on the given field. Sort order is **ascending** by default. Sort order is **descending** if the field is prefixed by a negative sign (Eg: *sort=-name*).
  * Options: **name**, **modified_at**, **user_count**
* **`filter`**[*optional*, *default*=**None**]:
Filter all roles by the given string.


{{< tabs >}}
{{% tab "Example" %}}

{{< code-block lang="bash" filename="roles.sh" >}}
curl -X GET "https://app.datadoghq.com/api/v2/roles" \
     -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
     -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>"
{{< /code-block >}}

Replace the `<YOUR_DATADOG_API_KEY>` and `<YOUR_DATADOG_APPLICATION_KEY>` placeholder with the corresponding [API and application keys for your organization][1].

[1]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Response" %}}

```json
{
    "meta": {
        "page": {
            "total_filtered_count": 7,
            "total_count": 7
        }
    },
    "data": [
	    {
            "type": "roles",
            "id": "$ROLE_UUID",
            "attributes": {
                "name": "$ROLE_NAME",
                "created_at": "2000-02-29T16:50:43.607749+00:00",
                "modified_at": "2000-02-29T16:50:43.607749+00:00",
                "user_count": 2122
            },
            "relationships": {
                "permissions": {
                    "data": [
                        {
                            "type": "permissions",
                            "id": "$PERMISSION_UUID"
                        },
                        {
                            "type": "permissions",
                            "id": "$PERMISSION_UUID"
                        }
                    ]
                }
            }
        }
    ]
}
```

{{% /tab %}}
{{< /tabs >}}

### Get one role

Returns a specific role, including its name and UUID.

| Method | Endpoint path            | Required payload |
|--------|-------------------------|-------------------|
| `GET`  | `/v2/roles/<ROLE_UUID>` | No Payload        |

{{< tabs >}}
{{% tab "Example" %}}

```sh
curl -X GET "https://app.datadoghq.com/api/v2/roles/<ROLE_UUID>" \
     -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
     -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>"
```

Replace the `<YOUR_DATADOG_API_KEY>` and `<YOUR_DATADOG_APPLICATION_KEY>` placeholders with the corresponding [API and application keys for your organization][1]. See the [Permission UUID section](#permission-uuids) to see what role UUIDs are available for the `<ROLE_UUID>` placeholder.

[1]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Response" %}}

```json
{
	"data": {
        "type": "roles",
        "id": "$ROLE_UUID",
        "attributes": {
            "name": "$ROLE_NAME",
            "created_at": "2000-02-29T16:50:43.607749+00:00",
            "modified_at": "2000-02-29T16:50:43.607749+00:00",
            "user_count": 2122
        },
        "relationships": {
            "permissions": {
                "data": [
                    {
                        "type": "permissions",
                        "id": "$PERMISSION_UUID"
                    },
                    {
                        "type": "permissions",
                        "id": "$PERMISSION_UUID"
                    }
                ]
            }
        }
    }
}
```

{{% /tab %}}
{{< /tabs >}}

### Create role


Creates a new role. Returns role name and UUID.

| Method | Endpoint path | Required payload                           |
|--------|---------------|--------------------------------------------|
| `POST` | `/v2/roles`   | **type="roles"**<br>**attributes["name"]** |

{{< tabs >}}
{{% tab "Example" %}}

```sh
curl -X POST \
        "https://app.datadoghq.com/api/v2/roles" \
        -H "Content-Type: application/json" \
        -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
        -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
        -d '{
            "data": {
                "type": "roles",
                    "attributes": {
                        "name": <ROLE_NAME>
                    }
            }
        }'
```
Replace the `<YOUR_DATADOG_API_KEY>` and `<YOUR_DATADOG_APPLICATION_KEY>` placeholders with the corresponding [API and application keys for your organization][1]. See the [Permission UUID section](#permission-uuids) to see what roles are available for the `<ROLE_NAME>` placeholder.

[1]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Response" %}}

```json
{
	"data": {
        "type": "roles",
        "id": "$ROLE_UUID",
        "attributes": {
            "name": "$ROLE_NAME",
            "created_at": "2000-02-29T16:50:43.607749+00:00",
            "modified_at": "2000-02-29T16:50:43.607749+00:00"
        },
        "relationships": {
            "permissions": {
                "data": [
                    {
                        "type": "permissions",
                        "id": "$PERMISSION_UUID"
                    },
                ]
            }
        }
    }
}

```

{{% /tab %}}
{{< /tabs >}}

### Update role

Updates an existing role's name. Returns role name and UUID.

| Method  | Endpoint path            | Required payload                                                |
|---------|--------------------------|-----------------------------------------------------------------|
| `PATCH` | `/v2/roles/<ROLE_UUID>`  | **type="roles"**<br>**id="ROLE_UUID"**<br>**attributes["name"]**|

{{< tabs >}}
{{% tab "Example" %}}

```sh
curl -X PATCH \
         "https://app.datadoghq.com/api/v2/roles" \
         -H "Content-Type: application/json" \
         -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
         -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
         -d '{
             "data": {
                 "type": "roles",
                 "id": <ROLE_UUID>,
                 "attributes": {
                     "name": <ROLE_NAME>
                }
             }
         }'
```

Replace the `<YOUR_DATADOG_API_KEY>` and `<YOUR_DATADOG_APPLICATION_KEY>` placeholders with the corresponding [API and application keys for your organization][1]. See the [Permission UUID section](#permission-uuids) to see what roles are available for the `<ROLE_NAME>` placeholder.

[1]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Response" %}}

```json
{
	"data": {
        "type": "roles",
        "id": "$ROLE_UUID",
        "attributes": {
            "name": "$ROLE_NAME",
            "created_at": "2000-02-29T16:50:43.607749+00:00",
            "modified_at": "2000-02-29T16:50:43.607749+00:00"
        },
        "relationships": {
            "permissions": {
                "data": [
                    {
                        "type": "permissions",
                        "id": "$PERMISSION_UUID"
                    },
                ]
            }
        }
    }
}

```

{{% /tab %}}
{{< /tabs >}}

### Delete role

Deletes a role.

| Method   | Endpoint path            | Required payload |
|----------|-------------------------|-------------------|
| `DELETE` | `/v2/roles/<ROLE_UUID>` | No Payload        |

{{< tabs >}}
{{% tab "Example" %}}

```sh
curl -X DELETE "https://app.datadoghq.com/api/v2/roles/<ROLE_UUID>" \
         -H "Content-Type: application/json" \
         -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
         -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>"
```

Replace the `<YOUR_DATADOG_API_KEY>` and `<YOUR_DATADOG_APPLICATION_KEY>` placeholders with the corresponding [API and application keys for your organization][1].  See the [Permission UUID section](#permission-uuids) to see what role UUIDs are available for the `<ROLE_UUID>` placeholder.

[1]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Response" %}}

```sh
HTTP/2 204
```

{{% /tab %}}
{{< /tabs >}}


### Get permissions

Returns a list of all permissions, including name, description, and UUID.

| Method | Endpoint path      | Required payload |
|--------|-------------------|------------------|
| `GET`  | `/v2/permissions` | No Payload       |

{{< tabs >}}
{{% tab "Example" %}}

```sh
curl -X GET "https://app.datadoghq.com/api/v2/permissions" \
             -H "Content-Type: application/json" \
             -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
             -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>"
```

Replace the `<YOUR_DATADOG_API_KEY>` and `<YOUR_DATADOG_APPLICATION_KEY>` placeholders with the corresponding [API and application keys for your organization][1].

[1]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Response" %}}

```json
{
	"data": [
        {
            "type": "permissions",
            "id": "$PERMISSION_UUID",
            "attributes": {
                "name": "logs_metrics_write",
                "display_name": "Logs metrics write",
                "description": "Update a custom metric",
                "created": "2000-02-29T14:26:26.983187+00:00",
                "group_name": "Logs",
                "display_type": "other",
                "restricted": false
            }
        }
    ]
}
```

{{% /tab %}}
{{< /tabs >}}

### Get permissions for a role

Returns a list of all permissions for a single role.

| Method | Endpoint path                        | Required payload |
|--------|--------------------------------------|------------------|
| `GET`  | `/v2/roles/<ROLE_UUID>/permissions`  | No Payload       |

{{< tabs >}}
{{% tab "Example" %}}

```sh
curl -X GET "https://app.datadoghq.com/api/v2/roles/<ROLE_UUID>/permissions" \
             -H "Content-Type: application/json" \
             -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
             -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>"
```

Replace the `<YOUR_DATADOG_API_KEY>` and `<YOUR_DATADOG_APPLICATION_KEY>` placeholders with the corresponding [API and application keys for your organization][1]. See the [Permission UUID section](#permission-uuids) to see what role UUIDs are available for the `<ROLE_UUID>` placeholder.

[1]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Response" %}}

```json
{
	"data": [
        {
            "type": "permissions",
            "id": "$PERMISSION_UUID",
            "attributes": {
                "name": "logs_metrics_write",
                "display_name": "Logs metrics write",
                "description": "Update a custom metric",
                "created": "2000-02-29T14:26:26.983187+00:00",
                "group_name": "Logs",
                "display_type": "other",
                "restricted": false
            }
        }
    ]
}
```

{{% /tab %}}
{{< /tabs >}}

### Grant permission to a role

Adds a permission to a role.

| Method | Endpoint path                        | Required payload                                                  |
|--------|--------------------------------------|-------------------------------------------------------------------|
| `POST` | `/v2/roles/<ROLE_UUID>/permissions`  | **data["type"]="permissions"**<br>**data["id"]=$PERMISSION_UUID** |

{{< tabs >}}
{{% tab "Example" %}}

```sh
curl -X POST \
        https://app.datadoghq.com/api/v2/roles/<ROLE_UUID>/permissions \
        -H "Content-Type: application/json" \
        -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
        -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
        -d '{
                "data":
                {
                    "type": "permissions",
                    "id": <PERMISSION_UUID>
                }
            }'
```

Replace the `<YOUR_DATADOG_API_KEY>` and `<YOUR_DATADOG_APPLICATION_KEY>` placeholders with the corresponding [API and application keys for your organization][1]. See the [Permission UUID section](#permission-uuids) to see what IDs are available for the `<PERMISSION_UUID>` and `<ROLE_UUID>` placeholders.

[1]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Response" %}}

```json
{
	"data": [
        {
            "type": "permissions",
            "id": "$PERMISSION_UUID",
            "attributes": {
                "name": "logs_metrics_write",
                "display_name": "Logs metrics write",
                "description": "Update a custom metric",
                "created": "2000-02-29T14:26:26.983187+00:00",
                "group_name": "Logs",
                "display_type": "other",
                "restricted": false
            }
        }
    ]
}
```

{{% /tab %}}
{{< /tabs >}}

### Revoke permissions from a role

Removes a permission from a role.

| Method   | Endpoint path                        | Required payload                                                  |
|----------|--------------------------------------|-------------------------------------------------------------------|
| `DELETE` | `/v2/roles/<ROLE_UUID>/permissions`  | **data["type"]="permissions"**<br>**data["id"]=$PERMISSION_UUID** |

{{< tabs >}}
{{% tab "Example" %}}

```sh
curl -X DELETE \
        "https://app.datadoghq.com/api/v2/roles/<ROLE_UUID>/permissions" \
         -H "Content-Type: application/json" \
         -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
         -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
         -d '{
             "data":
             {
                 "type": "permissions",
                 "id": <PERMISSION_UUID>
             }
         }'
```

Replace the `<YOUR_DATADOG_API_KEY>` and `<YOUR_DATADOG_APPLICATION_KEY>` placeholders with the corresponding [API and application keys for your organization][1]. See the [Permission UUID section](#permission-uuids) to see what IDs are available for the `<PERMISSION_UUID>` and `<ROLE_UUID>` placeholders.

[1]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Response" %}}

```json
{
	"data": [
        {
            "type": "permissions",
            "id": "$DIFFERENT_PERMISSION_UUID",
            "attributes": {
                "name": "logs_metrics_write",
                "display_name": "Logs metrics write",
                "description": "Update a custom metric",
                "created": "2000-02-29T14:26:26.983187+00:00",
                "group_name": "Logs",
                "display_type": "other",
                "restricted": false
            }
        }
    ]
}
```

{{% /tab %}}
{{< /tabs >}}

### Add user to role

Adds a user to a role.

| Method | Endpoint path                  | Required payload                                        |
|--------|--------------------------------|---------------------------------------------------------|
| `POST` | `/v2/roles/<ROLE_UUID>/users`  | **data["type"]="users"**<br>**data["id"]=$USER_UUID** |

{{< tabs >}}
{{% tab "Example" %}}

```sh
curl -X POST \
         "https://app.datadoghq.com/api/v2/roles/<ROLE_UUID>/users" \
         -H "Content-Type: application/json" \
         -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
         -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
         -d '{
             "data": {
                 "type": "users",
                 "id": <USER_UUID>
             }
         }'
```

Replace the `<YOUR_DATADOG_API_KEY>` and `<YOUR_DATADOG_APPLICATION_KEY>` placeholders with the corresponding [API and application keys for your organization][1]. See the [Permission UUID section](#permission-uuids) to see what roles UUIDs are available for the `<ROLE_UUID>` placeholder.

[1]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Response" %}}

```json
{
    "meta": {
        "page": {
            "total_count": 1
        }
    },
	"data": [
        {
            "type": "users",
            "id": "$USER_UUID",
            "attributes": {
                "name": "Example user",
                "handle": "user@example.org",
                "created_at": "2000-02-29T14:26:26.983187+00:00",
                "email": "user@example.org",
                "icon": "https://secure.gravatar.com/avatar/abc123abc123",
                "title": null,
                "verified": true,
                "disabled": false,
                "allowed_login_methods": [],
                "status": "Active"
            },
            "relationships": {
                "roles": {
                    "data": [
                        {
                            "type": "roles",
                            "id": "$ROLE_UUID"
                        }
                    ]
                },
                "org": {
                    "data": {
                        "type": "orgs",
                        "id": "$ORG_UUID"
                    }
                }
            }
        }
    ]
}
```

{{% /tab %}}
{{< /tabs >}}

### Remove user from role

Removes a user from a role.

| Method   | Endpoint path                  | Required payload                                        |
|----------|--------------------------------|---------------------------------------------------------|
| `DELETE` | `/v2/roles/<ROLE_UUID>/users`  | **data["type"]="users"**<br>**data["id"]=$USER_UUID** |

{{< tabs >}}
{{% tab "Example" %}}

```sh
curl -X DELETE \
         "https://app.datadoghq.com/api/v2/roles/<ROLE_UUID>/users" \
         -H "Content-Type: application/json" \
         -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
         -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
         -d '{
             "data": {
                 "type": "users",
                 "id": <USER_UUID>
             }
         }'
```

Replace the `<YOUR_DATADOG_API_KEY>` and `<YOUR_DATADOG_APPLICATION_KEY>` placeholders with the corresponding [API and application keys for your organization][1].  See the [Permission UUID section](#permission-uuids) to see what role UUIDs are available for the `<ROLE_UUID>` placeholder.

[1]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Response" %}}

```json
{
    "meta": {
        "page": {
            "total_count": 1
        }
    },
	"data": [
        {
            "type": "users",
            "id": "$USER_UUID",
            "attributes": {
                "name": "Example user",
                "handle": "user@example.org",
                "created_at": "2000-02-29T14:26:26.983187+00:00",
                "email": "user@example.org",
                "icon": "https://secure.gravatar.com/avatar/abc123abc123",
                "title": null,
                "verified": true,
                "disabled": false,
                "allowed_login_methods": [],
                "status": "Active"
            },
            "relationships": {
                "roles": {
                    "data": [
                        {
                            "type": "roles",
                            "id": "$ROLE_UUID"
                        }
                    ]
                },
                "org": {
                    "data": {
                        "type": "orgs",
                        "id": "$ORG_UUID"
                    }
                }
            }
        }
    ]
}
```

{{% /tab %}}
{{< /tabs >}}

### Get users of role

Get all users of a role

| Method   | Endpoint path                  | Required payload |
|----------|--------------------------------|------------------|
| `GET`    | `/v2/roles/<ROLE_UUID>/users`  | No Payload       |

##### ARGUMENTS

* **`page[size]`** [*optional*, *default*=**0**]:
Page number of users to return for a given page.
* **`page[count]`** [*optional*, *default*=**10**]:
Number of users to return for a given page.
* **`sort`** [*optional*, *default*=**name**]:
Sort users depending on the given field. Sort order is **ascending** by default. Sort order is **descending** if the field is prefixed by a negative sign (Eg: *sort=-name*).
  * Options: **name**, **email**, **status**
* **`filter`**[*optional*, *default*=**None**]:
Filter all users by the given string.

{{< tabs >}}
{{% tab "Example" %}}

```sh
curl -X GET "https://app.datadoghq.com/api/v2/roles/<ROLE_UUID>/users" \
     -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
     -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>"
```

Replace the `<YOUR_DATADOG_API_KEY>` and `<YOUR_DATADOG_APPLICATION_KEY>` placeholders with the corresponding [API and application keys for your organization][1].  See the [Permission UUID section](#permission-uuids) to see what role UUIDs are available for the `<ROLE_UUID>` placeholder.

[1]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Response" %}}

```json
{
    "included": [
        {
            "type": "roles",
            "id": "$ROLE_UUID",
            "attributes": {
                "name": "$ROLE_NAME",
                "created_at": "2000-02-29T16:50:43.607749+00:00",
                "modified_at": "2000-02-29T16:50:43.607749+00:00"
            },
            "relationships": {
                "permissions": {
                    "data": [
                        {
                            "type": "permissions",
                            "id": "$PERMISSION_UUID"
                        },
                        {
                            "type": "permissions",
                            "id": "$PERMISSION_UUID"
                        }
                    ]
                }
            }
        }
    ],
    "meta": {
        "page": {
            "total_filtered_count": 1,
            "total_count": 1
        }
    },
	"data": [
        {
            "type": "users",
            "id": "$USER_UUID",
            "attributes": {
                "name": "Example user",
                "handle": "user@example.org",
                "created_at": "2000-02-29T14:26:26.983187+00:00",
                "email": "user@example.org",
                "icon": "https://secure.gravatar.com/avatar/abc123abc123",
                "title": null,
                "verified": true,
                "disabled": false,
                "allowed_login_methods": [],
                "status": "Active"
            },
            "relationships": {
                "roles": {
                    "data": [
                        {
                            "type": "roles",
                            "id": "$ROLE_UUID"
                        }
                    ]
                },
                "org": {
                    "data": {
                        "type": "orgs",
                        "id": "$ORG_UUID"
                    }
                }
            }
        }
    ]
}
```

{{% /tab %}}
{{< /tabs >}}

## Permission UUIDs

In order to grant or remove a global permission to/from a role, use the UUID for both the role and the permission.

The UUID of the roles can be found from the `GET roles` API call.

The UUIDs for the permissions are as follows:

{{< tabs >}}
{{% tab "Datadog US site" %}}
| name                         | UUID                                 | description                                    |
|------------------------------|--------------------------------------|------------------------------------------------|
| admin                        | 984a2bd4-d3b4-11e8-a1ff-a7f660d43029 | Read and write permission to all of datadog    |
| standard                     | 984d2f00-d3b4-11e8-a200-bb47109e9987 | Read and write permission to most of datadog   |
| logs_read_index_data         | 5e605652-dd12-11e8-9e53-375565b8970e | Read a subset of all log indexes               |
| logs_modify_indexes          | 62cc036c-dd12-11e8-9e54-db9995643092 | Update the definition of log indexes           |
| logs_live_tail               | 6f66600e-dd12-11e8-9e55-7f30fbb45e73 | Access the live tail feature                   |
| logs_write_exclusion_filters | 7d7c98ac-dd12-11e8-9e56-93700598622d | Update a subset of the exclusion filters       |
| logs_write_pipelines         | 811ac4ca-dd12-11e8-9e57-676a7f0beef9 | Update a subset of the log pipelines           |
| logs_write_processors        | 84aa3ae4-dd12-11e8-9e58-a373a514ccd0 | Update the log processors in an index          |
| logs_write_archives          | 87b00304-dd12-11e8-9e59-cbeb5f71f72f | Update the external archives configuration     |
| logs_public_config_api       | 1a92ede2-6cb2-11e9-99c6-2b3a4a0cdf0a | Access the Logs Public Config API (r/w)        |
| logs_generate_metrics        | 979df720-aed7-11e9-99c6-a7eb8373165a | Access the Generate Metrics feature            |
| dashboards_read              | d90f6830-d3d8-11e9-a77a-b3404e5e9ee2 | Ability to view dashboards                     |
| dashboards_write             | d90f6831-d3d8-11e9-a77a-4fd230ddbc6a | Ability to create and change dashboards        |
| dashboards_public_share      | d90f6832-d3d8-11e9-a77a-bf8a2607f864 | Ability to share dashboards externally         |
| monitors_read                | 4441648c-d8b1-11e9-a77a-1b899a04b304 | Ability to view monitors                       |
| monitors_write               | 48ef71ea-d8b1-11e9-a77a-93f408470ad0 | Ability to change, mute, and delete  monitors  |
| monitors_downtime            | 4d87d5f8-d8b1-11e9-a77a-eb9c8350d04f | Ability to set downtimes for your monitors     |

{{% /tab %}}
{{% tab "Datadog EU site" %}}
| name                         | UUID                                 | description                                    |
|------------------------------|--------------------------------------|------------------------------------------------|
| admin                        | f1624684-d87d-11e8-acac-efb4dbffab1c | Read and write permission to all of datadog    |
| standard                     | f1666372-d87d-11e8-acac-6be484ba794a | Read and write permission to most of datadog   |
| logs_read_index_data         | 4fbb1652-dd15-11e8-9308-77be61fbb2c7 | Read a subset of all log indexes               |
| logs_modify_indexes          | 4fbd1e66-dd15-11e8-9308-53cb90e4ef1c | Update the definition of log indexes           |
| logs_live_tail               | 4fbeec96-dd15-11e8-9308-d3aac44f93e5 | Access the live tail feature                   |
| logs_write_exclusion_filters | 4fc2807c-dd15-11e8-9308-d3bfffb7f039 | Update a subset of the exclusion filters       |
| logs_write_pipelines         | 4fc43656-dd15-11e8-9308-f3e2bb5e31b4 | Update a subset of the log pipelines           |
| logs_write_processors        | 505f4538-dd15-11e8-9308-47a4732f715f | Update the log processors in an index          |
| logs_write_archives          | 505fd138-dd15-11e8-9308-afd2db62791e | Update the external archives configuration     |
| logs_public_config_api       | bd837a80-6cb2-11e9-8fc4-339b4b012214 | Access the Logs Public Config API (r/w)        |
| logs_generate_metrics        | 06f715e2-aed9-11e9-aac6-eb5723c0dffc | Access the Generate Metrics feature            |
| dashboards_read              | 2147a4f0-d3d9-11e9-a614-83d5d3c791ee | Ability to view dashboards                     |
| dashboards_write             | 2149e512-d3d9-11e9-a614-bb8f0dcf0205 | Ability to create and change dashboards        |
| dashboards_public_share      | 214c10b2-d3d9-11e9-a614-3759c7ad528f | Ability to share dashboards externally         |
| monitors_read                | c898551e-d8b2-11e9-a336-e3a79c23bd8d | Ability to view monitors                       |
| monitors_write               | cdc3e3d2-d8b2-11e9-943b-e70db6c573b8 | Ability to change, mute, and delete  monitors  |
| monitors_downtime            | d3159858-d8b2-11e9-a336-e363d6ef331b | Ability to set downtimes for your monitors     |

{{% /tab %}}
{{< /tabs >}}

## Granting Permissions Within Limited Scopes

Certain permissions can be granted within a limited scope. This can be done manually from the Datadog application in [the Pipelines Page][1], or programmatically via the Role API if the correct "scope" is added in the payload. The following permissions can be granted within a limited scope:

| Permission Name                | Scope Name | Format                                   | Description                                                     |
|--------------------------------|------------|------------------------------------------|-----------------------------------------------------------------|
| `logs_read_index_data`         | indexes    | list of index names (string)             | Grant read on only certain log indexes                          |
| `logs_write_exclusion_filters` | indexes    | list of index names (string)             | Grant update on the exclusion filters for only certain indexes  |
| `logs_write_processors`        | pipelines  | list of processing pipeline ids (string) | Grant update on only the processors of certain pipelines        |

For example, to grant read access only on two indexes named `main` and `support` to a role named `support`, your API call  looks like this:

```sh
curl -X POST \
        https://app.datadoghq.com/api/v2/roles/<ROLE_UUID>/permissions \
        -H "Content-Type: application/json" \
        -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
        -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
        -d '{
                "data": {
                    "type": "permissions",
                    "id": <PERMISSION_UUID>,
                    "scope": {
                        "indexes": [
                            "main",
                            "support"
                        ]
                    }
                }
            }'
```

To grant write access to only two processing pipelines whose IDs are `abcd-1234` and `bcde-2345` respectively, your API call  looks like this:

```sh
curl -X POST \
        https://app.datadoghq.com/api/v2/roles/<ROLE_UUID>/permissions \
        -H "Content-Type: application/json" \
        -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
        -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
        -d '{
                "data": {
                    "type": "permissions",
                    "id": <PERMISSION_UUID>,
                    "scope": {
                        "pipelines": [
                            "abcd-1234",
                            "bcde-2345"
                        ]
                    }
                }
            }'
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/pipelines
