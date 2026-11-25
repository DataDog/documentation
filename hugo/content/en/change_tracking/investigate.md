---
title: Investigate Relevant Changes
description: "Find the changes most likely to explain a regression on dashboards, monitor status pages, service pages, and the RUM Explorer, or search for them with Semantic Search, widgets, and Bits AI."
further_reading:
- link: "https://www.datadoghq.com/blog/ai/investigate-production-alerts/"
  tag: "Blog"
  text: "Teaching a 9B model to investigate production alerts"
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

Change Tracking makes changes available across Datadog products, including dashboards, monitor status pages, service pages, and the RUM Explorer. You can also search for changes by symptom, build your own view of change data with Change Tracking widgets, or ask Bits AI. For details on specific types of supported changes and setup requirements, see [Tracked Change Types][1].

## Investigate changes across Datadog products

Change Tracking is available on several pages in Datadog.

| Where | What you see | Requirements |
| --- | --- | --- |
| [Dashboards][2] | A change timeline above the dashboard and change overlays on timeseries widgets. | At least one timeseries widget. For APM deployments, an `env` must be set. See [Change Overlays][3]. |
| [Monitor status pages][4] | A change timeline at the top of the page, aligned with the alert's event graphs. | The service must be named in the monitor query, selected as part of a group, or added as a `service` tag on the monitor. |
| [Service pages][5] | A changes timeline in the {{< ui >}}Service Summary{{< /ui >}} section, for the service alone or for the service and its dependencies. | An APM service. To see deployments, the service needs a `version` tag. See [Tracked Change Types][1]. |
| [RUM Explorer][6] | Change markers at the top of RUM Explorer graphs (for example, when you group by errors), for correlating frontend regressions with frontend deployments and frontend feature flag changes. | [RUM deployment tracking][7], and [RUM feature flag tracking][8] for flag changes. |

Click a change on any of these pages to open the side panel. For deployments, the side panel includes {{< ui >}}View Deployment in CI/CD{{< /ui >}}, {{< ui >}}View commit{{< /ui >}}, and {{< ui >}}View deployment diff{{< /ui >}}.

### On a dashboard

On dashboards, Datadog can rank changes by likely cause, so that the changes most likely to explain what you are seeing appear first.

{{< img src="/change_tracking/change-tracking-dashboard-overlays.png" alt="A dashboard with change overlays turned on, showing a change timeline for the most relevant service" style="width:100%;" >}}

1. Navigate to your dashboard.
1. If change overlays aren't already on, click {{< ui >}}Show Overlays{{< /ui >}} at the top of the page.
1. By default, overlays use {{< ui >}}Automatic{{< /ui >}} mode, which shows the changes relevant to each widget's filters.
1. To choose the changes yourself, switch to {{< ui >}}Manual{{< /ui >}}. Then select a change type and filters, such as {{< ui >}}Service{{< /ui >}} and {{< ui >}}Environment{{< /ui >}}. The service that Datadog detects from your dashboard is marked {{< ui >}}MOST RELEVANT{{< /ui >}}.
1. Hover over a change indicator or overlay for a summary, or click it to open the side panel.

### On a monitor status page

On monitor status pages, Datadog can rank changes by likely cause, so that the changes most likely to explain the most recent alert appear first.

{{< img src="/change_tracking/change-tracking-monitor-status-timeline.png" alt="A monitor status page with a banner listing changes that could explain the monitor's behavior above the change timeline" style="width:100%;" >}}

1. Go to the monitor status page for the monitor you are investigating.
1. Find the change timeline at the top of the page. If the timeline is collapsed, expand it.
1. To rank changes by likely cause, select {{< ui >}}Relevant Changes{{< /ui >}}.
1. For monitors with multiple graphs, filter to an individual group first.
1. Read the timeline together with the event graphs to line up changes with the alert.
1. Click a change indicator to open the side panel.

### On a service page

<!-- IMAGE PLACEHOLDER: The changes timeline in the Service Summary section of a service page. -->

1. Go to the service page for the service you are investigating.
1. Find the changes timeline in the {{< ui >}}Service Summary{{< /ui >}} section.
1. Switch between {{< ui >}}Changes by Service{{< /ui >}} for changes to that service alone and {{< ui >}}Changes by Service + Dependencies{{< /ui >}} for changes to services it depends on.
1. Click a change indicator to open the side panel.

