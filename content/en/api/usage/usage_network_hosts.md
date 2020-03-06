---
title: Get hourly usage for Network Hosts
type: apicontent
order: 35.92
external_redirect: /api/#get-hourly-usage-for-network-hosts
---

## Get hourly usage for Network Hosts

Get Hourly Usage For Network Hosts.

**ARGUMENTS**:

* **`start_hr`** [*required*]:
    datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage beginning at this hour.
* **`end_hr`** [*optional*, *default*=**1d+start_hr**]:
    datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage ending BEFORE this hour.

**RESPONSE**:

* **`host_count`**:
	Contains the number of NPM hosts active.
* **`hour`**:
    The hour for the usage.
