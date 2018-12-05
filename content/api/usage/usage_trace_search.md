---
title: Get hourly usage for Trace Search
type: apicontent
order: 23.5
external_redirect: /api/#get-hourly-usage-for-trace-search
---

## Get hourly usage for Trace Search

Get hourly usage For Trace Search.

##### Arguments
* **`start_hr`** [*required*]:
    datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage beginning at this hour
* **`end_hr`** [*optional*, *default*=**1d+start_hr**]:
    datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage ending BEFORE this hour

##### Response

* **`indexed_events_count`**:
    Contains the number of Trace Search events indexed.
* **`hour`**:
    The hour for the usage.
