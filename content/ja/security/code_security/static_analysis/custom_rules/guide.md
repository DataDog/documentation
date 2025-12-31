---
description: Datadog 用のカスタム ルールを作成するための完全ガイド。
title: 静的コード解析カスタム ルール ガイド
---

このガイドでは、[静的解析カスタム ルール チュートリアル][1]をベースに、カスタム ルールの作成方法を網羅的に説明し、ヒントやコツ、回避すべき一般的な落とし穴も紹介します。

## 概要

静的解析ツールのルールは、次の 3 つの要素で構成されます: 該当するコード構造を見つけるための Tree-sitter クエリ、コードを解析して診断結果を生成する JavaScript 関数、ルールが正しく動作することを検証するテスト。

静的解析を実行する際、解析ツールはコード リポジトリ内の各ファイルを取り出し、ファイル名の拡張子をチェックしてその言語を判断し、Tree Sitter でファイルを解析してから、その言語向けのルールを実行します。

ルールを実行するために、解析ツールは、ルールによって提供される [Tree Sitter クエリ][3]を使用して、生成された構文木をクエリします。これにより、ゼロ個以上の Tree Sitter ノードが生成されます。次に、解析ツールは各ノードに対して、ルールの JavaScript コードから `visit()` 関数を実行します。この関数は、`addError()` を呼び出して、そのルールに対する診断結果を生成することができます。

## Tree Sitter クエリ

クエリにはパターンが 1 つ以上含まれており、各パターンはマッチさせるノードの形状を宣言する式となっています。クエリ エンジンは構文木を走査してパターンに一致するノードを探し、出現箇所ごとに返します。

### ノード パターン

基本的なパターンは、ノード タイプが括弧で囲まれた構成になっています。このパターンは、そのタイプに属するすべてのノードにマッチします。

次の例は、`func-decl` タイプのノードにマッチするクエリを示しています。

```scheme
(func-decl)
```

ノード タイプの後ろ、閉じ括弧の前の部分にパターンを追加できます。そのような形で指定したパターンは、それらのパターンに一致する子を持つノードにマッチします。

```scheme
(func-decl (arg-list) (body))
```

この例は、`arg-list` タイプのノードを含み、その後に `body` タイプのノードが続く (間に別のノードが入る場合もあり)、`func-decl` タイプのノードにマッチします。次の構文木の場合、このクエリは青で囲まれたサブ ツリーにはマッチしますが、オレンジで囲まれたサブ ツリーにはマッチしません。

{{< img src="/security/code_security/custom_rule_guide_parse_trees.png" alt="2 つの一致箇所がハイライト表示された構文木の例。" style="height:20em;" >}}

子パターンは必要なだけ入れ子にすることができます。

```scheme
(func-decl
  (arg-list
    (argument)
  )
  (body
    (statement
      (function-call)
    )
  )
)
```

ご覧のように、Tree Sitter クエリにはスペースや改行を追加することができます。これらを調整することで、クエリを読みやすい形にすることができます。また、セミコロンの後にコメントを追加することができ、行末までがコメントとして認識されます。

```scheme
; 上の例を別の形式で表現する方法
(func-decl
  (arg-list (argument)) ; arg-list に引数が 1 つ以上含まれる
  (body
    (statement (function-call)) ; body に関数の呼び出しが含まれる
  )
)
```

ピリオド (`.`) を使用すると、2 つの兄弟ノードが続けて出現しなければならないことを指定できます。ピリオドがない場合は、間に他のノードがあってもマッチします。また、ピリオドを使用して、ノードが最初または最後の子でなければならないことを指定することもできます。

```scheme
(func-decl (arg-list) . (body))
; `func-decl` に `arg-list` が含まれ、その直後に `body` が続く。

(func-decl . (body))
; `func-decl` の最初の子ノードは `body` である。

(func-decl (return-type) . )
; `func-decl` の最後の子ノードは `return-type` である。
```

一部のノードにはフィールドがあり、フィールド名、コロン、そしてフィールドの内容のパターンを指定することでマッチさせることができます。

```scheme
(unary-operator
  operand: (identifier))
; `operand` フィールドに `identifier` を含む
; `unary-operator` ノードにマッチします。
```

また、感嘆符 (`!`) に続けてフィールド名を指定することで、フィールドを持たないノードにマッチさせることもできます。

```scheme
(if-statement
  !else)
; `else` フィールドを持たない `if-statement` にマッチします。
```

