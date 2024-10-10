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
- link: "/monitors/"
  tag: "Documentation"
  text: "Create monitors"
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Monitor Notifications"
- link: "/monitors/manage/"
  tag: "Documentation"
  text: "Manage monitors"
---

## Overview

When a monitor alerts, the first place to start your investigation is the Monitor Status page. This page displays the graphs and related events to show you why your monitor is in an alert status, so you can understand what is happening around a monitor alert. Further, you can access quick actions to help you move the investigation towards resolution. Use the monitor status page to 
- Review all the context you need to start an investigation
- Investigate the possible cause of an alert
- Take action to escalate, maintain, or resolve your investigation

## Header

Review all the context of your monitor in the header. The header provides metadata available for this monitors including:
- Alert status
- Muted or downtimes
- Monitor type
- Creation date
- Author
- Associated teams
- Tags
- Monitor quality actions

## View monitor evaluations through graphs

You can troubleshoot monitor alerts by viewing your data through graphs. Toggle between the Evaluated Data, Source Data, and In Groups graphs to investigate which groups are causing the alert and compare your evaluated data with alert status overlays. The graphing component also contains details on the monitor query, configured monitor evaluation, and notification information. To learn more about each graph, see the [Monitor status graphs][1] documentation.

Use the template variables to scope down the monitor information to specific groups, select the attributes you want to filter by.

## View related monitor events and resources

You can explore different product areas while maintaining the same alerting context, ensuring you view the same timeframe and service parameters as on your monitor's status page. Use Event details to troubleshoot if the monitor is alerting due to recent configuration changes, take the query to other product areas to troubleshoot and cross reference without losing context.

For more information, see the [Monitor status events][2] documentation.

## Take action to remediate

With Quick Actions, you can take action without leaving the Status page. Responders save time since the context is automatically added.

| Action                | Description                                                                                   |
|-----------------------|-----------------------------------------------------------------------------------------------|
| Mute                  | Create a downtime to mute monitor alerts.                                                     |
| Resolve               | Temporarily set the monitor status to 'OK' for its next evaluation.                           |
| Declare Incident      | Escalate monitor alerts with Incident Management.                                             |
| Create Case           | Create a case if this needs further investigation and you want to correlate the alert to other Datadog products. |
| Run Workflow          | Run Workflow Automation with predefined snippets to run mitigation actions.                   |
| Start a Collaboration | Start CoScreen meeting and collaborate with your team.                                        |

### Resolve

Click the **Resolve** button to temporarily set the monitor status to 'OK' for its next evaluation. This does not acknowledge the alert or instruct Datadog to ignore it. Use Resolve when data is reported intermittently, such as when a monitor triggers an alert but stops receiving data, preventing it from recovering to 'OK' on its own. In such cases, the 'resolve' function or the 'Automatically resolve monitor after X hours' option resets the monitor to 'OK'. 

A typical use case is for monitors based on error metrics that only report when errors occur, like `aws.elb.httpcode_elb_5xx` or specific DogStatsD counters reporting errors only when an error exists.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/status/graphs
[2]: /monitors/status/events