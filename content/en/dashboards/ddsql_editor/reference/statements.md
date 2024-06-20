---
title: DDSQL Statements
---

{{< callout url="https://datadoghq.com/private-beta/ddsql-editor">}}
DDSQL is in private beta.
{{< /callout >}}

## SELECT

`SELECT` retrieves rows from a table or view.

### Syntax

{{< code-block lang="text" >}}
SELECT [ ALL | DISTINCT ] select_expr, ...
  [ FROM rel_source EVENT_SEARCH 'some message' USE EVENT_INDEX 'index_name'
[ JOIN_TYPE rel_source ... [ ON condition | USING (column, ... ) ] ] ... ]
  [ WHERE condition ]
[ GROUP BY [ ALL | DISTINCT ] expression, ... ]
[ HAVING condition, ... ]
[ ORDER BY expression, ... [ ASC | DESC ] [ NULLS FIRST | NULLS LAST ] ]
[ LIMIT [ ALL | expression ]
  [ OFFSET expression ] ]
{{< /code-block >}}

#### Placeholder types

`select_expr`
: Any expression that returns a value. It may be a constant, function call, aggregate, window, or the special expression `*`. This is the part of the query that specifies the output of the SELECT statement, and in relational algebra it is known as the projection.
 
`rel_source`
: A correlation (a table name or alias) or a parenthesized [DQL expression][3].

`JOIN_TYPE`
: The type of SQL join, such as `INNER` or `LEFT`. `INNER` joins are fully supported. `OUTER` and `CROSS` joins may require a `WHERE` condition. `LEFT` and `RIGHT` joins are also supported if the condition is an *equijoin* expression: an equality comparison such as `<EXPRESSION_1> = <EXPRESSION_2>` where the expressions reference columns from different tables, and the output types of both expressions are the same. A `USING` expression `JOIN`ing on only one column also works.

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

When an alias is provided in a `FROM` item, it completely hides the actual name of the table or function. In the above example, the remainder of the DQL expression must refer to `my_long_hosts_table_name` as `hosts`.

## Ordinals

`GROUP BY` and `ORDER BY` clause expressions can be column names, arbitrary expressions formed from input columns, or the name or ordinal number of an output expression (a `SELECT` expression). Output expression ordinals are 1-indexed.

For example, the output of this query is ordered first by `ex3`, then `ex2`, and then `ex1`:

{{< code-block lang="sql" >}}
SELECT ex1, ex2, ex3 FROM table ORDER BY 3, 2, 1;
{{< /code-block >}}

## UNION

`UNION` combines the results of two or more [DQL expressions][3] into a single output table.

### Syntax

{{< code-block lang="text" >}}
DQL_expression UNION [ ALL ] DQL_expression ...
[ ORDER BY expressions [ ASC | DESC ] ]
[ LIMIT [ ALL | expression ]
  [ OFFSET expression] ]
{{< /code-block >}}

#### Placeholder types

`DQL_expression`
: A query statement, such as a `SELECT` statement.

The `UNION` operator removes duplicate rows from the result. To retain duplicate rows, use `UNION ALL`:

{{< code-block lang="sql" >}}
SELECT host_key, CAST(service AS text) AS service, 'from resources' FROM host
UNION ALL
SELECT message, service AS text, 'from logs' FROM logs WHERE env='prod'
ORDER BY service LIMIT 200 OFFSET 10;
{{< /code-block >}}

All subqueries in a `UNION` must have the same output schema. A query containing `UNION` query can only have one `ORDER BY` and `LIMIT` expression, both of which must come at the end. Because of this, `UNION` can be used to combine other DQL expression types, but not another `UNION`.

## WITH

`WITH` provides a way to write auxiliary statements for use in a larger query. 

`WITH` statements, which are also often referred to as Common Table Expressions or CTEs, can be thought of as defining temporary tables that exist for one query. Each auxiliary statement in a `WITH` clause can be any [DQL expression][3], and the `WITH` clause itself is attached to a primary statement that can also be any non-`WITH` DQL expression. Subsequent auxiliary statements may reference correlations aliased in previous auxiliary statements.

### Syntax

{{< code-block lang="sql" >}}
WITH alias [ ( output, schema, column, names, ... ) ] AS ( DQL_expression ) [, ...] DQL_expression
{{< /code-block >}}

#### Placeholder types

`DQL_expression`
: A query statement, such as a `SELECT` statement.

Data modification statements like `INSERT`, `UPDATE`, and `DELETE` are not supported in `WITH`.

Each aliased query may also specify its output schema and column names.

## CREATE

DDSQL allows users to create temporary tables, insert into them, and query & reference them. These tables are not persisted across sessions.

### Syntax

{{< code-block lang="sql" >}}
CREATE TABLE name (
  column_name column_type
  [ PRIMARY KEY [ AUTOINCREMENT ] | NOT NULL | UNIQUE | DEFAULT expression ] ... 
)
{{< /code-block >}}

## INSERT

DDSQL's `INSERT` statement follows the SQL standard. DDSQL only allows users to insert into temporary tables that are created with the `CREATE` statement, not downstream data sources.

### Syntax

{{< code-block lang="sql" >}}
INSERT INTO table_name [ (specific, columns, ...) ] VALUES 
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
[3]: /dashboards/ddsql_editor/reference#supported-sql-syntax