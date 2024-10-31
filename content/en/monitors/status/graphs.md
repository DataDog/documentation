---
title: Status Graphs
further_reading:
- link: "monitors/configuration/?tab=thresholdalert"
  tag: "Documentation"
  text: "Monitor configuration"
- link: "monitors/configuration/?tab=thresholdalert/#group-retention-time"
  tag: "Documentation"
  text: "Group retention time"
- link: "monitors/configuration/?tab=thresholdalert/#set-alert-conditions"
  tag: "Documentation"
  text: "Set alert conditions"
---

<div class="alert alert-info">Status Graphs is part of the <a href="/monitors/status/status_page">provisional Monitor Status Page</a>. If you are using the legacy status page, see the <a href="/monitors/status/status_legacy">Status Page (Legacy)</a> documentation.</div>

## Overview

The graphs on the monitor status page provide insights into the single monitor evaluations. These graphs help you to understand why your monitor might be in an ALERT state and where to focus your troubleshooting efforts.

## Monitor metadata

{{< img src="/monitors/status/graphs/graph_metadata_1.png" alt="Monitor metadata section on the right side of the status page." style="width:100%;" >}}

The right panel of the graph section of the monitor status page provides a high level overview of your monitor including

|  | Description |
| ---- | ---- |
| Groups  | Count of groups per status (Alert, Warn, No Data, Ok)  |
| Visualize as | Graph selector to toggle between the Evaluated Data, Source Data, and Transition graphs. |
| Query | The raw monitor query. A link to the Metrics explorer is also available\*. |
| Evaluation | The aggregation method applied to the Query with the evaluation window. |
| Notification count | Count of notifications sent from this monitor. |

[**UPDATE**]
\* The link to the Metrics Explorer is available only for Metrics, Event, Logs, … monitors.

## Filter the page by groups or status

Depending on the query, the monitor might have multiple groups. To focus on a specific group, use the filter dropdowns to select the desired group.

{{< img src="/monitors/status/view_monitor_evaluations_graphs_1.png" alt="Example monitor status page filtered by a template variable" style="width:100%;" >}}

You can chose to scope the page on:

Group status
: Only groups that are currently in the selected state will be shown

Muted state
: Only groups that are muted, or not, will be shown.

Group tags
: Only groups that have the selected tag will be shown.

## Evaluated data graph

The evaluated data visualization is specific to the monitor and shows individual values compared to the threshold, aggregated from the query's data points. For example, if the monitor evaluates the average over the last 5 minutes, each datapoint represents the metric's average value for that period.

It matches your monitor's configuration to show the monitor's historicl and current status using evaluations settings. The graphs show the status by group. 

{{< img src="/monitors/status/graphs/evaluated_data_ui_features.mp4" alt="Walkthrough of Evaluated data UI features including event details and filter to group" video=true >}}

To view details on status changes (such as a change from `WARN` to `ALERT`), click the alert event on the graph and check the Event Details section for more information.

To filter the view for an individual group, hover over the group title and click **Filter to Group** in the tooltip.

{{< img src="/monitors/status/graphs/current_status_dot.png" alt="Evaluated data graph showing an OK graph with a WARN dot to show the current status is in WARN" style="width:100%;" >}}

When investigating past status changes, the color dot next to the group title indicates the group's current status.

## Source data graph

{{< img src="/monitors/status/source_data_graph_1.png" alt="Status page displaying the source data graph" style="width:100%;" >}}

The source graph shows the raw data points submitted to Datadog, used to generate the monitor evaluations. Use this graph to view unaltered data over time and confirm if data fluctuations or anomalies trigger alerts.

Use this graph to identify any discrepancies between raw data and expected metrics, which may indicate data collection or submission issues affecting the monitor's status.

### Restrictions of source data graph

The following monitor types are not supported by the provisional status page:

* \[**TODO**\] Add list of monitor types not supported

## Transitions

The Transitions graph displays your monitor's state transitions over time, broken out by group. It shows which groups are triggering the alert.

### Non reporting

{{< img src="/monitors/status/graphs/non_reporting_transitions_1.png" alt="Transisions graph showing non reporting data" style="width:100%;" >}}

Datadog keeps monitor groups in the UI for 24 hours unless configured differently. For more information, see [Group Retention time][1]. A dotted line in the graph can indicate: 

* A new group evaluated after monitor creation, shown as a dotted line from the start of the time period to when first evaluated.  
* A group stops reporting, then starts again, with a dotted line appearing from when it dropped out to when reporting resumes.

**Note**: This is different from a "no data" status. Host monitors and service checks set to notify on missing data are available for 48 hours.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/configuration/?tab=thresholdalert#group-retention-time
