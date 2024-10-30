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
- link: "/monitors/status/graphs"
  tag: "Documentation"
  text: "Learn more about monitor graphs"
- link: "/monitors/status/events"
  tag: "Documentation"
  text: "Learn more about event details"
---

<div class="alert alert-warning">The provisional status page has limited support for monitors and their features. For more details, see <a href="#restrictions-of-provisional-status-page">Restrictions of provisional status page</a>.<br><br>If you are using the legacy status page, see the <a href="/monitors/status/status_legacy">Status Page (Legacy)</a> documentation</div>

## Overview

When a monitor alerts, the first place to start your investigation is the Monitor Status page. This page displays the graphs and related events to show you why your monitor is in an alert status, so you can understand what is happening around a monitor alert. Further, you can access quick actions to help you move the investigation towards resolution. Use the monitor status page to:

- Review all the context you need to start an investigation
- Investigate the possible cause of an alert
- Take action to escalate, maintain, or resolve your investigation

## Header

{{< img src="/monitors/status/status_page_header.png" alt="Monitor status page header" style="width:100%;" >}}

The header contains the monitor's metadata including:- Alert status
- Monitor status
- Monitor type
- Creation date
- Author
- Associated teams (if available)
- Tags
- Monitor quality actions

On the right, you'll find the **Edit**, **Clone**, **Export**, and **Permissions** buttons.

From the header, you can resolve the monitor (resolving all groups in alerts) and manage downtimes. For more information, see [Resolve an alert](#resolve-an-alert). 

Additionally, you can view downtimes impacting this monitor and create new ones to mute notifications.

## View monitor evaluations through graphs

 {{< img src="/monitors/status/view_monitor_evaluations_graphs.png" alt="Example monitor evaluation graph, filtered by the prod account template variable." style="width:100%;" >}}

You can troubleshoot monitor alerts by viewing your data through graphs. Toggle between the **Evaluated Data**, **Source Data**, and **In Groups** graphs to investigate which groups are causing the alert. The graphing component also contains details on the monitor query, configured monitor evaluation, and notification information. To learn more about each graph, see the [Monitor status graphs][1] documentation.

Use the template variables to scope down the monitor page to specific groups, select the attributes you want to filter by. 

## View monitor events details

{{< img src="/monitors/status/status_page_event_details.png" alt="Example monitor status event details" style="width:100%;" >}}

You can explore different product areas while maintaining the same alerting context, ensuring you view the same timeframe and service parameters as on your monitor's status page. Use Event details to troubleshoot if the monitor is alerting due to recent configuration changes, take the query to other product areas to troubleshoot and cross reference without losing context. 

For more information, see the [Monitor status events][2] documentation.

### Resolve an alert

You can resolve a monitor alert from the Header or the Next Actions sections in the Event details. Resolving from the Header sets the entire monitor to 'OK' (all groups), while resolving from Next Actions only affects the group related to the selected event.

From Next Actions, click the **Resolve** button to temporarily set the monitor status to 'OK' for its next evaluation. This does not acknowledge the alert or instruct Datadog to ignore it. Use Resolve when data is reported intermittently, such as when a monitor triggers an alert but stops receiving data, preventing it from recovering to 'OK' on its own. The 'resolve' function or the 'Automatically resolve monitor after X hours' option resets the monitor to 'OK'. 

A typical use case is for monitors based on error metrics that only report when errors occur, like `aws.elb.httpcode_elb_5xx` or specific DogStatsD counters reporting errors only when an error exists.

## Restrictions of provisional status page 

### Limited support for monitor types

The following monitor types are not supported by the provisional status page:

- Event  
- Metrics  
- Log

### Limited support for monitor features

The following features are not supported by the provisional status page:

- Custom schedules  
- Notification grouping


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/status/graphs
[2]: /monitors/status/events
[3]: /monitors/downtimes/?tab=bymonitorname
[4]: /service_management/incident_management/
[5]: /service_management/case_management/
[6]: /service_management/workflows/trigger/#trigger-a-workflow-from-a-monitor
[7]: /coscreen/?tab=desktop
