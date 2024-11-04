---
title: Recommendations
description: View recommendations to proactively address issues in your system


---

DBM Recommendations draw attention to potential optimizations and problematic areas across your database fleet. Use the Severity indicator to determine which are the most impactful recommendations to focus on.

{{< img src="database_monitoring/recommendations-page.png" alt="The Recommendations page in Datadog" style="width:90%;" >}}

## Recommendation types

Choose your database type to see the supported recommendations:

{{< tabs >}}

{{% tab "Postgres" %}}

Missing Index
: We analyze execution plans of queries and identify expensive sequential scans. When found, we suggest an index to speed up the query.

High Impact Blocker
: We analyze Query Samples to surface queries that are causing the most blocking.

Function in Filter
: We detect queries that call functions on columns being filtered, leading to expensive sequential scans that can’t take advantage of typical column-based indexes.

High Row Count
: We detect queries that return a large number of rows in their result set.

Low Disk Space
: We detect database instances that are running low on disk space.

Unused Index
: Detects indexes that have not been queried recently.

{{% /tab %}}

{{% tab "SQLServer" %}}

Missing Index
: We analyze execution plans of queries and identify expensive sequential scans. When found, we suggest an index to speed up the query.

High Impact Blocker
: We analyze Query Samples to surface queries that are causing the most blocking.

High Row Count
: We detect queries that return a large number of rows in their result set.

{{% /tab %}}

{{% tab "MySQL" %}}

High Row Count
: We detect queries that return a large number of rows in their result set.


{{% /tab %}}

{{% tab "Oracle" %}}


High Impact Blocker
: We analyze Query Samples to surface queries that are causing the most blocking.

High Row Count
: We detect queries that return a large number of rows in their result set.

{{% /tab %}}

{{< /tabs>}}

Choose your hosting type to see the supported recommendations:

{{< tabs >}}

{{% tab "RDS" %}}

Low Disk Space
: We detect database instances that are running low on disk space.

{{% /tab %}}

{{< /tabs>}}