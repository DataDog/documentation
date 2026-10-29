---
title: Integrate Zoom with Datadog Incident Management
description: Create Zoom meetings for Datadog incidents with one click or automatically, and generate AI meeting summaries.
aliases:
- /service_management/incident_management/zoom_integration/
- /incident_response/incident_management/zoom_integration
further_reading:
- link: "/incident_response/incident_management/setup_and_configuration/integrations"
  tag: "Documentation"
  text: "Incident Integrations Settings"
- link: "/integrations/zoom-incident-management/"
  tag: "Documentation"
  text: "Zoom Incident Management Integration"
- link: "/incident_response/incident_management/investigate/incident_ai/#meeting-summaries"
  tag: "Documentation"
  text: "Meeting summaries in Incident AI"
---

## Overview

The Zoom integration for Datadog Incident Management lets your team start a Zoom meeting for an incident. Meetings can be created with one click or automatically, based on criteria you define. You can also generate AI summaries of incident Zoom meetings.

## Prerequisites

Install the integration through the [Zoom Incident Management integration tile][1]. A Zoom administrator must authorize the integration. For more information, see the [Zoom Incident Management integration][2] documentation.

After the integration is installed, go to [**Incidents** > **Settings** > **Integrations**][3] to configure Zoom features for Incident Management.

## Zoom meetings

### One-click meeting creation

To enable one-click Zoom meetings for incidents:

1. Navigate to [**Settings > Integrations**][3] and scroll to the Zoom section.
2. Toggle on **Enable Zoom meeting creation**.
3. Click **Save**.

After you enable one-click Zoom meetings, start a meeting by clicking **Create Zoom Meeting** from the incident header. You can also run the `/zoom` command in an incident Slack channel. You are redirected to join the meeting through the browser or the Zoom client.

The email of the Datadog user who creates the meeting is used as the host email, and must be associated with an authorized Zoom account. If the email is not registered, Datadog uses the [fallback Zoom user](#fallback-zoom-user), if configured.

### Automatic meeting creation

To enable automatic, criteria-based Zoom meetings for incidents:

1. Navigate to [**Settings > Integrations**][3] and scroll to the Zoom section.
2. Toggle on **Enable Zoom meeting creation**.
   1. Toggle on **Automatically create Zoom meetings**.
   2. (Optional) Specify the incident criteria that creates a Zoom meeting. If left blank, any change to an incident without an existing Zoom meeting creates a Zoom meeting.
3. Click **Save**.

When an incident meets the criteria, Datadog creates a Zoom meeting using the Incident Commander's email as the host email. If there is no Incident Commander, or their email is not associated with an authorized Zoom account, Datadog uses the [fallback Zoom user](#fallback-zoom-user), if configured.

**Note**: To use automatic Zoom meeting creation in a [test incident][4], select **Execute integrations** in the test incident creation modal. Otherwise, the meeting is not created.

### Fallback Zoom user

Configure a fallback Zoom user to host meetings when Datadog can't resolve a host email in the authorized Zoom account. For example:

- The Datadog user who creates a meeting does not have an account in the authorized Zoom account.
- The incident has no Incident Commander when a meeting is created automatically.
- The Incident Commander does not have an account in the authorized Zoom account when a meeting is created automatically.

To configure a fallback Zoom user:

1. Navigate to [**Settings > Integrations**][3] and scroll to the Zoom section.
2. Toggle on **Enable Zoom meeting creation**.
3. Under **Fallback user account**, enter an email associated with the authorized Zoom account. To avoid issues when an employee leaves the company, use a shared user.
4. (Optional) To use the fallback user as the host for all Zoom meetings, toggle on **Always use this account as the meeting host**.
5. Click **Save**.

### Slack bookmark

To add the incident's Zoom meeting to the incident Slack channel's bookmarks:

1. Navigate to [**Settings > Integrations**][3] and scroll to the Slack section.
2. Toggle on **Add important links to the incident channel's bookmarks**.

For more Slack features, see [Integrate Slack with Datadog Incident Management][5].

### Meeting summaries

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Meeting summaries are not available for your selected Datadog site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Enable AI-generated meeting summaries to automatically summarize incident Zoom meetings.

<div class="alert alert-info">When meeting summaries are enabled, meeting audio is recorded and transcribed by a Datadog <a href="https://www.datadoghq.com/legal/subprocessors/">subprocessor</a>. After a 7 day retention period, all data is automatically deleted.</div>

AI features must be enabled for your organization before the Datadog Transcriber can join meetings.

To enable meeting summaries for incident Zoom meetings:

1. Navigate to [**Settings > Integrations**][3] and scroll to the Zoom section.
2. Toggle on **Enable Zoom meeting creation**.
3. Toggle on **Generate AI meeting summaries**.
4. (Optional) Add conditions to prevent summarization for specific incidents. By default, meetings for private incidents are not summarized.
5. Click **Save**.

**Note**: Meeting captions must be enabled in Zoom for summaries to be generated.

When a Zoom meeting attached to an incident starts, a Datadog Transcriber joins the meeting. For details on where summaries are posted and re-inviting the transcriber, see [Meeting summaries in Incident AI][6].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/zoom-incident-management
[2]: /integrations/zoom-incident-management/
[3]: https://app.datadoghq.com/incidents/settings?section=integrations
[4]: /incident_response/incident_management/guides/test_incidents
[5]: /incident_response/incident_management/setup_and_configuration/integrations/slack
[6]: /incident_response/incident_management/investigate/incident_ai/#meeting-summaries
