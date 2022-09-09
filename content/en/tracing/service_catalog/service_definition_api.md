---
title: Registering Services through the Datadog Service Definition API
kind: documentation
aliases:
- /tracing/faq/service_definition_api/
further_reading:
- link: "/tracing/service_catalog/"
  tag: "Documentation"
  text: "Datadog Service Catalog"
---

## Overview

A service is an independent, deployable unit of software. Datadog [Unified Service Tagging][1] provides a standard way to manage and monitor service ownership consistently across every telemetry type. If you want to define a service using additional criteria, customize the service definition that fits your architectural style and register it using this API. 

## Requirements

Before you begin, you need a [Datadog API and app key][3].


## Service Definition Schema (v2)
Basic information about a service. 
| Field                       |   Description      |Type  | Required |
| --------------------------- | --------------- | ------------------------------------------------------- | -------- |
| schema-version&nbsp;[_required_] | string          | Version of the service definition schema being used. Only value `v2` is supported.| yes |
| dd-service&nbsp;[_required_]     | string          | Unique identifier of the service. Must be unique across all services, and used to match with a service in Datadog. | yes |
| team                        | string          | Name of the team responsible for the service. | yes |

#### Example
{{< code-block lang="yaml" filename="service.definition.yaml" collapsible="true" >}}
schema-version: v2
dd-service: shopping-cart
team: E-Commerce Team
{{< /code-block >}}

#### Contacts (Optional)
| Field                       |   Description     |  Type| Required |
| --------------------------- | --------------- | ------------------------------------------------------- | -------- |
| Type | Contact type          | string| yes |
| name | Contact name          | string| no |
| contact | Contact value       | string| yes |

#### Example
{{< code-block lang="yaml" filename="service.definition.yaml" collapsible="true" >}}
contacts:
  - type: slack
    contact: http://slack/e-commerce
  - type: email 
    contact: ecommerce@example.com  
External Resources (Optional)
{{< /code-block >}}

See full schema on [GitHub][4].

## Post a service definition

```
POST /api/v2/services/definitions
```

### Arguments

#### Header parameters

| Required field  | Description |
| ---------- | ----------- |
| `DD-API-KEY` | Identifies an organization. To create or reuse existing keys, go to the [API keys page][5]. |
| `DD-APPLICATION-KEY` | Identifies a user. To create or reuse existing keys, go to the [Application keys page][6]. |

### Request

#### Body data (required)

You can generate this body data on the [Service Catalog Getting Started page][7].

##### Model 
| Field                       | Type            | Description |
| --------------------------- | --------------- | ------------------------------------------------------- |
| Request Body                | JSON or YAML    | See Service Definition Schema [v2][4] |

#### Example
{{< code-block lang="json" filename="service.definition.json" collapsible="true" >}}
{
  "schema-version": "v2",
  "dd-service": "shopping-service"
}
{{< /code-block >}}

#### Example
{{< code-block lang="json" filename="service.definition.json" collapsible="true" >}}
{
    "data": [
        {
            "attributes": {
                "meta": {
                    "ingested-schema-version": "v2",
                    "ingestion-source": "api",
                    "last-modified-time": "2022-07-13T19:45:14.974121477Z",
                    "github-html-url": "",
                    "warnings": []
                },
                "schema": {
                    "dd-service": "shopping-service",
                    "schema-version": "v2",
                    "links": [],
                    "contacts": [],
                    "docs": [],
                    "repos": [],
                    "tags": null,
                    "integrations": {},
                    "team": "",
                    "extensions": {}
                }
            },
            "type": "service-definition"
        }
    ]
}
{{< /code-block >}}

### Response

Status: <br>
`200 OK` <br>
`400 Invalid Request` <br>
`429 Too Many Requests` 


### Curl example

{{< code-block lang="curl" >}}
curl --request POST 'https://api.datadoghq.com/api/v2/services/definitions' \
--header 'DD-API-KEY: <API_KEY>' \
--header 'DD-APPLICATION-KEY: <APPLICATION_KEY>' \
--header 'Content-Type: application/json' \
--data-raw '{
  "schema-version": "v2",
  "dd-service": "shopping-service"
}'
{{< /code-block >}}

## Get a service definition
This endpoint allows you to retrieve a single definition file for a service. 

```
GET /api/v2/services/definitions/<service_name>
```

### Arguments 

#### Path parameters

| Required field  | Description |
| ---------- | ----------- |
| `service_name` | Identifies the service to retrieve its definition. |
| `schema_version` | Use `v2` |

#### Header parameters

| Required field  | Description |
| ---------- | ----------- |
| `DD-API-KEY` | Identifies an organization. To create or reuse existing keys, go to the [API keys page][5]. |
| `DD-APPLICATION-KEY` | Identifies a user. To create or reuse existing keys, to to the [Application keys page][6]. |

### Response

The service definition JSON object, for example:

