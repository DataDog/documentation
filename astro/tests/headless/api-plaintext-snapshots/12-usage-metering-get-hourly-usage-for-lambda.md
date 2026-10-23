---
title: Get hourly usage for Lambda
description: Get hourly usage for Lambda.
breadcrumbs: Docs > API > Get hourly usage for Lambda
---

> For the complete documentation index, see [llms.txt](https://docs.datadoghq.com/llms.txt).

# Get hourly usage for Lambda

## v1 (deprecated)

| Datadog site      | API endpoint                                              |
| ----------------- | --------------------------------------------------------- |
| app.datadoghq.com | GET https://api.datadoghq.com/api/v1/usage/aws_lambda     |
| us3.datadoghq.com | GET https://api.us3.datadoghq.com/api/v1/usage/aws_lambda |
| us5.datadoghq.com | GET https://api.us5.datadoghq.com/api/v1/usage/aws_lambda |
| app.datadoghq.eu  | GET https://api.datadoghq.eu/api/v1/usage/aws_lambda      |
| ap1.datadoghq.com | GET https://api.ap1.datadoghq.com/api/v1/usage/aws_lambda |
| ap2.datadoghq.com | GET https://api.ap2.datadoghq.com/api/v1/usage/aws_lambda |
| app.ddog-gov.com  | GET https://api.ddog-gov.com/api/v1/usage/aws_lambda      |
| uk1.datadoghq.com | GET Not supported in the UK1 region                       |
| us2.ddog-gov.com  | GET Not supported in the US2-FED region                   |

### Overview

Get hourly usage for Lambda.
**Note:** This endpoint has been deprecated. Hourly usage data for all products is now available in the [Get hourly usage by product family API](https://docs.datadoghq.com/api/latest/usage-metering.md#get-hourly-usage-by-product-family). Refer to [Migrating from the V1 Hourly Usage APIs to V2](https://docs.datadoghq.com/account_management/guide/hourly-usage-migration.md) for the associated migration guide.

This endpoint requires the `usage_read` permission.

OAuth apps require the `usage_read` authorization [scope](https://docs.datadoghq.com/api/latest/scopes.md#usage-metering) to access this endpoint.

### Arguments

#### Query Strings

| Field                 | Type   | Description                                                                                               |
| --------------------- | ------ | --------------------------------------------------------------------------------------------------------- |
| start_hr [*required*] | string | Datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage beginning at this hour.      |
| end_hr                | string | Datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage ending **before** this hour. |

### Response

{% tabs %}
{% tab label="200" %}
OK

{% tabs %}
{% tab label="Model" %}
Response containing the number of Lambda functions and sum of the invocations of all Lambda functions
for each hour for a given organization.

| Parent field | Field           | Type      | Description                                                                 |
| ------------ | --------------- | --------- | --------------------------------------------------------------------------- |
|              | usage           | [object]  | Get hourly usage for Lambda.                                                |
| usage        | func_count      | int64     | Contains the number of different functions for each region and AWS account. |
| usage        | hour            | date-time | The hour for the usage.                                                     |
| usage        | invocations_sum | int64     | Contains the sum of invocations of all functions.                           |
| usage        | org_name        | string    | The organization name.                                                      |
| usage        | public_id       | string    | The organization public ID.                                                 |
{% /tab %}

{% tab label="Example" %}
```json
{
  "usage": [
    {
      "func_count": "integer",
      "hour": "2019-09-19T10:00:00.000Z",
      "invocations_sum": "integer",
      "org_name": "string",
      "public_id": "string"
    }
  ]
}
```
{% /tab %}
{% /tabs %}
{% /tab %}

{% tab label="400" %}
Bad Request

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

{% tab label="403" %}
Forbidden - User is not authorized

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
# Required query arguments
export start_hr="CHANGE_ME"

# Set your Datadog site and credentials
export DD_SITE="datadoghq.com" # Or us3.datadoghq.com, us5.datadoghq.com, datadoghq.eu, ap1.datadoghq.com, ap2.datadoghq.com, ddog-gov.com
# Use a Personal Access Token or Service Access Token
export DD_BEARER_TOKEN="<PERSONAL_ACCESS_TOKEN OR SERVICE_ACCESS_TOKEN>"

curl -X GET "https://api.${DD_SITE}/api/v1/usage/aws_lambda?start_hr=${start_hr}" \
-H "Accept: application/json" \
-H "Authorization: Bearer ${DD_BEARER_TOKEN}"
```
{% /tab %}

{% tab label="Go" %}
```go
// NOTE: Frozen test fixture from tests/fixtures/api/examples/, not live SDK output.
// Get hourly usage for Lambda returns "OK" response

package main

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	"time"

	"github.com/DataDog/datadog-api-client-go/v2/api/datadog"
	"github.com/DataDog/datadog-api-client-go/v2/api/datadogV1"
)

func main() {
	ctx := datadog.NewDefaultContext(context.Background())
	configuration := datadog.NewConfiguration()
	apiClient := datadog.NewAPIClient(configuration)
	api := datadogV1.NewUsageMeteringApi(apiClient)
	resp, r, err := api.GetUsageLambda(ctx, time.Now().AddDate(0, 0, -5), *datadogV1.NewGetUsageLambdaOptionalParameters().WithEndHr(time.Now().AddDate(0, 0, -3)))

	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `UsageMeteringApi.GetUsageLambda`: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}

	responseContent, _ := json.MarshalIndent(resp, "", "  ")
	fmt.Fprintf(os.Stdout, "Response from `UsageMeteringApi.GetUsageLambda`:\n%s\n", responseContent)
}
```

#### Instructions

First [install the library and its dependencies](https://docs.datadoghq.com/api/latest.md?code-lang=go) and then save the example to `main.go` and run following commands:

```bash
DD_SITE="datadoghq.com" DD_BEARER_TOKEN="<PERSONAL_ACCESS_TOKEN OR SERVICE_ACCESS_TOKEN>" go run "main.go"
```
{% /tab %}

{% tab label="Python" %}
```python
# NOTE: Frozen test fixture from tests/fixtures/api/examples/, not live SDK output.
"""
Get hourly usage for Lambda returns "OK" response
"""

from datetime import datetime
from dateutil.relativedelta import relativedelta
from datadog_api_client import ApiClient, Configuration
from datadog_api_client.v1.api.usage_metering_api import UsageMeteringApi

configuration = Configuration()
with ApiClient(configuration) as api_client:
    api_instance = UsageMeteringApi(api_client)
    response = api_instance.get_usage_lambda(
        start_hr=(datetime.now() + relativedelta(days=-5)),
        end_hr=(datetime.now() + relativedelta(days=-3)),
    )

    print(response)
```

#### Instructions

First [install the library and its dependencies](https://docs.datadoghq.com/api/latest.md?code-lang=python) and then save the example to `example.py` and run following commands:

```bash
DD_SITE="datadoghq.com" DD_BEARER_TOKEN="<PERSONAL_ACCESS_TOKEN OR SERVICE_ACCESS_TOKEN>" python3 "example.py"
```
{% /tab %}
{% /tabs %}
