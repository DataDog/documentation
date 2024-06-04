---
title: DDSQL Statements
kind: documentation
---

## Supported SQL syntax

SQL is broken into five different categories of statements. The table below indicates which categories are supported by DDSQL.

| Category                           | Examples                                         | Support                                        |
|------------------------------------|--------------------------------------------------|------------------------------------------------|
| DQL (Data Query Language)          | `SELECT`, `AGGR` (DDSQL alternative to `SELECT`) | Supported                                      |
| DML (Data Modification Language)   | `INSERT`, `UPDATE`, `DELETE`                     | Limited: Data is not persisted across sessions |
| DDL (Data Description Language)    | `CREATE`                                         | Limited: Data is not persisted across sessions |
| DCL (Data Control Language)        | `GRANT`, `REVOKE`                                | Not supported                                  |
| TCL (Transaction Control Language) | `BEGIN`, `END`, `ROLLBACK`                       | Not supported                                  |

## SELECT

`SELECT` retrieves rows from a table or view.

### Syntax

{{< code-block lang="text" >}}
SELECT [ ALL | DISTINCT ] selectExpr, …
  [ FROM relSource EVENT_SEARCH 'some message' USE EVENT_INDEX 'index_name'
[ JOIN_TYPE relSource ... [ ON condition | USING (column, … ) ] ] … ]
  [ WHERE condition ]
[ GROUP BY [ ALL | DISTINCT ] expression, … ]
[ HAVING condition, … ]
[ ORDER BY expression, … [ ASC | DESC ] [ NULLS FIRST | NULLS LAST ] ]
[ LIMIT [ ALL | expression ]
  [ OFFSET expression] ]
{{< /code-block >}}

`selectExpr`
: Any expression that returns a value. It may be a constant, function call, aggregate, window, or the special expression `*`. This is the part of the query that specifies the output of the SELECT statement, and in relational algebra it is known as the projection.
 
`relSource`
: A correlation (a table name or alias) or a parenthesized DQLExpr.

`JOIN_TYPE`
: The type of SQL join, such as `INNER` or `LEFT`. `INNER` joins are fully supported. `OUTER` and `CROSS` joins may require a `WHERE` condition in order to execute. `LEFT` and `RIGHT` joins are also supported if the condition is an *equijoin* expression: an equality comparison such as `<EXPRESSION_1> = <EXPRESSION_2>` where the expressions reference columns from different tables, and the output types of both expressions are the same. A `USING` expression `JOIN`ing on only one column also works.

`condition`
: An expression that is evaluated and interpreted implicitly as having a boolean result.

`expression`
: A value expression. See [Expressions](#expressions) for details and examples.

### Evaluation

SELECT retrieves rows from zero or more tables. The general processing of SELECT is as follows:

1. All elements in `FROM` are computed. If more than one element is specified, they are joined together using the specified join type.
2. If the `WHERE` clause is specified, rows that do not satisfy the condition are eliminated from the output.
3. If the `GROUP BY` clause is specified or there are aggregate function calls in the `selectExpr`, the output is combined into groups of rows that match on one or more values, and the aggregates are computed. If `HAVING` is present, rows that do not satisfy its condition are eliminated from the output.
4. The actual output rows are computed using the `selectExpr`.
5. `SELECT DISTINCT` eliminates duplicate rows from the result.
6. If the `ORDER BY` clause is specified, the returned rows are sorted in the specified order.
7. If the `LIMIT` or `OFFSET` clause is specified, rows not in the specified subset are eliminated.

The system may execute the query in any way that is guaranteed to produce the results specified by this order.

### Window functions

TODO

## AGGR

`AGGR` is a DDSQL statement type that operates on metrics data. Its primary goal is to make executing timeseries queries more natural, flexible, composable, and concise.

<!-- QUERY: Should the syntax template below include INTERPOLATE? -->

{{< code-block lang="text" >}}
AGGR aggrExpression
[ FROM metrics ]
[ WHERE expression ]
[ ROLLUP aggregator(value) ]
[ BUCKET BY [ ALL | DEFAULT | INTERVAL 'interval' ] ]
[ GROUP BY column1, column2, … ]
[ HAVING expression, … ]
[ ORDER BY expression [ ASC | DESC ] ]
[ LIMIT [ ALL | expression ]
  [ OFFSET expression] ]
{{< /code-block >}}

`aggrExpression`
: TODO

`aggregator`
: TODO

`expression`
: TODO

`ROLLUP`
: A clause that lets you specify the time aggregator.

`BUCKET BY`
: TODO

### Examples

The following query would return a table with the schema `[ timeseries ]`:

{{< code-block lang="sql" >}}
AGGR sum("metric.name")
{{< /code-block >}}

The following query would return a table with the schema `[ timeseries, tag1, tag2, tag3 ]`:

{{< code-block lang="sql" >}}
AGGR sum("metric.name") GROUP BY tag1, tag2, tag3
{{< /code-block >}}




## Expressions















## Differences between SQL and DDSQL

### AGGR can be used instead of SELECT

In SQL, `SELECT` is the only query verb, but DDSQL adds another: `AGGR`. Both verbs return tables and are usable interchangeably in many places.

The clauses `UNION`, `WITH`, and `EXPLAIN` work with both `SELECT` and `AGGR`.

Statements that contain `UNION` and `WITH` (but not `EXPLAIN`) are themselves DQLEXPRs, meaning that they can be chained and nested.