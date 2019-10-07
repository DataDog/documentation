---
title: ホストへのタグの追加
type: apicontent
order: 30.3
external_redirect: '/api/#add-tags-to-a-host'
---
## ホストへのタグの追加
このエンドポイントを使用して、新しいタグをホストに追加できます。オプションで、タグの由来を指定できます。

##### 引数

* **`tags`** [必須]:
    ホストに適用するタグのリスト
* **`source`** [オプション、デフォルト = **users**]:
    タグのソース (例: chef、puppet など)。
    [ソース属性値のリストはこちら][1]を参照してください。

[1]: /ja/integrations/faq/list-of-api-source-attribute-value