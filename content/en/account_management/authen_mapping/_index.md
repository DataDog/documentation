---
title: Federated Authentication to Role Mapping API
kind: documentation
beta: true
further_reading:
- link: "account_management/rbac/log_management/"
  tag: "Documentation"
  text: "RBAC for Log Management"
---

<div class="alert alert-warning">
The Federated Authentication to Role Mapping API is currently in closed beta. Functionality and performance may not be ideal, and we reserve the right to change the functionality at any time without warning. Ask your customer success manager or <a href="/help">Datadog Support</a> to enable this feature.
</div>

If you are using Federated Authentication mechanisms, this API allows you to automatically map groups of users to roles in Datadog using attributes sent from your Identity Provider.

**Note**: If you are a SAML user, and you have been using the existing beta Federated Mapping mechanism (`roles_v2_saml`), Datadog strongly recommends that you transition to using this API.

## Requests

All the API endpoints below can have two different host endpoints:

* If you are on the Datadog US site: `https://api.datadoghq.com/api/`
* If you are on the Datadog EU site: `https://api.datadoghq.eu/api/`

### Create a new Authentication mapping

Create a new AuthN Mapping from a JSON body. Returns the newly created AuthN Mapping.

| Method | Endpoint path        | Required payload |
|--------|----------------------|------------------|
| `POST` | `/v2/authn_mappings` | JSON             |

##### ARGUMENTS

* **`role_uuid`** [*required*, *default*=none]:
  The `UUID` of the Role to map to. The Roles API can be used to create and manage Datadog roles, what global permissions they grant, and which users belong to them. When you create a Role, it is assigned a UUID. For more information about finding the `role_uuid` for the role you want to map to, see the [Role API documentation][1].
* **`attribute_key`** [*required*, *default*=none]:
 The `attribute_key` is the key portion of a key/value pair that represents an attribute sent from your Identity Provider. You can define these for your own use case. For example, `attribute_key` could be `member-of` and the `attribute_value` could be `Development`.
* **`attribute_value`** [*required*, *default*=none]:
 The `attribute_value` is the value portion of a key/value pair that represents an attribute sent from your Identity Provider. You can define these for your own use case. For example, `attribute_key` could be `member-of` and the `attribute_value` could be `Development`.

{{< tabs >}}
{{% tab "Example" %}}

```sh
curl -X POST \
         "https://api.datadoghq.com/api/v2/authn_mappings" \
         -H "Content-Type: application/json" \
         -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
         -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
         -d '{
             "data": {
                 "type": "authn_mappings",
                 "attributes": {
                      "role_uuid": "123e4567-e89b-12d3-a456-426655445555",
                      "attribute_key": "member-of",
                      "attribute_value": "Development"
                }
             }
         }'
```

Replace the `<YOUR_DATADOG_API_KEY>` and `<YOUR_DATADOG_APPLICATION_KEY>` placeholders with the corresponding [API and application keys for your organization][1].

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Response" %}}

{{< code-block lang="json" filename="response.json" disable_copy="true" >}}
{
  "data": {
    "attributes": {
      "created_at": "2019-11-04 17:41:29.015504",
      "role_uuid": "00000000-0000-0000-0000-000000000000",
      "saml_assertion_attribute_id": 0
    },
    "type": "authn_mappings",
    "id": "123e4567-e89b-12d3-a456-426655440000",
    "relationships": {
      "saml_assertion_attributes": {
        "data": {
          "id": 0,
          "type": "saml_assertion_attributes"
        }
      },
      "roles": {
        "data": {
          "id": "123e4567-e89b-12d3-a456-426655440000",
          "type": "roles"
        }
      }
    }
  },
  "included": [
    {
      "data": {
        "id": "123e4567-e89b-12d3-a456-426655440000",
        "type": "roles",
        "attributes": {
          "created_at": "2019-11-04 17:41:29.015504",
          "modified_at": "2019-11-06 17:41:29.015504",
          "name": "Developer Role"
        },
        "relationships": {
          "data": [
            {
              "id": "123e4567-e89b-12d3-a456-426655441000",
              "type": "permissions"
            }
          ]
        }
      }
    },
    {
      "data": {
        "id": 6,
        "type": "saml_assertion_attributes",
        "attributes": {
          "id": 6,
          "attribute_key": "member-of",
          "attribute_value": "Development"
        }
      }
    }
  ]
}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### Get all AuthN Mappings

Returns a list of AuthN Mappings

| Method | Endpoint path        | Required payload          |
|--------|----------------------|---------------------------|
| `GET`  | `/v2/authn_mappings` | Optional query parameters |

##### ARGUMENTS

