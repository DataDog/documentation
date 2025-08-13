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

Once you do that, go to **[Service Management > Incidents > Settings > Integrations][1]** to configure the Slack features for Incident Management.

### Declaring incidents in Slack

When you connect a Slack workspace to a Datadog organization, users in the workspace can use slash commands and shortcuts related to Incident Management:

* `/datadog incident` declares an incident
* `/datadog incident test` declares a test incident (if test incidents are enabled for the incident type)

To allow any user or non-guest user to declare incidents via your Slack workspace, enable "Allow Slack users to declare incidents without a connected Datadog account" in Incident Management settings.

You can also declare incidents directly from a Slack message. To do this, mouse over the Slack message, click the "More actions" button, and then select "Declare incident". When you declare an incident in this way, Datadog will post a message to the message thread indicating that you declared an incident.

### Incident Slack channels

#### Automatic channel creation

You can configure Incident Management to automatically create an incident Slack for each incident or for incidents meeting criteria you define.

When enabling this, you can define a channel name template for Datadog to follow when creating the channel. The following variables are availble in channel name templates:

* `{{public_id}}`: Incident's numeric ID
* `{{title}}`: Incident's title
* `{{created}}`: Incident's creation date in format MM_DD_YYYY
* `{{yyyy}}`: Incident's four-digit creation year
* `{{mm}}`:  Incident's two-digit creation month
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

You can configure Incident Management to push Slack channel messages to the incident timeline — all messages or only messages to which a 📌 reaction has been applied.

The author of a synced message does not need an Incident Management or Incident Response seat for the message to be recorded.

In organizations with usage-based billing for Incident Management, the author will not be counted as a monthly active user.

#### Other incident Slack channel features

You can configure Incident Management to:

* Push incident timeline messages to the incident Slack channel
* Add important links to the incident Slack channel's bookmarks
* Add team members to the incident channel when a Datadog team is added to the incident
* Send a notification to the Slack channel when a meeting has been started
* Auto-archive an incident Slack channel after the incident is resolved

### Other Slack features

*Send incident updates to a global channel*: You can configure Incident Management to update a selected channel when an incident's state, severity, title, or incident commander changes.

If you want to customize this behavior, deactivate this setting and [define a notification rule][12] instead.

## Other integrations

In addition to integrating with [Slack][2], Incident Management also integrates with:

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