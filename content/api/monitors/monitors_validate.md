---
title: Validate a monitor
type: apicontent
order: 16.11
---
## Validate a monitor
##### ARGUMENTS
*   **`type`** [*required*]:  
    The [type of the monitor][1], chosen from:  
    *   `anomaly`
    *   `apm`
    *   `composite`
    *   `custom`
    *   `event`
    *   `forecast`
    *   `host`
    *   `integration`
    *   `log`
    *   `metric`
    *   `network`
    *   `outlier`
    *   `process`
    
*   **`query`** [*required*]:  
    The query defines when the monitor triggers. Query syntax depends on monitor type. See [Create a monitor][2] for details.

[1]: /monitors/monitor_types/
[2]: /api/#create-a-monitor