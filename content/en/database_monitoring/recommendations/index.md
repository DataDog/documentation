---
title: Recommendations
description: View recommendations to proactively address issues in your system
---

DBM Recommendations draw attention to potential optimizations and problematic areas across your database fleet.

{{< img src="database_monitoring/recommendations-page.png" alt="The Recommendations page in Datadog" style="width:90%;" >}}


We analyze the metrics and sample data that DBM collects to find the highest-priority issues across your systems. The severity indicator is calculated on a per-recommendation basis to determine which are the most impactful ones to focus on. High severity recommendations are likely to be a problem now or become one soon, and lower severity recommendations can be addressed asynchronously to proactively keep your databases healthy.

## Recommendation types

Choose your database type to view the supported recommendations:

{{< tabs >}}

{{% tab "Postgres" %}}

Missing Index
: The query's execution plan performs expensive sequential scans. When found, we suggest an index to speed up the query.

High Impact Blocker
: The query is causing a significant amount of waiting time for blocked queries.

Function in Filter
: The query calls a function on columns being filtered, leading to expensive sequential scans that can’t take advantage of typical column-based indexes.

High Row Count
: The query returns a large number of rows in their result set.

Unused Index
: The index has not been used in any execution plans recently.

Low Disk Space
: The database instance is running low on disk space. Note: this is only run on instances hosted on AWS RDS.

{{% /tab %}}

{{% tab "SQLServer" %}}

Missing Index
: The query's execution plan performs expensive sequential scans. When found, we suggest an index to speed up the query.

High Impact Blocker
: The query is causing a significant amount of waiting time for blocked queries.

High Row Count
: The query returns a large number of rows in their result set.

Low Disk Space
: The database instance is running low on disk space. Note: this is only run on instances hosted on AWS RDS.

{{% /tab %}}

{{% tab "MySQL" %}}

High Row Count
: The query returns a large number of rows in their result set.

Low Disk Space
: The database instance is running low on disk space. Note: this is only run on instances hosted on AWS RDS.

{{% /tab %}}

{{% tab "Oracle" %}}

High Impact Blocker
: The query is causing a significant amount of waiting time for blocked queries.

High Row Count
: The query returns a large number of rows in their result set.

Low Disk Space
: The database instance is running low on disk space. Note: this is only run on instances hosted on AWS RDS.

{{% /tab %}}

{{< /tabs>}}
