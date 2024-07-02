---
title: CI Visibility Explorer Search Syntax
description: Learn how to search for all of your pipeline executions in the CI Visibility Explorer.
further_reading:
- link: /continuous_integration/search
  tag: Documentation
  text: Filter and group pipelines
- link: /continuous_integration/explorer/facets
  tag: Documentation
  text: Learn about facets
---

## 概要

クエリフィルターは条件と演算子で構成されます。

条件には 2 種類あります。

* A **single term** is a single word such as `pipeline` or `hello`.

* **シーケンス**は、二重引用符で囲まれた単語のグループです (`"hello dolly"` など)。

複合クエリで複数の条件を組み合わせるには、以下の大文字と小文字を区別するブール演算子を使用します。

| **演算子** | **説明**                                                                                        | **例**                  |
|--------------|--------------------------------------------------------------------------------------------------------|------------------------------|
| `AND`        | **積**: 両方の条件を含むイベントが選択されます (何も追加しなければ、AND がデフォルトで採用されます)。 | authentication AND failure   |
| `OR`         | **和**: いずれかの条件を含むイベントが選択されます。                                             | authentication OR password   |
| `-`          | **除外**: 以下の用語はイベントに含まれません (個々の生テキスト検索に適用されます)。                                                  | authentication AND -password |

## 属性とタグで検索

属性やタグを検索するためにファセットを定義する必要はありません。特定の属性を検索するには、`@` を追加して属性を検索することを指定します。属性検索では大文字と小文字が区別されます。大文字と小文字を区別せずに検索するには、フリーテキスト検索を使用してください。

For example, if you are interested in the `git.repository.id` attribute and you want to filter on the value `Datadog/documentation`, use `@git.repository.id:"github.com/Datadog/documentation"`.

特殊文字を含む属性値を検索するには、エスケープするか二重引用符で囲む必要があります。例えば、`hello:world` という値を持つ `my_attribute` という属性の場合、`@my_attribute:hello\:world` または `@my_attribute:"hello:world"` を使って検索します。

単一の特殊文字またはスペースに一致させるには、`?` ワイルドカードを使用します。たとえば、値が `hello world` の属性 `my_attribute` は、`@my_attribute:hello?world` を使用して検索します。

タグについて詳しくは、[タグの使用方法][2]をご覧ください。

## ワイルドカード

### 複数文字のワイルドカード

複数文字のワイルドカード検索を実行するには、`*` 記号を次のように使用します。

* `service:web*` は、`web` で始まるサービスを持つすべてのログメッセージに一致します。
* `web*` は、`web` で始まるすべてのログメッセージに一致します。
* `*web` は、`web` で終わるすべてのログメッセージに一致します。

Wildcard searches work within tags and attributes (faceted or not) with this syntax. 

### ワイルドカードを検索

特殊文字を含む属性値またはタグ値を検索する場合や、エスケープまたは二重引用符を必要とする場合は、`?` ワイルドカードを使用して 1 つの特殊文字またはスペースに一致させます。たとえば、値が `hello world` の属性 `my_attribute` を検索するには: `@my_attribute:hello?world`

## 数値

数値属性を検索するには、まず[その属性をファセットとして追加][2]します。次に、数値演算子 (`<`、`>`、`<=`、または `>=`) を使用して、数値ファセットの検索を行うことができます。

For example, to retrieve all pipeline executions that have a duration of over one week, use: `@duration:>=7days`.

## タグ

Your pipeline executions inherit tags from [hosts][3] and [integrations][4] that generate them. They can be used in the search and as facets as well:

* `pipeline` is searching for the string "pipeline".
* `env:(prod OR pipeline)` matches all pipeline executions with the tag `env:prod` or the tag `env:pipeline`.
* `(env:prod AND -version:beta)` matches all pipeline executions that contain tag `env:prod` and that do not contain tag `version:beta`.

タグが[タグのベストプラクティス][5]に従わず、`key:value` 構文も使用していない場合は、`tags:<MY_TAG>` の検索クエリを使用します。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_integration/explorer/facets
[2]: /getting_started/tagging/using_tags
[3]: /infrastructure
[4]: /integrations
[5]: /getting_started/tagging/#define-tags