---
title: Get hourly usage for Lambda
type: apicontent
order: 35.91
external_redirect: /api/#get-hourly-usage-for-lambda
---

## Get hourly usage for Lambda

Get Hourly Usage For Lambda.

**ARGUMENTS**:

* **`start_hr`** [*required*]:
    Datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage beginning at this hour.
* **`end_hr`** [*optional*, *default*=**1d+start_hr**]:
    Datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage ending BEFORE this hour.

**RESPONSE**:

* **`func_count`**:
	Contains the number of different functions for each region and AWS account.
* **`invocations_sum`**:
	Contains the sum of invocations of all functions.
* **`hour`**:
    The hour for the usage.
