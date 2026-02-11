---
title: Incident Integrations
description: "Learn how to connect Datadog Incident Management with third-party tools to automate workflows, sync communications, and streamline incident response."
aliases:
- /service_management/incident_management/integrations/
- /incident_response/incident_management/integrations
---

## Overview

Datadog Incident Management integrates with third-party platforms to support collaboration and response. Integrations connect your incident workflows with ticketing systems, communication channels, and status pages so your teams can coordinate, escalate, and resolve incidents in their existing tools.

Use integrations in Datadog Incident Management to:

- **Automate workflows:** Trigger actions in external systems (such as creating Jira tickets or updating Statuspage) directly from Datadog incidents.
- **Centralize communication:** Sync incident updates and notifications with chat tools, ticketing platforms, and on-call systems to keep stakeholders informed.
- **Customize responses:** Tailor integration settings to match your organization's incident response processes, ensuring the right people and systems are engaged at the right time.

## Integration settings

Configure and manage incident-related integrations from the **Incident Settings** page. Connect tools such as Slack or Microsoft Teams to automate notifications, ticket creation, and collaboration during incidents.

To integrate Incident Management with a third-party application, install that application's integration in the [Datadog integrations library][1].

Then, configure the integration for Incident Management by navigating to [**Incidents > Settings > Integrations**][2].

## Setup

{{< whatsnext desc="Set up and use the following integrations within the context of Datadog Incident Management:">}}
    {{< nextlink href="/incident_response/incident_management/integrations/slack" >}}Slack{{< /nextlink >}}
    {{< nextlink href="/incident_response/incident_management/integrations/microsoft_teams" >}}Microsoft Teams{{< /nextlink >}}
    {{< nextlink href="/incident_response/incident_management/integrations/google_chat" >}}Google Chat{{< /nextlink >}}
    {{< nextlink href="/incident_response/incident_management/integrations/jira" >}}Jira{{< /nextlink >}}
    {{< nextlink href="/incident_response/incident_management/integrations/servicenow" >}}ServiceNow{{< /nextlink >}}
    {{< nextlink href="/incident_response/incident_management/integrations/status_pages" >}}Status Pages{{< /nextlink >}}
    {{< nextlink href="/incident_response/incident_management/integrations/statuspage" >}}Atlassian Statuspage{{< /nextlink >}}
{{< /whatsnext >}}

## Other integrations

Incident Management also integrates with:

- [PagerDuty][3] and [Opsgenie][4] to send incident notifications to your on-call engineers.
- [CoScreen][5] to launch collaborative meetings with multi-user screen sharing, remote control, and built-in audio and video chat.
- [Webhooks][6] to send incident notifications using webhooks (for example, [sending SMS to Twilio][7]).
- [Zoom][8] to create Zoom meetings for an incident.

[1]: https://app.datadoghq.com/integrations
[2]: https://app.datadoghq.com/incidents/settings#Integrations
[3]: /integrations/pagerduty/
[4]: /integrations/opsgenie/
[5]: /coscreen
[6]: /integrations/webhooks/
[7]: /integrations/webhooks/#sending-sms-through-twilio
[8]: /integrations/zoom_incident_management/