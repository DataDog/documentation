---
title: テストの開始/一時停止
type: apicontent
order: 30.2
external_redirect: "/api/#status-test"
---

## テストの開始/一時停止

このメソッドを使用して、既存の Synthetics テストを開始または一時停止します。

##### 引数

*   **`new_status`** - 必須 - テストを開始するか、一時停止するかを定義するキー/値ペア。有効な値は `live` と `paused` です。ステータスが変更された場合は `true` が返され、同じままの場合は `false` が返されます。
