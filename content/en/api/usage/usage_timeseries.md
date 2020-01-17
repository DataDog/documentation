---
title: Get hourly usage for custom metrics
type: apicontent
order: 35.3
external_redirect: /api/#get-hourly-usage-for-custom-metrics
---

## Get hourly usage for custom metrics

Get Hourly Usage For [Custom Metrics][1].

**ARGUMENTS**:

* **`start_hr`** [*required*]:
    Datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage beginning at this hour
* **`end_hr`** [*optional*, *default*=**1d+start_hr**]:
    Datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage ending BEFORE this hour

[1]: /developers/metrics/custom_metrics
