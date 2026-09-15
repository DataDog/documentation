---
title: Insights
description: Agent Observability Insights identifies recurring cost and reliability problems in existing traces and recommends fixes.
further_reading:
- link: "/llm_observability/investigate/cost/"
  tag: "Documentation"
  text: "Monitor LLM costs"
- link: "/llm_observability/investigate/evaluations/"
  tag: "Documentation"
  text: "Evaluate your LLM applications"
- link: "/llm_observability/build_with_ai/mcp_server/"
  tag: "Documentation"
  text: "Connect AI agents to Agent Observability"
---

## Overview

Agent Observability Insights automatically finds recurring cost and reliability problems in the traces your applications already send. Use Insights to prioritize what to fix without reviewing traces one at a time.

Each Insight includes:

- A root cause that describes the recurring behavior
- An impact assessment based on affected calls or sessions
- Trace and span evidence that supports the finding
- A recommended fix and a way to validate it

<div class="alert alert-info">Trace-based Insights require no additional configuration. If your application sends traces to Agent Observability, Datadog can analyze them for supported cost and reliability problems.</div>

## How Insights works

Datadog analyzes recent traces across multiple calls or sessions to identify recurring cost and reliability problems. It checks for expected behavior, such as successful retries or long responses required by the task.

Datadog groups findings with the same root cause into one Insight. Later analyses update the Insight and automatically resolve it when the problem no longer appears. If the problem returns, Datadog surfaces it again.

### Insight types

| Category | Insight type | What it identifies |
|---|---|---|
| Cost | Inefficient prompt caching | Reusable prompt content that misses the provider cache and increases input token cost. |
| Cost | Large tool results | Tool results that add unnecessary content to later model requests and increase token use or context pressure. |
| Cost | Verbose model output | Model responses or reasoning that use more output tokens than the task requires. |
| Reliability | Tool call retry loops | Repeated calls to the same tool that use nearly identical arguments and do not make progress. |
| Reliability | Prompt rule violations | Agent behavior that breaks an explicit rule in a prompt, skill, or tool description. |
| Reliability | Evaluator-detected failure patterns | Recurring managed evaluation failures that share the same root cause. |

Evaluator-detected failure patterns use managed evaluation results that already exist in Agent Observability. The other Insight types do not require an evaluation.

## Understand impact and evidence

Depending on the type, a Cost Insight shows estimated recoverable spend or the exact cost of model work that did not produce a usable result. These values are different measurements.

Reliability Insights show the confirmed calls or sessions affected by the problem. When an analysis uses a sample, the affected count is a confirmed lower bound, not an extrapolated rate.

Open the linked traces and spans to compare the evidence with the stated root cause. The analysis details show the steps and supporting evidence that produced the finding.

## Review and act on Insights

1. In Datadog, go to [**AI Observability > Agent Observability > Insights**][1].
2. Use the overview and filters to prioritize Insights by application, type, severity, status, or impact.
3. Open an Insight to review the finding.
4. Apply and validate the recommended fix. You can also send the Insight to Bits or use it with an MCP-compatible coding agent.
5. Set the status to **For Review**, **In Progress**, **Completed**, or **Ignored** to record your decision. Datadog sets the status to **Automatically Resolved** when later analysis no longer finds the problem.

Insights appear on an application's overview page. Cost Insights also appear on the **Cost** page next to the related spend.

## Use Insights with a coding agent

Connect the [Datadog MCP Server][2] to an MCP-compatible coding agent. The agent can retrieve an Insight's root cause, evidence, recommended fix, and validation guidance to implement and test a change.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/insights
[2]: /llm_observability/build_with_ai/mcp_server/
