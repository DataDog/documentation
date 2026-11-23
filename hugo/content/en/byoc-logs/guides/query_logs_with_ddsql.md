---
title: Query BYOC Logs with DDSQL in Notebooks
description: Learn how to query logs stored in BYOC Logs indexes with DDSQL in Datadog Notebooks.
further_reading:
- link: "/ddsql_reference/"
  tag: "Documentation"
  text: "DDSQL Reference"
- link: "/notebooks/advanced_analysis/"
  tag: "Documentation"
  text: "Analysis features in Notebooks"
- link: "/byoc-logs/operate/search_logs/"
  tag: "Documentation"
  text: "Search BYOC Logs"
---

<div class="alert alert-info">DDSQL support for BYOC Logs is in Preview.</div>

## Overview

Use [DDSQL][1] in [Datadog Notebooks][2] to run SQL queries on logs stored in BYOC (Bring Your Own Cloud) Logs indexes. With DDSQL, you can:

- Aggregate, bucket, and rank log data
- Apply string, time, and network functions
- Use window functions
- Join logs from more than one BYOC Logs cluster in a single query

## Prerequisites

- A running BYOC Logs deployment with logs ingested.
- Access to [Datadog Notebooks][3].
- Your BYOC Logs index name, in the format `byoc--<CLUSTER_NAME>--<INDEX_NAME>`. You can find it in the [Log Explorer][4] under {{< ui >}}BYOC INDEXES{{< /ui >}}.

## Query BYOC Logs

To query BYOC Logs with DDSQL, add a data source cell that selects logs from your BYOC Logs index, then query that cell from an analysis cell.

### Add a BYOC Logs data source

1. In a notebook, type `/datasource` and press <kbd>Enter</kbd>, or click the {{< ui >}}Data Source{{< /ui >}} tile at the bottom of the page.
1. Select {{< ui >}}Logs{{< /ui >}} as the data source.
1. In the search bar, enter a query that includes your BYOC Logs index. For example:

   ```text
   index:byoc--cluster-1--application service:(checkout OR payments)
   ```

   To query all indexes in a cluster, use `index:byoc--<CLUSTER_NAME>`.
1. Rename the cell to a short name, such as `app_logs`. Use this name as the table name in SQL queries.

Add a separate data source cell for each set of logs you want to query or join. The examples on this page use two data sources:

| Data source name | Query | Attributes used in examples |
|------------------|-------|-----------------------------|
| `app_logs` | `index:byoc--cluster-1--application` | `@latency_ms` |
| `access_logs` | `index:byoc--cluster-2--access` | `@status_code`, `@duration_ms`, `@url`, `@user_agent` |

### Write a SQL query

1. In your notebook, type `/sql` and press <kbd>Enter</kbd>, or click the {{< ui >}}SQL Query{{< /ui >}} tile at the bottom of the page.
1. Write your query. Use the data source cell name as the table name.
1. Click {{< ui >}}Run{{< /ui >}}.

Reference reserved attributes, such as `timestamp`, `host`, `service`, `status`, and `message`, by name. Reference other attributes in double quotes with the `@` prefix, such as `"@latency_ms"`. For example:

```sql
SELECT service, COUNT(*) AS events
FROM app_logs
GROUP BY service
ORDER BY events DESC
```

## Example queries

For the full list of supported syntax and functions, see the [DDSQL Reference][1].

