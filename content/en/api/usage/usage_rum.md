---
title: Get hourly usage for RUM Sessions
type: apicontent
order: 35.931
external_redirect: /api/#get-hourly-usage-for-rum-sessions
---

## Get hourly usage for RUM Sessions

Get Hourly Usage For RUM Sessions

**ARGUMENTS**:

* **`start_hr`** [*required*]:
    Datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage beginning at this hour.
* **`end_hr`** [*optional*, *default*=**1d+start_hr**]:
    Datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage ending BEFORE this hour.

**RESPONSE**:

* **`session_count`**: 
	Contains the number of RUM sessions.
* **`hour`**:
    The hour for the usage.