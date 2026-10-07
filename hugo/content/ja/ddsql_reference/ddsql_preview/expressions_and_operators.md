---
aliases:
- /ja/dashboards/ddsql_editor/reference/expressions_and_operators/
- /ja/ddsql_editor/reference/expressions_and_operators/
private: true
title: DDSQL の式と演算子 (プレビュー)
---

*値の式* は、条件、`SELECT` 式、フィルタ、および `WHERE`、`ORDER BY`、`GROUP BY` のような句の値を生成するために使用される一般的な式言語です。DDSQL の式構文は、SQL の式構文のスーパーセットです。

## 算術演算子

DDSQL は、SQL および多くの他の言語で用いられる標準的な 2 項および 1 項の中置算術記法をサポートします:

| 演算子 | 説明              | 例 | 結果 |
|----------|--------------------------|---------|--------|
| +        | 加算                 | 2 + 3   | 5      |
| -        | 減算              | 2 - 3   | -1     |
| *        | 乗算           | 2 * 3   | 6      |
| /        | 除算 (非切り捨て) | 5 / 2   | 2.5    |


標準的な演算子の優先順位が適用されます。演算順序を制御するには、括弧を追加します: `(5 - 2) * 3`。

## 比較演算子

DDSQL は、次の比較演算子を実装しています:

| 演算子 | 説明            | 例 | 結果 |
|----------|------------------------|---------|--------|
| >        | より大きい           | 2 > 3   | false  |
| <        | より小さい              | 2 < 3   | true   |
| >=       | 以上 | 3 >= 2  | true   |
| <=       | 以下    | 3 <= 2  | false  |
| =        | 等しい*                | 3 = 3   | true   |
| !=, <>   | 等しくない             | 3 != 3  | false  |

タグ参照およびタグ グループに対しては、等価演算子 (`=`) は「含む」比較として扱われます。詳細は [DDSQL におけるタグのクエリ][1] を参照してください。

## SQL の比較キーワード

DDSQL は、標準的なブール演算子として機能する次の SQL キーワードをサポートします:

| 演算子 | 説明            | 例 | 結果 |
|----------|------------------------|---------|--------|
| `NOT`    | 複数の条件に基づいてレコードをフィルタする。 | `SELECT * FROM host WHERE NOT env = 'prod';`   | prod 環境ではないすべてのホストを返す。  |
| `AND`    | 複数の条件に基づいてレコードをフィルタする。 | `SELECT * FROM host WHERE env = 'prod' AND cloud_provider = 'aws';`   | prod 環境で、クラウド プロバイダが AWS であるすべてのホストを返す。  |
| `OR`     | 複数の条件に基づいてレコードをフィルタする。 | `SELECT * FROM host WHERE env = 'prod' AND cloud_provider = 'aws';`   | prod 環境、または AWS クラウド プロバイダのいずれかにあるすべてのホストを返す。  |

DDSQL は、SQL 標準で定義されている次の比較キーワードもサポートします:

| 演算子     | 説明            | 例 | 結果 |
|--------------|------------------------|---------|--------|
| `IS NULL`    | 指定したフィールドが null の場合に行を選択する。 | `SELECT * FROM host WHERE cloud_provider IS NULL;`   | `cloud_provider` 列にデータがない行をすべて返す。  |
| `IS NOT NULL`| 指定したフィールドが null でない場合に行を選択する。欠損データの行を除外する。 | `SELECT * FROM host WHERE cloud_provider IS NOT NULL;` | `cloud_provider` 列にデータがある行をすべて返す。   |
| `LIKE`       | 文字列の値に含まれる特定のパターンを検索する。次のワイルドカード文字でパターンを定義できる:<br>**パーセント記号 (%)**: 0 文字、1 文字、または複数の文字を表す。<br>**アンダースコア (_)**: 1 文字を表す。 | `SELECT * FROM aws_eks_cluster WHERE LOWER(logging) LIKE '%"enabled":true%';` | `aws_eks_cluster` テーブルのうち、`logging` 列が `"enabled":true` である行をすべて返す。  |
| `NOT LIKE`   | 文字列の値に特定のパターンが含まれている行を検索結果から除外する。パターン マッチングには `%` と `_` のワイルドカードを使用できる。 | `SELECT * FROM aws_eks_cluster WHERE LOWER(logging) NOT LIKE '%"enabled":true%';` | `aws_eks_cluster` テーブルのうち、`logging` に `"enabled":true%'` が **含まれていない** 行をすべて返す。 |
| `IN`         | `WHERE` 句で複数の値を検索する。`IN` 演算子は、複数の `OR` 条件の短縮形。 | `SELECT * FROM host WHERE cloud_provider IN ('aws', 'gcp');`  | `host` テーブルのうち、`cloud_provider` の値が 'aws' または 'gcp' の行をすべて返す。|
| `NOT IN`     | 引数の集合を、`AND` 演算子と組み合わせた `<>` または `!=` 演算子で置き換える。| `SELECT * FROM host WHERE cloud_provider NOT IN ('aws', 'gcp');`  | `cloud_provider` が `aws` または `gcp` ではない行をすべて返す。 |


DDSQL は `BETWEEN` キーワードもサポートしており、`a BETWEEN x AND y` は `a >= x AND a <= y` と同等。詳細は [`BETWEEN` に関する Postgres のドキュメント][2] を参照。

## 論理演算子

| 名前    | 説明             |
|---------|-------------------------|
| AND     | ブール ロジック、a & b    |
| OR      | ブール ロジック、a &vert;&vert; b |
| XOR     | ブール ロジック、a ^ b    |
| NOT     | ブール ロジック、!a       |
| IS NULL | null の各行に対して true を返す |


## CASE

`CASE` 式は一般的な条件式であり、他のプログラミング言語の if/else 文に類似する。`CASE` には、単純と検索の 2 つの形式がある。

### 単純 CASE 式

単純 CASE 式は次の構文を使用する:

{{< code-block lang="sql" >}}
CASE expression
  WHEN value THEN result
  [ WHEN ... ]
  [ ELSE result ]
END
{{< /code-block >}}

式が評価され、`WHEN` 句内の各値式と順に比較され、一致するものが見つかるまで続く。一致が見つからない場合は、`ELSE` 句の結果、または `ELSE` が省略された場合は `NULL` が返される。

### 検索 CASE 式

検索 CASE 式は次の構文を使用する:

{{< code-block lang="sql" >}}
CASE
  WHEN condition THEN result
  [ WHEN ... ]
  [ ELSE result ]
END
{{< /code-block >}}

条件の結果が true の場合、`CASE` 式の値はその条件に続く結果となり、以降の `CASE` 式は処理されない。条件の結果が true でない場合、後続の `WHEN` 句が同様に評価される。いずれの `WHEN` 条件も true を生成しない場合、`CASE` 式の値は `ELSE` 句の結果となる。`ELSE` 句が省略され、かつどの条件も true でない場合、結果は `NULL`。

## CAST

`CAST` は、あるデータ型から別のデータ型への変換を指定する。

### 構文

{{< code-block lang="sql" >}}
CAST(expression AS type)
{{< /code-block >}}

すべての型がこの方法で変換できるわけではない。

DDSQL は Postgres のキャスト構文もサポートする:

{{< code-block lang="sql" >}}
expression::type
{{< /code-block >}}

例: `SELECT 1::text;`。


[1]: /ja/ddsql_reference/ddsql_preview/tags/
[2]: https://www.postgresql.org/docs/current/functions-comparison.html