ここまで見てきたのは「名前付きノード」で、これはタイプを持つノードのことです。Tree Sitter は構文木に「匿名ノード」も追加します。匿名ノードはタイプを持たず、多くの場合、構文要素を含んでいます。たとえば、「`+`」や「`/`」などの演算子、括弧、コロンなどです。

二重引用符で囲んでそのテキストを指定すれば、匿名ノードにマッチさせることができます。

```scheme
(binary-operation
  (identifier)
  "+"
  (binary-operation)
)
; `identifier`、`+` トークン、および別の `binary-operation` を含む
; `binary-operation` ノードにマッチします。
```

### ワイルドカード

アンダースコア (`_`) はワイルド カードとして使用できます。アンダースコア単体では、名前付きか匿名かにかかわらず、どのノードもマッチします。ノード名としてアンダースコアを指定すると、名前付きノードはマッチしますが、匿名ノードはマッチしません。

```scheme
(binary-operation . (_) "+" (identifier) . )
; 最初の子ノードが任意のタイプの名前付きノードである
; `binary-operation` ノードにマッチします。

(binary-operation . (identifier) _ (identifier) . )
; 中央の子ノードが匿名または名前付きの任意のノードである
; `binary-operation` ノードにマッチします。

(_ . (identifier) "+" (identifier) . )
; `identifier`、`+` の匿名ノード、および別の `identifier` を含む
; 任意のタイプの名前付きノードにマッチします。
```

### 代替テクノロジー

Tree Sitter クエリの一番上の階層で複数のパターンを指定した場合、クエリはいずれかのパターンに一致するノードを検索します。

```scheme
(program)
(module)
; タイプが `program` または `module` のノードにマッチします
```

子ノードの代替一致条件を指定したい場合は、代替パターンを角括弧 (`[]`) で囲みます。代替パターンは間にカンマを挟まずに並べることに注意してください。

```scheme
(func-decl
  [
    (func-prototype)
    (func-definition)
  ]
)
; タイプが `func-decl` で、子のタイプが `func-prototype` または
; `func-definition` のノードにマッチします。
```

ノードが複数の代替パターンに合致する子ノードを含む場合、クエリ エンジンはマッチする代替パターンごとに 1 つの結果を返します。1 つのクエリ内で複数の階層において代替パターンが指定されている場合、クエリ エンジンはすべての代替パターンの組み合わせに対して一致する結果を返すため、組み合わせ爆発が発生する可能性があります。その結果、静的解析の実行に時間がかかり、ルールがタイムアウトする可能性があります。

### キャプチャ

マッチしたノードを「キャプチャ」して、ルールの JavaScript コードで利用できるようにしたり、述語で使用したりすることができます (後述)。ノードをキャプチャするには、キャプチャしたいパターンの後にアット マーク (`@`) とキャプチャ名を付けます。

```scheme
(binary-operation
  (identifier) @id
  "+" @op
  _ @operand
) @operation
; `identifier` (`id` としてキャプチャ)、`+` を含む匿名ノード (`op` としてキャプチャ)、
; その他の任意の子ノード (`operand` としてキャプチャ) を含む
; `binary-operation` ノード (`operation` という名前でキャプチャ) にマッチします。
```

### オプション一致と反復一致

ノードのパターンの後に疑問符 (`?`) 修飾子を指定することで、そのノードがオプションで出現する可能性があることを示すことができます。

```scheme
(exit-statement
  (integer)?
)
; オプションの `integer` ノードを含む `exit-statement` ノードにマッチします。
```

オプションのノードをキャプチャすることができます。ノードが存在しない場合、キャプチャは空になります。

```scheme
(exit-statement
  (integer)? @retCode
)
; `integer` が存在する場合、`retCode` にはノードが格納されます。
; それ以外の場合は空になります。
```

ノードのパターンの後にアスタリスク (`*`) 修飾子を指定することで、そのノードがゼロ回以上出現する可能性があることを示すことができます。

```scheme
(list
  _* @items
)
; ゼロ個以上の子ノードを持つ `list` ノードにマッチし、それらを `items` としてキャプチャします。
```

ご覧のように、これらの修飾子はキャプチャと組み合わせると最も有用です。子ノードをキャプチャする必要がなければ、上記のクエリは単に `(list)` と書き換えられます。

ノードのパターンの後にプラス記号 (`+`) 修飾子を指定することで、そのノードが 1 回以上出現しなければならないことを示すことができます。

