---
title: Composite Metrics Queries
further_reading:
- link: "/reference_tables/"
  tag: "Documentation"
  text: "Reference Tables"
---

## Overview

Composite metrics queries enhance your monitoring and analysis capabilities by allowing dynamic tagging of metrics at query time. This simplifies the process of adding new tags to your metrics, and requires no code changes. Use composite metrics queries to enable more meaningful and actionable insights from your metric data.

Using composite metrics queries, you can accomplish the following:

- **Build context-rich dashboards**. Use [Reference Tables][1] to append more contextual tags such as `team` or `organization` to your metrics.
- **Simplify troubleshooting**. Alias opaque tag values (for example, IDs or codes) to human-readable values, reducing cognitive effort and resolution time.<br /><br />
   {{< img src="metrics/nested_queries/composite_metrics_queries/composite_metric_query_example.mp4" alt="How to configure composite metrics queries in the UI" video=true style="width:100%" >}}

## Setup

1. Create any metric query with [space aggregation][2] (one or more tags are selected to group by).
2. Select the **Join** button (next to the **Formulas** button) as shown below:

   {{< img src="metrics/nested_queries/composite_metrics_queries/reference_table_join.png" alt="The Join with Reference Table option in a metrics query" style="width:100%" >}}

3. Specify the type of join and the reference table that you want to join with your metrics.
4. Define the join condition with the existing tag from your query (for example, `team`) and the column in your reference table to be used for the join.
5. Select columns from the reference table to represent the aliased or new tags that you want to add to your existing query.

   {{< img src="metrics/nested_queries/composite_metrics_queries/reference_table_example.png" alt="A metrics query configured to join with a reference table" style="width:100%" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /reference_tables/
[2]: /metrics/#space-aggregation
