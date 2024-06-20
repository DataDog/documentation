---
title: Querying Tags in DDSQL
---

{{< callout url="https://datadoghq.com/private-beta/ddsql-editor">}}
DDSQL is in private beta.
{{< /callout >}}

Tags are a widespread mechanism to encode metadata about a particular record across several products at Datadog. Tags are key/value pairs for which a key may contain multiple values.

## Equality comparisons

Equality comparisons with tags are treated as a "contains" comparison rather than requiring strict equality. `service='website'` is true if a record has a `service` tag with the value `website`, even if it has other service tags as well.

As a consequence of this behavior, the `IN` operator with tags works as "overlaps". For example, `service IN ('webstore', 'webstore-analytics')` matches records that contain `service:webstore`, `service:webstore-analytics`, or both, even if other service tags are present (for example, `service:webstore,something-else` matches).

## Strict equality comparisons

To perform a strict comparison, cast the tag reference to a string, or compare it against a group literal in an outer query. For example, a query like

{{< code-block lang="sql" >}}
AGGR avg('system.load.1') WHERE team='logs' GROUP BY team
{{< /code-block >}}

May return the following result:

| Timeseries | Team             |
|------------|------------------|
| [...]      | logs             |
| [...]      | logs,team2       |
| [...]      | logs,team3,team4 |
| [...]      | logs,team2,team4 |

To instead match only on `logs`, use this query:

{{< code-block lang="sql" >}}
SELECT * 
FROM (AGGR avg('system.load.1') WHERE team='logs' GROUP BY team)
WHERE team={'logs'}
{{< /code-block >}}

This stricter comparison returns only one result:

| Timeseries | Team             |
|------------|------------------|
| [...]      | logs             |

## Implicit tag references

[Schema-on-read][1] references on tables that support tags are treated as tag lookups, and are called implicit tag references. 

For example, the `az` column does not exist on the `resources.host` table, but you may `SELECT az FROM resources.host`. DDSQL recognizes that the `resources.host` table supports schema on read, and `az` becomes an implicit tag reference. Its name in the projection is `az`, which may be used throughout the query.

## Explicit tag references

Explicit tag references allow a user to specify that a column reference should refer to a tag even if a column with an identical name exists in the table schema. Explicit tag references allow some basic defense against schema updates that change the meaning of queries relying on the implicit fallback behavior.

Explicit tag references are column references prepended with the `#` character. For example, the `resources.host` table contains a `service` column, but the query can reference the `service` tag explicitly:

{{< code-block lang="sql" >}}
SELECT #service FROM resources.host
{{< /code-block >}}

The tag's name in the projection is `#service`, which should be used throughout the query, as `service` refers to the schema column.

For tag references that require quoting, the `#` should appear outside of quotes (for example, `#"availability-zone"`). This is necessary to differentiate between explicit tag references and columns that start with a `#` character.

[1]: /dashboards/ddsql_editor/reference#schema-on-read