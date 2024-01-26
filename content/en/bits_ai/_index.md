---
title: Bits AI
kind: documentation
disable_toc: false
private: true
is_beta: true
further_reading:
    - link: "https://www.datadoghq.com/product/platform/bits-ai/"
      tag: "Product page"
      text: "Bits AI"
    - link: "https://www.datadoghq.com/blog/datadog-bits-generative-ai/"
      tag: "Blog post"
      text: "Introducing Bits AI, Your New DevOps Copilot"
    - link: "https://www.datadoghq.com/about/latest-news/press-releases/datadog-announces-bits-an-ai-assistant-to-help-engineers-quickly-resolve-application-issues/"
      tag: "Press release"
      text: "Bits AI announcement"
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLSfBuPfdyhgqjjduDYpOM5twJdkdDnTTxJdCCWonauaBxWTCnQ/viewform" >}}
Bits AI is in private beta. Fill out this form to join the wait list.
{{< /callout >}} 

Bits AI is a generative AI interface that helps you identify and remediate issues in your applications and infrastructure. You can query Bits AI in the Datadog web app, the Datadog mobile app, and in Slack.

For detailed setup and usage instructions, see the additional Bits AI documentation:
- [Getting Started][1]
- [Query Examples][4]
- [Managing Incidents][3]

## Features

### Query data in natural language

Bits AI supports natural language querying for logs, APM traces, infrastructure data, cloud cost, and RUM. You can also ask Bits AI about the health and ownership of your services, and retrieve Datadog resources related to those services.

You can ask Bits AI questions such as
- `Who is on call for example-service?`
- `Find me the example-service dashboard.`
- `What is going on with example-service?`
- `Are there any issues with example-service's dependencies?`

When relevant to your query, Bits AI surfaces faulty deployments, Watchdog anomalies, incidents, alerts, and more. It also expands on issues with upstream and downstream dependencies. This feature works best if your APM services are tagged by **team** and **service**.

### Streamline incident management

Within [Datadog Incident Management][2], Bits AI can help you 

- **Stay informed:** Ask Datadog to send you an update on the incident in 15 minutes.
- **Engage responders:** Page on-call teams with PagerDuty with Slack queries like "`@DataDog` Page the team that owns example-service."
- **Update incidents:** Update the severity level and status of an incident.
- **Generate a postmortem:** Quickly create a first draft to review and revise.

See [Managing Incidents][3] for details.

### Run workflows in Slack

If you have Datadog Workflows configured, you can trigger them from Slack. For example, sending `@Datadog Give me a workflow to block IPs in Cloudflare` starts a conversation in which Bits AI confirms the desired workflow and asks for any required parameters.

{{< img src="bits_ai/slack-cloudflare-workflow.png" alt="Workflow request to Bits AI in Slack" style="width:60%;">}}

See [Querying in Slack][5] for details.

## Feedback

Bits AI is in active development, and your feedback is valuable. To report issues or request features, contact your Customer Success Manager.

[1]: /bits_ai/getting_started/
[2]: /service_management/incident_management
[3]: /bits_ai/managing_incidents/
[4]: /bits_ai/query_examples
[5]: /bits_ai/getting_started/#querying-in-slack

## Further reading

{{< partial name="whats-next/whats-next.html" >}}