---
title: Edit a monitor
type: apicontent
order: 26.03
external_redirect: /api/#edit-a-monitor
---

## Edit A Monitor

**ARGUMENTS**:

* **`query`** [*required, optional on edit*]:
    The metric query to alert on.
* **`name`** [*required, optional on edit*]:
    The name of the monitor.
* **`message`** [*optional*, *default*=**dynamic, based on query**]:
    A message to include with notifications for this monitor. Email notifications can be sent to specific users by using the same '@username' notation as events.
* **`options`** [*optional*, *default*=**{}**]:
    Refer to the create monitor documentation for details on the available options.
* **`tags`** [*optional*, *default*=**None**]:
    A list of tags to associate with your monitor. This can help you categorize and filter monitors
