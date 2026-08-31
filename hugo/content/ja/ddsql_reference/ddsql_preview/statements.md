---
aliases:
- /ja/dashboards/ddsql_editor/reference/statements/
- /ja/ddsql_editor/reference/statements/
private: true
title: DDSQL ステートメント (プレビュー)
---

## SELECT

`SELECT` はテーブルまたはビューから行を取得します。

### 構文

{{< code-block lang="text" >}}
SELECT [ ALL | DISTINCT ] select_expr, ...
[ FROM rel_source
  [ EVENT_SEARCH 'message_pattern' ]
  [ USE EVENT_INDEX 'index_name' ]
  [ [ join_type ] JOIN rel_source ...
    [ ON condition | USING (column, ... ) ] ] ... ]
[ WHERE condition ]
[ GROUP BY [ ALL | DISTINCT ] expression, ... ]
[ HAVING condition, ... ]
[ ORDER BY expression, ... [ ASC | DESC ] [ NULLS FIRST | NULLS LAST ] ]
[ LIMIT [ ALL | expression ]
  [ OFFSET expression ] ]
{{< /code-block >}}

#### プレースホルダーの種類:

`select_expr`
: 値を返す任意の式。定数、関数呼び出し、集約、ウィンドウ、または特別な式 `*` である可能性があります。これは SELECT 文の出力を指定するクエリの部分であり、関係代数では射影 (projection) と呼ばれます。

`message_pattern`
: 利用可能な場合の [全文検索][1] のための文字列パターン。

`index_name`
: [ログ インデックス][2] の識別子。

`rel_source`
: 相関名 (テーブル名またはエイリアス) または、括弧で囲まれた [DQL 式][3]。

`join_type`
: `INNER` や `LEFT` などの SQL 結合の種類。`INNER` 結合は完全にサポートされています。`OUTER` および `CROSS` 結合は `WHERE` 条件を必要とする場合があります。`LEFT` および `RIGHT` 結合も、条件が *等値結合* (*equijoin*) 式である場合にサポートされます。つまり、`<EXPRESSION_1> = <EXPRESSION_2>` のような等価比較で、式が異なるテーブルの列を参照し、かつ両方の式の出力型が同一である必要があります。1 列のみに対して `USING` 式で `JOIN` することも可能です。

`condition`
: 評価され、その結果が暗黙に真偽値として解釈される式。

`expression`
: 値の式。詳細と例は [式と演算子][4] を参照してください。

### 評価

SELECT は 0 個以上のテーブルから行を取得します。SELECT の一般的な処理は次のとおりです。

1. `FROM` のすべての要素が計算されます。複数の要素が指定された場合は、指定された結合種別で相互に結合されます。
2. `WHERE` 句が指定されている場合、その条件を満たさない行は出力から除外されます。
3. `GROUP BY` 句が指定されている場合、または `selectExpr` に集約関数呼び出しがある場合、出力は 1 つ以上の値が一致する行のグループにまとめられ、集約が計算されます。`HAVING` が存在する場合、その条件を満たさない行は出力から除外されます。
4. 実際の出力行は `selectExpr` を用いて計算されます。
5. `SELECT DISTINCT` は結果から重複行を取り除きます。
6. `ORDER BY` 句が指定されている場合、返される行は指定された順序で並べ替えられます。
7. `LIMIT` または `OFFSET` 句が指定されている場合、指定された部分集合に含まれない行は除外されます。

システムは、この順序で規定される結果が得られることが保証される範囲で、任意の方法でクエリを実行できます。

## エイリアス

エイリアスは、出力式または `FROM` 項目に対する代替名です。簡潔にするため、または自己結合 (self-join) の曖昧さを解消するために使用されます。

{{< code-block lang="sql" >}}
SELECT * FROM my_long_hosts_table_name as hosts
{{< /code-block >}}

`FROM` 項目にエイリアスが指定されると、テーブルや関数の実名は完全に隠されます。上記の例では、以降の DQL 式では `my_long_hosts_table_name` を `hosts` として参照しなければなりません。

## 序数

`GROUP BY` と `ORDER BY` 句の式には、列名、入力列から構成される任意の式、または出力式 (`SELECT` 式) の名前または序数を指定できます。出力式の序数は 1 始まり (1 から番号付け) です。

例えば、次のクエリの出力は、まず `ex3`、次に `ex2`、最後に `ex1` の順に並べ替えられます。

{{< code-block lang="sql" >}}
SELECT ex1, ex2, ex3 FROM table ORDER BY 3, 2, 1;
{{< /code-block >}}

