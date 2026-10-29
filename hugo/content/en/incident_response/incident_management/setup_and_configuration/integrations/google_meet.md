---
title: Integrate Google Meet with Datadog Incident Management
description: Create Google Meet meetings for Datadog incidents with one click or automatically, and generate AI meeting summaries.
further_reading:
- link: "/incident_response/incident_management/setup_and_configuration/integrations"
  tag: "Documentation"
  text: "Incident Integrations Settings"
- link: "/integrations/google-meet-incident-management/"
  tag: "Documentation"
  text: "Google Meet Incident Management Integration"
- link: "/incident_response/incident_management/investigate/incident_ai/#meeting-summaries"
  tag: "Documentation"
  text: "Meeting summaries in Incident AI"
---

## Overview

The Google Meet integration for Datadog Incident Management lets your team start a Google Meet meeting for an incident. Meetings can be created with one click or automatically, based on criteria you define. You can also generate AI summaries of incident Google Meet meetings.

## Prerequisites

Install the integration through the [Google Meet Incident Management integration tile][1]. During installation, you authorize a Google user account that Datadog uses to create all Google Meet meetings. For more information, see the [Google Meet Incident Management integration][2] documentation.

After the integration is installed, go to [**Incidents** > **Settings** > **Integrations**][3] to configure Google Meet features for Incident Management.

## Google Meet meetings

### One-click meeting creation

To enable one-click Google Meet meetings for incidents:

1. Navigate to [**Settings > Integrations**][3] and scroll to the Google Meet section.
2. Toggle on **Enable Google Meet creation**.
3. Click **Save**.

After you enable one-click Google Meet meetings, start a meeting by clicking **Start Google Meet** from the incident header. You are redirected to join the meeting through the browser.

### Automatic meeting creation

To enable automatic, criteria-based Google Meet meetings for incidents:

1. Navigate to [**Settings > Integrations**][3] and scroll to the Google Meet section.
2. Toggle on **Enable Google Meet creation**.
   1. Toggle on **Automatically create Google Meet meetings**.
   2. (Optional) Specify the incident criteria that creates a Google Meet meeting. If left blank, any change to an incident without an existing Google Meet meeting creates a Google Meet meeting.
3. Click **Save**.

### Slack bookmark

To add the incident's Google Meet meeting to the incident Slack channel's bookmarks:

1. Navigate to [**Settings > Integrations**][3] and scroll to the Slack section.
2. Toggle on **Add important links to the incident channel's bookmarks**.

For more Slack features, see [Integrate Slack with Datadog Incident Management][4].

### Meeting summaries

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Meeting summaries are not available for your selected Datadog site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Enable AI-generated meeting summaries to automatically summarize incident Google Meet meetings.

<div class="alert alert-info">When meeting summaries are enabled, meeting audio is recorded and transcribed by a Datadog <a href="https://www.datadoghq.com/legal/subprocessors/">subprocessor</a>. After a 7 day retention period, all data is automatically deleted.</div>

AI features must be enabled for your organization before the Datadog Transcriber can join meetings.

To enable meeting summaries for incident Google Meet meetings:

1. Navigate to [**Settings > Integrations**][3] and scroll to the Google Meet section.
2. Toggle on **Enable Google Meet creation**.
3. Toggle on **Generate AI meeting summaries**.
4. (Optional) Add conditions to prevent summarization for specific incidents. By default, meetings for private incidents are not summarized.
5. Click **Save**.

When a Google Meet meeting attached to an incident starts, a Datadog Transcriber joins the meeting. For details on where summaries are posted and re-inviting the transcriber, see [Meeting summaries in Incident AI][5].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/google-meet-incident-management
[2]: /integrations/google-meet-incident-management/
[3]: https://app.datadoghq.com/incidents/settings?section=integrations
[4]: /incident_response/incident_management/setup_and_configuration/integrations/slack
[5]: /incident_response/incident_management/investigate/incident_ai/#meeting-summaries
