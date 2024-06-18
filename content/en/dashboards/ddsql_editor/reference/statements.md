---
title: DDSQL Statements
---

{{< callout url="https://google.com">}}
DDSQL is in private beta.
{{< /callout >}}

## SELECT

`SELECT` retrieves rows from a table or view.

### Syntax

{{< code-block lang="text" >}}
SELECT [ ALL | DISTINCT ] selectExpr, ...
  [ FROM relSource EVENT_SEARCH 'some message' USE EVENT_INDEX 'index_name'
[ JOIN_TYPE relSource ... [ ON condition | USING (column, ... ) ] ] ... ]
  [ WHERE condition ]
[ GROUP BY [ ALL | DISTINCT ] expression, ... ]
[ HAVING condition, ... ]
[ ORDER BY expression, ... [ ASC | DESC ] [ NULLS FIRST | NULLS LAST ] ]
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

## Aliases

Aliases are substitute names for output expressions or `FROM` items. An alias is used for brevity or to eliminate ambiguity for self-joins (where the same table is scanned multiple times).

{{< code-block lang="sql" >}}
SELECT * FROM my_long_hosts_table_name as hosts
{{< /code-block >}}

When an alias is provided in a `FROM` item, it completely hides the actual name of the table or function. In the above example, the remainder of the DQLExpr must refer to `my_long_hosts_table_name` as `hosts`.

## Ordinals

`GROUP BY` and `ORDER BY` clause expressions can be column names, arbitrary expressions formed from input columns, or the name or ordinal number of an output expression (a `SELECT` expression). Output expression ordinals are 1-indexed.

For example, the output of this query is ordered first by `ex1`, then `ex2`, and then `ex3`:

{{< code-block lang="java" filename="block.java" disable_copy="true" collapsible="true" >}}
SELECT ex1, ex2, ex3 FROM table ORDER BY 3, 2, 1;
{{< /code-block >}}

## AGGR

`AGGR` is a DDSQL statement type that operates on metrics data. Its primary goal is to make executing timeseries queries more natural, flexible, composable, and concise.

<!-- QUERY: Should the syntax template below include INTERPOLATE? -->

### Syntax

{{< code-block lang="text" >}}
AGGR aggrExpression
[ FROM metrics ]
[ WHERE expression ]
[ ROLLUP aggregator(value) ]
[ BUCKET BY [ ALL | DEFAULT | INTERVAL 'interval' ] ]
[ GROUP BY column1, column2, ... ]
[ HAVING expression, ... ]
[ ORDER BY expression [ ASC | DESC ] ]
[ LIMIT [ ALL | expression ]
  [ OFFSET expression] ]
{{< /code-block >}}

`aggrExpression`
: An [`AGGR` function][2], such as `avg` or `max`.

`aggregator`
: An [`AGGR` function][2], such as `avg` or `max`.

