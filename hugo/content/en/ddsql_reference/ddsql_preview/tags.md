---
title: Querying Tags in DDSQL (Preview)
private: true
aliases:
- /dashboards/ddsql_editor/reference/tags/
- /ddsql_editor/reference/tags/
- /ddsql_editor/tags
---

{{< callout url="https://datadoghq.com/private-beta/ddsql-editor">}}
The DDSQL Editor is in Preview.
{{< /callout >}}

<div class="alert alert-danger">
  There are two different <strong>variants</strong> of DDSQL. The examples in this guide use DDSQL (Preview) Syntax. See the syntax documented in <a href="/ddsql_reference/">DDSQL Reference</a>.
</div>

Tags are a widespread mechanism to encode metadata about a particular record across several products at Datadog. Tags are key-value pairs for which a key may contain multiple values.

Tags are modeled in DDSQL with the key as a column name, and values in a `group` type, a sorted set of strings with tag-like "= is contains" semantics.

## Equality comparisons

Equality comparisons between tags and strings are treated as a "contains" comparison rather than requiring strict equality. `service='website'` is true if a record has a `service` tag with the value `website`, even if it has other service tags as well.

As a consequence of this behavior, the `IN` operator with tags works as "overlaps". For example, `service IN ('webstore', 'webstore-analytics')` matches records that contain `service:webstore`, `service:webstore-analytics`, or both, even if other service tags are present (for example, `service:webstore,something-else` matches).

## Strict equality comparisons

To perform a strict comparison, cast the tag reference to a string, or compare it against a group literal in an outer query. For example, a query like

{{< code-block lang="sql" >}}
SELECT * FROM host WHERE team='logs' GROUP BY team;
{{< /code-block >}}

May return the following result:

| team             |
|------------------|
| logs             |
| logs,team2       |
| logs,team3,team4 |
| logs,team2,team4 |

To instead match only on `logs`, use this query:

{{< code-block lang="sql" >}}
SELECT * FROM host WHERE team={'logs'} GROUP BY team;
{{< /code-block >}}

This stricter comparison returns only one result:

| team             |
|------------------|
| logs             |

## Implicit tag references

Schema-on-read references on tables that support tags are treated as tag lookups, and are called implicit tag references.

For example, the `az` column does not exist on the `resources.host` table, but you may `SELECT az FROM resources.host`. DDSQL recognizes that the `resources.host` table supports schema on read, and `az` becomes an implicit tag reference. Its name in the projection is `az`, which may be used throughout the query.

## Explicit tag references

Explicit tag references allow a user to specify that a column reference should refer to a tag even if a column with an identical name exists in the table schema. Explicit tag references allow some basic defense against schema updates that change the meaning of queries relying on the implicit fallback behavior.

Explicit tag references are column references prepended with the `#` character. For example, the `resources.host` table contains a `service` column, but the query can reference the `service` tag explicitly:

{{< code-block lang="sql" >}}
SELECT #service FROM resources.host
{{< /code-block >}}

The tag's name in the projection is `#service`, which should be used throughout the query, as `service` refers to the schema column.

For tag references that require quoting, the `#` should appear outside of quotes (for example, `#"availability-zone"`). This is necessary to differentiate between explicit tag references and columns that start with a `#` character.
