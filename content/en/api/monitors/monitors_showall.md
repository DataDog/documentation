---
title: Get all monitor details
type: apicontent
order: 26.05
external_redirect: /api/#get-all-monitor-details
---

## Get all monitor details

**ARGUMENTS**:

* **`group_states`** [*optional*, *default*=**None**]:
    If this argument is set, the returned data includes additional information (if available) regarding the specified group states, including the last notification timestamp, last resolution timestamp and details about the last time the monitor was triggered. The argument should include a string list indicating what, if any, group states to include. Choose one or more from 'all', 'alert', 'warn', or 'no data'. Example: 'alert,warn'
* **`name`** [*optional*, default=**None**]:
    A string to filter monitors by name
* **`tags`** [*optional*, *default*=**None**]:
    A comma separated list indicating what tags, if any, should be used to filter the list of monitorsby scope, e.g. `host:host0`. For more information, see the `tags` parameter for the appropriate `query` argument in the [Create a monitor](#create-a-monitor) section above.
* **`monitor_tags`** [*optional*, *default*=**None**]:
    A comma separated list indicating what service and/or custom tags, if any, should be used to filter the list of monitors. Tags created in the Datadog UI automatically have the **service** key prepended (e.g. `service:my-app`)
* **`with_downtimes`** [*optional*, *default* = **true**]:
    If this argument is set to `true`, then the returned data includes all current downtimes for each monitor.
* **`page`** [*optional*, *default* = **0**]:
    The page to start paginating from. If this argument is not specified, the request returns all monitors without pagination.
* **`page_size`** [*optional*, *default*=**100**]:
    The number of monitors to return per page. If the `page` argument is not specified, the default behavior returns all monitors without a `page_size` limit. However, if `page` is specified and `page_size` is not, the argument defaults to `100`.
