---
title: DDSQL Editor Data Types (Preview)
private: true
aliases:
- /dashboards/ddsql_editor/reference/data_types/
- /ddsql_editor/reference/data_types/
---

## Data types

DDSQL implements a simplified version of the SQL type system that is mostly descended from PostgreSQL.

### Base types

| SQL name   | Aliases                  | Description |
|------------|--------------------------|-------------|
| integer    | int                      | Storage is always int64. |
| text       | char, varchar, string    | Storage is always an unlimited length UTF-8. |
| real       | double, decimal          | Storage is always IEEE-754 float64. |
| timestamp  | timestamp without time zone | SQL standard datetime type. |
| date       |                          | Timestamp with resolution on a day level. |
| interval   |                          | Duration of time. |
| group      | hstore, tag_column       | Sorted set of strings with tag-like "= is contains" semantics. |
| boolean    |                          | `TRUE` or `FALSE` |
| json       |                          | JSON data |

### Arrays
Arrays are an ordered collection of a specific base type. Each base type can have a corresponding array type.

### Literals

The table below contains examples on how to declare literals for each type, for use in expressions like `SELECT <LITERAL>` or in comparisons like `WHERE timestamp > timestamp '1 hr ago'`.

| Name       | Example |
|------------|---------|
| integer    | `1`, `4`, `23901239412`, `0x4B1D` |
| text       | `'Hello, world'` |
| real       | `1.0`, `1e30`, `314e-2`, `.25`, `5.` |
| date       | `date <DATE_STRING>` (where `DATE_STRING` is a string that can be parsed into a date, or a relative string like `1 day ago`') |
| timestamp  | `timestamp <TIMESTAMP_STRING>` (where `TIMESTAMP_STRING` is a string that can be parsed into a timestamp, or a relative string like `'1 day ago'`, `'now'`) |
| interval  | `interval <INTERVAL>` (where `INTERVAL` is a string that can be parsed into a interval, like `1 day`, `30s`, `2 min`') |
| arrays    | `array<type>[values...]` |