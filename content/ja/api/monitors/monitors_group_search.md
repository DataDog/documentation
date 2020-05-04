---
title: モニターグループの検索
type: apicontent
order: 27.14
external_redirect: '/api/#monitors-group-search'
---
## モニターグループの検索

モニターグループの詳細を検索および絞り込みをします。

**引数**:

* **`query`** [オプション]:

    [モニターの管理ページ][1]で検索クエリを入力した後、そのページの URL に含まれるクエリパラメーター値をこのパラメーターの値として使用します。詳細については、[モニター管理に関するドキュメント][2]のページを参照してください。

* **`page`** [オプション、デフォルト = **0**]:

    ページ区切りする場合の開始ページ。

* **`per_page`** [オプション、デフォルト = **30**]:

    1 ページで返されるモニターの数。

* **`sort`** [オプション、デフォルト = **null**]:

    ソート順序を示すカンマ区切りの文字列 (例: `name,asc`)。サポートされているフィールドは次のとおりです。

    * `name`
    * `status`
    * `tags`

[1]: https://app.datadoghq.com/monitors/manage
[2]: /ja/monitors/manage_monitor/#find-the-monitors