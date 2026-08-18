---
aliases:
- /ja/logs/search-syntax
- /ja/logs/search_syntax/
description: すべてのログを検索します。
further_reading:
- link: /getting_started/search/
  tag: ドキュメント
  text: Datadog での検索の開始
- link: /logs/explorer/#visualize
  tag: ドキュメント
  text: ログを視覚化する方法
- link: /logs/explorer/#patterns
  tag: ドキュメント
  text: ログ内のパターンの検出
- link: /logs/log_configuration/processors
  tag: ドキュメント
  text: ログの処理方法
- link: /logs/explorer/saved_views/
  tag: ドキュメント
  text: 保存済みビューについて
- link: /logs/explorer/calculated_fields/formulas
  tag: ドキュメント
  text: 計算フィールドの数式について詳しく学ぶ
- link: https://learn.datadoghq.com/courses/log-explorer
  tag: ラーニングセンター
  text: ログエクスプローラーの概要
title: ログ検索構文
---
## 概要 {#overview}

クエリフィルターは条件と演算子で構成されます。

条件には 2 種類あります。

* **単一用語**は、`test` や `hello` のような単語です。

* **シーケンス**は、二重引用符で囲まれた単語のグループです。たとえば、`"hello dolly"` のようなものです。

複合クエリで複数の条件を組み合わせるには、以下の大文字と小文字を区別するブール演算子を使用します。

|              |                                                                                                        |                              |
|--------------|--------------------------------------------------------------------------------------------------------|------------------------------|
| **演算子** | **説明**                                                                                        | **例**                  |
| `AND`        | **AND 条件**:  両方の用語が選択されたイベントに含まれます (何も追加しなければ、AND がデフォルト)| 認証 AND 失敗|
| `OR`         | **OR 条件**:  いずれかの用語が選択されたイベントに含まれます | 認証 OR パスワード|
| `-`          | **除外**:  以下の用語はイベントに含まれません (個々の生テキスト検索に適用されます)| 認証 AND -パスワード|

## 全文検索 {#full-text-search}

<div class="alert alert-danger">全文検索機能は、Log Managementでのみ利用可能で、ログモニター、ダッシュボード、およびノートブックのクエリで機能します。全文検索構文は、インデックスフィルター、アーカイブフィルター、ログパイプラインフィルター、再水和フィルター、または Live Tail で定義する際には使用できません。 </div>

構文 `*:search_term` を使用して、ログメッセージを含むすべてのログ属性にわたって全文検索を実行します。

### 単一の用語の例 {#single-term-example}

| 検索構文 | 検索タイプ | 説明 |
| ------------- | ----------- | --------------------------------------------------------- |
| `*:hello`     | 全文   | すべてのログ属性から正確な文字列 `hello` を検索します。|
| `hello`       | 自由テキスト   | 正確な文字列 `hello` を検索するために、`message`、`@title`、`@error.message`、および `@error.stack` の属性だけを検索します。      |

### ワイルドカードを使った検索例 {#search-term-with-wildcard-example}

| 検索構文 | 検索タイプ | 説明 |
| ------------- | ----------- | ------------------------------------------------------------------------------------------- |
| `*:hello`     | 全文   | すべてのログ属性から正確な文字列 `hello` を検索します。                                  |
| `*:hello*`    | 全文   | すべてのログ属性から `hello` で始まる文字列を検索します。たとえば、 `hello_world`。 |

### 完全一致の複数用語の例 {#multiple-terms-with-exact-match-example}

| 検索構文 | 検索タイプ | 説明 |
| ------------------- | ----------- |--------------------------------------------------------------------------------------------------- |
| `*:"hello world"`   | 全文   | すべてのログ属性から正確な文字列 `hello world` を検索します。                                   |
| `hello world`       | フリーテキスト   | `hello` および `world` の単語をログメッセージ内でのみ検索します。たとえば `hello beautiful world`。 |

## 特殊文字とスペースのエスケープ {#escape-special-characters-and-spaces}

