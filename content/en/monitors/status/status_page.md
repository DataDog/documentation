---
title: Monitor Status Page
description: "Get an overview of your monitor status over time"
code_lang: status_page
type: multi-code-lang
weight: 1
aliases:
- /monitors/monitor_status/
- /monitors/manage/status
further_reading:
- link: "/monitors/status/graphs/"
  tag: "Documentation"
  text: "Learn more about monitor graphs"
- link: "/monitors/status/events/"
  tag: "Documentation"
  text: "Learn more about event details"
---

<div class="alert alert-warning">The provisional status page has limited support for monitors and their features. For more details, see <a href="#restrictions-of-provisional-status-page">Restrictions of provisional status page</a>.<br><br>If you are using the legacy status page, see the <a href="/monitors/status/status_legacy">Status Page (Legacy)</a> documentation</div>

## Overview

When a monitor alerts, the first place to start your investigation is the monitor status page. This page displays graphs and events to show you why your monitor is in an alert status, so you can understand what is happening around a monitor alert. Further, you can access quick actions to help you move the investigation towards resolution. Use the monitor status page to:

- Review all the context you need to start an investigation
- Investigate the possible cause of an alert
- Take action to escalate, maintain, or resolve your investigation

## Header

{{< img src="/monitors/status/status_page_header_banner.png" alt="Monitor status page header" style="width:100%;" >}}

The header contains the monitor's metadata, including:
- Monitor status
- Monitor type
- Creation date
- Author
- Associated teams (if available)
- Associated services (if available)
- Tags

On the right, you'll find the **Edit**, **Clone**, **Export**, **Permissions** and **Delete** buttons.

From the header, you can resolve the monitor. Resolving from the header resolves all groups in the alert and sets the monitor status to `OK` (all groups). The `resolve` function temporarily changes the monitor status to `OK` until its next evaluation, but the next evaluation proceeds as normal based on current data. To resolve from the Event details, see [Status Events][1].

{{< img src="/monitors/status/header_downtimes.png" alt="The monitor is not muted, but you can click Not Muted to see options to create a downtimes for this monitor" style="width:100%;" >}}

Additionally, view and manage downtimes impacting this monitor and create new ones to mute notifications.

## View monitor evaluations through graphs

 {{< img src="/monitors/status/evaluated_data_graph_1.png" alt="Example monitor evaluation graph" style="width:100%;" >}}

You can troubleshoot monitor alerts by viewing your data through graphs. Toggle between the **Evaluated Data**, **Source Data**, and **Transitions** graphs to investigate which groups are causing the alert. The graphing component also contains details on the monitor query, configured monitor evaluation, and notification information. To learn more about each graph, see the [Monitor status graphs][2] documentation.

Use the template variables to scope down the monitor page to specific groups, select the attributes you want to filter by.

## View monitor events details

{{< img src="/monitors/status/status_page_event_details.png" alt="Example monitor status event details" style="width:100%;" >}}

You can explore different product areas while maintaining the same alerting context, ensuring you view the same timeframe and service parameters as on your monitor's status page. Use Event details to troubleshoot if the monitor is alerting due to recent configuration changes. You can take the query to other product areas to troubleshoot and cross reference without losing context.

For more information, see the [Monitor status events][3] documentation.

## Restrictions of provisional status page

### Limited support for monitor types

The following monitor types are not supported by the provisional status page:

- Anomaly
- Cloud Cost
- Composite
- Database Monitoring
- Forecast
- Live Process
- Outlier
- Synthetics
- SLO Alerts
- Usage

### Limited support for monitor features

The following features are not supported by the provisional status page:

- Custom schedules
- Notification grouping


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/status/events/#resolve
[2]: /monitors/status/graphs
[3]: /monitors/status/events
