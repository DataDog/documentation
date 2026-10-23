---
title: Validate API key
description: Check if the API key (not the APP key) is valid. If invalid, a 403 is returned.
breadcrumbs: Docs > API > Validate API key
---

> For the complete documentation index, see [llms.txt](https://docs.datadoghq.com/llms.txt).

# Validate API key

## v1 (latest)

| Datadog site      | API endpoint                                      |
| ----------------- | ------------------------------------------------- |
| app.datadoghq.com | GET https://api.datadoghq.com/api/v1/validate     |
| us3.datadoghq.com | GET https://api.us3.datadoghq.com/api/v1/validate |
| us5.datadoghq.com | GET https://api.us5.datadoghq.com/api/v1/validate |
| app.datadoghq.eu  | GET https://api.datadoghq.eu/api/v1/validate      |
| ap1.datadoghq.com | GET https://api.ap1.datadoghq.com/api/v1/validate |
| ap2.datadoghq.com | GET https://api.ap2.datadoghq.com/api/v1/validate |
| app.ddog-gov.com  | GET https://api.ddog-gov.com/api/v1/validate      |
| uk1.datadoghq.com | GET Not supported in the UK1 region               |
| us2.ddog-gov.com  | GET Not supported in the US2-FED region           |

### Overview

Check if the API key (not the APP key) is valid. If invalid, a 403 is returned.

### Response

{% tabs %}
{% tab label="200" %}
OK

{% tabs %}
{% tab label="Model" %}
Represent validation endpoint responses.

| Field | Type    | Description                                                       |
| ----- | ------- | ----------------------------------------------------------------- |
| valid | boolean | Return `true` if the authentication response is valid. Read-only. |
{% /tab %}

{% tab label="Example" %}
```json
{
  "valid": true
}
```
{% /tab %}
{% /tabs %}
{% /tab %}

{% tab label="403" %}
Authentication error

{% tabs %}
{% tab label="Model" %}
Error response object.

| Field               | Type     | Description                          |
| ------------------- | -------- | ------------------------------------ |
| errors [*required*] | [string] | Array of errors returned by the API. |
{% /tab %}

{% tab label="Example" %}
```json
{
  "errors": [
    "Bad Request"
  ]
}
```
{% /tab %}
{% /tabs %}
{% /tab %}

{% tab label="429" %}
Too many requests

{% tabs %}
{% tab label="Model" %}
Error response object.

| Field               | Type     | Description                          |
| ------------------- | -------- | ------------------------------------ |
| errors [*required*] | [string] | Array of errors returned by the API. |
{% /tab %}

{% tab label="Example" %}
```json
{
  "errors": [
    "Bad Request"
  ]
}
```
{% /tab %}
{% /tabs %}
{% /tab %}
{% /tabs %}

### Code Example

{% tabs %}
{% tab label="Curl" %}
```bash
# Set your Datadog site and credentials
export DD_SITE="datadoghq.com" # Or us3.datadoghq.com, us5.datadoghq.com, datadoghq.eu, ap1.datadoghq.com, ap2.datadoghq.com, ddog-gov.com
export DD_API_KEY="<DD_API_KEY>"

curl -X GET "https://api.${DD_SITE}/api/v1/validate" \
-H "Accept: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}"
```
{% /tab %}

{% tab label="Go" %}
```go
// NOTE: Frozen test fixture from tests/fixtures/api/examples/, not live SDK output.
// Validate API key returns "OK" response

package main

import (
	"context"
	"encoding/json"
	"fmt"
	"os"

	"github.com/DataDog/datadog-api-client-go/v2/api/datadog"
	"github.com/DataDog/datadog-api-client-go/v2/api/datadogV1"
)

func main() {
	ctx := datadog.NewDefaultContext(context.Background())
	configuration := datadog.NewConfiguration()
	apiClient := datadog.NewAPIClient(configuration)
	api := datadogV1.NewAuthenticationApi(apiClient)
	resp, r, err := api.Validate(ctx)

	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `AuthenticationApi.Validate`: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}

	responseContent, _ := json.MarshalIndent(resp, "", "  ")
	fmt.Fprintf(os.Stdout, "Response from `AuthenticationApi.Validate`:\n%s\n", responseContent)
}
```

#### Instructions

First [install the library and its dependencies](https://docs.datadoghq.com/api/latest.md?code-lang=go) and then save the example to `main.go` and run following commands:

```bash
DD_SITE="datadoghq.com" DD_API_KEY="<DD_API_KEY>" go run "main.go"
```
{% /tab %}

{% tab label="Python" %}
```python
# NOTE: Frozen test fixture from tests/fixtures/api/examples/, not live SDK output.
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

```bash
DD_SITE="datadoghq.com" DD_API_KEY="<DD_API_KEY>" python3 "example.py"
```
{% /tab %}
{% /tabs %}