## UNION

`UNION` は複数の [DQL 式][3] の結果を 1 つの出力テーブルに結合します。

### 構文

{{< code-block lang="text" >}}
DQL_expression UNION [ ALL ] DQL_expression ...
[ ORDER BY expressions [ ASC | DESC ] ]
[ LIMIT [ ALL | expression ]
  [ OFFSET expression] ]
{{< /code-block >}}

#### プレースホルダーの種類

`DQL_expression`
: `SELECT` 文などのクエリ文。

`UNION` 演算子は結果から重複行を取り除きます。重複行を保持するには、`UNION ALL` を使用します:

{{< code-block lang="sql" >}}
SELECT host_key, CAST(service AS text) AS service, 'from resources' FROM host
UNION ALL
SELECT message, service AS text, 'from logs' FROM logs WHERE env='prod'
ORDER BY service LIMIT 200 OFFSET 10;
{{< /code-block >}}

`UNION` 内のすべてのサブクエリは同一の出力スキーマを持つ必要があります。`UNION` を含むクエリでは、`ORDER BY` と `LIMIT` の式は末尾に 1 つずつしか記述できません。連鎖した `UNION` でも、末尾に 1 つの `ORDER BY` と `LIMIT` のみが記述できます。

## WITH

`WITH` は、より大きなクエリで使用する補助ステートメントを書くための方法を提供します。

`WITH` ステートメントは、共通テーブル式 (CTE) とも呼ばれ、1 回のクエリのために存在する一時テーブルを定義するものと考えられます。`WITH` 句内の各補助ステートメントは任意の [DQL 式][3] にでき、`WITH` 句自体は `WITH` 以外の任意の DQL の主文に付属します。後続の補助ステートメントは、先行する補助ステートメントでエイリアスされた相関を参照できます。

### 構文

{{< code-block lang="sql" >}}
WITH alias [ ( output, schema, column, names, ... ) ] AS ( DQL_expression ) [, ...] DQL_expression
{{< /code-block >}}

#### プレースホルダーの種類

`DQL_expression`
: `SELECT` 文などのクエリ文。

`WITH` では、`INSERT`、`UPDATE`、`DELETE` のようなデータ変更ステートメントはサポートされません。

各エイリアス付きクエリでは、出力スキーマや列名を指定することもできます。

## CREATE

DDSQL はユーザーが一時テーブルを作成し、そこに挿入し、クエリおよび参照できるようにします。これらのテーブルはセッション間で永続化されません。

### 構文

{{< code-block lang="sql" >}}
CREATE TABLE name (
  column_name column_type
  [ PRIMARY KEY [ AUTOINCREMENT ] | NOT NULL | UNIQUE | DEFAULT expression ] ...
)
{{< /code-block >}}

## INSERT

DDSQL の `INSERT` 文は SQL 標準に準拠しています。DDSQL は `CREATE` 文で作成した一時テーブルにのみ挿入を許可し、下流のデータ ソースには挿入できません。

### 構文

{{< code-block lang="sql" >}}
INSERT INTO table_name [ (specific, columns, ...) ] VALUES
  ( value1, value2, ... ),
  ( value1, value2, ... ),
  ...
{{< /code-block >}}

## SHOW

<div class="alert alert-danger"><code>SHOW</code> 文は SQL 標準の一部ですが、ランタイム パラメーター名は実験的です。将来的に名称変更、型変更、または廃止される可能性があります。</div>

クエリの実行時、DDSQL はクエリ文自体では指定されないランタイム パラメーター (環境変数) を参照します。例えば、`BUCKET BY` が指定されていない場合にメトリクス クエリで使用するデフォルトの間隔や、クエリの開始・終了タイムスタンプなどです。

`SHOW` 文はこれらの変数の値を表示します。

### 構文

{{< code-block lang="sql" >}}
SHOW (ALL | parameter)
{{< /code-block >}}

`SHOW ALL` は DDSQL システムで利用可能なすべてのランタイム パラメーターを表示し、`SHOW <PARAMETER>` は指定したパラメーターのみを表示します。

## SET

ランタイム パラメーターを変更するには、`SET` 文を使用します。

### 構文

{{< code-block lang="sql" >}}
SET variableName = expression
{{< /code-block >}}

[1]: /ja/logs/explorer/search_syntax/#full-text-search
[2]: /ja/logs/log_configuration/indexes/
[3]: /ja/ddsql_editor/#use-sql-syntax-ddsql
[4]: /ja/ddsql_reference/ddsql_preview/expressions_and_operators