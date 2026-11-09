---
title: Incident AI
description: "Learn how to use Incident AI to investigate active incidents, receive proactive summaries, detect related issues, and trigger AI-powered root cause analysis."
aliases:
- /bits_ai/managing_incidents/
- /bits_ai/bits_ai_sre/coordinate_incidents
- /service_management/incident_management/incident_ai/
- /incident_response/incident_management/incident_ai
further_reading:
- link: "/bits_ai/bits_investigation/"
  tag: "Documentation"
  text: "Learn about Bits Investigation"
- link: "/incident_response/incident_management/post_incident/postmortems"
  tag: "Documentation"
  text: "Generate AI-assisted postmortems"
- link: "/incident_response/incident_management/setup_and_configuration/templates"
  tag: "Documentation"
  text: "Configure AI variables in notification and postmortem templates"
- link: "https://www.datadoghq.com/blog/datadog-incident-response-ai-features/"
  tag: "Blog"
  text: "Accelerate investigations with AI in Datadog Incident Response"
---

## Overview

Incident AI helps responders investigate active incidents faster by automating information gathering and surfacing relevant context. Working in Slack and the Datadog platform, it provides proactive summaries, detects related incidents, and enables conversational queries against incident history so your team can focus on resolution.

To enable Incident AI, connect Datadog to Slack and activate Bits AI in your incident Slack channels. For setup instructions, see the [Slack integration for Incident Management][1].

For AI features that apply outside the investigation phase, see:
- [Templates][2]: Add AI variables to notification and postmortem templates
- [Postmortems][3]: Generate AI-assisted postmortem drafts

## Proactive incident summaries

When you join an incident channel in Slack (connected to Datadog Incident Management), Incident AI automatically posts a summary containing key information about the incident such as the contributing factors, impact, issue, and remediation. This can also be requested ad-hoc using `/dd incident summary`. This summary is only visible to you.

When an incident is changed to resolved, Incident AI posts a final summary. This is visible to everyone in the channel.

{{< img src="incident_response/incident_management/investigate/incident_ai/incident_summary.png" alt="Example incident summary in Slack" style="width:100%;" >}}

## Meeting summaries

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Meeting summaries are not available for your selected Datadog site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Incident AI can automatically summarize incident meetings in Zoom, Google Meet, and Microsoft Teams. During a meeting, it periodically posts live summaries to the incident timeline and the incident chat channel. When the meeting ends, it posts a final post-meeting summary.

<div class="alert alert-info">When meeting summaries are enabled, a Datadog <a href="https://www.datadoghq.com/legal/subprocessors/">subprocessor</a> records and transcribes meeting audio. After a seven-day retention period, the subprocessor automatically deletes all data. This does not delete transcripts saved in Datadog notebooks.</div>

Your organization must have AI features enabled before the Datadog Transcriber can join meetings. To turn on meeting summaries, enable **Generate AI meeting summaries** in the integration settings for your meeting platform:

- [Zoom][4]
- [Google Meet][5]
- [Microsoft Teams][6]

By default, Incident AI does not summarize meetings for private incidents. You can add conditions in the integration settings to prevent summarization for other incidents as well.

### How meeting summaries work

When a meeting attached to an incident starts, a Datadog Transcriber attempts to join the meeting. This may take 10 to 30 seconds. If the meeting has a lobby or waiting room, a participant must admit the Datadog Transcriber before transcription can begin. After the Datadog Transcriber joins, it periodically posts live summaries to the following locations during the meeting:

- The **incident timeline**, under a **Meeting Summary** entry.
- The **incident chat channel**, both in the meeting card thread and as a message to the channel.

When the meeting ends, it posts a final post-meeting summary to the same locations.

### Reviewing a summary

After a summary is posted, you can approve it, edit its text, or reject it. You can take these actions from the incident timeline in Datadog, or from the incident chat channel if the summary was broadcast there.

To review a summary from the incident timeline:

1. Open the incident in Datadog and find the **Meeting Summary** entry on the timeline.
2. Click the checkmark icon to approve the summary, the pencil icon to edit its text, or the reject icon to remove it from the timeline.

