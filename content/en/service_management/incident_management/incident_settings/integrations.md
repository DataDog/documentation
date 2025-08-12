---
title: Integrations
---

## Overview

Custom integrations with popular communication tools like Slack, Microsoft Teams, Zoom, and Jira ensure that your team can use platforms they are already comfortable with. Customize the use of integration features in Datadog Incident Management to minimize the time spent on setting up new communication channels during incident response.

## Integrations

Navigate to [**Incidents > Settings > Integrations**][1].

Toggle the option to **Automatically create a channel for each new incident** to enable the following:
- Automatic Slack or Microsoft Teams channel creation for every new incident and the name template for those channels.
- Incident updates channel.

Configure either of these settings to use any Slack or Microsoft Teams workspace you have set up in your organization's [integration tile][2]. The *incident updates channel* sends a message whenever an incident is declared or changes status, severity, or incident commander.

## Channel name template options
<div class="alert alert-info">Datadog recommends you keep your prefix short as Slack enforces an 80 character limit in channel names. </div>

Changing your channel name template does not rename any existing incident channels. The new name template only applies going forward. By default, dedicated incident channels use `incident-{public_id}` as their name template. Add additional title options to add clarity to Slack channels:
- The `incident` prefix can be changed to any string composed of *lowercase* letters, numbers, and dashes. 
- Click the **Incident ID** checkbox to prevent duplicate channel names. 
- Click the **Title of Incident** checkbox to enable the Datadog Slack App to automatically rename the channel if an incident's title changes.

## Slack features

The following features are available to use with the Incident Management Slack integration. Enable or configure these options in **[Service Management > Incidents > Settings > Integrations][1]**.
- Mirror Slack channel messages, to import and retain all Slack conversations in the incident timeline. **Note**: This counts every Slack message commenter as a monthly active user. Alternately, push pinned message to your timeline to create a system of record for all incident-related conversations.
- Add important links from integrations such as Jira and Zoom to the incident channel's bookmarks.
- You can also automatically add [team members][3] to an incident Slack channel when a team is added to the incident. Only members who have connected their Slack and Datadog accounts by running the "/datadog connect" command in Slack are added to the channel.
- Automatically archive a Slack channel after a certain amount of time.

## Supported integrations

In addition to integrating with [Slack][4], Incident Management also integrates with:

- [PagerDuty][5] and [Opsgenie][6] to send incident notifications to your on-call engineers.
- [CoScreen][7] to launch collaborative meetings with multi-user screen sharing, remote control, and built-in audio and video chat.
- [Jira][8] to create a Jira ticket for an incident.
- [Webhooks][9] to send incident notifications using webhooks (for example, [sending SMS to Twilio][10]).
- [Statuspage][11] to create and update Statuspage incidents.
- [ServiceNow][12] to create a ServiceNow ticket for an incident.
- [Zoom][13] to create Zoom meetings for an incident.

[1]: https://app.datadoghq.com/incidents/settings#Integrations
[2]: https://app.datadoghq.com/account/settings#integrations
[3]: /account_management/teams/
[4]: /integrations/slack/?tab=slackapplicationbeta#using-the-slack-app
[5]: /integrations/pagerduty/
[6]: /integrations/opsgenie/
[7]: /coscreen
[8]: /integrations/jira/
[9]: /integrations/webhooks/
[10]: /integrations/webhooks/#sending-sms-through-twilio
[11]: /integrations/statuspage/
[12]: /integrations/servicenow/
[13]: /integrations/zoom_incident_management/
