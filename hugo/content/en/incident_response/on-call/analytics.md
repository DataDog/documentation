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

To open On-Call Analytics, go to [**On-Call > Analytics**][1]. The page has two tabs:

- [**Page Review**](#page-review): Prebuilt widgets that summarize paging activity for your organization or for selected teams.
- [**Explorer**](#explorer): A query interface for searching, visualizing, and exporting individual On-Call events.

## Page Review

{{< img src="incident_response/on-call/analytics/on-call-analytics-page-review.png" alt="The Page Review tab for all teams over the past week, showing Total Pages, MTTA, and MTTR in the On-Call Overview section" style="width:100%;" >}}

The **Page Review** tab is a prebuilt dashboard of paging activity. It answers common questions about your on-call experience, such as which teams are paged most often and whether pages are acknowledged on time. Filter by one or more teams, or leave it on **All teams** to review the whole organization, and select a time range. Headline metrics (total pages, MTTA, and MTTR) are compared to the previous period. Click **View Pages** to see the pages behind each one.

Use Page Review to:

- **Measure response times**: Track MTTA and MTTR over time, and review escalations and pages that auto-resolved without being acknowledged.
- **Find noisy alerts**: Identify the services and monitors that page most often. A high number of auto-resolved pages, or a single monitor that generates most pages, often points to alerts you can tune.
- **Compare paging load**: See which teams and responders receive the most pages, and how pages break down by source, target, and urgency.
- **Spot interruptions outside working hours**: A heatmap shows high-urgency notifications by day and hour in each responder's local time zone.

**Note**: The **Most Paged Teams** widget appears only when no team filter is applied.

## Explorer

The **Explorer** tab lets you query On-Call events and build your own visualizations. Select an event type from the **Type** dropdown:

| Category | Event types |
|----------|-------------|
| **Page events** | Created, Acknowledged, Acknowledgement Timeout, Escalated, Re-assigned, Resolved, On Hold, Released |
| **Others** | Notification Sent, Shift Change |

The columns and facets in the Explorer change based on the event type. For example, **Acknowledged** events include the user who acknowledged the page, the page duration, and the time to first acknowledgment.

Filter events with a query such as `page.target.team_handle:<TEAM_HANDLE>` or with the facets panel, then display the results as a list, timeseries, top list, bar chart, or table. Click an event in the list view to see all of its attributes.

{{< img src="incident_response/on-call/analytics/on-call-analytics-explorer.png" alt="The Explorer tab showing Acknowledged events for one team as a top list, grouped by the name of the user who acknowledged each page" style="width:100%;" >}}

For example, to see which responders acknowledge a team's pages and how long they take:

1. From the **Type** dropdown, select **Acknowledged**.
2. Enter `page.target.team_handle:<TEAM_HANDLE>` in the search bar.
3. Under **Visualize as**, select **Top List**.
4. In the **by** field, select **Page Acknowledged by User Name**.
5. To compare response times, replace **All Events** with the **Time to 1st Acknowledge** and change **Count of** to an average.

To export events, visualize as a List or Table and click **Download as CSV**. To reuse a visualization elsewhere, click **Save to Dashboards**, or click **More...** and select **Save to Notebook**. Saving to a dashboard or notebook isn't available for the list view.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/on-call/analytics
