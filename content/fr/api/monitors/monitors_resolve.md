---
title: Résoudre un monitor
type: apicontent
order: 26.06
external_redirect: /api/#resoudre-un-monitor
---

## Résoudre un monitor

**ARGUMENTS**:

* **`resolve`** [*obligatoire*] :
    tableau de groupes à résoudre pour un monitor_id donné, p. ex. :
    `{"monitor_id": "group_to_resolve"}`

    Il est possible de spécifier plusieurs groupes par monitor, p. ex. :
    `resolve: [{"monitor_id": "group_1"}, {"monitor_id": "group_2"}]`

    Il est également possible de résoudre tous les groupes déclenchés à l'aide du pseudo-groupe `ALL_GROUPS` :
    `resolve: [{"monitor_id": "ALL_GROUPS"}]`
