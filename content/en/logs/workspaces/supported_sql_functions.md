---
title: SQL Reference
disable_toc: false
aliases:
- /path-to-old-doc/
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
---

## Overview

SQL functions are built-in operations in SQL (Structured Query Language) used for tasks like calculations, data manipulation, or formatting. This documentation is a reference for SQL support functions available in Logs Workspaces. It details essential SQL functions, data types, and syntax compatible with PostgreSQL, providing a comprehensive resource for the Analysis cell. Use this guide to effectively leverage SQL capabilities in data analysis and manipulation within Log Workspaces.

## Functions

The following SQL functions are supported:
- MIN (returns the minimum value across all input values)
MAX (returns the maximum value across all input values)
- COUNT (returns the number of input values that are not null)
- SUM (returns the summation across all input values)
- AVG (returns the average value (arithmetic mean)  across all input values)

## Types

## Syntax

## Casting

Casting is not supported in SQL for Workspaces. However, you can cast columns between the supported types when defining them in a Logs data source:

1. In a workspace cell, click the cog labeled **Columns**.
1. Configure column types.

{{< img src="/logs/workspace/sql_support/cast_columns.png" alt="Cast columns between supported types in a workspace cell" style="width:100%;" >}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}