{{< code-block lang="json" collapsible="true" >}}
{
    "data": {
        "type": "service_definitions",
        "attributes": {
            "service_definitions": [
                {
                    "docs": [],
                    "links": [
                        {
                            "url": "https://wiki/shopping-cart",
                            "type": "wiki",
                            "name": "shopping-cart service Wiki"
                        },
                        {
                            "url": "https://google.drive/shopping-cart-architecture",
                            "type": "doc",
                            "name": "shopping-cart architecture"
                        },
                        {
                            "url": "https://runbook/shopping-cart",
                            "type": "runbook",
                            "name": "shopping-cart runbook"
                        }
                    ],
                    "tags": [
                        "cost-center:engineering",
                        "business-unit:retail"
                    ],
                    "service_name": "shopping-cart",
                    "repos": [],
                    "contacts": [
                        {
                            "contact": "team@shopping.com",
                            "type": "email",
                            "name": ""
                        },
                        {
                            "contact": "shopping-cart",
                            "type": "slack",
                            "name": ""
                        }
                    ],
                    "integrations": [
                        {
                            "type": "pagerduty",
                            "param": "https://www.pagerduty.com/service-directory/shopping-cart"
                        },
                        {
                            "type": "github",
                            "param": "https://www.github.com/org/shopping-cart"
                        }
                    ],
                    "schema_version": "v1",
                    "team_handle": "",
                    "ingestion_source": "api",
                    "extensions": {},
                    "team": "e-commerce",
                    "last_modified_time": "2022-03-09T14:54:38Z",
                    "github_html_url": ""
                }
            ]
        }
    }
}
{{< /code-block >}}
### Curl example

{{< code-block lang="curl" >}}
curl --request GET 'https://api.datadoghq.com/api/unstable/services/definition/shopping-cart?schema_version="v2"' \
--header 'DD-API-KEY: {API_KEY}' \
--header 'DD-APPLICATION-KEY: {APPLICATION_KEY}' 
{{< /code-block >}}

## Query all service definitions

```
GET /api/v2/services/definitions
```

### Arguments

#### Header parameters

| Required field  | Description |
| ---------- | ----------- |
| `DD-API-KEY` | Identifies an organization. To create or reuse existing keys, go to the [API keys page][5]. |
| `DD-APPLICATION-KEY` | Identifies a user. To create or reuse existing keys, go to the [Application keys page][6]. |

### Response

This endpoint returns every service definition that Datadog has for an organization. See the Response example for [Get a service definition](#get-a-service-definition).

### Example
{{< code-block lang="curl" >}}
{
  "data": [
    {
      "attributes": {
        "meta": {
          "ingested-schema-version": "v2",
          "ingestion-source": "api",
          "last-modified-time": "2022-07-13T19:45:14Z",
          "github-html-url": "",
          "warnings": []
        },
        "schema": {
          "links": [],
          "contacts": [],
          "docs": [],
          "repos": [],
          "tags": [],
          "integrations": {},
          "schema-version": "v2",
          "team": "",
          "extensions": {},
          "dd-service": "shopping-service"
        }
      },
      "type": "service-definition",
      "id": "0007484c47fea9a3cd74d7fc4a1c4e8f"
    },
    {
      "attributes": {
        "meta": {
          "ingested-schema-version": "v2",
          "ingestion-source": "api",
          "last-modified-time": "2022-07-12T15:06:00Z",
          "github-html-url": "",
          "warnings": []
        },
        "schema": {
          "links": [],
          "contacts": [],
          "docs": [],
          "repos": [],
          "tags": [],
          "integrations": {},
          "schema-version": "v2",
          "team": "",
          "extensions": {},
          "dd-service": "delivery-service"
        }
      },
      "type": "service-definition",
      "id": "0007484c47fea9a3cd74d7fc4a1c4e8f"
    }
  ]
}
{{< /code-block >}}


### Curl example

{{< code-block lang="curl" >}}
curl --location --request GET 'https://api.datadoghq.com/api/v2/services/definitions' \
--header 'DD-API-KEY: <API_KEY>' \
--header 'DD-APPLICATION-KEY: <APPLICATION_KEY>' 
{{< /code-block >}}

## Delete a service definition

```
DELETE /api/v2/services/definitions/<service_name>
```

#### Path parameters

| Required field  | Description |
| ---------- | ----------- |
| `service_name` | Identifies the service to delete its definition. |

#### Header parameters

| Required field  | Description |
| ---------- | ----------- |
| `DD-API-KEY` | Identifies an organization. To create or reuse existing keys, go to the [API keys page][5]. |
| `DD-APPLICATION-KEY` | Identifies a user. To create or reuse existing keys, go to the [Application keys page][6]. |

### Response

Status: `200 OK (Deleted)`

### Curl example

{{< code-block lang="curl" >}}
curl --location --request DELETE 'https://api.datadoghq.com/api/v2/services/definitions/shopping-cart' \
--header 'DD-API-KEY: <API_KEY>' \
--header 'DD-APPLICATION-KEY: <APPLICATION_KEY>'
{{< /code-block >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/blog/unified-service-tagging/
[2]: /tracing/service_catalog/
[3]: /account_management/api-app-keys/
[4]: https://github.com/DataDog/schema/blob/main/service-catalog/v2/schema.json
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://app.datadoghq.com/organization-settings/application-keys
[7]: https://app.datadoghq.com/services/setup
