---
title: Dynamic Instrumentation Expression Language
private: false
---

## 概要

The Dynamic Instrumentation Expression Language helps you formulate log probe message templates, metric probe expressions, span tag values, and probe conditions. It borrows syntax elements from common programming languages, but also has its own unique rules. The language lets you access local variables, method parameters, and nested fields within objects, and it supports the use of comparison and logical operators. 

例えば、`count(myCollection)` をメトリクス式として使用すると、コレクションのサイズからヒストグラムを作成することができます。メトリクス式は数値として評価されなければなりません。

ログテンプレートとタグの値では、式はテンプレートの静的な部分とブラケットで区切られます。例えば、`User name is {user.name}` です。ログテンプレート式は任意の値で評価することができます。もし、式の評価に失敗した場合は、`UNDEFINED` に置き換えられます。

プローブ条件はブール値で評価されなければなりません。例: `startsWith(user.name, "abc")`、`len(str) > 20` または `a == b`

一般的に、式言語は以下をサポートしています。
* オブジェクト内のローカル変数、メソッドのパラメーター、深くネストされたフィールドや属性へのアクセス。
* Using comparison operators (`<`, `>`, `>=`, `<=`, `==`, `!=`, `instanceof`) to compare variables, fields, and constants in your conditions, for example: `localVar1.field1.field2 != 15`.
* 論理演算子 (`&&`、`||`、`not` または `!`) を使って複雑なブール値を構築。
* `null` リテラル (Python の `nil` に相当) を使用。

以下はサポートして**いません**。
* メソッドの呼び出し。ダイナミックインスツルメンテーションは副作用のあるコードの実行を許可しません。しかし、`private` フィールドに直接アクセスすることはできます。
* このページで説明されている以外のネイティブプログラミング言語の構文。

以下のセクションでは、ダイナミックインスツルメンテーション式言語がサポートする変数と 操作について説明します。

## コンテキスト変数

| キーワード     | 説明                                                                |
|-------------|----------------------------------------------------------------------------|
| `@return`   | 戻り値へのアクセスを提供します                                        |
| `@duration` | 呼び出し実行期間へのアクセスを提供します                             |
| `@it`       | コレクションの反復操作における現在値へのアクセスを提供します    |
| `@exception`| Provides access to the current uncaught exception                          |


## 文字列演算子

| 演算子 | 説明 | 例 |
|-----------|-------------|---------|
| `isEmpty(value_src)` | データの有無をチェックします。文字列の場合は `len(str) == 0` と等価です。コレクションの場合は `count(myCollection) == 0` と等価です。 | `isEmpty("Hello")` -> `False` |
| `len(value_src)` | 文字列の長さを取得します。 | `len("Hello")` -> `5` |
| `substring(value_src, startIndex, endIndex)` | 部分文字列を取得します。 | `substring("Hello", 0, 2)` -> `"He"` |
| `startsWith(value_src, string_literal)` | 文字列が与えられた文字列リテラルで始まるかどうかをチェックします。 | `startsWith("Hello", "He")` -> `True` |
| `endsWith(value_src, string_literal)` | 文字列が与えられた文字列リテラルで終わるかどうかをチェックします。 | `endsWith("Hello", "lo")` -> `True` |
| `contains(value_src, string_literal)` | 文字列が文字列リテラルを含むかどうかをチェックします。 | `contains("Hello", "ll")` -> `True` |
| `matches(value_src, string_literal)` | 文字列が文字列リテラルとして指定された正規表現にマッチするかどうかをチェックします。 | `matches("Hello", "^H.*o$")` -> `True` |

## コレクション演算子

以下の例では、`[1,2,3]` として定義された `myCollection` という変数を使用しています。

| 演算子 | 説明 | 例 |
|-----------|-------------|---------|
| `any(value_src, {predicate})` | コレクション内に、与えられた述語を満たす要素が少なくとも 1 つあるかどうかをチェックします。現在の要素には `@it` 参照でアクセスします。 | `any(myCollection, @it > 2)` -> `True` |
| `all(value_src, {predicate})` | コレクション内のすべての要素が指定された述語を満たすかどうかをチェックします。現在の要素には `@it` 参照でアクセスします。 | `all(myCollection, @it < 4)` -> `True` |
| `filter(value_src, {predicate})` | 述語を使ってコレクションの要素をフィルターします。現在の要素には `@it` 参照でアクセスします。 | `filter(myCollection, @it > 1)` -> `[2,3]` |
| `len(value_src)` | コレクションサイズを取得します。 | `len(myCollection)` -> `3` |
| `[ n ]` | コレクションの場合、コレクション内の n 番目のアイテムを返します。マップと辞書の場合、キー `n` に対応する値を返します。項目が存在しない場合、式はエラーを返します。 | `myCollection[1]` -> `2` |

[1]: /metrics/types/?tab=count#metric-types
[2]: /metrics/types/?tab=gauge#metric-types
[3]: /metrics/types/?tab=histogram#metric-types
[4]: /tracing/trace_collection/custom_instrumentation/java/#adding-spans
[5]: /tracing/trace_collection/custom_instrumentation/java/#adding-tags
