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

Agent Observability Insights automatically analyzes the traces Agent Observability receives from your application to find recurring cost and reliability problems. Use Insights to prioritize what to fix without reviewing traces one at a time.

Each insight includes:

- A root cause that describes the recurring behavior
- An impact assessment based on affected calls or sessions, when the insight type includes one
- Trace and span evidence that supports the finding
- A recommended fix and a way to validate it, when the insight type includes one

<div class="alert alert-info">Insights require no additional configuration. Datadog analyzes traces that your application already sent to Agent Observability.</div>

## How Insights works

Datadog analyzes recent traces across multiple calls or sessions to identify recurring cost and reliability problems. It checks for expected behavior, such as successful retries or long responses required by the task.

Datadog groups findings with the same root cause into one insight. Later analyses update the Insight and automatically resolve it when the problem no longer appears. If the problem returns, Datadog surfaces it again.

### Insight types

| Category | Insight type | What it identifies |
|---|---|---|
| Cost | Inefficient prompt caching | Reusable prompt content that misses the provider cache and increases input token cost. |
| Cost | Large tool results | Tool results that add unnecessary content to later model requests and increase token use or context pressure. |
| Cost | Verbose model output | Model responses or reasoning that use more output tokens than the task requires. |
| Cost | Frontier model sizing | Spend on premium models that warrants testing lower-cost alternatives. |
| Reliability | Tool call errors | Recurring tool failures with a shared cause that block tasks, degrade results, or add recovery work. |
| Reliability | Tool call retry loops | Repeated calls to the same tool that use nearly identical arguments and do not make progress. |
| Reliability | Prompt rule violations | Agent behavior that breaks an explicit rule in a prompt, skill, or tool description. |
| Reliability | Model deprecations | Models the application still calls whose provider has announced a shutdown date. |

### Frontier model sizing

Frontier model sizing identifies applications with potential savings from testing lower-cost models in place of premium models. Use this insight to prioritize model evaluations, starting with the workloads that account for the most spend.

The insight shows:

- Observed total and average daily spend on premium models, and their share of the application's measured LLM cost
- A breakdown by model and operation, with representative traces that show the work those models perform
- Estimated daily savings under a scenario with unchanged usage and models that cost 80% less

The savings scenario uses observed spend. It does not establish that a lower-cost model meets the same quality requirements. Spend totals exclude calls with unavailable cost data. The insight describes these coverage limits.

Test lower-cost models on a sample of the observed tasks. Compare answer quality, task completion, response time, and cost per completed task with the existing models. Expand use where the lower-cost models meet your requirements.

### Tool call errors

Tool call error insights identify recurring failures of the same tool operation with a shared cause. Examples include invalid arguments, access failures, timeouts, rate limits, and unavailable dependencies. Failures can occur with different inputs, within one trace or across traces, without forming a retry loop.

The insight shows the failing tool and operation, the shared trigger, failed-call and affected-trace counts for the analysis period, and linked examples. It also describes whether the agent recovered, returned a degraded result, or could not complete the task. Datadog checks both span errors and errors in returned tool content.

An isolated transient error followed by successful recovery does not qualify. Recurring failures can qualify when recovery adds work or delays results.

Apply the recommended fix for the cause, such as correcting argument validation, configuring the required permissions, or changing how the tool handles rate limits. Replay the affected requests and verify that the errors stop and the task succeeds.

### Model deprecations

Model deprecation insights identify models that the application still calls after their provider announced a shutdown date. The insight is raised regardless of spend on those models.

The **Announced deprecations** table lists each model with these columns, sorted by shutdown date, earliest first:

- **Provider**: The model provider
- **Model**: The deprecated model
- **Shutdown date**: The date the provider announced for the shutdown
- **Calls**: Calls to the model in the analysis window
- **Status**: The number of days left before the shutdown, shown as `<N> days left`, or `Shut down on <date>` if the model has already shut down

A coverage note follows the table. Severity is based on the earliest shutdown date relative to the end of the analysis window, and rises as that date approaches. This insight type does not include an impact estimate or a recommended fix.

Migrate each call site to a supported model before its shutdown date, and validate quality, latency, and cost on the replacement.

## Understand impact and evidence

Depending on the type, a Cost Insight shows estimated recoverable spend or the exact cost of model work that did not produce a usable result. Reliability Insights show the confirmed calls or sessions affected by the problem. Model deprecations insights show the deprecated models and the next shutdown date instead.

Open the linked traces and spans to compare the evidence with the stated root cause. The investigation trail shows the steps and supporting evidence that produced the finding.

### Wasted spend

Some reliability insights also show wasted spend: the observed cost of LLM work that the issue made unusable. This can include a discarded response even when a later retry succeeds. It can also include all model calls in a failed trace when none of that work contributed to a usable outcome.

Datadog counts each affected model call once and links the amount to supporting traces and spans. When the analysis reviews a sample, the amount covers the confirmed work in that sample. It is a lower bound on observed waste, without extrapolation to all application traffic. The insight also identifies missing cost data that limits the measured amount.

Use the linked evidence to identify the discarded work and apply the insight's recommended fix. Replay the affected tasks to verify that they produce usable results without repeating that work. For an overview by application, see [Wasted Spend in the Cost Overview][3].

## Review and act on insights

1. In Datadog, go to [**AI Observability > Agent Observability > Insights**][1].
2. Use the overview and filters to prioritize insights by application, type, severity, status, or impact.
3. Open an insight to review the finding.
4. Apply and validate the recommended fix, if the insight includes one. You can use **Fix with Bits** or an MCP-compatible coding agent. With Work Management read and write access, you can also create or link a Jira ticket or Linear issue.
5. Set the status to **For Review**, **In Progress**, **Completed**, or **Ignored** to record your decision. Datadog sets the status to **Automatically Resolved** when later analysis no longer finds the problem.

Insights appear on an application's overview page. Cost Insights also appear on the **Cost** page next to the related spend.

## Use Insights with a coding agent

Connect the [Datadog MCP Server][2] to an MCP-compatible coding agent. The agent can retrieve an insight's root cause and evidence, and its recommended fix and validation guidance when available, to implement and test a change.

### Automate insight reviews and fixes

Set up a recurring workflow in your coding agent to review and fix insights. For example:

```text
Use Datadog MCP to list Agent Observability insights with status `for_review` for `<ML_APP>`. Prioritize the returned Insights by severity. For each Insight, review the evidence, implement and validate the recommended fix, and update the insight status based on the result.
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/insights
[2]: /llm_observability/build_with_ai/mcp_server/
[3]: /llm_observability/investigate/cost/#view-costs-in-agent-observability
