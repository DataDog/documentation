---
title: Get hourly usage for Network Flows
type: apicontent
order: 35.93
external_redirect: /api/#get-hourly-usage-for-network-flows
---

## Get hourly usage for Network Flows

Get Hourly Usage For Network Flows.

**ARGUMENTS**:

* **`start_hr`** [*required*]:
    datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage beginning at this hour.
* **`end_hr`** [*optional*, *default*=**1d+start_hr**]:
    datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage ending BEFORE this hour.

**RESPONSE**:

* **`indexed_events_count`**:
	Contains the number of netflow events indexed.
* **`hour`**:
    The hour for the usage.
