---
title: Service Definition API
kind: faq
is_beta: true
---

<div class="alert alert-warning">This feature is in private beta and the endpoints are likely to change.</div>

Before you begin, you need a [Datadog API and app key][1].

## Post a service definition

```
POST https://api.datadoghq.com/api/unstable/services/definition
```

### Arguments

#### Header parameters

| Required field  | Description |
| ---------- | ----------- |
| `DD-API-KEY` | Identifies an organization. To create or reuse existing keys, go to the [API keys page][2]. |
| `DD-APPLICATION-KEY` | Identifies a user. To create or reuse existing keys, to to the [Application keys page][3]. |

### Request

#### Body data (required)

| Field                       | Type            | Description |
| --------------------------- | --------------- | ------------------------------------------------------- |
| schema-version&nbsp;[_required_] | string          | Version of the service definition schema being used. Only value `v2` is supported.|
| dd-service&nbsp;[_required_]     | string          | Unique identifier of the service. Must be unique across all services and it used to match with a service in Datadog. |
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
{{< code-block lang="yaml" filename="service_definition.yaml" collapsible="true" >}}
---
schema-version: http://www.datadoghq.com/service/schema/v2.json 
dd-service: shopping-cart 
team: e-commerce 
contacts:
  - type: slack
    contact: http://slack/e-commerce
  - type: email 
    name: E-commerce team
    contact: ecommerce@example.com  
links: 
  - name: Runbook
    type: runbook
    url: http://runbook/shopping-cart
repos: 
  - name: Source 
    provider: github 
    url: http://github.com/shopping-cart 
  - name: Deployment 
    provider: github 
    url: http://github.com/shopping-cart 
  - name: Config
    provider: github 
    url: http://github.com/consul-config/shopping-cart
docs: 
  - name: E-Commerce Team
    provider: wiki
    url: http://wiki/ecommerce
  - name: Shopping Cart Architecture
    provider: wiki
    url: http://wiki/ecommerce/shopping-cart
  - name: Shopping Cart RFC
    provider: google doc
    url: http://doc.google.com/shopping-cart
tags:
  - business-unit:retail
  - cost-center:engineering
integrations: 
  pagerduty: https://www.pagerduty.com/service-directory/shopping-cart
extensions:
  your_org/your_domain: 
    customField: customValue
{{< /code-block >}}

### Response

... codes, messages, objects ...

### Curl Example

{{< code-block lang="curl" >}}
curl --request POST 'https://api.datadoghq.com/api/unstable/services/definition' \
--header 'DD-API-KEY: {API_KEY}' \
--header 'DD-APPLICATION-KEY: {APPLICATION_KEY}' \
--header 'Content-Type: application/json' \
--data-raw '{
<service_definition.yaml> 
}'
{{< /code-block >}}

## Get a service definition

```
GET https://api.datadoghq.com/api/unstable/services/definition/{service_name}
```

### Arguments 

#### Path parameters

| Required field  | Description |
| ---------- | ----------- |
| `service_name` | Identifies the service to retrieve its definition. |

#### Header parameters

| Required field  | Description |
| ---------- | ----------- |
| `DD-API-KEY` | Identifies an organization. To create or reuse existing keys, go to the [API keys page][2]. |
| `DD-APPLICATION-KEY` | Identifies a user. To create or reuse existing keys, to to the [Application keys page][3]. |

### Response

... codes, messages, objects ...

### Curl Example

{{< code-block lang="curl" >}}
curl --request GET 'https://api.datadoghq.com/api/unstable/services/definition/shopping-cart' \
--header 'DD-API-KEY: {API_KEY}' \
--header 'DD-APPLICATION-KEY: {APPLICATION_KEY}' 
{{< /code-block >}}

## Query service definitions

```
GET https://api.datadoghq.com/api/unstable/services/definition
```

This endpoint returns every service definition that Datadog has for an organization

### Arguments

#### Header parameters

| Required field  | Description |
| ---------- | ----------- |
| `DD-API-KEY` | Identifies an organization. To create or reuse existing keys, go to the [API keys page][2]. |
| `DD-APPLICATION-KEY` | Identifies a user. To create or reuse existing keys, to to the [Application keys page][3]. |

### Response

... codes, messages, objects ...

### Curl Example

{{< code-block lang="curl" >}}
curl --request GET 'https://api.datadoghq.com/api/unstable/services/definition \
--header 'DD-API-KEY: {API_KEY}' \
--header 'DD-APPLICATION-KEY: {APPLICATION_KEY}'
{{< /code-block >}}

## Delete a service definition

```
DELETE https://api.datadoghq.com/api/unstable/services/definition/{service_name}
```

#### Path parameters

| Required field  | Description |
| ---------- | ----------- |
| `service_name` | Identifies the service to delete its definition. |

#### Header parameters

| Required field  | Description |
| ---------- | ----------- |
| `DD-API-KEY` | Identifies an org. To create or reuse existing keys, go to the [API keys page][2]. |
| `DD-APPLICATION-KEY` | Identifies a user. To create or reuse existing keys, to to the [Application keys page][3]. |

### Response

... codes, messages, objects ...

### Curl Example

{{< code-block lang="curl" >}}
curl --request DELETE 'https://api.datadoghq.com/api/unstable/services/definition/shopping-cart \
--header 'DD-API-KEY: {API_KEY}' \
--header 'DD-APPLICATION-KEY: {APPLICATION_KEY}'
{{< /code-block >}}

[1]: /account_management/api-app-keys/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys
