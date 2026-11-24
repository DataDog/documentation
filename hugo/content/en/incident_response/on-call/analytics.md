---
title: On-Call Analytics
further_reading:
- link: '/incident_response/on-call/'
  tag: 'Documentation'
  text: 'Datadog On-Call'
- link: '/incident_response/on-call/pages/'
  tag: 'Documentation'
  text: 'Pages'
- link: '/incident_response/on-call/escalation_policies/'
  tag: 'Documentation'
  text: 'Escalation Policies'
- link: '/incident_response/on-call/notification_preferences/'
  tag: 'Documentation'
  text: 'Notification Preferences'
---

## Overview

On-Call Analytics shows how paging affects your teams and responders. Use it to find noisy services and monitors, measure how long responders take to acknowledge and resolve pages, and see when people are interrupted during the day.

To open On-Call Analytics, go to [{{< ui >}}On-Call{{< /ui >}} > {{< ui >}}Analytics{{< /ui >}}][1]. The page has two tabs:

- [{{< ui >}}Page Review{{< /ui >}}](#page-review): Prebuilt widgets that summarize paging activity for your organization or for selected teams.
- [{{< ui >}}Explorer{{< /ui >}}](#explorer): A query interface for searching, visualizing, and exporting individual On-Call events.

## Page Review

{{< img src="incident_response/on-call/analytics/on-call-analytics-page-review.png" alt="The Page Review tab for all teams over the past week, showing Total Pages, MTTA, and MTTR in the On-Call Overview section." style="width:100%;" >}}

The {{< ui >}}Page Review{{< /ui >}} tab is a set of prebuilt widgets that summarize paging activity. It answers common questions about your on-call experience, such as which teams are paged most often and whether pages are acknowledged on time.

Use the {{< ui >}}Team{{< /ui >}} filter to review one or more teams, or leave it on {{< ui >}}All teams{{< /ui >}} to review the whole organization, and select a time range. The {{< ui >}}Total Pages{{< /ui >}}, {{< ui >}}Mean Time to Acknowledge (MTTA){{< /ui >}}, and {{< ui >}}Mean Time to Resolve (MTTR){{< /ui >}} metrics are each compared to the previous period. Click {{< ui >}}View Pages{{< /ui >}} on a metric to see the pages behind it.

Use {{< ui >}}Page Review{{< /ui >}} to:

- **Measure response times**: Track MTTA and MTTR over time, and review escalations and pages that auto-resolved without being acknowledged.
- **Find noisy alerts**: Identify the services and monitors that page most often. A high number of auto-resolved pages, or a single monitor that generates most pages, often points to alerts you can tune.
- **Compare paging load**: See which teams and responders receive the most pages, and how pages break down by source, target, and urgency. Team rankings appear only when no team filter is applied.
- **Spot interruptions outside working hours**: Review a heatmap of high-urgency notifications by day and hour, in each responder's local time zone.

## Explorer

The {{< ui >}}Explorer{{< /ui >}} tab lets you query On-Call events and build your own visualizations. Select an event type from the {{< ui >}}Type{{< /ui >}} dropdown:

| Category | Event types |
|----------|-------------|
| {{< ui >}}Page Events{{< /ui >}} | {{< ui >}}Created{{< /ui >}}, {{< ui >}}Acknowledged{{< /ui >}}, {{< ui >}}Acknowledgement Timeout{{< /ui >}}, {{< ui >}}Escalated{{< /ui >}}, {{< ui >}}Re-assigned{{< /ui >}}, {{< ui >}}Resolved{{< /ui >}}, {{< ui >}}On Hold{{< /ui >}}, {{< ui >}}Released{{< /ui >}} |
| {{< ui >}}Others{{< /ui >}} | {{< ui >}}Notification Sent{{< /ui >}}, {{< ui >}}Shift Change{{< /ui >}} |

The columns and facets in the {{< ui >}}Explorer{{< /ui >}} change based on the event type. For example, {{< ui >}}Acknowledged{{< /ui >}} events include the user who acknowledged the page, the page duration, and the time to first acknowledgment.

Filter events with a query, such as `page.target.team_handle:<TEAM_HANDLE>`, or with the facets panel, and select a time range. Under {{< ui >}}Visualize as{{< /ui >}}, display the results as a list, timeseries, top list, bar chart, or table. Click an event in the list view to see all of its attributes.

{{< img src="incident_response/on-call/analytics/on-call-analytics-explorer.png" alt="The Explorer tab showing Acknowledged events for one team as a top list, grouped by the name of the user who acknowledged each page." style="width:100%;" >}}

For example, to see which responders acknowledge a team's pages and how long they take:

1. From the {{< ui >}}Type{{< /ui >}} dropdown, select {{< ui >}}Acknowledged{{< /ui >}}.
2. Enter `page.target.team_handle:<TEAM_HANDLE>` in the search bar.
3. Under {{< ui >}}Visualize as{{< /ui >}}, select {{< ui >}}Top List{{< /ui >}}.
4. In the {{< ui >}}by{{< /ui >}} field, select {{< ui >}}Page Acknowledged by User Name{{< /ui >}}.
5. To compare response times, replace {{< ui >}}All Events{{< /ui >}} with {{< ui >}}Time to 1st Acknowledge{{< /ui >}} and change {{< ui >}}Count of{{< /ui >}} to {{< ui >}}Avg of{{< /ui >}}.

To export events, select {{< ui >}}List{{< /ui >}} or {{< ui >}}Table{{< /ui >}} under {{< ui >}}Visualize as{{< /ui >}} and click {{< ui >}}Download as CSV{{< /ui >}}. To reuse a visualization elsewhere, click {{< ui >}}Save to Dashboards{{< /ui >}}, or click {{< ui >}}More...{{< /ui >}} and select {{< ui >}}Save to Notebook{{< /ui >}}. The {{< ui >}}List{{< /ui >}} visualization cannot be saved to a dashboard or notebook.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/on-call/analytics
