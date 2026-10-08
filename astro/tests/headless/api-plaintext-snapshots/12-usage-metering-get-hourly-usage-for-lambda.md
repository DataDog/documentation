---
title: Get hourly usage for Lambda
description: "Get hourly usage for Lambda. Note: This endpoint has been deprecated. Hourly usage data for all products is now available in the Get hourly usage by…"
breadcrumbs: Docs > API > Get hourly usage for Lambda
---

> For the complete documentation index, see [llms.txt](https://docs.datadoghq.com/llms.txt).

# Get hourly usage for Lambda

## v1 (latest)

{% alert level="warning" %}
This endpoint is deprecated.
{% /alert %}

Get hourly usage for Lambda.
**Note:** This endpoint has been deprecated. Hourly usage data for all products is now available in the [Get hourly usage by product family API](https://docs.datadoghq.com/api/latest/usage-metering/#get-hourly-usage-by-product-family). Refer to [Migrating from the V1 Hourly Usage APIs to V2](https://docs.datadoghq.com/account_management/guide/hourly-usage-migration/) for the associated migration guide.

| Datadog site      | API endpoint                                                  |
| ----------------- | ------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/usage/aws_lambda     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/usage/aws_lambda |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/usage/aws_lambda |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/usage/aws_lambda      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/usage/aws_lambda |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/usage/aws_lambda |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/usage/aws_lambda      |

This endpoint requires the `usage_read` permission.

OAuth apps require the `usage_read` authorization scope to access this endpoint.

### Arguments

#### Query Strings

| Parent field | Field                 | Type   | Description                                                                                               |
| ------------ | --------------------- | ------ | --------------------------------------------------------------------------------------------------------- |
|              | start_hr [*required*] | string | Datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage beginning at this hour.      |
|              | end_hr                | string | Datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage ending **before** this hour. |

### Response

{% tabs %}
{% tab label="200" %}
OK
{% /tab %}

{% tab label="400" %}
Bad Request
{% /tab %}

{% tab label="403" %}
Forbidden - User is not authorized
{% /tab %}

{% tab label="429" %}
Too many requests
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

curl -X GET "https://api.datadoghq.com/api/v1/usage/aws_lambda?start_hr=${START_HR}" \
-H "Authorization: Bearer ${DD_BEARER_TOKEN}" \
-H "Accept: application/json"
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

**Instructions**

First [install the library and its dependencies](/api/latest/?code-lang=python) and then save the example to `example.py` and run following commands:

```bash
DD_SITE="datadoghq.com" DD_BEARER_TOKEN="<PERSONAL_ACCESS_TOKEN OR SERVICE_ACCESS_TOKEN>" python3 "example.py"
```
{% /tab %}
{% /tabs %}
