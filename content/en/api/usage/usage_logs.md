---
title: Get hourly usage for logs
type: apicontent
order: 34.2
external_redirect: /api/#get-hourly-usage-for-logs
---

## Get hourly usage for logs

Get Hourly Usage For Logs.

**ARGUMENTS**:

* **`start_hr`** [*required*]:
    datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage beginning at this hour
* **`end_hr`** [*optional*, *default*=**1d+start_hr**]:
    datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage ending BEFORE this hour

**RESPONSE**:

* **`ingested_events_bytes`**:
    Contains the number of log bytes ingested.
* **`indexed_events_count`**:
    Contains the number of log events indexed.
* **`hour`**:
    The hour for the usage.
