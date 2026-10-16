---
title: Validate API key
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: Docs > API Reference > Authentication
---

> For the complete documentation index, see [llms.txt](https://docs.datadoghq.com/llms.txt).

# Validate API key{% #validate-api-key %}

{% tab title="v1" %}

| Datadog site      | API endpoint                                      |
| ----------------- | ------------------------------------------------- |
| ap1.datadoghq.com | GET https://api.ap1.datadoghq.com/api/v1/validate |
| ap2.datadoghq.com | GET https://api.ap2.datadoghq.com/api/v1/validate |
| app.datadoghq.eu  | GET https://api.datadoghq.eu/api/v1/validate      |
| app.ddog-gov.com  | GET https://api.ddog-gov.com/api/v1/validate      |
| us2.ddog-gov.com  | GET https://api.us2.ddog-gov.com/api/v1/validate  |
| uk1.datadoghq.com | GET https://api.uk1.datadoghq.com/api/v1/validate |
| app.datadoghq.com | GET https://api.datadoghq.com/api/v1/validate     |
| us3.datadoghq.com | GET https://api.us3.datadoghq.com/api/v1/validate |
| us5.datadoghq.com | GET https://api.us5.datadoghq.com/api/v1/validate |

### Overview

Check if the API key (not the APP key) is valid. If invalid, a 403 is returned.

### Response

{% tab title="200" %}
OK
{% tab title="Model" %}
Represent validation endpoint responses.

| Field | Type    | Description                                            |
| ----- | ------- | ------------------------------------------------------ |
| valid | boolean | Return `true` if the authentication response is valid. |

{% /tab %}

{% tab title="Example" %}

```json
{
  "valid": true
}
```

{% /tab %}

{% /tab %}

{% tab title="403" %}
Authentication error
{% tab title="Model" %}
Error response object.

| Field                    | Type     | Description                          |
| ------------------------ | -------- | ------------------------------------ |
| errors [*required*] | [string] | Array of errors returned by the API. |

{% /tab %}

{% tab title="Example" %}

```json
{
  "errors": [
    "Bad Request"
  ]
}
```

{% /tab %}

{% /tab %}

{% tab title="429" %}
Too many requests
{% tab title="Model" %}
Error response object.

| Field                    | Type     | Description                          |
| ------------------------ | -------- | ------------------------------------ |
| errors [*required*] | [string] | Array of errors returned by the API. |

{% /tab %}

{% tab title="Example" %}

```json
{
  "errors": [
    "Bad Request"
  ]
}
```

{% /tab %}

{% /tab %}

### Code Example

##### 
                  \# Curl command curl -X GET "https://api.datadoghq.com/api/v1/validate" \
-H "Accept: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" 
                
##### 

```python
"""
Validate API key returns "OK" response
"""

from datadog_api_client import ApiClient, Configuration
from datadog_api_client.v1.api.authentication_api import AuthenticationApi

configuration = Configuration()
with ApiClient(configuration) as api_client:
    api_instance = AuthenticationApi(api_client)
    response = api_instance.validate()

    print(response)
```

#### Instructions

First [install the library and its dependencies](https://docs.datadoghq.com/api/latest.md?code-lang=python) and then save the example to `example.py` and run following commands:
    DD_SITE="datadoghq.com" DD_API_KEY="<DD_API_KEY>" python3 "example.py"
{% /tab %}
