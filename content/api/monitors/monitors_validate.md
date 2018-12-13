---
title: Validate a monitor
type: apicontent
order: 16.11
external_redirect: /api/#validate-a-monitor
---
## Validate a monitor
##### ARGUMENTS
*   **`type`** [*required*]:  
    The [type of the monitor][1], chosen from:  

| Monitor Type | type attribute value |
| :--------    | :-------             |
| anomaly      | `query alert`        |
| apm          | `query alert`        |
| composite    | `composite`          |
| custom       | `service check`      |
| event        | `event alert`        |
| forecast     | `query alert`        |
| host         | `service check`      |
| integration  | `query alert`        |
| live process | `process alert`      |
| logs         | `log alert`          |
| metric       | `query alert`        |
| network      | `service check`      |
| outlier      | `query alert`        |
| process      | `service check`      |
    
*   **`query`** [*required*]:  
    The query defines when the monitor triggers. Query syntax depends on monitor type. See [Create a monitor][2] for details.

[1]: /monitors/monitor_types
[2]: /api/#create-a-monitor
