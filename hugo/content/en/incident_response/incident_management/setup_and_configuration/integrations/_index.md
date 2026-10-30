---
title: Incident Integrations
description: "Learn how to connect Datadog Incident Management with third-party tools to automate workflows, sync communications, and streamline incident response."
aliases:
- /service_management/incident_management/integrations/
- /service_management/incident_management/incident_settings/integrations/
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
    {{< nextlink href="/incident_response/incident_management/setup_and_configuration/integrations/google_meet" >}}Google Meet{{< /nextlink >}}
    {{< nextlink href="/incident_response/incident_management/setup_and_configuration/integrations/zoom_integration" >}}Zoom{{< /nextlink >}}
    {{< nextlink href="/incident_response/incident_management/integrations/google_chat" >}}Google Chat{{< /nextlink >}}
    {{< nextlink href="/incident_response/incident_management/integrations/jira" >}}Jira{{< /nextlink >}}
    {{< nextlink href="/incident_response/incident_management/integrations/servicenow" >}}ServiceNow{{< /nextlink >}}
    {{< nextlink href="/incident_response/incident_management/integrations/status_pages" >}}Status Pages{{< /nextlink >}}
    {{< nextlink href="/incident_response/incident_management/integrations/statuspage" >}}Atlassian Statuspage{{< /nextlink >}}
{{< /whatsnext >}}

## Other integrations

Incident Management also integrates with:

- [Datadog On-Call][3] to page On-Call teams from an incident. You can configure Incident Management to automatically resolve attached On-Call pages when the related incident is resolved.
- [PagerDuty][4] and [Opsgenie][5] to send incident notifications to your on-call engineers. With PagerDuty, you can also automatically resolve attached PagerDuty incidents when the related Datadog incident is resolved.
- [Confluence][6] and [Google Drive][7] to save incident postmortems. To set this up, create a [postmortem template][8] with Confluence or Google Drive as the save location.
- [Webhooks][9] to send incident notifications using webhooks (for example, [sending SMS to Twilio][10]).

[1]: https://app.datadoghq.com/integrations
[2]: https://app.datadoghq.com/incidents/settings#Integrations
[3]: /incident_response/on-call/
[4]: /integrations/pagerduty/
[5]: /integrations/opsgenie/
[6]: /integrations/confluence/
[7]: /integrations/google-drive/
[8]: /incident_response/incident_management/setup_and_configuration/templates/#save-location
[9]: /integrations/webhooks/
[10]: /integrations/webhooks/#sending-sms-through-twilio
