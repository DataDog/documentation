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

{{< img src="incident_response/on-call/analytics/page-review.png" alt="The Page Review tab for all teams, showing Total Pages, MTTA, and MTTR above the Most Paged Teams widget" style="width:100%;" >}}

The **Page Review** tab answers common questions about your on-call experience, such as which teams are paged most often and whether pages are acknowledged on time. Use the **Team** filter to review one or more teams, or leave it on **All teams** to review the whole organization, and select a time range, such as **Past 1 Week**.

### On-Call Overview

The **On-Call Overview** section shows **Total Pages**, **Mean Time to Acknowledge (MTTA)**, and **Mean Time to Resolve (MTTR)**, each compared to the previous period. Click **View Pages** on a metric to see the pages behind it.

### Organization Overview

The **Organization Overview** section shows where pages go. When no team filter is applied, **Most Paged Teams** shows the teams that receive the most pages. **Page Targets** breaks pages down by target type, and **Page Volume** shows the number of pages over time by urgency.

### Pages Overview

The **Pages Overview** section describes the pages themselves. **Most Paged Users** lists the responders who receive the most pages, **Page Sources** shows what triggered them, such as monitors or Incident Management, and **Page Urgencies** shows the split between high-urgency and low-urgency pages. **Longest Running Active Pages** lists pages that are still open, with their urgency, service, status, team, and assignee.

### Paging Health

The **Paging Health** section helps you assess whether your paging response works as intended. It shows **Page Escalations** by escalation type, pages that were **re-assigned** from or to the selected teams, and pages that were **not acknowledged and auto-resolved**. **Frequently Paging Services** and **Frequently Paging Monitors** list the sources that generate the most pages. A high number of auto-resolved pages, or a single monitor that generates most of them, often points to alerts that you can tune to reduce noise.

### Notifications Overview

The **Notifications Overview** section shows when, how, and how often team members were notified. Two timeseries show notifications sent for high-urgency and low-urgency pages, broken down by channel, such as email or push. A heatmap shows high-urgency notifications by day of the week and hour of the day, in each user's local time zone, so you can identify patterns in how people are interrupted, including outside working hours.

## Explorer

The **Explorer** tab lets you query On-Call events directly and build your own visualizations.

### Select an event type

Use the **Type** dropdown to select the event type to query:

| Category | Event types |
|----------|-------------|
| **Page events** | Created, Acknowledged, Acknowledgement Timeout, Escalated, Re-assigned, Resolved, On Hold, Released |
| **Others** | Notification Sent, Shift Change |

The columns and facets in the Explorer change based on the event type. For example, **Acknowledged** events include the user who acknowledged the page, the page duration, and the time to first acknowledgement.

### Search and filter events

1. Enter a query in the search bar, for example `page.target.team_handle:<TEAM_HANDLE>`.
2. Use the facets panel on the left to filter by attributes such as **Source**, **Service**, or reassignment details.
3. Select a time range in the top-right corner.

### Visualize events

Under **Visualize as**, select how to display the results:

- **List**: Individual events. Click an event to open a side panel with all of its attributes, including the page key, status, responders, target team, and tags.
- **Timeseries**: Event counts over time.
- **Top List**: The top values for an attribute.
- **Bar Chart**: Event counts as bars.
- **Table**: Aggregated values grouped by one or more attributes.

To export the results of your query, click **Download as CSV**.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/on-call/analytics
