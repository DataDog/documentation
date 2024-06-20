---
title: DDSQL Reference
---

{{< callout url="https://datadoghq.com/private-beta/ddsql-editor">}}
DDSQL is in private beta.
{{< /callout >}}

## Overview

DDSQL is a query language for Datadog data. It implements several standard SQL functions, such as `SELECT`, and allows queries against unstructured data, such as [tags][1].

You can use DDSQL to query your infrastructure in the [DDSQL Editor][2] in Datadog.

## Supported SQL syntax

SQL is broken into five different categories of statements. The table below indicates which categories are supported by DDSQL.

| Category   | Examples    | Support      |
|------------|-------------|--------------|
| DQL (Data Query Language)   | `SELECT` | Supported    |
| DML (Data Modification Language)  | `INSERT`, `UPDATE`, `DELETE`   | Limited: Data is not persisted across sessions |
| DDL (Data Description Language)  | `CREATE`   | Limited: Data is not persisted across sessions |
| DCL (Data Control Language)        | `GRANT`, `REVOKE`   | Not supported       |
| TCL (Transaction Control Language) | `BEGIN`, `END`, `ROLLBACK`  | Not supported     |

[1]: /dashboards/ddsql_editor/reference/tags
[2]: /dashboards/ddsql_editor
[3]: /dashboards/ddsql_editor/reference/statements/#set
[4]: /dashboards/ddsql_editor/reference/statements/#show
[5]: /dashboards/ddsql_editor/reference/statements/#aggr