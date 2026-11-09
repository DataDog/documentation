---
title: Live Meeting Transcripts
description: Follow incident meeting conversation in a live notebook, and review the conversation after the meeting ends.
further_reading:
- link: "/incident_response/incident_management/investigate/timeline"
  tag: "Documentation"
  text: "Use the incident timeline"
- link: "/incident_response/incident_management/investigate/incident_ai/#meeting-summaries"
  tag: "Documentation"
  text: "Generate and review AI meeting summaries"
- link: "/notebooks/"
  tag: "Documentation"
  text: "Work with Datadog Notebooks"
---

## Overview

Live meeting transcripts save the conversation from an incident's Zoom, Google Meet, or Microsoft Teams meeting in a Datadog notebook. The notebook updates during the meeting and includes speaker names and timestamps displayed in your time zone. Use it to catch up on the conversation or review it after the meeting ends.

A transcript records the conversation, while an [AI meeting summary][1] condenses the discussion into key points. Enabling meeting summaries alone does not create a transcript notebook.

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Live meeting transcripts are not available for your selected Datadog site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Enable meeting transcripts

Your organization must have access to live meeting transcripts and AI features. Connect a supported meeting integration and use an account with permission to edit incident settings.

1. Go to [**Incident Settings > Integrations**][2] and select the incident type to configure.
2. Select **Zoom**, **Google Meet**, or **Microsoft Teams**. For Microsoft Teams, select the connected tenant.
3. Enable meeting creation and **Generate AI meeting summaries** for that integration.
4. Review the conditions that prevent summarization. These conditions also determine whether the transcriber can record the meeting. By default, private incidents are excluded.
5. Enable **Generate meeting transcripts** and save your settings.

If **Generate meeting transcripts** is not available, contact [Datadog Support][3]. For provider-specific prerequisites, see the [Zoom][4], [Google Meet][5], or [Microsoft Teams][6] setup guide.

Setting changes apply to recordings that start after you save the settings. They do not change recordings that are in progress or have ended, and do not create notebooks for past recordings. Turning off transcript generation leaves meeting summaries enabled.

## Start and view a transcript

Start a meeting linked to the incident. The Datadog Transcriber must join and begin recording before the transcript appears. If the meeting has a lobby or waiting room, admit the transcriber. For Zoom, enable meeting captions.

After the notebook is created, open it from any of these locations:

- The **Meeting Transcript** entry on the incident timeline.
- **View Transcript** beside the linked meeting in the incident header's meeting menu.
- The transcript link in the incident Slack channel's meeting-card thread, when a meeting card is available.

The notebook title identifies the meeting provider and incident. At the top, an incident card links back to the incident, and a meeting link lets you join the associated call. Each recording has its own session section containing the conversation. Updates appear periodically, so the most recent speech can take time to appear.

When recording ends, the timeline entry changes from **LIVE** to **ENDED** and Datadog finalizes that session's transcript. A transcript only covers speech captured while the transcriber is recording.

### Resume recording in the same meeting

If the transcriber leaves, use **Add Transcriber** in the incident header's meeting menu to [re-invite it][7]. Admit it again if required. The new recording adds a session section to the same notebook and reuses the meeting's timeline entry. Earlier sessions remain in the notebook.

## Notebook access

Datadog manages transcript notebook access using the incident's visibility and responder list:

| Incident visibility | While any recording is active | After all recordings end |
| --- | --- | --- |
| Organization-visible | Organization members receive Viewer access. | Organization members receive Editor access. |
| Private | Incident responders receive Viewer access. | Incident responders receive Editor access. |

Your Datadog role must also allow the relevant notebook actions. For more information, see [Notebook permissions][8].

Adding or removing a responder from a private incident updates their notebook access. Changing incident visibility also updates notebook access. These updates can take time to appear. Re-inviting the transcriber returns the notebook to Viewer access for the organization or responders until recording ends again.

**Note**: Private incidents with more than 49 responders are not fully supported. For an existing notebook, access removals still apply, but access for additional responders is not granted while the limit is exceeded.

## Retention and deletion

The meeting transcription subprocessor deletes its recording and transcript data after seven days. This retention period does not delete the transcript saved in the Datadog notebook.

Deleting the incident also deletes its associated transcript notebooks. If you delete a transcript notebook while a recording is active, Datadog stops writing to that notebook and does not recreate it for that recording. Deleting the notebook does not remove the transcriber from the meeting.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /incident_response/incident_management/investigate/incident_ai/#meeting-summaries
[2]: https://app.datadoghq.com/incidents/settings?section=integrations
[3]: /help/
[4]: /incident_response/incident_management/setup_and_configuration/integrations/zoom_integration/
[5]: /incident_response/incident_management/setup_and_configuration/integrations/google_meet/
[6]: /incident_response/incident_management/setup_and_configuration/integrations/microsoft_teams/
[7]: /incident_response/incident_management/investigate/incident_ai/#re-inviting-the-transcriber
[8]: /notebooks/#permissions
