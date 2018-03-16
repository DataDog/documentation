---
title: Get Usage across your Multi-Org Account
type: apicontent
order: 22.3
external_redirect: /api/#get-usage-across-your-multi-org-account
---
#
## Get Multi-Org Monthly Usage

Get Multi-Org Monthly Usage

##### Arguments
* **`start_month`** [*required*]:  
    datetime in ISO-8601 format, UTC, precise to month: [YYYY-MM] for usage beginning in this month. Maximum of 15 
    months ago.
* **`end_month`** [*optional*, *default*=**current_month-3d**]:
    datetime in ISO-8601 format, UTC, precise to month: [YYYY-MM] for usage ending this month.
* **`include_org_details`** [*optional*, *default*=**true**]:
    To include usage summaries for each sub-org.
