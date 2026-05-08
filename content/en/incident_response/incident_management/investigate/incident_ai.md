---
title: Incident AI
description: "Learn how to use Incident AI to investigate active incidents, receive proactive summaries, detect related issues, and trigger AI-powered root cause analysis."
aliases:
- /bits_ai/managing_incidents/
- /bits_ai/bits_ai_sre/coordinate_incidents
- /service_management/incident_management/incident_ai/
- /incident_response/incident_management/incident_ai
further_reading:
- link: "/bits_ai/bits_ai_sre/"
  tag: "Documentation"
  text: "Learn about Bits AI SRE"
- link: "/incident_response/incident_management/post_incident/postmortems"
  tag: "Documentation"
  text: "Generate AI-assisted postmortems"
- link: "/incident_response/incident_management/setup_and_configuration/templates"
  tag: "Documentation"
  text: "Configure AI variables in notification and postmortem templates"
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

{{< img src="service_management/incidents/incident_ai/incident_summary.png" alt="Example incident summary in Slack" style="width:100%;" >}}

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

**From the web UI**, you can trigger an investigation directly from the "Investigation" section on the incident overview page.

{{< img src="incident_response/incident_management/incident_ai/Triggering_investigations_web.png" alt="The Incident Management overview page showing a completed Bits AI SRE investigation in the Investigation section with a View Full Investigation button" >}}

When triggered, the investigation is embedded in the incident web UI, and Bits AI SRE appears as a responder in the Responder Roles section of the page.

For a full walkthrough of the investigation workflow, see [Bits AI SRE][4].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /incident_response/incident_management/setup_and_configuration/integrations/slack
[2]: /incident_response/incident_management/setup_and_configuration/templates
[3]: /incident_response/incident_management/post_incident/postmortems
[4]: /bits_ai/bits_ai_sre
