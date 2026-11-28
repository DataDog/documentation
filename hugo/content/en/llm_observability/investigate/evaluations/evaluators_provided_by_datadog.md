---
title: Evaluators Provided by Datadog
description: Learn about the Goal Completeness and Agent Task Completion evaluators that Datadog runs for you.
further_reading:
- link: "/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations"
  tag: "Documentation"
  text: "Learn about custom LLM-as-a-judge evaluators"
- link: "/llm_observability/quickstart/terms/"
  tag: "Documentation"
  text: "Learn about Agent Observability terms and concepts"
---

<div class="alert alert-info">Evaluators provided by Datadog are in Preview.</div>

## Overview

Datadog provides two starter evaluators for agents. They run on traces as soon as your application sends them, with no setup and no LLM provider account. Datadog runs them with its own LLM account and does not bill you for the judge calls.

Evaluators provided by Datadog show a {{< ui >}}Provided by Datadog{{< /ui >}} badge in [{{< ui >}}Agent Observability{{< /ui >}} > {{< ui >}}Evaluators{{< /ui >}}][1].

| Evaluator | Evaluation name | Question it answers |
|---|---|---|
| Goal Completeness | `datadog_goal_completeness` | Did the agent fully address everything the user asked for? |
| Agent Task Completion | `datadog_task_completeness` | Did the agent finish the task it set out to do? |

## How they evaluate

Both evaluators are trace-scoped LLM-as-a-judge evaluators. By default, each runs on 5% of an application's traces and reads every span of the trace.

Each evaluation returns one of three results:

| Result | Goal Completeness | Agent Task Completion |
|---|---|---|
| `true` | There is enough evidence that the goal was completed. | Every task the agent took on reached a finished state. |
| `false` | There is enough evidence that the goal was not completed. | At least one task the agent took on did not finish. |
| `unjudgeable` | The evidence supports neither `true` nor `false`. | The evidence supports neither `true` nor `false`. |

`true` and `unjudgeable` count as passing: a trace with nothing to judge is not an agent failure. Each result includes the reasoning behind it, and Goal Completeness also records the goal it inferred.

### Traces that are not evaluated

Datadog skips a trace when:

- It has no LLM span.
- Its LLM input or output is redacted.
- It is tagged `disable_data_logging:true`.
- It has 5,000 or more spans.
- Its content is larger than 1 MB.

## Daily limit

Datadog runs up to 5,000 judge calls per organization in any rolling 24-hour window, shared by both evaluators. When your organization reaches the limit, Datadog pauses the evaluators: the {{< ui >}}Evaluators{{< /ui >}} list shows {{< ui >}}Daily limit reached{{< /ui >}}, and the evaluator page shows a warning. They resume as the 24-hour window frees up.

To keep an evaluator running past the limit, select your own LLM account for it. Judge calls then use your account and your provider's billing.

## Customize or disable

Open an evaluator from the {{< ui >}}Evaluators{{< /ui >}} list to change it for one application:

- Edit the prompt, sampling rate, or filters. The evaluator shows a {{< ui >}}Customized{{< /ui >}} badge for that application.
- Click {{< ui >}}Reset to Datadog default{{< /ui >}} to discard your changes. The evaluator stays enabled or disabled as it is.
- Disable the evaluator for the application.
- Run a test or an auto test from the evaluator page before you save.

## Investigate failures

From an evaluator's results page, click {{< ui >}}Investigate with Insights{{< /ui >}} to group failing evaluations into failure patterns and suggest fixes.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/evaluations
