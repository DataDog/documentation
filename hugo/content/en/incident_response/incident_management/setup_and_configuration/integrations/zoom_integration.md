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

The Zoom integration for Datadog Incident Management lets your team start a Zoom meeting for an incident. You can create meetings with one click, or automatically based on criteria you define. You can also generate AI summaries of incident Zoom meetings.

## Prerequisites

To use Incident Management's Zoom features, you must first [install the Zoom Incident Management integration][1].

After installation, go to **[Incident Response > Incident Management > Settings > Integrations][2]** to configure the Zoom features for Incident Management.

## Zoom meetings

### One-click meeting creation

To enable one-click Zoom meetings for incidents:

1. Navigate to [**Settings > Integrations**][2] and select **Zoom**.
2. Toggle on **Enable Zoom meeting creation**.
3. Save your settings.

After enabling one-click Zoom meetings, start a meeting by clicking **Create Zoom Meeting** from the incident header. You can also run the `/zoom` command in an incident Slack channel. You are redirected to join the meeting through the browser or the Zoom client.

Datadog uses the email of the user who creates the meeting as the host email. This email must be associated with an authorized Zoom account. If it isn't, Datadog uses the [fallback Zoom user](#fallback-zoom-user), if configured.

### Automatic meeting creation

To enable automatic, criteria-based Zoom meetings for incidents:

1. Navigate to [**Settings > Integrations**][2] and select **Zoom**.
2. Toggle on **Enable Zoom meeting creation**.
   1. Toggle on **Automatically create Zoom meetings**.
   2. (Optional) Specify the incident criteria that creates a Zoom meeting. If left blank, any change to an incident without an existing Zoom meeting creates a Zoom meeting.
3. Save your settings.

When an incident meets the criteria, Datadog creates a Zoom meeting using the Incident Commander's email as the host email. If there is no Incident Commander, or their email is not associated with an authorized Zoom account, Datadog uses the [fallback Zoom user](#fallback-zoom-user), if configured.

**Note**: To use automatic Zoom meeting creation in a [test incident][3], select **Execute integrations** in the test incident creation modal. Otherwise, Datadog doesn't create the meeting.

### Fallback Zoom user

Configure a fallback Zoom user to host meetings when Datadog can't resolve a host email in the authorized Zoom account. For example:

- The Datadog user who creates a meeting does not have an account in the authorized Zoom account.
- The incident has no Incident Commander when Datadog creates a meeting automatically.
- The Incident Commander does not have an account in the authorized Zoom account when Datadog creates a meeting automatically.

To configure a fallback Zoom user:

1. Navigate to [**Settings > Integrations**][2] and select **Zoom**.
2. Toggle on **Enable Zoom meeting creation**.
3. Under **Fallback user account**, enter an email associated with the authorized Zoom account. To avoid issues when an employee leaves the company, use a shared user.
4. (Optional) To use the fallback user as the host for all Zoom meetings, toggle on **Always use this account as the meeting host**.
5. Save your settings.

### Slack bookmark

To add the incident's Zoom meeting to the incident Slack channel's bookmarks:

1. Navigate to [**Settings > Integrations**][2] and select **Slack**.
2. Toggle on **Add important links to the incident channel's bookmarks**.
3. Save your settings.

For more Slack features, see [Integrate Slack with Datadog Incident Management][4].

### Meeting summaries

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Meeting summaries are not available for your selected Datadog site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Enable AI-generated meeting summaries to automatically summarize incident Zoom meetings.

<div class="alert alert-info">When meeting summaries are enabled, a Datadog <a href="https://www.datadoghq.com/legal/subprocessors/">subprocessor</a> records and transcribes meeting audio. After a seven-day retention period, the subprocessor automatically deletes all data.</div>

To enable meeting summaries for incident Zoom meetings:

1. Navigate to [**Settings > Integrations**][2] and select **Zoom**.
2. Toggle on **Enable Zoom meeting creation**.
3. Toggle on **Generate AI meeting summaries**.
4. (Optional) Add conditions to prevent summarization for specific incidents. By default, Incident AI does not summarize meetings for private incidents.
5. Save your settings.

**Note**: Enable meeting captions in Zoom so that Incident AI can generate summaries.

For prerequisites, where summaries are posted, reviewing summaries, and re-inviting the transcriber, see [Meeting summaries in Incident AI][5].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/zoom-incident-management/
[2]: https://app.datadoghq.com/incidents/settings?section=integrations
[3]: /incident_response/incident_management/guides/test_incidents
[4]: /incident_response/incident_management/setup_and_configuration/integrations/slack
[5]: /incident_response/incident_management/investigate/incident_ai/#meeting-summaries