```scheme
(array-index
  (integer)+ @indices
)
; `integer` ノードを 1 つ以上含む `array-index` ノードにマッチし、
; それらを `indices` としてキャプチャします。
```

これらの修飾子はパターンのグループにも適用できます。その場合は、グループを括弧で囲み、閉じ括弧の後に修飾子を適用します。

```scheme
(array-dimensions
  (integer)
  ("," integer)*
)
; `integer` ノードが含まれ、その後にカンマ区切りで `integer` ノードが
; ゼロ回以上続く `array-dimensions` ノードにマッチします。
```

この 3 つの修飾子の違いは微妙でわかりにくいかもしれないので、別の視点からもう一度見てみましょう。

* 「`?`」と「`*`」の違いは、パターンに合致する反復ノードがある場合、「`*`」はすべての反復を含む単一の結果を生成する一方、「`?`」は反復ごとに 1 つの結果を生成することです。

たとえば、`list` ノードに 5 つの子ノードがある場合、パターン「`(list _?)`」は 5 つの結果を別々に (各子ノードに対して 1 つずつ) 生成しますが、パターン「`(list _*)`」は子ノードのリスト全体に対して 1 つの結果を生成します。

* 「`*`」と「`+`」の違いは、マッチするノードがない場合、「`*`」のパターンは結果を返す一方、「`+`」のパターンは結果を返さないことです。

たとえば、構文木に子ノードを持たない `list` ノードがあった場合、パターン「`(list _*)`」は 1 つの結果を生成し、パターン「`(list _+)`」が生成する結果はゼロになります。

### 述語

ノードがマッチするために満たすべき追加の条件を指定できます。これらの条件は、パターンの括弧内に述語の形で追加して表現します。

```scheme
(binary-operator
  (identifier) @id
  (#match? @id "[a-z]+([A-Z][a-z]*)*")
)
; `identifier` ノードを含み、その内容が指定された正規表現に一致する
; `binary-operator` ノードにマッチします。
```

述語は `(#pred? arg1 arg2)` の形式を持ち、`#pred?` は述語の名前、`arg1` はキャプチャ、`arg2` は別のキャプチャまたは文字列となります。

```scheme
(assign-statement
  left: _ @target
  right: _ @source
  (#eq? @target @source)
)
; `left` と `right` のフィールドが等しい `assign-statement` ノードにマッチします。
```

以下は一般的な述語の例です。

* `#eq?`、`#not-eq?` --- キャプチャが第 2 引数と等しい／等しくない。
* `#match?`、`#not-match?` --- キャプチャが第 2 引数で指定された正規表現に一致する／一致しない。

キャプチャに複数のノードが含まれる場合 (たとえば、修飾子 `*` または `?` を使用した場合)、以下の述語を使用できます。

* `#any-eq?`、`#any-not-eq?` --- キャプチャされたノードのいずれかが第 2 引数と等しい／等しくない。
* `#any-match?`、`#any-not-match?` --- キャプチャされたノードのいずれかが、第 2 引数で指定された正規表現に一致する／一致しない。

```scheme
(array-index
  (identifier)* @ids
  (#any-eq? @ids "exit")
)
; 内容が "exit" である `identifier` 子ノードを含む `array-index` ノードに
; マッチします。
```

引数が複数の値のいずれかと等しいかどうかをチェックしたい場合は、そのための述語も用意されています。

* `#any-of?`、`#not-any-of?` --- キャプチャが第 2 引数、第 3 引数、第 4 引数...のいずれかと等しい／等しくない。

```scheme
(function-call
  name: _ @fn
  (#any-of? @fn "system" "exit" "quit")
)
; `name` フィールドが "system"、"exit"、"quit" のいずれかと等しい
; `function-call` ノードにマッチします。
```

## JavaScript のコード

ルールの JavaScript コードは、通常次のような形になります。

```javascript
function visit(query, filename, code) {
  const { cap1, cap2, cap3 } = query.captures;
  const { cap4, cap5, cap6 } = query.capturesList;
  /* キャプチャされたノードをチェック */
  const err = /* 診断結果についてのメッセージを生成 */;
  addError(err);
}
```

### `visit()` 関数

クエリの実行後、静的解析ツールはマッチした各結果に対して `visit()` 関数を実行します。この関数は 3 つの引数を受け取ります。

