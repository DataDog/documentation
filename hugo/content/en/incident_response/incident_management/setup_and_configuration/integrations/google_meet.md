---
title: Integrate Google Meet with Datadog Incident Management
description: Create Google Meet meetings for Datadog incidents with one click or automatically, and generate AI meeting summaries and live transcript notebooks.
further_reading:
- link: "/incident_response/incident_management/setup_and_configuration/integrations"
  tag: "Documentation"
  text: "Incident Integrations Settings"
- link: "/integrations/google-meet-incident-management/"
  tag: "Documentation"
  text: "Google Meet Incident Management Integration"
- link: "/incident_response/incident_management/investigate/meeting_summaries_and_transcripts"
  tag: "Documentation"
  text: "Meeting Summaries and Transcripts"
---

## Overview

The Google Meet integration for Datadog Incident Management lets your team start a Google Meet meeting for an incident. You can create meetings with one click or automatically, based on criteria you define. You can also generate live transcript notebooks and AI summaries of incident Google Meet meetings.

## Prerequisites

To use Incident Management's Google Meet features, you must first [install the Google Meet Incident Management integration][1].

After installation, go to **[Incident Response > Incident Management > Settings > Integrations][2]** to configure the Google Meet features for Incident Management.

## Google Meet meetings

### One-click meeting creation

To enable one-click Google Meet meetings for incidents:

1. Navigate to [**Settings > Integrations**][2] and select **Google Meet**.
2. Toggle on **Enable Google Meet creation**.
3. Save your settings.

After enabling one-click Google Meet meetings, start a meeting by clicking **Start Google Meet** from the incident header. You are redirected to join the meeting through the browser.

### Automatic meeting creation

To enable automatic, criteria-based Google Meet meetings for incidents:

1. Navigate to [**Settings > Integrations**][2] and select **Google Meet**.
2. Toggle on **Enable Google Meet creation**.
   1. Toggle on **Automatically create Google Meet meetings**.
   2. (Optional) Specify the incident criteria that create a Google Meet meeting. If you leave the criteria blank, any change to an incident without an existing Google Meet meeting creates a Google Meet meeting.
3. Save your settings.

### Slack bookmark

To add the incident's Google Meet meeting to the incident Slack channel's bookmarks:

1. Navigate to [**Settings > Integrations**][2] and select **Slack**.
2. Toggle on **Add important links to the incident channel's bookmarks**.
3. Save your settings.

If the incident has a Slack channel, Datadog adds a bookmark for the Google Meet meeting to that channel.

For more Slack features, see [Integrate Slack with Datadog Incident Management][3].

### Meeting summaries and transcripts {#meeting-summaries}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Meeting summaries and live meeting transcripts are not available for your selected Datadog site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Incident AI can generate summaries of incident Google Meet meetings and optionally save live meeting transcripts in Datadog notebooks.

<div class="alert alert-info">When meeting summaries are enabled, a Datadog <a href="https://www.datadoghq.com/legal/subprocessors/">subprocessor</a> records and transcribes meeting audio. For retention details, see <a href="/incident_response/incident_management/investigate/meeting_summaries_and_transcripts/#retention-and-deletion">Retention and deletion for meeting summaries and transcripts</a>.</div>

#### Prerequisites

- AI features must be enabled for your organization.
- You must use an account with permission to edit incident settings.
- To save live meeting transcripts, your organization must have access to live meeting transcripts. If the **Generate meeting transcripts** setting is unavailable, contact [Datadog Support][4].

#### Enable meeting summaries and transcripts

To enable meeting summaries and transcripts for incident Google Meet meetings:

1. Navigate to [**Settings > Integrations**][2] and select **Google Meet**.
2. Toggle on **Enable Google Meet creation**.
3. Toggle on **Generate AI meeting summaries**.
4. (Optional) To save live meeting transcripts, toggle on **Generate meeting transcripts**, which appears under **Generate AI meeting summaries**.
5. (Optional) Add conditions to prevent summarization for specific incidents.
6. Save your settings.

To review summaries, view transcripts, manage transcript notebook access, and re-invite the transcriber, see [Meeting Summaries and Transcripts][5].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/google-meet-incident-management/
[2]: https://app.datadoghq.com/incidents/settings?section=integrations
[3]: /incident_response/incident_management/setup_and_configuration/integrations/slack
[4]: /help/
[5]: /incident_response/incident_management/investigate/meeting_summaries_and_transcripts
