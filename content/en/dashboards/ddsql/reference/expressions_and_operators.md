---
title: DDSQL Expressions and Operators
---

{{< callout url="https://google.com">}}
DDSQL is in private beta.
{{< /callout >}}

*Value expressions* are the general expression language used to produce values for conditions, selectExprs, filters, and so on in clauses like `WHERE`, `ORDER BY`, and `GROUP BY`. The expression syntax of DDSQL is a superset of SQL expression syntax.

## Arithmetic operators

DDSQL supports standard binary and unary infix arithmetic notation from SQL and many other languages:

| Operator | Description              | Example | Result |
|----------|--------------------------|---------|--------|
| +        | addition                 | 2 + 3   | 5      |
| -        | subtraction              | 2 - 3   | -1     |
| *        | multiplication           | 2 * 3   | 6      |
| /        | division (nontruncating) | 5 / 2   | 2.5    |


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

For tag references and tag groups, the equality operator (`=`) is treated as a "contains" comparison. See the [Tag References section] for more details.

Additionally, DDSQL supports the following SQL keywords, which function as standard boolean operators:

- `NOT`
- `AND`
- `OR`

DDSQL also supports the following comparator keywords as they are defined in the SQL standard:
- `IS NULL`
- `IS NOT NULL`
- `LIKE`
- `NOT LIKE`
- `IN and NOT IN`

DDSQL supports the `BETWEEN` keyword such that `a BETWEEN x AND y` is equivalent to `a >= x AND a <= y` (see the Postgres documentation for `BETWEEN` for details).

## Array operators

Accessing specific elements in array-typed columns and expressions can be done with the index operator: `<EXPRESSION>[<INDEX>]`. Arrays in DDSQL are 1-indexed, following SQL standards, which means the first element in an array is accessed with `[1]`, not `[0]`.

For example, to access the first element in an array:

{{< code-block lang="sql" >}}
SELECT column[1] FROM ...
{{< /code-block >}}

An expression can be used to specify the index. For example, to access the last element in an array:

{{< code-block lang="sql" >}}
SELECT column[array_length(column)] FROM ...
{{< /code-block >}}

## Logical operators

| Name    | Description             |
|---------|-------------------------|
| AND     | Boolean logic, a & b    |
| OR      | Boolean logic, a || b |
| XOR     | Boolean logic, a ^ b    |
| NOT     | Boolean logic, !a       |
| IS NULL | Returns true for each row that is null |