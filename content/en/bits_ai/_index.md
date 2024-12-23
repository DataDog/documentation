---
title: Bits AI
disable_toc: false
private: false
is_beta: true
further_reading:
    - link: "https://www.datadoghq.com/product/platform/bits-ai/"
      tag: "Product page"
      text: "Bits AI"
    - link: "https://www.datadoghq.com/blog/datadog-bits-generative-ai/"
      tag: "Blog"
      text: "Introducing Bits AI, Your New DevOps Copilot"
    - link: "https://www.datadoghq.com/blog/bits-ai-for-incident-management/"
      tag: "Blog"
      text: "Stay up to date on the latest incidents with Bits AI"
    - link: "https://www.datadoghq.com/about/latest-news/press-releases/datadog-announces-bits-an-ai-assistant-to-help-engineers-quickly-resolve-application-issues/"
      tag: "Press release"
      text: "Bits AI announcement"
    - link: "https://www.datadoghq.com/blog/bits-ai-autonomous-investigations/"
      tag: "Blog"
      text: "Reimagining the way you run operations with autonomous investigations"
---

Bits AI is a platform-wide copilot that helps you identify and remediate issues in your applications and infrastructure. You can query Bits AI in the Datadog web app, the Datadog mobile app, and in Slack.

For detailed setup and usage instructions, see the [Getting Started][1] documentation.

## Features

### Query data in natural language

{{< beta-callout url="https://docs.google.com/forms/d/e/1FAIpQLSfBuPfdyhgqjjduDYpOM5twJdkdDnTTxJdCCWonauaBxWTCnQ/viewform" >}}
Natural language querying is in private beta. Fill out this form to join the wait list.
{{< /beta-callout >}} 

Bits AI supports natural language querying for logs, APM traces, infrastructure data, cloud cost, and RUM. You can also ask Bits AI about the health and ownership of your services, and retrieve Datadog resources related to those services.

You can ask Bits AI questions such as:
- `Who is on call for example-service?`
- `Find me the example-service dashboard.`
- `What is going on with example-service?`
- `Are there any issues with example-service's dependencies?`

When relevant to your query, Bits AI surfaces faulty deployments, Watchdog anomalies, incidents, alerts, and more. It also expands on issues with upstream and downstream dependencies. This feature works best if your APM services are tagged by **team** and **service**.

For more example query syntax, see the [Example Natural Language Queries][2] guide.

### Streamline incident management

Within [Datadog Incident Management][3], Bits AI can help you 

- **Stay informed:** Get an up-to-date summary of the incident when you join an incident Slack channel.
- **Engage responders:** Page on-call teams with PagerDuty with Slack queries like "`@DataDog` Page the team that owns example-service."
- **Update incidents:** Update the severity level and status of an incident.
- **Find related incidents**: Search through your entire incident history and find similar incidents to the one you're currently in.
- **Generate a postmortem:** Get a head start with a first draft, which you can then review and revise.

See [Managing Incidents][4] for details.

## Feedback

Bits AI is in active development, and your feedback is valuable. To report issues or request features, contact your Customer Success Manager.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/getting_started/
[2]: /bits_ai/query_examples
[3]: /service_management/incident_management
[4]: /bits_ai/managing_incidents/
