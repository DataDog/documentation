---
title: Get usage across your multi-org account
type: apicontent
order: 35.8
external_redirect: /api/#get-usage-across-your-multi-org-account
---

## Get usage across your multi-org account

Get usage across your multi-org account. This action may **only** be processed on the parent organization. Using this call on a child organization will result in `{"errors": ["Access was denied to this resource."]}`.

**ARGUMENTS**:

* **`start_month`** [*required*]:
    Datetime in ISO-8601 format, UTC, precise to month: [YYYY-MM] for usage beginning in this month. Maximum of 15 months ago.
* **`end_month`** [*optional*, *default*=**current_month-3d**]:
    Datetime in ISO-8601 format, UTC, precise to month: [YYYY-MM] for usage ending this month.
* **`include_org_details`** [*optional*, *default*=**true**]:
    Include usage summaries for each sub-org.
