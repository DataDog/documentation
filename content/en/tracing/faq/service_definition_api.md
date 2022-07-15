---
title: Registering Services through the Datadog Service Definition API
kind: faq
is_beta: true
further_reading:
- link: "/tracing/faq/service_catalog/"
  tag: "Documentation"
  text: "Datadog Service Catalog"
---

<div class="alert alert-warning">This feature is in private beta and the endpoints are likely to change.</div>

## Overview

A service is an independent, deployable unit of software. Datadog [Unified Service Tagging][1] provides a standard way to manage and monitor services consistently across multiple telemetry types, including infrastructure metrics, logs, and traces. If you want to define a service using additional criteria, customize the service definition that fits your architectural style. View the service list and gain insights into all services' reliability and security in the [Datadog Service Catalog][2].


## Requirements

Before you begin, you need a [Datadog API and app key][3].

## Enriching an existing APM service 
If you already use APM to trace your applications, add information about those services. Initially, APM monitored services listed on the Service Catalog page have an `UNDEFINED` label on them. 

Add service ownership information such as team name, Slack channels, and source code repositories, by pushing a YAML file using the POST endpoint, described below.

## Registering a new service without any Datadog telemetry
You can manage your service ownership information with Service Catalog even if those services are not emitting any of Datadog telemetry (such as APM traces). Specify service ownership, on-call info, and custom tags in YAML files, and the information is reflected in the Service Catalog UI. 


## Post a service definition

```
POST /api/v2/services/definitions
```

### Arguments

#### Header parameters

| Required field  | Description |
| ---------- | ----------- |
| `DD-API-KEY` | Identifies an organization. To create or reuse existing keys, go to the [API keys page][4]. |
| `DD-APPLICATION-KEY` | Identifies a user. To create or reuse existing keys, go to the [Application keys page][5]. |

### Request

#### Body data (required)

| Field                       | Type            | Description |
| --------------------------- | --------------- | ------------------------------------------------------- |
| schema-version&nbsp;[_required_] | string          | Version of the service definition schema being used. Only value `v2` is supported.|
| dd-service&nbsp;[_required_]     | string          | Unique identifier of the service. Must be unique across all services, and used to match with a service in Datadog. |
| team                        | string          | Name of the team responsible for the service. |
| contacts                    | object          | List of contacts on the team. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type&nbsp;[_required_]      | string          | Contact type  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name                        | string          | Contact name  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;contact&nbsp;[_required_]   | string          | Contact value |
| links                       | object          | List of important links related to the service (for example, a runbook). |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name&nbsp;[_required_]      | string          | Link name     |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type&nbsp;[_required_]      | string          | Resource type |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;url&nbsp;[_required_]       | URL&nbsp;string      | Resource link |
| repos                       | object          | List of code repositories related to the service. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name&nbsp;[_required_]      | string          | Name of the code repository     |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;provider                    | string          | Code repository provider |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;url&nbsp;[_required_]       | URL&nbsp;string      | Link to the code repository |
| docs                        | object          | List of documentation links for the services. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name&nbsp;[_required_]      | string          | Name of the document     |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;provider                    | string          | Document provider |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;url&nbsp;[_required_]       | URL&nbsp;string      | Link to the document |
| tags                        | object          | Set of custom tags for the service definition. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"key:value"`&nbsp;or&nbsp;`"value"` | string           | custom tags |
| integrations                | object          | Configuration for supported integrations. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pagerduty&nbsp;[_required_] | URL&nbsp;string          | `https://www.pagerduty.com/service-directory/{service-name}` If you have integrated PagerDuty within Datadog, the URL is used to retrieve PagerDuty data about the service, such as who is currently on call for the service, and active pagers. |
| extensions                  | object          | Custom metadata. The service definition parser treats everything under extensions as a text blob.  |


#### Example
{{< code-block lang="yaml" filename="service.definition.yaml" collapsible="true" >}}
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
                    "dd-service": "shopping-service"
                    "schema-version": "v2",
                    "links": [],
                    "contacts": [],
                    "docs": [],
                    "repos": [],
                    "tags": null,
                    "integrations": {},
                    "team": "",
                    "extensions": {},
                }
            },
            "type": "service-definition"
        }
    ]
}
{{< /code-block >}}

### Response

Status: 
`200 OK` 
`400 Invalid Request` 
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
| `DD-API-KEY` | Identifies an organization. To create or reuse existing keys, go to the [API keys page][4]. |
| `DD-APPLICATION-KEY` | Identifies a user. To create or reuse existing keys, to to the [Application keys page][5]. |

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
| `DD-API-KEY` | Identifies an organization. To create or reuse existing keys, go to the [API keys page][4]. |
| `DD-APPLICATION-KEY` | Identifies a user. To create or reuse existing keys, go to the [Application keys page][5]. |

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
| `DD-API-KEY` | Identifies an organization. To create or reuse existing keys, go to the [API keys page][4]. |
| `DD-APPLICATION-KEY` | Identifies a user. To create or reuse existing keys, go to the [Application keys page][5]. |

### Response

Status: `200 OK (Deleted)`

### Curl example

{{< code-block lang="curl" >}}
curl --location --request DELETE 'https://api.datadoghq.com/api/v2/services/definitions/shopping-cart' \
--header 'DD-API-KEY: <API_KEY>' \
--header 'DD-APPLICATION-KEY: <APPLICATION_KEY>'
{{< /code-block >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/blog/unified-service-tagging/
[2]: /tracing/faq/service_catalog/
[3]: /account_management/api-app-keys/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://app.datadoghq.com/organization-settings/application-keys
