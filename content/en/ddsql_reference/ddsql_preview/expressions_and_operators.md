---
title: DDSQL Expressions and Operators (Preview)
private: true
aliases:
- /dashboards/ddsql_editor/reference/expressions_and_operators/
- /ddsql_editor/reference/expressions_and_operators/
---

*Value expressions* are the general expression language used to produce values for conditions, `SELECT` expressions, filters, and clauses like `WHERE`, `ORDER BY`, and `GROUP BY`. The expression syntax of DDSQL is a superset of SQL expression syntax.

## Arithmetic operators

DDSQL supports standard binary and unary infix arithmetic notation from SQL and many other languages:

| Operator | Description              | Example | Result |
|----------|--------------------------|---------|--------|
| +        | addition                 | 2 + 3   | 5      |
| -        | subtraction              | 2 - 3   | -1     |
| *        | multiplication           | 2 * 3   | 6      |
| /        | division (non-truncating) | 5 / 2   | 2.5    |


The standard order of operations applies. To control the order of operations, add parentheses: `(5 - 2) * 3`.

## Comparison operators

DDSQL implements the following comparison operators:

| Operator | Description            | Example | Result |
|----------|------------------------|---------|--------|
| >        | greater than           | 2 > 3   | false  |
| <        | less than              | 2 < 3   | true   |
| >=       | greater than or equals | 3 >= 2  | true   |
| <=       | less than or equals    | 3 <= 2  | false  |
| =        | equals*                | 3 = 3   | true   |
| !=, <>   | not equals             | 3 != 3  | false  |

For tag references and tag groups, the equality operator (`=`) is treated as a "contains" comparison. See the [Querying Tags in DDSQL][1] for more details.

## SQL comparison keywords

DDSQL supports the following SQL keywords, which function as standard Boolean operators:

| Operator | Description            | Example | Result |
|----------|------------------------|---------|--------|
| `NOT`    | Filter records based on more than one condition. | `SELECT * FROM host WHERE NOT env = 'prod';`   | Return all hosts that are not in the prod environment.  |
| `AND`    | Filter records based on more than one condition. | `SELECT * FROM host WHERE env = 'prod' AND cloud_provider = 'aws';`   | Return all hosts that are in the prod environment and the AWS cloud provider.  |
| `OR`     | Filter records based on more than one condition. | `SELECT * FROM host WHERE env = 'prod' AND cloud_provider = 'aws';`   | Return all hosts that are either in the prod environment or the aws cloud provider.  |

DDSQL also supports the following comparator keywords as they are defined in the SQL standard:

| Operator     | Description            | Example | Result |
|--------------|------------------------|---------|--------|
| `IS NULL`    | Select rows if the specified field is null. | `SELECT * FROM host WHERE cloud_provider IS NULL;`   | Return all rows that contain no data in the `cloud_provider` column.  |
| `IS NOT NULL`| Select rows if the specified field is not null. Exclude rows with missing data. | `SELECT * FROM host WHERE cloud_provider IS NOT NULL;` | Return all rows that contain data in the `cloud_provider` column.   |
| `LIKE`       | Search for a specific pattern in a string value. You can use the following wildcard characters to define the patterns: <br>**Percent sign (%)**: Represents zero, one, or multiple characters. <br>**Underscore (_)**: Represents a single character. | `SELECT * FROM aws_eks_cluster WHERE LOWER(logging) LIKE '%"enabled":true%';` | Return all rows from the `aws_eks_cluster` table where the `logging` column is `"enabled":true`.  |
| `NOT LIKE`   | Exclude rows from a search, where the row has a specific pattern in a string value. You can use the wildcards `%` and `_` for pattern matching. | `SELECT * FROM aws_eks_cluster WHERE LOWER(logging) NOT LIKE '%"enabled":true%';` | Return all rows from the `aws_eks_cluster` table where the `logging` does **not** have `"enabled":true%'`. |
| `IN`         | Find multiple values in a `WHERE` clause. The `IN` operator is shorthand for multiple `OR` conditions. | `SELECT * FROM host WHERE cloud_provider IN ('aws', 'gcp');`  | Return all rows from `host` table where the `cloud_provider` value is either 'aws' or 'gcp'.|
| `NOT IN`     | Replace a set of arguments with the `<>` or `!=` operator that is combined with the `AND` operator| `SELECT * FROM host WHERE cloud_provider NOT IN ('aws', 'gcp');`  | Return all rows where `cloud_provider` is not `aws` or `gcp`. |


DDSQL supports the `BETWEEN` keyword such that `a BETWEEN x AND y` is equivalent to `a >= x AND a <= y`. See [the Postgres documentation for `BETWEEN`][2] for details.

## Logical operators

| Name    | Description             |
|---------|-------------------------|
| AND     | Boolean logic, a & b    |
| OR      | Boolean logic, a &vert;&vert; b |
| XOR     | Boolean logic, a ^ b    |
| NOT     | Boolean logic, !a       |
| IS NULL | Returns true for each row that is null |


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

DDSQL also supports Postgres casting syntax:

{{< code-block lang="sql" >}}
expression::type
{{< /code-block >}}

For example, `SELECT 1::text;`.


[1]: /ddsql_reference/ddsql_preview/tags/
[2]: https://www.postgresql.org/docs/current/functions-comparison.html
