---
title: Get hourly usage for Analyzed Logs
type: apicontent
order: 35.932
external_redirect: /api/#get-hourly-usage-for-analyzed-logs
---

## Get hourly usage for Analyzed Logs

Get Hourly Usage For Analyzed Logs

**ARGUMENTS**:

* **`start_hr`** [*required*]:
    Datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage beginning at this hour.
* **`end_hr`** [*optional*, *default*=**1d+start_hr**]:
    Datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage ending BEFORE this hour.

**RESPONSE**:

* **`session_count`**: 
	Contains the sum of analyzed logs.
* **`hour`**:
    The hour for the usage.