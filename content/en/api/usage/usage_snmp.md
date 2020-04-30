---
title: Get hourly usage for SNMP Devices
type: apicontent
order: 35.933
external_redirect: /api/#get-hourly-usage-for-snmp-devices
---

## Get hourly usage for SNMP Devices

Get Hourly Usage For SNMP Devices

**ARGUMENTS**:

* **`start_hr`** [*required*]:
    Datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage beginning at this hour.
* **`end_hr`** [*optional*, *default*=**1d+start_hr**]:
    Datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage ending BEFORE this hour.

**RESPONSE**:

* **`devices_count`**:
	Contains the sum of SNMP devices.
* **`hour`**:
    The hour for the usage.
