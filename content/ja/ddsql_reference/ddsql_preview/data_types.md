---
aliases:
- /ja/dashboards/ddsql_editor/reference/data_types/
- /ja/ddsql_editor/reference/data_types/
private: true
title: DDSQL Editor のデータ型 (プレビュー)
---

## データの種類

DDSQL は、PostgreSQL の流れを汲む SQL 型システムの簡易版を実装しています。

### 基本型

| SQL での名称   | エイリアス                  | 説明 |
|------------|--------------------------|-------------|
| 整数    | 整数                      | 格納形式は常に int64 です。 |
| テキスト       | char、varchar、string    | 格納形式は常に長さ無制限の UTF-8 文字列です。 |
| real       | double、decimal          | 格納形式は常に IEEE-754 の float64 です。 |
| タイムスタンプ  | timestamp without time zone | SQL 標準の datetime 型。 |
| date       |                          | 日単位の精度を持つタイムスタンプ。 |
| interval   |                          | 経過時間。 |
| グループ      | hstore、tag_column       | 「=」「is」「contains」というタグのようなセマンティクスを持つ、ソートされた文字列の集合。 |
| ブール値    |                          | `TRUE` または `FALSE` |
| json       |                          | JSON データ |

### 配列
配列は、特定の基本型の順序付きコレクションです。各基本型には、対応する配列型があります。

### リテラル

次の表では、`SELECT <LITERAL>` のような式や、`WHERE timestamp > timestamp '1 hr ago'` のような比較で使用するリテラルの宣言方法を型別に例示しています。

| 名前       | 例 |
|------------|---------|
| 整数    | `1`、`4`、`23901239412`、`0x4B1D` |
| テキスト       | `'Hello, world'` |
| real       | `1.0`、`1e30`、`314e-2`、`.25`、`5.` |
| date       | `date <DATE_STRING>` (`DATE_STRING` は日付にパースできる文字列、または `1 day ago` のような相対的な文字列）。 |
| タイムスタンプ  | `timestamp <TIMESTAMP_STRING>` (`TIMESTAMP_STRING` はタイムスタンプにパースできる文字列、または `'1 day ago'`、`'now'` のような相対的な文字列）。 |
| interval  | `interval <INTERVAL>` (`INTERVAL` は、`1 day`、`30s`、`2 min` など、時間の間隔にパースできる文字列）。 |
| arrays    | `array<type>[values...]` |