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
Ask your sales representative or customer success manager to enable this feature.
</div>

If you are using Federated Authentication mechanisms, this API allows you to automatically map groups of users to roles in Datadog.

**Note**: If you are a SAML user and you have been using the existing beta Federated Mapping mechanism (roles_v2_saml), you should transition to using this API.

## Requests

All the API endpoints below can have two different host endpoints:

* If you are on the Datadog US site: `https://api.datadoghq.com/api/`
* If you are on the Datadog EU site: `https://api.datadoghq.eu/api/`

### Create a new Authentication mapping


Create a new AuthN Mapping from json body. Returns the newly created AuthN Mapping.

| Method | Endpoint path | Required payload |
|--------|--------------|------------------|
| `POST`  | `/v1/authn_mappings`  | JSON       |

##### ARGUMENTS

* **`role_uuid`** [*required*, *default*=**?**]:
?
* **`attribute_key`** [*required*, *default*=**?**]:
?
* **`attribute_value`** [*required*, *default*=**?**]:
?

{{< tabs >}}
{{% tab "Example" %}}

{{< code-block lang="bash" filename="roles.sh" >}}
{ÿ
  "type": "string",
  "data": {ÿ
    "attributes": {ÿ
      "role_uuid": "00000000-0000-0000-0000-000000000000",
      "attribute_key": "string",
      "attribute_key": "string"
    }
  }
}
{{< /code-block >}}

Replace the `<YOUR_DATADOG_API_KEY>` and `<YOUR_DATADOG_APPLICATION_KEY>` placeholder with the corresponding [API and application keys for your organization][1].

[1]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Response" %}}

