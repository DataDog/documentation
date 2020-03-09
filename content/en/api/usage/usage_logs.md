---
title: Get hourly usage for Logs
type: apicontent
order: 35.2
external_redirect: /api/#get-hourly-usage-for-logs
---

## Get hourly usage for logs

Get Hourly Usage For Logs.

**ARGUMENTS**:

* **`start_hr`** [*required*]:
    Datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage beginning at this hour.
* **`end_hr`** [*optional*, *default*=**1d+start_hr**]:
    Datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage ending BEFORE this hour.

**RESPONSE**:

* **`billable_ingested_bytes`**:
	Contains the number of billable log bytes ingested.
* **`ingested_events_bytes`**:
    Contains the number of log bytes ingested.
* **`indexed_events_count`**:
    Contains the number of log events indexed.
* **`hour`**:
    The hour for the usage.
