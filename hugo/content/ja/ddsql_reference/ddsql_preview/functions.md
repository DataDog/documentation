---
aliases:
- /ja/dashboards/ddsql_editor/reference/aggregation_functions
- /ja/dashboards/ddsql_editor/reference/scalar_functions/
- /ja/ddsql_editor/reference/scalar_functions
- /ja/ddsql_editor/reference/aggregation_functions
- /ja/ddsql_editor/reference/functions
private: true
title: DDSQL 関数 (プレビュー)
---

## 集約関数

集約関数は入力値の集合から単一の結果を計算します。通常は `GROUP BY` 句と併用されます。

### avg
| 名前 | 引数の型 | 戻り値の型 | 説明 |
|------|----------------|-------------|-------------|
| avg(expr *e*) | numeric | numeric | NULL でないすべての入力値の平均 (算術平均) を計算します。 |

### max
| 名前 | 引数の型 | 戻り値の型 | 説明 |
|------|----------------|-------------|-------------|
| max(expr *e*) | variable | variable | NULL でない入力値の最大値を計算します。入力値の型は相互に比較可能である必要があります。 |

### min
| 名前 | 引数の型 | 戻り値の型 | 説明 |
|------|----------------|-------------|-------------|
| min(expr *e*) | variable | variable | NULL でない入力値の最小値を計算します。入力値の型は相互に比較可能である必要があります。 |

### sum
| 名前 | 引数の型 | 戻り値の型 | 説明 |
|------|----------------|-------------|-------------|
| sum(expr *e*) | numeric | numeric | NULL でない入力値の合計を計算します。 |

### count
| 名前 | 引数の型 | 戻り値の型 | 説明 |
|------|----------------|-------------|-------------|
| count(expr *e*) | numeric | integer | 入力値が NULL でない行の数を計算します。 |
| count(distinct expr *e1*, *e2* ...) | | integer | NULL でない入力値の個数を、重複を除いて数えます。 |
| count(*) | | integer | 入力行数を計算します。 |

### string_agg
| 名前 | 引数の型 | 戻り値の型 | 説明 |
|------|----------------|-------------|-------------|
| string_agg(expr *e*, delimiter *e*) | string, string | string | 入力値を区切り文字で連結します。 |

### array_agg
| 名前 | 引数の型 | 戻り値の型 | 説明 |
|------|----------------|-------------|-------------|
| array_agg(expr *e*) | variable | array<variable> | 入力値を配列に連結します。 |


## スカラー関数

これらの関数は行ごとに 1 つの値を返します。

### 文字列関数と演算子

| 名前 | 戻り値の型 | 説明 |
|------|-------------|-------------|
| upper(text *s*) | text | *s* を大文字に変換します。 |
| lower(text *s*) | text | *s* を小文字に変換します。 |
| length(text *s*) | integer | *s* の文字数を数えます。 |
| concat(expr *x*, *y*, ...) | text | 指定された式を連結します。 |
| substr(expr *s*, numeric *start*, numeric *numChars*) | text | *s* の部分文字列を返します。開始位置 *start* から、最大 *numChars* 文字 (指定された場合) までを取得します。*start* は 1 始まりのインデックスなので、`substr('hello', 2)` は `'ello'` を返します。開始位置が 1 未満の場合は 1 として扱われます。結果は文字範囲 `[start, start+numChars]` を取ることで計算され、いずれかの値が 1 未満なら 1 として扱われます。つまり、`substr('hello', -2, 4)` は `'h'` を返します。 |
| replace(text *s*, text *from*, text *to*) | text | *s* 中の部分文字列 *from* をすべて部分文字列 *to* に置換します。 |
| regexp_replace(text *s*, text *pattern*, text *replacement*) | text | *s* 中で POSIX 正規表現 *pattern* に一致する部分を *replacement* に置換します。Go の [正規表現構文][1] をサポートします。 |
 reverse(expr *text*) | string | 文字列を反転します (brown → nworb)。|
| md5(expr *text*) | string | 文字列の MD5 ハッシュを計算し、16 進数で返します。|
| char_length(str *text*) | integer | str の文字数を返します。|
| left(str *text*, *n* int) | text | str の先頭 *n* 文字を返します。*n* が負のときは、末尾の |n| 文字を除くすべてを返します。|
| right(str *text*, *n* int) | text | str の末尾 *n* 文字を返します。*n* が負のときは、先頭の |n| 文字を除くすべてを返します。|
| ltrim(str *text* [, characters text]) | text | str の先頭から、characters (既定ではスペース) に含まれる文字だけで構成される最長の並びを取り除きます。|
| rtrim(str *text* [, characters text]) | text | str の末尾から、characters (既定ではスペース) に含まれる文字だけで構成される最長の並びを取り除きます。|
| trim([leading | trailing | both] [characters] from str) | text | str の先頭/末尾/両端から、characters (既定ではスペース) に含まれる文字だけで構成される最長の並びを取り除きます。|
| sort_order_ip(ip text) | text | IPv4 と IPv6 の範囲に対する並び順を表す文字列を返します。|


### 数学関数と演算子

