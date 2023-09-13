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

<div class="alert alert-info">Bits AI is in private beta.</div>

Bits AI is a generative AI interface that helps you identify, remediate, and summarize issues in your applications and infrastructure. It surfaces faulty deployments, Watchdog anomalies, incidents, alerts, and more.

## Features

### Query data in natural language

Bits AI supports natural language querying for logs, APM traces, infrastructure data, and cloud cost.

In Datadog or in Slack, you can ask Bits AI questions such as
- What is going on with example-service?
- Are there any issues with example-service's dependencies?
- Who is on call for example-service?
- Find me the example-service dashboard.

Bits AI also expands on issues with upstream and downstream dependencies. This feature works best if your APM services are tagged by **team** and **service**.

{{< whatsnext desc="Additional documentation:">}}
    {{< nextlink href="bits_ai/getting_started/" >}}Getting Started{{< /nextlink >}}
    {{< nextlink href="bits_ai/query_examples/" >}}Query Examples{{< /nextlink >}}
{{< /whatsnext >}}

### Streamline incident management

As part of the [Datadog Incident Management][2] product, generative AI can help you 

- **Stay informed:** Ask Datadog to send you an update on the incident in 15 minutes.
- **Explore incidents:** Query incident details, such as "Give me a few bullet points on incident 2781."
- **Triage incidents:** Update the severity level and status of an incident.
- **Generate a postmortem:** Quickly create a first draft to review and revise.

{{< whatsnext desc="Additional documentation:">}}
    {{< nextlink href="bits_ai/managing_incidents/" >}}Managing Incidents{{< /nextlink >}}
{{< /whatsnext >}}

### Run workflows in Slack

If you have Datadog Workflows configured, you can trigger them from Slack. For example, sending `@Datadog Give me a workflow to block IPs in Cloudflare` starts a conversation in which the chatbot confirms the desired workflow and asks for any required parameters.

{{< img src="bits_ai/slack-workflow.png" alt="Workflow request to Bits AI in Slack" style="width:60%;">}}

{{< whatsnext desc="Additional documentation:">}}
    {{< nextlink href="bits_ai/getting_started/#querying-in-slack" >}}Querying in Slack{{< /nextlink >}}
{{< /whatsnext >}}

## Feedback

Bits AI is in active development, and your feedback is valuable. To report issues or request features, contact your Customer Success Manager.

[2]: https://www.datadoghq.com/product/incident-management/

## Further reading

{{< partial name="whats-next/whats-next.html" >}}