* `query` --- 現在のマッチに関する情報。
* `filename` --- 解析対象のファイル名。
* `code` --- 解析対象ファイルの内容。

引数の `filename` と `code` は文字列ですが、`query` は以下のプロパティを含むオブジェクトです。

* `captures` --- クエリによってキャプチャされたノードを格納するオブジェクトで、キャプチャ名がキーになります。キャプチャに複数のノードが格納されている場合、最初のノードだけがここに表示されます。
* `capturesList` --- `captures` に似ていますが、同じ名前でキャプチャされたすべてのノードのリストが含まれます。修飾子 `+` および `*` を使った反復ノードのキャプチャに適しています。

たとえば、次のようなクエリの場合

```scheme
(var-assignment
  left: (identifier)+ @ids
  right: _ @expr
) @assignment
```

引数 `query` には次のような情報が格納されます。

```javascript
query = {
  captures: {
    ids: /* `left` フィールドの 1 つ目の `identifier` ノード */,
    expr: /* `right` フィールドのノード */
  },
  capturesList: {
    ids: [
      /* `left` の 1 つ目の `identifier` ノード */,
      /* `left` の 2 つ目の `identifier` ノード */,
      /* 以下同様 */
    ],
    expr: [
      /* `right` フィールドのノード */
    ]
  }
}
```

### キャプチャの使い方

キャプチャ名は、オブジェクト `query.captures` および `query.capturesList` のキーとして使用されます。JavaScript の変数名と互換性のある名前をキャプチャに割り当てれば、キャプチャを簡単に取り出すことができます。

```javascript
const { id, expr, node } = query.captures;
```

上記のコードでは、`query.captures` からプロパティ `id`、`expr`、`node` を抽出し、同じ名前の定数に割り当てています。

キャプチャ名が JavaScript の変数名と互換性がない場合でも抽出することはできますが、使い勝手が少し悪くなります。

```javascript
const id = query.captures["id-node"];
const expr = query.captures["20394"];
```

キャプチャされたノードは、以下のプロパティを含むオブジェクトで表されます。

* `cstType` --- ノードのタイプ。
* `start` --- ソース コード中のノードの開始位置を格納するオブジェクト。
* `end` --- ノードの末尾に続く文字の位置を格納するオブジェクト。
* `text` --- ノードの内容。

`start` および `end` プロパティは、`line` および `col` プロパティを含むオブジェクトです。これらのプロパティは 1 が基準になっており、ファイルの最初の行および行の最初の列が 1 番になります。`start` プロパティの位置は包含的で、ノードの最初の文字を指します。`end` プロパティの位置は排他的で、ノードの後の最初の文字を指します。

`start` および `end` プロパティを使用して、ノードの長さや 2 つのノードの相対位置を確認できます。たとえば、あるノードの `start` プロパティと `end` プロパティの値が同じ場合、それは空のノードです。あるノードの `end` プロパティの値と別のノードの `start` プロパティの値が同じ場合、その 2 つのノードは連続しています。

(古いコードに関する注意: `cstType` の代わりに `astType` プロパティを使用しているルールを見かけるかもしれません。これは古いルールで、`cstType` を使用すべきです。また、`node.text` の代わりに、`getCodeForNode(node, code)` や `getCodeForNode(node)` を使用しているルールを見かけるかもしれませんが、`node.text` を使用すべきです。)

### 構文木のナビゲーション

`ddsa.getParent(node)` 関数と `ddsa.getChildren(node)` 関数を使用すると、それぞれノードの親と子を取得できます。

```javascript
function visit(query, filename, code) {
  const { funcDecl } = query.captures;
  const parent = ddsa.getParent(funcDecl);
  // `funcDecl` ノードの親ノードを使って何らかの処理を行う
  const children = ddsa.getChildren(funcDecl);
  for (let child of children) {
    // `funcDecl` ノードの子ノードを使って何らかの処理を行う
  }
}
```

これらの関数によって返されたノードに対して `ddsa.getParent(node)` と `ddsa.getChildren(node)` を呼び出し続ければ、構文木を探索できます。ルート ノードで `ddsa.getParent()` を呼び出すと `undefined` が返され、リーフ ノードで `ddsa.getChildren()` を呼び出すと空のリストが返されます。

