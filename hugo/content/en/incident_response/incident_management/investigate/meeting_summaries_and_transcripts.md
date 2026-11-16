---
title: Use Meeting Summaries and Transcripts
description: "Review AI meeting summaries, view live meeting transcripts, and re-invite the Datadog Transcriber during a Datadog incident."
further_reading:
- link: "/incident_response/incident_management/investigate/incident_ai"
  tag: "Documentation"
  text: "Learn about Incident AI"
- link: "/incident_response/incident_management/investigate/timeline"
  tag: "Documentation"
  text: "Learn about the incident timeline"
---

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Meeting summaries and live meeting transcripts are not available for your selected Datadog site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Overview

The Datadog Transcriber can join an incident's linked Zoom, Google Meet, or Microsoft Teams meeting to produce AI meeting summaries and live meeting transcripts. This page describes how to review summaries, view transcripts, and re-invite the transcriber during an incident.

To set up these features, see the integration page for your meeting platform: [Zoom][1], [Google Meet][2], or [Microsoft Teams][3].

## How the Datadog Transcriber joins a meeting

When a meeting attached to an incident starts, the Datadog Transcriber attempts to join the meeting. Joining can take 10 to 30 seconds. If the meeting has a lobby or waiting room, a participant must admit the Datadog Transcriber before transcription can begin.

## Meeting summaries

After the Datadog Transcriber joins, it periodically posts live summaries to the following locations during the meeting:

- The **incident timeline**, under a **Meeting Summary** entry.
- The **incident chat channel**, both in the meeting card thread and as a message to the channel.

When the meeting ends, the Datadog Transcriber posts a final post-meeting summary to the same locations.

### Review a meeting summary

After a summary is posted, you can approve it, edit its text, or reject it. You can take these actions from the incident timeline in Datadog, or from the incident chat channel if the summary was broadcast there.

To review a summary from the incident timeline:

1. Open the incident in Datadog and find the **Meeting Summary** entry on the timeline.
2. Click the checkmark icon to approve the summary, the pencil icon to edit its text, or the reject icon to remove it from the timeline.

When a user approves or edits a summary, Datadog records who did so. After a summary is edited, it can't be approved; the edited version takes precedence. Rejecting a summary removes it from the incident timeline for everyone and hides its content in connected chat channels. Datadog asks for confirmation before rejecting, because that action can't be undone.

If the summary was broadcast to the incident chat channel, use the **Approve**, **Edit**, or **Reject summary** buttons on the message.

## Live meeting transcripts

Live meeting transcripts save the conversation from an incident meeting in a Datadog notebook, with speaker names and timestamps in your time zone. The notebook updates during the meeting and remains available afterward.

### View a transcript

After recording starts, open the transcript notebook from any of these locations:

- The **Meeting Transcript** entry on the incident timeline.
- The **View Transcript** action in the menu for the linked meeting, in the incident header.
- The transcript link in the meeting-card thread of the incident Slack channel.

The notebook includes an incident card, a link to join the meeting, and a section for each recording session. The notebook includes only speech captured while the transcriber is recording.

When recording ends, Datadog finalizes the transcript, and the timeline entry changes from **LIVE** to **ENDED**. If you re-invite the transcriber, Datadog adds a session to the same notebook and reuses the meeting's timeline entry. Earlier sessions are preserved.

### Notebook access

Datadog manages transcript notebook access using the incident's visibility and responder list:

| Incident visibility | While any recording is active | After all recordings end |
| --- | --- | --- |
| Organization-visible | Organization members receive Viewer access. | Organization members receive Editor access. |
| Private | Incident responders receive Viewer access. | Incident responders receive Editor access. |

Changes to responders or incident visibility update notebook access. Re-inviting the transcriber returns the notebook to Viewer access until recording ends. Access updates can take time to appear.

### Transcript retention and deletion

<!-- TODO (author): State how long transcript notebooks are retained (for example, until the notebook or incident is deleted). -->

The subprocessor's seven-day retention period does not apply to transcripts saved in Datadog notebooks. Deleting the incident deletes its associated transcript notebooks.

If you delete a notebook during recording, updates to that notebook stop, and Datadog does not recreate it for that recording. The transcriber stays in the meeting.

## Re-invite the Datadog Transcriber

If the Datadog Transcriber leaves a meeting, re-invite it to the same linked meeting to resume summarization and transcription:

1. Open the incident in Datadog.
2. In the incident header, open the menu for the linked meeting.
3. Click **Add Transcriber** (the robot icon) beside the meeting.
4. If required, admit the Datadog Transcriber from the meeting lobby or waiting room so transcription can begin.

The robot icon shows whether the transcriber is joining or already in the meeting. If you cannot add the transcriber, hover over the icon to see the reason.

A re-invite prompt can also appear in the incident's Slack or Microsoft Teams meeting-card thread after the transcriber leaves. This can happen after a timeout while waiting for admission or participants, after everyone leaves the meeting, or when someone removes the transcriber. Select **Yes** to re-invite the transcriber or **No** to dismiss the prompt.

Re-inviting requires permission to edit the incident and, for organizations with seat-based billing, an [Incident Management or Incident Response seat][4]. Re-inviting does not override conditions that prevent summarization, including the default exclusion for private incidents.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /incident_response/incident_management/setup_and_configuration/integrations/zoom_integration/#meeting-summaries
[2]: /incident_response/incident_management/setup_and_configuration/integrations/google_meet/#meeting-summaries
[3]: /incident_response/incident_management/setup_and_configuration/integrations/microsoft_teams/#meeting-summaries
[4]: /account_management/billing/incident_response/#allocate-seats