* **`sort`** [*optional*, *default*=**+**]:
  Sort attribute and direction—defaults to ascending order, `-` sorts in descending order.
* **`page[number]`** [*optional*, *default*=**0**, *minimum*=**0**]:
  The page of results to return.
* **`page[size]`** [*optional*, *default*=**10**]:
  The number of results to return on each page.
* **`filter`** [*optional*, no default]:
  Filter by tags as strings. For example, `Billing Users`.

{{< tabs >}}
{{% tab "Example" %}}

```sh
curl -X GET "https://api.datadoghq.com/api/v2/authn_mappings" \
     -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
     -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>"
```

Replace the `<YOUR_DATADOG_API_KEY>` and `<YOUR_DATADOG_APPLICATION_KEY>` placeholders with the corresponding [API and application keys for your organization][1].

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Response" %}}

```json
{
  "data": [
    {
      "type": "authn_mapping",
      "id": "123e4567-e89b-12d3-a456-426655440000",
      "relationships": {
        "saml_assertion_attributes": {
          "data": {"id": 0, "type": "saml_assertion_attributes"}
        },
        "roles": {
          "data": {
            "id": "123e4567-e89b-12d3-a456-426655440000",
            "type": "roles"
          }
        }
      },
      "attributes": {
        "created_at": "2019-11-04 17:41:29.015504",
        "role_uuid": "123e4567-e89b-12d3-a456-426655445555",
        "saml_assertion_attribute_id": 0
      }
    }
  ],
  "included": [
    {
      "data": {
        "id": "123e4567-e89b-12d3-a456-426655440000",
        "type": "roles",
        "attributes": {
          "created_at": "2019-11-04 17:41:29.015504",
          "modified_at": "2019-11-06 17:41:29.015504",
          "name": "Developer Role"
        },
        "relationships": {
          "data": [
            {
              "id": "123e4567-e89b-12d3-a456-426655440000",
              "type": "permissions"
            }
          ]
        }
      }
    },
    {
      "data": {
        "id": 6,
        "type": "saml_assertion_attributes",
        "attributes": {
          "id": 6,
          "attribute_key": "member-of",
          "attribute_value": "Developer"
        }
      }
    }
  ],
  "meta": {"page": {"total": 0, "page_number": 0, "page_size": 0}}
}
```

{{% /tab %}}
{{< /tabs >}}

### Get a specific AuthN Mapping

Returns a specific AuthN Mapping by UUID.

| Method | Endpoint path            | Required payload |
|--------|--------------------------|------------------|
| `GET`  | `/authn_mappings/{UUID}` | URL parameter    |

##### ARGUMENTS

* **`{UUID}`** [*required*, no default]:
  Replace `{UUID}` with the UUID of the AuthN Mapping you want to view.

{{< tabs >}}
{{% tab "Example" %}}

```sh
curl -X GET "https://api.datadoghq.com/api/v2/authn_mappings/{UUID}" \
     -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
     -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>"
```

Replace the `<YOUR_DATADOG_API_KEY>` and `<YOUR_DATADOG_APPLICATION_KEY>` placeholders with the corresponding [API and application keys for your organization][1].

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Response" %}}

```json
{
  "data": {
    "attributes": {
      "created_at": "2019-11-04 17:41:29.015504",
      "uuid": "123e4567-e89b-12d3-a456-426655440000",
      "role_uuid": "123e4567-e89b-12d3-a456-426655445555",
      "saml_assertion_attribute_id": 0
    },
    "type": "authn_mappings",
    "id": "123e4567-e89b-12d3-a456-426655440000",
    "relationships": {
      "saml_assertion_attributes": {
        "data": {"id": 0, "type": "saml_assertion_attributes"}
      },
      "roles": {
        "data": {"id": "123e4567-e89b-12d3-a456-426655440000", "type": "roles"}
      }
    }
  },
  "included": [
    {
      "data": {
        "id": "123e4567-e89b-12d3-a456-426655440000",
        "type": "roles",
        "attributes": {
          "created_at": "2019-11-04 17:41:29.015504",
          "modified_at": "2019-11-06 17:41:29.015504",
          "uuid": "123e4567-e89b-12d3-a456-426655440000",
          "name": "Developer Role"
        },
        "relationships": {
          "data": [
            {
              "id": "123e4567-e89b-12d3-a456-426655440000",
              "type": "permissions"
            }
          ]
        }
      }
    },
    {
      "data": {
        "id": 6,
        "type": "saml_assertion_attributes",
        "attributes": {
          "id": 6,
          "attribute_key": "member-of",
          "attribute_value": "Developer"
        }
      }
    }
  ]
}
```

{{% /tab %}}
{{< /tabs >}}

