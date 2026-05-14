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

Agent Builder lets you create custom AI agents that use Datadog's tools and integrations to automate operational tasks. Agents can search logs, query metrics, create cases, send messages, or any other action from the [Action Catalog][7].

Use agents to handle work that's too complex for static automation but too repetitive for humans: triaging errors, responding to incidents, analyzing trends, and escalating issues.

{{< img src="/actions/agents/blank-new-agent.png" alt="The Agent Builder interface" style="width:100%;" >}}

## Creating an agent

From the [Agent Builder page][1], click **New Agent**. From there, you can create an agent in three ways:

- **Build with AI**: Describe what you want the agent to do in plain language. Agent Builder generates the instructions, selects relevant tools, and configures the agent for you.
- **Start from a blueprint**: Choose a pre-built template for common use cases like error triage, incident response, security analysis, or DevOps assistance. Blueprints come pre-configured with instructions, tools, and automations.
- **Start from scratch**: Configure the agent manually—write instructions, pick a model, and add tools.

{{< img src="/actions/agents/agent-dashboard.png" alt="The Agents page showing a list of agents" style="width:100%;" >}}

## Configuring your agent

### Instructions

Instructions tell the agent what to do when it runs. Write them in natural language—describe the goal, the process, and any constraints. Edit instructions directly or use **Edit with AI** to refine them.

Good instructions are specific and outcome-oriented. For example:

```
You are an Error Triage agent for the payments service. Each run, survey
the last 24 hours of error-level logs. For each distinct error pattern,
determine if it's a transient issue or a code-level bug. For non-transient
patterns, create a case in Case Management.
```

### Model

Select which LLM powers the agent's reasoning. Different models balance capability, speed, and cost differently—choose based on your agent's workload. To change your agent's model, click the model name in the chatbox to open a dropdown menu and choose another model. You can compare these models using [OpenAI's comparison tool][6] and [Anthropic's models comparison][5].

### Tools

Tools define what actions the agent can take. Add tools from the [Action Catalog][7], which includes 2500+ integrations. The agent can only use tools that have been added to its configuration.

In the **MCP Servers** section, the [Datadog MCP Server][8] is enabled by default. You can also connect third-party MCP servers. MCP servers use the Model Context Protocol to provide additional tools and capabilities that the agent can use to interact with external systems.

### Automations

Automations let you trigger agents beyond the chat interface:

- **Schedule**: Run an agent on a recurring basis (for example, daily error triage).
- **Workflow triggers**: Run an agent as a step in any workflow—triggered by [monitors][14], [incidents][15], [security signals][16], or other events.

To use an agent in a workflow, add the **Run Agent** step from the workflow editor.

## Testing your agent

Use the built-in chat interface to test your agent. Send messages, review the agent's reasoning, and verify it takes the right actions. Chat history is preserved across sessions.

## Blueprints

Blueprints are pre-built agent templates for common operational use cases:

| Blueprint | Description |
|-----------|-------------|
| Daily Error Triager | Finds error logs daily and opens a case for non-transient issues |
| Incident Responder | Gathers context and coordinates response during active incidents |
| Security Analyst | Investigates security signals and recommends remediation |
| Log Analyzer | Analyzes system logs, identifies patterns, and helps troubleshoot |
| DevOps Assistant | Helps with infrastructure monitoring and deployment tasks |
| Feedback Digest | Summarizes user feedback from support channels |

Blueprints can be customized after creation—modify instructions, add or remove tools, and configure automations.

## Using agents in workflows

Agents integrate with [Workflow Automation][9] and [App Builder][10] through the **Run Agent** action. This lets you embed AI reasoning into any workflow:

1. Open or create a workflow in [Workflow Automation][9], or open or create an app in [App Builder][10].
1. Add the **Run Agent** step from the action catalog.
1. Select which agent to run and configure the Run Instructions.

The agent executes with its configured tools and instructions and returns its output to the workflow. Combine rule-based automation—if/then logic, data transforms—with AI reasoning for triage, analysis, and summarization, all in one workflow.

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
