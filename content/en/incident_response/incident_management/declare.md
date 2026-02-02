---
title: Declare an Incident
aliases:
- /service_management/incident_management/declare/
---

## Overview

In the Datadog paradigm, any of the following are appropriate situations for declaring an incident:
- An issue is or may be impacting customers.
- You believe an issue (including an internal one) needs to be addressed as an emergency.
- You don't know if you should call an incident - notify other people and increase severity appropriately.

You can declare an incident from multiple places within the Datadog platform, such as a graph widget on a dashboard, the Incidents UI, or any alert reporting into Datadog.

## Declaration modal

When you declare an incident, a declaration modal appears. This modal has several core elements:

| Incident elements  | Description |
| ------------------ | ----------- |
| Title              | (Required) A descriptive title for the incident. |
| Severity Level     | (Required) By default, severity ranges from SEV-1 (most severe) to SEV-5 (least severe). You can customize the number of severities and their descriptions in Incident Management settings.
| Incident Commander | The person assigned to lead the incident response. |

You can configure [Incident Management Settings][2] to include more fields in the incident declaration modal or require certain fields.


## From the Incident page

In the [Datadog UI][1], click **Declare Incident** to create an incident.

The *Declare Incident* modal displays a collapsible side panel that contains helper text and descriptions for the severities and statuses used by your organization. The helper text and descriptions are customizable in [Incident Settings][2].

## From a monitor

You can declare an incident directly from a monitor from the Actions dropdown. Select **Declare incident** to open an incident creation modal, and the monitor is added into the incident as a signal. You can also add a monitor to an existing incident.

{{< img src="service_management/incidents/declare/declare_monitor.png" alt="Actions dropdown menu on monitors where you can select the Declare incident option" style="width:50%;" >}}

Alternatively, you can have a monitor automatically create an incident when it transitions to a `warn`, `alert`, or `no data` status. To enable this, click **Add Incident** in the **Configure notifications and automations** section of a monitor and select an `@incident-` option. Admins can create `@incident-` options in [Incident Settings][9].

Incidents created from a monitor will inherit [field values][10] from the monitor's tags. To send automated notifications from incidents, add tags to a monitor so that created incidents match the criteria of [notification rules][11].

## From a Security Signal

Declare an incident directly from a Cloud SIEM or Workload Protection signal side panel, by clicking **Declare incident** or **Escalate Investigation**. For more information, see [Investigate Security Signals][3].

Declare an incident from an App and API Protection signal through the actions listed in the signal side panel. Click **Show all actions** and click **Declare Incident**.
For more information, see [Investigate Security Signals][4] for App and API Protection.

{{< img src="/service_management/incidents/declare/declare_asm.png" alt="Your image description" style="width:90%;" >}}

## From a case

Declare an incident from [Case Management][5]. From the individual case detail page, click **Declare incident** to escalate a case to an incident.

{{< img src="service_management/incidents/declare/declare_case_management.png" alt="An example case page highlighting the Declare Incident button at the top of the page" style="width:90%;" >}}

## From a graph
You can declare an incident directly from a graph by clicking the export button on the graph and then clicking **Declare incident**. The incident creation modal appears, and the graph is added to the incident as a signal.

{{< img src="service_management/incidents/from-a-graph.png" alt="Create in incident from a graph" style="width:80%;">}}

## From a Synthetic test

Create incidents directly from a [Synthetic test][8] through the Actions dropdown. Select **Declare incident** to open an incident creation modal, where a summary of the test is added to your incident timeline, allowing you to pursue the investigation from there.

{{< img src="service_management/incidents/declare/synthetics_declare_incident.png" alt="Declare an incident from a Synthetic test." style="width:90%;" >}}

## From the Datadog Clipboard
Use the [Datadog Clipboard][6] to gather multiple monitors and graphs and to generate an incident. To declare an incident from the Clipboard, copy a graph you want to investigate and open the Clipboard with the command `Cmd/Ctrl + Shift + K`. Click **Declare Incident** or the export icon to add to the incident as a signal.

{{< img src="service_management/incidents/declare/declare_clipboard.png" alt="Declare an incident from the Datadog Clipboard" style="width:90%;" >}}

## From a Datadog On-Call page

You can declare an incident directly from a [Datadog On-Call page][12]. From the [On-Call pages list][13], select a page and click **Declare Incident** to create an incident and automatically associate it with the relevant on-call team.

## From Slack

If you have the [Datadog integration enabled on Slack][7], you can declare a new incident with the slash command `/datadog incident` from any Slack channel.

If the user declaring the incident connected their Slack to their Datadog account, by default, that user is listed as the Incident Commander. The Incident Commander (IC) can be changed later in-app if necessary. If the user declaring an incident is not a member of a Datadog account, then the IC is assigned to a generic `Slack app user` and can be assigned to another IC in-app.

{{< img src="service_management/incidents/from-slack.png" alt="Create in incident from Slack" style="width:60%;">}}

After you declare an incident from Slack, it generates an incident channel.

## From Handoff Notifications

The Handoff Notification displays callout cards when you are paged or added to active incidents. These cards allow you to:

- View and acknowledge On-Call pages
- Navigate to relevant incident resources
- Preview Slack messages from incident channels
- Take direct actions on incidents

{{< img src="/service_management/incidents/declare/handoff_notification_card.png" alt="Handoff notification card showing incident details with options to view, acknowledge, and take actions" style="width:100%;" >}}

Handoff Notificiation cards remain visible until dismissed or until the incident status changes. You can expand, collapse, or dismiss the entire handoff container rather than individual cards.

You can declare an incident from individual Handoff Notification cards.

## What's next

{{< whatsnext desc="Add helpful information to your incident and give context to everyone that is involved in the investigation.">}}
    {{< nextlink href="/incident_response/incident_management/describe" >}}Describe the Incident: Add context and details{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://app.datadoghq.com/incidents
[2]: /incident_response/incident_management/incident_settings#information
[3]: /security/workload_protection/security_signals/#declare-an-incident
[4]:/security/workload_protection/security_signals/#declare-an-incident
[5]: /incident_response/case_management/view_and_manage
[6]: /dashboards/guide/datadog_clipboard
[7]: /integrations/slack/?tab=slackapplicationbeta#using-the-slack-app
[8]: https://app.datadoghq.com/synthetics/tests
[9]: https://app.datadoghq.com/incidents/settings?section=global-settings
[10]: /incident_response/incident_management/incident_settings/property_fields
[11]: /incident_response/incident_management/incident_settings/notification_rules
[12]: /incident_response/on-call/
[13]: https://app.datadoghq.com/on-call/pages