---
title: Resolve monitor
type: apicontent
order: 26.06
external_redirect: /api/#resolve-monitor
---

## Resolve monitor

**ARGUMENTS**:

* **`resolve`** [*required*]:
    Array of group(s) to resolve for a given monitor_id, e.g.:
    `{"monitor_id": "group_to_resolve"}`

    It supports multiple groups per monitor, e.g.:
    `resolve: [{"monitor_id": "group_1"}, {"monitor_id": "group_2"}]`

    It can also resolve all triggered groups with the pseudo-group `ALL_GROUPS`:
    `resolve: [{"monitor_id": "ALL_GROUPS"}]`
