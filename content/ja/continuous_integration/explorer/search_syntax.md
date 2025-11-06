---
description: CI Visibility Explorer でパイプライン実行のすべてを検索する方法を説明します。
further_reading:
- link: /continuous_integration/search
  tag: ドキュメント
  text: パイプラインをフィルターおよびグループ化する
- link: /continuous_integration/explorer/facets
  tag: ドキュメント
  text: ファセットについて
title: CI Visibility Explorer の検索構文
---

## 概要

クエリフィルターは、用語と演算子で構成されます。

用語には 2 種類あります。

* **単一の用語**は、`pipeline` や `hello` のような単語です。

* **シーケンス**は、二重引用符で囲まれた単語のグループです (`"hello dolly"` など)。

複合クエリで複数の条件を組み合わせるには、以下の大文字と小文字を区別するブール演算子を使用します。

| **演算子** | **説明**                                                                                        | **例**                  |
|--------------|--------------------------------------------------------------------------------------------------------|------------------------------|
| `AND`        | **積**: 両方の条件を含むイベントが選択されます (何も追加しなければ、AND がデフォルトで採用されます)。 | authentication AND failure   |
| `OR`         | **和**: いずれかの条件を含むイベントが選択されます。                                             | authentication OR password   |
| `-`          | **除外**: 以下の用語はイベントに含まれません (個々の生テキスト検索に適用されます)。                                                  | authentication AND -password |

## 属性とタグで検索

属性やタグを検索するためにファセットを定義する必要はありません。特定の属性を検索するには、`@` を追加して属性を検索することを指定します。属性検索では大文字と小文字が区別されます。大文字と小文字を区別せずに検索するには、フリーテキスト検索を使用してください。

例えば、`git.repository.id` 属性に興味があり、値が `Datadog/documentation` のものをフィルターしたい場合、`@git.repository.id:"github.com/Datadog/documentation"` を使用します。

特殊文字を含む属性値を検索するには、エスケープするか二重引用符で囲む必要があります。例えば、`hello:world` という値を持つ `my_attribute` という属性の場合、`@my_attribute:hello\:world` または `@my_attribute:"hello:world"` を使って検索します。

単一の特殊文字またはスペースに一致させるには、`?` ワイルドカードを使用します。たとえば、値が `hello world` の属性 `my_attribute` は、`@my_attribute:hello?world` を使用して検索します。

タグについて詳しくは、[タグの使用方法][2]をご覧ください。

## ワイルドカード

### 複数文字のワイルドカード

複数文字のワイルドカード検索を実行するには、`*` 記号を次のように使用します。

* `service:web*` は、`web` で始まるサービスを持つすべてのログメッセージに一致します。
* `web*` は、`web` で始まるすべてのログメッセージに一致します。
* `*web` は、`web` で終わるすべてのログメッセージに一致します。

**注**: ワイルドカードはダブルクォーテーションの外側でのみワイルドカードとして機能します。たとえば、`@ci.pipeline.name:"*test*"` は名前に文字列 `*test*` を含むパイプラインに一致しますが、`@ci.pipeline.name:*test*` は名前に文字列 `test` を含むパイプラインに一致します。

ワイルドカード検索は、この構文でタグや属性 (ファセット化されていないものも含む) 内で機能します。

### ワイルドカードを検索

特殊文字を含む属性値またはタグ値を検索する場合や、エスケープまたは二重引用符を必要とする場合は、`?` ワイルドカードを使用して 1 つの特殊文字またはスペースに一致させます。たとえば、値が `hello world` の属性 `my_attribute` を検索するには: `@my_attribute:hello?world`

## 数値

数値属性を検索するには、まず[その属性をファセットとして追加][2]します。次に、数値演算子 (`<`、`>`、`<=`、または `>=`) を使用して、数値ファセットの検索を行うことができます。

例えば、1 週間以上の期間を持つすべてのパイプライン実行を取得するには、`@duration:>=7days` を使用します。

## タグ

パイプライン実行は、生成元の[ホスト][3]や[インテグレーション][4]からタグを継承します。これらのタグは検索やファセットとしても使用できます。

* `pipeline` は文字列 "pipeline" を検索します。
* `env:(prod OR pipeline)` は、タグ `env:prod` またはタグ `env:pipeline` を持つすべてのパイプライン実行に一致します。
* `(env:prod AND -version:beta)` は、タグ `env:prod` を含み、タグ `version:beta` を含まないすべてのパイプライン実行に一致します。

タグが[タグのベストプラクティス][5]に従わず、`key:value` 構文も使用していない場合は、`tags:<MY_TAG>` の検索クエリを使用します。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/continuous_integration/explorer/facets
[2]: /ja/getting_started/tagging/using_tags
[3]: /ja/infrastructure
[4]: /ja/integrations
[5]: /ja/getting_started/tagging/#define-tags