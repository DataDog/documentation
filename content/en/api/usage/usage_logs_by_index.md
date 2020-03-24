---
title: Get hourly usage for Logs by Index
type: apicontent
order: 35.3
external_redirect: /api/#get-hourly-usage-for-logs-by-index
---

## Get hourly usage for Logs by Index

Get Hourly Usage For Logs By Index

**ARGUMENTS**:

* **`start_hr`** [*required*]:
    Datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage beginning at this hour.
* **`end_hr`** [*optional*, *default*=**1d+start_hr**]:
    Datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage ending BEFORE this hour.
* **`index_name`** [*optional*, *default*=**All**]:
    Comma-separated list of log index names.

**RESPONSE**:

* **`index_id`**:
	The index ID for this usage.
* **`index_name`**:
	The user specified name for this index ID.
* **`retention`**:
	The retention period (in days) for this index ID.
* **`event_count`**:
	The total number of indexed logs for the queried hour.
* **`hour`**:
	The hour for the usage.

