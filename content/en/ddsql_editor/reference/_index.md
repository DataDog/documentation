---
title: DDSQL Reference
aliases:
- /dashboards/ddsql_editor/reference/
---

{{< callout url="https://datadoghq.com/private-beta/ddsql-editor">}}
DDSQL is in private beta.
{{< /callout >}}

## Overview

DDSQL is a query language for Datadog data. It implements several standard SQL operations, such as `SELECT`, and allows queries against unstructured data, such as [tags][1].

You can use DDSQL to query your infrastructure in the [DDSQL Editor][2] in Datadog.

{{< whatsnext desc="" >}}
    {{< nextlink href="ddsql_editor/reference/aggregation_functions" >}}Aggregation Functions{{< /nextlink >}}
    {{< nextlink href="ddsql_editor/reference/data_types" >}}Data Types{{< /nextlink >}}
    {{< nextlink href="ddsql_editor/reference/expressions_and_operators" >}}Expressions and Operators{{< /nextlink >}}
    {{< nextlink href="ddsql_editor/reference/scalar_functions" >}}Scalar Functions{{< /nextlink >}}
    {{< nextlink href="ddsql_editor/reference/statements" >}}Statements{{< /nextlink >}}
    {{< nextlink href="ddsql_editor/reference/tags" >}}Tags{{< /nextlink >}}
{{< /whatsnext >}}


[1]: /dashboards/ddsql_editor/reference/tags
[2]: https://app.datadoghq.com/ddsql/editor