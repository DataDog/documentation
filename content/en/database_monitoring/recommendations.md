---
title: Recommendations
description: View recommendations to proactively address issues in your system
further_reading:
  - link: "https://www.datadoghq.com/blog/database-monitoring-index-recommendations/"
    tag: "blog"
    text: "A deep dive into Database Monitoring index recommendations"
  - link: "https://www.datadoghq.com/blog/database-monitoring-query-regressions/"
    tag: "Blog"
    text: "Detect and investigate query regressions with Datadog Database Monitoring"
---

Database Monitoring (DBM) Recommendations draw attention to potential optimizations and problematic areas across your database fleet.

{{< img src="database_monitoring/recommendations-page.png" alt="The Recommendations page in Datadog" style="width:90%;" >}}

## How it works

Datadog analyzes metrics and sample data from DBM to identify your systems' highest-priority issues. A severity indicator is calculated for each recommendation, highlighting the most impactful areas to focus on. High-severity recommendations may indicate immediate or impending problems, while lower-severity recommendations can be addressed asynchronously to proactively maintain database health.

## Supported recommendation types

| Recommendation Type     | Description                                                                                                                                            | MongoDB                     | MySQL                       | Oracle                      | PostgreSQL                  | SQL Server                  |
|-------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------|-----------------------------|-----------------------------|-----------------------------|-----------------------------|
| **Function in Filter**  | The query calls a function on columns being filtered, leading to expensive sequential scans that can't take advantage of typical column-based indexes. |                             |                             |                             | <i class='icon-check-bold'> |                             |
| **High Disk Queue Depth** | The database instance is experiencing excessive I/O wait that can slow workloads and impact overall throughput. <br><br>**Note**: Only available on Amazon RDS.  |              | <i class='icon-check-bold'> | <i class='icon-check-bold'> | <i class='icon-check-bold'> | <i class='icon-check-bold'> |
| **High Impact Blocker** | The query is causing a significant amount of waiting time for blocked queries.                                                                         |                             |                             | <i class='icon-check-bold'> | <i class='icon-check-bold'> | <i class='icon-check-bold'> |
| **High Row Count**      | The query returns a large number of rows in its result set.                                                                                            |                             | <i class='icon-check-bold'> | <i class='icon-check-bold'> | <i class='icon-check-bold'> | <i class='icon-check-bold'> |
| **Long Running Query**  | The query has durations that have exceeded a threshold of 30 seconds.                                                                                  |                             | <i class='icon-check-bold'> | <i class='icon-check-bold'> | <i class='icon-check-bold'> | <i class='icon-check-bold'> |
| **Low Disk Space**      | The database instance is running low on disk space. <br><br>**Note**: Only available on Amazon RDS.                                                    |                             | <i class='icon-check-bold'> | <i class='icon-check-bold'> | <i class='icon-check-bold'> | <i class='icon-check-bold'> |
| **Missing Index**       | The query's execution plan performs expensive sequential scans. When detected, Datadog recommends using an index to expedite the query.                | <i class='icon-check-bold'> | <i class='icon-check-bold'> |                             | <i class='icon-check-bold'> | <i class='icon-check-bold'> |
| **Query Load Increase**       | The query has seen a significant increase in total duration.                |                             | <i class='icon-check-bold'>  |                             | <i class='icon-check-bold'> |                             |
| **Unused Index**        | The index has not been used in any execution plans recently.                                                                                           | <i class='icon-check-bold'> |  <i class='icon-check-bold'> |                             | <i class='icon-check-bold'> | <i class='icon-check-bold'> |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
