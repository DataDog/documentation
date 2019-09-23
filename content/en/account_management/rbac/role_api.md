
---
title: Roles API
kind: documentation
private: true
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

Permissions related to specific account assets can be granted to roles in the Datadog application without using this API. For example, granting read access on a specific log index to a role can be done in the Datadog application from [the Pipelines Page][1]. 


## Headers
All requests are required to supply the following in headers
```json
{
    DD-API-KEY: ${API_KEY}
    DD-APPLICATION-KEY: ${APP_KEY}
}
```


## Requests

### Get All Roles

Description: Returns all roles, including their names and uuids.  
Method: GET  
Endpoint: `api/v2/roles`  
Required Payload: No Payload

##### ARGUMENTS

* **`page[size]`** [*optional*, *default*=**0**]:
Page Number of roles to return for a given page
* **`page[count]`** [*optional*, *default*=**10**]:
Number of roles to return for a given page
* **`sort`** [*optional*, *default*=**name**]:
Sort roles by the given field. Sort order is **ascending** by default. Sort order is **descending** if the field is prefixed by a negative sign (Eg: *sort=-name*)
    Options: **name**, **modified_at**
* **`filter`**[*optional*, *default*=**None**]:
    Filter all roles by the given string.

##### Expected Response code: 

```sh
HTTP/2 200
```

##### Example:


```sh
curl -X GET "https://app.datadoghq.com/api/v2/roles" -H "DD-API-KEY: ${API_KEY}" -H "DD-APPLICATION-KEY: ${APP_KEY}"


# Response:
# {
#     "meta": {
#         "page": {
#             "total_count": 7
#         }
#     },
#     "data": [
# 	    {
#             "type": "roles",
#             "id": $ROLE_UUID,
#                 "attributes": {
#                 "created_at": "2000-02-29T16:50:43.607749+00:00",
#                 "user_count": 2122,
#                 "modified_at": "2000-02-29T16:50:43.607749+00:00",
#                 "uuid": $ROLE_UUID,
#                 "name": $ROLE_NAME
#             },
#             "relationships": {
#                 "permissions": {
#                     "data": [
#                         {
#                             "type": "permissions",
#                             "id": $PERMISSION_UUID
#                         },
#                         {
#                             "type": "permissions",
#                             "id": $PERMISSION_UUID
#                         }
#                     ]
#                 }
#             }
#         }
#     ]
# }
```

### Get One Role

Description: Returns a specific role, including its name and uuid.  
Method: GET  
Endpoint: `api/v2/roles/$ROLE_UUID`  
Required Payload: No Payload  

##### Response code: 
```sh
HTTP/2 200
```

##### Example:

```sh
curl -X GET "https://app.datadoghq.com/api/v2/roles/$ROLE_UUID" -H "DD-API-KEY: ${API_KEY}" -H "DD-APPLICATION-KEY: ${APP_KEY}"

# Response:
# {
# 	"data": {
#             "type": "roles",
#             "id": $ROLE_UUID,
#                 "attributes": {
#                 "created_at": "2000-02-29T16:50:43.607749+00:00",
#                 "user_count": 2122,
#                 "modified_at": "2000-02-29T16:50:43.607749+00:00",
#                 "uuid": $ROLE_UUID,
#                 "name": $ROLE_NAME
#             },
#             "relationships": {
#                 "permissions": {
#                     "data": [
#                         {
#                             "type": "permissions",
#                             "id": $PERMISSION_UUID
#                         },
#                         {
#                             "type": "permissions",
#                             "id": $PERMISSION_UUID
#                         }
#                     ]
#                 }
#             }
#         }
# }
```

### Create Role

Description: Creates a new role. Returns role name and uuid.  
Method: POST  
Endpoint: `api/v2/roles`  
Required Payload:

* **type="roles"**
* **attributes["name"]**  

##### Response code
```sh
HTTP/2 200
```

##### Example:

```sh
curl -X POST \
        "https://app.datadoghq.com/api/v2/roles" \
        -H "Content-Type: application/json" \
        -H "DD-API-KEY: ${API_KEY}" \
        -H "DD-APPLICATION-KEY: ${APP_KEY}" \
        -d '{
            "data": {
                "type": "roles",
                    "attributes": {
                        "name": $ROLE_NAME
                    }
            }
        }'


# Response:
# {
# 	"data": {
#             "type": "roles",
#             "id": $ROLE_UUID,
#                 "attributes": {
#                 "created_at": "2000-02-29T16:50:43.607749+00:00",
#                 "user_count": 0,
#                 "modified_at": "2000-02-29T16:50:43.607749+00:00",
#                 "uuid": $ROLE_UUID,
#                 "name": $ROLE_NAME
#             },
#             "relationships": {
#                 "permissions": {
#                     "data": []
#                 }
#             }
#         }
# }

```

