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
- **AI-driven incident coordination**: Use conversational prompts in Slack to declare incidents, update status and severity, search incident history, and receive next-step recommendations throughout the incident life cycle.
- **Automated insights and summaries**: Instantly receive incident summaries, AI-generated detection of related and recurring issues, and actionable contributing factors—directly in Slack and Datadog.
- **AI-powered stakeholder updates and postmortems**: Dynamically populate notifications across email, MS Teams, Slack, and more with AI-generated summaries, and generate comprehensive postmortem drafts with executive summaries, impact analysis, timelines, and lessons learned.

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
1. [Chat with Incident AI](#chat-with-incident-ai) in a Slack channel, invite it by running the `@Datadog` command.
1. [Start a Bits AI SRE investigation](#bits-ai-investigation).

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

## Trigger a Bits AI SRE investigation {#bits-ai-investigation}

Start a Bits AI SRE investigation directly from your incident Slack channel or the Datadog Incident Management web UI, without leaving your incident response workflow. This reduces context switching during active incidents and allows the AI agent to investigate alongside your team using the same shared context.

Bits AI SRE must be enabled for your organization and you can only trigger an investigation from a **properly configured Datadog Incident Management Slack channel**. The Incident Investigation flow only activates when the system detects a valid incident channel.

**From Slack,** type `@Datadog investigate` in the incident channel to kick off an investigation during an active incident. You can include additional context inline to help the agent narrow its scope from the start:

| Prompt                      | Behavior                                    |
|-----------------------------|---------------------------------------------|
| `@Datadog investigate we're seeing high error rates in the payments service since the deploy at 2pm` | Triggers investigation with responder-provided focus area |
| `@Datadog investigate, I think this is related to the redis cache` | Triggers investigation with a hypothesis seed |

When triggered, the agent automatically pulls in the incident's timeline, linked telemetry signals (traces, metrics, and logs), and any context you provide in the prompt. It then posts updates back to the channel as a thread reply, with a final root cause summary and recommended next steps surfaced to the broader channel when the investigation completes.

{{< img src="incident_response/incident_management/incident_ai/Triggering_investigations_slack.png" alt="A Datadog incident Slack channel showing a completed Bits AI SRE investigation with root cause findings and a View Full Investigation button" style="width:80%;" >}}

**From the web UI**,  you can trigger an investigation directly from the "Investigation" section on the incident overview page.

{{< img src="incident_response/incident_management/incident_ai/Triggering_investigations_web.png" alt="The Incident Management overview page showing a completed Bits AI SRE investigation in the Investigation section with a View Full Investigation button" >}}

When triggered, the investigation is embedded in the incident web UI, and Bits AI SRE appears as a responder in the Responder Roles section of the page.


For setup instructions and prerequisites, see the [Slack Integration][7] documentation. For a full walkthrough of the investigation workflow, see [Bits AI SRE][8].

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
[7]: /integrations/slack/?tab=datadogforslack
[8]: /bits_ai/bits_ai_sre
