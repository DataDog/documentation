---
title: Get Usage across your Multi-Org Account
type: apicontent
order: 22.4
external_redirect: /api/#get-usage-across-your-multi-org-account
---

## Get Usage across your Multi-Org Account

Get Usage across your Multi-Org Account

##### Arguments
* **`start_month`** [*required*]:  
    Datetime in ISO-8601 format, UTC, precise to month: [YYYY-MM] for usage beginning in this month. Maximum of 15 months ago.
* **`end_month`** [*optional*, *default*=**current_month-3d**]:
    Datetime in ISO-8601 format, UTC, precise to month: [YYYY-MM] for usage ending this month.
* **`include_org_details`** [*optional*, *default*=**true**]:
    Include usage summaries for each sub-org.