{{< code-block lang="json" filename="response.json" disable_copy="true" >}}
{ÿ
  "data": {ÿ
    "attributes": {ÿ
      "created_at": "string",
      "created_by": "string",
      "uuid": "10000000-abcd-efgh-ijkl-000000000000",
      "role_uuid": "00000000-0000-0000-0000-000000000000",
      "saml_assertion_attribute_id": 0
    },
    "type": "string",
    "id": "string",
    "relationships": {ÿ
      "saml_assertion_attributes": {ÿ
        "data": {ÿ
          "id": 0,
          "type": "saml_assertion_attributes"
        }
      },
      "roles": {ÿ
        "data": {ÿ
          "id": "string",
          "type": "roles"
        }
      }
    }
  },
  "included": [
    {ÿ
      "data": {ÿ
        "id": "string",
        "type": "roles",
        "attributes": {ÿ
          "created_at": "string",
          "modified_at": "string",
          "uuid": "00000000-0000-0000-0000-000000000000",
          "name": "string"
        },
        "relationships": {ÿ
          "data": [
            {ÿ
              "id": "string",
              "type": "permissions"
            }
          ]
        }
      }
    },
    {ÿ
      "data": {ÿ
        "id": 0,
        "type": "authn_mappings",
        "attributes": {ÿ
          "id": 6,
          "attribute_key": "string",
          "attribute_value": "string"
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

| Method | Endpoint path            | Required payload |
|--------|-------------------------|------------------|
| `GET`  | `/v1/authn_mappings` | optional queries       |

##### ARGUMENTS

* **`sort`** [*optional*, *default*=**yes**]:
  Sort attribute and direction - `yes` sorts in descending order, `no` sorts in ascending order.
* **`page_number`** [*optional*, *default*=**0**, *minimum*=**0**]:
  The page of results to return. 
* **`page_size`** [*optional*, *default*=**10**]:
  The number of results to return on each page.
* **`filter`** [*optional*, no default]:
  Filter by tags as strings. For example, `Billing Users`.

{{< tabs >}}
{{% tab "Example" %}}

```sh
curl -X GET "https://app.datadoghq.com/api/v1/authn_mappings" \
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
      "type": "authn_mapping",
      "id": "string",
      "relationships": {
        "saml_assertion_attributes": {
          "data": {
            "id": 0,
            "type": "saml_assertion_attributes"
          }
        },
        "roles": {
          "data": {
            "id": "string",
            "type": "roles"
          }
        }
      },
      "attributes": {
        "created_at": "string",
        "created_by": "string",
        "uuid": "10000000-abcd-efgh-ijkl-000000000000",
        "role_uuid": "00000000-0000-0000-0000-000000000000",
        "saml_assertion_attribute_id": 0
      }
    }
  ],
  "included": [
    {
      "data": {
        "id": "string",
        "type": "roles",
        "attributes": {
          "created_at": "string",
          "modified_at": "string",
          "uuid": "00000000-0000-0000-0000-000000000000",
          "name": "string"
        },
        "relationships": {
          "data": [
            {
              "id": "string",
              "type": "permissions"
            }
          ]
        }
      }
    },
    {
      "data": {
        "id": 0,
        "type": "authn_mappings",
        "attributes": {
          "id": 6,
          "attribute_key": "string",
          "attribute_value": "string"
        }
      }
    }
  ],
  "meta": {
    "page": {
      "total": 0,
      "page_number": 0,
      "page_size": 0
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

### Get a specific AuthN Mapping

Returns a specific AuthN Mapping by UUID.

| Method | Endpoint path | Required payload                           |
|--------|--------------|--------------------------------------------|
| `GET` | `/authn_mappings/{UUID}`  | URL parameter |

##### ARGUMENTS

* **`{UUID}`** [*required*, no default]:
  Replace `{UUID}` with the UUID of the AuthN Mapping you want to view.

{{< tabs >}}
{{% tab "Example" %}}

```sh
curl -X GET "https://app.datadoghq.com/api/v1/authn_mappings/{UUID}" \
     -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
     -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>"
```

Replace the `<YOUR_DATADOG_API_KEY>` and `<YOUR_DATADOG_APPLICATION_KEY>` placeholders with the corresponding [API and application keys for your organization][1].

[1]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Response" %}}

```json
{
  "data": {
    "attributes": {
      "created_at": "string",
      "created_by": "string",
      "uuid": "10000000-abcd-efgh-ijkl-000000000000",
      "role_uuid": "00000000-0000-0000-0000-000000000000",
      "saml_assertion_attribute_id": 0
    },
    "type": "string",
    "id": "string",
    "relationships": {
      "saml_assertion_attributes": {
        "data": {
          "id": 0,
          "type": "saml_assertion_attributes"
        }
      },
      "roles": {
        "data": {
          "id": "string",
          "type": "roles"
        }
      }
    }
  },
  "included": [
    {
      "data": {
        "id": "string",
        "type": "roles",
        "attributes": {
          "created_at": "string",
          "modified_at": "string",
          "uuid": "00000000-0000-0000-0000-000000000000",
          "name": "string"
        },
        "relationships": {
          "data": [
            {
              "id": "string",
              "type": "permissions"
            }
          ]
        }
      }
    },
    {
      "data": {
        "id": 0,
        "type": "authn_mappings",
        "attributes": {
          "id": 6,
          "attribute_key": "string",
          "attribute_value": "string"
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


| Method | Endpoint path | Required payload |
|--------|--------------|------------------|
| `PATCH`  | `/v1/authn_mappings/{UUID}`  | JSON       |

##### ARGUMENTS

* **`{UUID}`** [*required*, no default]:
  Replace `{UUID}` with the UUID of the AuthN Mapping you want to update.
* **`role_uuid`** [*required*, *default*=**?**]:
?
* **`attribute_key`** [*required*, *default*=**?**]:
?

{{< tabs >}}
{{% tab "Example" %}}

```sh
curl -X PATCH \
         "https://app.datadoghq.com/api/v1/authn_mappings/{UUID}" \
         -H "Content-Type: application/json" \
         -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
         -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
         -d '{
             "data": {
                 "authn_mappings",
                 "attributes": {
                      "role_uuid": "00000000-0000-0000-0000-000000000000",
                      "attribute_key": "string",
                      "attribute_value": "string"
                }
             }
         }'
```

Replace the `<YOUR_DATADOG_API_KEY>` and `<YOUR_DATADOG_APPLICATION_KEY>` placeholders with the corresponding [API and application keys for your organization][1].

[1]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Response" %}}

```json
{
  "data": {
    "attributes": {
      "created_at": "string",
      "created_by": "string",
      "uuid": "10000000-abcd-efgh-ijkl-000000000000",
      "role_uuid": "00000000-0000-0000-0000-000000000000",
      "saml_assertion_attribute_id": 0
    },
    "type": "string",
    "id": "string",
    "relationships": {
      "saml_assertion_attributes": {
        "data": {
          "id": 0,
          "type": "saml_assertion_attributes"
        }
      },
      "roles": {
        "data": {
          "id": "string",
          "type": "roles"
        }
      }
    }
  },
  "included": [
    {
      "data": {
        "id": "string",
        "type": "roles",
        "attributes": {
          "created_at": "string",
          "modified_at": "string",
          "uuid": "00000000-0000-0000-0000-000000000000",
          "name": "string"
        },
        "relationships": {
          "data": [
            {
              "id": "string",
              "type": "permissions"
            }
          ]
        }
      }
    },
    {
      "data": {
        "id": 0,
        "type": "authn_mappings",
        "attributes": {
          "id": 6,
          "attribute_key": "string",
          "attribute_value": "string"
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

| Method   | Endpoint path            | Required payload |
|----------|-------------------------|------------------|
| `DELETE` | `/v1/authn_mappings/{UUID}` | URL parameter |

##### ARGUMENTS

* **`{UUID}`** [*required*, no default]:
  Replace `{UUID}` with the UUID of the AuthN Mapping you want to delete.

{{< tabs >}}
{{% tab "Example" %}}

```sh
curl -X DELETE "https://app.datadoghq.com/api/v1/authn_mappings/{UUID}" \
         -H "Content-Type: application/json" \
         -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
         -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>"
```

Replace the `<YOUR_DATADOG_API_KEY>` and `<YOUR_DATADOG_APPLICATION_KEY>` placeholders with the corresponding [API and application keys for your organization][1].

[1]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Response" %}}

```sh
HTTP/2 204
```

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