### Update mapping

Updates the AuthN Mapping `role`, `saml_assertion_attribute_id`, or both from a JSON body. Returns the updated AuthN Mapping.

| Method  | Endpoint path               | Required payload    |
|---------|-----------------------------|---------------------|
| `PATCH` | `/v2/authn_mappings/{UUID}` | URL parameter, JSON |

##### ARGUMENTS

* **`{UUID}`** [*required*, no default]:
  Replace `{UUID}` with the UUID of the AuthN Mapping you want to update.
* **`id`** [*required*, *default*=none]:
  The UUID of the AuthN Mapping being updated. This property must match the `{UUID}` path parameter in the request.
* **`role_uuid`** [*required*, *default*=none]:
  The Roles API can be used to create and manage Datadog roles, what global permissions they grant, and which users belong to them. When you create a Role, it is assigned a UUID. For more information about finding the `role_uuid` for the role you are updating, see the [Role API documentation][1].
* **`attribute_key`** [*required*, *default*=none]:
 The `attribute_key` is the key portion of a key/value pair that represents an attribute sent from your Identity Provider. You can define these for your own use case. For example, `attribute_key` could be `member-of` and the `attribute_value` could be `Development`.
* **`attribute_value`** [*required*, *default*=none]:
 The `attribute_value` is the value portion of a key/value pair that represents an attribute sent from your Identity Provider. You can define these for your own use case. For example, `attribute_key` could be `member-of` and the `attribute_value` could be `Development`.

{{< tabs >}}
{{% tab "Example" %}}

```sh
curl -X PATCH \
         "https://api.datadoghq.com/api/v2/authn_mappings/{UUID}" \
         -H "Content-Type: application/json" \
         -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
         -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
         -d '{
             "data": {
                 "type": "authn_mappings",
                 "id": "{UUID}",
                 "attributes": {
                      "role_uuid": "123e4567-e89b-12d3-a456-426655445555",
                      "attribute_key": "member-of",
                      "attribute_value": "Developer"
                }
             }
         }'
```

Replace the `<YOUR_DATADOG_API_KEY>` and `<YOUR_DATADOG_APPLICATION_KEY>` placeholders with the corresponding [API and application keys for your organization][1].

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Response" %}}

```json
{
  "data": {
    "attributes": {
      "created_at": "2019-11-04 17:41:29.015504",
      "role_uuid": "123e4567-e89b-12d3-a456-426655445555",
      "saml_assertion_attribute_id": 0
    },
    "type": "authn_mappings",
    "id": "123e4567-e89b-12d3-a456-426655440000",
    "relationships": {
      "saml_assertion_attributes": {
        "data": {"id": 0, "type": "saml_assertion_attributes"}
      },
      "roles": {
        "data": {"id": "123e4567-e89b-12d3-a456-426655440000", "type": "roles"}
      }
    }
  },
  "included": [
    {
      "data": {
        "id": "123e4567-e89b-12d3-a456-426655440000",
        "type": "roles",
        "attributes": {
          "created_at": "2019-11-04 17:41:29.015504",
          "modified_at": "2019-11-06 17:41:29.015504",
          "uuid": "123e4567-e89b-12d3-a456-426655440000",
          "name": "Developer Role"
        },
        "relationships": {
          "data": [
            {
              "id": "123e4567-e89b-12d3-a456-426655440000",
              "type": "permissions"
            }
          ]
        }
      }
    },
    {
      "data": {
        "id": 6,
        "type": "saml_assertion_attributes",
        "attributes": {
          "id": 6,
          "attribute_key": "member-of",
          "attribute_value": "Developer"
        }
      }
    }
  ]
}
```

{{% /tab %}}
{{< /tabs >}}

### Delete mapping

Deletes a specific AuthN Mapping.

| Method   | Endpoint path               | Required payload |
|----------|-----------------------------|------------------|
| `DELETE` | `/v2/authn_mappings/{UUID}` | URL parameter    |

##### ARGUMENTS

* **`{UUID}`** [*required*, no default]:
  Replace `{UUID}` with the UUID of the AuthN Mapping you want to delete.

{{< tabs >}}
{{% tab "Example" %}}

```sh
curl -X DELETE "https://api.datadoghq.com/api/v2/authn_mappings/{UUID}" \
         -H "Content-Type: application/json" \
         -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
         -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>"
```

Replace the `<YOUR_DATADOG_API_KEY>` and `<YOUR_DATADOG_APPLICATION_KEY>` placeholders with the corresponding [API and application keys for your organization][1].

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Response" %}}

```sh
HTTP/2 204
```

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/role_api/?tab=datadogussite#get-all-roles
