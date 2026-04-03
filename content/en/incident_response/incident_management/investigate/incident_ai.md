---
title: Incident AI
description: "Learn how to use Incident AI to automate incident coordination, generate summaries, send notifications, and create AI-assisted postmortems."
aliases:
- /bits_ai/managing_incidents/
- /bits_ai/bits_ai_sre/coordinate_incidents
- /service_management/incident_management/incident_ai/
- /incident_response/incident_management/incident_ai
further_reading:
- link: "/bits_ai/bits_ai_sre/"
  tag: "Documentation"
  text: "Learn about Bits AI SRE"
---

## Overview

Incident AI transforms how your team manages incidents by automating coordination tasks and providing intelligent insights throughout the incident lifecycle. Built into Datadog Incident Management, it works in Slack and the Datadog platform to help you respond faster and learn from every incident.

Key capabilities include:
- **Incident summaries**: Get context-aware summaries when you join incident channels.
- **Related incident detection**: Automatic detection of related incidents to identify systemic issues and recurring issues.
- **Request information or take action**: Declare incidents, update severity and status, search incident history, and more—all through conversational prompts in Slack.
- **AI-enhanced notifications**: Dynamically populate stakeholder updates with AI-generated summaries of contributing factors, impact, and remediation across email, MS Teams, Slack, and other channels.
- **Automated follow-ups**: Incident AI collects action items mentioned during incidents and suggests them as follow-up tasks when the incident is resolved.
- **Intelligent postmortems**: Generate comprehensive first drafts with AI-powered sections covering executive summaries, timelines, customer impact, and lessons learned—giving responders a strong foundation to build on.

## Get started with incident coordination

Incident AI helps coordinate incidents—especially those involving multiple teams—by suggesting next steps throughout the incident lifecycle. This streamlines communication and improves overall process management.

1. Connect Datadog to Slack.
   1. In any Slack channel, run the `/dd connect` command.
   1. Follow the on-screen prompts to complete the connection process.
1. Enable the Slack integration in Datadog Incident Management.
   1. In the [Integrations][4] section of the Incidents settings page, find the **Slack** settings.
   1. Enable the following toggles:
      - **Push Slack channel messages to the incident timeline**
      - **Activate Incident AI features in incident Slack channels for your organization**<br />
      **Note**: Incident AI's incident management features can only be activated for one Datadog organization within a single Slack workspace.
1. To interact with Incident AI in a Slack channel, invite it by running the `@Datadog` command.

## Customize stakeholder notifications

Incident AI can dynamically populate key details in stakeholder notifications, delivering clearer, faster updates across the tools your team already uses. Notification rules support delivery to a wide variety of destinations, including email, Datadog On-Call, MS Teams, Slack, and more, ensuring AI-enhanced updates reach the right people, on the right platform, at the right time.

1. In your Incidents settings, go to [Notification Templates][1].
1. Create a new template or edit an existing one.
1. In the message body, insert any of the following AI variables:
   <table>
    <thead>
        <tr>
            <th>Field</th>
            <th>Variable</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>AI Contributing Factors</td>
            <td><code>{{incident.ai_contributing_factors}}</code></td>
        </tr>
        <tr>
            <td>AI Impact</td>
            <td><code>{{incident.ai_impact}}</code></td>
        </tr>
        <tr>
            <td>AI Issue</td>
            <td><code>{{incident.ai_issue}}</code></td>
        </tr>
        <tr>
            <td>AI Remediation</td>
            <td><code>{{incident.ai_remediation}}</code></td>
        </tr>
    </tbody>
   </table>
   {{< img src="service_management/incidents/incident_ai/message_template_variables.png" alt="New message template with AI variables in it" style="width:100%;" >}}
1. Click **Save** to save the template.
1. Go to your incident [Notification Rules][2].
1. Click **New Rule**.
1. Under **With template...**, select the message template you just created.
1. Click **Save** to save the notification rule.

## Proactive incident summaries

When you join an incident channel in Slack (connected to Datadog Incident Management), Incident AI automatically posts a summary containing key information about the incident such as the contributing factors, impact, issue, and remediation. This can also be requested ad-hoc using `/dd incident summary`. This summary is only visible to you.

When an incident is changed to resolved, Incident AI posts a final summary. This is visible to everyone in the channel.

{{< img src="service_management/incidents/incident_ai/incident_summary.png" alt="Example incident summary in Slack" style="width:100%;" >}}

## Proactive follow-up task suggestion

After an incident is resolved, Incident AI collects any follow-up tasks responders mentioned during the incident. It then prompts you to review and create them with a single click. These tasks are saved as Incident Follow-Ups in Datadog Incident Management. For more information, see [Incident Follow-ups][5].

To view suggested follow-up tasks:
1. Navigate to the relevant incident in Datadog.
1. Open the **Post-Incident** tab to view a list of all follow-up tasks you've saved from Slack.

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

## Trigger a Bits AI SRE investigation from incident Slack channels or the web UI

Start a Bits AI SRE investigation directly from your incident Slack channel or the Datadog Incident Management web UI, without leaving your incident response workflow. This reduces context switching during active incidents and allows the AI agent to investigate alongside your team using the same shared context.

