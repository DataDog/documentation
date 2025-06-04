---
title: Coordinate incidents
further_reading:
- link: "https://www.datadoghq.com/blog/bits-ai-for-incident-management/"
  tag: "Blog"
  text: "Stay up to date on the latest incidents with Bits AI"
- link: "bits_ai/"
  tag: "Documentation"
  text: "Bits AI Overview"
- link: "bits_ai/chat_with_bits/"
  tag: "Documentation"
  text: "Chat with Bits"
aliases:
- /bits_ai/managing_incidents/
---

## Get started with coordinating incidents

Bits SRE helps coordinate incidents—especially those involving multiple teams—by suggesting next steps throughout the incident lifecycle. This streamlines communication and improves overall process management.

<div class="alert alert-info">These features require <a href="/service_management/incident_management/">Datadog Incident Management</a>.</div>


1. Connect Datadog to Slack.
   1. In Slack, run the `/dd connect` command.
   1. Follow the on-screen prompts to complete the connection process. 
1. Enable the Slack integration in Datadog Incident Management.
   1. Navigate to Incident > Settings > Integrations > Slack.
   1. Enable the following toggles:
      - Push Slack channel messages to the incident timeline
      - Activate Bits AI features in incident Slack channels for your organization<br />
      **Note**: Bits AI's incident management features can only be activated for one Datadog organization within a single Slack workspace.
1. To interact with Bits AI in a Slack channel, invite it by running the `@Datadog` command.


<!-- ## Overview

<div class="alert alert-warning">The following features are part of the <a href="https://www.datadoghq.com/product/incident-management/">Datadog Incident Management</a> product.</div>

Bits AI simplifies incident management processes, improves collaboration, and provides valuable support for incident responders, making it a beneficial tool for efficient incident resolution.

## Prerequisites

- Your Datadog account must be connected to Slack. Running the `/dd` connect command automatically initiates this process, which can be completed by following the prompts.
- In **[Incident > Settings > Integrations][3] > Slack**, enable the **Push Slack channel messages to the incident timeline** and **Activate Bits AI features in incident Slack channels for your organization** toggles. This allows Datadog to ingest Slack conversations into the incident timeline to generate summaries and postmortems. **Note**: Bits AI's incident management features can only be activated for one Datadog organization within a single Slack workspace.   
- To ask Bits AI questions about incidents from any Slack channel, you must invite Bits AI to that channel. Run the `@Datadog` command and follow the instructions on the screen. 

{{< img src="bits_ai/managing_incidents/bitsai_slack_prerequisites.png" alt="Slack integration settings in Datadog" style="width:90%;">}}

## View incident summaries

When you join an incident channel in Slack, you automatically receive a summary of the incident. The channel must be connected to Incident Management and **have at least ten messages**. The summary, which is only visible to you, does not persist across reloads, between desktop and mobile apps, or across sessions.

At any time, you can ask for a fresh summary within the incident channel by asking `@Datadog Give me a summary of this incident`. You can also ask for summaries from other channels by referencing the incident number. For example, `@Datadog Give me a summary of incident-262`. 

## Search across your entire incident history and ask questions

You can ask Bits AI to find incidents that you're looking for. For instance,
- `@Datadog How many incidents are currently ongoing?`
- `@Datadog Show me all Sev-1 incidents that occurred in the past week`

You can then investigate further and ask questions about those incidents, like `@Datadog What was the root cause of incident-123?` or `@Datadog What remediation actions did the responders take in incident-123?`

Bits AI can also perform semantic searches for related incidents. If you're responding to an incident, you can ask Bits AI to find other active incidents that look similar to the one you're in (`@Datadog Are there any related incidents?`). Bits AI looks for incidents that were active within the past two hours. You can also specify the time frame you want Bits AI to look across. If you say `@Datadog Find me incidents related to DDOS attacks from the past month`, Bits AI returns both active and resolved DDOS incidents from the past month. 

Or, if you suspect there's an issue before an incident is even declared, you can ask Bits AI a question like `@Datadog A customer is unable to check out. Is there an incident?` or `@Datadog Are there any incidents now impacting the payments service?` 

## Manage incidents

Without going into the Datadog web app, you can ask Bits AI in Slack to:
- Open an incident: `@Datadog Declare an incident`
- Change an incident's severity level: `@Datadog Update this incident to SEV-3`
- Change an incident's status: `@Datadog Mark this incident as stable`

## Generate a first draft of a postmortem

To generate an AI-assisted postmortem draft:

1. Navigate to the incident which you'd like to generate a postmortem for in Datadog. 
2. Ensure that the incident is resolved and that its timeline has ten or more messages.
3. Click the **Generate Postmortem** button.
4. Select the either the out-of-the-box **General incident with AI content** template or a [custom template](#customize-postmortem-templates-with-ai-incident-variables) that you've created. 
6. Allow up to one minute for the postmortem to be generated. Do not close the tab during this time.
7. Review the generated postmortem. AI-generated postmortems serve as a first draft to help your incident responders get started, and they require human revisions.

## Customize postmortem templates with AI incident variables 

1. Navigate to [**Service Mgmt > Incidents > Settings > Postmortems**][1].
2. Click **New Postmortem Template** and customize your template using the provided incident variables.  
   - Variables prefixed by `ai` yield AI-generated content instead of fixed values. There are six `ai` variables: `{{incident.ai_action_items}}`, `{{incident.ai_customer_impact}}`, `{{incident.ai_key_timeline}}`, `{{incident.ai_lessons_learned}}`, `{{incident.ai_summary}}`, and `{{incident.ai_system_overview}}`. 
    - You must use a heading before each variable.
3. Save your template to make it available as a template option during postmortem generation.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/incidents/settings#Postmortems
[2]: https://app.datadoghq.com/incidents
[3]: https://app.datadoghq.com/incidents/settings#Integrations -->
