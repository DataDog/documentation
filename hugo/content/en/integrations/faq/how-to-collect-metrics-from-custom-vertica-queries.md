---
title: How to collect metrics from custom Vertica queries

---

You can configure your Vertica integration to collect metrics from custom queries of your Vertica database by following the configuration syntax [in these lines][1] of the Datadog Vertica integration's `conf.yaml.example` file. While you do this, there are a few things you want to keep in mind.

## Custom query format

Define custom queries in the following format:

```text
custom_queries:
  - query: <QUERY>
    columns: <COLUMNS>
    tags: <TAGS>
```

Queries in Vertica resemble the same SQL queries used in other databases. Use the pipe symbol (`|`) in the `query` field to use a multi line query.

The `columns` field is a list representing each column, ordered sequentially from left to right. The number of columns must equal the number of columns returned in the query. Each column requires two pieces of data: `name` and `type`:
* The `name` field represents the suffix to append to `vertica.` in order to form the full metric name.
* The `type` field represents the submission method: `gauge`, `monotonic_count`, etc. Setting the `type` to `tag` results in tagging each metric in the row with the name and value of the item in this column.

The `tags` field is optional and represents a list of tags to apply to each metric.

### Example

```yaml
custom_queries:
  - query: |
      SELECT force_outer,
             table_name
      FROM v_catalog.tables
    columns:
      - name: table.force_outer
        type: gauge
      - name: table_name
        type: tag
    tags:
      - env:dev
```

## Global custom queries

You can define custom queries at the instance level, but if you wish to apply certain queries across all instances, use the `global_custom_queries` parameter in the `init_config` section.

In each instance, you can define the behavior of global custom queries using the `use_global_custom_queries` parameter. This value defaults to `true`.

| `global_custom_queries` value | Behavior                                                         |
|-------------------------------|------------------------------------------------------------------|
| `true`                        | `global_custom_queries` overrides `custom_queries`.              |
| `false`                       | `custom_queries` overrides `global_custom_queries`.              |
| `extend`                      | `global_custom_queries` is used in addition to `custom_queries`. |

[1]: https://github.com/DataDog/integrations-core/blob/master/vertica/datadog_checks/vertica/data/conf.yaml.example#L54-L71
