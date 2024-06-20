---
title: Managing Incidents
further_reading:
- link: "https://www.datadoghq.com/blog/bits-ai-for-incident-management/"
  tag: "Blog"
  text: "Stay up to date on the latest incidents with Bits AI"
- link: "bits_ai/"
  tag: "Documentation"
  text: "Bits AI Overview"
- link: "bits_ai/getting_started"
  tag: "Documentation"
  text: "Getting Started"
- link: "bits_ai/query_examples"
  tag: "Documentation"
  text: "Example Natural Language Queries"
---

## Overview

<div class="alert alert-warning">The following features are part of the <a href="https://www.datadoghq.com/product/incident-management/">Datadog Incident Management</a> product.</div>

Bits AI simplifies incident management processes, improves collaboration, and provides valuable support for incident responders, making it a beneficial tool for efficient incident resolution.

## Prerequisites

- Your Datadog account must be connected to Slack. Running the `/dd` connect command automatically initiates this process, which can be completed by following the prompts.
- In **[Incident > Settings > Integrations][3] > Slack**, enable the **Push Slack channel messages to the incident timeline** and **Activate Bits AI features in incident Slack channels for your organization** toggles. This allows Datadog to ingest Slack conversations into the incident timeline to generate summaries and postmortems. **Note**: a Slack workspace can only have Bits AI activated for one Datadog organization.   
- Incident channels you'd like to work with Bits AI must be prefixed with `#incident-`. 
- To ask Bits AI questions about incidents from any Slack channel, you must invite Bits AI to that channel. Run the `@Datadog` command and follow the instructions on the screen. 

{{< img src="bits_ai/managing_incidents/bitsai_slack_prerequisites.png" alt="Slack integration settings in Datadog" style="width:90%;">}}

## View incident summaries

When you join an incident channel in Slack, you automatically receive a summary of the incident. The channel must be connected to Incident Management and **have at least ten messages**. The summary, which is only visible to you, does not persist across reloads, between desktop and mobile apps, or across sessions.

At any time, you can ask for a fresh summary by asking `@Datadog Give me a summary of this incident`. 

## Search across your entire incident history and ask questions

You can ask Bits AI to find incidents that you're looking for. For instance,
- `@Datadog How many incidents are currently ongoing?`
- `@Datadog Show me all Sev-1 incidents that occurred in the past week`

You can then investigate further and ask questions about those incidents, like `@Datadog What was the root cause of incident-123?` or `@Datadog What remediation actions did the responders take in incident-123?`

Bits AI can also perform semantic searches for related incidents. If you're responding to an incident, you can ask Bits AI to find other active incidents that look similar to the one you're in (`@Datadog Are there any related incidents?`). Bits AI looks for incidents that were active within the past two hours. You can also specify the time frame you want Bits AI to look across. If you say `@Datadog Find me incidents related to DDOS attacks from the past month`, Bits AI returns both active and resolved DDOS incidents from the past month. 

Or, if you suspect there's an issue before an incident is even declared, you can ask Bits AI a question like `@Datadog A customer is unable to check out. Is there an incident?` or `@Datadog Are there any incidents now impacting the payments service?` 

**Note**: Incident search is limited to the past 120 days.

## Manage incidents

Without going into the Datadog web app, you can ask Bits AI in Slack to:
- Open an incident: `@Datadog Declare an incident`
- Change an incident's severity level: `@Datadog Update this incident to SEV-3`
- Change an incident's status: `@Datadog Mark this incident as stable`

## Generate a first draft of a postmortem

<div class="alert alert-info">AI-assisted postmortem drafting is in private beta.</div>

To generate an AI-assisted postmortem draft:

1. Navigate to the incident page in Datadog. For example, to view Incident 2679, you might search for `2679` on the [**Incidents**][2] page and click the relevant match.
1. Ensure that the incident is resolved and that the timeline has ten or more messages.
1. Click the **Generate Postmortem** button.
1. Select the AI template.
1. Allow up to one minute for the postmortem to be generated. Do not close the tab during this time.
1. Review the generated postmortem. AI-generated postmortems serve as a first draft to help your incident responders get started, and they require human revisions.

## Replace an existing postmortem

If an incident already has a linked postmortem, you can unlink it before [generating a new postmortem](#generate-a-first-draft-of-a-postmortem). All postmortems are still accessible in the incident's Notebook.

1. Navigate to the incident page in Datadog. For example, to view Incident 2679, you might search for `2679` on the [**Incidents**][2] page and click the relevant match.
1. Click **Postmortem**.
1. Click the trash icon.

## Customize the postmortem template

1. Navigate to [**Service Mgmt > Incident > Settings > Postmortems**][1].
1. Click **New Postmortem Template** and customize your template using the provided incident variables.  
    - Variables prefixed by `ai`, such as `incident.ai_action_items`, yield AI-generated content instead of fixed values.
    - You must use a heading before each variable.
1. Save your template to make it available as a template option during [postmortem generation](#generate-a-first-draft-of-a-postmortem).


## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/incidents/settings#Postmortems
[2]: https://app.datadoghq.com/incidents
[3]: https://app.datadoghq.com/incidents/settings#Integrations