```javascript
function visit(query, filename, code) {
  const { funcDecl } = query.captures;
  let root = getRoot(funcDecl);
  // これで `root` に構文木のルートが格納されます
  displayLeaves(root);
}

function getRoot(node) {
  let parent = ddsa.getParent(node);
  while (parent) {
    node = parent;
    parent = ddsa.getParent(node);
  }
  return node;
}

function displayLeaves(node) {
  let children = ddsa.getChildren(root);
  if (children.length == 0) console.log(node);
  for (let child of children) {
    displayLeaves(child);
  }
}
```

フィールドを持つノードで `ddsa.getChildren(node)` を呼び出すと、それらのフィールドに格納されたノードは子ノードとして返され、`fieldName` プロパティが追加されます。

```javascript
// `if_statement` ノードの `then`、`else` フィールドの内容を取得します。
let children = ddsa.getChildren(ifStatementNode);
let thenField = children.find(n => n.fieldName === 'then');
let elseField = children.find(n => n.fieldName === 'else');
```

`==` を使えば、2 つのノード オブジェクトを比較して、同じノードを指しているかどうかを確認できます。

```javascript
function visit(query, filename, code) {
  const { funcDecl } = query.captures;
  displaySiblings(funcDecl);
}

// このノードのすべての兄弟を出力 (このノード自体はカウントしない)
function displaySiblings(node) {
  let parent = ddsa.getParent(node);
  if (!parent) return;
  let allSiblings = ddsa.getChildren(parent);
  for (let sibling of allSiblings) {
    if (sibling != node) console.log(sibling);
  }
}
```

### 診断結果の報告と提案

ユーザーに診断結果を報告するには、`addError()` 関数を使用します。`addError()` は `Violation` オブジェクトを受け取ります。この `Violation` オブジェクトは `buildError()` 関数で構築できます。`buildError()` は `startLine`、`startCol`、`endLine`、`endCol`、`message` の 5 つの引数を取ります。一般的には、ノードの `start` および `end` プロパティを使用して、最初の 4 つの引数の値を取得します。

```javascript
function visit(query, filename, code) {
  const { funcCall } = query.captures;
  addError(
    buildError(
      funcCall.start.line, funcCall.start.col,
      funcCall.end.line, funcCall.end.col,
      "Function calls are not allowed"
    )
  );
}
```

ただし、複数のノードの `start`、`end` の位置情報を使用したり、必要に応じて自分で計算することもできます。

設定した `message` はユーザーに表示されます。

また、エラー メッセージに修正案を添付することもできます。そのためには、`Violation` オブジェクトの `addFix()` メソッドを呼び出します。このメソッドは、`buildFix()` 関数で作成できる `Fix` オブジェクトを受け取ります。`buildFix()` は 2 つの引数を取り、1 つ目は `description`、2 つ目は編集案の配列である `edits` です。

編集案は、`buildEditAdd()`、`buildEditRemove()`、および `buildEditUpdate()` 関数で作成できます。

* `buildEditAdd()` はテキストの挿入案を生成します。`startLine`、 `startCol`、`newContent` という 3 つの引数を取ります。
* `buildEditRemove()` はテキストの削除案を生成します。`startLine`、`startCol`、`endLine`、`endCol` という 4 つの引数を取ります。
* `buildEditUpdate()` はテキストの修正案を生成します。`startLine`、`startCol`、`endLine`、`endCol`、`newContent` という 5 つの引数を取ります。

```javascript
function visit(query, filename, code) {
  const { fname } = query.captures;
  if (fname.text != "oldFunction") return;
  addError(
    buildError(
      fname.start.line, fname.start.col,
      fname.end.line, fname.end.col,
      "This function is deprecated"
    ).addFix(
      buildFix(
        "Use the new function instead",
        [
          buildEditUpdate(
            fname.start.line, fname.start.col,
            fname.end.line, fname.end.col,
            "newFunction")
        ]
      )
    )
  );
}
```

## ヒントとコツ

### 特定の子ノードを持たないノードのマッチング

感嘆符 (`!`) を使って特定のフィールドを持たないノードにマッチさせることはできますが、特定の子ノードを持たないノードに対するクエリを書く方法はありません。たとえば、「子ノード `return_statement` を持たない `function_declaration` ノード」に対応するクエリを書くことはできません。

しかし、クエリと JavaScript コードを組み合わせることで、その結果を取得することができます。

そのためには、疑問符 (`?`) 修飾子と、除外したい子ノードのキャプチャを使って、JavaScript のコードでそのノードがキャプチャされたかどうかをチェックします。キャプチャされていない場合、そのノードは存在しないことになります。

