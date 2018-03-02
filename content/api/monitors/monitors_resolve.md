---
title: Resolve monitor
type: apicontent
order: 15.6
external_redirect: /api/#resolve-monitor
---

## Resolve monitor

##### ARGUMENTS
* **`resolve`** [*required*]:  
    Array of group(s) to resolve for a given monitor_id e.g.  
    `{"monitor_id": "group_to_resolve"}`  
    It supports multiple groups per monitor as well eg:  
    `resolve: [{"monitor_id": "group_1"}, {"monitor_id": "group_2"}]`