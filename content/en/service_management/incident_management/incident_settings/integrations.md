---
title: Integrations
further_reading:
- link: "/service_management/incident_management/integrations"
  tag: "Documentation"
  text: "Incident Integrations"
---

## Overview

Datadog Incident Management integrates with popular collaboration tools, such as Slack, Microsoft Teams, Zoom, Jira, Confluence, ServiceNow, Google Meet, and Google Drive.

To integrate Incident Management with a third-party application, install that application's integration in the [Datadog integrations library][1].

Then, configure the integration for Incident Management by navigating to [**Incidents > Settings > Integrations**][2].

## Slack

To use Incident Management's Slack features, you must first [install the Slack integration for Datadog][3].

Then, go to **[Service Management > Incidents > Settings > Integrations][2]** to configure the Slack features for Incident Management.

For a full overview of Slack configuration options in Datadog Incident Management, including incident declaration, channel automation, message syncing, responder management, and notification settings, see the [Slack integration documentation][4].

## Microsoft Teams

To use Incident Management's Microsoft Teams features, you must first [install the Microsoft Teams integration for Datadog][5].

After you do that, go to **[Service Management > Incidents > Settings > Integrations][2]** to configure the Microsoft Teams features for Incident Management.

### Declaring and managing incidents in Microsoft Teams

To declare or manage an incident from a specific team:
1. [Add the Datadog application][6] to the team.
2. Add the **Datadog** tab to any channel in that team. 
3. From this tab, declare incidents and manage existing ones (for example, update fields, impacts, and responders). 

**Note**: In an incident channel, the tab shows and lets you manage the incident associated with that channel. In other channels, you can only declare new incidents.

### Incident channels

#### Automatic channel creation

You can configure Incident Management to automatically create an incident Microsoft Teams channel for each incident or for incidents meeting criteria you define.

After you enable this automation, you can define a **channel name template** for Datadog to follow when creating the channel. The following variables are available in channel name templates:

* `{{public_id}}`: Incident's numeric ID
* `{{title}}`: Incident's title
* `{{created}}`: Incident's creation date in format MM_DD_YYYY
* `{{yyyy}}`: Incident's four-digit creation year
* `{{mm}}`: Incident's two-digit creation month
* `{{dd}}`: Incident's two-digit creation day of month
* `{{random_adjective}}`: Random adjective
* `{{random_noun}}`: Random noun

#### Channel message syncing

You can configure Incident Management to push all incident Microsoft Teams channel messages to the incident timeline.

The author of a synced message does not need an Incident Management or Incident Response seat for the message to be recorded. In organizations with usage-based billing for Incident Management, the author is not counted as a monthly active user.

#### Other incident channel features

You can configure Incident Management to:

* Automatically archive an incident channel after the incident is resolved

### Other Microsoft Teams features

*Send incident updates to a global channel*: You can configure Incident Management to notify a selected channel when an incident's state, severity, title, or incident commander changes.

To customize this behavior, deactivate this setting and [define a notification rule][7] instead.

## Other integrations

In addition to integrating with Slack and Microsoft Teams, Incident Management also integrates with:

- [PagerDuty][8] and [Opsgenie][9] to send incident notifications to your on-call engineers.
- [CoScreen][10] to launch collaborative meetings with multi-user screen sharing, remote control, and built-in audio and video chat.
- [Jira][11] to create a Jira ticket for an incident.
- [Webhooks][12] to send incident notifications using webhooks (for example, [sending SMS to Twilio][13]).
- [Statuspage][14] to create and update Statuspage incidents.
- [ServiceNow][15] to create a ServiceNow ticket for an incident.
- [Zoom][16] to create Zoom meetings for an incident.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations
[2]: https://app.datadoghq.com/incidents/settings#Integrations
[3]: /integrations/slack/?tab=slackapplicationbeta#using-the-slack-app
[4]: /service_management/incident_management/integrations/slack/
[5]: /integrations/microsoft-teams/?tab=datadogapprecommended
[6]: /integrations/microsoft-teams/?tab=datadogapprecommended#datadog-incident-management-in-microsoft-teams
[7]: /service_management/incident_management/incident_settings/notification_rules
[8]: /integrations/pagerduty/
[9]: /integrations/opsgenie/
[10]: /coscreen
[11]: /integrations/jira/
[12]: /integrations/webhooks/
[13]: /integrations/webhooks/#sending-sms-through-twilio
[14]: /integrations/statuspage/
[15]: /integrations/servicenow/
[16]: /integrations/zoom_incident_management/
