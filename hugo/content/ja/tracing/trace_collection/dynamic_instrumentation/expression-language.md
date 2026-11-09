---
aliases:
- /ja/dynamic_instrumentation/expression-language
- /ja/tracing/dynamic_instrumentation/expression-language
private: false
title: Live Debugger および Dynamic Instrumentation の式言語
---
## 概要{#overview}

[Live Debugger][1] と [Dynamic Instrumentation][2] はこの式言語を使用して、実行中のコードから値を読み取り、条件、メトリクス、スパンタグを定義します。この式言語は、ローカル変数、メソッドのパラメーター、ネストされたオブジェクトフィールドへのアクセスの他に、比較演算子と論理演算子をサポートしています。一般的なプログラミング言語の構文を採用していますが、独自のルールがあります。

例:
- `someVar.someField`
- `request.headers["Host"]`
- `any(post.tags, {@it == "debugger"})`
- `@duration > 10 && len(p.data) < 100`

式のサポートは、ランタイムのバージョンとインスツルメンテーションの位置によって異なります。一般的に、式言語は以下をサポートしています。
* オブジェクト内のローカル変数、メソッドのパラメーター、深くネストされたフィールドや属性へのアクセス。
* 比較演算子 (`<`、`>`、`>=`、`<=`、`==`、`!=`、`instanceof`) を使用した条件内の変数、フィールド、定数の比較 (例: `localVar1.field1.field2 != 15`)。
* 論理演算子 (`&&`、`||`、および `!` または `not(...)`) を使用した複雑なブール条件の作成 (例: `!isEmpty(user.email) && not(contains(user.name, "abc"))`)。
* `null`リテラルの使用 (Python では `None` に、Ruby では `nil` に自動的に変換されます)。

以下はサポートして**いません**。
* メソッドの呼び出し。Dynamic Instrumentation では、副作用が生じる可能性のあるコードの実行は許可されていません。ただし、`private` フィールドには直接アクセスできます。
* 算術演算 (`i + 1`など)。
* このページで説明されている以外のネイティブプログラミング言語の構文。

式言語を使用する際に向上したユーザーエクスペリエンスを利用するには、[オートコンプリートと検索 (プレビュー版)](/dynamic_instrumentation/symdb/)をお試しください。

## アプリケーション {#applications}

式は、メトリクスを生成するために使用できます。また、フィルタリングされたデータを出力するための条件としても使用できます。

たとえば `len(data)` をメトリクス式として使用することで、文字列の長さからヒストグラムを作成できます。メトリクス式は、数値として評価される必要があります。

Live Debugger のログメッセージおよび Dynamic Instrumentation のスパンタグ値では、式を中括弧で囲みます (例: `User name is {user.name}`)。これらの式は、評価結果として任意の値を返すことができます。

インスツルメンテーションの条件の評価結果はブール値になる必要があります。次に例を示します。
 - `startsWith(user.name, "abc")`
 - `len(str) > 20`
 - `a == b`
 - `user.isActive == true`

## コンテキスト変数 {#contextual-variables}

利用可能なコンテキスト変数は、インスツルメンテーションの位置によって異なります。`@return` および `@duration` は、メソッド終了時に利用可能です。`@it` は、コレクション述語内で使用されます。

| キーワード     | 説明                                                                |
|-------------|----------------------------------------------------------------------------|
| `@return`   | メソッドの戻り値へのアクセスを提供します。|
| `@duration` | メソッド呼び出しの実行時間 (ミリ秒単位の浮動小数点値) へのアクセスを提供します。|
| `@exception`| メソッド内でスローされた例外へのアクセスを提供します (キャッチされていない例外が存在する場合のみ利用可能です)。|
| `@it`       | コレクションの反復操作における現在の要素へのアクセスを提供します。リスト操作の述語で使用されます。|

## 一般的な操作 {#general-operations}

以下の例では、値 `Hello, world!` を含む `myString` という名前の変数を想定しています。

