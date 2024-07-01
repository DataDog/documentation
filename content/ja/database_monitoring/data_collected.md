---
title: Database Monitoring Data Collected
description: Information about the data that Database Monitoring collects.
further_reading:

---

When you set up Database Monitoring, the Agent collects all the metrics described in the corresponding integration documentation. This includes metrics about database state, events, failovers, connections, and buffer pools, plus the query performance metrics that Database Monitoring uses.

These are standard Datadog metrics that you can use in [dashboards][1], [monitors][2], [notebooks][3], and anywhere else you use metrics.

To see a complete list of metrics collected, see the integration **Data Collected** documentation section for your database product:

{{< partial name="dbm/dbm-data-collected" >}}
<p></p>

The metrics used for Database Monitoring views are, primarily:
- **MySQL**: `mysql.queries.*`
- **Postgres**: `postgresql.queries.*`
- **SQL Server**: `sqlserver.queries.*`
- **Oracle**: `oracle.queries.*`

## Normalized queries

In order to eliminate redundant information and keep track of performance trends, Database Monitoring groups together identical queries with different parameters by obfuscating the parameters. These query groups are called normalized queries and are sometimes referred to as query digests. Rather than imposing a strict query volume limitation, Datadog supports 200 normalized queries per database host. This process also ensures that no sensitive data leaks into observability tools.

For example, you may see many queries retrieving data from the same table by id:

```sql
SELECT * FROM customers WHERE id = 13345;
SELECT * FROM customers WHERE id = 24435;
SELECT * FROM customers WHERE id = 34322;
```

These appear together as a normalized query that replaces the parameter with `?`.

```sql
SELECT * FROM customers WHERE id = ?
```

Queries with multiple parameters follow the same pattern:

```sql
SELECT * FROM timeperiods WHERE start >= '2022-01-01' AND end <= '2022-12-31' AND num = 5
```

The query above with specific parameters becomes the obfuscated version below:

```sql
SELECT * FROM timeperiods WHERE start >= ? AND end <= ? AND num = ?
```

## Sensitive information

Because the Database Monitoring Agent normalizes queries, it obfuscates all query bind parameters sent to the Datadog intake. Thus, passwords, PII (Personally identifiable information), and other potentially sensitive information stored in your database are not viewable in query metrics, query samples, or explain plans.

However, there are some common sources of data risks:

### Database schema

If table names, column names, indexes, database names, or any other schema contain sensitive information, these data are not obfuscated. It is uncommon that database schema are considered sensitive, but be advised that obfuscation is not applied to these data types.

### Database logs

If you are sending logs to Datadog from your database, be aware that some logs can contain the full SQL query text including query bind parameters. Review and apply [log security rules][4] consistent with your organization's requirements.

### Query comments

SQL query comments may be collected by the Agent and sent to Datadog without passing through obfuscation. SQL query comments generally do not contain sensitive data, but comments extracted from the query SQL will not pass through obfuscation.

## Which queries are tracked

Datadog Database Monitoring collects per-query metrics for the top 200 normalized queries measured by their total time spent executing on the host. This limit is applied only to each collection interval (10 seconds by default), so the total number of tracked queries can exceed the configured limit over longer periods of time.

Query samples have no limits on the number of unique normalized queries tracked, but the sampling is biased towards queries which are slow or frequent. It is possible for a query sample to be selected, but have no associated query metrics. This is the case when the query was slow or frequent for a brief period of time, but was not sustained enough to become a top query.

## Other queries

_Other Queries_ represent the metrics of all queries which do not appear in the top 200. Because a query may be a top query for some time frames but not others, the metrics for a particular query may sometimes be tracked as a distinct normalized query and other times counted in Other Queries.


[1]: /dashboards/
[2]: /monitors/
[3]: /notebooks/
[4]: /data_security/logs/
