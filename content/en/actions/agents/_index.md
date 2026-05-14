---
title: Agent Builder
description: Build and deploy custom AI agents that automate operational tasks using Datadog's tools and integrations.
site_support_id: agent_builder
further_reading:
- link: "/actions/actions_catalog/"
  tag: "Documentation"
  text: "Action Catalog"
- link: "/actions/workflows/"
  tag: "Documentation"
  text: "Workflow Automation"
- link: "https://www.datadoghq.com/knowledge-center/aiops/ai-agents/"
  tag: "Knowledge Center"
  text: "What are AI agents and how do they work?"
---

{{< callout url="#" btn_hidden="true" header="Preview" >}}
Agent Builder is in Preview.
{{< /callout >}}

## Overview

Agent Builder lets you create AI agents that automate operational tasks using Datadog's tools and integrations. Agents can search logs, query metrics, create cases, send Slack messages, run workflows, and take action across 2500+ integrations — working with the same data you use every day.

Use agents to handle work that's too complex for static automation but too repetitive to do manually: triaging errors, investigating incidents, analyzing trends, and escalating issues.

Once created, agents can be triggered from workflows, monitors, incidents, Slack, or on a schedule.

## Agents page

The [Agents page][1] lists all agents in your organization. From here, you can create new agents, search existing ones, or filter to see only agents you've created.

{{< img src="/actions/agents/agent-dashboard.png" alt="The Agents page showing a list of agents" style="width:100%;" >}}

## Create an agent

You can create an agent in three ways:

### Build with AI

Describe what you want the agent to do in natural language. Agent Builder generates instructions, selects relevant tools, and configures the agent for you.

1. Navigate to the [Agents page][1].
1. Click **New Agent**.
1. Enter a description of what the agent should do.
1. Agent Builder creates the agent with generated instructions and suggested tools. Customize further or start testing in the chat interface.

### Start from a blueprint

Blueprints are pre-built agent templates for common use cases. Each blueprint includes instructions, tools, and automations that follow best practices for that use case.

Available blueprints include:

| Blueprint | Description |
|-----------|-------------|
| Daily Error Triager | Finds error logs daily and opens a case for non-transient issues |
| Incident Responder | Gathers context and coordinates response during active incidents |
| Security Analyst | Investigates security signals and recommends remediation |
| Log Analyzer | Analyzes system logs, identifies patterns, and helps troubleshoot |
| DevOps Assistant | Helps with infrastructure monitoring and deployment tasks |
| Feedback Digest | Summarizes user feedback from support channels |

To create an agent from a blueprint:

1. Navigate to the [Agents page][1].
1. Select a blueprint from the page, or click **New Agent** to browse the full list.
1. Configure the required fields (such as service name or project name).
1. Click **Create From Blueprint**.

### Start from scratch

1. Navigate to the [Agents page][1].
1. Click **New Agent**.
1. Click **Start from scratch**.
1. Write instructions, select a model, and add tools. Changes save automatically.

## Configure your agent

### Instructions

Instructions define what your agent does — its goal, process, and constraints. Write them in natural language as if you're describing a task to a teammate.

Effective instructions are specific and outcome-oriented. For example:

```
You are an Error Triage agent for the payments service. Each run:

1. Search the last 24 hours of error-level logs for service:payments.
2. Group errors by message signature and identify distinct patterns.
3. For each pattern, determine if it's transient (network blip, recovered outage) or a code-level bug.
4. For non-transient patterns, create a case in Case Management with the error details, stack trace, and occurrence count.
5. Summarize what you triaged and what cases you created.
```

You can use **Edit with AI** to help refine your instructions.

### Model

Select which LLM powers the agent's reasoning. Different models offer trade-offs between capability, speed, and cost. New agents default to Claude Sonnet.

### Tools

Tools define what actions the agent can take. Add tools from the [Action Catalog][7], which includes 2500+ integrations:

- **Log search** — query and analyze log data
- **Metrics** — pull metric values and trends
- **Case Management** — create and manage cases
- **Slack and Microsoft Teams** — send messages and notifications
- **PagerDuty and Opsgenie** — manage incidents and on-call
- **Jira and GitHub** — create tickets and issues
- **Sub-agents** — delegate tasks to other agents

The agent can only use tools that have been added to its configuration. If the agent fails to perform a task, check that the necessary tool is added.

### MCP servers

The [Datadog MCP Server][8] is enabled by default, giving agents access to Datadog monitoring tools. You can also connect third-party MCP servers that use OAuth for authentication, such as Atlassian, Notion, Sentry, Linear, Supabase, and Netlify.

### Automations

Automations let you trigger agents beyond the chat interface:

- **Schedule**: Run an agent on a recurring basis (for example, daily error triage).
- **Monitor**: Trigger an agent when a [monitor][14] enters an alert, warning, or recovery state.
- **Incident**: Run an agent as part of [incident][15] response.
- **Security signal**: Trigger an agent in response to a [security signal][16].

Automations use [Workflow Automation][9] under the hood. You can configure them directly from the agent's settings.

## Test your agent

Use the built-in chat interface to interact with your agent. Send messages, review the agent's reasoning and tool usage, and verify it takes the correct actions. Chat history is preserved across sessions, and previous conversations are accessible from the sidebar.

## Use agents in workflows

Agents integrate with Workflow Automation through the **Run Agent** step. This lets you combine AI reasoning (triage, analysis, summarization) with deterministic automation (if/then logic, data transforms) in a single workflow.

To add an agent to a workflow:

1. Open a workflow in [Workflow Automation][9].
1. Click the **+** icon to add a step.
1. Select the **Run Agent** action.
1. Select the agent and configure the input prompt.

The agent executes with its configured tools and instructions, and returns its output to the workflow for downstream steps.

## Use agents in apps

You can also invoke agents from [App Builder][10] apps:

1. Open an app in [App Builder][10].
1. Click the **+** icon, then click **Actions**.
1. Select the **Run Agent** action.
1. Select the agent, configure the connection and input prompt.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/actions/agents
[5]: https://docs.claude.com/en/docs/about-claude/models/overview#latest-models-comparison
[6]: https://platform.openai.com/docs/models
[7]: /actions/actions_catalog/
[8]: /bits_ai/mcp_server
[9]: https://app.datadoghq.com/workflow
[10]: https://app.datadoghq.com/app-builder/apps/list
[11]: /actions/workflows/build/#wait-until-condition
[12]: /actions/workflows/build/#retries
[13]: /actions/workflows/trigger/#scheduled-triggers
[14]: /actions/workflows/trigger/#monitor-triggers
[15]: /actions/workflows/trigger/#incident-triggers
[16]: /actions/workflows/trigger/#security-triggers
