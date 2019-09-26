---
title: Get a monitor's details
type: apicontent
order: 26.02
external_redirect: /api/#get-a-monitor-s-details
---

## Get a monitor's details

**ARGUMENTS**:

* **`group_states`** [*optional*, *default*=**None**]:
    If this argument is set, the returned data includes additional information (if available) regarding the specified group states, including the last notification timestamp, last resolution timestamp and details about the last time the monitor was triggered. The argument should include a string list indicating what, if any, group states to include. Choose one or more from **all**, **alert**, **warn**, or **no data**. Example: 'alert,warn'"