### On the RUM Explorer

{{< img src="/change_tracking/change-tracking-rum-frontend-changes.png" alt="A frontend feature flag change overlaid on dashboard graphs, filtered to a RUM application, view, and environment" style="width:100%;" >}}

1. Go to the [RUM Explorer][6].
1. Visualize your RUM data as a timeseries, for example by grouping by errors.
1. Find the change markers at the top of the graph. Each marker represents a frontend deployment or frontend feature flag change.
1. Click a marker to open the side panel.

### Faulty change banners

<!-- IMAGE PLACEHOLDER: Faulty change banner on a monitor status page, and the view it opens showing the flagged changes and their impact. -->

On dashboards and monitor status pages, Datadog displays a banner when a small number of changes are likely causing the behavior you are looking at, such as an increase in errors. These changes are identified by [Watchdog Faulty Deployment Detection][9], which flags deployments that are likely causes of a symptom like an increased error rate.

For example, the banner might read "Datadog has found a faulty deployment on `<SERVICE_NAME>`."

1. Find the faulty change banner at the top of the change timeline.
1. Open the banner to see the changes Datadog flagged and the impact of each one.
1. Click a change to open the side panel and investigate it.

## Understand a change with Change Analysis

Change Analysis is an AI-generated summary in the change side panel that describes what a change did.

Change Analysis is available for feature flag changes and deployments. It summarizes what was updated and lists the resources the change affected.

- **Feature flags**: Change Analysis uses your source code when [Source Code Integration][10] is set up. Without it, Change Analysis uses the flag name and other flag metadata.
- **Deployments**: Change Analysis is generated from your source code and requires [Source Code Integration][10]. Without it, Change Analysis isn't available for deployments.

To get the most from Change Analysis, set up [Source Code Integration][10] for the services and repositories behind your changes.

## Search for changes with Change Explorer

{{< callout url="https://www.datadoghq.com/product-preview/change-explorer/" btn_hidden="false" header="Join the Preview!" >}}
Change Explorer is in Preview. Click <strong>Request Access</strong> and complete the form to request access.
{{< /callout >}}

Use Change Explorer to search for changes outside of the change timeline on the page you're viewing.

{{< callout url="https://www.datadoghq.com/product-preview/semantic-search-changes/" btn_hidden="false" header="Join the Preview!" >}}
Semantic Search for changes is in Preview. Click <strong>Request Access</strong> and complete the form to request access.
{{< /callout >}}

With Semantic Search, you can search for changes by describing a change or its impact in natural language. Semantic Search is available for feature flag and deployment changes.

1. In Change Explorer, set {{< ui >}}Search mode{{< /ui >}} to {{< ui >}}Semantic Search{{< /ui >}}.
1. Describe the change or its impact. For example, "Users can't complete checkout because the Submit button is gone."

## Build your own view with Change Tracking widgets

<!-- IMAGE PLACEHOLDER: A widget that uses Change Tracking as its data source. -->

Change Tracking is available as a data source for widgets across Datadog, including dashboards and notebooks.

1. In a dashboard or notebook, add or edit a supported widget type: Timeseries, Query Value, Table, Tree Map, Top List, Pie, Change, or Bar Chart.
1. From the {{< ui >}}data source{{< /ui >}} dropdown, select {{< ui >}}Change Tracking{{< /ui >}}.
1. Configure your filters. {{< ui >}}Service{{< /ui >}} is required.
1. (Optional) For widgets that support grouping, use {{< ui >}}Group by{{< /ui >}} to split results.

For timeseries widgets, you can also enable Change Tracking as an {{< ui >}}Event Overlay{{< /ui >}} to draw changes on top of the series.

To open the side panel from a widget, click a datapoint and select {{< ui >}}View changes{{< /ui >}}.

## Ask about changes with AI

You can ask about changes in natural language, from Datadog or from your own AI tools:

- In [Bits Chat][12], ask Bits what changed on a service.
- From an external AI client, such as your editor or an agent, use the [Datadog MCP Server][11] tools:
  - `get_change_stories` retrieves change events for an APM service over a time range, optionally filtered by environment, tags, or change type.
  - `semantic_search_change_stories` runs Semantic Search for changes, and is subject to the same Preview access.

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
[12]: /bits_ai/bits_chat/
