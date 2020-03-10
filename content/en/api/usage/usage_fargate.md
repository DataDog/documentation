---
title: Get hourly usage for Fargate 
type: apicontent
order: 35.9
external_redirect: /api/#get-hourly-usage-for-fargate
---

## Get hourly usage for Fargate

Get Hourly Usage For [Fargate][1].

**ARGUMENTS**:

* **`start_hr`** [*required*]:
    Datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage beginning at this hour.
* **`end_hr`** [*optional*, *default*=**1d+start_hr**]:
    Datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage ending BEFORE this hour.

**RESPONSE**:

* **`tasks_count`**:
    Contains the number of Fargate tasks run.
* **`hour`**:
	The hour for the usage.

[1]: /integrations/ecs_fargate
