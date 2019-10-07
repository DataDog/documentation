---
title: Get hourly usage for Fargate
type: apicontent
order: 33.7
external_redirect: /api/#get-hourly-usage-for-fargate
---

## Get hourly usage for Fargate

Get Hourly Usage For [Fargate][1].

**ARGUMENTS**:

* **`start_hr`** [*required*]:
    datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage beginning at this hour
* **`end_hr`** [*optional*, *default*=**1d+start_hr**]:
    datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage ending BEFORE this hour

[1]: /integrations/ecs_fargate
