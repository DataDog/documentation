---
title: Chat with Bits AI SRE
---

Within an investigation, you can chat with Bits to gather additional information about the investigation, related telemetry, and more. 

{{< img src="bits_ai/bits_ai_sre_chat_example.png" alt="Example chat where a user asks Bits AI about related ongoing incidents, and Bits AI responds with a list of related incidents and an explanation on what makes them related" style="width:100%;" >}}

## Data sources

The Bits AI SRE chatbot has access to:
- **Investigation details**: Details on the monitor alert, exploratory queries that were run, hypotheses and their assessments, and the root cause conclusion
- **Telemetry**: Details on metrics, logs, traces, events, monitors, RUM events, dashboards, notebooks, and hosts
- **Incidents**: Details on incidents and their status, severity, and more
- **Services**: Services in Software Catalog with their dependencies, owners, and more
- **Datadog documentation**: Documented Datadog product information
- **Confluence documentation**: Relevant documentation or runbooks from your Confluence documentation (if the Confluence integration is [configured][2] to enable account crawling)

## Example questions

| Functionality                                  | Example prompt                                                    | Data source                       |
|------------------------------------------------|-------------------------------------------------------------------|-----------------------------------|
| Ask for clarification on investigation details | `Why do you think there's database query slowness?`               | Bits AI SRE Investigation details |
| Ask for elaborations on investigation findings | `Tell me more about the increased 500s on {web-store}.`           | Bits AI SRE Investigation details |
| Learn how to make Bits work better             | `How can I make the investigation more effective next time?`      | Bits AI SRE Investigation details |
| Look up information about a service            | `Are there any ongoing incidents for {web-store}?`                | Software Catalog and Incidents    |
| Find recent changes for a service              | `Were there any recent changes on {web-store}?`                   | Change Tracking                   |
| Query APM request, error, and duration metrics | `What's the current error rate for {web-store}?`                  | APM                               |
| Ask about Datadog products                     | `Does Bits AI SRE connect to Datadog Case Management?`            | Datadog Documentation             |
| Create a Notebook                              | `Can you create a notebook with a summary of this investigation?` | Notebooks                         |

[1]: /bits_ai/bits_ai_sre/configure/#configure-knowledge-base-integrations