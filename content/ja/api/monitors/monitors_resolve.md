---
title: モニターの解決
type: apicontent
order: 27.06
external_redirect: /api/#resolve-monitor
---

## モニターの解決

##### 引数
* **`resolve`** [必須]:
    特定の monitor_id に対して解決するグループの配列。例:
    `{"monitor_id": "group_to_resolve"}`

    1 つのモニターで複数のグループがサポートされます。例:
    `resolve: [{"monitor_id": "group_1"}, {"monitor_id": "group_2"}]`

    擬似グループ `ALL_GROUPS` を使用して、トリガーされたすべてのグループを解決することもできます。
    `resolve: [{"monitor_id": "ALL_GROUPS"}]`
