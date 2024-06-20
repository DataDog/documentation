---
title: Configuring An APM Stats Graph
disable_toc: false
aliases:
- /dashboards/querying/#configuring-an-apm-stats-graph
further_reading:
- link: "/dashboards/querying/"
  tag: "Documentation"
  text: "Learn how to query graphs"
---

## Overview

To configure your graph using APM stats data, follow these steps:

1. Select your visualization from the available [widgets][1].
2. [Choose your level of detail](#level-of-detail).
3. [Choose your parameters](#apm-stats-parameters).
4. Title the graph (same as for Metrics).

### Level of detail
Choose what level of detail you want to see statistics for: one or more services, resources, or spans. Not all of these are available for every widget type.

### APM stats parameters
Select the following parameters from the graphing editor: Environment (`env`), Primary tag (`primary_tag`), Service (`service`), and Operation name (`name`).

If your level of detail is `resource` or `span`, some widget types also require you to select a Resource name (`resource`) to narrow the scope of your query.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/widgets/