**Prerequisites**
Before using this feature, verify the following:
- **Bits AI SRE** is enabled for your organization.
- **Datadog Incident Management** is configured with Slack integration. See the Slack Integration Guide for setup instructions.
- **Datadog Slack write** permissions are enabled for your workspace. This is a common issue, so if Bits AI SRE does not respond in the channel, check this first.
- You are triggering from a **properly configured Datadog Incident Management Slack channel**. The Incident Investigation flow only activates when the system detects a valid incident channel. Triggering from a non-incident channel falls back to a General Investigation.

**From Slack,** type `@Datadog investigate` in the incident channel to kick off an investigation during an active incident. You can include additional context inline to help the agent narrow its scope from the start:

| Prompt                      | Behavior                                    |
|-----------------------------|---------------------------------------------|
| `@Datadog investigate we're seeing high error rates in the payments service since the deploy at 2pm` | Triggers investigation with responder-provided focus area |
| `@Datadog investigate, I think this is related to the redis cache` | Triggers investigation with a hypothesis seed |
                                                                                                        
When triggered, the agent automatically pulls in the incident’s timeline, linked telemetry signals (traces, metrics, and logs), and any context you provide in the prompt. It then posts updates back to the channel as a thread reply, with a final root cause summary and recommended next steps surfaced to the broader channel when the investigation completes.

<img width="434" height="607" alt="Trigger Bits AI SRE investigations from incident Slack channels" src="https://github.com/user-attachments/assets/8784b425-21a4-424e-a43d-27c19f9a03c3" />

**From the web UI,** you can trigger an investigation directly from the “Investigation” section on the overview page of the incident without switching to Slack.

<img width="3024" height="1650" alt="Bits AI SRE investigation button" src="https://github.com/user-attachments/assets/531ea1cb-d39a-48ab-98a9-74adcb1d0949" />
<img width="1512" height="825" alt="Bits AI SRE investigation on web ui concluded" src="https://github.com/user-attachments/assets/e7d29e2d-5368-4d65-806f-2fe7a391caea" />

When triggered, the investigation is embedded in the incident web UI, and Bits AI SRE appears as a responder in the Responder Roles section of the page.

**Best practices**
- **Provide context at trigger time.** Early in an incident, the timeline may have few entries and limited linked signals. Include a description of the problem or links to relevant telemetry in your `@Datadog investigate` prompt to improve the quality and confidence of findings.
- **Link telemetry signals before investigating.** Investigations with two or more linked Datadog telemetry signals are treated as high-context and produce higher-confidence root cause hypotheses. Link traces, metrics, or logs to the incident before triggering.
- **One investigation at a time.** Only one active investigation per incident is supported. If an investigation is already running when you send `@Datadog investigate`, the system notifies you and links the existing investigation. You can start a new investigation after the current one completes.

For setup instructions and prerequisites, see [Slack Integration Guide](https://docs.datadoghq.com/integrations/slack/?tab=datadogforslack). For a full walkthrough of the investigation workflow, see the [Bits AI SRE Guide](https://docs.datadoghq.com/bits_ai/bits_ai_sre).

## Customize postmortem templates with AI incident variables

1. In Datadog, navigate to your incident [Postmortem Templates][3].
1. Click **New Postmortem Template**.
1. Customize your template using the following AI variables for dynamic AI-generated content:
   | Description                         | Variable                          |
   |-------------------------------------|-----------------------------------|
   | Executive summary                   | `{{incident.ai_summary}}`         |
   | System context and dependencies     | `{{incident.ai_system_overview}}` |
   | Key event timeline                  | `{{incident.ai_key_timeline}}`    |
   | Summary of customer impact          | `{{incident.ai_customer_impact}}` |
   | Follow-up actions                   | `{{incident.ai_action_items}}`    |
   | Key takeaways for future prevention | `{{incident.ai_lessons_learned}}` |
   <p><strong>Note</strong>: AI variables must be preceded by a section header.</p>
1. Click **Save**. Your new template appears as a template option during postmortem generation.

## Generate a first draft of the incident postmortem

To generate an AI-assisted postmortem draft:
1. In Datadog, navigate to the resolved incident you'd like to generate a postmortem for.
1. Ensure the incident timeline contains at least 10 messages.
1. Click **Generate Postmortem**.
1. Under **Choose Template**, select either the out-of-the-box **General incident with AI content** template, or a custom template that you've created.
1. Click **Generate**. Allow up to one minute for the postmortem to be generated. Do not close the tab during this time.
1. Review the AI-generated postmortem draft. It serves as a starting point for your incident responders. Datadog recommends reviewing and refining the draft before sharing it.

For more information on generating and managing postmortems, see [Incident Postmortems][6].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/incidents/settings?section=message-templates
[2]: https://app.datadoghq.com/incidents/settings?section=notification-rules
[3]: https://app.datadoghq.com/incidents/settings?section=postmortem-templates
[4]: https://app.datadoghq.com/incidents/settings?section=integrations
[5]: /incident_response/incident_management/post_incident/follow-ups
[6]: /incident_response/incident_management/post_incident/postmortems
