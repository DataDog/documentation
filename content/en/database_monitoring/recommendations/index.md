---
title: Recommendations
description: View recommendations to proactively address issues in your system
---

Database Monitoring (DBM) Recommendations draw attention to potential optimizations and problematic areas across your database fleet.

{{< img src="database_monitoring/recommendations-page.png" alt="The Recommendations page in Datadog" style="width:90%;" >}}

## How it Works

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

{{% tab "SQLServer" %}}

Missing Index
: The query's execution plan performs expensive sequential scans. When detected, Datadog recommends using an index to expedite the query.

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

{{< /tabs>}}
