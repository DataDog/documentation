---
title: Delete a Service Level Objective
type: apicontent
order: 29.04
external_redirect: /api/#delete-a-service-level-objective
---

## Delete a Service Level Objective

Permanently delete a SLO.

If an SLO is used in a dashboard, the DELETE /v1/slo/ endpoint returns a 409 conflict error because the SLO is referenced in a dashboard.

**ARGUMENTS**:

* **`force`** [*optional*, *default*=**False**]:

    Boolean: Force delete the SLO. The SLO is deleted even if it's referenced in a dashboard.
