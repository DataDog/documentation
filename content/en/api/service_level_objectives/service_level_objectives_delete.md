---
title: Delete a SLO
type: apicontent
order: 29.04
external_redirect: /api/#delete-a-slo
---

## Delete a SLO

Permanently delete a SLO.

If an SLO is used in a dashboard, the DELETE /v1/slo/ endpoint returns a 409 conflict error because the SLO is referenced in a dashboard.

**ARGUMENTS**:

* **`force`** [*optional*, *default*=**False**]:

    Boolean: Force delete the SLO. The SLO is deleted even if it's referenced in a dashboard.
