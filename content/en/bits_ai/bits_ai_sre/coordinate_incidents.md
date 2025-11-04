---
title: Coordinate Incidents
description: "Use Bits AI SRE to streamline incident response workflow with proactive updates, stakeholder notifications, and AI-assisted postmortems."
further_reading:
- link: "https://www.datadoghq.com/blog/bits-ai-for-incident-management/"
  tag: "Blog"
  text: "Stay up to date on the latest incidents with Bits AI"
aliases:
- /bits_ai/managing_incidents/
---

In the heat of an incident, Bits AI SRE handles general incident coordination so you can focus on resolution. From proactive updates to AI-assisted postmortems, Bits streamlines your incident response workflow in Slack and Datadog.

## Get started with incident coordination

Bits AI SRE helps coordinate incidents—especially those involving multiple teams—by suggesting next steps throughout the incident lifecycle. This streamlines communication and improves overall process management.

<div class="alert alert-info">These features require <a href="/service_management/incident_management/">Datadog Incident Management</a>.</div>

1. Connect Datadog to Slack.
   1. In Slack, run the `/dd connect` command.
   1. Follow the on-screen prompts to complete the connection process. 
1. Enable the Slack integration in Datadog Incident Management.
   1. In the [Integrations][4] section of the Incidents settings page, find the **Slack** settings.
   1. Enable the following toggles:
      - **Push Slack channel messages to the incident timeline**
      - **Activate Bits AI features in incident Slack channels for your organization**<br />
      **Note**: Bits AI's incident management features can only be activated for one Datadog organization within a single Slack workspace.
      {{< img src="bits_ai/coordinate_incidents_slack_settings.png" alt="Slack integration settings with the specified toggles enabled" style="width:100%;" >}}
1. To interact with Bits AI in a Slack channel, invite it by running the `@Datadog` command.

## Customize stakeholder notifications 

Bits can dynamically populate key details in stakeholder notifications—delivering clearer, faster updates across the tools your team already uses. Notification rules support delivery to a wide variety of destinations, including email, Datadog On-Call, MS Teams, Slack, and more, ensuring AI-enhanced updates reach the right people—on the right platform—at the right time.

1. In your Incidents settings, go to [Message Templates][1].
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
   {{< img src="bits_ai/message_template_variables.png" alt="New message template with AI variables in it" style="width:100%;" >}}
1. Click **Save** to save the template.
1. Go to your incident [Notification Rules][2].
1. Click **New Rule**.
1. Under **With template...**, select the message template you just created.
1. Click **Save** to save the notification rule.

## Proactive incident summaries

When you join an incident channel in Slack (connected to Datadog Incident Management), Bits automatically posts a summary containing key information about the incident such as the contributing factors, impact, issue, and remediation. This summary is only visible to you. 

When an incident is changed to resolved, Bits posts a final summary. This is visible to everyone in the channel.

{{< img src="bits_ai/incident_summary.png" alt="Example incident summary in Slack" style="width:100%;" >}}

## Related incident detection

Bits automatically flags related incidents if they are declared within 20 minutes of each other, helping you identify broader systemic issues. 

## Chat with Bits AI SRE about incidents

Use natural language prompts to request for information or take action from Slack:

| Functionality                      | Example prompt                                                                                                                                  |
|------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| Declare an incident                | `@Datadog Declare an incident`                                                                                                                  |
| Change severity                    | `@Datadog Update this incident to SEV-3`                                                                                                        |
| Change status                      | `@Datadog Mark this incident as stable`<br />`@Datadog Resolve this incident`                                                                   |
| Request new summary                | `@Datadog Give me a summary of this incident`<br />`@Datadog Summarize incident-262`<br />**Note**: Private incidents are not summarized.       |
| Search incident history            | `@Datadog How many incidents are currently ongoing?`<br />`@Datadog Show me all Sev-1 incidents that occurred in the past week.`                |
| Dive into specific incidents       | `@Datadog What was the root cause of incident-123?` Or<br />`@Datadog What remediation actions did the responders take in incident-123?`        |
| Find related incidents             | `@Datadog Are there any related incidents?`<br />`@Datadog Find me incidents related to DDOS attacks from the past month`                       |
| Early detection inquiry            | `@Datadog A customer is unable to check out. Is there an incident?`<br />`@Datadog Are there any incidents now impacting the payments service?` |

## Proactive follow-up task suggestion

After an incident is resolved, Bits collects any follow-up tasks responders mentioned during the incident. It then prompts you to review and create them with a single click. These tasks are saved as Incident Follow-Ups in Datadog Incident Management.

To view suggested follow-up tasks:
1. Navigate to the relevant incident in Datadog.
1. Open the **Remediation** tab to view a list of all follow-up tasks you've saved from Slack.

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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/incidents/settings?section=message-templates
[2]: https://app.datadoghq.com/incidents/settings?section=notification-rules
[3]: https://app.datadoghq.com/incidents/settings?section=postmortem-templates
[4]: https://app.datadoghq.com/incidents/settings?section=integrations
