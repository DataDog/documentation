---
title: Investigate Relevant Changes
description: "Find the changes most likely to explain a regression on dashboards, monitor status pages, service pages, and the RUM Explorer, or query change data with widgets."
further_reading:
- link: "/change_tracking/change_types/"
  tag: "Documentation"
  text: "Tracked Change Types"
- link: "/dashboards/change_overlays/"
  tag: "Documentation"
  text: "Change Overlays"
- link: "/watchdog/faulty_deployment_detection/"
  tag: "Documentation"
  text: "Faulty Deployment Detection"
- link: "/monitors/status/"
  tag: "Documentation"
  text: "Monitor Status Page"
---

## Overview

Use Change Tracking as the first step in your investigation:

- **Changes come to you.** On the pages where you already investigate, such as dashboards, monitor status pages, service pages, and the RUM Explorer, Datadog surfaces the changes most likely to be related to what you are looking at.
- **You find the relevant changes.** When the change you need is not on the page in front of you, build your own view of change data.

## Find relevant changes where you're working

When you open a page that is scoped to a service, Datadog surfaces that service's changes alongside your telemetry.

On dashboards and monitor status pages, Datadog ranks changes by relevance, so that the changes most likely to explain what you are seeing appear first. Relevance is based on how close the change is in time to the behavior you are looking at, how strongly it is associated with the service in view, and the type of change. When only a few changes are likely to be faulty, a banner calls them out. See [Faulty change banners](#faulty-change-banners).

You do not need to configure this. Any change type you already send is eligible. See [Tracked Change Types][1].

<!-- TODO: Confirm the UI name of the dashboard triage card (Q5). -->

| Where | What you see | Requirements |
| --- | --- | --- |
| [Dashboards][2] | A change timeline above the dashboard and change overlays on timeseries widgets. The triage card summarizes the changes most relevant to the current view. | At least one timeseries widget. For APM deployments, an `env` must be set. See [Change Overlays][3]. |
| [Monitor status pages][4] | A change timeline at the top of the page, aligned with the alert's event graphs. | The service must be named in the monitor query, selected as part of a group, or added as a `service` tag on the monitor. |
| [Service pages][5] | A changes timeline in the {{< ui >}}Service Summary{{< /ui >}} section, for the service alone or for the service and its dependencies. | APM data for the service. |
| [RUM Explorer][6] | Change markers at the top of RUM Explorer graphs (for example, when you group by errors), for correlating frontend regressions with frontend deployments and feature flag changes. | [RUM deployment tracking][7], and [RUM feature flag tracking][8] for flag changes. |

### On a dashboard

<!-- TODO: Recapture screenshot with the current dashboard overlays UI. -->
{{< img src="/change_tracking/change-tracking-dashboard-show-overlays-active-2.png" alt="Change Tracking displayed on the Dashboard" style="width:100%;" >}}

1. Navigate to your dashboard.
1. Click {{< ui >}}Show Overlays{{< /ui >}} at the top of the page to turn on the change timeline and change overlays on supported widgets.
1. The {{< ui >}}Service{{< /ui >}} search bar defaults to {{< ui >}}Most Relevant{{< /ui >}}, the service referenced most often in the dashboard's queries. Use the search bar to pick a different service.
1. Use the {{< ui >}}Show On{{< /ui >}} dropdown to limit overlays to relevant widgets or show them on every widget.
1. Hover over a change indicator or overlay for a summary, or click it to open the side panel.

### On a monitor status page

<!-- TODO: Recapture screenshot showing the progressive (collapsed by default) timeline. Confirm the expand control label. -->
{{< img src="/change_tracking/change-tracking-monitor-status-page-2.png" alt="Change Tracking displayed on the Monitor Status Page" style="width:100%;" >}}

1. Go to the monitor status page for the monitor you are investigating.
1. Expand the change timeline at the top of the page. The timeline is collapsed by default.
1. For monitors with multiple graphs, filter to an individual group first.
1. Read the timeline together with the event graphs to line up changes with the alert.
1. Click a change indicator to open the side panel.

### On a service page

{{< img src="/change_tracking/change-tracking-service-page-2.png" alt="Recent Changes component within the Service Summary section with dependency changes shown" style="width:100%;" >}}

1. Go to the service page for the service you are investigating.
1. Find the changes timeline in the {{< ui >}}Service Summary{{< /ui >}} section.
1. Switch between {{< ui >}}Changes by Service{{< /ui >}} for changes to that service alone and {{< ui >}}Changes by Service + Dependencies{{< /ui >}} for changes to services it depends on.
1. Click a change indicator to open the side panel.

### On the RUM Explorer

<!-- TODO: Add RUM Explorer screenshot showing change markers. Confirm step labels in the app. -->

1. Go to the [RUM Explorer][6].
1. Visualize your RUM data as a timeseries, for example by grouping by errors.
1. Find the change markers at the top of the graph. Each marker represents a frontend deployment or feature flag change.
1. Hover over a marker for a summary, or click it to open the side panel.

### Faulty change banners

<!-- TODO: Add screenshot of the faulty change banner and the view it opens. Add the faulty-deployment example narrative from product. Confirm the banner's open action label. -->

On dashboards and monitor status pages, Datadog displays a banner when a small number of changes are likely causing the behavior you are looking at, such as an increase in errors. These changes are identified by [Watchdog Faulty Deployment Detection][9], which flags deployments that are likely causes of a symptom like an increased error rate.

1. Find the faulty change banner at the top of the change timeline.
1. Open the banner to see the changes Datadog flagged and the impact of each one.
1. Click a change to open the side panel and investigate it.

## Open the change side panel

<!-- TODO: Add screenshot of the change side panel. -->

Click a change on a timeline, an overlay, or a widget to open the Change Tracking side panel. The panel is where an investigation moves from "something changed" to "here is what changed."

From the side panel, you can:

- See what the change was, when it happened, and which service it belongs to.
- Open the deployment in your CI/CD system.
- View the latest commits in your repository.
- Compare two deployments to see what differs between them.
- Follow custom links that your organization has configured on the deployment side panel.

## Search for changes you can't see

The timelines are scoped to one service and one time window. When your change falls outside that scope, widen the search.

Change Tracking is available as a data source for widgets in dashboards and notebooks, which lets you query change data directly rather than reading it off a timeline.

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
[6]: /real_user_monitoring/explorer/
[7]: /real_user_monitoring/guide/setup-rum-deployment-tracking/
[8]: /real_user_monitoring/feature_flag_tracking/
[9]: /watchdog/faulty_deployment_detection/
