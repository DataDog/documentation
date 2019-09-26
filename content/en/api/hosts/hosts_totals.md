---
title: Host totals
type: apicontent
order: 14.2
external_redirect: /api/#host-totals
---

## Host totals
This endpoint returns the total number of active and up hosts in your Datadog account. Active means the host has reported in the past hour, and up means it has reported in the past two hours.

**ARGUMENTS**:

* **`from`** [*optional*, *default*=**now - 2 hours**]:
    Number of seconds since UNIX epoch from which you want to get the total number of active and up hosts.