次の文字は特殊文字と見なされ、`\` 文字を使用してエスケープする必要があります: `=` `-` `!` `&&` `||` `>` `>=` `<` `<=` `(` `)` `{` `}` `[` `]` `"` `*` `?` `:` `\` `#`、およびスペース。
- `/`は特殊文字とは見なされず、エスケープする必要はありません。
- `@`は、[Attribute Search](#attributes-search)のために予約されているため、ログエクスプローラー内の検索クエリで使用することはできません。

ログメッセージ内で特殊文字を検索することはできません。属性内にある場合は、特殊文字を検索することができます。

特殊文字を検索するには、[Grok Parser][1] で特殊文字を属性にパースし、その属性を含むログを検索してください。

## 属性検索 {#attributes-search}

特定の属性を検索するには、`@` を追加して属性検索であることを明示します。

たとえば、属性名が **url** で、**url** の値 `www.datadoghq.com` で絞り込む場合は、次のように入力します:

```
@url:www.datadoghq.com
```

### 予約済み属性 {#reserved-attributes}

[Reserved attributes][8] のような `host`, `source`, `status`, `service`, `trace_id`, `message` は、`@` のプレフィックスを必要としません。これらの属性を直接検索することができます:

```
service:web-app
status:error
host:i-1234567890abcdef0
```

**注**:

1. 属性やタグを検索するためにファセットを定義する必要は**ありません**。

2. 属性の検索は大文字と小文字を区別します。[全文検索](#full-text-search)を使用して、大文字と小文字を区別しない結果を取得します。別のオプションは、検索中に大文字と小文字を区別しない結果を得るために、Grokパーサーを使用して`lowercase`フィルターを使用することです。

3. 特殊文字を含む属性値を検索するには、エスケープ処理または二重引用符が必要です。
    - たとえば、属性 `my_attribute` の値が `hello:world` の場合、`@my_attribute:hello\:world` または `@my_attribute:"hello:world"` を使って検索します。
    - 単一の特殊文字またはスペースに一致させるには、ワイルドカード `?` を使用します。たとえば、属性`my_attribute`の値が`hello world`の場合、次のように検索します: `@my_attribute:hello?world`。

例:

| 検索クエリ                                                         | 説明                                                                                                                                                         |
|----------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `@http.url_details.path:"/api/v1/test"`                              | 属性 `http.url_details.path` で `/api/v1/test` に一致するすべてのログを検索します。                                                                              |
| `@http.url:/api\-v1/*`                                             | 属性 `http.url` に `/api-v1/`                                                                             | で始まる値を含むすべてのログを検索します。
| `@http.status_code:[200 TO 299] @http.url_details.path:/api\-v1/*` | `http.status_code` の値が 200 から 299 の間であり、属性 `http.url_details.path` の値が `/api-v1/` |で始まるログを検索します。
| `-@http.status_code:*`                                                | `http.status_code`属性 | を含まないすべてのログを検索します。

### CIDR表記による検索 {#search-using-cidr-notation}
クラスレスインタードメインルーティング (CIDR) は、ユーザーがIPアドレスの範囲 (CIDRブロックとも呼ばれる) を簡潔に定義できる表記法です。CIDRは、ネットワーク (VPCなど) やサブネット (VPC内のパブリック/プライベートサブネットなど) を定義するために最も一般的に使用されます。

ユーザーは、CIDR表記を使用してログ内の属性をクエリするために`CIDR()`関数を使用できます。`CIDR()`関数は、フィルタリング対象のログ属性をパラメータとして渡し、その後に1つまたは複数のCIDRブロックを続ける必要があります。

#### 例{#examples}
- `CIDR(@network.client.ip,13.0.0.0/8)`は、フィールド`network.client.ip`にあるIPアドレスが13.0.0.0/8 CIDRブロックに該当するログにマッチしてフィルターをかけます。
- `CIDR(@network.ip.list,13.0.0.0/8, 15.0.0.0/8)``network.ip.list` 配列属性にあるIPアドレスが13.0.0.0/8または15.0.0.0/8 CIDRブロックに該当するログにマッチしてフィルターをかけます。
- `source:pan.firewall evt.name:reject CIDR(@network.client.ip, 13.0.0.0/8)`13.0.0.0/8 サブネットから発生する Palo Alto ファイアウォールの拒否イベントにマッチしてフィルターをかけます。
- `source:vpc NOT(CIDR(@network.client.ip, 13.0.0.0/8)) CIDR(@network.destination.ip, 15.0.0.0/8)` は、サブネット 13.0.0.0/8 から発生していないが、宛先サブネット 15.0.0.0/8 へ向けられている VPC ログをすべて表示します。これは、サブネット間で環境内のネットワークトラフィックを分析したいためです。

`CIDR()` 関数は、IPv4 と IPv6 の CIDR 表記をサポートし、Log Explorer、Live Tail、ダッシュボードのログウィジェット、ログモニター、およびログ構成で動作します。

## ワイルドカード {#wildcards}

自由なテキスト検索にワイルドカードを使用できます。ただし、ログメッセージ内の用語のみを検索し、ログエクスプローラーの `content` 列のテキストを検索します。ログ属性内の値を検索したい場合は、[全文検索](#full-text-search)を参照してください。

### 複数文字のワイルドカード {#multi-character-wildcard}

ログメッセージ (Log Explorerの `content` 列) で複数文字のワイルドカード検索を行うには、以下のように `*` 記号を使用します。

* `service:web*` は、`web` で始まるサービスを持つすべてのログメッセージに一致します。
* `web*``web` で始まるすべてのログメッセージに一致します。
* `*web``web` で終わるすべてのログメッセージに一致します。

**注意**: ワイルドカードは、二重引用符の外側でのみワイルドカードとして機能します。たとえば、`"*test*"` は、メッセージ内に文字列 `*test*` を含むログに一致します。`*test*` は、メッセージ内の任意の場所に文字列 test を含むログに一致します。

ワイルドカード検索は、この構文でタグや属性 (ファセット化されていないものも含む) 内で機能します。このクエリは、文字列 `mongo` で終わるすべてのサービスを返します。
<p> </p>
<p></p>

```
service:*mongo
```

Wildcard検索は、ログ属性の一部でないログのプレーンテキスト内を検索するためにも使用できます。たとえば、このクエリは、文字列 `NETWORK` を含むコンテンツ (メッセージ) を持つすべてのログを返します。

```
*NETWORK*
```

ただし、この検索語は、文字列 `NETWORK` がログ属性内にあり、ログメッセージの一部でない場合は、それを含むログを返しません。

### 検索ワイルドカード {#search-wildcard}

特殊文字を含む属性やタグの値を検索する場合、またはエスケープや二重引用符が必要な場合は、`?` Wildcardを使用して単一の特殊文字またはスペースに一致させます。たとえば、値が `hello world` の属性 `my_attribute` を検索するには: `@my_attribute:hello?world`。
<p> </p>

## 数値 {#numerical-values}

数値属性で検索するには、まず [ファセットとして追加してください][2]。その後、数値ファセットに対して検索を行うために、数値演算子 (`<`,`>`, `<=`, または `>=`) を使用できます。
たとえば、応答時間が 100ms を超えるすべてのログを取得するには:
<p> </p>

```
@http.response_time:>100
```

特定の範囲内で数値属性を検索できます。たとえば、すべての 4xx エラーを取得するには:

```
@http.status_code:[400 TO 499]
```

## タグ {#tags}

ログは、それらを生成する [ホスト][3] および [インテグレーション][4] からタグを継承します。検索やファセットとしても使用できます:

* `test` は文字列 "test" を検索しています。
* `env:(prod OR test)`タグ `env:prod` またはタグ `env:test` を持つすべてのログに一致します。
* `(env:prod AND -version:beta)` はタグ `env:prod` を含み、タグ `version:beta` を含まないすべてのログに一致します。

タグが [タグのベストプラクティス][5] に従わず、`key:value` 構文も使用していない場合は、次の検索クエリを使用します:

* `tags:<MY_TAG>`

## 配列 {#arrays}

次の例では、ファセット内の `Peter` の値をクリックすると、`users.names` 属性を持つすべてのログが返され、その値は `Peter` か、または `Peter` を含む配列となります。

{{< img src="logs/explorer/search/array_search.png" alt="配列とファセット" style="width:80%;">}}

**注**: 同等の構文を使用して、検索をファセットではない配列属性にも使用することができます。

次の例では、Windows 用 CloudWatch ログの `@Event.EventData.Data` の下に JSON オブジェクトの配列が含まれています。JSONオブジェクトの配列にファセットを作成することはできませんが、次の構文を使用して検索できます。

* `@Event.EventData.Data.Name:ObjectServer`キー `Name` と値 `ObjectServer` を持つすべてのログに一致します。

{{< img src="logs/explorer/search/facetless_query_json_arrray2.png" alt="JSONオブジェクトの配列に対するファセットなしのクエリ" style="width:80%;">}}

### ネストされた配列検索 {#nested-array-search}

配列属性内のネストされたフィールドを検索するには、完全な属性パスに `@` プレフィックスを使用します。ログエクスプローラーは配列内の任意のアイテムに一致します:

* `@network.ip.attributes.ip:2a02\:1810*` は、`network.ip.attributes` 配列内の少なくとも1つのアイテムが `ip` フィールドで `2a02:1810` で始まるすべてのログに一致します。

配列が複数の特定の値を含むログに一致させるには、値を括弧内にリストします:

* `@user_perms:(4 6)` は、`user_perms` 配列が `4` と `6` の両方を含むすべてのログに一致します。

配列が範囲内の任意の値を含むログに一致させるには、範囲クエリを使用します:

* `@user_perms:[2 TO 6]` は、`user_perms` 配列が `2` と `6` の間に少なくとも1つの値を含むすべてのログに一致します。

## 計算フィールド {#calculated-fields}

計算フィールドはログ属性のように機能し、検索、集計、可視化、さらには他の計算フィールドの定義にも使用できます。計算フィールド名を参照するには、`#` プレフィックスを使用してください。

{{< img src="logs/explorer/calculated_fields/calculated_field.png" alt="ログエクスプローラーで結果をフィルタリングするために使用されるrequest_durationという計算フィールド" style="width:100%;" >}}

## 検索の保存 {#saved-searches}

[Saved Views][6] に、検索クエリ、列、対象期間、およびファセットが格納されます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/log_configuration/parsing
[2]: /ja/logs/explorer/facets/
[3]: /ja/infrastructure/
[4]: /ja/integrations/#cat-log-collection
[5]: /ja/getting_started/tagging/#tags-best-practices
[6]: /ja/logs/explorer/saved_views/
[7]: /ja/logs/explorer/facets/#facet-panel
[8]: /ja/logs/log_configuration/attributes_naming_convention/#reserved-attributes