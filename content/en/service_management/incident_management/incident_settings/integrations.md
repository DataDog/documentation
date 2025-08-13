---
title: Integrations
---

## Overview

Datadog Incident Management integrates with popular collaboration tools, such as Slack, Microsoft Teams, Zoom, Jira, Confluence, ServiceNow, Google Meet, and Google Drive.

## Integrations

To integrate Incident Management with a third-party application, install that application's integration in the [Datadog integrations library][13].

Then, configure the integration for Incident Management by navigating to [**Incidents > Settings > Integrations**][1].

## Slack

To use Incident Management's Slack features, you must first [install the Slack integration for Datadog][2].

After you do that, go to **[Service Management > Incidents > Settings > Integrations][1]** to configure the Slack features for Incident Management.

### Declaring incidents in Slack

When you connect a Slack workspace to a Datadog organization, users in the workspace can use slash commands and shortcuts related to Incident Management:

* `/datadog incident` declares an incident
* `/datadog incident test` declares a test incident (if test incidents are enabled for the incident type)

To allow any Slack user or non-guest Slack user to declare incidents in your Slack workspace, enable "Allow Slack users to declare incidents without a connected Datadog account" in Incident Management settings.

You can also declare incidents directly from a Slack message. To do this, mouse over the Slack message, click the "More actions" button, and then select "Declare incident". When you declare an incident in this way, Datadog posts a message to the Slack message thread indicating that you declared an incident.

### Incident channels

#### Automatic channel creation

You can configure Incident Management to automatically create an incident Slack for each incident or for incidents meeting criteria you define.

When enabling this, you can define a channel name template for Datadog to follow when creating the channel. The following variables are availble in channel name templates:

* `{{public_id}}`: Incident's numeric ID
* `{{title}}`: Incident's title
* `{{created}}`: Incident's creation date in format MM_DD_YYYY
* `{{yyyy}}`: Incident's four-digit creation year
* `{{mm}}`: Incident's two-digit creation month
* `{{dd}}`: Incident's two-digit creation day of month
* `{{random_adjective}}`: Random adjective
* `{{random_noun}}`: Random noun

#### Incident commands

The following commands can be run inside the incident Slack channel to manage the incident:

* `/datadog incident update` updates the channel's incident
* `/datadog incident private` converts the incident to a private incident (if private incidents are enabled for the incident type)
* `/datadog incident responders` allows you to add new responders and manage responder types
* `/datadog task` creates a new incident task
* `/datadog task list` shows the incident's tasks

#### Channel message syncing

You can configure Incident Management to push all incident Slack channel messages to the incident timeline. Alternatively, you can configure it to sync a Slack message only when you add a 📌 reaction to it.

The author of a synced message does not need an Incident Management or Incident Response seat for the message to be recorded. In organizations with usage-based billing for Incident Management, the author is not be counted as a monthly active user.

#### Other incident channel features

You can configure Incident Management to:

* Push incident timeline messages to the incident Slack channel
* Add important links to the incident Slack channel's bookmarks
* Add team members to the incident channel when a Datadog team is added to the incident
* Send a notification to the Slack channel when a meeting has been started
* Automatically archive an incident Slack channel after the incident is resolved

### Other Slack features

*Send incident updates to a global channel*: You can configure Incident Management to inform a selected channel when an incident's state, severity, title, or incident commander changes.

If you want to customize this behavior, deactivate this setting and [define a notification rule][12] instead.

## Microsoft Teams

To use Incident Management's Microsoft Teams features, you must first [install the Microsft Teams integration for Datadog][14].

After you do that, go to **[Service Management > Incidents > Settings > Integrations][1]** to configure the Microsoft Teams features for Incident Management.

### Declaring incidents in Microsoft Teams

To declare an incident from a particular team, you must first [add the Datadog application to the team][15].

After doing that, you can post `@Datadog incident` to declare an incident.

### Incident channels

#### Automatic channel creation

You can configure Incident Management to automatically create an incident Microsoft Teams channel for each incident or for incidents meeting criteria you define.

When enabling this, you can define a channel name template for Datadog to follow when creating the channel. The following variables are availble in channel name templates:

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

The author of a synced message does not need an Incident Management or Incident Response seat for the message to be recorded. In organizations with usage-based billing for Incident Management, the author is not be counted as a monthly active user.

#### Other incident channel features

You can configure Incident Management to:

* Automatically archive an incident channel after the incident is resolved

### Other Microsoft Teams features

*Send incident updates to a global channel*: You can configure Incident Management to inform a selected channel when an incident's state, severity, title, or incident commander changes.

If you want to customize this behavior, deactivate this setting and [define a notification rule][12] instead.

## Other integrations

In addition to integrating with Slack and Microsoft Teams, Incident Management also integrates with:

- [PagerDuty][3] and [Opsgenie][4] to send incident notifications to your on-call engineers.
- [CoScreen][5] to launch collaborative meetings with multi-user screen sharing, remote control, and built-in audio and video chat.
- [Jira][6] to create a Jira ticket for an incident.
- [Webhooks][7] to send incident notifications using webhooks (for example, [sending SMS to Twilio][8]).
- [Statuspage][9] to create and update Statuspage incidents.
- [ServiceNow][10] to create a ServiceNow ticket for an incident.
- [Zoom][11] to create Zoom meetings for an incident.

[1]: https://app.datadoghq.com/incidents/settings#Integrations
[2]: /integrations/slack/?tab=slackapplicationbeta#using-the-slack-app
[3]: /integrations/pagerduty/
[4]: /integrations/opsgenie/
[5]: /coscreen
[6]: /integrations/jira/
[7]: /integrations/webhooks/
[8]: /integrations/webhooks/#sending-sms-through-twilio
[9]: /integrations/statuspage/
[10]: /integrations/servicenow/
[11]: /integrations/zoom_incident_management/
[12]: /service_management/incident_management/incident_settings/notification_rules
[13]: https://app.datadoghq.com/integrations
[14]: /integrations/microsoft-teams/?tab=datadogapprecommended
[15]: /integrations/microsoft-teams/?tab=datadogapprecommended#datadog-incident-management-in-microsoft-teams