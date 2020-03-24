---
title: Get hourly usage for Synthetics Browser Checks
type: apicontent
order: 35.8
external_redirect: /api/#get-hourly-usage-for-synthetics-browser
---

## Get hourly usage for Synthetics Browser Checks

Get Hourly Usage For Synthetics Browser Checks.

**ARGUMENTS**:

* **`start_hr`** [*required*]:
    Datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage beginning at this hour.
* **`end_hr`** [*optional*, *default*=**1d+start_hr**]:
    Datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage ending BEFORE this hour.

**RESPONSE**:

* **`browser_check_calls_count`**:
	Contains the number of Synthetics Browser tests run.
* **`hour`**:
    The hour for the usage.
