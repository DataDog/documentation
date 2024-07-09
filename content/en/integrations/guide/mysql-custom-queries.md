---
title: MySQL Custom Queries

aliases:
  - /integrations/faq/how-to-collect-metrics-from-custom-mysql-queries
further_reading:
- link: "/integrations/mysql"
  tag: "Documentation"
  text: "Datadog MySQL integration"
---

The Datadog MySQL integration can collect metrics from custom queries.

## Configuration

Follow the configuration details in the [MySQL conf.yaml][1] file. Additional items of consideration are below.

### Qualify your database

When adding a custom query to the [MySQL conf.yaml][1], each table referenced must have the database qualified. This is done by prepending the table with its database name in the following format:

```sql
SELECT * FROM database_name.table_name WHERE...
```

If you omit the database name, the Agent fails to run the query with the error: `No database selected`.

### Name your metric

The names applied to your query metrics are taken as provided (there are no prepends). For example, your metric name could be: `myapp.custom_query.test`.

### Collection frequency

By default your metrics are collected by the MySQL check every 15-20 seconds. To query these metrics at a different frequency, reduce the frequency of the entire MySQL check (this affects the frequency of your general `mysql.*` metrics), or run a custom scheduled CRON script to submit metrics with the [API][2] or [DogStatsD][3].

### Number of custom queries

Running a large number of custom queries from the MySQL check can delay other Agent checks. If you need to collect metrics from a large number of custom MySQL queries, run a custom scheduled CRON script to submit metrics with the [API][2] or [DogStatsD][3].

## Example

You have a database named `tester` with the table `test_table` that contains the following data:

```text
col_1 | col_2 | col_3
---------------------
1     | a     | a
2     | b     | b
3     | c     | c
```

Adding the following custom query to your MySQL `conf.yaml` collects the metric `myapp.custom_query.test.b` with a value of `2`.

```yaml
    custom_queries:
      - query: SELECT col_1 FROM tester.test_table WHERE col_2 = 'b'
        columns:
        - name: myapp.custom_query.test.b
          type: gauge
        tags:
        - tester:mysql
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[2]: /api/
[3]: /metrics/custom_metrics/dogstatsd_metrics_submission/
