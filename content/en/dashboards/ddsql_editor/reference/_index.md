---
title: DDSQL Reference
kind: documentation
---

{{< callout url="https://google.com">}}
DDSQL is in private beta.
{{< /callout >}}

## Overview

With DDSQL, you can use SQL syntax to query your infrastructure in the [DDSQL Editor][2] in Datadog. 

DDSQL implements several standard SQL functions, as well as a few functions for working with Datadog tags, metrics, and so on. For example, [the `AGGR` statement], which aggregates metrics data, is unique to DDSQL.

DDSQL uses a [schema on read](#schema-on-read) approach to allow queries against unstructured data, such as [tags][1]. Each query is executed within a [session](#sessions) that can be configured with environment variables.

## Supported SQL syntax

SQL is broken into five different categories of statements. The table below indicates which categories are supported by DDSQL.

| Category   | Examples    | Support      |
|------------|-------------|--------------|
| DQL (Data Query Language)   | `SELECT`, `AGGR` (DDSQL alternative to `SELECT`) | Supported    |
| DML (Data Modification Language)  | `INSERT`, `UPDATE`, `DELETE`   | Limited: Data is not persisted across sessions |
| DDL (Data Description Language)  | `CREATE`   | Limited: Data is not persisted across sessions |
| DCL (Data Control Language)        | `GRANT`, `REVOKE`   | Not supported       |
| TCL (Transaction Control Language) | `BEGIN`, `END`, `ROLLBACK`  | Not supported     |

## Usage details

{{< whatsnext desc="For usage details, see the relevant documentation:" >}}
   {{< nextlink href="dashboards/ddsql_editor/reference/statements" >}}Statements (such as `SELECT`){{< /nextlink >}}
   {{< nextlink href="dashboards/ddsql_editor/reference/data_types" >}}Data types{{< /nextlink >}}
   {{< nextlink href="dashboards/ddsql_editor/reference/expressions_and_operators" >}}Expressions and operators{{< /nextlink >}}
   {{< nextlink href="dashboards/ddsql_editor/reference/scalar_functions" >}}Scalar functions (one computed value per row){{< /nextlink >}}
   {{< nextlink href="dashboards/ddsql_editor/reference/aggregation_functions" >}}Aggregation functions (one computed value per query or group){{< /nextlink >}}
   {{< nextlink href="dashboards/ddsql/reference/window_functions" >}}Window functions{{< /nextlink >}}
   {{< nextlink href="dashboards/ddsql_editor/reference/tags" >}}Querying tags{{< /nextlink >}}
{{< /whatsnext >}}

## Sessions

DDSQL queries are executed within a session. The session provides the user with a writable DDSQL environment. Modifications made by SQL statements, such as the creation of a table, are visible by subsequent statements in a session, but do not outlive the session. You can think of a session as executing within a `BEGIN ... ROLLBACK`.

Some options, such as time frame, are exposed runtime parameters within the environment and may be modified with [`SET`][3] and read with [`SHOW`][4].

The default schema in the session includes foreign table definitions that model different parts of the downstream data sources that DDSQL supports.

## Schema on read

"Schema on read" describes a strategy to apply a schema to data as it is read rather than when it is written. In DDSQL, it is used to enable SQL queries against unstructured data.

If a table supports schema on read, references to nonexistent table columns are allowed, and those references are mapped to the table in a way that is defined by the downstream. For many downstreams, these become tag references.

If a column reference cannot be unambiguously mapped to a single table, it is considered an ambiguous reference. Because schema-on-read columns don't exist in the catalog, they can typically only be used without specifying the correlation if there is exactly one table in the `FROM` clause that supports schema on read.

[1]: /dashboards/ddsql_editor/reference/tags
[2]: /dashboards/ddsql_editor
[3]: /dashboards/ddsql_editor/reference/statements/#set
[4]: /dashboards/ddsql_editor/reference/statements/#show