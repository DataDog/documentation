---
title: Recommendations
description: View recommendations to proactively address issues in your system
further_reading:
- link: "https://www.datadoghq.com/blog/database-monitoring-index-recommendations/"
  tag: "blog"
  text: "A deep dive into Database Monitoring index recommendations"
---

Database Monitoring (DBM) Recommendations draw attention to potential optimizations and problematic areas across your database fleet.

{{< img src="database_monitoring/recommendations-page.png" alt="The Recommendations page in Datadog" style="width:90%;" >}}

## How it works

Datadog analyzes metrics and sample data from DBM to identify your systems' highest-priority issues. A severity indicator is calculated for each recommendation, highlighting the most impactful areas to focus on. High-severity recommendations may indicate immediate or impending problems, while lower-severity recommendations can be addressed asynchronously to proactively maintain database health.

## Recommendation types

Choose your database type to view the supported recommendations:

{{< tabs >}}

{{% tab "Postgres" %}}

Missing Index
: The query's execution plan performs expensive sequential scans. When detected, Datadog recommends using an index to expedite the query.

High Impact Blocker
: The query is causing a significant amount of waiting time for blocked queries.

Function in Filter
: The query calls a function on columns being filtered, leading to expensive sequential scans that can’t take advantage of typical column-based indexes.

High Row Count
: The query returns a large number of rows in its result set.

Long Running Query
: The query has durations that have exceeded a threshold of 30 seconds.

Unused Index
: The index has not been used in any execution plans recently.

Low Disk Space
: The database instance is running low on disk space.

**Note**: The Low Disk Space recommendation is only available for instances hosted on AWS RDS.

{{% /tab %}}

{{% tab "SQL Server" %}}

Missing Index
: The query's execution plan performs expensive sequential scans. When detected, Datadog recommends using an index to expedite the query.

High Impact Blocker
: The query is causing a significant amount of waiting time for blocked queries.

High Row Count
: The query returns a large number of rows in its result set.

Unused Index
: The index has not been used in any execution plans recently.

Long Running Query
: The query has durations that have exceeded a threshold of 30 seconds.

Low Disk Space
: The database instance is running low on disk space.

**Note**: The Low Disk Space recommendation is only available for instances hosted on AWS RDS.

{{% /tab %}}

{{% tab "MySQL" %}}

High Row Count
: The query returns a large number of rows in its result set.

Long Running Query
: The query has durations that have exceeded a threshold of 30 seconds.

Low Disk Space
: The database instance is running low on disk space.

**Note**: The Low Disk Space recommendation is only available for instances hosted on AWS RDS.

{{% /tab %}}

{{% tab "Oracle" %}}

High Impact Blocker
: The query is causing a significant amount of waiting time for blocked queries.

High Row Count
: The query returns a large number of rows in its result set.

Long Running Query
: The query has durations that have exceeded a threshold of 30 seconds.

Low Disk Space
: The database instance is running low on disk space.

**Note**: The Low Disk Space recommendation is only available for instances hosted on AWS RDS.

{{% /tab %}}

{{% tab "MongoDB" %}}

Unused Index
: The index has not been used in any execution plans recently.

{{% /tab %}}

{{< /tabs>}}

## Configuration

### Default state
These features are on by default when DBM is enabled and are used to power specific recommendations when applicable:

Query Activity Samples
- Powers recommendations for: Missing Index, High Impact Blocker, Long Running Query

Explain Plans
- Powers recommendations for: Missing Index, Function in Filter, High Row Count

### Additional configuration required

| Recommendation  | Postgres            | SQL Server            | MySQL            | Oracle            | MongoDB              |
|-----------------|---------------------|-----------------------|------------------|-------------------|----------------------|
| Unused Index    | [Relation Metrics](https://github.com/DataDog/integrations-core/blob/893ded2e783741cc1524b9cda72428895aaf5d90/postgres/datadog_checks/postgres/data/conf.yaml.example#L143-L178) | [Index Usage Metrics](https://github.com/DataDog/integrations-core/blob/e3f44fbe555703e30c3b9c96e4fccdc5e57d626d/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example#L130-L201), [(Optional) Fragmentation Metrics](https://github.com/DataDog/integrations-core/blob/e3f44fbe555703e30c3b9c96e4fccdc5e57d626d/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example#L130-L201) | - | - | [Index Access Metrics](https://github.com/DataDog/integrations-core/blob/e3f44fbe555703e30c3b9c96e4fccdc5e57d626d/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example#L130-L201) |
| Low Disk Space  | [AWS RDS Integration](https://docs.datadoghq.com/integrations/amazon_rds/?tab=standard) | [AWS RDS Integration](https://docs.datadoghq.com/integrations/amazon_rds/?tab=standard) | [AWS RDS Integration](https://docs.datadoghq.com/integrations/amazon_rds/?tab=standard) | [AWS RDS Integration](https://docs.datadoghq.com/integrations/amazon_rds/?tab=standard) | - |

***Note**: 

## Further reading

{{< partial name="whats-next/whats-next.html" >}}