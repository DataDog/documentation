---
title: Delete a monitor
type: apicontent
order: 27.05
external_redirect: /api/#delete-a-monitor
---

## Delete a monitor

**ARGUMENTS**:

If a monitor is used elsewhere, this endpoint returns an error because the monitor is referenced.

* **`force`** [*optional*, *default*=**False**]:

    Boolean: Force delete the monitor. The monitor is deleted even if it's referenced by other resources (e.g. SLO, composite monitor).
