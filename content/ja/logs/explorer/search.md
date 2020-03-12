---
title: 検索
kind: documentation
description: すべてのログを検索する
aliases:
  - /ja/logs/search
further_reading:
  - link: logs/explorer/analytics
    tag: Documentation
    text: ログ分析の実行
  - link: logs/explorer/patterns
    tag: Documentation
    text: ログ内のパターン検出
  - link: logs/processing
    tag: Documentation
    text: ログの処理方法
  - link: logs/explorer/saved_views
    tag: Documentation
    text: ログエクスプローラーの自動構成
---
すべての検索パラメーターは URL の中に含まれています。URL を共有することで、ビューを共有できます。

{{< img src="logs/explorer/search_your_logs.mp4" alt="ログの検索" video="true"  >}}

## 検索構文

クエリは条件と演算子で構成されます。

条件には 2 種類あります。

* **単一条件**は、1 つの単語です (`test`、`hello` など)。

* **シーケンス**は、二重引用符で囲まれた単語のグループです (`"hello dolly"` など)。

複合クエリで複数の条件を組み合わせるには、以下のブール演算子を使用します。

|              |                                                                                                        |                              |
|--------------|--------------------------------------------------------------------------------------------------------|------------------------------|
| **演算子** | **説明**                                                                                        | **例**                  |
| `AND`        | **積**: 両方の条件を含むイベントが選択されます (何も追加しなければ、AND がデフォルトで採用されます)。 | authentication AND failure   |
| `OR`         | **和**: いずれかの条件を含むイベントが選択されます。                                             | authentication OR password   |
| `-`          | **排他**: 後続の条件はイベントに含まれません。                                                  | authentication AND -password |

### オートコンプリート

検索バーのオートコンプリート機能を使用すると、既存の値を使用してクエリを完成させることができます。

{{< img src="logs/explorer/search/search_bar_autocomplete.png" alt="検索バーのオートコンプリート"  style="width:80%;">}}

### 特殊文字のエスケープ

`+` `-` `=` `&&` `||` `>` `<` `!` `(` `)` `{` `}` `[` `]` `^` `"` `“` `”` `~` `*` `?` `:` `\`、および `/` は特殊文字と見なされ、`\` 文字を使用してエスケープする必要があります。

### 属性検索

#### メッセージ属性検索

メッセージ属性に `user=JaneDoe` を含むログを見つけるには、次の検索を使用します。

`user\=JaneDoe`

#### ファセット検索

特定の属性を検索するには、まず[それをファセットとして追加][1]し、次に `@` を追加してファセット検索を指定します。

たとえば、ファセット名が **url** で、**url** の値 www.datadoghq.com で絞り込む場合は、次のように入力します。

`@url:www.datadoghq.com`

**注**: 特殊文字を含むファセット値で検索する場合は、エスケープ処理または二重引用符が必要です。ログのファセット名にスペースが含まれる場合も同じです。ログファセットにスペースを入れるべきではありませんが、含まれている場合は、スペースをエスケープする必要があります。ファセットの名前が `user.first name` の場合、ファセット検索を行うには、`@user.first\ name:myvalue` のようにスペースをエスケープします。

例:

| 検索クエリ                                                         | 説明                                                                                                                                                         |
|----------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `@http.url_details.path:"/api/v1/test"`                              | 属性 `http.url_details.path` に `/api/v1/test` と一致するすべてのログを検索します。                                                                               |
| `@http.url:\/api\/v1\/*`                                             | 属性 `http.url` に、`/api/v1/` で始まる値を含むすべてのログを検索します。                                                                             |
| `@http.status_code:[200 TO 299] @http.url_details.path:\/api\/v1\/*` | 200 から 299 の `http.status_code` 値を含み、`http.url_details.path` 属性に `/api/v1/` で始まる値を含むすべてのログを検索します。 |

### ワイルドカード

複数文字のワイルドカード検索を実行するには、`*` 記号を次のように使用します。

* `service:web*` は、`web` で始まるサービスを持つすべてのログメッセージに一致します。
* `web*` は、`web` で始まるすべてのログメッセージに一致します。
* `*web` は、`web` で終わるすべてのログメッセージに一致します。

ワイルドカード検索は、この構文を使用してファセット内で機能します。次のクエリは、文字列 `mongo` で終わるすべてのサービスを返します。

`service:*mongo`

ワイルドカード検索は、ファセットに含まれないログのプレーンテキスト内の検索にも使用できます。次のクエリは、文字列 `NETWORK` を含むすべてのログを返します。

`*NETWORK*`

ただし、この検索条件は、ファセット内に文字列 `NETWORK` を含み、ログメッセージには含まれない場合はログを返しません。

### 数値

`<`、`>`、`<=`、または `>=` を使用して、数値属性の検索を実行します。たとえば、100ms を超える応答時間を持つすべてのログを取得するには、次のようにします。

`@http.response_time:&gt;100`

特定の範囲内にある数値属性を検索することができます。たとえば、4xx エラーをすべて取得するには、次のようにします。

`@http.status_code:[400 TO 499]`

### タグ

ログは、タグを生成する[ホスト][2]と[インテグレーション][3]からタグを引き継ぎます。これらも、ファセットとして検索で使用できます。

* `test` は文字列「test」を検索します。
* `("env:prod" OR test)` は、タグ `#env:prod` またはタグ `#test` を含むすべてのログに一致します。
* `(service:srvA OR service:srvB)` または `(service:(srvA OR srvB))` は、タグ `#service:srvA` または `#service:srvB` を含むすべてのログに一致します。
* `("env:prod" AND -"version:beta")` は、`#env:prod` を含み、`#version:beta` は含まないすべてのログに一致します。

タグが[タグのベストプラクティス][4]に従わず、`key:value` 構文も使用していない場合は、次の検索クエリを使用します。

* `tags:<MY_TAG>`

### 配列

文字列または数字の配列にファセットを追加できます。配列に含まれるすべての値がこのファセット内にリストされ、ログの検索に使用できます。

次の例では、ファセットで `Peter` 値をクリックすると、`users.names` 属性の値が `Peter` であるか、`Peter` を含む配列であるすべてのログが返されます。

{{< img src="logs/explorer/search/array_search.png" alt="配列とファセット"  style="width:80%;">}}

## 検索の保存

[保存ビュー][5]に、検索クエリ、列、対象期間、およびファセットが格納されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/explorer/facets
[2]: /ja/infrastructure
[3]: /ja/integrations/#cat-log-collection
[4]: /ja/tagging/#tags-best-practices
[5]: /ja/logs/explorer/saved_views