```scheme
; Query:
(function_declaration
  name: (identifier) @id
  result: _
  body:
    (block
      (return_statement)? @ret ; これが除外したいノードです
    )
)
```

```javascript
// Code:
function visit(query, filename, code) {
  const { id, ret } = query.captures;
  if (ret) return; // return 文が存在するため、ここで終了します
  addError(
    buildError(
      id.start.line, id.start.col,
      id.end.line, id.end.col,
      "Missing return statement"
    )
  );
}
```

### 構文木をたどってノードを探す

必要なノードをすべて選択してキャプチャするクエリを書きたくなりますが、1 つのノードを見つけてから、`ddsa.getParent()` や `ddsa.getChildren()` を使って残りのノードを見つける方が簡単な場合もあります。

たとえば、関数呼び出しを含む関数定義を見つけたい場合、入れ子のさまざまな階層で関数呼び出しのパターンを指定しない限り、Tree Sitter クエリでは実現できません。しかし、Tree Sitter クエリで関数呼び出しを検索した後に、JavaScript コードで `ddsa.getParent()` を使って構文木を上にたどって関数定義を見つければ、非常に簡単に実現できます。

```scheme
; Query:
(call_expression
  function:
    (_ field: _ @methodName
       (@eq? @methodName "DoSomething")
    )
) @fn
```

```javascript
// Code:
function visit(query, filename, code) {
  const { fn } = query.captures;
  let decl = ddsa.getParent(fn);
  while (decl && decl.cstType != 'function_declaration')
    decl = ddsa.getParent(decl);
  // `decl` は `function_declaration` または undefined になります
}
```

`ddsa.getParent()` と `ddsa.getChildren()` を使えば色々なことができます。たとえば、ノードの兄弟を調べることが可能です。

```javascript
function getSiblings(node) {
  return ddsa.getChildren(ddsa.getParent(node)).filter(n => n != node);
}

function getSiblingsAfter(node) {
  return ddsa.getChildren(ddsa.getParent(node)).
      reduce((a, n) => n == node ? [] : a && a.concat([n]), undefined);
}

function getSiblingsBefore(node) {
  return ddsa.getChildren(ddsa.getParent(node)).
      reduceRight((a, n) => n == node ? [] : a && [n].concat(a), undefined);
}
```

その後、`cstType` と `text` のプロパティをチェックすることで、興味のあるノードを検査・選択することができます。

## 落とし穴

### 述語を追加してもクエリは高速化しない

Tree Sitter クエリが遅い場合、探索範囲を絞り込むために述語を追加して高速化しようとするかもしれません。しかし、この方法は Tree Sitter クエリ エンジンでは機能しません。このエンジンは、パターンに合致するノードを探して構文木を走査する際にはすべての述語を無視し、最後に結果のリストを絞り込むためにのみ述語を適用します。

したがって、述語を追加することで、`visit()` 関数の呼び出し回数は減るかもしれませんが、クエリ時に静的解析ツールが行う作業量が減ることはありません。

また、クエリ述語は必ずしも `visit()` 関数内でノードをフィルタリングするよりも速いわけではないことに注意してください。クエリ内に複雑な述語を書くよりも、コード内でフィルタリングを行う方が簡単な場合があります。また、コード内でできるだけ早い段階でフィルタリングを行うようにしている限り、パフォーマンスを犠牲にすることもありません。

### 組み合わせ爆発の可能性

Tree Sitter クエリ エンジンは、クエリを満たすすべてのノードの組み合わせを返そうとします。つまり、代替パターンが 2 つ以上ある複雑なクエリでは、クエリ エンジンが各代替パターンのあらゆる可能性を探索するため、組み合わせ爆発が発生する可能性があります。

述語のチェックはノードが選択された後にしか行われないため、述語を追加しても、問題の解決には役立たないことに注意してください。

いくつかの原因について以下で解説します。

#### 似たような子ノードのパターンが 2 つ指定されている

ルールを作成する際に、まったく同じか非常によく似たパターンを使って、一度に 2 つのノードをマッチさせようとする人がいます。そのため、これらすべてのパターンにマッチするノードがファイルに多数存在する場合、問題が発生する可能性があります。

たとえば、クラス宣言内のメソッドをペアでキャプチャするために、次のようなクエリを書くこともあるでしょう。

```scheme
(class_declaration
  (method_declaration) @method1
  (method_declaration) @method2
)
```

