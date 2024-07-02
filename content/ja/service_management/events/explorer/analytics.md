---
title: Analytics
kind: Documentation
---

## Overview

Event Analytics extends the Events Explorer page with views, data aggregation, and grouping capabilities for troubleshooting and monitoring. You can control:

- The query that filters the set of views to analyze.
- The dimensions over which to group data.
- The visualization method for aggregates and groups.

You can export analytics visualizations to create widgets in a dashboard or notebook.

### Build an analytics query

Use the query to control what's displayed in your Events Analytics:

1. Choose an attribute or tag to graph, and add it as a facet. Graphing a facet displays the unique count of the variable.
    {{< img src="service_management/events/explorer/facet-to-graph.png" alt="Shows the list of facets that can be graphed." style="width:100%;" >}}
2. Use a facet to group your graph by. You must add an attribute as a facet to be able to use it here.
    {{< img src="service_management/events/explorer/split-graph.png" alt="Shows the list of facets that you can group data by." style="width:100%;" >}}
3. Choose the time interval for your graph. Changing the global timeframe changes the list of available timestep values. You can display the results as a timeseries, table, or top list.
    {{< img src="service_management/events/explorer/time-interval.png" alt="Shows the list of possible time intervals, including the default, 5 seconds." style="width:100%;" >}}
4. Choose to display either the top or bottom values according to the selected measure.
    {{< img src="service_management/events/explorer/display-values.png" alt="Choose to display the values from the top or from the bottom." style="width:100%;" >}}
