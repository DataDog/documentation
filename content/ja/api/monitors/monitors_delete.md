---
title: モニターの削除
type: apicontent
order: 27.05
external_redirect: /api/#delete-a-monitor
---

## モニターの削除

**引数**:

モニターが別の場所で使われている場合、モニターが参照されるため、このエンドポイントはエラーを返します。

* **`force`** [*任意*, *デフォルト*=**False**]:

    Boolean: モニターを強制的に削除。このモニターは、SLO や複合条件モニターなど他のリソースから参照されていても削除されます。
