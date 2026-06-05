---
title: Chat with Bits Investigation
---

Within an investigation, you can chat with Bits AI SRE to gather additional information about the investigation, steer the agent in real time, and more.

{{< img src="bits_ai/bits_ai_sre_chat_example.png" alt="Example chat where a user asks Bits AI about related ongoing incidents, and Bits AI responds with a list of related incidents and an explanation on what makes them related" style="width:100%;" >}}

## Data sources

The Bits Investigation chatbot has access to:
- **Investigation details**: Details on the monitor alert, exploratory queries that were run, hypotheses and their assessments, and the root cause conclusion
- **Telemetry**: Details on metrics, logs, traces, events, monitors, RUM events, dashboards, notebooks, and hosts
- **Incidents**: Details on incidents and their status, severity, and more
- **Services**: Services in Catalog with their dependencies, owners, and more
- **Datadog documentation**: Documented Datadog product information
- **Confluence documentation**: Relevant documentation or runbooks from your Confluence documentation (if the [Confluence integration is configured to enable account crawling][1])

## Example questions

| Functionality                                  | Example prompt                                                    | Data source                       |
|------------------------------------------------|-------------------------------------------------------------------|-----------------------------------|
| Ask for clarification on investigation details | `Why do you think there's database query slowness?`               | Bits Investigation details |
| Ask for elaborations on investigation findings | `Tell me more about the increased 500s on <web-store>.`           | Bits Investigation details |
| Learn how to make Bits work better             | `How can I make the investigation more effective next time?`      | Bits Investigation details |
| Look up information about a service            | `Are there any ongoing incidents for <web-store>?`                | Catalog and Incidents    |
| Find recent changes for a service              | `Were there any recent changes on <web-store>?`                   | Change Tracking                   |
| Query APM request, error, and duration metrics | `What's the current error rate for <web-store>?`                  | APM                               |
| Query and analyze profiling data               | `What performance bottlenecks do you see for <web-store>?`        | Continuous Profiler                               |
| Ask about Datadog products                     | `Does Bits Investigation connect to Datadog Case Management?`     | Datadog Documentation             |
| Create a Notebook                              | `Can you create a notebook with a summary of this investigation?` | Notebooks                         |
| Steer the agent mid-investigation              | `Focus on the <payments-service> logs from the last 30 minutes`   | Logs                              |

[1]: bits_ai/bits_ai_sre/configure#confluence
