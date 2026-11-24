---
title: Investigate Relevant Changes
description: "Find the changes most likely to explain a regression on dashboards, monitor status pages, service pages, and the RUM Explorer, or search for them with Semantic Search, widgets, and Bits AI."
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

Changes appear on the pages where you already investigate: dashboards, monitor status pages, service pages, and the RUM Explorer. You can also search for changes by symptom, build your own view of change data with Change Tracking widgets, or ask Bits AI. For details on specific types of supported changes and setup requirements, see [Tracked Change Types][1].

## Find relevant changes where you're working

On dashboards and monitor status pages, Datadog ranks changes by likely cause, so that the changes most likely to explain what you are seeing appear first. When only a few changes are likely to be faulty, a banner calls them out. See [Faulty change banners](#faulty-change-banners).

| Where | What you see | Requirements |
| --- | --- | --- |
| [Dashboards][2] | A change timeline above the dashboard and change overlays on timeseries widgets. | At least one timeseries widget. For APM deployments, an `env` must be set. See [Change Overlays][3]. |
| [Monitor status pages][4] | A change timeline at the top of the page, aligned with the alert's event graphs. | The service must be named in the monitor query, selected as part of a group, or added as a `service` tag on the monitor. |
| [Service pages][5] | A changes timeline in the {{< ui >}}Service Summary{{< /ui >}} section, for the service alone or for the service and its dependencies. | — |
| [RUM Explorer][6] | Change markers at the top of RUM Explorer graphs (for example, when you group by errors), for correlating frontend regressions with frontend deployments and feature flag changes. | [RUM deployment tracking][7], and [RUM feature flag tracking][8] for flag changes. |

### On a dashboard

1. Navigate to your dashboard.
1. If change overlays aren't already on, click {{< ui >}}Show Overlays{{< /ui >}} at the top of the page.
1. By default, overlays use {{< ui >}}Automatic{{< /ui >}} mode, which shows the changes relevant to each widget's filters.
1. To choose the changes yourself, switch to {{< ui >}}Manual{{< /ui >}}. Then select a change type and filters, such as {{< ui >}}Service{{< /ui >}} and {{< ui >}}Environment{{< /ui >}}. The service that Datadog detects from your dashboard is marked {{< ui >}}MOST RELEVANT{{< /ui >}}.
1. Hover over a change indicator or overlay for a summary, or click it to open the side panel.

### On a monitor status page

1. Go to the monitor status page for the monitor you are investigating.
1. Find the change timeline at the top of the page. If the timeline is collapsed, expand it.
1. For monitors with multiple graphs, filter to an individual group first.
1. Read the timeline together with the event graphs to line up changes with the alert.
1. Click a change indicator to open the side panel.

### On a service page

1. Go to the service page for the service you are investigating.
1. Find the changes timeline in the {{< ui >}}Service Summary{{< /ui >}} section.
1. Switch between {{< ui >}}Changes by Service{{< /ui >}} for changes to that service alone and {{< ui >}}Changes by Service + Dependencies{{< /ui >}} for changes to services it depends on.
1. Click a change indicator to open the side panel.

### On the RUM Explorer

1. Go to the [RUM Explorer][6].
1. Visualize your RUM data as a timeseries, for example by grouping by errors.
1. Find the change markers at the top of the graph. Each marker represents a frontend deployment or feature flag change.
1. Hover over a marker for a summary, or click it to open the side panel.

### Faulty change banners

On dashboards and monitor status pages, Datadog displays a banner when a small number of changes are likely causing the behavior you are looking at, such as an increase in errors. These changes are identified by [Watchdog Faulty Deployment Detection][9], which flags deployments that are likely causes of a symptom like an increased error rate.

1. Find the faulty change banner at the top of the change timeline.
1. Open the banner to see the changes Datadog flagged and the impact of each one.
1. Click a change to open the side panel and investigate it.

## Open the change side panel

Click a change on a timeline, an overlay, or a widget to open the Change Tracking side panel.

From the side panel, you can investigate more details about the change and take the following actions:

- Open the deployment in your CI/CD system.
- View the latest commits in your repository.
- Compare two deployments to see what differs between them.

### Read the Change Analysis

Change Analysis is an AI-generated summary in the change side panel that describes what a change did. It goes beyond noting that a new version deployed, and summarizes what moved in the code behind it.

Change Analysis is available for feature flag changes and deployments. It summarizes what was updated and lists the resources the change affected.

- **Feature flags**: Change Analysis uses your source code when [Source Code Integration][10] is set up. Without it, Change Analysis uses the flag name and other flag metadata.
- **Deployments**: Change Analysis is generated from your source code and requires [Source Code Integration][10]. Without it, the side panel shows the change and its metadata, but not the analysis.

To get the most from Change Analysis, set up [Source Code Integration][10] for the services and repositories behind your changes.

## Search for changes you can't see

### Search by symptom with Semantic Search

{{< callout url="https://www.datadoghq.com/product-preview/semantic-search-changes/" btn_hidden="false" header="Join the Preview!" >}}
Semantic Search for changes is in Preview. Click <strong>Request Access</strong> and complete the form to request access.
{{< /callout >}}

Semantic Search lets you describe the problem in your own words. For example, you can enter "my payment service is down, what change might have caused it?" and Semantic Search returns the most plausible match, instead of requiring you to know which service or change type to filter on.

### Explore changes with Change Explorer

{{< callout url="https://www.datadoghq.com/product-preview/change-explorer/" btn_hidden="false" header="Join the Preview!" >}}
Change Explorer is in Preview. Click <strong>Request Access</strong> and complete the form to request access.
{{< /callout >}}

Use Change Explorer to search for changes outside of the change timeline on the page you're viewing.

### Build your own view with Change Tracking widgets

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

## Ask Bits AI

You can ask Bits AI what changed, in the same natural language you would use with a teammate:

- "What changed on the payments service in the last hour?"
- "Were there any deployments before this alert fired?"

Bits AI reads the same change data as the timelines, so anything Change Tracking collects for a service is available to ask about.

### Changes from your own AI tools

The [Datadog MCP Server][11] exposes change data to external AI clients, so you can ask the same questions from your editor or agent instead of from Datadog.

- `get_change_stories` retrieves change events for an APM service over a time range, optionally filtered by environment, tags, or change type.
- `semantic_search_change_stories` runs the Semantic Search described above, and is subject to the same Preview access.

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
[10]: /source_code/
[11]: /mcp_server/
