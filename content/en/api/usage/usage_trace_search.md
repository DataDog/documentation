---
title: Get hourly usage for Trace Search
type: apicontent
order: 35.5
external_redirect: /api/#get-hourly-usage-for-trace-search
---

## Get hourly usage for Trace Search

Get hourly usage For Trace Search.

**ARGUMENTS**:

* **`start_hr`** [*required*]:
    datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage beginning at this hour
* **`end_hr`** [*optional*, *default*=**1d+start_hr**]:
    datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage ending BEFORE this hour

**RESPONSE**:

* **`indexed_events_count`**:
    Contains the number of Analyzed Spans indexed.
* **`hour`**:
    The hour for the usage.
