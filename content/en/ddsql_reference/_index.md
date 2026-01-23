---
title: DDSQL Reference
description: "Complete reference for DDSQL syntax, data types, functions, operators, and statements for querying Datadog data with SQL."
aliases:
- /logs/workspaces/sql_reference
- /ddsql_reference/ddsql_default
products:
- name: DDSQL Editor
  url: /ddsql_editor/
  icon: ddsql
- name: Notebooks
  url: /notebooks/
  icon: notebook
further_reading:
- link: "/ddsql_editor/"
  tag: "Documentation"
  text: "Learn more about DDSQL Editor"
---

{{< product-availability >}}

## Overview

DDSQL is SQL for Datadog data. It implements several standard SQL operations, such as `SELECT`, and allows queries against unstructured data. You can perform actions like getting exactly the data you want by writing your own `SELECT` statement, or querying tags as if they are standard table columns.

This documentation covers the SQL support available and includes:
- [Syntax compatible with PostgreSQL](#syntax)
- [Data types](#data-types)
- [Type literals](#type-literals)
- [SQL functions](#functions)
- [Regular expressions](#regular-expressions)
- [Window functions](#window-functions)
- [JSON functions](#json-functions-and-operators)
- [Table functions](#table-functions)
- [Tags](#tags)


{{< img src="/logs/workspace/sql_reference/sql_syntax_analysis_cell.png" alt="Example workspace cell with SQL syntax" style="width:100%;" >}}

## Syntax

The following SQL syntax is supported:

`SELECT (DISTINCT)` (DISTINCT: Optional)
: Retrieves rows from a database, with `DISTINCT` filtering out duplicate records.

    {{< code-block lang="sql" >}}SELECT DISTINCT customer_id
FROM orders {{< /code-block >}}

`JOIN`
: Combines rows from two or more tables based on a related column between them. Supports FULL JOIN, INNER JOIN, LEFT JOIN, RIGHT JOIN.

    {{< code-block lang="sql" >}}SELECT orders.order_id, customers.customer_name
FROM orders
JOIN customers
ON orders.customer_id = customers.customer_id {{< /code-block >}}

`GROUP BY`
: Groups rows that have the same values in specified columns into summary rows.

    {{< code-block lang="sql" >}}SELECT product_id, SUM(quantity)
FROM sales
GROUP BY product_id {{< /code-block >}}

`||` (concat)
: Concatenates two or more strings together.

    {{< code-block lang="sql" >}}SELECT first_name || ' ' || last_name AS full_name
FROM employees {{< /code-block >}}

`WHERE` (Includes support for `LIKE`, `IN`, `ON`, `OR` filters)
: Filters records that meet a specified condition.

    {{< code-block lang="sql" >}}SELECT *
FROM employees
WHERE department = 'Sales' AND name LIKE 'J%' {{< /code-block >}}

`CASE`
: Provides conditional logic to return different values based on specified conditions.

    {{< code-block lang="sql" >}}SELECT order_id,
  CASE
    WHEN quantity > 10 THEN 'Bulk Order'
    ELSE 'Standard Order'
  END AS order_type
FROM orders {{< /code-block >}}

`WINDOW`
: Performs a calculation across a set of table rows that are related to the current row.

    {{< code-block lang="sql" >}}SELECT
  timestamp,
  service_name,
  cpu_usage_percent,
  AVG(cpu_usage_percent) OVER (PARTITION BY service_name ORDER BY timestamp ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS moving_avg_cpu
FROM
  cpu_usage_data {{< /code-block >}}

`IS NULL` / `IS NOT NULL`
: Checks if a value is null or not null.

    {{< code-block lang="sql" >}}SELECT *
FROM orders
WHERE delivery_date IS NULL {{< /code-block >}}

`LIMIT`
: Specifies the maximum number of records to return.

    {{< code-block lang="sql" >}}SELECT *
FROM customers
LIMIT 10 {{< /code-block >}}

`OFFSET`
: Skips a specified number of records before starting to return records from the query.

    {{< code-block lang="sql" >}}SELECT *
FROM employees
OFFSET 20 {{< /code-block >}}

`ORDER BY`
: Sorts the result set of a query by one or more columns. Includes ASC, DESC for sorting order.

    {{< code-block lang="sql" >}}SELECT *
FROM sales
ORDER BY sale_date DESC {{< /code-block >}}

`HAVING`
: Filters records that meet a specified condition after grouping.

    {{< code-block lang="sql" >}}SELECT product_id, SUM(quantity)
FROM sales
GROUP BY product_id
HAVING SUM(quantity) > 10 {{< /code-block >}}

`IN`, `ON`, `OR`
: Used for specified conditions in queries. Available in `WHERE`, `JOIN` clauses.

    {{< code-block lang="sql" >}}SELECT *
FROM orders
WHERE order_status IN ('Shipped', 'Pending') {{< /code-block >}}

`USING`
: This clause is a shorthand for joins where the join columns have the same name in both tables. It takes a comma-separated list of those columns and creates a separate equality condition for each matching pair. For example, joining `T1` and `T2` with `USING (a, b)` is equivalent to `ON T1.a = T2.a AND T1.b = T2.b`.

    {{< code-block lang="sql" >}}SELECT orders.order_id, customers.customer_name
FROM orders
JOIN customers
USING (customer_id) {{< /code-block >}}

`AS`
: Renames a column or table with an alias.

    {{< code-block lang="sql" >}}SELECT first_name AS name
FROM employees {{< /code-block >}}

Arithmetic Operations
: Performs basic calculations using operators like `+`, `-`, `*`, `/`.

    {{< code-block lang="sql" >}}SELECT price, tax, (price * tax) AS total_cost
FROM products {{< /code-block >}}

`INTERVAL value unit`
: Interval representing a time duration specified in a given unit.
Supported units:<br>- `milliseconds` / `millisecond`<br>- `seconds` / `second`<br>- `minutes` / `minute`<br>- `hours` / `hour`<br>- `days` / `day`

## Data types

DDSQL supports the following data types:

| Data Type | Description |
|-----------|-------------|
| `BIGINT` | 64-bit signed integers. |
| `BOOLEAN` | `true` or `false` values. |
| `DECIMAL` | Floating-point numbers. |
| `INTERVAL` | Time duration values. |
| `JSON` | JSON data. |
| `TIMESTAMP` | Date and time values. |
| `VARCHAR` | Variable-length character strings. |

### Array types

All data types support array types. Arrays can contain multiple values of the same data type.

## Type literals

DDSQL supports explicit type literals using the syntax `[TYPE] [value]`.

| Type | Syntax | Example |
|------|--------|---------|
| `BIGINT` | `BIGINT 'value'` | `BIGINT '1234567'` |
| `BOOLEAN` | `BOOLEAN 'value'` | `BOOLEAN 'true'` |
| `DECIMAL` | `DECIMAL 'value'` | `DECIMAL '3.14159'` |
| `INTERVAL` | `INTERVAL 'value unit'` | `INTERVAL '30 minutes'` |
| `JSON` | `JSON 'value'` | `JSON '{"key": "value", "count": 42}'` |
| `TIMESTAMP` | `TIMESTAMP 'value'` | `TIMESTAMP '2023-12-25 10:30:00'` |
| `VARCHAR` | `VARCHAR 'value'` | `VARCHAR 'hello world'` |

The type prefix can be omitted and the type is automatically inferred from the value. For example, `'hello world'` is inferred as `VARCHAR`, `123` as `BIGINT`, and `true` as `BOOLEAN`. Use explicit type prefixes when values could be ambiguous; for example,`TIMESTAMP '2025-01-01'` would be inferred as `VARCHAR` without the prefix.

### Array literals

Array literals use the syntax `ARRAY[value1, value2, ...]`. The array type is automatically inferred from the values.

{{< code-block lang="sql" >}}
SELECT ARRAY['apple', 'banana', 'cherry'] AS fruits; -- Inferred as VARCHAR array
SELECT ARRAY[1, 2, 3] AS numbers;                    -- Inferred as BIGINT array
SELECT ARRAY[true, false, true] AS flags;            -- Inferred as BOOLEAN array
SELECT ARRAY[1.1, 2.2, 3.3] AS decimals;             -- Inferred as DECIMAL array
{{< /code-block >}}

### Example

{{< code-block lang="sql" >}}
-- Using type literals in queries
SELECT
    VARCHAR 'Product Name: ' || name AS labeled_name,
    price * DECIMAL '1.08' AS price_with_tax,
    created_at + INTERVAL '7 days' AS expiry_date
FROM products
WHERE created_at > TIMESTAMP '2025-01-01';
{{< /code-block >}}

## Functions

The following SQL functions are supported. For Window function, see the separate [Window function](#window-functions) section in this documentation.

| Function                                         | Return Type                           | Description                                                                                                                                                                                       |
|--------------------------------------------------|---------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `MIN(variable v)`                                | typeof v                              | Returns the smallest value in a set of data.                                                                                                                                                      |
| `MAX(variable v)`                                | typeof v                              | Returns the maximum value across all input values.                                                                                                                                                |
| `COUNT(any a)`                                   | numeric                               | Returns the number of input values that are not null.                                                                                                                                             |
| `SUM(numeric n)`                                 | numeric                               | Returns the summation across all input values.                                                                                                                                                    |
| `AVG(numeric n)`                                 | numeric                               | Returns the average value (arithmetic mean) across all input values.                                                                                                                              |
| `BOOL_AND(boolean b)`                            | boolean                               | Returns whether all non-null input values are true.                                                                                                                                               |
| `BOOL_OR(boolean b)`                             | boolean                               | Returns whether any non-null input value is true.                                                                                                                                                 |
| `CEIL(numeric n)` / `CEILING(numeric n)`         | numeric                               | Returns the value rounded up to the nearest integer. Both `CEIL` and `CEILING` are supported as aliases.                                                                                         |
| `FLOOR(numeric n)`                               | numeric                               | Returns the value rounded down to the nearest integer.                                                                                                                                            |
| `ROUND(numeric n)`                               | numeric                               | Returns the value rounded to the nearest integer.                                                                                                                                                 |
| `POWER(numeric base, numeric exponent)`          | numeric                               | Returns the value of base raised to the power of exponent.                                                                                                                                        |
| `LOWER(string s)`                                | string                                | Returns the string as lowercase.                                                                                                                                                                  |
| `UPPER(string s)`                                | string                                | Returns the string as uppercase.                                                                                                                                                                  |
| `ABS(numeric n)`                                 | numeric                               | Returns the absolute value.                                                                                                                                                                       |
| `COALESCE(args a)`                               | typeof first non-null a OR null       | Returns the first non-null value or null if all are null.                                                                                                                                         |
| `CAST(value AS type)`                            | type                                  | Converts the given value to the specified data type.                                                                                                                                              |
| `LENGTH(string s)`                               | integer                               | Returns the number of characters in the string.                                                                                                                                                   |
| `TRIM(string s)`                                 | string                                | Removes leading and trailing whitespace from the string.                                                                                                                                          |
| `REPLACE(string s, string from, string to)`      | string                                | Replaces occurrences of a substring within a string with another substring.                                                                                                                       |
| `SUBSTRING(string s, int start, int length)`     | string                                | Extracts a substring from a string, starting at a given position and for a specified length.                                                                                                      |
| `REVERSE(string s)`                              | string                                | Returns the string with characters in reverse order.                                                                                                                                               |
| `STRPOS(string s, string substring)`             | integer                               | Returns the first index position of the substring in a given string, or 0 if there is no match.                                                                                                   |
| `SPLIT_PART(string s, string delimiter, integer index)` | string                         | Splits the string on the given delimiter and returns the string at the given position counting from one.                                                                                          |
| `EXTRACT(unit from timestamp/interval)`          | numeric                               | Extracts a part of a date or time field (such as year or month) from a timestamp or interval.                                                                                                     |
| `TO_TIMESTAMP(string timestamp, string format)`  | timestamp                             | Converts a string to a timestamp according to the given format.                                                                                                                                   |
| `TO_TIMESTAMP(numeric epoch)`                    | timestamp                             | Converts a UNIX epoch timestamp (in seconds) to a timestamp.                                                                                                                                      |
| `TO_CHAR(timestamp t, string format)`            | string                                | Converts a timestamp to a string according to the given format.                                                                                                                                   |
| `DATE_BIN(interval stride, timestamp source, timestamp origin)` | timestamp                             | Aligns a timestamp (source) to buckets of even length (stride). Returns the start of the bucket containing the source, calculated as the largest timestamp that is less than or equal to source and is a multiple of stride lengths from origin. |
| `DATE_TRUNC(string unit, timestamp t)`           | timestamp                             | Truncates a timestamp to a specified precision based on the provided unit.                                                                                                                        |
| `CURRENT_SETTING(string setting_name)`           | string                                | Returns the current value of the specified setting. Supports the parameters `dd.time_frame_start` and `dd.time_frame_end`, which return the start and end of the global time frame, respectively. |
| `NOW()`                                          | timestamp                             | Returns the current UTC timestamp at the start of the current query.                                                                                                                              |
| `CARDINALITY(array a)`                           | integer                               | Returns the number of elements in the array.                                                                                                                                                      |
| `ARRAY_POSITION(array a, typeof_array value)`    | integer                               | Returns the index of the first occurrence of the value found in the array, or null if value is not found.                                                                                         |
| `STRING_TO_ARRAY(string s, string delimiter)`    | array of strings                      | Splits the given string into an array of strings using the given delimiter.                                                                                                                       |
| `ARRAY_TO_STRING(array a, string delimiter)`     | string                                | Converts an array to a string by concatenating elements with the given delimiter.                                                                                                                 |
| `ARRAY_AGG(expression e)`                        | array of input type                   | Creates an array by collecting all the input values.                                                                                                                                              |
| `APPROX_PERCENTILE(double percentile) WITHIN GROUP (ORDER BY expression e)` | typeof expression        | Computes an approximate percentile value. The percentile must be between 0.0 and 1.0 (inclusive). Requires the `WITHIN GROUP (ORDER BY ...)` syntax.                                              |
| `UNNEST(array a [, array b...])`                 | rows of a [, b...]                    | Expands arrays into a set of rows. This form is only allowed in a FROM clause.                                                                                                                    |

{{% collapse-content title="Examples" level="h3" %}}

### `MIN`
{{< code-block lang="sql" >}}
SELECT MIN(response_time) AS min_response_time
FROM logs
WHERE status_code = 200
{{< /code-block >}}

### `MAX`
{{< code-block lang="sql" >}}
SELECT MAX(response_time) AS max_response_time
FROM logs
WHERE status_code = 200
{{< /code-block >}}

### `COUNT`
{{< code-block lang="sql" >}}SELECT COUNT(request_id) AS total_requests
FROM logs
WHERE status_code = 200 {{< /code-block >}}

### `SUM`
{{< code-block lang="sql" >}}SELECT SUM(bytes_transferred) AS total_bytes
FROM logs
GROUP BY service_name
{{< /code-block >}}

### `AVG`
{{< code-block lang="sql" >}}SELECT AVG(response_time)
AS avg_response_time
FROM logs
WHERE status_code = 200
GROUP BY service_name
{{< /code-block >}}

### `BOOL_AND`
{{< code-block lang="sql" >}}SELECT BOOL_AND(status_code = 200) AS all_success
FROM logs
{{< /code-block >}}

### `BOOL_OR`
{{< code-block lang="sql" >}}SELECT BOOL_OR(status_code = 200) AS some_success
FROM logs
{{< /code-block >}}

### `CEIL`
{{< code-block lang="sql" >}}
SELECT CEIL(price) AS rounded_price
FROM products
{{< /code-block >}}

### `FLOOR`
{{< code-block lang="sql" >}}
SELECT FLOOR(price) AS floored_price
FROM products
{{< /code-block >}}

### `ROUND`
{{< code-block lang="sql" >}}
SELECT ROUND(price) AS rounded_price
FROM products
{{< /code-block >}}

### `POWER`
{{< code-block lang="sql" >}}
SELECT POWER(response_time, 2) AS squared_response_time
FROM logs
{{< /code-block >}}

### `LOWER`
{{< code-block lang="sql" >}}
SELECT LOWER(customer_name) AS lowercase_name
FROM customers
{{< /code-block >}}

### `UPPER`
{{< code-block lang="sql" >}}
SELECT UPPER(customer_name) AS uppercase_name
FROM customers
{{< /code-block >}}

### `ABS`
{{< code-block lang="sql" >}}
SELECT ABS(balance) AS absolute_balance
FROM accounts
{{< /code-block >}}

### `COALESCE`
{{< code-block lang="sql" >}}
SELECT COALESCE(phone_number, email) AS contact_info
FROM users
{{< /code-block >}}

### `CAST`

Supported cast target types:
- `BIGINT`
- `DECIMAL`
- `TIMESTAMP`
- `VARCHAR`

{{< code-block lang="sql" >}}
SELECT
  CAST(order_id AS VARCHAR) AS order_id_string,
  'Order-' || CAST(order_id AS VARCHAR) AS order_label
FROM
  orders
{{< /code-block >}}

### `LENGTH`
{{< code-block lang="sql" >}}
SELECT
  customer_name,
  LENGTH(customer_name) AS name_length
FROM
  customers
{{< /code-block >}}

### `INTERVAL`
{{< code-block lang="sql" >}}
SELECT
  TIMESTAMP '2023-10-01 10:00:00' + INTERVAL '30 days' AS future_date,
  INTERVAL '1 MILLISECOND 2 SECONDS 3 MINUTES 4 HOURS 5 DAYS'
{{< /code-block >}}

### `TRIM`
{{< code-block lang="sql" >}}
SELECT
  TRIM(name) AS trimmed_name
FROM
  users
{{< /code-block >}}

###  `REPLACE`
{{< code-block lang="sql" >}}
SELECT
  REPLACE(description, 'old', 'new') AS updated_description
FROM
  products
{{< /code-block >}}

### `SUBSTRING`
{{< code-block lang="sql" >}}
SELECT
  SUBSTRING(title, 1, 10) AS short_title
FROM
  books
{{< /code-block >}}

### `REVERSE`
{{< code-block lang="sql" >}}
SELECT
  REVERSE(username) AS reversed_username
FROM
  users
LIMIT 5
{{< /code-block >}}

### `STRPOS`
{{< code-block lang="sql" >}}
SELECT
  STRPOS('foobar', 'bar')
{{< /code-block >}}

### `SPLIT_PART`
{{< code-block lang="sql" >}}
SELECT
  SPLIT_PART('aaa-bbb-ccc', '-', 2)
{{< /code-block >}}

### `EXTRACT`

Supported extraction units:
| Literal           | Input Type               | Description                                  |
| ------------------| ------------------------ | -------------------------------------------- |
| `day`             | `timestamp` / `interval` | day of the month                             |
| `dow`             | `timestamp`              | day of the week `1` (Monday) to `7` (Sunday) |
| `doy`             | `timestamp`              | day of the year (`1` - `366`)                |
| `hour`            | `timestamp` / `interval` | hour of the day (`0` - `23`)                 |
| `minute`          | `timestamp` / `interval` | minute of the hour (`0` - `59`)              |
| `second`          | `timestamp` / `interval` | second of the minute (`0` - `59`)            |
| `week`            | `timestamp`              | week of the year (`1` - `53`)                |
| `month`           | `timestamp`              | month of the year (`1` - `12`)               |
| `quarter`         | `timestamp`              | quarter of the year (`1` - `4`)              |
| `year`            | `timestamp`              | year                                         |
| `timezone_hour`   | `timestamp`              | hour of the time zone offset                 |
| `timezone_minute` | `timestamp`              | minute of the time zone offset               |

{{< code-block lang="sql" >}}
SELECT
  EXTRACT(year FROM purchase_date) AS purchase_year
FROM
  sales
{{< /code-block >}}

### `TO_TIMESTAMP`

`TO_TIMESTAMP` has two forms:

**Form 1: Convert string to timestamp with format**

Supported patterns for date/time formatting:
| Pattern     | Description                          |
| ----------- | ------------------------------------ |
| `YYYY`      | year (4 digits)                      |
| `YY`        | year (2 digits)                      |
| `MM`        | month number (01 - 12)               |
| `DD`        | day of month (01 - 31)               |
| `HH24`      | hour of day (00 - 23)                |
| `HH12`      | hour of day (01 - 12)                |
| `HH`        | hour of day (01 - 12)                |
| `MI`        | minute (00 - 59)                     |
| `SS`        | second (00 - 59)                     |
| `MS`        | millisecond (000 - 999)              |
| `TZ`        | time-zone abbreviation               |
| `OF`        | time-zone offset from UTC            |
| `AM` / `am` | meridiem indicator (without periods) |
| `PM` / `pm` | meridiem indicator (without periods) |

{{< code-block lang="sql" >}}
SELECT
  TO_TIMESTAMP('25/12/2025 04:23 pm', 'DD/MM/YYYY HH:MI am') AS ts
{{< /code-block >}}

**Form 2: Convert UNIX epoch timestamp to timestamp**

{{< code-block lang="sql" >}}
SELECT
  TO_TIMESTAMP(1735142580) AS ts_from_epoch
{{< /code-block >}}

### `TO_CHAR`

Supported patterns for date/time formatting:
| Pattern     | Description                          |
| ----------- | ------------------------------------ |
| `YYYY`      | year (4 digits)                      |
| `YY`        | year (2 digits)                      |
| `MM`        | month number (01 - 12)               |
| `DD`        | day of month (01 - 31)               |
| `HH24`      | hour of day (00 - 23)                |
| `HH12`      | hour of day (01 - 12)                |
| `HH`        | hour of day (01 - 12)                |
| `MI`        | minute (00 - 59)                     |
| `SS`        | second (00 - 59)                     |
| `MS`        | millisecond (000 - 999)              |
| `TZ`        | time-zone abbreviation               |
| `OF`        | time-zone offset from UTC            |
| `AM` / `am` | meridiem indicator (without periods) |
| `PM` / `pm` | meridiem indicator (without periods) |

{{< code-block lang="sql" >}}
SELECT
  TO_CHAR(order_date, 'MM-DD-YYYY') AS formatted_date
FROM
  orders
{{< /code-block >}}

### `DATE_BIN`
{{< code-block lang="sql" >}}
SELECT DATE_BIN('15 minutes', TIMESTAMP '2025-09-15 12:34:56', TIMESTAMP '2025-01-01')
-- Returns 2025-09-15 12:30:00

SELECT DATE_BIN('1 day', TIMESTAMP '2025-09-15 12:34:56', TIMESTAMP '2025-01-01')
-- Returns 2025-09-15 00:00:00
{{< /code-block >}}

### `DATE_TRUNC`

Supported truncations:
- `milliseconds`
- `seconds` / `second`
- `minutes` / `minute`
- `hours` / `hour`
- `days` / `day`
- `weeks` / `week `
- `months` / `month`
- `quarters` / `quarter`
- `years` / `year`

{{< code-block lang="sql" >}}
SELECT
  DATE_TRUNC('month', event_time) AS month_start
FROM
  events
{{< /code-block >}}

### `CURRENT_SETTING`

Supported setting parameters:
- `dd.time_frame_start`: Returns the start of the selected time frame in RFC 3339 format (`YYYY-MM-DD HH:mm:ss.sss±HH:mm`).
- `dd.time_frame_end`: Returns the end of the selected time frame in RFC 3339 format (`YYYY-MM-DD HH:mm:ss.sss±HH:mm`).

{{< code-block lang="sql" >}}
-- Define the current analysis window
WITH bounds AS (
  SELECT CAST(CURRENT_SETTING('dd.time_frame_start') AS TIMESTAMP) AS time_frame_start,
         CAST(CURRENT_SETTING('dd.time_frame_end')   AS TIMESTAMP) AS time_frame_end
),
-- Define the immediately preceding window of equal length
     previous_bounds AS (
  SELECT time_frame_start - (time_frame_end - time_frame_start) AS prev_time_frame_start,
         time_frame_start                                       AS prev_time_frame_end
  FROM bounds
)
SELECT * FROM bounds, previous_bounds
{{< /code-block >}}

### `NOW`
{{< code-block lang="sql" >}}
SELECT
  *
FROM
  sales
WHERE
  purchase_date > NOW() - INTERVAL '1 hour'
{{< /code-block >}}

### `CARDINALITY`
{{< code-block lang="sql" >}}
SELECT
  CARDINALITY(recipients)
FROM
  emails
{{< /code-block >}}

### `ARRAY_POSITION`
{{< code-block lang="sql" >}}
SELECT
  ARRAY_POSITION(recipients, 'hello@example.com')
FROM
  emails
{{< /code-block >}}

### `STRING_TO_ARRAY`
{{< code-block lang="sql" >}}
SELECT
  STRING_TO_ARRAY('a,b,c,d,e,f', ',')
{{< /code-block >}}

### `ARRAY_TO_STRING`
{{< code-block lang="sql" >}}
SELECT
  ARRAY_TO_STRING(ARRAY['a', 'b', 'c'], ',') AS joined_string
{{< /code-block >}}

### `ARRAY_AGG`
{{< code-block lang="sql" >}}
SELECT
  sender,
  ARRAY_AGG(subject) subjects,
  ARRAY_AGG(ALL subject) all_subjects,
  ARRAY_AGG(DISTINCT subject) distinct_subjects
FROM
  emails
GROUP BY
  sender
{{< /code-block >}}

### `APPROX_PERCENTILE`
{{< code-block lang="sql" >}}
-- Calculate the median (50th percentile) response time
SELECT
  APPROX_PERCENTILE(0.5) WITHIN GROUP (ORDER BY response_time) AS median_response_time
FROM
  logs

-- Calculate 95th and 99th response time percentiles by service
SELECT
  service_name,
  APPROX_PERCENTILE(0.95) WITHIN GROUP (ORDER BY response_time) AS p95_response_time,
  APPROX_PERCENTILE(0.99) WITHIN GROUP (ORDER BY response_time) AS p99_response_time
FROM
  logs
GROUP BY
  service_name
{{< /code-block >}}

### `UNNEST`
{{< code-block lang="sql" >}}
SELECT
  sender,
  recipient
FROM
  emails,
  UNNEST(recipients) AS recipient
{{< /code-block >}}

{{% /collapse-content %}}

## Regular expressions

### Flavor

All regular expression (regex) functions use the International Components for Unicode (ICU) flavor:

- [Metacharacters][5]
- [Operators][6]
- [Set Expressions (Character Classes)][7]
- [Flag Options for in-pattern flags][8]. Refer to the [flags section below](#function-level-flags) for function-level flags.
- [Find and Replace (using capture groups)][9]

### Functions

| Function                                                                                                         | Return Type      | Description                                                                                                                                                                                                                                                                |
|------------------------------------------------------------------------------------------------------------------|------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `REGEXP_LIKE(string input, string pattern)`                                                                      | Boolean          | Evaluates whether a string matches a regular expression pattern.                                                                                                                                                                                                           |
| `REGEXP_MATCH(string input, string pattern [, string flags ])`                                                   | array of strings | Returns substrings of the first pattern match in the string. <br><br> This function searches the input string using the given pattern and returns captured substrings (capture groups) from the first match. If no capture groups are present, returns the full match. |
| `REGEXP_REPLACE(string input, string pattern, string replacement [, string flags ])`                             | string           | Replaces the substring that is the first match to the pattern, or all such matches if you use the [optional `g` flag](#function-level-flags).                                                                                                                              |
| `REGEXP_REPLACE (string input, string pattern, string replacement, integer start, integer N [, string flags ] )` | string           | Replaces the substring that is the Nth match to the pattern, or all such matches if `N` is zero, starting from `start`.                                                                                                                                                    |

{{% collapse-content title="Examples" level="h3" %}}

### `REGEXP_LIKE`
{{< code-block lang="sql" >}}
SELECT
  *
FROM
  emails
WHERE
  REGEXP_LIKE(email_address, '@example\.com$')
{{< /code-block >}}

### `REGEXP_MATCH`
{{< code-block lang="sql" >}}
SELECT regexp_match('foobarbequebaz', '(bar)(beque)');
-- {bar,beque}

SELECT regexp_match('foobarbequebaz', 'barbeque');
-- {barbeque}

SELECT regexp_match('abc123xyz', '([a-z]+)(\d+)(x(.)z)');
-- {abc,123,xyz,y}
{{< /code-block >}}

### `REGEXP_REPLACE`
{{< code-block lang="sql" >}}
SELECT regexp_replace('Auth success token=abc123XYZ789', 'token=\w+', 'token=***');
-- Auth success token=***

SELECT regexp_replace('status=200 method=GET', 'status=(\d+) method=(\w+)', '$2: $1');
-- GET: 200

SELECT regexp_replace('INFO INFO INFO', 'INFO', 'DEBUG', 1, 2);
-- INFO DEBUG INFO
{{< /code-block >}}

{{% /collapse-content %}}

### Function-level flags

You can use the following flags with [regular expression functions](#regular-expressions):

`i`
: Case-insensitive matching

`n` or `m`
: Newline-sensitive matching

`g`
: Global; replace _all_ matching substrings rather than only the first one

{{% collapse-content title="Examples" level="h3" %}}

### `i` flag

{{< code-block lang="sql" >}}
SELECT regexp_match('INFO', 'info')
-- NULL

SELECT regexp_match('INFO', 'info', 'i')
-- ['INFO']
{{< /code-block >}}

### `n` flag

{{< code-block lang="sql" >}}
SELECT regexp_match('a
b', '^b');
-- NULL

SELECT regexp_match('a
b', '^b', 'n');
-- ['b']
{{< /code-block >}}

### `g` flag

{{< code-block lang="sql" >}}
SELECT icu_regexp_replace('Request id=12345 completed, id=67890 pending', 'id=\d+', 'id=XXX');
-- Request id=XXX completed, id=67890 pending

SELECT regexp_replace('Request id=12345 completed, id=67890 pending', 'id=\d+', 'id=XXX', 'g');
-- Request id=XXX completed, id=XXX pending
{{< /code-block >}}

{{% /collapse-content %}}

## Window functions

This table provides an overview of the supported window functions. For comprehensive details and examples, see the [PostgreSQL documentation][2].

| Function                | Return Type       | Description                                                            |
|-------------------------|-------------------|------------------------------------------------------------------------|
| `OVER`                  | N/A               | Defines a window for a set of rows for other window functions to operate on. |
| `PARTITION BY`          | N/A               | Divides the result set into partitions, specifically for applying window functions. |
| `RANK()`                | integer           | Assigns a rank to each row within a partition, with gaps for ties.     |
| `ROW_NUMBER()`          | integer           | Assigns a unique sequential number to each row within a partition.     |
| `LEAD(column n)`        | typeof column     | Returns the value from the next row in the partition.                  |
| `LAG(column n)`         | typeof column     | Returns the value from the previous row in the partition.              |
| `FIRST_VALUE(column n)` | typeof column     | Returns the first value in an ordered set of values.                   |
| `LAST_VALUE(column n)`  | typeof column     | Returns the last value in an ordered set of values.                    |
| `NTH_VALUE(column n, offset)`| typeof column | Returns the value at the specified offset in an ordered set of values. |


## JSON functions and operators

| Name                                          | Return type  | Description                                                                                                                                                                                                                                                                                                    |
|-----------------------------------------------|--------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| json_extract_path_text(text json, text path…) | text         | Extracts a JSON sub-object as text, defined by the path. Its behavior is equivalent to the [Postgres function with the same name][3]. For example, `json_extract_path_text(col, ‘forest')` returns the value of the key `forest` for each JSON object in `col`. See the example below for a JSON array syntax. |
| json_extract_path(text json, text path…)      | JSON         | Same functionality as `json_extract_path_text`, but returns a column of JSON type instead of text type.                                                                                                                                                                                                        |
| json_array_elements(text json)                | rows of JSON | Expands a JSON array into a set of rows. This form is only allowed in a FROM clause.                                                                                                                                                                                                                           |
| json_array_elements_text(text json)           | rows of text | Expands a JSON array into a set of rows. This form is only allowed in a FROM clause.                                                                                                                                                                                                                           |

## Table functions

{{< callout url="https://www.datadoghq.com/product-preview/logs-metrics-support-in-ddsql-editor/" >}}
Querying Logs and Metrics through DDSQL is in Preview. Use this form to request access.
{{< /callout >}}

Table functions are used to query Logs and Metrics

<table style="width: 100%; table-layout: fixed;">
  <thead>
    <tr>
      <th style="width: 33%;">Function</th>
      <th style="width: 33%;">Description</th>
      <th style="width: 33%;">Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <pre>
dd.logs(
    filter => varchar,
    columns => array < varchar >,
    indexes ? => array < varchar >,
    from_timestamp ? => timestamp,
    to_timestamp ? => timestamp
) AS (column_name type [, ...])</pre>
      </td>
      <td>Returns log data as a table. The columns parameter specifies which log fields to extract, and the AS clause defines the schema of the returned table. Optional: filtering by index or time range. When time is not specified, we default to the past 1 hour of data.</td>
      <td>
        {{< code-block lang="sql" >}}
SELECT timestamp, host, service, message
FROM dd.logs(
    filter  => 'source:java',
    columns => ARRAY['timestamp','host', 'service','message']
) AS (
    timestamp TIMESTAMP,
    host      VARCHAR,
    service   VARCHAR,
    message   VARCHAR
){{< /code-block >}}
      </td>
    </tr>
    <tr>
      <td>
        <pre>
dd.metrics_scalar(
    query varchar,
    reducer varchar [, from_timestamp timestamp, to_timestamp timestamp]
)</pre>
      </td>
      <td>Returns metric data as a scalar value. The function accepts a metrics query (with optional grouping), a reducer to determine how values are aggregated (avg, max, etc.), and optional timestamp parameters (default 1 hour) to define the time range.</td>
      <td>
        {{< code-block lang="sql" >}}
SELECT *
FROM dd.metrics_scalar(
    'avg:system.cpu.user{*} by {service}',
    'avg',
    TIMESTAMP '2025-07-10 00:00:00.000-04:00',
    TIMESTAMP '2025-07-17 00:00:00.000-04:00'
)
ORDER BY value DESC;{{< /code-block >}}
      </td>
    </tr>
    <tr>
      <td>
        <pre>
dd.metrics_timeseries(
    query varchar [, from_timestamp timestamp, to_timestamp timestamp]
)</pre>
      </td>
      <td>Returns metric data as a timeseries. The function accepts a metrics query (with optional grouping) and optional timestamp parameters (default 1 hour) to define the time range. Returns data points over time rather than a single aggregated value.</td>
      <td>
        {{< code-block lang="sql" >}}
SELECT *
FROM dd.metrics_timeseries(
    'avg:system.cpu.user{*} by {service}',
    TIMESTAMP '2025-07-10 00:00:00.000-04:00',
    TIMESTAMP '2025-07-17 00:00:00.000-04:00'
)
ORDER BY timestamp, service;{{< /code-block >}}
      </td>
    </tr>
  </tbody>
</table>


## Tags

DDSQL exposes tags as an `hstore` type, which is inspired by PostgreSQL. You can access the values for specific tag keys using the PostgreSQL arrow operator. For example:

```sql
SELECT instance_type, count(instance_type)
FROM aws.ec2_instance
WHERE tags->'region' = 'us-east-1' -- region is a tag, not a column
GROUP BY instance_type
```

Tags are key-value pairs where each key can have zero, one, or multiple tag values corresponding to it. When accessed, the tag value returns a single string, containing _all_ corresponding values. When the data has multiple tag values for the same tag key, they are represented as a sorted, comma-separated string. For example:

```sql
SELECT tags->'team', instance_type, architecture, COUNT(*) as instance_count
FROM aws.ec2_instance
WHERE tags->'team' = 'compute_provisioning,database_ops'
GROUP BY tags->'team', instance_type, architecture
ORDER BY instance_count DESC
```

You can also compare tag values as strings or entire tag sets:

```sql
SELECT *
FROM k8s.daemonsets da INNER JOIN k8s.deployments de
ON da.tags = de.tags -- for a specific tag: da.tags->'app' = de.tags->'app'
```

Additionally, you can extract tag keys and values into individual arrays of text:

```sql
SELECT akeys(tags), avals(tags)
FROM aws.ec2_instance
```

### HSTORE functions and operators

| Name                                          | Return type   | Description                                                                                      |
|-----------------------------------------------|---------------|---------------------------------------------------------------------------------------------------
| tags -> 'text'                                  | Text          | Gets the value for a given key. Returns `null` if key is not present.                             |
| akeys(hstore tags)                            | Array of text | Gets the keys of an HSTORE as an array                                                            |
| avals(hstore tags)                            | Array of text | Gets the values of an HSTORE as an array                                                          |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /notebooks/advanced_analysis
[2]: https://www.postgresql.org/docs/current/functions-window.html
[3]: https://www.postgresql.org/docs/current/functions-json.html
[4]: /ddsql_editor/
[5]: https://unicode-org.github.io/icu/userguide/strings/regexp.html#regular-expression-metacharacters
[6]: https://unicode-org.github.io/icu/userguide/strings/regexp.html#regular-expression-operators
[7]: https://unicode-org.github.io/icu/userguide/strings/regexp.html#set-expressions-character-classes
[8]: https://unicode-org.github.io/icu/userguide/strings/regexp.html#flag-options
[9]: https://unicode-org.github.io/icu/userguide/strings/regexp.html#find-and-replace
