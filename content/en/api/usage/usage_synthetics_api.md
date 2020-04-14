---
title: Get hourly usage for Synthetics API Checks
type: apicontent
order: 35.7
external_redirect: /api/#get-hourly-usage-for-synthetics-api
---

## Get hourly usage for Synthetics API Checks

Get Hourly Usage For [Synthetics API Checks][1].

**ARGUMENTS**:

* **`start_hr`** [*required*]:
    Datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage beginning at this hour.
* **`end_hr`** [*optional*, *default*=**1d+start_hr**]:
    Datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage ending BEFORE this hour.

**RESPONSE**:

* **`check_calls_count`**:
	Contains the number of Synthetics API tests run.
* **`hour`**:
    The hour for the usage.

[1]: /synthetics
