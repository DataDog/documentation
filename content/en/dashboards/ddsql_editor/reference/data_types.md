---
title: DDSQL Data Types
---

{{< callout url="https://google.com">}}
DDSQL is in private beta.
{{< /callout >}}

## Data types

DDSQL implements a simplified version of the SQL type system that is mostly descended from SQLite.

### Base types

| SQL name   | Aliases                  | Description |
|------------|--------------------------|-------------|
| integer    | int                      | Storage is always int64. |
| text       | varchar, json            | Storage is always unlimited-length UTF-8. |
| real       | double                   | Storage is always IEEE-754 float64. |
| timestamp  | timestamp without time zone | SQL standard datetime type. |
| group      | hstore, tag_column       | Sorted set of strings with tag-like "= is contains" semantics. |
| point      |                          | An integer (seconds since Unix epoch) and float value pair. |
| timeseries |                          | A vector of points. |
| boolean    |                          | `TRUE` or `FALSE` |
| any        |                          | `ANY` is a composite, dynamic type. Values under a column with type `ANY` can be integers, real numbers, strings, or a mixture of all three. `ANY` applies to custom event attributes whose values can vary between individual events. |

### Arrays

DDSQL implements arrays: a list of elements that all have the same underlying type. DDSQL supports arrays of

- integers
- floats
- text
- booleans
- timestamps
- dates
- points
- timeseries

DDSQL also supports casting timeseries to and from arrays of points, and casting groups to and from arrays of strings.

Array types are specified with the `array<TYPE>` syntax. For example:

- To cast a column, or an expression to an array of integers, write `CAST(<EXPRESSION> AS array<int>)`, or `(<EXPRESSION>)::array<int>`.
- To declare an array literal with an explicit type (for example, text), write `array<text>['your', 'text', 'entries', 'go', 'here']`.

### Literals

The table below contains examples on how to declare literals for each type, for use in expressions like `SELECT <LITERAL>` or in comparisons like `WHERE timestamp > timestamp '1 hr ago'`.

| Name       | Example |
|------------|---------|
| integer    | `1`, `4`, `23901239412`, `0x4B1D` |
| text       | `'Hello, world'` |
| real       | `1.0`, `1e30`, `314e-2`, `.25`, `5.` |
| timestamp  | `timestamp <TIMESTAMP_STRING>'` (where `TIMESTAMP_STRING` is a string with a format that can be parsed into a timestamp, such as `'YYYY-MM-DD HH:MM:SS'` or `'YYYY-MM-DD'`, or a relative string like `1 day ago`, `1 week ago`, and so on) |
| date       | `date <DATE_STRING>` (where `DATE_STRING` is a string that can be parsed into a date, or a relative string like `1 day ago`') |
| group      | `{'hello', 'world', 5}` (non-text elements are cast to strings) |
| array      | An array can be implicitly typed: `array<int>[1, 2, ...]`,  `array<double>[1, 2.2, 3.4, 6, 0]`. Or the type can be inferred from the value: `['once', 'upon', 'a', 'time']`, `[1, 2, 3]` |
| point      | `point{1641419300, 1.0}` (integer timestamp representing seconds since Unix epoch) |
| timeseries | `timeseries{{1641419300, 3}, {1641419400, 400}, {1641419500, 20.345}}` |