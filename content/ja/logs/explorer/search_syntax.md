---
aliases:
- /ja/logs/search
- /ja/logs/search-syntax
- /ja/logs/explorer/search/
- /ja/logs/search_syntax/
description: すべてのログを検索する
further_reading:
- link: /logs/explorer/#visualize
  tag: ドキュメント
  text: ログ分析の実行
- link: /logs/explorer/#patterns
  tag: ドキュメント
  text: ログ内のパターン検出
- link: /logs/log_configuration/processors
  tag: ドキュメント
  text: ログの処理方法
- link: /logs/explorer/saved_views/
  tag: ドキュメント
  text: ログエクスプローラーの自動構成
kind: documentation
title: ログ検索構文
---

## 概要

クエリフィルターは条件と演算子で構成されます。

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

## オートコンプリート

検索バーのオートコンプリート機能を使用すると、既存の値を使用してクエリを完成させることができます。

{{< img src="logs/explorer/search/search_bar_autocomplete.jpg" alt="検索バーのオートコンプリート " style="width:80%;">}}

## 特殊文字のエスケープ

次の文字は特殊文字とみなされます:  `+` `-` `=` `&&` `||` `>` `<` `!` `(` `)` `{` `}` `[` `]` `^` `"` `“` `”` `~` `*` `?` `:` `\` `/` は、`\` 文字でエスケープすることが必要です。ログメッセージから特殊文字を検索することはできません。しかし、特殊文字が属性の中にある場合は、検索することができます。特殊文字を検索するには、[grok parser][1] で特殊文字を属性にパースし、その属性を含むログを検索してください。


## 属性検索

{{< site-region region="gov,us3,us5" >}}
特定の属性を検索するには、まず[それをファセットとして追加][1]し、次に `@` を追加してファセット検索を指定します。

たとえば、属性名が **url** で、**url** の値 `www.datadoghq.com` で絞り込む場合は、次のように入力します。

```
@url:www.datadoghq.com
```

**注**:

1. ファセット検索では大文字と小文字が区別されます。大文字と小文字を区別したくない場合はフリーテキスト検索を使用してください。または、Grok パーサーでのパース実行中に小文字フィルターを適用すれば、文字の種類に関わらない検索結果を得ることができます。

2. 特殊文字を含むファセット値を検索するには、エスケープ処理または二重引用符が必要です。
たとえば、値が `hello:world` のファセット `my_facet` は、`@my_facet:hello\:world` または `@my_facet:"hello:world"` を使用して検索します。
単一の特殊文字またはスペースに一致させるには、`?` ワイルドカードを使用します。たとえば、値が `hello world` のファセット `my_facet` は、`@my_facet:hello?world` を使用して検索します。

[1]: /ja/logs/explorer/facets/

{{< /site-region >}}
{{< site-region region="us,eu" >}}
特定の属性で検索するには、`@` を付けて属性検索を指定します。

たとえば、属性名が **url** で、**url** の値 `www.datadoghq.com` で絞り込む場合は、次のように入力します。

```
@url:www.datadoghq.com
```


**注**:

1. 属性やタグを検索するためのファセットの定義は**不要です**。

2. 属性検索では大文字と小文字が区別されます。大文字と小文字を区別したくない場合はフリーテキスト検索を使用してください。または、Grok パーサーでのパース実行中に `lowercase` フィルターを適用すれば、文字の種類に関わらない検索結果を得ることができます。

3. 特殊文字を含む属性値を検索するには、エスケープ処理または二重引用符が必要です。
たとえば、値が `hello:world` の属性 `my_attribute` は、`@my_attribute:hello\:world` または `@my_attribute:"hello:world"` を使用して検索します。
単一の特殊文字またはスペースに一致させるには、`?` ワイルドカードを使用します。たとえば、値が `hello world` の属性 `my_attribute` は、`@my_attribute:hello?world` を使用して検索します。
{{< /site-region >}}

例:

| 検索クエリ                                                         | 説明                                                                                                                                                         |
|----------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `@http.url_details.path:"/api/v1/test"`                              | 属性 `http.url_details.path` に `/api/v1/test` と一致するすべてのログを検索します。                                                                               |
| `@http.url:\/api\/v1\/*`                                             | 属性 `http.url` に、`/api/v1/` で始まる値を含むすべてのログを検索します。                                                                             |
| `@http.status_code:[200 TO 299] @http.url_details.path:\/api\/v1\/*` | 200 から 299 の `http.status_code` 値を含み、`http.url_details.path` 属性に `/api/v1/` で始まる値を含むすべてのログを検索します。 |

## ワイルドカード

### 複数文字のワイルドカード

複数文字のワイルドカード検索を実行するには、`*` 記号を次のように使用します。

* `service:web*` は、`web` で始まるサービスを持つすべてのログメッセージに一致します。
* `web*` は、`web` で始まるすべてのログメッセージに一致します。
* `*web` は、`web` で終わるすべてのログメッセージに一致します。

**注**: ワイルドカードは、二重引用符の外側にあるワイルドカードとしてのみ機能します。例えば、`”*test*”` は、メッセージの中に `*test*` という文字列があるログにマッチします。`*test*` は、メッセージのどこかに test という文字列を持つログにマッチします。

{{< site-region region="gov,us3,us5" >}}
ワイルドカード検索は、この構文を使用してファセット内で機能します。次のクエリは、文字列 `mongo` で終わるすべてのサービスを返します。
<p> </p>
{{< /site-region >}}

{{< site-region region="us,eu" >}}
ワイルドカード検索は、この構文を使用してタグと属性 (ファセットの有無を問わず) 内で機能します。次のクエリは、文字列 `mongo` で終わるすべてのサービスを返します:
<p> </p>
{{< /site-region >}}
<p></p>

```
service:*mongo
```

ワイルドカード検索は、ファセットに含まれないログのプレーンテキスト内の検索にも使用できます。次のクエリは、文字列 `NETWORK` を含むすべてのログを返します。

```
*NETWORK*
```

ただし、この検索条件は、ファセット内に文字列 `NETWORK` を含み、ログメッセージには含まれない場合はログを返しません。

### ワイルドカードを検索

{{< site-region region="gov,us3,us5" >}}
特殊文字を含むファセット値を検索する場合、またはエスケープまたは二重引用符を必要とする場合は、`?` ワイルドカードを使用して単一の特殊文字またはスペースに一致させます。たとえば、値が `hello world` のファセット `my_facet` を検索するには `@my_facet:hello?world` を使用します。
<p> </p>
{{< /site-region >}}

{{< site-region region="us,eu" >}}
特殊文字を含む属性やタグ値を検索する場合、またはエスケープまたは二重引用符を必要とする場合は、`?` ワイルドカードを使用して単一の特殊文字またはスペースに一致させます。たとえば、値が `hello world` の属性 `my_attribute` を検索するには `@my_attribute:hello?world` を使用します。
<p> </p>
{{< /site-region >}}

## Numerical values

数値属性で検索するには、まず[ファセットとして追加][2]します。次に、数値演算子 (`<`、`>`、`<=`、または `>=`) を使用して、数値ファセットの検索を行うことができます。
例えば、応答時間が 100ms 以上のログをすべて検索するには、次のようにします。
<p> </p>

```
@http.response_time:>100
```

特定の範囲内にある数値属性を検索することができます。たとえば、4xx エラーをすべて取得するには、次のようにします。

```
@http.status_code:[400 TO 499]
```

## タグ

ログは、タグを生成する[ホスト][3]と[インテグレーション][4]からタグを引き継ぎます。これらも、ファセットとして検索で使用できます。

* `test` は文字列「test」を検索します。
* `env:(prod OR test)` は、タグ `env:prod` またはタグ `env:test` を含むすべてのログに一致します。
* `(env:prod AND -version:beta)` は、タグ `env:prod` を含み、タグ `version:beta` は含まないすべてのログに一致します。

タグが[タグのベストプラクティス][5]に従わず、`key:value` 構文も使用していない場合は、次の検索クエリを使用します。

* `tags:<MY_TAG>`

## 配列

次の例では、ファセットで `Peter` 値をクリックすると、`users.names` 属性の値が `Peter` であるか、`Peter` を含む配列であるすべてのログが返されます。

{{< img src="logs/explorer/search/array_search.png" alt="配列とファセット" style="width:80%;">}}

{{< site-region region="us,eu" >}}

**注**: 同等の構文を使用して、検索をファセットではない配列属性にも使用することができます。

以下の例では、Windows 用の CloudWatch ログは、`@Event.EventData.Data` の下に JSON オブジェクトの配列が含まれています。JSON オブジェクトの配列にファセットを作成することはできませんが、以下の構文で検索することができます。

* `@Event.EventData.Data.Name:ObjectServer` はキー`Name` と値 `ObjectServer` ですべてのログに一致します。

{{< img src="logs/explorer/search/facetless_query_json_arrray2.png" alt="JSON オブジェクト配列上のファセットなしクエリ" style="width:80%;">}}
<p> </p>
{{< /site-region >}}

## 検索の保存

[保存ビュー][6]に、検索クエリ、列、対象期間、およびファセットが格納されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/log_configuration/parsing
[2]: /ja/logs/explorer/facets/
[3]: /ja/infrastructure/
[4]: /ja/integrations/#cat-log-collection
[5]: /ja/getting_started/tagging/#tags-best-practices
[6]: /ja/logs/explorer/saved_views/