メソッドが 2 つしかないクラスでは、このクエリが返す結果は 1 件のみです。ところが、クラスにメソッドが 10 個ある場合は 45 件、100 個ある場合は 4950 件の結果が返されてしまいます。

この問題を回避するには、`+` や `*` のような修飾子を使用して、メソッドのリスト全体を 1 つのクエリ結果に取り込みます。あるいは、`.` を使用して、該当の子ノードが連続する形で出現しなければならないことを示します。

```scheme
(class_declaration
  (method_declaration)+ @methods
)

; or

(class_declaration
  (method_declaration) @method1
  .
  (method_declaration) @method2
)
```

#### クエリで 2 つのノードをマッチさせようとする

よくあるタイプのルールとして、特定の形で使用される、特定のタイプの変数を見つけようとするものがあります。このようなクエリは、「すべての変数定義を見つけて名前をキャプチャし、変数のすべての使用法を見つけ、名前をキャプチャし、その名前が一致するかチェックする」ために書かれがちです。

```scheme
(_
  (var_declaration
    (var_spec
      name: _ @varName
      type: _ @typeName
    )
  )

  (_
    (call_expression
      function:
        (_
          operand: _ @opName
          field: _ @methodName
        )
    )
  )

  (#eq? @typeName "myType")
  (#eq? @methodName "DoSomething")
  (#eq? @varName @opName)
)
```

問題は、Tree Sitter クエリ エンジンがすべての `var_declaration` ノードとすべての `call_expression` ノードを取得し、それらを総当たりでペアにしたうえで、各ペアに対して述語をチェックすることです。その結果、計算量が O(nm) になってしまいます。

1 つの解決法は、どちらかのノードを見つけるクエリを書き、`ddsa.getParent()` と `ddsa.getChildren()` を使ってもう 1 つのノードを見つけるようにすることです。

別の解決法としては、候補となるすべてのノードを集め、ペアにすることは止めて、JavaScript のコードで処理することが考えられます。

#### 入れ子の複数の階層でパターンにマッチさせようとする

「パターンに合致する子ノードを持つノード」を見つけるためのパターンを書くことはできます。ただし、「入れ子の中の任意の階層で子孫ノードを持つノード」を見つけるためのパターンを書くことはできません。

ルールを作成する際に、いくつかの代替パターンを指定するやり方、すなわち、一致させたいパターンを入れ子内の各階層で指定することで、これを解決しようとした人たちもいました。

```scheme
; Query:
(function_declaration
  [
    ; 入れ子の階層 1～4 において同じパターンを見つける
    (_
      (call_expression
        function: (_ field: _ @methodName)
      ) @fn
    )

    (_ (_
      (call_expression
        function: (_ field: _ @methodName)
      ) @fn
    ))

    (_ (_ (_
      (call_expression
        function: (_ field: _ @methodName)
      ) @fn
    )))

    (_ (_ (_ (_
      (call_expression
        function: (_ field: _ @methodName)
      ) @fn
    ))))
  ]

  (#eq? @methodName "DoSomething")
) @decl
```

```javascript
// Code:
function visit(query, filename, code) {
  const { decl, fn } = query.captures;
  // ... decl と fn を使って何か処理を行う
}
```

この方法の問題点についてはすでに述べました。まず、クエリ エンジンはパターンのマッチングを試すために構文木のあらゆる分岐をたどるため、時間がかかる可能性があります。さらに、代替パターンが 2 つ以上ある場合、クエリ エンジンは選択肢の組み合わせごとにマッチするノード セットを作り、その組み合わせごとに 1 つの結果を返します。

この問題の解決法は、子ノードを対象としたクエリを書き、`ddsa.getParent()` を使って祖先ノードを探すことです。これには、入れ子の階層を無制限にできるという利点もあります。

```scheme
; Query:
(call_expression
  function: (_field: _ @methodName (#eq? @methodName "doSomething"))
)
```

```javascript
// Code:
function visit(query, filename, code) {
  const { fn } = query.captures;
  let decl = ddsa.getParent(fn);
  while (decl && decl.cstType != 'function_declaration') {
    decl = ddsa.getParent(decl);
  }
  // ... decl と fn を使って何か処理を行う
}
```



[1]: /ja/security/code_security/static_analysis/custom_rules/tutorial/
[2]: https://tree-sitter.github.io/
[3]: https://tree-sitter.github.io/tree-sitter/using-parsers/queries/index.html