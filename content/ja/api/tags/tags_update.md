---
title: ホストタグの更新
type: apicontent
order: 32.4
external_redirect: /api/#update-host-tags
---

## ホストタグの更新

このエンドポイントを使用して、インテグレーションソース内のすべてのタグをリクエストで提供されたタグで更新/置換できます。

**引数**:

* **`tags`** [必須]:
    タグのリスト
* **`source`** [オプション、デフォルト = **users**]:
    タグのソース (例: chef、puppet など)。

