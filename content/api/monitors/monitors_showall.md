---
title: Get All Monitor Details
type: apicontent
order: 8.5
---
## Get All Monitor Details
##### ARGUMENTS
* `group_states` [*optional*, *default*=**None**]:  
    If this argument is set, the returned data will include additional information (if available) regarding the specified group states, including the last notification timestamp, last resolution timestamp and details about the last time the monitor was triggered. The argument should include a string list indicating what, if any, group states to include. Choose one or more from 'all', 'alert', 'warn', or 'no data'. Example: 'alert,warn'
* `name` [*required*]:  
    A string to filter monitors by name
* `tags` [*optional*, *default*=**None**]:  
    A comma separated list indicating what tags, if any, should be used to filter the list of monitorsby scope, e.g. `host:host0`. For more information, see the `tags` parameter for the appropriate `query` argument in the [Create a monitor](#monitor-create) section above.
* `monitor_tags` [*optional*, *default*=**None**]:  
    A comma separated list indicating what service and/or custom tags, if any, should be used to filter the list of monitors. Tags created in the Datadog UI will automatically have the **service** key prepended (e.g. `service:my-app`)
* `with_downtimes` [*optional*, *default* = **true**]:  
    If this argument is set to `true`, then the returned data will include all current downtimes for each monitor.