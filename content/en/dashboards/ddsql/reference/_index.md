---
title: DDSQL Reference
kind: documentation
---

{{< callout url="https://google.com">}}
DDSQL is in private beta.
{{< /callout >}}

## Supported SQL syntax

SQL is broken into five different categories of statements. The table below indicates which categories are supported by DDSQL.

| Category                           | Examples                                         | Support                                        |
|------------------------------------|--------------------------------------------------|------------------------------------------------|
| DQL (Data Query Language)          | `SELECT`, `AGGR` (DDSQL alternative to `SELECT`) | Supported                                      |
| DML (Data Modification Language)   | `INSERT`, `UPDATE`, `DELETE`                     | Limited: Data is not persisted across sessions |
| DDL (Data Description Language)    | `CREATE`                                         | Limited: Data is not persisted across sessions |
| DCL (Data Control Language)        | `GRANT`, `REVOKE`                                | Not supported                                  |
| TCL (Transaction Control Language) | `BEGIN`, `END`, `ROLLBACK`                       | Not supported                                  |

## Usage details

{{< whatsnext desc="Functions:" >}}
   {{< nextlink href="dashboards/ddsql/reference/scalar_functions" >}}Scalar functions (one computed value per row){{< /nextlink >}}
   {{< nextlink href="dashboards/ddsql/reference/aggregation_functions" >}}Aggregation functions (one computed value){{< /nextlink >}}
   {{< nextlink href="dashboards/ddsql/reference/window_functions" >}}Window functions{{< /nextlink >}}
{{< /whatsnext >}}