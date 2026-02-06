---
title: Analytics and Reporting
description: Track and analyze aggregated incident management statistics in Dashboards and Notebooks
aliases:
- /monitors/incident_management/analytics
- /service_management/incident_management/analytics/
- /incident_response/incident_management/analytics
further_reading:
- link: "/incident_response/incident_management/setup_and_configuration"
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

{{< img src="incident_response/incident_management/analytics_and_reporting/incident_analytics.mp4" alt="Scroll through the Incident Management Overview dashboard" video=true style="width:100%;">}}

Use Incident Analytics to learn from past incidents and understand the efficiency and performance of your incident response process. Incident analytics allows you to pull aggregated statistics on your incidents over time. You can use these statistics to create reports that help you to:
- Analyze whether your incident response process is improving over time
- Assess your mean time to resolution
- Identify areas of improvement that you should invest in

## Data collected

Incident Management Analytics is a queryable data source for aggregated incident statistics. You can query these analytics in a variety of graph widgets in both Dashboards and Notebooks to analyze the history of your incident response over time. To give you a starting point, Datadog provides the following out-of-the-box resources that you can clone and customize:
- [Incident Management Overview Dashboard template][3]
- [Notebook Incident Report template][4]

### Incident timestamps

Incidents carry three timestamp attributes that influence analytics:

* Declaration time (`declared`): When the incident was declared.
* Detection time (`detected`): When the underlying resource from which the incident was declared was created. For example, if a monitor alert fires at 2 p.m. and the incident is declared at 2:30 p.m., the detected time is 2 p.m. If the incident wasn't declared from another Datadog resource, `detected` is the same as `declared`.
* Resolution time (`resolved`): When the incident was most recently resolved.

### Measures

Incident Management reports the following analytic measures, which you can use to power analytic queries in Dashboard and Notebook widgets:

- `Customer Impact Duration`: The duration during which customers were impacted, based on the impacts defined on the incident.
- `Status Active Duration`: The duration that the incident was in an "active" state, based on the incident timeline.
- `Status Stable Duration`: The duration that the incident was in a "stable" state, based on the incident timeline.
- `Time to Detect`: The duration from the earliest customer impact to the incident's detection time.
- `Time to Repair`: The duration from the incident's detection time to the last customer impact.
- `Time to Resolve`: The duration from the incident's declaration time to the time it was resolved.

In addition to these defaults, you can create new measures by adding custom *Number* property fields in your [Incident Settings][7].

### Timestamp overrides

Incident responders may forget to declare a Datadog incident before starting the response process. They may also forget to resolve an incident in Datadog even after the incident response process effectively ends. These oversights may paint a misleading picture in your incident analytics, permanently inflating your mean time to resolve or other measures.

To address this, organizations can enable **timestamp overrides**, which allow incident responders to manually override an incident's recorded timestamps. When present, overrides affect the following analytic measures:

- `Time to Detect`
- `Time to Repair`
- `Time to Resolve`

Overrides only influence search and analytics. They do not change the history automatically recorded to the incident timeline. They do not apply to the analytic measures `Status Active Duration` or `Status Stable Duration`, which are driven by the cumulative length of status segments on incident timelines.

To enable timestamp overrides, go to [**Incidents** > **Settings** > **Information**][11].

To create, update, or delete timestamp overrides, users must have the **Incidents Write** permission.

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

{{< img src="/incident_response/incident_management/analytics_and_reporting/analytics_graph_configuration.png" alt="Timeseries graph configuration showing Incidents data source filtered by severity, showing the customer impact duration grouped by service" style="width:90%;" >}}

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
[7]: /incident_response/incident_management/setup_and_configuration/property_fields
[8]: /dashboards/widgets/timeseries/
[9]: https://app.datadoghq.com/notebook/template/11/incident-report
[10]: /notebooks/#share-notebooks
[11]: https://app.datadoghq.com/incidents/settings#information