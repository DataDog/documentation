---
title: Incident Management Analytics
description: Track and analyze aggregated incident management statistics in Dashboards and Notebooks
aliases:
- /monitors/incident_management/analytics
further_reading:
- link: "/service_management/incident_management/incident_settings"
  tag: "Documentation"
  text: "Incident Settings"
- link: "https://app.datadoghq.com/dash/integration/30523/incident-management-overview"
  tag: "In the app"
  text: "OOTB Incident Management Overview Dashboard"
- link: "https://app.datadoghq.com/notebook/template/11/incident-management-overview"
  tag: "In the app"
  text: "OOTB Incident Report Template"
---

## Overview

{{< img src="service_management/incidents/analytics/incident_analytics.mp4" alt="Scroll through the Incident Management Overview dashboard" video=true style="width:100%;">}}

Use Incident Analytics to learn from past incidents and understand the efficiency and performance of your incident response process. Incident analytics allows you to pull aggregated statistics on your incidents over time. You can use these statistics to create reports that help you to:
- Analyze whether your incident response process is improving over time
- Assess your mean time to resolutions
- Identify areas of improvement that you should invest in

## Data collected

Incident Management Analytics is a queryable data source for aggregated incident statistics. You can query these analytics in a variety of graph widgets in both Dashboards and Notebooks to analyze the history of your incident response over time. To give you a starting point, Datadog provides the following out-of-the-box resources that you can clone and customize:
- [Incident Management Overview Dashboard template][3] 
- [Notebook Incident Report template][4]

### Measures

Incident Management collects the following analytic measures to form analytic queries:

- Incident Count
- Customer Impact Duration
- Status Active Duration
- Status Stable Duration
- Time to Detect
- Time to Repair (customer impact end time - created time)
- Time to Resolve (resolved time - created time)
- Number of Users Impacted
- Acknowledge

In addition to these defaults, you can create new measures by adding custom *Number* property fields in your [Incident Settings][7]. 

## Visualize incident data in dashboards

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

### Example: Weekly outage customer impact duration grouped by service

{{< img src="/service_management/incidents/analytics/analytics_graph_configuration.png" alt="Timeseries graph configuration showing Incidents data source filtered by severity, showing the customer impact duration grouped by service" style="width:90%;" >}}

This example configuration shows you an aggregation of your incidents that are SEV-1 or SEV-2. The graph displays the Customer Impact Duration of those incidents grouped by service. 

1. Widget: [Timeseries Line Graph][8]
2. Datasource: `Incidents`
3. Measure: `Customer Impact Duration`
4. Aggregation: `avg`
5. Rollup: `1w`
6. Filter: `severity:("SEV-1" OR "SEV-2")`
7. Group: `Services`, limit to top 5

## Incident report

Use the out-of-the-box Notebook template to create the Incident Report or build one from scratch to get a summary report of incidents in your team or service.
1. Open the [Incident Report template][9].
1. Click **Use Template** to edit and customize.
1. You can use the existing Incident cells or customize the query to display values for each measure.
1. Update the summary cells with the relevant values and [share the report][10] with the rest of your team.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/
[2]: /notebooks/
[3]: https://app.datadoghq.com/dash/integration/30523/incident-management-overview?from_ts=1632093826308&to_ts=1634685826308&live=true
[4]: https://app.datadoghq.com/notebook/template/11/incident-management-overview
[5]: /dashboards/querying/#select-your-visualization
[6]: /dashboards/querying/#create-a-title
[7]: /service_management/incident_management/incident_settings#property-fields
[8]: /dashboards/widgets/timeseries/
[9]: https://app.datadoghq.com/notebook/template/11/incident-report
[10]: /notebooks/#share-notebooks