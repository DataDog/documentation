---
title: Incident Management Analytics
kind: documentation
description: Track and analyze aggregated incident management statistics in Dashboards and Notebooks
---

## Overview

{{< img src="monitors/incidents/incident_analytics.mp4" alt="Incident Management Analytics" video=true style="width:80%;">}}

Incident Management Analytics is a queryable data source for aggregated incident statistics. You can query these analytics in a variety of graph widgets in both [Dashboards][1] and [Notebooks][2] to analyze the history of your incident response over time. To give you a starting point, Datadog provides an Incident Management Overview [Dashboard template][3] and [Notebook template][4] that you can clone and customize as necessary.

The following widgets support Incident Management Analytics:

* Timeseries
* Top List 
* Query Value 

### Graph configuration

To configure your graph using Incident Management Analytics data, follow these steps:

1. [Select your visualization][5].
2. Select `Incidents` from the data source dropdown menu.
3. Select a measure from the yellow dropdown menu.
     - **Default Statistic:** Counts the number of incidents.
4. Select an aggregation for the measure.
5. (Optional) Select a rollup for the measure.
6. (Optional) Use the search bar to filter the statistic down to a specific subset of incidents.
7. (Optional) Select a facet in the pink dropdown menu to break the measure up by group and select a limited number of groups to display.
8. [Title the graph][6].
9. Save your widget.

**Example:** Weekly Outage Customer Impact Duration by Service

1. Widget: Timeseries Line Graph
2. Datasource: `Incidents`
3. Measure: `Customer Impact Duration`
4. Aggregation: `avg`
5. Rollup: `1w`
6. Filter: `severity:(“SEV-1” OR “SEV-2”)`
7. Group: `Services`, limit to top 5

{{< img src="monitors/incidents/incident_analytics_query_example.jpeg" alt="Incident Analytics Query Example" style="width:80%;">}}

[1]: /dashboards/
[2]: /notebooks/
[3]: https://app.datadoghq.com/dash/integration/30523/incident-management-overview?from_ts=1632093826308&to_ts=1634685826308&live=true
[4]: https://app.datadoghq.com/notebook/template/11/incident-management-overview
[5]: /dashboards/querying/#select-your-visualization
[6]: /dashboards/querying/#create-a-title
