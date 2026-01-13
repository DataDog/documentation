---
title: Integrations
aliases:
- /service_management/incident_management/incident_settings/integrations/
further_reading:
- link: "/incident_response/incident_management/integrations"
  tag: "Documentation"
  text: "Incident Integrations"
---

## Overview

Datadog Incident Management integrates with popular collaboration tools, such as Slack, Microsoft Teams, Google Chat, Zoom, Jira, Confluence, ServiceNow, Google Meet, and Google Drive.

To integrate Incident Management with a third-party application, install that application's integration in the [Datadog integrations library][1].

Then, configure the integration for Incident Management by navigating to [**Incidents > Settings > Integrations**][2].

## Slack

For a full overview of Slack configuration options in Datadog Incident Management, including incident declaration, channel automation, message syncing, responder management, and notification settings, see the [Slack integration documentation][4].

## Microsoft Teams

For a full overview of Microsoft Teams configuration options in Datadog Incident Management, including incident declaration, channel automation, message syncing, responder management, and notification settings, see [Integrate Microsoft Teams with Datadog Incident Management][17].

## Google Chat

For a full overview of Google Chat configuration options in Datadog Incident Management, including space automation, see [Integrate Google Chat with Datadog Incident Management][18].

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
[4]: /incident_response/incident_management/integrations/slack/
[5]: /integrations/microsoft-teams/?tab=datadogapprecommended
[6]: /integrations/microsoft-teams/?tab=datadogapprecommended#datadog-incident-management-in-microsoft-teams
[7]: /incident_response/incident_management/incident_settings/notification_rules
[8]: /integrations/pagerduty/
[9]: /integrations/opsgenie/
[10]: /coscreen
[11]: /integrations/jira/
[12]: /integrations/webhooks/
[13]: /integrations/webhooks/#sending-sms-through-twilio
[14]: /integrations/statuspage/
[15]: /integrations/servicenow/
[16]: /integrations/zoom_incident_management/
[17]: /incident_response/incident_management/integrations/microsoft_teams
[18]: /incident_response/incident_management/integrations/google_chat
