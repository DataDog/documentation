---
title: モニターのミュート
type: apicontent
order: 26.09
external_redirect: /api/#mute-a-monitor
---

## モニターのミュート

##### 引数
* **`scope`** [オプション、デフォルト = **None**]:
    ミュートする対象のスコープ。例: **role:db**。
    たとえば、アラートが `{host}` でグループ化されている場合は、`host:app1` をミュートできます。
* **`end`** [オプション、デフォルト = **None**]:
    ミュートの終了時間を示す POSIX タイムスタンプ。
