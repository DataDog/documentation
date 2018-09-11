---
title: Résoudre un monitor
type: apicontent
order: 16.6
external_redirect: /api/#resolve-monitor
---

## Résoudre un monitor

**ARGUMENTS**:

* **`resolve`** [*obligatoire*]:  
    Tableau de groupe(s) à résoudre pour un monitor_id donné, par ex.
    `{"monitor_id": "group_to_resolve"}`  
    Il prend également en charge plusieurs groupes par monitor, par exemple:
    `resolve: [{"monitor_id": "group_1"}, {"monitor_id": "group_2"}]`

