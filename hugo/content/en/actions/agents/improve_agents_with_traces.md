---
title: Improve agents using their execution traces
description: Use Agent Observability traces to find recurring failures, pin repeated tool parameters, and move conditional instructions into skills.
disable_toc: false
algolia:
  tags: ['bits agent builder', 'agent builder', 'agents', 'agent observability']
further_reading:
- link: "/actions/agents/"
  tag: "Documentation"
  text: "Bits Agent Builder"
- link: "/llm_observability/guide/agent_monitoring/"
  tag: "Documentation"
  text: "Agent monitoring"
---

## Overview

Bits Agent Builder agents improve fastest when you use their real execution history—not hypothetical test cases—to identify failure patterns, unnecessary tool calls, and instructions that consume context without helping every run.

This guide shows how to use [Agent Observability][1] and the agent's own improvement capabilities to make an existing agent more reliable and efficient.

## Before you begin

Tracing must be enabled on the agent before any runs are recorded. Open the agent in [Bits Agent Builder][3] and select **Enable Tracing**. Tracing is included with Bits Agent Builder at no additional cost.

Your agent should also have:

- Recent runs that represent real usage
- Access to the [Datadog MCP Server][2] so it can inspect its traces
- Permission to propose updates to its configuration
- Enough run history to distinguish recurring behavior from a one-time issue

All proposed configuration changes require your approval before they are applied.

## Review the agent's recent traces

Open the agent in [Bits Agent Builder][3] and select **View Agent Traces**.

In Agent Observability, review both successful and unsuccessful runs. Pay particular attention to:

- Failed runs and runs stopped by guardrails
- Repeated calls to the same tool
- Tools that consistently return errors
- Parameters that receive the same value in every run
- Answers that are unsupported, incomplete, or unnecessarily expensive
- Long execution paths that could be simplified

Open individual traces to inspect the original input, the agent's response, and the sequence of tool calls that produced it.

## Find and fix recurring failures

You can ask the agent to examine its own traces and propose a targeted correction:

```
Read your LLM Observability traces. Find any runs that ended in a stuck
loop, explain why they happened, and update your instructions to fix them.
```

The agent searches its execution history, inspects the affected traces, and identifies the repeated behavior that caused the loop. It then proposes an update to its instructions.

For example, an agent may repeatedly attempt to read a file from an outdated path. Its instructions tell it to keep retrying the same path and prohibit it from searching for an alternative. Together, those instructions create a guaranteed loop.

The proposed fix:

- Corrected the outdated file path
- Limited retries to one additional attempt
- Instructed the agent to search the repository when the expected path fails
- Added a fallback for cases where the file still cannot be found

Review the evidence and proposed changes carefully. Select **Accept** to apply the update or **Reject** to leave the agent unchanged.

## Pin parameters that rarely change

Pinning a parameter sets its value in the agent's tool configuration instead of leaving the agent to supply it on each run. When a parameter is pinned:

- The same value is sent on every call to that tool.
- The agent no longer reasons about what to pass, which removes tokens from each run and shortens the decision path.
- The agent cannot override the value, so a malformed or incorrect argument is no longer possible for that parameter.

This is the same mechanism as hardcoding a parameter from the [tool configuration panel][4]—for example, locking a Slack tool to a single channel. Traces tell you *which* parameters are worth pinning, because the run history shows which values never vary.

Ask the agent:

```
In your traces, which tool parameters do you always pass the same value?
Pin those as default parameters.
```

The agent reviews recent tool calls, identifies parameters with consistent values, checks the corresponding tool schemas, and proposes updated tool configurations.

Because a pinned value applies to every run, verify that each one is truly universal before accepting the change. Do not pin values that vary by environment, repository, service, user, or request type: pinning those makes the agent silently wrong on any request that needs a different value.

## Move conditional instructions into skills

Large system prompts often contain detailed procedures that are relevant to only a subset of requests. Keeping all of that guidance in the main instructions consumes context on every run.

Ask the agent:

```
Which sections of your instructions are only needed for some questions?
Move them into skills, and replace each with one line saying when to load it.
```

The agent identifies specialized procedures, creates skills for them, and replaces the full instructions with short routing rules. For example:

```
For questions asking why a service is erroring or whether the problem is
caused by a dependency, load the `acme-eng-help-service-erroring` skill
before calling other tools.
```

Good candidates for skills include:

- Service investigation procedures
- Configuration lookup instructions
- Pull request and test analysis
- Escalation guidance
- Infrequently used product or domain expertise
- The agent's own maintenance procedures

Keep the agent's identity, core objective, safety rules, and universally applicable behavior in the main instructions.

## Validate the updated agent

After accepting changes, rerun representative requests—including the inputs that previously failed.

Confirm that the agent:

- Completes the task without repeating failed calls
- Uses pinned parameters correctly
- Loads specialized skills only when relevant
- Produces an evidence-backed answer
- Stops after completing its objective
- Falls back or escalates when it cannot verify an answer

Then review the new traces to confirm that the improvement changed the execution path as intended.

## Recommended improvement cycle

Repeat this process regularly:

1. Review recent production traces.
1. Identify a specific recurring failure or inefficiency.
1. Ask the agent to investigate the pattern.
1. Review and approve a narrowly scoped change.
1. Test the updated behavior.
1. Confirm the result in Agent Observability.

Make one focused improvement at a time. Small, trace-backed changes take less effort to validate and are less likely to introduce unexpected behavior elsewhere.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /llm_observability/
[2]: /mcp_server/
[3]: https://app.datadoghq.com/actions/agents
[4]: /actions/agents/#tools