### Update Role

Description: Updates an existing role's name. Returns role name and uuid.  
Method: PATCH 
Endpoint: `api/v2/roles/$ROLE_UUID`  
Required Payload: 

* **type="roles"**
* **attributes["name"]**    

##### Response code
```sh
HTTP/2 200
```

##### Example:

```sh
curl -X PATCH \
         "https://app.datadoghq.com/api/v2/roles" \
         -H "Content-Type: application/json" \
         -H "DD-API-KEY: ${API_KEY}" \
         -H "DD-APPLICATION-KEY: ${APP_KEY}" \
         -d '{
             "data": {
                 "type": "roles",
                 "attributes": {
                     "name": $ROLE_NAME
                }
             }
         }'


# Response:
# {
# 	"data": {
#             "type": "roles",
#             "id": $ROLE_UUID,
#                 "attributes": {
#                 "created_at": "2000-02-29T16:50:43.607749+00:00",
#                 "user_count": 0,
#                 "modified_at": "2000-02-29T16:50:43.607749+00:00",
#                 "uuid": $ROLE_UUID,
#                 "name": $ROLE_NAME
#             },
#             "relationships": {
#                 "permissions": {
#                     "data": []
#                 }
#             }
#         }
# }

```

### Delete Role

Description: Deletes a role.  
Method: DELETE  
Endpoint: `api/v2/roles/$ROLE_UUID`  
Required Payload: No Payload  
Example:


##### Response code
```sh
HTTP/2 204
```

##### Example
```sh
curl -X DELETE "https://app.datadoghq.com/api/v2/roles/${ROLE_UUID}" \
         -H "Content-Type: application/json" \
         -H "DD-API-KEY: ${API_KEY}" \
         -H "DD-APPLICATION-KEY: ${APP_KEY}"
```

### Get Permissions

Description: Returns a list of all permissions, including name, description, uuid.  
Method: GET  
Endpoint: `api/v2/permissions`  
Required Payload: No Payload  
Example:

```sh
curl -X GET "https://app.datadoghq.com/api/v2/permissions" \
             -H "Content-Type: application/json" \
             -H "DD-API-KEY: ${API_KEY}" \
             -H "DD-APPLICATION-KEY: ${APP_KEY}"

# Response:
# {
# 	"data": [{
#         "type": "permissions",
#         "id": $PERMISSION_UUID,
#         "attributes": {
#             "display_name": "Logs metrics write",
#             "description": "Update a custom metric",
#             "name": "logs_metrics_write",
#             "created": "2000-02-29T14:26:26.983187+00:00",
#             "group_name": "Logs",
#             "display_type": "other",
#             "uuid": $PERMISSION_UUID
#         }
#     }]
# }
```

### Get Permissions for a role

Description: Returns a list of all permissions for a single role
Method: GET  
Endpoint: `api/v2/roles/$ROLE_UUID/permissions`  
Required Payload: No Payload  
Example:

```sh
curl -X GET "https://app.datadoghq.com/api/v2/roles/$ROLE_UUID/permissions" \
             -H "Content-Type: application/json" \
             -H "DD-API-KEY: ${API_KEY}" \
             -H "DD-APPLICATION-KEY: ${APP_KEY}"

# Response:
# {
# 	"data": [{
#         "type": "permissions",
#         "id": $PERMISSION_UUID,
#         "attributes": {
#             "display_name": "Logs metrics write",
#             "description": "Update a custom metric",
#             "name": "logs_metrics_write",
#             "created": "2000-02-29T14:26:26.983187+00:00",
#             "group_name": "Logs",
#             "display_type": "other",
#             "uuid": $PERMISSION_UUID
#         }
#     }]
# }
```


### Grant Permission to Role

Description: Adds a permission to a role.  
Method: POST  
Endpoint: `api/v2/roles/$ROLE_UUID/permissions`  
Required Payload: 

* **data["type"]="permissions"**
* **data["id"]=$PERMISSION_UUID**

##### Response code
```sh
HTTP/2 200
```

##### Example:

```sh
curl -X POST \
        https://app.datadoghq.com/api/v2/roles/$ROLE_UUID/permissions \
        -H "Content-Type: application/json" \
        -H "DD-API-KEY: ${API_KEY}" \
        -H "DD-APPLICATION-KEY: ${APP_KEY}" \
        -d '{ 
                "data":
                {
                    "type": "permissions",
                    "id": $PERMISSION_UUID
                }
            }'

# Response:
# {
# 	"data": [{
#         "type": "permissions",
#         "id": $PERMISSION_UUID,
#         "attributes": {
#             "display_name": "Logs metrics write",
#             "description": "Update a custom metric",
#             "name": "logs_metrics_write",
#             "created": "2000-02-29T14:26:26.983187+00:00",
#             "group_name": "Logs",
#             "display_type": "other",
#             "uuid": $PERMISSION_UUID
#         }
#     }]
# }
```

