---
title: DDSQL Reference
---

{{< callout url="https://datadoghq.com/private-beta/ddsql-editor">}}
DDSQL is in private beta.
{{< /callout >}}

## 概要

DDSQL is a query language for Datadog data. It implements several standard SQL functions, such as `SELECT`, and allows queries against unstructured data, such as [tags][1].

You can use DDSQL to query your infrastructure in the [DDSQL Editor][2] in Datadog.

## Supported SQL syntax

SQL is broken into five different categories of statements. The table below indicates which categories are supported by DDSQL.

| カテゴリー   | 例    | サポート      |
|------------|-------------|--------------|
| DQL (Data Query Language)   | `SELECT` | サポート    |
| DML (Data Modification Language)  | `INSERT`, `UPDATE`, `DELETE`   | Limited: Data is not persisted across sessions |
| DDL (Data Description Language)  | `CREATE`   | Limited: Data is not persisted across sessions |
| DCL (Data Control Language)        | `GRANT`, `REVOKE`   | サポート対象外       |
| TCL (Transaction Control Language) | `BEGIN`, `END`, `ROLLBACK`  | サポート対象外     |

[1]: /ja/dashboards/ddsql_editor/reference/tags
[2]: https://app.datadoghq.com/ddsql/editor