---
title: ホストタグの更新
type: apicontent
order: 30.4
external_redirect: '/api/#update-host-tags'
---
## ホストタグの更新
このエンドポイントを使用して、インテグレーションソース内のすべてのタグをリクエストで提供されたタグで更新/置換できます。

##### 引数
* **`tags`** [必須]:
    タグのリスト
* **`source`** [オプション、デフォルト = **users**]:
    タグのソース (例: chef、puppet など)。
    [ソース属性値のリストはこちら][1]を参照してください。

[1]: /ja/integrations/faq/list-of-api-source-attribute-value