| 操作 | 説明 | 例 |
|-----------|-------------|---------|
| `isDefined(var)` | 変数が定義されているかどうかを確認します。変数が現在のスコープに存在する場合は `true` を、それ以外の場合は `false` を返します。変数が存在しない可能性がある場合の条件付きロジックとして役立ちます。| {{< expression-language-evaluator expression="isDefined(myString)" >}} |
| `len(value_src)` | 文字列の長さを取得します。| {{< expression-language-evaluator expression="len(myString)" >}} |
| `isEmpty(value_src)` | 文字列が空かどうかを確認します。`len(value_src) == 0` に相当します。| {{< expression-language-evaluator expression="isEmpty(myString)" >}} |
| `substring(value_src, startIndex, endIndex)` | 部分文字列を取得します。| {{< expression-language-evaluator expression="substring(myString, 0, 2)" >}} |
| `startsWith(value_src, string_literal)` | 文字列が与えられた文字列リテラルで始まるかどうかを確認します。| {{< expression-language-evaluator expression="startsWith(myString, \"He\")" >}} |
| `endsWith(value_src, string_literal)` | 文字列が与えられた文字列リテラルで終わるかどうかを確認します。| {{< expression-language-evaluator expression="endsWith(myString, \"rdl!\")" >}} |
| `contains(value_src, string_literal)` | 文字列が文字列リテラルを含んでいるか、またはコレクションが要素を含んでいるかどうかを確認します。| {{< expression-language-evaluator expression="contains(myString, \"ll\")" >}} |
| `matches(value_src, string_literal)` | 文字列が文字列リテラルとして指定された正規表現にマッチするかどうかを確認します。| {{< expression-language-evaluator expression="matches(myString, \"^H.*!$\")" >}} |

## コレクション操作 {#collection-operations}

シーケンシャルコレクションに対する述語では `@it` を使用します。詳細については、[コンテキスト変数](#contextual-variables)セクションを参照してください。

以下の例では、値 `[1,2,3,4]` を含む `mySequence` という名前の変数と、値 `{"a": 1, "b": 2, "c": 3}` を含む `myMap` を想定しています。

| 操作 | 説明 | 例 |
|-----------|-------------|---------|
| `len(value_src)` | コレクションサイズを取得します。| {{< expression-language-evaluator expression="len(mySequence)" >}} {{< expression-language-evaluator expression="len(myMap)" >}}  |
| `isEmpty(value_src)` | コレクションが空かどうかを確認します。`len(value_src) == 0` に相当します。| {{< expression-language-evaluator expression="isEmpty(mySequence)" >}} {{< expression-language-evaluator expression="isEmpty(myMap)" >}} |
| `[ i ]`, `[ key ]` | シーケンシャルコンテナの場合、コレクション内の `i` 番目のアイテムを返します (`i` は整数である必要があります)。辞書の場合、`key` に対応する値を返します (`key` は辞書のキーの型と一致している必要があります)。アイテムが存在しない場合、言語に応じて、式はエラーを生成するか null を返します。| {{< expression-language-evaluator expression="mySequence[3]" >}} {{< expression-language-evaluator expression="myMap[\"b\"]" >}} |
| `any(value_src, {predicate})` | コレクション内に、与えられた述語を満たす要素が少なくとも 1 つあるかどうかを確認します。現在の要素には、シーケンシャルコンテナ用の `@it` 参照でアクセスします。| {{< expression-language-evaluator expression="any(mySequence, {@it > 2})" >}} |
| `all(value_src, {predicate})` | コレクション内のすべての要素が指定された述語を満たすかどうかを確認します。現在の要素には `@it` 参照を使用してアクセスします。| {{< expression-language-evaluator expression="all(mySequence, {@it > 2})" >}} |
| `filter(value_src, {predicate})` | 述語を使用してコレクションの要素をフィルタリングします。現在の要素には `@it` 参照を使用してアクセスします。| {{< expression-language-evaluator expression="filter(mySequence, {@it > 1})" >}} |

## 独自の条件を試す {#try-your-own-conditions}

このインタラクティブなシミュレーターは、実際の環境で式言語の構文を試す上で役立ちます。メソッドをインスツルメンテーションする際に、条件がデータのキャプチャの有無にどう影響するかを示します。

式のサポートおよび欠損値の動作は、アプリケーションによって異なる場合があります。

いずれかの例を選択するか、「when」フィールドに式を入力して [SIMULATE] (シミュレート) をクリックし、条件に基づいてデータがキャプチャされるかどうかを確認してください。

この例で使用可能な変数:

- `loops`: `5` にハードコードされたルートパラメーター
- `myString`: 文字列 `"Hello, world!"`
- `mySequence`: 整数の配列 `[1, 2, 3, 4]`
- `myMap`: 辞書 `{"a": 1, "b": 2, "c": 3}`
- `i`: 現在のループ反復インデックス

{{< expression-language-simulator >}}

[1]: /ja/tracing/live_debugger/
[2]: /ja/dynamic_instrumentation/