| 名前 | 戻り値の型 | 説明 |
|------|-------------|-------------|
| abs(numeric *n*) | integer | *n* の絶対値を返します。 |
| round(numeric *n*, [*s*]) | numeric | *n* を小数点以下 *s* 桁に丸めます。 |
| mod(numeric *x*, numeric *y*) | integer | `x / y` の余りを返します。 |
| floor(numeric *n*) | numeric | *n* 以下で最も近い整数を返します。 |
| ceil(numeric *n*) | numeric | *n* 以上で最も近い整数を返します。 |
| power(numeric *n*, numeric *s*) | numeric | *n* を *s* 乗します。 |
| ln(numeric *n*) | numeric | *n* の自然対数を計算します。 |
| log(numeric *n*)  | numeric | *n* の常用対数 (底 10) を計算します。 |
| log2(numeric *n*) | numeric | *n* の底 2 の対数を計算します。 |
| exp(numeric *n*) | numeric | 数学定数 e の *n* 乗を返します。 |
| sqrt(numeric *n*) | numeric | *n* の平方根を計算します。 |


### 配列関数と演算子
| 名前 | 戻り値の型 | 説明 |
|------|-------------|-------------|
| array_length(array *a*) | integer | 各行について、配列 *a* の長さを返します。 |
| array_contains(array *a*, expr *e*) | boolean | 各行について、式 *e* の評価結果が配列 *a* に含まれていれば true を返します。 |
| array_cat(array *a*, array *b*) | array | 配列 *a* と配列 *b* の要素を結合した新しい配列を返します。  |
| array_append(array *a*, expr *e*) | array | 入力配列の全要素に続けて要素 *e* を追加した新しい配列を返します。 |
| string_to_array(text *s*, delimiter, [,nullString]) | array | 入力文字列 *s* を指定した区切り文字で分割し、部分文字列の配列を返します。第 3 引数 nullString は省略可能で、指定した部分文字列を `NULL` に置換します。 |
| array_to_string(array *a*, delimiter, [,nullString]) | string | 指定した区切り文字と (任意の) null 文字列を用いて配列要素を連結します。 |
| unnest(array *a*) | variable | 配列の各要素を <strong>別々の行として</strong>返します。戻り値の型は配列の要素型です。<br>`unnest` はクエリの `SELECT` 句でのみ使用できます。`unnest` と一緒に他の列を `SELECT` した場合、テーブルの各行の値は、展開された各要素ごとに繰り返されます。複数列を展開する場合、展開列同士は行ごとに対応付けられ、短い配列の不足分には `NULL` が補われます。 |

### 日付/時刻 関数と演算子

| 名前 | 戻り値の型 | 説明 |
|------|-------------|-------------|
| date_trunc(string *precision*, timestamp *t*) | timestamp | timestamp を指定の *precision* ("second", "minute", "hour", "day", "week", "month", "year") に切り詰めます。 |
| date_diff(string *precision*, timestamp *t*, timestamp *t*) | integer | 指定した精度で、2 つの日時の差を返します。 |
| to_timestamp(numeric *n*) | timestamp | *n* を秒単位の時刻とみなして timestamp に変換します。|

### 条件式

| 名前 | 戻り値の型 | 説明 |
|------|-------------|-------------|
| coalesce(expr *x*, *y*, ...) | variable | 最初の NULL でない式を返します。 |
| nullif(expr *x*, expr *y*) | variable | 2 つの引数が等しい場合は `NULL` を返します。そうでない場合は *x* を返します。 |

### JSON 関数と演算子

| 名前 | 戻り値の型 | 説明 |
|------|-------------|-------------|
| json_extract_path_text(text json, text path...) | text | 指定したパスで JSON のサブ オブジェクトを特定し、テキストとして抽出します。動作は、[同名の Postgres 関数][2] と同等です。たとえば、`json_extract_path_text(col, ‘forest')` は、`col` の各 JSON オブジェクトに対してキー `forest` の値を返します。JSON 配列の構文例は下記を参照してください。|
| json_extract_path(text json, text path...) | json | `json_extract_path_text` と同じ機能ですが、戻り値は text 型ではなく JSON 型の列になります。|
| json_build_object(key1 text, value1 json/text/int/float, key2 text, value2 json/text/int/float, ...) | json | 渡された引数に基づいて JSON オブジェクトを構築します。関数の引数は、生成する JSON オブジェクトのキーと値を、キー→値の順に交互に指定します。|
| row_to_json(table) | json | テーブルの各行を JSON 値として表現したものを返します。JSON のキーは列名、値は各行の各列の値です。<br><br><strong>注記</strong>: row_to_json は列ではなくテーブル名を受け取ります。例: `SELECT row_to_json(<table>) FROM <table>` |

#### JSON 配列
  `col` の各 JSON オブジェクト (または行) について、JSON 配列の 0 番目の要素にあるキー `forest` の値を返します。

```json
[{
"forest": "trees"
}]

```

```
json_extract_path_text(col, ‘0', ‘forest')
```


[1]: https://pkg.go.dev/regexp/syntax
[2]: https://www.postgresql.org/docs/current/functions-json.html