---
title: Database Monitoring FAQ
kind: documentation
description: Database Monitoring frequently asked questions
further_reading:
- link: "/tk/tk/"
  tag: "Documentation"
  text: "tktk"

---

## Which database technologies are supported?

Datadog Database Monitoring currently supports **Postgres** and **MySQL** for self-hosted versions and managed cloud versions.

##### Postgres versions supported

|  | Self-hosted | AWS RDS | AWS Aurora | Google Cloud SQL |
|--|------------|---------|------------|------------------|
| PostgreSQL <= 9.5 | No | N/A | N/A | N/A |
| PostgreSQL 9.6 | Yes | Yes | Yes | Yes |
| PostgreSQL 10 | Yes | Yes | Yes | Yes |
| PostgreSQL 11 | Yes | Yes | Yes | Yes |
| PostgreSQL 12 | Yes | Yes | Yes | Yes |
| PostgreSQL 13 | Yes | Yes | Yes | Yes |

##### MySQL versions supported

|  | Self-hosted | AWS RDS | AWS Aurora | Google Cloud SQL |
|--|------------|---------|------------|------------------|
| MySQL 5.6 | Yes | Yes | Yes | Yes (see note) |
| MySQL 5.7 | Yes | Yes | Yes | Yes (see note) |
| MySQL 5.8 | Yes | Yes | Yes | Yes (see note) |


*Note: Due to limitations with Google Cloud SQL, Datadog Database Monitoring is [not supported on instances with less than 26GB of RAM][1] because [`performance_schema`][2] cannot be enabled.

## What is the performance impact of Database Monitoring?

The default agent configuration for Database Monitoring is chosen to be conservative, but settings such as the collection interval and query sampling rate can be adjusted to better suit your needs. For most workloads, the agent represents <1% of query execution time on the database and <1% of CPU.

Database Monitoring runs as an integration on top of the base agent ([see benchmarks][3]).

## Does the Datadog agent collect sensitive information from my database?

The Database Monitoring agent obfuscates all query bind parameters sent to the Datadog intake. Thus passwords, PII (Personally identifiable information), and other potentially sensitive information stored in your database will not be viewable in Query Metrics, Query Samples, or Explain Plans.

However, there are some common sources of data leakage that we recommend you review:

### Database Schema

If table names, column names, indexes, database names, or any other schema contain sensitive information, these data are not obfuscated. It is very uncommon that database schema are considered sensitive, but please be advised that obfuscation is not applied to these data types.

### Database Logs

If you are sending logs to Datadog from your database, please be aware that some logs can contain the full SQL query text including query bind parameters. We recommend reviewing and applying [log security rules][4] consistent with your organization's requirements.


## Which queries are tracked?

Datadog Database Monitoring collects per-query metrics for the top 200 normalized queries measured by their total time spent executing on the host. This limit is applied only to each collection interval (10 seconds by default), so the total number of tracked queries can exceed the configured limit over longer periods of time.

Query samples have no limits on the number of unique normalized queries tracked, but the sampling is biased towards queries which are slow or frequent. It is possible for a query sample to be selected, but have no associated query metrics. This is the case when the query was slow or frequent for a brief period of time, but was not sustained enough to become a top query.

## What are "Other Queries?"

“Other Queries” represent the metrics of all queries which do not appear in the top 200. Because a query may be a top query for some time frames but not others, the metrics for a particular query may sometimes be tracked as a distinct normalized query and other times counted in the “Other Queries.”


## Can the agent be configured to connect to proxies, load balancers, and connection poolers?

The agent must connect directly to the host being monitored. If the database is self-hosted, then “localhost” or the socket is preferred. The agent should not connect to the database through a proxy, load balancer, or connection pooler such as pgbouncer. While this can be an anti-pattern for client applications, each agent must have knowledge of the underlying hostname and should be “sticky” to a single host, even in cases of failover. If the Datadog agent connects to different hosts while it is running, the value of metrics will be incorrect.

### AWS Aurora

Specifically for AWS Aurora, the agent should connect to the “instance endpoint.”  AWS Aurora provides a “cluster endpoint” which allows client applications to connect to a reader or writer instance without knowledge of the underlying database host. While this is desirable for applications, the agent must be aware of all instances.

[1]: https://cloud.google.com/sql/docs/mysql/flags#tips-performance-schema
[2]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema.html
[3]: /agent/basic_agent_usage#agent-overhead
[4]: /security/logs/
