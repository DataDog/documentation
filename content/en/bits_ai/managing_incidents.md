---
title: Managing Incidents
kind: guide
disable_toc: false
private: true
is_beta: true
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLSd2kcOeLhEX0GSwUIMQyFjRCRirU-vpsJTOx7SykDkxy-MW9w/viewform" >}}
Bits AI is in private beta. Fill out this form to join the wait list.
{{< /callout >}}

<div class="alert alert-warning">The following features are part of the <a href="https://www.datadoghq.com/product/incident-management/">Datadog Incident Management</a> product.</div>

## Prerequisites

- Make sure you've enabled the "Mirror all incident Slack channel messages to its incident timeline in real-time" in **[Incident > Settings > Integrations][3] > Slack**. This allows Datadog to generate summaries and postmortems from Slack conversations.
- The incident channel name must be prefixed with `#incident-`. This enables you to use Bits AI in Slack (`@Datadog`) to ask questions about the incident.
- Your Datadog account must be connected to Slack. Running a query automatically initiates this process, which can be completed by following the prompts.

{{< img src="bits_ai/integration-settings.png" alt="Slack integration settings in Datadog" style="width:90%;">}}

## View incident summaries and schedule updates

When you join an incident channel in Slack, you automatically receive a summary of the incident. The channel must be connected to Incident Management and have at least fifteen messages. The summary, which is only visible to you, does not persist across reloads, between desktop and mobile apps, or across sessions.

At any time, you can ask for a fresh summary by asking `@DataDog Give me a summary of this incident`. Schedule an update by asking `@DataDog Give me an update in X minutes`.

## Ask questions

You can use the Bits AI chatbot in Slack to ask customized questions about your incident: `@Datadog I am a customer relations manager, and my customer is asking for an update on incident 2781. Can you give me a few bullet points that I can send to my customer?`

## Update the severity level and status

- Severity level: `@Datadog Update this incident to SEV-3`
- Status: `@Datadog Mark this incident as stable`

## Generate a first draft of a postmortem

To generate an AI-assisted postmortem draft,

1. Navigate to the incident page in Datadog. For example, to view Incident 2679, you might search for `2679` on the [**Incidents**][2] page and click the relevant match.
1. Ensure that the incident is resolved and that the timeline has 15 or more messages.
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

1. Navigate to [**Service Management > Settings > Postmortems**][1].
1. Click **New Postmortem Template** and customize your template using the provided incident variables.  
    - Variables prefixed by `ai`, such as `incident.ai_action_items`, yield AI-generated content instead of fixed values.
    - You must use a heading before each variable.
1. Save your template to make it available as a template option during [postmortem generation](#generate-a-first-draft-of-a-postmortem).

{{< whatsnext desc="Additional Bits AI documentation:">}}
    {{< nextlink href="bits_ai/" >}}Feature Overview{{< /nextlink >}}
    {{< nextlink href="bits_ai/getting_started" >}}Getting Started{{< /nextlink >}}
    {{< nextlink href="bits_ai/query_examples" >}}Query Examples{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://app.datadoghq.com/incidents/settings#Postmortems
[2]: https://app.datadoghq.com/incidents
[3]: https://app.datadoghq.com/incidents/settings#Integrations