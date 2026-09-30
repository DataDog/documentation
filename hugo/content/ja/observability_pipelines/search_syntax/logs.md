---
aliases:
- /ja/observability_pipelines/search_syntax/
code_lang: logs
description: Observability Pipelines プロセッサーのフィルタリングクエリでログ検索構文を使用する方法を学びます。
disable_toc: false
title: ログ検索構文
type: multi-code-lang
weight: 1
---
## 概要 {#overview}

パイプラインにプロセッサーを追加する際、ログをフィルタリングして定義されたサブセットのみを処理できます。このドキュメントでは、以下の情報を説明します。

- [フリーテキスト検索](#free-text-search): `message` フィールドを検索します
- [属性検索](#attribute-search): 属性キーと値を検索します
- [配列](#arrays): ネストされた値の配列内を検索します
- [ブール演算子](#boolean-operators)
- [エスケープが必要な特殊文字とスペース](#escape-special-characters-and-spaces)
- [ワイルドカード](#wildcards)

**注**: Worker バージョン 2.11 以降では、アップグレードされた検索構文が使用されます。Worker をバージョン 2.11 にアップグレードした後、新しい構文に合わせてフィルタークエリを更新することが必要な場合があります。詳細については、「[新しい検索構文へのフィルタークエリのアップグレード][1]」を参照してください。

## 検索構文 {#search-syntax}

使用できるフィルタークエリには 2 つのタイプがあります。

- [フリーテキスト](#free-text-search)
- [属性](#attribute-search)

### フリーテキスト検索 {#free-text-search}

フリーテキスト検索は `message` フィールドのみを検索し、大文字と小文字を区別しません。用語と演算子で構成されます。用語には 2 種類あります。

- 単一用語とは、`test` や `hello` のような 1 つの単語です。
- シーケンスとは、`"hello dolly"` のような二重引用符で囲まれた単語のグループです。

以下はフリーテキスト検索の例です。

`hello`
: 文字列 `hello` と正確に一致するものを検索します。たとえば、`{"message": \"hello world\"}` が一致するログです。

`Hello world`
: `hello` と `world` を検索します。たとえば、`"hello beautiful world"` が一致します。
: このクエリは `Hello AND world` と記述することもできます。
: **注**: 一致するには、メッセージに `hello` と `world` の両方が含まれている必要があります。

`"hello world"`
: 単語のシーケンスを検索します。たとえば、`"hello world"`、`"hello-world"`、`"Hello, world"` はすべて一致します。

### 属性検索 {#attribute-search}

属性のキーと値を検索できます。たとえば、属性キーが `url` で、`url` 値 `www.datadoghq.com` でフィルタリングする場合は、: `url:www.datadoghq.com` と入力します。

**注**: 属性検索は大文字と小文字を区別します。

#### 特定の属性キーを持つイベントのフィルタリング {#filter-for-events-with-a-specific-attribute-key}

特定の属性キーを持つイベントをフィルタリングするには、`_exists_` 構文を使用します。たとえば、クエリ `_exists_:service` を使用した場合、イベント `{"service": \"postgres\"}` はクエリに一致しますが、イベント `{"env": \"prod\"}` は一致しません。

#### 特定の属性キーを持たないイベントのフィルタリング {#filter-for-events-that-do-not-have-a-specific-attribute-key}

特定の属性キーを持たないイベントをフィルタリングするには、`_missing_` 構文を使用します。たとえば、クエリ `_missing_:service` を使用した場合、イベント `{"env": \"prod\"}` はクエリに一致しますが、イベント `{"service": \"postgres\"}` は一致しません。

#### 属性検索構文の例 {#attribute-search-syntax-examples}

属性検索構文の例と、その構文に一致するログを以下に示します。

`status:ok service:flask-web-app`
: `flask-web-app` サービスからのステータスが `ok` であるログに一致します。
: このクエリは `status:ok AND service:flask-web-app` と記述することもできます。

`user.status:inactive`
: `user` 属性の下にネストされたステータスが `inactive` であるログに一致します。

`http.url:/api-v1/*`
: `http.url` 属性の値が `/api-v1/` で始まるログに一致します。

`http.status:[200 TO 299]`
: `http.status` の値が `200` 以上かつ `299` 以下であるログに一致します。
: **注**:<br>- `[..]` 角括弧は範囲が包括的であることを意味します。<br>- 範囲は任意の属性全体で使用できます。

`http.status:{200 TO 299}`
: `http.status` の値が `200` より大きいか、`299` より小さいログに一致します。
: **注**:<br>- `{..}` 波括弧は範囲が排他的であることを意味します。<br>- 範囲は任意の属性全体で使用できます。

`http.status_code:[200 TO 299] http.url_details.path:/api-v1/*`
: 次の両方を含むログに一致します:<br>- `http.status_code` の値が `200` 以上かつ`299`<br> 以下であるもの- `http.url_details.path` 属性の値が `/api-v1/` で始まるもの。

`"service.status":disabled`
: `"service.status": "disabled"` を含むログに一致します。このフィルター構文は、属性キー内のリテラル `.` を検索します。
: 詳細については、[パス表記](#path-notation)を参照してください。

`_exists_:service`
: 属性キー `service` を持つログに一致します。たとえば、このクエリは `{"service": "postgres"}` には一致しますが、`{"env": "prod"}` には一致しません。

`_missing_:service`
属性キー `service` を持たないログに一致します。たとえば、このクエリは `{"env": "prod"}` には一致しますが、`{"service": "postgres"}` には一致しません。

#### パス表記 {#path-notation}

{{% observability_pipelines/path_notation %}}

クエリで属性キー内のリテラル `.` を検索する場合は、検索クエリ内でキーをエスケープされた引用符で囲んでください。たとえば、検索クエリ `"service.status":disabled` はイベント `{"service.status": \"disabled\"}` に一致します。

#### `ddsource``ddtags` {#ddsource-and-ddtags}

Datadog Agent、Datadog Lambda Forwarder、および Datadog Lambda Extension ソースは、`ddsource` および `ddtags` でタグ付けされたログとメトリクスを送信します (`source` および `tags` ではありません)。これらのソースからのイベントに対してプロセッサークエリやフィルターを定義する場合は、代わりに `ddsource` および `ddtags` を使用してください。

### 配列 {#arrays}

次の例では、Windows 用 CloudWatch ログの `Event.EventData.Data` の下に JSON オブジェクトの配列が含まれています。

```
Event
{
EventData {
    Data [
        {"Name":"SubjectUserID1", "value":"12345"},
        {"Name":"SubjectUserID2", "value":"Admin"},
        {"Name":"ObjectServer", "value":"Security"}
	]
    }
}
```

フィルタークエリ `Event.EventData.Data.Name:ObjectServer` を使用した場合、属性キー `Name` と値 `ObjectServer` を持つネストされたオブジェクトが含まれているため、上記のログイベントが一致します。

### ブール演算子 {#boolean-operators}

検索クエリで複数の用語を組み合わせるには、以下の大文字と小文字を区別するブール演算子を使用できます。

| 演算子     | 説明                                            |
|--------------|--------------------------------------------------------|
| `AND`        | 積集合: 両方の条件がイベントに含まれます。            |
| `OR`         | 和集合: いずれかの条件がイベントに含まれます。         |
| `-` または `NOT` | 排他: 後続の用語がイベントに**含まれません**。|

以下は、ブール演算子を使用したクエリの例です。

`NOT (status:debug)`
: ステータス `DEBUG` を持たないログに一致します。

`host:COMP-A9JNGYK OR host:COMP-J58KAS`
: 特定のホストからのログのみに一致します。

`Hello AND World`
: `hello` と `world` を検索します。たとえば、`"hello beautiful world"` が一致します。
: このクエリは : `Hello world` と記述することもできます。
: **注**: 一致するには、メッセージに `hello` と `world` の両方が含まれている必要があります。

`hello AND status:info`
: メッセージフィールドに `hello` を含み、かつ `status:info` を含むログに一致します。

`-http.status_code:200`
: http.status_code が 200 と等しくないログに一致します。

`service:(postgres OR datadog_agent)`
:  `service` 属性の値が `postgres` または `datadog_agent` であるログに一致します。このクエリは : `service:postgres OR service:datadog_agent` と記述することもできます。

## 特殊文字とスペースのエスケープ {#escape-special-characters-and-spaces}

以下の文字は特殊文字と見なされるため、バックスラッシュ (`\`) でエスケープする必要があります: 。

`-` `!` `&&` `||` `>` `>=` `<` `<=` `(` `)` `{` `}` `[` `]` `"` `*` `?` `:` `#`、およびスペース。

**注**:

- `/` は特殊文字とは見なされず、エスケープする必要はありません。
- 属性内の特殊文字を検索できます。『[特殊文字を含む属性の検索](#search-an-attribute-that-contains-special-characters)』を参照してください。
- `message` フィールドに特殊文字 `!` を含むログに一致させたい場合は、属性検索構文 : `message:*!*` を使用してください。
    - **注**: 特殊文字を含むログをフィルタリングするために、フリーテキスト検索クエリを使用することはできません。

### 特殊文字を含む属性の検索 {#search-an-attribute-that-contains-special-characters}

特殊文字を含む属性値を検索するには、エスケープ処理または二重引用符が必要です。たとえば、属性 `my_app` の値が `hello:world` の場合は、構文 : `my_app:hello\:world` または `my_app:"hello:world"` を使用してください。

### 単一の特殊文字またはスペースに一致 {#match-a-single-special-character-or-space}

単一の特殊文字またはスペースに一致させるには、`?` ワイルドカードを使用します。たとえば、属性 `my_app` の値が `hello world again` の場合は、構文 : `my_app:hello?world?again` を使用してください。

### 例 {#examples}

検索で特殊文字やスペースをエスケープする方法を学ぶために、ログの例を見てみましょう。

```
{
    "service": "postgres",
    "status": "INFO",
    "tags": [
        "env:prod",
        "namespace:something",
        "reader:logs",
        "my_app:hello world again"
    ]
}
```

以下は、ログの例で特殊文字やスペースをエスケープする検索構文の例です。

`tags:env*`
: `tag` 属性の値が `env` であるログに一致します。

`tags:(env\:prod OR env\:test)`
: `tags` 配列内に `env:prod` または `env:test` タグを持つログに一致します。
: このクエリは `tags:("env:prod" OR "env:test")` と記述することもできます。

`tags:env\:prod AND -tags:version\:beta`
: `tag` 配列に `env:prod` を含み、`version:beta` を含まないログに一致します。
: このクエリは `tags:"env:prod" AND -tags:"version:beta"` と記述することもできます。

`my_app:hello\:world`
: `my_app:hello:world` を含むログに一致します。
: このクエリは `my_app:"hello:world"` と記述することもできます。

`my_app:hello?world?again`
: `"my_app":"hello world again"` を含むログに一致します。

## ワイルドカード{#wildcards}

ワイルドカード検索には `*` を使用できます。ワイルドカード検索の例を次に示します。

`*network*`
: `message` フィールド値に `network` を含むログに一致します。

`web*`
: `message` フィールド値が `web` で始まるログに一致します。

`*web`
: `message` フィールド値が `web` で終わるログに一致します。

`service:*mongo`
: `service` 属性値が `mongo` で終わるログに一致します。

`service:web*`
: `service` 属性値が `web` で始まるログに一致します。

**注**:
- 属性キー (`*:app` や `service*:app` など) の検索には、ワイルドカードを使用できません。
- ワイルドカードは、二重引用符の外側でのみワイルドカードとして機能します。
    - たとえば、`"*test*"` は、`*test*` フィールドに文字列 `message` を含むログに一致し、`*test*` は、`message` フィールド内のどこかに文字列 `test` を含むログに一致します。

#### 特殊文字またはエスケープ文字の検索 {#search-for-special-characters-or-escaped-characters}

特殊文字を含む、またはエスケープや二重引用符が必要な属性を検索する場合は、`?` ワイルドカードを使用して単一の特殊文字またはスペースに一致させます。たとえば、属性 `my_attribute` の値が `hello world` の場合は、構文 `my_attribute:hello?world` を使用してください。

[1]: /ja/observability_pipelines/guide/upgrade_your_filter_queries_to_the_new_search_syntax/