The following examples use the `app_logs` and `access_logs` data source cells described in the [Add a BYOC Logs data source](#add-a-byoc-logs-data-source) section. Replace the table and attribute names with your own.

### Latency statistics per service

Use this query to compare average, maximum, and percentile latency across services.

```sql
SELECT service,
       COUNT(*) AS events,
       ROUND(AVG("@latency_ms"), 2) AS avg_ms,
       MAX("@latency_ms") AS max_ms,
       APPROX_PERCENTILE(0.95) WITHIN GROUP (ORDER BY "@latency_ms") AS p95_ms,
       APPROX_PERCENTILE(0.99) WITHIN GROUP (ORDER BY "@latency_ms") AS p99_ms
FROM app_logs
GROUP BY service
ORDER BY p99_ms DESC
```

### Bucket logs by latency

Use this query to group logs into latency ranges and count the logs in each range.

```sql
SELECT CASE
         WHEN "@latency_ms" < 10 THEN 'a. under 10ms'
         WHEN "@latency_ms" < 100 THEN 'b. 10-100ms'
         WHEN "@latency_ms" < 1000 THEN 'c. 100ms-1s'
         ELSE 'd. over 1s'
       END AS latency_bucket,
       COUNT(*) AS events
FROM app_logs
GROUP BY CASE
         WHEN "@latency_ms" < 10 THEN 'a. under 10ms'
         WHEN "@latency_ms" < 100 THEN 'b. 10-100ms'
         WHEN "@latency_ms" < 1000 THEN 'c. 100ms-1s'
         ELSE 'd. over 1s'
       END
ORDER BY latency_bucket
```

### Server error rate per service

Use this query to find which services return the highest share of 5xx responses.

```sql
SELECT service,
       COUNT(*) AS requests,
       SUM(CASE WHEN "@status_code" >= 500 THEN 1 ELSE 0 END) AS server_errors,
       ROUND(100.0 * SUM(CASE WHEN "@status_code" >= 500 THEN 1 ELSE 0 END) / COUNT(*), 2) AS error_pct
FROM access_logs
GROUP BY service
ORDER BY error_pct DESC
```

### Log volume per minute

Use this query to count logs in one-minute intervals and spot spikes or drops in volume.

```sql
SELECT DATE_TRUNC('minute', timestamp) AS minute,
       COUNT(*) AS events
FROM app_logs
GROUP BY DATE_TRUNC('minute', timestamp)
ORDER BY minute
```

### Classify requests by user agent

Use this query to group requests by client type, such as bots or mobile devices, based on the user agent.

```sql
SELECT CASE
         WHEN REGEXP_LIKE("@user_agent", 'bot|crawl|spider', 'i') THEN 'bot'
         WHEN REGEXP_LIKE("@user_agent", 'Android', 'i') THEN 'android'
         WHEN REGEXP_LIKE("@user_agent", 'iPhone|iPad', 'i') THEN 'ios'
         ELSE 'other'
       END AS client_type,
       COUNT(*) AS requests
FROM access_logs
GROUP BY CASE
         WHEN REGEXP_LIKE("@user_agent", 'bot|crawl|spider', 'i') THEN 'bot'
         WHEN REGEXP_LIKE("@user_agent", 'Android', 'i') THEN 'android'
         WHEN REGEXP_LIKE("@user_agent", 'iPhone|iPad', 'i') THEN 'ios'
         ELSE 'other'
       END
ORDER BY requests DESC
```

### Top three hosts per service

Use this query to rank hosts by log volume within each service and return the top three.

```sql
SELECT service, host, events
FROM (
  SELECT service,
         host,
         COUNT(*) AS events,
         ROW_NUMBER() OVER (PARTITION BY service ORDER BY COUNT(*) DESC) AS rn
  FROM app_logs
  GROUP BY service, host
) AS ranked
WHERE rn <= 3
ORDER BY service, events DESC
```

### Join logs from two BYOC Logs clusters

This query compares application latency from one cluster with the HTTP server error rate from another cluster:

```sql
SELECT a.service,
       ROUND(a.avg_latency_ms, 2) AS app_avg_latency_ms,
       x.server_error_pct
FROM (SELECT service, AVG("@latency_ms") AS avg_latency_ms
      FROM app_logs
      GROUP BY service) AS a
INNER JOIN
     (SELECT service,
             ROUND(100.0 * SUM(CASE WHEN "@status_code" >= 500 THEN 1 ELSE 0 END) / COUNT(*), 2) AS server_error_pct
      FROM access_logs
      GROUP BY service) AS x
  ON a.service = x.service
ORDER BY x.server_error_pct DESC
```

### Combine queries with a common table expression

Use a common table expression (CTE) to define an intermediate result and query it by name. This query keeps only services with more than 100 logs.

```sql
WITH per_service AS (
  SELECT service, COUNT(*) AS events, AVG("@latency_ms") AS avg_ms
  FROM app_logs
  GROUP BY service
)
SELECT service, events, ROUND(avg_ms, 2) AS avg_ms
FROM per_service
WHERE events > 100
ORDER BY events DESC
```


## Limitations and recommendations

- Inline calculated fields are not supported. To derive values, use SQL expressions in an analysis cell, such as `CASE` statements or arithmetic.
- Regular expression functions and `UNNEST` can time out on large fields, such as `message`. Apply them to shorter attributes, such as URLs or user agents.
- To use network address functions on an IP address attribute, cast the attribute to `inet` first. For example: `CAST("@client_ip" AS inet) << CAST('10.0.0.0/8' AS inet)`.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ddsql_reference/
[2]: /notebooks/advanced_analysis/
[3]: https://app.datadoghq.com/notebook/list
[4]: https://app.datadoghq.com/logs
