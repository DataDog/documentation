---
title: Get all dashboard lists
description: Fetch all of your existing dashboard list definitions.
breadcrumbs: Docs > API > Get all dashboard lists
---

> For the complete documentation index, see [llms.txt](https://docs.datadoghq.com/llms.txt).

# Get all dashboard lists

## v1 (latest)

Fetch all of your existing dashboard list definitions.

| Datadog site      | API endpoint                                                        |
| ----------------- | ------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/dashboard/lists/manual     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/dashboard/lists/manual |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/dashboard/lists/manual |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/dashboard/lists/manual      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/dashboard/lists/manual |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/dashboard/lists/manual |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/dashboard/lists/manual      |

This endpoint requires the `dashboards_read` permission.

OAuth apps require the `dashboards_read` authorization scope to access this endpoint.

### Response

{% tabs %}
{% tab label="200" %}
OK

{% tabs %}
{% tab label="Model" %}
Information on your dashboard lists.

| Parent field    | Field             | Type      | Description                                                     |
| --------------- | ----------------- | --------- | --------------------------------------------------------------- |
|                 | dashboard_lists   | [object]  | List of all your dashboard lists.                               |
| dashboard_lists | author            | object    | Object describing the creator of the shared element. Read-only. |
| author          | email             | string    | Email of the creator.                                           |
| author          | handle            | string    | Handle of the creator.                                          |
| author          | name              | string    | Name of the creator.                                            |
| dashboard_lists | created           | date-time | Date of creation of the dashboard list. Read-only.              |
| dashboard_lists | dashboard_count   | int64     | The number of dashboards in the list. Read-only.                |
| dashboard_lists | id                | int64     | The ID of the dashboard list. Read-only.                        |
| dashboard_lists | is_favorite       | boolean   | Whether or not the list is in the favorites. Read-only.         |
| dashboard_lists | modified          | date-time | Date of last edition of the dashboard list. Read-only.          |
| dashboard_lists | name [*required*] | string    | The name of the dashboard list.                                 |
| dashboard_lists | type              | string    | The type of dashboard list. Read-only.                          |
{% /tab %}

{% tab label="Example" %}
```json
{
  "dashboard_lists": [
    {
      "name": "My Dashboard",
      "type": "manual_dashboard_list"
    }
  ]
}
```
{% /tab %}
{% /tabs %}
{% /tab %}

{% tab label="403" %}
Forbidden

{% tabs %}
{% tab label="Model" %}
Error response object.

| Parent field | Field               | Type     | Description                          |
| ------------ | ------------------- | -------- | ------------------------------------ |
|              | errors [*required*] | [string] | Array of errors returned by the API. |
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

| Parent field | Field               | Type     | Description                          |
| ------------ | ------------------- | -------- | ------------------------------------ |
|              | errors [*required*] | [string] | Array of errors returned by the API. |
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
export DD_SITE="datadoghq.com"
# Use a Personal Access Token or Service Access Token
export DD_BEARER_TOKEN="<PERSONAL_ACCESS_TOKEN OR SERVICE_ACCESS_TOKEN>"

curl -X GET "https://api.datadoghq.com/api/v1/dashboard/lists/manual" \
-H "Authorization: Bearer ${DD_BEARER_TOKEN}" \
-H "Accept: application/json"
```
{% /tab %}

{% tab label="Go" %}
```go
// NOTE: Frozen test fixture from tests/fixtures/api/examples/, not live SDK output.
// Get all dashboard lists returns "OK" response

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
	api := datadogV1.NewDashboardListsApi(apiClient)
	resp, r, err := api.ListDashboardLists(ctx)

	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `DashboardListsApi.ListDashboardLists`: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}

	responseContent, _ := json.MarshalIndent(resp, "", "  ")
	fmt.Fprintf(os.Stdout, "Response from `DashboardListsApi.ListDashboardLists`:\n%s\n", responseContent)
}
```

**Instructions**

First [install the library and its dependencies](/api/latest/?code-lang=go) and then save the example to `main.go` and run following commands:

```bash
DD_SITE="datadoghq.com" DD_BEARER_TOKEN="<PERSONAL_ACCESS_TOKEN OR SERVICE_ACCESS_TOKEN>" go run "main.go"
```
{% /tab %}

{% tab label="Python" %}
```python
# NOTE: Frozen test fixture from tests/fixtures/api/examples/, not live SDK output.
"""
Get all dashboard lists returns "OK" response
"""

from datadog_api_client import ApiClient, Configuration
from datadog_api_client.v1.api.dashboard_lists_api import DashboardListsApi

configuration = Configuration()
with ApiClient(configuration) as api_client:
    api_instance = DashboardListsApi(api_client)
    response = api_instance.list_dashboard_lists()

    print(response)
```

**Instructions**

First [install the library and its dependencies](/api/latest/?code-lang=python) and then save the example to `example.py` and run following commands:

```bash
DD_SITE="datadoghq.com" DD_BEARER_TOKEN="<PERSONAL_ACCESS_TOKEN OR SERVICE_ACCESS_TOKEN>" python3 "example.py"
```
{% /tab %}
{% /tabs %}
