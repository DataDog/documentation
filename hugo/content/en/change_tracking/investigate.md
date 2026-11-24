---
title: Investigate Relevant Changes
description: "Find the changes most likely to explain a regression on dashboards, monitor status pages, and service pages, or query change data with widgets."
further_reading:
- link: "/change_tracking/change_types/"
  tag: "Documentation"
  text: "Tracked Change Types"
- link: "/dashboards/change_overlays/"
  tag: "Documentation"
  text: "Change Overlays"
- link: "/monitors/status/"
  tag: "Documentation"
  text: "Monitor Status Page"
---

## Overview

Changes appear on the pages where you already investigate: dashboards, monitor status pages, and service pages. You can also build your own view of change data with Change Tracking widgets. For details on specific types of supported changes and setup requirements, see [Tracked Change Types][1].

## Find relevant changes where you're working

On dashboards and monitor status pages, Datadog ranks changes by likely cause, so that the changes most likely to explain what you are seeing appear first.

| Where | What you see | Requirements |
| --- | --- | --- |
| [Dashboards][2] | A change timeline above the dashboard and change overlays on timeseries widgets. | At least one timeseries widget. For APM deployments, an `env` must be set. See [Change Overlays][3]. |
| [Monitor status pages][4] | A change timeline at the top of the page, aligned with the alert's event graphs. | The service must be named in the monitor query, selected as part of a group, or added as a `service` tag on the monitor. |
| [Service pages][5] | A changes timeline in the {{< ui >}}Service Summary{{< /ui >}} section, for the service alone or for the service and its dependencies. | — |

### On a dashboard

<!-- TODO: Recapture screenshot with the current dashboard overlays UI. -->
<!-- TODO: Confirm with product that the Automatic and Manual overlay controls are GA, and whether the dashboard Investigate popover (anomaly cards with a "Relevant changes" section) is GA. If it is, document it here. -->
{{< img src="/change_tracking/change-tracking-dashboard-show-overlays-active-2.png" alt="Change Tracking displayed on the Dashboard" style="width:100%;" >}}

1. Navigate to your dashboard.
1. If change overlays aren't already on, click {{< ui >}}Show Overlays{{< /ui >}} at the top of the page.
1. By default, overlays use {{< ui >}}Automatic{{< /ui >}} mode, which shows the changes relevant to each widget's filters.
1. To choose the changes yourself, switch to {{< ui >}}Manual{{< /ui >}}. Then select a change type and filters, such as {{< ui >}}Service{{< /ui >}} and {{< ui >}}Environment{{< /ui >}}. The service that Datadog detects from your dashboard is marked {{< ui >}}MOST RELEVANT{{< /ui >}}.
1. Hover over a change indicator or overlay for a summary, or click it to open the side panel.

### On a monitor status page

<!-- TODO: Recapture screenshot of the current monitor change timeline. -->
{{< img src="/change_tracking/change-tracking-monitor-status-page-2.png" alt="Change Tracking displayed on the Monitor Status Page" style="width:100%;" >}}

1. Go to the monitor status page for the monitor you are investigating.
1. Find the change timeline at the top of the page. If the timeline is collapsed, expand it.
1. For monitors with multiple graphs, filter to an individual group first.
1. Read the timeline together with the event graphs to line up changes with the alert.
1. Click a change indicator to open the side panel.

### On a service page

{{< img src="/change_tracking/change-tracking-service-page-2.png" alt="Recent Changes component within the Service Summary section with dependency changes shown" style="width:100%;" >}}

1. Go to the service page for the service you are investigating.
1. Find the changes timeline in the {{< ui >}}Service Summary{{< /ui >}} section.
1. Switch between {{< ui >}}Changes by Service{{< /ui >}} for changes to that service alone and {{< ui >}}Changes by Service + Dependencies{{< /ui >}} for changes to services it depends on.
1. Click a change indicator to open the side panel.

## Open the change side panel

<!-- TODO: Add screenshot of the change side panel. -->

Click a change on a timeline, an overlay, or a widget to open the Change Tracking side panel.

From the side panel, you can investigate more details about the change and take the following actions:

- Open the deployment in your CI/CD system.
- View the latest commits in your repository.
- Compare two deployments to see what differs between them.

## Search for changes you can't see

Change Tracking is available as a data source for widgets across Datadog, including dashboards and notebooks.

{{< img src="/change_tracking/change-tracking-datasource-examples.png" alt="Change Tracking datasource examples" style="width:100%;" >}}

1. In a dashboard or notebook, add or edit a supported widget type: Timeseries, Query Value, Table, Tree Map, Top List, Pie, Change, or Bar Chart.
1. From the {{< ui >}}data source{{< /ui >}} dropdown, select {{< ui >}}Change Tracking{{< /ui >}}.
1. Configure your filters. {{< ui >}}Service{{< /ui >}} is required.
1. (Optional) For widgets that support grouping, use {{< ui >}}Group by{{< /ui >}} to split results.

{{< img src="/change_tracking/change-tracking-datasource-edit-widget.png" alt="Change Tracking datasource widgets" style="width:100%;" >}}

For timeseries widgets, you can also enable Change Tracking as an {{< ui >}}Event Overlay{{< /ui >}} to draw changes on top of the series.

{{< img src="/change_tracking/change-tracking-datasource-edit-overlay.png" alt="Change Tracking datasource as Event Overlay" style="width:100%;" >}}

To open the side panel from a widget, click a datapoint and select {{< ui >}}View Changes{{< /ui >}}.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /change_tracking/change_types/
[2]: /dashboards/
[3]: /dashboards/change_overlays/
[4]: /monitors/status/
[5]: /tracing/services/service_page/
