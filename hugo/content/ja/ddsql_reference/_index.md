---
aliases:
- /ja/logs/workspaces/sql_reference
- /ja/ddsql_reference/ddsql_default
description: Datadog データを SQL でクエリするための DDSQL の構文、データ型、関数、演算子、ステートメントについての完全なリファレンスです。
further_reading:
- link: bits_ai/mcp_server
  tag: よくあるご質問
  text: Datadog MCP サーバー
- link: /ddsql_editor/
  tag: よくあるご質問
  text: DDSQL エディター
products:
- icon: ddsql
  name: DDSQL エディター
  url: /ddsql_editor/
- icon: notebook
  name: ノートブック
  url: /notebooks/
title: DDSQL リファレンス
---
{{< product-availability >}}

## 概要 {#overview}

DDSQL は Datadog データ用の SQL です。`SELECT` などの標準の SQL 操作をいくつか実装しており、非構造化データに対するクエリを可能にします。独自の `SELECT` ステートメントを記述して必要なデータを正確に取得する、タグを標準のテーブル列と同様にクエリするといったアクションを実行できます。

DDSQL クエリは、[Datadog MCP サーバー][10] `ddsql` ツールセットを使用して、AI エージェントから実行できます (プレビュー)。

このドキュメントでは、次のような利用可能な SQL サポートについて紹介します。
- [PostgreSQL と互換性のある構文](#syntax)
- [データ型](#data-types)
- [型リテラル](#type-literals)
- [配列](#arrays)
- [SQL 関数](#functions)
- [正規表現](#regular-expressions)
- [ウィンドウ関数](#window-functions)
- [JSON 関数](#json-functions-and-operators)
- [ネットワークアドレス関数](#network-address-functions-and-operators)
- [テーブル関数](#table-functions)
- [タグ](#tags)


{{< img src="/logs/workspace/sql_reference/sql_syntax_analysis_cell.png" alt="SQL 構文が示されているワークスペースセルの例" style="width:100%;" >}}

## 構文 {#syntax}

次の SQL 構文がサポートされています。

`SELECT (DISTINCT)` (DISTINCT: オプション)
: データベースから行を取得し、`DISTINCT` を指定して重複レコードを除外します。

    {{< code-block lang="sql" >}}SELECT DISTINCT customer_id
FROM orders {{< /code-block >}}

`JOIN`
: 複数のテーブル間の関連する列に基づいて、それらのテーブルの行を結合します。FULL JOIN、INNER JOIN、LEFT JOIN、RIGHT JOIN がサポートされます。

    {{< code-block lang="sql" >}}SELECT orders.order_id, customers.customer_name
FROM orders
JOIN customers
ON orders.customer_id = customers.customer_id {{< /code-block >}}

`GROUP BY`
: 指定された列に同じ値を持つ行をグループ化して、要約行を生成します。

    {{< code-block lang="sql" >}}SELECT product_id, SUM(quantity)
FROM sales
GROUP BY product_id {{< /code-block >}}

`||` (concat)
: 複数の文字列を連結します。

    {{< code-block lang="sql" >}}SELECT first_name || ' ' || last_name AS full_name
FROM employees {{< /code-block >}}

`WHERE` (`LIKE`、`IN`、`ON`、`OR` フィルターのサポートを含む)
: 指定された条件を満たすレコードをフィルタリングします。

    {{< code-block lang="sql" >}}SELECT *
FROM employees
WHERE department = 'Sales' AND name LIKE 'J%' {{< /code-block >}}

`CASE`
: 指定された条件に基づいて異なる値を返す条件ロジックを提供します。

    {{< code-block lang="sql" >}}SELECT order_id,
  CASE
    WHEN quantity > 10 THEN 'Bulk Order'
    ELSE 'Standard Order'
  END AS order_type
FROM orders {{< /code-block >}}

`WINDOW`
: 現在の行に関連するテーブル行のセットに対して計算を実行します。

    {{< code-block lang="sql" >}}SELECT
  timestamp,
  service_name,
  cpu_usage_percent,
  AVG(cpu_usage_percent) OVER (PARTITION BY service_name ORDER BY timestamp ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS moving_avg_cpu
FROM
  cpu_usage_data {{< /code-block >}}

`IS NULL` / `IS NOT NULL`
: 値が null であるか、null でないかをチェックします。

    {{< code-block lang="sql" >}}SELECT *
FROM orders
WHERE delivery_date IS NULL {{< /code-block >}}

`LIMIT`
: 返されるレコードの最大数を指定します。

    {{< code-block lang="sql" >}}SELECT *
FROM customers
LIMIT 10 {{< /code-block >}}

`OFFSET`
: 指定された数のレコードをスキップしてから、クエリからレコードを返し始めます。

    {{< code-block lang="sql" >}}SELECT *
FROM employees
OFFSET 20 {{< /code-block >}}

`ORDER BY`
: クエリの結果セットを 1 つ以上の列でソートします。ソート順には ASC、DESC を使用できます。

    {{< code-block lang="sql" >}}SELECT *
FROM sales
ORDER BY sale_date DESC {{< /code-block >}}

`HAVING`
: グループ化後に指定された条件を満たすレコードをフィルタリングします。

    {{< code-block lang="sql" >}}SELECT product_id, SUM(quantity)
FROM sales
GROUP BY product_id
HAVING SUM(quantity) > 10 {{< /code-block >}}

`IN`、`ON`、`OR`
: クエリの指定条件で使用されます。`WHERE` 句と `JOIN` 句で利用できます。

    {{< code-block lang="sql" >}}SELECT *
FROM orders
WHERE order_status IN ('Shipped', 'Pending') {{< /code-block >}}

`USING`
: この句は、両方のテーブルで結合列の名前が同じである場合の結合の省略形です。それらの列のカンマ区切りリストを取得し、一致するペアごとに別の等号条件を作成します。たとえば、`T1` と `T2` を `USING (a, b)` で結合することは、`ON T1.a = T2.a AND T1.b = T2.b` と同等です。

    {{< code-block lang="sql" >}}SELECT orders.order_id, customers.customer_name
FROM orders
JOIN customers
USING (customer_id) {{< /code-block >}}

`AS`
: 列またはテーブルの名前をエイリアスに変更します。

    {{< code-block lang="sql" >}}SELECT first_name AS name
FROM employees {{< /code-block >}}

算術演算
: `+`、`-`、`*`、`/` のような演算子を使用して基本的な計算を行います。

    {{< code-block lang="sql" >}}SELECT price, tax, (price * tax) AS total_cost
FROM products {{< /code-block >}}

`INTERVAL value unit`
: 特定の単位で指定された期間を表す間隔。
サポートされている単位は、次のとおりです。<br> - `milliseconds` / `millisecond`<br> - `seconds` / `second`<br> - `minutes` / `minute`<br> - `hours` / `hour`<br> - `days` / `day`

## データ型 {#data-types}

DDSQL では、以下のデータ型がサポートされます。

| データ型 | 説明 |
|-----------|-------------|
| `BIGINT` | 64 ビット符号付き整数。|
| `BOOLEAN` | `true` または `false` の値。|
| `DECIMAL` | 浮動小数点数。|
| `INET` | ネットワークアドレスの値 (IPv4 および IPv6、オプションで CIDR プレフィックス長)。|
| `INTERVAL` | 期間の値。|
| `JSON` | JSON データ。|
| `TIMESTAMP` | 日付と時刻の値。|
| `VARCHAR` | 可変長文字列。|

### 配列型 {#array-types}

すべてのデータ型で配列型がサポートされます。配列リテラル、要素アクセス、および配列関数については、[Arrays](#arrays) を参照してください。

## 型リテラル {#type-literals}

DDSQL では、`[TYPE] [value]` 構文を使用して明示的な型リテラルをサポートしています。

| 型 | 構文 | 例 |
|------|--------|---------|
| `BIGINT` | `BIGINT 'value'` | `BIGINT '1234567'` |
| `BOOLEAN` | `BOOLEAN 'value'` | `BOOLEAN 'true'` |
| `DECIMAL` | `DECIMAL 'value'` | `DECIMAL '3.14159'` |
| `INET` | `INET 'value'` | `INET '192.168.1.5/24'` |
| `INTERVAL` | `INTERVAL 'value unit'` | `INTERVAL '30 minutes'` |
| `JSON` | `JSON 'value'` | `JSON '{"key": "value", "count": 42}'` |
| `TIMESTAMP` | `TIMESTAMP 'value'` | `TIMESTAMP '2023-12-25 10:30:00'` |
| `VARCHAR` | `VARCHAR 'value'` | `VARCHAR 'hello world'` |

型のプレフィックスは省略可能です。その場合、型は値から自動的に推測されます。たとえば、`'hello world'` は `VARCHAR` であると推測され、`123` は `BIGINT`、`true` は `BOOLEAN` であると推測されます。値が曖昧になる可能性がある場合は、明示的な型プレフィックスを使用してください。たとえば、`TIMESTAMP '2025-01-01'` はプレフィックスがない場合、`VARCHAR` であると推測されます。

### 例 {#example}

{{< code-block lang="sql" >}}
-- Using type literals in queries
SELECT
    VARCHAR 'Product Name: ' || name AS labeled_name,
    price * DECIMAL '1.08' AS price_with_tax,
    created_at + INTERVAL '7 days' AS expiry_date
FROM products
WHERE created_at > TIMESTAMP '2025-01-01';
{{< /code-block >}}

## 配列 {#arrays}

配列は、すべて同じデータ型を共有する値の順序付きコレクションです。すべての DDSQL 基本型に、対応する配列型があります。

### 配列リテラル {#array-literals}

配列リテラルを作成するには、`ARRAY[value1, value2, ...]` 構文を使用します。配列の型は、値から自動的に推測されます。

{{< code-block lang="sql" >}}
SELECT ARRAY['apple', 'banana', 'cherry'] AS fruits;  -- VARCHAR array
SELECT ARRAY[1, 2, 3] AS numbers;                     -- BIGINT array
SELECT ARRAY[true, false, true] AS flags;             -- BOOLEAN array
SELECT ARRAY[1.1, 2.2, 3.3] AS decimals;              -- DECIMAL array
{{< /code-block >}}

### 要素アクセス {#element-access}

1 ベースの添字を使用して、個々の配列要素にアクセスします。範囲外のインデックスにアクセスすると、`NULL` が返されます。

{{< code-block lang="sql" >}}
SELECT ARRAY['a', 'b', 'c'][1];   -- Returns 'a'
SELECT ARRAY['a', 'b', 'c'][2];   -- Returns 'b'
SELECT ARRAY['a', 'b', 'c'][10];  -- Returns NULL (out of bounds)
{{< /code-block >}}

配列の列の要素にアクセスするには、同じ添字構文を使用します。

{{< code-block lang="sql" >}}
SELECT recipients[1] AS first_recipient
FROM emails
{{< /code-block >}}

### 配列関数 {#array-functions}

次の関数は配列に対して操作を行います。

| 関数 | 戻り値の型 | 説明 |
|----------|-------------|-------------|
| `CARDINALITY(array a)` | `BIGINT` | 配列内の要素の数を返します。|
| `ARRAY_POSITION(array a, typeof_array value)` | `BIGINT` | 配列内で最初に出現した `value` の 1 ベースのインデックスを返します。見つからない場合は `NULL` を返します。|
| `STRING_TO_ARRAY(string s, string delimiter)` | `VARCHAR[]` | 指定された区切り文字で、文字列を文字列の配列に分割します。|
| `ARRAY_TO_STRING(array a, string delimiter)` | `VARCHAR` | 指定された区切り文字で、配列の要素を文字列に結合します。|
| `ARRAY_AGG(expression e)` | 入力の配列の型 | 複数の行からの値を 1 つの配列に集約します。|
| `UNNEST(array a [, array b...])` | [, b...] の行 | 1 つ以上の配列を行のセットに展開します。`FROM` 句内でのみ有効です。|

{{% collapse-content title="例" level="h3" %}}

### `CARDINALITY` {#cardinality}
{{< code-block lang="sql" >}}
SELECT
  CARDINALITY(recipients) AS recipient_count
FROM
  emails
{{< /code-block >}}

### `ARRAY_POSITION` {#array-position}
{{< code-block lang="sql" >}}
SELECT
  ARRAY_POSITION(recipients, 'hello@example.com') AS position
FROM
  emails
{{< /code-block >}}

### `STRING_TO_ARRAY` {#string-to-array}
{{< code-block lang="sql" >}}
SELECT
  STRING_TO_ARRAY('a,b,c,d,e,f', ',') AS parts
{{< /code-block >}}

### `ARRAY_TO_STRING` {#array-to-string}
{{< code-block lang="sql" >}}
SELECT
  ARRAY_TO_STRING(ARRAY['a', 'b', 'c'], ',') AS joined_string
{{< /code-block >}}

### `ARRAY_AGG` {#array-agg}
{{< code-block lang="sql" >}}
SELECT
  sender,
  ARRAY_AGG(subject) AS subjects,
  ARRAY_AGG(DISTINCT subject) AS distinct_subjects
FROM
  emails
GROUP BY
  sender
{{< /code-block >}}

### `UNNEST` {#unnest}
{{< code-block lang="sql" >}}
SELECT
  sender,
  recipient
FROM
  emails,
  UNNEST(recipients) AS recipient
{{< /code-block >}}

{{% /collapse-content %}}

## 関数 {#functions}

次の SQL 関数がサポートされています。ウィンドウ関数については、このドキュメントの別の [Window function](#window-functions) セクションを参照してください。

| 関数                                         | 戻り値の型                           | 説明                                                                                                                                                                                       |
|--------------------------------------------------|---------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `MIN(variable v)`                                | v の型                              | データセット内の最小値を返します。                                                                                                                                                     |
| `MAX(variable v)`                                | v の型                              | すべての入力値の中で最大の値を返します。                                                                                                                                               |
| `COUNT(any a)`                                   | 数値                               | null でない入力値の数を返します。                                                                                                                                            |
| `SUM(numeric n)`                                 | 数値                               | すべての入力値の合計を返します。                                                                                                                                                   |
| `AVG(numeric n)`                                 | 数値                               | すべての入力値の平均値 (算術平均) を返します。                                                                                                                             |
| `BOOL_AND(boolean b)`                            | ブール値                               | すべての非 null 入力値が true であるかどうかを返します。                                                                                                                                              |
| `BOOL_OR(boolean b)`                             | ブール値                               | いずれかの非 null 入力値が true であるかどうかを返します。                                                                      |
| `CEIL(numeric n)` / `CEILING(numeric n)`         | 数値                               | 最も近い整数に切り上げられた値を返します。`CEIL` と `CEILING` はいずれもエイリアスとしてサポートされています。                                                                                        |
| `FLOOR(numeric n)`                               | 数値                               | 最も近い整数に切り下げられた値を返します。                                                                                                                                           |
| `ROUND(numeric n)`                               | 数値                               | 最も近い整数に丸められた値を返します。                                                                                                                                                |
| `POWER(numeric base, numeric exponent)`          | 数値                               | 指数でべき乗する底の値を返します。                                                                                                                                       |
| `LOWER(string s)`                                | 文字列                                | 小文字の文字列を返します。                                                                                                                                                                 |
| `UPPER(string s)`                                | 文字列                                | 大文字の文字列を返します。                                                                                                                                                                 |
| `ABS(numeric n)`                                 | 数値                               | 絶対値を返します。                                                                                                                                                                      |
| `COALESCE(args a)`                               | 最初の非 null の型または null       | 最初の非 null 値またはすべて null の場合は null を返します。                                                                                                                                        |
| `CAST(value AS type)`                            | 型                                  | 指定の値を指定されたデータ型に変換します。                                                                                                                                             |
| `LENGTH(string s)`                               | 整数                               | 文字列の文字数を返します。                                                                                                                                                  |
| `TRIM(string s)`                                 | 文字列                                | 文字列の先頭と末尾の空白を削除します。                                                                                                                                         |
| `REPLACE(string s, string from, string to)`      | 文字列                                | 文字列内の部分文字列の出現を別の部分文字列で置き換えます。                                                                                                                      |
| `SUBSTRING(string s, int start, int length)`     | 文字列                                | 指定された位置から開始する、指定された長さの部分文字列を文字列から抽出します。                                                                                                     |
| `REVERSE(string s)`                              | 文字列                                | 文字列の文字の順序を逆にして返します。                                                                                                                                              |
| `STRPOS(string s, string substring)`             | 整数                               | 指定された文字列内の部分文字列の最初のインデックス位置を返します。一致がない場合は 0 を返します。                                                                                                  |
| `SPLIT_PART(string s, string delimiter, integer index)` | 文字列                         | 指定された区切り文字で文字列を分割し、1 から数えて指定された位置の文字列を返します。                                                                                         |
| `EXTRACT(unit from timestamp/interval)`          | 数値                               | タイムスタンプまたは間隔から日付または時間フィールドの一部 (年や月など) を抽出します。                                                                                                    |
| `TO_TIMESTAMP(string timestamp, string format)`  | タイムスタンプ                             | 指定された形式に従って文字列をタイムスタンプに変換します。                                                                                                                                  |
| `TO_TIMESTAMP(numeric epoch)`                    | タイムスタンプ                             | UNIX エポックタイムスタンプ (秒単位) をタイムスタンプに変換します。                                                                                                                                     |
| `TO_CHAR(timestamp t, string format)`            | 文字列                                | 指定された形式に従ってタイムスタンプを文字列に変換します。                                                                                                                                  |
| `DATE_BIN(interval stride, timestamp source, timestamp origin)` | タイムスタンプ                             | タイムスタンプ (ソース) を均等な長さのバケット (ストライド) に合わせて整列させます。ソースを含むバケットの開始を返します。これは、原点からストライドの長さの倍数の位置にある、ソース以下の最大のタイムスタンプとして計算されます。|
| `DATE_TRUNC(string unit, timestamp t)`           | タイムスタンプ                             | 指定された単位に基づいて、タイムスタンプを指定された精度に切り捨てます。                                                                                                                       |
| `CURRENT_SETTING(string setting_name)`           | 文字列                                | 指定された設定の現在の値を返します。パラメーター `dd.time_frame_start` と `dd.time_frame_end` がサポートされており、それぞれグローバルな時間枠の開始と終了を返します。|
| `NOW()`                                          | タイムスタンプ                             | 現在のクエリの開始時点における現在の UTC タイムスタンプを返します。                                                                                                                             |
| `CARDINALITY(array a)`                           | 整数                               | 配列内の要素の数を返します。                                                                                                                                                     |
| `ARRAY_POSITION(array a, typeof_array value)`    | 整数                               | 配列内で見つかった値の最初の出現のインデックスを返します。値が見つからない場合は null を返します。                                                                                        |
| `STRING_TO_ARRAY(string s, string delimiter)`    | 文字列の配列                      | 指定された区切り文字を使用して、指定された文字列を文字列の配列に分割します。                                                                                                                      |
| `ARRAY_TO_STRING(array a, string delimiter)`     | 文字列                                | 指定された区切り文字で要素を連結して、配列を文字列に変換します。                                                                                                                |
| `ARRAY_AGG(expression e)`                        | 入力の配列の型                   | すべての入力値を収集して配列を作成します。                                                                                                                                             |
| `APPROX_PERCENTILE(double percentile) WITHIN GROUP (ORDER BY expression e)` | 式の型        | 近似パーセンタイル値を計算します。パーセンタイルは 0.0 から 1.0 (両端を含む) の値である必要があります。`WITHIN GROUP (ORDER BY ...)` 構文が必要です。                                             |
| `UNNEST(array a [, array b...])`                 | [, b...] の行                    | 配列を行のセットに展開します。この形式は FROM 句でのみ許可されます。                                                                                                                    |

{{% collapse-content title="例" level="h3" %}}

### `MIN` {#min}
{{< code-block lang="sql" >}}
SELECT MIN(response_time) AS min_response_time
FROM logs
WHERE status_code = 200
{{< /code-block >}}

### `MAX` {#max}
{{< code-block lang="sql" >}}
SELECT MAX(response_time) AS max_response_time
FROM logs
WHERE status_code = 200
{{< /code-block >}}

### `COUNT` {#count}
{{< code-block lang="sql" >}}SELECT COUNT(request_id) AS total_requests
FROM logs
WHERE status_code = 200 {{< /code-block >}}

### `SUM` {#sum}
{{< code-block lang="sql" >}}SELECT SUM(bytes_transferred) AS total_bytes
FROM logs
GROUP BY service_name
{{< /code-block >}}

### `AVG` {#avg}
{{< code-block lang="sql" >}}SELECT AVG(response_time)
AS avg_response_time
FROM logs
WHERE status_code = 200
GROUP BY service_name
{{< /code-block >}}

### `BOOL_AND` {#bool-and}
{{< code-block lang="sql" >}}SELECT BOOL_AND(status_code = 200) AS all_success
FROM logs
{{< /code-block >}}

### `BOOL_OR` {#bool-or}
{{< code-block lang="sql" >}}SELECT BOOL_OR(status_code = 200) AS some_success
FROM logs
{{< /code-block >}}

### `CEIL` {#ceil}
{{< code-block lang="sql" >}}
SELECT CEIL(price) AS rounded_price
FROM products
{{< /code-block >}}

### `FLOOR` {#floor}
{{< code-block lang="sql" >}}
SELECT FLOOR(price) AS floored_price
FROM products
{{< /code-block >}}

### `ROUND` {#round}
{{< code-block lang="sql" >}}
SELECT ROUND(price) AS rounded_price
FROM products
{{< /code-block >}}

### `POWER` {#power}
{{< code-block lang="sql" >}}
SELECT POWER(response_time, 2) AS squared_response_time
FROM logs
{{< /code-block >}}

### `LOWER` {#lower}
{{< code-block lang="sql" >}}
SELECT LOWER(customer_name) AS lowercase_name
FROM customers
{{< /code-block >}}

### `UPPER` {#upper}
{{< code-block lang="sql" >}}
SELECT UPPER(customer_name) AS uppercase_name
FROM customers
{{< /code-block >}}

### `ABS` {#abs}
{{< code-block lang="sql" >}}
SELECT ABS(balance) AS absolute_balance
FROM accounts
{{< /code-block >}}

### `COALESCE` {#coalesce}
{{< code-block lang="sql" >}}
SELECT COALESCE(phone_number, email) AS contact_info
FROM users
{{< /code-block >}}

### `CAST` {#cast}

サポートされているキャストターゲット型は、次のとおりです。
- `BIGINT`
- `DECIMAL`
- `INET`
- `TIMESTAMP`
- `VARCHAR`

{{< code-block lang="sql" >}}
SELECT
  CAST(order_id AS VARCHAR) AS order_id_string,
  'Order-' || CAST(order_id AS VARCHAR) AS order_label
FROM
  orders
{{< /code-block >}}

### `LENGTH` {#length}
{{< code-block lang="sql" >}}
SELECT
  customer_name,
  LENGTH(customer_name) AS name_length
FROM
  customers
{{< /code-block >}}

### `INTERVAL` {#interval}
{{< code-block lang="sql" >}}
SELECT
  TIMESTAMP '2023-10-01 10:00:00' + INTERVAL '30 days' AS future_date,
  INTERVAL '1 MILLISECOND 2 SECONDS 3 MINUTES 4 HOURS 5 DAYS'
{{< /code-block >}}

### `TRIM` {#trim}
{{< code-block lang="sql" >}}
SELECT
  TRIM(name) AS trimmed_name
FROM
  users
{{< /code-block >}}

###  `REPLACE` {#replace}
{{< code-block lang="sql" >}}
SELECT
  REPLACE(description, 'old', 'new') AS updated_description
FROM
  products
{{< /code-block >}}

### `SUBSTRING` {#substring}
{{< code-block lang="sql" >}}
SELECT
  SUBSTRING(title, 1, 10) AS short_title
FROM
  books
{{< /code-block >}}

### `REVERSE` {#reverse}
{{< code-block lang="sql" >}}
SELECT
  REVERSE(username) AS reversed_username
FROM
  users
LIMIT 5
{{< /code-block >}}

### `STRPOS` {#strpos}
{{< code-block lang="sql" >}}
SELECT
  STRPOS('foobar', 'bar')
{{< /code-block >}}

### `SPLIT_PART` {#split-part}
{{< code-block lang="sql" >}}
SELECT
  SPLIT_PART('aaa-bbb-ccc', '-', 2)
{{< /code-block >}}

### `EXTRACT` {#extract}

サポートされている抽出単位は、次のとおりです。
| リテラル           | 入力型               | 説明                                  |
| ------------------| ------------------------ | -------------------------------------------- |
| `day`             | `timestamp` / `interval` | 月の日                             |
| `dow`             | `timestamp`              | 曜日 `1`(月曜日) から `7`(日曜日) |
| `doy`             | `timestamp`              | 年の日 (`1` - `366`)                |
| `epoch`           | `timestamp` / `interval` | 1970 年 1 月 1 日 00:00:00 UTC からの秒数 (タイムスタンプの場合)、または合計秒数 (間隔の場合) |
| `hour`            | `timestamp` / `interval` | 1 日の時間 (`0` - `23`)                 |
| `minute`          | `timestamp` / `interval` | 時間の分 (`0` - `59`)              |
| `second`          | `timestamp` / `interval` | 分の秒 (`0` - `59`)            |
| `week`            | `timestamp`              | 年の週 (`1` - `53`)                |
| `month`           | `timestamp`              | 年の月 (`1` - `12`)               |
| `quarter`         | `timestamp`              | 年の四半期 (`1` - `4`)              |
| `year`            | `timestamp`              | 年                                         |
| `timezone_hour`   | `timestamp`              | タイムゾーンオフセットの時間                 |
| `timezone_minute` | `timestamp`              | タイムゾーンオフセットの分               |

{{< code-block lang="sql" >}}
SELECT
  EXTRACT(year FROM purchase_date) AS purchase_year
FROM
  sales
{{< /code-block >}}

{{< code-block lang="sql" >}}
-- Get the Unix epoch of a timestamp
SELECT EXTRACT(epoch FROM TIMESTAMP '2021-01-01 00:00:00+00')
-- Returns: 1609459200
{{< /code-block >}}

{{< code-block lang="sql" >}}
-- Get the total seconds in an interval
SELECT EXTRACT(epoch FROM INTERVAL '1 day 2 hours')
-- Returns: 93600
{{< /code-block >}}

{{< code-block lang="sql" >}}
-- Calculate how many seconds ago each event occurred
SELECT
  event_time,
  EXTRACT(epoch FROM now()) - EXTRACT(epoch FROM event_time) AS seconds_ago
FROM
  events
{{< /code-block >}}

### `TO_TIMESTAMP` {#to-timestamp}

`TO_TIMESTAMP` には 2 つの形式があります:

**形式 1: 文字列をタイムスタンプに変換する形式**

サポートされている日付/時間の形式のパターンは、次のとおりです。
| パターン     | 説明                          |
| ----------- | ------------------------------------ |
| `YYYY`      | 年 (4 桁)                      |
| `YY`        | 年 (2 桁)                      |
| `MM`        | 月番号 (01 - 12)               |
| `DD`        | 月の日 (01 - 31)               |
| `HH24`      | 1 日の時間 (00 - 23)                |
| `HH12`      | 1 日の時間 (01 - 12)                |
| `HH`        | 1 日の時間 (01 - 12)                |
| `MI`        | 分 (00 - 59)                     |
| `SS`        | 秒 (00 - 59)                     |
| `MS`        | ミリ秒 (000 - 999)              |
| `TZ`        | タイムゾーンの略語               |
| `OF`        | UTC からのタイムゾーンのオフセット            |
| `AM` / `am` | 午前午後の記号 (ピリオドなし) |
| `PM` / `pm` | 午前午後の記号 (ピリオドなし) |

{{< code-block lang="sql" >}}
SELECT
  TO_TIMESTAMP('25/12/2025 04:23 pm', 'DD/MM/YYYY HH:MI am') AS ts
{{< /code-block >}}

**形式 2: UNIX エポックタイムスタンプをタイムスタンプに変換する形式**

{{< code-block lang="sql" >}}
SELECT
  TO_TIMESTAMP(1735142580) AS ts_from_epoch
{{< /code-block >}}

### `TO_CHAR` {#to-char}

サポートされている日付/時間の形式のパターンは、次のとおりです。
| パターン     | 説明                          |
| ----------- | ------------------------------------ |
| `YYYY`      | 年 (4 桁)                      |
| `YY`        | 年 (2 桁)                      |
| `MM`        | 月番号 (01 - 12)               |
| `DD`        | 月の日 (01 - 31)               |
| `HH24`      | 1 日の時間 (00 - 23)                |
| `HH12`      | 1 日の時間 (01 - 12)                |
| `HH`        | 1 日の時間 (01 - 12)                |
| `MI`        | 分 (00 - 59)                     |
| `SS`        | 秒 (00 - 59)                     |
| `MS`        | ミリ秒 (000 - 999)              |
| `TZ`        | タイムゾーンの略語               |
| `OF`        | UTC からのタイムゾーンのオフセット            |
| `AM` / `am` | 午前午後の記号 (ピリオドなし) |
| `PM` / `pm` | 午前午後の記号 (ピリオドなし) |

{{< code-block lang="sql" >}}
SELECT
  TO_CHAR(order_date, 'MM-DD-YYYY') AS formatted_date
FROM
  orders
{{< /code-block >}}

### `DATE_BIN` {#date-bin}
{{< code-block lang="sql" >}}
SELECT DATE_BIN('15 minutes', TIMESTAMP '2025-09-15 12:34:56', TIMESTAMP '2025-01-01')
-- Returns 2025-09-15 12:30:00

SELECT DATE_BIN('1 day', TIMESTAMP '2025-09-15 12:34:56', TIMESTAMP '2025-01-01')
-- Returns 2025-09-15 00:00:00
{{< /code-block >}}

### `DATE_TRUNC` {#date-trunc}

サポートされている切り捨ては、次のとおりです。
- `milliseconds`
- `seconds` / `second`
- `minutes` / `minute`
- `hours` / `hour`
- `days` / `day`
- `weeks` / `week `
- `months` / `month`
- `quarters` / `quarter`
- `years` / `year`

{{< code-block lang="sql" >}}
SELECT
  DATE_TRUNC('month', event_time) AS month_start
FROM
  events
{{< /code-block >}}

### `CURRENT_SETTING` {#current-setting}

サポートされている設定パラメーターは、次のとおりです。
- `dd.time_frame_start`: 選択した時間枠の開始を RFC 3339 形式で返します (`YYYY-MM-DD HH:mm:ss.sss±HH:mm`)。
- `dd.time_frame_end`: 選択した時間枠の終了を RFC 3339 形式で返します (`YYYY-MM-DD HH:mm:ss.sss±HH:mm`)。

{{< code-block lang="sql" >}}
-- Define the current analysis window
WITH bounds AS (
  SELECT CAST(CURRENT_SETTING('dd.time_frame_start') AS TIMESTAMP) AS time_frame_start,
         CAST(CURRENT_SETTING('dd.time_frame_end')   AS TIMESTAMP) AS time_frame_end
),
-- Define the immediately preceding window of equal length
     previous_bounds AS (
  SELECT time_frame_start - (time_frame_end - time_frame_start) AS prev_time_frame_start,
         time_frame_start                                       AS prev_time_frame_end
  FROM bounds
)
SELECT * FROM bounds, previous_bounds
{{< /code-block >}}

### `NOW` {#now}
{{< code-block lang="sql" >}}
SELECT
  *
FROM
  sales
WHERE
  purchase_date > NOW() - INTERVAL '1 hour'
{{< /code-block >}}

### `APPROX_PERCENTILE` {#approx-percentile}
{{< code-block lang="sql" >}}
-- Calculate the median (50th percentile) response time
SELECT
  APPROX_PERCENTILE(0.5) WITHIN GROUP (ORDER BY response_time) AS median_response_time
FROM
  logs

-- Calculate 95th and 99th response time percentiles by service
SELECT
  service_name,
  APPROX_PERCENTILE(0.95) WITHIN GROUP (ORDER BY response_time) AS p95_response_time,
  APPROX_PERCENTILE(0.99) WITHIN GROUP (ORDER BY response_time) AS p99_response_time
FROM
  logs
GROUP BY
  service_name
{{< /code-block >}}

{{% /collapse-content %}}

## 正規表現 {#regular-expressions}

### フレーバー {#flavor}

すべての正規表現 (regex) 関数は、ICU (International Components for Unicode) フレーバーを使用します。

- [メタ文字][5]
- [演算子][6]
- [式を設定する (文字クラス)][7]
- [インパターンフラグ用のフラグオプション][8]関数レベルのフラグについては、[下記のフラグセクション](#function-level-flags)を参照してください。
- [検索して置換 (キャプチャグループを使用)][9]

### 関数 {#functions-1}

| 関数                                                                                                         | 戻り値の型      | 説明                                                                                                                                                                                                                                                                |
|------------------------------------------------------------------------------------------------------------------|------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `REGEXP_LIKE(string input, string pattern)`                                                                      | ブール値          | 文字列が正規表現パターンに一致するかどうかを評価します。                                                                                                                                                                                                          |
| `REGEXP_MATCH(string input, string pattern [, string flags ])`                                                   | 文字列の配列 | 文字列内の最初のパターン一致の部分文字列を返します。<br><br>この関数は、指定されたパターンを使用して入力文字列を検索し、最初の一致からキャプチャされた部分文字列 (キャプチャグループ) を返します。キャプチャグループが存在しない場合は、完全一致を返します。|
| `REGEXP_REPLACE(string input, string pattern, string replacement [, string flags ])`                             | 文字列           | パターンに最初に一致する部分文字列を置き換えます。[オプションの `g` フラグ](#function-level-flags)を使用すると、すべての一致が置き換えられます。                                                                                                                             |
| `REGEXP_REPLACE (string input, string pattern, string replacement, integer start, integer N [, string flags ] )` | 文字列           | パターンの N 番目の一致である部分文字列を置き換えます。`N` がゼロの場合は、`start` からのすべての一致が置き換えられます。                                                                                                                                                    |

{{% collapse-content title="例" level="h3" %}}

### `REGEXP_LIKE` {#regexp-like}
{{< code-block lang="sql" >}}
SELECT
  *
FROM
  emails
WHERE
  REGEXP_LIKE(email_address, '@example\.com$')
{{< /code-block >}}

### `REGEXP_MATCH` {#regexp-match}
{{< code-block lang="sql" >}}
SELECT regexp_match('foobarbequebaz', '(bar)(beque)');
-- {bar,beque}

SELECT regexp_match('foobarbequebaz', 'barbeque');
-- {barbeque}

SELECT regexp_match('abc123xyz', '([a-z]+)(\d+)(x(.)z)');
-- {abc,123,xyz,y}
{{< /code-block >}}

### `REGEXP_REPLACE` {#regexp-replace}
{{< code-block lang="sql" >}}
SELECT regexp_replace('Auth success token=abc123XYZ789', 'token=\w+', 'token=***');
-- Auth success token=***

SELECT regexp_replace('status=200 method=GET', 'status=(\d+) method=(\w+)', '$2: $1');
-- GET: 200

SELECT regexp_replace('INFO INFO INFO', 'INFO', 'DEBUG', 1, 2);
-- INFO DEBUG INFO
{{< /code-block >}}

{{% /collapse-content %}}

### 関数レベルのフラグ {#function-level-flags}

[正規表現関数](#regular-expressions)では、次のフラグを使用できます。

`i`
: 大文字と小文字を区別しない一致

`n` または `m`
: 改行を区別する一致

`g`
: グローバル。最初の一致のみではなく、_すべて_の一致部分文字列を置き換えます。

{{% collapse-content title="例" level="h3" %}}

### `i` フラグ {#i-flag}

{{< code-block lang="sql" >}}
SELECT regexp_match('INFO', 'info')
-- NULL

SELECT regexp_match('INFO', 'info', 'i')
-- ['INFO']
{{< /code-block >}}

### `n` フラグ {#n-flag}

{{< code-block lang="sql" >}}
SELECT regexp_match('a
b', '^b');
-- NULL

SELECT regexp_match('a
b', '^b', 'n');
-- ['b']
{{< /code-block >}}

### `g` フラグ {#g-flag}

{{< code-block lang="sql" >}}
SELECT icu_regexp_replace('Request id=12345 completed, id=67890 pending', 'id=\d+', 'id=XXX');
-- Request id=XXX completed, id=67890 pending

SELECT regexp_replace('Request id=12345 completed, id=67890 pending', 'id=\d+', 'id=XXX', 'g');
-- Request id=XXX completed, id=XXX pending
{{< /code-block >}}

{{% /collapse-content %}}

## ウィンドウ関数 {#window-functions}

次の表に、サポートされているウィンドウ関数の概要を示します。包括的な詳細と例は、[PostgreSQL のドキュメント][2] を参照してください。

| 関数                | 戻り値の型       | 説明                                                            |
|-------------------------|-------------------|------------------------------------------------------------------------|
| `OVER`                  | 該当なし               | ほかのウィンドウ関数が操作を行う行のセットのウィンドウを定義します。|
| `PARTITION BY`          | 該当なし               | ウィンドウ関数を適用するためのパーティションに結果セットを分割します。|
| `RANK()`                | 整数           | パーティション内の各行に順位を割り当てます。同順位の場合は欠番が生じます。    |
| `ROW_NUMBER()`          | 整数           | パーティション内の各行に一意の連番を割り当てます。    |
| `LEAD(column n)`        | 列の型     | パーティション内の次の行からの値を返します。                 |
| `LAG(column n)`         | 列の型     | パーティション内の前の行からの値を返します。             |
| `FIRST_VALUE(column n)` | 列の型     | 順序付けられた値のセットの最初の値を返します。                  |
| `LAST_VALUE(column n)`  | 列の型     | 順序付けられた値のセットの最後の値を返します。                   |
| `NTH_VALUE(column n, offset)`| 列の型 | 順序付けられた値のセットで指定されたオフセットの値を返します。|


## JSON 関数と演算子 {#json-functions-and-operators}

| 名前                                          | 戻り値の型  | 説明                                                                                                                                                                                                                                                                                                    |
|-----------------------------------------------|--------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| json_extract_path_text(text json, text path…) | テキスト         | パスで定義されている JSON サブオブジェクトをテキストとして抽出します。動作は [同じ名前の Postgres 機能][3] と同等です。たとえば、`json_extract_path_text(col, ‘forest')`は `col` 内の各 JSON オブジェクトに対してキー `forest`の値を返します。JSON 配列構文については、以下の例を参照してください。|
| json_extract_path(text json, text path…)      | JSON         | `json_extract_path_text` 機能は同じですが、テキスト型ではなく JSON 型の列を返します。                                                                                                                                                                                                       |
| json_array_elements(text json)                | JSON の行 | JSON 配列を行のセットに展開します。この形式は FROM 句でのみ許可されます。                                                                                                                                                                                                                          |
| json_array_elements_text(text json)           | テキストの行 | JSON 配列を行のセットに展開します。この形式は FROM 句でのみ許可されます。                                                                                                                                                                                                                          |

## ネットワークアドレス関数と演算子 {#network-address-functions-and-operators}

`inet` 型は、オプションの CIDR プレフィックス長 (たとえば、`192.168.1.5/24` または `::1`) を持つ IPv4 および IPv6 ネットワークアドレスを表します。`inet` の値を作成するには、型リテラル構文 `INET 'value'` を使用するか、`CAST(column AS inet)` で文字列をキャストします。

### 関数 {#functions-2}

| 関数 | 戻り値の型 | 説明 |
|----------|-------------|-------------|
| `host(inet addr)` | `VARCHAR` | プレフィックス長なしで、テキストとして IP アドレスを返します。|
| `network(inet addr)` | `INET` | ホストビットが 0 に設定されたアドレスのネットワーク部分を返します。|
| `netmask(inet addr)` | `INET` | アドレスのネットワークマスクを返します。|
| `masklen(inet addr)` | `BIGINT` | ネットワークマスクのプレフィックス長を返します。|
| `broadcast(inet addr)` | `INET` | ネットワークのブロードキャストアドレスを返します。|
| `family(inet addr)` | `BIGINT` | アドレスファミリーを返します。IPv4 の場合は `4`、IPv6 の場合は `6` です。|

### 演算子 {#operators}

| 演算子 | 戻り値の型 | 説明 |
|----------|-------------|-------------|
| `inet a << inet b` | `BOOLEAN` | `a` が厳密に `b` 内に含まれている場合に `true` を返します。|
| `inet a <<= inet b` | `BOOLEAN` | `a` が `b` 内に含まれているか、それと等しい場合に `true` を返します。|
| `inet a >> inet b` | `BOOLEAN` | `a` が厳密に `b` を含む場合に `true` を返します。|
| `inet a >>= inet b` | `BOOLEAN` | `a` が `b` を含むか、それと等しい場合に `true` を返します。|
| `inet a && inet b` | `BOOLEAN` | `a` と `b` のサブネットが重複する場合に | を返します。`true`

{{% collapse-content title="例" level="h3" %}}

### `host` {#host}
{{< code-block lang="sql" >}}
SELECT host(INET '192.168.1.5/24')
-- Returns: 192.168.1.5
{{< /code-block >}}

### `network` {#network}
{{< code-block lang="sql" >}}
SELECT network(INET '192.168.1.5/24')
-- Returns: 192.168.1.0/24
{{< /code-block >}}

### `netmask` {#netmask}
{{< code-block lang="sql" >}}
SELECT netmask(INET '192.168.1.5/24')
-- Returns: 255.255.255.0
{{< /code-block >}}

### `masklen` {#masklen}
{{< code-block lang="sql" >}}
SELECT masklen(INET '192.168.1.5/24')
-- Returns: 24
{{< /code-block >}}

### `broadcast` {#broadcast}
{{< code-block lang="sql" >}}
SELECT broadcast(INET '192.168.1.5/24')
-- Returns: 192.168.1.255/24
{{< /code-block >}}

### `family` {#family}
{{< code-block lang="sql" >}}
SELECT family(INET '::1')
-- Returns: 6

SELECT family(INET '192.168.1.5')
-- Returns: 4
{{< /code-block >}}

### 包含演算子 {#containment-operators}
{{< code-block lang="sql" >}}
-- Check if an IP is within a subnet
SELECT INET '192.168.1.5' << INET '192.168.1.0/24'
-- Returns: true

-- Check containment or equality
SELECT INET '192.168.1.0/24' <<= INET '192.168.1.0/24'
-- Returns: true

-- Check if a subnet contains an IP
SELECT INET '10.0.0.0/8' >> INET '10.1.2.3'
-- Returns: true

-- Check if two subnets overlap
SELECT INET '192.168.1.0/24' && INET '192.168.1.128/25'
-- Returns: true
{{< /code-block >}}

### 組み合わせた使用方法 {#combined-usage}
{{< code-block lang="sql" >}}
-- Find all IPs in a private subnet and extract network info
SELECT
  host(CAST(src_ip AS inet)) AS ip,
  masklen(CAST(src_ip AS inet)) AS prefix_len,
  network(CAST(src_ip AS inet)) AS network
FROM connections
WHERE CAST(src_ip AS inet) << INET '10.0.0.0/8'
  AND family(CAST(src_ip AS inet)) = 4
{{< /code-block >}}

{{% /collapse-content %}}

## テーブル関数 {#table-functions}
テーブル関数は、ログ、メトリクス、Cloud Cost、その他のデータソースをクエリするために使用されます。

<table style="width: 100%; table-layout: fixed;">
  <thead>
    <tr>
      <th style="width: 33%;">関数</th>
      <th style="width: 33%;">説明</th>
      <th style="width: 33%;">例</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <pre>
dd.logs(
    columns => array < varchar >,
    filter ?=> varchar,
    indexes ?=> array < varchar >,
    storage ?=> varchar,
    from_timestamp ?=> timestamp,
    to_timestamp ?=> timestamp
) AS (column_name type [, ...])</pre>
      </td>
      <td>ログデータをテーブルとして返します。columns パラメーターは、抽出するログフィールドを指定します。ネストされたフィールドにはドット表記を使用してアクセスします。非コアフィールドには、 <code>@</code>の接頭辞を付ける必要があります。AS 句は返されるテーブルのスキーマを定義します。オプション: インデックスまたは時間範囲でフィルタリングします。時間が指定されていない場合、DDSQL はデフォルトでグローバル時間設定を使用します。DDSQL エディターでは、これは過去 1 時間に設定されています。オプション: 使用するストレージを指定します (たとえば、<code>hot</code>、<code>flex_tier</code>)。指定されていない場合のデフォルトは、ホットストレージです。</td>
      <td>
        {{< code-block lang="sql" >}}
SELECT timestamp, host, service, message, asset_id
FROM dd.logs(
    filter  => 'source:java',
    columns => ARRAY['timestamp','host','service','message','@asset.id']
) AS (
    timestamp TIMESTAMP,
    host      VARCHAR,
    service   VARCHAR,
    message   VARCHAR,
    asset_id  VARCHAR
){{< /code-block >}}
      </td>
    </tr>
    <tr>
      <td>
        <pre>
dd.metrics_scalar(
    query varchar,
    reducer varchar [, from_timestamp timestamp, to_timestamp timestamp]
)</pre>
      </td>
      <td>メトリクスデータをスカラー値として返します。この関数は、メトリクスクエリ (オプションでグループ化を指定)、値の集計方法を決定するレデューサー (avg、max など)、および時間範囲を定義するオプションのタイムスタンプパラメーター (デフォルトは 1 時間) を受け入れます。</td>
      <td>
        {{< code-block lang="sql" >}}
SELECT *
FROM dd.metrics_scalar(
    'avg:system.cpu.user{*} by {service}',
    'avg',
    TIMESTAMP '2025-07-10 00:00:00.000-04:00',
    TIMESTAMP '2025-07-17 00:00:00.000-04:00'
)
ORDER BY value DESC;{{< /code-block >}}
      </td>
    </tr>
    <tr>
      <td>
        <pre>
dd.metrics_timeseries(
    query varchar [, from_timestamp timestamp, to_timestamp timestamp]
)</pre>
      </td>
      <td>メトリクスデータを時系列として返します。この関数は、メトリクスクエリ (オプションでグループ化を指定) および時間範囲を定義するオプションのタイムスタンプパラメーター (デフォルトは 1 時間) を受け入れます。単一の集計値ではなく、一定期間のデータポイントを返します。</td>
      <td>
        {{< code-block lang="sql" >}}
SELECT *
FROM dd.metrics_timeseries(
    'avg:system.cpu.user{*} by {service}',
    TIMESTAMP '2025-07-10 00:00:00.000-04:00',
    TIMESTAMP '2025-07-17 00:00:00.000-04:00'
)
ORDER BY timestamp, service;{{< /code-block >}}
      </td>
    </tr>
    <tr>
      <td>
        <pre>
dd.cloud_cost_scalar(
    query varchar,
    reducer varchar
    [, from_timestamp timestamp,
    to_timestamp timestamp]
)</pre>
      </td>
      <td><a href="/cloud_cost_management/">Cloud Cost Management</a> データをスカラー値として返します。この関数は、Cloud Cost クエリ (オプションでグループ化を指定)、集計レデューサー (コストデータには <code>sum</code> を使用。 <code>avg</code>、<code>min</code>、および <code>max</code> などのその他のレデューサーも受け入れられますが、コストクエリではほとんど使用されません)、および時間範囲を定義するオプションのタイムスタンプパラメーター (デフォルトは 1 時間) を受け入れます。<strong>注</strong>: Cloud Cost データは通常 24 ～ 48 時間遅延するため、最新のタイムスタンプは結果を返さない場合があります。</td>
      <td>
        {{< code-block lang="sql" >}}
SELECT *
FROM dd.cloud_cost_scalar(
    'sum:all.cost{*} by {service}',
    'sum',
    TIMESTAMP '2025-07-10 00:00:00.000-04:00',
    TIMESTAMP '2025-07-17 00:00:00.000-04:00'
)
ORDER BY value DESC;{{< /code-block >}}
      </td>
    </tr>
    <tr>
      <td>
        <pre>
dd.cloud_cost_timeseries(
    query varchar
    [, from_timestamp timestamp,
    to_timestamp timestamp]
)</pre>
      </td>
      <td><a href="/cloud_cost_management/">Cloud Cost Management</a> データを時系列として返します。この関数は、Cloud Cost クエリ (オプションでグループ化を指定) および時間範囲を定義するオプションのタイムスタンプパラメーター (デフォルトは 1 時間) を受け入れます。単一の集計値ではなく、一定期間のコストデータポイントを返します。<strong>注</strong>: Cloud Cost データは通常 24 ～ 48 時間遅延するため、最新のタイムスタンプは結果を返さない場合があります。</td>
      <td>
        {{< code-block lang="sql" >}}
SELECT *
FROM dd.cloud_cost_timeseries(
    'sum:all.cost{*} by {service}',
    TIMESTAMP '2025-07-10 00:00:00.000-04:00',
    TIMESTAMP '2025-07-17 00:00:00.000-04:00'
)
ORDER BY timestamp, service;{{< /code-block >}}
      </td>
    </tr>
  </tbody>
</table>

{{% collapse-content title="例" level="h3" %}}

### 絶対タイムスタンプ {#absolute-timestamps}

{{< code-block lang="sql" >}}
SELECT *
FROM dd.logs(
    columns => ARRAY['timestamp','host','service','message'],
    from_timestamp => TIMESTAMP '2025-07-10 00:00:00.000-04:00',
    to_timestamp => TIMESTAMP '2025-07-17 00:00:00.000-04:00'
) AS (
    timestamp TIMESTAMP,
    host      VARCHAR,
    service   VARCHAR,
    message   VARCHAR
)
{{< /code-block >}}

### 相対タイムスタンプ {#relative-timestamps}

{{< code-block lang="sql" >}}
SELECT *
FROM dd.logs(
    columns => ARRAY['timestamp','host','service','message'],
    from_timestamp => now() - INTERVAL '7 days',
    to_timestamp => now()
) AS (
    timestamp TIMESTAMP,
    host      VARCHAR,
    service   VARCHAR,
    message   VARCHAR
)
{{< /code-block >}}

### オプションパラメーター {#optional-parameters}

{{< code-block lang="sql" >}}
SELECT *
FROM dd.logs(
    columns => ARRAY['timestamp','host','service','message'],
    filter  => 'source:java',
    indexes => ARRAY['trino'],
    storage => 'hot'
) AS (
    timestamp TIMESTAMP,
    host      VARCHAR,
    service   VARCHAR,
    message   VARCHAR
)
{{< /code-block >}}

### ネストされたフィールドへのアクセス {#nested-field-access}

列のエイリアスにドットを含めることはできません。エイリアスを定義する際には、ドットをアンダースコアなどの有効な文字に置き換えてください。

{{< code-block lang="sql" >}}
SELECT timestamp, host, asset_id, view_url, data_resource_type
FROM dd.logs(
    filter  => 'service:mcp',
    columns => ARRAY['timestamp','host','@asset.id','@view.url','@data.resource.type']
) AS (
    timestamp TIMESTAMP,
    host      VARCHAR,
    asset_id  VARCHAR,
    view_url  VARCHAR,
    data_resource_type VARCHAR
)
{{< /code-block >}}

{{% /collapse-content %}}

## タグ {#tags}

DDSQL は、タグを `hstore` 型として公開します。これは PostgreSQL から着想を得たものです。PostgreSQL の矢印演算子を使用して、特定のタグキーの値にアクセスできます。たとえば、次のようにします。

```sql
SELECT instance_type, count(instance_type)
FROM aws.ec2_instance
WHERE tags->'region' = 'us-east-1' -- region is a tag, not a column
GROUP BY instance_type
```

タグはキーと値のペアです。各キーには 0、1、またはそれに対応する複数のタグ値を割り当てることができます。アクセスされると、タグ値は対応する_すべて_の値を含む単一の文字列を返します。データで、同じタグキーに対して複数のタグ値がある場合、それらはソートされたカンマ区切りの文字列として表されます。たとえば、次のようになります。

```sql
SELECT tags->'team', instance_type, architecture, COUNT(*) as instance_count
FROM aws.ec2_instance
WHERE tags->'team' = 'compute_provisioning,database_ops'
GROUP BY tags->'team', instance_type, architecture
ORDER BY instance_count DESC
```

タグの値を文字列として比較するか、タグセット全体を比較することもできます。

```sql
SELECT *
FROM k8s.daemonsets da INNER JOIN k8s.deployments de
ON da.tags = de.tags -- for a specific tag: da.tags->'app' = de.tags->'app'
```

また、タグキーとタグ値をそれぞれ個別のテキスト配列に抽出することもできます。

```sql
SELECT akeys(tags), avals(tags)
FROM aws.ec2_instance
```

### HSTORE 関数と演算子 {#hstore-functions-and-operators}

| 名前                                          | 戻り値の型   | 説明                                                                                      |
|-----------------------------------------------|---------------|---------------------------------------------------------------------------------------------------
| tags -> 'text'                                  | テキスト          | 指定されたキーの値を取得します。キーが存在しない場合は `null` を返します。                            |
| akeys(hstore tags)                            | テキストの配列 | HSTORE のキーを配列として取得します。                                                            |
| avals(hstore tags)                            | テキストの配列 | HSTORE の値を配列として取得します。                                                          |

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/notebooks/advanced_analysis
[2]: https://www.postgresql.org/docs/current/functions-window.html
[3]: https://www.postgresql.org/docs/current/functions-json.html
[4]: /ja/ddsql_editor/
[5]: https://unicode-org.github.io/icu/userguide/strings/regexp.html#regular-expression-metacharacters
[6]: https://unicode-org.github.io/icu/userguide/strings/regexp.html#regular-expression-operators
[7]: https://unicode-org.github.io/icu/userguide/strings/regexp.html#set-expressions-character-classes
[8]: https://unicode-org.github.io/icu/userguide/strings/regexp.html#flag-options
[9]: https://unicode-org.github.io/icu/userguide/strings/regexp.html#find-and-replace
[10]: /ja/bits_ai/mcp_server/