When a user approves or edits a summary, Datadog records who did so. After a summary is edited, it can't be approved; the edited version takes precedence. Rejecting a summary removes it from the incident timeline for everyone and hides its content in connected chat channels. Datadog asks for confirmation before rejecting, because that action can't be undone.

If the summary was broadcast to the incident chat channel, use the **Approve**, **Edit**, or **Reject summary** buttons on the message.

### Re-inviting the transcriber

If the Datadog Transcriber leaves a meeting, re-invite it to the same linked meeting to resume summarization:

1. Open the incident in Datadog.
2. In the incident header, open the menu for the linked meeting.
3. Click **Add Transcriber** (the robot icon) beside the meeting.
4. If required, admit the Datadog Transcriber from the meeting lobby or waiting room so transcription can begin.

The robot icon shows whether the transcriber is joining or already in the meeting. If you cannot add the transcriber, hover over the icon to see the reason.

A re-invite prompt can also appear in the incident's Slack or Microsoft Teams meeting-card thread after the transcriber leaves. This can happen after a timeout while waiting for admission or participants, after everyone leaves the meeting, or when someone removes the transcriber. Select **Yes** to re-invite the transcriber or **No** to dismiss the prompt.

Re-inviting requires permission to edit the incident and, for organizations with seat-based billing, an [Incident Management or Incident Response seat][7]. Re-inviting does not override conditions that prevent summarization, including the default exclusion for private incidents.

## Live meeting transcripts

Live meeting transcripts save the conversation from an incident's Zoom, Google Meet, or Microsoft Teams meeting in a Datadog notebook. Transcripts capture the conversation with speaker names and timestamps in your time zone. AI summaries condense the discussion into key points. The notebook updates during the meeting and remains available afterward.

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Live meeting transcripts are not available for your selected Datadog site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

### Enable transcripts

Your organization must have access to live meeting transcripts and AI features. Using an account with permission to edit incident settings:

1. Go to [**Incident Settings > Integrations**][9] and select the incident type and meeting platform. For Microsoft Teams, select the connected tenant.
2. Enable meeting creation and **Generate AI meeting summaries**.
3. Review the conditions that prevent summarization. These also determine whether the transcriber can record the meeting. By default, private incidents are excluded.
4. Enable **Generate meeting transcripts** and save your settings.

If the transcript setting is unavailable, contact [Datadog Support][10]. For provider-specific prerequisites, see the [Zoom][4], [Google Meet][5], or [Microsoft Teams][6] setup guide.

Setting changes apply to new recordings, without changing recordings in progress or creating notebooks for past recordings. Turning off transcript generation leaves meeting summaries enabled.

### View transcripts

Start a linked incident meeting and admit the Datadog Transcriber if required. For Zoom, enable meeting captions. After recording starts, open the notebook from any of these locations:

- The **Meeting Transcript** timeline entry.
- The linked meeting's **View Transcript** action.
- The transcript link in the incident Slack channel's meeting-card thread.

The notebook includes an incident card, a link to join the meeting, and a section for each recording session. Updates appear periodically, so recent speech can take time to appear. When recording ends, Datadog finalizes the transcript and the timeline entry changes from **LIVE** to **ENDED**. Only speech captured while the transcriber is recording is included.

