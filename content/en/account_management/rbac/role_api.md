---
title: Role API
kind: documentation
beta: true
further_reading:
- link: "account_management/rbac/log_management/"
  tag: "Documentation"
  text: "RBAC for Log Management"
---

<div class="alert alert-warning">
This feature is in private beta. Ask your sales representative or customer success manager to have it enabled.
</div>

The Roles API can be used to create and manage Datadog roles, what global permissions they grant, and which users belong to them.

Permissions related to specific account assets can be granted to roles in the Datadog application without using this API. For example, granting read access on a specific log index to a role can be done in the Datadog application from [the Pipelines Page][1]. 

### Get All Roles

Description: Returns all roles, including their names and uuids.  
Method: GET  
Endpoint: `api/v1/role`  
Required Payload: No Payload  
Example:

```sh
curl -X GET "https://app.datadoghq.com/api/v1/role?api_key=${API_KEY}&application_key=${APP_KEY}"

# Response:
# [{
#   "id": <number>,
#   "name": <string>,
#   "uuid": <string>
#  }, ...]
```

### Get One Role

Description: Returns a specific role, including its name and uuid.  
Method: GET  
Endpoint: `api/v1/role/$ROLE_UUID`  
Required Payload: No Payload  
Example:

```sh
curl -X GET "https://app.datadoghq.com/api/v1/role/${ROLEUUID}?api_key=${API_KEY}&application_key=${APP_KEY}"

# Response:
# {
#  "id": <number>,
#  "name": <string>,
#  "uuid": <string>
# }
```

### Create Role

Description: Creates a new role. Returns role name and uuid.  
Method: POST  
Endpoint: `api/v1/role`  
Required Payload: "name"  
Example:

```sh
curl -X POST -H "Content-type: application/json" -d "{\"name\":\"${ROLENAME}\"}" "https://app.datadoghq.com/api/v1/role?api_key=${API_KEY}&application_key=${APP_KEY}"
```

### Update Role

Description: Updates an existing role's name. Returns role name and uuid.  
Method: PUT  
Endpoint: `api/v1/role/$ROLE_UUID`  
Required Payload: "name"  
Example:

```sh
curl -X PUT -H "Content-type: application/json" -d "{\"name\":\"${ROLENAME}\"}" "https://app.datadoghq.com/api/v1/role/${ROLEUUID}?api_key=${API_KEY}&application_key=${APP_KEY}"
```

### Delete Role

Description: Deletes a role.  
Method: DELETE  
Endpoint: `api/v1/role/$ROLE_UUID`  
Required Payload: No Payload  
Example:

```sh
curl -X DELETE "https://app.datadoghq.com/api/v1/role/${ROLEUUID}?api_key=${API_KEY}&application_key=${APP_KEY}"
```

### Get Permissions

Description: Returns a list of all permissions, including name, description, uuid.  
Method: GET  
Endpoint: `api/v1/permission`  
Required Payload: No Payload  
Example:

```sh
curl -X GET "https://app.datadoghq.com/api/v1/permission?api_key=${API_KEY}&application_key=${APP_KEY}"

# Response:
# [{
#   "created_at": <string>,
#   "description": <string>,
#   "display_name": <string>,
#   "uuid": <string>,
#   "name": <string>
# }, ...]
```

### Grant Permission to Role

Description: Adds a permission to a role.  
Method: POST  
Endpoint: `api/v1/role/$ROLE_UUID/permission/$PERMISSION_UUID`  
Required Payload: Empty (`{}`)  
Example:

```sh
curl -X POST -H "Content-type: application/json" -d "{}" "https://app.datadoghq.com/api/v1/role/${ROLEUUID}/permission/${PERMISSION}?api_key=${API_KEY}&application_key=${APP_KEY}"
```

### Revoke Permission from Role

Description: Removes a permission from a role.  
Method: DELETE  
Endpoint: `api/v1/role/$ROLE_UUID/permission/$PERMISSION_UUID`  
Required Payload: Empty (`{}`)  
Example:

```sh
curl -X DELETE -H "Content-type: application/json" -d "{}" "https://app.datadoghq.com/api/v1/role/${ROLEUUID}/permission/${PERMISSION}?api_key=${API_KEY}&application_key=${APP_KEY}"
```

### Add User to Role

Description: Adds a user to a role.  
Method: POST  
Endpoint: `api/v1/role/$ROLE_UUID/user/$USER_HANDLE`  
Required Payload: Empty (`{}`)  
Example:

```sh
curl -X POST -H "Content-type: application/json" -d "{}" "https://app.datadoghq.com/api/v1/role/${ROLEUUID}/user/${USER}?api_key=${API_KEY}&application_key=${APP_KEY}"
```

### Remove User from Role

Description: Removes a user from a role.  
Method: DELETE  
Endpoint: `api/v1/role/$ROLE_UUID/user/$USER_HANDLE`  
Required Payload: Empty (`{}`)  
Example:

```sh
curl -X DELETE -H "Content-type: application/json" -d "{}" "https://app.datadoghq.com/api/v1/role/${ROLEUUID}/user/${USER}?api_key=${API_KEY}&application_key=${APP_KEY}"
```

## Permission UUIDs

In order to grant or remove a global permission to/from a role, today you must know and use the UUID for (A) the role and (B) the permission. 

The UUID of the roles can be found from the `GET roles` api call. 

The UUIDs for the permissions are as follows:

|             name             |                 uuid                 |                 description                  |
|------------------------------|--------------------------------------|----------------------------------------------|
| admin                        | 984a2bd4-d3b4-11e8-a1ff-a7f660d43029 | Read and write permission to all of datadog  |
| standard                     | 984d2f00-d3b4-11e8-a200-bb47109e9987 | Read and write permission to most of datadog |
| read_only                    | 984fe6fa-d3b4-11e8-a201-47a7999cc331 | Read permission to most of datadog           |
| logs_read_index_data         | 5e605652-dd12-11e8-9e53-375565b8970e | Read a subset of all log indexes             |
| logs_modify_indexes          | 62cc036c-dd12-11e8-9e54-db9995643092 | Update the definition of log indexes         |
| logs_live_tail               | 6f66600e-dd12-11e8-9e55-7f30fbb45e73 | Access the live tail feature                 |
| logs_write_exclusion_filters | 7d7c98ac-dd12-11e8-9e56-93700598622d | Update a subset of the exclusion filters     |
| logs_write_pipelines         | 811ac4ca-dd12-11e8-9e57-676a7f0beef9 | Update a subset of the log pipelines         |
| logs_write_processors        | 84aa3ae4-dd12-11e8-9e58-a373a514ccd0 | Update the log processors in an index        |
| logs_write_archives          | 87b00304-dd12-11e8-9e59-cbeb5f71f72f | Update the external archives configuration   |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/pipelines