### Revoke Permission from Role

Description: Removes a permission from a role.  
Method: DELETE  
Endpoint: `api/v2/roles/$ROLE_UUID/permissions`  
Required Payload:

* **data["type"]="permissions"**
* **data["id"]=$PERMISSION_UUID**

##### Response code
```sh
HTTP/2 200
```

##### Example:

```sh
curl -X DELETE \
         https://app.datadoghq.com/api/v2/roles/$ROLE_UUID/permissions \
         -H "Content-Type: application/json" \
         -H "DD-API-KEY: ${API_KEY}" \
         -H "DD-APPLICATION-KEY: ${APP_KEY}" \
         -d '{ 
             "data":
             {
                 "type": "permissions",
                 "id": $PERMISSION_UUID
             }
         }'

# Response:
# {
# 	"data": [{
#         "type": "permissions",
#         "id": $DIFFERENT_PERMISSION_UUID,
#         "attributes": {
#             "display_name": "Logs metrics read",
#             "description": "Update a read metric",
#             "name": "logs_metrics_read",
#             "created": "2000-02-29T14:26:26.983187+00:00",
#             "group_name": "Logs",
#             "display_type": "other",
#             "uuid": $DIFFERENT_PERMISSION_UUID
#         }
#     }]
# }

```

### Add User to Role

Description: Adds a user to a role.  
Method: POST  
Endpoint: `api/v2/roles/$ROLE_UUID/users`  
Required Payload:

* **data["type"]="users"**
* **data["id"]=$USER_HANDLE**

##### Response code
```sh
HTTP/2 200
```

##### Example:

```sh
curl -X POST \
         https://app.datadoghq.com/api/v2/roles/$ROLE_UUID/users \
         -H "Content-Type: application/json" \
         -H "DD-API-KEY: ${API_KEY}" \
         -H "DD-APPLICATION-KEY: ${APP_KEY}" \
         -d '{
             "data": {
                 "type": "users",
                 "id": "user@example.org"
             }
         }'

# Response:
# {
# 	"data": [{
#         "type": "users",
#         "id": "user@example.org",
#         "attributes": {
#             "handle": "user@example.org",
#             "name": "Example user",
#             "title": null,
#             "created_at": "2000-02-29T14:26:26.983187+00:00",
#             "org_id": 99,
#             "disabled": false,
#             "verified": true,
#             "email": "user@example.org",
#     }]
# }

```

### Remove User from Role

Description: Removes a user from a role.  
Method: DELETE  
Endpoint: `api/v2/roles/$ROLE_UUID/users`  
Required Payload: 

* **data["type"]="users"** 
* **data["id"]=$USER_HANDLE**

##### Response code
```sh
HTTP/2 200
```


##### Example:

```sh
curl -X DELETE \
         https://app.datadoghq.com/api/v2/roles/$ROLE_UUID/users \
         -H "Content-Type: application/json" \
         -H "DD-API-KEY: ${API_KEY}" \
         -H "DD-APPLICATION-KEY: ${APP_KEY}" \
         -d '{
             "data": {
                 "type": "users",
                 "id": "user@example.org"
             }
         }'

# Response:
# {
# 	"data": [{
#         "type": "users",
#         "id": "user2@example.org",
#         "attributes": {
#             "handle": "user2@example.org",
#             "name": "Example user 2",
#             "title": null,
#             "created_at": "2000-02-29T14:26:26.983187+00:00",
#             "org_id": 99,
#             "disabled": false,
#             "verified": true,
#             "email": "user2@example.org",
#     }]
# }

```

## Permission UUIDs

In order to grant or remove a global permission to/from a role, today you must know and use the UUID for (A) the role and (B) the permission. 

The UUID of the roles can be found from the `GET roles` api call. 

The UUIDs for the permissions are as follows:

