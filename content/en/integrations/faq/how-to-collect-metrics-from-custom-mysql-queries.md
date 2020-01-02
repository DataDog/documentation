---
title: How to collect metrics from custom MySQL queries
kind: faq
---

You can configure your MySQL integration to collect metrics from custom queries of your MySQL database by following the configuration syntax [in these lines][1] of our `mysql.yaml.example` file. While you do this, there are a few things you want to keep in mind...

<div class="alert alert-warning">
Custom metrics queried via custom_proc must have type <code>FLOAT</code> and not <code>INT</code>
</div>

## Qualifying your databases

When you add your custom query, you have to be careful to make sure each table you reference has its database qualified. This can be done by prepending the table with its database name in the following format:
```
SELECT * FROM database_name.table_name WHERE...
```

If you don't do this for all table names, the Agent may fail to run the custom query with the following error, or similar: No database selected. The Agent may be somewhat less forgiving than some other tools used to query MySQL, so even if you do not hit this error while running your custom query manually, that the Agent may still hit it if there are tables/views that are not prepended by their appropriate database name.

## Multiple line queries are not supported

If you try running a multi-line SQL query by adding the ";" character to your configuration's "query" string, only that part of the query string that least up to the first ";" is used by the Agent for the custom query.

## Naming your metric

The names applied to your custom query metrics are taken exactly as you provide them. It's generally recommended to begin your custom query metrics with the "mysql." namespace so that they are included in your MySQL summary dashboards on your infrastructure list and hostmap. But if you would like them to be included among a different namespace, then something other than "mysql." may be more appropriate.

## Frequency of queries

You custom query metric is collected by your MySQL check at the default Agent check schedule, every 15-20 seconds. If you would like to query these metrics less frequently, you could either reduce the frequency of the entire MySQL check (which would affect the frequency of your general mysql.* metrics), or you may prefer to run a custom scheduled/CRON script to submit the results of MySQL queries via the [DogStatsD][2] or [API][3].

## Maximum number of custom query metrics

The Agent caps off the number of custom queries it collects metrics from at 20, so as to ensure that running custom MySQL queries does not significantly delay its other scheduled checks. If you need to collect metrics from a great number of custom MySQL queries, you may prefer to run a custom scheduled/CRON script to submit the results of MySQL queries via the[DogStatsD][2] or [API][3].

## Example

Let's say you have a table called "test_table" in a database called "tester". test_table has the following content:
```
col_1 | col_2 | col_3
---------------------
1     | a     | a
2     | b     | b
3     | c     | c
```

If you were to add a custom query to your mysql.yaml with the following configuration setup:
```
    queries:
      - query: SELECT col_1 FROM tester.test_table WHERE col_2 = 'b'
        metric: mysql.custom_query.test.b
        tags:
            - tester:mysql
        type: gauge
        field: col_1
```

Then your Agent's MySQL check would run that query to collect a metric called "mysql.custom_query.test.b" with a value of "2", as shown below:

{{< img src="integrations/faq/mysql_metric_query.png" alt="mysql_metric_query"  >}}

[1]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example#L54-L71
[2]: /developers/metrics/dogstatsd_metrics_submission
[3]: /api
