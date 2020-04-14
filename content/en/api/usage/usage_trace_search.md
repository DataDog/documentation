---
title: Get hourly usage for App Analytics
type: apicontent
order: 35.6
external_redirect: /api/#get-hourly-usage-for-app-analytics
---

## Get hourly usage for App Analytics

Get hourly usage For App Analytics.

**ARGUMENTS**:

* **`start_hr`** [*required*]:
    Datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage beginning at this hour.
* **`end_hr`** [*optional*, *default*=**1d+start_hr**]:
    Datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage ending BEFORE this hour.

**RESPONSE**:

* **`indexed_events_count`**:
    Contains the number of Analyzed Spans indexed.
* **`hour`**:
    The hour for the usage.
