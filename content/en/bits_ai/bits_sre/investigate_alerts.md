---
title: Investigate alerts
---

## How Bits SRE investigates

Investigations happen in two phases:

1. **Initial context gathering**
   1. Bits begins by looking at any troubleshooting steps, Confluence pages, or Datadog links that you've added to the monitor's message—and making relevant queries. 
   1. It then automatically scans your Datadog environment for additional context.
   1. Thirdly, if you've interacted with a previous investigation for the same monitor, Bits will recall any memories associated with the monitor. 
   1. Initial findings are returned in under a minute. 
1. **Root cause hypothesis generation and testing**
   - Using the gathered context, Bits performs a more thorough investigation by building multiple root cause hypotheses and testing them in parallel. Today, Bits is able to query:
      - Metrics
      - Traces
      - Logs
      - Dashboards
      - Change events
      - Watchdog insights
   - Hypotheses can end in one of three states: validated, invalidated, or inconclusive. 

For best results, see [Optimize monitors for Bits SRE][1].

## Chat with Bits SRE about the investigation

On the [Bits AI Investigations][2] page, you can chat with Bits to gather additional information about the investigation or the services involved. Click the **Suggested replies** bubble for examples.

| Functionality                                      | Example prompts                                                                    | Data source                          |
|----------------------------------------------------|------------------------------------------------------------------------------------|--------------------------------------|
| **Understand the status of its investigation**     | `What's the latest status of the investigation?`                                   | Investigation findings               |
| **Ask for elaborations of its findings**           | `Tell me more about the {issue}.`                                                  | Investigation findings               |
| **Look up information about a service**            | `Are there any open incidents for {example-service}?`                              | Software Catalog service definitions |
| **Find recent changes for a service**              | `Were there any recent changes on {example-service}?`                              | Change Tracking events               |
| **Find a dashboard**                               | `Give me the {example-service} dashboard.`                                         | Dashboards                           |
| **Query APM request, error, and duration metrics** | `What's the current error rate for {example-service}?`                             | APM metrics                          |
| **Search for information in Confluence**           | `Find me the runbook in Confluence to rollback deployments for {example-service}.` | Confluence                           |

## Help Bits SRE learn

Reviewing Bits' findings not only validates their accuracy, but also helps Bits learn from any mistakes it makes, helping it produce future investigations that are faster and more helpful.

### During the investigation
You can guide Bits' learning by:
- **Improving a step**: Share a link to a better query Bits should have made. 
- **Remembering a step**: Tell Bits to remember any helpful queries it generated. This instructs Bits to prioritize running these queries the next time the same monitor fires. 

### After the investigation
At the end of an investigation, let Bits know if the conclusion it made was correct or not. If it was inaccurate, provide Bits with the correct root cause so that it can learn from the discrepancy.

### Manage memories 
Every piece of feedback you give generates a **memory**. Bits uses these memories to enhance future investigations by recalling relevant patterns, queries, and corrections. You can navigate to [Bits-Enabled Monitors][3] to view and delete memories in the **Memories** column.

[1]: /bits_ai/bits_sre#optimize-monitors-for-bits-sre
[2]: https://app.datadoghq.com/bits-ai/investigations
[3]: https://app.datadoghq.com/bits-ai/monitors/enabled