`ROLLUP`
: A clause that lets you specify the time aggregator. Required if the aggregator is `sum`, `min`, `max`, `avg` or `count`. See the [`ROLLUP` documentation](#rollup).

`BUCKET BY`
: A clause on the `AGGR` statement that controls time aggregation. See the [`BUCKET BY` documentation](#bucket-by).

`AGGR` statements can be nested to achieve multiple layers of aggregation. See [Multilayer aggregation](#multilayer-aggregation).

### Examples

The following query would return a table with the schema `[ timeseries ]`:

{{< code-block lang="sql" >}}
AGGR sum("metric.name")
{{< /code-block >}}

The following query would return a table with the schema `[ timeseries, tag1, tag2, tag3 ]`:

{{< code-block lang="sql" >}}
AGGR sum("metric.name") GROUP BY tag1, tag2, tag3
{{< /code-block >}}

### ROLLUP

`ROLLUP` is a clause on the `AGGR` statement that lets you specify the time aggregator. 

For example:

{{< code-block lang="sql" >}}
AGGR sum("system.load.1") ROLLUP count(value);
{{< /code-block >}}

The supported time aggregators are 

- `sum(value)`
- `avg(value)`
- `min(value)`
- `max(value)` 
- `count(value)`

`ROLLUP` can only be specified against point metric tables (and is required if the aggregator is `sum`, `min`, `max`, `avg` or `count`). It does not work for distribution metrics, or multilayer aggregation against subqueries or local tables. It also cannot be specified if the space aggregator is a combination aggregator like total or rate. 

For example, the following queries would **not** work:

{{< code-block lang="sql" >}}
❌ AGGR sum("percentile.metric") ROLLUP count(value);
❌ AGGR p99("percentile.metric") ROLLUP count(value);
❌ AGGR total("system.load.1") ROLLUP count(value);
❌ AGGR sum(SELECT ... ) ROLLUP count(value);
❌ WITH localTable AS ... AGGR sum(localTable) ROLLUP count(value);
{{< /code-block >}}

### INTERPOLATE

`INTERPOLATE` is a clause on the `AGGR` statement that controls interpolation, filling in missing values between buckets. It is equivalent to the [`fill()` dashboard function][1].

`INTERPOLATE` can only be used when a `ROLLUP` is explicitly specified. The options for `INTERPOLATE` are

- `INTERPOLATE NULL`
- `INTERPOLATE LINEAR <optional interval>`
- `INTERPOLATE LAST <optional interval>`
- `INTERPOLATE ZERO <optional interval>`

For `LINEAR`, `LAST`, and `ZERO`, if no interval is specified, it defaults to 300s.

### BUCKET BY
`BUCKET BY` is a clause on the AGGR statement that controls time aggregation. If no `BUCKET BY` is stated, the query defaults to the implicit `INTERVAL` runtime parameter (see the [`SET/SHOW` sections]). `BUCKET BY DEFAULT` also defaults to this.

#### BUCKET BY INTERVAL
`BUCKET BY INTERVAL` allows users to specify an explicit interval string. Valid interval strings are of the format `"<INTEGER> <UNIT>"` (for example, `"10 minutes"`). 

Valid time units are:

- `seconds`, `second`, `sec`, `s`
- `minutes`, `minute`, `min`, `m`
- `hours`, `hour`, `hr`, `h`
- `days`, `day`, `d`
- `weeks`, `week`, `w`
- `months`, `month` ([multilayer aggregation queries] only)
- `years`, `year` ([multilayer aggregation queries] only)

#### BUCKET BY ALL

`BUCKET BY ALL` chooses an interval that aggregates the metric down to one point for the entire query timeframe. It can only be used on [multilayer aggregation queries].

The resulting column type is a timeseries with just one point in it. To access the point, use [time series functions].

With `BUCKET BY ALL`, the timestamp of the resulting point is the start of the timeframe, and not necessarily aligned with metrics timestamps. For example, while a query with a `BUCKET BY INTERVAL '1d'` with a time frame of `April 15, 3:24 - April 16 3:24` returns points with timestamps of the start of each day, `BUCKET BY ALL` returns one point with a timestamp of `April 15, 3:24`.

### Multilayer aggregation

With `SELECT`, you can use the output of one statement as the input of another by using the subquery in the outer query's FROM clause:

{{< code-block lang="sql" >}}
SELECT avg(subquery.col) FROM (SELECT ... FROM table) subquery ...
{{< /code-block >}}

To re-aggregate a result from AGGR, the subquery is placed inside the aggregation function call, because these functions take tables as input:

{{< code-block lang="sql" >}}
AGGR sum(
  AGGR sum("metric.name")
  BUCKET BY INTERVAL '1d'
  GROUP BY tag1, tag2
) 
BUCKET BY INTERVAL '1w'
GROUP BY tag2
{{< /code-block >}}

In SQL, subqueries are written in the FROM clause, and individual columns themselves are referenced in the outer query (for example, in aggregator functions).

In multilayer aggregation, the subquery is directly referenced in the aggregator function call:

{{< code-block lang="sql" >}}
AGGR sum(SELECT timeseries, group1, group2 FROM (...)) ...
{{< /code-block >}}

For multilayer aggregation to work, the inner query must return a table with the schema in the pattern of an AGGR statement: the first column must be a timeseries, and the remaining columns must be groups or tags.

## UNION

`UNION` combines the results of two or more DQLExprs into a single output table.

### Syntax

{{< code-block lang="text" >}}
DQLExpr UNION [ ALL ] DQLExpr ...
[ ORDER BY expressions [ ASC | DESC ] ]
[ LIMIT [ ALL | expression ]
  [ OFFSET expression] ]
{{< /code-block >}}

The `UNION` operator removes duplicate rows from the result. To retain duplicate rows, use `UNION ALL`:

{{< code-block lang="sql" >}}
SELECT host_key, CAST(service AS text) AS service, 'from resources' FROM host
UNION ALL
SELECT message, service AS text, 'from logs' FROM logs WHERE env='prod'
ORDER BY service LIMIT 200 OFFSET 10;
{{< /code-block >}}

All subqueries in a `UNION` must have the same output schema. A query containing `UNION` query can only have one `ORDER BY` and `LIMIT` expression, both of which must come at the end. Because of this, `UNION` can be used to combine other DQLExpr types, but not another `UNION`.

## WITH

`WITH` provides a way to write auxiliary statements for use in a larger query. 

`WITH` statements, which are also often referred to as Common Table Expressions or CTEs, can be thought of as defining temporary tables that exist for one query. Each auxiliary statement in a `WITH` clause can be any DQLExpr, and the `WITH` clause itself is attached to a primary statement that can also be any non-`WITH` DQLExpr. Subsequent auxiliary statements may reference correlations aliased in previous auxiliary statements.

### Syntax

{{< code-block lang="sql" >}}
WITH alias [ ( output, schema, column, names, ... ) ] AS ( DQLExpr ) [, ...] DQLExpr
{{< /code-block >}}

DML statements like `INSERT`, `UPDATE`, and `DELETE` are not supported in `WITH`.

Each aliased query may also specify its output schema and column names.

## EXPLAIN

<div class="alert alert-warning">The DDSQL implementation of <code>EXPLAIN</code> is experimental, and subject to change.
</div>

`EXPLAIN` shows the execution plan of a statement. This is useful for debugging queries, and analyzing their performance. Only DQL statements can be `EXPLAIN`ed.

`EXPLAIN ANALYZE` executes the query, measures its performance, and returns the queries that were sent to external downstream sources. For example, a query `AGGR AVG('system.load.1')` would be translated to a metrics query `avg:system.load.1{*}`, which `EXPLAIN ANALYZE` would display for inspection.

`EXPLAIN` and `EXPLAIN ANALYZE` are mostly intended for use by developers of DDSQL as diagnostic tools, but they can be useful for users who are running into unexpected behavior.

### Syntax

{{< code-block lang="sql" >}}
EXPLAIN [ ANALYZE ] DQLExpr
{{< /code-block >}}

## CREATE

DDSQL allows users to create temporary tables, insert into them, and query & reference them. These tables are not persisted across sessions.

### Syntax

{{< code-block lang="sql" >}}
CREATE TABLE name (
  columnName columnType
  [ PRIMARY KEY [ AUTOINCREMENT ] | NOT NULL | UNIQUE | DEFAULT expression ] ... 
)
{{< /code-block >}}

## INSERT

DDSQL's `INSERT` statement follows the SQL standard. DDSQL only allows users to insert into temporary tables that are created with the `CREATE` statement, not downstream data sources.

### Syntax

{{< code-block lang="sql" >}}
INSERT INTO tableName [ (specific, columns, ...) ] VALUES 
  ( value1, value2, ... ),
  ( value1, value2, ... ),
  ...
{{< /code-block >}}

## SHOW

<div class="alert alert-warning">While the <code>SHOW</code> statement is a part of the SQL standard, the runtime parameter names themselves are experimental. Parameters may be renamed, retyped, or deprecated in the future.</div>

When running queries, DDSQL references runtime parameters (environmental variables) that are not specified in the query statement itself, such as the default interval to use for metrics queries if no `BUCKET BY` is specified, or the start and end timestamp for a query. 

The `SHOW` statement displays the values of these variables.

### Syntax

{{< code-block lang="sql" >}}
SHOW (ALL | parameter)
{{< /code-block >}}

`SHOW ALL` displays all available runtime parameters in the DDSQL system, and `SHOW <PARAMETER>` displays only the parameter specified.

## SET

To modify a runtime parameter, use the `SET` statement.

### Syntax

{{< code-block lang="sql" >}}
SET variableName = expression
{{< /code-block >}}

## CASE

The `CASE` expression is a generic conditional expression, similar to if/else statements in other programming languages. `CASE` comes in two forms, simple and searched.

### Simple CASE statements

Simple CASE statements use the following syntax:

{{< code-block lang="sql" >}}
CASE expression
  WHEN value THEN result
  [ WHEN ... ]
  [ ELSE result ]
END
{{< /code-block >}}

The expression is computed, then compared to each of the value expressions in the `WHEN` clauses until one is found that is equal to it. If no match is found, the result of the `ELSE` clause, or `NULL` if `ELSE` is omitted, is returned.

### Searched CASE statements

Searched CASE statements use the following syntax:

{{< code-block lang="sql" >}}
CASE
  WHEN condition THEN result
  [ WHEN ... ]
  [ ELSE result ]
END
{{< /code-block >}}

If a condition's result is true, the value of the `CASE` expression is the result that follows the condition, and the remainder of the `CASE` expression is not processed. If the condition's result is not true, any subsequent `WHEN` clauses are examined in the same manner. If no `WHEN` condition yields true, the value of the `CASE` expression is the result of the `ELSE` clause. If the `ELSE` clause is omitted and no condition is true, the result is `NULL`.

## CAST

`CAST` specifies a conversion from one data type to another.

### Syntax

{{< code-block lang="sql" >}}
CAST(expression AS type)
{{< /code-block >}}

Not all types are convertible in this way.

DDSQL also supports Postgres casting syntax: `<EXPRESSION>::<TYPE>` (for example, `SELECT 1::text;`).

[1]: /dashboards/functions/interpolation/#fill
[2]: /dashboards/ddsql_editor/reference/aggr_functions