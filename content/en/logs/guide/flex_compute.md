---
title: Monitor Flex Compute Usage
description: Learn how to monitor and optimize your Flex Logs compute usage through query performance metrics and visualizations
further_reading:
- link: "/logs/log_configuration/flex_logs/"
  tag: "Documentation"
  text: "Flex Logs"
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Log Explorer"
---

## Overview

Monitor the usage of Flex compute through various graphs on the Flex Controls page. Make informed decisions using data on cost-performance tradeoffs and balance operational success with financial efficiency.

<!-- {{< img src="path/to/your/image-name-here.png" alt="TBD Dashboard showing both the query performance and compute size" style="width:100%;" >}} -->

## Monitoring query performance

Flex compute is limited by two factors:
- The number of concurrent queries
- The maximum number of logs that can be scanned per query

Query slowdowns occur when the concurrent query limit is reached, and a query is retrying to find an available slot to run in. If an available slot is not found, the query will not run. Datadog displays an error message advising you to retry your query at a later time.

### Available metrics

The Flex Logs Controls page provides visualizations so you can assess how often query slowdowns are occurring and where they are happening most frequently. The following metrics are available:
- Query slowdowns
- Top sources of query slowdowns
- Top users experiencing slowdowns
- Top dashboards experiencing slowdowns

## Optimization recommendations

Use this information to optimize your usage.

1. **Reach out to outlier users to:**
   - Discuss their querying needs
   - Understand if there are logs they query frequently that should be stored in Standard Indexing instead
1. **Improve dashboards experiencing slowdowns by:**
<<<<<<< HEAD:content/en/logs/guide/flex_logs_compute.md
   - Evaluating if logs used to power widgets can be converted into metrics to reduce the heavy Flex Logs compute usage
   - Breaking them down into smaller dashboards to spread the load
=======
   - Evaluating if logs used to power widgets can be converted into metrics to reduce the heavy Flex compute usage
   - Breaking down into smaller dashboards to spread the load
>>>>>>> c4e442dcd5 (Change Flex Logs Compute to Flex Compute):content/en/logs/guide/flex_compute.md
   - Reducing the number of concurrent queries
1. **Consider upgrading your Flex compute size** to increase the concurrent query limit if you notice sustained query slowdowns.

To learn more about compute sizes, see the [Flex Logs][1] documentation.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_configuration/flex_logs/