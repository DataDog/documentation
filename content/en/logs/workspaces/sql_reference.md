---
title: SQL Reference
further_reading:
- link: "/logs/workspaces/"
  tag: "Documentation"
  text: "Learn more about Log Workspaces"
---

## Overview

SQL functions are built-in operations in SQL (Structured Query Language) used for tasks like calculations, data manipulation, or formatting. This documentation is a reference for SQL support available in Logs Workspaces. It details:
- [SQL functions](#functions)
- [Data types](#data-types)
- [Syntax compatible with PostgreSQL](#syntax)

It provides a resource for the Analysis cell. Use this information to leverage SQL capabilities in data analysis and manipulation within Log Workspaces.

{{< img src="/logs/workspace/sql_reference/sql_syntax_analysis_cell.png" alt="Example workspace cell with SQL syntax" style="width:100%;" >}}

## Functions

The following SQL functions are supported:

* `MIN` (returns the minimum value across all input values)  
* `MAX` (returns the maximum value across all input values)  
* `COUNT` (returns the number of input values that are not null)  
* `SUM` (returns the summation across all input values)  
* `AVG` (returns the average value (arithmetic mean)  across all input values)  
    
* `CEIL / CEILING` (returns the value rounded up to the nearest integer)  
* `FLOOR` (returns the value rounded down to the nearest integer)  
* `ROUND` (returns the value rounded to the nearest integer)  
* `LOWER` (returns the string as lower case)  
* `UPPER` (returns the string as uppercase)  
* `ABS` (returns the absolute value)  
    
* `Coalesce` (returns the first non-null value)

## Data types

These are all *non-standard types*.

* `int64` (64-bit integer type)  
* `float64` (64-bit floating point type)  
* `string`  
* `timestamp` (millisecond-precision timestamp, represented without a time zone)

## Syntax

* `SELECT (DISTINCT)`  
* `JOIN`  
* `GROUP BY`  
* `WHERE` (including support for `LIKE` filters on strings)  
* `CASE`   
* Basic (standard) arithmetic operations (e.g. \+, \-, \*, /)

## Casting

Casting is not supported in SQL for Workspaces. However, you can cast columns between the supported types when defining them in a Logs data source:

1. In a workspace cell, click the cog labeled **Columns**.
1. Configure column types.

{{< img src="/logs/workspace/sql_reference/cast_columns.png" alt="Cast columns between supported types in a workspace cell" style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}