[Re-inviting the transcriber](#re-inviting-the-transcriber) adds a session to the same notebook and reuses the meeting's timeline entry, preserving earlier sessions.

### Access and retention

Datadog manages notebook access using the incident's visibility and responder list:

| Incident visibility | While any recording is active | After all recordings end |
| --- | --- | --- |
| Organization-visible | Organization members receive Viewer access. | Organization members receive Editor access. |
| Private | Incident responders receive Viewer access. | Incident responders receive Editor access. |

Your Datadog role must also allow the relevant [notebook actions][11]. Responder and visibility changes update notebook access, and re-inviting the transcriber returns the notebook to Viewer access until recording ends. These updates can take time to appear.

**Note**: Private incidents with more than 49 responders are not fully supported. For an existing notebook, access removals still apply, but additional responders are not granted access while the limit is exceeded.

The subprocessor's seven-day retention period does not delete transcripts saved in Datadog notebooks. Deleting the incident deletes its associated transcript notebooks. Deleting a notebook during recording stops updates to that notebook without removing the transcriber; Datadog does not recreate the notebook for that recording.

## Related incident detection

Incident AI automatically flags related incidents if they are declared within 20 minutes of each other, helping you identify broader systemic issues.

## Chat with Incident AI

Use natural language prompts to request information or take action from Slack:

| Functionality                      | Example prompt                                                                                                                                  |
|------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| Declare an incident                | `@Datadog Declare an incident`                                                                                                                  |
| Change severity                    | `@Datadog Update this incident to SEV-3`                                                                                                        |
| Change status                      | `@Datadog Mark this incident as stable`<br />`@Datadog Resolve this incident`                                                                   |
| Request new summary                | `@Datadog Give me a summary of this incident`<br />`@Datadog Summarize incident-262`<br />**Note**: Private incidents are not summarized.       |
| Search incident history            | `@Datadog How many incidents are currently ongoing?`<br />`@Datadog Show me all Sev-1 incidents that occurred in the past week.`                |
| Dive into specific incidents       | `@Datadog What was the root cause of incident-123?`<br />`@Datadog What remediation actions did the responders take in incident-123?`        |
| Find related incidents             | `@Datadog Are there any related incidents?`<br />`@Datadog Find me incidents related to DDoS attacks from the past month`                       |
| Early detection inquiry            | `@Datadog A customer is unable to check out. Is there an incident?`<br />`@Datadog Are there any incidents now impacting the payments service?` |

## Trigger a Bits Investigation {#bits-ai-investigation}

Start a Bits Investigation directly from your incident Slack channel or the Datadog Incident Management web UI, without leaving your incident response workflow. This reduces context switching during active incidents and allows the AI agent to investigate alongside your team using the same shared context.

Bits Investigation must be enabled for your organization and you can only trigger an investigation from a **properly configured Datadog Incident Management Slack channel**. The Incident Investigation flow only activates when the system detects a valid incident channel.

From Slack, start an investigation during an active incident in any of these ways:

- Click **Investigate with Bits AI** in the incident actions.
- Run the `/dd incident investigate` slash command.
- Type `@Datadog investigate` in the incident channel.

When you use `@Datadog investigate`, you can include additional context inline to help the agent narrow its scope from the start:

| Prompt                      | Behavior                                    |
|-----------------------------|---------------------------------------------|
| `@Datadog investigate we're seeing high error rates in the payments service since the deploy at 2pm` | Triggers investigation with responder-provided focus area |
| `@Datadog investigate, I think this is related to the redis cache` | Triggers investigation with a hypothesis seed |

When triggered, the agent automatically pulls in the incident's timeline, linked telemetry signals (traces, metrics, and logs), and any context you provide in the prompt. It then posts updates back to the channel as a thread reply, with a final root cause summary and recommended next steps surfaced to the broader channel when the investigation completes.

{{< img src="incident_response/incident_management/investigate/incident_ai/Triggering_investigations_slack.png" alt="A Datadog incident Slack channel showing a completed Bits Investigation with root cause findings and a View Full Investigation button." >}}

**From the web UI**, you can trigger an investigation directly from the "Investigation" section on the incident overview page.

{{< img src="incident_response/incident_management/investigate/incident_ai/Triggering_investigations_web.png" alt="The Incident Management overview page showing a completed Bits Investigation in the Investigation section with a View Investigation button." >}}

When triggered, the investigation is embedded in the incident web UI, and Bits Investigation appears as a responder in the Responder Roles section of the page.

For a full walkthrough of the investigation workflow, see [Bits Investigation][8].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /incident_response/incident_management/setup_and_configuration/integrations/slack
[2]: /incident_response/incident_management/setup_and_configuration/templates
[3]: /incident_response/incident_management/post_incident/postmortems
[4]: /incident_response/incident_management/setup_and_configuration/integrations/zoom_integration/#meeting-summaries
[5]: /incident_response/incident_management/setup_and_configuration/integrations/google_meet/#meeting-summaries
[6]: /incident_response/incident_management/setup_and_configuration/integrations/microsoft_teams/#meeting-summaries
[7]: /account_management/billing/incident_response/#allocate-seats
[8]: /bits_ai/bits_investigation
[9]: https://app.datadoghq.com/incidents/settings?section=integrations
[10]: /help/
[11]: /notebooks/#permissions
