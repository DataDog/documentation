---
title: Recommendations
description: View recommendations to proactively address issues in your system


---

DBM Recommendations draw attention to potential optimizations and problematic areas across your database fleet.

## Recommendation types

### Query Recommendations

Datadog identifies improvements that can be made based on individual query performance.

Missing Index
: We analyze execution plans of queries and identify expensive sequential scans. When found, we suggest an index to speed up the query.

High Impact Blocker
: We analyze Query Samples to surface queries that are causing the most blocking.

Function in Filter
: We detect queries that call functions on columns being filtered, leading to expensive sequential scans that can’t take advantage of typical column-based indexes.

High Row Count

: We detect queries that return a large number of rows in their result set.

### Instance Recommendations

Datadog looks at instance-level information to make recommendations.

Low Disk Space
: We detect database instances that are running low on disk space.

### Schema Recommendations

Unused Index
: Detects indexes that have not been queried recently.

