---
title: Improve Agents Using Their Execution Traces
description: Use Agent Observability traces to find recurring failures, pin repeated tool parameters, and move conditional instructions into skills.
disable_toc: false
site_support_id: bits_agent_builder
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

When you enable tracing on an agent, [Agent Observability][1] records a *trace* each time the agent runs. A trace is a record of a run from the original input to the final response, including every LLM call and tool call. Each step in a trace is a *span*, which captures details such as the tool parameters the agent passed and the result it received. For more information, see [Agent Observability Terms and Concepts][5].

This guide shows how to use traces, along with the agent's own improvement capabilities, to find failure patterns, unnecessary tool calls, and instructions that consume context without helping every run. Fixing these issues makes your existing Bits Agent Builder agents more reliable and efficient.

## Before you begin

Enable tracing on the agent. Agent Observability records traces only for runs that happen after tracing is enabled. To enable tracing, open the agent in [Bits Agent Builder][3] and select **Enable Tracing**. Tracing is included with Bits Agent Builder at no additional cost.

Your agent must also have:

- Recent runs that represent real usage, with enough history to distinguish recurring behavior from a one-time issue.
- Access to the Datadog MCP Server [trace and span tools][2] so it can inspect its traces. If your configuration does not enable all Datadog MCP Server tools, confirm that the trace and span tools are enabled.
- Edit permission for its own configuration, so it can propose updates.

## Agent improvement workflow

Datadog recommends making small, iterative improvements to agents, focusing on one pattern at a time. Small changes take less effort to validate and are less likely to introduce unexpected behavior elsewhere.

To improve Bits Agent Builder agents, repeat the following workflow regularly:

1. [Review traces and identify a pattern](#step-1-review-traces-and-identify-a-pattern).
1. [Ask the agent to propose a fix](#step-2-ask-the-agent-to-propose-a-fix).
1. [Review and approve the change](#step-3-review-and-approve-the-change).
1. [Validate the change](#step-4-validate-the-change).

## Step 1: Review traces and identify a pattern

Reviewing traces from both successful and unsuccessful runs helps you identify behavior that recurs across runs, rather than one-time issues.

To review traces and identify a pattern:

1. In [Bits Agent Builder][3], open the agent and select **View Agent Traces**. The agent's traces open in Agent Observability.
1. Open individual traces from both successful and unsuccessful runs. For each trace, inspect the input, the response, and the sequence of tool calls.
1. Identify a recurring pattern to address. The following table lists common patterns and their associated fixes:

    | Pattern in traces | Fix |
    |---|---|
    | Failed runs, runs stopped by guardrails, or repeated calls to the same tool | [Fix recurring failures](#fix-recurring-failures) |
    | Tools that consistently return errors | [Fix recurring failures](#fix-recurring-failures) |
    | Parameters that receive the same value in every run | [Pin parameters that never change](#pin-parameters-that-never-change) |
    | Long execution paths that could be simplified | [Pin parameters that never change](#pin-parameters-that-never-change) or [move conditional instructions into skills](#move-conditional-instructions-into-skills) |

## Step 2: Ask the agent to propose a fix

After you identify a pattern, ask the agent to examine its own traces and propose a fix. The agent searches its execution history, inspects the affected traces, and identifies the repeated behavior that caused the issue. It then proposes an update to its configuration.

This section provides sample prompts for addressing common issues. Use the prompt that matches the pattern you identified.

### Fix recurring failures

A recurring failure is a problem that happens the same way across multiple runs. Examples include stuck loops, runs stopped by guardrails, and tool calls that always return errors.

For example, an agent might repeatedly attempt to read a file from an outdated path. Its instructions tell it to keep retrying the same path and prohibit it from searching for an alternative. Together, those instructions create a guaranteed loop.

To find and fix a loop like this, ask the agent:

```
Read your Agent Observability traces. Find any runs that ended in a stuck
loop, explain why they happened, and update your instructions to fix them.
```

In this example, the agent proposes a fix that:

- Corrects the outdated file path
- Limits retries to one additional attempt
- Instructs the agent to search the repository when the expected path fails
- Adds a fallback for cases where the file still cannot be found

For other types of recurring failures, update the sample prompt with a description of the pattern you found in your traces.

### Pin parameters that never change

Pinning a parameter sets its value in the agent's tool configuration instead of requiring the agent to supply the value on each run.

When a parameter is pinned:

- The same value is sent on every call to that tool.
- The agent no longer reasons about what to pass, which removes tokens from each run and shortens the decision path.
- The agent cannot override the value, so a malformed or incorrect argument is no longer possible for that parameter.

Traces tell you which parameters are worth pinning, because the run history shows which values never vary.

To pin parameters, ask the agent:

```
In your traces, which tool parameters do you always pass the same value?
Pin those as default parameters.
```

The agent reviews recent tool calls, identifies parameters with consistent values, checks the corresponding tool schemas, and proposes updated tool configurations.

You can also pin parameters yourself by hardcoding them in the [tool configuration panel][4].

### Move conditional instructions into skills

Large system prompts often contain detailed procedures that are relevant to only a subset of requests. Keeping that guidance in the main instructions consumes context on every run.

To avoid consuming context on guidance that most runs don't need, move specialized procedures into [skills][6]. Skills are reusable sets of instructions and domain knowledge that you attach to an agent separately from its main instructions. Good candidates for skills include:

- Service investigation procedures
- Configuration lookup instructions
- Pull request and test analysis
- Escalation guidance
- Infrequently used product or domain expertise
- The agent's own maintenance procedures

To move conditional instructions out of the main instructions and into skills, ask the agent:

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

## Step 3: Review and approve the change

Review the evidence the agent cites and the changes it proposes. Select **Accept** to apply the update or **Reject** to leave the agent unchanged.

Before you accept, check the following, depending on the type of fix:

- **Instruction updates**: Confirm that the change addresses the behavior shown in the traces and is no broader than needed.
- **Pinned parameters**: Because a pinned value applies to every run, verify that each one is truly universal. Do not pin values that vary by environment, repository, service, user, or request type. Pinning non-universal values makes the agent silently wrong on any request that needs a different value.
- **Skills**: Confirm that the agent's identity, core objective, safety rules, and universally applicable behavior remain in the main instructions.

## Step 4: Validate the change

After you accept the proposed changes, rerun representative requests, including the inputs that previously failed. Review the new traces in Agent Observability to confirm that the improvement changed the execution path as intended.

For example, confirm that the agent:

- Completes the task without repeating failed calls
- Uses pinned parameters correctly
- Loads specialized skills only when relevant
- Produces an evidence-backed answer
- Stops after completing its objective
- Falls back or escalates when it cannot verify an answer

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /llm_observability/
[2]: /llm_observability/build_with_ai/mcp_server/#trace-and-span-tools
[3]: https://app.datadoghq.com/actions/agents
[4]: /actions/agents/#tools
[5]: /llm_observability/quickstart/terms/
[6]: /actions/agents/#skills