{{< tabs >}}
{{% tab "Datadog US site" %}}
|             name             |                 uuid                 |                 description                  |
|------------------------------|--------------------------------------|----------------------------------------------|
| admin                        | 984a2bd4-d3b4-11e8-a1ff-a7f660d43029 | Read and write permission to all of datadog  |
| standard                     | 984d2f00-d3b4-11e8-a200-bb47109e9987 | Read and write permission to most of datadog |
| read_only                    | 984fe6fa-d3b4-11e8-a201-47a7999cc331 | Read permission to most of datadog           |
| logs_read_index_data         | 5e605652-dd12-11e8-9e53-375565b8970e | Read a subset of all log indexes             |
| logs_modify_indexes          | 62cc036c-dd12-11e8-9e54-db9995643092 | Update the definition of log indexes         |
| logs_live_tail               | 6f66600e-dd12-11e8-9e55-7f30fbb45e73 | Access the live tail feature                 |
| logs_generate_metrics        | 979df720-aed7-11e9-99c6-a7eb8373165a | Access the Generate Metrics feature          |
| logs_write_exclusion_filters | 7d7c98ac-dd12-11e8-9e56-93700598622d | Update a subset of the exclusion filters     |
| logs_write_pipelines         | 811ac4ca-dd12-11e8-9e57-676a7f0beef9 | Update a subset of the log pipelines         |
| logs_write_processors        | 84aa3ae4-dd12-11e8-9e58-a373a514ccd0 | Update the log processors in an index        |
| logs_write_archives          | 87b00304-dd12-11e8-9e59-cbeb5f71f72f | Update the external archives configuration   |
| logs_public_config_api       | 1a92ede2-6cb2-11e9-99c6-2b3a4a0cdf0a | Access the Logs Public Config API (r/w)      |

{{% /tab %}}
{{% tab "Datadog EU site" %}}
|             name             |                 uuid                 |                 description                  |
|------------------------------|--------------------------------------|----------------------------------------------|
| admin                        | f1624684-d87d-11e8-acac-efb4dbffab1c | Read and write permission to all of datadog  |
| standard                     | f1666372-d87d-11e8-acac-6be484ba794a | Read and write permission to most of datadog |
| read_only                    | f1682b6c-d87d-11e8-acac-9f3040c65f48 | Read permission to most of datadog           |
| logs_read_index_data         | 4fbb1652-dd15-11e8-9308-77be61fbb2c7 | Read a subset of all log indexes             |
| logs_modify_indexes          | 4fbd1e66-dd15-11e8-9308-53cb90e4ef1c | Update the definition of log indexes         |
| logs_live_tail               | 4fbeec96-dd15-11e8-9308-d3aac44f93e5 | Access the live tail feature                 |
| logs_generate_metrics        | 06f715e2-aed9-11e9-aac6-eb5723c0dffc | Access the Generate Metrics feature          |
| logs_write_exclusion_filters | 4fc2807c-dd15-11e8-9308-d3bfffb7f039 | Update a subset of the exclusion filters     |
| logs_write_pipelines         | 4fc43656-dd15-11e8-9308-f3e2bb5e31b4 | Update a subset of the log pipelines         |
| logs_write_processors        | 505f4538-dd15-11e8-9308-47a4732f715f | Update the log processors in an index        |
| logs_write_archives          | 505fd138-dd15-11e8-9308-afd2db62791e | Update the external archives configuration   |
| logs_public_config_api       | bd837a80-6cb2-11e9-8fc4-339b4b012214 | Access the Logs Public Config API (r/w)      |

{{% /tab %}}
{{< /tabs >}}

## Granting Permissions within limited scopes

Certain permissions can be granted within a limited scope. This can be done manually from the Datadog application in [the Pipelines Page][1], or programmatically via the Role API if the correct "scope" is added in the payload. The following permissions can be granted within a limited scope:

|       Permission Name        | Scope Name |                  Format                  |                          Description                           |
|------------------------------|------------|------------------------------------------|----------------------------------------------------------------|
| `logs_read_index_data`         | indexes    | list of index names (string)             | Grant read on only certain log indexes.                         |
| `logs_write_exclusion_filters` | indexes    | list of index names (string)             | Grant update on the exclusion filters for only certain indexes. |
| `logs_write_processors`        | pipelines  | list of processing pipeline ids (string) | Grant update on only the processors of certain pipelines.       |

For example, to grant read access only on two indexes named `main` and `support` to a role named `support`, your API call would look like this:
```sh
curl -X POST -H "Content-type: application/json" -d '{"scope": {"indexes": ["main", "support"]}}' "https://app.datadoghq.com/api/v1/roles/${ROLEUUID}/permissions/${PERMISSION}?api_key=${API_KEY}&application_key=${APP_KEY}"
```

To grant write access to only two processing pipelines whose IDs are `abcd-1234` and `bcde-2345` respectively, your API call would look like this:
```sh
curl -X POST -H "Content-type: application/json" -d '{"scope": {"pipelines": ["abcd-1234", "bcde-2345"]}}' "https://app.datadoghq.com/api/v1/roles/${ROLEUUID}/permissions/${PERMISSION}?api_key=${API_KEY}&application_key=${APP_KEY}"
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/pipelines
