---
title: DDSQL Data Types
---

{{< callout url="https://datadoghq.com/private-beta/ddsql-editor">}}
DDSQL is in private beta.
{{< /callout >}}

## Data types

DDSQL implements a simplified version of the SQL type system that is mostly descended from SQLite.

### Base types

| SQL name   | エイリアス                  | 説明 |
|------------|--------------------------|-------------|
| 整数    | 整数                      | Storage is always int64. |
| decimal    |                       | Precision and scale may be ignored. DDSQL implements the decimal type as floating point, rather than fixed point. |
| テキスト       | char, varchar, json      | Storage is always unlimited-length UTF-8. |
| real       | double                   | Storage is always IEEE-754 float64. |
| timestamp  | timestamp without time zone | SQL standard datetime type. |
| グループ      | hstore, tag_column       | Sorted set of strings with tag-like "= is contains" semantics. |
| ブール値    |                          | `TRUE` or `FALSE` |

### Literals

The table below contains examples on how to declare literals for each type, for use in expressions like `SELECT <LITERAL>` or in comparisons like `WHERE timestamp > timestamp '1 hr ago'`.

| 名前       | 例 |
|------------|---------|
| 整数    | `1`, `4`, `23901239412`, `0x4B1D` |
| テキスト       | `'Hello, world'` |
| real       | `1.0`, `1e30`, `314e-2`, `.25`, `5.` |
| date       | `date <DATE_STRING>` (where `DATE_STRING` is a string that can be parsed into a date, or a relative string like `1 day ago`') |